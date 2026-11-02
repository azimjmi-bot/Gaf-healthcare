import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import {
  assertRemoteConfig,
  classifyKeys,
  loadWranglerConfig,
  parseArgs,
  plan,
  PRODUCTION_CONTENT_BUCKET,
  PRODUCTION_STATIC_BUCKET,
} from "./seed-r2.mjs";

const productionConfig = {
  path: "/tmp/wrangler.production.jsonc",
  name: "gaf-healthcare-production",
  buckets: {
    CONTENT: PRODUCTION_CONTENT_BUCKET,
    STATIC: PRODUCTION_STATIC_BUCKET,
    NEXT_INC_CACHE_R2_BUCKET: PRODUCTION_STATIC_BUCKET,
  },
  indexing: undefined,
  rawRoutes: undefined,
  rawCustomDomain: undefined,
};

test("remote production config is accepted", () => {
  assert.doesNotThrow(() => assertRemoteConfig(productionConfig));
});

test("remote seed refuses staging buckets, indexing, and the staging file", () => {
  assert.throws(
    () => assertRemoteConfig({ ...productionConfig, path: "/repo/wrangler.jsonc" }),
    /wrangler\.jsonc/,
  );
  assert.throws(
    () => assertRemoteConfig({ ...productionConfig, indexing: "off" }),
    /GAF_INDEXING/,
  );
  assert.throws(
    () =>
      assertRemoteConfig({
        ...productionConfig,
        buckets: { ...productionConfig.buckets, CONTENT: "gaf-content-staging" },
      }),
    /staging/,
  );
  assert.throws(
    () => assertRemoteConfig({ ...productionConfig, rawRoutes: [{ pattern: "gaf.healthcare/*" }] }),
    /routes/,
  );
});

test("classifyKeys reports missing keys and refuses unexpected ones", () => {
  const diff = classifyKeys(
    ["content/cms.json", "content/.manifest.json"],
    ["content/cms.json", "content/.version.json"],
  );
  assert.deepEqual(diff.present, ["content/cms.json"]);
  assert.deepEqual(diff.missing, ["content/.manifest.json"]);
  assert.deepEqual(diff.unexpected, ["content/.version.json"]);
});

test("the working tree plans 143 content keys and 719 uploads, skipping the markdown source", () => {
  const { items, manifest, skipped } = plan();
  const content = items.filter((item) => item.bucket === "CONTENT");
  const uploads = items.filter((item) => item.bucket === "STATIC");
  assert.equal(manifest.keys.length, 143);
  assert.equal(content.length, 144);
  assert.equal(uploads.length, 719);
  assert.deepEqual(skipped, ["content/treatments/breast-cancer-treatment-in-india.md"]);
  assert.equal(uploads.some((item) => item.key.endsWith(".gitkeep")), false);
  assert.equal(content.some((item) => item.key.includes("breast-cancer-treatment-in-india.md")), false);
});

test("parseArgs requires a path for --config", () => {
  const args = parseArgs(["--remote", "--config", "wrangler.production.jsonc", "--dry-run"]);
  assert.equal(args.remote, true);
  assert.equal(args.dryRun, true);
  assert.equal(path.basename(args.configPath), "wrangler.production.jsonc");
  assert.throws(() => parseArgs(["--config"]), /--config requires a path/);
});

test("the production wrangler file passes the remote guard and omits indexing", () => {
  const config = loadWranglerConfig(path.join(import.meta.dirname, "..", "..", "wrangler.production.jsonc"));
  assert.equal(config.indexing, undefined);
  assert.equal(config.buckets.CONTENT, PRODUCTION_CONTENT_BUCKET);
  assert.equal(config.buckets.STATIC, PRODUCTION_STATIC_BUCKET);
  assertRemoteConfig(config);
});

test("a config that sets GAF_INDEXING fails to load as a remote target", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "gaf-seed-"));
  const file = path.join(dir, "wrangler.production.jsonc");
  writeFileSync(
    file,
    JSON.stringify({
      name: "gaf-healthcare-production",
      r2_buckets: [
        { binding: "CONTENT", bucket_name: PRODUCTION_CONTENT_BUCKET },
        { binding: "STATIC", bucket_name: PRODUCTION_STATIC_BUCKET },
        { binding: "NEXT_INC_CACHE_R2_BUCKET", bucket_name: PRODUCTION_STATIC_BUCKET },
      ],
      vars: { GAF_STORAGE: "r2", GAF_INDEXING: "off" },
    }),
  );
  const loaded = loadWranglerConfig(file);
  assert.throws(() => assertRemoteConfig(loaded), /GAF_INDEXING/);
});
