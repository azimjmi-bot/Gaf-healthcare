import type { Doctor } from "@/lib/doctors";
import type { Treatment } from "@/lib/treatments";
import type { AppLocale } from "@/lib/i18n/languages";
import { costPath, doctorsPath } from "@/lib/catalog-links";
import {
  TANZANIA_CANCER_TREATMENT_SLUGS,
  resolveCuratedBySlug,
  tanzaniaCityHrefs,
  tanzaniaHospitals,
  tanzaniaSpecialtyHref,
} from "@/data/tanzania-treatment-in-india";

export const ZIMBABWE_PAGE_PATH = "/zimbabwe/treatment-in-india";
export const ZIMBABWE_PAGE_LOCALES = ["en"] as const;
export const ZIMBABWE_LAST_REVIEWED = "2026-10-03";

export type ZimbabwePageCopy = typeof zimbabwePageCopyEn;

export function zimbabwePageCopy(_locale: AppLocale): ZimbabwePageCopy {
  return zimbabwePageCopyEn;
}

const INDIA = "India";

export const ZIMBABWE_OFFICIAL_LINKS = {
  eVisa: "https://indianvisaonline.gov.in/evisa/tvoa.html",
  eVisaHome: "https://indianvisaonline.gov.in/evisa/",
  eVisaFees: "https://indianvisaonline.gov.in/evisa/eTV_revised_fee_final.pdf",
  visaOnline: "https://indianvisaonline.gov.in/visa/",
  embassy: "https://indemb-harare.gov.in/",
  embassyVisa: "https://indemb-harare.gov.in/pages/MTQ,",
  embassyFees: "https://indemb-harare.gov.in/pages/MjI4",
  embassyForm: "https://indemb-harare.gov.in/pages/MjI3",
  meaBrief: "https://www.mea.gov.in/Portal/ForeignRelation/India-Zimbabwe-April-2026.pdf",
  meaBrief2025: "https://www.mea.gov.in/Portal/ForeignRelation/India-Zimbabwe-April-2025.pdf",
  globocan: "https://gco.iarc.who.int/media/globocan/factsheets/populations/716-zimbabwe-fact-sheet.pdf",
  iarcToday: "https://gco.iarc.who.int/today/en/fact-sheets-populations",
  whoData: "https://data.who.int/countries/716",
  mohfwYellowFever: "https://ihpoe.mohfw.gov.in/vaccination.php",
  boi: "https://boi.gov.in",
} as const;

export const ZIMBABWE_CURATED_TREATMENT_SLUGS = [
  "breast-cancer-treatment-in-india",
  "cervical-cancer-treatment-in-india",
  "prostate-cancer-treatment-in-india",
  "colon-cancer-treatment-in-india",
  "chemotherapy-in-india",
  "cabg-surgery-in-india",
  "heart-valve-replacement-in-india",
  "coronary-angioplasty-in-india",
  "brain-tumor-surgery-in-india",
  "knee-replacement-surgery-in-india",
  "hip-replacement-surgery-in-india",
  "acl-surgery-in-india",
  "whipple-surgery-in-india",
  "bone-marrow-transplant-in-india",
] as const;

export const ZIMBABWE_CANCER_TREATMENT_SLUGS = TANZANIA_CANCER_TREATMENT_SLUGS;

export const ZIMBABWE_COST_PROCEDURE_NAMES = [
  "Chemotherapy",
  "Immunotherapy",
  "Targeted Therapy",
  "Hormone Therapy",
  "CABG (Coronary Artery Bypass Grafting)",
  "Heart Valve Replacement",
  "Coronary Angioplasty & Stenting",
  "Total Knee Replacement",
  "Total Hip Replacement",
  "Brain Tumor Surgery",
  "Kidney Transplantation",
  "Whipple Procedure (Pancreaticoduodenectomy)",
  "Bone Marrow Transplantation",
] as const;

export const ZIMBABWE_DOCTOR_SPECIALTY_SLUGS = [
  "medical-oncology",
  "surgical-oncology",
  "radiation-oncology",
  "cardiology",
  "cardiac-surgery",
  "neurosurgery",
  "orthopedics",
  "urology",
  "gastroenterology",
  "pediatric-cardiac-surgery",
] as const;

export { resolveCuratedBySlug, tanzaniaCityHrefs, tanzaniaHospitals, tanzaniaSpecialtyHref };

export function resolveZimbabweCostRows(catalog: Treatment[]) {
  return ZIMBABWE_COST_PROCEDURE_NAMES.map((name) => {
    const row = catalog.find((treatment) => treatment.name === name);
    if (!row) return undefined;
    return {
      name: row.name,
      range: row.partnerRange,
      stay: row.stay,
      href: costPath(row.name),
    };
  }).filter((row): row is NonNullable<typeof row> => Boolean(row));
}

export function zimbabweDoctors(doctors: Doctor[]) {
  return ZIMBABWE_DOCTOR_SPECIALTY_SLUGS.map((specialtySlug) => {
    const pool = doctors.filter((doctor) => doctor.specialtySlug === specialtySlug);
    const featured = pool.find((doctor) => doctor.featured);
    return featured ?? [...pool].sort((a, b) => a.name.localeCompare(b.name))[0];
  }).filter((row): row is Doctor => Boolean(row));
}

