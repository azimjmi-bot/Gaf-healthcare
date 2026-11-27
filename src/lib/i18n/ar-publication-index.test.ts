import assert from "node:assert/strict";
import test from "node:test";
import {
  arPathIsIndexedPublished,
  buildArPublicationIndexDocument,
  clearArPublicationIndex,
  hasArPublicationIndex,
  installArPublicationIndex,
} from "@/lib/i18n/ar-publication-index";
import { publishedLocalesForPath } from "@/lib/i18n/locale-publication";
import { ensureArPublicationIndexLoaded, groupsForRequest } from "@/worker/runtime";

test("installArPublicationIndex enables indexed lookups and clears cleanly", () => {
  clearArPublicationIndex();
  assert.equal(hasArPublicationIndex(), false);
  installArPublicationIndex(
    buildArPublicationIndexDocument(["/", "/treatments/pacemaker-implantation-in-india", "/doctors/India"]),
  );
  assert.equal(hasArPublicationIndex(), true);
  assert.equal(arPathIsIndexedPublished("/"), true);
  assert.equal(arPathIsIndexedPublished("/treatments/pacemaker-implantation-in-india"), true);
  assert.equal(arPathIsIndexedPublished("/doctors/India"), true);
  assert.equal(arPathIsIndexedPublished("/doctors/india"), true);
  assert.equal(arPathIsIndexedPublished("/treatments/missing"), false);
  clearArPublicationIndex();
  assert.equal(hasArPublicationIndex(), false);
});

test("arPathIsIndexedPublished matches Title-Case pretty catalog paths against lowercase packed index", () => {
  clearArPublicationIndex();
  installArPublicationIndex(
    buildArPublicationIndexDocument([
      "/costs/india/radiation-oncology",
      "/costs/india/medical-oncology/chemotherapy",
      "/doctors/india/delhi-ncr",
    ]),
  );
  assert.equal(arPathIsIndexedPublished("/costs/India/Radiation-Oncology"), true);
  assert.equal(arPathIsIndexedPublished("/costs/India/Medical-Oncology/Chemotherapy"), true);
  assert.equal(arPathIsIndexedPublished("/doctors/India/Delhi-NCR"), true);
  assert.deepEqual(
    publishedLocalesForPath("/costs/India/Radiation-Oncology"),
    ["en", "ar"],
    "Title-Case cost catalog paths must still resolve AR hreflang from lowercase index",
  );
  assert.deepEqual(
    publishedLocalesForPath("/costs/India/Medical-Oncology/Chemotherapy"),
    ["en", "ar"],
    "Title-Case procedure cost paths must still resolve AR hreflang from lowercase index",
  );
  clearArPublicationIndex();
});

test("canonicalFacetPath case normalization includes lowercase doctor and hospital sitemap paths", async () => {
  const { canonicalFacetPath } = await import("@/lib/i18n/facet-canonical");
  for (const lowercasePath of [
    "/doctors/india",
    "/doctors/india/delhi-ncr",
    "/doctors/india/radiation-oncology",
    "/doctors/india/delhi-ncr/radiation-oncology",
    "/hospitals/india",
    "/hospitals/india/delhi-ncr",
  ]) {
    assert.equal(
      canonicalFacetPath(lowercasePath, "ar").toLowerCase(),
      lowercasePath,
      `${lowercasePath} must remain self-canonical across case`,
    );
  }
});

test("publishedLocalesForPath uses the AR index when loaded and does not require live AR hydrate", () => {
  clearArPublicationIndex();
  installArPublicationIndex(buildArPublicationIndexDocument(["/treatments/pacemaker-implantation-in-india"]));
  const locales = publishedLocalesForPath("/treatments/pacemaker-implantation-in-india");
  assert.ok(locales.includes("en"));
  assert.ok(locales.includes("ar"));
  assert.equal(publishedLocalesForPath("/treatments/not-in-index").includes("ar"), false);
  clearArPublicationIndex();
});

