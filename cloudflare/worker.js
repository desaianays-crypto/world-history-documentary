// World History Documentary — shared admin data Worker
//
// Stores the admin panel's content edits (added/edited scenes, deletions,
// world-tree overrides) in a Cloudflare KV namespace so every visitor's
// browser sees the same content, instead of each browser only seeing its
// own localStorage.
//
// Endpoints:
//   GET  /data     → public. Returns the current shared admin data as JSON.
//   POST /verify   → body { passcode }. Returns { ok: true|false }.
//   POST /data     → body { passcode, scenes, deleted, deletedStore, tree }.
//                    Requires a correct passcode. Overwrites the stored data.
//
// Setup:
//   1. Create a KV namespace (Workers & Pages → KV → Create namespace),
//      name it something like ADMIN_KV.
//   2. Create a new Worker, paste this file as its code.
//   3. Bind the KV namespace to the Worker under the variable name ADMIN_KV
//      (Settings → Variables → KV Namespace Bindings).
//   4. Add a secret: Settings → Variables → Environment Variables →
//      "Add variable" → name it ADMIN_PASSCODE, mark it "Encrypt", and set
//      its value to whatever passcode you want admins to use.
//   5. Deploy. Copy the Worker's URL (https://xxx.yyy.workers.dev) into
//      WORKER_URL near the top of admin.js.

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

export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        if (request.method === "OPTIONS") {
            return new Response(null, { headers: CORS_HEADERS });
        }

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

        return json({ ok: false, error: "Not found" }, 404);
    },
};
