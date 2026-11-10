import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import {
  getGeneration,
  listGenerations,
  saveGeneration,
  updateGeneration,
  AI_GENERATIONS_KEY,
} from "@/lib/ai/history";
import type { AiGenerationRecord } from "@/lib/ai/types";
import { catalogCmsKey, loadCatalogCms, saveCatalogCms } from "@/lib/cms/catalog-store";
import { emptyCatalogCms } from "@/lib/cms/catalog-types";
import {
  ARABIC_TREATMENTS_KEY,
  CURATED_TREATMENTS_KEY,
  blankCuratedTreatment,
  loadCuratedTreatments,
  publishedCuratedTreatments,
  readCuratedTreatments,
  saveCuratedTreatments,
} from "@/lib/cms/curated-treatment-store";
import { blankTreatmentTranslation } from "@/lib/cms/curated-treatment-types";
import { clearCachedJsonFiles } from "@/lib/cms/json-file-cache";
import { MemoryContentStorage } from "@/lib/storage/memory";
import { flushContentWrites, setContentStorage } from "@/lib/storage";

let storage: MemoryContentStorage;

beforeEach(() => {
  storage = new MemoryContentStorage();
  setContentStorage(storage);
  clearCachedJsonFiles();
});

afterEach(() => {
  setContentStorage(undefined);
  clearCachedJsonFiles();
});

// --- catalog overlay store -------------------------------------------------

test("catalog overlays: missing and malformed files load as an empty overlay", () => {
  assert.deepEqual(loadCatalogCms("en"), emptyCatalogCms());
  storage.write(catalogCmsKey("ar"), "{ nope");
  assert.deepEqual(loadCatalogCms("ar"), emptyCatalogCms());
  assert.equal(catalogCmsKey("en"), "content/catalog-cms.json");
  assert.equal(catalogCmsKey("ar"), "content/ar/catalog-cms.json");
});

test("catalog overlays: save then reload per edition, with unknown patch keys dropped on read", async () => {
  const en = { ...emptyCatalogCms(), hospitalsDeleted: ["gone-hospital"] };
  saveCatalogCms(en, "en");
  await flushContentWrites();

  storage.write(
    catalogCmsKey("ar"),
    JSON.stringify({ hospitalOverrides: { "some-hospital": { name: "مستشفى", notAField: 1 } } }),
  );

  assert.deepEqual(loadCatalogCms("en").hospitalsDeleted, ["gone-hospital"]);
  const ar = loadCatalogCms("ar");
  assert.equal(ar.hospitalOverrides["some-hospital"]?.name, "مستشفى");
  assert.equal("notAField" in (ar.hospitalOverrides["some-hospital"] ?? {}), false);
  assert.deepEqual(ar.hospitalsDeleted, [], "editions do not leak into each other");
});

test("catalog overlays: a failed write keeps the last good overlay visible", async () => {
  saveCatalogCms({ ...emptyCatalogCms(), doctorsDeleted: ["a"] }, "en");
  storage.failNextWrite(new Error("ENOSPC"));
  assert.throws(() => saveCatalogCms({ ...emptyCatalogCms(), doctorsDeleted: ["a", "b"] }, "en"), /ENOSPC/);
  assert.deepEqual(loadCatalogCms("en").doctorsDeleted, ["a"]);
  await flushContentWrites();
});

// --- curated treatments ----------------------------------------------------

test("curated treatments: missing and malformed files load as an empty store", () => {
  assert.deepEqual(loadCuratedTreatments(), { treatments: [] });
  storage.write(CURATED_TREATMENTS_KEY, '{"treatments": "not an array"}');
  assert.deepEqual(loadCuratedTreatments(), { treatments: [] });
  storage.write(CURATED_TREATMENTS_KEY, "[");
  assert.deepEqual(loadCuratedTreatments(), { treatments: [] });
});

