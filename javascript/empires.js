// EMPIRE_GEOJSON_MAP — sceneId -> { year, names } proxy mapping into the aourednik/historical-basemaps dataset
// eslint-disable-next-line no-unused-vars
const EMPIRE_GEOJSON_MAP = {

    indus_early:                { year: 200, names: ["Magadha"] },
    indus_mature:               { year: 200, names: ["Magadha"] },
    indus_decline:              { year: 200, names: ["Magadha"] },

    vedic_early:                { year: 200, names: ["Magadha"] },
    vedic_late:                 { year: 200, names: ["Magadha"] },

    mahajanapadas:              { year: 200, names: ["Magadha", "Kalinga"] },

    maurya_founding:            { year: 200, names: ["Magadha"] },
    // Ashoka's empire: combined Magadha + Kalinga (conquered 261 BCE) +
    // Chola (southern ally). Best available multi-feature proxy.
    ashoka:                     { year: 200, names: ["Magadha", "Kalinga", "Chola"] },
    maurya_decline:             { year: 200, names: ["Magadha"] },

    gupta_rise:                 { year: 300, names: ["Gupta Empire"] },
    gupta_gold:                 { year: 400, names: ["Gupta Empire"] },
    gupta_decline:              { year: 500, names: ["Gupta Empire"] },

    chola:                      { year: 1100, names: ["Cholas"] },

    // ── Vijayanagara Empire (1336–1646) ───────────────────────────────────
    // South Indian empire — peak c.1350–1565. Year 1500 is correct.
    vijayanagara:               { year: 1500, names: ["Vijayanagara"] },

    // ── Bahmani Sultanate (1347–1527) ─────────────────────────────────────
    // Deccan sultanate, successor to Delhi in the south. Year 1500.
    bahmani:                    { year: 1500, names: ["Bahmani Kingdom"] },

    delhi_sultanate_overview:   { year: 1300, names: ["Sultanate of Delhi"] },
    delhi_sultanate_mamluk:     { year: 1279, names: ["Sultanate of Delhi"] },
    delhi_sultanate_khilji:     { year: 1300, names: ["Sultanate of Delhi"] },
    delhi_sultanate_tuglaq:     { year: 1300, names: ["Sultanate of Delhi"] },

    mughal:                     { year: 1700, names: ["Mughal Empire"] },
    babur:                      { year: 1500, names: ["Sultanate of Delhi"] },
    // Humayun (1530–1556) was the 2nd Mughal emperor. Delhi Sultanate had already fallen.
    // Fixed: year 1600 "Mughal Empire" is the closest proxy (no 1530s polygon exists in dataset).
    humayun:                    { year: 1600, names: ["Mughal Empire"] },
    akbar:                      { year: 1600, names: ["Mughal Empire"] },
    jahangir:                   { year: 1600, names: ["Mughal Empire"] },
    shah_jahan:                 { year: 1700, names: ["Mughal Empire"] },
    aurangzeb:                  { year: 1700, names: ["Mughal Empire"] },

    maratha_c:                  { year: 1800, names: ["Maratha Confederacy"] },
    maratha_p:                  { year: 1800, names: ["Maratha Confederacy"] },

    // ── Other India ───────────────────────────────────────────────────────
    // Mahmud of Ghazni / Ghurid invasions (1000–1206 CE)
    mahmud_muhammad:            { year: 1000, names: ["Ghaznavid Emirate"] },
    // Third Battle of Panipat (1761): Marathas defeated by Ahmad Shah Durrani
    third_panipat:              { year: 1800, names: ["Maratha Confederacy"] },
    // Tripartite struggle (Gurjara-Pratihara vs Rashtrakuta vs Pala, c.750–1000)
    tripartite_struggle:        { year: 800,  names: ["Gurjara Pratihara"] },
    // Buddha (c.480 BCE): Magadha heartland proxy
    buddha:                     { year: 200,  names: ["Magadha"] },
    // Silk Road: Han China + Parthian Empire spanning Central Asia
    silk_road:                  { year: 100,  names: ["Han", "Parthian Empire"] },

    china_xia:                  { year: 100, names: ["Han"] },
    china_shang:                { year: 100, names: ["Han"] },
    china_zhou:                 { year: 100, names: ["Han"] },
    china_confucius:            { year: 100, names: ["Han"] },
    china_warring:              { year: 100, names: ["Han"] },
    china_qin:                  { year: 100, names: ["Han"] },
    qindynasty_fall:            { year: 100, names: ["Han"] },

    // ── Han Dynasty (206 BCE – 220 CE) ────────────────────────────────────
    // FACT-CHECKED: Year 100 CE is mid-Han — correct.
    china_han:                  { year: 100, names: ["Han"] },
    china_buddhism:             { year: 100, names: ["Han"] },

    // Three Kingdoms (220–280 CE); Jin dynasty unified at 280 CE.
    // Fixed: year 300 is more accurate — year 400 overshoots into the post-Three Kingdoms era.
    china_three_kingdoms:       { year: 300, names: ["Jin"] },

    // ── Sui (581–618) ─────────────────────────────────────────────────────
    china_sui:                  { year: 600, names: ["Sui Empire"] },

    // ── Tang (618–907) ────────────────────────────────────────────────────
    // FACT-CHECKED: Year 800 is mid-Tang golden age — correct.
    china_tang:                 { year: 800, names: ["Tang Empire"] },
    // Tang collapsed in 907 CE. Year 800 shows the Tang at its height, not its fall.
    // Fixed: year 900 shows the Tang in its declining phase — far more accurate for collapse context.
    tang_collapse:              { year: 900, names: ["Tang Empire"] },

    // ── Song (960–1279) ───────────────────────────────────────────────────
    // FACT-CHECKED: Year 1000 is Northern Song before Jin pressure — correct.
    china_song:                 { year: 1000, names: ["Song Empire"] },
    song_jin_war:               { year: 1200, names: ["Song Empire", "Xixia"] },

    // ── Yuan / Mongol China (1271–1368) ───────────────────────────────────
    // FACT-CHECKED: Year 1279 "Great Khanate" is the Mongol Yuan dynasty — correct.
    china_yuan:                 { year: 1279, names: ["Great Khanate"] },

    // ── Ming (1368–1644) ──────────────────────────────────────────────────
    china_ming:                 { year: 1600, names: ["Ming Chinese Empire"] },

    // ── Qing (1644–1912) ──────────────────────────────────────────────────
    china_qing:                 { year: 1800, names: ["Qing Empire"] },

    // ── Republic / modern China ───────────────────────────────────────────
    // Dataset ends at 1900; "Manchu Empire" at 1900 is the Qing polygon.
    china_opium:                { year: 1800, names: ["Qing Empire"] },
    china_1911:                 { year: 1900, names: ["Manchu Empire"] },
    warlord_era:                { year: 1900, names: ["Manchu Empire"] },
    may_fourth:                 { year: 1900, names: ["Manchu Empire"] },
    ccp_foundation:             { year: 1900, names: ["Manchu Empire"] },
    long_march:                 { year: 1900, names: ["Manchu Empire"] },
    sino_japanese_war:          { year: 1900, names: ["Manchu Empire", "Imperial Japan"] },
    china_civil:                { year: 1900, names: ["Manchu Empire"] },
    china_prc:                  { year: 1900, names: ["Manchu Empire"] },
    great_leap_forward:         { year: 1900, names: ["Manchu Empire"] },
    cultural_revolution:        { year: 1900, names: ["Manchu Empire"] },
    reform_opening:             { year: 1900, names: ["Manchu Empire"] },

    mongol_genghis:             { year: 1200, names: ["Mongol Empire"] },
    mongol_conquest:            { year: 1200, names: ["Mongol Empire"] },
    mongol_large:               { year: 1279, names: ["Great Khanate", "Chagatai Khanate", "Ilkhanate", "Khanate of the Golden Horde"] },
    mongol_pax:                 { year: 1279, names: ["Great Khanate", "Chagatai Khanate", "Ilkhanate", "Khanate of the Golden Horde"] },
    mongol_decline:             { year: 1300, names: ["Great Khanate", "Chagatai Khanate", "Ilkhanate", "Khanate of the Golden Horde"] },
    mongol_china:               { year: 1279, names: ["Great Khanate"] },
    mongol_invasions_india:     { year: 1279, names: ["Great Khanate", "Chagatai Khanate"] },

    iran_3:                     { year: 200,  names: ["Parthian Empire"] },
    iran_4:                     { year: 200,  names: ["Parthian Empire"] },
    iran_5:                     { year: 200,  names: ["Parthian Empire"] },
    iran_6:                     { year: 400,  names: ["Persia"] },
    iran_7:                     { year: 700,  names: ["Umayyad Caliphate"] },
    iran_8:                     { year: 1000, names: ["Buyid Emirate", "Ghaznavid Emirate"] },
    iran_9:                     { year: 1100, names: ["Seljuk Empire"] },
    iran_10:                    { year: 1279, names: ["Ilkhanate"] },
    iran_11:                    { year: 1400, names: ["Timurid Empire"] },
    iran_12:                    { year: 1600, names: ["Safavid Empire"] },
    iran_13:                    { year: 1700, names: ["Safavid Empire"] },
    iran_14:                    { year: 1800, names: ["Persia"] },
    iran_15:                    { year: 1800, names: ["Persia"] },
    iran_16:                    { year: 1900, names: ["Persia"] },
    iran_17:                    { year: 1900, names: ["Persia"] },
    iran_18:                    { year: 1900, names: ["Persia"] },
    iran_19:                    { year: 1900, names: ["Persia"] },
    iran_20:                    { year: 1900, names: ["Persia"] },

    // Jōmon (14000–300 BCE) and Yayoi (300 BCE–300 CE) predate the dataset.
    // Yamato at year 500 is the earliest available Japanese polygon — closer proxy than Japan (800 CE).
    jomon_period:               { year: 500,  names: ["Yamato"] },
    yayoi_period:               { year: 500,  names: ["Yamato"] },
    // Kofun period (250–538 CE) is a JAPANESE cultural era — was wrongly mapped to Chinese Jin dynasty.
    // Fixed: year 500 "Yamato" is the correct Japanese proxy.
    kofun_period:               { year: 500,  names: ["Yamato"] },
    asuka_period:               { year: 600,  names: ["Yamato"] },
    nara_period:                { year: 800,  names: ["Japan"] },
    heian_period:               { year: 1000, names: ["Imperial Japan (Fujiwara)"] },
    kamakura_shogunate:         { year: 1279, names: ["Shogun Japan (Kamakura)"] },
    // Muromachi shogunate (1336–1573). "Shogun Japan (Kamakura)" at 1400 is a different (preceding) shogunate.
    // Fixed: year 1500 "Japan" is the closest available polygon for the Muromachi period.
    muromachi_period:           { year: 1500, names: ["Japan"] },
    sengoku_period:             { year: 1500, names: ["Japan"] },
    azuchi_momoyama:            { year: 1600, names: ["Japan (Warring States)"] },
    edo_period:                 { year: 1700, names: ["Tokugawa Shogunate"] },
    meiji_restoration:          { year: 1900, names: ["Imperial Japan"] },
    imperial_japan:             { year: 1900, names: ["Imperial Japan"] },
    postwar_japan:              { year: 1900, names: ["Imperial Japan"] },
    modern_japan:               { year: 1900, names: ["Imperial Japan"] },

    // FACT-CHECKED: Khmer Empire peak c.1000–1200 CE. Dataset has "Khmer Empire"
    // at years 1000–1300. Correct.
    khmer_1:                    { year: 1000, names: ["Khmer Empire"] },
    khmer_2:                    { year: 1100, names: ["Khmer Empire"] },
    khmer_3:                    { year: 1200, names: ["Khmer Empire"] },
    khmer_4:                    { year: 1279, names: ["Khmer Empire"] },
    khmer_5:                    { year: 1300, names: ["Khmer Empire"] },

    islam_expansion:            { year: 700,  names: ["Umayyad Caliphate"] },
    islam_unified:              { year: 700,  names: ["Umayyad Caliphate"] },
    islam_abbasid:              { year: 800,  names: ["Abbasid Caliphate"] },
    islam_division:             { year: 1000, names: ["Fatimid Caliphate", "Abbasid Caliphate", "Caliphate of Córdoba"] },
    islam_crusades:             { year: 1100, names: ["Abbasid Caliphate", "Fatimid Caliphate"] },
    islam_mongols:              { year: 1279, names: ["Ilkhanate", "Mamluke Sultanate"] },
    islam_ottoman_rise:         { year: 1400, names: ["Ottoman Empire"] },
    islam_ottoman_peak:         { year: 1600, names: ["Ottoman Empire"] },
    islam_decline:              { year: 1800, names: ["Ottoman Empire"] },

    ottoman_1:                  { year: 1400, names: ["Ottoman Empire"] },
    ottoman_2:                  { year: 1500, names: ["Ottoman Empire"] },
    ottoman_3:                  { year: 1600, names: ["Ottoman Empire"] },
    ottoman_4:                  { year: 1700, names: ["Ottoman Empire"] },
    ottoman_5:                  { year: 1800, names: ["Ottoman Empire"] },
    ottoman_6:                  { year: 1900, names: ["Ottoman Empire"] },

    spain_rome:                 { year: 100,  names: ["Roman Empire"] },
    spain_punic_wars:           { year: 100,  names: ["Roman Empire"] },
    spain_iberians:             { year: 100,  names: ["Roman Empire"] },
    spain_phoenicians:          { year: 100,  names: ["Roman Empire"] },
    spain_carthage:             { year: 100,  names: ["Roman Empire"] },
    spain_christianity:         { year: 400,  names: ["Western Roman Empire"] },
    spain_visigoth:             { year: 600,  names: ["Visigothic Kingdom"] },
    spain_muslim_conquest:      { year: 700,  names: ["Umayyad Caliphate"] },
    spain_umayyad:              { year: 1000, names: ["Caliphate of Córdoba"] },
    spain_caliphate:            { year: 1000, names: ["Caliphate of Córdoba"] },
    spain_taifa:                { year: 1100, names: ["Almoravid dynasty", "Castilla"] },
    spain_reconquista_early:    { year: 1000, names: ["Caliphate of Córdoba", "Castilla", "Navarre"] },
    spain_reconquista_late:     { year: 1200, names: ["Almohad Caliphate", "Castilla", "Portugal"] },
    spain_granada:              { year: 1400, names: ["Granada", "Castile", "Portugal"] },
    spain_columbus:             { year: 1500, names: ["Castille", "Portugal"] },

    spain_empire_peak:          {
        year: 1600,
        names: [
            "Spain",
            "Habsburg Netherlands",
            "Vice Royalty of New Spain",
            "Cuba (Spain)",
            "Hispaniola (Spain)",
            "Portugal",
            "Vice Royalty of Peru"
        ]
    },
    spain_armada:               {
        year: 1600,
        names: [
            "Spain",
            "Habsburg Netherlands",
            "Vice Royalty of New Spain",
            "Cuba (Spain)",
            "Hispaniola (Spain)"
        ]
    },

    // Spain decline: after Treaty of Utrecht (1713), Habsburg Netherlands lost.
    // Year 1700 shows Spain + remaining American colonies.
    spain_decline:              { year: 1700, names: ["Spain", "Cuba (Spain)", "Hispaniola (Spain)", "Vice-Royalty of New Spain"] },
    spain_napoleon:             { year: 1800, names: ["Spain"] },
    spain_civil_war:            { year: 1900, names: ["Spain"] },
    spain_ww1:                  { year: 1900, names: ["Spain"] },
    spain_ww2:                  { year: 1900, names: ["Spain"] },
    spain_democracy:            { year: 1900, names: ["Spain"] },

    // Classical/Hellenistic Greece all predates dataset (BCE).
    // Year 100 Roman Empire covers the Aegean world after Roman conquest.
    greece_empires:             { year: 100,  names: ["Roman Empire", "Parthian Empire"] },
    greece_myth:                { year: 100,  names: ["Roman Empire"] },
    greece_war:                 { year: 100,  names: ["Roman Empire"] },
    greece_culture:             { year: 100,  names: ["Roman Empire"] },

    // FACT-CHECKED: Year 100 "Roman Empire" for Republican and Imperial Rome.
    // Year 400 shows the East/West split (395 CE).
    italy_republicrome:         { year: 100,  names: ["Roman Empire"] },
    italy_rome:                 { year: 100,  names: ["Roman Empire"] },
    italy_empire_rome:          { year: 100,  names: ["Roman Empire"] },
    italy_decine_rome:          { year: 400,  names: ["Eastern Roman Empire", "Western Roman Empire"] },
    italy_byzantine:            { year: 800,  names: ["Byzantine Empire"] },
    italy_charlemagne:          { year: 800,  names: ["Carolingian Empire"] },
    napoleon_empire:            { year: 1800, names: ["France"] },
    italy_napoleon:             { year: 1800, names: ["France"] },

    // New Italy scenes
    italy_early:                { year: 100,  names: ["Roman Empire"] },
    italy_etruscan:             { year: 100,  names: ["Roman Empire"] },
    italy_lombard:              { year: 600,  names: ["Lombard principalities"] },
    italy_citystates:           { year: 1000, names: ["Venice"] },
    italy_renaissance:          { year: 1500, names: ["Venice"] },
    italy_wars:                 { year: 1500, names: ["Spain", "France", "Venice"] },
    italy_congress_vienna:      { year: 1800, names: ["Austrian Empire"] },
    italy_united:               { year: 1800, names: ["Kingdom of Sardinia", "Austrian Empire"] },
    italy_industrial:           { year: 1900, names: ["Italy"] },
    italy_ww1:                  { year: 1900, names: ["Italy"] },
    italy_fascism:              { year: 1900, names: ["Italy"] },
    italy_ww2:                  { year: 1900, names: ["Italy"] },
    italy_republic_modern:      { year: 1900, names: ["Italy"] },
    italy_miracle:              { year: 1900, names: ["Italy"] },

    roman_gaul:                 { year: 100,  names: ["Roman Empire"] },
    caesar_conquest:            { year: 100,  names: ["Roman Empire"] },

    uk_roman_invasion:          { year: 100,  names: ["Roman Empire"] },
    uk_hadrians_wall:           { year: 100,  names: ["Roman Empire"] },
    uk_celts:                   { year: 100,  names: ["Roman Empire"] },
    uk_roman_withdrawal:        { year: 400,  names: ["Western Roman Empire"] },
    uk_anglo_saxon:             { year: 600,  names: ["Saxons"] },
    uk_vikings:                 { year: 800,  names: ["Northmen", "Wessex", "Mercia", "Nothumbria"] },
    uk_alfred_great:            { year: 800,  names: ["Wessex"] },
    uk_early_scotland:          { year: 1000, names: ["Scotland"] },
    uk_norman:                  { year: 1100, names: ["England"] },
    uk_feudalism:               { year: 1100, names: ["England", "Holy Roman Empire"] },
    uk_crusades:                { year: 1200, names: ["Angevin Empire"] },
    uk_magna_carta:             { year: 1200, names: ["English territory"] },
    uk_black_death:             { year: 1300, names: ["English territory"] },
    uk_hundred_years:           { year: 1400, names: ["English territory", "France"] },
    uk_wars_roses:              { year: 1400, names: ["English territory"] },
    uk_scotland_medieval:       { year: 1279, names: ["Scotland"] },
    uk_tudor:                   { year: 1500, names: ["England"] },
    scotland_witch_trials:      { year: 1600, names: ["Scotland"] },
    uk_industrial:              { year: 1800, names: ["United Kingdom"] },
    uk_empire:                  {
        year: 1900,
        names: [
            "United Kingdom of Great Britain and Ireland",
            "British Raj",
            "South Australia (UK)", "Victoria (UK)", "Queensland (UK)",
            "New South Wales (UK)", "Western Australia (UK)", "Northern Territory (UK)",
            "British Guiana", "Hong Kong", "Malaya", "Canada",
            "Cape Colony", "Ceylon"
        ]
    },
    uk_india:                   { year: 1900, names: ["United Kingdom of Great Britain and Ireland", "British Raj"] },
    uk_africa:                  {
        year: 1900,
        names: [
            "United Kingdom of Great Britain and Ireland", "British Raj",
            "Cape Colony", "British Guiana",
            "South Australia (UK)", "Victoria (UK)", "Queensland (UK)",
            "New South Wales (UK)", "Western Australia (UK)", "Northern Territory (UK)"
        ]
    },
    uk_ww1:                     { year: 1900, names: ["United Kingdom of Great Britain and Ireland"] },
    uk_ww2:                     { year: 1900, names: ["United Kingdom of Great Britain and Ireland"] },
    uk_postwar:                 { year: 1900, names: ["United Kingdom of Great Britain and Ireland"] },

    // FACT-CHECKED: Merovingian Frankish Kingdom: year 600 correct.
    // Carolingian peak (Charlemagne): year 800 correct.
    frankish_kingdom:           { year: 600,  names: ["Frankish Kingdom"] },
    germany_frankish_rise:      { year: 700,  names: ["Frankish Kingdom"] },
    carolingian_empire:         { year: 800,  names: ["Carolingian Empire"] },
    germany_charlemagne:        { year: 800,  names: ["Carolingian Empire"] },

    // FACT-CHECKED: HRE existed 962–1806. Various years from 1000–1500 shown.
    germany_city_growth:        { year: 1000, names: ["Holy Roman Empire"] },
    germany_knight_culture:     { year: 1100, names: ["Holy Roman Empire"] },
    germany_crisis_period:      { year: 1200, names: ["Holy Roman Empire"] },
    germany_printing_revolution:{ year: 1500, names: ["Holy Roman Empire"] },
    austria_4:                  { year: 1000, names: ["Holy Roman Empire"] },
    austria_5:                  { year: 1100, names: ["Holy Roman Empire"] },
    austria_6:                  { year: 1200, names: ["Holy Roman Empire"] },
    austria_7:                  { year: 1400, names: ["Holy Roman Empire"] },
    austria_8:                  { year: 1500, names: ["Holy Roman Empire"] },

    germany_early_settlers:     { year: 100,  names: ["Roman Empire"] },
    germany_tribal_unification_attempts: { year: 100, names: ["Roman Empire"] },
    germany_romans_trade:       { year: 100,  names: ["Roman Empire"] },
    germany_border_wars:        { year: 100,  names: ["Roman Empire"] },
    germany_huns_arrival:       { year: 400,  names: ["Hunnic Empire"] },
    germany_tribal_kingdoms_emerge: { year: 400, names: ["Franks", "Visigoths", "Ostrogoths"] },
    germany_empire_expansion:   { year: 1900, names: ["Germany"] },
    germany_ww1:                { year: 1900, names: ["Germany"] },
    germany_industrial_birth:   { year: 1800, names: ["Prussia", "Austrian Empire"] },
    germany_post_ww1:           { year: 1900, names: ["Germany"] },
    germany_ww2:                { year: 1900, names: ["Germany"] },
    germany_post_ww2_rebuild:   { year: 1900, names: ["Germany"] },
    germany_modern_power:       { year: 1900, names: ["Germany"] },

    russia_1:                   { year: 600,  names: ["Slavs"] },
    russia_2:                   { year: 900,  names: ["Kyivan Rus"] },
    russia_3:                   { year: 1000, names: ["Kyivan Rus"] },
    russia_4:                   { year: 1279, names: ["Khanate of the Golden Horde"] },
    russia_5:                   { year: 1300, names: ["Grand Duchy of Moscow", "Novgorod"] },
    russia_6:                   { year: 1400, names: ["Novgorod"] },
    russia_7:                   { year: 1500, names: ["Grand Duchy of Moscow"] },
    russia_8:                   { year: 1600, names: ["Tsardom of Muscovy"] },
    russia_9:                   { year: 1600, names: ["Tsardom of Muscovy"] },
    russia_10:                  { year: 1700, names: ["Tsardom of Muscovy"] },
    russia_11:                  { year: 1800, names: ["Russian Empire"] },
    russia_12:                  { year: 1800, names: ["Russian Empire"] },
    russia_13:                  { year: 1800, names: ["Russian Empire"] },
    russia_14:                  { year: 1800, names: ["Russian Empire", "France"] },
    russia_15:                  { year: 1800, names: ["Russian Empire"] },
    russia_16:                  { year: 1900, names: ["Russian Empire"] },
    russia_17:                  { year: 1900, names: ["Russian Empire"] },
    russia_18:                  { year: 1900, names: ["Russian Empire"] },
    russia_19:                  { year: 1900, names: ["Russian Empire"] },
    russia_20:                  { year: 1900, names: ["Russian Empire"] },
    russia_21:                  { year: 1900, names: ["Russian Empire"] },
    russia_22:                  { year: 1900, names: ["Russian Empire"] },
    russia_23:                  { year: 1900, names: ["Russian Empire"] },

    austria_early:              { year: 100,  names: ["Roman Empire"] },
    austria_2:                  { year: 100,  names: ["Roman Empire"] },
    austria_3:                  { year: 400,  names: ["Eastern Roman Empire", "Western Roman Empire"] },
    austria_9:                  { year: 1700, names: ["Austrian Empire"] },
    austria_10:                 { year: 1800, names: ["Austrian Empire"] },
    austria_11:                 { year: 1900, names: ["Austria Hungary"] },
    austria_12:                 { year: 1800, names: ["Austrian Empire"] },
    austria_13:                 { year: 1900, names: ["Austria Hungary"] },
    austria_14:                 { year: 1900, names: ["Austria Hungary"] },
    austria_15:                 { year: 1900, names: ["Austria Hungary"] },
    austria_16:                 { year: 1900, names: ["Germany"] },
    austria_17:                 { year: 1900, names: ["Austria Hungary"] },
    austria_18:                 { year: 1900, names: ["Austria Hungary"] },

    gaul_tribes:                { year: 100,  names: ["Roman Empire"] },
    feudal_france:              { year: 1000, names: ["Kingdom of France"] },
    crusades_france:            { year: 1200, names: ["Kingdom of France"] },
    hundred_year_war:           { year: 1400, names: ["France", "English territory"] },
    french_revolution:          { year: 1800, names: ["France"] },
    industrial_france:          { year: 1900, names: ["France"] },
    ww1_france:                 { year: 1900, names: ["France"] },
    ww2_france:                 { year: 1900, names: ["France"] },
    modern_france:              { year: 1900, names: ["France"] },

    mali_ghana_empire:          { year: 1000, names: ["Ghana"] },
    mali_sundiata:              { year: 1279, names: ["Mali"] },
    mali_empire_trade:          { year: 1279, names: ["Mali"] },
    mali_mansa_musa:            { year: 1300, names: ["Mali"] },
    mali_djinguereber:          { year: 1300, names: ["Mali"] },
    mali_timbuktu_scholars:     { year: 1300, names: ["Mali"] },
    mali_empire_decline:        { year: 1400, names: ["Mali"] },
    mali_sunni_ali:             { year: 1500, names: ["Songhai"] },
    mali_askia_muhammad:        { year: 1500, names: ["Songhai"] },
    mali_tondibi:               { year: 1600, names: ["Songhai"] },
    mali_french_colonial:       { year: 1900, names: ["France"] },
    // Bambara kingdoms (Ségou & Kaarta, est. ~1712) are distinct from the earlier Mali empire.
    // Fixed: year 1800 "Kaarta" + "Segu" directly represent the Bambara successor states.
    mali_bambara_kingdoms:      { year: 1800, names: ["Kaarta", "Segu"] },
    mali_umar_tall:             { year: 1900, names: ["Tukular Caliphate"] },
    mali_samori_resistance:     { year: 1900, names: ["First Samori Empire"] },
    mali_independence:          { year: 1900, names: ["France"] },
    mali_traore_dictatorship:   { year: 1900, names: ["France"] },
    mali_democracy:             { year: 1900, names: ["France"] },
    mali_2012_crisis:           { year: 1900, names: ["France"] },
    mali_modern_instability:    { year: 1900, names: ["France"] },

    egy_11:                     { year: 100,  names: ["Roman Empire"] },
    egy_12:                     { year: 400,  names: ["Eastern Roman Empire"] },
    egy_13:                     { year: 700,  names: ["Umayyad Caliphate"] },
    egy_14:                     { year: 1000, names: ["Fatimid Caliphate"] },
    egy_15:                     { year: 1200, names: ["Fatimid Caliphate"] },
    egy_16:                     { year: 1279, names: ["Mamluke Sultanate"] },
    egy_17:                     { year: 1600, names: ["Ottoman Empire"] },
    egy_18:                     { year: 1800, names: ["France"] },
    egy_19:                     { year: 1800, names: ["Ottoman Empire"] },
    egy_20:                     { year: 1900, names: ["Egypt"] },

    // FACT-CHECKED:
    // Aksum peak c.350 CE (Ezana's reign) — year 400 "Axum" — correct.
    eth_4:                      { year: 200,  names: ["Axum"] },
    eth_5:                      { year: 400,  names: ["Axum"] },
    eth_6:                      { year: 800,  names: ["Axum"] },
    eth_7:                      { year: 1279, names: ["Ethiopia"] },
    eth_8:                      { year: 1279, names: ["Ethiopia"] },
    eth_9:                      { year: 1500, names: ["Ethiopia"] },
    eth_10:                     { year: 1500, names: ["Ethiopia"] },
    eth_11:                     { year: 1700, names: ["Ethiopia"] },
    eth_14:                     { year: 1900, names: ["Ethiopia"] },

};
