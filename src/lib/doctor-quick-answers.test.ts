import assert from "node:assert/strict";
import test from "node:test";
import {
  mappedConditionsForProcedure,
  procedureDefinitionFromCanonical,
  relatedProcedureNames,
  specialtyDefinitionFromCanonical,
} from "./doctor-quick-answers";

test("procedure definitions come from canonical cost articles", () => {
  const imrt = procedureDefinitionFromCanonical("Intensity-Modulated Radiotherapy (IMRT)");
  const igrt = procedureDefinitionFromCanonical("Image-Guided Radiotherapy (IGRT)");
  assert.ok(imrt?.text);
  assert.ok(igrt?.text);
  assert.notEqual(imrt?.text, igrt?.text);
  assert.equal(imrt?.source.canonicalUrl, "/costs/intensity-modulated-radiotherapy-imrt");
  assert.match(imrt.text, /IMRT/i);
  assert.match(igrt.text, /IGRT|image/i);
});

test("IMRT and IGRT stay distinct related procedures", () => {
  const related = relatedProcedureNames("Intensity-Modulated Radiotherapy (IMRT)", "Radiation Oncology");
  assert.ok(related.includes("Image-Guided Radiotherapy (IGRT)"));
  assert.equal(
    related.includes("Intensity-Modulated Radiotherapy (IMRT)"),
    false,
  );
});

test("condition links require an explicit specialty-guide mapping", () => {
  const imrt = mappedConditionsForProcedure("Intensity-Modulated Radiotherapy (IMRT)", "Radiation Oncology");
  const plaque = mappedConditionsForProcedure("Plaque Brachytherapy", "Radiation Oncology");
  assert.ok(imrt.some((row) => row.name === "Prostate cancer"));
  assert.ok(plaque.every((row) => row.name !== "Prostate cancer"));
  assert.ok(plaque.some((row) => /intraocular|ocular/i.test(row.name)));
});

test("specialty definition is taken from the published Radiation Oncology profile", () => {
  const definition = specialtyDefinitionFromCanonical("Radiation Oncology");
  assert.ok(definition?.text);
  assert.equal(definition?.source.canonicalUrl, "/costs/India/Radiation-Oncology");
  assert.match(definition.text, /radiation oncology/i);
});
