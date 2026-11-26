# Missing Data & Owner Questions

**Audit Scope:** 26 August – 25 November 2026 (`https://gaf.healthcare`, baseline `b5cefe53`)  
All confirmed code, sitemap, rendering, internal-link, and 28-day sample findings in Deliverables `01`–`07` are strictly factual. The items below represent **missing external evidence** that is **not present in the repository or Cloudflare runtime** and is required from the site owner to complete the remaining forensic checks (especially Sections 3, 9, and 10).

---

## 1. Exact Missing Datasets Required

| Missing Dataset | Why It Matters | How to Export / Provide |
|---|---|---|
| **1. Complete `~2,691` GSC "Not found (404)" URL List** | `Table_8b0f.original.csv` hits Google Search Console's `1,000`-row UI export limit, leaving **`~1,691` 404 URLs** uninspected. Without them, we cannot verify how many more legacy `/treatments/*`, `/resources/blog/*`, or `/doctors/*` URLs deserve 1-to-1 `301` redirects vs `410`. | Export via **Google Search Console API** (`searchanalytics` / URL Inspection batch) OR create temporary GSC URL-prefix sub-properties (`/treatments/`, `/resources/`, `/ar/`, `/ru/`, `/doctors/`) to export under 1,000 rows per prefix. |
| **2. Full 16-Month GSC Performance Export (`Pages.csv` & `Queries.csv`) for Both Date Windows** | Local GSC files cover only **28 days (`2026-10-20` to `2026-11-16`)**. To answer Section 10's exact **26 Aug–25 Nov 2026 vs 26 May–25 Aug 2026** comparison (pages/queries losing impressions, CTR drops, pos 11–30, disappearing pages, declining countries), both 3-month exports are required. | GSC → Performance → Search results → Date filter `2026-08-26`–`2026-11-25` and compare vs `2026-05-26`–`2026-08-25` (or export via GSC API without 1,000-row cap). |
| **3. GSC Page Indexing (`Coverage`) Exports (`Indexed`, `Crawled - currently not indexed`, `Discovered - currently not indexed`, `Duplicate without user-selected canonical`, `Excluded by 'noindex'`, `Page with redirect`)** | Required to separate how many of the `13,247` sitemap URLs (especially the `1,082` EN duplicate facets and `2,090` city cost sheets) are actually indexed vs dropped by Google as "Crawled - currently not indexed". | GSC → Indexing → Pages → export CSVs for each status bucket (and via URL-prefix sub-properties if >1,000 rows). |
| **4. GSC Crawl Stats & August 2026 Origin/Worker Logs** | Required to quantify daily Googlebot crawl volume, response-code split (`200` vs `404` vs `410` vs `5xx`), and verify whether an August 2026 server/crawl incident triggered the decline. | GSC → Settings → Crawl stats (screenshots + CSV exports by response/purpose) + Cloudflare Analytics / Hostinger August 2026 HTTP status logs. |
| **5. `gafhealthcare.in` Legacy GSC Property Data & Redirect Verification** | Needed to verify whether `gafhealthcare.in` still holds indexed pages, manual actions, incomplete Change of Address status, or un-redirected paths before hitting `gaf.healthcare`. | GSC property for `gafhealthcare.in` (Domain + URL-prefix): Indexing status, Change of Address tool status, Performance, and Links export. |
| **6. Complete Backlink & Referring Domain Exports (`gaf.healthcare` + `gafhealthcare.in`)** | Required for Section 9 (broken high-value external links, referring-domain quality/spam check, link concentration on 404s or low-value URLs). Not present anywhere in repo. | • GSC → Links → **External links (`Top linked pages`, `Top linking sites`)** for both `gaf.healthcare` and `gafhealthcare.in`.<br>• **Semrush / Ahrefs Backlink CSVs** (`Backlinks` with Target URL, Source URL, Authority Score/DR, Anchor, HTTP status; plus `Referring Domains`). |
| **7. Semrush / Ahrefs Historical vs Current Organic Keyword CSVs** | Needed to verify exactly which commercial keywords ranked in May–August 2026 vs November 2026 beyond the 28-day GSC snapshot. | Semrush Organic Research → Positions & Position Changes CSV exports (`May–Nov 2026`, `IN`, `US`, `KE`, `NG`, `AE`, `SA` or Worldwide). |
| **8. GA4 Organic Traffic & Consultation Conversion Data (`26 May – 25 Nov 2026`)** | Required to tie SEO recovery KPIs to real patient enquiries (WhatsApp clicks, `/consult` form submissions, phone clicks) by landing page and country. | GA4 → Acquisition / Engagement → Landing Page report filtered to `Organic Search` (`2026-05-26`–`2026-08-25` vs `2026-08-26`–`2026-11-25`). |

---

## 2. Targeted Decisions & Confirmations Needed from the Site Owner

Before moving from this forensic audit into implementation (Phase 1 / Phase 2), please confirm:

1. **Arabic City-Specialty Policy (`RC-01`, `147` URLs):** For `/ar/costs/india/<city>/<specialty>`, should we (A) enable localized Arabic quality-threshold evaluation so qualifying pages become **`index, follow`** inside `sitemap-ar.xml`, OR (B) temporarily exclude all `147` from `sitemap-ar.xml` & `ar-publication-index.json` while keeping them `noindex`? *(Recommendation: Option A for qualifying city-specialty combinations, Option B for thin ones.)*
2. **Enabling `GAF_NEGATIVE_CACHE` on Apex (`RC-03`):** Are we approved to enable `GAF_NEGATIVE_CACHE` (already built and tested in `src/worker/negative-cache.ts`, `TTL 120–300s`) on apex production once Phase 1 redirects/410s are ready, to stop cold `5.2–5.5s` 404 Worker slot contention?
3. **English Programmatic Facet Consolidation (`RC-05`):** Do you approve applying Arabic's proven discipline to English — specifically canonicalizing the **`1,082` exact-parent duplicate EN facets** to their parent URLs and gating `<3`-entity / `>=90%`-overlap EN facets from `sitemap-en.xml`?
4. **Non-India Country Cost Combinations (`1,676` rows without `.page`):** Confirm whether unpopulated `/costs/<country>/<specialty>/<procedure>` routes (Nigeria, Kenya, UAE, Saudi Arabia) should emit `noindex, follow` until country-specific pricing and hospitals are authored.
5. **Named Clinical Reviewers for E-E-A-T (`RC-08`):** Which real, credentialed partner doctors or internal medical directors can serve as named clinical reviewers (with verifiable credentials and profile links) for our **Top 100 commercial URLs** and **`111` blogs**?
6. **Legacy Domain (`gafhealthcare.in`) Redirect Edge & `/ru/` Language History:**
   - Does `gafhealthcare.in` currently 301-redirect wildcard `/*` at Cloudflare/DNS directly to `https://gaf.healthcare/$1`, or were old URLs dropped before migration?
   - Was Russian (`/ru/*`) previously live and indexed on `gafhealthcare.in` or an earlier `gaf.healthcare` release (explaining why `331` `/ru/*` URLs still generate `19.2%` of top-1,000 impressions in `Pages-28d.csv`)? Should permanent non-supported `/ru/*` paths return `410` or remain `noindex` until a future RU launch?
