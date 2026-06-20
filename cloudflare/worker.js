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
const ANNOUNCEMENT_KEY = "announcement";
const OWNER_NAME = "anay"; // always lowercase — compared against username.toLowerCase()

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
    // username may be original-casing display name — compare lowercase to lowercase OWNER_NAME
    return (username || "").toLowerCase() === OWNER_NAME ? "owner" : "user";
}

function isOwner(user)        { return user?.role === "owner"; }
function isAdminOrAbove(user) { return user?.role === "admin" || user?.role === "owner"; }

// ── Session helper ────────────────────────────────────────────────────────

async function getUserFromToken(token, env) {
    if (!token) return null;
    const username = await env.WHD_TOKENS.get(token);
    if (!username) return null;
    const key = username.toLowerCase();
    const raw = await env.WHD_USERS.get(key);
    if (!raw) return null;
    const user = JSON.parse(raw);
    // Backfill key field for records created before the key field existed
    if (!user.key) user.key = key;
    return user;
}

// ── Auth handlers ─────────────────────────────────────────────────────────

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

async function handleSignup(request, env) {
    const { username, password, email } = await request.json().catch(() => ({}));
    if (!username || !password) return json({ ok: false, error: "Missing fields." }, 400);
    if (!/^[a-zA-Z0-9_]{3,24}$/.test(username)) return json({ ok: false, error: "Invalid username (3–24 chars, letters/numbers/_)." }, 400);
    if (password.length < 8) return json({ ok: false, error: "Password must be at least 8 characters." }, 400);
    const trimmedEmail = String(email || "").trim();
    if (trimmedEmail && !isValidEmail(trimmedEmail)) return json({ ok: false, error: "That email address doesn't look valid." }, 400);

    // Case-insensitive uniqueness: store by lowercase key
    const key = username.toLowerCase();
    if (await env.WHD_USERS.get(key)) return json({ ok: false, error: "Username already taken." });

    const role = assignRole(username);
    const user = {
        username,           // preserve original casing for display
        key,                // lowercase lookup key
        hash: await hashPassword(password),
        email: trimmedEmail || null,   // optional, used only for account recovery
        joinedAt: Date.now(),
        role,
        data: {}
    };
    await env.WHD_USERS.put(key, JSON.stringify(user));
    const token = makeToken();
    await env.WHD_TOKENS.put(token, key, { expirationTtl: 60 * 60 * 24 * 90 });
    return json({ ok: true, token, joinedAt: user.joinedAt, role });
}

async function handleResetPassword(request, env) {
    const { username, email, newPassword } = await request.json().catch(() => ({}));
    if (!username || !email || !newPassword) return json({ ok: false, error: "Missing fields." }, 400);
    if (newPassword.length < 8) return json({ ok: false, error: "Password must be at least 8 characters." }, 400);

    const key = username.toLowerCase();
    const raw = await env.WHD_USERS.get(key);
    if (!raw) return json({ ok: false, error: "No account found for that username." });

    const user = JSON.parse(raw);
    if (!user.email) return json({ ok: false, error: "This account has no recovery email on file. Ask an owner/admin for help." });
    if (user.email.toLowerCase() !== String(email).trim().toLowerCase()) {
        return json({ ok: false, error: "That email doesn't match our records." });
    }

    user.hash = await hashPassword(newPassword);
    await env.WHD_USERS.put(key, JSON.stringify(user));

    // Invalidate existing sessions isn't tracked per-user, so we just issue a
    // fresh token for this reset; old tokens remain valid until they expire
    // naturally (90 days) since WHD_TOKENS has no per-user reverse index.
    const token = makeToken();
    await env.WHD_TOKENS.put(token, key, { expirationTtl: 60 * 60 * 24 * 90 });
    return json({ ok: true, token, joinedAt: user.joinedAt, role: user.role });
}

