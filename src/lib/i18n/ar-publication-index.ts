/**
 * Build-time Arabic publication index for English catalogue hreflang (P0a/P3).
 *
 * When loaded, English catalogue routes can skip full Arabic R2 hydration and
 * still emit reciprocal hreflang only for paths that were published and
 * self-canonical at pack time (same rules as sitemaps: next deploy refreshes).
 *
 * ## Cross-bundle state (Workers / OpenNext)
 *
 * On Cloudflare the Worker entry and the OpenNext server are separate bundles.
 * Each evaluates its own copy of this module. Module-scoped `let` state is
 * therefore isolate-local to that copy: the entry can `install` while the
 * render bundle still sees an empty index, skips are applied, and EN catalogue
 * HTML then reads cold `content/ar/*` (PR #49 / #54 incident).
 *
 * Content storage already solved the same class of bug with
 * `Symbol.for("gaf.content-storage")` on `globalThis` (`src/lib/storage/index.ts`).
 * This index uses the same pattern: every module instance resolves
 * `Symbol.for(AR_PUBLICATION_INDEX_GLOBAL_KEY)` to one shared registry object.
 *
 * Lifecycle assumptions (match content-storage intent, not its write path):
 * - Install happens once per isolate from the packed Worker asset, before
 *   `groupsForRequest` / render.
 * - The index is deploy-time data; CMS writes do not mutate it mid-isolate.
 *   A new deploy refreshes the asset (same as sitemaps).
 * - `clearArPublicationIndex` is for tests and for corrupt/invalid load
 *   fallback so EN catalogue routes return to full AR hydrate.
 * - Isolate recycle drops `globalThis` state naturally; no request-scoped
 *   ALS is required because the packed paths are constant for the deploy.
 */

export const AR_PUBLICATION_INDEX_ASSET_PATH = "/_gaf/ar-publication-index.json";

/** Stable cross-bundle key — must stay identical in every Worker/OpenNext copy. */
export const AR_PUBLICATION_INDEX_GLOBAL_KEY = "gaf.ar-publication-index";

export type ArPublicationIndexDocument = {
  version: 1;
  generatedAt: string;
  /** English paths (no /ar prefix) that are AR-published and self-canonical. */
  paths: string[];
};

type ArPublicationIndexRegistry = {
  /** `null` = uninitialised / cleared (treat as missing → full hydrate). */
  paths: Set<string> | null;
  generatedAt: string | null;
};

const REGISTRY = Symbol.for(AR_PUBLICATION_INDEX_GLOBAL_KEY);

function registry(): ArPublicationIndexRegistry {
  const holder = globalThis as Record<symbol, ArPublicationIndexRegistry | undefined>;
  return (holder[REGISTRY] ??= { paths: null, generatedAt: null });
}

export function clearArPublicationIndex() {
  const reg = registry();
  reg.paths = null;
  reg.generatedAt = null;
}

export function hasArPublicationIndex() {
  return registry().paths !== null;
}

export function arPublicationIndexSize() {
  return registry().paths?.size ?? 0;
}

export function arPublicationIndexGeneratedAt() {
  return registry().generatedAt;
}

/** True when the index is loaded and lists this English path. */
export function arPathIsIndexedPublished(englishPath: string) {
  const paths = registry().paths;
  if (!paths) return false;
  const path = englishPath.split("?")[0] || "/";
  return paths.has(path === "" ? "/" : path);
}

export function installArPublicationIndex(document: ArPublicationIndexDocument | string) {
  const parsed =
    typeof document === "string" ? (JSON.parse(document) as ArPublicationIndexDocument) : document;
  if (parsed.version !== 1 || !Array.isArray(parsed.paths)) {
    throw new Error("ar-publication-index: unsupported document shape");
  }
  if (!parsed.paths.every((path) => typeof path === "string")) {
    throw new Error("ar-publication-index: paths must be strings");
  }
  // Assign only after validation so a corrupt document never leaves a half-loaded set.
  const reg = registry();
  reg.paths = new Set(parsed.paths.map((path) => path.split("?")[0] || "/"));
  reg.generatedAt = typeof parsed.generatedAt === "string" ? parsed.generatedAt : null;
}

export function buildArPublicationIndexDocument(
  paths: Iterable<string>,
  generatedAtIso = new Date().toISOString(),
): ArPublicationIndexDocument {
  const unique = [...new Set([...paths].map((path) => path.split("?")[0] || "/"))].sort();
  return { version: 1, generatedAt: generatedAtIso, paths: unique };
}
