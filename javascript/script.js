//Other stuff
const map = L.map("map", {
    center: [30, 55],
    zoom: 3,
    minZoom: 2.4,
    maxZoom: 8,
    zoomControl: true,
    maxBoundsViscosity: 1.0
});
map.on("resize", updateBounds);
window.addEventListener("resize", updateBounds);
updateBounds();
setTimeout(() => {
    map.invalidateSize();
}, 300);

L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    {
        subdomains: "abcd",
        attribution: "© OpenStreetMap © CARTO",
        opacity: 0.95
    }
).addTo(map);

const bgm = document.getElementById("bgm");

/*
        Template:
        {
        id:"id",
        name:"name of event",
        startYear:xx,
        endYear:xxxx,
        imgKey:"imgkey",
        continent:"continent",
        country:"country",
        season:"season",
        coords:[x,y],
        zoom:5,
        region:"region",
        info:"",
        events:[
        "event1",
        "event2",
        "event3",
        "event4",
        "event5(optional)",
        "event6(optional)"
        ]
        },
        */

//Content
const scenes = [
    ...europeScenes,
    ...asiaScenes,
    ...australiaScenes,
    ...historyBitesScenes,
    ...africaScenes
];

const world = {
    name: "World",
    children: [
        {
            name: "Europe",
            children: [
                {
                    name: "United Kingdom",
                    children: [
                        {
                            name: "Ancient United Kingdom",
                            episodes: []
                        },
                        {
                            name: "Medieval United Kingdom",
                            episodes: []
                        },
                        {
                            name: "Modern United Kingdom",
                            episodes: []
                        }
                    ]
                },
                {
                    name: "Spain",
                    children: [
                        {
                            name: "Ancient Spain",
                            episodes: []
                        },
                        {
                            name: "Medieval Spain",
                            episodes: []
                        },
                        {
                            name: "Modern Spain",
                            episodes: []
                        }
                    ]
                },
                {
                    name: "France",
                    children: [
                        {
                            name: "Ancient France",
                            episodes: []
                        },
                        {
                            name: "Medieval France",
                            episodes: []
                        },
                        {
                            name: "Modern France",
                            episodes: []
                        }
                    ]
                },

                {
                    name: "Germany",
                    children: [
                        {
                            name: "Ancient Germany",
                            episodes: []
                        },
                        {
                            name: "Medieval Germany",
                            episodes: []
                        },
                        {
                            name: "Modern Germany",
                            episodes: []
                        }
                    ]
                },
                {
                    name: "Italy",
                    children: [
                        {
                            name: "Ancient Italy",
                            episodes: []
                        },
                        {
                            name: "Medieval Italy",
                            episodes: []
                        },
                        {
                            name: "Modern Italy",
                            episodes: []
                        }
                    ]
                },
                {
                    name: "Russia",
                    children: [
                        {
                            name: "Ancient Russia",
                            episodes: []
                        },
                        {
                            name: "Medieval Russia",
                            episodes: []
                        },
                        {
                            name: "Modern Russia",
                            episodes: []
                        }
                    ]
                },
                {
                    name: "Austria",
                    children: [
                        {
                            name: "Ancient Austria",
                            episodes: []
                        },
                        {
                            name: "Medieval Austria",
                            episodes: []
                        },
                        {
                            name: "Modern Austria",
                            episodes: []
                        },
                    ]
                },
            ]
        },

        {
            name: "Asia",
            children: [
                {
                    name: "India",
                    children: [
                        {
                            name: "Ancient India",
                            episodes: []
                        },
                        {
                            name: "Medieval India",
                            episodes: []
                        },
                        {
                            name: "Modern India",
                            episodes: []
                        }
                    ]
                },

                {
                    name: "China",
                    children: [
                        {
                            name: "Ancient China",
                            episodes: []
                        },
                        {
                            name: "Medieval China",
                            episodes: []
                        },
                        {
                            name: "Modern China",
                            episodes: []
                        }
                    ]
                },

                {
                    name: "Japan",
                    children: [
                        {
                            name: "Ancient Japan",
                            episodes: []
                        },
                        {
                            name: "Medieval Japan",
                            episodes: []
                        },
                        {
                            name: "Modern Japan",
                            episodes: []
                        },
                    ]
                },

                {
                    name: "Iran",
                    children: [
                        {
                            name: "Ancient Iran",
                            episodes: []
                        },
                        {
                            name: "Medieval Iran",
                            episodes: []
                        },
                        {
                            name: "Modern Iran",
                            episodes: []
                        },
                    ]
                },

            ]
        },

        {
            name: "Africa",
            children: [
                {
                    name: "Ethiopia",
                    children: [
                        {
                            name: "Ancient Ethiopia",
                            episodes: []
                        },
                        {
                            name: "Medieval Ethiopia",
                            episodes: []
                        },
                        {
                            name: "Modern Ethiopia",
                            episodes: []
                        },
                    ]
                },
                {
                    name: "South Africa",
                    children: [
                        {
                            name: "Ancient South Africa",
                            episodes: []
                        },
                        {
                            name: "Medieval South Africa",
                            episodes: []
                        },
                        {
                            name: "Modern South Africa",
                            episodes: []
                        },
                    ]
                },
                {
                    name: "Egypt",
                    children: [
                        {
                            name: "Ancient Egypt",
                            episodes: []
                        },
                        {
                            name: "Medieval Egypt",
                            episodes: []
                        },
                        {
                            name: "Modern Egypt",
                            episodes: []
                        },
                    ]
                },
                {
                    name: "Mali",
                    children: [
                        {
                            name: "Ancient Mali",
                            episodes: []
                        },
                        {
                            name: "Medieval Mali",
                            episodes: []
                        },
                        {
                            name: "Modern Mali",
                            episodes: []
                        },
                    ]
                },
            ]
        },

        {
            name: "Australia",
            children: [
                {
                    name: "Ancient Australia",
                    episodes: []
                },
                {
                    name: "Medieval Australia",
                    episodes: []
                },
                {
                    name: "Modern Australia",
                    episodes: []
                },
            ]
        },

        {
            name: "History Bites",
            children: [
                {
                    name: "$100000 Cheese",
                    children: [
                        {
                            name: "Ancient Greece",
                            episodes: []
                        },
                        {
                            name: "Khmer Empire",
                            episodes: []
                        },
                        {
                            name: "Christianity",
                            episodes: []
                        },
                        {
                            name: "Islam",
                            episodes: []
                        }
                    ]
                },
                {
                    name: "Stale Bread",
                    children: [
                        {
                            name: "Mongol Empire",
                            episodes: []
                        },
                        {
                            name: "Dar-Al-Islam",
                            episodes: []
                        },
                        {
                            name: "Bucket Wars",
                            episodes: []
                        },
                        {
                            name: "Black Death",
                            episodes: []
                        },
                        {
                            name: "Trade Networks",
                            episodes: []
                        }
                    ]
                },
                {
                    name: "Fresh Pizza",
                    children: [
                        {
                            name: "Age of Reason",
                            episodes: []
                        },
                        {
                            name: "Rotten Tomatoes",
                            episodes: []
                        },
                        {
                            name: "US History",
                            episodes: []
                        },
                        {
                            name: "Industrial Revolution",
                            episodes: []
                        },
                    ]
                }
            ]
        }
    ]
};

//Constants+Functions+Others
const MUSIC_VOLUME = 0.3;
const panel = document.getElementById("infoPanel");
const handles = document.querySelectorAll(".resize-handle");
const panel_margin = 10;
const minW = 300;
const minH = 250;
let resizing = false;
let dir = null;
let resizeStartX = 0;
let resizeStartY = 0;
let resizeOriginLeft = 0;
let resizeOriginTop = 0;
let resizeOriginWidth = 0;
let resizeOriginHeight = 0;

handles.forEach(handle => {
    handle.addEventListener("mousedown", (e) => {
        // BUG FIX: Snapshot panel geometry once at drag start.
        // This is the only correct time to read getBoundingClientRect()
        // for a resize operation — before any style mutations happen.
        const rect = panel.getBoundingClientRect();
        resizeStartX = e.clientX;
        resizeStartY = e.clientY;
        resizeOriginLeft = rect.left;
        resizeOriginTop = rect.top;
        resizeOriginWidth = rect.width;
        resizeOriginHeight = rect.height;

        resizing = true;
        dir = handle.dataset.dir;

        panel.style.position = "fixed";
        e.preventDefault();
        e.stopPropagation();
    });
});

