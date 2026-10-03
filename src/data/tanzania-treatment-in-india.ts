import type { QuickAnswerItem } from "@/lib/doctor-quick-answers";
import type { CuratedTreatment } from "@/lib/cms/curated-treatment-types";
import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";
import type { Treatment } from "@/lib/treatments";
import type { AppLocale } from "@/lib/i18n/languages";
import { costPath, doctorsPath, hospitalsPath, costsFilterPath } from "@/lib/catalog-links";

export const TANZANIA_PAGE_PATH = "/tanzania/treatment-in-india";
export const TANZANIA_PAGE_LOCALES = ["en"] as const;
export const TANZANIA_LAST_REVIEWED = "2026-10-03";

/** English is the source locale. Target-locale overlays can be added later without changing the route. */
export type TanzaniaPageCopy = typeof tanzaniaPageCopyEn;

export function tanzaniaPageCopy(_locale: AppLocale): TanzaniaPageCopy {
  return tanzaniaPageCopyEn;
}

const INDIA = "India";

export const TANZANIA_OFFICIAL_LINKS = {
  eVisa: "https://indianvisaonline.gov.in/evisa/tvoa.html",
  eVisaFeeSchedule: "https://indianvisaonline.gov.in/evisa/eTV_revised_fee_final.pdf",
  hciMedicalVisa: "https://hcindiatz.gov.in/medical-visa.php",
  hciEvisa: "https://www.hcindiatz.gov.in/e-visa.php",
  hciVisa: "https://hcindiatz.gov.in/visa.php",
  hciHome: "https://hcindiatz.gov.in/",
  mohCooperation2023:
    "https://www.moh.go.tz/en/news-single/hospitali-za-india-na-tanzania-kuendeleza-ushirikiano-katika-huduma-za-matibabu-ya-kibingwa",
  mohApollo2023: "https://www.moh.go.tz/en/news-single/hospitali-ya-apollo-india-kuwekeza-tanzania",
  mohMedicines2023:
    "https://www.moh.go.tz/en/news-single/india-kushirikiana-na-tanzania-katika-upatikanaji-wa-dawa-za-bei-nafuu",
  mohAyush2025:
    "https://www.moh.go.tz/en/news-single/tanzania-india-zasaini-makubaliano-ya-kuendeleza-tiba-asili-who-yapongeza",
  mohTraditional2026:
    "https://www.moh.go.tz/sw/news-single/tanzania-india-kuhakikisha-mifumo-ya-tiba-asili-kisasa-kusomana-2030",
  meaBrief: "https://www.mea.gov.in/Portal/ForeignRelation/India-Tanzania-April-2026.pdf",
  tourism: "https://tourism.gov.in/",
} as const;

export const TANZANIA_CURATED_TREATMENT_SLUGS = [
  "breast-cancer-treatment-in-india",
  "colon-cancer-treatment-in-india",
  "prostate-cancer-treatment-in-india",
  "pancreatic-cancer-treatment-in-india",
  "chemotherapy-in-india",
  "cabg-surgery-in-india",
  "heart-valve-replacement-in-india",
  "coronary-angioplasty-in-india",
  "brain-tumor-surgery-in-india",
  "knee-replacement-surgery-in-india",
  "whipple-surgery-in-india",
  "bone-marrow-transplant-in-india",
] as const;

export const TANZANIA_CANCER_TREATMENT_SLUGS = [
  "breast-cancer-treatment-in-india",
  "colon-cancer-treatment-in-india",
  "prostate-cancer-treatment-in-india",
  "pancreatic-cancer-treatment-in-india",
  "ovarian-cancer-treatment-in-india",
  "cervical-cancer-treatment-in-india",
  "chemotherapy-in-india",
  "immunotherapy-in-india",
  "targeted-therapy-in-india",
  "hormone-therapy-in-india",
  "precision-oncology-in-india",
  "neoadjuvant-chemotherapy-in-india",
  "adjuvant-chemotherapy-in-india",
  "external-beam-radiotherapy-in-india",
  "intensity-modulated-radiation-therapy-in-india",
  "whipple-surgery-in-india",
  "hipec-surgery-in-india",
] as const;

