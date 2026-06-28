
const BUG_CATEGORY_LABELS = {
    ui:       "UI / Visual",
    playback: "Playback",
    map:      "Map",
    audio:    "Audio",
    auth:     "Login / Auth",
    playlist: "Playlists",
    admin:    "Admin Panel",
    other:    "Other",
};

const BUG_SEV_ORDER = { critical: 0, high: 1, medium: 2, low: 3 };

// ── State ────────────────────────────────────────────────────────
let _bugsFilter = "open";   // "open" | "resolved" | "all"
let _bugsSort   = "newest"; // "newest" | "severity" | "category"

async function renderBugsTab(opts) {
    const container = document.getElementById("adminBugsContainer");
    if (!container) return;

    if (opts && opts.useCache) {
        _paintBugsTab(getCachedBugReports());
        await loadBugReports();
        _paintBugsTab(getCachedBugReports());
    } else {
        const reports = await loadBugReports();
        _paintBugsTab(reports);
    }
}

function _paintBugsTab(allReports) {
    const container = document.getElementById("adminBugsContainer");
    if (!container) return;

    allReports = allReports || [];

    // Filter
    let reports = allReports.filter(r => {
        if (_bugsFilter === "open")     return !r.resolved;
        if (_bugsFilter === "resolved") return !!r.resolved;
        return true; // "all"
    });

    // Sort
    reports.sort((a, b) => {
        if (_bugsSort === "severity") {
            const sa = BUG_SEV_ORDER[a.severity] ?? 99;
            const sb = BUG_SEV_ORDER[b.severity] ?? 99;
            if (sa !== sb) return sa - sb;
        }
        if (_bugsSort === "category") {
            const ca = (BUG_CATEGORY_LABELS[a.category] || a.category || "");
            const cb = (BUG_CATEGORY_LABELS[b.category] || b.category || "");
            if (ca !== cb) return ca.localeCompare(cb);
        }
        // Default / tiebreak: newest first
        return (b.ts || 0) - (a.ts || 0);
    });

    const openCount     = allReports.filter(r => !r.resolved).length;
    const resolvedCount = allReports.filter(r =>  r.resolved).length;

    container.innerHTML = `
        <div class="bugs-toolbar">
            <div class="bugs-filter-group" role="group" aria-label="Filter bugs">
                ${["open","resolved","all"].map(f => `
                    <button
                        class="bugs-filter-btn ${_bugsFilter === f ? "active" : ""}"
                        onclick="_setBugsFilter('${f}')"
                    >${f === "open" ? `Open (${openCount})` : f === "resolved" ? `Resolved (${resolvedCount})` : `All (${allReports.length})`}</button>
                `).join("")}
            </div>

            <div class="bugs-sort-row">
                <label class="bugs-sort-label">Sort:</label>
                <select id="bugsSortSel" class="bug-input bugs-sort-sel" style="min-width:130px" onchange="_setBugsSort(this.value)">
                    <option value="newest"   ${_bugsSort==="newest"   ?"selected":""}>Newest first</option>
                    <option value="severity" ${_bugsSort==="severity" ?"selected":""}>Severity</option>
                    <option value="category" ${_bugsSort==="category" ?"selected":""}>Category</option>
                </select>
                ${allReports.length > 0 ? `<button class="bugs-clear-btn" onclick="_confirmClearAllBugs()">Clear All</button>` : ""}
            </div>
        </div>

        ${reports.length === 0 ? `
            <div class="bugs-empty">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="opacity:.5"><path d="M8 2l1.5 1.5"/><path d="M16 2l-1.5 1.5"/><path d="M9 7.5h6a3 3 0 0 1 3 3V14a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5v-3.5a3 3 0 0 1 3-3z"/><path d="M5 12H2"/><path d="M22 12h-3"/><path d="M5 17l-2.5 2"/><path d="M19 17l2.5 2"/><path d="M5 8.5L3 7"/><path d="M19 8.5L21 7"/><line x1="12" y1="7.5" x2="12" y2="19"/></svg>
                <div>${_bugsFilter === "open" ? "No open bug reports." : _bugsFilter === "resolved" ? "No resolved reports yet." : "No bug reports yet."}</div>
                <div style="font-size:11px;opacity:.45;margin-top:4px">Reported by any user, visible to every admin. Press <kbd class="bugs-kbd">B</kbd> to file one</div>
            </div>
        ` : `
            <div class="bugs-list" role="list">
                ${reports.map(r => _renderBugCard(r)).join("")}
            </div>
        `}
    `;

    if (typeof initCustomSelects === "function") initCustomSelects(["bugsSortSel"]);
}

