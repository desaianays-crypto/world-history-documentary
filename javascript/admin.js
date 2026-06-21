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
                <div class="admin-tab admin-tab-owner" data-tab="owner" id="adminOwnerTab" style="display:none">👑 Owner</div>
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

                <div class="admin-page" data-page="owner">
                    <p class="admin-section-title">👑 Owner Controls <span style="font-size:11px;color:rgba(255,255,255,0.35);font-weight:400;margin-left:8px;">Owner only</span></p>

                    <div class="admin-owner-tabs">
                        <button class="admin-owner-tab active" data-otab="users">👥 Users</button>
                        <button class="admin-owner-tab" data-otab="announce">📢 Announce</button>
                        <button class="admin-owner-tab" data-otab="updatelog">📋 Update Log</button>
                        <button class="admin-owner-tab" data-otab="site">🚧 Site</button>
                    </div>

                    <!-- USERS TAB -->
                    <div class="admin-owner-tabpanel active" id="adminOwnerTab-users">
                        <div class="admin-users-search-row">
                            <input id="adminUserSearch" type="text" class="admin-input" placeholder="Search username…" oninput="adminUsersFilter()"/>
                            <button class="admin-btn admin-btn-secondary" onclick="adminUsersRefresh()">↺ Refresh</button>
                        </div>
                        <div id="adminUsersList" class="admin-users-list">
                            <div class="admin-users-loading">Loading users…</div>
                        </div>
                    </div>

                    <!-- ANNOUNCE TAB -->
                    <div class="admin-owner-tabpanel" id="adminOwnerTab-announce">
                        <p style="font-size:12px;color:rgba(255,255,255,0.4);margin:0 0 14px;">Send a global announcement banner to all users. It appears at the top of the app until dismissed or cleared.</p>
                        <div class="admin-field">
                            <label>Message</label>
                            <textarea id="adminAnnounceText" rows="3" class="admin-input" placeholder="Announcement text… (max 300 chars)" style="resize:vertical;min-height:72px;" maxlength="300" oninput="document.getElementById('adminAnnounceCharCount').textContent=this.value.length+'/300'"></textarea>
                            <div style="font-size:11px;color:rgba(255,255,255,0.3);text-align:right;margin-top:3px;" id="adminAnnounceCharCount">0/300</div>
                        </div>
                        <div class="admin-field" style="margin-top:8px;">
                            <label>Type</label>
                            <select id="adminAnnounceType" class="admin-input" style="width:auto;">
                                <option value="info">ℹ Info</option>
                                <option value="warning">⚠ Warning</option>
                                <option value="success">✅ Success</option>
                                <option value="error">⛔ Error</option>
                                <option value="update">🛠 Update</option>
                                <option value="event">✦ Event</option>
                            </select>
                        </div>
                        <div class="admin-field" style="margin-top:8px;">
                            <label>Recipients <span style="font-size:11px;color:rgba(255,255,255,0.3);font-weight:400;">leave empty to send to everyone</span></label>
                            <div id="adminAnnounceRecipients" class="admin-recipient-picker">
                                <div id="adminAnnounceChips" class="admin-recipient-chips"></div>
                                <input id="adminAnnounceRecipientInput" type="text" class="admin-recipient-input" placeholder="Type a username…" autocomplete="off"/>
                                <div id="adminAnnounceRecipientMenu" class="admin-recipient-menu"></div>
                            </div>
                        </div>
                        <div class="admin-btn-row" style="margin-top:12px;">
                            <button class="admin-btn admin-btn-primary" onclick="adminSendAnnouncement()">📢 Publish</button>
                            <button class="admin-btn admin-btn-danger" onclick="adminClearAnnouncement()">✕ Clear Banner</button>
                        </div>
                        <div id="adminAnnounceResult" style="font-size:12px;color:rgba(255,255,255,0.45);min-height:16px;margin-top:10px;"></div>
                        <p class="admin-section-title" style="margin-top:18px;">Current Banner</p>
                        <div id="adminAnnouncePreview" style="font-size:12px;color:rgba(255,255,255,0.35);padding:8px 0;">No active announcement.</div>
                    </div>

                    <!-- SITE TAB -->
                    <div class="admin-owner-tabpanel" id="adminOwnerTab-site">
                        <p style="font-size:12px;color:rgba(255,255,255,0.4);margin:0 0 16px;">Maintenance mode blocks regular users from accessing the site. Admins and the owner always bypass it.</p>
                        <div class="admin-maintenance-row">
                            <div class="admin-maintenance-label">
                                <span style="font-size:13px;font-weight:600;color:#e8e8e8;">🚧 Maintenance Mode</span>
                                <span style="font-size:11px;color:rgba(255,255,255,0.35);">You and admins can always bypass.</span>
                            </div>
                            <button class="acct-maintenance-toggle off" id="adminMaintToggleBtn">Loading…</button>
                        </div>
                    </div>

                    <!-- UPDATE LOG TAB -->
                    <div class="admin-owner-tabpanel" id="adminOwnerTab-updatelog">
                        <p style="font-size:12px;color:rgba(255,255,255,0.4);margin:0 0 14px;">Manage version update entries. Each entry has a version tag, title, date, and list of changes. Users see these in the Info panel.</p>
                        <div class="admin-btn-row" style="margin-bottom:14px;">
                            <button class="admin-btn admin-btn-primary" id="adminULNewBtn">＋ New Entry</button>
                            <button class="admin-btn admin-btn-secondary" id="adminULRefreshBtn">↺ Refresh</button>
                        </div>
                        <!-- Tab strip for entries — rendered dynamically -->
                        <div id="adminULTabStrip" class="admin-ul-tabstrip"></div>
                        <!-- Editor for selected entry -->
                        <div id="adminULEditor" class="admin-ul-editor" style="display:none;">
                            <div class="admin-field">
                                <label>Version tag <span class="admin-field-hint">e.g. v1.4.2</span></label>
                                <input id="adminULVersion" type="text" class="admin-input" placeholder="v1.0.0" maxlength="20"/>
                            </div>
                            <div class="admin-field">
                                <label>Title <span class="admin-field-hint">short headline</span></label>
                                <input id="adminULTitle" type="text" class="admin-input" placeholder="What's new in this release?" maxlength="80"/>
                            </div>
                            <div class="admin-field">
                                <label>Date <span class="admin-field-hint">displayed as-is</span></label>
                                <input id="adminULDate" type="text" class="admin-input" placeholder="June 2025" maxlength="40"/>
                            </div>
                            <div class="admin-field">
                                <label>Changes <span class="admin-field-hint">one per line</span></label>
                                <textarea id="adminULChanges" class="admin-input" rows="6" style="resize:vertical;min-height:100px;" placeholder="Added timeline view&#10;Fixed audio crossfade bug&#10;Improved search speed"></textarea>
                            </div>
                            <div class="admin-btn-row" style="margin-top:10px;">
                                <button class="admin-btn admin-btn-primary" id="adminULSaveBtn">💾 Save Entry</button>
                                <button class="admin-btn admin-btn-danger" id="adminULDeleteBtn">🗑 Delete Entry</button>
                            </div>
                            <div id="adminULResult" style="font-size:12px;color:rgba(255,255,255,0.45);min-height:16px;margin-top:8px;"></div>
                        </div>
                        <div id="adminULEmpty" style="font-size:12px;color:rgba(255,255,255,0.3);padding:12px 0;">No update entries yet. Click + New Entry to add one.</div>
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
    `;

    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);

    // Replace native number-input spin arrows with styled custom steppers
    enhanceNumberInputs(["aStartYear", "aEndYear", "aLat", "aLng", "aZoom"]);

    // Make the tab strip mouse-drag-scrollable (overflow-x:auto alone only
    // supports touch/trackpad/scrollbar — plain click-and-drag with a mouse
    // doesn't scroll a div natively) and map vertical wheel to horizontal
    // scroll for convenience on a regular mouse.
    (function enableAdminTabsMouseScroll() {
        const tabs = document.getElementById("adminTabs");
        if (!tabs) return;
        let isDown = false, startX = 0, startScroll = 0;
        tabs._dragMoved = false;

        tabs.addEventListener("mousedown", e => {
            isDown = true;
            startX = e.pageX;
            startScroll = tabs.scrollLeft;
            tabs.classList.add("admin-tabs-dragging");
        });
        window.addEventListener("mousemove", e => {
            if (!isDown) return;
            const dx = e.pageX - startX;
            if (Math.abs(dx) > 5) tabs._dragMoved = true;
            tabs.scrollLeft = startScroll - dx;
        });
        window.addEventListener("mouseup", () => {
            if (!isDown) return;
            isDown = false;
            tabs.classList.remove("admin-tabs-dragging");
            // Clear the drag flag on the next tick — after any click event
            // from this same mouse-up has already had a chance to check it.
            if (tabs._dragMoved) setTimeout(() => { tabs._dragMoved = false; }, 0);
        });
        tabs.addEventListener("wheel", e => {
            if (e.deltaY === 0) return;
            tabs.scrollLeft += e.deltaY;
            e.preventDefault();
        }, { passive: false });
    })();

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

        document.getElementById("adminOverlay").style.display = "block";
        document.getElementById("adminPanel").classList.add("visible");
        setTimeout(() => document.getElementById("adminOverlay").classList.add("active"), 10);

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

        // Show Owner tab only for owner
        const ownerTab = document.getElementById("adminOwnerTab");
        if (ownerTab) ownerTab.style.display = isOwner ? "" : "none";

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
            const tabsEl = document.getElementById("adminTabs");
            if (tabsEl && tabsEl._dragMoved) return; // this click was the end of a drag-scroll, not a real tap
            document.querySelectorAll(".admin-tab").forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".admin-page").forEach(p => p.classList.remove("active"));
            tab.classList.add("active");
            const page = document.querySelector(`.admin-page[data-page="${tab.dataset.tab}"]`);
            if (page) page.classList.add("active");
            activeTab = tab.dataset.tab;
            if (activeTab === "owner") { adminUsersRefresh(); adminMaintLoad(); adminAnnounceLoad(); adminUpdateLogLoad(); }
            if (activeTab === "bugs")  { if (typeof renderBugsTab === "function") renderBugsTab(); }
        });
    });

    // Wire owner sub-tabs
    document.querySelectorAll(".admin-owner-tab").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".admin-owner-tab").forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".admin-owner-tabpanel").forEach(p => p.classList.remove("active"));
            tab.classList.add("active");
            const panel = document.getElementById("adminOwnerTab-" + tab.dataset.otab);
            if (panel) panel.classList.add("active");
        });
    });

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
        if (!token) return;
        const res = await fetch(WORKER_URL + "/auth/promote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, targetUsername: username, newRole }),
        }).then(r => r.json()).catch(() => ({ ok: false }));
        if (res.ok) {
            toast(`${username} is now ${newRole}.`);
            adminUsersRefresh();
        } else {
            toast(res.error || "Failed to change role.", true);
        }
    };

    // ── Announce sub-tab ────────────────────────────────────────────
    let _announceRecipients = []; // array of lowercase usernames currently chosen

    function _renderAnnounceChips() {
        const host = document.getElementById("adminAnnounceChips");
        if (!host) return;
        host.innerHTML = _announceRecipients.map(name => `
