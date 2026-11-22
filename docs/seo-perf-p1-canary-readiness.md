# PR #51 — Final Security & Production Canary Readiness

**Reviewed tip SHA:** `f934d792397e75b851ecb4c1d2fda74865124c63` (+ follow-up security tests / HIT defence-in-depth on this branch)  
**Fix commit (no-store exception):** `7926e5d2313d9371c896699b9c51a34f3c8c8c04`  
**Staging Worker (reference):** `0addb010-8613-4cd0-8b31-03c2071e623d`  
**Production (unchanged):** release `374f1bb`, Worker `95e74b01-4a90-4a78-b97a-186f52baa74a`, `GAF_NEGATIVE_CACHE` **OFF**

This review does **not** merge, deploy, enable the production flag, mutate production R2, or change Cloudflare production configuration.

---

## 1. Exact PR SHA reviewed

| Ref | SHA |
|---|---|
| Tip at review start | `f934d792397e75b851ecb4c1d2fda74865124c63` |
| no-store fix | `7926e5d2313d9371c896699b9c51a34f3c8c8c04` |
| Hardening (query empty / earlier) | `930dba05887a3bb32c22b98798a83feb03904087` |

---

## 2. No-store exception — security verdict

**Verdict: NARROW AND ACCEPTABLE for a controlled canary**, with publication safety resting on generation + purge (not Cache-Control).

### What the exception does

`decideNegativeCache` allows caching **only** when:

1. Flag enabled (`1` / `true` / `on`)
2. `status === 404` (strict)
3. `Content-Type` contains `text/html` (case-normalized)
4. No `Authorization`, no `gaf_cms` cookie, no response `Set-Cookie`

For that 404 HTML path, Next’s `Cache-Control: private, no-store` (and combinations) are **not** used as a refusal signal — because production 404s always carry them and refusing would make the feature inert.

### What remains refused

| Input | Outcome |
|---|---|
| 200 / 301 / 302 / 308 / 410 | not cached |
| 401 / 403 | `auth-status` |
| 429 | `status-429` |
| 5xx / 503 | `5xx` / `upstream-busy` |
| Non-HTML | `non-html` |
| Auth / CMS cookie / Set-Cookie | refused |
| Flag off | identical to today |

Header **names** are read via the Fetch `Headers` API (case-insensitive). `Content-Type` values are lower-cased before the HTML check. Cache-Control directive casing does not expand the exception beyond status 404 HTML.

### Runtime wiring

- Store only on HTML variant, separate `.404` key, `storeStatus: 404`, empty query.
- Replay only when stored status is 404 **and** stored `Content-Type` includes `text/html`.
- Positive 200 path unchanged (`allowsPublicCache` still requires status 200 + public).

---

## 3. Cached response equivalence

Miss vs HIT comparison (automated):

| Field | Result |
|---|---|
| HTTP status | 404 = 404 |
| Content-Type | identical |
| Cache-Control (client) | original Next `private, no-store…` restored via `x-gaf-stored-cache-control` |
| CDN-Cache-Control | identical |
| X-Robots-Tag | identical |
| Body / length | byte-identical |
| Canonical / robots in HTML | preserved verbatim |
| Set-Cookie on HIT | absent |

**Indexation outcome:** HIT does not invent a stronger indexing posture than the miss. Staging/prod 404 bodies are often `__next_error__` (weak/absent canonical) — caching does not improve or worsen that SSR defect.

Storage layer uses `Cache-Control: public, max-age=<ttl>` **only on the Cache API object**; clients still see the original no-store after `presentCachedDocument`.

---

## 4. Generation & publication safety

Correctness **must not** depend on Cache API TTL.

| Scenario | Result |
|---|---|
| Same-isolate publish after 404 | purge + new generation → 200 miss |
| Same-isolate unpublish / republish | status tracks live state; no stale 200 after unpublish |
| Cross-isolate EN publish | Isolate A cannot HIT old `.404` after B publishes |
| Cross-isolate AR publish | independent path; recovers to 200 |
| Cross-isolate unpublish | Isolate A serves fresh 404 miss after generation bump |
| Stale negative under old generation | key mismatch → unreachable |

### Observed propagation window

- Default `versionCheckIntervalMs` = **1000 ms**.
- Staging external `.version.json` bump: warm isolate missed old `.404` within **~1–2 s**.
- **Acceptable** for CMS publication visibility if operators accept ≤2 s edge delay; not acceptable as a substitute for purge on the publishing isolate (CMS path already calls `onContentPublished`).

