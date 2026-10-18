import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { treatments, type Treatment } from "@/lib/treatments";

const EBRT = "External Beam Radiotherapy (EBRT)";

/** Visible on the glance table and repeated in MedicalProcedure.bodyLocation. */
export const PROCEDURE_BODY_SITE = {
  en: "The site is the one named in the treatment plan, not the procedure name alone.",
  ar: "موضع الورم الذي يحدده التخطيط، لا اسم الإجراء وحده.",
} as const;

export type ProcedureBenchmark = {
  procedure: string;
  indiaUsd?: string;
  usUsd?: string;
  stay?: string;
  /** Radiation destination table only. A multiplier, not a sourced price. */
  uaeLevel?: string;
  session?: string;
  fractions?: string;
  course?: string;
  procedureType: string;
  bodyLocation: string;
  howPerformed: string;
};

function isRadiation(treatment: Treatment) {
  return treatment.specialtySlug === "radiation-oncology" || treatment.category === "Radiation Oncology";
}

/**
 * Planning figures already stored on the treatment row. Missing destinations
 * stay missing: this does not invent a riyal conversion or a success rate.
 */
export function procedureBenchmark(procedureName: string): ProcedureBenchmark | undefined {
  const treatment = treatments.find((row) => row.name === procedureName);
  if (!treatment?.partnerRange && !treatment?.usRange && !treatment?.stay) return undefined;
  if (!treatment) return undefined;
  const radiation = isRadiation(treatment);
  const ebrt = procedureName === EBRT;
  const stayNote = treatment.stay ? `Catalog stay: ${treatment.stay}.` : "";
  const summary = treatment.summary?.trim();
  return {
    procedure: procedureName,
    indiaUsd: treatment.partnerRange || undefined,
    usUsd: treatment.usRange || undefined,
    stay: treatment.stay || undefined,
    uaeLevel: radiation ? "2.2–3.6×" : undefined,
    ...(ebrt
      ? {
          session: "Often 10–20 minutes on the treatment couch",
          fractions: "Often 15–35 weekday sessions",
          course: "4–7 weeks of weekday sessions in the record. Most plans are outpatient, with no fixed number of nights.",
        }
      : {}),
    procedureType: radiation ? "Radiation" : treatment.category,
    bodyLocation: PROCEDURE_BODY_SITE.en,
    howPerformed: [summary, stayNote].filter(Boolean).join(" "),
  };
}

export type VisibleProcedureFacts = {
  benchmark: ProcedureBenchmark;
  procedureTypeLabel: string;
  bodyLocation: string;
  howPerformed: string;
  rows: { label: string; value: string }[];
};

const NONE = { en: "No stored range", ar: "لا يوجد نطاق مخزّن" } as const;
const SAR = {
  en: "Stored figures are US dollars. This page does not convert them to riyals.",
  ar: "الأرقام المخزّنة بالدولار الأمريكي. هذه الصفحة لا تحوّلها إلى الريال.",
} as const;
const UAE_NOTE = {
  en: "Relative level from the radiation destination table, not a sourced price.",
  ar: "مستوى نسبي من جدول وجهات العلاج الإشعاعي، وليس سعرًا موثّقًا.",
} as const;
const OUTCOMES = { en: "Not published on this page.", ar: "غير منشورة في هذه الصفحة." } as const;
const STAY_UNTRANSLATED = {
  ar: "مدة الإقامة مكتوبة في دليل التكلفة بالإنجليزية، ولا تُنسخ هنا.",
} as const;

/**
 * The sentences the page actually shows. Schema repeats these and nothing else.
 */
export function visibleProcedureFacts(
  procedureName: string,
  locale: "en" | "ar",
): VisibleProcedureFacts | undefined {
  const benchmark = procedureBenchmark(procedureName);
  if (!benchmark) return undefined;
  const ar = locale === "ar";
  const procedureTypeLabel =
    benchmark.procedureType === "Radiation"
      ? ar
        ? "علاج إشعاعي"
        : "Radiation"
      : ar
        ? taxonomyLabel(benchmark.procedureType, "ar")
        : benchmark.procedureType;
  const bodyLocation = ar ? PROCEDURE_BODY_SITE.ar : PROCEDURE_BODY_SITE.en;
  const session = ar && benchmark.session ? "غالبًا 10–20 دقيقة على طاولة الجهاز" : benchmark.session;
  const fractions = ar && benchmark.fractions ? "غالبًا 15–35 جلسة في أيام العمل" : benchmark.fractions;
  const course =
    ar && benchmark.course
      ? "4–7 أسابيع من الجلسات في السجل، والحضور في أيام العمل. معظم الخطط خارجية بلا عدد ليالٍ ثابت."
      : benchmark.course;
  const howPerformed = ar
    ? "الأرقام في الجدول نطاقات تخطيط مخزّنة. الخطة المكتوبة هي التي تحدد عدد الجلسات والإقامة."
    : benchmark.howPerformed;
  const rows: { label: string; value: string }[] = [
    { label: ar ? "التصنيف" : "Classification", value: procedureTypeLabel },
    { label: ar ? "نطاق الهند للتخطيط (دولار أمريكي)" : "India planning range (USD)", value: benchmark.indiaUsd ?? NONE[locale] },
    { label: ar ? "نطاق الولايات المتحدة للتخطيط (دولار أمريكي)" : "United States planning range (USD)", value: benchmark.usUsd ?? NONE[locale] },
    {
      label: ar ? "الإمارات نسبةً إلى منتصف نطاق الهند" : "UAE, relative to the India midpoint",
      value: benchmark.uaeLevel ? `${benchmark.uaeLevel}. ${UAE_NOTE[locale]}` : NONE[locale],
    },
    { label: ar ? "السعودية" : "Saudi Arabia", value: NONE[locale] },
    { label: ar ? "الريال السعودي" : "Saudi riyal", value: SAR[locale] },
  ];
  if (session) rows.push({ label: ar ? "الوقت على الطاولة" : "Time on the couch", value: session });
  if (fractions) rows.push({ label: ar ? "الجلسات" : "Fractions", value: fractions });
  if (course) rows.push({ label: ar ? "مدة المساق" : "Course", value: course });
  if (!ar && benchmark.stay) rows.push({ label: "Stay noted in the catalog", value: benchmark.stay });
  if (ar) rows.push({ label: "الإقامة", value: STAY_UNTRANSLATED.ar });
  rows.push(
    { label: ar ? "موضع العلاج" : "Body site", value: bodyLocation },
    { label: ar ? "النتائج" : "Outcomes", value: OUTCOMES[locale] },
  );
  return { benchmark, procedureTypeLabel, bodyLocation, howPerformed, rows };
}

/** Schema node. procedureType stays the stored classification, including "Radiation". */
export function medicalProcedureAbout(procedureName: string, locale: "en" | "ar") {
  const facts = visibleProcedureFacts(procedureName, locale);
  if (!facts) return { "@type": "MedicalProcedure" as const, name: procedureName };
  return {
    "@type": "MedicalProcedure" as const,
    name: procedureName,
    procedureType: facts.benchmark.procedureType,
    bodyLocation: facts.bodyLocation,
    howPerformed: facts.howPerformed,
    description: facts.howPerformed,
  };
}
