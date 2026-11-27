import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildArPublicationIndexDocument,
  clearArPublicationIndex,
  installArPublicationIndex,
} from "@/lib/i18n/ar-publication-index";
import { catalogMetadata } from "@/lib/catalog-metadata";
import { costIndexHasRows, lightLocalePageState } from "@/lib/i18n/cost-index-publication";
import { LOCALES } from "@/lib/i18n/languages";
import { withLightLocaleMetadata } from "@/lib/i18n/locale-metadata-light";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { treatmentsForLocale } from "@/lib/locale-catalog";
import { setContentStorage } from "@/lib/storage";
import { FakeR2Bucket } from "@/lib/storage/fake-r2-bucket";
import { MANIFEST_KEY, R2ContentStorage } from "@/lib/storage/r2";

describe("bare /costs publication", () => {
  it("matches full metadata and the Arabic treatment count without a second catalog", () => {
    const base = catalogMetadata("treatments", {});
    for (const locale of ["en", "ar"] as const) {
      const full = withLocaleMetadata(base, "/costs", locale, LOCALES);
      const light = withLightLocaleMetadata(base, "/costs", locale, LOCALES);
      assert.deepEqual(light, full);
    }
    assert.equal(costIndexHasRows("ar"), treatmentsForLocale("ar").length > 0);
    assert.equal(treatmentsForLocale("ar").length, 419);
    assert.equal(costIndexHasRows("en"), true);
  });

  it("uses the AR publication index on cold EN isolates without hydrating AR", async () => {
    const bucket = new FakeR2Bucket({
      "content/cms.json": "{}",
      "content/catalog-cms.json": "{}",
      "content/curated-treatments.json": "[]",
      "content/ar/catalog-cms.json": "{}",
    });
    bucket.seed(
      MANIFEST_KEY,
      JSON.stringify({
        version: 1,
        generatedAt: "2026-11-26T00:00:00.000Z",
        keys: [
          "content/cms.json",
          "content/catalog-cms.json",
          "content/curated-treatments.json",
          "content/ar/catalog-cms.json",
        ],
      }),
    );
    const storage = new R2ContentStorage({
      content: bucket,
      static: new FakeR2Bucket(),
    });
    await storage.ensureHydrated("en");
    setContentStorage(storage);
    clearArPublicationIndex();
    try {
      installArPublicationIndex(buildArPublicationIndexDocument(["/costs"]));
      assert.equal(lightLocalePageState("ar", "/costs"), "published");
      const base = catalogMetadata("treatments", {});
      const light = withLightLocaleMetadata(base, "/costs", "en", LOCALES);
      assert.ok(light?.alternates?.languages && "ar" in light.alternates.languages);
    } finally {
      clearArPublicationIndex();
      setContentStorage(undefined);
    }
  });
});
