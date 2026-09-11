#!/usr/bin/env node
/**
 * Builds original Arabic CMS overlays for the 70 radiation oncologists.
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

const NAMES = {
  "Dr. Anil Kumar Anand": "د. أنيل كومار أناند",
  "Dr. Anitha Gopinath": "د. أنيثا غوبيناث",
  "Dr. Anusheel Munshi": "د. أنوشيل منشي",
  "Dr. Ashwin M Shah": "د. أشوين م. شاه",
  "Dr. B. Ramakrishna Prasad": "د. ب. راماكريشنا براساد",
  "Dr. Christopher John": "د. كريستوفر جون",
  "Dr. D. Shiva Prasad": "د. دي. شيفا براساد",
  "Dr. Debnarayan Dutta": "د. دبنارايان دوتا",
  "Dr. Dipali Bhorikar Borade": "د. ديبالي بهوريكار بوراد",
  "Dr. Dodul Mondal": "د. دودول موندال",
  "Dr. G K Jadhav": "د. جي. كيه. جادهاف",
  "Dr. K. R. Prasanna Kumar": "د. ك. ر. براسانا كومار",
  "Dr. Kalyani Premchandra": "د. كالياني بريمشاندرا",
  "Dr. Kushal Narang": "د. كوشال نارانغ",
  "Dr. M Vinay Ural": "د. م. فيناي أورال",
  "Dr. M. Janarthinakani": "د. م. جانارثيناكاني",
  "Dr. M. Suneetha": "د. م. سونيثا",
  "Dr. Mathangi J": "د. ماثانغي جيه",
  "Dr. Natarajan V": "د. ناتاراجان في",
  "Dr. P. Vijay Anand Reddy": "د. ب. فيجاي أناند ريدي",
  "Dr. Prashant Upadhyay": "د. براشانت أوبادهياي",
  "Dr. Rajeev G": "د. راجيف جي",
  "Dr. Rakesh Jalali": "د. راكيش جلالي",
  "Dr. Ranjeet Bajpai": "د. رانغيت باجباي",
  "Dr. S. Usha": "د. س. أوشا",
  "Dr. Sandeep De": "د. سانديب دي",
  "Dr. Sapna Nangia": "د. سابنا نانغيا",
  "Dr. Satyesh Nadella": "د. ساتيش ناديلا",
  "Dr. Shilpareddy Keesara": "د. شيلباريدي كيسارا",
  "Dr. Sravanthi Reddy T": "د. سرافانتي ريدي تي",
  "Dr. Sri Sai Tejaswini Muddana": "د. سري ساي تجاسويني مودانا",
  "Dr. Sridhar P S": "د. سريدار بي. إس",
  "Dr. Srinivas Chilukuri": "د. سرينيفاس تشيلوكوري",
  "Dr. Subodh Chandra Pande": "د. سوبوده تشاندرا باندي",
  "Dr. Susovan Banerjee": "د. سوسوفان بانيرجي",
  "Dr. Tejinder Kataria": "د. تجيندر كاتاريا",
  "Dr. V. Balasundaram": "د. ف. بالاسوندارام",
  "Dr. Vijay Bhasker L": "د. فيجاي بهاسكر إل",
  "Dr. Aditi Aggarwal": "د. أديتي أغاروال",
  "Dr. Amal Roy Chaudhoory": "د. أمل روي تشودوري",
  "Dr. Anbarasi Kumaresan": "د. أنباراسي كوماريسان",
  "Dr. Anita Malik": "د. أنيتا مالك",
  "Dr. Azmi Saundarya K": "د. عزمي سونداريا كيه",
  "Dr. Bharath Chandra Gurram": "د. بهارات تشاندرا غورام",
  "Dr. Charu Garg": "د. تشارو غارغ",
  "Dr. Deepak Gupta": "د. ديباك غوبتا",
  "Dr. Devashish Tripathi": "د. ديفاشيش تريباثي",
  "Dr. Divya Gupta": "د. ديفيا غوبتا",
  "Dr. Garima Singh": "د. غاريما سينغ",
  "Dr. Gowhar Ahmad Shigan": "د. غوهر أحمد شيغان",
  "Dr. Indu Bansal Aggarwal": "د. إندو بانسال أغاروال",
  "Dr. K. Kiran Kumar": "د. ك. كيران كومار",
  "Dr. Kamal Verma": "د. كمال فيرما",
  "Dr. Khushboo Rastogi": "د. خوشبو راستوغي",
  "Dr. M. R. Vishwateja": "د. م. ر. فيشواتيجا",
  "Dr. Mayur Mayank": "د. مايور مايانك",
  "Dr. Naman Utreja": "د. نامان أوتريجا",
  "Dr. Neha Kakkar": "د. نيها كاكار",
  "Dr. Neha Sehgal": "د. نيها سيغال",
  "Dr. Pradeep Kumar Karumanchi": "د. براديب كومار كارومانشي",
  "Dr. Prahlad Yathiraj": "د. براهلاد ياتيراي",
  "Dr. S Jayalakshmi": "د. س. جايالاكشمي",
  "Dr. S. Alex Antony Prasad": "د. س. أليكس أنتوني براساد",
  "Dr. Sandeep Goel": "د. سانديب غويل",
  "Dr. Sapna Manocha Verma": "د. سابنا مانوتشا فيرما",
  "Dr. Shyam Singh Bisht": "د. شيام سينغ بيشت",
  "Dr. Swarupa Mitra": "د. سواروبا ميترا",
  "Dr. Vineet Nakra": "د. فينيت ناكرا",
  "Dr. Vineeta Goel": "د. فينيتا غويل",
  "Dr. Y. Nalini": "د. ي. ناليني",
};

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

const LANG_CITY = {
  Mumbai: "الإنجليزية، الهندية، الماراثية",
  Bengaluru: "الإنجليزية، الكانادية، الهندية",
  Chennai: "الإنجليزية، التاميلية، الهندية",
  Hyderabad: "الإنجليزية، التيلوغو، الهندية",
  "Delhi NCR": "الإنجليزية، الهندية",
};

const PHRASE = {
  Brachytherapy: "المعالجة الكثبية",
  "GI (Gastrointestinal) Radiation Oncology": "علاج أورام الجهاز الهضمي بالإشعاع",
  "Gynaecological Oncology": "أورام النساء",
  "Head and Neck Oncology": "أورام الرأس والعنق",
  "Image-Guided Radiation Therapy (IMRT)": "العلاج الإشعاعي معدل الشدة الموجّه بالصور",
  "Medical Oncology": "علاج الأورام الطبي",
  "Medical Oncology (multidisciplinary cancer care)": "علاج الأورام الطبي ضمن فريق متعدد التخصصات",
  "Medical Oncology (supportive role in multidisciplinary cancer care)":
    "دور داعم في علاج الأورام الطبي ضمن الفريق المتعدد التخصصات",
  "Medical Oncology (supportive/concurrent treatment protocols)":
    "بروتوكولات داعمة أو متزامنة مع علاج الأورام الطبي",
  "Neuro-Oncology (Radiation)": "أورام الجهاز العصبي — مسار إشعاعي",
  "Paediatric Oncology (Radiation)": "أورام الأطفال — مسار إشعاعي",
  "Radiation Oncology": "علاج الأورام بالإشعاع",
  "Radiation Therapy for Cancer": "العلاج الإشعاعي للأورام",
  "Stereotactic Body Radiation Therapy (SBRT)": "العلاج الإشعاعي التجسيمي للجسم (SBRT)",
  "Stereotactic Radiosurgery (SRS)": "الجراحة الإشعاعية التجسيمية (SRS)",
  "Surgical Oncology (Head & Neck, Breast, GI, Thoracic)":
    "جراحة الأورام بالتنسيق (رأس وعنق، ثدي، جهاز هضمي، صدر)",
  "Surgical Oncology (collaborative cancer programme involvement)":
    "مشاركة في برنامج جراحة الأورام التعاوني",
  "3D Conformal Radiotherapy": "العلاج الإشعاعي المطابق ثلاثي الأبعاد (3D-CRT)",
  "Adjuvant Chemotherapy": "العلاج الكيميائي المساعد",
  "Advanced Radiation Therapy Techniques- 3D Conformal Radiotherapy":
    "تقنيات الإشعاع المتقدمة — العلاج الإشعاعي المطابق ثلاثي الأبعاد",
  "Advanced Radiation Therapy Techniques- Stereotactic Body Radiation Therapy (SBRT)":
    "تقنيات الإشعاع المتقدمة — العلاج الإشعاعي التجسيمي للجسم",
  "Based on Dr. Muddana's specialization in Radiation Oncology, her clinical focus encompasses various aspects of radiation therapy, including advanced techniques that minimize side effects while maximizing treatment efficacy:":
    "مسارها السريري يركّز على تخطيط الجرعة بحيث ينحصر الإشعاع في الهدف ويتراجع العبء على الأنسجة المجاورة:",
  "Brain Tumor Surgery (Radiation Oncology support)": "دعم إشعاعي لجراحة أورام الدماغ",
  "Breast Cancer Surgery": "جراحة سرطان الثدي — التنسيق الإشعاعي",
  "Cancer Immunotherapy": "العلاج المناعي للسرطان",
  "Cervical Cancer Surgery": "جراحة سرطان عنق الرحم — التنسيق الإشعاعي",
  "Cervical Cancer Surgery (radiation management aspect)": "إدارة الإشعاع بعد جراحة سرطان عنق الرحم",
  "Chemotherapy for Cancer": "العلاج الكيميائي للأورام",
  "Chemotherapy for Cancer (concurrent chemoradiation protocols)": "بروتوكولات الكيميائي المتزامن مع الإشعاع",
  "Chemotherapy for Solid Tumors": "العلاج الكيميائي للأورام الصلبة",
  "CyberKnife Radiosurger": "الجراحة الإشعاعية بسايبر نايف",
  "CyberKnife Radiosurgery": "الجراحة الإشعاعية بسايبر نايف",
  "Endometrial Cancer Surgery": "جراحة سرطان بطانة الرحم — التنسيق الإشعاعي",
  "External Beam Radiotherapy": "العلاج الإشعاعي الخارجي",
  "Gamma Knife Radiosurgery": "الجراحة الإشعاعية بغاما نايف",
  "Head & Neck Tumor Surgery": "جراحة أورام الرأس والعنق — التنسيق الإشعاعي",
  "Hormone Therapy for Breast Cancer": "العلاج الهرموني لسرطان الثدي",
  "Hormone Therapy for Gynecologic Cancers": "العلاج الهرموني لأورام النساء",
  "Hormone-Based Therapies- Hormonal Therapy for Gynaecologic Cancers": "علاجات هرمونية لأورام النساء",
  "Hypopharyngeal Cancer Surgery (radiation management aspect)": "إدارة الإشعاع لأورام البلعوم السفلي",
  "Image-Guided Radiation Therapy": "العلاج الإشعاعي الموجّه بالصور",
  "Image-Guided Radiation Therapy (IGRT)": "العلاج الإشعاعي الموجّه بالصور (IGRT)",
  "Immunotherapy for Solid Tumors": "العلاج المناعي للأورام الصلبة",
  "Intensity-Modulated Radiation Therapy": "العلاج الإشعاعي معدل الشدة (IMRT)",
  "Intensity-Modulated Radiation Therapy (IMRT)": "العلاج الإشعاعي معدل الشدة (IMRT)",
  "Interstitial Brachytherapy": "المعالجة الكثبية الخلالية",
  "Intracavitary Brachytherapy": "المعالجة الكثبية داخل التجويف",
  "Intraoperative Radiation Therapy (IORT)": "العلاج الإشعاعي أثناء الجراحة",
  "Lung Cancer Surgery": "جراحة سرطان الرئة — التنسيق الإشعاعي",
  "Medical Oncology Treatments- Chemotherapy for Cancer": "مسارات علاج الأورام الطبي — الكيميائي",
  "Neoadjuvant Chemotherapy": "العلاج الكيميائي قبل الجراحة",
  "Ovarian Cancer Surgery": "جراحة سرطان المبيض — التنسيق الإشعاعي",
  "Palliative Chemotherapy": "العلاج الكيميائي التلطيفي",
  "Plaque Brachytherapy": "المعالجة الكثبية باللوحة",
  "Proton Beam Therapy": "العلاج بشعاع البروتون",
  "Radiation Therapy Procedures- Radiation Therapy for Cancer": "إجراءات العلاج الإشعاعي للأورام",
  "Retinoblastoma Treatment": "علاج الورم الأرومي الشبكي",
  "Specialized Radiosurgery- CyberKnife Radiosurgery": "جراحة إشعاعية متخصصة — سايبر نايف",
  "Stereotactic Body Radiation Therapy": "العلاج الإشعاعي التجسيمي للجسم",
  "Stereotactic Procedures- Stereotactic Body Radiation Therapy (SBRT)":
    "إجراءات تجسيمية — العلاج الإشعاعي التجسيمي للجسم",
  "Targeted Therapy for Cancer": "العلاج الموجّه للسرطان",
  "Total Body Irradiation (TBI)": "إشعاع الجسم الكامل",
};

const ORG = {
  "Association of Radiation Oncologists of India": "رابطة أطباء الأورام بالإشعاع في الهند (AROI)",
  AROI: "AROI",
  "Indian Medical Association": "الجمعية الطبية الهندية (IMA)",
  IMA: "IMA",
  "American Society for Radiation Oncology": "الجمعية الأمريكية لعلاج الأورام بالإشعاع (ASTRO)",
  "American Society of Radiation Oncology": "الجمعية الأمريكية لعلاج الأورام بالإشعاع (ASTRO)",
  ASTRO: "ASTRO",
  "Indian Society of Oncology": "الجمعية الهندية للأورام",
  "European Society for Radiotherapy and Oncology": "الجمعية الأوروبية للعلاج الإشعاعي والأورام (ESTRO)",
  ESTRO: "ESTRO",
};

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
  let t = String(raw || "")
    .replace(/,?\s*Radiation Oncology$/i, "")
    .replace(/\s*Radiation Oncology/gi, "")
    .replace(/\s+/g, " ")
    .replace(/[–—]/g, "-")
    .trim();

  const rules = [
    [/Principal Director and Head of Department of/i, female ? "المديرة الرئيسية ورئيسة قسم" : "المدير الرئيسي ورئيس قسم"],
    [/Principal Director & HOD -/i, female ? "المديرة الرئيسية ورئيسة قسم" : "المدير الرئيسي ورئيس قسم"],
    [/Principal Director of/i, female ? "المديرة الرئيسية لـ" : "المدير الرئيسي لـ"],
    [/Group Director and Head of Department/i, female ? "مديرة المجموعة ورئيسة القسم" : "مدير المجموعة ورئيس القسم"],
    [/Senior Director and Head of Department/i, female ? "المديرة الأولى ورئيسة القسم" : "المدير الأول ورئيس القسم"],
    [/Senior Director & HOD of/i, female ? "المديرة الأولى ورئيسة قسم" : "المدير الأول ورئيس قسم"],
    [/Senior Director/i, female ? "مديرة أولى" : "مدير أول"],
    [/Associate Director - Radiation Oncology and Cancer Care/i, female ? "مديرة مساعدة — علاج الأورام بالإشعاع ورعاية السرطان" : "مدير مساعد — علاج الأورام بالإشعاع ورعاية السرطان"],
    [/Associate Director/i, female ? "مديرة مساعدة" : "مدير مساعد"],
    [/Vice Chairman/i, female ? "نائبة الرئيس" : "نائب الرئيس"],
    [/Chairperson/i, female ? "رئيسة القسم" : "رئيس القسم"],
    [/Chief of Radiation Oncology & Co-Chief of CyberKnife Centre/i, female ? "رئيسة علاج الأورام بالإشعاع والمشاركة في رئاسة مركز سايبر نايف" : "رئيس علاج الأورام بالإشعاع والمشارك في رئاسة مركز سايبر نايف"],
    [/Head, Radiation Oncology & CyberKnife Centre \(Unit II\)/i, female ? "رئيسة علاج الأورام بالإشعاع ومركز سايبر نايف (الوحدة الثانية)" : "رئيس علاج الأورام بالإشعاع ومركز سايبر نايف (الوحدة الثانية)"],
    [/Head of Department & Clinical Lead/i, female ? "رئيسة القسم والمسؤولة السريرية" : "رئيس القسم والمسؤول السريري"],
    [/Director of Radiation Oncology/i, female ? "مديرة علاج الأورام بالإشعاع" : "مدير علاج الأورام بالإشعاع"],
    [/Director, Department of/i, female ? "مديرة قسم" : "مدير قسم"],
    [/Director,/i, female ? "مديرة" : "مدير"],
    [/Clinical Lead & Consultant in/i, female ? "المسؤولة السريرية واستشارية" : "المسؤول السريري واستشاري"],
    [/Senior Consultant Radiation Oncologist and Clinical Director/i, female ? "استشارية أولى ومديرة سريرية لعلاج الأورام بالإشعاع" : "استشاري أول ومدير سريري لعلاج الأورام بالإشعاع"],
    [/Senior Consultant Radiation Oncologist/i, female ? "استشارية أولى لعلاج الأورام بالإشعاع" : "استشاري أول لعلاج الأورام بالإشعاع"],
    [/Senior Consultant & Visiting Radiation Oncologist/i, female ? "استشارية أولى واستشارية زائرة لعلاج الأورام بالإشعاع" : "استشاري أول واستشاري زائر لعلاج الأورام بالإشعاع"],
    [/Senior Consultant & Clinical Advisor/i, female ? "استشارية أولى ومستشارة سريرية" : "استشاري أول ومستشار سريري"],
    [/Senior Consultant and In-Charge/i, female ? "استشارية أولى ومسؤولة القسم" : "استشاري أول ومسؤول القسم"],
    [/Principal Consultant -/i, female ? "استشارية رئيسية —" : "استشاري رئيسي —"],
    [/Principal Consultant/i, female ? "استشارية رئيسية" : "استشاري رئيسي"],
    [/HOD & Senior Consultant/i, female ? "رئيسة القسم واستشارية أولى" : "رئيس القسم واستشاري أول"],
    [/Senior Registrar \/ Consultant/i, female ? "مسجّلة أولى / استشارية" : "مسجّل أول / استشاري"],
    [/Visiting Consultant/i, female ? "استشارية زائرة" : "استشاري زائر"],
    [/Consultant Radiation Oncologist/i, female ? "استشارية علاج الأورام بالإشعاع" : "استشاري علاج الأورام بالإشعاع"],
    [/Consultant Radiation Oncology/i, female ? "استشارية علاج الأورام بالإشعاع" : "استشاري علاج الأورام بالإشعاع"],
    [/Consultant -/i, female ? "استشارية —" : "استشاري —"],
    [/Consultant,/i, female ? "استشارية" : "استشاري"],
    [/Radiation Specialist Oncologist/i, female ? "أخصائية علاج الأورام بالإشعاع" : "أخصائي علاج الأورام بالإشعاع"],
    [/Radiation Oncologist/i, female ? "أخصائية علاج الأورام بالإشعاع" : "أخصائي علاج الأورام بالإشعاع"],
    [/Senior Consultant/i, female ? "استشارية أولى" : "استشاري أول"],
  ];

  for (const [re, ar] of rules) {
    if (re.test(t)) {
      t = t.replace(re, ar);
      break;
    }
  }

  t = t
    .replace(/of Radiation Oncology/gi, "علاج الأورام بالإشعاع")
    .replace(/Radiation Oncology/gi, "علاج الأورام بالإشعاع")
    .replace(/\s+,/g, "")
    .replace(/,\s*$/g, "")
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
  return (items || []).map((line) =>
    line
      .replace(/Specialised Training in/gi, "تدريب متخصص في")
      .replace(/Specialized Training in/gi, "تدريب متخصص في")
      .replace(/Post-Doctorate Training in/gi, "تدريب ما بعد الدكتوراه في")
      .replace(/Radiation Oncology/gi, "علاج الأورام بالإشعاع")
      .replace(/Radiotherapy & Oncology/gi, "العلاج الإشعاعي والأورام")
      .replace(/Radiotherapy of/gi, "العلاج الإشعاعي لـ")
      .replace(/Radiotherapy/gi, "العلاج الإشعاعي")
      .replace(/Overseas Fellowship/gi, "زمالة خارجية")
      .replace(/Fellowship/gi, "زمالة")
      .replace(/subsequently worked at/gi, "ثم عمل في"),
  );
}

function arAffiliations(items) {
  return (items || []).map((line) => line.replace(/\bformer\b/gi, "سابقًا"));
}

function arAwards(items) {
  return (items || []).map((line) =>
    line
      .replace(/Top Radiation Oncologist of South India/gi, "أبرز أخصائي علاج الأورام بالإشعاع في جنوب الهند")
      .replace(/Best Radiation Oncologist of South India/gi, "أفضل أخصائي علاج الأورام بالإشعاع في جنوب الهند")
      .replace(/Gold Medallist/gi, "حائز على الميدالية الذهبية")
      .replace(/Gold Medalist/gi, "حائز على الميدالية الذهبية"),
  );
}

function roleWord(female, head) {
  if (head) return female ? "رئيسة مسار علاج الأورام بالإشعاع" : "رئيس مسار علاج الأورام بالإشعاع";
  return female ? "استشارية علاج الأورام بالإشعاع" : "استشاري علاج الأورام بالإشعاع";
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
  const n = toEastern(years);
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
    name: nameAr,
    title: titleAr,
    qualifications: doc.qualifications,
    experience: `${toEastern(years)}+ سنة خبرة`,
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
