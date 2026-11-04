#!/usr/bin/env node
/**
 * Seed the two R2 buckets the Worker reads from, from the working tree:
 *
 *   content/**           → CONTENT bucket, same keys, plus content/.manifest.json
 *   public/uploads/**    → STATIC bucket as uploads/**
 *
 * The manifest lists every content key that belongs to an edition group
 * (src/lib/storage/r2.ts GROUP_LAYOUT). The Worker refuses to serve a group
 * whose manifest keys are not all present, so a half-finished seed is a 503,
 * never an empty site.
 *
 * Targets:
 *
 *   --local (default)  Writes to the local state `wrangler dev` reads
 *                      (.wrangler/state/v3/r2). Nothing leaves this machine.
 *                      Uses wrangler.jsonc unless --config is set.
 *   --remote           Writes to the buckets named by --config. Refuses
 *                      wrangler.jsonc, staging bucket names, and any config
 *                      that sets GAF_INDEXING. Requires GAF_SEED_CONFIRM to
 *                      equal the content bucket. Lists the buckets first and
 *                      uploads only keys that are absent. Aborts when a
 *                      bucket holds a key that is not in this plan. Never
 *                      deletes.
 *   --dry-run          List what would be written and stop.
 *   --config <path>    Wrangler config. Required for --remote.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

export const STAGING_BUCKETS = new Set(["gaf-content-staging", "gaf-static-staging"]);
export const PRODUCTION_CONTENT_BUCKET = "gaf-content-production";
export const PRODUCTION_STATIC_BUCKET = "gaf-static-production";

/*
 * Mirrors GROUP_LAYOUT in src/lib/storage/r2.ts. Kept as data here (rather
 * than importing TypeScript) so the seed can run with plain Node; the Worker
 * test suite checks the two stay in step.
 */
export const GROUP_LAYOUT = {
  en: { keys: ["content/cms.json", "content/catalog-cms.json", "content/curated-treatments.json"], prefixes: [] },
  ar: { keys: ["content/ar/cms.json", "content/ar/catalog-cms.json"], prefixes: ["content/ar/articles/", "content/ar/treatments/"] },
  fr: { keys: ["content/fr/cms.json", "content/fr/catalog-cms.json"], prefixes: [] },
  ru: { keys: ["content/ru/cms.json", "content/ru/catalog-cms.json"], prefixes: [] },
  sw: { keys: ["content/sw/cms.json", "content/sw/catalog-cms.json"], prefixes: [] },
  cms: { keys: ["content/ai-generations.json"], prefixes: [] },
};

export function groupForKey(key) {
  for (const [group, layout] of Object.entries(GROUP_LAYOUT)) {
    if (layout.keys.includes(key)) return group;
    if (layout.prefixes.some((prefix) => key.startsWith(prefix))) return group;
  }
  return null;
}

const CONTENT_TYPES = {
  json: "application/json; charset=utf-8",
  webp: "image/webp",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  svg: "image/svg+xml",
  css: "text/css; charset=utf-8",
  md: "text/markdown; charset=utf-8",
  txt: "text/plain; charset=utf-8",
};
function contentTypeFor(key) {
  return CONTENT_TYPES[key.slice(key.lastIndexOf(".") + 1).toLowerCase()] ?? "application/octet-stream";
}

export function stripJsonComments(text) {
  return text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'])\/\/.*$/gm, "$1");
}

export function parseArgs(argv) {
  const flags = new Set();
  let configPath = null;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--config") {
      configPath = argv[i + 1];
      if (!configPath || configPath.startsWith("--")) throw new Error("--config requires a path");
      i += 1;
    } else if (arg.startsWith("--config=")) {
      configPath = arg.slice("--config=".length);
      if (!configPath) throw new Error("--config requires a path");
    } else {
      flags.add(arg);
    }
  }
  return {
    remote: flags.has("--remote"),
    dryRun: flags.has("--dry-run"),
    configPath: configPath ? path.resolve(configPath) : path.join(root, "wrangler.jsonc"),
  };
}

export function loadWranglerConfig(configPath) {
  const wrangler = JSON.parse(stripJsonComments(readFileSync(configPath, "utf8")));
  const buckets = Object.fromEntries((wrangler.r2_buckets ?? []).map((bucket) => [bucket.binding, bucket.bucket_name]));
  if (!buckets.CONTENT || !buckets.STATIC || !buckets.NEXT_INC_CACHE_R2_BUCKET) {
    throw new Error(`${configPath} must bind CONTENT, STATIC and NEXT_INC_CACHE_R2_BUCKET`);
  }
  return {
    path: configPath,
    name: wrangler.name,
    buckets,
    indexing: wrangler.vars?.GAF_INDEXING,
    hasRoutes: Array.isArray(wrangler.routes) && wrangler.routes.length > 0,
    hasCustomDomain: wrangler.workers_dev === undefined ? false : false,
    rawRoutes: wrangler.routes,
    rawCustomDomain: wrangler.custom_domain ?? wrangler.route,
  };
}

