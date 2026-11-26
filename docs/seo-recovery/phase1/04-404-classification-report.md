# Phase 1 SEO Recovery — Verified 404 URL Classification Report

- **Production Reference:** `b5cefe53c375feb5364b3c17198b6e8738329405`
- **Primary Forensic Sources:**
  - GSC 404 Export & Verification (`1,000` unique URLs): `gsc-404-final-review.csv` / `gsc-404-final-review.md`
  - Phase 2 Equity & Coverage Reconciliation (`1,014` master rows): `final-url-classification.csv` / `phase2-completion-summary.json`
  - Nested Treatment Audit (`142` URLs): `docs/seo-nested-treatment-redirect-audit.csv`
  - Shipped Redirect & Retirement Rules on `b5cefe53`: `legacy-redirects.mjs` (`5` specific entity/treatment redirects + WordPress/hub patterns) and `src/lib/legacy-urls.ts` (`40` `LEGACY_GONE_EXACT_PATHS` + `GONE_FIRST_SEGMENTS`)
- **Policy Safeguard:** Zero unverified redirects and zero mass 410 responses are implemented in Phase 1.

---

## Executive Classification Summary (Required 6 Buckets)

| # | Classification Bucket | Verified Count / Scope | Current Prod State (`b5cefe53`) | Recommended Action (No Unapproved Changes) |
|---|---|---:|---|---|
| 1 | **Valid pages that should be restored** | **0** | N/A (`restore-candidates.csv` = 0; live AR 200s protected) | None — no missing valuable pages to restore |
| 2 | **Old URLs with verified replacement destinations** | **5** shipped + **12** unverified `CANDIDATE` | `5` live `308 -> 200`; `12` return `404` (`10` targets `200`, `2` AR targets `404`) | Keep the `5` shipped rules; hold all `12` candidates until clinical/intent review + GSC Links/16mo check (never redirect the `2` whose AR destination is `404`) |
| 3 | **Permanently removed URLs that may merit 410** | **40** shipped + **697** legacy `404` candidates in GSC export (incl. `363` conditional + `11` manual-review in Phase 2) | `40` serve `410`; remaining return `404` | Keep `40` Batch J/K `410`s; **do not** enable mass `410` without GSC Links + 16-month Performance exports (`phase2_complete: false`) |
| 4 | **Stale GSC reports where the URL already returns 200** | **54** (`49` AR + `5` EN) | Live HTTP `200`, self-canonical, in `sitemap-en.xml` / `sitemap-ar.xml` | Submit GSC "Validate Fix" only — **no** code, redirect, or 410 change |
| 5 | **Unpublished locale URLs** | **238** in GSC 404 export (`215` `ru`, `14` `fr`, `9` `sw`) + `332` `ru` in master audit | All return `404` (1 `/fr/doctors/India/...` case-redirects `301 -> 404`) | Keep `404`; never auto-redirect `/ru|/fr|/sw` to `/en` or `/ar`; defer explicit `410` until GSC Links/16mo check (`11` RU URLs have `>=10` 28d impressions) |
| 6 | **Unknown URLs requiring owner data** | **25** (`11` `KEEP_404` in `gsc-404-final-review` + `14` `MANUAL_REVIEW` in Phase 2 incl. `/ireland` at `85` 28d impressions + missing GSC Links/16mo exports) | Return `404` | Blocked on owner GSC exports (`Links`, `Indexing Coverage`, `16-month Performance`) and product/clinical decisions |

---

## Detailed Breakdown by Bucket

### 1. Valid Pages That Should Be Restored (`0` URLs)
- Forensic cross-check of `gsc-404-final-review.csv` (`1,000` rows), `restore-candidates.csv`, and `final-seo-cleanup-risk-report.md` confirmed **`0` missing valid pages** requiring restoration (`FIX_CURRENT_PAGE = 0`).
- All `5,267` protected live assets (`protected-seo-assets.csv`) and all `54` GSC-flagged sitemap URLs already return HTTP `200`.

### 2. Old URLs With Verified Replacement Destinations (`5` Shipped + `12` Candidates Held)
**Already live (`308` permanent redirects in `legacy-redirects.mjs`, verified on `https://gaf.healthcare`):**
1. `/doctors/dr-meet-kumar` → `/doctors/dr-meet-kumar-1`
2. `/doctors/dr-mohd-qaleem` → `/doctors/dr-mohd-qaleem-1`
3. `/doctors/dr-vineet-goel` → `/doctors/dr-vineet-goel-1`
4. `/hospitals/wockhardt-hospital-mumbai` → `/hospitals/wockhardt-hospital`
5. `/treatments/cardiology/pacemaker-implantation` → `/treatments/pacemaker-implantation-in-india` (live-checked 2026-11-26: `308` → `200`)

Plus WordPress/hub section redirects in `legacy-redirects.mjs`: `/wp-sitemap*`, `/*-sitemap*.xml`, `/sitemap-index.xml`, `/doctor`, `/doctors2`, `/hospital`, `/hospital_country/*`, `/specialities/*`, `/treatments_detail`, `/blog`.

