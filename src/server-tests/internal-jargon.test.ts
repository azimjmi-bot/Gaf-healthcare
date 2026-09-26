import assert from "node:assert/strict";
import test from "node:test";
import { catalogMetadata } from "@/lib/seo";
import { UI_MESSAGE_FIELDS } from "@/lib/i18n/messages";
import { uiCatalogFor } from "@/lib/i18n/ui-catalogs";
import { LOCALES } from "@/lib/i18n/languages";
import { INDIA_CITIES, SPECIALTIES } from "@/lib/taxonomy";

/**
 * "pSEO" is how we talk about the page-generation work internally. It is not a
 * word a patient looking for a cancer surgeon has any use for, and it kept
 * ending up in copy: in an Arabic FAQ, in the hospitals directory lede, and --
 * found last -- in the English meta description of 14 live directory pages,
 * where it was the sentence Google showed under the title.
 *
 * Titles and descriptions are generated per facet, so spotting this by reading
 * the source is unreliable; the leak was only visible in rendered output. This
 * test walks the generators instead.
 */
const FORBIDDEN = /\bp-?SEO\b|\bprogrammatic SEO\b/i;

test("generated catalog titles and descriptions carry no internal jargon", () => {
  const offenders: string[] = [];
  const check = (label: string, text: string | undefined) => {
    if (text && FORBIDDEN.test(text)) offenders.push(`${label}: ${text}`);
  };

  for (const entity of ["doctors", "hospitals", "treatments"] as const) {
    for (const query of [
      { destination: "India" },
      ...INDIA_CITIES.map((city) => ({ destination: "India", city })),
      ...SPECIALTIES.map((s) => ({ destination: "India", specialty: s.name })),
      ...INDIA_CITIES.flatMap((city) =>
        SPECIALTIES.map((s) => ({ destination: "India", city, specialty: s.name })),
      ),
    ]) {
      const meta = catalogMetadata(entity, query);
      const label = `${entity} ${JSON.stringify(query)}`;
      check(`${label} title`, typeof meta.title === "string" ? meta.title : undefined);
      check(`${label} description`, meta.description ?? undefined);
    }
  }

  assert.deepEqual(offenders.slice(0, 5), [], "sample of the offenders");
  assert.equal(offenders.length, 0, `${offenders.length} generated strings mention pSEO`);
});

test("no locale's UI copy mentions pSEO", () => {
  const offenders: string[] = [];
  for (const locale of LOCALES) {
    const catalog = uiCatalogFor(locale);
    for (const [key, value] of Object.entries(catalog)) {
      if (typeof value === "string" && FORBIDDEN.test(value)) offenders.push(`${locale} ${key}`);
    }
  }
  for (const [key, value] of Object.entries(UI_MESSAGE_FIELDS)) {
    if (typeof value === "string" && FORBIDDEN.test(value)) offenders.push(`en ${key}`);
  }
  assert.deepEqual(offenders, []);
});
