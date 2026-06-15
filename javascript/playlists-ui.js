function loadPlaylistsFromStorage() {
    try {
        const raw = localStorage.getItem(PLAYLIST_STORAGE_KEY);
        activePlaylists = raw ? JSON.parse(raw) : [];
    } catch (e) {
        activePlaylists = [];
    }
}

function savePlaylistsToStorage() {
    try {
        localStorage.setItem(PLAYLIST_STORAGE_KEY, JSON.stringify(activePlaylists));
    } catch (e) {
        showToast("Could not save playlists.");
    }
}

function generateId() {
    return "pl_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
}

function openPlaylists(tab) {
    loadPlaylistsFromStorage();
    renderPlaylistSidebar();
    document.getElementById("playlistModal").classList.add("pl-visible");
    if (activePlaylistId) renderPlaylistEditor();
    switchPanelTab(tab || "playlists");
}

function closePlaylists() {
    document.getElementById("playlistModal").classList.remove("pl-visible");
}

function switchPanelTab(tabName) {
    document.querySelectorAll(".panel-tab").forEach(b => {
        b.classList.toggle("active", b.dataset.panelTab === tabName);
    });
    document.querySelectorAll(".panel-tab-content").forEach(el => {
        el.classList.remove("active");
    });
    const target = document.getElementById(
        tabName === "playlists" ? "panelTabPlaylists" :
        tabName === "bookmarks" ? "panelTabBookmarks" :
        "panelTabExplore"
    );
    if (target) target.classList.add("active");

    if (tabName === "bookmarks") renderBookmarksList();
    if (tabName === "explore")   filterExploreSearch();
}

function renderPlaylistSidebar() {
    const list = document.getElementById("playlistList");
    list.innerHTML = "";

    if (activePlaylists.length === 0) {
        const empty = document.createElement("div");
        empty.className = "pl-empty-msg";
        empty.innerText = "No playlists yet. Hit "+" to create one.";
        list.appendChild(empty);
        return;
    }

    activePlaylists.forEach(pl => {
        const item = document.createElement("div");
        item.className = "pl-list-item" + (pl.id === activePlaylistId ? " pl-list-item-active" : "");

        const icon = document.createElement("span");
        icon.className = "pl-item-icon";
        icon.innerText = "🎬";

        const info = document.createElement("div");
        info.className = "pl-item-info";

        const name = document.createElement("div");
        name.className = "pl-item-name";
        name.innerText = pl.name || "Untitled";

        const meta = document.createElement("div");
        meta.className = "pl-item-meta";
        meta.innerText = pl.sceneIds.length + " scene" + (pl.sceneIds.length !== 1 ? "s" : "");

        info.appendChild(name);
        info.appendChild(meta);
        item.appendChild(icon);
        item.appendChild(info);

        item.onclick = () => {
            activePlaylistId = pl.id;
            renderPlaylistSidebar();
            renderPlaylistEditor();
        };

        list.appendChild(item);
    });
}

function createNewPlaylist() {
    const pl = {
        id: generateId(),
        name: _uniquePlaylistName("New Playlist"),
        music: null,
        sceneIds: []
    };
    activePlaylists.push(pl);
    activePlaylistId = pl.id;
    savePlaylistsToStorage();
    renderPlaylistSidebar();
    renderPlaylistEditor();
    // Focus name input
    setTimeout(() => {
        const inp = document.getElementById("playlistNameInput");
        if (inp) { inp.focus(); inp.select(); }
    }, 50);
}

// ════════════════════════════════════════════════════════════════════
//  Shared confirmation dialog (mirrors admin panel style)
// ════════════════════════════════════════════════════════════════════

let _appConfirmResolve = null;

