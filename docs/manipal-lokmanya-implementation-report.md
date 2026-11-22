# Manipal Baner (full) + Lokmanya Pune — Implementation Report

**Branch:** `cursor/manipal-lokmanya-pune-doctors-hospitals-6064`  
**Baseline:** `2b49d2cfcef57427c3ade02852cb7efe27d25473`  
**PR:** https://github.com/azimjmi-bot/Gaf-healthcare/pull/42  
**HEAD:** `f8aa9fa27961b4d7ab1f3643d05d0e4d995c5afb`  
**Restriction:** PR only — no merge, R2 upload, version stamp, or Worker deploy.

## Reconciliation (why 100 eligible → 85 additions + 8 updates)

| Source | Discovered | Eligible | Already present | Added (new) | Updated (multi-campus merge) | Excluded |
|--------|------------|----------|-----------------|-------------|------------------------------|----------|
| Manipal Baner | 91 | 61 | 7 (page-3) | 49 | 5 | 30 |
| Lokmanya Pune | 67 | 39 | 0 | 36 | 3 | 28 |
| **Total** | **158** | **100** | **7** | **85** | **8** | **58** |

**Equation:** `100 eligible = 7 already present + 85 new + 8 updates`.

- The 7 Manipal Baner page-3 doctors were already in catalogue from PR #40 and were not re-inserted.
- The 8 updates append Baner/Lokmanya campus slugs onto existing Sahyadri-primary records (`hospitalSlugs`) without duplicating people.
- Exclusions are non-GAF specialties / unmapped departments only (see eligibility CSV).

Hospital campuses added: `lokmanya-hospital-sb-road`, `lokmanya-hospital-nigdi`, `lokmanya-hospital-chinchwad` (Manipal Baner already present).

## Final data-quality audit (pre-approval)

### 1. Counts — pass

Reconciled against live `ginger-catalog.json` + `docs/manipal-lokmanya-eligibility.csv` + `docs/manipal-lokmanya-import-report.json`.

### 2. Specialties — pass

All 100 affiliated doctors map to an existing GAF `SPECIALTIES` name (runtime `getSpecialty` / taxonomy dump; 0 unknown).

### 3. Procedures — pass (0 removals required)

Live associations re-audited against Manipal official profile verified lists and Lokmanya profile text:

| mapping_status | count |
|----------------|-------|
| verified | 261 |
| no_specific_procedure_evidence (empty by design) | 31 |
| removed_insufficient_individual_evidence | 0 |

No unsupported doctor–procedure associations remained in catalogue; nothing stripped in this audit pass.

### 4. Lokmanya campuses — pass

All three campuses re-verified against https://lokmanyahospitals.com/our-branch (live HTTP 200) and research record `lokmanya-hospitals.json`:

| GAF slug | Official name | Address (official) | verified |
|----------|---------------|--------------------|----------|
| `lokmanya-hospital-sb-road` | Lokmanya Hospital - S B Road, Pune | 402/A Gokhale Nagar Road, Vetal Baba Chowk, off Senapati Bapat, Pune 411016 | yes |
| `lokmanya-hospital-nigdi` | Lokmanya Hospital - Nigdi, Pune | Sector 27, Tilak Rd, Sector No. 24, Pradhikaran, Nigdi, Pune 411044 | yes |
| `lokmanya-hospital-chinchwad` | Lokmanya Hospital - Chinchwad, Pune | 314/B, Chinchwad Gaon Rd, Udyog Nagar, Chinchwad, Pune 411033 | yes |

Live catalogue names match official names exactly. See `docs/manipal-lokmanya-campus-verification.csv`.

### 5. EN + AR completeness / canonical / hreflang — pass

- 100/100 doctors: EN bio ≥160 chars, published AR overlay with Arabic name+bio, `GAF Healthcare` brand line, Pune city, hospital href.
- 4/4 hospitals: published EN+AR overlays, Arabic names in `hospital-names-ar.json`.
- Doctor hreflang reciprocity: 0 failures across 100 profiles (both locales published + self-canonical → `en`+`ar` in `publishedLocalesForPath` / Arabic document meta).
- Hospital profile hreflang: all four campuses publish EN+AR with reciprocal locales.

### 6. Portraits — pass (81 + 12 batch; page-3 separate)

| Cohort | verified portraits | avatar fallbacks |
|--------|--------------------|------------------|
| This-batch (85 new + 8 merges = 93) | **81** | **12** |
| Page-3 already present (7) | 6 | 1 (`dr-borde-mandar-deepak`) |
| On-disk under `public/doctors/manipal-baner` + `lokmanya` | **87** (= 81 batch + 6 page-3) | — |