export const zimbabwePageCopyEn = {
  seo: {
    title: "Medical Treatment in India for Zimbabwean Patients",
    description:
      "Explore medical treatment in India for Zimbabwean patients. Find specialist doctors, hospitals, treatments, indicative costs, e-Medical Visa guidance and support from GAF Healthcare.",
    keywords: [
      "medical treatment in India for Zimbabwean patients",
      "medical treatment in India from Zimbabwe",
      "treatment in India for Zimbabwean patients",
      "medical tourism from Zimbabwe to India",
      "Indian hospitals for Zimbabwean patients",
      "Indian doctors for Zimbabwean patients",
      "medical treatment cost in India for Zimbabwean patients",
      "cancer treatment in India for Zimbabwean patients",
      "cardiac treatment in India for Zimbabwean patients",
      "e-Medical Visa India for Zimbabwe",
      "medical visa India for Zimbabwean citizens",
      "treatment in India from Harare",
      "treatment in India from Zimbabwe",
    ],
  },
  breadcrumb: {
    home: "Home",
    zimbabwe: "Zimbabwe",
    page: "Treatment in India",
  },
  hero: {
    eyebrow: "Medical treatment in India for Zimbabwean patients",
    h1: "Medical Treatment in India for Zimbabwean Patients",
    lede:
      "Zimbabwean patients considering treatment abroad can access specialist hospitals and multidisciplinary medical teams in India across cancer care, cardiology, cardiac surgery, neurosurgery, orthopedics, urology, gastroenterology, fertility, pediatric medicine, transplantation and other complex medical specialties. GAF Healthcare helps patients from Zimbabwe explore treatment options in India, identify relevant specialists and hospitals, obtain medical opinions and indicative treatment estimates, and coordinate the practical steps involved in travelling from Zimbabwe to India.",
    primaryCta: "Get a Medical Opinion",
    secondaryCta: "Explore Treatments",
    whatsappLabel: "WhatsApp +91 90443 46292",
  },
  quickAnswer: {
    heading: "Quick Answer: Can Zimbabwean Patients Travel to India for Medical Treatment?",
    yes: "Yes. Zimbabwean passport holders are currently eligible for India's e-Visa system, including the e-Medical Visa category, subject to the Government of India's current requirements.",
    eligibility: "Zimbabwe appears on the official list of nationalities eligible for India's e-Visa services.",
    evisa:
      "The e-Visa system includes dedicated categories for medical treatment and accompanying medical attendants. The current Government of India guidance allows eligible applicants to apply online for an e-Medical Visa within the specified application window.",
    begin: "For a Zimbabwean patient, the medical journey can begin before travelling.",
    records:
      "The patient can share medical records, previous treatment reports, pathology, imaging and laboratory results with GAF Healthcare. These records can then be used to identify the appropriate specialist and hospital for further evaluation.",
    opinion:
      "A remote medical opinion can help patients understand the possible treatment pathway, expected investigations, estimated hospital stay and indicative cost before making travel arrangements.",
    confirm: "The final diagnosis and treatment plan should always be confirmed by the treating medical team.",
  },
  why: {
    heading: "Why Zimbabwean Patients Consider Medical Treatment in India",
    intro:
      "Travelling from Zimbabwe to India for medical care is a significant decision. Patients and families often need answers to practical questions before travelling: which specialist should evaluate the condition, which hospital has the required infrastructure, what treatment options are available, what treatment could cost, how long the patient might need to stay, what medical records are required, whether a family member can accompany the patient, and how follow-up should be managed after returning to Zimbabwe.",
    points: [
      "India has developed a large tertiary and super-specialty healthcare ecosystem covering oncology, cardiac sciences, neurosciences, orthopedics, transplantation, urology, gastroenterology, fertility and complex surgery",
      "India also has a dedicated medical-value-travel framework and an e-Visa system that includes e-Medical and e-Medical Attendant categories for eligible international travellers",
      "Medical records can be reviewed before travel so the family understands the proposed pathway and indicative cost",
      "English is widely used in Zimbabwe's official and professional environment, which can make medical-document communication relatively straightforward",
      "The hospital should be selected according to the specific diagnosis and treatment requirement, rather than simply choosing a destination",
    ],
    close:
      "India should not be considered automatically suitable for every patient. The right destination depends on the diagnosis, treatment requirement, urgency, hospital capability and the patient's individual circumstances.",
  },
  relationship: {
    heading: "India–Zimbabwe Healthcare Relationship",
    paragraphs: [
      "India and Zimbabwe have a longstanding bilateral relationship. The Ministry of External Affairs describes the two countries as having close and cordial relations, with cooperation across political, economic, technical and development areas. The official April 2026 brief records that then Prime Minister Indira Gandhi represented India at Zimbabwe’s independence in 1980.",
      "Healthcare has formed part of India’s engagement with Zimbabwe. The same official brief records India’s provision of emergency medicines worth about US$2.2 million and 1,000 metric tonnes of rice in 2019–20, 75,000 doses of COVAXIN and 10 ambulances in 2021, and anti-TB medicines worth about US$100,000 in June 2022.",
      "This broader relationship is useful context for patients considering India. The medical decision should remain individual and evidence-based: compare the relevant specialist, hospital, proposed treatment, estimated cost, expected stay and follow-up before travelling.",
    ],
  },
  context: {
    heading: "Planning Treatment from Zimbabwe",
    intro:
      "Zimbabwe has its own hospitals and specialists. International treatment becomes relevant when a patient needs a particular specialist, advanced procedure, complex surgery, specialised diagnostics, multidisciplinary care or another service that is not readily available locally.",
    points: [
      "The India–Zimbabwe healthcare and pharmaceutical relationship can make Indian hospitals a familiar option, but the hospital still has to match the diagnosis.",
      "English is widely used in Indian hospitals, which can make communication more straightforward for many Zimbabwean patients.",
      "Most international medical journeys begin at Robert Gabriel Mugabe International Airport in Harare.",
    ],
    close:
      "The important questions remain: is the relevant specialist available, does the hospital treat this condition, what treatment is being proposed, what is included in the estimate, how long will the patient need to stay, and how will follow-up be managed after returning to Zimbabwe?",
  },
  overview: {
    heading: "What Medical Treatments Can Zimbabwean Patients Get in India?",
    intro:
      "Indian hospitals provide specialist care across a wide range of medical disciplines. The appropriate treatment depends on the patient's diagnosis, stage of disease, previous treatment and overall clinical condition.",
    areas: [
      "Cancer treatment",
      "Medical, surgical and radiation oncology",
      "Cardiology and cardiac surgery",
      "Neurosurgery and spine surgery",
      "Orthopedics and joint replacement",
      "Urology",
      "Gastroenterology and hepatobiliary surgery",
      "Bariatric surgery",
      "IVF and fertility treatment",
      "Pediatric surgery and pediatric cardiac surgery",
      "Kidney, liver and bone-marrow transplantation",
      "Advanced diagnostic evaluation and rehabilitation",
    ],
  },
  treatments: {
    heading: "Popular Treatment Categories for Zimbabwean Patients",
    intro:
      "Each card links only to a live GAF specialty or treatment page. Where GAF does not yet publish a dedicated page, the category is explained without an invented URL.",
    categories: [
      {
        title: "Cancer Treatment",
        body: "Medical, surgical and radiation oncology, including cervical, prostate, breast and colorectal pathways that already have GAF guides. Oesophageal cancer is coordinated after records review because a dedicated page is not yet published.",
        href: "/treatments/breast-cancer-treatment-in-india",
        hrefLabel: "Breast cancer treatment in India",
        specialty: "Medical Oncology",
      },
      {
        title: "Cardiology & Cardiac Surgery",
        body: "Angioplasty, bypass surgery, valve replacement, device implants and selected paediatric cardiac operations.",
        href: "/treatments/cabg-surgery-in-india",
        hrefLabel: "CABG surgery in India",
        specialty: "Cardiology",
      },
      {
        title: "Neurosurgery & Neurology",
        body: "Brain-tumour surgery, craniotomy, endoscopic and pituitary procedures, hydrocephalus and complex spine surgery.",
        href: "/treatments/brain-tumor-surgery-in-india",
        hrefLabel: "Brain tumour surgery in India",
        specialty: "Neurosurgery",
      },
      {
        title: "Orthopaedics",
        body: "Knee and hip replacement, ACL reconstruction, arthroscopy and rehabilitation planning.",
        href: "/treatments/knee-replacement-surgery-in-india",
        hrefLabel: "Knee replacement in India",
        specialty: "Orthopedics",
      },
      {
        title: "Urology",
        body: "Prostate and kidney cancer surgery, stone and prostate procedures, and kidney-transplant evaluation.",
        href: "/treatments/radical-prostatectomy-in-india",
        hrefLabel: "Radical prostatectomy in India",
        specialty: "Urology",
      },
      {
        title: "Gastroenterology",
        body: "Complex abdominal and HPB surgery, including Whipple and HIPEC where clinically appropriate.",
        href: "/treatments/whipple-surgery-in-india",
        hrefLabel: "Whipple surgery in India",
        specialty: "Gastroenterology",
      },
      {
        title: "Paediatric Treatment",
        body: "Paediatric cardiology and cardiac surgery, oncology, neurosurgery and related children’s services arranged with a paediatric team.",
        href: "/treatments/ventricular-septal-defect-surgery-in-india",
        hrefLabel: "VSD surgery in India",
        specialty: "Pediatric Cardiac Surgery",
      },
      {
        title: "Organ Transplantation",
        body: "Kidney, liver, heart and bone-marrow programmes are highly regulated. Eligibility must be confirmed by the transplant centre before travel.",
        href: "/treatments/bone-marrow-transplant-in-india",
        hrefLabel: "Bone marrow transplant in India",
        specialty: "Hematology",
      },
      {
        title: "IVF & Fertility",
        body: "Zimbabwean couples may explore fertility treatment in India following appropriate medical evaluation. GAF does not yet publish a dedicated IVF page. Eligibility, protocols and applicable Indian regulations should be confirmed with the treating fertility centre before travel.",
        href: "",
        hrefLabel: "",
        specialty: "",
      },
      {
        title: "Bariatric Surgery",
        body: "Sleeve gastrectomy and gastric bypass for selected patients after nutritional and medical review.",
        href: "/treatments/sleeve-gastrectomy-in-india",
        hrefLabel: "Sleeve gastrectomy in India",
        specialty: "Bariatric Surgery",
      },
    ],
  },
  directory: {
    heading: "Find treatment by specialty",
    intro:
      "Use this directory to move from this country page into GAF’s live treatment, specialty and cost guides. Items without a dedicated page are listed for planning only.",
    groups: [
      {
        title: "Cancer",
        items: [
          { label: "Breast Cancer", href: "/treatments/breast-cancer-treatment-in-india" },
          { label: "Cervical Cancer", href: "/treatments/cervical-cancer-treatment-in-india" },
          { label: "Prostate Cancer", href: "/treatments/prostate-cancer-treatment-in-india" },
          { label: "Colon Cancer", href: "/treatments/colon-cancer-treatment-in-india" },
          { label: "Ovarian Cancer", href: "/treatments/ovarian-cancer-treatment-in-india" },
          { label: "Pancreatic Cancer", href: "/treatments/pancreatic-cancer-treatment-in-india" },
          { label: "Brain Tumour", href: "/treatments/brain-tumor-surgery-in-india" },
          { label: "Lymphoma", href: "/treatments/lymphoma-treatment-in-india" },
          { label: "Liver Cancer", href: "" },
          { label: "Lung Cancer", href: "" },
          { label: "Chemotherapy", href: "/treatments/chemotherapy-in-india" },
          { label: "Immunotherapy", href: "/treatments/immunotherapy-in-india" },
          { label: "Targeted Therapy", href: "/treatments/targeted-therapy-in-india" },
          { label: "Hormone Therapy", href: "/treatments/hormone-therapy-in-india" },
          { label: "Precision Oncology", href: "/treatments/precision-oncology-in-india" },
          { label: "Brachytherapy", href: "/treatments/brachytherapy-in-india" },
        ],
      },
      {
        title: "Cardiology",
        items: [
          { label: "Angioplasty", href: "/treatments/coronary-angioplasty-in-india" },
          { label: "CABG", href: "/treatments/cabg-surgery-in-india" },
          { label: "Valve Surgery", href: "/treatments/heart-valve-replacement-in-india" },
          { label: "Pacemaker", href: "/treatments/pacemaker-implantation-in-india" },
          { label: "ICD", href: "/treatments/icd-device-implantation-in-india" },
          { label: "TAVR", href: "/treatments/tavr-in-india" },
        ],
      },
      {
        title: "Orthopaedics",
        items: [
          { label: "Knee Replacement", href: "/treatments/knee-replacement-surgery-in-india" },
          { label: "Hip Replacement", href: "/treatments/hip-replacement-surgery-in-india" },
          { label: "ACL Surgery", href: "/treatments/acl-surgery-in-india" },
          { label: "Knee Arthroscopy", href: "/treatments/knee-arthroscopy-surgery-in-india" },
          { label: "Shoulder Arthroscopy", href: "/treatments/shoulder-arthroscopy-surgery-in-india" },
          { label: "Hip Arthroscopy", href: "/treatments/hip-arthroscopy-surgery-in-india" },
        ],
      },
      {
        title: "Neurosurgery",
        items: [
          { label: "Brain Tumour Surgery", href: "/treatments/brain-tumor-surgery-in-india" },
          { label: "Craniotomy", href: "/treatments/craniotomy-surgery-in-india" },
          { label: "Endoscopic Brain Surgery", href: "/treatments/endoscopic-brain-surgery-in-india" },
          { label: "Pituitary Surgery", href: "/treatments/pituitary-tumor-surgery-in-india" },
          { label: "Hydrocephalus Surgery", href: "/treatments/hydrocephalus-surgery-in-india" },
          { label: "Spine Tumour Surgery", href: "/treatments/spine-tumor-surgery-in-india" },
        ],
      },
      {
        title: "Urology",
        items: [
          { label: "Prostate Treatment", href: "/treatments/prostate-cancer-treatment-in-india" },
          { label: "Radical Prostatectomy", href: "/treatments/radical-prostatectomy-in-india" },
          { label: "Kidney Cancer", href: "/treatments/radical-nephrectomy-in-india" },
          { label: "Kidney Transplant Evaluation", href: costPath("Kidney Transplantation") },
        ],
      },
      {
        title: "Fertility",
        items: [
          { label: "IVF", href: "" },
          { label: "ICSI", href: "" },
          { label: "IUI", href: "" },
          { label: "PGT-A", href: "" },
          { label: "Frozen Embryo Transfer", href: "" },
          { label: "Male Infertility", href: "" },
        ],
      },
    ],
  },
  cancer: {
    heading: "Cancer Treatment in India for Zimbabwean Patients",
    intro:
      "Cancer is an important health concern in Zimbabwe. According to the IARC GLOBOCAN 2024 Zimbabwe fact sheet, the country had an estimated 25,125 new cancer cases, 16,378 cancer deaths and 48,918 five-year prevalent cases. These are GLOBOCAN 2024 estimates, not current 2026 case counts, and they should not be interpreted as an indication that every Zimbabwean cancer patient requires treatment abroad.",
    body: "The same official fact sheet ranks cervix uteri first among estimated new cases in both sexes (5,194; 20.7%), followed by prostate (3,635; 14.5%), breast (2,483; 9.9%), oesophagus (1,412; 5.6%) and colorectum (1,375; 5.5%). Among Zimbabwean women, cervical, breast and oesophageal cancers were the leading sites. Among Zimbabwean men, prostate, oesophageal and colorectal cancers were the leading sites. GAF does not yet publish a dedicated oesophageal-cancer page; those cases are coordinated through the relevant oncology or gastrointestinal team after records review.",
    modalities: [
      { label: "Breast Cancer", href: "/treatments/breast-cancer-treatment-in-india" },
      { label: "Cervical Cancer", href: "/treatments/cervical-cancer-treatment-in-india" },
      { label: "Prostate Cancer", href: "/treatments/prostate-cancer-treatment-in-india" },
      { label: "Colon Cancer", href: "/treatments/colon-cancer-treatment-in-india" },
      { label: "Ovarian Cancer", href: "/treatments/ovarian-cancer-treatment-in-india" },
      { label: "Lymphoma", href: "/treatments/lymphoma-treatment-in-india" },
      { label: "Chemotherapy", href: "/treatments/chemotherapy-in-india" },
      { label: "Immunotherapy", href: "/treatments/immunotherapy-in-india" },
      { label: "Targeted Therapy", href: "/treatments/targeted-therapy-in-india" },
      { label: "Hormone Therapy", href: "/treatments/hormone-therapy-in-india" },
      { label: "Precision Oncology", href: "/treatments/precision-oncology-in-india" },
      { label: "Brachytherapy", href: "/treatments/brachytherapy-in-india" },
      { label: "External Beam Radiotherapy", href: "/treatments/external-beam-radiotherapy-in-india" },
      { label: "Surgical Oncologists", href: doctorsPath({ destination: INDIA, specialty: "Surgical Oncology" }) },
      { label: "Medical Oncologists", href: doctorsPath({ destination: INDIA, specialty: "Medical Oncology" }) },
      { label: "Radiation Oncologists", href: doctorsPath({ destination: INDIA, specialty: "Radiation Oncology" }) },
    ],
  },
  cost: {
    heading: "How Much Does Medical Treatment in India Cost for Zimbabwean Patients?",
    intro:
      "There is no universal price for medical treatment in India. Online cost figures should be considered indicative planning ranges, not final hospital quotations. GAF Healthcare presents costs as USD planning estimates from the live catalogue, not guaranteed prices.",
    factors: [
      "Diagnosis and treatment complexity",
      "Hospital, specialist and procedure",
      "Medicines, implants and investigations",
      "Hospitalisation, ICU requirements and rehabilitation",
      "Follow-up and additional procedures",
    ],
    tableIntro:
      "The ranges below are GAF Healthcare planning figures from the live cost catalogue. They are not hospital quotations. Ask the hospital which items are included.",
    disclaimer:
      "An estimate obtained before travel should be considered a planning figure unless it is explicitly issued as a final quotation by the hospital. The final amount may change after physical examination, additional investigations, changes in treatment plan, medicines, implants, ICU care, complications or longer hospitalization.",
    ctaLabel: "Get a treatment-cost review on WhatsApp",
  },
  extraBudget: {
    heading: "Why Zimbabwean Patients Should Compare the Complete Treatment Estimate",
    intro:
      "A lower headline quotation does not necessarily mean a lower total expenditure. Two hospitals may quote different amounts because their estimates include different services.",
    items: [
      "Surgeon and anaesthetist fees",
      "Hospital room, ICU, medicines and investigations",
      "Implants and consumables",
      "Follow-up consultations",
      "Visa fees, flights, accommodation and attendant expenses",
    ],
    close:
      "Comparing the scope of the quotation is more meaningful than comparing only the headline number.",
  },
  cities: {
    heading: "Major Indian Cities for Zimbabwean Patients",
    intro:
      "India's healthcare ecosystem is spread across several major cities. The right city depends on the patient's specialty and selected hospital. Delhi NCR, Mumbai, Chennai, Hyderabad and Bengaluru have specialist hospitals in GAF’s live catalogue.",
    items: [
      {
        name: "Delhi NCR",
        body: "One of India's largest tertiary healthcare hubs, covering oncology, cardiology, neurosurgery, orthopedics, urology, gastroenterology, transplantation and pediatric specialties. Also a major international gateway for northern India.",
        city: "Delhi NCR",
        catalog: true,
      },
      {
        name: "Mumbai",
        body: "Major hospitals providing oncology, cardiology, cardiac surgery, neurosciences, orthopedics, gastroenterology, transplantation, fertility and complex surgery.",
        city: "Mumbai",
        catalog: true,
      },
      {
        name: "Chennai",
        body: "An established healthcare destination for international patients, with specialist services in cardiology, cardiac surgery, oncology, neurosurgery, orthopedics, gastroenterology, transplantation and pediatric specialties.",
        city: "Chennai",
        catalog: true,
      },
      {
        name: "Hyderabad",
        body: "Specialist and tertiary healthcare in oncology, cardiology, neurosurgery, orthopedics, urology, gastroenterology and transplantation.",
        city: "Hyderabad",
        catalog: true,
      },
      {
        name: "Bengaluru",
        body: "A broad specialist healthcare ecosystem covering oncology, cardiology, neurosciences, orthopedics, urology, gastroenterology, fertility and pediatric care.",
        city: "Bengaluru",
        catalog: true,
      },
      {
        name: "Pune",
        body: "Pune provides specialist healthcare across several medical disciplines and can be considered for selected procedures and consultations. GAF’s live city catalogue does not yet include Pune, so this page does not link to a Pune directory.",
        city: "Pune",
        catalog: false,
      },
    ],
  },
  hospitals: {
    heading: "Hospitals in India for Zimbabwean Patients",
    intro:
      "The hospital should be selected around the patient's condition. Look for relevant experience with the particular disease or procedure, the required specialist, the required infrastructure and a clear written estimate. The campuses below are drawn from GAF’s live India catalogue, one from each published city.",
    directoryLabel: "Browse hospitals in India",
  },
  doctors: {
    heading: "Specialist Doctors in India for Zimbabwean Patients",
    intro:
      "Doctor selection should be based on the patient's diagnosis and proposed treatment. A breast-cancer patient may need a surgical oncologist, a medical oncologist and a radiation oncologist. The specialists below are taken from GAF’s live doctor catalogue.",
    directoryLabel: "Browse doctors in India",
  },
  visa: {
    heading: "Medical Visa for Zimbabwean Patients",
    intro:
      "Zimbabwean citizens are currently eligible for India's e-Visa system. The official Government of India e-Visa portal includes Zimbabwe among the eligible nationalities and provides an e-Medical Visa category for eligible patients travelling for medical treatment.",
    points: [
      "The system also provides an e-Medical Attendant Visa for eligible accompanying persons. The current official guidance states that up to two e-Medical Attendant Visas may be granted against one e-Medical Visa.",
      "Eligible applicants can apply online. Applications for e-Medical and e-Medical Attendant visas can be submitted at least four days before arrival, with an application window extending up to 120 days before the intended arrival date.",
      "The passport should have at least six months' validity at the time of application and at least two blank pages. A recent passport photograph and passport bio page are required.",
      "The official e-Visa fee list currently records US$80 for Zimbabwe for both the e-Medical Visa and the e-Medical Attendant Visa. A 2.5% bank charge is stated on the same schedule. Fees can change, so patients should verify the live amount before paying.",
      "A regular Medical Visa remains available through the Embassy of India in Harare. The Embassy currently accepts applications Monday to Friday from 0900 to 1200 hours and states that collection is after two working days between 1600 and 1700 hours. Its published notes ask for a passport with at least six months’ validity and three blank pages, a local doctor’s letter, an Indian hospital letter showing patient and attendant names plus an estimate (emailed to cons@embindia.org.zw), a bank statement, proof of the attendant’s relationship, and the applicable fee in cash.",
    ],
    disclaimer:
      "Do not rely on an old medical-tourism article or an unofficial visa website. Verify the current official e-Visa portal and the Embassy of India in Harare before applying or travelling.",
    documentsHeading: "e-Medical Visa and regular Medical Visa documents",
    documents: [
      "Passport with at least six months’ validity; two blank pages for an e-Visa, and three blank pages as currently stated for the Embassy Medical Visa",
      "Recent photograph and passport bio page",
      "Indian hospital letter with tentative admission or treatment date for an e-Medical Visa",
      "For the regular Medical Visa: local doctor’s letter, Indian hospital letter with patient and attendant names plus estimate emailed to cons@embindia.org.zw, bank statement and attendant-relationship proof, as currently published",
      "Attendant passports and documents where a family member will travel",
    ],
    documentsNote:
      "Patients should determine which visa route applies to their circumstances rather than submitting documents based on an outdated third-party checklist.",
  },
  yellowFever: {
    heading: "Health-Entry Requirements for Travelling from Zimbabwe",
    intro:
      "Zimbabwean patients should check India’s current health-entry requirements before departure. India’s e-Visa guidance states that travellers arriving from yellow-fever affected countries must carry the required vaccination certificate.",
    points: [
      "The Embassy of India in Harare currently asks for a yellow-fever vaccination card where the traveller is transiting, or has transited, a yellow-fever zone. Do not assume that every Zimbabwean applicant needs the same certificate.",
      "Carry the passport, visa or e-Visa authorisation, hospital letter and any vaccination certificate requested by the live official notes.",
      "Do not rely on an old travel-forum checklist for vaccination or entry rules.",
    ],
    close:
      "Confirm the current requirement on the official Indian e-Visa portal, the Bureau of Immigration and the Embassy of India in Harare before travel.",
  },
  travel: {
    heading: "Travelling from Zimbabwe to India for Medical Treatment",
    intro:
      "Zimbabwean patients should plan their journey around the confirmed medical schedule. Robert Gabriel Mugabe International Airport in Harare is Zimbabwe's principal international gateway. Flight routes and schedules to India can change depending on airline operations, season and connecting airports.",
    points: [
      "The airport should normally correspond to the selected hospital.",
      "For major surgery or cancer treatment, it is generally better to confirm the medical opinion, specialist, hospital, proposed treatment, expected admission date and approximate treatment duration before booking a fixed return ticket.",
      "Patients should check current flight availability before booking.",
    ],
    tableHeading: "Likely arrival airports",
    airports: [
      { city: "Delhi NCR", airport: "Indira Gandhi International Airport" },
      { city: "Mumbai", airport: "Chhatrapati Shivaji Maharaj International Airport" },
      { city: "Chennai", airport: "Chennai International Airport" },
      { city: "Hyderabad", airport: "Rajiv Gandhi International Airport" },
      { city: "Bengaluru", airport: "Kempegowda International Airport" },
    ],
  },
  documents: {
    heading: "Documents Zimbabwean Patients Should Prepare",
    intro:
      "The exact documents depend on the patient's medical condition. A medical-travel file should contain both physical and digital copies.",
    general: [
      "Passport copy, doctor's referral, diagnosis report and blood investigations",
      "Pathology, biopsy, immunohistochemistry and molecular reports",
      "CT, MRI, PET-CT, X-rays and previous operation reports",
      "Discharge summaries, medication list and previous treatment estimates",
      "Chemotherapy and radiation records where relevant",
    ],
    cancer: [
      "Biopsy, histopathology, immunohistochemistry and molecular testing",
      "CT, MRI and PET-CT images as well as reports",
      "Previous chemotherapy, radiation and surgical notes",
    ],
    cardiac: [
      "ECG, echocardiogram and angiography images",
      "Stress-test results and CT coronary angiography",
      "Previous cardiac procedure reports and current medicines",
    ],
    ortho: [
      "X-rays, MRI and CT",
      "Previous surgery reports and physiotherapy records",
    ],
    cancerNote:
      "If pathology slides or tissue blocks are available, the receiving cancer centre can advise whether they should be brought for review.",
  },
  living: {
    heading: "Food, Language and Accommodation for Zimbabwean Patients",
    intro:
      "Accommodation should be selected according to the treatment. For surgery or prolonged treatment, patients may prefer accommodation with easy hospital access, a lift, kitchen facilities, laundry, family rooms and nearby pharmacies.",
    accommodation: [
      "Hotel, serviced apartment, long-stay or hospital-associated accommodation",
      "Distance from the hospital, lift access and wheelchair accessibility",
      "Attendant accommodation and kitchen facilities",
      "Pharmacy access, grocery access and reliable transportation",
    ],
    accommodationNote:
      "For patients undergoing repeated chemotherapy or radiation therapy, staying near the hospital may reduce daily travel.",
    food: "Patients travelling from Zimbabwe may have specific dietary preferences. Follow the dietary advice of the treating medical team, particularly after surgery or during cancer treatment.",
    language:
      "English is widely used in Zimbabwe's official and professional environment. This can make medical-document communication relatively straightforward for many Zimbabwean patients travelling to India. Patients should nevertheless confirm with the selected hospital whether any report requires additional formatting.",
  },
  stay: {
    heading: "How Long Will a Zimbabwean Patient Need to Stay in India?",
    intro:
      "The duration depends on the treatment. A consultation may require a short stay, while surgery, cancer treatment, rehabilitation or transplantation may require a longer period. These are planning estimates rather than promises.",
    rows: [
      { treatment: "Specialist consultation", stay: "2–5 days" },
      { treatment: "Diagnostic evaluation", stay: "2–7 days" },
      { treatment: "Major surgery", stay: "1–4 weeks or longer" },
      { treatment: "Joint replacement", stay: "Around 1–3 weeks" },
      { treatment: "Cancer surgery", stay: "Often 2–4 weeks" },
      { treatment: "Radiation or chemotherapy", stay: "Depends on protocol" },
      { treatment: "IVF", stay: "Often several weeks" },
      { treatment: "Complex transplant", stay: "Several weeks to months" },
    ],
  },
  journey: {
    heading: "The Medical Treatment Journey from Zimbabwe to India",
    intro:
      "If you are considering treatment in India, begin with your medical records rather than your flight booking. A records-first sequence allows many questions to be addressed before leaving Harare.",
    steps: [
      { title: "Share your medical records", body: "Send the most recent diagnosis, reports, imaging, pathology, previous treatment and current medicines." },
      { title: "Identify the relevant specialty", body: "The case is reviewed to identify the appropriate specialty — for example cancer to medical, surgical and radiation oncology." },
      { title: "Obtain a medical opinion", body: "The relevant Indian specialist reviews the available records. A remote opinion does not replace an in-person examination." },
      { title: "Compare suitable hospitals", body: "Compare specialist, procedure, infrastructure, location, estimated cost, expected stay and follow-up arrangements." },
      { title: "Receive hospital documentation", body: "After the hospital reviews the case, relevant hospital documentation can be arranged for the medical-travel process." },
      { title: "Apply for the medical visa", body: "Eligible Zimbabwean citizens can apply through India's e-Medical Visa system or the regular Medical Visa through the Embassy in Harare." },
      { title: "Plan the journey", body: "Book flights and accommodation around the hospital's confirmed schedule. Allow sufficient time for consultation and pre-treatment testing." },
      { title: "Arrive in India", body: "International patients may receive support with airport transfer, accommodation, hospital appointments and local transportation." },
      { title: "Receive treatment", body: "The treating hospital manages clinical care. The treatment plan may change after physical examination or additional investigations." },
      { title: "Discharge and follow-up", body: "Collect the discharge summary, treatment records, prescriptions, investigation reports, imaging, operative report and follow-up plan." },
      { title: "Return to Zimbabwe", body: "Travel home only after the treating doctor clears the patient to fly." },
      { title: "Keep the records", body: "Carry complete discharge and follow-up documents for any later review in Zimbabwe or India." },
    ],
  },
  help: {
    heading: "How GAF Healthcare Helps Zimbabwean Patients",
    intro:
      "GAF Healthcare helps international patients coordinate the practical aspects of seeking treatment in India. The exact services available should be confirmed before travel.",
    before: [
      "Medical case coordination and records review",
      "Hospital and specialist matching",
      "Medical opinion coordination",
      "Indicative treatment estimates",
      "Medical-visa documentation support",
      "Travel and accommodation coordination",
    ],
    during: [
      "Hospital appointment scheduling",
      "Connection with the treating team",
      "Patient and family communication",
      "Practical support during the stay",
    ],
    after: [
      "Discharge-record collection",
      "Follow-up planning",
      "Return-travel planning when the doctor clears travel",
    ],
    note: "GAF Healthcare's role is to help patients understand and coordinate their options rather than make the clinical decision for them. Visa approval remains subject to the Government of India's rules and decision.",
  },
  opinion: {
    heading: "Why Get a Medical Opinion Before Travelling?",
    intro:
      "A medical opinion before travel can help answer whether treatment in India is appropriate, which specialist should evaluate the patient, whether surgery is required, which hospitals can treat the condition, how long the patient might need to stay and what treatment could cost.",
    questions: [
      "Is treatment in India appropriate, and is surgery required?",
      "Which specialist should evaluate the patient, and are additional tests necessary?",
      "What treatment might be recommended, and what could it cost?",
      "Will an attendant be needed, and what follow-up will be required?",
      "How long should the patient remain in India after discharge?",
      "Can follow-up information be shared with a doctor in Zimbabwe?",
    ],
    close:
      "No single country or hospital is appropriate for every patient. For some patients, treatment closer to home may be more practical, particularly where frequent long-term follow-up is required.",
  },
  choose: {
    heading: "How to Choose a Hospital and Doctor in India",
    intro:
      "The hospital should be selected around the patient's condition. Complex cases may require a subspecialist. Patients should understand the proposed treatment and its purpose.",
    hospital: [
      "Does the hospital treat this condition regularly?",
      "Is the right specialist available, and does the hospital have the required infrastructure?",
      "What does the quotation include, and what happens if additional treatment is required?",
      "What happens after returning to Zimbabwe?",
    ],
    specialist: [
      "Breast cancer → surgical oncologist, medical oncologist, radiation oncologist",
      "Cervical cancer → gynaecologic or surgical oncologist, medical oncologist, radiation oncologist",
      "Prostate cancer → urologist or uro-oncologist, radiation oncologist, medical oncologist where required",
      "Heart disease → cardiologist, interventional cardiologist, cardiac surgeon where required",
    ],
  },
  faqHeading: "Frequently Asked Questions",
  faqs: [
    {
      q: "Can Zimbabwean citizens get medical treatment in India?",
      a: "Yes. Zimbabwean citizens can travel to India for medical treatment, subject to India's current visa and immigration requirements. Zimbabwe is included in India's current e-Visa eligibility framework.",
    },
    {
      q: "Is Zimbabwe eligible for India's e-Medical Visa?",
      a: "Yes. Zimbabwe is listed among the countries eligible for India's e-Visa services, and medical treatment is an eligible purpose under the e-Visa system, subject to the applicable conditions.",
    },
    {
      q: "How much is India's e-Medical Visa for Zimbabwean citizens?",
      a: "The official Government of India e-Visa fee list currently records US$80 for Zimbabwe for both the e-Medical Visa and the e-Medical Attendant Visa. A 2.5% bank charge is stated on the same schedule. Fees can change, so patients should verify the live amount on the official portal before applying.",
    },
    {
      q: "Can a family member accompany a Zimbabwean patient?",
      a: "Yes. India's e-Visa system provides an e-Medical Attendant Visa. The current official guidance states that up to two e-Medical Attendant Visas may be granted against one e-Medical Visa, subject to the applicable requirements.",
    },
    {
      q: "How early can Zimbabwean patients apply for India's e-Medical Visa?",
      a: "The current Government of India guidance says eligible applicants can apply at least four days before arrival, with an application window of up to 120 days before the intended arrival date.",
    },
    {
      q: "What passport validity is required for India's e-Visa?",
      a: "The official guidance states that the passport should have at least six months' validity at the time of application and at least two blank pages for immigration stamping.",
    },
    {
      q: "Can Zimbabwean patients apply for a regular Medical Visa?",
      a: "Yes. The Embassy of India in Harare provides a regular Medical Visa route. Its published notes currently ask for a local doctor’s letter, an Indian hospital letter with patient and attendant names plus an estimate emailed to cons@embindia.org.zw, a bank statement, proof of the attendant’s relationship, and a passport with at least six months’ validity and three blank pages.",
    },
    {
      q: "What treatments can Zimbabwean patients seek in India?",
      a: "Potential treatment areas include oncology, cardiology, cardiac surgery, neurosurgery, orthopedics, urology, gastroenterology, fertility, pediatric specialties and transplantation. The appropriate treatment depends on the patient's diagnosis.",
    },
    {
      q: "Can Zimbabwean patients get cancer treatment in India?",
      a: "Yes. Indian cancer centres offer medical oncology, surgical oncology and radiation oncology services for many cancers. Treatment depends on the cancer type, stage, pathology, molecular findings and previous treatment.",
    },
    {
      q: "Can Zimbabwean patients get IVF treatment in India?",
      a: "Zimbabwean couples may explore IVF and other fertility treatments in India. Eligibility, treatment protocols and applicable legal requirements should be confirmed with the selected fertility centre before travel. GAF does not yet publish a dedicated IVF page.",
    },
    {
      q: "Can I get a second medical opinion from India before travelling?",
      a: "Yes. Patients can share medical records with an appropriate Indian specialist for an initial review. The final diagnosis and treatment plan may require an in-person examination.",
    },
    {
      q: "How much does medical treatment in India cost for Zimbabwean patients?",
      a: "There is no single price. Treatment costs vary according to diagnosis, hospital, specialist, procedure, medicines, implants, investigations and length of hospitalization. GAF Healthcare can coordinate indicative hospital estimates based on the patient's medical records.",
    },
    {
      q: "How long will I need to stay in India?",
      a: "The duration depends on the treatment. A consultation may require a short stay, while surgery, cancer treatment, rehabilitation or transplantation may require a longer period. The treating hospital can provide the most relevant estimate.",
    },
    {
      q: "Which Indian cities can Zimbabwean patients consider?",
      a: "Delhi NCR, Mumbai, Chennai, Hyderabad and Bengaluru are live GAF catalogue cities. Pune can also be considered, but this page does not link to a Pune directory because that city is not yet in the live catalogue.",
    },
    {
      q: "Where does the journey from Zimbabwe usually begin?",
      a: "Robert Gabriel Mugabe International Airport in Harare is Zimbabwe's principal international gateway. Patients travelling from other parts of Zimbabwe may first travel to Harare.",
    },
    {
      q: "Do Zimbabwean patients need a yellow fever vaccination certificate?",
      a: "The Embassy of India in Harare currently asks for a yellow-fever vaccination card where the traveller is transiting, or has transited, a yellow-fever zone. India’s e-Visa guidance also requires the certificate for travellers arriving from yellow-fever affected countries. Confirm the live official notes before travel.",
    },
    {
      q: "Can GAF Healthcare help Zimbabwean patients find a hospital?",
      a: "Yes. GAF Healthcare can help identify hospitals according to the patient's diagnosis, specialty and treatment requirements.",
    },
    {
      q: "Can GAF Healthcare arrange a treatment quotation?",
      a: "GAF Healthcare can coordinate with hospitals to obtain indicative treatment estimates. The final quotation is issued by the hospital.",
    },
    {
      q: "Can GAF Healthcare help with the Indian medical visa?",
      a: "GAF Healthcare can help patients understand the medical-travel documentation and coordinate relevant hospital documentation. Visa approval remains subject to the Government of India's rules and decision.",
    },
    {
      q: "Should I book my flight before receiving the hospital's opinion?",
      a: "For major treatment, it is generally better to obtain the medical opinion and hospital schedule first. This allows the travel plan to be built around the medical schedule.",
    },
    {
      q: "What medical records should I send?",
      a: "Send your diagnosis, medical history, pathology, imaging, previous treatment records, medication list and other relevant investigations. Cancer patients should provide pathology and imaging whenever available.",
    },
    {
      q: "Do medical reports from Zimbabwe need to be translated?",
      a: "If medical reports are not in English, ask the receiving Indian hospital whether translation is required. Do not assume that every document needs translation. The hospital can advise which records are essential for clinical review.",
    },
    {
      q: "Does medical insurance cover treatment in India for Zimbabwean patients?",
      a: "Coverage depends on the individual policy. Ask the insurer about overseas treatment, pre-authorisation, eligible hospitals, reimbursement, travel insurance, emergency treatment, medical evacuation and exclusions. Obtain confirmation in writing where possible.",
    },
    {
      q: "What follow-up is needed after returning to Zimbabwe?",
      a: "The treating specialist should explain the follow-up plan before discharge. Patients should collect the discharge summary, prescriptions, investigation reports, imaging and operative notes. Some follow-up can often be coordinated remotely after returning to Zimbabwe, depending on the treatment.",
    },
  ],
  finalCta: {
    heading: "Start Your Medical Treatment Journey from Zimbabwe to India",
    body: "If you are considering treatment in India, begin with your medical records rather than your flight booking. GAF Healthcare can help you identify the relevant specialty, explore suitable hospitals and specialists, obtain treatment information and understand the practical steps involved in travelling from Zimbabwe to India.",
    primary: "Get a Medical Opinion",
    secondary: "Talk to a Medical Travel Expert",
    whatsappLabel: "WhatsApp +91 90443 46292",
    steps: "Share your medical records → Get a specialist opinion → Review hospital and treatment options → Plan your journey to India",
  },
  disclaimer: {
    heading: "Important Medical Disclaimer",
    body: "The information on this page is provided for general educational and medical-travel planning purposes. It is not a diagnosis and should not replace consultation with a qualified medical professional. Treatment decisions should be made by the treating medical team after reviewing the patient's medical history and, where necessary, conducting an in-person examination. Treatment costs mentioned or provided through GAF Healthcare are indicative unless explicitly issued as a final quotation by the treating hospital. Visa fees, eligibility criteria, immigration requirements and travel regulations can change. Patients should verify current requirements through official Government of India sources immediately before applying or travelling.",
  },
  sources: {
    heading: "Sources",
    items: [
      {
        label: "Government of India — Official e-Visa portal",
        href: ZIMBABWE_OFFICIAL_LINKS.eVisa,
        detail: "Current e-Visa eligibility, including Zimbabwe, and e-Medical / e-Medical Attendant categories.",
      },
      {
        label: "Government of India — Country/territory-wise e-Visa fee list",
        href: ZIMBABWE_OFFICIAL_LINKS.eVisaFees,
        detail: "Official fee table confirming Zimbabwe among e-Visa eligible countries.",
      },
      {
        label: "Embassy of India, Harare — Visa documents",
        href: ZIMBABWE_OFFICIAL_LINKS.embassyVisa,
        detail: "Regular Medical Visa documents, including the local doctor’s letter, Indian hospital letter, bank statement and attendant-relationship proof.",
      },
      {
        label: "Embassy of India, Harare — Visa fees",
        href: ZIMBABWE_OFFICIAL_LINKS.embassyFees,
        detail: "Current Embassy fee notes for Medical and other visa categories processed in Harare.",
      },
      {
        label: "Ministry of External Affairs, India — India–Zimbabwe relations, April 2026",
        href: ZIMBABWE_OFFICIAL_LINKS.meaBrief,
        detail: "Close and cordial relations, Independence 1980 representation, emergency medicines, COVAXIN, ambulances and anti-TB assistance.",
      },
      {
        label: "Ministry of External Affairs, India — India–Zimbabwe relations, April 2025",
        href: ZIMBABWE_OFFICIAL_LINKS.meaBrief2025,
        detail: "Background on the bilateral relationship and India’s development and healthcare-related assistance to Zimbabwe.",
      },
      {
        label: "IARC / WHO — GLOBOCAN 2024 Zimbabwe fact sheet",
        href: ZIMBABWE_OFFICIAL_LINKS.globocan,
        detail: "Estimated 25,125 new cases, 16,378 deaths and 48,918 five-year prevalent cases, with cervix, prostate, breast, oesophagus and colorectum as leading sites.",
      },
      {
        label: "WHO — Zimbabwe health data overview",
        href: ZIMBABWE_OFFICIAL_LINKS.whoData,
        detail: "Country-level WHO health information, including leading causes of death.",
      },
      {
        label: "Ministry of Health and Family Welfare, India — IHR yellow-fever vaccination",
        href: ZIMBABWE_OFFICIAL_LINKS.mohfwYellowFever,
        detail: "India’s yellow-fever vaccination notes for travellers arriving from affected countries.",
      },
      {
        label: "Government of India — Bureau of Immigration",
        href: ZIMBABWE_OFFICIAL_LINKS.boi,
        detail: "Entry and immigration instructions for travellers arriving in India.",
      },
    ],
  },
};
