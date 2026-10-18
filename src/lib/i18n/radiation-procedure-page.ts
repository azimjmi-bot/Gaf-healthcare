import type { RadiationProcedurePagePatch } from "@/lib/cms/catalog-types";

/**
 * Reviewed Arabic copy for one radiation-oncology procedure landing page.
 * Live doctor, hospital and city counts are not stored here; the builder
 * reads them from the catalog when it renders.
 */
export type RadiationProcedureCopy = {
  procedure: string;
  /** How the taxonomy entry should be described. Platforms are not techniques. */
  kind: "modality" | "technique" | "platform" | "subtype";
  h1: string;
  title: string;
  description: string;
  intro: string;
  quickAnswer: string;
  noteHeading: string;
  note: string[];
  steps: { title: string; body: string }[];
  indicationsIntro: string;
  indications: string[];
  benefits: string[];
  risks: string[];
  limitations: string[];
  eligibility: string[];
  comparisonTitle: string;
  comparisonIntro: string;
  /** Taxonomy name of the procedure this page compares against, when one exists. */
  comparisonPeer?: string;
  comparisonPeerLabel: string;
  comparison: { aspect: string; ours: string; theirs: string }[];
  costFactors: string[];
  records: string[];
  international: string;
  related: string[];
  /** Strings that mark an answer as being about this procedure, not a sibling. */
  markers: string[];
  faqs: { q: string; a: string }[];
};

export const PROCEDURE_FAQ_MIN = 18;
export const PROCEDURE_ANSWER_MIN_WORDS = 40;

const ARABIC_STOPWORDS = new Set(
  "في على من إلى الى عن مع هذا هذه ذلك تلك التي الذي أن إن كان تكون يكون قد تم يتم لا لم لن ما هي هو هي أو ثم بين خلال بعد قبل كل بعض أي لدى عند كما حتى غير دون داخل بعد ذلك لذلك لأن حيث بين".split(
    /\s+/,
  ),
);

export function arabicContentWords(text: string) {
  return text
    .replace(/[^\u0600-\u06FF\s]/g, " ")
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 2 && !ARABIC_STOPWORDS.has(word));
}

