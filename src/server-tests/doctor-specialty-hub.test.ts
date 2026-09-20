import assert from "node:assert/strict";
import test from "node:test";
import { radiationOncologyContentInventory } from "../data/doctor-pages/radiation-oncology";
import { doctors } from "../lib/doctors";
import { buildDoctorSpecialtyHub, buildRadiationDoctorHub } from "../lib/doctor-specialty-page";
import {
  doctorSpecialtyCount,
  doctorSpecialtyPageIndexable,
  radiationDoctorCount,
  radiationDoctorPageIndexable,
} from "../lib/doctor-discovery";
import { clipToWords, discoveryQuickAnswers, wordCount } from "../lib/doctor-quick-answers";
import { SPECIALTIES } from "../lib/taxonomy";

test("Radiation Oncology India hub uses the Best H1 and existing cost URLs", () => {
  const hub = buildRadiationDoctorHub(
    { destination: "India", specialty: "Radiation Oncology" },
    {},
    1,
    doctors,
  );
  assert.ok(hub);
  assert.equal(hub.heading, "Best Radiation Oncologists in India");
  assert.ok(hub.paging.total >= 60);
  assert.ok(hub.costs.every((row) => row.href.startsWith("/costs/")));
  assert.ok(hub.costs.some((row) => row.href.includes("Intensity-Modulated-Radiotherapy-(IMRT)")));
  assert.ok(hub.conditions.every((row) => row.href === "/costs/India/Radiation-Oncology"));
  assert.ok(hub.cities.some((row) => row.href === "/doctors/India/Delhi-NCR/Radiation-Oncology"));
  assert.deepEqual(
    hub.quickAnswers.map((row) => row.question),
    [
      "How many radiation oncologists are listed in India?",
      "Which radiation techniques can I find specialists for?",
      "Which cities are covered?",
    ],
  );
  assert.equal(
    hub.quickAnswers[0]?.answer,
    `GAF currently lists ${hub.paging.total} radiation oncologists across ${hub.cities.length} cities and ${hub.hospitals.length} hospitals.`,
  );
  assert.match(hub.quickAnswers[1]?.answer ?? "", /IMRT, IGRT, SBRT, SRS, CyberKnife, Gamma Knife, proton therapy and brachytherapy/);
  assert.equal(hub.quickAnswers[2]?.answer, "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad.");
  assert.ok(hub.mainArticleAnswers.some((row) => row.question === "What is Radiation Oncology?"));
  assert.ok(hub.mainArticleAnswers.some((row) => row.question === "What does a Radiation Oncologist do?"));
  assert.ok(hub.procedures.some((row) => row.name === "Intensity-Modulated Radiotherapy (IMRT)"));
  assert.ok(hub.procedures.some((row) => row.name === "Proton Beam Therapy"));
  assert.equal(
    hub.procedures.find((row) => row.name === "Intensity-Modulated Radiotherapy (IMRT)")?.count,
    radiationDoctorCount({ procedure: "Intensity-Modulated Radiotherapy (IMRT)" }, doctors),
  );
});

test("Delhi NCR city hub is not a copy of the India page", () => {
  const india = buildRadiationDoctorHub(
    { destination: "India", specialty: "Radiation Oncology" },
    {},
    1,
    doctors,
  );
  const delhi = buildRadiationDoctorHub(
    { destination: "India", city: "Delhi NCR", specialty: "Radiation Oncology" },
    {},
    1,
    doctors,
  );
  assert.ok(india && delhi);
  assert.equal(delhi.heading, "Best Radiation Oncologists in Delhi NCR, India");
  assert.notEqual(delhi.intro[0], india.intro[0]);
  assert.equal(delhi.cityCostHref, "/costs/India/Delhi-NCR/Radiation-Oncology");
  assert.ok(delhi.paging.total < india.paging.total);
  assert.equal(delhi.mainArticleAnswers.length, 0);
  assert.ok(delhi.hospitals.every((row) => row.hospital.city === "Delhi NCR"));
  assert.ok(delhi.quickAnswers.some((row) => /Delhi NCR/.test(row.question) || /Delhi NCR/.test(row.answer)));
});

test("generic procedure template works for multiple Radiation Oncology techniques", () => {
  const names = [
    "CyberKnife",
    "Intensity-Modulated Radiotherapy (IMRT)",
    "Stereotactic Body Radiotherapy (SBRT)",
    "Brachytherapy",
    "Proton Beam Therapy",
  ];
  for (const procedure of names) {
    const hub = buildRadiationDoctorHub(
      {
        destination: "India",
        specialty: "Radiation Oncology",
        procedure,
      },
      {},
      1,
      doctors,
    );
    assert.ok(hub, procedure);
    assert.match(hub.heading, new RegExp(`Best Radiation Oncologists for .+ in India`));
    assert.equal(hub.procedure, procedure);
    assert.equal(hub.mainArticleAnswers.length, 0);
    assert.ok(hub.quickAnswers.some((row) => row.question === `What is ${procedure}?`), procedure);
    assert.ok(hub.aboutProcedure?.guideHref?.startsWith("/costs/"), procedure);
    assert.equal(hub.paging.total, radiationDoctorCount({ procedure }, doctors), procedure);
    assert.ok(hub.conditions.every((row) => row.href === "/costs/India/Radiation-Oncology"), procedure);
    assert.ok(
      hub.relatedProcedures.every((row) => row.name !== procedure),
      procedure,
    );
  }
});

