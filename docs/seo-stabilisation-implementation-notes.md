# SEO Decline Stabilisation — Implementation Notes (Phase 6)

**Branch:** `cursor/seo-pacemaker-nested-redirect-6064`  
**Release candidate SHA:** see `docs/seo-stabilisation-production-readiness.md`  
**Base:** `release/stage4-rsc-prod` @ `8eabd88` (production Worker `d54aff0e` / R2 stamp `8eabd88` at investigation time)  
**Scope:** Verified low-risk fix only — nested pacemaker permanent redirect + audit docs + tests.  
**Audit verdict (PR #45 final review):** Approve for owner merge/deploy. No speculative redirects.  
**Companions:** `seo-stabilisation-crawl-performance.md`, `seo-stabilisation-production-readiness.md`, monitoring plan.

## Production baseline (Phase 1, 2026-11-22)

| Item | Value |
|---|---|
| Release branch HEAD | `8eabd88` |
| Production Worker | `d54aff0e` @ 100% |
| R2 version stamp | `8eabd88` |
| Prod vs latest release | Match (no drift) |
| Commercial SSR sample | 200 with SSR HTML (EN treatments, doctors, hospitals, countries, cities, costs) |
| Nested pacemaker (pre-fix) | `404` on `/treatments/cardiology/pacemaker-implantation` |
| Flat successor | `200` self-canonical `/treatments/pacemaker-implantation-in-india` |
| `.in` hostname | Path-preserving 301 to `.healthcare` (unchanged) |

## Confirmed causes

| Cause | Evidence tier | Notes |
|---|---|---|
| Aug 28–29 2026 host/crawl cliff | Proven (GSC crawl/impressions in forensic PR #44) | Pre–this-repo; Hostinger-era |
| Soft-404 / migration residue | Proven (PR #27/#34/#44) | Nested treatments, legacy paths |
| Nested pacemaker equity loss | Proven | Old 404 while genuine successor 200 |
| Path-preserving `.in` → nested 404 | Proven for this URL | Hostname 301 intact; apex path still 404 until redirect |

## Suspected (need owner data)

- Exact Aug root cause (resource exhaustion vs downtime vs DB/CDN) — Hostinger access logs not available in-repo.  
- Full backlink inventory for remaining nested candidates.  
- SEMrush identical-setting historical series.  
- Whether remaining 12 slug-match candidates are clinical/intent equivalents.

## Implemented change

| Old URL | Destination | Type | Rationale |
|---|---|---|---|
| `/treatments/cardiology/pacemaker-implantation` | `/treatments/pacemaker-implantation-in-india` | permanent (308 via Next) | VERIFIED clinical + intent equivalent |

**Not changed:** protected 40×410, protected 4×308, hostname `.in` 301, publication gates, faculty specialty noindex, taxonomy/pSEO, DNS/CF secrets.

## Nested audit summary

See `docs/seo-nested-treatment-redirect-audit.csv` (142 rows).

| Confidence | Count | Action |
|---|---|---|
| VERIFIED | 1 | Redirect in this PR |
| CANDIDATE | 12 | Hold for clinical/intent approval |
| NO_MATCH | 129 | Retain 404/410 behaviour; no speculative redirect |

## Before / after (changed URL)

| URL | Before | After (this PR) |
|---|---|---|
| `/treatments/cardiology/pacemaker-implantation` | 404 | permanent → `/treatments/pacemaker-implantation-in-india` |
| `/treatments/pacemaker-implantation-in-india` | 200 self-canonical | unchanged |
| Sitemap | nested absent | nested still absent; successor remains if publishable |

## Owner data still required

See `docs/seo-stabilisation-data-import-checklist.md`.

## Production deployment checklist (owner-approved only)

1. Merge this PR into `release/stage4-rsc-prod` (human merge).  
2. Run production Cloudflare build / Worker publish per existing runbook.  
3. Confirm R2 stamp == deployed commit.  
4. Probe: nested pacemaker single-hop permanent redirect; successor 200; no loop.  
5. Probe Googlebot + browser UA on commercial set.  
6. Confirm nested path absent from sitemap.  
7. Start 28-day monitoring (`docs/seo-stabilisation-monitoring-plan.md`).

**This agent is not authorised to merge, deploy, upload R2, or change DNS/CF config.**