**Held as unverified `CANDIDATE` (`12` rows in `docs/seo-nested-treatment-redirect-audit.csv` — NOT implemented):**
- **Live target = `200` (`10` candidates awaiting clinical/intent sign-off):**
  - `/ar/treatments/bone-marrow/fanconi-anemia-treatment` → `/ar/treatments/fanconi-anemia-treatment-in-india`
  - `/ar/treatments/oncology/chemotherapy` → `/ar/treatments/chemotherapy-in-india`
  - `/ar/treatments/orthopedics/knee-arthroscopy-surgery` → `/ar/treatments/knee-arthroscopy-surgery-in-india`
  - `/ar/treatments/plastic/breast-augmentation` → `/ar/treatments/breast-augmentation-in-india`
  - `/ar/treatments/plastic/breast-reduction-surgery` → `/ar/treatments/breast-reduction-in-india`
  - `/ar/treatments/plastic/mommy-makeover` → `/ar/treatments/mommy-makeover-in-india`
  - `/treatments/bone-marrow/leukemia-treatment` → `/treatments/leukemia-treatment-in-india`
  - `/treatments/neurology/brain-tumor-surgery` → `/treatments/brain-tumor-surgery-in-india`
  - `/treatments/pediatric-cardiology/pediatric-heart-surgery` → `/treatments/pediatric-heart-surgery-in-india`
  - `/treatments/urology/turp-surgery` → `/treatments/turp-surgery-in-india`
- **Live target = `404` (`2` blocked — MUST NOT redirect):**
  - `/ar/treatments/neurology/brain-tumor-surgery` → `/ar/treatments/brain-tumor-surgery-in-india` (destination `404`)
  - `/ar/treatments/orthopedics/spine-tumor-surgery` → `/ar/treatments/spine-tumor-surgery-in-india` (destination `404`)

### 3. Permanently Removed URLs That May Merit `410`
- **Already serving `410 Gone` (`40` paths in `LEGACY_GONE_EXACT_PATHS` in `src/lib/legacy-urls.ts`, plus `GONE_FIRST_SEGMENTS` WordPress/WooCommerce/theme paths):**
  - `22` retired `/doctors/*` slugs + `18` retired `/hospitals/*` slugs (`31` of these appear in the `1,000`-row GSC 404 export; live-checked `/doctors/dr-omar-maqbool` → `410`).
- **Remaining legacy 404 patterns (`697` non-unpublished-locale `USE_410` rows in `gsc-404-final-review.csv` minus the `31` already in `LEGACY_GONE_EXACT_PATHS` = `666` currently returning `404`):**
  - Unknown `/doctors/:slug` and `/hospitals/:slug` not in current catalogue
  - Legacy `/doctors/india/...` & `/hospitals/india/...` facets with obsolete taxonomy leaves (`406` unique shapes fail taxonomy parse)
  - Nested `/treatments/{specialty}/:slug` (`129` `NO_MATCH` rows in `docs/seo-nested-treatment-redirect-audit.csv`)
  - Legacy `/resources/blog/:slug` (`66` rows, `0` CMS slug matches) and specialty microsites (`/oncology/india/...`, `/orthopedics/india/...`, `/cardiology/india/...`, etc.)
- **Phase 2 Guardrail:** `verified_safe_410 = 0` (`363` conditional + `11` manual review). Do **not** expand `410` rules until missing GSC Links + 16-month Performance exports confirm zero external backlink equity.

### 4. Stale GSC Reports Where the URL Already Returns `200` (`54` URLs)
- **`49` Arabic URLs** (`46` `/ar/doctors/<slug>` + `3` `/ar/doctors/india/...` facets) and **`5` English URLs** (`/doctors/dr-aviva-pinto-rodrigues`, `/doctors/dr-hrishikesh-pai`, `/doctors/dr-j-krithika-devi`, `/doctors/dr-padmapriya-vivek`, `/doctors/dr-parul-prakash`).
- Live verified `200`, self-canonical, non-noindex, listed in production sitemaps (`gsc-validation-list.csv`).
- **Action:** Trigger Google Search Console **Validate Fix** only.

### 5. Unpublished Locale URLs (`238` in GSC 404 Export; `332` `ru` in Master Audit)
- Breakdown in `gsc-404-final-review.csv`: **`215` `/ru/*`**, **`14` `/fr/*`**, **`9` `/sw/*`**.
- `sitemap-ru.xml` is intentionally empty (`localeIsPublished("ru") === false`).
- Live checks confirm `/ru/doctors/dr-prabha-sawant` returns `404` (`noindex`).
- **Rule:** Never cross-language 301 `/ru|/fr|/sw` to `/en` or `/ar`. Retire via `410` only after reviewing the `8` `/ru/*` URLs with `10–18` 28-day impressions (`manual-review-urls.csv`) against GSC Links data.

### 6. Unknown URLs Requiring Owner Data
1. **`11` `KEEP_404` URLs in `gsc-404-final-review.csv`:**
   - Legacy African country variants (`/zambia/ndola-...`, `/ghana/accra-...`, `/nigeria`) — country landing pages exist at `/{cc}/treatment-in-india` but are not equivalent destinations.
   - `3` taxonomy-valid deep facets without inventory (`/ar/doctors/india/delhi-ncr/cardiology/atrial-septal-defect`, `/hospitals/india/hyderabad/ent/balloon-sinuplasty`, `/hospitals/india/hyderabad/surgical-oncology/radiofrequency-ablation`).
   - `/blogs/is-knee-replacement-india-safe` (no CMS post).
2. **`12` `MANUAL_REVIEW` URLs in `phase2/manual-review-urls.csv`** (impressions `10–85` in 28d `Pages-28d.csv`, e.g., `/ireland` with `85` impressions, `/treatments/gynaecology/female-sterilization` with `25` impressions, `/ar/cardiology/india/heart-surgery-cost` with `15` impressions, and `8` `/ru/*` URLs with `10–18` impressions).
3. **Blocking Missing GSC Datasets (`MISSING-GSC-EXPORTS-CHECKLIST.csv`):**
   - `Links → Top linked pages` & `External linking sites`
   - `Indexing → Indexed pages` & `Not indexed` drill-downs
   - `Performance → Pages & Queries (Last 16 months)`
