#!/usr/bin/env node
/**
 * Original Arabic CMS overlays for the 37 India partner hospitals.
 * English slugs, cities, specialties and procedure slugs stay untouched.
 */
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(readFileSync(join(root, "src/data/ginger-catalog.json"), "utf8"));
const cmsPath = join(root, "content/ar/catalog-cms.json");
const cms = JSON.parse(readFileSync(cmsPath, "utf8"));

const EASTERN = "٠١٢٣٤٥٦٧٨٩";
const toEastern = (n) => String(n).replace(/\d/g, (d) => EASTERN[Number(d)]);

const CITY_AR = {
  "Delhi NCR": "دلهي إن سي آر",
  Mumbai: "مومباي",
  Bengaluru: "بنغالور",
  Chennai: "تشيناي",
  Hyderabad: "حيدر آباد",
};

const AIRPORT = {
  "Delhi NCR": "مطار إنديرا غاندي",
  Mumbai: "مطار شاتراباتي شيفاجي مهراج",
  Bengaluru: "مطار كيمبيغودا",
  Chennai: "مطار تشيناي الدولي",
  Hyderabad: "مطار راجيف غاندي الدولي",
};

const LANG = {
  Mumbai: "الإنجليزية، الهندية، الماراثية",
  Bengaluru: "الإنجليزية، الكانادية، الهندية",
  Chennai: "الإنجليزية، التاميلية، الهندية",
  Hyderabad: "الإنجليزية، التيلوغو، الهندية",
  "Delhi NCR": "الإنجليزية، الهندية",
};

const FOCUS_MULTI =
  "علاج الأورام بالإشعاع · جراحة الأورام · علاج الأورام الطبي · أمراض الدم · أمراض دم الأطفال · جراحة القلب · جراحة قلب الأطفال · أمراض القلب · جراحة السمنة · الجراحة التجميلية · أنف وأذن وحنجرة · أمراض الجهاز الهضمي · جراحة الجهاز الهضمي · المسالك البولية · جراحة العمود الفقري · أمراض الرئة · عظام الأطفال · جراحة العظام · طب العيون · أمراض النساء · جراحة المخ والأعصاب · طب الأعصاب · أمراض الكلى";

const EYE_SLUGS = new Set(["dr-agarwals-eye-hospital", "the-sight-avenue-eye-hospital"]);

