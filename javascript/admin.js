//Admin code

function enhanceNumberInputs(ids) {
    (ids || []).forEach(id => {
        const input = document.getElementById(id);
        if (!input || input.dataset.numEnhanced) return;
        input.dataset.numEnhanced = "1";
        input.classList.add("admin-numfield-input");

        const wrap = document.createElement("div");
        wrap.className = "admin-numfield";

        const dec = document.createElement("button");
        dec.type = "button";
        dec.className = "admin-numfield-btn admin-numfield-dec";
        dec.textContent = "−";
        dec.setAttribute("aria-label", "Decrease");

        const inc = document.createElement("button");
        inc.type = "button";
        inc.className = "admin-numfield-btn admin-numfield-inc";
        inc.textContent = "+";
        inc.setAttribute("aria-label", "Increase");

        input.parentNode.insertBefore(wrap, input);
        wrap.appendChild(input);
        wrap.appendChild(dec);
        wrap.appendChild(inc);

        const fire = () => input.dispatchEvent(new Event("input", { bubbles: true }));
        dec.addEventListener("click", () => { input.stepDown(); fire(); });
        inc.addEventListener("click", () => { input.stepUp(); fire(); });
    });
}

(function () {
    const WORKER_URL       = "https://whd-admin-data.desaianays.workers.dev";
    const LS_SCENES        = "whd_admin_scenes";      // added/edited scenes
    const LS_DELETED       = "whd_admin_deleted";     // deleted scene ids
    const LS_TREE          = "whd_admin_tree";        // world tree overrides
    const LS_TREE_OPEN     = "whd_admin_tree_open";   // collapse state
    const ADMIN_SETTINGS_LS = "whd_admin_settings_v1";  // visual/audio settings
    const SS_UNLOCKED      = "whd_admin_unlocked";    // sessionStorage: verified this tab
    const SS_PASSCODE      = "whd_ADMIN_PASSCODE";    // sessionStorage: passcode used to verify
    const LS_SYNC_VERSION  = "whd_admin_sync_version"; // last-seen shared-data version

    const ADMIN_BUG_ICON_SVG = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:2px"><path d="M8 2l1.5 1.5"/><path d="M16 2l-1.5 1.5"/><path d="M9 7.5h6a3 3 0 0 1 3 3V14a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5v-3.5a3 3 0 0 1 3-3z"/><path d="M5 12H2"/><path d="M22 12h-3"/><path d="M5 17l-2.5 2"/><path d="M19 17l2.5 2"/><path d="M5 8.5L3 7"/><path d="M19 8.5L21 7"/><line x1="12" y1="7.5" x2="12" y2="19"/></svg>`;

    const html = `
    <div id="adminOverlay"></div>
    <div id="adminPanel">
        <div id="adminPassRow">
            <label>PASSCODE</label>
            <input id="adminPassInput" type="password" placeholder="Enter passcode…" autocomplete="off"/>
            <span id="adminPassError"></span>
        </div>
        <div id="adminBody">
            <div id="adminHeader">
                <h2>⚙ Admin Panel <span id="adminFormMode" style="display:none">ADD</span></h2>
                <button id="adminCloseBtn" title="Close">✕</button>
            </div>
            <div id="adminTabs">
                <div class="admin-tab active" data-tab="add">➕ Add / Edit</div>
                <div class="admin-tab" data-tab="manage">📋 Manage Entries</div>
                <div class="admin-tab" data-tab="tree">🌳 World Tree</div>
                <div class="admin-tab" data-tab="bugs">${ADMIN_BUG_ICON_SVG} Bugs <span id="adminBugsBadge" style="display:none;background:var(--accent);color:var(--on-accent);font-size:10px;font-weight:700;padding:1px 6px;border-radius:99px;margin-left:4px;vertical-align:middle;"></span></div>
                <div class="admin-tab admin-tab-owner" data-tab="owner" id="adminOwnerTab" style="display:none">⌨️ Terminal</div>
                <div class="admin-tab" data-tab="info">ℹ Info</div>
            </div>
            <div id="adminContent">

                <!-- ADD/EDIT PAGE -->
                <div class="admin-page active" data-page="add">
                <p class="admin-section-title" id="addPageTitle">New Scene Entry</p>
                <!-- Add/Edit subtabs -->
<div id="adminAddSubtabs">
    <button class="admin-add-subtab active" data-subtab="manual">
        ✍ Manual Entry
    </button>
    <button class="admin-add-subtab" data-subtab="import">
        📥 Code Import
    </button>
</div>
                    <div class="admin-add-subpage active" data-subpage="manual">
                    <div class="admin-form-grid">
                        <div class="admin-field">
                            <label>Database File</label>
                            <select id="aDb">
                                <option value="europe">Europe</option>
                                <option value="asia">Asia</option>
                                <option value="africa">Africa</option>
                                <option value="australia">Australia</option>
                                <option value="historybites">History Bites</option>
                            </select>
                        </div>
                        <div class="admin-field">
                            <label>ID (unique slug) <button type="button" id="adminAutoIdBtn" style="font-size:10px;padding:2px 7px;border-radius:5px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.5);cursor:pointer;margin-left:4px;transition:all .15s;" title="Auto-generate from name">⚡ Auto</button></label>
                            <input id="aId" type="text" placeholder="e.g. roman_republic"/>
                        </div>
                        <div class="admin-field">
                            <label>Name</label>
                            <input id="aName" type="text" placeholder="e.g. Roman Republic"/>
                        </div>
                        <div class="admin-field">
                            <label>Image Key</label>
                            <input id="aImgKey" type="text" placeholder="e.g. roman_republic"/>
                        </div>
                        <div class="admin-field">
                            <label>Start Year (negative = BC)</label>
                            <input id="aStartYear" type="number" placeholder="-509"/>
                        </div>
                        <div class="admin-field">
                            <label>End Year</label>
                            <input id="aEndYear" type="number" placeholder="-27"/>
                        </div>
                        <div class="admin-field">
                            <label>Continent</label>
                            <input id="aContinent" type="text" placeholder="e.g. Europe"/>
                        </div>
                        <div class="admin-field">
                            <label>Country</label>
                            <input id="aCountry" type="text" placeholder="e.g. Italy"/>
                        </div>
                        <div class="admin-field">
                            <label>Season</label>
                            <input id="aSeason" type="text" placeholder="e.g. Ancient Italy"/>
                        </div>
                        <div class="admin-field">
                            <label>Region</label>
                            <input id="aRegion" type="text" placeholder="e.g. Rome"/>
                        </div>
                        <div class="admin-field">
                            <label>Coordinates (lat, lng)</label>
                            <div class="coord-row">
                                <input id="aLat" type="number" step="0.01" placeholder="41.9"/>
                                <input id="aLng" type="number" step="0.01" placeholder="12.5"/>
                            </div>
                        </div>
                        <div class="admin-field">
                            <label>Zoom Level (2–8)</label>
                            <input id="aZoom" type="number" min="2" max="8" value="5"/>
                        </div>
                        <div class="admin-field admin-form-full">
                            <label>Info / Description <span id="adminInfoCharCount" style="font-weight:400;color:rgba(255,255,255,0.3);margin-left:4px;">0 chars</span></label>
                            <textarea id="aInfo" rows="5" placeholder="Full descriptive paragraph…" oninput="document.getElementById('adminInfoCharCount').textContent=this.value.length+' chars'"></textarea>
                        </div>
                    </div>
                    <p class="admin-section-title" style="margin-top:4px;">Key Events (up to 6)</p>
                    <div id="adminEventsContainer"></div>
                    <div class="admin-btn-row" style="margin-bottom:18px;">
                        <button class="admin-btn admin-btn-secondary" id="addEventBtn">+ Add Event</button>
                    </div>
                    <div class="admin-btn-row">
                        <button class="admin-btn admin-btn-primary" id="adminSaveBtn">💾 Save Entry</button>
                        <button class="admin-btn admin-btn-secondary" id="adminCancelEditBtn" style="display:none">✕ Cancel Edit</button>
                        <button class="admin-btn admin-btn-secondary" id="adminClearBtn">Clear Form</button>
                    </div>
                    </div>

<!-- IMPORT PAGE -->
<div class="admin-add-subpage" data-subpage="import">

    <p class="admin-section-title">Import Options</p>

    <div class="admin-form-grid" style="margin-bottom:14px;">
        <div class="admin-field">
            <label>Target Database</label>
            <select id="importDb">
                <option value="">— auto-detect per scene —</option>
                <option value="europe">Europe</option>
                <option value="asia">Asia</option>
                <option value="africa">Africa</option>
                <option value="australia">Australia</option>
                <option value="historybites">History Bites</option>
            </select>
        </div>
        <div class="admin-field">
            <label>Continent Override</label>
            <select id="importContinent">
                <option value="">— from code —</option>
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
                <option value="Africa">Africa</option>
                <option value="Oceania">Oceania</option>
                <option value="North America">North America</option>
                <option value="South America">South America</option>
            </select>
        </div>
        <div class="admin-field">
            <label>Country Override</label>
            <select id="importCountry">
                <option value="">— from code —</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
                <option value="Italy">Italy</option>
                <option value="Spain">Spain</option>
                <option value="Russia">Russia</option>
                <option value="Austria">Austria</option>
                <option value="Poland">Poland</option>
                <option value="China">China</option>
                <option value="Japan">Japan</option>
                <option value="India">India</option>
                <option value="Iran">Iran</option>
                <option value="Egypt">Egypt</option>
                <option value="Mali">Mali</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="South Africa">South Africa</option>
                <option value="Australia">Australia</option>
                <option value="United States">United States</option>
            </select>
        </div>
        <div class="admin-field">
            <label>Season Override</label>
            <select id="importSeason">
                <option value="">— from code —</option>
                <optgroup label="Ancient">
                <option value="Ancient Australia">Ancient Australia</option>
                <option value="Ancient Austria">Ancient Austria</option>
                <option value="Ancient China">Ancient China</option>
                <option value="Ancient Egypt">Ancient Egypt</option>
                <option value="Ancient Ethiopia">Ancient Ethiopia</option>
                <option value="Ancient France">Ancient France</option>
                <option value="Ancient Germany">Ancient Germany</option>
                <option value="Ancient Greece">Ancient Greece</option>
                <option value="Ancient India">Ancient India</option>
                <option value="Ancient Iran">Ancient Iran</option>
                <option value="Ancient Italy">Ancient Italy</option>
                <option value="Ancient Japan">Ancient Japan</option>
                <option value="Ancient Mali">Ancient Mali</option>
                <option value="Ancient Russia">Ancient Russia</option>
                <option value="Ancient South Africa">Ancient South Africa</option>
                <option value="Ancient Spain">Ancient Spain</option>
                <option value="Ancient United Kingdom">Ancient United Kingdom</option>
                </optgroup>
                <optgroup label="Medieval">
                <option value="Medieval Australia">Medieval Australia</option>
                <option value="Medieval Austria">Medieval Austria</option>
                <option value="Medieval China">Medieval China</option>
                <option value="Medieval Egypt">Medieval Egypt</option>
                <option value="Medieval Ethiopia">Medieval Ethiopia</option>
                <option value="Medieval France">Medieval France</option>
                <option value="Medieval Germany">Medieval Germany</option>
                <option value="Medieval Greece">Medieval Greece</option>
                <option value="Medieval India">Medieval India</option>
                <option value="Medieval Iran">Medieval Iran</option>
                <option value="Medieval Italy">Medieval Italy</option>
                <option value="Medieval Japan">Medieval Japan</option>
                <option value="Medieval Mali">Medieval Mali</option>
                <option value="Medieval Russia">Medieval Russia</option>
                <option value="Medieval South Africa">Medieval South Africa</option>
                <option value="Medieval Spain">Medieval Spain</option>
                <option value="Medieval United Kingdom">Medieval United Kingdom</option>
                </optgroup>
                <optgroup label="Modern">
                <option value="Modern Australia">Modern Australia</option>
                <option value="Modern Austria">Modern Austria</option>
                <option value="Modern China">Modern China</option>
                <option value="Modern Egypt">Modern Egypt</option>
                <option value="Modern Ethiopia">Modern Ethiopia</option>
                <option value="Modern France">Modern France</option>
                <option value="Modern Germany">Modern Germany</option>
                <option value="Modern Greece">Modern Greece</option>
                <option value="Modern India">Modern India</option>
                <option value="Modern Iran">Modern Iran</option>
                <option value="Modern Italy">Modern Italy</option>
                <option value="Modern Japan">Modern Japan</option>
                <option value="Modern Mali">Modern Mali</option>
                <option value="Modern Russia">Modern Russia</option>
                <option value="Modern South Africa">Modern South Africa</option>
                <option value="Modern Spain">Modern Spain</option>
                <option value="Modern United Kingdom">Modern United Kingdom</option>
                </optgroup>
                <optgroup label="Special">
                <option value="Age of Reason">Age of Reason</option>
                <option value="Black Death">Black Death</option>
                <option value="Christianity">Christianity</option>
                <option value="Dar-Al-Islam">Dar-Al-Islam</option>
                <option value="Industrial Revolution">Industrial Revolution</option>
                <option value="Islam">Islam</option>
                <option value="Khmer Empire">Khmer Empire</option>
                <option value="Mongol Empire">Mongol Empire</option>
                <option value="Trade Networks">Trade Networks</option>
                <option value="US History">US History</option>
                </optgroup>
            </select>
        </div>
    </div>

    <p class="admin-section-title">Paste Scene Code</p>
    <p style="font-size:11px;color:rgba(255,255,255,0.35);margin:-8px 0 10px;">Paste a single object <code style="color:rgba(255,255,255,0.5)">{ id:… }</code> to load into the form, or an array <code style="color:rgba(255,255,255,0.5)">[{…},{…}]</code> to bulk-add directly.</p>

    <div class="admin-field admin-form-full">
        <label>Scene Object or Array Code <span id="adminImportValidation" style="font-weight:400;margin-left:6px;font-size:10px;padding:2px 7px;border-radius:99px;"></span></label>
        <textarea
            id="adminCodeImport"
            rows="12"
            placeholder='Single:  { id: "my_id", name: "My Scene", … }&#10;Multi:   [{ id: "a", … }, { id: "b", … }]'
            style="font-family:monospace;font-size:12px;"
        ></textarea>
    </div>

    <div class="admin-btn-row">
        <button class="admin-btn admin-btn-primary" id="adminImportBtn">
            📥 Import
        </button>
        <button class="admin-btn admin-btn-secondary" id="adminCopyTemplate">
            📋 Copy Template
        </button>
        <button class="admin-btn admin-btn-secondary" id="adminImportClear">
            Clear
        </button>
    </div>

    <div id="adminImportOutput" style="margin-top:14px;"></div>

</div>
                    <div id="adminAddOutput" style="margin-top:16px;"></div>
                </div>

                <!-- MANAGE PAGE -->
                <div class="admin-page" data-page="manage">
                    <!-- Manage sub-tabs -->
                    <div id="adminManageSubtabs" style="display:flex;gap:6px;margin-bottom:16px;">
                        <button class="admin-add-subtab active" data-msubtab="active">📋 Active Scenes</button>
                        <button class="admin-add-subtab" data-msubtab="deleted">🗑 Deleted Scenes <span id="adminDeletedBadge" style="display:none;margin-left:4px;border-radius:99px;padding:1px 6px;font-size:10px;">0</span></button>
                    </div>

                    <!-- Active scenes sub-page -->
                    <div class="admin-add-subpage active" data-msubpage="active">
                        <p class="admin-section-title">Manage Scene Entries</p>
                        <input id="adminSceneFilter" type="text" placeholder="Search by name, country, season, ID, or year (e.g. 1453, 500 BCE)…"/>
                        <!-- Sort control -->
                        <div id="adminSortBar">
                            <span id="adminSortLabel">Sort</span>
                            <button class="admin-sort-btn active" data-sort="name">A–Z</button>
                            <button class="admin-sort-btn" data-sort="name-desc">Z–A</button>
                            <button class="admin-sort-btn" data-sort="year">Oldest</button>
                            <button class="admin-sort-btn" data-sort="year-desc">Newest</button>
                            <button class="admin-sort-btn" data-sort="db">By DB</button>
                            <button class="admin-sort-btn" data-sort="edited">Edited</button>
                        </div>
                        <div id="adminMultiBar">
                            <input type="checkbox" class="admin-cb" id="adminSelectAll" title="Select / deselect all"/>
                            <span id="adminMultiCount" style="font-size:12px;color:rgba(255,255,255,0.5);flex:1;"></span>
                            <button class="admin-btn admin-btn-danger" id="adminMultiDeleteBtn" style="font-size:11px;padding:4px 10px;">🗑 Delete Selected</button>
                        </div>
                        <div id="adminSceneList"></div>
                    </div>

                    <!-- Deleted scenes sub-page -->
                    <div class="admin-add-subpage" data-msubpage="deleted">
                        <p class="admin-section-title">Deleted Scenes</p>
                        <p style="font-size:12px;color:rgba(255,255,255,0.4);margin:-4px 0 14px;">These scenes have been hidden from the database. You can permanently remove them or recover them.</p>
                        <div id="adminDeletedList"></div>
                        <div id="adminDeletedEmpty" style="display:none;color:rgba(255,255,255,0.3);font-size:13px;padding:10px 0;">No deleted scenes.</div>
                        <div id="adminDeletedBulkBar" style="display:none;margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.07);gap:9px;flex-wrap:wrap;">
                            <button class="admin-btn admin-btn-warn" id="adminRestoreAllBtn">↺ Restore All</button>
                            <button class="admin-btn admin-btn-danger" id="adminPurgeAllBtn">💀 Permanently Delete All</button>
                        </div>
                    </div>
                </div>

                <!-- WORLD TREE PAGE -->
                <div class="admin-page" data-page="tree">
                    <p class="admin-section-title">World Navigation Tree</p>
                    <div id="adminTreeContainer"></div>
                </div>
                

                <!-- INFO PAGE -->
                <div class="admin-page" data-page="info">
                    <p class="admin-section-title">📊 Database Overview</p>
                    <div id="adminInfoStats" class="admin-info-stats"></div>
                    <p class="admin-section-title" style="margin-top:20px;">🗂 Content Breakdown</p>
                    <div id="adminInfoBreakdown" class="admin-info-breakdown"></div>
                    <p class="admin-section-title" style="margin-top:20px;">⚙ About This Panel</p>
                    <div class="admin-info-about">
                        <div class="admin-info-row"><span class="admin-info-key">Application</span><span class="admin-info-val">World History Documentary</span></div>
                        <div class="admin-info-row"><span class="admin-info-key">Admin Version</span><span class="admin-info-val">2.0</span></div>
                        <div class="admin-info-row"><span class="admin-info-key">Storage Key (Scenes)</span><span class="admin-info-val admin-info-mono">whd_admin_scenes</span></div>
                        <div class="admin-info-row"><span class="admin-info-key">Storage Key (Deleted)</span><span class="admin-info-val admin-info-mono">whd_admin_deleted</span></div>
                        <div class="admin-info-row"><span class="admin-info-key">Storage Key (Tree)</span><span class="admin-info-val admin-info-mono">whd_admin_tree</span></div>
                        <div class="admin-info-row"><span class="admin-info-key">Storage Key (Settings)</span><span class="admin-info-val admin-info-mono">whd_settings</span></div>
                        <div class="admin-info-row"><span class="admin-info-key">Databases Loaded</span><span class="admin-info-val" id="adminInfoDbList">—</span></div>
                        <div class="admin-info-row"><span class="admin-info-key">Local Storage Used</span><span class="admin-info-val" id="adminInfoLsSize">Calculating…</span></div>
                    </div>

                </div>

                <!-- BUGS PAGE -->
                <div class="admin-page" data-page="bugs">
                    <p class="admin-section-title">${ADMIN_BUG_ICON_SVG} Bug Reports</p>
                    <div id="adminBugsContainer"></div>
                </div>

                <div class="admin-page admin-page-terminal" data-page="owner">
                    <div id="adminTermOutput" class="admin-term-output"></div>
                    <div class="admin-term-inputwrap">
                        <div class="admin-term-inputrow">
                            <span class="admin-term-prompt">&gt;</span>
                            <div class="admin-term-input-wrap">
                                <input id="adminTermInput" type="text" class="admin-input admin-term-input" placeholder="Type a command…" autocomplete="off" spellcheck="false"/>
                                <div id="adminTermGhost" class="admin-term-ghost" aria-hidden="true"></div>
                            </div>
                            <button class="admin-btn admin-btn-primary" id="adminTermRunBtn">Run</button>
                        </div>
                        <div id="adminTermHint" class="admin-term-hint"></div>
                        <div id="adminTermSuggest" class="admin-term-suggest"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="adminToast"></div>

    <div id="adminConfirm">
        <div id="adminConfirmBox">
            <div id="adminConfirmIcon">🗑️</div>
            <div id="adminConfirmTitle">Are you sure?</div>
            <div id="adminConfirmMsg"></div>
            <div id="adminConfirmBtns">
                <button class="admin-btn admin-btn-danger" id="adminConfirmOk">Delete</button>
                <button class="admin-btn admin-btn-secondary" id="adminConfirmCancel">Cancel</button>
            </div>
        </div>
    </div>

    <div id="adminReplace">
        <div id="adminReplaceBox">
            <div id="adminReplaceTitle">Replace Scene</div>
            <div id="adminReplaceMsg"></div>
            <input id="adminReplaceFilter" type="text" placeholder="Search by name, country, season, or ID…"/>
            <div id="adminReplaceList"></div>
            <div id="adminReplaceBtns">
                <button class="admin-btn admin-btn-secondary" id="adminReplaceCancel">Cancel</button>
            </div>
        </div>
    </div>
    `;

    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);

    // Replace native number-input spin arrows with styled custom steppers
    enhanceNumberInputs(["aStartYear", "aEndYear", "aLat", "aLng", "aZoom"]);

    // Mouse drag-to-scroll + wheel support for the tab strip (overflow-x:auto
    // alone only responds to touch/trackpad/scrollbar, not a plain mouse drag).
    if (typeof wolfCode === "function") wolfCode(document.getElementById("adminTabs"));

    // ── State ─────────────────────────────────────────────────────
    let unlocked      = sessionStorage.getItem(SS_UNLOCKED) === "1";
    let activeTab     = "add";
    let editingId     = null;   // scene id currently being edited (null = add mode)
    let editingDbKey  = null;
    let confirmResolve = null;
    let treeOpenState = {};     // nodeName → bool (true = open)

    const DB_MAP = {
        europe:       { label: "Europe",       color: "db-europe",       getArr: () => europeScenes },
        asia:         { label: "Asia",          color: "db-asia",         getArr: () => asiaScenes },
        africa:       { label: "Africa",        color: "db-africa",       getArr: () => africaScenes },
        australia:    { label: "Australia",     color: "db-australia",    getArr: () => australiaScenes },
        historybites: { label: "History Bites", color: "db-historybites", getArr: () => historyBitesScenes },
    };

    // ── localStorage persistence ──────────────────────────────────
    function lsGet(key) {
        try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch { return null; }
    }
    function lsSet(key, val) {
        try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
    }

    let _syncTimer = null;
    function queueWorkerSync() {
        if (!WORKER_URL) return;
        clearTimeout(_syncTimer);
        _syncTimer = setTimeout(syncToWorker, 800);
    }
    async function syncToWorker() {
        if (!WORKER_URL) return;
        const passcode = sessionStorage.getItem(SS_PASSCODE);
        if (!passcode) return; // not verified — can't write
        const payload = {
            passcode,
            scenes: lsGet(LS_SCENES) || [],
            deleted: lsGet(LS_DELETED) || [],
            deletedStore: lsGet("whd_deleted_scene_store") || {},
            tree: lsGet(LS_TREE) || null,
        };
        try {
            const res = await fetch(WORKER_URL + "/data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok || !data.ok) {
                toast("Couldn't sync to shared storage: " + (data.error || res.status), true);
            }
        } catch (e) {
            toast("Couldn't reach shared storage (offline?)", true);
        }
    }

    function fetchSharedAdminData() {
        if (!WORKER_URL) return;
        fetch(WORKER_URL + "/data")
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (!data) return;
                const version = JSON.stringify(data);
                if (version === localStorage.getItem(LS_SYNC_VERSION)) return; // unchanged

                lsSet(LS_SCENES, data.scenes || []);
                lsSet(LS_DELETED, data.deleted || []);
                lsSet("whd_deleted_scene_store", data.deletedStore || {});
                if (data.tree) lsSet(LS_TREE, data.tree);
                localStorage.setItem(LS_SYNC_VERSION, version);

                if (localStorage.getItem("whd_admin_seen") === "1") {
                    showRefreshBanner();
                }
                localStorage.setItem("whd_admin_seen", "1");
            })
            .catch(() => { /* offline / Worker unreachable — silently keep local cache */ });
    }

    function showRefreshBanner() {
        if (document.getElementById("adminRefreshBanner")) return;
        const bar = document.createElement("div");
        bar.id = "adminRefreshBanner";
        bar.innerHTML = `Content has been updated. <button id="adminRefreshBtn">Refresh</button>`;
        bar.style.cssText = "position:fixed;bottom:16px;left:50%;transform:translateX(-50%);" +
            "background:#161618;border:1px solid var(--accent-dim);border-radius:10px;" +
            "padding:10px 16px;color:#fff;font-size:13px;z-index:9999;" +
            "box-shadow:0 8px 24px rgba(0,0,0,0.6);display:flex;align-items:center;gap:10px;";
        document.body.appendChild(bar);
        document.getElementById("adminRefreshBtn").onclick = () => location.reload();
        document.getElementById("adminRefreshBtn").style.cssText =
            "background:var(--accent);color:#fff;border:none;border-radius:6px;padding:5px 10px;cursor:pointer;font-weight:600;";
    }

    // Which db does a scene belong to based on the continent / data arrays?
    function dbKeyForScene(scene) {
        for (const [k, info] of Object.entries(DB_MAP)) {
            if (info.getArr().some(s => s.id === scene.id)) return k;
        }
        // fallback: guess from continent
        const c = (scene.continent || "").toLowerCase();
        if (c.includes("europe")) return "europe";
        if (c.includes("asia"))   return "asia";
        if (c.includes("africa")) return "africa";
        if (c.includes("australia")) return "australia";
        return "historybites";
    }

    function persistScenes() {
        // Save all scenes that were added or modified via admin (track by _adminAdded / _adminEdited flag)
        const saved = [];
        for (const [dbKey, info] of Object.entries(DB_MAP)) {
            info.getArr().forEach(s => {
                if (s._adminAdded || s._adminEdited) {
                    saved.push({ ...s, _dbKey: dbKey });
                }
            });
        }
        lsSet(LS_SCENES, saved);
        queueWorkerSync();
    }

    function persistDeleted() {
        const deleted = [];
        for (const info of Object.values(DB_MAP)) {
            // We track deletions by cross-referencing with a stored list
        }
        // Already stored separately; just re-save from state
        lsSet(LS_DELETED, Array.from(deletedIds));
        queueWorkerSync();
    }

    function persistTree() {
        lsSet(LS_TREE, world);
        queueWorkerSync();
    }

// Deleted IDs set (persisted)
const deletedIds = new Set(lsGet(LS_DELETED) || []);

// Backup store for deleted scene objects
const deletedSceneStore = lsGet("whd_deleted_scene_store") || {};

    function applyPersistedData() {
        // 1. Remove deleted scenes from all live arrays so the main app never sees them.
        //    They stay in localStorage (LS_DELETED) so they can be restored later.
deletedIds.forEach(sceneId => {

    for (const [dbKey, info] of Object.entries(DB_MAP)) {

        const arr = info.getArr();
        const idx = arr.findIndex(s => s.id === sceneId);

        if (idx !== -1) {

            // Save full scene before removal
            deletedSceneStore[sceneId] = {
                ...arr[idx],
                _dbKey: dbKey
            };

            arr.splice(idx, 1);
        }
    }

    const si = scenes.findIndex(s => s.id === sceneId);

    if (si !== -1) {
        scenes.splice(si, 1);
    }
});

lsSet("whd_deleted_scene_store", deletedSceneStore);

        // 2. Apply saved (added/edited) scenes
        const saved = lsGet(LS_SCENES) || [];
        saved.forEach(s => {
            const dbKey = s._dbKey || dbKeyForScene(s);
            const arr   = DB_MAP[dbKey] ? DB_MAP[dbKey].getArr() : null;
            if (!arr) return;
            const existing = arr.findIndex(e => e.id === s.id);
            if (existing !== -1) {
                // Update in place
                arr[existing] = { ...s };
                const si = scenes.findIndex(e => e.id === s.id);
                if (si !== -1) scenes[si] = { ...s };
            } else {
                arr.push({ ...s });
                if (!scenes.find(e => e.id === s.id)) scenes.push({ ...s });
            }
        });

        // 3. Apply saved tree
        const savedTree = lsGet(LS_TREE);
        if (savedTree && savedTree.children) {
            world.children = savedTree.children;
        }

        // 4. Load tree open state
        treeOpenState = lsGet(LS_TREE_OPEN) || {};
    }

    // Run on load
    applyPersistedData();
    fetchSharedAdminData();

    // ── Helpers ───────────────────────────────────────────────────
    function toast(msg, isErr = false) {
        const t = document.getElementById("adminToast");
        t.textContent = msg;
        t.style.borderColor = isErr ? "rgba(200,50,50,0.6)" : "rgba(80,200,120,0.5)";
        t.classList.add("show");
        clearTimeout(t._tid);
        t._tid = setTimeout(() => t.classList.remove("show"), 3000);
    }

    function showConfirm({ icon = "🗑️", title = "Are you sure?", msg = "", okLabel = "Delete", okClass = "admin-btn-danger" }) {
        return new Promise(res => {
            confirmResolve = res;
            document.getElementById("adminConfirmIcon").textContent = icon;
            document.getElementById("adminConfirmTitle").textContent = title;
            document.getElementById("adminConfirmMsg").textContent = msg;
            const okBtn = document.getElementById("adminConfirmOk");
            okBtn.textContent = okLabel;
            okBtn.className = "admin-btn " + okClass;
            document.getElementById("adminConfirm").style.display = "flex";
        });
    }

    document.getElementById("adminConfirmOk").onclick = () => {
        document.getElementById("adminConfirm").style.display = "none";
        if (confirmResolve) { confirmResolve(true); confirmResolve = null; }
    };
    document.getElementById("adminConfirmCancel").onclick = () => {
        document.getElementById("adminConfirm").style.display = "none";
        if (confirmResolve) { confirmResolve(false); confirmResolve = null; }
    };
    // Failsafe: clicking the dark backdrop, or pressing Escape, always
    // cancels. Without this, a command awaiting confirmation (e.g. "purge
    // all") would hang the terminal forever if the dialog were ever
    // unreachable/unclickable for any reason — there'd be no way to abort
    // the in-flight command short of reloading the page.
    document.getElementById("adminConfirm").addEventListener("click", e => {
        if (e.target.id === "adminConfirm") {
            document.getElementById("adminConfirm").style.display = "none";
            if (confirmResolve) { confirmResolve(false); confirmResolve = null; }
        }
    });
    document.addEventListener("keydown", e => {
        if (e.key !== "Escape") return;
        const confirmEl = document.getElementById("adminConfirm");
        if (confirmEl && confirmEl.style.display !== "none") {
            confirmEl.style.display = "none";
            if (confirmResolve) { confirmResolve(false); confirmResolve = null; }
        }
    });
