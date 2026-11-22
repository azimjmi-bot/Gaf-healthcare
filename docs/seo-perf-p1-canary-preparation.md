# PR #51 — Controlled Production Canary Preparation

**Status:** READY FOR OWNER APPROVAL — **no production action executed**  
**Reviewed / verified tip:** `45ab09cb67d5d3ed75e9261e7888e455e9eeb642`  
**PR:** https://github.com/azimjmi-bot/Gaf-healthcare/pull/51  

## Current production (verified read-only)

| Item | Value |
|---|---|
| Release / R2 stamp | `374f1bb` (`content/.version.json` groups en/ar = `374f1bb`) |
| Worker @ 100% | `95e74b01-4a90-4a78-b97a-186f52baa74a` |
| `GAF_NEGATIVE_CACHE` | **absent** (OFF) |
| Pacemaker nested URL | live **308** → `/treatments/pacemaker-implantation-in-india` |

---

## 1. Final pre-canary checks (executed)

| Check | Result |
|---|---|
| PR tip still `45ab09c…` | **MATCH** |
| Worker P1 suites | **66/66 pass** |
| no-store exception HTML-404-only | Confirmed in `negative-cache.ts` + security tests |
| EN/AR + cross-isolate publication | **PASS** |
| Cached 404 header/body equivalence | **PASS** |
| PR #45 pacemaker redirect | **PASS** (unit + live prod 308) |
| Protected 410 / legacy matrix | **PASS** (`legacy-urls.test.ts`) |
| Sitemap parity | **PASS** (8/8) |

Artifacts: `/opt/cursor/artifacts/p1-precanary-*.log`

---

## 2. How the flag and cache scope actually work

`GAF_NEGATIVE_CACHE` is a **Worker version environment variable**, not a per-URL or per-status traffic sampler.

### Gradual deploy at N% (e.g. 10%)

Cloudflare splits **all requests** to the Worker between versions by percentage.

| What N% means | What it does **not** mean |
|---|---|
| ~N% of **all** HTML/RSC/API/etc. requests run the flag-ON version | “Only N% of 404s are eligible” |
| On the flag-ON version, **every** genuine HTML 404 that passes policy may be stored/served as a negative HIT | A sampler that picks random 404s inside one version |

**Commercial 200s** on the flag-ON percentage use the new code path with the flag set, but positive caching rules are unchanged (still status-200 public HTML only). Negative lookup runs only after a positive miss and only for HTML.

**Cache API:** `caches.default` is shared across isolates of `gaf-healthcare-production`. Negative keys use `path + .404` + **empty query** + **generation**. The flag-OFF version **never looks up** `.404` keys (gated in `readDocumentCache`). After disablement, lingering `.404` objects are **not served**.

### Why “10% traffic” is not a 404-only canary

Any request hashed onto the flag-ON version that happens to be a genuine HTML 404 can populate/read the negative cache. Crawl bursts on that shard can still create many `.404` entries. That is acceptable for a canary **if** publication safety (generation + purge) holds, but it is **not** route-isolated.

### Safest limited enablement options (ranked)

| Option | Isolation | Notes |
|---|---|---|
| **A. Separate canary Worker** (recommended for first flag-ON) | Strong | New script e.g. `gaf-healthcare-production-negcache-canary`, `workers_dev: true`, bind **read** production R2, `GAF_NEGATIVE_CACHE=1`, `GAF_INDEXING` unset or explicit noindex via staging pattern only if desired. **No** apex route. Probe via `*.workers.dev` only. |
| **B. Gradual versions deploy** flag-ON @ **5% then 10%** | Medium | Honest all-request split. Use only after Option A green, or if owner accepts apex shard risk. |
| **C. Global flag ON @ 100%** | None | **Forbidden** as first enablement. |

Production `wrangler.production.jsonc` currently has `workers_dev: false` and `preview_urls: false` on the apex Worker — so **version preview / workers.dev on the production script itself is not available** without a config change (requires separate approval). Prefer **Option A** (new Worker name) over flipping those production settings.

---

## 3. Prepared deployment plan (DO NOT EXECUTE without explicit approval)

### Phase 0 — Merge approval (human)

- Merge PR #51 at tip `45ab09c` (or later agreed tip) into the release branch.  
- **This agent will not merge.**

### Phase 1 — Code deploy, flag unset (behaviour = today)

