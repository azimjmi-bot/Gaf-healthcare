import assert from "node:assert/strict";
import test from "node:test";
import { costsDirectoryMetadata } from "@/app/costs/metadata";
import { getCostArticle } from "@/data/cost-articles";
import { catalogSpecialtyName, costsFilterPath } from "@/lib/catalog-links";
import { cityEditorial, interpolateCostArticle } from "@/lib/cost-article";
import { resolveCostCountryPage } from "@/lib/cost-country-page";
import { treatments } from "@/lib/data";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { absoluteUrl } from "@/lib/seo-url";
import { CITIES, getSpecialty } from "@/lib/taxonomy";

const enSitemapUrls = new Set(buildLocaleSitemap("en").map((entry) => entry.url));
const arSitemapUrls = new Set(buildLocaleSitemap("ar").map((entry) => entry.url));

test("national procedure pages in EN and AR self-canonicalize to the sitemap URL", async () => {
  const sample =
    treatments.find((t) => t.name === "Breast-Conserving Surgery (Lumpectomy)") ??
    treatments.find((t) => t.slug === "breast-conserving-surgery-lumpectomy");
  assert.ok(sample);
  const spec = catalogSpecialtyName(sample);
  const query = { destination: "India", specialty: spec, procedure: sample.name };
  const expectedPath = costsFilterPath(query);
  const expectedEn = absoluteUrl(expectedPath, "en");
  const expectedAr = absoluteUrl(expectedPath, "ar");

  const enMeta = await costsDirectoryMetadata(query, "en");
  assert.equal(enMeta.alternates?.canonical, expectedEn);
  assert.ok(enSitemapUrls.has(expectedEn));
  assert.equal(enMeta.robots, undefined);

  const arMeta = await costsDirectoryMetadata(query, "ar");
  assert.equal(arMeta.alternates?.canonical, expectedAr);
  assert.ok(arSitemapUrls.has(expectedAr));
});

test("every India city-procedure without cityPage canonicalizes to its national URL without hreflang", async () => {
  const primaryCities = CITIES.filter((c) => c.countrySlug === "india");
  let withCityPage = 0;
  let withoutCityPage = 0;

  for (const treatment of treatments) {
    const raw = getCostArticle(treatment.slug);
    const cmsOverrides = Boolean(treatment.replaceGuide && treatment.blocks && treatment.blocks.length > 0);
    if (!raw || cmsOverrides) continue;
    const article = interpolateCostArticle(raw, treatment);
    const spec = catalogSpecialtyName(treatment);
    const nationalUrl = absoluteUrl(
      costsFilterPath({
        destination: "India",
        specialty: spec,
        procedure: treatment.name,
      }),
      "en",
    );
    assert.ok(enSitemapUrls.has(nationalUrl), `missing national URL in sitemap: ${nationalUrl}`);

    for (const city of primaryCities) {
      const hasCityPage = Boolean(cityEditorial(article, city.name)?.page);
      const query = {
        destination: "India",
        city: city.name,
        specialty: spec,
        procedure: treatment.name,
      };
      const meta = await costsDirectoryMetadata(query, "en");
      const cityUrl = absoluteUrl(costsFilterPath(query), "en");

      if (hasCityPage) {
        withCityPage += 1;
        assert.equal(meta.alternates?.canonical, cityUrl, `${cityUrl} should self-canonicalize`);
        assert.ok(enSitemapUrls.has(cityUrl), `${cityUrl} should be in EN sitemap`);
      } else {
        withoutCityPage += 1;
        assert.equal(
          meta.alternates?.canonical,
          nationalUrl,
          `${cityUrl} lacks cityPage so canonical must point to ${nationalUrl}`,
        );
        assert.deepEqual(meta.alternates?.languages, {});
        assert.deepEqual(meta.openGraph?.alternateLocale, []);
        assert.equal(enSitemapUrls.has(cityUrl), false, `${cityUrl} should not be in EN sitemap`);
      }
    }
  }

  assert.ok(withCityPage > 1000, `expected >1000 city pages with copy, got ${withCityPage}`);
  assert.ok(withoutCityPage > 400, `expected >400 city pages without copy, got ${withoutCityPage}`);
});

test("secondary-specialty national procedure aliases canonicalize to primary catalog specialty in EN and AR", async () => {
  const multiSpec = treatments.filter((t) => t.specialtySlugs.length > 1);
  assert.ok(multiSpec.length >= 30, `expected >=30 multi-specialty treatments, got ${multiSpec.length}`);

  for (const treatment of multiSpec) {
    const primarySpec = catalogSpecialtyName(treatment);
    const expectedEn = absoluteUrl(
      costsFilterPath({
        destination: "India",
        specialty: primarySpec,
        procedure: treatment.name,
      }),
      "en",
    );
    const expectedAr = absoluteUrl(
      costsFilterPath({
        destination: "India",
        specialty: primarySpec,
        procedure: treatment.name,
      }),
      "ar",
    );

    for (const slug of treatment.specialtySlugs) {
      const spec = getSpecialty(slug);
      assert.ok(spec);
      if (spec.name === primarySpec) continue;

      const query = { destination: "India", specialty: spec.name, procedure: treatment.name };
      const enMeta = await costsDirectoryMetadata(query, "en");
      assert.equal(enMeta.alternates?.canonical, expectedEn);
      assert.deepEqual(enMeta.alternates?.languages, {});
      assert.deepEqual(enMeta.openGraph?.alternateLocale, []);

      const arMeta = await costsDirectoryMetadata(query, "ar");
      assert.equal(arMeta.alternates?.canonical, expectedAr);
      assert.deepEqual(arMeta.alternates?.languages, {});
      assert.deepEqual(arMeta.openGraph?.alternateLocale, []);
    }
  }
});

test("non-primary country cost pages canonicalize to primary catalog specialty", () => {
  const multi = treatments.find((t) => t.specialtySlugs.length > 1);
  assert.ok(multi);
  const primarySpec = catalogSpecialtyName(multi);
  const secondarySlug = multi.specialtySlugs.find((s) => getSpecialty(s)?.name !== primarySpec);
  assert.ok(secondarySlug);
  const secondarySpec = getSpecialty(secondarySlug)!;

  const resolved = resolveCostCountryPage({
    destination: "Singapore",
    specialty: secondarySpec.name,
    procedure: multi.name,
  });
  assert.ok(resolved);
  assert.equal(resolved.specialty, primarySpec);
  assert.equal(
    resolved.path,
    costsFilterPath({ destination: "Singapore", specialty: primarySpec, procedure: multi.name }),
  );
});
