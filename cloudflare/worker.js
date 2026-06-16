// World History Documentary — shared admin data + auth Worker
//
// KV namespaces needed (bind in Cloudflare dashboard):
//   WHD_USERS   — stores user records keyed by lowercase username
//   WHD_TOKENS  — stores session tokens (TTL 90 days)
//   ADMIN_KV    — stores shared admin content edits
//
// Secrets needed:
//   ADMIN_PASSCODE — passcode for the admin panel
//
// Roles:
//   owner  — hardcoded to username "anay". Can promote/demote admins.
//   admin  — granted via passcode OR promoted by owner. Can edit content.
//   user   — default for everyone else.

const KV_KEY     = "admin_data";
const OWNER_NAME = "anay"; // lowercase — the owner account username

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

function json(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
}

// ── Password helpers ──────────────────────────────────────────────────────

async function hashPassword(password) {
    const salt = crypto.randomUUID();
    const key  = await pbkdf2(password, salt);
    return salt + ":" + key;
}
async function verifyPassword(password, stored) {
    const [salt, storedKey] = stored.split(":");
    return await pbkdf2(password, salt) === storedKey;
}
async function pbkdf2(password, salt) {
    const enc    = new TextEncoder();
    const keyMat = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
    const bits   = await crypto.subtle.deriveBits(
        { name: "PBKDF2", salt: enc.encode(salt), iterations: 100_000, hash: "SHA-256" },
        keyMat, 256
    );
    return btoa(String.fromCharCode(...new Uint8Array(bits)));
}
function makeToken() {
    const arr = new Uint8Array(32);
    crypto.getRandomValues(arr);
    return Array.from(arr, b => b.toString(16).padStart(2, "0")).join("");
}

// ── Role helpers ──────────────────────────────────────────────────────────

function assignRole(username) {
    return username.toLowerCase() === OWNER_NAME ? "owner" : "user";
}

function isOwner(user)        { return user?.role === "owner"; }
function isAdminOrAbove(user) { return user?.role === "admin" || user?.role === "owner"; }

// ── Session helper ────────────────────────────────────────────────────────

async function getUserFromToken(token, env) {
    if (!token) return null;
    const username = await env.WHD_TOKENS.get(token);
    if (!username) return null;
    const raw = await env.WHD_USERS.get(username.toLowerCase());
    return raw ? JSON.parse(raw) : null;
}

// ── Auth handlers ─────────────────────────────────────────────────────────

async function handleSignup(request, env) {
    const { username, password } = await request.json().catch(() => ({}));
    if (!username || !password) return json({ ok: false, error: "Missing fields." }, 400);
    if (!/^[a-zA-Z0-9_]{3,24}$/.test(username)) return json({ ok: false, error: "Invalid username (3–24 chars, letters/numbers/_)." }, 400);
    if (password.length < 8) return json({ ok: false, error: "Password must be at least 8 characters." }, 400);

    // Case-insensitive uniqueness: store by lowercase key
    const key = username.toLowerCase();
    if (await env.WHD_USERS.get(key)) return json({ ok: false, error: "Username already taken." });

    const role = assignRole(username);
    const user = {
        username,           // preserve original casing for display
        key,                // lowercase lookup key
        hash: await hashPassword(password),
        joinedAt: Date.now(),
        role,
        data: {}
    };
    await env.WHD_USERS.put(key, JSON.stringify(user));
    const token = makeToken();
    await env.WHD_TOKENS.put(token, key, { expirationTtl: 60 * 60 * 24 * 90 });
    return json({ ok: true, token, joinedAt: user.joinedAt, role });
}

async function handleLogin(request, env) {
    const { username, password } = await request.json().catch(() => ({}));
    if (!username || !password) return json({ ok: false, error: "Missing fields." }, 400);
    const key = username.toLowerCase();
    const raw = await env.WHD_USERS.get(key);
    if (!raw) return json({ ok: false, error: "Incorrect username or password." });
    const user = JSON.parse(raw);
    if (!await verifyPassword(password, user.hash)) return json({ ok: false, error: "Incorrect username or password." });
    const token = makeToken();
    await env.WHD_TOKENS.put(token, key, { expirationTtl: 60 * 60 * 24 * 90 });
    return json({ ok: true, token, joinedAt: user.joinedAt, role: user.role });
}

async function handleSave(request, env) {
    const { token, data } = await request.json().catch(() => ({}));
    const user = await getUserFromToken(token, env);
    if (!user) return json({ ok: false, error: "Invalid or expired session." }, 401);
    user.data = data || {};
    await env.WHD_USERS.put(user.key, JSON.stringify(user));
    return json({ ok: true });
}

