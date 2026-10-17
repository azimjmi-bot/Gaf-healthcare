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
import { collapseRepeatedPlaces, hospitalInCity, withCampus } from "./place-labels.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const HOSPITAL_NAMES = JSON.parse(readFileSync(join(root, "src/data/hospital-names-ar.json"), "utf8"));
const ENGLISH_HOSPITAL_NAMES = Object.values(HOSPITAL_NAMES).sort((a, b) => b.en.length - a.en.length);

function arabicCampus(slug, fallback) {
  return HOSPITAL_NAMES[slug]?.ar || fallback;
}

function translateCampusNames(text) {
  let out = text;
  for (const row of ENGLISH_HOSPITAL_NAMES) out = out.split(row.en).join(row.ar);
  return out;
}
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
    return female ? "اختصاصية علاج الأورام بالإشعاع" : "اختصاصي علاج الأورام بالإشعاع";
  }
  if (!/علاج الأورام بالإشعاع/.test(t)) {
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
    return collapseRepeatedPlaces(translateCampusNames(out));
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
  const hospital = arabicCampus(doc.hospitalSlug, doc.hospitalName || doc.hospitalCaption || "الحرم الشريك");
  const campus = withCampus(hospital, cityAr);
  const campusCountry = withCampus(hospital, cityAr, "الهند");
  const city = cityAr;
  const n = String(years);
  const quals = String(doc.qualifications || "").replace(/\s+/g, " ").trim();
  const qualsLine = quals ? ` المؤهلات المسجّلة في الملف: ${quals}.` : "";
  const exp = `الخبرة السريرية المسجّلة تبلغ ${n}+ سنة.`;
  const techs = proc1 === proc2
    ? `من تقنيات العلاج الموثقة في الملف: ${proc1}.`
    : `من تقنيات العلاج الموثقة في الملف: ${proc1} و${proc2}.`;
  const gaf = `يُدرج الملف في دليل GAF Healthcare لاختصاصيي علاج الأورام بالإشعاع في ${city}، الهند.`;
  const i = hash(doc.slug) % 10;

  const templates = [
    `${nameAr} ${titleAr} في ${campus}. ${exp}${qualsLine} ${techs} ${gaf}`,
    `${nameAr} ${role} في ${campusCountry}. ${exp}${qualsLine} ${techs} ${gaf}`,
    `${nameAr} — ${titleAr}. يمارس في ${campus}. ${exp}${qualsLine} ${techs} ${gaf}`,
    `${nameAr} اختصاصي${female ? "ة" : ""} علاج الأورام بالإشعاع في ${campus}. ${exp}${qualsLine} ${techs} ${gaf}`,
    `${nameAr} ${titleAr}. مقر الممارسة المسجّل: ${campusCountry}. ${exp}${qualsLine} ${techs} ${gaf}`,
    `${nameAr} يعمل ${titleAr} في ${hospitalInCity(hospital, city)}. ${exp}${qualsLine} ${techs} ${gaf}`,
    `الملف المنشور لـ${nameAr}: ${titleAr}، ${campusCountry}. ${exp}${qualsLine} ${techs} ${gaf}`,
    `${nameAr} ${titleAr}، والخبرة السريرية المسجّلة ${n}+ سنة في ${campus}. ${qualsLine} ${techs} ${gaf}`,
    `${nameAr} مدرج في الدليل بصفته ${role} في ${campus}. ${exp}${qualsLine} ${techs} ${gaf}`,
    `${nameAr} ${titleAr} في ${campusCountry}. ${techs} ${exp}${qualsLine} ${gaf}`,
  ];

  let text = templates[i];
  if (head) {
    text += female
      ? " تحمل مسؤولية القسم وفق المسمى المنشور في الملف."
      : " يحمل مسؤولية القسم وفق المسمى المنشور في الملف.";
  }
  return collapseRepeatedPlaces(text.replace(/\s+/g, " ").trim());
}

function hospitalLabel(doc) {
  return arabicCampus(
    doc.hospitalSlug,
    (doc.hospitalName || doc.hospitalCaption || "").split(",")[0].trim() || "الحرم الشريك",
  );
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
    experience: `${String(years)}+ سنة خبرة سريرية`,
    languages: LANG_CITY[city] || "الإنجليزية، الهندية",
    imageAlt: collapseRepeatedPlaces(
      `${nameAr}، ${titleAr} في ${withCampus(hospital, cityAr)} — دليل GAF Healthcare لعلاج الأورام بالإشعاع في الهند`,
    ),
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
