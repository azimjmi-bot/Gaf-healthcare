# Indexing and Sitemap Architecture Audit

**Baseline Audited:** Production SHA `b5cefe53c375feb5364b3c17198b6e8738329405` (`https://gaf.healthcare`)  
**Scope:** Section 6 (all 12 questions), canonical/hreflang policy audit, and exact forensic breakdown of the **124-path difference** between `ar-publication-index.json` and `sitemap-en.xml`.

---

## 1. Exact Sitemap Inventory (`b5cefe53`)

Generated via `src/lib/i18n/sitemap-entries.ts` (`buildLocaleSitemap`) and `src/lib/i18n/blog-sitemap.ts` (`buildBlogSitemap`, `buildSitemapIndex`), served from build-time `/_gaf/` Worker assets in `src/worker/runtime.ts`.

| Sitemap File | Total URLs | Unique vs Other Sitemaps | Breakdown by URL Type |
|---|---:|---|
| `/sitemap.xml` & `/sitemap_index.xml` | `3` child sitemaps | Index | Lists `sitemap-en.xml`, `sitemap-ar.xml` (without `<lastmod>`), `sitemap-blogs.xml`. (`sitemap-ru.xml`, `sitemap-fr.xml`, `sitemap-sw.xml` exist as routes returning **`0` URLs** because `isLocaleLive` is false.) |
| `/sitemap-en.xml` | **`8,294`** | `8,293` (overlaps `/blogs` with `sitemap-blogs.xml`) | • Home + core hubs (`/` , `/consult`, `/specialties`, `/doctors`, `/hospitals`, `/costs`, `/treatments`, `/blogs`): `8`<br>• Origin Country Hubs (`/<country>/treatment-in-india`): `37`<br>• Curated Treatments (`/treatments/<slug>`): `94`<br>• Doctor Profiles (`/doctors/<slug>`): `2,602`<br>• Hospital Profiles (`/hospitals/<slug>`): `49`<br>• Hospital Subpages (`/doctors` & `/procedures`): `98` (`49` + `49`)<br>• Doctor Facets (`/doctors/india/...`): `1,434` (depth 1: `1`, depth 2: `31`, depth 3: `475`, depth 4: `927`)<br>• Hospital Facets (`/hospitals/india/...`): `1,335` (depth 1: `1`, depth 2: `31`, depth 3: `455`, depth 4: `848`)<br>• Cost Facets & Cost Sheets (`/costs/...`): `2,637` (depth 1: `1`, depth 2: `31`, depth 3: `515`, depth 4: `2,090`) |
| `/sitemap-ar.xml` | **`4,843`** | `4,843` (`4,696` indexable; **`147` emit `noindex, follow`!**) | • Home + core hubs (`/ar`, `/ar/doctors`, `/ar/hospitals`, `/ar/costs`, `/ar/treatments`, `/ar/blogs`): `6`<br>• Arabic Blogs (`/ar/blogs/<slug>`): `73`<br>• Arabic Curated Treatments (`/ar/treatments/<slug>`): `58`<br>• Doctor Profiles (`/ar/doctors/<slug>`): `2,602`<br>• Hospital Profiles (`/ar/hospitals/<slug>`): `49`<br>• Hospital `/doctors` Subpages: `49`<br>• Doctor Facets (`/ar/doctors/india/...`): `1,301` (depth 1: `1`, depth 2: `31`, depth 3: `456`, depth 4: `813`)<br>• Hospital Facets (`/ar/hospitals/india/...`): `107` (depth 1: `1`, depth 2: `30`, depth 3: `59`, depth 4: `17`)<br>• Cost Facets (`/ar/costs/india/...`): `598` (depth 1: `1`, depth 2: `31`, depth 3: `566` [incl. **`147` `noindex` city+specialty URLs**], depth 4: `0`) |
| `/sitemap-blogs.xml` | **`111`** | `110` blog posts + `/blogs` hub | • `/blogs` hub: `1`<br>• Indexable EN Blog Posts (`/blogs/<slug>`): `110` (`1` published EN blog `/blogs/breast-cancer-follow-up-tests` has `allowIndex: false` and is excluded) |
| **Combined Total** | **`13,248` raw** | **`13,247` unique URLs** | (`13,100` genuinely indexable; `147` broken `noindex` AR cost URLs) |

---

## 2. Direct Answers to Section 6 Questions (1–12)

