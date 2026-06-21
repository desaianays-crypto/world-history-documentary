//Functions
function unlockAudio() {
    if (audioUnlocked) return;
    audioUnlocked = true;
    bgm.loop = true;
    bgm.volume = 0;
    bgm.src = "Music/world.mp3";
    bgm.play()
        .then(() => {
        })
        .catch(err => {
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
            crossfadeMusic(activeBgm, inactiveBgm, targetVol, settingsCrossfade);
            [activeBgm, inactiveBgm] = [inactiveBgm, activeBgm];
                        updateNowPlaying(name);
        })
        .catch(err => {
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
    });
}

function setUIState(state) {

    const startBtn = document.getElementById("startBtn");
    const seasons = document.getElementById("seasons");
    const episodePanel = document.getElementById("episodePanel");
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
        hide(progress); // dots replaced by timeline scrubber

        showBlock(infoPanel);
        showBlock(controlBtns);

        if (controlBtns) controlBtns.classList.add("controls-visible");

        document.body.classList.add("story-mode");

        setMapLock(true);

                showTimelineScrubber();
    }

    if (isScene) {
        hide(startBtn);
        hide(randomBtn);
        hide(seasons);
        hide(episodePanel);

        // FIX: scene MUST explicitly show infoPanel
        showBlock(infoPanel);
        showBlock(controlBtns);

        if (controlBtns) controlBtns.classList.add("controls-visible");

        document.body.classList.add("story-mode");

        setMapLock(false);
    }

        if (!isStory && !isScene) {
        hideTimelineScrubber();
    }

        if (!isStory && !isScene) {
        hideNowPlaying();
    }
}

function showSeasonsBar() {
    document.getElementById("seasons").style.display = "flex";
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