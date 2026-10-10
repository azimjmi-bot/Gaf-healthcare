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

export const MOROCCO_PAGE_PATH = "/morocco/treatment-in-india";
export const MOROCCO_PAGE_LOCALES = ["en"] as const;
export const MOROCCO_LAST_REVIEWED = "2026-10-03";

export type MoroccoPageCopy = typeof moroccoPageCopyEn;

export function moroccoPageCopy(_locale: AppLocale): MoroccoPageCopy {
  return moroccoPageCopyEn;
}

const INDIA = "India";

export const MOROCCO_OFFICIAL_LINKS = {
  eVisa: "https://indianvisaonline.gov.in/evisa/tvoa.html",
  eVisaHome: "https://indianvisaonline.gov.in/evisa/",
  eVisaFees: "https://indianvisaonline.gov.in/evisa/eTV_revised_fee_final.pdf",
  visaOnline: "https://indianvisaonline.gov.in/visa/",
  embassy: "https://indianembassyrabat.gov.in/",
  embassyVisa: "https://indianembassyrabat.gov.in/pages?id=vbmOe&nextid=7ax9b&subid=Pdy7a",
  embassyDocs: "https://indianembassyrabat.gov.in/pages?id=vbmOe&nextid=1aKRe&subid=Pdy7a",
  embassyFees: "https://www.indianembassyrabat.gov.in/pages?id=vbmOe&nextid=kazYe&subid=Pdy7a",
  embassyProcedure: "https://indianembassyrabat.gov.in/pages?id=vbmOe&nextid=QdJ2d&subid=Pdy7a",
  meaBrief: "https://www.mea.gov.in/Portal/ForeignRelation/India-Morocco-26.pdf",
  meaBrief2023: "https://www.mea.gov.in/Portal/ForeignRelation/Moracco-2023.pdf",
  globocan: "https://gco.iarc.who.int/media/globocan/factsheets/populations/504-morocco-fact-sheet.pdf",
  iarcToday: "https://gco.iarc.who.int/today/en/fact-sheets-populations",
  whoData: "https://data.who.int/countries/504",
  boi: "https://boi.gov.in",
} as const;

