# Content storage

Everything the CMS can edit — articles, settings, catalog overlays, curated
Treatments, Arabic translations, AI generation history and media uploads —
reaches disk through one module, `src/lib/storage`. This document is the
inventory of what is stored where, the contract every backend must satisfy,
and the R2 object-store backend the Cloudflare Workers deployment uses. It
was written for the hosting migration (Stage 2) and updated when the R2
backend shipped (Stage 3, `docs/cloudflare-stage-3.md`).

Nothing in this stage changes the production path. `GAF_STORAGE` is unset on
Hostinger, so the file-system backend is selected and content lives in the
checkout exactly as before.

## 1. Inventory of filesystem touchpoints

Nine places touched the file system before the abstraction existed. The first
seven now go through `contentStorage()`; the last two are intentionally left
on `node:fs` because they are not content.

| # | Module | Keys | Operation | Size today | Through storage |
|---|--------|------|-----------|-----------:|:---------------:|
| 1 | `src/lib/cms/store.ts` | `content/cms.json`, `content/<edition>/cms.json`, `content/<edition>/articles/*.json` | **read** (every render via `readCms`), **write** (article/settings/taxonomy/media-list routes), **list** (Arabic per-slug articles; 82 files) | en 4.7 MB, ar 4 KB + 5.6 MB of article files, fr/ru/sw 4 KB each | yes |
| 2 | `src/lib/cms/catalog-store.ts` | `content/catalog-cms.json`, `content/<edition>/catalog-cms.json` | **read** (cached per process generation), **write** (catalog/specialty/radiation-procedure routes) | en 1.3 MB, ar 7.9 MB | yes |
| 3 | `src/lib/cms/curated-treatment-store.ts` | `content/curated-treatments.json`, `content/ar/treatments/*.json` | **read** (`readCuratedTreatments`, publication gating, sitemaps), **write** (curated-treatment routes), **list** (Arabic per-slug translations; 93 files) | 4.8 MB + 6.5 MB | yes |
| 4 | `src/lib/cms/json-file-cache.ts` | any JSON key above | **cache** of parsed JSON, keyed by storage key and invalidated by `version(key)` | in-memory only | yes (`version`) |
| 5 | `src/lib/ai/history.ts` | `content/ai-generations.json` | **read**, **write** (AI generate/apply routes; capped at 200 rows) | 4 KB | yes |
| 6 | `src/app/api/cms/media/route.ts` | `public/uploads/articles/<file>` | **upload** (binary write), **delete**; the media list itself is rows in `cms.json` | 21 MB, 309 files (720 tracked under `public/uploads` in total) | yes |
| 7 | `src/lib/i18n/arabic-radiation-html.ts` | `public/ar-ro-directory.css` | **read** of a built stylesheet to inline it; falls back to a `<link>` when missing. On Workers it is a read-only Worker asset loaded from the `ASSETS` binding, not an R2 object | build artefact | yes |
| 7b | `src/lib/catalog-seed.ts` (for `src/lib/doctors.ts`, `src/lib/hospitals.ts`) | `src/data/ginger-catalog.json` | **read** once per process on first access to the catalog arrays; the seed is parsed, the `Doctor[]`/`Hospital[]` rows are built and the seed is dropped. Was a static import bundled into the server script. On Workers it is a read-only Worker asset (`/_gaf/src/data/ginger-catalog.json`, not a public URL), never an R2 object; missing or malformed throws `CatalogUnavailableError`, never an empty catalog | 4.6 MB, tracked | yes |
| 8 | `src/lib/i18n/sitemap-entries.ts` | `.cache/sitemaps/<locale>.xml` (`SITEMAP_CACHE_DIR`) | **generated data**: a disk cache of rendered sitemap XML, rebuilt from content when stale; its writes are best-effort, so on Workers (no disk) the sitemap routes rely on the ISR cache instead | derived, ignored by git | no — platform cache |
| 9 | `src/instrumentation.ts` → `server-cache.mjs` | `.next/`, origin HTML cache under the working directory | **cache** of rendered HTML for crawlers; no content I/O. Skipped on Workers | derived | no — Hostinger-only runtime |