1. Build from merged SHA (`cf:build` as per repo practice).  
2. `wrangler versions upload` / deploy with `wrangler.production.jsonc` **without** `GAF_NEGATIVE_CACHE`.  
3. Promote new version to **100%**.  
4. Smoke: commercial HIT, pacemaker 308, sample 404 still miss (flag off), R2 stamp still `374f1bb` unless a content publish intentionally changed it.  
5. Record new Worker version ID as `V_FLAG_OFF`.

**Rollback of Phase 1:** redeploy `95e74b01` @ 100%.

### Phase 2 — Isolated flag-ON canary (Option A)

1. Create/deploy **separate** Worker `gaf-healthcare-production-negcache-canary` from same SHA with:  
   - `GAF_NEGATIVE_CACHE=1`  
   - `GAF_NEGATIVE_CACHE_TTL=120`  
   - same production R2 bindings (read-heavy probes only)  
   - `workers_dev: true`, **no** custom domain / no `gaf.healthcare` route  
2. Run the success-criteria probe matrix against the canary hostname only.  
3. **Do not** write production CMS content unless owner approves a disposable slug; prefer generation-bump drills already proven on staging + harness for publish timing.

### Phase 3 — Optional apex gradual (Option B), only after Phase 2 green

1. Upload apex Worker version `V_FLAG_ON` with flag vars set.  
2. `wrangler versions deploy` → `V_FLAG_ON` at **5%**, keep `V_FLAG_OFF` at 95%.  
3. Watch 30–60 minutes against success criteria.  
4. Step to 10% only if green.  
5. **Stop** and require a new approval before 50%/100%.

---

## 4. Canary success criteria

| Metric | Pass |
|---|---|
| Repeated genuine 404 | `x-gaf-html-cache: hit` on canary (flag ON) |
| First MISS vs HIT latency | HIT ≪ MISS; no commercial p95 regression vs baseline |
| R2 reads / SSR renders | Lower on repeated 404 HIT path |
| Cross-isolate / publish visibility | New publish visible as **200 within 5 s** (includes ~1–2 s version window) |
| EN + AR unknown paths | Independent keys; both can HIT when ON |
| Commercial status/latency | Still 200; HIT behaviour unchanged |
| 1101 / 5xx | No material increase |
| Cached 404 SEO | Status 404; client Cache-Control restored to original no-store; robots/body unchanged vs miss |
| Redirects / sitemap | Pacemaker 308 unchanged; no sitemap edits in this PR |
| Incorrect negative HIT | Never serve 404 HIT for a live 200 URL after publish |

**Abort immediately** if: publish hidden >5 s, commercial regression, 5xx/1101 spike, or 404 HIT after confirmed publish.

---

## 5. Rollback readiness (verified in code + ops)

| Action | Effect |
|---|---|
| Unset `GAF_NEGATIVE_CACHE` on serving version / move traffic to `V_FLAG_OFF` | Negative **lookup and store disabled**. Existing `.404` Cache API objects are **not served**. |
| Generation rotation necessary? | **Not required for disablement.** Optional; entries become unreachable on next content generation anyway. |
| Restore previous Worker | `wrangler versions deploy` → `95e74b01-4a90-4a78-b97a-186f52baa74a` @ **100%** |
| Restore matching R2 stamp | Current prod stamp is `374f1bb`. Canary plan **must not** rewrite production R2. Only restore `.version.json` if a canary mistakenly changed it (restore from backup / known `{"groups":{"en":"374f1bb","ar":"374f1bb"},"updatedAt":"374f1bb"}`). |

---

## 6. Exact canary scope (summary)

| Dimension | Scope |
|---|---|
| Code SHA | `45ab09cb67d5d3ed75e9261e7888e455e9eeb642` |
| First production change | Flag-**OFF** code only @ 100% |
| First flag-ON surface | **Isolated canary Worker** (workers.dev), not apex global |
| Optional second step | Apex gradual **5% → 10%** flag-ON version (all request types on that shard) |
| TTL | 120 s policy (soft); correctness via generation + purge |
| Out of scope until new approval | Merge by agent, apex 100% flag ON, DNS, prod R2 edits, redirect/SEO rule changes |

---

## 7. Final readiness verdict

**READY to request owner approval for Phase 1 (merge + flag-OFF deploy) and Phase 2 (isolated flag-ON canary Worker).**  

**NOT READY** to enable the production apex flag globally.  

**STOP — explicit approval required before any production merge, deploy, flag enablement, R2 write, DNS, or Cloudflare configuration change.**
