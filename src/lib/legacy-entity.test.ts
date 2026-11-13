import assert from "node:assert/strict";
import test from "node:test";
import { resolveLegacyEntityPath } from "./legacy-entity";

test("known doctor, hospital and blog slugs redirect to their canonical plural URLs", () => {
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
});

test("unknown doctor, hospital and blog slugs are gone without a plural redirect", () => {
  assert.deepEqual(resolveLegacyEntityPath("/doctor/definitely-not-a-doctor-xyz"), {
    kind: "gone",
  });
  assert.deepEqual(resolveLegacyEntityPath("/hospital/definitely-not-a-hospital-xyz"), {
    kind: "gone",
  });
  assert.deepEqual(resolveLegacyEntityPath("/blog/definitely-not-a-published-post-xyz"), {
    kind: "gone",
  });
});

test("hubs, live plural routes and multi-segment leftovers are not entity decisions", () => {
  for (const path of [
    "/doctor",
    "/hospital",
    "/blog",
    "/doctors/dr-naresh-trehan",
    "/hospitals/fortis-gurgaon",
    "/blogs/breast-cancer-surgery-in-india",
    "/doctor/a/b",
    "/hospital/a/b",
    "/blog/2020/old",
    "/treatments/breast-cancer-treatment-in-india",
  ]) {
    assert.equal(resolveLegacyEntityPath(path), null, path);
  }
});
