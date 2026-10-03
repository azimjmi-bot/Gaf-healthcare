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

export const ALGERIA_PAGE_PATH = "/algeria/treatment-in-india";
export const ALGERIA_PAGE_LOCALES = ["en"] as const;
export const ALGERIA_LAST_REVIEWED = "2026-10-03";

export type AlgeriaPageCopy = typeof algeriaPageCopyEn;

export function algeriaPageCopy(_locale: AppLocale): AlgeriaPageCopy {
  return algeriaPageCopyEn;
}

const INDIA = "India";

export const ALGERIA_OFFICIAL_LINKS = {
  eVisa: "https://indianvisaonline.gov.in/evisa/tvoa.html",
  eVisaHome: "https://indianvisaonline.gov.in/evisa/",
  eVisaFees: "https://indianvisaonline.gov.in/evisa/eTV_revised_fee_final.pdf",
  visaOnline: "https://indianvisaonline.gov.in/visa/",
  embassy: "https://www.indianembassyalgiers.gov.in/",
  embassyDocs: "https://www.indianembassyalgiers.gov.in/page/document-for-visa/",
  embassyVisa: "https://www.indianembassyalgiers.gov.in/page/visa-services/",
  embassyFees: "https://www.indianembassyalgiers.gov.in/page/fee-schedule/",
  embassyContact: "https://www.indianembassyalgiers.gov.in/page/contact-us/",
  meaBrief: "https://www.mea.gov.in/Portal/ForeignRelation/India-Algeria-Relation-May-2025.pdf",
  meaBriefOlder: "https://www.mea.gov.in/Portal/ForeignRelation/India-Algeria-Relations.pdf",
  globocan: "https://gco.iarc.who.int/media/globocan/factsheets/populations/12-algeria-fact-sheet.pdf",
  iarcToday: "https://gco.iarc.who.int/today/en/fact-sheets-populations",
  whoData: "https://data.who.int/countries/012",
  boi: "https://boi.gov.in",
} as const;

