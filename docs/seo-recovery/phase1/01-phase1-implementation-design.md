# Phase 1 SEO Recovery — Implementation Design

- **Base Production Reference:** `b5cefe53c375feb5364b3c17198b6e8738329405` (`release/stage4-rsc-prod`)
- **Production Worker ID:** `332293be-d958-4a93-9dfd-9c413423f5d0`
- **R2 Stamp:** `353d637`
- **Apex `GAF_NEGATIVE_CACHE`:** `OFF`
- **Approval Scope:** Investigation, implementation on independent feature branches, regression testing, and PR creation only. No merge, deployment, R2 write, DNS change, or Cloudflare configuration change performed.

---

## Independent Branches & PRs

| # | Scope | Branch | PR |
|---|---|---|---|
| 1 | Arabic cost-page noindex / sitemap contradiction (147 URLs) | `cursor/seo-phase1-ar-cost-noindex-6064` | [#57](https://github.com/azimjmi-bot/Gaf-healthcare/pull/57) |
| 2 | Invalid `hreflang` on `noindex` and non-canonical pages | `cursor/seo-phase1-hreflang-hygiene-6064` | [#58](https://github.com/azimjmi-bot/Gaf-healthcare/pull/58) |
| 3 | `DoctorProfileGraph` incorrect headings, `noindex` cost links, missing `/treatments/*` links | `cursor/seo-phase1-doctor-profile-graph-6064` | [#59](https://github.com/azimjmi-bot/Gaf-healthcare/pull/59) |
| 4 | National and city cost canonical inconsistencies | `cursor/seo-phase1-cost-canonical-6064` | [#60](https://github.com/azimjmi-bot/Gaf-healthcare/pull/60) |
| 5 | Hospital directory pagination indexability | `cursor/seo-phase1-hospital-pagination-6064` | [#61](https://github.com/azimjmi-bot/Gaf-healthcare/pull/61) |
| 6 | Verified classification of valuable 404 URLs & Phase 1 deliverables | `cursor/seo-phase1-404-classification-6064` | This PR |

---

## Issue 1 — Arabic Cost-Page `noindex` / Sitemap Contradiction (147 URLs)

### Root Cause
In `src/app/costs/directory.tsx` (`costsDirectoryMetadata`), the `if (facets > 1)` guard unconditionally set `robots: { index: false, follow: true }` for any multi-facet cost directory (`city` + `specialty`) whenever `profile` (`getSpecialtyPage`) was missing. Because `profile` was intentionally restricted to `locale === "en"`, every Arabic `/ar/costs/india/<city>/<specialty>` URL fell into `facets > 1` and emitted `noindex, follow` — even though `publishedFacetPaths("ar")` published 147 of those URLs in `sitemap-ar.xml`.

### Design Change
- Extracted pure metadata builders (`src/app/costs/metadata.ts`, `src/app/costs/country-metadata.ts`, `src/app/costs/procedure-metadata.ts`), re-exported by `directory.tsx`, `costs-country-view.tsx`, and `costs-procedure-view.tsx`.
- Gated the legacy multi-facet rule to English only: `if (locale === SOURCE_LOCALE && facets > 1)`.
- Arabic cost facets continue to use `localePageState("ar", path)` via `withLocaleMetadata`: published AR facets (`147` city+specialty URLs in `sitemap-ar.xml`) emit indexable metadata (`robots: undefined`), while unpublished AR facets continue to emit `noindex, follow`.
- Added optional `localeOverride?: AppLocale` on `catalogPageMetadata` and `costsDirectoryMetadata` for direct EN/AR server-test verification.

### Before / After
- **Before:** Live `/ar/costs/india/mumbai/cardiology` returned HTTP 200 with `<meta name="robots" content="noindex, follow">` while listed in `sitemap-ar.xml`.
- **After:** All 147 published `/ar/costs/india/<city>/<specialty>` URLs omit `noindex` and match `sitemap-ar.xml`; unpublished AR cost facets remain `noindex, follow`.

---

## Issue 2 — Invalid `hreflang` on `noindex` and Non-Canonical Pages

### Root Cause
1. `src/lib/i18n/metadata.ts` (`withLocaleMetadata`) checked `selfPublished && !canonicalizedAway`, ignoring explicit `meta.robots` (`noindex`) and explicit non-self `meta.alternates.canonical` overrides (such as flat `/costs/<slug>` sheets canonicalizing to `/costs/india/<specialty>/<procedure>`).
2. `src/lib/i18n/locale-metadata-light.ts` lacked an explicit `noindex` guard.
3. `src/lib/i18n/locale-publication.ts` (`localePageState` / `publishedLocalesForPath`) treated EN blog posts with `allowIndex: false` (e.g., `/blogs/breast-cancer-follow-up-tests`) and EN city+specialty cost pages failing `specialtyPageMeetsQualityThreshold` (`54` combinations) as published alternates, causing Arabic/indexable pages to emit `hreflang` toward EN `noindex` pages.
4. `src/app/costs/directory.tsx`, `src/app/doctors/directory.tsx`, and `src/app/hospitals/directory.tsx` applied post-wrapper `robots: { index: false, follow: true }` spreads after `withLocaleMetadata`, leaving stale `alternates.languages` and `openGraph.alternateLocale` on `noindex` pages.

### Design Change
- Added `isNoindexRobots`, `withoutHreflang`, and `explicitCanonicalMismatch` checks to `withLocaleMetadata` (`src/lib/i18n/metadata.ts`) and `withLightLocaleMetadata` (`src/lib/i18n/locale-metadata-light.ts`). Base builders default `alternates.canonical` to the EN path of the same route, so an explicit canonical is only a mismatch when it differs from both `enUrl` and `selfUrl`.
- Wrapped `costPageMetadata` (flat `/costs/<slug>` alias) with `withoutHreflang(...)`.
- Updated `localePageState("en", "/blogs/<slug>")` to return `"noindex"` when `allowIndex === false`, and filtered EN-`noindex` city+specialty cost pages out of `publishedLocalesForPath` while keeping `localePageState("en", "/costs/...")` returning `"published"` to preserve existing EN facet behavior.
- Applied `withoutHreflang` on post-wrapper `noindex` spreads in `costs/directory.tsx`, `doctors/directory.tsx`, and `hospitals/directory.tsx`.

### Before / After
- **Before:** `/blogs/breast-cancer-follow-up-tests` (`noindex, follow`) emitted 3 `hreflang` tags; `/costs/breast-conserving-surgery-lumpectomy` (canonicalized to `/costs/india/surgical-oncology/breast-conserving-surgery-lumpectomy`) emitted 3 `hreflang` tags; published AR pages pointed `hreflang="en"` at EN `noindex` pages.
- **After:** Every `noindex` page and every non-self-canonical page emits `alternates.languages: {}` and `openGraph.alternateLocale: []`, and no published page points `hreflang` at a `noindex` counterpart.

---

## Issue 3 — `DoctorProfileGraph` Headings, `noindex` Cost Links, and Missing `/treatments/*` Links

### Root Cause
In `src/components/doctor-profile-graph.tsx`:
1. The cost section heading was hardcoded as `"Related radiation treatments"` for every doctor across all specialties.
2. Cost links resolved via `costPath(proc)` unconditionally even when the city+specialty cost page failed `specialtyPageMeetsQualityThreshold` (`noindex`) or when a procedure lacked an indexable cost page (`284` doctors affected).
3. `DoctorProfileGraph` omitted internal links to published curated `/treatments/<slug>` pages.

### Design Change
- Added three helpers in `src/lib/doctor-discovery.ts`:
  - `doctorRelatedTreatmentsHeading(doctor)`: returns `"Related radiation treatments"` only for `radiation-oncology`, and `` `Related ${doctor.specialty} treatments` `` for all other specialties.
  - `doctorSpecialtyCostLink(doctor)`: returns the city+specialty cost hub if `specialtyPageMeetsQualityThreshold` passes, otherwise falls back to the national `/costs/india/<specialty>` hub (verified indexable and present in `sitemap-en.xml` for all `2,602/2,602` EN doctors).
  - `relatedCuratedTreatments(doctor, locale, limit)`: ranks `publishedCuratedTreatments(locale)` by `doctorSlugs` (`+8`), `costPageSlugs ∩ treatmentSlugs` (`+4`), and `specialtySlug` (`+1`), returning up to `limit` published treatment guide links.
- Updated `src/components/doctor-profile-graph.tsx` to render dynamic headings, verified indexable cost links, and a `"Treatment guides"` block linking to `/treatments/<slug>`.

### Before / After
- **Before:** All non-radiation doctors displayed `"Related radiation treatments"`, `284` doctor profiles linked to `noindex` cost pages, and `0` `/treatments/*` links appeared in `DoctorProfileGraph`.
- **After:** Headings match each doctor's specialty, `2,602/2,602` EN doctor profiles resolve to indexable cost URLs in `sitemap-en.xml` (`0` `noindex` cost links), and `2,063` doctor profiles link directly to published `/treatments/*` guides.

---

## Issue 4 — National and City Cost Canonical Inconsistencies

### Root Cause
1. In `src/app/costs/directory.tsx`, when `query.procedure && query.city` lacked an authored `cityPage` (`424` of `2,514` India city×procedure combinations), `costsProcedureMetadata` set `alternates.canonical` to the national URL, but `costsDirectoryMetadata` immediately replaced `meta.alternates` with `wrapped.alternates`, reverting the canonical to the unauthored city URL.
2. In `src/app/costs/costs-procedure-view.tsx` and `src/lib/cost-country-page.ts`, `36` multi-specialty treatments used `query.specialty || catalogSpecialtyName(sheet)` for canonical generation, whereas `sitemap-en.xml` and `sitemap-ar.xml` always emit `catalogSpecialtyName(treatment)`. Secondary-specialty URLs (such as `/costs/india/neurosurgery/gamma-knife`) therefore emitted non-sitemap self-canonicals in EN and AR.

### Design Change
- Extracted pure metadata modules `src/app/costs/country-metadata.ts`, `src/app/costs/procedure-metadata.ts`, and `src/app/costs/metadata.ts`.
- Used `catalogSpecialtyName(source)` for canonical paths in `costsProcedureMetadata`, `resolveCostCountryPage`, and `arabicCostProcedureMetadata` (for national secondary-specialty aliases).
- In `costsDirectoryMetadata`, when `canonicalUrl === requestedUrl` (national procedure or city procedure with authored `cityPage`), passes through `withLocaleMetadata`; when `canonicalUrl !== requestedUrl` (unauthored city procedure or secondary-specialty alias), preserves `canonical: canonicalUrl`, sets `alternates.languages: {}` and `openGraph.alternateLocale: []`, and omits conflicting `noindex`.

### Before / After
- **Before:** `/costs/india/mumbai/surgical-oncology/breast-conserving-surgery-lumpectomy` and `/costs/india/neurosurgery/gamma-knife` emitted self-canonicals absent from `sitemap-en.xml`.
- **After:** All `424` unauthored city×procedure URLs canonicalize to their national `sitemap-en.xml` URL with empty `hreflang`, and all `36` multi-specialty treatments canonicalize to `catalogSpecialtyName(treatment)` in EN, AR, and non-primary country views.

---

## Issue 5 — Hospital Directory Pagination Indexability

### Root Cause
In `src/app/hospitals/directory.tsx` (`hospitalsDirectoryMetadata`), `page === 1` was gated only inside `isHospitalSpecialtyScope` and `arabicHospitalHub`. The fallback `return catalogPageMetadata("hospitals", query)` ignored `page`, leaving `/hospitals?page=2`, `/hospitals/india?page=2`, `/hospitals/india/delhi-ncr?page=2`, `/ar/hospitals?page=2`, etc. indexable with `hreflang` and `og:locale:alternate`.

### Design Change
- Extracted `src/app/hospitals/metadata.ts` (re-exported by `src/app/hospitals/directory.tsx`) and added `localeOverride?: AppLocale` to `hospitalsDirectoryMetadata` and `catalogPageMetadata`.
- Added `asNoindexFollow(meta)` helper and enforced `page > 1` -> `robots: { index: false, follow: true }`, `alternates.languages: {}`, and `openGraph.alternateLocale: []` across standard directories, specialty hubs, fallback routes, and Arabic hubs.

### Before / After
- **Before:** `/hospitals?page=2` and `/ar/hospitals?page=2` returned HTTP 200 without `noindex` and emitted 3 `hreflang` tags.
- **After:** All `page > 1` hospital directory pages in EN and AR emit `robots: { index: false, follow: true }` with empty `languages` and `alternateLocale`; `page === 1` stays indexable with full sitemap/hreflang parity.

---

## Issue 6 — Verified Classification of Valuable 404 URLs

### Approach
- Read-only audit combining the `1,000`-row GSC 404 export (`gsc-404-final-review.csv`), `final-url-classification.csv` (`1,014` rows), `docs/seo-nested-treatment-redirect-audit.csv` (`142` rows), current `legacy-redirects.mjs` / `src/lib/legacy-urls.ts`, and live `https://gaf.healthcare` verification.
- Separated strictly into the 6 required buckets (see `04-404-classification-report.md`).
- **Zero** unverified redirects added; **zero** mass 410s added; **zero** changes to the 124-path publication-index policy.