document.addEventListener("mousemove", (e) => {
    if (!resizing) return;

    // Delta from the point where the drag started
    const dx = e.clientX - resizeStartX;
    const dy = e.clientY - resizeStartY;

    let left = resizeOriginLeft;
    let top = resizeOriginTop;
    let width = resizeOriginWidth;
    let height = resizeOriginHeight;

    // RIGHT resize — expand/shrink right edge, left stays fixed
    if (dir.includes("r")) {
        width = resizeOriginWidth + dx;
        // Clamp so right edge doesn't exceed viewport
        width = Math.min(width, window.innerWidth - panel_margin - resizeOriginLeft);
    }

    // LEFT resize — move left edge, right edge stays fixed
    if (dir.includes("l")) {
        // BUG FIX: left resize must also be delta-based.
        // Old code re-read rect.right inside mousemove which drifted
        // because rect.right changes as width/left are applied.
        const newLeft = resizeOriginLeft + dx;
        const rightEdge = resizeOriginLeft + resizeOriginWidth; // fixed anchor
        width = rightEdge - newLeft;
        left = newLeft;
        // Clamp left edge to viewport
        if (left < panel_margin) {
            left = panel_margin;
            width = rightEdge - panel_margin;
        }
    }

    // BOTTOM resize — expand/shrink bottom edge, top stays fixed
    if (dir.includes("b")) {
        height = resizeOriginHeight + dy;
        // Clamp so bottom edge doesn't exceed viewport
        height = Math.min(height, window.innerHeight - panel_margin - resizeOriginTop);
    }

    // TOP resize — move top edge, bottom edge stays fixed
    if (dir.includes("t")) {
        const newTop = resizeOriginTop + dy;
        const bottomEdge = resizeOriginTop + resizeOriginHeight; // fixed anchor
        height = bottomEdge - newTop;
        top = newTop;
        // Clamp top edge to viewport
        if (top < panel_margin) {
            top = panel_margin;
            height = bottomEdge - panel_margin;
        }
    }

    // Enforce minimums AFTER all directional calculations so min-clamp
    // on a left/top resize doesn't shift the opposite edge unexpectedly.
    if (dir.includes("l") && width < minW) {
        const rightEdge = resizeOriginLeft + resizeOriginWidth;
        width = minW;
        left = rightEdge - minW;
    }
    if (dir.includes("t") && height < minH) {
        const bottomEdge = resizeOriginTop + resizeOriginHeight;
        height = minH;
        top = bottomEdge - minH;
    }
    width = Math.max(minW, width);
    height = Math.max(minH, height);

    // Apply — write all four properties atomically so the next
    // getBoundingClientRect() call (e.g. in clampPanelToScreen) is consistent.
    panel.style.width = width + "px";
    panel.style.height = height + "px";
    panel.style.left = left + "px";
    panel.style.top = top + "px";
    panel.style.right = "auto";
    panel.style.bottom = "auto";
    panel.style.position = "fixed";
    // NOTE: clampPanelToScreen() is intentionally NOT called here.
    // It reads getBoundingClientRect() which is now stale (we just wrote styles
    // but the browser hasn't reflowed yet), so it would cause jitter/drift.
    // Boundary enforcement is handled inline above instead.
});

document.addEventListener("mouseup", () => {
    if (resizing) {
        // Save final size to localStorage on release
        localStorage.setItem("panelWidth", parseInt(panel.style.width));
        localStorage.setItem("panelHeight", parseInt(panel.style.height));
    }
    resizing = false;
    dir = null;
});

// ─── DRAG ──────────────────────────────────────────────────────────────────
const dragBar = document.getElementById("infoPanelHeader");
let dragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

dragBar.addEventListener("mousedown", (e) => {
    // BUG FIX: renamed offsetX/offsetY → dragOffsetX/dragOffsetY to avoid
    // collision with the MouseEvent.offsetX/offsetY DOM properties which are
    // read-only and could cause silent shadowing bugs in some environments.
    dragging = true;

    const rect = panel.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;

    panel.style.position = "fixed";
    e.preventDefault();
});

document.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    // BUG FIX: Don't call getBoundingClientRect() mid-drag to get width/height.
    // Instead, read the already-committed style values so there's no re-layout.
    const panelW = parseFloat(panel.style.width) || panel.offsetWidth;
    const panelH = parseFloat(panel.style.height) || panel.offsetHeight;

    let left = e.clientX - dragOffsetX;
    let top = e.clientY - dragOffsetY;

    left = Math.max(panel_margin, Math.min(left, window.innerWidth - panelW - panel_margin));
    top = Math.max(panel_margin, Math.min(top, window.innerHeight - panelH - panel_margin));

    panel.style.left = left + "px";
    panel.style.top = top + "px";
    panel.style.right = "auto";
    panel.style.bottom = "auto";
    panel.style.position = "fixed";
});

document.addEventListener("mouseup", () => {
    if (dragging) {
        localStorage.setItem("panelLeft", parseInt(panel.style.left));
        localStorage.setItem("panelTop", parseInt(panel.style.top));
    }
    dragging = false;
});
let index = 0;
let running = false;
let marker;
let empireLayer = null;
// Holds a function that re-starts the most recently played story/playlist
let _storyReplayFn = null;

// Cache fetched GeoJSON year files to avoid re-fetching
const _empireGeoCache = {};

// EMPIRE_GEOJSON_MAP is defined in javascript/empires.js (loaded before this file).
// See that file for the full fact-checked database with comments.
if (typeof EMPIRE_GEOJSON_MAP === "undefined") {
    console.error("empires.js failed to load — empire overlays disabled.");
    window.EMPIRE_GEOJSON_MAP = {};
}
// (old map data removed — see javascript/empires.js)

const EMPIRE_BASE = "https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson/world_";

async function fetchEmpireYear(year) {
    if (_empireGeoCache[year]) return _empireGeoCache[year];
    try {
        const r = await fetch(`${EMPIRE_BASE}${year}.geojson`);
        if (!r.ok) return null;
        const data = await r.json();
        _empireGeoCache[year] = data;
        return data;
    } catch (e) { return null; }
}

// ── Empire overlay pane ───────────────────────────────────────────────────────
// Create a named Leaflet pane that sits above tiles (z:200) but below markers
// (z:600). This prevents the GeoJSON renderer from ever touching the tile pane
// and eliminates the white-tile flash caused by Leaflet's default SVG renderer
// writing into the wrong pane. pointer-events:none ensures the overlay never
// blocks clicks on the map or the info panel.
(function _initEmpirePane() {
    if (!map.getPane("empirePane")) {
        const pane = map.createPane("empirePane");
        pane.style.zIndex = 250;
        pane.style.pointerEvents = "none";
    }
})();

async function showEmpireExtent(scene) {
    // Increment token FIRST, before any async work, so a rapid scene change
    // always cancels the previous in-flight fetch even when the GeoJSON year
    // is cached and the await resolves in the same microtask.
    if (!showEmpireExtent._token) showEmpireExtent._token = 0;
    const token = ++showEmpireExtent._token;

    // Remove the existing layer immediately — before the fetch — so no stale
    // polygon is visible while the new data loads.
    if (empireLayer) {
        try { map.removeLayer(empireLayer); } catch(e) {}
        empireLayer = null;
    }

    const cfg = EMPIRE_GEOJSON_MAP[scene.id];
    if (!cfg) return;

    // Yield to the microtask queue BEFORE fetching so that a synchronous
    // cache hit still lets a newer showEmpireExtent() call increment the
    // token before our guard runs. Without this yield, two back-to-back calls
    // that share the same cached year both see token === _token and both draw.
    await Promise.resolve();
    if (token !== showEmpireExtent._token) return; // superseded before fetch

    const data = await fetchEmpireYear(cfg.year);
    if (!data || token !== showEmpireExtent._token) return; // stale after fetch

    const nameSet = new Set(cfg.names);
    const matched = data.features.filter(f => {
        const name = f.properties && f.properties.NAME;
        return name && nameSet.has(name);
    });
    if (!matched.length) return;
    if (token !== showEmpireExtent._token) return; // superseded while filtering

    const accentDim   = getComputedStyle(document.documentElement).getPropertyValue('--accent-dim').trim() || 'rgba(192,22,31,0.55)';
    const accentSolid = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()      || '#c0161f';

    const geojsonCollection = { type: "FeatureCollection", features: matched };

    empireLayer = L.geoJSON(geojsonCollection, {
        pane: "empirePane",   // render into our isolated pane — no tile interference
        style: {
            color:       accentSolid,
            weight:      1.5,
            opacity:     0.85,
            fillColor:   accentSolid,
            fillOpacity: 0.18,
            dashArray:   '6 4',
            lineJoin:    'round',
            lineCap:     'round',
        },
        interactive: false,
        smoothFactor: 1.5,
    }).addTo(map);

    // Final token check after addTo — a scene change during the synchronous
    // layer construction should also abort.
    if (token !== showEmpireExtent._token) {
        try { map.removeLayer(empireLayer); } catch(e) {}
        empireLayer = null;
        return;
    }

    // Label at centroid — attached to the layer group so it's removed with it
    try {
        const bounds = empireLayer.getBounds();
        if (bounds.isValid()) {
            const center = bounds.getCenter();
            const label = L.divIcon({
                className: '',
                html: `<div style="background:rgba(0,0,0,0.72);color:#f5e6c8;font-size:11px;font-weight:700;padding:3px 8px;border-radius:10px;white-space:nowrap;border:1px solid ${accentDim};letter-spacing:.06em;pointer-events:none;text-shadow:0 1px 3px rgba(0,0,0,.8)">${scene.empireName || scene.name}</div>`,
                iconAnchor: [0, 0]
            });
            empireLayer.addLayer(L.marker(center, { icon: label, interactive: false }));
        }
    } catch(e) {}
}
let paused = false;
let navStack = []
let musicStarted = false;
let currentPath = [];
let currentPlaylist = [];
let inPlaylistMode = false;   // true while a user playlist (not story mode) is running
let _playlistReplayId = null; // id of the playlist that's playing, for replay after finish
let currentLevel = "continent";
let currentContinent = "world";
let audioUnlocked = false;
let currentMusic = "";
let lastMusic = "";
let playlistMusicLock = null; // non-null while a playlist with fixed music is playing
let currentSFX = null;
let currentAudioContext = null;
let maxZoom = 3;
let storyTimeout = null;
let currentSceneToken = 0;
let musicPaused = false;

//Functions
function unlockAudio() {
    if (audioUnlocked) return;
    audioUnlocked = true;
    bgm.loop = true;
    bgm.volume = 0;
    bgm.src = "Music/world.mp3";
    bgm.play()
        .then(() => {
            console.log("🔊 Audio unlocked");
        })
        .catch(err => {
            console.log("Unlock failed:", err);
        });
}
document.addEventListener("pointerdown", unlockAudio, { once: true });

