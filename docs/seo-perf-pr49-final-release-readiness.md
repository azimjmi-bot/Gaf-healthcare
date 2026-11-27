# PR #49 — Final Review & Production Release Readiness

**Status:** Ready for **separate owner merge/deploy approval**.  
**This document does not authorise merge, deploy, R2 writes, DNS, or Cloudflare changes.**

## 1. Exact reviewed SHA

| Item | Value |
|---|---|
| Reviewed / PR head | `b81ad9a4f823ce4fb19f026806f94c6784deff5a` |
| Local / origin match | **Identical** (2026-11-22 verification) |
| Rebase parent | `353d63732a271578d979f5e466476ec02951940f` |
| PR URL | https://github.com/azimjmi-bot/Gaf-healthcare/pull/49 |
| Mergeable | `MERGEABLE` |
| Current apex | release `353d637`, Worker `930f4242-…`, R2 stamp `353d637`, `GAF_NEGATIVE_CACHE` **OFF** |

**SHA gate:** Head matches the reviewed commit. Proceeding with readiness (no stop).

**Merge note:** `release/stage4-rsc-prod` tip is `0f57dd0` (docs + staging-negcache wrangler after `353d637`). Merging #49 will produce a **new merge commit** on release. Build/deploy/stamp from that **merge SHA**, not from `b81ad9a` alone.

---

## 2. CI and review results

| Check | Result |
|---|---|
| GitHub Actions / check-runs on `b81ad9a` | **None configured / none reported** (no `.github/workflows`) |
| Commit status API | `pending`, `total_count: 0` |
| Formal PR reviews | **None** (`reviewDecision` empty) |
| Local verification (this readiness pass) | **PASS** — see §3–§5 |

Owner should treat **local automated gates + this report** as the verification package in lieu of Actions.

---

## 3. Build results (pre-merge / local)

Full `cf:build` was **not** run in this readiness pass (heavy OpenNext). Publication index packer was executed against current content:

```
ar publication index: 3435 paths, 116577 bytes (~114 KB)
indexEqualsGateSet: true (0 missing, 0 extra vs published∩self-canonical)
AR sitemap entries: 4843 (1408 are published but not self-canonical → correctly excluded from hreflang index)
```

Post-approval build gate (required before deploy):

```bash
git checkout <MERGE_SHA>
npm run cf:build
test -s .open-next/assets/_gaf/ar-publication-index.json
# expect ~3435 paths / ~114 KB order-of-magnitude (content-dependent)
jq '.version, (.paths|length)' .open-next/assets/_gaf/ar-publication-index.json
```

Confirm `wrangler.production.jsonc` still has **no** `GAF_NEGATIVE_CACHE` var.

---

## 4. Publication index generation verification

| Scenario | Expected | Verified |
|---|---|---|
| Packer uses same `buildLocaleSitemap("ar")` source as sitemap pack | Compatible content generation at `cf:build` | Yes (shared import) |
| Gates: `localePathIsPublished("ar")` ∧ `canonicalFacetPath === path` | Index ⊆ reciprocal hreflang set | Yes; 3435 = gate set |
| Publication (path in next pack) | Appears in index → EN may advertise AR | Unit tests |
| Unpublication (path dropped on next pack) | Removed → not advertised | Unit tests |
| Republish | Returns on next pack/deploy | Design (sitemap class) |
| Missing index asset | Full AR hydrate + live gates | Runtime + unit |
| Corrupt index | `clearArPublicationIndex` + full hydrate | Runtime + unit |
| Stale generation | Index refreshes only on next Worker deploy (same as packed sitemaps) | Documented residual |
| Cross-isolate | Each isolate loads ASSETS index; Cache API still keyed by content generation | Code review |

**Never silently omit valid AR alternate when index cannot be trusted:** corrupt/missing → fallback to full hydrate and live `localePathIsPublished` / self-canonical checks.

**Residual (accepted):** Between AR CMS publish and next deploy, EN may omit a newly published AR alternate (conservative). Cannot indefinitely hide after a normal content deploy that rebuilds the index.

---

## 5. SEO regression results (final local pass)