async function handleLoad(request, env) {
    const { token } = await request.json().catch(() => ({}));
    const user = await getUserFromToken(token, env);
    if (!user) return json({ ok: false, error: "Invalid or expired session." }, 401);
    return json({ ok: true, data: user.data || {}, joinedAt: user.joinedAt, role: user.role });
}

async function handleDelete(request, env) {
    const { token, password } = await request.json().catch(() => ({}));
    const user = await getUserFromToken(token, env);
    if (!user) return json({ ok: false, error: "Invalid or expired session." }, 401);
    if (!password || !await verifyPassword(password, user.hash))
        return json({ ok: false, error: "Incorrect password." }, 401);
    await env.WHD_USERS.delete(user.key);
    await env.WHD_TOKENS.delete(token);
    return json({ ok: true });
}

// ── List all users (owner only) ───────────────────────────────────────────

async function handleUsers(request, env) {
    const { token } = await request.json().catch(() => ({}));
    const caller = await getUserFromToken(token, env);
    if (!caller) return json({ ok: false, error: "Not authenticated." }, 401);
    if (!isOwner(caller)) return json({ ok: false, error: "Owner access required." }, 403);

    // KV list() returns up to 1000 keys by default; sufficient for a small app
    const listed = await env.WHD_USERS.list();
    const users = await Promise.all(
        listed.keys.map(async ({ name }) => {
            const raw = await env.WHD_USERS.get(name);
            if (!raw) return null;
            const u = JSON.parse(raw);
            return { username: u.username, role: u.role, joinedAt: u.joinedAt };
        })
    );
    return json({
        ok: true,
        users: users.filter(Boolean).sort((a, b) => (a.joinedAt || 0) - (b.joinedAt || 0)),
    });
}

// ── Role management (owner only) ──────────────────────────────────────────

async function handlePromote(request, env) {
    const { token, targetUsername, newRole } = await request.json().catch(() => ({}));
    const caller = await getUserFromToken(token, env);

    if (!caller) return json({ ok: false, error: "Not authenticated." }, 401);
    if (!isOwner(caller)) return json({ ok: false, error: "Only the owner can change roles." }, 403);

    const targetKey = (targetUsername || "").toLowerCase();
    if (!targetKey) return json({ ok: false, error: "Target username required." }, 400);
    if (targetKey === OWNER_NAME) return json({ ok: false, error: "Cannot change the owner's role." }, 400);

    const validRoles = ["user", "admin"];
    if (!validRoles.includes(newRole)) return json({ ok: false, error: `Role must be one of: ${validRoles.join(", ")}.` }, 400);

    const raw = await env.WHD_USERS.get(targetKey);
    if (!raw) return json({ ok: false, error: "User not found." }, 404);

    const target = JSON.parse(raw);
    target.role = newRole;
    await env.WHD_USERS.put(targetKey, JSON.stringify(target));
    return json({ ok: true, username: target.username, role: target.role });
}

// ── Main fetch handler ────────────────────────────────────────────────────

export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        if (request.method === "OPTIONS") {
            return new Response(null, { headers: CORS_HEADERS });
        }

        // Shared admin content
        if (url.pathname === "/data" && request.method === "GET") {
            const stored = await env.ADMIN_KV.get(KV_KEY);
            return new Response(stored || "{}", {
                headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
            });
        }
        if (url.pathname === "/verify" && request.method === "POST") {
            const body = await request.json().catch(() => ({}));
            const ok = !!env.ADMIN_PASSCODE && body.passcode === env.ADMIN_PASSCODE;
            return json({ ok });
        }
        if (url.pathname === "/data" && request.method === "POST") {
            const body = await request.json().catch(() => ({}));
            if (!env.ADMIN_PASSCODE || body.passcode !== env.ADMIN_PASSCODE) {
                return json({ ok: false, error: "Invalid passcode" }, 401);
            }
            const { passcode, ...payload } = body;
            await env.ADMIN_KV.put(KV_KEY, JSON.stringify(payload));
            return json({ ok: true });
        }

        // Auth
        if (url.pathname === "/auth/signup")  return handleSignup(request, env);
        if (url.pathname === "/auth/login")   return handleLogin(request, env);
        if (url.pathname === "/auth/save")    return handleSave(request, env);
        if (url.pathname === "/auth/load")    return handleLoad(request, env);
        if (url.pathname === "/auth/delete")  return handleDelete(request, env);
        if (url.pathname === "/auth/promote") return handlePromote(request, env);
        if (url.pathname === "/auth/users")   return handleUsers(request, env);

        return json({ ok: false, error: "Not found" }, 404);
    },
};

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

