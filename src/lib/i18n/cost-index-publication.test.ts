import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { catalogMetadata } from "@/lib/catalog-metadata";
import { costIndexHasRows } from "@/lib/i18n/cost-index-publication";
import { LOCALES } from "@/lib/i18n/languages";
import { withLightLocaleMetadata } from "@/lib/i18n/locale-metadata-light";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { treatmentsForLocale } from "@/lib/locale-catalog";

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
});