| Suite | Result |
|---|---|
| `ar-publication-index.test.ts` + `runtime.test.ts` + neg-cache suites | **75/75 pass** |
| `arabic-publication-gate` + `facet-canonical` + `sitemap-parity` + `legacy-urls` + `legacy-redirects` | **44/44 pass** |
| Pacemaker nested→flat 308 | Pass |
| Protected 410 / 308 | Pass |
| Negative-cache (PR #51) behaviour | Pass; apex flag remains OFF |
| Diff vs `353d637` / release tip | **9 files only** — no wrangler/production vars, no DNS, no unrelated config |

### Final diff (complete file set)

```
docs/seo-perf-p0a-ar-publication-index.md
docs/seo-perf-pr49-rebase-validation-report.md
scripts/cloudflare/pack-ar-publication-index.ts
scripts/cloudflare/post-build.mjs
src/lib/i18n/ar-publication-index.test.ts
src/lib/i18n/ar-publication-index.ts
src/lib/i18n/locale-publication.ts
src/worker/runtime.test.ts
src/worker/runtime.ts
```

(+618 / −5 vs `353d637`)

### Guards re-confirmed in `runtime.ts` at `b81ad9a`

- `GAF_NEGATIVE_CACHE` / TTL, `.404` keys, generation on cache put/match  
- `groupsForRequest` EN skip only when index loaded  
- Pacemaker / 410 / 308 not touched by this diff  

### Production baseline probes (read-only, pre-deploy — **not** post-#49)

Captured 2026-11-22 (approx end-to-end ms; includes network):

| UA | Path | Status | Cache | ~ms | hreflang ar | canonical |
|---|---|---:|---|---:|---|---|
| browser | `/doctors` | 200 | miss | 484 | yes | yes |
| browser | `/hospitals` | 200 | miss | 375 | yes | yes |
| browser | `/treatments` | 200 | miss | 3358 | yes | yes |
| browser | `/ar/doctors` | 200 | miss | 552 | yes | yes |
| browser | `/ar/hospitals` | 200 | miss | 367 | yes | yes |
| browser | pacemaker commercial | 200 | miss | 805 | yes | yes |
| googlebot | same set | 200 | **hit** | ~101–253 | yes | yes |

Artifact: `/opt/cursor/artifacts/pr49-prod-baseline-probes.json`

---

## 6. Production deployment checklist

**Do not execute until separate owner approval.**

Keep **apex `GAF_NEGATIVE_CACHE` OFF** throughout (do not add it to `wrangler.production.jsonc` vars).

1. **Approve & merge** PR #49 into `release/stage4-rsc-prod`.  
2. **Record** `MERGE_SHA=$(git rev-parse origin/release/stage4-rsc-prod)` (full and short).  
3. **Checkout** `MERGE_SHA` on a clean machine/CI.  
4. **Build:** `npm run cf:build`  
5. **Verify index asset:**  
   - `.open-next/assets/_gaf/ar-publication-index.json` exists, `version: 1`, paths length ≫ 0  
   - Spot-check: known published self-canonical path present; known unpublished absent  
6. **Confirm production wrangler vars:** no `GAF_NEGATIVE_CACHE`.  
7. **Deploy Worker** from this build (`wrangler.production.jsonc`). Prefer the existing `npm run cf:deploy:prod` flow **only if** owner also authorises the R2 `.version.json` stamp update in that script.  
8. **R2 stamp:** set `content/.version.json` groups/updatedAt to the **exact deployed short SHA** (matches `cf:deploy:prod`).  
9. **Traffic:** leave production Worker @ **100%** on the new version (or staged versions deploy per owner preference — default script uses 100%).  
10. **Do not** change DNS, routes, canary allocation, or enable negative cache.  
11. **Post-deploy probes** (browser + Googlebot UA):  
    - EN `/doctors`, `/hospitals`, `/treatments` cold miss (bypass / new isolate if possible)  
    - AR `/ar/doctors`, `/ar/hospitals`  
    - Commercial treatment detail + warm HIT  
    - Confirm SSR body non-empty, canonical present, hreflang only for published AR  
    - Pacemaker flat 200; nested path still 308  
12. **Observability:** record R2 read counts / Worker time / memory if P5 or CF analytics available; else TTFB p50/p95 from probe matrix.  
13. **Compare** to baseline table above and audit (~9.33 MB / ~131 AR GETs expected avoided on EN catalogue cold).  
14. **Sign off** or **rollback**.

---

## 7. Rollback procedure

1. Redeploy prior Worker version `930f4242-c0a4-4e38-b5f0-3b39c95b5d2c` @ 100%.  
2. Optionally restore R2 stamp to `353d637` if stamp was advanced.  
3. Without the index asset (or with corrupt asset), runtime already falls back to full AR hydrate — SEO-safe.  
4. Leave `GAF_NEGATIVE_CACHE` OFF.

---

## 8. Expected vs measured performance

### Expected (audit-derived — **not** claimed as post-deploy measured)

On EN catalogue **cold/miss** after successful deploy with packed index:

- Avoid ~**9.33 MB** AR catalog transfer  
- Avoid ~**131** AR object GETs  
- Index cost ~**114 KB** ASSETS (not R2 content)  
- AR catalogue cold: **unchanged** (full hydrate)  
- Warm HTML HIT: **unchanged**

### Measured so far

| Source | What it is | What it is not |
|---|---|---|
| Lab FakeR2 | EN `/doctors` AR GETs 3→0; lab p50 ~6→0.3 ms | **Not** production TTFB / R2 |
| Prod probes above | Pre-#49 baseline | **Not** post-deploy improvement |
| Post-deploy matrix | **TBD after owner-approved deploy** | — |

**Do not present FakeR2 improvements as measured production improvements.**

---

## Verdict

PR head `b81ad9a` is verified, guards intact, index/sitemap gates consistent, SEO/neg-cache suites green. **Awaiting separate owner approval to merge and deploy.** No production changes performed by this readiness work.
