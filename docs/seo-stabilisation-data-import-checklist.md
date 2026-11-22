# SEO Stabilisation — GSC / SEMrush Data Import Checklist

**Purpose:** Structure owner-provided exports so August hosting losses can be separated from later migration-related losses.  
**Rule:** Do not invent missing keyword rows, backlinks, rankings, or index counts.

## Required exports

| # | Export | Property | Window | Filename suggestion | Status |
|---|---|---|---|---|---|
| 1 | Performance → Daily | `gaf.healthcare` | 2026-07-01 → present | `gsc-perf-daily-gaf-healthcare-2026-07-11.csv` | AWAITING |
| 2 | Performance → Pages | `gaf.healthcare` | 28d + 16mo if available | `gsc-perf-pages-*.csv` | PARTIAL (top-1000 28d/24h on disk) |
| 3 | Performance → Queries | `gaf.healthcare` | same | `gsc-perf-queries-*.csv` | AWAITING |
| 4 | Indexing / Coverage URL lists + reasons | `gaf.healthcare` | current | `gsc-coverage-*.csv` | AWAITING |
| 5 | Links → top linked pages + external sites | `gaf.healthcare` | current | `gsc-links-*.csv` | AWAITING |
| 6 | Crawl Stats (esp. 24–30 Aug) | `gaf.healthcare` | Aug 2026 if retained | `gsc-crawl-stats-2026-08.*` | AWAITING |
| 7 | Same Performance/Links set | `gafhealthcare.in` | historical | `gsc-*-gafhealthcare-in-*.csv` | AWAITING |
| 8 | SEMrush Organic Research positions | both hosts | peak ~1800 era + current | Identical DB/device/location | AWAITING |

## Analysis calculations (once imported)

1. Daily impressions/clicks; 7-day and 28-day rolling trends.  
2. Split series at **2026-08-29** (host cliff) and **2026-10-21** (Workers cutover).  
3. Commercial URL performance (treatments, country hubs, top doctors/hospitals).  
4. Lost vs recovered queries.  
5. Previously ranking URL vs current successor (join to `docs/seo-nested-treatment-redirect-audit.csv`).  
6. URLs with impressions but no clicks.  
7. Externally linked URLs that now 404.  
8. Indexed vs submitted sitemap URLs.

## Separation rule

| Period | Treat as |
|---|---|
| Through 2026-08-29 | Host/crawl incident (pre–this-repo) |
| 2026-09-06 → 2026-10-20 | Next.js Hostinger + URL IA rebuild |
| 2026-10-21 onward | Cloudflare Workers era |
| 2026-11-13 onward | PR #27 soft-404 hygiene |
| 2026-11-21 onward | PR #34 partial 410/308 |
| 2026-11-22 onward | PR #42/#43 catalogue expansion @ `8eabd88` |
