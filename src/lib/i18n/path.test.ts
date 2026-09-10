import assert from "node:assert/strict";
import test from "node:test";
import { localePath, stripLocalePrefix } from "./path";
import { hashContent } from "./hash";

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

test("UI catalogs translate chrome without Google", async () => {
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

test("content hash changes when English changes", () => {
  const a = hashContent({ bio: "One" });
  const b = hashContent({ bio: "Two" });
  assert.notEqual(a, b);
  assert.equal(hashContent({ bio: "One" }), a);
});
