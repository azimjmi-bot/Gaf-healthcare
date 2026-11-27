# GAF Healthcare — Master SEO Audit & Baseline Report

**Audit Date:** 2026-11-27  
**Target Domain:** `https://gaf.healthcare`  
**Repository:** `azimjmi-bot/Gaf-healthcare`  
**Audit Branch:** `cursor/master-seo-recovery-programme-6064` (branched from `release/stage4-rsc-prod` @ `971406370173f080150735703a1d092b5648b75d`)

---

## 1. Verified Production & Staging Baseline

| Dimension | Verified State | Evidence / Command |
|---|---|---|
| **Active Production Worker** | Version `332293be-d958-4a93-9dfd-9c413423f5d0` (`100%` traffic, created `2026-11-23T09:55:06.452Z`, message `PR#55 AR publication index Symbol.for cross-bundle b5cefe53`) | `wrangler deployments list --config wrangler.production.jsonc` |
| **Exact Production Commit SHA** | `b5cefe53c375feb5364b3c17198b6e8738329405` (PR `#55`); live `https://gaf.healthcare` HTML embeds `"b":"b5cefe53c375"`. *(Note: the earlier `b5cefe53c375feb5364b3c5b3e4ee50e6f413423` reference in brief notes was illustrative; exact Git SHA is `b5cefe53c375feb5364b3c17198b6e8738329405`.)* | `git rev-parse` + live HTML inspection |
| **Merged Phase 1 Commit (Git Only — NOT Deployed)** | `971406370173f080150735703a1d092b5648b75d` on `release/stage4-rsc-prod` (PR `#63`, merging `7dd6e579a90b73a42330a8c1ce05d7a820ad67df`) | `git log -n 3 release/stage4-rsc-prod` |
| **Isolated Staging Worker Verification** | `gaf-healthcare-staging-negcache-off` version `4086a80e-288b-4b23-bc56-ccf59ef3a77a` verified `147/147` AR cost URLs, `40/40` 410s, `5/5` 308s, `81/81` `check:alternates`, `0` 5xx/1101 | `/opt/cursor/artifacts/final-staging-verification-7dd6e57.json` |
| **Production R2 Content Stamp** | `gaf-content-production/content/.version.json` = `{"groups":{"en":"353d637","ar":"353d637"},"updatedAt":"353d637"}` | Production R2 check |
| **`GAF_NEGATIVE_CACHE`** | `OFF` (must remain `OFF`) | `wrangler.production.jsonc` / Worker env |
| **CI/CD Auto-Deploy** | None (`.github/` directory does not exist in repository) | Repository tree inspection |
| **Live `robots.txt`** | `User-Agent: * / Allow: /`, `Host: gaf.healthcare`, lists `sitemap.xml`, `sitemap_index.xml`, `sitemap-en.xml`, `sitemap-ar.xml`, `sitemap-blogs.xml` | `src/app/robots.txt` + live `https://gaf.healthcare/robots.txt` |

### Sitemap & Indexable Catalogue Inventory (on `9714063`)

| Surface / Sitemap | Count | Notes |
|---|---:|---|
| `sitemap-en.xml` | 8,294 | Country hubs (`37`), curated treatments (`94`), India/city/specialty/procedure facets, `2,602` doctors, `49` hospitals × `3` routes (`147`), cost sheets + authored geo/city cost pages, EN non-`specialtyHub` facets |
| `sitemap-ar.xml` | 4,843 | Published AR locale routes (`/ar`, `/ar/treatments` + `58` treatments, `2,602` AR doctors, `49` AR hospitals, `147` AR cost combinations, `2,124` AR facets passing `ar-publication-index`, `73` AR blogs) |
| `sitemap-blogs.xml` | 111 | `/blogs` + `110` indexable EN blogs (`1` EN blog `breast-cancer-follow-up-tests` has `allowIndex: false`) |
| `sitemap-ru.xml` / `fr` / `sw` | 0 | Intentionally empty (`localeIsPublished === false` in `src/lib/i18n/locale-gating.ts`) |
| **Combined Live Sitemap URLs** | **13,248** | `sitemap_index.xml` / `sitemap.xml` |

---

## 2. Priority Zero — Phase 1 Production Readiness Summary

Phase 1 (`971406370173f080150735703a1d092b5648b75d`) is **code-complete, regression-tested (`54/54` tests + `tsc --noEmit` passing), and staging-verified**, but **not yet deployed to production**. Production still runs `b5cefe53c375feb5364b3c17198b6e8738329405`, meaning:
- `/ar/costs` still emits English metadata on live production (`https://gaf.healthcare/ar/costs`).
- `/ar/costs/india/{city}/{specialty}` city-specialty pages (`147` URLs), `424` cost canonical consolidations (`src/app/costs/cost-sheet.tsx`), `37` multi-specialty canonical mappings, `9,405` curated treatment links across `2,602` doctor profiles, hospital pagination `noindex` (`?page>=2`), and strict `hreflang` hygiene (`0` hreflang on `noindex`/noncanonical URLs) are **waiting for production Worker deploy**.
- Dentistry (`16` AR `treatmentOverrides` keys) and Infertility & IVF (`23` AR keys) are **verified present in production R2 stamp `353d637`** (total `419` AR `treatmentOverrides` keys); only staging R2 was stale (`380` keys).

