#!/usr/bin/env node
/**
 * Builds original Arabic CMS overlays for every Surgical Oncology doctor.
 *
 * English slugs, city keys, hospital relationships, specialties, procedures
 * and treatment relationships stay on the base record. Only reader-facing
 * fields are overlaid, so Country → City → Specialty → Procedure pSEO keeps
 * one stable routing identity in every language.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import names from "../src/data/surgical-oncologist-names-ar.json";
import { catalogDoctors, type Doctor } from "../src/lib/doctors";
import { HOSPITAL_NAMES_AR } from "../src/lib/i18n/hospital-names-ar";
import { TAXONOMY_AR } from "../src/lib/i18n/taxonomy-ar";
import type { CatalogCms, DoctorPatch } from "../src/lib/cms/catalog-types";

const root = join(import.meta.dirname, "..");
const cmsPath = join(root, "content/ar/catalog-cms.json");
const cms = JSON.parse(readFileSync(cmsPath, "utf8")) as CatalogCms;

const NAME_AR = names as Record<string, string>;
const CITY_AR: Record<string, string> = {
  "Delhi NCR": "دلهي إن سي آر",
  Mumbai: "مومباي",
  Bengaluru: "بنغالور",
  Chennai: "تشيناي",
  Hyderabad: "حيدر آباد",
};
const LANGUAGES_AR: Record<string, string> = {
  "Delhi NCR": "الإنجليزية، الهندية",
  Mumbai: "الإنجليزية، الهندية، الماراثية",
  Bengaluru: "الإنجليزية، الكانادية، الهندية",
  Chennai: "الإنجليزية، التاميلية، الهندية",
  Hyderabad: "الإنجليزية، التيلوغو، الهندية",
};

function hash(value: string) {
  return [...value].reduce((total, character) => total + character.charCodeAt(0), 0);
}

function experienceYears(value: string) {
  return Number.parseInt(value.match(/\d+/)?.[0] ?? "0", 10);
}

function rolePrefix(title: string) {
  if (/principal director/i.test(title)) return "المدير الرئيسي";
  if (/senior director/i.test(title)) return "المدير الأول";
  if (/associate director/i.test(title)) return "المدير المشارك";
  if (/director/i.test(title)) return "المدير";
  if (/vice chairman/i.test(title)) return "نائب رئيس القسم";
  if (/chairman/i.test(title)) return "رئيس القسم";
  if (/chief/i.test(title)) return "رئيس القسم";
  if (/clinical lead/i.test(title)) return "المسؤول السريري";
  if (/senior consultant/i.test(title)) return "استشاري أول";
  if (/associate consultant/i.test(title)) return "استشاري مشارك";
  if (/visiting consultant/i.test(title)) return "استشاري زائر";
  if (/consultant/i.test(title)) return "استشاري";
  return "اختصاصي";
}

function roleFocus(title: string) {
  if (/breast/i.test(title)) return "جراحة أورام الثدي والجراحة التجميلية الورمية";
  if (/gyn|obstetric/i.test(title)) return "جراحة أورام النساء";
  if (/head\s*(?:&|and)\s*neck/i.test(title)) return "جراحة أورام الرأس والعنق";
  if (/uro/i.test(title)) return "جراحة أورام المسالك البولية والجراحة الروبوتية";
  if (/thoracic|lung|chest/i.test(title)) return "جراحة أورام الصدر والرئة";
  if (/gastro|(?:\bGI\b)|HPB|peritoneal/i.test(title)) {
    return "جراحة أورام الجهاز الهضمي والكبد والبنكرياس";
  }
  if (/plastic|reconstructive/i.test(title)) return "الجراحة الترميمية بعد علاج الأورام";
  if (/orthopedic/i.test(title)) return "جراحة أورام العظام";
  if (/robotic|minimal/i.test(title)) return "جراحة الأورام طفيفة التوغل والجراحة الروبوتية";
  return "جراحة الأورام";
}

function arabicTitle(title: string) {
  return `${rolePrefix(title)} في ${roleFocus(title)}`;
}

function translateProcedure(name: string) {
  const translated = TAXONOMY_AR[name];
  if (!translated) throw new Error(`Missing Arabic procedure label: ${name}`);
  return translated;
}

const COMMON_LINE_TRANSLATIONS: [RegExp, string][] = [
  [/\bSurgical Oncology\b/gi, "جراحة الأورام"],
  [/\bGeneral Surgery\b/gi, "الجراحة العامة"],
  [/\bMedical Oncology\b/gi, "علاج الأورام الطبي"],
  [/\bRadiation Oncology\b/gi, "علاج الأورام بالإشعاع"],
  [/\bGynecologic(?:al)? Oncology\b/gi, "أورام النساء"],
  [/\bHead and Neck\b/gi, "الرأس والعنق"],
  [/\bHead & Neck\b/gi, "الرأس والعنق"],
  [/\bBreast Surgery\b/gi, "جراحة الثدي"],
  [/\bRobotic Surgery\b/gi, "الجراحة الروبوتية"],
  [/\bMinimal(?:ly)? Invasive Surgery\b/gi, "الجراحة طفيفة التوغل"],
  [/\bLaparoscopic Surgery\b/gi, "جراحة المناظير"],
  [/\bFellowship\b/gi, "زمالة"],
  [/\bSenior Residency\b/gi, "إقامة تخصصية عليا"],
  [/\bResidency\b/gi, "إقامة تخصصية"],
  [/\bTraining\b/gi, "تدريب"],
  [/\bProfessor\b/gi, "أستاذ"],
  [/\bConsultant\b/gi, "استشاري"],
  [/\bDepartment\b/gi, "قسم"],
  [/\bUniversity\b/gi, "جامعة"],
  [/\bMedical College\b/gi, "كلية الطب"],
  [/\bCancer Institute\b/gi, "معهد السرطان"],
  [/\bCancer Centre\b/gi, "مركز السرطان"],
  [/\bCancer Center\b/gi, "مركز السرطان"],
  [/\bHospital\b/gi, "مستشفى"],
  [/\bMember of\b/gi, "عضو في"],
  [/\bMember\b/gi, "عضو"],
  [/\bCurrent\b/gi, "حاليًا"],
  [/\bFormerly\b/gi, "سابقًا"],
  [/\bFormer\b/gi, "سابقًا"],
  [/\bIndia\b/gi, "الهند"],
  [/\bNew Delhi\b/gi, "نيودلهي"],
  [/\bDelhi\b/gi, "دلهي"],
  [/\bMumbai\b/gi, "مومباي"],
  [/\bBangalore\b/gi, "بنغالور"],
  [/\bBengaluru\b/gi, "بنغالور"],
  [/\bChennai\b/gi, "تشيناي"],
  [/\bHyderabad\b/gi, "حيدر آباد"],
  [/\bGurgaon\b/gi, "غورغرام"],
  [/\bGurugram\b/gi, "غوروغرام"],
  [/\bFaridabad\b/gi, "فريد آباد"],
];

function translateLine(value: string) {
  let translated = value;
  for (const [pattern, replacement] of COMMON_LINE_TRANSLATIONS) {
    translated = translated.replace(pattern, replacement);
  }
  return translated.replace(/\s+/g, " ").trim();
}

function arabicSpecializations(doctor: Doctor, procedures: string[]) {
  const values = ["جراحة الأورام"];
  const titleFocus = roleFocus(doctor.title);
  if (titleFocus !== "جراحة الأورام") values.push(titleFocus);
  if (procedures.length) values.push(`إجراءات مختارة: ${procedures.slice(0, 3).join("، ")}`);
  return [...new Set(values)];
}

function arabicBio(
  doctor: Doctor,
  name: string,
  title: string,
  hospital: string,
  city: string,
  procedures: string[],
) {
  const years = experienceYears(doctor.experience);
  const yearsCopy = years > 0 ? `بخبرة مهنية منشورة تمتد لأكثر من ${years} سنة` : "بخبرة منشورة في جراحة الأورام";
  const first = procedures[0] ?? "جراحة الأورام";
  const second = procedures[1] ?? first;
  const third = procedures[2] ?? second;
  const route = `يُنظَّم هذا الملف في دليل GAF Healthcare تحت الهند / ${city} / جراحة الأورام / ${first}، مع بقاء مفاتيح البلد والمدينة والتخصص والإجراء ثابتة للمقارنة والبحث.`;
  const review =
    "تبدأ المطابقة بمراجعة تقارير الخزعة والتصوير وملخص العلاج، ثم مكالمة فيديو قبل تثبيت المستشفى أو موعد السفر. الإدراج معلوماتي وليس ترتيبًا أو ضمانًا لملاءمة العملية.";
  const templates = [
    `${name} هو ${title} في ${hospital}، ${city}، الهند، ${yearsCopy}. تشمل قائمة الإجراءات المرتبطة بملفه ${first} و${second} و${third}. ${route} ${review}`,
    `يظهر ${name} في الدليل العربي بصفته ${title} في ${hospital} بمدينة ${city}، الهند، ${yearsCopy}. تُراجع الحاجة إلى ${first} أو ${second} بعد قراءة مرحلة الورم والتصوير، لا من اسم الإجراء وحده. ${route} ${review}`,
    `ملف ${name} مخصص للعائلات التي تبحث عن ${title} في ${city}، الهند. يعمل في ${hospital}، ${yearsCopy}، وترتبط صفحته بإجراءات مثل ${first} و${second} و${third}. ${route} ${review}`,
    `${name}، ${title} في ${hospital}، ${city}، الهند. ${yearsCopy} في تقييم الجراحة ضمن خطة علاج متعددة التخصصات. من الإجراءات المنشورة في ملفه: ${first}، ${second}، ${third}. ${route} ${review}`,
    `عند البحث عن ${title} في ${city}، يعرض دليل GAF Healthcare ملف ${name} في ${hospital}، الهند، ${yearsCopy}. لا تُفترض ملاءمة ${first} أو ${second} قبل مراجعة المرحلة والتقارير. ${route} ${review}`,
    `يربط ملف ${name} بين ${hospital} ومدينة ${city} وتخصص جراحة الأورام في الهند. وهو ${title} ${yearsCopy}، وتشمل الإجراءات المطابقة ${first} و${second} و${third}. ${route} ${review}`,
    `${name} مدرج كـ${title} في ${hospital}، ${city}، الهند، ${yearsCopy}. تساعد الصفحة في الوصول من التخصص إلى الإجراء، بما في ذلك ${first} و${second}، من دون تحويل الدليل إلى تصنيف للأطباء. ${route} ${review}`,
    `للرأي الجراحي في ${first} أو ${second}، يقدم هذا الملف ${name} بصفته ${title} في ${hospital} بمدينة ${city}، الهند، ${yearsCopy}. ${route} ${review}`,
  ];
  return templates[hash(doctor.slug) % templates.length];
}

const surgicalOncologists = catalogDoctors.filter((doctor) => doctor.specialty === "Surgical Oncology");
if (surgicalOncologists.length !== 130) {
  throw new Error(`Expected 130 surgical oncologists, found ${surgicalOncologists.length}`);
}
if (Object.keys(NAME_AR).length !== surgicalOncologists.length) {
  throw new Error(`Expected ${surgicalOncologists.length} Arabic names, found ${Object.keys(NAME_AR).length}`);
}

const slugs = new Set(surgicalOncologists.map((doctor) => doctor.slug));
for (const slug of Object.keys(NAME_AR)) {
  if (!slugs.has(slug)) throw new Error(`Arabic name has no surgical-oncology doctor: ${slug}`);
}

const overlays: Record<string, DoctorPatch> = { ...cms.doctorOverrides };
for (const doctor of surgicalOncologists) {
  const name = NAME_AR[doctor.slug];
  const city = CITY_AR[doctor.city];
  const hospital = HOSPITAL_NAMES_AR[doctor.hospitalSlug];
  if (!name) throw new Error(`Missing Arabic name for ${doctor.slug}`);
  if (!city) throw new Error(`Missing Arabic city for ${doctor.city}`);
  if (!hospital) throw new Error(`Missing Arabic hospital for ${doctor.hospitalSlug}`);

  const title = arabicTitle(doctor.title);
  const procedures = doctor.procedures.map(translateProcedure);
  const bio = arabicBio(doctor, name, title, hospital, city, procedures);
  overlays[doctor.slug] = {
    status: overlays[doctor.slug]?.status ?? "published",
    name,
    title,
    qualifications: doctor.qualifications,
    experience: `${experienceYears(doctor.experience)}+ سنة خبرة`,
    languages: LANGUAGES_AR[doctor.city] ?? "الإنجليزية، الهندية",
    imageAlt: `${name}، ${title} في ${hospital}، ${city} — دليل GAF Healthcare لجراحة الأورام في الهند حسب البلد والمدينة والتخصص والإجراء`,
    specializations: arabicSpecializations(doctor, procedures),
    proceduresExpertise: procedures,
    education: doctor.education.map(translateLine),
    affiliations: doctor.affiliations.map(translateLine),
    memberships: doctor.memberships.map(translateLine),
    awards: doctor.awards.map(translateLine),
    research: doctor.research.map(translateLine),
    bio,
  };
}

cms.doctorOverrides = overlays;
writeFileSync(cmsPath, `${JSON.stringify(cms, null, 2)}\n`);
console.log(
  `Wrote ${surgicalOncologists.length} Arabic surgical-oncology overlays; total doctors ${Object.keys(overlays).length}`,
);
