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
    const LS_ROLE       = "whd_auth_role";
    const LS_GUEST                  = "whd_auth_guest";
    const LS_ANNOUNCEMENT_DISMISSED = "whd_announcement_dismissed";
    const SYNC_DEBOUNCE = 1500;

    // ── State ─────────────────────────────────────────────────────────────
    let _token    = localStorage.getItem(LS_TOKEN)    || null;
    let _username = localStorage.getItem(LS_USERNAME) || null;
    let _joined   = localStorage.getItem(LS_JOINED)   || null;
    let _role     = localStorage.getItem(LS_ROLE)     || "user";
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
        getRole:     () => _role,
        isAdminOrAbove: () => _role === "admin" || _role === "owner",
        isOwner:     () => _role === "owner",
        workerUrl:   WORKER_URL,
        scheduleSyncPush,
        pushNow,
        pullAndApply:      () => _pullAndApply(),
        checkMaintenance:  () => _checkMaintenance(),
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
          <div class="auth-pass-wrap">
            <input id="authLoginPass" type="password" autocomplete="current-password" placeholder="••••••••"/>
            <button type="button" class="auth-show-pass" id="authLoginShowPass" tabindex="-1" onclick="togglePassVis('authLoginPass',this)" aria-label="Show password"></button>
          </div>
        </div>
        <div class="auth-error" id="authLoginError"></div> 
        <button class="auth-primary-btn" id="authLoginBtn">Sign In</button>
        <button type="button" class="auth-link-btn" id="authForgotLink">Forgot password?</button>
      </div>

      <div class="auth-form" id="authFormReset">
        <div class="auth-field">
          <label>Username</label>
          <input id="authResetUser" type="text" autocomplete="username" placeholder="your username" spellcheck="false"/>
        </div>
        <div class="auth-field">
          <label>Recovery email <span class="auth-hint">the one you signed up with</span></label>
          <input id="authResetEmail" type="email" autocomplete="email" placeholder="you@example.com"/>
        </div>
        <div class="auth-field">
          <label>New Password <span class="auth-hint">8+ characters</span></label>
          <div class="auth-pass-wrap">
            <input id="authResetNewPass" type="password" autocomplete="new-password" placeholder="••••••••" minlength="8"/>
            <button type="button" class="auth-show-pass" tabindex="-1" onclick="togglePassVis('authResetNewPass',this)" aria-label="Show password"></button>
          </div>
        </div>
        <div class="auth-error" id="authResetError"></div>
        <button class="auth-primary-btn" id="authResetBtn">Reset Password</button>
        <button type="button" class="auth-link-btn" id="authResetBackLink">Back to Sign In</button>
      </div>

      <div class="auth-form" id="authFormSignup">
        <div class="auth-field">
          <label>Username <span class="auth-hint">3–24 chars, letters / numbers / _</span></label>
          <input id="authSignupUser" type="text" autocomplete="username" placeholder="choose a username" spellcheck="false" maxlength="24"/>
        </div>
        <div class="auth-field">
          <label>Password <span class="auth-hint">8+ characters</span></label>
          <div class="auth-pass-wrap">
            <input id="authSignupPass" type="password" autocomplete="new-password" placeholder="••••••••" minlength="8"/>
            <button type="button" class="auth-show-pass" tabindex="-1" onclick="togglePassVis('authSignupPass',this)" aria-label="Show password"></button>
          </div>
        </div>
        <div class="auth-field">
          <label>Confirm Password</label>
          <div class="auth-pass-wrap">
            <input id="authSignupPass2" type="password" autocomplete="new-password" placeholder="••••••••"/>
            <button type="button" class="auth-show-pass" tabindex="-1" onclick="togglePassVis('authSignupPass2',this)" aria-label="Show password"></button>
          </div>
        </div>
        <div class="auth-field">
          <label>Email <span class="auth-hint">optional — only used to recover your account</span></label>
          <input id="authSignupEmail" type="email" autocomplete="email" placeholder="you@example.com"/>
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
        _initEyeButtons(el);

        document.getElementById("authOverlay").addEventListener("click", () => {
            if (_token || _guest) closeAuthModal();
        });

        document.querySelectorAll(".auth-tab").forEach(tab =>
            tab.addEventListener("click", () => _switchModalTab(tab.dataset.tab)));

        document.getElementById("authLoginBtn").addEventListener("click",  doLogin);
        document.getElementById("authSignupBtn").addEventListener("click", doSignup);
        document.getElementById("authGuestBtn").addEventListener("click",  chooseGuest);
        document.getElementById("authLogoutBtn").addEventListener("click", () => { logout(); closeAuthModal(); });
        document.getElementById("authForgotLink").addEventListener("click", _showResetForm);
        document.getElementById("authResetBackLink").addEventListener("click", () => _switchModalTab("login"));
        document.getElementById("authResetBtn").addEventListener("click", doResetPassword);

        ["authLoginUser", "authLoginPass"].forEach(id =>
            document.getElementById(id).addEventListener("keydown", e => { if (e.key === "Enter") doLogin(); }));
        ["authSignupUser", "authSignupPass", "authSignupPass2"].forEach(id =>
            document.getElementById(id).addEventListener("keydown", e => { if (e.key === "Enter") doSignup(); }));
        ["authResetUser", "authResetEmail", "authResetNewPass"].forEach(id =>
            document.getElementById(id).addEventListener("keydown", e => { if (e.key === "Enter") doResetPassword(); }));

        _renderAuthModal();
    }

    function _showResetForm() {
        document.querySelectorAll(".auth-tab").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".auth-form").forEach(f => f.classList.toggle("active", f.id === "authFormReset"));
        const err = document.getElementById("authResetError"); if (err) err.textContent = "";
    }

    async function doResetPassword() {
        const user  = document.getElementById("authResetUser").value.trim();
        const email = document.getElementById("authResetEmail").value.trim();
        const pass  = document.getElementById("authResetNewPass").value;
        const err   = document.getElementById("authResetError");
        err.textContent = "";

        if (!user || !email || !pass) { err.textContent = "Please fill in all fields."; return; }
        if (pass.length < 8) { err.textContent = "Password must be at least 8 characters."; return; }

        const btn = document.getElementById("authResetBtn");
        btn.textContent = "Resetting…"; btn.disabled = true;

        try {
            const res  = await fetch(WORKER_URL + "/auth/resetpassword", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: user, email, newPassword: pass }),
            });
            const data = await res.json().catch(() => ({}));
            if (data.ok && data.token) {
                _setSession(user, data.token, data.joinedAt || null, data.role || "user");
                document.getElementById("authResetNewPass").value = "";
                _showSyncToast("Password reset. You're signed in.");
                _renderAuthModal();
                renderSettingsAccountPage();
                window.dispatchEvent(new Event("whd:auth:loggedin"));
                closeAuthModal();
            } else {
                err.textContent = data.error || "Couldn't reset that password.";
            }
        } catch {
            err.textContent = "Network error. Try again.";
        } finally {
            btn.textContent = "Reset Password"; btn.disabled = false;
        }
    }

    function _switchModalTab(tab) {
        document.querySelectorAll(".auth-tab").forEach(t => t.classList.toggle("active", t.dataset.tab === tab));
        document.querySelectorAll(".auth-form").forEach(f =>
            f.classList.toggle("active", f.id === "authForm" + tab.charAt(0).toUpperCase() + tab.slice(1)));
        ["authLoginError", "authSignupError"].forEach(id => {
            const e = document.getElementById(id); if (e) e.textContent = "";
        });
        // Clear the fields of the tab being switched away from
        if (tab === "login") {
            ["authSignupUser","authSignupPass","authSignupPass2"].forEach(id => {
                const el = document.getElementById(id); if (el) el.value = "";
            });
        } else {
            ["authLoginUser","authLoginPass"].forEach(id => {
                const el = document.getElementById(id); if (el) el.value = "";
            });
        }
        // Reset all eye buttons to show state
        document.querySelectorAll("#authModal .auth-show-pass").forEach(btn => {
            const inputId = btn.getAttribute("onclick")?.match(/'([^']+)'/)?.[1];
            if (inputId) { const inp = document.getElementById(inputId); if (inp) inp.type = "password"; }
            btn.innerHTML = _eyeOpenSVG;
            btn.title = "Show password";
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
    }

    function openAuthModal() {
        _injectAuthModal();
        const modal = document.getElementById("authModal");
        modal.classList.add("visible");
        _renderAuthModal();
        // Clear all input fields every time the modal opens
        ["authLoginUser","authLoginPass","authSignupUser","authSignupPass","authSignupPass2"].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = "";
        });
        // Reset eye buttons back to "show" state
        modal.querySelectorAll(".auth-show-pass").forEach(btn => {
            const inputId = btn.getAttribute("onclick")?.match(/'([^']+)'/)?.[1];
            if (inputId) {
                const inp = document.getElementById(inputId);
                if (inp) inp.type = "password";
            }
            btn.innerHTML = _eyeOpenSVG;
            btn.title = "Show password";
        });
        ["authLoginError","authSignupError"].forEach(id => {
            const e = document.getElementById(id); if (e) e.textContent = "";
        });
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
                _setSession(user, data.token, data.joinedAt || null, data.role || "user");
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
        const email = document.getElementById("authSignupEmail")?.value.trim() || "";
        const err   = document.getElementById("authSignupError");
        err.textContent = "";

        if (!user || !pass || !pass2) { err.textContent = "Please fill in all fields."; return; }
        if (!/^[a-zA-Z0-9_]{3,24}$/.test(user)) { err.textContent = "Username: 3–24 chars, letters/numbers/_ only."; return; }
        if (pass.length < 8)  { err.textContent = "Password must be at least 8 characters."; return; }
        if (pass !== pass2)   { err.textContent = "Passwords don't match."; return; }
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.textContent = "That email address doesn't look valid."; return; }

        const doTransfer = document.getElementById("authTransferCheck")?.checked && _hasLocalData();

        const btn = document.getElementById("authSignupBtn");
        btn.textContent = "Creating account…"; btn.disabled = true;

        try {
            const res  = await fetch(WORKER_URL + "/auth/signup", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: user, password: pass, email: email || undefined }),
            });
            const data = await res.json().catch(() => ({}));
            if (data.ok && data.token) {
                _setSession(user, data.token, data.joinedAt || null, data.role || "user");
                document.getElementById("authSignupPass").value  = "";
                document.getElementById("authSignupPass2").value = "";
                if (document.getElementById("authSignupEmail")) document.getElementById("authSignupEmail").value = "";

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
        renderSettingsAccountPage();
    }

    function logout() {
        _token      = null;
        _username   = null;
        _joined     = null;
        _role       = "user";
        _lastSyncAt = null;
        _guest      = false;

        // Clear all personal data from this browser on sign-out
        localStorage.removeItem(LS_TOKEN);
        localStorage.removeItem(LS_USERNAME);
        localStorage.removeItem(LS_JOINED);
        localStorage.removeItem(LS_ROLE);
        localStorage.removeItem(LS_GUEST);
        _origSetItem("whd_bookmarks",    JSON.stringify([]));
        _origSetItem("whd_playlists_v1", JSON.stringify([]));
        // Retain settings (theme/volume) — those are device preferences, not personal data

        // Live refresh of UI
        if (typeof renderBookmarksList   === "function") renderBookmarksList();
        if (typeof renderPlaylistSidebar === "function") renderPlaylistSidebar();

        _renderAuthModal();
        renderSettingsAccountPage();
    }

    function _setSession(user, token, joinedAt, role) {
        _token    = token;
        _username = user;
        _joined   = joinedAt || null;
        _role     = role || "user";
        _guest    = false;
        localStorage.setItem(LS_TOKEN,    token);
        localStorage.setItem(LS_USERNAME, user);
        localStorage.setItem(LS_ROLE,     _role);
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
            const roleBadge = _role && _role !== "user"
                ? `<span class="acct-role-badge acct-role-${_role}">${_role}</span>` : "";

            el.innerHTML = `
<div class="acct-card">
  <div class="acct-avatar">${_username.charAt(0).toUpperCase()}</div>
  <div class="acct-info">
    <div class="acct-username">${_escHtml(_username)} ${roleBadge}</div>
    <div class="acct-meta">Member since ${_escHtml(joinedStr)}</div>
  </div>
</div>

<div class="settings-section-title" style="margin-top:20px;">☁ Sync</div>
<div class="settings-row">
  <div class="settings-label"><span>Status</span><span class="settings-hint">Auto-syncs after each change</span></div>
  <div class="settings-control"><span class="acct-sync-badge" id="acctSyncBadge">${_escHtml(syncStr)}</span></div>
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
<div class="settings-row">
  <div class="settings-label"><span>Settings</span><span class="settings-hint">Volume, theme, map style etc.</span></div>
  <div class="settings-control"><span class="acct-count-badge">Synced</span></div>
</div>

${_buildChangePasswordHTML()}

<div class="settings-section-title" style="margin-top:20px;">⚠ Account Actions</div>
<div class="settings-row">
  <div class="settings-label"><span>Sign out</span><span class="settings-hint">Clears local playlists &amp; bookmarks</span></div>
  <div class="settings-control"><button class="settings-btn-caution" id="acctLogoutBtn">Sign Out</button></div>
</div>
<div class="settings-row">
  <div class="settings-label"><span>Delete account</span><span class="settings-hint">Permanently removes your account</span></div>
  <div class="settings-control"><button class="settings-btn-caution settings-btn-caution-strong" id="acctDeleteBtn">Delete Account</button></div>
</div>`;

            document.getElementById("acctLogoutBtn").onclick = () => {
                _showAppConfirm(
                    "Sign out?",
                    "This will clear your local playlists and bookmarks from this device.",
                    "Sign Out",
                    logout
                );
            };
            document.getElementById("acctDeleteBtn").onclick = () => _showDeleteConfirm();

            // Wire change password form
            _wireChangePassword();
            _initEyeButtons(el);


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


    // ── SVG eye icons for password toggle (Google-style) ────────────────────
    const _eyeOpenSVG   = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
    const _eyeClosedSVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;

    function _initEyeButtons(root) {
        (root || document).querySelectorAll(".auth-show-pass").forEach(btn => {
            btn.innerHTML = _eyeOpenSVG;
            btn.title = "Show password";
            btn.setAttribute("aria-label", "Show password");
        });
    }

    // ── Password visibility toggle (global, called by inline onclick) ────────
    window.togglePassVis = function(inputId, btn) {
        const inp = document.getElementById(inputId);
        if (!inp) return;
        const isHidden = inp.type === "password";
        inp.type = isHidden ? "text" : "password";
        btn.innerHTML = isHidden ? _eyeClosedSVG : _eyeOpenSVG;
        btn.title     = isHidden ? "Hide password"  : "Show password";
        btn.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
    };

    // ── Change password UI ────────────────────────────────────────────────
    function _buildChangePasswordHTML() {
        return `
<div class="settings-section-title" style="margin-top:20px;">🔑 Change Password</div>
<div class="acct-change-pass-form">
  <div class="auth-field">
    <label>Current Password</label>
    <div class="auth-pass-wrap">
      <input id="acctCurrPass" type="password" placeholder="••••••••" autocomplete="current-password"/>
      <button type="button" class="auth-show-pass" tabindex="-1" onclick="togglePassVis('acctCurrPass',this)" aria-label="Show password"></button>
    </div>
  </div>
  <div class="auth-field">
    <label>New Password <span class="auth-hint">8+ characters</span></label>
    <div class="auth-pass-wrap">
      <input id="acctNewPass" type="password" placeholder="••••••••" autocomplete="new-password"/>
      <button type="button" class="auth-show-pass" tabindex="-1" onclick="togglePassVis('acctNewPass',this)" aria-label="Show password"></button>
    </div>
  </div>
  <div class="auth-field">
    <label>Confirm New Password</label>
    <div class="auth-pass-wrap">
      <input id="acctNewPass2" type="password" placeholder="••••••••" autocomplete="new-password"/>
      <button type="button" class="auth-show-pass" tabindex="-1" onclick="togglePassVis('acctNewPass2',this)" aria-label="Show password"></button>
    </div>
  </div>
  <div class="auth-error" id="acctPassError"></div>
  <button class="auth-primary-btn" id="acctChangePassBtn">Update Password</button>
</div>`;
    }

    function _wireChangePassword() {
        const btn = document.getElementById("acctChangePassBtn");
        if (!btn) return;
        btn.onclick = async () => {
            const curr  = document.getElementById("acctCurrPass")?.value;
            const next  = document.getElementById("acctNewPass")?.value;
            const next2 = document.getElementById("acctNewPass2")?.value;
            const errEl = document.getElementById("acctPassError");
            if (errEl) errEl.textContent = "";
            if (!curr || !next || !next2) { if (errEl) errEl.textContent = "Fill in all fields."; return; }
            if (next.length < 8)          { if (errEl) errEl.textContent = "New password must be 8+ characters."; return; }
            if (next !== next2)           { if (errEl) errEl.textContent = "New passwords don't match."; return; }
            btn.textContent = "Updating…"; btn.disabled = true;
            try {
                const res  = await fetch(WORKER_URL + "/auth/changepassword", {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token: _token, currentPassword: curr, newPassword: next }),
                });
                const data = await res.json().catch(() => ({}));
                if (data.ok) {
                    document.getElementById("acctCurrPass").value  = "";
                    document.getElementById("acctNewPass").value   = "";
                    document.getElementById("acctNewPass2").value  = "";
                    _showSyncToast("Password updated successfully.");
                } else {
                    if (errEl) errEl.textContent = data.error || "Could not update password.";
                }
            } catch {
                if (errEl) errEl.textContent = "Couldn't reach server.";
            } finally {
                btn.textContent = "Update Password"; btn.disabled = false;
            }
        };
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
    <div class="auth-pass-wrap">
      <input id="acctDeletePass" type="password" placeholder="••••••••" autocomplete="current-password"/>
      <button type="button" class="auth-show-pass" tabindex="-1" onclick="togglePassVis('acctDeletePass',this)" aria-label="Show password"></button>
    </div>
  </div>
  <div class="auth-error" id="acctDeleteError"></div>
  <div class="acct-delete-btns">
    <button class="auth-ghost-btn" id="acctDeleteCancelBtn">Cancel</button>
    <button class="settings-btn-caution settings-btn-caution-strong" id="acctDeleteConfirmBtn">Delete Forever</button>
  </div>
