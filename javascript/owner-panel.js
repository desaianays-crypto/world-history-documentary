// owner-panel.js — standalone owner terminal panel.
//
// This is intentionally NOT the Admin Panel. It has no tabs, no scene forms,
// no bug queue — it is just the terminal, for the owner role only, opened
// instantly without the Add/Edit/Manage/Tree/Bugs/Info chrome in the way.
//
// It does not reimplement the command engine. Everything here is driven
// through window.WHDAdmin (exposed by admin.js): run(), print(), match(),
// getSuggestions(), getHintText(), history, commands, setOutput().
// That means autocomplete/usage-hint fixes only ever need to live in one
// place (admin.js) and both terminal UIs inherit them automatically.
//
// Open with Ctrl+Shift+O (owner only), or window.WHDOwnerPanel.open().

(function () {
    const OUTPUT_ID = "ownerTermOutput";
    let built = false;
    let histIdx = 0;
    let suggIdx = -1;

    function isOwner() {
        return !!(window.WHDAuth &&
            (typeof window.WHDAuth.isOwner === "function" ? window.WHDAuth.isOwner() : window.WHDAuth.getRole?.() === "owner"));
    }

    function escHtml(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

    // ── Build (once) ────────────────────────────────────────────────────
    function build() {
        if (built) return;
        built = true;

        const wrap = document.createElement("div");
        wrap.innerHTML = `
        <div id="ownerPanelOverlay">
            <div id="ownerPanel">
                <div class="resize-handle" data-dir="r"></div>
                <div class="resize-handle" data-dir="b"></div>
                <div class="resize-handle" data-dir="br"></div>
                <div class="resize-handle" data-dir="l"></div>
                <div class="resize-handle" data-dir="t"></div>
                <div class="resize-handle" data-dir="tl"></div>
                <div class="resize-handle" data-dir="bl"></div>
                <div class="resize-handle" data-dir="tr"></div>
                <div id="ownerPanelHeader">
                    <h2>⌨️ Owner Terminal</h2>
                    <button id="ownerPanelCloseBtn" title="Close (Esc)">✕</button>
                </div>
                <div id="${OUTPUT_ID}" class="admin-term-output owner-term-output"></div>
                <div class="admin-term-inputwrap">
                    <div class="admin-term-inputrow">
                        <span class="admin-term-prompt">&gt;</span>
                        <input id="ownerTermInput" type="text" class="admin-input admin-term-input" placeholder="Type a command…" autocomplete="off" spellcheck="false"/>
                        <button class="admin-btn admin-btn-primary" id="ownerTermRunBtn">Run</button>
                    </div>
                    <div id="ownerTermHint" class="admin-term-hint"></div>
                    <div id="ownerTermSuggest" class="admin-term-suggest"></div>
                </div>
            </div>
        </div>`;
        document.body.appendChild(wrap);

        document.getElementById("ownerPanelCloseBtn").addEventListener("click", close);

        wireTerminal();
        wireMoveAndResize();
    }

    // ── Open / Close ─────────────────────────────────────────────────────
    function open() {
        if (!isOwner()) return;
        build();

        if (_dragCtl) _dragCtl.restoreSaved();

        const WA = window.WHDAdmin;
        if (WA && typeof WA.setOutput === "function") WA.setOutput(OUTPUT_ID);

        const overlay = document.getElementById("ownerPanelOverlay");
        overlay.style.display = "flex";
        overlay.classList.add("visible");
        setTimeout(() => overlay.classList.add("active"), 10);

        printBootMessage();
        histIdx = (WA && WA.history ? WA.history.length : 0);
        setTimeout(() => document.getElementById("ownerTermInput")?.focus(), 60);
        document.addEventListener("keydown", onEscClose);
    }

    function close() {
        const overlay = document.getElementById("ownerPanelOverlay");
        if (!overlay) return;
        overlay.classList.remove("active");
        setTimeout(() => { overlay.classList.remove("visible"); overlay.style.display = "none"; }, 200);
        document.removeEventListener("keydown", onEscClose);
        // Hand terminal output back to the admin panel's terminal tab so it
        // keeps working normally if/when that's opened instead.
        const WA = window.WHDAdmin;
        if (WA && typeof WA.setOutput === "function") WA.setOutput("adminTermOutput");
    }

    function onEscClose(e) {
        if (e.key !== "Escape") return;
        // If a confirm/replace dialog is open on top of the panel, let that
        // dialog's own Escape handler cancel it first instead of also
        // closing the whole panel underneath in the same keystroke.
        const confirmEl = document.getElementById("adminConfirm");
        const replaceEl = document.getElementById("adminReplace");
        if ((confirmEl && confirmEl.style.display !== "none") ||
            (replaceEl && replaceEl.style.display !== "none")) return;
        close();
    }

    // ── Boot message ─────────────────────────────────────────────────────
    // Printed once per page session (guarded by dataset.inited on the
    // output element itself), so reopening the panel won't repeat it.
    function printBootMessage() {
        const out = document.getElementById(OUTPUT_ID);
        const WA = window.WHDAdmin;
        if (!out || !WA || out.dataset.inited) return;
        out.dataset.inited = "1";
        const user = window.WHDAuth?.getUsername?.() ?? "";
        const role = window.WHDAuth?.getRole?.() ?? "owner";
        const cmdCount = WA.commands ? WA.commands.length : 0;
        WA.print(`WHD Owner Terminal  ·  ${user ? user + " · " : ""}${role}`, "term-ok");
        WA.print(`${cmdCount} commands loaded. Type 'help' for a list, Tab to autocomplete, ↑/↓ for history.`, "term-info");
        WA.print("", "term-info");
    }

    // ── Terminal UI wiring (mirrors admin.js's input handling, but talks
    //    to WA.getSuggestions/match/run instead of local closures, so the
    //    underlying logic — and its bug fixes — stay in exactly one place) ──
    function wireTerminal() {
        const input   = document.getElementById("ownerTermInput");
        const btn     = document.getElementById("ownerTermRunBtn");
        const suggest = document.getElementById("ownerTermSuggest");
        const hintLine = document.getElementById("ownerTermHint");
        const WA = window.WHDAdmin;
        if (!input || !btn || !WA) return;

        function updateHint(raw) {
            if (!hintLine) return;
            hintLine.textContent = typeof WA.getHintText === "function" ? WA.getHintText(raw) : "";
        }

        function refresh() {
            updateHint(input.value);
            renderSuggest(input.value);
        }

        function closeSuggest() {
            if (!suggest) return;
            suggest.classList.remove("open");
            suggest.innerHTML = "";
            suggIdx = -1;
        }

        function appendSuggestFooter(total, shownCount, browsing, fuzzy) {
            const footer = document.createElement("div");
            footer.className = "admin-term-sugg-footer";
            const note = document.createElement("span");
            note.className = "admin-term-sugg-footer-note";
            if (total > shownCount) note.textContent = `+${total - shownCount} more — keep typing to narrow`;
            else if (browsing) note.textContent = `${total} commands`;
            else if (fuzzy) note.textContent = "No exact match — closest results";
            const keys = document.createElement("span");
            keys.className = "admin-term-sugg-footer-keys";
            keys.textContent = "↑↓ select · Tab/Enter accept · Esc close";
            footer.append(note, keys);
            suggest.appendChild(footer);
        }

        function renderSuggest(raw) {
            if (!suggest || typeof WA.getSuggestions !== "function") return;
            const { mode, items, label, total = items.length, browsing, fuzzy } = WA.getSuggestions(raw);
            if (!items || !items.length) { closeSuggest(); return; }
            suggest.innerHTML = "";
            suggIdx = -1;

            const hl = (text, typed) => {
                if (!typed) return escHtml(text);
                if (fuzzy) return typeof WA.highlightFuzzy === "function" ? WA.highlightFuzzy(text, typed) : escHtml(text);
                return typeof WA.highlightSubstring === "function" ? WA.highlightSubstring(text, typed) : escHtml(text);
            };

            if (mode === "cmd") {
                const typed = raw.trimStart().toLowerCase();
                items.forEach((c, i) => {
                    const item = document.createElement("div");
                    item.className = "admin-term-sugg-item";
                    const iconEl = document.createElement("span");
                    iconEl.className = "admin-term-sugg-icon";
                    iconEl.textContent = (c.cat || "?").charAt(0).toUpperCase();
                    const cmdEl = document.createElement("span");
                    cmdEl.className = "admin-term-sugg-cmd";
                    cmdEl.innerHTML = hl(c.cmd, typed);
                    const hintEl = document.createElement("span");
                    hintEl.className = "admin-term-sugg-hint";
                    hintEl.textContent = c.hint;
                    const descEl = document.createElement("span");
                    descEl.className = "admin-term-sugg-desc";
                    descEl.textContent = c.desc;
                    const catEl = document.createElement("span");
                    catEl.className = "admin-term-sugg-cat";
                    catEl.textContent = c.cat;
                    item.append(iconEl, cmdEl, hintEl, descEl, catEl);
                    if (i === 0 && !browsing) item.classList.add("admin-term-sugg-item-top");
                    item.addEventListener("mousedown", e => { e.preventDefault(); acceptSuggestion(mode, c); });
                    suggest.appendChild(item);
                });
            } else {
                const endsWithSpace = /\s$/.test(raw);
                const tokens = raw.trim().length ? raw.trim().split(/\s+/) : [];
                const typedPartial = endsWithSpace ? "" : (tokens[tokens.length - 1] || "").toLowerCase();
                items.forEach((rawItem, i) => {
                    const val  = (rawItem && typeof rawItem === "object") ? rawItem.value : rawItem;
                    const desc = (rawItem && typeof rawItem === "object") ? rawItem.desc  : "";
                    const item = document.createElement("div");
                    item.className = "admin-term-sugg-item admin-term-sugg-item-arg";
                    const iconEl = document.createElement("span");
                    iconEl.className = "admin-term-sugg-icon admin-term-sugg-icon-arg";
                    iconEl.textContent = (label || "?").charAt(0).toUpperCase();
                    const cmdEl = document.createElement("span");
                    cmdEl.className = "admin-term-sugg-cmd";
                    cmdEl.innerHTML = hl(String(val), typedPartial);
                    const hintEl = document.createElement("span");
                    hintEl.className = "admin-term-sugg-hint" + (desc ? " admin-term-sugg-hint-desc" : "");
                    hintEl.textContent = desc || label || "";
                    item.append(iconEl, cmdEl, hintEl);
                    if (i === 0) item.classList.add("admin-term-sugg-item-top");
                    item.addEventListener("mousedown", e => { e.preventDefault(); acceptSuggestion(mode, rawItem); });
                    suggest.appendChild(item);
                });
            }
            appendSuggestFooter(total, items.length, !!browsing, !!fuzzy);
            suggest.classList.add("open");
        }

        function acceptSuggestion(mode, choice) {
            // Delegates to admin.js's shared, multi-word-aware boundary
            // resolver instead of re-implementing (and re-breaking) the
            // same "which tokens does this suggestion replace" logic here.
            if (typeof WA.buildAcceptedValue === "function") {
                input.value = WA.buildAcceptedValue(input.value, mode, choice);
            } else if (mode === "cmd") {
                input.value = choice.cmd + (choice.hint ? " " : "");
            } else {
                const value = (choice && typeof choice === "object") ? choice.value : choice;
                const endsWithSpace = /\s$/.test(input.value);
                const tokens = input.value.trim().length ? input.value.trim().split(/\s+/) : [];
                const match = typeof WA.match === "function" ? WA.match(tokens) : null;
                const cmdLen = match ? match.cmdLen : 0;
                const keepCount = endsWithSpace ? tokens.length : Math.max(cmdLen, tokens.length - 1);
                const kept = tokens.slice(0, keepCount);
                input.value = kept.join(" ") + (kept.length ? " " : "") + value + " ";
            }
            closeSuggest();
            input.focus();
            refresh(); // immediately offer the next argument, if any
        }

        function moveSuggIdx(dir) {
            if (!suggest?.classList.contains("open")) return false;
            const items = suggest.querySelectorAll(".admin-term-sugg-item");
            if (!items.length) return false;
            items[suggIdx]?.classList.remove("active");
            suggIdx = Math.max(0, Math.min(items.length - 1, suggIdx + dir));
            items[suggIdx].classList.add("active");
            items[suggIdx].scrollIntoView({ block: "nearest" });
            return true;
        }

        const run = () => {
            const val = input.value.trim();
            if (!val) return;
            input.value = "";
            if (hintLine) hintLine.textContent = "";
            closeSuggest();
            WA.run(val);
            histIdx = WA.history ? WA.history.length : 0;
        };

        btn.addEventListener("click", run);

        input.addEventListener("keydown", e => {
            const open_ = suggest?.classList.contains("open");
            if (e.key === "Enter") {
                if (open_ && suggIdx >= 0) {
                    const { mode, items } = WA.getSuggestions(input.value);
                    if (items[suggIdx] !== undefined) { acceptSuggestion(mode, items[suggIdx]); e.preventDefault(); return; }
                }
                run(); return;
            }
            if (e.key === "Tab") {
                e.preventDefault();
                const { mode, items } = WA.getSuggestions(input.value);
                if (!items.length) return;
                if (items.length === 1 || (open_ && suggIdx >= 0)) {
                    acceptSuggestion(mode, items[open_ && suggIdx >= 0 ? suggIdx : 0]); return;
                }
                if (mode === "cmd") {
                    const lcp = items.reduce((common, c) => {
                        let i = 0;
                        while (i < common.length && c.cmd[i] === common[i]) i++;
                        return common.slice(0, i);
                    }, items[0].cmd);
                    if (lcp.length > input.value.trimStart().length) input.value = lcp + " ";
                }
                refresh();
                return;
            }
            if (e.key === "Escape") { if (open_) { closeSuggest(); e.preventDefault(); } return; }
            const hist = WA.history || [];
            if (e.key === "ArrowDown") {
                if (open_) { moveSuggIdx(1); e.preventDefault(); return; }
                if (histIdx < hist.length) { input.value = hist[++histIdx] || ""; refresh(); }
                e.preventDefault(); return;
            }
            if (e.key === "ArrowUp") {
                if (open_) { moveSuggIdx(-1); e.preventDefault(); return; }
                if (histIdx > 0) { input.value = hist[--histIdx]; refresh(); }
                e.preventDefault(); return;
            }
        });

        input.addEventListener("input", () => {
            histIdx = (WA.history || []).length;
            refresh();
        });
        input.addEventListener("blur",  () => { setTimeout(closeSuggest, 120); if (hintLine) hintLine.textContent = ""; });
        input.addEventListener("focus", () => refresh());

        histIdx = (WA.history || []).length;
    }

    // ── Move & resize (QoL) ──────────────────────────────────────────────
    // Delegates to the same drag/resize engine the scene info panel uses
    // (panel-drag.js) — drag the header to move, grab any of the 8
    // .resize-handle divs to resize from that edge/corner. Geometry is
    // persisted as one JSON blob in localStorage so it reopens where it
    // was left; a short post-release "interacting" grace period (handled
    // inside the engine) is what stops a drag/resize release from being
    // misread as a click that should close the panel.
    const GEOM_KEY = "whd_owner_panel_geom";
    const MIN_W = 420, MIN_H = 320;
    let _dragCtl = null;

    function loadGeom() {
        try { return JSON.parse(localStorage.getItem(GEOM_KEY)) || null; } catch { return null; }
    }
    function saveGeom(geom) {
        try { localStorage.setItem(GEOM_KEY, JSON.stringify(geom)); } catch {}
    }

    function wireMoveAndResize() {
        const panel = document.getElementById("ownerPanel");
        const header = document.getElementById("ownerPanelHeader");
        if (!panel || !header || !window.WHDPanelDrag) return;
        _dragCtl = window.WHDPanelDrag.attach({
            panel,
            dragHandle: header,
            minWidth: MIN_W,
            minHeight: MIN_H,
            getGeom: loadGeom,
            setGeom: saveGeom,
        });
    }

    // ── Global shortcut: Ctrl+Shift+O (owner only) ──────────────────────
    document.addEventListener("keydown", e => {
        if (!(e.ctrlKey && e.shiftKey && (e.key === "O" || e.key === "o"))) return;
        if (!isOwner()) return;
        e.preventDefault();
        const overlay = document.getElementById("ownerPanelOverlay");
        if (overlay && overlay.classList.contains("visible")) close(); else open();
    });

    window.WHDOwnerPanel = { open, close };
})();
