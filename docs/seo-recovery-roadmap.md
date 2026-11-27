# SEO Recovery Roadmap — Post-Migration Visibility

**Mode:** Plan only. **No implementation authorized** by the forensic investigation.  
**Goal:** Recover organic visibility lost around migration/host failure — **not** maximize page or keyword count.

Related: `docs/seo-migration-forensic-report.md`

---

## Priority 0 — Critical migration / measurement defects

| # | Action | URLs / scope | Expected benefit | Complexity | Risk | Validation | Approval |
|---|---|---|---|---|---|---|---|
| P0.1 | Export GSC + SEMrush baselines (identical SEMrush DB/device as ~1800 and as 315) | Properties `.in` + `.healthcare` | Makes loss measurable | Low | None | Files landed in artifacts | Owner data only |
| P0.2 | Confirm GSC property coverage for `.in` history | GSC UI | Know if domain hop kept history | Low | None | Screenshot/export | Owner |
| P0.3 | Map top linked legacy URLs (GSC Links) → live status | Top linked pages | Find equity dead-ends | Low–Med | None | CSV of link→status | After Links export |
| P0.4 | Implement **verified** nested→flat treatment 301s (start: pacemaker) | `/treatments/cardiology/pacemaker-implantation` → `/treatments/pacemaker-implantation-in-india` (+ other verified only) | Restore equity to live money URLs | Low | Wrong clinical match | Live single-hop 301/308; GSC | **Explicit URL approval** |
| P0.5 | Do **not** roll back Cloudflare to “fix August” | N/A | Avoid self-inflicted outage | — | High if done | — | N/A — do not do |

---

## Priority 1 — Recover lost historical ranking signals

| # | Action | Scope | Benefit | Complexity | Risk | Validation | Approval |
|---|---|---|---|---|---|---|---|
| P1.1 | Expand hard **410** for approved obsolete soft-404 batches (RU unpublished, `/resources/blog/`, nested without successor) | Per approval packs | Clearer Gone signal vs soft-404 | Med | Killing equity if wrong | Not-found ↓; 410 probes | Batch approval; **protect existing 40/4** |
| P1.2 | Validate stale GSC “404 but live 200” set | ~54 URLs prior list | Clean indexing reports | Low | None | GSC URL inspection | None |
| P1.3 | Request indexing only for **top money URLs** after fixes | Treatments, country hubs, key profiles | Faster recrawl | Low | Spammy bulk requests | GSC URL inspection | Careful / limited |
| P1.4 | Keep path-preserving `.in` 301s; fix **destinations**, not the domain hop | All `.in` paths | Equity lands on 200 successors | Med | Hub dumps | Link destination audit | Per-URL |

---

## Priority 2 — Recover important landing pages

| # | Action | Scope | Benefit | Complexity | Risk | Validation | Approval |
|---|---|---|---|---|---|---|---|
| P2.1 | Rank GSC losing pages by impression/click Δ; map to inventory | Performance Pages export | Focus engineering/content | Low once data exists | Wrong priorities without data | Delta table | After export |
| P2.2 | Internal links from hubs → top treatment/country losers | `/`, `/treatments`, country hubs | Crawl + ranking support | Med | Over-optimization | Crawl + rankings | Content PR |
| P2.3 | Protect/enhance flat curated treatments & destination hubs | ~151 treatments + country landings | Core commercial SERPs | Med | Thin rewrites | Enquiry + GSC | Content |
| P2.4 | Doctor/hospital entity pages with proven demand | From Performance | Profile SERPs | Med | Facet spam | GSC | Selective |

---

## Priority 3 — Technical indexation hygiene

| # | Action | Scope | Benefit | Complexity | Risk | Validation | Approval |
|---|---|---|---|---|---|---|---|
| P3.1 | Protect PR #27 robots/www/WP-query hygiene | Global | Prevent soft-404 regression | Maintain | Regression | Synthetic probes | Protect |
| P3.2 | Monitor cold TTFB / Worker errors (1101/5xx) | Googlebot | Crawl efficiency | Ops | Premature cache tuning | Wrangler/GSC crawl | Ops |
| P3.3 | Review cost-path canonical lowercasing | `/costs/India/...` → `/costs/india/...` | Consistency | Low | Redirect churn | Canonical audit | If issues proven |
| P3.4 | Keep faculty-only hospital specialty noindex | Manipal/Lokmanya/Sahyadri facets | Avoid thin index bloat | Maintain | Weakening gates | Robots meta | **Do not weaken** |
| P3.5 | Sitemap vs Coverage reconciliation | EN/AR/blogs | Find true gaps | Med | — | After Coverage export | Data |

---

## Priority 4 — Rebuild organic keyword coverage (data-driven)

| # | Action | Scope | Benefit | Complexity | Risk | Validation | Approval |
|---|---|---|---|---|---|---|---|
| P4.1 | Build lost-keyword → URL table from SEMrush history | Top 100 by volume×prior position | True recovery backlog | Med | Chasing SEMrush artefacts | Filled `seo-lost-keywords-analysis.csv` | After SEMrush CSV |
| P4.2 | Content clusters on proven queries (treatments/countries) | Enquiry-weighted | Sustainable rankings | High | Mass thin pages | GSC + enquiries | Content strategy |
| P4.3 | Facet inventory thresholds only with crawl-dilution proof | Costs/doctor/hospital facets | Crawl budget | High | Over-pruning live URLs | Crawl stats + Performance | Explicit |

---

## Explicit non-goals / non-recommendations

- Do not promise restoration of **1,800 SEMrush keywords**.  
- Do not treat traffic estimate **1** as real traffic.  
- Do not homepage-301 legacy URLs.  
- Do not mass 301 `/ru/` → English.  
- Do not reopen protected **40×410** / **4×308** without contradicting equity evidence.  
- Do not delete large facet sets without Performance proof.  
- Do not deploy or change production from this forensic workstream alone.

---

## Suggested sequencing (after owner data)

```
Owner exports (P0.1–P0.3)
    → Verified 301 batch (P0.4)
    → Approved 410 expansion (P1.1)
    → Money-URL internal links + content (P2)
    → Keyword backlog from SEMrush/GSC (P4)
```

**No calendar ETA.** Recovery depends on crawl reprocessing and ranking systems outside our control.
