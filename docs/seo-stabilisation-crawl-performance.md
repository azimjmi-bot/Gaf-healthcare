# Crawl Performance Findings (PR #45 audit)

**Mode:** Measurement + code review. No performance refactoring in this PR.

## Measured (production `8eabd88`, 2026-11-22)

Probes with Googlebot and browser UAs; headers include `x-gaf-html-cache`, `cf-cache-status`, `server-timing`.

| Condition | Observed TTFB | Evidence |
|---|---|---|
| Commercial HTML **cache HIT** | ~80–200 ms | Pacemaker successor, IVF (2nd hit), Nigeria hub |
| Commercial HTML **cache MISS** | ~200–1,500 ms Worker time | IVF 1st hit ~214 ms; doctor profile miss ~1,538 ms (`cfWorker` ~1,426 ms) |
| Soft-404 / unknown hospital slug **MISS** | ~5.8 s | Wrong Fortis slug; expensive App Router not-found path |
| robots.txt | Variable ~200 ms–1.9 s | Not HTML-cached; Worker still involved |

Googlebot and browser behaviour was **consistent** on status codes and cache headers for the commercial set. Multi-second latency correlates with **HTML cache miss + Worker SSR/hydration**, not a Googlebot-only code path.

## Highest-impact bottlenecks (ranked)

1. **Cold / miss path: R2 content hydrate + SSR** (`src/worker/runtime.ts`) — isolate must hydrate locale content groups before Next renders; documented prior risk of eager multi-locale R2 reads on cold isolates.
2. **HTML document cache miss** — first crawler hit pays full render; subsequent hits are fast (`x-gaf-html-cache: hit`).
3. **Soft-404 App Router cost** — unknown/obsolete paths that are not hard-410 still render a large not-found document (nested pacemaker pre-redirect was in this class).
4. **Render-slot queue** — concurrent miss storms can 503 when slots exhausted (designed safety; can surface as crawl errors under load).

## Theoretical (not measured as current outage)

- Database latency: N/A (catalog/R2, not SQL on request path for these pages).
- External API calls on commercial HTML: not evidenced on probed treatment/doctor pages.
- Googlebot-specific branching: not observed in Worker headers/status vs browser.

## Recommendations (out of scope for PR #45)

1. Prefer hard **410** for approved obsolete patterns (already partially done) to avoid multi-second soft-404 SSR.
2. Keep commercial URLs warm via crawl/CDN hit rate; monitor `x-gaf-html-cache` miss rate.
3. Separate follow-up: profile cold-isolate hydrate cost for EN-only requests (already partially mitigated per runtime comments).
4. Do **not** broaden caching of personalized/CMS responses.