Not in the table because they are read-only build inputs rather than editable
content: the Ginger catalog JSON, `src/data/**`, `content/treatments/*.md`
(unused by the app), and `messages/`.

Reads dominate by orders of magnitude. Every page render calls `readCms`,
`loadCatalogCms` and often `readCuratedTreatments`; writes happen only from
authenticated `/api/cms/**` routes, a few per day.

## 2. The contract: `ContentStorage`

```ts
interface ContentStorage {
  readonly kind: string;
  read(key: string): string | null;          // null = missing; other failures throw
  readBytes(key: string): Uint8Array | null;
  write(key: string, data: string | Uint8Array): void;   // atomic replace
  remove(key: string): void;                 // missing key is not an error
  list(prefix: string): string[];            // direct child objects, sorted
  version(key: string): string | null;       // changes whenever content changes
  flush(): Promise<void>;                    // resolves when all writes are durable
}
```

Keys are root-relative POSIX paths (`content/cms.json`,
`public/uploads/articles/x.webp`). `normaliseKey` rejects absolute paths,
backslashes, drive letters and `.`/`..` segments, so a file name taken from
stored JSON can never address a path outside the content root.

### Why synchronous

Eighty-plus modules call `readCms`, `loadCatalogCms`, `readCuratedTreatments`
or their derivatives from synchronous render code, `generateMetadata`,
sitemap builders and tests. Converting them to `async` would touch every
page and component for no functional gain on the file-system backend and
would make the Hostinger path riskier, not safer. The seam is therefore
synchronous, and the asynchronous reality of an object store is handled
inside the backend (section 3) rather than pushed onto callers.

### Durability: `write()` + `flush()`

* On the file-system backend `write()` is `mkdir` + temp file + `rename`; the
  data is durable when it returns and `flush()` resolves immediately.
* A backend that persists asynchronously must still make `write()` visible to
  the next `read()` in the same process immediately (so `saveCms` followed by
  `readCms` in the same request is consistent), queue the persistence, and
  report its outcome from `flush()`.
* **Every CMS route that writes awaits `flushContentWrites()` inside its
  `try` block before building the success response.** A rejected flush is
  caught by the route and becomes a 500, so the editor sees the failure rather
  than a green toast for a save that never landed. The structural test
  `src/lib/storage/cms-routes-flush.test.ts` fails the build if a write route
  stops doing this.
* A write that cannot even be started throws from `write()`; the stores leave
  their caches untouched in that case (`invalidateCachedJsonFile` runs only
  after a successful `write`).

### Caching and `version()`

`readCachedJsonFile(key, load)` keeps one parsed copy per key and re-parses
only when `version(key)` changes. On the file-system backend the version is
`mtimeMs:size`, so a deploy or another process replacing the file is picked up
on the next read without a restart. `saveCms`/`saveCuratedTreatments` also
invalidate explicitly so the same process never serves a stale copy even if
the clock did not move.

### Backend selection

| `GAF_STORAGE` | Backend | Where |
|---------------|---------|-------|
| unset / `fs` | `FsContentStorage(process.cwd())` | Hostinger, local dev, `next build` |
| `memory` | `MemoryContentStorage` | tests |
| `r2` | throws at first use unless the Worker entry installed `R2ContentStorage` first | Cloudflare Workers (`wrangler.jsonc` sets it); a read before initialisation is an error, never an empty store |
| anything else | throws at first use | never silently falls back |

`setContentStorage(storage)` replaces the active backend before the first
request. Tests use it with a `MemoryContentStorage`; the Worker entry
(`src/worker/runtime.ts`) uses it with the R2 backend built from its bindings.

## 3. The R2 backend (`src/lib/storage/r2.ts`)

Implemented in Stage 3 for Cloudflare Workers; inactive everywhere else.
The constraints that shaped it:

