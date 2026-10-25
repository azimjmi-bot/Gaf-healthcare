# Stage 3 — Cloudflare Workers + R2 (plan and gate results)

Stage 3 moves the content layer onto R2 behind the `ContentStorage` seam from
Stage 2 (`docs/content-storage.md`) and runs the site as a Worker through
`@opennextjs/cloudflare`. This document is the implementation plan and the
gate list. **Nothing here is deployed, routed or seeded.** The Hostinger path
(`GAF_STORAGE` unset → file-system backend, `npm start` → `server.mjs`) stays
the production path throughout.

## 0. Prerequisites and how each is verified

All four must pass before any Cloudflare-specific code is added. They need an
API token and account id in the agent environment; the agent never prints
their values.

| Prerequisite | Verification | Status |
|---|---|---|
| Credentials via the secure secrets interface | `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` present as environment variables (Cursor Dashboard → Cloud Agents → Secrets, scoped to this repository). `GET /client/v4/user/tokens/verify` (or `/accounts/{id}/tokens/verify` for an account-owned token) returns `status: "active"`. | **token active, not stored in the repo** — §4.11. `user/tokens/verify` returned `status: "active"`. The account id is not an environment variable and is not written in this file |
| Workers Paid enabled | `GET /client/v4/accounts/{id}/subscriptions` lists a rate plan for Workers Paid (`workers_paid`). Needed for the 128 MB / 30 s+ CPU limits and R2-backed ISR. | **unverified** — that call returned HTTP 403, error 10000 Authentication error (§4.11). The token cannot read subscriptions |
| R2 available | `GET /client/v4/accounts/{id}/r2/buckets` returns 200 (an account without R2 enabled returns an "R2 not enabled" error). | **not enabled** — HTTP 403, error 10042 “Please enable R2 through the Cloudflare Dashboard.” (§4.11) |
| Staging buckets | `wrangler r2 bucket list` shows `gaf-content-staging` and `gaf-static-staging`, or `wrangler r2 bucket create <name>` succeeds. | **not created** — the bucket list cannot succeed until R2 is enabled. Nothing was created |

Token scopes required: *Account Settings: Read*, *Workers Scripts: Edit*,
*Workers R2 Storage: Edit*, *Workers Tail: Read* (for `wrangler tail` during
the memory gate). No zone or DNS permission is needed or wanted for Stage 3.

Facts established without credentials:

* Egress to `api.cloudflare.com` works from the agent environment (the API
  answers `400 Missing "Authorization" header`).
* The toolchain is installable and compatible: `@opennextjs/cloudflare`
  1.20.12 declares `next >=15.5.28 <16 || >=16.4.1` and `wrangler ^4.148.0`;
  the repo is on Next 16.4.2 (Stage 1).
* Rechecked 2026-10-21, read-only. `gaf.healthcare` and `www.gaf.healthcare`
  resolve to Cloudflare anycast `104.21.53.76` and `172.67.210.99` (plus
  IPv6). `https://gaf.healthcare/` is HTTP/2 200 with `server: cloudflare`,
  `platform: hostinger`, `x-turbo-charged-by: LiteSpeed`, and
  `x-powered-by: Next.js`. Hostinger is still the origin. DNS was not
  migrated or edited in this pass. `staging.gaf.healthcare` is NXDOMAIN and
  was not created. Detail is in §4.9.

## 1. Toolchain and build

* `@opennextjs/cloudflare` + `wrangler` as devDependencies only. Nothing in
  `src/` imports them except the Worker entry (§3) and the R2 backend (§2),
  neither of which is reachable on the Hostinger path.
* `open-next.config.ts`: `buildCommand` set to the existing
  `npm run build` so the webpack build, `keep-previous-static` stash/restore
  and the 4 GB heap flag are reused unchanged; `incrementalCache` =
  R2 (bucket `gaf-static-staging`, prefix `__opennext/`) because the sitemap
  routes declare `revalidate = 300`; `queue` = `memoryQueue`; no tag cache.
* `wrangler.jsonc`: `compatibility_flags: ["nodejs_compat"]`, `main` = the
  custom entry (§3), `assets` = `.open-next/assets`, R2 bindings
  `CONTENT → gaf-content-staging` and `STATIC → gaf-static-staging`, vars
  `GAF_STORAGE=r2`. **No `routes`, no `custom_domain`, no production env.**
  The only addressable deployment in Stage 3 is a `workers.dev` preview of
  the staging environment, and even that is deployed only when explicitly
  approved; local verification uses `wrangler dev`.
* `src/instrumentation.ts` already returns unless `NEXT_RUNTIME === "nodejs"`;
  on Workers it must additionally return before importing
  `server-tuning.mjs` / `server-cache.mjs` (detected by `navigator.userAgent
  === "Cloudflare-Workers"`). The origin HTML cache is replaced by the edge
  cache on Workers; on Hostinger it is unchanged.

## 2. R2 backend behind `ContentStorage`

`src/lib/storage/r2.ts` — `R2ContentStorage`, per `docs/content-storage.md` §3.

* Constructed with `{ content: R2Bucket, static: R2Bucket, assets: Fetcher }`.
  Keys under `public/uploads/` map to the `static` bucket under `uploads/…`;
  every other `content/**` key maps to the `content` bucket. Any other key is
  a `StorageKeyError` (there is no reason for a `public/` read on Workers
  other than uploads once §6 lands).
* In-isolate map `key → { body, etag }`. `read`/`readBytes`/`list`/`version`
  are served from the map; `version()` is the R2 etag. Bodies of 1 KB and
  more are held **deflated** (`node:zlib` `deflateRawSync` on hydrate,
  `inflateRawSync` on read, native in workerd under `nodejs_compat`): the
  30 MB of edition JSON is ~5 MB packed, and the parsed copies the CMS stores
  cache are the same data again, so holding both raw would not fit the
  isolate (§4.2). Reads are rare because the stores only re-read on a
  version change; a cold inflate of the largest object (8 MB) is ~5 ms.
* The one-file-per-slug directories (`content/ar/articles`,
  `content/ar/treatments`) are parsed once per listing version by
  `readCachedJsonDirectory` (`src/lib/cms/json-file-cache.ts`); the version is
  the sorted listing with each file's etag, so a save, upload or deletion of
  any file invalidates it on the next read. Same semantics on the
  file-system backend (`mtime:size` per file).
