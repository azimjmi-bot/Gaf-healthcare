import assert from "node:assert/strict";
import { test } from "node:test";
import { TtlLru } from "./ttl-lru";

test("entries expire after the ttl and are dropped on read", () => {
  const cache = new TtlLru<string>(10, 1000);
  cache.set("a", "A", 0);
  assert.equal(cache.get("a", 999), "A");
  assert.equal(cache.get("a", 1000), undefined);
  assert.equal(cache.size, 0);
});

test("the cache never holds more than max entries", () => {
  const cache = new TtlLru<string>(3, 60_000);
  for (let i = 0; i < 1000; i += 1) cache.set(`k${i}`, `v${i}`, i);
  assert.equal(cache.size, 3);
  assert.equal(cache.get("k999", 1000), "v999");
  assert.equal(cache.get("k0", 1000), undefined);
});

test("reads refresh recency so hot entries survive eviction", () => {
  const cache = new TtlLru<string>(2, 60_000);
  cache.set("a", "A", 0);
  cache.set("b", "B", 1);
  assert.equal(cache.get("a", 2), "A");
  cache.set("c", "C", 3);
  assert.equal(cache.get("b", 4), undefined);
  assert.equal(cache.get("a", 4), "A");
  assert.equal(cache.get("c", 4), "C");
});

test("expired entries are evicted before live ones when room is needed", () => {
  const cache = new TtlLru<string>(2, 10);
  cache.set("old", "O", 0);
  cache.set("live", "L", 100);
  cache.set("new", "N", 105);
  assert.equal(cache.get("old", 106), undefined);
  assert.equal(cache.get("live", 106), "L");
  assert.equal(cache.get("new", 106), "N");
});
