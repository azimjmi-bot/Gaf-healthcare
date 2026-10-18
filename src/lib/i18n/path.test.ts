import assert from "node:assert/strict";
import test from "node:test";
import { localePath, localizeProseLinks, stripLocalePrefix } from "./path";

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

test("Arabic article prose points internal links at the Arabic pages", () => {
  const source = [
    "انظر [المرحلة](/blogs/breast-cancer-stages-0-1-2-3-4) و[التكلفة](/costs/India/Surgical-Oncology/Lumpectomy).",
    "[اسألي](/consult?treatment=Breast%20Cancer) و[واتساب](https://wa.me/919044346292).",
    "الموقع [هنا](https://gaf.healthcare/treatments/breast-cancer-treatment-in-india).",
    '<a href="/doctors/India/Delhi-NCR">دلهي</a> <a href="#section">قسم</a>',
    "صورة ![خطة](/uploads/treatments/example.webp)",
  ].join("\n");
  const arabic = localizeProseLinks(source, "ar");
  assert.match(arabic, /\]\(\/ar\/blogs\/breast-cancer-stages-0-1-2-3-4\)/);
  assert.match(arabic, /\]\(\/ar\/costs\/india\/surgical-oncology\/lumpectomy\)/);
  assert.match(arabic, /\]\(\/ar\/treatments\/breast-cancer-treatment-in-india\)/);
  assert.match(arabic, /href="\/ar\/doctors\/india\/delhi-ncr"/);
  assert.match(arabic, /href="#section"/);
  assert.match(arabic, /\]\(\/consult\?treatment=Breast%20Cancer\)/);
  assert.match(arabic, /https:\/\/wa\.me\/919044346292/);
  assert.match(arabic, /\]\(\/uploads\/treatments\/example\.webp\)/);
  assert.doesNotMatch(arabic, /\]\(\/blogs\//);
  assert.doesNotMatch(arabic, /\]\(\/costs\/India/);
  assert.equal(localizeProseLinks(source, "en"), source);
});

test("Arabic sitemap URLs stay on /ar and English sitemap stays unprefixed", async () => {
  const { localePath } = await import("./path");
  assert.equal(localePath("/doctors/India/Delhi-NCR", "ar"), "/ar/doctors/india/delhi-ncr");
  assert.equal(localePath("/costs/India/Surgical-Oncology/Mastectomy", "en"), "/costs/india/surgical-oncology/mastectomy");
});
