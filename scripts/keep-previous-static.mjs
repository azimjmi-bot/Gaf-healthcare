// Keep the previous builds' `/_next/static` files serving for a while after
// a deploy.
//
// Public HTML is cached (CDN `s-maxage` + `stale-while-revalidate=86400`,
// browsers, Googlebot's own fetch of a page it saw minutes earlier). That HTML
// references content-hashed chunks under `/_next/static/`. `next build` wipes
// `.next/static`, so for up to a day after each deploy those URLs 404 —
// visible in Search Console as a third of crawl requests being JavaScript
// with a high 404 share.
//
// Usage from the build script:
//   node scripts/keep-previous-static.mjs stash    (before `next build`)
//   node scripts/keep-previous-static.mjs restore  (after `next build`)
//
// `stash` copies the current `.next/static` into `.next/cache/previous-static/
// <timestamp>/` and drops stashes older than the retention window. `restore`
// copies every retained stash back into the fresh `.next/static` without
// overwriting anything the new build produced. Chunk, CSS and media file
// names are content hashes, so the merge is additive.
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const DEFAULT_RETENTION_MS = 48 * 60 * 60_000;

export function retentionMs(env = process.env) {
  const hours = Number.parseInt(env.GAF_STATIC_RETENTION_HOURS || "", 10);
  return Number.isFinite(hours) && hours >= 0 ? hours * 60 * 60_000 : DEFAULT_RETENTION_MS;
}

function stashRoot(nextDir) {
  return path.join(nextDir, "cache", "previous-static");
}

/** Remove stashes older than the retention window; returns the survivors. */
export function pruneStashes(nextDir, { now = Date.now(), retention = retentionMs() } = {}) {
  const root = stashRoot(nextDir);
  if (!existsSync(root)) return [];
  const kept = [];
  for (const name of readdirSync(root)) {
    const full = path.join(root, name);
    const stamp = Number.parseInt(name, 10);
    const age = Number.isFinite(stamp) ? now - stamp : Infinity;
    if (age > retention || !statSync(full).isDirectory()) {
      rmSync(full, { recursive: true, force: true });
      continue;
    }
    kept.push(full);
  }
  return kept.sort();
}

/** Copy the current `.next/static` aside. Returns the stash path or null. */
export function stashStatic(nextDir, { now = Date.now(), retention = retentionMs() } = {}) {
  const current = path.join(nextDir, "static");
  pruneStashes(nextDir, { now, retention });
  if (!existsSync(current)) return null;
  const target = path.join(stashRoot(nextDir), String(now));
  mkdirSync(target, { recursive: true });
  cpSync(current, target, { recursive: true });
  return target;
}

/**
 * Merge retained stashes into the freshly built `.next/static`. New files win;
 * returns how many stashes were merged.
 */
export function restoreStatic(nextDir, { now = Date.now(), retention = retentionMs() } = {}) {
  const current = path.join(nextDir, "static");
  if (!existsSync(current)) return 0;
  const stashes = pruneStashes(nextDir, { now, retention });
  for (const stash of stashes) {
    cpSync(stash, current, { recursive: true, force: false, errorOnExist: false });
  }
  return stashes.length;
}

const invokedDirectly = process.argv[1] && import.meta.url === new URL(`file://${path.resolve(process.argv[1])}`).href;
if (invokedDirectly) {
  const command = process.argv[2];
  const nextDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", ".next");
  if (command === "stash") {
    const stash = stashStatic(nextDir);
    console.log(stash ? `[gaf] kept previous static assets in ${path.relative(process.cwd(), stash)}` : "[gaf] no previous static assets to keep");
  } else if (command === "restore") {
    const merged = restoreStatic(nextDir);
    console.log(`[gaf] merged ${merged} previous static build(s) into .next/static`);
  } else {
    console.error("usage: keep-previous-static.mjs <stash|restore>");
    process.exit(2);
  }
}
