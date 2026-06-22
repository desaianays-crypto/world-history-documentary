const map = L.map("map", {
    center: [30, 55],
    zoom: 3,
    minZoom: 2.4,
    maxZoom: 8,
    zoomControl: true,
    maxBoundsViscosity: 1.0
});
map.on("resize", updateBounds);
let _resizeBoundsTimer = null;
window.addEventListener("resize", () => {
    // A window resize can fire many times per second while the user drags
    // the edge — debounce so we only recompute Leaflet's max bounds once
    // things settle, instead of on every intermediate frame.
    clearTimeout(_resizeBoundsTimer);
    _resizeBoundsTimer = setTimeout(updateBounds, 120);
});
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
        if (isMobileViewport()) return;

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
    if (isMobileViewport()) return;

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

(function _initEmpirePane() {
    if (!map.getPane("empirePane")) {
        const pane = map.createPane("empirePane");
        pane.style.zIndex = 250;
        pane.style.pointerEvents = "none";
    }
})();

function _isNearWhite(colorStr) {
    let r, g, b;
    const s = (colorStr || "").trim();
    if (s.startsWith("#")) {
        let hex = s.slice(1);
        if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
        if (hex.length < 6) return false;
        r = parseInt(hex.slice(0, 2), 16);
        g = parseInt(hex.slice(2, 4), 16);
        b = parseInt(hex.slice(4, 6), 16);
    } else {
        const m = s.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
        if (!m) return false;
        r = parseFloat(m[1]); g = parseFloat(m[2]); b = parseFloat(m[3]);
    }
    if ([r, g, b].some(v => Number.isNaN(v))) return false;
    // Perceptual luminance — treat anything very bright as "white-ish"
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.88;
}

async function showEmpireExtent(scene) {
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
    let   accentSolid = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()      || '#c0161f';

    if (_isNearWhite(accentSolid)) {
        let mapIsLight = true;
        try { mapIsLight = (loadSettings().mapStyle || "light") === "light"; } catch(e) {}
        if (mapIsLight) accentSolid = "#1c1c1f"; // dark fallback, reads clearly on the light basemap
    }

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