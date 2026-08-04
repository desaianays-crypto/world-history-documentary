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

    // ── Vietnam ─────────────────────────────────────────────────────────
    "vietnam_dongson": [
        {
            type: "primary", tier: "high",
            title: "The Đông Sơn bronze drums (c. 600 BCE – 3rd century CE) — the culture's own decorated bronze artifacts, including the Ngọc Lũ drum, held at the Vietnam National History Museum",
            publisher: "Vietnam National History Museum / Smarthistory",
            url: "https://smarthistory.org/dong-son-drums/"
        },
        {
            type: "secondary", tier: "high",
            title: "Đông Sơn culture — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/%C4%90%C3%B4ng_S%C6%A1n_culture"
        },
        {
            type: "video", tier: "medium",
            title: "The Entire History of Vietnam (FULL Documentary)",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=_2K_xAymQWg"
        }
    ],

    "vietnam_vanlang": [
        {
            type: "primary", tier: "medium",
            title: "Đại Việt sử ký toàn thư (Complete Annals of Đại Việt, compiled by Ngô Sĩ Liên, 1479 CE) — the 15th-century chronicle that canonized the legendary Hùng Kings and the Kingdom of Văn Lang; a retrospective compilation of oral folklore, not a contemporary record, and modern historians treat its 18-king genealogy as euhemerized legend rather than verified history",
            publisher: "Wikipedia (sourced overview of the primary chronicle)",
            url: "https://en.wikipedia.org/wiki/%C4%90%E1%BA%A1i_Vi%E1%BB%87t_s%E1%BB%AD_k%C3%BD_to%C3%A0n_th%C6%B0"
        },
        {
            type: "secondary", tier: "high",
            title: "Hồng Bàng dynasty — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Hong_Bang_dynasty"
        },
        {
            type: "video", tier: "medium",
            title: "The Entire History of Vietnam (FULL Documentary)",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=_2K_xAymQWg"
        }
    ],

    "vietnam_aulac": [
        {
            type: "primary", tier: "high",
            title: "Cổ Loa Citadel (founded traditionally c. 258 BCE) — the excavated spiral fortress capital of Âu Lạc, the only genuinely contemporary evidence for the kingdom, since no inscriptions or administrative records from Âu Lạc itself survive and even the existence of its king, An Dương Vương, is attested only in later Chinese and Vietnamese texts",
            publisher: "Wikipedia (sourced overview of the primary archaeological site)",
            url: "https://en.wikipedia.org/wiki/C%E1%BB%95_Loa_Citadel"
        },
        {
            type: "secondary", tier: "high",
            title: "Âu Lạc — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/%C3%82u_L%E1%BA%A1c"
        },
        {
            type: "video", tier: "medium",
            title: "The Entire History of Vietnam (FULL Documentary)",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=_2K_xAymQWg"
        }
    ],

    "vietnam_namviet": [
        {
            type: "primary", tier: "high",
            title: "Sima Qian, Shiji (Records of the Grand Historian, c. 94 BCE) — the contemporary Han Chinese account of Zhao Tuo (Triệu Đà) and the founding of the kingdom of Nanyue (Nam Việt)",
            publisher: "Wikipedia (sourced overview of the primary text)",
            url: "https://en.wikipedia.org/wiki/Nanyue"
        },
        {
            type: "secondary", tier: "high",
            title: "Nanyue — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Nanyue"
        },
        {
            type: "video", tier: "medium",
            title: "The Entire History of Vietnam (FULL Documentary)",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=_2K_xAymQWg"
        }
    ],

    "vietnam_handomination": [
        {
            type: "primary", tier: "high",
            title: "The Western Han census of 2 CE for Jiaozhi Commandery — the Han dynasty's own administrative household count, recording 92,440 hearths and confirming Jiaozhi's status as the empire's most densely populated southern territory",
            publisher: "Wikipedia (sourced overview of the primary census record)",
            url: "https://en.wikipedia.org/wiki/Vietnam_under_Chinese_rule"
        },
        {
            type: "secondary", tier: "high",
            title: "First Era of Northern Domination — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/First_Era_of_Northern_Domination"
        },
        {
            type: "video", tier: "medium",
            title: "The Entire History of Vietnam (FULL Documentary)",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=_2K_xAymQWg"
        }
    ],

    "vietnam_trungsisters": [
        {
            type: "primary", tier: "high",
            title: "Hou Hanshu (Book of the Later Han, compiled by Fan Ye, early 5th century CE), Biographies of the Southern and Southwestern Barbarians — the principal surviving account of the Trưng Sisters' rebellion (note: no contemporary Lạc Việt inscription or record survives, making this Chinese imperial history the sole near-primary documentation of the uprising)",
            publisher: "Wikipedia (sourced overview and translated excerpts of the primary chronicle)",
            url: "https://en.wikipedia.org/wiki/Tr%C6%B0ng_sisters"
        },
        {
            type: "secondary", tier: "high",
            title: "Trưng sisters — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Tr%C6%B0ng_sisters"
        },
        {
            type: "video", tier: "medium",
            title: "The Entire History of Vietnam (FULL Documentary)",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=_2K_xAymQWg"
        }
    ],

    "vietnam_bacthuo2": [
        {
            type: "primary", tier: "medium",
            title: "Records of Lý Bôn's rebellion and the Early Lý dynasty (544 CE) — the founding of Vạn Xuân, a rare period of de facto independence within the long centuries of Chinese domination that this scene spans",
            publisher: "Wikipedia (sourced overview of the primary chronicle record)",
            url: "https://en.wikipedia.org/wiki/L%C3%BD_B%C3%AD"
        },
        {
            type: "secondary", tier: "high",
            title: "Vietnam under Chinese rule — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Vietnam_under_Chinese_rule"
        },
        {
            type: "video", tier: "medium",
            title: "The Entire History of Vietnam (FULL Documentary)",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=_2K_xAymQWg"
        }
    ],

    "vietnam_ngoquyen": [
        {
            type: "primary", tier: "high",
            title: "The surviving iron-tipped stakes of the Battle of Bạch Đằng (938 CE) — the physical remains of Ngô Quyền's underwater stake trap, recovered and displayed at the Museum of History in Hanoi",
            publisher: "Wikipedia (sourced overview of the primary archaeological artifacts)",
            url: "https://en.wikipedia.org/wiki/Battle_of_B%E1%BA%A1ch_%C4%90%E1%BA%B1ng_(938)"
        },
        {
            type: "secondary", tier: "high",
            title: "Ngô Quyền — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Ng%C3%B4_Quy%E1%BB%81n"
        },
        {
            type: "video", tier: "medium",
            title: "The Entire History of Vietnam (FULL Documentary)",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=_2K_xAymQWg"
        }
    ],

    "vietnam_ly": [
        {
            type: "primary", tier: "high",
            title: "Lý Thái Tổ's Edict on the Transfer of the Capital (Chiếu dời đô, autumn 1010 CE) — the emperor's own decree moving the capital from Hoa Lư to Đại La, which he renamed Thăng Long (\"Ascending Dragon\"), now Hanoi",
            publisher: "Thăng Long — Hà Nội Heritage Conservation Center (official Vietnamese government translation)",
            url: "https://thanglong.chinhphu.vn/english/the-royal-edict-on-the-transfer-of-the-capital-of-thang-long-in-the-year-1010-110109.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Lý dynasty — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/L%C3%BD_dynasty"
        },
        {
            type: "video", tier: "medium",
            title: "The Entire History of Vietnam (FULL Documentary)",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=_2K_xAymQWg"
        }
    ],

    "vietnam_tran": [
        {
            type: "primary", tier: "medium",
            title: "Trần-era administrative and legal records, continuing the Lý dynasty's Hình Thư legal tradition that would culminate in the Later Lê's Hồng Đức Code — the Trần court's own governance framework during its consolidation of Đại Việt",
            publisher: "Wikipedia (sourced overview of Vietnamese dynastic law codification)",
            url: "https://en.wikipedia.org/wiki/Tr%E1%BA%A7n_dynasty"
        },
        {
            type: "secondary", tier: "high",
            title: "Trần dynasty — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Tr%E1%BA%A7n_dynasty"
        },
        {
            type: "video", tier: "medium",
            title: "The Entire History of Vietnam (FULL Documentary)",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=_2K_xAymQWg"
        }
    ],

    "vietnam_mongols": [
        {
            type: "primary", tier: "high",
            title: "Trần Hưng Đạo's Hịch tướng sĩ (\"Proclamation to the Officers,\" 1284 CE) — the supreme commander's own exhortation to his army on the eve of the second Mongol invasion, one of the most celebrated texts in Vietnamese literature",
            publisher: "Viet Country (full English translation)",
            url: "https://viet-country.com/article/tran-hung-dao-s-proclamation-to-his-officers"
        },
        {
            type: "secondary", tier: "high",
            title: "Mongol invasions of Đại Việt — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Mongol_invasions_of_Vietnam"
        },
        {
            type: "video", tier: "medium",
            title: "The Entire History of Vietnam (FULL Documentary)",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=_2K_xAymQWg"
        }
    ],

    "vietnam_leloi": [
        {
            type: "primary", tier: "high",
            title: "Nguyễn Trãi, Bình Ngô đại cáo (\"Great Proclamation upon the Pacification of the Wu,\" 1428 CE) — written on Lê Lợi's behalf to announce victory over the Ming and affirm Đại Việt's independence, often called Vietnam's \"second declaration of independence\"",
            publisher: "University of Hawaii ScholarSpace (Stephen O'Harrow translation and study)",
            url: "https://scholarspace.manoa.hawaii.edu/items/3d81cbd4-9ddd-48cb-b57d-d6a64fbf7b30"
        },
        {
            type: "secondary", tier: "high",
            title: "Lam Sơn uprising — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Lam_S%C6%A1n_uprising"
        },
        {
            type: "video", tier: "medium",
            title: "The Entire History of Vietnam (FULL Documentary)",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=_2K_xAymQWg"
        }
    ],

    "vietnam_laterle": [
        {
            type: "primary", tier: "high",
            title: "The Hồng Đức Code (Quốc Triều Hình Luật, promulgated under Lê Thánh Tông, ratified ~1483 CE) — the Later Lê dynasty's own legal code, notable among East Asian law codes of its era for provisions recognizing women's property and inheritance rights",
            publisher: "Wikipedia (sourced overview of the primary legal code)",
            url: "https://en.wikipedia.org/wiki/Later_L%C3%AA_dynasty"
        },
        {
            type: "secondary", tier: "high",
            title: "Later Lê dynasty — overview",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/topic/Later-Le-dynasty"
        },
        {
            type: "video", tier: "medium",
            title: "The Entire History of Vietnam (FULL Documentary)",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=_2K_xAymQWg"
        }
    ],

    "vietnam_trinh_nguyen": [
        {
            type: "primary", tier: "medium",
            title: "The de facto partition at the Gianh River (established through the Trịnh–Nguyễn Wars, 1627–1672) — the territorial line the two rival lordly houses maintained for over a century while both nominally served the same Lê emperor",
            publisher: "Wikipedia (sourced overview of the primary territorial and administrative record)",
            url: "https://en.wikipedia.org/wiki/Tr%E1%BB%8Bnh%E2%80%93Nguy%E1%BB%85n_War"
        },
        {
            type: "secondary", tier: "high",
            title: "Trịnh–Nguyễn War — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Tr%E1%BB%8Bnh%E2%80%93Nguy%E1%BB%85n_War"
        },
        {
            type: "video", tier: "medium",
            title: "The Entire History of Vietnam (FULL Documentary)",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=_2K_xAymQWg"
        }
    ],

    "vietnam_tayson": [
        {
            type: "primary", tier: "high",
            title: "Emperor Quang Trung's (Nguyễn Huệ's) proclamation to his troops before the Battle of Ngọc Hồi–Đống Đa (26 November 1788 CE) — his own address rallying 100,000 soldiers for the surprise Tết offensive that routed the invading Qing army",
            publisher: "Wikipedia (sourced overview of the primary proclamation and campaign)",
            url: "https://en.wikipedia.org/wiki/T%C3%A2y_S%C6%A1n_wars"
        },
        {
            type: "secondary", tier: "high",
            title: "Tây Sơn wars — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/T%C3%A2y_S%C6%A1n_wars"
        },
        {
            type: "video", tier: "medium",
            title: "The Entire History of Vietnam (FULL Documentary)",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=_2K_xAymQWg"
        }
    ],

    "vietnam_nguyen": [
        {
            type: "primary", tier: "high",
            title: "The Hoàng Việt Luật Lệ (\"Gia Long Code,\" 1815 CE) — Emperor Gia Long's own legal code, commissioned to consolidate the newly unified Nguyễn state on Qing- and Hồng Đức-derived legal foundations",
            publisher: "Wikipedia (sourced overview of the primary legal code)",
            url: "https://en.wikipedia.org/wiki/Nguy%E1%BB%85n_dynasty"
        },
        {
            type: "secondary", tier: "high",
            title: "Nguyễn dynasty — overview",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/topic/Nguyen-dynasty"
        },
        {
            type: "video", tier: "medium",
            title: "The Entire History of Vietnam (FULL Documentary)",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=_2K_xAymQWg"
        }
    ],

    "vietnam_french": [
        {
            type: "primary", tier: "high",
            title: "The Treaty of Huế (6 June 1884, the \"Patenôtre Treaty\") — full English text of the treaty establishing the French protectorates of Annam and Tonkin, forming the legal basis of French colonial rule for the next seven decades",
            publisher: "U.S. Office of the Historian (Foreign Relations of the United States, digitised original translation)",
            url: "https://history.state.gov/historicaldocuments/frus1883/d485"
        },
        {
            type: "secondary", tier: "high",
            title: "Treaty of Huế (1884) — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Treaty_of_Hu%E1%BA%BF_(1884)"
        },
        {
            type: "video", tier: "high",
            title: "The Vietnam War | Full Episode 1 | Déjà Vu (1858-1961)",
            publisher: "PBS",
            url: "https://www.youtube.com/watch?v=L1D7At5QkGs"
        }
    ],

    "vietnam_hcm": [
        {
            type: "primary", tier: "high",
            title: "Hồ Chí Minh's Declaration of Independence of the Democratic Republic of Vietnam (Ba Đình Square, Hanoi, 2 September 1945) — his own speech, deliberately opening with an echo of the American Declaration of Independence",
            publisher: "Asia for Educators, Columbia University (full text PDF)",
            url: "https://afe.easia.columbia.edu/ps/vietnam/independence.pdf"
        },
        {
            type: "secondary", tier: "high",
            title: "Declaration of independence of the Democratic Republic of Vietnam — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Declaration_of_independence_of_the_Democratic_Republic_of_Vietnam"
        },
        {
            type: "video", tier: "high",
            title: "The Vietnam War | Full Episode 1 | Déjà Vu (1858-1961)",
            publisher: "PBS",
            url: "https://www.youtube.com/watch?v=L1D7At5QkGs"
        }
    ],

    "vietnam_firstindochina": [
        {
            type: "primary", tier: "high",
            title: "The Geneva Accords (21 July 1954) — the final declarations partitioning Vietnam at the 17th parallel following the French defeat at Dien Bien Phu, ending the First Indochina War",
            publisher: "Vassar College, The Wars for Vietnam (digitised primary documents archive)",
            url: "https://www.vassar.edu/the-wars-for-vietnam/documents/final-declarations-geneva-conference-july-21-1954"
        },
        {
            type: "secondary", tier: "high",
            title: "First Indochina War — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/First_Indochina_War"
        },
        {
            type: "video", tier: "high",
            title: "First Indochina War Begins - Cold War DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=V9wSqx0W8h0"
        }
    ],

    "vietnam_war": [
        {
            type: "primary", tier: "high",
            title: "The Gulf of Tonkin Resolution (7 August 1964) — full text of the joint Congressional resolution authorizing U.S. military escalation, passed after reported attacks on U.S. Navy ships that later investigation (including a 1997 assessment by Robert McNamara and Võ Nguyên Giáp) concluded likely did not occur as described, at least for the second incident",
            publisher: "The Avalon Project, Yale Law School",
            url: "https://avalon.law.yale.edu/20th_century/tonkin-g.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "Vietnam War — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Vietnam_War"
        },
        {
            type: "video", tier: "high",
            title: "The ENTIRE History Of The Vietnam War | 1862 - 1975",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=KNQuS8GoD0o"
        }
    ],

    "vietnam_modern": [
        {
            type: "primary", tier: "high",
            title: "Resolution of the Sixth National Congress of the Communist Party of Vietnam (December 1986), launching Đổi Mới (\"Renovation\") — including General Secretary Trường Chinh's own self-critical assessment of prior policy failures (\"we have made mistakes due to 'leftist infantilism'...\")",
            publisher: "ANU Press (sourced translated excerpt within an academic study of Vietnam's reform process)",
            url: "https://press-files.anu.edu.au/downloads/press/p16721/pdf/ch0611.pdf"
        },
        {
            type: "secondary", tier: "high",
            title: "Đổi Mới — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/%C4%90%E1%BB%95i_M%E1%BB%9Bi"
        },
        {
            type: "video", tier: "medium",
            title: "The Entire History of Vietnam (FULL Documentary)",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=_2K_xAymQWg"
        }
    ]

});