test("curated treatments: save, reload, and the shared read view invalidates", async () => {
  const first = readCuratedTreatments();
  assert.equal(first.treatments.length, 0);

  const store = loadCuratedTreatments();
  const treatment = blankCuratedTreatment(store);
  treatment.slug = "proton-therapy";
  treatment.status = "published";
  treatment.translations.en = { ...blankTreatmentTranslation(), status: "published", name: "Proton therapy" };
  store.treatments.push(treatment);
  saveCuratedTreatments(store);
  await flushContentWrites();

  const reloaded = readCuratedTreatments();
  assert.notEqual(reloaded, first);
  assert.equal(reloaded.treatments[0]?.slug, "proton-therapy");
  assert.equal(publishedCuratedTreatments("en")[0]?.translations.en?.name, "Proton therapy");
  assert.deepEqual(publishedCuratedTreatments("ar"), [], "no Arabic translation means not published in Arabic");
});

test("curated treatments: per-slug Arabic translation files overlay the English record", () => {
  const treatment = blankCuratedTreatment({ treatments: [] });
  treatment.slug = "proton-therapy";
  treatment.status = "published";
  treatment.translations.en = { ...blankTreatmentTranslation(), status: "published", name: "Proton therapy" };
  storage.write(CURATED_TREATMENTS_KEY, JSON.stringify({ treatments: [treatment] }));
  storage.write(
    `${ARABIC_TREATMENTS_KEY}/proton-therapy.json`,
    JSON.stringify({
      slug: "proton-therapy",
      translation: { ...blankTreatmentTranslation(), status: "published", name: "العلاج البروتوني" },
    }),
  );
  storage.write(`${ARABIC_TREATMENTS_KEY}/broken.json`, "{");
  storage.write(`${ARABIC_TREATMENTS_KEY}/unrelated.json`, JSON.stringify({ slug: "other", translation: blankTreatmentTranslation() }));

  const ar = publishedCuratedTreatments("ar");
  assert.equal(ar.length, 1);
  assert.equal(ar[0]?.translations.ar?.name, "العلاج البروتوني");
  assert.equal(publishedCuratedTreatments("en")[0]?.translations.ar, undefined, "English reads do not load Arabic files");
});

test("curated treatments: a failed write throws and the read view keeps the previous store", async () => {
  storage.write(CURATED_TREATMENTS_KEY, JSON.stringify({ treatments: [] }));
  const cached = readCuratedTreatments();
  storage.failNextWrite(new Error("read-only file system"));
  assert.throws(() => saveCuratedTreatments({ treatments: [] }), /read-only/);
  assert.equal(readCuratedTreatments(), cached);
  storage.failNextFlush(new Error("deferred"));
  saveCuratedTreatments({ treatments: [] });
  await assert.rejects(flushContentWrites(), /deferred/);
});

// --- AI generation history -------------------------------------------------

function generation(recordId: string): Omit<AiGenerationRecord, "id" | "createdAt"> {
  return {
    actor: "tests",
    action: "rewrite",
    contentType: "article",
    locale: "en",
    recordId,
    model: "none",
    instruction: "",
    status: "generated",
    output: {} as AiGenerationRecord["output"],
    original: {},
    currentUrl: "",
    flags: [],
  };
}

test("AI history: missing and malformed files read as empty, writes round-trip and cap at 200", async () => {
  assert.deepEqual(listGenerations(), []);
  storage.write(AI_GENERATIONS_KEY, "nope");
  assert.deepEqual(listGenerations(), []);

  const saved = saveGeneration(generation("article-1"));
  await flushContentWrites();
  assert.equal(getGeneration(saved.id)?.recordId, "article-1");
  assert.equal(updateGeneration(saved.id, { status: "approved" })?.status, "approved");
  assert.equal(getGeneration(saved.id)?.status, "approved");
  assert.equal(updateGeneration("missing", { status: "approved" }), null);

  for (let i = 0; i < 205; i += 1) saveGeneration(generation(`bulk-${i}`));
  const persisted = JSON.parse(storage.read(AI_GENERATIONS_KEY) ?? "{}") as { generations: unknown[] };
  assert.equal(persisted.generations.length, 200);
  assert.equal(listGenerations().length, 40, "the list view stays bounded");
});
