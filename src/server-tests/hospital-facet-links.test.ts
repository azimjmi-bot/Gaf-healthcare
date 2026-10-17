import assert from "node:assert/strict";
import test from "node:test";
import { getCostArticle } from "@/data/cost-articles";
import { costCityRows } from "@/lib/cost-article";
import { getTreatment } from "@/lib/data";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import {
  buildHospitalSpecialtyHub,
  hospitalFacetExists,
  isHospitalSpecialtyScope,
} from "@/lib/radiation-hospital-page";
import { CITIES, PRIMARY_COUNTRY_SLUG, proceduresForSpecialty, SPECIALTIES } from "@/lib/taxonomy";

const indiaCities = CITIES.filter((city) => city.countrySlug === PRIMARY_COUNTRY_SLUG);

test("hospitalFacetExists agrees with the hub the hospitals directory renders", () => {
  let checked = 0;
  let missing = 0;
  for (const specialty of SPECIALTIES) {
    for (const city of [undefined, ...indiaCities.map((row) => row.name)]) {
      for (const procedure of [undefined, ...proceduresForSpecialty(specialty.name).map((row) => row.name)]) {
        const query = { destination: "India", city, specialty: specialty.name, procedure };
        if (!isHospitalSpecialtyScope(query)) continue;
        checked += 1;
        const renders = Boolean(buildHospitalSpecialtyHub(query));
        assert.equal(hospitalFacetExists(query), renders, JSON.stringify(query));
        if (!renders) missing += 1;
      }
    }
  }
  assert.ok(checked > 100, "expected a broad sweep of specialty facets");
  assert.ok(missing > 0, "the sweep should include combinations that do not render");
});

test("plain hospital directories are always linkable", () => {
  assert.equal(hospitalFacetExists({ destination: "India" }), true);
  assert.equal(hospitalFacetExists({ destination: "India", city: "Mumbai" }), true);
  assert.equal(hospitalFacetExists({ destination: "India", procedure: "Gamma Knife" }), true);
});

test("cost city rows only link hospital facets that render", () => {
  const treatment = getTreatment("gamma-knife");
  assert.ok(treatment);
  const article = getCostArticle(treatment.slug);
  assert.ok(article);
  const rows = costCityRows(article, treatment, [], []);
  assert.ok(rows.length > 0);
  let unlinked = 0;
  for (const row of rows) {
    if (!row.hospitalsPath) {
      unlinked += 1;
      continue;
    }
    const segments = row.hospitalsPath.replace(/^\/hospitals\//, "").split("/");
    const query = parsePrettyCatalogSegments(segments);
    assert.ok(query, row.hospitalsPath);
    assert.ok(hospitalFacetExists(query), `${row.hospitalsPath} would 404`);
  }
  assert.ok(unlinked > 0, "Gamma Knife has cities with no indexable campus facet");
});
