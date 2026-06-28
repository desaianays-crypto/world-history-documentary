// ═══════════════════════════════════════════════════════════════════════
// panel-drag.js — shared floating-panel drag/resize engine
// ═══════════════════════════════════════════════════════════════════════
// One implementation of "drag by header, resize from any of 8 handles,
// clamp to viewport, persist geometry, survive a browser-window resize"
// used by every floating panel in WHD: the scene info panel, the owner
// terminal overlay, and the admin panel. A fix or improvement made here
// benefits all three instead of living three times with slightly
// different bugs.
//
// Usage:
//   const ctl = WHDPanelDrag.attach({
//       panel: panelEl,            // element to move/resize (required)
//       dragHandle: headerEl,      // mousedown here starts a move (required)
//       minWidth: 300, minHeight: 250,
//       disabled: () => isMobileViewport(),     // skip entirely (optional)
//       getGeom: () => ({left,top,width,height} | null), // restore (optional)
//       setGeom: (geom) => {...},               // persist (optional)
//       onInteractionEnd: () => {...},          // after a drag/resize (optional)
//   });
//   ctl.applyGeom({left,top,width,height});  // apply geometry programmatically
//   ctl.isInteracting();                     // true during + briefly after a drag/resize
//   ctl.reset();                             // clear inline geometry, fall back to CSS defaults
//
// Resize handles are plain `<div class="resize-handle" data-dir="...">`
// children of `panel` (dir is any of r/l/t/b/tr/tl/br/bl — the same
// convention #infoPanel already used) — see css/layout.css for their
// positioning/cursor rules. Panels that don't already have these in their
// markup should add them.
(function () {
    const MARGIN = 10;

    function attach(opts) {
        const panel = opts.panel;
        const dragHandle = opts.dragHandle;
        if (!panel || !dragHandle) return null;

        const minWidth = opts.minWidth || 300;
        const minHeight = opts.minHeight || 250;
        const getGeom = opts.getGeom || (() => null);
        const setGeom = opts.setGeom || (() => {});
        const onInteractionEnd = opts.onInteractionEnd || (() => {});
        const disabled = opts.disabled || (() => false);

        let mode = null; // null | "drag" | "resize"
        let dir = null;
        let activePointerId = null;
        let startX = 0, startY = 0, origLeft = 0, origTop = 0, origW = 0, origH = 0;
        let raf = null, pendingEvent = null;

        function rect() { return panel.getBoundingClientRect(); }

        // The "interacting" flag stays set for a short grace period after
        // release, not just during the drag itself. This is what fixes the
        // bug where releasing a drag/resize right at the panel's edge fires
        // a click on whatever is now underneath the cursor (often a modal
        // backdrop) and that click gets misread as "click outside to close".
        function beginInteraction() { panel.dataset.whdInteracting = "1"; }
        function endInteraction() { setTimeout(() => { delete panel.dataset.whdInteracting; }, 250); }

        function lockToFixed() {
            panel.style.position = "fixed";
            panel.style.margin = "0";
            panel.style.right = "auto";
            panel.style.bottom = "auto";
        }

        // Text gets highlighted mid-drag in every browser unless selection
        // is explicitly suppressed for the duration — a big part of why
        // dragging can feel "flimsy". Suppressed at the document level
        // (not just on the panel) since a fast drag can momentarily put
        // the pointer over page content outside the panel entirely.
        function suppressSelection(on) {
            document.documentElement.classList.toggle("whd-panel-no-select", on);
        }

        function startInteraction(e, newMode, newDir) {
            if (disabled()) return;
            const r = rect();
            mode = newMode;
            dir = newDir;
            activePointerId = e.pointerId;
            beginInteraction();
            startX = e.clientX; startY = e.clientY;
            origLeft = r.left; origTop = r.top; origW = r.width; origH = r.height;
            lockToFixed();
            if (newMode === "drag") { panel.style.width = origW + "px"; panel.style.height = origH + "px"; }
            panel.classList.add(newMode === "drag" ? "whd-panel-dragging" : "whd-panel-resizing");
            suppressSelection(true);
            // Pointer capture keeps every subsequent move/up event routed to
            // this handle even if the cursor outruns the panel, leaves the
            // window, or crosses an iframe boundary — mouse-event dragging
            // (the old approach) silently drops the drag in exactly those
            // cases, which is most of what made it feel unreliable.
            try { e.target.setPointerCapture(e.pointerId); } catch {}
            document.addEventListener("pointermove", onMove);
            document.addEventListener("pointerup", onUp);
            document.addEventListener("pointercancel", onUp);
            e.preventDefault();
        }

        dragHandle.addEventListener("pointerdown", e => {
            if (e.button !== undefined && e.button !== 0) return; // left button / primary touch only
            if (e.target.closest("button,input,textarea,select,.resize-handle")) return;
            startInteraction(e, "drag", null);
        });

        panel.querySelectorAll(".resize-handle").forEach(handle => {
            handle.addEventListener("pointerdown", e => {
                if (e.button !== undefined && e.button !== 0) return;
                e.stopPropagation();
                startInteraction(e, "resize", handle.dataset.dir);
            });
        });

        function applyMove(e) {
            if (mode === "drag") {
                const w = parseFloat(panel.style.width) || panel.offsetWidth;
                const h = parseFloat(panel.style.height) || panel.offsetHeight;
                let left = e.clientX - (startX - origLeft);
                let top  = e.clientY - (startY - origTop);
                left = Math.max(MARGIN, Math.min(left, window.innerWidth - w - MARGIN));
                top  = Math.max(MARGIN, Math.min(top, window.innerHeight - h - MARGIN));
                panel.style.left = left + "px";
                panel.style.top = top + "px";
                panel.style.right = "auto"; panel.style.bottom = "auto";
                return;
            }
            if (mode === "resize") {
                const dx = e.clientX - startX, dy = e.clientY - startY;
                let left = origLeft, top = origTop, width = origW, height = origH;

                if (dir.includes("r")) width = Math.min(origW + dx, window.innerWidth - MARGIN - origLeft);
                if (dir.includes("l")) {
                    const newLeft = origLeft + dx, rightEdge = origLeft + origW;
                    width = rightEdge - newLeft; left = newLeft;
                    if (left < MARGIN) { left = MARGIN; width = rightEdge - MARGIN; }
                }
                if (dir.includes("b")) height = Math.min(origH + dy, window.innerHeight - MARGIN - origTop);
                if (dir.includes("t")) {
                    const newTop = origTop + dy, bottomEdge = origTop + origH;
                    height = bottomEdge - newTop; top = newTop;
                    if (top < MARGIN) { top = MARGIN; height = bottomEdge - MARGIN; }
                }
                // Enforce minimums after directional math so clamping a
                // west/north resize doesn't shift the opposite, fixed edge.
                if (dir.includes("l") && width < minWidth) { const rightEdge = origLeft + origW; width = minWidth; left = rightEdge - minWidth; }
                if (dir.includes("t") && height < minHeight) { const bottomEdge = origTop + origH; height = minHeight; top = bottomEdge - minHeight; }
                width = Math.max(minWidth, width);
                height = Math.max(minHeight, height);

                panel.style.width = width + "px";
                panel.style.height = height + "px";
                panel.style.left = left + "px";
                panel.style.top = top + "px";
                panel.style.right = "auto"; panel.style.bottom = "auto";
            }
        }

        function onMove(e) {
            if (!mode || e.pointerId !== activePointerId) return;
            // Coalesce to one update per animation frame — smoother than
            // applying every raw pointermove (which can fire far faster
            // than the panel can usefully repaint) and avoids the slight
            // stutter that made dragging feel imprecise.
            pendingEvent = e;
            if (raf) return;
            raf = requestAnimationFrame(() => { raf = null; if (pendingEvent) applyMove(pendingEvent); });
        }

        function onUp(e) {
            if (!mode || e.pointerId !== activePointerId) return;
            if (raf) { cancelAnimationFrame(raf); raf = null; }
            if (pendingEvent) { applyMove(pendingEvent); pendingEvent = null; }
            const r = rect();
            setGeom({ left: r.left, top: r.top, width: r.width, height: r.height });
            panel.classList.remove("whd-panel-dragging", "whd-panel-resizing");
            suppressSelection(false);
            document.removeEventListener("pointermove", onMove);
            document.removeEventListener("pointerup", onUp);
            document.removeEventListener("pointercancel", onUp);
            mode = null; dir = null; activePointerId = null;
            endInteraction();
            onInteractionEnd();
        }

        // If the browser window itself is resized while the panel is
        // pinned (position:fixed), keep it from being stranded off-screen
        // or larger than the new viewport — and if the panel has crossed
        // into a disabled state (e.g. the mobile breakpoint), drop the
        // inline geometry entirely instead of leaving it pinned somewhere
        // a mobile layout never intended it to be.
        window.addEventListener("resize", () => {
            if (panel.style.position !== "fixed") return;
            if (disabled()) { resetGeometry(); return; }
            const r = rect();
            const width = Math.min(r.width, window.innerWidth - MARGIN * 2);
            const height = Math.min(r.height, window.innerHeight - MARGIN * 2);
            const left = Math.max(MARGIN, Math.min(r.left, window.innerWidth - width - MARGIN));
            const top = Math.max(MARGIN, Math.min(r.top, window.innerHeight - height - MARGIN));
            panel.style.width = width + "px"; panel.style.height = height + "px";
            panel.style.left = left + "px"; panel.style.top = top + "px";
        });

        function resetGeometry() {
            ["position","margin","left","top","width","height","right","bottom"]
                .forEach(p => { panel.style[p] = ""; });
        }

        return {
            applyGeom(g) {
                if (!g) return;
                lockToFixed();
                if (g.width != null)  panel.style.width = g.width + "px";
                if (g.height != null) panel.style.height = g.height + "px";
                if (g.left != null)   panel.style.left = g.left + "px";
                if (g.top != null)    panel.style.top = g.top + "px";
            },
            isInteracting() { return panel.dataset.whdInteracting === "1"; },
            reset: resetGeometry,
            restoreSaved() {
                if (disabled()) return;
                const g = getGeom();
                if (!g) return;
                const maxW = window.innerWidth - MARGIN * 2;
                const maxH = window.innerHeight - MARGIN * 2;
                const width  = Math.max(minWidth, Math.min(g.width, maxW));
                const height = Math.max(minHeight, Math.min(g.height, maxH));
                const left = Math.max(MARGIN, Math.min(g.left, window.innerWidth - width - MARGIN));
                const top  = Math.max(MARGIN, Math.min(g.top, window.innerHeight - height - MARGIN));
                this.applyGeom({ left, top, width, height });
            },
        };
    }

    window.WHDPanelDrag = { attach };
})();
