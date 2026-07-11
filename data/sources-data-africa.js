// Curated primary/secondary/video sources for Africa scenes (Mali, Ethiopia, Egypt, South Africa, etc).
// Split from the original sources-data.js to keep per-file size down; each file
// merges into the shared window.WHD_SOURCES object rather than reassigning it,
// so files can load in any order without clobbering each other.
window.WHD_SOURCES = Object.assign(window.WHD_SOURCES || {}, {

    "mali_ghana_empire": [
        {
            type: "primary", tier: "high",
            title: "Al-Bakri, The Book of Routes and Realms (1068 CE) — the fullest surviving contemporary Arab description of the Ghana Empire's capital, court and gold trade",
            publisher: "Boston University African Studies Center (K-16 Education Outreach, sourced primary-text excerpts)",
            url: "https://www.bu.edu/africa/outreach/teachingresources/history/ancient-to-medieval-history/k_o_ghana/"
        },
        {
            type: "secondary", tier: "high",
            title: "Ghana Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Ghana_Empire"
        },
        {
            type: "video", tier: "high",
            title: "The Empire of Mali - The Twang of a Bow",
            publisher: "Extra History",
            url: "https://www.youtube.com/watch?v=UkayShPilkw"
        }
    ],

    "mali_sundiata": [
        {
            type: "primary", tier: "high",
            title: "D.T. Niane, Sundiata: An Epic of Old Mali (1960, trans. G.D. Pickett) — the standard published rendering of the Mandinka griot oral epic of Sundiata Keita",
            publisher: "Internet Archive (Niane / Pickett translation)",
            url: "https://archive.org/details/sundiataepicofol0000nian"
        },
        {
            type: "secondary", tier: "high",
            title: "Epic of Sundiata — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Epic_of_Sundiata"
        },
        {
            type: "video", tier: "high",
            title: "The Empire of Mali - The Twang of a Bow",
            publisher: "Extra History",
            url: "https://www.youtube.com/watch?v=UkayShPilkw"
        }
    ],

    "mali_empire_trade": [
        {
            type: "primary", tier: "high",
            title: "Al-Umari, Masalik al-Absar (c. 1337–38 CE) — a Cairo scholar's contemporary account of Mali's gold-and-salt trade and Mansa Musa's court, drawn from firsthand informants",
            publisher: "World History Commons (sourced translated excerpts)",
            url: "https://worldhistorycommons.org/al-umaris-account-mansa-musas-visit-cairo"
        },
        {
            type: "secondary", tier: "high",
            title: "Economy of the Mali Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Mali_Empire"
        },
        {
            type: "video", tier: "high",
            title: "The Empire of Mali - An Empire of Trade and Faith",
            publisher: "Extra History",
            url: "https://www.youtube.com/watch?v=YPytwp5ll9g"
        }
    ],

    "mali_mansa_musa": [
        {
            type: "primary", tier: "high",
            title: "Al-Umari's account of Mansa Musa's pilgrimage to Cairo (1324 CE) — a contemporary Arab historian's record of the visit, gathered from Cairene eyewitnesses",
            publisher: "Boston University African Studies Center (K-16 Education Outreach)",
            url: "https://www.bu.edu/africa/outreach/teachingresources/history/ancient-to-medieval-history/k_o_mali/"
        },
        {
            type: "secondary", tier: "high",
            title: "Mansa Musa — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Mansa_Musa"
        },
        {
            type: "video", tier: "high",
            title: "The Empire of Mali - Mansa Musa",
            publisher: "Extra History",
            url: "https://www.youtube.com/watch?v=4-Un2xx6Pzo"
        }
    ],

    "mali_djinguereber": [
        {
            type: "primary", tier: "medium",
            title: "Ibn Khaldun's and Al-Umari's accounts of Mansa Musa's building projects, including the Djinguereber Mosque commissioned after his 1324–25 pilgrimage",
            publisher: "Wikipedia (sourced overview citing the primary Arabic chronicles)",
            url: "https://en.wikipedia.org/wiki/Djinguereber_Mosque"
        },
        {
            type: "secondary", tier: "high",
            title: "Djinguereber Mosque — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Djinguereber_Mosque"
        },
        {
            type: "video", tier: "high",
            title: "The Empire of Mali - Mansa Musa",
            publisher: "Extra History",
            url: "https://www.youtube.com/watch?v=4-Un2xx6Pzo"
        }
    ],

    "mali_timbuktu_scholars": [
        {
            type: "primary", tier: "high",
            title: "Leo Africanus, Description of Africa (1550 CE) — an eyewitness account of Timbuktu's scholars, judges and manuscript trade in its golden age",
            publisher: "Wikipedia (sourced translated excerpts)",
            url: "https://en.wikipedia.org/wiki/Leo_Africanus"
        },
        {
            type: "secondary", tier: "high",
            title: "Timbuktu Manuscripts — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Timbuktu_Manuscripts"
        },
        {
            type: "video", tier: "high",
            title: "Recreating Angkor Wat: The City Of The God Kings",
            publisher: "Timeline - World History Documentaries",
            url: "https://www.youtube.com/watch?v=KsDGDzwuQ-I"
        }
    ],

    "mali_empire_decline": [
        {
            type: "primary", tier: "medium",
            title: "Tarikh al-Sudan (c. 1655 CE) and Tarikh al-Fattash — the Timbuktu chronicles' retrospective account of Mali's 14th–15th century fragmentation",
            publisher: "Wikipedia (sourced overview of the primary chronicles)",
            url: "https://en.wikipedia.org/wiki/Tarikh_al-Sudan"
        },
        {
            type: "secondary", tier: "high",
            title: "Mali Empire — decline",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Mali_Empire"
        },
        {
            type: "video", tier: "high",
            title: "The Empire of Mali - The Cracks Begin to Show",
            publisher: "Extra History",
            url: "https://www.youtube.com/watch?v=lkTF0TGBDNc"
        }
    ],

    "mali_sunni_ali": [
        {
            type: "primary", tier: "medium",
            title: "Tarikh al-Sudan (c. 1655 CE) — the Timbuktu chronicle's account of Sunni Ali's conquests and his fraught relationship with the city's Muslim scholars",
            publisher: "Wikipedia (sourced overview of the primary chronicle)",
            url: "https://en.wikipedia.org/wiki/Tarikh_al-Sudan"
        },
        {
            type: "secondary", tier: "high",
            title: "Sunni Ali — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Sunni_Ali"
        },
        {
            type: "video", tier: "high",
            title: "The Songhai Empire — Africa's Age of Gold",
            publisher: "Fall of Civilizations",
            url: "https://www.youtube.com/watch?v=GfUT6LhBBYs"
        }
    ],

    "mali_askia_muhammad": [
        {
            type: "primary", tier: "high",
            title: "Leo Africanus, Description of Africa (1550 CE) — an eyewitness account of Gao and Timbuktu under Askia Muhammad's rule",
            publisher: "Wikipedia (sourced translated excerpts)",
            url: "https://en.wikipedia.org/wiki/Leo_Africanus"
        },
        {
            type: "secondary", tier: "high",
            title: "Askia Muhammad I — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Askia_Muhammad_I"
        },
        {
            type: "video", tier: "high",
            title: "The Songhai Empire — Africa's Age of Gold",
            publisher: "Fall of Civilizations",
            url: "https://www.youtube.com/watch?v=GfUT6LhBBYs"
        }
    ],

    "mali_tondibi": [
        {
            type: "primary", tier: "medium",
            title: "Tarikh al-Sudan (c. 1655 CE) — the Timbuktu chronicle's firsthand account of the Moroccan army's 1591 victory at Tondibi and the empire's collapse into chaos",
            publisher: "Wikipedia (sourced overview of the primary chronicle)",
            url: "https://en.wikipedia.org/wiki/Tarikh_al-Sudan"
        },
        {
            type: "secondary", tier: "high",
            title: "Battle of Tondibi — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Battle_of_Tondibi"
        },
        {
            type: "video", tier: "high",
            title: "The Songhai Empire — Africa's Age of Gold",
            publisher: "Fall of Civilizations",
            url: "https://www.youtube.com/watch?v=GfUT6LhBBYs"
        }
    ],

    "mali_bambara_kingdoms": [
        {
            type: "primary", tier: "high",
            title: "Mungo Park, Travels in the Interior Districts of Africa (1799) — the first European eyewitness account of Ségou, capital of the Bambara Kingdom",
            publisher: "Project Gutenberg",
            url: "https://www.gutenberg.org/files/5266/5266-h/5266-h.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Bamana Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Bamana_Empire"
        },
        {
            type: "video", tier: "medium",
            title: "The ENTIRE History of Mali Empire",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=U0c6249Ew50"
        }
    ],

    "mali_umar_tall": [
        {
            type: "primary", tier: "medium",
            title: "Al-Hajj Umar Tall, Bayān mā waqaʿa (his own apologia justifying the jihad against Hamdallahi) — annotated French translation by Mahibou & Triaud (1983)",
            publisher: "Wikipedia (sourced overview of the primary text)",
            url: "https://en.wikipedia.org/wiki/Omar_Saidou_Tall"
        },
        {
            type: "secondary", tier: "high",
            title: "Toucouleur Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Tukolor_Empire"
        },
        {
            type: "video", tier: "medium",
            title: "Is Mali's military government losing control?",
            publisher: "Al Jazeera English",
            url: "https://www.youtube.com/watch?v=G_-7gbZo430"
        }
    ],

    "mali_samori_resistance": [
        {
            type: "primary", tier: "high",
            title: "The Treaty of Bissandougou (1887) between Samori Touré and the French colonial administration — the primary diplomatic document of Samori's delaying strategy against French conquest",
            publisher: "Wikipedia (sourced overview of the primary treaty)",
            url: "https://en.wikipedia.org/wiki/Samori_Ture"
        },
        {
            type: "secondary", tier: "high",
            title: "Wassoulou Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Wassoulou_Empire"
        },
        {
            type: "video", tier: "medium",
            title: "Is Mali's military government losing control?",
            publisher: "Al Jazeera English",
            url: "https://www.youtube.com/watch?v=G_-7gbZo430"
        }
    ],

    "mali_french_colonial": [
        {
            type: "primary", tier: "medium",
            title: "French colonial administrative records establishing Soudan Français (French Sudan) within French West Africa",
            publisher: "Wikipedia (sourced overview of the colonial administrative history)",
            url: "https://en.wikipedia.org/wiki/French_Sudan"
        },
        {
            type: "secondary", tier: "high",
            title: "French Sudan — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/French_Sudan"
        },
        {
            type: "video", tier: "medium",
            title: "Is Mali's military government losing control?",
            publisher: "Al Jazeera English",
            url: "https://www.youtube.com/watch?v=G_-7gbZo430"
        }
    ],

    "mali_independence": [
        {
            type: "primary", tier: "high",
            title: "Proclamation of the Republic of Mali (22 September 1960) following the dissolution of the Mali Federation",
            publisher: "Wikipedia (sourced overview of the primary declaration)",
            url: "https://en.wikipedia.org/wiki/Mali_Federation"
        },
        {
            type: "secondary", tier: "high",
            title: "Modibo Keïta — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Modibo_Ke%C3%AFta"
        },
        {
            type: "video", tier: "high",
            title: "Is Mali's military government losing control?",
            publisher: "Al Jazeera English",
            url: "https://www.youtube.com/watch?v=G_-7gbZo430"
        }
    ],

    "mali_traore_dictatorship": [
        {
            type: "primary", tier: "medium",
            title: "Records of the 1968 coup d'état establishing Moussa Traoré's military government",
            publisher: "Wikipedia (sourced overview)",
            url: "https://en.wikipedia.org/wiki/Moussa_Traor%C3%A9"
        },
        {
            type: "secondary", tier: "high",
            title: "Moussa Traoré — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Moussa_Traor%C3%A9"
        },
        {
            type: "video", tier: "high",
            title: "Is Mali's military government losing control?",
            publisher: "Al Jazeera English",
            url: "https://www.youtube.com/watch?v=G_-7gbZo430"
        }
    ],

    "mali_democracy": [
        {
            type: "primary", tier: "medium",
            title: "The 1992 Constitution of Mali, adopted following Traoré's overthrow and Alpha Oumar Konaré's election",
            publisher: "Wikipedia (sourced overview)",
            url: "https://en.wikipedia.org/wiki/Alpha_Oumar_Konar%C3%A9"
        },
        {
            type: "secondary", tier: "high",
            title: "Alpha Oumar Konaré — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Alpha_Oumar_Konar%C3%A9"
        },
        {
            type: "video", tier: "high",
            title: "Timeline: How Mali went from democracy beacon to instability",
            publisher: "Al Jazeera English",
            url: "https://www.aljazeera.com/news/2026/4/27/timeline-how-mali-went-from-democracy-beacon-to-instability"
        }
    ],

    "mali_2012_crisis": [
        {
            type: "primary", tier: "high",
            title: "MNLA Declaration of the Independence of Azawad (6 April 2012) — the rebel movement's own political declaration issued from Gao",
            publisher: "Wikipedia (sourced overview of the primary declaration)",
            url: "https://en.wikipedia.org/wiki/Azawad"
        },
        {
            type: "secondary", tier: "high",
            title: "Mali War — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Mali_War"
        },
        {
            type: "video", tier: "high",
            title: "Is Mali's military government losing control?",
            publisher: "Al Jazeera English",
            url: "https://www.youtube.com/watch?v=G_-7gbZo430"
        }
    ],

    "mali_modern_instability": [
        {
            type: "primary", tier: "medium",
            title: "Statements from Mali's transitional military government (2020–2026), including the National Committee for the Salvation of the People's public declarations",
            publisher: "Al Jazeera (sourced reporting on the primary government statements)",
            url: "https://www.aljazeera.com/news/2026/4/26/mali-rattled-by-ongoing-armed-attacks-what-to-know"
        },
        {
            type: "secondary", tier: "high",
            title: "Timeline: How Mali went from democracy beacon to instability",
            publisher: "Al Jazeera English",
            url: "https://www.aljazeera.com/news/2026/4/27/timeline-how-mali-went-from-democracy-beacon-to-instability"
        },
        {
            type: "video", tier: "high",
            title: "Is Mali's military government losing control?",
            publisher: "Al Jazeera English",
            url: "https://www.youtube.com/watch?v=G_-7gbZo430"
        }
    ],

    // ── Poland ──────────────────────────────────────────────────────────,

    "sa_1": [
        {
            type: "primary", tier: "high",
            title: "Maloti-Drakensberg Park rock art sites — one of the largest and most concentrated collections of San rock paintings in Africa, dating back millennia",
            publisher: "UNESCO World Heritage Centre",
            url: "https://whc.unesco.org/en/list/985/"
        },
        {
            type: "secondary", tier: "high",
            title: "San people — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/San_people"
        },
        {
            type: "video", tier: "high",
            title: "Mother Africa — History Of Africa with Zeinab Badawi [Episode 1]",
            publisher: "BBC News Africa",
            url: "https://www.youtube.com/watch?v=ETnIsBnNRr0"
        }
    ],

    "sa_2": [
        {
            type: "primary", tier: "high",
            title: "Kasteelberg, Western Cape — the key excavated archaeological site documenting the emergence of Khoekhoe pastoralism in southern Africa, as described firsthand by its excavator",
            publisher: "The Heritage Portal (Prof. Andrew B. Smith, University of Cape Town)",
            url: "http://www.theheritageportal.co.za/article/place-kasteelberg-khoekhoe-history"
        },
        {
            type: "secondary", tier: "high",
            title: "Khoikhoi — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Khoikhoi"
        },
        {
            type: "video", tier: "high",
            title: "Cattle, Crops and Iron — History Of Africa with Zeinab Badawi [Episode 2]",
            publisher: "BBC News Africa",
            url: "https://www.youtube.com/watch?v=Srlf_xltWfc"
        }
    ],

    "sa_3": [
        {
            type: "primary", tier: "medium",
            title: "Early Iron Age ceramic sequences (Blackburn and related traditions, c. 5th–11th centuries CE) — the archaeological record documenting the southward migration of Bantu-speaking farming communities into southern Africa",
            publisher: "Wikipedia (sourced overview of the primary archaeological record)",
            url: "https://en.wikipedia.org/wiki/Bantu_expansion"
        },
        {
            type: "secondary", tier: "high",
            title: "Bantu expansion — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Bantu_expansion"
        },
        {
            type: "video", tier: "high",
            title: "Cattle, Crops and Iron — History Of Africa with Zeinab Badawi [Episode 2]",
            publisher: "BBC News Africa",
            url: "https://www.youtube.com/watch?v=Srlf_xltWfc"
        }
    ],

    "sa_4": [
        {
            type: "primary", tier: "medium",
            title: "Early Iron Age settlement sites in the Limpopo and Mpumalanga lowveld (c. 1000–1200 CE) — the archaeological record of the farming and metalworking communities that preceded Mapungubwe",
            publisher: "Wikipedia (sourced overview of the primary archaeological record)",
            url: "https://en.wikipedia.org/wiki/Mapungubwe#History"
        },
        {
            type: "secondary", tier: "high",
            title: "History of South Africa — Early Iron Age",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/History_of_South_Africa"
        },
        {
            type: "video", tier: "medium",
            title: "Cattle, Crops and Iron — History Of Africa with Zeinab Badawi [Episode 2]",
            publisher: "BBC News Africa",
            url: "https://www.youtube.com/watch?v=Srlf_xltWfc"
        }
    ],

    "sa_5": [
        {
            type: "primary", tier: "high",
            title: "Mapungubwe Hill — archaeological site of the royal capital of southern Africa's first known kingdom, including the famous gold rhinoceros burial find",
            publisher: "UNESCO World Heritage Centre",
            url: "https://whc.unesco.org/en/list/1099/"
        },
        {
            type: "secondary", tier: "high",
            title: "Kingdom of Mapungubwe — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Mapungubwe"
        },
        {
            type: "video", tier: "high",
            title: "Southern Kingdoms — History Of Africa with Zeinab Badawi [Episode 13]",
            publisher: "BBC News Africa",
            url: "https://www.youtube.com/watch?v=GdSupLM4zAA"
        }
    ],

    "sa_6": [
        {
            type: "primary", tier: "high",
            title: "Thulamela, Kruger National Park — a fortified Iron Age royal settlement showing direct architectural and material links to Great Zimbabwe's stone-building tradition",
            publisher: "SANParks (South African National Parks)",
            url: "https://www.sanparks.org/parks/kruger/conservation/scientific/ecological_journeys/thulamela.php"
        },
        {
            type: "secondary", tier: "high",
            title: "Great Zimbabwe — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Great_Zimbabwe"
        },
        {
            type: "video", tier: "high",
            title: "Southern Kingdoms — History Of Africa with Zeinab Badawi [Episode 13]",
            publisher: "BBC News Africa",
            url: "https://www.youtube.com/watch?v=GdSupLM4zAA"
        }
    ],

    "sa_7": [
        {
            type: "primary", tier: "medium",
            title: "Thulamela and related lowveld sites (14th–16th centuries CE) — archaeological evidence of the trade-connected regional kingdoms that flourished across northern South Africa in this period",
            publisher: "SANParks (South African National Parks)",
            url: "https://www.sanparks.org/parks/kruger/conservation/scientific/ecological_journeys/thulamela.php"
        },
        {
            type: "secondary", tier: "high",
            title: "Kingdom of Mutapa — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Kingdom_of_Mutapa"
        },
        {
            type: "video", tier: "high",
            title: "Southern Kingdoms — History Of Africa with Zeinab Badawi [Episode 13]",
            publisher: "BBC News Africa",
            url: "https://www.youtube.com/watch?v=GdSupLM4zAA"
        }
    ],

    "sa_8": [
        {
            type: "primary", tier: "high",
            title: "The Roteiro (journal) of Vasco da Gama's first voyage (1497–99, trans. E.G. Ravenstein, 1898) — the earliest firsthand European account of sailing the southern African coast and encountering local peoples along the way to the Indian Ocean trade world",
            publisher: "Internet Archive / Project Gutenberg (Hakluyt Society edition)",
            url: "https://archive.org/details/ajournalofthefir46440gut"
        },
        {
            type: "secondary", tier: "high",
            title: "Indian Ocean trade — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Indian_Ocean_trade"
        },
        {
            type: "video", tier: "medium",
            title: "Southern Kingdoms — History Of Africa with Zeinab Badawi [Episode 13]",
            publisher: "BBC News Africa",
            url: "https://www.youtube.com/watch?v=GdSupLM4zAA"
        }
    ],

    "sa_9": [
        {
            type: "primary", tier: "high",
            title: "The Journal of Jan van Riebeeck (1652–62) — the official day-by-day diary of the Dutch commander who founded the Cape refreshment station, including firsthand entries on Khoikhoi contact (e.g. the interpreter Krotoa/Eva)",
            publisher: "World History Commons (sourced translated excerpts, ed. H.B. Thom)",
            url: "https://worldhistorycommons.org/journal-jan-van-riebeeck"
        },
        {
            type: "secondary", tier: "high",
            title: "Jan van Riebeeck — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Jan_van_Riebeeck"
        },
        {
            type: "video", tier: "high",
            title: "Cape Colony: The Making of South Africa",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=-oeGWXCTrBw"
        }
    ],

    "sa_10": [
        {
            type: "primary", tier: "medium",
            title: "The VOC's 1709 proclamation limiting settlement beyond the Cape peninsula — a Company administrative order the trekboers ignored en masse as they pushed the colonial frontier eastward through the 18th century",
            publisher: "Wikipedia (sourced overview of the primary administrative record)",
            url: "https://en.wikipedia.org/wiki/Trekboers"
        },
        {
            type: "secondary", tier: "high",
            title: "Cape Colony — 18th-century expansion",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Cape_Colony"
        },
        {
            type: "video", tier: "medium",
            title: "Cape Colony: The Making of South Africa",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=-oeGWXCTrBw"
        }
    ],

    "sa_11": [
        {
            type: "primary", tier: "high",
            title: "The 1806 Cape Articles of Capitulation — the actual surrender terms signed by the Batavian and British commanders after the Battle of Blaauwberg, formalising British control of the Cape",
            publisher: "The O'Malley Archives (Nelson Mandela Foundation)",
            url: "https://omalley.nelsonmandela.org/index.php/site/q/03lv01538/04lv01646/05lv01647.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "History of the Cape Colony from 1806 to 1870 — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/History_of_the_Cape_Colony_from_1806_to_1870"
        },
        {
            type: "video", tier: "high",
            title: "Cape Colony: The Making of South Africa",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=-oeGWXCTrBw"
        }
    ],

    "sa_12": [
        {
            type: "primary", tier: "high",
            title: "Piet Retief's manifesto (published in the Grahamstown Journal, 2 February 1837) — the Voortrekker leader's own published statement of grievances justifying the Great Trek (a one-sided source reflecting only the Voortrekker viewpoint, not an objective account of the period)",
            publisher: "South African History Online",
            url: "https://sahistory.org.za/archive/retief-manifesto-grahams-town-journal-2-february-1837"
        },
        {
            type: "secondary", tier: "high",
            title: "Great Trek — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Great_Trek"
        },
        {
            type: "video", tier: "high",
            title: "The Great Trek Part 1 - The History of South Africa",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=kDHWAtk8zik"
        }
    ],

    "sa_13": [
        {
            type: "primary", tier: "medium",
            title: "Sir Bartle Frere's ultimatum to King Cetshwayo (December 1878) — the British high commissioner's own demand that precipitated the Anglo-Zulu War (note: the surviving written record of this war is almost entirely British/colonial, since Zulu accounts were transmitted orally and were rarely recorded at the time)",
            publisher: "Wikipedia (sourced overview of the primary ultimatum)",
            url: "https://en.wikipedia.org/wiki/Anglo-Zulu_War"
        },
        {
            type: "secondary", tier: "high",
            title: "Battle of Isandlwana — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Battle_of_Isandlwana"
        },
        {
            type: "video", tier: "high",
            title: "1879: The Bloodiest Battles Of The Anglo-Zulu War",
            publisher: "Timeline - World History Documentaries",
            url: "https://www.youtube.com/watch?v=gO2TsFNWmmg"
        }
    ],

    "sa_14": [
        {
            type: "primary", tier: "high",
            title: "President Paul Kruger's proclamation of the Witwatersrand goldfields (8 September 1886, published in the Staats Courant of the Zuid-Afrikaansche Republiek) — the founding government document behind the gold rush that created Johannesburg",
            publisher: "The Heritage Portal",
            url: "https://www.theheritageportal.co.za/article/johannesburg-goldfield-discovered"
        },
        {
            type: "secondary", tier: "high",
            title: "Witwatersrand Gold Rush — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Witwatersrand_Gold_Rush"
        },
        {
            type: "secondary", tier: "high",
            title: "Mineral Revolution — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Mineral_Revolution"
        },
        {
            type: "video", tier: "medium",
            title: "Cape Colony: The Making of South Africa",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=-oeGWXCTrBw"
        }
    ],

    "sa_15": [
        {
            type: "primary", tier: "high",
            title: "The Treaty of Vereeniging (31 May 1902) — full text of the peace treaty ending the Second Anglo-Boer War, including the clause deferring Black South Africans' political rights to the future all-white Union government",
            publisher: "Wikisource",
            url: "https://en.wikisource.org/wiki/Peace_of_Vereeniging"
        },
        {
            type: "secondary", tier: "high",
            title: "Second Boer War — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Second_Boer_War"
        },
        {
            type: "video", tier: "high",
            title: "The Boer War: 1899-1902 (Full Documentary)",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=Lw9X-nVbkfc"
        }
    ],

    "sa_16": [
        {
            type: "primary", tier: "high",
            title: "The South Africa Act, 1909 — full official text of the UK Parliament's act constituting the Union of South Africa, including the racially-restricted franchise provisions",
            publisher: "UK National Archives (legislation.gov.uk, official archived PDF)",
            url: "https://www.legislation.gov.uk/ukpga/Edw7/9/9/pdfs/ukpga_19090009_en.pdf"
        },
        {
            type: "secondary", tier: "high",
            title: "Union of South Africa — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Union_of_South_Africa"
        },
        {
            type: "video", tier: "medium",
            title: "Cape Colony: The Making of South Africa",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=-oeGWXCTrBw"
        }
    ],

    "sa_17": [
        {
            type: "primary", tier: "high",
            title: "The Population Registration Act, No. 30 of 1950 — full text of the foundational apartheid law that required every South African to be classified and registered by race",
            publisher: "Wikisource",
            url: "https://en.wikisource.org/wiki/Population_Registration_Act,_1950"
        },
        {
            type: "secondary", tier: "high",
            title: "Population Registration Act, 1950 — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Population_Registration_Act,_1950"
        },
        {
            type: "video", tier: "high",
            title: "Trevor McDonald Explores The History Of South Africa's Apartheid",
            publisher: "ITV (Our History)",
            url: "https://www.youtube.com/watch?v=oY6QEPkTWDo"
        }
    ],

    "sa_18": [
        {
            type: "primary", tier: "high",
            title: "The Freedom Charter (adopted 26 June 1955, Congress of the People, Kliptown) — the resistance movement's own founding statement of principles for a non-racial, democratic South Africa",
            publisher: "African National Congress (official text)",
            url: "https://www.anc1912.org.za/the-freedom-charter-2/"
        },
        {
            type: "secondary", tier: "high",
            title: "Freedom Charter — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Freedom_Charter"
        },
        {
            type: "video", tier: "high",
            title: "Trevor McDonald Explores The History Of South Africa's Apartheid",
            publisher: "ITV (Our History)",
            url: "https://www.youtube.com/watch?v=oY6QEPkTWDo"
        }
    ],

    "sa_19": [
        {
            type: "primary", tier: "high",
            title: "Nelson Mandela's speech on his release from prison (Cape Town City Hall, 11 February 1990) — his own first public words as a free man after 27 years' imprisonment",
            publisher: "Nelson Mandela Foundation (official archive)",
            url: "http://www.mandela.gov.za/mandela_speeches/1990/900211_release.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "History of South Africa (1990–1994) — negotiations to end apartheid",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/History_of_South_Africa_(1994%E2%80%93present)"
        },
        {
            type: "video", tier: "high",
            title: "Trevor McDonald Explores The History Of South Africa's Apartheid",
            publisher: "ITV (Our History)",
            url: "https://www.youtube.com/watch?v=oY6QEPkTWDo"
        }
    ],

    "sa_20": [
        {
            type: "primary", tier: "high",
            title: "The Constitution of the Republic of South Africa, 1996 — full official text, signed by President Nelson Mandela, establishing the country's post-apartheid democratic order and Bill of Rights",
            publisher: "South African Department of Justice and Constitutional Development",
            url: "https://www.justice.gov.za/constitution/SAConstitution-web-eng.pdf"
        },
        {
            type: "secondary", tier: "high",
            title: "Constitution of South Africa — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Constitution_of_South_Africa"
        },
        {
            type: "video", tier: "high",
            title: "South Africa: 30 Years after Apartheid",
            publisher: "ARTE.tv Documentary",
            url: "https://www.youtube.com/watch?v=s-Eiti4i2uc"
        }
    ],

    // ── Japan (Ancient & Medieval) ──────────────────────────────────────
});
