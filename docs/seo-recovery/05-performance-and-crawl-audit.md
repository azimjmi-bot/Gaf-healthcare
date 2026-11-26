# Technical Performance & Crawl Efficiency Audit

**Baseline Audited:** Production SHA `b5cefe53c375feb5364b3c17198b6e8738329405`  
**Production Runtime:** Cloudflare Worker `332293be-d958-4a93-9dfd-9c413423f5d0` | OpenNext (`@opennextjs/cloudflare`) | R2 Stamp `353d637` | `GAF_NEGATIVE_CACHE: OFF`  
**Scope:** Section 5 (all 12 performance questions) + deep dive on `ar-publication-index` (`Symbol.for` shared registry), cold vs warm TTFB, and 404 crawl-slot contention.

---

## 1. Architecture Overview (`src/worker/runtime.ts` & `src/proxy.ts`)

1. **Edge Redirects & Proxy (`src/proxy.ts` + `legacy-redirects.mjs`):**
   - `wwwToApexRedirect`: 301 `www.gaf.healthcare` → `https://gaf.healthcare` (checked at both Worker and proxy boundaries).
   - `legacyRedirects` (`next.config.mjs` via `legacy-redirects.mjs`): 13 permanent `308` rules.
   - `isLegacyGonePath` / `isLegacyWordpressQuery` / `resolveLegacyEntityPath`: returns cacheable `410` (`s-maxage=86400`, `X-Robots-Tag: noindex`) at the proxy edge *before* App Router or R2 hydration.
   - `catalogCanonicalRedirect`: 301 strips `(parens)` and lowercases `/doctors`, `/hospitals`, `/costs`. *(Bug: checks lowercase `CATALOG_ROOTS` before `.toLowerCase()`, so `/Doctors/...` misses and hits App Router 404.)*
   - Locale rewrite (`withLocale`): strips `/ar`, `/fr`, `/ru`, `/sw`, sets `x-gaf-locale` / `x-gaf-path` headers, and re-enters Worker (`cf-worker` verified), except static Arabic India doctor directories (`isArabicDoctorHtmlPath`), which skip App Router rewrite.
2. **Worker Cache & Concurrency Layer (`src/worker/runtime.ts`):**
   - **Pre-packed Sitemaps & AR Index:** Serves `/sitemap-{locale}.xml` and `/_gaf/ar-publication-index.json` directly from Worker `ASSETS` (avoiding Cloudflare CPU 1102 timeouts on live sitemap generation).
   - **HTML & RSC Cache (`caches.default`):** Public GET/HEAD responses carry `Cache-Control: public, s-maxage=300, stale-while-revalidate=86400` (`CDN-Cache-Control` matched). Tracking params are normalized out of cache keys.
   - **Render Queue Gate (`MAX_INFLIGHT_RENDERS = 8`):** Protects the 128 MiB Worker isolate against memory spikes by queueing concurrent uncached SSR renders (returning `503` if `GAF_RENDER_QUEUE_MS` expires).
   - **R2 Content Backend (`R2ContentStorage`):** Loads versioned CMS & catalog blobs (`catalog-cms.json`, `ar/catalog-cms.json`, per-slug objects) into isolate memory once per isolate + checks R2 stamp/generation (`353d637`) for cross-isolate invalidation.

---

## 2. Direct Answers to Section 5 Questions (1–12)

