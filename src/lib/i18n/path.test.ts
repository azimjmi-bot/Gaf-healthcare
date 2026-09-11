import assert from "node:assert/strict";
import test from "node:test";
import { localePath, stripLocalePrefix } from "./path";

test("English stays unprefixed", () => {
  assert.equal(localePath("/doctors/example", "en"), "/doctors/example");
  assert.equal(localePath("/", "en"), "/");
});

test("target languages use a root subdirectory", () => {
  assert.equal(localePath("/doctors/example", "ar"), "/ar/doctors/example");
  assert.equal(localePath("/costs?destination=India", "ru"), "/ru/costs?destination=India");
  assert.equal(localePath("/", "fr"), "/fr");
  assert.equal(localePath("/blogs/imrt-vs-3d-crt", "sw"), "/sw/blogs/imrt-vs-3d-crt");
});

test("stripLocalePrefix is reversible", () => {
  const stripped = stripLocalePrefix("/ar/hospitals/example");
  assert.equal(stripped.locale, "ar");
  assert.equal(stripped.pathname, "/hospitals/example");
  assert.equal(localePath(stripped.pathname, "en"), "/hospitals/example");
});

test("does not create /en/", () => {
  assert.equal(localePath("/doctors", "en").startsWith("/en"), false);
});

test("UI catalogs translate chrome for each language", async () => {
  const { uiCatalogFor } = await import("./ui-catalogs");
  assert.equal(uiCatalogFor("en")["home.heroTitle"], "Trusted Care Beyond Borders");
  assert.match(uiCatalogFor("ar")["home.heroTitle"], /رعاية/);
  assert.match(uiCatalogFor("ru")["nav.doctors"], /Врачи/);
  assert.match(uiCatalogFor("fr")["nav.hospitals"], /Hôpitaux/);
  assert.match(uiCatalogFor("sw")["nav.costs"], /Gharama/);
});

test("localized sitemap paths keep the language prefix", () => {
  assert.equal(localePath("/doctors/example", "ar"), "/ar/doctors/example");
  assert.equal(localePath("/ru/doctors/example", "en"), "/doctors/example");
  assert.equal(localePath("/", "sw"), "/sw");
});

test("Arabic taxonomy labels cover every filter option and keep English values", async () => {
  const { COUNTRIES, CITIES, SPECIALTIES, PROCEDURES } = await import("../taxonomy");
  const { taxonomyLabel } = await import("./taxonomy-labels");
  const names = [
    ...COUNTRIES.map((row) => row.name),
    ...CITIES.map((row) => row.name),
    ...SPECIALTIES.map((row) => row.name),
    ...PROCEDURES.map((row) => row.name),
  ];
  const missing = [...new Set(names)].filter((name) => taxonomyLabel(name, "ar") === name);
  assert.deepEqual(missing, []);
  assert.equal(taxonomyLabel("India", "en"), "India");
  assert.equal(taxonomyLabel("India", "ar"), "الهند");
  assert.equal(taxonomyLabel("Mastectomy", "ar"), "استئصال الثدي");
  assert.equal(taxonomyLabel("Surgical Oncology", "ar"), "جراحة الأورام");
});

test("Arabic sitemap URLs stay on /ar and English sitemap stays unprefixed", async () => {
  const { localePath } = await import("./path");
  assert.equal(localePath("/doctors/India/Delhi-NCR", "ar"), "/ar/doctors/India/Delhi-NCR");
  assert.equal(localePath("/costs/India/Surgical-Oncology/Mastectomy", "en"), "/costs/India/Surgical-Oncology/Mastectomy");
});