function setNav(levelType, name, node = null) {

    const last = navStack[navStack.length - 1];

    if (
        last &&
        last.type === levelType &&
        last.name === name
    ) {
        return;
    }

    navStack.push({
        type: levelType,
        name: name,
        node: node
    });
}

function normalizeName(name) {
    return name.toLowerCase().replace(/\s+/g, "_");
}

function goBack() {
    console.log(navStack);
    navStack.pop();

    const previous = navStack[navStack.length - 1];

    // 🌍 WORLD
    if (!previous) {
        renderContinents();
        setUIState("world");
        return;
    }

    // 🌍 CONTINENT
    if (previous.type === "continent") {
        renderContinents();
        loadTree(previous.node);
        setUIState("world");
        return;
    }

    // 🏳️ COUNTRY
    if (previous.type === "country") {
        loadTree(previous.node);
        setUIState("country");
        return;
    }

    // 🎬 SEASON (episode list)
    if (previous.type === "season") {
        openSeason(previous.node, true);
        return;
    }
    // 🎥 SCENE (episode detail view)
    if (previous.type === "scene") {
        openSeason(previous.node.seasonNode || previous.node);
        setUIState("episodes");
        return;
    }
}

const bgm2 = document.createElement("audio");
bgm2.loop = true;
bgm2.volume = 0;
document.body.appendChild(bgm2);

let activeBgm = bgm;
let inactiveBgm = bgm2; 

function playMusic(name) {
    const file = "Music/" + name.toLowerCase().replace(/\s+/g, "_") + ".mp3";

    const activeFile = activeBgm.src.split("/").pop();
    const newFile = file.split("/").pop();

    if (activeFile === newFile && !activeBgm.paused && activeBgm.volume > 0) return;

    // ✅ FIRST set source
    inactiveBgm.src = file;
    inactiveBgm.loop = true;
    // always prepare the incoming element; keep it silent if music is paused
    inactiveBgm.volume = 0;

    // Determine the crossfade target volume depending on mute state
    const targetVol = musicPaused ? 0 : settingsMusicVolume;

    // ❗ THEN play (we want the track to be loaded/playing even when muted)
    inactiveBgm.play()
        .then(() => {
            console.log("✅ Crossfading to:", file);
            crossfadeMusic(activeBgm, inactiveBgm, targetVol, settingsCrossfade);
            [activeBgm, inactiveBgm] = [inactiveBgm, activeBgm];
            // Feature 5 — update Now Playing widget
            updateNowPlaying(name);
        })
        .catch(err => {
            console.error("❌ Music failed:", file, err);
        });
}

function crossfadeMusic(outEl, inEl, targetVol, durationMs) {
    const steps = 40;
    const stepMs = durationMs / steps;
    const startIn = parseFloat(inEl.volume) || 0;
    const startOut = parseFloat(outEl.volume) || targetVol;
    let step = 0;

    clearInterval(outEl._fadeInterval);
    clearInterval(inEl._fadeInterval);

    const id = setInterval(() => {
        step++;
        const t = step / steps;
        // Ease in/out with smoothstep: t*t*(3-2t)
        const eased = t * t * (3 - 2 * t);
        inEl.volume = Math.min(1, startIn + eased * (targetVol - startIn));
        outEl.volume = Math.max(0, startOut - eased * startOut);

        if (step >= steps) {
            clearInterval(id);
            outEl.pause();
            outEl.currentTime = 0;
            inEl.volume = targetVol;
        }
    }, stepMs);

    inEl._fadeInterval = id;
    outEl._fadeInterval = id;
}

function playSFX(soundName, volume = 1.0) {

    if (currentSFX) {
        currentSFX.pause();
        currentSFX.currentTime = 0;
        currentSFX = null;
    }

    // Apply both the per-call volume and the global SFX volume setting
    const effectiveVolume = Math.min(1, volume * settingsSfxVolume);

    currentSFX = new Audio("Music/sfx/" + soundName + ".mp3");
    currentSFX.volume = effectiveVolume;

    currentSFX.play().catch(err => {
        console.log("SFX blocked:", err);
    });
}

function setUIState(state) {

    const startBtn = document.getElementById("startBtn");
    const seasons = document.getElementById("seasons");
    const episodePanel = document.getElementById("episodePanel");
    const sourcesBtn = null; // sourcesBtn removed, sources is now a settings tab
    const randomBtn = document.getElementById("randomBtn");
    const controlBtns = document.getElementById("controlButtons");
    const progress = document.getElementById("sceneProgress");
    const infoPanel = document.getElementById("infoPanel");
    

    // reset shared UI state
    document.body.classList.remove("story-mode");

    if (controlBtns) controlBtns.classList.remove("controls-visible");
    if (progress) progress.classList.remove("progress-visible");

    setMapLock(false);

    const isWorld = state === "world";
    const isCountry = state === "country";
    const isEpisodes = state === "episodes";
    const isStory = state === "story";
    const isScene = state === "scene";
    const isSources = state === "sources";

    function hide(el) {
        if (el) el.style.display = "none";
    }

    function showBlock(el) {
        if (el) el.style.display = "flex";
    }

    if (isWorld) {
        showBlock(startBtn);
        showBlock(randomBtn);
        showBlock(seasons);
        showBlock(sourcesBtn);

        hide(episodePanel);
        hide(infoPanel);
        hide(controlBtns);
        hide(progress);
    }

    if (isCountry) {
        showBlock(startBtn);
        showBlock(randomBtn);
        showBlock(seasons);

        hide(episodePanel);
        hide(infoPanel);
        hide(controlBtns);
        hide(progress);
    }

    if (isEpisodes) {
        showBlock(startBtn);
        showBlock(randomBtn);
        showBlock(seasons);

        hide(episodePanel);

        hide(infoPanel);

        hide(controlBtns);
        hide(progress);
    }

    if (isStory) {
        hide(startBtn);
        hide(randomBtn);
        hide(seasons);
        hide(episodePanel);
        hide(sourcesBtn);
        hide(progress); // dots replaced by timeline scrubber

        showBlock(infoPanel);
        showBlock(controlBtns);

        if (controlBtns) controlBtns.classList.add("controls-visible");

        document.body.classList.add("story-mode");

        setMapLock(true);

        // Feature 2 — show timeline scrubber
        showTimelineScrubber();
    }

    if (isScene) {
        hide(startBtn);
        hide(randomBtn);
        hide(seasons);
        hide(episodePanel);
        hide(sourcesBtn);

        // FIX: scene MUST explicitly show infoPanel
        showBlock(infoPanel);
        showBlock(controlBtns);

        if (controlBtns) controlBtns.classList.add("controls-visible");

        document.body.classList.add("story-mode");

        setMapLock(false);
    }

    if (isSources) {
        hide(startBtn);
        hide(randomBtn);
        hide(seasons);
        hide(episodePanel);
        hide(controlBtns);
        hide(sourcesBtn);

        showBlock(infoPanel);

        document.body.classList.remove("story-mode");
    }

    // Feature 2 — hide timeline when not in story/scene
    if (!isStory && !isScene) {
        hideTimelineScrubber();
    }

    // Feature 5 — hide Now Playing when not in story
    if (!isStory && !isScene) {
        hideNowPlaying();
    }
}

function showSeasonsBar() {
    document.getElementById("seasons").style.display = "flex";
}

function loadEpisodes() {
    const box = document.getElementById("episodePanel");
    box.innerHTML = "";

    scenes.forEach((s, i) => {
        const c = document.createElement("div");
        c.className = "card";
        c.innerHTML = s.name;

        c.onclick = () => {
            index = i;
            showScene(s);
            highlight(i);
        };

        box.appendChild(c);
    });
}

function getScenesForSeason(seasonName) {
    const key = normalizeName(seasonName);
    return scenes.filter(s => normalizeName(s.season) === key);
}

function highlight(i) {
    document.querySelectorAll(".card").forEach((c, idx) => {
        c.classList.toggle("active", idx === i);
    });
}

function stopSFX() {
    if (currentSFX) {
        currentSFX.pause();
        currentSFX.currentTime = 0;
        currentSFX = null;  // clear reference so unmute doesn't replay it
    }
}

function setContinent(countryName) {

    const map = {
        // Asia
        "India": "asia",
        "China": "asia",
        "Japan": "asia",
        "Iran": "asia",
        // Europe
        "France": "europe",
        "Germany": "europe",
        "Italy": "europe",
        "United Kingdom": "europe",
        "UK": "europe",
        "Russia": "europe",
        "Austria": "europe",
        "Hungary": "europe",
        "Poland": "europe",
        "Spain": "europe",
        // Africa
        "Mali": "africa",
        "Ethiopia": "africa",
        "Egypt": "africa",
        "South Africa": "africa",
        "Chad": "africa",
        // Australia
        "Australia": "australia",
        // History Bites
        "Stale Bread": "history_bites",
        "$100000 Cheese": "history_bites",
        "Fresh Pizza": "history_bites",
    };

    currentContinent = map[countryName] || "world";
}

function detectLevel() {

    const current = navStack[navStack.length - 1];

    if (!current) return "world";

    if (world.children.some(c => c.name === current.name)) {
        return "continent";
    }

    if (current.node && current.node.children) {
        return "country";
    }

    return "season";
}

function startStory(fromButton = false) {
    ensureMusicReady();

    running = true;
    paused = false;

    currentPlaylist = getSmartPlaylist();

    if (currentPlaylist.length === 0) {
        showToast("No scenes found for current selection.");
        return;
    }

    index = 0;

    navStack = [...navStack];
    currentLevel = detectLevel();

    setUIState("story");

    loopStory();
}

