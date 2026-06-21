function ensureMusicReady() {
    // Do not reset musicPaused — if the user muted, respect that across replays.
    if (musicPaused) return;

    if (!activeBgm.src) {
        activeBgm.src = "Music/world.mp3";
        activeBgm.loop = true;
    }

    activeBgm.volume = settingsMusicVolume;

    activeBgm.play().catch(err => {
    });
}

function goToLevel(level) {
    if (!level) return;
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
    _closeStoryPlPicker();
    setMapLock(false);
    document.getElementById("startBtn").style.display = "block";
    showSeasonsBar();
    setUIState("world");
    navStack = [];
    renderContinents();
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

function togglePause() {

    paused = !paused;

    const btn = document.getElementById("pauseBtn");

    if (paused) {
        btn.innerText = "▶ Resume";
        clearTimeout(storyTimeout);
                setNowPlayingPaused(true);
    }
    else {
        btn.innerText = "⏸ Pause";
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
    }
    else {
        musicPaused = false;

        if (!activeBgm.src) {
            activeBgm.src = "Music/world.mp3";
            activeBgm.loop = true;
        }

        activeBgm.volume = 0;
        activeBgm.play().catch(err => {
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

function isMobileViewport() {
    return window.innerWidth <= 760;
}

function loadPanelSize() {
    if (isMobileViewport()) {
        // Let the mobile CSS (bottom sheet, !important) control size/position —
        // clear any desktop inline overrides so they don't fight the CSS.
        infoPanel.style.width = "";
        infoPanel.style.height = "";
        infoPanel.style.left = "";
        infoPanel.style.right = "";
        infoPanel.style.top = "";
        infoPanel.style.bottom = "";

        // Restore the user's expanded/collapsed preference for the sheet
        const expanded = localStorage.getItem("panelExpandedMobile") === "1";
        infoPanel.classList.toggle("panel-expanded", expanded);
        return;
    }

    infoPanel.classList.remove("panel-expanded");

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

// Toggle between the compact and expanded heights of the mobile bottom-sheet
// info panel. No-op on desktop, where the panel is freely resizable instead.
function toggleInfoPanelExpand(e) {
    if (e) e.stopPropagation();
    if (!isMobileViewport()) return;
    const expanded = infoPanel.classList.toggle("panel-expanded");
    localStorage.setItem("panelExpandedMobile", expanded ? "1" : "0");
}

// Re-apply panel sizing when crossing the mobile/desktop breakpoint
// (e.g. rotating a tablet, or resizing a desktop browser window).
let _wasMobileViewport = isMobileViewport();
window.addEventListener("resize", () => {
    const nowMobile = isMobileViewport();
    if (nowMobile !== _wasMobileViewport) {
        _wasMobileViewport = nowMobile;
        loadPanelSize();
    }
});

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

window.onload = () => {
    navStack = [];
    setUIState("world");//This as well
    showSeasonsBar();
    renderContinents();
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