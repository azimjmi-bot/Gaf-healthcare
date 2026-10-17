#!/usr/bin/env node
/**
 * Builds Arabic CMS overlays for the remaining doctor specialties requested
 * after oncology, cardiac, hematology, bariatric, and neurosurgery. Routing
 * and relationship fields stay on the English source record so Country → City
 * → Specialty → Procedure URLs remain stable.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { catalogDoctors, type Doctor } from "../src/lib/doctors";
import { HOSPITAL_NAMES_AR } from "../src/lib/i18n/hospital-names-ar";
import { collapseRepeatedPlaces, withCampus } from "../src/lib/i18n/place-labels";
import { TAXONOMY_AR } from "../src/lib/i18n/taxonomy-ar";
import type { CatalogCms, DoctorPatch } from "../src/lib/cms/catalog-types";

const root = join(import.meta.dirname, "..");
const cmsPath = process.env.CATALOG_CMS_PATH ?? join(root, "content/ar/catalog-cms.json");
const cms = JSON.parse(readFileSync(cmsPath, "utf8")) as CatalogCms;

const SPECIALTIES = {
  "Cosmetic Surgery": {
    count: 74,
    label: "الجراحة التجميلية",
    patient: "المرضى الباحثين عن جراحة تجميلية ترميمية أو اختيارية",
  },
  ENT: {
    count: 103,
    label: "أنف وأذن وحنجرة",
    patient: "مرضى الأنف والأذن والحنجرة",
  },
  Gastroenterology: {
    count: 153,
    label: "أمراض الجهاز الهضمي",
    patient: "مرضى الجهاز الهضمي والكبد",
  },
  "Surgical Gastroenterology": {
    count: 107,
    label: "جراحة الجهاز الهضمي",
    patient: "مرضى جراحة الجهاز الهضمي والكبد والبنكرياس",
  },
  Urology: {
    count: 137,
    label: "المسالك البولية",
    patient: "مرضى المسالك البولية والكلى والجهاز التناسلي الذكري",
  },
  "Spine Surgery": {
    count: 63,
    label: "جراحة العمود الفقري",
    patient: "مرضى العمود الفقري والنخاع الشوكي",
  },
  Pulmonology: {
    count: 112,
    label: "أمراض الرئة",
    patient: "مرضى الرئة والجهاز التنفسي",
  },
  "Pediatric Orthopaedic": {
    count: 13,
    label: "عظام الأطفال",
    patient: "الأطفال المصابين بتشوهات أو إصابات عظمية وأسرهم",
  },
  Orthopedics: {
    count: 208,
    label: "جراحة العظام",
    patient: "مرضى المفاصل والعظام والإصابات",
  },
  Ophthalmology: {
    count: 102,
    label: "طب العيون",
    patient: "مرضى العيون والبصر",
  },
  Gynecology: {
    count: 187,
    label: "أمراض النساء",
    patient: "النساء الباحثات عن رعاية نسائية وجراحية",
  },
  Neurology: {
    count: 111,
    label: "طب الأعصاب",
    patient: "مرضى الجهاز العصبي والسكتة والصرع",
  },
  Nephrology: {
    count: 107,
    label: "أمراض الكلى",
    patient: "مرضى الكلى والغسيل الكلوي والزراعة",
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
  amit: "أميت",
  anand: "أناند",
  anil: "أنيل",
  ankit: "أنكيت",
  ankur: "أنكور",
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
    /interventional/i.test(doctor.title) && specialty === "Pulmonology"
      ? "أمراض الرئة التداخلية"
      : /reproductive|ivf|infertility/i.test(doctor.title) && specialty === "Gynecology"
        ? "أمراض النساء والخصوبة"
        : /retina|vitreo/i.test(doctor.title) && specialty === "Ophthalmology"
          ? "طب العيون والشبكية"
          : SPECIALTIES[specialty].label;
  return `${rolePrefix(doctor.title)} في ${focus}`;
}

function arabicQualifications(value: string, specialty: Specialty) {
  const qualifications: string[] = [];
  const has = (pattern: RegExp) => pattern.test(value);
  if (has(/\bMBBS\b|\bMBChB\b/i)) qualifications.push("بكالوريوس الطب والجراحة");
  if (has(/\bMS\b/i)) qualifications.push("ماجستير الجراحة");
  if (has(/\bMD\b/i)) qualifications.push("دكتوراه في الطب");
  if (has(/\bMCh\b|\bDM\b|\bDrNB\b/i)) {
    qualifications.push(`تخصص دقيق في ${SPECIALTIES[specialty].label}`);
  }
  if (has(/\bDNB\b/i)) qualifications.push("دبلوم البورد الوطني");
  if (has(/\bMRCP\b/i)) qualifications.push("عضوية الكلية الملكية للأطباء");
  if (has(/\bFRCS\b|\bFRCOphth\b/i)) qualifications.push("زمالة الكلية الملكية للجراحين");
  if (has(/\bFRCP\b|\bFACS\b|\bFICO\b/i)) qualifications.push("زمالة مهنية دولية");
  if (has(/\bPhD\b/i)) qualifications.push("دكتوراه بحثية");
  if (has(/\bMSc\b/i)) qualifications.push("درجة ماجستير");
  if (has(/Fellowship|Diploma|Certificate|Certification/i)) {
    qualifications.push("تدريب واعتماد تخصصي");
  }
  return [...new Set(qualifications)].join("، ") || `تدريب تخصصي في ${SPECIALTIES[specialty].label}`;
}

function translatedProcedures(doctor: Doctor, specialty: Specialty) {
  const procedures = doctor.procedures.map((procedure) => {
    const translated = TAXONOMY_AR[procedure];
    if (!translated) throw new Error(`Missing Arabic procedure label: ${procedure}`);
    return translated;
  });
  return procedures.length ? procedures : [SPECIALTIES[specialty].label];
}

function recordsContext(specialty: Specialty) {
  switch (specialty) {
    case "Cosmetic Surgery":
      return "تبدأ المطابقة بمراجعة الصور السريرية والتاريخ الجراحي والحالة الصحية العامة والأهداف التجميلية أو الترميمية";
    case "ENT":
      return "تبدأ المطابقة بمراجعة تنظير الأنف أو الحنجرة والسمع والأشعة والتقارير الجراحية السابقة";
    case "Gastroenterology":
      return "تبدأ المطابقة بمراجعة التنظير والتحاليل الكبدية والتصوير وتقارير الخزعة والعلاجات السابقة";
    case "Surgical Gastroenterology":
      return "تبدأ المطابقة بمراجعة التنظير والأشعة المقطعية وتقارير الأورام أو الحصوات والتقارير الجراحية السابقة";
    case "Urology":
      return "تبدأ المطابقة بمراجعة تحليل البول والتصوير والتقارير الجراحية ووظائف الكلى والعلاجات السابقة";
    case "Spine Surgery":
      return "تبدأ المطابقة بمراجعة الرنين أو الأشعة المقطعية والفحص العصبي والتقارير الجراحية والعلاجات السابقة";
    case "Pulmonology":
      return "تبدأ المطابقة بمراجعة وظائف الرئة والأشعة وتنظير القصبات والتقارير السابقة";
    case "Pediatric Orthopaedic":
      return "تبدأ المطابقة بمراجعة صور العظام وتشخيص النمو والتقارير الجراحية السابقة وعمر الطفل";
    case "Orthopedics":
      return "تبدأ المطابقة بمراجعة صور المفاصل والعظام والفحص الحركي والتقارير الجراحية السابقة";
    case "Ophthalmology":
      return "تبدأ المطابقة بمراجعة حدة البصر وفحص الشبكية والتصوير العيني والتقارير الجراحية السابقة";
    case "Gynecology":
      return "تبدأ المطابقة بمراجعة التصوير النسائي والتحاليل والتقارير الجراحية والتاريخ الإنجابي";
    case "Neurology":
      return "تبدأ المطابقة بمراجعة الرنين أو الأشعة المقطعية وتخطيط الدماغ والفحص العصبي والتقارير السابقة";
    case "Nephrology":
      return "تبدأ المطابقة بمراجعة وظائف الكلى وتحليل البول وسجلات الغسيل الكلوي والتقارير السابقة";
  }
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
  return collapseRepeatedPlaces(templates[hash(doctor.slug) % templates.length]);
}

const targetDoctors = catalogDoctors.filter((doctor) => Object.hasOwn(SPECIALTIES, doctor.specialty));
const expectedTotal = Object.values(SPECIALTIES).reduce((total, row) => total + row.count, 0);
if (targetDoctors.length !== expectedTotal) {
  throw new Error(`Expected ${expectedTotal} target doctors, found ${targetDoctors.length}`);
}
for (const [specialty, config] of Object.entries(SPECIALTIES)) {
  const count = targetDoctors.filter((doctor) => doctor.specialty === specialty).length;
  if (count !== config.count) {
    throw new Error(`Expected ${config.count} ${specialty} doctors, found ${count}`);
  }
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
  const procedures = translatedProcedures(doctor, specialty);
  const qualifications = arabicQualifications(doctor.qualifications, specialty);
  overlays[doctor.slug] = {
    status: overlays[doctor.slug]?.status ?? "published",
    name,
    title,
    qualifications,
    experience: `${experienceYears(doctor.experience)}+ سنة خبرة`,
    languages: LANGUAGES_AR[doctor.city] ?? "الإنجليزية، الهندية",
    imageAlt: `${name}، ${title} في ${withCampus(hospital, city)} — دليل GAF Healthcare لـ${SPECIALTIES[specialty].label} في الهند حسب البلد والمدينة والتخصص والإجراء`,
    specializations: [
      SPECIALTIES[specialty].label,
      `تقييم وعلاج ${SPECIALTIES[specialty].patient}`,
      `إجراءات مختارة: ${procedures.slice(0, 3).join("، ")}`,
    ],
    proceduresExpertise: procedures,
    education: [`المؤهلات المنشورة: ${qualifications}`],
    affiliations: [`يمارس عمله في ${withCampus(hospital, city, "الهند")}`],
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
  `Wrote ${targetDoctors.length} Arabic remaining-specialty overlays; total doctors ${Object.keys(overlays).length}`,
);
