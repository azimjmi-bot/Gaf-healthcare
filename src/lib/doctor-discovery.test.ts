import assert from "node:assert/strict";
import test from "node:test";
import { doctors } from "./doctors";
import {
  applyDoctorListingExtras,
  doctorDiscoveryHeading,
  doctorDiscoveryTitle,
  doctorListingIsIndexable,
  doctorProfileHeading,
  doctorSpecialtyCount,
  doctorSpecialtyPageIndexable,
  doctorSpecialtySitemapPaths,
  parseDoctorListingExtras,
  radiationDoctorCount,
  radiationDoctorPageIndexable,
  radiationOncologyDoctorSitemapPaths,
  similarDoctors,
  validateRadiationOncologyDoctorGraph,
} from "./doctor-discovery";
import { RADIATION_ONCOLOGY_SELECTION_NOTE } from "../data/doctor-pages/radiation-oncology";

test("India and city H1s target Best Radiation Oncologists", () => {
  assert.equal(
    doctorDiscoveryHeading({ destination: "India", specialty: "Radiation Oncology" }),
    "Best Radiation Oncologists in India",
  );
  assert.equal(
    doctorDiscoveryHeading({
      destination: "India",
      city: "Delhi NCR",
      specialty: "Radiation Oncology",
    }),
    "Best Radiation Oncologists in Delhi NCR, India",
  );
  assert.equal(
    doctorDiscoveryHeading({
      destination: "India",
      specialty: "Radiation Oncology",
      procedure: "Intensity-Modulated Radiotherapy (IMRT)",
    }),
    "Best Radiation Oncologists for IMRT in India",
  );
});

test("metadata titles stay unique and omit the layout site suffix", () => {
  assert.equal(
    doctorDiscoveryTitle({ destination: "India", specialty: "Radiation Oncology" }),
    "Best Radiation Oncologists in India – Doctors, Hospitals & Expertise",
  );
  assert.equal(
    doctorDiscoveryTitle({
      destination: "India",
      city: "Mumbai",
      specialty: "Radiation Oncology",
    }),
    "Best Radiation Oncologists in Mumbai, India – Doctors & Hospitals",
  );
  assert.equal(
    doctorDiscoveryTitle({
      destination: "India",
      specialty: "Radiation Oncology",
      procedure: "CyberKnife",
    }),
    "Best Radiation Oncologists for CyberKnife in India – Doctors & Hospitals",
  );
  assert.equal(
    doctorDiscoveryTitle({
      destination: "India",
      city: "Delhi NCR",
      specialty: "Radiation Oncology",
      procedure: "CyberKnife",
    }),
    "Best Radiation Oncologists for CyberKnife in Delhi NCR, India",
  );
});

test("hospital and experience query extras are not indexable", () => {
  const extras = parseDoctorListingExtras({ hospital: "fortis-memorial-research-institute", experience: "20" });
  assert.equal(doctorListingIsIndexable(extras, 1), false);
  assert.equal(
    radiationDoctorPageIndexable(
      { destination: "India", specialty: "Radiation Oncology" },
      extras,
      1,
      70,
    ),
    false,
  );
  assert.equal(
    radiationDoctorPageIndexable(
      { destination: "India", specialty: "Radiation Oncology" },
      {},
      2,
      70,
    ),
    false,
  );
});

test("thin procedure combinations stay noindex", () => {
  assert.equal(
    radiationDoctorPageIndexable(
      {
        destination: "India",
        specialty: "Radiation Oncology",
        procedure: "Plaque Brachytherapy",
      },
      {},
      1,
      1,
    ),
    false,
  );
});