<span class="admin-recipient-chip" data-name="${escHtml(name)}">
  ${escHtml(name)}
  <button type="button" class="admin-recipient-chip-x" aria-label="Remove ${escHtml(name)}">×</button>
</span>`).join("");
        host.querySelectorAll(".admin-recipient-chip-x").forEach(btn => {
            btn.onclick = () => {
                const name = btn.closest(".admin-recipient-chip").dataset.name;
                _announceRecipients = _announceRecipients.filter(n => n !== name);
                _renderAnnounceChips();
            };
        });
    }

    function _addAnnounceRecipient(name) {
        const key = name.trim().toLowerCase();
        if (!key || _announceRecipients.includes(key)) return;
        _announceRecipients.push(key);
        _renderAnnounceChips();
        const input = document.getElementById("adminAnnounceRecipientInput");
        if (input) input.value = "";
        _closeAnnounceRecipientMenu();
    }

    function _closeAnnounceRecipientMenu() {
        const menu = document.getElementById("adminAnnounceRecipientMenu");
        if (menu) menu.classList.remove("open");
    }

    function _renderAnnounceRecipientMenu(query) {
        const menu = document.getElementById("adminAnnounceRecipientMenu");
        if (!menu) return;
        const q = (query || "").trim().toLowerCase();
        const pool = (_adminAllUsers || []).filter(u => !_announceRecipients.includes(u.username.toLowerCase()));
        const matches = q ? pool.filter(u => u.username.toLowerCase().includes(q)) : pool;
        if (matches.length === 0) {
            menu.innerHTML = `<div class="admin-recipient-empty">No matching users</div>`;
        } else {
            menu.innerHTML = matches.slice(0, 30).map(u => `
