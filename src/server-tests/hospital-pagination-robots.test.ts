import assert from "node:assert/strict";
import test from "node:test";
import { hospitalsDirectoryMetadata } from "@/app/hospitals/metadata";
import type { CatalogQuery } from "@/lib/catalog";
import { hospitalsPath } from "@/lib/catalog-links";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { absoluteUrl } from "@/lib/seo-url";

const enSitemapUrls = new Set(buildLocaleSitemap("en").map((entry) => entry.url));
const arSitemapUrls = new Set(buildLocaleSitemap("ar").map((entry) => entry.url));

const DIRECTORY_SCOPES: { name: string; query: CatalogQuery; checkArPublished?: boolean }[] = [
  { name: "root hospital directory", query: {}, checkArPublished: true },
  { name: "India hospital directory", query: { destination: "India" }, checkArPublished: true },
  {
    name: "Delhi NCR hospital directory",
    query: { destination: "India", city: "Delhi NCR" },
    checkArPublished: true,
  },
  {
    name: "Pune hospital directory",
    query: { destination: "India", city: "Pune" },
    checkArPublished: true,
  },
  {
    name: "Radiation Oncology hospital hub",
    query: { destination: "India", specialty: "Radiation Oncology" },
    checkArPublished: false,
  },
];

test("English hospital directory page 1 is indexable and matches sitemap, page > 1 is noindex without hreflang", async () => {
  for (const scope of DIRECTORY_SCOPES) {
    const page1 = await hospitalsDirectoryMetadata(scope.query, 1, "en");
    assert.equal(page1.robots, undefined, `${scope.name} page 1 should be indexable in EN`);
    const canonical = page1.alternates?.canonical;
    assert.equal(typeof canonical, "string", `${scope.name} page 1 should have canonical`);
    assert.ok(
      enSitemapUrls.has(canonical as string),
      `${scope.name} page 1 canonical (${canonical}) should exist in sitemap-en.xml`,
    );
    assert.ok(
      page1.alternates?.languages && Object.keys(page1.alternates.languages).length > 0,
      `${scope.name} page 1 should emit hreflang`,
    );

    for (const pageNum of [2, 3, 10]) {
      const paginated = await hospitalsDirectoryMetadata(scope.query, pageNum, "en");
      assert.deepEqual(
        paginated.robots,
        { index: false, follow: true },
        `${scope.name} page ${pageNum} must be noindex, follow in EN`,
      );
      assert.deepEqual(
        paginated.alternates?.languages,
        {},
        `${scope.name} page ${pageNum} must not emit hreflang in EN`,
      );
      assert.deepEqual(
        paginated.openGraph?.alternateLocale,
        [],
        `${scope.name} page ${pageNum} must not emit og:locale:alternate in EN`,
      );
    }
  }
});

test("Arabic hospital directory page > 1 is noindex without hreflang across standard and hub scopes", async () => {
  for (const scope of DIRECTORY_SCOPES) {
    const page1 = await hospitalsDirectoryMetadata(scope.query, 1, "ar");
    const expectedUrl = absoluteUrl(hospitalsPath(scope.query), "ar");
    if (scope.checkArPublished) {
      assert.equal(page1.robots, undefined, `${scope.name} page 1 should be indexable in AR`);
      assert.ok(
        arSitemapUrls.has(expectedUrl),
        `${scope.name} page 1 (${expectedUrl}) should exist in sitemap-ar.xml`,
      );
    }

    for (const pageNum of [2, 3]) {
      const paginated = await hospitalsDirectoryMetadata(scope.query, pageNum, "ar");
      assert.deepEqual(
        paginated.robots,
        { index: false, follow: true },
        `${scope.name} page ${pageNum} must be noindex, follow in AR`,
      );
      assert.deepEqual(
        paginated.alternates?.languages,
        {},
        `${scope.name} page ${pageNum} must not emit hreflang in AR`,
      );
      assert.deepEqual(
        paginated.openGraph?.alternateLocale,
        [],
        `${scope.name} page ${pageNum} must not emit og:locale:alternate in AR`,
      );
    }
  }
});
