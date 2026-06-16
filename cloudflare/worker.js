// World History Documentary — Cloudflare Worker
//
// KV namespaces (bind in Cloudflare dashboard → Worker Settings → Variables):
//   ADMIN_KV    — shared admin content edits
//   WHD_USERS   — user records, keyed by lowercase username
//   WHD_TOKENS  — session tokens (90-day TTL), keyed by token → username key
//
// Secrets (Settings → Variables → Environment Variables, mark Encrypt):
//   ADMIN_PASSCODE — passcode for the admin panel second wall
//
// Roles:
//   owner  — hardcoded to username "Anay" (case-insensitive).
//             Has all admin powers + can promote/demote other users.
//   admin  — can edit content. Granted by passcode OR promoted by owner.
//   user   — default for everyone else.
//
// Endpoints:
//   GET  /data              — public. Returns shared admin content.
//   POST /verify            — { passcode } → { ok }
//   POST /data              — { passcode, …payload } → saves admin content.
//   POST /auth/signup       — { username, password } → { ok, token, joinedAt, role }
//   POST /auth/login        — { username, password } → { ok, token, joinedAt, role }
//   POST /auth/save         — { token, data } → { ok }
//   POST /auth/load         — { token } → { ok, data, joinedAt, role }
//   POST /auth/delete       — { token, password } → { ok }
//   POST /auth/promote      — { token, targetUsername, newRole } → { ok }  (owner only)
//   POST /auth/listadmins   — { token } → { ok, admins[] }  (owner only)

const KV_KEY     = "admin_data";
const OWNER_NAME = "anay"; // lowercase — matched case-insensitively

