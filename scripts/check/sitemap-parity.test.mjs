import assert from "node:assert/strict";
import { test } from "node:test";
import { compareSitemaps, parseLastmod, parseSitemap } from "./sitemap-parity.mjs";

const NS = 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"';

function urlset(urls, ns = NS) {
  const body = urls
    .map(
      ({ loc, lastmod, changefreq = "weekly", priority = "0.5", images = [] }) =>
        `<url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}<changefreq>${changefreq}</changefreq><priority>${priority}</priority>${images
          .map((src) => `<image:image><image:loc>${src}</image:loc></image:image>`)
          .join("")}</url>`,
    )
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><urlset ${ns}>${body}</urlset>`;
}

const T0 = Date.parse("2026-10-20T12:00:00.000Z");
const T1 = Date.parse("2026-10-20T13:00:00.000Z");
const WINDOW = { window: { from: T0, to: T1 }, now: T1 };

const BASE = [
  { loc: "https://gaf.healthcare/", lastmod: "2026-10-20T12:00:01.000Z" },
  { loc: "https://gaf.healthcare/doctors", lastmod: "2026-10-20T12:00:01.000Z" },
  { loc: "https://gaf.healthcare/blogs/x", lastmod: "2026-03-01T00:00:00.000Z", images: ["https://gaf.healthcare/uploads/articles/x.webp"] },
  { loc: "https://gaf.healthcare/costs/india/a&amp;b", lastmod: "2026-05-01" },
];

test("parseSitemap reads every element of the generated shape", () => {
  const parsed = parseSitemap(urlset(BASE));
  assert.equal(parsed.kind, "urlset");
  assert.equal(parsed.namespaces, NS);
  assert.equal(parsed.items.length, 4);
  assert.deepEqual(parsed.items[2].images, ["https://gaf.healthcare/uploads/articles/x.webp"]);
  assert.equal(parsed.items[3].loc, "https://gaf.healthcare/costs/india/a&amp;b");
  assert.equal(parsed.items[3].lastmod, "2026-05-01");
  assert.equal(parsed.items[0].other, "", "no unknown children");
  const index = parseSitemap(
    '<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>https://gaf.healthcare/sitemap-en.xml</loc><lastmod>2026-10-20T12:00:00.000Z</lastmod></sitemap></sitemapindex>',
  );
  assert.equal(index.kind, "sitemapindex");
  assert.equal(index.items[0].loc, "https://gaf.healthcare/sitemap-en.xml");
  assert.throws(() => parseSitemap("<html></html>"), /not a sitemap/);
});

test("parseLastmod accepts W3C datetimes only", () => {
  assert.ok(parseLastmod("2026-05-01"));
  assert.ok(parseLastmod("2026-10-20T12:00:01.574Z"));
  assert.ok(parseLastmod("2026-10-20T12:00:01+05:30"));
  assert.equal(parseLastmod("yesterday"), null);
  assert.equal(parseLastmod("2026-13-45"), null);
  assert.equal(parseLastmod("Mon Oct 20 2026"), null);
});

test("identical documents have no problems and no drift", () => {
  const result = compareSitemaps(urlset(BASE), urlset(BASE), WINDOW);
  assert.deepEqual(result.problems, []);
  assert.deepEqual(result.drift, []);
  assert.equal(result.urls, 4);
});

test("a render-time lastmod moving inside the capture window is tolerated and reported as drift", () => {
  const after = BASE.map((row, i) => (i < 2 ? { ...row, lastmod: "2026-10-20T12:59:59.000Z" } : row));
  const result = compareSitemaps(urlset(BASE), urlset(after), WINDOW);
  assert.deepEqual(result.problems, []);
  assert.equal(result.drift.length, 2);
  assert.equal(result.drift[0].loc, "https://gaf.healthcare/");
});

test("a lastmod moving outside the capture window is a regression", () => {
  const after = BASE.map((row, i) => (i === 2 ? { ...row, lastmod: "2025-01-01T00:00:00.000Z" } : row));
  const result = compareSitemaps(urlset(BASE), urlset(after), WINDOW);
  assert.equal(result.problems.length, 1);
  assert.match(result.problems[0].after, /outside the capture window/);
  // Without a window the same change is only drift: raw file comparisons still work.
  assert.deepEqual(compareSitemaps(urlset(BASE), urlset(after), { now: T1 }).problems, []);
});

test("future and malformed lastmod values are regressions even inside the window", () => {
  const future = BASE.map((row, i) => (i === 0 ? { ...row, lastmod: "2026-10-20T14:00:00.000Z" } : row));
  assert.match(compareSitemaps(urlset(BASE), urlset(future), WINDOW).problems[0].after, /in the future/);
  const broken = BASE.map((row, i) => (i === 0 ? { ...row, lastmod: "soon" } : row));
  assert.match(compareSitemaps(urlset(BASE), urlset(broken), WINDOW).problems[0].after, /not a W3C datetime/);
});

test("a dropped or added lastmod is a regression", () => {
  const dropped = BASE.map((row, i) => (i === 1 ? { ...row, lastmod: undefined } : row));
  const result = compareSitemaps(urlset(BASE), urlset(dropped), WINDOW);
  assert.deepEqual(
    result.problems.map((p) => [p.field, p.after]),
    [["lastmod", "<absent>"]],
  );
});

test("URL set and order changes are regressions", () => {
  const missing = BASE.slice(0, 3);
  assert.deepEqual(
    compareSitemaps(urlset(BASE), urlset(missing), WINDOW).problems.map((p) => [p.field, p.loc, p.after]),
    [["url", "https://gaf.healthcare/costs/india/a&amp;b", "<absent>"]],
  );
  const added = [...BASE, { loc: "https://gaf.healthcare/new", lastmod: "2026-10-20T12:30:00.000Z" }];
  assert.deepEqual(
    compareSitemaps(urlset(BASE), urlset(added), WINDOW).problems.map((p) => [p.field, p.loc]),
    [["url", "https://gaf.healthcare/new"]],
  );
  const reordered = [BASE[1], BASE[0], BASE[2], BASE[3]];
  assert.deepEqual(
    compareSitemaps(urlset(BASE), urlset(reordered), WINDOW).problems.map((p) => p.field),
    ["order"],
  );
  const duplicated = [...BASE, BASE[0]];
  assert.deepEqual(
    compareSitemaps(urlset(BASE), urlset(duplicated), WINDOW).problems.map((p) => p.field),
    ["duplicate"],
  );
});

test("a changed canonical URL shows up as one URL removed and one added", () => {
  const renamed = BASE.map((row, i) => (i === 1 ? { ...row, loc: "https://gaf.healthcare/doctors/" } : row));
  const result = compareSitemaps(urlset(BASE), urlset(renamed), WINDOW);
  assert.deepEqual(
    result.problems.map((p) => [p.field, p.loc]).sort(),
    [
      ["url", "https://gaf.healthcare/doctors"],
      ["url", "https://gaf.healthcare/doctors/"],
    ],
  );
});

test("changefreq, priority, image and namespace changes are regressions", () => {
  const freq = BASE.map((row, i) => (i === 0 ? { ...row, changefreq: "daily" } : row));
  assert.deepEqual(compareSitemaps(urlset(BASE), urlset(freq), WINDOW).problems.map((p) => p.field), ["changefreq"]);
  const prio = BASE.map((row, i) => (i === 0 ? { ...row, priority: "1.0" } : row));
  assert.deepEqual(compareSitemaps(urlset(BASE), urlset(prio), WINDOW).problems.map((p) => p.field), ["priority"]);
  const image = BASE.map((row, i) => (i === 2 ? { ...row, images: [] } : row));
  assert.deepEqual(compareSitemaps(urlset(BASE), urlset(image), WINDOW).problems.map((p) => p.field), ["images"]);
  const ns = urlset(BASE, 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
  assert.deepEqual(compareSitemaps(urlset(BASE), ns, WINDOW).problems.map((p) => p.field), ["namespaces"]);
  const extra = urlset(BASE).replace("</url>", "<xhtml:link rel=\"alternate\"/></url>");
  assert.deepEqual(compareSitemaps(urlset(BASE), extra, WINDOW).problems.map((p) => p.field), ["other"]);
});