/** Remote seeds may only target the production config. */
export function assertRemoteConfig(config) {
  const errors = [];
  const base = path.basename(config.path);
  if (base === "wrangler.jsonc") errors.push("refusing wrangler.jsonc; pass --config wrangler.production.jsonc");
  if (config.indexing !== undefined) errors.push("refusing a config that sets GAF_INDEXING");
  if (config.name !== "gaf-healthcare-production") errors.push(`refusing worker name ${config.name}`);
  for (const name of [config.buckets.CONTENT, config.buckets.STATIC, config.buckets.NEXT_INC_CACHE_R2_BUCKET]) {
    if (STAGING_BUCKETS.has(name) || name.toLowerCase().includes("staging")) errors.push(`refusing staging bucket ${name}`);
  }
  if (config.buckets.CONTENT !== PRODUCTION_CONTENT_BUCKET) errors.push(`CONTENT must be ${PRODUCTION_CONTENT_BUCKET}`);
  if (config.buckets.STATIC !== PRODUCTION_STATIC_BUCKET || config.buckets.NEXT_INC_CACHE_R2_BUCKET !== PRODUCTION_STATIC_BUCKET) {
    errors.push(`STATIC and NEXT_INC_CACHE_R2_BUCKET must be ${PRODUCTION_STATIC_BUCKET}`);
  }
  if (config.rawRoutes || config.rawCustomDomain) errors.push("refusing a config that sets routes or a custom domain");
  if (errors.length > 0) throw new Error(errors.join("\n"));
}

/**
 * Compare one bucket. Unexpected keys abort the seed. Keys already in the
 * plan are left untouched. Missing keys are what a later put may create.
 */
export function classifyKeys(planned, existing) {
  const plannedSet = new Set(planned);
  const existingSet = new Set(existing);
  return {
    unexpected: [...existingSet].filter((key) => !plannedSet.has(key)).sort(),
    missing: [...plannedSet].filter((key) => !existingSet.has(key)).sort(),
    present: [...plannedSet].filter((key) => existingSet.has(key)).sort(),
  };
}

function walk(dir, base = dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, base));
    else if (entry.isFile() && entry.name !== ".gitkeep") out.push(path.relative(base, full).split(path.sep).join("/"));
  }
  return out;
}

/** Everything the seed writes: [{ bucket, key, file | body, contentType }]. */
export function plan() {
  const contentFiles = walk(path.join(root, "content"));
  const grouped = contentFiles.map((rel) => `content/${rel}`).filter((key) => groupForKey(key) !== null);
  const skipped = contentFiles.map((rel) => `content/${rel}`).filter((key) => groupForKey(key) === null);
  const manifest = { version: 1, generatedAt: new Date().toISOString(), keys: grouped };

  const items = [];
  for (const key of grouped) {
    items.push({ bucket: "CONTENT", key, file: path.join(root, key), contentType: contentTypeFor(key) });
  }
  items.push({
    bucket: "CONTENT",
    key: "content/.manifest.json",
    body: `${JSON.stringify(manifest, null, 2)}\n`,
    contentType: contentTypeFor("content/.manifest.json"),
  });
  const uploadsDir = path.join(root, "public", "uploads");
  if (existsSync(uploadsDir)) {
    for (const rel of walk(uploadsDir)) {
      const key = `uploads/${rel}`;
      items.push({ bucket: "STATIC", key, file: path.join(uploadsDir, rel), contentType: contentTypeFor(key) });
    }
  }
  return { items, manifest, skipped };
}

function summarise(items, buckets) {
  const byBucket = {};
  for (const item of items) {
    const stat = byBucket[item.bucket] ?? (byBucket[item.bucket] = { count: 0, bytes: 0 });
    stat.count += 1;
    stat.bytes += item.file ? statSync(item.file).size : Buffer.byteLength(item.body);
  }
  return Object.entries(byBucket)
    .map(([bucket, stat]) => `${bucket} (${buckets[bucket]}): ${stat.count} objects, ${(stat.bytes / 1048576).toFixed(1)} MB`)
    .join("\n  ");
}

