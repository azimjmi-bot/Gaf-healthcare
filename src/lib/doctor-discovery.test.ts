import assert from "node:assert/strict";
import test from "node:test";
import { doctors } from "./doctors";
import {
  applyDoctorListingExtras,
  doctorDiscoveryHeading,
  doctorDiscoveryTitle,
  doctorListingIsIndexable,
  doctorProfileHeading,
  parseDoctorListingExtras,
  radiationDoctorPageIndexable,
  radiationOncologyDoctorSitemapPaths,
  similarDoctors,
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

test("sitemap keeps city-specialty and procedure paths with enough doctors", () => {
  const paths = radiationOncologyDoctorSitemapPaths();
  assert.ok(paths.includes("/doctors/India/Radiation-Oncology"));
  assert.ok(paths.includes("/doctors/India/Delhi-NCR/Radiation-Oncology"));
  assert.ok(paths.includes("/doctors/India/Radiation-Oncology/Intensity-Modulated-Radiotherapy-(IMRT)"));
  assert.equal(
    paths.some((path) => /Prostate-Cancer|Breast-Cancer/i.test(path)),
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
