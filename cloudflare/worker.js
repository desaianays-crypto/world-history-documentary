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

    // ── Hardcoded owner safety net ──────────────────────────────────────
    // The owner account (matched by OWNER_NAME) can never lose owner status
    // through any code path — tampered KV data, a bad ban, a missed role
    // check, etc. This is enforced at the single chokepoint every
    // authenticated handler passes through, not just login/load.
    if (key === OWNER_NAME && user.role !== "owner") {
        user.role = "owner";
        await env.WHD_USERS.put(key, JSON.stringify(user));
    }

    return user;
}

// ── Auth handlers ─────────────────────────────────────────────────────────

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

// Normalize a security answer for comparison: lowercase + trim + collapse whitespace.
function normalizeAnswer(a) {
    return String(a || "").trim().toLowerCase().replace(/\s+/g, " ");
}

async function handleSignup(request, env) {
    const { username, password, securityQuestion, securityAnswer } = await request.json().catch(() => ({}));
    if (!username || !password) return json({ ok: false, error: "Missing fields." }, 400);
    if (!/^[a-zA-Z0-9_]{3,24}$/.test(username)) return json({ ok: false, error: "Invalid username (3–24 chars, letters/numbers/_)." }, 400);
    if (password.length < 8) return json({ ok: false, error: "Password must be at least 8 characters." }, 400);
    const question = String(securityQuestion || "").trim();
    const answer   = String(securityAnswer || "").trim();
    if (!question || !answer) return json({ ok: false, error: "A security question and answer are required." }, 400);
    if (question.length > 150) return json({ ok: false, error: "Security question is too long." }, 400);

    // Case-insensitive uniqueness: store by lowercase key
    const key = username.toLowerCase();
    if (await env.WHD_USERS.get(key)) return json({ ok: false, error: "Username already taken." });

    const role = assignRole(username);
    const user = {
        username,           // preserve original casing for display
        key,                // lowercase lookup key
        hash: await hashPassword(password),
        securityQuestion: question,                       // shown back to the user during recovery
        securityAnswerHash: await hashPassword(normalizeAnswer(answer)), // never stored in plaintext
        joinedAt: Date.now(),
        role,
        data: {}
    };
    await env.WHD_USERS.put(key, JSON.stringify(user));
    const token = makeToken();
    await env.WHD_TOKENS.put(token, key, { expirationTtl: 60 * 60 * 24 * 90 });
    return json({ ok: true, token, joinedAt: user.joinedAt, role });
}

// ── Step 1: look up the account's security question ─────────────────────
async function handleResetRequest(request, env) {
    const { username } = await request.json().catch(() => ({}));
    if (!username) return json({ ok: false, error: "Please enter your username." }, 400);

    const key = username.toLowerCase();
    const raw = await env.WHD_USERS.get(key);
    if (!raw) return json({ ok: false, error: "No account found for that username." });

    const user = JSON.parse(raw);
    if (!user.securityQuestion || !user.securityAnswerHash) {
        return json({ ok: false, error: "This account has no security question on file. Contact support." });
    }

    return json({ ok: true, question: user.securityQuestion, displayName: user.username });
}

// ── Step 2: verify the security answer, issue a short-lived reset ticket ─
async function handleResetVerify(request, env) {
    const { username, answer } = await request.json().catch(() => ({}));
    if (!username || !answer) return json({ ok: false, error: "Please answer the security question." }, 400);

    const key = username.toLowerCase();
    const raw = await env.WHD_USERS.get(key);
    if (!raw) return json({ ok: false, error: "Account not found." });
    const user = JSON.parse(raw);
    if (!user.securityAnswerHash) return json({ ok: false, error: "This account has no security question on file." });

    const correct = await verifyPassword(normalizeAnswer(answer), user.securityAnswerHash);
    if (!correct) return json({ ok: false, error: "That answer doesn't match. Try again." });

    // Issue a short-lived ticket (10 min) that authorizes setting a new password.
    const ticket = makeToken();
    await env.WHD_TOKENS.put("resetticket:" + ticket, key, { expirationTtl: 60 * 10 });
    return json({ ok: true, ticket });
}

// ── Step 3: set new password using the verified reset ticket ─────────────
async function handleResetConfirm(request, env) {
    const { username, ticket, newPassword } = await request.json().catch(() => ({}));
    if (!username || !ticket || !newPassword) return json({ ok: false, error: "Missing fields." }, 400);
    if (newPassword.length < 8) return json({ ok: false, error: "Password must be at least 8 characters." }, 400);

    const key = username.toLowerCase();
    const ticketKey = await env.WHD_TOKENS.get("resetticket:" + ticket);
    if (!ticketKey || ticketKey !== key) {
        return json({ ok: false, error: "Reset session expired or invalid. Start over." });
    }

    const raw = await env.WHD_USERS.get(key);
    if (!raw) return json({ ok: false, error: "Account not found." });
    const user = JSON.parse(raw);

    user.hash = await hashPassword(newPassword);
    await env.WHD_USERS.put(key, JSON.stringify(user));

    // Consume the ticket so it can't be reused
    await env.WHD_TOKENS.delete("resetticket:" + ticket);

    // Issue a fresh session token
    const token = makeToken();
    await env.WHD_TOKENS.put(token, key, { expirationTtl: 60 * 60 * 24 * 90 });
    return json({ ok: true, token, joinedAt: user.joinedAt, role: user.role });
}

