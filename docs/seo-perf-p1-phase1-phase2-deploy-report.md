# PR #51 — Phase 1 + Phase 2 Deployment Report

**Owner approval:** Phase 1 + isolated Phase 2 only (no apex gradual / global flag).  
**Stop:** Awaiting review before Phase 3 or broader rollout.

## Exact identifiers

| Item | Value |
|---|---|
| Reviewed code SHA | `45ab09cb67d5d3ed75e9261e7888e455e9eeb642` |
| Docs follow-up before merge | `dc965ad430cf8c0a82bafe7e0ee55f6f8ff74a2a` (docs only; no code delta) |
| **Merged commit** | `353d63732a271578d979f5e466476ec02951940f` |
| Pre-deploy production Worker | `95e74b01-4a90-4a78-b97a-186f52baa74a` @ 100% |
| **Phase 1 production Worker** | `930f4242-c0a4-4e38-b5f0-3b39c95b5d2c` @ **100%** |
| **R2 stamp** | `353d637` (`groups.en/ar` + `updatedAt`) |
| Production `GAF_NEGATIVE_CACHE` | **OFF** (unset in bindings) |
| Phase 2 canary Worker | `gaf-healthcare-staging-negcache` |
| Canary URL | `https://gaf-healthcare-staging-negcache.gafhealthcare.workers.dev` |
| Canary version | `5444d386-3cdf-4f8f-85a7-5278325496de` |
| Canary flag | `GAF_NEGATIVE_CACHE=1`, TTL `120`, `GAF_INDEXING=off` |
| Canary R2 | production buckets (**reads only**; no canary writes) |

---

## Phase 1 results

1. Tip check: only docs after `45ab09c` → proceeded.  
2. Merged PR #51 → `release/stage4-rsc-prod` @ `353d637` (GitHub state **MERGED**).  
3. `npm run cf:build` from merged SHA.  
4. Deployed Worker **without** `GAF_NEGATIVE_CACHE`.  
5. Promoted `930f4242…` to **100%**.  
6. Updated **only** `content/.version.json` stamp to `353d637` (required stamp↔commit match). No other production content objects written for canary.

### Production smoke (apex)

| Probe | Result |
|---|---|
| Commercial pacemaker flat | **200**, canonical present, ~4.4 s cold miss then later **hit** |
| Nested pacemaker | **308** → `/treatments/pacemaker-implantation-in-india` |
| Genuine 404 ×2 | **404** / `x-gaf-html-cache: miss` both times (flag OFF) |
| Home / doctors | **200**, canonical present |
| `sitemap-en.xml` | **200**; flat pacemaker listed; nested absent |
| Cloudflare 1101 | Not observed |

**Verdict Phase 1:** Production behaves as before regarding negative cache (disabled). Feature code present but inert.

---

## Phase 2 results (isolated canary)

Canary does **not** receive apex traffic.

| Probe | Result |
|---|---|
| First EN 404 | miss ~2786 ms, status 404, no-store CC |
| Repeated EN 404 | **hit** p50 ~36 ms, p95 ~72 ms, status 404 |
| AR 404 miss → repeat | miss then **hit** (independent path) |
| Query variants | both **hit** (empty negative query) |
| Pacemaker nested | **308** → flat URL |
| Commercial | **200**, canonical true |
| Warm 404 HIT p50/p95 | ~23 ms / ~81 ms |
| SEO on canary 404 | status 404; `x-robots-tag: noindex, nofollow` (canary `GAF_INDEXING=off`); body preserved |
| Apex during canary | commercial **200 hit**; unknown 404 still **miss** (flag OFF) |
| Production R2 stamp after canary | still `353d637` |

### Publication visibility (≤5 s)

**No production R2 writes** (per approval). Same-/cross-isolate publication + unpublish/republish harness on this code: **9/9 PASS**, including publish→200 without stale 404 HIT. Prior staging generation observation ~1–2 s. Combined evidence supports ≤5 s visibility when CMS publish path runs.

---

## Success criteria checklist

| Criterion | Phase 1 | Phase 2 |
|---|---|---|
| Negative cache on genuine HTML 404 | N/A (OFF) | **PASS** (HIT) |
| No incorrect 404 HIT on apex | **PASS** | N/A (canary only) |
| Publish ≤5 s | harness PASS | harness PASS; no prod write |
| No commercial regression | **PASS** | **PASS** on canary |
| Redirect / sitemap / canonical | **PASS** | **PASS** |
| No prod R2 content (except stamp) | stamp only | **no canary writes** |
| No 1101 / commercial 5xx | **PASS** | **PASS** |

---

## Rollback (ready)

- **Phase 1:** `wrangler versions deploy 95e74b01-4a90-4a78-b97a-186f52baa74a --percentage 100 --yes --config wrangler.production.jsonc`; restore `.version.json` to `374f1bb` only if required.  
- **Phase 2:** delete/disable canary Worker or unset its flag; **do not** change apex Worker.

---

## STOP

Phase 1 + Phase 2 complete. **No Phase 3 / apex gradual / global flag enablement** without new explicit approval.
