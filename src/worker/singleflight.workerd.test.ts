import assert from "node:assert/strict";
import path from "node:path";
import { test } from "node:test";
import { unstable_dev } from "wrangler";

const script = path.join(process.cwd(), "scripts/cloudflare/singleflight-probe.mjs");

async function pair(worker: Awaited<ReturnType<typeof unstable_dev>>, id: string, kind: "naive" | "poll") {
  const leader = worker.fetch(`http://example.com/${kind}-leader?id=${id}`, { signal: AbortSignal.timeout(4000) });
  await new Promise((resolve) => setTimeout(resolve, 40));
  const waiter = await worker.fetch(`http://example.com/${kind}-waiter?id=${id}`, { signal: AbortSignal.timeout(4000) });
  const leaderResponse = await leader;
  return {
    leader: leaderResponse.status,
    waiter: waiter.status,
    body: await waiter.text(),
  };
}

test("workerd: a polling waiter receives 200; a cross-request promise is recorded either way", async () => {
  const worker = await unstable_dev(script, {
    local: true,
    logLevel: "error",
    experimental: { disableExperimentalWarning: true, forceLocal: true },
  });
  try {
    const polling = await pair(worker, "poll", "poll");
    const naive = await pair(worker, "naive", "naive");
    assert.equal(polling.leader, 200);
    assert.equal(polling.waiter, 200);
    assert.equal(polling.body, "ok");
    assert.equal(naive.leader, 200);
    assert.ok(naive.waiter === 200 || naive.waiter === 500, `naive waiter status ${naive.waiter} body ${naive.body}`);
    console.log(`singleflight workerd probe: poll=${polling.waiter} naive=${naive.waiter} naiveBody=${naive.body}`);
  } finally {
    await worker.stop();
  }
});