</div>`;
        document.body.appendChild(modal);
        _initEyeButtons(modal);

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
                // Close settings panel if open
                if (typeof closeSettings === "function") closeSettings();
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

    // ── Reusable confirm helper (uses app modal) ──────────────────────
    function _showAppConfirm(title, body, confirmLabel, onConfirm) {
        if (typeof showAppConfirm === "function") {
            showAppConfirm({
                icon:     "⚠️",
                title:    title,
                msg:      body,
                okLabel:  confirmLabel,
                okDanger: true,
            }).then(ok => { if (ok) onConfirm(); });
            return;
        }
        // Fallback if app modal not available
        if (window.confirm(body)) onConfirm();
    }
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
            // Always apply role from server — never trust stale localStorage value
            if (resp.role) {
                _role = resp.role;
                localStorage.setItem(LS_ROLE, _role);
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

            // Re-check maintenance (admin logging in should bypass)
            await _checkMaintenance();
            await _checkAnnouncement();

            // Always re-render — role may have just been corrected by the server
            renderSettingsAccountPage();
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

    function _dismissAnnouncementBanner(updatedAt) {
        if (updatedAt) localStorage.setItem(LS_ANNOUNCEMENT_DISMISSED, String(updatedAt));
        const isUnderMaintenance = document.getElementById("maintenancePage")?.classList.contains("active");
        const target = isUnderMaintenance
            ? document.getElementById("maintAnnouncementSlot")
            : document.getElementById("announcementBanner");
        if (!target) return;
        target.classList.remove("active");
        target.innerHTML = "";
        if (!isUnderMaintenance) document.body.classList.remove("announcement-active");
    }

    function _applyAnnouncementBanner(active, type, message) {
        const isUnderMaintenance = document.getElementById("maintenancePage")?.classList.contains("active");
        // While the maintenance overlay is showing, the normal top banner is
        // buried beneath it (the overlay sits above everything by design).
        // Render into a slot inside the maintenance page instead so the
        // announcement is still visible to people sitting on that screen.
        const target = isUnderMaintenance
            ? document.getElementById("maintAnnouncementSlot")
            : document.getElementById("announcementBanner");
        if (!target) return;

        const typeClassList = [
            "announcement-type-info",
            "announcement-type-warning",
            "announcement-type-success",
            "announcement-type-error",
            "announcement-type-update",
            "announcement-type-event",
        ];
        target.classList.remove(...typeClassList);

        if (!active) {
            target.classList.remove("active");
            target.innerHTML = "";
            if (!isUnderMaintenance) document.body.classList.remove("announcement-active");
            return;
        }

        const typeClassMap = {
            info: "announcement-type-info",
            warning: "announcement-type-warning",
            success: "announcement-type-success",
            error: "announcement-type-error",
            update: "announcement-type-update",
            event: "announcement-type-event",
        };
        const typeIconMap = { info: "ℹ", warning: "⚠", success: "✅", error: "⛔", update: "🛠", event: "✦" };
        const bannerType = ["info", "warning", "success", "error", "update", "event"].includes(type) ? type : "info";
        target.classList.add(typeClassMap[bannerType]);
        target.innerHTML = `
