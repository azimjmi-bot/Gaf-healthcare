import assert from "node:assert/strict";
import test from "node:test";
import {
  costsFilterPath,
  doctorsPath,
  hospitalsPath,
} from "./catalog-links";
import {
  parsePrettyCatalogSegments,
  prettyCatalogPath,
} from "./pretty-catalog-path";

test("national cost procedures use their stable entity URL", () => {
  assert.equal(
    costsFilterPath({
      destination: "India",
      specialty: "Urology",
      procedure: "Kidney Transplantation",
    }),
    "/costs/kidney-transplantation",
  );
});

test("city procedure pages retain their differentiated hierarchy", () => {
  assert.equal(
    costsFilterPath({
      destination: "India",
      city: "Chennai",
      specialty: "Urology",
      procedure: "Kidney Transplantation",
    }),
    "/costs/India/Chennai/Urology/Kidney-Transplantation",
  );
});

test("specialty hubs and care directories keep their existing pSEO routes", () => {
  assert.equal(
    costsFilterPath({ destination: "India", specialty: "Pulmonology" }),
    "/costs/India/Pulmonology",
  );
  assert.equal(
    doctorsPath({
      destination: "India",
      specialty: "Pulmonology",
      procedure: "Bronchoscopy",
    }),
    "/doctors/India/Pulmonology/Bronchoscopy",
  );
  assert.equal(
    hospitalsPath({
      destination: "India",
      city: "Mumbai",
      specialty: "Cardiology",
      procedure: "Coronary Angioplasty & Stenting",
    }),
    "/hospitals/India/Mumbai/Cardiology/Coronary-Angioplasty-Stenting",
  );
});

test("diacritic destinations use an ASCII route and encoded legacy input resolves", () => {
  assert.equal(
    prettyCatalogPath("/hospitals", {
      destination: "Türkiye",
      city: "Istanbul",
    }),
    "/hospitals/Turkiye/Istanbul",
  );
  assert.deepEqual(
    parsePrettyCatalogSegments(["T%C3%BCrkiye", "Istanbul"]),
    { destination: "Türkiye", city: "Istanbul" },
  );
});

test("lowercase catalog aliases resolve for canonical path normalization", () => {
  assert.deepEqual(
    parsePrettyCatalogSegments([
      "india",
      "delhi-ncr",
      "radiation-oncology",
    ]),
    {
      destination: "India",
      city: "Delhi NCR",
      specialty: "Radiation Oncology",
    },
  );
});

test("unique procedure acronyms resolve to canonical taxonomy names", () => {
  assert.deepEqual(
    parsePrettyCatalogSegments([
      "India",
      "Radiation-Oncology",
      "IMRT",
    ]),
    {
      destination: "India",
      specialty: "Radiation Oncology",
      procedure: "Intensity-Modulated Radiotherapy (IMRT)",
    },
  );
  assert.deepEqual(
    parsePrettyCatalogSegments([
      "India",
      "Delhi-NCR",
      "Radiation-Oncology",
      "SBRT",
    ]),
    {
      destination: "India",
      city: "Delhi NCR",
      specialty: "Radiation Oncology",
      procedure: "Stereotactic Body Radiotherapy (SBRT)",
    },
  );
});
