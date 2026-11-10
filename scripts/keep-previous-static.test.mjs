import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { DEFAULT_RETENTION_MS, pruneStashes, restoreStatic, retentionMs, stashStatic } from "./keep-previous-static.mjs";

function fakeNextDir() {
  const dir = mkdtempSync(path.join(os.tmpdir(), "gaf-next-"));
  mkdirSync(path.join(dir, "static", "chunks"), { recursive: true });
  return dir;
}

test("retention defaults to 48 hours and honours the env override", () => {
  assert.equal(retentionMs({}), DEFAULT_RETENTION_MS);
  assert.equal(retentionMs({ GAF_STATIC_RETENTION_HOURS: "24" }), 24 * 60 * 60_000);
  assert.equal(retentionMs({ GAF_STATIC_RETENTION_HOURS: "soon" }), DEFAULT_RETENTION_MS);
});

test("old chunks survive a rebuild while new files win and stale stashes are pruned", () => {
  const nextDir = fakeNextDir();
  const chunks = path.join(nextDir, "static", "chunks");
  writeFileSync(path.join(chunks, "old-abc.js"), "old build");
  writeFileSync(path.join(chunks, "shared-123.js"), "shared v1");

  const t0 = 1_000_000;
  const stash = stashStatic(nextDir, { now: t0, retention: 1_000 });
  assert.ok(existsSync(path.join(stash, "chunks", "old-abc.js")));

  // Simulate `next build`: static is wiped and rewritten.
  rmSync(path.join(nextDir, "static"), { recursive: true, force: true });
  mkdirSync(chunks, { recursive: true });
  writeFileSync(path.join(chunks, "new-def.js"), "new build");
  writeFileSync(path.join(chunks, "shared-123.js"), "shared v2");

  assert.equal(restoreStatic(nextDir, { now: t0 + 500, retention: 1_000 }), 1);
  assert.equal(readFileSync(path.join(chunks, "old-abc.js"), "utf8"), "old build");
  assert.equal(readFileSync(path.join(chunks, "new-def.js"), "utf8"), "new build");
  assert.equal(readFileSync(path.join(chunks, "shared-123.js"), "utf8"), "shared v2");

  assert.deepEqual(pruneStashes(nextDir, { now: t0 + 5_000, retention: 1_000 }), []);
  assert.equal(existsSync(stash), false);
  assert.equal(restoreStatic(nextDir, { now: t0 + 5_000, retention: 1_000 }), 0);
});

test("stash is a no-op without a previous build", () => {
  const nextDir = mkdtempSync(path.join(os.tmpdir(), "gaf-next-empty-"));
  assert.equal(stashStatic(nextDir), null);
  assert.equal(restoreStatic(nextDir), 0);
});