1. **How many URLs appear in each sitemap?** `sitemap-en.xml`: **`8,294`**; `sitemap-ar.xml`: **`4,843`**; `sitemap-blogs.xml`: **`111`**; `sitemap-ru/fr/sw.xml`: **`0`**; combined unique total: **`13,247`**.
2. **Are sitemap indexes valid?** Technically valid XML (`<sitemapindex>`), served cleanly on both `/sitemap.xml` and `/sitemap_index.xml` (Yoast compatibility). However, `sitemap-ar.xml` omits `<lastmod>` on the index entry (`buildSitemapIndex()` in `src/lib/i18n/blog-sitemap.ts`), and `robots.txt` declares all 5 XML URLs (both indexes + all 3 child sitemaps).
3. **Are all canonical URLs included where appropriate?** No:
   - `211` unpopulated city+procedure EN cost pages (`/costs/india/<city>/<spec>/<proc>` without `city.page`) remain **self-canonical** due to the `costs/directory.tsx` line 64 overwrite bug even though they are excluded from `sitemap-en.xml`.
   - `1,676` non-India country cost combinations (`/costs/<country>/<spec>/<proc>` for Nigeria/Kenya/UAE/Saudi Arabia without `.page`) are excluded from sitemaps yet remain self-canonical/indexable if discovered.
4. **Are redirected URLs excluded?** Yes — `sitemap-entries.ts` builds lowercase canonical paths matching `catalogCanonicalRedirect` and excludes legacy/redirected slugs.
5. **Are `noindex` URLs excluded?** **NO — Critical Failure.**
   - **`147` `/ar/costs/india/<city>/<specialty>` URLs** in `sitemap-ar.xml` emit `<meta name="robots" content="noindex, follow">` on live production (`costs/directory.tsx` line 71 & lines 121–123).
   - EN `sitemap-en.xml` correctly excludes the `99` faculty-only `noindex` hospital facets (`localePathIsPublished` check on line 479), `40` low-threshold EN specialty+city cost facets, and `1` `noindex` blog (`breast-cancer-follow-up-tests`).
6. **Are unpublished URLs excluded?** Yes — draft curated treatments, draft blogs, and `isLocaleLive === false` locales (`ru`, `fr`, `sw`) are excluded.
7. **Are `lastmod` dates meaningful and accurate?** **Partially.**
   - Curated treatments (`treatment.updatedAt`), cost guides (`article.lastUpdated`), specialty profiles (`profile.lastReviewed`), and blogs (`post.updatedAt` / `post.publishedAt`) carry real dates.
   - **Problem:** Home, hubs, `37` country hubs, `2,602` doctors, `49` hospitals, and static facets use **`now` (`new Date()` at build time)** or omit `<lastmod>` (`publishedFacetPaths("ar")` in line 172 omits `lastModified` completely). Setting `lastmod = build_time` on `~2,700` unchanged profiles reduces Google's trust in `<lastmod>` signals.
8. **Are sitemap sizes and URL counts valid?** Yes — each child sitemap is well below the `50,000` URL / `50 MB` uncompressed protocol limit (`max 8,294` URLs), and serving pre-packed `/_gaf/sitemap-*.xml` assets avoids Worker CPU 1102 timeouts.
9. **Are English and Arabic sitemap policies consistent?** **No.**
   - Arabic runs `localePathIsPublished("ar", p)` + `canonicalFacetPath(p, "ar")`, filtering out `3,637` thin/overlapping facets and `118` exact-parent duplicates (`1,434` EN vs `1,301` AR doctor facets; `1,335` EN vs `107` AR hospital facets; `2,637` EN vs `598` AR cost facets).
   - English keeps **`964` exact-parent duplicate hospital facets and `118` exact-parent duplicate doctor facets** inside `sitemap-en.xml`, while excluding `51` EN `/costs/india/<city>/<specialty>` pages that **Arabic keeps** (only for `147` AR city+specialty cost pages to emit `noindex`!).
   - English blogs live in `sitemap-blogs.xml`; Arabic blogs live inside `sitemap-ar.xml`.
10. **Why do 124 Arabic publication-index paths differ from the packed English sitemap?** *(Detailed in Section 3 below.)*
11. **Are blog and cost sitemaps handled correctly?**
   - **Blogs:** EN blogs (`110`) sit in `sitemap-blogs.xml`, AR blogs (`73`) sit inside `sitemap-ar.xml`, cleanly excluding `/blogs/breast-cancer-follow-up-tests` in EN (`noindex`) while including it in AR (`index`). However, emitting `hreflang` on that EN `noindex` blog creates a broken alternate pair.
   - **Costs:** `sitemap-en.xml` includes `2,637` cost URLs (`2,090` templated city-procedure `.page` sheets + `419` national procedure sheets + hubs/city-specialties). `sitemap-ar.xml` includes `598` cost URLs, of which **`147` emit `noindex, follow`** in live HTML.
