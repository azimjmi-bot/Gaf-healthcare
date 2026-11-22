import assert from "node:assert/strict";
import test from "node:test";
import {
  DEFAULT_NEGATIVE_CACHE_TTL_SECONDS,
  MAX_NEGATIVE_CACHE_TTL_SECONDS,
  NEGATIVE_CACHE_SUFFIX,
  decideNegativeCache,
  isNegativeCacheEnabled,
  parseNegativeCacheTtlSeconds,
} from "@/worker/negative-cache";

test("isNegativeCacheEnabled stays off unless explicitly opted in", () => {
  assert.equal(isNegativeCacheEnabled(undefined), false);
  assert.equal(isNegativeCacheEnabled(""), false);
  assert.equal(isNegativeCacheEnabled("0"), false);
  assert.equal(isNegativeCacheEnabled("false"), false);
  assert.equal(isNegativeCacheEnabled("1"), true);
  assert.equal(isNegativeCacheEnabled("true"), true);
  assert.equal(isNegativeCacheEnabled("on"), true);
});

test("parseNegativeCacheTtlSeconds clamps to a short configurable window", () => {
  assert.equal(parseNegativeCacheTtlSeconds(undefined), DEFAULT_NEGATIVE_CACHE_TTL_SECONDS);
  assert.equal(parseNegativeCacheTtlSeconds("60"), 60);
  assert.equal(parseNegativeCacheTtlSeconds("9999"), MAX_NEGATIVE_CACHE_TTL_SECONDS);
  assert.equal(parseNegativeCacheTtlSeconds("0"), DEFAULT_NEGATIVE_CACHE_TTL_SECONDS);
  assert.equal(parseNegativeCacheTtlSeconds("-5"), DEFAULT_NEGATIVE_CACHE_TTL_SECONDS);
  assert.equal(parseNegativeCacheTtlSeconds("nope"), DEFAULT_NEGATIVE_CACHE_TTL_SECONDS);
});

test("decideNegativeCache rejects 5xx, auth, cookies, and non-HTML", () => {
  const base = {
    enabled: true,
    status: 404,
    contentType: "text/html; charset=utf-8",
    cacheControl: "public, s-maxage=300",
    hasSetCookie: false,
    authorization: false,
    cmsCookie: false,
  };
  assert.equal(decideNegativeCache({ ...base, status: 500 }).cache, false);
  assert.equal(decideNegativeCache({ ...base, status: 502 }).reason, "5xx");
  assert.equal(decideNegativeCache({ ...base, status: 503 }).reason, "upstream-busy");
  assert.equal(decideNegativeCache({ ...base, status: 401 }).reason, "auth-status");
  assert.equal(decideNegativeCache({ ...base, status: 403 }).reason, "auth-status");
  assert.equal(decideNegativeCache({ ...base, authorization: true }).reason, "authenticated");
  assert.equal(decideNegativeCache({ ...base, cmsCookie: true }).reason, "authenticated");
  assert.equal(decideNegativeCache({ ...base, hasSetCookie: true }).reason, "set-cookie");
  assert.equal(decideNegativeCache({ ...base, contentType: "application/json" }).reason, "non-html");
  assert.equal(decideNegativeCache({ ...base, cacheControl: "private, no-store" }).reason, "cache-control");
  assert.equal(decideNegativeCache({ ...base, enabled: false }).reason, "disabled");
});

test("decideNegativeCache accepts genuine HTML 404 with short TTL", () => {
  const decision = decideNegativeCache({
    enabled: true,
    status: 404,
    contentType: "text/html; charset=utf-8",
    cacheControl: null,
    hasSetCookie: false,
    authorization: false,
    cmsCookie: false,
    ttlSeconds: 90,
  });
  assert.deepEqual(decision, { cache: true, ttlSeconds: 90 });
});

test("negative cache key suffix is distinct from HTML and RSC keys", () => {
  assert.equal(NEGATIVE_CACHE_SUFFIX, ".404");
  assert.notEqual(NEGATIVE_CACHE_SUFFIX, ".rsc");
});
