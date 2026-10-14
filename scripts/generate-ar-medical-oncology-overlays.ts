#!/usr/bin/env node
/**
 * Builds reviewed Arabic CMS overlays for every Medical Oncology doctor.
 *
 * Routing and relationship fields remain on the English source record. The
 * overlay changes only reader-facing copy, preserving stable Country → City →
 * Specialty → Procedure URLs, entity IDs, canonicals, and future pSEO facets.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import names from "../src/data/medical-oncologist-names-ar.json";
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
  if (/principal (?:director|lead)/i.test(title)) return "المدير الرئيسي";
  if (/senior director/i.test(title)) return "المدير الأول";
  if (/additional director/i.test(title)) return "المدير الإضافي";
  if (/associate director/i.test(title)) return "المدير المشارك";
  if (/vice.?chairman/i.test(title)) return "نائب رئيس القسم";
  if (/chairman/i.test(title)) return "رئيس القسم";
  if (/chief|head of department|\bHOD\b|unit head/i.test(title)) return "رئيس القسم";
  if (/clinical (?:director|lead)/i.test(title)) return "المسؤول السريري";
  if (/senior consultant/i.test(title)) return "استشاري أول";
  if (/associate consultant|clinical associate/i.test(title)) return "استشاري مشارك";
  if (/consultant/i.test(title)) return "استشاري";
  if (/director/i.test(title)) return "مدير";
  if (/professor/i.test(title)) return "أستاذ واستشاري";
  return "اختصاصي";
}

function roleFocus(title: string) {
  if (/hemato|haemat|bone marrow|\bBMT\b/i.test(title)) {
    return "علاج الأورام الطبي وأورام الدم";
  }
  if (/precision/i.test(title)) return "علاج الأورام الطبي والدقيق";
  return "علاج الأورام الطبي";
}

function arabicTitle(title: string) {
  return `${rolePrefix(title)} في ${roleFocus(title)}`;
}

function translateProcedure(name: string) {
  const translated = TAXONOMY_AR[name];
  if (!translated) throw new Error(`Missing Arabic procedure label: ${name}`);
  return translated;
}

function arabicQualifications(value: string) {
  const qualifications: string[] = [];
  const has = (pattern: RegExp) => pattern.test(value);
  if (has(/\bMBBS\b|\bMBChB\b/i)) qualifications.push("بكالوريوس الطب والجراحة");
  if (has(/\bMD\b/i)) qualifications.push("دكتوراه في الطب");
  if (has(/\bDM\b|\bDrNB\b/i)) qualifications.push("تخصص دقيق في علاج الأورام الطبي");
  if (has(/\bDNB\b/i)) qualifications.push("دبلوم البورد الوطني");
  if (has(/\bMRCP\b/i)) qualifications.push("عضوية الكلية الملكية للأطباء");
  if (has(/\bFRCP\b|\bFRACP\b/i)) qualifications.push("زمالة الكلية الملكية للأطباء");
  if (has(/\bPhD\b/i)) qualifications.push("دكتوراه بحثية");
  if (has(/\bMSc\b/i)) qualifications.push("درجة ماجستير");
  if (has(/\bMBA\b/i)) qualifications.push("ماجستير إدارة");
  if (has(/American Board/i)) qualifications.push("اعتماد البورد الأمريكي");
  if (has(/Fellowship/i)) qualifications.push("زمالة تخصصية");
  if (has(/Diploma|Certificate|Certification|\bECMO\b|\bESMO\b/i)) {
    qualifications.push("اعتماد تخصصي");
  }
  return [...new Set(qualifications)].join("، ") || "تدريب تخصصي في علاج الأورام الطبي";
}

function arabicSpecializations(doctor: Doctor, procedures: string[]) {
  const values = ["علاج الأورام الطبي"];
  const focus = roleFocus(doctor.title);
  if (focus !== "علاج الأورام الطبي") values.push(focus);
  if (procedures.length) values.push(`علاجات مختارة: ${procedures.slice(0, 3).join("، ")}`);
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
  const yearsCopy =
    years > 0
      ? `بخبرة مهنية منشورة تمتد لأكثر من ${years} سنة`
      : "بخبرة منشورة في علاج الأورام الطبي";
  const first = procedures[0] ?? "العلاج الكيميائي";
  const second = procedures[1] ?? first;
  const third = procedures[2] ?? second;
  const route = `يُنظَّم هذا الملف في دليل GAF Healthcare تحت الهند / ${city} / علاج الأورام الطبي / ${first}، مع بقاء مفاتيح البلد والمدينة والتخصص والإجراء ثابتة للبحث والمقارنة.`;
  const review =
    "تبدأ المطابقة بمراجعة تقرير الخزعة ومرحلة الورم والتحاليل والتصوير والعلاجات السابقة، ثم مكالمة فيديو قبل تثبيت المستشفى أو موعد السفر. اختيار البروتوكول والجرعة قرار سريري بعد مراجعة طبيب مرخّص؛ والإدراج معلوماتي وليس ترتيبًا أو ضمانًا للنتيجة.";
  const templates = [
    `${name} هو ${title} في ${hospital}، ${city}، الهند، ${yearsCopy}. تشمل العلاجات المرتبطة بملفه ${first} و${second} و${third}. ${route} ${review}`,
    `يظهر ${name} في الدليل العربي بصفته ${title} في ${hospital} بمدينة ${city}، الهند، ${yearsCopy}. تُراجع ملاءمة ${first} أو ${second} وفق نوع الورم ومرحلته والمؤشرات الحيوية، لا من اسم العلاج وحده. ${route} ${review}`,
    `ملف ${name} مخصص للعائلات التي تبحث عن ${title} في ${city}، الهند. يعمل في ${hospital}، ${yearsCopy}، وترتبط صفحته بخيارات مثل ${first} و${second} و${third}. ${route} ${review}`,
    `${name}، ${title} في ${hospital}، ${city}، الهند. ${yearsCopy} في تقييم العلاج الدوائي ضمن خطة متعددة التخصصات. من العلاجات المنشورة في ملفه: ${first}، ${second}، ${third}. ${route} ${review}`,
    `عند البحث عن ${title} في ${city}، يعرض دليل GAF Healthcare ملف ${name} في ${hospital}، الهند، ${yearsCopy}. لا تُفترض ملاءمة ${first} أو ${second} قبل مراجعة الخزعة والمرحلة والتحاليل. ${route} ${review}`,
    `يربط ملف ${name} بين ${hospital} ومدينة ${city} وتخصص علاج الأورام الطبي في الهند. وهو ${title} ${yearsCopy}، وتشمل الخيارات المطابقة ${first} و${second} و${third}. ${route} ${review}`,
    `${name} مدرج كـ${title} في ${hospital}، ${city}، الهند، ${yearsCopy}. تساعد الصفحة في الوصول من التخصص إلى العلاج، بما في ذلك ${first} و${second}، من دون تحويل الدليل إلى تصنيف للأطباء. ${route} ${review}`,
    `لرأي طبي بشأن ${first} أو ${second}، يقدم هذا الملف ${name} بصفته ${title} في ${hospital} بمدينة ${city}، الهند، ${yearsCopy}. تُراجع المؤشرات الحيوية ووظائف الأعضاء قبل مناقشة العلاج. ${route} ${review}`,
  ];
  return templates[hash(doctor.slug) % templates.length];
}

const medicalOncologists = catalogDoctors.filter((doctor) => doctor.specialty === "Medical Oncology");
if (medicalOncologists.length !== 86) {
  throw new Error(`Expected 86 medical oncologists, found ${medicalOncologists.length}`);
}
if (Object.keys(NAME_AR).length !== medicalOncologists.length) {
  throw new Error(`Expected ${medicalOncologists.length} Arabic names, found ${Object.keys(NAME_AR).length}`);
}

const slugs = new Set(medicalOncologists.map((doctor) => doctor.slug));
for (const slug of Object.keys(NAME_AR)) {
  if (!slugs.has(slug)) throw new Error(`Arabic name has no medical-oncology doctor: ${slug}`);
}

const overlays: Record<string, DoctorPatch> = { ...cms.doctorOverrides };
for (const doctor of medicalOncologists) {
  const name = NAME_AR[doctor.slug];
  const city = CITY_AR[doctor.city];
  const hospital = HOSPITAL_NAMES_AR[doctor.hospitalSlug];
  if (!name) throw new Error(`Missing Arabic name for ${doctor.slug}`);
  if (!city) throw new Error(`Missing Arabic city for ${doctor.city}`);
  if (!hospital) throw new Error(`Missing Arabic hospital for ${doctor.hospitalSlug}`);

  const title = arabicTitle(doctor.title);
  const procedures = doctor.procedures.map(translateProcedure);
  const qualifications = arabicQualifications(doctor.qualifications);
  overlays[doctor.slug] = {
    status: overlays[doctor.slug]?.status ?? "published",
    name,
    title,
    qualifications,
    experience: `${experienceYears(doctor.experience)}+ سنة خبرة`,
    languages: LANGUAGES_AR[doctor.city] ?? "الإنجليزية، الهندية",
    imageAlt: `${name}، ${title} في ${hospital}، ${city} — دليل GAF Healthcare لعلاج الأورام الطبي في الهند حسب البلد والمدينة والتخصص والإجراء`,
    specializations: arabicSpecializations(doctor, procedures),
    proceduresExpertise: procedures,
    education: [`المؤهلات المنشورة: ${qualifications}`],
    affiliations: [`يمارس عمله في ${hospital}، ${city}، الهند`],
    memberships: doctor.memberships.length
      ? [`لديه ${doctor.memberships.length} عضويات مهنية منشورة في السجل الإنجليزي المرجعي`]
      : [],
    awards: doctor.awards.length
      ? [`يتضمن السجل الإنجليزي المرجعي ${doctor.awards.length} جوائز أو تكريمات منشورة`]
      : [],
    research: doctor.research.length
      ? [`يتضمن السجل الإنجليزي المرجعي ${doctor.research.length} مساهمات بحثية منشورة`]
      : [],
    bio: arabicBio(doctor, name, title, hospital, city, procedures),
  };
}

cms.doctorOverrides = overlays;
writeFileSync(cmsPath, `${JSON.stringify(cms, null, 2)}\n`);
console.log(
  `Wrote ${medicalOncologists.length} Arabic medical-oncology overlays; total doctors ${Object.keys(overlays).length}`,
);
