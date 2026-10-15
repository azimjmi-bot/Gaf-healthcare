#!/usr/bin/env node
/**
 * Builds Arabic CMS overlays for the seven doctor cohorts requested after the
 * oncology rollout. Routing and relationship fields stay on the English source
 * record so Country → City → Specialty → Procedure URLs remain stable.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { catalogDoctors, type Doctor } from "../src/lib/doctors";
import { HOSPITAL_NAMES_AR } from "../src/lib/i18n/hospital-names-ar";
import { TAXONOMY_AR } from "../src/lib/i18n/taxonomy-ar";
import type { CatalogCms, DoctorPatch } from "../src/lib/cms/catalog-types";

const root = join(import.meta.dirname, "..");
const cmsPath = process.env.CATALOG_CMS_PATH ?? join(root, "content/ar/catalog-cms.json");
const cms = JSON.parse(readFileSync(cmsPath, "utf8")) as CatalogCms;

const SPECIALTIES = {
  Hematology: { count: 38, label: "أمراض الدم", patient: "مرضى اضطرابات الدم" },
  "Pediatric Hematology": {
    count: 21,
    label: "أمراض دم الأطفال",
    patient: "الأطفال المصابين باضطرابات الدم وأسرهم",
  },
  "Cardiac Surgery": { count: 92, label: "جراحة القلب", patient: "مرضى جراحة القلب" },
  "Pediatric Cardiac Surgery": {
    count: 26,
    label: "جراحة قلب الأطفال",
    patient: "الأطفال المصابين بعيوب القلب الخلقية وأسرهم",
  },
  Cardiology: { count: 237, label: "أمراض القلب", patient: "مرضى القلب والأوعية الدموية" },
  "Bariatric Surgery": {
    count: 30,
    label: "جراحة السمنة",
    patient: "المرضى الباحثين عن علاج السمنة والأمراض الأيضية",
  },
  Neurosurgery: {
    count: 98,
    label: "جراحة المخ والأعصاب",
    patient: "مرضى الدماغ والأعصاب والعمود الفقري",
  },
} as const;

type Specialty = keyof typeof SPECIALTIES;

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

const KNOWN_NAMES: Record<string, string> = {
  ajay: "أجاي",
  ajaykumar: "أجاي كومار",
  akash: "آكاش",
  akshay: "أكشاي",
  amit: "أميت",
  anand: "أناند",
  anil: "أنيل",
  ankit: "أنكيت",
  ankur: "أنكور",
  anoop: "أنوب",
  anupam: "أنوبام",
  anurag: "أنوراغ",
  arun: "أرون",
  ashok: "أشوك",
  ashish: "أشيش",
  bharat: "بهارات",
  deepak: "ديباك",
  dinesh: "دينيش",
  gaurav: "غوراف",
  gupta: "غوبتا",
  jain: "جاين",
  kumar: "كومار",
  lalit: "لاليت",
  manish: "مانيش",
  manoj: "مانوج",
  mukesh: "موكيش",
  naresh: "ناريش",
  neeraj: "نيراج",
  nikhil: "نيخيل",
  nitin: "نيتين",
  pankaj: "بانكاج",
  pradeep: "براديب",
  prakash: "براكاش",
  praveen: "برافين",
  rahul: "راهول",
  rajeev: "راجيف",
  rajesh: "راجيش",
  rakesh: "راكيش",
  ramesh: "راميش",
  reddy: "ريدي",
  sanjay: "سانجاي",
  sanjeev: "سانجيف",
  sandeep: "سانديب",
  sharma: "شارما",
  singh: "سينغ",
  srinivas: "سرينيفاس",
  sunil: "سونيل",
  suresh: "سوريش",
  vijay: "فيجاي",
  vikas: "فيكاس",
  vinod: "فينود",
  vivek: "فيفيك",
};

const LETTER_AR: Record<string, string> = {
  a: "ا",
  b: "ب",
  c: "ك",
  d: "د",
  e: "ي",
  f: "ف",
  g: "غ",
  h: "ه",
  i: "ي",
  j: "ج",
  k: "ك",
  l: "ل",
  m: "م",
  n: "ن",
  o: "و",
  p: "ب",
  q: "ق",
  r: "ر",
  s: "س",
  t: "ت",
  u: "و",
  v: "ف",
  w: "و",
  x: "كس",
  y: "ي",
  z: "ز",
};

function transliterateToken(raw: string) {
  const token = raw.toLowerCase().replace(/[^a-z]/g, "");
  if (!token) return "";
  if (KNOWN_NAMES[token]) return KNOWN_NAMES[token];
  const phonetic = token
    .replace(/ch/g, "Č")
    .replace(/sh/g, "Š")
    .replace(/kh/g, "Ḵ")
    .replace(/gh/g, "Ǧ")
    .replace(/ph/g, "F")
    .replace(/th/g, "Ṯ")
    .replace(/dh/g, "Ḏ")
    .replace(/ck/g, "K");
  const special: Record<string, string> = {
    Č: "تش",
    Š: "ش",
    Ḵ: "خ",
    Ǧ: "غ",
    F: "ف",
    Ṯ: "ث",
    Ḏ: "ذ",
    K: "ك",
  };
  return [...phonetic].map((character) => special[character] ?? LETTER_AR[character] ?? "").join("");
}

function arabicName(doctor: Doctor) {
  const existing = cms.doctorOverrides[doctor.slug]?.name;
  if (existing && /[\u0600-\u06ff]/.test(existing)) return existing;
  const clean = doctor.name
    .replace(/\b(?:Dr|Doctor|Brig|Brigadier|Col|Colonel|Major|Air Cmde|Prof)\.?\b/gi, "")
    .trim();
  const parts = clean.split(/[\s.-]+/).map(transliterateToken).filter(Boolean);
  return `د. ${parts.join(" ")}`;
}

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
  if (/chairman|chief|head of department|\bHOD\b|unit head/i.test(title)) return "رئيس القسم";
  if (/senior consultant/i.test(title)) return "استشاري أول";
  if (/associate consultant|clinical associate/i.test(title)) return "استشاري مشارك";
  if (/professor/i.test(title)) return "أستاذ واستشاري";
  if (/consultant/i.test(title)) return "استشاري";
  if (/director/i.test(title)) return "مدير";
  return "اختصاصي";
}

function arabicTitle(doctor: Doctor, specialty: Specialty) {
  const focus =
    /interventional/i.test(doctor.title) && specialty === "Cardiology"
      ? "أمراض القلب التداخلية"
      : /electrophysi/i.test(doctor.title) && specialty === "Cardiology"
        ? "كهرباء القلب وأمراض القلب"
        : SPECIALTIES[specialty].label;
  return `${rolePrefix(doctor.title)} في ${focus}`;
}

function arabicQualifications(value: string, specialty: Specialty) {
  const qualifications: string[] = [];
  const has = (pattern: RegExp) => pattern.test(value);
  if (has(/\bMBBS\b|\bMBChB\b/i)) qualifications.push("بكالوريوس الطب والجراحة");
  if (has(/\bMS\b/i)) qualifications.push("ماجستير الجراحة");
  if (has(/\bMD\b/i)) qualifications.push("دكتوراه في الطب");
  if (has(/\bMCh\b|\bDM\b|\bDrNB\b/i)) qualifications.push(`تخصص دقيق في ${SPECIALTIES[specialty].label}`);
  if (has(/\bDNB\b/i)) qualifications.push("دبلوم البورد الوطني");
  if (has(/\bMRCP\b/i)) qualifications.push("عضوية الكلية الملكية للأطباء");
  if (has(/\bFRCS\b/i)) qualifications.push("زمالة الكلية الملكية للجراحين");
  if (has(/\bFRCP\b|\bFACC\b|\bFESC\b/i)) qualifications.push("زمالة مهنية دولية");
  if (has(/\bPhD\b/i)) qualifications.push("دكتوراه بحثية");
  if (has(/\bMSc\b/i)) qualifications.push("درجة ماجستير");
  if (has(/Fellowship|Diploma|Certificate|Certification/i)) qualifications.push("تدريب واعتماد تخصصي");
  return [...new Set(qualifications)].join("، ") || `تدريب تخصصي في ${SPECIALTIES[specialty].label}`;
}

function translatedProcedures(doctor: Doctor) {
  return doctor.procedures.map((procedure) => {
    const translated = TAXONOMY_AR[procedure];
    if (!translated) throw new Error(`Missing Arabic procedure label: ${procedure}`);
    return translated;
  });
}

function recordsContext(specialty: Specialty) {
  if (specialty === "Hematology" || specialty === "Pediatric Hematology") {
    return "تبدأ المطابقة بمراجعة تعداد الدم وتقارير نخاع العظم والتشخيص الجزيئي والعلاجات السابقة";
  }
  if (specialty === "Cardiology" || specialty === "Cardiac Surgery") {
    return "تبدأ المطابقة بمراجعة تخطيط القلب والإيكو وتصوير الشرايين والتقارير الجراحية والأدوية الحالية";
  }
  if (specialty === "Pediatric Cardiac Surgery") {
    return "تبدأ المطابقة بمراجعة تشخيص عيب القلب الخلقي والإيكو والقسطرة والتقارير الجراحية السابقة";
  }
  if (specialty === "Bariatric Surgery") {
    return "تبدأ المطابقة بمراجعة مؤشر كتلة الجسم والأمراض المصاحبة والتغذية والفحوصات وعمليات السمنة السابقة";
  }
  return "تبدأ المطابقة بمراجعة الرنين أو الأشعة المقطعية والفحص العصبي والتقارير الجراحية والعلاجات السابقة";
}

function arabicBio(
  doctor: Doctor,
  specialty: Specialty,
  name: string,
  title: string,
  hospital: string,
  city: string,
  procedures: string[],
) {
  const years = experienceYears(doctor.experience);
  const yearsCopy = years > 0 ? `بخبرة مهنية منشورة تتجاوز ${years} سنة` : "بخبرة مهنية منشورة";
  const first = procedures[0] ?? SPECIALTIES[specialty].label;
  const second = procedures[1] ?? first;
  const third = procedures[2] ?? second;
  const hierarchy = `يُنظَّم الملف في دليل GAF Healthcare تحت الهند / ${city} / ${SPECIALTIES[specialty].label} / ${first}، مع الحفاظ على مفاتيح البلد والمدينة والتخصص والإجراء للبحث والمقارنة.`;
  const safety = `${recordsContext(specialty)}، ثم رأي طبي عن بُعد قبل تثبيت المستشفى أو خطة السفر. ملاءمة ${first} أو ${second} قرار سريري بعد مراجعة طبيب مرخّص؛ والإدراج معلوماتي وليس ترتيبًا للأطباء أو ضمانًا للنتيجة.`;
  const templates = [
    `${name} هو ${title} في ${hospital}، ${city}، الهند، ${yearsCopy}. تشمل الإجراءات المرتبطة بخبرته ${first} و${second} و${third}. يساعد ملفه ${SPECIALTIES[specialty].patient} على فهم الخبرة المنشورة وتجهيز السجلات اللازمة للرأي الطبي. ${hierarchy} ${safety}`,
    `يقدم الدليل العربي ملف ${name} بصفته ${title} في ${hospital} بمدينة ${city}، الهند، ${yearsCopy}. ترتبط صفحته بخيارات مثل ${first} و${second} و${third} ضمن رعاية متعددة التخصصات. صُممت المعلومات لخدمة ${SPECIALTIES[specialty].patient} من دون ادعاء أفضلية. ${hierarchy} ${safety}`,
    `ملف ${name} مخصص للباحثين عن ${title} في ${city}، الهند. يعمل في ${hospital}، ${yearsCopy}، وتتضمن خبرته المنشورة ${first} و${second} و${third}. توضح الصفحة الصلة بين الطبيب والمستشفى والإجراء وتدعم طلب تقييم أولي منظم. ${hierarchy} ${safety}`,
    `${name}، ${title} في ${hospital}، ${city}، الهند، ${yearsCopy}. يعرض الملف مجالات مرتبطة مثل ${first} و${second} و${third} لمساعدة المرضى الدوليين في فرز الخيارات وتجهيز ملف طبي كامل. لا تُستنتج الملاءمة من اسم الإجراء وحده. ${hierarchy} ${safety}`,
    `عند البحث عن ${SPECIALTIES[specialty].label} في الهند، يعرض GAF Healthcare ملف ${name} في ${hospital} بمدينة ${city}. وهو ${title} ${yearsCopy}، وتشمل الإجراءات المطابقة ${first} و${second} و${third}. تركز الصفحة على الأدلة والسجلات المطلوبة قبل السفر. ${hierarchy} ${safety}`,
    `يربط ملف ${name} بين ${hospital} ومدينة ${city} وتخصص ${SPECIALTIES[specialty].label} في الهند. وهو ${title} ${yearsCopy}، مع خبرة مرتبطة بـ${first} و${second} و${third}. يمكن استخدام الملف لمقارنة الاختصاص والإجراءات والموقع قبل طلب رأي طبي. ${hierarchy} ${safety}`,
  ];
  return templates[hash(doctor.slug) % templates.length];
}

const targetDoctors = catalogDoctors.filter((doctor) =>
  Object.hasOwn(SPECIALTIES, doctor.specialty),
);
const expectedTotal = Object.values(SPECIALTIES).reduce((total, row) => total + row.count, 0);
if (targetDoctors.length !== expectedTotal) {
  throw new Error(`Expected ${expectedTotal} target doctors, found ${targetDoctors.length}`);
}
for (const [specialty, config] of Object.entries(SPECIALTIES)) {
  const count = targetDoctors.filter((doctor) => doctor.specialty === specialty).length;
  if (count !== config.count) throw new Error(`Expected ${config.count} ${specialty} doctors, found ${count}`);
}

const overlays: Record<string, DoctorPatch> = { ...cms.doctorOverrides };
for (const doctor of targetDoctors) {
  const specialty = doctor.specialty as Specialty;
  const city = CITY_AR[doctor.city];
  const hospital = HOSPITAL_NAMES_AR[doctor.hospitalSlug];
  if (!city) throw new Error(`Missing Arabic city for ${doctor.city}`);
  if (!hospital) throw new Error(`Missing Arabic hospital for ${doctor.hospitalSlug}`);

  const name = arabicName(doctor);
  const title = arabicTitle(doctor, specialty);
  const procedures = translatedProcedures(doctor);
  const qualifications = arabicQualifications(doctor.qualifications, specialty);
  overlays[doctor.slug] = {
    status: overlays[doctor.slug]?.status ?? "published",
    name,
    title,
    qualifications,
    experience: `${experienceYears(doctor.experience)}+ سنة خبرة`,
    languages: LANGUAGES_AR[doctor.city] ?? "الإنجليزية، الهندية",
    imageAlt: `${name}، ${title} في ${hospital}، ${city} — دليل GAF Healthcare لـ${SPECIALTIES[specialty].label} في الهند حسب البلد والمدينة والتخصص والإجراء`,
    specializations: [
      SPECIALTIES[specialty].label,
      `تقييم وعلاج ${SPECIALTIES[specialty].patient}`,
      `إجراءات مختارة: ${procedures.slice(0, 3).join("، ")}`,
    ],
    proceduresExpertise: procedures,
    education: [`المؤهلات المنشورة: ${qualifications}`],
    affiliations: [`يمارس عمله في ${hospital}، ${city}، الهند`],
    memberships: doctor.memberships.length
      ? [`يتضمن السجل الإنجليزي المرجعي ${doctor.memberships.length} عضويات مهنية منشورة`]
      : [],
    awards: doctor.awards.length
      ? [`يتضمن السجل الإنجليزي المرجعي ${doctor.awards.length} جوائز أو تكريمات منشورة`]
      : [],
    research: doctor.research.length
      ? [`يتضمن السجل الإنجليزي المرجعي ${doctor.research.length} مساهمات بحثية منشورة`]
      : [],
    bio: arabicBio(doctor, specialty, name, title, hospital, city, procedures),
  };
}

cms.doctorOverrides = overlays;
writeFileSync(cmsPath, `${JSON.stringify(cms, null, 2)}\n`);
console.log(
  `Wrote ${targetDoctors.length} Arabic cardiac, hematology, bariatric, and neurosurgery overlays; total doctors ${Object.keys(overlays).length}`,
);
