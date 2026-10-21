import type { R2BucketLike, R2ListResultLike, R2ObjectBodyLike, R2ObjectLike } from "@/lib/storage/r2";

const encoder = new TextEncoder();

/**
 * In-memory stand-in for a Workers R2 bucket, for tests. Implements the
 * subset `R2ContentStorage` uses with the same semantics the binding has:
 * strong consistency, an etag per object version, `onlyIf` preconditions on
 * `put` (returning `null` when they fail) and on `get` (returning the object
 * without a body when `etagDoesNotMatch` is not satisfied), paginated `list`.
 * Tests can inject failures and write "from another isolate".
 */
export class FakeR2Bucket implements R2BucketLike {
  private readonly objects = new Map<string, { bytes: Uint8Array; etag: string; contentType?: string }>();
  private counter = 0;
  private failures = new Map<string, Error>();
  readonly calls: { op: string; key?: string }[] = [];
  /** Wait on this before performing the next put, to interleave two isolates deterministically. */
  beforePut: ((key: string) => Promise<void>) | null = null;

  constructor(seed: Record<string, string | Uint8Array> = {}) {
    for (const [key, data] of Object.entries(seed)) this.seed(key, data);
  }

  /** Write directly, as a seed script or another isolate would. */
  seed(key: string, data: string | Uint8Array): string {
    this.counter += 1;
    const etag = `"v${this.counter}"`;
    this.objects.set(key, { bytes: typeof data === "string" ? encoder.encode(data) : data.slice(), etag });
    return etag;
  }

  /** Remove directly, bypassing preconditions. */
  unseed(key: string) {
    this.objects.delete(key);
  }

  /** Make the next call of `op` (`get`, `put`, `delete`, `list`) reject with `error`. */
  failNext(op: "get" | "put" | "delete" | "list", error: Error) {
    this.failures.set(op, error);
  }

  text(key: string): string | null {
    const object = this.objects.get(key);
    return object ? new TextDecoder().decode(object.bytes) : null;
  }

  etag(key: string): string | null {
    return this.objects.get(key)?.etag ?? null;
  }

  keys(): string[] {
    return [...this.objects.keys()].sort();
  }

  /** Record the call, apply an injected failure, then yield once as real I/O would. */
  private async io(op: string, key?: string) {
    this.calls.push({ op, key });
    const error = this.failures.get(op);
    if (error) {
      this.failures.delete(op);
      throw error;
    }
    await new Promise<void>((resolve) => setImmediate(resolve));
  }

  private describe(key: string): R2ObjectLike {
    const object = this.objects.get(key)!;
    return { key, etag: object.etag, size: object.bytes.byteLength, httpMetadata: { contentType: object.contentType } };
  }

  async get(key: string, options?: { onlyIf?: { etagDoesNotMatch?: string } }): Promise<R2ObjectBodyLike | R2ObjectLike | null> {
    await this.io("get", key);
    const object = this.objects.get(key);
    if (!object) return null;
    if (options?.onlyIf?.etagDoesNotMatch !== undefined && options.onlyIf.etagDoesNotMatch === object.etag) {
      return this.describe(key);
    }
    const bytes = object.bytes.slice();
    return { ...this.describe(key), arrayBuffer: async () => bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) };
  }

  async put(
    key: string,
    value: ArrayBuffer | Uint8Array | string,
    options?: { onlyIf?: { etagMatches?: string; etagDoesNotExist?: boolean }; httpMetadata?: { contentType?: string } },
  ): Promise<R2ObjectLike | null> {
    await this.io("put", key);
    if (this.beforePut) await this.beforePut(key);
    const existing = this.objects.get(key);
    if (options?.onlyIf?.etagDoesNotExist && existing) return null;
    if (options?.onlyIf?.etagMatches !== undefined && existing?.etag !== options.onlyIf.etagMatches) return null;
    const bytes =
      typeof value === "string" ? encoder.encode(value) : value instanceof Uint8Array ? value.slice() : new Uint8Array(value.slice(0));
    this.counter += 1;
    this.objects.set(key, { bytes, etag: `"v${this.counter}"`, contentType: options?.httpMetadata?.contentType });
    return this.describe(key);
  }

  async delete(key: string): Promise<void> {
    await this.io("delete", key);
    this.objects.delete(key);
  }

  async list(options?: { prefix?: string; cursor?: string; limit?: number }): Promise<R2ListResultLike> {
    await this.io("list");
    const prefix = options?.prefix ?? "";
    const all = this.keys().filter((key) => key.startsWith(prefix));
    const start = options?.cursor ? Number(options.cursor) : 0;
    const limit = options?.limit ?? 1000;
    const page = all.slice(start, start + limit);
    const truncated = start + limit < all.length;
    return {
      objects: page.map((key) => this.describe(key)),
      truncated,
      cursor: truncated ? String(start + limit) : undefined,
    };
  }
}
