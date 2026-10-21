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
 *   --remote           Writes to the real buckets named in wrangler.jsonc via
 *                      `wrangler r2 object put --remote`. This is the live
 *                      seeding step that needs explicit approval; the script
 *                      refuses unless GAF_SEED_CONFIRM equals the content
 *                      bucket name, and never touches DNS, routes or deploys.
 *
 *   --dry-run          List what would be written and stop.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const args = new Set(process.argv.slice(2));
const remote = args.has("--remote");
const dryRun = args.has("--dry-run");

const wrangler = JSON.parse(stripJsonComments(readFileSync(path.join(root, "wrangler.jsonc"), "utf8")));
const buckets = Object.fromEntries(wrangler.r2_buckets.map((b) => [b.binding, b.bucket_name]));
if (!buckets.CONTENT || !buckets.STATIC) {
  console.error("wrangler.jsonc must bind CONTENT and STATIC buckets");
  process.exit(1);
}

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

function stripJsonComments(text) {
  return text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'])\/\/.*$/gm, "$1");
}

function summarise(items) {
  const byBucket = {};
  for (const item of items) {
    const stat = byBucket[item.bucket] ?? (byBucket[item.bucket] = { count: 0, bytes: 0 });
    stat.count += 1;
    stat.bytes += item.file ? statSync(item.file).size : Buffer.byteLength(item.body);
  }
  return Object.entries(byBucket)
    .map(([bucket, s]) => `${bucket} (${buckets[bucket]}): ${s.count} objects, ${(s.bytes / 1048576).toFixed(1)} MB`)
    .join("\n  ");
}

async function seedLocal(items) {
  // Wrangler's own local bindings, persisted where `wrangler dev` reads them
  // (.wrangler/state/v3). `remoteBindings: false` guarantees nothing leaves this
  // machine even if a binding were ever marked remote in the config.
  const { getPlatformProxy } = await import("wrangler");
  const proxy = await getPlatformProxy({
    configPath: path.join(root, "wrangler.jsonc"),
    persist: { path: path.join(root, ".wrangler", "state", "v3") },
    remoteBindings: false,
  });
  try {
    for (const binding of ["CONTENT", "STATIC"]) {
      const bucket = proxy.env[binding];
      if (!bucket) throw new Error(`binding ${binding} is not in wrangler.jsonc`);
      let n = 0;
      for (const item of items.filter((i) => i.bucket === binding)) {
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

function seedRemote(items) {
  if (process.env.GAF_SEED_CONFIRM !== buckets.CONTENT) {
    console.error(
      `Refusing to write to live buckets. Re-run with GAF_SEED_CONFIRM=${buckets.CONTENT} once the seed has been approved.`,
    );
    process.exit(2);
  }
  for (const item of items) {
    const target = `${buckets[item.bucket]}/${item.key}`;
    const argv = ["wrangler", "r2", "object", "put", target, "--remote", "--content-type", item.contentType];
    if (item.file) argv.push("--file", item.file);
    else argv.push("--pipe");
    execFileSync("npx", argv, { stdio: ["pipe", "inherit", "inherit"], input: item.file ? undefined : item.body });
  }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const { items, manifest, skipped } = plan();
  console.log(`Seed plan (${remote ? "REMOTE: live buckets" : "local wrangler state"}):\n  ${summarise(items)}`);
  console.log(`  manifest: ${manifest.keys.length} content keys`);
  if (skipped.length > 0) console.log(`  not in any edition group, skipped: ${skipped.join(", ")}`);
  if (dryRun) process.exit(0);
  if (remote) seedRemote(items);
  else await seedLocal(items);
  console.log("done");
}
