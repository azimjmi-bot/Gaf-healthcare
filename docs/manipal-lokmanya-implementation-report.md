# Manipal Baner (full) + Lokmanya Pune — Implementation Report

**Branch:** `cursor/manipal-lokmanya-pune-doctors-hospitals-6064`  
**Baseline:** `2b49d2cfcef57427c3ade02852cb7efe27d25473`  
**Restriction:** PR only — no merge, R2 upload, version stamp, or Worker deploy.

## Totals

| Source | Discovered | Eligible | Added (new) | Merged multi-campus | Excluded |
|--------|------------|----------|-------------|---------------------|----------|
| Manipal Baner | 91 | 61 | 49 | 5 | 30 |
| Lokmanya Pune | 67 | 39 | 36 | 3 | 28 |

Hospital campuses added: `lokmanya-hospital-sb-road`, `lokmanya-hospital-nigdi`, `lokmanya-hospital-chinchwad` (Manipal Baner already present).

## Inventory after import

- Doctors: 2602 EN / 2602 AR overlays
- Hospitals: 49 EN / 49 AR overlays
- Pune doctors: 202; Pune hospitals: 7
- Manipal Baner faculty: 61
- Lokmanya faculty (any campus): 39

## Images

- Verified imported portraits: 81
- Avatar fallbacks (empty image → site default avatar): 12

## Evidence & audits

- `docs/manipal-lokmanya-eligibility.csv` — every discovered doctor, eligibility, specialty, exclusion reason
- `docs/manipal-lokmanya-doctor-procedure-audit.csv` — procedure mapping status
- `docs/manipal-lokmanya-image-audit.csv`
- `docs/manipal-lokmanya-multicampus-audit.csv` — Sahyadri↔Manipal/Lokmanya merges

## Specialty eligibility

Only GAF taxonomy specialties. Exclusions include Internal Medicine, Pediatrics, Radiology, Critical Care, Psychiatry Surgery, Psychiatry Surgery, Psychiatryetics, Psychiatryotherapy, Psychiatryiatry, Endocrinology, Rheumatology, Vascular Surgery, Palliative/Integrative Oncology, and unmapped departments.

## Procedures

Evidence-based only. Unmapped / family-level associations left empty. Faculty campuses remain `faculty-affiliated` (hospital specialty/procedure landings stay noindex).

## SEO / GEO

Unique EN/AR bios, titles, meta via existing `hospitalMetadata` / doctor SEO helpers; faculty-campus copy distinguishes affiliated faculty from campus-verified service lines; hreflang/canonical via existing locale pipeline.

## Tests run

- `tsc --noEmit`
- Import + publication gate + facet-canonical + overlay suite (74 tests pass in focused run)
