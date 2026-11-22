# PR #49 — Rebase, Implementation Validation & SEO Regression Report

**PR:** https://github.com/azimjmi-bot/Gaf-healthcare/pull/49  
**Branch:** `cursor/seo-perf-ar-publication-index-6064`  
**Rebased onto:** `353d637` (Merge PR #51 — negative cache)  
**Rebased tip (this report):** `9c6cec6a99e3aa870cbd1075c99246ffee384144`  
**Production baseline (unchanged; no deploy):** release `353d637`, Worker `930f4242-c0a4-4e38-b5f0-3b39c95b5d2c`, R2 stamp `353d637`, apex `GAF_NEGATIVE_CACHE` OFF, canary `5444d386-3cdf-4f8f-85a7-5278325496de`

**Authorisation:** No merge, deploy, production R2 write, DNS, Cloudflare config, or apex flag change.

---

## 1. Rebased PR SHA

- Tip: `9c6cec6a99e3aa870cbd1075c99246ffee384144`
- Validation/hardening: `aeda37c35c39b74573b8191be9976a274d522bd7`
- Feature commit: `11ae27090a2e8cdb2e5d295f2959021e5629cafa`
- Parent: `353d63732a271578d979f5e466476ec02951940f`

---

## 2. Conflict resolution summary

`git rebase 353d637` completed with **zero conflict markers**. The PR #49 patch applied cleanly onto the post–PR #51 tree.

Verification that negative-cache and related controls remain intact:

| Control | Status after rebase |
|---|---|
| `GAF_NEGATIVE_CACHE` / `GAF_NEGATIVE_CACHE_TTL` | Present; store/lookup paths unchanged |
| Generation invalidation on publish | Present (`ensureContentGeneration`, purge on publish) |
| Cache keys (HTML / RSC / `.404`) | Unchanged |
| Publication gates | Unchanged (`localePathIsPublished`, facet gates) |
| Pacemaker nested→flat 308 (PR #45) | Untouched; legacy-redirect tests green |
| Protected 40×410 / 4×308 | Untouched; legacy-urls + negative-cache security tests green |

PR #49 additions are localised to:

- `groupsForRequest` — skip `ar` for EN catalogue when index loaded  
- `ensureArPublicationIndexLoaded` — asset load + corrupt/missing fallback  
- `install()` / `fetch()` — await/fire index load before hydrate  
- Packer + `publishedLocalesForPath` index path  

No negative-cache code was removed or weakened.

---

## 3. Files changed (vs `353d637`)

| Path | Role |
|---|---|
| `scripts/cloudflare/pack-ar-publication-index.ts` | Pack published ∩ self-canonical AR paths |
| `scripts/cloudflare/post-build.mjs` | Emit `/_gaf/ar-publication-index.json` during `cf:build` |
| `src/lib/i18n/ar-publication-index.ts` | In-isolate index + install/clear/lookup |
| `src/lib/i18n/ar-publication-index.test.ts` | Publication / corrupt / missing / groups tests |
| `src/lib/i18n/locale-publication.ts` | `publishedLocalesForPath` uses index for AR when loaded |
| `src/worker/runtime.ts` | Load index; EN catalogue skip AR hydrate |
| `src/worker/runtime.test.ts` | Skip / fallback / lab R2-read assertion; neg-cache suite unchanged |
| `docs/seo-perf-p0a-ar-publication-index.md` | Design notes |
| `docs/seo-perf-pr49-rebase-validation-report.md` | This report |

---

## 4. Test results

| Suite | Result |
|---|---|
| `ar-publication-index.test.ts` | **9/9 pass** (install, hreflang, groups, publish/unpublish, stale unpublished, corrupt, missing, valid load) |
| `runtime.test.ts` | **55/55 pass** (includes EN skip, missing/corrupt fallback, lab AR GET drop, full P1 negative-cache suite) |
| `arabic-publication-gate.test.ts` + `facet-canonical.test.ts` + `sitemap-parity.test.ts` | **pass** (incl. pacemaker sitemap rules) |
| `legacy-urls.test.ts` | **pass** (410 body / protected paths) |
| `legacy-redirects.test.mjs` | **7/7 pass** (incl. pacemaker single 308) |
| `negative-cache.test.ts` + `negative-cache.security.test.ts` | **pass** |

Pack smoke (local, not a production R2 write):

```
[cf:build] ar publication index: 3435 paths, 116577 bytes (~114 KB)
```

Roots (packed): doctors 2603, costs 599, hospitals 99, blogs 74, treatments 59, `/` 1.

---

## 5. Before / after benchmarks

### 5a. Production baseline (audit — **not** a PR #49 deploy measurement)

From `docs/seo-perf-phase2-benchmarks-seo.md` / crawl audit:

| Scenario | Observed / noted |
|---|---|
| Warm HTML HIT | ~96–200 ms |
| Hydrated MISS (warm isolate) | ~150–430 ms |
| Cold / contended | ~3–5.5 s |
| AR catalog alone on EN catalogue hydrate | **~9.33 MB** + **~131** AR object GETs |

These remain the production **before** numbers until an approved deploy of PR #49 is measured live.

### 5b. Lab microbench (FakeR2, synthetic ~256 KB AR catalog stand-in — **not** production TTFB)

| Scenario | p50 ms | p95 ms | mean AR R2 GETs | mean total GETs |
|---|---:|---:|---:|---:|
| EN `/doctors` cold **without** index | 6.177 | 7.173 | **3** | 9 |
| EN `/doctors` cold **with** index | 0.299 | 1.167 | **0** | 6 |
| EN `/hospitals` cold without | 6.132 | 7.033 | 3 | 9 |
| EN `/hospitals` cold with | 0.252 | 0.402 | 0 | 6 |
| AR `/ar/doctors` with index | 6.151 | 6.298 | 3 | 9 |
| AR `/ar/doctors` without index | 6.103 | 6.379 | 3 | 9 |

**Interpretation:** Lab proves the control plane (AR GETs → 0 on EN catalogue when index present; AR routes unchanged). Absolute ms are **not** transferable to production cold R2/contention. Process RSS in lab ~114–118 MB (Node test process; not Worker isolate memory).

### 5c. Expected production R2 reduction (audit-derived — **not measured** on apex)

On applicable **English catalogue cold/miss** requests after an approved deploy with a packed index:

- Avoid ~**9.33 MB** `content/ar/catalog-cms.json` transfer  
- Avoid ~**131** AR per-slug R2 GETs (+ associated list ops)  
- Index asset itself ~**114 KB** (3435 paths) via ASSETS, not R2 content  

Arabic catalogue cold/miss: **no expected R2 reduction** (full AR hydrate retained).

Warm HTML HIT: unchanged (hydrate skipped on HIT).

---

## 6. R2 read reduction

| Traffic | Before (prod behaviour) | After (with valid index) |
|---|---|---|
| EN catalogue cold/miss | EN + AR hydrate | **EN only** |
| EN non-catalogue | EN only | EN only |
| `/ar/...` | EN + AR | EN + AR (unchanged) |
| Missing/corrupt index | EN + AR | EN + AR (safe fallback) |

Lab confirmation: EN `/doctors` AR GETs **3 → 0**. Production magnitude of avoided bytes/gets is the audit figure above, not the lab stand-in size.

---

## 7. Hreflang and publication validation

| Case | Behaviour | Evidence |
|---|---|---|
| Published AR path in index | `publishedLocalesForPath` includes `ar` | unit test |
| Unpublished / not packed | `ar` omitted | unit test |
| Unpublish via next packed index | path removed → no AR hreflang | unit test |
| Packer gates | `localePathIsPublished("ar")` ∧ `canonicalFacetPath === path` | packer source |
| Missing index | full hydrate + live `localePathIsPublished` | runtime test |
| Corrupt index | clear + full hydrate; no partial set | unit + runtime |
| Staleness | deploy-coupled (sitemap class); new AR publish appears after next `cf:build`/deploy | design |
| Cannot indefinitely hide | next deploy refreshes index from live publication gates | packer |

Residual: between AR CMS publish and next Worker deploy, EN pages omit the new AR alternate (**conservative** — does not advertise unpublished).

---

## 8. Regression findings

| Area | Finding |
|---|---|
| Negative cache (PR #51) | All runtime + security tests still green; flag remains OFF on apex |
| Pacemaker 308 | Legacy redirect tests green |
| 410 / protected redirects | legacy-urls green |
| Sitemap parity / AR publication gate / facet-canonical | green |
| SSR integrity | Not re-probed on apex (no deploy); Worker still calls Next after hydrate |
| Cross-isolate | Index is per-isolate ASSETS load; Cache API generation keys unchanged |
| Production surface | No R2/DNS/CF/flag changes performed |

No SEO regressions detected in automated gates.

---

## 9. Rollback plan

1. Do not merge / do not deploy → zero production impact.  
2. If deployed later: redeploy prior Worker version `930f4242-…` (or any pre–#49 version) @ 100%.  
3. Without the asset (or with corrupt asset): runtime falls back to full AR hydrate automatically.  
4. R2 stamp need not change for Worker-only rollback; do not rewrite production R2 for this feature.

---

## 10. Production deployment recommendation

**Do not merge or deploy without separate owner approval.**

When authorised, recommended sequence:

1. Merge rebased PR #49 into `release/stage4-rsc-prod`.  
2. `cf:build` must emit `/_gaf/ar-publication-index.json` (~114 KB / ~3435 paths at current content).  
3. Deploy Worker only; leave apex `GAF_NEGATIVE_CACHE` **OFF**; do not alter canary or production R2 content for this change.  
4. Post-deploy measure (on apex or isolated Worker): EN `/doctors` cold miss R2 reads / TTFB vs audit baseline; AR `/ar/doctors` unchanged; commercial HIT unchanged; spot-check hreflang on a packed path vs an unpublished path.  
5. Keep negative-cache canary observational only.

**Verdict:** Rebase + implementation ready for **owner merge/deploy decision**. Lab and unit evidence support the EN catalogue AR-hydrate skip with safe fallback; production savings remain audit-expected until measured after an approved deploy.
