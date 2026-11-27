# SEO — Google Search Console Forensic Analysis

**Mode:** Read-only.  
**GSC interactive UI / API:** **Not accessed** in this agent session.  
**Sources used:** On-disk exports under `/opt/cursor/artifacts/gsc-exports/`, prior audits, user-supplied August figures from hosting-incident investigation.

---

## 1. Properties

| Property | Status in this investigation |
|---|---|
| `gaf.healthcare` (URL-prefix and/or Domain) | Partial Performance CSVs present; Coverage/Links missing |
| `gafhealthcare.in` | **No dedicated export found** in workspace — critical gap for migration forensics |

**Owner action:** Confirm which GSC properties exist (Domain `gaf.healthcare`, URL-prefix `https://gaf.healthcare/`, legacy `.in`) and export **both** where historical data remains.

---

## 2. Performance data available

### 2.1 Pages — last 28 days (`gsc-exports/Pages-28d.csv`)

| Metric | Value |
|---|---:|
| Rows (UI cap) | 1,000 |
| Total clicks (sum of export) | **18** |
| Total impressions | **4,134** |
| Top page | `/` — 13 clicks / 294 impr |

**Category proxy (path heuristics on the 1,000 rows):**

| Category | Pages in export | Impressions |
|---|---:|---:|
| Doctor profiles | 283 | 1,022 |
| Doctors facets | 119 | 707 |
| **RU locale** | **331** | **792 (~19%)** |
| Nested treatments | 56 | 253 |
| Hospitals | 53 | 235 |
| Arabic | 48 | 201 |
| Blogs | 49 | 350 |
| Ireland | 2 | 139 |
| Legacy `/resources/blog` | 7 | 21 |
| Costs | 19 | 36 |

**Interpretation:** A material share of *reported* impressions still attaches to **discontinued/unpublished** patterns (especially `/ru/`), not only to current commercial templates. Clicks are extremely concentrated on the homepage.

### 2.2 Pages — last 24 hours (`Pages-24h.csv`)

| Metric | Value |
|---|---:|
| Rows | 127 |
| Clicks | 0 |
| Impressions | 226 |

Still includes RU / legacy / AR / doctors / treatments — consistent with ongoing discovery of mixed URL classes.

### 2.3 User-supplied August cliff (not in CSV form here)

| Date | Impressions (approx.) | Googlebot requests | Avg response time |
|---|---:|---:|---:|
| 24 Aug 2026 | — | 4,687 | 4,507 ms |
| 28 Aug 2026 | ~4,997 | 3,135 | 6,622 ms |
| 29 Aug 2026 | ~608 | 2,281 | 3,401 ms |

Also reported: GSC **“Host had problems in the past.”**

**Classification:** Investigation input from prior forensic write-up; **re-verify** with official Crawl Stats / Performance daily export if still retained in GSC.

---

## 3. Indexing / Coverage

| Dataset | Status |
|---|---|
| Current Indexed URL list | **MISSING** |
| Not indexed reasons URL lists | **MISSING** |
| Historical Not-found (~1,000) | **Present** (`gsc-404-analysis/`) — heavy doctor facets, nested treatments, RU, blogs |
| Nov 13 UI screenshot (~12.1k indexed / ~12.5k not indexed) | Historical UI only — **cannot verify today** |

---

## 4. Crawl statistics

| Dataset | Status |
|---|---|
| Crawl Stats CSV for Aug 24–30 | **MISSING** (export guide exists in `august-2026-hosting-incident/`) |
| Live Googlebot probes Nov 19/22 | 200 + full HTML on sampled money URLs; cold TTFB can be multi-second |

---

## 5. Links

| Dataset | Status |
|---|---|
| GSC Links (external / top linked / internal) | **MISSING** |
| SEMrush referring domains (domain-level) | Screenshot only: **513** RD / **7.1K** BL / AS **8** — **not URL-mapped** |

Without Links, impressions on legacy URLs **must not** be treated as proof of backlinks.

---

## 6. Conclusions for migration forensics

1. **First measurable cliff (best dated):** 28–29 Aug 2026 impressions collapse with crawl degradation — **before** this Next.js repo and **before** Cloudflare Workers.  
2. **Current Performance mix** still wastes impression share on **RU / nested / legacy** discoveries.  
3. **Commercial recovery** cannot be scored accurately until full Performance-by-page and Coverage exports arrive.  
4. **`.in` property history** is required to judge whether domain migration preserved Search Console continuity.

---

## 7. Required owner exports (checklist)

1. Performance → Search results → **Daily** (Jul 1 – Nov 22 2026) for `gaf.healthcare` and `.in` if available.  
2. Performance → **Pages** + **Queries** + Countries + Devices (same ranges).  
3. Indexing → pages reports / reason exports (Indexed, Not indexed buckets).  
4. Settings → **Crawl stats** (Aug 24–30 if still visible).  
5. **Links** → Top linking sites + Top linked pages.  
6. Sitemaps UI screenshot (submitted vs discovered errors).  
7. Manual actions + Security issues (confirmation of none/presence).
