#!/usr/bin/env node
/** Arabic hospital overlays for the three independent Sahyadri Pune campuses. */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(readFileSync(join(root, "src/data/ginger-catalog.json"), "utf8"));
const HOSPITAL_NAMES = JSON.parse(readFileSync(join(root, "src/data/hospital-names-ar.json"), "utf8"));
const cmsPath = process.env.CATALOG_CMS_PATH ?? join(root, "content/ar/catalog-cms.json");
const cms = JSON.parse(readFileSync(cmsPath, "utf8"));

/** Faculty-derived focus is filled by remediation; keep a short campus-neutral placeholder here. */
const FOCUS_PLACEHOLDER = "تخصصات معتمدة من أطباء الحرم الموثقين فقط";

const HOOKS = {
  "sahyadri-super-speciality-hospital-nagar-road": {
    address: "بالقرب من هيرميس هيريتدج، طريق ناغار، شاسترينغار، يراوادا، بونه 411006",
    hook: "حرم ناغار رود يبقى سجلًا مستقلًا عن هادابسار وديكان جيمخانا رغم انتمائه لشبكة ساهيادري ضمن مانيبال.",
  },
  "sahyadri-super-speciality-hospital-hadapsar": {
    address: "رقم المسح 163، طريق بوسالي غاردن، بوسالي ناغار، هادابسار، بونه 411028",
    hook: "حرم هادابسار يُعرض بعنوانه المنشور ويربط الأطباء المؤهلين بهذا الموقع فقط عند ثبوت العيادة في المصدر.",
  },
  "sahyadri-super-speciality-hospital-deccan-gymkhana": {
    address: "القطعة 30-C، إراندفاني، طريق كارفي، ديكان جيمخانا، بونه 411004",
    hook: "حرم ديكان جيمخانا على طريق كارفي يُميَّز في الكتالوج عن حرمي ناغار رود وهادابسار دون دمج السجلات.",
  },
};

cms.hospitalOverrides ??= {};
const hospitals = catalog.hospitals.filter((row) => String(row.slug).startsWith("sahyadri-super-speciality-hospital-"));
if (hospitals.length !== 3) throw new Error(`Expected 3 Sahyadri hospitals, found ${hospitals.length}`);

for (const hospital of hospitals) {
  const name = HOSPITAL_NAMES[hospital.slug]?.ar;
  if (!name) throw new Error(`Missing Arabic name for ${hospital.slug}`);
  const meta = HOOKS[hospital.slug];
  if (!meta) throw new Error(`Missing hook for ${hospital.slug}`);
  cms.hospitalOverrides[hospital.slug] = {
    status: "published",
    name,
    bio: `${name} حرم مستقل لساهيادري في بونه، ماهاراشترا، الهند. ${meta.hook} العنوان المنشور من ساهيادري هو ${meta.address}. يذكر الدليل أن ساهيادري جزء من شبكة مانيبال من دون دمج الحروم الثلاثة في ملف مستشفى واحد. يبني GAF Healthcare علاقات التخصص والأطباء من السجلات المؤكدة لهذا الحرم فقط، ولا يختلق سعة أسرّة أو اعتمادات غير موثقة.`,
    summary: `${name} في بونه. حرم ساهيادري مستقل ضمن شبكة مانيبال، مع أطباء مرتبطين وفق التخصصات الموجودة أصلًا في دليل GAF Healthcare.`,
    languages: "الإنجليزية، الهندية، الماراثية",
    focus: FOCUS_PLACEHOLDER,
    icu: "عناية مركزة متعددة التخصصات وفق ما ينشره المستشفى للحرم",
    imageAlt: `${name}، بونه، الهند — دليل مستشفيات GAF Healthcare`,
  };
}

writeFileSync(cmsPath, `${JSON.stringify(cms, null, 2)}\n`);
console.log(`Wrote ${hospitals.length} Sahyadri hospital Arabic overlays`);
