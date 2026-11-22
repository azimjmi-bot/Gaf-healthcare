# SEO Stabilisation — 28-Day Post-Deploy Monitoring Plan

**Applies after** an approved production deploy of the pacemaker nested→flat redirect (and any later verified nested redirects).  
**Rule:** Do not interpret one day's impressions as recovery or failure.

## Daily operational checks (D0–D28)

| Check | Method | Pass threshold | Escalate if |
|---|---|---|---|
| Googlebot TTFB on 5 commercial URLs | curl UA=Googlebot | p95 &lt; 3s warm; cold noted | Sustained p95 &gt; 5s or CF 1101 |
| 5xx / 1101 rate | CF Analytics + Worker logs | ≈0 on commercial paths | Any recurring 1101 on same route |
| Pacemaker old URL | curl -I | Single 308/301 → flat successor | Loop, chain &gt;1 on apex, or 404 |
| Pacemaker successor | curl + HTML | 200, self-canonical, indexable | noindex or wrong canonical |
| Sitemap health | fetch sitemap index + sample | No 404/redirect/noindex URLs in sample | Nested pacemaker appears in sitemap |
| Important commercial set | scripted probe | All 200 | Any 5xx or unexpected 404 |

## Weekly SEO trend reviews (W1–W4)

1. GSC impressions/clicks (7d vs prior 7d) — flag direction only, no causal claim from one week.  
2. Indexing status of: pacemaker successor, top country hubs, top treatment hubs.  
3. Crawl activity on old nested pacemaker vs successor (should shift to successor).  
4. Coverage “Not found (404)” delta for nested treatment paths.  
5. Compare commercial landing performance separately from blog/long-tail.

## Escalation procedure

1. **P1 (same day):** Recurring CF 1101, redirect loop, or commercial homepage/treatment hub 5xx → pause further SEO deploys; owner + eng on-call.  
2. **P2 (48h):** Pacemaker redirect broken in production, or successor noindex/canonical regression → hotfix PR only for that defect.  
3. **P3 (weekly):** Soft-404 residue growth or GSC coverage regressions without P1/P2 symptoms → investigate; do not mass-410 without evidence.

## Out of scope for this plan

- Ranking/keyword recovery targets.  
- Expanding the protected 40×410 or 4×308 lists.  
- Deploying candidate nested redirects without clinical/intent verification.
