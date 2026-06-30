function applyMapTile(style) {
    const url = MAP_TILES[style] || MAP_TILES.light;
    if (_activeTileLayerRef) { try { map.removeLayer(_activeTileLayerRef); } catch(e) {} }
    _activeTileLayerRef = L.tileLayer(url, {
        subdomains: "abcd",
        attribution: "© OpenStreetMap © CARTO",
        opacity: 0.95
    }).addTo(map);
    const ep = map.getPane("empirePane");
    if (ep) ep.style.zIndex = 250;
}

function syncSettingsUI(s) {
    const q = id => document.getElementById(id);
    if (q("bgmVolumeSlider"))   { q("bgmVolumeSlider").value = s.bgmVolume;   q("bgmVolumeLabel").textContent = s.bgmVolume + "%";   _syncSliderFill(q("bgmVolumeSlider")); }
    if (q("sfxVolumeSlider"))   { q("sfxVolumeSlider").value = s.sfxVolume;   q("sfxVolumeLabel").textContent = s.sfxVolume + "%";   _syncSliderFill(q("sfxVolumeSlider")); }
    if (q("crossfadeSelect"))   q("crossfadeSelect").value = s.crossfade;
    if (q("mapStyleSelect"))    q("mapStyleSelect").value = s.mapStyle;
    if (q("blurSlider"))        { q("blurSlider").value = s.blur;             q("blurLabel").textContent = s.blur + "px";            _syncSliderFill(q("blurSlider")); }
    if (q("overlaySlider"))     { q("overlaySlider").value = s.overlay;       q("overlayLabel").textContent = s.overlay + "%";       _syncSliderFill(q("overlaySlider")); }
    if (q("storySpeedSelect"))  q("storySpeedSelect").value = s.storySpeed;
    if (q("fontSizeSlider"))    { q("fontSizeSlider").value = s.fontSize || 16; const fl=q("fontSizeLabel"); if(fl) fl.textContent=(s.fontSize||16)+"px"; _syncSliderFill(q("fontSizeSlider")); }
    if (q("radiusSlider"))      { q("radiusSlider").value = s.radius ?? 10; const rl=q("radiusLabel"); if(rl) rl.textContent=(s.radius ?? 10)+"px"; _syncSliderFill(q("radiusSlider")); }
    // Swatches — deactivate all if custom accent
    document.querySelectorAll(".swatch").forEach(sw => {
        sw.classList.toggle("active", !s.customAccent && sw.dataset.theme === s.theme);
    });
    // Colour picker + hex label
    const palette2 = s.customAccent
        ? { accent: s.customAccent }
        : (THEME_PALETTES[s.theme] || THEME_PALETTES.red);
    const hex = palette2.accent || "#c0161f";
    if (q("accentColorPicker")) q("accentColorPicker").value = hex;
    if (q("accentHexLabel"))    q("accentHexLabel").textContent = hex;
    // Sync custom dropdown displays
    syncCustomSelects(s);
}

function openSettings(tabName) {
    const page = document.getElementById("settingsPage");
    const s = loadSettings();
    syncSettingsUI(s);
    page.style.display = "flex";
    setTimeout(() => page.classList.add("active"), 10);
    // Jump to a specific tab if requested (e.g. "account" from topbar button)
    if (tabName) {
        document.querySelectorAll(".settings-tab").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".settings-page").forEach(p => p.classList.remove("active"));
        const tab = document.querySelector(`.settings-tab[data-stab="${tabName}"]`);
        const pg  = document.querySelector(`.settings-page[data-spage="${tabName}"]`);
        if (tab) tab.classList.add("active");
        if (pg)  pg.classList.add("active");
        if (tabName === "account" && typeof renderSettingsAccountPage === "function")
            setTimeout(renderSettingsAccountPage, 0);
    }
}

function closeSettings() {
    const page = document.getElementById("settingsPage");
    page.classList.remove("active");
    setTimeout(() => { page.style.display = "none"; }, 300);
}

// Settings tab switching
document.querySelectorAll(".settings-tab").forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".settings-tab").forEach(t => t.classList.remove("active"));
        document.querySelectorAll(".settings-page").forEach(p => p.classList.remove("active"));
        tab.classList.add("active");
        const pg = document.querySelector(`.settings-page[data-spage="${tab.dataset.stab}"]`);
        if (pg) pg.classList.add("active");
        // Re-render account page whenever that tab is opened
        if (tab.dataset.stab === "account" && typeof renderSettingsAccountPage === "function") {
            setTimeout(renderSettingsAccountPage, 0);
        }
        // Load update log when updates tab is opened
        if (tab.dataset.stab === "updates" && typeof loadUpdateLog === "function") {
            setTimeout(() => loadUpdateLog(), 0);
        }
    });
});
if (typeof wolfCode === "function") wolfCode(document.getElementById("settingsTabs"));

