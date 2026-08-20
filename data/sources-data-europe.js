// Curated primary/secondary/video sources for Europe scenes (Austria, France, Germany, Poland, UK, etc).
// Split from the original sources-data.js to keep per-file size down; each file
// merges into the shared window.WHD_SOURCES object rather than reassigning it,
// so files can load in any order without clobbering each other.
window.WHD_SOURCES = Object.assign(window.WHD_SOURCES || {}, {

    "spain_democracy": [
        {
            type: "primary", tier: "high",
            title: "The Spanish Constitution of 1978 — the founding legal document of modern democratic Spain, approved by referendum after Franco's death, establishing a parliamentary constitutional monarchy",
            publisher: "Spanish Senate (Senado de España) — official English translation",
            url: "https://www.senado.es/web/conocersenado/normas/constitucion/index.html?lang=en"
        },
        {
            type: "secondary", tier: "high",
            title: "Spanish transition to democracy — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Spanish_transition_to_democracy"
        },
        {
            type: "video", tier: "high",
            title: "The revival of Spain's dictator Franco?",
            publisher: "DW Documentary",
            url: "https://www.youtube.com/watch?v=iM_vsYi46do"
        }
    ],

    "spain_ww2": [
        {
            type: "primary", tier: "high",
            title: "US diplomatic telegrams on Franco's Spain's shifting neutrality/non-belligerence policy (1940-1943) — contemporary State Department reporting on Franco's balancing act between the Axis and Allies, including the withdrawal of the Blue Division",
            publisher: "Office of the Historian, U.S. Department of State — Foreign Relations of the United States (FRUS) series, official documents",
            url: "https://history.state.gov/historicaldocuments/frus1943v02/d558"
        },
        {
            type: "secondary", tier: "high",
            title: "Spain during World War II — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Spain_during_World_War_II"
        },
        {
            type: "video", tier: "high",
            title: "The Blue Division: How Spain Sent Thousands to Die on the Eastern Front | WW2",
            publisher: "YouTube (independent history documentary)",
            url: "https://www.youtube.com/watch?v=DXUANWuT-KM"
        }
    ],

    "spain_civil_war": [
        {
            type: "primary", tier: "high",
            title: "General Franco's Proclamation of the Uprising (18 July 1936) — the founding manifesto of the Nationalist rebellion that ignited the Spanish Civil War",
            publisher: "Retóricas.com — compiled original speech texts",
            url: "https://www.retoricas.com/2009/07/recopilacion-discursos-general-franco.html"
        },
        {
            type: "secondary", tier: "high",
            title: "Spanish Civil War — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Spanish_Civil_War"
        },
        {
            type: "video", tier: "high",
            title: "BBC Spanish Civil War (playlist)",
            publisher: "BBC",
            url: "https://www.youtube.com/playlist?list=PLH4to6F_MKfJGJf_4mSL_Xh6fVhHe86tB"
        }
    ],

    "spain_ww1": [
        {
            type: "primary", tier: "high",
            title: "The Spanish declaration of neutrality (Gaceta de Madrid, 30 July 1914) — the Dato government's official notice ordering \"the strictest neutrality\" of Spanish subjects at the outbreak of the war",
            publisher: "Derecho Internacional Público (dipublico.org) — full original text",
            url: "https://www.dipublico.org/109716/declaracion-de-neutralidad-de-espana-nota-del-ministerio-de-estado-seccion-de-politica-publicada-en-la-gaceta-de-madrid-del-30-de-julio-de-1914/"
        },
        {
            type: "secondary", tier: "high",
            title: "Spain during World War I — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Spain_during_World_War_I"
        },
        {
            type: "video", tier: "medium",
            title: "World War 1 (All Parts)",
            publisher: "Epic History TV",
            url: "https://www.youtube.com/watch?v=G1p6rlDCxq0"
        }
    ],

    "spain_napoleon": [
        {
            type: "primary", tier: "high",
            title: "The Bayonne Statute (6 July 1808) — the Napoleonic constitution imposed by Joseph Bonaparte as king of Spain, rejected by most Spaniards and sparking the Peninsular War",
            publisher: "Wikisource (Spanish) — full original text",
            url: "https://es.wikisource.org/wiki/Constituci%C3%B3n_de_Bayona_de_1808"
        },
        {
            type: "secondary", tier: "high",
            title: "Peninsular War — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Peninsular_War"
        },
        {
            type: "video", tier: "high",
            title: "Peninsular War (playlist)",
            publisher: "Epic History TV",
            url: "https://www.youtube.com/playlist?list=PLUOc2qodFHp9Mtqsbkx2kOz8coMNn0aAM"
        }
    ],

    "spain_decline": [
        {
            type: "primary", tier: "high",
            title: "The Treaty of Utrecht (1713) — the peace settlement ending the War of the Spanish Succession, in which Spain ceded Gibraltar and Minorca and lost its European territories, marking the empire's decline as a European power",
            publisher: "Wikisource — full English text",
            url: "https://en.wikisource.org/wiki/Treaty_of_Utrecht"
        },
        {
            type: "secondary", tier: "high",
            title: "War of the Spanish Succession — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/War_of_the_Spanish_Succession"
        },
        {
            type: "video", tier: "high",
            title: "Battle of Cartagena de Indias 1741 - Anglo-Spanish War DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=RoE-eIUZ4RY"
        }
    ],

    "spain_empire_peak": [
        {
            type: "primary", tier: "high",
            title: "The Treaty of Tordesillas (7 June 1494) — the agreement between Spain and Portugal dividing the newly-discovered non-European world along a meridian, the legal foundation of Spain's global empire",
            publisher: "Avalon Project, Yale Law School — full English translation",
            url: "https://avalon.law.yale.edu/15th_century/mod001.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "Spanish Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Spanish_Empire"
        },
        {
            type: "video", tier: "high",
            title: "Why Was the Habsburg Empire Divided? - Kings and Generals DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=XPNv0iewEFE"
        }
    ],

    "spain_columbus": [
        {
            type: "primary", tier: "high",
            title: "Columbus's letter announcing his discoveries to Ferdinand and Isabella (15 February - 4 March 1493) — the explorer's own first report of the voyage, printed and circulated across Europe within weeks",
            publisher: "Library of Congress — digitized facsimile of the original printed letter",
            url: "https://www.loc.gov/item/02012520/"
        },
        {
            type: "secondary", tier: "high",
            title: "Voyages of Christopher Columbus — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Voyages_of_Christopher_Columbus"
        },
        {
            type: "video", tier: "medium",
            title: "Christopher Columbus | Full Documentary | Biography",
            publisher: "Biography",
            url: "https://www.youtube.com/watch?v=BO9Qnxwjwyw"
        }
    ],

    "spain_granada": [
        {
            type: "primary", tier: "high",
            title: "The Treaty of Granada (25 November 1491) — the surrender agreement between Emir Boabdil and the Catholic Monarchs Ferdinand and Isabella, ending 800 years of Muslim rule in Iberia",
            publisher: "Wikisource (Spanish) — full original text",
            url: "https://es.wikisource.org/wiki/Tratado_de_Granada"
        },
        {
            type: "secondary", tier: "high",
            title: "Granada War — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Granada_War"
        },
        {
            type: "video", tier: "medium",
            title: "Fall of Granada: How Muslims Lost Spain After 800 Years",
            publisher: "YouTube (independent history documentary)",
            url: "https://www.youtube.com/watch?v=io5ctfYoK18"
        }
    ],

    "spain_reconquista_late": [
        {
            type: "primary", tier: "high",
            title: "The Latin Chronicle of the Kings of Castile (written before 1230, concluding c. 1236) — a contemporary narrative source describing the 1212 Battle of Las Navas de Tolosa, the decisive turning point of the late Reconquista",
            publisher: "De Re Militari (Society for Medieval Military History) — full translated excerpt",
            url: "https://www.deremilitari.org/RESOURCES/SOURCES/tolosa2.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Battle of Las Navas de Tolosa — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Battle_of_Las_Navas_de_Tolosa"
        },
        {
            type: "video", tier: "high",
            title: "Battle of Las Navas de Tolosa (1212) DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=Yl8iWejuZmM"
        }
    ],

    "spain_reconquista_early": [
        {
            type: "primary", tier: "high",
            title: "The Chronicle of Alfonso III (composed c. 883 CE) — the earliest detailed narrative of the Battle of Covadonga (722) and Pelayo's founding of the Kingdom of Asturias, the traditional start of the Reconquista",
            publisher: "Aymennjawad.org — full English translation by independent researcher Aymenn Jawad Al-Tamimi",
            url: "https://aymennjawad.org/24483/the-chronicle-of-alfonso-iii-the-kingdom"
        },
        {
            type: "secondary", tier: "high",
            title: "Battle of Covadonga — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Battle_of_Covadonga"
        },
        {
            type: "video", tier: "medium",
            title: "El Cid: Knight of the Two Worlds - Reconquista DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=C8xEyqR5JuA"
        }
    ],

    "spain_taifa": [
        {
            type: "primary", tier: "high",
            title: "Poema del Cid / Cantar de mio Cid (composed 12th century) — the earliest surviving complete Castilian epic poem, chronicling El Cid's exploits amid the fractured Taifa kingdoms",
            publisher: "Library of Congress — the sole surviving manuscript (Codex of Per Abat, 1207)",
            url: "https://www.loc.gov/item/2021667707/"
        },
        {
            type: "secondary", tier: "high",
            title: "Taifa kingdoms — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Taifa"
        },
        {
            type: "video", tier: "high",
            title: "El Cid: Knight of the Two Worlds - Reconquista DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=C8xEyqR5JuA"
        }
    ],

    "spain_caliphate": [
        {
            type: "primary", tier: "high",
            title: "Abd al-Rahman III's proclamation letter declaring himself Caliph (16 January 929) — the ruler's own letter announcing his new title, read: \"We are the most worthy to fulfil our right, and the most entitled to complete our good fortune...\"",
            publisher: "C3 Teachers (curriculum resource citing the primary proclamation letter)",
            url: "https://c3teachers.org/wp-content/uploads/2024/04/NewYork_6_Islamic_Spain.pdf"
        },
        {
            type: "secondary", tier: "high",
            title: "Caliphate of Córdoba — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Caliphate_of_C%C3%B3rdoba"
        },
        {
            type: "video", tier: "medium",
            title: "Abd al-Rahman I - Father of Muslim Spain - Medieval History DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=iHAcvlkeUZE"
        }
    ],

    "spain_umayyad": [
        {
            type: "primary", tier: "high",
            title: "Ibn Hayyan, Al-Muqtabis (11th century, drawing on earlier 10th-century Cordoban chroniclers) — the essential Andalusi chronicle of the Umayyad Emirate of Córdoba, founded by Abd al-Rahman I in 756",
            publisher: "Internet Archive — \"Anales Palatinos del Califa de Córdoba\" (Arabic text with Spanish translation, ed. Real Academia de la Historia)",
            url: "https://archive.org/stream/AnalesPalatinosDelCalifaDeCordobaIbnHayyan./Anales%20Palatinos%20del%20Califa%20de%20C%C3%B3rdoba%20(Ibn%20Hayyan)._djvu.txt"
        },
        {
            type: "secondary", tier: "high",
            title: "Emirate of Córdoba — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Emirate_of_C%C3%B3rdoba"
        },
        {
            type: "video", tier: "high",
            title: "Abd al-Rahman I - Father of Muslim Spain - Medieval History DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=iHAcvlkeUZE"
        }
    ],

    "spain_muslim_conquest": [
        {
            type: "primary", tier: "high",
            title: "The Chronicle of 754 (Mozarabic Chronicle) — a Christian eyewitness's near-contemporary Latin account of the Umayyad conquest of Visigothic Spain, including the Battle of Guadalete",
            publisher: "Aymennjawad.org — full English translation by independent researcher Aymenn Jawad Al-Tamimi",
            url: "https://www.aymennjawad.org/23270/the-mozarabic-chronicle-full-translation"
        },
        {
            type: "secondary", tier: "high",
            title: "Muslim conquest of the Iberian Peninsula — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Muslim_conquest_of_the_Iberian_Peninsula"
        },
        {
            type: "video", tier: "medium",
            title: "Tariq ibn Ziyad – The General Who Burned His Ships | Conquest of Spain & Battle of Guadalete",
            publisher: "YouTube (independent history documentary)",
            url: "https://www.youtube.com/watch?v=4RQ8l4UPBU8"
        }
    ],

    "spain_visigoth": [
        {
            type: "primary", tier: "high",
            title: "The Liber Iudiciorum / Visigothic Code (promulgated 654 CE by King Receswinth) — the Visigothic kingdom's own unified law code, merging Visigothic and Hispano-Roman legal traditions",
            publisher: "Internet Archive (S.P. Scott English translation, 1910, \"The Visigothic Code\")",
            url: "https://archive.org/details/cu31924072483419"
        },
        {
            type: "secondary", tier: "high",
            title: "Visigothic Kingdom — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Visigothic_Kingdom"
        },
        {
            type: "video", tier: "medium",
            title: "Alaric I: The Sack of Rome That Shook the Empire",
            publisher: "YouTube (independent history documentary)",
            url: "https://www.youtube.com/watch?v=infkw77R3XQ"
        }
    ],

    "spain_christianity": [
        {
            type: "primary", tier: "high",
            title: "The Canons of the Council of Elvira (early 4th century CE, held near modern Granada) — the earliest surviving disciplinary canons of the Spanish Christian church, attended by 19 bishops including Hosius of Córdoba",
            publisher: "EarlyChurchTexts.com — original Latin text with English translation",
            url: "https://earlychurchtexts.com/public/elvira_canons.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Synod of Elvira — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Synod_of_Elvira"
        },
        {
            type: "video", tier: "high",
            title: "Milvian Bridge 312 - Rise of Christianity DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=VbFtMXytMj8"
        }
    ],

    "spain_rome": [
        {
            type: "primary", tier: "high",
            title: "Strabo, Geography, Book III (written under Augustus and Tiberius) — a Greek geographer's detailed contemporary account of Roman Hispania's peoples, resources, and provinces",
            publisher: "LacusCurtius, University of Chicago (Loeb Classical Library edition, 1923)",
            url: "https://penelope.uchicago.edu/Thayer/e/roman/texts/strabo/3c*.html"
        },
        {
            type: "secondary", tier: "high",
            title: "Hispania — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Hispania"
        },
        {
            type: "video", tier: "medium",
            title: "Roman Politics: Republic vs Empire - Ancient History DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=VTQ7P2F1c6Y"
        }
    ],

    "spain_punic_wars": [
        {
            type: "primary", tier: "high",
            title: "Polybius, Histories, Book 3 (2nd century BCE) — the near-contemporary Greek historian's account of the Siege of Saguntum (219 BCE) in Spain, the event that triggered the Second Punic War",
            publisher: "Perseus Digital Library, Tufts University (Evelyn S. Shuckburgh translation, 1889)",
            url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0234:book=3:chapter=17"
        },
        {
            type: "secondary", tier: "high",
            title: "Second Punic War — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Second_Punic_War"
        },
        {
            type: "video", tier: "medium",
            title: "How Rome Outmaneuvered the Unbeatable Hannibal and Destroyed Carthage | Battle of Zama, 202 BC",
            publisher: "YouTube (independent history documentary)",
            url: "https://www.youtube.com/watch?v=PMmEVrTvKC8"
        }
    ],

    "spain_carthage": [
        {
            type: "primary", tier: "high",
            title: "Carthago Nova / Qart Hadasht (founded 228 BCE by Hasdrubal the Fair) — the Carthaginian capital of Iberia and Hannibal's base for his march on Italy",
            publisher: "Livius.org — dedicated article on the site's history",
            url: "https://www.livius.org/articles/place/carthago-nova-cartagena/"
        },
        {
            type: "secondary", tier: "high",
            title: "Barcid conquest of Hispania — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Barcid_conquest_of_Hispania"
        },
        {
            type: "video", tier: "high",
            title: "Armies and Tactics: Roman Legion Against Carthage and Hannibal",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=d8SXiwDzXp8"
        }
    ],

    "spain_phoenicians": [
        {
            type: "primary", tier: "high",
            title: "The Gadir Archaeological Site (founded c. 9th century BCE) — the excavated remains of Phoenician Gadir, considered the oldest continuously inhabited city in Western Europe",
            publisher: "Spain.info (official Spanish national tourism board, Ministry of Industry, Trade and Tourism)",
            url: "https://www.spain.info/en/places-of-interest/site-gadir/"
        },
        {
            type: "secondary", tier: "high",
            title: "Phoenicians — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Phoenicia"
        },
        {
            type: "video", tier: "high",
            title: "The Entire History of the Phoenicians (2500-300 BC) // Ancient History Documentary",
            publisher: "History Time",
            url: "https://www.youtube.com/watch?v=-p8OZz5KJoo"
        }
    ],

    "spain_iberians": [
        {
            type: "primary", tier: "high",
            title: "The Lady of Elche (4th century BCE) — a limestone Iberian funerary bust discovered at La Alcudia, showing both native Iberian and Hellenistic artistic influences",
            publisher: "Museo Arqueológico Nacional / Ministerio de Cultura (Spain's National Archaeological Museum)",
            url: "https://www.man.es/man/en/coleccion/catalogo-cronologico/protohistoria/dama-elche.html"
        },
        {
            type: "secondary", tier: "high",
            title: "Iberians — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Iberians"
        },
        {
            type: "video", tier: "high",
            title: "Full History of the Ancient Celts: Origins to Roman Conquest DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=uOaStDDogDY"
        }
    ],

    "russia_22": [
        {
            type: "primary", tier: "high",
            title: "Khrushchev's \"Secret Speech\" (25 February 1956) — the Soviet premier's own address to the 20th Party Congress denouncing Stalin's cult of personality and abuses of power, launching the \"Khrushchev Thaw\"",
            publisher: "Seventeen Moments in Soviet History, Michigan State University — academic primary source archive with full annotated text",
            url: "https://soviethistory.msu.edu/1956/khrushchevs-secret-speech/"
        },
        {
            type: "secondary", tier: "high",
            title: "Nikita Khrushchev — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Nikita_Khrushchev"
        },
        {
            type: "video", tier: "medium",
            title: "The Cuban Missile Crisis Explained In 20 Minutes | Best Cold War Documentary",
            publisher: "YouTube (independent history documentary)",
            url: "https://www.youtube.com/watch?v=1UbVuTXg4CQ"
        }
    ],

    "russia_21": [
        {
            type: "primary", tier: "high",
            title: "The Truman Doctrine speech (12 March 1947) — President Truman's own address to Congress announcing US support for nations resisting Soviet-backed communism, the opening declaration of Cold War containment policy",
            publisher: "Avalon Project, Yale Law School — full text",
            url: "https://avalon.law.yale.edu/20th_century/trudoc.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "Cold War — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Cold_War"
        },
        {
            type: "video", tier: "medium",
            title: "History of Russia in 100 Minutes (Full Video Course)",
            publisher: "YouTube (independent educational history series)",
            url: "https://www.youtube.com/playlist?list=PL3z21sNm6oEO6OdODdD_AcbxIV-ujhnDL"
        }
    ],

    "russia_20": [
        {
            type: "primary", tier: "high",
            title: "Vyacheslav Molotov's radio broadcast announcing the German invasion (22 June 1941) — the Soviet government's own first public statement on Operation Barbarossa, ending with \"Our cause is just. The enemy shall be defeated. Victory will be ours\"",
            publisher: "ibiblio.org — Pearl Harbor / World War II Document Archive, full text",
            url: "http://www.ibiblio.org/pha/policy/1941/410622c.html"
        },
        {
            type: "secondary", tier: "high",
            title: "Eastern Front (World War II) — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Eastern_Front_(World_War_II)"
        },
        {
            type: "video", tier: "high",
            title: "Leningrad Isolated, Moscow in Hitler's Sights - Eastern Front DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=j2YSQZ-1dbM"
        }
    ],

    "russia_19": [
        {
            type: "primary", tier: "high",
            title: "The Declaration and Treaty on the Creation of the USSR (30 December 1922) — the founding document uniting the Russian, Ukrainian, Byelorussian, and Transcaucasian Soviet republics into a single union state",
            publisher: "Seventeen Moments in Soviet History, Michigan State University — academic primary source archive",
            url: "https://soviethistory.msu.edu/1924-2/union-treaty/"
        },
        {
            type: "secondary", tier: "high",
            title: "History of the Soviet Union (1917-1927) — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/History_of_the_Soviet_Union_(1917%E2%80%931927)"
        },
        {
            type: "video", tier: "high",
            title: "When America Invaded Russia - 3D History DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=7rRq3McTnYs"
        }
    ],

    "russia_17": [
        {
            type: "primary", tier: "high",
            title: "The \"Willy-Nicky\" Telegrams (29 July - 1 August 1914) — the direct correspondence between Tsar Nicholas II and Kaiser Wilhelm II attempting to avert war, ending in Germany's declaration of war on Russia",
            publisher: "FirstWorldWar.com — full text of all ten telegrams",
            url: "https://www.firstworldwar.com/source/willynicky.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Eastern Front (World War I) — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Eastern_Front_(World_War_I)"
        },
        {
            type: "video", tier: "high",
            title: "World War 1 (All Parts)",
            publisher: "Epic History TV",
            url: "https://www.youtube.com/watch?v=G1p6rlDCxq0"
        }
    ],

    "russia_16": [
        {
            type: "primary", tier: "high",
            title: "The October Manifesto (30 October 1905) — Tsar Nicholas II's own decree granting civil liberties and an elected legislature (the Duma), issued in response to the Revolution of 1905",
            publisher: "Marxists Internet Archive — full text",
            url: "https://www.marxists.org/history/ussr/events/1905/october-manifesto.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Russian Revolution of 1905 — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Russian_Revolution_of_1905"
        },
        {
            type: "video", tier: "medium",
            title: "History of Russia in 100 Minutes (Full Video Course)",
            publisher: "YouTube (independent educational history series)",
            url: "https://www.youtube.com/playlist?list=PL3z21sNm6oEO6OdODdD_AcbxIV-ujhnDL"
        }
    ],

    "russia_15": [
        {
            type: "primary", tier: "high",
            title: "The Emancipation Manifesto (3 March 1861) — Tsar Alexander II's own decree abolishing serfdom and freeing over 23 million serfs across the Russian Empire",
            publisher: "Russian Life (English-language magazine of Russian culture and history) — full text",
            url: "https://www.russianlife.com/the-russia-file/emancipation-edict-alexander-ii/"
        },
        {
            type: "secondary", tier: "high",
            title: "Emancipation reform of 1861 — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Emancipation_reform_of_1861"
        },
        {
            type: "video", tier: "medium",
            title: "Alexander II - History of Russia in 100 Minutes (Part 17 of 36)",
            publisher: "YouTube (independent educational history series)",
            url: "https://www.youtube.com/watch?v=cqGBRn7oBEg"
        }
    ],

    "russia_14": [
        {
            type: "primary", tier: "high",
            title: "Armand de Caulaincourt, With Napoleon in Russia (written 1812-13, published 1933) — the memoir of Napoleon's own Master of the Horse and former ambassador to Russia, who accompanied the Emperor throughout the invasion and retreat",
            publisher: "Internet Archive (Hanoteau/Libaire English edition, 1935)",
            url: "https://archive.org/details/in.ernet.dli.2015.58850"
        },
        {
            type: "secondary", tier: "high",
            title: "French invasion of Russia — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/French_invasion_of_Russia"
        },
        {
            type: "video", tier: "high",
            title: "Napoleon's Invasion of Russia 1812",
            publisher: "Epic History TV",
            url: "https://www.youtube.com/watch?v=f3zId15Q23M"
        }
    ],

    "russia_13": [
        {
            type: "primary", tier: "high",
            title: "Catherine the Great's Nakaz (Instruction, 1767) — the Empress's own statement of legal principles for the Legislative Commission, drawing heavily on Montesquieu and Beccaria",
            publisher: "Internet Archive — \"The Grand Instructions to the Commissioners...\", the 1768 contemporary English translation",
            url: "https://archive.org/details/documentsofcathe0000cath"
        },
        {
            type: "secondary", tier: "high",
            title: "Catherine the Great — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Catherine_the_Great"
        },
        {
            type: "video", tier: "high",
            title: "Enlightened Monarchs: Crash Course European History #19",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=k108xCzJhbs"
        }
    ],

    "russia_12": [
        {
            type: "primary", tier: "high",
            title: "The Treaty of Nystad (30 August 1721) — the peace treaty ending the Great Northern War, by which Sweden ceded the Baltic provinces to Russia and Peter I proclaimed himself Emperor, founding the Russian Empire",
            publisher: "Histdoc.net — original treaty text",
            url: "https://histdoc.net/nystad/nystad_title.html"
        },
        {
            type: "secondary", tier: "high",
            title: "Russian Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Russian_Empire"
        },
        {
            type: "video", tier: "high",
            title: "The Rise of Russia and Prussia: Crash Course European History #17",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=FBzRaxLdjZE"
        }
    ],

    "russia_11": [
        {
            type: "primary", tier: "high",
            title: "The Table of Ranks (24 January 1722) — Peter the Great's own decree replacing hereditary nobility with a merit-based hierarchy of military, civil and court service, a cornerstone of his Westernizing reforms",
            publisher: "University of São Paulo — first complete English translation of the original 1722 document",
            url: "https://lea.vitis.uspnet.usp.br/arquivos/arttableofrankslea.pdf"
        },
        {
            type: "secondary", tier: "high",
            title: "Government reform of Peter the Great — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Government_reform_of_Peter_the_Great"
        },
        {
            type: "video", tier: "high",
            title: "Battle of Poltava 1709 - Great Northern War DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=vMkiWDExIY8"
        }
    ],

    "russia_10": [
        {
            type: "primary", tier: "high",
            title: "Documents of the Zemsky Sobor of 1613 and the early Romanov court — records of Mikhail Romanov's election as Tsar, ending the Time of Troubles and founding the dynasty that would rule Russia until 1917",
            publisher: "Internet Archive — \"Medieval Russia: A Source Book, 900-1700\" (ed. Basil Dmytryshyn, 1967), full text",
            url: "https://archive.org/stream/in.ernet.dli.2015.124147/2015.124147.Medieval-Russia-A-Source-Book_djvu.txt"
        },
        {
            type: "secondary", tier: "high",
            title: "House of Romanov — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/House_of_Romanov"
        },
        {
            type: "video", tier: "high",
            title: "How Russia Ended Ukrainian Independence - Early Modern History DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=Hyi490NXuG4"
        }
    ],

    "russia_9": [
        {
            type: "primary", tier: "high",
            title: "The Story of the Victories of the Moscow State (Povest' o pobedakh Moskovskogo gosudarstva, written after 1626) — a 17th-century Russian chronicle of the Smolensk nobility's struggle against Poland and the False Dmitry pretenders during the Time of Troubles",
            publisher: "Krotov.info (Russian digital library of historical texts) — original text with commentary",
            url: "http://krotov.info/acts/17/1/pobedy0.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Time of Troubles — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Time_of_Troubles"
        },
        {
            type: "video", tier: "high",
            title: "Time of Troubles in Russia | Dr. Scott W. Palmer",
            publisher: "Russian History Museum",
            url: "https://www.youtube.com/watch?v=u8MsUcrhXkI"
        }
    ],

    "russia_8": [
        {
            type: "primary", tier: "high",
            title: "The Sudebnik of 1550 and contemporary documents of Ivan IV's reign — Ivan the Terrible's own revised law code, establishing the Zemsky Sobor and centralizing judicial authority",
            publisher: "Internet Archive — \"Medieval Russia: A Source Book, 900-1700\" (ed. Basil Dmytryshyn, 1967), full text",
            url: "https://archive.org/stream/in.ernet.dli.2015.124147/2015.124147.Medieval-Russia-A-Source-Book_djvu.txt"
        },
        {
            type: "secondary", tier: "high",
            title: "Ivan the Terrible — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Ivan_the_Terrible"
        },
        {
            type: "video", tier: "high",
            title: "How Terrible was Ivan the Terrible? (Animated Documentary)",
            publisher: "History Matters",
            url: "https://www.youtube.com/watch?v=wyT9uL1ixpU"
        }
    ],

    "russia_7": [
        {
            type: "primary", tier: "high",
            title: "The Chronicle of Novgorod's continuations and Muscovite annals on the 1480 Great Stand on the Ugra River — the contemporary account of the bloodless standoff that ended the \"Tatar yoke\" over Rus'",
            publisher: "Internet Archive (Michell & Forbes translation, Camden Third Series, 1914)",
            url: "https://archive.org/details/chronicleofnovgo00michrich"
        },
        {
            type: "secondary", tier: "high",
            title: "Great Stand on the Ugra River — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Great_Stand_on_the_Ugra_River"
        },
        {
            type: "video", tier: "medium",
            title: "Grand Duchy of Moscow",
            publisher: "YouTube (independent history documentary)",
            url: "https://www.youtube.com/watch?v=ng5NZ0EnI5I"
        }
    ],

    "russia_6": [
        {
            type: "primary", tier: "high",
            title: "The Chronicle of Novgorod, 1016-1471 — contemporary Rus' chronicle accounts of Dmitry Donskoy's reign and the 1380 Battle of Kulikovo, Moscow's first major victory over the Golden Horde",
            publisher: "Internet Archive (Michell & Forbes translation, Camden Third Series, 1914)",
            url: "https://archive.org/details/chronicleofnovgo00michrich"
        },
        {
            type: "secondary", tier: "high",
            title: "Battle of Kulikovo — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Battle_of_Kulikovo"
        },
        {
            type: "video", tier: "high",
            title: "Battle of Kulikovo 1380 - Rus-Mongol Wars DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=d4vROzoKElU"
        }
    ],

    "russia_5": [
        {
            type: "primary", tier: "high",
            title: "The Chronicle of Novgorod, 1016-1471 — the oldest surviving Rus' chronicle, documenting Daniil of Moscow's founding of the Muscovite principality and Ivan Kalita's early consolidation of power",
            publisher: "Internet Archive (Michell & Forbes translation, Camden Third Series, 1914)",
            url: "https://archive.org/details/chronicleofnovgo00michrich"
        },
        {
            type: "secondary", tier: "high",
            title: "Grand Duchy of Moscow — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Grand_Duchy_of_Moscow"
        },
        {
            type: "video", tier: "medium",
            title: "Grand Duchy of Moscow",
            publisher: "YouTube (History Maps podcast)",
            url: "https://www.youtube.com/watch?v=TK1zvX3odZU"
        }
    ],

    "russia_4": [
        {
            type: "primary", tier: "high",
            title: "\"The Tale of the Destruction of Riazan\" and \"The Battle on the River Kalka\" (13th century Rus' chronicle accounts) — contemporary narratives of the Mongol devastation of the Rus' principalities",
            publisher: "Swarthmore College — \"The Muslim in Russia\" course archive, full translated excerpts",
            url: "https://www.swarthmore.edu/muslim-russia/mongol-invasion-various-chronicles"
        },
        {
            type: "secondary", tier: "high",
            title: "Mongol invasion of Kievan Rus' — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Mongol_invasion_of_Kievan_Rus%27"
        },
        {
            type: "video", tier: "high",
            title: "Destruction of Kievan Rus - Mongol Conquest DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=0kMonEmadLE"
        }
    ],

    "russia_3": [
        {
            type: "primary", tier: "high",
            title: "The Russian Primary Chronicle's account of the Baptism of Rus' (988 CE) — the foundational narrative of Vladimir the Great's conversion and mass baptism of Kiev",
            publisher: "Internet Archive — \"Medieval Russia's Epics, Chronicles, and Tales\" (ed. Serge A. Zenkovsky)",
            url: "https://archive.org/details/medievalrussiase0000unse_a5c1"
        },
        {
            type: "secondary", tier: "high",
            title: "Christianization of Kievan Rus' — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Christianization_of_Kievan_Rus%27"
        },
        {
            type: "video", tier: "high",
            title: "How the Rus Became Christian - Vladimir the Great DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=TYxsfTMxaNY"
        }
    ],

    "russia_2": [
        {
            type: "primary", tier: "high",
            title: "The Russian Primary Chronicle (Povest' vremennykh let, compiled c. 1113 CE, traditionally attributed to the monk Nestor) — the foundational account of Rurik's arrival and the establishment of Rus' rule at Novgorod and Kiev",
            publisher: "Internet Archive — \"Medieval Russia's Epics, Chronicles, and Tales\" (ed. Serge A. Zenkovsky)",
            url: "https://archive.org/details/medievalrussiase0000unse_a5c1"
        },
        {
            type: "secondary", tier: "high",
            title: "Kievan Rus' — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Kievan_Rus%27"
        },
        {
            type: "video", tier: "high",
            title: "Slavs and Vikings: Medieval Russia and the Origins of the Kievan Rus",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=W3CvfrmHpt4"
        }
    ],

    "russia_1": [
        {
            type: "primary", tier: "high",
            title: "Procopius, History of the Wars, Book VII (c. 550-551 CE) — the earliest detailed ethnographic account of the early Slavs (Sclaveni and Antae), describing their decentralized \"democratic\" society and customs",
            publisher: "LacusCurtius, University of Chicago (H.B. Dewing translation, Loeb Classical Library)",
            url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Procopius/Wars/home.html"
        },
        {
            type: "secondary", tier: "high",
            title: "Early Slavs — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Early_Slavs"
        },
        {
            type: "video", tier: "high",
            title: "Slavs and Vikings: Medieval Russia and the Origins of the Kievan Rus",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=W3CvfrmHpt4"
        }
    ],

    "uk_postwar": [
        {
            type: "primary", tier: "high",
            title: "The National Health Service Act 1946 — the Attlee government's own founding act establishing free, universal healthcare, the centerpiece of Britain's postwar welfare state",
            publisher: "legislation.gov.uk (UK's official legal database)",
            url: "https://www.legislation.gov.uk/ukpga/Geo6/9-10/81/contents/enacted"
        },
        {
            type: "secondary", tier: "high",
            title: "History of the United Kingdom (1945-present) — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/History_of_the_United_Kingdom_(1945%E2%80%93present)"
        },
        {
            type: "video", tier: "high",
            title: "Post WWII United Kingdom - Cold War DOCUMENTARY",
            publisher: "The Cold War (Kings and Generals)",
            url: "https://www.youtube.com/watch?v=to64NoUyq2s"
        }
    ],

    "uk_ww1": [
        {
            type: "primary", tier: "high",
            title: "US Ambassador Walter Hines Page's telegram to the Secretary of State (4 August 1914) — a same-day diplomatic report on Britain's ultimatum to Germany over Belgian neutrality, the trigger for Britain's entry into World War I",
            publisher: "Office of the Historian, U.S. Department of State — Foreign Relations of the United States (FRUS) series, official document",
            url: "https://history.state.gov/historicaldocuments/frus1914Supp/d97"
        },
        {
            type: "secondary", tier: "high",
            title: "British entry into World War I — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/British_entry_into_World_War_I"
        },
        {
            type: "video", tier: "high",
            title: "World War 1 (All Parts)",
            publisher: "Epic History TV",
            url: "https://www.youtube.com/watch?v=G1p6rlDCxq0"
        }
    ],

    "uk_africa": [
        {
            type: "primary", tier: "high",
            title: "The General Act of the Berlin Conference on West Africa (26 February 1885) — the founding legal framework of the \"Scramble for Africa,\" establishing rules for European territorial claims across the continent",
            publisher: "South African History Online — full text",
            url: "https://sahistory.org.za/archive/general-act-berlin-conference-west-africa-26-february-1885-0"
        },
        {
            type: "secondary", tier: "high",
            title: "Scramble for Africa — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Scramble_for_Africa"
        },
        {
            type: "video", tier: "medium",
            title: "The Beginning of the Scramble for Africa | History of Africa 1885-1895 Documentary 4/6",
            publisher: "Jabzy",
            url: "https://www.youtube.com/watch?v=U8n3kCuMcPE"
        }
    ],

    "uk_india": [
        {
            type: "primary", tier: "high",
            title: "The Government of India Act 1858 — Parliament's own act ending East India Company rule and transferring India to direct Crown administration in the aftermath of the 1857 Rebellion",
            publisher: "legislation.gov.uk (UK's official legal database)",
            url: "https://www.legislation.gov.uk/ukpga/Vict/21-22/106/enacted"
        },
        {
            type: "secondary", tier: "high",
            title: "British Raj — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/British_Raj"
        },
        {
            type: "video", tier: "high",
            title: "Rise of the East India Company - History of Colonialism DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=_SHhiEISRrE"
        }
    ],

    "uk_industrial": [
        {
            type: "primary", tier: "high",
            title: "The Factory Act 1833 — Parliament's landmark labor law restricting child labor in textile mills and establishing Britain's first factory inspectorate",
            publisher: "UK Parliament — official historical resource, \"The 1833 Factory Act\"",
            url: "https://www.parliament.uk/about/living-heritage/transformingsociety/livinglearning/19thcentury/overview/factoryact/"
        },
        {
            type: "secondary", tier: "high",
            title: "Industrial Revolution — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Industrial_Revolution"
        },
        {
            type: "video", tier: "high",
            title: "Coal, Steam, and The Industrial Revolution: Crash Course World History #32",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=zhL5DCizj5c"
        }
    ],

    "uk_empire": [
        {
            type: "primary", tier: "high",
            title: "The Navigation Act of 1651 — the Commonwealth Parliament's own act restricting colonial trade to English ships, a foundational instrument of English mercantile and imperial policy",
            publisher: "University of Texas at Arlington — course reading archive, full text from Acts and Ordinances of the Interregnum, 1642-1660 (HMSO, 1911)",
            url: "https://websites.uta.edu/hunnicut/reading-list/readings-u-s-legal-constitutional-history/navigation-act-1651"
        },
        {
            type: "secondary", tier: "high",
            title: "British Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/British_Empire"
        },
        {
            type: "video", tier: "medium",
            title: "Rise and Fall of the British Empire (Animated Timeline Map)",
            publisher: "YouTube (independent history documentary)",
            url: "https://www.youtube.com/watch?v=iVsEMtCPeI8"
        }
    ],

    "uk_tudor": [
        {
            type: "primary", tier: "high",
            title: "The Act of Supremacy (1534) — Henry VIII's own parliamentary act declaring himself Supreme Head of the Church of England, severing ties with Rome",
            publisher: "Wikisource — full original text",
            url: "https://en.wikisource.org/wiki/Act_of_Supremacy_1534"
        },
        {
            type: "secondary", tier: "high",
            title: "House of Tudor — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/House_of_Tudor"
        },
        {
            type: "video", tier: "high",
            title: "Henry VII: The Secret Life Of England's Most Sinister Monarch | The Winter King",
            publisher: "Timeline - World History Documentaries",
            url: "https://www.youtube.com/watch?v=_l4BQbVANyY"
        }
    ],

    "scotland_witch_trials": [
        {
            type: "primary", tier: "high",
            title: "James VI, Daemonologie (1597), with the appended pamphlet Newes from Scotland — the king's own treatise justifying witch-hunting, written in the aftermath of his personal involvement in the North Berwick witch trials",
            publisher: "Project Gutenberg",
            url: "https://www.gutenberg.org/ebooks/25929"
        },
        {
            type: "secondary", tier: "high",
            title: "Witch trials in early modern Scotland — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Witch_trials_in_early_modern_Scotland"
        },
        {
            type: "video", tier: "high",
            title: "The Origins Of Witch Trials | A Century Of Murder With Dr Suzannah Lipscomb",
            publisher: "Timeline - World History Documentaries",
            url: "https://www.youtube.com/watch?v=gB2DeAzCBi4"
        }
    ],

    "uk_scotland_medieval": [
        {
            type: "primary", tier: "high",
            title: "The Declaration of Arbroath (6 April 1320) — a letter from the barons and community of the Kingdom of Scotland to Pope John XXII, asserting Scotland's independence and famously declaring \"for freedom alone\"",
            publisher: "National Records of Scotland — official custodian of the original document",
            url: "https://www.nrscotland.gov.uk/learning-and-events/the-declaration-of-arbroath/"
        },
        {
            type: "secondary", tier: "high",
            title: "Battle of Bannockburn — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Battle_of_Bannockburn"
        },
        {
            type: "video", tier: "high",
            title: "Bannockburn: The Battle For Scotland",
            publisher: "History Hit",
            url: "https://www.youtube.com/watch?v=KMjbI1FbssY"
        }
    ],

    "uk_wars_roses": [
        {
            type: "primary", tier: "high",
            title: "The Paston Letters (1422-1509 CE) — over 1,000 letters of a Norfolk gentry family, the essential eyewitness record of everyday life and politics during the Wars of the Roses",
            publisher: "Internet Archive (James Gairdner edition, reprint of 1872-5)",
            url: "https://archive.org/details/pastonlettersrep01gairiala"
        },
        {
            type: "secondary", tier: "high",
            title: "Wars of the Roses — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Wars_of_the_Roses"
        },
        {
            type: "video", tier: "high",
            title: "Wars of Roses 1455-1487 - English Civil Wars DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=Do7XBxUVJsE"
        }
    ],

    "uk_hundred_years": [
        {
            type: "primary", tier: "high",
            title: "Jean Froissart, Chronicles (compiled 1370s-1400s CE) — the essential contemporary narrative of the Hundred Years' War, drawn from Froissart's own travels and interviews with participants on both sides",
            publisher: "Internet Archive (Lord Berners' 1523-25 English translation, 1901 Tudor Translations edition)",
            url: "https://archive.org/details/chroniclesofsirj0000froi"
        },
        {
            type: "secondary", tier: "high",
            title: "Hundred Years' War — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Hundred_Years%27_War"
        },
        {
            type: "video", tier: "high",
            title: "Battle of Agincourt 1415 - Hundred Years' War DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=mZzaaORehzs"
        }
    ],

    "uk_crusades": [
        {
            type: "primary", tier: "high",
            title: "Itinerarium Peregrinorum et Gesta Regis Ricardi (early 1220s, compiled by Richard de Templo from earlier eyewitness memoirs) — the most comprehensive contemporary chronicle of the Third Crusade and Richard the Lionheart's campaigns",
            publisher: "Internet Archive (Helen J. Nicholson translation, Ashgate, 1997)",
            url: "https://archive.org/details/chronicleofthird0000rica"
        },
        {
            type: "secondary", tier: "high",
            title: "Third Crusade — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Third_Crusade"
        },
        {
            type: "video", tier: "high",
            title: "Third Crusade - the Beginning - Kings and Generals DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=kHTLBHt3zUM"
        }
    ],

    "uk_feudalism": [
        {
            type: "primary", tier: "high",
            title: "The Constitutions of Clarendon (1164 CE) — Henry II's own record of royal customs asserting crown authority over the church, the flashpoint of his conflict with Thomas Becket",
            publisher: "Avalon Project, Yale Law School — full text",
            url: "https://avalon.law.yale.edu/medieval/constcla.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "Feudalism in medieval England — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Feudalism_in_England"
        },
        {
            type: "video", tier: "medium",
            title: "Henry II - The First Plantagenet King Documentary",
            publisher: "People Profiles",
            url: "https://www.youtube.com/watch?v=7eg3aTHjGqo"
        }
    ],

    "uk_norman": [
        {
            type: "primary", tier: "high",
            title: "The Domesday Book (1086 CE) — William the Conqueror's own nationwide survey of England's land, people and property, the oldest surviving public record in Britain",
            publisher: "Open Domesday (opendomesday.org) — free online edition with original folios",
            url: "https://opendomesday.org/"
        },
        {
            type: "secondary", tier: "high",
            title: "Battle of Hastings — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Battle_of_Hastings"
        },
        {
            type: "video", tier: "high",
            title: "Hastings 1066 - Normans vs. Anglo-Saxons DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=jB47xpnJzE0"
        }
    ],

    "uk_early_scotland": [
        {
            type: "primary", tier: "high",
            title: "The Pictish Chronicle and Chronicle of the Kings of Alba (compiled c. 971-995 CE) — the earliest surviving king-lists documenting the union of the Picts and Scots under Kenneth MacAlpin and his successors",
            publisher: "Internet Archive — \"Chronicles of the Picts, Chronicles of the Scots\" (ed. William F. Skene, 1867)",
            url: "https://archive.org/details/chroniclesofpict00sken"
        },
        {
            type: "secondary", tier: "high",
            title: "Kingdom of Alba — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Kingdom_of_Alba"
        },
        {
            type: "video", tier: "medium",
            title: "Kings of Scotland #1 - Kenneth MacAlpin",
            publisher: "YouTube (independent history documentary)",
            url: "https://www.youtube.com/watch?v=vyh0J4Ke80Q"
        }
    ],

    "uk_alfred_great": [
        {
            type: "primary", tier: "high",
            title: "Asser, Life of King Alfred (893 CE) — the only substantial contemporary biography of Alfred, written by a Welsh monk recruited to his court",
            publisher: "Project Gutenberg (Albert S. Cook translation)",
            url: "https://www.gutenberg.org/ebooks/63384"
        },
        {
            type: "secondary", tier: "high",
            title: "Battle of Edington — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Battle_of_Edington"
        },
        {
            type: "video", tier: "medium",
            title: "Battle of Edington 878 AD (Making of England Series)",
            publisher: "YouTube (independent history documentary)",
            url: "https://www.youtube.com/watch?v=1hvMqC11664"
        }
    ],

    "uk_vikings": [
        {
            type: "primary", tier: "high",
            title: "Alcuin of York's letter to King Ethelred of Northumbria (793 CE) — a contemporary eyewitness-informed account of the Viking raid on Lindisfarne, written by a Northumbrian scholar at Charlemagne's court",
            publisher: "San José State University — course reading archive, translated excerpts with commentary",
            url: "https://www.sjsu.edu/people/cynthia.rostankowski/courses/HUM1BS17/Lecture_10%20Medieval%20Universities%20Readings.pdf"
        },
        {
            type: "secondary", tier: "high",
            title: "Sack of Lindisfarne — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Sack_of_Lindisfarne"
        },
        {
            type: "video", tier: "high",
            title: "The Rise and Fall of Vikings: Attack on Lindisfarne (Full Episode)",
            publisher: "National Geographic",
            url: "https://www.youtube.com/watch?v=_bAjvYzRbes"
        }
    ],

    "uk_anglo_saxon": [
        {
            type: "primary", tier: "high",
            title: "The Anglo-Saxon Chronicle (compiled c. 890 CE under Alfred the Great, continued to the 12th century) — the foundational year-by-year record of Anglo-Saxon England, from nine surviving manuscript versions",
            publisher: "Project Gutenberg (Ingram & Giles translation)",
            url: "https://www.gutenberg.org/ebooks/657"
        },
        {
            type: "secondary", tier: "high",
            title: "Heptarchy — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Heptarchy"
        },
        {
            type: "video", tier: "high",
            title: "Ancient Celts: Anglo-Saxon Invasion of Britain DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=10pUygkKYxk"
        }
    ],

    "uk_roman_withdrawal": [
        {
            type: "primary", tier: "high",
            title: "Gildas, De Excidio et Conquestu Britanniae (On the Ruin of Britain, c. mid-6th century) — the only surviving near-contemporary British account of Rome's withdrawal and its immediate aftermath",
            publisher: "Internet Archive (Hugh Williams edition and translation, 1899)",
            url: "https://archive.org/details/gildaedeexcidiob00gilduoft"
        },
        {
            type: "secondary", tier: "high",
            title: "End of Roman rule in Britain — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/End_of_Roman_rule_in_Britain"
        },
        {
            type: "video", tier: "high",
            title: "Rome's Collapse, Region by Region",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=QdEO0ckSFC0"
        }
    ],

    "uk_hadrians_wall": [
        {
            type: "primary", tier: "high",
            title: "Inscribed stones of Hadrian's Wall (2nd-3rd century CE) — building records, dedications and military inscriptions from forts like Chesters (Cilurnum) and Housesteads (Vercovicium), the primary evidence for the Wall's construction and garrison life",
            publisher: "English Heritage — official custodian, \"Sources for Hadrian's Wall\"",
            url: "https://www.english-heritage.org.uk/visit/places/hadrians-wall/hadrians-wall-history-and-stories/history/sources/"
        },
        {
            type: "secondary", tier: "high",
            title: "Hadrian's Wall — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Hadrian%27s_Wall"
        },
        {
            type: "video", tier: "high",
            title: "What Life Was Like On The Frontier Between The Romans & The Barbarians | Lost Treasures",
            publisher: "Timeline - World History Documentaries",
            url: "https://www.youtube.com/watch?v=aOtSw86ah4I"
        }
    ],

    "uk_roman_invasion": [
        {
            type: "primary", tier: "high",
            title: "The Vindolanda Tablets (c. 85-120 CE) — nearly 1,700 wooden writing tablets excavated at the Roman fort of Vindolanda, the oldest surviving handwritten documents in Britain, including military reports and personal letters",
            publisher: "Vindolanda Tablets Online, Centre for the Study of Ancient Documents, Oxford University / Roman Inscriptions of Britain — full digitized edition",
            url: "https://romaninscriptionsofbritain.org/tabvindol"
        },
        {
            type: "secondary", tier: "high",
            title: "Roman conquest of Britain — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Roman_conquest_of_Britain"
        },
        {
            type: "video", tier: "high",
            title: "Watling Street 60 AD - Boudica's Revolt DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=5xxUc3T1_As"
        }
    ],

    "uk_celts": [
        {
            type: "primary", tier: "high",
            title: "Julius Caesar, Commentarii de Bello Gallico, Book 5 (c. 50s BCE) — the earliest detailed eyewitness account of the Celtic Britons, written during Caesar's 55 and 54 BCE expeditions to Britain",
            publisher: "Perseus Digital Library, Tufts University (W.A. McDevitte & W.S. Bohn translation, 1869)",
            url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0001:book=5"
        },
        {
            type: "secondary", tier: "high",
            title: "Celtic Britain — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Britain_in_the_Roman_era"
        },
        {
            type: "video", tier: "high",
            title: "Ancient Origins of the Celts - Ancient Civilizations DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=S_QizTMIr-0"
        }
    ],

    "italy_miracle": [
        {
            type: "primary", tier: "high",
            title: "US State Department dispatches on the Vanoni Plan and Italy's economic expansion (1955-1957) — contemporary US government assessment of Italy's postwar development policy that underpinned the Economic Miracle",
            publisher: "Office of the Historian, U.S. Department of State — Foreign Relations of the United States (FRUS) series, official document",
            url: "https://history.state.gov/historicaldocuments/frus1955-57v27/d95"
        },
        {
            type: "secondary", tier: "high",
            title: "Italian economic miracle — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Italian_economic_miracle"
        },
        {
            type: "video", tier: "high",
            title: "Italy: Battleground for US and USSR - COLD WAR DOCUMENTARY",
            publisher: "The Cold War (Kings and Generals)",
            url: "https://www.youtube.com/watch?v=U0WrcxHO7t4"
        }
    ],

    "italy_republic_modern": [
        {
            type: "primary", tier: "high",
            title: "The Constitution of the Italian Republic (ratified 22 December 1947, effective 1 January 1948) — Italy's founding democratic charter, drafted by the Constituent Assembly of anti-fascist parties",
            publisher: "Constitutional Court of the Italian Republic — official English translation",
            url: "https://www.cortecostituzionale.it/documenti/download/pdf/Costituzione_italiana_english_version_ott2023.pdf"
        },
        {
            type: "secondary", tier: "high",
            title: "History of the Italian Republic — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/History_of_the_Italian_Republic"
        },
        {
            type: "video", tier: "high",
            title: "Italy: Battleground for US and USSR - COLD WAR DOCUMENTARY",
            publisher: "The Cold War (Kings and Generals)",
            url: "https://www.youtube.com/watch?v=U0WrcxHO7t4"
        }
    ],

    "italy_ww2": [
        {
            type: "primary", tier: "high",
            title: "The Armistice of Cassibile (3 September 1943) — Italy's own unconditional surrender document, signed by General Giuseppe Castellano, ending Italy's participation in the war on the Axis side",
            publisher: "Avalon Project, Yale Law School — full text",
            url: "https://avalon.law.yale.edu/wwii/italy05.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "Italian campaign (World War II) — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Italian_campaign_(World_War_II)"
        },
        {
            type: "video", tier: "high",
            title: "The Italian Campaign: How Canada Beat The Germans Out Of Italy | Greatest Tank Battles",
            publisher: "Timeline - World History Documentaries",
            url: "https://www.youtube.com/watch?v=U5P2wlo9V-A"
        }
    ],

    "italy_fascism": [
        {
            type: "primary", tier: "high",
            title: "Benito Mussolini (with Giovanni Gentile), The Doctrine of Fascism (1932) — the regime's own official statement of Fascist ideology, published in the Enciclopedia Italiana",
            publisher: "Internet Archive (official 1935 English translation, \"Fascism, Doctrine and Institutions\")",
            url: "https://archive.org/details/doctrineoffascis0000muss"
        },
        {
            type: "secondary", tier: "high",
            title: "Italian Fascism — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Italian_Fascism"
        },
        {
            type: "video", tier: "high",
            title: "Benito Mussolini: The Father Of Fascism | Evolution of Evil",
            publisher: "Timeline - World History Documentaries",
            url: "https://www.youtube.com/watch?v=M0ltQn6AMGA"
        }
    ],

    "italy_ww1": [
        {
            type: "primary", tier: "high",
            title: "The Treaty of London (26 April 1915) — the secret pact between Italy and the Allied Powers promising territorial gains in exchange for Italy's entry into World War I",
            publisher: "World War I Document Archive, Brigham Young University Library — full text",
            url: "https://wwi.lib.byu.edu/index.php/The_Treaty_of_London_(1915)"
        },
        {
            type: "secondary", tier: "high",
            title: "Italian front (World War I) — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Italian_front_(World_War_I)"
        },
        {
            type: "video", tier: "high",
            title: "World War 1 (All Parts)",
            publisher: "Epic History TV",
            url: "https://www.youtube.com/watch?v=G1p6rlDCxq0"
        }
    ],

    "italy_industrial": [
        {
            type: "primary", tier: "high",
            title: "Legge Carcano (Law No. 242 of 19 June 1902) — the Kingdom of Italy's first major labor law regulating women's and children's work in factories, mines, and workshops during the industrial boom",
            publisher: "Normattiva (official Italian legal database)",
            url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:1902-06-19;242="
        },
        {
            type: "secondary", tier: "high",
            title: "Economic history of Italy — Liberal-era industrialization overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Economic_history_of_Italy"
        },
        {
            type: "video", tier: "medium",
            title: "Italian and German Unification: Crash Course European History #27",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=KSjDe9_jZk8"
        }
    ],

    "italy_united": [
        {
            type: "primary", tier: "high",
            title: "Giuseppe Garibaldi's Autobiography, Vol. 2 (1849-1872) — the revolutionary general's own firsthand account of the campaigns that unified Italy, including the 1860 Expedition of the Thousand",
            publisher: "Internet Archive (Alice Werner translation, 1889)",
            url: "https://archive.org/details/autobiographygi02garigoog"
        },
        {
            type: "secondary", tier: "high",
            title: "Unification of Italy — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Unification_of_Italy"
        },
        {
            type: "video", tier: "high",
            title: "Giuseppe Garibaldi: One of the Greatest Generals of Modern Times",
            publisher: "Biographics",
            url: "https://www.youtube.com/watch?v=8grrAHhTDNw"
        }
    ],

    "italy_congress_vienna": [
        {
            type: "primary", tier: "high",
            title: "The Final Act of the Congress of Vienna (9 June 1815) — the diplomatic settlement that restored Austrian dominance over most of Italy following Napoleon's defeat",
            publisher: "Wikisource — full English translation",
            url: "https://en.wikisource.org/wiki/Final_Act_of_the_Congress_of_Vienna"
        },
        {
            type: "secondary", tier: "high",
            title: "Congress of Vienna — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Congress_of_Vienna"
        },
        {
            type: "video", tier: "high",
            title: "Napoleonic Wars: Battle of Waterloo 1815",
            publisher: "Epic History TV",
            url: "https://www.youtube.com/watch?v=nDZGL1xsqzs"
        }
    ],

    "italy_napoleon": [
        {
            type: "primary", tier: "high",
            title: "Constitution of the Cisalpine Republic (1797/1798) — the founding legal document of Napoleon's French client state in northern Italy, modelled on the French Directory constitution",
            publisher: "Università di Torino, Dipartimento di Giurisprudenza — Digesto (Italian constitutional texts archive), original Italian text",
            url: "http://www.dircost.unito.it/cs/docs/cisalpina1.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Cisalpine Republic — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Cisalpine_Republic"
        },
        {
            type: "video", tier: "high",
            title: "Napoleon's Italian Campaign (All Parts)",
            publisher: "Epic History TV",
            url: "https://www.youtube.com/watch?v=Bm1RhjcdJek"
        }
    ],

    "italy_wars": [
        {
            type: "primary", tier: "high",
            title: "Francesco Guicciardini, Storia d'Italia (History of Italy, written 1537-1540) — a firsthand account by a Florentine statesman, diplomat and military leader who lived through the Italian Wars",
            publisher: "Internet Archive (Austin Parke Goddard English translation, 1753)",
            url: "https://archive.org/details/historyofitalywr02guicuoft"
        },
        {
            type: "secondary", tier: "high",
            title: "Italian Wars — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Italian_Wars"
        },
        {
            type: "video", tier: "high",
            title: "The Italian Wars 1494-1559 - Early Modern History DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=AWOwOJme9uc"
        }
    ],

    "italy_citystates": [
        {
            type: "primary", tier: "high",
            title: "The Peace of Constance (25 June 1183) — Frederick Barbarossa's own imperial privilege recognizing the self-governing rights of the Lombard League's city-communes",
            publisher: "dMGH (Digitale Monumenta Germaniae Historica), Bavarian State Library — Die Urkunden Friedrichs I., critical edition series",
            url: "https://www.dmgh.de/de/fs2/object/display/bsb00000458_00368.html"
        },
        {
            type: "secondary", tier: "high",
            title: "Lombard League — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Lombard_League"
        },
        {
            type: "video", tier: "high",
            title: "Norman Kingdom in Italy - Animated Historical Medieval 4k DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=04dll_DYysU"
        }
    ],

    "italy_charlemagne": [
        {
            type: "primary", tier: "high",
            title: "Einhard, Vita Karoli Magni (Life of Charlemagne, c. 817-833) — a firsthand account by a courtier who served Charlemagne directly, covering his 774 conquest of the Lombard kingdom and Carolingian rule over Italy",
            publisher: "Project Gutenberg (A.J. Grant translation, \"Early Lives of Charlemagne\")",
            url: "https://www.gutenberg.org/ebooks/48870"
        },
        {
            type: "secondary", tier: "high",
            title: "Carolingian Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Carolingian_Empire"
        },
        {
            type: "video", tier: "high",
            title: "How Charlemagne's Empire Fell",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=QaZfhCswRvg"
        }
    ],

    "italy_lombard": [
        {
            type: "primary", tier: "high",
            title: "The Lombard Laws (Edictum Rothari, 643 CE, with later additions by Grimwald, Liutprand, Ratchis and Aistulf) — the Lombard kingdom's own written law code, first compiled by King Rothari",
            publisher: "Internet Archive (Katherine Fischer Drew translation, University of Pennsylvania Press, 1973)",
            url: "https://archive.org/details/lombardlaws0000unse"
        },
        {
            type: "secondary", tier: "high",
            title: "Kingdom of the Lombards — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Kingdom_of_the_Lombards"
        },
        {
            type: "video", tier: "medium",
            title: "History of the Lombards, 568-774",
            publisher: "YouTube (independent history documentary)",
            url: "https://www.youtube.com/watch?v=EeIHj-CDNUA"
        }
    ],

    "italy_byzantine": [
        {
            type: "primary", tier: "high",
            title: "Procopius, History of the Wars, Books V-VIII (The Gothic War, written c. 545-554) — an eyewitness account by Belisarius's own secretary of the Byzantine reconquest of Italy from the Ostrogoths",
            publisher: "LacusCurtius, University of Chicago (H.B. Dewing translation, Loeb Classical Library)",
            url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Procopius/Wars/5A*.html"
        },
        {
            type: "secondary", tier: "high",
            title: "Ostrogothic Kingdom — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Ostrogothic_Kingdom"
        },
        {
            type: "video", tier: "high",
            title: "Siege of Rome 537-538 - Roman - Gothic War DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=Wq3bJAyZqMI"
        }
    ],

    "italy_decine_rome": [
        {
            type: "primary", tier: "high",
            title: "Zosimus, Historia Nova (New History, early 6th century) — a Byzantine official's contemporary-sourced account of the decline and collapse of the Western Roman Empire",
            publisher: "Livius.org — full English translation with commentary",
            url: "https://www.livius.org/sources/content/zosimus/zosimus-new-history-1/"
        },
        {
            type: "secondary", tier: "high",
            title: "Fall of the Western Roman Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Fall_of_the_Western_Roman_Empire"
        },
        {
            type: "video", tier: "high",
            title: "Rome's Collapse, Region by Region",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=QdEO0ckSFC0"
        }
    ],

    "italy_empire_rome": [
        {
            type: "primary", tier: "high",
            title: "Res Gestae Divi Augusti (\"The Deeds of the Divine Augustus,\" 14 CE) — Augustus's own account of his achievements, inscribed on bronze pillars in Rome and surviving as an inscription at Ancyra",
            publisher: "Livius.org — full English translation with commentary",
            url: "https://www.livius.org/sources/content/augustus-res-gestae/"
        },
        {
            type: "secondary", tier: "high",
            title: "Roman Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Roman_Empire"
        },
        {
            type: "video", tier: "high",
            title: "AUGUSTUS: Rise of the Roman Empire",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=OgoEPs3FxaM"
        }
    ],

    "italy_republicrome": [
        {
            type: "primary", tier: "high",
            title: "The Twelve Tables (Lex Duodecim Tabularum, 451-450 BCE) — Rome's first written law code, won through plebeian agitation against patrician monopoly on legal knowledge",
            publisher: "Internet Archive (English translation, based on the Oxford Classical Texts edition)",
            url: "https://archive.org/stream/thetwelvetables14783gut/14783.txt"
        },
        {
            type: "secondary", tier: "high",
            title: "Roman Republic — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Roman_Republic"
        },
        {
            type: "video", tier: "high",
            title: "Roman Politics: Republic vs Empire - Ancient History DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=VTQ7P2F1c6Y"
        }
    ],

    "italy_rome": [
        {
            type: "primary", tier: "high",
            title: "Livy, Ab Urbe Condita, Book 1 (written 27-9 BCE) — the traditional Roman account of Romulus and the founding of the city in 753 BCE",
            publisher: "Perseus Digital Library, Tufts University (Rev. Canon Roberts translation)",
            url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0151:book%3D1:chapter%3D6"
        },
        {
            type: "secondary", tier: "high",
            title: "Founding of Rome — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Founding_of_Rome"
        },
        {
            type: "video", tier: "high",
            title: "Armies and Tactics: Earliest Roman Armies DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=i9A3CWw15lQ"
        }
    ],

    "italy_etruscan": [
        {
            type: "primary", tier: "high",
            title: "The Pyrgi Gold Tablets (c. 500 BCE) — a bilingual Etruscan-Phoenician dedicatory inscription by Thefarie Velianas, ruler of Caere, one of the oldest primary source documents from pre-Roman Italy",
            publisher: "Museo Nazionale Etrusco di Villa Giulia (National Etruscan Museum, the tablets' holding institution)",
            url: "https://www.museoetru.it/works/lamine-doro-da-pyrgi"
        },
        {
            type: "secondary", tier: "high",
            title: "Etruscan civilization — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Etruscan_civilization"
        },
        {
            type: "video", tier: "high",
            title: "Etruscans: Italian Civilization Before Ancient Rome",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=FkySjRwUteE"
        }
    ],

    "italy_early": [
        {
            type: "primary", tier: "high",
            title: "Biconic ash urn of the Villanovan culture (9th-8th century BCE) — the physical funerary evidence of early Iron Age Italic peoples, since no written sources from this period survive",
            publisher: "The Walters Art Museum — official collection page",
            url: "https://art.thewalters.org/detail/8090/burial-urn-5/"
        },
        {
            type: "secondary", tier: "high",
            title: "Italic peoples — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Italic_peoples"
        },
        {
            type: "video", tier: "high",
            title: "Samnites: Rome's Early Nemesis - Ancient Civilizations DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=BuRn3pWH81g"
        }
    ],

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
            publisher: "Légifrance (official French government legal database) — full text of the law",
            url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000000692165"
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
            publisher: "Hansischer Geschichtsverein (Hanseatic History Society) — digitized Hansisches Urkundenbuch (Hanseatic Book of Charters)",
            url: "https://www.hansischergeschichtsverein.de/basic-information-in-english"
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
            title: "Heinrich von Herford, Liber de rebus memorabilioribus (\"Book of Memorable Things,\" c. 1355) — a Dominican friar's firsthand eyewitness account of the Flagellant processions that swept the Holy Roman Empire during the Black Death, quoted directly",
            publisher: "History in Numbers (direct quotation of the primary chronicle)",
            url: "https://historyinnumbers.com/events/black-death/flagellants/"
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
            title: "The Zollvereinigungsvertrag (German Customs Union Treaty, signed 22 March 1833; Consolidated Treaty Series 83 CTS 219) — the founding treaty establishing the Zollverein, effective 1 January 1834",
            publisher: "Oxford Public International Law (Max Planck Encyclopedia, citing the primary treaty text)",
            url: "https://opil.ouplaw.com/display/10.1093/law:epil/9780199231690/law-9780199231690-e740"
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
            publisher: "documentArchiv.de — full text of the Verfassung des Deutschen Reichs (16 April 1871)",
            url: "http://www.documentarchiv.de/ksr/verfksr.html"
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
        },
        {
            type: "video", tier: "high",
            title: "Magna Carta | The Story of Britain",
            publisher: "BBC Teach",
            url: "https://www.youtube.com/watch?v=wWKTy1NlxZE"
        }
    ],

    "uk_black_death": [
        {
            type: "primary", tier: "high",
            title: "The Statute of Labourers (1351), supplementing the 1349 Ordinance — England's response to the labour shortage following the Black Death",
            publisher: "The National Archives (UK) — discussion of the original document, catalogue reference C 74/1",
            url: "https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/early-modern/plague"
        },
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
        },
        {
            type: "video", tier: "high",
            title: "History of the Black Death - Full Documentary",
            publisher: "Timeline - World History Documentaries",
            url: "https://www.youtube.com/watch?v=HYNB4sAxemk"
        }
    ],

    "spain_armada": [
        {
            type: "primary", tier: "high",
            title: "King Philip II's letter to the Duke of Medina Sidonia, giving instructions in view of Drake's attack on Cadiz (1587) — the king's own handwritten involvement in planning the Armada, signed \"Yo El Rey\"",
            publisher: "Library of Congress (Sir Francis Drake collection)",
            url: "https://www.loc.gov/item/2021699426/"
        },
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
        },
        {
            type: "video", tier: "high",
            title: "Spanish Armada: How England Defended Itself",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=jyZ_oypJD_A"
        }
    ],

    "italy_renaissance": [
        {
            type: "primary", tier: "high",
            title: "Giorgio Vasari, Le Vite de' più eccellenti architetti, pittori, et scultori italiani (Lives of the Artists, 1550/1568) — the Renaissance's own foundational text of art history and artist biography",
            publisher: "Internet History Sourcebooks Project, Fordham University (translated selections)",
            url: "https://sourcebooks.fordham.edu/basis/vasari/vasari-lives.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "Italian Renaissance — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Italian_Renaissance"
        },
        {
            type: "video", tier: "high",
            title: "Florence and the Renaissance: Crash Course European History #2",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=tecocKSclwc"
        }
    ],

    "russia_18": [
        {
            type: "primary", tier: "high",
            title: "The Abdication of Tsar Nicholas II (2/15 March 1917) — the emperor's own manifesto renouncing the throne, ending 300 years of Romanov rule",
            publisher: "World War I Document Archive, Brigham Young University Library",
            url: "https://wwi.lib.byu.edu/index.php/The_Abdication_of_Nicholas_II"
        },
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
        },
        {
            type: "video", tier: "high",
            title: "What Living In London Was Like During The Blitz | Cities At War: London",
            publisher: "Timeline - World History Documentaries",
            url: "https://www.youtube.com/watch?v=ZEPtuye4AgY"
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
            publisher: "dMGH (Digitale Monumenta Germaniae Historica), Bavarian State Library — Die Urkunden Friedrichs I., Bd. 1 (1152-1158), the critical edition containing charter no. 151",
            url: "https://www.dmgh.de/de/fs1/object/display/bsb00000456_00009.html"
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
            title: "Jan III Sobieski's letter to his wife Maria Kazimiera, written the night after the Battle of Vienna (13 September 1683) — the victorious king's own firsthand account, sent from the captured Ottoman vizier's tent",
            publisher: "Museum of King Jan III's Palace at Wilanów (official Polish state museum) — full English translation",
            url: "https://wilanow-palac.pl/en/knowledge/letter-of-jan-iii-sobieski-to-maria-kazimiera-13-ix-1683"
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
            publisher: "Haus der Geschichte Österreich (Austria's national museum of history)",
            url: "https://hdgoe.at/kremsier_draft_en"
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
            publisher: "net.jogtar.hu (Hungary's National Legislation Database — \"Ezer év törvényei\"/A Thousand Years of Laws) — full text of 1867. évi XII. törvénycikk",
            url: "https://net.jogtar.hu/ezer-ev-torveny?docid=86700012.TV&searchUrl=/ezer-ev-torvenyei?pagenum%3D27"
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
            publisher: "RIS (Rechtsinformationssystem des Bundes) — Austria's official Federal Legal Information System",
            url: "https://www.ris.bka.gv.at/Dokumente/Erv/ERV_1955_211/ERV_1955_211.html"
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
            publisher: "Wikiźródła (Polish Wikisource) — full original text",
            url: "https://pl.wikisource.org/wiki/Manifest_Tymczasowego_Rz%C4%85du_Narodowego_(1863)"
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
            publisher: "Wikisource — English translation of the surviving regestum",
            url: "https://en.wikisource.org/wiki/Translation:Dagome_Iudex"
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
            publisher: "Internet Archive — Monumenta Poloniae Historica, vol. 1 (ed. August Bielowski, 1864), containing the original Latin text",
            url: "https://archive.org/details/monumentapoloni01bielgoog"
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
            title: "The Statutes of Wiślica (1347 CE) — the original Latin text (with English translation) of Casimir the Great's own codification of civil and criminal law for Greater and Lesser Poland, which earned him the epithet \"the Polish Justinian\"",
            publisher: "Polish Freedom (original Latin text with full English translation)",
            url: "https://polishfreedom.pl/en/the-statutes-of-casimir-iii-the-great-selection/"
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
            publisher: "Polish History Museum (Muzeum Historii Polski) — full original Latin text with English translation",
            url: "https://polishfreedom.pl/en/union-of-krewo-act-of-kreva/index.htm"
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
            publisher: "Wielkopolska Biblioteka Cyfrowa (Digital Library) — digitized 1506 printing of Statut Łaskiego, the official law compilation containing the act",
            url: "https://www.wbc.poznan.pl/dlibra/publication/493453/edition/439666?language=pl"
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
            publisher: "Jagiellońska Biblioteka Cyfrowa (Jagiellonian Digital Library) — digitized original 1658 Kraków printing",
            url: "https://jbc.bj.uj.edu.pl/dlibra/publication/295348/edition/282665?language=pl"
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
            publisher: "United States Holocaust Memorial Museum (Holocaust Encyclopedia)",
            url: "https://encyclopedia.ushmm.org/content/en/article/the-warsaw-polish-uprising"
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
            publisher: "ISAP (Internetowy System Aktów Prawnych) — Poland's official Internet System of Legal Acts, maintained by the Sejm",
            url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=wdu19520330232"
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
            publisher: "Archiwum Państwowe w Warszawie (Warsaw State Archive) — full text of the agreement",
            url: "https://www.warszawa.ap.gov.pl/container/pictures/zrodla_online/droga_do_wyborow/czas_okraglego_stolu/porozumienie_5_04_1989.pdf"
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
            publisher: "EUR-Lex (official EU legal database) — full treaty text",
            url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex:12003T/TXT"
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
