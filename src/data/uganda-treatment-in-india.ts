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

export const UGANDA_PAGE_PATH = "/uganda/treatment-in-india";
export const UGANDA_PAGE_LOCALES = ["en"] as const;
export const UGANDA_LAST_REVIEWED = "2026-10-03";

export type UgandaPageCopy = typeof ugandaPageCopyEn;

export function ugandaPageCopy(_locale: AppLocale): UgandaPageCopy {
  return ugandaPageCopyEn;
}

const INDIA = "India";

export const UGANDA_OFFICIAL_LINKS = {
  eVisa: "https://indianvisaonline.gov.in/evisa/tvoa.html",
  eVisaHome: "https://indianvisaonline.gov.in/evisa/",
  eVisaFees: "https://indianvisaonline.gov.in/evisa/eTV_revised_fee_final.pdf",
  visaOnline: "https://indianvisaonline.gov.in/visa/",
  embassy: "https://hcikampala.gov.in/",
  embassyVisa: "https://hcikampala.gov.in/",
  embassyEvisa: "https://hcikampala.gov.in/page/e-visa/",
  meaBrief: "https://www.mea.gov.in/Portal/ForeignRelation/India-Uganda_bilateral_brief_1_.pdf",
  globocan: "https://gco.iarc.who.int/media/globocan/factsheets/populations/800-uganda-fact-sheet.pdf",
  iarcToday: "https://gco.iarc.who.int/today/en/fact-sheets-populations",
  whoData: "https://data.who.int/countries/800",
  mohfwYellowFever: "https://ihpoe.mohfw.gov.in/vaccination.php",
  boi: "https://boi.gov.in",
} as const;

