# PR #51 — Final Negative Cache Safety Audit

**PR:** https://github.com/azimjmi-bot/Gaf-healthcare/pull/51  
**Branch:** `cursor/seo-perf-p1-negative-cache-6064`  
**Audited SHA:** `930dba05887a3bb32c22b98798a83feb03904087`  


**Auditor role:** Independent Cloudflare Workers + technical SEO review  
**Production (unchanged):** release `374f1bb`, Worker `95e74b01-4a90-4a78-b97a-186f52baa74a`, `GAF_NEGATIVE_CACHE` absent from `wrangler.production.jsonc` vars

## Review verdict

**CONDITIONAL PASS — safe to merge for review; keep flag OFF; do not enable in production without a separate enablement approval.**

With the hardening in this follow-up commit (empty query on negative keys; reject `no-cache`; expanded mandatory tests), the design cannot interfere with positive HTML/RSC caching, redirects, 410 matrix, or indexation while disabled. When enabled under review, publication safety relies on (1) short TTL ≤300s, (2) generation in the cache key, (3) isolate purge of remembered keys on publish.

## Defects found and fixes

| # | Finding | Severity | Fix |
|---|---|---|---|
| 1 | Negative keys reused residual query from `normalizedPublicUrl`, allowing crawler query spam to create unbounded `.404` keys | Medium (enable-time) | Force `query=""` for negative keys |
| 2 | `no-cache` Cache-Control was not rejected (positive path rejects it) | Low | Reject `no-cache` in `decideNegativeCache` |
| 3 | Mandatory cases 301/308/429, EN/AR independence, concurrency, SEO header preservation lacked explicit runtime coverage | Test gap | Expanded unit + runtime tests + lab microbench |

No production configuration was changed. Flag remains disabled by default (`isNegativeCacheEnabled` only accepts `1`/`true`/`on`).

## Mandatory safety tests (results)

| # | Requirement | Result |
|---|---|---|
| 1 | Genuine HTML 404 cached when flag enabled | PASS |
| 2 | HTTP 200 never stored under `.404` | PASS |
| 3 | 301, 308, 403, 429, 5xx never treated as cacheable 404 | PASS |
| 4 | Transient upstream failure cannot create negative entry | PASS (503/502 rejected) |
| 5 | Newly published page available without unsafe stale 404 | PASS (generation purge → 200) |
| 6 | Generation changes invalidate/bypass old negatives | PASS |
| 7 | EN and AR entries independent | PASS |
| 8 | Query strings cannot poison / explode keys | PASS (negative query forced empty) |
| 9 | TTL bounded and configurable | PASS (default 120, max 300) |
| 10 | Concurrent requests no inconsistent status | PASS |
| 11 | Cached responses preserve status/headers/canonical/robots markers | PASS |
| 12 | Flag `1`/`true`/`on` only; others disabled | PASS |

Automated: `src/worker/negative-cache.test.ts` + `src/worker/runtime.test.ts` → **57 pass / 0 fail**.

## Cache-key and invalidation

```
key = origin + path + optionalSuffix + query + generation
positive HTML:  path=/x          query=<normalized content query>  status stored 200
negative HTML:  path=/x.404      query="" (forced)                 status stored 404
RSC:            path=/x.rsc      (unchanged)
```

Lookup order when flag on: positive match → else negative match (HTML only, require stored status 404).  
Invalidation: content publish → `onContentPublished` → purge isolate-remembered keys (includes `.404`); new generation cannot match old keys even if an entry lingered elsewhere until TTL.

## TTL and generation safety

- TTL from `GAF_NEGATIVE_CACHE_TTL`, default **120s**, hard clamp **≤300s**.  
- Stored as Cache API `Cache-Control: public, max-age=<ttl>`.  
- Publish path does not wait for TTL: remembered keys deleted; generation advances.  
- Residual risk: another isolate that never recorded the key cannot purge it; **TTL + generation mismatch** still prevent serving a stale 404 for the new generation.

## Before / after performance (lab)

Source: `scripts/bench-negative-cache.mjs` / `/opt/cursor/artifacts/p1-negative-cache-lab-bench.json`  
Synthetic hydrate delay (cold 40ms / warm 8ms). **Not production TTFB.**

| Mode | First 404 MISS | Repeat p50 | Repeat p95 | Renders (1+25) | R2 gets after repeats | rssMB |
|---|---|---|---|---|---|---|
| OFF cold-ish | 62.4 ms | 40.6 ms | 41.1 ms | 26 | 84 | ~80 |
| ON cold-ish | 48.0 ms | 0.09 ms | 0.18 ms | 1 | 34 | ~80 |
| OFF warm | 13.6 ms | 8.5 ms | 8.7 ms | 26 | 84 | ~81 |
| ON warm | 13.9 ms | 0.08 ms | 0.11 ms | 1 | 34 | ~82 |

Production audit baselines remain the authority for absolute ms (`docs/seo-perf-crawl-efficiency-audit.md`). Re-probe after any approved enable.

## SEO / regression checks

| Check | Result |
|---|---|
| PR #45 pacemaker nested→flat 308 | PASS (`legacy-redirects.test.mjs`) |
| Protected 410 / legacy gone matrix | PASS (`src/lib/legacy-urls.test.ts`) |
| Sitemap parity + pacemaker sitemap notes | PASS (`src/server-tests/sitemap-parity.test.ts`) |
| Positive HTML + RSC cache with flag on | PASS (runtime test) |
| PR touches only worker negative-cache paths + docs | Confirmed (no URL/redirect/R2/CMS gate edits) |
| Prod `wrangler.production.jsonc` has no `GAF_NEGATIVE_CACHE` | Confirmed |

## Remaining risks

1. **Cross-isolate stale `.404` until TTL** if publish purge did not see that key (mitigated by generation in key + ≤300s TTL).  
2. **Enablement still unsafe without ops plan** — must set TTL consciously and monitor publish→live latency.  
3. **Lab bench ≠ production** — cold R2/contention numbers need live probes after approval.  
4. Generic not-found body assumed query-invariant (by design for negative keys).

## Permissions compliance

No merge, deploy, `GAF_NEGATIVE_CACHE` enablement, R2 mutation, DNS, or Cloudflare production setting changes performed during this audit.
