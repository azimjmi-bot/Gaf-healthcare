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

export const GHANA_PAGE_PATH = "/ghana/treatment-in-india";
export const GHANA_PAGE_LOCALES = ["en"] as const;
export const GHANA_LAST_REVIEWED = "2026-10-03";

export type GhanaPageCopy = typeof ghanaPageCopyEn;

export function ghanaPageCopy(_locale: AppLocale): GhanaPageCopy {
  return ghanaPageCopyEn;
}

const INDIA = "India";

export const GHANA_OFFICIAL_LINKS = {
  eVisa: "https://indianvisaonline.gov.in/evisa/tvoa.html",
  eVisaHome: "https://indianvisaonline.gov.in/evisa/",
  eVisaFees: "https://indianvisaonline.gov.in/evisa/eTV_revised_fee_final.pdf",
  visaOnline: "https://indianvisaonline.gov.in/visa/",
  hci: "https://www.hciaccra.gov.in/",
  hciVisa: "https://www.hciaccra.gov.in/pages/Nzg5",
  hciTypes: "https://www.hciaccra.gov.in/pages/Nzg4",
  hciBilateral: "https://www.hciaccra.gov.in/pages/Nzg2",
  meaBrief: "https://www.mea.gov.in/Portal/ForeignRelation/India-Ghana-2025.pdf",
  meaBrief26: "https://www.mea.gov.in/Portal/ForeignRelation/India-Ghana26.pdf",
  globocan: "https://gco.iarc.who.int/media/globocan/factsheets/populations/288-ghana-fact-sheet.pdf",
  iarcToday: "https://gco.iarc.who.int/today/en/fact-sheets-populations",
  whoData: "https://data.who.int/countries/288",
  mohfwYellowFever: "https://ihpoe.mohfw.gov.in/vaccination.php",
  boi: "https://boi.gov.in",
} as const;

