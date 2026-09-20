import test from "node:test";
import assert from "node:assert/strict";
import { LOCALES, SOURCE_LOCALE, type AppLocale } from "@/lib/i18n/languages";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { publishedLocalesForPath } from "@/lib/i18n/locale-publication";
import { ENGLISH_ALTERNATES_BASELINE } from "@/server-tests/english-alternates-fixture";

/**
 * English pages are already ranking, so their canonical and hreflang block is
 * the one output no Arabic change is allowed to move. `publishedLocalesForPath`
 * feeds the hreflang of every English page, which means editing Arabic
 * publication rules silently rewrites the alternates on all 7,000-odd English
 * URLs. These expectations are the pin taken before that logic is touched.
 *
 * When a later phase intentionally changes which Arabic pages are published,
 * the first and third tests here are expected to fail. Update the fixture and
 * say so in the commit. The remaining tests assert English guarantees that must
 * hold no matter what Arabic does, so they should never need editing.
 */

const EN = "https://gaf.healthcare";

function alternatesFor(path: string) {
  const meta = withLocaleMetadata({}, path, SOURCE_LOCALE, LOCALES);
  return meta.alternates as { canonical: string; languages: Record<string, string> };
}

/**
 * Metadata carries the trailing slash for the home page; Next strips it against
 * metadataBase when it renders the tag. scripts/check-english-alternates.mjs
 * asserts the served form.
 */
function expectedUrl(path: string, locale: AppLocale) {
  if (locale === SOURCE_LOCALE) return `${EN}${path}`;
  return path === "/" ? `${EN}/${locale}` : `${EN}/${locale}${path}`;
}

test("publishedLocalesForPath returns the recorded set for every page type", () => {
  for (const row of ENGLISH_ALTERNATES_BASELINE) {
    assert.deepEqual(
      publishedLocalesForPath(row.path),
      row.published,
      `${row.label} (${row.path})`,
    );
  }
});

test("English pages canonicalise to their own unprefixed URL", () => {
  for (const row of ENGLISH_ALTERNATES_BASELINE) {
    assert.equal(
      alternatesFor(row.path).canonical,
      expectedUrl(row.path, SOURCE_LOCALE),
      `${row.label} (${row.path})`,
    );
  }
});

test("English hreflang lists exactly the published locales, keyed to the right prefix", () => {
  for (const row of ENGLISH_ALTERNATES_BASELINE) {
    const expected: Record<string, string> = {};
    if (row.published.includes(SOURCE_LOCALE)) {
      expected["x-default"] = expectedUrl(row.path, SOURCE_LOCALE);
    }
    for (const locale of row.published) {
      expected[locale] = expectedUrl(row.path, locale);
    }
    assert.deepEqual(
      alternatesFor(row.path).languages,
      expected,
      `${row.label} (${row.path})`,
    );
  }
});

test("x-default points at English wherever any alternate is emitted", () => {
  for (const row of ENGLISH_ALTERNATES_BASELINE) {
    const { languages } = alternatesFor(row.path);
    if (Object.keys(languages).length === 0) continue;
    assert.equal(languages["x-default"], languages.en, `${row.label} (${row.path})`);
  }
});

test("no English URL is ever emitted with a locale prefix", () => {
  const prefixed = /^https:\/\/gaf\.healthcare\/(ru|fr|ar|sw)(\/|$)/;
  for (const row of ENGLISH_ALTERNATES_BASELINE) {
    const { canonical, languages } = alternatesFor(row.path);
    assert.ok(!prefixed.test(canonical), `${row.label} canonical leaked a locale prefix`);
    if (languages.en) {
      assert.ok(!prefixed.test(languages.en), `${row.label} en alternate leaked a locale prefix`);
    }
  }
});

/**
 * The fixture is a hand-picked sample. This sweep re-checks the English
 * invariants across every page type the sitemap actually emits, so a regression
 * in a shape nobody listed still fails.
 */
test("every English sitemap URL self-canonicalises and keeps en plus x-default", () => {
  const sitemap = buildLocaleSitemap(SOURCE_LOCALE);
  assert.ok(sitemap.length > 7000, `expected the full English sitemap, got ${sitemap.length}`);

  // publishedLocalesForPath filters the whole catalog once per target locale, so
  // walk a deterministic spread rather than all 7,000-plus URLs.
  const stride = 37;
  let checked = 0;
  for (let i = 0; i < sitemap.length; i += stride) {
    const path = decodeURIComponent(new URL(sitemap[i].url).pathname);
    const { canonical, languages } = alternatesFor(path);
    assert.equal(canonical, expectedUrl(path, SOURCE_LOCALE), `canonical for ${path}`);
    assert.equal(languages.en, expectedUrl(path, SOURCE_LOCALE), `en alternate for ${path}`);
    assert.equal(languages["x-default"], languages.en, `x-default for ${path}`);
    checked += 1;
  }
  assert.ok(checked > 180, `expected a broad sweep, only checked ${checked}`);
});
