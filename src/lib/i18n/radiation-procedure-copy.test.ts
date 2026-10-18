import assert from "node:assert/strict";
import test from "node:test";
import { LINAC_PROCEDURE_PAGES_AR } from "@/data/doctor-pages/radiation-procedures-linac-ar";
import { STEREO_PROCEDURE_PAGES_AR } from "@/data/doctor-pages/radiation-procedures-stereo-ar";
import { COMPLEX_PROCEDURE_PAGES_AR } from "@/data/doctor-pages/radiation-procedures-complex-ar";
import {
  applyRadiationProcedurePatch,
  PROCEDURE_FAQ_MIN,
  procedureCopyIssues,
  procedureCopyOverlap,
} from "@/lib/i18n/radiation-procedure-page";
import { proceduresForSpecialty, RADIATION_PROCEDURES } from "@/lib/taxonomy";

const pages = [...LINAC_PROCEDURE_PAGES_AR, ...STEREO_PROCEDURE_PAGES_AR, ...COMPLEX_PROCEDURE_PAGES_AR];

test("every radiation-oncology directory procedure has one baseline page", () => {
  const names = pages.map((page) => page.procedure);
  assert.deepEqual([...names].sort(), [...RADIATION_PROCEDURES].sort());
  const directoryNames = proceduresForSpecialty("Radiation Oncology").map((row) => row.name);
  assert.deepEqual([...directoryNames].sort(), [...names].sort());
  assert.equal(new Set(names).size, names.length);
});

test("each baseline has 18 distinct complete FAQs and stays procedure-specific", () => {
  for (const page of pages) {
    assert.equal(procedureCopyIssues(page).join("; "), "", page.procedure);
    assert.ok(page.faqs.length >= PROCEDURE_FAQ_MIN);
  }
  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const overlap = procedureCopyOverlap(pages[i], pages[j]);
      assert.ok(overlap < 0.55, `${pages[i].procedure} / ${pages[j].procedure} overlap ${overlap}`);
    }
  }
});

test("a published overlay with fewer than 18 FAQs fails the gate", () => {
  const imrt = pages.find((page) => page.procedure.startsWith("Intensity-Modulated"));
  assert.ok(imrt);
  const broken = applyRadiationProcedurePatch(imrt, {
    status: "published",
    faqs: imrt.faqs.slice(0, 17),
  });
  assert.ok(procedureCopyIssues(broken).some((issue) => issue.includes("faqs")));
});