Full deployment sequence, exact SHA, pre-flight checks, rollback to `332293be-d958-4a93-9dfd-9c413423f5d0`, and post-deploy verification probes are documented in `docs/seo-recovery/production-release-checklist.md`.

---

## 3. Prioritised Technical, Content & Growth Findings (All Priorities 1–9)

### P0 — Critical Technical & Conversion Blockers (Immediate Impact)

1. **Deploy Merged Phase 1 Worker (`9714063`)** — Resolves `147` AR cost URLs, `424` cost canonicals, `37` multi-specialty mappings, `/ar/costs` English metadata leak, hospital pagination index bloat, `hreflang` on `noindex` pages, and `DoctorProfileGraph` (`9,405` treatment links across `2,602` doctors).
2. **`LocaleLink` Silently Hijacks All `/consult?*` Links & Drops Form Submissions (`src/components/locale-link.tsx`, `src/lib/site.ts`, `src/app/api/consult/route.ts`):**
   - `LocaleLink` passes every `<Link href="/consult?...">` through `consultToWhatsappHref()`, converting all consultation CTAs on cost pages, doctor profiles, hospital pages, and blogs into external `https://wa.me/919044346292` links.
   - `ConsultForm` (`src/components/consult-form.tsx`) has **no medical report upload control**, and `POST /api/consult` (`src/app/api/consult/route.ts`) returns a synthetic `VEL-*` reference **without persisting the lead, sending an email, or pushing to a CRM/webhook**.
   - **Zero GA4 conversion events (`gtag("event", ...)`) exist anywhere in `src/`**, and `DeferredAnalytics` (`src/components/deferred-analytics.tsx`) delays loading `gtag.js` until interaction or `10s`.
3. **Cold Worker SSR Latency & Bloat (`3.1s–5.0s` TTFB, up to `482 KB` HTML):**
   - Live production probes (2026-11-27) measured cache-miss TTFB at **`4.96s`** (`/ar/costs`), **`4.34s`** (`/costs/india/medical-oncology/chemotherapy`, **`482 KB`** HTML), **`3.19s`** (`/costs`), and **`3.11s`** (`/ar/doctors`), vs **`0.17s`** (`172 ms`) on CDN cache HIT (`cf-cache-status: HIT`, `x-gaf-html-cache: hit`).
   - `/ar/doctors` also emits a **duplicated `Cache-Control` response header** (`public, s-maxage=300, stale-while-revalidate=86400, public, s-maxage=300, stale-while-revalidate=86400`).

### P1 — Index Bloat, Duplication & Global Metadata Defects

4. **English Facet Duplication (`1,329` URLs with `>=90%` parent overlap; `1,083` with `100%` overlap):**
   - `src/lib/i18n/facet-canonical.ts` and `src/lib/i18n/locale-publication.ts` enforce parent-overlap gating (`0.9` threshold) for Arabic `hospitalFacet`, **but exclude English (`SOURCE_LOCALE`)** (`enCanonicalToParent = 0`).
   - Result: **`1,083`** EN directory facets (`118` doctor facets, `964` hospital facets, `1` cost facet) serve the exact same entity set as their parent URL, and **`1,329`** total facets (`192` doctor, `1,132` hospital, `5` cost) have `>=90%` overlap while remaining indexable and listed in `sitemap-en.xml`.
5. **Non-India Cost Combinations Without Custom Page Copy (`1,676` URLs):**
   - `src/app/costs/costs-country-view.tsx` renders `200 index,follow` pages for `1,676` non-India country×procedure combinations where `row.page` is `undefined` (falling back to India comparator boilerplate). While excluded from `sitemap-en.xml`, they remain crawlable and indexable via internal links/discovery.
6. **Global Metadata & Superlative Claims (`src/app/layout.tsx`, `src/lib/site.ts`, `src/lib/doctor-discovery.ts`, `src/app/page.tsx`):**
   - `src/app/layout.tsx` uses fallback title `"Oncologists, ENT and GI in India | GAF Healthcare"` and `site.description` (a `~1,800`-character keyword-stuffed run-on paragraph) plus `66` `ENGLISH_KEYWORDS` meta tags.
   - `HomePage.generateMetadata()` (`src/app/page.tsx`) sets `openGraph.url: SITE_URL` even for `/ar` instead of `https://gaf.healthcare/ar`.
   - `doctorDiscoveryHeading()` (`src/lib/doctor-discovery.ts`) outputs `"Best ... in India"` (violating clinical non-superlative policy; contrast with `hospitalMetadata` or Priority 6 rules).