// ── Update the security question/answer for a logged-in user ─────────────
async function handleUpdateSecurityQuestion(request, env) {
    const { token, securityQuestion, securityAnswer } = await request.json().catch(() => ({}));
    const user = await getUserFromToken(token, env);
    if (!user) return json({ ok: false, error: "Invalid or expired session." }, 401);

    const question = String(securityQuestion || "").trim();
    const answer   = String(securityAnswer || "").trim();
    if (!question || !answer) return json({ ok: false, error: "A security question and answer are required." });
    if (question.length > 150) return json({ ok: false, error: "Security question is too long." });

    user.securityQuestion = question;
    user.securityAnswerHash = await hashPassword(normalizeAnswer(answer));
    await env.WHD_USERS.put(user.key, JSON.stringify(user));
    return json({ ok: true, question: user.securityQuestion });
}

// ── Update recovery email for a signed-in user ───────────────────────────
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

    // Block banned users from logging in
    if (user.role === "banned") return json({ ok: false, error: "Your account has been suspended. Contact an admin if you believe this is a mistake." }, 403);

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

    return json({ ok: true, data: user.data || {}, joinedAt: user.joinedAt, role: user.role, hasSecurityQuestion: !!user.securityQuestion });
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
                const role = (u.username || "").toLowerCase() === OWNER_NAME ? "owner" : (u.role || "user");
                return { username: u.username, role, joinedAt: u.joinedAt, hasSecurityQuestion: !!u.securityQuestion };
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
    if (!isAdminOrAbove(caller)) return json({ ok: false, error: "Admin access required." }, 403);

    const targetKey = (targetUsername || "").toLowerCase();
    if (!targetKey) return json({ ok: false, error: "Target username required." }, 400);
    if (targetKey === OWNER_NAME) return json({ ok: false, error: "Cannot change the owner's role." }, 400);

    // Admins can ban/unban (set role to "banned" or "user").
    // Only the owner can promote/demote to "admin".
    const validRoles = ["user", "admin", "banned"];
    if (!validRoles.includes(newRole)) return json({ ok: false, error: `Role must be one of: ${validRoles.join(", ")}.` }, 400);
    if (newRole === "admin" && !isOwner(caller)) return json({ ok: false, error: "Only the owner can grant admin role." }, 403);

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

    // Save and delete require admin or above
    if (!isAdminOrAbove(caller)) return json({ ok: false, error: "Admin access required." }, 403);

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

// ── Remote config (synced CSS overrides + feature flags for the terminal) ──
// Storage shape in KV under __remoteconfig__:
//   { cssRules: [{selector, property, value}, ...], flags: { [name]: value } }
// admin.js's remoteConfigCall() always expects {ok, cssRules, flags} back so
// it can call applyRemoteConfigToPage(res) directly off any response here.

async function loadRemoteConfig(env) {
    const raw = await env.WHD_USERS.get("__remoteconfig__");
    const cfg = raw ? JSON.parse(raw) : {};
    return { cssRules: Array.isArray(cfg.cssRules) ? cfg.cssRules : [], flags: (cfg.flags && typeof cfg.flags === "object") ? cfg.flags : {} };
}
async function saveRemoteConfig(env, cfg) {
    await env.WHD_USERS.put("__remoteconfig__", JSON.stringify(cfg));
}

async function handleRemoteConfigStatus(request, env) {
    const cfg = await loadRemoteConfig(env);
    return json({ ok: true, cssRules: cfg.cssRules, flags: cfg.flags });
}

async function handleRemoteConfig(request, env) {
    const body = await request.json().catch(() => ({}));
    const { token, action } = body;
    const caller = await getUserFromToken(token, env);
    if (!caller) return json({ ok: false, error: "Not authenticated." }, 401);
    if (!isAdminOrAbove(caller)) return json({ ok: false, error: "Admin access required." }, 403);

    const cfg = await loadRemoteConfig(env);

    switch (action) {
        case "set_css": {
            const { selector, property, value } = body;
            if (!selector || !property || value === undefined) return json({ ok: false, error: "selector, property and value are required." }, 400);
            const idx = cfg.cssRules.findIndex(r => r.selector === selector && r.property === property);
            const rule = { selector: String(selector).slice(0, 200), property: String(property).slice(0, 100), value: String(value).slice(0, 300) };
            if (idx !== -1) cfg.cssRules[idx] = rule; else cfg.cssRules.push(rule);
            break;
        }
        case "remove_css": {
            const { selector } = body;
            if (!selector) return json({ ok: false, error: "selector is required." }, 400);
            cfg.cssRules = cfg.cssRules.filter(r => r.selector !== selector);
            break;
        }
        case "clear_css": {
            cfg.cssRules = [];
            break;
        }
        case "set_flag": {
            const { flag, value } = body;
            if (!flag) return json({ ok: false, error: "flag is required." }, 400);
            cfg.flags[flag] = value;
            break;
        }
        case "clear_flag": {
            const { flag } = body;
            if (!flag) return json({ ok: false, error: "flag is required." }, 400);
            delete cfg.flags[flag];
            break;
        }
        case "clear_flags": {
            cfg.flags = {};
            break;
        }
        default:
            return json({ ok: false, error: "Unknown action." }, 400);
    }

    await saveRemoteConfig(env, cfg);
    return json({ ok: true, cssRules: cfg.cssRules, flags: cfg.flags });
}