| # | Question | Verified Findings (`b5cefe53` / `353d637`) |
|---|---|---|
| **1** | **Which routes are statically rendered, SSR or cached?** | • **Build-time Assets (`ASSETS`):** `robots.txt`, `/_next/static/*`, `/sitemap-*.xml`, `/_gaf/ar-publication-index.json`.<br>• **Edge `410` / `301` / `308`:** WordPress leftovers & redirects at Worker/proxy layer.<br>• **Static/Edge HTML (`isArabicDoctorHtmlPath`):** `/ar/doctors/india*` (non-query) cached at CDN (`s-maxage=300`).<br>• **Dynamic SSR + Worker `caches.default` (`s-maxage=300`, `stale-while-revalidate=86400`):** All `/treatments/*`, `/blogs/*`, `/doctors/*`, `/hospitals/*`, `/costs/*`, `/<country>/treatment-in-india`.<br>• **Uncached (`private, no-cache`):** `/cms/*`, `/api/*`, authenticated requests, and **all non-410 `404` responses (`GAF_NEGATIVE_CACHE: OFF`)**. |
| **2** | **Which routes experience slow cold requests?** | Cold isolate startup + R2 hydration + large dataset parsing pushes **cold misses up to `1.8s–5.5s`**, specifically:<br>• First cold hit on catalog/cost/AR routes requiring R2 hydration.<br>• **Uncached `404` renders** (`unknown_hospital` max **`5,500 ms`**, `unpublished_ar` max **`5,232 ms`**, `valid_404` max **`5,204 ms`** in `seo-pr45-ttfb-probes.json`). |
| **3** | **Which routes generate unnecessary R2 reads?** | Prior to `ar-publication-index`, **every English catalog route** hydrated the entire Arabic R2 dataset (`~9.3 MB` `ar/catalog-cms.json` + `131` per-slug objects) just to calculate `hreflang`! On `b5cefe53`, `ar-publication-index` eliminates EN→AR hydration on `CROSS_LOCALE_CATALOG_ROOTS` (`/`, `/blogs`, `/treatments`, `/doctors`, `/hospitals`, `/costs`). Residual R2 hydration still happens when uncached `/ar/*` or `/ru/*` / `/fr/*` / `/sw/*` routes hit cold isolates, or if `/_gaf/ar-publication-index.json` ever fails to install. |
| **4** | **Are any English pages unnecessarily loading Arabic data?** | **Fixed on `b5cefe53` for catalog routes** via `ar-publication-index` (`Symbol.for("gaf.ar-publication-index")`), **with two caveats:** (a) non-catalog EN routes outside `CROSS_LOCALE_CATALOG_ROOTS` (or `ar-publication-index` fallback if cleared) still fall back to full AR hydration; (b) `ar-publication-index` is build-time static (updated on deploy, same as sitemaps — newly CMS-published AR content is not reflected in EN `hreflang` until next build/deploy). |
| **5** | **Are there expensive operations on every request?** | On **cache HITs** (`caches.default`), Worker serves directly in `~118–187 ms` with minimal CPU. On **cache MISSes**, `proxy.ts` + App Router SSR evaluates `costs` (`419` treatments + `costArticles`), `doctors` (`2,602`), `hospitals` (`49`), JSON-LD builders, and `400+ KB` RSC/HTML serialization (`426,985` bytes on `/treatments/breast-cancer-treatment-in-india`, `478 KB` on `/costs/<slug>`). |
| **6** | **Are 404 pages unnecessarily expensive?** | **YES — Confirmed Major Bottleneck.** Because `GAF_NEGATIVE_CACHE` is **`OFF`** on apex, every non-410 404 (e.g., `/ru/*`, `/resources/blog/*`, `/treatments/<spec>/<leaf>`, `/Doctors/*`) **bypasses `caches.default`**, consumes one of only `8` `MAX_INFLIGHT_RENDERS` slots, executes full Next.js App Router `not-found.tsx` layout rendering (`30–45 KB` HTML), and returns `Cache-Control: private, no-cache`. In `seo-pr45-ttfb-probes.json`, cold 404s hit **`5,204–5,500 ms`**. |
| **7** | **Are there duplicate database or R2 requests?** | `R2ContentStorage` caches loaded edition groups in isolate memory + deduplicates concurrent hydrations via singleflight (`isCrossRequestPromiseError` handling), avoiding duplicate R2 fetches within a warm isolate. However, **internal OpenNext locale rewrites** (`withLocale` in `proxy.ts`) trigger a second Worker fetch per `/ar/*` request (mitigated when cached at edge). |
| **8** | **Are any large content files being loaded unnecessarily?** | `ar/catalog-cms.json` (`~9.3 MB`) + `content/cms` JSON payloads + `cost-articles` bundle (`419` treatments × `5` cities) inflate per-isolate JS heap on cold Arabic or cold catalog misses. Splitting `ar-publication-index.json` (`3,435` path strings) removed `~9.3 MB` from EN-only isolates. |
| **9** | **Are there memory or concurrency bottlenecks?** | **Yes.** Cloudflare Workers isolate memory (`128 MiB`) + `MAX_INFLIGHT_RENDERS = 8` concurrency ceiling. Under crawl bursts hitting uncached `404`s or cold AR misses (`GAF_NEGATIVE_CACHE: OFF`), uncached 404 renders occupy render slots and risk queueing (`GAF_RENDER_QUEUE_MS`) or `503` shedding during bot spikes. |
| **10** | **Are HTML responses properly cached?** | **Valid `200` GET pages: Yes** (`public, s-maxage=300, stale-while-revalidate=86400`, tracking params stripped). **Wait:** `300s` (`5 min`) `s-maxage` + isolate-local `caches.default` means regional Cloudflare POPs still experience frequent `MISS` revalidations on low-traffic long-tail URLs (`13,247` sitemap URLs). **404 responses: No** (`GAF_NEGATIVE_CACHE: OFF`). |
| **11** | **Is Googlebot receiving the same meaningful HTML as normal visitors?** | **Yes — Confirmed.** Live probes (`User-Agent: Googlebot/2.1` vs default client) returned identical byte lengths (`258,782` bytes on `/`, `426,985` bytes on `/treatments/breast-cancer-treatment-in-india`), identical `meta robots`, canonicals, `hreflang`, and JSON-LD. |
| **12** | **Are there differences between cold and warm performance?** | **Dramatic.**<br>• **Warm `caches.default` HITs (`perf-phase2-route-measurements.json` & `seo-pr45-ttfb-probes.json`):** median **`118–187 ms`**.<br>• **Warm Isolate / Edge Cache MISS:** median **`178–373 ms`**.<br>• **Cold Isolate + R2 Hydration / Uncached 404:** **`1,800–5,500 ms`** (`10x–30x` slower than warm HITs). |

