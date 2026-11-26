# Technical SEO Findings — Indexing, Crawlability, 404s, Migration & Search Performance

**Baseline Audited:** Production SHA `b5cefe53c375feb5364b3c17198b6e8738329405` (`https://gaf.healthcare`)  
**Scope:** Sections 2, 3, 9, and 10 of the Forensic Audit. All findings are derived from source inspection, local `tsx` validation against production datasets, live HTTP checks against `https://gaf.healthcare`, and locally stored GSC CSV exports.

---

## Section 2: Google Indexing and Crawlability

### Summary Assessment Table

| # | Audit Question | Status | Verified Findings & Live URL Examples (`b5cefe53`) |
|---|---|---|---|
| **1** | Can Googlebot access all important commercial pages? | **Yes (with crawl-budget dilution)** | `src/app/robots.txt` has `User-Agent: *` / `Allow: /` with **0 `Disallow` rules** and declares `sitemap.xml`, `sitemap_index.xml`, `sitemap-en.xml`, `sitemap-ar.xml`, `sitemap-blogs.xml`. Commercial `/treatments/*`, `/costs/india/<specialty>`, `/doctors/*`, `/hospitals/*` return HTTP `200`. However, unconstrained `Allow: /` lets Googlebot crawl arbitrary filter queries (`?hospital=`, `?experience=`, `?page=`) and unpublished `/ru/`, `/fr/`, `/sw/` routes. |
| **2** | Does Google receive complete page content in initial HTML? | **Yes** | Confirmed via live `curl`/HTTP probes comparing default and `Googlebot/2.1` User-Agent headers: `/` returns `258,782` bytes and `/treatments/breast-cancer-treatment-in-india` returns `426,985` bytes identically for both clients, with full SSR copy, tables, FAQs, and JSON-LD in initial HTML. |
| **3** | Are any important pages dependent on client-side JS for main content? | **No (with minor UX hydration dependencies)** | Core editorial, pricing tables, doctor/hospital cards, FAQs, breadcrumbs, and JSON-LD render server-side. Interactive catalog filter dropdowns (`CatalogFilter`) and `/compare` state rely on client hydration, while crawlable links (`<Link>`) sit in SSR HTML. |
| **4** | Are there accidental `noindex` directives? | **YES — Confirmed P0 Bug** | **All `147` `/ar/costs/india/<city>/<specialty>` URLs** listed in `sitemap-ar.xml` return `<meta name="robots" content="noindex, follow">`! Live-verified on `https://gaf.healthcare/ar/costs/india/mumbai/cardiology` (`200`, `noindex, follow`, 3 hreflangs) and `/ar/costs/india/mumbai/radiation-oncology` (`200`, `noindex, follow`, 3 hreflangs). Root cause: `src/app/costs/directory.tsx` line 71 checks `locale === "en"`, causing AR city+specialty routes to fall through to lines 121–123 (`if (facets > 1) return { ...wrapped, robots: { index: false, follow: true } };`). |
| **5** | Are canonical URLs consistent with sitemap URLs? | **NO — Confirmed P1 Bugs** | 1) `src/app/costs/directory.tsx` lines 63–64 overwrite `costsProcedureMetadata()`'s national canonical on city-procedure cost pages without `city.page` (verified live on `/costs/india/mumbai/surgical-oncology/breast-conserving-surgery-lumpectomy`: returns self-canonical instead of national canonical).<br>2) `src/app/hospitals/directory.tsx` line 93 leaves `/hospitals?page=2` as `index, follow` while setting `canonical` to `https://gaf.healthcare/hospitals` (verified live).<br>3) `147` `/ar/costs/india/<city>/<specialty>` URLs are in `sitemap-ar.xml` yet emit `noindex, follow`.<br>4) `/costs/<slug>` flat URLs are excluded from sitemaps and canonicalize to `/costs/india/...` yet emit `hreflang`. |
| **6** | Are `hreflang` references reciprocal and valid? | **NO — Confirmed P0/P1 Failures** | `withLocaleMetadata()` (`src/lib/i18n/metadata.ts` lines 45–53) checks only `localePageState` and `canonicalFacetPath`, **ignoring `meta.robots`**. Additionally, `costs/directory.tsx` line 122 overrides `robots` *after* `withLocaleMetadata`. Consequences (all live-verified):<br>• `/ar/costs/india/mumbai/cardiology` (`noindex, follow`) emits 3 `hreflang` tags (`x-default`, `en`, `ar`), while EN `/costs/india/mumbai/cardiology` (`index`) points `hreflang="ar"` to that `noindex` URL.<br>• `/costs/india/mumbai/radiation-oncology` (`noindex, follow`) emits `en` & `x-default` `hreflang` tags.<br>• `/doctors/india/cardiology?page=2` (`noindex, follow`, canonical page 1) emits 3 `hreflang` tags.<br>• `/blogs/breast-cancer-follow-up-tests` (`noindex, follow` in EN) emits 3 `hreflang` tags pointing to indexable `/ar/blogs/breast-cancer-follow-up-tests` (and vice versa!).<br>• `/costs/coronary-angioplasty-stenting` (canonicalizes to `/costs/india/...`) emits `hreflang` (`478 KB` HTML). |
| **7** | Are unpublished or non-self-canonical URLs entering sitemaps? | **Yes (147 AR `noindex` URLs; `0` draft/unpublished locales)** | `sitemap-ru.xml`, `sitemap-fr.xml`, `sitemap-sw.xml` correctly return `0` URLs (`isLocaleLive === false`). Draft blogs/treatments are excluded. However, the **`147` `/ar/costs/india/<city>/<specialty>` `noindex` URLs** ARE in `sitemap-ar.xml` and `ar-publication-index.json`. |
| **8** | Are there important published pages missing from sitemaps? | **Mixed** | All `94` EN curated treatments, `110` indexable EN blogs, `2,602` doctors, `49` hospitals, and `37` country hubs are in sitemaps. Missing from sitemaps intentionally: `5` city-procedure rows without `.page` (only `breast-conserving-surgery-lumpectomy`) and `1,676` non-India country cost combinations without `.page` (`CostsCountryView` renders thin templated pricing for them). Note also `51` EN `/costs/india/<city>/<specialty>` pages are excluded from `sitemap-en.xml` for failing `specialtyPageMeetsQualityThreshold`, while their AR equivalents enter `sitemap-ar.xml` and `ar-publication-index.json`. |
| **9** | Are English and Arabic pages competing or incorrectly referencing each other? | **Broken signals on 148+ URLs** | On `147` city-specialty cost pages, EN `index` points `hreflang="ar"` to an AR `noindex` page; on `/blogs/breast-cancer-follow-up-tests`, EN is `noindex` while AR is `index` in `sitemap-ar.xml` and both emit reciprocal `hreflang` to each other. Meanwhile, `1,132` EN hospital facets and `192` EN doctor facets remain indexed with `>=90%` overlap (`964` and `118` exact-parent duplicates), whereas AR suppresses them. |
| **10** | Are there internal links pointing to redirected, 404 or non-indexable URLs? | **YES — Confirmed (`284` doctor profiles + redirect-hop risk)** | 1) **`DoctorProfileGraph` (`src/components/doctor-profile-graph.tsx` line 121):** Links **`284 / 2,602` EN doctors** (and effectively all AR city-specialty doctors) to `/costs/india/<city>/<specialty>` URLs that emit **`noindex, follow`** (e.g., `/doctors/dr-ashok-seth` → `/costs/india/delhi-ncr/cardiology` [indexable], vs `/doctors/...` in specialties/cities like `mumbai/radiation-oncology` or `pune/orthopedics` that fail threshold and emit `noindex`).<br>2) Curated treatments (`94`) and blogs (`111`) have **`0` broken (`404`) or `noindex` internal links** in their markdown bodies.<br>3) Redirected links: `legacy-redirects.mjs` line 28 sends `/hospital_country/india` → `/hospitals/India` (capitalized), forcing a 2-hop `308` → `301` lowercase redirect. Also `/Doctors/dr-ashok-seth` (capitalized root) returns `404` because `catalogCanonicalRedirect()` in `src/proxy.ts` line 94 checks lowercase `CATALOG_ROOTS` before lowercasing. |

