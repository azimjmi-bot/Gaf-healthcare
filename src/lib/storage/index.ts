import { FsContentStorage } from "@/lib/storage/fs";
import { MemoryContentStorage } from "@/lib/storage/memory";
import { StorageConflictError, type ContentStorage } from "@/lib/storage/types";

export type { ContentStorage } from "@/lib/storage/types";
export { StorageConflictError, StorageKeyError } from "@/lib/storage/types";

type ChangeListener = (key: string) => void;
type Registry = { active: ContentStorage | undefined; listeners: Set<ChangeListener> };

/*
 * The registry lives on `globalThis` rather than in module scope because on
 * Workers this module is bundled twice: once into the entry that installs the
 * R2 backend and once into the OpenNext server bundle that renders pages.
 * Both copies must see the same storage. In a single Node process the two
 * forms are equivalent.
 */
const REGISTRY = Symbol.for("gaf.content-storage");
function registry(): Registry {
  const holder = globalThis as Record<symbol, Registry | undefined>;
  return (holder[REGISTRY] ??= { active: undefined, listeners: new Set() });
}

/**
 * Backend selection. `GAF_STORAGE` is unset on Hostinger and in development,
 * so the file-system backend is used; nothing in the production path changes
 * unless the variable is set. `memory` exists for tests. `r2` is refused
 * here on purpose: the Workers entry constructs the R2 backend from its
 * bindings and installs it with `setContentStorage()` before any request is
 * handled, so a read that somehow runs first fails loudly instead of seeing
 * an empty store. Any other value is refused the same way.
 */
function createDefaultStorage(): ContentStorage {
  const backend = process.env.GAF_STORAGE || "fs";
  if (backend === "fs") return new FsContentStorage();
  if (backend === "memory") return new MemoryContentStorage();
  if (backend === "r2") {
    throw new Error(
      'GAF_STORAGE="r2" requires the Workers entry to install the R2 backend before the first request; ' +
        "content storage was read before initialisation (see docs/content-storage.md).",
    );
  }
  throw new Error(
    `GAF_STORAGE="${backend}" is not available in this build. ` +
      "Only the fs backend ships today; see docs/content-storage.md for the planned backends.",
  );
}

/** The process-wide content storage. Created lazily on first use. */
export function contentStorage(): ContentStorage {
  const reg = registry();
  if (!reg.active) reg.active = createDefaultStorage();
  return reg.active;
}

/**
 * Replace the active storage. Tests use it to run the stores against a
 * `MemoryContentStorage`; a hosting entry point that must construct its
 * backend from runtime bindings uses it before the first request is served.
 * Passing `undefined` restores lazy default selection.
 */
export function setContentStorage(storage: ContentStorage | undefined) {
  registry().active = storage;
}

/**
 * Wait for every content write issued so far to be durable. Each CMS route
 * awaits this before it responds, so with a backend that persists
 * asynchronously a failed write turns into a 500 instead of an acknowledged
 * save that never reached storage. With the file-system backend it resolves
 * immediately because `write()` only returns after `rename()`.
 */
export function flushContentWrites(): Promise<void> {
  return contentStorage().flush();
}

/**
 * HTTP status a CMS write route should answer with for `err`. A write the
 * backend refused because the object changed underneath it is a 409 the
 * editor can resolve by reloading; everything else stays the 500 it was.
 */
export function storageErrorStatus(err: unknown): 409 | 500 {
  return err instanceof StorageConflictError ? 409 : 500;
}

/**
 * Be told when a backend replaced the content at `key` behind the process's
 * back (another isolate wrote it and this one re-hydrated). Stores that keep
 * their own parsed cache use this to drop it; `readCachedJsonFile` does not
 * need it because it compares `version()` on every read.
 */
export function onContentReplaced(listener: ChangeListener): () => void {
  const { listeners } = registry();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** For backends: announce that `key` now holds content this process did not write. */
export function notifyContentReplaced(key: string) {
  for (const listener of registry().listeners) listener(key);
}