async function handleBugReports(request, env) {
    const body = await request.json().catch(() => ({}));
    const { token, action } = body;

    const raw = await env.WHD_USERS.get("__bugreports__");
    let reports = raw ? JSON.parse(raw) : [];

    if (action === "list") {
        return json({ ok: true, reports });
    }

    if (action === "add") {
        const caller = token ? await getUserFromToken(token, env) : null;
        const title = String(body.title || "").trim().slice(0, 120);
        if (!title) return json({ ok: false, error: "Title is required." }, 400);
        const validSev = ["low", "medium", "high", "critical"];
        const report = {
            id:        "bug_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7),
            title,
            category:  String(body.category || "other").slice(0, 30),
            severity:  validSev.includes(body.severity) ? body.severity : "high",
            details:   String(body.details || "").trim().slice(0, 2000),
            url:       String(body.url || "").trim().slice(0, 300),
            reporter:  caller ? caller.username : "anonymous",
            ts:        Date.now(),
            resolved:  false,
        };
        reports.unshift(report);
        reports = reports.slice(0, 500); // cap stored history
        await env.WHD_USERS.put("__bugreports__", JSON.stringify(reports));
        return json({ ok: true, report });
    }

    // Everything past this point mutates/removes existing reports — admin only.
    const caller = await getUserFromToken(token, env);
    if (!caller) return json({ ok: false, error: "Not authenticated." }, 401);
    if (!isAdminOrAbove(caller)) return json({ ok: false, error: "Admin access required." }, 403);

    if (action === "resolve" || action === "reopen") {
        const r = reports.find(x => x.id === body.id);
        if (!r) return json({ ok: false, error: "Report not found." }, 404);
        r.resolved   = action === "resolve";
        r.resolvedAt = r.resolved ? Date.now() : null;
        await env.WHD_USERS.put("__bugreports__", JSON.stringify(reports));
        return json({ ok: true, report: r });
    }

    if (action === "delete") {
        const before = reports.length;
        reports = reports.filter(x => x.id !== body.id);
        if (reports.length === before) return json({ ok: false, error: "Report not found." }, 404);
        await env.WHD_USERS.put("__bugreports__", JSON.stringify(reports));
        return json({ ok: true });
    }

    if (action === "clear") {
        await env.WHD_USERS.put("__bugreports__", JSON.stringify([]));
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
            // Two ways in: the legacy shared passcode, OR a session token
            // belonging to a logged-in admin/owner. The token path matters
            // because admin/owner accounts skip the passcode *prompt*
            // entirely (see admin.js _applyPanelRole) — without this they
            // had no way to actually authenticate a write, so every owner
            // terminal command that touched scenes/tree/deleted silently
            // stayed local-only forever, even though the UI never told
            // them their passcode was "wrong" (it just never asked).
            const passcodeOk = !!env.ADMIN_PASSCODE && body.passcode === env.ADMIN_PASSCODE;
            let tokenOk = false;
            if (!passcodeOk && body.token) {
                const caller = await getUserFromToken(body.token, env);
                tokenOk = isAdminOrAbove(caller);
            }
            if (!passcodeOk && !tokenOk) {
                return json({ ok: false, error: "Invalid passcode" }, 401);
            }
            const { passcode, token, ...payload } = body;
            await env.ADMIN_KV.put(KV_KEY, JSON.stringify(payload));
            return json({ ok: true });
        }

        // Auth
        if (url.pathname === "/auth/signup")         return handleSignup(request, env);
        if (url.pathname === "/auth/login")           return handleLogin(request, env);
        if (url.pathname === "/auth/resetpassword")    return handleResetPassword(request, env);
        if (url.pathname === "/auth/resetrequest")     return handleResetRequest(request, env);
        if (url.pathname === "/auth/resetverify")      return handleResetVerify(request, env);
        if (url.pathname === "/auth/resetconfirm")     return handleResetConfirm(request, env);
        if (url.pathname === "/auth/updatesecurityquestion") return handleUpdateSecurityQuestion(request, env);
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
        if (url.pathname === "/auth/remoteconfig/status") return handleRemoteConfigStatus(request, env);
        if (url.pathname === "/auth/remoteconfig")    return handleRemoteConfig(request, env);
        if (url.pathname === "/auth/bugs")            return handleBugReports(request, env);

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