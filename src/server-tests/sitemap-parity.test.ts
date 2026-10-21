import assert from "node:assert/strict";
import test from "node:test";
import { compareSitemaps, parseLastmod, parseSitemap } from "../../scripts/check/sitemap-parity.mjs";
import { buildLocaleSitemap, buildSitemapIndex, sitemapIndexXml, sitemapXml } from "@/lib/i18n/sitemap-entries";
import { localePathIsPublished } from "@/lib/i18n/locale-publication";
import { LOCALES, type AppLocale } from "@/lib/i18n/languages";

/**
 * Sitemap parity gate for hosting and framework changes. Everything here is
 * deterministic: `<lastmod>` values are checked for validity and the two
 * builds are compared element by element with the differ the SSR snapshot
 * uses, so a render-time timestamp can move without hiding a URL, canonical
 * form, namespace or element regression.
 */

const ORIGIN = "https://gaf.healthcare";
const LOCALE_PREFIXES = LOCALES.filter((locale) => locale !== "en").map((locale) => `${ORIGIN}/${locale}`);
const ARTICLE_LASTMOD_FLOOR = Date.parse("2020-01-01T00:00:00.000Z");

function build(locale: AppLocale) {
  return sitemapXml(buildLocaleSitemap(locale));
}

function locPath(loc: string) {
  return loc.slice(ORIGIN.length) || "/";
}

for (const locale of ["en", "ar"] as const) {
  test(`${locale}: two builds are structurally identical and differ only in render-time <lastmod>`, () => {
    const started = Date.now();
    const first = build(locale);
    const second = build(locale);
    const finished = Date.now();
    const result = compareSitemaps(first, second, { window: { from: started, to: finished }, now: finished });
    assert.deepEqual(result.problems, []);
    assert.ok(result.urls > (locale === "en" ? 5000 : 3000), `${locale} lists ${result.urls} URLs`);
    for (const row of result.drift) {
      const moved = parseLastmod(row.after);
      assert.ok(moved !== null && moved >= started - 1000 && moved <= finished + 1000, `${row.loc} lastmod ${row.after} is a render time`);
    }
  });

  test(`${locale}: every <loc> is a canonical, on-site, locale-scoped URL listed once`, () => {
    const parsed = parseSitemap(build(locale));
    assert.equal(parsed.kind, "urlset");
    assert.match(parsed.namespaces, /^xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/);
    assert.equal(parsed.trailing, "");

    const seen = new Set<string>();
    for (const item of parsed.items) {
      const { loc } = item;
      assert.ok(loc.startsWith(`${ORIGIN}/`) || loc === ORIGIN, `${loc} is on the verified origin`);
      assert.ok(!seen.has(loc), `${loc} is listed once`);
      seen.add(loc);
      assert.doesNotMatch(loc, /[?#\s]/, `${loc} has no query, fragment or whitespace`);
      assert.doesNotMatch(loc, /&(?!amp;)/, `${loc} escapes ampersands`);
      if (loc !== `${ORIGIN}/`) assert.doesNotMatch(loc, /\/$/, `${loc} has no trailing slash`);
      assert.doesNotMatch(loc, /\/\/(?!gaf)/, `${loc} has no empty path segment`);
      assert.doesNotMatch(loc, /[A-Z]/, `${loc} is lower-case`);
      assert.doesNotMatch(loc, /%[0-9A-Fa-f]{2}/, `${loc} is not percent-encoded`);

      if (locale === "en") {
        for (const prefix of LOCALE_PREFIXES) {
          assert.ok(loc !== prefix && !loc.startsWith(`${prefix}/`), `${loc} is not a localized URL in the English sitemap`);
        }
      } else {
        const prefix = `${ORIGIN}/${locale}`;
        assert.ok(loc === prefix || loc.startsWith(`${prefix}/`), `${loc} is under /${locale}`);
      }

      if (item.lastmod !== undefined) {
        const ms = parseLastmod(item.lastmod);
        assert.ok(ms !== null, `${loc} lastmod "${item.lastmod}" is a W3C datetime`);
        assert.ok(ms <= Date.now() + 60_000, `${loc} lastmod is not in the future`);
        assert.ok(ms >= ARTICLE_LASTMOD_FLOOR, `${loc} lastmod is not a placeholder date`);
      }
      assert.equal(item.other, "", `${loc} has only loc/lastmod/changefreq/priority/image children`);
      for (const src of item.images) assert.ok(src.startsWith(`${ORIGIN}/`), `${loc} image ${src} is on-site`);
    }
  });
}

test("ar: every listed URL passes the publication gate, and the XML is well formed", () => {
  const xml = build("ar");
  const parsed = parseSitemap(xml);
  assert.equal((xml.match(/<url>/g) ?? []).length, parsed.items.length);
  assert.equal((xml.match(/<\/url>/g) ?? []).length, parsed.items.length);
  assert.equal((xml.match(/<loc>/g) ?? []).length, parsed.items.length);
  assert.equal((xml.match(/<image:loc>/g) ?? []).length, parsed.items.reduce((n, i) => n + i.images.length, 0));
  assert.ok(parsed.items.some((item) => item.images.length > 0), "article images are listed");
  const unpublished = parsed.items
    .map((item) => locPath(item.loc))
    .filter((path) => !localePathIsPublished("ar", path.replace(/^\/ar(?=\/|$)/, "") || "/"));
  assert.deepEqual(unpublished.slice(0, 10), [], `${unpublished.length} Arabic URL(s) listed without being published`);
});

test("the sitemap index lists each locale file once with a valid lastmod", () => {
  const parsed = parseSitemap(sitemapIndexXml(buildSitemapIndex()));
  assert.equal(parsed.kind, "sitemapindex");
  const locs = parsed.items.map((item) => item.loc);
  assert.deepEqual(locs, [...new Set(locs)]);
  for (const item of parsed.items) {
    assert.ok(item.loc.startsWith(`${ORIGIN}/sitemap`), item.loc);
    assert.ok(item.lastmod === undefined || parseLastmod(item.lastmod) !== null, `${item.loc} lastmod`);
  }
});
