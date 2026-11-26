# Phase 1 SEO Recovery — Regression Test Reports

- **Base Production Reference:** `b5cefe53c375feb5364b3c17198b6e8738329405`
- **Test Runner:** `NODE_OPTIONS='--conditions react-server' ./node_modules/.bin/tsx --require ./scripts/test/ignore-css.cjs --test <files>`
- **Typecheck Command:** `./node_modules/.bin/tsc --noEmit` (filtering only the pre-existing missing `@opennextjs/cloudflare` module import in `open-next.config.ts`)

---

## Summary Matrix

| Branch / PR | TypeScript Errors (excl. `open-next.config.ts`) | Focused + Parity Test Suite | Result |
|---|---:|---|---|
| 1. `cursor/seo-phase1-ar-cost-noindex-6064` ([PR #57](https://github.com/azimjmi-bot/Gaf-healthcare/pull/57)) | `0` | `ar-cost-city-specialty-indexability.test.ts`, `arabic-publication-gate.test.ts`, `sitemap-parity.test.ts`, `pune-empty-facet-robots.test.ts` | **38 / 38 passed** |
| 2. `cursor/seo-phase1-hreflang-hygiene-6064` ([PR #58](https://github.com/azimjmi-bot/Gaf-healthcare/pull/58)) | `0` | `hreflang-hygiene.test.ts`, `arabic-publication-gate.test.ts`, `sitemap-parity.test.ts`, `pune-empty-facet-robots.test.ts`, `english-alternates-fixture` / `check-english-alternates` | **48 / 48 passed** |
| 3. `cursor/seo-phase1-doctor-profile-graph-6064` ([PR #59](https://github.com/azimjmi-bot/Gaf-healthcare/pull/59)) | `0` | `doctor-profile-graph.test.ts`, `src/lib/doctor-discovery.test.ts` | **17 / 17 passed** |
| 4. `cursor/seo-phase1-cost-canonical-6064` ([PR #60](https://github.com/azimjmi-bot/Gaf-healthcare/pull/60)) | `0` | `cost-canonical-parity.test.ts`, `arabic-publication-gate.test.ts`, `sitemap-parity.test.ts`, `pune-empty-facet-robots.test.ts` | **33 / 33 passed** |
| 5. `cursor/seo-phase1-hospital-pagination-6064` ([PR #61](https://github.com/azimjmi-bot/Gaf-healthcare/pull/61)) | `0` | `hospital-pagination-robots.test.ts`, `arabic-publication-gate.test.ts`, `sitemap-parity.test.ts`, `pune-empty-facet-robots.test.ts` | **31 / 31 passed** |
| 6. `cursor/seo-phase1-404-classification-6064` | `0` | `phase1-redirect-classification-guard.test.ts`, `legacy-redirects.test.mjs`, `sitemap-parity.test.ts` | **19 / 19 passed** |

---

## Pre-Existing Baseline Failures on `b5cefe53` (Not Caused by Phase 1 Changes)

During baseline verification on `b5cefe53c375feb5364b3c17198b6e8738329405`, the following pre-existing test failures exist in the repository:
1. `src/server-tests/cost-country-route.test.ts` (1 failure out of 9 subtests): asserts uppercase `/costs/India/Radiation-Oncology/External-Beam-Radiotherapy-EBRT` in `sitemap-en.xml`, whereas `localePath` emits lowercase catalog URLs in sitemaps since PR #45/#49.
2. `src/server-tests/blog-sitemap.test.ts`, `src/server-tests/follow-up-tests-blog.test.ts`, `src/server-tests/doctor-specialty-hub.test.ts`: pre-existing failures on `b5cefe53` outside the scope of Phase 1 PRs.

---

## Per-Branch Verification Details

### Branch 1 — `cursor/seo-phase1-ar-cost-noindex-6064` (`8206841`)
- New test: `src/server-tests/ar-cost-city-specialty-indexability.test.ts`
- Checks all `147` published `/ar/costs/india/<city>/<specialty>` URLs from `publishedFacetPaths("ar")` return indexable metadata (`robots === undefined`), match `sitemap-ar.xml`, and emit reciprocal `hreflang` when the EN counterpart is indexable; checks unpublished AR cost facets stay `robots: { index: false, follow: true }`; checks EN multi-facet fallback without `specialtyPage` remains `noindex, follow`.
- Result: **38/38 passed**.

### Branch 2 — `cursor/seo-phase1-hreflang-hygiene-6064` (`3f35a1c`)
- New test: `src/server-tests/hreflang-hygiene.test.ts`
- Checks:
  - EN `allowIndex: false` blog posts (`/blogs/breast-cancer-follow-up-tests`) emit `noindex, follow` with `languages: {}` and `alternateLocale: []`, and their AR counterparts do not emit `hreflang="en"`.
  - EN `noindex` city+specialty cost pages (`54` combinations failing `specialtyPageMeetsQualityThreshold`) emit `noindex, follow` with empty `languages`, and are excluded from `publishedLocalesForPath`.
  - Flat `/costs/<slug>` sheets canonicalizing to `/costs/india/<specialty>/<procedure>` emit empty `languages` and `alternateLocale: []`.
  - `check-english-alternates.ts` (`sweepPublishedArabic`) confirms zero published Arabic pages point `hreflang` at any `noindex` EN page.
- Result: **48/48 passed**.

### Branch 3 — `cursor/seo-phase1-doctor-profile-graph-6064` (`2c0bfe3`)
- New test: `src/server-tests/doctor-profile-graph.test.ts` + existing `src/lib/doctor-discovery.test.ts`
- Checks across all `2,602` EN doctors:
  - `doctorRelatedTreatmentsHeading(doctor)` returns `"Related radiation treatments"` only for `radiation-oncology` and `"Related <Specialty> treatments"` for every other specialty.
  - `doctorSpecialtyCostLink(doctor)` resolves to an indexable URL present in `sitemap-en.xml` for `2,602/2,602` doctors (`0` `noindex` cost links).
  - `relatedCuratedTreatments` links `2,063` doctors to published `/treatments/<slug>` guides.
- Result: **17/17 passed**.

### Branch 4 — `cursor/seo-phase1-cost-canonical-6064` (`cd35d04`)
- New test: `src/server-tests/cost-canonical-parity.test.ts`
- Checks:
  - National EN and AR cost procedure pages self-canonicalize to `sitemap-en.xml` / `sitemap-ar.xml`.
  - All `2,514` India city×procedure combinations (`2,090` with `cityPage` -> self-canonical in `sitemap-en.xml`; `424` without `cityPage` -> national URL canonical, empty `languages` and `alternateLocale`, absent from `sitemap-en.xml`).
  - All `36` multi-specialty treatments (`37` secondary-specialty paths per locale) canonicalize to `catalogSpecialtyName(treatment)` in EN, AR, and non-primary country views with empty `languages`.
- Result: **33/33 passed**.

### Branch 5 — `cursor/seo-phase1-hospital-pagination-6064` (`2974685`)
- New test: `src/server-tests/hospital-pagination-robots.test.ts`
- Checks EN and AR across root, India, Delhi NCR, Pune, and Radiation Oncology hospital directories:
  - `page === 1` remains indexable (`robots: undefined` when published) with sitemap parity and `hreflang`.
  - `page > 1` (`page = 2, 3, 10`) returns `robots: { index: false, follow: true }`, `alternates.languages: {}`, and `openGraph.alternateLocale: []`.
- Result: **31/31 passed**.
