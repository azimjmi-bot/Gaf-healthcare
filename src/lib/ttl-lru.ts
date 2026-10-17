/**
 * Small in-process cache: entries expire after `ttlMs`, and at most `max`
 * live at once (least recently used goes first). Expired entries are dropped
 * when read or when room is needed, so memory is bounded by `max` regardless
 * of how many distinct keys pass through.
 */
export class TtlLru<V> {
  private readonly entries = new Map<string, { value: V; expires: number }>();

  constructor(
    private readonly max: number,
    private readonly ttlMs: number,
  ) {
    if (!(max > 0)) throw new Error("TtlLru max must be positive");
  }

  get(key: string, now = Date.now()): V | undefined {
    const hit = this.entries.get(key);
    if (!hit) return undefined;
    if (hit.expires <= now) {
      this.entries.delete(key);
      return undefined;
    }
    // Re-insert so Map iteration order doubles as recency order.
    this.entries.delete(key);
    this.entries.set(key, hit);
    return hit.value;
  }

  set(key: string, value: V, now = Date.now()): V {
    this.entries.delete(key);
    this.entries.set(key, { value, expires: now + this.ttlMs });
    if (this.entries.size > this.max) {
      for (const [k, entry] of this.entries) {
        if (entry.expires <= now) this.entries.delete(k);
      }
      while (this.entries.size > this.max) {
        const oldest = this.entries.keys().next().value;
        if (oldest === undefined) break;
        this.entries.delete(oldest);
      }
    }
    return value;
  }

  get size() {
    return this.entries.size;
  }

  clear() {
    this.entries.clear();
  }
}
