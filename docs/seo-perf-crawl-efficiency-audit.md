# Phase 2 SEO Recovery — Performance & Crawl Efficiency Audit

**Mode:** Read-only investigation. No production changes, deploys, R2 writes, DNS, or URL/SEO control changes.  
**Production under test:** SHA `374f1bb` · Worker `95e74b01-4a90-4a78-b97a-186f52baa74a` @ 100% · R2 stamp `374f1bb`  
**Measured:** 2026-11-22 (Googlebot + browser UAs)  
**Artifacts:** `/opt/cursor/artifacts/perf-phase2-route-measurements.json`

---

## 1. Performance baseline

| Condition | Typical TTFB (Googlebot) | `x-gaf-html-cache` | Notes |
|---|---|---|---|
| Warm HTML **HIT** | ~96–200 ms | `hit` | Meets &lt;500 ms warm target from monitoring plan |
| HTML **MISS**, isolate already hydrated | ~150–430 ms | `miss` | Dominated by SSR after hydrate already in memory |
| HTML **MISS** / cold-ish / contended | ~3–5.5 s | `miss` | Correlates with Worker `cfWorker` multi-second; often 404/unknown routes |
| Permanent redirect (pacemaker) | ~100–500 ms | n/a | Single-hop 308; follow then HIT/MISS on successor |
| 404 / unpublished | **never** `hit` | always `miss` | By design: only status **200** HTML is stored |

**Googlebot vs browser:** Status codes and cache headers match. Latency deltas are noise / edge variance, not a Googlebot-only code path.

**Cold Worker vs warm Worker (limitation):** Cloudflare does not expose isolate identity. “Cold” is inferred when `cfWorker` ≫ SSR-only miss after the same colo has already served catalog routes (hydrate still in memory). True cold-start requires downloading multi‑MB R2 groups (see §3).

---

## 2. Route-level measurements (summary)

Forced miss = unique `?gaf_perf=<uuid>` (non-tracking; stays in cache key). Warm attempt 2 = second identical URL.

| Route class | Example | Warm HIT | Forced miss (hydrated isolate) | Cross-locale hydrate? |
|---|---|---|---|---|
| Treatment | `/treatments/pacemaker-implantation-in-india` | ~162 ms hit | ~433 ms miss | **en+ar** |
| Treatment | `/treatments/ivf-treatment-in-india` | ~153 ms | ~357 ms | **en+ar** |
| Hospital | `/hospitals/wockhardt-hospital` | ~129 ms | ~308 ms | **en+ar** |
| Doctor | `/doctors/dr-naresh-trehan` | ~118 ms | ~178 ms | **en+ar** |
| Blog | `/blogs/breast-cancer-surgery-in-india` | ~96 ms | ~199 ms | **en+ar** |
| Costs hub | `/costs` | ~121 ms | ~236 ms | **en+ar** |
| Cost article | `/costs/pacemaker-implantation` | hit (variable edge) | ~385 ms | **en+ar** |
| Country hub | `/nigeria/treatment-in-india` | ~146 ms | ~258 ms | **en only** |
| Valid 404 | `/treatments/…-xyz-404` | n/a (uncached) | ~151 ms when warm | **en+ar** then full SSR 404 |
| Unknown hospital 404 | `/hospitals/definitely-not-…` | n/a | ~177 ms warm; **~5500 ms** observed once | **en+ar** |
| Unpublished AR | `/ar/treatments/pacemaker-implantation-in-india` | n/a | ~173 ms warm; **~5044 ms** observed once | **en+ar** |

Intermittent multi-second 404s are **measured**, not theoretical: e.g. unknown hospital Googlebot warm_pair attempt1 `ttfb=5500` `cfWorker=5410`; unpublished AR attempt2 `ttfb=5044` `cfWorker=4706`.

Full row set: `perf-phase2-route-measurements.json`.

---

## 3. Root-cause analysis

### 3.1 Request path on document MISS (`src/worker/runtime.ts`)

