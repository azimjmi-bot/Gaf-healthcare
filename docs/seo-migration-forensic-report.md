# GAF Healthcare — Master SEO Migration Loss Investigation

**Mode:** Forensic, read-only. No code, deploy, R2, DNS, robots, sitemap, or redirect changes.  
**Production at investigation:** release `8eabd88` · Worker `d54aff0e-5a7f-418d-8481-09a1de8e6e89` · R2 stamp `8eabd88`  
**Date:** 2026-11-22  

**Companion artifacts:** `docs/seo-migration-timeline.csv`, `seo-url-migration-audit.csv`, `seo-lost-keywords-analysis.csv`, `seo-gsc-performance-analysis.md`, `seo-indexation-audit.csv`, `seo-canonical-hreflang-audit.csv`, `seo-sitemap-comparison.csv`, `seo-backlink-recovery.csv`, `seo-recovery-roadmap.md`

---

## Executive summary

### 1. Why did organic keywords fall from ~1,800 to 315?

**We cannot confirm that magnitude as a single apples-to-apples Google loss.**

| Claim | Status |
|---|---|
| Owner-reported SEMrush peak ~1,800 keywords | **Unverified** in this environment (no matching historical SEMrush export) |
| SEMrush 22 Nov 2026: **315** keywords, **−69%**, traffic est. **1**, AS **8**, RD **513**, BL **7.1K** | **Third-party screenshot** — database/device/location settings not confirmed vs the ~1,800 baseline |
| First-party dated cliff | **Strongly indicated:** GSC impressions ~4,997 → ~608 (**~88%**) on **28–29 Aug 2026**, with multi-second Googlebot latency and “Host had problems” messaging (user-supplied GSC; raw daily CSV still incomplete) |

**Most likely multi-factor story (ranked):**

1. **Primary (dated):** August 2026 **host/crawl health collapse** on the *pre–Next.js* stack — before this repository existed (born **6 Sep 2026**).  
2. **Secondary (sustaining):** After the rebuild, **URL IA replacement** left historical rankings on paths that now **404** (nested treatments, unpublished `/ru`, `/resources/blog/`, obsolete profiles) while `.in` **path-preserving 301s** still send link equity into many of those dead ends.  
3. **Metric artefact (possible):** SEMrush Worldwide/Desktop (or other setting drift) can under-count vs an earlier peak without proving Google lost that many keywords.  
4. **Not the August cause:** Cloudflare Workers cutover (**21 Oct 2026**), PR #27/#32/#34/#42/#43 — all **after** the Aug cliff.

### 2. Was the domain migration implemented correctly?

**Partially.**

| Layer | Assessment |
|---|---|
| `gafhealthcare.in` → `gaf.healthcare` | **Correct** single-hop **301** (live 2026-11-22), path-preserving |
| `www` → apex / HTTP → HTTPS | **Correct** (live) |
| Path-level equivalence | **Materially incomplete** — many destinations after the domain hop are **404** (nested IA, RU, legacy blogs, removed profiles) |
| Equity transfer for known successors | **Incomplete** — e.g. `/treatments/cardiology/pacemaker-implantation` still **404** while flat successor exists |

### 3. Did the website crash contribute?

**Yes — as the best-dated primary trigger (strongly indicated, not ticket-proven).**  
Aug 28–29 cliff coincides with pathological Googlebot latency and declining crawl volume. This repo has **zero August commits**; exact Hostinger/WP failure mode remains **UNKNOWN** without hoster access logs.

### 4. Did Cloudflare / SSR / ISR contribute?

