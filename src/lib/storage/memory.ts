import { normaliseKey, parentKey, type ContentStorage } from "@/lib/storage/types";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

/**
 * In-memory backend for tests. Holds the same keys the file-system backend
 * would and lets a test inject write failures to exercise the error paths
 * that are hard to provoke on a real disk.
 */
export class MemoryContentStorage implements ContentStorage {
  readonly kind = "memory";
  private readonly objects = new Map<string, { bytes: Uint8Array; version: number }>();
  private counter = 0;
  private pendingFailure: Error | null = null;
  private deferredFailure: Error | null = null;

  constructor(seed: Record<string, string | Uint8Array> = {}) {
    for (const [key, data] of Object.entries(seed)) this.write(key, data);
  }

  /** Make the next `write()` throw synchronously, as a disk full or permission error would. */
  failNextWrite(error: Error) {
    this.pendingFailure = error;
  }

  /**
   * Accept the next `write()` but report `error` from `flush()`, the shape an
   * asynchronous backend produces when persistence fails after the request
   * handler has already moved on.
   */
  failNextFlush(error: Error) {
    this.deferredFailure = error;
  }

  read(key: string): string | null {
    const bytes = this.readBytes(key);
    return bytes === null ? null : decoder.decode(bytes);
  }

  readBytes(key: string): Uint8Array | null {
    return this.objects.get(normaliseKey(key))?.bytes.slice() ?? null;
  }

  write(key: string, data: string | Uint8Array): void {
    const normalised = normaliseKey(key);
    if (this.pendingFailure) {
      const error = this.pendingFailure;
      this.pendingFailure = null;
      throw error;
    }
    const bytes = typeof data === "string" ? encoder.encode(data) : data.slice();
    this.counter += 1;
    this.objects.set(normalised, { bytes, version: this.counter });
  }

  remove(key: string): void {
    this.objects.delete(normaliseKey(key));
  }

  list(prefix: string): string[] {
    const base = normaliseKey(prefix);
    return [...this.objects.keys()].filter((key) => parentKey(key) === base).sort();
  }

  version(key: string): string | null {
    const entry = this.objects.get(normaliseKey(key));
    return entry ? String(entry.version) : null;
  }

  flush(): Promise<void> {
    if (this.deferredFailure) {
      const error = this.deferredFailure;
      this.deferredFailure = null;
      return Promise.reject(error);
    }
    return Promise.resolve();
  }

  /** Every key currently stored, sorted; for assertions. */
  keys(): string[] {
    return [...this.objects.keys()].sort();
  }
}
