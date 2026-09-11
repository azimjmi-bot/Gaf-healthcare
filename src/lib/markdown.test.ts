import assert from "node:assert/strict";
import test from "node:test";
import { stripMarkdown } from "./markdown";

test("stripMarkdown removes emphasis and links for listings", () => {
  assert.equal(
    stripMarkdown("Dr. Anand is a **Radiation Oncologist** with *33 years* at [Fortis](https://example.com)."),
    "Dr. Anand is a Radiation Oncologist with 33 years at Fortis.",
  );
});

test("stripMarkdown leaves plain bios untouched", () => {
  assert.equal(stripMarkdown("A named consultant in Delhi NCR."), "A named consultant in Delhi NCR.");
});