function _ensureAppConfirmModal() {
    if (document.getElementById("appConfirm")) return;
    const modal = document.createElement("div");
    modal.id = "appConfirm";
    modal.innerHTML = `
        <div id="appConfirmBox">
            <div id="appConfirmIcon"></div>
            <div id="appConfirmTitle"></div>
            <div id="appConfirmMsg"></div>
            <div class="app-confirm-btns">
                <button id="appConfirmOk"></button>
                <button id="appConfirmCancel">Cancel</button>
            </div>
        </div>`;
    document.body.appendChild(modal);

    document.getElementById("appConfirmOk").onclick = () => {
        document.getElementById("appConfirm").classList.remove("ac-visible");
        if (_appConfirmResolve) { _appConfirmResolve(true); _appConfirmResolve = null; }
    };
    document.getElementById("appConfirmCancel").onclick = () => {
        document.getElementById("appConfirm").classList.remove("ac-visible");
        if (_appConfirmResolve) { _appConfirmResolve(false); _appConfirmResolve = null; }
    };
    modal.addEventListener("pointerdown", e => {
        if (e.target === modal) document.getElementById("appConfirmCancel").click();
    });
}

function showAppConfirm({ icon = "⚠️", title = "Are you sure?", msg = "", okLabel = "Confirm", okDanger = true }) {
    _ensureAppConfirmModal();
    return new Promise(res => {
        _appConfirmResolve = res;
        document.getElementById("appConfirmIcon").textContent = icon;
        document.getElementById("appConfirmTitle").textContent = title;
        document.getElementById("appConfirmMsg").textContent = msg;
        const okBtn = document.getElementById("appConfirmOk");
        okBtn.textContent = okLabel;
        okBtn.className = okDanger ? "ac-ok-danger" : "ac-ok-safe";
        document.getElementById("appConfirm").classList.add("ac-visible");
    });
}

function deleteActivePlaylist() {
    if (!activePlaylistId) return;
    const pl = getActivePlaylist();
    const name = (pl && pl.name) ? pl.name : "this playlist";
    showAppConfirm({
        icon: "🗑️",
        title: "Delete Playlist?",
        msg: "\u201c" + name + "\u201d will be permanently removed.",
        okLabel: "Delete",
        okDanger: true
    }).then(ok => {
        if (!ok) return;
        activePlaylists = activePlaylists.filter(p => p.id !== activePlaylistId);
        activePlaylistId = activePlaylists.length > 0 ? activePlaylists[activePlaylists.length - 1].id : null;
        savePlaylistsToStorage();
        renderPlaylistSidebar();
        renderPlaylistEditor();
        refreshExplorePlDropdown_label();
    });
}

function renameActivePlaylist() {
    const pl = getActivePlaylist();
    if (!pl) return;
    const inp = document.getElementById("playlistNameInput");
    const newName = (inp ? inp.value : "").trim();
    if (!newName) return; // don't save empty name
    // Check for duplicate (ignore the playlist being renamed itself)
    const duplicate = activePlaylists.find(
        p => p.id !== pl.id && (p.name || "").trim().toLowerCase() === newName.toLowerCase()
    );
    if (duplicate) {
        inp.style.borderColor = "var(--accent)";
        inp.title = "A playlist with this name already exists";
        return;
    }
    inp.style.borderColor = "";
    inp.title = "";
    pl.name = newName;
    savePlaylistsToStorage();
    renderPlaylistSidebar();
    refreshExplorePlDropdown();
}

function getActivePlaylist() {
    return activePlaylists.find(pl => pl.id === activePlaylistId) || null;
}

function renderPlaylistEditor() {
    const empty = document.getElementById("playlistEditorEmpty");
    const content = document.getElementById("playlistEditorContent");
    const pl = getActivePlaylist();

    if (!pl) {
        empty.style.display = "flex";
        content.style.display = "none";
        return;
    }

    empty.style.display = "none";
    content.style.display = "flex";

    // Name
    document.getElementById("playlistNameInput").value = pl.name;

    // Music label — for Auto, show the live track if currently playing, else first scene preview
    let musicLabelText;
    if (pl.music !== null && pl.music !== undefined) {
        musicLabelText = getMusicLabel(pl.music, null);
    } else if (running && lastMusic) {
        // Auto + currently playing — show the live inferred track
        const liveTrack = AVAILABLE_MUSIC_TRACKS.find(t => t.value === lastMusic);
        const liveName = liveTrack ? liveTrack.label : lastMusic.replace(/_/g, " ");
        musicLabelText = `Auto \u2014 ${liveName}`;
    } else {
        const firstScene = (pl.sceneIds.length > 0)
            ? scenes.find(s => s.id === pl.sceneIds[0]) || null
            : null;
        musicLabelText = getMusicLabel(pl.music, firstScene);
    }
    document.getElementById("playlistMusicLabel").innerText = musicLabelText;

    // Render scenes inside this playlist
    renderPlaylistScenes(pl);

    // Render scene search
    filterSceneSearch();
    if (!document.getElementById("sceneSearchSuggestions")) {
        renderSearchSuggestions();
    }
}

