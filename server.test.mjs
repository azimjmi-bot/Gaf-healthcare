import assert from "node:assert/strict";
import { test } from "node:test";
import { publicVary } from "./server.mjs";

test("publicVary drops the App Router request headers Hostinger CDN cannot key on", () => {
  assert.deepEqual(
    publicVary("rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept-Encoding"),
    ["Accept-Encoding"],
  );
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
