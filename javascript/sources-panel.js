// ── WHD Sources Panel ────────────────────────────────────────────────────
// Turns WHD from "just a cinematic way to learn history" into a jumping-off
// point for reliable sources and educational video, via one shared "📚 More"
// button used in three places: the live scene panel, Explore tab results,
// and the Bookmarks tab.
//
// Design choices:
//  - Curated sources (window.WHD_SOURCES, see data/sources-data.js) are
//    optional per-scene. If a scene has none yet, the panel still works —
//    it generates "Quick search" links from the scene's own name/country/
//    season (Wikipedia, Google Scholar, a YouTube search pre-loaded with a
//    few reputable history channel names). That's what keeps the *coding*
//    side simple even though the *content* side ("big database") will grow
//    over months: zero scenes are ever in a broken/empty state.
//  - One render path, three call sites. Each call site just needs the
//    scene object (or id) and calls WHDSources.open(scene). No per-tab
//    duplication of the panel markup or fallback-link logic.
(function () {
    "use strict";

    const RECOMMENDED_CHANNELS = [
        "Crash Course", "Historia Civilis", "Kings and Generals",
        "Extra History", "OverSimplified", "The Great War"
    ];

    function escHtml(s) {
        return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
        }[c]));
    }

    function lookupScene(sceneOrId) {
        if (sceneOrId && typeof sceneOrId === "object") return sceneOrId;
        if (typeof scenes !== "undefined" && Array.isArray(scenes)) {
            return scenes.find(s => s.id === sceneOrId) || null;
        }
        return null;
    }

    function buildFallbackLinks(scene) {
        const topic = [scene.name, scene.country].filter(Boolean).join(" ");
        const q = encodeURIComponent(topic);
        const channelHint = encodeURIComponent(RECOMMENDED_CHANNELS.slice(0, 3).join(" OR "));
        return [
            {
                type: "primary", tier: "medium", auto: true,
                title: `Primary-source search: "${scene.name}"`,
                publisher: "Google (site-restricted to archives, government & institutional records)",
                url: `https://www.google.com/search?q=${q}+primary+source+(site:archive.org+OR+site:loc.gov+OR+site:gov+OR+site:.edu)`
            },
            {
                type: "secondary", tier: "medium", auto: true,
                title: `"${scene.name}" on Wikipedia`,
                publisher: "Wikipedia", url: `https://en.wikipedia.org/w/index.php?search=${q}`
            },
            {
                type: "secondary", tier: "medium", auto: true,
                title: `Scholarly articles on "${scene.name}"`,
                publisher: "Google Scholar", url: `https://scholar.google.com/scholar?q=${q}`
            },
            {
                type: "video", tier: "medium", auto: true,
                title: `Video search: "${scene.name}"`,
                publisher: `YouTube (try ${RECOMMENDED_CHANNELS.slice(0, 3).join(", ")})`,
                url: `https://www.youtube.com/results?search_query=${q}+${channelHint}`
            }
        ];
    }

    const TYPE_LABEL = { primary: "Primary source", secondary: "Secondary source", video: "Video / documentary" };
    const TYPE_ICON = { primary: "📜", secondary: "📖", video: "🎬" };

    function renderEntry(e) {
        const tierClass = e.tier === "high" ? "src-tier-high" : "src-tier-medium";
        return `
            <a class="src-entry${e.auto ? " src-entry-auto" : ""}" href="${escHtml(e.url)}" target="_blank" rel="noopener noreferrer">
                <span class="src-entry-icon">${TYPE_ICON[e.type] || "🔗"}</span>
                <span class="src-entry-body">
                    <span class="src-entry-title">${escHtml(e.title)}</span>
                    <span class="src-entry-meta">
                        ${escHtml(e.publisher || "")}
                        ${e.auto
                            ? `<span class="src-tier-badge src-tier-auto" title="Auto-generated search link — not a curated source">Auto</span>`
                            : `<span class="src-tier-badge ${tierClass}">${e.tier === "high" ? "Vetted" : "Suggested"}</span>`}
                    </span>
                </span>
                <span class="src-entry-go">↗</span>
            </a>`;
    }

    function renderSection(label, entries) {
        if (!entries.length) return "";
        return `
            <div class="src-section">
                <div class="src-section-title">${escHtml(label)}</div>
                ${entries.map(renderEntry).join("")}
            </div>`;
    }

    function ensurePanel() {
        let panel = document.getElementById("sourcesPanel");
        if (panel) return panel;
        panel = document.createElement("div");
        panel.id = "sourcesPanel";
        panel.innerHTML = `
            <div id="sourcesPanelOverlay"></div>
            <div id="sourcesPanelBody">
                <div id="sourcesPanelHeader">
                    <div>
                        <div id="sourcesPanelTitle"></div>
                        <div id="sourcesPanelSubtitle"></div>
                    </div>
                    <button id="sourcesPanelClose" title="Close">✕</button>
                </div>
                <div id="sourcesPanelContent"></div>
            </div>`;
        document.body.appendChild(panel);
        panel.querySelector("#sourcesPanelClose").onclick = close;
        panel.querySelector("#sourcesPanelOverlay").onclick = close;
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && panel.classList.contains("open")) close();
        });
        return panel;
    }

    function open(sceneOrId) {
        const scene = lookupScene(sceneOrId);
        if (!scene) return;
        const panel = ensurePanel();

        const curated = (window.WHD_SOURCES && window.WHD_SOURCES[scene.id]) || [];
        const curatedPrimary = curated.filter(e => e.type === "primary");
        const curatedSecondary = curated.filter(e => e.type === "secondary");
        const curatedVideo = curated.filter(e => e.type === "video");

        // Auto-generated links only fill a category that has zero curated
        // entries — once a scene has a real curated primary/secondary/video
        // source, that category's auto-generated link is dropped rather than
        // shown redundantly alongside it. Surviving auto-generated entries are
        // merged directly into their matching category (tagged "Auto-generated")
        // instead of living in a separate "Quick search" section, so a scene
        // that's, say, missing only a video doesn't look half-empty next to a
        // fully curated primary/secondary pairing.
        const allFallback = buildFallbackLinks(scene);
        const fallbackPrimary = curatedPrimary.length ? [] : allFallback.filter(e => e.type === "primary");
        const fallbackSecondary = curatedSecondary.length ? [] : allFallback.filter(e => e.type === "secondary");
        const fallbackVideo = curatedVideo.length ? [] : allFallback.filter(e => e.type === "video");

        const primary = [...curatedPrimary, ...fallbackPrimary];
        const secondary = [...curatedSecondary, ...fallbackSecondary];
        const video = [...curatedVideo, ...fallbackVideo];
        const anyAuto = fallbackPrimary.length || fallbackSecondary.length || fallbackVideo.length;

        const yearStr = scene.startYear != null
            ? (scene.startYear < 0 ? Math.abs(scene.startYear) + " BCE" : scene.startYear + " CE")
            : "";

        panel.querySelector("#sourcesPanelTitle").textContent = `📚 ${scene.name}`;
        panel.querySelector("#sourcesPanelSubtitle").textContent =
            [scene.region || scene.country, yearStr].filter(Boolean).join(" · ");

        panel.querySelector("#sourcesPanelContent").innerHTML =
            renderSection("Primary sources", primary) +
            renderSection("Secondary sources & analysis", secondary) +
            renderSection("Documentaries & video", video) +
            (curated.length === 0
                ? `<div class="src-empty-note">No curated sources yet for this scene — showing auto-generated search links instead.</div>`
                : (anyAuto
                    ? `<div class="src-empty-note">Curated sources are still being added for this scene — auto-generated links (marked below) fill in the rest.</div>`
                    : ""));

        panel.classList.add("open");
    }

    function close() {
        const panel = document.getElementById("sourcesPanel");
        if (panel) panel.classList.remove("open");
    }

    // Builds a ready-to-insert "📚 More" button for any scene — used by
    // explore-tab rows and bookmark cards so they don't each reimplement it.
    function makeMoreBtn(scene, className) {
        const btn = document.createElement("button");
        btn.className = className || "src-more-btn";
        btn.title = "Sources & educational content";
        btn.innerText = "📚";
        btn.onclick = (e) => { e.stopPropagation(); open(scene); };
        return btn;
    }

    window.WHDSources = {
        open,
        close,
        openCurrent: () => open(window.currentSceneId),
        makeMoreBtn
    };
})();
