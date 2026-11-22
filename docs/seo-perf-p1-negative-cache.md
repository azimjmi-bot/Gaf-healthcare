# P1 — Short-TTL Negative Cache for Genuine HTML 404s

**Branch / PR:** `cursor/seo-perf-p1-negative-cache-6064`  
**Status:** Implementation for review. **Flag default OFF. Do not deploy or enable in production without separate approval.**

## Root cause addressed

Genuine HTML 404 responses never entered the Worker HTML Cache API (`allowsPublicCache` requires status 200). Crawl probes of obsolete/unknown URLs therefore repeatedly paid full EN+AR hydrate + SSR cost (measured cold/contended 404s ~3–5.5 s).

## Technical changes

- `src/worker/negative-cache.ts` — policy: enable flag, TTL parse/clamp (default 120 s, max 300 s), decide whether a response may be stored as a negative entry.
- `src/worker/runtime.ts` — when `GAF_NEGATIVE_CACHE` is `1`/`true`/`on` and the decision allows it:
  - store complete HTML 404 bodies on a **separate** cache key (`path` + `.404` suffix) with short `max-age`;
  - **force empty query** on negative keys (path + generation only) so crawler query spam cannot explode cardinality;
  - preserve status **404** on the stored response;
  - look up the negative key only when the flag is enabled and the positive key misses.
- Generation remains part of the cache key; `onContentPublished` still purges remembered keys (including negatives stored by this isolate).

## What is never cached

| Case | Behaviour |
|---|---|
| Flag unset / off | Identical to today — 404 always miss |
| Status ≠ 404 (incl. 200, 301, 308, 403, 429, 5xx) | Not stored |
| Status 5xx / 503 | Not stored (`5xx` / `upstream-busy`) |
| 401 / 403 | Not stored (`auth-status`) |
| `Authorization` or `gaf_cms` cookie | Not stored (`authenticated`) |
| `Set-Cookie` on response | Not stored |
| Non-HTML body | Not stored |
| `private` / `no-store` / `no-cache` Cache-Control | Not stored |
| RSC / prefetch variants | Negative path is HTML-only |

## Env knobs (Worker)

| Variable | Default | Meaning |
|---|---|---|
| `GAF_NEGATIVE_CACHE` | unset (off) | Opt-in enable |
| `GAF_NEGATIVE_CACHE_TTL` | `120` | Seconds, clamped to ≤300 |

## Newly published content

1. **Short TTL** — Cache API expires the entry; next request re-renders.  
2. **Generation change** — publish bumps generation and purges isolate-tracked keys; the next request cannot hit a stale `.404` for the old generation.  
3. Positive 200 entries use a different key, so a successful publish never shares storage with a prior 404 body.

## SEO impact assessment

| Control | Effect |
|---|---|
| Public URLs | Unchanged |
| 404 status | Preserved on store and hit |
| Canonical / robots on 404 HTML | Same SSR body as today (cached verbatim) |
| Locale publication gates | Still evaluated on miss/SSR; cache only stores the rendered outcome |
| Pacemaker 308 / protected 410 / 4×308 | Untouched (not routed through this 404 store path as redesign) |
| Soft-success / empty HTML | Still rejected by `isCompleteHtmlDocument` |

## Memory / Worker execution impact

- HIT path for repeated unknown URLs avoids hydrate + SSR (largest saving on crawl junk).  
- Extra Cache API `match` only when flag is on and positive key misses.  
- Stored bodies are normal not-found HTML size; short TTL limits retention.

## Before / after benchmarks (lab / representative)

| Scenario | Before (prod baseline audit) | After (flag on, expected) |
|---|---|---|
| Warm HTML HIT (commercial 200) | ~96–200 ms | Unchanged (separate keys; flag does not alter 200 path) |
| Genuine 404, first miss | hydrate + SSR (warm ~150–430 ms; cold/contended ~3–5.5 s) | Same on first miss |
| Genuine 404, repeat within TTL | full miss path again | Cache HIT; no hydrate/SSR |
| URL 404 then published | next request always miss | miss after purge/TTL; then 200 store |

Production numbers must be re-probed after an **approved** enable; this PR ships flag-off.

## Rollback

1. Leave `GAF_NEGATIVE_CACHE` unset (no code change), or  
2. Redeploy prior Worker revision without this change.  
Cached `.404` entries expire via short TTL / generation rotation.

## Tests

- `src/worker/negative-cache.test.ts` — enable/TTL/decision matrix (incl. 301/308/429/5xx/`no-cache`).  
- `src/worker/runtime.test.ts` — default off; enable HIT; reject non-404; 200 never on `.404`; EN/AR independence; query collapse; header/body SEO markers; concurrency; publish invalidation; simulated TTL expiry; positive HTML/RSC unchanged; lab microbench.
