#!/usr/bin/env node
/**
 * Builds reviewed Arabic overlays for every cost pathway.
 *
 * English names, slugs, specialties, procedures, hospital relationships and
 * price bands remain the shared pSEO identity. Arabic overlays contain only
 * reader-facing planning copy and duration labels.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { catalogTreatments } from "../src/lib/treatments";
import { TAXONOMY_AR } from "../src/lib/i18n/taxonomy-ar";
import type { CatalogCms, TreatmentPatch } from "../src/lib/cms/catalog-types";

const root = join(import.meta.dirname, "..");
const cmsPath = process.env.CATALOG_CMS_PATH ?? join(root, "content/ar/catalog-cms.json");
const cms = JSON.parse(readFileSync(cmsPath, "utf8")) as CatalogCms;

function label(value: string) {
  const translated = TAXONOMY_AR[value];
  if (!translated) throw new Error(`Missing Arabic taxonomy label: ${value}`);
  return translated;
}

const PHRASES: Array<[RegExp, string]> = [
  [/parent stay expected/gi, "مع توقّع إقامة أحد الوالدين"],
  [/parent stay required/gi, "مع اشتراط إقامة أحد الوالدين"],
  [/with a parent nearby/gi, "مع بقاء أحد الوالدين بالقرب من المستشفى"],
  [/outpatient follow-up in-city/gi, "مع متابعة خارجية داخل المدينة"],
  [/wait-list timing varies/gi, "وموعد قائمة الانتظار متغيّر"],
  [/desensitisation first/gi, "بعد إزالة التحسس أولًا"],
  [/usually outpatient/gi, "وعادةً دون مبيت"],
  [/paediatric cardiac ICU/gi, "العناية المركزة القلبية للأطفال"],
  [/paediatric ICU/gi, "العناية المركزة للأطفال"],
  [/stroke ICU/gi, "العناية المركزة للسكتة الدماغية"],
  [/paediatric ward/gi, "جناح الأطفال"],
  [/paediatric unit/gi, "وحدة الأطفال"],
  [/processor fitting follows/gi, "يتبعها ضبط المعالج"],
  [/staged casts may follow/gi, "وقد يتبعها جبس على مراحل"],
  [/nights of monitoring/gi, "ليالٍ للمراقبة"],
  [/infusion days/gi, "أيام للتسريب"],
  [/if the drain stays/gi, "إذا بقي المصرف"],
  [/mapping follows/gi, "يتبعها التخطيط"],
  [/in or near the unit/gi, "داخل الوحدة أو بالقرب منها"],
  [/with device training/gi, "مع التدريب على الجهاز"],
  [/nearby after listing/gi, "بالقرب من المستشفى بعد الإدراج بالقائمة"],
  [/then nearby recovery/gi, "ثم تعافٍ بالقرب من المستشفى"],
  [/outpatient lengthening in-city/gi, "مع متابعة التطويل خارج المستشفى داخل المدينة"],
  [/nearby/gi, "بالقرب من المستشفى"],
  [/of fractions/gi, "من الجلسات المجزأة"],
  [/sessions typical/gi, "جلسات عادةً"],
  [/nights typical/gi, "ليالٍ عادةً"],
  [/Three sessions a week typical/gi, "ثلاث جلسات أسبوعيًا عادةً"],
  [/Leukapheresis/gi, "فصادة كريات الدم البيضاء"],
  [/Apheresis/gi, "فصادة الدم"],
  [/Auto or allo/gi, "زراعة ذاتية أو خيفية"],
  [/By transplant protocol/gi, "بحسب بروتوكول الزراعة"],
  [/Cycles after surgery/gi, "دورات بعد الجراحة"],
  [/Cycles before surgery/gi, "دورات قبل الجراحة"],
  [/Infusion day-care/gi, "تسريب في الرعاية النهارية"],
  [/Day-care LP or Ommaya access/gi, "رعاية نهارية للبزل القطني أو منفذ أومايا"],
  [/Day-care/gi, "رعاية نهارية"],
  [/Donor/gi, "المتبرع"],
  [/recipient/gi, "المتلقي"],
  [/ICU or HDU days as quoted/gi, "أيام العناية المركزة أو الرعاية عالية الاعتماد حسب العرض"],
  [/ICU days as quoted/gi, "أيام العناية المركزة حسب العرض"],
  [/staged infusions/gi, "جلسات تسريب على مراحل"],
  [/Lower-intensity cycles after induction/gi, "دورات أقل شدة بعد العلاج الاستهلالي"],
  [/NGS panel \+ clinic visit/gi, "فحص التسلسل الجيني مع زيارة العيادة"],
  [/Oral or infusion by mutation/gi, "دواء فموي أو تسريب بحسب الطفرة"],
  [/Oral or infusion/gi, "دواء فموي أو تسريب"],
  [/Outpatient infusions/gi, "تسريب دون مبيت"],
  [/Outpatient cycles/gi, "دورات دون مبيت"],
  [/Outpatient/gi, "دون مبيت"],
  [/Overnight/gi, "مبيت ليلة"],
  [/goal is control, not cure/gi, "والهدف السيطرة لا الشفاء"],
  [/often years of tablets/gi, "وغالبًا أقراص لسنوات"],
  [/Tied to cytoreduction or IP ports/gi, "مرتبطة بالجراحة الاختزالية أو منافذ العلاج داخل الصفاق"],
  [/Tied to theatre stay/gi, "مرتبطة بإقامة العملية"],
  [/Training/gi, "تدريب"],
  [/then home/gi, "ثم العودة إلى المنزل"],
  [/grafts quoted separately/gi, "والطعوم تُسعّر منفصلة"],
  [/weeks to months/gi, "من أسابيع إلى أشهر"],
  [/months of therapy/gi, "أشهر من العلاج"],
  [/after induction/gi, "بعد العلاج الاستهلالي"],
  [/sleep lab/gi, "مختبر النوم"],
  [/\bin the\b/gi, "في"],
  [/\bin a\b/gi, "في"],
  [/q2–6 weeks/gi, "كل 2–6 أسابيع"],
  [/typical/gi, "عادةً"],
  [/monitoring/gi, "المراقبة"],
  [/home/gi, "المنزل"],
];

function arabicStay(value: string) {
  let translated = value;
  for (const [pattern, replacement] of PHRASES) translated = translated.replace(pattern, replacement);
  translated = translated
    .replace(/\b1 night\b/gi, "ليلة واحدة")
    .replace(/\b(\d+–\d+) nights?\b/gi, "$1 ليالٍ")
    .replace(/\b(\d+) nights?\b/gi, "$1 ليالٍ")
    .replace(/\b1 week\b/gi, "أسبوع واحد")
    .replace(/\b(\d+–\d+) weeks?\b/gi, "$1 أسابيع")
    .replace(/\b(\d+–\d+) months?\b/gi, "$1 أشهر")
    .replace(/\b(\d+–\d+) sessions?\b/gi, "$1 جلسات")
    .replace(/\b(\d+–\d+) days?\b/gi, "$1 أيام")
    .replace(/\b(\d+) sessions?\b/gi, "$1 جلسات")
    .replace(/\bor\b/gi, "أو")
    .replace(/\bto\b/gi, "إلى")
    .replace(/\band\b/gi, "و")
    .replace(/\s*;\s*/g, "؛ ")
    .replace(/\s+/g, " ")
    .trim();
  if (/[A-Za-z]{2,}/.test(translated)) {
    throw new Error(`Untranslated stay label: ${value} -> ${translated}`);
  }
  return translated;
}

