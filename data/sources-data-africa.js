// Curated primary/secondary/video sources for Africa scenes (Mali, Ethiopia, Egypt, South Africa, etc).
// Split from the original sources-data.js to keep per-file size down; each file
// merges into the shared window.WHD_SOURCES object rather than reassigning it,
// so files can load in any order without clobbering each other.
window.WHD_SOURCES = Object.assign(window.WHD_SOURCES || {}, {

    // ── Egypt ───────────────────────────────────────────────────────────
    "egy_1": [
        {
            type: "primary", tier: "high",
            title: "Predynastic Neolithic settlement material (Merimde, Badarian, Naqada cultures, c. 5000–3100 BCE) — the archaeological record of the earliest Nile Valley farming communities",
            publisher: "Wikipedia (sourced overview of the primary archaeological record)",
            url: "https://en.wikipedia.org/wiki/Prehistoric_Egypt"
        },
        {
            type: "secondary", tier: "high",
            title: "Prehistoric Egypt — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Prehistoric_Egypt"
        },
        {
            type: "video", tier: "high",
            title: "Planet Egypt: Birth of an Empire (Full Episode)",
            publisher: "HISTORY",
            url: "https://www.youtube.com/watch?v=b484AV-lE3Q"
        }
    ],

    "egy_2": [
        {
            type: "primary", tier: "high",
            title: "The Narmer Palette (c. 3100 BCE) — the ceremonial siltstone tablet depicting Narmer wearing both the White and Red Crowns, widely (though not unanimously) read as commemorating the unification of Upper and Lower Egypt",
            publisher: "Wikipedia (sourced overview, including the scholarly debate over its historical vs. ceremonial meaning)",
            url: "https://en.wikipedia.org/wiki/Narmer_Palette"
        },
        {
            type: "secondary", tier: "high",
            title: "Narmer — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Narmer"
        },
        {
            type: "video", tier: "high",
            title: "Planet Egypt: Birth of an Empire (Full Episode)",
            publisher: "HISTORY",
            url: "https://www.youtube.com/watch?v=b484AV-lE3Q"
        }
    ],

    "egy_3": [
        {
            type: "primary", tier: "high",
            title: "The Palermo Stone (Royal Annals of the Old Kingdom, c. 5th Dynasty) — the oldest surviving Egyptian king-list and yearly chronicle, recording the reigns from the First Dynasty into the Old Kingdom",
            publisher: "Wikipedia (sourced overview of the primary inscription)",
            url: "https://en.wikipedia.org/wiki/Palermo_Stone"
        },
        {
            type: "secondary", tier: "high",
            title: "Old Kingdom of Egypt — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Old_Kingdom_of_Egypt"
        },
        {
            type: "video", tier: "high",
            title: "Planet Egypt: Birth of an Empire (Full Episode)",
            publisher: "HISTORY",
            url: "https://www.youtube.com/watch?v=b484AV-lE3Q"
        }
    ],

    "egy_4": [
        {
            type: "primary", tier: "medium",
            title: "The Instructions for Merikare (composed during or shortly after the First Intermediate Period) — political advice from a Heracleopolitan king to his son, reflecting the era's instability (note: the related \"Admonitions of Ipuwer\" is sometimes cited for this period too, but mainstream Egyptology treats it as later didactic literature rather than a contemporary eyewitness account)",
            publisher: "Wikipedia (sourced overview of the primary text)",
            url: "https://en.wikipedia.org/wiki/Instructions_for_Merikare"
        },
        {
            type: "secondary", tier: "high",
            title: "First Intermediate Period of Egypt — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/First_Intermediate_Period_of_Egypt"
        },
        {
            type: "video", tier: "medium",
            title: "Planet Egypt: Birth of an Empire (Full Episode)",
            publisher: "HISTORY",
            url: "https://www.youtube.com/watch?v=b484AV-lE3Q"
        }
    ],

    "egy_5": [
        {
            type: "primary", tier: "high",
            title: "The Story of Sinuhe (c. early 12th Dynasty, Middle Kingdom) — the celebrated Middle Egyptian narrative poem, set against Amenemhat I's death and Senusret I's accession",
            publisher: "OMNIKA Library (James P. Allen translation)",
            url: "https://omnika.org/texts/204"
        },
        {
            type: "secondary", tier: "high",
            title: "Middle Kingdom of Egypt — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Middle_Kingdom_of_Egypt"
        },
        {
            type: "video", tier: "medium",
            title: "Planet Egypt: Birth of an Empire (Full Episode)",
            publisher: "HISTORY",
            url: "https://www.youtube.com/watch?v=b484AV-lE3Q"
        }
    ],

    "egy_6": [
        {
            type: "primary", tier: "high",
            title: "The First and Second Kamose Stelae (c. 1550s BCE) — Pharaoh Kamose's own inscribed account of his campaigns against the Hyksos capital of Avaris",
            publisher: "Wikipedia (sourced overview of the primary inscriptions, with full translations by Gardiner and Habachi)",
            url: "https://en.wikipedia.org/wiki/Kamose"
        },
        {
            type: "secondary", tier: "high",
            title: "Hyksos — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Hyksos"
        },
        {
            type: "video", tier: "medium",
            title: "Planet Egypt: Birth of an Empire (Full Episode)",
            publisher: "HISTORY",
            url: "https://www.youtube.com/watch?v=b484AV-lE3Q"
        }
    ],

    "egy_7": [
        {
            type: "primary", tier: "high",
            title: "The Amarna Letters (c. 1360–1332 BCE) — the diplomatic cuneiform correspondence between the Egyptian court and Near Eastern rulers, discovered at Akhenaten's capital, Tell el-Amarna",
            publisher: "Wikipedia (sourced overview of the primary archive)",
            url: "https://en.wikipedia.org/wiki/Amarna_letters"
        },
        {
            type: "secondary", tier: "high",
            title: "New Kingdom of Egypt — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/New_Kingdom_of_Egypt"
        },
        {
            type: "video", tier: "high",
            title: "Planet Egypt: Birth of an Empire (Full Episode)",
            publisher: "HISTORY",
            url: "https://www.youtube.com/watch?v=b484AV-lE3Q"
        }
    ],

    "egy_8": [
        {
            type: "primary", tier: "high",
            title: "Howard Carter's excavation journal for the 1922 season — his own handwritten, contemporaneous account of discovering Tutankhamun's tomb, entry for 26 November 1922 (\"...the impression was overwhelming\")",
            publisher: "The Griffith Institute, University of Oxford (digitised original)",
            url: "http://www.griffith.ox.ac.uk/gri/4sea1not.html"
        },
        {
            type: "secondary", tier: "high",
            title: "Discovery of the tomb of Tutankhamun — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Discovery_of_the_tomb_of_Tutankhamun"
        },
        {
            type: "video", tier: "high",
            title: "Planet Egypt: Birth of an Empire (Full Episode)",
            publisher: "HISTORY",
            url: "https://www.youtube.com/watch?v=b484AV-lE3Q"
        }
    ],

    "egy_9": [
        {
            type: "primary", tier: "high",
            title: "The Great Triumphal Stela of Piye (c. 727 BCE) — the Kushite pharaoh's own detailed inscription recounting his conquest of Egypt during the fractured Late Period",
            publisher: "Wikipedia (sourced overview of the primary inscription)",
            url: "https://en.wikipedia.org/wiki/Great_Triumphal_Stele_of_Piye"
        },
        {
            type: "secondary", tier: "high",
            title: "Late Period of ancient Egypt — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Late_Period_of_ancient_Egypt"
        },
        {
            type: "video", tier: "medium",
            title: "Planet Egypt: Birth of an Empire (Full Episode)",
            publisher: "HISTORY",
            url: "https://www.youtube.com/watch?v=b484AV-lE3Q"
        }
    ],

    "egy_10": [
        {
            type: "primary", tier: "high",
            title: "The Rosetta Stone (Memphis Decree, 196 BCE) — the trilingual priestly decree honoring Ptolemy V, whose parallel Greek and Egyptian texts unlocked the modern decipherment of hieroglyphs",
            publisher: "British Museum",
            url: "https://www.britishmuseum.org/collection/object/Y_EA24"
        },
        {
            type: "secondary", tier: "high",
            title: "Ptolemaic Kingdom — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Ptolemaic_Kingdom"
        },
        {
            type: "video", tier: "high",
            title: "Alexander the Great (Part 1)",
            publisher: "Epic History TV",
            url: "https://www.youtube.com/watch?v=aMyxwFib0_M"
        }
    ],

    "egy_11": [
        {
            type: "primary", tier: "high",
            title: "Strabo, Geographica, Book XVII (c. 7 BCE–23 CE) — a Greek geographer's firsthand description of Roman Egypt, including Alexandria, the Nile, and provincial administration",
            publisher: "Wikipedia (sourced overview of the primary text)",
            url: "https://en.wikipedia.org/wiki/Roman_Egypt"
        },
        {
            type: "secondary", tier: "high",
            title: "Roman Egypt — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Roman_Egypt"
        },
        {
            type: "video", tier: "medium",
            title: "The Roman Empire. Or Republic. Or... Which Was It?: Crash Course World History #10",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=oPf27gAup9U"
        }
    ],

    "egy_12": [
        {
            type: "primary", tier: "high",
            title: "The writings of the Desert Fathers of Egypt (4th–5th centuries CE) — contemporary monastic texts from Byzantine Christian Egypt, including the Apophthegmata Patrum",
            publisher: "Wikipedia (sourced overview of the primary monastic literature)",
            url: "https://en.wikipedia.org/wiki/Desert_Fathers"
        },
        {
            type: "secondary", tier: "high",
            title: "Egypt (Roman province) — Byzantine period",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Egypt_(Roman_province)"
        },
        {
            type: "video", tier: "medium",
            title: "From Jesus to Christ: The First Christians (Part Two)",
            publisher: "PBS FRONTLINE",
            url: "https://www.youtube.com/watch?v=GXqFvfCaFwY"
        }
    ],

    "egy_13": [
        {
            type: "primary", tier: "high",
            title: "The Mosque of Amr ibn al-As, Fustat (founded 641–642 CE) — Egypt and Africa's first mosque, built by the Arab conqueror on the site of his campaign tent",
            publisher: "Wikipedia (sourced overview of the primary monument)",
            url: "https://en.wikipedia.org/wiki/Mosque_of_Amr_ibn_al-As"
        },
        {
            type: "secondary", tier: "high",
            title: "Muslim conquest of Egypt — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Muslim_conquest_of_Egypt"
        },
        {
            type: "video", tier: "high",
            title: "Early Muslim Expansion — Khalid, Yarmouk, al-Qadisiyyah",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=r2cEIDZwG5M"
        }
    ],

    "egy_14": [
        {
            type: "primary", tier: "high",
            title: "Al-Azhar Mosque, Cairo (founded 970–972 CE) — the centerpiece of the newly-founded Fatimid capital, al-Qahira, which became the world's leading center of Sunni Islamic learning",
            publisher: "Wikipedia (sourced overview of the primary monument)",
            url: "https://en.wikipedia.org/wiki/Al-Azhar_Mosque"
        },
        {
            type: "secondary", tier: "high",
            title: "Fatimid Caliphate — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Fatimid_Caliphate"
        },
        {
            type: "video", tier: "medium",
            title: "Kings and Emirs — History Of Africa with Zeinab Badawi [Episode 6]",
            publisher: "BBC News Africa",
            url: "https://www.youtube.com/watch?v=vCyQgTJ6WgA"
        }
    ],

    "egy_15": [
        {
            type: "primary", tier: "high",
            title: "Baha ad-Din ibn Shaddad, al-Nawadir al-Sultaniyya (\"The Rare and Excellent History of Saladin,\" c. 1195–98) — a firsthand biography by Saladin's own qadi al-'askar and close confidant",
            publisher: "Wikipedia (sourced overview of the primary text; full translation by D.S. Richards, 2001)",
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

    "egy_16": [
        {
            type: "primary", tier: "high",
            title: "Jami' al-Tawarikh's account of the Battle of Ain Jalut (1260), trans. W.M. Thackston — contemporary Mamluk-Mongol battle narrative marking the Mamluk Sultanate's founding triumph",
            publisher: "De Re Militari (Society for Medieval Military History)",
            url: "https://www.deremilitari.org/RESOURCES/SOURCES/aynjalut.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Mamluk Sultanate (Cairo) — overview",
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

    "egy_17": [
        {
            type: "primary", tier: "high",
            title: "Ibn Zunbul, Akhirat al-Mamalik (\"The End of the Mamluks,\" 16th century) — a contemporary Egyptian historian's account of the 1517 Ottoman conquest, one of only three Arabic eyewitness-era sources for the war",
            publisher: "ResearchGate (sourced scholarly overview of the primary chronicle)",
            url: "https://www.researchgate.net/publication/359214308_The_Ottoman-Mamluk_War_of_1516-1517_as_Described_by_the_Egyptian_Historian_Ibn_Zunbul"
        },
        {
            type: "secondary", tier: "high",
            title: "Ottoman–Mamluk War (1516–1517) — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Ottoman%E2%80%93Mamluk_War_(1516%E2%80%931517)"
        },
        {
            type: "video", tier: "medium",
            title: "Rise of the Mamluks — Animated Medieval History Documentary",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=87YSV2UbfDc"
        }
    ],

    "egy_18": [
        {
            type: "primary", tier: "high",
            title: "Napoleon Bonaparte's Proclamation to the People of Egypt (2 July 1798) — his own address issued on landing, published in Arabic to justify the French invasion",
            publisher: "DePaul University Digital Commons (annotated full-text translation)",
            url: "https://via.library.depaul.edu/cgi/viewcontent.cgi?httpsredir=1&article=1005&context=napoleon"
        },
        {
            type: "secondary", tier: "high",
            title: "French invasion of Egypt and Syria — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/French_invasion_of_Egypt_and_Syria"
        },
        {
            type: "video", tier: "high",
            title: "Napoleon in Egypt (All Parts)",
            publisher: "Epic History TV",
            url: "https://www.youtube.com/watch?v=xxSVuNCzJEQ"
        }
    ],

    "egy_19": [
        {
            type: "primary", tier: "medium",
            title: "Records of Muhammad Ali's administrative and military reforms, incl. the Description de l'Égypte-era French mission correspondence documenting his modernization program",
            publisher: "Wikipedia (sourced overview of the primary administrative record)",
            url: "https://en.wikipedia.org/wiki/Muhammad_Ali_of_Egypt"
        },
        {
            type: "secondary", tier: "high",
            title: "Muhammad Ali dynasty — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Muhammad_Ali_dynasty"
        },
        {
            type: "video", tier: "medium",
            title: "Muhammad Ali Pasha: The Founder of Modern Egypt",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=ZqpcU__3vx8"
        }
    ],

    // ── Ethiopia ────────────────────────────────────────────────────────
    "egy_20": [
        {
            type: "primary", tier: "high",
            title: "The Constitution of the Arab Republic of Egypt (2014, as amended) — Egypt's current governing constitutional document, adopted after the 2011 and 2013 upheavals",
            publisher: "Constitute Project (official full-text translation)",
            url: "https://www.constituteproject.org/constitution/Egypt_2019"
        },
        {
            type: "secondary", tier: "high",
            title: "History of modern Egypt — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/History_of_modern_Egypt"
        },
        {
            type: "secondary", tier: "high",
            title: "2011 Egyptian revolution — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/2011_Egyptian_revolution"
        },
        {
            type: "video", tier: "high",
            title: "Egypt in Crisis",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=IOFN4qdROV0"
        }
    ],

    "eth_1": [
        {
            type: "primary", tier: "high",
            title: "AL 288-1 (\"Lucy\"/Dinkinesh), Australopithecus afarensis, discovered at Hadar (24 November 1974) — the fossil itself and Donald Johanson's own discovery account",
            publisher: "Institute of Human Origins, Arizona State University",
            url: "https://iho.asu.edu/aboutLucy"
        },
        {
            type: "secondary", tier: "high",
            title: "Lucy (Australopithecus) — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Lucy_(Australopithecus)"
        },
        {
            type: "video", tier: "high",
            title: "Mother Africa — History Of Africa with Zeinab Badawi [Episode 1]",
            publisher: "BBC News Africa",
            url: "https://www.youtube.com/watch?v=ETnIsBnNRr0"
        }
    ],

    "eth_2": [
        {
            type: "primary", tier: "medium",
            title: "Archaeobotanical evidence of teff, ensete and cereal domestication in the Ethiopian highlands — excavation records from Horn of Africa sites",
            publisher: "Wikipedia (sourced overview of the archaeological evidence)",
            url: "https://en.wikipedia.org/wiki/History_of_agriculture_in_Ethiopia"
        },
        {
            type: "secondary", tier: "high",
            title: "Agriculture in Ethiopia — origins and history",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Agriculture_in_Ethiopia"
        },
        {
            type: "video", tier: "high",
            title: "Cattle, Crops and Iron — History Of Africa with Zeinab Badawi [Episode 2]",
            publisher: "BBC News Africa",
            url: "https://www.youtube.com/watch?v=fhfo5uC-wD8"
        }
    ],

    "eth_3": [
        {
            type: "primary", tier: "high",
            title: "The Wa'ran Hywt inscription (RIÉ 1, Amda Tsyon/Seglamen) — a contemporary royal inscription from the Kingdom of D'mt naming a king and his temple restoration",
            publisher: "Wikipedia (sourced overview of the primary inscription)",
            url: "https://en.wikipedia.org/wiki/D%CA%BFmt"
        },
        {
            type: "secondary", tier: "high",
            title: "D'mt — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/D%CA%BFmt"
        },
        {
            type: "video", tier: "high",
            title: "The Rise Of Aksum — History Of Africa With Zeinab Badawi [Episode 5]",
            publisher: "BBC News Africa",
            url: "https://www.youtube.com/watch?v=A4OSEpexs_Q"
        }
    ],

    "eth_4": [
        {
            type: "primary", tier: "high",
            title: "The Periplus of the Erythraean Sea (1st century CE) — a Greek merchant's firsthand trading handbook describing Aksum's rise as a Red Sea commercial power",
            publisher: "Wikipedia (sourced overview of the primary text)",
            url: "https://en.wikipedia.org/wiki/Periplus_of_the_Erythraean_Sea"
        },
        {
            type: "secondary", tier: "high",
            title: "Kingdom of Aksum — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Kingdom_of_Aksum"
        },
        {
            type: "video", tier: "high",
            title: "The Rise Of Aksum — History Of Africa With Zeinab Badawi [Episode 5]",
            publisher: "BBC News Africa",
            url: "https://www.youtube.com/watch?v=A4OSEpexs_Q"
        }
    ],

    "eth_5": [
        {
            type: "primary", tier: "high",
            title: "The Ezana Stone (RIÉ 270, c. 4th century CE) — King Ezana's own trilingual inscription (Ge'ez, Sabaean, Greek) recording his conversion to Christianity",
            publisher: "Simon Fraser University Museum of Archaeology & Ethnology (sourced translated excerpts)",
            url: "https://www.sfu.ca/archaeology/museum/exhibits/virtual-exhibits/aksum/ge-ez-stele.html"
        },
        {
            type: "secondary", tier: "high",
            title: "Ezana of Axum — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Ezana_of_Axum"
        },
        {
            type: "video", tier: "high",
            title: "The Rise Of Aksum — History Of Africa With Zeinab Badawi [Episode 5]",
            publisher: "BBC News Africa",
            url: "https://www.youtube.com/watch?v=A4OSEpexs_Q"
        }
    ],

    "eth_6": [
        {
            type: "primary", tier: "medium",
            title: "Late Aksumite coinage and inscriptions (7th–9th centuries CE) — the archaeological record of the kingdom's declining minting activity and trade contraction",
            publisher: "Wikipedia (sourced overview of the primary numismatic and epigraphic record)",
            url: "https://en.wikipedia.org/wiki/Kingdom_of_Aksum#Decline"
        },
        {
            type: "secondary", tier: "high",
            title: "Kingdom of Aksum — decline",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Kingdom_of_Aksum"
        },
        {
            type: "video", tier: "high",
            title: "Kings and Emirs — History Of Africa with Zeinab Badawi [Episode 6]",
            publisher: "BBC News Africa",
            url: "https://www.youtube.com/watch?v=vCyQgTJ6WgA"
        }
    ],

    "eth_7": [
        {
            type: "primary", tier: "medium",
            title: "The rock-hewn churches of Lalibela (12th–13th century CE) — the Zagwe dynasty's own architectural and religious monument, built under King Lalibela",
            publisher: "UNESCO World Heritage Centre",
            url: "https://whc.unesco.org/en/list/18/"
        },
        {
            type: "secondary", tier: "high",
            title: "Zagwe dynasty — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Zagwe_dynasty"
        },
        {
            type: "video", tier: "high",
            title: "Kings and Emirs — History Of Africa with Zeinab Badawi [Episode 6]",
            publisher: "BBC News Africa",
            url: "https://www.youtube.com/watch?v=vCyQgTJ6WgA"
        }
    ],

    "eth_8": [
        {
            type: "primary", tier: "high",
            title: "The Kebra Nagast (\"The Glory of Kings,\" compiled c. 1314–22 CE) — the Ge'ez national epic asserting the Solomonic line's restoration under Yekuno Amlak in 1270",
            publisher: "Internet Sacred Text Archive (Budge translation)",
            url: "https://sacred-texts.com/afr/kn/index.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Solomonic dynasty — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Solomonic_dynasty"
        },
        {
            type: "video", tier: "high",
            title: "Kings and Emirs — History Of Africa with Zeinab Badawi [Episode 6]",
            publisher: "BBC News Africa",
            url: "https://www.youtube.com/watch?v=vCyQgTJ6WgA"
        }
    ],

    "eth_9": [
        {
            type: "primary", tier: "high",
            title: "Futuh al-Habasha (\"The Conquest of Abyssinia,\" c. 1540s) — Arab Faqih's firsthand Adal-side chronicle of the Ethiopian–Adal War",
            publisher: "Wikipedia (sourced overview of the primary chronicle, with a full English translation by Stenhouse & Pankhurst, 2003)",
            url: "https://en.wikipedia.org/wiki/Futuh_al-Habasha"
        },
        {
            type: "secondary", tier: "high",
            title: "Ethiopian–Adal War — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Ethiopian%E2%80%93Adal_War"
        },
        {
            type: "video", tier: "high",
            title: "Ottoman-Portuguese War in Africa - Ethiopian–Adal War Documentary",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=Q1BtO8W_ss4"
        }
    ],

    "eth_10": [
        {
            type: "primary", tier: "medium",
            title: "Abba Bahrey, Zenahu le Galla (\"History of the Galla,\" 1593) — a contemporary Ethiopian monk's account of the Oromo migrations (note: an outsider Christian source using the historically pejorative term \"Galla\"; UNESCO's own Gadaa system documentation is included below for the Oromo's self-described institution)",
            publisher: "Wikipedia (sourced overview of the primary chronicle)",
            url: "https://en.wikipedia.org/wiki/Bahrey"
        },
        {
            type: "primary", tier: "high",
            title: "Gada System nomination file — UNESCO's official Intangible Cultural Heritage documentation of the Oromo's own indigenous governance institution",
            publisher: "UNESCO Intangible Cultural Heritage",
            url: "https://ich.unesco.org/en/RL/gada-system-an-indigenous-democratic-socio-political-system-of-the-oromo-01164"
        },
        {
            type: "secondary", tier: "high",
            title: "Oromo expansion — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Oromo_expansion"
        },
        {
            type: "video", tier: "high",
            title: "Kings and Emirs — History Of Africa with Zeinab Badawi [Episode 6]",
            publisher: "BBC News Africa",
            url: "https://www.youtube.com/watch?v=vCyQgTJ6WgA"
        }
    ],

    "eth_11": [
        {
            type: "primary", tier: "high",
            title: "Fasil Ghebbi, Gondar (founded 1636 CE) — the fortress-capital built by Emperor Fasilides and his successors, the primary architectural record of the Gondarine period",
            publisher: "UNESCO World Heritage Centre",
            url: "https://whc.unesco.org/en/list/19/"
        },
        {
            type: "secondary", tier: "high",
            title: "Gondarine period — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Fasilides"
        },
        {
            type: "video", tier: "medium",
            title: "The Era of Princes | Ethiopian History | African History",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=0_E5qxbHdOA"
        }
    ],

    "eth_12": [
        {
            type: "primary", tier: "medium",
            title: "Contemporary Gondarine royal chronicles of the Zemene Mesafint (\"Era of the Princes,\" 1769–1855) — the court records documenting the regional lords' domination of the figurehead Solomonic emperors",
            publisher: "Wikipedia (sourced overview of the primary chronicles)",
            url: "https://en.wikipedia.org/wiki/Zemene_Mesafint"
        },
        {
            type: "secondary", tier: "high",
            title: "Zemene Mesafint — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Zemene_Mesafint"
        },
        {
            type: "video", tier: "high",
            title: "The Era of Princes | Ethiopian History | African History",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=0_E5qxbHdOA"
        }
    ],

    "eth_13": [
        {
            type: "primary", tier: "high",
            title: "Emperor Tewodros II's letters to Queen Victoria (1862 and his final letters of April 1868) — the emperor's own correspondence, now held in Ethiopia's National Archives",
            publisher: "Wikipedia (sourced overview of the primary letters)",
            url: "https://en.wikipedia.org/wiki/Tewodros_II"
        },
        {
            type: "secondary", tier: "high",
            title: "Tewodros II — biography and reign",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/biography/Tewodros-II"
        },
        {
            type: "video", tier: "high",
            title: "The Last Stand of Emperor Tewodros II | Battle of Magdala 1868 vs the British Empire",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=hUpekSZaZHo"
        }
    ],

    "eth_14": [
        {
            type: "primary", tier: "high",
            title: "The Treaty of Wuchale (2 May 1889) — full text of the treaty between Menelik II and Italy, whose disputed Article 17 precipitated the First Italo-Ethiopian War",
            publisher: "Horn Affairs (full English text)",
            url: "https://hornaffairs.com/2011/08/17/text-of-wuchale-treaty-1989-ethio-italian-treaty/"
        },
        {
            type: "secondary", tier: "high",
            title: "Menelik II — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Menelik_II"
        },
        {
            type: "video", tier: "medium",
            title: "How Ethiopia DEFEATED Italy at the Battle of Adwa in 1896",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=YMbRLBfX7ZA"
        }
    ],

    "eth_15": [
        {
            type: "primary", tier: "high",
            title: "Emperor Menelik II's national mobilization proclamation (September 1895) — the emperor's own call to arms that raised the army which won at Adwa",
            publisher: "Wemezekir (translated by Paulos Milkias & Getachew Metaferia, from The Battle of Adwa)",
            url: "https://wemezekir.blogspot.com/2014/09/meneliks-proclamation-of-september-1895.html"
        },
        {
            type: "secondary", tier: "high",
            title: "Battle of Adwa — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Battle_of_Adwa"
        },
        {
            type: "video", tier: "high",
            title: "How Ethiopia DEFEATED Italy at the Battle of Adwa in 1896",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=YMbRLBfX7ZA"
        }
    ],

    "eth_16": [
        {
            type: "primary", tier: "high",
            title: "Haile Selassie's speech to the League of Nations (30 June 1936) — the emperor's own appeal condemning Italy's invasion and use of chemical weapons, delivered in Amharic",
            publisher: "Library of Congress (digitised original, World Digital Library)",
            url: "https://www.loc.gov/item/2021667904/"
        },
        {
            type: "secondary", tier: "high",
            title: "Second Italo-Ethiopian War — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Second_Italo-Ethiopian_War"
        },
        {
            type: "video", tier: "medium",
            title: "Why Did Italy Attack Ethiopia Before World War Two?",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=6qfm9LGy1IM"
        }
    ],

    "eth_17": [
        {
            type: "primary", tier: "high",
            title: "The Charter of the Organization of African Unity (25 May 1963) — signed in Addis Ababa with Haile Selassie as the OAU's first chairman, marking Ethiopia's postwar restoration as a continental diplomatic leader",
            publisher: "United Nations Treaty Series (full text)",
            url: "https://treaties.un.org/doc/Publication/UNTS/Volume%20479/volume-479-I-6947-English.pdf"
        },
        {
            type: "secondary", tier: "high",
            title: "Haile Selassie — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Haile_Selassie"
        },
        {
            type: "video", tier: "medium",
            title: "The ENTIRE Life of Emperor Haile Selassie – From Divine Ruler to Brutal Death (All Parts)",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=lS_cy87kITI"
        }
    ],

    "eth_18": [
        {
            type: "primary", tier: "high",
            title: "Proclamation No. 1 of 1974 — the Derg's own founding decree deposing Emperor Haile Selassie and establishing the Provisional Military Administrative Council",
            publisher: "Wikipedia (sourced overview of the primary proclamation)",
            url: "https://en.wikipedia.org/wiki/Derg"
        },
        {
            type: "secondary", tier: "high",
            title: "Red Terror (Ethiopia) — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Red_Terror_(Ethiopia)"
        },
        {
            type: "video", tier: "medium",
            title: "Ethiopia 101: The Red Terror Years",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=bfQTpVFoL5s"
        }
    ],

    "eth_19": [
        {
            type: "primary", tier: "high",
            title: "The Constitution of the Federal Democratic Republic of Ethiopia (adopted 8 December 1994, in force 21 August 1995) — the founding legal document of Ethiopia's ethnic-federal system",
            publisher: "Refworld / UNHCR (full official text)",
            url: "https://www.refworld.org/legal/legislation/natlegbod/1995/en/18206"
        },
        {
            type: "secondary", tier: "high",
            title: "History of the Federal Democratic Republic of Ethiopia — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/History_of_the_Federal_Democratic_Republic_of_Ethiopia"
        },
        {
            type: "video", tier: "medium",
            title: "Inside Story: Life After Ethiopia's Meles Zenawi",
            publisher: "Al Jazeera English",
            url: "https://www.youtube.com/watch?v=9GZKLtywu3M"
        }
    ],

    "eth_20": [
        {
            type: "primary", tier: "high",
            title: "Agreement for Lasting Peace through a Permanent Cessation of Hostilities (\"the Pretoria Agreement,\" 2 November 2022) — the full official text of the accord between the Ethiopian federal government and the Tigray People's Liberation Front ending the Tigray War",
            publisher: "United Nations Peacemaker (official archive)",
            url: "https://peacemaker.un.org/en/node/10038"
        },
        {
            type: "secondary", tier: "high",
            title: "Ethiopia–Tigray peace agreement — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Ethiopia%E2%80%93Tigray_peace_agreement"
        },
        {
            type: "secondary", tier: "high",
            title: "Premiership of Abiy Ahmed — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Premiership_of_Abiy_Ahmed"
        },
        {
            type: "video", tier: "high",
            title: "Abiy Ahmed Wins in Ethiopia as Multiple Conflicts Divide the Nation",
            publisher: "Firstpost Africa",
            url: "https://www.youtube.com/watch?v=IteysmN8eKA"
        }
    ],

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