async function handleLogin(request, env) {
    const { username, password } = await request.json().catch(() => ({}));
    if (!username || !password) return json({ ok: false, error: "Missing fields." }, 400);
    const key = username.toLowerCase();
    const raw = await env.WHD_USERS.get(key);
    if (!raw) return json({ ok: false, error: "Incorrect username or password." });
    const user = JSON.parse(raw);
    // Backfill key for old records
    if (!user.key) user.key = key;
    if (!await verifyPassword(password, user.hash)) return json({ ok: false, error: "Incorrect username or password." });

    // Re-evaluate owner role each login (fixes accounts created before role logic was correct)
    const correctRole = assignRole(user.username || username);
    if (correctRole === "owner" && user.role !== "owner") {
        user.role = "owner";
        await env.WHD_USERS.put(key, JSON.stringify(user));
    }

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

    // Re-evaluate owner role (fixes accounts stored before the role bug was corrected)
    const correctRole = assignRole(user.username);
    if (correctRole === "owner" && user.role !== "owner") {
        user.role = "owner";
        // user.key is guaranteed by getUserFromToken backfill above
        await env.WHD_USERS.put(user.key, JSON.stringify(user));
    }

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

    const SYSTEM_KEYS = new Set(["__maintenance__"]);
    const listed = await env.WHD_USERS.list();
    const users = await Promise.all(
        listed.keys
            .filter(({ name }) => !SYSTEM_KEYS.has(name))
            .map(async ({ name }) => {
                const raw = await env.WHD_USERS.get(name);
                if (!raw) return null;
                const u = JSON.parse(raw);
                if (!u.username) return null; // skip malformed records
                // Owner is always derived from the hardcoded username (safety net
                // in case a KV record was ever edited/corrupted). Everyone else
                // keeps whatever role is actually stored — assignRole() only
                // distinguishes owner vs. user and has no concept of "admin",
                // so calling it here for every user was silently erasing every
                // admin promotion back to "user" on each list refresh.
                const role = (u.username || "").toLowerCase() === OWNER_NAME ? "owner" : (u.role || "user");
                return { username: u.username, role, joinedAt: u.joinedAt, hasEmail: !!u.email };
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

// ── List admins only (owner only, used by settings owner panel) ───────────

async function handleListAdmins(request, env) {
    const { token } = await request.json().catch(() => ({}));
    const caller = await getUserFromToken(token, env);
    if (!caller) return json({ ok: false, error: "Not authenticated." }, 401);
    if (!isOwner(caller)) return json({ ok: false, error: "Owner access required." }, 403);
    const listed = await env.WHD_USERS.list();
    const admins = [];
    for (const { name } of listed.keys) {
        const raw = await env.WHD_USERS.get(name);
        if (!raw) continue;
        const u = JSON.parse(raw);
        if (u.role === "admin") admins.push({ username: u.username, joinedAt: u.joinedAt });
    }
    return json({ ok: true, admins });
}

// ── Change password ────────────────────────────────────────────────────────

async function handleChangePassword(request, env) {
    const { token, currentPassword, newPassword } = await request.json().catch(() => ({}));
    const user = await getUserFromToken(token, env);
    if (!user) return json({ ok: false, error: "Invalid or expired session." }, 401);
    if (!currentPassword || !newPassword)
        return json({ ok: false, error: "Missing fields." }, 400);
    if (newPassword.length < 8)
        return json({ ok: false, error: "New password must be at least 8 characters." }, 400);
    if (!await verifyPassword(currentPassword, user.hash))
        return json({ ok: false, error: "Current password is incorrect." }, 401);
    user.hash = await hashPassword(newPassword);
    await env.WHD_USERS.put(user.key, JSON.stringify(user));
    return json({ ok: true });
}

// ── Maintenance mode ───────────────────────────────────────────────────────
// Owner can toggle maintenance mode on/off. Stored as a simple KV flag.
// GET  /auth/maintenance/status  — public, returns { maintenance: bool, message: string }
// POST /auth/maintenance          — owner only, body: { token, on: bool, message?: string }

async function handleMaintenanceStatus(request, env) {
    const raw = await env.WHD_USERS.get("__maintenance__");
    if (!raw) return json({ maintenance: false, message: "" });
    const data = JSON.parse(raw);
    return json({ maintenance: !!data.on, message: data.message || "" });
}

async function handleMaintenance(request, env) {
    const { token, on, message } = await request.json().catch(() => ({}));
    const caller = await getUserFromToken(token, env);
    if (!caller) return json({ ok: false, error: "Not authenticated." }, 401);
    if (!isOwner(caller)) return json({ ok: false, error: "Owner access required." }, 403);
    await env.WHD_USERS.put("__maintenance__", JSON.stringify({
        on: !!on,
        message: (message || "").slice(0, 200),
        updatedAt: Date.now(),
    }));
    return json({ ok: true, maintenance: !!on });
}

// ── Update Log ───────────────────────────────────────────────────────────────
// POST /auth/updatelog  body: { token, action: "list"|"save"|"delete", ...fields }
// Entries stored as a JSON array in KV under "__updatelog__"

async function handleUpdateLog(request, env) {
    const body = await request.json().catch(() => ({}));
    const { token, action } = body;
    const caller = await getUserFromToken(token, env);
    if (!caller) return json({ ok: false, error: "Not authenticated." }, 401);

    const raw     = await env.WHD_USERS.get("__updatelog__");
    let   entries = raw ? JSON.parse(raw) : [];

    if (action === "list") {
        return json({ ok: true, entries });
    }

    // Save and delete require owner
    if (!isOwner(caller)) return json({ ok: false, error: "Owner access required." }, 403);

    if (action === "save") {
        const { id, version, title, date, changes } = body;
        if (!version) return json({ ok: false, error: "Version is required." }, 400);
        const changes_clean = (Array.isArray(changes) ? changes : [])
            .map(c => String(c).slice(0, 200)).filter(Boolean).slice(0, 30);
        if (id) {
            // Update existing
            const idx = entries.findIndex(e => e.id === id);
            if (idx < 0) return json({ ok: false, error: "Entry not found." }, 404);
            entries[idx] = { ...entries[idx], version: String(version).slice(0,20), title: String(title||"").slice(0,80), date: String(date||"").slice(0,40), changes: changes_clean, updatedAt: Date.now() };
            await env.WHD_USERS.put("__updatelog__", JSON.stringify(entries));
            return json({ ok: true, entry: entries[idx] });
        } else {
            // New entry
            const entry = { id: Date.now().toString(36) + Math.random().toString(36).slice(2,6), version: String(version).slice(0,20), title: String(title||"").slice(0,80), date: String(date||"").slice(0,40), changes: changes_clean, createdAt: Date.now(), updatedAt: Date.now() };
            entries.unshift(entry);
            await env.WHD_USERS.put("__updatelog__", JSON.stringify(entries));
            return json({ ok: true, entry });
        }
    }

    if (action === "delete") {
        const { id } = body;
        const before = entries.length;
        entries = entries.filter(e => e.id !== id);
        if (entries.length === before) return json({ ok: false, error: "Entry not found." }, 404);
        await env.WHD_USERS.put("__updatelog__", JSON.stringify(entries));
        return json({ ok: true });
    }

    return json({ ok: false, error: "Unknown action." }, 400);
}

// ── Announcement banner ──────────────────────────────────────────────────

async function handleAnnouncementStatus(request, env) {
    const raw = await env.ADMIN_KV.get(ANNOUNCEMENT_KEY);
    if (!raw) return json({ active: false, message: "", type: "info", updatedAt: null, targets: [] });
    const data = JSON.parse(raw);
    const body = request.method === "POST" ? await request.json().catch(() => ({})) : {};
    const caller = await getUserFromToken(body.token, env);
    const targets = Array.isArray(data.targets) ? data.targets : [];
    const currentUsername = caller?.username ? caller.username.toLowerCase() : "";
    const visible = !data.active || targets.length === 0 || !!caller && (
        isOwner(caller) || isAdminOrAbove(caller) || targets.includes(currentUsername)
    );

    if (!visible) {
        return json({
            active: false,
            message: "",
            type: data.type || "info",
            updatedAt: data.updatedAt || null,
            targets,
        });
    }

    return json({
        active: !!data.active,
        message: data.message || "",
        type: data.type || "info",
        updatedAt: data.updatedAt || null,
        targets,
    });
}

async function handleAnnouncement(request, env) {
    const { token, message, type, active, targets } = await request.json().catch(() => ({}));
    const caller = await getUserFromToken(token, env);
    if (!caller) return json({ ok: false, error: "Not authenticated." }, 401);
    if (!isOwner(caller)) return json({ ok: false, error: "Owner access required." }, 403);

    const safeType = ["info", "warning", "success", "error", "update", "event"].includes(type) ? type : "info";
    const targetList = Array.isArray(targets)
        ? targets
        : String(targets || "")
            .split(",")
            .map(name => name.trim().toLowerCase())
            .filter(Boolean);
    const next = {
        active: !!active && !!String(message || "").trim(),
        message: String(message || "").trim().slice(0, 300),
        type: safeType,
        updatedAt: Date.now(),
        targets: Array.from(new Set(targetList)).slice(0, 25),
    };
    if (!next.active) next.message = "";

    await env.ADMIN_KV.put(ANNOUNCEMENT_KEY, JSON.stringify(next));
    return json({ ok: true, ...next });
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
        if (url.pathname === "/auth/signup")         return handleSignup(request, env);
        if (url.pathname === "/auth/login")           return handleLogin(request, env);
        if (url.pathname === "/auth/resetpassword")    return handleResetPassword(request, env);
        if (url.pathname === "/auth/save")            return handleSave(request, env);
        if (url.pathname === "/auth/load")            return handleLoad(request, env);
        if (url.pathname === "/auth/delete")          return handleDelete(request, env);
        if (url.pathname === "/auth/promote")         return handlePromote(request, env);
        if (url.pathname === "/auth/users")           return handleUsers(request, env);
        if (url.pathname === "/auth/listadmins")      return handleListAdmins(request, env);
        if (url.pathname === "/auth/changepassword")  return handleChangePassword(request, env);
        if (url.pathname === "/auth/announcement")    return handleAnnouncement(request, env);
        if (url.pathname === "/auth/announcement/status") return handleAnnouncementStatus(request, env);
        if (url.pathname === "/auth/maintenance")     return handleMaintenance(request, env);
        if (url.pathname === "/auth/maintenance/status") return handleMaintenanceStatus(request, env);
        if (url.pathname === "/auth/updatelog")       return handleUpdateLog(request, env);

        // One-time fix: force-assign owner role to the OWNER_NAME account.
        // Call once from the browser: GET /auth/fixowner
        // Safe to call repeatedly — only affects the owner account.
        if (url.pathname === "/auth/fixowner" && request.method === "GET") {
            const raw = await env.WHD_USERS.get(OWNER_NAME);
            if (!raw) return json({ ok: false, error: "Owner account not found. Sign up first." }, 404);
            const user = JSON.parse(raw);
            const wasRole = user.role;
            user.role = "owner";
            if (!user.key) user.key = OWNER_NAME;
            await env.WHD_USERS.put(OWNER_NAME, JSON.stringify(user));
            return json({ ok: true, fixed: true, username: user.username, role: "owner", wasRole });
        }

        return json({ ok: false, error: "Not found" }, 404);
    },
};