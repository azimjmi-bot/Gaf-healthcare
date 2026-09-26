import assert from "node:assert/strict";
import test from "node:test";
import { filterDoctors, filterHospitals } from "@/lib/catalog";
import { doctors, hospitals } from "@/lib/data";
import { parsePrettyCatalogSegments, prettyCatalogPath } from "@/lib/pretty-catalog-path";
import { PROCEDURES, SPECIALTIES } from "@/lib/taxonomy";

/**
 * Every facet URL the sitemap can emit must parse back to the query that built
 * it, whatever punctuation the taxonomy name carries.
 *
 * This exists because a throwaway analysis script rebuilt display names by
 * turning hyphens back into spaces, which silently mis-parsed 37 of the 380
 * procedures — every one with a hyphen inside the name, "3D Conformal
 * Radiotherapy (3D-CRT)" among them — and reported those facets as having no
 * records. The router never did that: it compares in slug space, where the
 * difference between a hyphen and a space has already been erased on both
 * sides. The bug was in the measurement, not in the site.
 *
 * Pinned across the whole taxonomy rather than a sample, because the failure
 * mode is per-name and a sample is exactly what would miss it.
 */
test("every specialty and procedure survives the round trip through a URL", () => {
  const failures: string[] = [];
  for (const specialty of SPECIALTIES) {
    for (const procedure of PROCEDURES) {
      const query = {
        destination: "India",
        specialty: specialty.name,
        procedure: procedure.name,
      };
      const path = prettyCatalogPath("/doctors", query);
      const parsed = parsePrettyCatalogSegments(path.split("/").filter(Boolean).slice(1));
      if (
        parsed?.destination !== query.destination ||
        parsed.specialty !== query.specialty ||
        parsed.procedure !== query.procedure
      ) {
        failures.push(`${path} parsed as ${JSON.stringify(parsed)}`);
      }
    }
  }
  assert.deepEqual(failures.slice(0, 5), [], "sample of the failures, for readability");
  assert.equal(
    failures.length,
    0,
    `${failures.length} of ${SPECIALTIES.length * PROCEDURES.length} facet URLs do not round-trip`,
  );
});

test("a hyphen inside a procedure name is not read as a segment separator", () => {
  // The names that broke the analysis script, with their acronym aliases.
  for (const [segment, expected] of [
    ["3D-Conformal-Radiotherapy-(3D-CRT)", "3D Conformal Radiotherapy (3D-CRT)"],
    ["3D-CRT", "3D Conformal Radiotherapy (3D-CRT)"],
    ["Intensity-Modulated-Radiotherapy-(IMRT)", "Intensity-Modulated Radiotherapy (IMRT)"],
    ["IMRT", "Intensity-Modulated Radiotherapy (IMRT)"],
    ["Image-Guided-Radiotherapy-(IGRT)", "Image-Guided Radiotherapy (IGRT)"],
    ["Nipple-Sparing-Mastectomy", "Nipple-Sparing Mastectomy"],
  ] as const) {
    const parsed = parsePrettyCatalogSegments(["India", "Radiation-Oncology", segment]);
    assert.equal(parsed?.procedure, expected, segment);
  }
});

/**
 * Parsing correctly is not the same as matching records. A facet that parses to
 * a name no record holds returns an empty page, which is the symptom the
 * hyphen bug would have produced had it been in the router.
 */
test("the hyphenated radiation-oncology facets return the records they should", () => {
  for (const [segment, expectedDoctors] of [
    ["3D-Conformal-Radiotherapy-(3D-CRT)", 40],
    ["Intensity-Modulated-Radiotherapy-(IMRT)", 63],
    // 43, not the 66 this once was: 23 records reached IGRT only through the
    // malformed source label "Image-Guided Radiation Therapy (IMRT)", which
    // matched the image-guided rule as well as the intensity-modulated one.
    ["Image-Guided-Radiotherapy-(IGRT)", 43],
  ] as const) {
    const parsed = parsePrettyCatalogSegments(["India", "Radiation-Oncology", segment]);
    assert.ok(parsed, segment);
    assert.equal(filterDoctors(parsed, doctors).length, expectedDoctors, `doctors for ${segment}`);
    assert.ok(filterHospitals(parsed, hospitals).length > 0, `hospitals for ${segment}`);
  }
});

/** Hyphenated procedures must not be systematically emptier than the rest. */
test("no hyphenated procedure facet is empty while its unhyphenated peers are not", () => {
  const empty = (name: string) =>
    filterDoctors({ destination: "India", procedure: name }, doctors).length === 0;
  const hyphenated = PROCEDURES.filter((p) => /-/.test(p.name)).map((p) => p.name);
  const plain = PROCEDURES.filter((p) => !/-/.test(p.name)).map((p) => p.name);

  const hyphenatedEmptyRate = hyphenated.filter(empty).length / hyphenated.length;
  const plainEmptyRate = plain.filter(empty).length / plain.length;
  assert.ok(
    hyphenatedEmptyRate <= plainEmptyRate + 0.05,
    `hyphenated procedures are empty ${(hyphenatedEmptyRate * 100).toFixed(0)}% of the time ` +
      `versus ${(plainEmptyRate * 100).toFixed(0)}% for the rest, which would point at a parsing fault`,
  );
});