// ── Single bug card ──────────────────────────────────────────────
function _renderBugCard(r) {
    const sevClass  = "bug-sev-" + (r.severity || "other");
    const catLabel  = BUG_CATEGORY_LABELS[r.category] || r.category || "Other";
    const date      = r.ts ? new Date(r.ts).toLocaleString() : "Unknown";
    const resolved  = !!r.resolved;
    const resolvedAt = r.resolvedAt ? new Date(r.resolvedAt).toLocaleString() : null;

    return `
        <div class="bug-card ${resolved ? "bug-card-resolved" : ""}" role="listitem" data-bug-id="${escBugAdmin(r.id)}">
            <div class="bug-card-header">
                <span class="bug-sev-pill ${sevClass}">${(r.severity || "?").toUpperCase()}</span>
                <span class="bug-cat-pill">${escBugAdmin(catLabel)}</span>
                <span class="bug-card-title">${escBugAdmin(r.title)}</span>
                ${resolved ? `<span class="bug-resolved-badge">✓ Resolved</span>` : ""}
            </div>

            ${r.details ? `
                <div class="bug-card-details">${escBugAdmin(r.details)}</div>
            ` : ""}

            <div class="bug-card-meta">
                <span>👤 ${escBugAdmin(r.reporter || "anonymous")}</span>
                <span>🕐 ${escBugAdmin(date)}</span>
                ${r.url ? `<span class="bug-card-url" title="${escBugAdmin(r.url)}">🔗 ${escBugAdmin(_truncateUrl(r.url))}</span>` : ""}
                ${resolvedAt ? `<span>✓ Resolved ${escBugAdmin(resolvedAt)}</span>` : ""}
            </div>

            <div class="bug-card-actions">
                ${!resolved ? `
                    <button class="bug-action-btn bug-resolve-btn" onclick="_resolveBug('${escBugAdmin(r.id)}')">
                        ✓ Mark Resolved
                    </button>
                ` : `
                    <button class="bug-action-btn bug-reopen-btn" onclick="_reopenBug('${escBugAdmin(r.id)}')">
                        ↩ Reopen
                    </button>
                `}
                <button class="bug-action-btn bug-delete-btn" onclick="_deleteBug('${escBugAdmin(r.id)}')">
                    🗑 Delete
                </button>
            </div>
        </div>
    `;
}

// ── Actions ──────────────────────────────────────────────────────
async function _resolveBug(id) {
    const data = await resolveBugReport(id);
    if (!data || !data.ok) { showToast((data && data.error) || "Couldn't resolve bug."); return; }
    _paintBugsTab(getCachedBugReports());
    showToast("Bug marked as resolved.");
}

async function _reopenBug(id) {
    const data = await reopenBugReport(id);
    if (!data || !data.ok) { showToast((data && data.error) || "Couldn't reopen bug."); return; }
    _paintBugsTab(getCachedBugReports());
    showToast("Bug reopened.");
}

async function _deleteBug(id) {
    const data = await deleteBugReport(id);
    if (!data || !data.ok) { showToast((data && data.error) || "Couldn't delete bug."); return; }
    _paintBugsTab(getCachedBugReports());
    showToast("Bug report deleted.");
}

function _confirmClearAllBugs() {
    const run = async () => {
        const data = await clearAllBugReports();
        if (!data || !data.ok) { showToast((data && data.error) || "Couldn't clear reports."); return; }
        _paintBugsTab(getCachedBugReports());
        showToast("All bug reports cleared.");
    };
    if (typeof showAppConfirm === "function") {
        showAppConfirm({
            icon: "⚠️",
            title: "Clear all bug reports?",
            msg: "This deletes every bug report for every user. This cannot be undone.",
            okLabel: "Delete All",
            okDanger: true,
        }).then(ok => { if (ok) run(); });
    } else if (window.WHDAdmin && typeof window.WHDAdmin.confirm === "function") {
        window.WHDAdmin.confirm({ icon: "⚠️", title: "Delete ALL bug reports?", msg: "This cannot be undone.", okLabel: "Delete All", okClass: "admin-btn-danger" })
            .then(ok => { if (ok) run(); });
    }
}

function _setBugsFilter(f) {
    _bugsFilter = f;
    _paintBugsTab(getCachedBugReports());
}

function _setBugsSort(s) {
    _bugsSort = s;
    _paintBugsTab(getCachedBugReports());
}

// ── Utilities ─────────────────────────────────────────────────────
function escBugAdmin(s) {
    return (s == null ? "" : String(s))
        .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;");
}

function _truncateUrl(url) {
    try {
        const u = new URL(url);
        return (u.hostname + u.pathname).slice(0, 50) + (url.length > 50 ? "…" : "");
    } catch (e) {
        return url.slice(0, 50) + (url.length > 50 ? "…" : "");
    }
}