export const MOROCCO_CURATED_TREATMENT_SLUGS = [
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

export const MOROCCO_CANCER_TREATMENT_SLUGS = TANZANIA_CANCER_TREATMENT_SLUGS;

export const MOROCCO_COST_PROCEDURE_NAMES = [
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

export const MOROCCO_DOCTOR_SPECIALTY_SLUGS = [
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

export function resolveMoroccoCostRows(catalog: Treatment[]) {
  return MOROCCO_COST_PROCEDURE_NAMES.map((name) => {
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

export function moroccoDoctors(doctors: Doctor[]) {
  return MOROCCO_DOCTOR_SPECIALTY_SLUGS.map((specialtySlug) => {
    const pool = doctors.filter((doctor) => doctor.specialtySlug === specialtySlug);
    const featured = pool.find((doctor) => doctor.featured);
    return featured ?? [...pool].sort((a, b) => a.name.localeCompare(b.name))[0];
  }).filter((row): row is Doctor => Boolean(row));
}

export const moroccoPageCopyEn = {
  seo: {
    title: "Medical Treatment in India for Moroccan Patients",
    description:
      "Explore medical treatment in India for Moroccan patients. Find specialist doctors, hospitals, treatments, indicative costs, e-Medical Visa guidance and support from GAF Healthcare.",
    keywords: [
      "medical treatment in India for Moroccan patients",
      "medical treatment in India from Morocco",
      "treatment in India for Moroccan patients",
      "medical tourism from Morocco to India",
      "Indian hospitals for Moroccan patients",
      "Indian doctors for Moroccan patients",
      "medical treatment cost in India for Moroccan patients",
      "cancer treatment in India for Moroccan patients",
      "cardiac treatment in India for Moroccan patients",
      "e-Medical Visa India for Morocco",
      "medical visa India for Moroccan citizens",
      "treatment in India from Casablanca",
      "treatment in India from Rabat",
      "treatment in India from Morocco",
    ],
  },
  breadcrumb: {
    home: "Home",
    morocco: "Morocco",
    page: "Treatment in India",
  },
  hero: {
    eyebrow: "Medical treatment in India for Moroccan patients",
    h1: "Medical Treatment in India for Moroccan Patients",
    lede:
      "Moroccan patients considering treatment abroad can access specialist hospitals and multidisciplinary medical teams in India across cancer care, cardiology, cardiac surgery, neurosurgery, orthopedics, urology, gastroenterology, fertility, pediatric medicine, transplantation and other complex medical specialties. GAF Healthcare helps patients from Morocco explore treatment options in India, identify relevant specialists and hospitals, obtain medical opinions and indicative treatment estimates, and coordinate the practical steps involved in travelling from Morocco to India.",
    primaryCta: "Get a Medical Opinion",
    secondaryCta: "Explore Treatments",
    whatsappLabel: "WhatsApp +91 90443 46292",
  },
  quickAnswer: {
    heading: "Quick Answer: Can Moroccan Patients Travel to India for Medical Treatment?",
    yes: "Yes. Moroccan passport holders are currently included among the nationalities eligible to apply for India's e-Visa, including the e-Medical Visa category, subject to the Government of India's eligibility and immigration rules.",
    eligibility:
      "The official Indian e-Visa system specifically lists Morocco among eligible countries and permits e-Medical Visa applications for qualifying medical treatment.",
    evisa:
      "The e-Visa system includes dedicated categories for medical treatment and accompanying medical attendants. The current Government of India guidance allows eligible applicants to apply online for an e-Medical Visa within the specified application window.",
    begin: "For a Moroccan patient, the medical journey can begin before travelling.",
    records:
      "The patient can share medical records, previous treatment reports, pathology, imaging and laboratory results with GAF Healthcare. These records can then be used to identify the appropriate specialist and hospital for further evaluation.",
    opinion:
      "A remote medical opinion can help patients understand the possible treatment pathway, expected investigations, estimated hospital stay and indicative cost before making travel arrangements.",
    confirm: "The final diagnosis and treatment plan should always be confirmed by the treating medical team.",
  },
  why: {
    heading: "Why Moroccan Patients Consider Medical Treatment in India",
    intro:
      "Travelling from Morocco to India for medical care is a significant decision. Patients and families often need answers to practical questions before travelling: which specialist should evaluate the condition, which hospital has the required infrastructure, what treatment options are available, what treatment could cost, how long the patient might need to stay, what medical records are required, whether a family member can accompany the patient, and how follow-up should be managed after returning to Morocco.",
    points: [
      "India has developed a large tertiary and super-specialty healthcare ecosystem covering oncology, cardiac sciences, neurosciences, orthopedics, transplantation, urology, gastroenterology, fertility and complex surgery",
      "India also has a dedicated medical-value-travel framework and an e-Visa system that includes e-Medical and e-Medical Attendant categories for eligible international travellers",
      "Medical records can be reviewed before travel so the family understands the proposed pathway and indicative cost",
      "Arabic and French are widely used in Morocco. Ask the receiving hospital which reports need accurate English translation before translating everything",
      "The hospital should be selected according to the specific diagnosis and treatment requirement, rather than simply choosing a destination",
    ],
    close:
      "India should not be considered automatically suitable for every patient. The right destination depends on the diagnosis, treatment requirement, urgency, hospital capability and the patient's individual circumstances.",
  },
  relationship: {
    heading: "India–Morocco Healthcare Relationship",
    paragraphs: [
      "India recognised Morocco on 20 June 1956, immediately after independence, and the two countries established diplomatic relations in 1957. The Ministry of External Affairs describes India–Morocco relations as cordial and friendly, with cooperation across political, economic and other areas.",
      "The official April 2026 brief records continued high-level engagement, including the September 2025 visit of India’s Defence Minister and political consultations in November 2025. India’s medical-value-travel framework and e-Medical Visa system are the practical planning context for patients. Bilateral relations do not determine a clinical pathway.",
      "A Moroccan patient considering treatment in India should still compare the proposed treatment, specialist experience, hospital facilities, expected stay, follow-up and total estimated expenditure before travelling.",
    ],
  },
  context: {
    heading: "Planning Treatment from Morocco",
    intro:
      "Morocco has its own hospitals and specialists. International treatment becomes relevant when a patient needs a particular specialist, advanced procedure, complex surgery, specialised diagnostics, multidisciplinary care or another service that is not readily available locally.",
    points: [
      "The India–Morocco relationship is useful background, but the hospital still has to match the diagnosis.",
      "Arabic and French are widely used in Morocco, while English is commonly used in India's international-patient environment. Confirm interpretation and translation needs before travel.",
      "Most international medical journeys begin at Casablanca Mohammed V International Airport.",
    ],
    close:
      "The important questions remain: is the relevant specialist available, does the hospital treat this condition, what treatment is being proposed, what is included in the estimate, how long will the patient need to stay, and how will follow-up be managed after returning to Morocco?",
  },
  overview: {
    heading: "What Medical Treatments Can Moroccan Patients Get in India?",
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
    heading: "Popular Treatment Categories for Moroccan Patients",
    intro:
      "Each card links only to a live GAF specialty or treatment page. Where GAF does not yet publish a dedicated page, the category is explained without an invented URL.",
    categories: [
      {
        title: "Cancer Treatment",
        body: "Medical, surgical and radiation oncology, including breast, colorectal, prostate and cervical pathways that already have GAF guides. Lung and thyroid cancers are coordinated after records review because dedicated pages are not yet published.",
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
        body: "Moroccan couples may explore fertility treatment in India following appropriate medical evaluation. GAF does not yet publish a dedicated IVF page. Eligibility, protocols and applicable Indian regulations should be confirmed with the treating fertility centre before travel.",
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
    heading: "Cancer Treatment in India for Moroccan Patients",
    intro:
      "Cancer is an important health concern in Morocco. According to the IARC GLOBOCAN 2024 Morocco fact sheet, the country had an estimated 47,944 new cancer cases, 26,459 cancer deaths and 113,159 five-year prevalent cases. These are GLOBOCAN 2024 estimates, not current 2026 case counts, and they should not be interpreted as an indication that every Moroccan cancer patient requires treatment abroad.",
    body: "The same official fact sheet ranks breast first among estimated new cases in both sexes (10,410; 21.7%), followed by lung (6,101; 12.7%), colorectum (4,040; 8.4%), prostate (3,533; 7.4%) and thyroid (3,209; 6.7%). Among Moroccan women, breast, thyroid and cervical cancers were the leading sites. Among Moroccan men, lung, prostate and colorectal cancers were the leading sites. GAF does not yet publish dedicated lung-cancer or thyroid-cancer pages; those cases are coordinated through the relevant oncology team after records review.",
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
    heading: "How Much Does Medical Treatment in India Cost for Moroccan Patients?",
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
    heading: "Why Moroccan Patients Should Compare the Complete Treatment Estimate",
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
    heading: "Major Indian Cities for Moroccan Patients",
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
    heading: "Hospitals in India for Moroccan Patients",
    intro:
      "The hospital should be selected around the patient's condition. Look for relevant experience with the particular disease or procedure, the required specialist, the required infrastructure and a clear written estimate. The campuses below are drawn from GAF’s live India catalogue, one from each published city.",
    directoryLabel: "Browse hospitals in India",
  },
  doctors: {
    heading: "Specialist Doctors in India for Moroccan Patients",
    intro:
      "Doctor selection should be based on the patient's diagnosis and proposed treatment. A breast-cancer patient may need a surgical oncologist, a medical oncologist and a radiation oncologist. The specialists below are taken from GAF’s live doctor catalogue.",
    directoryLabel: "Browse doctors in India",
  },
  visa: {
    heading: "Medical Visa for Moroccan Patients",
    intro:
      "Moroccan citizens are currently eligible for India's e-Visa system. The official Government of India e-Visa portal includes Morocco among the eligible nationalities and provides an e-Medical Visa category for eligible patients travelling for medical treatment.",
    points: [
      "The system also provides an e-Medical Attendant Visa for eligible accompanying persons. The current official guidance states that up to two e-Medical Attendant Visas may be granted against one e-Medical Visa.",
      "Eligible applicants can apply online. Applications for e-Medical and e-Medical Attendant visas can be submitted at least four days before arrival, with an application window extending up to 120 days before the intended arrival date.",
      "The passport should have at least six months' validity at the time of application and at least two blank pages. A recent passport photograph and passport bio page are required.",
      "The official e-Visa fee list currently records US$80 for Morocco for both the e-Medical Visa and the e-Medical Attendant Visa. A bank charge is also stated on the official portal. Fees can change, so patients should verify the live amount before paying.",
      "A regular Medical Visa remains available through the Embassy of India in Rabat. Applicants complete the official regular-visa form, select the Morocco–Rabat mission, and submit the printed file at the Embassy. The Embassy’s published Medical Visa notes ask for a local doctor’s recommendation and an Indian hospital letter accepting the patient, stating the estimated expenditure and the patient’s name and passport details. Hospital authorities must email that letter to the Embassy.",
    ],
    disclaimer:
      "Do not rely on an old medical-tourism article or an unofficial visa website. Verify the current official e-Visa portal and the Embassy of India in Rabat before applying or travelling.",
    documentsHeading: "e-Medical Visa and regular Medical Visa documents",
    documents: [
      "Passport with at least six months’ validity and two blank pages",
      "Recent photograph and passport bio page",
      "Indian hospital letter with tentative admission or treatment date for an e-Medical Visa",
      "For the regular Medical Visa: local doctor’s recommendation, Indian hospital acceptance letter with estimated expenditure and patient passport details, emailed by the hospital to the Embassy",
      "Attendant names and passport numbers on the hospital letter where a family member will travel. The Embassy currently allows a maximum of two attendants, with visas co-terminus with the patient’s visa",
    ],
    documentsNote:
      "Patients should determine which visa route applies to their circumstances rather than submitting documents based on an outdated third-party checklist.",
  },
  yellowFever: {
    heading: "Language, Translation and Communication for Moroccan Patients",
    intro:
      "Arabic and French are widely used in Morocco, while English is commonly used in India's medical and international-patient environment. This is a planning issue, not a barrier, if it is addressed before travel.",
    points: [
      "Ask the receiving hospital which documents need English translation. Pathology, operative and major oncology reports should be translated accurately when requested.",
      "Avoid informal translation of important medical information when treatment decisions depend on it.",
      "Confirm whether the hospital has French-speaking support, Arabic interpretation, or whether a family member will accompany the patient as an interpreter.",
      "India’s e-Visa guidance also asks travellers arriving from yellow-fever affected countries to carry the required vaccination certificate. Confirm the live official notes before travel; do not rely on an old checklist.",
    ],
    close:
      "GAF Healthcare can help coordinate communication requirements with the selected hospital where such support is available.",
  },
  travel: {
    heading: "Travelling from Morocco to India for Medical Treatment",
    intro:
      "Moroccan patients should plan their journey around the confirmed medical schedule. Casablanca Mohammed V International Airport is Morocco's principal international gateway. Flight routes and schedules to India can change depending on airline operations, season and connecting airports.",
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
    heading: "Documents Moroccan Patients Should Prepare",
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
    heading: "Food, Language and Accommodation for Moroccan Patients",
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
    food: "Patients travelling from Morocco may have specific dietary preferences. Follow the dietary advice of the treating medical team, particularly after surgery or during cancer treatment.",
    language:
      "Arabic and French are widely used in Morocco, while English is commonly used in Indian hospitals. Confirm interpretation support and which reports need English translation before travelling.",
  },
  stay: {
    heading: "How Long Will a Moroccan Patient Need to Stay in India?",
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
    heading: "The Medical Treatment Journey from Morocco to India",
    intro:
      "If you are considering treatment in India, begin with your medical records rather than your flight booking. A records-first sequence allows many questions to be addressed before leaving Casablanca.",
    steps: [
      { title: "Share your medical records", body: "Send the most recent diagnosis, reports, imaging, pathology, previous treatment and current medicines." },
      { title: "Identify the relevant specialty", body: "The case is reviewed to identify the appropriate specialty — for example cancer to medical, surgical and radiation oncology." },
      { title: "Obtain a medical opinion", body: "The relevant Indian specialist reviews the available records. A remote opinion does not replace an in-person examination." },
      { title: "Compare suitable hospitals", body: "Compare specialist, procedure, infrastructure, location, estimated cost, expected stay and follow-up arrangements." },
      { title: "Receive hospital documentation", body: "After the hospital reviews the case, relevant hospital documentation can be arranged for the medical-travel process." },
      { title: "Apply for the medical visa", body: "Eligible Moroccan citizens can apply through India's e-Medical Visa system or the regular Medical Visa through the Embassy of India in Rabat." },
      { title: "Plan the journey", body: "Book flights and accommodation around the hospital's confirmed schedule. Allow sufficient time for consultation and pre-treatment testing." },
      { title: "Arrive in India", body: "International patients may receive support with airport transfer, accommodation, hospital appointments and local transportation." },
      { title: "Receive treatment", body: "The treating hospital manages clinical care. The treatment plan may change after physical examination or additional investigations." },
      { title: "Discharge and follow-up", body: "Collect the discharge summary, treatment records, prescriptions, investigation reports, imaging, operative report and follow-up plan." },
      { title: "Return to Morocco", body: "Travel home only after the treating doctor clears the patient to fly." },
      { title: "Keep the records", body: "Carry complete discharge and follow-up documents for any later review in Morocco or India." },
    ],
  },
  help: {
    heading: "How GAF Healthcare Helps Moroccan Patients",
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
      "Can follow-up information be shared with a doctor in Morocco?",
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
      "What happens after returning to Morocco?",
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
      q: "Can Moroccan citizens get medical treatment in India?",
      a: "Yes. Moroccan citizens can travel to India for medical treatment, subject to India's current visa and immigration requirements. Morocco is included in India's current e-Visa eligibility framework.",
    },
    {
      q: "Is Morocco eligible for India's e-Medical Visa?",
      a: "Yes. Morocco is listed among the countries eligible for India's e-Visa services, and medical treatment is an eligible purpose under the e-Visa system, subject to the applicable conditions.",
    },
    {
      q: "How much is India's e-Medical Visa for Moroccan citizens?",
      a: "The official Government of India e-Visa fee list currently records US$80 for Morocco for both the e-Medical Visa and the e-Medical Attendant Visa. A bank charge is also stated on the official portal. Fees can change, so patients should verify the live amount before applying.",
    },
    {
      q: "Can a family member accompany a Moroccan patient?",
      a: "Yes. India's e-Visa system provides an e-Medical Attendant Visa. The current official guidance states that up to two e-Medical Attendant Visas may be granted against one e-Medical Visa, subject to the applicable requirements.",
    },
    {
      q: "How early can Moroccan patients apply for India's e-Medical Visa?",
      a: "The current Government of India guidance says eligible applicants can apply at least four days before arrival, with an application window of up to 120 days before the intended arrival date.",
    },
    {
      q: "What passport validity is required for India's e-Visa?",
      a: "The official guidance states that the passport should have at least six months' validity at the time of application and at least two blank pages for immigration stamping.",
    },
    {
      q: "Can Moroccan patients apply for a regular Medical Visa?",
      a: "Yes. The Embassy of India in Rabat provides a regular Medical Visa route. Its published notes currently ask for a local doctor’s recommendation and an Indian hospital letter accepting the patient, stating the estimated expenditure and the patient’s name and passport details. The hospital must email that letter to the Embassy.",
    },
    {
      q: "What treatments can Moroccan patients seek in India?",
      a: "Potential treatment areas include oncology, cardiology, cardiac surgery, neurosurgery, orthopedics, urology, gastroenterology, fertility, pediatric specialties and transplantation. The appropriate treatment depends on the patient's diagnosis.",
    },
    {
      q: "Can Moroccan patients get cancer treatment in India?",
      a: "Yes. Indian cancer centres offer medical oncology, surgical oncology and radiation oncology services for many cancers. Treatment depends on the cancer type, stage, pathology, molecular findings and previous treatment.",
    },
    {
      q: "Can Moroccan patients get IVF treatment in India?",
      a: "Moroccan couples may explore IVF and other fertility treatments in India. Eligibility, treatment protocols and applicable legal requirements should be confirmed with the selected fertility centre before travel. GAF does not yet publish a dedicated IVF page.",
    },
    {
      q: "Can I get a second medical opinion from India before travelling?",
      a: "Yes. Patients can share medical records with an appropriate Indian specialist for an initial review. The final diagnosis and treatment plan may require an in-person examination.",
    },
    {
      q: "How much does medical treatment in India cost for Moroccan patients?",
      a: "There is no single price. Treatment costs vary according to diagnosis, hospital, specialist, procedure, medicines, implants, investigations and length of hospitalization. GAF Healthcare can coordinate indicative hospital estimates based on the patient's medical records.",
    },
    {
      q: "How long will I need to stay in India?",
      a: "The duration depends on the treatment. A consultation may require a short stay, while surgery, cancer treatment, rehabilitation or transplantation may require a longer period. The treating hospital can provide the most relevant estimate.",
    },
    {
      q: "Which Indian cities can Moroccan patients consider?",
      a: "Delhi NCR, Mumbai, Chennai, Hyderabad and Bengaluru are live GAF catalogue cities. Pune can also be considered, but this page does not link to a Pune directory because that city is not yet in the live catalogue.",
    },
    {
      q: "Where does the journey from Morocco usually begin?",
      a: "Casablanca Mohammed V International Airport is Morocco's principal international gateway. Patients travelling from Rabat, Marrakech or other cities may first travel to Casablanca.",
    },
    {
      q: "Do Moroccan patients need a yellow fever vaccination certificate?",
      a: "India’s e-Visa guidance requires the certificate for travellers arriving from yellow-fever affected countries. Confirm the live official notes before travel rather than relying on an old checklist.",
    },
    {
      q: "Can GAF Healthcare help Moroccan patients find a hospital?",
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
      q: "Do medical reports from Morocco need to be translated?",
      a: "Many medical records from Morocco are in French or Arabic. Ask the receiving Indian hospital which documents need accurate English translation. Do not translate medical terminology casually when a treatment decision depends on the report.",
    },
    {
      q: "Does medical insurance cover treatment in India for Moroccan patients?",
      a: "Coverage depends on the individual policy. Ask the insurer about overseas treatment, pre-authorisation, eligible hospitals, reimbursement, travel insurance, emergency treatment, medical evacuation and exclusions. Obtain confirmation in writing where possible.",
    },
    {
      q: "What follow-up is needed after returning to Morocco?",
      a: "The treating specialist should explain the follow-up plan before discharge. Patients should collect the discharge summary, prescriptions, investigation reports, imaging and operative notes. Some follow-up can often be coordinated remotely after returning to Morocco, depending on the treatment.",
    },
  ],
  finalCta: {
    heading: "Start Your Medical Treatment Journey from Morocco to India",
    body: "If you are considering treatment in India, begin with your medical records rather than your flight booking. GAF Healthcare can help you identify the relevant specialty, explore suitable hospitals and specialists, obtain treatment information and understand the practical steps involved in travelling from Morocco to India.",
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
        href: MOROCCO_OFFICIAL_LINKS.eVisa,
        detail: "Current e-Visa eligibility, including Morocco, and e-Medical / e-Medical Attendant categories.",
      },
      {
        label: "Government of India — Country/territory-wise e-Visa fee list",
        href: MOROCCO_OFFICIAL_LINKS.eVisaFees,
        detail: "Official fee table confirming Morocco among e-Visa eligible countries.",
      },
      {
        label: "Embassy of India, Rabat — Medical Visa notes",
        href: MOROCCO_OFFICIAL_LINKS.embassyVisa,
        detail: "Regular Medical Visa purpose, duration and supporting-document summary, including the hospital letter and attendant rules.",
      },
      {
        label: "Embassy of India, Rabat — Visa document checklist",
        href: MOROCCO_OFFICIAL_LINKS.embassyDocs,
        detail: "Doctor’s recommendation, Indian hospital acceptance letter with estimated expenditure, and attendant passport details.",
      },
      {
        label: "Embassy of India, Rabat — Visa fees",
        href: MOROCCO_OFFICIAL_LINKS.embassyFees,
        detail: "Current Embassy fee notes for visa categories processed in Rabat.",
      },
      {
        label: "Ministry of External Affairs, India — India–Morocco relations, April 2026",
        href: MOROCCO_OFFICIAL_LINKS.meaBrief,
        detail: "Current official brief on diplomatic relations and high-level engagement between India and Morocco.",
      },
      {
        label: "Ministry of External Affairs, India — India–Morocco relations, October 2023",
        href: MOROCCO_OFFICIAL_LINKS.meaBrief2023,
        detail: "Recognition of Morocco on 20 June 1956, diplomatic relations from 1957, and background on bilateral cooperation.",
      },
      {
        label: "IARC / WHO — GLOBOCAN 2024 Morocco fact sheet",
        href: MOROCCO_OFFICIAL_LINKS.globocan,
        detail: "Estimated 47,944 new cases, 26,459 deaths and 113,159 five-year prevalent cases, with breast, lung, colorectum, prostate and thyroid as leading sites.",
      },
      {
        label: "WHO — Morocco health data overview",
        href: MOROCCO_OFFICIAL_LINKS.whoData,
        detail: "Country-level WHO health information.",
      },
      {
        label: "Government of India — Bureau of Immigration",
        href: MOROCCO_OFFICIAL_LINKS.boi,
        detail: "Entry and immigration instructions for travellers arriving in India.",
      },
    ],
  },
};
