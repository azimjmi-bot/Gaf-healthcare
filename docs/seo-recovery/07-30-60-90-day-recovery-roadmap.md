# 30 / 60 / 90-Day SEO Recovery Roadmap & Priority 100 URLs

**Baseline Audited:** Production SHA `b5cefe53c375feb5364b3c17198b6e8738329405` (`https://gaf.healthcare`)  
**Guiding Principle:** Stop expanding thin programmatic URLs. First repair broken indexing/sitemap/internal-link signals, consolidate duplicate pSEO sprawl, focus internal equity and E-E-A-T onto the **Top 100 existing commercial URLs**, and then fill real topical gaps across under-served specialties. *(No unrealistic ranking or traffic guarantees are assumed.)*

---

## 1. Measurable KPIs & Current Baselines

| KPI | Verified Baseline (`b5cefe53` / GSC 28d ending `2026-11-16`) | 30-Day Target | 60-Day Target | 90-Day Target |
|---|---|---|---|---|
| **Sitemap Indexability Accuracy (`noindex` URLs inside sitemaps)** | **`147` broken URLs** (`sitemap-ar.xml` `/ar/costs/india/<city>/<spec>`) | **`0`** | **`0`** | **`0`** |
| **Hreflang Reciprocity / `noindex` Hreflang Violations** | **`300+`** (`147` AR + `40` EN cost + `/costs/<slug>` + `?page=2+` + `1` EN blog) | **`0`** | **`0`** | **`0`** |
| **GSC 404s Among Top-1,000 Performing URLs (`Pages-28d.csv`)** | **`359` URLs (`931` impr / `22.5%`)** | **`< 50`** (mapped to `301` or `410`) | **`0` high-value/backlink 404s** | **`0`** |
| **EN Exact-Parent Duplicate Facets in `sitemap-en.xml`** | **`1,082`** (`964` hospital + `118` doctor) | Audit & test staging | **Consolidated (`0` exact duplicates in sitemap)** | **`0`** |
| **Doctor Profiles w/ Correct Headings & Non-Noindex Links** | **`2,490` mislabeled**; **`284` linking to `noindex`**; **`0` → `/treatments/*`** | **`0` mislabeled; `0` `noindex` links; `2,602` linked to treatments** | Maintained | Maintained |
| **Curated Treatments w/ Inbound Blog Links & Named Reviewer E-E-A-T** | **`33 / 94`** have blog links; **`0 / 111`** blogs have named reviewer | Reviewer schema & policy defined | **`>= 80 / 94`** blog-linked; **Top 100** URLs reviewer-attributed | **`94 / 94`** blog-linked & reviewed |
| **Cold 404 TTFB & Render Queue Protection** | Up to **`5,500 ms`** (`GAF_NEGATIVE_CACHE: OFF`) | **`< 200 ms` warm `404` HIT** (if negative cache approved) | Maintained | Maintained |
| **Organic Search Visibility & Enquiries (`a/Chart.csv`)** | **`18` clicks / `3,530` impr / `0.51%` CTR** (28d) | Crawl & index stabilization *(baseline 16-mo & GA4 locked)* | Measurable lift in valid commercial impressions & CTR on Top 100 | Sustained non-branded impression, click & WhatsApp/consult enquiry growth |

---

## 2. Phase 1: Days 1–30 — Technical Cleanliness, Broken Signals & Crawl Recovery

**Objective:** Eliminate every confirmed P0/P1 contradiction causing Googlebot to distrust sitemaps, `hreflang`, canonicals, and doctor pages, without altering URL architecture rashly.

1. **Fix `147` AR City-Specialty `noindex` Sitemap Bug (RC-01):**
   - Update `src/app/costs/directory.tsx` so Arabic city+specialty routes either evaluate localized quality thresholds and emit `index, follow`, OR remove non-indexable AR city+specialty URLs from `publishedFacetPaths("ar")`, `sitemap-ar.xml`, and `ar-publication-index.json`.
2. **Fix `hreflang`, Canonical Overwrite & `/hospitals?page=2+` Pagination (RC-04, RC-06, RC-07):**
   - Update `src/lib/i18n/metadata.ts` (`withLocaleMetadata`) so `alternates.languages` is **suppressed whenever `robots.index === false` OR canonical != self** (including `/costs/<slug>` flat aliases and post-`withLocaleMetadata` directory overrides).
   - Fix `src/app/costs/directory.tsx` line 64 so city-procedure pages lacking `city.page` preserve `costsProcedureMetadata()`'s national canonical.
   - Fix `src/app/hospitals/directory.tsx` line 93 so `page > 1` sets `robots: { index: false, follow: true }` and suppresses `hreflang`.
   - Resolve `/blogs/breast-cancer-follow-up-tests` asymmetric EN (`noindex`) vs AR (`index`) `hreflang` pair.