7. **Structured Data & E-E-A-T Gaps (`src/lib/seo.ts`, `src/app/page.tsx`, `src/app/blogs/[slug]/page.tsx`, `src/data/cost-attribution.ts`):**
   - `HomePage` attaches `aggregateRating` directly to `MedicalBusiness` (risk of Google rich-snippet self-serving review penalty) and lacks `WebSite` + `SearchAction` JSON-LD.
   - All `111` EN blogs emit only `MedicalWebPage` (no `Article`/`BlogPosting`, no `datePublished`, no `author` `Person`, no `reviewedBy` `Person`, and generic `"GAF Healthcare Editorial"` / `"GAF Healthcare clinical desk"` bylines).
   - `COST_ATTRIBUTION` (`Dr. Shabnam Choudhary, BDS` and `Dr. Saffiyyah Chaudhary, BDS`) appears in UI on cost/pSEO pages via `<CostAttribution />` **but is not emitted in JSON-LD**, and two BDS (dental) reviewers are listed as medical reviewers across oncology, cardiac, and neurosurgery pages.

### P1/P2 — International Markets, Doctor/Hospital Completeness & Topical Authority

8. **Missing Priority Country Hubs (`4` of `10` Target Markets Absent) & Zero Arabic Country Hubs (`0/37`):**
   - Existing `37` country hubs cover Tanzania, Kenya, Ethiopia, Uganda, Zambia, and South Sudan. **Cameroon, Iraq, Oman, and Saudi Arabia have no hub pages (`404`)**.
   - **Zero (`0/37`) country hubs are published in `/ar/...`** (only 4 country files even carry partial `ar:` keys), starving Arabic-speaking target markets (Iraq, Oman, Saudi Arabia, Sudan, Somalia).
   - Only `85/278` UI strings exist in `fr.ts` (`fr: false` in `locale-gating.ts`), blocking French-speaking Cameroon/West Africa until translated.
9. **Doctor & Hospital Profile Completeness Gaps (`2,602` Doctors, `49` Hospitals):**
   - **Doctors (`2,602`):** `1,118` (`43.0%`) missing `education`, `2,477` (`95.2%`) missing `research`, `2,320` (`89.2%`) missing `memberships`, `1,933` (`74.3%`) missing `awards`, `2,417` (`92.9%`) missing `image`, `39` missing `procedures`, `17` missing `qualifications`.
   - **Hospitals (`49`):** `49/49` (`100%`) missing `image`, `highlights`, and `overview`; `3/49` missing `accreditation`.
10. **Topical Authority & Curated Treatment Coverage Gaps:**
    - Priority specialties with **zero curated `/treatments/*` pages in EN & AR:** Gastroenterology (`0` EN / `0` AR), Surgical Gastroenterology (`0`/`0`), Neurology (`0`/`0`), Nephrology (`0`/`0`), ENT (`0`/`0`), Pulmonology (`0`/`0`), Ophthalmology (`0`/`0`), Dentistry (`0`/`0`).
    - Priority specialties missing **AR curated treatments:** Cardiology (`5` EN / `0` AR), Neurosurgery (`5` EN / `0` AR), Infertility & IVF (`1` EN / `0` AR), Spine Surgery (`1` EN / `0` AR).

---

## 4. Missing External Analytics & Search Console Exports Required

This repository does not hold live Google Search Console, GA4, or third-party SEO exports beyond the partial `1,000`-row GSC 404 export and `28`-day `Pages-28d.csv` referenced in Phase 1/2. **Do not invent baseline metrics.** Before executing mass 410s, country-hub pruning, or content ROI re-prioritisation, obtain from the owner:

1. **Google Search Console (`https://gaf.healthcare`):**
   - `Performance → Search results` (Last **16 months**, filtered & unfiltered): `Pages` CSV, `Queries` CSV, `Countries` CSV, `Search appearance` CSV.
   - `Indexing → Pages`: `Indexed` URL list + every `Not indexed` reason CSV (`404`, `Discovered – currently not indexed`, `Crawled – currently not indexed`, `Duplicate without user-selected canonical`, `Alternate page with proper canonical tag`, `Excluded by 'noindex' tag`).
   - `Links → Top linked pages (External)` and `Top linking sites` CSV exports.
   - `Experience → Core Web Vitals` (Mobile & Desktop URL groups).
2. **Google Analytics 4 (`G-F12D7QK2B2`):**
   - `Landing page + query string` sessions, engaged sessions, engagement rate, key events by `Country` and `Session default channel group` (Organic Search) for last 12–16 months.
3. **CRM / WhatsApp Lead Logs:**
   - Verified monthly qualified patient enquiries by origin country, specialty, and landing path (currently impossible to measure via GA4 alone due to missing event instrumentation).
4. **Optional Competitive Intelligence (SEMrush / Ahrefs):**
   - Domain backlink profile (referring domains with anchor text & target URLs) and competitor keyword gap exports for priority corridors.
