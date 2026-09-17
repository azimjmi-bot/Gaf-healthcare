import assert from "node:assert/strict";
import test from "node:test";
import { doctorHasProcedure } from "../lib/catalog";
import { doctors } from "../lib/doctors";
import { hospitalSpecialtyCardDescription } from "../lib/hospital-specialty-copy";
import {
  buildRadiationHospitalHub,
  radiationHospitalPageIndexable,
  radiationHospitalSitemapPaths,
  validateRadiationHospitalGraph,
  validatedRadiationHospitals,
} from "../lib/radiation-hospital-page";
import { proceduresForSpecialty } from "../lib/taxonomy";

const baseQuery = {
  destination: "India",
  specialty: "Radiation Oncology",
};

test("India Radiation Oncology hospital page uses validated relationships", () => {
  const hub = buildRadiationHospitalHub(baseQuery);
  assert.ok(hub);
  assert.equal(hub.heading, "Best Hospitals for Radiation Oncology in India");
  assert.equal(hub.paging.total, validatedRadiationHospitals({}).length);
  assert.equal(hub.paging.total, 22);
  assert.equal(hub.cities.length, 5);
  assert.equal(hub.procedures.length, 15);
  assert.equal(hub.quickAnswers.length, 3);
  assert.ok(hub.metrics.some((row) => row.label === hub.practitioners));
  assert.ok(
    hub.hospitals.every(
      (row) =>
        row.doctors.length > 0 &&
        row.doctors.every(
          (doctor) =>
            doctor.specialty === "Radiation Oncology" &&
            doctor.hospitalSlug === row.hospital.slug,
        ),
    ),
  );
});

test("city specialty pages use actual city relationships and unique context", () => {
  const india = buildRadiationHospitalHub(baseQuery);
  const delhi = buildRadiationHospitalHub({
    ...baseQuery,
    city: "Delhi NCR",
  });
  assert.ok(india && delhi);
  assert.equal(
    delhi.heading,
    "Best Hospitals for Radiation Oncology in Delhi NCR, India",
  );
  assert.ok(delhi.paging.total < india.paging.total);
  assert.ok(delhi.hospitals.every((row) => row.hospital.city === "Delhi NCR"));
  assert.ok(delhi.cityContext?.introduction.length);
  assert.notEqual(delhi.quickAnswers[1]?.answer, india.quickAnswers[1]?.answer);
});

test("city specialty pages expose only procedure landings with three mapped doctors", () => {
  const expected = new Map([
    ["Delhi NCR", 12],
    ["Mumbai", 3],
    ["Bengaluru", 10],
    ["Chennai", 10],
    ["Hyderabad", 12],
  ]);
  for (const [city, count] of expected) {
    const hub = buildRadiationHospitalHub({ ...baseQuery, city });
    assert.ok(hub);
    assert.equal(hub.procedures.length, count, city);
  }
});

test("procedure hospital pages require hospital and doctor procedure mappings", () => {
  for (const name of [
    "CyberKnife",
    "Intensity-Modulated Radiotherapy (IMRT)",
    "Stereotactic Body Radiotherapy (SBRT)",
    "Brachytherapy",
    "Proton Beam Therapy",
  ]) {
    const hub = buildRadiationHospitalHub({
      ...baseQuery,
      procedure: name,
    });
    assert.ok(hub, name);
    assert.equal(hub.heading, `Best Hospitals for ${name} in India`);
    assert.ok(hub.hospitals.length > 0, name);
    assert.ok(
      hub.hospitals.every(
        (row) =>
          row.hospital.procedures.includes(name) &&
          row.doctors.some((doctor) => doctorHasProcedure(doctor, name)),
      ),
      name,
    );
    assert.ok(
      hub.doctors.every(
        (doctor) =>
          doctorHasProcedure(doctor, name) &&
          hub.hospitals.some(
            (row) => row.hospital.slug === doctor.hospitalSlug,
          ),
      ),
      name,
    );
    assert.equal(hub.quickAnswers[0]?.question, `What is ${name}?`);
    assert.ok(hub.treatmentGuides.some((row) => row.href.startsWith("/costs/")));
    assert.ok(hub.costGuides.some((row) => row.href.startsWith("/costs/")));
  }
});

test("city procedure pages contain only exact city hospital relationships", () => {
  const hub = buildRadiationHospitalHub({
    ...baseQuery,
    city: "Delhi NCR",
    procedure: "CyberKnife",
  });
  assert.ok(hub);
  assert.equal(
    hub.heading,
    "Best Hospitals for CyberKnife in Delhi NCR, India",
  );
  assert.ok(hub.hospitals.every((row) => row.hospital.city === "Delhi NCR"));
  assert.ok(hub.doctors.every((doctor) => doctor.city === "Delhi NCR"));
  assert.ok(hub.quickAnswers.some((row) => /Delhi NCR/.test(row.question)));
  assert.ok(hub.cityContext?.logistics.length);
});

