// Curated primary/secondary/video sources for Asia scenes (Japan, Mughal, Ashoka, Buddha, etc).
// Split from the original sources-data.js to keep per-file size down; each file
// merges into the shared window.WHD_SOURCES object rather than reassigning it,
// so files can load in any order without clobbering each other.
window.WHD_SOURCES = Object.assign(window.WHD_SOURCES || {}, {

    "indus_early": [
        {
            type: "primary", tier: "high",
            title: "Steatite seal with unicorn motif and Indus script — a Mature Harappan stamp seal from the Indus Valley Civilization, held in the British Museum's South Asian collection",
            publisher: "The British Museum — collection object page",
            url: "https://www.britishmuseum.org/collection/object/A_1947-0416-6"
        },
        {
            type: "secondary", tier: "high",
            title: "Indus Valley Civilisation — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Indus_Valley_Civilisation"
        },
        {
            type: "video", tier: "high",
            title: "Indus Valley Civilization: Crash Course World History #2",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=n7ndRwqJYDM"
        }
    ],

    "reform_opening": [
        {
            type: "primary", tier: "high",
            title: "Deng Xiaoping, \"The Present Situation and the Tasks Before Us\" (speech, 16 January 1980) — Deng's own account, delivered just over a year after the Third Plenum, of the political line guiding China's reform and opening-up",
            publisher: "Asia for Educators, Columbia University — translated primary source document",
            url: "https://afe.easia.columbia.edu/ps/china/deng_xiaoping_present_situation.pdf"
        },
        {
            type: "secondary", tier: "high",
            title: "Reform and opening up — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Reform_and_opening_up"
        },
        {
            type: "video", tier: "medium",
            title: "China's Greatest Leader - Deng Xiaoping Documentary",
            publisher: "YouTube (independent history documentary)",
            url: "https://www.youtube.com/watch?v=AVD0T5k3sP8"
        }
    ],

    "cultural_revolution": [
        {
            type: "primary", tier: "high",
            title: "Circular of the Central Committee of the Chinese Communist Party Concerning the Great Proletarian Cultural Revolution (the \"May 16 Notification,\" 16 May 1966) — the founding directive that launched the Cultural Revolution",
            publisher: "Marxists Internet Archive — translated primary source document collection",
            url: "https://www.marxists.org/subject/china/events/cultural-revolution/index.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Cultural Revolution — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Cultural_Revolution"
        },
        {
            type: "video", tier: "medium",
            title: "China's Cultural Revolution: The Full Story",
            publisher: "YouTube (independent history documentary)",
            url: "https://www.youtube.com/watch?v=8jEMlFCaI04"
        }
    ],

    "great_leap_forward": [
        {
            type: "primary", tier: "high",
            title: "Excerpt from the Unedited Translation of Mao Zedong's Speech at the Moscow Conference of Communist and Workers' Parties (18 November 1957) — Mao's own words on the eve of the Great Leap Forward, laying out the ambitions that would drive the campaign",
            publisher: "Wilson Center Digital Archive — translated archival document",
            url: "https://digitalarchive.wilsoncenter.org/document/excerpt-unedited-translation-mao-zedongs-speech-moscow-conference-communist-and-workers"
        },
        {
            type: "secondary", tier: "high",
            title: "Great Leap Forward — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Great_Leap_Forward"
        },
        {
            type: "video", tier: "medium",
            title: "Mao's Great Famine",
            publisher: "YouTube (independent history documentary)",
            url: "https://www.youtube.com/watch?v=6eurHPpkgfA"
        }
    ],

    "china_prc": [
        {
            type: "primary", tier: "high",
            title: "Mao Zedong's Proclamation of the People's Republic of China (1 October 1949) — the full translated text of Mao's founding address from Tiananmen, as published in the People's Daily the following day",
            publisher: "Alpha History — translated primary source text",
            url: "https://alphahistory.com/chineserevolution/mao-declares-new-nation-1949/"
        },
        {
            type: "secondary", tier: "high",
            title: "Proclamation of the People's Republic of China — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Proclamation_of_the_People%27s_Republic_of_China"
        },
        {
            type: "video", tier: "medium",
            title: "The Founding of the People's Republic of China",
            publisher: "YouTube (independent history documentary)",
            url: "https://www.youtube.com/watch?v=-uut994o2YE"
        }
    ],

    "china_civil": [
        {
            type: "primary", tier: "high",
            title: "Press Release Issued by General Chou En-lai (Zhou Enlai), 6 June 1946 — a CCP statement during the Marshall Mission negotiations over the Manchuria ceasefire, shortly before civil war resumed in full",
            publisher: "Foreign Relations of the United States (FRUS), Office of the Historian, U.S. Department of State — original diplomatic archive",
            url: "https://history.state.gov/historicaldocuments/frus1946v09/d512"
        },
        {
            type: "secondary", tier: "high",
            title: "Chinese Civil War — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Chinese_Civil_War"
        },
        {
            type: "video", tier: "high",
            title: "The Chinese Civil War 1945-1949 (Documentary)",
            publisher: "Real Time History",
            url: "https://www.youtube.com/watch?v=7slhD9PmxII"
        }
    ],

    "sino_japanese_war": [
        {
            type: "primary", tier: "high",
            title: "Aide Memoire: The Marco Polo Bridge Incident (Lukouchiao Incident), 7 July 1937 — treaty background, factual background, and chronological summary of the incident that triggered full-scale war between Japan and China",
            publisher: "International Military Tribunal for the Far East Digital Collection, University of Virginia School of Law — original tribunal document",
            url: "https://imtfe.law.virginia.edu/collections/tavenner/5/2/aide-memoirs-marco-polo-bridge-incident-or-lukouchiao-incident-7-july-1937"
        },
        {
            type: "secondary", tier: "high",
            title: "Second Sino-Japanese War — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Second_Sino-Japanese_War"
        },
        {
            type: "video", tier: "medium",
            title: "Second Sino-Japanese War (1937–1945)",
            publisher: "YouTube (independent history documentary)",
            url: "https://www.youtube.com/watch?v=62lGbrxeLvg"
        }
    ],

    "long_march": [
        {
            type: "primary", tier: "high",
            title: "Edgar Snow's eyewitness account of the Long March (1937) — the American journalist's firsthand narrative from Red Star Over China, based on interviews with Mao Zedong and other Communist leaders shortly after the march ended",
            publisher: "Asia for Educators, Columbia University — primary source excerpt",
            url: "https://afe.easia.columbia.edu/special/china_1900_mao_march.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Long March — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Long_March"
        },
        {
            type: "video", tier: "high",
            title: "Mao's Art of War: The Long March and the Chinese Civil War",
            publisher: "Real Time History",
            url: "https://www.youtube.com/watch?v=bq66pBjvuNw"
        }
    ],

    "ccp_foundation": [
        {
            type: "primary", tier: "high",
            title: "Manifesto of the Chinese Communist Party (November 1920) — the Party's earliest programmatic manifesto, circulated internally among founding members ahead of the 1921 First Congress",
            publisher: "China Copyright and Media (translated primary text; original Chinese manuscript is lost, translated here from the surviving English version)",
            url: "https://chinacopyrightandmedia.wordpress.com/1920/11/01/manifesto-of-the-chinese-communist-party/"
        },
        {
            type: "secondary", tier: "high",
            title: "1st National Congress of the Chinese Communist Party — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/1st_National_Congress_of_the_Chinese_Communist_Party"
        },
        {
            type: "video", tier: "medium",
            title: "100 Years Of Chinese Communist Party: Its Mark On Modern China",
            publisher: "CNA Documentary",
            url: "https://www.youtube.com/watch?v=GpPIkoldPcU"
        }
    ],

    "may_fourth": [
        {
            type: "primary", tier: "high",
            title: "Extracts from a message from Chinese students who studied overseas to the Minister of Great Britain, 7 May 1919 — a contemporary appeal from Chinese students protesting the Shandong settlement",
            publisher: "The National Archives (UK) — original archival document (FO 608/210/3)",
            url: "https://www.nationalarchives.gov.uk/education/resources/may-fourth-movement-1919/may-fourth-movement-1919-source-4a/"
        },
        {
            type: "secondary", tier: "high",
            title: "May Fourth Movement — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/May_Fourth_Movement"
        },
        {
            type: "video", tier: "medium",
            title: "The May Fourth Movement of 1919",
            publisher: "YouTube (independent history documentary)",
            url: "https://www.youtube.com/watch?v=HWh9EmfJUYs"
        }
    ],

    "warlord_era": [
        {
            type: "primary", tier: "high",
            title: "The Twenty-One Demands (18 January 1915) — the full text of Japan's secret ultimatum to Yuan Shikai's Beiyang government, whose fallout helped destabilize the young Republic and set the stage for the Warlord Era",
            publisher: "World War I Document Archive, Brigham Young University — full translated text",
            url: "https://net.lib.byu.edu/~rdh7/wwi/comment/chinawwi/ChinaA2.htm"
        },
        {
            type: "secondary", tier: "high",
            title: "Warlord Era — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Warlord_Era"
        },
        {
            type: "video", tier: "medium",
            title: "China's Warlord Era & the Northern Expedition | Full Documentary",
            publisher: "YouTube (independent history documentary)",
            url: "https://www.youtube.com/watch?v=aAm-1N_wHXs"
        }
    ],

    "china_1911": [
        {
            type: "primary", tier: "high",
            title: "Sun Yat-sen, \"The Three Stages of Revolution\" — from A Program of National Reconstruction (1918), Sun's own account of the revolutionary program that guided the 1911 overthrow of the Qing and the founding of the Republic",
            publisher: "Asia for Educators, Columbia University — translated primary source document",
            url: "https://afe.easia.columbia.edu/ps/cup/sun_yatsen_revolution.pdf"
        },
        {
            type: "secondary", tier: "high",
            title: "Xinhai Revolution — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Xinhai_Revolution"
        },
        {
            type: "video", tier: "medium",
            title: "The Xinhai Revolution of 1911: Fall of the Qing Dynasty",
            publisher: "YouTube (independent history documentary)",
            url: "https://www.youtube.com/watch?v=Mnk-nME2LIw"
        }
    ],

    "china_opium": [
        {
            type: "primary", tier: "high",
            title: "Treaty of Nanking (29 August 1842) — the full text of the treaty ending the First Opium War, ceding Hong Kong and opening five treaty ports to Britain",
            publisher: "USC US-China Institute — full treaty text",
            url: "https://china.usc.edu/node/20462"
        },
        {
            type: "secondary", tier: "high",
            title: "Opium Wars — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Opium_Wars"
        },
        {
            type: "video", tier: "high",
            title: "Jardine-Matheson: How Opium Wars Founded Hong Kong",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=mHu-msqcrnk"
        }
    ],

    "china_qing": [
        {
            type: "primary", tier: "high",
            title: "Kangxi's Valedictory Edict (1717) — the Kangxi Emperor's own account, late in his 61-year reign, of how the Qing dynasty won the Mandate of Heaven from the fallen Ming",
            publisher: "University of Delaware, Department of History — translated primary source document",
            url: "http://www1.udel.edu/History-old/figal/Hist104/assets/pdf/readings/05kangxivaledict.pdf"
        },
        {
            type: "secondary", tier: "high",
            title: "Qing dynasty — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Qing_dynasty"
        },
        {
            type: "video", tier: "medium",
            title: "How the Manchu Conquered China: The Rise of the Qing Dynasty",
            publisher: "YouTube (independent history documentary)",
            url: "https://www.youtube.com/watch?v=gTV8YSilPEo"
        }
    ],

    "china_ming": [
        {
            type: "primary", tier: "high",
            title: "An Imperial Edict Restraining Officials from Evil — a proclamation of the Hongwu Emperor (Zhu Yuanzhang), founder of the Ming dynasty, warning his civil and military officials against corruption",
            publisher: "Asia for Educators, Columbia University — translated primary source document",
            url: "https://afe.easia.columbia.edu/ps/china/restraining_officials.pdf"
        },
        {
            type: "secondary", tier: "high",
            title: "Ming dynasty — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Ming_dynasty"
        },
        {
            type: "video", tier: "medium",
            title: "Founding the Ming Dynasty: Zhu Yuanzhang, Emperor Hongwu",
            publisher: "YouTube (independent history documentary)",
            url: "https://www.youtube.com/watch?v=M5r_TUgtqBQ"
        }
    ],

    "china_yuan": [
        {
            type: "primary", tier: "high",
            title: "Yuanshi (元史, History of Yuan, compiled 1370), Annals of Emperor Shizu (世祖本紀), Chapter 4 — the official Ming-era dynastic history's opening chapter on Kublai Khan's reign as founder of the Yuan dynasty",
            publisher: "Wikisource (Chinese) — original classical Chinese text",
            url: "https://zh.wikisource.org/wiki/%E5%85%83%E5%8F%B2/%E5%8D%B7004"
        },
        {
            type: "secondary", tier: "high",
            title: "Yuan dynasty — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Yuan_dynasty"
        },
        {
            type: "video", tier: "medium",
            title: "Kublai Khan: The Mongol Emperor of China",
            publisher: "YouTube (independent history documentary)",
            url: "https://www.youtube.com/watch?v=1jDpca_Vlpk"
        }
    ],

    "mongol_china": [
        {
            type: "primary", tier: "high",
            title: "Marco Polo, The Glories of Kinsay (Hangzhou) — from The Book of Ser Marco Polo the Venetian (c. 1300), the Venetian traveler's eyewitness description of the great southern Chinese city under Yuan Mongol rule",
            publisher: "Internet History Sourcebooks Project, Fordham University",
            url: "https://sourcebooks.fordham.edu/source/polo-kinsay.asp"
        },
        {
            type: "secondary", tier: "high",
            title: "Mongol conquest of China — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Mongol_conquest_of_China"
        },
        {
            type: "video", tier: "high",
            title: "How the Chinese Defended Against the Mongols",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=RmaVP1n3Ogk"
        }
    ],

    "song_jin_war": [
        {
            type: "primary", tier: "high",
            title: "The Accounts of Jingkang (靖康稗史, compiled shortly after 1127) — a compilation of seven contemporary eyewitness records of the Jingkang Incident, when Jurchen Jin forces sacked Kaifeng and captured two Song emperors",
            publisher: "Chinese Text Project (ctext.org) — original Chinese text with annotations (箋証)",
            url: "https://ctext.org/wiki.pl?if=gb&chapter=270398&remap=gb"
        },
        {
            type: "secondary", tier: "high",
            title: "Jingkang incident — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Jingkang_incident"
        },
        {
            type: "video", tier: "medium",
            title: "The Rise and Fall of the Jurchens & Identity Politics As Imperial Policy - Jin Dynasty History",
            publisher: "YouTube (independent history documentary)",
            url: "https://www.youtube.com/watch?v=8bz1upxfCEY"
        }
    ],

    "china_song": [
        {
            type: "primary", tier: "high",
            title: "Wang Anshi's Memorial to Emperor Renzong (1058) — the reformer's own 10,000-character letter proposing the sweeping economic, military and educational reforms later enacted as the New Policies",
            publisher: "Asia for Educators, Columbia University — full translated primary source document",
            url: "https://afe.easia.columbia.edu/ps/cup/wang_anshi_crop_loans.pdf"
        },
        {
            type: "secondary", tier: "high",
            title: "Song dynasty — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Song_dynasty"
        },
        {
            type: "video", tier: "medium",
            title: "Rise & Fall of the Song Dynasty | China's Golden Age Explained (Full Documentary)",
            publisher: "YouTube (independent history documentary)",
            url: "https://www.youtube.com/watch?v=Hl8jbWl91q4"
        }
    ],

    "tang_collapse": [
        {
            type: "primary", tier: "high",
            title: "Du Fu, Collected Poems (Du Gongbu Ji, poems written 755-763 CE) — the \"Poet-Sage's\" eyewitness verses on the An Lushan Rebellion, including \"Spring View\" written from captured Chang'an, earning his work the name \"poetic history\"",
            publisher: "Chinese Text Project (ctext.org) — original Chinese text",
            url: "https://ctext.org/wiki.pl?if=en&res=502877"
        },
        {
            type: "secondary", tier: "high",
            title: "An Lushan rebellion — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/An_Lushan_rebellion"
        },
        {
            type: "video", tier: "high",
            title: "An Lushan Rebellion - One of the Bloodiest Conflicts in History",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=YAvldyKxTJA"
        }
    ],

    "china_tang": [
        {
            type: "primary", tier: "high",
            title: "Wu Jing, Zhenguan Zhengyao (Essentials of Governance from the Zhenguan Era, compiled early 8th century) — a compendium of dialogues between Emperor Taizong and his ministers, the model of statecraft credited with the Tang dynasty's golden age",
            publisher: "Internet Archive — Chinese text edition",
            url: "https://archive.org/details/zhenguanzhengyao0000wuji"
        },
        {
            type: "secondary", tier: "high",
            title: "Tang dynasty — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Tang_dynasty"
        },
        {
            type: "video", tier: "medium",
            title: "Emperor Taizong and the Rise of the Tang Dynasty",
            publisher: "YouTube (independent history documentary)",
            url: "https://www.youtube.com/watch?v=QN535vSrvGg"
        }
    ],

    "china_sui": [
        {
            type: "primary", tier: "high",
            title: "Suishu (Book of Sui, completed 636 CE) — the official Tang-compiled history of the Sui dynasty, covering Emperor Wen's reunification of China and Emperor Yang's Grand Canal construction",
            publisher: "Chinese Text Project (ctext.org) — original Chinese text",
            url: "https://ctext.org/wiki.pl?if=en&res=386407"
        },
        {
            type: "secondary", tier: "high",
            title: "Sui dynasty — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Sui_dynasty"
        },
        {
            type: "video", tier: "medium",
            title: "The Sui Dynasty | History of China, EP6",
            publisher: "YouTube (independent history documentary)",
            url: "https://www.youtube.com/watch?v=t6SfDGVR6Fw"
        }
    ],

    "china_three_kingdoms": [
        {
            type: "primary", tier: "high",
            title: "Chen Shou, Sanguozhi (Records of the Three Kingdoms, late 3rd century CE) — the official historical text covering the fall of the Han and the rival Wei, Shu and Wu kingdoms, compiled by a historian who lived through the era",
            publisher: "Chinese Text Project (ctext.org) — original Chinese text",
            url: "https://ctext.org/wiki.pl?if=en&res=339496"
        },
        {
            type: "secondary", tier: "high",
            title: "Three Kingdoms — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Three_Kingdoms"
        },
        {
            type: "video", tier: "high",
            title: "Red Cliffs and Jiangling 208 - Three Kingdoms DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=a1n0yNDODJI"
        }
    ],

    "china_buddhism": [
        {
            type: "primary", tier: "high",
            title: "Mouzi Lihuolun (\"Master Mou's Treatise Settling Doubts,\" late 2nd century CE) — the earliest surviving Chinese Buddhist apologetic text, a dialogue defending Buddhism against Confucian and Daoist criticism",
            publisher: "Chinese Text Project (ctext.org) — original Chinese text",
            url: "https://ctext.org/wiki.pl?chapter=50856&if=en"
        },
        {
            type: "secondary", tier: "high",
            title: "Buddhism in China — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Buddhism_in_China"
        },
        {
            type: "video", tier: "medium",
            title: "Emperor Han Wudi - Ancient China's Greatest Conqueror",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=fEY1ljrE88M"
        }
    ],

    "china_han": [
        {
            type: "primary", tier: "high",
            title: "Ban Gu, Han Shu (Book of Han, completed c. 111 CE) — the official dynastic history covering the Western Han's golden age, including Emperor Wu's reign and imperial expansion",
            publisher: "Chinese Text Project (ctext.org) — original Chinese text",
            url: "https://ctext.org/han-shu"
        },
        {
            type: "secondary", tier: "high",
            title: "Han dynasty — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Han_dynasty"
        },
        {
            type: "video", tier: "high",
            title: "Emperor Han Wudi - Ancient China's Greatest Conqueror",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=fEY1ljrE88M"
        }
    ],

    "silk_road": [
        {
            type: "primary", tier: "high",
            title: "Sima Qian, Shiji, \"Biographies of Dawan\" (大宛列傳, c. 94 BCE) — the account of Zhang Qian's diplomatic missions to Central Asia (138-125 BCE), whose reports to Emperor Wu opened the Silk Road",
            publisher: "Chinese Text Project (ctext.org) — original Chinese text",
            url: "https://ctext.org/shiji/da-yuan-lie-zhuan/zh"
        },
        {
            type: "secondary", tier: "high",
            title: "Silk Road — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Silk_Road"
        },
        {
            type: "video", tier: "high",
            title: "The Greco-Chinese War Over the Heavenly Horses",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=g6Rphg_lwwM"
        }
    ],

    "qindynasty_fall": [
        {
            type: "primary", tier: "high",
            title: "Sima Qian, Shiji, \"Hereditary House of Chen She\" (c. 94 BCE) — the near-contemporary account of the Chen Sheng and Wu Guang uprising (209 BCE) that ignited the rebellion which toppled the Qin dynasty",
            publisher: "Chinese Text Project (ctext.org) — original Chinese text",
            url: "https://ctext.org/shiji/chen-she-shi-jia/zh"
        },
        {
            type: "secondary", tier: "high",
            title: "Chu-Han Contention — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Chu%E2%80%93Han_Contention"
        },
        {
            type: "video", tier: "high",
            title: "Battle of Gaixia - Chu-Han Contention DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=SyA94_5Z0_Y"
        }
    ],

    "china_qin": [
        {
            type: "primary", tier: "high",
            title: "The Terracotta Army and imperial stele inscriptions of Qin Shi Huang (c. 221-210 BCE) — the physical funerary army and the emperor's own mountain-inscriptions proclaiming his unification of China",
            publisher: "Smarthistory — \"The Tomb of the First Emperor\"",
            url: "https://smarthistory.org/tomb-first-emperor-qin/"
        },
        {
            type: "secondary", tier: "high",
            title: "Qin Shi Huang — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Qin_Shi_Huang"
        },
        {
            type: "video", tier: "high",
            title: "Qin Shi Huang: The First Emperor of China",
            publisher: "Biographics",
            url: "https://www.youtube.com/watch?v=b2FUmD1pyVM"
        }
    ],

    "china_warring": [
        {
            type: "primary", tier: "high",
            title: "Sun Tzu, The Art of War (Sunzi bingfa, 5th century BCE) — the essential military treatise from the Warring States era, still consulted by strategists worldwide",
            publisher: "Chinese Text Project (ctext.org) — original Chinese text with English translation",
            url: "https://ctext.org/art-of-war"
        },
        {
            type: "secondary", tier: "high",
            title: "Warring States period — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Warring_States_period"
        },
        {
            type: "video", tier: "medium",
            title: "Earliest Chinese Armies - Armies and Tactics DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=VG6C9x2Ve90"
        }
    ],

    "china_confucius": [
        {
            type: "primary", tier: "high",
            title: "The Analects (Lunyu, compiled by Confucius's disciples after his death in 479 BCE) — the essential record of Confucius's own sayings and teachings, the founding text of Confucianism",
            publisher: "Chinese Text Project (ctext.org) — original Chinese text with James Legge's English translation",
            url: "https://ctext.org/analects"
        },
        {
            type: "secondary", tier: "high",
            title: "Confucius — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Confucius"
        },
        {
            type: "video", tier: "high",
            title: "2,000 Years of Chinese History! The Mandate of Heaven and Confucius: Crash Course World History #7",
            publisher: "Crash Course",
            url: "https://www.youtube.com/watch?v=ylWORyToTo4"
        }
    ],

    "china_zhou": [
        {
            type: "primary", tier: "high",
            title: "The Book of Documents (Shujing/Shangshu, compiled from Western Zhou proclamations) — the Zhou dynasty's own foundational political texts, including King Wu's justification for overthrowing the Shang and the doctrine of the Mandate of Heaven",
            publisher: "Chinese Text Project (ctext.org) — original Chinese text with James Legge's English translation",
            url: "https://ctext.org/shang-shu"
        },
        {
            type: "secondary", tier: "high",
            title: "Zhou dynasty — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Zhou_dynasty"
        },
        {
            type: "video", tier: "medium",
            title: "The Ancient Empire | Animated History of China | Part 1",
            publisher: "Suibhne",
            url: "https://www.youtube.com/watch?v=YP1qjTzxQNE"
        }
    ],

    "china_shang": [
        {
            type: "primary", tier: "high",
            title: "Oracle bone inscriptions of the Shang dynasty (c. 1250-1050 BCE) — divination records inscribed on tortoise plastrons and ox scapulae, the earliest confirmed Chinese writing and the primary evidence for Shang history",
            publisher: "Smarthistory",
            url: "https://smarthistory.org/oracle-bone/"
        },
        {
            type: "secondary", tier: "high",
            title: "Shang dynasty — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Shang_dynasty"
        },
        {
            type: "video", tier: "high",
            title: "Earliest Chinese Armies - Armies and Tactics DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=VG6C9x2Ve90"
        }
    ],

    "china_xia": [
        {
            type: "primary", tier: "high",
            title: "Sima Qian, Shiji (Records of the Grand Historian), \"Annals of Xia\" (夏本紀, c. 94 BCE) — the earliest systematic Chinese account of the legendary Xia dynasty and Yu the Great's flood-control labors",
            publisher: "Chinese Text Project (ctext.org) — original Chinese text",
            url: "https://ctext.org/shiji/xia-ben-ji/zh"
        },
        {
            type: "secondary", tier: "high",
            title: "Xia dynasty — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Xia_dynasty"
        },
        {
            type: "video", tier: "medium",
            title: "The Ancient Empire | Animated History of China | Part 1",
            publisher: "Suibhne",
            url: "https://www.youtube.com/watch?v=YP1qjTzxQNE"
        }
    ],

    "iran_21": [
        {
            type: "primary", tier: "high",
            title: "The Joint Comprehensive Plan of Action (JCPOA, 14 July 2015) — the nuclear agreement between Iran and the P5+1 powers, later weakened by the 2018 US withdrawal",
            publisher: "United Nations Digital Library — official UN Security Council document S/2015/544, full text",
            url: "https://documents.un.org/doc/undoc/gen/n15/225/49/pdf/n1522549.pdf"
        },
        {
            type: "secondary", tier: "high",
            title: "Politics of Iran — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Politics_of_Iran"
        },
        {
            type: "video", tier: "high",
            title: "What's the legacy of the Iran nuclear deal and its collapse? | Inside Story",
            publisher: "Al Jazeera",
            url: "https://www.youtube.com/watch?v=cdhfHU-xmJA"
        }
    ],

    "iran_20": [
        {
            type: "primary", tier: "high",
            title: "UN Security Council Resolution 598 (20 July 1987) — the ceasefire resolution that ultimately ended the Iran-Iraq War in August 1988",
            publisher: "United Nations Digital Library — official resolution text",
            url: "https://digitallibrary.un.org/record/137345?ln=en"
        },
        {
            type: "secondary", tier: "high",
            title: "Iran-Iraq War — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Iran%E2%80%93Iraq_War"
        },
        {
            type: "video", tier: "high",
            title: "Iran: The Making of a War",
            publisher: "Al Jazeera",
            url: "https://www.aljazeera.com/video/featured-documentaries/2026/8/1/iran-the-making-of-a-war"
        }
    ],

    "iran_19": [
        {
            type: "primary", tier: "high",
            title: "Ayatollah Ruhollah Khomeini, Address to the Nation (1 April 1979) — Khomeini's own proclamation of the Islamic Republic, declaring \"This is the first day of God's government\"",
            publisher: "National Security Archive, George Washington University — full text",
            url: "https://nsarchive.gwu.edu/document/28043-document-03-ayatollah-ruhollah-khomeini-address-nation-april-1-1979"
        },
        {
            type: "secondary", tier: "high",
            title: "Iranian Revolution — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Iranian_Revolution"
        },
        {
            type: "video", tier: "high",
            title: "Why Iranian Revolution Happened",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=06cDaT_wEYo"
        }
    ],

    "iran_18": [
        {
            type: "primary", tier: "high",
            title: "The Oil Nationalization Law (20 March 1951) — the Majles's own act nationalizing the Anglo-Iranian Oil Company, championed by Prime Minister Mohammad Mossadegh",
            publisher: "The Mossadegh Project (mohammadmossadegh.com) — official English text",
            url: "https://www.mohammadmossadegh.com/news/iran-oil-nationalization-law-1951/"
        },
        {
            type: "secondary", tier: "high",
            title: "Mohammad Mossadegh — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Mohammad_Mossadegh"
        },
        {
            type: "video", tier: "high",
            title: "The Hidden Story Behind Iran's Coup of 1953",
            publisher: "PBS",
            url: "https://www.pbs.org/video/hidden-story-behind-irans-coup-1953-b8tzee"
        }
    ],

    "iran_17": [
        {
            type: "primary", tier: "high",
            title: "British Foreign Office correspondence on Reza Shah's forced abdication (September 1941) — official records of the Anglo-Soviet occupation and the end of Reza Shah's reign",
            publisher: "Digital Library of the Middle East, Stanford University (UK National Archives Foreign Office files)",
            url: "https://dlme-prod.stanford.edu/library/catalog.html?f%5Bcho_type_facet.en_ssim%5D%5B%5D=Text:Other+Texts&f%5Bcontributor%5D%5B%5D=Foreign+Office+(correspondent)&page=5&per_page=96&sort=relevance&view=gallery"
        },
        {
            type: "secondary", tier: "high",
            title: "Reza Shah — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Reza_Shah"
        },
        {
            type: "video", tier: "high",
            title: "The Last Shah of Iran (BBC, 1982)",
            publisher: "BBC",
            url: "https://www.youtube.com/watch?v=1pmMgQno3Zw"
        }
    ],

    "iran_16": [
        {
            type: "primary", tier: "high",
            title: "The Persian Constitution of 1906 and its 1907 Supplementary Fundamental Laws — Iran's founding constitutional documents, establishing an elected National Consultative Assembly (Majlis)",
            publisher: "Foundation for Iranian Studies — full English text",
            url: "https://fis-iran.org/document/iran-1906-constitution/"
        },
        {
            type: "secondary", tier: "high",
            title: "Persian Constitutional Revolution — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Persian_Constitutional_Revolution"
        },
        {
            type: "video", tier: "medium",
            title: "Why were the Iranian Empires so Successful?",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=Sk4z4tF9ku4"
        }
    ],

    "iran_15": [
        {
            type: "primary", tier: "high",
            title: "The Treaty of Turkmenchay (1828) — the peace treaty ending the Russo-Persian War of 1826-28, in which Qajar Iran ceded its remaining Caucasian territories to the Russian Empire",
            publisher: "Wikisource — full English text",
            url: "https://en.wikisource.org/wiki/Treaty_of_Turkmenchay"
        },
        {
            type: "secondary", tier: "high",
            title: "Qajar dynasty — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Qajar_dynasty"
        },
        {
            type: "video", tier: "medium",
            title: "Why were the Iranian Empires so Successful?",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=Sk4z4tF9ku4"
        }
    ],

    "iran_14": [
        {
            type: "primary", tier: "high",
            title: "Carsten Niebuhr, Travels through Arabia, and other countries in the East (1774/1792) — a Danish explorer's firsthand account of Shiraz and Karim Khan Zand's court, visited in 1765",
            publisher: "Internet Archive (Robert Heron English translation, 1792)",
            url: "https://archive.org/details/bim_eighteenth-century_travels-through-arabia-_niebuhr-carsten_1792_1"
        },
        {
            type: "secondary", tier: "high",
            title: "Zand dynasty — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Zand_dynasty"
        },
        {
            type: "video", tier: "medium",
            title: "Why were the Iranian Empires so Successful?",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=Sk4z4tF9ku4"
        }
    ],

    "iran_13": [
        {
            type: "primary", tier: "high",
            title: "Jonas Hanway, An Historical Account of the British Trade over the Caspian Sea, incl. The Revolutions of Persia (1753) — an English merchant's eyewitness account of Nader Shah's camp and reign",
            publisher: "Internet Archive (1753 first edition)",
            url: "https://archive.org/details/revolutionsofper00hanw"
        },
        {
            type: "secondary", tier: "high",
            title: "Afsharid dynasty — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Afsharid_dynasty"
        },
        {
            type: "video", tier: "high",
            title: "Nader Shah Attacks India - Sack of Delhi 1739",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=iLRTw8lpICU"
        }
    ],

    "iran_12": [
        {
            type: "primary", tier: "high",
            title: "Jean Chardin, Travels in Persia (published 1711) — a French jeweler's decade of firsthand observation of Safavid court life under Shah Abbas II and Shah Suleiman",
            publisher: "Internet Archive (1927 English edition)",
            url: "https://archive.org/details/travelsinpersia0000char"
        },
        {
            type: "secondary", tier: "high",
            title: "Safavid Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Safavid_Empire"
        },
        {
            type: "video", tier: "high",
            title: "Ottoman Wars: Battles of Otranto 1480 and Chaldiran 1514 DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=2On5JAMuu4A"
        }
    ],

    "iran_11": [
        {
            type: "primary", tier: "high",
            title: "Ruy González de Clavijo, Embassy to Tamerlane (1403–1406) — a Castilian ambassador's firsthand account of Timur's court at Samarkand",
            publisher: "Internet Archive (Guy Le Strange translation, 1928)",
            url: "https://archive.org/details/b31354932"
        },
        {
            type: "secondary", tier: "high",
            title: "Timurid Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Timurid_Empire"
        },
        {
            type: "video", tier: "high",
            title: "Rise of Timur - War against Toqtamish - MONGOL INVASIONS DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=y95sYUkQJuA"
        }
    ],

    "iran_10": [
        {
            type: "primary", tier: "high",
            title: "Ata-Malik Juvaini, Tarikh-i Jahangushay (History of the World Conqueror, completed by 1260 CE) — a Persian official's firsthand account of the Mongol conquest, written from within the Ilkhanid administration",
            publisher: "Internet Archive (J.A. Boyle translation, 1958)",
            url: "https://archive.org/details/historyoftheworl011691mbp"
        },
        {
            type: "secondary", tier: "high",
            title: "Mongol invasion of the Khwarazmian Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Mongol_invasion_of_the_Khwarazmian_Empire"
        },
        {
            type: "video", tier: "high",
            title: "Mongols: Fall of Khwarezm - Battles of Parwan and Indus DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=WjS1FbHLIxM"
        }
    ],

    "iran_9": [
        {
            type: "primary", tier: "high",
            title: "Nizam al-Mulk, Siyasatnama (Book of Government, 1086–1091 CE) — the Seljuk chief vizier's own treatise on statecraft and administration",
            publisher: "Internet Archive (Hubert Darke translation)",
            url: "https://archive.org/details/the-book-of-government-or-rules-for-kings-the-siyar-al-muluk-or-siyasat-nama"
        },
        {
            type: "secondary", tier: "high",
            title: "Seljuk Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Seljuk_Empire"
        },
        {
            type: "video", tier: "high",
            title: "Rise of the Seljuk Empire - Nomadic Civilizations DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=P79ECnISamo"
        }
    ],

    "iran_8": [
        {
            type: "primary", tier: "high",
            title: "Ferdowsi, Shahnameh (Book of Kings, completed 1010 CE) — composed under Samanid patronage during the Iranian Intermezzo, preserving pre-Islamic Persian history, myth and identity in New Persian",
            publisher: "Internet Archive (Warner & Warner translation, 1905–1925)",
            url: "https://archive.org/details/shahnama01firduoft"
        },
        {
            type: "secondary", tier: "high",
            title: "Iranian Intermezzo — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Iranian_Intermezzo"
        },
        {
            type: "video", tier: "medium",
            title: "Why were the Iranian Empires so Successful?",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=Sk4z4tF9ku4"
        }
    ],

    "iran_7": [
        {
            type: "primary", tier: "high",
            title: "Al-Tabari, History of the Prophets and Kings (Ta'rikh al-Rusul wa'l-Muluk, c. 915 CE) — the standard early Islamic chronicle's detailed account of the conquest of Sasanian Persia",
            publisher: "Internet Archive (complete 40-volume SUNY Press English translation)",
            url: "https://archive.org/details/history-of-al-tabarri"
        },
        {
            type: "secondary", tier: "high",
            title: "Muslim conquest of Persia — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Muslim_conquest_of_Persia"
        },
        {
            type: "video", tier: "high",
            title: "Last Stand of the Sassanids - Battle of Nahavand 642 DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=vK5YHnpL8Ek"
        }
    ],

    "iran_6": [
        {
            type: "primary", tier: "high",
            title: "Res Gestae Divi Saporis — Shapur I's own trilingual inscription at Naqsh-e Rustam recounting his victories over three Roman emperors",
            publisher: "ToposText (English translation adapted from R.N. Frye's edition)",
            url: "https://topostext.org/work/561"
        },
        {
            type: "secondary", tier: "high",
            title: "Sasanian Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Sasanian_Empire"
        },
        {
            type: "video", tier: "high",
            title: "Byzantine – Sasanian War of 602–628 DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=B8tavupAl5g"
        }
    ],

    "iran_5": [
        {
            type: "primary", tier: "high",
            title: "Plutarch, Life of Crassus (early 2nd century CE) — a near-contemporary Roman account of the catastrophic Battle of Carrhae (53 BCE) against the Parthians",
            publisher: "Perseus Digital Library, Tufts University (Bernadotte Perrin translation)",
            url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0038"
        },
        {
            type: "secondary", tier: "high",
            title: "Parthian Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Parthian_Empire"
        },
        {
            type: "video", tier: "high",
            title: "Parthian Army: Rome's Toughest Rival",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=8Rzc3OSrQLM"
        }
    ],

    "iran_4": [
        {
            type: "primary", tier: "high",
            title: "Arrian, Anabasis of Alexander (2nd century CE) — the fullest surviving account of Alexander's conquest of the Achaemenid Persian Empire, drawing on eyewitness sources",
            publisher: "ToposText (E.J. Chinnock translation, 1884)",
            url: "https://topostext.org/work/205"
        },
        {
            type: "secondary", tier: "high",
            title: "Wars of Alexander the Great — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Wars_of_Alexander_the_Great"
        },
        {
            type: "video", tier: "high",
            title: "Battle of Gaugamela 331 BC - Alexander the Great DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=xwunu9gJyas"
        }
    ],

    "iran_3": [
        {
            type: "primary", tier: "high",
            title: "The Behistun Inscription (c. 522–486 BCE) — Darius I's own trilingual monumental account of his accession and suppression of rebellions across the Achaemenid Empire",
            publisher: "Livius.org (L.W. King & R.C. Thompson translation, 1907)",
            url: "https://www.livius.org/articles/place/behistun/behistun-3/"
        },
        {
            type: "secondary", tier: "high",
            title: "Achaemenid Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Achaemenid_Empire"
        },
        {
            type: "video", tier: "high",
            title: "Cyrus the Great - Rise of the Achaemenid Empire",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=ZoH2UQZBaPY"
        }
    ],

    "iran_2": [
        {
            type: "primary", tier: "high",
            title: "Herodotus, Histories, Book 1 (c. 440 BCE) — the earliest connected narrative of the Medes, including the founding of the Median kingdom under Deioces",
            publisher: "Perseus Digital Library, Tufts University (Greek text with English translation)",
            url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0126:book=1"
        },
        {
            type: "secondary", tier: "high",
            title: "Medes — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Medes"
        },
        {
            type: "video", tier: "medium",
            title: "Why were the Iranian Empires so Successful?",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=Sk4z4tF9ku4"
        }
    ],

    "iran_1": [
        {
            type: "primary", tier: "high",
            title: "Stele of King Untash-Napirisha (c. 1340–1300 BCE) — a royal Elamite monument from Chogha Zanbil bearing the king's own dedicatory inscription",
            publisher: "Musée du Louvre, Département des Antiquités orientales — official collections database",
            url: "https://collections.louvre.fr/en/ark:/53355/cl010174440"
        },
        {
            type: "secondary", tier: "high",
            title: "Elam — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Elam"
        },
        {
            type: "video", tier: "medium",
            title: "Why were the Iranian Empires so Successful?",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=Sk4z4tF9ku4"
        }
    ],

    "mughal": [
        {
            type: "primary", tier: "high",
            title: "The Baburnama — Emperor Babur's own memoirs recounting his conquest of northern India and the founding of the Mughal Empire (1526)",
            publisher: "Internet Archive (English translation)",
            url: "https://archive.org/details/babur-nama-english"
        },
        {
            type: "secondary", tier: "high",
            title: "Mughal Empire — overview",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Mughal_Empire"
        },
        {
            type: "video", tier: "high",
            title: "Two Battles of Panipat - 1526 and 1556 - Mughal Empire DOCUMENTARY",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=ycv4gDXbm7s"
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
        },
        {
            type: "video", tier: "high",
            title: "Ashoka the Great - Rise of the Mauryan Empire",
            publisher: "Kings and Generals",
            url: "https://www.youtube.com/watch?v=Ed6UZtVTI64"
        }
    ],

    "buddha": [
        {
            type: "primary", tier: "high",
            title: "Mahāparinibbāna Sutta (Dīgha Nikāya 16) — the earliest canonical account of the Buddha's final months, death, and the distribution of his relics",
            publisher: "SuttaCentral (Bhikkhu Sujato translation)",
            url: "https://suttacentral.net/dn16/en/sujato"
        },
        {
            type: "secondary", tier: "high",
            title: "Gautama Buddha — life and teachings",
            publisher: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Gautama_Buddha"
        },
        {
            type: "video", tier: "high",
            title: "Siddhartha and Ancient Buddhism - The Buddhist Expansion - World History - Part 1",
            publisher: "Extra History",
            url: "https://www.youtube.com/watch?v=jMX-YgdFwd4"
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
            publisher: "Google Arts & Culture, in partnership with the Museum of the Sakitama Ancient Burial Mounds (the sword's holding institution)",
            url: "https://artsandculture.google.com/story/the-story-of-the-inariyama-sword-museum-of-the-sakitama-ancient-burial-mounds/-wVRNOAGEvhjLQ?hl=en"
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
            publisher: "Smarthistory",
            url: "https://smarthistory.org/todai-ji/"
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
            publisher: "University of Tokyo Digital Archive Portal — digitized manuscript collection (Hozumi Nobushige Collection), including a 1343 copy",
            url: "https://da.dl.itc.u-tokyo.ac.jp/portal/en/collection/goseibai"
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
            publisher: "G7 Information Centre, University of Toronto (full text of the announcement)",
            url: "https://g7.utoronto.ca/finance/fm850922.htm"
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
            publisher: "Viet Texts, University of Hawai'i at Mānoa (English translation by Liam C. Kelley, based on the 1697 Chính Hòa edition)",
            url: "https://sites.google.com/hawaii.edu/viettexts/home"
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
            publisher: "Imperial Citadel of Thăng Long Heritage Conservation Centre (official site management authority)",
            url: "https://hoangthanhthanglong.vn/en/di-chi-bai-men/555"
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
            title: "Sima Qian, Shiji (Records of the Grand Historian), Chapter 113: Annals of Nanyue (c. 94 BCE) — the contemporary Han Chinese account of Zhao Tuo (Triệu Đà) and the founding of the kingdom of Nanyue (Nam Việt)",
            publisher: "Chinese Text Project (original text with English chapter reference)",
            url: "https://ctext.org/shiji"
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
            publisher: "Chinese Text Project (ctext.org) — Book of Han (漢書), Geography Records (地理志下)",
            url: "https://ctext.org/han-shu/di-li-zhi-xia"
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
            title: "Hou Hanshu (Book of the Later Han, compiled by Fan Ye, early 5th century CE), Chapter 86, \"Biographies of the Southern and Southwestern Barbarians\" — the principal surviving account of the Trưng Sisters' rebellion, quoted directly in translation (note: no contemporary Lạc Việt inscription or record survives, making this Chinese imperial history the sole near-primary documentation of the uprising)",
            publisher: "New World Encyclopedia (direct quotation of the translated primary chronicle)",
            url: "https://www.newworldencyclopedia.org/entry/Tr%C6%B0ng_Sisters"
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
            publisher: "Viet Texts, University of Hawai'i at Mānoa (English translation by Liam C. Kelley, Đại Việt sử ký toàn thư, Outer Annals ch. 4)",
            url: "https://sites.google.com/hawaii.edu/viettexts/đvsktt-nk/đvsktt-nk-4"
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
            publisher: "Vietnam Maritime Archaeology Project Center (Bạch Đằng River research project documentation)",
            url: "http://www.themua.org/vietnam/bdp.php"
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
            type: "primary", tier: "high",
            title: "The Trần Temple complex (Nam Định) and its 1868-discovered stele inscription — the dynasty's own dynastic shrine, built on the site of Trần Hưng Đạo's family residence and continuously used for the imperial seal-opening ceremony the Trần court itself instituted in 1239",
            publisher: "Vietnam Law Magazine (sourced description of the primary site and its inscriptions)",
            url: "https://vietnamlawmagazine.vn/tran-temple-preserves-glorious-legacy-of-early-monarchs-78696.html"
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
            publisher: "Thư Viện Pháp Luật (Vietnam's Library of Legal Documents) — full text of Quốc Triều Hình Luật",
            url: "https://cdndanluat.thuvienphapluat.vn/ls-file.ashx?__key=00.00.46.04.83/Quoctrieuhinhluat.pdf"
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
            type: "primary", tier: "high",
            title: "Alexandre de Rhodes's own accounts of Đàng Ngoài (Tonkin, under the Trịnh) and Đàng Trong (Cochinchina, under the Nguyễn), written from his direct residence in both courts (1624–1630, 1640–1645) — a contemporary Jesuit missionary's firsthand description of the divided realm and its rival lords",
            publisher: "Encyclopedia.com (sourced overview quoting de Rhodes's own missionary writings)",
            url: "https://www.encyclopedia.com/religion/encyclopedias-almanacs-transcripts-and-maps/rhodes-alexandre-de"
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
            title: "Emperor Quang Trung's (Nguyễn Huệ's) own Chiếu lên ngôi (Coronation Edict, 22 December 1788) — his own words on assuming the throne before marching north to meet the Qing invasion, quoted at the Đống Đa Mound national historic site he founded through his victory",
            publisher: "Đống Đa Cultural Park (official site of the historic battlefield and monument)",
            url: "https://godongda.vn/di-tich/reliefs"
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
            publisher: "Vietnamese Nôm Preservation Foundation (digitized original woodblock text, National Library of Vietnam collection)",
            url: "https://lib.nomfoundation.org/collection/1/volume/221/"
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