test("IMRT doctor list reuses the existing cost guide and explicit condition taxonomy", () => {
  const hub = buildRadiationDoctorHub(
    {
      destination: "India",
      specialty: "Radiation Oncology",
      procedure: "Intensity-Modulated Radiotherapy (IMRT)",
    },
    {},
    1,
    doctors,
  );
  assert.ok(hub);
  assert.equal(hub.heading, "Best Radiation Oncologists for IMRT in India");
  assert.ok(
    hub.costs.some(
      (row) => row.href === "/costs/India/Radiation-Oncology/Intensity-Modulated-Radiotherapy-(IMRT)",
    ),
  );
  assert.ok(hub.conditions.some((row) => row.name === "Prostate cancer"));
  assert.ok(hub.relatedProcedures.some((row) => row.name === "Image-Guided Radiotherapy (IGRT)"));
  assert.ok(hub.relatedProcedures.every((row) => row.name !== "Intensity-Modulated Radiotherapy (IMRT)"));
});

test("city + procedure pages stay thin-gated", () => {
  const hub = buildRadiationDoctorHub(
    {
      destination: "India",
      city: "Delhi NCR",
      specialty: "Radiation Oncology",
      procedure: "CyberKnife",
    },
    {},
    1,
    doctors,
  );
  assert.ok(hub);
  assert.equal(hub.heading, "Best Radiation Oncologists for CyberKnife in Delhi NCR, India");
  assert.equal(hub.title, "Best Radiation Oncologists for CyberKnife in Delhi NCR, India");
  assert.ok(hub.hospitals.every((row) => row.hospital.city === "Delhi NCR"));
  const indexable = radiationDoctorPageIndexable(
    {
      destination: "India",
      city: "Delhi NCR",
      specialty: "Radiation Oncology",
      procedure: "CyberKnife",
    },
    {},
    1,
    hub.paging.total,
  );
  assert.equal(indexable, hub.paging.total >= 3);
});

test("content inventory points at existing GAF URLs rather than new doctor articles", () => {
  assert.ok(radiationOncologyContentInventory.every((row) => !row.url.startsWith("/doctors/India/Radiation-Oncology/")));
  assert.ok(radiationOncologyContentInventory.some((row) => row.kind === "cost"));
  assert.ok(radiationOncologyContentInventory.some((row) => row.kind === "blog"));
});

test("quick answers clip canonical source text instead of inventing copy", () => {
  const items = discoveryQuickAnswers({
    specialty: "Radiation Oncology",
    procedure: "CyberKnife",
    doctorCount: 12,
    cityCount: 3,
    hospitalCount: 4,
  });
  const definition = items.find((row) => row.question === "What is CyberKnife?");
  assert.ok(definition);
  assert.ok(wordCount(definition.answer) <= 120);
  assert.equal(definition.sourceHref, "/costs/India/Radiation-Oncology/CyberKnife");
  assert.match(definition.answer, /robotic radiosurgery/i);
  const clipped = clipToWords("One. Two. Three four five six seven eight nine ten.", 4);
  assert.ok(clipped.startsWith("One."));
});

test("every India specialty with listed doctors gets the full doctor hub", () => {
  for (const specialty of SPECIALTIES) {
    const count = doctorSpecialtyCount(specialty.name, {}, doctors);
    if (count === 0) continue;
    const hub = buildDoctorSpecialtyHub(
      { destination: "India", specialty: specialty.name },
      {},
      1,
      doctors,
    );
    assert.ok(hub, specialty.name);
    assert.equal(hub.specialtyName, specialty.name);
    assert.equal(hub.paging.total, count);
    assert.ok(hub.heading.startsWith("Best "), specialty.name);
    assert.ok(hub.cities.length > 0, specialty.name);
    assert.ok(hub.hospitals.length > 0, specialty.name);
    assert.ok(hub.quickAnswers.length > 0, specialty.name);
    assert.ok(hub.mainArticleAnswers.length > 0, specialty.name);
  }
});

test("non-radiation procedure and city pages use exact specialty mappings", () => {
  const query = {
    destination: "India",
    city: "Delhi NCR",
    specialty: "Cardiology",
    procedure: "Coronary Angioplasty & Stenting",
  };
  const hub = buildDoctorSpecialtyHub(query, {}, 1, doctors);
  assert.ok(hub);
  assert.equal(
    hub.heading,
    "Best Cardiologists for Coronary Angioplasty & Stenting in Delhi NCR, India",
  );
  assert.equal(
    hub.paging.total,
    doctorSpecialtyCount("Cardiology", {
      city: "Delhi NCR",
      procedure: "Coronary Angioplasty & Stenting",
    }, doctors),
  );
  assert.ok(hub.hospitals.every((row) => row.hospital.city === "Delhi NCR"));
  assert.equal(hub.mainArticleAnswers.length, 0);
  assert.equal(
    doctorSpecialtyPageIndexable(query, {}, 1, hub.paging.total),
    hub.paging.total >= 3,
  );
});

test("procedure pages reject cross-specialty taxonomy combinations", () => {
  assert.equal(
    buildDoctorSpecialtyHub(
      {
        destination: "India",
        specialty: "Cardiology",
        procedure: "Intensity-Modulated Radiotherapy (IMRT)",
      },
      {},
      1,
      doctors,
    ),
    undefined,
  );
});
