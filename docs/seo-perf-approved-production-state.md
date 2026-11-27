# Approved Production State — After PR #51 Phase 1 / Phase 2

**Recorded:** 2026-11-22  
**Owner acceptance:** Phase 1 and Phase 2 successfully completed.

## Apex production (authoritative)

| Item | Approved value |
|---|---|
| Production release (merge / code deploy) | `353d637` |
| Production Worker @ 100% | `930f4242-c0a4-4e38-b5f0-3b39c95b5d2c` |
| R2 stamp (`content/.version.json`) | `353d637` |
| Apex `GAF_NEGATIVE_CACHE` | **OFF** (unset) |
| Prior Worker (rollback) | `95e74b01-4a90-4a78-b97a-186f52baa74a` |
| Prior R2 stamp (rollback) | `374f1bb` |

## Isolated canary (observation only)

| Item | Approved value |
|---|---|
| Worker name | `gaf-healthcare-staging-negcache` |
| Version | `5444d386-3cdf-4f8f-85a7-5278325496de` |
| Endpoint | `https://gaf-healthcare-staging-negcache.gafhealthcare.workers.dev` |
| `GAF_NEGATIVE_CACHE` | `1` |
| TTL | **120** seconds |
| Apex traffic | **None** |
| Production R2 | Read probes only; **no writes** from canary |

Keep the canary available for further observation while operationally safe. Disabling it does not require changing the apex Worker.

## Explicit non-authorisations

Until a new owner approval:

- Do **not** enable negative cache on apex  
- Do **not** increase apex traffic allocation / gradual flag-ON  
- Do **not** change Cloudflare configuration beyond what is already approved  
- Do **not** modify production R2 content (beyond any separately approved content publish)

## Related reports

- `docs/seo-perf-p1-phase1-phase2-deploy-report.md`  
- `docs/seo-perf-p1-canary-preparation.md`  
