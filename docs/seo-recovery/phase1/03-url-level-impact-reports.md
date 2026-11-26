# Phase 1 SEO Recovery — URL-Level Impact Reports

- **Production Reference:** `b5cefe53c375feb5364b3c17198b6e8738329405`
- **Live Verification Host:** `https://gaf.healthcare` (read-only HTTP checks conducted 2026-11-26)

---

## Summary Impact Table (Issues 1–6)

| Issue | Scope | Impacted URLs / Entities | Live Pre-Fix Behavior (`b5cefe53`) | Expected Post-Deploy Behavior |
|---|---|---:|---|---|
| 1. AR cost city+specialty contradiction | `/ar/costs/india/<city>/<specialty>` in `sitemap-ar.xml` | **147** published AR URLs | `200`, `noindex, follow`, in `sitemap-ar.xml` | `200`, indexable (`robots` omitted), in `sitemap-ar.xml`, reciprocal `hreflang` when EN counterpart is indexable |
| 2. Invalid `hreflang` on `noindex` & non-canonical pages | `noindex` blogs (`1`), `noindex` EN city+specialty cost hubs (`54`), flat `/costs/<slug>` aliases (`419`), post-wrapper `noindex` directories | **474+** EN/AR URLs + reciprocal AR links | `hreflang` (`2–3` tags) & `og:locale:alternate` emitted on `noindex`/canonicalized pages | `alternates.languages: {}` & `openGraph.alternateLocale: []` on all `noindex` & non-canonical pages; `hreflang` omitted toward EN `noindex` pages |
| 3. `DoctorProfileGraph` headings, cost links, treatment links | EN `/doctors/<slug>` (`2,602` total) | **284** `noindex` cost links fixed; **2,063** doctors gain `/treatments/*` links; **all non-radiation** doctors get specialty-accurate headings | Hardcoded `"Related radiation treatments"`; `284` doctors linked to `noindex` cost URLs; `0` `/treatments/*` links in graph | Dynamic `"Related <Specialty> treatments"`; `2,602/2,602` indexable cost links in `sitemap-en.xml`; up to 3 curated `/treatments/*` links per doctor |
| 4. National & city cost canonical inconsistencies | India city×procedure without `cityPage` + multi-specialty national/country aliases | **424** city×procedure URLs + **74** EN/AR secondary-specialty aliases (`36` treatments) + non-primary country aliases | Self-canonical emitted despite absence from `sitemap-en.xml` / `sitemap-ar.xml`, plus `hreflang` on non-canonical aliases | Canonical points to primary `catalogSpecialtyName(treatment)` national URL in `sitemap-en.xml` / `sitemap-ar.xml`; `languages: {}` on aliases; `2,090` authored `cityPage` URLs stay self-canonical |
| 5. Hospital directory pagination indexability | `/hospitals*?page=2+` and `/ar/hospitals*?page=2+` across root, country, city, and specialty directories | **All** paginated hospital listing URLs (`page > 1`) across `49` hospitals | `200` with no `noindex` tag and `3` `hreflang` tags (`?page=2`) | `200` with `robots: { index: false, follow: true }`, `languages: {}`, `alternateLocale: []`; `page === 1` unchanged |
| 6. Valuable 404 classification | `1,000` GSC 404 rows + `142` nested treatments + `1,014` master audit rows | **54** stale GSC 200s; **5** shipped 301/308s + **12** unverified candidates; **40** shipped 410s; **238** unpublished locales; **663+** unverified legacy 404s | Mix of live 200s (54), shipped 308/410s (45), and 404s | **0** unverified redirects/410s added in Phase 1; GSC validation for 54 live 200s; owner evidence gates any Phase 2 action |

---

## Live Representative URL Checks (Read-Only Before Deploy, 2026-11-26)

| Issue | Representative URL | Observed Prod Status | Observed Prod `robots` | Observed Prod `canonical` | Observed Prod `hreflang` |
|---|---|---|---|---|---|
| 1 | `https://gaf.healthcare/ar/costs/india/mumbai/cardiology` | `200` | `noindex, follow` | `.../ar/costs/india/mumbai/cardiology` | `3` |
| 1 | `https://gaf.healthcare/ar/costs/india/chennai/radiation-oncology` | `200` | `noindex, follow` | `.../ar/costs/india/chennai/radiation-oncology` | `3` |
| 2 | `https://gaf.healthcare/blogs/breast-cancer-follow-up-tests` | `200` | `noindex, follow` | `.../blogs/breast-cancer-follow-up-tests` | `3` |
| 2 | `https://gaf.healthcare/costs/breast-conserving-surgery-lumpectomy` | `200` | *(none)* | `.../costs/india/surgical-oncology/breast-conserving-surgery-lumpectomy` | `3` |
| 3 | `https://gaf.healthcare/doctors/dr-naresh-trehan` | `200` | *(none)* | `.../doctors/dr-naresh-trehan` | `3` |
| 4 | `https://gaf.healthcare/costs/india/mumbai/surgical-oncology/breast-conserving-surgery-lumpectomy` | `200` | *(none)* | `.../mumbai/...` *(should be national)* | `2` |
| 4 | `https://gaf.healthcare/costs/india/neurosurgery/gamma-knife` | `200` | *(none)* | `.../neurosurgery/gamma-knife` *(should be `radiation-oncology`)* | `2` |
| 5 | `https://gaf.healthcare/hospitals?page=2` | `200` | *(none)* | `https://gaf.healthcare/hospitals` | `3` |
| 5 | `https://gaf.healthcare/ar/hospitals?page=2` | `200` | *(none)* | `https://gaf.healthcare/ar/hospitals` | `3` |
| 6 (Stale 200) | `https://gaf.healthcare/ar/doctors/dr-amit-pandita` | `200` | *(none)* | `.../ar/doctors/dr-amit-pandita` | `3` |
| 6 (Verified 308) | `https://gaf.healthcare/treatments/cardiology/pacemaker-implantation` | `308` | — | Location: `/treatments/pacemaker-implantation-in-india` | `0` |
| 6 (Batch J/K 410) | `https://gaf.healthcare/doctors/dr-omar-maqbool` | `410` | `noindex` | — | `0` |
| 6 (Unpublished RU) | `https://gaf.healthcare/ru/doctors/dr-prabha-sawant` | `404` | `noindex` | — | `0` |
| 6 (Legacy geo) | `https://gaf.healthcare/ireland` | `404` | `noindex` | — | `0` |
| 6 (Candidate nested) | `https://gaf.healthcare/treatments/neurology/brain-tumor-surgery` | `404` | `noindex` | — | `0` |
