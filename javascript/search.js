// ── Trigram set for a string ──────────────────────────────────────
function _trigrams(str) {
    const s = " " + str.toLowerCase() + " ";
    const set = new Set();
    for (let i = 0; i < s.length - 2; i++) set.add(s.slice(i, i + 3));
    return set;
}

// ── Edit distance (Levenshtein), capped at 2 for speed ───────────
function _editDist(a, b) {
    if (Math.abs(a.length - b.length) > 2) return 99;
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = a[i-1] === b[j-1]
                ? dp[i-1][j-1]
                : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
            if (dp[i][j] > 2) { dp[i][j] = 99; break; }
        }
    }
    return dp[m][n];
}

// ── Parse a single token for year intent ─────────────────────────
// Returns { exact: number } | { prefix: string } | null
function _parseYearToken(tok) {
    const s = tok.trim().toLowerCase();
    if (!s) return null;

    const bce = s.includes("bce") || s.includes("bc");
    const ce  = s.includes("ce")  || s.includes("ad");

    // Strip non-numeric except leading minus
    const digits = s.replace(/[^0-9\-]/g, "").replace(/(?!^)-/g, "");
    if (!digits || digits === "-") return null;

    const num = parseInt(digits, 10);
    if (isNaN(num)) return null;

    // If BCE/CE explicitly stated → exact match
    if (bce || ce) {
        const yr = (bce && num > 0) ? -num : num;
        return { exact: yr };
    }

    // Plain number: if 4 digits → exact; if 1-3 digits → prefix decade match
    const raw = digits.replace("-","");
    if (raw.length === 4) return { exact: num };
    if (raw.length >= 1 && raw.length <= 3) return { prefix: digits };
    return null;
}

// ── Does a scene year match a parsed year token? ─────────────────
function _yearMatches(scene, parsedYear) {
    if (!parsedYear || scene.startYear == null) return false;
    const sy = Number(scene.startYear);
    if (parsedYear.exact !== undefined) {
        return sy === parsedYear.exact;
    }
    // Prefix: "14" matches 1400–1499, "-5" matches -500 to -599
    const pfx = parsedYear.prefix;
    const negative = pfx.startsWith("-");
    const digits   = pfx.replace("-","");
    const str      = String(Math.abs(sy));
    if (negative && sy >= 0) return false;
    if (!negative && sy < 0) return false;
    return str.startsWith(digits);
}

// ── Does a single token fuzzy-match a field string? ──────────────
// Returns: 0 = no match, 1 = fuzzy, 2 = substring, 3 = word-start
function _tokenMatchField(tok, field) {
    if (!field) return 0;
    const f = field.toLowerCase();
    if (f.includes(tok)) return f.split(/\W+/).some(w => w.startsWith(tok)) ? 3 : 2;
    // Fuzzy: only attempt on tokens ≥ 4 chars, against each word in field
    if (tok.length >= 4) {
        for (const word of f.split(/\W+/)) {
            if (word.length < 3) continue;
            if (_editDist(tok, word) <= 1) return 1;
        }
    }
    return 0;
}

// ── Score one scene against one token ────────────────────────────
// Returns { matched: bool, score: number, fields: Set<string> }
function _scoreToken(scene, tok) {
    const yr = _parseYearToken(tok);
    if (yr !== null) {
        const hit = _yearMatches(scene, yr);
        return { matched: hit, score: hit ? 10 : 0, fields: hit ? new Set(["year"]) : new Set() };
    }

    const isPureNumeric = /^-?\d+(bce|bc|ce|ad)?$/.test(tok.trim().toLowerCase());
    if (isPureNumeric) {
        return { matched: false, score: 0, fields: new Set() };
    }

    let best = 0, fields = new Set();
    const checks = [
        ["name",      scene.name,      8],
        ["season",    scene.season,    5],
        ["country",   scene.country,   4],
        ["region",    scene.region,    4],
        ["id",        scene.id,        2],
        ["continent", scene.continent, 2],
    ];
    for (const [field, val, weight] of checks) {
        const m = _tokenMatchField(tok, val || "");
        if (m > 0) {
            best = Math.max(best, m * weight);
            fields.add(field);
        }
    }
    return { matched: best > 0, score: best, fields };
}

function searchScenes(query, sceneList) {
    const raw = query.trim().toLowerCase();
    if (!raw) return sceneList.map(s => ({ scene: s, score: 0, matchedFields: new Set(), tokens: [] }));

    // Split into tokens, keeping "500 bce" as one token
    const tokens = raw
        .replace(/(\d+)\s*(bce|bc|ce|ad)/g, "$1$2")  // glue "500 bce" → "500bce"
        .split(/\s+/)
        .filter(t => t.length > 0);

    const results = [];
    for (const scene of sceneList) {
        let totalScore = 0;
        let allMatched = true;
        const allFields = new Set();

        for (const tok of tokens) {
            const { matched, score, fields } = _scoreToken(scene, tok);
            if (!matched) { allMatched = false; break; }
            totalScore += score;
            fields.forEach(f => allFields.add(f));
        }

        if (allMatched) {
            results.push({ scene, score: totalScore, matchedFields: allFields, tokens });
        }
    }

    // Sort: highest score first, then alphabetically
    results.sort((a, b) => b.score - a.score || (a.scene.name || "").localeCompare(b.scene.name || ""));
    return results;
}

function highlightMatches(text, tokens, escFn) {
    escFn = escFn || (s => (s == null ? "" : String(s))
        .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"));
    if (!text || !tokens || tokens.length === 0) return escFn(text || "");
    let result = escFn(text);
    for (const tok of tokens) {
        const yr = _parseYearToken(tok);
        if (yr !== null) {
            const yearDisplayForms = [];
            if (yr.exact !== undefined) {
                // Exact year — build "NNNN BCE" or "NNNN CE"
                if (yr.exact < 0) {
                    yearDisplayForms.push(Math.abs(yr.exact) + " BCE");
                } else {
                    yearDisplayForms.push(yr.exact + " CE");
                    yearDisplayForms.push(String(yr.exact)); // plain year without suffix
                }
            } else if (yr.prefix !== undefined) {
                // Prefix / decade match — highlight any year number in the text
                // whose digit string starts with this prefix.
                const pfx = yr.prefix.replace("-", "");
                const negative = yr.prefix.startsWith("-");
                // Match a number optionally followed by " BCE" or " CE"
                const numRe = /(\d+)( BCE| CE)?/g;
                const highlighted = result.replace(numRe, (match, digits, suffix) => {
                    const matchNeg = suffix && suffix.trim() === "BCE";
                    if (negative !== matchNeg) return match; // sign mismatch
                    if (!digits.startsWith(pfx)) return match;
                    return "<mark class=\"sh\">" + match + "</mark>";
                });
                result = highlighted;
                continue; // already applied, skip the generic path below
            }
            for (const form of yearDisplayForms) {
                const escaped = form.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                try {
                    result = result.replace(new RegExp("(" + escaped + ")", "gi"),
                        "<mark class=\"sh\">$1</mark>");
                } catch(e) {}
            }
            continue;
        }
        // Non-year token: plain substring / fuzzy highlight
        const escaped = tok.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        try {
            result = result.replace(new RegExp("(" + escaped + ")", "gi"),
                "<mark class=\"sh\">$1</mark>");
        } catch(e) { /* bad regex token, skip */ }
    }
    return result;
}