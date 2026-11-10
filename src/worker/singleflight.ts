/**
 * Prototype for sharing one in-flight render across duplicate requests.
 *
 * This module is not imported by the production Worker. The previous render
 * queue hung with 500s when one request awaited a promise that another
 * request resolved. Waiters here poll a shared slot with their own timer and
 * never await the leader's promise. A production wiring needs the workerd
 * probe in `singleflight.workerd.test.ts` to show every waiter still receives
 * a completed 200, including the cancellation case.
 */

export class CrossRequestCancellation extends Error {
  constructor() {
    super("workerd cancelled a promise resolved from another request");
    this.name = "CrossRequestCancellation";
  }
}

export type SharedResult<T> =
  | { state: "pending" }
  | { state: "done"; value: T }
  | { state: "failed"; error: unknown };

export type SharedSlot<T> = { current: SharedResult<T> };

/**
 * The pattern that must stay out of production: the waiter awaits a promise
 * owned by another request. When `cancel` is set, resolution becomes the
 * cancellation workerd applied to that pattern.
 */
export function awaitForeignPromise<T>(leader: Promise<T>, cancel: boolean): Promise<T> {
  if (!cancel) return leader;
  return new Promise((_resolve, reject) => {
    leader.then(
      () => reject(new CrossRequestCancellation()),
      () => reject(new CrossRequestCancellation()),
    );
  });
}

export async function waitForSharedResult<T>(
  slot: SharedSlot<T>,
  options: { pollMs: number; timeoutMs: number; sleep?: (ms: number) => Promise<void> },
): Promise<{ status: "done"; value: T } | { status: "failed"; error: unknown } | { status: "timeout" }> {
  const sleep = options.sleep ?? ((ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms)));
  const deadline = Date.now() + options.timeoutMs;
  for (;;) {
    const current = slot.current;
    if (current.state === "done") return { status: "done", value: current.value };
    if (current.state === "failed") return { status: "failed", error: current.error };
    if (Date.now() >= deadline) return { status: "timeout" };
    await sleep(Math.min(options.pollMs, Math.max(0, deadline - Date.now())));
  }
}

/**
 * One render per key. Later callers poll. On timeout they render themselves
 * rather than hang. The leader promise is never returned to a waiter.
 */
function handoff<T>(value: T): T {
  return value instanceof Response ? (value.clone() as T) : value;
}

export function createPollingSingleflight<T>(options: { pollMs: number; timeoutMs: number }) {
  const inflight = new Map<string, SharedSlot<T>>();
  return async function share(key: string, render: () => Promise<T>): Promise<T> {
    const existing = inflight.get(key);
    if (existing) {
      const outcome = await waitForSharedResult(existing, options);
      if (outcome.status === "done") return handoff(outcome.value);
      if (outcome.status === "failed") throw outcome.error;
      return render();
    }
    const slot: SharedSlot<T> = { current: { state: "pending" } };
    inflight.set(key, slot);
    try {
      const value = await render();
      slot.current = { state: "done", value };
      return handoff(value);
    } catch (error) {
      slot.current = { state: "failed", error };
      throw error;
    } finally {
      inflight.delete(key);
    }
  };
}
