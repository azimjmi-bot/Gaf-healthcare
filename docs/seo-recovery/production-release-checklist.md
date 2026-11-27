# GAF Healthcare — Production Release & Phase 1 Deployment Checklist

**Status:** **HOLD — Awaiting Explicit Owner Approval Before Production Deployment**  
**Scope:** Priority Zero — Production Deployment of Merged Phase 1 (`971406370173f080150735703a1d092b5648b75d`)

---

## 1. Exact Build & Environment Targets

| Parameter | Verified Value | Rule |
|---|---|---|
| **Git Branch** | `release/stage4-rsc-prod` | Deploy from exact merged SHA only |
| **Target Build Commit SHA** | `971406370173f080150735703a1d092b5648b75d` (PR `#63`, integration tip `7dd6e579a90b73a42330a8c1ce05d7a820ad67df`) | Verify `git rev-parse HEAD` matches before build |
| **Current Active Production Worker** | `332293be-d958-4a93-9dfd-9c413423f5d0` (`b5cefe53c375feb5364b3c17198b6e8738329405`, `100%` traffic) | Retain ID as instant rollback target |
| **Staging Verification Reference** | `gaf-healthcare-staging-negcache-off` version `4086a80e-288b-4b23-bc56-ccf59ef3a77a` | Verified `147/147` AR cost URLs, `40/40` `410`s, `5/5` `308`s, `81/81` `check:alternates`, `0` 5xx (`/opt/cursor/artifacts/final-staging-verification-7dd6e57.json`) |
| **Production R2 Bucket & Stamp** | `gaf-content-production` — `.version.json` = `{"groups":{"en":"353d637","ar":"353d637"},"updatedAt":"353d637"}` | **DO NOT MODIFY R2** (`419` AR `treatmentOverrides` keys incl. `16` dentistry & `23` IVF already verified in `353d637`) |
| **`GAF_NEGATIVE_CACHE`** | `OFF` | **MUST REMAIN `OFF`** |

---

## 2. Pre-Deployment Gate (Must Pass on Clean Checkout of `9714063`)

- [ ] Explicit written owner approval received to deploy `971406370173f080150735703a1d092b5648b75d` to production.
- [ ] Confirm `git checkout release/stage4-rsc-prod && git rev-parse HEAD` equals `971406370173f080150735703a1d092b5648b75d`.
- [ ] Confirm `wrangler.production.jsonc` keeps `GAF_NEGATIVE_CACHE = "OFF"` and points only to production R2 (`gaf-content-production`) with zero unapproved binding/route/DNS changes.
- [ ] Run TypeScript check:
  ```bash
  ./node_modules/.bin/tsc --noEmit
  ```
- [ ] Run all 12 Phase 1 regression test suites (`54/54` passing):
  ```bash
  NODE_OPTIONS='--conditions react-server' ./node_modules/.bin/tsx --require ./scripts/test/ignore-css.cjs --test \
    src/server-tests/ar-cost-city-specialty-indexability.test.ts \
    src/server-tests/ar-costs-root-metadata.test.ts \
    src/server-tests/hreflang-hygiene.test.ts \
    src/server-tests/doctor-profile-graph.test.ts \
    src/lib/doctor-discovery.test.ts \
    src/server-tests/cost-canonical-parity.test.ts \
    src/server-tests/hospital-pagination-robots.test.ts \
    src/server-tests/arabic-publication-gate.test.ts \
    src/server-tests/sitemap-parity.test.ts \
    src/server-tests/pune-empty-facet-robots.test.ts \
    src/server-tests/phase1-redirect-classification-guard.test.ts \
    legacy-redirects.test.mjs
  ```
- [ ] Verify production R2 stamp is unchanged (`353d637`) and `ar-publication-index.json` parity checks pass.

---

## 3. Worker-Only Production Deployment Sequence

1. Build Cloudflare OpenNext bundle cleanly from `9714063`:
   ```bash
   npm run cf:build
   ```
2. Deploy **Worker code only** using `wrangler.production.jsonc` (**do NOT run any R2 sync or content upload**):
   ```bash
   npx wrangler deploy --config wrangler.production.jsonc
   ```
3. Record the newly created Cloudflare Worker version ID from `wrangler deployments list --config wrangler.production.jsonc`.
4. Immediately warm edge HTML cache on top commercial routes (`/`, `/ar`, `/costs`, `/ar/costs`, `/doctors`, `/hospitals`, top priority country hubs & specialty pillars).

---

## 4. Post-Deployment Verification Probes (`https://gaf.healthcare`)

Verify all checks within 5 minutes of deploy:

