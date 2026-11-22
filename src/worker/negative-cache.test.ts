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

const htmlOk = {
  contentType: "text/html; charset=utf-8",
  cacheControl: "public, s-maxage=300",
  hasSetCookie: false,
  authorization: false,
  cmsCookie: false,
} as const;

test("flag values 1, true, and on enable; every other value stays disabled", () => {
  for (const on of ["1", "true", "on"] as const) {
    assert.equal(isNegativeCacheEnabled(on), true, on);
  }
  for (const off of [undefined, "", "0", "false", "off", "TRUE", "On", "yes", "enabled", " 1"] as const) {
    assert.equal(isNegativeCacheEnabled(off), false, String(off));
  }
});

test("parseNegativeCacheTtlSeconds clamps to a short configurable window", () => {
  assert.equal(parseNegativeCacheTtlSeconds(undefined), DEFAULT_NEGATIVE_CACHE_TTL_SECONDS);
  assert.equal(parseNegativeCacheTtlSeconds("60"), 60);
  assert.equal(parseNegativeCacheTtlSeconds("9999"), MAX_NEGATIVE_CACHE_TTL_SECONDS);
  assert.equal(parseNegativeCacheTtlSeconds("0"), DEFAULT_NEGATIVE_CACHE_TTL_SECONDS);
  assert.equal(parseNegativeCacheTtlSeconds("-5"), DEFAULT_NEGATIVE_CACHE_TTL_SECONDS);
  assert.equal(parseNegativeCacheTtlSeconds("nope"), DEFAULT_NEGATIVE_CACHE_TTL_SECONDS);
  assert.equal(parseNegativeCacheTtlSeconds("120.9"), 120);
});

test("decideNegativeCache rejects redirects, auth, rate-limits, 5xx, and non-HTML", () => {
  const base = { enabled: true, status: 404, ...htmlOk };
  assert.equal(decideNegativeCache({ ...base, status: 200 }).cache, false);
  assert.equal(decideNegativeCache({ ...base, status: 301 }).reason, "status-301");
  assert.equal(decideNegativeCache({ ...base, status: 308 }).reason, "status-308");
  assert.equal(decideNegativeCache({ ...base, status: 403 }).reason, "auth-status");
  assert.equal(decideNegativeCache({ ...base, status: 401 }).reason, "auth-status");
  assert.equal(decideNegativeCache({ ...base, status: 429 }).reason, "status-429");
  assert.equal(decideNegativeCache({ ...base, status: 500 }).reason, "5xx");
  assert.equal(decideNegativeCache({ ...base, status: 502 }).reason, "5xx");
  assert.equal(decideNegativeCache({ ...base, status: 503 }).reason, "upstream-busy");
  assert.equal(decideNegativeCache({ ...base, authorization: true }).reason, "authenticated");
  assert.equal(decideNegativeCache({ ...base, cmsCookie: true }).reason, "authenticated");
  assert.equal(decideNegativeCache({ ...base, hasSetCookie: true }).reason, "set-cookie");
  assert.equal(decideNegativeCache({ ...base, contentType: "application/json" }).reason, "non-html");
  assert.equal(decideNegativeCache({ ...base, enabled: false }).reason, "disabled");
});

test("decideNegativeCache accepts genuine HTML 404 with short TTL including Next no-store", () => {
  const decision = decideNegativeCache({
    enabled: true,
    status: 404,
    contentType: "text/html; charset=utf-8",
    cacheControl: "private, no-cache, no-store, max-age=0, must-revalidate",
    hasSetCookie: false,
    authorization: false,
    cmsCookie: false,
    ttlSeconds: 90,
  });
  assert.deepEqual(decision, { cache: true, ttlSeconds: 90 });
  const clamped = decideNegativeCache({
    enabled: true,
    status: 404,
    ...htmlOk,
    ttlSeconds: 10_000,
  });
  assert.deepEqual(clamped, { cache: true, ttlSeconds: MAX_NEGATIVE_CACHE_TTL_SECONDS });
});

test("negative cache key suffix is distinct from HTML and RSC keys", () => {
  assert.equal(NEGATIVE_CACHE_SUFFIX, ".404");
  assert.notEqual(NEGATIVE_CACHE_SUFFIX, ".rsc");
});