<div class="admin-recipient-opt" data-name="${escHtml(u.username)}">
  <div class="admin-recipient-opt-avatar">${escHtml(u.username.charAt(0).toUpperCase())}</div>
  <div class="admin-recipient-opt-name">${escHtml(u.username)}</div>
  <span class="admin-role-badge admin-role-${u.role}">${escHtml(u.role)}</span>
</div>`).join("");
            menu.querySelectorAll(".admin-recipient-opt").forEach(opt => {
                opt.onclick = () => _addAnnounceRecipient(opt.dataset.name);
            });
        }
        menu.classList.add("open");
    }

    function _initAnnounceRecipientPicker() {
        const input = document.getElementById("adminAnnounceRecipientInput");
        if (!input || input._announceWired) return;
        input._announceWired = true;
        input.addEventListener("focus", () => _renderAnnounceRecipientMenu(input.value));
        input.addEventListener("input", () => _renderAnnounceRecipientMenu(input.value));
        input.addEventListener("keydown", e => {
            if (e.key === "Enter" && input.value.trim()) {
                e.preventDefault();
                _addAnnounceRecipient(input.value);
            } else if (e.key === "Backspace" && !input.value && _announceRecipients.length) {
                _announceRecipients.pop();
                _renderAnnounceChips();
            } else if (e.key === "Escape") {
                _closeAnnounceRecipientMenu();
            }
        });
        document.addEventListener("click", e => {
            if (!e.target.closest("#adminAnnounceRecipients")) _closeAnnounceRecipientMenu();
        });
    }

    async function adminAnnounceLoad() {
        const preview = document.getElementById("adminAnnouncePreview");
        _initAnnounceRecipientPicker();
        if (!preview) return;
        try {
            const token = window.WHDAuth ? window.WHDAuth.getToken() : null;
            const r = await fetch(WORKER_URL + "/auth/announcement/status", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            });
            const d = await r.json();
            if (d.active && d.message) {
                const recipients = Array.isArray(d.targets) && d.targets.length
                    ? ` <span style="color:rgba(255,255,255,0.28);">• ${escHtml(d.targets.join(", "))}</span>`
                    : " <span style=\"color:rgba(255,255,255,0.28);\">• everyone</span>";
                preview.innerHTML = `${escHtml(d.message)}${recipients}`;
            } else {
                preview.textContent = "No active announcement.";
            }
        } catch { preview.textContent = "Could not load."; }
    }

    window.adminSendAnnouncement = async function() {
        const msg  = (document.getElementById("adminAnnounceText")?.value || "").trim();
        const type = document.getElementById("adminAnnounceType")?.value || "info";
        const targets = _announceRecipients.slice();
        const res  = document.getElementById("adminAnnounceResult");
        if (!msg) { if (res) res.textContent = "Enter a message first."; return; }
        if (res) res.textContent = "Publishing…";
        const token = window.WHDAuth ? window.WHDAuth.getToken() : null;
        const r = await fetch(WORKER_URL + "/auth/announcement", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, message: msg, type, active: true, targets }),
        }).then(r => r.json()).catch(() => ({ ok: false }));
        if (r.ok) {
            if (res) res.textContent = targets.length
                ? `✓ Announcement published to ${targets.length} ${targets.length === 1 ? "person" : "people"}.`
                : "✓ Announcement published to everyone.";
            adminAnnounceLoad();
        } else {
            if (res) res.textContent = r.error || "Failed.";
        }
    };

    window.adminClearAnnouncement = async function() {
        const res = document.getElementById("adminAnnounceResult");
        if (res) res.textContent = "Clearing…";
        const token = window.WHDAuth ? window.WHDAuth.getToken() : null;
        const r = await fetch(WORKER_URL + "/auth/announcement", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, message: "", type: "info", active: false }),
        }).then(r => r.json()).catch(() => ({ ok: false }));
        if (r.ok) {
            if (res) res.textContent = "✓ Banner cleared.";
            const ta = document.getElementById("adminAnnounceText");
            if (ta) { ta.value = ""; document.getElementById("adminAnnounceCharCount").textContent = "0/300"; }
            _announceRecipients = [];
            _renderAnnounceChips();
            adminAnnounceLoad();
        } else {
            if (res) res.textContent = r.error || "Failed.";
        }
    };

    window.adminOwnerDemote = async function(username) {
        await window.adminUsersSetRole(username, "user");
    };

    // ── Site/Maintenance sub-tab ────────────────────────────────────
    function adminMaintLoad() {
        const btn = document.getElementById("adminMaintToggleBtn");
        if (!btn) return;
        btn.textContent = "Loading…";
        btn.className = "acct-maintenance-toggle off";
        fetch(WORKER_URL + "/auth/maintenance/status")
        .then(r => r.json()).catch(() => ({}))
        .then(data => {
            const on = !!data.maintenance;
            btn.textContent = on ? "🚧 On — Click to Disable" : "Off — Click to Enable";
            btn.className   = "acct-maintenance-toggle " + (on ? "on" : "off");
            btn.dataset.on  = on ? "1" : "";
            btn.onclick = () => adminMaintToggle();
        });
    }

    async function adminMaintToggle() {
        const btn = document.getElementById("adminMaintToggleBtn");
        if (!btn) return;
        const currentlyOn = btn.dataset.on === "1";
        const newState    = !currentlyOn;
        btn.disabled      = true;
        btn.textContent   = "Saving…";
        const token = window.WHDAuth ? window.WHDAuth.getToken() : null;
        try {
            const res  = await fetch(WORKER_URL + "/auth/maintenance", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, on: newState }),
            });
            const data = await res.json().catch(() => ({}));
            if (data.ok) {
                btn.dataset.on  = newState ? "1" : "";
                btn.textContent = newState ? "🚧 On — Click to Disable" : "Off — Click to Enable";
                btn.className   = "acct-maintenance-toggle " + (newState ? "on" : "off");
                toast(newState ? "🚧 Maintenance mode ON" : "✅ Maintenance mode OFF");
            } else {
                btn.textContent = "Error: " + (data.error || "failed");
            }
        } catch {
            btn.textContent = "Network error";
        }
        btn.disabled = false;
    }

    // ── Update Log sub-tab ──────────────────────────────────────────
    let _ulEntries   = [];   // [{id, version, title, date, changes:[]}]
    let _ulActiveId  = null; // currently-selected entry id

    function adminUpdateLogLoad() {
        const strip = document.getElementById("adminULTabStrip");
        const editor = document.getElementById("adminULEditor");
        const empty  = document.getElementById("adminULEmpty");
        if (!strip) return;
        strip.innerHTML = "<span style='font-size:11px;color:rgba(255,255,255,0.3);'>Loading…</span>";
        if (editor) editor.style.display = "none";

        const token = window.WHDAuth ? window.WHDAuth.getToken() : null;
        fetch(WORKER_URL + "/auth/updatelog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, action: "list" }),
        }).then(r => r.json()).catch(() => ({ ok: false, entries: [] }))
        .then(data => {
            _ulEntries = (data.entries || []).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
            _ulRenderTabStrip();
            // Wire buttons
            const newBtn = document.getElementById("adminULNewBtn");
            if (newBtn) newBtn.onclick = _ulNewEntry;
            const refBtn = document.getElementById("adminULRefreshBtn");
            if (refBtn) refBtn.onclick = adminUpdateLogLoad;
        });
    }

    function _ulRenderTabStrip() {
        const strip  = document.getElementById("adminULTabStrip");
        const empty  = document.getElementById("adminULEmpty");
        const editor = document.getElementById("adminULEditor");
        if (!strip) return;

        if (_ulEntries.length === 0) {
            strip.innerHTML = "";
            if (empty)  empty.style.display  = "";
            if (editor) editor.style.display = "none";
            _ulActiveId = null;
            return;
        }
        if (empty) empty.style.display = "none";

        strip.innerHTML = _ulEntries.map(e =>
            `<button class="admin-ul-tab${e.id === _ulActiveId ? " active" : ""}" data-ulid="${e.id}">${escHtml(e.version || "?")}</button>`
        ).join("");
        strip.querySelectorAll(".admin-ul-tab").forEach(btn => {
            btn.onclick = () => {
                _ulActiveId = btn.dataset.ulid;
                _ulRenderTabStrip();
                _ulLoadEditor(_ulActiveId);
            };
        });

        // Auto-select first if nothing selected or selection gone
        if (!_ulActiveId || !_ulEntries.find(e => e.id === _ulActiveId)) {
            _ulActiveId = _ulEntries[0].id;
            _ulRenderTabStrip();
        }
        if (_ulActiveId) _ulLoadEditor(_ulActiveId);
    }

    function _ulLoadEditor(id) {
        const entry  = _ulEntries.find(e => e.id === id);
        const editor = document.getElementById("adminULEditor");
        if (!entry || !editor) return;
        editor.style.display = "";
        document.getElementById("adminULVersion").value  = entry.version  || "";
        document.getElementById("adminULTitle").value    = entry.title    || "";
        document.getElementById("adminULDate").value     = entry.date     || "";
        document.getElementById("adminULChanges").value  = (entry.changes || []).join("\n");
        document.getElementById("adminULResult").textContent = "";

        document.getElementById("adminULSaveBtn").onclick   = () => _ulSaveEntry(id);
        document.getElementById("adminULDeleteBtn").onclick = () => _ulDeleteEntry(id);
    }

    function _ulNewEntry() {
        const token = window.WHDAuth ? window.WHDAuth.getToken() : null;
        const now   = new Date();
        const month = now.toLocaleString("default", { month: "long" });
        const entry = {
            action: "save",
            token,
            id: null,  // server assigns
            version: "v" + ((_ulEntries.length + 1)),
            title: "New Update",
            date: month + " " + now.getDate() + ", " + now.getFullYear(),
            changes: [],
        };
        fetch(WORKER_URL + "/auth/updatelog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(entry),
        }).then(r => r.json()).catch(() => ({ ok: false }))
        .then(data => {
            if (data.ok && data.entry) {
                _ulEntries.unshift(data.entry);
                _ulActiveId = data.entry.id;
                _ulRenderTabStrip();
                toast("New entry created");
            } else {
                toast(data.error || "Failed to create entry", true);
            }
        });
    }

    function _ulSaveEntry(id) {
        const token   = window.WHDAuth ? window.WHDAuth.getToken() : null;
        const version = document.getElementById("adminULVersion").value.trim();
        const title   = document.getElementById("adminULTitle").value.trim();
        const date    = document.getElementById("adminULDate").value.trim();
        const changes = document.getElementById("adminULChanges").value
            .split("\n").map(l => l.trim()).filter(Boolean);
        const result  = document.getElementById("adminULResult");
        if (!version) { result.textContent = "Version tag is required."; return; }

        fetch(WORKER_URL + "/auth/updatelog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "save", token, id, version, title, date, changes }),
        }).then(r => r.json()).catch(() => ({ ok: false }))
        .then(data => {
            if (data.ok && data.entry) {
                const idx = _ulEntries.findIndex(e => e.id === id);
                if (idx >= 0) _ulEntries[idx] = data.entry;
                _ulRenderTabStrip();
                toast("Entry saved");
                if (result) result.textContent = "Saved.";
            } else {
                if (result) result.textContent = data.error || "Save failed.";
            }
        });
    }

    function _ulDeleteEntry(id) {
        const run = () => {
            const token = window.WHDAuth ? window.WHDAuth.getToken() : null;
            fetch(WORKER_URL + "/auth/updatelog", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "delete", token, id }),
            }).then(r => r.json()).catch(() => ({ ok: false }))
            .then(data => {
                if (data.ok) {
                    _ulEntries = _ulEntries.filter(e => e.id !== id);
                    _ulActiveId = null;
                    _ulRenderTabStrip();
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
        } else if (window.confirm("Delete this update entry?")) {
            run();
        }
    }

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
                if (arr.find(s => s.id === scene.id)) {
                    results.push({ ok: false, name: scene.name, reason: `ID "${scene.id}" already exists in ${DB_MAP[targetDb].label}` });
                    return;
                }
                const entry = normaliseScene(scene);
                entry._adminAdded = true;
                arr.push(entry);
                scenes.push(entry);
                results.push({ ok: true, name: scene.name, db: DB_MAP[targetDb].label });
            });
            persistScenes();
            const added  = results.filter(r => r.ok);
            const failed = results.filter(r => !r.ok);
            const rows = results.map(r =>
                r.ok
                ? `<div style="padding:3px 0;font-size:12px;color:#7dff9e;">✔ ${escHtml(r.name)} → ${escHtml(r.db)}</div>`
                : `<div style="padding:3px 0;font-size:12px;color:#ff7070;">✗ ${escHtml(r.name)}: ${escHtml(r.reason)}</div>`
            ).join("");
            document.getElementById("adminImportOutput").innerHTML =
                `<div style="background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:12px;max-height:200px;overflow-y:auto;">
                    <div style="font-size:11px;font-weight:700;letter-spacing:.08em;color:rgba(255,255,255,0.4);margin-bottom:8px;text-transform:uppercase;">${added.length} added · ${failed.length} failed</div>
                    ${rows}
                 </div>`;
            toast("Bulk import: " + added.length + " added, " + failed.length + " failed");
            return;
        }

        // ── SINGLE SCENE → load into manual form ────────────
        const scene = parsed;
        if (!scene.id || !scene.name) { toast("Scene must contain id and name", true); return; }
        applyOverridesToScene(scene);
        const targetDb = forceDb || autoDetectDb(scene);

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
            row.innerHTML = `
                <input type="checkbox" class="admin-cb" data-id="${s.id}" ${isSelected ? "checked" : ""}>
                <div style="display:flex;align-items:center;flex:1;gap:8px;min-width:0;">
                    <div class="admin-scene-info" style="flex:1;min-width:0;">
                        <div class="admin-scene-name">${adminHighlight(s.name, _toks)}${isEdited ? ' <span style="font-size:9px;color:#f5a623;border:1px solid rgba(200,120,0,0.4);border-radius:99px;padding:1px 5px;font-weight:700;">EDITED</span>' : ""}</div>
                        <div class="admin-scene-meta">${adminHighlight(s.country||"", _toks)} · ${adminHighlight(s.season||"", _toks)} · ${sy}–${ey}</div>
                    </div>
                    <span class="admin-scene-db db-${dbKey}" style="flex-shrink:0;">${DB_MAP[dbKey].label}</span>
                    <div class="admin-scene-actions" style="flex-shrink:0;">
                        <button class="admin-btn admin-btn-secondary" style="padding:4px 9px;font-size:11px;" data-dup title="Duplicate scene">⎘</button>
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