const HOOK = {
  "apollo-athenaa-women-s-cancer-centre":
    "الحرم مخصّص لأورام النساء والثدي لا لقائمة مستشفى عام. نطابق الحالة بإجراءات مثل استئصال الثدي أو استئصال الرحم أو المعالجة الكثبية قبل اقتراح الطيران.",
  "apollo-delhi":
    "حرم كبير على حلقة دلهي، معتاد على رأي ثانٍ من الخليج وشرق أفريقيا. إجراءات مثل IMRT وSRS وSBRT تُعرض عندما يصمد التصوير لا عندما يضيق حجز الفندق.",
  "apollo-hospital-jubilee-hills-hyderabad":
    "معلم في جوبلي هيلز منذ عقود. نربط الملف بعلاج الأورام بالإشعاع وجراحة الأورام في حيدر آباد، ثم بالإجراء بعد قراءة الجرعة.",
  "apollo-hospitals-bannerghatta-road":
    "حرم بنغالور على طريق بانيرغاتا. سايبر نايف والمعالجة الكثبية وIMRT على القائمة حسب الاستشاري المطابق، لا حسب كتيّب الجنوب.",
  "apollo-hospitals-navi-mumbai":
    "نافي مومباي هي تبويب مومباي للمريض المسافر: نفس العنقود، حرم معتاد على الرأي الثاني. لا يُختَرع استطباب تجسيمي لتقصير الإقامة.",
  "apollo-proton-cancer-centre":
    "البروتون هو سبب معظم الرحلات إلى هذا الحرم في تشيناي. GAF Healthcare لا تبيع مسار بروتون إذا كان IMRT كافيًا في مدينة أقرب.",
  "artemis-hospital":
    "مركز سايبر نايف أسبوعي في غورغرام، مع DHA إلى جانب NABH للعائلات التي تعرف أوراق الخليج. الآلة تُطابق الهدف بعد الفيديو.",
  "blk-max-delhi":
    "حرم وسط دلهي بقائمة واسعة: رأس وعنق، ثدي، صدر، جهاز هضمي، ساركوما، نساء، أطفال. هذا ما تريده من مدينة لا من بوتيك.",
  "fortis-gurgaon":
    "ألف سرير في غورغرام، قسم إشعاع يديره مدير رئيسي: SBRT وSRS وIMRT وIORT والمعالجة الكثبية في الطابق نفسه مع الفيزياء.",
  "fortis-hospital-noida":
    "شرق يامونا. نويدا هي المدينة الصحيحة عندما يكون الاستشاري هنا، لا لأنها أرخص من غورغرام.",
  "fortis-hospital-shalimar-bagh":
    "شمال دلهي. العائلات المقيمة هناك لا تُرسل إلى غورغرام من أجل الجهاز نفسه. الملف يسمي الاستشاري قبل الفندق.",
  "gleneagles-healthcity-chennai":
    "كرومبيت ليست عنوانًا سياحيًا. حرم بحجم ألف سرير مع عناية مركزة ومكتب دولي. تعال للاسم، ابقَ للكسور التي يصفها فعلًا.",
  "gleneagles-hospitals-bengaluru":
    "إذا كانت الحالة تنتمي لمركز بروتون في تشيناي فهذه الجملة الأولى في الملف، لا ملاحظة مهذبة في الخاتمة.",
  "max-super-speciality-hospital-saket":
    "ساكيت مفيد عندما تريد مجلس أورام وفيزياء وفندقًا على مسافة سيارة قصيرة، لا مدينة ثانية.",
  "medanta-gurgaon":
    "ألف وستمائة سرير على جانب غورغرام. إن كان غورغرام الحرم الخطأ للقيد السريري، يقول الملف ذلك قبل الإقلاع.",
  "medicover-hospital-navi-mumbai":
    "مبنى حديث وطاقم يعمل كقسم. إن احتاجت الحالة بروتونًا أو سايبر نايف ليس على هذا الطابق، يُرسَل الملف إلى مكان آخر.",
  "mgm-healthcare-chennai":
    "استشاريون بخلفية تاتا ميموريال وبرينسس مارغريت. أحاديث ASTRO لا تغني عن خطة تُقرأ. إن كفت فوتونات تشيناي فلا أحد يُرسل للبروتون.",
  "paras-hospitals-gurugram":
    "قسم إشعاع بإدارة مجموعة: IMRT وIGRT و3D-CRT. غورغرام على خريطة دلهي إن سي آر، لا كعنوان منفصل في الكتيّب.",
  "rela-hospital":
    "حرم أحدث باستشاريين تدربوا في أقدم. قائمة سايبر نايف زائرة عندما يكون الاستطباب حقيقيًا. كرومبيت بعد الكاميرا لا قبلها.",
  "sarvodaya-hospital-faridabad":
    "فريد آباد هي دلهي إن سي آر: الممر الجوي نفسه، سرير مختلف. تعال للاسم لا لعلامة رأيتها في إعلان.",
  "yashoda-hospitals-hi-tech-city":
    "حرم المجموعة الكبير في حيدر آباد. شهادة علمية على القائمة لا تغني عن ضمان جودة الفيزياء. HITEC City لمن استشاريه هنا.",
  "yashoda-hospitals-secunderabad":
    "سيكوندا آباد ليست حرمًا بديلًا. إن كان سوماجيغودا الطابق الصحيح يقوله الملف في الفقرة الأولى.",
  "yashoda-hospitals-somajiguda":
    "وسط حيدر آباد — مفيد عندما يكون الاستشاري على هذا الحرم لا سيكوندا آباد. الموعد يتبع منحنى الجرعة لا سعر الغرفة.",
  "max-smart-super-speciality-hospital-saket":
    "التوأم الجنوبي لماكس ساكيت. نستخدمه عندما يخطّط الجرّاح المسمّى هنا لا في الجار.",
  "wockhardt-hospital":
    "قائمة جرّاحين بأسمائهم في مومباي، لا حزمة عطلة نهاية أسبوع. الإنجليزية والهندية والماراثية على الجناح.",
  "fortis-escorts-heart-institute":
    "يُعرَف بعمل القلب ويحمل الآن جرّاحي أورام مسمّين على قائمة GAF Healthcare. تعال للاستشاري لا للعلامة القلبية التاريخية.",
  "gleneagles-hospital-mumbai":
    "جراحة أورام عاملة: جهاز هضمي وثدي وصدر حسب المطابقة. إن انتمت الحالة لحرم مومباي آخر فالجملة الأولى في الملف.",
  "marengo-asia-hospitals-gurugram":
    "مسار علاج الأورام الطبي في غورغرام: كيميائي ومناعي وموجّه. الإشعاع والجراحة على الخريطة نفسها عندما تحتاج الحالة الاثنين.",
  "marengo-asia-hospitals-faridabad":
    "ستمائة سرير في فريد آباد على مسار علاج الأورام الطبي. نفس قاعدة السجلات أولًا ثم الفيديو.",
  "kims-hospitals-secunderabad":
    "علاج الأورام الطبي في سيكوندا آباد. الزراعة والبروتوكولات الجهازية تُكتب بعد الملف لا بعد المكالمة التسويقية.",
  "apollo-hospital-chennai":
    "حرم أمراض الدم في تشيناي: زراعة ونخاع وCAR-T عندما يصمد الاستطباب. الأورام الطبية والإشعاعية والجراحية على الخريطة نفسها.",
  "medicover-hospital-bangalore":
    "مسار جراحة القلب في بنغالور: تجاوز وصمامات. الأورام وأمراض الدم تبقى على الخريطة إن احتاجتها الحالة.",
  "kims-hospitals-kondapur":
    "جراحة قلب الأطفال في كوندابور. إغلاق ASD وVSD وإصلاح رباعية فالو عندما يكون الطفل هو الملف لا الجناح العام.",
  "kims-hospitals-thane":
    "أمراض القلب في ثين. قسطرة وناظمة وTAVR/TAVI بأسماء. مومباي هي المدينة عندما يكون الاستشاري على هذا الطابق.",
  "indian-spinal-injuries-centre":
    "أرضية العمود الفقري في دلهي إن سي آر، مع قوائم تجميل وترميم عندما يكون الاسم هنا. لا نخلط قائمة العيون أو الكلى على هذا الطابق إن لم تكن الحالة كذلك.",
  "dr-agarwals-eye-hospital":
    "مستشفى عيون NABH لا جناحًا عامًا يملك مصباحًا شقيًا. الساد والقرنية والشبكية والليزك عندما تنتمي الأفلام لهذا الطابق.",
  "the-sight-avenue-eye-hospital":
    "حرم عيون صغير. أربعة أسرة كافية عندما يكون طبيب العيون المسمّى هنا هو المطابقة الصحيحة، لا عندما يُراد اختصار فندق.",
};

