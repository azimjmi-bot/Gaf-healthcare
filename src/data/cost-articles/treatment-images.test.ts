import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { getCostArticle } from "./index";
import { PEDIATRIC_HEMATOLOGY_PROCEDURES, toSlug } from "../../lib/taxonomy";
import { getTreatment } from "../../lib/treatments";
import {
  pediatricHematologyImage,
  withContextualTreatmentImages,
} from "../../lib/treatment-images";

test("every Pediatric Hematology procedure has a dedicated illustration", () => {
  for (const procedure of PEDIATRIC_HEMATOLOGY_PROCEDURES) {
    const expected = pediatricHematologyImage(procedure);
    assert.ok(existsSync(join(process.cwd(), "public", expected)), `${procedure}: missing image`);

    const treatment = getTreatment(toSlug(procedure));
    assert.ok(treatment, `${procedure}: missing treatment`);
    const article = getCostArticle(toSlug(procedure));

    if (article) {
      const contextual = withContextualTreatmentImages(article, {
        ...treatment!,
        specialtySlug: "pediatric-hematology",
      });
      assert.equal(contextual.figures?.[0]?.src, expected);
      assert.match(contextual.figures?.[0]?.alt ?? "", /pediatric hematology/i);
    } else {
      assert.equal(treatment!.image, expected);
    }
  }
});

test("adult article images remain unchanged outside Pediatric Hematology", () => {
  const article = getCostArticle("autologous-stem-cell-transplant");
  const treatment = getTreatment("autologous-stem-cell-transplant");
  assert.ok(article && treatment);
  assert.equal(
    withContextualTreatmentImages(article!, treatment!).figures?.[0]?.src,
    article!.figures?.[0]?.src,
  );
});