function includesFor(specialty: string, procedure: string) {
  return [
    `مراجعة السجلات والتقارير المرتبطة بـ${procedure}`,
    `مكالمة فيديو مع اختصاصي ${specialty} قبل تثبيت السفر`,
    "خطة مكتوبة توضّح النهج السريري المتوقع بعد مراجعة الملف",
    "تفصيل عناصر العرض مثل أتعاب الفريق والمستشفى والأجهزة أو الأدوية عند الحاجة",
    "ملخص خروج أو متابعة يمكن مشاركته مع الطبيب المعالج في بلد المريض",
  ];
}

const overlays: Record<string, TreatmentPatch> = { ...cms.treatmentOverrides };
for (const treatment of catalogTreatments) {
  const procedure = label(treatment.name);
  const specialty = label(
    TAXONOMY_AR[treatment.category] ? treatment.category : treatment.specialtySlug
      .split("-")
      .map((part) => part[0]?.toUpperCase() + part.slice(1))
      .join(" "),
  );
  overlays[treatment.slug] = {
    status: overlays[treatment.slug]?.status ?? "published",
    summary: `يعرض دليل GAF Healthcare نطاقًا تخطيطيًا لتكلفة ${procedure} في الهند ضمن ${specialty}، مع إمكانية التصفية حسب البلد والمدينة والتخصص والإجراء. تُستخدم الأرقام للمقارنة الأولية فقط؛ ويُحدَّد المسار المناسب بعد مراجعة التشخيص والتقارير والتصوير والحالة العامة.`,
    stay: arabicStay(treatment.stay),
    includes: includesFor(specialty, procedure),
    conditions: [
      `تقييم ملاءمة ${procedure} بعد مراجعة السجلات`,
      `تخطيط العلاج ضمن ${specialty}`,
    ],
    notes: `النطاقات المنشورة لـ${procedure} مؤشرات تخطيط وليست عرض سعر أو ضمانًا للنتيجة. يؤكد اختصاصي مرخّص الخطة، ويصدر المستشفى عرضًا مفصلًا بعد مراجعة السجلات؛ ولا ينبغي حجز السفر اعتمادًا على السعر وحده.`,
  };
}

if (Object.keys(overlays).length !== catalogTreatments.length) {
  throw new Error(
    `Expected ${catalogTreatments.length} Arabic cost overlays, found ${Object.keys(overlays).length}`,
  );
}

cms.treatmentOverrides = overlays;
writeFileSync(cmsPath, `${JSON.stringify(cms, null, 2)}\n`);
console.log(`Wrote ${catalogTreatments.length} published Arabic cost overlays`);
