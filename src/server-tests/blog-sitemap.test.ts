import assert from "node:assert/strict";
import test from "node:test";
import { listPublishedPosts } from "@/lib/blogs";
import { sitemapIndexDocument } from "@/lib/i18n/blog-sitemap";
import { buildBlogSitemap, buildLocaleSitemap, buildSitemapIndex, sitemapIndexXml, sitemapXml } from "@/lib/i18n/sitemap-entries";

const NEW_SLUGS = [
  "colon-cancer-targeted-therapy-in-india",
  "colon-cancer-immunotherapy-in-india",
  "colon-cancer-chemotherapy-in-india",
  "stage-4-colon-cancer-treatment-in-india",
  "stage-3-colon-cancer-treatment-in-india",
  "stage-2-colon-cancer-treatment-in-india",
  "stage-1-colon-cancer-treatment-in-india",
  "colon-cancer-surgery-in-india",
  "hormone-therapy-for-prostate-cancer",
  "psma-pet-scan-for-prostate-cancer",
  "lutetium-177-psma-therapy-in-india",
  "prostate-cancer-stages-1-to-4",
  "gleason-score-grade-group-prostate-cancer",
  "prostate-cancer-symptoms",
  "prostate-cancer-diagnosis-psa-mri-biopsy-psma-pet",
  "active-surveillance-prostate-cancer",
  "prostate-cancer-recurrence-after-surgery",
  "prostate-cancer-diet",
  "brachytherapy-for-prostate-cancer",
  "radiation-therapy-for-prostate-cancer",
  "robotic-prostatectomy-in-india",
  "prostate-cancer-treatment-without-surgery",
  "prostate-cancer-treatment-options-india",
  "ductal-carcinoma-in-situ-dcis-treatment-india",
  "breast-cancer-during-pregnancy-treatment-india",
  "invasive-lobular-carcinoma-treatment-india",
  "breast-cancer-in-young-women-treatment-india",
  "breast-cancer-recurrence-treatment-india",
  "breast-cancer-pathology-report-explained",
  "breast-cancer-lymphedema",
  "breast-cancer-neoadjuvant-therapy",
  "breast-cancer-follow-up-tests",
  "breast-cancer-radiation-side-effects",
  "breast-cancer-chemotherapy-side-effects",
  "breast-cancer-hormone-therapy-side-effects",
  "breast-cancer-targeted-therapy-side-effects",
  "lumpectomy-vs-mastectomy",
  "breast-cancer-surgery-in-india",
  "chemotherapy-for-breast-cancer-in-india",
  "radiation-therapy-for-breast-cancer",
  "breast-reconstruction-after-mastectomy-india",
  "hormone-therapy-breast-cancer-india",
  "her2-positive-breast-cancer-treatment-india",
  "breast-cancer-treatment-india-international-patients",
  "breast-cancer-diagnosis-tests-biopsy-er-pr-her2",
  "er-pr-her2-breast-cancer-treatment-india",
  "breast-cancer-stages-0-1-2-3-4",
  "breast-cancer-treatment-cost-in-india",
  "breast-cancer-treatment-by-stage",
];

test("the blog sitemap lists every published English article, newest first", () => {
  const posts = listPublishedPosts("en").filter((post) => post.allowIndex);
  const sitemap = buildBlogSitemap("en");
  const urls = sitemap.map((row) => row.url);

  assert.equal(urls[0], "https://gaf.healthcare/blogs");
  assert.equal(sitemap.length, posts.length + 1);
  for (const post of posts) {
    assert.ok(
      urls.includes(`https://gaf.healthcare/blogs/${post.slug}`),
      `missing from sitemap-blogs.xml: ${post.slug}`,
    );
  }
  for (const slug of NEW_SLUGS) {
    const row = sitemap.find((entry) => entry.url.endsWith(`/blogs/${slug}`));
    assert.ok(row, slug);
    assert.equal(row.changeFrequency, "weekly");
    assert.equal(row.priority, 0.7);
  }
  assert.equal(urls[1], "https://gaf.healthcare/blogs/colon-cancer-targeted-therapy-in-india");
  assert.equal(buildBlogSitemap("ar").length, 0);
});