export const TANZANIA_COST_PROCEDURE_NAMES = [
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

export const TANZANIA_DOCTOR_SPECIALTY_SLUGS = [
  "medical-oncology",
  "cardiology",
  "cardiac-surgery",
  "neurosurgery",
  "orthopedics",
  "urology",
  "gastroenterology",
  "pediatric-cardiac-surgery",
] as const;

export const TANZANIA_LIVE_CITY_SLUGS = [
  "delhi-ncr",
  "mumbai",
  "chennai",
  "hyderabad",
  "bengaluru",
] as const;

export function resolveCuratedBySlug(
  treatments: CuratedTreatment[],
  slugs: readonly string[],
) {
  const bySlug = new Map(treatments.map((row) => [row.slug, row]));
  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((row): row is CuratedTreatment => Boolean(row));
}

export function resolveCostRows(catalog: Treatment[]) {
  return TANZANIA_COST_PROCEDURE_NAMES.map((name) => {
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

export function tanzaniaHospitals(hospitals: Hospital[]) {
  return TANZANIA_LIVE_CITY_SLUGS.map((citySlug) => {
    const inCity = hospitals.filter(
      (hospital) => hospital.countrySlug === "india" && hospital.citySlug === citySlug,
    );
    const preferred = inCity.filter((hospital) => /jci/i.test(hospital.accreditation));
    const pool = preferred.length ? preferred : inCity;
    return [...pool].sort((a, b) => a.name.localeCompare(b.name))[0];
  }).filter((row): row is Hospital => Boolean(row));
}

export function tanzaniaDoctors(doctors: Doctor[]) {
  return TANZANIA_DOCTOR_SPECIALTY_SLUGS.map((specialtySlug) => {
    const pool = doctors.filter((doctor) => doctor.specialtySlug === specialtySlug);
    const featured = pool.find((doctor) => doctor.featured);
    return featured ?? [...pool].sort((a, b) => a.name.localeCompare(b.name))[0];
  }).filter((row): row is Doctor => Boolean(row));
}

export const tanzaniaPageCopyEn = {
  seo: {
    title: "Medical Treatment in India for Tanzanian Patients",
    description:
      "Explore medical treatment in India for Tanzanian patients. Find hospitals, specialists, treatment options, costs, medical visa guidance and support from GAF Healthcare.",
    keywords: [
      "medical treatment in India for Tanzanian patients",
      "treatment in India from Tanzania",
      "medical tourism from Tanzania to India",
      "hospitals in India for Tanzanian patients",
      "medical visa for Tanzanian patients",
      "treatment cost in India for Tanzanian patients",
    ],
  },
  breadcrumb: {
    home: "Home",
    tanzania: "Tanzania",
    page: "Treatment in India",
  },
  hero: {
    eyebrow: "Medical treatment in India for Tanzanian patients",
    h1: "Medical Treatment in India for Tanzanian Patients",
    lede:
      "Looking for medical treatment in India from Tanzania? GAF Healthcare helps patients and families navigate the journey from medical report review and specialist opinions to hospital selection, treatment estimates, appointments, visa guidance and travel coordination.",
    primaryCta: "Get a Medical Opinion",
    secondaryCta: "Explore Treatments",
  },
  quickAnswer: [
    {
      question: "Can Tanzanian patients travel to India for medical treatment?",
      answer:
        "Yes. Tanzanian passport holders are currently listed among the nationalities eligible for India’s e-Visa system, including e-Medical Visa, subject to the Government of India’s latest requirements.",
    },
    {
      question: "What treatments are available in India?",
      answer:
        "Patients commonly travel for cancer care, cardiac treatment, neurosurgery, orthopaedics, organ transplantation, urology, gastroenterology, paediatric cardiac surgery and other specialist procedures. The right pathway depends on the diagnosis.",
    },
    {
      question: "How much does treatment in India cost?",
      answer:
        "There is no single price. Hospitals calculate estimates from the diagnosis, procedure, medicines, implants, room category, ICU need and length of stay. A personalised hospital estimate is more useful than a generic figure.",
    },
    {
      question: "Can patients obtain a medical opinion before travelling?",
      answer:
        "Usually yes. The first review can start from existing reports, scans and pathology. A remote opinion does not replace an in-person examination, but it can clarify the likely next step before flights are booked.",
    },
    {
      question: "What medical visa options are available?",
      answer:
        "Tanzanian citizens may apply through India’s e-Medical Visa route or through the High Commission of India in Dar es Salaam. A hospital appointment or admission letter is typically required. Visa rules can change.",
    },
    {
      question: "How can GAF Healthcare help?",
      answer:
        "GAF Healthcare can coordinate medical records, specialist opinions, hospital options, treatment estimates, appointments, visa-related documentation and practical arrangements during treatment in India.",
    },
  ] satisfies QuickAnswerItem[],
  why: {
    heading: "Why Tanzanian Patients Choose India for Medical Treatment",
    intro:
      "Tanzania has invested in specialised services at home, including kidney transplantation, cardiac surgery and selected super-specialty programmes. Some patients still travel when they need a particular specialist, a second opinion, advanced diagnostics, complex surgery or a multidisciplinary plan that is not available locally in the required timeframe.",
    points: [
      "Access to named specialists and subspecialists across oncology, cardiology, neurosurgery, orthopaedics, transplantation and other fields",
      "Hospitals that keep several specialties, intensive care and diagnostics under one roof",
      "Published planning ranges that help families compare the medical budget before travel",
      "International-patient desks that issue appointment letters used for medical-visa applications",
      "An established Tanzania–India healthcare relationship documented by Tanzania’s Ministry of Health",
    ],
    close:
      "The decision to travel should follow the patient’s diagnosis, urgency and clinical need rather than the country name alone.",
  },
  relationship: {
    heading: "India–Tanzania Healthcare Relationship",
    paragraphs: [
      "The healthcare relationship between Tanzania and India is documented by both governments and is not a marketing claim.",
      "In July 2023, Tanzania’s Minister of Health, Ummy Mwalimu, visited Indian hospitals in New Delhi during an official trip. The Ministry reported discussions with BLK-Max and Max-Saket on specialist cooperation in cardiac and vascular care, liver and kidney disease, cancer, and brain and nerve surgery. The same visit recorded Tanzanian patients already receiving treatment at BLK-Max in New Delhi, and earlier Indian support for kidney-transplant capacity at Muhimbili National Hospital and major cardiac surgery at the Jakaya Kikwete Cardiac Institute.",
      "During the same visit the Ministry met Apollo Hospitals and discussed specialist care that Tanzanian patients were already receiving in India, including high-complexity referrals. It also recorded a bilateral discussion on medicines: the Ministry stated that about 60% of medicines and health products used in Tanzania were purchased from India.",
      "Cooperation has continued. In December 2025 the two governments signed a memorandum on traditional medicine and Ayurveda. In March 2026 Tanzania’s Ministry of Health described follow-on work to connect traditional and modern medicine systems. That later agreement is about traditional and modern medicine, not a substitute for hospital-based specialist treatment.",
      "This official relationship is one reason Indian hospitals remain familiar to Tanzanian families arranging complex care. It does not mean every patient should travel, or that India is automatically the right destination for every diagnosis.",
    ],
  },
  treatments: {
    heading: "Popular Medical Treatments in India for Tanzanian Patients",
    intro:
      "The categories below are the pathways Tanzanian families most often ask GAF Healthcare to review. Each card links only to a live GAF specialty or treatment page. Where GAF does not yet publish a dedicated page, the category is explained without an invented URL.",
    categories: [
      {
        title: "Cancer Treatment",
        body: "Medical, surgical and radiation oncology, plus systemic therapy such as chemotherapy, immunotherapy, targeted therapy and hormone therapy.",
        href: "/treatments/chemotherapy-in-india",
        hrefLabel: "Chemotherapy in India",
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
        title: "Gastroenterology",
        body: "Complex abdominal and HPB surgery, including Whipple and HIPEC where clinically appropriate, plus endoscopic work-up.",
        href: "/treatments/whipple-surgery-in-india",
        hrefLabel: "Whipple surgery in India",
        specialty: "Gastroenterology",
      },
      {
        title: "Urology",
        body: "Prostate and kidney cancer surgery, stone and prostate procedures, and kidney-transplant evaluation.",
        href: "/treatments/radical-prostatectomy-in-india",
        hrefLabel: "Radical prostatectomy in India",
        specialty: "Urology",
      },
      {
        title: "Paediatric Cardiology",
        body: "Congenital heart operations such as VSD, ASD and TOF repair, arranged with a paediatric cardiac team.",
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
        body: "India is a destination for fertility treatment, but GAF does not yet publish a dedicated IVF page. Eligibility and Indian fertility law should be confirmed with the clinic before travel.",
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
      {
        title: "Pulmonology",
        body: "Specialist lung evaluation, bronchoscopy and related procedures through GAF’s pulmonology directory.",
        href: "",
        hrefLabel: "Pulmonology specialists",
        specialty: "Pulmonology",
      },
      {
        title: "Nephrology",
        body: "Dialysis planning, transplant work-up and medical kidney care through GAF’s nephrology directory.",
        href: "",
        hrefLabel: "Nephrology specialists",
        specialty: "Nephrology",
      },
    ],
  },
  cancer: {
    heading: "Cancer Treatment in India for Tanzanian Patients",
    intro:
      "Oncology is one of the main reasons Tanzanian patients ask for an Indian specialist review. The Tanzania page is a geographic gateway: it points to GAF’s existing cancer guides rather than repeating them.",
    body: "Treatment may involve medical oncology, surgical oncology, radiation oncology, chemotherapy, immunotherapy, targeted therapy, hormone therapy, precision testing, neoadjuvant chemotherapy or palliative care. The mix depends on the cancer type, stage, biomarkers and previous treatment.",
    modalities: [
      { label: "Medical Oncology", href: doctorsPath({ destination: INDIA, specialty: "Medical Oncology" }) },
      { label: "Surgical Oncology", href: doctorsPath({ destination: INDIA, specialty: "Surgical Oncology" }) },
      { label: "Radiation Oncology", href: doctorsPath({ destination: INDIA, specialty: "Radiation Oncology" }) },
      { label: "Chemotherapy", href: "/treatments/chemotherapy-in-india" },
      { label: "Immunotherapy", href: "/treatments/immunotherapy-in-india" },
      { label: "Targeted Therapy", href: "/treatments/targeted-therapy-in-india" },
      { label: "Hormone Therapy", href: "/treatments/hormone-therapy-in-india" },
      { label: "Precision Oncology", href: "/treatments/precision-oncology-in-india" },
      { label: "Neoadjuvant Chemotherapy", href: "/treatments/neoadjuvant-chemotherapy-in-india" },
      { label: "Breast Cancer", href: "/treatments/breast-cancer-treatment-in-india" },
      { label: "Colon Cancer", href: "/treatments/colon-cancer-treatment-in-india" },
      { label: "Prostate Cancer", href: "/treatments/prostate-cancer-treatment-in-india" },
      { label: "Pancreatic Cancer", href: "/treatments/pancreatic-cancer-treatment-in-india" },
      { label: "Ovarian Cancer", href: "/treatments/ovarian-cancer-treatment-in-india" },
      { label: "Cervical Cancer", href: "/treatments/cervical-cancer-treatment-in-india" },
    ],
  },
  cost: {
    heading: "Treatment Cost in India for Tanzanian Patients",
    intro:
      "One of the first questions a Tanzanian family asks is how much treatment in India will cost. Hospitals do not issue a single price for a disease name. They price a pathway after reviewing the records.",
    factors: [
      "Diagnosis and stage",
      "Procedure or drug protocol",
      "Hospital and surgical or medical team",
      "Room category",
      "Investigations and imaging",
      "Medicines, implants or devices",
      "ICU requirement",
      "Length of stay and rehabilitation",
      "Complications or additional procedures",
      "Follow-up after discharge",
    ],
    tableIntro:
      "The ranges below are GAF Healthcare planning figures from the live cost catalogue. They are not hospital quotations.",
    disclaimer:
      "Final treatment costs are determined by the treating hospital after reviewing the patient's medical information.",
    ctaLabel: "Share your medical reports for a personalised estimate",
  },
  cities: {
    heading: "Popular Indian Cities for Medical Treatment",
    intro:
      "India’s specialist hospitals are spread across several cities. No city is “the best” for every patient. Choose the city that matches the specialist, the hospital facilities and the travel plan.",
    items: [
      {
        name: "Delhi NCR",
        body: "A large medical hub with cancer, cardiac, neurosurgery, orthopaedic, transplant and paediatric teams. Useful when a family wants to compare more than one hospital in the same region.",
        city: "Delhi NCR",
        catalog: true,
      },
      {
        name: "Mumbai",
        body: "A major international gateway with oncology, cardiology, neurosurgery, transplantation and gastroenterology centres. Often convenient when the selected hospital is on the west coast.",
        city: "Mumbai",
        catalog: true,
      },
      {
        name: "Chennai",
        body: "An established international-patient city, particularly for cardiac surgery, oncology, neurosurgery, orthopaedics and transplantation.",
        city: "Chennai",
        catalog: true,
      },
      {
        name: "Hyderabad",
        body: "Specialist centres for oncology, cardiology, neurosurgery, transplantation, gastroenterology and robotic surgery.",
        city: "Hyderabad",
        catalog: true,
      },
      {
        name: "Bengaluru",
        body: "Major hospitals covering cardiology, oncology, neurosurgery, orthopaedics, urology and gastroenterology.",
        city: "Bengaluru",
        catalog: true,
      },
      {
        name: "Pune",
        body: "Pune has specialist hospitals that some international patients use for oncology, cardiology, orthopaedics and gastroenterology. GAF’s live city catalogue does not yet include Pune, so this page does not link to a Pune directory.",
        city: "Pune",
        catalog: false,
      },
    ],
  },
  hospitals: {
    heading: "Hospitals in India for Tanzanian Patients",
    intro:
      "Choose the hospital for the specialty, the procedure experience, intensive-care support and the international-patient desk — not for the brand name alone. The campuses below are drawn from GAF’s live India catalogue, one from each published city.",
    directoryLabel: "Browse hospitals in India",
  },
  doctors: {
    heading: "Specialist Doctors in India for Tanzanian Patients",
    intro:
      "The doctor often matters more than the city. A breast-cancer patient may need a surgical oncologist, a medical oncologist and a radiation oncologist. A cardiac patient may need an interventional cardiologist or a cardiac surgeon. The specialists below are taken from GAF’s live doctor catalogue.",
    directoryLabel: "Browse doctors in India",
  },
  visa: {
    heading: "Medical Visa for Tanzanian Patients Travelling to India",
    intro:
      "Tanzanian citizens can apply for India’s e-Visa, including the e-Medical Visa category, or apply through the High Commission of India in Dar es Salaam. Tanzania appears on the Government of India’s published e-Visa fee schedule.",
    points: [
      "e-Medical Visa applications are made on the official Indian e-Visa portal. The High Commission in Dar es Salaam directs applicants to that portal and warns against agents who claim to speed up the process.",
      "The Government of India’s e-Visa guidance states that an e-Medical Visa application should include a copy of a letter from the Indian hospital on letterhead, with a tentative admission or treatment date. The passport must meet the published validity and blank-page rules.",
      "The High Commission’s medical-visa page states that applicants may need preliminary medical advice referring them to an Indian hospital, or an appointment letter from a recognised Indian institution, plus proof of financial standing.",
      "Up to two attendants may accompany a patient. The patient receives a medical visa; attendants receive medical-escort visas, usually co-terminus with the patient’s visa.",
      "People travelling on a medical or medical-escort visa are required to register with the relevant FRRO/FRO within 14 days of arrival in India, according to the High Commission’s current medical-visa note.",
    ],
    disclaimer:
      "Visa requirements can change. Always verify the latest requirements with the Government of India or the High Commission of India in Tanzania before applying.",
    documentsHeading: "Documents Tanzanian patients should prepare",
    documents: [
      "Valid passport meeting the current validity rules",
      "Recent photograph in the format the portal or mission requires",
      "Medical reports and a hospital appointment or admission letter",
      "Medical referral or specialist documentation where requested",
      "Financial documents where the mission or portal asks for them",
      "Travel details and attendant passports, if a family member will travel",
    ],
  },
  travel: {
    heading: "Travelling from Tanzania to India for Medical Treatment",
    intro:
      "Most Tanzanian patients plan the flight around the selected hospital city rather than the other way around. Dar es Salaam is the usual international departure point. Patients may also leave from other Tanzanian airports when connections exist.",
    points: [
      "There is generally no reason to book a nonstop itinerary that does not exist. Dar es Salaam–India journeys commonly involve a connection. Schedules change, so check current airline timetables before paying.",
      "For a Delhi NCR hospital, Indira Gandhi International Airport is usually the logical arrival point. Mumbai, Chennai, Bengaluru and Hyderabad each have their own international airports.",
      "Book travel after the hospital has proposed an appointment or admission window. Tight return tickets are a poor fit for major surgery, cancer treatment or transplantation.",
      "Patients with unstable cardiac, neurological or bleeding symptoms should seek urgent local care in Tanzania rather than delaying treatment to arrange an international trip.",
    ],
  },
  documents: {
    heading: "Medical Documents Tanzanian Patients Should Bring to India",
    intro:
      "Put the records in one folder, on paper and as digital copies. The treating team can then review the case without waiting for files to be resent from Dar es Salaam, Mwanza, Arusha or Zanzibar.",
    general: [
      "Passport and visa",
      "Hospital appointment letter",
      "Medical reports and blood tests",
      "CT, MRI, PET or X-ray images and reports",
      "Pathology and biopsy reports",
      "Previous discharge summaries and operation notes",
      "Current medication list and prescriptions",
      "Digital copies of the same records",
    ],
    cancer: [
      "Histopathology and biopsy reports",
      "Immunohistochemistry and molecular reports",
      "CT, MRI or PET-CT",
      "Previous chemotherapy, radiation and surgical records",
    ],
    cardiac: [
      "ECG",
      "Echocardiogram",
      "Coronary angiography or CD, where available",
      "Previous cardiac procedure notes and medication list",
    ],
    ortho: [
      "X-rays, MRI and CT",
      "Previous operation notes and implant details",
      "Physiotherapy records and current diagnosis reports",
    ],
  },
  journey: {
    heading: "Medical Treatment Journey from Tanzania to India",
    intro:
      "You do not need to book a flight before you understand the options. A records-first sequence keeps the medical decision ahead of the travel decision.",
    steps: [
      {
        title: "Share Medical Reports",
        body: "Send scans, pathology, prescriptions and previous treatment records. For cancer, pathology and imaging matter most.",
      },
      {
        title: "Specialist Review",
        body: "An Indian specialist or hospital reviews the file and says whether more information is needed.",
      },
      {
        title: "Treatment Options",
        body: "Where the case allows, more than one hospital or specialist can be compared on clinical fit, duration and cost.",
      },
      {
        title: "Hospital & Cost Estimate",
        body: "The selected hospital issues an opinion, a proposed pathway and an estimated medical cost — not a guaranteed bill.",
      },
      {
        title: "Appointment Confirmation",
        body: "Once the family chooses a pathway, the appointment or admission letter is arranged.",
      },
      {
        title: "Visa & Travel",
        body: "The patient applies through the current Indian medical-visa route and books flights around the hospital dates.",
      },
      {
        title: "Treatment in India",
        body: "The treating team repeats the necessary assessment in person before starting the procedure, surgery or medicines.",
      },
      {
        title: "Recovery & Follow-up",
        body: "Discharge notes, medicines and review plans travel home. Further checks can be shared with the local doctor in Tanzania.",
      },
    ],
  },
  help: {
    heading: "How GAF Healthcare Helps Tanzanian Patients",
    intro:
      "International treatment is easier to manage when one desk coordinates the medical file, the hospital options and the practical steps. GAF Healthcare’s role is coordination, not a substitute for the treating doctor.",
    before: [
      "Collecting and organising medical reports",
      "Identifying relevant specialists and hospitals",
      "Coordinating a medical opinion and treatment comparison",
      "Requesting a hospital cost estimate",
      "Scheduling the appointment",
      "Helping assemble visa documentation issued by the hospital",
      "Planning travel around the confirmed dates",
    ],
    during: [
      "Hospital and appointment coordination",
      "Communication with the international-patient desk",
      "Practical support for the patient and accompanying family",
    ],
    after: [
      "Discharge and record collection",
      "Follow-up planning with the treating team",
      "Help with the return journey when the doctor clears travel",
    ],
    note: "The exact services available depend on the case and should be confirmed with GAF Healthcare before travel.",
  },
  opinion: {
    heading: "Why Get a Medical Opinion Before Travelling?",
    intro:
      "A records review can answer practical questions before a family spends money on flights and hotels.",
    questions: [
      "Is surgery actually required, or is another option available?",
      "How urgent is the treatment?",
      "Which specialist should see the patient?",
      "How long might hospitalisation and recovery take?",
      "What further tests may be needed in India?",
      "What is the approximate medical cost?",
    ],
    close:
      "A remote review is not a diagnosis and does not replace an in-person examination. It is a way to understand the likely next step before travelling.",
  },
  faqHeading: "Frequently asked questions",
  faqs: [
    {
      q: "Can Tanzanian patients travel to India for medical treatment?",
      a: "Yes. Tanzanian passport holders can apply for India’s e-Visa, including the e-Medical Visa category, or apply through the High Commission of India in Dar es Salaam, provided they meet the current rules.",
    },
    {
      q: "Is India a medical treatment destination for patients from Tanzania?",
      a: "Yes. Tanzania’s Ministry of Health has documented specialist cooperation with Indian hospitals and has recorded Tanzanian patients receiving treatment in India during official visits. Suitability still depends on the individual diagnosis.",
    },
    {
      q: "What treatments are available in India for Tanzanian patients?",
      a: "Common reasons for travel include cancer care, cardiac treatment, neurosurgery, orthopaedics, transplantation, urology, gastroenterology and paediatric cardiac surgery. GAF lists only the pathways that already have a live page or cost guide.",
    },
    {
      q: "How much does medical treatment in India cost?",
      a: "Costs vary with the diagnosis, procedure, hospital, medicines, implants, ICU need and length of stay. Use GAF’s planning ranges as a starting point, then ask the treating hospital for a case-specific estimate.",
    },
    {
      q: "Can I get a medical opinion before travelling?",
      a: "Usually yes. Share the available reports first. The specialist may ask for extra tests. A remote opinion does not replace an examination in clinic or hospital.",
    },
    {
      q: "How do I get a medical visa for India from Tanzania?",
      a: "Apply on the official Indian e-Visa portal or through the High Commission of India in Dar es Salaam. You will typically need a hospital letter and a passport that meets the published validity rules. Confirm the latest steps before you apply.",
    },
    {
      q: "Can a family member accompany a patient?",
      a: "Yes. The High Commission of India in Tanzania states that up to two attendants may accompany a patient on medical-escort visas, usually aligned with the patient’s medical visa.",
    },
    {
      q: "How long should I stay in India?",
      a: "There is no standard stay. Ask the hospital for an estimated admission and recovery period before booking a return flight. Cancer treatment, major surgery and transplantation often need a longer visit than a straightforward procedure.",
    },
    {
      q: "Which Indian cities provide specialized treatment?",
      a: "Delhi NCR, Mumbai, Chennai, Hyderabad and Bengaluru all have specialist hospitals in GAF’s catalogue. Pune also has hospitals, but it is not yet a live GAF city filter. The right city is the one that matches the chosen specialist.",
    },
    {
      q: "Which hospitals can Tanzanian patients consider?",
      a: "Consider hospitals that offer the required specialty, the necessary technology and an international-patient desk. GAF can show live hospital profiles for the five published Indian cities.",
    },
    {
      q: "Can I compare treatment options from different hospitals?",
      a: "For complex treatment, comparing more than one specialist opinion can be useful. Compare clinical suitability, the proposed pathway, expected duration and cost — not the lowest quotation alone.",
    },
    {
      q: "What medical documents should I bring?",
      a: "Bring the passport, visa, hospital letter, reports, imaging, pathology, previous discharge notes and a current medication list. Cancer, cardiac and orthopaedic cases each have extra items listed on this page.",
    },
    {
      q: "Can GAF Healthcare help arrange a hospital appointment?",
      a: "Yes. After a records review, GAF can coordinate an appointment or admission request with the relevant international-patient desk.",
    },
    {
      q: "Can GAF Healthcare help with treatment cost estimates?",
      a: "Yes. GAF can request a hospital estimate after the file has been reviewed. The hospital’s written estimate is the figure to use for planning; online ranges are not quotations.",
    },
    {
      q: "What happens after treatment?",
      a: "The hospital issues discharge instructions, medicines and follow-up advice. GAF can help collect those records and plan the return journey once the treating doctor says the patient is fit to fly.",
    },
    {
      q: "Can I continue follow-up after returning to Tanzania?",
      a: "Often yes. Many teams share a plan that a local doctor in Tanzania can continue, with later imaging or a remote review if needed. The Indian specialist decides what follow-up is medically required.",
    },
  ],
  finalCta: {
    heading: "Planning Medical Treatment in India from Tanzania?",
    body: "Share your medical reports with GAF Healthcare and let our team help you understand the next steps, identify relevant specialists and hospitals, and coordinate your treatment journey in India.",
    primary: "Get a Medical Opinion",
    secondary: "Contact GAF Healthcare",
  },
  disclaimer: {
    heading: "Important medical disclaimer",
    body: "Information on this page is for general educational and medical-travel planning. It is not a diagnosis, prescription or substitute for consultation with a qualified clinician. Treatment recommendations, risks, duration and costs vary between patients. Hospital quotations can change after investigations, complications or a change in the plan. Visa and immigration rules can change; verify them with the Government of India and the High Commission of India in Tanzania before you apply.",
  },
  sources: {
    heading: "Sources & Further Reading",
    items: [
      {
        label: "Government of India — e-Visa portal",
        href: TANZANIA_OFFICIAL_LINKS.eVisa,
        detail: "Eligibility, e-Medical Visa purpose and application instructions.",
      },
      {
        label: "Government of India — e-Visa fee schedule",
        href: TANZANIA_OFFICIAL_LINKS.eVisaFeeSchedule,
        detail: "Published country list including Tanzania.",
      },
      {
        label: "High Commission of India, Dar es Salaam — Medical visa",
        href: TANZANIA_OFFICIAL_LINKS.hciMedicalVisa,
        detail: "Medical and medical-escort visa documents, attendant limit and FRRO registration note.",
      },
      {
        label: "High Commission of India, Dar es Salaam — e-Visa",
        href: TANZANIA_OFFICIAL_LINKS.hciEvisa,
        detail: "Mission guidance pointing applicants to the official Indian e-Visa website.",
      },
      {
        label: "Tanzania Ministry of Health — specialist cooperation with Indian hospitals (26 July 2023)",
        href: TANZANIA_OFFICIAL_LINKS.mohCooperation2023,
        detail: "Official visit covering cardiac, kidney, liver, cancer and neurosurgical cooperation, and Tanzanian patients treated in New Delhi.",
      },
      {
        label: "Tanzania Ministry of Health — Apollo Hospitals discussion (28 July 2023)",
        href: TANZANIA_OFFICIAL_LINKS.mohApollo2023,
        detail: "Ministry note on existing specialist referrals and proposed investment discussions.",
      },
      {
        label: "Tanzania Ministry of Health — medicines cooperation with India (25 July 2023)",
        href: TANZANIA_OFFICIAL_LINKS.mohMedicines2023,
        detail: "Ministry statement that a large share of Tanzania’s medicines were purchased from India, and on specialist services already started at home.",
      },
      {
        label: "Tanzania Ministry of Health — traditional medicine MoU with India",
        href: TANZANIA_OFFICIAL_LINKS.mohAyush2025,
        detail: "December 2025 agreement on traditional medicine and Ayurveda.",
      },
      {
        label: "Tanzania Ministry of Health — traditional and modern medicine (25–26 March 2026)",
        href: TANZANIA_OFFICIAL_LINKS.mohTraditional2026,
        detail: "Ministry description of follow-on work to connect traditional and modern medicine systems.",
      },
      {
        label: "Ministry of External Affairs, India — India–Tanzania brief (April 2026)",
        href: TANZANIA_OFFICIAL_LINKS.meaBrief,
        detail: "Official bilateral note including the December 2025 health MoU.",
      },
      {
        label: "Ministry of Tourism, Government of India",
        href: TANZANIA_OFFICIAL_LINKS.tourism,
        detail: "Government information on India’s tourism and medical-value-travel framework.",
      },
    ],
  },
};

export function tanzaniaSpecialtyHref(kind: "doctors" | "hospitals" | "costs", specialty: string) {
  const opts = { destination: INDIA, specialty };
  if (kind === "doctors") return doctorsPath(opts);
  if (kind === "hospitals") return hospitalsPath(opts);
  return costsFilterPath(opts);
}

export function tanzaniaCityHrefs(city: string) {
  return {
    doctors: doctorsPath({ destination: INDIA, city }),
    hospitals: hospitalsPath({ destination: INDIA, city }),
    costs: costsFilterPath({ destination: INDIA, city }),
  };
}
