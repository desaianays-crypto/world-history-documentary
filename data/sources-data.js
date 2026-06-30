// ── WHD Sources Database ────────────────────────────────────────────────────
// Curated "reliable sources & educational content" for the "📚 More" panel.
// Keyed by scene id. Kept in its own file (separate from europe.js/asia.js/
// etc.) on purpose: this is a content library that grows independently of
// the scene definitions, edited far more often and by people who may not
// touch scene data at all.
//
// SCHEMA — each scene id maps to an array of entries:
//   {
//     type:      "primary" | "secondary" | "video",
//     tier:      "high" | "medium",      // editorial confidence, shown as a badge
//     title:     "Display title of the source",
//     publisher: "Who made/published it"  (e.g. "Crash Course", "Britannica",
//                                           "JSTOR", "National Archives"),
//     url:       "https://..."
//   }
//
// type guide:
//   "primary"   — original documents, treaties, eyewitness accounts, archives
//   "secondary" — scholarly analysis: encyclopedias, university press, journals
//   "video"     — documentaries / educational channels (Crash Course,
//                 Historia Civilis, Kings and Generals, Extra History, etc.)
//
// Every URL below was checked against live search results before being
// added (not generated from memory/guessed slugs). If you add more entries
// by hand later, do the same: confirm the exact URL resolves before
// committing it, since a dead/wrong link is worse than no link.
//
// A scene with NO entry here still gets a useful panel — sources-panel.js
// auto-generates "Quick search" links (Wikipedia, Google Scholar, YouTube)
// from the scene's own name/country/season as a fallback. Entries added
// here simply replace/augment that fallback with hand-picked, vetted links.
//
// To add sources for a scene, just add a key. Nothing else needs to change —
// sources-panel.js reads this object live.

window.WHD_SOURCES = window.WHD_SOURCES || {

    // ── Europe ──────────────────────────────────────────────────────────
    "gaul_tribes": [
        {
            type: "primary", tier: "high",
            title: "Commentarii de Bello Gallico (Caesar's Gallic Wars)",
            publisher: "Perseus Digital Library",
            url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0001"
        },
        {
            type: "secondary", tier: "high",
            title: "Gaul — overview and historiography",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/place/Gaul"
        }
    ],

    "french_revolution": [
        {
            type: "primary", tier: "high",
            title: "Declaration of the Rights of Man and of the Citizen (1789), full text",
            publisher: "Avalon Project, Yale Law School",
            url: "https://avalon.law.yale.edu/18th_century/rightsof.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "French Revolution — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/French_Revolution"
        },
        {
            type: "video", tier: "high",
            title: "The French Revolution: Crash Course World History #29",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=lTTvKwCylFY"
        }
    ],

    "napoleon_empire": [
        {
            type: "secondary", tier: "high",
            title: "Napoleon I — biography and reign",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Napoleon"
        },
        {
            type: "video", tier: "medium",
            title: "Napoleon Bonaparte and the French Revolution",
            publisher: "Crash Course (World History)",
            url: "https://www.youtube.com/watch?v=XWiRyBzF7rM"
        }
    ],

    "uk_magna_carta": [
        {
            type: "primary", tier: "high",
            title: "Magna Carta (1215) — digitised original & translation",
            publisher: "The British Library",
            url: "https://www.bl.uk/magna-carta"
        },
        {
            type: "secondary", tier: "high",
            title: "Magna Carta — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Magna_Carta"
        }
    ],

    "uk_black_death": [
        {
            type: "secondary", tier: "high",
            title: "Black Death — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Black_Death"
        },
        {
            type: "secondary", tier: "high",
            title: "Black Death — historical background",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/event/Black-Death"
        }
    ],

    "spain_armada": [
        {
            type: "secondary", tier: "high",
            title: "Spanish Armada (1588) — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Spanish_Armada"
        },
        {
            type: "secondary", tier: "high",
            title: "Spanish Armada — historical background",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/event/Spanish-Armada"
        }
    ],

    "italy_renaissance": [
        {
            type: "secondary", tier: "high",
            title: "Italian Renaissance — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Italian_Renaissance"
        }
    ],

    "russia_18": [
        {
            type: "secondary", tier: "high",
            title: "Russian Revolution — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Russian_Revolution"
        },
        {
            type: "video", tier: "medium",
            title: "Crash Course World History — The Russian Revolution",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=QwqvBK3spV0"
        }
    ],

    "poland_15": [
        {
            type: "secondary", tier: "high",
            title: "The Holocaust — overview, timeline, and survivor testimony",
            publisher: "United States Holocaust Memorial Museum",
            url: "https://www.ushmm.org/learn"
        },
        {
            type: "secondary", tier: "high",
            title: "The Holocaust — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/The_Holocaust"
        }
    ],

    "uk_ww2": [
        {
            type: "secondary", tier: "high",
            title: "World War II — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/World_War_II"
        },
        {
            type: "primary", tier: "high",
            title: "UK National Archives — World War II document collections",
            publisher: "The National Archives (UK)",
            url: "https://www.nationalarchives.gov.uk/education/resources/second-world-war/"
        }
    ],

    // ── Asia ────────────────────────────────────────────────────────────
    "mughal": [
        {
            type: "secondary", tier: "high",
            title: "Mughal Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Mughal_Empire"
        }
    ],

    "ashoka": [
        {
            type: "primary", tier: "high",
            title: "Edicts of Ashoka — full translated text",
            publisher: "Wikisource",
            url: "https://en.wikisource.org/wiki/Edicts_of_Ashoka"
        },
        {
            type: "secondary", tier: "high",
            title: "Ashoka — biography and reign",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Ashoka"
        }
    ],

    "buddha": [
        {
            type: "secondary", tier: "high",
            title: "Gautama Buddha — life and teachings",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Gautama_Buddha"
        }
    ]
};
