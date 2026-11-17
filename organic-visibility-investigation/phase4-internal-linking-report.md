# Phase 4 — Internal Linking and Authority Strengthening

**Status:** Complete (local only — awaiting review before push/PR)  
**Branch:** `cursor/phase4-internal-linking-6064`  
**Base:** `release/stage4-rsc-prod`  
**Branch tip:** `cursor/phase4-internal-linking-6064` (local; not pushed)  
**Content commit:** `b3f6788918e686ef46a8f356a116060d7653953f`  
**GSC performance / enquiry impact:** UNAVAILABLE (not claimed)

## Scope

Classified all **461** opportunities from `internal-linking-opportunities.csv` against live CMS blogs, curated treatments, destination hubs, and Phase 2 IVF surfaces.

Rules applied:

- **ADD** only when a contextually relevant commercial link was genuinely missing
- **KEEP** when the link already exists correctly (including curated `doctorSlugs` / `hospitalSlugs` rendered via treatment page modules)
- **SKIP** when the CSV pair was secondary/over-link noise (roadmap: prefer primary pathway; avoid spraying every modality onto every cluster blog)
- **REVIEW** reserved for unverifiable relationships (none required after verification)

## Classification counts

| Decision | Count |
|---|---|
| KEEP | 282 |
| SKIP | 164 |
| ADD | 15 |
| REVIEW | 0 |
| **Total** | **461** |

### By opportunity type

| Type | KEEP | ADD | SKIP | REVIEW |
|---|---:|---:|---:|---:|
| `blog_to_treatment` | 112 | 15 | 164 | 0 |
| `destination_to_treatment` | 25 | 0 | 0 | 0 |
| `ivf_hub_cross_link` | 4 | 0 | 0 | 0 |
| `proposed_treatment_to_existing` | 1 | 0 | 0 | 0 |
| `treatment_to_doctor` | 70 | 0 | 0 | 0 |
| `treatment_to_hospital` | 70 | 0 | 0 | 0 |

## Implementation summary

Only **blog → treatment** `relatedLinks` were added (15 ADDs across 13 published blogs). No curated doctor/hospital assignments changed. No new pages, profiles, pSEO facets, slugs, canonicals, redirects, robots, or Cloudflare config.

### Files changed

- `content/cms.json` — added contextual `relatedLinks` on 13 blogs
- `src/server-tests/phase4-internal-linking.test.ts` — targeted assertions for ADD links + Phase 1 entity modules
- `organic-visibility-investigation/phase4-linking-classification.csv` — full 461-row classification
- `organic-visibility-investigation/phase4-internal-linking-report.md` — this report

### Added links by treatment category

#### Breast cancer (4 ADD)

- `/blogs/breast-cancer-chemotherapy-side-effects` → `/treatments/chemotherapy-in-india`
- `/blogs/breast-cancer-neoadjuvant-therapy` → `/treatments/chemotherapy-in-india`
- `/blogs/chemotherapy-for-breast-cancer-in-india` → `/treatments/chemotherapy-in-india`
- `/blogs/inflammatory-breast-cancer-treatment-india` → `/treatments/chemotherapy-in-india`

#### HIPEC (3 ADD)

- `/blogs/peritoneal-carcinomatosis` → `/treatments/colon-cancer-treatment-in-india`
- `/blogs/peritoneal-metastases-treatment` → `/treatments/colon-cancer-treatment-in-india`
- `/blogs/what-is-hipec-surgery` → `/treatments/colon-cancer-treatment-in-india`

#### Colon cancer (3 ADD)

- `/blogs/colon-cancer-chemotherapy-in-india` → `/treatments/chemotherapy-in-india`
- `/blogs/colon-cancer-immunotherapy-in-india` → `/treatments/immunotherapy-in-india`
- `/blogs/stage-4-colon-cancer-treatment-in-india` → `/treatments/hipec-surgery-in-india`

#### Prostate cancer (0 ADD)

_None — primary pathways already present; secondary modality spray SKIPPED._

#### Cardiac treatment (5 ADD)

- `/blogs/how-to-choose-the-right-cardiologist-in-india` → `/treatments/heart-valve-replacement-in-india`
- `/blogs/interventional-cardiologist-vs-clinical-cardiologist` → `/treatments/heart-valve-replacement-in-india`
- `/blogs/what-to-bring-to-a-cardiologist-appointment` → `/treatments/cabg-surgery-in-india`
- `/blogs/what-to-bring-to-a-cardiologist-appointment` → `/treatments/coronary-angioplasty-in-india`
- `/blogs/what-to-bring-to-a-cardiologist-appointment` → `/treatments/heart-valve-replacement-in-india`

## Verification notes

### A. Treatment ↔ doctor profiles

All 70 `treatment_to_doctor` CSV rows: **KEEP**. Each doctor slug is present in the matching curated treatment `doctorSlugs` and the public treatment page renders `DoctorCard` modules (`src/app/treatments/[slug]/page.tsx`).

### B. Treatment ↔ hospital profiles

All 70 `treatment_to_hospital` CSV rows: **KEEP**. Each hospital slug is present in curated `hospitalSlugs` with `HospitalCard` modules on-page.

### C. Supporting blog clusters

- **Prostate:** all blogs already linked to `/treatments/prostate-cancer-treatment-in-india` (KEEP). Chemotherapy spray SKIPPED (prefer primary pathway).
- **Breast:** primary `/treatments/breast-cancer-treatment-in-india` already present on cluster blogs (KEEP). Added chemotherapy treatment links only on chemo/neoadjuvant/inflammatory posts. Immunotherapy spray SKIPPED except where already present (e.g. TNBC / metastatic).
- **Colon / HIPEC:** added modality-matched chemo/immuno links; Stage 4 → HIPEC; peritoneal/HIPEC explainers → colon treatment.
- **Cardiac:** mapped each blog to its matching commercial pathway (angioplasty / CABG / valve / pediatric). Cross-spray to unrelated pathways SKIPPED (e.g. AF → pediatric).

### D. IVF pathways

All 5 Phase 2 IVF rows: **KEEP**. No duplicate links added.

### Destination hubs (Phase 3)

All 25 `destination_to_treatment` rows: **KEEP**.

## Tests and results

Command:

```bash
NODE_OPTIONS='--conditions react-server' npx tsx --require ./scripts/test/ignore-css.cjs --test \
  src/server-tests/phase4-internal-linking.test.ts
```

Result: **pass** (ADD relatedLinks resolve to published treatments; Phase 1 doctor/hospital modules intact).

Additional cluster blog tests were attempted; they fail on a pre-existing `buildLocaleSitemap("en")` blog-entry assertion in this environment (unrelated to relatedLinks). Phase 4 assertions covering the implemented links pass.

## Restrictions respected

- No new treatment / doctor / hospital pages
- No pSEO expansion
- No mass content rewrite
- No URL slug / canonical / redirect / robots / sitemap architecture / Cloudflare changes
- Other 32 destination hubs untouched
- No deploy; no push/PR pending approval
- Phase 5 not started

## Artefacts

- `organic-visibility-investigation/phase4-linking-classification.csv`
- `organic-visibility-investigation/phase4-internal-linking-report.md`
- Mirror under `/opt/cursor/artifacts/organic-visibility-investigation/`