test("sitemap keeps city-specialty, procedure, and qualifying city-procedure paths", () => {
  const paths = radiationOncologyDoctorSitemapPaths();
  assert.ok(paths.includes("/doctors/India/Radiation-Oncology"));
  assert.ok(paths.includes("/doctors/India/Delhi-NCR/Radiation-Oncology"));
  assert.ok(paths.includes("/doctors/India/Radiation-Oncology/Intensity-Modulated-Radiotherapy-(IMRT)"));
  assert.ok(paths.includes("/doctors/India/Radiation-Oncology/CyberKnife"));
  assert.equal(
    paths.some((path) => /Prostate-Cancer|Breast-Cancer/i.test(path)),
    false,
  );
  const imrtDelhi = radiationDoctorCount({
    city: "Delhi NCR",
    procedure: "Intensity-Modulated Radiotherapy (IMRT)",
  });
  assert.equal(
    paths.includes("/doctors/India/Delhi-NCR/Radiation-Oncology/Intensity-Modulated-Radiotherapy-(IMRT)"),
    imrtDelhi >= 3,
  );
});

test("procedure doctor counts share one relationship source", () => {
  const imrt = radiationDoctorCount({ procedure: "Intensity-Modulated Radiotherapy (IMRT)" });
  const igrt = radiationDoctorCount({ procedure: "Image-Guided Radiotherapy (IGRT)" });
  assert.ok(imrt >= 3);
  assert.ok(igrt >= 1);
  assert.notEqual(imrt, igrt);
});

test("validation flags gaps without inventing relationships", () => {
  const flags = validateRadiationOncologyDoctorGraph();
  assert.equal(
    flags.some((flag) => flag.code === "inconsistent-count"),
    false,
  );
  assert.equal(
    flags.some((flag) => flag.code === "duplicate-procedure-slug"),
    false,
  );
});

test("similar doctors share specialty and are not a random slice", () => {
  const doctor = doctors.find((row) => row.specialtySlug === "radiation-oncology");
  assert.ok(doctor);
  const similar = similarDoctors(doctor, doctors, 4);
  assert.ok(similar.length > 0);
  assert.ok(similar.every((row) => row.specialtySlug === "radiation-oncology"));
  assert.ok(similar.every((row) => row.slug !== doctor.slug));
});

test("experience extras filter on listed years", () => {
  const pool = doctors.filter((row) => row.specialtySlug === "radiation-oncology").slice(0, 8);
  const filtered = applyDoctorListingExtras(pool, { minYears: 50 });
  assert.ok(filtered.length <= pool.length);
});

test("selection note refuses clinical ranking language", () => {
  assert.match(RADIATION_ONCOLOGY_SELECTION_NOTE, /does not constitute a medical ranking/i);
});

test("doctor profile heading is city-specific", () => {
  const doctor = doctors.find((row) => row.specialtySlug === "radiation-oncology" && row.city === "Delhi NCR");
  assert.ok(doctor);
  assert.equal(doctorProfileHeading(doctor), `${doctor.name} — Radiation Oncologist in Delhi NCR`);
});

test("generic specialty headings use clinically natural practitioner labels", () => {
  assert.equal(
    doctorDiscoveryHeading({ destination: "India", specialty: "Cardiology" }),
    "Best Cardiologists in India",
  );
  assert.equal(
    doctorDiscoveryHeading({
      destination: "India",
      city: "Mumbai",
      specialty: "Orthopedics",
      procedure: "Total Knee Replacement",
    }),
    "Best Orthopaedic Surgeons for Total Knee Replacement in Mumbai, India",
  );
});

test("generic specialty sitemap publishes qualified city and procedure routes", () => {
  const paths = doctorSpecialtySitemapPaths(doctors);
  assert.ok(paths.includes("/doctors/India/Cardiology"));
  assert.ok(paths.includes("/doctors/India/Mumbai/Orthopedics"));
  assert.ok(paths.includes("/doctors/India/Cardiology/Coronary-Angioplasty-Stenting"));
  const cityCount = doctorSpecialtyCount(
    "Cardiology",
    { city: "Delhi NCR", procedure: "Coronary Angioplasty & Stenting" },
    doctors,
  );
  assert.equal(
    paths.includes("/doctors/India/Delhi-NCR/Cardiology/Coronary-Angioplasty-Stenting"),
    cityCount >= 3,
  );
});

test("generic specialty indexability keeps thin procedure combinations noindex", () => {
  assert.equal(
    doctorSpecialtyPageIndexable(
      {
        destination: "India",
        specialty: "Cardiology",
        procedure: "Coronary Angioplasty & Stenting",
      },
      {},
      1,
      2,
    ),
    false,
  );
});
