import assert from "node:assert/strict";
import test from "node:test";
import {
  blogDirectoryFacets,
  blogSpecialtySlug,
  filterPublishedPosts,
  getPost,
  listPublishedPosts,
} from "@/lib/blogs";

test("blog directory facets expose more than one specialty and subspecialty", () => {
  const { specialtySlugs, subspecialties } = blogDirectoryFacets("en");
  assert.ok(specialtySlugs.includes("surgical-oncology"));
  assert.ok(specialtySlugs.includes("medical-oncology"));
  assert.ok(specialtySlugs.includes("orthopedics"));
  assert.ok(subspecialties.includes("Breast Cancer"));
  assert.ok(subspecialties.includes("Prostate Cancer"));
  assert.ok(subspecialties.includes("Colon Cancer"));
  assert.ok(subspecialties.includes("Knee Replacement"));
});

test("blog specialty mapping follows article category and radiation aliases", () => {
  const knee = getPost("knee-replacement-surgery-in-india", "en");
  const colon = getPost("colon-cancer-surgery-in-india", "en");
  assert.ok(knee);
  assert.ok(colon);
  assert.equal(blogSpecialtySlug(knee), "orthopedics");
  assert.equal(blogSpecialtySlug(colon), "surgical-oncology");
});

test("blog directory search and specialty filters narrow the published list", () => {
  const all = listPublishedPosts("en");
  const kneeSearch = filterPublishedPosts("en", { q: "knee replacement" });
  assert.ok(kneeSearch.some((post) => post.slug === "knee-replacement-surgery-in-india"));
  assert.ok(kneeSearch.length < all.length);

  const ortho = filterPublishedPosts("en", { specialty: "orthopedics" });
  assert.ok(ortho.every((post) => blogSpecialtySlug(post) === "orthopedics"));
  assert.ok(ortho.some((post) => post.slug === "knee-replacement-surgery-in-india"));

  const breast = filterPublishedPosts("en", { subspecialty: "Breast Cancer" });
  assert.ok(breast.some((post) => post.slug === "lumpectomy-vs-mastectomy"));
  assert.ok(breast.every((post) => /breast|dcis|lumpectomy|mastectomy/i.test(`${post.title} ${post.tags.join(" ")}`)));

  const medicalBreast = filterPublishedPosts("en", {
    specialty: "medical-oncology",
    subspecialty: "Breast Cancer",
  });
  assert.ok(medicalBreast.length > 0);
  assert.ok(medicalBreast.every((post) => blogSpecialtySlug(post) === "medical-oncology"));
  assert.ok(!medicalBreast.some((post) => post.slug === "knee-replacement-surgery-in-india"));
});

test("legacy blog category query still filters the listing", () => {
  const byName = filterPublishedPosts("en", { category: "Surgical Oncology" });
  assert.ok(byName.length > 0);
  assert.ok(byName.every((post) => blogSpecialtySlug(post) === "surgical-oncology" || post.category === "Surgical Oncology"));
});
