import assert from "node:assert/strict";
import test from "node:test";
import { radiationOncologyContentInventory } from "../data/doctor-pages/radiation-oncology";
import { doctors } from "../lib/doctors";
import { buildRadiationDoctorHub } from "../lib/doctor-specialty-page";

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
});

test("IMRT doctor list reuses the existing cost guide", () => {
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
  assert.equal(hub.conditions.length, 0);
});

test("content inventory points at existing GAF URLs rather than new doctor articles", () => {
  assert.ok(radiationOncologyContentInventory.every((row) => !row.url.startsWith("/doctors/India/Radiation-Oncology/")));
  assert.ok(radiationOncologyContentInventory.some((row) => row.kind === "cost"));
  assert.ok(radiationOncologyContentInventory.some((row) => row.kind === "blog"));
});
