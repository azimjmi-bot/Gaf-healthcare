#!/usr/bin/env node
/**
 * Builds original Arabic CMS overlays for the 70 radiation oncologists.
 * English slugs, cities, specialties and procedure slugs stay untouched.
 */
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import {
  AFFILIATION_RULES,
  AIRPORT,
  AWARD_RULES,
  CITY_AR,
  EDUCATION_RULES,
  LANG_CITY,
  NAMES,
  ORG,
  PHRASE,
  ROLE_WORDS,
  TITLE_RULES,
} from "./ar-overlay-tables.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(readFileSync(join(root, "src/data/ginger-catalog.json"), "utf8"));
const cmsPath = join(root, "content/ar/catalog-cms.json");
const cms = JSON.parse(readFileSync(cmsPath, "utf8"));


const FEMALE = new Set([
  "dr-anitha-gopinath",
  "dr-dipali-bhorikar-borade",
  "dr-kalyani-premchandra",
  "dr-m-suneetha",
  "dr-mathangi-j",
  "dr-s-usha",
  "dr-sapna-nangia",
  "dr-shilpareddy-keesara",
  "dr-sravanthi-reddy-t",
  "dr-sri-sai-tejaswini-muddana",
  "dr-aditi-aggarwal-1",
  "dr-anbarasi-kumaresan",
  "dr-anita-malik",
  "dr-azmi-saundarya-k",
  "dr-charu-garg",
  "dr-divya-gupta",
  "dr-garima-singh",
  "dr-indu-bansal-aggarwal",
  "dr-khushboo-rastogi",
  "dr-neha-kakkar",
  "dr-neha-sehgal",
  "dr-s-jayalakshmi",
  "dr-sapna-manocha-verma",
  "dr-swarupa-mitra",
  "dr-vineeta-goel",
  "dr-y-nalini",
]);

function phrase(value) {
  if (!value) return value;
  if (PHRASE[value]) return PHRASE[value];
  let out = value;
  for (const [en, ar] of Object.entries(PHRASE)) {
    if (en.length > 12) out = out.split(en).join(ar);
  }
  return out;
}

function hash(slug) {
  return [...slug].reduce((n, ch) => n + ch.charCodeAt(0), 0);
}

function yearsOf(experience) {
  const m = String(experience || "").match(/(\d+)/);
  return m ? Number(m[1]) : 10;
}

