# GAF Healthcare — Content Quality & Duplication Audit

**Verified Inventory Baseline (`release/stage4-rsc-prod` @ `9714063`):**
- Doctors: `2,602` (EN & AR)
- Hospitals: `49` (`147` URLs including `/doctors` & `/procedures` sub-pages)
- Treatment Cost Sheets & Articles: `419` (EN & AR)
- Curated Treatments (`/treatments/*`): `94` EN, `58` AR
- Blogs (`/blogs/*`): `111` EN (`110` indexable, `1` `noindex`), `73` AR (`73` indexable)
- Origin Country Hubs (`/{country}/treatment-in-india`): `37` EN, `0` published AR
- Specialty Cost Landing Pages (`/costs/india/{specialty}`): `25` (`specialtyPages`)

---

## 1. Thin & Duplicate Content Audit (Exact Codebase Counts)

| Duplicate / Thin Cohort | Exact Count | Codebase Root Cause | Business & Search Demand Risk | Classification Decision |
|---|---:|---|---|---|
| **EN Directory Facets — `100%` Same Entities as Parent** | **1,083** (`964` hospitals, `118` doctors, `1` cost) | `src/lib/i18n/facet-canonical.ts` intentionally bypasses `en` (`SOURCE_LOCALE`), so deep facets returning the exact same entities as their parent URL stay self-canonical and in `sitemap-en.xml` | Hospital city+specialty+procedure facets (`964`) compete with city+specialty parent without adding unique value | **CANONICALISE** to `parent_url` + exclude from `sitemap-en.xml` (unless GSC query data proves distinct demand AND unique copy is added) |
| **EN Directory Facets — `90–99.9%` Parent Overlap** | **246** (`170` hospitals, `74` doctors, `4` costs; total `>=90%` = **`1,329`**) | No overlap gate exists for EN in `src/lib/i18n/locale-publication.ts` (`hospitalFacet` `0.9` gate only runs for `ar`) | Near-duplicate listings fragment link equity and bloat crawl budget | **NOINDEX** (`noindex,follow` + exclude from `sitemap-en.xml`) unless GSC shows impressions > threshold |
| **EN Cost Facets with `<3` Treatments** | **2,716** (of `2,893` cost facet candidates) | Procedure-city/specialty permutations with `1–2` rows exist in `facetCandidatePaths()` | Thin directory tables with 1 procedure row compete directly with the canonical procedure cost page (`/costs/india/{specialty}/{procedure}`) | **CANONICALISE / NOINDEX**: `1`-row cost facets should canonicalise or `noindex,follow` in favour of the full procedure cost sheet (`CostsProcedureView`) |
| **Non-India Cost Combinations Without Custom Page Copy** | **1,676** | `src/app/costs/costs-country-view.tsx` renders `200 index,follow` when `!row.page` using India catalog band + comparator boilerplate | `1,676` thin templated country×procedure pages (`Turkey`, `Thailand`, `UAE`, `Germany`, etc.) without local clinical/hospital copy | **NOINDEX** (`noindex,follow`) until unique destination hospital/price/regulatory copy (`row.page`) is authored; keep out of sitemaps |
| **Secondary Origin Country Hubs (`/{country}/treatment-in-india`)** | **31** non-priority (of `37` total) | `src/data/*-treatment-in-india.ts` (~728–915 lines each); `~20–21%` raw file overlap (`zambia` vs `uganda` = `0.212`, `angola` vs `liberia` = `0.213`), plus shared India hospital/cost/visa template sections | Low-demand country pages (`Moldova`, `Armenia`, `Belarus`, `Liberia`, `Benin`, `Chad`, etc.) may carry thin differentiation relative to target markets | **KEEP AND CONSOLIDATE** (`31` secondary): preserve all hubs with GSC impressions/backlinks; upgrade high-potential Africa/CIS hubs; only prune/consolidate after 16-month GSC check |
| **Noindex Blog Post** | **1** (`/blogs/breast-cancer-follow-up-tests`) | `allowIndex: false` in CMS | Excluded from `sitemap-blogs.xml`; currently lacks differentiation vs screening/survivorship content | **KEEP AND IMPROVE**: expand with clinical surveillance schedules, imaging/tumour-marker tables, citations, and re-enable indexation |

---

## 2. Content Quality Threshold (Mandatory Publication Gate)

No new programmatic, country, specialty, treatment, or blog URL may be indexed (`index,follow` + sitemap inclusion) unless it passes **all six criteria**:

1. **Unique Entity & Value Threshold:**
   - Directory/facet URLs must return `>= 3` verified entities (doctors, hospitals, or treatments) AND `< 90%` overlap with their immediate parent URL, OR carry verified custom editorial copy (`>= 400` unique words + local clinical context).
   - Non-India cost URLs must have an authored `DestinationRow.page` (`row.page`) with verified destination-specific hospital context, currency/range notes, and FAQs.
2. **Distinct Search Intent (Zero Cannibalisation):**
   - Each page maps to one primary search intent (see `docs/seo-recovery/topical-authority-strategy.md`) and does not duplicate an existing pillar, treatment, or cost page title/H1.
3. **Clinical Accuracy & Non-Fabrication:**
   - Zero invented success rates, survival percentages, doctor credentials, hospital accreditations, or fabricated prices.
   - Ranges carry explicit variance disclaimers (`COST_DISCLAIMER`) and scope labels (e.g., partner range vs full pathway estimate).
4. **Named Authorship & Clinical Review:**
   - Medical/cost content displays a named author/curator and a **specialty-appropriate** named medical reviewer where available, with accurate `lastReviewed` / `dateModified` dates. *(Remediation required: currently `COST_ATTRIBUTION` assigns BDS dental reviewers to oncology/cardiac/neurosurgery cost pages, and blogs use generic `"GAF Healthcare Editorial"`.)*