### Confirmed Technical Bugs — Live Reproduction Evidence

- `GET https://gaf.healthcare/ar/costs/india/mumbai/cardiology` → `200`, `<meta name="robots" content="noindex, follow"/>`, `canonical="https://gaf.healthcare/ar/costs/india/mumbai/cardiology"`, `hreflang="x-default"`, `hreflang="en"`, `hreflang="ar"` (despite being listed in `sitemap-ar.xml`).
- `GET https://gaf.healthcare/blogs/breast-cancer-follow-up-tests` → `200`, `noindex, follow`, `3 hreflangs` (`en`, `ar`, `x-default`); `GET /ar/blogs/breast-cancer-follow-up-tests` → `200`, `indexable` (in `sitemap-ar.xml`), `3 hreflangs`.
- `GET https://gaf.healthcare/hospitals?page=2` → `200`, **NO `noindex` tag**, `canonical="https://gaf.healthcare/hospitals"`, `3 hreflangs`.
- `GET https://gaf.healthcare/doctors/india/cardiology?page=2` → `200`, `noindex, follow`, `canonical="https://gaf.healthcare/doctors/india/cardiology"`, `3 hreflangs`.
- `GET https://gaf.healthcare/costs/india/mumbai/surgical-oncology/breast-conserving-surgery-lumpectomy` → `200`, self-canonical (overwritten by `costs/directory.tsx` line 64 instead of consolidating to `/costs/india/surgical-oncology/breast-conserving-surgery-lumpectomy`).
- `GET https://gaf.healthcare/Doctors/dr-ashok-seth` → `404` (`44 KB` uncached SSR HTML).