3. **Fix `DoctorProfileGraph` Heading & `noindex` Internal Links (RC-02):**
   - In `src/components/doctor-profile-graph.tsx`, change line 72 heading conditionally (`isRadiation ? "Related radiation treatments" : "Procedures & clinical focus"`), omit/replace `specialtyCostHref` whenever the target fails `specialtyPageMeetsQualityThreshold` (`284` EN doctors + AR), and wire matching `/treatments/*` curated links onto every doctor profile.
4. **Fix Proxy Redirect Hops, Case Sensitivity & Enable Negative Caching (RC-03, RC-12):**
   - Fix `legacy-redirects.mjs` line 28 (`/hospital_country/india` → `/hospitals/india`, lowercase).
   - Fix `catalogCanonicalRedirect` in `src/proxy.ts` line 94 to lowercase `parts[rootAt]` *before* `CATALOG_ROOTS.has(...)` so `/Doctors/*` redirects `301` instead of `404`.
   - After explicit owner approval and staging validation, enable `GAF_NEGATIVE_CACHE` (`TTL 120–300s`) on apex to protect the `8`-slot Worker render pool from 404 bot spikes.
5. **Reconcile Missing Exports & Triage Legacy 404s (RC-03 / HYP-01):**
   - Collect the missing `1,691` GSC 404s, full 16-month GSC exports, and Semrush/GSC backlink CSVs (`08-missing-data-and-owner-questions.md`).
   - Add verified 1-to-1 `301` redirects only for genuine `/treatments/<spec>/<leaf>` and `/resources/blog/*` successors with proven historical equivalents or backlinks; assign `410` to confirmed dead patterns (`/ireland/*`, defunct `/ru/*` leftovers, WordPress junk).

---

## 3. Phase 2: Days 31–60 — Programmatic Consolidation, Internal Equity & E-E-A-T

**Objective:** Stop index dilution in English pSEO, concentrate PageRank onto the **Top 100 commercial URLs**, and deploy YMYL trust signals.