<div class="announcement-banner-inner">
  <div class="announcement-banner-header">
    <span class="announcement-banner-icon">${typeIconMap[bannerType]}</span>
    <div class="announcement-banner-message">${_escHtml(message || "Announcement")}</div>
    <button type="button" class="announcement-banner-close" aria-label="Hide announcement">✕</button>
  </div>
</div>`;
        target.classList.add("active");
        if (!isUnderMaintenance) document.body.classList.add("announcement-active");
        const closeBtn = target.querySelector(".announcement-banner-close");
        if (closeBtn) closeBtn.onclick = () => _dismissAnnouncementBanner(window.__announcementUpdatedAt || 0);
    }

    async function _checkAnnouncement() {
        if (!WORKER_URL) return;
        if (_role === "owner") return;
        try {
            const token = window.WHDAuth ? window.WHDAuth.getToken() : null;
            const res = await fetch(WORKER_URL + "/auth/announcement/status", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            });
            const data = await res.json().catch(() => ({}));
            window.__announcementUpdatedAt = data.updatedAt || 0;
            if (data.active && data.updatedAt && String(data.updatedAt) === localStorage.getItem(LS_ANNOUNCEMENT_DISMISSED)) {
                _dismissAnnouncementBanner(data.updatedAt);
                return;
            }
            if (!data.active) {
                localStorage.removeItem(LS_ANNOUNCEMENT_DISMISSED);
            }
            _applyAnnouncementBanner(!!data.active, data.type || "info", data.message || "");
        } catch { /* network error — don't block access */ }
    }

    // ═════════════════════════════════════════════════════════════════════
    //  MAINTENANCE PAGE
    // ═════════════════════════════════════════════════════════════════════
    function _applyMaintenancePage(on, message) {
        let page = document.getElementById("maintenancePage");
        if (!page) return;
        if (!on) {
            page.classList.remove("active");
            return;
        }
        // Owner/admin bypass — they see the site normally
        if (_role === "owner" || _role === "admin") {
            page.classList.remove("active");
            return;
        }
        // Build content — only rebuild if not already showing (preserves game state)
        if (!page.classList.contains("active")) {
            const msg = message || "We're doing some maintenance. Check back soon.";
            page.innerHTML = `
