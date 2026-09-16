import assert from "node:assert/strict";
import test from "node:test";
import { radiationOncologyContentInventory } from "../data/doctor-pages/radiation-oncology";
import { doctors } from "../lib/doctors";
import { buildRadiationDoctorHub } from "../lib/doctor-specialty-page";
import { radiationDoctorCount, radiationDoctorPageIndexable } from "../lib/doctor-discovery";
import { clipToWords, discoveryQuickAnswers, wordCount } from "../lib/doctor-quick-answers";

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
  assert.ok(hub.costs.some((row) => row.href.includes("intensity-modulated-radiotherapy-imrt")));
  assert.ok(hub.conditions.every((row) => row.href === "/costs/India/Radiation-Oncology"));
  assert.ok(hub.cities.some((row) => row.href === "/doctors/India/Delhi-NCR/Radiation-Oncology"));
  assert.ok(hub.quickAnswers.some((row) => row.question === "What is Radiation Oncology?"));
  assert.ok(hub.quickAnswers.some((row) => row.question === "What does a Radiation Oncologist do?"));
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
  assert.ok(hub.costs.some((row) => row.href === "/costs/intensity-modulated-radiotherapy-imrt"));
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
  assert.equal(definition.sourceHref, "/costs/cyberknife");
  assert.match(definition.answer, /robotic radiosurgery/i);
  const clipped = clipToWords("One. Two. Three four five six seven eight nine ten.", 4);
  assert.ok(clipped.startsWith("One."));
});
