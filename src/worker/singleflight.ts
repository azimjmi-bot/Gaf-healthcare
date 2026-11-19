/**
 * Share in-flight async work across concurrent Worker requests without
 * awaiting another request's Promise.
 *
 * On Cloudflare Workers (`handle_cross_request_promise_resolution`, default
 * since compatibility_date 2024-10-14) a Promise may only settle in the
 * request that created it. If request A starts a shared load and then ends
 * (client disconnect / 1101), every later request that `await`s A's Promise
 * throws:
 *   "This promise was created by a request that has since ended..."
 * and the isolate keeps serving Error 1101 until it is recycled.
 *
 * Waiters here poll a shared slot with their own timer and never await the
 * leader's Promise. Used by R2 content hydration (`src/lib/storage/r2.ts`).
 * The workerd probe in `singleflight.workerd.test.ts` documents the naive
 * vs polling behaviour.
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

/**
 * True when workerd dropped a Promise because its creating request ended.
 * Matching on the message is intentional: the runtime throws a plain Error.
 */
export function isCrossRequestPromiseError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return (
    error.name === "CrossRequestCancellation" ||
    error.message.includes("promise was created by a request that has since ended")
  );
}

/**
 * Single-flight `work` across concurrent callers without returning the
 * leader's Promise to waiters. Waiters poll `slots` until the leader writes
 * done/failed, or until `timeoutMs` — then they run `work` themselves.
 */
export async function shareInFlightWork<T>(
  slots: Map<string, SharedSlot<T>>,
  key: string,
  work: () => Promise<T>,
  options: { pollMs: number; timeoutMs: number; sleep?: (ms: number) => Promise<void> },
): Promise<T> {
  const existing = slots.get(key);
  if (existing) {
    const outcome = await waitForSharedResult(existing, options);
    if (outcome.status === "done") return handoff(outcome.value);
    if (outcome.status === "failed") throw outcome.error;
    // Timed out while the leader is still pending — run our own work without
    // stealing the shared slot (the leader may still complete for others).
    if (slots.get(key) === existing && existing.current.state === "pending") {
      return work();
    }
  }
  const slot: SharedSlot<T> = { current: { state: "pending" } };
  slots.set(key, slot);
  try {
    const value = await work();
    slot.current = { state: "done", value };
    return handoff(value);
  } catch (error) {
    slot.current = { state: "failed", error };
    throw error;
  } finally {
    if (slots.get(key) === slot) slots.delete(key);
  }
}

export function createPollingSingleflight<T>(options: { pollMs: number; timeoutMs: number }) {
  const inflight = new Map<string, SharedSlot<T>>();
  return async function share(key: string, render: () => Promise<T>): Promise<T> {
    return shareInFlightWork(inflight, key, render, options);
  };
}
