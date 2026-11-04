import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";

const CMS_API_ROOT = path.join(process.cwd(), "src/app/api/cms");

/** Every call that ends up in `contentStorage().write()` or `.remove()`. */
const WRITERS =
  /\b(saveCms|saveCatalogCms|saveCuratedTreatments|saveGeneration|updateGeneration|applyGeneration)\s*\(|contentStorage\(\)\s*\.\s*(write|remove)\s*\(/;

function routeFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...routeFiles(full));
    else if (entry.name === "route.ts") out.push(full);
  }
  return out.sort();
}

/**
 * The durability contract: a route that writes content must await
 * `flushContentWrites()` before it responds, otherwise a backend that persists
 * asynchronously could acknowledge a save that never reached storage. With the
 * file-system backend the await is free, so there is no reason to skip it.
 */
test("every CMS route that writes content awaits flushContentWrites()", () => {
  const writers = routeFiles(CMS_API_ROOT).filter((file) => WRITERS.test(readFileSync(file, "utf8")));
  assert.ok(writers.length >= 16, `expected the known write routes, found ${writers.length}`);

  const missing = writers.filter((file) => {
    const source = readFileSync(file, "utf8");
    return !/await\s+flushContentWrites\(\)/.test(source);
  });
  assert.deepEqual(
    missing.map((file) => path.relative(process.cwd(), file)),
    [],
    "write routes must await flushContentWrites() before responding",
  );
});

test("no CMS route or content store builds its own file-system path", () => {
  const offenders: string[] = [];
  const roots = [CMS_API_ROOT, path.join(process.cwd(), "src/lib/cms"), path.join(process.cwd(), "src/lib/ai")];
  for (const root of roots) {
    for (const entry of readdirSync(root, { recursive: true, withFileTypes: true })) {
      if (!entry.isFile() || !entry.name.endsWith(".ts") || entry.name.endsWith(".test.ts")) continue;
      const file = path.join(entry.parentPath ?? entry.path, entry.name);
      const source = readFileSync(file, "utf8");
      if (/from "(node:)?fs"|from "(node:)?fs\/promises"|process\.cwd\(\)/.test(source)) {
        offenders.push(path.relative(process.cwd(), file));
      }
    }
  }
  assert.deepEqual(offenders, [], "content I/O must go through @/lib/storage");
});