test("groupsForRequest skips AR hydrate for English catalogue paths when the index is loaded", () => {
  clearArPublicationIndex();
  assert.deepEqual([...groupsForRequest("/doctors")], ["en", "ar"]);
  installArPublicationIndex(buildArPublicationIndexDocument(["/doctors"]));
  assert.deepEqual([...groupsForRequest("/doctors")], ["en"]);
  assert.deepEqual([...groupsForRequest("/treatments/x")], ["en"]);
  assert.deepEqual([...groupsForRequest("/ar/doctors")], ["en", "ar"], "Arabic routes still hydrate AR");
  assert.deepEqual([...groupsForRequest("/somalia/treatment-in-india")], ["en"]);
  clearArPublicationIndex();
});

test("publication: newly indexed AR path appears in hreflang; unpublication removes it", () => {
  clearArPublicationIndex();
  const path = "/treatments/pacemaker-implantation-in-india";
  installArPublicationIndex(buildArPublicationIndexDocument([path]));
  assert.ok(publishedLocalesForPath(path).includes("ar"), "published path is advertised");

  // Simulate unpublication / stale index refresh that drops the path (next deploy).
  installArPublicationIndex(buildArPublicationIndexDocument(["/doctors"]));
  assert.equal(publishedLocalesForPath(path).includes("ar"), false, "unpublished path is not advertised");
  assert.ok(publishedLocalesForPath("/doctors").includes("ar"));
  clearArPublicationIndex();
});

test("stale index cannot advertise paths that were never packed (unpublished)", () => {
  clearArPublicationIndex();
  installArPublicationIndex(buildArPublicationIndexDocument(["/doctors"]));
  assert.equal(
    publishedLocalesForPath("/treatments/never-published-ar-page").includes("ar"),
    false,
    "index membership is required; inventing AR hreflang is forbidden",
  );
  clearArPublicationIndex();
});

test("corrupt index install throws without leaving a loaded set", () => {
  clearArPublicationIndex();
  assert.throws(() => installArPublicationIndex("{not-json"), /Unexpected|JSON/i);
  assert.equal(hasArPublicationIndex(), false);

  assert.throws(
    () => installArPublicationIndex({ version: 2 as 1, generatedAt: "x", paths: ["/"] }),
    /unsupported document shape/,
  );
  assert.equal(hasArPublicationIndex(), false);

  assert.throws(
    () => installArPublicationIndex({ version: 1, generatedAt: "x", paths: [1 as unknown as string] }),
    /paths must be strings/,
  );
  assert.equal(hasArPublicationIndex(), false);
});

test("ensureArPublicationIndexLoaded: missing asset keeps full hydrate path", async () => {
  clearArPublicationIndex();
  const logs: string[] = [];
  const assets = {
    async fetch() {
      return new Response("missing", { status: 404 });
    },
  };
  await ensureArPublicationIndexLoaded(assets, (m) => logs.push(m));
  assert.equal(hasArPublicationIndex(), false);
  assert.deepEqual([...groupsForRequest("/doctors")], ["en", "ar"]);
  assert.match(logs.join("\n"), /missing/);
  clearArPublicationIndex();
});

test("ensureArPublicationIndexLoaded: corrupt asset falls back without omitting hydrate", async () => {
  clearArPublicationIndex();
  const logs: string[] = [];
  const assets = {
    async fetch() {
      return new Response('{"version":1,"paths":"not-an-array"}', { status: 200 });
    },
  };
  await ensureArPublicationIndexLoaded(assets, (m) => logs.push(m));
  assert.equal(hasArPublicationIndex(), false, "corrupt index must not install");
  assert.deepEqual([...groupsForRequest("/hospitals")], ["en", "ar"], "fallback is full AR hydrate");
  assert.match(logs.join("\n"), /load failed/);
  clearArPublicationIndex();
});

test("ensureArPublicationIndexLoaded: valid asset enables EN catalogue skip", async () => {
  clearArPublicationIndex();
  const body = JSON.stringify(buildArPublicationIndexDocument(["/costs", "/hospitals"]));
  const assets = {
    async fetch() {
      return new Response(body, { status: 200 });
    },
  };
  await ensureArPublicationIndexLoaded(assets);
  assert.equal(hasArPublicationIndex(), true);
  assert.deepEqual([...groupsForRequest("/costs")], ["en"]);
  assert.deepEqual([...groupsForRequest("/ar/costs")], ["en", "ar"]);
  clearArPublicationIndex();
});
