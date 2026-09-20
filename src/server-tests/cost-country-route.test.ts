import assert from "node:assert/strict";
import test from "node:test";
import {
  costCountryPageIsPublishable,
  resolveCostCountryPage,
} from "@/lib/cost-country-page";
import { costArticles } from "@/data/cost-articles";
import { costsFilterPath } from "@/lib/catalog-links";
import { costCountryRecords } from "@/lib/cost-geo";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import { treatments } from "@/lib/data";
import { COUNTRIES, isPrimaryCountry } from "@/lib/taxonomy";

const EBRT = "External Beam Radiotherapy (EBRT)";
const RADONC = "Radiation Oncology";

function parse(path: string) {
  const segments = path.replace(/^\/costs\/?/, "").split("/").filter(Boolean);
  return parsePrettyCatalogSegments(segments);
}

test("both cost levels resolve from their URL to the right CMS record", () => {
  assert.deepEqual(parse("/costs/India/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)"), {
    destination: "India",
    specialty: RADONC,
    procedure: EBRT,
  });
  assert.deepEqual(
    parse("/costs/India/Delhi-NCR/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)"),
    { destination: "India", city: "Delhi NCR", specialty: RADONC, procedure: EBRT },
  );
  assert.deepEqual(parse("/costs/Turkiye/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)"), {
    destination: "Türkiye",
    specialty: RADONC,
    procedure: EBRT,
  });
  // Short and English country forms resolve so they can redirect to the canonical path.
  assert.deepEqual(parse("/costs/Turkey/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)"), {
    destination: "Türkiye",
    specialty: RADONC,
    procedure: EBRT,
  });
  assert.deepEqual(parse("/costs/UAE/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)"), {
    destination: "United Arab Emirates",
    specialty: RADONC,
    procedure: EBRT,
  });
});

test("the default destination keeps its own article and never renders the country view", () => {
  assert.equal(
    resolveCostCountryPage({ destination: "India", specialty: RADONC, procedure: EBRT }),
    undefined,
  );
  assert.equal(
    costsFilterPath({ destination: "India", specialty: RADONC, procedure: EBRT }),
    "/costs/India/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)",
  );
});

test("a country with a CMS destination row resolves to its own page and canonical", () => {
  const turkey = resolveCostCountryPage({ destination: "Türkiye", specialty: RADONC, procedure: EBRT });
  assert.ok(turkey);
  assert.equal(turkey.heading, "EBRT Cost in Turkey");
  assert.equal(turkey.path, "/costs/Turkiye/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)");
  assert.ok(turkey.modelled, "no sourced figure exists yet, so the band is modelled");

  const singapore = resolveCostCountryPage({
    destination: "Singapore",
    specialty: RADONC,
    procedure: EBRT,
  });
  assert.ok(singapore);
  assert.notEqual(singapore.path, turkey.path);
  assert.notEqual(singapore.range, turkey.range);
});

test("a country the CMS does not describe has no page", () => {
  for (const destination of ["South Korea", "Mexico"]) {
    assert.equal(
      resolveCostCountryPage({ destination, specialty: RADONC, procedure: EBRT }),
      undefined,
      destination,
    );
  }
});

test("a city is only routable when the CMS holds a record for it in that country", () => {
  // No article carries a non-India city record today, so these must not resolve.
  assert.equal(
    resolveCostCountryPage({
      destination: "Türkiye",
      city: "Istanbul",
      specialty: RADONC,
      procedure: EBRT,
    }),
    undefined,
  );
  assert.equal(
    resolveCostCountryPage({
      destination: "Türkiye",
      city: "Mumbai",
      specialty: RADONC,
      procedure: EBRT,
    }),
    undefined,
  );
});

test("country pages stay out of the index until the CMS carries country copy", () => {
  const turkey = resolveCostCountryPage({ destination: "Türkiye", specialty: RADONC, procedure: EBRT });
  assert.ok(turkey);
  assert.equal(costCountryPageIsPublishable(turkey), Boolean(turkey.record.row.page));
});

test("the sitemap lists one canonical URL per published country and city combination", () => {
  const urls = new Set(buildLocaleSitemap("en").map((row) => row.url));
  const base = "https://gaf.healthcare";
  assert.ok(urls.has(`${base}/costs/India/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)`));
  assert.ok(
    urls.has(`${base}/costs/India/Delhi-NCR/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)`),
  );
  // The flat sheet still serves but canonicalises to the country path, so it is not listed.
  assert.ok(!urls.has(`${base}/costs/external-beam-radiotherapy-ebrt`));
  // Unwritten country pages resolve but are not advertised.
  assert.ok(!urls.has(`${base}/costs/Turkiye/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)`));
  assert.equal(urls.size, buildLocaleSitemap("en").length, "sitemap contains no duplicate URLs");
});

test("every routable country comes from CMS data rather than a hardcoded list", () => {
  const article = costArticles["external-beam-radiotherapy-ebrt"];
  assert.ok(article);
  const routable = costCountryRecords(article).map((row) => row.country.name);
  assert.deepEqual(routable, [
    "India",
    "Türkiye",
    "Thailand",
    "United Arab Emirates",
    "Singapore",
  ]);
  for (const name of routable) {
    assert.ok(COUNTRIES.some((row) => row.name === name), name);
    if (isPrimaryCountry(name)) continue;
    assert.ok(resolveCostCountryPage({ destination: name, specialty: RADONC, procedure: EBRT }), name);
  }
});

test("every cost article exposes the same country routes without per-country code", () => {
  const withoutCountries = treatments.filter((treatment) => {
    const article = costArticles[treatment.slug];
    if (!article) return false;
    return costCountryRecords(article).filter((row) => !row.isPrimary).length === 0;
  });
  assert.deepEqual(withoutCountries, []);
});
