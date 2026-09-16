import assert from "node:assert/strict";
import test from "node:test";
import {
  discoveryQuickAnswers,
  mappedConditionsForProcedure,
  procedureDefinitionFromCanonical,
  relatedProcedureNames,
  specialtyDefinitionFromCanonical,
  specialtyGuideQuickAnswers,
} from "./doctor-quick-answers";

test("India Radiation Oncology quick answers prioritize directory facts", () => {
  const items = discoveryQuickAnswers({
    specialty: "Radiation Oncology",
    doctorCount: 70,
    cityCount: 5,
    hospitalCount: 22,
    cityNames: ["Delhi NCR", "Mumbai", "Bengaluru", "Chennai", "Hyderabad"],
  });
  assert.deepEqual(
    items.map((item) => item.answer),
    [
      "GAF currently lists 70 radiation oncologists across 5 cities and 22 hospitals.",
      "Doctors are mapped to techniques including IMRT, IGRT, SBRT, SRS, CyberKnife, Gamma Knife, proton therapy and brachytherapy.",
      "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad.",
    ],
  );
});

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

test("non-radiation quick answers reuse their specialty and procedure sources", () => {
  const specialty = discoveryQuickAnswers({
    specialty: "Cardiology",
    doctorCount: 237,
    cityCount: 5,
    hospitalCount: 20,
    cityNames: ["Delhi NCR", "Mumbai", "Bengaluru", "Chennai", "Hyderabad"],
    procedureNames: ["Coronary Angioplasty & Stenting", "Coronary Angiography"],
  });
  assert.deepEqual(
    specialty.map((item) => item.question),
    [
      "How many cardiologists are listed in India?",
      "Which Cardiology procedures can I find specialists for?",
      "Which cities are covered?",
    ],
  );
  const guide = specialtyGuideQuickAnswers("Cardiology");
  assert.ok(guide.some((item) => item.question === "What is Cardiology?"));
  assert.ok(guide.some((item) => item.question === "What does a Cardiologist do?"));
  assert.ok(guide.every((item) => item.sourceHref?.startsWith("/costs/")));

  const procedure = discoveryQuickAnswers({
    specialty: "Orthopedics",
    procedure: "Total Knee Replacement",
    doctorCount: 151,
    cityCount: 5,
    hospitalCount: 20,
  });
  assert.equal(procedure[0]?.question, "What is Total Knee Replacement?");
  assert.equal(procedure[0]?.sourceHref, "/costs/total-knee-replacement");
});
