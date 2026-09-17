import assert from "node:assert/strict";
import test from "node:test";
import { BASE_SPECIALTY_PROFILES } from "../data/specialty-pages/base-profiles";
import { doctorHasProcedure } from "../lib/catalog";
import type { CatalogQuery } from "../lib/catalog-options";
import {
  buildHospitalSpecialtyHub,
  hospitalSpecialtyCombinationIndexable,
  hospitalSpecialtySitemapPaths,
  validateHospitalSpecialtyGraph,
} from "../lib/radiation-hospital-page";
import {
  getProcedure,
  getSpecialty,
  proceduresForSpecialty,
} from "../lib/taxonomy";

test("every published India specialty profile has a hospital knowledge graph", () => {
  for (const profile of BASE_SPECIALTY_PROFILES) {
    if (profile.status !== "published" || !profile.allowIndex) continue;
    const specialty = getSpecialty(profile.specialtySlug);
    assert.ok(specialty, profile.specialtySlug);
    const hub = buildHospitalSpecialtyHub({
      destination: "India",
      specialty: specialty.name,
    });
    assert.ok(hub, specialty.name);
    assert.equal(
      hub.heading,
      `Best Hospitals for ${specialty.name} in India`,
      specialty.name,
    );
    assert.equal(hub.specialtyName, specialty.name);
    assert.equal(hub.specialtySlug, specialty.slug);
    assert.ok(hub.paging.total > 0, specialty.name);
    assert.ok(hub.doctors.length > 0, specialty.name);
    assert.equal(hub.quickAnswers.length, 3, specialty.name);
    assert.ok(hub.treatmentGuides.length > 0, specialty.name);
    assert.ok(hub.costGuides.length > 0, specialty.name);
    assert.ok(
      hub.hospitals.every(
        (relationship) =>
          relationship.hospital.specialtySlugs.includes(specialty.slug) &&
          relationship.doctors.length > 0 &&
          relationship.doctors.every(
            (doctor) =>
              doctor.specialty === specialty.name &&
              doctor.hospitalSlug === relationship.hospital.slug,
          ),
      ),
      specialty.name,
    );
  }
});

test("all emitted national procedure pages have exact three-doctor relationships", () => {
  for (const profile of BASE_SPECIALTY_PROFILES) {
    if (profile.status !== "published" || !profile.allowIndex) continue;
    const specialty = getSpecialty(profile.specialtySlug);
    assert.ok(specialty);
    for (const procedure of proceduresForSpecialty(specialty.name)) {
      const query: CatalogQuery = {
        destination: "India",
        specialty: specialty.name,
        procedure: procedure.name,
      };
      const hub = buildHospitalSpecialtyHub(query);
      assert.equal(
        Boolean(hub),
        hospitalSpecialtyCombinationIndexable(query),
        `${specialty.name}:${procedure.name}`,
      );
      if (!hub) continue;
      assert.ok(hub.doctors.length >= 3, procedure.name);
      assert.equal(
        hub.heading,
        `Best Hospitals for ${procedure.name} in India`,
      );
      assert.ok(
        hub.hospitals.every(
          (relationship) =>
            relationship.hospital.procedureSlugs.includes(procedure.slug) &&
            relationship.doctors.some((doctor) =>
              doctorHasProcedure(doctor, procedure.name),
            ),
        ),
        `${specialty.name}:${procedure.name}`,
      );
    }
  }
});

test("city pages use profile editorial and city procedure quality gates", () => {
  for (const specialtyName of [
    "Cardiology",
    "Orthopedics",
    "ENT",
    "Medical Oncology",
  ]) {
    const national = buildHospitalSpecialtyHub({
      destination: "India",
      specialty: specialtyName,
    });
    assert.ok(national);
    for (const city of national.cities) {
      const cityHub = buildHospitalSpecialtyHub({
        destination: "India",
        city: city.name,
        specialty: specialtyName,
      });
      assert.ok(cityHub, `${specialtyName}:${city.name}`);
      assert.equal(
        cityHub.heading,
        `Best Hospitals for ${specialtyName} in ${city.name}, India`,
      );
      assert.ok(cityHub.cityContext?.introduction.length);
      assert.ok(
        cityHub.hospitals.every(
          (relationship) => relationship.hospital.city === city.name,
        ),
      );
    }
    for (const procedure of national.procedures) {
      const procedureHub = buildHospitalSpecialtyHub({
        destination: "India",
        specialty: specialtyName,
        procedure: procedure.name,
      });
      assert.ok(procedureHub);
      for (const city of procedureHub.cities) {
        const cityProcedureHub = buildHospitalSpecialtyHub({
          destination: "India",
          city: city.name,
          specialty: specialtyName,
          procedure: procedure.name,
        });
        assert.ok(
          cityProcedureHub,
          `${specialtyName}:${city.name}:${procedure.name}`,
        );
        assert.ok(cityProcedureHub.doctors.length >= 3);
        assert.equal(
          cityProcedureHub.heading,
          `Best Hospitals for ${procedure.name} in ${city.name}, India`,
        );
        assert.ok(cityProcedureHub.cityContext?.introduction.length);
      }
    }
  }
});

test("cross-specialty procedure combinations never render", () => {
  assert.equal(
    buildHospitalSpecialtyHub({
      destination: "India",
      specialty: "Cardiology",
      procedure: "CyberKnife",
    }),
    undefined,
  );
  assert.equal(
    buildHospitalSpecialtyHub({
      destination: "India",
      specialty: "Orthopedics",
      procedure: "Coronary Angioplasty & Stenting",
    }),
    undefined,
  );
});

test("hospital specialty sitemap contains unique and rebuildable URLs", () => {
  const paths = hospitalSpecialtySitemapPaths();
  assert.equal(paths.length, 1188);
  assert.equal(paths.length, new Set(paths).size);
  for (const required of [
    "/hospitals/India/Cardiology",
    "/hospitals/India/Delhi-NCR/Cardiology",
    "/hospitals/India/Cardiology/Coronary-Angioplasty-Stenting",
    "/hospitals/India/Delhi-NCR/Cardiology/Coronary-Angioplasty-Stenting",
    "/hospitals/India/Orthopedics/Total-Knee-Replacement",
    "/hospitals/India/Chennai/Medical-Oncology/Chemotherapy",
  ]) {
    assert.ok(paths.includes(required), required);
  }
});

test("graph validation captures source anomalies without emitting broken URLs", () => {
  const flags = validateHospitalSpecialtyGraph();
  assert.ok(
    flags.some((flag) => flag.code === "hospital-without-specialty-doctor"),
  );
  assert.ok(
    flags.some(
      (flag) => flag.code === "doctor-procedure-without-hospital-procedure",
    ),
  );
  assert.equal(
    flags.some((flag) => flag.code === "missing-procedure-definition"),
    false,
  );
  assert.equal(
    flags.some((flag) => flag.code === "duplicate-url"),
    false,
  );
});

test("every sitemap procedure belongs to its controlled specialty taxonomy", () => {
  for (const profile of BASE_SPECIALTY_PROFILES) {
    const specialty = getSpecialty(profile.specialtySlug);
    assert.ok(specialty);
    const hub = buildHospitalSpecialtyHub({
      destination: "India",
      specialty: specialty.name,
    });
    if (!hub) continue;
    for (const procedure of hub.procedures) {
      const taxon = getProcedure(procedure.name);
      assert.ok(taxon);
      assert.ok(taxon.specialtySlugs.includes(specialty.slug));
    }
  }
});
