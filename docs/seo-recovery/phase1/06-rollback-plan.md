# Phase 1 SEO Recovery — Rollback Plan

- **Baseline Production Commit:** `b5cefe53c375feb5364b3c17198b6e8738329405`
- **Baseline Production Worker:** `332293be-d958-4a93-9dfd-9c413423f5d0`
- **R2 Stamp:** `353d637` (unchanged by Phase 1 — no R2 rollback needed)

---

## Option A — Immediate Full Worker Rollback (Fastest Recovery)

If a critical `5xx`, soft-404, or sitemap regression is detected after deploying Phase 1:

1. Roll back the Cloudflare Worker directly to the prior `b5cefe53` version using Cloudflare Worker Versions (`wrangler rollback` / Cloudflare Dashboard → Workers → `gaf-healthcare-production` → Deployments → Rollback to `b5cefe53` version).
2. Verify baseline probes return HTTP `200` on `/`, `/doctors/dr-naresh-trehan`, `/hospitals`, `/costs`, `/ar/doctors`, `/sitemap-en.xml`, `/sitemap-ar.xml`.
3. Revert the merge commit(s) on `release/stage4-rsc-prod` in Git so repository state matches the active Worker.

---

## Option B — Selective Per-PR Rollback

Each Phase 1 fix is isolated to an independent PR and can be reverted individually without affecting the others:

| PR | Branch | Commit | Isolated Rollback Command | Risk / Side Effect of Revert |
|---|---|---|---|---|
| #57 | `cursor/seo-phase1-ar-cost-noindex-6064` | `8206841` | `git revert <merge-sha-or-8206841>` | Reverts 147 AR city+specialty cost pages back to `noindex, follow` |
| #58 | `cursor/seo-phase1-hreflang-hygiene-6064` | `3f35a1c` | `git revert <merge-sha-or-3f35a1c>` | Restores `hreflang` on `noindex` and flat `/costs/*` alias pages |
| #59 | `cursor/seo-phase1-doctor-profile-graph-6064` | `2c0bfe3` | `git revert <merge-sha-or-2c0bfe3>` | Restores hardcoded radiation heading and omits `/treatments/*` links in `DoctorProfileGraph` |
| #60 | `cursor/seo-phase1-cost-canonical-6064` | `cd35d04` | `git revert <merge-sha-or-cd35d04>` | Reverts unauthored city-cost & secondary-specialty canonical fixes |
| #61 | `cursor/seo-phase1-hospital-pagination-6064` | `2974685` | `git revert <merge-sha-or-2974685>` | Removes `noindex` and `hreflang` stripping on paginated `/hospitals*?page=2+` |
| #6 | `cursor/seo-phase1-404-classification-6064` | *(head)* | `git revert <merge-sha>` | Removes documentation & guard test only (zero runtime impact) |

After any `git revert`, rebuild (`opennextjs-cloudflare build`) and deploy the Worker only (`gaf-healthcare-production`), leaving R2 stamp `353d637` and `GAF_NEGATIVE_CACHE=OFF` untouched.
