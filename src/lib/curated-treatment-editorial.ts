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

export type TreatmentQuickAnswerItem = {
  question: string;
  answer: string;
};

export type TreatmentQuickAnswer = {
  heading: string;
  items: TreatmentQuickAnswerItem[];
};

export function splitTreatmentQuickAnswer(body: string): {
  before: string;
  quickAnswer: TreatmentQuickAnswer | null;
  after: string;
} {
  const match = body.match(
    /(^|\n)##\s+(Quick Answer[^\n]*)\n+([\s\S]*?)(?=\n##\s+)/,
  );
  if (!match || match.index === undefined) {
    return { before: body, quickAnswer: null, after: "" };
  }
  const heading = match[2].trim();
  const section = match[3].trim();
  const items: TreatmentQuickAnswerItem[] = [];
  const itemRe = /\*\*([^*]+)\*\*\s*\n+([\s\S]*?)(?=\n\*\*|$)/g;
  for (const itemMatch of section.matchAll(itemRe)) {
    items.push({
      question: itemMatch[1].trim(),
      answer: itemMatch[2].trim(),
    });
  }
  if (items.length === 0) {
    return { before: body, quickAnswer: null, after: "" };
  }
  const before = body.slice(0, match.index).trim();
  const after = body.slice(match.index + match[0].length).trim();
  return { before, quickAnswer: { heading, items }, after };
}

export function treatmentBodyLocation(...parts: Array<string | undefined>) {
  const text = parts.filter(Boolean).join(" ");
  if (
    /leukemia|leukaemia|thalassemia|thalassaemia|sickle cell|sickle-cell|myeloma|aplastic|fanconi|pancytopenia|bone marrow|hematopoietic|\bhsct\b|\bbmt\b/i.test(
      text,
    )
  ) {
    return "Bone Marrow";
  }
  if (/lymphoma|hodgkin|lymphatic|lymph node/i.test(text)) {
    return "Lymphatic System";
  }
  if (/breast/i.test(text)) return "Breast";
  if (/prostate/i.test(text)) return "Prostate";
  if (/colon|colorectal/i.test(text)) return "Colon";
  if (/pancreas|pancreatic|whipple/i.test(text)) return "Pancreas";
  if (/hipec|periton/i.test(text)) return "Peritoneum";
  if (/cervix|cervical/i.test(text)) return "Cervix";
  if (/ovary|ovarian/i.test(text)) return "Ovary";
  if (/acl|anterior cruciate/i.test(text)) return "Knee";
  if (/knee/i.test(text)) return "Knee";
  if (/hip/i.test(text)) return "Hip";
  if (/shoulder|rotator cuff/i.test(text)) return "Shoulder";
  if (/blepharoplasty|eyelid|oculoplastic/i.test(text)) {
    return "Eyelid";
  }
  if (/mommy makeover|tummy tuck|abdominoplasty|diastasis recti/i.test(text)) {
    return "Abdomen";
  }
  if (/liposuction|lipoplasty|lipectomy|body contour/i.test(text)) {
    return "Subcutaneous Tissue";
  }
  if (/rhinoplasty|septorhinoplasty|septoplasty|\bnose\b|nasal/i.test(text)) {
    return "Nose";
  }
  if (/limb lengthen|stature lengthen|distraction osteogenesis|leg.length discrepancy/i.test(text)) {
    return "Lower Limb";
  }
  if (/tendon/i.test(text)) return "Tendon";
  if (
    /coronary|percutaneous coronary|\bpci\b|\bcabg\b|bypass graft|pacemaker|bradycardia|heart block|\bicd\b|leadless pacing|resynchronization|tavr|tavi|aortic stenosis|aortic valve|valvuloplasty|\bbav\b/i.test(
      text,
    )
  ) {
    return "Heart";
  }
  if (
    /craniotomy|brain tumor|glioma|meningioma|aneurysm clipping|endoscopic brain|neuroendoscop|pituitary|hydrocephalus|ventriculostomy|vp shunt/i.test(
      text,
    )
  ) {
    return "Brain";
  }
  if (/spine tumor|spinal tumor|spinal cord tumor/i.test(text)) {
    return "Spine";
  }
  return undefined;
}