export const ALGERIA_CURATED_TREATMENT_SLUGS = [
  "breast-cancer-treatment-in-india",
  "colon-cancer-treatment-in-india",
  "prostate-cancer-treatment-in-india",
  "cervical-cancer-treatment-in-india",
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

export const ALGERIA_CANCER_TREATMENT_SLUGS = TANZANIA_CANCER_TREATMENT_SLUGS;

export const ALGERIA_COST_PROCEDURE_NAMES = [
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

export const ALGERIA_DOCTOR_SPECIALTY_SLUGS = [
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

export function resolveAlgeriaCostRows(catalog: Treatment[]) {
  return ALGERIA_COST_PROCEDURE_NAMES.map((name) => {
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

export function algeriaDoctors(doctors: Doctor[]) {
  return ALGERIA_DOCTOR_SPECIALTY_SLUGS.map((specialtySlug) => {
    const pool = doctors.filter((doctor) => doctor.specialtySlug === specialtySlug);
    const featured = pool.find((doctor) => doctor.featured);
    return featured ?? [...pool].sort((a, b) => a.name.localeCompare(b.name))[0];
  }).filter((row): row is Doctor => Boolean(row));
}

export const algeriaPageCopyEn = {
  seo: {
    title: "Medical Treatment in India for Algerian Patients",
    description:
      "Explore medical treatment in India for Algerian patients. Find specialist doctors, hospitals, treatments, indicative costs, Embassy of India Algiers Medical Visa guidance and support from GAF Healthcare.",
    keywords: [
      "medical treatment in India for Algerian patients",
      "medical treatment in India from Algeria",
      "treatment in India for Algerian patients",
      "medical tourism from Algeria to India",
      "Indian hospitals for Algerian patients",
      "Indian doctors for Algerian patients",
      "medical treatment cost in India for Algerian patients",
      "cancer treatment in India for Algerian patients",
      "cardiac treatment in India for Algerian patients",
      "medical visa India for Algerian citizens",
      "Embassy of India Algiers medical visa",
      "treatment in India from Algiers",
      "treatment in India from Algeria",
    ],
  },
  breadcrumb: {
    home: "Home",
    algeria: "Algeria",
    page: "Treatment in India",
  },
  hero: {
    eyebrow: "Medical treatment in India for Algerian patients",
    h1: "Medical Treatment in India for Algerian Patients",
    lede:
      "Algerian patients considering treatment abroad can access specialist hospitals and multidisciplinary medical teams in India for cancer, cardiac care, neurosurgery, orthopedics, urology, gastroenterology, fertility treatment, pediatric care, transplantation and other complex medical conditions. GAF Healthcare helps patients from Algeria explore appropriate treatment options in India, connect with relevant specialists and hospitals, obtain medical opinions and indicative treatment estimates, and coordinate the practical aspects of travelling to India for treatment.",
    primaryCta: "Get a Medical Opinion",
    secondaryCta: "Explore Treatments",
    whatsappLabel: "WhatsApp +91 90443 46292",
  },
  quickAnswer: {
    heading: "Quick Answer: Can Algerian Patients Travel to India for Medical Treatment?",
    yes: "Yes. Algerian citizens can travel to India for medical treatment, subject to the Government of India's current visa and immigration requirements.",
    visaNote:
      "Algeria is not currently shown on India's official e-Visa fee list. Algerian patients should apply for a regular Medical Visa through the Embassy of India in Algiers rather than assuming that an e-Medical Visa is available.",
    begin: "An Algerian patient does not necessarily need to travel to India before understanding the likely treatment pathway.",
    records:
      "The process can begin by sharing medical records, pathology reports, scans, laboratory results and previous treatment information with GAF Healthcare.",
    opinion:
      "The relevant Indian specialist can then review the available records and provide an initial opinion about the patient's condition, possible treatment approach, appropriate hospital and, where available, an indicative estimate.",
    confirm: "The final diagnosis and treatment plan must be confirmed by the treating medical team after appropriate clinical evaluation.",
    language:
      "Medical records from Algeria may be available in French or Arabic. Ask the receiving hospital which documents need accurate English translation before translating everything.",
  },
  why: {
    heading: "Why Algerian Patients Consider Medical Treatment in India",
    intro:
      "Travelling from Algeria to India for medical treatment is a significant decision. Patients and families generally want answers to practical questions before they travel: which specialist should treat the condition, which hospital has the appropriate infrastructure, what treatment options are available, how much treatment might cost, how long the patient might need to remain in India, what medical records are required, whether a family member can accompany the patient, and what will happen after returning to Algeria.",
    points: [
      "India has a large tertiary and super-specialty healthcare ecosystem covering oncology, cardiac sciences, neurosciences, organ transplantation, orthopedics, urology, gastroenterology, fertility and complex surgery",
      "Many major Indian hospitals have international-patient desks that can review records before travel",
      "French- or Arabic-language medical records can be reviewed once the hospital confirms which documents need English translation",
      "A family member can apply for a Medical Attendant Visa through the Embassy of India in Algiers where the published checklist applies",
      "The hospital should be selected according to the specific medical condition, not simply because India is a popular medical destination",
    ],
    close:
      "India should not be considered automatically suitable for every patient. The right destination depends on the diagnosis, treatment requirement, urgency, hospital capability and the patient's individual circumstances.",
  },
  relationship: {
    heading: "India–Algeria Healthcare Relationship",
    paragraphs: [
      "India and Algeria established diplomatic relations in July 1962, the year Algeria gained independence from French colonial rule. India’s Ministry of External Affairs describes relations between the two countries as cordial, with cooperation across several areas.",
      "Healthcare and pharmaceuticals form part of the wider relationship. Official MEA records note that Indian exports have included pharmaceutical products, that Indian companies participated in Maghreb Pharma in Algiers in February 2024, and that Algeria featured in Advantage Healthcare India 2023 in New Delhi. The same official record states that India cleared commercial supplies of paracetamol and hydroxychloroquine to Algeria in April and May 2020, and that 50,000 doses of COVID-19 vaccines made in India reached Algeria on 1 February 2021.",
      "For an individual patient, bilateral relations are only background. Treatment decisions remain dependent on the patient's diagnosis and the hospital's medical assessment.",
    ],
  },
  context: {
    heading: "Planning Treatment from Algeria",
    intro:
      "Algeria has its own hospitals and specialists. International treatment becomes relevant when a patient needs a particular specialist, advanced procedure, complex surgery, specialised diagnostics, multidisciplinary care or another service that is not readily available locally.",
    points: [
      "The India–Algeria pharmaceutical and healthcare relationship can make Indian hospitals a familiar option, but the hospital still has to match the diagnosis.",
      "Arabic and French are widely used in Algeria, while English is commonly used in India's international-patient environment. Confirm interpretation and translation needs before travel.",
      "Most international medical journeys begin at Houari Boumediene Airport in Algiers.",
    ],
    close:
      "The important questions remain: is the relevant specialist available, does the hospital treat this condition, what treatment is being proposed, what is included in the estimate, how long will the patient need to stay, and how will follow-up be managed after returning to Algeria?",
  },
  overview: {
    heading: "What Medical Treatments Can Algerian Patients Get in India?",
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
    heading: "Popular Treatment Categories for Algerian Patients",
    intro:
      "Each card links only to a live GAF specialty or treatment page. Where GAF does not yet publish a dedicated page, the category is explained without an invented URL.",
    categories: [
      {
        title: "Cancer Treatment",
        body: "Medical, surgical and radiation oncology, including breast, colorectal and prostate pathways that already have GAF guides. Lung and thyroid cancers are coordinated after records review because dedicated pages are not yet published.",
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
        body: "Algerian couples may explore fertility treatment in India after appropriate evaluation. GAF does not yet publish a dedicated IVF page. Eligibility, protocols and applicable Indian regulations should be confirmed with the treating fertility centre before travel.",
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
          { label: "Colon Cancer", href: "/treatments/colon-cancer-treatment-in-india" },
          { label: "Prostate Cancer", href: "/treatments/prostate-cancer-treatment-in-india" },
          { label: "Cervical Cancer", href: "/treatments/cervical-cancer-treatment-in-india" },
          { label: "Ovarian Cancer", href: "/treatments/ovarian-cancer-treatment-in-india" },
          { label: "Pancreatic Cancer", href: "/treatments/pancreatic-cancer-treatment-in-india" },
          { label: "Brain Tumour", href: "/treatments/brain-tumor-surgery-in-india" },
          { label: "Lymphoma", href: "/treatments/lymphoma-treatment-in-india" },
          { label: "Lung Cancer", href: "" },
          { label: "Thyroid Cancer", href: "" },
          { label: "Liver Cancer", href: "" },
          { label: "Endometrial Cancer", href: "" },
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
    heading: "Cancer Treatment in India for Algerian Patients",
    intro:
      "Cancer is an important health concern in Algeria. According to the IARC GLOBOCAN 2024 Algeria fact sheet, the country had an estimated 72,825 new cancer cases, 37,135 cancer deaths and 184,478 five-year prevalent cases. These are GLOBOCAN 2024 estimates, not current 2026 case counts, and they should not be interpreted as an indication that every Algerian cancer patient requires treatment abroad.",
    body: "The same official fact sheet ranks breast first among estimated new cases in both sexes (17,110; 23.5%), followed by colorectum (9,120; 12.5%), lung (5,503; 7.6%), prostate (3,615; 5.0%) and thyroid (3,552; 4.9%). Among Algerian women, breast, colorectal and thyroid cancers were the three leading types. Among Algerian men, colorectal cancer was the leading site by number of new cases, followed by lung and prostate cancer. GAF does not yet publish dedicated lung-cancer or thyroid-cancer pages; those cases are coordinated through the relevant oncology team after records review.",
    modalities: [
      { label: "Breast Cancer", href: "/treatments/breast-cancer-treatment-in-india" },
      { label: "Colon Cancer", href: "/treatments/colon-cancer-treatment-in-india" },
      { label: "Prostate Cancer", href: "/treatments/prostate-cancer-treatment-in-india" },
      { label: "Cervical Cancer", href: "/treatments/cervical-cancer-treatment-in-india" },
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
    heading: "How Much Does Medical Treatment in India Cost for Algerian Patients?",
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
    heading: "Why Algerian Patients Should Compare What Is Included in a Quotation",
    intro:
      "Two hospitals can provide different estimates for apparently similar procedures. That does not necessarily mean one hospital is more expensive. The difference may be because one estimate includes surgeon fees, anaesthetist fees, room, investigations, medicines, consumables, implant, ICU and follow-up, while another estimate excludes some of these items.",
    items: [
      "Surgeon and anaesthetist fees",
      "Hospital room, ICU, medicines and investigations",
      "Implants and consumables",
      "Follow-up consultations",
      "Visa fees, flights, accommodation and attendant expenses",
    ],
    close: "Before choosing a hospital, ask for a clear breakdown. Comparing the scope of the quotation is more meaningful than comparing only the headline number.",
  },
  cities: {
    heading: "Major Indian Cities for Algerian Patients",
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
    heading: "Hospitals in India for Algerian Patients",
    intro:
      "The hospital should be selected around the patient's condition. Look for relevant experience with the particular disease or procedure, the required specialist, the required infrastructure and a clear written estimate. The campuses below are drawn from GAF’s live India catalogue, one from each published city.",
    directoryLabel: "Browse hospitals in India",
  },
  doctors: {
    heading: "Specialist Doctors in India for Algerian Patients",
    intro:
      "Doctor selection should be based on the patient's diagnosis and proposed treatment. A breast-cancer patient may need a surgical oncologist, a medical oncologist and a radiation oncologist. The specialists below are taken from GAF’s live doctor catalogue.",
    directoryLabel: "Browse doctors in India",
  },
  visa: {
    heading: "Medical Visa for Algerian Patients",
    intro:
      "Algeria is not currently shown on the Government of India's official e-Visa fee list. Algerian patients should therefore not apply assuming that an e-Medical Visa is available. The Embassy of India in Algiers publishes a regular Medical Visa (MED) and Medical Attendant Visa (MED X) route.",
    points: [
      "Applicants complete the online form on the Government of India regular visa portal and then submit the printed file at the Embassy of India in Algiers.",
      "The Embassy’s published Medical Visa file asks for two 5 × 5 cm photographs with a white background, an English-translated copy of reports by a local doctor, and an invitation from a recognised Indian hospital, clinic or doctor mentioning full passport details of the patient and attendant(s).",
      "The same official checklist currently asks for hotel confirmation, a flight ticket or booking confirmation, a recent one-month bank statement with a minimum credit of €1,000, a copy of the passport bio page, and copies of any previous Indian visas.",
      "The Embassy currently publishes Medical Visa and Medical Attendant Visa fees, with effect from 1 April 2022, as 11,790 dinars for up to six months and 17,460 dinars for more than six months up to one year. Fees and payment rules can change.",
      "The Embassy currently states that visa response time is normally five working days. Applications are received from 09:00 to 12:00 and documents are collected from 14:30 to 16:00 on working days. The mission’s published working days are Sunday to Thursday.",
    ],
    disclaimer:
      "Do not rely on an old medical-tourism article or an unofficial visa website. Verify the current official Indian visa portal and the Embassy of India in Algiers before applying or travelling.",
    documentsHeading: "Documents for an Indian Medical Visa from Algeria",
    documents: [
      "Passport with at least six months’ validity and two blank pages",
      "Two recent 5 × 5 cm photographs with a white background",
      "Printed online visa application from the official Indian visa portal",
      "English-translated copy of reports by a local doctor about the disease",
      "Invitation from a recognised Indian hospital, clinic or doctor with full passport details of the patient and attendant(s)",
      "Hotel confirmation and flight ticket or booking confirmation",
      "Recent one-month bank statement with a minimum credit of €1,000, as currently published",
      "Copy of the passport bio page and copies of previous Indian visas where applicable",
    ],
    documentsNote:
      "The Embassy of India in Algiers publishes the current Medical Visa instructions. Patients should use those official notes rather than relying on an old checklist found elsewhere online.",
  },
  yellowFever: {
    heading: "Language, Translation and Communication for Algerian Patients",
    intro:
      "Arabic and French are widely used in Algeria, while English is commonly used in India's medical and international-patient environment. This is a planning issue, not a barrier, if it is addressed before travel.",
    points: [
      "Ask the receiving hospital which documents need English translation. Pathology, operative and major oncology reports should be translated accurately when requested.",
      "Avoid informal translation of important medical information when treatment decisions depend on it.",
      "Confirm whether the hospital has French-speaking support, Arabic interpretation, or whether a family member will accompany the patient as an interpreter.",
      "The Embassy Medical Visa checklist already asks for an English-translated copy of local medical reports, so translation planning should begin before the visa file is assembled.",
    ],
    close:
      "GAF Healthcare can help coordinate communication requirements with the selected hospital where such support is available.",
  },
  travel: {
    heading: "Travelling from Algeria to India for Medical Treatment",
    intro:
      "Algerian patients should plan international travel around the confirmed medical schedule. Houari Boumediene Airport in Algiers is the principal international airport serving Algiers, and patients may need connecting flights depending on the destination and airline schedule.",
    points: [
      "The airport should normally correspond to the selected hospital.",
      "For major surgery or cancer treatment, it is generally better to confirm the medical opinion, specialist, hospital, proposed treatment, expected admission date and approximate treatment duration before booking a fixed return ticket.",
      "The Embassy currently advises a normal visa response time of five working days. Do not treat that as a guaranteed processing time.",
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
    heading: "Documents Algerian Patients Should Prepare",
    intro:
      "The exact documents depend on the medical condition. A medical-travel file should contain both physical and digital copies, plus English translations where the hospital or Embassy requires them.",
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
    heading: "Food, Language and Accommodation for Algerian Patients",
    intro:
      "Accommodation should be chosen according to the treatment rather than simply the hotel rating. For surgery or prolonged treatment, patients may prefer accommodation with easy hospital access, a lift, kitchen facilities, laundry, family rooms and nearby pharmacies.",
    accommodation: [
      "Hotel, serviced apartment, long-stay or hospital-associated accommodation",
      "Distance from the hospital, lift access and wheelchair accessibility",
      "Attendant accommodation and kitchen facilities",
      "Pharmacy access, grocery access and reliable transportation",
    ],
    accommodationNote:
      "Patients receiving repeated chemotherapy or radiation therapy may benefit from staying close to the hospital.",
    food: "Patients travelling from Algeria may have specific dietary preferences. Follow the dietary advice of the treating medical team, particularly after surgery or during cancer treatment.",
    language:
      "Arabic and French are widely used in Algeria, while English is commonly used in Indian hospitals. Confirm interpretation support and which reports need English translation before travelling.",
  },
  stay: {
    heading: "How Long Will an Algerian Patient Need to Stay in India?",
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
    heading: "The Medical Treatment Journey from Algeria to India",
    intro:
      "If you are considering treatment in India, begin with your medical records rather than your flight booking. A records-first sequence allows many questions to be addressed before leaving Algiers.",
    steps: [
      { title: "Share your medical records", body: "Send the most recent diagnosis, reports, imaging, pathology, previous treatment and current medicines." },
      { title: "Identify the relevant specialty", body: "The case is reviewed to identify the appropriate specialty — for example cancer to medical, surgical and radiation oncology." },
      { title: "Obtain a medical opinion", body: "The relevant Indian specialist reviews the available records. A remote opinion does not replace an in-person examination." },
      { title: "Compare suitable hospitals", body: "Compare specialist, procedure, infrastructure, location, estimated cost, expected stay and follow-up arrangements." },
      { title: "Receive hospital documentation", body: "After the hospital reviews the case, the Indian hospital invitation and related papers can be arranged for the Embassy Medical Visa file." },
      { title: "Apply for the medical visa", body: "Complete the official online form and submit the Medical Visa file at the Embassy of India in Algiers. Algeria is not currently on the e-Visa fee list." },
      { title: "Plan the journey", body: "Book flights and accommodation around the hospital's confirmed schedule and the Embassy's visa decision." },
      { title: "Arrive in India", body: "International patients may receive support with airport transfer, accommodation, hospital appointments and local transportation." },
      { title: "Receive treatment", body: "The treating hospital manages clinical care. The treatment plan may change after physical examination or additional investigations." },
      { title: "Discharge and follow-up", body: "Collect the discharge summary, treatment records, prescriptions, investigation reports, imaging, operative report and follow-up plan." },
      { title: "Return to Algeria", body: "Travel home only after the treating doctor clears the patient to fly." },
      { title: "Keep the records", body: "Carry complete discharge and follow-up documents for any later review in Algeria or India." },
    ],
  },
  help: {
    heading: "How GAF Healthcare Helps Algerian Patients",
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
      "Patient and family communication, including language needs where support is available",
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
      "Can follow-up information be shared with a doctor in Algeria?",
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
      "What happens after returning to Algeria?",
    ],
    specialist: [
      "Breast cancer → surgical oncologist, medical oncologist, radiation oncologist",
      "Colorectal cancer → colorectal or surgical oncologist, medical oncologist, radiation oncologist where required",
      "Prostate cancer → urologist or uro-oncologist, radiation oncologist, medical oncologist where required",
      "Heart disease → cardiologist, interventional cardiologist, cardiac surgeon where required",
    ],
  },
  faqHeading: "Frequently Asked Questions",
  faqs: [
    {
      q: "Can Algerian citizens get medical treatment in India?",
      a: "Yes. Algerian citizens can travel to India for medical treatment, subject to India's current visa and immigration requirements. The usual route is a regular Medical Visa through the Embassy of India in Algiers.",
    },
    {
      q: "Is Algeria eligible for India's e-Medical Visa?",
      a: "Algeria is not currently shown on the Government of India's official e-Visa fee list. Algerian patients should not assume that an e-Medical Visa is available. Apply for a regular Medical Visa through the Embassy of India in Algiers and verify the live official notes before applying.",
    },
    {
      q: "Can a family member accompany an Algerian patient?",
      a: "Yes. The Embassy of India in Algiers publishes a Medical Attendant Visa (MED X) alongside the Medical Visa (MED). The Indian hospital invitation should mention full passport details of the patient and attendant(s).",
    },
    {
      q: "How long does the Embassy of India in Algiers take to process a Medical Visa?",
      a: "The Embassy currently states that visa response time is normally five working days. Processing times can change. Confirm the current timeline with the Embassy before booking non-refundable travel.",
    },
    {
      q: "What documents does the Embassy currently ask for on a Medical Visa file?",
      a: "The published checklist includes two 5 × 5 cm photographs, an English-translated local doctor's report, an Indian hospital invitation with passport details of the patient and attendants, hotel confirmation, a flight booking, a recent bank statement with a minimum credit of €1,000, and the printed online application.",
    },
    {
      q: "What is the current Medical Visa fee at the Embassy in Algiers?",
      a: "The Embassy currently publishes Medical Visa and Medical Attendant Visa fees, with effect from 1 April 2022, as 11,790 dinars for up to six months and 17,460 dinars for more than six months up to one year. Fees can change.",
    },
    {
      q: "What treatments can Algerian patients seek in India?",
      a: "Potential treatment areas include oncology, cardiology, cardiac surgery, neurosurgery, orthopedics, urology, gastroenterology, fertility, pediatric specialties and transplantation. The appropriate treatment depends on the patient's diagnosis.",
    },
    {
      q: "Can Algerian patients get cancer treatment in India?",
      a: "Yes. Indian cancer centres offer medical oncology, surgical oncology and radiation oncology services for many cancer types. Treatment depends on cancer type, stage, pathology, molecular profile and previous treatment.",
    },
    {
      q: "Can Algerian patients get IVF treatment in India?",
      a: "Algerian couples may explore IVF and other fertility treatments in India. Eligibility, treatment protocols and applicable legal requirements should be confirmed with the selected fertility centre before travel. GAF does not yet publish a dedicated IVF page.",
    },
    {
      q: "Can I get a medical opinion from India before travelling?",
      a: "Yes. Patients can share medical records for review by an appropriate Indian specialist. The final diagnosis and treatment plan may require an in-person consultation.",
    },
    {
      q: "Do I need to translate my French or Arabic medical reports?",
      a: "Not necessarily every report. Ask the Indian hospital which documents require English translation. The Embassy Medical Visa checklist already asks for an English-translated copy of local medical reports. Important pathology, operative and oncology reports should be translated accurately when required.",
    },
    {
      q: "How much does treatment in India cost for Algerian patients?",
      a: "There is no single treatment price. Costs vary according to the diagnosis, hospital, specialist, procedure, medicines, implants, investigations and length of hospitalization. GAF Healthcare can help coordinate indicative hospital estimates based on the patient's medical records.",
    },
    {
      q: "How long will I need to stay in India?",
      a: "The duration depends on the treatment. A consultation may require a short stay, while surgery, cancer treatment, rehabilitation or transplantation may require a longer period. The treating hospital can provide the most useful estimate after reviewing the case.",
    },
    {
      q: "Which Indian cities can Algerian patients consider?",
      a: "Delhi NCR, Mumbai, Chennai, Hyderabad and Bengaluru are live GAF catalogue cities. Pune can also be considered, but this page does not link to a Pune directory because that city is not yet in the live catalogue.",
    },
    {
      q: "Where does the journey from Algeria usually begin?",
      a: "Houari Boumediene Airport in Algiers is the principal international airport serving Algiers. Patients travelling from other parts of Algeria may first travel to Algiers.",
    },
    {
      q: "Can GAF Healthcare help me find a hospital?",
      a: "Yes. GAF Healthcare can help identify suitable hospitals based on the patient's diagnosis, specialty and proposed treatment.",
    },
    {
      q: "Can GAF Healthcare arrange a treatment quotation?",
      a: "GAF Healthcare can coordinate with hospitals to obtain indicative treatment estimates. The hospital issues the final quotation.",
    },
    {
      q: "Can GAF Healthcare help with the Indian medical visa?",
      a: "GAF Healthcare can help patients understand the medical-travel documentation and coordinate relevant hospital documentation. Visa approval remains subject to the Government of India's rules and the Embassy of India in Algiers.",
    },
    {
      q: "Should I book my flight before receiving the hospital's opinion?",
      a: "For major treatment, it is generally better to obtain the medical opinion, hospital schedule and visa decision first. This allows the journey to be planned around the actual treatment rather than an uncertain appointment.",
    },
    {
      q: "What medical records should I send?",
      a: "Send your diagnosis, medical history, pathology, imaging, previous treatment records, medication list and other relevant investigations. Cancer patients should provide pathology and imaging whenever available.",
    },
  ],
  finalCta: {
    heading: "Start Your Medical Treatment Journey from Algeria to India",
    body: "If you are considering treatment in India, the best place to begin is your medical history. Share your medical records with GAF Healthcare so that the relevant specialty, hospitals and specialists can be identified before you travel.",
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
        href: ALGERIA_OFFICIAL_LINKS.eVisa,
        detail: "Current e-Visa categories. Used to confirm that nationality eligibility is list-specific and can change.",
      },
      {
        label: "Government of India — Country/territory-wise e-Visa fee list",
        href: ALGERIA_OFFICIAL_LINKS.eVisaFees,
        detail: "Official fee table used to confirm that Algeria is not currently among e-Visa eligible countries.",
      },
      {
        label: "Embassy of India, Algiers — Documents for visa",
        href: ALGERIA_OFFICIAL_LINKS.embassyDocs,
        detail: "Published Medical Visa file, including English-translated local reports, Indian hospital invitation, hotel, flight and bank-statement requirements.",
      },
      {
        label: "Embassy of India, Algiers — Visa services and fees",
        href: ALGERIA_OFFICIAL_LINKS.embassyVisa,
        detail: "Medical Visa and Medical Attendant Visa fees currently published as 11,790 and 17,460 dinars.",
      },
      {
        label: "Embassy of India, Algiers — Contact and processing time",
        href: ALGERIA_OFFICIAL_LINKS.embassyContact,
        detail: "Mission address in Hydra, Algiers, Sunday–Thursday working days, and a normal visa response time of five working days.",
      },
      {
        label: "Ministry of External Affairs, India — India–Algeria relations (May 2025)",
        href: ALGERIA_OFFICIAL_LINKS.meaBrief,
        detail: "Official bilateral brief, including diplomatic relations established in July 1962.",
      },
      {
        label: "Ministry of External Affairs, India — India–Algeria relations",
        href: ALGERIA_OFFICIAL_LINKS.meaBriefOlder,
        detail: "Official record of pharmaceutical cooperation, Maghreb Pharma 2024, Advantage Healthcare India 2023, and COVID-period medicine and vaccine supplies.",
      },
      {
        label: "IARC / WHO — GLOBOCAN 2024 Algeria fact sheet",
        href: ALGERIA_OFFICIAL_LINKS.globocan,
        detail: "Estimated 72,825 new cases, 37,135 deaths and 184,478 five-year prevalent cases, with breast, colorectum, lung, prostate and thyroid as leading sites.",
      },
      {
        label: "WHO — Algeria health data overview",
        href: ALGERIA_OFFICIAL_LINKS.whoData,
        detail: "Country-level WHO health information.",
      },
      {
        label: "Government of India — Bureau of Immigration",
        href: ALGERIA_OFFICIAL_LINKS.boi,
        detail: "Entry and immigration instructions for travellers arriving in India.",
      },
    ],
  },
};
