# Phase 2 — Benchmarks & SEO Regression Notes (P5 / P0a / P0b / P1)

**Production baseline (unchanged):** release `374f1bb`, Worker `95e74b01` @ 100%, R2 stamp `374f1bb`.  
**Source audit:** `docs/seo-perf-crawl-efficiency-audit.md` (PR #47).

This document records **lab expectations and SEO guards**. Live production re-probes require an approved deploy of each feature PR; no Worker/R2/DNS changes are made by these PRs alone.

## Baseline (production probes from audit)

| Scenario | Median / observed | Notes |
|---|---|---|
| Warm HTML HIT | ~96–200 ms | Healthy — do not trade for reliability |
| Hydrated MISS | ~150–430 ms | Isolate warm |
| Cold / contended (esp. 404) | ~3–5.5 s | Primary crawl-cost target |
| EN content weight | ~12.7 MB | Full EN hydrate |
| AR catalog alone | ~9.33 MB | Pulled for EN catalogue hreflang today |

## Expected impact by PR (flag/deploy gated)

| PR | Change | Warm 200 HIT | EN catalogue MISS | AR catalogue MISS | Genuine 404 repeat | Risk |
|---|---|---|---|---|---|---|
| #48 P5 telemetry | Sampled logs only | Unchanged | Unchanged (+tiny log) | Unchanged | Unchanged | Log volume |
| #49 P0a AR index | Skip AR hydrate on EN catalogue when index present | Unchanged | **Lower** R2 reads / hydrate_ms | Unchanged (still full AR) | May still hydrate for 404 detail routes | Stale index until next content deploy |
| #50 P0b packing design | Docs only | n/a | n/a | n/a | n/a | None |
| P1 negative cache | Flag **off** by default | Unchanged | Unchanged | Unchanged | **Lower** when flag on | Stale 404 until TTL/generation |

## Re-probe matrix (after each approved enable)

Measure median and p95 for TTFB / `cfWorker`, plus R2 reads and sampled `perf` logs where available:

1. Warm cache HIT — commercial treatment detail  
2. Warm isolate MISS — same URL after cache bypass  
3. Cold Worker MISS — new isolate if available  
4. EN catalogues: `/treatments`, `/doctors`, `/hospitals`, `/costs`, `/blogs`  
5. AR catalogues: `/ar/treatments`, …  
6. Genuine 404 — unknown treatment/hospital  
7. Previously missing URL after publish (negative-cache enable only)

Error rate must remain flat (no new 5xx from cache policy).

## SEO regression checklist (must hold)

- [ ] Public URL paths unchanged  
- [ ] Canonical tags unchanged on commercial samples  
- [ ] Hreflang reciprocal; no unpublished AR links  
- [ ] Sitemap parity scripts green  
- [ ] Robots / noindex behaviour unchanged  
- [ ] Protected 40×410 and 4×308 decisions unchanged  
- [ ] PR #45 pacemaker nested→flat 308 unchanged  
- [ ] SSR HTML remains substantial (no empty shells)  
- [ ] No cache poisoning across generations / auth cookies  

## Production permissions

No merge, Worker deploy, R2 object rewrite, DNS, or Cloudflare setting change without **separate explicit approval**.