* Workers have no file system and a **128 MB isolate memory limit**.
* R2 is strongly consistent per object but every call is asynchronous; a
  page render cannot `await` dozens of `GET`s.
* The synchronous `ContentStorage` contract must hold unchanged.

### 3.1 Initialisation and hydration

1. The Worker entry (`src/worker/runtime.ts`) constructs
   `R2ContentStorage({ content, static, assets, assetKeys })` from its
   bindings and calls `setContentStorage()` once per isolate, before the
   first `await`. The registry lives on `globalThis` because the entry and
   the OpenNext server bundle each carry their own copy of
   `src/lib/storage/index.ts`.
2. `read()` is served from an in-isolate map of `key → { bytes, etag }`,
   **hydrated from R2, never from a build snapshot**.
3. Keys are grouped by edition (`GROUP_LAYOUT`): `en` = `cms.json`,
   `catalog-cms.json`, `curated-treatments.json`; `ar` = `content/ar/**`
   (the two stores plus the `articles/` and `treatments/` prefixes, listed so
   new per-slug files need no deploy); `fr`/`ru`/`sw` = their two files;
   `cms` = `ai-generations.json`. Each group hydrates independently and an
   English hydration performs no `get` under `content/ar/` (tested).
4. **Which groups a request hydrates is a Worker policy, not a storage
   one.** The plan assumed an English request could skip Arabic; it cannot
   without changing output: every public page asks whether its Arabic
   equivalent is published (hreflang block, language switcher), and Arabic
   pages overlay the English catalog. So public traffic hydrates every
   edition before routing and only the CMS-only `cms` group is deferred to
   `/cms` and `/api/cms/*`. The per-group machinery stays so a future locale
   that is *not* consulted from other pages can be loaded on demand.
5. Hydration is gated by `content/.manifest.json`, written by the seed. A
   bucket without a manifest, or missing any manifest key of the group, or
   unreachable, rejects with `StorageHydrationError` and the Worker answers
   **503** with `Retry-After`. An empty bucket is an error, never an empty
   CMS. Concurrent hydrations of several groups share one manifest read, one
   version baseline and one asset load.
6. A content key read, listed or written before its group is hydrated
   throws `StorageHydrationError` (and logs). Returning `null` there would be
   exactly the silent empty content this backend exists to prevent; the
   stores' `fallbackStore` paths are reached only for keys genuinely absent
   from a hydrated group.

### 3.2 Missing objects and malformed JSON

* A key that is absent from a **hydrated** group reads as `null`, and the
  stores map that to their defaults exactly as on the file system.
* Malformed JSON is the caller's problem by contract; the backend stores
  bytes and never parses content objects.
* `public/uploads/**` resolves to the **static bucket** (`uploads/**`) and is
  never hydrated: `write()`/`remove()` go straight to the bucket and the
  Worker serves `/uploads/*` from it. `readBytes()` of an upload is answered
  from the in-isolate map only for an object this isolate wrote.
* The few deploy-time files the renderer reads at request time (`ASSET_KEYS`:
  `public/ar-ro-directory.css` and the static catalog
  `src/data/ginger-catalog.json`, each mapped to an asset path) are **Worker
  assets**: fetched once from the `ASSETS` binding during hydration,
  read-only (`write()` throws `StorageKeyError`), never stored in R2, and a
  read before they are loaded throws `StorageHydrationError`. The catalog
  lives under `/_gaf/` in the assets directory; `run_worker_first` sends
  `/_gaf/*` to the Worker, which answers 404.

### 3.3 Writes and failures

* `write()` replaces the in-isolate entry synchronously with a `pending:N`
  version tag (the saving request sees its own write) and enqueues a
  conditional put: `onlyIf: { etagMatches }` when the object is known,
  `etagDoesNotExist` when it is new. Queues are per key and ordered.
* `flush()` awaits everything queued so far, including work queued while it
  waited, and rejects with the first failure. The routes already await it
  before responding, so an un-durable write is a 500/409, never a silent
  "saved".
