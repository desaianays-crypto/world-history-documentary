
function _bugWorkerUrl() {
    return (typeof window.WHDAuth !== "undefined" && window.WHDAuth.workerUrl) || "";
}
function _bugToken() {
    return (typeof window.WHDAuth !== "undefined" && window.WHDAuth.getToken) ? window.WHDAuth.getToken() : null;
}

// ── Server-backed storage ────────────────────────────────────────
let _bugReportsCache = [];      // last known list, kept in sync with the server
let _bugReportsLoaded = false;

async function _bugApi(action, extra) {
    try {
        const res = await fetch(_bugWorkerUrl() + "/auth/bugs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: _bugToken(), action, ...(extra || {}) }),
        });
        return await res.json().catch(() => ({ ok: false }));
    } catch (e) {
        return { ok: false, error: "Network error." };
    }
}

// Fetches the latest shared list from the server and refreshes the cache.
// Returns the reports array. Safe to call as often as needed.
async function loadBugReports() {
    const data = await _bugApi("list");
    if (data && data.ok && Array.isArray(data.reports)) {
        _bugReportsCache = data.reports;
        _bugReportsLoaded = true;
        window.dispatchEvent(new Event("whd:bugs:updated"));
    }
    return _bugReportsCache;
}

function getCachedBugReports() {
    return _bugReportsCache;
}

async function addBugReport(report) {
    const data = await _bugApi("add", report);
    if (data && data.ok) await loadBugReports();
    return data;
}

async function resolveBugReport(id) {
    const data = await _bugApi("resolve", { id });
    if (data && data.ok) await loadBugReports();
    return data;
}

async function reopenBugReport(id) {
    const data = await _bugApi("reopen", { id });
    if (data && data.ok) await loadBugReports();
    return data;
}

async function deleteBugReport(id) {
    const data = await _bugApi("delete", { id });
    if (data && data.ok) await loadBugReports();
    return data;
}

async function clearAllBugReports() {
    const data = await _bugApi("clear");
    if (data && data.ok) await loadBugReports();
    return data;
}

// ── Panel open/close ─────────────────────────────────────────────
let _bugPanelOpen = false;

function openBugReportPanel() {
    if (document.getElementById("bugReportOverlay")) return;
    _bugPanelOpen = true;

    const overlay = document.createElement("div");
    overlay.id = "bugReportOverlay";
    overlay.innerHTML = `
        <div id="bugReportModal" role="dialog" aria-modal="true" aria-label="Bug Report">
            <div class="bug-modal-header">
                <span class="bug-modal-title"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><path d="M8 2l1.5 1.5"/><path d="M16 2l-1.5 1.5"/><path d="M9 7.5h6a3 3 0 0 1 3 3V14a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5v-3.5a3 3 0 0 1 3-3z"/><path d="M5 12H2"/><path d="M22 12h-3"/><path d="M5 17l-2.5 2"/><path d="M19 17l2.5 2"/><path d="M5 8.5L3 7"/><path d="M19 8.5L21 7"/><line x1="12" y1="7.5" x2="12" y2="19"/></svg>Report a Bug</span>
                <button class="bug-modal-close" onclick="closeBugReportPanel()" aria-label="Close">✕</button>
            </div>

            <div class="bug-field-group">
                <label class="bug-label" for="bugTitle">Title <span class="bug-required">*</span></label>
                <input
                    id="bugTitle"
                    class="bug-input"
                    type="text"
                    placeholder="Short description of the issue…"
                    maxlength="120"
                    autocomplete="off"
                />
            </div>

            <div class="bug-field-group">
                <label class="bug-label" for="bugCategory">Category</label>
                <select id="bugCategory" class="bug-input">
                    <option value="ui">UI / Visual</option>
                    <option value="playback">Playback</option>
                    <option value="map">Map</option>
                    <option value="audio">Audio</option>
                    <option value="auth">Login / Auth</option>
                    <option value="playlist">Playlists</option>
                    <option value="admin">Admin Panel</option>
                    <option value="other" selected>Other</option>
                </select>
            </div>

            <div class="bug-field-group">
                <label class="bug-label" for="bugSeverity">Severity</label>
                <div class="bug-severity-row" id="bugSeverity" role="radiogroup">
                    <button class="bug-sev-btn" data-sev="low"      onclick="setBugSev(this)">Low</button>
                    <button class="bug-sev-btn" data-sev="medium"   onclick="setBugSev(this)">Medium</button>
                    <button class="bug-sev-btn sev-active" data-sev="high" onclick="setBugSev(this)">High</button>
                    <button class="bug-sev-btn" data-sev="critical" onclick="setBugSev(this)">Critical</button>
                </div>
            </div>

            <div class="bug-field-group">
                <label class="bug-label" for="bugDetails">Steps to reproduce / Details</label>
                <textarea
                    id="bugDetails"
                    class="bug-input bug-textarea"
                    placeholder="What did you do? What did you expect? What happened?"
                    maxlength="2000"
                    rows="5"
                ></textarea>
            </div>

            <div class="bug-field-group">
                <label class="bug-label" for="bugUrl">Current page / URL context</label>
                <input
                    id="bugUrl"
                    class="bug-input"
                    type="text"
                    value="${escBug(window.location.href)}"
                    maxlength="300"
                    autocomplete="off"
                />
            </div>

            <div class="bug-modal-footer">
                <span class="bug-char-count" id="bugCharCount">0 / 2000</span>
                <div class="bug-footer-btns">
                    <button class="bug-btn-cancel" onclick="closeBugReportPanel()">Cancel</button>
                    <button class="bug-btn-submit" id="bugSubmitBtn" onclick="submitBugReport()">Submit Report</button>
                </div>
            </div>
        </div>
    `;

    // Close on backdrop click
    overlay.addEventListener("pointerdown", e => {
        if (e.target === overlay) closeBugReportPanel();
    });

    document.body.appendChild(overlay);

    // Animate in
    requestAnimationFrame(() => overlay.classList.add("bug-overlay-visible"));

    // Replace the native category <select> with the app's styled dropdown
    if (typeof initCustomSelects === "function") initCustomSelects(["bugCategory"]);

    // Auto-focus title
    setTimeout(() => {
        const titleInput = document.getElementById("bugTitle");
        if (titleInput) titleInput.focus();
    }, 80);

    // Char counter
    const ta = document.getElementById("bugDetails");
    const counter = document.getElementById("bugCharCount");
    if (ta && counter) {
        ta.addEventListener("input", () => {
            counter.textContent = ta.value.length + " / 2000";
            counter.classList.toggle("bug-char-warn", ta.value.length > 1800);
        });
    }
}

