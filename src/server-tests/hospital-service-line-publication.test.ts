import assert from "node:assert/strict";
import { test } from "node:test";
import {
  filterHospitals,
  hospitalsForServiceLinePublication,
} from "@/lib/catalog";
import { parentCatalogQuery } from "@/lib/catalog-options";
import {
  facetDuplicatesParent,
  facetIsPublished,
} from "@/lib/i18n/locale-gating";
import { localePageState, localePathIsPublished } from "@/lib/i18n/locale-publication";
import { hospitalsForLocale } from "@/lib/locale-catalog";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";
import {
  hospitalHasCampusVerifiedServiceLines,
  isSahyadriCampus,
} from "@/lib/hospitals";

test("Sahyadri campuses mark specialty lists as faculty-affiliated, not campus-verified", () => {
  const rows = hospitalsForLocale("en").filter((h) => isSahyadriCampus(h.slug));
  assert.equal(rows.length, 3);
  for (const hospital of rows) {
    assert.equal(hospital.serviceLineEvidence, "faculty-affiliated");
    assert.equal(hospitalHasCampusVerifiedServiceLines(hospital), false);
    assert.ok(hospital.specialties.length > 0, hospital.slug);
  }
  const mumbai = hospitalsForLocale("en").find((h) => h.city === "Mumbai");
  assert.ok(mumbai);
  assert.equal(mumbai.serviceLineEvidence, "campus-verified");
  assert.equal(hospitalHasCampusVerifiedServiceLines(mumbai), true);
});

test("Infertility-IVF stays noindex under the hospital overlap gate after Sahyadri inventory", () => {
  const rows = hospitalsForLocale("ar");
  const query = parsePrettyCatalogSegments(["India", "Infertility-IVF"]);
  assert.ok(query);
  const parent = parentCatalogQuery(query);
  assert.ok(parent);

  const displayMatches = filterHospitals(query, rows).length;
  const displayParent = filterHospitals(parent, rows).length;
  assert.equal(displayMatches, 40);
  assert.equal(displayParent, 46);

  const matches = hospitalsForServiceLinePublication(query, rows, true).length;
  const parentMatches = hospitalsForServiceLinePublication(parent, rows, true).length;
  assert.equal(matches, 40);
  assert.equal(parentMatches, 42);
  assert.ok(matches / parentMatches >= 0.9);
  assert.equal(facetDuplicatesParent("hospitalFacet", matches, parentMatches), true);
  assert.equal(facetIsPublished("hospitalFacet", matches, parentMatches), false);

  assert.equal(localePageState("ar", "/hospitals/India/Infertility-IVF"), "noindex");
  assert.equal(localePathIsPublished("ar", "/hospitals/India/Infertility-IVF"), false);
  // English historically publishes campus-verified Infertility inventory.
  assert.equal(localePageState("en", "/hospitals/India/Infertility-IVF"), "published");
});

test("faculty affiliation alone cannot index hospital specialty or procedure landings", () => {
  const facultyOnly = [
    "/hospitals/India/Pune/Medical-Oncology",
    "/hospitals/India/Pune/Orthopedics",
    "/hospitals/India/Pune/Surgical-Oncology",
    "/hospitals/India/Pune/Cardiology/Coronary-Angioplasty-Stenting",
  ] as const;

  for (const path of facultyOnly) {
    assert.equal(localePageState("en", path), "noindex", `en ${path}`);
    assert.equal(localePageState("ar", path), "noindex", `ar ${path}`);
    assert.equal(localePathIsPublished("en", path), false, path);
  }

  // Directory display may still list faculty-linked campuses.
  assert.equal(
    filterHospitals(
      { destination: "India", city: "Pune", specialty: "Medical Oncology" },
      hospitalsForLocale("en"),
    ).length,
    3,
  );
  assert.equal(
    hospitalsForServiceLinePublication(
      { destination: "India", city: "Pune", specialty: "Medical Oncology" },
      hospitalsForLocale("en"),
      true,
    ).length,
    0,
  );
});

test("campus-verified hospital specialties and city hubs keep publishing", () => {
  assert.equal(localePageState("en", "/hospitals/India/Mumbai"), "published");
  assert.equal(localePageState("ar", "/hospitals/India/Mumbai"), "published");
  assert.equal(localePageState("en", "/hospitals/India/Pune"), "published");
  assert.equal(localePageState("ar", "/hospitals/India/Pune"), "published");
  assert.equal(localePageState("en", "/hospitals/India"), "published");

  // Fertility campuses remain campus-verified Infertility inventory (EN).
  assert.equal(localePageState("en", "/hospitals/India/Infertility-IVF"), "published");

  // Near-duplicate Surgical Oncology procedure facets stay noindex in Arabic.
  for (const path of [
    "/hospitals/India/Surgical-Oncology/Colectomy",
    "/hospitals/India/Surgical-Oncology/Oral-Cancer-Surgery",
    "/hospitals/India/Surgical-Oncology/Rectal-Cancer-Surgery",
    "/hospitals/India/Surgical-Oncology/Thyroidectomy-for-Thyroid-Cancer",
  ] as const) {
    assert.equal(localePageState("ar", path), "noindex", path);
  }
});

test("doctor facets still publish from Sahyadri expertise independently of hospital service lines", () => {
  assert.equal(localePageState("en", "/doctors/India/Pune"), "published");
  assert.equal(localePageState("ar", "/doctors/India/Pune"), "published");
  assert.equal(localePageState("en", "/doctors/India/Pune/Medical-Oncology"), "published");
  assert.equal(localePageState("ar", "/doctors/India/Pune/Medical-Oncology"), "published");
  assert.equal(localePageState("en", "/doctors/India/Mumbai"), "published");
});

test("English sitemap does not advertise faculty-only Pune hospital specialty landings", async () => {
  const { buildLocaleSitemap } = await import("@/lib/i18n/sitemap-entries");
  const urls = buildLocaleSitemap("en").map((entry) => entry.url);
  assert.ok(urls.some((url) => /\/hospitals\/india\/pune$/i.test(url)), "Pune city hub stays listed");
  assert.equal(
    urls.filter((url) => /\/hospitals\/india\/pune\//i.test(url)).length,
    0,
    "no Pune hospital specialty/procedure URLs in EN sitemap",
  );
  assert.ok(
    urls.some((url) => /\/doctors\/india\/pune\/medical-oncology/i.test(url)),
    "doctor specialty facet remains listed",
  );
});
