# GAF Healthcare — Technical SEO Roadmap

**Baseline Production Commit:** `b5cefe53c375feb5364b3c17198b6e8738329405` (`332293be-d958-4a93-9dfd-9c413423f5d0`)  
**Target Phase 1 Commit (Merged, Pending Deploy):** `971406370173f080150735703a1d092b5648b75d`

---

## 1. Indexing, Status Codes & Crawl Trap Remediation

| ID | Issue & Evidence | Affected Scope | SEO Impact | Proposed Fix | Regression Test / Verification | Rollback |
|---|---|---|---|---|---|---|
| **T1** | **Deploy Phase 1 (`9714063`)** — `b5cefe53` lacks PRs `#57–#63` fixes | `147` AR cost URLs, `424` cost canonicals, `37` multi-specialty mappings, `/ar/costs`, hospital pagination, `hreflang` | Unlocks AR city+specialty cost indexation, stops self-referencing canonical split, strips invalid hreflang on noindex | Execute `docs/seo-recovery/production-release-checklist.md` after explicit approval (Worker-only deploy; `GAF_NEGATIVE_CACHE=OFF`; R2 `353d637` untouched) | Run `final-staging-verification` HTTP probe set against prod | `wrangler rollback` to `332293be-d958-4a93-9dfd-9c413423f5d0` |
| **T2** | **Duplicate EN Directory Facets (`>=90%` parent overlap)** — `src/lib/i18n/facet-canonical.ts` returns `englishPath` unchanged for `en` | **`1,083`** EN facets at `100%` overlap (`964` hospitals, `118` doctors, `1` cost) + **`246`** at `90–99.9%` overlap (`1,329` total) | Severe crawl-budget waste & internal keyword cannibalisation across `sitemap-en.xml` (`8,294` URLs) | Extend parent-overlap gating to EN (except curated `specialtyHub` pages & GSC-verified high-demand pages): canonicalise `100%` duplicates to parent (`1,083`), `noindex,follow` `90–99%` overlap (`246`) & `thin (<3 items)` cost facets (`2,716`), and omit from `sitemap-en.xml` | Server test asserting canonical, robots, and sitemap exclusion for all `1,329` overlap facets; preserve any GSC-impression whitelist | Revert `facet-canonical.ts` / `sitemap-entries.ts` PR |
| **T3** | **Unauthored Non-India Cost Pages Indexable** — `src/app/costs/costs-country-view.tsx` + `src/app/costs/country-metadata.ts` | **`1,676`** non-India destination×procedure combinations (`!row.page`) | Thin boilerplate pages (India catalog band + comparator table without unique country copy) remain crawlable and `index,follow` | Emit `robots: { index: false, follow: true }` and suppress `hreflang` in `country-metadata.ts` whenever `!row.page && !cityEditorial?.page` | Unit test verifying `noindex,follow` + zero `hreflang` when `!row.page`, and `index,follow` when `row.page` exists | Revert `country-metadata.ts` |
| **T4** | **Held Legacy Redirects & 410 Expansion** — `docs/seo-nested-treatment-redirect-audit.csv`, `docs/seo-recovery/phase1/04-404-classification-report.md` | `12` nested treatment candidates (`10` target `200`, `2` AR target `404`), `666` legacy `404` candidates, `12` manual-review URLs (`/ireland`, `8` `/ru/*`) | Unnecessary `~5.8s` SSR not-found renders on legacy probes + lost link equity on verified successors | **Step 1:** Obtain GSC Links + 16-month Performance exports. **Step 2:** Promote verified `200`-target candidates to `308` in `legacy-redirects.mjs`; never redirect the `2` AR `404` targets. **Step 3:** Move zero-equity legacy paths to `LEGACY_GONE_EXACT_PATHS` (`410`) | `legacy-redirects.test.mjs` + `phase1-redirect-classification-guard.test.ts` | Revert `legacy-redirects.mjs` / `src/lib/legacy-urls.ts` |
| **T5** | **Case-Normalized Catalog Redirects on Direct Hits** — `prettyCatalogPath()` emits Title Case internally while `lowercaseCatalogPath()` converts `<LocaleLink>` and sitemaps to lowercase | All `/costs/India/...`, `/doctors/India/...`, `/hospitals/India/...` direct hits | Direct external hits or crawls to Title Case URLs trigger `301` redirect (`curl` verified `301 -> lowercase`) | Standardize `prettyCatalogPath()` / `catalog-links.ts` helpers to emit canonical lowercase directly so internal metadata, canonicals, JSON-LD, and links never rely on downstream normalization | Unit test across `costsFilterPath`, `doctorsPath`, `hospitalsPath`, `doctorSpecialtyCostLink` verifying lowercase output | Revert `pretty-catalog-path.ts` |