export function faqAnswerWords(text: string) {
  return text
    .replace(/[^\u0600-\u06FFA-Za-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.trim().length > 1);
}

function normalizedQuestion(question: string) {
  return question.replace(/\s+/g, " ").trim();
}

/** Overlay fields replace the baseline only when the editor actually sent text. */
export function applyRadiationProcedurePatch(
  base: RadiationProcedureCopy,
  patch?: RadiationProcedurePagePatch,
): RadiationProcedureCopy {
  if (!patch) return base;
  const note = patch.note?.map((row) => row.trim()).filter(Boolean);
  const faqs = patch.faqs
    ?.map((row) => ({ q: row.q.trim(), a: row.a.trim() }))
    .filter((row) => row.q || row.a);
  return {
    ...base,
    h1: patch.h1?.trim() || base.h1,
    description: patch.description?.trim() || base.description,
    quickAnswer: patch.quickAnswer?.trim() || base.quickAnswer,
    note: note?.length ? note : base.note,
    faqs: faqs?.length ? faqs : base.faqs,
  };
}

/** Structural and completeness checks. Medical accuracy still needs a person. */
export function procedureCopyIssues(copy: RadiationProcedureCopy): string[] {
  const issues: string[] = [];
  const required: (keyof RadiationProcedureCopy)[] = [
    "h1",
    "title",
    "description",
    "intro",
    "quickAnswer",
    "noteHeading",
    "comparisonTitle",
    "comparisonIntro",
    "comparisonPeerLabel",
    "international",
  ];
  for (const key of required) {
    if (typeof copy[key] !== "string" || !(copy[key] as string).trim()) issues.push(`empty ${key}`);
  }
  if (copy.note.length < 2) issues.push("note needs at least 2 paragraphs");
  if (copy.steps.length < 4) issues.push("steps need at least 4 stages");
  if (copy.indications.length < 3) issues.push("indications need at least 3 items");
  if (copy.benefits.length < 2) issues.push("benefits need at least 2 items");
  if (copy.risks.length < 2) issues.push("risks need at least 2 items");
  if (copy.limitations.length < 2) issues.push("limitations need at least 2 items");
  if (copy.eligibility.length < 3) issues.push("eligibility needs at least 3 items");
  if (copy.comparison.length < 3) issues.push("comparison needs at least 3 rows");
  if (copy.costFactors.length < 3) issues.push("cost factors need at least 3 items");
  if (copy.records.length < 3) issues.push("records need at least 3 items");
  if (copy.faqs.length < PROCEDURE_FAQ_MIN) {
    issues.push(`faqs ${copy.faqs.length} < ${PROCEDURE_FAQ_MIN}`);
  }
  const seen = new Set<string>();
  copy.faqs.forEach((row, index) => {
    const question = normalizedQuestion(row.q);
    const answer = row.a.trim();
    if (!question) issues.push(`faq ${index + 1} empty question`);
    if (!answer) issues.push(`faq ${index + 1} empty answer`);
    if (question && seen.has(question)) issues.push(`duplicate question: ${question}`);
    seen.add(question);
    if (answer && faqAnswerWords(answer).length < PROCEDURE_ANSWER_MIN_WORDS) {
      issues.push(`faq ${index + 1} answer is too short`);
    }
  });
  const markerIn = (text: string) => copy.markers.some((marker) => text.includes(marker));
  const answersWithMarker = copy.faqs.filter((row) => markerIn(row.a)).length;
  if (copy.markers.length > 0 && answersWithMarker < 8) {
    issues.push(`only ${answersWithMarker} answers mention this procedure`);
  }
  if (copy.markers.length > 0 && !markerIn(copy.intro) && !markerIn(copy.quickAnswer)) {
    issues.push("introduction does not name this procedure");
  }
  const questionsWithMarker = copy.faqs.filter((row) => markerIn(row.q)).length;
  if (questionsWithMarker > 12) issues.push("too many questions repeat the procedure name");
  issues.push(...procedureClaimIssues(copy));
  return issues;
}

const CLAIM_PATTERNS: [RegExp, string][] = [
  [/\d+(?:[.,]\d+)?\s*%/, "unsupported percentage"],
  [/(?:USD|INR|\$|₹)\s*\d/i, "unsupported price"],
  [/شفاء مضمون|نضمن الشفاء|نسبة نجاح|أفضل طبيب/, "unsupported outcome or ranking"],
  [/تمت مراجع(?:ته|تها) طبي/, "false medical-review claim"],
];

/** Blocks publication of invented prices, rates, rankings, or a fake review. */
export function procedureClaimIssues(copy: RadiationProcedureCopy): string[] {
  const blob = [
    copy.intro,
    copy.quickAnswer,
    copy.international,
    ...copy.note,
    ...copy.steps.flatMap((row) => [row.title, row.body]),
    copy.indicationsIntro,
    ...copy.indications,
    ...copy.benefits,
    ...copy.risks,
    ...copy.limitations,
    ...copy.eligibility,
    copy.comparisonIntro,
    ...copy.comparison.flatMap((row) => [row.aspect, row.ours, row.theirs]),
    ...copy.costFactors,
    ...copy.faqs.flatMap((row) => [row.q, row.a]),
  ].join("\n");
  return CLAIM_PATTERNS.filter(([pattern]) => pattern.test(blob)).map(([, label]) => label);
}

/** Content-word overlap. High overlap means one page was built by renaming another. */
export function procedureCopyOverlap(a: RadiationProcedureCopy, b: RadiationProcedureCopy) {
  const words = (copy: RadiationProcedureCopy) =>
    new Set(
      arabicContentWords(
        [
          copy.intro,
          copy.quickAnswer,
          ...copy.note,
          ...copy.faqs.map((row) => `${row.q} ${row.a}`),
        ].join(" "),
      ),
    );
  const left = words(a);
  const right = words(b);
  let shared = 0;
  for (const word of left) if (right.has(word)) shared += 1;
  const union = left.size + right.size - shared;
  return union === 0 ? 1 : shared / union;
}