function goRandomScene() {
    ensureMusicReady();

    running = false;
    paused = false;

    setMapLock(false);

    const pool = getSmartPlaylist();

    if (pool.length === 0) {
        showToast("No scenes available here!");
        return;
    }

    const randomScene = pool[Math.floor(Math.random() * pool.length)];

    console.log("🎲 Random scene:", randomScene.name);

    showScene(randomScene);
    setUIState("scene");
}

// Returns the track name that updateMusicForScene would choose for a given scene,
// without actually changing anything. Used for previewing Auto music in the UI.
function getMusicForScene(s, level) {
    level = level || "country";
    let name = "";
    if (level === "world") {
        name = "world";
    } else if (level === "continent") {
        name = s.continent || "world";
    } else if (
        s.country === "Stale Bread" ||
        s.country === "$100000 Cheese" ||
        s.country === "Fresh Pizza"
    ) {
        name = "history_bites";
    } else {
        name = s.country || "world";
    }
    return name.toLowerCase().replace(/\s+/g, "_");
}

// Returns a human-readable label for a music track value, including Auto preview.
function getMusicLabel(trackValue, previewScene) {
    if (trackValue !== null && trackValue !== undefined) {
        const t = AVAILABLE_MUSIC_TRACKS.find(t => t.value === trackValue);
        return t ? t.label : trackValue;
    }
    // Auto — show what the first scene would play
    if (previewScene) {
        const inferred = getMusicForScene(previewScene);
        const t = AVAILABLE_MUSIC_TRACKS.find(t => t.value === inferred);
        const name = t ? t.label : inferred.replace(/_/g, " ");
        return `Auto \u2014 ${name}`;
    }
    return "Auto (scene default)";
}

function updateMusicForScene(s) {

    // If a playlist has locked a specific track, never override it here.
    if (playlistMusicLock) return;

    let musicName = "";

    if (currentLevel === "world") {

        musicName = "world";
    }

    else if (currentLevel === "continent") {

        musicName = s.continent;
    }

    else if (
        s.country === "Stale Bread" ||
        s.country === "$100000 Cheese" ||
        s.country === "Fresh Pizza"
    ) {

        musicName = "history_bites";
    }

    else {

        musicName = s.country;
    }

    musicName = musicName
        .toLowerCase()
        .replace(/\s+/g, "_");

    // Keep the playlist music button label in sync with the live auto track.
    // Only update when the playlist panel is open and set to Auto (null).
    const pl = getActivePlaylist ? getActivePlaylist() : null;
    if (pl && pl.music === null) {
        const labelEl = document.getElementById("playlistMusicLabel");
        if (labelEl) {
            const t = AVAILABLE_MUSIC_TRACKS.find(t => t.value === musicName);
            const humanName = t ? t.label : musicName.replace(/_/g, " ");
            labelEl.innerText = `Auto \u2014 ${humanName}`;
        }
    }

    // Use activeBgm (not the static bgm element) so the paused check is
    // accurate after crossfades have swapped the active audio element.
    if (lastMusic === musicName && !activeBgm.paused) {
        return;
    }

    lastMusic = musicName;

    console.log("🎵 Playing:", musicName);

    playMusic(musicName);
}

function showFinishedScreen(storyTitle, replayFn) {
    // Store replay callback for the Play Again button
    _storyReplayFn = replayFn || null;

    // BUG FIX: setUIState was never called here, leaving controlButtons
    // (Pause, Mute, Bookmark) visible with running=false — inconsistent state.
    // We now hide those controls explicitly before showing the overlay.
    const controlBtns = document.getElementById("controlButtons");
    const progress    = document.getElementById("sceneProgress");
    const panel       = document.getElementById("infoPanel");
    if (controlBtns) { controlBtns.classList.remove("controls-visible"); controlBtns.style.display = "none"; }
    if (progress)    { progress.classList.remove("progress-visible"); }
    if (panel)       panel.style.display = "none";

    // Hide timeline scrubber and Now Playing while overlay is shown
    hideTimelineScrubber();
    hideNowPlaying();

    // Remove map marker + empire layer
    if (marker)      { try { map.removeLayer(marker); } catch(e) {} marker = null; }
    if (empireLayer) { try { map.removeLayer(empireLayer); } catch(e) {} empireLayer = null; }

    // Populate story name subtitle if provided
    const subtitle = document.getElementById("storyFinishedSubtitle");
    if (subtitle) {
        if (storyTitle) {
            subtitle.innerText = storyTitle;
            subtitle.style.display = "block";
        } else {
            subtitle.style.display = "none";
        }
    }

    // Show/hide Play Again button based on whether we have a replay function
    const playAgainBtn = document.getElementById("storyFinishedPlayAgainBtn");
    if (playAgainBtn) playAgainBtn.style.display = replayFn ? "inline-block" : "none";

    // Fade screen transition, then show fullscreen overlay
    const fade = document.getElementById("fadeScreen");
    fade.style.display = "block";
    // Force reflow so the transition fires correctly
    void fade.offsetHeight;
    fade.style.opacity = "1";
    setTimeout(() => {
        fade.style.opacity = "0";
    }, 100);
    setTimeout(() => {
        fade.style.display = "none";
        // Show fullscreen finished overlay
        const overlay = document.getElementById("storyFinishedOverlay");
        if (overlay) {
            // Reset animation by removing + re-adding the class
            overlay.classList.remove("visible");
            void overlay.offsetHeight; // reflow
            overlay.classList.add("visible");
        }
    }, 900);
}

// Called by the Play Again button on the finished overlay
function playAgainFromFinished() {
    const overlay = document.getElementById("storyFinishedOverlay");
    if (overlay) overlay.classList.remove("visible");

    // Clear any stale story timeout so it can't interfere with the new run
    clearTimeout(storyTimeout);
    storyTimeout = null;

    // Restore panel visibility that showFinishedScreen hid with inline styles
    const controlBtns = document.getElementById("controlButtons");
    const panel       = document.getElementById("infoPanel");
    if (controlBtns) controlBtns.style.display = "";
    if (panel)       panel.style.display = "";

    if (_storyReplayFn) {
        const fn = _storyReplayFn;
        _storyReplayFn = null; // clear before calling so double-press is safe
        fn();
    }
}

// Called by the Return to Map button on the finished overlay
function exitStoryFromFinished() {
    const overlay = document.getElementById("storyFinishedOverlay");
    if (overlay) overlay.classList.remove("visible");
    exitStory();
}

function loopStory() {
    if (!running || paused) return;
    if (index >= currentPlaylist.length) {
        running = false;
        playlistMusicLock = null;
        // Derive the story name from the current nav context
        const navTop = navStack[navStack.length - 1];
        const storyTitle = navTop ? navTop.name : null;
        const savedNavStack = [...navStack];
        showFinishedScreen(storyTitle, function() {
            navStack = savedNavStack;
            startStory();
        });
        return;
    }

    const scene = currentPlaylist[index];
    index++;
    showScene(scene);

    const words = (scene.info || "").split(" ").length;
    const time = Math.max(8000, words * 150) / settingsStorySpeed;
    clearTimeout(storyTimeout);
    storyTimeout = setTimeout(() => {
        if (running && !paused) {
            loopStory();
        }
    }, time);
}

// Module-level playlist loop — used when playing a user playlist.
// Extracted from inside playActivePlaylist so all other callers (dots,
// keyboard shortcuts, timeline) can reference it without closure issues.
function loopPlaylistStory() {
    if (!running || paused) return;
    if (index >= currentPlaylist.length) {
        running = false;
        inPlaylistMode = false;
        playlistMusicLock = null;
        const replayId = _playlistReplayId;
        const plEntry = activePlaylists ? activePlaylists.find(p => p.id === replayId) : null;
        const plName = plEntry ? plEntry.name : "Playlist";
        showFinishedScreen("🎬 " + plName, function() {
            activePlaylistId = replayId;
            playActivePlaylist();
        });
        return;
    }
    const scene = currentPlaylist[index];
    index++;
    showScene(scene);
    const words = (scene.info || "").split(" ").length;
    const time = Math.max(8000, words * 150) / settingsStorySpeed;
    clearTimeout(storyTimeout);
    storyTimeout = setTimeout(() => {
        if (running && !paused) loopPlaylistStory();
    }, time);
}

// Helper — always call the right loop based on current mode.
function _activeLoop() {
    if (inPlaylistMode) loopPlaylistStory();
    else loopStory();
}

