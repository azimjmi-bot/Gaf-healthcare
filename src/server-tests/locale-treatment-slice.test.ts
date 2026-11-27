import assert from "node:assert/strict";
import test from "node:test";
import { catalogCmsIsCached, clearCatalogCmsCache } from "@/lib/cms/catalog-store";
import { clearLocaleCatalogCache, treatmentsForLocale } from "@/lib/locale-catalog";
import { localeTreatmentSlice, parseTreatmentSliceBytes } from "@/lib/locale-treatment-slice";

test("parseTreatmentSliceBytes extracts treatment slices while skipping doctorOverrides", () => {
  const payload = JSON.stringify({
    doctorOverrides: {
      "dr-test": { name: "Dr. Test", bio: "x".repeat(4000), status: "published" },
    },
    hospitalOverrides: {
      "hosp-test": { name: "Test Hospital", status: "published" },
    },
    treatmentsDeleted: ["old-treatment"],
    treatmentOverrides: {
      chemotherapy: { status: "published", stay: "5 days", summary: "s", notes: "n", includes: ["a"] },
    },
    treatmentsAdded: [],
    radiationProcedurePageOverrides: { imrt: { title: "IMRT" } },
  });
  const parsed = parseTreatmentSliceBytes(new TextEncoder().encode(payload));
  assert.deepEqual(parsed.treatmentsDeleted, ["old-treatment"]);
  assert.equal(parsed.treatmentOverrides?.chemotherapy?.stay, "5 days");
  assert.equal((parsed as Record<string, unknown>).doctorOverrides, undefined);
  assert.equal((parsed as Record<string, unknown>).hospitalOverrides, undefined);
  assert.equal(parsed.radiationProcedurePageOverrides?.imrt?.title, "IMRT");
});

test("Arabic treatment slice reads published treatments without populating CMS cache", () => {
  clearCatalogCmsCache();
  clearLocaleCatalogCache();
  const slice = localeTreatmentSlice("ar");
  const arTreatments = treatmentsForLocale("ar");
  assert.ok(arTreatments.length > 0);
  assert.equal(catalogCmsIsCached("ar"), false);
  assert.equal(typeof slice.treatmentOverrides, "object");
});