// Swatch clicks
document.querySelectorAll(".swatch").forEach(sw => {
    sw.addEventListener("click", () => {
        const s = loadSettings();
        s.theme = sw.dataset.theme;
        delete s.customAccent; // named preset overrides custom
        saveSettings(s);
        applySettings(s, { skipAudio: true });
        syncSettingsUI(s);
    });
});

// Colour picker — live preview while dragging
function onAccentColorInput(hex) {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    const root = document.documentElement;
    root.style.setProperty("--accent",      hex);
    root.style.setProperty("--accent-dim",  `rgba(${r},${g},${b},0.55)`);
    root.style.setProperty("--accent-glow", `rgba(${r},${g},${b},0.25)`);
    // Light-accent detection for live preview
    _applyAccentLightClass(hex);
    // Update hex label
    const lbl = document.getElementById("accentHexLabel");
    if (lbl) lbl.textContent = hex;
    // Deselect swatches visually since we're using a custom colour
    document.querySelectorAll(".swatch").forEach(x => x.classList.remove("active"));
    // Sync admin picker live
    const ap = document.getElementById("adminSettingsColorPicker");
    if (ap) ap.value = hex;
    const al = document.getElementById("adminAccentHexLabel");
    if (al) al.textContent = hex;
}

// Colour picker — persist on commit
function onAccentColorChange(hex) {
    const s = loadSettings();
    s.customAccent = hex;
    // NOTE: s.theme is intentionally kept so settings stay complete.
    // applySettings() already prioritises customAccent over theme when present.
    saveSettings(s);
    applySettings(s, { skipAudio: true });
    // Keep admin settings picker in sync
    const ap = document.getElementById("adminSettingsColorPicker");
    if (ap) ap.value = hex;
    const al = document.getElementById("adminAccentHexLabel");
    if (al) al.textContent = hex;
    document.querySelectorAll(".admin-swatch").forEach(b => {
        b.classList.toggle("active", b.dataset.color && b.dataset.color.toLowerCase() === hex.toLowerCase());
    });
}

// Close settings on backdrop click
document.getElementById("settingsPage").addEventListener("click", function(e) {
    if (e.target === this) closeSettings();
});

function _syncSliderFill(el) {
    if (!el) return;
    const min = parseFloat(el.min) || 0;
    const max = parseFloat(el.max) || 100;
    const val = parseFloat(el.value) || 0;
    const pct = ((val - min) / (max - min)) * 100;
    el.style.setProperty("--fill", pct.toFixed(1) + "%");
}

function onBgmVolumeChange(val) {
    document.getElementById("bgmVolumeLabel").textContent = val + "%";
    _syncSliderFill(document.getElementById("bgmVolumeSlider"));
    const s = loadSettings(); s.bgmVolume = parseInt(val); saveSettings(s);
    settingsMusicVolume = val / 100;
    if (!musicPaused) activeBgm.volume = settingsMusicVolume;
}
function onSfxVolumeChange(val) {
    document.getElementById("sfxVolumeLabel").textContent = val + "%";
    _syncSliderFill(document.getElementById("sfxVolumeSlider"));
    const s = loadSettings(); s.sfxVolume = parseInt(val); saveSettings(s);
    settingsSfxVolume = val / 100;
}
function onCrossfadeChange(val) {
    const s = loadSettings(); s.crossfade = val; saveSettings(s);
    settingsCrossfade = parseInt(val);
}
function onMapStyleChange(val) {
    const s = loadSettings(); s.mapStyle = val; saveSettings(s);
    applyMapTile(val);
}
function onBlurChange(val) {
    document.getElementById("blurLabel").textContent = val + "px";
    _syncSliderFill(document.getElementById("blurSlider"));
    const s = loadSettings(); s.blur = parseInt(val); saveSettings(s);
    document.documentElement.style.setProperty("--panel-blur", val + "px");
}
function onOverlayChange(val) {
    document.getElementById("overlayLabel").textContent = val + "%";
    _syncSliderFill(document.getElementById("overlaySlider"));
    const s = loadSettings(); s.overlay = parseInt(val); saveSettings(s);
    const od = document.getElementById("overlay");
    if (od) od.style.background = `radial-gradient(circle, rgba(0,0,0,${(val/100)*0.25}), rgba(0,0,0,${val/100}))`;
}
function onStorySpeedChange(val) {
    const s = loadSettings(); s.storySpeed = val; saveSettings(s);
    settingsStorySpeed = parseFloat(val);
}
function onRadiusChange(val) {
    document.getElementById("radiusLabel").textContent = val + "px";
    _syncSliderFill(document.getElementById("radiusSlider"));
    const s = loadSettings(); s.radius = parseInt(val); saveSettings(s);
    document.documentElement.style.setProperty("--radius", val + "px");
}
function onFontSizeChange(val) {
    document.getElementById("fontSizeLabel").textContent = val + "px";
    _syncSliderFill(document.getElementById("fontSizeSlider"));
    const s = loadSettings(); s.fontSize = parseInt(val); saveSettings(s);
    document.documentElement.style.setProperty("--ui-font-size", val + "px");
}
function resetAllSettings() {
    saveSettings(Object.assign({}, DEFAULT_SETTINGS));
    applySettings(DEFAULT_SETTINGS);
    syncSettingsUI(DEFAULT_SETTINGS);
}