const CORS_HEADERS = {
    "Access-Control-Allow-Origin":  "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

function json(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
}

// ── Password helpers (Web Crypto — no npm needed) ─────────────────────────

async function hashPassword(password) {
    const salt = crypto.randomUUID();
    return salt + ":" + await pbkdf2(password, salt);
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

function assignRole(usernameKey) {
    // Owner role is permanent and tied to the "Anay" account (case-insensitive)
    return usernameKey === OWNER_NAME ? "owner" : "user";
}
function isOwner(user)        { return user?.role === "owner"; }
function isAdminOrAbove(user) { return user?.role === "admin" || user?.role === "owner"; }

// ── Session helper ────────────────────────────────────────────────────────

async function getUserFromToken(token, env) {
    if (!token) return null;
    const key = await env.WHD_TOKENS.get(token);
    if (!key) return null;
    const raw = await env.WHD_USERS.get(key);
    return raw ? JSON.parse(raw) : null;
}

// ── Auth handlers ─────────────────────────────────────────────────────────

async function handleSignup(request, env) {
    const { username, password } = await request.json().catch(() => ({}));
    if (!username || !password)
        return json({ ok: false, error: "Missing fields." }, 400);
    if (!/^[a-zA-Z0-9_]{3,24}$/.test(username))
        return json({ ok: false, error: "Username must be 3–24 characters (letters, numbers, _)." }, 400);
    if (password.length < 8)
        return json({ ok: false, error: "Password must be at least 8 characters." }, 400);

    // Usernames are unique case-insensitively — store and look up by lowercase key
    const key = username.toLowerCase();
    if (await env.WHD_USERS.get(key))
        return json({ ok: false, error: "Username already taken." });

    const role     = assignRole(key);
    const joinedAt = Date.now();
    const user     = { username, key, hash: await hashPassword(password), joinedAt, role, data: {} };

    await env.WHD_USERS.put(key, JSON.stringify(user));
    const token = makeToken();
    await env.WHD_TOKENS.put(token, key, { expirationTtl: 60 * 60 * 24 * 90 });

    return json({ ok: true, token, joinedAt, role });
}

async function handleLogin(request, env) {
    const { username, password } = await request.json().catch(() => ({}));
    if (!username || !password)
        return json({ ok: false, error: "Missing fields." }, 400);

    const key = username.toLowerCase();
    const raw = await env.WHD_USERS.get(key);
    if (!raw) return json({ ok: false, error: "Incorrect username or password." });

    const user = JSON.parse(raw);
    if (!await verifyPassword(password, user.hash))
        return json({ ok: false, error: "Incorrect username or password." });

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
    if (isOwner(user))
        return json({ ok: false, error: "The owner account cannot be deleted." }, 403);
    await env.WHD_USERS.delete(user.key);
    await env.WHD_TOKENS.delete(token);
    return json({ ok: true });
}

// ── Role management (owner only) ──────────────────────────────────────────

async function handlePromote(request, env) {
    const { token, targetUsername, newRole } = await request.json().catch(() => ({}));
    const caller = await getUserFromToken(token, env);

    if (!caller)          return json({ ok: false, error: "Not authenticated." }, 401);
    if (!isOwner(caller)) return json({ ok: false, error: "Only the owner can change roles." }, 403);

    const targetKey = (targetUsername || "").toLowerCase();
    if (!targetKey)              return json({ ok: false, error: "Target username required." }, 400);
    if (targetKey === OWNER_NAME) return json({ ok: false, error: "Cannot change the owner's role." }, 400);

    const validRoles = ["user", "admin"];
    if (!validRoles.includes(newRole))
        return json({ ok: false, error: `Role must be "user" or "admin".` }, 400);

    const raw = await env.WHD_USERS.get(targetKey);
    if (!raw) return json({ ok: false, error: "User not found." }, 404);

    const target = JSON.parse(raw);
    target.role  = newRole;
    await env.WHD_USERS.put(targetKey, JSON.stringify(target));
    return json({ ok: true, username: target.username, role: target.role });
}

async function handleListAdmins(request, env) {
    const { token } = await request.json().catch(() => ({}));
    const caller = await getUserFromToken(token, env);
    if (!caller)          return json({ ok: false, error: "Not authenticated." }, 401);
    if (!isOwner(caller)) return json({ ok: false, error: "Owner only." }, 403);

    // KV list — iterate all users to find admins.
    // For large userbases a dedicated index would be better; fine for this scale.
    const list   = await env.WHD_USERS.list();
    const admins = [];
    for (const { name } of list.keys) {
        const raw = await env.WHD_USERS.get(name);
        if (!raw) continue;
        const u = JSON.parse(raw);
        if (u.role === "admin") admins.push({ username: u.username, joinedAt: u.joinedAt });
    }
    return json({ ok: true, admins });
}

// ── Main fetch handler ────────────────────────────────────────────────────

export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        if (request.method === "OPTIONS")
            return new Response(null, { headers: CORS_HEADERS });

        // Shared admin content routes
        if (url.pathname === "/data" && request.method === "GET") {
            const stored = await env.ADMIN_KV.get(KV_KEY);
            return new Response(stored || "{}", {
                headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
            });
        }
        if (url.pathname === "/verify" && request.method === "POST") {
            const body = await request.json().catch(() => ({}));
            const ok   = !!env.ADMIN_PASSCODE && body.passcode === env.ADMIN_PASSCODE;
            return json({ ok });
        }
        if (url.pathname === "/data" && request.method === "POST") {
            const body = await request.json().catch(() => ({}));
            if (!env.ADMIN_PASSCODE || body.passcode !== env.ADMIN_PASSCODE)
                return json({ ok: false, error: "Invalid passcode" }, 401);
            const { passcode, ...payload } = body;
            await env.ADMIN_KV.put(KV_KEY, JSON.stringify(payload));
            return json({ ok: true });
        }

        // Auth routes
        if (url.pathname === "/auth/signup")     return handleSignup(request, env);
        if (url.pathname === "/auth/login")      return handleLogin(request, env);
        if (url.pathname === "/auth/save")       return handleSave(request, env);
        if (url.pathname === "/auth/load")       return handleLoad(request, env);
        if (url.pathname === "/auth/delete")     return handleDelete(request, env);
        if (url.pathname === "/auth/promote")    return handlePromote(request, env);
        if (url.pathname === "/auth/listadmins") return handleListAdmins(request, env);

        return json({ ok: false, error: "Not found" }, 404);
    },
};