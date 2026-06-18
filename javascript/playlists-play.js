function addSceneToPlaylist(pl, sceneId) {
    if (pl.sceneIds.includes(sceneId)) return; // no duplicates
    pl.sceneIds.push(sceneId);
    savePlaylistsToStorage();
    renderPlaylistScenes(pl);
    filterSceneSearch(); // update add buttons
    renderPlaylistSidebar(); // update count
    showToast("Scene added to playlist!");
}

function openMusicPicker() {
    const modal = document.getElementById("musicPickerModal");
    const list = document.getElementById("musicPickerList");
    list.innerHTML = "";
    const pl = getActivePlaylist();

    // Pre-compute which tracks the scenes in this playlist would use under Auto
    const autoTrackCounts = {};
    if (pl) {
        pl.sceneIds.forEach(sid => {
            const s = scenes.find(sc => sc.id === sid);
            if (!s) return;
            const t = getMusicForScene(s);
            autoTrackCounts[t] = (autoTrackCounts[t] || 0) + 1;
        });
    }

    AVAILABLE_MUSIC_TRACKS.forEach(track => {
        const isSelected = pl && pl.music === track.value;
        const item = document.createElement("div");
        item.className = "pl-music-item" + (isSelected ? " pl-music-selected" : "");

        const check = document.createElement("span");
        check.className = "pl-music-check";
        check.innerText = isSelected ? "✓" : "";

        const textWrap = document.createElement("div");
        textWrap.style.cssText = "display:flex;flex-direction:column;flex:1;min-width:0;gap:2px;";

        const labelEl = document.createElement("span");

        if (track.value === null) {
            // Auto row — show a breakdown of which tracks will play
            labelEl.innerText = "Auto (scene default)";
            labelEl.style.fontWeight = "600";
            if (pl && pl.sceneIds.length > 0) {
                const breakdown = Object.entries(autoTrackCounts)
                    .sort((a, b) => b[1] - a[1])
                    .map(([k, v]) => {
                        const found = AVAILABLE_MUSIC_TRACKS.find(t => t.value === k);
                        const name = found ? found.label : k.replace(/_/g, " ");
                        return `${name} (${v})`;
                    })
                    .join(", ");
                const hint = document.createElement("span");
                hint.style.cssText = "font-size:11px;color:#888;font-weight:400;white-space:normal;line-height:1.4;";
                hint.innerText = breakdown
                    ? `Plays per scene: ${breakdown}`
                    : "Music follows each scene's region";
                textWrap.appendChild(labelEl);
                textWrap.appendChild(hint);
            } else {
                labelEl.style.color = "#bbb";
                textWrap.appendChild(labelEl);
            }
        } else {
            labelEl.innerText = track.label;
            // Show how many scenes in this playlist match this track under Auto
            const count = autoTrackCounts[track.value] || 0;
            if (pl && pl.sceneIds.length > 0 && count > 0) {
                const hint = document.createElement("span");
                hint.style.cssText = "font-size:11px;color:#666;font-weight:400;";
                hint.innerText = `${count} scene${count > 1 ? "s" : ""} use this naturally`;
                textWrap.appendChild(labelEl);
                textWrap.appendChild(hint);
            } else {
                textWrap.appendChild(labelEl);
            }
        }

        item.appendChild(check);
        item.appendChild(textWrap);
        item.onclick = () => {
            if (pl) {
                pl.music = track.value;
                savePlaylistsToStorage();
                // Update label immediately — for Auto, use first-scene preview
                const firstScene = (pl.sceneIds.length > 0)
                    ? scenes.find(s => s.id === pl.sceneIds[0]) || null
                    : null;
                document.getElementById("playlistMusicLabel").innerText =
                    getMusicLabel(pl.music, firstScene);
            }
            closeMusicPicker();
        };

        list.appendChild(item);
    });

    modal.classList.add("pl-visible");
}

function closeMusicPicker() {
    document.getElementById("musicPickerModal").classList.remove("pl-visible");
}

