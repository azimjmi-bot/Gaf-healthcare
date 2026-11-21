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
  localePageIsRenderable,
  localePageState,
  localePathIsPublished,
  publishedLocalesForPath,
} from "@/lib/i18n/locale-publication";
import { facetCandidatePaths, publishedFacetPaths } from "@/lib/i18n/facet-candidates";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { INDIA_CITIES } from "@/lib/taxonomy";

const EMPTY_PUNE_PATHS = [
  "/doctors/India/Pune",
  "/hospitals/India/Pune",
  "/costs/India/Pune",
  "/doctors/India/Pune/Medical-Oncology",
  "/hospitals/India/Pune/Medical-Oncology",
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
  // Populated Pune (future genuine inventory) must not stay noindex.
  assert.equal(isEmptySupportedCityFacet({ destination: "India", city: "Pune" }, 1), false);
  assert.equal(isEmptySupportedCityFacet({ destination: "India", city: "Pune" }, 12), false);
  assert.equal(isEmptySupportedCityFacet({ destination: "India", city: "Mumbai" }, 0), true);
  assert.equal(isEmptySupportedCityFacet({ destination: "India", city: "Mumbai" }, 5), false);
  assert.equal(isEmptySupportedCityFacet({ destination: "India" }, 0), false);
});

test("empty English and Arabic Pune facets are noindex but still renderable", () => {
  for (const path of EMPTY_PUNE_PATHS) {
    assert.equal(localePageState("en", path), "noindex", `en ${path}`);
    assert.equal(localePageState("ar", path), "noindex", `ar ${path}`);
    assert.equal(localePageIsRenderable("en", path), true, `en renderable ${path}`);
    assert.equal(localePageIsRenderable("ar", path), true, `ar renderable ${path}`);
    assert.equal(localePathIsPublished("en", path), false, `en published ${path}`);
    assert.equal(localePathIsPublished("ar", path), false, `ar published ${path}`);

    const enMeta = withLocaleMetadata({ title: "t" }, path, "en", ["en", "ar"]);
    assert.deepEqual(enMeta.robots, { index: false, follow: true });
    assert.deepEqual(enMeta.alternates?.languages ?? {}, {});

    const arMeta = withLocaleMetadata({ title: "t" }, path, "ar", ["en", "ar"]);
    assert.deepEqual(arMeta.robots, { index: false, follow: true });
    assert.deepEqual(arMeta.alternates?.languages ?? {}, {});
  }
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

test("empty Pune remains out of sitemap, facet candidates and hreflang sets", () => {
  assert.ok(!indiaCitiesWithInventory("doctors").includes("Pune"));
  assert.ok(!indiaCitiesWithInventory("hospitals").includes("Pune"));
  assert.ok(!indiaCitiesWithInventory("treatments").includes("Pune"));

  const candidates = facetCandidatePaths().filter((path) => /\/Pune(?:\/|$)/i.test(path));
  assert.deepEqual(candidates, []);
  assert.deepEqual(
    publishedFacetPaths("en").filter((path) => /\/Pune(?:\/|$)/i.test(path)),
    [],
  );
  assert.deepEqual(
    publishedFacetPaths("ar").filter((path) => /\/Pune(?:\/|$)/i.test(path)),
    [],
  );

  for (const locale of ["en", "ar"] as const) {
    const locs = buildLocaleSitemap(locale)
      .map((entry) => entry.url)
      .filter((url) => /\/(?:doctors|hospitals|costs)\/(?:India|india)\/(?:Pune|pune)(?:\/|$)/i.test(url));
    assert.deepEqual(locs, [], locale);
  }

  assert.deepEqual(publishedLocalesForPath("/doctors/India/Pune"), []);
  assert.ok(publishedLocalesForPath("/doctors/India/Mumbai").includes("en"));
  assert.ok(publishedLocalesForPath("/doctors/India/Mumbai").includes("ar"));
});

test("Pune inventory is still zero and five-city counts remain positive", () => {
  assert.deepEqual(INDIA_CITIES.slice(-1), ["Pune"]);
  assert.equal(filterDoctors({ destination: "India", city: "Pune" }).length, 0);
  assert.equal(filterHospitals({ destination: "India", city: "Pune" }).length, 0);
  assert.equal(filterTreatments({ destination: "India", city: "Pune" }).length, 0);

  const doctors = cityResultCounts("doctors", { destination: "India" });
  for (const city of ["Delhi NCR", "Mumbai", "Bengaluru", "Chennai", "Hyderabad"]) {
    assert.ok((doctors.counts[city] ?? 0) > 0, city);
  }
  assert.equal(doctors.counts.Pune, 0);
});
