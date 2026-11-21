# Sahyadri Pune — Three Remaining Verification Points

**Branch:** `cursor/sahyadri-pune-doctors-hospitals-6064`  
**Follows remediation commit:** `476d1ce`

## 1. Faculty expertise vs hospital services

**Finding:** Campus specialties/procedures remain faculty-derived (no separate campus service catalogue was published per Pune site in reviewed Sahyadri sources). Public copy previously risked reading as confirmed campus services (generic “lists …”, “oncology, ENT and GI hospital” title, invented infrastructure tiles).

**Correction:**
- `focus` prefix: `Affiliated faculty specialties: …` (`src/lib/hospitals.ts`)
- EN/AR hero, why-choose, feature bar, infrastructure, FAQs, profile section headings clarify faculty-linked directory relationships (`src/lib/hospital-profile.ts`, `src/lib/i18n/hospital-copy.ts`, `src/components/hospital-profile-view.tsx`)
- SEO title/description and JSON-LD description updated (`src/lib/seo.ts`)
- AR hospital `focus` prefixed with `تخصصات الهيئة الطبية المنتسبة`
- Evidence matrix already sources specialties/procedures from affiliated doctors (`docs/sahyadri-pune-campus-evidence-matrix.json`)

**Not invented:** No campus-specific official specialty/procedure inventory was found beyond faculty OPD affiliations; relationships stay faculty-scoped.

## 2. Primary specialty meaning

**Finding:** Faculty-majority (e.g. Orthopedics / Medical Oncology) is an inferred ranking, not a Sahyadri-published campus primary/flagship designation.

**Correction:**
- Sahyadri `specialty` and `specialtySlug` are left **empty** so the majority calculation is not published as an official primary (`src/lib/hospitals.ts`)
- Directory/pSEO matching continues via `specialties` / `specialtySlugs` (faculty-derived arrays)
- Sorting and filters that use the specialty **array** remain intact; empty primary avoids misleading cards/titles that key off a single specialty

**Schema limitation documented:** The Hospital type still has a single `specialty` string used elsewhere as a campus primary for non-Sahyadri records. Sahyadri uses empty values rather than overloading that field with an unofficial majority label.

## 3. ICU claims

**Sources checked:**
- Sahyadri contact / hospital SPA shells (`https://sahyadrihospital.com/contact-us/`, campus hospital URLs) — no campus ICU body content in returned HTML shells
- Cached API inventory (`/tmp/sahyadri/data/*`) — network-level “Critical Care” specialty exists, but **no campus-specific ICU publication** for Nagar Road, Hadapsar, or Deccan Gymkhana
- Eligible faculty set excludes Critical Care (outside GAF taxonomy)

**Correction:**
- Removed hardcoded `Multispecialty ICU as published by the campus`
- `icu` is now `""` for all three Sahyadri campuses (EN seed build + AR overlays)
- Infrastructure/why-choose no longer assert Advanced ICU; critical-care capacity is explicitly “not verified from campus publication”

## Original blockers A–E

Remain resolved: evidence-mapped doctor procedures, faculty-scoped hospital lists, no forced Radiation Oncology primary, verified images/fallbacks, multi-campus `hospitalSlugs`.