12. **Are there sitemap URLs that Google cannot crawl successfully?** All `13,247` sitemap URLs return HTTP `200`, **except `147` AR city+specialty cost URLs return `200` with `noindex, follow`**, preventing indexing even though Google crawls them.

---

## 3. Forensic Proof: Why 124 Paths in `ar-publication-index.json` Differ from `sitemap-en.xml`

Per `scripts/cloudflare/pack-ar-publication-index.ts`, `ar-publication-index.json` packs **`3,435` unique English-form paths** extracted from `buildLocaleSitemap("ar")` (stripped of `/ar`, where `localePathIsPublished("ar", p)` and `canonicalFacetPath(p, "ar") === p`). Comparing those `3,435` paths against the `8,294` URLs in `sitemap-en.xml` reveals **3,311 shared paths** and **exactly `124` paths present in `ar-publication-index.json` but absent from `sitemap-en.xml`**:

| Component of the 124-Path Delta | Exact Count | Code Reason (`b5cefe53`) | SEO Consequence |
|---|---:|---|---|
| **1. Arabic Blog Posts (`/blogs/<slug>`)** | **73** | `sitemap-en.xml` intentionally omits `/blogs/<slug>` (`src/lib/i18n/sitemap-entries.ts` line 547: EN blogs live in `sitemap-blogs.xml`), whereas `sitemap-ar.xml` includes AR posts (`72` match `sitemap-blogs.xml`; **`1`** — `/blogs/breast-cancer-follow-up-tests` — is `allowIndex: false` in EN and `allowIndex: true` in AR). | Intentional split for 72 posts; **`1` bug** on `/blogs/breast-cancer-follow-up-tests` (broken `hreflang` reciprocity between EN `noindex` and AR `index`). |
| **2. `/costs/india/<city>/<specialty>` Paths** | **51** | In `sitemap-entries.ts` lines 423–465, EN evaluates `getSpecialtyPage("india", specialty.slug)` + `specialtyPageMeetsQualityThreshold(cityData)` and **excludes** `51` city-specialty combinations that lack a published specialty page or fail the threshold. Meanwhile, `publishedFacetPaths("ar")` passes those `51` paths under AR facet-gating rules, putting them in `sitemap-ar.xml` and `ar-publication-index.json`. | **All `147` `/ar/costs/india/<city>/<specialty>` URLs in `sitemap-ar.xml` (these `51` + `96` shared with EN) fail `costs/directory.tsx` line 71 (`locale === "en"`) and emit `noindex, follow` + `hreflang`!** |
| **Total Delta** | **`124`** | `73 + 51 = 124` | Verified 100% deterministic (`3,435 - 3,311 = 124`). *(Per audit rules, the 124-path publication policy was NOT altered.)* |

---

## 4. Canonical & Hreflang Contradiction Matrix (Live-Verified)

| Route Pattern | Live HTTP / Robots | Canonical | Hreflang Emitted? | Sitemap Status | Severity |
|---|---|---|---|---|---|
| `/ar/costs/india/<city>/<specialty>` (`147` URLs) | `200` / **`noindex, follow`** | Self (`/ar/...`) | **YES (3 tags)** | **In `sitemap-ar.xml`** | **P0** |
| `/costs/india/<city>/<specialty>` (`40` EN low-threshold URLs) | `200` / **`noindex, follow`** | Self | **YES (2 tags)** | Excluded from `sitemap-en.xml` | **P1** |
| `/costs/india/<city>/<spec>/<proc>` (missing `city.page`) | `200` / `index, follow` | **Self (bug: overwrites national canonical)** | **YES** | Excluded from `sitemap-en.xml` | **P1** |
| `/costs/<slug>` (flat legacy sheet) | `200` / `index, follow` | National `/costs/india/...` | **YES (`478 KB` HTML)** | Excluded | **P1** |
| `/hospitals?page=2+` | `200` / **`index, follow` (bug)** | `/hospitals` (page 1) | **YES (3 tags)** | Excluded | **P1** |
| `/doctors/...?page=2+` | `200` / `noindex, follow` | Page 1 | **YES (3 tags)** | Excluded | **P1** |
| `/blogs/breast-cancer-follow-up-tests` (EN) | `200` / `noindex, follow` | Self | **YES (points to AR `index`)** | Excluded from `sitemap-blogs.xml`; **AR in `sitemap-ar.xml`** | **P1** |
| `/doctors/india/...` (`118` EN) & `/hospitals/india/...` (`964` EN) | `200` / `index, follow` | **Self (100% duplicate of parent)** | Conditional | **In `sitemap-en.xml`** | **P1** |
