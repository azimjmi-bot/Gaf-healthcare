import assert from "node:assert/strict";
import { test } from "node:test";
import {
  cityResultCounts,
  filterDoctors,
  filterHospitals,
  filterTreatments,
  indiaCitiesWithInventory,
} from "@/lib/catalog";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import {
  isEmptySupportedCityFacet,
  localePageState,
  localePathIsPublished,
  publishedLocalesForPath,
} from "@/lib/i18n/locale-publication";
import { facetCandidatePaths, publishedFacetPaths } from "@/lib/i18n/facet-candidates";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { INDIA_CITIES } from "@/lib/taxonomy";

const POPULATED_PUNE_PATHS = [
  "/doctors/India/Pune",
  "/hospitals/India/Pune",
  "/costs/India/Pune",
  "/doctors/India/Pune/Medical-Oncology",
  "/costs/India/Pune/Medical-Oncology",
] as const;

const POPULATED_FIVE_CITY_PATHS = [
  "/doctors/India/Mumbai",
  "/hospitals/India/Mumbai",
  "/costs/India/Mumbai",
  "/doctors/India/Delhi-NCR",
  "/hospitals/India/Chennai",
  "/costs/India/Hyderabad",
  "/doctors/India/Bengaluru/Medical-Oncology",
] as const;

test("empty supported-city gate is inventory-driven for Pune in both languages", () => {
  assert.equal(isEmptySupportedCityFacet({ destination: "India", city: "Pune" }, 0), true);
  // Populated Pune must not stay noindex.
  assert.equal(isEmptySupportedCityFacet({ destination: "India", city: "Pune" }, 1), false);
  assert.equal(isEmptySupportedCityFacet({ destination: "India", city: "Pune" }, 12), false);
  assert.equal(isEmptySupportedCityFacet({ destination: "India", city: "Mumbai" }, 0), true);
  assert.equal(isEmptySupportedCityFacet({ destination: "India", city: "Mumbai" }, 5), false);
  assert.equal(isEmptySupportedCityFacet({ destination: "India" }, 0), false);
});

test("populated Pune doctor, hospital and cost facets publish when inventory exists", () => {
  for (const path of POPULATED_PUNE_PATHS) {
    assert.equal(localePageState("en", path), "published", `en ${path}`);
    assert.equal(localePathIsPublished("en", path), true, `en published ${path}`);
  }
  // Faculty-affiliated Sahyadri specialty lists must not alone index hospital
  // specialty landings; doctor facets remain the authority for that inventory.
  assert.equal(localePageState("en", "/hospitals/India/Pune/Medical-Oncology"), "noindex");
  assert.equal(localePageState("en", "/doctors/India/Pune/Medical-Oncology"), "published");
});

test("populated five-city English and Arabic facets stay published and indexable", () => {
  for (const path of POPULATED_FIVE_CITY_PATHS) {
    assert.equal(localePageState("en", path), "published", `en ${path}`);
    assert.equal(localePathIsPublished("en", path), true, `en published ${path}`);
  }

  // Arabic Mumbai city roots are published on current inventory.
  assert.equal(localePageState("ar", "/doctors/India/Mumbai"), "published");
  assert.equal(localePageState("ar", "/hospitals/India/Mumbai"), "published");
  assert.equal(localePageState("ar", "/costs/India/Mumbai"), "published");

  const mumbaiMeta = withLocaleMetadata({ title: "t" }, "/doctors/India/Mumbai", "en", ["en", "ar"]);
  assert.equal(mumbaiMeta.robots, undefined);
  assert.ok(mumbaiMeta.alternates?.languages?.en);
  assert.ok(mumbaiMeta.alternates?.languages?.ar);
});

test("populated Pune doctor and hospital facets enter inventory, candidates and sitemap", () => {
  assert.ok(indiaCitiesWithInventory("doctors").includes("Pune"));
  assert.ok(indiaCitiesWithInventory("hospitals").includes("Pune"));
  assert.ok(indiaCitiesWithInventory("treatments").includes("Pune"));

  const doctorCandidates = facetCandidatePaths().filter((path) => /\/doctors\/India\/Pune(?:\/|$)/i.test(path));
  assert.ok(doctorCandidates.length > 0);
  assert.ok(publishedFacetPaths("en").some((path) => /\/doctors\/India\/Pune(?:\/|$)/i.test(path)));
  assert.ok(publishedFacetPaths("ar").some((path) => /\/doctors\/India\/Pune(?:\/|$)/i.test(path)));

  for (const locale of ["en", "ar"] as const) {
    const locs = buildLocaleSitemap(locale)
      .map((entry) => entry.url)
      .filter((url) => /\/doctors\/(?:India|india)\/(?:Pune|pune)(?:\/|$)/i.test(url));
    assert.ok(locs.length > 0, locale);
  }

  assert.ok(publishedLocalesForPath("/doctors/India/Pune").includes("en"));
  assert.ok(publishedLocalesForPath("/doctors/India/Pune").includes("ar"));
  assert.ok(publishedLocalesForPath("/doctors/India/Mumbai").includes("en"));
  assert.ok(publishedLocalesForPath("/doctors/India/Mumbai").includes("ar"));
});

test("Sahyadri Pune inventory is positive across doctors and hospitals", () => {
  assert.deepEqual(INDIA_CITIES.slice(-1), ["Pune"]);
  assert.equal(filterDoctors({ destination: "India", city: "Pune" }).length, 110);
  assert.equal(filterHospitals({ destination: "India", city: "Pune" }).length, 3);
  assert.ok(filterTreatments({ destination: "India", city: "Pune" }).length > 0);

  const doctors = cityResultCounts("doctors", { destination: "India" });
  for (const city of ["Delhi NCR", "Mumbai", "Bengaluru", "Chennai", "Hyderabad", "Pune"]) {
    assert.ok((doctors.counts[city] ?? 0) > 0, city);
  }
  assert.equal(doctors.counts.Pune, 110);
});