function renderPlaylistScenes(pl) {
    const container = document.getElementById("playlistScenes");
    container.innerHTML = "";

    if (pl.sceneIds.length === 0) {
        const empty = document.createElement("div");
        empty.className = "pl-empty-msg";
        empty.style.padding = "12px 0";
        empty.innerText = "No scenes yet — search above to add some.";
        container.appendChild(empty);
        return;
    }

    pl.sceneIds.forEach((sid, idx) => {
        const scene = scenes.find(s => s.id === sid);
        if (!scene) return;

        const row = document.createElement("div");
        row.className = "pl-scene-row";

        const num = document.createElement("span");
        num.className = "pl-scene-num";
        num.innerText = idx + 1;

        const img = document.createElement("img");
        img.className = "pl-scene-thumb";
        img.src = "images/" + scene.imgKey + ".jpg";
        img.onerror = () => { img.src = "images/default.png"; };

        const info = document.createElement("div");
        info.className = "pl-scene-info";

        const sname = document.createElement("div");
        sname.className = "pl-scene-name";
        sname.innerText = scene.name;

        const smeta = document.createElement("div");
        smeta.className = "pl-scene-meta";
        smeta.innerText = scene.region + " · " + (scene.startYear < 0 ? Math.abs(scene.startYear) + " BCE" : scene.startYear + " CE");

        info.appendChild(sname);
        info.appendChild(smeta);

        // Move up / down / remove buttons
        const actions = document.createElement("div");
        actions.className = "pl-scene-actions";

        const upBtn = document.createElement("button");
        upBtn.innerText = "↑";
        upBtn.title = "Move up";
        upBtn.disabled = idx === 0;
        upBtn.onclick = () => { moveSceneInPlaylist(pl, idx, -1); };

        const downBtn = document.createElement("button");
        downBtn.innerText = "↓";
        downBtn.title = "Move down";
        downBtn.disabled = idx === pl.sceneIds.length - 1;
        downBtn.onclick = () => { moveSceneInPlaylist(pl, idx, 1); };

        const removeBtn = document.createElement("button");
        removeBtn.className = "pl-remove-btn";
        removeBtn.innerText = "✕";
        removeBtn.title = "Remove";
        removeBtn.onclick = () => { removeSceneFromPlaylist(pl, sid); };

        const starBtn = makeBookmarkStarBtn(scene);
        starBtn.classList.add("bm-star-inline");

        actions.appendChild(starBtn);
        actions.appendChild(upBtn);
        actions.appendChild(downBtn);
        actions.appendChild(removeBtn);

        row.appendChild(num);
        row.appendChild(img);
        row.appendChild(info);
        row.appendChild(actions);
        container.appendChild(row);
    });
}

function moveSceneInPlaylist(pl, idx, dir) {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= pl.sceneIds.length) return;
    const ids = pl.sceneIds;
    [ids[idx], ids[newIdx]] = [ids[newIdx], ids[idx]];
    savePlaylistsToStorage();
    renderPlaylistScenes(pl);
}

function removeSceneFromPlaylist(pl, sceneId) {
    pl.sceneIds = pl.sceneIds.filter(id => id !== sceneId);
    savePlaylistsToStorage();
    renderPlaylistScenes(pl);
    filterSceneSearch(); // refresh add buttons
    renderPlaylistSidebar(); // update count
}

