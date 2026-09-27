import assert from "node:assert/strict";
import test from "node:test";
import { listPublishedPosts } from "@/lib/blogs";
import { buildBlogSitemap, buildLocaleSitemap, sitemapXml } from "@/lib/i18n/sitemap-entries";

const NEW_SLUGS = [
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
  assert.equal(urls[1], "https://gaf.healthcare/blogs/breast-cancer-targeted-therapy-side-effects");
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
});