function arTitle(raw, female) {
  // Only the specialty suffix the catalog appends is dropped up front. Stripping
  // every "Radiation Oncology" first — as this used to — meant that no rule
  // naming the specialty could ever match, and "Consultant, Radiation Oncology"
  // fell through to "Consultant" untranslated. Fourteen profiles shipped that
  // way. The remaining occurrences are translated after the rules have run.
  let t = String(raw || "")
    .replace(/,?\s*Radiation Oncology\s*$/i, "")
    .replace(/\s+/g, " ")
    .replace(/[–—]/g, "-")
    .trim();

  for (const rule of TITLE_RULES) {
    if (rule.match.test(t)) {
      t = t.replace(rule.match, female ? rule.female : rule.male);
      break;
    }
  }

  t = t
    .replace(/of Radiation Oncology/gi, "علاج الأورام بالإشعاع")
    .replace(/Radiation Oncology/gi, "علاج الأورام بالإشعاع")
    // The catalog joins rank and specialty with a Latin comma or hyphen. Arabic
    // takes an em dash, and only where the rank does not already govern the
    // following noun ("رئيس قسم علاج…" needs no separator).
    .replace(/\s*[,،]\s*(?=علاج الأورام)/g, " — ")
    .replace(/\s*-\s*(?=علاج الأورام)/g, " — ")
    // "لـ" is a bound prefix; it attaches to the noun it governs.
    .replace(/لـ\s*(?=علاج)/g, "ل")
    .replace(/\s+[,،]/g, "")
    .replace(/[,،]\s*$/g, "")
    .replace(/\s*—\s*$/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  if (!t || /^(of|and|&|-)+$/i.test(t)) {
    return female ? "أخصائية علاج الأورام بالإشعاع" : "أخصائي علاج الأورام بالإشعاع";
  }
  if (!/علاج الأورام بالإشعاع|أخصائي|استشار/.test(t)) {
    t = `${t} — علاج الأورام بالإشعاع`;
  }
  return t;
}

function arList(items) {
  return (items || []).map((item) => phrase(item)).filter(Boolean);
}

function arMemberships(items) {
  return (items || []).map((raw) => {
    let line = raw;
    for (const [en, ar] of Object.entries(ORG)) {
      line = line.split(en).join(ar);
    }
    line = line.replace(/\s+-\s+/g, " · ");
    return phrase(line);
  });
}

function arEducation(items) {
  return (items || []).map((line) => {
    let out = line;
    for (const rule of EDUCATION_RULES) out = out.replace(rule.match, rule.ar);
    return out;
  });
}

function arAffiliations(items) {
  return (items || []).map((line) => {
    let out = line;
    for (const rule of AFFILIATION_RULES) out = out.replace(rule.match, rule.ar);
    return out;
  });
}

function arAwards(items) {
  return (items || []).map((line) => {
    let out = line;
    for (const rule of AWARD_RULES) out = out.replace(rule.match, rule.ar);
    return out;
  });
}

function roleWord(female, head) {
  const role = head ? ROLE_WORDS.head : ROLE_WORDS.consultant;
  return female ? role.female : role.male;
}

function isHead(title) {
  return /director|hod|head|chair|chief|vice chairman|in-charge|clinical director|clinical lead/i.test(
    title || "",
  );
}

function bioFor(doc, nameAr, titleAr, cityAr, years, proc1, proc2) {
  const female = FEMALE.has(doc.slug);
  const head = isHead(doc.designation);
  const role = roleWord(female, head);
  const hospital = doc.hospitalName || doc.hospitalCaption || "الحرم الشريك";
  const airport = AIRPORT[doc.city] || "المطار الدولي";
  const city = cityAr;
  const n = String(years);
  const pronoun = female ? "ها" : "ه";
  const verbReview = female ? "تراجع" : "يراجع";
  const verbHold = female ? "تمسك" : "يمسك";
  const verbRead = female ? "تقرأ" : "يقرأ";
  const i = hash(doc.slug) % 10;

  const closings = [
    `منسّق GAF Healthcare باسمك يرتّب مكالمة الفيديو قبل أي تذكرة عبر ${airport}.`,
    `لا يُثبَّت تاريخ السفر قبل أن يصمد الملف أمام مراجعة النظراء ومكالمة الكاميرا.`,
    `العربون بعد الاتفاق على الخطة، لا قبل أن ترى الاستشاري${female ? "ة" : ""} على الشاشة.`,
    `نكتب الأسئلة التي نريدك أن تطرح${female ? "يها" : "ها"} على الكاميرا، ثم نحدد إن كان الوصول إلى ${city} هو الخطوة الصادقة.`,
    `المنسّق يبقى على الخط بعد الهبوط؛ الملف لا يُغلق عند باب المطار.`,
  ];
  const close = closings[hash(doc.slug) % closings.length];

  const templates = [
    `يصل ملف ${nameAr} إلى مكتب GAF Healthcare كـ${role} في ${hospital} بـ${city}. بعد ${n}+ سنة في تخطيط الجرعات، نبدأ بالسجلات لا بالكتيّب: إن صمدت الصور كان المسار التالي ${proc1} أو ${proc2}. ${close}`,
    `نفتح ملف ${nameAr} من باب ${city} لا من قائمة تسويقية. ${titleAr} في ${hospital}، و${n}+ سنة تُقاس بعدد الخطط التي رُسمت على الهدف لا بعدد الشرائح. الإجراءات المرتبطة: ${proc1} و${proc2}. ${close}`,
    `${nameAr} — ${role} في ${hospital}، ${city}. GAF Healthcare لا تحجز مقعد إشعاع قبل أن ${verbRead} التصوير وتقارير الجراحة. ${proc1} يبقى على الطاولة عندما يكون الهامش ضيقًا؛ ${proc2} عندما يناسب الحجم. ${close}`,
    `في ${city} يُحفظ ملف ${nameAr} تحت بلد الهند، مدينة ${city}، تخصص علاج الأورام بالإشعاع، ثم الإجراء. ${n}+ سنة خبرة في ${hospital}. نطابق الحالة بـ${proc1} و${proc2} بعد قراءة الأشعة، لا بعد مكالمة المبيعات. ${close}`,
    `GAF Healthcare تضع ${nameAr} أمامك كاسم لا كقسم. ${titleAr}، ${hospital}، ${city}. بعد ${n}+ سنة ما زال${female ? "ت" : ""} ${verbHold} الخطة حتى تصمد أمام مراجعة الزملاء. ${proc1} و${proc2} من الأدوات اليومية. ${close}`,
    `المسار إلى ${nameAr} يمر بمكتب التنسيق لا بالاستمارة العامة. ${role} في ${hospital} بـ${city} منذ ما يزيد على ${n} سنة. نسأل أولًا: هل الإجراء الصادق ${proc1} أم ${proc2}؟ الجواب بعد الملف. ${close}`,
    `${nameAr} يُدرَج في دليل الأطباء العربي تحت الهند / ${city} / علاج الأورام بالإشعاع حتى يمكن لاحقًا بناء صفحات الإجراء دون تغيير المفاتيح الإنجليزية. ${hospital}. ${n}+ سنة. ${proc1}، ${proc2}. ${close}`,
    `لا نكتب عن ${nameAr} بلغة «الأشهر عالميًا». نكتب الوقائع: ${titleAr} في ${hospital}، ${city}، ${n}+ سنة، وملف يُراجع قبل السفر. إن لزم ${proc1} رُسمت الخطة؛ إن لزم ${proc2} كذلك. ${close}`,
    `من ${airport} إلى ${hospital} رحلة تُخطَّط بعد المكالمة لا قبلها. ${nameAr} ${role} بخبرة ${n}+ سنة. GAF Healthcare تطلب التصوير أولًا ثم تحدد إن كان ${proc1} أو ${proc2} هو الخطوة التالية. ${close}`,
    `ملف ${nameAr} يُفتح كخطة علاج لا كعرض فندقي. ${hospital} في ${city}. ${n}+ سنة في علاج الأورام بالإشعاع. ${verbReview} الهامش على ${proc1} و${proc2} قبل أن يُقترح أسبوع في الهند. ${close}`,
  ];

  let text = templates[i];
  if (!text.includes("GAF Healthcare")) {
    text += ` تنظّم GAF Healthcare الملف حسب بلد الهند ومدينة ${city} وتخصص علاج الأورام بالإشعاع ثم الإجراء قبل أي سفر.`;
  }
  if (doc.featured) {
    text += ` يظهر هذا الملف ضمن الخبراء المميزين لأن القسم يُحيل إليه الحالات التي تحتاج اسمًا لا مناوبة.`;
  }
  if (head) {
    text += ` لأن${pronoun} ${female ? "تحمل" : "يحمل"} مسؤولية القسم، تُعرض الخطة على مجلس الأورام قبل تثبيت السفر.`;
  }
  return text.replace(/\s+/g, " ").trim();
}

function hospitalLabel(doc) {
  return (doc.hospitalName || doc.hospitalCaption || "").split(",")[0].trim() || "الحرم الشريك";
}

const doctors = catalog.doctors.filter((d) => d.specialty === "Radiation Oncology");
if (doctors.length !== 70) {
  throw new Error(`Expected 70 radiation oncologists, found ${doctors.length}`);
}

const overlays = { ...cms.doctorOverrides };
/**
 * Regenerating must not change a record's review state: an existing overlay
 * keeps the status it was signed off with, and anything new starts as a draft
 * so freshly generated copy is never published unread.
 */
const statusOf = (slug) => overlays[slug]?.status ?? "draft";


for (const doc of doctors) {
  const nameAr = NAMES[doc.name];
  if (!nameAr) throw new Error(`Missing Arabic name for ${doc.name}`);
  const female = FEMALE.has(doc.slug);
  const city = doc.city || "Delhi NCR";
  const cityAr = CITY_AR[city];
  if (!cityAr) throw new Error(`Missing city ${city}`);
  const years = yearsOf(doc.experience);
  const titleAr = arTitle(doc.designation, female);
  const procs = arList(doc.proceduresExpertise);
  const specs = arList(doc.specializations.length ? doc.specializations : ["Radiation Oncology"]);
  const proc1 = procs[0] || "العلاج الإشعاعي الخارجي";
  const proc2 = procs[1] || procs[0] || "المعالجة الكثبية";
  const hospital = hospitalLabel(doc);

  overlays[doc.slug] = {
    status: statusOf(doc.slug),
    name: nameAr,
    title: titleAr,
    qualifications: doc.qualifications,
    experience: `${String(years)}+ سنة خبرة`,
    languages: LANG_CITY[city] || "الإنجليزية، الهندية",
    imageAlt: `${nameAr}، ${titleAr} في ${hospital}، ${cityAr} — دليل GAF Healthcare لعلاج الأورام بالإشعاع في الهند`,
    specializations: specs,
    proceduresExpertise: procs,
    education: arEducation(doc.education),
    affiliations: arAffiliations(doc.affiliations),
    memberships: arMemberships(doc.memberships),
    awards: arAwards(doc.awards),
    research: doc.research || [],
    bio: bioFor(doc, nameAr, titleAr, cityAr, years, proc1, proc2),
  };
}

cms.doctorOverrides = overlays;
writeFileSync(cmsPath, `${JSON.stringify(cms, null, 2)}\n`);
console.log(`Wrote ${Object.keys(overlays).length} Arabic radiation-oncology overlays`);
