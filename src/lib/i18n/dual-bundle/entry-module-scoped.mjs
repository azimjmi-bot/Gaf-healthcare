/** Broken pattern: module-scoped state (pre-fix). Separate file URL from opennext twin. */
let loaded = null;

export function clearArPublicationIndex() {
  loaded = null;
}

export function hasArPublicationIndex() {
  return loaded !== null;
}

export function installArPublicationIndex(document) {
  const parsed = typeof document === "string" ? JSON.parse(document) : document;
  loaded = new Set(parsed.paths);
}

export function arPathIsIndexedPublished(path) {
  return loaded ? loaded.has(path) : false;
}

export const BUNDLE_ID = "module-scoped-entry";
