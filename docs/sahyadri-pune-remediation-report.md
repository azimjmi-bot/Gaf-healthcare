# Sahyadri Pune PR #37 — Audit Remediation Report

**Branch:** `cursor/sahyadri-pune-doctors-hospitals-6064`  
**Base implementation:** `63ceef8`  
**Verdict:** READY FOR FRESH REVIEW  
**Scope:** Feature-branch remediation only. No merge, deploy, Worker/R2, or release-branch changes.

## Blocker A — Doctor-specific procedure mapping

- Reviewed all **110** eligible doctors against official Sahyadri profile description/department/designation text (`/tmp/sahyadri/data/all-three-campuses.json`).
- Mapped procedures with `mapDoctorProcedures(..., fallback=false)` — no specialty-default inheritance.
- **101** verified with ≥1 evidence-backed procedure; **9** retained specialty only with empty procedure mapping.
- Audit: `docs/sahyadri-pune-doctor-procedure-audit.csv`

## Blocker B — Hospital specialty/procedure inflation

- Sahyadri campuses now use faculty-derived specialties and procedures only (`isSahyadriCampus` path in `buildHospital`).
- Post-fixediation campus sizes (approx.): Nagar Road 15 specs / 82 procs; Hadapsar 16 / 89; Deccan 18 / 108 (was 25 / ~400+ each).
- Pune hospital pSEO landings ≈ **159** (was ~570 inflated combinations).
- Evidence matrix: `docs/sahyadri-pune-campus-evidence-matrix.json` and `docs/sahyadri-pune-hospital-campus-audit.csv`

## Blocker C — Incorrect primary specialty

- Forced Radiation Oncology seed/default removed for all three campuses.
- Primary specialty is the **majority faculty specialty** at build time (Nagar Road & Deccan → Orthopedics; Hadapsar → Medical Oncology), documented as faculty-derived evidence rather than an arbitrary fill.
- Empty primary remains supported in schema if faculty were ever empty.

## Blocker D — Images

- **106/110** doctors: verified local assets under `public/doctors/sahyadri/` downloaded from official Sahyadri `featured_images`.
- **4/110** doctors: approved empty fallback (`DoctorPhoto` → `avatar-placeholder.webp`) — source unavailable or unverifiable.
- **3/3** hospitals: approved campus placeholder (`HospitalCampusVisual`) — no reliably attributable campus-specific photo without mismatch risk.
- Audit: `docs/sahyadri-pune-image-audit.csv`
- `buildDoctor` / `buildHospital` now honour seed `image` / `imageAlt`.

## Blocker E — Multi-campus relationships

- Added backward-compatible `hospitalSlugs: string[]` on `Doctor` (always includes primary `hospitalSlug`).
- **23** multi-campus doctors now have structured affiliations; faculty lists are reciprocal via `doctorsForHospital` / `doctorsForHospitalLocale`.
- Doctor profile renders every verified campus card.
- EN affiliations + AR overlay affiliations updated.
- Audit: `docs/sahyadri-pune-multicampus-audit.csv`
- Eligibility unchanged: **110 YES / 81 NO**.

## SEO / GEO / EN+AR

- EN+AR overlays remain published for 110 doctors and 3 hospitals.
- Arabic procedure labels and multi-campus affiliations resynced to remapped evidence.
- Hospital Arabic `focus` deflated to faculty specialties (no full-catalogue string).
- Pune empty-state / noindex behaviour preserved for unsupported facets; populated facets publish.
- Facet-canonical Arabic doctor published baseline updated **1308 → 1382** (inventory-driven).
- No URL structure changes.

## Technical verification

| Check | Result |
| --- | --- |
| Sahyadri + Pune unit tests | Pass |
| Facet canonical / pune-empty-facet-robots | Pass |
| `tsc --noEmit` | Clean |
| `npm run build` | Success (3111 pages) |
| GitHub CI | Not configured for this repo |

## Remaining limitations

- Hospital campus photographs unavailable as verifiably campus-specific assets → approved placeholders.
- 9 doctors have no procedure tags because official profiles lack specific procedure evidence.
- Primary specialty is faculty-majority, not a Sahyadri-published campus “flagship” specialty (none published per campus).
- 12 doctors still carry placeholder experience text when Sahyadri experience was empty (pre-existing warning, unchanged).

## Follow-up verification (three points)

See `docs/sahyadri-pune-verification-points.md`.

- Faculty vs services: public copy/SEO/JSON-LD label faculty-linked relationships; inventing campus service catalogues avoided.
- Primary specialty: `specialty`/`specialtySlug` left empty (faculty-majority not published as official primary).
- ICU: unsupported Multispecialty ICU claim removed; `icu=""` for all three campuses.