export const UGANDA_CURATED_TREATMENT_SLUGS = [
  "cervical-cancer-treatment-in-india",
  "breast-cancer-treatment-in-india",
  "prostate-cancer-treatment-in-india",
  "colon-cancer-treatment-in-india",
  "lymphoma-treatment-in-india",
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

export const UGANDA_CANCER_TREATMENT_SLUGS = TANZANIA_CANCER_TREATMENT_SLUGS;

export const UGANDA_COST_PROCEDURE_NAMES = [
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

export const UGANDA_DOCTOR_SPECIALTY_SLUGS = [
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

export function resolveUgandaCostRows(catalog: Treatment[]) {
  return UGANDA_COST_PROCEDURE_NAMES.map((name) => {
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

export function ugandaDoctors(doctors: Doctor[]) {
  return UGANDA_DOCTOR_SPECIALTY_SLUGS.map((specialtySlug) => {
    const pool = doctors.filter((doctor) => doctor.specialtySlug === specialtySlug);
    const featured = pool.find((doctor) => doctor.featured);
    return featured ?? [...pool].sort((a, b) => a.name.localeCompare(b.name))[0];
  }).filter((row): row is Doctor => Boolean(row));
}

export const ugandaPageCopyEn = {
  seo: {
    title: "Medical Treatment in India for Ugandan Patients",
    description:
      "Explore medical treatment in India for Ugandan patients. Find specialist doctors, hospitals, treatments, indicative costs, e-Medical Visa guidance and support from GAF Healthcare.",
    keywords: [
      "medical treatment in India for Ugandan patients",
      "medical treatment in India from Uganda",
      "treatment in India for Ugandan patients",
      "medical tourism from Uganda to India",
      "India medical treatment for Ugandan patients",
      "Indian hospitals for Ugandan patients",
      "Indian doctors for Ugandan patients",
      "medical treatment cost in India for Ugandan patients",
      "cancer treatment in India for Ugandan patients",
      "cardiac treatment in India for Ugandan patients",
      "heart surgery in India for Ugandan patients",
      "neurosurgery in India for Ugandan patients",
      "orthopaedic treatment in India for Ugandan patients",
      "IVF in India for Ugandan patients",
      "medical visa India for Ugandan citizens",
      "e-Medical Visa India for Ugandan citizens",
      "Indian Medical Visa from Uganda",
      "treatment in India from Kampala",
      "medical treatment from Entebbe to India",
      "medical tourism India Uganda",
      "healthcare India for Ugandan patients",
      "cancer treatment India from Uganda",
      "hospital treatment in India from Uganda",
    ],
  },
  breadcrumb: {
    home: "Home",
    uganda: "Uganda",
    page: "Treatment in India",
  },
  hero: {
    eyebrow: "Medical treatment in India for Ugandan patients",
    h1: "Medical Treatment in India for Ugandan Patients",
    lede:
      "For a patient travelling from Uganda, choosing treatment abroad involves more than finding a hospital. GAF Healthcare helps Ugandan patients connect records from Kampala, Entebbe, Jinja, Mbarara, Gulu, Mbale and other regions with an appropriate Indian specialist and hospital, then plan the e-Medical Visa, travel and follow-up around that medical requirement.",
    primaryCta: "Get a Medical Opinion",
    secondaryCta: "Explore Treatments",
    whatsappLabel: "WhatsApp +91 90443 46292",
  },
  quickAnswer: {
    heading: "Quick Answer: Medical Treatment in India for Ugandan Patients",
    items: [
      {
        question: "Can Ugandan patients travel to India for medical treatment?",
        answer:
          "Yes. Ugandan citizens can travel to India for medical treatment using the applicable Indian Medical Visa or e-Medical Visa route. Uganda is currently included in India's official e-Visa eligible-country list.",
      },
      {
        question: "Can Ugandan citizens apply for an Indian e-Medical Visa?",
        answer:
          "Yes. Uganda is listed among the countries eligible for India's e-Visa services, which include an e-Medical Visa category. The official fee list currently shows Uganda at US$80.",
      },
      {
        question: "What treatments can Ugandan patients receive in India?",
        answer:
          "Depending on the diagnosis, patients can seek treatment in oncology, cardiology, cardiac surgery, neurosurgery, orthopaedics, urology, gastroenterology, nephrology, transplantation, IVF and fertility, paediatrics and many other specialties.",
      },
      {
        question: "Which Indian cities can Ugandan patients consider?",
        answer:
          "Delhi NCR, Mumbai, Chennai, Bengaluru and Hyderabad are major medical centres. The appropriate city depends on the diagnosis, required procedure, specialist and hospital.",
      },
      {
        question: "How much does medical treatment in India cost for Ugandan patients?",
        answer:
          "There is no universal price. The cost depends on diagnosis, treatment complexity, hospital, doctor, medicines, investigations, implants, ICU requirements, length of stay and other clinical factors.",
      },
      {
        question: "Can a Ugandan patient get a medical opinion before travelling?",
        answer:
          "Yes. Medical records can be submitted for preliminary review by an appropriate Indian specialist before the patient travels.",
      },
    ],
  },
  why: {
    heading: "Why Ugandan Patients Consider Medical Treatment in India",
    intro:
      "Travelling from Uganda to India for healthcare is a significant decision for the patient and family. The best starting point is not the hospital. It is the medical problem, and which specialist should review it.",
    points: [
      "A practical pathway is diagnosis, specialty, subspecialty, treatment, doctor, hospital, cost, visa and then travel",
      "India has tertiary and quaternary hospitals covering cancer, cardiac care, neurosurgery, orthopaedics, urology, gastroenterology, fertility, paediatrics and selected transplantation",
      "Multidisciplinary assessment can be useful when surgery, oncology, diagnostics and rehabilitation need to be coordinated",
      "A second medical opinion can be requested from existing records before a flight is booked",
    ],
    close:
      "The appropriate hospital still depends on the individual patient's medical requirements. India should not automatically be considered appropriate for every patient.",
  },
  relationship: {
    heading: "India–Uganda Healthcare Cooperation",
    paragraphs: [
      "India and Uganda have a long-standing development and healthcare relationship. An official MEA bilateral brief records that a telemedicine centre was established at Mulago Hospital in Kampala under the Pan-African e-Network, with diagnostic equipment including ECG, X-ray and ultrasound, and a connection to 11 Indian hospitals. The centres were inaugurated in August 2010.",
      "The same official brief family records that a radiotherapy machine was commissioned at Mulago Hospital in February 2020. A later brief records that the second phase of the Pan-Africa e-network was launched in Uganda, with a university and a hospital identified for e-VBAB, and that an e-Vidya Bharati / e-Arogya Bharati learning centre was inaugurated at Makerere University in November 2021.",
      "The High Commission of India in Kampala is concurrently accredited to Burundi. The Mission currently states that online application for e-Visa and regular visa services was enabled with effect from 10 September 2026 for Ugandan nationals and other foreigners residing in Uganda.",
      "These government-to-government relationships provide useful context for a Uganda–India medical pathway. They do not determine which treatment is appropriate for an individual patient.",
    ],
  },
  context: {
    heading: "Uganda's Healthcare Context",
    intro:
      "Uganda's healthcare system manages both infectious diseases and a growing noncommunicable-disease burden, including cancer and cardiovascular disease. Some patients travel when they need a particular subspecialist, advanced procedure, multidisciplinary service or second opinion.",
    points: [
      "English is an official language of Uganda, and Luganda is widely spoken. Indian hospitals generally use English for medical records and specialist consultations, which can simplify communication for many Ugandan patients. Interpretation can still be arranged when needed.",
      "Most international medical journeys begin at Entebbe International Airport. Patients travelling from Kampala, Jinja, Mbarara, Gulu, Mbale or other regions may first need to reach Entebbe.",
      "For some patients, appropriate treatment is available within Uganda. International treatment may become relevant when a particular specialist, technology or second opinion is required.",
      "Patients should always provide their current medication list to the treating Indian specialist and should not independently change medicines because an equivalent-looking product is available.",
    ],
    close:
      "Country-level health indicators do not determine an individual's medical needs. The relevant question is: what is the patient's diagnosis, what treatment is appropriate, and can the patient safely travel for that treatment?",
  },
  overview: {
    heading: "What Medical Treatments Can Ugandan Patients Get in India?",
    intro:
      "Indian hospitals provide specialist care across a wide range of medical disciplines. The appropriate treatment depends on the patient's diagnosis, stage of disease, previous treatment and overall clinical condition.",
    areas: [
      "Cancer treatment",
      "Cardiology and cardiac surgery",
      "Neurosurgery and spine surgery",
      "Orthopaedics and joint replacement",
      "Urology and kidney treatment",
      "Gastroenterology and hepatobiliary surgery",
      "IVF and fertility treatment",
      "Paediatric specialist care",
      "Selected transplant procedures",
      "Complex diagnostic evaluation and second opinions",
    ],
  },
  treatments: {
    heading: "Popular Medical Treatments for Ugandan Patients in India",
    intro:
      "Each card links only to a live GAF specialty or treatment page. Where GAF does not yet publish a dedicated page, the category is explained without an invented URL.",
    categories: [
      {
        title: "Cancer Treatment",
        body: "Medical, surgical and radiation oncology, including cervical, breast, prostate, colorectal and lymphoma pathways that already have GAF guides. Kaposi sarcoma, oesophageal-cancer and liver-cancer cases are coordinated after records review because dedicated pages are not yet published.",
        href: "/treatments/cervical-cancer-treatment-in-india",
        hrefLabel: "Cervical cancer treatment in India",
        specialty: "Medical Oncology",
      },
      {
        title: "Cardiology & Cardiac Surgery",
        body: "Angiography, angioplasty, bypass surgery, valve repair or replacement, TAVR in selected patients, pacemaker or ICD implantation and selected paediatric cardiac operations.",
        href: "/treatments/cabg-surgery-in-india",
        hrefLabel: "CABG surgery in India",
        specialty: "Cardiology",
      },
      {
        title: "Neurosurgery & Neurology",
        body: "Brain-tumour surgery, craniotomy, endoscopic and pituitary procedures, hydrocephalus, aneurysm evaluation and complex spine surgery.",
        href: "/treatments/brain-tumor-surgery-in-india",
        hrefLabel: "Brain tumour surgery in India",
        specialty: "Neurosurgery",
      },
      {
        title: "Orthopaedics",
        body: "Knee and hip replacement, revision joint replacement, ACL reconstruction, arthroscopy and rehabilitation planning.",
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
        body: "Paediatric cardiology and cardiac surgery, oncology, neurosurgery and related children’s services. A specialist should assess whether international travel is medically appropriate before the family makes arrangements.",
        href: "/treatments/ventricular-septal-defect-surgery-in-india",
        hrefLabel: "VSD surgery in India",
        specialty: "Pediatric Cardiac Surgery",
      },
      {
        title: "Organ Transplantation",
        body: "Kidney and bone-marrow programmes are highly regulated. Donor eligibility, relationship requirements, documentation and legal approvals must be confirmed before travel. A quotation alone does not establish transplant eligibility.",
        href: "/treatments/bone-marrow-transplant-in-india",
        hrefLabel: "Bone marrow transplant in India",
        specialty: "Hematology",
      },
      {
        title: "IVF & Fertility",
        body: "Ugandan couples may explore IVF, ICSI, IUI and related fertility evaluation in India. GAF does not yet publish a dedicated IVF page. Eligibility, laboratory procedures and applicable Indian regulations should be confirmed with the treating fertility centre before travel.",
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
          { label: "Cervical Cancer", href: "/treatments/cervical-cancer-treatment-in-india" },
          { label: "Breast Cancer", href: "/treatments/breast-cancer-treatment-in-india" },
          { label: "Prostate Cancer", href: "/treatments/prostate-cancer-treatment-in-india" },
          { label: "Colon Cancer", href: "/treatments/colon-cancer-treatment-in-india" },
          { label: "Ovarian Cancer", href: "/treatments/ovarian-cancer-treatment-in-india" },
          { label: "Pancreatic Cancer", href: "/treatments/pancreatic-cancer-treatment-in-india" },
          { label: "Brain Tumour", href: "/treatments/brain-tumor-surgery-in-india" },
          { label: "Leukaemia", href: "/treatments/leukemia-treatment-in-india" },
          { label: "Lymphoma", href: "/treatments/lymphoma-treatment-in-india" },
          { label: "Kaposi Sarcoma", href: "" },
          { label: "Oesophageal Cancer", href: "" },
          { label: "Liver Cancer", href: "" },
          { label: "Stomach Cancer", href: "" },
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
    heading: "Cancer Treatment in India for Ugandan Patients",
    intro:
      "Cancer is one of the most important treatment areas for Ugandan patients seeking specialised healthcare. According to the IARC GLOBOCAN 2024 Uganda fact sheet, the country had an estimated 29,966 new cancer cases, 18,205 cancer deaths and 59,662 five-year prevalent cases. These are GLOBOCAN 2024 estimates, not current 2026 case counts, and they should not be interpreted as an individual's diagnosis or prognosis.",
    body: "The same official fact sheet ranks cervix uteri first among estimated new cases in both sexes (5,164; 17.2%), followed by breast (3,308; 11.0%), prostate (2,537; 8.5%), oesophagus (2,186; 7.3%) and colorectum (1,784; 6.0%). Among Ugandan women, cervical cancer was the leading site (5,164; 28.3%), followed by breast. Among Ugandan men, prostate cancer was the leading site (2,537; 21.7%), followed by oesophagus and Kaposi sarcoma. GAF does not yet publish dedicated Kaposi, oesophageal-cancer or liver-cancer pages; those cases are coordinated through the relevant oncology team after records review.",
    modalities: [
      { label: "Cervical Cancer", href: "/treatments/cervical-cancer-treatment-in-india" },
      { label: "Breast Cancer", href: "/treatments/breast-cancer-treatment-in-india" },
      { label: "Prostate Cancer", href: "/treatments/prostate-cancer-treatment-in-india" },
      { label: "Colon Cancer", href: "/treatments/colon-cancer-treatment-in-india" },
      { label: "Ovarian Cancer", href: "/treatments/ovarian-cancer-treatment-in-india" },
      { label: "Leukaemia", href: "/treatments/leukemia-treatment-in-india" },
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
    heading: "How Much Does Medical Treatment in India Cost for Ugandan Patients?",
    intro:
      "There is no universal treatment price for Ugandan patients. Two patients undergoing the same named procedure can have very different clinical requirements. GAF Healthcare presents costs as USD planning estimates from the live catalogue, not hospital quotations.",
    factors: [
      "Diagnosis, disease stage and treatment plan",
      "Hospital, specialist, room category and ICU charges",
      "Medicines, implants and diagnostic investigations",
      "Hospitalisation, rehabilitation and complications",
      "Follow-up and additional procedures",
    ],
    tableIntro:
      "The ranges below are GAF Healthcare planning figures from the live cost catalogue. They are not hospital quotations. Ask the hospital which items are included.",
    disclaimer:
      "An estimate obtained before travel should be considered a planning figure unless it is explicitly issued as a final quotation by the hospital. The final amount may change after physical examination, additional investigations, changes in treatment plan, medicines, implants, ICU care, complications or longer hospitalization.",
    ctaLabel: "Get a treatment-cost review on WhatsApp",
  },
  extraBudget: {
    heading: "Why Do Medical Costs Differ Between Indian Hospitals?",
    intro:
      "Two hospitals can provide different quotations for the same procedure. A lower headline quotation does not necessarily mean a lower total expenditure. Patients should compare the complete treatment plan, doctor, hospital, inclusions and exclusions.",
    items: [
      "Hospital infrastructure, doctor fees, room category and ICU charges",
      "Implant selection, medicines and diagnostic testing",
      "Flights, visa fees, accommodation, food and local transportation",
      "Additional investigations, blood products and extended hospitalisation",
      "Complication-related treatment and follow-up consultations",
    ],
    close:
      "Ask the hospital or coordinator which items are included in the treatment estimate. Comparing the scope of the quotation is more meaningful than comparing only the headline number.",
  },
  cities: {
    heading: "Which Indian Cities Can Ugandan Patients Consider?",
    intro:
      "The appropriate city depends on the medical condition and treatment. There is no single Indian city that is appropriate for every Ugandan patient.",
    items: [
      {
        name: "Delhi NCR",
        body: "Delhi, Gurugram and the wider National Capital Region offer extensive tertiary and super-specialty healthcare across oncology, cardiology, cardiac surgery, neurosurgery, orthopaedics, urology, gastroenterology and transplantation.",
        city: "Delhi NCR",
        catalog: true,
      },
      {
        name: "Mumbai",
        body: "Major hospitals and specialist centres covering oncology, cardiac care, neurosciences, orthopaedics, gastroenterology and transplantation.",
        city: "Mumbai",
        catalog: true,
      },
      {
        name: "Chennai",
        body: "An established healthcare ecosystem covering cardiology, oncology, neurosurgery, orthopaedics, transplantation and gastroenterology.",
        city: "Chennai",
        catalog: true,
      },
      {
        name: "Hyderabad",
        body: "Tertiary-care services in oncology, cardiology, neurosurgery, transplantation, orthopaedics and urology.",
        city: "Hyderabad",
        catalog: true,
      },
      {
        name: "Bengaluru",
        body: "Multispecialty and super-specialty services including oncology, cardiology, neurosciences, orthopaedics, urology and fertility.",
        city: "Bengaluru",
        catalog: true,
      },
      {
        name: "Pune",
        body: "Pune has a significant multispecialty healthcare ecosystem and can be considered for selected treatments. GAF’s live city catalogue does not yet include Pune, so this page does not link to a Pune directory.",
        city: "Pune",
        catalog: false,
      },
    ],
  },
  hospitals: {
    heading: "How Should Ugandan Patients Choose an Indian Hospital?",
    intro:
      "Start with the diagnosis. Ask whether the hospital treats the specific disease, whether the required specialty and surgeon or oncologist are available, whether ICU and advanced diagnostics are in place, whether international-patient services exist, whether the quotation is transparent, and what follow-up arrangements are available. The campuses below are drawn from GAF’s live India catalogue, one from each published city.",
    directoryLabel: "Browse hospitals in India",
  },
  doctors: {
    heading: "How Should Ugandan Patients Choose the Right Doctor?",
    intro:
      "The doctor should be matched to the patient's diagnosis and procedure. A useful structure is specialty, subspecialty, procedure, city, hospital and then doctor. The specialists below are taken from GAF’s live doctor catalogue.",
    directoryLabel: "Browse doctors in India",
  },
  visa: {
    heading: "Indian e-Medical Visa for Ugandan Patients",
    intro:
      "Uganda is currently listed among the countries eligible for India's e-Visa system. Medical treatment is an eligible purpose. The official portal provides e-Medical and e-Medical Attendant categories. The High Commission of India in Kampala currently states that online application for e-Visa and regular visa services was enabled with effect from 10 September 2026 for Ugandan nationals and other foreigners residing in Uganda.",
    points: [
      "Eligible applicants can apply online. The current official portal states that e-Medical and e-Medical Attendant applications may be submitted at least four days before arrival, with an arrival-date selection window of up to 120 days.",
      "The official e-Visa fee list currently shows Uganda at US$80 for the e-Visa service. A bank charge is stated on the official portal. Confirm the live amount before payment.",
      "The current official guidance states that up to two e-Medical Attendant Visas can be issued against one e-Medical Visa.",
      "The current official portal lists e-Medical and e-Medical Attendant visas with one-year validity from the date of arrival and multiple entries. Confirm the live category notes before applying.",
      "An e-Medical Visa application requires the documents specified by the Government of India, including a passport bio page, a recent photograph, sufficient funds, a return or onward ticket, and an Indian hospital letter on letterhead that identifies the patient's name, nationality, passport number and the tentative admission or treatment date.",
      "Some patients may still need India's regular Medical Visa through the High Commission of India in Kampala. The Mission is concurrently accredited to Burundi. Confirm the live instructions before submitting documents.",
      "Do not use a third-party e-Visa website. The official e-Visa fee list is the eligibility gate.",
    ],
    disclaimer:
      "Visa rules, fees, documents and entry regulations can change. Verify the current official Indian e-Visa portal and the High Commission of India in Kampala immediately before applying or travelling.",
    documentsHeading: "Documents for an Indian e-Medical Visa or regular Medical Visa from Uganda",
    documents: [
      "Passport with at least six months’ validity and two blank pages",
      "Recent photograph and passport bio page",
      "Indian hospital letter with tentative admission or treatment date for an e-Medical Visa",
      "Return or onward ticket and proof of sufficient funds",
      "Yellow-fever vaccination certificate, because Uganda is listed among yellow-fever endemic countries on India's IHR guidance",
      "Attendant passports and documents where a family member will travel",
    ],
    documentsNote:
      "Patients should determine which visa route applies to their circumstances rather than submitting documents based on an outdated third-party checklist. e-Visa enquiries should be made on the official Government of India portal.",
  },
  yellowFever: {
    heading: "Yellow Fever Requirements for Ugandan Travellers",
    intro:
      "Uganda is listed among yellow-fever endemic countries on India's IHR points-of-entry guidance. Travellers arriving from endemic countries are generally required to carry a valid yellow-fever vaccination certificate issued by an authorised centre.",
    points: [
      "India's IHR guidance states that the certificate becomes valid 10 days after vaccination. Travellers without a valid original certificate, or with a certificate that is not yet valid, may be quarantined for up to six days on arrival.",
      "Carry the original certificate during travel. Photocopies or digital copies can be treated as insufficient at the border.",
      "HCI Kampala currently publishes visa and e-Visa notes for applicants in Uganda. Confirm any additional Mission-specific health-entry documents before departure.",
      "Requirements can change according to connecting airports and current public-health regulations.",
    ],
    close:
      "Confirm the current requirement on the official Indian e-Visa portal, the Bureau of Immigration, India's IHR yellow-fever list and the High Commission of India in Kampala before travel.",
  },
  travel: {
    heading: "Travelling from Uganda to India for Medical Treatment",
    intro:
      "For many Ugandan patients, the international medical journey begins in Kampala and continues through Entebbe International Airport. Patients may also travel from Jinja, Mbarara, Gulu, Mbale or other cities.",
    points: [
      "The hospital city should be selected according to the patient's treatment requirement. The flight should then be planned around the confirmed hospital appointment.",
      "Patients with significant medical conditions should ask their treating doctor whether they are medically fit for commercial air travel.",
      "It is generally better to confirm the medical opinion, specialist, hospital, proposed treatment and visa before booking a fixed return ticket.",
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
    heading: "Documents Ugandan Patients Should Prepare",
    intro:
      "A complete medical file can make the initial specialist review more useful. Not every patient needs every document. The treating hospital can advise which records are essential.",
    general: [
      "Passport copy, medical summary, diagnosis and blood-test reports",
      "Imaging reports, previous prescriptions, discharge summaries and operation reports",
      "Current medication list",
    ],
    cancer: [
      "Biopsy, histopathology, immunohistochemistry and molecular testing where available",
      "CT, MRI and PET-CT images as well as reports",
      "Previous chemotherapy, radiation and surgical notes",
    ],
    cardiac: [
      "ECG, echocardiography and coronary angiography",
      "CT coronary angiography and stress-test reports where available",
      "Previous cardiac procedures and current medicines",
    ],
    ortho: [
      "X-rays, MRI and CT",
      "Previous surgery reports and physiotherapy records",
    ],
    cancerNote:
      "If pathology slides or tissue blocks are available, the receiving cancer centre can advise whether they should be brought for review.",
  },
  living: {
    heading: "Accommodation, Food and Language for Ugandan Patients",
    intro:
      "International patients may need accommodation close to the treating hospital. For patients receiving repeated chemotherapy or radiation therapy, staying close to the hospital can be particularly practical. For patients recovering from major surgery, accessibility and proximity to medical care may be more important than the accommodation's tourist location.",
    accommodation: [
      "Hotels, serviced apartments, long-stay apartments or hospital guest accommodation",
      "Distance from the hospital, lift access and wheelchair accessibility",
      "Attendant accommodation, kitchen facilities, pharmacy and grocery access",
    ],
    accommodationNote:
      "For patients undergoing repeated chemotherapy or radiation therapy, staying near the hospital may reduce daily travel.",
    food: "Before travelling, discuss low-salt, diabetic, high-protein, post-operative, vegetarian, religious or allergy-related dietary needs with the treating hospital. Patients undergoing cancer treatment or recovering from surgery should follow the dietary plan provided by their treating team.",
    language:
      "English is an official language of Uganda, and Luganda is widely spoken. Indian hospitals generally use English for medical documentation and specialist consultations. Interpretation can be arranged where needed. Patients should never sign medical consent documentation they do not understand.",
  },
  stay: {
    heading: "How Long Will a Ugandan Patient Need to Stay in India?",
    intro:
      "There is no standard treatment duration. A consultation may require a short stay. Major surgery, cancer treatment, transplantation and rehabilitation may require several weeks or longer. Ask the hospital for an estimated treatment timeline before booking the return flight.",
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
    heading: "Step-by-Step Medical Treatment Journey",
    intro:
      "If you are considering treatment in India, begin with your medical records rather than your flight booking. A records-first sequence allows many questions to be addressed before leaving Kampala or Entebbe.",
    steps: [
      { title: "Share medical records", body: "Send the relevant reports and a concise medical history." },
      { title: "Get an Indian specialist opinion", body: "The appropriate specialist reviews the available records. A remote opinion does not replace an in-person examination." },
      { title: "Understand treatment options", body: "Discuss the proposed treatment, alternatives and expected timeline." },
      { title: "Select the hospital and doctor", body: "Choose according to the medical requirement." },
      { title: "Receive hospital confirmation", body: "The hospital confirms the consultation or treatment pathway." },
      { title: "Obtain a cost estimate", body: "Request a written estimate showing major inclusions and exclusions." },
      { title: "Apply for the Indian Medical Visa", body: "Use the current official e-Medical Visa process, or the regular Medical Visa through the High Commission of India in Kampala if that route applies." },
      { title: "Arrange travel", body: "Plan flights, accommodation and local transportation around the confirmed hospital schedule." },
      { title: "Arrive in India", body: "Proceed to the hospital for consultation and evaluation." },
      { title: "Complete investigations and begin treatment", body: "The treating team may repeat or update diagnostic tests before confirming the final plan." },
      { title: "Recovery and discharge", body: "The hospital provides medication and follow-up instructions." },
      { title: "Return to Uganda and continue follow-up", body: "Travel home when medically fit and maintain follow-up with the Indian treating team and local healthcare professionals." },
    ],
  },
  help: {
    heading: "How GAF Healthcare Can Support Ugandan Patients",
    intro:
      "GAF Healthcare can coordinate the medical journey between Uganda and India. The exact services available should be confirmed before travel. Medical decisions remain with the patient and treating medical professionals.",
    before: [
      "Medical-record collection and specialist matching",
      "Hospital coordination and second-opinion coordination",
      "Treatment-cost requests and appointment coordination",
      "Medical Visa guidance and travel planning",
    ],
    during: [
      "Airport and hospital coordination",
      "Communication support during consultations and discharge where available",
      "Patient and family communication during treatment",
    ],
    after: [
      "Discharge coordination and medical-document collection",
      "Follow-up communication with the treating hospital",
      "Return-travel planning when the doctor clears travel",
    ],
    note: "GAF Healthcare's role is to help patients understand and coordinate their options rather than make the clinical decision for them. Visa approval remains subject to the Government of India's rules and decision.",
  },
  opinion: {
    heading: "Can Ugandan Patients Get a Second Medical Opinion from India?",
    intro:
      "Yes. Patients can often share their medical records with an Indian specialist before deciding to travel. A second opinion can be useful before major cancer, cardiac, brain or spine surgery, joint replacement, organ transplantation, long-term chemotherapy, radiation therapy or complex fertility treatment.",
    questions: [
      "What is the diagnosis, and what treatment is recommended?",
      "Why is this treatment recommended, and are there alternatives?",
      "Who will perform the procedure, and how long should the patient remain in India?",
      "What does the quotation include and exclude, including medicines, implants and ICU charges?",
      "What happens if complications occur, and what follow-up is required?",
      "How will consent and discharge instructions be explained, and what documents are required for the Indian Medical Visa?",
    ],
    close:
      "A second opinion should not unnecessarily delay urgent treatment. International treatment is not automatically appropriate when the patient is medically unstable, cannot safely fly, or when appropriate treatment is already available locally.",
  },
  choose: {
    heading: "How to Choose a Hospital and Doctor in India",
    intro:
      "The hospital should be selected around the patient's condition. Complex cases may require a subspecialist. Patients should understand the proposed treatment and its purpose.",
    hospital: [
      "Does the hospital treat this condition regularly, and is the right specialist available?",
      "Does the hospital have the required ICU, diagnostic and international-patient infrastructure?",
      "What does the quotation include, and what happens if additional treatment is required?",
      "What happens after returning to Uganda?",
    ],
    specialist: [
      "Cervical cancer → gynaecologic oncologist, medical oncologist, radiation oncologist",
      "Breast cancer → breast or surgical oncologist, medical oncologist, radiation oncologist",
      "Prostate cancer → urologist or uro-oncologist, radiation oncologist, medical oncologist where required",
      "Heart disease → cardiologist, interventional cardiologist, cardiac surgeon where required",
    ],
  },
  faqHeading: "Frequently Asked Questions",
  faqs: [
    {
      q: "Can Ugandan patients get medical treatment in India?",
      a: "Yes. Ugandan citizens can seek medical treatment in India using the applicable Indian Medical Visa or e-Medical Visa route. Uganda is currently included in India's e-Visa eligible-country list.",
    },
    {
      q: "Can Ugandan citizens apply for an Indian e-Medical Visa?",
      a: "Yes. Uganda is currently listed among the nationalities eligible for India's e-Visa services, which include e-Medical Visas. The official fee list currently shows Uganda at US$80.",
    },
    {
      q: "How early can Ugandan patients apply for an e-Medical Visa?",
      a: "The current official e-Visa guidance states that applicants for e-Medical and e-Medical Attendant Visas can apply online at least four days before arrival, within a 120-day application window.",
    },
    {
      q: "How long is the Indian e-Medical Visa valid?",
      a: "The current official portal describes the e-Medical Visa as valid for one year from arrival in India with multiple entries. Confirm the live category notes before applying.",
    },
    {
      q: "Can a family member accompany a Ugandan patient?",
      a: "Yes. The Indian e-Visa system provides an e-Medical Attendant Visa, with up to two e-Medical Attendant Visas granted against one e-Medical Visa.",
    },
    {
      q: "Do Ugandan patients need a yellow-fever certificate?",
      a: "Yes. Uganda is listed among yellow-fever endemic countries on India's IHR points-of-entry guidance. Travellers arriving from endemic countries are generally required to carry a valid original yellow-fever vaccination certificate.",
    },
    {
      q: "Has the High Commission of India in Kampala enabled online visa applications?",
      a: "The High Commission currently states that online application for e-Visa and regular visa services was enabled with effect from 10 September 2026 for Ugandan nationals and other foreigners residing in Uganda. Confirm the live note before applying.",
    },
    {
      q: "How much does medical treatment in India cost for Ugandan patients?",
      a: "There is no fixed price. Cost depends on diagnosis, treatment, hospital, specialist, medicines, investigations, implants, ICU care and length of stay. GAF presents USD planning estimates, not guaranteed hospital quotations.",
    },
    {
      q: "Which cancers are common in Uganda?",
      a: "GLOBOCAN 2024 estimates 29,966 new cancer cases and 18,205 cancer deaths in Uganda. The leading sites by estimated new cases among both sexes were cervix, breast, prostate, oesophagus and colorectum. These are population-level estimates, not an individual diagnosis.",
    },
    {
      q: "Can I get a treatment estimate before travelling from Uganda?",
      a: "Yes. Medical records can be submitted for preliminary specialist review and an indicative hospital estimate can be requested.",
    },
    {
      q: "Can I send my medical reports from Kampala?",
      a: "Yes. Patients from Kampala, Entebbe, Jinja, Mbarara, Gulu, Mbale and other parts of Uganda can share records before travel.",
    },
    {
      q: "Can patients from other parts of Uganda travel to India?",
      a: "Yes. Patients from Entebbe, Jinja, Mbarara, Mbale, Gulu and other regions can use the same medical-treatment pathway, subject to applicable travel and visa requirements.",
    },
    {
      q: "Can I get a second opinion from an Indian specialist?",
      a: "Yes. Medical records can be shared with an appropriate Indian specialist for preliminary second-opinion review before travel. A remote opinion does not replace an in-person examination when one is clinically necessary.",
    },
    {
      q: "Which Indian cities can Ugandan patients consider?",
      a: "Delhi NCR, Mumbai, Chennai, Hyderabad and Bengaluru are live GAF catalogue cities. Pune can also be considered, but this page does not link to a Pune directory because that city is not yet in the live catalogue.",
    },
    {
      q: "How long should I stay in India?",
      a: "The duration depends on the treatment. Major surgery, cancer treatment and transplantation can require several weeks or longer.",
    },
    {
      q: "Does India have an existing healthcare relationship with Uganda?",
      a: "Yes. Official MEA records include the Mulago Hospital telemedicine centre connected to 11 Indian hospitals, a radiotherapy machine commissioned at Mulago in February 2020, and e-VBAB / e-Vidya Bharati activity including a Makerere University learning centre.",
    },
    {
      q: "Can Ugandan patients get heart surgery in India?",
      a: "Yes. Indian cardiac centres provide procedures including angioplasty, CABG, valve surgery, electrophysiology and other cardiac treatments, subject to specialist assessment.",
    },
    {
      q: "Can Ugandan patients get IVF treatment in India?",
      a: "Yes. Indian fertility centres provide IVF, ICSI, IUI, embryo-transfer procedures and other fertility services subject to medical and applicable legal requirements. GAF does not yet publish a dedicated IVF page.",
    },
    {
      q: "Is India right for every Ugandan patient?",
      a: "No. International treatment is not automatically appropriate when the patient is medically unstable, cannot safely fly, needs immediate local treatment, or when the expected benefit does not justify the burden of travel.",
    },
    {
      q: "Does insurance cover treatment in India?",
      a: "Coverage depends on the patient's policy. Confirm whether planned treatment abroad, India, surgery, cancer treatment, medicines, emergency care and medical evacuation are covered, and obtain written confirmation where possible.",
    },
    {
      q: "Is the hospital estimate final?",
      a: "Not necessarily. A preliminary estimate is based on the information available before treatment. The final plan and cost can change after examination and investigation in India.",
    },
    {
      q: "Do Ugandan patients need interpretation in India?",
      a: "Not necessarily. English is an official language of Uganda and is widely used in Indian hospitals. Luganda interpretation can be arranged where needed.",
    },
  ],
  finalCta: {
    heading: "Start Your Medical Treatment Journey from Uganda to India",
    body: "If you or a family member in Uganda is considering treatment in India, the most useful first step is to share the patient's medical information. Send the diagnosis, medical reports, scans and previous treatment records to GAF Healthcare.",
    primary: "Get a Medical Opinion",
    secondary: "Talk to a Medical Travel Expert",
    whatsappLabel: "WhatsApp +91 90443 46292",
    steps: "Share your medical records → Get a specialist opinion → Review hospital and treatment options → Plan your journey to India",
  },
  disclaimer: {
    heading: "Medical Disclaimer",
    body: "This page is intended for general education and medical-travel planning. It does not replace advice from a qualified healthcare professional. Cancer statistics are population-level estimates and cannot determine an individual's diagnosis or prognosis. Treatment costs are indicative and can change. Visa requirements, fees, documentation and immigration regulations can change. Ugandan patients should verify the latest requirements on the official Government of India e-Visa portal before travelling.",
  },
  sources: {
    heading: "Sources",
    items: [
      {
        label: "Government of India — Official e-Visa portal",
        href: UGANDA_OFFICIAL_LINKS.eVisa,
        detail: "Current e-Visa categories, including e-Medical and e-Medical Attendant.",
      },
      {
        label: "Government of India — Country/territory-wise e-Visa fee list",
        href: UGANDA_OFFICIAL_LINKS.eVisaFees,
        detail: "Official fee table used as the eligibility gate. Uganda is listed at US$80.",
      },
      {
        label: "High Commission of India, Kampala",
        href: UGANDA_OFFICIAL_LINKS.embassy,
        detail: "Indian High Commission in Kampala, concurrently accredited to Burundi. Currently notes that online e-Visa and regular visa applications were enabled from 10 September 2026.",
      },
      {
        label: "High Commission of India, Kampala — e-Visa",
        href: UGANDA_OFFICIAL_LINKS.embassyEvisa,
        detail: "Mission e-Visa page. Confirm the live instructions before applying.",
      },
      {
        label: "Ministry of External Affairs, India — India–Uganda bilateral brief",
        href: UGANDA_OFFICIAL_LINKS.meaBrief,
        detail: "Mulago telemedicine centre, radiotherapy machine at Mulago in February 2020, and e-VBAB / Makerere learning-centre context.",
      },
      {
        label: "IARC / WHO — GLOBOCAN 2024 Uganda fact sheet",
        href: UGANDA_OFFICIAL_LINKS.globocan,
        detail: "Estimated 29,966 new cases, 18,205 deaths and 59,662 five-year prevalent cases, with cervix, breast, prostate, oesophagus and colorectum as leading sites.",
      },
      {
        label: "WHO — Uganda health data overview",
        href: UGANDA_OFFICIAL_LINKS.whoData,
        detail: "Country-level WHO health information and health-system indicators.",
      },
      {
        label: "Ministry of Health and Family Welfare, India — IHR yellow-fever vaccination",
        href: UGANDA_OFFICIAL_LINKS.mohfwYellowFever,
        detail: "India’s yellow-fever endemic-country list. Uganda is listed as an endemic country of departure.",
      },
      {
        label: "Government of India — Bureau of Immigration",
        href: UGANDA_OFFICIAL_LINKS.boi,
        detail: "Entry and immigration instructions for travellers arriving in India.",
      },
    ],
  },
};
