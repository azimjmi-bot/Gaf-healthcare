/**
 * Content storage: the one seam between the application and wherever its
 * editable content lives (CMS JSON stores, per-slug Arabic articles and
 * treatment translations, AI generation history, media uploads).
 *
 * Keys are POSIX paths relative to the repository root, exactly as the files
 * are laid out today: `content/cms.json`, `content/ar/articles/<slug>.json`,
 * `public/uploads/articles/<file>.webp`. A backend decides where a key lives;
 * callers never build absolute paths.
 *
 * Reads and writes are synchronous because every loader in `src/lib/cms` is
 * synchronous and is called from dozens of render paths. A backend that is
 * asynchronous underneath (the planned R2 backend, see
 * docs/content-storage.md) must still satisfy this contract: reads come from
 * data it has already fetched, and `flush()` is how a request waits for its
 * writes to become durable before it answers.
 */
export interface ContentStorage {
  /** Backend name for logs and diagnostics. */
  readonly kind: string;

  /**
   * UTF-8 text at `key`, or `null` when the key does not exist. Any other
   * failure (permissions, I/O) throws; callers that want a default must catch.
   */
  read(key: string): string | null;

  /** Raw bytes at `key`, or `null` when the key does not exist. */
  readBytes(key: string): Uint8Array | null;

  /**
   * Replace the content at `key` atomically: a concurrent reader sees either
   * the previous content or the new content, never a partial file. For the
   * file-system backend the data is durable when this returns; for a backend
   * with asynchronous persistence the write is queued and `flush()` reports
   * its outcome. Throws when the write cannot even be started.
   */
  write(key: string, data: string | Uint8Array): void;

  /** Delete `key`. A missing key is not an error. */
  remove(key: string): void;

  /**
   * Keys of the objects directly under `prefix` (a directory-like key such as
   * `content/ar/articles`), sorted. Nested prefixes are not reported, because
   * an object store has no directories; an unknown prefix yields `[]`.
   */
  list(prefix: string): string[];

  /**
   * Opaque token that changes whenever the content at `key` changes, or
   * `null` when the key does not exist. Used to invalidate parsed-JSON caches
   * without re-reading and re-parsing megabytes of content on every render.
   */
  version(key: string): string | null;

  /**
   * Resolves once every write issued so far through this storage is durable;
   * rejects with the first write failure. Routes that save content await this
   * before responding so a persistence failure becomes an error response, not
   * a silent loss.
   */
  flush(): Promise<void>;
}

/** Thrown for keys that are absolute, escape the root, or use backslashes. */
export class StorageKeyError extends Error {
  constructor(key: string) {
    super(`Invalid storage key "${key}": keys are root-relative POSIX paths without ".." segments`);
    this.name = "StorageKeyError";
  }
}

/**
 * Thrown from `flush()` when a conditional write lost to a write made from
 * elsewhere (another isolate or process) since this process last read the
 * key. The local copy has been rolled back; the caller should re-read and
 * re-apply. Routes map it to 409.
 */
export class StorageConflictError extends Error {
  readonly key: string;
  constructor(key: string) {
    super(`Storage conflict on "${key}": the object changed since it was read; reload and retry`);
    this.name = "StorageConflictError";
    this.key = key;
  }
}

/**
 * Validate and normalise a key. Rejects anything that could escape the
 * content root so a URL or file name taken from stored JSON can never be
 * turned into an arbitrary path on the host.
 */
export function normaliseKey(key: string): string {
  if (typeof key !== "string" || key.length === 0) throw new StorageKeyError(String(key));
  if (key.includes("\\") || key.startsWith("/") || /^[A-Za-z]:/.test(key)) throw new StorageKeyError(key);
  const parts = key.split("/");
  if (parts.some((part) => part === "" || part === "." || part === "..")) throw new StorageKeyError(key);
  return parts.join("/");
}

/** The directory-like prefix of a key (`content/ar/articles/x.json` → `content/ar/articles`). */
export function parentKey(key: string): string {
  const index = key.lastIndexOf("/");
  return index === -1 ? "" : key.slice(0, index);
}
