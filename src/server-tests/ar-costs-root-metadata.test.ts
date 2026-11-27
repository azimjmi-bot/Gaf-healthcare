import assert from "node:assert/strict";
import test from "node:test";
import { costsDirectoryMetadata } from "@/app/costs/metadata";
import { catalogPageMetadata } from "@/lib/i18n/page-meta";

const ARABIC_SCRIPT = /[\u0600-\u06FF]/;

test("/ar/costs emits translated Arabic title and meta description while preserving canonical and hreflang", async () => {
  const meta = await costsDirectoryMetadata({}, "ar");
  const title = typeof meta.title === "string" ? meta.title : "";
  const description = meta.description ?? "";

  assert.ok(ARABIC_SCRIPT.test(title), `expected Arabic title, got: ${title}`);
  assert.ok(ARABIC_SCRIPT.test(description), `expected Arabic description, got: ${description}`);
  assert.doesNotMatch(title, /Oncology, ENT and GI/);
  assert.doesNotMatch(description, /US cash-pay beside India partner ranges/);

  assert.equal(meta.alternates?.canonical, "https://gaf.healthcare/ar/costs");
  assert.deepEqual(meta.alternates?.languages, {
    "x-default": "https://gaf.healthcare/costs",
    en: "https://gaf.healthcare/costs",
    ar: "https://gaf.healthcare/ar/costs",
  });

  const ogTitle = typeof meta.openGraph?.title === "string" ? meta.openGraph.title : "";
  const ogDescription = meta.openGraph?.description ?? "";
  assert.ok(ARABIC_SCRIPT.test(ogTitle), `expected Arabic og:title, got: ${ogTitle}`);
  assert.ok(ARABIC_SCRIPT.test(ogDescription), `expected Arabic og:description, got: ${ogDescription}`);
  assert.equal(meta.openGraph?.url, "https://gaf.healthcare/ar/costs");
});

test("English /costs and other cost-page metadata remain unchanged", async () => {
  const enRoot = await costsDirectoryMetadata({}, "en");
  assert.equal(enRoot.title, "Oncology, ENT and GI treatment cost in India");
  assert.equal(enRoot.alternates?.canonical, "https://gaf.healthcare/costs");
  assert.deepEqual(enRoot.alternates?.languages, {
    "x-default": "https://gaf.healthcare/costs",
    en: "https://gaf.healthcare/costs",
    ar: "https://gaf.healthcare/ar/costs",
  });

  const arIndia = await costsDirectoryMetadata({ destination: "India" }, "ar");
  const expectedArIndia = await catalogPageMetadata("treatments", { destination: "India" }, "ar");
  assert.deepEqual(arIndia, expectedArIndia);
});