// Settings are now applied in window.onload so the DOM is fully ready.

const LS_BOOKMARKS = "whd_bookmarks";

function loadBookmarks() {
    try { return JSON.parse(localStorage.getItem(LS_BOOKMARKS) || "[]"); } catch { return []; }
}
function saveBookmarks(arr) {
    try { localStorage.setItem(LS_BOOKMARKS, JSON.stringify(arr)); } catch {}
}
function isBookmarked(sceneId) {
    return loadBookmarks().some(b => b.id === sceneId);
}
function toggleBookmark(sceneId) {
    const scene = scenes.find(s => s.id === sceneId);
    if (!scene) return;
    let bms = loadBookmarks();
    const idx = bms.findIndex(b => b.id === sceneId);
    const adding = idx === -1;
    if (!adding) {
        bms.splice(idx, 1);
    } else {
        bms.push({
            id:        sceneId,
            name:      scene.name,
            country:   scene.country   || "",
            season:    scene.season    || "",
            imgKey:    scene.imgKey    || "",
            region:    scene.region    || "",
            startYear: scene.startYear != null ? scene.startYear : null,
            addedAt:   Date.now()
        });
    }
    saveBookmarks(bms);
    refreshBookmarkButtons(sceneId, adding);
    showBookmarkToast(adding ? "Bookmarked" : "Removed", scene.name);
    const modal = document.getElementById("bookmarksModal");
    if (modal && modal.classList.contains("active")) renderBookmarksList();
}

function refreshBookmarkButtons(sceneId, isNowBookmarked) {
    document.querySelectorAll(`.bm-star-btn[data-scene="${sceneId}"]`).forEach(btn => {
        btn.classList.toggle("bm-active", isNowBookmarked);
        btn.title = isNowBookmarked ? "Remove bookmark" : "Bookmark this scene";
    });
}

function showBookmarkToast(action, name) {
    let t = document.getElementById("bookmarkToast");
    if (!t) {
        t = document.createElement("div");
        t.id = "bookmarkToast";
        document.body.appendChild(t);
    }
    t.innerHTML = `<span class="bm-toast-icon">${action === "Bookmarked" ? "★" : "✕"}</span><span>${action}: <strong>${escHtmlMain(name)}</strong></span>`;
    t.className = "bm-toast-show";
    clearTimeout(t._tid);
    t._tid = setTimeout(() => { t.className = ""; }, 2400);
}

function makeBookmarkStarBtn(scene) {
    const btn = document.createElement("button");
    btn.className = "bm-star-btn" + (isBookmarked(scene.id) ? " bm-active" : "");
    btn.dataset.scene = scene.id;
    btn.title = isBookmarked(scene.id) ? "Remove bookmark" : "Bookmark this scene";
    btn.innerHTML = "★";
    btn.onclick = (e) => {
        e.stopPropagation();
        toggleBookmark(scene.id);
    };
    return btn;
}

// Inject ★ buttons into episode cards after openSeason renders them.
// We chain onto the ALREADY-patched openSeason (from playlist code above).
const _origOpenSeasonBM = openSeason;
openSeason = function(season, skipNav) {
    _origOpenSeasonBM(season, skipNav);
    document.querySelectorAll(".episode-card").forEach(card => {
        if (card.querySelector(".bm-star-btn")) return; // already added
        const titleEl = card.querySelector("div");
        if (!titleEl) return;
        const scene = scenes.find(s =>
            s.name === titleEl.innerText &&
            normalizeName(s.season) === normalizeName(season.name)
        );
        if (!scene) return;
        const imgWrap = card.querySelector(".episode-card-img-wrap") || card;
        imgWrap.appendChild(makeBookmarkStarBtn(scene));
    });
};

// ★ buttons injected natively in renderPlaylistScenes and filterSceneSearch

// ── Bookmarks modal ───────────────────────────────────────────────────────────
function openBookmarks() {
    openPlaylists("bookmarks");
}
function closeBookmarks() {
    closePlaylists();
}

