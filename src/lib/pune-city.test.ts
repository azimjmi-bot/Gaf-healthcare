import assert from "node:assert/strict";
import { test } from "node:test";
import {
  cityResultCounts,
  filterDoctors,
  filterHospitals,
  filterTreatments,
  indiaCitiesWithInventory,
} from "@/lib/catalog";
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

test("Pune filter counts are dynamic and currently zero without fabricated inventory", () => {
  const doctors = cityResultCounts("doctors", { destination: "India" });
  const hospitals = cityResultCounts("hospitals", { destination: "India" });
  const treatments = cityResultCounts("treatments", { destination: "India" });

  assert.equal(doctors.counts.Pune ?? 0, 0);
  assert.equal(hospitals.counts.Pune ?? 0, 0);
  assert.equal(treatments.counts.Pune ?? 0, 0);

  assert.equal(filterDoctors({ destination: "India", city: "Pune" }).length, 0);
  assert.equal(filterHospitals({ destination: "India", city: "Pune" }).length, 0);
  assert.equal(filterTreatments({ destination: "India", city: "Pune" }).length, 0);

  for (const city of ["Delhi NCR", "Mumbai", "Bengaluru", "Chennai", "Hyderabad"]) {
    assert.ok((hospitals.counts[city] ?? 0) > 0, city);
    assert.ok((doctors.counts[city] ?? 0) > 0, city);
  }
});

test("empty Pune hubs stay out of inventory-gated sitemap/facet lists", () => {
  assert.deepEqual(indiaCitiesWithInventory("doctors"), [
    "Delhi NCR",
    "Mumbai",
    "Bengaluru",
    "Chennai",
    "Hyderabad",
  ]);
  assert.deepEqual(indiaCitiesWithInventory("hospitals"), [
    "Delhi NCR",
    "Mumbai",
    "Bengaluru",
    "Chennai",
    "Hyderabad",
  ]);
  assert.ok(!indiaCitiesWithInventory("treatments").includes("Pune"));
  assert.ok(indiaCitiesWithInventory("treatments").includes("Mumbai"));
});
