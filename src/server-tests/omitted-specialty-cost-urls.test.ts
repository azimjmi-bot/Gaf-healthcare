import assert from "node:assert/strict";
import test from "node:test";
import { costsDirectoryMetadata } from "@/app/costs/metadata";
import { catalogSpecialtyName, costsFilterPath } from "@/lib/catalog-links";
import { treatments } from "@/lib/data";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { parsePrettyCatalogSegments, prettyCatalogPath } from "@/lib/pretty-catalog-path";
import { absoluteUrl } from "@/lib/seo-url";

const enSitemapUrls = new Set(buildLocaleSitemap("en").map((entry) => entry.url));
const arSitemapUrls = new Set(buildLocaleSitemap("ar").map((entry) => entry.url));

test("omitted-specialty national cost URLs (/costs/india/<procedure>) canonicalize to specialty-qualified URLs and emit no hreflang", async () => {
  const sampleSlugs = [
    "chemotherapy",
    "external-beam-radiotherapy-ebrt",
    "breast-conserving-surgery-lumpectomy",
    "total-knee-replacement",
    "pacemaker-implantation",
  ];

  for (const slug of sampleSlugs) {
    const treatment = treatments.find((t) => t.slug === slug);
    assert.ok(treatment, `missing treatment ${slug}`);

    const parsed = parsePrettyCatalogSegments(["india", slug]);
    assert.ok(parsed, `expected /costs/india/${slug} to parse`);
    assert.equal(parsed.specialty, undefined);
    assert.equal(parsed.procedure, treatment.name);
    assert.equal(
      prettyCatalogPath("/costs", parsed).toLowerCase(),
      `/costs/india/${slug}`,
    );

    const canonicalSpec = catalogSpecialtyName(treatment);
    const expectedCanonicalEn = absoluteUrl(
      costsFilterPath({
        destination: "India",
        specialty: canonicalSpec,
        procedure: treatment.name,
      }),
      "en",
    );
    const expectedCanonicalAr = absoluteUrl(
      costsFilterPath({
        destination: "India",
        specialty: canonicalSpec,
        procedure: treatment.name,
      }),
      "ar",
    );

    const enMeta = await costsDirectoryMetadata(parsed, "en");
    assert.equal(enMeta.alternates?.canonical, expectedCanonicalEn);
    assert.deepEqual(enMeta.alternates?.languages, {});
    assert.deepEqual(enMeta.openGraph?.alternateLocale, []);

    const arMeta = await costsDirectoryMetadata(parsed, "ar");
    assert.equal(arMeta.alternates?.canonical, expectedCanonicalAr);
    assert.deepEqual(arMeta.alternates?.languages, {});
    assert.deepEqual(arMeta.openGraph?.alternateLocale, []);
  }
});

test("omitted-specialty city cost URLs (/costs/india/<city>/<procedure>) emit no hreflang", async () => {
  const parsed = parsePrettyCatalogSegments(["india", "delhi-ncr", "chemotherapy"]);
  assert.ok(parsed);
  assert.equal(parsed.city, "Delhi NCR");
  assert.equal(parsed.specialty, undefined);
  assert.equal(parsed.procedure, "Chemotherapy");

  const enMeta = await costsDirectoryMetadata(parsed, "en");
  assert.equal(
    enMeta.alternates?.canonical,
    "https://gaf.healthcare/costs/india/delhi-ncr/medical-oncology/chemotherapy",
  );
  assert.deepEqual(enMeta.alternates?.languages, {});
  assert.deepEqual(enMeta.openGraph?.alternateLocale, []);

  const arMeta = await costsDirectoryMetadata(parsed, "ar");
  assert.deepEqual(arMeta.robots, { index: false, follow: true });
  assert.deepEqual(arMeta.alternates?.languages, {});
});

test("canonical specialty-qualified /costs/india/medical-oncology/chemotherapy retains reciprocal hreflang", async () => {
  const query = {
    destination: "India",
    specialty: "Medical Oncology",
    procedure: "Chemotherapy",
  };
  const enMeta = await costsDirectoryMetadata(query, "en");
  assert.equal(
    enMeta.alternates?.canonical,
    "https://gaf.healthcare/costs/india/medical-oncology/chemotherapy",
  );
  assert.equal(
    enMeta.alternates?.languages?.ar,
    "https://gaf.healthcare/ar/costs/india/medical-oncology/chemotherapy",
  );

  const arMeta = await costsDirectoryMetadata(query, "ar");
  assert.equal(
    arMeta.alternates?.canonical,
    "https://gaf.healthcare/ar/costs/india/medical-oncology/chemotherapy",
  );
  assert.equal(
    arMeta.alternates?.languages?.en,
    "https://gaf.healthcare/costs/india/medical-oncology/chemotherapy",
  );
});

test("no omitted-specialty /costs/india/<procedure> URL appears in EN or AR sitemaps", () => {
  for (const treatment of treatments) {
    const omittedEn = absoluteUrl(`/costs/india/${treatment.slug}`, "en");
    const omittedAr = absoluteUrl(`/costs/india/${treatment.slug}`, "ar");
    assert.equal(enSitemapUrls.has(omittedEn), false, `unexpected EN sitemap entry ${omittedEn}`);
    assert.equal(arSitemapUrls.has(omittedAr), false, `unexpected AR sitemap entry ${omittedAr}`);
  }
});
