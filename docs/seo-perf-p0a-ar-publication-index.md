# P0a / P3 — Lightweight Arabic Publication Index

**Branch:** `cursor/seo-perf-ar-publication-index-6064`  
**Status:** Implementation for review. **Not deployed** without separate approval.

## Root cause

English catalogue routes (`/treatments`, `/doctors`, `/hospitals`, `/costs`, `/blogs`) hydrated the full Arabic edition for hreflang — ~9.3 MB `ar/catalog-cms.json` plus 131 per-slug objects — dominating cold/miss Worker time.

## Technical changes

- Build packs `_gaf/ar-publication-index.json` (published + self-canonical AR paths) during `cf:build`.
- Worker loads the index before document routing.
- `groupsForRequest` skips AR hydrate for **English** catalogue paths when the index is present.
- `publishedLocalesForPath` uses the index for AR membership (reciprocal hreflang preserved for indexed paths).
- Arabic URLs still hydrate the full `ar` edition for rendering.

## SEO impact assessment

| Control | Effect |
|---|---|
| Public URLs | Unchanged |
| Canonical / x-default | Unchanged |
| Hreflang | Still only published self-canonical AR paths; unpublished never advertised |
| Sitemap / robots / noindex | Unchanged |
| Pacemaker redirect / 40×410 / 4×308 | Untouched |
| Staleness | Same class as packed sitemaps — refreshed on next content deploy |

## Rollback

Redeploy prior Worker without the index asset (or revert PR). Without the index, behaviour falls back to full AR hydrate.

## Memory / Worker impact

Expected: large reduction in cold EN catalogue R2 bytes and object GETs; lower isolate memory on EN-only catalogue traffic.
