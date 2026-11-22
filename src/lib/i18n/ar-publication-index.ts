/**
 * Build-time Arabic publication index for English catalogue hreflang (P0a/P3).
 *
 * When loaded, English catalogue routes can skip full Arabic R2 hydration and
 * still emit reciprocal hreflang only for paths that were published and
 * self-canonical at pack time (same rules as sitemaps: next deploy refreshes).
 */

export const AR_PUBLICATION_INDEX_ASSET_PATH = "/_gaf/ar-publication-index.json";

export type ArPublicationIndexDocument = {
  version: 1;
  generatedAt: string;
  /** English paths (no /ar prefix) that are AR-published and self-canonical. */
  paths: string[];
};

let loaded: Set<string> | null = null;
let generatedAt: string | null = null;

export function clearArPublicationIndex() {
  loaded = null;
  generatedAt = null;
}

export function hasArPublicationIndex() {
  return loaded !== null;
}

export function arPublicationIndexSize() {
  return loaded?.size ?? 0;
}

export function arPublicationIndexGeneratedAt() {
  return generatedAt;
}

/** True when the index is loaded and lists this English path. */
export function arPathIsIndexedPublished(englishPath: string) {
  if (!loaded) return false;
  const path = englishPath.split("?")[0] || "/";
  return loaded.has(path === "" ? "/" : path);
}

export function installArPublicationIndex(document: ArPublicationIndexDocument | string) {
  const parsed =
    typeof document === "string" ? (JSON.parse(document) as ArPublicationIndexDocument) : document;
  if (parsed.version !== 1 || !Array.isArray(parsed.paths)) {
    throw new Error("ar-publication-index: unsupported document shape");
  }
  loaded = new Set(parsed.paths.map((path) => (path.split("?")[0] || "/")));
  generatedAt = parsed.generatedAt;
}

export function buildArPublicationIndexDocument(
  paths: Iterable<string>,
  generatedAtIso = new Date().toISOString(),
): ArPublicationIndexDocument {
  const unique = [...new Set([...paths].map((path) => path.split("?")[0] || "/"))].sort();
  return { version: 1, generatedAt: generatedAtIso, paths: unique };
}
