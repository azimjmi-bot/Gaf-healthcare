import assert from "node:assert/strict";
import { test } from "node:test";
import {
  CrossRequestCancellation,
  awaitForeignPromise,
  createPollingSingleflight,
  isCrossRequestPromiseError,
  shareInFlightWork,
  type SharedSlot,
} from "@/worker/singleflight";

test("awaiting another request's promise is cancelled and does not return the 200", async () => {
  let resolveLeader: (value: string) => void = () => {};
  const leader = new Promise<string>((resolve) => {
    resolveLeader = resolve;
  });
  const waiter = awaitForeignPromise(leader, true);
  resolveLeader("ok");
  await assert.rejects(waiter, CrossRequestCancellation);
  assert.equal(await leader, "ok");
});

test("polling waiters all receive the leader's 200 and only one render runs", async () => {
  const share = createPollingSingleflight<Response>({ pollMs: 5, timeoutMs: 500 });
  let renders = 0;
  let release: () => void = () => {};
  const hold = new Promise<void>((resolve) => {
    release = resolve;
  });
  const render = async () => {
    renders += 1;
    await hold;
    return new Response("page", { status: 200, headers: { "content-type": "text/html" } });
  };
  const pending = Array.from({ length: 6 }, () => share("/doctors", render));
  await new Promise<void>((resolve) => {
    const check = () => {
      if (renders === 1) resolve();
      else setTimeout(check, 5);
    };
    check();
  });
  release();
  const responses = await Promise.all(pending);
  assert.equal(renders, 1);
  for (const response of responses) {
    assert.equal(response.status, 200);
    assert.equal(await response.text(), "page");
  }
});

test("a failed leader rejects every waiter instead of leaving it pending", async () => {
  const share = createPollingSingleflight<Response>({ pollMs: 5, timeoutMs: 500 });
  let release: (error: Error) => void = () => {};
  const hold = new Promise<never>((_resolve, reject) => {
    release = reject;
  });
  const pending = [share("/hospitals", () => hold), share("/hospitals", () => hold)];
  await new Promise((resolve) => setTimeout(resolve, 20));
  release(new Error("render failed"));
  await assert.rejects(pending[0], /render failed/);
  await assert.rejects(pending[1], /render failed/);
});

test("a waiter that times out renders its own 200 instead of hanging", async () => {
  const share = createPollingSingleflight<string>({ pollMs: 5, timeoutMs: 30 });
  let renders = 0;
  const leader = share("/blogs", async () => {
    renders += 1;
    await new Promise(() => {});
    return "leader";
  });
  const waiter = await share("/blogs", async () => {
    renders += 1;
    return "waiter-rendered";
  });
  assert.equal(waiter, "waiter-rendered");
  assert.equal(renders, 2);
  void leader;
});

test("isCrossRequestPromiseError matches workerd's stranded-promise message", () => {
  assert.equal(
    isCrossRequestPromiseError(
      new Error(
        "This promise was created by a request that has since ended, so it can never settle. With the handle_cross_request_promise_resolution compatibility flag, a promise can only settle in the request that created it, and settling it after that request ends is dropped.",
      ),
    ),
    true,
  );
  assert.equal(isCrossRequestPromiseError(new CrossRequestCancellation()), true);
  assert.equal(isCrossRequestPromiseError(new Error("bucket unreachable")), false);
});

test("shareInFlightWork waiters observe a completed slot without awaiting the leader Promise", async () => {
  const slots = new Map<string, SharedSlot<string>>();
  let runs = 0;
  let release: () => void = () => {};
  const hold = new Promise<void>((resolve) => {
    release = resolve;
  });
  const work = async () => {
    runs += 1;
    await hold;
    return "hydrated";
  };
  const leader = shareInFlightWork(slots, "en", work, { pollMs: 5, timeoutMs: 500 });
  await new Promise<void>((resolve) => {
    const check = () => {
      if (runs === 1) resolve();
      else setTimeout(check, 5);
    };
    check();
  });
  const waiter = shareInFlightWork(slots, "en", work, { pollMs: 5, timeoutMs: 500 });
  release();
  assert.equal(await leader, "hydrated");
  assert.equal(await waiter, "hydrated");
  assert.equal(runs, 1);
});

test("shareInFlightWork recovers when the leader never settles (cancelled request)", async () => {
  const slots = new Map<string, SharedSlot<string>>();
  let runs = 0;
  const hangingLeader = shareInFlightWork(
    slots,
    "ar",
    async () => {
      runs += 1;
      await new Promise(() => {});
      return "leader";
    },
    { pollMs: 5, timeoutMs: 40 },
  );
  await new Promise<void>((resolve) => {
    const check = () => {
      if (runs === 1) resolve();
      else setTimeout(check, 5);
    };
    check();
  });

  const firstRecovery = await shareInFlightWork(
    slots,
    "ar",
    async () => {
      runs += 1;
      return "recovered-1";
    },
    { pollMs: 5, timeoutMs: 40 },
  );
  assert.equal(firstRecovery, "recovered-1");

  // Stranded slot must be cleared: a follow-up join must not wait another timeout.
  const started = Date.now();
  const second = await shareInFlightWork(
    slots,
    "ar",
    async () => {
      runs += 1;
      return "recovered-2";
    },
    { pollMs: 5, timeoutMs: 500 },
  );
  assert.equal(second, "recovered-2");
  assert.ok(Date.now() - started < 200, "follow-up must not re-wait on a stranded leader");
  assert.ok(runs >= 3);
  void hangingLeader;
});

test("shareInFlightWork surfaces leader failure to waiters without hanging", async () => {
  const slots = new Map<string, SharedSlot<string>>();
  let release: (error: Error) => void = () => {};
  const hold = new Promise<string>((_resolve, reject) => {
    release = reject;
  });
  const leader = shareInFlightWork(slots, "en", () => hold, { pollMs: 5, timeoutMs: 500 });
  const waiter = shareInFlightWork(
    slots,
    "en",
    async () => "should-not-run",
    { pollMs: 5, timeoutMs: 500 },
  );
  await new Promise((resolve) => setTimeout(resolve, 15));
  release(new Error("hydrate failed"));
  await assert.rejects(leader, /hydrate failed/);
  await assert.rejects(waiter, /hydrate failed/);
});
