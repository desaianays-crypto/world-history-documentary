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