---

## 5. Cache API TTL investigation

| Observation | Staging: nominal `max-age=20` still **HIT after 45 s** |
|---|---|
| Implication | Workers Cache API expiry is **not a reliable correctness control** in this colo/setup |
| Application guarantee | (1) `generation` in cache key (2) `onContentPublished` deletes remembered keys (3) policy clamp TTL ≤300 for intended soft upper bound only |
| Policy enforcement | `parseNegativeCacheTtlSeconds`: default **120**, hard max **300**, floor 1 when caching |

**Do not ship a canary that assumes TTL alone clears negatives after publish.**

---

## 6. Test matrix (this review)

| Area | Suite / evidence | Result |
|---|---|---|
| no-store combinations + non-404 refusals | `negative-cache.security.test.ts` | PASS |
| Equivalence miss↔HIT | security test | PASS |
| Auth / Set-Cookie | security + runtime | PASS |
| TTL policy 120/300 | security test | PASS |
| Cross-isolate EN/AR/unpublish | `negative-cache.cross-isolate.test.ts` | PASS |
| Lifecycle unpublish/republish | security test | PASS |
| Staging ON vs OFF (prior) | staging validation report | PASS post-fix |
| Pacemaker / 410 / sitemap | prior regression | PASS |
| Production flag | `wrangler.production.jsonc` | absent |

---

## 7. Remaining risks

1. Cache API TTL soft-expiry (documented).  
2. ≤2 s warm-isolate version observation after out-of-band R2 version writes.  
3. Caching current `__next_error__` 404 HTML (SEO quality of SSR, not introduced by P1).  
4. Cross-isolate purge only covers keys the publishing isolate remembered; generation mismatch still protects others.  
5. Canary still needs live prod probes — staging workers.dev ≠ production traffic shape.

---

## 8. Production canary recommendation

**Recommendation: CONDITIONAL GO for a tightly controlled canary — only after merge approval and a two-step deploy (code first, flag later). Do not enable the flag globally first.**

### Proposed plan (NOT executed)

1. **Release commit:** merge PR #51 tip (post security follow-ups) into the production release branch; pin the merge SHA.  
2. **Worker deploy strategy:**  
   - Upload new Worker version from that SHA with **`GAF_NEGATIVE_CACHE` unset**.  
   - Promote to **100% traffic with flag OFF** (behaviour = today). Smoke commercial HIT + pacemaker 308.  
3. **Flag enablement (second change):** set production vars `GAF_NEGATIVE_CACHE=1`, `GAF_NEGATIVE_CACHE_TTL=120` via a **new Worker version** (or versions deploy) at **≤10% canary** using Cloudflare Workers gradual deployments — **not** a global var flip as step one if gradual deploy is available; if only all-or-nothing vars, prefer an **isolated canary Worker route** (e.g. temporary hostname / version preview) before apex.  
4. **Do not** use “cache a few random 404s on apex at 100%” as the first enablement.  
5. **EN/AR coverage:** probe EN + AR unknown treatment/hospital/blog paths; one publish+unpublish drill in CMS on a non-commercial draft slug if available.  
6. **Baselines (pre-flag):** warm 200 HIT p50/p95; unknown 404 miss p50/p95; R2/error rate.  
7. **Success thresholds (canary window ≥30–60 min):**  
   - Repeated unknown 404 shows `x-gaf-html-cache: hit`  
   - 404 status + robots semantics unchanged vs baseline  
   - Publish of test slug visible as 200 within ≤5 s (includes 1–2 s version window)  
   - No increase in 5xx; commercial HIT latency not regressed beyond noise  
8. **Cache generation:** confirm CMS publish still bumps `.version.json` and purges; abort canary if not.

---

## 9. Exact rollback steps

1. **Immediate behavioural off:** remove / unset production `GAF_NEGATIVE_CACHE` (and optional TTL var) → redeploy/promote that version.  
2. **Code rollback:** redeploy Worker version `95e74b01-4a90-4a78-b97a-186f52baa74a` @ 100%.  
3. **Stale negatives:** become unreachable after generation rotation; do not rely on TTL. No production R2 surgery required for rollback.

---

## Bottom line

The no-store exception is **narrow** (HTML 404 + auth gates). Genuine 404s can be safely short-cached for crawl cost. Newly published pages are protected by **generation + purge**, with a **~1–2 s** observation window — **not** by Cache API expiry.  

**Safe for a tightly controlled production canary after separate merge/deploy approvals; not safe to flip the production flag globally as the first test.**