<div id="maintAnnouncementSlot" class="announcement-banner"></div>
<div class="maint-glyph">🚧</div>
<div class="maint-title">Under Maintenance</div>
<div class="maint-sub">${_escHtml(msg)}</div>
<div class="maint-tabs">
  <button class="maint-tab active" data-mtab="trivia">🎮 Trivia</button>
  <button class="maint-tab" data-mtab="updates">📋 Update Log</button>
</div>
<div class="maint-tabpanel active" id="maintPanelTrivia">
  <div id="maintGameHost" class="maint-game-host"></div>
</div>
<div class="maint-tabpanel" id="maintPanelUpdates">
  <div class="maint-ul-section">
    <div id="maintULLoading" class="ul-loading">Loading updates…</div>
    <div id="maintULEmpty" class="ul-empty" style="display:none;">No updates yet.</div>
    <div class="ul-layout">
      <div id="maintULTabStrip" class="ul-tabstrip" style="display:none;"></div>
      <div id="maintULContent" class="ul-content" style="display:none;"></div>
    </div>
  </div>
</div>`;
            page.classList.add("active");
            _triviaStart(document.getElementById("maintGameHost"));
            _checkAnnouncement();

            // Wire the two maintenance-page tabs
            let maintUpdatesLoaded = false;
            page.querySelectorAll(".maint-tab").forEach(btn => {
                btn.onclick = () => {
                    page.querySelectorAll(".maint-tab").forEach(b => b.classList.remove("active"));
                    page.querySelectorAll(".maint-tabpanel").forEach(p => p.classList.remove("active"));
                    btn.classList.add("active");
                    const target = btn.dataset.mtab === "updates" ? "maintPanelUpdates" : "maintPanelTrivia";
                    const panel = document.getElementById(target);
                    if (panel) panel.classList.add("active");
                    if (btn.dataset.mtab === "updates" && !maintUpdatesLoaded) {
                        maintUpdatesLoaded = true;
                        if (typeof loadUpdateLog === "function") loadUpdateLog();
                    }
                };
            });
        }
    }

    async function _checkMaintenance() {
        // Bypass entirely for owner/admin
        if (_role === "owner" || _role === "admin") return;
        if (!WORKER_URL) return;
        try {
            const res  = await fetch(WORKER_URL + "/auth/maintenance/status");
            const data = await res.json().catch(() => ({}));
            _applyMaintenancePage(!!data.maintenance, data.message || "");
        } catch { /* network error — don't block access */ }
    }

    // ═════════════════════════════════════════════════════════════════════
    //  MAINTENANCE MINIGAMES — a few tiny on-theme activities to pass the
    //  time while waiting. Purely cosmetic: none of them unlock the site.
    //  The page is only ever hidden by a confirmed admin/owner login
    //  (_checkMaintenance) or maintenance being turned off.
    // ═════════════════════════════════════════════════════════════════════

    // ── Trivia ──────────────────────────────────────────────────────────
    const _MAINT_TRIVIA = [
        { q: "Which empire built the road network later reused by Persia's royal couriers?", a: ["The Achaemenid Empire", "The Akkadian Empire", "The Hittite Empire", "The Assyrian Empire"], c: 0 },
        { q: "The Great Library once stood in which ancient city?", a: ["Alexandria", "Babylon", "Carthage", "Thebes"], c: 0 },
        { q: "Which dynasty unified China and standardized its writing script?", a: ["Han", "Qin", "Tang", "Ming"], c: 1 },
        { q: "The Code of Hammurabi originated in which civilization?", a: ["Egyptian", "Babylonian", "Phoenician", "Sumerian"], c: 1 },
        { q: "Machu Picchu was built by which civilization?", a: ["Aztec", "Maya", "Inca", "Olmec"], c: 2 },
        { q: "Which empire's currency, the denarius, influenced coinage across Europe?", a: ["Roman", "Byzantine", "Ottoman", "Macedonian"], c: 0 },
        { q: "The Rosetta Stone helped decode which ancient script?", a: ["Cuneiform", "Linear B", "Egyptian hieroglyphs", "Phoenician"], c: 2 },
        { q: "Who is traditionally credited with unifying Japan's warring states in the late 1500s?", a: ["Tokugawa Ieyasu", "Oda Nobunaga", "Toyotomi Hideyoshi", "Minamoto Yoritomo"], c: 1 },
        { q: "The Silk Road primarily connected which two regions?", a: ["Europe and the Americas", "East Asia and the Mediterranean", "Africa and Oceania", "South America and Europe"], c: 1 },
        { q: "Which river valley is associated with the earliest known cities of Mesopotamia?", a: ["Nile", "Indus", "Tigris–Euphrates", "Yangtze"], c: 2 },
        { q: "The Hagia Sophia was originally built as a cathedral in which empire?", a: ["Ottoman Empire", "Byzantine Empire", "Roman Empire", "Persian Empire"], c: 1 },
        { q: "Which African empire grew wealthy controlling trans-Saharan gold and salt trade?", a: ["Mali Empire", "Kingdom of Kush", "Zulu Kingdom", "Aksum"], c: 0 },
        { q: "Which ancient wonder stood at the harbour entrance to Rhodes?", a: ["The Pharos Lighthouse", "The Colossus", "The Mausoleum", "The Statue of Zeus"], c: 1 },
        { q: "What writing system did the ancient Sumerians develop around 3200 BCE?", a: ["Hieroglyphics", "Linear A", "Cuneiform", "Runes"], c: 2 },
        { q: "The Battle of Marathon (490 BCE) was fought between Greece and which empire?", a: ["Macedonian", "Carthaginian", "Persian", "Assyrian"], c: 2 },
        { q: "Who commanded the Mongol forces during the sack of Baghdad in 1258?", a: ["Genghis Khan", "Kublai Khan", "Hulagu Khan", "Ögedei Khan"], c: 2 },
        { q: "The Maurya Empire was founded in ancient India by whom?", a: ["Ashoka", "Chandragupta Maurya", "Bindusara", "Samudragupta"], c: 1 },
        { q: "Which civilisation built the Nazca Lines in the South American desert?", a: ["Inca", "Moche", "Nazca", "Tiwanaku"], c: 2 },
        { q: "Where did the Black Death most likely originate before spreading west?", a: ["Egypt", "Arabia", "Central Asia", "India"], c: 2 },
        { q: "The Phoenicians are credited with developing one of the earliest what?", a: ["Calendars", "Alphabets", "Coinage systems", "Aqueducts"], c: 1 },
        { q: "The fall of Constantinople in 1453 ended which empire?", a: ["Roman Empire", "Byzantine Empire", "Ottoman Empire", "Seljuk Empire"], c: 1 },
        { q: "Tenochtitlan, the Aztec capital, was built on an island in which lake?", a: ["Lake Chapala", "Lake Texcoco", "Lake Titicaca", "Lake Atitlán"], c: 1 },
        { q: "Which Greek philosopher was the teacher of Alexander the Great?", a: ["Plato", "Socrates", "Aristotle", "Pythagoras"], c: 2 },
        { q: "The Hanseatic League was primarily a trading alliance of cities in which region?", a: ["Mediterranean coast", "Northern Europe", "Iberian Peninsula", "Black Sea coast"], c: 1 },
        { q: "Which empire was ruled from the city of Ctesiphon?", a: ["Sassanid Empire", "Parthian Empire", "Babylonian Empire", "Both A and B"], c: 3 },
        { q: "The Edict of Milan (313 CE) granted religious tolerance to which group?", a: ["Jews", "Pagans", "Christians", "Zoroastrians"], c: 2 },
        { q: "Which Chinese invention, later spreading west, transformed medieval warfare?", a: ["The crossbow", "Steel armour", "Gunpowder", "The trebuchet"], c: 2 },
        { q: "The city of Carthage was located in modern-day which country?", a: ["Egypt", "Libya", "Tunisia", "Algeria"], c: 2 },
        { q: "The Achaemenid Persian Empire was founded by whom?", a: ["Darius I", "Xerxes I", "Cyrus the Great", "Cambyses"], c: 2 },
        { q: "Which culture built the great stone heads known as Olmec colossal heads?", a: ["Maya", "Aztec", "Olmec", "Zapotec"], c: 2 },
        { q: "Where did the Magna Carta get signed in 1215?", a: ["Westminster", "Winchester", "Runnymede", "Canterbury"], c: 2 },
        { q: "The ancient trade route called the Amber Road primarily transported amber from where?", a: ["Russia", "Baltic coast", "Scandinavia", "North Africa"], c: 1 },
        { q: "Who led the Haitian Revolution, resulting in the first Black republic?", a: ["Jean-Jacques Dessalines", "Toussaint Louverture", "Henri Christophe", "Alexandre Pétion"], c: 1 },
        { q: "What was the primary purpose of Hadrian's Wall?", a: ["Tax collection", "Border control and defence", "Irrigation", "Ceremonial procession"], c: 1 },
        { q: "The ancient city of Petra was carved into cliffs by which people?", a: ["Romans", "Nabataeans", "Egyptians", "Persians"], c: 1 },
        { q: "The Gutenberg Bible was one of the first major books printed with which technology?", a: ["Woodblock printing", "Movable type", "Engraving", "Lithography"], c: 1 },
        { q: "The Reconquista was the centuries-long effort to reclaim the Iberian Peninsula from whom?", a: ["The Visigoths", "The Moors", "The Franks", "The Normans"], c: 1 },
        { q: "The legendary city of El Dorado was sought by Spanish conquistadors mainly in which region?", a: ["Mexico", "The Caribbean", "South America", "Central America"], c: 2 },
        { q: "Which pharaoh built the Great Pyramid of Giza?", a: ["Ramesses II", "Tutankhamun", "Khufu", "Thutmose III"], c: 2 },
        { q: "The Treaty of Westphalia (1648) ended which major European conflict?", a: ["The Hundred Years' War", "The Thirty Years' War", "The Wars of the Roses", "The Great Northern War"], c: 1 },
        { q: "Which empire was centered on the city of Tenochtitlan before the Spanish conquest?", a: ["Maya", "Aztec", "Inca", "Toltec"], c: 1 },
        { q: "The Domesday Book, an early census and land survey, was commissioned by which English king?", a: ["Edward the Confessor", "William the Conqueror", "Henry II", "Richard the Lionheart"], c: 1 },
        { q: "Which ancient civilization built the city of Petra as a major trade hub?", a: ["Phoenicians", "Nabataeans", "Lydians", "Hittites"], c: 1 },
        { q: "The Punic Wars were fought between Rome and which rival power?", a: ["Carthage", "Greece", "Egypt", "Persia"], c: 0 },
        { q: "Who was the first Roman emperor?", a: ["Julius Caesar", "Augustus", "Nero", "Trajan"], c: 1 },
        { q: "The Kingdom of Aksum, an early trading empire, was located in present-day where?", a: ["Egypt and Sudan", "Ethiopia and Eritrea", "Nigeria and Ghana", "Morocco and Algeria"], c: 1 },
        { q: "Which European explorer led the first expedition to circumnavigate the globe?", a: ["Christopher Columbus", "Vasco da Gama", "Ferdinand Magellan", "James Cook"], c: 2 },
        { q: "The Great Schism of 1054 split Christianity into which two branches?", a: ["Catholic and Protestant", "Catholic and Orthodox", "Orthodox and Coptic", "Protestant and Anglican"], c: 1 },
        { q: "Angkor Wat, the largest religious monument in the world, was built by which empire?", a: ["Khmer Empire", "Srivijaya Empire", "Champa Kingdom", "Majapahit Empire"], c: 0 },
        { q: "Which conflict is often cited as the first global war, fought across multiple continents in the 1750s–60s?", a: ["War of Spanish Succession", "Seven Years' War", "War of the Austrian Succession", "Nine Years' War"], c: 1 },
        { q: "The Rosetta Stone is inscribed in how many scripts?", a: ["One", "Two", "Three", "Four"], c: 2 },
        { q: "Which empire's expansion was halted by its defeat at the Battle of Tours in 732 CE?", a: ["Umayyad Caliphate", "Abbasid Caliphate", "Ottoman Empire", "Fatimid Caliphate"], c: 0 },
        { q: "The ancient Olympic Games were held in honor of which Greek god?", a: ["Apollo", "Zeus", "Poseidon", "Ares"], c: 1 },
        { q: "Which document, signed in 1648, established the modern concept of state sovereignty?", a: ["Magna Carta", "Treaty of Tordesillas", "Peace of Westphalia", "Edict of Nantes"], c: 2 },
        { q: "The Inca road system, the Qhapaq Ñan, spanned the length of which mountain range?", a: ["The Alps", "The Andes", "The Rockies", "The Himalayas"], c: 1 },
        { q: "Who was the longest-reigning pharaoh of ancient Egypt?", a: ["Ramesses II", "Pepi II", "Thutmose III", "Amenhotep III"], c: 1 },
        { q: "The Berlin Conference of 1884–85 organized European colonization of which continent?", a: ["Asia", "Africa", "South America", "Australia"], c: 1 },
        { q: "Which trade network connected West African empires to North Africa across the Sahara?", a: ["Silk Road", "Trans-Saharan trade routes", "Amber Road", "Spice Route"], c: 1 },
        { q: "The city-state of Sparta was famed in ancient Greece chiefly for its what?", a: ["Philosophy schools", "Naval power", "Military discipline", "Trade wealth"], c: 2 },
    ];

    function _triviaStart(host) {
        const shuffled = _MAINT_TRIVIA.slice().sort(() => Math.random() - 0.5).slice(0, 8);
        const st = { idx: 0, score: 0, set: shuffled };
        _triviaRenderQuestion(host, st);
    }

    function _triviaRenderQuestion(host, st) {
        if (st.idx >= st.set.length) {
            host.innerHTML = `