function showScene(s) {
    const sceneToken = ++currentSceneToken;
    const current = navStack[navStack.length - 1];

    // Only update currentLevel from navStack when NOT in a running story.
    // When a story is running, startStory() has already set currentLevel
    // correctly (e.g. "world") via detectLevel(), and we must not clobber it.
    if (!running) {
        if (!current) {
            // No nav context (e.g. playing a playlist from the modal).
            // Default to "country" so Auto music picks the scene's own track,
            // not the generic world track.
            currentLevel = "country";
        } else {
            currentLevel = current.type;
        }
    }
    updateMusicForScene(s);
    setContinent(s.country);
    setUIState(running ? "story" : "scene");

    const fade = document.getElementById("fadeScreen");
    // FIX: was setting opacity="1" twice and display="block" after the first
    // opacity set (which means the transition had already started before display
    // was even applied — the fade-in was invisible on first call).
    // Correct order: display → opacity in the same frame.
    fade.style.display = "block";
    fade.style.opacity = "1";

    const img = document.getElementById("infoImage");

    if (s.imgKey) {
        img.onerror = function () {
            this.src = "images/default.png";
        };
        img.src = "images/" + s.imgKey + ".jpg";
        img.style.display = "block";
    }
    else {
        img.style.display = "none";
    }

    setTimeout(() => {
        fade.style.opacity = "0";
    }, 300);

    setTimeout(() => {
        fade.style.display = "none";
    }, 1100);

    const horn = document.getElementById("horn");
    horn.pause();
    horn.currentTime = 0;

    if (s.id === "maratha_c" || s.id === "maratha_p") {
        playSFX("maratha_horn", 1.0);
    }
    else {
        stopSFX();
    }

    setTimeout(() => {
        if (sceneToken !== currentSceneToken) {
            return;
        }

        map.flyTo(s.coords, s.zoom, { duration: 2.5 });

        if (marker) {
            map.removeLayer(marker);
        }

        marker = L.marker(s.coords).addTo(map);

        // Show empire extent polygon if defined
        showEmpireExtent(s);

        // Strip revealed from all animated elements so the transition re-fires
        const titleEl  = document.getElementById("infoTitle");
        const regionEl = document.getElementById("infoRegion");
        const textEl   = document.getElementById("infoText");
        const listEl   = document.getElementById("infoEvents");
        const badgeEl  = document.getElementById("infoYearBadge");

        [titleEl, regionEl, textEl, listEl, badgeEl].forEach(el => {
            if (el) el.classList.remove("revealed");
        });

        titleEl.innerText  = s.name;
        regionEl.innerText = s.region;

        window.currentSceneId = s.id;

        textEl.innerText = s.info;

        listEl.innerHTML = "";
        s.events.forEach(e => {
            const li = document.createElement("li");
            li.innerText = e;
            listEl.appendChild(li);
        });

        // Update year badge if present
        if (badgeEl) {
            const yearText = (s.startYear !== undefined)
                ? (s.startYear < 0 ? `${Math.abs(s.startYear)} BCE` : `${s.startYear} CE`)
                : "";
            badgeEl.innerText = yearText;
        }

        // Force reflow so removing 'revealed' has taken effect, then animate in
        void titleEl.offsetHeight;
        [titleEl, regionEl, textEl, listEl, badgeEl].forEach(el => {
            if (el) el.classList.add("revealed");
        });

        document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));

        // Feature 1: Update progress dots
        if (running) updateSceneProgress();

        // Feature 2: Update timeline scrubber
        updateTimeline(s);

    }, 400);
}

function formatName(name) {
    return name.replace(/_/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase());
}

