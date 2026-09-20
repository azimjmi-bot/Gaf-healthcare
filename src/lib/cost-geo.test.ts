import assert from "node:assert/strict";
import test from "node:test";
import { costCityRecord, costCountryRecords, costCountryRecord, costPlaceLabel } from "./cost-geo";
import { costsFilterPath } from "./catalog-links";
import { parsePrettyCatalogSegments, prettyCatalogPath } from "./pretty-catalog-path";
import { getCountry, isPrimaryCountry } from "./taxonomy";
import type { CostArticle } from "@/data/cost-articles/types";

const article = {
  destinations: [
    { country: "India", stay: "No inpatient stay", context: "Catalog band." },
    {
      country: "Turkey",
      costLevel: [1.1, 1.8] as [number, number],
      stay: "Technique-dependent",
      positioning: "Private international-care market",
      context: "Confirm fractions before travel.",
    },
    {
      country: "United Arab Emirates",
      costLevel: [2.2, 3.6] as [number, number],
      stay: "Technique-dependent",
      context: "Gulf patients travel less far.",
    },
    { country: "Germany", costLevel: [2.5, 4.5] as [number, number], stay: "Varies", context: "EU." },
  ],
  cities: [
    { citySlug: "delhi-ncr", ecosystem: "e", logistics: "l", costNote: "n" },
    { citySlug: "istanbul", ecosystem: "e", logistics: "l", costNote: "n" },
  ],
} satisfies Pick<CostArticle, "destinations" | "cities">;

test("country records join CMS destination rows to the routable taxonomy", () => {
  const routable = costCountryRecords(article).map((row) => row.country.slug);
  // Germany has a comparison row but no taxonomy country, so it is not routable.
  assert.deepEqual(routable, ["india", "turkiye", "united-arab-emirates"]);
});

test("a country the CMS never describes has no record, so its route cannot resolve", () => {
  assert.equal(costCountryRecord(article, "South Korea"), undefined);
  assert.equal(costCountryRecord(article, "Mexico"), undefined);
});

test("country URL aliases resolve to the canonical taxonomy row", () => {
  assert.equal(getCountry("Turkey")?.slug, "turkiye");
  assert.equal(getCountry("UAE")?.slug, "united-arab-emirates");
  assert.equal(costCountryRecord(article, "Turkey")?.country.name, "Türkiye");
  assert.deepEqual(parsePrettyCatalogSegments(["Turkey", "Radiation-Oncology"]), {
    destination: "Türkiye",
    specialty: "Radiation Oncology",
  });
});

test("headings use the CMS country name while the URL uses the taxonomy slug", () => {
  const record = costCountryRecord(article, "Turkiye");
  assert.equal(record?.label, "Turkey");
  assert.equal(costPlaceLabel(record!.label), "Turkey");
  assert.equal(costPlaceLabel(record!.label, "Istanbul"), "Istanbul, Turkey");
  assert.equal(
    prettyCatalogPath("/costs", { destination: record!.country.name, specialty: "Radiation Oncology" }),
    "/costs/Turkiye/Radiation-Oncology",
  );
});

test("city records only resolve inside their own country", () => {
  assert.equal(costCityRecord(article, "Türkiye", "Istanbul")?.city.slug, "istanbul");
  assert.equal(costCityRecord(article, "Türkiye", "Mumbai"), undefined);
  assert.equal(costCityRecord(article, "India", "Delhi NCR")?.city.slug, "delhi-ncr");
  // Bengaluru is an India city, but this article carries no record for it.
  assert.equal(costCityRecord(article, "India", "Bengaluru"), undefined);
});

test("the primary destination keeps its flat national sheet, other countries do not", () => {
  assert.ok(isPrimaryCountry("India"));
  assert.ok(isPrimaryCountry(undefined));
  assert.ok(!isPrimaryCountry("Türkiye"));
  assert.equal(
    costsFilterPath({
      destination: "India",
      specialty: "Radiation Oncology",
      procedure: "External Beam Radiotherapy (EBRT)",
    }),
    "/costs/external-beam-radiotherapy-ebrt",
  );
  assert.equal(
    costsFilterPath({
      destination: "Türkiye",
      specialty: "Radiation Oncology",
      procedure: "External Beam Radiotherapy (EBRT)",
    }),
    "/costs/Turkiye/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)",
  );
});

test("every country and city combination gets a distinct canonical path", () => {
  const procedure = "External Beam Radiotherapy (EBRT)";
  const specialty = "Radiation Oncology";
  const paths = [
    costsFilterPath({ destination: "India", specialty, procedure }),
    costsFilterPath({ destination: "India", city: "Delhi NCR", specialty, procedure }),
    costsFilterPath({ destination: "India", city: "Mumbai", specialty, procedure }),
    costsFilterPath({ destination: "Türkiye", specialty, procedure }),
    costsFilterPath({ destination: "Türkiye", city: "Istanbul", specialty, procedure }),
    costsFilterPath({ destination: "United Arab Emirates", city: "Dubai", specialty, procedure }),
  ];
  assert.equal(new Set(paths).size, paths.length);
  assert.deepEqual(paths, [
    "/costs/external-beam-radiotherapy-ebrt",
    "/costs/India/Delhi-NCR/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)",
    "/costs/India/Mumbai/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)",
    "/costs/Turkiye/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)",
    "/costs/Turkiye/Istanbul/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)",
    "/costs/United-Arab-Emirates/Dubai/Radiation-Oncology/External-Beam-Radiotherapy-(EBRT)",
  ]);
});

test("every generated country and city path parses back to the record it came from", () => {
  const procedure = "External Beam Radiotherapy (EBRT)";
  const specialty = "Radiation Oncology";
  for (const query of [
    { destination: "Türkiye", specialty, procedure },
    { destination: "Türkiye", city: "Istanbul", specialty, procedure },
    { destination: "United Arab Emirates", city: "Dubai", specialty, procedure },
    { destination: "India", city: "Delhi NCR", specialty, procedure },
  ]) {
    const path = prettyCatalogPath("/costs", query);
    assert.deepEqual(
      parsePrettyCatalogSegments(path.replace("/costs/", "").split("/")),
      query,
      path,
    );
  }
});

test("a language prefix never reaches the cost segments", () => {
  assert.deepEqual(
    parsePrettyCatalogSegments(["Turkiye", "Radiation-Oncology", "External-Beam-Radiotherapy-(EBRT)"]),
    {
      destination: "Türkiye",
      specialty: "Radiation Oncology",
      procedure: "External Beam Radiotherapy (EBRT)",
    },
  );
});
