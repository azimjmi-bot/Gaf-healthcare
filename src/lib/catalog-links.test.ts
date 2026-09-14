import assert from "node:assert/strict";
import test from "node:test";
import {
  costsFilterPath,
  doctorsPath,
  hospitalsPath,
} from "./catalog-links";

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