function json(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
}

// ── Password helpers (Web Crypto — no imports needed) ─────────────────────

async function hashPassword(password) {
    const salt = crypto.randomUUID();
    const key  = await pbkdf2(password, salt);
    return salt + ":" + key;
}
async function verifyPassword(password, stored) {
    const [salt, storedKey] = stored.split(":");
    return await pbkdf2(password, salt) === storedKey;
}
async function pbkdf2(password, salt) {
    const enc    = new TextEncoder();
    const keyMat = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
    const bits   = await crypto.subtle.deriveBits(
        { name: "PBKDF2", salt: enc.encode(salt), iterations: 100_000, hash: "SHA-256" },
        keyMat, 256
    );
    return btoa(String.fromCharCode(...new Uint8Array(bits)));
}
function makeToken() {
    const arr = new Uint8Array(32);
    crypto.getRandomValues(arr);
    return Array.from(arr, b => b.toString(16).padStart(2, "0")).join("");
}

// ── Auth handlers ─────────────────────────────────────────────────────────

async function handleSignup(request, env) {
    const { username, password } = await request.json().catch(() => ({}));
    if (!username || !password) return json({ ok: false, error: "Missing fields." }, 400);
    if (!/^[a-zA-Z0-9_]{3,24}$/.test(username)) return json({ ok: false, error: "Invalid username." }, 400);
    if (password.length < 8) return json({ ok: false, error: "Password too short." }, 400);
    if (await env.WHD_USERS.get(username)) return json({ ok: false, error: "Username already taken." });
    const user = { username, hash: await hashPassword(password), joinedAt: Date.now(), data: {} };
    await env.WHD_USERS.put(username, JSON.stringify(user));
    const token = makeToken();
    await env.WHD_TOKENS.put(token, username, { expirationTtl: 60 * 60 * 24 * 90 });
    return json({ ok: true, token, joinedAt: user.joinedAt });
}

async function handleLogin(request, env) {
    const { username, password } = await request.json().catch(() => ({}));
    if (!username || !password) return json({ ok: false, error: "Missing fields." }, 400);
    const raw = await env.WHD_USERS.get(username);
    if (!raw) return json({ ok: false, error: "Incorrect username or password." });
    const user = JSON.parse(raw);
    if (!await verifyPassword(password, user.hash)) return json({ ok: false, error: "Incorrect username or password." });
    const token = makeToken();
    await env.WHD_TOKENS.put(token, username, { expirationTtl: 60 * 60 * 24 * 90 });
    return json({ ok: true, token, joinedAt: user.joinedAt });
}

async function handleSave(request, env) {
    const { token, data } = await request.json().catch(() => ({}));
    if (!token) return json({ ok: false, error: "Missing token." }, 401);
    const username = await env.WHD_TOKENS.get(token);
    if (!username) return json({ ok: false, error: "Invalid or expired session." }, 401);
    const raw = await env.WHD_USERS.get(username);
    if (!raw) return json({ ok: false, error: "User not found." }, 404);
    const user = JSON.parse(raw);
    user.data = data || {};
    await env.WHD_USERS.put(username, JSON.stringify(user));
    return json({ ok: true });
}

async function handleLoad(request, env) {
    const { token } = await request.json().catch(() => ({}));
    if (!token) return json({ ok: false, error: "Missing token." }, 401);
    const username = await env.WHD_TOKENS.get(token);
    if (!username) return json({ ok: false, error: "Invalid or expired session." }, 401);
    const raw = await env.WHD_USERS.get(username);
    if (!raw) return json({ ok: false, error: "User not found." }, 404);
    const user = JSON.parse(raw);
    return json({ ok: true, data: user.data || {}, joinedAt: user.joinedAt });
}

async function handleDelete(request, env) {
    const { token, password } = await request.json().catch(() => ({}));
    if (!token) return json({ ok: false, error: "Missing token." }, 401);
    const username = await env.WHD_TOKENS.get(token);
    if (!username) return json({ ok: false, error: "Invalid or expired session." }, 401);
    const raw = await env.WHD_USERS.get(username);
    if (!raw) return json({ ok: false, error: "User not found." }, 404);
    const user = JSON.parse(raw);
    if (!password || !await verifyPassword(password, user.hash))
        return json({ ok: false, error: "Incorrect password." }, 401);
    await env.WHD_USERS.delete(username);
    await env.WHD_TOKENS.delete(token);
    return json({ ok: true });
}

// ── Main fetch handler ────────────────────────────────────────────────────
}