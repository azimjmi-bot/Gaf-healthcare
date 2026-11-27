# GAF Healthcare — 90-Day SEO Recovery, Growth & Measurement Roadmap

**Guiding Principle:** Stabilise indexing and conversion instrumentation first (Days 1–15), eliminate thin/duplicate bloat and ship structured data + priority geo/specialty hubs (Days 16–45), and scale topical authority, E-E-A-T completeness, and Arabic/English conversion growth (Days 46–90).

---

## 1. Execution Phases & Workstreams

### Sprint 0 / Days 1–10 — Priority Zero Deploy, Analytics & Lead Capture Fix
| Workstream | Action | Dependency / Gate | Verification |
|---|---|---|---|
| **Priority Zero (Prod Deploy)** | Deploy merged Phase 1 (`971406370173f080150735703a1d092b5648b75d`) to `gaf-healthcare-production` (Worker-only; `GAF_NEGATIVE_CACHE=OFF`; R2 `353d637` preserved) | Explicit owner deployment approval | Run `docs/seo-recovery/production-release-checklist.md` probes (`147` AR costs, `/ar/costs`, `424` canonicals, pagination, hreflang) |
| **GSC Validation & Exports** | Trigger **Validate Fix** for `54` live-200 URLs (`gsc-validation-list.csv`); export 16-month GSC (`Pages`, `Queries`, `Countries`, `Links`, `Indexing`), GA4, and CRM enquiry baseline | Owner GSC/GA4 access | Populate baseline metrics in Section 3 dashboard |
| **Conversion Fix (PR A)** | Restore `/consult` routing in `LocaleLink`; wire `POST /api/consult` to real lead persistence + coordinator alert; add report upload; add `gtag` conversion events (`consult_form_submit`, `whatsapp_click`, `phone_click`) | Coordinator webhook / email secret configured | Automated API & UI tests + GA4 DebugView verification |

### Sprint 1 / Days 11–30 — Technical Clean-Up, Duplication Removal & Schema Fixes
| Workstream | Action | Expected Impact | Branch / PR Scope |
|---|---|---|---|
| **EN Facet & Non-India Cost Gating (PR B)** | Extend `>=0.9` overlap + `<3` item gating to EN facets (`1,329` overlapping facets; `2,716` thin cost facets) after checking GSC 16m impressions whitelist; add `noindex,follow` on `1,676` unauthored non-India `CostsCountryView` pages (`!row.page`) | Cuts ~`3,000+` redundant/thin indexable pages from crawl queue; concentrates authority on core commercial pages | Independent feature branch + regression tests (`facet-canonical.test.ts`, `country-metadata.test.ts`) |
| **Held 308s & Verified 410s (PR C)** | Promote verified `200`-target nested treatment candidates (`10` rows max) after GSC Links + clinical review; retire zero-equity legacy `404`s (`406` obsolete taxonomy shapes, `66` `/resources/blog/*`, `129` `NO_MATCH` nested) to static `410` | Eliminates `~5.8s` soft-404 SSR hits; recovers backlink equity from legacy paths | `legacy-redirects.test.mjs` + `legacy-urls.test.ts` |
| **Cache, SSR Latency & Metadata Hygiene (PR D)** | Fix duplicate `Cache-Control` header on `/ar/doctors`; cache isolate cost directory index (`4.96s` → `<500ms` miss); trim `482 KB` cost HTML; fix `/ar` `og:url`, `site.description`, `"Best ..."` headings | Improves mobile CWV / TTFB / crawl rate; removes YMYL superlative & keyword-stuffing risk | `cf:build` + staging header/TTFB benchmark |
| **Structured Data Upgrade (PR E)** | Add `WebSite` schema; remove `aggregateRating` from `MedicalBusiness`; add `Article`/`BlogPosting` + `author`/`reviewedBy` `Person` JSON-LD on blogs & cost pages; verify `FAQPage` DOM parity | Protects against review-snippet penalty; boosts AI search entity attribution | Schema validator tests |

### Sprint 2 / Days 31–60 — Priority Markets, Doctor/Hospital Data & Specialty Authority
| Workstream | Action | Target Scope |
|---|---|---|
| **Missing Priority Country Hubs (PR F)** | Publish **`/cameroon/treatment-in-india`**, **`/iraq/treatment-in-india`**, **`/oman/treatment-in-india`**, **`/saudi-arabia/treatment-in-india`** + Arabic **`/ar/iraq/...`**, **`/ar/oman/...`**, **`/ar/saudi-arabia/...`**, **`/ar/sudan/...`**, **`/ar/somalia/...`** | Covers `10/10` priority markets in EN and launches Arabic corridor hubs (`0` → `5+`) |
| **AR `DoctorProfileGraph` & Internal Mesh (PR G)** | Enable localised `DoctorProfileGraph` on `/ar/doctors/*` (`2,602` profiles); add bidirectional Country ↔ Specialty ↔ Cost ↔ Blog links; remove links to `noindex`/redirect URLs | Strengthens Arabic internal PageRank across `4,843` AR URLs |
| **Gastroenterology & IVF Curated Build-Out** | Publish Tier-1 curated treatments for **Gastroenterology / Liver Transplant / Whipple / ERCP** (`0` → `8+`), **Neurosurgery AR** (`0` → `5`), **Cardiology AR** (`0` → `5`), **IVF EN+AR** (`1/0` → `6/6`) | Closes the highest-value commercial treatment gaps |
| **Doctor & Hospital Data Completion Batch 1** | Source-verified enrichment for top `300` priority-specialty doctors missing `education` (`1,118` total) & `image` (`2,417` total), plus `49/49` hospital `overview`, `highlights`, and `image` + `3` missing `accreditation` | Raises E-E-A-T completeness & profile CTR on top commercial cohorts |

