# GAF Healthcare — Internal Linking Architecture & Graph Strategy

**Target Flow:**  
`Homepage / Country Hub → Specialty Pillar → Treatment Pathway → Cost Guide → Hospital → Doctor → Supporting Blog → Consultation CTA`

---

## 1. Current Internal Linking Findings (Verified in Codebase)

| Surface / Pattern | Verified State | Issue / Gap Identified |
|---|---|---|
| **Doctor Profiles (`2,602` pages)** | Phase 1 (`#59`) added `DoctorProfileGraph` (`9,405` curated treatment links across `2,063` doctors, `relatedCostTreatments`, `doctorSpecialtyCostLink`, `relatedDoctorBlogs`, `similarDoctors`). | **Gap 1:** `539` doctors (`2,602 - 2,063`) still have `0` curated treatment links because those specialties (`Gastroenterology`, `Neurology`, `Nephrology`, `ENT`, `Pulmonology`, `Ophthalmology`, `Dentistry`) have `0` curated treatments.<br>**Gap 2:** `DoctorProfileGraph` is gated by `locale === "en"` (`src/app/doctors/doctor-profile.tsx` line 127), so **all `2,602` Arabic `/ar/doctors/*` profiles lack `DoctorProfileGraph`**! |
| **Blogs (`111` EN, `73` AR)** | Phase 4 (`organic-visibility-investigation/phase4-internal-linking-report.md`) classified `461` links and added `15` `blog → treatment` links across `13` posts. | Most of the `111` blogs outside Breast/Prostate/Colon/HIPEC/Cardiac clusters still lack bidirectional `cost` + `specialty` + `curated treatment` links; `relatedDoctorBlogs()` uses fuzzy slug token matching. |
| **Hospital Profiles (`49` campuses)** | Link to affiliated `faculty` (`DoctorCard`), `pathways` (cost sheets), and `nearby` hospitals. | Missing structured links from each hospital to its **Specialty Hospital Hubs** (`/hospitals/india/{city}/{specialty}`) and **Curated Treatments** performed there. |
| **Country Hubs (`37` EN)** | Link to top treatments and India directories. | Missing **bidirectional links** back from top India specialty/cost pages to relevant priority country guides (`"International patient pathways: Tanzania, Kenya, Ethiopia, Iraq, Oman, Saudi Arabia"`), leaving country hubs relatively isolated in crawl depth. |
| **Links to `noindex` / Redirecting / Unpublished Targets** | `LocaleLink` (`src/components/locale-link.tsx`) strips/rewrites `/consult?*` into external `wa.me` links; `sitemap-en.xml` still lists `1,329` high-overlap EN facets; `legacy-redirects` fixes old `308`s. | **Risk 1:** `1,329` redundant EN facet pages dilute internal PageRank sent from `CatalogFilter` chips & breadcrumbs.<br>**Risk 2:** `CostSheet` flat URLs (`/costs/{slug}`) are still linked from legacy places instead of `/costs/india/{specialty}/{procedure}` (`424` canonicals).<br>**Risk 3:** `1` `noindex` blog (`/blogs/breast-cancer-follow-up-tests`) and `1,676` unauthored non-India cost URLs must never receive internal links from indexable hubs. |
| **Orphan / Low-Inlink Pages** | Newly created or deep procedure/city pages (`2,090` city cost pages, `539` doctors outside curated-treatment specialties, `73` AR blogs lacking `DoctorProfileGraph` cross-links). | Deep city-cost and non-oncology doctor pages rely almost exclusively on paginated directory listings (`?page=2..N` on `/doctors` & `/hospitals`) or `sitemap-en.xml` for discovery. |

---

## 2. Priority Internal Linking Fixes

### L1 — Enable Localised `DoctorProfileGraph` on Arabic Doctor Profiles (`/ar/doctors/*`)
- **Problem:** `src/app/doctors/doctor-profile.tsx` checks `if (locale === "en")` before rendering `<DoctorProfileGraph />`.
- **Impact:** `2,602` Arabic doctor pages lose structured internal links to AR curated treatments (`58`), AR cost pages (`147` + `419`), AR specialty hubs, and AR blogs (`73`), severely weakening Arabic crawl depth and topical clustering.
- **Fix:** Localise `DoctorProfileGraph` headings/anchors via `messages` (`ar.ts`) and ensure it only links to `localePathIsPublished("ar", target)` URLs so it never creates links to unpublished AR pages.

### L2 — Prune Internal Links to Low-Value / Duplicate Facets
- Stop linking from `CatalogFilter`, footer links, and quick-facts cards to:
  - EN facets with `>= 90%` parent overlap (`1,329` URLs) once gated;
  - Cost facets with `< 3` items (`2,716` URLs) — point directly to `/costs/india/{specialty}/{procedure}` instead;
  - Non-India cost combinations where `!row.page` (`1,676` URLs).
- **Result:** Concentrates internal equity onto the `~4,000–5,000` high-intent canonical EN pages rather than diluting across `8,294+` overlapping URLs.

### L3 — Close `Blog → Cost + Curated Treatment + Specialty` Loop
- Every published blog post (`110` EN, `73` AR) must embed:
  1. **1 primary Curated Treatment link** (`/treatments/{slug}-in-india`) in the upper 40% of body or structured callout;
  2. **1 primary Cost Guide link** (`/costs/india/{specialty}/{procedure}`) with anchor variation (`"Check [Procedure] Cost in India"`);
  3. **1 Specialty Doctor Directory link** (`/doctors/india/{specialty}`) and **1 Hospital Hub link** (`/hospitals/india/{specialty}`);
  4. **2–3 sibling cluster blog links** (preventing hub-less orphan blogs).
- Eliminate duplicate identical anchors on the same page; vary descriptive clinical anchors naturally.

### L4 — Close `Country Hub ↔ Specialty ↔ Cost` International Mesh
- Each of the **10 priority country hubs** (`/{country}/treatment-in-india` and `/ar/{country}/treatment-in-india` for Iraq/Oman/Saudi Arabia) links down to the **6–8 highest-demand curated treatments and cost guides** for that corridor.
- Add an unobtrusive **"International Patient Visa & Country Guides"** strip on `/treatments/*` and `/costs/india/{specialty}` linking to the top priority country hubs so Googlebot discovers country hubs from high-authority treatment pillars (2 clicks from `/`).

### L5 — Audit & Eliminate Internal Links to `noindex` / `301` / `404` URLs
- Add an automated CI link-integrity crawler test (`scripts/audit/internal-link-graph.ts`) across rendered HTML of representative templates (`/`, `/treatments/*`, `/costs/india/*`, `/doctors/*`, `/hospitals/*`, `/blogs/*`, `/tanzania/treatment-in-india`) that fails if any internal `<a href>` points to:
  - A `404`, `410`, or `301`/`308` redirect;
  - A `noindex` page (e.g., `/blogs/breast-cancer-follow-up-tests`, `/hospitals?page=2`, `/fr/*`, `/ru/*`);
  - A Title-Case un-normalized catalog URL (`/costs/India/...`).