- All 81 batch verified files open as valid images; filename ↔ doctor slug/name match OK.
- 8 multi-campus merges retain the live Sahyadri portrait; Manipal/Lokmanya downloads remain on disk and are noted in the image audit.
- See `docs/manipal-lokmanya-image-audit.csv`.

### 7. Faculty noindex / sitemap — pass (with documented parity notes)

- City-level faculty-only hospital specialty facets (e.g. `/hospitals/India/Pune/Medical-Oncology`) are **noindex** in EN and AR.
- `hospitalSpecialtySitemapPaths` emits **0** specialty landing paths for Manipal Baner / Lokmanya campuses.
- Campus profile + `/doctors` pages publish and appear in sitemaps (intended).
- EN `/hospitals/{slug}/procedures` profile subpages appear in the EN sitemap for these campuses — **same pattern as Sahyadri**; not specialty landings. AR `/procedures` remains missing (404), same as Sahyadri.

### 8. Duplicates / Sahyadri / Manipal — pass

- 0 duplicate doctor slugs; 0 duplicate hospital slugs.
- Near-name scan among the 100 affiliated doctors: no ≥0.88 collisions.
- Sahyadri Pune primary affiliations remain **110**; Sahyadri campuses remain **3**.
- 5 Sahyadri↔Manipal and 3 Sahyadri↔Lokmanya multi-campus merges documented in `docs/manipal-lokmanya-multicampus-audit.csv`.

### 9. Tests / tsc / build

| Check | Result |
|-------|--------|
| `tsc --noEmit` | pass |
| Focused Manipal/Lokmanya/Sahyadri/Pune/publication/facet suite (61) | **61/61 pass** |
| `npm run test:unit` | **561 pass**; **3 pre-existing fails** (see below) |
| `npm run test:storage` | **8/8 pass** |
| `npm run test:specialty-engine` | largely pre-existing fails (EN blog posts intentionally live only in `sitemap-blogs.xml`, so ~75 blog tests that assert `buildLocaleSitemap("en")` still contain `/blogs/{slug}` fail on baseline too; plus unrelated glossary/overlay/hub pins) |
| `npm run build` (production webpack) | pass |

**PR-introduced fixes applied during this audit**

1. Cleared 30 AR `proceduresExpertise` rows that incorrectly stored specialty labels when EN expertise was empty (including 8 Sahyadri rows that broke `sahyadri-pune-import` alignment).
2. Hardened `scripts/generate-ar-manipal-lokmanya-overlays.ts` so empty EN procedures stay empty in AR.
3. Rebased `scripts/cloudflare/seed-r2.test.mjs` static upload pin **719 → 839** for the new doctor portraits.
4. Stubbed `server-only` in `scripts/test/ignore-css.cjs` so SEO helpers load under `npm run test:unit`.

**Pre-existing failures (not introduced by this PR)**

1. `radiation-oncology.test.ts` / `specialty-engine.test.ts` — India city list includes `pune` but radiation/surgical oncology city editorials still omit it.
2. `arabic-place-quality.test.ts` — `dr-abhilash-bhaskaran` comma-repeats `تشيناي` on baseline CMS as well.
3. Blog suite assertions against `buildLocaleSitemap("en")` for article URLs — English articles are deliberately only in `sitemap-blogs.xml` since earlier sitemap work.

## Inventory after import

- Doctors: 2602 EN / 2602 AR overlays
- Hospitals: 49 EN / 49 AR overlays
- Pune doctors: 202; Pune hospitals: 7
- Manipal Baner faculty: 61
- Lokmanya faculty (any campus): 39

## Evidence & audit artefacts

- `docs/manipal-lokmanya-eligibility.csv`
- `docs/manipal-lokmanya-doctor-procedure-audit.csv`
- `docs/manipal-lokmanya-image-audit.csv`
- `docs/manipal-lokmanya-multicampus-audit.csv`
- `docs/manipal-lokmanya-campus-verification.csv`
- `docs/manipal-lokmanya-import-report.json`

## Outstanding limitations

1. Lokmanya procedure associations rely on distinctive tokens in official profile text; doctors without such evidence keep empty `proceduresExpertise`.
2. Multi-campus merges keep Sahyadri as primary hospital + portrait; Baner/Lokmanya appear via `hospitalSlugs` only.
3. EN faculty campus `/procedures` subpages stay in the sitemap (Sahyadri parity); city-level specialty landings stay noindex.
4. No production R2 upload, Worker deploy, or `.version.json` stamp is authorised for this PR.

## Specialty eligibility (exclusions)

Only GAF taxonomy specialties. Exclusions include Internal Medicine, Pediatrics, Radiology, Critical Care, Psychiatry, Dietetics, Physiotherapy, Psychiatryiatry, Endocrinology, Rheumatology, Vascular Surgery, Palliative/Integrative Oncology, and unmapped departments.
