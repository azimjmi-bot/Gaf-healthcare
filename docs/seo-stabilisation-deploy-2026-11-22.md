# SEO Stabilisation Deploy Record — 2026-11-22

**Change:** PR #45 pacemaker nested→flat permanent redirect  
**Merge:** `374f1bb00ba27106026078ae1bb18984af79050c` into `release/stage4-rsc-prod`  
**Worker:** `95e74b01-4a90-4a78-b97a-186f52baa74a` @ 100%  
**R2 stamp:** `374f1bb`  
**Rollback:** Worker `d54aff0e-5a7f-418d-8481-09a1de8e6e89` + stamp `8eabd88`

## Live verification summary

| Check | Result |
|---|---|
| Bare nested → flat | 308 single hop → 200 |
| Query string | Preserved on Location (`?utm_…`) |
| Trailing slash | Pre-existing slash-strip 308, then pacemaker 308 (2 hops) |
| `.in` hostname | Unchanged path-preserving 301, then apex 308 |
| Successor SEO | 200, self-canonical, indexable |
| Sitemaps | EN nested absent / flat present; AR unpublished flat absent |
| Protected 40/4 | Samples 410 + 308 OK |
| 1101 / commercial 5xx | None on probe set |

## Monitoring

28-day programme started **2026-11-22**. See `docs/seo-stabilisation-monitoring-plan.md`.
