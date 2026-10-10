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

export const RWANDA_PAGE_PATH = "/rwanda/treatment-in-india";
export const RWANDA_PAGE_LOCALES = ["en"] as const;
export const RWANDA_LAST_REVIEWED = "2026-10-03";

export type RwandaPageCopy = typeof rwandaPageCopyEn;

export function rwandaPageCopy(_locale: AppLocale): RwandaPageCopy {
  return rwandaPageCopyEn;
}

const INDIA = "India";

export const RWANDA_OFFICIAL_LINKS = {
  eVisa: "https://indianvisaonline.gov.in/evisa/tvoa.html",
  eVisaHome: "https://indianvisaonline.gov.in/evisa/",
  eVisaFees: "https://indianvisaonline.gov.in/evisa/eTV_revised_fee_final.pdf",
  visaOnline: "https://indianvisaonline.gov.in/visa/",
  embassy: "https://hcikigali.gov.in/",
  embassyVisa: "https://hcikigali.gov.in/visa.php",
  embassyEvisa: "https://hcikigali.gov.in/etourist-visa.php",
  embassyFees: "https://hcikigali.gov.in/visa-fee.php",
  meaBrief: "https://www.mea.gov.in/Portal/ForeignRelation/India-Rwanda26.pdf",
  globocan: "https://gco.iarc.who.int/media/globocan/factsheets/populations/646-rwanda-fact-sheet.pdf",
  iarcToday: "https://gco.iarc.who.int/today/en/fact-sheets-populations",
  whoData: "https://data.who.int/countries/646",
  mohfwYellowFever: "https://ihpoe.mohfw.gov.in/vaccination.php",
  boi: "https://boi.gov.in",
} as const;

