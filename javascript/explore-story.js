function escHtmlMain(s) {
    return (s == null ? "" : String(s))
        .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
function removeBookmark(sceneId) {
    saveBookmarks(loadBookmarks().filter(b => b.id !== sceneId));
    refreshBookmarkButtons(sceneId, false);
    renderBookmarksList();
}
function goToBookmark(sceneId) {
    const scene = scenes.find(s => s.id === sceneId);
    if (!scene) return;
    closeBookmarks();
    showScene(scene);
}

// Populate #explorePlTarget whenever the explore tab is opened.
// Wraps the already-defined switchPanelTab.
const _origSwitchPanelTab = switchPanelTab;
switchPanelTab = function(tabName) {
    _origSwitchPanelTab(tabName);
    if (tabName === "explore") populateExplorePlaylistPicker();
};

// ── Shared helper: create a new playlist, add a scene, open editor ──────────
// ── Generate a unique playlist name (avoids duplicates) ───────────────────
function _uniquePlaylistName(base) {
    const names = new Set(activePlaylists.map(p => (p.name || "").trim().toLowerCase()));
    if (!names.has(base.toLowerCase())) return base;
    let n = 2;
    while (names.has((base + " " + n).toLowerCase())) n++;
    return base + " " + n;
}

function _createPlaylistAndAdd(sceneId) {
    const scene = scenes.find(s => s.id === sceneId);
    if (!scene) return null;
    const pl = {
        id: generateId(),
        name: _uniquePlaylistName("New Playlist"),
        music: null,
        sceneIds: [sceneId]
    };
    activePlaylists.push(pl);
    activePlaylistId = pl.id;
    savePlaylistsToStorage();
    showToast("New playlist created with \u201c" + scene.name + "\u201d");
    openPlaylists("playlists");
    renderPlaylistSidebar();
    renderPlaylistEditor();
    setTimeout(() => {
        const inp = document.getElementById("playlistNameInput");
        if (inp) { inp.focus(); inp.select(); }
    }, 80);
    return pl;
}

// ── Custom explore-tab playlist dropdown ────────────────────────────────────
// State: which playlist id is currently selected in the dropdown (or "" / "__new__")
let _explorePlSelected = "";

function toggleExplorePlDropdown() {
    const menu = document.getElementById("explorePlMenu");
    const btn  = document.getElementById("explorePlBtn");
    if (!menu || !btn) return;
    const opening = menu.style.display === "none";
    if (opening) {
        refreshExplorePlDropdown();
        menu.style.display = "block";
        btn.classList.add("open");
        // Close on outside click
        setTimeout(() => {
            document.addEventListener("pointerdown", _closeExplorePlDropdown, { once: true, capture: true });
        }, 0);
    } else {
        _closeExplorePlDropdownImmediate();
    }
}

function _closeExplorePlDropdown(e) {
    const dropdown = document.getElementById("explorePlDropdown");
    if (dropdown && dropdown.contains(e.target)) {
        // click inside — re-attach listener
        setTimeout(() => {
            document.addEventListener("pointerdown", _closeExplorePlDropdown, { once: true, capture: true });
        }, 0);
        return;
    }
    _closeExplorePlDropdownImmediate();
}

function _closeExplorePlDropdownImmediate() {
    const menu = document.getElementById("explorePlMenu");
    const btn  = document.getElementById("explorePlBtn");
    if (menu) menu.style.display = "none";
    if (btn)  btn.classList.remove("open");
}

function explorePickerSelectNew() {
    _closeExplorePlDropdownImmediate();
    // We don't set a selected playlist — "New" is an action, not a selection.
    // Clicking the + add button while __new__ is active will create a playlist.
    _explorePlSelected = "__new__";
    const lbl = document.getElementById("explorePlLabel");
    const btn = document.getElementById("explorePlBtn");
    if (lbl) lbl.textContent = "＋ New playlist…";
    if (btn) btn.classList.add("has-selection");
    document.querySelectorAll(".xpl-option").forEach(o => o.classList.remove("selected"));
}

function _explorePickerSelect(plId, plName) {
    _closeExplorePlDropdownImmediate();
    _explorePlSelected = plId;
    const lbl = document.getElementById("explorePlLabel");
    const btn = document.getElementById("explorePlBtn");
    if (lbl) lbl.textContent = plName;
    if (btn) btn.classList.add("has-selection");
    // Reset all add buttons so they reflect the new selection
    document.querySelectorAll("#exploreResults .explore-add-btn").forEach(b => {
        b.classList.remove("added");
        b.innerText = "＋";
        b.disabled = false;
    });
    // Mark already-added buttons for this playlist
    const pl = activePlaylists.find(p => p.id === plId);
    if (pl) {
        document.querySelectorAll("#exploreResults .explore-row").forEach(row => {
            const nameEl = row.querySelector(".pl-scene-name");
            const addBtn = row.querySelector(".explore-add-btn");
            if (!nameEl || !addBtn) return;
            const scene = scenes.find(s => s.name === nameEl.innerText);
            if (scene && pl.sceneIds.includes(scene.id)) {
                addBtn.classList.add("added");
                addBtn.innerText = "✓";
                addBtn.disabled = true;
            }
        });
    }
}

function refreshExplorePlDropdown() {
    loadPlaylistsFromStorage();
    const list = document.getElementById("explorePlList");
    if (!list) return;
    list.innerHTML = "";
    if (activePlaylists.length === 0) {
        const empty = document.createElement("div");
        empty.className = "xpl-empty";
        empty.textContent = "No playlists yet";
        list.appendChild(empty);
        return;
    }
    activePlaylists.forEach(pl => {
        const opt = document.createElement("div");
        opt.className = "xpl-option" + (pl.id === _explorePlSelected ? " selected" : "");
        opt.textContent = pl.name || "Untitled";
        opt.onclick = () => _explorePickerSelect(pl.id, pl.name || "Untitled");
        list.appendChild(opt);
    });
}

// Called from renameActivePlaylist / deleteActivePlaylist to keep dropdown fresh
function refreshExplorePlDropdown_label() {
    if (!_explorePlSelected || _explorePlSelected === "__new__") return;
    const pl = activePlaylists.find(p => p.id === _explorePlSelected);
    if (!pl) {
        // selected playlist was deleted — reset
        _explorePlSelected = "";
        const lbl = document.getElementById("explorePlLabel");
        const btn = document.getElementById("explorePlBtn");
        if (lbl) lbl.textContent = "＋ Add to playlist…";
        if (btn) btn.classList.remove("has-selection");
    } else {
        const lbl = document.getElementById("explorePlLabel");
        if (lbl) lbl.textContent = pl.name || "Untitled";
    }
}

// Legacy alias used by switchPanelTab wrapper
function populateExplorePlaylistPicker() {
    refreshExplorePlDropdown();
    refreshExplorePlDropdown_label();
}

// Wrap filterExploreSearch to inject ＋ Add buttons on each row.
const _origFilterExploreSearch = filterExploreSearch;
filterExploreSearch = function() {
    _origFilterExploreSearch();
    document.querySelectorAll("#exploreResults .explore-row").forEach(row => {
        if (row.querySelector(".explore-add-btn")) return; // already injected
        const goBtn = row.querySelector(".pl-add-btn");
        if (!goBtn) return;
        const nameEl = row.querySelector(".pl-scene-name");
        if (!nameEl) return;
        const scene = scenes.find(s => s.name === nameEl.innerText);
        if (!scene) return;

        const addBtn = document.createElement("button");
        addBtn.className = "explore-add-btn";
        addBtn.title = "Add to selected playlist";
        addBtn.innerText = "＋";

        // Reflect current selection immediately
        if (_explorePlSelected && _explorePlSelected !== "__new__") {
            const pl = activePlaylists.find(p => p.id === _explorePlSelected);
            if (pl && pl.sceneIds.includes(scene.id)) {
                addBtn.classList.add("added");
                addBtn.innerText = "✓";
                addBtn.disabled = true;
            }
        }

        addBtn.onclick = (e) => {
            e.stopPropagation();
            const plId = _explorePlSelected;
            if (!plId) { showToast("Choose a playlist first."); return; }
            if (plId === "__new__") {
                const created = _createPlaylistAndAdd(scene.id);
                if (created) {
                    addBtn.classList.add("added");
                    addBtn.innerText = "✓";
                    addBtn.disabled = true;
                    refreshExplorePlDropdown();
                }
                return;
            }
            const pl = activePlaylists.find(p => p.id === plId);
            if (!pl) return;
            if (pl.sceneIds.includes(scene.id)) {
                showToast("Already in that playlist.");
                return;
            }
            pl.sceneIds.push(scene.id);
            savePlaylistsToStorage();
            addBtn.classList.add("added");
            addBtn.innerText = "✓";
            addBtn.disabled = true;
            showToast("Added to \u201c" + (pl.name || "Untitled") + "\u201d");
            if (activePlaylistId === pl.id) renderPlaylistScenes(pl);
            renderPlaylistSidebar();
        };
        row.insertBefore(addBtn, goBtn);
    });
};

let _storyCurrentSceneId = null;

// Wrap showScene to track the current scene and sync the bookmark button.
const _origShowScene = showScene;
showScene = function(scene, ...args) {
    _origShowScene(scene, ...args);
    _storyCurrentSceneId = scene ? scene.id : null;
    const btn = document.getElementById("storyBookmarkBtn");
    if (btn && _storyCurrentSceneId) {
        const active = isBookmarked(_storyCurrentSceneId);
        btn.classList.toggle("bm-active", active);
        btn.innerText = active ? "★ Bookmarked" : "★ Bookmark";
    }
};

function storyToggleBookmark() {
    if (!_storyCurrentSceneId) { showToast("No scene loaded."); return; }
    toggleBookmark(_storyCurrentSceneId);
    const active = isBookmarked(_storyCurrentSceneId);
    const btn = document.getElementById("storyBookmarkBtn");
    if (btn) {
        btn.classList.toggle("bm-active", active);
        btn.innerText = active ? "★ Bookmarked" : "★ Bookmark";
    }
}

function _closeStoryPlPicker() {
    const el = document.getElementById("storyPlPicker");
    if (el) el.remove();
}

function storyAddToPlaylist() {
    if (!_storyCurrentSceneId) { showToast("No scene loaded."); return; }
    loadPlaylistsFromStorage();

    // Toggle picker off if already open
    const existing = document.getElementById("storyPlPicker");
    if (existing) { existing.remove(); return; }

    // Anchor directly below the ＋ Playlist button
    const anchor = document.getElementById("storyPlaylistBtn");
    const rect   = anchor ? anchor.getBoundingClientRect() : null;
    const top    = rect ? (rect.bottom + 8) : 70;
    const right  = rect ? (window.innerWidth - rect.right) : 16;

    const picker = document.createElement("div");
    picker.id = "storyPlPicker";
    picker.style.cssText = [
        "position:fixed",
        `top:${top}px`,
        `right:${right}px`,
        "z-index:200",
        "background:#161618","border:1px solid rgba(255,255,255,0.1)",
        "border-radius:10px","padding:4px","min-width:220px","max-width:270px",
        "box-shadow:0 8px 32px rgba(0,0,0,0.8)",
        "animation:modalFadeIn .15s ease forwards"
    ].join(";");

    // Section label
    const label = document.createElement("div");
    label.style.cssText = "font-size:10px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;" +
        "color:rgba(255,255,255,0.28);padding:6px 10px 4px;";
    label.textContent = "Add to playlist";
    picker.appendChild(label);

    // ＋ New playlist row
    const newItem = document.createElement("div");
    newItem.className = "story-pl-item is-new";
    newItem.innerHTML =
        `<span style="font-size:14px;line-height:1">＋</span>` +
        `<span>New playlist…</span>`;
    newItem.onclick = () => { picker.remove(); _createPlaylistAndAdd(_storyCurrentSceneId); };
    picker.appendChild(newItem);

    if (activePlaylists.length > 0) {
        const divider = document.createElement("div");
        divider.style.cssText = "height:1px;background:rgba(255,255,255,0.07);margin:3px 2px 2px;";
        picker.appendChild(divider);
    }

    activePlaylists.forEach(pl => {
        const alreadyIn = pl.sceneIds.includes(_storyCurrentSceneId);
        const item = document.createElement("div");
        item.className = "story-pl-item" + (alreadyIn ? " is-added" : "");
        item.innerHTML =
            `<span style="font-size:14px;line-height:1;opacity:0.5">🎬</span>` +
            `<span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">` +
                escHtmlMain(pl.name || "Untitled") +
            `</span>` +
            (alreadyIn ? `<span style="font-size:11px;opacity:0.5">✓</span>` : "");
        if (!alreadyIn) {
            item.onmouseenter = () => { item.style.background = "rgba(255,255,255,0.06)"; };
            item.onmouseleave = () => { item.style.background = ""; };
            item.onclick = () => {
                pl.sceneIds.push(_storyCurrentSceneId);
                savePlaylistsToStorage();
                showToast("Added to \u201c" + (pl.name || "Untitled") + "\u201d");
                picker.remove();
            };
        }
        picker.appendChild(item);
    });

    // Dismiss on outside click
    setTimeout(() => {
        document.addEventListener("pointerdown", function _closePicker(e) {
            if (!picker.contains(e.target) && e.target.id !== "storyPlaylistBtn") {
                picker.remove();
                document.removeEventListener("pointerdown", _closePicker);
            }
        });
    }, 0);

    document.body.appendChild(picker);
}