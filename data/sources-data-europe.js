// Curated primary/secondary/video sources for Europe scenes (Austria, France, Germany, Poland, UK, etc).
// Split from the original sources-data.js to keep per-file size down; each file
// merges into the shared window.WHD_SOURCES object rather than reassigning it,
// so files can load in any order without clobbering each other.
window.WHD_SOURCES = Object.assign(window.WHD_SOURCES || {}, {

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
        },
        {
            type: "video", tier: "high",
            title: "The Celts: Blood, Iron and Sacrifice — Episode 1",
            publisher: "BBC",
            url: "https://www.youtube.com/watch?v=zA-itb5NwDU"
        }
    ],

    "caesar_conquest": [
        {
            type: "primary", tier: "high",
            title: "Commentarii de Bello Gallico (Caesar's Gallic Wars)",
            publisher: "Perseus Digital Library",
            url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0001"
        },
        {
            type: "secondary", tier: "high",
            title: "Gallic Wars — overview",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/event/Gallic-Wars"
        },
        {
            type: "video", tier: "high",
            title: "Caesar and Gallic Wars: Battle of Bibracte 58 BC",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=9s2LmedEEAs"
        }
    ],

    "roman_gaul": [
        {
            type: "primary", tier: "high",
            title: "Julius Caesar, Commentarii de Bello Gallico (Commentaries on the Gallic War, 58–49 BCE) — the general's own account of Gaul's conquest and early Roman administration",
            publisher: "Perseus Digital Library, Tufts University",
            url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0001"
        },
        {
            type: "secondary", tier: "high",
            title: "Roman Gaul — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Roman_Gaul"
        },
        {
            type: "secondary", tier: "high",
            title: "Gaul — Roman Empire, map, & people",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/place/Gaul-ancient-region-Europe"
        },
        {
            type: "video", tier: "medium",
            title: "The Roman Empire. Or Republic. Or... Which Was It?: Crash Course World History #10",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=oPf27gAup9U"
        },
        {
            type: "video", tier: "medium",
            title: "The ENTIRE History of ROME",
            publisher: "Historically",
            url: "https://www.youtube.com/watch?v=EHLI2WZUtXs"
        }
    ],

    "frankish_kingdom": [
        {
            type: "primary", tier: "high",
            title: "Gregory of Tours, Historia Francorum (History of the Franks, c. 594 CE) — the essential contemporary source for Clovis I and the formation of the Frankish kingdom",
            publisher: "Internet Medieval Sourcebook, Fordham University (Brehaut translation)",
            url: "https://sourcebooks.web.fordham.edu/basis/gregory-hist.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "Clovis I — biography and reign",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/biography/Clovis-I"
        },
        {
            type: "secondary", tier: "high",
            title: "Francia — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Francia"
        },
        {
            type: "video", tier: "medium",
            title: "How Clovis Changed Europe",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=sQ728X06zhs"
        }
    ],

    "carolingian_empire": [
        {
            type: "primary", tier: "high",
            title: "Einhard, Vita Karoli Magni (Life of Charlemagne, c. 817–836 CE) — the standard contemporary biography, written by a member of Charlemagne's own court",
            publisher: "Internet Medieval Sourcebook, Fordham University",
            url: "https://sourcebooks.web.fordham.edu/basis/einhard.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "Carolingian Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Carolingian_Empire"
        },
        {
            type: "secondary", tier: "high",
            title: "Charlemagne — biography and reign",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Charlemagne"
        },
        {
            type: "video", tier: "medium",
            title: "Charlemagne and the Carolingian Empire (Short Documentary)",
            publisher: "Ten Minute History",
            url: "https://www.youtube.com/watch?v=H2J_3RTKB1c"
        }
    ],

    "feudal_france": [
        {
            type: "primary", tier: "high",
            title: "Richer of Reims's account of the Election of Hugh Capet (987 CE) — a contemporary chronicle of the founding of the Capetian dynasty and the feudal order it presided over",
            publisher: "Internet Medieval Sourcebook, Fordham University",
            url: "https://sourcebooks.web.fordham.edu/source/987capet.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "France — Medieval, Feudalism, Monarchy",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/place/France/Economy-society-and-culture-in-the-Middle-Ages-c-900-1300"
        },
        {
            type: "secondary", tier: "high",
            title: "Feudalism — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Feudalism"
        },
        {
            type: "video", tier: "medium",
            title: "Feudal system during the Middle Ages",
            publisher: "Khan Academy",
            url: "https://www.youtube.com/watch?v=p3pYuY4buIk"
        }
    ],

    "crusades_france": [
        {
            type: "primary", tier: "high",
            title: "Jean de Joinville, The Life of Saint Louis (c. 1305–09 CE) — Joinville's own eyewitness memoir as a French knight who accompanied King Louis IX on the Seventh Crusade",
            publisher: "Internet Medieval Sourcebook, Fordham University",
            url: "https://sourcebooks.web.fordham.edu/basis/joinville.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "France and the Crusades — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/France_in_the_Middle_Ages#The_Crusades"
        },
        {
            type: "secondary", tier: "high",
            title: "Louis IX of France — the Crusades of Saint Louis",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/biography/Louis-IX-king-of-France"
        },
        {
            type: "video", tier: "high",
            title: "Princes' Crusade Begins: Battle of Nicaea - First Crusade DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=Pp8gooljT1E"
        }
    ],

    "hundred_year_war": [
        {
            type: "primary", tier: "high",
            title: "Trial of Joan of Arc (1431) — full transcript",
            publisher: "Internet Medieval Sourcebook, Fordham University",
            url: "https://sourcebooks.web.fordham.edu/basis/joanofarc-trial.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "Hundred Years' War — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Hundred_Years%27_War"
        },
        {
            type: "video", tier: "medium",
            title: "History of England — The 100 Years War, Part 1",
            publisher: "Extra History",
            url: "https://m.youtube.com/watch?v=i0NXWfCLIfI"
        }
    ],

    "industrial_france": [
        {
            type: "primary", tier: "high",
            title: "The Waldeck-Rousseau Law (21 March 1884) — the French statute legalizing trade unions after decades of industrial-era prohibition",
            publisher: "Wikipedia (sourced overview of the primary legal text)",
            url: "https://en.wikipedia.org/wiki/Waldeck_Rousseau_law_(1884)"
        },
        {
            type: "secondary", tier: "high",
            title: "Economic history of France",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Economic_history_of_France"
        },
        {
            type: "secondary", tier: "high",
            title: "France in the long nineteenth century",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/France_in_the_long_nineteenth_century"
        },
        {
            type: "video", tier: "medium",
            title: "The Industrial Revolution: Crash Course European History #24",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=zjK7PWmRRyg"
        }
    ],

    "ww1_france": [
        {
            type: "primary", tier: "high",
            title: "The Treaty of Versailles (28 June 1919) — full text, signed at the Palace of Versailles to formally end the war for France and the Allies",
            publisher: "The Avalon Project, Yale Law School",
            url: "https://avalon.law.yale.edu/subject_menus/versailles_menu.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "Battle of Verdun — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Battle_of_Verdun"
        },
        {
            type: "secondary", tier: "high",
            title: "Battle of Verdun — map, casualties, significance",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/event/Battle-of-Verdun"
        },
        {
            type: "video", tier: "high",
            title: "Verdun, 1916: The Battle of the Great War (Full Documentary)",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=ny1rWSklx_U"
        },
        {
            type: "video", tier: "medium",
            title: "World War 1 - Simplified",
            publisher: "Historically",
            url: "https://www.youtube.com/watch?v=w5mhZs73Qwc"
        }
    ],

    "ww2_france": [
        {
            type: "primary", tier: "high",
            title: "Appeal of 18 June (1940) — full text of de Gaulle's BBC broadcast",
            publisher: "World War II Database",
            url: "https://ww2db.com/doc.php?q=283"
        },
        {
            type: "secondary", tier: "high",
            title: "Battle of France — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Battle_of_France"
        },
        {
            type: "video", tier: "medium",
            title: "The Battle of France 1940 (WW2 Documentary)",
            publisher: "Real Time History",
            url: "https://www.youtube.com/watch?v=n59SIJNaNao"
        }
    ],

    "modern_france": [
        {
            type: "primary", tier: "high",
            title: "Constitution of 4 October 1958 — official text",
            publisher: "Élysée (French Presidency)",
            url: "https://www.elysee.fr/en/french-presidency/constitution-of-4-october-1958"
        },
        {
            type: "secondary", tier: "high",
            title: "French Fifth Republic — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/French_Fifth_Republic"
        },
        {
            type: "video", tier: "medium",
            title: "How is France on its Fifth Republic? (Short Animated Documentary)",
            publisher: "Knowledgia",
            url: "https://www.youtube.com/watch?v=F935JdNiKAE"
        }
    ],

    // ── Germany ─────────────────────────────────────────────────────────,

    "germany_early_settlers": [
        {
            type: "primary", tier: "high",
            title: "Tacitus, Germania (98 CE) — the essential Roman ethnographic account of the early Germanic tribes",
            publisher: "Internet History Sourcebook, Fordham University",
            url: "https://sourcebooks.web.fordham.edu/source/tacitus1.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "Jastorf culture — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Jastorf_culture"
        },
        {
            type: "secondary", tier: "high",
            title: "Germanic peoples — origins and early archaeology",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Germanic_peoples"
        },
        {
            type: "video", tier: "high",
            title: "The Germanic Tribes According to Tacitus (56-120), Roman Historian",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=5ZwpHh2CVMQ"
        }
    ],

    "germany_tribal_unification_attempts": [
        {
            type: "primary", tier: "high",
            title: "Julius Caesar, Commentarii de Bello Gallico, Book 1 — Caesar's own account of Ariovistus's Suebi confederation, one of the earliest recorded cross-tribal Germanic alliances",
            publisher: "Perseus Digital Library, Tufts University",
            url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0001"
        },
        {
            type: "secondary", tier: "high",
            title: "Germanic peoples — tribal organization",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Germanic_peoples"
        },
        {
            type: "secondary", tier: "high",
            title: "Early Germanic culture — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Early_Germanic_culture"
        },
        {
            type: "video", tier: "high",
            title: "Caesar vs Ariovistus: Battle of Vosges 58 BC",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=D-YpPBPD23o"
        }
    ],

    "germany_romans_trade": [
        {
            type: "primary", tier: "high",
            title: "Pliny the Elder, Naturalis Historia, Book XXXVII, Chapter 11 (77 CE) — the Roman naturalist's firsthand account of the Baltic amber trade with Germanic tribes",
            publisher: "Perseus Digital Library, Tufts University",
            url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0137:book%3D37:chapter%3D11"
        },
        {
            type: "secondary", tier: "high",
            title: "Limes Germanicus — Roman frontier and trade",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Limes_Germanicus"
        },
        {
            type: "secondary", tier: "high",
            title: "Upper Germanic-Rhaetian Limes — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Upper_Germanic-Rhaetian_Limes"
        },
        {
            type: "video", tier: "high",
            title: "The Limes: The Border Rome Built But Could Not Hold",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=j5eBHumLjqI"
        },
        {
            type: "video", tier: "medium",
            title: "The ENTIRE History of ROME",
            publisher: "Historically",
            url: "https://www.youtube.com/watch?v=EHLI2WZUtXs"
        }
    ],

    "germany_border_wars": [
        {
            type: "primary", tier: "high",
            title: "Cassius Dio, Roman History, Book 56.18-24 — the fullest surviving ancient narrative of the Battle of the Teutoburg Forest",
            publisher: "Livius.org (Cary translation)",
            url: "https://www.livius.org/sources/content/cassius-dio/cassius-dio-on-the-teutoburg-forest/"
        },
        {
            type: "secondary", tier: "high",
            title: "Battle of the Teutoburg Forest — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Battle_of_the_Teutoburg_Forest"
        },
        {
            type: "secondary", tier: "high",
            title: "Battle of the Teutoburg Forest — summary and significance",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/event/Battle-of-the-Teutoburg-Forest"
        },
        {
            type: "video", tier: "high",
            title: "Why and How the Battle of Teutoburg Happened — Who Was Varus?",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=U4-1zmyyoVM"
        }
    ],

    "germany_huns_arrival": [
        {
            type: "primary", tier: "high",
            title: "Ammianus Marcellinus, Res Gestae, Book XXXI (c. 395 CE) — the earliest systematic Roman description of the Huns and their impact on the Gothic migration into the Empire",
            publisher: "Project Gutenberg (Yonge translation)",
            url: "https://www.gutenberg.org/files/28587/28587-h/28587-h.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Huns — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Huns"
        },
        {
            type: "secondary", tier: "high",
            title: "History of the Huns — arrival in Europe",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/History_of_the_Huns"
        },
        {
            type: "video", tier: "medium",
            title: "Barbarians Rising: Attila - The Hun",
            publisher: "HISTORY",
            url: "https://www.youtube.com/watch?v=56kIQoZ4sc0"
        }
    ],

    "germany_tribal_kingdoms_emerge": [
        {
            type: "primary", tier: "high",
            title: "Cassiodorus, Variae (c. 537 CE) — the official state correspondence of Theodoric the Great's Ostrogothic kingdom, one of the major Germanic successor states of this period",
            publisher: "Project Gutenberg (Hodgkin translation)",
            url: "https://www.gutenberg.org/files/18590/18590-h/18590-h.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Germanic peoples — migration-era kingdoms",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Germanic_peoples"
        },
        {
            type: "secondary", tier: "high",
            title: "Huns — impact on Germanic tribal movements",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Huns"
        },
        {
            type: "video", tier: "medium",
            title: "Theodoric the Great: Clash with the Roman Empire",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=_r365NVXE4I"
        }
    ],

    "germany_frankish_rise": [
        {
            type: "primary", tier: "high",
            title: "Gregory of Tours, Historia Francorum (History of the Franks, c. 594 CE) — the essential contemporary source for Clovis I and the Frankish kingdom's rise, including the eastern Frankish territories in Germania",
            publisher: "Internet Medieval Sourcebook, Fordham University (Brehaut translation)",
            url: "https://sourcebooks.web.fordham.edu/basis/gregory-hist.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "Francia — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Francia"
        },
        {
            type: "secondary", tier: "high",
            title: "Clovis I — biography and reign",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/biography/Clovis-I"
        },
        {
            type: "video", tier: "medium",
            title: "How Clovis Changed Europe",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=sQ728X06zhs"
        }
    ],

    "germany_charlemagne": [
        {
            type: "primary", tier: "high",
            title: "Einhard, Vita Karoli Magni (Life of Charlemagne, c. 817–836 CE) — the standard contemporary biography, written by a member of Charlemagne's own court",
            publisher: "Internet Medieval Sourcebook, Fordham University",
            url: "https://sourcebooks.web.fordham.edu/basis/einhard.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "Carolingian Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Carolingian_Empire"
        },
        {
            type: "secondary", tier: "high",
            title: "Charlemagne — biography and reign",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Charlemagne"
        },
        {
            type: "video", tier: "medium",
            title: "Charlemagne and the Carolingian Empire (Short Documentary)",
            publisher: "Ten Minute History",
            url: "https://www.youtube.com/watch?v=H2J_3RTKB1c"
        }
    ],

    "germany_city_growth": [
        {
            type: "primary", tier: "high",
            title: "The Treaty of Stralsund (24 May 1370) — the settlement ending the Second Danish-Hanseatic War, marking the League's peak of political and commercial power",
            publisher: "Wikipedia (sourced overview of the primary treaty)",
            url: "https://en.wikipedia.org/wiki/Treaty_of_Stralsund_(1370)"
        },
        {
            type: "secondary", tier: "high",
            title: "Hanseatic League — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Hanseatic_League"
        },
        {
            type: "secondary", tier: "high",
            title: "Hanseatic League — German trading organization",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/topic/Hanseatic-League"
        },
        {
            type: "video", tier: "high",
            title: "The Hanseatic League: Explained (Short Animated History Documentary)",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=r1fZAArcOJw"
        }
    ],

    "germany_knight_culture": [
        {
            type: "primary", tier: "high",
            title: "Codex Manesse (Große Heidelberger Liederhandschrift, c. 1300–1340) — the largest surviving anthology of Middle High German Minnesang, illustrated with portraits of German knights and nobles",
            publisher: "Heidelberg University Library (digitised original)",
            url: "https://digi.ub.uni-heidelberg.de/diglit/cpg848"
        },
        {
            type: "secondary", tier: "high",
            title: "Feudalism — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Feudalism"
        },
        {
            type: "secondary", tier: "high",
            title: "Holy Roman Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Holy_Roman_Empire"
        },
        {
            type: "video", tier: "high",
            title: "Knights: Men in Iron (Part 1 of 3)",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=vm91dVkRweQ"
        }
    ],

    "germany_crisis_period": [
        {
            type: "primary", tier: "high",
            title: "Chronicle accounts of the Flagellant movement and Jewish persecutions in the Holy Roman Empire during the Black Death (1349) — contemporary German-region sources",
            publisher: "Wikipedia (sourced overview of the primary chronicles)",
            url: "https://en.wikipedia.org/wiki/Flagellant"
        },
        {
            type: "secondary", tier: "high",
            title: "Black Death in the Holy Roman Empire",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Black_Death_in_the_Holy_Roman_Empire"
        },
        {
            type: "video", tier: "high",
            title: "Black Death: The Disease That Wiped Out Half Of Europe",
            publisher: "Absolute History",
            url: "https://www.youtube.com/watch?v=i0hg9jFAYdc"
        }
    ],

    "germany_printing_revolution": [
        {
            type: "primary", tier: "high",
            title: "The Gutenberg Bible (42-line Bible, c. 1454–55) — Johannes Gutenberg's own printed masterwork, the first major book produced with movable metal type",
            publisher: "British Library (digitised copy)",
            url: "https://www.bl.uk/treasures/gutenberg/homepage.html"
        },
        {
            type: "secondary", tier: "high",
            title: "Johannes Gutenberg — biography and the printing press",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Johannes_Gutenberg"
        },
        {
            type: "secondary", tier: "high",
            title: "Johannes Gutenberg — inventions and accomplishments",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/biography/Johannes-Gutenberg"
        },
        {
            type: "video", tier: "high",
            title: "The Medieval Invention That Changed The Course Of History (The Machine That Made Us)",
            publisher: "Timeline - World History Documentaries",
            url: "https://www.youtube.com/watch?v=uQ88yC35NjI"
        }
    ],

    "germany_industrial_birth": [
        {
            type: "primary", tier: "high",
            title: "The Zollvereinigungsvertrag (German Customs Union Treaty, 22 March 1833) — the founding treaty establishing the Zollverein, effective 1 January 1834",
            publisher: "Wikipedia (sourced overview of the primary treaty)",
            url: "https://en.wikipedia.org/wiki/Zollverein"
        },
        {
            type: "secondary", tier: "high",
            title: "Zollverein — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Zollverein"
        },
        {
            type: "secondary", tier: "high",
            title: "Zollverein — German customs union",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/topic/Zollverein"
        },
        {
            type: "video", tier: "high",
            title: "Italian and German Unification: Crash Course European History #27",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=KSjDe9_jZk8"
        }
    ],

    "germany_empire_expansion": [
        {
            type: "primary", tier: "high",
            title: "Proclamation of the German Empire at the Hall of Mirrors, Versailles (18 January 1871) — the founding constitutional moment of the unified German state",
            publisher: "Wikipedia (sourced overview of the primary event and constitution)",
            url: "https://en.wikipedia.org/wiki/Proclamation_of_the_German_Empire"
        },
        {
            type: "secondary", tier: "high",
            title: "German Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/German_Empire"
        },
        {
            type: "secondary", tier: "high",
            title: "History of Germany — Germany from 1871 to 1918",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/topic/history-of-Germany/Germany-from-1871-to-1918"
        },
        {
            type: "video", tier: "high",
            title: "Italian and German Unification: Crash Course European History #27",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=KSjDe9_jZk8"
        }
    ],

    "germany_ww1": [
        {
            type: "primary", tier: "high",
            title: "Alfred von Schlieffen's \"War Against France\" memorandum (December 1905/1906) — excerpted primary text of the strategic plan behind Germany's 1914 invasion of Belgium and France",
            publisher: "German History in Documents and Images (GHI Washington)",
            url: "https://germanhistorydocs.org/en/wilhelmine-germany-and-the-first-world-war-1890-1918/the-schlieffen-plan-1905"
        },
        {
            type: "secondary", tier: "high",
            title: "Schlieffen Plan — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Schlieffen_Plan"
        },
        {
            type: "secondary", tier: "high",
            title: "Schlieffen Plan — German WWI strategy",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/event/Schlieffen-Plan"
        },
        {
            type: "video", tier: "high",
            title: "World War 1 (All Parts)",
            publisher: "Epic History TV",
            url: "https://www.youtube.com/watch?v=G1p6rlDCxq0"
        },
        {
            type: "video", tier: "medium",
            title: "World War 1 - Simplified",
            publisher: "Historically",
            url: "https://www.youtube.com/watch?v=w5mhZs73Qwc"
        }
    ],

    "germany_post_ww1": [
        {
            type: "primary", tier: "high",
            title: "The Weimar Constitution (11 August 1919) — full text of Germany's first democratic constitution",
            publisher: "Wikisource (McBain and Rogers translation)",
            url: "https://en.wikisource.org/wiki/Weimar_constitution"
        },
        {
            type: "secondary", tier: "high",
            title: "Weimar Republic — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Weimar_Republic"
        },
        {
            type: "secondary", tier: "high",
            title: "Weimar Republic — government, constitution, downfall",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/place/Weimar-Republic"
        },
        {
            type: "video", tier: "medium",
            title: "The Weimar Republic and Nazi Germany (Short Documentary)",
            publisher: "Ten Minute History",
            url: "https://www.youtube.com/watch?v=vO-_HXO7HwY"
        }
    ],

    "germany_ww2": [
        {
            type: "primary", tier: "high",
            title: "The Nuremberg Laws (15 September 1935) — full text of the Reich Citizenship Law and the Law for the Protection of German Blood and German Honor",
            publisher: "Yad Vashem (digitised original with English translation)",
            url: "https://www.yadvashem.org/docs/nuremberg-law-for-protection-of-german-blood-1935.html"
        },
        {
            type: "secondary", tier: "high",
            title: "Nazi Germany — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Nazi_Germany"
        },
        {
            type: "secondary", tier: "high",
            title: "Germany — the Third Reich, 1933–45",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/place/Germany/The-Third-Reich-1933-45"
        },
        {
            type: "video", tier: "medium",
            title: "What Caused The Rise of Nazi Germany",
            publisher: "The Infographics Show",
            url: "https://www.youtube.com/watch?v=9mfJ-G2LPhE"
        }
    ],

    "germany_post_ww2_rebuild": [
        {
            type: "primary", tier: "high",
            title: "The Economic Cooperation Act of 1948 (the Marshall Plan, signed 3 April 1948) — original digitised U.S. law that funded West Germany's postwar reconstruction",
            publisher: "U.S. National Archives",
            url: "https://www.archives.gov/milestone-documents/marshall-plan"
        },
        {
            type: "secondary", tier: "high",
            title: "Wirtschaftswunder — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Wirtschaftswunder"
        },
        {
            type: "secondary", tier: "high",
            title: "Wirtschaftswunder — West Germany's economic miracle",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/topic/Wirtschaftswunder"
        },
        {
            type: "video", tier: "high",
            title: "Post-War Rebuilding and the Cold War: Crash Course European History #41",
            publisher: "Crash Course History",
            url: "https://www.youtube.com/watch?v=-rkIqtV07HE"
        }
        
    ],

    "germany_modern_power": [
        {
            type: "primary", tier: "high",
            title: "Treaty on the Final Settlement with Respect to Germany (the \"Two Plus Four Treaty,\" 12 September 1990) — the international agreement restoring full German sovereignty and enabling reunification",
            publisher: "U.S. Diplomatic Mission to Germany (full text)",
            url: "https://usa.usembassy.de/etexts/2plusfour8994e.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "History of Germany (1990–present)",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/History_of_Germany_(1990%E2%80%93present)"
        },
        {
            type: "secondary", tier: "high",
            title: "Germany — economic unification and beyond",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/place/Germany/Economic-unification-and-beyond"
        },
        {
            type: "video", tier: "high",
            title: "German Reunification – A Short History",
            publisher: "DW Documentary (Deutsche Welle)",
            url: "https://www.youtube.com/watch?v=iNAxfWCwDsw"
        }
    ],

    // ── Australia ───────────────────────────────────────────────────────,

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
            type: "primary", tier: "high",
            title: "The Napoleonic Code (Code Civil des Français, 21 March 1804) — full text of Napoleon's civil code, one of his empire's most enduring institutional legacies",
            publisher: "The Napoleon Series (full annotated English translation)",
            url: "https://www.napoleon-series.org/government/code-napoleon/"
        },
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

    // ── Asia ────────────────────────────────────────────────────────────,

    "austria_early": [
        {
            type: "primary", tier: "high",
            title: "Hallstatt-Dachstein/Salzkammergut cultural landscape — World Heritage documentation",
            publisher: "UNESCO World Heritage Centre",
            url: "https://whc.unesco.org/en/list/806"
        },
        {
            type: "secondary", tier: "high",
            title: "Hallstatt culture — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Hallstatt_culture"
        },
        {
            type: "video", tier: "high",
            title: "The Complete History Of The Celts In 2.5 Hours",
            publisher: "Chronicle",
            url: "https://www.youtube.com/watch?v=_m0TFDZufSw"
        }
    ],

    "austria_2": [
        {
            type: "primary", tier: "high",
            title: "Res Gestae Divi Augusti (Augustus's own account of his reign, incl. Alpine annexations)",
            publisher: "Lacus Curtius / Bill Thayer",
            url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Augustus/Res_Gestae/home.html"
        },
        {
            type: "secondary", tier: "high",
            title: "Noricum — Roman province overview",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/place/Noricum"
        },
        {
            type: "video", tier: "high",
            title: "Augustus: Rise of the Roman Empire",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=OgoEPs3FxaM"
        }
    ],

    "austria_3": [
        {
            type: "primary", tier: "high",
            title: "Eugippius, The Life of Saint Severinus (c. 511 CE) — eyewitness account of Roman Noricum's collapse",
            publisher: "Tertullian.org (Robinson translation)",
            url: "https://www.tertullian.org/fathers/severinus_02_text.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Fall of the Western Roman Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Fall_of_the_Western_Roman_Empire"
        },
        {
            type: "video", tier: "high",
            title: "How the Fall of Rome Transformed the Mediterranean",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=32a6sAvi2j8"
        }
    ],

    "austria_4": [
        {
            type: "primary", tier: "medium",
            title: "Ostarrîchi: Austria under the Babenbergs (976–1156) — primary-source chronology",
            publisher: "Die Welt der Habsburger (Austrian Academy of Sciences)",
            url: "https://www.habsburger.net/en/chapter/ostarrichi-austria-under-babenbergs"
        },
        {
            type: "secondary", tier: "high",
            title: "House of Babenberg — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/House_of_Babenberg"
        },
        {
            type: "video", tier: "medium",
            title: "Rise of the Habsburgs — Origins of the Dynasty",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=op4sAomApBE"
        }
    ],

    "austria_5": [
        {
            type: "primary", tier: "high",
            title: "Privilegium Minus (1156 CE) — the charter elevating Austria to a duchy",
            publisher: "Wikipedia (sourced text and provisions of the original charter)",
            url: "https://en.wikipedia.org/wiki/Privilegium_Minus"
        },
        {
            type: "secondary", tier: "high",
            title: "Duchy of Austria — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Duchy_of_Austria"
        },
        {
            type: "video", tier: "medium",
            title: "Rise of the Habsburgs — Origins of the Dynasty",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=op4sAomApBE"
        }
    ],

    "austria_6": [
        {
            type: "primary", tier: "medium",
            title: "The Habsburgs Take Over Austria (1278–1282) — primary-source chronology of Rudolf I's conquest",
            publisher: "Die Welt der Habsburger (Austrian Academy of Sciences)",
            url: "https://www.habsburger.net/en/chapter/habsburgs-take-over-austria"
        },
        {
            type: "secondary", tier: "high",
            title: "Battle on the Marchfeld (1278) and the Habsburg acquisition of Austria",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Battle_on_the_Marchfeld"
        },
        {
            type: "video", tier: "medium",
            title: "Rise of the Habsburgs — Origins of the Dynasty",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=op4sAomApBE"
        }
    ],

    "austria_7": [
        {
            type: "primary", tier: "medium",
            title: "Maximilian I and the Habsburg matrimonial policy — primary-source chronology of the Burgundian, Spanish and Jagiellonian marriages",
            publisher: "Die Welt der Habsburger (Austrian Academy of Sciences)",
            url: "https://www.habsburger.net/en/chapter/maximilian-and-habsburg-matrimonial-policy"
        },
        {
            type: "secondary", tier: "high",
            title: "Habsburg monarchy — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Habsburg_monarchy"
        },
        {
            type: "video", tier: "high",
            title: "Why Was the Habsburg Empire Divided?",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=XPNv0iewEFE"
        }
    ],

    "austria_8": [
        {
            type: "primary", tier: "high",
            title: "Francis II proclaims himself Emperor of Austria (1804) — contemporary portrait & documentary record",
            publisher: "German History in Documents and Images (GHI Washington)",
            url: "https://germanhistorydocs.org/en/the-holy-roman-empire-1648-1815/francis-ii-holy-roman-emperor-c-1804"
        },
        {
            type: "secondary", tier: "high",
            title: "Austrian Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Austrian_Empire"
        },
        {
            type: "video", tier: "high",
            title: "Why Didn't Anyone Revive the Holy Roman Empire?",
            publisher: "History Matters",
            url: "https://www.youtube.com/watch?v=yn7Od6IszRU"
        }
    ],

    "austria_9": [
        {
            type: "primary", tier: "high",
            title: "Battle of Vienna (1683) — sources, order of battle and aftermath",
            publisher: "Wikipedia (primary-sourced battle record)",
            url: "https://en.wikipedia.org/wiki/Battle_of_Vienna"
        },
        {
            type: "secondary", tier: "high",
            title: "Siege of Vienna — historical overview",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/event/Siege-of-Vienna-1683"
        },
        {
            type: "video", tier: "high",
            title: "The (Staggering) Siege of Vienna 1683",
            publisher: "SandRhoman History",
            url: "https://www.youtube.com/watch?v=ukyquQkQAYo"
        }
    ],

    "austria_10": [
        {
            type: "primary", tier: "high",
            title: "Declaration of His Majesty the Emperor Francis II, whereby he abdicates the German imperial throne and the imperial government (1806) — the actual abdication document",
            publisher: "German History in Documents and Images (GHI Washington)",
            url: "https://germanhistorydocs.org/en/the-holy-roman-empire-1648-1815/declaration-of-his-majesty-the-emperor-francis-ii-whereby-he-abdicates-the-german-imperial-throne-and-the-imperial-government"
        },
        {
            type: "secondary", tier: "high",
            title: "Dissolution of the Holy Roman Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Dissolution_of_the_Holy_Roman_Empire"
        },
        {
            type: "video", tier: "high",
            title: "Why Didn't Anyone Revive the Holy Roman Empire?",
            publisher: "History Matters",
            url: "https://www.youtube.com/watch?v=yn7Od6IszRU"
        }
    ],

    "austria_11": [
        {
            type: "primary", tier: "high",
            title: "Final Act of the Congress of Vienna (1815) — Austrian copy, digitised",
            publisher: "Austrian Commission for UNESCO / Memory of the World",
            url: "https://www.unesco.at/en/communication/documentary-heritage/memory-of-the-world-in-austria/final-document-of-the-congress-of-vienna-1815"
        },
        {
            type: "secondary", tier: "high",
            title: "Congress of Vienna — overview",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/event/Congress-of-Vienna"
        },
        {
            type: "video", tier: "high",
            title: "The Congress of Vienna (Part 1) (1814)",
            publisher: "Historia Civilis",
            url: "https://www.youtube.com/watch?v=QtOXq9SwarQ"
        }
    ],

    "austria_12": [
        {
            type: "primary", tier: "medium",
            title: "Ferdinand I's Kremsier constitutional documents & abdication instrument (1848–49) — background and text",
            publisher: "Wikipedia (sourced overview of the 1848 constitutional documents)",
            url: "https://en.wikipedia.org/wiki/Kremsier_Constitution"
        },
        {
            type: "secondary", tier: "high",
            title: "Revolutions of 1848 in the Austrian Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Revolutions_of_1848_in_the_Austrian_Empire"
        },
        {
            type: "video", tier: "high",
            title: "1848: Europe's Year of Revolutions",
            publisher: "Epic History TV",
            url: "https://www.youtube.com/watch?v=dPUVlVmwHc0"
        }
    ],

    "austria_13": [
        {
            type: "primary", tier: "high",
            title: "Austro-Hungarian Compromise (Ausgleich) of 1867 — text and terms",
            publisher: "Wikisource / Wikipedia primary-text overview",
            url: "https://en.wikipedia.org/wiki/Austro-Hungarian_Compromise_of_1867"
        },
        {
            type: "secondary", tier: "high",
            title: "Ausgleich — Compromise, Dual Monarchy, 1867",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/event/Ausgleich"
        },
        {
            type: "video", tier: "medium",
            title: "8th February 1867: The Ausgleich, or the Austro-Hungarian Compromise",
            publisher: "HistoryPod",
            url: "https://www.youtube.com/watch?v=vbHuNEVUi4M"
        }
    ],

    "austria_14": [
        {
            type: "primary", tier: "high",
            title: "Treaty of Saint-Germain-en-Laye (1919) — full treaty text",
            publisher: "The Avalon Project, Yale Law School",
            url: "https://avalon.law.yale.edu/subject_menus/versailles_menu.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "Dissolution of Austria-Hungary — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Dissolution_of_Austria-Hungary"
        },
        {
            type: "video", tier: "high",
            title: "Why Didn't Austria-Hungary Try to Make Peace Earlier in World War One?",
            publisher: "History Matters",
            url: "https://www.youtube.com/watch?v=-HE1fDlWBp0"
        }
    ],

    "austria_15": [
        {
            type: "primary", tier: "medium",
            title: "Emperor Karl I's Renunciation Manifesto (11 November 1918) — text of Austria's imperial renunciation",
            publisher: "FirstWorldWar.com — Primary Documents",
            url: "https://www.firstworldwar.com/source/karlrenunciation.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "First Austrian Republic — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/First_Austrian_Republic"
        },
        {
            type: "video", tier: "medium",
            title: "Did Austria Want the Anschluss?",
            publisher: "History Matters",
            url: "https://www.youtube.com/watch?v=FEJZwtBk5Ug"
        }
    ],

    "austria_16": [
        {
            type: "primary", tier: "high",
            title: "Moscow Declaration (1943) — Allied declaration on the annexation of Austria",
            publisher: "Avalon Project, Yale Law School",
            url: "https://avalon.law.yale.edu/wwii/moscow.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "Anschluss — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Anschluss"
        },
        {
            type: "video", tier: "high",
            title: "Did Austria Want the Anschluss?",
            publisher: "History Matters",
            url: "https://www.youtube.com/watch?v=FEJZwtBk5Ug"
        }
    ],

    "austria_17": [
        {
            type: "primary", tier: "high",
            title: "Austrian State Treaty, 1955 — U.S. Department of State historical record",
            publisher: "U.S. Department of State, Office of the Historian",
            url: "https://2001-2009.state.gov/r/pa/ho/time/lw/107185.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Austrian State Treaty — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Austrian_State_Treaty"
        },
        {
            type: "video", tier: "high",
            title: "The Postwar Occupation of Austria",
            publisher: "History Matters",
            url: "https://www.youtube.com/watch?v=7ENqk13aY3c"
        }
    ],

    "austria_18": [
        {
            type: "primary", tier: "high",
            title: "Declaration of Neutrality (26 October 1955) — Austrian constitutional law text",
            publisher: "Wikipedia (primary-text overview and citations)",
            url: "https://en.wikipedia.org/wiki/Declaration_of_Neutrality"
        },
        {
            type: "secondary", tier: "high",
            title: "Austria and its Neutrality — a Cold War tradition",
            publisher: "Neutrality Studies",
            url: "https://neutralitystudies.com/2020/10/austria-and-its-neutrality-a-tradition-with-potential/"
        },
        {
            type: "video", tier: "high",
            title: "The Postwar Occupation of Austria",
            publisher: "History Matters",
            url: "https://www.youtube.com/watch?v=7ENqk13aY3c"
        }
    ],

    // ── History Bites: Ancient Greece ──────────────────────────────────,

    "poland_10": [
        {
            type: "primary", tier: "high",
            title: "The Third Partition treaty (24 October 1795) — the agreement between Russia, Prussia, and Austria dividing the last remnants of the Polish–Lithuanian Commonwealth, extinguishing the Polish state",
            publisher: "Internet History Sourcebooks Project, Fordham University",
            url: "https://sourcebooks.web.fordham.edu/mod/1795Poland-division.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "Partitions of Poland — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Partitions_of_Poland"
        },
        {
            type: "secondary", tier: "high",
            title: "Partitions of Poland — summary",
            publisher: "Encyclopaedia Britannica",
            url: "https://www.britannica.com/event/Partitions-of-Poland"
        },
        {
            type: "video", tier: "medium",
            title: "This Country Disappeared 8 TIMES....",
            publisher: "Historically",
            url: "https://www.youtube.com/watch?v=F0_d1xjk2to"
        }
    ],

    "poland_11": [
        {
            type: "primary", tier: "high",
            title: "The Constitution of the Duchy of Warsaw (22 July 1807) — Napoleon's own constitutional grant establishing the first re-created Polish state since the partitions, including the abolition of serfdom and equality before the law",
            publisher: "Polish Freedom (full English translation)",
            url: "https://polishfreedom.pl/en/constitution-of-the-duchy-of-warsaw/"
        },
        {
            type: "secondary", tier: "high",
            title: "Duchy of Warsaw — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Duchy_of_Warsaw"
        },
        {
            type: "video", tier: "high",
            title: "The Duchy of Warsaw, 1807-1815",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=F16Ve1QdEkM"
        }
    ],

    "poland_12": [
        {
            type: "primary", tier: "high",
            title: "The Manifesto of the Provisional National Government (22 January 1863) — the underground government's own proclamation launching the January Uprising, declaring \"all sons of Poland are free and equal citizens without distinction of creed, condition or rank\"",
            publisher: "Wikipedia (sourced overview of the primary manifesto)",
            url: "https://en.wikipedia.org/wiki/January_Uprising"
        },
        {
            type: "secondary", tier: "high",
            title: "November Uprising — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/November_Uprising"
        },
        {
            type: "video", tier: "high",
            title: "November Uprising (1830–31) | 1000 Years of Poland",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=B28Q6201YVY"
        }
    ],

    "poland_13": [
        {
            type: "primary", tier: "high",
            title: "Józef Piłsudski's diplomatic note of 16 November 1918 — his own announcement to the world's governments of the creation of the independent Polish State, issued five days after assuming command",
            publisher: "Institute of National Remembrance (IPN)",
            url: "https://eng.ipn.gov.pl/en/news/9969,On-11-November-Poland-celebrates-National-Independence-Day.html"
        },
        {
            type: "secondary", tier: "high",
            title: "History of Poland (1918–1939) — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/History_of_Poland_(1918%E2%80%931939)"
        },
        {
            type: "video", tier: "high",
            title: "The Polish–Soviet War 1919–1921: The Miracle on the Vistula That Stopped Communism",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=ehKEsZxdfBE"
        }
    ],

    // ── South Africa ────────────────────────────────────────────────────,

    "poland_1": [
        {
            type: "primary", tier: "high",
            title: "Dagome Iudex (c. 991–92 CE) — the earliest surviving document relating to the Polish state, in which Mieszko I placed his realm (\"Civitas Schinesghe\") under the protection of the Holy See; survives only as a later summary, c. 1080",
            publisher: "Wikipedia (sourced overview of the primary document)",
            url: "https://en.wikipedia.org/wiki/Dagome_Iudex"
        },
        {
            type: "secondary", tier: "high",
            title: "Baptism of Poland — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Baptism_of_Poland"
        },
        {
            type: "video", tier: "high",
            title: "How the Piast Dynasty Shaped Poland – And Then Vanished",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=PcH0nq0_VQw"
        }
    ],

    "poland_2": [
        {
            type: "primary", tier: "high",
            title: "Gallus Anonymus, Gesta principum Polonorum (c. 1112–18 CE) — the earliest Polish chronicle, and the Testament of Bolesław III Wrymouth (1138), whose division of the realm among his sons triggered nearly two centuries of Piast fragmentation",
            publisher: "Wikipedia (sourced overview of the primary chronicle and testament)",
            url: "https://en.wikipedia.org/wiki/Gesta_principum_Polonorum"
        },
        {
            type: "secondary", tier: "high",
            title: "Fragmentation of Poland — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Fragmentation_of_Poland"
        },
        {
            type: "video", tier: "high",
            title: "How the Piast Dynasty Shaped Poland – And Then Vanished",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=PcH0nq0_VQw"
        }
    ],

    "poland_3": [
        {
            type: "primary", tier: "high",
            title: "The Statutes of Wiślica (1347 CE) — Casimir the Great's own codification of civil and criminal law for Greater and Lesser Poland, which earned him the epithet \"the Polish Justinian\"",
            publisher: "Wikipedia (sourced overview of the primary legal code)",
            url: "https://en.wikipedia.org/wiki/Casimir_III_the_Great"
        },
        {
            type: "secondary", tier: "high",
            title: "Casimir III the Great — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Casimir_III_the_Great"
        },
        {
            type: "video", tier: "high",
            title: "How the Piast Dynasty Shaped Poland – And Then Vanished",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=PcH0nq0_VQw"
        }
    ],

    "poland_4": [
        {
            type: "primary", tier: "high",
            title: "The Union of Krewo (14 August 1385) — the prenuptial agreement between Grand Duke Jogaila of Lithuania and the Polish lords that established the Polish-Lithuanian personal union and led to his baptism and marriage to Queen Jadwiga",
            publisher: "Wikipedia (sourced overview of the primary agreement)",
            url: "https://en.wikipedia.org/wiki/Union_of_Krewo"
        },
        {
            type: "secondary", tier: "high",
            title: "Jagiellonian dynasty — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Jagiellonian_dynasty"
        },
        {
            type: "video", tier: "high",
            title: "Battle of Grunwald 1410 - Northern Crusades DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=VeBOJ0bAI6Q"
        }
    ],

    "poland_5": [
        {
            type: "primary", tier: "high",
            title: "Jan Długosz's account of the Battle of Grunwald, from his Historiae Polonicae (written c. 1455–80, six decades after the battle) — the most detailed surviving narrative, though written well after the events by a chronicler with acknowledged biases",
            publisher: "De Re Militari (Society for Medieval Military History)",
            url: "https://www.deremilitari.org/RESOURCES/SOURCES/dlugosz.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Battle of Grunwald — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Battle_of_Grunwald"
        },
        {
            type: "video", tier: "high",
            title: "Battle of Grunwald 1410 - Northern Crusades DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=VeBOJ0bAI6Q"
        }
    ],

    "poland_6": [
        {
            type: "primary", tier: "high",
            title: "The Nihil Novi Act (1505 CE) — the constitutional act adopted by the Sejm at Radom transferring legislative power from the king to parliament, founding the era of \"nobles' democracy\"",
            publisher: "Wikipedia (sourced overview of the primary act)",
            url: "https://en.wikipedia.org/wiki/Nihil_novi"
        },
        {
            type: "secondary", tier: "high",
            title: "Polish Golden Age — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Polish_Golden_Age"
        },
        {
            type: "video", tier: "high",
            title: "Poland-Lithuania Explained",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=aG57aff38-E"
        }
    ],

    "poland_7": [
        {
            type: "primary", tier: "high",
            title: "The Act of the Union of Lublin (1 July 1569) — full text of the founding treaty creating the Polish–Lithuanian Commonwealth, one of the largest states in Europe",
            publisher: "Historical source editions collection (history.pth.net.pl), with UNESCO Memory of the World documentation",
            url: "http://www.history.pth.net.pl/files/source_editions/The_Union_of_Lublin_1569.pdf"
        },
        {
            type: "secondary", tier: "high",
            title: "Polish–Lithuanian Commonwealth — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Polish%E2%80%93Lithuanian_Commonwealth"
        },
        {
            type: "video", tier: "high",
            title: "Poland-Lithuania Explained",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=aG57aff38-E"
        }
    ],

    "poland_8": [
        {
            type: "primary", tier: "high",
            title: "Augustyn Kordecki, Nova Gigantomachia (1658 CE) — the Pauline prior's own published account of defending the Jasna Góra monastery against the Swedish siege, the symbolic turning point of the Deluge",
            publisher: "Wikipedia (sourced overview of the primary account)",
            url: "https://en.wikipedia.org/wiki/Siege_of_Jasna_G%C3%B3ra"
        },
        {
            type: "secondary", tier: "high",
            title: "The Deluge (history) — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Deluge_(history)"
        },
        {
            type: "video", tier: "high",
            title: "Swedish Invasion of Poland: The Plunder That Changed Europe",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=CE8kEiP79Xs"
        }
    ],

    "poland_9": [
        {
            type: "primary", tier: "high",
            title: "King Jan III Sobieski's letter to Queen Maria Kazimiera, written the night after the victory (13 September 1683) — the Polish king's own eyewitness account, including his famous line on the scale of the triumph",
            publisher: "Museum of King Jan III's Palace at Wilanów (annotated scholarly translation)",
            url: "https://wilanow-palac.pl/en/knowledge/letter-of-jan-iii-sobieski-to-maria-kazimiera-13-ix-1683"
        },
        {
            type: "secondary", tier: "high",
            title: "Battle of Vienna — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Battle_of_Vienna"
        },
        {
            type: "video", tier: "high",
            title: "The (Staggering) Siege of Vienna 1683",
            publisher: "SandRhoman History",
            url: "https://www.youtube.com/watch?v=ukyquQkQAYo"
        }
    ],

    "poland_14": [
        {
            type: "primary", tier: "high",
            title: "The Molotov–Ribbentrop Pact and its Secret Protocol (23 August 1939) — the actual treaty text between Nazi Germany and the Soviet Union, including the secret protocol dividing Poland into German and Soviet spheres of influence",
            publisher: "European Network Remembrance and Solidarity (ENRS, full English text PDF)",
            url: "https://enrs.eu/uploads/media/The%20Molotov-Ribbentrop%20Pact_en%20text.pdf"
        },
        {
            type: "secondary", tier: "high",
            title: "Invasion of Poland — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Invasion_of_Poland"
        },
        {
            type: "video", tier: "high",
            title: "German-Soviet Invasion of Poland 1939 (WW2 Documentary)",
            publisher: "Real Time History",
            url: "https://www.youtube.com/watch?v=7B1AkE6ePo8"
        }
    ],

    "poland_15": [
        {
            type: "primary", tier: "high",
            title: "The Diary of Hans Frank, Governor-General of occupied Poland (October 1939 – March 1945) — the daily journal of the German administrator directly responsible for the Generalgouvernement, documenting meetings, speeches, and administrative decisions from the perpetrator's own hand",
            publisher: "United States Holocaust Memorial Museum (Holocaust Encyclopedia)",
            url: "https://encyclopedia.ushmm.org/content/en/article/german-administration-of-poland"
        },
        {
            type: "secondary", tier: "high",
            title: "Occupation of Poland (1939–1945) — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Occupation_of_Poland_(1939%E2%80%931945)"
        },
        {
            type: "secondary", tier: "high",
            title: "The Holocaust in Poland — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/The_Holocaust_in_Poland"
        },
        {
            type: "video", tier: "high",
            title: "The Auschwitz-Birkenau Concentration and Extermination Camp | Key Historical Concepts",
            publisher: "Yad Vashem",
            url: "https://www.youtube.com/watch?v=p6oEYqtYzco"
        }
    ],

    "poland_16": [
        {
            type: "primary", tier: "high",
            title: "General Tadeusz \"Bór\" Komorowski's order launching the Warsaw Uprising (31 July 1944) — the Home Army commander's own decision to attack, made as Soviet forces appeared to be approaching the city (the Red Army in fact halted nearby and did not intervene to support the rising, a still-debated decision)",
            publisher: "Wikipedia (sourced overview of the primary order and its context)",
            url: "https://en.wikipedia.org/wiki/Warsaw_Uprising"
        },
        {
            type: "secondary", tier: "high",
            title: "Warsaw Uprising — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Warsaw_Uprising"
        },
        {
            type: "video", tier: "high",
            title: "The Warsaw Uprising | 63 Days of Defiance",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=0kJbJ88MOU0"
        }
    ],

    "poland_17": [
        {
            type: "primary", tier: "high",
            title: "The Constitution of the Polish People's Republic (22 July 1952) — the founding legal document of communist Poland, modelled on the 1936 Soviet \"Stalin Constitution\" and reportedly reviewed and corrected by Stalin himself before translation into Polish",
            publisher: "Wikipedia (sourced overview of the primary constitution)",
            url: "https://en.wikipedia.org/wiki/Constitution_of_the_Polish_People%27s_Republic"
        },
        {
            type: "secondary", tier: "high",
            title: "People's Republic of Poland — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/People%27s_Republic_of_Poland_(1945-1989)"
        },
        {
            type: "secondary", tier: "high",
            title: "1956 Poznań protests — the first major public challenge to communist rule",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/1956_Pozna%C5%84_protests"
        },
        {
            type: "video", tier: "medium",
            title: "Inside Communist Poland's Cold War Liberalisation | Roving Report (1959)",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=LkUBXpWsDQQ"
        }
    ],

    "poland_18": [
        {
            type: "primary", tier: "high",
            title: "The Twenty-One Demands of Gdańsk (August 1980) — the Interfactory Strike Committee's own list of demands that led to the Gdańsk Agreement and the birth of Solidarity, the first free trade union in the Soviet bloc",
            publisher: "UNESCO Memory of the World",
            url: "https://www.unesco.org/en/memory-world/twenty-one-demands-gdansk-august-1980-birth-solidarity-trades-union-massive-social-movement"
        },
        {
            type: "secondary", tier: "high",
            title: "Solidarity (Polish trade union) — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Solidarity_(Polish_trade_union)"
        },
        {
            type: "video", tier: "high",
            title: "Poland: The Legacy of Lech Walesa and the Solidarity Movement | Focus on Europe",
            publisher: "DW",
            url: "https://www.youtube.com/watch?v=qcSEIxxXXcY"
        }
    ],

    "poland_19": [
        {
            type: "primary", tier: "high",
            title: "The Polish Round Table Agreement (6 April 1989) — the actual negotiated agreement between the communist government and the Solidarity opposition that legalised the union, created the office of president, and permitted partly free elections, ending four decades of one-party rule (note: some participants and later critics have characterised the talks as a managed transition rather than a clean break — a debate the historical record itself preserves)",
            publisher: "Wikipedia (sourced overview of the primary agreement)",
            url: "https://en.wikipedia.org/wiki/Polish_Round_Table_Agreement"
        },
        {
            type: "secondary", tier: "high",
            title: "History of Poland (1989–present) — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/History_of_Poland_(1989%E2%80%93present)"
        },
        {
            type: "video", tier: "high",
            title: "Last Days of Communist Poland (1989) | A Day in Warsaw During Democratic Revolution",
            publisher: "YouTube",
            url: "https://www.youtube.com/watch?v=4rEQ-3TLfTg"
        }
    ],

    "poland_20": [
        {
            type: "primary", tier: "high",
            title: "The 2003 Treaty of Accession (signed 16 April 2003, Athens) — the treaty by which Poland and nine other states joined the European Union, entering into force 1 May 2004, following a 2003 referendum in which 77.5% of Polish voters approved membership",
            publisher: "Wikipedia (sourced overview of the primary treaty)",
            url: "https://en.wikipedia.org/wiki/2004_enlargement_of_the_European_Union"
        },
        {
            type: "secondary", tier: "high",
            title: "History of Poland (1989–present) — 21st-century overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/History_of_Poland_(1989%E2%80%93present)"
        },
        {
            type: "video", tier: "high",
            title: "Poland on NATO's Frontline: Can It Stop Russia Without the US? | Mapped Out",
            publisher: "DW",
            url: "https://www.youtube.com/watch?v=e1vi6gY6It8"
        }
    ]
});