**Not to the August collapse** (cutover 21 Oct).  
**Possible** contributors to *later* volatility/churn (Workers, R2 hydration, cold TTFB, catalogue expansion). Live Googlebot probes on current money URLs return **200 + substantial SSR HTML** (not empty shells). Prior CF1101 issues were mitigated (PR #32).

### 5. Are important old URLs losing historical signals?

**Yes — probable.** Domain 301s preserve path, so backlinks to `.in/old-path` land on `.healthcare/old-path`. Where that path 404s, equity does not reach the current flat treatment/doctor/hospital URL. GSC Not-found composition is dominated by doctor facets, nested treatments, and RU.

### 6. Are valuable pages missing from Google’s index?

**Insufficient evidence for today’s Coverage counts** (Indexing URL export missing).  
Proxies: published sitemaps are large (EN **8,294** / AR **4,843** / blogs **111**); Performance top-1000 still shows deep positions and low clicks (28d: **4,134** impr / **18** clicks). Many *historical* URLs are correctly unpublished; whether *commercial* current URLs are under-indexed requires Coverage + Performance-by-page exports.

### 7. Are canonical / hreflang / sitemap / noindex causing losses?

| Control | Live finding |
|---|---|
| Canonicals on sampled EN/AR money URLs | Self-referencing absolute `https://gaf.healthcare/...` |
| Hreflang | Reciprocal EN↔AR where AR published; intentional omit when AR unpublished |
| robots.txt | `Allow: /` + working sitemap index |
| noindex | Correct on `/ru` root; deep RU 404+noindex |
| Sitemap | Excludes nested/legacy correctly; smaller ≠ automatically bad |
| Residual risk | Soft-404 HTML 404s (vs hard 410); some cost canonicals lowercase the path |

**No evidence of a sitewide robots/canonical outage on current templates.**

### 8. Which 20 issues should be fixed first?

See Priority 0–1 in `docs/seo-recovery-roadmap.md` (data exports, pacemaker-class 301s, soft-404→410 for approved obsolete patterns, GSC property hygiene, Links mapping, stale Not-found validation, protect PR #27/#34 decisions, etc.).

### 9. Realistic recovery strategy?

1. **Stabilize crawl signals** on *current* money URLs (already largely healthy).  
2. **Transfer equity** only where a verified successor exists (301).  
3. **Retire dead discovery** with hard **410** (not soft 404) for approved obsolete patterns — without touching protected 40/4 sets unless evidence contradicts.  
4. **Rebuild rankings** on surviving treatment/country/doctor/hospital URLs using GSC losers — not by mass facet spam.  
5. **Do not promise** a return to 1,800 SEMrush keywords; re-baseline with identical SEMrush settings + GSC.

### 10. Evidence still required from the owner?

See §Missing evidence below and `docs/seo-gsc-performance-analysis.md`.

---

## Overall verdict

# **Migration partially defective**

- **Domain host migration:** technically sound at the hostname layer.  
- **URL-level migration:** materially incomplete / inequitable for large legacy path classes.  
- **Primary visibility cliff:** strongly indicated as **pre-migration host failure (Aug 2026)**, not Cloudflare.  
- **SEMrush 1,800→315:** insufficient evidence to treat as a precise Google keyword loss figure.

---

## Phase findings (condensed)

### Timeline (Phase 1)

See `docs/seo-migration-timeline.csv`. Separate: domain hop (Oct 17 docs + live 301s), Aug crash/cliff, Hostinger Next (Sep), Cloudflare Workers (Oct 21), catalogue expansion (Nov 22), publication-gate/sitemap evolution (Sep–Nov).

### URL migration (Phase 2)

See `docs/seo-url-migration-audit.csv`. Protected **40×410** and **4×308** remain protected decisions.

### SEMrush (Phase 3)

See `docs/seo-lost-keywords-analysis.csv` — **awaiting exports**. No SEMrush API/MCP in this environment; no historical CSV on disk.

### GSC (Phase 4)

See `docs/seo-gsc-performance-analysis.md`. Partial: Pages-28d/24h present. Missing: 16-month Performance, Coverage lists, Links, Crawl Stats CSV for Aug.

### Technical SEO (Phase 5)

Live Googlebot SSR samples OK; domain redirects OK; RU noindex OK. Residual soft-404s and missing pacemaker-class 301s.

### Sitemap (Phase 6)

`docs/seo-sitemap-comparison.csv` — expansion since mid-Nov; legacy patterns correctly absent.

### Cannibalisation (Phase 7)

Large pSEO facet inventory can dilute crawl and produce deep average positions; **not proven** as the Aug cliff cause. Avoid mass deletion without Performance proof.

### Backlinks (Phase 8)

`docs/seo-backlink-recovery.csv` — domain-level SEMrush only; URL attribution **MISSING**.

### Root causes table (Phase 9)

| Finding | Evidence | First observed | Impact | Affected | Confidence | Recommended correction | Risk | Validation |
|---|---|---|---|---|---|---|---|---|
| Aug host/crawl collapse | User GSC impr + crawl latency; no Aug git | 2026-08-28/29 | **High** | Sitewide visibility | **Probable** (mechanism); root host cause Unknown | Archive GSC; improve host SLOs going forward; do not “undo CF” for Aug | Mis-blaming CF | GSC daily export + hoster logs |
| Path-preserving `.in` 301 into 404 destinations | Live `.in`→apex 301; Not-found nested/RU/legacy | Documented Oct 17; live 2026-11-22 | **High** | Legacy ranking URLs + inbound links to `.in` | **Confirmed** pattern | Map Links→URL; 301 only to verified successors; else 410 | Wrong 301s | Spot-check top linked legacy URLs |
| Nested treatment IA without 301 to flat successors | Live pacemaker nested 404; successor 200 | Ongoing; audit Nov 21 | **High** | Nested treatment keywords/URLs | **Confirmed** for pacemaker class; others candidate | Implement verified 301s only | Intent mismatch | Live 308/301 + GSC |
| Soft-404 residue (RU, resources/blog, many obsolete) | Live 404 HTML; GSC impr on RU | Pre-PR34; partial 410 only | **Medium–High** | Hundreds–thousands discoveries | **Confirmed** residue | Expand hard 410 for approved obsolete batches | Equity loss if wrong | Coverage Not-found ↓ |
| SEMrush methodology / undercount | 315 WW snapshot vs unverified 1800 | 2026-11-16/22 | **Medium** (reporting) | Reported keyword KPI | **Possible** | Re-export identical settings | Chasing wrong KPI | Side-by-side SEMrush CSV |
| Deep pSEO / low CTR inventory | 28d avg deep positions; 18 clicks / 4134 impr | GSC Pages-28d | **Medium** | Facet-heavy SERP footprint | **Possible** | Recover money URLs first; facet thresholds only with data | Over-pruning | Performance by page |
| CF/SSR empty shells | Googlebot probes full HTML | 2026-11-19/22 | **Low** now | Sampled money URLs | **Not supported** as current outage | Monitor cold TTFB | — | Ongoing Googlebot checks |
| Sitewide bad robots/canonical | Live robots Allow; self-canonical samples | Post PR #27 | **Low** now | Current templates | **Not supported** | Protect PR #27 hygiene | Regression | Synthetic SEO probes |

---

## Missing evidence (do not invent)

1. SEMrush historical organic positions (`.in` + `.healthcare`) matching ~1,800 and current 315 settings.  
2. GSC Performance daily Jul–Nov 2026; Queries; full Pages beyond top-1000; 16-month.  
3. GSC Indexing/Coverage URL lists + reasons (current).  
4. GSC Links (external / top linked pages) for `.in` and `.healthcare`.  
5. GSC Crawl Stats export for 24–30 Aug 2026.  
6. Hoster/WordPress access logs for Aug 24–30.  
7. Confirmation of GSC property type (domain vs URL-prefix) covering `.in` history.

---

## Access statement

- **SEMrush API / MCP:** not available.  
- **Google Search Console interactive UI:** not connected in this agent.  
- **Used:** on-disk GSC CSV fragments, prior forensic artifacts, git history, live HTTP probes of production.
