# SEO Stabilisation — 28-Day Post-Deploy Monitoring Plan

**Applies after** an approved production deploy of PR #45 (pacemaker nested→flat redirect).  
**Rule:** Do not interpret one day's impressions as recovery or failure.

## Daily operational checks (D0–D28)

| Indicator | Method | Pass | Escalate |
|---|---|---|---|
| Googlebot TTFB (5 commercial URLs) | curl UA=Googlebot; note `x-gaf-html-cache` | Warm HIT p95 **&lt; 500 ms**; miss noted separately | Sustained warm p95 **&gt; 3 s** or Worker 1101 |
| Googlebot 5xx / CF 1101 | CF Analytics + sample probes | ≈0 on commercial paths | Any recurring 1101 / 5xx on same route → **P1** |
| Pacemaker old URL | `curl -sI` no-follow | Single **308** → `/treatments/pacemaker-implantation-in-india` | Loop, apex chain &gt;1, or 404 → **P2** |
| Pacemaker successor | curl + HTML | **200**, self-canonical, **not** noindex | noindex / wrong canonical → **P2** |
| Commercial URL set | Scripted probe (treatments, doctors, hospitals, countries) | All **200** | Any 5xx → **P1**; unexpected 404 → investigate |
| Sitemap integrity | sitemap index + EN/AR sample | Nested pacemaker **absent**; no redirected/404 locs in sample | Nested path reappears → **P2** |
| Canonical / noindex drift | Sample commercial + successor | Self-canonical; commercial indexable | Regression → **P2** |

## Weekly SEO trend reviews (W1–W4)

| Indicator | Method | Notes |
|---|---|---|
| GSC impressions / clicks | Performance daily; 7d vs prior 7d | Directional only; split Aug cliff vs post-deploy |
| Commercial page indexing | URL Inspection / Coverage for successor + hubs | Track “Crawled / Indexed” for money URLs |
| Crawl activity | Crawl Stats + server logs if available | Old nested should decline; successor should receive crawls |
| Coverage drift | Not-found / Soft-404 deltas | Nested treatment 404 class should shrink for pacemaker only |
| Sitemap URL counts | Build or live EN/AR counts | Large swings without catalogue change → investigate; do not chase count growth |

## Escalation

1. **P1 (same day):** Recurring CF **1101**, redirect **loop**, or commercial homepage/treatment hub **5xx** → pause further SEO deploys; eng on-call.
2. **P2 (48h):** Pacemaker redirect broken, or successor **noindex**/canonical regression → hotfix PR for that defect only.
3. **P3 (weekly):** Soft-404 / coverage drift without P1/P2 → investigate; **no** mass-410 without evidence.

## Out of scope

- Ranking/keyword recovery targets.
- Expanding protected 40×410 or 4×308 lists.
- Deploying the 12 nested **CANDIDATE** redirects without clinical/intent verification.
