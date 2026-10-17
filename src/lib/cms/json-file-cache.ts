import { statSync } from "fs";

type Entry<T> = { mtimeMs: number; size: number; value: T };

const entries = new Map<string, Entry<unknown>>();

function signature(path: string) {
  try {
    const stat = statSync(path);
    return { mtimeMs: stat.mtimeMs, size: stat.size };
  } catch {
    return { mtimeMs: -1, size: -1 };
  }
}

/**
 * Parsed content stores are several megabytes of JSON. Re-reading and
 * re-parsing them on every render was the single largest cost of a page
 * request, so read paths share one parsed copy per file and only re-read when
 * the file on disk changes (a save in this process or another, or a deploy
 * that replaced the file). The cached value is shared: callers must treat it
 * as read-only and go through the fresh loader when they intend to mutate.
 */
export function readCachedJsonFile<T>(path: string, load: () => T): T {
  const current = signature(path);
  const cached = entries.get(path) as Entry<T> | undefined;
  if (cached && cached.mtimeMs === current.mtimeMs && cached.size === current.size) {
    return cached.value;
  }
  const value = load();
  entries.set(path, { ...current, value });
  return value;
}

/** Drop the shared copy so the next read parses the file again. */
export function invalidateCachedJsonFile(path: string) {
  entries.delete(path);
}
