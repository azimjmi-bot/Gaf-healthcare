import { contentStorage } from "@/lib/storage";

type Entry<T> = { version: string; value: T };

const entries = new Map<string, Entry<unknown>>();

const MISSING = "missing";

/**
 * Parsed content stores are several megabytes of JSON. Re-reading and
 * re-parsing them on every render was the single largest cost of a page
 * request, so read paths share one parsed copy per storage key and only
 * re-read when the backend reports a new version (a save in this process or
 * another, or a deploy that replaced the file). The cached value is shared:
 * callers must treat it as read-only and go through the fresh loader when they
 * intend to mutate.
 *
 * `key` is a storage key (`content/cms.json`), not a file path.
 */
export function readCachedJsonFile<T>(key: string, load: () => T): T {
  const current = contentStorage().version(key) ?? MISSING;
  const cached = entries.get(key) as Entry<T> | undefined;
  if (cached && cached.version === current) {
    return cached.value;
  }
  const value = load();
  entries.set(key, { version: current, value });
  return value;
}

/**
 * The same for a one-file-per-slug directory (`content/ar/articles`). The
 * version is the sorted listing with each file's version, so adding, removing
 * or rewriting any file re-runs `load`; an unchanged directory costs one
 * `list()` and a `version()` per file instead of reading and parsing every
 * file again. An Arabic render asks for these directories dozens of times.
 */
export function readCachedJsonDirectory<T>(prefix: string, load: () => T): T {
  const storage = contentStorage();
  const current = storage
    .list(prefix)
    .map((key) => `${key}@${storage.version(key) ?? MISSING}`)
    .join("\n");
  const cacheKey = `${prefix}/`;
  const cached = entries.get(cacheKey) as Entry<T> | undefined;
  if (cached && cached.version === current) {
    return cached.value;
  }
  const value = load();
  entries.set(cacheKey, { version: current, value });
  return value;
}

/** Drop the shared copy so the next read parses the content again. */
export function invalidateCachedJsonFile(key: string) {
  entries.delete(key);
}

/** Test hook: forget every cached copy. */
export function clearCachedJsonFiles() {
  entries.clear();
}