test("hospital card descriptions use the current specialty instead of generic bios", () => {
  const specialtyHub = buildRadiationHospitalHub(baseQuery);
  assert.ok(specialtyHub);
  for (const relationship of specialtyHub.hospitals) {
    const description = hospitalSpecialtyCardDescription({
      hospital: relationship.hospital,
      specialty: "Radiation Oncology",
      doctors: relationship.doctors,
      procedures: relationship.procedures,
      practitionerSingular: "radiation oncologist",
      practitionerPlural: "radiation oncologists",
    });
    assert.match(description, /Radiation Oncology/);
    assert.match(description, new RegExp(relationship.hospital.city));
    assert.equal(description.includes(relationship.hospital.bio), false);
  }

  const procedureHub = buildRadiationHospitalHub({
    ...baseQuery,
    procedure: "CyberKnife",
  });
  assert.ok(procedureHub);
  const relationship = procedureHub.hospitals[0];
  const description = hospitalSpecialtyCardDescription({
    hospital: relationship.hospital,
    specialty: "Radiation Oncology",
    doctors: relationship.doctors,
    procedures: relationship.procedures,
    selectedProcedure: "CyberKnife",
    practitionerSingular: "radiation oncologist",
    practitionerPlural: "radiation oncologists",
  });
  assert.match(description, /listed for CyberKnife/);
  assert.match(description, /records the procedure at this campus/);
  assert.equal(description.includes(relationship.hospital.bio), false);
  assert.doesNotMatch(description, /1 affiliated radiation oncologists/);
});

test("every mapped Radiation Oncology procedure uses the generic template", () => {
  for (const procedure of proceduresForSpecialty("Radiation Oncology")) {
    const count = validatedRadiationHospitals({ procedure: procedure.name }).length;
    const hub = buildRadiationHospitalHub({
      ...baseQuery,
      procedure: procedure.name,
    });
    assert.equal(Boolean(hub), count > 0, procedure.name);
    if (hub) {
      assert.equal(hub.paging.total, count, procedure.name);
      assert.equal(hub.procedureSlug, procedure.slug, procedure.name);
    }
  }
});

test("invalid and empty combinations do not create a hospital hub", () => {
  assert.equal(
    buildRadiationHospitalHub({
      ...baseQuery,
      procedure: "Total Knee Replacement",
    }),
    undefined,
  );
  assert.equal(
    buildRadiationHospitalHub({
      ...baseQuery,
      city: "Mumbai",
      procedure: "Proton Beam Therapy",
    }),
    undefined,
  );
  assert.equal(
    buildRadiationHospitalHub({
      ...baseQuery,
      city: "Delhi NCR",
      procedure: "Proton Beam Therapy",
    }),
    undefined,
  );
  assert.equal(
    buildRadiationHospitalHub({
      ...baseQuery,
      city: "Mumbai",
      procedure: "Intensity-Modulated Radiotherapy (IMRT)",
    }),
    undefined,
  );
  assert.ok(
    buildRadiationHospitalHub({
      ...baseQuery,
      city: "Mumbai",
      procedure: "CyberKnife",
    }),
  );
});

test("pagination keeps page one canonical and later pages noindex", () => {
  const pageTwo = buildRadiationHospitalHub(baseQuery, 2);
  assert.ok(pageTwo);
  assert.equal(pageTwo.paging.page, 2);
  assert.equal(radiationHospitalPageIndexable(1, pageTwo.paging.total), true);
  assert.equal(radiationHospitalPageIndexable(2, pageTwo.paging.total), false);
});

test("sitemap emits only validated, unique hospital graph URLs", () => {
  const paths = radiationHospitalSitemapPaths();
  assert.equal(paths.length, new Set(paths).size);
  assert.equal(paths.length, 68);
  assert.ok(paths.includes("/hospitals/India/Radiation-Oncology"));
  assert.ok(paths.includes("/hospitals/India/Delhi-NCR/Radiation-Oncology"));
  assert.ok(paths.includes("/hospitals/India/Radiation-Oncology/CyberKnife"));
  assert.ok(paths.includes("/hospitals/India/Delhi-NCR/Radiation-Oncology/CyberKnife"));
  assert.equal(
    paths.includes("/hospitals/India/Mumbai/Radiation-Oncology/Proton-Beam-Therapy"),
    false,
  );
  assert.equal(
    paths.includes("/hospitals/India/Delhi-NCR/Radiation-Oncology/Proton-Beam-Therapy"),
    false,
  );
  assert.equal(
    paths.includes("/hospitals/India/Mumbai/Radiation-Oncology/Intensity-Modulated-Radiotherapy-(IMRT)"),
    false,
  );
});

test("graph validation flags broad legacy specialty rows without publishing them", () => {
  const flags = validateRadiationHospitalGraph();
  assert.ok(
    flags.some((flag) => flag.code === "hospital-without-radiation-doctor"),
  );
  assert.equal(
    flags.some((flag) => flag.code === "procedure-without-valid-hospital"),
    false,
  );
  assert.equal(
    flags.some((flag) => flag.code === "doctor-procedure-without-hospital-procedure"),
    false,
  );
  assert.equal(
    flags.some((flag) => flag.code === "duplicate-url"),
    false,
  );
  assert.equal(
    flags.some((flag) => flag.code === "missing-procedure-definition"),
    false,
  );
});

test("published hospital counts reconcile with the source doctor relationships", () => {
  const hub = buildRadiationHospitalHub(baseQuery);
  assert.ok(hub);
  const hospitalSlugs = new Set(hub.hospitals.map((row) => row.hospital.slug));
  const expectedDoctors = doctors.filter(
    (doctor) =>
      doctor.specialty === "Radiation Oncology" &&
      hospitalSlugs.has(doctor.hospitalSlug),
  );
  assert.equal(hub.doctors.length, expectedDoctors.length);
});