function playActivePlaylist() {
    const pl = getActivePlaylist();
    if (!pl || pl.sceneIds.length === 0) {
        showToast("Add some scenes to your playlist first!");
        return;
    }

    closePlaylists();

    const playlistScenes = pl.sceneIds
        .map(id => scenes.find(s => s.id === id))
        .filter(Boolean);

    if (playlistScenes.length === 0) {
        showToast("No valid scenes in this playlist.");
        return;
    }

    // Set the music lock BEFORE ensureMusicReady so it can't clobber our track.
    playlistMusicLock = pl.music || null;

    ensureMusicReady();
    running = true;
    paused = false;
    index = 0;
    inPlaylistMode = true;
    _playlistReplayId = pl.id;
    currentPlaylist = playlistScenes;

    // Clear any stale progress dots from a previous run
    const dotsEl = document.getElementById("sceneProgressDots");
    if (dotsEl) dotsEl.innerHTML = "";

    // Override music if playlist has a fixed track
    if (pl.music) {
        lastMusic = pl.music;
        playMusic(pl.music);
    }

    setUIState("story");

    loopPlaylistStory();
}


function appendMyPlaylistsButton(bar) {
    const btn = document.createElement("div");
    btn.className = "season pl-bar-btn";
    btn.id = "myPlaylistsBarBtn";
    btn.innerHTML = "🎬 My Playlists";
    btn.onclick = (e) => {
        e.stopPropagation();
        openPlaylists();
    };
    bar.appendChild(btn);
}

const _origRenderContinents = renderContinents;
renderContinents = function () {
    _origRenderContinents();
    const bar = document.getElementById("seasons");
    appendMyPlaylistsButton(bar);
};

const _origLoadTree = loadTree;
loadTree = function (node) {
    _origLoadTree(node);
    const bar = document.getElementById("seasons");
    appendMyPlaylistsButton(bar);
};

const _origOpenSeason = openSeason;
openSeason = function (season, skipNav = false) {
    _origOpenSeason(season, skipNav);
    const bar = document.getElementById("seasons");
    appendMyPlaylistsButton(bar);
};

loadPlaylistsFromStorage();
// ═══════════════════════════════════════════════════════════════
//  SETTINGS SYSTEM
// ═══════════════════════════════════════════════════════════════
const LS_SETTINGS = "whd_settings";

const THEME_PALETTES = {
    red:    { accent: "#c0161f", accentDim: "rgba(192,22,31,0.55)",  accentGlow: "rgba(192,22,31,0.25)" },
    blue:   { accent: "#1f3ac3", accentDim: "rgba(31,58,195,0.55)", accentGlow: "rgba(31,58,195,0.25)" },
    white:  { accent: "#ffffff", accentDim: "rgba(255,255,255,0.45)", accentGlow: "rgba(255,255,255,0.12)" },
    orange: { accent: "#ff7700", accentDim: "rgba(255, 119, 0,0.55)", accentGlow: "rgba(255, 119, 0,0.25)" },
    purple: { accent: "#5d00ff", accentDim: "rgba(67,0,183,0.55)", accentGlow: "rgba(67,0,183,0.25)" },
    lightblue: { accent: "#00eeff", accentDim: "rgba(0, 238, 255, 0.55)",  accentGlow: "rgba(0, 238, 255, 0.25)" },
    colorfusion1: { accent: "#be3300", accentDim: "rgba(190, 32, 0, 0.55)", accentGlow: "rgba(190, 19, 0, 0.25)" },
    colorfusion2: { accent: "#ff0099", accentDim: "rgba(227, 0, 83, 0.55)", accentGlow: "rgba(150, 0, 55, 0.25)" }
};

