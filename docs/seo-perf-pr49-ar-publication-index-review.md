# Independent Review — PR #49 Arabic Publication Index (P0a)

**PR:** https://github.com/azimjmi-bot/Gaf-healthcare/pull/49  
**Head SHA reviewed:** `58623fdbddbd1d57b1a925a799d938f8b54035e7`  
**Branch:** `cursor/seo-perf-ar-publication-index-6064`  
**Base when opened:** `374f1bb` (pre–PR #51)  
**Current apex production (do not change):** release/Worker/stamp per `docs/seo-perf-approved-production-state.md` — negative cache still **OFF** on apex  

**This review is read-only.** No merge, deploy, apex flag enablement, Cloudflare config change, or production R2 mutation.

---

## 1. Verdict

**CONDITIONAL APPROVE for a separate merge/rebase cycle** — strong cold-miss leverage on English catalogue (and EN catalogue-root) routes, with SEO safeguards aligned to packed AR sitemaps.

**Blocker before merge into today’s `release/stage4-rsc-prod`:** branch diverges from post–PR #51 tip (`353d637` / docs follow-ups). `src/worker/runtime.ts` was heavily touched by negative-cache work; PR #49 must be **rebased (or regenerated)** onto current release and re-tested. Do **not** merge as-is onto `374f1bb`-era tip.

---

## 2. Root cause (confirmed)

Audit (`docs/seo-perf-crawl-efficiency-audit.md` / PR #47):

| Cost on EN catalogue cold/miss | Magnitude |
|---|---|
| `content/ar/catalog-cms.json` | **~9.33 MB** |
| AR per-slug objects | **~131 GETs** (+ list ops) |
| Why | `groupsForRequest` added `ar` for `CROSS_LOCALE_CATALOG_ROOTS` so hreflang could probe live AR publication |

That EN+AR hydrate dominates multi-second cold Worker time; warm SSR after hydrate is secondary (~150–430 ms).

---

## 3. Technical design (as implemented)

| Piece | Role |
|---|---|
| `pack-ar-publication-index.ts` | At `cf:build`, walks AR sitemap entries; keeps English paths that are `localePathIsPublished("ar")` **and** self-canonical via `canonicalFacetPath` |
| Asset `_gaf/ar-publication-index.json` | `{ version:1, generatedAt, paths[] }` — path set only |
| `ensureArPublicationIndexLoaded` | Loads asset once per isolate (install + await on fetch) |
| `groupsForRequest` | If index loaded + EN locale + catalogue root → **skip `ar` hydrate**; `/ar/...` still `["en","ar"]` |
| `publishedLocalesForPath` | If index loaded → AR membership = `arPathIsIndexedPublished(path)` only |

Fallback: missing/failed index → log + **full AR hydrate** (safe degradation).

---

## 4. Expected R2 / hydration reduction

### Before (EN catalogue cold miss, current production behaviour)

- Hydrate groups: `en` + `ar`  
- AR: ~**9.33 MB** catalog + ~**131** object GETs (+ lists)  
- Observed: cold/contended catalogue / related paths into multi-second `cfWorker` (audit)

### After (index present)

| Traffic | Hydrate groups | Expected AR R2 on that request |
|---|---|---|
| EN `/treatments`, `/doctors`, `/hospitals`, `/costs`, `/blogs` (+ EN slug under those roots) | **`en` only** | **~0** AR edition reads (index is ASSETS, not R2 content) |
| EN home, country hubs, consult, etc. | already `en` only | unchanged |
| `/ar/...` catalogue or detail | `en` + `ar` | **unchanged** full AR hydrate (required for render) |
| Index asset | 1 ASSETS fetch / isolate | Path list only — typically **≪ 1 MB** vs 9.3 MB catalog |

**Order-of-magnitude win (EN catalogue cold):** remove ~**9.3 MB** transfer + ~**131** R2 GETs per cold isolate that only serves EN catalogue traffic; memory pressure from holding AR catalog in-isolate also drops for that traffic shape.

**Not a win for:** pure Arabic rendering paths (still need full `ar`).

### Before / after latency (expected, not a live PR #49 deploy)

| Scenario | Before (audit / prod baseline) | After (expected with index) |
|---|---|---|
| EN catalogue warm HTML HIT | ~96–200 ms | Unchanged (HIT skips hydrate) |
| EN catalogue hydrated MISS | ~150–430 ms | Similar SSR; hydrate already en-only once warm |
| EN catalogue **cold** MISS | multi-second (EN+AR R2) | Closer to **EN-only cold** + SSR (largest relative gain) |
| AR catalogue cold MISS | multi-second AR hydrate | Unchanged |

Live before/after on a canary Worker should re-measure median/p95 TTFB, `r2_reads` (if P5 landed), and hydrate group labels — **not authorised in this review**.

---

## 5. SEO safeguards

| Control | Assessment |
|---|---|
| Public URLs | Unchanged |
| Canonical / x-default | Unchanged (not rewritten by index) |
| Hreflang reciprocity | Index ⊆ published ∩ self-canonical AR paths (same gates as AR sitemap pack) → unpublished AR **not** advertised |
| Sitemap / robots / noindex | Untouched |
| Pacemaker 308 / 410 / 4×308 | Untouched |
| Staleness | **Deploy-time** (same class as packed sitemaps): CMS publish of new AR page does not appear in hreflang until next `cf:build`/deploy |
| Missing index | Falls back to live `localePathIsPublished` + full AR hydrate |

**Residual SEO risk:** Between AR CMS publish and next Worker deploy, EN pages will **omit** the new AR alternate (conservative — does not advertise unpublished). Matches sitemap lag; operators must accept deploy-coupled freshness.

**Correctness risk:** If packer and runtime gates ever diverge, hreflang could drift. Mitigation: packer imports the same `localePathIsPublished` + `canonicalFacetPath` used elsewhere; keep that coupling in review of future refactors.

---

## 6. Tests observed on branch

| Suite | Result |
|---|---|
| `ar-publication-index.test.ts` | **3/3 pass** |
| `runtime.test.ts` (branch) | **40/40 pass** (includes EN skip / AR still hydrates) |

Additional recommended gates before approve-to-merge (on rebased tip): `arabic-publication-gate`, facet-canonical, sitemap-parity, and a packed-index golden size/path-count smoke in CI.

---

## 7. Integration / rebase notes (critical)

Current production release includes PR #51 negative-cache edits to `runtime.ts`. PR #49’s diff is against `374f1bb`.  

**Before any owner merge approval for #49:**

1. Rebase onto `release/stage4-rsc-prod` (post–`353d637`).  
2. Resolve `runtime.ts` conflicts carefully (keep both: negative-cache paths **and** `ensureArPublicationIndexLoaded` / `groupsForRequest` skip).  
3. Re-run worker + i18n publication tests.  
4. Confirm `_gaf/ar-publication-index.json` is produced in `cf:build` and listed as a private asset (not publicly served).

---

## 8. Recommended next steps (not authorised yet)

1. Owner authorises **rebase + CI green** on #49 against current release.  
2. Separate approval for merge.  
3. Separate approval for deploy (flag-off apex behaviour unchanged except EN catalogue hydrate).  
4. Optional: measure EN `/doctors` cold miss R2 reads / TTFB on isolated Worker before apex promote.  
5. Do **not** couple to apex `GAF_NEGATIVE_CACHE` enablement.

---

## 9. Summary

PR #49 is the right lever for the audit’s largest EN catalogue cold cost (~9.3 MB + 131 AR GETs), with hreflang constrained to published self-canonical AR paths and safe fallback without the asset. **Rebase onto post–PR #51 release is mandatory before merge.** No production action from this review.
