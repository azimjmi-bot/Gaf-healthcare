import assert from "node:assert/strict";
import test from "node:test";
import { robotsPolicy, robotsTxtBody } from "@/lib/robots-policy";
import { resolveLegacyEntityPath } from "@/lib/legacy-entity";
import { isLegacyGonePath, isLegacyWordpressQuery } from "@/lib/legacy-urls";
import {
  buildBlogSitemap,
  buildLocaleSitemap,
  buildSitemapIndex,
} from "@/lib/i18n/sitemap-entries";

test("robots.txt advertises working sitemap index URLs and stays in lockstep with the static file", async () => {
  const policy = robotsPolicy();
  const sitemaps = [policy.sitemap ?? []].flat();
  assert.ok(sitemaps.includes("https://gaf.healthcare/sitemap.xml"));
  assert.ok(sitemaps.includes("https://gaf.healthcare/sitemap_index.xml"));
  assert.equal(sitemaps.includes("https://gaf.healthcare/sitemap-index.xml"), false);

  const body = robotsTxtBody(policy);
  assert.match(body, /^Host: gaf\.healthcare$/m);
  assert.doesNotMatch(body, /sitemap-index\.xml/);

  for (const url of sitemaps) {
    const response = await fetch(url, { method: "HEAD", redirect: "manual" });
    assert.equal(response.status, 200, url);
  }
});

test("English blog article URLs appear once across locale and blog sitemaps", () => {
  const en = new Set(buildLocaleSitemap("en").map((row) => row.url));
  const blogs = new Set(buildBlogSitemap("en").map((row) => row.url));
  const articleUrls = [...blogs].filter((url) => /\/blogs\/[^/]+$/.test(url));
  assert.ok(articleUrls.length > 50);
  for (const url of articleUrls) {
    assert.equal(en.has(url), false, `duplicated: ${url}`);
  }
  assert.ok(en.has("https://gaf.healthcare/blogs"));
  assert.ok(blogs.has("https://gaf.healthcare/blogs"));
  assert.ok(buildSitemapIndex().some((row) => row.loc.endsWith("/sitemap-blogs.xml")));
});

test("legacy WordPress queries and multi-segment singular paths are gone", () => {
  assert.equal(isLegacyWordpressQuery(new URLSearchParams("p=99")), true);
  assert.equal(isLegacyWordpressQuery(new URLSearchParams("page_id=12&utm=1")), true);
  assert.equal(isLegacyGonePath("/doctor/extra/nested"), true);
  assert.equal(isLegacyGonePath("/hospital/extra/nested"), true);
  assert.equal(isLegacyGonePath("/blog/2020/old"), true);
  assert.equal(isLegacyGonePath("/doctor/dr-naresh-trehan"), false);
  assert.equal(isLegacyGonePath("/doctors/dr-naresh-trehan"), false);
});

test("known singular entity slugs 301; unknown slugs are gone without a hub bounce", () => {
  assert.deepEqual(resolveLegacyEntityPath("/doctor/dr-naresh-trehan"), {
    kind: "redirect",
    destination: "/doctors/dr-naresh-trehan",
  });
  assert.deepEqual(resolveLegacyEntityPath("/hospital/fortis-gurgaon"), {
    kind: "redirect",
    destination: "/hospitals/fortis-gurgaon",
  });
  assert.deepEqual(resolveLegacyEntityPath("/blog/breast-cancer-surgery-in-india"), {
    kind: "redirect",
    destination: "/blogs/breast-cancer-surgery-in-india",
  });
  assert.equal(resolveLegacyEntityPath("/doctor/no-such-doctor-slug").kind, "gone");
  assert.equal(resolveLegacyEntityPath("/hospital/no-such-hospital-slug").kind, "gone");
  assert.equal(resolveLegacyEntityPath("/blog/no-such-blog-slug").kind, "gone");
  assert.equal(resolveLegacyEntityPath("/doctor"), null);
  assert.equal(resolveLegacyEntityPath("/doctors/dr-naresh-trehan"), null);
});