function closeBugReportPanel() {
    const overlay = document.getElementById("bugReportOverlay");
    if (!overlay) return;
    overlay.classList.remove("bug-overlay-visible");
    overlay.addEventListener("transitionend", () => overlay.remove(), { once: true });
    _bugPanelOpen = false;
}

function toggleBugReportPanel() {
    if (document.getElementById("bugReportOverlay")) {
        closeBugReportPanel();
    } else {
        openBugReportPanel();
    }
}

// ── Severity selection ───────────────────────────────────────────
function setBugSev(btn) {
    document.querySelectorAll(".bug-sev-btn").forEach(b => b.classList.remove("sev-active"));
    btn.classList.add("sev-active");
}

function _getSelectedSev() {
    const active = document.querySelector(".bug-sev-btn.sev-active");
    return active ? active.dataset.sev : "high";
}

// ── Submit ───────────────────────────────────────────────────────
async function submitBugReport() {
    const titleEl = document.getElementById("bugTitle");
    const title = titleEl ? titleEl.value.trim() : "";
    if (!title) {
        titleEl && titleEl.focus();
        titleEl && titleEl.classList.add("bug-input-error");
        setTimeout(() => titleEl && titleEl.classList.remove("bug-input-error"), 1200);
        showToast("Please enter a title for the bug.");
        return;
    }

    const report = {
        title:     title,
        category:  (document.getElementById("bugCategory") || {}).value || "other",
        severity:  _getSelectedSev(),
        details:   ((document.getElementById("bugDetails") || {}).value || "").trim(),
        url:       ((document.getElementById("bugUrl")     || {}).value || "").trim(),
    };

    const submitBtn = document.getElementById("bugSubmitBtn");
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Submitting…"; }

    const data = await addBugReport(report);

    if (data && data.ok) {
        showToast("Bug report submitted. Thank you!");
        closeBugReportPanel();
        // If admin panel is open on the Bugs tab, refresh it
        if (typeof renderBugsTab === "function") renderBugsTab();
    } else {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Submit Report"; }
        showToast((data && data.error) || "Couldn't submit report. Try again.");
    }
}

// ── Keyboard shortcut: B (the ONLY way to open this panel) ───────
document.addEventListener("keydown", function(e) {
    // Ignore if typing in an input / textarea / contenteditable
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || e.target.isContentEditable) return;
    if (e.key === "b" || e.key === "B") {
        // Don't fire if the admin panel is open (it has its own inputs)
        const adminPanel = document.getElementById("adminPanel");
        const adminOpen = adminPanel && adminPanel.classList.contains("visible");
        if (adminOpen) return;
        e.preventDefault();
        toggleBugReportPanel();
    }
});

// ── Utility ──────────────────────────────────────────────────────
function escBug(s) {
    return (s == null ? "" : String(s))
        .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;");
}

// ── Initial fetch (so the admin badge / Bugs tab have data ready) ─
loadBugReports();