5. **AI & Answer-Engine Readiness:**
   - Clear introductory Quick Answer (`40–70` words), structured comparison tables, plain-language definitions of clinical terms, and verifiable medical source citations (NCCN, ESMO, AHA/ACC, ASRM, NABH/JCI).
6. **Connected Commercial & Trust Graph:**
   - Links naturally to verified specialty doctors, accredited hospitals, cost pages, and consultation/report-review CTAs.

---

## 3. Doctor & Hospital Profile Completeness Audit & Completion Workflow

### Verified Field Completeness (`2,602` Doctors & `49` Hospitals)

| Entity | Field | Present | Missing | % Missing | Priority & Impact |
|---|---|---:|---:|---:|---|
| **Doctor (`2,602`)** | `languages` | 2,602 | 0 | 0.0% | Complete |
| Doctor | `experience` | 2,601 | 1 | 0.04% | Fix 1 record |
| Doctor | `qualifications` | 2,585 | 17 | 0.65% | P1 — Essential credential trust signal |
| Doctor | `procedures` | 2,563 | 39 | 1.5% | P1 — Drives specialty/procedure matching & internal links |
| Doctor | `education` | 1,484 | **1,118** | **43.0%** | **P1** — Powers `alumniOf` JSON-LD & YMYL E-E-A-T |
| Doctor | `awards` | 669 | **1,933** | **74.3%** | P2 — Differentiator when verified |
| Doctor | `memberships` | 282 | **2,320** | **89.2%** | P2 — Professional society verification (ASCO, CSI, etc.) |
| Doctor | `image` (photo) | 185 | **2,417** | **92.9%** | **P1** — High impact on trust, CTR, and `Physician` schema |
| Doctor | `research` | 125 | **2,477** | **95.2%** | P2 — PubMed/ORCID verified publications |
| **Hospital (`49`)** | `bio` & `procedures` | 49 | 0 | 0.0% | Complete |
| Hospital | `accreditation` | 46 | **3** | **6.1%** | P1 — Verify JCI / NABH status for the 3 unlabelled hospitals |
| Hospital | `image` | 0 | **49** | **100.0%** | **P1** — Zero hospital schema/OG campus photos populated in catalog record |
| Hospital | `highlights` | 0 | **49** | **100.0%** | P1 — International patient desk, ICU/OT beds, airport pickup, interpreters |
| Hospital | `overview` | 0 | **49** | **100.0%** | P1 — Structured campus overview separate from `bio` |

### Non-Fabricated Data-Completion Workflow (4-Stage Pipeline)
1. **Stage A — Prioritised Queue Generation (By Commercial & Clinical Impact):**
   - Rank the `1,118` doctors missing `education` and `17` missing `qualifications` by: (1) Priority specialty (`Oncology`, `Cardiac`, `Neurosurgery`, `Orthopaedics`, `Urology`, `Gastroenterology`, `IVF`, `Cosmetic`), (2) Featured / curated-treatment linkage (`treatment.doctorSlugs`), and (3) City tier (Delhi NCR, Mumbai, Chennai, Bengaluru, Hyderabad).
2. **Stage B — Official Source Verification (No Scraping Guesswork or AI Invention):**
   - **Qualifications & Education:** National Medical Commission (NMC / Indian Medical Register), official hospital faculty directories (`apollohospitals.com`, `fortishealthcare.com`, `medanta.org`, `maxhealthcare.in`, `manipalhospitals.com`, `sahyadrihospital.com`), and university degree records.
   - **Research & Publications:** PubMed (`eutils.ncbi.nlm.nih.gov`) / ORCID / Google Scholar matched by full name + hospital/city affiliation; store `PMID`/`DOI` provenance alongside each entry in internal verification CSVs.
   - **Hospital Data (`49` campuses):** Official JCI (`jointcommissioninternational.org`) and NABH (`nabh.co`) accreditation registries + hospital international patient desk specifications.
3. **Stage C — Provenance-Tagged PR Batches:**
   - Follow existing repo pattern (`docs/manipal-lokmanya-*`, `docs/sahyadri-pune-*`): commit a verification CSV (`source_url`, `verified_date`, `reviewer`) alongside catalog updates so every credential is auditable.
4. **Stage D — Automated Completeness CI Check:**
   - Add a non-blocking audit report script (`scripts/audit/entity-completeness.ts`) tracking missing `qualifications`, `education`, `procedures`, `image`, and `accreditation` deltas per release.

---

## 4. Non-Superlative & Editorial Compliance Fixes

1. **Remove `"Best ..."` Claims Where Unsubstantiated:**
   - Refactor `doctorDiscoveryHeading()` (`src/lib/doctor-discovery.ts`) and any legacy `"Best Hospitals"` titles/H1s to factual phrasing (`"Medical Oncologists in India"`, `"Accredited Cancer Hospitals in Delhi NCR"`).
2. **Specialty-Aligned Medical Review Board:**
   - Retain `Dr. Shabnam Choudhary, BDS` and `Dr. Saffiyyah Chaudhary, BDS` for dentistry/oral/general editorial curation (`src/data/cost-attribution.ts`), and onboard/attribute verified MBBS/MD/MS/MCh/DM clinical reviewers from GAF's medical advisory panel for oncology, cardiac, neurosurgery, orthopaedics, urology, gastroenterology, and IVF.
3. **Medical Citations on All Clinical Pages:**
   - Add a `references` block (`title`, `organization`, `year`, `url`) to `Article` (blogs), `CuratedTreatment`, and `CostArticle` schemas and UI footers.