async function putRemoteObject(bucketName, key, body, contentType) {
  const account = process.env.CLOUDFLARE_ACCOUNT_ID;
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!account || !token) throw new Error("CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN are required to write remote buckets");
  const encoded = key.split("/").map((part) => encodeURIComponent(part)).join("/");
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${account}/r2/buckets/${bucketName}/objects/${encoded}`,
    {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": contentType },
      body,
    },
  );
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`put ${bucketName}/${key} failed: ${response.status} ${text.slice(0, 180)}`);
  }
  await response.arrayBuffer();
}

async function listRemoteBucket(bucketName) {
  const account = process.env.CLOUDFLARE_ACCOUNT_ID;
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!account || !token) throw new Error("CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN are required to list remote buckets");
  const keys = [];
  let cursor = "";
  for (let page = 0; page < 50; page++) {
    const params = new URLSearchParams({ per_page: "1000" });
    if (cursor) params.set("cursor", cursor);
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${account}/r2/buckets/${bucketName}/objects?${params}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    const payload = await response.json();
    if (!response.ok || !payload.success) {
      const message = (payload.errors ?? []).map((error) => `${error.code} ${error.message}`).join("; ");
      throw new Error(`listing ${bucketName} failed: ${message || response.status}`);
    }
    const objects = Array.isArray(payload.result) ? payload.result : [];
    for (const object of objects) keys.push(object.key);
    const info = payload.result_info ?? {};
    if (!info.is_truncated || !info.cursor || info.cursor === cursor) break;
    cursor = info.cursor;
  }
  return keys;
}

async function seedLocal(items, configPath) {
  const { getPlatformProxy } = await import("wrangler");
  const proxy = await getPlatformProxy({
    configPath,
    persist: { path: path.join(root, ".wrangler", "state", "v3") },
    remoteBindings: false,
  });
  try {
    for (const binding of ["CONTENT", "STATIC"]) {
      const bucket = proxy.env[binding];
      if (!bucket) throw new Error(`binding ${binding} is not in ${configPath}`);
      let n = 0;
      for (const item of items.filter((candidate) => candidate.bucket === binding)) {
        const body = item.file ? readFileSync(item.file) : item.body;
        await bucket.put(item.key, body, { httpMetadata: { contentType: item.contentType } });
        n += 1;
      }
      console.log(`  ${binding}: wrote ${n} objects`);
    }
  } finally {
    await proxy.dispose();
  }
}

async function seedRemote(items, config) {
  if (process.env.GAF_SEED_CONFIRM !== config.buckets.CONTENT) {
    console.error(
      `Refusing to write. Re-run with GAF_SEED_CONFIRM=${config.buckets.CONTENT} once this production seed has been approved.`,
    );
    process.exit(2);
  }
  const existing = {
    CONTENT: await listRemoteBucket(config.buckets.CONTENT),
    STATIC: await listRemoteBucket(config.buckets.STATIC),
  };
  const classified = {};
  for (const binding of ["CONTENT", "STATIC"]) {
    const planned = items.filter((item) => item.bucket === binding).map((item) => item.key);
    classified[binding] = classifyKeys(planned, existing[binding]);
    const report = classified[binding];
    console.log(
      `  ${binding}: existing ${existing[binding].length}, already present ${report.present.length}, missing ${report.missing.length}, unexpected ${report.unexpected.length}`,
    );
    if (report.unexpected.length > 0) {
      console.error(`Refusing to seed ${binding}. Unexpected keys:\n${report.unexpected.join("\n")}`);
      process.exit(3);
    }
  }
  const missing = new Set([...classified.CONTENT.missing, ...classified.STATIC.missing]);
  const toWrite = items.filter((item) => missing.has(item.key));
  if (toWrite.length === 0) {
    console.log("  nothing missing");
    return classified;
  }
  // The Cloudflare R2 HTTP API does not honor If-None-Match, so the list above
  // is the guard: only keys absent from that list are uploaded. A key that
  // appears between the list and the put is still a new object on an empty
  // production bucket; this path never sends a put for a key it already saw.
  let cursor = 0;
  let written = 0;
  let failure = null;
  async function worker() {
    while (failure === null) {
      const index = cursor;
      cursor += 1;
      if (index >= toWrite.length) return;
      const item = toWrite[index];
      const body = item.file ? readFileSync(item.file) : item.body;
      try {
        await putRemoteObject(config.buckets[item.bucket], item.key, body, item.contentType);
      } catch (error) {
        failure = error;
        return;
      }
      written += 1;
      if (written % 100 === 0) console.log(`  created ${written} of ${toWrite.length}`);
    }
  }
  await Promise.all(Array.from({ length: 8 }, () => worker()));
  if (failure) throw failure;
  console.log(`  created ${written} objects`);
  for (const binding of ["CONTENT", "STATIC"]) {
    const planned = items.filter((item) => item.bucket === binding).map((item) => item.key);
    const after = classifyKeys(planned, await listRemoteBucket(config.buckets[binding]));
    console.log(
      `  ${binding} after: present ${after.present.length}, missing ${after.missing.length}, unexpected ${after.unexpected.length}`,
    );
    if (after.missing.length > 0 || after.unexpected.length > 0) {
      if (after.missing.length > 0) console.error(`missing ${binding}:\n${after.missing.join("\n")}`);
      if (after.unexpected.length > 0) console.error(`unexpected ${binding}:\n${after.unexpected.join("\n")}`);
      process.exit(4);
    }
  }
  return classified;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const args = parseArgs(process.argv.slice(2));
  const config = loadWranglerConfig(args.configPath);
  const { items, manifest, skipped } = plan();
  console.log(`Seed plan (${args.remote ? "REMOTE" : "local"} ${path.basename(config.path)}):\n  ${summarise(items, config.buckets)}`);
  console.log(`  manifest: ${manifest.keys.length} content keys`);
  if (skipped.length > 0) console.log(`  not in any edition group, skipped: ${skipped.join(", ")}`);
  if (args.remote) assertRemoteConfig(config);
  if (args.dryRun) process.exit(0);
  if (args.remote) await seedRemote(items, config);
  else await seedLocal(items, config.path);
  console.log("done");
}
