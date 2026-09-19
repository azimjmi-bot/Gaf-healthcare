import type { CuratedTreatmentTranslation } from "@/lib/cms/curated-treatment-types";
import type { AppLocale } from "@/lib/i18n/languages";
import { treatmentUi } from "@/lib/i18n/treatment-ui";

export const LEGACY_TREATMENT_EDITORIAL_FIELDS = [
  "fullDescription",
  "overview",
  "whatIsIt",
  "conditionsTreated",
  "whyPerformed",
  "whoMayNeed",
  "howItWorks",
  "preparation",
  "procedureDetails",
  "recovery",
  "risks",
  "followUp",
  "importantConsiderations",
] as const satisfies readonly (keyof CuratedTreatmentTranslation)[];

export function treatmentEditorialBody(
  translation: CuratedTreatmentTranslation,
  locale: AppLocale,
) {
  if (translation.editorialBody.trim()) return translation.editorialBody;

  const ui = treatmentUi(locale);
  const legacySections: Array<[string | undefined, string]> = [
    [undefined, translation.fullDescription],
    [ui.overview, translation.overview],
    [ui.whatIsIt, translation.whatIsIt],
    [ui.conditionsTreated, translation.conditionsTreated],
    [ui.whyPerformed, translation.whyPerformed],
    [ui.whoMayNeed, translation.whoMayNeed],
    [ui.howItWorks, translation.howItWorks],
    [ui.preparation, translation.preparation],
    [ui.procedureDetails, translation.procedureDetails],
    [ui.recovery, translation.recovery],
    [ui.risks, translation.risks],
    [ui.followUp, translation.followUp],
    [ui.considerations, translation.importantConsiderations],
  ];

  return legacySections
    .filter(([, source]) => source.trim())
    .map(([heading, source]) =>
      heading ? `## ${heading}\n\n${source.trim()}` : source.trim(),
    )
    .join("\n\n");
}

function normalizedHeading(value: string) {
  return value
    .replace(/[*_`]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .toLocaleLowerCase();
}

export function treatmentEditorialBodyForDisplay(
  translation: CuratedTreatmentTranslation,
  locale: AppLocale,
) {
  const body = treatmentEditorialBody(translation, locale).trim();
  const leadingHeading = body.match(/^#{1,2}\s+([^\n]+)\n+/);
  if (
    leadingHeading &&
    normalizedHeading(leadingHeading[1]) === normalizedHeading(translation.name)
  ) {
    return body.slice(leadingHeading[0].length).trim();
  }
  return body;
}