1. `readDocumentCache` → `refreshIfStale` + `ensureContentGeneration` + Cache API `match` (miss).
2. Take render slot (`MAX_INFLIGHT_RENDERS = 8`, queue timeout default **2000 ms**).
3. `renderDocument` → `Promise.all(groupsForRequest(pathname).map(ensureHydrated))` then `next()` (OpenNext SSR).
4. Store HTML only if `status === 200` and `Cache-Control` is public (`isCacheableHtmlResponse`).

HTML and RSC use **separate** cache keys / suffixes (`.rsc`, `.rsc-prefetch`). Tracking params stripped from keys. Generation stamp from R2 `.version.json` invalidates all HTML on publish. This design is **correct** and SEO-safe.

### 3.2 Why R2 hydration is expensive

`R2ContentStorage.hydrate(group)` (`src/lib/storage/r2.ts`):

1. Read manifest + version baseline (+ Worker assets once).
2. For each group: fetch layout keys; **list** prefixes; **GET every object** (concurrency 16).
3. Hold packed bytes in isolate memory for the isolate lifetime.

**Measured object sizes (production bucket, 2026-11-22):**

| Key / prefix | Size / count |
|---|---|
| `content/cms.json` | **6.35 MB** |
| `content/catalog-cms.json` | **1.34 MB** |
| `content/curated-treatments.json` | **4.99 MB** |
| `content/ar/catalog-cms.json` | **9.33 MB** |
| `content/ar/articles/` | **73** objects |
| `content/ar/treatments/` | **58** objects |

**Cold hydrate for a catalog route** (`/treatments|doctors|hospitals|costs|blogs/…`):

- `groupsForRequest` → `["en","ar"]` via `CROSS_LOCALE_CATALOG_ROOTS` (hreflang needs live AR catalog).
- EN: ~**12.7 MB** across 3 JSON files.
- AR: ~**9.3 MB** catalog + **131** per-slug JSON GETs after two `list` calls.

That volume explains multi-second cold Worker time. Comments in `groupsForRequest` already document the prior failure mode (eager hydrate of every edition ≈100+ AR reads on English home); country hubs correctly stay **en-only**.

### 3.3 Repeated work

| Mechanism | Assessment |
|---|---|
| Hydrate single-flight (`shareInFlightWork`) | Correct — concurrent misses share one hydrate |
| Per-request `ensureHydrated` after group loaded | Cheap no-op |
| `refreshIfStale` every HIT path | Cheap conditional GET (~1s interval) — acceptable |
| Full Next SSR for every unique MISS URL | Necessary for correct HTML; stampede limited by render gate |
| Full hydrate+SSR for **404** | **Avoidable cost** relative to outcome — 404 never enters HTML cache |

### 3.4 Caching correctness

| Topic | Finding |
|---|---|
| HIT/MISS headers | `x-gaf-html-cache` / `x-gaf-rsc-cache` observed as expected |
| TTL | Cache API stores `max-age=300` while visitors still get proxy `s-maxage=300` |
| Invalidation | Publish → `onContentPublished` → purge isolate-tracked HTML keys; generation in key prevents serving stale across isolates |
| 404 caching | **Intentionally not cached** (`allowsPublicCache` requires status 200) |
| SEO controls | Cache stores rendered body only; does not alter canonical/hreflang/robots generation |

### 3.5 Soft-404 / unknown routes

Unknown treatment/hospital/AR unpublished paths still:

1. Select cross-locale groups when under catalog roots.
2. Hydrate en(+ar) if isolate cold.
3. Run App Router → large HTML 404 (~tens of KB+).
4. **Do not** store the result → next crawler pays again (fast if hydrate warm; slow if cold or queued).

This matches prior deploy probes (~5.8 s soft-404 miss).

---

## 4. Highest-impact bottlenecks (ranked)

1. **Cold / first hydrate of EN+AR catalogs** — multi‑MB R2 + 131 AR object reads on catalog routes.  
2. **Uncached 404 SSR** — crawlers probing obsolete/unknown URLs repeatedly re-enter the miss path.  
3. **SSR cost after hydrate** — ~150–400 ms for commercial pages (secondary once hydrate warm).  
4. **Render-slot contention** (`MAX_INFLIGHT_RENDERS=8`, 2s timeout) — miss storms → 503 or long waits (designed safety).  
5. **Edge/network variance** — occasional high TTFB with low `cfWorker` (not app logic).

---

