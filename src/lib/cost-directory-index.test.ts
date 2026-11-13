import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { listCostSpecialtyGroups } from "@/lib/catalog";
import {
  directoryCostRows,
  listDirectoryCostGroups,
  overlayDirectoryRows,
} from "@/lib/cost-directory-index";
import { catalogTreatments } from "@/lib/treatments";

const DISPLAY_KEYS = [
  "slug",
  "name",
  "category",
  "specialtySlug",
  "specialtySlugs",
  "procedureSlug",
  "usRange",
  "partnerRange",
  "stay",
] as const;

describe("cost directory index", () => {
  it("matches every specialty group and membership on the full catalog", () => {
    const full = listCostSpecialtyGroups({});
    const slim = listDirectoryCostGroups();
    assert.equal(full.length, 25);
    assert.deepEqual(
      slim.map((group) => group.name),
      full.map((group) => group.name),
    );
    assert.deepEqual(
      slim.map((group) => group.slug),
      full.map((group) => group.slug),
    );
    const fullMemberships = full.reduce((sum, group) => sum + group.items.length, 0);
    const slimMemberships = slim.reduce((sum, group) => sum + group.items.length, 0);
    assert.equal(fullMemberships, 456);
    assert.equal(slimMemberships, 456);
    assert.equal(slim[0]?.name, "Radiation Oncology");
    assert.equal(slim[0]?.items.length, 15);
    assert.deepEqual(
      slim[0]?.items.map((row) => row.name),
      full[0]?.items.map((row) => row.name),
    );
    for (let groupIndex = 0; groupIndex < full.length; groupIndex += 1) {
      const fullItems = full[groupIndex]!.items;
      const slimItems = slim[groupIndex]!.items;
      assert.equal(slimItems.length, fullItems.length, full[groupIndex]!.name);
      for (let itemIndex = 0; itemIndex < fullItems.length; itemIndex += 1) {
        const expected: Record<string, unknown> = {};
        const actual: Record<string, unknown> = {};
        for (const key of DISPLAY_KEYS) {
          expected[key] = fullItems[itemIndex]![key];
          actual[key] = slimItems[itemIndex]![key];
        }
        assert.deepEqual(actual, expected, `${full[groupIndex]!.name} #${itemIndex}`);
      }
    }
  });

  it("keeps all 419 full treatment records complete", () => {
    assert.equal(catalogTreatments.length, 419);
    assert.equal(directoryCostRows.length, 419);
    let summaryChars = 0;
    let notesChars = 0;
    for (const row of catalogTreatments) {
      assert.ok(row.summary.length > 40, row.slug);
      assert.ok(row.notes.length > 20, row.slug);
      assert.ok(row.includes.length > 0, row.slug);
      assert.ok(row.conditions.length > 0, row.slug);
      assert.ok(row.hospitalSlugs.length > 0, row.slug);
      assert.ok(row.image.length > 0, row.slug);
      summaryChars += row.summary.length;
      notesChars += row.notes.length;
    }
    assert.equal(summaryChars, 68284);
    assert.equal(notesChars, 66030);
    const ebrt = catalogTreatments.find((row) => row.slug === "external-beam-radiotherapy-ebrt");
    assert.equal(
      ebrt?.summary,
      "External Beam Radiation Therapy uses a linear accelerator outside the body to treat a tumour or area at risk. In India, published 2026 planning ranges for conventional and advanced courses are typically $1,000–$6,000+, depending on technique, fractions, hospital and cancer type.",
    );
    assert.ok(ebrt && ebrt.hospitalSlugs.length > 0);
  });

  it("applies CMS stay overrides without taking unpublished range fields", () => {
    const cms = JSON.parse(readFileSync(new URL("../../content/catalog-cms.json", import.meta.url), "utf8")) as {
      treatmentsDeleted: string[];
      treatmentsAdded: Record<string, unknown>[];
      treatmentOverrides: Record<string, { stay?: string; usRange?: string; partnerRange?: string }>;
    };
    const layered = overlayDirectoryRows(directoryCostRows, {
      treatmentsDeleted: cms.treatmentsDeleted,
      treatmentsAdded: cms.treatmentsAdded,
      treatmentOverrides: Object.fromEntries(
        Object.entries(cms.treatmentOverrides).map(([slug, patch]) => [slug, { stay: patch.stay }]),
      ),
    });
    assert.equal(cms.treatmentsDeleted.length, 0);
    assert.equal(cms.treatmentsAdded.length, 0);
    assert.equal(layered.length, 419);
    for (const row of layered) {
      const base = directoryCostRows.find((candidate) => candidate.slug === row.slug);
      const patch = cms.treatmentOverrides[row.slug];
      assert.ok(base);
      assert.equal(row.usRange, base.usRange);
      assert.equal(row.partnerRange, base.partnerRange);
      assert.equal(row.name, base.name);
      assert.deepEqual(row.specialtySlugs, base.specialtySlugs);
      assert.equal(row.stay, patch?.stay ?? base.stay);
    }
    const synthetic = overlayDirectoryRows(directoryCostRows, {
      treatmentsDeleted: ["external-beam-radiotherapy-ebrt"],
      treatmentsAdded: [],
      treatmentOverrides: { "3d-conformal-radiotherapy-3d-crt": { stay: "Synthetic stay" } },
    });
    assert.equal(synthetic.some((row) => row.slug === "external-beam-radiotherapy-ebrt"), false);
    assert.equal(synthetic.find((row) => row.slug === "3d-conformal-radiotherapy-3d-crt")?.stay, "Synthetic stay");
    assert.equal(synthetic.find((row) => row.slug === "3d-conformal-radiotherapy-3d-crt")?.usRange, directoryCostRows.find((row) => row.slug === "3d-conformal-radiotherapy-3d-crt")?.usRange);
  });

  it("does not import treatment summaries or the full catalog", () => {
    const index = readFileSync(new URL("./cost-directory-index.ts", import.meta.url), "utf8");
    const directory = readFileSync(new URL("../app/costs/directory.tsx", import.meta.url), "utf8");
    const page = readFileSync(new URL("../app/costs/page.tsx", import.meta.url), "utf8");
    assert.doesNotMatch(index, /SUMMARIES|from "@\/lib\/treatments"|from "@\/lib\/hospitals"|from "@\/lib\/data"/);
    const staticImports = directory
      .split("\n")
      .filter((line) => line.startsWith("import "))
      .join("\n");
    assert.doesNotMatch(
      staticImports,
      /@\/lib\/treatments|@\/lib\/data|@\/lib\/catalog"|@\/lib\/locale-catalog|@\/lib\/specialty-page|@\/data\/specialty-pages|specialty-cost-page/,
    );
    assert.match(directory, /pagerSpecialties/);
    assert.doesNotMatch(directory, /specialties=\{specialtyPages\}/);
    assert.doesNotMatch(page, /from "@\/lib\/data"/);
  });
});
