// World History Documentary — shared admin data + auth Worker

const KV_KEY = "admin_data";

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

export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        if (request.method === "OPTIONS") {
            return new Response(null, { headers: CORS_HEADERS });
        }

        // Existing admin routes (unchanged)
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

        // New auth routes
        if (url.pathname === "/auth/signup") return handleSignup(request, env);
        if (url.pathname === "/auth/login")  return handleLogin(request, env);
        if (url.pathname === "/auth/save")   return handleSave(request, env);
        if (url.pathname === "/auth/load")   return handleLoad(request, env);
        if (url.pathname === "/auth/delete") return handleDelete(request, env);

        return json({ ok: false, error: "Not found" }, 404);
    },
};