function showToast(message) {
    let toast = document.getElementById("toastMsg");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toastMsg";
        toast.style.cssText = `
            position: fixed;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.8);
            color: #fff;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 99999;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(toast);
    }
    toast.innerText = message;
    toast.style.opacity = "1";
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => {
        toast.style.opacity = "0";
    }, 2500);
}

// ═══════════════════════════════════════════════════════════════════════════
// FEATURE 1 — Scene Progress Bar with chapter label
// ═══════════════════════════════════════════════════════════════════════════

function updateSceneProgress() {
    const dotsEl  = document.getElementById("sceneProgressDots");
    const labelEl = document.getElementById("sceneProgressLabel");
    if (!dotsEl || !labelEl) return;

    const total   = currentPlaylist.length;
    const current = Math.min(index, total); // index is already incremented after showScene

    // Label: "Chapter Name · 3 / 12"
    const navTop = navStack[navStack.length - 1];
    const chapterName = navTop ? navTop.name : (currentPlaylist[0] ? currentPlaylist[0].country : "");
    labelEl.textContent = chapterName
        ? `${chapterName}  ·  ${current} / ${total}`
        : `${current} / ${total}`;

    // Dots — cap at 40 to avoid overflow
    const MAX_DOTS = 40;
    if (total > MAX_DOTS) {
        // Show a proportional fill bar text instead of dots
        dotsEl.innerHTML = "";
        return;
    }

    dotsEl.innerHTML = "";
    for (let i = 0; i < total; i++) {
        const dot = document.createElement("div");
        dot.className = "progress-dot" +
            (i === current - 1 ? " dot-active" : i < current - 1 ? " dot-done" : "");

        // Clicking a dot jumps to that scene
        const jumpIndex = i;
        dot.title = currentPlaylist[i] ? currentPlaylist[i].name : "";
        dot.addEventListener("click", () => {
            if (!running) return;
            index = jumpIndex;
            clearTimeout(storyTimeout);
            const scene = currentPlaylist[index];
            index++;
            showScene(scene);
            const words = (scene.info || "").split(" ").length;
            const time = Math.max(8000, words * 150) / settingsStorySpeed;
            storyTimeout = setTimeout(() => { if (running && !paused) _activeLoop(); }, time);
        });
        dotsEl.appendChild(dot);
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// FEATURE 2 — Timeline scrubber
// ═══════════════════════════════════════════════════════════════════════════

function showTimelineScrubber() {
    const el = document.getElementById("timelineScrubber");
    if (el) el.classList.add("scrubber-visible");
}
function hideTimelineScrubber() {
    const el = document.getElementById("timelineScrubber");
    if (el) el.classList.remove("scrubber-visible");
}

function updateTimeline(scene) {
    if (!scene || !currentPlaylist.length) return;
    const scrubber = document.getElementById("timelineScrubber");
    if (!scrubber || !scrubber.classList.contains("scrubber-visible")) return;

    const fmt = y => y < 0 ? `${Math.abs(y)} BCE` : `${y} CE`;

    const total   = currentPlaylist.length;
    const current = Math.max(0, index - 1); // index already incremented after showScene
    const pct     = total <= 1 ? 0 : (current / (total - 1)) * 100;

    document.getElementById("timelineFill").style.width = pct + "%";
    document.getElementById("timelineThumb").style.left = pct + "%";

    const curEl = document.getElementById("timelineYearCurrent");
    // Clamp so the label doesn't clip at the edges
    const clampedPct = Math.max(4, Math.min(96, pct));
    if (curEl) curEl.style.left = clampedPct + "%";

    if (inPlaylistMode) {
        // Playlist: position by scene index (not year — playlists aren't chronological)
        document.getElementById("timelineYearStart").textContent   = "1";
        document.getElementById("timelineYearEnd").textContent     = String(total);
        if (curEl) curEl.textContent = String(current + 1);
    } else {
        // Story mode: thumb tracks scene index (smooth, unaffected by uneven year gaps).
        // Year labels still show actual historical dates; current-year label follows thumb.
        const years   = currentPlaylist.map(s => s.startYear).filter(y => y !== undefined);
        const minYear = years.length ? Math.min(...years) : null;
        const maxYear = years.length ? Math.max(...years) : null;
        const curYear = scene.startYear;

        document.getElementById("timelineYearStart").textContent   = minYear !== null ? fmt(minYear) : "";
        document.getElementById("timelineYearEnd").textContent     = maxYear !== null ? fmt(maxYear) : "";
        if (curEl) curEl.textContent = curYear !== undefined ? fmt(curYear) : "";
    }
}

// FEATURE 2 — Timeline scrubber (drag, touch, click)
// ═══════════════════════════════════════════════════════════════════════════
(function _initTimeline() {
    document.addEventListener("DOMContentLoaded", () => {
        const track = document.getElementById("timelineTrack");
        const thumb = document.getElementById("timelineThumb");
        if (!track || !thumb) return;

        // Shared seek logic — pct is 0–1 position along the track.
        function seekToPct(pct) {
            if (!running || !currentPlaylist.length) return;
            pct = Math.max(0, Math.min(1, pct));

            let targetIndex;
            if (inPlaylistMode) {
                // Playlists are not necessarily chronological — seek by position.
                targetIndex = Math.round(pct * (currentPlaylist.length - 1));
            } else {
                // Story mode — seek by index (matches index-based display).
                targetIndex = Math.round(pct * (currentPlaylist.length - 1));
            }

            index = targetIndex;
            clearTimeout(storyTimeout);
            const scene = currentPlaylist[index];
            index++;
            showScene(scene);
            const words = (scene.info || "").split(" ").length;
            const time = Math.max(8000, words * 150) / settingsStorySpeed;
            storyTimeout = setTimeout(() => { if (running && !paused) _activeLoop(); }, time);
        }

        function pctFromEvent(clientX) {
            const rect = track.getBoundingClientRect();
            return (clientX - rect.left) / rect.width;
        }

        // ── Mouse drag ──────────────────────────────────────────────────
        let isDragging = false;

        thumb.addEventListener("mousedown", e => {
            if (!running) return;
            isDragging = true;
            thumb.classList.add("dragging");
            track.classList.add("dragging");
            e.preventDefault();
        });

        document.addEventListener("mousemove", e => {
            if (!isDragging) return;
            const pct = pctFromEvent(e.clientX);
            // Update visual position immediately without seeking (less jarring)
            const fill = document.getElementById("timelineFill");
            const clampedPct = Math.max(0, Math.min(1, pct)) * 100;
            if (fill) fill.style.width = clampedPct + "%";
            thumb.style.left = clampedPct + "%";
            // Move current-year label under the thumb and preview destination year/index
            const curEl = document.getElementById("timelineYearCurrent");
            if (curEl && currentPlaylist.length > 0) {
                curEl.style.left = Math.max(4, Math.min(96, clampedPct)) + "%";
                const previewIdx = Math.round((clampedPct / 100) * (currentPlaylist.length - 1));
                const previewScene = currentPlaylist[previewIdx];
                if (inPlaylistMode) {
                    curEl.textContent = String(previewIdx + 1);
                } else if (previewScene && previewScene.startYear !== undefined) {
                    const y = previewScene.startYear;
                    curEl.textContent = y < 0 ? `${Math.abs(y)} BCE` : `${y} CE`;
                }
            }
        });

        document.addEventListener("mouseup", e => {
            if (!isDragging) return;
            isDragging = false;
            thumb.classList.remove("dragging");
            track.classList.remove("dragging");
            seekToPct(pctFromEvent(e.clientX));
        });

        // ── Touch drag ──────────────────────────────────────────────────
        thumb.addEventListener("touchstart", e => {
            if (!running) return;
            isDragging = true;
            thumb.classList.add("dragging");
            track.classList.add("dragging");
            e.preventDefault();
        }, { passive: false });

        document.addEventListener("touchmove", e => {
            if (!isDragging) return;
            const touch = e.touches[0];
            const pct = pctFromEvent(touch.clientX);
            const fill = document.getElementById("timelineFill");
            const clampedPct = Math.max(0, Math.min(1, pct)) * 100;
            if (fill) fill.style.width = clampedPct + "%";
            thumb.style.left = clampedPct + "%";
            // Move current-year label under the thumb and preview destination year/index
            const curEl = document.getElementById("timelineYearCurrent");
            if (curEl && currentPlaylist.length > 0) {
                curEl.style.left = Math.max(4, Math.min(96, clampedPct)) + "%";
                const previewIdx = Math.round((clampedPct / 100) * (currentPlaylist.length - 1));
                const previewScene = currentPlaylist[previewIdx];
                if (inPlaylistMode) {
                    curEl.textContent = String(previewIdx + 1);
                } else if (previewScene && previewScene.startYear !== undefined) {
                    const y = previewScene.startYear;
                    curEl.textContent = y < 0 ? `${Math.abs(y)} BCE` : `${y} CE`;
                }
            }
            e.preventDefault();
        }, { passive: false });

        document.addEventListener("touchend", e => {
            if (!isDragging) return;
            isDragging = false;
            thumb.classList.remove("dragging");
            track.classList.remove("dragging");
            const touch = e.changedTouches[0];
            seekToPct(pctFromEvent(touch.clientX));
        });

        // ── Click on track (not thumb) ──────────────────────────────────
        track.addEventListener("click", e => {
            if (!running || isDragging) return;
            seekToPct(pctFromEvent(e.clientX));
        });
    });
})();

// ═══════════════════════════════════════════════════════════════════════════
// FEATURE 4 — Keyboard shortcuts
// ═══════════════════════════════════════════════════════════════════════════

(function _initKeyboardShortcuts() {
    document.addEventListener("keydown", e => {
        // Ignore when typing in an input/textarea
        const tag = document.activeElement ? document.activeElement.tagName : "";
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

        switch (e.key) {
            case " ":
            case "p":
            case "P":
                if (running) { e.preventDefault(); togglePause(); }
                break;
            case "ArrowRight":
            case "n":
            case "N":
                if (running && !paused) {
                    e.preventDefault();
                    // Skip to next scene
                    clearTimeout(storyTimeout);
                    _activeLoop();
                }
                break;
            case "ArrowLeft":
            case "b":
            case "B":
                if (running) {
                    e.preventDefault();
                    // Go back one scene
                    const prev = index - 2;
                    if (prev >= 0) {
                        index = prev;
                        clearTimeout(storyTimeout);
                        _activeLoop();
                    }
                }
                break;
            case "m":
            case "M":
                toggleMute();
                break;
            case "Escape":
                if (document.getElementById("storyFinishedOverlay")
                        .classList.contains("visible")) {
                    exitStoryFromFinished();
                } else if (running) {
                    exitStory();
                }
                break;
            case "s":
            case "S":
                if (running) shareCurrentScene();
                break;
        }
    });
})();

// ═══════════════════════════════════════════════════════════════════════════
// FEATURE 5 — Now Playing widget
// ═══════════════════════════════════════════════════════════════════════════

let _lastNowPlayingTrack = "";

function updateNowPlaying(trackName) {
    const widget = document.getElementById("nowPlayingPanel");
    const label  = document.getElementById("nowPlayingTrack");
    if (!widget || !label) return;

    // Human-readable track name
    const readable = trackName
        ? trackName.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())
        : "—";

    if (readable === _lastNowPlayingTrack) return;
    _lastNowPlayingTrack = readable;

    label.textContent = "♪ " + readable;
    widget.classList.add("np-visible");
}

function hideNowPlaying() {
    const widget = document.getElementById("nowPlayingPanel");
    if (widget) widget.classList.remove("np-visible");
    _lastNowPlayingTrack = "";
}

function setNowPlayingPaused(isPaused) {
    const widget = document.getElementById("nowPlayingPanel");
    if (!widget) return;
    widget.classList.toggle("np-paused", isPaused);
}

// ═══════════════════════════════════════════════════════════════════════════
// FEATURE 7 — Share scene URL via hash
// ═══════════════════════════════════════════════════════════════════════════

function shareCurrentScene() {
    const sceneId = window.currentSceneId;
    if (!sceneId) return;

    const url = location.origin + location.pathname + "#scene=" + encodeURIComponent(sceneId);

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => showShareToast()).catch(() => fallbackCopy(url));
    } else {
        fallbackCopy(url);
    }
}

function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); showShareToast(); } catch(e) {}
    document.body.removeChild(ta);
}

function showShareToast() {
    const toast = document.getElementById("shareToast");
    if (!toast) return;
    toast.classList.add("share-visible");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove("share-visible"), 2500);
}

// ─── Share: playlists ────────────────────────────────────────────────────────
function shareActivePlaylist() {
    const pl = getActivePlaylist();
    if (!pl || pl.sceneIds.length === 0) {
        showToast("Add some scenes to share!");
        return;
    }
    const ids = pl.sceneIds.join(",");
    const name = encodeURIComponent(pl.name || "Shared Playlist");
    const url = location.origin + location.pathname + "#share=playlist&name=" + name + "&ids=" + ids;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => showShareToast()).catch(() => fallbackCopy(url));
    } else {
        fallbackCopy(url);
    }
}

// ─── Share: bookmarks ────────────────────────────────────────────────────────
function shareBookmarks() {
    const bms = loadBookmarks();
    if (bms.length === 0) {
        showToast("No bookmarks to share!");
        return;
    }
    const ids = bms.map(b => b.id).join(",");
    const url = location.origin + location.pathname + "#share=bookmarks&ids=" + ids;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => showShareToast()).catch(() => fallbackCopy(url));
    } else {
        fallbackCopy(url);
    }
}

// ─── Share: single bookmark scene ────────────────────────────────────────────
function shareBookmarkScene(sceneId) {
    const url = location.origin + location.pathname + "#scene=" + encodeURIComponent(sceneId);
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url)
            .then(() => showShareToast())
            .catch(() => fallbackCopy(url));
    } else {
        fallbackCopy(url);
    }
}

// ─── On page load: handle #scene=, #share=playlist, #share=bookmarks ─────────
(function _handleUrlHash() {
    document.addEventListener("DOMContentLoaded", () => {
        const hash = location.hash;
        if (!hash || hash.length < 2) return;

        // Parse key=value pairs from hash (ignoring leading #)
        const raw = hash.slice(1);
        const params = {};
        raw.split("&").forEach(part => {
            const eq = part.indexOf("=");
            if (eq === -1) { params[part] = ""; }
            else { params[part.slice(0, eq)] = decodeURIComponent(part.slice(eq + 1)); }
        });

        // ── #scene=id ────────────────────────────────────────────────
        if (params.scene) {
            const sceneId = params.scene;
            const tryJump = () => {
                if (typeof scenes === "undefined") { setTimeout(tryJump, 100); return; }
                const scene = scenes.find(s => s.id === sceneId);
                if (!scene) return;
                running = false;
                showScene(scene);
                setUIState("scene");
                history.replaceState(null, "", location.pathname);
            };
            setTimeout(tryJump, 300);
            return;
        }

        // ── #share=playlist or #share=bookmarks ───────────────────────
        if (params.share === "playlist" && params.ids) {
            const ids = params.ids.split(",").filter(Boolean);
            const name = params.name || "Shared Playlist";
            const tryImport = async () => {
                if (typeof scenes === "undefined" || typeof activePlaylists === "undefined") {
                    setTimeout(tryImport, 150); return;
                }
                loadPlaylistsFromStorage();
                const validIds = ids.filter(id => scenes.find(s => s.id === id));
                if (validIds.length === 0) {
                    showToast("Shared playlist has no matching scenes.");
                    history.replaceState(null, "", location.pathname);
                    return;
                }
                const ok = await showAppConfirm({
                    icon: "🎬",
                    title: `Import "${name}"?`,
                    msg: `${validIds.length} scene${validIds.length !== 1 ? "s" : ""} will be added to your playlists.`,
                    okLabel: "Import",
                    okDanger: false
                });
                if (ok) {
                    const importName = _uniquePlaylistName(name);
                    const pl = {
                        id: "pl_" + Date.now() + "_" + Math.floor(Math.random() * 10000),
                        name: importName,
                        sceneIds: validIds,
                        music: null
                    };
                    activePlaylists.push(pl);
                    activePlaylistId = pl.id;
                    savePlaylistsToStorage();
                    showToast("Playlist imported!");
                    openPlaylists("playlists");
                } else {
                    showToast("Import cancelled.");
                }
                history.replaceState(null, "", location.pathname);
            };
            setTimeout(tryImport, 300);
            return;
        }

        if (params.share === "bookmarks" && params.ids) {
            const ids = params.ids.split(",").filter(Boolean);
            const tryImport = async () => {
                if (typeof scenes === "undefined") { setTimeout(tryImport, 150); return; }
                const valid = ids
                    .map(id => scenes.find(s => s.id === id))
                    .filter(Boolean);
                if (valid.length === 0) {
                    showToast("No matching scenes found in shared bookmarks.");
                    history.replaceState(null, "", location.pathname);
                    return;
                }
                const ok = await showAppConfirm({
                    icon: "★",
                    title: "Import Bookmarks?",
                    msg: `${valid.length} bookmark${valid.length !== 1 ? "s" : ""} will be added to your collection.`,
                    okLabel: "Import",
                    okDanger: false
                });
                if (ok) {
                    const existing = loadBookmarks();
                    const existingIds = new Set(existing.map(b => b.id));
                    const toAdd = valid.filter(s => !existingIds.has(s.id));
                    const merged = existing.concat(toAdd.map(s => ({
                        id: s.id,
                        name: s.name,
                        imgKey: s.imgKey,
                        startYear: s.startYear,
                        season: s.season,
                        country: s.country,
                        region: s.region
                    })));
                    saveBookmarks(merged);
                    showToast(toAdd.length > 0 ? `Added ${toAdd.length} new bookmark${toAdd.length !== 1 ? "s" : ""}!` : "All scenes already bookmarked.");
                    openPlaylists("bookmarks");
                } else {
                    showToast("Import cancelled.");
                }
                history.replaceState(null, "", location.pathname);
            };
            setTimeout(tryImport, 300);
            return;
        }
    });
})();

function setMapLock(lock) {

    if (lock) {

        map.dragging.disable();
        map.scrollWheelZoom.disable();
        map.doubleClickZoom.disable();
        map.touchZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();

        if (map.zoomControl && map.zoomControl._map) {
            map.removeControl(map.zoomControl);
        }
    }
    else {

        const worldBounds = L.latLngBounds(
            [-85, -180],
            [85, 180]
        );

        map.setMaxBounds(worldBounds);

        map.dragging.enable();
        map.scrollWheelZoom.enable();
        map.doubleClickZoom.enable();
        map.touchZoom.enable();
        map.boxZoom.enable();
        map.keyboard.enable();

        if (map.zoomControl && !map.zoomControl._map) {
            map.addControl(map.zoomControl);
        }
    }
}

function ensureMusicReady() {
    // Do not reset musicPaused — if the user muted, respect that across replays.
    if (musicPaused) return;

    if (!activeBgm.src) {
        activeBgm.src = "Music/world.mp3";
        activeBgm.loop = true;
    }

    activeBgm.volume = settingsMusicVolume;

    activeBgm.play().catch(err => {
        console.log("Autoplay blocked:", err);
    });
}

function renderBreadcrumbs() {
    const box = document.getElementById("breadcrumbs");
    if (box) box.style.display = "none"; // always hide it
}

function goToLevel(level) {
    if (!level) return;
    // FIX: renamed local `index` to `stackIndex` to avoid shadowing the
    // module-level `index` variable used by loopStory(). The shadow was silent
    // but if goToLevel were ever called mid-story, it would corrupt playback.
    const stackIndex = navStack.findIndex(n =>
        n.type === level.type && n.name === level.name
    );
    if (stackIndex !== -1) {
        navStack = navStack.slice(0, stackIndex + 1);
    }

    if (level.type === "continent") {
        renderContinents();
        setUIState("world");
    }

    if (level.type === "country") {
        loadTree(level.node);
        setUIState("country");
    }

    if (level.type === "season") {
        openSeason(level.node);
    }
    showSeasonsBar()
}

function enterSeason(name) {

    navStack.push({
        type: "season",
        name: name
    });

    goToLevel(navStack[navStack.length - 1]);
}

function getSmartPlaylist() {

    const current = navStack[navStack.length - 1];

    if (!current) {
        return [...scenes].sort((a, b) => a.startYear - b.startYear);
    }

    let filtered = [];
    if (current.type === "continent") {
        filtered = scenes.filter(s => s.continent === current.name);
    }

    else if (current.type === "country") {
        filtered = scenes.filter(s => s.country === current.name);
    }

    else if (current.type === "season") {
        filtered = scenes.filter(s => s.season === current.name);
    }

    if (filtered.length === 0) {
        filtered = scenes;
    }

    return [...filtered].sort((a, b) => a.startYear - b.startYear);
}

function loadTree(node) {

    const bar = document.getElementById("seasons");
    bar.innerHTML = "";

    if (navStack.length > 0) {
        const backBtn = document.createElement("div");
        backBtn.className = "season back-btn";
        backBtn.innerText = "⏎";

        backBtn.onclick = goBack;

        bar.appendChild(backBtn);
    }

    // 🌳 Children buttons
    if (node.children) {
        node.children
            .slice()
            .sort((a, b) => (a.startYear ?? 0) - (b.startYear ?? 0))
            .forEach(child => {

                const btn = document.createElement("div");
                btn.className = "season";
                btn.innerText = child.name;

                btn.onclick = () => {

                    if (child.children) {
                        setNav("country", child.name, child);
                    }
                    else {
                        setNav("season", child.name, child);
                    }

                    if (child.episodes !== undefined) {
                        openSeason(child);
                    } else {
                        loadTree(child);
                    }
                };
                bar.appendChild(btn);
            });
    }
}

function exitStory() {

    // Dismiss finished overlay if it's open (safety: covers all exit paths)
    const finishedOverlay = document.getElementById("storyFinishedOverlay");
    if (finishedOverlay) finishedOverlay.classList.remove("visible");

    running = false;
    inPlaylistMode = false;
    _playlistReplayId = null;
    playlistMusicLock = null; // release any playlist music lock
    setMapLock(false);
    document.getElementById("startBtn").style.display = "block";
    showSeasonsBar();
    setUIState("world");
    navStack = [];
    renderContinents();
    renderBreadcrumbs();
    paused = false;

    // Cancel any in-flight empire fetch so it doesn't draw after exit
    if (showEmpireExtent._token !== undefined) showEmpireExtent._token++;
    if (marker) { try { map.removeLayer(marker); } catch(e) {} marker = null; }
    if (empireLayer) { try { map.removeLayer(empireLayer); } catch(e) {} empireLayer = null; }

    map.invalidateSize();
    map.setView([30, 55], 2.5497);
    document.getElementById("pauseBtn").innerText = "⏸ Pause";

    // Feature 2+5 — hide timeline and Now Playing on exit
    hideTimelineScrubber();
    hideNowPlaying();
}

function renderContinents() {

    const bar = document.getElementById("seasons");
    bar.innerHTML = "";

    world.children.forEach(continent => {

        const btn = document.createElement("div");
        btn.className = "season";
        btn.innerText = continent.name;

        btn.onclick = () => {
            console.log("Continent clicked:", continent.name);

            navStack = [];
            setNav("continent", continent.name, continent);

            setUIState("world");
            loadTree(continent);
        };
        bar.appendChild(btn);
    });
    showSeasonsBar()
}

function openSeason(season, skipNav = false) {

    document.getElementById("episodePanel").style.display = "none";

    if (!skipNav) {
        setNav("season", season.name, season);
    }
    currentLevel = "season";
    const bar = document.getElementById("seasons");
    bar.innerHTML = "";

    const backBtn = document.createElement("div");
    backBtn.className = "season back-btn";
    backBtn.innerText = "⏎";

    backBtn.onclick = goBack;

    bar.appendChild(backBtn);

    const filteredScenes = scenes
        .filter(s => normalizeName(s.season) === normalizeName(season.name))
        .sort((a, b) => a.startYear - b.startYear);

    if (filteredScenes.length === 0) {
        const empty = document.createElement("div");
        empty.className = "season";
        empty.innerText = "No episodes found";
        empty.style.opacity = "0.6";
        bar.appendChild(empty);
        return;
    }

    filteredScenes.forEach(scene => {

        const card = document.createElement("div");
        card.className = "episode-card";

        const imgWrap = document.createElement("div");
        imgWrap.className = "episode-card-img-wrap";

        const img = document.createElement("img");
        img.src = "images/" + scene.imgKey + ".jpg";
        img.style.width = "100%";
        img.style.height = "110px";
        img.style.objectFit = "cover";
        img.style.display = "block";

        img.onerror = () => {
            img.src = "images/default.png";
        };

        imgWrap.appendChild(img);

        const title = document.createElement("div");
        title.innerText = scene.name;
        title.style.marginTop = "8px";
        title.style.fontSize = "14px";
        title.style.textAlign = "center";

        card.style.display = "flex";
        card.style.flexDirection = "column"; // 👈 image ABOVE text (correct)
        card.style.alignItems = "center";

        card.appendChild(imgWrap);
        card.appendChild(title);

        card.onclick = () => {
            setNav("scene", scene.name, scene); // ✅ track episode level
            showScene(scene);
        };

        bar.appendChild(card);
    });

    setUIState("episodes");
}

function openSources() {
    const page = document.getElementById("sourcesPage");
    page.style.display = "block";
    setUIState("sources")
    setTimeout(() => page.classList.add("active"), 10);
}

function closeSources() {
    const page = document.getElementById("sourcesPage");
    page.classList.remove("active");
    setTimeout(() => page.style.display = "none", 400);
    setUIState("world")
}

function togglePause() {

    paused = !paused;

    const btn = document.getElementById("pauseBtn");

    if (paused) {
        btn.innerText = "▶ Resume";
        clearTimeout(storyTimeout);
        console.log("⏸ Story paused");
        // Feature 5 — dim Now Playing waveform
        setNowPlayingPaused(true);
    }
    else {
        btn.innerText = "⏸ Pause";
        console.log("▶ Story resumed");
        setNowPlayingPaused(false);
        _activeLoop();
    }
}

function toggleMute() {

    const btn = document.getElementById("muteBtn");

    if (!musicPaused) {
        musicPaused = true;

        clearInterval(activeBgm._fadeInterval);
        clearInterval(inactiveBgm._fadeInterval);

        const fadeOut = setInterval(() => {
            if (activeBgm.volume > 0.04) {
                activeBgm.volume = Math.max(0, activeBgm.volume - 0.04);
            } else {
                activeBgm.volume = 0;
                activeBgm.pause();
                clearInterval(fadeOut);
            }
        }, 30);

        if (inactiveBgm && !inactiveBgm.paused) {
            inactiveBgm.pause();
            inactiveBgm.volume = 0;
        }

        if (currentSFX) currentSFX.pause();
        btn.innerText = "🔔 Unmute";
        console.log("⏸ Music paused");
    }
    else {
        musicPaused = false;

        if (!activeBgm.src) {
            activeBgm.src = "Music/world.mp3";
            activeBgm.loop = true;
        }

        activeBgm.volume = 0;
        activeBgm.play().catch(err => {
            console.log("Playback blocked:", err);
        });
        // Fade back in
        const fadeIn = setInterval(() => {
            if (activeBgm.volume < settingsMusicVolume - 0.02) {
                activeBgm.volume = Math.min(settingsMusicVolume, activeBgm.volume + 0.02);
            } else {
                activeBgm.volume = settingsMusicVolume;
                clearInterval(fadeIn);
            }
        }, 30);
        if (currentSFX) {
            currentSFX.play().catch(() => { });
        }
        btn.innerText = "🔕 Mute";
        console.log("▶ Music resumed");
    }
}

// changeFontSize removed — font size dropdown removed

function updateBounds() {
    const worldBounds = L.latLngBounds(
        [-85, -180],
        [85, 180]
    );

    map.setMaxBounds(worldBounds);
}

function loadPanelSize() {
    const savedWidth = parseInt(localStorage.getItem("panelWidth"));
    const savedHeight = parseInt(localStorage.getItem("panelHeight"));
    const savedLeft = parseInt(localStorage.getItem("panelLeft"));
    const savedTop = parseInt(localStorage.getItem("panelTop"));

    // Safe width limits
    infoPanel.style.width = (savedWidth >= 300 && savedWidth <= 800)
        ? savedWidth + "px"
        : "420px";

    // Safe height limits
    infoPanel.style.height = (savedHeight >= 250 && savedHeight <= 900)
        ? savedHeight + "px"
        : "650px";

    // FIX: restore saved position, or fall back to the CSS default (right:20px)
    // which keeps the panel on-screen on any monitor width.
    // Always clear `right` when `left` is set, and vice-versa, so the browser
    // doesn't use both axes simultaneously.
    if (savedLeft >= 0 && savedLeft <= window.innerWidth - 300) {
        infoPanel.style.left = savedLeft + "px";
        infoPanel.style.right = "auto";
        infoPanel.style.top = (savedTop >= 0 ? savedTop : 60) + "px";
        infoPanel.style.bottom = "auto";
    } else {
        // Default: anchored to right edge — no left override needed,
        // CSS rule `right:20px` handles it.
        infoPanel.style.left = "";
        infoPanel.style.right = "";
        infoPanel.style.top = "";
        infoPanel.style.bottom = "";
    }
}

function clampPanelToScreen() {
    // BUG FIX: always clear right/bottom so the browser doesn't use them
    // as a competing positioning axis when left/top are also set.
    panel.style.right = "auto";
    panel.style.bottom = "auto";

    const rect = panel.getBoundingClientRect();

    let left = rect.left;
    let top = rect.top;
    let width = rect.width;
    let height = rect.height;

    const maxLeft = window.innerWidth - width - panel_margin;
    const maxTop = window.innerHeight - height - panel_margin;

    left = Math.max(panel_margin, Math.min(left, maxLeft));
    top = Math.max(panel_margin, Math.min(top, maxTop));

    // Clamp height so panel doesn't overflow the bottom
    const maxBottomHeight = window.innerHeight - top - panel_margin;
    height = Math.max(minH, Math.min(height, maxBottomHeight));

    panel.style.left = left + "px";
    panel.style.top = top + "px";
    panel.style.width = width + "px";
    panel.style.height = height + "px";
}

//Other
window.onload = () => {
    navStack = [];
    setUIState("world");//This as well
    showSeasonsBar();
    renderContinents();
    renderBreadcrumbs();
    playMusic("world")
    loadPanelSize();
    // Apply and sync all saved settings now that the DOM is fully ready
    const s = loadSettings();
    applySettings(s);
    syncSettingsUI(s);
    initCustomSelects();
};

const seasonsBar = document.getElementById("seasons");
let isDragging = false;
let startX;
let scrollLeft;

//Wolf Code
seasonsBar.addEventListener("mousedown", (e) => {
    isDragging = true;

    seasonsBar.classList.add("dragging");
    startX = e.pageX - seasonsBar.offsetLeft;
    scrollLeft = seasonsBar.scrollLeft;
});
seasonsBar.addEventListener("mouseleave", () => {
    isDragging = false;
    seasonsBar.classList.remove("dragging");
});
seasonsBar.addEventListener("mouseup", () => {
    isDragging = false;
    seasonsBar.classList.remove("dragging");
});
seasonsBar.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    e.preventDefault();
    const x = e.pageX - seasonsBar.offsetLeft;
    const walk = (x - startX) * 1.5;

    seasonsBar.scrollLeft = scrollLeft - walk;
});
seasonsBar.addEventListener("wheel", (e) => {
    const isVerticalScroll =
        Math.abs(e.deltaY) > Math.abs(e.deltaX);
    if (isVerticalScroll) {
        e.preventDefault();
        seasonsBar.scrollLeft += e.deltaY;
    }
}, { passive: false });

const PLAYLIST_STORAGE_KEY = "whd_playlists_v1";

const AVAILABLE_MUSIC_TRACKS = [
    { label: "Auto (scene default)", value: null },
    { label: "World", value: "world" },
    { label: "Europe", value: "europe" },
    { label: "Asia", value: "asia" },
    { label: "Africa", value: "africa" },
    { label: "Australia", value: "australia" },
    { label: "History Bites", value: "history_bites" },
    { label: "France", value: "france" },
    { label: "Germany", value: "germany" },
    { label: "Italy", value: "italy" },
    { label: "United Kingdom", value: "united_kingdom" },
    { label: "Russia", value: "russia" },
    { label: "Spain", value: "spain" },
    { label: "Austria", value: "austria" },
    { label: "India", value: "india" },
    { label: "China", value: "china" },
    { label: "Japan", value: "japan" },
    { label: "Iran", value: "iran" },
    { label: "Egypt", value: "egypt" },
    { label: "Ethiopia", value: "ethiopia" },
    { label: "Mali", value: "mali" },
    { label: "South Africa", value: "south_africa" },
];

let activePlaylists = []; 
let activePlaylistId = null;  
let sceneSearchQuery = "";     

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

//Other
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
    blue:   { accent: "#0d18b6", accentDim: "rgba(13,24, 182,0.55)", accentGlow: "rgba(13,24,182,0.25)" },
    white:  { accent: "#ffffff", accentDim: "rgba(255,255,255,0.45)", accentGlow: "rgba(255,255,255,0.12)" },
    orange: { accent: "#ff7700", accentDim: "rgba(255, 119, 0,0.55)", accentGlow: "rgba(255, 119, 0,0.25)" },
    purple: { accent: "#4300b7", accentDim: "rgba(67,0,183,0.55)", accentGlow: "rgba(67,0,183,0.25)" },
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
function applyMapTile(style) {
    const url = MAP_TILES[style] || MAP_TILES.light;
    if (_activeTileLayerRef) { try { map.removeLayer(_activeTileLayerRef); } catch(e) {} }
    _activeTileLayerRef = L.tileLayer(url, {
        subdomains: "abcd",
        attribution: "© OpenStreetMap © CARTO",
        opacity: 0.95
    }).addTo(map);
    // Re-raise the empire pane so the new tile layer doesn't land on top of it.
    // Leaflet inserts new layers at the end of their pane; re-setting zIndex
    // forces the empirePane back above the tile pane (z:200 vs tile pane z:200).
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

function openSettings() {
    const page = document.getElementById("settingsPage");
    const s = loadSettings();
    syncSettingsUI(s);
    page.style.display = "flex";
    setTimeout(() => page.classList.add("active"), 10);
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
    });
});

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

// ── Slider fill helper ────────────────────────────────────────────────────
// Updates the --fill CSS custom property so the track shows a filled
// portion from the left up to the current thumb position.
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
// onSettingsFontChange removed
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


// ═══════════════════════════════════════════════════════════════
//  BOOKMARKS
// ═══════════════════════════════════════════════════════════════
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
        row.appendChild(starBtn);
        row.appendChild(goBtn);
        container.appendChild(row);
    });
}
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
// ═══════════════════════════════════════════════════════════════
// EXPLORE TAB — playlist picker + add-to-playlist buttons
// ═══════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════
// STORY CONTROLS — Bookmark + Add to Playlist buttons
// ═══════════════════════════════════════════════════════════════

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

function storyAddToPlaylist() {
    if (!_storyCurrentSceneId) { showToast("No scene loaded."); return; }
    loadPlaylistsFromStorage();

    // Toggle picker off if already open
    const existing = document.getElementById("storyPlPicker");
    if (existing) { existing.remove(); return; }

    const picker = document.createElement("div");
    picker.id = "storyPlPicker";
    picker.style.cssText = [
        "position:fixed","top:70px","right:16px","z-index:9999",
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