---

## 2. Canonicals, Hreflang & Metadata Hygiene

| ID | Issue & Evidence | Affected Scope | Proposed Fix |
|---|---|---|---|
| **M1** | **Homepage `openGraph.url` hardcoded to `SITE_URL` on `/ar`** (`src/app/page.tsx` line 47) | `/ar` (`ar` locale homepage) | Use `localizedAbsoluteUrl("/", locale)` so `/ar` emits `og:url = https://gaf.healthcare/ar` |
| **M2** | **Keyword-Stuffed Global Fallback Metadata** (`src/app/layout.tsx` lines 26–110, `src/lib/site.ts` line 4) | Root layout fallback (`1,800`-char `site.description` + `66` `ENGLISH_KEYWORDS` + `"Oncologists, ENT and GI in India"` default title) | Replace `site.description` with concise `150`-char clinical positioning statement; remove `ENGLISH_KEYWORDS` meta-keyword bloat; update default title to reflect multi-specialty scope |
| **M3** | **Superlative `"Best ..."` Headings on Doctor Listings** (`src/lib/doctor-discovery.ts` lines 81–84) | All doctor specialty & city listings (`Best Radiation Oncologists in India`, etc.) | Replace `"Best {role}"` with objective clinical terminology (`"{role} Specialists in {place}"` or `"Consult {role} in {place}"`) to comply with healthcare YMYL / non-superlative standards while preserving keyword relevance |

---

## 3. Core Web Vitals, SSR Latency & Caching

**Measured Live Baseline (`https://gaf.healthcare`, 2026-11-27):**
- **CDN Cache HIT (`cf-cache-status: HIT`):** `/costs/india/medical-oncology/chemotherapy` = `172 ms` TTFB (`482,306 B` HTML).
- **Worker Cold/Cache MISS (`x-gaf-html-cache: miss`):** `/ar/costs` = `4.96 s` (`236 KB`), `/costs/india/medical-oncology/chemotherapy` = `4.34 s` (`482 KB`), `/costs` = `3.19 s` (`210 KB`), `/ar/doctors` = `3.11 s` (`249 KB`).
- **Duplicate Header Bug:** `/ar/doctors` emits `cache-control: public, s-maxage=300, stale-while-revalidate=86400, public, s-maxage=300, stale-while-revalidate=86400` (set both in Next/route and Worker proxy).

### Performance Action Plan
1. **Deduplicate `Cache-Control` Header in `src/worker/runtime.ts` / Route Handlers:** Ensure single clean `Cache-Control` header (`public, s-maxage=300, stale-while-revalidate=86400`) on catalog routes so Cloudflare Edge Cache reliably caches `/ar/doctors` and `/ar/costs`.
2. **Trim HTML Payload (`482 KB` → `< 180 KB` on Cost Procedure Pages):**
   - Audit why `/costs/india/medical-oncology/chemotherapy` serializes `482 KB` (large inline RSC flight payload + full hospital/doctor lists + FAQ/table DOM + embedded JSON). Move non-critical interactive tables/filters to lightweight props and avoid passing full `CostArticle` objects across Client Component boundaries.
3. **Eliminate Multi-Second Cold Misses on Cost & AR Routes:**
   - Profile `src/worker/runtime.ts` cold-isolate hydration and `listDirectoryCostGroups` / `overlayDirectoryRows` (`src/app/costs/directory.tsx`) which scans all `419` cost sheets + CMS overrides on every `/costs` and `/ar/costs` miss. Pre-compute or cache the merged cost directory index per isolate boot (`Symbol.for` cache invalidated by R2 `.version.json`).