<div class="maint-trivia-done">
  <div class="maint-trivia-score">${st.score} / ${st.set.length} correct</div>
  <div class="maint-trivia-sub">Thanks for waiting it out.</div>
  <button class="maint-trivia-again" id="maintTriviaAgain">Play again</button>
</div>`;
            document.getElementById("maintTriviaAgain").onclick = () => _triviaStart(host);
            return;
        }

        const item = st.set[st.idx];
        const order = item.a.map((text, i) => ({ text, i })).sort(() => Math.random() - 0.5);

        host.innerHTML = `
<div class="maint-trivia-progress">Question ${st.idx + 1} of ${st.set.length} · Score ${st.score}</div>
<div class="maint-trivia-q">${_escHtml(item.q)}</div>
<div class="maint-trivia-opts">
  ${order.map(o => `<button class="maint-trivia-opt" data-correct="${o.i === item.c}">${_escHtml(o.text)}</button>`).join("")}
</div>`;

        host.querySelectorAll(".maint-trivia-opt").forEach(btn => {
            btn.onclick = () => {
                const correct = btn.dataset.correct === "true";
                host.querySelectorAll(".maint-trivia-opt").forEach(b => {
                    b.disabled = true;
                    if (b.dataset.correct === "true") b.classList.add("mt-correct");
                });
                if (!correct) btn.classList.add("mt-wrong");
                if (correct) st.score++;
                setTimeout(() => {
                    st.idx++;
                    _triviaRenderQuestion(host, st);
                }, 850);
            };
        });
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
    async function init() {
        _injectAuthModal();
        _hookSettingsAccountTab();
        renderSettingsAccountPage();

        if (_token) {
            // Await pull so role is known before (re-)rendering the account page.
            // renderSettingsAccountPage is called inside _pullAndApply when role changes.
            await _pullAndApply();
        } else if (!_guest) {
            setTimeout(() => {
                if (!window.WHDAuth.isLoggedIn() && !window.WHDAuth.isGuest()) openAuthModal();
            }, 800);
        }

        // Check maintenance mode after role is resolved
        await _checkMaintenance();
        await _checkAnnouncement();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    window.renderSettingsAccountPage = renderSettingsAccountPage;
})();