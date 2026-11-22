# PR #51 — Controlled Staging Validation Report

## Exact tested SHAs

| Role | SHA |
|---|---|
| Audited tip (verified unchanged at start) | `a33259aca261ed1ac6ddd3d198bed240c0dc0fbc` |
| Hardening (ancestor) | `930dba05887a3bb32c22b98798a83feb03904087` |
| Staging fix (Next `no-store` 404 acceptance) | `7926e5d2313d9371c896699b9c51a34f3c8c8c04` |

Production remained: release `374f1bb`, Worker `95e74b01-4a90-4a78-b97a-186f52baa74a`, `GAF_NEGATIVE_CACHE` **absent**.

## Staging environment

| Item | Value |
|---|---|
| ON Worker | `gaf-healthcare-staging-negcache` |
| ON URL | `https://gaf-healthcare-staging-negcache.gafhealthcare.workers.dev` |
| ON Version (final TTL=120) | `0addb010-8613-4cd0-8b31-03c2071e623d` |
| OFF control Worker | `gaf-healthcare-staging-negcache-off` |
| OFF URL | `https://gaf-healthcare-staging-negcache-off.gafhealthcare.workers.dev` |
| OFF Version | `c15f9854-38d2-4bd9-bdf2-cb20d6a2ca47` |
| Content | `gaf-content-staging` / `gaf-static-staging` |
| Flag ON vars | `GAF_NEGATIVE_CACHE=1`, `GAF_NEGATIVE_CACHE_TTL=120`, `GAF_INDEXING=off` |
| Flag OFF vars | no `GAF_NEGATIVE_CACHE` |

No production deploy, no production R2 writes, no DNS/route changes on `gaf.healthcare`.

## Blocking finding and fix

**Finding:** Real App Router 404 HTML (prod + staging) uses  
`Cache-Control: private, no-cache, no-store` (+ `CDN-Cache-Control: public`).  
The audited policy refused `no-store`/`no-cache`, so **flag ON stored nothing** (all `x-gaf-html-cache: miss`).

**Fix:** For status 404 HTML, accept Next’s `no-store` pattern when the flag is on; keep auth / CMS cookie / `Set-Cookie` / non-404 / non-HTML refusals. Redeployed staging ON Worker and re-validated.

## Test results (post-fix)

| Case | Result |
|---|---|
| First genuine 404 | ON: miss ~0.9–8.7 s (cold); status 404 |
| Repeated 404 | ON: **hit** p50 ~31 ms; OFF: **miss** p50 ~74 ms |
| EN / AR independent | Both locales miss then **hit** when ON |
| Query-string variants | ON: both **hit** (empty negative query) |
| Concurrent unknown URLs | Status 404 consistent |
| Pacemaker nested path | **308** → `/treatments/pacemaker-implantation-in-india` |
| Commercial treatment | **200**, canonical present; positive cache HIT when ON |
| Transient 5xx / 301 / 308 / 403 / 429 as 404 | Unit/runtime policy PASS; staging HTTP confirmed 308 ≠ 404 cache |
| TTL default/max | Config clamp unit-tested; see Cache API note below |
| SEO robots on staging | `x-robots-tag: noindex, nofollow` (staging `GAF_INDEXING=off`) |
| Cross-isolate harness (shared Cache + two workers) | **PASS** EN + AR publish → 200 |
| Staging R2 generation bump | After ~2s: **miss** (old gen bypassed); then re-HIT under new gen while still 404 |
| Staging Cache API expiry @20s / 45s wait | **Still hit** — TTL alone unreliable |

## Cross-isolate / publication

1. **Designed CMS path** (`flushContentWrites` → `onContentPublished` purge + generation): harness proves Isolate A cannot hide a newly published page.  
2. **External `.version.json` put** (ops-style): warm isolate observes new generation within ~2s (`versionCheckIntervalMs` default 1000) and misses old `.404`; delay ≈ 1–2 s, not minutes.  
3. **Visibility of a newly created page** still requires content objects + generation; generation alone only invalidates the negative entry.

## Performance comparison (staging workers.dev — real Worker, not FakeCache)

| Mode | First 404 | Repeat p50 | Repeat p95 | Cache |
|---|---|---|---|---|
| Flag OFF | ~3.7 s | ~74 ms | ~177 ms | miss, miss, … |
| Flag ON | ~8.7 s (cold) / ~0.14 s warm path sample | ~28–31 ms | ~87–146 ms | miss then **hit** |

Renders: OFF re-enters SSR every time; ON renders once per generation then Cache API HIT.  
Memory: not instrumented on CF isolate in this pass (no prod dash scrape). Lab harness only for RSS.

Do **not** treat FakeCache microbench as production TTFB.

## SEO regression

| Check | Result |
|---|---|
| 404 remains HTTP 404 | PASS (ON hit + miss) |
| Published commercial 200 | PASS |
| Pacemaker 308 | PASS (staging HTTP + unit) |
| Protected 410 / legacy matrix | PASS (`legacy-urls.test.ts`) |
| Sitemap parity / unpublished AR | PASS |
| Prod Worker / flag | Unchanged (`95e74b01`, no `GAF_NEGATIVE_CACHE`) |
| Note | Staging/prod 404 body is `__next_error__` (often **no canonical**); negative cache stores SSR verbatim |

## Remaining risks

1. **Workers Cache API short TTL may not expire on schedule** — observed HIT after 45s with `max-age=20`. Treat TTL as soft; rely on **generation + publish purge** for publication safety.  
2. Warm isolate version observation delay ≈ `versionCheckIntervalMs` (1s) after external version writes.  
3. Caching `__next_error__` 404 HTML preserves current lack of canonical on those responses.  
4. Staging workers.dev ≠ production colo load; re-probe after any approved prod enable.

## Recommended production TTL

**120 seconds** (default). Hard max 300. Prefer 120 until Cache API expiry is re-validated in production colo after enablement.

## Production enablement and rollback plan

**Do not enable yet** until owners accept: (a) no-store acceptance fix merged, (b) Cache API TTL soft-expiry risk, (c) live prod re-probe plan.

If approved later:

1. Merge PR #51 (separate approval).  
2. Deploy Worker **with flag still unset** first (code present, behaviour identical to today).  
3. Enable `GAF_NEGATIVE_CACHE=1` + `GAF_NEGATIVE_CACHE_TTL=120` on production vars only after canary.  
4. Rollback: unset `GAF_NEGATIVE_CACHE` (immediate behavioural off) or redeploy prior Worker version `95e74b01`. Short-lived `.404` entries become unreachable after generation rotation.

## Artifacts

- `/opt/cursor/artifacts/p1-staging-validation-on.json`
- `/opt/cursor/artifacts/p1-staging-validation-off.json`
- `/opt/cursor/artifacts/p1-staging-generation-ttl.json`
- `/opt/cursor/artifacts/p1-cross-isolate-harness.log`
