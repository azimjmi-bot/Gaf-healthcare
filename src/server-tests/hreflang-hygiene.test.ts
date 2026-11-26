import assert from "node:assert/strict";
import { test } from "node:test";
import { getPost } from "@/lib/blogs";
import { LOCALES } from "@/lib/i18n/languages";
import { withLightLocaleMetadata } from "@/lib/i18n/locale-metadata-light";
import { localePageState, publishedLocalesForPath } from "@/lib/i18n/locale-publication";
import { isNoindexRobots, withLocaleMetadata, withoutHreflang } from "@/lib/i18n/metadata";
import { blogPageMetadata, costPageMetadata } from "@/lib/i18n/page-meta";

test("withLocaleMetadata and withLightLocaleMetadata strip hreflang on noindex pages", () => {
  const fullObj = withLocaleMetadata(
    { title: "Noindex page", robots: { index: false, follow: true } },
    "/costs/India/Mumbai/Radiation-Oncology",
    "en",
    LOCALES,
  );
  assert.deepEqual(fullObj.alternates?.languages, {});
  assert.deepEqual(fullObj.openGraph?.alternateLocale, []);
  assert.equal(isNoindexRobots(fullObj.robots), true);

  const fullStr = withLocaleMetadata(
    { title: "Noindex string", robots: "noindex, follow" },
    "/",
    "en",
    LOCALES,
  );
  assert.deepEqual(fullStr.alternates?.languages, {});
  assert.deepEqual(fullStr.openGraph?.alternateLocale, []);

  const light = withLightLocaleMetadata(
    { title: "Costs noindex", robots: { index: false, follow: true } },
    "/costs",
    "en",
    LOCALES,
  );
  assert.ok(light);
  assert.deepEqual(light.alternates?.languages, {});
  assert.deepEqual(light.openGraph?.alternateLocale, []);
});

test("non-canonical pages (explicit canonical mismatch and flat cost alias) emit no hreflang", async () => {
  const mismatched = withLocaleMetadata(
    {
      title: "City alias",
      alternates: { canonical: "https://gaf.healthcare/costs/india/surgical-oncology/mastectomy" },
    },
    "/costs/India/Mumbai/Surgical-Oncology/Mastectomy",
    "en",
    LOCALES,
  );
  assert.equal(
    mismatched.alternates?.canonical,
    "https://gaf.healthcare/costs/india/surgical-oncology/mastectomy",
  );
  assert.deepEqual(mismatched.alternates?.languages, {});
  assert.deepEqual(mismatched.openGraph?.alternateLocale, []);

  const aliasMeta = await costPageMetadata("external-beam-radiotherapy-ebrt", "en");
  assert.equal(
    aliasMeta.alternates?.canonical,
    "https://gaf.healthcare/costs/india/radiation-oncology/external-beam-radiotherapy-ebrt",
  );
  assert.deepEqual(aliasMeta.alternates?.languages, {});
  assert.deepEqual(aliasMeta.openGraph?.alternateLocale, []);
});

test("blog with EN allowIndex=false and AR allowIndex=true drops EN from hreflang on both sides", async () => {
  const slug = "breast-cancer-follow-up-tests";
  const enPost = getPost(slug, "en");
  const arPost = getPost(slug, "ar");
  assert.ok(enPost && arPost);
  assert.equal(enPost.allowIndex, false);
  assert.equal(arPost.allowIndex, true);

  assert.equal(localePageState("en", `/blogs/${slug}`), "noindex");
  assert.equal(localePageState("ar", `/blogs/${slug}`), "published");
  assert.deepEqual(publishedLocalesForPath(`/blogs/${slug}`), ["ar"]);

  const enMeta = await blogPageMetadata(enPost, "en");
  assert.equal(isNoindexRobots(enMeta.robots), true);
  assert.deepEqual(enMeta.alternates?.languages, {});
  assert.deepEqual(enMeta.openGraph?.alternateLocale, []);

  const arMeta = await blogPageMetadata(arPost, "ar");
  assert.equal(isNoindexRobots(arMeta.robots), false);
  assert.deepEqual(arMeta.alternates?.languages, {
    ar: `https://gaf.healthcare/ar/blogs/${slug}`,
  });
  assert.deepEqual(arMeta.openGraph?.alternateLocale, []);
});

test("EN-noindex city+specialty cost pages emit no hreflang and are excluded from AR hreflang", () => {
  const noindexEnPath = "/costs/India/Mumbai/Radiation-Oncology";
  assert.ok(!publishedLocalesForPath(noindexEnPath).includes("en"));
  const enNoindexMeta = withLocaleMetadata(
    { robots: { index: false, follow: true } },
    noindexEnPath,
    "en",
    LOCALES,
  );
  assert.deepEqual(enNoindexMeta.alternates?.languages, {});

  const indexablePath = "/costs/India/Delhi-NCR/Radiation-Oncology";
  assert.ok(publishedLocalesForPath(indexablePath).includes("en"));
  assert.ok(publishedLocalesForPath(indexablePath).includes("ar"));
});

test("withoutHreflang clears alternates.languages and openGraph.alternateLocale cleanly", () => {
  const indexable = withLocaleMetadata({ title: "Doctors" }, "/doctors/India/Delhi-NCR", "en", LOCALES);
  assert.ok(Object.keys(indexable.alternates?.languages ?? {}).length > 0);
  const stripped = withoutHreflang({ ...indexable, robots: { index: false, follow: true } });
  assert.deepEqual(stripped.alternates?.languages, {});
  assert.deepEqual(stripped.openGraph?.alternateLocale, []);
  assert.equal(stripped.alternates?.canonical, indexable.alternates?.canonical);
});
