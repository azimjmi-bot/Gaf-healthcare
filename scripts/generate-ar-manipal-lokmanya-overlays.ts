/**
 * Arabic CMS overlays for newly imported Manipal Baner + Lokmanya Pune doctors
 * and Lokmanya hospital campuses. Preserves existing published overlays.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { catalogDoctors, type Doctor } from "../src/lib/doctors";
import { HOSPITAL_NAMES_AR } from "../src/lib/i18n/hospital-names-ar";
import { collapseRepeatedPlaces, withCampus } from "../src/lib/i18n/place-labels";
import { TAXONOMY_AR } from "../src/lib/i18n/taxonomy-ar";
import { translationStatus, type CatalogCms, type DoctorPatch, type HospitalPatch } from "../src/lib/cms/catalog-types";
import {
  LOKMANYA_PUNE_SLUGS,
  MANIPAL_BANER_SLUG,
  isLokmanyaCampus,
} from "../src/lib/hospitals";

const root = join(import.meta.dirname, "..");
const cmsPath = process.env.CATALOG_CMS_PATH ?? join(root, "content/ar/catalog-cms.json");
const cms = JSON.parse(readFileSync(cmsPath, "utf8")) as CatalogCms;
const report = JSON.parse(
  readFileSync(join(root, "docs/manipal-lokmanya-import-report.json"), "utf8"),
) as { manipal: { baner_faculty_after: number }; lokmanya: { faculty_after: number } };

const SPECIALTY_META: Record<
  string,
  { label: string; title: string; patient: string; records: string }
> = {
  "Radiation Oncology": {
    label: "علاج الأورام بالإشعاع",
    title: "اختصاصي علاج الأورام بالإشعاع",
    patient: "مرضى الأورام الذين يراجعون خيارات الإشعاع",
    records: "تبدأ المطابقة بمراجعة تقارير الأورام والتصوير وخطة الإشعاع السابقة",
  },
  "Surgical Oncology": {
    label: "جراحة الأورام",
    title: "جرّاح أورام",
    patient: "مرضى الأورام الذين يراجعون خيارات الجراحة",
    records: "تبدأ المطابقة بمراجعة تقارير الأورام والتصوير والتقارير الجراحية السابقة",
  },
  "Medical Oncology": {
    label: "طب الأورام",
    title: "طبيب طب الأورام",
    patient: "مرضى الأورام الذين يراجعون العلاج الدوائي",
    records: "تبدأ المطابقة بمراجعة تقارير الأورام والتحاليل وخطط العلاج الدوائي السابقة",
  },
  Hematology: {
    label: "أمراض الدم",
    title: "طبيب أمراض دم",
    patient: "مرضى اضطرابات الدم والأورام الدموية",
    records: "تبدأ المطابقة بمراجعة تحاليل الدم وخزعات النخاع والتقارير السابقة",
  },
  "Cardiac Surgery": {
    label: "جراحة القلب",
    title: "جرّاح قلب",
    patient: "مرضى جراحة القلب والشرايين",
    records: "تبدأ المطابقة بمراجعة تخطيط القلب والتصوير الوعائي والتقارير الجراحية السابقة",
  },
  Cardiology: {
    label: "أمراض القلب",
    title: "طبيب قلب",
    patient: "مرضى القلب والقسطرة",
    records: "تبدأ المطابقة بمراجعة تخطيط القلب والإيكو وتقارير القسطرة السابقة",
  },
  ENT: {
    label: "أنف وأذن وحنجرة",
    title: "جرّاح أنف وأذن وحنجرة",
    patient: "مرضى الأنف والأذن والحنجرة",
    records: "تبدأ المطابقة بمراجعة تنظير الأنف والحنجرة والتصوير والتقارير السابقة",
  },
  Gastroenterology: {
    label: "أمراض الجهاز الهضمي",
    title: "طبيب جهاز هضمي",
    patient: "مرضى الجهاز الهضمي والكبد",
    records: "تبدأ المطابقة بمراجعة التنظير وتحاليل الكبد والتصوير والتقارير السابقة",
  },
  "Surgical Gastroenterology": {
    label: "جراحة الجهاز الهضمي",
    title: "جرّاح جهاز هضمي",
    patient: "مرضى جراحة الجهاز الهضمي والكبد والبنكرياس",
    records: "تبدأ المطابقة بمراجعة التصوير والتقارير الجراحية وتنظير الجهاز الهضمي السابق",
  },
  Urology: {
    label: "المسالك البولية",
    title: "طبيب مسالك بولية",
    patient: "مرضى المسالك البولية والكلى والجهاز التناسلي الذكري",
    records: "تبدأ المطابقة بمراجعة تحاليل البول والتصوير والتقارير الجراحية السابقة",
  },
  "Spine Surgery": {
    label: "جراحة العمود الفقري",
    title: "جرّاح عمود فقري",
    patient: "مرضى العمود الفقري والنخاع الشوكي",
    records: "تبدأ المطابقة بمراجعة الرنين والتصوير والتقارير الجراحية السابقة",
  },
  Pulmonology: {
    label: "أمراض الرئة",
    title: "طبيب أمراض رئة",
    patient: "مرضى الرئة والجهاز التنفسي",
    records: "تبدأ المطابقة بمراجعة وظائف الرئة والأشعة وتنظير القصبات والتقارير السابقة",
  },
  Orthopedics: {
    label: "جراحة العظام",
    title: "جرّاح عظام",
    patient: "مرضى المفاصل والعظام والإصابات",
    records: "تبدأ المطابقة بمراجعة صور المفاصل والعظام والفحص الحركي والتقارير الجراحية السابقة",
  },
  Ophthalmology: {
    label: "طب العيون",
    title: "طبيب عيون",
    patient: "مرضى العيون والبصر",
    records: "تبدأ المطابقة بمراجعة حدة البصر وفحص الشبكية والتصوير العيني والتقارير الجراحية السابقة",
  },
  Gynecology: {
    label: "أمراض النساء",
    title: "طبيبة/طبيب نساء وتوليد",
    patient: "النساء الباحثات عن رعاية نسائية وجراحية",
    records: "تبدأ المطابقة بمراجعة التصوير النسائي والتحاليل والتقارير الجراحية والتاريخ الإنجابي",
  },
  Dentistry: {
    label: "طب الأسنان",
    title: "طبيب أسنان",
    patient: "مرضى طب الأسنان والفم",
    records: "تبدأ المطابقة بمراجعة صور الأسنان والفحص الفموي والتقارير السابقة",
  },
  Neurosurgery: {
    label: "جراحة المخ والأعصاب",
    title: "جرّاح مخ وأعصاب",
    patient: "مرضى جراحة المخ والأعصاب",
    records: "تبدأ المطابقة بمراجعة الرنين أو الأشعة المقطعية والفحص العصبي والتقارير الجراحية السابقة",
  },
  Neurology: {
    label: "طب الأعصاب",
    title: "طبيب أعصاب",
    patient: "مرضى الجهاز العصبي والسكتة والصرع",
    records: "تبدأ المطابقة بمراجعة الرنين أو الأشعة المقطعية وتخطيط الدماغ والفحص العصبي والتقارير السابقة",
  },
  Nephrology: {
    label: "أمراض الكلى",
    title: "طبيب كلى",
    patient: "مرضى الكلى والغسيل الكلوي والزراعة",
    records: "تبدأ المطابقة بمراجعة وظائف الكلى وتحليل البول وسجلات الغسيل الكلوي والتقارير السابقة",
  },
  "Cosmetic Surgery": {
    label: "الجراحة التجميلية",
    title: "جرّاح تجميلي",
    patient: "المرضى الباحثين عن جراحة تجميلية ترميمية أو اختيارية",
    records: "تبدأ المطابقة بمراجعة التصوير والفحص السريري والتقارير الجراحية السابقة",
  },
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

const KNOWN: Record<string, string> = {
  abhijit: "أبهيجيت",
  joshi: "جوشي",
  amit: "أميت",
  shona: "شونا",
  nag: "ناغ",
  manish: "مانيش",
  mali: "مالي",
  narendra: "ناريندرا",
  vaidya: "فايديا",
  rajesh: "راجيش",
  kaushish: "كوشيش",
  pune: "بونه",
};

function transliterateToken(raw: string) {
  const token = raw.toLowerCase().replace(/[^a-z]/g, "");
  if (!token) return "";
  if (KNOWN[token]) return KNOWN[token];
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

function arabicName(doctor: Doctor, existing?: DoctorPatch) {
  if (existing?.name && /[\u0600-\u06ff]/.test(existing.name)) return existing.name;
  const clean = doctor.name
    .replace(/\b(?:Dr|Doctor|Dt|Ms|Mrs|Mr|Prof)\.?\b/gi, "")
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

function arabicQualifications(raw: string, specialty: string) {
  const label = SPECIALTY_META[specialty]?.label ?? taxonomyLabel(specialty);
  if (!raw.trim()) return `تدريب تخصصي في ${label}`;
  const bits: string[] = [];
  if (/\bMBBS\b/i.test(raw)) bits.push("بكالوريوس الطب والجراحة");
  if (/\bMD\b/i.test(raw)) bits.push("دكتوراه في الطب");
  if (/\bMS\b/i.test(raw)) bits.push("ماجستير الجراحة");
  if (/\bDNB\b|\bDrNB\b/i.test(raw)) bits.push("دبلوم البورد الوطني");
  if (/\bDM\b|\bMCh\b|\bM\.Ch\b/i.test(raw)) bits.push(`تخصص دقيق في ${label}`);
  if (/Fellowship|Diploma|Certificate/i.test(raw)) bits.push("تدريب واعتماد تخصصي");
  return [...new Set(bits)].join("، ") || `تدريب تخصصي في ${label}`;
}

function taxonomyLabel(name: string) {
  return TAXONOMY_AR[name] ?? name;
}

function translatedProcedures(doctor: Doctor, _specialty: string) {
  // Evidence-gated: never invent a specialty label as a procedure when EN is empty.
  // Empty EN proceduresExpertise must stay empty in AR overlays too.
  return doctor.procedures
    .map((name) => TAXONOMY_AR[name] ?? name)
    .filter(Boolean)
    .slice(0, 8);
}

function isTargetDoctor(doctor: Doctor) {
  const slugs = doctor.hospitalSlugs?.length ? doctor.hospitalSlugs : [doctor.hospitalSlug];
  return slugs.some((slug) => slug === MANIPAL_BANER_SLUG || isLokmanyaCampus(slug));
}

function arabicBio(doctor: Doctor, name: string, title: string, hospital: string) {
  const meta = SPECIALTY_META[doctor.specialty];
  if (!meta) throw new Error(`Missing specialty meta for ${doctor.specialty} (${doctor.slug})`);
  const city = "بونه";
  const years = experienceYears(doctor.experience);
  const yearsCopy = years > 0 ? `بخبرة مهنية منشورة تتجاوز ${years} سنة` : "بخبرة مهنية منشورة";
  const procedures = translatedProcedures(doctor, doctor.specialty);
  const first = procedures[0] ?? meta.label;
  const second = procedures[1] ?? first;
  const third = procedures[2] ?? second;
  const hierarchy =
    procedures.length > 0
      ? `يُنظَّم الملف في دليل GAF Healthcare تحت الهند / ${city} / ${meta.label} / ${first}، مع الحفاظ على مفاتيح البلد والمدينة والتخصص والإجراء للبحث والمقارنة.`
      : `يُنظَّم الملف في دليل GAF Healthcare تحت الهند / ${city} / ${meta.label}، مع الحفاظ على مفاتيح البلد والمدينة والتخصص للبحث والمقارنة دون إجراءات فردية موثّقة بعد.`;
  const safety = `${meta.records}، ثم رأي طبي عن بُعد قبل تثبيت المستشفى أو خطة السفر. ملاءمة خطة ${meta.label}${procedures.length > 0 ? ` أو ${first}` : ""} قرار سريري بعد مراجعة طبيب مرخّص؛ والإدراج معلوماتي وليس ترتيبًا للأطباء أو ضمانًا للنتيجة.`;
  const templates = [
    `${name} هو ${title} في ${hospital}، ${city}، الهند، ${yearsCopy}. تشمل الإجراءات المرتبطة بخبرته ${first} و${second} و${third}. يساعد ملفه ${meta.patient} على فهم الخبرة المنشورة وتجهيز السجلات اللازمة للرأي الطبي. ${hierarchy} ${safety}`,
    `يقدم الدليل العربي ملف ${name} بصفته ${title} في ${hospital} بمدينة ${city}، الهند، ${yearsCopy}. ترتبط صفحته بخيارات مثل ${first} و${second} و${third} ضمن رعاية متعددة التخصصات. صُممت المعلومات لخدمة ${meta.patient} من دون ادعاء أفضلية. ${hierarchy} ${safety}`,
    `ملف ${name} مخصص للباحثين عن ${title} في ${city}، الهند. يعمل في ${hospital}، ${yearsCopy}، وتتضمن خبرته المنشورة ${first} و${second} و${third}. توضح الصفحة الصلة بين الطبيب والمستشفى والإجراء وتدعم طلب تقييم أولي منظم. ${hierarchy} ${safety}`,
    `${name}، ${title} في ${hospital}، ${city}، الهند، ${yearsCopy}. يعرض الملف مجالات مرتبطة مثل ${first} و${second} و${third} لمساعدة المرضى الدوليين في فرز الخيارات وتجهيز ملف طبي كامل. لا تُستنتج الملاءمة من اسم الإجراء وحده. ${hierarchy} ${safety}`,
    `عند البحث عن ${meta.label} في الهند، يعرض GAF Healthcare ملف ${name} في ${hospital} بمدينة ${city}. وهو ${title} ${yearsCopy}، وتشمل الإجراءات المطابقة ${first} و${second} و${third}. تركز الصفحة على الأدلة والسجلات المطلوبة قبل السفر. ${hierarchy} ${safety}`,
    `يربط ملف ${name} بين ${hospital} ومدينة ${city} وتخصص ${meta.label} في الهند. وهو ${title} ${yearsCopy}، مع خبرة مرتبطة بـ${first} و${second} و${third}. يمكن استخدام الملف لمقارنة الاختصاص والإجراءات والموقع قبل طلب رأي طبي. ${hierarchy} ${safety}`,
  ];
  return collapseRepeatedPlaces(templates[hash(doctor.slug) % templates.length]);
}

const targets = catalogDoctors.filter(isTargetDoctor);
if (targets.length < report.manipal.baner_faculty_after) {
  throw new Error(
    `Expected at least ${report.manipal.baner_faculty_after} Baner-linked doctors in catalog runtime; found ${targets.length} Manipal/Lokmanya targets`,
  );
}

const overlays: Record<string, DoctorPatch> = { ...cms.doctorOverrides };
let wroteDoctors = 0;
for (const doctor of targets) {
  const existing = overlays[doctor.slug];
  if (existing && translationStatus(existing) === "published" && existing.bio && existing.name) {
    // Keep AR procedure lists length-aligned with evidence-gated EN expertise.
    const syncedProcedures = translatedProcedures(doctor, doctor.specialty);
    if ((existing.proceduresExpertise || []).length !== syncedProcedures.length) {
      existing.proceduresExpertise = syncedProcedures;
    }
    // Refresh affiliations note for multi-campus merges if Lokmanya/Manipal missing in AR affiliations.
    const aff = existing.affiliations ?? [];
    const needsLok = doctor.hospitalSlugs.some(isLokmanyaCampus) && !aff.some((line) => /لوكمانيا/.test(line));
    const needsManipal =
      doctor.hospitalSlugs.includes(MANIPAL_BANER_SLUG) && !aff.some((line) => /مانيبال/.test(line));
    if (needsLok || needsManipal) {
      const hospital = HOSPITAL_NAMES_AR[doctor.hospitalSlug];
      if (hospital) {
        existing.affiliations = [
          ...aff,
          ...(needsManipal ? [`يمارس عمله أيضًا في مانيبال هوسبيتالز، بانر، بونه، الهند`] : []),
          ...(needsLok
            ? doctor.hospitalSlugs
                .filter(isLokmanyaCampus)
                .map((slug) => `يمارس عمله أيضًا في ${HOSPITAL_NAMES_AR[slug]}، بونه، الهند`)
            : []),
        ];
      }
    }
    continue;
  }
  const meta = SPECIALTY_META[doctor.specialty];
  if (!meta) throw new Error(`Unsupported specialty for AR overlay: ${doctor.specialty} (${doctor.slug})`);
  const hospital = HOSPITAL_NAMES_AR[doctor.hospitalSlug];
  if (!hospital) throw new Error(`Missing Arabic hospital for ${doctor.hospitalSlug}`);
  const name = arabicName(doctor, existing);
  const title = meta.title;
  const procedures = translatedProcedures(doctor, doctor.specialty);
  const qualifications = arabicQualifications(doctor.qualifications, doctor.specialty);
  overlays[doctor.slug] = {
    status: "published",
    name,
    title,
    qualifications,
    experience: `${experienceYears(doctor.experience)}+ سنة خبرة`,
    languages: "الإنجليزية، الهندية، الماراثية",
    imageAlt: `${name}، ${title} في ${withCampus(hospital, "بونه")} — دليل GAF Healthcare لـ${meta.label} في الهند حسب البلد والمدينة والتخصص والإجراء`,
    specializations: [
      meta.label,
      `تقييم وعلاج ${meta.patient}`,
      ...(procedures.length > 0
        ? [`إجراءات مختارة: ${procedures.slice(0, 3).join("، ")}`]
        : [`تخصص ${meta.label} دون إجراءات فردية موثّقة في الدليل بعد`]),
    ],
    proceduresExpertise: procedures,
    education: [`المؤهلات المنشورة: ${qualifications}`],
    affiliations: doctor.hospitalSlugs.map((slug) => {
      const ar = HOSPITAL_NAMES_AR[slug] ?? slug;
      return `يمارس عمله في ${withCampus(ar, "بونه", "الهند")}`;
    }),
    memberships: [],
    awards: [],
    research: [],
    bio: arabicBio(doctor, name, title, hospital),
  };
  wroteDoctors += 1;
}

const hospitalOverlays: Record<string, HospitalPatch> = { ...cms.hospitalOverrides };

// Refresh Manipal Baner focus from live faculty specialties.
const banerFaculty = catalogDoctors.filter((doctor) =>
  (doctor.hospitalSlugs?.length ? doctor.hospitalSlugs : [doctor.hospitalSlug]).includes(MANIPAL_BANER_SLUG),
);
const banerSpecs = [...new Set(banerFaculty.map((doctor) => SPECIALTY_META[doctor.specialty]?.label).filter(Boolean))];
hospitalOverlays[MANIPAL_BANER_SLUG] = {
  ...hospitalOverlays[MANIPAL_BANER_SLUG],
  status: "published",
  name: hospitalOverlays[MANIPAL_BANER_SLUG]?.name || "مانيبال هوسبيتالز، بانر",
  bio:
    hospitalOverlays[MANIPAL_BANER_SLUG]?.bio ||
    "مانيبال هوسبيتالز، بانر حرم مستقل لمانيبال في بانر، بونه، ماهاراشترا، الهند، ويُدرج منفصلًا عن حروم ساهيادري وعن مواقع مانيبال الأخرى في دليل GAF Healthcare. العنوان المنشور من مانيبال هوسبيتالز هو طريق بانر-مهالونجي الرئيسي، بانر، بونه 411045، ماهاراشترا. يشمل هاتف الاستفسار المنشور 020 6813 8888. يبني GAF Healthcare علاقات التخصص والأطباء من السجلات المؤكدة لهذا الحرم فقط، ولا يختلق سعة أسرّة أو وحدات عناية مركزة أو خطوط خدمات غير موثّقة خارج أدلة الهيئة الطبية.",
  summary:
    hospitalOverlays[MANIPAL_BANER_SLUG]?.summary ||
    "حرم مانيبال هوسبيتالز المستقل في بانر، بونه. العنوان: طريق بانر-مهالونجي الرئيسي، بانر، بونه 411045. علاقات الهيئة الطبية مبنية من الأطباء الموثّقين فقط.",
  languages: "الإنجليزية، الهندية، الماراثية",
  focus: banerSpecs.length
    ? `تخصصات الهيئة الطبية المنتسبة: ${banerSpecs.join(" · ")}`
    : "تخصصات الهيئة الطبية المنتسبة: قيد المزامنة من الأطباء الموثّقين",
  icu: "",
  imageAlt:
    hospitalOverlays[MANIPAL_BANER_SLUG]?.imageAlt ||
    "مانيبال هوسبيتالز، بانر في بونه، الهند — دليل GAF Healthcare للمستشفيات حسب البلد والمدينة والتخصص",
};

const lokMeta: Record<(typeof LOKMANYA_PUNE_SLUGS)[number], { address: string; hook: string }> = {
  "lokmanya-hospital-sb-road": {
    address: "402/A طريق غوخالي ناغار، فيتال بابا تشوك، قرب طريق سيناباتي بابات، بونه 411016، ماهاراشترا",
    hook: "حرم إس بي رود (مستشفى لوكمانيا للجراحة التخصصية) ضمن مجموعة لوكمانيا في بونه.",
  },
  "lokmanya-hospital-nigdi": {
    address: "القطاع 27، طريق تيلاك، القطاع 24، برادهيكاران، نيغدي، بونه 411044، ماهاراشترا",
    hook: "حرم نيغدي المستقل ضمن مجموعة لوكمانيا في بونه.",
  },
  "lokmanya-hospital-chinchwad": {
    address: "314/B طريق تشينشواد غاون، أوديوغ ناغار، تشينشواد، بونه 411033، ماهاراشترا",
    hook: "حرم تشينشواد المستقل ضمن مجموعة لوكمانيا في بونه.",
  },
};

let wroteHospitals = 0;
for (const slug of LOKMANYA_PUNE_SLUGS) {
  const name = HOSPITAL_NAMES_AR[slug];
  if (!name) throw new Error(`Missing Arabic hospital name for ${slug}`);
  const faculty = catalogDoctors.filter((doctor) =>
    (doctor.hospitalSlugs?.length ? doctor.hospitalSlugs : [doctor.hospitalSlug]).includes(slug),
  );
  const specs = [...new Set(faculty.map((doctor) => SPECIALTY_META[doctor.specialty]?.label).filter(Boolean))];
  const meta = lokMeta[slug];
  hospitalOverlays[slug] = {
    status: "published",
    name,
    bio: `${name} حرم مستقل لوكمانيا في بونه، ماهاراشترا، الهند. ${meta.hook} العنوان المنشور من لوكمانيا هو ${meta.address}. هاتف المواعيد المنشور للمجموعة 93 0707 6767، وخط الطوارئ 1066. يبني GAF Healthcare علاقات التخصص والأطباء من السجلات المؤكدة لهذا الحرم فقط، ولا يختلق سعة أسرّة أو وحدات عناية مركزة أو خطوط خدمات غير موثّقة خارج أدلة الهيئة الطبية.`,
    summary: `${name} في بونه. حرم لوكمانيا مستقل؛ علاقات الهيئة الطبية مبنية من الأطباء الموثّقين فقط.`,
    languages: "الإنجليزية، الهندية، الماراثية",
    focus: specs.length
      ? `تخصصات الهيئة الطبية المنتسبة: ${specs.join(" · ")}`
      : "تخصصات الهيئة الطبية المنتسبة: قيد المزامنة من الأطباء الموثّقين",
    icu: "",
    imageAlt: `${name} في بونه، الهند — دليل GAF Healthcare للمستشفيات حسب البلد والمدينة والتخصص`,
  };
  wroteHospitals += 1;
}

cms.doctorOverrides = overlays;
cms.hospitalOverrides = hospitalOverlays;
writeFileSync(cmsPath, `${JSON.stringify(cms, null, 2)}\n`);
console.log(
  JSON.stringify(
    {
      wroteDoctors,
      wroteHospitals,
      targetDoctors: targets.length,
      totalDoctorOverrides: Object.keys(overlays).length,
    },
    null,
    2,
  ),
);