---

## Section 3: Investigation of the ~2,691 Google 404 Reports

### Available Evidence vs Missing Cap
- **Available in repo (`docs/` / audit artifacts):** `Table_8b0f.original.csv` — a **1,000-row Google Search Console "Not found (404)" UI export** (GSC caps standard CSV UI exports at `1,000` rows).
- **Missing Evidence:** The remaining **`~1,691` URLs** of the `2,691` reported 404s are unavailable locally because only the 1,000-row UI export exists. Obtaining them requires GSC API (`urlInspection` / site-split properties) or filtered sub-property exports (see `08-missing-data-and-owner-questions.md`).

### Live Classification of the 1,000 Exported GSC 404 URLs Against `b5cefe53`

Running every URL in `Table_8b0f.original.csv` against `src/proxy.ts` (`isLegacyGonePath`, `resolveLegacyEntityPath`, `catalogCanonicalRedirect`), `legacy-redirects.mjs`, and current catalog/CMS stores yields:

| Current Status on `b5cefe53` | Count (of 1,000) | % | Representative URL Patterns & Root Cause | Recommended Action |
|---|---:|---:|---|---|
| **Still `404` (Unresolved)** | **~720** | **72.0%** | • `/resources/blog/*` (old site blog URLs; `legacy-urls.ts` only marks `/resources/case-study/*` as 410, leaving `/resources/blog/*` to fall through to Next 404)<br>• `/treatments/<specialty>/<leaf>` nested paths (only 1 — `pacemaker-implantation` — is mapped in `legacy-redirects.mjs`)<br>• `/ru/*` unpublished locale URLs returning `404` when `localePageIsRenderable("ru", ...)` is false or invalid slug<br>• `/ar/hospitals/*` deleted/stale slugs & `/ireland/*` old geo-landing pages | Triage by backlinks + GSC impressions: **1-to-1 `301`** for verified live equivalents (e.g. matching `/blogs/*` or `/treatments/*`); **`410`** for obsolete templates (`/ireland/*`, `/ru/*`, defunct WordPress artifacts). |
| **Now `200` (Stale GSC 404s, Indexable)** | **~232** | **23.2%** | Valid `/doctors/*`, `/hospitals/*`, `/treatments/*`, `/costs/*` URLs already live on `b5cefe53` (previously errored during deployment/hydration incidents or prior migration) | Submit for GSC Validation / re-crawl via sitemap ping; verify canonical/internal links. |
| **Now `410` (Gone)** | **~31** | **3.1%** | WordPress leftovers (`/wp-content/*`, `/tag/*`, `/category/*`, `/doctor-category/*`, `/resources/case-study/*`, unknown singular `/doctor/*`) handled by `legacy-urls.ts` & `legacy-entity.ts` | Keep as `410` (already cache-friendly at proxy edge). |
| **Now `200 noindex`** | **11** | **1.1%** | Gated or non-indexable catalog/locale routes | Audit whether they should instead `301` or `410`. |
| **Now `308` (`legacy-redirects.mjs`)** | **6** | **0.6%** | Already redirected via `legacy-redirects.mjs` | Verify target returns `200` in 1 hop (fix `/hospital_country/india` → `/hospitals/india`). |