* `write()` applies optimistically to the map and enqueues
  `put(key, data, { onlyIf: { etagMatches } })` (or `etagDoesNotExist` for a
  new key). `flush()` awaits the queue; on failure the map entry is **rolled
  back** to the previous `{ bytes, etag }` and `flush()` rejects. A
  precondition failure rejects with `StorageConflictError`; the routes map it
  to **409** (one shared helper in `src/lib/storage/index.ts`, used by every
  write route's existing `catch`). Hostinger behaviour is unchanged because
  the file-system backend never throws it.
* `remove()` is `delete` + map eviction, queued the same way.
* Default selection stays `GAF_STORAGE=r2 → throw` in `createDefaultStorage`;
  the Worker entry must call `setContentStorage()` explicitly. A route that
  somehow runs before that sees an exception, never empty content.

### Tests (`src/lib/storage/r2.test.ts`, under `test:unit`)

A `FakeR2Bucket` implementing `get/put/delete/list/head` with `httpEtag`,
`onlyIf.etagMatches / etagDoesNotExist`, injectable failures and an optional
"another isolate wrote in between" hook. Cases:

* parity with `exerciseBackend()` from `storage.test.ts`;
* **ETag conflict**: isolate A and B hydrate the same etag, both save; the
  second `flush()` rejects with `StorageConflictError`, its map rolls back, a
  re-hydration sees A's content;
* **concurrent updates to different keys** flush independently; two writes to
  the same key in one isolate are serialised and the final etag chain is
  consistent;
* **failed write** (bucket throws): `flush()` rejects, map rolled back,
  `readCms` still returns the previous store; `write()` itself never throws
  for a queued failure;
* **rollback** does not disturb a later successful write to another key;
* **cache invalidation**: `version()` changes after a successful flush and
  after re-hydration picks up an external etag; `readCachedJsonFile` re-parses
  exactly once per change; the content version object (§4) is rewritten after
  each successful flush.

## 3. Worker entry and initialisation

`src/worker.ts` is the `main`; it wraps the generated `.open-next/worker.js`:

```
fetch(request, env, ctx):
  storage = storageFor(env)                      # one per isolate
  group   = editionGroupFor(request)             # §4
  try { await storage.ensureHydrated(group) }    # list + gets, or 304 check
  catch (e) { return 503 "content unavailable", Retry-After: 10, log e }
  if path starts with /uploads/ → §5
  return openNext.fetch(request, env, ctx)
```

* `ensureHydrated` fails — and the request is answered **503** — when the
  bucket is unreachable, when `content/.manifest.json` is missing, or when
  any key the manifest lists for the group is missing. The manifest is
  written by the seeding script (Stage 4, with approval) and lists the keys
  each edition requires. An empty bucket is therefore an error, not an empty
  CMS; `loadCms()`'s `fallbackStore` is only reached for a key the manifest
  explicitly marks optional (the `fr/ru/sw` placeholders).
* Hydration runs **before** `openNext.fetch`, so no route, `generateMetadata`,
  sitemap builder or proxy rewrite can call `read()` on an unhydrated map.
  `setContentStorage()` is called once per isolate before the first await.
* The `/api/cms/**` write routes already `await flushContentWrites()` inside
  their `try`; the entry does not use `waitUntil` for content writes.

## 4. Edition-specific loading and the memory gate

Groups (from `docs/content-storage.md` §3.6): `en` = `content/cms.json`,
`content/catalog-cms.json`, `content/curated-treatments.json`;
`ar` = `content/ar/**`; `fr|ru|sw` = their two small files;
`cms` = `content/ai-generations.json` (only for `/api/cms/ai/*`).

* The group is chosen from the path prefix (`/ar/…`) or the `edition`
  query/cookie for `/cms` and `/api/cms` requests; an Arabic request hydrates
  `ar` **and** `en` (Arabic overlays the English catalog); an English request
  never loads `content/ar/**`.
* Staleness: `content/.version.json` is fetched with `If-None-Match` on every
  request after the first; a 200 names the groups to re-hydrate. Bounded by
  one request, as specified.
* After `readCachedJsonFile` holds the parsed value the backend drops the
  string body and keeps only the etag.

Memory verification (all three, numbers go in the Stage 3 report):

1. **Node proxy**: hydrate `en`, then `en+ar`, through the stores under
   `node --max-old-space-size=100` and record `heapUsed` after a forced GC;
   must stay under 70 MB for `en+ar` to leave room for the Next runtime.
2. **workerd**: `wrangler dev` with `--inspector-port`, take a heap snapshot
   after the 50-URL snapshot run plus 200 Arabic facet URLs; record retained
   size.
3. **Isolate limit**: `wrangler tail` during the same run on the staging
   preview (if deployment of the preview is approved); zero
   "exceeded memory limit" events and zero 1102 errors.

If (1) or (2) exceeds budget the per-slug Arabic article and treatment files
become the eviction unit (they are read on demand via `list` + `read`); if
that is still insufficient the stage stops and reports.

### 4.1 What was found while building (supersedes the group rule above)

Every public page reads every published edition: the language switcher and
the hreflang block ask whether the Arabic equivalent of the page exists, the
blog routes read `content/ar/articles/**` for the alternates, and the
`fr|ru|sw` stores are consulted for the same reason. So an English isolate
cannot skip `content/ar/**`; `groupsForRequest()` hydrates all five public
groups for every public request and adds the CMS-only group for `/cms` and
`/api/cms/*`. The memory gate therefore has to be met with **all** editions
resident.

### 4.2 Measurements (local `workerd` via `wrangler dev`, 2026-10-20)

Method: Chrome DevTools Protocol on the inspector port,
`HeapProfiler.takeHeapSnapshot` (forces a full GC), then
`Runtime.getHeapUsage`. "live" is `usedSize` after that GC; "external" is
`backingStorageSize` (ArrayBuffers, i.e. the packed content). The isolate is
warmed with 22 URLs covering `/`, doctors, hospitals, costs, treatments,
blogs, country pages, their `/ar` counterparts, `/fr|ru|sw`, and the sitemaps.

| State of the bundle / backend | code only | all editions hydrated |
|---|---|---|
| OpenNext output as generated (31 MB script, 159 non-ASCII chars in regex literals → V8 stores the whole source as 2-byte) | 61.6 MiB | 134.9 MiB |
| + post-build ASCII escape of generated scripts | 32.0 MiB | 115.1 MiB (+32 MiB external, bodies held raw) |
| + `minify: true` in `wrangler.jsonc` (26 MB script) | 27.0 MiB | — |
| + content held deflated in the isolate (`deflateRawSync` on hydrate, `inflateRawSync` on read) | — | 109.7 MiB (+7.2 MiB external) but ~1 s CPU per Arabic page: the per-slug directories were inflated and parsed on every render |
| + per-slug directories parsed once per listing version (`readCachedJsonDirectory`) | — | **123.3 MiB live + 7.2 MiB external**, Arabic pages 50–90 ms |

Where the 123 MiB goes (heap snapshot, self sizes): script source 24.9 MiB
(one copy, one byte per char); compiled code 16.5 MiB; the
`src/data/ginger-catalog.json` literal as a 2-byte string 8.5 MiB (the
webpack `JSON.parse('…')` wrapper keeps the literal alive, and the same
4.6 MB JSON is in the source twice: once in the server-components chunk and
once in the SSR chunk because `consult-form.tsx` imports `@/lib/hospitals`);
parsed content and catalog ~45 MiB (Arabic text is 2 bytes per character in
V8; `content/ar/catalog-cms.json` alone is 18 MB of doctor overrides); Next
and React runtime objects ~15 MiB.

Node proxy (`node --max-old-space-size=100`, stores hydrated en+ar+fr+ru+sw):
59.8 MiB `heapUsed` with bodies held raw.

### 4.3 Result: the memory gate is **not** passed

Live heap after a full GC is 123.3 MiB and total isolate memory (heap +
external) is ~130 MiB, against the Workers hard limit of 128 MiB. The limit
is a kill, not a slowdown, and a render needs headroom above the live set
(before GC the warm isolate stands at ~157 MiB). A staging deployment with
this bundle would be terminated as soon as an isolate had served English and
Arabic pages, so it is not safe to deploy. Per the stage brief this is
reported as a blocker rather than worked around by dropping editions, lazily
hydrating (which the hreflang reads rule out) or trimming content.

What would close the gap, each a change beyond the Stage 3 brief and
therefore needing approval:

1. **Take the static catalog out of the Worker script** (est. −17 MiB): load
   `src/data/ginger-catalog.json` through storage/assets on Workers instead
   of bundling it. It is imported statically by `lib/doctors.ts` and
   `lib/hospitals.ts`, so this needs a platform-specific loader and touches
   every catalog consumer.
2. **Stop the consult form importing the whole catalog** (est. −5 MiB in the
   Worker, and −4.6 MB of JavaScript shipped to every visitor's browser):
   `components/consult-form.tsx` only needs hospital and treatment names.
   Changes the client bundle, so it changes page HTML (chunk names), not
   content.
3. **Parse Arabic doctor overrides on demand** (est. −15–20 MiB): keep the
   packed bytes and materialise one doctor's override when asked, instead of
   holding all 2,300 parsed. `loadCatalogCms()` returns the full object and is
   iterated by sitemaps and list pages, so this is a loader redesign with an
   eviction policy.
4. **Split the site into two Workers** (English, Arabic) behind a routing
   Worker: each isolate still needs the other edition's publication state for
   hreflang, so this only works with a small precomputed "which slugs exist in
   the other edition" index, which is new derived data to keep in sync.

Any one of (1)+(2) or (3) should bring the live set to roughly 100 MiB; the
gate should then be re-run with the same probe and additionally on a staging
preview with `wrangler tail` (§4 item 3) before a deploy is called safe.

### 4.4 Remediation round 1: options (1) and (2) (2026-10-21)

Approved and implemented on this branch, one commit each:

* **(1) Catalog out of the bundle** — `src/lib/catalog-seed.ts`. The
  `Doctor[]`/`Hospital[]` arrays are built on first access from
  `src/data/ginger-catalog.json` read through `contentStorage()`; the parsed
  seed is dropped once both arrays exist (`withCatalogSeed`). On Hostinger
  the file-system backend reads the file from the checkout. On Workers
  `post-build.mjs` copies it into the assets under `/_gaf/`, the R2 backend
  loads it through the `ASSETS` binding at hydration (an `ASSET_KEYS`
  entry, like the Arabic stylesheet), and `/_gaf/*` is `run_worker_first`
  → 404, so it is never a public URL and never an R2 object. A missing or
  malformed seed throws `CatalogUnavailableError` (Worker: 503), never an
  empty catalog. `post-build.mjs` fails the build if the first doctor slug
  is found in `handler.mjs`, so a static import cannot come back unnoticed.
  Tests: `src/lib/catalog-seed.test.ts`, `src/lib/catalog-load.test.ts`,
  `src/worker/runtime.test.ts` (asset load, missing asset → 503, `/_gaf/*`
  → 404), `src/lib/storage/r2.test.ts`.
* **(2) Consultation form** — `src/lib/consult-options.ts`. The page computes
  `{slug, name}` lists (same rows, same order) and passes them as props; the
  rendered form markup is byte-identical to before (verified by rendering
  both versions with `renderToStaticMarkup`). A second client chain reached
  the catalog through `hospital-gallery.tsx → hospital-profile.ts →
  treatments.ts` for one pure predicate; that predicate moved to
  `src/lib/treatment-specialty.ts`. `src/lib/consult-options.test.ts` walks
  the value-import graph of every `"use client"` module and fails if any
  reaches the catalog or storage. The two 4.6 MB browser chunks are gone
  from `/consult` (largest chunk now 242 KB).

Measurements (same CDP method as §4.2; 30 URLs: the 22 of §4.2 plus
`/consult`, a doctor, a hospital and a facet page in both editions, `/costs`,
`/specialties`, `/blogs`):

| State | code only | en+ar+fr+ru+sw+sitemaps hydrated, post-GC |
|---|---|---|
| Before (§4.2 last row) | 27.0 MiB | 123.3 MiB live + 7.2 MiB external = **130.5 MiB** |
| After (1)+(2) | 18.2 MiB (+1.4 MiB external) | 98.5 MiB live + 7.8 MiB external = **106.3 MiB** |

Heap snapshot of the warm isolate (self sizes): script source 16.1 MiB (was
24.9), compiled code 17.2 MiB, the 8.5 MiB catalog literal gone; strings
69.1 MiB total (was 92.7), of which the remainder is parsed content (the
Arabic stores dominate, 2 bytes per character).

Repeated requests and peak:

* Without a heap cap V8 defers collection, so "peak" is not meaningful
  (heap climbs to 170 MiB before a major GC and returns to the live set).
* With workerd's heap capped near the platform limit
  (`MINIFLARE_WORKERD_V8_FLAGS=--max-heap-size=120`, heap only, external
  not counted), two fresh isolates each served the 30 URLs sequentially,
  then ×5 at concurrency 4, ×5 at concurrency 8 and ×10 at concurrency 2
  (630 requests each). One isolate served all 630 (slowest 516 ms). The
  other died with `Ineffective mark-compacts near heap limit` at request
  ~600 (last GC: 105.3 MiB live of 108.5 committed), i.e. the live set
  during a render sits ~7 MiB above the post-GC figure and V8 needs more
  than ~15 MiB of headroom above it to keep collecting.
* The full Arabic sweep (`check:alternates`, 4,239 URLs, plus the 40-URL
  snapshot; 8,745 requests in total, no cap) completed with no errors, but
  the post-GC live set afterwards was **121.8 MiB + 7.8 MiB external =
  129.6 MiB**: +23 MiB over the 30-URL figure. The snapshot attributes the
  growth to code (17.2 → 22.9 MiB, more route modules compiled and
  optimised) and small strings (+16 MiB; consistent with lazily-required
  route and data modules staying resident once loaded; the app's own caches
  are bounded, OpenNext's R2 cache keeps nothing in memory, and this was not
  traced further).

Result: the ≤ 110 MiB target is met for the exercise it was defined on
(106.3 MiB after the six route classes), with a 4 MiB margin to the target
and ~22 MiB to the isolate limit. It is **not** met with a meaningful margin:
an isolate that has served the whole site sits at ~130 MiB after GC, and a
capped isolate died once in two runs of 630 requests. Per the brief, work
stops here for review before option (3).

Parity on this build (`wrangler dev`, local R2): `check:ssr-snapshot` against
the previous commit's own Worker capture (`/tmp/stage3/after.json`) — 40
URLs, bodies identical, the only 6 differences are ISR `s-maxage` countdown
seconds; `check:alternates` — all 4,239 Arabic URLs self-canonicalise with
reciprocal hreflang, the same single pre-existing drift as the Stage 1
baseline; `test:unit` 435/440 (the same 5 `server-only` failures as before,
15 new tests green), `test:storage` 8/8; `test:specialty-engine` the same 6 pre-existing
failures as on `6b39694`, none new.

## 4.5 Profiling the growth (2026-10-21, no runtime change)

No source file changed in this pass. The question was whether the climb from
106.3 MiB (30 URLs) to 129.6 MiB (full sweep) is a leak, and whether Option 3
is the right next edit. It is not a leak. The retained set plateaus, and the
cap kills the isolate earlier than the sweep, on the ordinary 30-URL set.

### What is comparable

Post-GC `Runtime.getHeapUsage` (`usedSize` = heap, `backingStorageSize` =
external). Forcing GC with a discarded heap snapshot and forcing it with
`gc()` (`--expose-gc`) agree within 0.2 MiB on the cold, English and Arabic
checkpoints. A heap snapshot is used only to split bytes by type; building
one allocates inside the isolate and, under `wrangler dev`, also left the
snapshot text in the dev process (RSS climbed to ~2 GiB). With `gc()` and no
snapshot, process RSS stayed ~310–340 MiB. Uncapped "peaks" of 400 MiB are
V8 postponing collection: the same isolate, after `gc()`, is back at the
plateau. They are not a retained set and not comparable to the 128 MiB limit.

### Application caches (read-only audit)

Every module-level cache is keyed by a content file, an edition, or a locale,
except one. None grows with the number of requests.

| Cache | Key | Bound | Holds |
|---|---|---|---|
| `json-file-cache` | storage key or directory prefix | the content tree | parsed JSON |
| `cmsCache` | edition | 5 | the whole parsed `catalog-cms.json`, including every Arabic doctor override |
| `doctorLists` / `hospitalLists` | locale | 5 | a second, merged copy of every row |
| `localeXmlCache` | locale | 5 | rendered sitemap XML (1.8 MiB in the final snapshot) |
| `htmlCache` (`TtlLru`) | Arabic doctor-directory path | 48 entries, 5 min | full HTML documents. Final snapshot: 51 documents, 7.2 MiB. Flat from directory URL 50 through 1,099 |
| R2 backend `entries` | content key | the content tree | deflated bytes. External memory is 7.2 MiB after the first page and 7.8–7.9 MiB thereafter, on every run |
| OpenNext R2 incremental cache | R2 object | not in the isolate | no in-memory body map |
| `MemoryQueue.revalidatedPaths` | one id | deleted when the revalidation finishes | nothing after the request |

Next's own response cache defaults to 150 entries and a 10 s TTL, so it
cannot be the retainer that survives a GC at the end of a multi-minute ramp.

### Checkpoints, three fresh isolates, same order

9,819 requests each (every published Arabic URL and its English twin, plus
1,300 repeats of a fixed 30-URL set). Fetch errors: 0. The 133 non-200s are
`/fr`, `/ru`, `/sw` and `/uploads/none.webp` only. No OOM.

| Checkpoint | run 1 | run 2 | run 3 | external |
|---|---:|---:|---:|---:|
| cold (upload 404, nothing hydrated) | 18.2 | 18.2 | 18.2 | 1.4 |
| `GET /` (hydrates en+ar+fr+ru+sw and renders English) | 61.2 | 61.2 | 61.2 | 7.2 |
| `GET /ar` | 84.1 | 84.0 | 84.1 | 7.2 |
| `/fr`, `/ru`, `/sw` | 85.0 | 85.0 | 85.0 | 7.2 |
| five sitemap routes | 91.6 | 86.0 | 91.6 | 7.2 |
| the 30-URL set once | 98.8 | 96.2 | 96.2 | 7.8 |
| same 30 URLs × ~33, concurrency 4 (1,000 requests) | 103.2 | 100.7 | 100.8 | 7.8 |
| all 2,305 doctor profiles, both languages | 101.2 | 98.8 | 98.8 | 7.8 |
| doctor directories, first 50 / all 1,099 | 107.3 / 109.2 | 105.2 / 107.1 | 105.3 / 107.2 | 7.8 |
| all 524 cost facets | 117.4 | 115.4 | 115.4 | 7.8 |
| treatments, blogs, hospitals (all of them) | 117.8 | 115.8 | 115.8 | 7.8 |
| 300 more repeats, concurrency 12 | **118.1** | **117.9** | **118.0** | 7.8 |

Heap figures are MiB after GC. Combined at the plateau is **125.7–125.8 MiB**.
The sitemap checkpoint is the only one that moves between runs (~5 MiB); the
plateau does not.

Reading the shape:

* One request, `GET /ar`, adds **+22.9 to +23.0 MiB** and then `/fr`, `/ru`
  and `/sw` add nothing. That is the Arabic catalog being parsed and copied,
  not route variety.
* 4,610 doctor-profile requests do not add memory; the heap drops slightly.
* Directory pages add ~6 MiB in the first 50 and then nothing through 1,099.
  That matches the 48-document HTML LRU (7.2 MiB of `<!DOCTYPE html>` strings).
* Cost facets add **+8.3 MiB** on every run, then treatments, blogs and
  hospitals add nothing, and further repeats add at most 2 MiB.
* Doing the cost facets first, with no doctor pages before them, still adds
  **+11.3 MiB** (96.3 → 107.6) and then stops. Order does not create it.

A string-table diff of that cost-only ramp: **+8.82 MiB in 44,838 new
strings**, almost all under 4 KiB, whose text is the `technique` / body copy
in `src/data/cost-articles/` (62 files, 4.1 MB of source). Strings already
larger than 64 KiB did not change. Compiled code grew 16.2 → 19.3 MiB.
Objects and arrays did not (+0.03 / +0.08 MiB). So this is the cost-article
modules becoming live strings and bytecode as their functions first run. It
is bounded by that corpus. It is not retained response bodies, and there is
no application `Map` keyed by these URLs.

### Capped heap

`--max-heap-size=120 --expose-gc`, fresh isolate, same protocol, GC via
`gc()` so the measurement itself does not allocate a snapshot. Checkpoints
through the 30-URL set match the uncapped runs (after-30: heap 98.9, external
7.9, combined 106.8). During the following 1,000 repeats at concurrency 4 the
isolate was aborted twice:

* `Reached heap limit`, last GC **106.3 → 106.3 MiB** of 108.0 committed
* after the dev server restarted the isolate, the same point again,
  **105.8 → 105.8 MiB**

Both deaths are while re-requesting the already-warm 30 URLs. The sweep, the
directory LRU and the cost-article modules had not been reached. GC reclaimed
nothing, so the retained set (~106 MiB) leaves too little of the 120 MiB for
four concurrent renders of those pages.

### Recommended order

The ≤ 110 MiB target is not met. Sustained post-GC memory is ~126 MiB
combined, and a 120 MiB heap cap kills the isolate before the sweep. Do not
deploy.

1. **Option 3, Arabic doctor records, first.** It is the largest retained
   step that is already in memory when the cap kills the process: `GET /ar`
   is +23 MiB, repeatable to 0.1 MiB, and it happens before any of the
   sweep-only growth. `content/ar/catalog-cms.json` is 5.2 MB and holds 2,305
   overrides, all passing `doctorPatchIsPublished`. Of that JSON, bios are
   1.8 MB, the other long fields 2.3 MB, and name+title 0.1 MB. V8 stores the
   Arabic as two-byte strings, and `doctorsForLocale("ar")` then copies every
   row, so the bios exist twice (`cmsCache` plus the merged `Doctor[]`).
2. **Remeasure the same checkpoints** before editing anything else. The
   directory HTML LRU (7.2 MiB, already capped at 48) and the cost-article
   modules (~9 MiB of strings plus ~3 MiB of code, capped by the 62 files)
   are real and bounded, but they are not why the capped isolate dies.
3. Do not start by splitting cost articles or shrinking the HTML LRU. Those
   cannot move the retained set at the point of the OOM.

### Option 3 design (implemented below, §4.6)

The field list below is the original sketch. The implementation kept every
field a list or directory card actually renders, including ones this sketch
said to drop. See §4.6.

Keep the publication decision and the short fields a list page renders.
Drop the long fields until a single profile is rendered.

* One pass over the overrides, using the existing
  `doctorPatchIsPublished` predicate (status published, non-empty name, title
  and bio). The index retains slug, status and the short list fields (name,
  title, qualifications, experience, the hospital's display name). Hreflang,
  the sitemap and the publication gate consult this set, so a slug that is
  published today stays published and a draft still 404s.
* Do not keep the parsed `doctorOverrides` object and do not copy `bio`,
  `education`, `research`, `awards` or `proceduresExpertise` onto the list
  rows. After the index is built those strings have to be collectable.
* A profile page inflates that one slug from the packed bytes already held
  by the storage backend and caches it in a bounded LRU, the same shape as
  `htmlCache`. Directory and list pages must be checked first: any field they
  actually render has to be in the index, or the savings shrink and the page
  changes.
* The one-time `JSON.parse` still spikes on the first Arabic request, while
  the heap is ~61 MiB, which fits under 120 MiB. Parse-and-drop is enough
  unless that spike itself aborts; only then split the file at build time
  into per-slug blobs under `/_gaf/` (a derived asset, not an edit of
  `content/`).

No parity suite was re-run for that profiling pass: the Worker sources were
unchanged since `f01e424`, which already matched the SSR snapshot, the
4,239-URL Arabic sweep, and the storage tests. This pass's three sweeps
returned 200 for every published URL they requested.

### 4.6 Option 3 result (2026-10-21) — implemented, memory gate not passed

Public Arabic reads no longer call `loadCatalogCms`. `doctorsForLocale("ar")`
parses `content/ar/catalog-cms.json` once (the file is 8,279,789 bytes, not
the 5.2 MB figure in §4.5), applies the existing `doctorPatchIsPublished`
check, and keeps a list index. The parsed `doctorOverrides` object is not
stored. Every string copied out of that parse goes through a UTF-8
round-trip (`ownString`) so a sliced biography cannot pin the source.

List rows keep the fields directory, search, and collection cards render:
slug, name, title, qualifications, experience, languages, image, imageAlt,
hospital slug and display name, city and country from the English row, the
`listingBio` excerpt (220 characters), the first three non-empty education
lines, and the full `proceduresExpertise` array (cards clip each label to 42
characters). Specializations, affiliations, memberships, awards, research,
and the full biography are empty on the list row.

A profile request looks the slug up in that index. A draft or unknown slug
returns undefined and the page 404s, without parsing the override. A
published slug is read back from the storage bytes (`readBytes` on the
filesystem backend and on R2), `JSON.parse` runs on that one object span,
and `applyCatalogLayer` restores every `DOCTOR_OVERLAY_KEYS` field. The
inflated doctor is stored in a `TtlLru` of 32 entries and 5 minutes, the
same eviction as the directory HTML cache (expired first, then oldest). The
key is the catalogue generation, the storage kind, the storage version, and
the slug, so the map cannot grow past 32 and a CMS save misses. Misses are
not cached. `catalogCmsIsCached("ar")` stays false after public reads, so a
later CMS save cannot persist the slim rows. English, French, Russian, and
Swahili doctor lists are unchanged. Sitemap and hreflang publication checks
consult the index instead of inflating every biography. The catalogue file
itself was not rewritten, and per-slug `/_gaf/` assets were not added: the
first Arabic `JSON.parse` peaked at 119.7 MiB combined uncapped and at
90.8–107.9 MiB combined under the cap, and did not abort.

`loadCatalogCms("ar")` is unchanged for the CMS. A public specialty page
that called `getSpecialtyPage` with a non-English edition would still parse
the full Arabic file into `cmsCache`. Current public callers pass `"en"`.

#### Heap after the change

Same workload and post-GC `Runtime.getHeapUsage` method as §4.5. One uncapped
isolate completed all 9,819 requests (0 fetch errors; the 133 non-200s are
`/fr`, `/ru`, `/sw`, and `/uploads/none.webp`). Three further isolates ran
under `--max-heap-size=120` and are in the next section. Figures are MiB.

| Checkpoint | §4.5 (3 runs) | after Option 3 (uncapped) | external after |
|---|---:|---:|---:|
| cold | 18.2 | 18.2 | 1.4 |
| `GET /` | 61.2 | 61.2 | 7.3 |
| `GET /ar` | 84.0–84.1 | **80.3** | 7.4 |
| `/fr` `/ru` `/sw` | 85.0 | 80.8 / 80.9 / 81.3 | 7.3 |
| sitemaps | 86.0–91.6 | 87.9 | 7.2 |
| 30 URLs once | 96.2–98.8 | 95.2 | 13.6 |
| 1,000 repeats, concurrency 4 | 100.7–103.2 | 100.4 | 17.5 |
| 2,305 profiles, both languages | 98.8–101.2 | 101.4 | 16.8 |
| directories, first 50 / all 1,099 | 105.2–107.3 / 107.1–109.2 | 106.5 / 109.0 | 8.1 / 13.9 |
| 524 cost facets | 115.4–117.4 | 114.6 | 18.7 |
| treatments, blogs, hospitals | 115.8–117.8 | 114.4–114.7 | 16–25 |
| 300 more repeats, concurrency 12 | **118.0–118.1** | **115.1** | **38.6** |

`GET /ar` dropped by about 3.8 MiB, not by the 23 MiB the full override
object used to add. In a Node major GC of the same index the Arabic list is
+6.2 MiB of heap and +0 external, with the full biographies gone
(`bioChars` 506,758 against 1.8 million in the file, `longFormEntries` 0).
The rest of the Worker step is Arabic articles, the list fields the cards
still render, hospital and treatment overlay text, and the page. Heap after
the cost pages sits at 114–115 MiB and does not climb across the last 300
repeats. External memory on the uncapped isolate does climb (7.4 after
`/ar`, 38.6 at the end, combined 153.7). Under the cap, GC keeps external
at 7.8–8.2; that climb is not the capped failure mode. A second and third
full uncapped sweep were not run. The three capped isolates reproduced the
cold, `/`, and `/ar` points (18.2, 61.2, 80.4) before they died.

#### Capped isolates — all three aborted

`--max-heap-size=120 --expose-gc`. No run finished the directory ramp, the
cost facets, or the final 300 repeats. Retained heap at death was
103–108 MiB and GC reclaimed almost nothing, so concurrent directory renders
had no headroom. External stayed flat.

| Run | Last stable checkpoint | Death | Last GC (retained) | Request in flight |
|---|---|---|---|---|
| 1 | directory @10: heap 99.1, external 7.9, combined 107. Peak during the 1,000 repeats 120.2 | next directory batch, after all 2,305 profiles (profile@end heap 97.6) | 108.0 → 104.0 of 115.2 committed, then `Ineffective mark-compacts near heap limit` | `/doctors/india/bengaluru/medical-oncology/immunotherapy` and the Arabic twin |
| 2 | 30 URLs once: heap 95.2, external 8, combined 103.2 | during the 1,000 repeats, same point as the §4.5 death | 105.6 → 105.6 of 108.2, `Reached heap limit` | warm 30-URL set; `/ar/doctors/dr-anbarasi-kumaresan` recovered only after restart |
| 3 | directory @200: heap 101.8, external 7.9, combined 109.7. Peak during the 1,000 repeats 120.7 | next directory batch | 106.4 → 103.2, then 105.2 → 103.3, `Ineffective mark-compacts near heap limit` | `/doctors/india/chennai/orthopedics/fracture-fixation` |

The directory HTML LRU and the cost-article modules were not changed. They
are the next retained chunks, and they are outside this task. The 120 MiB
cap still kills the isolate. Nothing was deployed.

#### Tests and parity

* `tsc --noEmit -p .` clean. `npm run cf:build` exit 0.
* `test:unit` 435/440. The 5 failures are the same `server-only` imports in
  `src/lib/i18n/ar-*-overlays.test.ts` as on Stage 2 commit `7ae6163`.
* `test:storage` 8/8. Filesystem storage still serves the catalogue.
* `src/server-tests/arabic-doctor-index.test.ts`: 6/6. The published slug
  set is the 2,305 slugs from the pre-change predicate, in the same order.
  Card fields match an independent full merge. Profile JSON-LD and metadata
  match on the sampled slugs, including the longest biography. Drafts 404.
  A missing, truncated, or `null` catalogue returns an empty list.
  `doctorProfileCacheSize()` stays at 32 after more than 32 distinct slugs.
  The index does not retain `doctorOverrides` or the long-form fields.
* Focused server suite 44/46. The two failures are the ones already seen on
  this branch: `sitemap-ar.xml` lowercases `/ar/doctors/india/radiation-oncology`
  while `arabic-publication-gate.test.ts` looks up the mixed-case path, and
  `locale-isolation.test.ts` now sees Arabic treatments as available. Neither
  walks the doctor index.
* SSR snapshot against `/tmp/stage3/after.json`: bodies identical. Sitemaps
  structurally identical (`sitemap-ar.xml` 4,239 URLs, `sitemap-en.xml`
  7,418), with `<lastmod>` movement inside the capture window only. The six
  diffs are ISR `s-maxage` countdown seconds, the same shape recorded after
  `f01e424`.
* `check:alternates`: all 4,239 published Arabic URLs self-canonicalise with
  reciprocal hreflang. The one pinned-baseline drift is the pre-existing
  `/costs/external-beam-radiotherapy-ebrt` hreflang pair.
* `check:jsonld` against `src/server-tests/jsonld-en-baseline.json` reports
  33 of 80 English page types. The detail is case-fold 301s, lowercased
  canonical URLs, and physician fields (`alumniOf`, `hasCredential`,
  `jobTitle`) that the Stage 3 SSR capture already contained. The baseline
  file was not updated. Arabic profile metadata on the sampled doctors
  matches the full merge in the new test.
* CMS store read/write cases inside `test:unit` passed, including a failed
  write leaving the previous content intact. A live settings PUT was not
  repeated; it would write CMS content.

`content/`, `public/`, DNS, routes, production settings, and deployment
state were not changed. No R2 bucket was created or seeded. No merge to
`main`.

### 4.7 Cost-article pack and a smaller directory HTML cache (2026-10-21)

The §4.6 cap deaths were a retained set with no room left for a concurrent
render, not a leak in the Arabic doctor index. A heap snapshot of the warm
isolate (post-GC heap 119.8 MiB, external 22.0) put 12.48 MiB in 41,974
English cost-article paragraph strings, and exactly 48 Arabic directory
documents (7.08 MiB) in `htmlCache`. The same prose was also inside the
worker script source. Sitemap generation imports `costArticles` before any
directory URL is hit, so the corpus was already resident when the cap died.
Full Arabic biographies and treatment bodies were not in that snapshot.

Two bounded changes, and nothing else:

* On `GAF_CF_BUILD=1` the server bundle loads `external-registry.ts` instead
  of `static-registry.ts`. `npm run cf:build` writes
  `src/data/cost-articles.pack` (magic `GAFC`, 380 articles, 4,314,024 bytes,
  one deflateRaw payload per article) into the Worker assets. The isolate
  keeps that container and a `TtlLru` of 8 parsed articles (5 minutes,
  expired then oldest). It does not keep the 25 MB uncompressed JSON.
  Hostinger's `next build` and the unit tests still import the static
  registry. A missing or malformed pack returns undefined and is not cached.
* `HTML_CACHE_MAX_ENTRIES` in `arabic-radiation-html.ts` is 8 instead of 48.
  TTL and eviction are unchanged. Eight entries still cover the repeated
  URLs in the memory workload.

The Arabic doctor index, catalogue layout, public routes, and CMS read/write
path are unchanged. Catalogues were not split into per-slug `/_gaf/` files.

#### Three capped sweeps — all completed

`--max-heap-size=120 --expose-gc`, fresh isolate each time, the same
`/tmp/mem-profile.mjs` order and concurrency as §4.5. Each run served 9,819
requests, 0 fetch errors, 9,686 × 200 and 133 × 404 (the `/fr` `/ru` `/sw`
and `/uploads/none.webp` set). No isolate aborted. Post-GC
`Runtime.getHeapUsage`, MiB, heap / external / combined. Combined is
heap + external, a diagnostic, not the V8 heap cap.

| Checkpoint | §4.6 uncapped | capped 1 | capped 2 | capped 3 |
|---|---:|---:|---:|---:|
| cold | 18.2 / 1.4 | 15 / 1.4 / 16.3 | 15 / 1.4 / 16.3 | 15 / 1.4 / 16.3 |
| `GET /` | 61.2 / 7.3 | 47.7 / 11.5 / 59.2 | 47.7 / 11.5 / 59.2 | 47.7 / 11.5 / 59.2 |
| `GET /ar` | 80.3 / 7.4 | 66.8 / 11.5 / 78.3 | 66.8 / 11.5 / 78.3 | 66.9 / 11.5 / 78.3 |
| sitemaps | 87.9 / 7.2 | 72.8 / 15.4 / 88.2 | 72.9 / 15.4 / 88.4 | 68.8 / 11.3 / 80.1 |
| 30 URLs once | 95.2 / 13.6 | 80 / 16.2 / 96.2 | 79.9 / 16.2 / 96.1 | 77.4 / 16.2 / 93.7 |
| 1,000 repeats, concurrency 4 | 100.4 / 17.5 | 83.1 / 16.9 / 100 | 84.4 / 16 / 100.4 | 82.8 / 16.9 / 99.7 |
| 2,305 profiles | 101.4 / 16.8 | 83.7 / 17 / 100.7 | 83.3 / 16.2 / 99.5 | 81.5 / 17.3 / 98.9 |
| directories, all 1,099 | 109.0 / 13.9 | 85.3 / 16.5 / 101.8 | 85.4 / 16.5 / 101.9 | 83.4 / 16.5 / 100 |
| 524 cost facets | 114.6 / 18.7 | 85.7 / 17.6 / 103.3 | 85.6 / 16 / 101.6 | 83.7 / 16 / 99.8 |
| final 300, concurrency 12 | 115.1 / 38.6 | 86.6 / 17.1 / 103.7 | 86.3 / 16.1 / 102.3 | 86.2 / 16.1 / 102.3 |

`GET /` is about 13.5 MiB of heap under §4.6 because the article prose is no
longer in the script or the heap. The +4.2 MiB of external at that checkpoint
is the packed container (4,314,024 bytes). Post-GC external then sits at
16–17.6 MiB through every later phase, including the final 300 repeats. It
does not climb the way the uncapped §4.6 run climbed to 38.6. Those extra
bytes are inflate buffers and response bodies: after the requests finish,
`gc()` returns external to ~16. The highest sampled `usedSize` during a
request was 105.8, 106.3 and 106.3 MiB, under the 120 cap.

The harness also records an unsynchronised peak of `usedSize + external`
before that GC. The worst samples were 137.3 (cost @200), 138 (cost @48) and
139.9 (cost @500). That number is the allocation envelope, not the retained
set. A separate probe on the capped isolate forced `gc()` while 8 cost
renders were still in flight: combined memory was 114.6 and, on a repeat,
116.9, then 103 after the responses completed. The same probe with the
directory URLs that killed §4.6 (`/doctors/india/bengaluru/medical-oncology/immunotherapy`,
`/doctors/india/chennai/orthopedics/fracture-fixation`, and their Arabic
twins, 8 in flight) measured 103.7 combined after `gc()` during the burst.
Directory `@50`, `@200` and `@end` completed in all three sweeps. That is
the concurrency-8 failure from §4.6, and it no longer aborts the isolate.

#### What still aborts a capped isolate

`check:alternates` fetches 12 sitemap URLs at a time and, for each, the
Arabic and English documents together, so 24 responses are in flight. On a
fresh 120 MiB isolate that crawl aborted during cost URLs. The last GC was
108.0 → 106.1 → 106.0 MiB and reclaimed almost nothing (`Ineffective
mark-compacts near heap limit`): the in-flight renders were still reachable.
The prescribed workload never opens 24 documents at once (groups are
concurrency 8, the final repeat is 12), and those levels stayed inside the
cap. The same alternates command on an uncapped isolate finished: all 4,239
published Arabic URLs self-canonicalise with reciprocal hreflang. The one
pinned drift is still `/costs/external-beam-radiotherapy-ebrt` (`[ar, en]`
against an expected `[en]`). The capped abort is resolved in §4.8. The
harness still opens 24 fetches; the Worker admits 8 document renders.

Checks on this tree: `tsc --noEmit` clean. `npm run cf:build` exit 0
(pack 4,314,024 bytes, the kidney-care sentence is not in the server
bundle). `test:unit` 438 pass / 5 fail, the same five `server-only` overlay
files as Stage 2 `7ae6163`. `test:storage` 8/8. `arabic-doctor-index.test.ts`
6/6. Focused server files (publication gate, radiation directory and
procedure, facet canonical, JSON-LD policy, locale isolation, sitemap
parity) 69 pass / 2 fail: the sitemap lowercases
`/ar/doctors/india/radiation-oncology` while the gate test looks up the
mixed-case path, and `locale-isolation.test.ts` sees Arabic treatments as
available. SSR against `/tmp/stage3/after.json`: bodies identical, sitemaps
structurally identical (`sitemap-ar.xml` 4,239, `sitemap-en.xml` 7,418),
six diffs are ISR `s-maxage` countdown seconds. `check:jsonld` still differs
on 33 of 80 English page types. Baselines were not updated.

Nothing was deployed. No DNS, route, or production setting changed, and no
R2 bucket was created or seeded.

### 4.8 Bounded document renders, and the two server-test misses (2026-10-21)

§4.7 left three blockers: `check:alternates` aborted a fresh 120 MiB
isolate, two focused server tests failed, and `check:jsonld` disagreed
with `jsonld-en-baseline.json` on 33 of 80 English page types. This
section is the evidence for those three. The cost-article pack, the
8-entry directory HTML cache, the Arabic doctor index, and the profile
LRU of 32 are unchanged. Cache limits were not raised. The heap cap was
not raised. No URL was skipped and the alternates harness was not
rewritten to hide the failure.

#### Why 24 responses abort the isolate

`npm run check:alternates` walks the page-type fixture one URL at a time,
then `mapLimit(paths, 12)` over `sitemap-ar.xml`. For each path it fetches
the Arabic document and the English document together (`readHead` is a full
GET that reads the body). That is 24 responses in flight. The harness was
left at that concurrency on purpose.

A fresh isolate with `--max-heap-size=120 --expose-gc` and no render gate
aborted twice during Bengaluru cost URLs (`/tmp/cf-capped-repro.log`):

| Crash | Last GC before the abort | Request that failed |
|---|---|---|
| 1, at 62.8 s | 106.9 (111.3) → 102.9, then 110.5 → 103.1. `Ineffective mark-compacts near heap limit`, signal 6 | `/costs/india/bengaluru/nephrology` and the Arabic twin, plus sibling specialties |
| 2, at 6.4 s on the restarted isolate | 107.1 → 105.3, then 108.6 → 107.2 (almost no reclaim) | `/ar/costs/india/bengaluru/ophthalmology` and neurosurgery |

The live set was the in-flight SSR trees. GC could not free them because
they were still reachable. It is not a leak in the HTML cache or the
article LRU: those are capped at 8, and the same isolate survives the
prescribed workload at concurrency 8 and 12. A short 24-URL burst on a
just-warmed isolate did not abort; the fatal case is a warm retained set
plus 24 large renders. Production has no platform cap of 8. A crawler, or
this checker, can open that many full GETs against one isolate. Limiting
the harness alone would have hidden that.

#### What the Worker does

`MAX_INFLIGHT_RENDERS` in `src/worker/runtime.ts` is 8, the concurrency the
capped sweep already survived. Further document GETs wait on a
same-request 15 ms timer. Two earlier shapes were measured and rejected:

* A shared waiter queue (one request resolving another's promise) is
  illegal in workerd. It logged "A promise was resolved or rejected from a
  different request context" and cancelled the continuation
  ("your Worker's code had hung"). Node unit tests do not catch this.
* A timer wait without a subrequest bypass deadlocks. OpenNext implements
  the locale rewrite as a second fetch into the same worker. The outer
  `GET /ar/...` holds a slot; the inner `GET /...` also needs one. The
  parent waits forever, heap stays near 83 MiB (the holders are waiting,
  not rendering), and the client dies with `UND_ERR_HEADERS_TIMEOUT`.
  HEAD is also exempt: OpenNext revalidation calls this worker with HEAD
  while a render still holds its slot.

The inner fetch is recognised by `x-gaf-path`, `x-middleware-*`,
`x-opennext-*` / `x-open-next-*`, `next-url`, or `rsc`, and does not take
a slot. The gate peak is logged with `console.error`, so wrangler prints
it as an error line. It is a counter, not a failed request.

The second fetch re-enters `src/proxy.ts` on the unprefixed path. A second
pass classified that path as English and overwrote `x-gaf-locale`, so an
Arabic URL served the English document (canonical
`https://gaf.healthcare/costs/india` for `/ar/costs/india`). This happened
on the rebuilt `.open-next` bundle with or without the gate; the 11:38
uncapped pass used the previous bundle, which did not take this path.
Hostinger runs the proxy once and never sends `x-gaf-path`. The fix keeps
the locale when the request already carries `x-gaf-path` and a target
`x-gaf-locale`. A browser request does not send those headers.

That second fetch of `/` also appends the `next.config` homepage
`Cache-Control` (`public, max-age=0, s-maxage=120, stale-while-revalidate=600`)
onto `/ar`. The English homepage is supposed to carry both policies (the
Stage 3 snapshot already does). A locale home is not. The Worker strips
that one directive on `/ar`, `/fr`, `/ru`, and `/sw` before the response
leaves. `/ar` is then `public, s-maxage=300, stale-while-revalidate=86400`
with `x-gaf-locale: ar` and canonical `https://gaf.healthcare/ar`. English
`/` is unchanged.

A client that sends `x-gaf-path` together with `x-gaf-locale: ar` bypasses
the gate and forces the Arabic render of an unprefixed URL. That is the
rewrite signal. Normal browsers do not send it. §4.9 closes this: the
bypass now also requires `CF-Worker`, which Cloudflare sets on the rewrite
fetch and strips from visitor traffic.

#### Three capped alternates runs

Fresh isolate each time, `--max-heap-size=120 --expose-gc`, the harness
unchanged (`mapLimit` 12, Arabic and English together). Each run checked
every published Arabic URL. No heap-limit abort, no hung request, no
fetch error. Render-gate peak 8/8 on every run. Status lines: 11,700 ×
200, 25 × 301 (the fixture's Title Case catalog paths), 1 × 404 (the
fixture row whose `served` is 404). `ALT_EXIT` is 1 only because of the
pre-existing hreflang drift. Heap figures are `Runtime.getHeapUsage`, MiB.
Combined is heap + external, a diagnostic, not the V8 cap. The
unsynchronised peak is the allocation envelope while responses were in
flight.

| Run | Peak used / external / combined | Last sample before `gc()` | Post-GC used / external / combined |
|---|---:|---:|---:|
| 1 | 106.8 / 31.2 / 132.6 (1,615 samples) | 91.1 / 19.6 / 110.7 | 87.8 / 16.0 / 103.8 |
| 2 | 105.2 / 29.5 / 133.4 (1,584 samples) | 100.1 / 25.1 / 125.2 | 87.9 / 16.0 / 103.9 |
| 3 | 108.3 / 30.6 / 133.9 (1,562 samples) | 97.7 / 24.5 / 122.2 | 88.2 / 16.0 / 104.2 |

Each log ends with `All 4239 published Arabic URLs self-canonicalise with
reciprocal hreflang.` The only FAIL line is `flat cost sheet alias` /
`/costs/external-beam-radiotherapy-ebrt` / `hreflang is [ar, en], expected
[en]`.

#### The prescribed workload still passes

One fresh capped isolate after the gate, same `/tmp/mem-profile.mjs` order
as §4.5: 9,819 requests, 0 fetch errors, 9,686 × 200 and 133 × 404. No
heap-limit line. Post-GC final heap / external / combined 86.4 / 16.1 /
102.5. Highest post-GC heap 86.4 (the final checkpoint), highest post-GC
external 17.9 (`doctor-profile@10`), highest post-GC combined 103.5
(`hospital-other@end`). Highest sampled `usedSize` 107.4
(`after-1000-repeats`). The unsynchronised combined peak was 140 at
`cost@200` (used 105, external 37.2); that is the in-flight envelope, and
`gc()` after the batch returned external to 16.3. Shape matches the three
§4.7 sweeps (peak `usedSize` 105.8 / 106.3 / 106.3, final combined 103.7 /
102.3 / 102.3), which were the pack without this gate. Those three remain
the sweeps of record for the pack. This one shows the gate did not push
the retained set back over the cap.

#### Sitemap case

`sitemap-ar.xml` emits `absoluteUrl` → `localePath`, so the public URL is
`/ar/doctors/india/radiation-oncology`. The publication-gate test compared
that string with the internal Title Case facet key. `parsePrettyCatalogSegments`
matches by slug, so the lowercase public path resolves, and
`canonicalFacetPath` still returns the Title Case key. The comparison now
goes through `localePath(canonicalFacetPath(...), "ar")`. Publication and
"canonicalised elsewhere" checks are the same assertions. The bidirectional
sitemap test passes. Public URLs were not changed.

#### Locale isolation

`publishedCuratedTreatments("ar")` is the English row published and
`translations.ar.status === "published"`. `content/ar/treatments` has
authored published translations, so `surfaceIsAvailable("ar", "treatments")`
is true. French has no overlays and stays false. Forcing
`treatmentsPublished: false` still hides the Arabic surface. The test
expectation was the stale one (it expected the surface to be closed). The
assertion now requires a non-empty Arabic published set, a closed French
surface, and a closed Arabic surface when the fact is false. Content files
were not edited.

#### JSON-LD

`check:jsonld --detail` against the gated Worker matches the pre-gate
detail log byte for byte (`/tmp/parity-jsonld-detail.log` and
`/tmp/jsonld-final.log`). The tool prints "changed on 33 of 80 page types".
That 33 counts labels, not a new regression, and it is not "47 differences":
80 page types are fetched (81 fixture rows, one `served: "404"` skipped),
48 of those 80 match the baseline after key sorting, 32 of the 80 differ,
and 1 baseline key is no longer in the fixture. 32 + 1 = 33. The baseline
file has 70 keys and was last written at `e39b015` (2026-10-18 09:33). It
was not regenerated.

`src/lib/seo.ts` last changed at `8c36502` (2026-10-18 10:56, "Lowercase
catalog URLs in every language and publish stored procedure facts"), after
that baseline write. The pack range and this section do not touch
`src/lib/seo.ts` or the baseline. The cost-pack loader and the directory
HTML cache do not emit JSON-LD. The 301s below are the checker
(`redirect: "manual"`) recording the lowercase redirect, not missing blocks
on the canonical page.

| Page type | Previous (baseline) | Current | Reason |
|---|---|---|---|
| doctor facet: country | 200, FAQPage | 301, no body | Fixture requests `/doctors/India`. Route 301s to the lowercase public URL. |
| doctor facet: country/city | 200 | 301 | `/doctors/India/Delhi-NCR` → lowercase. |
| doctor facet: country/specialty | 200, breadcrumb, collection, list, FAQ | 301 | `/doctors/India/Radiation-Oncology` → lowercase. |
| doctor facet: country/city/specialty | 200, full blocks | 301 | Title Case city/specialty path. |
| doctor facet: country/city/specialty/procedure | 200, full blocks | 301 | Title Case procedure path. |
| doctor facet at the 3-profile floor | 200, full blocks | 301 | `/doctors/India/Mumbai/Radiation-Oncology`. |
| hospital facet: country | 200, collection, FAQ | 301 | `/hospitals/India`. |
| hospital facet: country/city | 200 | 301 | `/hospitals/India/Delhi-NCR`. |
| hospital facet: country/city/specialty | 200, full blocks | 301 | Title Case path. |
| hospital facet: country/city/specialty/procedure | 200, full blocks | 301 | Title Case path. |
| hospital facet with 1 Arabic record | 200, full blocks | 301 | Bengaluru EBRT path, Title Case. |
| hospital facet with 2 Arabic records | 200, full blocks | 301 | Chennai EBRT path, Title Case. |
| hospital facet at the 3-record floor | 200, full blocks | 301 | Bengaluru specialty path, Title Case. |
| cost facet: country | 200, FAQ | 301 | `/costs/India`. |
| cost facet: country/specialty | 200, lists, FAQ, MedicalWebPage | 301 | `/costs/India/Radiation-Oncology`. |
| cost facet: country/specialty/procedure | 200, full blocks | 301 | Title Case EBRT path. |
| cost facet: country/city/specialty/procedure | 200, full blocks | 301 | Title Case Delhi NCR EBRT path. |
| doctor profile | 200, Title Case breadcrumbs | 200, lowercase breadcrumbs, plus `alumniOf`, `hasCredential`, `hospitalAffiliation` on the Physician | Case fold and physician fields from `8c36502`. Blocks are present. |
| hospital profile | 200, Title Case breadcrumb | 200, lowercase breadcrumb | Case fold only. |
| flat cost sheet alias | 200, Title Case `@id` / `url` | 200, lowercase `@id` / `url`, physician fields on the doctor ItemList | Case fold plus the same physician fields. MedicalWebPage is still there. |
| specialties index | 200, Title Case ItemList urls | 200, 23 lowercase specialty urls | Case fold only. |
| medical oncologist profile, medical oncology facet, medical oncology procedure facet, cardiology profile, cardiology procedure facet, neurosurgery profile, neurosurgery procedure facet, nephrology specialty facet, orthopedics procedure facet, gynecology specialty facet, cost facet: country/city | absent (11 rows) | fetched, reported as `+ page` | Added to the fixture after the last baseline write (`1031c33`, `876877d`, `d59feec`). Not a missing render. |
| doctor facet with no Arabic profiles | present in the 70-key baseline | not in the fixture (`- page`) | Removed from the fixture around `d59feec`. `collect()` skips it. |

The other 48 fetched page types match the baseline. No new diff appeared
after the pack, the directory cache, the render gate, or the locale
preserve.

#### Checks on this tree

* `npx tsc --noEmit -p .` clean after the locale-home cache fix.
* `npm run cf:build` exit 0 on the final tree (pack still 4,314,024
  bytes). The render gate and the cache-header restore live in
  `src/worker/runtime.ts`, which `wrangler dev` bundles from source. The
  dev server that served the measured runs was restarted onto that source.
* `test:storage` 8/8.
* `test:unit` 440 pass / 5 fail (445 tests). The 5 failures are the same
  `server-only` imports in `src/lib/i18n/ar-*-overlays.test.ts` as Stage 2
  `7ae6163`. CMS store cases passed, including "a failed write leaves the
  previous content and the shared read view intact" and the ETag conflict
  case. No live CMS PUT.
* `arabic-doctor-index.test.ts` 6/6.
* `src/worker/runtime.test.ts` 13/13, including the slot gate and the
  locale-home cache restore.
* Focused server files (publication gate, radiation directory and
  procedure, facet canonical, JSON-LD policy, locale isolation, sitemap
  parity) 71/71.
* SSR against `/tmp/stage3/after.json`: bodies identical. The six header
  diffs are ISR `s-maxage` countdown seconds (`/ar/doctors/india/radiation-oncology`
  and the five sitemap responses), the same paths as the §4.7 compare.
  An earlier compare in this section also flagged `/ar`, because the
  rewrite fetch had appended the English homepage `Cache-Control`. That
  directive is stripped; `/ar` matches the snapshot again.
* Sitemap parity against the same snapshot: `sitemap-en.xml` 7,418 URLs,
  0 structural problems, 45 `<lastmod>` values moved; `sitemap-ar.xml`
  4,239 URLs, 0 structural problems, 3 `<lastmod>` values moved.
* Arabic URL and hreflang: the three capped runs above.
* JSON-LD: the table in this section. Baseline not updated.

Nothing was deployed. No merge to `main`. No DNS, route, domain, or
production setting changed. No R2 bucket was created, modified, or seeded.
`content/` and `public/` were not edited.

### 4.9 Pre-staging recheck (2026-10-21)

Starting commit `e76c8be`. This pass closed the client-header bypass noted
above, ran two more capped alternates crawls, classified the flat EBRT
hreflang line, and rechecked the staging prerequisites. Nothing was
deployed. No DNS record, route, bucket, or production setting was changed.
`content/` and `public/` were not edited. The cost-article pack, the
8-entry article LRU, the 8-entry directory HTML cache, the Arabic doctor
index, the profile LRU of 32, and the Hostinger filesystem fallback
(`GAF_STORAGE` unset) are unchanged.

#### Client headers no longer open the gate

The bypass in §4.8 was real. A visitor `GET` carrying `x-gaf-path` skipped
the render slot. Adding `x-gaf-locale: ar` also made `src/proxy.ts` keep
Arabic on the unprefixed URL, so the English address rendered the Arabic
document.

Cloudflare sets `CF-Worker` on a Worker `fetch()` subrequest and overwrites
a visitor-supplied value at the edge. The gate now skips a slot only when
that header is non-empty and the request also carries a continuation
header: `x-gaf-path`, `x-middleware-subrequest`, `x-isr`, or a name prefixed
`x-middleware-request-`, `x-middleware-response-`, `x-opennext-`, or
`x-open-next-`. `x-gaf-path`, `x-gaf-locale`, `rsc`, and `next-url` on their
own wait with every other document GET. The proxy keeps a rewritten locale
only when `CF-Worker` is non-empty. Hostinger never sends `CF-Worker` and
still runs the proxy once.

HEAD stays exempt. OpenNext revalidation is a HEAD into this worker while a
render holds its slot; counting that call deadlocks the parent. Extra
document GETs still wait on the same-request 15 ms timer. There is no
shared waiter queue.

`wrangler dev` does not strip a client `CF-Worker`. A local request that
supplies the header and a continuation header still looks internal. That is
a simulator limitation. On the Cloudflare edge the platform sets the header.

Two alternatives were measured and rejected. An isolate-local HMAC fails
when `global_fetch_strictly_public` lands the second fetch on another
isolate: that isolate does not know the nonce and would serve English at
the Arabic URL again. Hard-coding the wrangler dev zone
`gaf-healthcare-staging.example.com` fails for the same reason in
production, where `CF-Worker` is the zone name.

`src/worker/runtime.test.ts` covers the three cases while eight slots are
held: `x-gaf-path` plus `x-gaf-locale: ar` does not enter Next; `CF-Worker`
plus `x-gaf-path` enters and does not keep a slot; `CF-Worker` alone does
not skip the gate. 13/13 passed. Against the rebuilt bundle, a real Arabic
URL stays Arabic, the spoof headers without `CF-Worker` stay English, and
`/ar`, `/fr`, `/ru`, and `/sw` keep
`public, s-maxage=300, stale-while-revalidate=86400`. They do not receive
the English homepage `s-maxage=120` directive. `/` still carries both
policies.

#### Two further capped alternates runs

Fresh isolate each time, `--max-heap-size=120 --expose-gc`, the harness
unchanged (`mapLimit` 12, Arabic and English together), gate at 8. Both
finished (`WRAP` 0). No heap-limit abort, no hung request, no fetch error.
Wrangler status lines on each run: 11,700 × 200, 25 × 301, 1 × 404
(11,726 GETs). Gate peaks are exactly 1 through 8. Each log ends with
`All 4239 published Arabic URLs self-canonicalise with reciprocal
hreflang.` `ALT_EXIT` is 1 only for the flat-cost line below. Heap figures
are `Runtime.getHeapUsage`, MiB. Combined is heap + external. The
unsynchronised peak is the in-flight envelope.

| Run | Peak used / external / combined | Last sample before `gc()` | Post-GC used / external / combined |
|---|---:|---:|---:|
| 4 | 108.6 / 29.8 / 134.8 (1,520 samples, 0 errors) | 97.9 / 23.2 / 121.1 (total 108.4) | 87.8 / 16.0 / 103.8 (total 99.7) |
| 5 | 106.5 / 29.4 / 131.6 (1,539 samples, 0 errors) | 92.2 / 19.3 / 111.6 (total 106.1) | 87.9 / 16.0 / 103.9 (total 100) |

#### Flat EBRT hreflang

`/costs/external-beam-radiotherapy-ebrt` is a flat alias.
`costPageMetadata` canonicalises it with `costPath(treatment.name)`, the
hierarchical country path. Served on this isolate:

* Flat URL: 200, `x-gaf-locale: en`, canonical
  `https://gaf.healthcare/costs/india/radiation-oncology/external-beam-radiotherapy-ebrt`.
  hreflang `x-default` and `en` point at that URL; `ar` points at
  `https://gaf.healthcare/ar/costs/india/radiation-oncology/external-beam-radiotherapy-ebrt`.
* The hierarchical English URL carries the same tags and is self-canonical.
* The Arabic twin is 200, `x-gaf-locale: ar`, self-canonical, and
  reciprocates `en` / `x-default` to the hierarchical English URL.

The fixture row is `published: ["en"]` because `publishedLocalesForPath`
for the flat path is English. The checker compares the served alternate
keys `[ar, en]` with that row. The tags describe the hierarchical page,
which is published in Arabic and reciprocates. The output is the correct
canonical pair. The fixture, the baseline, and `content/` were left
unchanged. `ALT_EXIT` 1 remains this one FAIL.

#### Regression on this tree

* `npx tsc --noEmit -p .` clean.
* `npm run cf:build` exit 0. Pack still 380 articles, 4,314,024 bytes.
* `test:storage` 8/8.
* `test:unit` 440 pass / 5 fail (445 tests). The five failures are the same
  `server-only` imports under plain `tsx`:
  `ar-cardiac-hematology-neurosurgery-overlays`, `ar-cost-overlays`,
  `ar-medical-oncology-overlays`, `ar-remaining-specialty-overlays`,
  `ar-surgical-oncology-overlays`. No new failure. CMS store cases passed,
  including a failed write leaving the previous content intact. No live CMS
  write.
* `arabic-doctor-index.test.ts` 6/6.
* `src/worker/runtime.test.ts` 13/13.
* Focused server files 71/71.
* Warm SSR against `/tmp/stage3/after.json`: bodies identical. Six header
  diffs, the same paths as §4.7, and they are ISR `s-maxage` countdown
  seconds only (`stale-while-revalidate=2592000` unchanged):
  `/ar/doctors/india/radiation-oncology` 273 → 47; `sitemap.xml` and
  `sitemap_index.xml` 3573 → 3443; `sitemap-en.xml` 3575 → 3458;
  `sitemap-ar.xml` and `sitemap-blogs.xml` 3579 → 3466. A compare taken
  immediately after `cf:build` showed the `next.config` sitemap policy
  (`public, max-age=300, s-maxage=3600, stale-while-revalidate=86400`) on
  four sitemap responses. That was the cold incremental-cache hit. The
  warm compare is the countdown again. Baseline not updated.
* Sitemap parity: `sitemap-en.xml` 7,418 URLs, 0 structural problems, 45
  `<lastmod>` values moved; `sitemap-ar.xml` 4,239 URLs, 0 structural
  problems, 3 `<lastmod>` values moved. Namespaces, order, priority,
  change frequency, image entries, and publication status match.
* JSON-LD: `changed on 33 of 80`, the same split as the §4.8 table
  (48 matches, 17 Title Case 301s, 4 case-fold and physician fields from
  `8c36502`, 11 fixture rows absent from the baseline, 1 baseline key no
  longer in the fixture). Baseline not updated.

#### Staging prerequisites (read-only)

`wrangler.jsonc` names the Worker `gaf-healthcare-staging`, sets
`workers_dev: false`, and declares no `routes`, no `custom_domain`, and no
production environment. A future `wrangler versions upload` of this config
does not attach `gaf.healthcare`. Staging storage is the two bucket
bindings `gaf-content-staging` and `gaf-static-staging`, with
`GAF_STORAGE=r2` as a Worker var. Hostinger keeps `GAF_STORAGE` unset and
the filesystem backend. Worker secrets would be scoped to the staging
script; none were written here.

`staging.gaf.healthcare` does not exist. Creating it, or any other
hostname, was not done. The live site remains the Hostinger origin behind
the existing Cloudflare proxy, and that origin is the rollback.

Still missing before a staging deploy can start: an active API token with
the scopes in §0, confirmation that Workers Paid is on the account, and
the two staging buckets (creating them needs a separate approval). This
pass does not grant that approval.

The application gates above passed. Staging is **not ready** until those
three account facts are confirmed. No deploy, merge, bucket, DNS change,
or production route is authorised by this section.

### 4.10 Credential check (2026-10-21)

The restricted token **GAF Healthcare Staging Deployment** was submitted
through Cursor’s secret prompt as `CLOUDFLARE_API_TOKEN`. The value was
not printed, not sent to Cloudflare, and not written into the repository,
a commit, or a shell command.

This running agent still does not have the variable. A login shell on the
same machine also reports `CLOUDFLARE_API_TOKEN` and
`CLOUDFLARE_ACCOUNT_ID` unset. Cursor injects Cloud Agent secrets when an
agent starts. An agent that is already running does not receive a secret
added during the run.

Because the token was not in the process, Cloudflare was not contacted.

| Check | Result |
|---|---|
| Repository | This checkout is the GAF Healthcare app (`package.json` name `gaf-healthcare`) on `cursor/cloudflare-r2-worker-6b41` at `7618710b4f6054c5fd6b7187a1ca9556ece718bd`. The working tree was clean. |
| Run record | Cursor records this run against `https://origin.cursor.com/git/abdul-azeem/Onco.git`, title “Medical tourism website”, recorded branch `cursor/cms-article-image-upload-6b41`. |
| Checkout remote | A temporary Origin repository, not `abdul-azeem/Onco` and not a GitHub remote. |
| Authenticated account | Not verified. |
| Workers plan | Not verified. |
| R2 and `gaf-content-staging` / `gaf-static-staging` | Not verified. The buckets were not created. |

Staging stays **not ready**. The next check has to be a new Cloud Agent on
this branch. That run should test whether `CLOUDFLARE_API_TOKEN` is set
and must not print it. If it is still unset, the secret was saved against
the wrong repository: in [Cloud Agents → Secrets](https://cursor.com/dashboard/cloud-agents),
set **Apply to** so it includes `origin.cursor.com/git/abdul-azeem/Onco`
and this temporary project, then start another new agent. Do not paste the
token into chat. After a new agent can see the token, confirm the account
that owns `gaf.healthcare`, store `CLOUDFLARE_ACCOUNT_ID` the same way, and
check Workers Paid and the two staging buckets. Creating those buckets and
deploying still need explicit approval.

### 4.11 Read-only account check (2026-10-21)

A later read-only pass called the Cloudflare API with the staging token.
The token value was not printed and was not committed. No Worker was
uploaded, no bucket was created, no DNS record was changed, and the live
site was left on Hostinger (`https://gaf.healthcare/` still returns
`platform: hostinger` behind Cloudflare).

| Check | Result |
|---|---|
| Token | `GET /user/tokens/verify` HTTP 200, `status: "active"`. |
| Account | One account, named `Gafhealthcare@gmail.com's Account`. |
| Zone | `gaf.healthcare` is `active` and not paused. Its account is that same account. |
| Workers Scripts | `GET /accounts/{id}/workers/scripts` HTTP 200. Zero scripts. `gaf-healthcare-staging` is not deployed. Edit permission was not exercised. |
| Workers Paid | `GET /accounts/{id}/subscriptions` HTTP 403, error 10000 Authentication error. The plan is still unknown. |
| R2 | `GET /accounts/{id}/r2/buckets` HTTP 403, error 10042 “Please enable R2 through the Cloudflare Dashboard.” |
| Staging buckets | Not created. They cannot be listed while R2 is disabled. |

`CLOUDFLARE_ACCOUNT_ID` is still not an environment variable. The id is
deliberately omitted from this file. Add it in Cursor Dashboard → Cloud
Agents → Secrets, as an Environment Variable or Runtime Secret named
`CLOUDFLARE_ACCOUNT_ID`, scoped the same way as the token.

Before any bucket is created, R2 has to be enabled on this account in the
Cloudflare dashboard. The buckets to approve, and not to create until then,
are Standard class at Cloudflare’s default location:

* `gaf-content-staging` — `CONTENT` binding, CMS content.
* `gaf-static-staging` — `STATIC` and `NEXT_INC_CACHE_R2_BUCKET`, uploads and `incremental-cache`.

No objects should be seeded in the same step. Staging remains **not ready**
until R2 is enabled, the two buckets exist, Workers Paid is confirmed, and
a staging deploy is explicitly approved.

## 5. Media uploads and deletions

* `POST /api/cms/media` already writes `public/uploads/articles/<file>`
  through storage; on Workers that key lands in `gaf-static-staging` as
  `uploads/articles/<file>`. The write is awaited by `flushContentWrites()`
  before the 200, so the object exists when the editor gets the URL.
* Serving: `createWorker()` answers `/uploads/*` before Next.js.
  `serveUpload()` reads `env.STATIC` through `uploadResponse()`. The key is
  the decoded path without the leading slash. A successful response uses the
  object's content type and ETag, and
  `Cache-Control: public, max-age=60`. That response is stored in
  `caches.default`. A missing object or a rejected key is HTTP 404 with
  `Cache-Control: no-store` and is not stored. Shipped files under
  `/brand/`, `/images/`, and `/_next/static/` keep their own cache headers.
* Deleting the R2 object does not by itself expire a cached response.
  `DELETE /api/cms/media` removes the CMS row and the R2 object. The same
  isolate may then call `caches.default.delete` for an origin it has already
  served, without `waitUntil`. That call does not clear other data centers.
  A cached 200 stays fresh until its own lifetime ends. Responses stored
  after this change stay fresh for 60 seconds. This lifetime does not make
  deletion immediate and does not invalidate every Cloudflare cache.
  Responses stored under the previous
  `public, max-age=31536000, immutable` policy, including the Batch 1 and
  Batch 3 staging probes, were not purged by this change. They can remain
  available until that original lifetime ends, or until a separately verified
  invalidation removes them.
* Staging has to show that an image uploaded after this change stops being
  served from its original URL once the 60-second lifetime has passed,
  before any production migration.
* `readBytes()` for an uploads key is a direct `get` (never hydrated).
* Hostinger keeps writing to `public/uploads/articles` on disk, unchanged.
  The pre-existing Node behaviour (a new file is 404 from `next start` until
  restart; LiteSpeed serves it from disk in front) is noted in the Stage 2
  report and is not changed by this stage.

## 6. Arabic radiation stylesheet as a Worker asset

`public/ar-ro-directory.css` (27 KB, tracked) is already a static asset and
is served by the assets binding at `/ar-ro-directory.css`. The only change is
the inlining read in `src/lib/i18n/arabic-radiation-html.ts`: it stops going
through `contentStorage().read("public/…")` and imports the file as a string
at build time (webpack `asset/source` rule scoped to that file), so the same
bytes are inlined on both hosts and the R2 backend never sees a `public/`
read outside `public/uploads/`. The `<link>` fallback stays for the case the
import is empty. `docs/content-storage.md` row 7 is updated accordingly.

## 7. Generated data on Workers

* **Sitemaps**: `.cache/sitemaps` is a Node disk cache. On Workers the route
  serves `generated/sitemap-<locale>.xml` from `gaf-static-staging`,
  regenerated by a scheduled handler (hourly) and after any CMS save that
  changes publication (`flushContentWrites()` success → `ctx.waitUntil`
  regeneration, which is acceptable here because the sitemap is derived
  data, not the save itself). CPU time of a full English build is measured
  under `wrangler dev` (the Hostinger process takes ~10 s; Workers Paid
  allows raising the CPU limit to 5 min for the scheduled handler).
* **Origin HTML cache**: not ported; edge cache + the existing
  `Cache-Control` headers. Purge on save is a Stage 4 concern.

## 8. Parity gates (run before the stage is reported)

| Gate | Command / expectation |
|---|---|
| TypeScript | `npx tsc --noEmit -p .` clean |
| Production build | `npm run build` exit 0; `opennextjs-cloudflare build` exit 0 |
| Storage | `test:unit` (storage, r2, cms store, routes-flush, sitemap-parity differ), `test:storage` all green |
| CMS / server | `test:specialty-engine` same 6 pre-existing failures, no new ones |
| SSR snapshot | `check:ssr-snapshot --compare /tmp/stage1/after.json` against `wrangler dev` (hostname matching `--base`): 0 differences; sitemaps structurally identical with `<lastmod>` drift inside the capture window only |
| Sitemap determinism | `src/server-tests/sitemap-parity.test.ts` green (added in this branch, see below) |
| Live JSON-LD | byte-identical to `/tmp/stage1/jsonld-live-after.json` (80 page types, 132 blocks) |
| Arabic sweep | `BASE_URL=<wrangler dev> npm run check:alternates`: 4,239 URLs pass, same single pre-existing drift |
| CMS round-trip | login, settings PUT → 200 → restore; media POST → served on next request without restart → DELETE → 404; conflict case → 409 |
| Memory | §4 (1)–(3) recorded |

### 8.1 Status on this branch (2026-10-21)

| Gate | Result |
|---|---|
| TypeScript | clean |
| Production build | `npm run build` and `npm run cf:build` (OpenNext + `scripts/cloudflare/post-build.mjs`) exit 0 |
| Storage | `test:storage` 8/8. Worker runtime tests 13/13 and the CMS store cases are inside `test:unit` |
| `test:unit` | 440 pass / 5 fail (445 tests) after §4.8. The 5 failures are `src/lib/i18n/ar-*-overlays.test.ts` importing a `server-only` module under plain `tsx`, and fail identically on the reviewed Stage 2 commit `7ae6163` |
| Worker smoke (`wrangler dev`, local R2 seeded with `cf:seed-local`) | `/`, `/ar`, doctor, hospital, cost, treatment, blog and country pages 200 in both editions; `/fr|ru|sw/*` 404 as on Hostinger; sitemaps 200; `/uploads/<missing>` 404 straight from the bucket; `/cms` 307 to login; `/api/cms/state` 401 |
| **Memory** | **prescribed 120 MiB workload passed** — §4.7 three sweeps (peak `usedSize` 105.8–106.3) and one post-gate sweep in §4.8 (9,819 requests, 0 fetch errors, post-GC 86.4 / 16.1 / 102.5, peak `usedSize` 107.4). `check:alternates` completes on three fresh 120 MiB isolates with the render gate at 8 (§4.8). Nothing deployed |
| SSR snapshot | against `/tmp/stage3/after.json`: bodies identical; six diffs are ISR `s-maxage` countdown seconds, same paths as §4.7. The `/ar` homepage cache directive leaked by the rewrite fetch was stripped |
| Arabic sweep | three capped `check:alternates` runs: all 4,239 URLs pass; the same one pre-existing flat-cost hreflang drift (`[ar, en]` vs `[en]`) |
| JSON-LD pin | same 33 labels as before this section: 48 of 80 fetched types match, 17 are lowercase 301s, 4 are case-fold and physician fields from `8c36502`, 11 fixture rows are absent from the baseline, 1 baseline key left the fixture. Page-type table in §4.8. Baseline not updated |
| Focused server tests | 71/71 after the sitemap comparison was pointed at `localePath` and the treatments assertion was aligned with authored Arabic translations |
| CMS | store read/write tests inside `test:unit` passed, including a failed write leaving the previous content intact. No live CMS write |

§4.9 rechecked this table on 2026-10-21 after closing the `CF-Worker`
bypass. The five overlay failures, the six ISR countdown header diffs, the
33 JSON-LD labels, the sitemap counts (7,418 / 4,239), and the single flat
EBRT hreflang FAIL are unchanged. Two further capped alternates runs
completed under the 120 MiB cap with the gate at 8. Account credentials,
Workers Paid, and the remote staging buckets are still missing, so a
staging deploy is not ready. §4.10 records the secret submission that
this running agent could not see. §4.11 is the later read-only API check:
the token is active, the account owns `gaf.healthcare`, Workers Paid is
still unreadable, and R2 is not enabled. No bucket was created.

## 9. Delivered ahead of the prerequisites

Requirement 8 does not depend on Cloudflare, so it is implemented on this
branch:

* `scripts/check/sitemap-parity.mjs` — element-by-element sitemap diff with
  a capture-window rule for `<lastmod>`; `npm run check:sitemap-parity`.
* `scripts/check/ssr-snapshot.mjs` — sitemap responses use that diff instead
  of body hashes, so the gate is deterministic without hiding URL, canonical
  form, namespace or element regressions. Older snapshots remain comparable.
* `scripts/check/sitemap-parity.test.mjs` (10 cases) and
  `src/server-tests/sitemap-parity.test.ts` (6 cases: two in-process builds
  per locale differ only in render-time `<lastmod>`; every `<loc>` canonical,
  on-site, locale-scoped and unique; every Arabic URL passes the publication
  gate; the index is well formed).

## 10. Out of scope for Stage 3 (unchanged from the approval)

No seeding of live data, no DNS change, no production route or custom
domain, no production deploy, no merge to `main`. The Stage 0/1/2 branches
remain as reviewed.
