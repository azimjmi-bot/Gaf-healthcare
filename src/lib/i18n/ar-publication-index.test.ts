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
import { groupsForRequest } from "@/worker/runtime";

test("installArPublicationIndex enables indexed lookups and clears cleanly", () => {
  clearArPublicationIndex();
  assert.equal(hasArPublicationIndex(), false);
  installArPublicationIndex(
    buildArPublicationIndexDocument(["/", "/treatments/pacemaker-implantation-in-india", "/doctors/India"]),
  );
  assert.equal(hasArPublicationIndex(), true);
  assert.equal(arPathIsIndexedPublished("/"), true);
  assert.equal(arPathIsIndexedPublished("/treatments/pacemaker-implantation-in-india"), true);
  assert.equal(arPathIsIndexedPublished("/treatments/missing"), false);
  clearArPublicationIndex();
  assert.equal(hasArPublicationIndex(), false);
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
