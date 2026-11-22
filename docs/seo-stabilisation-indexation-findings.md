# SEO Stabilisation — Indexation & Crawl Health (Phase 3)

**Probed:** 2026-11-22 against production Worker `d54aff0e` / stamp `8eabd88`.  
**Compared to:** Forensic PR #44 baseline.

## Controls checked

| Control | Finding | Action in this PR |
|---|---|---|
| `robots.txt` | `Allow: /` + sitemap index reachable | None |
| Sitemap index | Lists EN/AR/blogs locale files | None |
| EN sitemap | Large published set; **no** nested `/treatments/{specialty}/{leaf}` pattern for pacemaker | Test asserts nested pacemaker absent; successor listed |
| AR sitemap | Publication-gated; unpublished facets excluded | None (gates preserved) |
| Canonicals (sampled commercial) | Self-referencing absolute `https://gaf.healthcare/...` | None |
| Hreflang | Reciprocal EN↔AR when AR published; omit when unpublished | None |
| noindex | Correct on unpublished/empty facets; faculty-only hospital specialty rules unchanged | None |
| SSR commercial HTML | Substantial SSR for treatments/doctors/hospitals/countries (Googlebot + browser) | None |
| CF 1101 | Not observed on Phase 1 probe set | Monitor post-deploy |
| Soft-404 | Nested pacemaker was HTML 404 + noindex (pre-redirect) | Redirect removes soft-404 for this URL only |
| Cold Googlebot TTFB | Multi-second on some routes (also noted in PR #44) | Monitor; not a code change here |

## Publication-gate posture

**Unchanged.** Do not weaken gates to inflate sitemap counts. Faculty-only hospital specialty noindex rules preserved.

## Important commercial availability (sample)

| Class | Sample result |
|---|---|
| Treatment (flat) | 200 + self-canonical |
| Doctor profile | 200 |
| Hospital profile | 200 |
| Country landing | 200 |
| City landing | 200 |
| Cost page | 200 |
| Nested pacemaker (pre-fix) | 404 |
| AR IVF treatment (unpublished) | 404 — expected under gate |

Full probe JSON: `/opt/cursor/artifacts/seo-stab-phase1-probes.json` (agent artifact; not committed).
