# Phase 1 SEO Recovery — Production Release Checklist

**IMPORTANT:** Do NOT execute any step below without explicit written owner approval after PR review.

## Pre-Release Gate (Before Merge)
- [ ] Owner reviews and approves PRs #57, #58, #59, #60, #61, and the Phase 1 classification PR.
- [ ] Verify none of the PRs touch `content/*`, `public/_gaf/ar-publication-index.json`, `wrangler.*` vars (`GAF_NEGATIVE_CACHE` stays `OFF`), R2 bindings, or DNS.
- [ ] Merge PRs sequentially to `release/stage4-rsc-prod` (recommended order: #57 → #58 → #60 → #61 → #59 → Phase 1 docs/tests) and resolve any trivial metadata extraction overlap cleanly (`costs/metadata.ts` & `page-meta.ts` are touched by #57, #58, #60; `hospitals/metadata.ts` & `page-meta.ts` by #58, #61).
- [ ] Run combined `tsc --noEmit` and full Phase 1 regression suite on merged `release/stage4-rsc-prod`:
  - `src/server-tests/ar-cost-city-specialty-indexability.test.ts`
  - `src/server-tests/hreflang-hygiene.test.ts`
  - `src/server-tests/doctor-profile-graph.test.ts`
  - `src/lib/doctor-discovery.test.ts`
  - `src/server-tests/cost-canonical-parity.test.ts`
  - `src/server-tests/hospital-pagination-robots.test.ts`
  - `src/server-tests/arabic-publication-gate.test.ts`
  - `src/server-tests/sitemap-parity.test.ts`
  - `src/server-tests/pune-empty-facet-robots.test.ts`
  - `src/server-tests/phase1-redirect-classification-guard.test.ts`
  - `legacy-redirects.test.mjs`
- [ ] Confirm production target: Worker `gaf-healthcare-production` (`332293be-d958-4a93-9dfd-9c413423f5d0`), R2 stamp `353d637`, `GAF_NEGATIVE_CACHE` = `OFF`.

## Deploy Sequence (Worker-Only — No R2 Write, No Stamp Update)
- [ ] Build Cloudflare bundle (`opennextjs-cloudflare build`).
- [ ] Deploy **Worker only** to `gaf-healthcare-production` (do NOT run R2 sync or update R2 stamp `353d637`).
- [ ] Confirm `GAF_NEGATIVE_CACHE` remains `OFF`.

## Post-Deploy Verification (Read-Only HTTP Probes)
- [ ] **Issue 1:** `curl -s https://gaf.healthcare/ar/costs/india/mumbai/cardiology` → HTTP `200`, no `noindex`, listed in `sitemap-ar.xml`.
- [ ] **Issue 2:**
  - `https://gaf.healthcare/blogs/breast-cancer-follow-up-tests` → `200`, `noindex, follow`, `0` `hreflang` tags.
  - `https://gaf.healthcare/costs/breast-conserving-surgery-lumpectomy` → `200`, canonical `/costs/india/surgical-oncology/breast-conserving-surgery-lumpectomy`, `0` `hreflang` tags.
- [ ] **Issue 3:** `https://gaf.healthcare/doctors/dr-naresh-trehan` → `200`, heading `"Related Cardiac Surgery treatments"`, indexable `/costs/india/...` link, `/treatments/*` guide links present.
- [ ] **Issue 4:**
  - `https://gaf.healthcare/costs/india/mumbai/surgical-oncology/breast-conserving-surgery-lumpectomy` → `200`, canonical `/costs/india/surgical-oncology/breast-conserving-surgery-lumpectomy`, `0` `hreflang` tags.
  - `https://gaf.healthcare/costs/india/neurosurgery/gamma-knife` → `200`, canonical `/costs/india/radiation-oncology/gamma-knife`, `0` `hreflang` tags.
- [ ] **Issue 5:**
  - `https://gaf.healthcare/hospitals?page=2` & `https://gaf.healthcare/ar/hospitals?page=2` → `200`, `noindex, follow`, `0` `hreflang` tags.
  - `https://gaf.healthcare/hospitals` & `https://gaf.healthcare/ar/hospitals` → `200`, indexable, `hreflang` present.
- [ ] **Issue 6 (GSC Ops Only):** Submit the `54` live-200 URLs in `gsc-validation-list.csv` for **Validate Fix** in Google Search Console.
- [ ] Monitor Worker logs (`wrangler tail`) for 15 minutes for zero `5xx` regressions.