### Direct Answers to Section 3 Questions (1–10)
1. **Can these URLs be found in source, CMS, sitemap, redirects or internal links?** About `232` are live `200` catalog/CMS URLs, `37` are matched by `legacy-urls.ts`/`legacy-redirects.mjs`, and `~720` do **not** exist in any live sitemap, CMS store, or redirect rule.
2. **Which URLs are obsolete?** Old WordPress theme/taxonomy paths (`/wp-*`, `/tag/*`, `/category/*`, `/doctor-category/*`, `/author/*`, `/resources/case-study/*`), abandoned geo-experiments (`/ireland`, `/ireland/rhinoplasty-abroad` — `85` & `54` GSC 28d impressions), and legacy Russian (`/ru/*`) pages.
3. **Which were affected by `gafhealthcare.in` → `gaf.healthcare` migration?** Primarily `/resources/blog/*`, `/treatments/<specialty>/<leaf>`, `/hospital_country/*`, `/specialities/*`, `/treatments_detail/*`, and `/doctor/*` / `/hospital/*` singular slugs.
4. **Which represent valuable historical treatment, doctor or hospital pages?** Nested `/treatments/<specialty>/<procedure>` URLs that correspond 1-to-1 with one of the `94` curated `/treatments/*-in-india` pages (e.g., as already proved by `/treatments/cardiology/pacemaker-implantation` → `/treatments/pacemaker-implantation-in-india`), plus `/resources/blog/*` slugs matching existing `/blogs/*` articles, and renamed doctor/hospital slugs (3 Batch J/K doctors already proved this pattern).
5. **Which have potential backlink value?** *Cannot be confirmed with certainty* without GSC Links and Semrush/Ahrefs backlink-by-URL exports (missing). Highest likelihood: old `/resources/blog/*`, `/treatments/<spec>/<leaf>`, and `/ireland/*` URLs still receiving impressions in `Pages-28d.csv`.
6. **Which are legitimate 404s?** Random typo/bot probe URLs and non-existent doctor/hospital slugs never published on either domain.
7. **Which should return 410?** Confirmed obsolete WordPress/theme taxonomies, `/resources/case-study/*`, `/ireland/*`, and permanently discontinued `/ru/*` paths (once confirmed zero active backlinks or non-recoverable intent). Do **not** bulk-410 before checking backlink exports.
8. **Which need genuine one-to-one 301/308 redirects?** Verified semantic matches from `/treatments/<spec>/<leaf>` → `/treatments/<slug>`, `/resources/blog/<slug>` → `/blogs/<slug>` (only where exact slug/topic equivalence is manually verified, never fuzzy string matching), and renamed doctor/hospital slugs.
9. **Are any valid pages incorrectly returning 404?** Yes: **mixed-case root paths like `/Doctors/dr-ashok-seth`** (`404` due to `catalogCanonicalRedirect` checking lowercase `CATALOG_ROOTS` before `.toLowerCase()`), plus **`232` valid pages** still flagged in GSC's older 404 report (now `200`, pending GSC validation). Also note AR gated facets (`3,637` paths) return `404` by design via `localePageIsRenderable`, which is safe only if never linked internally or in sitemaps.
10. **Are internal components generating links to nonexistent pages?** Curated treatments (`94`) and blogs (`111`) have **`0` broken internal links** (`404`). However, `DoctorProfileGraph` links **`284` doctors to `noindex` cost URLs**, and legacy external/GSC-indexed `/ru/*` & `/resources/blog/*` URLs persist in Google's index.

---

## Section 9: Backlink & Domain Migration Investigation

### Findings from Available Repository Evidence
- **Confirmed Redirect Hygiene:** `www.gaf.healthcare` → `https://gaf.healthcare` (`301` in `proxy.ts` & `worker/runtime.ts`), WordPress `410` rules in `src/lib/legacy-urls.ts`, singular entity lookups in `src/lib/legacy-entity.ts`, and `13` permanent `308` rules in `legacy-redirects.mjs`.
- **Confirmed Migration Leaks:**
  1. `legacy-redirects.mjs` line 28 maps `/hospital_country/india` → `/hospitals/India` (capitalized `India`), causing a **2-hop `308` → `301`** redirect chain.
  2. Only **1** nested treatment (`/treatments/cardiology/pacemaker-implantation`) and **4** renamed doctor/hospital slugs have explicit 1-to-1 redirects, while hundreds of `/treatments/<spec>/<leaf>` and `/resources/blog/*` migration URLs remain `404`.
  3. **`359` of the top-1,000 GSC impression URLs (`931` impressions / `22.5%`) in `Pages-28d.csv` are currently `404`**, proving Google still remembers and surfaces old/unmigrated URLs (`331` `/ru/*`, plus `/ireland*`, `/resources/blog/*`, `/ar/treatments/plastic/*`, etc.).
