import assert from "node:assert/strict";
import { createServer, request as httpRequest, ServerResponse } from "node:http";
import { test } from "node:test";
import { publicVary as publicVaryFromEntry } from "./server.mjs";
import {
  buildLabel,
  DEFAULT_HEAP_SOFT_LIMIT_MB,
  DEFAULT_KEEP_ALIVE_TIMEOUT_MS,
  exposeGc,
  heapGuardConfig,
  heapGuardTick,
  installHeapGuard,
  installResponseHooks,
  keepAliveTimeoutMs,
  publicVary,
  tuneHttpServer,
} from "./server-tuning.mjs";

const MB = 1024 * 1024;

test("publicVary drops the App Router request headers Hostinger CDN cannot key on", () => {
  assert.deepEqual(
    publicVary("rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept-Encoding"),
    ["Accept-Encoding"],
  );
  assert.equal(publicVaryFromEntry, publicVary);
});

test("publicVary keeps standard negotiation headers and de-duplicates", () => {
  assert.deepEqual(
    publicVary(["Accept-Encoding", "RSC, Next-URL, accept-encoding", "Accept-Language"]),
    ["Accept-Encoding", "Accept-Language"],
  );
});

test("publicVary returns nothing when only router headers were present", () => {
  assert.deepEqual(publicVary("rsc"), []);
});

test("keep-alive timeout defaults above proxy idle timeouts and honours the env override", () => {
  assert.equal(keepAliveTimeoutMs({}), DEFAULT_KEEP_ALIVE_TIMEOUT_MS);
  assert.ok(DEFAULT_KEEP_ALIVE_TIMEOUT_MS > 60_000);
  assert.equal(keepAliveTimeoutMs({ KEEP_ALIVE_TIMEOUT_MS: "120000" }), 120_000);
  assert.equal(keepAliveTimeoutMs({ KEEP_ALIVE_TIMEOUT_MS: "nonsense" }), DEFAULT_KEEP_ALIVE_TIMEOUT_MS);
});

test("tuneHttpServer sets keepAlive and headers timeouts once per server", () => {
  const server = createServer();
  assert.equal(tuneHttpServer(server, 70_000), true);
  assert.equal(server.keepAliveTimeout, 70_000);
  assert.equal(server.headersTimeout, 71_000);
  assert.equal(tuneHttpServer(server, 5), false);
  assert.equal(server.keepAliveTimeout, 70_000);
  assert.equal(tuneHttpServer(undefined), false);
  server.close();
});

test("response hooks sanitize Vary and tune the live server, installed once", async () => {
  const first = installResponseHooks();
  assert.equal(installResponseHooks(), false);
  assert.equal(typeof first, "boolean");
  assert.ok(Object.getOwnPropertySymbols(ServerResponse.prototype).length > 0);

  const server = createServer((req, res) => {
    if (req.url === "/implicit") {
      res.setHeader("Vary", "RSC, Next-Router-State-Tree, Accept-Encoding");
      res.end("ok");
      return;
    }
    res.writeHead(200, { Vary: "rsc, next-router-prefetch" });
    res.end("ok");
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  const fetchHeaders = (path) =>
    new Promise((resolve, reject) => {
      httpRequest({ host: "127.0.0.1", port, path }, (res) => {
        res.resume();
        res.on("end", () => resolve(res.headers));
      })
        .on("error", reject)
        .end();
    });
  try {
    const implicit = await fetchHeaders("/implicit");
    assert.equal(implicit.vary, "Accept-Encoding");
    assert.equal(implicit["x-gaf-build"], buildLabel());
    assert.ok(buildLabel().length > 0);
    assert.equal((await fetchHeaders("/explicit")).vary, undefined);
    assert.equal(server.keepAliveTimeout, keepAliveTimeoutMs());
    assert.equal(server.headersTimeout, keepAliveTimeoutMs() + 1_000);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test("heap guard is only needed when the process has no realistic heap limit", () => {
  const unlimited = heapGuardConfig({}, 4144 * MB);
  assert.equal(unlimited.enabled, true);
  assert.equal(unlimited.softLimitBytes, DEFAULT_HEAP_SOFT_LIMIT_MB * MB);
  // `npm start` passes --max-old-space-size=512: V8 already collects early.
  assert.equal(heapGuardConfig({}, 512 * MB).enabled, false);
  assert.equal(heapGuardConfig({ GAF_HEAP_SOFT_LIMIT_MB: "200" }, 4144 * MB).softLimitBytes, 200 * MB);
  assert.equal(heapGuardConfig({ GAF_HEAP_GUARD: "off" }, 4144 * MB).enabled, false);
  assert.equal(installHeapGuard({ enabled: false }), null);
});

test("heap guard collects above the soft limit and throttles its log line", () => {
  let heapUsed = 100 * MB;
  const gcCalls = [];
  const logs = [];
  const state = {
    softLimitBytes: 300 * MB,
    gc: () => {
      gcCalls.push(heapUsed);
      heapUsed = 150 * MB;
    },
    collections: 0,
    lastLogAt: -Infinity,
  };
  const hooks = { memoryUsage: () => ({ heapUsed }), now: () => clock, log: (line) => logs.push(line) };
  let clock = 0;
  assert.equal(heapGuardTick(state, hooks), false);
  heapUsed = 400 * MB;
  assert.equal(heapGuardTick(state, hooks), true);
  assert.deepEqual(gcCalls, [400 * MB]);
  assert.equal(logs.length, 1);
  assert.match(logs[0], /heap 400 MB exceeded the 300 MB soft limit; collected to 150 MB/);
  heapUsed = 500 * MB;
  clock = 60_000;
  assert.equal(heapGuardTick(state, hooks), true);
  assert.equal(logs.length, 1, "second collection within ten minutes stays quiet");
  clock = 11 * 60_000;
  heapUsed = 500 * MB;
  heapGuardTick(state, hooks);
  assert.equal(logs.length, 2);
  assert.match(logs[1], /3 collections so far/);
});

test("exposeGc returns a working collector without --expose-gc at launch", () => {
  const gc = exposeGc();
  assert.equal(typeof gc, "function");
  let junk = [];
  for (let i = 0; i < 50; i += 1) junk.push("x".repeat(MB));
  junk = null;
  gc();
  assert.ok(process.memoryUsage().heapUsed < 400 * MB);
});

test("installHeapGuard runs on an unref'd timer and can be stopped", () => {
  const guard = installHeapGuard({ enabled: true, softLimitBytes: 1, intervalMs: 60_000 }, { gc: () => {} });
  assert.ok(guard);
  assert.equal(guard.timer.hasRef(), false);
  guard.stop();
  assert.equal(guard.timer, null);
});