- [ ] **Build SHA Check:** Live HTML on `https://gaf.healthcare` reflects `971406370173` (no longer `b5cefe53c375`).
- [ ] **147 AR Cost URLs & Dentistry/IVF:**
  - `https://gaf.healthcare/ar/costs/india/mumbai/cardiology` → `200`, `lang="ar"`, self-canonical, no `noindex`.
  - `https://gaf.healthcare/ar/costs/india/mumbai/dentistry` → `200`, `lang="ar"`, self-canonical, no `noindex` *(succeeds on prod thanks to `353d637` R2)*.
  - `https://gaf.healthcare/ar/costs/india/delhi-ncr/infertility-ivf` → `200`, `lang="ar"`, self-canonical, no `noindex`.
- [ ] **Arabic `/ar/costs` Root Metadata:**
  - `https://gaf.healthcare/ar/costs` → `200`, Arabic `<title>` and `<meta name="description">`, `og:locale="ar_AR"`, `x-default` + `en` + `ar` hreflang.
- [ ] **424 Cost Canonical & Multi-Specialty Mappings (`37`):**
  - `https://gaf.healthcare/costs/breast-conserving-surgery-lumpectomy` → `200`, canonical `https://gaf.healthcare/costs/india/surgical-oncology/breast-conserving-surgery-lumpectomy`, `0` hreflang tags.
  - `https://gaf.healthcare/costs/india/neurosurgery/gamma-knife` → `200`, canonical `https://gaf.healthcare/costs/india/radiation-oncology/gamma-knife`, `0` hreflang tags.
- [ ] **2,602 Doctors & 9,405 Curated Treatment Links:**
  - `https://gaf.healthcare/doctors/dr-naresh-trehan` → `200`, `"Related Cardiac Surgery treatments"` + `/treatments/*` links + indexable `/costs/india/...` link.
- [ ] **Hospital Pagination & Hreflang Hygiene:**
  - `https://gaf.healthcare/hospitals?page=2` and `https://gaf.healthcare/ar/hospitals?page=2` → `200`, `noindex, follow`, `0` hreflang tags.
  - `https://gaf.healthcare/blogs/breast-cancer-follow-up-tests` → `200`, `noindex, follow`, `0` hreflang tags.
- [ ] **410 / 308 / 404 Policies:**
  - `https://gaf.healthcare/doctors/dr-omar-maqbool` → `410`.
  - `https://gaf.healthcare/treatments/cardiology/pacemaker-implantation` → `308` → `/treatments/pacemaker-implantation-in-india` (`200`).
  - `https://gaf.healthcare/treatments/bone-marrow/leukemia-treatment` → `404` (candidate held pending owner sign-off).
- [ ] **Sitemap Parity & Worker Health:**
  - `sitemap-en.xml` (`8,294`), `sitemap-ar.xml` (`4,843`), `sitemap-blogs.xml` (`111`) return `200`.
  - Monitor `wrangler tail --config wrangler.production.jsonc` for 15 minutes: `0` HTTP `5xx` or Worker `1101` exceptions.
- [ ] **GSC Operations (Post-Verify):**
  - Trigger **Validate Fix** in Google Search Console for the `54` live-200 URLs in `gsc-validation-list.csv`.

---

## 5. Rollback Procedure (Zero-Data-Loss, `< 60 Seconds`)

Trigger immediate rollback if any `5xx`/`1101` spike, broken routing, unexpected `noindex` on commercial pages, or sitemap corruption is observed:

```bash
npx wrangler rollback 332293be-d958-4a93-9dfd-9c413423f5d0 --config wrangler.production.jsonc --yes
```

1. Confirm `wrangler deployments list --config wrangler.production.jsonc` shows `332293be-d958-4a93-9dfd-9c413423f5d0` at `100%` traffic.
2. Verify `https://gaf.healthcare` restores `"b":"b5cefe53c375"` and `200 OK` on `/`, `/ar`, `/costs`, `/doctors`, `/hospitals`.
3. Because R2 (`353d637`) and DNS/bindings were untouched, rollback requires zero data restoration.

---

## 6. Post-Phase-1 Release Gate (For Phase 2+ PRs)

Every subsequent PR (`Conversion Fix`, `EN Facet Gating`, `410 Expansion`, `Priority Country Hubs`, `Schema Upgrade`, `Doctor/Hospital Enrichment`) must ship on its own feature branch and satisfy:
1. Automated regression tests added/updated for every URL/metadata/status rule changed.
2. `./node_modules/.bin/tsc --noEmit` + targeted test suite + `npm run cf:build` passing.
3. Staging deployment & HTTP verification before merge to `release/stage4-rsc-prod`.
4. Explicit owner approval before production deploy.