- **Missing Backlink & Old-Domain Evidence (Cannot Answer Q1–Q5 with Certainty):**
  - Repository contains **no Semrush, Ahrefs, Majestic, or GSC External Links CSV exports**, and **no `gafhealthcare.in` GSC property data** (only summary metrics mentioned in historical notes).
  - Therefore, referring-domain quality, toxic/spam link profiles, anchor text distribution, and exact external-backlink targets among the `2,691` 404s **cannot be verified** until those exports are provided (see `08-missing-data-and-owner-questions.md`). Do not disavow any domains without raw link exports.

---

## Section 10: Google Search Performance Analysis

### Available Local GSC Data (`2026-10-20` to `2026-11-16`, 28 Days)
The repository includes recent GSC exports (`a/Chart.csv`, `a/Queries.csv`, `a/Countries.csv`, `a/Devices.csv`, `Pages-28d.csv`, `Pages-24h.csv`), **but lacks 16-month history (`Pages.csv` / `Queries.csv` for May 26–Aug 25 vs Aug 26–Nov 25)** required for a quarter-over-quarter trend comparison.

#### Observed Baseline (`a/Chart.csv` & `Pages-28d.csv` — 28 Days Ending 2026-11-16)
- **Site Total (`a/Chart.csv`):** **18 clicks**, **3,530 impressions**, **0.51% CTR** *(note: `Pages-28d.csv` sums to `4,134` impressions across its top-1,000 exported URLs due to GSC privacy/anonymized-query vs page-level aggregation differences)*.
- **Locale Split across `Pages-28d.csv` (1,000 URLs):**
  - **English (`en`):** `610` URLs | **`18` clicks** | **`3,087` impressions** (`74.7%`)
  - **Russian (`/ru/*` — UNPUBLISHED):** `331` URLs | **`0` clicks** | **`792` impressions** (`19.2%` of all page impressions!)
  - **Arabic (`ar`):** `59` URLs | **`0` clicks** | **`255` impressions** (`6.2%`)
- **HTTP Status Health of `Pages-28d.csv` Top-1,000 URLs on `b5cefe53`:**
  - **`359` URLs (`931` impressions, `22.5%`) return `404` today!** Notable examples:
    - `/ireland` (`85` impr, pos ~6–10 range; 404)
    - `/ireland/rhinoplasty-abroad` (`54` impr; 404)
    - `/ar/treatments/plastic/breast-augmentation` (`29` impr; 404)
    - `331` `/ru/*` URLs (`792` impr; mostly 404 or `noindex`)
  - **Device & Country Mix (`a/Devices.csv`, `a/Countries.csv`):** Available in GSC folder; impressions skew international medical-travel markets (India, African, Middle East, CIS/Russian-speaking queries) alongside residual Ireland/English queries.
  - **High-Impression / Low-CTR & Position 11–30 Opportunities (`Pages-28d.csv` & `a/Queries.csv`):**
    - Commercial blogs & doctors are already earning impressions without clicks (`0%` CTR): e.g., `/blogs/brachytherapy-for-prostate-cancer`, `/blogs/targeted-therapy-for-breast-cancer-in-india`, `/blogs/angioplasty-cost-in-india`, `/blogs/radiation-therapy-for-prostate-cancer`, `/blogs/pacemaker-cost-in-india`, `/blogs/icd-implantation-cost-in-india`, and specialist profiles (`/doctors/dr-md-tajuddin-farooqui`, `/doctors/dr-bhawna-dahiya`, `/doctors/dr-umarani-swain`, `/doctors/dr-sanjat-chiwane`, `/doctors/dr-suman-bhandari`, `/doctors/dr-debashish-chanda`).
    - Treatment clusters with strongest immediate recovery traction: **Oncology** (prostate/breast radiation & targeted therapy), **Cardiology** (angioplasty, pacemaker, ICD, bypass), **Orthopaedics** (knee/hip replacement), and **GI/Bariatric**.

*(Full list of missing GSC date-range exports needed to complete the May–Aug vs Aug–Nov comparison is itemized in `08-missing-data-and-owner-questions.md`.)*