1. **Consolidate English Programmatic Facet Bloat (RC-05):**
   - Extend `canonicalFacetPath()` (`src/lib/i18n/facet-canonical.ts`) or `noindex`/canonical policy to English doctor & hospital facets:
     - Consolidate **`1,082` exact-parent duplicate EN facets** (`964` hospital + `118` doctor) to their parent URLs and remove from `sitemap-en.xml`.
     - Evaluate & gate **`50` `<3`-entity facets** and **`1,324` `>=90%` overlap facets** (mirroring Arabic's proven `localePathIsPublished` discipline) so Googlebot focuses on substantive city/specialty hubs.
   - Suppress/noindex **`1,676` unpopulated non-India country cost rows** (`CostsCountryView` with `0` custom `.page` prose) until genuine local pricing/partner data exists.
   - Clean `sitemap-entries.ts` `<lastmod>` dates (remove build-time `new Date()` on unchanged `2,602` doctors / `49` hospitals / `37` hubs; restore valid `<lastmod>` metadata).
2. **Rewire Internal Link Architecture Toward the Top 100 URLs (RC-09):**
   - Add contextual blog-to-treatment callouts across all `111` EN & `73` AR blogs so **`61` currently unlinked curated treatments** receive strong topical anchor text.
   - Surface direct links to flagship `/treatments/*` & `/costs/india/<specialty>` hubs from the homepage, `/specialties`, `2,602` doctor profiles, `49` hospitals, and `419` cost sheets.
3. **Launch Real Clinical E-E-A-T & Doctor Data Enrichment (RC-08):**
   - Replace generic `"GAF Healthcare clinical desk"` attribution with **named, verifiable partner/editorial physician reviewers** (never invented) across the Top 100 URLs and all `111` blogs, adding `author` / `reviewedBy` `Person` schema in `medicalWebPageJsonLd`.
   - Backfill missing `education` (`1,118` doctors), `awards` (`1,933`), and `research` (`2,477`) starting with the doctors featured on the Top 100 treatments and flagship hospitals.

---

## 4. Phase 3: Days 61–90 — Topical Authority Expansion & Off-Page Recovery

**Objective:** Expand genuinely differentiated commercial & educational content in underserved high-value specialties and rebuild external authority.

1. **Close Under-Covered Priority Specialty Gaps (RC-10):**
   - **GI & Bariatric Surgery:** Expand beyond `2` curated treatments to match the `59` existing cost sheets & `34` blogs (e.g., Liver Transplant, Gallbladder/Laparoscopic Surgery, Sleeve Gastrectomy).
   - **IVF & Fertility (`3` treatments, `0` blogs) & Urology (`5` treatments, `0` blogs):** Publish foundational educational blogs and expand AR parity (`1` IVF, `5` Urology) linking directly into treatment & cost pages.
   - **Neurosurgery (`6` EN, `0` AR, `0` blogs) & Orthopaedics (`8` EN, `10` blogs):** Build full English + Arabic supporting clusters around brain tumor, DBS, spine, knee/hip replacement.
2. **Differentiate Secondary Origin Country Hubs & City Cost Guides (RC-11):**
   - Upgrade the top 10–15 African/CIS/Middle-East hubs (`/kenya/`, `/nigeria/`, `/ethiopia/`, `/tanzania/`, `/uganda/`, `/uzbekistan/`, etc.) with genuinely unique e-Medical Visa steps, direct flight corridors, currency/payment guidance, and partner hospital pathways — reducing cross-country line overlap from `~64%` to `<20%`.
   - Deepen the top `94` curated `/treatments/*` pages from `~416–659` words toward `1,500+` word clinical decision guides (eligibility, staging, risks, inpatient vs hotel stay timeline, follow-up care).
3. **Authority & Migration Link Reclamation:**
   - Using Phase 1 backlink exports, reclaim unlinked brand mentions, update high-authority `gafhealthcare.in` referring partners directly to `https://gaf.healthcare`, and earn editorial citations from reputable medical-travel and hospital partner publications.

---

## 5. The Top 100 Existing URLs to Prioritise for Recovery (Verified Live on `b5cefe53`)

*(All 100 paths below exist on `b5cefe53`; canonical uppercase catalog segments resolve via 301 to lowercase `gaf.healthcare/costs/india/...`.)*

| Ranks | Category | Exact Live URLs (`b5cefe53`) | Recovery Rationale |
|---|---|---|---|
| **1–15** | **Specialty Cost Hubs (`15`)** | `/costs/india/surgical-oncology`, `/costs/india/medical-oncology`, `/costs/india/radiation-oncology`, `/costs/india/hematology`, `/costs/india/cardiac-surgery`, `/costs/india/cardiology`, `/costs/india/pediatric-cardiac-surgery`, `/costs/india/neurosurgery`, `/costs/india/urology`, `/costs/india/surgical-gastroenterology`, `/costs/india/infertility-ivf`, `/costs/india/orthopedics`, `/costs/india/cosmetic-surgery`, `/costs/india/bariatric-surgery`, `/costs/india/spine-surgery` | Highest-intent specialty commercial hubs combining procedures (`10–30`), verified hospitals (`11–38`), and specialists (`26–253`); also anchors Arabic fix (`RC-01`). |
| **16–38** | **Flagship Curated Treatments Across All 8 Priority Specialties (`23`)** | `/treatments/breast-cancer-treatment-in-india`, `/treatments/prostate-cancer-treatment-in-india`, `/treatments/pancreatic-cancer-treatment-in-india`, `/treatments/hipec-surgery-in-india`, `/treatments/bone-marrow-transplant-in-india`, `/treatments/chemotherapy-in-india`, `/treatments/immunotherapy-in-india`, `/treatments/targeted-therapy-in-india`, `/treatments/proton-beam-therapy-in-india`, `/treatments/coronary-angioplasty-in-india`, `/treatments/heart-valve-replacement-in-india`, `/treatments/pacemaker-implantation-in-india`, `/treatments/pediatric-heart-surgery-in-india`, `/treatments/brain-tumor-surgery-in-india`, `/treatments/spine-tumor-surgery-in-india`, `/treatments/radical-prostatectomy-in-india`, `/treatments/turp-surgery-in-india`, `/treatments/gastric-bypass-surgery-in-india`, `/treatments/whipple-surgery-in-india`, `/treatments/ivf-treatment-in-india`, `/treatments/hip-replacement-surgery-in-india`, `/treatments/rhinoplasty-in-india`, `/treatments/liposuction-in-india` | Core bottom-of-funnel procedure landing pages spanning all 8 target specialties; currently semi-orphaned from doctor profiles (`0` links) and under-linked from blogs (`61/94` have 0 blog links). |
| **39–60** | **High-Value Oncology & Hematology Curated Treatments (`22`)** | `/treatments/colon-cancer-treatment-in-india`, `/treatments/breast-reconstruction-in-india`, `/treatments/bile-duct-cancer-surgery-in-india`, `/treatments/dendritic-cell-therapy-in-india`, `/treatments/intrathecal-chemotherapy-in-india`, `/treatments/intraperitoneal-chemotherapy-in-india`, `/treatments/adjuvant-chemotherapy-in-india`, `/treatments/neoadjuvant-chemotherapy-in-india`, `/treatments/molecular-targeted-therapy-in-india`, `/treatments/precision-oncology-in-india`, `/treatments/hormone-therapy-in-india`, `/treatments/external-beam-radiotherapy-in-india`, `/treatments/intensity-modulated-radiation-therapy-in-india`, `/treatments/image-guided-radiation-therapy-in-india`, `/treatments/stereotactic-radiosurgery-in-india`, `/treatments/stereotactic-body-radiation-therapy-sbrt-in-india`, `/treatments/cyberknife-robotic-radiosurgery-in-india`, `/treatments/gamma-knife-surgery-in-india`, `/treatments/brachytherapy-in-india`, `/treatments/stem-cell-transplantation-in-india`, `/treatments/leukemia-treatment-in-india`, `/treatments/lymphoma-treatment-in-india` | GAF's deepest existing topical authority cluster (`40` cancer treatments + `~88` oncology blogs); nearest to page-1 competitiveness once E-E-A-T and internal links are wired. |
| **61–70** | **Top Origin Country Hubs (`10`)** | `/kenya/treatment-in-india`, `/nigeria/treatment-in-india`, `/ethiopia/treatment-in-india`, `/tanzania/treatment-in-india`, `/uganda/treatment-in-india`, `/ghana/treatment-in-india`, `/south-africa/treatment-in-india`, `/uzbekistan/treatment-in-india`, `/kazakhstan/treatment-in-india`, `/russia/treatment-in-india` | Primary African & CIS inbound medical-travel corridors; upgrade first with bespoke visa/flight/referral guides before expanding remaining `27` hubs. |
| **71–79** | **Flagship National Cost Sheets (`9`)** | `/costs/india/cardiology/coronary-angioplasty-stenting`, `/costs/india/surgical-gastroenterology/liver-transplantation`, `/costs/india/urology/kidney-transplantation`, `/costs/india/medical-oncology/bone-marrow-transplantation`, `/costs/india/joint-replacement/total-knee-replacement`, `/costs/india/joint-replacement/total-hip-replacement`, `/costs/india/neuro-oncology/brain-tumor-surgery`, `/costs/india/surgical-oncology/whipple-procedure`, `/costs/india/cardiac-surgery/tavr-tavi-transcatheter-aortic-valve-replacement` | High-ticket international procedures (`$3,200–$70,000` range) capturing explicit "cost in India" queries and consolidating city/flat-slug equity. |
| **80–93** | **GSC-Active & Funnel-Bridge Blogs (`14`)** | `/blogs/brachytherapy-for-prostate-cancer`, `/blogs/targeted-therapy-for-breast-cancer-in-india`, `/blogs/angioplasty-cost-in-india`, `/blogs/radiation-therapy-for-prostate-cancer`, `/blogs/pacemaker-cost-in-india`, `/blogs/icd-implantation-cost-in-india`, `/blogs/prostate-cancer-treatment-without-surgery`, `/blogs/lutetium-177-psma-therapy-in-india`, `/blogs/angioplasty-vs-bypass-surgery-in-india`, `/blogs/knee-replacement-surgery-in-india`, `/blogs/breast-cancer-treatment-cost-in-india`, `/blogs/bypass-surgery-cost-in-india`, `/blogs/heart-valve-replacement-cost-in-india`, `/blogs/pediatric-heart-surgery-cost-in-india` | Already earning GSC impressions (`Pages-28d.csv`) or serving as direct top-of-funnel bridges into Oncology, Cardiac, and Ortho treatment pages. |
| **94–100** | **Flagship Hospitals & GSC-Impression Doctors (`7`)** | `/hospitals/max-super-speciality-hospital-saket` *(plus `fortis-gurgaon`, `apollo-delhi`, `medanta-gurgaon`, `artemis-hospital`, `apollo-proton-cancer-centre` in hospital sprint)*, `/doctors/dr-md-tajuddin-farooqui`, `/doctors/dr-bhawna-dahiya`, `/doctors/dr-umarani-swain`, `/doctors/dr-sanjat-chiwane`, `/doctors/dr-suman-bhandari`, `/doctors/dr-debashish-chanda` | Active click/impression earners in `Pages-28d.csv`; fixing `DoctorProfileGraph` + adding direct links to treatments converts their impressions into funnel equity. |
