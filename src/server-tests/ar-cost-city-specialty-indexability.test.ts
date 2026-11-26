import assert from "node:assert/strict";
import test from "node:test";
import { costsDirectoryMetadata } from "@/app/costs/metadata";
import { costsFilterPath } from "@/lib/catalog-links";
import { localePageState, localePathIsPublished } from "@/lib/i18n/locale-publication";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { parsePrettyCatalogSegments } from "@/lib/pretty-catalog-path";

function isNoindex(robots: unknown): boolean {
  if (!robots) return false;
  if (typeof robots === "string") return /\bnoindex\b/i.test(robots);
  if (typeof robots === "object") {
    return (robots as { index?: boolean }).index === false;
  }
  return false;
}

test("all 147 Arabic city+specialty cost URLs in sitemap-ar.xml are indexable and self-canonical", async () => {
  const arSitemap = buildLocaleSitemap("ar");
  const arCitySpecialtyUrls = arSitemap
    .map((entry) => decodeURIComponent(new URL(entry.url).pathname))
    .filter((pathname) => pathname.startsWith("/ar/costs/"))
    .map((pathname) => ({
      pathname,
      englishPath: pathname.replace(/^\/ar/, ""),
      query: parsePrettyCatalogSegments(
        pathname.replace(/^\/ar\/costs\/?/, "").split("/").filter(Boolean),
      ),
    }))
    .filter((row) => row.query && row.query.city && row.query.specialty && !row.query.procedure);

  assert.equal(arCitySpecialtyUrls.length, 147);

  for (const row of arCitySpecialtyUrls) {
    assert.ok(row.query);
    const englishKey = costsFilterPath(row.query);
    assert.equal(localePageState("ar", englishKey), "published", row.pathname);
    assert.equal(localePathIsPublished("ar", englishKey), true, row.pathname);

    const meta = await costsDirectoryMetadata(row.query, "ar");
    assert.equal(
      isNoindex(meta.robots),
      false,
      `${row.pathname} must be indexable when listed in sitemap-ar.xml`,
    );
    assert.equal(
      meta.alternates?.canonical,
      `https://gaf.healthcare${row.pathname}`,
      `${row.pathname} canonical mismatch`,
    );
  }
});

test("Arabic national and city cost facets stay indexable while city+procedure stays noindex", async () => {
  const mumbaiCardiology = await costsDirectoryMetadata(
    { destination: "India", city: "Mumbai", specialty: "Cardiology" },
    "ar",
  );
  assert.equal(isNoindex(mumbaiCardiology.robots), false);
  assert.equal(
    mumbaiCardiology.alternates?.canonical,
    "https://gaf.healthcare/ar/costs/india/mumbai/cardiology",
  );

  const delhiRadOnc = await costsDirectoryMetadata(
    { destination: "India", city: "Delhi NCR", specialty: "Radiation Oncology" },
    "ar",
  );
  assert.equal(isNoindex(delhiRadOnc.robots), false);
  assert.equal(
    delhiRadOnc.alternates?.canonical,
    "https://gaf.healthcare/ar/costs/india/delhi-ncr/radiation-oncology",
  );

  const cityProcedure = await costsDirectoryMetadata(
    {
      destination: "India",
      city: "Delhi NCR",
      specialty: "Radiation Oncology",
      procedure: "External Beam Radiotherapy (EBRT)",
    },
    "ar",
  );
  assert.equal(isNoindex(cityProcedure.robots), true);
  assert.equal(
    cityProcedure.alternates?.canonical,
    "https://gaf.healthcare/ar/costs/india/delhi-ncr/radiation-oncology/external-beam-radiotherapy-ebrt",
  );
});

test("English cost city+specialty respects specialty quality threshold and multi-facet guard", async () => {
  const delhiRadOncEn = await costsDirectoryMetadata(
    { destination: "India", city: "Delhi NCR", specialty: "Radiation Oncology" },
    "en",
  );
  assert.equal(isNoindex(delhiRadOncEn.robots), false);
  assert.equal(
    delhiRadOncEn.alternates?.canonical,
    "https://gaf.healthcare/costs/india/delhi-ncr/radiation-oncology",
  );

  const mumbaiRadOncEn = await costsDirectoryMetadata(
    { destination: "India", city: "Mumbai", specialty: "Radiation Oncology" },
    "en",
  );
  assert.equal(isNoindex(mumbaiRadOncEn.robots), true);
  assert.equal(
    costsFilterPath({ destination: "India", city: "Mumbai", specialty: "Radiation Oncology" }),
    "/costs/India/Mumbai/Radiation-Oncology",
  );
});