4. **Prevent Soft-404 SSR Tax (`~5.8s`):** Route confirmed zero-equity legacy patterns to static `410` in `src/proxy.ts` / `src/lib/legacy-urls.ts` after GSC Links verification.
5. **Pre-Warm Top Commercial URLs After Deploy:** After each Worker deployment, run a warm-up sweep across the top `200` priority landing pages (`/` `/ar`, top `50` cost pages, `25` specialty hubs, `10` priority country hubs, top `50` doctors/hospitals) to populate Cloudflare edge cache before Googlebot hits them.

---

## 4. Structured Data Audit & Remediation (`src/lib/seo.ts`)

| Schema Type | Current State | Gap / Risk | Required Fix |
|---|---|---|---|
| **`WebSite`** | Emitted only inside `isPartOf` on `MedicalWebPage` | No top-level `WebSite` schema on `/` or `/ar` | Emit top-level `WebSite` (`@id: https://gaf.healthcare/#website`, `inLanguage`, `publisher` -> `ORGANISATION_ID`) on `/` and `/ar` |
| **`Organization` / `MedicalBusiness`** | `src/app/page.tsx` emits `MedicalBusiness` with `aggregateRating` (`GOOGLE_PROFILE.rating`, `reviewCount`) | Self-serving `aggregateRating` on `LocalBusiness`/`Organization` violates Google Review Snippet policies and risks manual action / rich-result suppression | Remove `aggregateRating` from `MedicalBusiness`; use `["MedicalOrganization", "Organization"]` with verified `sameAs`, `contactPoint`, `areaServed`, and `logo` |
| **`Physician` / `ProfilePage`** | `src/app/doctors/doctor-profile.tsx` emits `ProfilePage` -> `["Person", "Physician"]` + `BreadcrumbList` | Solid graph; missing `image` on `2,417` profiles and `alumniOf` on `1,118` profiles without education data | Only populate `image` / `alumniOf` / `award` from verified non-empty records (never fabricate) |
| **`Hospital`** | `src/app/hospitals/hospital-profile.tsx` emits `Hospital` + `BreadcrumbList` | Missing `image`, `telephone` / `contactPoint`, and `hasOfferCatalog` / `availableService` | Add verified `telephone: site.phone` (coordinator line clearly scoped or omit hospital direct line if unverified), and link `medicalSpecialty` cleanly |
| **`MedicalWebPage` / `Article`** | `src/app/blogs/[slug]/page.tsx` emits only `MedicalWebPage`; `lastReviewed` falls back to `"2026-09-27"` | Missing `Article` / `BlogPosting`, `datePublished`, `author` (`Person`), and `reviewedBy` (`Person`) | Emit `["MedicalWebPage", "Article"]` (or `BlogPosting`) with real `datePublished`, `dateModified`, `author`, and `reviewedBy` once named clinical authors/reviewers are assigned |
| **`Cost` Attribution Schema** | `COST_ATTRIBUTION` (`src/data/cost-attribution.ts`) renders UI cards on cost pages but has zero JSON-LD | Search engines & AI answer engines cannot link cost pages to `author` / `reviewedBy` `Person` entities | Add `author` and `reviewedBy` (`Person` with `hasCredential` & `alumniOf`) to `medicalWebPageJsonLd()` on cost pages, and ensure specialty-matched reviewers for oncology/cardiac/neuro |
| **`FAQPage`** | Emitted on `treatments/[slug]`, `costs/*`, `blogs/*`, `doctors/directory`, `hospitals/directory` | Google restricts `FAQPage` rich results to authoritative government/health sites, though AI/answer engines still parse it; ensure FAQs are visibly rendered in DOM on every emitting page | Verify `1:1` visible DOM parity for every `FAQPage` item; remove `FAQPage` JSON-LD from generic directory/paginated listings where FAQs are boilerplate |
