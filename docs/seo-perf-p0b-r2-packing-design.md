# P0b — R2 Object Packing Design (no production migration)

**Status:** Design only. **Do not** migrate production R2 layout or CMS writes without separate approval.

## Problem

Cold hydrate of English alone reads ~12.7 MB across three JSON objects (`cms.json`, `catalog-cms.json`, `curated-treatments.json`). Arabic adds ~9.3 MB catalog plus 131 per-slug GETs (mitigated separately by P0a for EN catalogue hreflang).

## Goals

- Reduce R2 **request count** and end-to-end cold hydrate time.
- Preserve synchronous `ContentStorage` read API.
- Preserve atomic CMS publication + generation invalidation.
- Keep rollback to loose objects possible.

## Proposed grouping

| Pack | Contents | Readers |
|---|---|---|
| `content/en.content.pack` | cms + catalog-cms + curated-treatments | Every EN hydrate |
| `content/ar.catalog.pack` | ar/cms + ar/catalog-cms | AR hydrate / optional |
| `content/ar.overlays.pack` | ar/articles/* + ar/treatments/* | AR page render only |

Format: versioned length-prefixed frames or zip-like TOC + deflate (reuse existing `pack()` helpers in `r2.ts` where possible). Mirror `cost-articles.pack` precedent.

## Evaluation

| Topic | Assessment |
|---|---|
| Object grouping | High leverage for EN (3 GETs → 1) |
| JSON parse cost | Unchanged after unpack; may spike CPU on first unpack |
| Memory | Peak higher during unpack; packed form can stay compressed in map |
| R2 request reduction | EN: 3→1; AR overlays: 131→1 list/get |
| Cache behaviour | HTML cache keys unchanged (still generation-based) |
| Atomic CMS publication | Flush must write pack + version stamp together; dual-write transitional period |
| Generation invalidation | `.version.json` group stamps still drive HTML cache miss |
| Rollback | Keep reading loose keys if pack missing (feature flag / manifest capability) |

## Before/after benchmarks (representative, design-time estimates)

| Scenario | Today (measured / inferred) | With EN pack (target) |
|---|---|---|
| Cold EN-only hydrate R2 GETs | 3 large + manifest/version | 1 pack + manifest/version |
| Cold EN catalogue (+ full AR) | EN 3 + AR ~133 | Prefer P0a instead of packing AR for EN hreflang |
| Warm isolate miss | SSR-bound (~150–430 ms) | Unchanged |

Exact p50/p95 require a staging Worker with packed seed — **out of scope until packing implementation is approved**.

## Implementation phases (future PR)

1. Packer + dual-read in `R2ContentStorage.hydrate` (pack preferred, loose fallback).
2. CMS flush writes packs for dirty groups.
3. Staging seed migration + benchmarks.
4. Production cutover approval; remove loose keys only after soak.

## Non-goals

- Changing public URLs, redirects, publication gates, or sitemap rules.
- Deploying packing without owner approval.