async function clearAllBookmarks() {
    if (!loadBookmarks().length) return;
    const count = loadBookmarks().length;
    const ok = await showAppConfirm({
        icon: "★",
        title: "Clear All Bookmarks?",
        msg: count + " bookmark" + (count !== 1 ? "s" : "") + " will be permanently removed.",
        okLabel: "Clear All",
        okDanger: true
    });
    if (!ok) return;
    saveBookmarks([]);
    document.querySelectorAll(".bm-star-btn").forEach(b => {
        b.classList.remove("bm-active");
        b.title = "Bookmark this scene";
    });
    renderBookmarksList();
}

function renderBookmarksList() {
    const list = document.getElementById("bookmarksList");
    if (!list) return;
    const bms = loadBookmarks();

    if (bms.length === 0) {
        list.innerHTML = `
            <div class="bm-empty">
                <div class="bm-empty-icon">☆</div>
                <div class="bm-empty-title">No bookmarks yet</div>
                <div class="bm-empty-hint">Tap ★ on any scene card in a season or playlist.</div>
            </div>`;
        return;
    }

    // Group by season
    const grouped = {};
    bms.forEach(b => {
        const key = b.season || "Unsorted";
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(b);
    });

    const clearBar = `<div class="bm-list-header"><span class="bm-list-count">${bms.length} bookmark${bms.length !== 1 ? "s" : ""}</span><button class="bm-clear-btn" onclick="clearAllBookmarks()">Clear all</button></div>`;
    list.innerHTML = clearBar + Object.entries(grouped).map(([season, items]) => `
        <div class="bm-group">
            <div class="bm-group-header">
                <span class="bm-group-name">${escHtmlMain(season)}</span>
                <span class="bm-group-count">${items.length}</span>
            </div>
            <div class="bm-group-items">
            ${items.map(b => {
                const year = b.startYear != null
                    ? (b.startYear < 0 ? Math.abs(b.startYear) + " BCE" : b.startYear + " CE")
                    : "";
                return `
                <div class="bm-card">
                    <img class="bm-card-thumb" src="images/${escHtmlMain(b.imgKey)}.jpg"
                         onerror="this.src='images/default.png'" alt="">
                    <div class="bm-card-body">
                        <div class="bm-card-name">${escHtmlMain(b.name)}</div>
                        <div class="bm-card-meta">${escHtmlMain(b.region || b.country)}${year ? " · " + year : ""}</div>
                    </div>
                    <div class="bm-card-btns">
                        <button class="bm-go-btn" onclick="goToBookmark('${escHtmlMain(b.id)}')" title="Go to scene">▶ Go</button>
                        <button class="bm-share-scene-btn" onclick="shareBookmarkScene('${escHtmlMain(b.id)}')" title="Copy link to this scene">🔗</button>
                        <button class="src-more-btn" onclick="WHDSources.open('${escHtmlMain(b.id)}')" title="Sources & educational content">📚</button>
                        <button class="bm-del-btn" onclick="removeBookmark('${escHtmlMain(b.id)}')" title="Remove bookmark">★</button>
                    </div>
                </div>`;
            }).join("")}
            </div>
        </div>`).join("");
}

// ── Explore tab — search any scene and jump to it ────────────────────────────
function filterExploreSearch() {
    const input = document.getElementById("exploreSearchInput");
    const container = document.getElementById("exploreResults");
    if (!input || !container) return;

    const q = input.value.trim();
    container.innerHTML = "";

    const scored = q
        ? searchScenes(q, scenes).slice(0, 50)
        : scenes.slice(0, 50).map(s => ({ scene: s, score: 0, matchedFields: new Set(), tokens: [] }));

    if (q && scored.length === 0) {
        container.innerHTML = '<div class="pl-empty-msg">No matching scenes found.</div>';
        return;
    }

    scored.forEach(({ scene, tokens, matchedFields }) => {
        const row = document.createElement("div");
        row.className = "pl-search-row explore-row";

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

        const goBtn = document.createElement("button");
        goBtn.className = "pl-add-btn";
        goBtn.innerText = "▶ Go";
        goBtn.onclick = () => {
            closePlaylists();
            showScene(scene);
        };

        const starBtn = makeBookmarkStarBtn(scene);
        starBtn.classList.add("bm-star-inline");

        const moreBtn = WHDSources.makeMoreBtn(scene, "explore-share-btn");

        const shareBtn = document.createElement("button");
        shareBtn.className = "explore-share-btn";
        shareBtn.title = "Copy link to this scene";
        shareBtn.innerText = "🔗";
        shareBtn.onclick = (e) => {
            e.stopPropagation();
            const url = location.origin + location.pathname + "#scene=" + encodeURIComponent(scene.id);
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(url).then(() => showShareToast()).catch(() => fallbackCopy(url));
            } else {
                fallbackCopy(url);
            }
        };

        row.appendChild(img);
        row.appendChild(info);
        row.appendChild(shareBtn);
        row.appendChild(moreBtn);
        row.appendChild(starBtn);
        row.appendChild(goBtn);
        container.appendChild(row);
    });
}