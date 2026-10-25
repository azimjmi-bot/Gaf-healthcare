/**
 * A read-only array whose rows are resolved on every access. Exported
 * catalog arrays (`doctors`, `hospitals`, `treatments`) are consumed as plain
 * arrays by dozens of render paths; this lets the rows behind them be
 * computed late or recomputed without changing a single call site.
 */
export function arrayView<T>(rows: () => T[]): T[] {
  return new Proxy([] as T[], {
    get(_target, prop) {
      const list = rows();
      const value = Reflect.get(list, prop, list);
      if (typeof value === "function") return (value as (...args: unknown[]) => unknown).bind(list);
      return value;
    },
    has(_target, prop) {
      return Reflect.has(rows(), prop);
    },
    ownKeys() {
      return Reflect.ownKeys(rows());
    },
    getOwnPropertyDescriptor(_target, prop) {
      return Object.getOwnPropertyDescriptor(rows(), prop);
    },
  });
}

/**
 * An array built on first access and kept for the life of the process. A
 * build that throws is not remembered, so the next access tries again and
 * callers see the error every time rather than an empty array once.
 */
export function lazyArray<T>(build: () => T[]): T[] {
  let built: T[] | undefined;
  return arrayView(() => (built ??= build()));
}
