import assert from "node:assert/strict";
import { createServer, request as httpRequest, ServerResponse } from "node:http";
import { test } from "node:test";
import { publicVary as publicVaryFromEntry } from "./server.mjs";
import {
  DEFAULT_KEEP_ALIVE_TIMEOUT_MS,
  installResponseHooks,
  keepAliveTimeoutMs,
  publicVary,
  tuneHttpServer,
} from "./server-tuning.mjs";

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
    assert.equal((await fetchHeaders("/implicit")).vary, "Accept-Encoding");
    assert.equal((await fetchHeaders("/explicit")).vary, undefined);
    assert.equal(server.keepAliveTimeout, keepAliveTimeoutMs());
    assert.equal(server.headersTimeout, keepAliveTimeoutMs() + 1_000);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