function hash(slug) {
  return [...slug].reduce((n, ch) => n + ch.charCodeAt(0), 0);
}

function easternBeds(beds) {
  const n = parseInt(String(beds || "").replace(/[^\d]/g, ""), 10);
  if (!Number.isFinite(n) || n <= 0) return "";
  return `${toEastern(n)}+ سرير`;
}

function bioFor(h) {
  const cityAr = CITY_AR[h.city];
  const airport = AIRPORT[h.city];
  const year = h.established ? toEastern(h.established) : "";
  const beds = easternBeds(h.beds);
  const eye = EYE_SLUGS.has(h.slug);
  const hook = HOOK[h.slug];
  if (!hook) throw new Error(`Missing hook for ${h.slug}`);
  const acc = h.accreditation;
  const i = hash(h.slug) % 6;
  const size = beds ? ` بسعة ${beds}` : "";
  const opened = year ? ` افتُتح عام ${year}.` : "";
  const kind = eye ? "مستشفى عيون" : "حرم متعدد التخصصات";

  const openings = [
    `يُدرَج ${h.name} في دليل GAF Healthcare كـ${kind} في ${cityAr}، الهند${size}.${opened} الاعتماد الحالي: ${acc}.`,
    `GAF Healthcare تصنّف ${h.name} تحت بلد الهند، مدينة ${cityAr}، ثم التخصص ثم الإجراء حتى يمكن لاحقًا بناء صفحات pSEO دون تغيير المفاتيح الإنجليزية.${opened}${size ? ` ${size}.` : ""} ${acc} على الملف.`,
    `${h.name} — ${kind} في ${cityAr}${size ? `، ${size}` : ""}.${opened} ${acc}. نراجع السجلات قبل أي تاريخ عبر ${airport}.`,
    `الملف العربي لـ${h.name} يُفتح من باب ${cityAr} لا من كتيّب.${opened}${size ? ` ${size}.` : ""} ${acc} يُتحقق منه سنويًا لا يُنسخ من الإعلان.`,
    `في ${cityAr} يظهر ${h.name} مرة واحدة في دليل المستشفيات.${opened}${size ? ` ${size}.` : ""} ${acc}. المنسّق باسمك يرتّب الفيديو قبل التذكرة.`,
    `${h.name} حرم شريك في ${cityAr}، الهند.${opened}${size ? ` ${size}.` : ""} ${acc}. لا عربون قبل مكالمة الاستشاري على الكاميرا.`,
  ];

  const close = [
    `ننظّم الزيارة حسب البلد والمدينة والتخصص والإجراء، ثم نثبّت السفر إن صمدت الخطة.`,
    `العرض الكتابي يصدر بعد البروتوكول. نطاق التكلفة تخطيط لا عرض سعر.`,
    `المكتب الدولي يلتقي الهبوط الليلي؛ الملف لا يُغلق عند باب المطار.`,
    `إن كان حرم آخر في ${cityAr} أصدق للحالة، يقوله الملف في الفقرة الأولى.`,
    `من ${airport} إلى هذا العنوان رحلة تُخطَّط بعد المكالمة لا قبلها.`,
  ][hash(h.slug) % 5];

  return `${openings[i]} ${hook} ${close}`.replace(/\s+/g, " ").trim();
}

const overlays = { ...cms.hospitalOverrides };

for (const h of catalog.hospitals) {
  const cityAr = CITY_AR[h.city];
  const eye = EYE_SLUGS.has(h.slug);
  const bio = bioFor(h);
  overlays[h.slug] = {
    bio,
    summary: bio,
    languages: LANG[h.city],
    focus: eye ? "طب العيون" : FOCUS_MULTI,
    icu: eye ? "غرفة عمليات عيون" : "وحدة عناية مركزة للأورام",
    imageAlt: `${h.name} في ${cityAr}، الهند — حرم GAF Healthcare المعتمد (${h.accreditation}) مصنّف حسب البلد والمدينة والتخصص والإجراء`,
  };
}

if (Object.keys(overlays).length < catalog.hospitals.length) {
  throw new Error("Missing hospital overlays");
}

cms.hospitalOverrides = overlays;
writeFileSync(cmsPath, `${JSON.stringify(cms, null, 2)}\n`);
console.log(`Wrote ${catalog.hospitals.length} Arabic hospital overlays; doctors still ${Object.keys(cms.doctorOverrides).length}`);