## 5. Prioritised optimisation recommendations

**None of these are approved for implementation in this audit.**

| ID | Proposal | Est. impact | Risk | Complexity |
|---|---|---|---|---|
| **P0a** | Slim cross-locale hydrate: load a **small AR publication/hreflang index** instead of full `ar` group (catalog + all articles/treatments) on English catalog pages | **High** — remove ~9 MB + 131 GETs from EN commercial miss/cold path | **Medium** — must not break hreflang reciprocity or AR overlays | **High** — new artifact + `groupsForRequest` / storage contract |
| **P0b** | Pack large EN/AR JSON (cms/catalog/curated) like `cost-articles.pack` for fewer R2 round-trips | **High** on cold hydrate | **Medium** — seed/pack pipeline, memory unpack | **Medium–High** |
| **P1** | Short-TTL **negative cache** for deterministic 404/410 HTML (e.g. 60–120s) in Cache API | **High** for crawl junk / soft-404 storms | **Medium** — must not cache soft-success; invalidate on publish; SEO: short TTL only | **Medium** |
| **P2** | Early Worker short-circuit for known-gone patterns already handled as 410 (already cheap) + expand only with evidence | **Medium** | **Low** if limited to existing 410 set | **Low** |
| **P3** | Defer AR per-slug article/treatment prefix fetch until an AR path needs them (catalog-only hydrate for EN hreflang) | **High** subset of P0a | **Medium** | **Medium** |
| **P4** | Profile SSR hot paths (catalog parse, doctor page) after hydrate | **Low–Medium** | **Low** | **Medium** |
| **P5** | Raise observability: log hydrate group timings + object counts per request (sampling) | **Enables** future work | **Low** | **Low** |

**Do not:** weaken publication gates, change public URLs/redirects/canonicals, mass-410, or broaden Cache-Control of authenticated/CMS responses.

---

## 6. Expected improvement and risks (if later approved)

| If implemented | Expected | Risk if wrong |
|---|---|---|
| P0a / P3 | Cold catalog-route TTFB from multi-second → closer to hydrated miss (~0.2–0.5s) | Missing hreflang / wrong AR publication signal |
| P0b | Fewer R2 ops; faster cold hydrate | Pack/seed drift; OOM on unpack |
| P1 | Collapse repeated 404 crawl cost | Serving stale 404 after a legitimate publish (mitigate: short TTL + generation key) |

---

## 7. Proposed implementation plan (approval gate)

1. Owner approves **one** primary lever (recommend **P5 observability** first, then **P3/P0a**).  
2. Feature branch off `release/stage4-rsc-prod` (not this audit PR).  
3. Unit tests for `groupsForRequest` + hydrate layout; Worker runtime tests for negative cache if P1.  
4. Staging/preview Worker only; compare forced-miss TTFB before/after.  
5. Separate production approval — **no** hitchhiking on unrelated SEO releases.

---

## 8. Regression test plan

- Existing: `src/worker/runtime.test.ts` (`groupsForRequest`), storage/r2 tests, sitemap/canonical/AR publication gates.  
- Add when implementing: hydrate group membership fixtures; assert EN home still `["en"]`; assert catalog routes do not pull unused AR prefixes if P3 ships; 404 negative-cache TTL tests if P1 ships.  
- Live probe matrix (Googlebot + browser): HIT, forced miss, known 404, pacemaker redirect, protected 410/308.  
- Confirm no change to canonical/hreflang/robots/sitemap counts for published commercial URLs.

---

## 9. Rollback strategy

- Redeploy previous Worker version + matching R2 content stamp (as with PR #45: keep prior version ID ready).  
- Feature-flag or layout-config switch preferred over irreversible pack format.  
- Do not “fix” performance with SEO status-code changes during rollback.

---

## 10. Decisions requiring owner approval

1. Proceed with **P5** (timing logs) only?  
2. Proceed with **P3/P0a** (slim AR hydrate for EN catalog pages)?  
3. Proceed with **P1** (short-TTL 404 cache)?  
4. Proceed with **P0b** (pack large JSON)?  

**No implementation PR will be opened for runtime changes until one of the above is explicitly approved.** This document is the Phase 2 audit deliverable only.
