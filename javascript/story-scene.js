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
    _closeStoryPlPicker();
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