// ── Add/Edit / Manage subtabs ───────────────────
document.querySelectorAll(".admin-add-subtab").forEach(btn => {
    btn.addEventListener("click", () => {

        // ADD / EDIT SUBTABS
        if (btn.dataset.subtab) {

            document.querySelectorAll('[data-subtab]')
                .forEach(b => b.classList.remove("active"));

            document.querySelectorAll('[data-subpage]')
                .forEach(p => p.classList.remove("active"));

            btn.classList.add("active");

            const page = document.querySelector(
                `.admin-add-subpage[data-subpage="${btn.dataset.subtab}"]`
            );

            if (page) page.classList.add("active");
        }

        // MANAGE SUBTABS
        if (btn.dataset.msubtab) {

            document.querySelectorAll('[data-msubtab]')
                .forEach(b => b.classList.remove("active"));

            document.querySelectorAll('[data-msubpage]')
                .forEach(p => p.classList.remove("active"));

            btn.classList.add("active");

            const page = document.querySelector(
                `.admin-add-subpage[data-msubpage="${btn.dataset.msubtab}"]`
            );

            if (page) page.classList.add("active");

            if (btn.dataset.msubtab === "deleted") {
                refreshDeletedList();
            } else {
                refreshManageList();
            }
        }
    });
});

    const adminRestoreAllBtn = document.getElementById("adminRestoreAllBtn");
    if (adminRestoreAllBtn) adminRestoreAllBtn.addEventListener("click", adminRestoreDeleted);
    const adminPurgeAllBtn = document.getElementById("adminPurgeAllBtn");
    if (adminPurgeAllBtn) adminPurgeAllBtn.addEventListener("click", adminPurgeAllDeleted);

    function escHtml(s) {
        return (s || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    }

    function openPanel() {
        // ── Auth gate: must be signed in before admin is accessible ───────
        if (typeof window.WHDAuth !== "undefined" && !window.WHDAuth.isLoggedIn()) {
            window.WHDAuth.requireLogin(() => openPanel());
            return;
        }

        // Owners get the standalone Owner Terminal in place of the full
        // tabbed Admin Panel — it replaces it for this role entirely,
        // it isn't an extra option alongside it. (If the role is still
        // stale/uncached at this point, _applyPanelRole() below catches
        // it once WHDAuth resolves and redirects there too.)
        const cachedRole = window.WHDAuth ? window.WHDAuth.getRole() : null;
        const cachedUsername = window.WHDAuth && typeof window.WHDAuth.getUsername === "function" ? window.WHDAuth.getUsername() : "";
        const looksLikeOwner = cachedRole === "owner" || (cachedUsername || "").toLowerCase() === "anay" ||
            (window.WHDAuth && typeof window.WHDAuth.isOwner === "function" && window.WHDAuth.isOwner());
        if (looksLikeOwner && window.WHDOwnerPanel) {
            window.WHDOwnerPanel.open();
            return;
        }

        document.getElementById("adminOverlay").style.display = "block";
        document.getElementById("adminPanel").classList.add("visible");
        setTimeout(() => document.getElementById("adminOverlay").classList.add("active"), 10);
        _termOutputId = "adminTermOutput"; // in case the owner panel redirected it

        // If role might be stale (server fix not yet applied to cached role),
        // fire a role refresh then apply panel state shortly after
        const role = window.WHDAuth ? window.WHDAuth.getRole() : null;
        if (window.WHDAuth && window.WHDAuth.isLoggedIn() && role !== "owner" && role !== "admin") {
            // Pull fresh role from server, then re-check
            if (typeof window.WHDAuth.pullAndApply === "function") {
                window.WHDAuth.pullAndApply().then(() => _applyPanelRole());
            } else {
                setTimeout(() => _applyPanelRole(), 700);
            }
        } else {
            _applyPanelRole();
        }
    }

    function _applyPanelRole() {
        // Check role from WHDAuth — admin/owner skip the passcode entirely
        const role = window.WHDAuth ? window.WHDAuth.getRole() : null;
        const username = window.WHDAuth && typeof window.WHDAuth.getUsername === "function" ? window.WHDAuth.getUsername() : "";
        const isOwner = role === "owner" || (username || "").toLowerCase() === "anay" || (window.WHDAuth && typeof window.WHDAuth.isOwner === "function" && window.WHDAuth.isOwner());
        const isAdminOrAbove = role === "admin" || role === "owner";

        // Owners: the Admin Panel that's already open (opened before the
        // role had resolved) gets replaced by the standalone Owner Terminal,
        // not supplemented by an embedded tab inside it.
        if (isOwner && window.WHDOwnerPanel) {
            closePanel();
            window.WHDOwnerPanel.open();
            return;
        }

        // Show Owner tab only for owner (legacy embedded terminal, kept as
        // a fallback only if owner-panel.js failed to load)
        const ownerTab = document.getElementById("adminOwnerTab");
        if (ownerTab) ownerTab.style.display = isOwner ? "" : "none";

        if (isOwner) {
            // Fallback (owner-panel.js missing): switch directly to the terminal tab
            document.querySelectorAll(".admin-tab").forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".admin-page").forEach(p => p.classList.remove("active"));
            ownerTab.classList.add("active");
            const termPage = document.querySelector('.admin-page[data-page="owner"]');
            if (termPage) termPage.classList.add("active");
            activeTab = "owner";
        }

        if (isAdminOrAbove && !unlocked) {
            // Admin/owner: bypass passcode, unlock immediately
            unlockAdminUI();
        } else if (unlocked) {
            // Already unlocked this session
            document.getElementById("adminPassRow").style.display = "none";
            document.getElementById("adminBody").classList.add("unlocked");
            refreshManageList();
            refreshTree();
            initEventRows();
            if (isOwner) setTimeout(() => printTermBootMessage(), 80);
        } else if (WORKER_URL === "") {
            // No backend — local mode, no passcode
            unlocked = true;
            document.getElementById("adminPassRow").style.display = "none";
            document.getElementById("adminBody").classList.add("unlocked");
            refreshManageList();
            refreshTree();
            initEventRows();
        } else {
            // Regular user — show passcode prompt
            setTimeout(() => document.getElementById("adminPassInput").focus(), 60);
        }
    }
    function closePanel() {
        document.getElementById("adminOverlay").classList.remove("active");
        setTimeout(() => {
            document.getElementById("adminOverlay").style.display = "none";
            document.getElementById("adminPanel").classList.remove("visible");
        }, 250);
    }

    // ── Keyboard / close ──────────────────────────────────────────
    // Capture phase (true) fires before Leaflet's stopPropagation can block us.
    document.addEventListener("keydown", e => {
        const tag = (e.target.tagName || "").toLowerCase();
        if ((e.key === "o" || e.key === "O" || e.code === "KeyO") && !["input","textarea","select"].includes(tag)) {
            e.preventDefault();
            openPanel();
        }
        if (e.key === "Escape") {
            if (document.getElementById("adminConfirm").style.display === "flex") {
                document.getElementById("adminConfirm").style.display = "none";
                if (confirmResolve) { confirmResolve(false); confirmResolve = null; }
            } else {
                closePanel();
            }
        }
    }, true);
    document.getElementById("adminOverlay").addEventListener("click", closePanel);
    document.getElementById("adminCloseBtn").addEventListener("click", closePanel);

    // ── Passcode ──────────────────────────────────────────────────
    document.getElementById("adminPassInput").addEventListener("keydown", e => { if (e.key === "Enter") checkPass(); });
    document.getElementById("adminPassInput").addEventListener("input", () => { document.getElementById("adminPassError").textContent = ""; });

    function unlockAdminUI() {
        unlocked = true;
        sessionStorage.setItem(SS_UNLOCKED, "1");
        document.getElementById("adminPassRow").style.display = "none";
        document.getElementById("adminBody").classList.add("unlocked");
        refreshManageList();
        refreshTree();
        initEventRows();
        _refreshAdminBugsBadge();
        // Print the boot message the first time the terminal output exists.
        // Deferred so the DOM is fully painted before we write to it.
        setTimeout(() => printTermBootMessage(), 80);
    }

    // Prints the terminal's startup banner exactly once per page session
    // (guarded by adminTermOutput.dataset.inited). Both the admin-panel
    // unlock flow and the tab-click handler call this same function so
    // there's only ever one source of truth for the message — previously
    // they raced (whichever ran first set the "inited" flag and printed a
    // shorter, less accurate message, which could suppress this one).
    function printTermBootMessage() {
        const termOut = document.getElementById("adminTermOutput");
        if (!termOut || termOut.dataset.inited) return;
        termOut.dataset.inited = "1";
        const role = window.WHDAuth?.getRole?.() ?? "owner";
        const user = window.WHDAuth?.getUsername?.() ?? "";
        const sceneCount = termAllActiveScenes().length;
        const cmdCount = typeof TERM_COMMANDS !== "undefined" ? TERM_COMMANDS.length : 0;
        const dbList = Object.values(DB_MAP).map(d => d.label).join(", ");
        termPrint(`WHD Owner Terminal  ·  ${user ? user + " · " : ""}${role}`, "term-ok");
        termPrint(`${sceneCount} active scenes across ${Object.keys(DB_MAP).length} databases: ${dbList}`, "term-info");
        termPrint(`${cmdCount} commands loaded. Type 'help' for a list, Tab to autocomplete, ↑/↓ for history.`, "term-info");
        termPrint("", "term-info");
    }

    async function checkPass() {
        const input = document.getElementById("adminPassInput");
        const value = input.value;
        const errEl = document.getElementById("adminPassError");

        if (WORKER_URL === "") {
            // No shared backend — any input "works" (passcode protection is
            // effectively disabled until WORKER_URL is configured).
            sessionStorage.setItem(SS_PASSCODE, value);
            unlockAdminUI();
            return;
        }

        errEl.textContent = "Checking…";
        try {
            const res = await fetch(WORKER_URL + "/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ passcode: value }),
            });
            const data = await res.json().catch(() => ({}));
            if (data.ok) {
                sessionStorage.setItem(SS_PASSCODE, value);
                errEl.textContent = "";
                unlockAdminUI();
            } else {
                errEl.textContent = "Incorrect passcode.";
                input.value = "";
                input.focus();
            }
        } catch (e) {
            errEl.textContent = "Couldn't reach server — check connection.";
        }
    }

    // ── Tabs ──────────────────────────────────────────────────────
    document.querySelectorAll(".admin-tab").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".admin-tab").forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".admin-page").forEach(p => p.classList.remove("active"));
            tab.classList.add("active");
            const page = document.querySelector(`.admin-page[data-page="${tab.dataset.tab}"]`);
            if (page) page.classList.add("active");
            activeTab = tab.dataset.tab;
            if (activeTab === "owner") {
                printTermBootMessage();
                setTimeout(() => document.getElementById("adminTermInput")?.focus(), 60);
            }
            if (activeTab === "bugs")  { if (typeof renderBugsTab === "function") renderBugsTab(); }
        });
    });

    // (owner sub-tabs removed — panel is now the terminal itself)

    // ── Owner tab (owner only) ─────────────────────────────────────
    let _adminAllUsers = [];

    function adminUsersRefresh() {
        const list = document.getElementById("adminUsersList");
        if (!list) return;
        list.innerHTML = "<div class='admin-users-loading'>Loading…</div>";
        const token = window.WHDAuth ? window.WHDAuth.getToken() : null;
        if (!token) { list.innerHTML = "<div class='admin-users-loading'>Not authenticated.</div>"; return; }
        fetch(WORKER_URL + "/auth/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
        })
        .then(r => r.json()).catch(() => ({ ok: false }))
        .then(data => {
            if (!data.ok) {
                list.innerHTML = "<div class='admin-users-loading'>Failed to load users.</div>";
                return;
            }
            _adminAllUsers = data.users || [];
            adminUsersRender(_adminAllUsers);
        });
    }

    function adminUsersFilter() {
        const q = (document.getElementById("adminUserSearch")?.value || "").toLowerCase();
        const filtered = q ? _adminAllUsers.filter(u => u.username.toLowerCase().includes(q)) : _adminAllUsers;
        adminUsersRender(filtered);
    }

    function adminUsersRender(users) {
        const list = document.getElementById("adminUsersList");
        if (!list) return;
        if (!users.length) { list.innerHTML = "<div class='admin-users-loading'>No users found.</div>"; return; }
        const myUsername = window.WHDAuth ? window.WHDAuth.getUsername() : "";
        list.innerHTML = users.map(u => {
            const isMe   = u.username.toLowerCase() === (myUsername || "").toLowerCase();
            const isOwnerRow = u.role === "owner";
            const roleBadge = `<span class="admin-role-badge admin-role-${u.role}">${u.role}</span>`;
            const joined = u.joinedAt ? new Date(u.joinedAt).toLocaleDateString() : "—";

            let actions = "";
            if (!isMe && !isOwnerRow) {
                if (u.role === "admin") {
                    actions = `<button class="admin-btn admin-btn-secondary admin-btn-sm" onclick="adminUsersSetRole('${escHtml(u.username)}','user')">Demote</button>`;
                } else {
                    actions = `<button class="admin-btn admin-btn-primary admin-btn-sm" onclick="adminUsersSetRole('${escHtml(u.username)}','admin')">Make Admin</button>`;
                }
            }
            return `
<div class="admin-user-row${isOwnerRow ? " is-elevated-owner" : (u.role === "admin" ? " is-elevated-admin" : "")}">
  <div class="admin-user-avatar">${u.username.charAt(0).toUpperCase()}</div>
  <div class="admin-user-info">
    <div class="admin-user-name">${escHtml(u.username)}${isMe ? " <span class='admin-user-you'>(you)</span>" : ""}</div>
    <div class="admin-user-meta">Joined ${joined}</div>
  </div>
  <div class="admin-user-role">${roleBadge}</div>
  <div class="admin-user-actions">${actions}</div>
</div>`;
        }).join("");
    }

    window.adminUsersRefresh = adminUsersRefresh;
    window.adminUsersFilter  = adminUsersFilter;

    window.adminUsersSetRole = async function(username, newRole) {
        const token = window.WHDAuth ? window.WHDAuth.getToken() : null;
        if (!token) return { ok: false, error: "Not authenticated." };
        const res = await fetch(WORKER_URL + "/auth/promote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, targetUsername: username, newRole }),
        }).then(r => r.json()).catch(() => ({ ok: false, error: "Network error." }));
        if (res.ok) {
            toast(`${username} is now ${newRole}.`);
            adminUsersRefresh();
        } else {
            toast(res.error || "Failed to change role.", true);
        }
        return res;
    };

    // ── Users: role setter (called by terminal user ban/role/unban) ──────────

    // ── Update Log: owner/admin edit controls ─────────────────────────────────
    // Lives inside the REAL Updates tab (data-spage="updates" in index.html,
    // IDs settingsULAdminBar/settingsULEditor/ulAdmin*). No DOM is created at
    // runtime and no selectors are guessed - everything here already exists in
    // the page. State (_ulUserEntries, _ulUserActiveId, loadUpdateLog) is the
    // same global state playlists-ui.js uses for the public read-only view, so
    // there's one source of truth and a save/delete here is reflected
    // immediately in what every user sees.

    function _ulSetupAdminControls() {
        const bar    = document.getElementById("settingsULAdminBar");
        const editor = document.getElementById("settingsULEditor");
        if (!bar || !editor) return; // markup not present on this page

        const role = window.WHDAuth?.getRole?.();
        // The worker's handleUpdateLog gates save/delete to isOwner() only
        // (not isAdminOrAbove) — keep this in sync with that, or admins will
        // see buttons that 403.
        const isAdmin = role === "owner" || role === "admin";
        bar.style.display = isAdmin ? "" : "none";
        if (!isAdmin) { editor.style.display = "none"; return; }

        document.getElementById("ulAdminNewBtn").onclick    = _ulAdminNewEntry;
        document.getElementById("ulAdminEditBtn").onclick   = _ulAdminEditSelected;
        document.getElementById("ulAdminDeleteBtn").onclick = _ulAdminDeleteSelected;
        document.getElementById("ulAdminSaveBtn").onclick   = _ulAdminSaveEntry;
        document.getElementById("ulAdminCancelBtn").onclick = () => { editor.style.display = "none"; };
    }

    function _ulAdminEditSelected() {
        const entries = (typeof _ulUserEntries !== "undefined" && _ulUserEntries) || [];
        const entry = entries.find(e => e.id === _ulUserActiveId);
        const editor = document.getElementById("settingsULEditor");
        const result = document.getElementById("ulAdminResult");
        if (!entry) { if (result) result.textContent = "Select an entry tab first."; return; }
        document.getElementById("ulAdminVersion").value = entry.version || "";
        document.getElementById("ulAdminTitle").value   = entry.title   || "";
        document.getElementById("ulAdminDate").value    = entry.date    || "";
        document.getElementById("ulAdminChanges").value = (entry.changes || []).join("\n");
        if (result) result.textContent = "";
        editor.dataset.editingId = entry.id;
        editor.style.display = "";
    }

    function _ulAdminNewEntry() {
        const editor = document.getElementById("settingsULEditor");
        const now = new Date();
        const month = now.toLocaleString("default", { month: "long" });
        document.getElementById("ulAdminVersion").value = "";
        document.getElementById("ulAdminTitle").value   = "New Update";
        document.getElementById("ulAdminDate").value    = month + " " + now.getDate() + ", " + now.getFullYear();
        document.getElementById("ulAdminChanges").value = "";
        document.getElementById("ulAdminResult").textContent = "";
        delete editor.dataset.editingId; // no id yet -> server assigns one on save
        editor.style.display = "";
    }

    function _ulAdminSaveEntry() {
        const editor  = document.getElementById("settingsULEditor");
        const id      = editor.dataset.editingId || null;
        const token   = window.WHDAuth ? window.WHDAuth.getToken() : null;
        const version = document.getElementById("ulAdminVersion").value.trim();
        const title   = document.getElementById("ulAdminTitle").value.trim();
        const date    = document.getElementById("ulAdminDate").value.trim();
        const changes = document.getElementById("ulAdminChanges").value
            .split("\n").map(l => l.trim()).filter(Boolean);
        const result  = document.getElementById("ulAdminResult");
        if (!version) { if (result) result.textContent = "Version tag is required."; return; }

        fetch(WORKER_URL + "/auth/updatelog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "save", token, id, version, title, date, changes }),
        }).then(r => r.json()).catch(() => ({ ok: false }))
        .then(data => {
            if (data.ok && data.entry) {
                _ulUserEntries = null;           // invalidate the shared cache
                _ulUserActiveId = data.entry.id; // select what we just saved
                if (typeof loadUpdateLog === "function") loadUpdateLog();
                editor.style.display = "none";
                toast(id ? "Entry saved" : "New entry created");
            } else if (result) {
                result.textContent = data.error || "Save failed.";
            }
        });
    }

    function _ulAdminDeleteSelected() {
        const entries = (typeof _ulUserEntries !== "undefined" && _ulUserEntries) || [];
        const id = _ulUserActiveId;
        const entry = entries.find(e => e.id === id);
        if (!entry) { toast("Select an entry tab first.", true); return; }

        const run = () => {
            const token = window.WHDAuth ? window.WHDAuth.getToken() : null;
            fetch(WORKER_URL + "/auth/updatelog", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "delete", token, id }),
            }).then(r => r.json()).catch(() => ({ ok: false }))
            .then(data => {
                if (data.ok) {
                    _ulUserEntries = null;
                    _ulUserActiveId = null;
                    if (typeof loadUpdateLog === "function") loadUpdateLog();
                    document.getElementById("settingsULEditor").style.display = "none";
                    toast("Entry deleted");
                } else {
                    toast(data.error || "Delete failed.", true);
                }
            });
        };
        if (typeof showAppConfirm === "function") {
            showAppConfirm({
                icon: "⚠️",
                title: "Delete this update entry?",
                msg: "This cannot be undone.",
                okLabel: "Delete",
                okDanger: true,
            }).then(ok => { if (ok) run(); });
        } else {
            showConfirm({ icon: "⚠️", title: "Delete this update entry?", msg: "This cannot be undone.", okLabel: "Delete", okClass: "admin-btn-danger" })
                .then(ok => { if (ok) run(); });
        }
    }

    // Re-check role/visibility every time the real Updates tab is opened, and
    // once on load in case the tab is already active when admin.js parses.
    document.addEventListener("click", e => {
        if (e.target.closest('.settings-tab[data-stab="updates"]')) {
            setTimeout(_ulSetupAdminControls, 0);
        }
    });
    setTimeout(_ulSetupAdminControls, 0);

    function switchToTab(tab) {
        document.querySelector(`.admin-tab[data-tab="${tab}"]`).click();
    }

    // ── ADD / EDIT TAB ────────────────────────────────────────────
    function initEventRows() {
        const c = document.getElementById("adminEventsContainer");
        if (c.children.length === 0) addEventRow();
    }

    function addEventRow(val = "") {
        const c = document.getElementById("adminEventsContainer");
        if (c.children.length >= 6) { toast("Max 6 events per scene", true); return; }
        const row = document.createElement("div");
        row.className = "admin-event-row";
        row.innerHTML = `<input type="text" placeholder="Event description…" value="${val.replace(/"/g,'&quot;')}"/>
                         <button class="admin-event-del" title="Remove">✕</button>`;
        row.querySelector("button").onclick = () => row.remove();
        c.appendChild(row);
    }

    // Auto-generate ID from name
    document.getElementById("adminAutoIdBtn").addEventListener("click", () => {
        const name = document.getElementById("aName").value.trim();
        if (!name) { toast("Enter a name first", true); return; }
        const slug = name.toLowerCase()
            .replace(/[^a-z0-9\s]/g, "")
            .trim()
            .replace(/\s+/g, "_")
            .slice(0, 40);
        document.getElementById("aId").value = slug;
        // Also auto-fill imgKey if blank
        if (!document.getElementById("aImgKey").value) {
            document.getElementById("aImgKey").value = slug;
        }
        toast("ID generated: " + slug);
    });

    // Auto-fill imgKey when ID is typed if imgKey is empty
    document.getElementById("aId").addEventListener("input", function() {
        const imgKey = document.getElementById("aImgKey");
        if (!imgKey.value || imgKey.dataset.userEdited !== "1") {
            imgKey.value = this.value;
        }
    });
    document.getElementById("aImgKey").addEventListener("input", function() {
        this.dataset.userEdited = this.value ? "1" : "";
    });

    // Update char count when form is populated (e.g. on edit load)
    function updateInfoCharCount() {
        const info = document.getElementById("aInfo");
        const lbl  = document.getElementById("adminInfoCharCount");
        if (info && lbl) lbl.textContent = info.value.length + " chars";
    }
    document.getElementById("adminClearBtn").addEventListener("click", () => resetAddForm());
    document.getElementById("adminCancelEditBtn").addEventListener("click", () => resetAddForm());
    document.getElementById("addEventBtn").addEventListener("click", () => addEventRow());

    function resetAddForm(keepMode = false) {
        editingId    = null;
        editingDbKey = null;
        ["aId","aName","aImgKey","aStartYear","aEndYear","aContinent","aCountry","aSeason","aRegion","aLat","aLng","aInfo"].forEach(id => {
            document.getElementById(id).value = "";
        });
        document.getElementById("aZoom").value = "5";
        document.getElementById("adminEventsContainer").innerHTML = "";
        addEventRow();
        document.getElementById("adminAddOutput").innerHTML = "";
        document.getElementById("adminSaveBtn").textContent = "💾 Save Entry";
        document.getElementById("adminCancelEditBtn").style.display = "none";
        document.getElementById("addPageTitle").textContent = "New Scene Entry";
        const badge = document.getElementById("adminFormMode");
        badge.style.display = "none";
        document.getElementById("aId").readOnly = false;
        document.getElementById("aDb").disabled  = false;
    }

    function loadSceneIntoForm(scene, dbKey) {
        editingId    = scene.id;
        editingDbKey = dbKey;
        switchToTab("add");
        document.querySelectorAll(".admin-add-subtab[data-subtab]").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".admin-add-subpage[data-subpage]").forEach(p => p.classList.remove("active"));
        document.querySelector('.admin-add-subtab[data-subtab="manual"]').classList.add("active");
        document.querySelector('.admin-add-subpage[data-subpage="manual"]').classList.add("active");
        // Populate fields
        document.getElementById("aDb").value        = dbKey;
        document.getElementById("aId").value        = scene.id;
        document.getElementById("aName").value      = scene.name || "";
        document.getElementById("aImgKey").value    = scene.imgKey || "";
        document.getElementById("aStartYear").value = scene.startYear ?? "";
        document.getElementById("aEndYear").value   = scene.endYear ?? "";
        document.getElementById("aContinent").value = scene.continent || "";
        document.getElementById("aCountry").value   = scene.country || "";
        document.getElementById("aSeason").value    = scene.season || "";
        document.getElementById("aRegion").value    = scene.region || "";
        document.getElementById("aLat").value       = scene.coords ? scene.coords[0] : "";
        document.getElementById("aLng").value       = scene.coords ? scene.coords[1] : "";
        document.getElementById("aZoom").value      = scene.zoom ?? 5;
        document.getElementById("aInfo").value      = scene.info || "";
        // Events
        document.getElementById("adminEventsContainer").innerHTML = "";
        (scene.events || []).forEach(ev => addEventRow(ev));
        if ((scene.events || []).length === 0) addEventRow();
        // UI state
        document.getElementById("adminSaveBtn").textContent = "💾 Update Entry";
        document.getElementById("adminCancelEditBtn").style.display = "inline-flex";
        document.getElementById("addPageTitle").textContent = `Editing: ${scene.name}`;
        const badge = document.getElementById("adminFormMode");
        badge.textContent = "EDIT";
        badge.className = "mode-edit";
        badge.style.display = "inline-block";
        document.getElementById("aId").readOnly = true;
        document.getElementById("aDb").disabled  = true;
        // Scroll form to top
        document.querySelector(".admin-page.active").scrollTop = 0;
    }

    document.getElementById("adminSaveBtn").addEventListener("click", saveEntry);

    function saveEntry() {
        const g = id => document.getElementById(id).value.trim();
        const db  = g("aDb");
        const id  = g("aId");
        const name = g("aName");
        const lat  = parseFloat(g("aLat"));
        const lng  = parseFloat(g("aLng"));

        // Clear previous validation highlights
        ["aId","aName","aLat","aLng"].forEach(fid => {
            document.getElementById(fid).style.borderColor = "";
        });

        let hasError = false;
        if (!id) {
            document.getElementById("aId").style.borderColor = "var(--accent)";
            toast("ID is required", true); hasError = true;
        }
        if (!name) {
            document.getElementById("aName").style.borderColor = "var(--accent)";
            if (!hasError) toast("Name is required", true); hasError = true;
        }
        if (isNaN(lat) || isNaN(lng)) {
            document.getElementById("aLat").style.borderColor = "var(--accent)";
            document.getElementById("aLng").style.borderColor = "var(--accent)";
            if (!hasError) toast("Valid coordinates required", true); hasError = true;
        }
        if (hasError) return;

        const eventInputs = document.querySelectorAll("#adminEventsContainer .admin-event-row input");
        const events = Array.from(eventInputs).map(i => i.value.trim()).filter(Boolean);

        const entry = {
            id, name,
            startYear: parseInt(g("aStartYear")) || 0,
            endYear:   parseInt(g("aEndYear"))   || 0,
            imgKey:    g("aImgKey") || id,
            continent: g("aContinent"),
            country:   g("aCountry"),
            season:    g("aSeason"),
            coords:    [lat, lng],
            zoom:      parseInt(g("aZoom")) || 5,
            region:    g("aRegion"),
            info:      document.getElementById("aInfo").value.trim(),
            events,
        };

        const arr = DB_MAP[db].getArr();

        if (editingId) {
            // ── EDIT MODE ──
            entry._adminEdited = true;
            const idx = arr.findIndex(s => s.id === editingId);
            if (idx !== -1) arr[idx] = entry;
            const si = scenes.findIndex(s => s.id === editingId);
            if (si !== -1) scenes[si] = entry;
            toast(`✔ Updated "${name}" in ${DB_MAP[db].label}`);
            persistScenes();
            resetAddForm();
            if (activeTab === "manage") refreshManageList();
        } else {
            // ── ADD MODE ──
            if (arr.find(s => s.id === id)) { toast(`ID "${id}" already exists`, true); return; }
            entry._adminAdded = true;
            arr.push(entry);
            scenes.push(entry);
            toast(`✔ Added "${name}" to ${DB_MAP[db].label}`);
            persistScenes();

            // Show generated JS
            const jsOut = generateEntryJS(entry, db);
            document.getElementById("adminAddOutput").innerHTML =
                `<p class="admin-section-title" style="margin-top:8px;">Generated JS (paste into data/${db}.js)</p>
                 <pre style="background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;font-size:11px;overflow-x:auto;white-space:pre-wrap;line-height:1.6;color:#aef;max-height:220px;overflow-y:auto;">${escHtml(jsOut)}</pre>
                 <div class="admin-btn-row"><button class="admin-btn admin-btn-secondary" id="adminCopyJS">📋 Copy JS</button></div>`;
            document.getElementById("adminCopyJS").onclick = () => {
                navigator.clipboard.writeText(jsOut).then(() => toast("Copied to clipboard!"));
            };
        }
    }

    // ── Code Import ──────────────────────────────────
    document.getElementById("adminImportClear")
        .addEventListener("click", () => {
            document.getElementById("adminCodeImport").value = "";
            document.getElementById("adminImportOutput").innerHTML = "";
            document.getElementById("importDb").value = "";
            document.getElementById("importContinent").value = "";
            document.getElementById("importCountry").value = "";
            document.getElementById("importSeason").value = "";
            const badge = document.getElementById("adminImportValidation");
            if (badge) { badge.textContent = ""; badge.style.cssText = ""; }
        });

    document.getElementById("adminCopyTemplate")
        .addEventListener("click", () => {
            const tpl = `{
    id: "my_scene_id",
    name: "My Scene Name",
    startYear: -500,
    endYear: -27,
    imgKey: "my_scene_id",
    continent: "Europe",
    country: "Italy",
    season: "Ancient Italy",
    coords: [41.9, 12.5],
    zoom: 5,
    region: "Rome",
    info: \`Descriptive paragraph about this scene.\`,
    events: [
        "First key event",
        "Second key event",
        "Third key event"
    ]
}`;
            navigator.clipboard.writeText(tpl).then(() => toast("Template copied to clipboard!"));
            document.getElementById("adminCodeImport").value = tpl;
        });

    document.getElementById("adminImportBtn")
        .addEventListener("click", importSceneCode);

    // Live validation badge for import textarea
    document.getElementById("adminCodeImport").addEventListener("input", function() {
        const badge = document.getElementById("adminImportValidation");
        const raw = this.value.trim();
        if (!raw) { badge.textContent = ""; badge.style.cssText = ""; return; }
        try {
            const parsed = new Function("return (" + raw + ")")();
            if (Array.isArray(parsed)) {
                badge.textContent = "✔ " + parsed.length + " scene" + (parsed.length !== 1 ? "s" : "") + " detected";
                badge.style.cssText = "background:rgba(30,180,80,0.2);color:#7dff9e;border:1px solid rgba(30,180,80,0.3);font-weight:700;font-size:10px;padding:2px 7px;border-radius:99px;";
            } else if (parsed && typeof parsed === "object") {
                badge.textContent = "✔ Single scene · " + (parsed.name || parsed.id || "unnamed");
                badge.style.cssText = "background:rgba(122,186,255,0.15);color:#7abaff;border:1px solid rgba(122,186,255,0.3);font-weight:700;font-size:10px;padding:2px 7px;border-radius:99px;";
            } else {
                throw new Error("Not an object or array");
            }
        } catch(e) {
            badge.textContent = "✗ Syntax error";
            badge.style.cssText = "background:rgba(192,22,31,0.15);color:var(--accent);border:1px solid var(--accent-glow);font-weight:700;font-size:10px;padding:2px 7px;border-radius:99px;";
        }
    });

    // Robust auto-detect: continent/country/season → db key
    function autoDetectDb(scene) {
        const cont    = (scene.continent || "").toLowerCase();
        const country = (scene.country   || "").toLowerCase();
        const season  = (scene.season    || "").toLowerCase();
        const name    = (scene.name      || "").toLowerCase();

        if (cont === "europe" ||
            ["united kingdom","france","germany","italy","spain","russia","austria",
             "poland","greece","netherlands","portugal","sweden","norway","denmark",
             "switzerland","belgium","czech","hungary","romania","ukraine"].some(c => country.includes(c)))
            return "europe";

        if (cont === "asia" ||
            ["china","japan","india","iran","korea","mongol","ottoman","persia",
             "vietnam","cambodia","thailand","indonesia","philippine","afghanistan",
             "mesopotamia","babylon","assyria","sumeria"].some(c =>
                country.includes(c) || name.includes(c) || season.includes(c)))
            return "asia";

        if (cont === "africa" ||
            ["egypt","mali","ethiopia","ghana","zulu","carthage","nubia","congo",
             "nigeria","sudan","morocco","kenya","somalia"].some(c =>
                country.includes(c) || season.includes(c) || name.includes(c)))
            return "africa";

        if (cont === "oceania" || cont.includes("australia") ||
            ["australia","maori","polynesia","pacific"].some(c =>
                country.includes(c) || cont.includes(c)))
            return "australia";

        if (season.includes("bite") || season.includes("mini") ||
            name.includes("bite")   || name.includes("mini"))
            return "historybites";

        return "europe"; // safe fallback
    }

    function applyOverridesToScene(scene) {
        const cont    = document.getElementById("importContinent").value;
        const country = document.getElementById("importCountry").value;
        const season  = document.getElementById("importSeason").value;
        if (cont)    scene.continent = cont;
        if (country) scene.country   = country;
        if (season)  scene.season    = season;
    }

    function normaliseScene(s) {
        return {
            id:        s.id,
            name:      s.name,
            startYear: parseInt(s.startYear) || 0,
            endYear:   parseInt(s.endYear)   || 0,
            imgKey:    s.imgKey || s.id,
            continent: s.continent || "",
            country:   s.country   || "",
            season:    s.season    || "",
            coords:    Array.isArray(s.coords)
                         ? [parseFloat(s.coords[0])||0, parseFloat(s.coords[1])||0]
                         : [0, 0],
            zoom:      parseInt(s.zoom) || 5,
            region:    s.region || "",
            info:      s.info   || "",
            events:    Array.isArray(s.events) ? s.events.filter(Boolean) : [],
        };
    }

    function importSceneCode() {
        const raw = document.getElementById("adminCodeImport").value.trim();
        if (!raw) { toast("Paste scene code first", true); return; }

        let parsed;
        try {
            parsed = new Function("return (" + raw + ")")();
        } catch (err) {
            console.error(err);
            toast("Invalid JS syntax", true);
            document.getElementById("adminImportOutput").innerHTML =
                `<div style="color:#ff7070;font-size:12px;margin-top:8px;">${escHtml(err.message)}</div>`;
            return;
        }

        const forceDb = document.getElementById("importDb").value;
        const replaceOnConflict = document.getElementById("adminImportReplace") && document.getElementById("adminImportReplace").checked;
        replaceOnConflict = true;

        // ── MULTI-ADD (array) ────────────────────────────────
        if (Array.isArray(parsed)) {
            if (parsed.length === 0) { toast("Array is empty", true); return; }
            const results = [];
            parsed.forEach(scene => {
                if (!scene || !scene.id || !scene.name) {
                    results.push({ ok: false, name: scene && scene.id || "?", reason: "Missing id or name" });
                    return;
                }
                applyOverridesToScene(scene);
                const targetDb = forceDb || autoDetectDb(scene);
                const arr = DB_MAP[targetDb] && DB_MAP[targetDb].getArr();
                if (!arr) { results.push({ ok: false, name: scene.name, reason: "Unknown db: " + targetDb }); return; }
                const existingIdx = arr.findIndex(s => s.id === scene.id);
                if (existingIdx !== -1) {
                    if (!replaceOnConflict) {
                        results.push({ ok: false, name: scene.name, reason: `ID "${scene.id}" already exists in ${DB_MAP[targetDb].label}` });
                        return;
                    }
                    const entry = normaliseScene(scene);
                    entry._adminEdited = true;
                    delete entry._adminAdded;
                    arr[existingIdx] = entry;
                    const si = scenes.findIndex(s => s.id === entry.id);
                    if (si !== -1) scenes[si] = entry; else scenes.push(entry);
                    results.push({ ok: true, name: scene.name, db: DB_MAP[targetDb].label, replaced: true });
                    return;
                }
                const entry = normaliseScene(scene);
                entry._adminAdded = true;
                arr.push(entry);
                scenes.push(entry);
                results.push({ ok: true, name: scene.name, db: DB_MAP[targetDb].label });
            });
            persistScenes();
            const added  = results.filter(r => r.ok && !r.replaced);
            const replaced = results.filter(r => r.ok && r.replaced);
            const failed = results.filter(r => !r.ok);
            const rows = results.map(r =>
                r.ok
                ? `<div style="padding:3px 0;font-size:12px;color:${r.replaced ? "#ffc06a" : "#7dff9e"};">${r.replaced ? "🔁" : "✔"} ${escHtml(r.name)} → ${escHtml(r.db)}${r.replaced ? " (replaced)" : ""}</div>`
                : `<div style="padding:3px 0;font-size:12px;color:#ff7070;">✗ ${escHtml(r.name)}: ${escHtml(r.reason)}</div>`
            ).join("");
            document.getElementById("adminImportOutput").innerHTML =
                `<div style="background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;max-height:200px;overflow-y:auto;">
                    <div style="font-size:11px;font-weight:700;letter-spacing:.08em;color:rgba(255,255,255,0.4);margin-bottom:8px;text-transform:uppercase;">${added.length} added · ${replaced.length} replaced · ${failed.length} failed</div>
                    ${rows}
                 </div>`;
            toast("Bulk import: " + added.length + " added, " + replaced.length + " replaced, " + failed.length + " failed");
            return;
        }

        // ── SINGLE SCENE → load into manual form ────────────
        const scene = parsed;
        if (!scene.id || !scene.name) { toast("Scene must contain id and name", true); return; }
        applyOverridesToScene(scene);
        const targetDb = forceDb || autoDetectDb(scene);

        const existingArr = DB_MAP[targetDb] && DB_MAP[targetDb].getArr();
        const conflictExists = existingArr && existingArr.find(s => s.id === scene.id);
        if (conflictExists && !replaceOnConflict) {
            toast(`ID "${scene.id}" already exists in ${DB_MAP[targetDb].label} — check "Replace existing" to overwrite, or loading into the form below will edit it directly on save.`, true);
        } else if (conflictExists && replaceOnConflict) {
            toast(`Loaded "${scene.name}" into form — saving will replace the existing scene with ID "${scene.id}"`);
        }

        document.getElementById("aDb").value        = targetDb;
        document.getElementById("aId").value        = scene.id        || "";
        document.getElementById("aName").value      = scene.name      || "";
        document.getElementById("aImgKey").value    = scene.imgKey    || scene.id || "";
        document.getElementById("aStartYear").value = scene.startYear != null ? scene.startYear : "";
        document.getElementById("aEndYear").value   = scene.endYear   != null ? scene.endYear   : "";
        document.getElementById("aContinent").value = scene.continent || "";
        document.getElementById("aCountry").value   = scene.country   || "";
        document.getElementById("aSeason").value    = scene.season    || "";
        document.getElementById("aRegion").value    = scene.region    || "";
        document.getElementById("aZoom").value      = scene.zoom      != null ? scene.zoom : 5;
        document.getElementById("aInfo").value      = scene.info      || "";

        if (Array.isArray(scene.coords) && scene.coords.length >= 2) {
            document.getElementById("aLat").value = scene.coords[0];
            document.getElementById("aLng").value = scene.coords[1];
        }
        document.getElementById("adminEventsContainer").innerHTML = "";
        (scene.events || []).forEach(ev => addEventRow(ev));
        if ((scene.events || []).length === 0) addEventRow();
        updateInfoCharCount();

        toast("Loaded \"" + scene.name + "\" into form → review & save");

        // Switch to manual subtab
        document.querySelectorAll(".admin-add-subtab[data-subtab]").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".admin-add-subpage[data-subpage]").forEach(p => p.classList.remove("active"));
        document.querySelector(".admin-add-subtab[data-subtab=\"manual\"]").classList.add("active");
        document.querySelector(".admin-add-subpage[data-subpage=\"manual\"]").classList.add("active");
    }

    function generateEntryJS(e, db) {
        const esc = s => (s||"").replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/\$/g,"\\$");
        const evts = (e.events||[]).map(ev => `"${ev.replace(/"/g,'\\"')}"`).join(",\n        ");
        return `{\n    id: "${e.id}",\n    name: "${e.name}",\n    startYear: ${e.startYear},\n    endYear: ${e.endYear},\n    imgKey: "${e.imgKey}",\n    continent: "${e.continent}",\n    country: "${e.country}",\n    season: "${e.season}",\n    coords: [${e.coords[0]}, ${e.coords[1]}],\n    zoom: ${e.zoom},\n    region: "${e.region}",\n    info: \`${esc(e.info)}\`,\n    events: [\n        ${evts}\n    ]\n},`;
    }

    // ── MANAGE TAB ────────────────────────────────────────────────
    document.getElementById("adminSceneFilter").addEventListener("input", refreshManageList);

    // Delegated events for scene list rows (edit / delete / duplicate / checkbox)
    document.getElementById("adminSceneList").addEventListener("click", function(e) {
        const row = e.target.closest(".admin-scene-row");
        if (!row) return;
        const sid = row.dataset.sid;
        const idx = this._sceneIndex && this._sceneIndex[sid];
        if (!idx) return;
        const { dbKey, scene: s } = idx;
        if (e.target.closest("[data-edit]"))   { loadSceneIntoForm(s, dbKey); return; }
        if (e.target.closest("[data-del]"))    { deleteScene(dbKey, s.id, s.name); return; }
        if (e.target.closest("[data-dup]"))    { duplicateScene(s, dbKey); return; }
        if (e.target.closest("[data-replace]")){ replaceScene(s, dbKey); return; }
    });
    document.getElementById("adminSceneList").addEventListener("change", function(e) {
        const cb = e.target.closest(".admin-cb[data-id]");
        if (!cb) return;
        if (cb.checked) selectedSceneIds.add(cb.dataset.id);
        else selectedSceneIds.delete(cb.dataset.id);
        updateMultiBar();
    });

    // DB chip filter removed

    // Sort button clicks
    document.addEventListener("click", function(e) {
        const btn = e.target.closest(".admin-sort-btn");
        if (!btn) return;
        document.querySelectorAll(".admin-sort-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        refreshManageList();
    });

    let selectedSceneIds = new Set();

    function updateMultiBar() {
        const bar  = document.getElementById("adminMultiBar");
        const cnt  = document.getElementById("adminMultiCount");
        const selAll = document.getElementById("adminSelectAll");
        const rows = document.querySelectorAll(".admin-scene-row");
        const total = rows.length;
        const selCount = selectedSceneIds.size;
        bar.classList.toggle("visible", total > 0);
        cnt.textContent = selCount > 0 ? selCount + " selected" : total + " scenes";
        if (selAll) selAll.checked = total > 0 && selCount === total;
        document.getElementById("adminMultiDeleteBtn").disabled = selCount === 0;
    }

    document.getElementById("adminSelectAll").addEventListener("change", function() {
        const rows = document.querySelectorAll(".admin-scene-row");
        rows.forEach(row => {
            const cb = row.querySelector(".admin-cb");
            const sid = cb && cb.dataset.id;
            if (!sid) return;
            if (this.checked) selectedSceneIds.add(sid);
            else selectedSceneIds.delete(sid);
            if (cb) cb.checked = this.checked;
        });
        updateMultiBar();
    });

    document.getElementById("adminMultiDeleteBtn").addEventListener("click", async () => {
        if (selectedSceneIds.size === 0) return;
        const count = selectedSceneIds.size;
        const ok = await showConfirm({
            icon: "🗑️",
            title: `Delete ${count} scene${count !== 1 ? "s" : ""}?`,
            msg: `This will hide ${count} selected scene${count !== 1 ? "s" : ""} from the database. They can still be restored or permanently purged later.`,
            okLabel: "Delete All",
            okClass: "admin-btn-danger"
        });
        if (!ok) return;
        const toDelete = Array.from(selectedSceneIds);
        toDelete.forEach(sceneId => {
            for (const [dbKey, info] of Object.entries(DB_MAP)) {
                const arr = info.getArr();
                const idx = arr.findIndex(s => s.id === sceneId);
                if (idx !== -1) {
                    deletedIds.add(sceneId);
                    break;
                }
            }
        });
        persistDeleted();
        const savedScenes = (lsGet(LS_SCENES) || []).filter(s => !toDelete.includes(s.id));
        lsSet(LS_SCENES, savedScenes);
        selectedSceneIds.clear();
        toast(`✔ Deleted ${count} scene${count !== 1 ? "s" : ""}`);
        refreshManageList();
        if (toDelete.includes(editingId)) resetAddForm();
    });

    function adminSearchScenes(query, sceneList) {
        return searchScenes(query, sceneList);
    }
    function adminHighlight(text, tokens) {
        return highlightMatches(text, tokens, escHtml);
    }

    function refreshManageList() {
        const q = (document.getElementById("adminSceneFilter").value || "").toLowerCase();
        const container = document.getElementById("adminSceneList");
        container.innerHTML = "";

        let all = [];
        for (const [dbKey, info] of Object.entries(DB_MAP)) {
            info.getArr().forEach(s => all.push({ dbKey, scene: s }));
        }

        let filtered = all.filter(({ scene: s }) => !deletedIds.has(s.id));

        let _searchTokens = [];
        if (q) {
            const _sceneObjs = filtered.map(({ scene: s }) => s);
            const _scored = adminSearchScenes(q, _sceneObjs);
            const _matchedIds = new Map(_scored.map(r => [r.scene.id, r]));
            filtered = filtered.filter(({ scene: s }) => _matchedIds.has(s.id));
            // Attach tokens to each item for later highlight use
            filtered = filtered.map(item => ({
                ...item,
                _searchResult: _matchedIds.get(item.scene.id)
            }));
            if (_scored.length > 0) _searchTokens = _scored[0].tokens;
            // Re-sort by search score (overrides sort btn when searching)
            filtered.sort((a, b) => {
                const sa = a._searchResult ? a._searchResult.score : 0;
                const sb = b._searchResult ? b._searchResult.score : 0;
                return sb - sa;
            });
        }

        // Sort (skipped when a search query is active — results already ranked by relevance)
        if (!q) {
        const activeSort = document.querySelector(".admin-sort-btn.active");
        const sortVal = activeSort ? activeSort.dataset.sort : "name";
        filtered.sort((a, b) => {
            switch(sortVal) {
                case "name":      return (a.scene.name||"").localeCompare(b.scene.name||"");
                case "name-desc": return (b.scene.name||"").localeCompare(a.scene.name||"");
                case "year":      return (a.scene.startYear||0) - (b.scene.startYear||0);
                case "year-desc": return (b.scene.startYear||0) - (a.scene.startYear||0);
                case "db":        return a.dbKey.localeCompare(b.dbKey);
                case "edited": {
                    const ae = a.scene._adminAdded || a.scene._adminEdited ? 1 : 0;
                    const be = b.scene._adminAdded || b.scene._adminEdited ? 1 : 0;
                    return be - ae;
                }
                default: return 0;
            }
        });
        } // end if (!q)

        if (filtered.length === 0) {
            container.innerHTML = `<div style="color:rgba(255,255,255,0.3);font-size:13px;padding:10px 0;">No scenes found.</div>`;
            updateMultiBar();
            return;
        }

        // Build scene index for delegated event handling
        const _sceneIndex = {};
        const frag = document.createDocumentFragment();

        // Count titles (case-insensitive, trimmed) across ALL active scenes (not just filtered view)
        // so duplicates are flagged even while searching/filtering.
        const _titleCounts = {};
        all.forEach(({ scene: s }) => {
            if (deletedIds.has(s.id)) return;
            const key = (s.name || "").trim().toLowerCase();
            if (!key) return;
            _titleCounts[key] = (_titleCounts[key] || 0) + 1;
        });

        filtered.forEach((item) => { const { dbKey, scene: s } = item;
            _sceneIndex[s.id] = { dbKey, scene: s };
            const row = document.createElement("div");
            row.className = "admin-scene-row";
            row.dataset.sid = s.id;
            const sy = s.startYear < 0 ? Math.abs(s.startYear)+"BC" : s.startYear;
            const ey = s.endYear   < 0 ? Math.abs(s.endYear)+"BC"   : s.endYear;
            const isEdited = s._adminAdded || s._adminEdited;
            const isSelected = selectedSceneIds.has(s.id);
            const _sr = item._searchResult || null;
            const _toks = _sr ? _sr.tokens : [];
            const _titleKey = (s.name || "").trim().toLowerCase();
            const isDup = _titleKey && _titleCounts[_titleKey] > 1;
            row.innerHTML = `
                <input type="checkbox" class="admin-cb" data-id="${s.id}" ${isSelected ? "checked" : ""}>
                <div style="display:flex;align-items:center;flex:1;gap:8px;min-width:0;">
                    <div class="admin-scene-info" style="flex:1;min-width:0;">
                        <div class="admin-scene-name">${adminHighlight(s.name, _toks)}${isEdited ? ' <span style="font-size:9px;color:#f5a623;border:1px solid rgba(200,120,0,0.4);border-radius:99px;padding:1px 5px;font-weight:700;">EDITED</span>' : ""}${isDup ? ' <span class="admin-dup-badge" title="Another active scene shares this exact title">⚠ Duplicate title</span>' : ""}</div>
                        <div class="admin-scene-meta">${adminHighlight(s.country||"", _toks)} · ${adminHighlight(s.season||"", _toks)} · ${sy}–${ey}</div>
                    </div>
                    <span class="admin-scene-db db-${dbKey}" style="flex-shrink:0;">${DB_MAP[dbKey].label}</span>
                    <div class="admin-scene-actions" style="flex-shrink:0;">
                        <button class="admin-btn admin-btn-secondary" style="padding:4px 9px;font-size:11px;" data-dup title="Duplicate scene">⎘</button>
                        <button class="admin-btn ${isDup ? "admin-btn-warn" : "admin-btn-secondary"}" style="padding:4px 9px;font-size:11px;" data-replace title="Replace this scene's data with another scene's data">🔁</button>
                        <button class="admin-btn admin-btn-warn" style="padding:4px 9px;font-size:11px;" data-edit>✏️ Edit</button>
                        <button class="admin-btn admin-btn-danger" style="padding:4px 9px;font-size:11px;" data-del>🗑</button>
                    </div>
                </div>
            `;
            frag.appendChild(row);
        });

        container.appendChild(frag);
        // Store scene index on the container for delegated events
        container._sceneIndex = _sceneIndex;
        updateMultiBar();
    }

    async function deleteScene(dbKey, sceneId, sceneName) {
        const ok = await showConfirm({
            icon: "🗑️",
            title: "Delete Scene?",
            msg: `"${sceneName}" will be hidden from ${DB_MAP[dbKey].label}. It can still be restored or permanently purged later.`,
            okLabel: "Delete",
            okClass: "admin-btn-danger"
        });
        if (!ok) return;

        deletedIds.add(sceneId);
        persistDeleted();

        // Remove from live arrays immediately so the main app stops showing it
        // and save a copy in deletedSceneStore so the deleted tab can show it
        const arr = DB_MAP[dbKey] ? DB_MAP[dbKey].getArr() : null;
        if (arr) {
            const idx = arr.findIndex(s => s.id === sceneId);
            if (idx !== -1) {
                deletedSceneStore[sceneId] = { ...arr[idx], _dbKey: dbKey };
                lsSet("whd_deleted_scene_store", deletedSceneStore);
                arr.splice(idx, 1);
            }
        }
        const si = scenes.findIndex(s => s.id === sceneId);
        if (si !== -1) scenes.splice(si, 1);

        // Also remove from persisted added/edited scenes if present
        const savedScenes = (lsGet(LS_SCENES) || []).filter(s => s.id !== sceneId);
        lsSet(LS_SCENES, savedScenes);

        toast(`✔ Deleted "${sceneName}"`);
        refreshManageList();
        refreshDeletedList();
        if (editingId === sceneId) resetAddForm();
    }

    function duplicateScene(scene, dbKey) {
        const copy = JSON.parse(JSON.stringify(scene));
        copy.id   = (copy.id || "scene") + "_copy";
        copy.name = copy.name + " (Copy)";
        delete copy._adminAdded;
        delete copy._adminEdited;
        delete copy._dbKey;

        switchToTab("add");
        document.querySelectorAll(".admin-add-subtab[data-subtab]").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".admin-add-subpage[data-subpage]").forEach(p => p.classList.remove("active"));
        document.querySelector(".admin-add-subtab[data-subtab=\'manual\']").classList.add("active");
        document.querySelector(".admin-add-subpage[data-subpage=\'manual\']").classList.add("active");

        document.getElementById("aDb").value        = dbKey;
        document.getElementById("aId").value        = copy.id;
        document.getElementById("aName").value      = copy.name;
        document.getElementById("aImgKey").value    = copy.imgKey || copy.id;
        document.getElementById("aStartYear").value = copy.startYear != null ? copy.startYear : "";
        document.getElementById("aEndYear").value   = copy.endYear   != null ? copy.endYear   : "";
        document.getElementById("aContinent").value = copy.continent || "";
        document.getElementById("aCountry").value   = copy.country   || "";
        document.getElementById("aSeason").value    = copy.season    || "";
        document.getElementById("aRegion").value    = copy.region    || "";
        document.getElementById("aZoom").value      = copy.zoom      != null ? copy.zoom : 5;
        document.getElementById("aInfo").value      = copy.info      || "";
        if (Array.isArray(copy.coords) && copy.coords.length >= 2) {
            document.getElementById("aLat").value = copy.coords[0];
            document.getElementById("aLng").value = copy.coords[1];
        }
        document.getElementById("adminEventsContainer").innerHTML = "";
        (copy.events || []).forEach(ev => addEventRow(ev));
        if ((copy.events || []).length === 0) addEventRow();
        updateInfoCharCount();

        editingId    = null;
        editingDbKey = null;
        document.getElementById("adminSaveBtn").textContent = "\u{1F4BE} Save Entry";
        document.getElementById("adminFormMode").style.display = "inline-block";
        document.getElementById("adminFormMode").textContent   = "ADD";
        document.getElementById("adminFormMode").className     = "";
        document.getElementById("adminCancelEditBtn").style.display = "none";
        toast(`Duplicating "${scene.name}" \u2014 edit & save`);
    }

    function getSceneById(sceneId) {
        for (const [dbKey, info] of Object.entries(DB_MAP)) {
            const scene = info.getArr().find(s => s.id === sceneId);
            if (scene) return { dbKey, scene };
        }
        return null;
    }

    // ── Multi-word tag argument helpers ─────────────────────────────────
    // Many terminal commands take a free-text tag (country/season/continent
    // — things like "South Africa" or "Medieval Vietnam") followed by
    // another argument. Naively splitting on a single space breaks for any
    // multi-word tag ("set country south africa france" → keyArg="south",
    // val="africa france"). These helpers resolve the ambiguity by
    // preferring the longest prefix/suffix that matches a value that
    // actually exists, since scene IDs never contain spaces and known tag
    // values are a small, enumerable set.
    function termKnownValues(field) {
        const out = new Set();
        termAllActiveScenes().forEach(({ scene: s }) => {
            const v = (s[field] || "").trim().toLowerCase();
            if (v) out.add(v);
        });
        return out;
    }
    // Given tokens like ["south","africa","france"], find how many leading
    // tokens form a known value (checked longest-first) or a real scene ID.
    // Falls back to 1 token so old single-word behavior still works.
    function termSplitLeadingKey(tokens, knownValuesLower) {
        for (let len = tokens.length - 1; len >= 1; len--) {
            const candidate = tokens.slice(0, len).join(" ");
            if (knownValuesLower.has(candidate.toLowerCase()) || getSceneById(candidate)) return len;
        }
        return 1;
    }
    // Given tokens like ["south","africa","scene1","scene2"], pop scene IDs
    // off the END (IDs never contain spaces) until what's left is the
    // free-text value. Returns { value, ids }.
    function termSplitTrailingIds(tokens) {
        let i = tokens.length;
        while (i > 1 && getSceneById(tokens[i - 1])) i--;
        return { value: tokens.slice(0, i).join(" "), ids: tokens.slice(i) };
    }

    // ── Replace Scene ───────────────────────────────────
    // Lets an admin pick another scene and overwrite the target scene's
    // data with it (keeping the target's id/db so nothing referencing
    // that id breaks). Useful when two scenes share the same title and
    // one should be merged into / replaced by the other.
    let replaceResolve = null;

    function showReplacePicker(targetScene) {
        return new Promise(res => {
            replaceResolve = res;
            const targetKey = (targetScene.name || "").trim().toLowerCase();

            let candidates = [];
            for (const [dbKey, info] of Object.entries(DB_MAP)) {
                info.getArr().forEach(s => {
                    if (s.id === targetScene.id) return;
                    if (deletedIds.has(s.id)) return;
                    candidates.push({ dbKey, scene: s });
                });
            }
            // Same-title matches first, then alphabetical
            candidates.sort((a, b) => {
                const aSame = (a.scene.name||"").trim().toLowerCase() === targetKey ? 0 : 1;
                const bSame = (b.scene.name||"").trim().toLowerCase() === targetKey ? 0 : 1;
                if (aSame !== bSame) return aSame - bSame;
                return (a.scene.name||"").localeCompare(b.scene.name||"");
            });

            const listEl   = document.getElementById("adminReplaceList");
            const filterEl = document.getElementById("adminReplaceFilter");
            const msgEl    = document.getElementById("adminReplaceMsg");

            msgEl.textContent = `Choose a scene to copy data from into "${targetScene.name}". The original ID, database, and links to this scene will be kept — every other field (name, dates, location, info, events, image) will be overwritten.`;
            filterEl.value = "";

            function renderList(q) {
                const ql = (q || "").toLowerCase();
                const matches = candidates.filter(({ scene: s }) => {
                    if (!ql) return true;
                    return [s.name, s.country, s.season, s.id].some(v => (v||"").toLowerCase().includes(ql));
                });
                if (matches.length === 0) {
                    listEl.innerHTML = `<div class="admin-replace-empty">No matching scenes.</div>`;
                    return;
                }
                listEl.innerHTML = matches.map(({ dbKey, scene: s }) => {
                    const sy = s.startYear < 0 ? Math.abs(s.startYear)+"BC" : s.startYear;
                    const ey = s.endYear   < 0 ? Math.abs(s.endYear)+"BC"   : s.endYear;
                    const sameTitle = (s.name||"").trim().toLowerCase() === targetKey;
                    return `
                        <div class="admin-replace-row" data-sid="${s.id}">
                            <span class="arr-name">${escHtml(s.name)}${sameTitle ? ' <span class="admin-dup-badge">⚠ Same title</span>' : ""}</span>
                            <span class="arr-meta">${escHtml(s.country||"")} · ${escHtml(s.season||"")} · ${sy}\u2013${ey} · ${DB_MAP[dbKey].label}</span>
                        </div>`;
                }).join("");
            }
            renderList("");

            filterEl.oninput = () => renderList(filterEl.value);

            listEl.onclick = (e) => {
                const row = e.target.closest(".admin-replace-row");
                if (!row) return;
                const picked = candidates.find(c => c.scene.id === row.dataset.sid);
                document.getElementById("adminReplace").style.display = "none";
                if (replaceResolve) { replaceResolve(picked || null); replaceResolve = null; }
            };

            document.getElementById("adminReplace").style.display = "flex";
        });
    }

    document.getElementById("adminReplaceCancel").addEventListener("click", () => {
        document.getElementById("adminReplace").style.display = "none";
        if (replaceResolve) { replaceResolve(null); replaceResolve = null; }
    });
    // Failsafe (same reasoning as #adminConfirm): backdrop click or Escape
    // always cancels, so "scene replace" can never hang the terminal.
    document.getElementById("adminReplace").addEventListener("click", e => {
        if (e.target.id === "adminReplace") {
            document.getElementById("adminReplace").style.display = "none";
            if (replaceResolve) { replaceResolve(null); replaceResolve = null; }
        }
    });
    document.addEventListener("keydown", e => {
        if (e.key !== "Escape") return;
        const replaceEl = document.getElementById("adminReplace");
        if (replaceEl && replaceEl.style.display !== "none") {
            replaceEl.style.display = "none";
            if (replaceResolve) { replaceResolve(null); replaceResolve = null; }
        }
    });

    async function replaceScene(targetScene, targetDbKey) {
        const picked = await showReplacePicker(targetScene);
        if (!picked) return;
        const { dbKey: sourceDbKey, scene: sourceScene } = picked;

        const ok = await showConfirm({
            icon: "\u{1F501}",
            title: "Replace Scene Data?",
            msg: `"${targetScene.name}" will be overwritten with the data from "${sourceScene.name}". This keeps the ID "${targetScene.id}" but replaces its name, dates, location, info, and events. This cannot be undone automatically.`,
            okLabel: "Replace",
            okClass: "admin-btn-warn"
        });
        if (!ok) return;

        const targetArr = DB_MAP[targetDbKey].getArr();
        const idx = targetArr.findIndex(s => s.id === targetScene.id);
        if (idx === -1) { toast("Could not locate target scene", true); return; }

        const preservedId = targetScene.id;
        const merged = {
            ...JSON.parse(JSON.stringify(sourceScene)),
            id: preservedId,
            _adminEdited: true
        };
        delete merged._adminAdded;
        delete merged._dbKey;

        targetArr[idx] = merged;

        // Keep the in-memory `scenes` (admin add/edit tracking) array consistent
        const si = scenes.findIndex(s => s.id === preservedId);
        const trackedEntry = { ...merged, _dbKey: targetDbKey };
        if (si !== -1) scenes[si] = trackedEntry;
        else scenes.push(trackedEntry);

        persistScenes();

        // Offer to also remove the now-redundant source scene
        const removeSource = await showConfirm({
            icon: "\u{1F5D1}\uFE0F",
            title: "Remove Source Scene?",
            msg: `Do you also want to delete "${sourceScene.name}" now that its data has been copied into "${merged.name}"?`,
            okLabel: "Delete Source",
            okClass: "admin-btn-danger"
        });
        if (removeSource) {
            await deleteScene(sourceDbKey, sourceScene.id, sourceScene.name);
        }

        toast(`\u2714 Replaced "${targetScene.name}" with data from "${sourceScene.name}"`);
        refreshManageList();
        if (editingId === preservedId) resetAddForm();
    }

    // ── Owner Terminal ──────────────────────────────────────────────────────
    // _termOutputId lets other UIs (e.g. owner-panel.js's standalone fullscreen
    // terminal) redirect termPrint() output to their own DOM without duplicating
    // the command engine. See window.WHDAdmin.setOutput() below.
    let _termOutputId = "adminTermOutput";
    function termPrint(text, cls) {
        const out = document.getElementById(_termOutputId);
        if (!out) return;
        const line = document.createElement("div");
        line.className = "admin-term-line" + (cls ? " " + cls : "");
        line.textContent = text;
        out.appendChild(line);
        out.scrollTop = out.scrollHeight;
    }

    // ── Argument suggestion database ──────────────────────────────────────
    // Two kinds of suggestion sources feed the terminal's autocomplete:
    //  1. LIVE sources — read straight from real in-memory state (scene data,
    //     DB_MAP, cached user list, last-synced flags/CSS). Always accurate,
    //     never stale.
    //  2. LEARNED sources — values that have no live registry anywhere in the
    //     app (CSS selectors/properties you've typed, custom event names,
    //     flag names you've cleared, custom scene fields). These persist in
    //     localStorage under whd_term_learned so suggestions improve the more
    //     the terminal is used, without requiring a server-side schema.
    const TERM_LEARN_KEY = "whd_term_learned";
    function _termLoadLearned() {
        try { return JSON.parse(localStorage.getItem(TERM_LEARN_KEY)) || {}; } catch { return {}; }
    }
    function _termSaveLearned(db) {
        try { localStorage.setItem(TERM_LEARN_KEY, JSON.stringify(db)); } catch {}
    }
    function learnRemember(category, value) {
        if (!value) return;
        const db = _termLoadLearned();
        db[category] = db[category] || [];
        const i = db[category].indexOf(value);
        if (i !== -1) db[category].splice(i, 1); // move to front (most-recent-first)
        db[category].unshift(value);
        if (db[category].length > 40) db[category].length = 40;
        _termSaveLearned(db);
    }
    function learned(category) { return _termLoadLearned()[category] || []; }

    let _lastCssRules = []; // populated by applyRemoteConfigToPage, used for suggestions

    // ── Suggestion sources ──────────────────────────────────────────────────
    function suggestDbKeys()      { return Object.keys(DB_MAP); }
    function suggestSceneIds()    { return termAllActiveScenes().map(m => m.scene.id); }
    // Returns "id (Name)" entries so the user can see friendly names while typing
    function suggestSceneIdsRich() {
        return termAllActiveScenes().map(m => m.scene.id);
    }
    function suggestDeletedSceneIds() { return [...deletedIds]; }
    function suggestCountries()   { return [...new Set(termAllActiveScenes().map(m => m.scene.country).filter(Boolean))].sort(); }
    function suggestSeasons()     { return [...new Set(termAllActiveScenes().map(m => m.scene.season).filter(Boolean))].sort(); }
    function suggestRegions()     { return [...new Set(termAllActiveScenes().map(m => m.scene.region).filter(Boolean))].sort(); }
    function suggestContinents()  { return [...new Set(termAllActiveScenes().map(m => m.scene.continent).filter(Boolean))].sort(); }
    function suggestSceneNames()  { return [...new Set(termAllActiveScenes().map(m => m.scene.name).filter(Boolean))].sort(); }
    function suggestSceneFields() {
        const keys = new Set(["id","name","startYear","endYear","imgKey","continent","country","season","coords","zoom","region","info","events"]);
        termAllActiveScenes().forEach(m => Object.keys(m.scene).forEach(k => keys.add(k)));
        learned("field").forEach(k => keys.add(k));
        return [...keys].filter(k => !k.startsWith("_"));
    }
    function suggestUsernames() {
        return [...new Set([...(_adminAllUsers || []).map(u => u.username), ...learned("username")])];
    }
    function suggestFlags() {
        return [...new Set([...Object.keys(window.WHD_FLAGS || {}), ...learned("flag")])];
    }
    // Real selectors pulled from the project's own CSS files, so "css"
    // suggestions cover virtually everything stylable in the app instead
    // of a small hand-picked sample.
    const KNOWN_CSS_SELECTORS = [
"#acctDeleteModal","#adminAddSubtabs","#adminAnnouncePreview","#adminBody","#adminCloseBtn",
            "#adminConfirm","#adminConfirmBox","#adminConfirmBtns","#adminConfirmIcon","#adminConfirmMsg",
            "#adminConfirmOk","#adminConfirmTitle","#adminContent","#adminEventsContainer","#adminFormMode",
            "#adminHeader","#adminMultiBar","#adminMultiDeleteBtn","#adminOverlay","#adminPanel",
            "#adminPassError","#adminPassInput","#adminPassRow","#adminReplace","#adminReplaceBox",
            "#adminReplaceBtns","#adminReplaceFilter","#adminReplaceList","#adminReplaceMsg",
            "#adminReplaceTitle","#adminSceneFilter","#adminSceneList","#adminSortBar","#adminSortLabel",
            "#adminStylePreview","#adminTabs","#adminToast","#announcementBanner","#appConfirm",
            "#appConfirmBox","#appConfirmCancel","#appConfirmIcon","#appConfirmMsg","#appConfirmOk",
            "#appConfirmTitle","#authBrand","#authBrandGlyph","#authBrandName","#authBrandSub","#authFeatures",
            "#authForgotLink","#authGuestRow","#authLoggedInRow","#authModal","#authOverlay","#authPanel",
            "#authPanelInner","#authPanelLeft","#authPanelRight","#authSyncStatus","#authSyncToast","#authTabs",
            "#authWelcome","#backNavBtn","#bannedPage","#bookmarkToast","#bookmarksBtn","#bookmarksClearBtn",
            "#bookmarksCount","#bookmarksHeader","#bookmarksHeaderLeft","#bookmarksHeaderRight",
            "#bookmarksList","#bookmarksTitle","#breadcrumbs","#bugReportModal","#bugReportOverlay",
            "#cinematicBlur","#controlButtons","#deletePlaylistBtn","#episodePanel","#exitBtn",
            "#explorePlLabel","#exploreResults","#exploreSearchBar","#exploreSearchInput","#fadeScreen",
            "#forceSecQModal","#forceSecQOverlay","#infoContent","#infoEvents","#infoImage","#infoPanel",
            "#infoPanelHeader","#infoPanelTopRow","#infoRegion","#infoText","#infoTitle","#infoYearBadge",
            "#maintenancePage","#map","#musicPickerContent","#musicPickerHeader","#musicPickerList",
            "#musicPickerModal","#muteBtn","#newPlaylistBtn","#nowPlayingPanel","#nowPlayingTrack",
            "#nowPlayingWave","#overlay","#ownerPanel","#ownerPanelCloseBtn","#ownerPanelHeader",
            "#ownerPanelOverlay","#panelTabBookmarks","#panelTabExplore","#panelTabPlaylists","#pauseBtn",
            "#playPlaylistBtn","#playlistCloseBtn","#playlistEditor","#playlistEditorActions",
            "#playlistEditorContent","#playlistEditorEmpty","#playlistEditorHeader","#playlistList",
            "#playlistListHeader","#playlistModal","#playlistModalContent","#playlistModalHeader",
            "#playlistModalTabs","#playlistMusicLabel","#playlistMusicSelect","#playlistNameInput",
            "#playlistScenes","#playlistScenesLabel","#playlistSidebar","#randomBtn","#rowTitle",
            "#sceneProgress","#sceneProgressDots","#sceneProgressLabel","#sceneSearchBar","#sceneSearchInput",
            "#sceneSearchResults","#sceneSearchSuggestions","#seasons","#settingsCloseBtn","#settingsContent",
            "#settingsHeader","#settingsPage","#settingsTabs","#sharePlaylistBtn","#shareSceneBtn",
            "#shareToast","#sourcesContent","#sourcesPage","#startBtn","#storyBookmarkBtn",
            "#storyFinishedButtons","#storyFinishedExitBtn","#storyFinishedGlyph","#storyFinishedInner",
            "#storyFinishedOverlay","#storyFinishedPlayAgainBtn","#storyFinishedSubtitle","#storyFinishedText",
            "#storyFinishedTitle","#storyPlaylistBtn","#timelineFill","#timelineScrubber","#timelineThumb",
            "#timelineTrack","#timelineYearCurrent","#timelineYearEnd","#timelineYearStart","#timelineYears",
            "#topBar","#uiLayer",".ac-ok-danger",".ac-ok-safe",".acct-avatar",".acct-benefit-card",
            ".acct-benefit-icon",".acct-benefit-sub",".acct-benefit-title",".acct-benefits-grid",".acct-card",
            ".acct-change-pass-form",".acct-count-badge",".acct-delete-backdrop",".acct-delete-body",
            ".acct-delete-box",".acct-delete-btns",".acct-delete-title",".acct-email-badge",
            ".acct-email-missing",".acct-guest-block",".acct-guest-icon",".acct-guest-sub",".acct-guest-title",
            ".acct-info",".acct-maintenance-hint",".acct-maintenance-label",".acct-maintenance-row",
            ".acct-maintenance-toggle",".acct-meta",".acct-role-admin",".acct-role-badge",".acct-role-owner",
            ".acct-role-user",".acct-signin-btn",".acct-sync-badge",".acct-username",".admin-add-subpage",
            ".admin-add-subtab",".admin-btn",".admin-btn-danger",".admin-btn-primary",".admin-btn-row",
            ".admin-btn-secondary",".admin-btn-sm",".admin-btn-warn",".admin-cb",".admin-color-picker",
            ".admin-color-preset",".admin-color-wheel",".admin-dup-badge",".admin-edit-badge",
            ".admin-edit-grid",".admin-edit-hint",".admin-edit-label",".admin-edit-presets",".admin-edit-row",
            ".admin-edit-section",".admin-edit-section-label",".admin-edit-select",".admin-edit-slider",
            ".admin-event-del",".admin-event-row",".admin-field",".admin-field-hint",".admin-font-preview",
            ".admin-form-full",".admin-form-grid",".admin-help-card",".admin-help-card-sub",
            ".admin-help-card-title",".admin-help-grid",".admin-info-about",".admin-info-bar-count",
            ".admin-info-bar-fill",".admin-info-bar-name",".admin-info-bar-row",".admin-info-bar-track",
            ".admin-info-breakdown",".admin-info-danger",".admin-info-danger-item",".admin-info-key",
            ".admin-info-mono",".admin-info-row",".admin-info-stat-card",".admin-info-stat-label",
            ".admin-info-stat-num",".admin-info-stats",".admin-info-val",".admin-input",".admin-kbd",
            ".admin-maintenance-label",".admin-maintenance-row",".admin-numfield",".admin-numfield-btn",
            ".admin-numfield-dec",".admin-numfield-inc",".admin-numfield-input",".admin-owner-promote-row",
            ".admin-owner-tab",".admin-owner-tabpanel",".admin-owner-tabs",".admin-page",".admin-page-terminal",
            ".admin-recipient-chip",".admin-recipient-chip-x",".admin-recipient-chips",".admin-recipient-empty",
            ".admin-recipient-input",".admin-recipient-menu",".admin-recipient-opt",
            ".admin-recipient-opt-avatar",".admin-recipient-opt-name",".admin-recipient-picker",
            ".admin-replace-empty",".admin-replace-row",".admin-role-admin",".admin-role-badge",
            ".admin-role-owner",".admin-role-user",".admin-scene-actions",".admin-scene-db",".admin-scene-info",
            ".admin-scene-meta",".admin-scene-name",".admin-scene-row",".admin-section-title",
            ".admin-settings-badge",".admin-settings-ctrl",".admin-settings-hint",".admin-settings-label",
            ".admin-settings-row",".admin-settings-slider",".admin-sort-btn",".admin-tab",".admin-term-hint",
            ".admin-term-input",".admin-term-inputrow",".admin-term-inputwrap",".admin-term-line",
            ".admin-term-output",".admin-term-prompt",".admin-term-sugg-cat",".admin-term-sugg-cmd",
            ".admin-term-sugg-desc",".admin-term-sugg-hint",".admin-term-sugg-hint-desc",
            ".admin-term-sugg-icon",".admin-term-sugg-icon-arg",".admin-term-sugg-item",
            ".admin-term-sugg-item-arg",".admin-term-suggest",".admin-tree-add-row",".admin-tree-block",
            ".admin-tree-children",".admin-tree-indent",".admin-tree-node",".admin-tree-node-actions",
            ".admin-tree-node-name",".admin-tree-toggle",".admin-ul-editor",".admin-ul-tab",
            ".admin-ul-tabstrip",".admin-user-actions",".admin-user-avatar",".admin-user-info",
            ".admin-user-meta",".admin-user-name",".admin-user-role",".admin-user-row",".admin-user-you",
            ".admin-users-list",".admin-users-loading",".admin-users-search-row",".announcement-banner-close",
            ".announcement-banner-header",".announcement-banner-icon",".announcement-banner-inner",
            ".announcement-banner-message",".app-confirm-btns",".asp-body",".asp-btn-primary",".asp-btn-row",
            ".asp-btn-secondary",".asp-card",".asp-event",".asp-events",".asp-region",".asp-title",
            ".auth-benefit-carousel",".auth-benefit-dot",".auth-benefit-dots",".auth-benefit-icon",
            ".auth-benefit-slide",".auth-benefit-text",".auth-checkbox-label",".auth-divider",".auth-error",
            ".auth-feature",".auth-feature-icon",".auth-field",".auth-form",".auth-form-entering",
            ".auth-form-leaving",".auth-ghost-btn",".auth-hint",".auth-link-btn",".auth-notice",".auth-otp-box",
            ".auth-otp-code",".auth-otp-label",".auth-pass-wrap",".auth-primary-btn",".auth-reset-icon",
            ".auth-reset-intro",".auth-reset-sub",".auth-reset-title",".auth-select",".auth-show-pass",
            ".auth-tab",".auth-text-link",".auth-transfer-row",".back-btn",".banned-glyph",
            ".banned-signout-btn",".banned-sub",".banned-title",".bm-card",".bm-card-body",".bm-card-btns",
            ".bm-card-meta",".bm-card-name",".bm-card-thumb",".bm-clear-btn",".bm-del-btn",".bm-empty",
            ".bm-empty-hint",".bm-empty-icon",".bm-empty-title",".bm-go-btn",".bm-group",".bm-group-count",
            ".bm-group-header",".bm-group-items",".bm-group-name",".bm-list-count",".bm-list-header",
            ".bm-share-btn",".bm-share-scene-btn",".bm-star-btn",".bm-toast-icon",".bug-action-btn",
            ".bug-btn-cancel",".bug-btn-submit",".bug-card",".bug-card-actions",".bug-card-details",
            ".bug-card-header",".bug-card-meta",".bug-card-resolved",".bug-card-title",".bug-card-url",
            ".bug-cat-pill",".bug-char-count",".bug-char-warn",".bug-delete-btn",".bug-field-group",
            ".bug-footer-btns",".bug-input",".bug-input-error",".bug-label",".bug-modal-close",
            ".bug-modal-footer",".bug-modal-header",".bug-modal-title",".bug-reopen-btn",".bug-required",
            ".bug-resolve-btn",".bug-resolved-badge",".bug-select",".bug-select-arrow",".bug-select-wrap",
            ".bug-sev-btn",".bug-sev-critical",".bug-sev-high",".bug-sev-low",".bug-sev-medium",".bug-sev-pill",
            ".bug-severity-row",".bug-textarea",".bugs-clear-btn",".bugs-empty",".bugs-filter-btn",
            ".bugs-filter-group",".bugs-kbd",".bugs-list",".bugs-sort-label",".bugs-sort-row",".bugs-sort-sel",
            ".bugs-toolbar",".c-sel",".c-sel-arrow",".c-sel-group-label",".c-sel-menu",".c-sel-opt",
            ".c-sel-trigger",".c-sel-value",".card",".cinematic-marker-ring",".coord-row",".db-africa",
            ".db-asia",".db-australia",".db-europe",".db-historybites",".episode-card",".episode-card-img-wrap",
            ".episode-strip",".explore-add-btn",".explore-row",".explore-share-btn",".help-a",".help-entry",
            ".help-q",".maint-bypass-btn",".maint-glyph",".maint-sub",".maint-tab",".maint-tabpanel",
            ".maint-tabs",".maint-title",".maint-trivia",".maint-trivia-again",".maint-trivia-done",
            ".maint-trivia-opt",".maint-trivia-opts",".maint-trivia-progress",".maint-trivia-q",
            ".maint-trivia-score",".maint-trivia-sub",".maint-ul-section",".panel-tab",".panel-tab-content",
            ".pl-add-btn",".pl-add-btn-added",".pl-bar-btn",".pl-empty-msg",".pl-item-icon",".pl-item-info",
            ".pl-item-meta",".pl-item-name",".pl-list-item",".pl-list-item-active",".pl-music-check",
            ".pl-music-item",".pl-music-selected",".pl-remove-btn",".pl-scene-actions",".pl-scene-info",
            ".pl-scene-meta",".pl-scene-name",".pl-scene-num",".pl-scene-row",".pl-scene-thumb",
            ".pl-search-already",".pl-search-row",".progress-dot",".resize-handle",".season",".settings-btn",
            ".settings-btn-caution",".settings-btn-danger",".settings-btn-remove",".settings-color-input",
            ".settings-colour-control",".settings-colour-row",".settings-control",".settings-hint",
            ".settings-label",".settings-page",".settings-row",".settings-section-title",".settings-select",
            ".settings-slider",".settings-swatches",".settings-tab",".settings-value-badge",".story-pl-item",
            ".swatch",".top-bar-btn",".typewriter-cursor",".ul-content",".ul-empty",".ul-entry-changes",
            ".ul-entry-date",".ul-entry-header",".ul-entry-meta",".ul-entry-title",".ul-entry-version",
            ".ul-layout",".ul-loading",".ul-tab",".ul-tabstrip",".xpl-btn",".xpl-chevron",".xpl-divider",
            ".xpl-dropdown",".xpl-empty",".xpl-list",".xpl-menu",".xpl-new-icon",".xpl-new-row",".xpl-option",
            ":root","body",
    ];

    // Standard CSS properties, seeded from every property already used in
    // the project's CSS plus the rest of the common property surface, so
    // "css set" suggestions aren't limited to the ~10 most-used ones.
    const KNOWN_CSS_PROPS = [
"-moz-appearance","-ms-user-select","-webkit-appearance","-webkit-backdrop-filter",
            "-webkit-tap-highlight-color","-webkit-user-drag","-webkit-user-select","accent-color",
            "align-content","align-items","align-self","animation","animation-delay","animation-play-state",
            "appearance","aspect-ratio","backdrop-filter","backface-visibility","background","background-color",
            "background-image","background-position","background-repeat","background-size","border",
            "border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius",
            "border-bottom-width","border-color","border-left","border-left-color","border-radius",
            "border-right","border-style","border-top","border-top-right-radius","border-width","bottom",
            "box-shadow","box-sizing","caret-color","clip-path","color","column-gap","contain","content",
            "cursor","direction","display","filter","flex","flex-basis","flex-direction","flex-grow",
            "flex-shrink","flex-wrap","float","font-family","font-size","font-stretch","font-style",
            "font-variant-numeric","font-weight","gap","grid","grid-area","grid-column","grid-row",
            "grid-template-areas","grid-template-columns","grid-template-rows","height","hyphens","inset",
            "isolation","justify-content","justify-self","left","letter-spacing","line-height","list-style",
            "margin","margin-bottom","margin-left","margin-top","max-height","max-width","min-height",
            "min-width","mix-blend-mode","object-fit","object-position","opacity","order","outline",
            "outline-color","outline-offset","outline-style","overflow","overflow-wrap","overflow-x",
            "overflow-y","padding","padding-bottom","padding-left","padding-right","padding-top","perspective",
            "place-items","pointer-events","position","resize","right","row-gap","scroll-behavior",
            "scrollbar-color","scrollbar-width","tab-size","text-align","text-decoration",
            "text-decoration-color","text-indent","text-justify","text-overflow","text-shadow","text-transform",
            "top","transform","transform-origin","transition","transition-delay","transition-duration",
            "transition-property","transition-timing-function","translate","unicode-bidi","user-select",
            "vertical-align","visibility","white-space","width","will-change","word-break","word-spacing",
            "word-wrap","writing-mode","z-index",
    ];

    function suggestCssVars() {
        const fromRules = _lastCssRules.filter(r => r.property?.startsWith("--")).map(r => r.property);
        const known = ["--accent","--accent-dim","--accent-glow","--announcement-accent","--announcement-accent-soft",
            "--base-font","--bg-dark","--border","--on-accent","--panel-bg","--panel-blur","--panel-font-size",
            "--radius","--scrollbar-w","--surface","--ui-font-size"];
        return [...new Set([...known, ...fromRules, ...learned("cssVar")])];
    }
    function suggestCssSelectors() {
        const fromRules = _lastCssRules.map(r => r.selector);
        return [...new Set([...KNOWN_CSS_SELECTORS, ...fromRules, ...learned("selector")])];
    }
    function suggestCssProps() {
        const fromRules = _lastCssRules.map(r => r.property).filter(p => !p.startsWith("--"));
        return [...new Set([...KNOWN_CSS_PROPS, ...fromRules, ...learned("cssProp")])];
    }
    function suggestLsKeys() {
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) keys.push(localStorage.key(i));
        return keys;
    }
    function suggestEventNames() {
        return [...new Set(["whd:terminal-activate","whd:bugs:updated","whd:settings:changed","whd:scene:selected","whd:auth:login","whd:auth:logout", ...learned("event")])];
    }
    function suggestFunctionNames() {
        try {
            return Object.keys(window).filter(k => typeof window[k] === "function");
        } catch { return []; }
    }
    // ── Curated descriptions for well-known window paths/functions ──────────
    // Used to give "call"/"dispatch"/"read"/"write"/"inspect"/"watch" argument
    // suggestions a real one-line description instead of just a generic
    // label like "fn" or "path" — comparable to how VS Code shows a doc
    // string alongside a symbol in its autocomplete list.
    const KNOWN_PATH_DESCS = {
        "WHDAuth":                  "Authentication namespace — login state, role, session token",
        "WHDAuth.isLoggedIn":       "Returns true if a session token is currently set",
        "WHDAuth.isGuest":         "Returns true if browsing without an account",
        "WHDAuth.getUsername":     "Returns the current user's username, or null if logged out",
        "WHDAuth.getToken":        "Returns the raw session token string",
        "WHDAuth.getRole":         "Returns the current role: \"owner\", \"admin\", or \"user\"",
        "WHDAuth.isAdminOrAbove":  "Returns true if role is admin or owner",
        "WHDAuth.isOwner":         "Returns true if role is owner",
        "WHDAuth.workerUrl":       "Base URL of the Cloudflare Worker backend",
        "WHDAuth.scheduleSyncPush":"Debounced push of local settings/bookmarks/playlists to the worker",
        "WHDAuth.pushNow":         "Immediately push local data to the worker, skipping the debounce",
        "WHDAuth.pullAndApply":    "Fetch this user's saved data from the worker and apply it locally",
        "WHDAuth.checkMaintenance":"Ask the worker whether maintenance mode is currently active",
        "WHDAuth.openModal":       "Open the login/signup modal",
        "WHDAuth.logout":          "Clear the session token and log the current user out",
        "WHDAuth.requireLogin":    "Run a callback once logged in, opening the auth modal first if needed",
        "WHDAdmin":                 "Owner-terminal engine — shared by the admin panel and owner panel",
        "WHDAdmin.run":            "Execute a terminal command string exactly as if typed and run",
        "WHDAdmin.print":          "Print a line of text into the terminal output",
        "WHDAdmin.match":          "Resolve an array of typed tokens to the TERM_COMMANDS entry they match",
        "WHDAdmin.confirm":        "Open the shared yes/no confirmation dialog",
        "WHDAdmin.history":        "Array of previously run terminal commands, most-recent-last",
        "WHDAdmin.watchInterval":  "Active setInterval handle for the 'watch' command, if any",
        "WHDAdmin.commands":       "The full TERM_COMMANDS registry array",
        "WHDOwnerPanel":           "Controls the standalone owner terminal overlay",
        "WHDOwnerPanel.open":      "Open the owner terminal overlay",
        "WHDOwnerPanel.close":     "Close the owner terminal overlay",
        "WHD_FLAGS":                "Currently active feature flags, synced from the worker",
        "setMapStyle":             "Switch the Leaflet basemap style (dark/light/satellite/terrain/streets)",
        "whdMap":                  "The live Leaflet map instance",
        "whdMap.getZoom":          "Returns the map's current zoom level",
        "whdMap.setZoom":          "Set the map's zoom level",
    };
    function pathDesc(path) { return KNOWN_PATH_DESCS[path] || ""; }

    // Deep path suggestions: top-level window keys + known nested paths
    function suggestWindowPaths() {
        const paths = [];
        try {
            Object.keys(window).forEach(k => {
                if (k.startsWith("_") || k.length > 40) return;
                paths.push(k);
                const v = window[k];
                if (v && typeof v === "object" && !Array.isArray(v)) {
                    try {
                        Object.keys(v).slice(0, 20).forEach(sub => {
                            if (!sub.startsWith("_")) paths.push(`${k}.${sub}`);
                        });
                    } catch {}
                }
            });
        } catch {}
        // Always include known WHD paths
        ["WHD_FLAGS","WHDAuth","WHDAuth.role","WHDAuth.username","WHDAuth.token",
         "WHDAuth.isLoggedIn","WHDAuth.getRole","WHDAuth.getUsername",
         "setMapStyle","whdMap","whdMap.getZoom","whdMap.setZoom"].forEach(p => {
            if (!paths.includes(p)) paths.push(p);
        });
        return [...new Set([...paths, ...learned("windowPath")])]
            .map(p => pathDesc(p) ? { value: p, desc: pathDesc(p) } : p);
    }
    function suggestWindowFnPaths() {
        const paths = [];
        try {
            Object.keys(window).forEach(k => {
                if (k.startsWith("_") || k.length > 40) return;
                if (typeof window[k] === "function") { paths.push(k); return; }
                const v = window[k];
                if (v && typeof v === "object" && !Array.isArray(v)) {
                    try {
                        Object.keys(v).slice(0, 20).forEach(sub => {
                            if (!sub.startsWith("_") && typeof v[sub] === "function") paths.push(`${k}.${sub}`);
                        });
                    } catch {}
                }
            });
        } catch {}
        ["WHDAuth.pullAndApply","WHDAuth.requireLogin","WHDAuth.logout","setMapStyle"].forEach(p => {
            if (!paths.includes(p)) paths.push(p);
        });
        return [...new Set([...paths, ...learned("fnPath")])]
            .map(p => pathDesc(p) ? { value: p, desc: pathDesc(p) } : p);
    }
    function suggestAnnounceTypes() { return ["info","warning","success","error","update","event"]; }
    function suggestUserRoles()     { return ["admin","user"]; }
    function suggestBooleans()      { return ["true","false"]; }
    function suggestMapStyles()     { return ["dark","light","satellite","terrain","streets"]; }
    function suggestSortOrders()    { return ["asc","desc"]; }
    function suggestSceneYears() {
        const years = new Set();
        termAllActiveScenes().forEach(m => {
            if (m.scene.startYear != null) years.add(String(m.scene.startYear));
            if (m.scene.endYear   != null) years.add(String(m.scene.endYear));
        });
        return [...years].sort((a,b) => Number(a)-Number(b));
    }

    // ── Find suggestion: show id + name so you know what you're picking ─────
    function suggestFindTerms() {
        const names    = termAllActiveScenes().map(m => m.scene.name).filter(Boolean);
        const countries= suggestCountries();
        const seasons  = suggestSeasons();
        return [...new Set([...names, ...countries, ...seasons])].sort();
    }

    // ── Tree node name suggestions (all node names in the world tree) ───────
    function suggestTreeNodes() {
        const names = [];
        function collect(nodes) {
            (nodes || []).forEach(n => {
                names.push(n.name);
                if (n.children) collect(n.children);
            });
        }
        if (typeof world !== "undefined") collect(world.children);
        return [...new Set(names)].sort();
    }

    // Exposed so commands.js (loaded after this script) can build TERM_COMMANDS
    // without duplicating any suggestion logic. These all stay live/learned —
    // moving the registry out doesn't change where the data comes from.
    window.WHDTermSuggest = {
        suggestDbKeys, suggestSceneIds, suggestSceneIdsRich, suggestDeletedSceneIds,
        suggestCountries, suggestSeasons, suggestRegions, suggestContinents, suggestSceneNames,
        suggestSceneFields, suggestUsernames, suggestFlags, suggestCssVars, suggestCssSelectors,
        suggestCssProps, suggestLsKeys, suggestEventNames, suggestFunctionNames,
        suggestWindowPaths, suggestWindowFnPaths, suggestAnnounceTypes, suggestUserRoles,
        suggestBooleans, suggestMapStyles, suggestSortOrders, suggestSceneYears, suggestFindTerms,
        suggestTreeNodes,
    };

    // TERM_COMMANDS now lives in commands.js, loaded via a <script> tag
    // right after this file (see window.WHDTermSuggest above for why the
    // load order matters). Nothing else in this file needs to change —
    // initTerminal() below still just reads the global TERM_COMMANDS.

    let _termHistory = [];
    let _watchInterval = null; // active watch() timer, cleared on next command

    function termAllActiveScenes() {
        let all = [];
        for (const [dbKey, info] of Object.entries(DB_MAP)) {
            info.getArr().forEach(s => { if (!deletedIds.has(s.id)) all.push({ dbKey, scene: s }); });
        }
        return all;
    }

    async function termSoftDeleteMany(matches, label) {
        if (matches.length === 0) { termPrint(`No active scenes matched ${label}.`, "term-err"); return; }
        const ok = await showConfirm({
            icon: "🗑️",
            title: `Delete ${matches.length} scene${matches.length !== 1 ? "s" : ""}?`,
            msg: `Soft-delete ${matches.length} scene(s) matching ${label}: ${matches.slice(0,5).map(m => m.scene.name).join(", ")}${matches.length > 5 ? "…" : ""}`,
            okLabel: "Delete All", okClass: "admin-btn-danger"
        });
        if (!ok) { termPrint("Cancelled.", "term-info"); return; }
        for (const { dbKey, scene: s } of matches) {
            deletedIds.add(s.id);
            const arr = DB_MAP[dbKey].getArr();
            const idx = arr.findIndex(x => x.id === s.id);
            if (idx !== -1) { deletedSceneStore[s.id] = { ...arr[idx], _dbKey: dbKey }; arr.splice(idx, 1); }
            const si = scenes.findIndex(x => x.id === s.id);
            if (si !== -1) scenes.splice(si, 1);
        }
        persistDeleted();
        lsSet("whd_deleted_scene_store", deletedSceneStore);
        lsSet(LS_SCENES, (lsGet(LS_SCENES) || []).filter(x => !matches.some(m => m.scene.id === x.id)));
        termPrint(`✔ Deleted ${matches.length} scene(s) matching ${label}.`, "term-ok");
        refreshManageList();
        refreshDeletedList();
    }

    async function runTermCommand(raw) {
        const cmd = raw.trim();
        if (!cmd) return;
        termPrint("> " + cmd, "term-cmd");
        // "all" suffix modifier — strip the trailing token and set a flag that
        // truncating commands check to decide whether to show every result.
        const _parts0 = cmd.split(/\s+/);
        const _showAll = _parts0[_parts0.length - 1].toLowerCase() === "all" && _parts0.length > 1;
        const parts = _showAll ? _parts0.slice(0, -1) : _parts0;
        const verb = (parts[0] || "").toLowerCase();
        const noun = (parts[1] || "").toLowerCase();
        const arg  = parts.slice(2).join(" ");

        // Stop any running watch() unless the new command is also watch
        if (verb !== "watch" && _watchInterval) {
            clearInterval(_watchInterval);
            _watchInterval = null;
            termPrint("(watch stopped)", "term-info");
        }

        try {
            // ── General ────────────────────────────────────────────────────────
            if (verb === "clear") { document.getElementById("adminTermOutput").innerHTML = ""; return; }

            if (verb === "history") {
                if (!_termHistory.length) { termPrint("No history yet.", "term-info"); return; }
                const histLimit = 50;
                (_showAll ? _termHistory : _termHistory.slice(0, histLimit))
                    .forEach((h, i) => termPrint(`  ${i + 1}  ${h}`, "term-info"));
                if (!_showAll && _termHistory.length > histLimit)
                    termPrint(`… and ${_termHistory.length - histLimit} more. Add "all" to see full history.`, "term-info");
                return;
            }

            if (verb === "ping") {
                const t0 = performance.now();
                const res = await fetch(WORKER_URL + "/data").catch(() => null);
                const ms = Math.round(performance.now() - t0);
                if (res && res.ok) termPrint(`✔ Worker responded in ${ms}ms`, "term-ok");
                else termPrint(`✖ Worker unreachable (${ms}ms)`, "term-err");
                return;
            }

            // NOTE: must exclude "reload page" — it has its own dedicated
            // handler further down (hard page refresh), otherwise this
            // generic one (worker re-sync) intercepts it first.
            if (verb === "reload" && noun !== "page") {
                termPrint("Reloading from worker…", "term-info");
                fetchSharedAdminData();
                termPrint("✔ Sync queued.", "term-ok");
                return;
            }

            // ── Scene: Query ────────────────────────────────────────────────
            if (verb === "stat") {
                Object.entries(DB_MAP).forEach(([k, info]) => {
                    const active = info.getArr().filter(s => !deletedIds.has(s.id)).length;
                    termPrint(`${info.label} (${k}): ${active} active`, "term-info");
                });
                termPrint(`Total deleted: ${deletedIds.size}`, "term-info");
                return;
            }

            if (verb === "list" && noun === "dbs") {
                Object.entries(DB_MAP).forEach(([k, info]) =>
                    termPrint(`${info.label} (${k}): ${info.getArr().filter(s => !deletedIds.has(s.id)).length} active`, "term-info")
                );
                return;
            }

            if (verb === "list" && noun === "duplicates") {
                // Check for duplicates across three dimensions:
                //   name  — case-insensitive title clash
                //   id    — ID collision (should never happen, but catch it)
                //   coords — two scenes sharing the exact same lat/lng (likely copy-paste error)
                const nameMap = {}, idMap = {}, coordMap = {};
                termAllActiveScenes().forEach(({ dbKey, scene: s }) => {
                    const nameKey  = (s.name || "").trim().toLowerCase();
                    const idKey    = (s.id   || "").trim().toLowerCase();
                    const coordKey = Array.isArray(s.coords) && s.coords[0] != null
                        ? `${s.coords[0]},${s.coords[1]}` : null;
                    if (nameKey)  (nameMap[nameKey]  = nameMap[nameKey]  || []).push({ id: s.id, name: s.name,  db: DB_MAP[dbKey].label });
                    if (idKey)    (idMap[idKey]      = idMap[idKey]      || []).push({ id: s.id, name: s.name,  db: DB_MAP[dbKey].label });
                    if (coordKey) (coordMap[coordKey]= coordMap[coordKey]|| []).push({ id: s.id, name: s.name,  db: DB_MAP[dbKey].label });
                });
                const nameDups  = Object.entries(nameMap).filter(([,a]) => a.length > 1);
                const idDups    = Object.entries(idMap).filter(([,a]) => a.length > 1);
                const coordDups = Object.entries(coordMap).filter(([,a]) => a.length > 1);
                const total = nameDups.length + idDups.length + coordDups.length;
                if (!total) { termPrint("✔ No duplicates found (name, id, coords).", "term-ok"); return; }
                const dupLimit = 20;
                let shown = 0;
                const printGroup = (label, pairs) => {
                    if (!pairs.length) return;
                    termPrint(`── ${label} ──`, "term-info");
                    const toShow = _showAll ? pairs : pairs.slice(0, Math.max(1, dupLimit - shown));
                    toShow.forEach(([key, scenes]) => {
                        termPrint(`  ⚠ "${key}" ×${scenes.length}`, "term-err");
                        scenes.forEach(sc => termPrint(`      ${sc.id}  ·  ${sc.name}  ·  ${sc.db}`, "term-info"));
                    });
                    shown += toShow.length;
                };
                printGroup("Duplicate Names",  nameDups);
                printGroup("Duplicate IDs",    idDups);
                printGroup("Duplicate Coords", coordDups);
                if (!_showAll && total > dupLimit)
                    termPrint(`… and ${total - dupLimit} more. Add "all" to see every duplicate.`, "term-info");
                termPrint(`(${total} duplicate group${total!==1?"s":""} found)`, "term-info");
                return;
            }

            if (verb === "list" && noun === "country") {
                if (!arg) { termPrint("Usage: list country <name>", "term-err"); return; }
                const hits = termAllActiveScenes().filter(({ scene: s }) => (s.country||"").toLowerCase() === arg.toLowerCase());
                if (!hits.length) { termPrint(`No active scenes for country "${arg}".`, "term-err"); return; }
                const lcLimit = 30;
                (_showAll ? hits : hits.slice(0, lcLimit))
                    .forEach(({ dbKey, scene: s }) => termPrint(`${s.id}  ·  ${s.name}  ·  ${s.season||""}  ·  ${DB_MAP[dbKey].label}`, "term-info"));
                if (!_showAll && hits.length > lcLimit)
                    termPrint(`… and ${hits.length - lcLimit} more. Add "all" to see every scene.`, "term-info");
                else termPrint(`(${hits.length} scene${hits.length!==1?"s":""})`, "term-info");
                return;
            }

            if (verb === "list" && noun === "season") {
                if (!arg) { termPrint("Usage: list season <name>", "term-err"); return; }
                const hits = termAllActiveScenes().filter(({ scene: s }) => (s.season||"").toLowerCase() === arg.toLowerCase());
                if (!hits.length) { termPrint(`No scenes in season "${arg}".`, "term-err"); return; }
                const lsLimit = 30;
                (_showAll ? hits : hits.slice(0, lsLimit))
                    .forEach(({ dbKey, scene: s }) => termPrint(`${s.id}  ·  ${s.name}  ·  ${s.country||""}  ·  ${DB_MAP[dbKey].label}`, "term-info"));
                if (!_showAll && hits.length > lsLimit)
                    termPrint(`… and ${hits.length - lsLimit} more. Add "all" to see every scene.`, "term-info");
                else termPrint(`(${hits.length} scene${hits.length!==1?"s":""})`, "term-info");
                return;
            }

            if (verb === "find") {
                const q = parts.slice(1).join(" ").toLowerCase();
                if (!q) { termPrint("Usage: find <query>", "term-err"); return; }
                const hits = termAllActiveScenes().filter(({ scene: s }) =>
                    (s.name||"").toLowerCase().includes(q) ||
                    (s.country||"").toLowerCase().includes(q) ||
                    (s.season||"").toLowerCase().includes(q) ||
                    s.id.toLowerCase().includes(q)
                );
                if (!hits.length) { termPrint(`No scenes matched "${q}".`, "term-err"); return; }
                (_showAll ? hits : hits.slice(0, 25)).forEach(({ dbKey, scene: s }) =>
                    termPrint(`${s.id}  ·  ${s.name}  ·  ${s.country||""}  ·  ${DB_MAP[dbKey].label}`, "term-info")
                );
                if (!_showAll && hits.length > 25) termPrint(`… and ${hits.length - 25} more. Add "all" to the end to see everything.`, "term-info");
                return;
            }

            if (verb === "info") {
                const sceneId = parts[1];
                if (!sceneId) { termPrint("Usage: info <sceneId>", "term-err"); return; }
                const found = getSceneById(sceneId);
                if (!found) { termPrint(`Scene "${sceneId}" not found.`, "term-err"); return; }
                termPrint(`── ${found.scene.name} (${sceneId}) ── db: ${DB_MAP[found.dbKey].label}`, "term-info");
                Object.entries(found.scene).filter(([k]) => !k.startsWith("_"))
                    .forEach(([k, v]) => termPrint(`  ${k}: ${JSON.stringify(v)}`, "term-info"));
                return;
            }

            if (verb === "diff") {
                const idA = parts[1], idB = parts[2];
                if (!idA || !idB) { termPrint("Usage: diff <sceneId> <sceneId>", "term-err"); return; }
                const a = getSceneById(idA), b = getSceneById(idB);
                if (!a) { termPrint(`Scene "${idA}" not found.`, "term-err"); return; }
                if (!b) { termPrint(`Scene "${idB}" not found.`, "term-err"); return; }
                const keys = new Set([...Object.keys(a.scene), ...Object.keys(b.scene)].filter(k => !k.startsWith("_")));
                let any = false;
                termPrint(`── Diff: ${idA} vs ${idB} ──`, "term-info");
                keys.forEach(k => {
                    const av = JSON.stringify(a.scene[k]), bv = JSON.stringify(b.scene[k]);
                    if (av !== bv) {
                        any = true;
                        termPrint(`  ${k}:`, "term-info");
                        termPrint(`    ${idA}: ${av}`, "term-err");
                        termPrint(`    ${idB}: ${bv}`, "term-ok");
                    }
                });
                if (!any) termPrint("  No differences.", "term-info");
                return;
            }

            // ── Scene: Edit ─────────────────────────────────────────────────
            if (verb === "rename") {
                const sceneId = parts[1], newName = parts.slice(2).join(" ");
                if (!sceneId || !newName) { termPrint("Usage: rename <sceneId> <newName>", "term-err"); return; }
                const found = getSceneById(sceneId);
                if (!found) { termPrint(`Scene "${sceneId}" not found.`, "term-err"); return; }
                const ok = await showConfirm({ icon:"✏️", title:"Rename scene?", msg:`"${found.scene.name}" → "${newName}"`, okLabel:"Rename", okClass:"admin-btn-primary" });
                if (!ok) { termPrint("Cancelled.", "term-info"); return; }
                found.scene.name = newName;
                found.scene._adminEdited = true;
                persistScenes(); refreshManageList();
                termPrint(`✔ Renamed to "${newName}".`, "term-ok");
                return;
            }

            if (verb === "move") {
                const sceneId = parts[1], targetDb = (parts[2] || "").toLowerCase();
                if (!sceneId || !targetDb) { termPrint("Usage: move <sceneId> <db>", "term-err"); return; }
                if (!DB_MAP[targetDb]) { termPrint(`Unknown db "${targetDb}". Options: ${Object.keys(DB_MAP).join(", ")}`, "term-err"); return; }
                const found = getSceneById(sceneId);
                if (!found) { termPrint(`Scene "${sceneId}" not found.`, "term-err"); return; }
                if (found.dbKey === targetDb) { termPrint(`Already in "${targetDb}".`, "term-info"); return; }
                // Safety: moving into a db that already has a scene with this ID
                // would leave two scenes sharing one ID in the same array — every
                // ID-based lookup (getSceneById, map markers, etc.) only ever finds
                // the first one, so the second becomes silently uneditable/unreachable.
                // Block it instead of corrupting the data.
                if (DB_MAP[targetDb].getArr().some(s => s.id === sceneId)) {
                    termPrint(`✖ "${targetDb}" already has a scene with ID "${sceneId}". Rename one first (or use "clone") to avoid a duplicate-ID conflict.`, "term-err");
                    return;
                }
                const ok = await showConfirm({ icon:"📦", title:"Move scene?", msg:`Move "${found.scene.name}" → ${DB_MAP[targetDb].label}?`, okLabel:"Move", okClass:"admin-btn-primary" });
                if (!ok) { termPrint("Cancelled.", "term-info"); return; }
                const srcArr = DB_MAP[found.dbKey].getArr();
                srcArr.splice(srcArr.findIndex(s => s.id === sceneId), 1);
                const clone = { ...found.scene, _dbKey: targetDb, _adminEdited: true };
                DB_MAP[targetDb].getArr().push(clone);
                const si = scenes.findIndex(s => s.id === sceneId);
                if (si !== -1) scenes[si] = clone; else scenes.push(clone);
                persistScenes(); refreshManageList();
                termPrint(`✔ Moved "${found.scene.name}" to ${DB_MAP[targetDb].label}.`, "term-ok");
                return;
            }

            // NOTE: must exclude the multi-word "set X" commands below — they
            // have their own dedicated handlers further down, but since every
            // branch here is a plain `if` that returns, this generic one would
            // otherwise always intercept them first (e.g. "set years S1 2000
            // 2024" would be parsed as sceneId="years", field="S1", which
            // always fails). Those commands were completely unreachable.
            const SET_SUBCOMMANDS = ["years", "coords", "zoom", "country", "season", "continent", "var"];
            if (verb === "set" && !SET_SUBCOMMANDS.includes(noun)) {
                const sceneId = parts[1], field = parts[2], value = parts.slice(3).join(" ");
                if (!sceneId || !field || value === "") { termPrint("Usage: set <sceneId> <field> <value>", "term-err"); return; }
                const found = getSceneById(sceneId);
                if (!found) { termPrint(`Scene "${sceneId}" not found.`, "term-err"); return; }
                // Safety: "set <id> id <newId>" changing the ID in place is one of
                // the few fields where a typo/collision silently corrupts data —
                // two scenes sharing an ID means every ID-based lookup elsewhere
                // in the app (map markers, getSceneById, etc.) only ever resolves
                // the first match. Block collisions outright.
                if (field === "id") {
                    if (!value.trim()) { termPrint("Scene ID can't be empty.", "term-err"); return; }
                    if (getSceneById(value)) { termPrint(`✖ ID "${value}" is already in use by another scene. Choose a different ID.`, "term-err"); return; }
                }
                let parsed = value;
                if (!isNaN(Number(value))) parsed = Number(value);
                else if (value === "true") parsed = true;
                else if (value === "false") parsed = false;
                found.scene[field] = parsed;
                found.scene._adminEdited = true;
                persistScenes(); refreshManageList();
                learnRemember("field", field);
                termPrint(`✔ Set ${sceneId}.${field} = ${JSON.stringify(parsed)}`, "term-ok");
                return;
            }

            if (verb === "replace") {
                const targetId = parts[1], sourceId = parts[2];
                if (!targetId || !sourceId) { termPrint("Usage: replace <targetId> <sourceId>", "term-err"); return; }
                const targetFound = getSceneById(targetId), sourceFound = getSceneById(sourceId);
                if (!targetFound) { termPrint(`Target "${targetId}" not found.`, "term-err"); return; }
                if (!sourceFound) { termPrint(`Source "${sourceId}" not found.`, "term-err"); return; }
                const ok = await showConfirm({ icon:"🔁", title:"Replace scene data?", msg:`"${targetFound.scene.name}" (${targetId}) ← data from "${sourceFound.scene.name}" (${sourceId})`, okLabel:"Replace", okClass:"admin-btn-warn" });
                if (!ok) { termPrint("Cancelled.", "term-info"); return; }
                const targetArr = DB_MAP[targetFound.dbKey].getArr();
                const idx = targetArr.findIndex(s => s.id === targetId);
                const merged = { ...JSON.parse(JSON.stringify(sourceFound.scene)), id: targetId, _adminEdited: true };
                delete merged._adminAdded; delete merged._dbKey;
                targetArr[idx] = merged;
                const si = scenes.findIndex(s => s.id === targetId);
                const tracked = { ...merged, _dbKey: targetFound.dbKey };
                if (si !== -1) scenes[si] = tracked; else scenes.push(tracked);
                persistScenes(); refreshManageList();
                termPrint(`✔ Replaced "${targetId}" with data from "${sourceId}".`, "term-ok");
                return;
            }

            // ── Scene: Bulk ─────────────────────────────────────────────────
            if (verb === "delete" && noun === "country") {
                if (!arg) { termPrint("Usage: delete country <name>", "term-err"); return; }
                await termSoftDeleteMany(termAllActiveScenes().filter(({ scene: s }) => (s.country||"").toLowerCase() === arg.toLowerCase()), `country "${arg}"`);
                return;
            }
            if (verb === "delete" && noun === "season") {
                if (!arg) { termPrint("Usage: delete season <name>", "term-err"); return; }
                await termSoftDeleteMany(termAllActiveScenes().filter(({ scene: s }) => (s.season||"").toLowerCase() === arg.toLowerCase()), `season "${arg}"`);
                return;
            }
            if (verb === "delete" && noun === "db") {
                const dbKey = arg.toLowerCase();
                if (!DB_MAP[dbKey]) { termPrint(`Unknown db "${arg}". Options: ${Object.keys(DB_MAP).join(", ")}`, "term-err"); return; }
                await termSoftDeleteMany(DB_MAP[dbKey].getArr().filter(s => !deletedIds.has(s.id)).map(s => ({ dbKey, scene: s })), `database "${DB_MAP[dbKey].label}"`);
                return;
            }

            // NOTE: must exclude "restore all" — it has its own dedicated
            // handler further down, otherwise this generic one intercepts it
            // first (sceneId would be parsed as the literal string "all").
            if (verb === "restore" && noun !== "all") {
                const sceneId = parts[1];
                if (!sceneId) { termPrint("Usage: restore <sceneId>", "term-err"); return; }
                if (!deletedIds.has(sceneId)) { termPrint(`"${sceneId}" is not in the deleted list.`, "term-err"); return; }
                const stored = deletedSceneStore[sceneId];
                if (!stored) { termPrint(`No backup found for "${sceneId}".`, "term-err"); return; }
                deletedIds.delete(sceneId);
                persistDeleted();
                const arr = DB_MAP[stored._dbKey] ? DB_MAP[stored._dbKey].getArr() : null;
                if (arr && !arr.find(x => x.id === sceneId)) arr.push({ ...stored });
                if (!scenes.find(x => x.id === sceneId)) scenes.push({ ...stored });
                refreshDeletedList(); refreshManageList();
                termPrint(`✔ Restored "${stored.name}".`, "term-ok");
                return;
            }

            if (verb === "purge" && noun === "all") {
                const ids = Array.from(deletedIds);
                if (!ids.length) { termPrint("Nothing to purge.", "term-info"); return; }
                const ok = await showConfirm({ icon:"💀", title:`Permanently delete ${ids.length} scene(s)?`, msg:"This purges every scene in the Deleted tab. Cannot be undone.", okLabel:"Purge All", okClass:"admin-btn-danger" });
                if (!ok) { termPrint("Cancelled.", "term-info"); return; }
                ids.forEach(sceneId => {
                    const stored = deletedSceneStore[sceneId];
                    deletedIds.delete(sceneId);
                    if (stored && DB_MAP[stored._dbKey]) {
                        const arr = DB_MAP[stored._dbKey].getArr();
                        const i = arr.findIndex(x => x.id === sceneId);
                        if (i !== -1) arr.splice(i, 1);
                    }
                    delete deletedSceneStore[sceneId];
                    const si = scenes.findIndex(x => x.id === sceneId);
                    if (si !== -1) scenes.splice(si, 1);
                });
                persistDeleted();
                lsSet("whd_deleted_scene_store", deletedSceneStore);
                lsSet(LS_SCENES, (lsGet(LS_SCENES) || []).filter(x => !ids.includes(x.id)));
                refreshDeletedList(); refreshManageList();
                termPrint(`✔ Purged ${ids.length} scene(s).`, "term-ok");
                return;
            }

            if (verb === "purge") {
                const sceneId = parts[1];
                if (!sceneId) { termPrint("Usage: purge <sceneId>", "term-err"); return; }
                if (!deletedIds.has(sceneId)) { termPrint(`"${sceneId}" is not in the deleted list.`, "term-err"); return; }
                const stored = deletedSceneStore[sceneId];
                const ok = await showConfirm({ icon:"💀", title:"Permanently delete?", msg:`Removes "${stored ? stored.name : sceneId}". Cannot be undone.`, okLabel:"Purge", okClass:"admin-btn-danger" });
                if (!ok) { termPrint("Cancelled.", "term-info"); return; }
                deletedIds.delete(sceneId);
                if (stored && DB_MAP[stored._dbKey]) {
                    const arr = DB_MAP[stored._dbKey].getArr();
                    const i = arr.findIndex(x => x.id === sceneId);
                    if (i !== -1) arr.splice(i, 1);
                }
                delete deletedSceneStore[sceneId];
                const si = scenes.findIndex(x => x.id === sceneId);
                if (si !== -1) scenes.splice(si, 1);
                persistDeleted();
                lsSet("whd_deleted_scene_store", deletedSceneStore);
                lsSet(LS_SCENES, (lsGet(LS_SCENES) || []).filter(x => x.id !== sceneId));
                refreshDeletedList(); refreshManageList();
                termPrint(`✔ Purged "${stored ? stored.name : sceneId}".`, "term-ok");
                return;
            }

            // ── Scene: Import/Export ────────────────────────────────────────
            // NOTE: must exclude "export csv" — it has its own dedicated
            // handler further down, otherwise this generic one intercepts it
            // first (dbFilter would be parsed as the literal string "csv").
            if (verb === "export" && noun !== "csv") {
                const dbFilter = parts[1] ? parts[1].toLowerCase() : null;
                if (dbFilter && !DB_MAP[dbFilter]) { termPrint(`Unknown db "${dbFilter}". Options: ${Object.keys(DB_MAP).join(", ")}`, "term-err"); return; }
                let data = termAllActiveScenes();
                if (dbFilter) data = data.filter(e => e.dbKey === dbFilter);
                const json = JSON.stringify(data.map(e => ({ ...e.scene, _dbKey: e.dbKey })), null, 2);
                const a = Object.assign(document.createElement("a"), {
                    href: URL.createObjectURL(new Blob([json], { type: "application/json" })),
                    download: `whd-scenes${dbFilter ? "-" + dbFilter : ""}-${Date.now()}.json`
                });
                a.click();
                termPrint(`✔ Exported ${data.length} scene(s).`, "term-ok");
                return;
            }

            if (verb === "import") {
                const jsonStr = parts.slice(1).join(" ");
                if (!jsonStr) { termPrint("Usage: import <json-array>", "term-err"); return; }
                let arr;
                try { arr = JSON.parse(jsonStr); } catch { termPrint("Invalid JSON.", "term-err"); return; }
                if (!Array.isArray(arr)) { termPrint("Expected a JSON array.", "term-err"); return; }
                const valid = arr.filter(s => s && s.id && s.name && s._dbKey && DB_MAP[s._dbKey]);
                const skipped = arr.length - valid.length;
                if (!valid.length) { termPrint("No valid scenes (each needs id, name, _dbKey).", "term-err"); return; }
                const ok = await showConfirm({ icon:"📥", title:`Import ${valid.length} scene(s)?`, msg:`Merges ${valid.length} scene(s). Existing matching IDs overwritten.${skipped ? ` (${skipped} invalid skipped)` : ""}`, okLabel:"Import", okClass:"admin-btn-primary" });
                if (!ok) { termPrint("Cancelled.", "term-info"); return; }
                let added = 0, updated = 0;
                valid.forEach(s => {
                    const { _dbKey, ...scene } = s;
                    scene._adminEdited = true;
                    const arr2 = DB_MAP[_dbKey].getArr();
                    const i = arr2.findIndex(x => x.id === scene.id);
                    if (i !== -1) { arr2[i] = scene; updated++; } else { arr2.push(scene); added++; }
                    const si = scenes.findIndex(x => x.id === scene.id);
                    const tracked = { ...scene, _dbKey };
                    if (si !== -1) scenes[si] = tracked; else scenes.push(tracked);
                });
                persistScenes(); refreshManageList();
                termPrint(`✔ Imported: ${added} added, ${updated} updated${skipped ? `, ${skipped} skipped` : ""}.`, "term-ok");
                return;
            }

            if (verb === "backup") {
                const active = termAllActiveScenes().map(e => ({ ...e.scene, _dbKey: e.dbKey, _deleted: false }));
                const deleted = Array.from(deletedIds).map(id => {
                    const stored = deletedSceneStore[id];
                    return stored ? { ...stored, _deleted: true } : null;
                }).filter(Boolean);
                const payload = { exportedAt: new Date().toISOString(), active, deleted };
                const json = JSON.stringify(payload, null, 2);
                const a = Object.assign(document.createElement("a"), {
                    href: URL.createObjectURL(new Blob([json], { type: "application/json" })),
                    download: `whd-backup-${Date.now()}.json`
                });
                a.click();
                termPrint(`✔ Backed up ${active.length} active + ${deleted.length} deleted scene(s).`, "term-ok");
                return;
            }

            // ── CSS ─────────────────────────────────────────────────────────
            if (verb === "css" && noun === "var" && parts[2] === "get") {
                const varName = parts[3];
                if (!varName) { termPrint("Usage: css var get <--varName>", "term-err"); return; }
                const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
                termPrint(val ? `${varName}: ${val}` : `"${varName}" is not currently set.`, val ? "term-info" : "term-err");
                return;
            }
            if (verb === "css" && noun === "var" && parts[2] === "remove") {
                const varName = parts[3];
                if (!varName) { termPrint("Usage: css var remove <--varName>", "term-err"); return; }
                // NOTE: the worker's remove_css action only filters by selector,
                // not by individual property — so this currently has to clear
                // every synced :root override, not just this one var. Flagging
                // this loudly rather than pretending it's surgical.
                const ok = await showConfirm({ icon:"⚠️", title:"Remove ALL :root overrides?", msg:`The worker can't remove a single CSS variable yet — only a whole selector. This will clear every synced :root override (not just ${varName}). Re-apply any others you want to keep afterward.`, okLabel:"Clear :root", okClass:"admin-btn-danger" });
                if (!ok) { termPrint("Cancelled.", "term-info"); return; }
                const res = await remoteConfigCall({ action: "remove_css", selector: ":root" });
                if (res.ok) { applyRemoteConfigToPage(res); termPrint(`✔ Cleared all :root overrides (including ${varName}).`, "term-ok"); }
                else termPrint("Error: " + (res.error || "request failed"), "term-err");
                return;
            }
            if (verb === "css" && noun === "var") {
                const varName = parts[2], varVal = parts.slice(3).join(" ");
                if (!varName || !varVal) { termPrint("Usage: css var <--varName> <value>", "term-err"); return; }
                const res = await remoteConfigCall({ action: "set_css", selector: ":root", property: varName, value: varVal });
                if (res.ok) { applyRemoteConfigToPage(res); learnRemember("cssVar", varName); termPrint(`✔ :root { ${varName}: ${varVal}; } (synced globally)`, "term-ok"); }
                else termPrint("Error: " + (res.error || "request failed"), "term-err");
                return;
            }
            if (verb === "css" && noun === "remove") {
                const selector = parts.slice(2).join(" ");
                if (!selector) { termPrint("Usage: css remove <selector>", "term-err"); return; }
                const res = await remoteConfigCall({ action: "remove_css", selector });
                if (res.ok) { applyRemoteConfigToPage(res); termPrint(`✔ Removed CSS for "${selector}".`, "term-ok"); }
                else termPrint("Error: " + (res.error || "request failed"), "term-err");
                return;
            }
            if (verb === "css" && noun === "list") {
                const res = await remoteConfigCall(null, true);
                if (!res.ok) { termPrint("Error: " + (res.error || "request failed"), "term-err"); return; }
                if (!res.cssRules?.length) { termPrint("No active CSS overrides.", "term-info"); return; }
                const cssLimit = 20;
                (_showAll ? res.cssRules : res.cssRules.slice(0, cssLimit))
                    .forEach(r => termPrint(`  ${r.selector} { ${r.property}: ${r.value}; }`, "term-info"));
                if (!_showAll && res.cssRules.length > cssLimit)
                    termPrint(`… and ${res.cssRules.length - cssLimit} more. Add "all" to see every rule.`, "term-info");
                return;
            }
            if (verb === "css" && noun === "clear") {
                const ok = await showConfirm({ icon:"🎨", title:"Clear all CSS overrides?", msg:"Removes every synced CSS override for all users.", okLabel:"Clear", okClass:"admin-btn-danger" });
                if (!ok) { termPrint("Cancelled.", "term-info"); return; }
                const res = await remoteConfigCall({ action: "clear_css" });
                if (res.ok) { applyRemoteConfigToPage(res); termPrint("✔ Cleared all CSS overrides.", "term-ok"); }
                else termPrint("Error: " + (res.error || "request failed"), "term-err");
                return;
            }
            if (verb === "css") {
                const selector = parts[1], property = parts[2], value = parts.slice(3).join(" ");
                if (!selector || !property || !value) {
                    termPrint("Usage: css <selector> <property> <value>", "term-err");
                    termPrint('  e.g.  css .admin-btn-primary background #ff0000', "term-info");
                    return;
                }
                const res = await remoteConfigCall({ action: "set_css", selector, property, value });
                if (res.ok) { applyRemoteConfigToPage(res); learnRemember("selector", selector); learnRemember("cssProp", property); termPrint(`✔ ${selector} { ${property}: ${value}; } (synced globally)`, "term-ok"); }
                else termPrint("Error: " + (res.error || "request failed"), "term-err");
                return;
            }

            // ── Flags ────────────────────────────────────────────────────────
            if (verb === "activate") {
                const flag = parts[1], valueRaw = parts.slice(2).join(" ");
                if (!flag) { termPrint("Usage: activate <flag> [value]", "term-err"); return; }
                let value = true;
                if (valueRaw) {
                    if (valueRaw === "true") value = true;
                    else if (valueRaw === "false") value = false;
                    else if (!isNaN(Number(valueRaw))) value = Number(valueRaw);
                    else value = valueRaw;
                }
                const res = await remoteConfigCall({ action: "set_flag", flag, value });
                if (res.ok) { applyRemoteConfigToPage(res); learnRemember("flag", flag); termPrint(`✔ "${flag}" = ${JSON.stringify(value)} (synced globally)`, "term-ok"); }
                else termPrint("Error: " + (res.error || "request failed"), "term-err");
                return;
            }
            if (verb === "flag" && noun === "list") {
                const res = await remoteConfigCall(null, true);
                if (!res.ok) { termPrint("Error: " + (res.error || "request failed"), "term-err"); return; }
                const entries = Object.entries(res.flags || {});
                if (!entries.length) { termPrint("No active flags.", "term-info"); return; }
                const flLimit = 20;
                (_showAll ? entries : entries.slice(0, flLimit))
                    .forEach(([k, v]) => termPrint(`  ${k} = ${JSON.stringify(v)}`, "term-info"));
                if (!_showAll && entries.length > flLimit)
                    termPrint(`… and ${entries.length - flLimit} more. Add "all" to see every flag.`, "term-info");
                return;
            }
            if (verb === "flag" && noun === "get") {
                const flag = parts[2];
                if (!flag) { termPrint("Usage: flag get <flag>", "term-err"); return; }
                const res = await remoteConfigCall(null, true);
                if (!res.ok) { termPrint("Error: " + (res.error || "request failed"), "term-err"); return; }
                if (!(flag in (res.flags || {}))) { termPrint(`"${flag}" is not currently active.`, "term-err"); return; }
                termPrint(`${flag} = ${JSON.stringify(res.flags[flag])}`, "term-info");
                return;
            }
            if (verb === "flag" && noun === "clear" && parts[2] === "all") {
                const ok = await showConfirm({ icon:"🚩", title:"Clear all flags?", msg:"Deactivates every flag for all users.", okLabel:"Clear All", okClass:"admin-btn-danger" });
                if (!ok) { termPrint("Cancelled.", "term-info"); return; }
                const res = await remoteConfigCall({ action: "clear_flags" });
                if (res.ok) { applyRemoteConfigToPage(res); termPrint("✔ Cleared all flags.", "term-ok"); }
                else termPrint("Error: " + (res.error || "request failed"), "term-err");
                return;
            }
            if (verb === "flag" && noun === "clear") {
                const flag = parts[2];
                if (!flag) { termPrint("Usage: flag clear <flag>", "term-err"); return; }
                const res = await remoteConfigCall({ action: "clear_flag", flag });
                if (res.ok) { applyRemoteConfigToPage(res); termPrint(`✔ Cleared flag "${flag}".`, "term-ok"); }
                else termPrint("Error: " + (res.error || "request failed"), "term-err");
                return;
            }

            // ── Runtime ──────────────────────────────────────────────────────
            if (verb === "dispatch") {
                const evtName = parts[1];
                if (!evtName) { termPrint("Usage: dispatch <eventName> [jsonPayload]", "term-err"); return; }
                let detail = {};
                const payloadRaw = parts.slice(2).join(" ");
                if (payloadRaw) { try { detail = JSON.parse(payloadRaw); } catch { termPrint("Invalid JSON payload.", "term-err"); return; } }
                window.dispatchEvent(new CustomEvent(evtName, { detail }));
                learnRemember("event", evtName);
                termPrint(`✔ Fired "${evtName}".`, "term-ok");
                return;
            }

            if (verb === "call") {
                const fnPath = parts[1];
                if (!fnPath) {
                    termPrint("Usage: call <fn.path> [arg1 arg2 …]", "term-err");
                    termPrint("", "term-info");
                    termPrint("Calls any function reachable on window. Args are auto-typed:", "term-info");
                    termPrint("  numbers → Number,  true/false → Boolean,  {…}/[…] → JSON,  else String", "term-info");
                    termPrint("", "term-info");
                    termPrint("  call WHDAuth.pullAndApply", "term-info");
                    termPrint("  call setMapStyle dark", "term-info");
                    termPrint("  call WHDAuth.promote username admin", "term-info");
                    return;
                }
                const fnArgs = parts.slice(2).map(a => {
                    if (!isNaN(Number(a)) && a !== "") return Number(a);
                    if (a === "true") return true;
                    if (a === "false") return false;
                    if ((a.startsWith("{") || a.startsWith("[")) && (a.endsWith("}") || a.endsWith("]"))) {
                        try { return JSON.parse(a); } catch {}
                    }
                    return a;
                });
                const segs = fnPath.split(".");
                let target = window;
                for (let i = 0; i < segs.length - 1; i++) { target = target?.[segs[i]]; }
                const fn = target?.[segs[segs.length - 1]];
                if (typeof fn !== "function") { termPrint(`"${fnPath}" is not a function on window.`, "term-err"); return; }
                try {
                    const result = await fn.apply(target, fnArgs);
                    let resultStr;
                    if (result === undefined) {
                        resultStr = "void";
                    } else {
                        try { resultStr = JSON.stringify(result); } catch { resultStr = String(result); }
                    }
                    termPrint(`✔ ${fnPath}(${fnArgs.map(a=>JSON.stringify(a)).join(", ")}) → ${resultStr}`, "term-ok");
                } catch (e) {
                    termPrint(`✗ ${fnPath} threw: ${e.message}`, "term-err");
                }
                return;
            }

            // ── window.read / window.write ───────────────────────────────────
            // Read any nested property on window: read WHDAuth.role
            if (verb === "read") {
                const path = parts[1];
                if (!path) {
                    termPrint("Usage: read <window.property.path>", "term-err");
                    termPrint("  Reads any nested property on window.", "term-info");
                    termPrint("  read WHD_FLAGS               → prints all flags", "term-info");
                    termPrint("  read WHDAuth.role", "term-info");
                    return;
                }
                const segs = path.split(".");
                let val = window;
                for (const s of segs) {
                    if (val == null) { termPrint(`"${path}" is undefined (null at .${s}).`, "term-err"); return; }
                    val = val[s];
                }
                if (val === undefined) { termPrint(`"${path}" is undefined.`, "term-info"); return; }
                if (typeof val === "object" && val !== null) {
                    // Pretty-print objects
                    const lines = JSON.stringify(val, null, 2).split("\n");
                    (_showAll ? lines : lines.slice(0, 40)).forEach(l => termPrint("  " + l, "term-info"));
                    if (!_showAll && lines.length > 40) termPrint(`  … (${lines.length - 40} more lines). Add "all" to see everything.`, "term-info");
                } else {
                    termPrint(`  ${path} = ${JSON.stringify(val)}  (${typeof val})`, "term-info");
                }
                return;
            }

            // Write a value to any nested path on window: write MY_CONFIG.debug true
            if (verb === "write") {
                const path = parts[1], rawVal = parts.slice(2).join(" ");
                if (!path || rawVal === "") {
                    termPrint("Usage: write <window.property.path> <value>", "term-err");
                    termPrint("  Writes a value to any nested property on window.", "term-info");
                    termPrint("  Values auto-typed: numbers, booleans, JSON objects/arrays, strings.", "term-info");
                    termPrint("  write MY_APP.debug true", "term-info");
                    termPrint("  write MY_APP.maxItems 50", "term-info");
                    termPrint("  write MY_CONFIG.theme dark", "term-info");
                    return;
                }
                let val;
                if (!isNaN(Number(rawVal)) && rawVal !== "") val = Number(rawVal);
                else if (rawVal === "true") val = true;
                else if (rawVal === "false") val = false;
                else if (rawVal === "null") val = null;
                else if (rawVal === "undefined") val = undefined;
                else {
                    try { val = JSON.parse(rawVal); } catch { val = rawVal; }
                }
                const segs = path.split(".");
                let target = window;
                for (let i = 0; i < segs.length - 1; i++) {
                    if (target[segs[i]] == null) target[segs[i]] = {};
                    target = target[segs[i]];
                }
                const key = segs[segs.length - 1];
                const prev = target[key];
                target[key] = val;
                learnRemember("windowPath", path);
                termPrint(`✔ ${path}: ${JSON.stringify(prev)} → ${JSON.stringify(val)}`, "term-ok");
                return;
            }

            // Inspect: enumerate properties of any window object
            if (verb === "inspect") {
                const path = parts[1];
                if (!path) {
                    termPrint("Usage: inspect <window.object.path>", "term-err");
                    termPrint("  Lists all properties and methods of any window object.", "term-info");
                    termPrint("  inspect WHDAuth    → shows all methods on WHDAuth", "term-info");
                    termPrint("  inspect WHD_FLAGS  → same as read WHD_FLAGS but shows types", "term-info");
                    return;
                }
                const segs = path.split(".");
                let obj = window;
                for (const s of segs) { obj = obj?.[s]; }
                if (obj == null) { termPrint(`"${path}" is ${obj === null ? "null" : "undefined"}.`, "term-err"); return; }
                const entries = [];
                // Own + prototype keys
                const seen = new Set();
                let proto = obj;
                while (proto && proto !== Object.prototype) {
                    Object.getOwnPropertyNames(proto).forEach(k => {
                        if (!k.startsWith("__") && !seen.has(k)) {
                            seen.add(k);
                            const type = typeof obj[k];
                            entries.push({ k, type, v: obj[k] });
                        }
                    });
                    proto = Object.getPrototypeOf(proto);
                }
                entries.sort((a, b) => {
                    // functions last, then alphabetical
                    if (a.type === "function" && b.type !== "function") return 1;
                    if (a.type !== "function" && b.type === "function") return -1;
                    return a.k.localeCompare(b.k);
                });
                termPrint(`── ${path} (${typeof obj}) ──`, "term-info");
                (_showAll ? entries : entries.slice(0, 60)).forEach(({ k, type, v }) => {
                    if (type === "function") {
                        termPrint(`  fn  ${k}()`, "term-info");
                    } else {
                        const display = v === null ? "null" : typeof v === "object" ? `{…}` : JSON.stringify(v);
                        termPrint(`  ${type.padEnd(8)} ${k.padEnd(22)} ${String(display).slice(0, 50)}`, "term-ok");
                    }
                });
                if (!_showAll && entries.length > 60) termPrint(`  … (${entries.length - 60} more). Add "all" to see everything.`, "term-info");
                return;
            }

            // eval: run arbitrary JS in the admin panel scope and print result
            if (verb === "eval") {
                const code = parts.slice(1).join(" ");
                if (!code) {
                    termPrint("Usage: eval <js expression>", "term-err");
                    termPrint("  Evaluates JS in the page scope. Use for quick checks.", "term-info");
                    termPrint("  eval document.title", "term-info");
                    termPrint("  eval WHD_FLAGS", "term-info");
                    termPrint("  eval Object.keys(WHDAuth)", "term-info");
                    return;
                }
                try {
                    // eslint-disable-next-line no-eval
                    const result = eval(code); // intentional — this is an admin-only terminal
                    if (result !== undefined) {
                        if (typeof result === "object" && result !== null) {
                            const lines = JSON.stringify(result, null, 2).split("\n");
                            (_showAll ? lines : lines.slice(0, 40)).forEach(l => termPrint("  " + l, "term-info"));
                            if (!_showAll && lines.length > 40) termPrint(`  … (${lines.length - 40} more lines). Add "all" to see everything.`, "term-info");
                        } else {
                            termPrint(`  → ${JSON.stringify(result)}  (${typeof result})`, "term-ok");
                        }
                    } else {
                        termPrint("  → undefined", "term-info");
                    }
                } catch (e) {
                    termPrint(`✗ ${e.message}`, "term-err");
                }
                return;
            }

            // watch: poll a window property every N seconds and print on change
            if (verb === "watch") {
                const path = parts[1], interval = parseInt(parts[2]) || 2;
                if (!path) {
                    termPrint("Usage: watch <window.property.path> [intervalSeconds]", "term-err");
                    termPrint("  Polls a window property every N seconds, prints when it changes.", "term-info");
                    termPrint("  Press any key or run another command to stop.", "term-info");
                    termPrint("  watch WHDAuth.role 1", "term-info");
                    return;
                }
                if (_watchInterval) { clearInterval(_watchInterval); _watchInterval = null; }
                const getVal = () => {
                    const segs = path.split(".");
                    let v = window;
                    for (const s of segs) v = v?.[s];
                    return JSON.stringify(v ?? null);
                };
                let last = getVal();
                termPrint(`Watching "${path}" every ${interval}s — run any command to stop.`, "term-info");
                termPrint(`  current: ${last}`, "term-info");
                _watchInterval = setInterval(() => {
                    const cur = getVal();
                    if (cur !== last) {
                        termPrint(`  ${path}: ${last} → ${cur}`, "term-ok");
                        last = cur;
                    }
                }, interval * 1000);
                return;
            }

            // fn: list callable functions on a window object
            if (verb === "fn") {
                const path = parts[1] || "";
                let obj = path ? window : window;
                if (path) {
                    const segs = path.split(".");
                    for (const s of segs) obj = obj?.[s];
                }
                if (obj == null) { termPrint(`"${path}" is null/undefined.`, "term-err"); return; }
                const fns = [];
                const seen = new Set();
                let proto = obj;
                while (proto && proto !== Object.prototype) {
                    Object.getOwnPropertyNames(proto).forEach(k => {
                        if (!seen.has(k) && typeof obj[k] === "function" && !k.startsWith("__")) {
                            seen.add(k);
                            fns.push(k);
                        }
                    });
                    proto = Object.getPrototypeOf(proto);
                }
                fns.sort();
                const fnLimit = 30;
                termPrint(`── functions on ${path || "window"} ──`, "term-info");
                (_showAll ? fns : fns.slice(0, fnLimit))
                    .forEach(k => termPrint(`  ${path ? path + "." : ""}${k}()`, "term-info"));
                if (!_showAll && fns.length > fnLimit)
                    termPrint(`… and ${fns.length - fnLimit} more. Add "all" to see every function.`, "term-info");
                termPrint(`(${fns.length} function${fns.length !== 1 ? "s" : ""})`, "term-info");
                return;
            }

            // ── Storage ──────────────────────────────────────────────────────
            if (verb === "ls") {
                const prefix = parts[1] || "";
                const keys = [];
                for (let i = 0; i < localStorage.length; i++) {
                    const k = localStorage.key(i);
                    if (!prefix || k.startsWith(prefix)) keys.push(k);
                }
                if (!keys.length) { termPrint(prefix ? `No keys starting with "${prefix}".` : "localStorage is empty.", "term-info"); return; }
                keys.sort().forEach(k => {
                    const v = localStorage.getItem(k);
                    termPrint(`  ${k}  =  ${v && v.length > 70 ? v.slice(0, 70) + "…" : v}`, "term-info");
                });
                termPrint(`(${keys.length} key${keys.length !== 1 ? "s" : ""})`, "term-info");
                return;
            }

            if (verb === "get") {
                const key = parts[1];
                if (!key) { termPrint("Usage: get <key>", "term-err"); return; }
                const val = localStorage.getItem(key);
                if (val === null) { termPrint(`Key "${key}" not found.`, "term-err"); return; }
                termPrint(val, "term-info");
                return;
            }

            if (verb === "set" && noun === "var") {
                const key = parts[2], val = parts.slice(3).join(" ");
                if (!key || !val) { termPrint("Usage: set var <key> <value>", "term-err"); return; }
                localStorage.setItem(key, val);
                termPrint(`✔ Set "${key}".`, "term-ok");
                return;
            }

            if (verb === "del") {
                const key = parts[1];
                if (!key) { termPrint("Usage: del <key>", "term-err"); return; }
                if (localStorage.getItem(key) === null) { termPrint(`Key "${key}" not found.`, "term-err"); return; }
                localStorage.removeItem(key);
                termPrint(`✔ Deleted "${key}".`, "term-ok");
                return;
            }

            // ── Users ────────────────────────────────────────────────────────
            if (verb === "user" && noun === "list") {
                const token = window.WHDAuth?.getToken();
                if (!token) { termPrint("Not authenticated.", "term-err"); return; }
                termPrint("Fetching users…", "term-info");
                const res = await fetch(WORKER_URL + "/auth/users", {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token })
                }).then(r => r.json()).catch(() => ({ ok: false }));
                if (!res.ok) { termPrint("Failed to fetch users.", "term-err"); return; }
                _adminAllUsers = res.users || [];
                if (!_adminAllUsers.length) { termPrint("No users found.", "term-info"); return; }
                const ulLimit = 30;
                (_showAll ? _adminAllUsers : _adminAllUsers.slice(0, ulLimit)).forEach(u => termPrint(
                    `  ${u.username.padEnd(20)} ${(u.role||"user").padEnd(8)} joined: ${u.joinedAt ? new Date(u.joinedAt).toLocaleDateString() : "?"}`, "term-info"
                ));
                if (!_showAll && _adminAllUsers.length > ulLimit)
                    termPrint(`… and ${_adminAllUsers.length - ulLimit} more. Add "all" to see every user.`, "term-info");
                termPrint(`(${_adminAllUsers.length} user${_adminAllUsers.length !== 1 ? "s" : ""})`, "term-info");
                return;
            }

            if (verb === "user" && noun === "info") {
                const username = parts[2];
                if (!username) { termPrint("Usage: user info <username>", "term-err"); return; }
                const u = _adminAllUsers.find(x => x.username.toLowerCase() === username.toLowerCase());
                if (!u) { termPrint(`"${username}" not in cache. Run "user list" first.`, "term-err"); return; }
                Object.entries(u).forEach(([k, v]) => termPrint(`  ${k}: ${JSON.stringify(v)}`, "term-info"));
                return;
            }

            if (verb === "user" && noun === "role") {
                const username = parts[2], newRole = (parts[3] || "").toLowerCase();
                if (!username || !newRole) { termPrint("Usage: user role <username> <admin|user>", "term-err"); return; }
                if (!["admin", "user"].includes(newRole)) { termPrint(`Invalid role "${newRole}". Use: admin, user`, "term-err"); return; }
                const res = await window.adminUsersSetRole(username, newRole);
                if (res && res.ok) {
                    termPrint(`✔ ${username} is now ${newRole}.`, "term-ok");
                    const cached = _adminAllUsers.find(u => u.username.toLowerCase() === username.toLowerCase());
                    if (cached) cached.role = newRole;
                } else {
                    termPrint(`✗ ${res?.error || "Failed to change role."}`, "term-err");
                }
                return;
            }

            if (verb === "user" && (noun === "ban" || noun === "unban")) {
                const username = parts[2];
                if (!username) { termPrint(`Usage: user ${noun} <username>`, "term-err"); return; }
                const newRole = noun === "ban" ? "banned" : "user";
                const confirmed = await showConfirm({
                    icon: noun === "ban" ? "🚫" : "✅",
                    title: `${noun === "ban" ? "Ban" : "Unban"} ${username}?`,
                    msg: `Sets ${username}'s role to "${newRole}".`,
                    okLabel: noun === "ban" ? "Ban" : "Unban",
                    okClass: noun === "ban" ? "admin-btn-danger" : "admin-btn-primary"
                });
                if (!confirmed) { termPrint("Cancelled.", "term-info"); return; }
                const res = await window.adminUsersSetRole(username, newRole);
                if (res && res.ok) {
                    termPrint(`✔ ${username} is now ${newRole}.`, "term-ok");
                    // Update local cache so user info reflects the change immediately
                    const cached = _adminAllUsers.find(u => u.username.toLowerCase() === username.toLowerCase());
                    if (cached) cached.role = newRole;
                } else {
                    termPrint(`✗ ${res?.error || "Failed to change role."}`, "term-err");
                }
                return;
            }

            // ── Announce ─────────────────────────────────────────────────────
            if (verb === "announce" && noun === "status") {
                const token = window.WHDAuth?.getToken();
                const r = await fetch(WORKER_URL + "/auth/announcement/status", {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token })
                }).then(x => x.json()).catch(() => ({ ok: false }));
                if (r.active && r.message) {
                    const to = Array.isArray(r.targets) && r.targets.length ? r.targets.join(", ") : "everyone";
                    termPrint(`Active: [${r.type||"info"}] ${r.message}  →  ${to}`, "term-ok");
                } else {
                    termPrint("No active announcement.", "term-info");
                }
                return;
            }

            if (verb === "announce" && noun === "clear") {
                const token = window.WHDAuth?.getToken();
                if (!token) { termPrint("Not authenticated.", "term-err"); return; }
                const r = await fetch(WORKER_URL + "/auth/announcement", {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token, message: "", type: "info", active: false })
                }).then(x => x.json()).catch(() => ({ ok: false }));
                if (r.ok) termPrint("✔ Announcement cleared.", "term-ok");
                else termPrint("Error: " + (r.error || "request failed"), "term-err");
                return;
            }

            // NOTE: must exclude "announce user" — it has its own dedicated
            // handler further down (targeted announcement to one user),
            // otherwise this generic one (global announcement) intercepts it
            // first, since "user" isn't one of the recognized TYPES below.
            if (verb === "announce" && noun !== "user") {
                // announce <type> <message…>  — type is optional, defaults to "info"
                const TYPES = ["info","warning","success","error","update","event"];
                let type = "info", msgParts = parts.slice(1);
                if (TYPES.includes(noun)) { type = noun; msgParts = parts.slice(2); }
                const message = msgParts.join(" ");
                if (!message) { termPrint("Usage: announce [type] <message>", "term-err"); termPrint(`  types: ${TYPES.join(", ")}`, "term-info"); return; }
                const token = window.WHDAuth?.getToken();
                if (!token) { termPrint("Not authenticated.", "term-err"); return; }
                const r = await fetch(WORKER_URL + "/auth/announcement", {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token, message, type, active: true, targets: [] })
                }).then(x => x.json()).catch(() => ({ ok: false }));
                if (r.ok) termPrint(`✔ Published [${type}]: "${message}"`, "term-ok");
                else termPrint("Error: " + (r.error || "request failed"), "term-err");
                return;
            }

            // ── Maintenance ──────────────────────────────────────────────────
            if (verb === "maintenance" && noun === "status") {
                const d = await fetch(WORKER_URL + "/auth/maintenance/status").then(r => r.json()).catch(() => ({}));
                termPrint(`Maintenance mode: ${d.maintenance ? "ON 🚧" : "OFF ✅"}`, d.maintenance ? "term-err" : "term-ok");
                return;
            }

            if (verb === "maintenance" && (noun === "on" || noun === "off")) {
                const newState = noun === "on";
                const token = window.WHDAuth?.getToken();
                if (!token) { termPrint("Not authenticated.", "term-err"); return; }
                const ok = await showConfirm({
                    icon: "🚧", title: `${newState ? "Enable" : "Disable"} maintenance mode?`,
                    msg: newState ? "Regular users will be blocked from accessing the site." : "The site will be accessible to all users again.",
                    okLabel: newState ? "Enable" : "Disable",
                    okClass: newState ? "admin-btn-danger" : "admin-btn-primary"
                });
                if (!ok) { termPrint("Cancelled.", "term-info"); return; }
                const res = await fetch(WORKER_URL + "/auth/maintenance", {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token, on: newState })
                }).then(r => r.json()).catch(() => ({ ok: false }));
                if (res.ok) termPrint(`✔ Maintenance mode ${newState ? "ON 🚧" : "OFF ✅"}`, "term-ok");
                else termPrint("Error: " + (res.error || "request failed"), "term-err");
                return;
            }

            // ── Scene: Extended Query ────────────────────────────────────────
            if (verb === "list" && noun === "continent") {
                if (!arg) { termPrint("Usage: list continent <name>", "term-err"); return; }
                const hits = termAllActiveScenes().filter(({ scene: s }) => (s.continent||"").toLowerCase() === arg.toLowerCase());
                if (!hits.length) { termPrint(`No active scenes for continent "${arg}".`, "term-err"); return; }
                const lcontLimit = 30;
                (_showAll ? hits : hits.slice(0, lcontLimit))
                    .forEach(({ dbKey, scene: s }) => termPrint(`${s.id}  ·  ${s.name}  ·  ${s.country||""}  ·  ${DB_MAP[dbKey].label}`, "term-info"));
                if (!_showAll && hits.length > lcontLimit)
                    termPrint(`… and ${hits.length - lcontLimit} more. Add "all" to see every scene.`, "term-info");
                else termPrint(`(${hits.length} scene${hits.length!==1?"s":""})`, "term-info");
                return;
            }

            if (verb === "list" && noun === "region") {
                if (!arg) { termPrint("Usage: list region <name>", "term-err"); return; }
                const hits = termAllActiveScenes().filter(({ scene: s }) => (s.region||"").toLowerCase() === arg.toLowerCase());
                if (!hits.length) { termPrint(`No active scenes for region "${arg}".`, "term-err"); return; }
                const lregLimit = 30;
                (_showAll ? hits : hits.slice(0, lregLimit))
                    .forEach(({ dbKey, scene: s }) => termPrint(`${s.id}  ·  ${s.name}  ·  ${s.country||""}  ·  ${DB_MAP[dbKey].label}`, "term-info"));
                if (!_showAll && hits.length > lregLimit)
                    termPrint(`… and ${hits.length - lregLimit} more. Add "all" to see every scene.`, "term-info");
                else termPrint(`(${hits.length} scene${hits.length!==1?"s":""})`, "term-info");
                return;
            }

            if (verb === "list" && noun === "db") {
                const dbFilter = arg ? arg.toLowerCase() : null;
                if (!dbFilter || !DB_MAP[dbFilter]) { termPrint(`Usage: list db <${Object.keys(DB_MAP).join("|")}>`, "term-err"); return; }
                const hits = termAllActiveScenes().filter(e => e.dbKey === dbFilter);
                const ldbLimit = 30;
                (_showAll ? hits : hits.slice(0, ldbLimit)).forEach(({ scene: s }) => {
                    const sy = s.startYear < 0 ? Math.abs(s.startYear)+"BC" : s.startYear;
                    const ey = s.endYear   < 0 ? Math.abs(s.endYear)+"BC"   : s.endYear;
                    termPrint(`${s.id}  ·  ${s.name}  ·  ${s.country||""}  ·  ${sy}–${ey}`, "term-info");
                });
                if (!_showAll && hits.length > ldbLimit)
                    termPrint(`… and ${hits.length - ldbLimit} more. Add "all" to see every scene.`, "term-info");
                termPrint(`(${hits.length} scene${hits.length!==1?"s":""} in ${DB_MAP[dbFilter].label})`, "term-info");
                return;
            }

            if (verb === "list" && noun === "years") {
                const from = parseInt(parts[2]), to = parseInt(parts[3]);
                if (isNaN(from) || isNaN(to)) { termPrint("Usage: list years <from> <to>  (negative = BC, e.g. list years -500 500)", "term-err"); return; }
                const hits = termAllActiveScenes().filter(({ scene: s }) => s.startYear <= to && s.endYear >= from);
                if (!hits.length) { termPrint(`No scenes spanning years ${from}–${to}.`, "term-err"); return; }
                hits.sort((a,b) => a.scene.startYear - b.scene.startYear);
                const lyLimit = 30;
                (_showAll ? hits : hits.slice(0, lyLimit)).forEach(({ dbKey, scene: s }) => {
                    const sy = s.startYear < 0 ? Math.abs(s.startYear)+"BC" : s.startYear;
                    const ey = s.endYear   < 0 ? Math.abs(s.endYear)+"BC"   : s.endYear;
                    termPrint(`${s.id}  ·  ${s.name}  ·  ${sy}–${ey}  ·  ${DB_MAP[dbKey].label}`, "term-info");
                });
                if (!_showAll && hits.length > lyLimit)
                    termPrint(`… and ${hits.length - lyLimit} more. Add "all" to see every scene.`, "term-info");
                termPrint(`(${hits.length} scene${hits.length!==1?"s":""} in range ${from}–${to})`, "term-info");
                return;
            }

            if (verb === "list" && noun === "edited") {
                const hits = termAllActiveScenes().filter(({ scene: s }) => s._adminAdded || s._adminEdited);
                if (!hits.length) { termPrint("No admin-edited scenes.", "term-info"); return; }
                const leLimit = 30;
                (_showAll ? hits : hits.slice(0, leLimit)).forEach(({ dbKey, scene: s }) =>
                    termPrint(`${s.id}  ·  ${s.name}  ·  ${s._adminAdded ? "ADDED" : "EDITED"}  ·  ${DB_MAP[dbKey].label}`, s._adminAdded ? "term-ok" : "term-info")
                );
                if (!_showAll && hits.length > leLimit)
                    termPrint(`… and ${hits.length - leLimit} more. Add "all" to see every edited scene.`, "term-info");
                else termPrint(`(${hits.length} scene${hits.length!==1?"s":""})`, "term-info");
                return;
            }

            if (verb === "count") {
                const total = termAllActiveScenes().length;
                const deleted = deletedIds.size;
                termPrint(`Active scenes: ${total}  |  Deleted: ${deleted}  |  Total (inc. deleted): ${total + deleted}`, "term-info");
                return;
            }

            if (verb === "random") {
                const dbFilter = parts[1] ? parts[1].toLowerCase() : null;
                let pool = termAllActiveScenes();
                if (dbFilter) {
                    if (!DB_MAP[dbFilter]) { termPrint(`Unknown db "${dbFilter}". Options: ${Object.keys(DB_MAP).join(", ")}`, "term-err"); return; }
                    pool = pool.filter(e => e.dbKey === dbFilter);
                }
                if (!pool.length) { termPrint("No scenes to pick from.", "term-err"); return; }
                const pick = pool[Math.floor(Math.random() * pool.length)];
                const { dbKey, scene: s } = pick;
                const sy = s.startYear < 0 ? Math.abs(s.startYear)+"BC" : s.startYear;
                const ey = s.endYear   < 0 ? Math.abs(s.endYear)+"BC"   : s.endYear;
                termPrint(`🎲 ${s.name}  (${s.id})`, "term-ok");
                termPrint(`   ${s.country||""}  ·  ${s.season||""}  ·  ${sy}–${ey}  ·  ${DB_MAP[dbKey].label}`, "term-info");
                if (s.info) termPrint(`   ${s.info.slice(0,120)}${s.info.length>120?"…":""}`, "term-info");
                return;
            }

            if (verb === "check" && noun === "missing") {
                const REQUIRED = ["id","name","startYear","endYear","coords","country","season","continent"];
                const issues = [];
                termAllActiveScenes().forEach(({ dbKey, scene: s }) => {
                    const missing = REQUIRED.filter(f => {
                        const v = s[f];
                        if (v == null || v === "") return true;
                        if (Array.isArray(v) && v.length === 0) return true;
                        return false;
                    });
                    if (missing.length) issues.push({ s, dbKey, missing });
                });
                if (!issues.length) { termPrint("✔ No missing required fields.", "term-ok"); return; }
                const cmLimit = 30;
                (_showAll ? issues : issues.slice(0, cmLimit)).forEach(({ s, dbKey, missing }) =>
                    termPrint(`⚠ ${s.id}  (${DB_MAP[dbKey].label})  missing: ${missing.join(", ")}`, "term-err")
                );
                if (!_showAll && issues.length > cmLimit)
                    termPrint(`… and ${issues.length - cmLimit} more. Add "all" to see every scene.`, "term-info");
                termPrint(`(${issues.length} scene${issues.length!==1?"s":""} with issues)`, "term-info");
                return;
            }

            // ── Scene: Extended Edit ─────────────────────────────────────────
            if (verb === "set" && noun === "years") {
                const sceneId = parts[2], sy = parseInt(parts[3]), ey = parseInt(parts[4]);
                if (!sceneId || isNaN(sy) || isNaN(ey)) { termPrint("Usage: set years <sceneId> <startYear> <endYear>", "term-err"); return; }
                const found = getSceneById(sceneId);
                if (!found) { termPrint(`Scene "${sceneId}" not found.`, "term-err"); return; }
                found.scene.startYear = sy;
                found.scene.endYear = ey;
                found.scene._adminEdited = true;
                persistScenes(); refreshManageList();
                termPrint(`✔ ${sceneId} years set to ${sy}–${ey}.`, "term-ok");
                return;
            }

            if (verb === "set" && noun === "coords") {
                const sceneId = parts[2], lat = parseFloat(parts[3]), lng = parseFloat(parts[4]);
                if (!sceneId || isNaN(lat) || isNaN(lng)) { termPrint("Usage: set coords <sceneId> <lat> <lng>", "term-err"); return; }
                const found = getSceneById(sceneId);
                if (!found) { termPrint(`Scene "${sceneId}" not found.`, "term-err"); return; }
                found.scene.coords = [lat, lng];
                found.scene._adminEdited = true;
                persistScenes(); refreshManageList();
                termPrint(`✔ ${sceneId} coords set to [${lat}, ${lng}].`, "term-ok");
                return;
            }

            if (verb === "set" && noun === "zoom") {
                const sceneId = parts[2], zoom = parseInt(parts[3]);
                if (!sceneId || isNaN(zoom) || zoom < 2 || zoom > 8) { termPrint("Usage: set zoom <sceneId> <2-8>", "term-err"); return; }
                const found = getSceneById(sceneId);
                if (!found) { termPrint(`Scene "${sceneId}" not found.`, "term-err"); return; }
                found.scene.zoom = zoom;
                found.scene._adminEdited = true;
                persistScenes(); refreshManageList();
                termPrint(`✔ ${sceneId} zoom set to ${zoom}.`, "term-ok");
                return;
            }

            if (verb === "set" && noun === "country") {
                const restTokens = parts.slice(2);
                if (restTokens.length < 2) { termPrint("Usage: set country <sceneId|countryName> <country>", "term-err"); return; }
                const keyLen = termSplitLeadingKey(restTokens, termKnownValues("country"));
                const keyArg = restTokens.slice(0, keyLen).join(" "), val = restTokens.slice(keyLen).join(" ");
                if (!keyArg || !val) { termPrint("Usage: set country <sceneId|countryName> <country>", "term-err"); return; }
                const found = getSceneById(keyArg);
                if (found) {
                    // Single-scene mode: parts[2] is a scene ID.
                    found.scene.country = val; found.scene._adminEdited = true;
                    persistScenes(); refreshManageList();
                    termPrint(`✔ ${keyArg}.country = "${val}"`, "term-ok");
                } else {
                    // Country-wide mode: parts[2] is a country name — set country on all matching scenes.
                    const hits = termAllActiveScenes().filter(({ scene: s }) => (s.country||"").toLowerCase() === keyArg.toLowerCase());
                    if (!hits.length) { termPrint(`No scenes found for country "${keyArg}" (and it's not a scene ID either).`, "term-err"); return; }
                    const ok = await showConfirm({ icon:"🏷", title:`Set country on ${hits.length} scene(s)?`, msg:`Country: "${keyArg}" → "${val}"`, okLabel:"Set", okClass:"admin-btn-primary" });
                    if (!ok) { termPrint("Cancelled.", "term-info"); return; }
                    hits.forEach(({ scene: s }) => { s.country = val; s._adminEdited = true; });
                    persistScenes(); refreshManageList();
                    termPrint(`✔ Set country = "${val}" on ${hits.length} scene(s) in "${keyArg}".`, "term-ok");
                }
                return;
            }

            if (verb === "set" && noun === "season") {
                const restTokens = parts.slice(2);
                if (restTokens.length < 2) { termPrint("Usage: set season <sceneId|countryName> <season>", "term-err"); return; }
                const keyLen = termSplitLeadingKey(restTokens, termKnownValues("country"));
                const keyArg = restTokens.slice(0, keyLen).join(" "), val = restTokens.slice(keyLen).join(" ");
                if (!keyArg || !val) { termPrint("Usage: set season <sceneId|countryName> <season>", "term-err"); return; }
                const found = getSceneById(keyArg);
                if (found) {
                    found.scene.season = val; found.scene._adminEdited = true;
                    persistScenes(); refreshManageList();
                    termPrint(`✔ ${keyArg}.season = "${val}"`, "term-ok");
                } else {
                    const hits = termAllActiveScenes().filter(({ scene: s }) => (s.country||"").toLowerCase() === keyArg.toLowerCase());
                    if (!hits.length) { termPrint(`No scenes found for country "${keyArg}" (and it's not a scene ID either).`, "term-err"); return; }
                    const ok = await showConfirm({ icon:"🏷", title:`Set season on ${hits.length} scene(s)?`, msg:`Country: "${keyArg}" → season "${val}"`, okLabel:"Set", okClass:"admin-btn-primary" });
                    if (!ok) { termPrint("Cancelled.", "term-info"); return; }
                    hits.forEach(({ scene: s }) => { s.season = val; s._adminEdited = true; });
                    persistScenes(); refreshManageList();
                    termPrint(`✔ Set season = "${val}" on ${hits.length} scene(s) in "${keyArg}".`, "term-ok");
                }
                return;
            }

            if (verb === "set" && noun === "continent") {
                const restTokens = parts.slice(2);
                if (restTokens.length < 2) { termPrint("Usage: set continent <sceneId|countryName> <continent>", "term-err"); return; }
                const keyLen = termSplitLeadingKey(restTokens, termKnownValues("country"));
                const keyArg = restTokens.slice(0, keyLen).join(" "), val = restTokens.slice(keyLen).join(" ");
                if (!keyArg || !val) { termPrint("Usage: set continent <sceneId|countryName> <continent>", "term-err"); return; }
                const found = getSceneById(keyArg);
                if (found) {
                    found.scene.continent = val; found.scene._adminEdited = true;
                    persistScenes(); refreshManageList();
                    termPrint(`✔ ${keyArg}.continent = "${val}"`, "term-ok");
                } else {
                    const hits = termAllActiveScenes().filter(({ scene: s }) => (s.country||"").toLowerCase() === keyArg.toLowerCase());
                    if (!hits.length) { termPrint(`No scenes found for country "${keyArg}" (and it's not a scene ID either).`, "term-err"); return; }
                    const ok = await showConfirm({ icon:"🌍", title:`Set continent on ${hits.length} scene(s)?`, msg:`Country: "${keyArg}" → continent "${val}"`, okLabel:"Set", okClass:"admin-btn-primary" });
                    if (!ok) { termPrint("Cancelled.", "term-info"); return; }
                    hits.forEach(({ scene: s }) => { s.continent = val; s._adminEdited = true; });
                    persistScenes(); refreshManageList();
                    termPrint(`✔ Set continent = "${val}" on ${hits.length} scene(s) in "${keyArg}".`, "term-ok");
                }
                return;
            }

            if (verb === "clone") {
                const sceneId = parts[1], newId = parts[2];
                if (!sceneId || !newId) { termPrint("Usage: clone <sceneId> <newId>", "term-err"); return; }
                const found = getSceneById(sceneId);
                if (!found) { termPrint(`Scene "${sceneId}" not found.`, "term-err"); return; }
                // Check newId doesn't already exist
                for (const info of Object.values(DB_MAP)) {
                    if (info.getArr().find(s => s.id === newId)) { termPrint(`ID "${newId}" already exists.`, "term-err"); return; }
                }
                const copy = JSON.parse(JSON.stringify(found.scene));
                copy.id = newId;
                copy.name = copy.name + " (Clone)";
                copy._adminAdded = true;
                delete copy._adminEdited;
                const arr = DB_MAP[found.dbKey].getArr();
                arr.push(copy);
                scenes.push({ ...copy, _dbKey: found.dbKey });
                persistScenes(); refreshManageList();
                termPrint(`✔ Cloned "${found.scene.name}" → "${newId}" in ${DB_MAP[found.dbKey].label}.`, "term-ok");
                return;
            }

            if (verb === "open") {
                const sceneId = parts[1];
                if (!sceneId) { termPrint("Usage: open <sceneId>", "term-err"); return; }
                const found = getSceneById(sceneId);
                if (!found) { termPrint(`Scene "${sceneId}" not found.`, "term-err"); return; }
                loadSceneIntoForm(found.scene, found.dbKey);
                switchToTab("add");
                termPrint(`✔ Loaded "${found.scene.name}" into the form.`, "term-ok");
                return;
            }

            // -- Scene: Multi-edit (bulk operations on multiple scenes) -------
            // edit scenes <id1> [id2 ...] -- <field> <value>
            if (verb === "edit" && noun === "scenes") {
                const tail = parts.slice(2);
                const sepIdx = tail.indexOf("--");
                if (sepIdx === -1 || sepIdx === 0 || sepIdx >= tail.length - 2) {
                    termPrint("Usage: edit scenes <id1> [id2...] -- <field> <value>", "term-err");
                    termPrint("  Use -- to split scene IDs from field/value.  e.g. edit scenes rome_1 rome_2 -- season Ancient Rome", "term-info");
                    return;
                }
                const ids    = tail.slice(0, sepIdx);
                const field  = tail[sepIdx + 1];
                const rawVal = tail.slice(sepIdx + 2).join(" ");
                let parsed = rawVal;
                if (rawVal !== "" && !isNaN(Number(rawVal))) parsed = Number(rawVal);
                else if (rawVal === "true") parsed = true;
                else if (rawVal === "false") parsed = false;
                const found   = ids.map(id => ({ id, result: getSceneById(id) }));
                const missing = found.filter(x => !x.result).map(x => x.id);
                const valid   = found.filter(x =>  x.result);
                if (missing.length) termPrint("Not found: " + missing.join(", "), "term-err");
                if (!valid.length) return;
                const ok = await showConfirm({
                    icon: "edit",
                    title: "Set " + field + " on " + valid.length + " scene(s)?",
                    msg: valid.map(x => x.result.scene.name).join(", ") + "\n-> " + field + " = " + JSON.stringify(parsed),
                    okLabel: "Set", okClass: "admin-btn-primary"
                });
                if (!ok) { termPrint("Cancelled.", "term-info"); return; }
                valid.forEach(x => { x.result.scene[field] = parsed; x.result.scene._adminEdited = true; });
                persistScenes(); refreshManageList();
                termPrint("Set " + field + " = " + JSON.stringify(parsed) + " on " + valid.length + " scene(s).", "term-ok");
                const esLimit = 20;
                (_showAll ? valid : valid.slice(0, esLimit))
                    .forEach(x => termPrint("  " + x.result.scene.id + "  .  " + x.result.scene.name, "term-info"));
                if (!_showAll && valid.length > esLimit)
                    termPrint(`… and ${valid.length - esLimit} more. Add "all" to list every scene.`, "term-info");
                return;
            }

            // bulk set <field> <value> <id1> [id2 ...]
            if (verb === "bulk" && noun === "set") {
                const subField = (parts[2] || "").toLowerCase();
                const BULK_SET_FIELDS = ["country", "season", "continent", "region", "zoom"];
                if (!BULK_SET_FIELDS.includes(subField)) {
                    termPrint("Unknown field \"" + subField + "\". Options: " + BULK_SET_FIELDS.join(", "), "term-err");
                    return;
                }
                const restTokens = parts.slice(3);
                // <value> can be multi-word (e.g. "south africa"). Scene IDs never
                // contain spaces, so pop real IDs off the end first, then
                // whatever's left (joined back together) is the value.
                const { value: rawVal, ids } = termSplitTrailingIds(restTokens);
                if (!rawVal || !ids.length) { termPrint("Usage: bulk set " + subField + " <value> <id1> [id2...]", "term-err"); return; }
                let parsed = rawVal;
                if (subField === "zoom") {
                    parsed = parseInt(rawVal, 10);
                    if (isNaN(parsed) || parsed < 2 || parsed > 8) { termPrint("Zoom must be 2-8.", "term-err"); return; }
                }
                const found   = ids.map(id => ({ id, result: getSceneById(id) }));
                const missing = found.filter(x => !x.result).map(x => x.id);
                const valid   = found.filter(x =>  x.result);
                if (missing.length) termPrint("Not found: " + missing.join(", "), "term-err");
                if (!valid.length) return;
                const ok = await showConfirm({
                    icon: "tag",
                    title: "Set " + subField + " on " + valid.length + " scene(s)?",
                    msg: "\"" + parsed + "\" -> " + valid.map(x => x.result.scene.name).join(", "),
                    okLabel: "Set", okClass: "admin-btn-primary"
                });
                if (!ok) { termPrint("Cancelled.", "term-info"); return; }
                valid.forEach(x => { x.result.scene[subField] = parsed; x.result.scene._adminEdited = true; });
                persistScenes(); refreshManageList();
                termPrint("Set " + subField + " = \"" + parsed + "\" on " + valid.length + " scene(s).", "term-ok");
                const bsLimit = 20;
                (_showAll ? valid : valid.slice(0, bsLimit))
                    .forEach(x => termPrint("  " + x.result.scene.id + "  .  " + x.result.scene.name, "term-info"));
                if (!_showAll && valid.length > bsLimit)
                    termPrint(`… and ${valid.length - bsLimit} more. Add "all" to list every scene.`, "term-info");
                return;
            }

            // bulk delete <id1> [id2 ...]
            if (verb === "bulk" && noun === "delete") {
                const ids = parts.slice(2);
                if (!ids.length) { termPrint("Usage: bulk delete <id1> [id2...]", "term-err"); return; }
                const found   = ids.map(id => ({ id, result: getSceneById(id) }));
                const missing = found.filter(x => !x.result).map(x => x.id);
                const valid   = found.filter(x =>  x.result);
                if (missing.length) termPrint("Not found: " + missing.join(", "), "term-err");
                if (!valid.length) return;
                await termSoftDeleteMany(valid.map(x => ({ dbKey: x.result.dbKey, scene: x.result.scene })),
                    valid.length + " selected scene(s)");
                return;
            }

            // bulk move <db> <id1> [id2 ...]
            if (verb === "bulk" && noun === "move") {
                const targetDb = (parts[2] || "").toLowerCase();
                const ids = parts.slice(3);
                if (!targetDb || !ids.length) { termPrint("Usage: bulk move <db> <id1> [id2...]", "term-err"); return; }
                if (!DB_MAP[targetDb]) { termPrint("Unknown db \"" + targetDb + "\". Options: " + Object.keys(DB_MAP).join(", "), "term-err"); return; }
                const found   = ids.map(id => ({ id, result: getSceneById(id) }));
                const missing = found.filter(x => !x.result).map(x => x.id);
                const valid   = found.filter(x => x.result && x.result.dbKey !== targetDb);
                const already = found.filter(x => x.result && x.result.dbKey === targetDb);
                if (missing.length) termPrint("Not found: " + missing.join(", "), "term-err");
                if (already.length) termPrint("Already in \"" + targetDb + "\": " + already.map(x => x.id).join(", "), "term-info");
                if (!valid.length) return;
                const ok = await showConfirm({
                    icon: "box",
                    title: "Move " + valid.length + " scene(s) to " + DB_MAP[targetDb].label + "?",
                    msg: valid.map(x => x.result.scene.name).join(", "),
                    okLabel: "Move", okClass: "admin-btn-primary"
                });
                if (!ok) { termPrint("Cancelled.", "term-info"); return; }
                valid.forEach(x => {
                    const { dbKey, scene } = x.result;
                    const srcArr = DB_MAP[dbKey].getArr();
                    srcArr.splice(srcArr.findIndex(s => s.id === scene.id), 1);
                    const clone = Object.assign({}, scene, { _dbKey: targetDb, _adminEdited: true });
                    DB_MAP[targetDb].getArr().push(clone);
                    const si = scenes.findIndex(s => s.id === scene.id);
                    if (si !== -1) scenes[si] = clone; else scenes.push(clone);
                });
                persistScenes(); refreshManageList();
                termPrint("Moved " + valid.length + " scene(s) to " + DB_MAP[targetDb].label + ".", "term-ok");
                return;
            }

            // bulk touch <id1> [id2 ...]
            if (verb === "bulk" && noun === "touch") {
                const ids = parts.slice(2);
                if (!ids.length) { termPrint("Usage: bulk touch <id1> [id2...]", "term-err"); return; }
                const found   = ids.map(id => ({ id, result: getSceneById(id) }));
                const missing = found.filter(x => !x.result).map(x => x.id);
                const valid   = found.filter(x =>  x.result);
                if (missing.length) termPrint("Not found: " + missing.join(", "), "term-err");
                if (!valid.length) return;
                valid.forEach(x => { x.result.scene._adminEdited = true; });
                persistScenes();
                termPrint("Touched " + valid.length + " scene(s).", "term-ok");
                valid.forEach(x => termPrint("  " + x.result.scene.id + "  .  " + x.result.scene.name, "term-info"));
                return;
            }

            // bulk info <id1> [id2 ...]
            if (verb === "bulk" && noun === "info") {
                const ids = parts.slice(2);
                if (!ids.length) { termPrint("Usage: bulk info <id1> [id2...]", "term-err"); return; }
                ids.forEach(sceneId => {
                    const found = getSceneById(sceneId);
                    if (!found) { termPrint("Not found: \"" + sceneId + "\"", "term-err"); return; }
                    termPrint("-- " + found.scene.name + " (" + sceneId + ")  db: " + DB_MAP[found.dbKey].label, "term-info");
                    Object.entries(found.scene).filter(([k]) => !k.startsWith("_"))
                        .forEach(([k, v]) => termPrint("  " + k + ": " + JSON.stringify(v), "term-info"));
                });
                return;
            }

            // set continent <country> <continent>  — set continent on all scenes for a country
            // ── Scene: Bulk retag ────────────────────────────────────────────
            if (verb === "retag" && noun === "country") {
                const restTokens = parts.slice(2);
                if (restTokens.length < 2) { termPrint("Usage: retag country <old> <new>", "term-err"); return; }
                const keyLen = termSplitLeadingKey(restTokens, termKnownValues("country"));
                const oldVal = restTokens.slice(0, keyLen).join(" "), newVal = restTokens.slice(keyLen).join(" ");
                if (!oldVal || !newVal) { termPrint("Usage: retag country <old> <new>", "term-err"); return; }
                const hits = termAllActiveScenes().filter(({ scene: s }) => (s.country||"").toLowerCase() === oldVal.toLowerCase());
                if (!hits.length) { termPrint(`No scenes with country "${oldVal}".`, "term-err"); return; }
                const ok = await showConfirm({ icon:"🏷", title:`Retag country?`, msg:`Rename country "${oldVal}" → "${newVal}" on ${hits.length} scene(s).`, okLabel:"Retag", okClass:"admin-btn-warn" });
                if (!ok) { termPrint("Cancelled.", "term-info"); return; }
                hits.forEach(({ scene: s }) => { s.country = newVal; s._adminEdited = true; });
                persistScenes(); refreshManageList();
                termPrint(`✔ Retagged ${hits.length} scene(s): "${oldVal}" → "${newVal}".`, "term-ok");
                return;
            }

            if (verb === "retag" && noun === "season") {
                const restTokens = parts.slice(2);
                if (restTokens.length < 2) { termPrint("Usage: retag season <old> <new>", "term-err"); return; }
                const keyLen = termSplitLeadingKey(restTokens, termKnownValues("season"));
                const oldVal = restTokens.slice(0, keyLen).join(" "), newVal = restTokens.slice(keyLen).join(" ");
                if (!oldVal || !newVal) { termPrint("Usage: retag season <old> <new>", "term-err"); return; }
                const hits = termAllActiveScenes().filter(({ scene: s }) => (s.season||"").toLowerCase() === oldVal.toLowerCase());
                if (!hits.length) { termPrint(`No scenes with season "${oldVal}".`, "term-err"); return; }
                const ok = await showConfirm({ icon:"🏷", title:`Retag season?`, msg:`Rename season "${oldVal}" → "${newVal}" on ${hits.length} scene(s).`, okLabel:"Retag", okClass:"admin-btn-warn" });
                if (!ok) { termPrint("Cancelled.", "term-info"); return; }
                hits.forEach(({ scene: s }) => { s.season = newVal; s._adminEdited = true; });
                persistScenes(); refreshManageList();
                termPrint(`✔ Retagged ${hits.length} scene(s): "${oldVal}" → "${newVal}".`, "term-ok");
                return;
            }

            // ── Scene: restore all ───────────────────────────────────────────
            if (verb === "restore" && noun === "all") {
                const ids = Array.from(deletedIds);
                if (!ids.length) { termPrint("Nothing to restore.", "term-info"); return; }
                const ok = await showConfirm({ icon:"↺", title:`Restore ${ids.length} deleted scene(s)?`, msg:"All hidden scenes will become visible again.", okLabel:"Restore All", okClass:"admin-btn-warn" });
                if (!ok) { termPrint("Cancelled.", "term-info"); return; }
                ids.forEach(sceneId => {
                    const stored = deletedSceneStore[sceneId];
                    if (!stored) return;
                    deletedIds.delete(sceneId);
                    const arr = DB_MAP[stored._dbKey] ? DB_MAP[stored._dbKey].getArr() : null;
                    if (arr && !arr.find(x => x.id === sceneId)) arr.push({ ...stored });
                    if (!scenes.find(x => x.id === sceneId)) scenes.push({ ...stored });
                });
                persistDeleted();
                refreshDeletedList(); refreshManageList();
                termPrint(`✔ Restored ${ids.length} scene(s).`, "term-ok");
                return;
            }

            // ── Scene: delete continent ─────────────────────────────────────
            if (verb === "delete" && noun === "continent") {
                if (!arg) { termPrint("Usage: delete continent <name>", "term-err"); return; }
                await termSoftDeleteMany(termAllActiveScenes().filter(({ scene: s }) => (s.continent||"").toLowerCase() === arg.toLowerCase()), `continent "${arg}"`);
                return;
            }

            // ── Scene: export CSV ────────────────────────────────────────────
            if (verb === "export" && noun === "csv") {
                const dbFilter = parts[2] ? parts[2].toLowerCase() : null;
                if (dbFilter && !DB_MAP[dbFilter]) { termPrint(`Unknown db "${dbFilter}". Options: ${Object.keys(DB_MAP).join(", ")}`, "term-err"); return; }
                let data = termAllActiveScenes();
                if (dbFilter) data = data.filter(e => e.dbKey === dbFilter);
                const header = ["id","name","startYear","endYear","continent","country","season","region","lat","lng","zoom"];
                const rows = data.map(({ dbKey, scene: s }) => [
                    s.id, s.name, s.startYear, s.endYear, s.continent||"",
                    s.country||"", s.season||"", s.region||"",
                    s.coords?.[0]||"", s.coords?.[1]||"", s.zoom||"", dbKey
                ].map(v => `"${String(v).replace(/"/g,'""')}"`).join(","));
                const csv = [["id","name","startYear","endYear","continent","country","season","region","lat","lng","zoom","db"].join(","), ...rows].join("\n");
                const a = Object.assign(document.createElement("a"), {
                    href: URL.createObjectURL(new Blob([csv], { type: "text/csv" })),
                    download: `whd-scenes${dbFilter?"-"+dbFilter:""}-${Date.now()}.csv`
                });
                a.click();
                termPrint(`✔ Exported ${data.length} scene(s) as CSV.`, "term-ok");
                return;
            }

            // ── CSS: accent shortcut ─────────────────────────────────────────
            if (verb === "accent") {
                const hex = parts[1];
                if (!hex || !/^#[0-9a-fA-F]{3,6}$/.test(hex)) {
                    termPrint("Usage: accent <hex>  e.g. accent #e05500", "term-err");
                    termPrint("  Applies the accent colour locally and syncs --accent to all users.", "term-info");
                    return;
                }
                // Local apply
                applyAdminAccentToDOM(hex);
                // Sync to all users via remoteconfig
                const res = await remoteConfigCall({ action: "set_css", selector: ":root", property: "--accent", value: hex });
                learnRemember("cssVar", "--accent");
                if (res.ok) {
                    applyRemoteConfigToPage(res);
                    termPrint(`✔ Accent set to ${hex} (synced globally).`, "term-ok");
                } else {
                    termPrint(`✔ Accent set to ${hex} locally (sync failed: ${res.error||"unknown"}).`, "term-info");
                }
                return;
            }

            // ── CSS: theme presets ───────────────────────────────────────────
            if (verb === "theme" && noun === "dark") {
                const rules = [
                    { selector:":root", property:"--bg",       value:"#0a0a0c" },
                    { selector:":root", property:"--surface",   value:"#111114" },
                    { selector:":root", property:"--on-surface",value:"#e8e8e8" },
                ];
                for (const r of rules) {
                    await remoteConfigCall({ action:"set_css", selector:r.selector, property:r.property, value:r.value });
                }
                applyAdminAccentToDOM(document.documentElement.style.getPropertyValue("--accent") || "#c0161f");
                termPrint("✔ Dark theme applied (synced globally).", "term-ok");
                return;
            }

            if (verb === "theme" && noun === "light") {
                const rules = [
                    { selector:":root", property:"--bg",       value:"#f5f5f7" },
                    { selector:":root", property:"--surface",   value:"#ffffff" },
                    { selector:":root", property:"--on-surface",value:"#1a1a1a" },
                ];
                for (const r of rules) {
                    await remoteConfigCall({ action:"set_css", selector:r.selector, property:r.property, value:r.value });
                }
                termPrint("✔ Light theme applied (synced globally).", "term-ok");
                return;
            }

            if (verb === "theme" && noun === "reset") {
                const ok = await showConfirm({ icon:"🎨", title:"Reset all theme overrides?", msg:"Clears every synced CSS override. All users will return to the default theme.", okLabel:"Reset", okClass:"admin-btn-warn" });
                if (!ok) { termPrint("Cancelled.", "term-info"); return; }
                const res = await remoteConfigCall({ action:"clear_css" });
                if (res.ok) { applyRemoteConfigToPage(res); termPrint("✔ Theme reset to defaults.", "term-ok"); }
                else termPrint("Error: " + (res.error||"request failed"), "term-err");
                return;
            }

            // ── Runtime: extended ────────────────────────────────────────────
            if (verb === "reload" && noun === "page") {
                const ok = await showConfirm({ icon:"🔄", title:"Reload page?", msg:"This will hard-refresh the browser.", okLabel:"Reload", okClass:"admin-btn-primary" });
                if (!ok) { termPrint("Cancelled.", "term-info"); return; }
                location.reload();
                return;
            }

            if (verb === "whoami") {
                const role = window.WHDAuth?.getRole?.() ?? "—";
                const user = window.WHDAuth?.getUsername?.() ?? "—";
                const token = window.WHDAuth?.getToken?.();
                termPrint(`username: ${user}`, "term-info");
                termPrint(`role: ${role}`, "term-info");
                termPrint(`token: ${token ? `present (${token.slice(0, 6)}…${token.slice(-4)})` : "none"}`, "term-info");
                return;
            }

            if (verb === "version") {
                termPrint("Admin Panel v2.1 — WHD", "term-info");
                termPrint(`Worker: ${WORKER_URL || "(not configured)"}`, "term-info");
                const role = window.WHDAuth ? window.WHDAuth.getRole() : "—";
                const user = window.WHDAuth && typeof window.WHDAuth.getUsername === "function" ? window.WHDAuth.getUsername() : "—";
                termPrint(`Logged in as: ${user}  (role: ${role})`, "term-info");
                return;
            }

            if (verb === "help") {
                const catFilter = parts.slice(1).join(" ");
                const cats = {};
                TERM_COMMANDS.forEach(c => {
                    if (catFilter && c.cat.toLowerCase() !== catFilter.toLowerCase()) return;
                    (cats[c.cat] = cats[c.cat] || []).push(c);
                });
                if (!Object.keys(cats).length) {
                    termPrint(catFilter ? `No commands in category "${catFilter}".` : "No commands registered.", "term-err");
                    return;
                }
                Object.entries(cats).forEach(([cat, cmds]) => {
                    termPrint(`── ${cat} ──────────────────────────────`, "term-info");
                    cmds.forEach(c => termPrint(`  ${(c.cmd + " " + (c.hint||"")).padEnd(42)} ${c.desc}`, "term-info"));
                });
                if (!catFilter) termPrint(`Tip: append "all" to any list-style command to show every result (e.g. find rome all).`, "term-info");
                return;
            }

            // ── Storage: extended ────────────────────────────────────────────
            if (verb === "storage" && noun === "size") {
                let total = 0;
                for (let i = 0; i < localStorage.length; i++) {
                    const k = localStorage.key(i);
                    total += (k||"").length + (localStorage.getItem(k)||"").length;
                }
                termPrint(`localStorage total: ${(total/1024).toFixed(1)} KB  (${localStorage.length} key${localStorage.length!==1?"s":""})`, "term-info");
                return;
            }

            if (verb === "storage" && noun === "clear" && parts[2] === "whd") {
                const whdKeys = [];
                for (let i = 0; i < localStorage.length; i++) {
                    const k = localStorage.key(i);
                    if (k && k.startsWith("whd")) whdKeys.push(k);
                }
                if (!whdKeys.length) { termPrint("No WHD keys found.", "term-info"); return; }
                const ok = await showConfirm({ icon:"🗑️", title:`Clear ${whdKeys.length} WHD keys?`, msg:`Keys: ${whdKeys.slice(0,5).join(", ")}${whdKeys.length>5?"…":""}`, okLabel:"Clear", okClass:"admin-btn-danger" });
                if (!ok) { termPrint("Cancelled.", "term-info"); return; }
                whdKeys.forEach(k => localStorage.removeItem(k));
                termPrint(`✔ Removed ${whdKeys.length} WHD localStorage key${whdKeys.length!==1?"s":""}.`, "term-ok");
                return;
            }

            // ── Users: extended ──────────────────────────────────────────────
            if (verb === "user" && noun === "count") {
                if (_adminAllUsers.length) {
                    const admins = _adminAllUsers.filter(u => u.role === "admin").length;
                    const owners = _adminAllUsers.filter(u => u.role === "owner").length;
                    const banned = _adminAllUsers.filter(u => u.role === "banned").length;
                    termPrint(`Total: ${_adminAllUsers.length}  |  Admins: ${admins}  |  Owners: ${owners}  |  Banned: ${banned}`, "term-info");
                } else {
                    termPrint("Run 'user list' first to populate user cache.", "term-info");
                }
                return;
            }

            if (verb === "user" && noun === "admins") {
                if (!_adminAllUsers.length) { termPrint("Run 'user list' first to populate user cache.", "term-info"); return; }
                const elevated = _adminAllUsers.filter(u => u.role === "admin" || u.role === "owner");
                if (!elevated.length) { termPrint("No admin/owner users.", "term-info"); return; }
                const uaLimit = 20;
                (_showAll ? elevated : elevated.slice(0, uaLimit))
                    .forEach(u => termPrint(`  ${u.username.padEnd(22)} ${u.role}`, "term-info"));
                if (!_showAll && elevated.length > uaLimit)
                    termPrint(`… and ${elevated.length - uaLimit} more. Add "all" to see all admins.`, "term-info");
                return;
            }

            // ── Update Log ───────────────────────────────────────────────────
            if (verb === "log" && noun === "list") {
                const token = window.WHDAuth?.getToken();
                const r = await fetch(WORKER_URL + "/auth/updatelog", {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token, action: "list" })
                }).then(x => x.json()).catch(() => ({ ok: false }));
                if (!r.ok) { termPrint("Error: " + (r.error || "request failed"), "term-err"); return; }
                const entries = r.entries || [];
                if (!entries.length) { termPrint("No update log entries.", "term-info"); return; }
                const llLimit = 20;
                (_showAll ? entries : entries.slice(0, llLimit)).forEach(e =>
                    termPrint(`  ${e.id}  v${e.version}  "${e.title}"  ${e.date}  (${(e.changes||[]).length} change${(e.changes||[]).length!==1?"s":""})`, "term-info")
                );
                if (!_showAll && entries.length > llLimit)
                    termPrint(`… and ${entries.length - llLimit} more. Add "all" to see every entry.`, "term-info");
                termPrint(`(${entries.length} entr${entries.length!==1?"ies":"y"})`, "term-info");
                return;
            }

            if (verb === "log" && noun === "add") {
                // log add <version> <title> -- <change1> | <change2> | ...
                // e.g.  log add 2.4 "Summer update" -- Fixed map panning | Added Poland
                const sepIdx = parts.indexOf("--");
                const meta   = sepIdx > 0 ? parts.slice(2, sepIdx) : parts.slice(2);
                const rawChanges = sepIdx > 0 ? parts.slice(sepIdx + 1).join(" ").split("|").map(c => c.trim()).filter(Boolean) : [];
                const version = meta[0] || "";
                const title   = meta.slice(1).join(" ");
                if (!version) { termPrint('Usage: log add <version> [title] -- <change> | <change> …', "term-err"); return; }
                const token = window.WHDAuth?.getToken();
                const now = new Date();
                const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                const date = months[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear();
                const r = await fetch(WORKER_URL + "/auth/updatelog", {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token, action: "save", version, title: title || ("v" + version), date, changes: rawChanges })
                }).then(x => x.json()).catch(() => ({ ok: false }));
                if (r.ok) {
                    termPrint(`✔ Created update log entry v${r.entry.version} (id: ${r.entry.id}).`, "term-ok");
                    if (typeof _ulUserEntries !== "undefined") _ulUserEntries = null;
                    if (typeof loadUpdateLog === "function") loadUpdateLog();
                } else { termPrint("Error: " + (r.error || "request failed"), "term-err"); }
                return;
            }

            if (verb === "log" && noun === "edit") {
                // log edit <id> <field> <value…>  — field: version|title|date|changes
                // For changes, value is pipe-separated: log edit abc123 changes "Fixed X | Added Y"
                const id    = parts[2];
                const field = (parts[3] || "").toLowerCase();
                const val   = parts.slice(4).join(" ");
                if (!id || !field || !val) {
                    termPrint('Usage: log edit <id> <version|title|date|changes> <value>', "term-err");
                    termPrint('  For changes: separate items with |   e.g.  log edit abc123 changes "Fixed X | Added Y"', "term-info");
                    return;
                }
                // Fetch current entry first
                const token = window.WHDAuth?.getToken();
                const listR = await fetch(WORKER_URL + "/auth/updatelog", {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token, action: "list" })
                }).then(x => x.json()).catch(() => ({ ok: false }));
                if (!listR.ok) { termPrint("Error fetching entries: " + (listR.error || "?"), "term-err"); return; }
                const entry = (listR.entries || []).find(e => e.id === id);
                if (!entry) { termPrint(`No entry with id "${id}". Run "log list" to see IDs.`, "term-err"); return; }
                const updated = { ...entry };
                if (field === "version") updated.version = val;
                else if (field === "title") updated.title = val;
                else if (field === "date")  updated.date  = val;
                else if (field === "changes") updated.changes = val.split("|").map(c => c.trim()).filter(Boolean);
                else { termPrint(`Unknown field "${field}". Use: version, title, date, changes`, "term-err"); return; }
                const r = await fetch(WORKER_URL + "/auth/updatelog", {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token, action: "save", id, ...updated })
                }).then(x => x.json()).catch(() => ({ ok: false }));
                if (r.ok) {
                    termPrint(`✔ Updated entry ${id} (${field} set).`, "term-ok");
                    if (typeof _ulUserEntries !== "undefined") _ulUserEntries = null;
                    if (typeof loadUpdateLog === "function") loadUpdateLog();
                } else { termPrint("Error: " + (r.error || "request failed"), "term-err"); }
                return;
            }

            if (verb === "log" && noun === "delete") {
                const id = parts[2];
                if (!id) { termPrint("Usage: log delete <id>", "term-err"); return; }
                const ok = await showConfirm({ icon: "🗑️", title: "Delete update log entry?", msg: `Entry id: ${id}`, okLabel: "Delete", okClass: "admin-btn-danger" });
                if (!ok) { termPrint("Cancelled.", "term-info"); return; }
                const token = window.WHDAuth?.getToken();
                const r = await fetch(WORKER_URL + "/auth/updatelog", {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token, action: "delete", id })
                }).then(x => x.json()).catch(() => ({ ok: false }));
                if (r.ok) {
                    termPrint(`✔ Deleted entry ${id}.`, "term-ok");
                    if (typeof _ulUserEntries !== "undefined") _ulUserEntries = null;
                    if (typeof loadUpdateLog === "function") loadUpdateLog();
                } else { termPrint("Error: " + (r.error || "request failed"), "term-err"); }
                return;
            }

            // ── Scene: Analytics ──────────────────────────────────────────────
            if (verb === "top" && noun === "countries") {
                const limit = parseInt(parts[2]) || 10;
                const counts = {};
                termAllActiveScenes().forEach(({ scene: s }) => {
                    const c = (s.country || "").trim() || "(none)";
                    counts[c] = (counts[c] || 0) + 1;
                });
                const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, limit);
                termPrint(`── Top ${limit} Countries ──`, "term-info");
                sorted.forEach(([c, n], i) => termPrint(`  ${String(i+1).padStart(2)}.  ${c.padEnd(28)} ${n} scene${n!==1?"s":""}`, "term-info"));
                return;
            }

            if (verb === "top" && noun === "seasons") {
                const limit = parseInt(parts[2]) || 10;
                const counts = {};
                termAllActiveScenes().forEach(({ scene: s }) => {
                    const k = (s.season || "").trim() || "(none)";
                    counts[k] = (counts[k] || 0) + 1;
                });
                const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, limit);
                termPrint(`── Top ${limit} Seasons ──`, "term-info");
                sorted.forEach(([k, n], i) => termPrint(`  ${String(i+1).padStart(2)}.  ${k.padEnd(28)} ${n} scene${n!==1?"s":""}`, "term-info"));
                return;
            }

            if (verb === "timeline") {
                // Summarise active scenes by century
                const buckets = {};
                termAllActiveScenes().forEach(({ scene: s }) => {
                    const yr = s.startYear ?? 0;
                    const cent = Math.floor(yr / 100) * 100;
                    buckets[cent] = (buckets[cent] || 0) + 1;
                });
                const sorted = Object.entries(buckets).sort((a,b) => Number(a[0]) - Number(b[0]));
                termPrint("── Scenes by Century ──", "term-info");
                sorted.forEach(([cent, n]) => {
                    const label = cent < 0 ? `${Math.abs(cent)}BC` : cent === 0 ? "1–99 AD" : `${Number(cent)+1}s`;
                    const bar = "█".repeat(Math.min(40, Math.round(n / 2)));
                    termPrint(`  ${label.padStart(8)}  ${bar} ${n}`, "term-info");
                });
                return;
            }

            if (verb === "audit" && noun === "tags") {
                // Find scenes with inconsistent country/season capitalisation
                const countryMap = {}, seasonMap = {};
                termAllActiveScenes().forEach(({ scene: s }) => {
                    if (s.country) { const k = s.country.trim().toLowerCase(); (countryMap[k] = countryMap[k] || new Set()).add(s.country.trim()); }
                    if (s.season)  { const k = s.season.trim().toLowerCase();  (seasonMap[k]  = seasonMap[k]  || new Set()).add(s.season.trim());  }
                });
                const tagIssues = [];
                Object.entries(countryMap).forEach(([k, variants]) => {
                    if (variants.size > 1) tagIssues.push({ type: "Country", key: k, variants: [...variants] });
                });
                Object.entries(seasonMap).forEach(([k, variants]) => {
                    if (variants.size > 1) tagIssues.push({ type: "Season",  key: k, variants: [...variants] });
                });
                if (!tagIssues.length) { termPrint("✔ No inconsistent tags found.", "term-ok"); return; }
                termPrint("── Tag Audit ──", "term-info");
                const atLimit = 30;
                (_showAll ? tagIssues : tagIssues.slice(0, atLimit)).forEach(({ type, key, variants }) =>
                    termPrint(`  ⚠ ${type} "${key}" has mixed casing: ${variants.join(" | ")}`, "term-err")
                );
                if (!_showAll && tagIssues.length > atLimit)
                    termPrint(`… and ${tagIssues.length - atLimit} more. Add "all" to see every issue.`, "term-info");
                termPrint(`(${tagIssues.length} issue${tagIssues.length!==1?"s":""} found. Use 'retag' to fix.)`, "term-info");
                return;
            }

            if (verb === "audit" && noun === "coords") {
                // Find scenes with coords outside normal lat/lng bounds or exactly [0,0]
                const issues = [];
                termAllActiveScenes().forEach(({ scene: s }) => {
                    const [lat, lng] = s.coords || [];
                    if (lat == null || lng == null) { issues.push({ s, reason: "missing coords" }); return; }
                    if (lat === 0 && lng === 0) { issues.push({ s, reason: "coords [0,0] (likely placeholder)" }); return; }
                    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) issues.push({ s, reason: `coords out of range: [${lat}, ${lng}]` });
                });
                if (!issues.length) { termPrint("✔ All coords look valid.", "term-ok"); return; }
                termPrint(`── ${issues.length} Coord Issue${issues.length!==1?"s":""} ──`, "term-info");
                const acLimit = 30;
                (_showAll ? issues : issues.slice(0, acLimit))
                    .forEach(({ s, reason }) => termPrint(`  ⚠ ${s.id}  ${s.name}  — ${reason}`, "term-err"));
                if (!_showAll && issues.length > acLimit)
                    termPrint(`… and ${issues.length - acLimit} more. Add "all" to see every issue.`, "term-info");
                return;
            }

            if (verb === "audit" && noun === "years") {
                // Scenes where endYear < startYear or years are suspiciously large/small
                const issues = [];
                termAllActiveScenes().forEach(({ scene: s }) => {
                    if (s.startYear == null || s.endYear == null) { issues.push({ s, reason: "missing start/end year" }); return; }
                    if (s.endYear < s.startYear) issues.push({ s, reason: `endYear (${s.endYear}) < startYear (${s.startYear})` });
                    if (s.startYear < -5000 || s.endYear > 2100) issues.push({ s, reason: `years out of expected range: ${s.startYear}–${s.endYear}` });
                });
                if (!issues.length) { termPrint("✔ All years look valid.", "term-ok"); return; }
                termPrint(`── ${issues.length} Year Issue${issues.length!==1?"s":""} ──`, "term-info");
                const ayLimit = 30;
                (_showAll ? issues : issues.slice(0, ayLimit))
                    .forEach(({ s, reason }) => termPrint(`  ⚠ ${s.id}  ${s.name}  — ${reason}`, "term-err"));
                if (!_showAll && issues.length > ayLimit)
                    termPrint(`… and ${issues.length - ayLimit} more. Add "all" to see every issue.`, "term-info");
                return;
            }

            if (verb === "near") {
                // near <lat> <lng> [radius_km]
                const lat0 = parseFloat(parts[1]), lng0 = parseFloat(parts[2]), radiusKm = parseFloat(parts[3]) || 500;
                if (isNaN(lat0) || isNaN(lng0)) { termPrint("Usage: near <lat> <lng> [radiusKm]", "term-err"); return; }
                const deg2rad = d => d * Math.PI / 180;
                const haversine = (la1, lo1, la2, lo2) => {
                    const R = 6371, dLat = deg2rad(la2-la1), dLon = deg2rad(lo2-lo1);
                    const a = Math.sin(dLat/2)**2 + Math.cos(deg2rad(la1))*Math.cos(deg2rad(la2))*Math.sin(dLon/2)**2;
                    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                };
                let hits = termAllActiveScenes()
                    .filter(({ scene: s }) => s.coords && s.coords[0] != null)
                    .map(({ dbKey, scene: s }) => ({ dbKey, s, dist: haversine(lat0, lng0, s.coords[0], s.coords[1]) }))
                    .filter(x => x.dist <= radiusKm)
                    .sort((a,b) => a.dist - b.dist);
                const total = hits.length;
                if (!_showAll) hits = hits.slice(0, 20);
                if (!total) { termPrint(`No scenes within ${radiusKm} km of [${lat0}, ${lng0}].`, "term-err"); return; }
                termPrint(`── ${total} scene${total!==1?"s":""} within ${radiusKm} km ──`, "term-info");
                hits.forEach(({ s, dist }) => termPrint(`  ${String(Math.round(dist)).padStart(5)} km  ${s.id}  ${s.name}  (${s.country||""})`, "term-info"));
                if (!_showAll && total > 20) termPrint(`… and ${total - 20} more. Add "all" to see everything.`, "term-info");
                return;
            }

            if (verb === "scene" && noun === "touch") {
                // Mark a scene as admin-edited without changing any fields (force re-persist)
                const sceneId = parts[2];
                if (!sceneId) { termPrint("Usage: scene touch <sceneId>", "term-err"); return; }
                const found = getSceneById(sceneId);
                if (!found) { termPrint(`Scene "${sceneId}" not found.`, "term-err"); return; }
                found.scene._adminEdited = true;
                persistScenes();
                termPrint(`✔ Marked "${sceneId}" as edited.`, "term-ok");
                return;
            }

            if (verb === "scene" && noun === "untouch") {
                // Remove _adminEdited/_adminAdded flags from a scene
                const sceneId = parts[2];
                if (!sceneId) { termPrint("Usage: scene untouch <sceneId>", "term-err"); return; }
                const found = getSceneById(sceneId);
                if (!found) { termPrint(`Scene "${sceneId}" not found.`, "term-err"); return; }
                delete found.scene._adminEdited;
                delete found.scene._adminAdded;
                persistScenes(); refreshManageList();
                termPrint(`✔ Cleared admin flags on "${sceneId}".`, "term-ok");
                return;
            }

            // ── Users: search ─────────────────────────────────────────────────
            if (verb === "user" && noun === "search") {
                const q = (parts[2] || "").toLowerCase();
                if (!q) { termPrint("Usage: user search <query>", "term-err"); return; }
                if (!_adminAllUsers.length) { termPrint("Run 'user list' first to populate user cache.", "term-info"); return; }
                const hits = _adminAllUsers.filter(u =>
                    u.username.toLowerCase().includes(q) ||
                    (u.role || "").toLowerCase().includes(q)
                );
                if (!hits.length) { termPrint(`No users matched "${q}".`, "term-err"); return; }
                const usLimit = 20;
                (_showAll ? hits : hits.slice(0, usLimit))
                    .forEach(u => termPrint(`  ${u.username.padEnd(22)} ${(u.role||"user").padEnd(8)} joined: ${u.joinedAt ? new Date(u.joinedAt).toLocaleDateString() : "?"}`, "term-info"));
                if (!_showAll && hits.length > usLimit)
                    termPrint(`… and ${hits.length - usLimit} more. Add "all" to see every match.`, "term-info");
                termPrint(`(${hits.length} match${hits.length!==1?"es":""})`, "term-info");
                return;
            }

            // ── Session ───────────────────────────────────────────────────────
            if (verb === "session" && noun === "clear") {
                // Clear the terminal session history
                _termHistory.length = 0;
                termPrint("✔ Session history cleared.", "term-ok");
                return;
            }

            if (verb === "session" && noun === "export") {
                // Download the current terminal session as a .txt file
                const output = document.getElementById("adminTermOutput");
                const lines = output ? [...output.querySelectorAll(".term-line")].map(el => el.textContent) : [];
                if (!lines.length) { termPrint("Nothing in the session to export.", "term-info"); return; }
                const text = lines.join("\n");
                const a = Object.assign(document.createElement("a"), {
                    href: URL.createObjectURL(new Blob([text], { type: "text/plain" })),
                    download: `whd-session-${Date.now()}.txt`
                });
                a.click();
                termPrint(`✔ Exported ${lines.length} line${lines.length!==1?"s":""}.`, "term-ok");
                return;
            }

            // ── DB: rename ────────────────────────────────────────────────────
            if (verb === "db" && noun === "rename") {
                const dbKey = (parts[2] || "").toLowerCase();
                const newLabel = parts.slice(3).join(" ");
                if (!dbKey || !newLabel) { termPrint("Usage: db rename <dbKey> <new label>", "term-err"); return; }
                if (!DB_MAP[dbKey]) { termPrint(`Unknown db "${dbKey}". Options: ${Object.keys(DB_MAP).join(", ")}`, "term-err"); return; }
                const old = DB_MAP[dbKey].label;
                const ok = await showConfirm({ icon:"🗂️", title:"Rename database label?", msg:`"${old}" → "${newLabel}" (display name only, key stays "${dbKey}")`, okLabel:"Rename", okClass:"admin-btn-primary" });
                if (!ok) { termPrint("Cancelled.", "term-info"); return; }
                DB_MAP[dbKey].label = newLabel;
                refreshManageList();
                termPrint(`✔ DB "${dbKey}" label → "${newLabel}".`, "term-ok");
                return;
            }

            if (verb === "db" && noun === "info") {
                const dbKey = (parts[2] || "").toLowerCase();
                if (!dbKey) { termPrint("Usage: db info <dbKey>", "term-err"); return; }
                if (!DB_MAP[dbKey]) { termPrint(`Unknown db "${dbKey}". Options: ${Object.keys(DB_MAP).join(", ")}`, "term-err"); return; }
                const info = DB_MAP[dbKey];
                const all  = info.getArr();
                const active = all.filter(s => !deletedIds.has(s.id));
                const del    = all.filter(s => deletedIds.has(s.id));
                const countries = [...new Set(active.map(s => s.country).filter(Boolean))].sort();
                const seasons   = [...new Set(active.map(s => s.season).filter(Boolean))].sort();
                termPrint(`── DB: ${info.label} (${dbKey}) ──`, "term-info");
                termPrint(`  Active:    ${active.length}`, "term-info");
                termPrint(`  Deleted:   ${del.length}`, "term-info");
                termPrint(`  Countries: ${countries.join(", ") || "(none)"}`, "term-info");
                termPrint(`  Seasons:   ${seasons.join(", ") || "(none)"}`, "term-info");
                return;
            }

            // ── World Tree ────────────────────────────────────────────────────
            if (verb === "tree" && noun === "list") {
                // Print the full tree hierarchy
                function printTree(nodes, depth) {
                    (nodes || []).forEach(n => {
                        const pad = "  ".repeat(depth);
                        const icon = n.children !== undefined ? (depth === 0 ? "🌍" : depth === 1 ? "🗺" : "📂") : "📺";
                        const extra = n.children ? ` (${n.children.length} children)` : n.episodes ? ` (${n.episodes.length} episodes)` : "";
                        termPrint(`${pad}${icon} ${n.name}${extra}`, "term-info");
                        if (n.children) printTree(n.children, depth + 1);
                    });
                }
                termPrint("── World Tree ──", "term-info");
                printTree(world.children, 0);
                return;
            }

            if (verb === "tree" && noun === "add") {
                // tree add <continent> [country] [season]
                // Builds the path: continent → country → season leaf
                const continent = parts[2], country = parts[3], season = parts.slice(4).join(" ");
                if (!continent) { termPrint("Usage: tree add <continent> [country] [season]", "term-err"); return; }

                let contNode = world.children.find(c => c.name.toLowerCase() === continent.toLowerCase());
                if (!contNode) {
                    contNode = { name: continent, children: [] };
                    world.children.push(contNode);
                    termPrint(`✔ Added continent "${continent}".`, "term-ok");
                }
                if (!country) { persistTree(); if (typeof refreshTree === "function") refreshTree(); return; }

                let countryNode = contNode.children.find(c => c.name.toLowerCase() === country.toLowerCase());
                if (!countryNode) {
                    countryNode = { name: country, children: [] };
                    contNode.children.push(countryNode);
                    termPrint(`✔ Added country "${country}" under "${contNode.name}".`, "term-ok");
                }
                if (!season) { persistTree(); if (typeof refreshTree === "function") refreshTree(); return; }

                const existingSeason = countryNode.children.find(s => s.name.toLowerCase() === season.toLowerCase());
                if (existingSeason) { termPrint(`Season "${season}" already exists under "${country}".`, "term-info"); return; }
                countryNode.children.push({ name: season, episodes: [] });
                termPrint(`✔ Added season "${season}" under "${country}".`, "term-ok");
                persistTree();
                if (typeof refreshTree === "function") refreshTree();
                return;
            }

            if (verb === "tree" && noun === "remove") {
                // tree remove <nodeName>  — finds and removes a node by name (depth-first)
                const target = parts.slice(2).join(" ");
                if (!target) { termPrint("Usage: tree remove <nodeName>", "term-err"); return; }
                function findAndRemove(nodes, name) {
                    for (let i = 0; i < nodes.length; i++) {
                        if (nodes[i].name.toLowerCase() === name.toLowerCase()) {
                            const removed = nodes.splice(i, 1)[0];
                            return removed;
                        }
                        if (nodes[i].children) {
                            const found = findAndRemove(nodes[i].children, name);
                            if (found) return found;
                        }
                    }
                    return null;
                }
                const ok = await showConfirm({ icon: "🌳", title: `Remove "${target}" from tree?`, msg: "All child nodes will also be removed.", okLabel: "Remove", okClass: "admin-btn-danger" });
                if (!ok) { termPrint("Cancelled.", "term-info"); return; }
                const removed = findAndRemove(world.children, target);
                if (!removed) { termPrint(`"${target}" not found in tree.`, "term-err"); return; }
                persistTree();
                if (typeof refreshTree === "function") refreshTree();
                termPrint(`✔ Removed "${removed.name}" from tree.`, "term-ok");
                return;
            }

            if (verb === "tree" && noun === "rename") {
                const oldName = parts[2], newName = parts.slice(3).join(" ");
                if (!oldName || !newName) { termPrint("Usage: tree rename <oldName> <newName>", "term-err"); return; }
                function findAndRename(nodes, old, nw) {
                    for (const n of nodes) {
                        if (n.name.toLowerCase() === old.toLowerCase()) { n.name = nw; return true; }
                        if (n.children && findAndRename(n.children, old, nw)) return true;
                    }
                    return false;
                }
                const found = findAndRename(world.children, oldName, newName);
                if (!found) { termPrint(`"${oldName}" not found in tree.`, "term-err"); return; }
                persistTree();
                if (typeof refreshTree === "function") refreshTree();
                termPrint(`✔ Renamed "${oldName}" → "${newName}".`, "term-ok");
                return;
            }

            if (verb === "tree" && noun === "find") {
                const q = parts.slice(2).join(" ").toLowerCase();
                if (!q) { termPrint("Usage: tree find <name>", "term-err"); return; }
                const results = [];
                function treeSearch(nodes, path) {
                    (nodes || []).forEach(n => {
                        const p = [...path, n.name];
                        if (n.name.toLowerCase().includes(q)) results.push(p.join(" › "));
                        if (n.children) treeSearch(n.children, p);
                    });
                }
                treeSearch(world.children, []);
                if (!results.length) { termPrint(`No tree nodes matching "${q}".`, "term-err"); return; }
                const tfLimit = 20;
                (_showAll ? results : results.slice(0, tfLimit))
                    .forEach(r => termPrint(`  ${r}`, "term-info"));
                if (!_showAll && results.length > tfLimit)
                    termPrint(`… and ${results.length - tfLimit} more. Add "all" to see every match.`, "term-info");
                termPrint(`(${results.length} result${results.length !== 1 ? "s" : ""})`, "term-info");
                return;
            }

            if (verb === "tree" && noun === "sync") {
                // Sync countries from scene data into the tree automatically
                const byContinent = {};
                termAllActiveScenes().forEach(({ scene: s }) => {
                    if (!s.continent || !s.country) return;
                    (byContinent[s.continent] = byContinent[s.continent] || new Set()).add(s.country);
                });
                let added = 0;
                Object.entries(byContinent).forEach(([cont, countries]) => {
                    let contNode = world.children.find(c => c.name.toLowerCase() === cont.toLowerCase());
                    if (!contNode) {
                        contNode = { name: cont, children: [] };
                        world.children.push(contNode);
                        termPrint(`✔ Added continent "${cont}"`, "term-ok");
                        added++;
                    }
                    countries.forEach(country => {
                        if (!contNode.children.find(c => c.name.toLowerCase() === country.toLowerCase())) {
                            contNode.children.push({ name: country, children: [] });
                            termPrint(`  + "${country}" under "${cont}"`, "term-info");
                            added++;
                        }
                    });
                });
                if (!added) { termPrint("✔ Tree already matches scene data.", "term-ok"); return; }
                persistTree();
                if (typeof refreshTree === "function") refreshTree();
                termPrint(`✔ Synced ${added} node${added !== 1 ? "s" : ""} from scene data.`, "term-ok");
                return;
            }

            if (verb === "tree" && noun === "reset") {
                const ok = await showConfirm({ icon: "🌳", title: "Reset world tree?", msg: "Clears all tree overrides and reloads the default tree from init.js. This cannot be undone.", okLabel: "Reset", okClass: "admin-btn-danger" });
                if (!ok) { termPrint("Cancelled.", "term-info"); return; }
                localStorage.removeItem(LS_TREE);
                localStorage.removeItem(LS_TREE_OPEN);
                location.reload();
                return;
            }

            // ── DB: add new database ──────────────────────────────────────────
            if (verb === "db" && noun === "add") {
                // db add <key> <label>
                // Adds a new in-memory database slot backed by a new global array.
                const dbKey = (parts[2] || "").toLowerCase().replace(/[^a-z0-9_]/g, "");
                const dbLabel = parts.slice(3).join(" ");
                if (!dbKey || !dbLabel) { termPrint("Usage: db add <key> <label>  (e.g. db add poland Poland)", "term-err"); return; }
                if (DB_MAP[dbKey]) { termPrint(`DB "${dbKey}" already exists (${DB_MAP[dbKey].label}).`, "term-err"); return; }

                // Create a new global array for the db and register it
                const arrName = `${dbKey}Scenes`;
                if (!window[arrName]) window[arrName] = [];
                DB_MAP[dbKey] = {
                    label: dbLabel,
                    color: `db-${dbKey}`,
                    getArr: () => window[arrName],
                };

                // Update all <select> elements that list dbs
                ["aDb", "importDb"].forEach(selId => {
                    const sel = document.getElementById(selId);
                    if (sel && !sel.querySelector(`option[value="${dbKey}"]`)) {
                        const opt = document.createElement("option");
                        opt.value = dbKey;
                        opt.textContent = dbLabel;
                        sel.appendChild(opt);
                    }
                });

                learnRemember("dbKey", dbKey);
                termPrint(`✔ Registered DB "${dbLabel}" (key: ${dbKey}).`, "term-ok");
                termPrint(`  Note: this DB only persists for this session. To make it permanent, add the scene array to your JS data files.`, "term-info");
                return;
            }

            if (verb === "db" && noun === "list") {
                termPrint("── Registered Databases ──", "term-info");
                Object.entries(DB_MAP).forEach(([k, info]) => {
                    const n = info.getArr().filter(s => !deletedIds.has(s.id)).length;
                    termPrint(`  ${k.padEnd(16)} ${info.label.padEnd(20)} ${n} active scenes`, "term-info");
                });
                return;
            }

            // ── Scene: add (full inline create) ──────────────────────────────
            if (verb === "scene" && noun === "add") {
                // scene add <db> <id> <name> -- prompts aren't possible in terminal, so
                // we support a JSON payload OR open the Add form pre-filled.
                const dbKey = (parts[2] || "").toLowerCase();
                const sceneId = parts[3];
                const sceneName = parts.slice(4).join(" ");

                if (!dbKey || !DB_MAP[dbKey]) {
                    termPrint("Usage: scene add <dbKey> <id> <name>", "term-err");
                    termPrint(`  Available dbs: ${Object.keys(DB_MAP).join(", ")}`, "term-info");
                    termPrint("  This creates a minimal stub scene and opens it in the form for you to fill out.", "term-info");
                    return;
                }
                if (!sceneId || !sceneName) { termPrint("Usage: scene add <dbKey> <id> <name>", "term-err"); return; }
                if (getSceneById(sceneId)) { termPrint(`ID "${sceneId}" already exists. Use 'open ${sceneId}' to edit it.`, "term-err"); return; }

                // Create a stub scene and open the form to fill it out
                const stub = {
                    id: sceneId, name: sceneName,
                    startYear: 0, endYear: 0,
                    imgKey: sceneId,
                    continent: DB_MAP[dbKey].label.includes("Europe") ? "Europe" :
                               DB_MAP[dbKey].label.includes("Asia") ? "Asia" :
                               DB_MAP[dbKey].label.includes("Africa") ? "Africa" : "",
                    country: "", season: "", region: "",
                    coords: [0, 0], zoom: 5,
                    info: "", events: [],
                    _adminAdded: true,
                };
                loadSceneIntoForm(stub, dbKey);
                // Pre-fill the id since we're in add mode not edit mode
                document.getElementById("aId").value = sceneId;
                document.getElementById("aId").readOnly = false;
                switchToTab("add");
                termPrint(`✔ Opened form for new scene "${sceneName}" (${sceneId}) in ${DB_MAP[dbKey].label}.`, "term-ok");
                termPrint("  Fill in the remaining fields and click Save Entry.", "term-info");
                return;
            }

            if (verb === "scene" && noun === "js") {
                // Generate and print JS for a scene
                const sceneId = parts[2];
                if (!sceneId) { termPrint("Usage: scene js <sceneId>", "term-err"); return; }
                const found = getSceneById(sceneId);
                if (!found) { termPrint(`Scene "${sceneId}" not found.`, "term-err"); return; }
                const js = generateEntryJS(found.scene, found.dbKey);
                termPrint(`── JS for ${sceneId} ──`, "term-info");
                const jsLines = js.split("\n");
                const jsLimit = 40;
                (_showAll ? jsLines : jsLines.slice(0, jsLimit)).forEach(l => termPrint(l, "term-info"));
                if (!_showAll && jsLines.length > jsLimit)
                    termPrint(`… (${jsLines.length - jsLimit} more lines). Add "all" to see everything.`, "term-info");
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(js).then(() => termPrint("✔ Copied to clipboard.", "term-ok")).catch(() => {});
                }
                return;
            }

            if (verb === "scene" && noun === "copy-js") {
                const sceneId = parts[2];
                if (!sceneId) { termPrint("Usage: scene copy-js <sceneId>", "term-err"); return; }
                const found = getSceneById(sceneId);
                if (!found) { termPrint(`Scene "${sceneId}" not found.`, "term-err"); return; }
                const js = generateEntryJS(found.scene, found.dbKey);
                if (navigator.clipboard) {
                    await navigator.clipboard.writeText(js);
                    termPrint(`✔ JS for "${sceneId}" copied to clipboard.`, "term-ok");
                } else {
                    termPrint("Clipboard not available.", "term-err");
                }
                return;
            }

            if (verb === "scene" && noun === "delete") {
                // scene delete <sceneId> — soft delete
                const sceneId = parts[2];
                if (!sceneId) { termPrint("Usage: scene delete <sceneId>", "term-err"); return; }
                const found = getSceneById(sceneId);
                if (!found) { termPrint(`Scene "${sceneId}" not found.`, "term-err"); return; }
                await termSoftDeleteMany([found], `scene "${sceneId}"`);
                return;
            }

            // ── Announce: targeted ────────────────────────────────────────────
            if (verb === "announce" && noun === "user") {
                // announce user <username> <type> <message>
                const username = parts[2];
                const TYPES = ["info","warning","success","error","update","event"];
                let type = "info", msgParts = parts.slice(3);
                if (TYPES.includes((parts[3] || "").toLowerCase())) { type = parts[3].toLowerCase(); msgParts = parts.slice(4); }
                const message = msgParts.join(" ");
                if (!username || !message) { termPrint("Usage: announce user <username> [type] <message>", "term-err"); return; }
                const token = window.WHDAuth?.getToken();
                if (!token) { termPrint("Not authenticated.", "term-err"); return; }
                const r = await fetch(WORKER_URL + "/auth/announcement", {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token, message, type, active: true, targets: [username] })
                }).then(x => x.json()).catch(() => ({ ok: false }));
                if (r.ok) termPrint(`✔ Published [${type}] to @${username}: "${message}"`, "term-ok");
                else termPrint("Error: " + (r.error || "request failed"), "term-err");
                return;
            }

            // ── Panel navigation ──────────────────────────────────────────────
            if (verb === "panel" && noun === "goto") {
                const tab = parts[2];
                const validTabs = ["add", "manage", "tree", "bugs", "owner", "info"];
                if (!tab || !validTabs.includes(tab)) {
                    termPrint(`Usage: panel goto <${validTabs.join("|")}>`, "term-err"); return;
                }
                switchToTab(tab);
                termPrint(`✔ Switched to "${tab}" tab.`, "term-ok");
                return;
            }

            if (verb === "panel" && noun === "close") {
                closePanel();
                return;
            }

            termPrint(`Unknown command: "${cmd}". Tab to autocomplete.`, "term-err");

        } catch (err) {
            termPrint("Error: " + (err?.message || String(err)), "term-err");
        }
    }

    // ── Public API for owner-panel.js ─────────────────────────────────────
    // owner-panel.js builds its own fullscreen terminal overlay but drives
    // the same command engine (runTermCommand, matchCommand, TERM_COMMANDS).
    // Everything here is read-only; owner-panel.js never writes back into
    // the admin IIFE's private state.
    window.WHDAdmin = {
        run:    (raw) => runTermCommand(raw),
        print:  (text, cls) => termPrint(text, cls),
        match:  (tokens) => matchCommand(tokens),
        confirm: (opts) => showConfirm(opts),
        // Live reference to the shared history array so the owner panel
        // and the admin terminal share history seamlessly.
        get history() { return _termHistory; },
        get watchInterval() { return _watchInterval; },
        set watchInterval(v) { _watchInterval = v; },
        // The full command list (populated by commands.js after this runs)
        get commands() { return typeof TERM_COMMANDS !== "undefined" ? TERM_COMMANDS : []; },
    };

    // ── Remote Config helpers (global CSS overrides + feature flags) ──
    // Talks to the worker's /auth/remoteconfig endpoints so changes are
    // synced to every connected client, not just localStorage on this device.
    async function remoteConfigCall(body, readOnly) {
        try {
            if (readOnly) {
                const res = await fetch(WORKER_URL + "/auth/remoteconfig/status");
                return await res.json().catch(() => ({ ok: false, error: "Bad response" }));
            }
            const token = window.WHDAuth ? window.WHDAuth.getToken() : null;
            const res = await fetch(WORKER_URL + "/auth/remoteconfig", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, ...body }),
            });
            return await res.json().catch(() => ({ ok: false, error: "Bad response" }));
        } catch (err) {
            return { ok: false, error: err && err.message ? err.message : "Network error" };
        }
    }

    let _termStyleEl = null;
    function applyRemoteConfigToPage(config) {
        if (!config) return;
        // CSS overrides — rebuild a single <style> tag from the synced rule list.
        if (Array.isArray(config.cssRules)) {
            _lastCssRules = config.cssRules;
            if (!_termStyleEl) {
                _termStyleEl = document.createElement("style");
                _termStyleEl.id = "whd-terminal-css-overrides";
                document.head.appendChild(_termStyleEl);
            }
            _termStyleEl.textContent = config.cssRules
                .map(r => `${r.selector} { ${r.property}: ${r.value} !important; }`)
                .join("\n");
        }
        // Feature flags — stash on window and broadcast an event so the main
        // app (script.js) can listen for whd:terminal-activate and react.
        if (config.flags && typeof config.flags === "object") {
            window.WHD_FLAGS = config.flags;
            Object.entries(config.flags).forEach(([flag, value]) => {
                window.dispatchEvent(new CustomEvent("whd:terminal-activate", { detail: { flag, value } }));
            });
        }
    }

    // Load and apply the synced remote config as soon as the admin panel
    // boots, so CSS overrides/flags set by a previous session still show.
    remoteConfigCall(null, true).then(res => { if (res && res.ok) applyRemoteConfigToPage(res); });

    (function initTerminal() {
        const input   = document.getElementById("adminTermInput");
        const btn     = document.getElementById("adminTermRunBtn");
        const suggest = document.getElementById("adminTermSuggest");
        const hintLine = document.getElementById("adminTermHint");
        const ghost   = document.getElementById("adminTermGhost");
        if (!input || !btn) return;

        let histIdx = _termHistory.length;
        let suggIdx = -1;

        // Inline ("ghost text") ahead-of-cursor completion, VS Code/Copilot-
        // style: the part already typed is rendered invisibly (so it lines
        // up exactly under the real input text) followed by the rest of the
        // top suggestion in dim gray. Accepted with → (at end of input) or Tab.
        function updateGhost(raw) {
            if (!ghost) return;
            const completion = getInlineGhost(raw);
            if (!completion || !raw) { ghost.innerHTML = ""; return; }
            ghost.innerHTML = "";
            const typedSpan = document.createElement("span");
            typedSpan.className = "ghost-typed";
            typedSpan.textContent = raw;
            const restSpan = document.createElement("span");
            restSpan.className = "ghost-rest";
            restSpan.textContent = completion.slice(raw.length);
            ghost.append(typedSpan, restSpan);
        }
        function acceptGhost() {
            const completion = getInlineGhost(input.value);
            if (!completion || completion.length <= input.value.length) return false;
            input.value = completion;
            updateHint(input.value);
            updateGhost(input.value);
            renderSuggest(input.value);
            return true;
        }

        // Hint line: shows the command's usage under the input, e.g.
        // "set years  <sceneId> <startYear> <endYear>" while typing the
        // command name, or just the remaining args once the command name
        // is finished. This is a plain line of text below the input — not
        // an overlay on top of it — so there's no font-metric alignment
        // math involved and nothing for it to drift out of sync with.
        function updateHint(raw) {
            if (!hintLine) return;
            const trimmed = raw.trimStart();
            if (!trimmed) { hintLine.textContent = ""; return; }

            const tokens = trimmed.split(/\s+/);
            const match = matchCommand(tokens);
            const endsWithSpace = /\s$/.test(raw);

            if (match && match.cmd.hint) {
                const commandIsFinished = (endsWithSpace || tokens.length > match.cmdLen) && !stillExtendingLongerCmd(tokens, endsWithSpace);
                if (commandIsFinished) {
                    const filledArgs = endsWithSpace
                        ? tokens.length - match.cmdLen
                        : tokens.length - match.cmdLen - 1;

                    // Use args[] labels when available — they are authoritative for how
                    // many named slots exist. hintParts (split from the hint string) can
                    // over-count for variadic commands like "bulk set country <country>
                    // <id1> [id2...]" where the trailing IDs are open-ended, or
                    // under-count when a single arg value spans multiple tokens (e.g. a
                    // multi-word country name). With args[], once filledArgs >= the
                    // number of defined arg slots the hint clears immediately.
                    if (match.cmd.args && match.cmd.args.length) {
                        // "edit scenes" uses a "--" separator; once that token is present
                        // the ID list is open-ended. Show the remaining tail hint instead.
                        if (match.cmd.cmd === "edit scenes" && tokens.includes("--")) {
                            const afterSep = tokens.slice(tokens.indexOf("--") + 1);
                            if (afterSep.length === 0 || (afterSep.length === 1 && !endsWithSpace))
                                { hintLine.textContent = "<field>  <value>"; return; }
                            if (afterSep.length === 1 && endsWithSpace)
                                { hintLine.textContent = "<value>"; return; }
                            hintLine.textContent = ""; return;
                        }

                        // Past the last defined slot (variadic tail): hint is clear.
                        if (filledArgs >= match.cmd.args.length) {
                            hintLine.textContent = ""; return;
                        }
                        // Build a hint string from the remaining named args only.
                        const remaining = match.cmd.args.slice(filledArgs)
                            .map(a => "<" + a.label + ">").join("  ");
                        if (remaining) { hintLine.textContent = remaining; return; }
                    } else {
                        // No args metadata: fall back to splitting the hint string.
                        const hintParts = match.cmd.hint.replace(/[<>\[\]]/g, "").trim().split(/\s+/).filter(Boolean);
                        const remaining = hintParts.slice(filledArgs).join("  ");
                        if (remaining) { hintLine.textContent = remaining; return; }
                    }
                } else {
                    // Still typing the command name — show its full usage as a preview.
                    hintLine.textContent = `${match.cmd.cmd}  ${match.cmd.hint}`;
                    return;
                }
            }
            hintLine.textContent = "";
        }

        // ── VS Code–style fuzzy matching ────────────────────────────────────
        // Scores how well `query` matches `candidate` as an ordered (but not
        // necessarily contiguous) subsequence of characters, the same basic
        // approach VS Code's Quick Open / IntelliSense use. Rewards, in order
        // of weight: an exact match, a match starting at a word boundary
        // (after a space/-/_/.), a long unbroken run of matched characters,
        // and matching early in the candidate. Returns null when `query`
        // isn't a subsequence of `candidate` at all (no match), otherwise
        // { score, matches } where `matches` are the matched char indices —
        // used to bold exactly the matched letters, wherever they fall,
        // instead of only ever bolding one contiguous substring.
        function fuzzyScore(candidate, query) {
            const c = candidate.toLowerCase();
            const q = query.toLowerCase();
            if (!q) return { score: 0, matches: [] };
            if (c === q) return { score: 10000, matches: Array.from({ length: c.length }, (_, i) => i) };

            let qi = 0, score = 0, run = 0, lastIdx = -2;
            const matches = [];
            for (let ci = 0; ci < c.length && qi < q.length; ci++) {
                if (c[ci] !== q[qi]) continue;
                matches.push(ci);
                if (ci === lastIdx + 1) { run++; score += 8 + run * 4; }
                else { run = 0; score += 2; }
                if (ci === 0 || /[\s\-_./]/.test(c[ci - 1])) score += 12;
                if (qi === 0) score += Math.max(0, 6 - ci);
                lastIdx = ci;
                qi++;
            }
            if (qi < q.length) return null; // query has chars not found in order
            if (c.startsWith(q)) score += 30;
            score -= c.length * 0.15; // mild bias toward shorter/tighter candidates
            return { score, matches };
        }

        // Ranks a list of candidates against `query` using fuzzyScore, drops
        // non-matches, and returns them best-first. `keyFn` extracts the
        // string to match against from each candidate (defaults to identity).
        function fuzzyRank(candidates, query, keyFn = (x) => x) {
            if (!query) return candidates.map(item => ({ item, score: 0, matches: [] }));
            const ranked = [];
            for (const item of candidates) {
                const res = fuzzyScore(String(keyFn(item)), query);
                if (res) ranked.push({ item, score: res.score, matches: res.matches });
            }
            ranked.sort((a, b) => b.score - a.score);
            return ranked;
        }

        // Wraps the characters at `matches` indices in <b> tags for display.
        function highlightMatches(text, matches) {
            if (!matches || !matches.length) return escHtml(text);
            const set = new Set(matches);
            let html = "", inRun = false;
            for (let i = 0; i < text.length; i++) {
                const hit = set.has(i);
                if (hit && !inRun) { html += "<b>"; inRun = true; }
                if (!hit && inRun) { html += "</b>"; inRun = false; }
                html += escHtml(text[i]);
            }
            if (inRun) html += "</b>";
            return html;
        }

        function escHtml(s) { return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

        // Find the longest TERM_COMMANDS entry whose cmd is an exact match for
        // the first N typed tokens (commands are 1-3 words: "css", "css var",
        // "flag clear all"). Returns null while the command itself is still
        // being typed, so command-name completion still works as before.
        function matchCommand(tokens) {
            for (let len = Math.min(3, tokens.length); len >= 1; len--) {
                const prefix = tokens.slice(0, len).join(" ").toLowerCase();
                const cmd = TERM_COMMANDS.find(c => c.cmd.toLowerCase() === prefix);
                if (cmd) return { cmd, cmdLen: len };
            }
            return null;
        }

        // True if the last (currently-typed, not-yet-space-terminated) token
        // is still a viable prefix of a LONGER command name than the one
        // matchCommand already resolved. Without this check, typing "set y"
        // immediately matches the short generic "set" command and starts
        // showing argument suggestions (e.g. scene IDs) even though the user
        // may still be typing "set years" — a longer command name. This is
        // the source of arg/placeholder suggestions appearing to show up
        // "already filled out" while the command name itself is incomplete.
        function stillExtendingLongerCmd(tokens, endsWithSpace) {
            if (endsWithSpace || !tokens.length) return false;
            const lastIdx = tokens.length - 1;
            const lastPartial = tokens[lastIdx].toLowerCase();
            return TERM_COMMANDS.some(c => {
                const words = c.cmd.toLowerCase().split(" ");
                if (words.length <= tokens.length) return false;
                for (let i = 0; i < lastIdx; i++) if (words[i] !== tokens[i].toLowerCase()) return false;
                return words[lastIdx].startsWith(lastPartial);
            });
        }

        // Returns either:
        //   { mode:"cmd", items:[TERM_COMMANDS...] }              — completing the command name
        //   { mode:"arg", items:["value1","value2",...], label }  — completing an argument value
        function getSuggestions(raw) {
            const endsWithSpace = /\s$/.test(raw);
            const tokens = raw.trim().length ? raw.trim().split(/\s+/) : [];
            const match = tokens.length ? matchCommand(tokens) : null;

            // Only treat this as "completing an argument" once the command
            // itself is unambiguously finished — i.e. there's a trailing
            // space, or more tokens already follow it. Otherwise a single
            // word like "find" or "css" would be treated as both the command
            // AND the start of its own first argument, and accepting a
            // suggestion would clobber the command word itself.
            // Guard: match may be null if no command matches yet.
            const commandIsFinished = match && (endsWithSpace || tokens.length > match.cmdLen) && !stillExtendingLongerCmd(tokens, endsWithSpace);
            if (match && commandIsFinished && match.cmd.args && match.cmd.args.length) {
                const argIdx = endsWithSpace
                    ? tokens.length - match.cmdLen
                    : Math.max(0, tokens.length - match.cmdLen - 1);
                const argMeta = match.cmd.args[argIdx] || (
                    // Past the last defined slot: if the last arg looks like a
                    // repeatable value (scene IDs, db keys), keep suggesting it.
                    // This covers variadic commands like "bulk delete <id1> [id2...]"
                    // or "bulk set country <country> <id1> [id2...]" where the user
                    // keeps appending more IDs after the defined slots run out.
                    match.cmd.args[match.cmd.args.length - 1]
                );
                if (argMeta) {
                    const partial = (!endsWithSpace && tokens.length > match.cmdLen)
                        ? tokens[tokens.length - 1].toLowerCase() : "";
                    let candidates = [];
                    try { candidates = argMeta.source() || []; } catch { candidates = []; }
                    candidates = candidates.filter(v => v != null);
                    const argKey = (v) => (v && typeof v === "object" ? v.value : v);
                    const ranked = fuzzyRank(candidates, partial, argKey).slice(0, 30);
                    const items = ranked.map(r => r.item);
                    return { mode: "arg", items, label: argMeta.label };
                }
                // Past the last defined argument slot (e.g. a free-text field
                // like <name> with no suggestion source) — nothing to suggest,
                // close cleanly instead of falling through to a whole-string
                // command-name match below.
                return { mode: "arg", items: [], label: null };
            }

            const typed = raw.trimStart().toLowerCase();
            if (!typed) return { mode: "cmd", items: [] };
            // Rank every command by fuzzy subsequence score (exact/prefix/word-
            // boundary/contiguous-run matches all score higher), instead of the
            // old exact-then-prefix-then-substring bucketing — this lets e.g.
            // "stcty" surface "set country" the way VS Code's command palette
            // would, while still always ranking exact and prefix hits highest.
            const ranked = fuzzyRank(TERM_COMMANDS, typed, c => c.cmd);
            return { mode: "cmd", items: ranked.map(r => r.item) };
        }

        // Inline ("ghost text") completion: returns the full string the
        // input would become if the top suggestion were accepted, but ONLY
        // when that suggestion is an unambiguous prefix-completion of what's
        // already typed (e.g. "se" -> "set"). A fuzzy/subsequence match like
        // "stcty" -> "set country" has no clean "rest of the word" to show
        // inline, so it's left to the dropdown instead. Returns null when
        // there's nothing sensible to ghost.
        function getInlineGhost(raw) {
            if (!raw) return null;
            const { mode, items } = getSuggestions(raw);
            if (!items || !items.length) return null;

            if (mode === "cmd") {
                const trimmed = raw.trimStart();
                const lead = raw.slice(0, raw.length - trimmed.length);
                const top = items[0].cmd;
                if (trimmed && top.toLowerCase().startsWith(trimmed.toLowerCase()) && top.length > trimmed.length) {
                    return lead + top;
                }
                return null;
            }

            if (/\s$/.test(raw)) return null; // nothing typed yet for this argument
            const tokens = raw.trim().length ? raw.trim().split(/\s+/) : [];
            const partial = tokens[tokens.length - 1] || "";
            if (!partial) return null;
            const top = items[0];
            const val = (top && typeof top === "object") ? top.value : top;
            if (val == null) return null;
            const valStr = String(val);
            if (valStr.toLowerCase().startsWith(partial.toLowerCase()) && valStr.length > partial.length) {
                return raw.slice(0, raw.length - partial.length) + valStr;
            }
            return null;
        }

        function renderSuggest(raw) {
            if (!suggest) return;
            const { mode, items, label } = getSuggestions(raw);
            if (!items.length) { closeSuggest(); return; }
            suggest.innerHTML = "";
            suggIdx = -1;

            if (mode === "cmd") {
                const typed = raw.trimStart().toLowerCase();
                items.forEach(c => {
                    const item = document.createElement("div");
                    item.className = "admin-term-sugg-item";
                    const iconEl = document.createElement("span");
                    iconEl.className = "admin-term-sugg-icon";
                    iconEl.textContent = (c.cat || "?").charAt(0).toUpperCase();
                    const cmdEl = document.createElement("span");
                    cmdEl.className = "admin-term-sugg-cmd";
                    // Highlight every matched character (VS Code-style subsequence
                    // highlight), not just one contiguous substring.
                    const fz = typed ? fuzzyScore(c.cmd, typed) : null;
                    cmdEl.innerHTML = fz ? highlightMatches(c.cmd, fz.matches) : escHtml(c.cmd);
                    const hintEl = document.createElement("span");
                    hintEl.className = "admin-term-sugg-hint";
                    hintEl.textContent = c.hint;
                    const descEl = document.createElement("span");
                    descEl.className = "admin-term-sugg-desc";
                    descEl.textContent = c.desc;
                    const catEl = document.createElement("span");
                    catEl.className = "admin-term-sugg-cat";
                    catEl.textContent = c.cat;
                    item.append(iconEl, cmdEl, hintEl, descEl, catEl);
                    item.addEventListener("mousedown", e => { e.preventDefault(); acceptSuggestion(mode, c); });
                    suggest.appendChild(item);
                });
            } else {
                // Argument-value suggestions with enriched context labels.
                // For sceneId args: show the human-readable scene name as a sub-label.
                // For other args: show the argument slot name (label) on the right.
                const _sceneNameMap = {};
                if (label === "sceneId" || label === "targetId" || label === "sourceId") {
                    termAllActiveScenes().forEach(m => { _sceneNameMap[m.scene.id] = m.scene.name; });
                }
                const _deletedNameMap = {};
                if (label === "sceneId") {
                    Array.from(deletedIds).forEach(id => {
                        const stored = deletedSceneStore[id];
                        if (stored) _deletedNameMap[id] = stored.name;
                    });
                }

                const typedPartial = (() => {
                    const endsWithSpace = /\s$/.test(raw);
                    const tokens = raw.trim().length ? raw.trim().split(/\s+/) : [];
                    return endsWithSpace ? "" : (tokens[tokens.length - 1] || "").toLowerCase();
                })();

                items.forEach(rawItem => {
                    const val  = (rawItem && typeof rawItem === "object") ? rawItem.value : rawItem;
                    const desc = (rawItem && typeof rawItem === "object") ? rawItem.desc  : "";
                    const item = document.createElement("div");
                    item.className = "admin-term-sugg-item admin-term-sugg-item-arg";
                    const iconEl = document.createElement("span");
                    iconEl.className = "admin-term-sugg-icon admin-term-sugg-icon-arg";
                    iconEl.textContent = (label || "?").charAt(0).toUpperCase();
                    const cmdEl = document.createElement("span");
                    cmdEl.className = "admin-term-sugg-cmd";
                    const fz = typedPartial ? fuzzyScore(String(val), typedPartial) : null;
                    cmdEl.innerHTML = fz ? highlightMatches(String(val), fz.matches) : escHtml(String(val));

                    // Prefer a real per-item description (e.g. what a function
                    // does) over the generic scene-name/label sub-text.
                    const subLabel = desc || _sceneNameMap[val] || _deletedNameMap[val] || label || "";
                    const hintEl = document.createElement("span");
                    hintEl.className = "admin-term-sugg-hint" + (desc ? " admin-term-sugg-hint-desc" : "");
                    hintEl.textContent = subLabel;

                    item.append(iconEl, cmdEl, hintEl);
                    item.addEventListener("mousedown", e => { e.preventDefault(); acceptSuggestion(mode, rawItem); });
                    suggest.appendChild(item);
                });
            }
            suggest.classList.add("open");
        }

        function closeSuggest() {
            if (!suggest) return;
            suggest.classList.remove("open");
            suggest.innerHTML = "";
            suggIdx = -1;
        }

        function acceptSuggestion(mode, choice) {
            if (mode === "cmd") {
                input.value = choice.cmd + (choice.hint ? " " : "");
            } else {
                const value = (choice && typeof choice === "object") ? choice.value : choice;
                const endsWithSpace = /\s$/.test(input.value);
                const tokens = input.value.trim().length ? input.value.trim().split(/\s+/) : [];
                const match = matchCommand(tokens);
                const cmdLen = match ? match.cmdLen : 0;
                const keepCount = endsWithSpace ? tokens.length : Math.max(cmdLen, tokens.length - 1);
                const kept = tokens.slice(0, keepCount);
                input.value = kept.join(" ") + (kept.length ? " " : "") + value + " ";
            }
            closeSuggest();
            input.focus();
            updateHint(input.value);
            updateGhost(input.value);
            renderSuggest(input.value); // immediately offer the next argument, if any
        }

        function moveSuggIdx(dir) {
            if (!suggest?.classList.contains("open")) return false;
            const items = suggest.querySelectorAll(".admin-term-sugg-item");
            if (!items.length) return false;
            items[suggIdx]?.classList.remove("active");
            suggIdx = Math.max(0, Math.min(items.length - 1, suggIdx + dir));
            items[suggIdx].classList.add("active");
            items[suggIdx].scrollIntoView({ block: "nearest" });
            return true;
        }

        const run = () => {
            const val = input.value.trim();
            if (!val) return;
            _termHistory.push(val);
            histIdx = _termHistory.length;
            input.value = "";
            if (hintLine) hintLine.textContent = "";
            if (ghost) ghost.innerHTML = "";
            closeSuggest();
            runTermCommand(val);
        };

        btn.addEventListener("click", run);

        input.addEventListener("keydown", e => {
            const open = suggest?.classList.contains("open");
            if (e.key === "ArrowRight" && !open &&
                input.selectionStart === input.value.length && input.selectionEnd === input.value.length) {
                if (acceptGhost()) { e.preventDefault(); return; }
            }
            if (e.key === "Enter") {
                if (open && suggIdx >= 0) {
                    const { mode, items } = getSuggestions(input.value);
                    if (items[suggIdx] !== undefined) { acceptSuggestion(mode, items[suggIdx]); e.preventDefault(); return; }
                }
                run(); return;
            }
            if (e.key === "Tab") {
                e.preventDefault();
                if (acceptGhost()) return;
                const { mode, items } = getSuggestions(input.value);
                if (!items.length) return;
                if (items.length === 1 || (open && suggIdx >= 0)) {
                    acceptSuggestion(mode, items[open && suggIdx >= 0 ? suggIdx : 0]); return;
                }
                if (mode === "cmd") {
                    // Complete to longest common prefix
                    const lcp = items.reduce((common, c) => {
                        let i = 0;
                        while (i < common.length && c.cmd[i] === common[i]) i++;
                        return common.slice(0, i);
                    }, items[0].cmd);
                    if (lcp.length > input.value.trimStart().length) input.value = lcp + " ";
                }
                renderSuggest(input.value);
                return;
            }
            if (e.key === "Escape") { if (open) { closeSuggest(); e.preventDefault(); } return; }
            if (e.key === "ArrowDown") {
                if (open) { moveSuggIdx(1); e.preventDefault(); return; }
                if (histIdx < _termHistory.length) { input.value = _termHistory[++histIdx] || ""; updateHint(input.value); updateGhost(input.value); renderSuggest(input.value); }
                e.preventDefault(); return;
            }
            if (e.key === "ArrowUp") {
                if (open) { moveSuggIdx(-1); e.preventDefault(); return; }
                if (histIdx > 0) { input.value = _termHistory[--histIdx]; updateHint(input.value); updateGhost(input.value); renderSuggest(input.value); }
                e.preventDefault(); return;
            }
        });

        input.addEventListener("input", () => {
            histIdx = _termHistory.length;
            updateHint(input.value);
            updateGhost(input.value);
            renderSuggest(input.value);
        });
        input.addEventListener("blur",  () => { setTimeout(closeSuggest, 120); if (hintLine) hintLine.textContent = ""; if (ghost) ghost.innerHTML = ""; });
        input.addEventListener("focus", () => { if (input.value) { updateHint(input.value); updateGhost(input.value); renderSuggest(input.value); } });

        // Expose the real engine internals on WHDAdmin so other terminal UIs
        // (owner-panel.js) share the exact same matching/suggestion logic and
        // its fixes, instead of re-implementing — and forking — the same bugs.
        // This also replaces the earlier WHDAdmin.match stub, which referenced
        // matchCommand before it existed in scope and would have thrown.
        Object.assign(window.WHDAdmin, {
            match: matchCommand,
            getSuggestions,
            getInlineGhost,
            fuzzyScore,
            getHintText: (raw) => { updateHint(raw); return hintLine ? hintLine.textContent : ""; },
            setOutput: (id) => { _termOutputId = id || "adminTermOutput"; },
            bootMessage: () => printTermBootMessage(),
        });
    })();

    function refreshDeletedList() {
        const ids = Array.from(deletedIds);
        const container = document.getElementById("adminDeletedList");
        const empty = document.getElementById("adminDeletedEmpty");
        const bulk = document.getElementById("adminDeletedBulkBar");
        const badge = document.getElementById("adminDeletedBadge");
        if (!container || !empty || !bulk) return;

        container.innerHTML = "";
        if (badge) {
            badge.textContent = ids.length;
            badge.style.display = ids.length ? "inline-flex" : "none";
        }

        if (ids.length === 0) {
            empty.style.display = "block";
            bulk.style.display = "none";
            return;
        }

        empty.style.display = "none";
        bulk.style.display = "flex";

        ids.forEach(sceneId => {
            let dbKey, s;
            const stored = deletedSceneStore[sceneId];
            if (stored) {
                dbKey = stored._dbKey;
                s = stored;
            } else {
                const found = getSceneById(sceneId);
                if (!found) return; // unknown scene, skip
                dbKey = found.dbKey;
                s = found.scene;
            }
            const row = document.createElement("div");
            row.className = "admin-scene-row";
            const sy = s.startYear < 0 ? Math.abs(s.startYear)+"BC" : s.startYear;
            const ey = s.endYear   < 0 ? Math.abs(s.endYear)+"BC"   : s.endYear;

            const inner = document.createElement("div");
            inner.style.cssText = "display:flex;align-items:center;flex:1;gap:8px;min-width:0;";
            inner.innerHTML = `
                <div class="admin-scene-info" style="flex:1;min-width:0;">
                    <div class="admin-scene-name">${escHtml(s.name)}</div>
                    <div class="admin-scene-meta">${escHtml(s.country||"")} · ${escHtml(s.season||"")} · ${sy}–${ey}</div>
                </div>
                <span class="admin-scene-db db-${dbKey}" style="flex-shrink:0;">${DB_MAP[dbKey].label}</span>
                <div class="admin-scene-actions" style="flex-shrink:0;display:flex;gap:6px;">
                    <button class="admin-btn admin-btn-secondary" style="padding:4px 9px;font-size:11px;" data-restore>↺ Restore</button>
                    <button class="admin-btn admin-btn-danger" style="padding:4px 9px;font-size:11px;" data-purge>💀 Purge</button>
                </div>
            `;
            inner.querySelector("[data-restore]").addEventListener("click", () => {
                deletedIds.delete(sceneId);
                persistDeleted();

                // Re-add to live arrays so the main app can see it again
                const arr = DB_MAP[dbKey] ? DB_MAP[dbKey].getArr() : null;
                if (arr && !arr.find(x => x.id === sceneId)) arr.push({ ...s });
                if (!scenes.find(x => x.id === sceneId)) scenes.push({ ...s });

                refreshDeletedList();
                refreshManageList();
                toast(`✔ Restored "${s.name}"`);
            });
            inner.querySelector("[data-purge]").addEventListener("click", async () => {
                const ok = await showConfirm({
                    icon: "💀",
                    title: "Permanently delete?",
                    msg: `This permanently removes "${s.name}" from the local session and cannot be restored.`,
                    okLabel: "Purge",
                    okClass: "admin-btn-danger"
                });
                if (!ok) return;
                deletedIds.delete(sceneId);
                persistDeleted();
                const arr = DB_MAP[dbKey].getArr();
                const idx = arr.findIndex(x => x.id === sceneId);
                if (idx !== -1) arr.splice(idx, 1);
                const si = scenes.findIndex(x => x.id === sceneId);
                if (si !== -1) scenes.splice(si, 1);
                const savedScenes = (lsGet(LS_SCENES) || []).filter(x => x.id !== sceneId);
                lsSet(LS_SCENES, savedScenes);
                refreshDeletedList();
                refreshManageList();
                toast(`✔ Permanently deleted "${s.name}"`);
            });

            row.appendChild(inner);
            container.appendChild(row);
        });
    }

    // ── WORLD TREE TAB ─────────────────────────────────────────────
    function refreshTree() {
        const container = document.getElementById("adminTreeContainer");
        container.innerHTML = "";
        renderTreeChildren(world.children, container, 0);
        // Add top-level "add continent" row
        appendAddRow(container, "Add new continent…", node => {
            world.children.push(node);
            persistTree();
            refreshTree();
        }, 0);
    }

    function renderTreeChildren(nodes, container, depth) {
        if (!nodes) return;
        nodes.forEach((node, nodeIdx) => {
            const block = document.createElement("div");
            block.className = "admin-tree-block";
            const indent = document.createElement("div");
            if (depth > 0) indent.className = "admin-tree-indent";

            // Node row
            const row = document.createElement("div");
            row.className = "admin-tree-node";
            const hasChildren = Array.isArray(node.children) && node.children.length > 0;
            const nodeKey = (node.name || "") + "_" + depth;
            // Default open for depth 0, closed for deeper
            if (!(nodeKey in treeOpenState)) treeOpenState[nodeKey] = (depth === 0);
            const isOpen = treeOpenState[nodeKey];

            const icon = node.children !== undefined ? (depth === 0 ? "🌍" : depth === 1 ? "🗺" : "📂") : "📺";
            const toggleBtn = document.createElement("button");
            toggleBtn.className = "admin-tree-toggle" + (isOpen ? " open" : "");
            toggleBtn.textContent = "▶";
            toggleBtn.style.visibility = (node.children !== undefined) ? "visible" : "hidden";

            const nameSpan = document.createElement("span");
            nameSpan.className = "admin-tree-node-name";
            nameSpan.textContent = icon + " " + (node.name || "");

            const actionsDiv = document.createElement("div");
            actionsDiv.className = "admin-tree-node-actions";

            const delBtn = document.createElement("button");
            delBtn.className = "admin-btn admin-btn-danger";
            delBtn.style.cssText = "padding:2px 8px;font-size:11px;";
            delBtn.textContent = "🗑";
            delBtn.addEventListener("click", () => deleteTreeNode(node, nodes, nodeIdx));
            actionsDiv.appendChild(delBtn);

            row.appendChild(toggleBtn);
            row.appendChild(nameSpan);
            row.appendChild(actionsDiv);

            // Children container
            const childrenDiv = document.createElement("div");
            childrenDiv.className = "admin-tree-children" + (isOpen ? "" : " collapsed");

            if (node.children !== undefined) {
                renderTreeChildren(node.children, childrenDiv, depth + 1);
                // "Add child" row inside childrenDiv
                appendAddRow(childrenDiv, `Add child to "${node.name}"…`, newNode => {
                    node.children.push(newNode);
                    persistTree();
                    refreshTree();
                }, depth + 1);
            } else if (node.episodes !== undefined) {
                const meta = document.createElement("div");
                meta.style.cssText = "font-size:11px;color:rgba(255,255,255,0.3);padding:2px 0 6px 4px;";
                meta.textContent = node.episodes.length + " episode(s)";
                childrenDiv.appendChild(meta);
            }

            toggleBtn.addEventListener("click", () => {
                const nowOpen = childrenDiv.classList.toggle("collapsed");
                // collapsed toggled: if classList has collapsed, it's now closed
                const open = !childrenDiv.classList.contains("collapsed");
                toggleBtn.classList.toggle("open", open);
                treeOpenState[nodeKey] = open;
                lsSet(LS_TREE_OPEN, treeOpenState);
            });

            if (depth > 0) {
                indent.appendChild(row);
                indent.appendChild(childrenDiv);
                block.appendChild(indent);
            } else {
                block.appendChild(row);
                block.appendChild(childrenDiv);
            }
            container.appendChild(block);
        });
    }

    function appendAddRow(container, placeholder, onAdd, depth) {
        const addRow = document.createElement("div");
        addRow.className = "admin-tree-add-row";
        if (depth > 0) addRow.style.paddingLeft = "20px";
        addRow.innerHTML = `<input type="text" placeholder="${escHtml(placeholder)}"/>
                            <button class="admin-btn admin-btn-primary" style="white-space:nowrap;font-size:11px;padding:5px 10px;">+ Add</button>`;
        const inp = addRow.querySelector("input");
        addRow.querySelector("button").addEventListener("click", () => {
            const v = inp.value.trim();
            if (!v) return;
            const isLeaf = depth >= 2;
            const newNode = isLeaf ? { name: v, episodes: [] } : { name: v, children: [] };
            onAdd(newNode);
            toast(`✔ Added "${v}"`);
            inp.value = "";
        });
        inp.addEventListener("keydown", e => { if (e.key === "Enter") addRow.querySelector("button").click(); });
        container.appendChild(addRow);
    }

    async function deleteTreeNode(node, parentArr, idx) {
        const childCount = Array.isArray(node.children) ? node.children.length : 0;
        const ok = await showConfirm({
            icon: "🌳",
            title: `Remove "${node.name}"?`,
            msg: childCount > 0
                ? `This will also remove its ${childCount} child node(s). The change will persist locally.`
                : "This node will be removed from the navigation tree. The change will persist locally.",
            okLabel: "Remove",
            okClass: "admin-btn-danger"
        });
        if (!ok) return;
        parentArr.splice(idx, 1);
        persistTree();
        toast(`✔ Removed "${node.name}" from tree`);
        refreshTree();
    }

    // ── Admin Settings Page ──────────────────────────────────────────
    // ADMIN_SETTINGS_LS declared at top of IIFE

    // ── Generic Component Settings ─────────────────────────────

function adminLiveComponent(cssVar, value) {
    document.documentElement.style.setProperty(cssVar, value);
}

function adminSaveComponent(key, value) {
    const s = loadAdminSettings();
    s[key] = value;
    saveAdminSettings(s);
    toast("✔ Setting saved");
}

function adminSaveSetting(key, value) {
    const s = loadAdminSettings();
    s[key] = Number(value);
    saveAdminSettings(s);
}

function adminResetComponent(key, inputId, ...cssVars) {

    const defaults = {
        startBtnColor: "#c0161f",
        seasonBtnColor: "#c0161f",
        controlBtnColor: "#ffffff",
        infoTitleColor: "#c0161f",
        dragBarColor: "#c0161f",
        headerColor: "#ffffff"
    };

    const val = defaults[key] || "#c0161f";

    const input = document.getElementById(inputId);
    if (input) input.value = val;

    cssVars.forEach(v => {
        document.documentElement.style.setProperty(v, val);
    });

    const s = loadAdminSettings();
    s[key] = val;
    saveAdminSettings(s);

    toast("✔ Reset to default");
}

// ── Map Style ──────────────────────────────────────────────

function adminSaveMapStyle(style) {

    const s = loadAdminSettings();
    s.mapStyle = style;
    saveAdminSettings(s);
    pushToMainSettings("mapStyle", style);

    if (typeof window.setMapStyle === "function") {
        window.setMapStyle(style);
    }

    toast("✔ Map style updated");
}

// ── Audio ──────────────────────────────────────────────────

function adminLiveBgm(val) {

    document.getElementById("adminBgmVolumeLabel").textContent = val + "%";

    const s = loadAdminSettings();
    s.bgmVolume = Number(val);
    saveAdminSettings(s);
    pushToMainSettings("bgmVolume", Number(val));

    if (window.bgmAudio) {
        window.bgmAudio.volume = val / 100;
    }
}

function adminLiveSfx(val) {
    document.getElementById("adminSfxVolumeLabel").textContent = val + "%";
    const s = loadAdminSettings();
    s.sfxVolume = Number(val);
    saveAdminSettings(s);
    pushToMainSettings("sfxVolume", Number(val));
}

    function loadAdminSettings() {
        try {
            const raw = localStorage.getItem(ADMIN_SETTINGS_LS);
            return raw ? JSON.parse(raw) : { accent: "#c0161f", vignette: 75, blur: 12, radius: 10, fontSize: 14 };
        } catch(e) { return { accent: "#c0161f", vignette: 75, blur: 12, radius: 10, fontSize: 14 }; }
    }

    function saveAdminSettings(s) {
        try { localStorage.setItem(ADMIN_SETTINGS_LS, JSON.stringify(s)); } catch(e) {}
    }

    // Write a key/value pair into the main whd_settings store so script.js picks it up on reload
    function pushToMainSettings(key, val) {
        try {
            const ms = JSON.parse(localStorage.getItem("whd_settings") || "{}");
            ms[key] = val;
            localStorage.setItem("whd_settings", JSON.stringify(ms));
        } catch(e) {}
    }

    function hexToRgbParts(hex) {
        const n = parseInt((hex || "#c0161f").replace("#",""), 16);
        return [(n>>16)&255, (n>>8)&255, n&255];
    }

    function applyAdminAccentToDOM(hex) {
        const [r,g,b] = hexToRgbParts(hex);
        const root = document.documentElement;
        root.style.setProperty("--accent",      hex);
        root.style.setProperty("--accent-dim",  `rgba(${r},${g},${b},0.55)`);
        root.style.setProperty("--accent-glow", `rgba(${r},${g},${b},0.25)`);
        if (typeof _applyAccentLightClass === "function") {
            _applyAccentLightClass(hex);
        } else {
            const lin = c => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
            document.body.classList.toggle("accent-is-light", 0.2126*lin(r) + 0.7152*lin(g) + 0.0722*lin(b) > 0.4);
        }
        const cp = document.getElementById("adminSettingsColorPicker");
        if (cp) cp.value = hex;
        const lbl = document.getElementById("adminAccentHexLabel");
        if (lbl) lbl.textContent = hex;
    }

    function adminLiveAccent(hex) {
        applyAdminAccentToDOM(hex);
        const lbl = document.getElementById("adminAccentHexLabel");
        if (lbl) lbl.textContent = hex;
    }

    function adminSaveAccent(hex) {
        applyAdminAccentToDOM(hex);
        const s = loadAdminSettings();
        s.accent = hex;
        saveAdminSettings(s);
        // Also push into main settings system so it persists across reloads
        try {
            const ms = JSON.parse(localStorage.getItem("whd_settings") || "{}");
            ms.customAccent = hex;
            localStorage.setItem("whd_settings", JSON.stringify(ms));
        } catch(e) {}
        toast("✔ Accent colour saved");
    }

    function adminLiveVignette(val) {
        document.getElementById("adminVignetteLabel").textContent = val + "%";
        const od = document.getElementById("overlay");
        if (od) od.style.background = `radial-gradient(circle, rgba(0,0,0,${(val/100)*0.25}), rgba(0,0,0,${val/100}))`;
        const s = loadAdminSettings(); s.vignette = Number(val); saveAdminSettings(s);
        pushToMainSettings("overlay", Number(val));
    }

    function adminLiveBlur(val) {
        document.getElementById("adminBlurLabel").textContent = val + "px";
        document.documentElement.style.setProperty("--panel-blur", val + "px");
        const s = loadAdminSettings(); s.blur = Number(val); saveAdminSettings(s);
        pushToMainSettings("blur", Number(val));
    }

    function adminLiveRadius(val) {
        document.getElementById("adminRadiusLabel").textContent = val + "px";
        document.documentElement.style.setProperty("--radius", val + "px");
        const s = loadAdminSettings(); s.radius = Number(val); saveAdminSettings(s);
    }

    function adminLiveFontSize(val) {
        const px = Number(val);
        document.getElementById("adminFontSizeLabel").textContent = px + "px";
        document.documentElement.style.setProperty("--ui-font-size", px + "px");
        // Apply to main panel/info text via a second var
        document.documentElement.style.setProperty("--panel-font-size", px + "px");
        const preview = document.getElementById("adminFontPreview");
        if (preview) preview.style.fontSize = px + "px";
        const s = loadAdminSettings(); s.fontSize = px; saveAdminSettings(s);
        pushToMainSettings("fontSize", px);
    }

    function syncAdminSettingsPage() {
        const s = loadAdminSettings();
        const cp = document.getElementById("adminSettingsColorPicker");
        if (cp) cp.value = s.accent || "#c0161f";
        const lbl = document.getElementById("adminAccentHexLabel");
        if (lbl) lbl.textContent = s.accent || "#c0161f";
        // Sync slider positions
        const vig = s.vignette != null ? s.vignette : 75;
        const blur = s.blur != null ? s.blur : 12;
        const rad  = s.radius != null ? s.radius : 10;
        const bgm  = s.bgmVolume != null ? s.bgmVolume : 50;
        const sfx  = s.sfxVolume != null ? s.sfxVolume : 70;
        const vs = document.getElementById("adminVignetteSlider");  if (vs) vs.value = vig;
        const vl = document.getElementById("adminVignetteLabel");   if (vl) vl.textContent = vig + "%";
        const bs = document.getElementById("adminBlurSlider");      if (bs) bs.value = blur;
        const bl = document.getElementById("adminBlurLabel");       if (bl) bl.textContent = blur + "px";
        const rs = document.getElementById("adminRadiusSlider");    if (rs) rs.value = rad;
        const rl = document.getElementById("adminRadiusLabel");     if (rl) rl.textContent = rad + "px";
        const bgms = document.getElementById("adminBgmSlider");     if (bgms) bgms.value = bgm;
        const bgml = document.getElementById("adminBgmVolumeLabel");if (bgml) bgml.textContent = bgm + "%";
        const sfxs = document.getElementById("adminSfxSlider");     if (sfxs) sfxs.value = sfx;
        const sfxl = document.getElementById("adminSfxVolumeLabel");if (sfxl) sfxl.textContent = sfx + "%";
        const ms = document.getElementById("adminMapStyleSelect");  if (ms && s.mapStyle) ms.value = s.mapStyle;
        // Font size
        const fontSize = s.fontSize != null ? s.fontSize : 14;
        const fss = document.getElementById("adminFontSizeSlider"); if (fss) fss.value = fontSize;
        const fsl = document.getElementById("adminFontSizeLabel");  if (fsl) fsl.textContent = fontSize + "px";
        const preview = document.getElementById("adminFontPreview"); if (preview) preview.style.fontSize = fontSize + "px";
    }

    // Reset button
    const adminSettingsResetBtn = document.getElementById("adminSettingsResetBtn");
    if (adminSettingsResetBtn) {
        adminSettingsResetBtn.addEventListener("click", async () => {
            const ok = await showConfirm({
                icon: "↺",
                title: "Reset Accent Colour?",
                msg: "Resets the accent colour to the default Crimson.",
                okLabel: "Reset",
                okClass: "admin-btn-warn"
            });
            if (!ok) return;
            const def = { accent: "#c0161f" };
            const s = loadAdminSettings();
            s.accent = def.accent;
            saveAdminSettings(s);
            applyAdminAccentToDOM(def.accent);
            syncAdminSettingsPage();
            toast("✔ Accent colour reset to default");
        });
    }

    // Open settings page → sync UI
    document.addEventListener("click", function(e) {
        const tab = e.target.closest(".admin-tab");
    });

    // On load: apply saved admin settings
    (function() {
        const s = loadAdminSettings();
        applyAdminAccentToDOM(s.accent || "#c0161f");
        const od = document.getElementById("overlay");
        if (od) od.style.background = `radial-gradient(circle, rgba(0,0,0,${(s.vignette/100)*0.25}), rgba(0,0,0,${s.vignette/100}))`;
        document.documentElement.style.setProperty("--panel-blur", (s.blur || 12) + "px");
        document.documentElement.style.setProperty("--radius",     (s.radius || 10) + "px");
        document.documentElement.style.setProperty("--ui-font-size", (s.fontSize || 14) + "px");
        document.documentElement.style.setProperty("--panel-font-size", (s.fontSize || 14) + "px");
    })();

    // ── Auto-fill continent from db selection ─────────────────────
    document.getElementById("aDb").addEventListener("change", function () {
        const hints = { europe:"Europe", asia:"Asia", africa:"Africa", australia:"Australia", historybites:"Mini Histories" };
        if (!document.getElementById("aContinent").value)
            document.getElementById("aContinent").value = hints[this.value] || "";
    });

    // ── INFO TAB ────────────────────────────────────────────────────
    function refreshInfoTab() {
        // Stats
        const totalScenes = scenes.length;
        const addedScenes = (lsGet(LS_SCENES) || []).length;
        const deletedCount = (lsGet(LS_DELETED) || []).length;

        const statsEl = document.getElementById("adminInfoStats");
        if (statsEl) {
            statsEl.innerHTML = `
                <div class="admin-info-stat-card"><div class="admin-info-stat-num">${totalScenes}</div><div class="admin-info-stat-label">Total Scenes</div></div>
                <div class="admin-info-stat-card"><div class="admin-info-stat-num">${addedScenes}</div><div class="admin-info-stat-label">Admin Added</div></div>
                <div class="admin-info-stat-card"><div class="admin-info-stat-num">${deletedCount}</div><div class="admin-info-stat-label">Hidden Scenes</div></div>
            `;
        }

        // Breakdown by DB
        const dbCounts = { europe: 0, asia: 0, africa: 0, australia: 0, historybites: 0 };
        scenes.forEach(s => {
            const db = s._db || (
                typeof europeScenes !== "undefined" && europeScenes.find(x=>x.id===s.id) ? "europe" :
                typeof asiaScenes !== "undefined" && asiaScenes.find(x=>x.id===s.id) ? "asia" :
                typeof africaScenes !== "undefined" && africaScenes.find(x=>x.id===s.id) ? "africa" :
                typeof australiaScenes !== "undefined" && australiaScenes.find(x=>x.id===s.id) ? "australia" :
                typeof historyBitesScenes !== "undefined" && historyBitesScenes.find(x=>x.id===s.id) ? "historybites" : "other"
            );
            if (db in dbCounts) dbCounts[db]++;
        });
        const maxCount = Math.max(...Object.values(dbCounts), 1);
        const dbLabels = { europe:"Europe", asia:"Asia", africa:"Africa", australia:"Australia", historybites:"History Bites" };
        const breakdownEl = document.getElementById("adminInfoBreakdown");
        if (breakdownEl) {
            breakdownEl.innerHTML = Object.entries(dbCounts).map(([db,count]) => `
                <div class="admin-info-bar-row">
                    <div class="admin-info-bar-name">${dbLabels[db]}</div>
                    <div class="admin-info-bar-track"><div class="admin-info-bar-fill" style="width:${Math.round(count/maxCount*100)}%"></div></div>
                    <div class="admin-info-bar-count">${count}</div>
                </div>
            `).join("");
        }

        // DB list
        const dbListEl = document.getElementById("adminInfoDbList");
        if (dbListEl) {
            const loaded = ["Europe","Asia","Africa","Australia","History Bites"].filter((_, i) => {
                const checks = [typeof europeScenes, typeof asiaScenes, typeof africaScenes, typeof australiaScenes, typeof historyBitesScenes];
                return checks[i] !== "undefined";
            });
            dbListEl.textContent = loaded.join(", ");
        }

        // LS size
        const lsSizeEl = document.getElementById("adminInfoLsSize");
        if (lsSizeEl) {
            try {
                let total = 0;
                for (let k in localStorage) {
                    if (!localStorage.hasOwnProperty(k)) continue;
                    total += (localStorage.getItem(k) || "").length + k.length;
                }
                lsSizeEl.textContent = (total / 1024).toFixed(1) + " KB";
            } catch(e) { lsSizeEl.textContent = "N/A"; }
        }
    }

    function adminClearAddedScenes() {
        showConfirm({
            icon: "🗑️",
            title: "Clear All Admin-Added Scenes?",
            msg: "This removes all scenes added through this admin panel. Original database scenes are kept.",
            okLabel: "Clear",
            okClass: "admin-btn-danger"
        }).then(ok => {
            if (!ok) return;
            lsSet(LS_SCENES, []);
            // Remove from live scenes array
            scenes.splice(0, scenes.length, ...(typeof europeScenes !== "undefined" ? europeScenes : []),
                ...(typeof asiaScenes !== "undefined" ? asiaScenes : []),
                ...(typeof africaScenes !== "undefined" ? africaScenes : []),
                ...(typeof australiaScenes !== "undefined" ? australiaScenes : []),
                ...(typeof historyBitesScenes !== "undefined" ? historyBitesScenes : []));
            toast("✔ Admin-added scenes cleared");
            refreshInfoTab();
        });
    }

    function adminRestoreDeleted() {
        showConfirm({
            icon: "↺",
            title: "Restore All Deleted Scenes?",
            msg: "All hidden scenes will become visible again.",
            okLabel: "Restore",
            okClass: "admin-btn-warn"
        }).then(ok => {
            if (!ok) return;
            // Re-add every deleted scene to its live array and the global scenes array
            Array.from(deletedIds).forEach(sceneId => {
                const stored = deletedSceneStore[sceneId];
                if (!stored) return;
                const dbKey = stored._dbKey;
                const arr = DB_MAP[dbKey] ? DB_MAP[dbKey].getArr() : null;
                if (arr && !arr.find(x => x.id === sceneId)) arr.push({ ...stored });
                if (!scenes.find(x => x.id === sceneId)) scenes.push({ ...stored });
            });
            lsSet(LS_DELETED, []);
            deletedIds.clear();
            refreshDeletedList();
            refreshManageList();
            toast("✔ All deleted scenes restored");
            refreshInfoTab();
        });
    }

    function adminPurgeAllDeleted() {
        showConfirm({
            icon: "💀",
            title: "Permanently delete all deleted scenes?",
            msg: "This will permanently remove all deleted scenes from the local session.",
            okLabel: "Purge All",
            okClass: "admin-btn-danger"
        }).then(ok => {
            if (!ok) return;
            const ids = Array.from(deletedIds);
            deletedIds.clear();
            lsSet(LS_DELETED, []);
            ids.forEach(sceneId => {
                const found = getSceneById(sceneId);
                if (!found) return;
                const arr = DB_MAP[found.dbKey].getArr();
                const idx = arr.findIndex(x => x.id === sceneId);
                if (idx !== -1) arr.splice(idx, 1);
                const si = scenes.findIndex(x => x.id === sceneId);
                if (si !== -1) scenes.splice(si, 1);
            });
            const savedScenes = (lsGet(LS_SCENES) || []).filter(x => !ids.includes(x.id));
            lsSet(LS_SCENES, savedScenes);
            refreshDeletedList();
            refreshManageList();
            toast("✔ All deleted scenes permanently removed");
            refreshInfoTab();
        });
    }

    // Expose danger-zone functions so inline onclick= attributes in the HTML can reach them
    window.adminClearAddedScenes = adminClearAddedScenes;
    window.adminRestoreDeleted   = adminRestoreDeleted;
    window.adminPurgeAllDeleted  = adminPurgeAllDeleted;
    // Expose settings live-update functions for inline oninput=/onchange= attributes
    // Admin settings functions (now handled by main settings)
    window.adminLiveFontSize = adminLiveFontSize;

    // Wire info tab refresh when opened
    const _origShowTab = window._adminShowTab;
    // Hook into existing tab switcher — patch after it's set up
    document.addEventListener("click", function(e) {
        const tab = e.target.closest(".admin-tab");
        if (tab && tab.dataset.tab === "info") {
            setTimeout(refreshInfoTab, 50);
        }
        if (tab && tab.dataset.tab === "settings") {
            setTimeout(syncAdminSettingsPage, 30);
        }
    });

    // Apply admin-only settings (e.g. border-radius) that have no whd_settings equivalent
    (function applyAdminOnlySettings() {
        try {
            const s = loadAdminSettings();
            if (s.radius != null) {
                document.documentElement.style.setProperty("--radius", s.radius + "px");
            }
            if (s.fontSize != null) {
                document.documentElement.style.setProperty("--ui-font-size", s.fontSize + "px");
                document.documentElement.style.setProperty("--panel-font-size", s.fontSize + "px");
            }
        } catch(e) {}
    })();

    if (typeof initCustomSelects === "function") {
        initCustomSelects(["aDb", "importDb", "importContinent", "importCountry", "importSeason", "adminAnnounceType"]);
    }

    function _refreshAdminBugsBadge() {
        const badge = document.getElementById("adminBugsBadge");
        if (!badge) return;
        try {
            const reports = (typeof getCachedBugReports === "function") ? getCachedBugReports() : [];
            const open = reports.filter(r => !r.resolved).length;
            badge.textContent = open;
            badge.style.display = open > 0 ? "inline-block" : "none";
        } catch(e) {
            badge.style.display = "none";
        }
    }
    // Update badge whenever the shared bug list refreshes (new report from
    // anyone, resolve/reopen/delete from any admin, initial load, etc.)
    window.addEventListener("whd:bugs:updated", _refreshAdminBugsBadge);
    if (typeof loadBugReports === "function") loadBugReports().then(_refreshAdminBugsBadge);

})();