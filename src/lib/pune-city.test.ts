import assert from "node:assert/strict";
import { test } from "node:test";
import {
  cityResultCounts,
  filterDoctors,
  filterHospitals,
  filterTreatments,
  indiaCitiesWithInventory,
} from "@/lib/catalog";
import { citiesForDestination } from "@/lib/catalog-options";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { getCity, INDIA_CITIES } from "@/lib/taxonomy";

test("Pune is the sixth India catalogue city with stable slug and Arabic label", () => {
  assert.equal(INDIA_CITIES.length, 6);
  assert.deepEqual(INDIA_CITIES, [
    "Delhi NCR",
    "Mumbai",
    "Bengaluru",
    "Chennai",
    "Hyderabad",
    "Pune",
  ]);
  const city = getCity("Pune");
  assert.ok(city);
  assert.equal(city?.slug, "pune");
  assert.equal(city?.countrySlug, "india");
  assert.equal(getCity("pune")?.name, "Pune");
  assert.equal(taxonomyLabel("Pune", "ar"), "بونه");
  assert.equal(taxonomyLabel("Pune", "en"), "Pune");
});

test("Pune filter counts reflect Sahyadri inventory without fabricating empty hubs", () => {
  const doctors = cityResultCounts("doctors", { destination: "India" });
  const hospitals = cityResultCounts("hospitals", { destination: "India" });
  const treatments = cityResultCounts("treatments", { destination: "India" });

  assert.equal(doctors.counts.Pune, 110);
  assert.equal(hospitals.counts.Pune, 3);
  assert.ok((treatments.counts.Pune ?? 0) > 0);

  assert.equal(filterDoctors({ destination: "India", city: "Pune" }).length, 110);
  assert.equal(filterHospitals({ destination: "India", city: "Pune" }).length, 3);
  assert.ok(filterTreatments({ destination: "India", city: "Pune" }).length > 0);

  for (const city of ["Delhi NCR", "Mumbai", "Bengaluru", "Chennai", "Hyderabad"]) {
    assert.ok((hospitals.counts[city] ?? 0) > 0, city);
    assert.ok((doctors.counts[city] ?? 0) > 0, city);
  }
});

test("populated Pune hubs enter inventory-gated sitemap/facet lists", () => {
  assert.ok(indiaCitiesWithInventory("doctors").includes("Pune"));
  assert.ok(indiaCitiesWithInventory("hospitals").includes("Pune"));
  assert.ok(indiaCitiesWithInventory("treatments").includes("Pune"));
  assert.ok(indiaCitiesWithInventory("treatments").includes("Mumbai"));
});

test("directory city filters keep Pune visible with a dynamic positive count", () => {
  assert.deepEqual(citiesForDestination("India"), INDIA_CITIES);

  for (const entity of ["doctors", "hospitals", "treatments"] as const) {
    const stats = cityResultCounts(entity, { destination: "India" });
    assert.ok((stats.counts.Pune ?? 0) > 0, entity);
    assert.deepEqual(Object.keys(stats.counts), INDIA_CITIES);
    for (const city of ["Delhi NCR", "Mumbai", "Bengaluru", "Chennai", "Hyderabad", "Pune"]) {
      assert.ok((stats.counts[city] ?? 0) > 0, `${entity}:${city}`);
    }
  }
});