### Sprint 3 / Days 61–90 — Editorial Scale, AI-Search Optimisation & International Expansion
| Workstream | Action | Target Scope |
|---|---|---|
| **90-Day Editorial Sprint** | Upgrade existing high-impression/low-CTR blogs + `/blogs/breast-cancer-follow-up-tests` (`allowIndex: false` → `true` once clinical depth added); publish `24–30` evidence-cited cluster articles across Cancer (Cervical, Ovarian, Pancreatic, Lung), GI (Liver Transplant, Whipple), Neuro (DBS, Epilepsy), Ortho (Hip, Revision Knee, Scoliosis), Urology (PCNL, Robotic Prostatectomy), IVF | Prioritised by GSC impressions, commercial intent, and cluster gaps; every article has Quick Answer, comparison tables, named clinical reviewer, references, and contextual CTAs |
| **Doctor & Hospital Data Completion Batch 2** | Complete remaining `818` verified `education` records + PubMed/ORCID verified `research` entries (`2,477` missing) for priority specialists | Full E-E-A-T graph coverage |
| **French (`/fr`) Vertical Slice Prep** | Complete `278/278` UI translations (`fr.ts`) + medically reviewed French translations for Cameroon/Senegal/Côte d'Ivoire hub + top `20` treatments & `15` cost guides (keep `fr` `noindex` until full QA passes) | Unlocks Francophone Africa (`Cameroon`, `Senegal`, `Côte d'Ivoire`, `DRC`, `Guinea`) safely |

---

## 2. Editorial Production Standards (Every New or Refreshed Article)

1. **Pre-Draft Brief:** Primary query, search intent, target cluster hub, non-cannibalisation check against `topical-authority-strategy.md`, target country relevance.
2. **Mandatory On-Page Structure:**
   - `40–70`-word **Quick Answer** directly below H1;
   - Plain-language clinical terminology explanations;
   - Factual comparison table (e.g., procedure vs alternatives, stay duration, recovery, India USD band with variance note);
   - Authoritative citations (NCCN, ESMO, AHA/ACC, ASRM, WHO, NABH/JCI);
   - Named author + specialty-matched medical reviewer + accurate `datePublished` / `dateModified` / `lastReviewed`;
   - Contextual internal links (`1` curated treatment + `1` cost guide + `1` doctor directory + `1` hospital hub + `2` sibling blogs);
   - Unobtrusive medical-report review CTA (`/consult?treatment=...` + WhatsApp).

---

## 3. Baseline & 90-Day Recovery Measurement Dashboard

*(All GSC, GA4, and CRM baseline cells marked `PENDING_EXPORT` must be populated from verified owner exports before setting numerical 90-day % targets.)*

| Metric Category | Metric | Verified Current Baseline (`2026-11-27`) | 30-Day Checkpoint | 60-Day Checkpoint | 90-Day Checkpoint | Source |
|---|---|---:|---:|---:|---:|---|
| **Index & Sitemaps** | Sitemap URLs (`EN / AR / Blogs`) | `8,294 / 4,843 / 111` (`13,248` total) | `~5,000 / 4,900 / 120` *(after EN bloat removal + AR hubs)* | Track | Track | `sitemap*.xml` |
| **GSC Indexing** | Valid Indexed Pages | `PENDING_EXPORT` | Populated + post-Phase-1 delta | Track | Track | GSC `Indexing → Pages` |
| **GSC Indexing** | Excluded: `404` / `Duplicate` / `Crawled not indexed` | `1,000` (partial 404 sample) / `PENDING_EXPORT` | Track drop in `404` & `Duplicate` | Track | Track | GSC `Indexing → Pages` |
| **GSC Traffic** | Organic Clicks & Impressions (Non-Brand vs Brand) | `PENDING_EXPORT` (28d `Pages-28d.csv` partial) | Baseline + 30d delta | Track | Track | GSC `Performance (16m)` |
| **GSC Traffic** | Average CTR & Position (Top 50 Cost/Treatment URLs) | `PENDING_EXPORT` | Track | Track | Track | GSC `Performance` |
| **Geo Traffic** | Organic Clicks by Priority Country (`TZ, KE, ET, UG, ZM, CM, SS, IQ, OM, SA`) | `PENDING_EXPORT` | Track `IQ/OM/SA/CM` launch | Track | Track | GSC `Countries` + GA4 |
| **Specialty Traffic** | Clicks & Landing Sessions across 8 Priority Specialties | `PENDING_EXPORT` | Track | Track | Track | GSC + GA4 |
| **Conversions** | `consult_form_submit` + `whatsapp_click` + `phone_click` | `0` tracked (`gtag` uninstrumented; `/consult` hijacked) | **100% instrumented** + baseline count | Track CVR | Track qualified lead growth | GA4 (`G-F12D7QK2B2`) + CRM |
| **Performance** | Cold Miss TTFB (`costs` / `ar/costs`) & HTML Size | `3.19s–4.96s` miss (`172ms` hit); `482 KB` max HTML | `< 800 ms` miss; `< 200 KB` HTML | `< 500 ms` miss | Maintain | Synthetic + CrUX / CWV |
| **Crawl Health** | `404` / `410` / `308` / `5xx` Edge Trends | Prod `b5cefe53` (`0` 5xx on staging `7dd6e57`) | Monitor `410` shift & `0` `5xx` | Track | Track | Cloudflare Analytics + GSC |
