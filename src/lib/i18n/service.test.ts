import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const dir = mkdtempSync(join(tmpdir(), "gaf-i18n-"));
process.env.TRANSLATIONS_FILE = join(dir, "translations.json");
writeFileSync(process.env.TRANSLATIONS_FILE, '{"records":{},"bulkJob":null}\n');

test("cache hit does not call Google a second time", async () => {
  const { setTranslateFnForTests } = await import("./google");
  const { getLocalizedFields } = await import("./service");
  const { getTranslation } = await import("./store");
  let calls = 0;
  setTranslateFnForTests(async ({ contents }) => {
    calls += 1;
    return contents.map((row) => `[ar] ${row}`);
  });

  const fields = { bio: "Named radiation oncologist in Delhi." };
  const first = await getLocalizedFields({
    sourceType: "doctor",
    sourceId: "test-doc",
    language: "ar",
    fields,
    generateIfMissing: true,
  });
  assert.equal(first.bio, "[ar] Named radiation oncologist in Delhi.");
  assert.equal(calls, 1);

  const second = await getLocalizedFields({
    sourceType: "doctor",
    sourceId: "test-doc",
    language: "ar",
    fields,
    generateIfMissing: true,
  });
  assert.equal(second.bio, first.bio);
  assert.equal(calls, 1);
  assert.equal(getTranslation("doctor", "test-doc", "ar")?.status, "completed");
});

test("simultaneous missing requests share one Google call", async () => {
  const { setTranslateFnForTests } = await import("./google");
  const { getLocalizedFields } = await import("./service");
  let calls = 0;
  setTranslateFnForTests(async ({ contents }) => {
    calls += 1;
    await new Promise((resolve) => setTimeout(resolve, 40));
    return contents.map((row) => `[fr] ${row}`);
  });
  const fields = { bio: "Surgical oncologist." };
  const [a, b] = await Promise.all([
    getLocalizedFields({ sourceType: "doctor", sourceId: "lock-doc", language: "fr", fields, generateIfMissing: true }),
    getLocalizedFields({ sourceType: "doctor", sourceId: "lock-doc", language: "fr", fields, generateIfMissing: true }),
  ]);
  assert.equal(a.bio, b.bio);
  assert.equal(calls, 1);
});

test("English update makes the stored translation outdated and regenerates", async () => {
  const { setTranslateFnForTests } = await import("./google");
  const { getLocalizedFields } = await import("./service");
  let calls = 0;
  setTranslateFnForTests(async ({ contents }) => {
    calls += 1;
    return contents.map((row) => `v${calls}:${row}`);
  });
  const first = await getLocalizedFields({
    sourceType: "blog",
    sourceId: "note",
    language: "ru",
    fields: { title: "First" },
    generateIfMissing: true,
  });
  assert.match(first.title, /^v1:/);
  const second = await getLocalizedFields({
    sourceType: "blog",
    sourceId: "note",
    language: "ru",
    fields: { title: "Second" },
    generateIfMissing: true,
  });
  assert.match(second.title, /^v2:/);
  assert.equal(calls, 2);
});