function renderSearchSuggestions() {
    let sugBox = document.getElementById("sceneSearchSuggestions");
    if (!sugBox) {
        sugBox = document.createElement("div");
        sugBox.id = "sceneSearchSuggestions";
        const bar = document.getElementById("sceneSearchBar");
        bar.insertAdjacentElement("afterend", sugBox);
    }
    sugBox.innerHTML = "";

    const label = document.createElement("span");
    label.style.cssText = "font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:rgba(255,255,255,0.25);display:block;width:100%;margin-bottom:2px;";
    label.textContent = "Try adding these to start:";
    sugBox.appendChild(label);
}


// Search engine functions (_trigrams, _editDist, _parseYearToken, _yearMatches,
// _tokenMatchField, _scoreToken, searchScenes, highlightMatches) are defined in
// javascript/search.js, which is loaded before this file.

function filterSceneSearch() {
    const input = document.getElementById("sceneSearchInput");

    // Update placeholder to reflect searchable criteria
    if (input) {
        input.placeholder = "Search by name, country, region, or season…";
    }

    sceneSearchQuery = input ? input.value.trim().toLowerCase() : "";

    const container = document.getElementById("sceneSearchResults");
    container.innerHTML = "";

    // Show/hide suggestions
    let sugBox = document.getElementById("sceneSearchSuggestions");
    if (!sceneSearchQuery) {
        if (!sugBox) renderSearchSuggestions();
        else sugBox.style.display = "flex";
    } else {
        if (!sugBox) {
            // create it but hidden
            renderSearchSuggestions();
            sugBox = document.getElementById("sceneSearchSuggestions");
        }
        sugBox.style.display = "none";
    }

    const pl = getActivePlaylist();
    if (!pl) return;

    // Filter + rank scenes using the search engine
    const _fssResults = sceneSearchQuery
        ? searchScenes(sceneSearchQuery, scenes).slice(0, 40)
        : scenes.slice(0, 40).map(s => ({ scene: s, score: 0, matchedFields: new Set(), tokens: [] }));
    const results = _fssResults; // kept as scored objects below

    if (results.length === 0) {
        const msg = document.createElement("div");
        msg.className = "pl-empty-msg";
        msg.innerText = "No matching scenes found.";
        container.appendChild(msg);
        return;
    }

    _fssResults.forEach(({ scene, tokens, matchedFields }) => {
        const already = pl.sceneIds.includes(scene.id);

        const row = document.createElement("div");
        row.className = "pl-search-row" + (already ? " pl-search-already" : "");

        const img = document.createElement("img");
        img.className = "pl-scene-thumb";
        img.src = "images/" + scene.imgKey + ".jpg";
        img.onerror = () => { img.src = "images/default.png"; };

        const info = document.createElement("div");
        info.className = "pl-scene-info";

        const sname = document.createElement("div");
        sname.className = "pl-scene-name";
        sname.innerHTML = highlightMatches(scene.name, tokens);

        const yearStr = scene.startYear != null
            ? (scene.startYear < 0 ? Math.abs(scene.startYear) + " BCE" : scene.startYear + " CE")
            : "";
        const metaParts = [scene.region, scene.country, scene.season, yearStr]
            .filter(Boolean)
            .filter((v, i, a) => a.indexOf(v) === i);
        const smeta = document.createElement("div");
        smeta.className = "pl-scene-meta";
        smeta.innerHTML = metaParts.map(p => highlightMatches(p, tokens)).join(" · ");

        info.appendChild(sname);
        info.appendChild(smeta);

        const addBtn = document.createElement("button");
        addBtn.className = "pl-add-btn" + (already ? " pl-add-btn-added" : "");
        addBtn.innerText = already ? "✓ Added" : "+ Add";
        addBtn.disabled = already;
        addBtn.onclick = () => {
            if (!already) addSceneToPlaylist(pl, scene.id);
        };

        const starBtnS = makeBookmarkStarBtn(scene);
        starBtnS.classList.add("bm-star-inline");

        row.appendChild(img);
        row.appendChild(info);
        row.appendChild(starBtnS);
        row.appendChild(addBtn);
        container.appendChild(row);
    });
}