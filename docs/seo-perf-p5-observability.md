# P5 — Sampled Worker Performance Observability

**Branch / PR:** `cursor/seo-perf-p5-observability-6064`  
**Status:** Implementation for review. **Not deployed** without separate approval.

## Root cause addressed

Cold/miss latency diagnosis previously relied on external curl probes. Production lacked structured hydrate vs SSR timings and R2 read counts.

## Technical changes

- `src/worker/perf-telemetry.ts` — route classification, deterministic sampling (default 5%), log formatting, hydrate timing helper.
- `src/worker/runtime.ts` — on sampled document HIT/MISS, emit one log line with bounded labels.
- `src/lib/storage/r2.ts` — `r2ReadCount` increments on object `get` / prefix `list`.

## Log shape (example)

```
perf route=treatment status=200 cache=miss worker_ms=412 hydrate_ms=200 hydrate_en_ms=120 hydrate_ar_ms=80 r2_reads=12 ssr_ms=180 groups=en+ar
```

## Privacy

- No full URLs, query strings, cookies, IPs, or UA strings.
- Path used only for low-cardinality `route=` category and sample hash (path without query).

## Rollback

Revert the PR / redeploy previous Worker. Telemetry is additive logging only.

## SEO impact

None — no URL, cache-key, publication, or redirect behaviour changes.