---

## 3. Deep Dive: Arabic Publication Index (`Symbol.for` Registry) Audit

- **Implementation (`src/lib/i18n/ar-publication-index.ts`, `src/worker/runtime.ts`):**
  - During `cf:build`, `scripts/cloudflare/pack-ar-publication-index.ts` writes `/_gaf/ar-publication-index.json` (`3,435` English paths derived from `buildLocaleSitemap("ar")`).
  - Previously (PR #49/#54 incident), module-scoped `let` state caused the Worker entry bundle to populate its copy while the separate OpenNext server bundle saw an empty set and fell back to cold `content/ar/*` R2 hydration (`1101` CPU / latency spike).
  - Current `b5cefe53` uses **`Symbol.for("gaf.ar-publication-index")`** on `globalThis`, ensuring Worker entry and OpenNext render bundles share one registry (`ar-publication-index.dual-bundle.test.ts` covers this).
- **SEO & Operational Tradeoffs Identified:**
  1. **Deploy-time coupling:** `ar-publication-index.json` only updates on Worker build/deploy, mirroring `sitemap-ar.xml` staleness (safe for stability, requires re-deploy when new AR sections launch).
  2. **Inherited Sitemap Bug (`147` Paths):** Because `pack-ar-publication-index.ts` extracts directly from `buildLocaleSitemap("ar")`, **all `147` `/ar/costs/india/<city>/<specialty>` paths that currently render `noindex, follow` on live AR are inside `ar-publication-index.json`**, causing EN pages to advertise `hreflang="ar"` pointing to `noindex` AR pages!
  3. **Crawl-Efficiency Opportunity:** Enabling `GAF_NEGATIVE_CACHE` (already coded & unit-tested in `src/worker/negative-cache.ts`, currently `OFF` on apex) for `404` HTML responses (with strict exclusion for `/cms`, `/api`, `?preview`, and authenticated cookies) would immediately shield the `8`-slot render pool from the `~720` unresolved GSC 404 patterns and `/ru/*` bot traffic. *(Do not enable without explicit owner approval & verification.)*