* On a failed put the entry is **rolled back** to the last committed
  `{ bytes, etag }`, later queued ops on that key are dropped, and
  `content/.version.json` is not republished. Tested: `readCms()` returns the
  previous store after a failed save and a retry succeeds.
* Media writes carry `httpMetadata.contentType`; after a durable put or
  delete of a static object the backend calls `onStaticChange`, which the
  Worker uses to purge the edge cache for `/uploads/<key>`.

### 3.4 Concurrency

* Two editors saving the same key from two isolates: the second conditional
  put returns `null`, the backend throws `StorageConflictError` from
  `flush()`, re-fetches the winner so the loser is not left stale (and fires
  `notifyContentReplaced`), and the route answers **409**
  (`storageErrorStatus()`); the editor reloads and reapplies. Tested with
  two isolates racing on one bucket: exactly one put is fulfilled.
* Within one isolate, writes to a key are serialised; different keys run in
  parallel.

### 3.5 Cache invalidation and stale reads

* `version(key)` is the R2 etag, so `readCachedJsonFile` re-parses only on
  change.
* After a successful flush the backend rewrites `content/.version.json`
  (`{ groups: { en: stamp, … }, updatedAt }`). On each request the Worker
  calls `refreshIfStale()`: at most once per `versionCheckIntervalMs`
  (1 s), a conditional `GET` with `etagDoesNotMatch`; unchanged costs one
  body-less response, changed re-hydrates only the groups whose stamp moved
  and calls `notifyContentReplaced(key)` for every replaced key.
  `catalog-store.ts` listens and bumps its generation. Staleness across
  isolates is therefore bounded by one request plus one second.
* A failed version broadcast does not fail the save (the content put already
  succeeded); the groups stay dirty and the next flush republishes.
* The origin HTML cache (`server-cache.mjs`) is Node-only; on Workers the
  instrumentation hook returns early and the ISR routes use OpenNext's R2
  incremental cache with the same `revalidate = 300`.

### 3.6 Memory

The backend holds the raw bytes of every hydrated key (one `Uint8Array`
shared by the reader map and the committed map) plus whatever the stores
parse. Measured figures for the full public set (en + ar + fr + ru + sw) are
in `docs/cloudflare-stage-3.md` §4. Media is never hydrated;
`ai-generations.json` is not loaded for public traffic.

### 3.7 What remains unacceptable

* Reading content from a bundle-time snapshot as the source of truth.
* Acknowledging a save before `flush()` resolved.
* Falling back from an unavailable R2 to the in-isolate copy for writes.
* Loading media bytes into isolate memory on hydration.
* Serving a request whose groups did not hydrate.

## 4. Tests

| Suite | Script | Covers |
|-------|--------|--------|
| `src/lib/storage/storage.test.ts` | `npm run test:unit` | fs/memory parity, atomic writes, out-of-process version change, write failure, deferred flush failure, key validation, `GAF_STORAGE` selection |
| `src/lib/storage/cms-routes-flush.test.ts` | `npm run test:unit` | every write route awaits `flushContentWrites()`; no CMS route or store imports `fs` or uses `process.cwd()` |
| `src/lib/cms/store.test.ts` | `npm run test:unit` | missing store, malformed JSON, partial merge, save/reload, cache invalidation, edition isolation, per-slug Arabic precedence, failed write, deferred failure |
| `src/server-tests/content-storage-stores.test.ts` | `npm run test:storage` | the same for catalog overlays, curated Treatments (incl. Arabic translation files) and AI history, under the `react-server` condition those modules require |
| `src/lib/storage/r2.test.ts` | `npm run test:unit` | R2 backend against `FakeR2Bucket`: hydration refusals, edition isolation, backend contract, durability, rollback, ETag conflicts between isolates, serialised writes, version-document staleness, asset keys |
| `src/worker/runtime.test.ts` | `npm run test:unit` | Worker entry: group policy, install-before-route, 503 on unseeded/incomplete/unreachable buckets, cross-isolate refresh, `/uploads/*` serving and cache purge, image-optimizer asset fallthrough, seed layout parity |

`npm test` runs all of them.
