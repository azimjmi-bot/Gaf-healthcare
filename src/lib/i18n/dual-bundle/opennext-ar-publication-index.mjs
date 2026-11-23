/**
 * Stand-in for the OpenNext server copy of ar-publication-index.
 * Intentionally a separate file URL from entry-ar-publication-index.mjs so
 * Node loads a second module instance; state is shared only via Symbol.for.
 */
const REGISTRY = Symbol.for("gaf.ar-publication-index");

function registry() {
  const holder = globalThis;
  if (!holder[REGISTRY]) holder[REGISTRY] = { paths: null, generatedAt: null };
  return holder[REGISTRY];
}

export function clearArPublicationIndex() {
  const reg = registry();
  reg.paths = null;
  reg.generatedAt = null;
}

export function hasArPublicationIndex() {
  return registry().paths !== null;
}

export function arPathIsIndexedPublished(englishPath) {
  const paths = registry().paths;
  if (!paths) return false;
  const path = englishPath.split("?")[0] || "/";
  return paths.has(path === "" ? "/" : path);
}

export function installArPublicationIndex(document) {
  const parsed = typeof document === "string" ? JSON.parse(document) : document;
  if (parsed.version !== 1 || !Array.isArray(parsed.paths)) {
    throw new Error("ar-publication-index: unsupported document shape");
  }
  if (!parsed.paths.every((path) => typeof path === "string")) {
    throw new Error("ar-publication-index: paths must be strings");
  }
  const reg = registry();
  reg.paths = new Set(parsed.paths.map((path) => path.split("?")[0] || "/"));
  reg.generatedAt = typeof parsed.generatedAt === "string" ? parsed.generatedAt : null;
}

export const BUNDLE_ID = "opennext-server";