export const GHANA_CURATED_TREATMENT_SLUGS = [
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

export const GHANA_CANCER_TREATMENT_SLUGS = TANZANIA_CANCER_TREATMENT_SLUGS;

export const GHANA_COST_PROCEDURE_NAMES = [
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

export const GHANA_DOCTOR_SPECIALTY_SLUGS = [
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

export function resolveGhanaCostRows(catalog: Treatment[]) {
  return GHANA_COST_PROCEDURE_NAMES.map((name) => {
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

export function ghanaDoctors(doctors: Doctor[]) {
  return GHANA_DOCTOR_SPECIALTY_SLUGS.map((specialtySlug) => {
    const pool = doctors.filter((doctor) => doctor.specialtySlug === specialtySlug);
    const featured = pool.find((doctor) => doctor.featured);
    return featured ?? [...pool].sort((a, b) => a.name.localeCompare(b.name))[0];
  }).filter((row): row is Doctor => Boolean(row));
}

export const ghanaPageCopyEn = {
  seo: {
    title: "Medical Treatment in India for Ghanaian Patients",
    description:
      "Explore medical treatment in India for Ghanaian patients. Find specialist doctors, hospitals, treatments, indicative costs, e-Medical Visa guidance and support from GAF Healthcare.",
    keywords: [
      "medical treatment in India for Ghanaian patients",
      "medical treatment in India from Ghana",
      "treatment in India for Ghanaian patients",
      "medical tourism from Ghana to India",
      "Indian hospitals for Ghanaian patients",
      "Indian doctors for Ghanaian patients",
      "medical treatment cost in India for Ghanaian patients",
      "cancer treatment in India for Ghanaian patients",
      "cardiac treatment in India for Ghanaian patients",
      "e-Medical Visa India for Ghana",
      "medical visa India for Ghanaian citizens",
      "treatment in India from Accra",
      "treatment in India from Ghana",
    ],
  },
  breadcrumb: {
    home: "Home",
    ghana: "Ghana",
    page: "Treatment in India",
  },
  hero: {
    eyebrow: "Medical treatment in India for Ghanaian patients",
    h1: "Medical Treatment in India for Ghanaian Patients",
    lede:
      "Ghanaian patients considering treatment abroad can access specialist hospitals and multidisciplinary medical teams in India across cancer care, cardiology, cardiac surgery, neurosurgery, orthopedics, urology, gastroenterology, fertility, pediatric medicine, transplantation and other complex medical specialties. GAF Healthcare helps patients from Ghana explore treatment options in India, identify relevant specialists and hospitals, obtain medical opinions and indicative treatment estimates, and coordinate the practical steps involved in travelling from Ghana to India.",
    primaryCta: "Get a Medical Opinion",
    secondaryCta: "Explore Treatments",
    whatsappLabel: "WhatsApp +91 90443 46292",
  },
  quickAnswer: {
    heading: "Quick Answer: Can Ghanaian Patients Travel to India for Medical Treatment?",
    yes: "Yes. Ghanaian passport holders are currently eligible for India's e-Visa system, including the e-Medical Visa category, subject to the Government of India's current requirements.",
    eligibility: "Ghana appears on the official list of nationalities eligible for India's e-Visa services.",
    evisa:
      "The e-Visa system includes dedicated categories for medical treatment and accompanying medical attendants. The current Government of India guidance allows eligible applicants to apply online for an e-Medical Visa within the specified application window.",
    begin: "For a Ghanaian patient, the medical journey can begin before travelling.",
    records:
      "The patient can share medical records, previous treatment reports, pathology, imaging and laboratory results with GAF Healthcare. These records can then be used to identify the appropriate specialist and hospital for further evaluation.",
    opinion:
      "A remote medical opinion can help patients understand the possible treatment pathway, expected investigations, estimated hospital stay and indicative cost before making travel arrangements.",
    confirm: "The final diagnosis and treatment plan should always be confirmed by the treating medical team.",
  },
  why: {
    heading: "Why Ghanaian Patients Consider Medical Treatment in India",
    intro:
      "Travelling from Ghana to India for medical care is a significant decision. Patients and families often need answers to practical questions before travelling: which specialist should evaluate the condition, which hospital has the required infrastructure, what treatment options are available, what treatment could cost, how long the patient might need to stay, what medical records are required, whether a family member can accompany the patient, and how follow-up should be managed after returning to Ghana.",
    points: [
      "India has developed a large tertiary and super-specialty healthcare ecosystem covering oncology, cardiac sciences, neurosciences, orthopedics, transplantation, urology, gastroenterology, fertility and complex surgery",
      "India also has a dedicated medical-value-travel framework and an e-Visa system that includes e-Medical and e-Medical Attendant categories for eligible international travellers",
      "Medical records can be reviewed before travel so the family understands the proposed pathway and indicative cost",
      "English is widely used in Ghana's official and professional environment, which can make medical-document communication relatively straightforward",
      "The hospital should be selected according to the specific diagnosis and treatment requirement, rather than simply choosing a destination",
    ],
    close:
      "India should not be considered automatically suitable for every patient. The right destination depends on the diagnosis, treatment requirement, urgency, hospital capability and the patient's individual circumstances.",
  },
  relationship: {
    heading: "India–Ghana Healthcare Relationship",
    paragraphs: [
      "India and Ghana have a longstanding relationship. India’s Ministry of External Affairs records that India opened its representative office in Accra in 1953, before Ghana's independence, and established full diplomatic relations with Ghana in 1957. The official brief describes India–Ghana relations as traditionally warm and friendly, with cooperation across political, economic, development and other areas.",
      "Healthcare and pharmaceuticals form part of the wider relationship. Official briefs record that pharmaceuticals are among India’s major exports to Ghana, and that the High Commission of India in Accra organised an India–Ghana Pharma Business Summit in December 2022. The same official record notes a 2024 visit by Ghana’s drug-regulatory leadership to India for discussions including the Indian Pharmacopoeia and the Janaushadhi scheme.",
      "For an individual patient, however, bilateral relations are only background. Treatment decisions remain dependent on the patient's diagnosis and the hospital's medical assessment.",
    ],
  },
  context: {
    heading: "Planning Treatment from Ghana",
    intro:
      "Ghana has its own hospitals and specialists. International treatment becomes relevant when a patient needs a particular specialist, advanced procedure, complex surgery, specialised diagnostics, multidisciplinary care or another service that is not readily available locally.",
    points: [
      "The India–Ghana healthcare and pharmaceutical relationship can make Indian hospitals a familiar option, but the hospital still has to match the diagnosis.",
      "English is widely used in Indian hospitals, which can make communication more straightforward for many Ghanaian patients.",
      "Most international medical journeys begin at Kotoka International Airport in Accra.",
    ],
    close:
      "The important questions remain: is the relevant specialist available, does the hospital treat this condition, what treatment is being proposed, what is included in the estimate, how long will the patient need to stay, and how will follow-up be managed after returning to Ghana?",
  },
  overview: {
    heading: "What Medical Treatments Can Ghanaian Patients Get in India?",
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
    heading: "Popular Treatment Categories for Ghanaian Patients",
    intro:
      "Each card links only to a live GAF specialty or treatment page. Where GAF does not yet publish a dedicated page, the category is explained without an invented URL.",
    categories: [
      {
        title: "Cancer Treatment",
        body: "Medical, surgical and radiation oncology, including breast, cervical, prostate and colorectal pathways that already have GAF guides. Liver cancer is coordinated after records review because a dedicated page is not yet published.",
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
        body: "Ghanaian couples may explore fertility treatment in India following appropriate medical evaluation. GAF does not yet publish a dedicated IVF page. Eligibility, protocols and applicable Indian regulations should be confirmed with the treating fertility centre before travel.",
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
    heading: "Cancer Treatment in India for Ghanaian Patients",
    intro:
      "Cancer is an important health concern in Ghana. According to the IARC GLOBOCAN 2022 Ghana fact sheet, the country had an estimated 27,260 new cancer cases, 17,662 cancer deaths and 56,295 five-year prevalent cases. These are GLOBOCAN 2022 estimates, not current 2026 case counts, and they should not be interpreted as an indication that every Ghanaian cancer patient requires treatment abroad.",
    body: "The same official fact sheet ranks breast first among estimated new cases in both sexes (5,487; 20.1%), followed by cervix uteri (3,740; 13.7%), liver (2,975; 10.9%), prostate (2,817; 10.3%) and ovary (1,268; 4.7%). Among Ghanaian women, breast and cervical cancers were the two leading types. Among Ghanaian men, prostate cancer was the leading site by number of new cases, followed by liver cancer. GAF does not yet publish a dedicated liver-cancer page; those cases are coordinated through the relevant oncology or hepatobiliary team after records review.",
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
    heading: "How Much Does Medical Treatment in India Cost for Ghanaian Patients?",
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
    heading: "Why Ghanaian Patients Should Compare the Complete Treatment Estimate",
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
    heading: "Major Indian Cities for Ghanaian Patients",
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
    heading: "Hospitals in India for Ghanaian Patients",
    intro:
      "The hospital should be selected around the patient's condition. Look for relevant experience with the particular disease or procedure, the required specialist, the required infrastructure and a clear written estimate. The campuses below are drawn from GAF’s live India catalogue, one from each published city.",
    directoryLabel: "Browse hospitals in India",
  },
  doctors: {
    heading: "Specialist Doctors in India for Ghanaian Patients",
    intro:
      "Doctor selection should be based on the patient's diagnosis and proposed treatment. A breast-cancer patient may need a surgical oncologist, a medical oncologist and a radiation oncologist. The specialists below are taken from GAF’s live doctor catalogue.",
    directoryLabel: "Browse doctors in India",
  },
  visa: {
    heading: "Medical Visa for Ghanaian Patients",
    intro:
      "Ghanaian citizens are currently eligible for India's e-Visa system. The official Government of India e-Visa portal includes Ghana among the eligible nationalities and provides an e-Medical Visa category for eligible patients travelling for medical treatment.",
    points: [
      "The system also provides an e-Medical Attendant Visa for eligible accompanying persons. The current official guidance states that up to two e-Medical Attendant Visas may be granted against one e-Medical Visa.",
      "Eligible applicants can apply online. Applications for e-Medical and e-Medical Attendant visas can be submitted at least four days before arrival, with an application window extending up to 120 days before the intended arrival date.",
      "The passport should have at least six months' validity at the time of application and at least two blank pages. A recent passport photograph and passport bio page are required.",
      "Medical-visa applicants must provide the documents specified by the Government of India for the relevant category, including an Indian hospital letter.",
      "A regular Medical Visa remains available through the High Commission of India in Accra. Its published Medical Visa checklist includes a yellow-fever certificate, a reference letter from a local doctor or hospital, a confirmation letter from a recognised Indian hospital, and the applicant’s bank statement. The High Commission currently states that visas for Ghanaian nationals take around three working days to process.",
    ],
    disclaimer:
      "Do not rely on an old medical-tourism article or an unofficial visa website. Verify the current official e-Visa portal and the High Commission of India in Accra before applying or travelling.",
    documentsHeading: "e-Medical Visa and regular Medical Visa documents",
    documents: [
      "Passport with at least six months’ validity and two blank pages",
      "Recent photograph and passport bio page",
      "Indian hospital letter with tentative admission or treatment date for an e-Medical Visa",
      "For the regular Medical Visa: local doctor or hospital referral, Indian hospital confirmation letter emailed to the High Commission, yellow-fever certificate and bank statement, as currently published",
      "Attendant passports and documents where a family member will travel",
    ],
    documentsNote:
      "Patients should determine which visa route applies to their circumstances rather than submitting documents based on an outdated third-party checklist.",
  },
  yellowFever: {
    heading: "Yellow Fever Requirements for Ghanaian Travellers",
    intro:
      "The High Commission of India in Accra currently lists a yellow-fever vaccination certificate among the basic documents required for visa applications. Ghana is also listed by India’s Ministry of Health among yellow-fever endemic countries for entry screening.",
    points: [
      "India’s IHR points-of-entry guidance requires travellers arriving from yellow-fever endemic countries to carry a valid yellow-fever vaccination certificate issued by an authorised centre.",
      "The High Commission asks applicants to add a photocopy of the yellow-fever page together with the passport bio page.",
      "Address vaccination documents early. An avoidable documentation issue at the border can complicate a planned medical journey.",
    ],
    close:
      "Confirm the current requirement on the official Indian e-Visa portal, the Bureau of Immigration and the High Commission of India in Accra before travel.",
  },
  travel: {
    heading: "Travelling from Ghana to India for Medical Treatment",
    intro:
      "Ghanaian patients should plan their journey around the confirmed medical schedule. Kotoka International Airport in Accra is Ghana's principal international gateway. Flight routes and schedules to India can change depending on airline operations, season and connecting airports.",
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
    heading: "Documents Ghanaian Patients Should Prepare",
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
    heading: "Food, Language and Accommodation for Ghanaian Patients",
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
    food: "Patients travelling from Ghana may have specific dietary preferences. Follow the dietary advice of the treating medical team, particularly after surgery or during cancer treatment.",
    language:
      "English is widely used in Ghana's official and professional environment. This can make medical-document communication relatively straightforward for many Ghanaian patients travelling to India. Patients should nevertheless confirm with the selected hospital whether any report requires additional formatting.",
  },
  stay: {
    heading: "How Long Will a Ghanaian Patient Need to Stay in India?",
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
    heading: "The Medical Treatment Journey from Ghana to India",
    intro:
      "If you are considering treatment in India, begin with your medical records rather than your flight booking. A records-first sequence allows many questions to be addressed before leaving Accra.",
    steps: [
      { title: "Share your medical records", body: "Send the most recent diagnosis, reports, imaging, pathology, previous treatment and current medicines." },
      { title: "Identify the relevant specialty", body: "The case is reviewed to identify the appropriate specialty — for example cancer to medical, surgical and radiation oncology." },
      { title: "Obtain a medical opinion", body: "The relevant Indian specialist reviews the available records. A remote opinion does not replace an in-person examination." },
      { title: "Compare suitable hospitals", body: "Compare specialist, procedure, infrastructure, location, estimated cost, expected stay and follow-up arrangements." },
      { title: "Receive hospital documentation", body: "After the hospital reviews the case, relevant hospital documentation can be arranged for the medical-travel process." },
      { title: "Apply for the medical visa", body: "Eligible Ghanaian citizens can apply through India's e-Medical Visa system or the regular Medical Visa through the High Commission in Accra." },
      { title: "Plan the journey", body: "Book flights and accommodation around the hospital's confirmed schedule. Allow sufficient time for consultation and pre-treatment testing." },
      { title: "Arrive in India", body: "International patients may receive support with airport transfer, accommodation, hospital appointments and local transportation." },
      { title: "Receive treatment", body: "The treating hospital manages clinical care. The treatment plan may change after physical examination or additional investigations." },
      { title: "Discharge and follow-up", body: "Collect the discharge summary, treatment records, prescriptions, investigation reports, imaging, operative report and follow-up plan." },
      { title: "Return to Ghana", body: "Travel home only after the treating doctor clears the patient to fly." },
      { title: "Keep the records", body: "Carry complete discharge and follow-up documents for any later review in Ghana or India." },
    ],
  },
  help: {
    heading: "How GAF Healthcare Helps Ghanaian Patients",
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
      "Can follow-up information be shared with a doctor in Ghana?",
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
      "What happens after returning to Ghana?",
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
      q: "Can Ghanaian citizens get medical treatment in India?",
      a: "Yes. Ghanaian citizens can travel to India for medical treatment, subject to India's current visa and immigration requirements. Ghana is included in India's current e-Visa eligibility framework.",
    },
    {
      q: "Is Ghana eligible for India's e-Medical Visa?",
      a: "Yes. Ghana is listed among the countries eligible for India's e-Visa services, and medical treatment is an eligible purpose under the e-Visa system, subject to the applicable conditions.",
    },
    {
      q: "Can a family member accompany a Ghanaian patient?",
      a: "Yes. India's e-Visa system provides an e-Medical Attendant Visa. The current official guidance states that up to two e-Medical Attendant Visas may be granted against one e-Medical Visa, subject to the applicable requirements.",
    },
    {
      q: "How early can Ghanaian patients apply for India's e-Medical Visa?",
      a: "The current Government of India guidance says eligible applicants can apply at least four days before arrival, with an application window of up to 120 days before the intended arrival date.",
    },
    {
      q: "What passport validity is required for India's e-Visa?",
      a: "The official guidance states that the passport should have at least six months' validity at the time of application and at least two blank pages for immigration stamping.",
    },
    {
      q: "Can Ghanaian patients apply for a regular Medical Visa?",
      a: "Yes. The High Commission of India in Accra provides a regular Medical Visa route. Its published checklist includes a local doctor or hospital letter, an Indian hospital confirmation letter, a yellow-fever certificate and a bank statement.",
    },
    {
      q: "What treatments can Ghanaian patients seek in India?",
      a: "Potential treatment areas include oncology, cardiology, cardiac surgery, neurosurgery, orthopedics, urology, gastroenterology, fertility, pediatric specialties and transplantation. The appropriate treatment depends on the patient's diagnosis.",
    },
    {
      q: "Can Ghanaian patients get cancer treatment in India?",
      a: "Yes. Indian cancer centres offer medical oncology, surgical oncology and radiation oncology services for many cancers. Treatment depends on the cancer type, stage, pathology, molecular findings and previous treatment.",
    },
    {
      q: "Can Ghanaian patients get IVF treatment in India?",
      a: "Ghanaian couples may explore IVF and other fertility treatments in India. Eligibility, treatment protocols and applicable legal requirements should be confirmed with the selected fertility centre before travel. GAF does not yet publish a dedicated IVF page.",
    },
    {
      q: "Can I get a second medical opinion from India before travelling?",
      a: "Yes. Patients can share medical records with an appropriate Indian specialist for an initial review. The final diagnosis and treatment plan may require an in-person examination.",
    },
    {
      q: "How much does medical treatment in India cost for Ghanaian patients?",
      a: "There is no single price. Treatment costs vary according to diagnosis, hospital, specialist, procedure, medicines, implants, investigations and length of hospitalization. GAF Healthcare can coordinate indicative hospital estimates based on the patient's medical records.",
    },
    {
      q: "How long will I need to stay in India?",
      a: "The duration depends on the treatment. A consultation may require a short stay, while surgery, cancer treatment, rehabilitation or transplantation may require a longer period. The treating hospital can provide the most relevant estimate.",
    },
    {
      q: "Which Indian cities can Ghanaian patients consider?",
      a: "Delhi NCR, Mumbai, Chennai, Hyderabad and Bengaluru are live GAF catalogue cities. Pune can also be considered, but this page does not link to a Pune directory because that city is not yet in the live catalogue.",
    },
    {
      q: "Where does the journey from Ghana usually begin?",
      a: "Kotoka International Airport in Accra is Ghana's principal international gateway. Patients travelling from other parts of Ghana may first travel to Accra.",
    },
    {
      q: "Do Ghanaian patients need a yellow fever vaccination certificate?",
      a: "The High Commission of India in Accra currently lists a yellow-fever vaccination certificate among basic visa documents. India’s health-entry guidance also applies to travellers arriving from yellow-fever endemic countries. Confirm the live official notes before travel.",
    },
    {
      q: "Can GAF Healthcare help Ghanaian patients find a hospital?",
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
  ],
  finalCta: {
    heading: "Start Your Medical Treatment Journey from Ghana to India",
    body: "If you are considering treatment in India, begin with your medical records rather than your flight booking. GAF Healthcare can help you identify the relevant specialty, explore suitable hospitals and specialists, obtain treatment information and understand the practical steps involved in travelling from Ghana to India.",
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
        href: GHANA_OFFICIAL_LINKS.eVisa,
        detail: "Current e-Visa eligibility, including Ghana, and e-Medical / e-Medical Attendant categories.",
      },
      {
        label: "Government of India — Country/territory-wise e-Visa fee list",
        href: GHANA_OFFICIAL_LINKS.eVisaFees,
        detail: "Official fee table confirming Ghana among e-Visa eligible countries.",
      },
      {
        label: "High Commission of India, Accra — Visa requirements",
        href: GHANA_OFFICIAL_LINKS.hciVisa,
        detail: "Regular Medical Visa documents, including a yellow-fever certificate, local referral and Indian hospital confirmation.",
      },
      {
        label: "High Commission of India, Accra — Visa types",
        href: GHANA_OFFICIAL_LINKS.hciTypes,
        detail: "Medical Visa purpose, duration and supporting-document summary.",
      },
      {
        label: "Ministry of External Affairs, India — India–Ghana relations",
        href: GHANA_OFFICIAL_LINKS.meaBrief,
        detail: "Official record that India opened its Accra office in 1953 and established diplomatic relations in 1957.",
      },
      {
        label: "High Commission of India, Accra — India–Ghana bilateral brief",
        href: GHANA_OFFICIAL_LINKS.hciBilateral,
        detail: "Pharmaceuticals as a major Indian export, the 2022 Pharma Business Summit and 2024 regulatory discussions.",
      },
      {
        label: "IARC / WHO — GLOBOCAN 2022 Ghana fact sheet",
        href: GHANA_OFFICIAL_LINKS.globocan,
        detail: "Estimated 27,260 new cases, 17,662 deaths and 56,295 five-year prevalent cases, with breast, cervix, liver, prostate and ovary as leading sites.",
      },
      {
        label: "WHO — Ghana health data overview",
        href: GHANA_OFFICIAL_LINKS.whoData,
        detail: "Country-level WHO health information, including NCD indicators.",
      },
      {
        label: "Ministry of Health and Family Welfare, India — IHR yellow-fever vaccination",
        href: GHANA_OFFICIAL_LINKS.mohfwYellowFever,
        detail: "India’s yellow-fever endemic-country list, which includes Ghana, and certificate requirements.",
      },
      {
        label: "Government of India — Bureau of Immigration",
        href: GHANA_OFFICIAL_LINKS.boi,
        detail: "Entry and immigration instructions for travellers arriving in India.",
      },
    ],
  },
};
