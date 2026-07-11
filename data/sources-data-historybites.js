// Curated primary/secondary/video sources for History Bites mini-series scenes.
// Split from the original sources-data.js to keep per-file size down; each file
// merges into the shared window.WHD_SOURCES object rather than reassigning it,
// so files can load in any order without clobbering each other.
window.WHD_SOURCES = Object.assign(window.WHD_SOURCES || {}, {

    "greece_culture": [
        {
            type: "primary", tier: "high",
            title: "Aristotle, Nicomachean Ethics — full text",
            publisher: "Perseus Digital Library, Tufts University",
            url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0053"
        },
        {
            type: "secondary", tier: "high",
            title: "Ancient Greek philosophy — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Ancient_Greek_philosophy"
        },
        {
            type: "video", tier: "medium",
            title: "Plato & Aristotle: Crash Course History of Science",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=rh0fxJkvL44"
        }
    ],

    "greece_empires": [
        {
            type: "primary", tier: "high",
            title: "Arrian, The Anabasis of Alexander (Chinnock translation) — full text",
            publisher: "Wikisource",
            url: "https://en.wikisource.org/wiki/The_Anabasis_of_Alexander"
        },
        {
            type: "secondary", tier: "high",
            title: "Wars of Alexander the Great — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Wars_of_Alexander_the_Great"
        },
        {
            type: "video", tier: "high",
            title: "Alexander the Great (Part 1)",
            publisher: "Epic History TV",
            url: "https://www.youtube.com/watch?v=aMyxwFib0_M"
        }
    ],

    "greece_other": [
        {
            type: "primary", tier: "high",
            title: "Thucydides, The Peloponnesian War — full text",
            publisher: "Perseus Digital Library, Tufts University",
            url: "https://www.perseus.tufts.edu/hopper/text?doc=urn:cts:greekLit:tlg0003.tlg001.perseus-eng3"
        },
        {
            type: "secondary", tier: "high",
            title: "Peloponnesian War — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Peloponnesian_War"
        },
        {
            type: "video", tier: "high",
            title: "The Full History of the Peloponnesian War — Athens vs Sparta",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=Jr8EGJwDCk8"
        }
    ],

    "greece_religion": [
        {
            type: "primary", tier: "high",
            title: "Hesiod, Theogony — full text",
            publisher: "Perseus Digital Library, Tufts University",
            url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0130"
        },
        {
            type: "secondary", tier: "high",
            title: "Ancient Greek religion — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Ancient_Greek_religion"
        },
        {
            type: "video", tier: "medium",
            title: "Greek Mythology: This Is The Only Video You Need To Watch To Understand Everything",
            publisher: "See U in History / Mythology",
            url: "https://www.youtube.com/watch?v=AIPSv5hw4ZA"
        }
    ],

    // ── History Bites: Khmer Empire ────────────────────────────────────,

    "khmer_1": [
        {
            type: "primary", tier: "high",
            title: "Sdok Kok Thom inscription (K.235, 1052 CE) — account of Jayavarman II's 802 CE devaraja consecration",
            publisher: "Wikipedia (sourced translation excerpts)",
            url: "https://en.wikipedia.org/wiki/Sdok_Kok_Thom"
        },
        {
            type: "secondary", tier: "high",
            title: "Jayavarman II — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Jayavarman_II"
        },
        {
            type: "video", tier: "high",
            title: "The Buried Secrets Of The Empire Behind Angkor Wat (Angkor Rediscovered)",
            publisher: "Timeline - World History Documentaries",
            url: "https://www.youtube.com/watch?v=87X1eq6F-vg"
        }
    ],

    "khmer_2": [
        {
            type: "primary", tier: "medium",
            title: "Khmer inscriptions of the Angkorian expansion period — epigraphic overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Khmer_inscriptions"
        },
        {
            type: "secondary", tier: "high",
            title: "Yasovarman I and the founding of Angkor (Yashodharapura) — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Yasovarman_I"
        },
        {
            type: "video", tier: "high",
            title: "The Buried Secrets Of The Empire Behind Angkor Wat (Angkor Rediscovered)",
            publisher: "Timeline - World History Documentaries",
            url: "https://www.youtube.com/watch?v=87X1eq6F-vg"
        }
    ],

    "khmer_3": [
        {
            type: "primary", tier: "high",
            title: "Zhou Daguan, The Customs of Cambodia (1296–97 CE) — the only eyewitness account of Angkor's golden age",
            publisher: "Wikipedia (sourced overview of the primary text)",
            url: "https://en.wikipedia.org/wiki/The_Customs_of_Cambodia"
        },
        {
            type: "secondary", tier: "high",
            title: "Angkor Wat — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Angkor_Wat"
        },
        {
            type: "video", tier: "high",
            title: "Recreating Angkor Wat: The City Of The God Kings",
            publisher: "Timeline - World History Documentaries",
            url: "https://www.youtube.com/watch?v=KsDGDzwuQ-I"
        }
    ],

    "khmer_4": [
        {
            type: "primary", tier: "high",
            title: "The Stele Inscription of Preah Khan (K.908, 1191 CE) — Jayavarman VII's own temple-foundation inscription",
            publisher: "Udaya Journal (yosothor.org), trans. T.S. Maxwell",
            url: "https://www.yosothor.org/uploads/images/Udaya/UDAYA_ISSUES/Udaya_08/01_Thomas%20SMaxwell_UDAYA08.pdf"
        },
        {
            type: "secondary", tier: "high",
            title: "Jayavarman VII — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Jayavarman_VII"
        },
        {
            type: "video", tier: "high",
            title: "Recreating Angkor Wat: The City Of The God Kings",
            publisher: "Timeline - World History Documentaries",
            url: "https://www.youtube.com/watch?v=KsDGDzwuQ-I"
        }
    ],

    "khmer_5": [
        {
            type: "primary", tier: "medium",
            title: "Khmer inscriptions of the late Angkorian period — epigraphic overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Khmer_inscriptions"
        },
        {
            type: "secondary", tier: "high",
            title: "Decline of the Khmer Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Khmer_Empire#Decline"
        },
        {
            type: "video", tier: "high",
            title: "The Khmer Empire — Fall of the God Kings",
            publisher: "Fall of Civilizations",
            url: "https://www.youtube.com/watch?v=ghmjIBD2Fd4"
        }
    ],

    // ── History Bites: Christianity ─────────────────────────────────────,

    "christianity_beginning": [
        {
            type: "primary", tier: "high",
            title: "The Gospel of Luke — full text",
            publisher: "Bible Gateway (New Revised Standard Version)",
            url: "https://www.biblegateway.com/passage/?search=Luke%201&version=NRSVUE"
        },
        {
            type: "secondary", tier: "high",
            title: "Historical Jesus — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Historical_Jesus"
        },
        {
            type: "video", tier: "high",
            title: "From Jesus to Christ: The First Christians (Part One)",
            publisher: "PBS FRONTLINE",
            url: "https://www.youtube.com/watch?v=JN8FM1NCOSk"
        }
    ],

    "christianity_early": [
        {
            type: "primary", tier: "high",
            title: "The Acts of the Apostles — full text",
            publisher: "Bible Gateway (New Revised Standard Version)",
            url: "https://www.biblegateway.com/passage/?search=Acts%202&version=NRSVUE"
        },
        {
            type: "secondary", tier: "high",
            title: "Early Christianity — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Early_Christianity"
        },
        {
            type: "video", tier: "high",
            title: "From Jesus to Christ: The First Christians (Part Two)",
            publisher: "PBS FRONTLINE",
            url: "https://www.youtube.com/watch?v=GXqFvfCaFwY"
        }
    ],

    "christianity_rome": [
        {
            type: "primary", tier: "high",
            title: "Pliny the Younger's letter to Trajan on the Christians (c. 112 CE), with Trajan's reply",
            publisher: "Georgetown University (faculty.georgetown.edu)",
            url: "https://faculty.georgetown.edu/jod/texts/pliny.html"
        },
        {
            type: "secondary", tier: "high",
            title: "Persecution of Christians in the Roman Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Persecution_of_Christians_in_the_Roman_Empire"
        },
        {
            type: "video", tier: "medium",
            title: "5 Ways Christianity Spread Through Ancient Rome",
            publisher: "HISTORY",
            url: "https://www.history.com/articles/5-ways-christianity-spread-through-ancient-rome"
        }
    ],

    "christianity_constantine": [
        {
            type: "primary", tier: "high",
            title: "The Edict of Milan (313 CE) — full text",
            publisher: "Internet History Sourcebooks Project, Fordham University",
            url: "https://sourcebooks.web.fordham.edu/source/edict-milan.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "Edict of Milan — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Edict_of_Milan"
        },
        {
            type: "video", tier: "medium",
            title: "Emperor Constantine Issues the Edict of Milan, Legalizing Christianity (313 CE)",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=l09YSs40OJM"
        }
    ],

    "christianity_state": [
        {
            type: "primary", tier: "high",
            title: "The Edict of Thessalonica (380 CE) — full text",
            publisher: "Wikipedia (sourced full-text translation)",
            url: "https://en.wikipedia.org/wiki/Edict_of_Thessalonica"
        },
        {
            type: "secondary", tier: "high",
            title: "State church of the Roman Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/State_church_of_the_Roman_Empire"
        },
        {
            type: "video", tier: "medium",
            title: "5 Ways Christianity Spread Through Ancient Rome",
            publisher: "HISTORY",
            url: "https://www.history.com/articles/5-ways-christianity-spread-through-ancient-rome"
        }
    ],

    // ── History Bites: Islam ─────────────────────────────────────────────,

    "islam_early": [
        {
            type: "primary", tier: "high",
            title: "Ibn Ishaq's Sirat Rasul Allah (Life of Muhammad), as preserved by Ibn Hisham — earliest surviving biography",
            publisher: "Wikipedia (sourced overview of the primary text)",
            url: "https://en.wikipedia.org/wiki/Ibn_Ishaq"
        },
        {
            type: "secondary", tier: "high",
            title: "Muhammad — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Muhammad"
        },
        {
            type: "video", tier: "medium",
            title: "Islam - Empire of Faith (Part 1): Prophet Muhammad and Rise of Islam",
            publisher: "PBS",
            url: "https://www.youtube.com/watch?v=PF6VPZsHDZQ"
        }
    ],

    "islam_mecca": [
        {
            type: "primary", tier: "high",
            title: "The Quran, Surah Al-Muddaththir and early Meccan revelations — full text",
            publisher: "Quran.com",
            url: "https://quran.com/74"
        },
        {
            type: "secondary", tier: "high",
            title: "Early social changes under Islam — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Muhammad_in_Mecca"
        },
        {
            type: "video", tier: "medium",
            title: "Islam - Empire of Faith (Part 1): Prophet Muhammad and Rise of Islam",
            publisher: "PBS",
            url: "https://www.youtube.com/watch?v=PF6VPZsHDZQ"
        }
    ],

    "islam_medina": [
        {
            type: "primary", tier: "high",
            title: "The Constitution of Medina (622 CE) — full text",
            publisher: "Wikipedia (sourced full-text translation)",
            url: "https://en.wikipedia.org/wiki/Constitution_of_Medina"
        },
        {
            type: "secondary", tier: "high",
            title: "Hijra (Muhammad's migration to Medina) — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Hijra_(Muhammad)"
        },
        {
            type: "video", tier: "medium",
            title: "The Rise of Islam | The Complete Story",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=inQuB0IPY64"
        }
    ],

    "islam_unified": [
        {
            type: "primary", tier: "medium",
            title: "Ibn Ishaq's Sirat Rasul Allah — account of the conquest of Mecca and unification of Arabia",
            publisher: "Wikipedia (sourced overview of the primary text)",
            url: "https://en.wikipedia.org/wiki/Ibn_Ishaq"
        },
        {
            type: "secondary", tier: "high",
            title: "Conquest of Mecca — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Conquest_of_Mecca"
        },
        {
            type: "video", tier: "medium",
            title: "The Rise of Islam | The Complete Story",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=inQuB0IPY64"
        }
    ],

    "islam_expansion": [
        {
            type: "primary", tier: "medium",
            title: "Khalid ibn al-Walid's campaign letters and early Rashidun-era accounts — epigraphic and chronicle overview",
            publisher: "Wikipedia (sourced overview of the early Islamic conquests)",
            url: "https://en.wikipedia.org/wiki/Early_Muslim_conquests"
        },
        {
            type: "secondary", tier: "high",
            title: "Rashidun Caliphate — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Rashidun_Caliphate"
        },
        {
            type: "video", tier: "high",
            title: "Early Muslim Expansion — Khalid, Yarmouk, al-Qadisiyyah",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=r2cEIDZwG5M"
        }
    ],

    // ── History Bites: Mongol Empire ───────────────────────────────────,

    "mongol_genghis": [
        {
            type: "primary", tier: "high",
            title: "The Secret History of the Mongols (13th c.) — earliest Mongol account of Temüjin's rise",
            publisher: "World History Encyclopedia (sourced excerpts, Cleaves translation)",
            url: "https://www.worldhistory.org/The_Secret_History_of_the_Mongols/"
        },
        {
            type: "secondary", tier: "high",
            title: "Genghis Khan — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Genghis_Khan"
        },
        {
            type: "video", tier: "high",
            title: "Mongols Season 1 Full — From Genghis to Kublai",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=bzatw32j-i4"
        }
    ],

    "mongol_conquest": [
        {
            type: "primary", tier: "high",
            title: "The Secret History of the Mongols (13th c.) — account of the early conquests",
            publisher: "World History Encyclopedia (sourced excerpts, Cleaves translation)",
            url: "https://www.worldhistory.org/The_Secret_History_of_the_Mongols/"
        },
        {
            type: "secondary", tier: "high",
            title: "Mongol conquests — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Mongol_conquests"
        },
        {
            type: "video", tier: "high",
            title: "The Day Europe Almost Fell (1241-1242)",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=pnB4K_xDJTA"
        }
    ],

    "mongol_large": [
        {
            type: "primary", tier: "medium",
            title: "Khmer, Rus' and Persian chronicle accounts of Mongol conquest — epigraphic and chronicle overview",
            publisher: "Wikipedia (sourced overview of the Mongol Empire's territorial extent)",
            url: "https://en.wikipedia.org/wiki/Mongol_Empire"
        },
        {
            type: "secondary", tier: "high",
            title: "Mongol Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Mongol_Empire"
        },
        {
            type: "video", tier: "high",
            title: "The Day Europe Almost Fell (1241-1242)",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=pnB4K_xDJTA"
        }
    ],

    "mongol_pax": [
        {
            type: "primary", tier: "high",
            title: "Marco Polo, The Travels of Marco Polo — eyewitness account of Kublai Khan's court and the Pax Mongolica",
            publisher: "Wikipedia (sourced overview of the primary text)",
            url: "https://en.wikipedia.org/wiki/The_Travels_of_Marco_Polo"
        },
        {
            type: "secondary", tier: "high",
            title: "Pax Mongolica — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Pax_Mongolica"
        },
        {
            type: "video", tier: "high",
            title: "Mongols Season 1 Full — From Genghis to Kublai",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=bzatw32j-i4"
        }
    ],

    "mongol_decline": [
        {
            type: "primary", tier: "medium",
            title: "Yuan-era chronicle accounts of the fall of Khanbaliq (1368) — epigraphic and chronicle overview",
            publisher: "Wikipedia (sourced overview of the Yuan dynasty's collapse)",
            url: "https://en.wikipedia.org/wiki/Yuan_dynasty"
        },
        {
            type: "secondary", tier: "high",
            title: "Decline of the Mongol Empire — overview",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/summary/Decline-of-the-Mongol-Empire"
        },
        {
            type: "video", tier: "high",
            title: "How the Mongol Empire Fell",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=THpYk-au6-s"
        }
    ],

    // ── History Bites: Dar-Al-Islam ────────────────────────────────────,

    "dai_1": [
        {
            type: "primary", tier: "high",
            title: "Usama ibn Munqidh, Kitab al-I'tibar (Book of Contemplation, c. 1183) — a Muslim nobleman's eyewitness account of the Crusader states",
            publisher: "Wikipedia (sourced overview of the primary text)",
            url: "https://en.wikipedia.org/wiki/Usama_ibn_Munqidh"
        },
        {
            type: "secondary", tier: "high",
            title: "Crusader states — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Crusader_states"
        },
        {
            type: "video", tier: "high",
            title: "Third Crusade - The Beginning",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=kHTLBHt3zUM"
        }
    ],

    "dai_2": [
        {
            type: "primary", tier: "medium",
            title: "Baha ad-Din ibn Shaddad's biography of Saladin — a contemporary account of the Ayyubid founder",
            publisher: "Wikipedia (sourced overview of the primary text)",
            url: "https://en.wikipedia.org/wiki/Baha_al-Din_ibn_Shaddad"
        },
        {
            type: "secondary", tier: "high",
            title: "Ayyubid dynasty — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Ayyubid_dynasty"
        },
        {
            type: "video", tier: "high",
            title: "Third Crusade - The Beginning",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=kHTLBHt3zUM"
        }
    ],

    "dai_3": [
        {
            type: "primary", tier: "high",
            title: "Rashid al-Din, Jami' al-Tawarikh (Compendium of Chronicles, c. 1307) — Ilkhanid court account of the fall of Baghdad",
            publisher: "Wikipedia (sourced overview of the primary text)",
            url: "https://en.wikipedia.org/wiki/Jami%27_al-tawarikh"
        },
        {
            type: "secondary", tier: "high",
            title: "Siege of Baghdad (1258) — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Siege_of_Baghdad_(1258)"
        },
        {
            type: "video", tier: "medium",
            title: "How the Mongols Conquered Baghdad, 1258 (Abbasid Apocalypse)",
            publisher: "RealCrusadesHistory",
            url: "https://www.youtube.com/watch?v=_bbRHbkgfaQ"
        }
    ],

    "dai_4": [
        {
            type: "primary", tier: "high",
            title: "Jami' al-Tawarikh's account of the Battle of Ain Jalut (1260), trans. W.M. Thackston — contemporary Mamluk-Mongol battle narrative",
            publisher: "De Re Militari (Society for Medieval Military History)",
            url: "https://www.deremilitari.org/RESOURCES/SOURCES/aynjalut.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Mamluk Sultanate — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Mamluk_Sultanate_(Cairo)"
        },
        {
            type: "video", tier: "high",
            title: "Rise of the Mamluks — Animated Medieval History Documentary",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=87YSV2UbfDc"
        }
    ],

    "dai_5": [
        {
            type: "primary", tier: "medium",
            title: "Ottoman, Safavid and Mughal court chronicles on gunpowder warfare — epigraphic and chronicle overview",
            publisher: "Wikipedia (sourced overview of the Gunpowder Empires)",
            url: "https://en.wikipedia.org/wiki/Gunpowder_empires"
        },
        {
            type: "secondary", tier: "high",
            title: "Gunpowder empires — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Gunpowder_empires"
        },
        {
            type: "video", tier: "high",
            title: "Ottoman, Safavid and Mughal Empires",
            publisher: "Khan Academy",
            url: "https://www.youtube.com/watch?v=hNpcQEGw3S4"
        }
    ],

    // ── History Bites: Black Death ──────────────────────────────────────,

    "bd_1": [
        {
            type: "primary", tier: "high",
            title: "Ibn al-Wardi, Risalat al-naba' 'an al-waba' (Essay on the Report of the Pestilence, 1348) — an Aleppo scholar's account of the plague's advance, written as a maqama (a stylized Arabic literary form); 2025 scholarship (Omar & Fancy, Univ. of Exeter) has shown it was long misread as a literal eyewitness route report and should not be treated as one",
            publisher: "The Plague Anthology (sourced translated excerpt)",
            url: "https://plagueanthology.com/2020/07/24/ibn-al-wardi-on-the-advance-of-plague-1348/"
        },
        {
            type: "secondary", tier: "high",
            title: "Black Death — origins and background",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Black_Death"
        },
        {
            type: "video", tier: "high",
            title: "Black Death: The Disease That Wiped Out Half Of Europe",
            publisher: "Absolute History",
            url: "https://www.youtube.com/watch?v=i0hg9jFAYdc"
        }
    ],

    "bd_2": [
        {
            type: "primary", tier: "high",
            title: "Gabriele de' Mussi, Istoria de Morbo (c. 1348) — account of the plague's introduction to Europe via the siege of Caffa",
            publisher: "Wikipedia (sourced translated excerpts)",
            url: "https://en.wikipedia.org/wiki/Gabriel_de_Mussis"
        },
        {
            type: "secondary", tier: "high",
            title: "Black Death in Europe — spread and arrival",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Black_Death_in_Europe"
        },
        {
            type: "video", tier: "high",
            title: "Black Death: The Disease That Wiped Out Half Of Europe",
            publisher: "Absolute History",
            url: "https://www.youtube.com/watch?v=i0hg9jFAYdc"
        }
    ],

    "bd_3": [
        {
            type: "primary", tier: "high",
            title: "Giovanni Boccaccio, Introduction to The Decameron (c. 1350–53) — eyewitness description of plague-ravaged Florence",
            publisher: "Internet History Sourcebooks Project, Fordham University",
            url: "https://sourcebooks.web.fordham.edu/source/boccacio2.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "Black Death — demographic and social impact",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/summary/Black-Death-Timeline"
        },
        {
            type: "video", tier: "medium",
            title: "Black Death: The Disease That Wiped Out Half Of Europe",
            publisher: "Absolute History",
            url: "https://www.youtube.com/watch?v=i0hg9jFAYdc"
        }
    ],

    "bd_4": [
        {
            type: "primary", tier: "medium",
            title: "Chronicle accounts of the Flagellant movement (1349) — contemporary description of the penitential processions",
            publisher: "Wikipedia (sourced overview of the primary chronicles)",
            url: "https://en.wikipedia.org/wiki/Flagellant"
        },
        {
            type: "secondary", tier: "high",
            title: "Persecution of Jews during the Black Death — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Persecution_of_Jews_during_the_Black_Death"
        },
        {
            type: "video", tier: "medium",
            title: "Black Death: The Disease That Wiped Out Half Of Europe",
            publisher: "Absolute History",
            url: "https://www.youtube.com/watch?v=i0hg9jFAYdc"
        }
    ],

    "bd_5": [
        {
            type: "primary", tier: "high",
            title: "The Statute of Labourers (1351) — full text of England's post-plague wage-control law",
            publisher: "The Avalon Project, Yale Law School",
            url: "https://avalon.law.yale.edu/medieval/statlab.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "Social and economic effects of the Black Death — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Black_Death#Consequences"
        },
        {
            type: "video", tier: "medium",
            title: "Black Death: The Disease That Wiped Out Half Of Europe",
            publisher: "Absolute History",
            url: "https://www.youtube.com/watch?v=i0hg9jFAYdc"
        }
    ],

    // ── History Bites: Bucket Wars ──────────────────────────────────────,

    "bw_1": [
        {
            type: "primary", tier: "medium",
            title: "Giovanni Sercambi, Le Croniche di Luccha (c. 1368–1424) — contemporary Tuscan chronicle depicting Guelph-Ghibelline strife",
            publisher: "Wikipedia (sourced overview of the primary chronicle)",
            url: "https://en.wikipedia.org/wiki/Giovanni_Sercambi"
        },
        {
            type: "secondary", tier: "high",
            title: "Guelphs and Ghibellines — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Guelphs_and_Ghibellines"
        },
        {
            type: "video", tier: "high",
            title: "The War of the Bucket",
            publisher: "OverSimplified",
            url: "https://www.youtube.com/watch?v=Cln0J87vulU"
        }
    ],

    "bw_2": [
        {
            type: "primary", tier: "medium",
            title: "Alessandro Tassoni, La secchia rapita (The Rape of the Bucket, 1622) — the mock-heroic poem that popularized the bucket-theft legend",
            publisher: "Wikipedia (sourced overview of the primary text)",
            url: "https://en.wikipedia.org/wiki/La_secchia_rapita"
        },
        {
            type: "secondary", tier: "high",
            title: "War of the Bucket — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/War_of_the_Bucket"
        },
        {
            type: "video", tier: "high",
            title: "The War of the Bucket",
            publisher: "OverSimplified",
            url: "https://www.youtube.com/watch?v=Cln0J87vulU"
        }
    ],

    "bw_3": [
        {
            type: "primary", tier: "medium",
            title: "Contemporary Bolognese and Modenese chronicle accounts of the Battle of Zappolino (15 November 1325)",
            publisher: "Wikipedia (sourced overview of the primary chronicles)",
            url: "https://en.wikipedia.org/wiki/War_of_the_Bucket"
        },
        {
            type: "secondary", tier: "high",
            title: "The Battle of Zappolino (1325) — overview",
            publisher: "Medieval Archives",
            url: "https://medievalarchives.com/2026/04/29/the-battle-of-zappolino-1325/"
        },
        {
            type: "video", tier: "high",
            title: "The War of the Bucket",
            publisher: "OverSimplified",
            url: "https://www.youtube.com/watch?v=Cln0J87vulU"
        }
    ],

    "bw_4": [
        {
            type: "primary", tier: "medium",
            title: "Alessandro Tassoni, La secchia rapita (1622) — literary treatment of Bologna's humiliation and the captured bucket's fate",
            publisher: "Wikipedia (sourced overview of the primary text)",
            url: "https://en.wikipedia.org/wiki/La_secchia_rapita"
        },
        {
            type: "secondary", tier: "high",
            title: "War of the Bucket — aftermath",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/War_of_the_Bucket"
        },
        {
            type: "video", tier: "high",
            title: "The War of the Bucket",
            publisher: "OverSimplified",
            url: "https://www.youtube.com/watch?v=Cln0J87vulU"
        }
    ],

    "bw_5": [
        {
            type: "primary", tier: "medium",
            title: "The bucket itself, preserved in the Torre della Ghirlandina, Modena — the physical relic and its civic legend",
            publisher: "Wikipedia (sourced overview of the primary artifact)",
            url: "https://en.wikipedia.org/wiki/War_of_the_Bucket"
        },
        {
            type: "secondary", tier: "high",
            title: "Guelphs and Ghibellines — decline and legacy",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Guelphs_and_Ghibellines"
        },
        {
            type: "video", tier: "medium",
            title: "The War of the Bucket",
            publisher: "OverSimplified",
            url: "https://www.youtube.com/watch?v=Cln0J87vulU"
        }
    ],

    // ── History Bites: Trade Networks ───────────────────────────────────,

    "trade_1": [
        {
            type: "primary", tier: "high",
            title: "Marco Polo, The Travels of Marco Polo (c. 1300) — eyewitness account of Silk Road cities and Kublai Khan's court",
            publisher: "Wikipedia (sourced overview of the primary text)",
            url: "https://en.wikipedia.org/wiki/The_Travels_of_Marco_Polo"
        },
        {
            type: "secondary", tier: "high",
            title: "Silk Road — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Silk_Road"
        },
        {
            type: "video", tier: "high",
            title: "The Silk Road and Ancient Trade",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=vfe-eNq-Qyg"
        }
    ],

    "trade_2": [
        {
            type: "primary", tier: "high",
            title: "Ibn Battuta, The Rihla (Travels in Asia and Africa, 1325–1354) — eyewitness account of Indian Ocean port cities and trade",
            publisher: "Internet History Sourcebooks Project, Fordham University",
            url: "https://sourcebooks.web.fordham.edu/source/1354-ibnbattuta.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "Indian Ocean trade — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Indian_Ocean_trade"
        },
        {
            type: "video", tier: "high",
            title: "International Commerce, Snorkeling Camels, and the Indian Ocean Trade",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=a6XtBLDmPA0"
        }
    ],

    "trade_3": [
        {
            type: "primary", tier: "high",
            title: "Olaudah Equiano, The Interesting Narrative of the Life of Olaudah Equiano (1789) — a survivor's firsthand account of enslavement and the Middle Passage",
            publisher: "Project Gutenberg",
            url: "https://www.gutenberg.org/files/15399/15399-h/15399-h.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Atlantic slave trade — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Atlantic_slave_trade"
        },
        {
            type: "video", tier: "high",
            title: "The Atlantic Slave Trade",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=dnV_MTFEGIY"
        }
    ],

    // ── History Bites: Age of Reason ─────────────────────────────────────,

    "ree_1": [
        {
            type: "primary", tier: "high",
            title: "Giorgio Vasari, Lives of the Most Eminent Painters, Sculptors & Architects (1550/1568) — the foundational contemporary account of the Renaissance's origins",
            publisher: "Project Gutenberg",
            url: "https://www.gutenberg.org/ebooks/25326"
        },
        {
            type: "secondary", tier: "high",
            title: "Italian Renaissance — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Italian_Renaissance"
        },
        {
            type: "video", tier: "high",
            title: "The Renaissance: Was it a Thing?",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=Vufba_ZcoR0"
        }
    ],

    "ree_2": [
        {
            type: "primary", tier: "high",
            title: "Giorgio Vasari, Lives of the Most Eminent Painters, Sculptors & Architects (1550/1568) — contemporary biographies of High Renaissance masters",
            publisher: "Project Gutenberg",
            url: "https://www.gutenberg.org/files/32362/32362-h/32362-h.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "High Renaissance — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/High_Renaissance"
        },
        {
            type: "video", tier: "high",
            title: "The Renaissance: Was it a Thing?",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=Vufba_ZcoR0"
        }
    ],

    "ree_3": [
        {
            type: "primary", tier: "high",
            title: "Martin Luther, The Ninety-Five Theses (1517) — full text",
            publisher: "Internet History Sourcebooks Project, Fordham University",
            url: "https://sourcebooks.web.fordham.edu/source/luther95.txt"
        },
        {
            type: "secondary", tier: "high",
            title: "Protestant Reformation — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Reformation"
        },
        {
            type: "video", tier: "high",
            title: "The Protestant Reformation",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=0eO0pPrGi6o"
        }
    ],

    "ree_4": [
        {
            type: "primary", tier: "high",
            title: "Peace of Westphalia (1648) — full treaty text",
            publisher: "The Avalon Project, Yale Law School",
            url: "https://avalon.law.yale.edu/17th_century/westphal.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "European wars of religion — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/European_wars_of_religion"
        },
        {
            type: "video", tier: "high",
            title: "Reformation and Consequences",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=PbBDP1Elbbg"
        }
    ],

    "ree_5": [
        {
            type: "primary", tier: "high",
            title: "The Crime of Galileo: Indictment, Sentence and Abjuration (1633) — full text of the Inquisition's trial documents",
            publisher: "Internet History Sourcebooks Project, Fordham University",
            url: "https://sourcebooks.web.fordham.edu/mod/1630galileo.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "Galileo affair — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Galileo_affair"
        },
        {
            type: "video", tier: "high",
            title: "Scientific Revolution",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=w70BkCqgyyI"
        }
    ],

    "ree_extra_1": [
        {
            type: "primary", tier: "high",
            title: "Isaac Newton, Philosophiae Naturalis Principia Mathematica (1687) — the foundational text of classical mechanics",
            publisher: "Project Gutenberg (English translation)",
            url: "https://www.gutenberg.org/files/76404/76404-h/76404-h.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Scientific Revolution — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Scientific_Revolution"
        },
        {
            type: "video", tier: "high",
            title: "Scientific Revolution",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=w70BkCqgyyI"
        }
    ],

    "ree_extra_2": [
        {
            type: "primary", tier: "high",
            title: "Jean-Jacques Rousseau, The Social Contract (1762) — full text",
            publisher: "Project Gutenberg",
            url: "https://www.gutenberg.org/files/46333/46333-h/46333-h.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Age of Enlightenment — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Age_of_Enlightenment"
        },
        {
            type: "video", tier: "high",
            title: "The Enlightenment",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=NnoFj2cMRLY"
        }
    ],

    "ree_6": [
        {
            type: "primary", tier: "high",
            title: "John Locke, Second Treatise of Government (1690) — full text",
            publisher: "Project Gutenberg",
            url: "https://www.gutenberg.org/files/7370/7370-h/7370-h.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Age of Enlightenment — spread of ideas",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Age_of_Enlightenment"
        },
        {
            type: "video", tier: "high",
            title: "The Enlightenment",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=NnoFj2cMRLY"
        }
    ],

    // ── History Bites: Rotten Tomatoes ───────────────────────────────────,

    "tp_1": [
        {
            type: "primary", tier: "high",
            title: "Bernardino de Sahagún, Florentine Codex (General History of the Things of New Spain, 1545–1590) — the earliest ethnographic record of Aztec tomato varieties and market use",
            publisher: "World Digital Library",
            url: "https://www.wdl.org/es/item/10621/#collection=florentine-codex"
        },
        {
            type: "secondary", tier: "high",
            title: "Tomato — history and etymology",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Tomato"
        },
        {
            type: "video", tier: "high",
            title: "The Wild Story of Tomatoes: From \"Poison Apple\" to Pizza Sauce",
            publisher: "Weird History Food",
            url: "https://www.youtube.com/watch?v=AN00PtRWjlU"
        }
    ],

    "tp_2": [
        {
            type: "primary", tier: "medium",
            title: "Pietro Andrea Mattioli's commentary on Dioscorides (1544) — the first European description of the tomato, classifying it as a \"golden apple\"",
            publisher: "The Garden History Blog (sourced overview and translated excerpts of the primary text)",
            url: "https://thegardenhistory.blog/2022/07/30/love-apples-and-wolf-peaches/"
        },
        {
            type: "secondary", tier: "high",
            title: "Tomato — arrival and adoption in Europe",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Tomato"
        },
        {
            type: "video", tier: "high",
            title: "The Wild Story of Tomatoes: From \"Poison Apple\" to Pizza Sauce",
            publisher: "Weird History Food",
            url: "https://www.youtube.com/watch?v=AN00PtRWjlU"
        }
    ],

    "tp_3": [
        {
            type: "primary", tier: "high",
            title: "John Gerard, The Herball, or Generall Historie of Plantes (1597) — the influential English text calling the tomato \"of ranke and stinking savour\"",
            publisher: "Internet Archive (digitised 1597 original)",
            url: "https://archive.org/details/bim_early-english-books-1475-1640_the-herball-_gerard-john_1597"
        },
        {
            type: "secondary", tier: "high",
            title: "Tomato — early modern European reception",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Tomato"
        },
        {
            type: "video", tier: "high",
            title: "The Wild Story of Tomatoes: From \"Poison Apple\" to Pizza Sauce",
            publisher: "Weird History Food",
            url: "https://www.youtube.com/watch?v=AN00PtRWjlU"
        }
    ],

    "tp_4": [
        {
            type: "primary", tier: "medium",
            title: "18th-century accounts of tomato-linked illness among European aristocrats eating from pewter tableware — the origin of the \"poison apple\" legend",
            publisher: "Smithsonian Magazine (sourced historical account, incl. the disputed lead-leaching explanation)",
            url: "https://www.smithsonianmag.com/history/how-the-misrepresentation-of-tomatoes-as-stinking-poison-apples-that-provoked-vomiting-made-people-afraid-of-them-for-more-than-200-years-863735/"
        },
        {
            type: "secondary", tier: "high",
            title: "Tomato — the \"poison apple\" myth",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Tomato"
        },
        {
            type: "video", tier: "high",
            title: "The Wild Story of Tomatoes: From \"Poison Apple\" to Pizza Sauce",
            publisher: "Weird History Food",
            url: "https://www.youtube.com/watch?v=AN00PtRWjlU"
        }
    ],

    "tp_5": [
        {
            type: "primary", tier: "medium",
            title: "\"Naples Letter,\" South London Chronicle (22 December 1860) — a contemporary eyewitness description of 19th-century Neapolitan pizza with tomato and mozzarella",
            publisher: "Tasting History (sourced primary-text excerpt)",
            url: "https://www.tastinghistory.com/recipes/margheritapizza"
        },
        {
            type: "secondary", tier: "high",
            title: "History of pizza — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/History_of_pizza"
        },
        {
            type: "video", tier: "high",
            title: "Pizza from 19th Century Naples",
            publisher: "Tasting History",
            url: "https://www.youtube.com/watch?v=7oHqZbOjl48"
        }
    ],

    // ── History Bites: US History ────────────────────────────────────────,

    "us_1": [
        {
            type: "primary", tier: "high",
            title: "The Declaration of Independence (1776) — full text",
            publisher: "U.S. National Archives",
            url: "https://www.archives.gov/founding-docs/declaration-transcript"
        },
        {
            type: "secondary", tier: "high",
            title: "American Revolution — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/American_Revolution"
        },
        {
            type: "video", tier: "high",
            title: "Who Won the American Revolution?",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=3EiSymRrKI4"
        }
    ],

    "us_2": [
        {
            type: "primary", tier: "high",
            title: "The Emancipation Proclamation (1863) — full text",
            publisher: "U.S. National Archives",
            url: "https://www.archives.gov/milestone-documents/emancipation-proclamation"
        },
        {
            type: "secondary", tier: "high",
            title: "American Civil War — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/American_Civil_War"
        },
        {
            type: "video", tier: "high",
            title: "The Civil War, Part 2",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=GzTrKccmj_I"
        }
    ],

    "us_3": [
        {
            type: "primary", tier: "high",
            title: "Woodrow Wilson's War Message to Congress (2 April 1917) — full text",
            publisher: "U.S. National Archives",
            url: "https://www.archives.gov/milestone-documents/address-to-congress-declaration-of-war-against-germany"
        },
        {
            type: "secondary", tier: "high",
            title: "Second Industrial Revolution in the United States — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Second_Industrial_Revolution"
        },
        {
            type: "video", tier: "high",
            title: "America in World War I",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=y59wErqg4Xg"
        }
    ],

    "us_4": [
        {
            type: "primary", tier: "high",
            title: "FDR's \"Day of Infamy\" Speech (8 December 1941) — full text",
            publisher: "U.S. National Archives",
            url: "https://www.archives.gov/milestone-documents/joint-address-to-congress-declaration-of-war-against-japan"
        },
        {
            type: "secondary", tier: "high",
            title: "Great Depression — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Great_Depression"
        },
        {
            type: "video", tier: "high",
            title: "The Great Depression",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=GCQfMWAikyU"
        }
    ],

    "us_5": [
        {
            type: "primary", tier: "high",
            title: "The Truman Doctrine (12 March 1947) — full text",
            publisher: "The Avalon Project, Yale Law School",
            url: "https://avalon.law.yale.edu/20th_century/trudoc.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "Cold War — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Cold_War"
        },
        {
            type: "video", tier: "high",
            title: "The Cold War",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=9C72ISMF_D0"
        }
    ],

    // ── History Bites: Industrial Revolution ─────────────────────────────,

    "ir_1": [
        {
            type: "primary", tier: "high",
            title: "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations (1776) — the foundational text on the division of labour that presaged industrial production",
            publisher: "Project Gutenberg",
            url: "https://www.gutenberg.org/files/3300/3300-h/3300-h.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Industrial Revolution — origins",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Industrial_Revolution"
        },
        {
            type: "video", tier: "high",
            title: "The Industrial Revolution",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=zjK7PWmRRyg"
        }
    ],

    "ir_2": [
        {
            type: "primary", tier: "high",
            title: "The Sadler Committee Report (1832) — parliamentary testimony from child textile-mill workers on factory conditions",
            publisher: "Hanover College History Department (sourced full-text excerpts)",
            url: "https://history.hanover.edu/courses/excerpts/111sad.html"
        },
        {
            type: "secondary", tier: "high",
            title: "Factory system — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Factory_system"
        },
        {
            type: "video", tier: "high",
            title: "The Industrial Revolution",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=zjK7PWmRRyg"
        }
    ],

    "ir_3": [
        {
            type: "primary", tier: "high",
            title: "James Watt's Patent No. 913 (1769) — \"A New Invented Method of Lessening the Consumption of Steam and Fuel in Fire Engines,\" digitised original specification",
            publisher: "Wikimedia Commons (digitised 1769 patent)",
            url: "https://upload.wikimedia.org/wikipedia/commons/0/0d/James_Watt_Patent_1769_No_913.pdf"
        },
        {
            type: "secondary", tier: "high",
            title: "Watt steam engine — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Watt_steam_engine"
        },
        {
            type: "video", tier: "high",
            title: "The Industrial Revolution",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=zjK7PWmRRyg"
        }
    ],

    "ir_4": [
        {
            type: "primary", tier: "high",
            title: "Sites of Japan's Meiji Industrial Revolution — UNESCO World Heritage nomination documentation on the transfer of industrialization beyond Europe",
            publisher: "UNESCO World Heritage Centre",
            url: "https://whc.unesco.org/en/list/1484/"
        },
        {
            type: "secondary", tier: "high",
            title: "Second Industrial Revolution — global spread",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Second_Industrial_Revolution"
        },
        {
            type: "video", tier: "high",
            title: "Coal, Steam, and The Industrial Revolution",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=zhL5DCizj5c"
        }
    ],

    "ir_5": [
        {
            type: "primary", tier: "high",
            title: "Thomas Edison's Patent Application for the Light Bulb (1880) — the historic patent for his practical incandescent lamp",
            publisher: "U.S. National Archives",
            url: "https://www.archives.gov/milestone-documents/thomas-edisons-patent-application-for-the-light-bulb"
        },
        {
            type: "secondary", tier: "high",
            title: "Second Industrial Revolution — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Second_Industrial_Revolution"
        },
        {
            type: "video", tier: "high",
            title: "Ford, Cars, and a New Revolution",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=UPvwpYeOJnI"
        }
    ],

    // ── Mali ────────────────────────────────────────────────────────────
});
