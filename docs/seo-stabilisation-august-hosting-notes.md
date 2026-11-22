# August 2026 Hosting Incident — Evidence Notes (Phase 4)

**Mode:** Forensic documentation only. No production writes.

## Proven (first-party / dated)

| Finding | Evidence |
|---|---|
| Googlebot avg response ~4,507 ms on **24 Aug 2026** | Owner-supplied GSC Crawl Stats (forensic PR #44) |
| ~6,622 ms + ~4,997 impressions on **28 Aug 2026** | Same |
| ~608 impressions + host-problem messaging on **29 Aug 2026** | Same (~88% impression cliff) |
| This Next.js repository created **6 Sep 2026** | GitHub repo metadata |
| Cloudflare Workers cutover **21 Oct 2026** | Deploy/timeline docs in forensic PR #44 |
| **Zero August commits** in this repository | Git history |

**Implication:** The August cliff is a **pre–this-repo / pre–Cloudflare** host/crawl event on the prior stack (reported as Hostinger + WordPress/PHP era).

## Not proven (hypotheses — do not treat as root cause)

| Hypothesis | Status |
|---|---|
| Server resource exhaustion | Plausible given multi-second Googlebot latency; **not ticket-proven** |
| Hosting downtime / PHP-FPM / WP fatal | Plausible; **no access logs in this environment** |
| Database latency | Unverified |
| CDN/cache failure on prior stack | Unverified |
| DNS / origin connectivity failure | Unverified |
| Cloudflare Workers / current Next.js as Aug cause | **Ruled out by timeline** (both post-date Aug) |

## Precise limitation

Original **Hostinger access logs, PHP error logs, and MySQL slow-query logs for 24–30 Aug 2026 are not available** in this repository or cloud agent environment. Without those (or hoster ticket IDs with timestamps), the failure mode stays **UNKNOWN** beyond “host had problems + pathological Googlebot latency + impression cliff.”

## Separation from migration losses

| Window | Attribution |
|---|---|
| Through 2026-08-29 | Host/crawl incident (primary cliff) |
| 2026-09-06 → 2026-10-20 | Next.js on Hostinger + URL IA rebuild |
| 2026-10-21 onward | Cloudflare Workers era; soft-404 / nested equity gaps are **migration residue**, not the Aug trigger |