// ── Relative luminance (0=black … 1=white) ────────────────────────────────
function _accentLuminance(hex) {
    if (!hex || hex.length < 7) return 0;
    const r = parseInt(hex.slice(1,3),16)/255;
    const g = parseInt(hex.slice(3,5),16)/255;
    const b = parseInt(hex.slice(5,7),16)/255;
    const lin = c => c <= 0.04045 ? c/12.92 : Math.pow((c+0.055)/1.055,2.4);
    return 0.2126*lin(r) + 0.7152*lin(g) + 0.0722*lin(b);
}
// Toggle body.accent-is-light so CSS can invert text on accent backgrounds
function _applyAccentLightClass(hex) {
    document.body.classList.toggle('accent-is-light', _accentLuminance(hex) > 0.4);
}

// ═══════════════════════════════════════════════════════════════
//  CUSTOM SELECT DROPDOWNS  (crossfade / map style / story speed)
// ═══════════════════════════════════════════════════════════════
function _escHtmlCS(s) {
    return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function _csSetValue(wrap, val) {
    const valEl = wrap.querySelector('.c-sel-value');
    wrap.querySelectorAll('.c-sel-opt').forEach(o => {
        const hit = o.dataset.val === String(val);
        o.classList.toggle('selected', hit);
        if (hit && valEl) valEl.textContent = o.dataset.label || o.textContent;
    });
}

function _buildCustomSelect(sel) {
    if (!sel || sel._csInitialised) return;
    sel._csInitialised = true;
    sel.style.display = 'none';

    const opts = Array.from(sel.options);
    const curVal = sel.value;
    const curLabel = opts.find(o => o.value === curVal)?.text || opts[0]?.text || '';

    const wrap = document.createElement('div');
    wrap.className = 'c-sel';
    wrap.dataset.for = sel.id;

    wrap.innerHTML =
        `<div class="c-sel-trigger" tabindex="0" role="combobox" aria-haspopup="listbox" aria-expanded="false">` +
            `<span class="c-sel-value">${_escHtmlCS(curLabel)}</span>` +
            `<svg class="c-sel-arrow" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">` +
                `<path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>` +
            `</svg>` +
        `</div>` +
        `<div class="c-sel-menu" role="listbox">` +
            opts.map(o =>
                `<div class="c-sel-opt${o.value===curVal?' selected':''}" data-val="${_escHtmlCS(o.value)}" data-label="${_escHtmlCS(o.text)}" role="option">${_escHtmlCS(o.text)}</div>`
            ).join('') +
        `</div>`;

    sel.parentNode.insertBefore(wrap, sel);

    const trigger = wrap.querySelector('.c-sel-trigger');

    function openMenu() {
        document.querySelectorAll('.c-sel.open').forEach(w => { if (w!==wrap) w.classList.remove('open'); });
        wrap.classList.add('open');
        trigger.setAttribute('aria-expanded','true');
    }
    function closeMenu() {
        wrap.classList.remove('open');
        trigger.setAttribute('aria-expanded','false');
    }

    trigger.addEventListener('click', e => {
        e.stopPropagation();
        wrap.classList.contains('open') ? closeMenu() : openMenu();
    });
    trigger.addEventListener('keydown', e => {
        if (e.key==='Enter'||e.key===' ') { e.preventDefault(); wrap.classList.contains('open') ? closeMenu() : openMenu(); }
        if (e.key==='Escape') closeMenu();
    });
    wrap.querySelectorAll('.c-sel-opt').forEach(optEl => {
        optEl.addEventListener('click', e => {
            e.stopPropagation();
            const val = optEl.dataset.val;
            _csSetValue(wrap, val);
            sel.value = val;
            sel.dispatchEvent(new Event('change', { bubbles: true }));
            closeMenu();
        });
    });
    document.addEventListener('click', e => {
        if (!wrap.contains(e.target)) closeMenu();
    }, true);

    wrap.setValue = val => _csSetValue(wrap, val);
}

function initCustomSelects() {
    ['crossfadeSelect','mapStyleSelect','storySpeedSelect'].forEach(id => {
        const el = document.getElementById(id);
        if (el) _buildCustomSelect(el);
    });
}

function syncCustomSelects(s) {
    [['crossfadeSelect', s.crossfade], ['mapStyleSelect', s.mapStyle], ['storySpeedSelect', s.storySpeed]]
        .forEach(([id, val]) => {
            if (val === undefined) return;
            const w = document.querySelector(`.c-sel[data-for="${id}"]`);
            if (w && w.setValue) w.setValue(String(val));
        });
}

const MAP_TILES = {
    light:     "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    dark:      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    voyager:   "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
};

let currentTileLayer = null;
let settingsCrossfade = 1400;
let settingsStorySpeed = 1.0;
let settingsSfxVolume = 0.7;
let settingsMusicVolume = 0.3;

const DEFAULT_SETTINGS = {
    bgmVolume:  30,
    sfxVolume:  70,
    crossfade:  "1400",
    theme:      "red",
    mapStyle:   "light",
    blur:       12,
    overlay:    75,
    storySpeed: "1",
    fontSize:   16,
    radius:     10
};

function loadSettings() {
    try {
        const saved = JSON.parse(localStorage.getItem(LS_SETTINGS) || "null");
        return saved ? Object.assign({}, DEFAULT_SETTINGS, saved) : Object.assign({}, DEFAULT_SETTINGS);
    } catch(e) { return Object.assign({}, DEFAULT_SETTINGS); }
}

function saveSettings(s) {
    try { localStorage.setItem(LS_SETTINGS, JSON.stringify(s)); } catch(e) {}
}

function applySettings(s, { skipAudio = false } = {}) {
    // BGM volume — only touch the audio element when explicitly changing audio settings
    settingsMusicVolume = s.bgmVolume / 100;
    if (!skipAudio && !musicPaused && activeBgm.src) {
        activeBgm.volume = settingsMusicVolume;
        if (typeof inactiveBgm !== "undefined") inactiveBgm.volume = 0;
    }
    // SFX volume
    settingsSfxVolume = s.sfxVolume / 100;

    // Crossfade
    settingsCrossfade = parseInt(s.crossfade) || 1400;

    // Theme — custom accent overrides named palette
    const root = document.documentElement;
    let palette;
    if (s.customAccent) {
        const hex = s.customAccent;
        // Derive dim/glow from the hex with opacity
        const r = parseInt(hex.slice(1,3),16);
        const g = parseInt(hex.slice(3,5),16);
        const b = parseInt(hex.slice(5,7),16);
        palette = {
            accent:      hex,
            accentDim:   `rgba(${r},${g},${b},0.55)`,
            accentGlow:  `rgba(${r},${g},${b},0.25)`
        };
    } else {
        palette = THEME_PALETTES[s.theme] || THEME_PALETTES.red;
    }
    root.style.setProperty("--accent",      palette.accent);
    root.style.setProperty("--accent-dim",  palette.accentDim);
    root.style.setProperty("--accent-glow", palette.accentGlow);

    // Light-accent detection: ensure text on accent backgrounds stays readable
    _applyAccentLightClass(palette.accent);

    // Map style
    applyMapTile(s.mapStyle);

    // Blur — CSS var only; no inline style needed
    root.style.setProperty("--panel-blur", (s.blur || 12) + "px");

    // Overlay darkness
    const od = document.getElementById("overlay");
    if (od) od.style.background = `radial-gradient(circle, rgba(0,0,0,${(s.overlay/100)*0.25}), rgba(0,0,0,${s.overlay/100}))`;

    // Story speed
    settingsStorySpeed = parseFloat(s.storySpeed) || 1.0;

    // Font size
    const fontSize = s.fontSize || 16;
    root.style.setProperty("--ui-font-size", fontSize + "px");

    // Corner radius
    root.style.setProperty("--radius", (s.radius ?? 10) + "px");

    // Sync colour picker
    const cp = document.getElementById("accentColorPicker");
    if (cp) cp.value = palette.accent || "#c0161f";
}

let _activeTileLayerRef = null;