test("the English language sitemap also carries the new articles", () => {
  const english = buildLocaleSitemap("en").map((row) => row.url);
  for (const slug of NEW_SLUGS) {
    assert.ok(english.includes(`https://gaf.healthcare/blogs/${slug}`), slug);
  }
  const xml = sitemapXml(buildBlogSitemap("en"));
  assert.match(xml, /<loc>https:\/\/gaf\.healthcare\/blogs\/lumpectomy-vs-mastectomy<\/loc>/);
  assert.match(xml, /<lastmod>2026-09-27T20:30:00.000Z<\/lastmod>/);
  assert.match(xml, /xmlns:image="http:\/\/www\.google\.com\/schemas\/sitemap-image\/1\.1"/);
  assert.match(
    xml,
    /<image:loc>https:\/\/gaf\.healthcare\/uploads\/articles\/dcis-consult-visual\.webp<\/image:loc>/,
  );
});

test("the root sitemap is an index of the language and blog sitemaps", () => {
  const files = buildSitemapIndex();
  const locs = files.map((row) => row.loc);
  assert.deepEqual(locs, [
    "https://gaf.healthcare/sitemap-en.xml",
    "https://gaf.healthcare/sitemap-ar.xml",
    "https://gaf.healthcare/sitemap-blogs.xml",
  ]);
  assert.equal(files[0].lastModified, "2026-09-28T21:30:00.000Z");
  assert.equal(files[2].lastModified, "2026-09-28T21:30:00.000Z");
  const xml = sitemapIndexXml(files);
  assert.match(xml, /<sitemapindex /);
  assert.match(xml, /<loc>https:\/\/gaf\.healthcare\/sitemap-blogs\.xml<\/loc>/);
});

test("the Yoast sitemap_index.xml alias is the same document as /sitemap.xml", () => {
  const xml = sitemapIndexDocument();
  assert.equal(xml, sitemapIndexXml(buildSitemapIndex()));
  assert.match(xml, /<lastmod>2026-09-28T21:30:00.000Z<\/lastmod>/);
  assert.match(xml, /<loc>https:\/\/gaf\.healthcare\/sitemap-blogs\.xml<\/loc>/);
  assert.doesNotMatch(xml, /sitemap_index\.xml/);
});

test("building the index does not pull unpublished locale catalogs", () => {
  const locs = buildSitemapIndex().map((row) => row.loc);
  assert.equal(locs.some((loc) => loc.includes("sitemap-fr.xml")), false);
  assert.equal(locs.some((loc) => loc.includes("sitemap-ru.xml")), false);
  assert.equal(locs.some((loc) => loc.includes("sitemap-sw.xml")), false);
});

test("every sitemap loc belongs to https://gaf.healthcare", () => {
  const documents = [
    sitemapIndexXml(buildSitemapIndex()),
    sitemapXml(buildBlogSitemap("en")),
    sitemapXml(buildLocaleSitemap("en")),
    sitemapXml(buildLocaleSitemap("ar")),
    sitemapXml(buildLocaleSitemap("fr")),
    sitemapXml(buildLocaleSitemap("ru")),
    sitemapXml(buildLocaleSitemap("sw")),
  ];
  const locTag = /<(?:image:)?loc>([^<]+)<\/(?:image:)?loc>/g;
  let counted = 0;
  for (const xml of documents) {
    for (const match of xml.matchAll(locTag)) {
      counted += 1;
      const loc = match[1].replaceAll("&amp;", "&");
      assert.match(loc, /^https:\/\/gaf\.healthcare(?:\/|$)/, loc);
      assert.equal(new URL(loc).hostname, "gaf.healthcare", loc);
    }
  }
  assert.ok(counted > 7000, `expected the English catalog, got ${counted} locs`);
  assert.equal(sitemapXml(buildBlogSitemap("en")).includes("unsplash.com"), false);
});
