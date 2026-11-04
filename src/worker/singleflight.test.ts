import assert from "node:assert/strict";
import { test } from "node:test";
import {
  CrossRequestCancellation,
  awaitForeignPromise,
  createPollingSingleflight,
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
