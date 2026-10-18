import assert from "node:assert/strict";
import test from "node:test";
import { costPath } from "@/lib/catalog-links";
import {
  catalogChoiceHref,
  catalogFilterTarget,
  nextCatalogQuery,
  sanitizeCatalogQuery,
} from "@/lib/catalog-filter";

const EBRT = "External Beam Radiotherapy (EBRT)";
const CURRENT = {
  destination: "India",
  specialty: "Radiation Oncology",
  procedure: EBRT,
};

test("catalog filter hrefs stay on the lowercase Arabic doctor path", () => {
  assert.equal(
    catalogChoiceHref("/doctors", CURRENT, "procedure", EBRT, "ar"),
    "/ar/doctors/india/radiation-oncology/external-beam-radiotherapy-ebrt",
  );
  assert.equal(
    catalogChoiceHref("/doctors", CURRENT, "city", "Delhi NCR", "ar"),
    "/ar/doctors/india/delhi-ncr/radiation-oncology/external-beam-radiotherapy-ebrt",
  );
  assert.equal(
    catalogChoiceHref("/doctors", CURRENT, "specialty", "Medical Oncology", "ar"),
    "/ar/doctors/india/medical-oncology",
  );
  assert.equal(
    catalogChoiceHref("/doctors", { ...CURRENT, city: "Delhi NCR" }, "destination", "United Arab Emirates", "ar"),
    "/ar/doctors/united-arab-emirates/radiation-oncology/external-beam-radiotherapy-ebrt",
  );
});

test("changing destination clears the city and an unknown procedure is dropped", () => {
  const next = nextCatalogQuery(
    { destination: "India", city: "Delhi NCR", specialty: "Radiation Oncology", procedure: EBRT },
    "destination",
    "United Arab Emirates",
  );
  assert.equal(next.city, undefined);
  assert.equal(next.procedure, EBRT);
  assert.deepEqual(
    sanitizeCatalogQuery({
      destination: "India",
      city: "Not A City",
      specialty: "Radiation Oncology",
      procedure: "Not A Procedure",
    }),
    { destination: "India", specialty: "Radiation Oncology" },
  );
});

test("a cost filter with a procedure and no city uses the cost path", () => {
  assert.equal(
    catalogFilterTarget("/costs", { procedure: EBRT }),
    costPath(EBRT),
  );
});