export const RWANDA_CURATED_TREATMENT_SLUGS = [
  "prostate-cancer-treatment-in-india",
  "breast-cancer-treatment-in-india",
  "cervical-cancer-treatment-in-india",
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

export const RWANDA_CANCER_TREATMENT_SLUGS = TANZANIA_CANCER_TREATMENT_SLUGS;

export const RWANDA_COST_PROCEDURE_NAMES = [
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

export const RWANDA_DOCTOR_SPECIALTY_SLUGS = [
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

export function resolveRwandaCostRows(catalog: Treatment[]) {
  return RWANDA_COST_PROCEDURE_NAMES.map((name) => {
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

export function rwandaDoctors(doctors: Doctor[]) {
  return RWANDA_DOCTOR_SPECIALTY_SLUGS.map((specialtySlug) => {
    const pool = doctors.filter((doctor) => doctor.specialtySlug === specialtySlug);
    const featured = pool.find((doctor) => doctor.featured);
    return featured ?? [...pool].sort((a, b) => a.name.localeCompare(b.name))[0];
  }).filter((row): row is Doctor => Boolean(row));
}

export const rwandaPageCopyEn = {
  seo: {
    title: "Medical Treatment in India for Rwandan Patients",
    description:
      "Explore medical treatment in India for Rwandan patients. Find specialist doctors, hospitals, treatments, indicative costs, e-Medical Visa guidance and support from GAF Healthcare.",
    keywords: [
      "medical treatment in India for Rwandan patients",
      "medical treatment in India from Rwanda",
      "treatment in India for Rwandan patients",
      "medical tourism from Rwanda to India",
      "India medical treatment for Rwandan patients",
      "Indian hospitals for Rwandan patients",
      "Indian doctors for Rwandan patients",
      "medical treatment cost in India for Rwandan patients",
      "cancer treatment in India for Rwandan patients",
      "cardiac treatment in India for Rwandan patients",
      "heart surgery in India for Rwandan patients",
      "neurosurgery in India for Rwandan patients",
      "orthopaedic treatment in India for Rwandan patients",
      "IVF in India for Rwandan patients",
      "e-Medical Visa India for Rwandan citizens",
      "Indian Medical Visa for Rwandan patients",
      "medical visa India from Rwanda",
      "treatment in India from Kigali",
      "medical treatment from Kigali to India",
      "medical tourism India Rwanda",
      "healthcare India for Rwandan patients",
      "prostate cancer treatment India from Rwanda",
      "cervical cancer treatment India from Rwanda",
      "breast cancer treatment India from Rwanda",
      "cancer hospital India for Rwandan patients",
    ],
  },
  breadcrumb: {
    home: "Home",
    rwanda: "Rwanda",
    page: "Treatment in India",
  },
  hero: {
    eyebrow: "Medical treatment in India for Rwandan patients",
    h1: "Medical Treatment in India for Rwandan Patients",
    lede:
      "For a patient travelling from Rwanda, choosing treatment abroad involves more than selecting a hospital. GAF Healthcare helps Rwandan patients connect records from Kigali, Huye, Musanze, Rubavu, Muhanga and other districts with an appropriate Indian specialist and hospital, then plan the visa, travel and follow-up around that medical requirement.",
    primaryCta: "Get a Medical Opinion",
    secondaryCta: "Explore Treatments",
    whatsappLabel: "WhatsApp +91 90443 46292",
  },
  quickAnswer: {
    heading: "Quick Answer: Medical Treatment in India for Rwandan Patients",
    items: [
      {
        question: "Can Rwandan patients travel to India for medical treatment?",
        answer:
          "Yes. Rwandan citizens can travel to India for medical treatment using the applicable Indian visa route.",
      },
      {
        question: "Can Rwandan citizens apply for an Indian e-Medical Visa?",
        answer:
          "Yes. Rwanda is currently included in India's e-Visa eligible-country list, and medical treatment is an eligible purpose under India's e-Visa system.",
      },
      {
        question: "What treatments can Rwandan patients receive in India?",
        answer:
          "Depending on the diagnosis, patients can seek cancer treatment, cardiac care, neurosurgery, orthopaedic surgery, urology, gastrointestinal treatment, fertility treatment, paediatric care, kidney treatment and transplantation, among other specialties.",
      },
      {
        question: "How much does medical treatment in India cost for Rwandan patients?",
        answer:
          "There is no single price. Treatment cost depends on the diagnosis, hospital, specialist, procedure, medicines, investigations, implants, ICU requirements and duration of hospitalisation.",
      },
      {
        question: "Can a Rwandan patient obtain a medical opinion before travelling?",
        answer:
          "Yes. Medical records, scans and previous treatment reports can be shared for preliminary specialist review.",
      },
      {
        question: "What language should Rwandan patients expect in Indian hospitals?",
        answer:
          "English is commonly used for medical documentation and specialist communication in India. Rwanda's official languages include Kinyarwanda, English and French, so patients who are more comfortable in Kinyarwanda or French should establish interpretation arrangements before travelling.",
      },
    ],
  },
  why: {
    heading: "Why Rwandan Patients Consider Medical Treatment in India",
    intro:
      "International treatment is a major decision for a patient and family. The first question should not simply be which Indian hospital to choose. A more useful starting point is the diagnosis and which specialist should treat it.",
    points: [
      "A practical medical-travel pathway is diagnosis, specialty, subspecialty, treatment, doctor, hospital, cost, visa and then travel",
      "India has tertiary and quaternary hospitals covering cancer, cardiac care, neurosurgery, orthopaedics, urology, gastroenterology, fertility, paediatrics and selected transplantation",
      "Multidisciplinary assessment can be useful when surgery, oncology, diagnostics and rehabilitation need to be coordinated",
      "A second medical opinion can be requested from existing records before a flight is booked",
    ],
    close:
      "The appropriate hospital still depends on the individual patient's medical requirements. India should not automatically be considered appropriate for every patient.",
  },
  relationship: {
    heading: "India–Rwanda Healthcare Relationship",
    paragraphs: [
      "India and Rwanda have developed cooperation across healthcare, pharmaceuticals, education, capacity building and development assistance.",
      "India's Ministry of External Affairs records that medicines worth US$2 million were gifted to Rwanda in early 2019 to support the response to HIV/AIDS, Hepatitis B and Hepatitis C. India also provided 50,000 doses of COVISHIELD vaccine, which arrived at Kigali International Airport on 5 March 2021, and another batch of HIV/AIDS medicines on 5 October 2021 worth Rs.1.2 crore.",
      "In May 2024, India approved a US$1 million grant from the India-UN Development Partnership Fund for a Rwanda maternal-health project focused on midwifery development. The official brief records that the project was launched on 20 May 2025 by UNFPA, the Government of Rwanda and the High Commission of India in Kigali.",
      "These initiatives provide important context for the India–Rwanda healthcare relationship. They do not, however, determine which treatment is appropriate for an individual patient.",
    ],
  },
  context: {
    heading: "Rwanda's Healthcare System and Changing Disease Burden",
    intro:
      "Rwanda has made substantial progress in healthcare access and public health. The country's Health Sector Strategic Plan V for 2024/25–2028/29 focuses on strengthening the health workforce, modernising healthcare infrastructure, improving quality of care, health security, research and innovation, digitalisation and health financing. At the same time, Rwanda's health-sector planning identifies a growing burden of noncommunicable diseases, including diabetes, hypertension, stroke and cancer.",
    points: [
      "Rwanda uses Kinyarwanda, English and French in official contexts. Indian hospitals generally use English for medical records and specialist consultations, so interpretation should be arranged before travel when needed.",
      "Most international medical journeys begin at Kigali International Airport. Patients travelling from Huye, Musanze, Rubavu, Muhanga or other districts may first need to reach Kigali.",
      "For some patients, appropriate treatment is available within Rwanda. For others, international treatment may be considered when a particular subspecialist, advanced procedure, multidisciplinary service or second opinion is required.",
      "Patients should always provide their current medication list to the treating Indian specialist and should not independently change medicines because an equivalent-looking product is available.",
    ],
    close:
      "Country-level health indicators do not determine an individual's medical needs. The relevant question is: what is the patient's diagnosis, what treatment is appropriate, and can the patient safely travel for that treatment?",
  },
  overview: {
    heading: "What Medical Treatments Can Rwandan Patients Get in India?",
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
    heading: "Popular Medical Treatments for Rwandan Patients in India",
    intro:
      "Each card links only to a live GAF specialty or treatment page. Where GAF does not yet publish a dedicated page, the category is explained without an invented URL.",
    categories: [
      {
        title: "Cancer Treatment",
        body: "Medical, surgical and radiation oncology, including prostate, breast, cervical, colorectal and lymphoma pathways that already have GAF guides. Stomach-cancer and liver-cancer cases are coordinated after records review because dedicated pages are not yet published.",
        href: "/treatments/prostate-cancer-treatment-in-india",
        hrefLabel: "Prostate cancer treatment in India",
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
        body: "Rwandan couples may explore IVF, ICSI, IUI and related fertility evaluation in India. GAF does not yet publish a dedicated IVF page. Eligibility, laboratory procedures and applicable Indian regulations should be confirmed with the treating fertility centre before travel.",
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
          { label: "Prostate Cancer", href: "/treatments/prostate-cancer-treatment-in-india" },
          { label: "Breast Cancer", href: "/treatments/breast-cancer-treatment-in-india" },
          { label: "Cervical Cancer", href: "/treatments/cervical-cancer-treatment-in-india" },
          { label: "Colon Cancer", href: "/treatments/colon-cancer-treatment-in-india" },
          { label: "Ovarian Cancer", href: "/treatments/ovarian-cancer-treatment-in-india" },
          { label: "Pancreatic Cancer", href: "/treatments/pancreatic-cancer-treatment-in-india" },
          { label: "Brain Tumour", href: "/treatments/brain-tumor-surgery-in-india" },
          { label: "Leukaemia", href: "/treatments/leukemia-treatment-in-india" },
          { label: "Lymphoma", href: "/treatments/lymphoma-treatment-in-india" },
          { label: "Stomach Cancer", href: "" },
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
    heading: "Cancer Treatment in India for Rwandan Patients",
    intro:
      "Cancer is an important treatment category for Rwandan patients seeking specialised healthcare. According to the IARC GLOBOCAN 2024 Rwanda fact sheet, the country had an estimated 12,440 new cancer cases, 7,991 cancer deaths and 23,979 five-year prevalent cases. These are GLOBOCAN 2024 estimates, not current 2026 case counts, and they should not be interpreted as an individual's diagnosis or prognosis.",
    body: "The same official fact sheet ranks prostate first among estimated new cases in both sexes (1,856; 14.9%), followed by breast (1,684; 13.5%), cervix uteri (1,582; 12.7%), colorectum (925; 7.4%) and stomach (895; 7.2%). Among Rwandan men, prostate cancer was the leading site (1,856; 35.9%), followed by colorectum, liver, stomach and leukaemia. Among Rwandan women, breast cancer was the leading site (1,684; 23.2%), followed by cervix, colorectum, stomach and liver. GAF does not yet publish dedicated stomach-cancer or liver-cancer pages; those cases are coordinated through the relevant oncology team after records review.",
    modalities: [
      { label: "Prostate Cancer", href: "/treatments/prostate-cancer-treatment-in-india" },
      { label: "Breast Cancer", href: "/treatments/breast-cancer-treatment-in-india" },
      { label: "Cervical Cancer", href: "/treatments/cervical-cancer-treatment-in-india" },
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
    heading: "How Much Does Medical Treatment in India Cost for Rwandan Patients?",
    intro:
      "There is no universal treatment price for Rwandan patients. Two patients undergoing the same named procedure can have very different clinical requirements. GAF Healthcare presents costs as USD planning estimates from the live catalogue, not hospital quotations.",
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
    heading: "Which Indian Cities Can Rwandan Patients Consider?",
    intro:
      "The appropriate city depends on the medical condition and treatment. There is no single Indian city that is appropriate for every Rwandan patient.",
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
    heading: "How Should Rwandan Patients Choose an Indian Hospital?",
    intro:
      "Start with the diagnosis. Ask whether the hospital treats the specific disease, whether the required specialty and surgeon or oncologist are available, whether ICU and advanced diagnostics are in place, whether international-patient services exist, whether the quotation is transparent, and what follow-up arrangements are available. The campuses below are drawn from GAF’s live India catalogue, one from each published city.",
    directoryLabel: "Browse hospitals in India",
  },
  doctors: {
    heading: "How Should Rwandan Patients Choose the Right Doctor?",
    intro:
      "The doctor should be matched to the patient's diagnosis and procedure. A useful structure is specialty, subspecialty, procedure, city, hospital and then doctor. The specialists below are taken from GAF’s live doctor catalogue.",
    directoryLabel: "Browse doctors in India",
  },
  visa: {
    heading: "Indian e-Medical Visa for Rwandan Patients",
    intro:
      "Rwanda is currently listed among the countries eligible for India's e-Visa system. Medical treatment is an eligible purpose. The official portal provides e-Medical and e-Medical Attendant categories. The High Commission of India in Kigali currently publishes an e-Visa page listing those categories and directing applicants to the official Government of India portal.",
    points: [
      "Eligible applicants can apply online. The current official portal states that e-Medical and e-Medical Attendant applications may be submitted at least four days before arrival, with an arrival-date selection window of up to 120 days.",
      "The official e-Visa fee list currently shows Rwanda at US$80 for the e-Visa service. A bank charge is stated on the official portal. Confirm the live amount before payment.",
      "The current official guidance states that up to two e-Medical Attendant Visas can be issued against one e-Medical Visa.",
      "The current official portal lists e-Medical and e-Medical Attendant visas with one-year validity from the date of arrival and multiple entries. Confirm the live category notes before applying.",
      "An e-Medical Visa application requires the documents specified by the Government of India, including a passport bio page, a recent photograph, sufficient funds, a return or onward ticket, and an Indian hospital letter on letterhead that identifies the patient's name, nationality, passport number and the tentative admission or treatment date.",
      "Some patients may still need India's regular Medical Visa. The High Commission of India in Kigali currently lists Medical Visa documents and a 1000–1200 submission window on its visa page. The same Mission's homepage currently states that visa services will be rendered by the High Commission of India, Kampala till further notice. Confirm the live receiving Mission before applying.",
      "The High Commission visa-fee page currently lists MED and MED X visas at RWF 104,100 for up to six months and RWF 156,200 for six months to one year, plus a published Indian Community Welfare Fund charge of USD 3 / RWF 4,000 per service. Confirm the live schedule before payment. Do not apply the LDC Business & Employment gratis line to Medical visas. Do not use a third-party e-Visa website.",
    ],
    disclaimer:
      "Visa rules, fees, documents and entry regulations can change. Verify the current official Indian e-Visa portal and the High Commission of India in Kigali immediately before applying or travelling, including whether the Kampala-until-further-notice CPV note still applies.",
    documentsHeading: "Documents for an Indian e-Medical Visa or regular Medical Visa from Rwanda",
    documents: [
      "Passport with at least six months’ validity and two blank pages",
      "Recent photograph and passport bio page",
      "Indian hospital letter with tentative admission or treatment date for an e-Medical Visa",
      "Return or onward ticket and proof of sufficient funds",
      "For the regular Medical Visa currently listed by HCI Kigali: online form, two photographs, a local hospital or doctor letter recommending treatment in India, a recognised Indian hospital letter, an online invitation stating the name, passport number and nationality of the patient and attendants, a six-month bank statement or hospital payment receipt, full medical history, a referral, an invitation emailed from the hospital official email to cons.kigali@mea.gov.in, national ID and a yellow-fever card photocopy",
      "Attendant passports and documents where a family member will travel",
    ],
    documentsNote:
      "Patients should determine which visa route applies to their circumstances rather than submitting documents based on an outdated third-party checklist. Confirm whether the application is received in Kigali or Kampala on the live official pages.",
  },
  yellowFever: {
    heading: "Health-Entry Requirements for Travelling from Rwanda",
    intro:
      "Rwanda is not currently listed among yellow-fever endemic countries on India's IHR points-of-entry guidance. Do not treat Rwanda as an endemic country of departure.",
    points: [
      "The High Commission of India in Kigali currently still asks visitors to hold a valid yellow-fever certificate and asks for a yellow-fever card photocopy with Medical Visa applications. Confirm the live Mission notes before travel.",
      "Travellers who transit a yellow-fever endemic country on the way to India should check the live official notes, because transit history can change the requirement.",
      "Carry the passport, visa or e-Visa authorisation, hospital letter and any vaccination certificate requested by the live official notes.",
      "Do not rely on an old travel-forum checklist for vaccination or entry rules.",
    ],
    close:
      "Confirm the current requirement on the official Indian e-Visa portal, the Bureau of Immigration and the High Commission of India in Kigali before travel.",
  },
  travel: {
    heading: "Travelling from Rwanda to India for Medical Treatment",
    intro:
      "Most Rwandan patients beginning the medical journey will travel from Kigali. The principal international gateway is Kigali International Airport. Patients travelling from Huye, Musanze, Rubavu, Muhanga or other districts may first need to reach Kigali.",
    points: [
      "The hospital city should be selected according to the patient's treatment requirement. The flight should then be planned around the confirmed hospital appointment.",
      "Patients with significant medical conditions should ask their treating doctor whether they are medically fit for commercial air travel.",
      "It is generally better to confirm the medical opinion, specialist, hospital, proposed treatment and Medical Visa before booking a fixed return ticket.",
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
    heading: "Documents Rwandan Patients Should Prepare",
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
    heading: "Accommodation, Food and Language for Rwandan Patients",
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
      "Rwanda uses Kinyarwanda, English and French in official contexts. Indian hospitals generally use English for medical documentation and specialist consultations. Patients who are more comfortable in Kinyarwanda or French should establish interpretation arrangements before travelling. Patients should never sign medical consent documentation they do not understand.",
  },
  stay: {
    heading: "How Long Will a Rwandan Patient Need to Stay in India?",
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
      "If you are considering treatment in India, begin with your medical records rather than your flight booking. A records-first sequence allows many questions to be addressed before leaving Kigali.",
    steps: [
      { title: "Share medical records", body: "Send the relevant reports and a concise medical history." },
      { title: "Get an Indian specialist opinion", body: "The appropriate specialist reviews the available records. A remote opinion does not replace an in-person examination." },
      { title: "Understand treatment options", body: "Discuss the proposed treatment, alternatives and expected timeline." },
      { title: "Select the hospital and doctor", body: "Choose according to the medical requirement." },
      { title: "Receive hospital confirmation", body: "The hospital confirms the consultation or treatment pathway." },
      { title: "Obtain a cost estimate", body: "Request a written estimate showing major inclusions and exclusions." },
      { title: "Apply for the Indian Medical Visa", body: "Use the current official e-Medical Visa process, or the regular Medical Visa through the live receiving Mission. HCI Kigali currently notes that visa services are rendered by the High Commission of India, Kampala till further notice." },
      { title: "Arrange travel", body: "Plan flights, accommodation and local transportation around the confirmed hospital schedule." },
      { title: "Arrive in India", body: "Proceed to the hospital for consultation and evaluation." },
      { title: "Complete investigations and begin treatment", body: "The treating team may repeat or update diagnostic tests before confirming the final plan." },
      { title: "Recovery and discharge", body: "The hospital provides medication and follow-up instructions." },
      { title: "Return to Rwanda and continue follow-up", body: "Travel home when medically fit and maintain follow-up with the Indian treating team and local healthcare professionals." },
    ],
  },
  help: {
    heading: "How GAF Healthcare Can Support Rwandan Patients",
    intro:
      "GAF Healthcare can coordinate the medical journey between Rwanda and India. The exact services available should be confirmed before travel. Medical decisions remain with the patient and treating medical professionals.",
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
    heading: "Can Rwandan Patients Get a Second Medical Opinion from India?",
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
      "What happens after returning to Rwanda?",
    ],
    specialist: [
      "Prostate cancer → urologist or uro-oncologist, radiation oncologist, medical oncologist where required",
      "Breast cancer → breast or surgical oncologist, medical oncologist, radiation oncologist",
      "Cervical cancer → gynaecologic oncologist, medical oncologist, radiation oncologist",
      "Heart disease → cardiologist, interventional cardiologist, cardiac surgeon where required",
    ],
  },
  faqHeading: "Frequently Asked Questions",
  faqs: [
    {
      q: "Can Rwandan patients get medical treatment in India?",
      a: "Yes. Rwandan citizens can travel to India for medical treatment using the applicable Indian Medical Visa or e-Medical Visa process.",
    },
    {
      q: "Can Rwandan citizens apply for an Indian e-Medical Visa?",
      a: "Yes. Rwanda is currently included in India's e-Visa eligible-country list, and medical treatment is an eligible purpose.",
    },
    {
      q: "How early can Rwandan patients apply for an e-Medical Visa?",
      a: "The current Government of India guidance says eligible applicants can apply at least four days before arrival, with applications available up to 120 days before the proposed arrival date.",
    },
    {
      q: "What passport validity is required?",
      a: "The current Indian e-Visa guidance states that the passport should have at least six months' validity when applying and at least two blank pages for immigration stamping.",
    },
    {
      q: "What document is required from the Indian hospital?",
      a: "An e-Medical Visa application requires a letter from the Indian hospital on its letterhead containing the tentative admission or treatment date. The current guidance also specifies the patient's name, nationality and passport number.",
    },
    {
      q: "Can a family member accompany a Rwandan patient?",
      a: "Yes. India's e-Medical Attendant Visa is available for eligible attendants. The current official guidance states that up to two e-Medical Attendant Visas may be granted against one e-Medical Visa.",
    },
    {
      q: "Do some Rwandan patients still need a regular Medical Visa?",
      a: "Yes. Some circumstances still require the regular Medical Visa. The High Commission of India in Kigali currently lists Medical Visa documents and a 1000–1200 submission window, while its homepage currently states that visa services will be rendered by the High Commission of India, Kampala till further notice. Confirm the live receiving Mission before applying.",
    },
    {
      q: "What are the current High Commission Medical Visa fees for Rwanda?",
      a: "The HCI Kigali visa-fee page currently lists MED and MED X visas at RWF 104,100 for up to six months and RWF 156,200 for six months to one year, plus ICWF USD 3 / RWF 4,000 per service. Confirm the live schedule before payment. Do not apply the LDC Business & Employment gratis line to Medical visas.",
    },
    {
      q: "Which Mission currently processes regular Medical Visas for Rwanda?",
      a: "The High Commission of India in Kigali is the published Mission for Rwanda. Its homepage currently states that visa services will be rendered by the High Commission of India, Kampala till further notice, while visa.php still lists Medical Visa documents for this High Commission. Confirm the live receiving Mission before submitting documents.",
    },
    {
      q: "Do Rwandan patients need a Yellow Fever Vaccination Card?",
      a: "Rwanda is not currently listed among yellow-fever endemic countries on India's IHR points-of-entry guidance. The High Commission of India in Kigali currently still asks for a yellow-fever card photocopy with Medical Visa applications. Travellers who transit an endemic country should also check the live official notes.",
    },
    {
      q: "How much does medical treatment in India cost for Rwandan patients?",
      a: "There is no fixed price. Cost depends on diagnosis, treatment, hospital, specialist, medicines, investigations, implants, ICU requirements and duration of stay. GAF presents USD planning estimates, not guaranteed hospital quotations.",
    },
    {
      q: "What cancer treatments are available in India for Rwandan patients?",
      a: "Depending on diagnosis and stage, treatment may include surgery, chemotherapy, radiation therapy, immunotherapy, targeted therapy, hormone therapy, precision oncology and supportive care.",
    },
    {
      q: "Which cancers are common in Rwanda?",
      a: "GLOBOCAN 2024 estimates 12,440 new cancer cases and 7,991 cancer deaths in Rwanda. The leading sites by estimated new cases among both sexes were prostate, breast, cervix, colorectum and stomach. Among Rwandan women, breast cancer currently leads, followed by cervical cancer. These are population-level estimates, not an individual diagnosis.",
    },
    {
      q: "Can I get a treatment estimate before travelling from Rwanda?",
      a: "Yes. Medical records can be submitted for preliminary specialist review and an indicative hospital estimate can be requested.",
    },
    {
      q: "Can I get a second opinion from an Indian specialist?",
      a: "Yes. Medical records can be shared with an appropriate Indian specialist for preliminary second-opinion review before travel. A remote opinion does not replace an in-person examination when one is clinically necessary.",
    },
    {
      q: "Which Indian cities can Rwandan patients consider?",
      a: "Delhi NCR, Mumbai, Chennai, Hyderabad and Bengaluru are live GAF catalogue cities. Pune can also be considered, but this page does not link to a Pune directory because that city is not yet in the live catalogue.",
    },
    {
      q: "How long should I stay in India?",
      a: "The duration depends on treatment. Major surgery, cancer treatment, transplantation and rehabilitation may require several weeks or longer.",
    },
    {
      q: "Can patients from Kigali travel to India for treatment?",
      a: "Yes. Kigali International Airport is Rwanda's principal international gateway. Exact flight routes and schedules should be checked when travel is arranged.",
    },
    {
      q: "Can patients outside Kigali seek treatment in India?",
      a: "Yes. Patients from Huye, Musanze, Rubavu, Muhanga and other districts can use the same medical-treatment pathway, subject to applicable travel and visa requirements.",
    },
    {
      q: "Does India have an existing healthcare relationship with Rwanda?",
      a: "Yes. Official MEA records include medicines worth US$2 million gifted in early 2019 for HIV/AIDS, Hepatitis B and Hepatitis C programmes, 50,000 COVISHIELD vaccine doses that arrived in Kigali on 5 March 2021, a further HIV/AIDS medicines batch in October 2021, and a US$1 million India-UN Development Partnership Fund grant for midwifery development approved in May 2024.",
    },
    {
      q: "Does India have a High Commission in Rwanda?",
      a: "Yes. The High Commission of India in Kigali publishes visa, e-Visa and fee pages. Patients should also read the current homepage note that visa services will be rendered by the High Commission of India, Kampala till further notice.",
    },
    {
      q: "Do Rwandan patients need French or Kinyarwanda interpretation?",
      a: "Not necessarily, but it can be useful. Indian hospitals generally use English for medical documentation and consultations. Patients who are not comfortable with English should arrange appropriate Kinyarwanda or French interpretation before travelling.",
    },
    {
      q: "Can Rwandan patients get heart surgery in India?",
      a: "Yes. Indian cardiac centres provide procedures including angioplasty, CABG, valve surgery, electrophysiology and other cardiac treatments, subject to specialist assessment.",
    },
    {
      q: "Can Rwandan patients get IVF treatment in India?",
      a: "Yes. Indian fertility centres provide IVF, ICSI, IUI, embryo-transfer procedures and other fertility services subject to medical and applicable legal requirements. GAF does not yet publish a dedicated IVF page.",
    },
    {
      q: "Is India right for every Rwandan patient?",
      a: "No. International treatment is not automatically appropriate when the patient is medically unstable, cannot safely fly, needs immediate local treatment, or when the expected benefit does not justify the burden of travel.",
    },
    {
      q: "Does insurance cover treatment in India?",
      a: "Coverage depends on the patient's policy. Confirm whether planned treatment abroad, India, surgery, cancer treatment, medicines, emergency care and medical evacuation are covered, and obtain written confirmation where possible.",
    },
    {
      q: "Is the hospital estimate final?",
      a: "Not necessarily. A preliminary estimate is based on information available before treatment. The final plan and cost may change after examination and investigation in India.",
    },
  ],
  finalCta: {
    heading: "Start Your Medical Treatment Journey from Rwanda to India",
    body: "If you or a family member in Rwanda is considering treatment in India, the most useful first step is to share the patient's medical information. Send the diagnosis, medical reports, scans and previous treatment records to GAF Healthcare.",
    primary: "Get a Medical Opinion",
    secondary: "Talk to a Medical Travel Expert",
    whatsappLabel: "WhatsApp +91 90443 46292",
    steps: "Share your medical records → Get a specialist opinion → Review hospital and treatment options → Plan your journey to India",
  },
  disclaimer: {
    heading: "Medical Disclaimer",
    body: "This page is intended for general education and medical-travel planning. It does not replace advice from a qualified healthcare professional. Cancer statistics are population-level estimates and cannot determine an individual's diagnosis or prognosis. Treatment costs are indicative and can change. Visa requirements, fees, documentation and immigration regulations can change. Rwandan patients should verify the latest requirements on the official Government of India e-Visa portal before travelling.",
  },
  sources: {
    heading: "Sources",
    items: [
      {
        label: "Government of India — Official e-Visa portal",
        href: RWANDA_OFFICIAL_LINKS.eVisa,
        detail: "Current e-Visa categories, including e-Medical and e-Medical Attendant.",
      },
      {
        label: "Government of India — Country/territory-wise e-Visa fee list",
        href: RWANDA_OFFICIAL_LINKS.eVisaFees,
        detail: "Official fee table used as the eligibility gate. Rwanda is listed at US$80.",
      },
      {
        label: "High Commission of India, Kigali — e-Visa",
        href: RWANDA_OFFICIAL_LINKS.embassyEvisa,
        detail: "Lists e-Medical and e-Medical Attendant categories and directs applicants to the official Government of India portal.",
      },
      {
        label: "High Commission of India, Kigali — Visa services",
        href: RWANDA_OFFICIAL_LINKS.embassyVisa,
        detail: "Regular Medical Visa documents currently listed by HCI Kigali, including the Indian hospital letter, invitation email to cons.kigali@mea.gov.in and yellow-fever card photocopy.",
      },
      {
        label: "High Commission of India, Kigali — Visa fees",
        href: RWANDA_OFFICIAL_LINKS.embassyFees,
        detail: "Published MED / MED X fees, currently including RWF 104,100 and RWF 156,200 bands plus ICWF USD 3 / RWF 4,000.",
      },
      {
        label: "High Commission of India, Kigali",
        href: RWANDA_OFFICIAL_LINKS.embassy,
        detail: "Mission homepage, including the current note that visa services will be rendered by the High Commission of India, Kampala till further notice.",
      },
      {
        label: "Ministry of External Affairs, India — India–Rwanda bilateral brief",
        href: RWANDA_OFFICIAL_LINKS.meaBrief,
        detail: "US$2 million medicines in early 2019, 50,000 COVISHIELD doses on 5 March 2021, October 2021 HIV/AIDS medicines, and the US$1 million midwifery grant.",
      },
      {
        label: "IARC / WHO — GLOBOCAN 2024 Rwanda fact sheet",
        href: RWANDA_OFFICIAL_LINKS.globocan,
        detail: "Estimated 12,440 new cases, 7,991 deaths and 23,979 five-year prevalent cases, with prostate, breast, cervix, colorectum and stomach as leading sites.",
      },
      {
        label: "WHO — Rwanda health data overview",
        href: RWANDA_OFFICIAL_LINKS.whoData,
        detail: "Country-level WHO health information and health-system indicators.",
      },
      {
        label: "Ministry of Health and Family Welfare, India — IHR yellow-fever vaccination",
        href: RWANDA_OFFICIAL_LINKS.mohfwYellowFever,
        detail: "India’s yellow-fever endemic-country list. Rwanda is not currently listed as an endemic country of departure.",
      },
      {
        label: "Government of India — Bureau of Immigration",
        href: RWANDA_OFFICIAL_LINKS.boi,
        detail: "Entry and immigration instructions for travellers arriving in India.",
      },
    ],
  },
};
