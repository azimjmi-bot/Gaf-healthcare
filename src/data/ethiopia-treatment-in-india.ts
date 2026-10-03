import type { QuickAnswerItem } from "@/lib/doctor-quick-answers";
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

export const ETHIOPIA_PAGE_PATH = "/ethiopia/treatment-in-india";
export const ETHIOPIA_PAGE_LOCALES = ["en"] as const;
export const ETHIOPIA_LAST_REVIEWED = "2026-10-03";

export type EthiopiaPageCopy = typeof ethiopiaPageCopyEn;

export function ethiopiaPageCopy(_locale: AppLocale): EthiopiaPageCopy {
  return ethiopiaPageCopyEn;
}

const INDIA = "India";

export const ETHIOPIA_OFFICIAL_LINKS = {
  eVisa: "https://indianvisaonline.gov.in/evisa/tvoa.html",
  embassy: "https://eoiaddisababa.gov.in/embassy/",
  contact: "https://eoiaddisababa.gov.in/contact-us/",
  appointment: "https://eoiaddisababa.gov.in/schedule-your-appointment/",
  fees: "https://eoiaddisababa.gov.in/visa-passport-consular-fee/",
  feesByNationality: "https://eoiaddisababa.gov.in/visa-fee-for-nationals-of-different-countries/",
  yellowFever: "https://eoiaddisababa.gov.in/wp-content/uploads/2025/11/Yellow-Fever-Awarness.pdf",
  etDelhi: "https://www.ethiopianairlines.com/en-in/flights-from-delhi-to-addis-ababa",
  etMumbai: "https://www.ethiopianairlines.com/en-et/flights-from-addis-ababa-to-mumbai",
  etDestinations: "https://corporate.ethiopianairlines.com/AboutEthiopian/Destinations",
} as const;

export const ETHIOPIA_CURATED_TREATMENT_SLUGS = [
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
  "hip-replacement-surgery-in-india",
  "acl-surgery-in-india",
  "whipple-surgery-in-india",
  "bone-marrow-transplant-in-india",
] as const;

export const ETHIOPIA_CANCER_TREATMENT_SLUGS = TANZANIA_CANCER_TREATMENT_SLUGS;

