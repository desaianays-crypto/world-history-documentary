// Curated primary/secondary/video sources for Asia scenes (Japan, Mughal, Ashoka, Buddha, etc).
// Split from the original sources-data.js to keep per-file size down; each file
// merges into the shared window.WHD_SOURCES object rather than reassigning it,
// so files can load in any order without clobbering each other.
window.WHD_SOURCES = Object.assign(window.WHD_SOURCES || {}, {

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
    ],

    // ── Austria ─────────────────────────────────────────────────────────,

    "jomon_period": [
        {
            type: "primary", tier: "high",
            title: "Jomon Prehistoric Sites in Northern Japan — 17 archaeological sites (settlements, stone circles, shell middens) documenting more than 10,000 years of Jomon hunter-fisher-gatherer culture",
            publisher: "UNESCO World Heritage Centre",
            url: "https://whc.unesco.org/en/list/1632/"
        },
        {
            type: "secondary", tier: "high",
            title: "Jōmon period — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/J%C5%8Dmon_period"
        },
        {
            type: "video", tier: "high",
            title: "The ENTIRE History of JAPAN | Ancient to Modern",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=sZROmdC5pVY"
        }
    ],

    "yayoi_period": [
        {
            type: "primary", tier: "high",
            title: "The Wei Zhi (\"Records of Wei,\" c. 297 CE), Account of the Wa — the earliest written account of Japan, describing Queen Himiko and the Yamatai polity, based on 3rd-century Chinese diplomatic contact",
            publisher: "Asia for Educators, Columbia University (sourced translated excerpts)",
            url: "https://afe.easia.columbia.edu/ps/japan/wei_history_wa_pimiko.pdf"
        },
        {
            type: "secondary", tier: "high",
            title: "Yayoi period — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Yayoi_period"
        },
        {
            type: "video", tier: "high",
            title: "The ENTIRE History of JAPAN | Ancient to Modern",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=sZROmdC5pVY"
        }
    ],

    "kofun_period": [
        {
            type: "primary", tier: "high",
            title: "The Inariyama Sword inscription (471 or 531 CE) — a 115-character gold-inlaid inscription naming the warrior Wowake and his service to King Wakatakeru (identified with Emperor Yūryaku), one of the era's few surviving contemporary texts",
            publisher: "Wikipedia (sourced full inscription and translation by Murayama & Miller)",
            url: "https://en.wikipedia.org/wiki/Inariyama_Sword"
        },
        {
            type: "secondary", tier: "high",
            title: "Kofun period — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Kofun_period"
        },
        {
            type: "video", tier: "high",
            title: "The ENTIRE History of JAPAN | Ancient to Modern",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=sZROmdC5pVY"
        }
    ],

    "asuka_period": [
        {
            type: "primary", tier: "high",
            title: "The Seventeen-Article Constitution (604 CE, attributed to Prince Shōtoku) — Japan's first code of governing principles, blending Confucian and Buddhist ideals (note: its exact authorship and date are debated by scholars, with some viewing it as an early-8th-century retrospective composition)",
            publisher: "Asia for Educators, Columbia University (full text, Aston translation)",
            url: "https://afe.easia.columbia.edu/ps/japan/shotoku.pdf"
        },
        {
            type: "secondary", tier: "high",
            title: "Asuka period — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Asuka_period"
        },
        {
            type: "video", tier: "medium",
            title: "The ENTIRE History of JAPAN | Ancient to Modern",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=sZROmdC5pVY"
        }
    ],

    "nara_period": [
        {
            type: "primary", tier: "high",
            title: "Emperor Shōmu's 743 CE proclamation ordering the construction of the Great Buddha (Daibutsu) at Tōdai-ji — the emperor's own decree declaring himself \"Servant of the Three Treasures\" and mobilising the nation's resources for the project",
            publisher: "Wikipedia (sourced overview of the primary proclamation)",
            url: "https://en.wikipedia.org/wiki/T%C5%8Ddai-ji"
        },
        {
            type: "secondary", tier: "high",
            title: "Nara period — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Nara_period"
        },
        {
            type: "video", tier: "medium",
            title: "The ENTIRE History of JAPAN | Ancient to Modern",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=sZROmdC5pVY"
        }
    ],

    "heian_period": [
        {
            type: "primary", tier: "high",
            title: "Sei Shōnagon, The Pillow Book (c. 1002 CE) — a court lady's own firsthand diary of daily life, aesthetics, and gossip at the Heian imperial court",
            publisher: "Asia for Educators, Columbia University (sourced translated excerpts)",
            url: "https://afe.easia.columbia.edu/special/japan_600ce_heian.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Heian period — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Heian_period"
        },
        {
            type: "video", tier: "high",
            title: "Japan in the Heian Period and Cultural History: Crash Course World History #227",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=ZnZEoOJ-cxE"
        }
    ],

    "japan_genpei_war": [
        {
            type: "primary", tier: "medium",
            title: "The Tale of the Heike (Heike Monogatari, standard 1371 Kakuichi text) — the epic account of the Taira-Minamoto struggle, though it is a semi-fictionalised work compiled and embellished by oral performers generations after the war, not a contemporary eyewitness record",
            publisher: "Internet Archive (A.L. Sadler translation, 1918-21)",
            url: "https://archive.org/details/TheHeikeMonogatari"
        },
        {
            type: "secondary", tier: "high",
            title: "Genpei War — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Genpei_War"
        },
        {
            type: "video", tier: "high",
            title: "The Genpei War | FULL DOCUMENTARY",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=SbajWMqLvFk"
        }
    ],

    "kamakura_shogunate": [
        {
            type: "primary", tier: "high",
            title: "The Goseibai Shikimoku (\"Formulary of Adjudications,\" 1232 CE) — Japan's first samurai legal code, promulgated by regent Hōjō Yasutoki and remaining in effect for centuries",
            publisher: "Wikipedia (sourced overview of the primary legal code)",
            url: "https://en.wikipedia.org/wiki/Goseibai_Shikimoku"
        },
        {
            type: "secondary", tier: "high",
            title: "Kamakura shogunate — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Kamakura_shogunate"
        },
        {
            type: "video", tier: "high",
            title: "Rise of the Kamakura Shogunate | Setting the Stage",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=KW1AaK29ftc"
        }
    ],

    "japan_mongol_invasions": [
        {
            type: "primary", tier: "high",
            title: "Mōko Shūrai Ekotoba (\"Mongol Invasion Scroll,\" c. 1293 CE) — an illustrated scroll commissioned by Takezaki Suenaga, the samurai who personally fought against the Mongols in 1274 and 1281, to document his own service and claim rewards",
            publisher: "Princeton University (interactive digitised scrolls)",
            url: "https://afe.easia.columbia.edu/tps/1000ce_jp.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Mongol invasions of Japan — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Mongol_invasions_of_Japan"
        },
        {
            type: "video", tier: "high",
            title: "How the Samurai Defended Against the Mongols",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=fMN1VALIb5A"
        }
    ],

    "muromachi_period": [
        {
            type: "primary", tier: "high",
            title: "The Kenmu Shikimoku (\"Kenmu Code,\" 1336 CE) — Ashikaga Takauji's own founding statement of governing philosophy for the new Muromachi shogunate, drafted by his officials",
            publisher: "Asia for Educators, Columbia University (full text PDF)",
            url: "https://afe.easia.columbia.edu/main_pop/ps/ps_japan.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Muromachi period — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Muromachi_period"
        },
        {
            type: "video", tier: "high",
            title: "The Rise and Fall of the Ashikaga Shogunate: Japan's Era of Warriors and Warlords",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=ar_jMEC2WW0"
        }
    ],

    "sengoku_period": [
        {
            type: "primary", tier: "high",
            title: "The Seventeen-Article Injunction of Asakura Toshikage (c. 1480s CE) — a daimyo's own house code, part of the new genre of clan laws (bunkokuhō) that governed individual domains during the civil wars of the Sengoku period",
            publisher: "Asia for Educators, Columbia University (full text PDF)",
            url: "https://afe.easia.columbia.edu/main_pop/ps/ps_japan.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Sengoku period — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Sengoku_period"
        },
        {
            type: "video", tier: "high",
            title: "Rise of Tokugawa Ieyasu - Sengoku Jidai - History of Japan",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=kQaRauHgRbY"
        }
    ],

    "azuchi_momoyama": [
        {
            type: "primary", tier: "high",
            title: "Toyotomi Hideyoshi's Sword Hunt Edict (1588 CE) — the unifier's own decree disarming the peasantry, one of the defining acts of social engineering that ended the Sengoku period's chaos",
            publisher: "Asia for Educators, Columbia University (full text PDF, Lu translation)",
            url: "https://afe.easia.columbia.edu/ps/japan/tokugawa_edicts_swords.pdf"
        },
        {
            type: "secondary", tier: "high",
            title: "Azuchi–Momoyama period — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Azuchi%E2%80%93Momoyama_period"
        },
        {
            type: "video", tier: "high",
            title: "Rise of Tokugawa Ieyasu - Sengoku Jidai - History of Japan",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=kQaRauHgRbY"
        }
    ],

    // ── Japan (Early Modern & Modern) ───────────────────────────────────,

    "edo_period": [
        {
            type: "primary", tier: "high",
            title: "The Buke Shohatto (\"Laws for the Military Houses,\" 1615, reissued and expanded 1635) — the shogunate's own edicts regulating daimyo conduct, the sankin-kotai alternate-attendance system, and (from 1635) the sakoku maritime restrictions",
            publisher: "Asia for Educators, Columbia University (full text PDF, Lu translation)",
            url: "https://afe.easia.columbia.edu/ps/japan/tokugawa_edicts_military.pdf"
        },
        {
            type: "secondary", tier: "high",
            title: "Edo period — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Edo_period"
        },
        {
            type: "video", tier: "high",
            title: "The Closing of Japan - The Age of Sakoku Begins | The Edo Period Episode 5",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=oCXVe3iYMlA"
        }
    ],

    "japan_bakumatsu": [
        {
            type: "primary", tier: "high",
            title: "The Treaty of Kanagawa (31 March 1854) — full text of the treaty Commodore Perry compelled the shogunate to sign, ending over two centuries of sakoku and precipitating the Bakumatsu crisis",
            publisher: "The Avalon Project, Yale Law School",
            url: "https://avalon.law.yale.edu/19th_century/japan002.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "Bakumatsu — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Bakumatsu"
        },
        {
            type: "video", tier: "high",
            title: "Meiji Restoration Explained: Rise of Japan DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=dM-vlhIqBaQ"
        }
    ],

    "meiji_restoration": [
        {
            type: "primary", tier: "high",
            title: "The Charter Oath (6 April 1868) — the new Meiji government's own five-article statement of principles, read before the Emperor and over 400 officials at Kyoto Imperial Palace",
            publisher: "Asia for Educators, Columbia University (full text PDF)",
            url: "https://afe.easia.columbia.edu/ps/japan/charter_oath_1868.pdf"
        },
        {
            type: "secondary", tier: "high",
            title: "Meiji Restoration — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Meiji_Restoration"
        },
        {
            type: "video", tier: "high",
            title: "Meiji Restoration Explained: Rise of Japan DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=dM-vlhIqBaQ"
        }
    ],

    "imperial_japan": [
        {
            type: "primary", tier: "high",
            title: "The Japanese Instrument of Surrender (2 September 1945) — the actual signed document aboard USS Missouri ending the Pacific War and Japan's imperial expansion",
            publisher: "U.S. National Archives (digitised original)",
            url: "https://www.archives.gov/milestone-documents/surrender-of-japan"
        },
        {
            type: "secondary", tier: "high",
            title: "Empire of Japan — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Empire_of_Japan"
        },
        {
            type: "secondary", tier: "high",
            title: "Second Sino-Japanese War — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Second_Sino-Japanese_War"
        },
        {
            type: "video", tier: "high",
            title: "Rise of Ultranationalism in Japan - Pacific War #0.3 DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=7vQ6nxBRGd8"
        }
    ],

    "postwar_japan": [
        {
            type: "primary", tier: "high",
            title: "The Constitution of Japan (promulgated 3 November 1946, effective 3 May 1947) — including Article 9's renunciation of war, drafted under the Allied Occupation and adopted by the Japanese government",
            publisher: "House of Representatives of Japan (official English text)",
            url: "https://www.shugiin.go.jp/internet/itdb_english.nsf/html/statics/english/constitution_e.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Japanese economic miracle — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Japanese_economic_miracle"
        },
        {
            type: "video", tier: "high",
            title: "How Japan Became an Economic Powerhouse - Cold War DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=6IIvo2KOASk"
        }
    ],

    "japan_bubble": [
        {
            type: "primary", tier: "high",
            title: "The Plaza Accord (22 September 1985) — the joint agreement among Japan, the US, UK, France, and West Germany to depreciate the dollar, whose resulting yen appreciation and subsequent monetary easing are widely credited with fueling Japan's asset price bubble",
            publisher: "Wikipedia (sourced overview of the primary agreement)",
            url: "https://en.wikipedia.org/wiki/Plaza_Accord"
        },
        {
            type: "secondary", tier: "high",
            title: "Japanese asset price bubble — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Japanese_asset_price_bubble"
        },
        {
            type: "video", tier: "medium",
            title: "The Last Miracle: Why the World Will Never See Another Japan",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=vOTgi8PniA8"
        }
    ],

    "japan_2011_disaster": [
        {
            type: "primary", tier: "high",
            title: "The Official Report of the Fukushima Nuclear Accident Independent Investigation Commission (5 July 2012) — the National Diet of Japan's own investigative report, concluding the disaster was \"profoundly man-made\" and preventable",
            publisher: "National Diet of Japan Fukushima Nuclear Accident Independent Investigation Commission (executive summary, via ReliefWeb)",
            url: "https://reliefweb.int/report/japan/official-report-fukushima-nuclear-accident-independent-investigation-commission"
        },
        {
            type: "secondary", tier: "high",
            title: "2011 Tōhoku earthquake and tsunami — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/2011_T%C5%8Dhoku_earthquake_and_tsunami"
        },
        {
            type: "secondary", tier: "high",
            title: "Fukushima nuclear accident — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Fukushima_nuclear_accident"
        },
        {
            type: "video", tier: "high",
            title: "Fukushima Nuclear Accident: Minute by Minute | Full Film",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=sZN3prnIdtA"
        }
    ],

    "modern_japan": [
        {
            type: "primary", tier: "high",
            title: "Diplomatic Bluebook 2025 — the Ministry of Foreign Affairs of Japan's own official annual statement of foreign policy and international outlook",
            publisher: "Ministry of Foreign Affairs of Japan",
            url: "https://www.mofa.go.jp/policy/other/bluebook/2025/pdf/en_index.html"
        },
        {
            type: "secondary", tier: "high",
            title: "History of Japan — Heisei and Reiwa eras",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/History_of_Japan"
        },
        {
            type: "video", tier: "medium",
            title: "The Last Miracle: Why the World Will Never See Another Japan",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=vOTgi8PniA8"
        }
    ],

    // ── Poland ──────────────────────────────────────────────────────────
});
