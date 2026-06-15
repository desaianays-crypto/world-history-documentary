// ═══════════════════════════════════════════════════════════════════════════
//  AUTH SYSTEM  —  login · signup · guest/userless · account sync
//  Worker endpoints:
//    POST /auth/signup  { username, password }        → { ok, token, error? }
//    POST /auth/login   { username, password }        → { ok, token, error? }
//    POST /auth/save    { token, data:{…} }           → { ok }
//    POST /auth/load    { token }                     → { ok, data:{…} }
//    POST /auth/delete  { token, password }           → { ok }
// ═══════════════════════════════════════════════════════════════════════════

(function () {
    const WORKER_URL    = "https://whd-admin-data.desaianays.workers.dev";
    const LS_TOKEN      = "whd_auth_token";
    const LS_USERNAME   = "whd_auth_username";
    const LS_JOINED     = "whd_auth_joined";
    const LS_GUEST      = "whd_auth_guest";
    const SYNC_DEBOUNCE = 1500;

    // ── State ─────────────────────────────────────────────────────────────
    let _token    = localStorage.getItem(LS_TOKEN)    || null;
    let _username = localStorage.getItem(LS_USERNAME) || null;
    let _joined   = localStorage.getItem(LS_JOINED)   || null;
    let _guest    = localStorage.getItem(LS_GUEST)    === "1";
    let _syncTimer  = null;
    let _lastSyncAt = null;
    let _pendingAdminCallback = null;

    // ── Public API ────────────────────────────────────────────────────────
    window.WHDAuth = {
        isLoggedIn:  () => !!_token,
        isGuest:     () => _guest && !_token,
        getUsername: () => _username,
        getToken:    () => _token,
        scheduleSyncPush,
        pushNow,
        openModal:   openAuthModal,
        logout,
        requireLogin(onSuccess) {
            if (_token) { onSuccess(); return; }
            _pendingAdminCallback = onSuccess;
            openAuthModal();
        },
    };

    // ── localStorage intercept — auto-push on data changes ────────────────
    const _origSetItem = localStorage.setItem.bind(localStorage);
    localStorage.setItem = function (key, value) {
        _origSetItem(key, value);
        if (_token && (key === "whd_settings" || key === "whd_bookmarks" || key === "whd_playlists_v1")) {
            scheduleSyncPush();
        }
    };

    // ═════════════════════════════════════════════════════════════════════
    //  AUTH MODAL  —  full-screen two-panel layout
    // ═════════════════════════════════════════════════════════════════════
    function _buildAuthModalHTML() {
        return `
<div id="authOverlay"></div>
<div id="authPanel">
  <div id="authPanelLeft">
    <div id="authBrand">
      <div id="authBrandGlyph">◈</div>
      <div id="authBrandName">World History Documentary</div>
      <div id="authBrandSub">Sync your playlists, bookmarks &amp; settings across every device.</div>
    </div>
    <div id="authFeatures">
      <div class="auth-feature"><span class="auth-feature-icon">🎬</span><span>Custom playlists</span></div>
      <div class="auth-feature"><span class="auth-feature-icon">★</span><span>Bookmarked scenes</span></div>
      <div class="auth-feature"><span class="auth-feature-icon">☁</span><span>Cloud sync across devices</span></div>
      <div class="auth-feature"><span class="auth-feature-icon">⚙</span><span>Saved settings &amp; themes</span></div>
    </div>
  </div>
  <div id="authPanelRight">
    <div id="authPanelInner">

      <div id="authTabs">
        <button class="auth-tab active" data-tab="login">Sign In</button>
        <button class="auth-tab" data-tab="signup">Create Account</button>
      </div>

      <div class="auth-form active" id="authFormLogin">
        <div class="auth-field">
          <label>Username</label>
          <input id="authLoginUser" type="text" autocomplete="username" placeholder="your username" spellcheck="false"/>
        </div>
        <div class="auth-field">
          <label>Password</label>
          <input id="authLoginPass" type="password" autocomplete="current-password" placeholder="••••••••"/>
        </div>
        <div class="auth-error" id="authLoginError"></div>
        <button class="auth-primary-btn" id="authLoginBtn">Sign In</button>
      </div>

      <div class="auth-form" id="authFormSignup">
        <div class="auth-field">
          <label>Username <span class="auth-hint">3–24 chars, letters / numbers / _</span></label>
          <input id="authSignupUser" type="text" autocomplete="username" placeholder="choose a username" spellcheck="false" maxlength="24"/>
        </div>
        <div class="auth-field">
          <label>Password <span class="auth-hint">8+ characters</span></label>
          <input id="authSignupPass" type="password" autocomplete="new-password" placeholder="••••••••" minlength="8"/>
        </div>
        <div class="auth-field">
          <label>Confirm Password</label>
          <input id="authSignupPass2" type="password" autocomplete="new-password" placeholder="••••••••"/>
        </div>
        <div id="authTransferRow" class="auth-transfer-row" style="display:none">
          <label class="auth-checkbox-label">
            <input type="checkbox" id="authTransferCheck" checked/>
            Import my local playlists, bookmarks &amp; settings into this account
          </label>
        </div>
        <div class="auth-error" id="authSignupError"></div>
        <button class="auth-primary-btn" id="authSignupBtn">Create Account</button>
      </div>

      <div id="authLoggedInRow" style="display:none">
        <div id="authWelcome"></div>
        <div id="authSyncStatus"></div>
        <button class="auth-ghost-btn" id="authLogoutBtn">Sign Out</button>
      </div>

      <div class="auth-divider"><span>or</span></div>

      <div id="authGuestRow">
        <button class="auth-ghost-btn" id="authGuestBtn">Continue as Guest</button>
        <p class="auth-notice">Guest data stays in this browser only. No account needed.</p>
      </div>

    </div>
  </div>
</div>`;
    }

    function _injectAuthModal() {
        if (document.getElementById("authModal")) return;
        const el = document.createElement("div");
        el.id = "authModal";
        el.innerHTML = _buildAuthModalHTML();
        document.body.appendChild(el);

        // Clicking the left panel (backdrop area on mobile) dismisses the modal
        // only when already logged in or guest; otherwise it's required on first visit
        document.getElementById("authOverlay").addEventListener("click", () => {
            if (_token || _guest) closeAuthModal();
        });

        document.querySelectorAll(".auth-tab").forEach(tab =>
            tab.addEventListener("click", () => _switchModalTab(tab.dataset.tab)));

        document.getElementById("authLoginBtn").addEventListener("click",  doLogin);
        document.getElementById("authSignupBtn").addEventListener("click", doSignup);
        document.getElementById("authGuestBtn").addEventListener("click",  chooseGuest);
        document.getElementById("authLogoutBtn").addEventListener("click", () => { logout(); closeAuthModal(); });

        ["authLoginUser", "authLoginPass"].forEach(id =>
            document.getElementById(id).addEventListener("keydown", e => { if (e.key === "Enter") doLogin(); }));
        ["authSignupUser", "authSignupPass", "authSignupPass2"].forEach(id =>
            document.getElementById(id).addEventListener("keydown", e => { if (e.key === "Enter") doSignup(); }));

        _renderAuthModal();
    }

    function _switchModalTab(tab) {
        document.querySelectorAll(".auth-tab").forEach(t => t.classList.toggle("active", t.dataset.tab === tab));
        document.querySelectorAll(".auth-form").forEach(f =>
            f.classList.toggle("active", f.id === "authForm" + tab.charAt(0).toUpperCase() + tab.slice(1)));
        ["authLoginError", "authSignupError"].forEach(id => {
            const e = document.getElementById(id); if (e) e.textContent = "";
        });
        const tr = document.getElementById("authTransferRow");
        if (tr) tr.style.display = (tab === "signup" && _hasLocalData()) ? "" : "none";
    }

    function _renderAuthModal() {
        if (!document.getElementById("authModal")) return;
        const loggedInRow = document.getElementById("authLoggedInRow");
        const guestRow    = document.getElementById("authGuestRow");
        const tabs        = document.getElementById("authTabs");
        const forms       = document.querySelectorAll(".auth-form");
        const divider     = document.querySelector(".auth-divider");

        if (_token && _username) {
            loggedInRow.style.display = "";
            guestRow.style.display    = "none";
            tabs.style.display        = "none";
            forms.forEach(f => f.style.display = "none");
            if (divider) divider.style.display = "none";
            document.getElementById("authWelcome").textContent    = `Signed in as ${_username}`;
            document.getElementById("authSyncStatus").textContent =
                _lastSyncAt ? `✓ Last synced ${_friendlyTime(_lastSyncAt)}` : "✓ Syncing automatically";
        } else {
            loggedInRow.style.display = "none";
            guestRow.style.display    = "";
            tabs.style.display        = "";
            forms.forEach(f => f.style.display = "");
            if (divider) divider.style.display = "";
            const activeTab = document.querySelector(".auth-tab.active");
            if (activeTab) _switchModalTab(activeTab.dataset.tab);
        }
        _updateTopBarBtn();
    }

    function openAuthModal() {
        _injectAuthModal();
        const modal = document.getElementById("authModal");
        modal.classList.add("visible");
        _renderAuthModal();
        setTimeout(() => {
            const inp = document.querySelector(".auth-form.active input");
            if (inp) inp.focus();
        }, 80);
    }

    function closeAuthModal() {
        const modal = document.getElementById("authModal");
        if (!modal) return;
        modal.classList.remove("visible");
    }

    // ═════════════════════════════════════════════════════════════════════
    //  AUTH ACTIONS
    // ═════════════════════════════════════════════════════════════════════
    async function doLogin() {
        const user = document.getElementById("authLoginUser").value.trim();
        const pass = document.getElementById("authLoginPass").value;
        const err  = document.getElementById("authLoginError");
        if (!user || !pass) { err.textContent = "Please fill in all fields."; return; }

        const btn = document.getElementById("authLoginBtn");
        btn.textContent = "Signing in…"; btn.disabled = true;
        err.textContent = "";

        try {
            const res  = await fetch(WORKER_URL + "/auth/login", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: user, password: pass }),
            });
            const data = await res.json().catch(() => ({}));
            if (data.ok && data.token) {
                _setSession(user, data.token, data.joinedAt || null);
                document.getElementById("authLoginPass").value = "";
                await _pullAndApply();
                _renderAuthModal();
                renderSettingsAccountPage();
                window.dispatchEvent(new Event("whd:auth:loggedin"));
                closeAuthModal();
                _showSyncToast("Signed in. Your data has been loaded.");
            } else {
                err.textContent = data.error || "Incorrect username or password.";
            }
        } catch {
            err.textContent = "Couldn't reach server. Check your connection.";
        } finally {
            btn.textContent = "Sign In"; btn.disabled = false;
        }
    }

    async function doSignup() {
        const user  = document.getElementById("authSignupUser").value.trim();
        const pass  = document.getElementById("authSignupPass").value;
        const pass2 = document.getElementById("authSignupPass2").value;
        const err   = document.getElementById("authSignupError");
        err.textContent = "";

        if (!user || !pass || !pass2) { err.textContent = "Please fill in all fields."; return; }
        if (!/^[a-zA-Z0-9_]{3,24}$/.test(user)) { err.textContent = "Username: 3–24 chars, letters/numbers/_ only."; return; }
        if (pass.length < 8)  { err.textContent = "Password must be at least 8 characters."; return; }
        if (pass !== pass2)   { err.textContent = "Passwords don't match."; return; }

        const doTransfer = document.getElementById("authTransferCheck")?.checked && _hasLocalData();

        const btn = document.getElementById("authSignupBtn");
        btn.textContent = "Creating account…"; btn.disabled = true;

        try {
            const res  = await fetch(WORKER_URL + "/auth/signup", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: user, password: pass }),
            });
            const data = await res.json().catch(() => ({}));
            if (data.ok && data.token) {
                _setSession(user, data.token, data.joinedAt || null);
                document.getElementById("authSignupPass").value  = "";
                document.getElementById("authSignupPass2").value = "";

                if (doTransfer) {
                    await pushNow();
                    _showSyncToast("Account created! Local data transferred.");
                } else {
                    _showSyncToast("Account created! Your data will sync automatically.");
                }

                _renderAuthModal();
                renderSettingsAccountPage();
                window.dispatchEvent(new Event("whd:auth:loggedin"));
                closeAuthModal();
            } else {
                err.textContent = data.error || "Could not create account. Try a different username.";
            }
        } catch {
            err.textContent = "Couldn't reach server. Check your connection.";
        } finally {
            btn.textContent = "Create Account"; btn.disabled = false;
        }
    }

    function chooseGuest() {
        _guest = true;
        localStorage.setItem(LS_GUEST, "1");
        closeAuthModal();
        _updateTopBarBtn();
        renderSettingsAccountPage();
    }

    function logout() {
        _token      = null;
        _username   = null;
        _joined     = null;
        _lastSyncAt = null;
        _guest      = false;

        // Clear all personal data from this browser on sign-out
        localStorage.removeItem(LS_TOKEN);
        localStorage.removeItem(LS_USERNAME);
        localStorage.removeItem(LS_JOINED);
        localStorage.removeItem(LS_GUEST);
        _origSetItem("whd_bookmarks",    JSON.stringify([]));
        _origSetItem("whd_playlists_v1", JSON.stringify([]));
        // Retain settings (theme/volume) — those are device preferences, not personal data

        // Live refresh of UI
        if (typeof renderBookmarksList   === "function") renderBookmarksList();
        if (typeof renderPlaylistSidebar === "function") renderPlaylistSidebar();

        _updateTopBarBtn();
        _renderAuthModal();
        renderSettingsAccountPage();
    }

    function _setSession(user, token, joinedAt) {
        _token    = token;
        _username = user;
        _joined   = joinedAt || null;
        _guest    = false;
        localStorage.setItem(LS_TOKEN,    token);
        localStorage.setItem(LS_USERNAME, user);
        if (joinedAt) localStorage.setItem(LS_JOINED, joinedAt);
        localStorage.removeItem(LS_GUEST);
    }

    // ═════════════════════════════════════════════════════════════════════
    //  SETTINGS — ACCOUNT TAB
    // ═════════════════════════════════════════════════════════════════════
    function renderSettingsAccountPage() {
        const el = document.getElementById("settingsAccountContent");
        if (!el) return;

        if (_token && _username) {
            const joinedStr = _joined ? _formatDate(_joined) : "—";
            const bms = _tryJSON(localStorage.getItem("whd_bookmarks"))    || [];
            const pls = _tryJSON(localStorage.getItem("whd_playlists_v1")) || [];
            const syncStr = _lastSyncAt ? _friendlyTime(_lastSyncAt) : "Not yet synced this session";

            el.innerHTML = `
<div class="acct-card">
  <div class="acct-avatar">${_username.charAt(0).toUpperCase()}</div>
  <div class="acct-info">
    <div class="acct-username">${_escHtml(_username)}</div>
    <div class="acct-meta">Member since ${_escHtml(joinedStr)}</div>
  </div>
</div>

<div class="settings-section-title" style="margin-top:20px;">☁ Sync</div>
<div class="settings-row">
  <div class="settings-label"><span>Status</span><span class="settings-hint">Auto-syncs after each change</span></div>
  <div class="settings-control"><span class="acct-sync-badge" id="acctSyncBadge">${_escHtml(syncStr)}</span></div>
</div>
<div class="settings-row">
  <div class="settings-label"><span>Push now</span><span class="settings-hint">Force upload current data</span></div>
  <div class="settings-control"><button class="settings-btn" id="acctPushBtn">↑ Push</button></div>
</div>
<div class="settings-row">
  <div class="settings-label"><span>Pull now</span><span class="settings-hint">Restore from cloud, overwriting local</span></div>
  <div class="settings-control"><button class="settings-btn" id="acctPullBtn">↓ Pull</button></div>
</div>

<div class="settings-section-title" style="margin-top:20px;">📊 Your Data</div>
<div class="settings-row">
  <div class="settings-label"><span>Bookmarks</span></div>
  <div class="settings-control"><span class="acct-count-badge">${bms.length} scene${bms.length !== 1 ? "s" : ""}</span></div>
</div>
<div class="settings-row">
  <div class="settings-label"><span>Playlists</span></div>
  <div class="settings-control"><span class="acct-count-badge">${pls.length} playlist${pls.length !== 1 ? "s" : ""}</span></div>
</div>

<div class="settings-section-title" style="margin-top:20px;">⚠ Account Actions</div>
<div class="settings-row">
  <div class="settings-label"><span>Sign out</span><span class="settings-hint">Clears local playlists &amp; bookmarks</span></div>
  <div class="settings-control"><button class="settings-btn-danger" id="acctLogoutBtn">Sign Out</button></div>
</div>
<div class="settings-row">
  <div class="settings-label"><span>Delete account</span><span class="settings-hint">Permanently removes your account and all data</span></div>
  <div class="settings-control"><button class="settings-btn-danger" id="acctDeleteBtn">Delete Account</button></div>
</div>`;

            document.getElementById("acctPushBtn").onclick = async () => {
                const btn = document.getElementById("acctPushBtn");
                btn.textContent = "Pushing…"; btn.disabled = true;
                await pushNow();
                renderSettingsAccountPage();
                _showSyncToast("Data pushed to cloud.");
            };
            document.getElementById("acctPullBtn").onclick = async () => {
                const btn = document.getElementById("acctPullBtn");
                btn.textContent = "Pulling…"; btn.disabled = true;
                await _pullAndApply();
                renderSettingsAccountPage();
                _showSyncToast("Data restored from cloud.");
            };
            document.getElementById("acctLogoutBtn").onclick = () => {
                _showAppConfirm(
                    "Sign out?",
                    "This will clear your local playlists and bookmarks from this device.",
                    "Sign Out",
                    logout
                );
            };
            document.getElementById("acctDeleteBtn").onclick = () => _showDeleteConfirm();

        } else {
            el.innerHTML = `
<div class="acct-guest-block">
  <div class="acct-guest-icon">◈</div>
  <div class="acct-guest-title">${_guest ? "You're in Guest Mode" : "Not signed in"}</div>
  <div class="acct-guest-sub">Sign in to sync playlists, bookmarks &amp; settings across devices.</div>
  <button class="auth-primary-btn acct-signin-btn" id="acctSignInBtn">Sign In / Create Account</button>
</div>`;
            document.getElementById("acctSignInBtn").onclick = () => window.WHDAuth.openModal();
        }
    }

    // ── Delete account confirmation UI ────────────────────────────────────
    function _showDeleteConfirm() {
        // Re-use the app's confirm modal if available, otherwise build our own
        const existing = document.getElementById("acctDeleteModal");
        if (existing) existing.remove();

        const modal = document.createElement("div");
        modal.id = "acctDeleteModal";
        modal.innerHTML = `
<div class="acct-delete-backdrop"></div>
<div class="acct-delete-box">
  <div class="acct-delete-title">⚠ Delete Account</div>
  <div class="acct-delete-body">
    This will permanently delete your account and all saved data.
    This cannot be undone. Enter your password to confirm.
  </div>
  <div class="auth-field" style="margin-top:16px;">
    <label>Password</label>
    <input id="acctDeletePass" type="password" placeholder="••••••••" autocomplete="current-password"/>
  </div>
  <div class="auth-error" id="acctDeleteError"></div>
  <div class="acct-delete-btns">
    <button class="auth-ghost-btn" id="acctDeleteCancelBtn">Cancel</button>
    <button class="settings-btn-danger" id="acctDeleteConfirmBtn">Delete Forever</button>
  </div>
</div>`;
        document.body.appendChild(modal);

        document.getElementById("acctDeleteCancelBtn").onclick  = () => modal.remove();
        document.getElementById("acctDeletePass").addEventListener("keydown", e => {
            if (e.key === "Enter") doDeleteAccount();
        });
        document.getElementById("acctDeleteConfirmBtn").onclick = doDeleteAccount;
        setTimeout(() => document.getElementById("acctDeletePass").focus(), 60);
    }

    async function doDeleteAccount() {
        const pass  = document.getElementById("acctDeletePass")?.value;
        const errEl = document.getElementById("acctDeleteError");
        const btn   = document.getElementById("acctDeleteConfirmBtn");
        if (!pass) { if (errEl) errEl.textContent = "Enter your password."; return; }
        if (btn) { btn.textContent = "Deleting…"; btn.disabled = true; }
        try {
            const res  = await fetch(WORKER_URL + "/auth/delete", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: _token, password: pass }),
            });
            const data = await res.json().catch(() => ({}));
            if (data.ok) {
                document.getElementById("acctDeleteModal")?.remove();
                logout();
                _showSyncToast("Account deleted.");
            } else {
                if (errEl) errEl.textContent = data.error || "Could not delete account.";
                if (btn) { btn.textContent = "Delete Forever"; btn.disabled = false; }
            }
        } catch {
            if (errEl) errEl.textContent = "Couldn't reach server.";
            if (btn)   { btn.textContent = "Delete Forever"; btn.disabled = false; }
        }
    }

    // ── Reusable confirm helper (uses app modal if present) ───────────────
    function _showAppConfirm(title, body, confirmLabel, onConfirm) {
        if (typeof showAppConfirm === "function") {
            showAppConfirm(title, body, confirmLabel, onConfirm);
            return;
        }
        if (window.confirm(body)) onConfirm();
    }

    // ═════════════════════════════════════════════════════════════════════
    //  TOP BAR BUTTON  (sign-in button only — no tab)
    // ═════════════════════════════════════════════════════════════════════
    function _injectTopBarBtn() {
        if (document.getElementById("authTopBtn")) return;
        const btn = document.createElement("button");
        btn.id        = "authTopBtn";
        btn.className = "top-bar-btn";
        btn.onclick   = openAuthModal;
        const topBar = document.getElementById("topBar");
        if (topBar) topBar.prepend(btn);
        _updateTopBarBtn();
    }

    function _updateTopBarBtn() {
        const btn = document.getElementById("authTopBtn");
        if (!btn) return;
        if (_token && _username) {
            btn.textContent = `👤 ${_username}`;
            btn.title = "Account settings";
            btn.classList.add("auth-btn-signed-in");
            btn.onclick = () => {
                // Open settings directly on the Account tab
                if (typeof openSettings === "function") openSettings("account");
                else openAuthModal();
            };
        } else {
            btn.textContent = "👤 Sign In";
            btn.title = "Sign in or create an account";
            btn.classList.remove("auth-btn-signed-in");
            btn.onclick = openAuthModal;
        }
    }

    // ═════════════════════════════════════════════════════════════════════
    //  SYNC
    // ═════════════════════════════════════════════════════════════════════
    function _gatherData() {
        return {
            settings:  _tryJSON(localStorage.getItem("whd_settings")),
            bookmarks: _tryJSON(localStorage.getItem("whd_bookmarks")),
            playlists: _tryJSON(localStorage.getItem("whd_playlists_v1")),
        };
    }

    async function pushNow() {
        if (!_token) return;
        try {
            const res = await fetch(WORKER_URL + "/auth/save", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: _token, data: _gatherData() }),
            });
            const d = await res.json().catch(() => ({}));
            if (d.ok) {
                _lastSyncAt = Date.now();
                const badge = document.getElementById("acctSyncBadge");
                if (badge) badge.textContent = _friendlyTime(_lastSyncAt);
            }
        } catch { /* silent — offline */ }
    }

    function scheduleSyncPush() {
        if (!_token) return;
        clearTimeout(_syncTimer);
        _syncTimer = setTimeout(pushNow, SYNC_DEBOUNCE);
    }

    async function _pullAndApply() {
        if (!_token) return;
        try {
            const res  = await fetch(WORKER_URL + "/auth/load", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: _token }),
            });
            const resp = await res.json().catch(() => ({}));
            if (!resp.ok || !resp.data) return;

            if (resp.joinedAt && !_joined) {
                _joined = resp.joinedAt;
                localStorage.setItem(LS_JOINED, _joined);
            }

            const d = resp.data;
            if (d.settings)  _origSetItem("whd_settings",     JSON.stringify(d.settings));
            if (d.bookmarks) _origSetItem("whd_bookmarks",    JSON.stringify(d.bookmarks));
            if (d.playlists) _origSetItem("whd_playlists_v1", JSON.stringify(d.playlists));

            _lastSyncAt = Date.now();

            if (typeof loadSettings  === "function" && typeof applySettings === "function")
                applySettings(loadSettings(), { skipAudio: false });
            if (typeof syncSettingsUI === "function")
                syncSettingsUI(loadSettings());
            if (typeof renderPlaylistSidebar === "function") renderPlaylistSidebar();
            if (typeof renderBookmarksList   === "function") renderBookmarksList();
        } catch { /* silent */ }
    }

    // ═════════════════════════════════════════════════════════════════════
    //  ADMIN GATE
    // ═════════════════════════════════════════════════════════════════════
    window.addEventListener("whd:auth:loggedin", () => {
        if (_pendingAdminCallback) {
            const cb = _pendingAdminCallback;
            _pendingAdminCallback = null;
            closeAuthModal();
            setTimeout(cb, 300);
        }
    });

    // ═════════════════════════════════════════════════════════════════════
    //  HELPERS
    // ═════════════════════════════════════════════════════════════════════
    function _hasLocalData() {
        const bms = _tryJSON(localStorage.getItem("whd_bookmarks"))    || [];
        const pls = _tryJSON(localStorage.getItem("whd_playlists_v1")) || [];
        return bms.length > 0 || pls.length > 0;
    }
    function _tryJSON(str) {
        try { return str ? JSON.parse(str) : null; } catch { return null; }
    }
    function _escHtml(s) {
        return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    function _friendlyTime(ts) {
        if (!ts) return "—";
        const diff = Date.now() - ts;
        if (diff < 60000)   return "just now";
        if (diff < 3600000) return Math.floor(diff / 60000) + "m ago";
        return Math.floor(diff / 3600000) + "h ago";
    }
    function _formatDate(ts) {
        try {
            const d = new Date(typeof ts === "number" ? ts : parseInt(ts));
            return isNaN(d) ? "—" : d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
        } catch { return "—"; }
    }
    function _showSyncToast(msg) {
        if (typeof showToast === "function") { showToast(msg); return; }
        let t = document.getElementById("authSyncToast");
        if (!t) {
            t = document.createElement("div"); t.id = "authSyncToast";
            document.body.appendChild(t);
        }
        t.textContent = msg; t.classList.add("auth-sync-toast-visible");
        clearTimeout(t._timer);
        t._timer = setTimeout(() => t.classList.remove("auth-sync-toast-visible"), 3200);
    }

    // ═════════════════════════════════════════════════════════════════════
    //  SETTINGS TAB HOOK
    // ═════════════════════════════════════════════════════════════════════
    function _hookSettingsAccountTab() {
        const tabBtn = document.querySelector('.settings-tab[data-stab="account"]');
        if (!tabBtn || tabBtn._acctHooked) return;
        tabBtn._acctHooked = true;
        tabBtn.addEventListener("click", () => setTimeout(renderSettingsAccountPage, 0));
    }

    // ═════════════════════════════════════════════════════════════════════
    //  INIT
    // ═════════════════════════════════════════════════════════════════════
    function init() {
        _injectAuthModal();
        _injectTopBarBtn();
        _hookSettingsAccountTab();
        renderSettingsAccountPage();

        if (_token) {
            _pullAndApply();
        } else if (!_guest) {
            setTimeout(() => {
                if (!window.WHDAuth.isLoggedIn() && !window.WHDAuth.isGuest()) openAuthModal();
            }, 800);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    window.renderSettingsAccountPage = renderSettingsAccountPage;
})();