export const ETHIOPIA_COST_PROCEDURE_NAMES = [
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

export const ETHIOPIA_DOCTOR_SPECIALTY_SLUGS = [
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

export function resolveEthiopiaCostRows(catalog: Treatment[]) {
  return ETHIOPIA_COST_PROCEDURE_NAMES.map((name) => {
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

export function ethiopiaDoctors(doctors: Doctor[]) {
  return ETHIOPIA_DOCTOR_SPECIALTY_SLUGS.map((specialtySlug) => {
    const pool = doctors.filter((doctor) => doctor.specialtySlug === specialtySlug);
    const featured = pool.find((doctor) => doctor.featured);
    return featured ?? [...pool].sort((a, b) => a.name.localeCompare(b.name))[0];
  }).filter((row): row is Doctor => Boolean(row));
}

export const ethiopiaPageCopyEn = {
  seo: {
    title: "Medical Treatment in India for Ethiopian Patients",
    description:
      "Explore medical treatment in India for Ethiopian patients. Find specialist doctors, hospitals, treatment options, indicative costs, medical visa guidance and support from GAF Healthcare.",
    keywords: [
      "medical treatment in India for Ethiopian patients",
      "treatment in India for Ethiopian patients",
      "medical treatment in India from Ethiopia",
      "medical tourism from Ethiopia to India",
      "Ethiopian patients in India",
      "hospitals in India for Ethiopian patients",
      "doctors in India for Ethiopian patients",
      "treatment cost in India for Ethiopian patients",
      "medical visa for Ethiopian patients",
      "India medical visa from Ethiopia",
      "medical treatment in India from Addis Ababa",
      "Indian hospitals for Ethiopian patients",
    ],
  },
  breadcrumb: {
    home: "Home",
    ethiopia: "Ethiopia",
    page: "Treatment in India",
  },
  hero: {
    eyebrow: "Medical treatment in India for Ethiopian patients",
    h1: "Medical Treatment in India for Ethiopian Patients",
    lede:
      "If you are looking for medical treatment in India from Ethiopia, GAF Healthcare helps patients and families understand their treatment options, connect with appropriate specialists and hospitals, obtain treatment estimates, coordinate appointments and prepare for the journey to India.",
    primaryCta: "Share Your Medical Reports",
    secondaryCta: "Explore Treatments",
    whatsappLabel: "WhatsApp +91 90443 46292",
  },
  quickAnswer: [
    {
      question: "Can Ethiopian patients travel to India for medical treatment?",
      answer:
        "Yes. Ethiopian nationals can apply for an Indian medical visa through the Embassy of India in Addis Ababa. The Embassy states that it issues medical and other visas to Ethiopian nationals.",
    },
    {
      question: "Can Ethiopian patients get an Indian e-Medical Visa?",
      answer:
        "Ethiopia is not currently included in the Government of India's e-Visa eligible-country list. Ethiopian patients should therefore check the regular medical-visa process through the Embassy of India in Addis Ababa rather than assuming that an e-Medical Visa is available.",
    },
    {
      question: "What treatments are available in India?",
      answer:
        "Patients may seek treatment in areas including oncology, cardiology, cardiac surgery, neurosurgery, orthopedics, urology, gastroenterology, transplantation, fertility and other specialist disciplines.",
    },
    {
      question: "How much does treatment in India cost?",
      answer:
        "There is no single price. The cost depends on the diagnosis, procedure, hospital, specialist, medicines, implants, investigations, hospitalization and treatment complexity.",
    },
    {
      question: "Can I get a medical opinion before travelling?",
      answer:
        "Yes. Patients can begin by sharing available medical reports and diagnostic records for review by an appropriate specialist or hospital.",
    },
    {
      question: "How can GAF Healthcare help?",
      answer:
        "GAF Healthcare can assist with medical report coordination, specialist and hospital options, treatment estimates, appointment coordination and aspects of the international-patient journey.",
    },
  ] satisfies QuickAnswerItem[],
  why: {
    heading: "Why Ethiopian Patients Consider Medical Treatment in India",
    intro:
      "Patients generally travel abroad for medical care when they are looking for a particular specialist, procedure, second opinion or level of specialised care. India has a large healthcare ecosystem covering multiple medical and surgical specialties.",
    points: [
      "Major hospitals provide multidisciplinary services across oncology, cardiology, neurosciences, orthopaedics, gastroenterology, urology, transplantation and other fields",
      "The relevant question is not simply whether India has advanced hospitals — it is whether a particular Indian hospital and specialist are appropriate for the patient's specific diagnosis",
      "A records-first review can clarify the likely pathway, investigations and stay before flights are booked",
      "International-patient desks can issue appointment or admission letters used in the medical-visa application",
      "Published planning ranges help families compare the medical budget before travel — they are not hospital quotations",
    ],
    close:
      "That is why GAF Healthcare recommends beginning with the medical records and treatment requirement rather than choosing a hospital based only on its name.",
  },
  overview: {
    heading: "Medical Treatment in India for Patients from Ethiopia",
    intro:
      "The Indian healthcare system includes hospitals and specialist teams treating both routine and complex conditions. Depending on the diagnosis, Ethiopian patients may consider India for the specialties below. The appropriate treatment pathway should always be determined by a qualified medical professional after reviewing the patient's clinical information.",
    areas: [
      "Cancer treatment",
      "Cardiology",
      "Cardiac surgery",
      "Neurosurgery",
      "Neurology",
      "Orthopaedic surgery",
      "Joint replacement",
      "Gastroenterology",
      "Liver and pancreatic surgery",
      "Urology",
      "Kidney treatment",
      "Organ transplantation",
      "Paediatric treatment",
      "Fertility treatment",
      "Bariatric surgery",
      "Robotic and minimally invasive surgery",
      "Complex diagnostic evaluation",
      "Second opinions",
    ],
  },
  treatments: {
    heading: "Popular Treatment Categories for Ethiopian Patients",
    intro:
      "Each card links only to a live GAF specialty or treatment page. Where GAF does not yet publish a dedicated page, the category is explained without an invented URL.",
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
        title: "Urology",
        body: "Prostate and kidney cancer surgery, stone and prostate procedures, and kidney-transplant evaluation.",
        href: "/treatments/radical-prostatectomy-in-india",
        hrefLabel: "Radical prostatectomy in India",
        specialty: "Urology",
      },
      {
        title: "Gastroenterology",
        body: "Complex abdominal and HPB surgery, including Whipple and HIPEC where clinically appropriate, plus endoscopic work-up.",
        href: "/treatments/whipple-surgery-in-india",
        hrefLabel: "Whipple surgery in India",
        specialty: "Gastroenterology",
      },
      {
        title: "Paediatric Treatment",
        body: "Paediatric cardiology and cardiac surgery, oncology, neurosurgery, orthopaedics and related children's services arranged with a paediatric team.",
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
        body: "Ethiopian patients may travel to India for fertility evaluation and assisted reproductive treatment. GAF does not yet publish a dedicated IVF page. Eligibility, protocols and applicable Indian regulations should be confirmed with the treating fertility centre before travel.",
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
    heading: "Treatment directory",
    intro:
      "Use this directory to move from this country page to GAF’s live treatment, specialty and cost guides. Items without a dedicated page are listed for planning only.",
    groups: [
      {
        title: "Oncology",
        items: [
          { label: "Breast Cancer", href: "/treatments/breast-cancer-treatment-in-india" },
          { label: "Colon Cancer", href: "/treatments/colon-cancer-treatment-in-india" },
          { label: "Prostate Cancer", href: "/treatments/prostate-cancer-treatment-in-india" },
          { label: "Pancreatic Cancer", href: "/treatments/pancreatic-cancer-treatment-in-india" },
          { label: "Ovarian Cancer", href: "/treatments/ovarian-cancer-treatment-in-india" },
          { label: "Cervical Cancer", href: "/treatments/cervical-cancer-treatment-in-india" },
          { label: "Chemotherapy", href: "/treatments/chemotherapy-in-india" },
          { label: "Immunotherapy", href: "/treatments/immunotherapy-in-india" },
          { label: "Targeted Therapy", href: "/treatments/targeted-therapy-in-india" },
          { label: "Hormone Therapy", href: "/treatments/hormone-therapy-in-india" },
          { label: "Precision Oncology", href: "/treatments/precision-oncology-in-india" },
          { label: "Radiation Oncology", href: "/treatments/external-beam-radiotherapy-in-india" },
          { label: "Surgical Oncology", href: doctorsPath({ destination: INDIA, specialty: "Surgical Oncology" }) },
        ],
      },
      {
        title: "Cardiology",
        items: [
          { label: "Angioplasty", href: "/treatments/coronary-angioplasty-in-india" },
          { label: "CABG", href: "/treatments/cabg-surgery-in-india" },
          { label: "Valve Replacement", href: "/treatments/heart-valve-replacement-in-india" },
          { label: "Paediatric Cardiac Surgery", href: "/treatments/ventricular-septal-defect-surgery-in-india" },
          { label: "Cardiologists", href: doctorsPath({ destination: INDIA, specialty: "Cardiology" }) },
          { label: "Cardiac Surgeons", href: doctorsPath({ destination: INDIA, specialty: "Cardiac Surgery" }) },
        ],
      },
      {
        title: "Neurosurgery",
        items: [
          { label: "Brain Tumour Surgery", href: "/treatments/brain-tumor-surgery-in-india" },
          { label: "Craniotomy", href: "/treatments/craniotomy-surgery-in-india" },
          { label: "Endoscopic Brain Surgery", href: "/treatments/endoscopic-brain-surgery-in-india" },
          { label: "Pituitary Tumour Surgery", href: "/treatments/pituitary-tumor-surgery-in-india" },
          { label: "Hydrocephalus Surgery", href: "/treatments/hydrocephalus-surgery-in-india" },
          { label: "Spine Tumour Surgery", href: "/treatments/spine-tumor-surgery-in-india" },
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
        title: "Urology",
        items: [
          { label: "Prostate Cancer Treatment", href: "/treatments/prostate-cancer-treatment-in-india" },
          { label: "Radical Prostatectomy", href: "/treatments/radical-prostatectomy-in-india" },
          { label: "Kidney Cancer Treatment", href: "/treatments/radical-nephrectomy-in-india" },
          { label: "Kidney Transplantation", href: costPath("Kidney Transplantation") },
          { label: "Urologists", href: doctorsPath({ destination: INDIA, specialty: "Urology" }) },
        ],
      },
      {
        title: "Gastroenterology",
        items: [
          { label: "Whipple Surgery", href: "/treatments/whipple-surgery-in-india" },
          { label: "HIPEC", href: "/treatments/hipec-surgery-in-india" },
          { label: "Gastroenterologists", href: doctorsPath({ destination: INDIA, specialty: "Gastroenterology" }) },
        ],
      },
      {
        title: "Fertility",
        items: [
          { label: "IVF", href: "" },
          { label: "ICSI", href: "" },
          { label: "IUI", href: "" },
          { label: "Frozen Embryo Transfer", href: "" },
          { label: "PGT", href: "" },
          { label: "Male Infertility Treatment", href: "" },
        ],
      },
    ],
  },
  cancer: {
    heading: "Cancer Treatment in India for Ethiopian Patients",
    intro:
      "Cancer treatment is one of the areas in which international patients may require multiple specialists rather than a single doctor. For a patient travelling from Ethiopia, obtaining a specialist opinion before travelling can help clarify which investigations and treatment options may be required.",
    body: "Depending on the cancer type and stage, treatment may involve medical oncology, surgical oncology, radiation oncology, chemotherapy, immunotherapy, targeted therapy, hormone therapy, precision oncology, neoadjuvant chemotherapy, cancer surgery, palliative care or supportive care.",
    modalities: [
      { label: "Medical Oncologists", href: doctorsPath({ destination: INDIA, specialty: "Medical Oncology" }) },
      { label: "Surgical Oncologists", href: doctorsPath({ destination: INDIA, specialty: "Surgical Oncology" }) },
      { label: "Radiation Oncologists", href: doctorsPath({ destination: INDIA, specialty: "Radiation Oncology" }) },
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
    heading: "Treatment Cost in India for Ethiopian Patients",
    intro:
      "One of the first questions many international patients ask is how much treatment in India will cost. There is no single price. Hospitals calculate estimates from the diagnosis, procedure, medicines, implants, room category, ICU need and length of stay.",
    factors: [
      "Diagnosis and stage",
      "Procedure or drug protocol",
      "Hospital and specialist",
      "Room category",
      "Diagnostic tests",
      "Medicines, implants or devices",
      "ICU requirement",
      "Hospitalisation and rehabilitation",
      "Complications or additional procedures",
      "Follow-up after discharge",
    ],
    tableIntro:
      "The ranges below are GAF Healthcare planning figures from the live cost catalogue. They are not hospital quotations. A generic internet price should be treated only as a planning reference.",
    disclaimer:
      "Indicative costs are not hospital quotations. The final treatment estimate is determined by the treating hospital after reviewing the patient's medical records and may change according to investigations, treatment requirements, medicines, implants, length of stay and complications.",
    ctaLabel: "Share your medical reports for a personalised estimate",
  },
  extraBudget: {
    heading: "Medical Travel Costs Beyond Treatment",
    intro:
      "The hospital bill is only one component of the overall medical-travel budget. An Ethiopian patient may also need to budget for items that are often outside the hospital estimate.",
    items: [
      "Medical consultation and diagnostic tests",
      "Treatment, hospitalisation and medicines",
      "Medical visa fees",
      "Flights for the patient and attendant",
      "Accommodation before admission, between visits and after discharge",
      "Local transportation and food",
      "Attendant expenses and additional stay",
      "Follow-up consultations",
    ],
    close:
      "Ask the hospital or coordinator which items are included in the treatment estimate. This can prevent unexpected expenses later.",
  },
  cities: {
    heading: "Major Indian Cities for Ethiopian Patients",
    intro:
      "India’s specialist healthcare infrastructure is spread across several major cities. There is no single city that is appropriate for every patient. The medical requirement should determine the city and hospital.",
    items: [
      {
        name: "Delhi NCR",
        body: "A major medical hub with hospitals providing oncology, cardiology, neurosurgery, orthopaedics, gastroenterology, urology, transplantation and paediatric specialties. Useful when a family wants to compare more than one hospital in the same region.",
        city: "Delhi NCR",
        catalog: true,
      },
      {
        name: "Mumbai",
        body: "Major hospitals covering oncology, cardiology, cardiac surgery, neurosurgery, orthopaedics, gastroenterology, urology and transplantation. Mumbai is also an important international arrival point.",
        city: "Mumbai",
        catalog: true,
      },
      {
        name: "Chennai",
        body: "A large healthcare ecosystem with specialist services in cardiology, cardiac surgery, oncology, neurosurgery, orthopaedics, transplantation, gastroenterology and urology.",
        city: "Chennai",
        catalog: true,
      },
      {
        name: "Hyderabad",
        body: "Specialist hospitals providing cancer care, cardiology, neurosurgery, orthopaedics, transplantation, gastroenterology and robotic surgery.",
        city: "Hyderabad",
        catalog: true,
      },
      {
        name: "Bengaluru",
        body: "Specialist services across cardiology, oncology, neurosurgery, orthopaedics, urology, gastroenterology and fertility treatment.",
        city: "Bengaluru",
        catalog: true,
      },
      {
        name: "Pune",
        body: "Pune is another established medical destination, with specialist services including oncology, cardiology, orthopaedics, neurosurgery, gastroenterology and urology. GAF’s live city catalogue does not yet include Pune, so this page does not link to a Pune directory.",
        city: "Pune",
        catalog: false,
      },
    ],
  },
  hospitals: {
    heading: "Hospitals in India for Ethiopian Patients",
    intro:
      "Choosing a hospital should begin with the patient's medical requirement: the relevant specialty, procedure experience, diagnostic and surgical facilities, ICU support, multidisciplinary services, the international-patient department, expected duration, estimated cost and follow-up arrangements. The campuses below are drawn from GAF’s live India catalogue, one from each published city.",
    directoryLabel: "Browse hospitals in India",
  },
  doctors: {
    heading: "Specialist Doctors in India for Ethiopian Patients",
    intro:
      "Finding the right specialist can be more important than simply choosing a city. A patient with cancer may need a surgical oncologist, a medical oncologist and a radiation oncologist. A patient with heart disease may require a cardiologist, an interventional cardiologist or a cardiac surgeon. The specialists below are taken from GAF’s live doctor catalogue.",
    directoryLabel: "Browse doctors in India",
  },
  visa: {
    heading: "Medical Visa for Ethiopian Patients Travelling to India",
    intro:
      "This is an important difference between the Ethiopia page and some other African country pages. The Government of India’s current e-Visa eligibility information does not list Ethiopia among the countries eligible for e-Visa services. Ethiopian patients should not assume that they can apply for an Indian e-Medical Visa.",
    points: [
      "The Embassy of India in Addis Ababa states that it issues Medical and Medical Attendant Visas to Ethiopian nationals.",
      "Patients should follow the current visa procedure provided by the Embassy of India in Addis Ababa, not the e-Visa portal used by some other nationalities.",
      "The Embassy’s published consular information currently lists Medical Visa and Medical Attendant Visa fees of US$80 for up to six months, single or multiple entry, plus an additional US$3 ICWF charge. Visa fees and requirements can change, so applicants should verify the current fee before submitting an application.",
      "The Embassy is located at House 224, Kebele 13/14, Woreda 07, Arada Sub-City, Near Bel Air Hotel, Aware, Addis Ababa, Ethiopia.",
      "The Embassy currently lists working hours for visa and consular services as 9:00 am to 11:30 am on working days, Monday to Friday, except holidays.",
    ],
    disclaimer:
      "Visa requirements, fees, processing procedures and supporting-document requirements can change. Always verify the latest requirements directly with the Embassy of India in Addis Ababa or the Government of India’s official visa system before applying or travelling.",
    documentsHeading: "Documents Ethiopian Patients May Need for a Medical Visa",
    documents: [
      "Valid passport",
      "Completed visa application",
      "Recent passport photographs",
      "Medical reports",
      "Local doctor's referral or medical documentation",
      "Indian hospital invitation or appointment documentation",
      "Treatment information",
      "Financial documents where required",
      "Vaccination documentation",
      "Medical attendant documents where applicable",
    ],
    documentsNote:
      "The Embassy’s published visa documentation for Ethiopia includes passport and vaccination documentation among the requirements for several visa categories. Applicants should follow the specific requirements applicable to the medical-visa category.",
  },
  yellowFever: {
    heading: "Yellow Fever Requirements for Ethiopian Patients",
    intro:
      "This is an important travel consideration for Ethiopian patients. The Embassy of India in Addis Ababa states that India applies yellow-fever vaccination requirements to travellers arriving from yellow-fever-endemic countries.",
    points: [
      "The Embassy advises that travellers aged nine months or older arriving from endemic countries should possess a valid Yellow Fever Vaccination Certificate.",
      "It also states that the certificate becomes valid 10 days after vaccination.",
      "Patients should therefore check their vaccination documentation well before travelling. Do not wait until the day of departure to resolve vaccination documentation.",
    ],
    close:
      "Because health-entry rules can change, verify the current requirements with the relevant Indian authorities before travel.",
  },
  travel: {
    heading: "Travelling from Ethiopia to India for Medical Treatment",
    intro:
      "Addis Ababa is the primary international gateway for many Ethiopian patients travelling abroad for medical treatment. Flight options to India can change according to airline schedules and season. Patients should choose their Indian arrival airport based on the location of the selected hospital.",
    points: [
      "Ethiopian Airlines currently publishes flight options between Addis Ababa and Delhi, making Delhi one of the Indian destinations that can be considered when the selected hospital is in Delhi NCR.",
      "The airline also publishes India–Ethiopia services involving Mumbai and Addis Ababa.",
      "Its published destinations list includes several Indian cities. Schedules and fares change frequently, so confirm the current itinerary directly with the airline or travel provider before booking.",
      "Book travel after the hospital has proposed an appointment or admission window. Tight return tickets are a poor fit for major surgery, cancer treatment or transplantation.",
    ],
    tableHeading: "Likely arrival airports",
    airports: [
      { city: "Delhi NCR", airport: "Indira Gandhi International Airport" },
      { city: "Mumbai", airport: "Chhatrapati Shivaji Maharaj International Airport" },
      { city: "Chennai", airport: "Chennai International Airport" },
      { city: "Hyderabad", airport: "Rajiv Gandhi International Airport" },
      { city: "Bengaluru", airport: "Kempegowda International Airport" },
      { city: "Pune", airport: "Pune International Airport" },
    ],
  },
  documents: {
    heading: "What Ethiopian Patients Should Bring to India",
    intro:
      "Prepare your medical documents before travelling. Keep digital copies as well as printed copies where possible.",
    general: [
      "Medical reports and blood-test results",
      "Imaging reports, CT scans, MRI scans and X-rays",
      "Pathology and biopsy reports",
      "Previous discharge summaries and surgery records",
      "Current prescriptions and medication list",
      "Passport, visa and hospital appointment letter",
    ],
    cancer: [
      "Histopathology and biopsy reports",
      "Immunohistochemistry and molecular testing where available",
      "CT, MRI and PET-CT",
      "Previous chemotherapy, radiation and surgical records",
      "Current medication list",
    ],
    cardiac: [
      "ECG",
      "Echocardiogram",
      "Coronary angiography or CT coronary report",
      "Stress-test reports where applicable",
      "Previous cardiac procedures, discharge summaries and current medications",
    ],
    ortho: [
      "X-rays, MRI and CT scans",
      "Previous surgical reports and implant details if applicable",
      "Physiotherapy records",
      "Current medications",
    ],
    cancerNote:
      "If tissue blocks or pathology slides are available, ask the receiving hospital whether they should be brought for review.",
  },
  living: {
    heading: "Accommodation, Food and Communication in India",
    intro:
      "Patients and families may stay in India for days or weeks depending on the treatment. The accommodation requirement depends on whether the stay is before admission, between consultations, after discharge, during outpatient treatment or during rehabilitation.",
    accommodation: [
      "Distance from the hospital and accessibility, including elevator availability",
      "Kitchen and laundry facilities",
      "Pharmacy, grocery and restaurant access",
      "Transportation and length of stay",
    ],
    accommodationNote:
      "Patients recovering from major surgery should prioritise convenient access to the treating hospital rather than choosing accommodation solely based on price.",
    food: "Before choosing accommodation, consider whether the surrounding area provides restaurants, grocery stores, pharmacies, banks or ATMs, transportation and appropriate food options. For patients with dietary restrictions, discuss nutritional requirements with the treating hospital.",
    language:
      "English is widely used in Indian hospitals, particularly for medical documentation and communication between doctors. Ethiopian patients and families should nevertheless make sure that they clearly understand the diagnosis, proposed treatment, alternatives, expected benefits, potential risks, estimated costs, hospital stay, recovery time and follow-up. If interpretation is required, this should be discussed with the hospital or patient-coordination team before the appointment.",
  },
  journey: {
    heading: "Medical Journey from Ethiopia to India",
    intro:
      "Travelling abroad for treatment can feel complicated when a patient is already dealing with a serious medical condition. You do not need to start by choosing a hospital at random. Start with your medical records.",
    steps: [
      {
        title: "Share Your Medical Reports",
        body: "Start with the records you already have: diagnosis reports, blood tests, CT, MRI, X-rays, pathology, biopsy reports, previous operation records, discharge summaries and current medications.",
      },
      {
        title: "Specialist Review",
        body: "The relevant Indian specialist or hospital reviews the available information. The doctor may request additional records or investigations.",
      },
      {
        title: "Understand the Treatment Options",
        body: "The specialist explains the proposed treatment approach based on the available clinical information. For complex cases, a second specialist opinion may also be considered.",
      },
      {
        title: "Hospital and Cost Estimate",
        body: "Once the treatment pathway is understood, the hospital can provide an estimated treatment plan and cost. The estimate may change after an in-person assessment.",
      },
      {
        title: "Confirm the Hospital Appointment",
        body: "Once the patient selects the appropriate hospital, the appointment or admission process can be coordinated.",
      },
      {
        title: "Arrange the Medical Visa",
        body: "Ethiopian patients should follow the applicable medical-visa process through the Embassy of India in Addis Ababa.",
      },
      {
        title: "Travel to India",
        body: "Travel should be planned around the hospital appointment and expected treatment schedule.",
      },
      {
        title: "Treatment in India",
        body: "The patient undergoes the necessary clinical assessment before treatment begins.",
      },
      {
        title: "Recovery and Follow-Up",
        body: "After treatment, the hospital provides discharge instructions, medication information and follow-up recommendations.",
      },
      {
        title: "Return to Ethiopia",
        body: "When the treating team considers the patient medically fit to travel, the patient can return to Ethiopia and continue follow-up as advised.",
      },
    ],
  },
  help: {
    heading: "How GAF Healthcare Helps Ethiopian Patients",
    intro:
      "Travelling from Ethiopia to India for medical treatment involves many decisions. GAF Healthcare can help coordinate the process. The exact services available should be confirmed with GAF Healthcare before travel.",
    before: [
      "Medical report collection",
      "Specialist identification",
      "Hospital options",
      "Medical opinion coordination",
      "Treatment estimate coordination",
      "Appointment scheduling",
      "Visa-document coordination",
      "Travel planning",
    ],
    during: [
      "Hospital coordination",
      "Appointment assistance",
      "Patient communication",
      "Family coordination",
      "Practical support during the treatment journey",
    ],
    after: [
      "Discharge coordination",
      "Follow-up planning",
      "Medical-document collection",
      "Communication with the treating hospital",
      "Return-travel planning",
    ],
    note: "GAF Healthcare’s role is coordination, not a substitute for the treating doctor.",
  },
  opinion: {
    heading: "Why Get a Medical Opinion Before Travelling?",
    intro:
      "International travel is a significant commitment for both the patient and family. A medical opinion before travel can help clarify practical questions before flights are booked.",
    questions: [
      "Whether surgery may be required",
      "Which specialist should evaluate the case",
      "What additional tests may be needed",
      "Possible treatment options",
      "Expected hospitalisation",
      "Approximate treatment duration",
      "Indicative treatment costs",
      "Whether the patient should travel immediately",
    ],
    close:
      "A remote medical review does not replace a physical examination. The final treatment decision is made by the treating medical team after evaluating the patient.",
  },
  choose: {
    heading: "How to Choose a Hospital and Specialist in India",
    intro:
      "A hospital should be selected according to the medical requirement, and the specialist should match the patient's actual condition. This is why GAF Healthcare’s doctor and hospital directories are connected to this country page rather than listing generic “top doctors”.",
    hospital: [
      "Relevant specialty and subspecialty",
      "Specialists experienced in the relevant procedure",
      "Diagnostic, surgical and critical-care facilities",
      "Multidisciplinary support if several specialties may be needed",
      "An established international-patient department",
      "Estimated duration of stay",
      "What is included in the hospital estimate",
      "How follow-up will be handled after the patient returns to Ethiopia",
    ],
    specialist: [
      "Breast cancer → breast or surgical oncologist, medical oncologist, radiation oncologist",
      "Coronary artery disease → cardiologist, interventional cardiologist, cardiac surgeon where required",
      "Brain tumour → neurosurgeon, neuro-oncologist or medical oncologist where appropriate, radiation oncologist where required",
      "Knee replacement → orthopaedic joint-replacement surgeon",
    ],
  },
  faqHeading: "Frequently Asked Questions",
  faqs: [
    {
      q: "Can Ethiopian patients travel to India for medical treatment?",
      a: "Yes. The Embassy of India in Addis Ababa states that it issues medical visas to Ethiopian nationals.",
    },
    {
      q: "Can Ethiopian citizens get an Indian e-Medical Visa?",
      a: "Ethiopia is not currently listed among the countries eligible for India’s e-Visa system. Ethiopian patients should follow the medical-visa process provided by the Embassy of India in Addis Ababa.",
    },
    {
      q: "Where do Ethiopian patients apply for an Indian medical visa?",
      a: "The Embassy of India in Addis Ababa provides visa services for Ethiopian nationals, including medical visas.",
    },
    {
      q: "How much does an Indian medical visa cost for Ethiopian patients?",
      a: "The Embassy’s published fee schedule currently lists US$80 for a medical or medical attendant visa valid up to six months, single or multiple entry, plus a US$3 ICWF charge. Fees can change, so applicants should verify the latest fee before applying.",
    },
    {
      q: "Can a family member accompany an Ethiopian patient?",
      a: "Medical attendant arrangements may be available, subject to the applicable visa requirements. Patients should confirm the current rules with the Embassy of India in Addis Ababa before applying.",
    },
    {
      q: "How much does treatment in India cost for Ethiopian patients?",
      a: "There is no universal cost. The amount depends on the diagnosis, procedure, hospital, specialist, medicines, implants, investigations, hospitalisation and other clinical factors.",
    },
    {
      q: "Can I get a medical opinion before travelling to India?",
      a: "Yes. Patients can begin by sharing their medical reports with an appropriate specialist or hospital. Additional information may be requested before an opinion can be provided.",
    },
    {
      q: "Which Indian city is best for Ethiopian patients?",
      a: "There is no single city that is appropriate for every patient. Delhi NCR, Mumbai, Chennai, Hyderabad, Bengaluru and Pune all have major medical facilities. The appropriate city depends on the diagnosis, specialist and hospital.",
    },
    {
      q: "Which treatments are commonly available in India?",
      a: "Indian hospitals provide treatment across oncology, cardiology, neurosurgery, orthopaedics, urology, gastroenterology, transplantation, fertility and many other specialties.",
    },
    {
      q: "How long should I stay in India?",
      a: "It depends on the treatment. The hospital should provide an estimated hospitalisation and recovery period before the patient books a return flight.",
    },
    {
      q: "What medical documents should I bring?",
      a: "Bring diagnostic reports, imaging, pathology, previous treatment records, prescriptions and discharge summaries. The exact documents depend on the medical condition.",
    },
    {
      q: "Should cancer patients bring pathology reports?",
      a: "Yes. Histopathology, biopsy, immunohistochemistry, molecular reports and imaging can be particularly useful when an oncology team is reviewing a case.",
    },
    {
      q: "Do Ethiopian patients need a yellow fever vaccination certificate?",
      a: "Travellers arriving in India from yellow-fever-endemic countries may need a valid Yellow Fever Vaccination Certificate. The Embassy of India in Addis Ababa advises travellers from endemic countries to carry the certificate and notes that it becomes valid 10 days after vaccination. Verify current requirements before travelling.",
    },
    {
      q: "Can I compare hospitals before travelling?",
      a: "Yes. For complex treatment, comparing hospitals based on specialist expertise, proposed treatment, facilities, expected stay and cost can help patients understand their options.",
    },
    {
      q: "Can GAF Healthcare help Ethiopian patients find hospitals?",
      a: "GAF Healthcare can assist with hospital and specialist coordination according to the patient's medical requirement.",
    },
    {
      q: "Can GAF Healthcare arrange a medical opinion?",
      a: "GAF Healthcare can coordinate the sharing and review of medical information with appropriate specialists, subject to the treating hospital or doctor's process.",
    },
    {
      q: "Can I continue follow-up after returning to Ethiopia?",
      a: "Follow-up requirements depend on the treatment. Before returning home, patients should obtain discharge documents, medication instructions and a clear follow-up plan from the treating hospital.",
    },
    {
      q: "Can I travel immediately after surgery?",
      a: "Not necessarily. The treating doctor should determine when the patient is medically fit to travel.",
    },
  ],
  finalCta: {
    heading: "Planning Medical Treatment in India from Ethiopia?",
    body: "You do not need to start by choosing a hospital at random. Start with your medical records. GAF Healthcare can help Ethiopian patients understand their treatment options, identify relevant specialists and hospitals, coordinate treatment estimates and plan the medical journey to India.",
    primary: "Share Your Medical Reports",
    secondary: "Contact GAF Healthcare",
    whatsappLabel: "WhatsApp +91 90443 46292",
    steps: "Get a Specialist Opinion → Explore Hospital Options → Understand the Estimated Cost → Plan Your Journey to India",
  },
  disclaimer: {
    heading: "Medical Disclaimer",
    body: "The information on this page is provided for general educational and medical-travel planning purposes. It is not a diagnosis, medical prescription or substitute for consultation with a qualified healthcare professional. Treatment recommendations, risks, outcomes, duration and costs vary between patients. Final treatment decisions should be made by the treating medical team after evaluating the patient. Indicative costs are not guaranteed hospital quotations. The final bill may differ because of investigations, medicines, implants, treatment changes, complications, ICU requirements and length of stay. Visa and immigration requirements can change. Ethiopian patients should verify current requirements directly with the Embassy of India in Addis Ababa and the Government of India’s official visa system before applying or travelling.",
  },
  sources: {
    heading: "Sources & Further Reading",
    items: [
      {
        label: "Government of India — Official e-Visa portal",
        href: ETHIOPIA_OFFICIAL_LINKS.eVisa,
        detail: "Current e-Visa categories and eligible-country information. Ethiopia is not listed.",
      },
      {
        label: "Embassy of India, Addis Ababa — Embassy information",
        href: ETHIOPIA_OFFICIAL_LINKS.embassy,
        detail: "Confirms that the mission issues Medical and Medical Attendant Visas to Ethiopian nationals.",
      },
      {
        label: "Embassy of India, Addis Ababa — Contact and address",
        href: ETHIOPIA_OFFICIAL_LINKS.contact,
        detail: "Official mission address and consular location in Addis Ababa.",
      },
      {
        label: "Embassy of India, Addis Ababa — Appointment",
        href: ETHIOPIA_OFFICIAL_LINKS.appointment,
        detail: "Current guidance for scheduling visa and consular appointments.",
      },
      {
        label: "Embassy of India, Addis Ababa — Consular fee schedule",
        href: ETHIOPIA_OFFICIAL_LINKS.fees,
        detail: "Published medical and medical attendant visa fees. Verify the current figure before applying.",
      },
      {
        label: "Embassy of India, Addis Ababa — Visa fees by nationality",
        href: ETHIOPIA_OFFICIAL_LINKS.feesByNationality,
        detail: "Nationality-specific consular fee information published by the mission.",
      },
      {
        label: "Embassy of India, Addis Ababa — Yellow fever guidance",
        href: ETHIOPIA_OFFICIAL_LINKS.yellowFever,
        detail: "Vaccination requirements for travellers arriving from yellow-fever-endemic countries.",
      },
      {
        label: "Ethiopian Airlines — Delhi to Addis Ababa",
        href: ETHIOPIA_OFFICIAL_LINKS.etDelhi,
        detail: "Current published route information between Delhi and Addis Ababa. Schedules change.",
      },
      {
        label: "Ethiopian Airlines — Addis Ababa to Mumbai",
        href: ETHIOPIA_OFFICIAL_LINKS.etMumbai,
        detail: "Current published route information between Addis Ababa and Mumbai. Schedules change.",
      },
      {
        label: "Ethiopian Airlines — Destinations",
        href: ETHIOPIA_OFFICIAL_LINKS.etDestinations,
        detail: "Airline destination list, including Indian cities served. Confirm the current itinerary before booking.",
      },
    ],
  },
};
