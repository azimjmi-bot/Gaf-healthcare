import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { ARABIC_PLACE_LABELS } from "@/lib/i18n/place-labels";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";

const cms = JSON.parse(readFileSync(join(process.cwd(), "content/ar/catalog-cms.json"), "utf8")) as {
  doctorOverrides: Record<string, Record<string, unknown>>;
  hospitalOverrides?: Record<string, Record<string, unknown>>;
};

function textsOf(patch: Record<string, unknown>): string[] {
  const out: string[] = [];
  for (const value of Object.values(patch)) {
    if (typeof value === "string") out.push(value);
    else if (Array.isArray(value)) {
      for (const item of value) if (typeof item === "string") out.push(item);
    }
  }
  return out;
}

test("Arabic overlays do not concatenate or comma-repeat known city labels", () => {
  const labels = [...ARABIC_PLACE_LABELS].sort((a, b) => b.length - a.length);
  for (const [slug, patch] of Object.entries(cms.doctorOverrides)) {
    for (const text of textsOf(patch)) {
      for (const place of labels) {
        assert.equal(
          text.includes(`${place}${place}`),
          false,
          `${slug} concatenates ${place}`,
        );
        assert.equal(
          text.includes(`${place}، ${place}`),
          false,
          `${slug} comma-repeats ${place}`,
        );
      }
    }
  }
});

test("taxonomy city labels stay the single Arabic spelling", () => {
  assert.equal(taxonomyLabel("Bengaluru", "ar"), "بنغالور");
  assert.equal(taxonomyLabel("Chennai", "ar"), "تشيناي");
  assert.equal(taxonomyLabel("Hyderabad", "ar"), "حيدر آباد");
  assert.equal(taxonomyLabel("Mumbai", "ar"), "مومباي");
  assert.equal(taxonomyLabel("Delhi NCR", "ar"), "دلهي إن سي آر");
  assert.equal(taxonomyLabel("Radiation Oncology", "ar"), "علاج الأورام بالإشعاع");
  assert.equal(taxonomyLabel("Medical Oncology", "ar"), "طب الأورام");
});
