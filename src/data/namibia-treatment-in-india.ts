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

export const NAMIBIA_PAGE_PATH = "/namibia/treatment-in-india";
export const NAMIBIA_PAGE_LOCALES = ["en"] as const;
export const NAMIBIA_LAST_REVIEWED = "2026-10-03";

export type NamibiaPageCopy = typeof namibiaPageCopyEn;

export function namibiaPageCopy(_locale: AppLocale): NamibiaPageCopy {
  return namibiaPageCopyEn;
}

const INDIA = "India";

export const NAMIBIA_OFFICIAL_LINKS = {
  eVisa: "https://indianvisaonline.gov.in/evisa/tvoa.html",
  eVisaHome: "https://indianvisaonline.gov.in/evisa/",
  eVisaFees: "https://indianvisaonline.gov.in/evisa/eTV_revised_fee_final.pdf",
  visaOnline: "https://indianvisaonline.gov.in/visa/",
  embassy: "http://www.hciwindhoek.gov.in/",
  embassyVisa: "http://www.hciwindhoek.gov.in/type-of-visas.php",
  embassyEvisa: "http://www.hciwindhoek.gov.in/liberalization-of-e-visa-regime.php",
  embassyFees: "http://www.hciwindhoek.gov.in/visa-fees.php",
  embassyRules: "http://www.hciwindhoek.gov.in/rules-for-issue-of-visas.php",
  embassyRelations: "http://www.hciwindhoek.gov.in/bilateral-india-namibia.php",
  meaBrief: "https://www.mea.gov.in/Portal/ForeignRelation/NamibiaJune2025.pdf",
  pmVisitOutcomes: "https://www.pmindia.gov.in/en/news_updates/list-of-outcomes-pms-visit-to-namibia/",
  globocan: "https://gco.iarc.who.int/media/globocan/factsheets/populations/516-namibia-fact-sheet.pdf",
  iarcToday: "https://gco.iarc.who.int/today/en/fact-sheets-populations",
  whoData: "https://data.who.int/countries/516",
  mohfwYellowFever: "https://ihpoe.mohfw.gov.in/vaccination.php",
  boi: "https://boi.gov.in",
} as const;

export const NAMIBIA_CURATED_TREATMENT_SLUGS = [
  "breast-cancer-treatment-in-india",
  "cervical-cancer-treatment-in-india",
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

export const NAMIBIA_CANCER_TREATMENT_SLUGS = TANZANIA_CANCER_TREATMENT_SLUGS;

export const NAMIBIA_COST_PROCEDURE_NAMES = [
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

export const NAMIBIA_DOCTOR_SPECIALTY_SLUGS = [
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

export function resolveNamibiaCostRows(catalog: Treatment[]) {
  return NAMIBIA_COST_PROCEDURE_NAMES.map((name) => {
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

export function namibiaDoctors(doctors: Doctor[]) {
  return NAMIBIA_DOCTOR_SPECIALTY_SLUGS.map((specialtySlug) => {
    const pool = doctors.filter((doctor) => doctor.specialtySlug === specialtySlug);
    const featured = pool.find((doctor) => doctor.featured);
    return featured ?? [...pool].sort((a, b) => a.name.localeCompare(b.name))[0];
  }).filter((row): row is Doctor => Boolean(row));
}

export const namibiaPageCopyEn = {
  seo: {
    title: "Medical Treatment in India for Namibian Patients",
    description:
      "Explore medical treatment in India for Namibian patients. Find specialist doctors, hospitals, treatments, indicative costs, e-Medical Visa guidance and support from GAF Healthcare.",
    keywords: [
      "medical treatment in India for Namibian patients",
      "medical treatment in India from Namibia",
      "treatment in India for Namibian patients",
      "medical tourism from Namibia to India",
      "Indian hospitals for Namibian patients",
      "Indian doctors for Namibian patients",
      "medical treatment cost in India for Namibian patients",
      "cancer treatment in India for Namibian patients",
      "cardiac treatment in India for Namibian patients",
      "heart surgery in India for Namibian patients",
      "neurosurgery in India for Namibian patients",
      "orthopaedic treatment in India for Namibian patients",
      "IVF in India for Namibian patients",
      "e-Medical Visa India for Namibian citizens",
      "Indian Medical Visa for Namibian patients",
      "treatment in India from Windhoek",
      "medical treatment from Windhoek to India",
      "prostate cancer treatment India from Namibia",
      "breast cancer treatment India from Namibia",
      "cervical cancer treatment India from Namibia",
      "Kaposi sarcoma treatment India",
    ],
  },
  breadcrumb: {
    home: "Home",
    namibia: "Namibia",
    page: "Treatment in India",
  },
  hero: {
    eyebrow: "Medical treatment in India for Namibian patients",
    h1: "Medical Treatment in India for Namibian Patients",
    lede:
      "For a patient travelling from Namibia, choosing treatment abroad involves more than selecting a hospital. GAF Healthcare helps Namibian patients connect records from Windhoek, Swakopmund, Walvis Bay, Oshakati, Rundu, Otjiwarongo and other regions with an appropriate Indian specialist and hospital, then plan the visa, travel and follow-up around that medical requirement.",
    primaryCta: "Get a Medical Opinion",
    secondaryCta: "Explore Treatments",
    whatsappLabel: "WhatsApp +91 90443 46292",
  },
  quickAnswer: {
    heading: "Quick Answer: Medical Treatment in India for Namibian Patients",
    items: [
      {
        question: "Can Namibian patients travel to India for medical treatment?",
        answer:
          "Yes. Namibian citizens can travel to India for medical treatment using the applicable Indian visa route.",
      },
      {
        question: "Can Namibian citizens apply for an Indian e-Medical Visa?",
        answer:
          "Yes. Namibia is currently included in the Government of India's e-Visa eligible-country list, and medical treatment is an eligible purpose under the e-Visa system.",
      },
      {
        question: "What treatments can Namibian patients receive in India?",
        answer:
          "Depending on the diagnosis, patients can seek cancer treatment, cardiac care, neurosurgery, orthopaedic surgery, urology, gastrointestinal treatment, fertility treatment, paediatric care, kidney treatment and transplantation, among other specialties.",
      },
      {
        question: "How much does medical treatment in India cost for Namibian patients?",
        answer:
          "There is no single price. Treatment cost depends on the diagnosis, hospital, specialist, procedure, medicines, investigations, implants, ICU requirements and duration of hospitalisation.",
      },
      {
        question: "Can a Namibian patient get a medical opinion before travelling?",
        answer:
          "Yes. Medical reports, scans and previous treatment records can be shared for preliminary specialist review.",
      },
      {
        question: "What language is used in Indian hospitals?",
        answer:
          "English is widely used for medical documentation and specialist consultations. English is also one of Namibia's official languages, which can make communication relatively straightforward for many Namibian patients.",
      },
    ],
  },
  why: {
    heading: "Why Namibian Patients Consider Medical Treatment in India",
    intro:
      "Travelling internationally for healthcare is a major decision. The first question should not simply be which Indian hospital to choose. A better starting point is the diagnosis and which specialist should treat it.",
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
    heading: "India–Namibia Healthcare Relationship",
    paragraphs: [
      "India and Namibia have maintained diplomatic relations since Namibia's independence. The official MEA brief records that the Indian Observer Mission was upgraded to a full-fledged High Commission on 21 March 1990, and that Namibia opened a resident Mission in New Delhi in March 1994.",
      "India's Ministry of External Affairs records that India has assisted Namibia with health infrastructure and has trained Namibian health officials working in AIDS control, alongside ITEC and ICCR capacity-building programmes. Health is among the sectors identified as having potential for continued cooperation.",
      "During the COVID-19 pandemic, India gifted 30,000 doses of COVISHIELD vaccine to Namibia, which arrived in March 2021.",
      "Prime Minister Narendra Modi's official visit to Namibia on 9 July 2025 included an MoU on cooperation in the field of health and medicine, according to the official list of outcomes published by the Prime Minister's Office.",
      "These initiatives provide useful context for the India–Namibia healthcare relationship. They do not determine which treatment is appropriate for an individual patient.",
    ],
  },
  context: {
    heading: "Namibia's Healthcare and Disease Burden",
    intro:
      "Namibia continues to manage a combination of communicable and noncommunicable diseases. WHO country information identifies both as important areas of health-system work. Cancer is an important component of that profile. For some patients, appropriate treatment is available within Namibia. For others, international treatment may be considered when a particular subspecialist, advanced procedure, multidisciplinary service or second opinion is required.",
    points: [
      "English is one of Namibia's official languages and is widely used in Indian international-patient services. Confirm that consent, medicines and discharge notes are clearly understood.",
      "Most international medical journeys begin at Hosea Kutako International Airport, serving Windhoek. Patients travelling from Swakopmund, Walvis Bay, Oshakati, Rundu, Otjiwarongo or other regions may first need to reach Windhoek.",
      "An international medical opinion can help clarify whether surgery is required, whether systemic therapy is appropriate, what additional tests are needed, and how long the patient may need to remain in India.",
      "Patients should always provide their current medication list to the treating Indian specialist and should not independently change medicines because an equivalent-looking product is available.",
    ],
    close:
      "Country-level health indicators do not determine an individual's medical needs. The relevant question is: what is the patient's diagnosis, what treatment is appropriate, and can the patient safely travel for that treatment?",
  },
  overview: {
    heading: "What Medical Treatments Can Namibian Patients Get in India?",
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
    heading: "Popular Medical Treatments for Namibian Patients in India",
    intro:
      "Each card links only to a live GAF specialty or treatment page. Where GAF does not yet publish a dedicated page, the category is explained without an invented URL.",
    categories: [
      {
        title: "Cancer Treatment",
        body: "Medical, surgical and radiation oncology, including breast, cervical, prostate, colorectal and lymphoma pathways that already have GAF guides. Kaposi sarcoma and lip or oral-cavity cancers are coordinated after records review because dedicated pages are not yet published.",
        href: "/treatments/breast-cancer-treatment-in-india",
        hrefLabel: "Breast cancer treatment in India",
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
        body: "Namibian couples may explore IVF, ICSI, IUI and related fertility evaluation in India. GAF does not yet publish a dedicated IVF page. Eligibility, laboratory procedures and applicable Indian regulations should be confirmed with the treating fertility centre before travel.",
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
          { label: "Leukaemia", href: "/treatments/leukemia-treatment-in-india" },
          { label: "Lymphoma", href: "/treatments/lymphoma-treatment-in-india" },
          { label: "Kaposi Sarcoma", href: "" },
          { label: "Liver Cancer", href: "" },
          { label: "Lung Cancer", href: "" },
          { label: "Lip and Oral Cancer", href: "" },
          { label: "Stomach Cancer", href: "" },
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
    heading: "Cancer Treatment in India for Namibian Patients",
    intro:
      "Cancer is one of the most important treatment categories for Namibian patients seeking specialised healthcare. According to the IARC GLOBOCAN 2024 Namibia fact sheet, the country had an estimated 4,205 new cancer cases, 2,520 cancer deaths and 9,089 five-year prevalent cases. These are GLOBOCAN 2024 estimates, not current 2026 case counts, and they should not be interpreted as an individual's diagnosis or prognosis.",
    body: "The same official fact sheet ranks breast first among estimated new cases in both sexes (701; 16.7%), followed by cervix uteri (453; 10.8%), prostate (440; 10.5%), Kaposi sarcoma (334; 7.9%) and non-Hodgkin lymphoma (167; 4.0%). Among Namibian women, breast cancer was the leading site (701; 29.7%), followed by cervix and Kaposi sarcoma. Among Namibian men, prostate cancer was the leading site (440; 23.8%), followed by Kaposi sarcoma and colorectum. GAF does not yet publish dedicated Kaposi-sarcoma, lung-cancer or lip-and-oral-cancer pages; those cases are coordinated through the relevant oncology team after records review.",
    modalities: [
      { label: "Breast Cancer", href: "/treatments/breast-cancer-treatment-in-india" },
      { label: "Cervical Cancer", href: "/treatments/cervical-cancer-treatment-in-india" },
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
    heading: "How Much Does Medical Treatment in India Cost for Namibian Patients?",
    intro:
      "There is no universal treatment price for Namibian patients. Two patients undergoing the same named procedure can have very different clinical requirements. GAF Healthcare presents costs as USD planning estimates from the live catalogue, not hospital quotations.",
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
    heading: "Which Indian Cities Can Namibian Patients Consider?",
    intro:
      "The appropriate city depends on the medical condition and treatment. There is no single Indian city that is appropriate for every Namibian patient.",
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
    heading: "How Should Namibian Patients Choose an Indian Hospital?",
    intro:
      "Start with the diagnosis. Ask whether the hospital treats the specific disease, whether the required specialty and surgeon or oncologist are available, whether ICU and advanced diagnostics are in place, whether international-patient services exist, whether the quotation is transparent, and what follow-up arrangements are available. The campuses below are drawn from GAF’s live India catalogue, one from each published city.",
    directoryLabel: "Browse hospitals in India",
  },
  doctors: {
    heading: "How Should Namibian Patients Choose the Right Doctor?",
    intro:
      "The doctor should be matched to the patient's diagnosis and procedure. A useful structure is specialty, subspecialty, procedure, city, hospital and then doctor. The specialists below are taken from GAF’s live doctor catalogue.",
    directoryLabel: "Browse doctors in India",
  },
  visa: {
    heading: "Indian e-Medical Visa for Namibian Patients",
    intro:
      "Namibia is currently listed among the countries eligible for India's e-Visa system. Medical treatment is an eligible purpose. The official portal provides e-Medical and e-Medical Attendant categories. The High Commission of India in Windhoek states that electronic visas are not processed by the Mission and that HCI Windhoek has no role in the grant or refusal of e-Visa.",
    points: [
      "Eligible applicants can apply online. The current official portal states that e-Medical and e-Medical Attendant applications may be submitted at least four days before arrival, with an arrival-date selection window of up to 120 days.",
      "The official e-Visa fee list currently shows Namibia at US$80 for the e-Visa service. A bank charge is stated on the official portal. Confirm the live amount before payment.",
      "The current official guidance states that up to two e-Medical Attendant Visas can be issued against one e-Medical Visa.",
      "An e-Medical Visa application requires the documents specified by the Government of India, including a passport bio page, a recent photograph, sufficient funds, a return or onward ticket, and an Indian hospital letter on letterhead that identifies the patient and the tentative admission or treatment date.",
      "Some patients may still need India's regular Medical Visa through the High Commission of India in Windhoek. The High Commission currently describes a Medical Visa (MED-1) for treatment in established hospitals and a Medical Attendant Visa (MED-2). Its visa-types page asks for an Indian hospital letter confirming admission and states that medical and Ayush applicants are required to generate an invitation letter through the official FRRO medical-value-travel facility.",
      "The High Commission visa-fee page currently lists Medical and Medical Attendant visas at US$80 (N$1,440) for up to six months and US$120 (N$2,160) for more than six months up to one year, plus a published Indian Community Welfare Fund charge of N$60 per application. Confirm the live schedule before payment. Do not use a third-party e-Visa website.",
    ],
    disclaimer:
      "Visa rules, fees, documents and entry regulations can change. Verify the current official Indian e-Visa portal and the High Commission of India in Windhoek immediately before applying or travelling.",
    documentsHeading: "Documents for an Indian e-Medical Visa or regular Medical Visa from Namibia",
    documents: [
      "Passport with at least six months’ validity and two blank pages",
      "Recent photograph and passport bio page",
      "Indian hospital letter with tentative admission or treatment date for an e-Medical Visa",
      "Return or onward ticket and proof of sufficient funds",
      "For the regular Medical Visa: online visa application printout, in-person High Commission submission, Indian hospital admission letter, FRRO medical-value-travel invitation letter where currently required, photographs and the applicable cash fee",
      "Attendant passports and documents where a family member will travel",
    ],
    documentsNote:
      "Patients should determine which visa route applies to their circumstances rather than submitting documents based on an outdated third-party checklist.",
  },
  yellowFever: {
    heading: "Health-Entry Requirements for Travelling from Namibia",
    intro:
      "Namibia is not currently listed among yellow-fever endemic countries on India's IHR points-of-entry guidance. Do not assume that every Namibian traveller needs a yellow-fever vaccination certificate as if Namibia were an endemic country of departure.",
    points: [
      "Travellers who transit a yellow-fever endemic country on the way to India should check the live official notes, because transit history can change the requirement.",
      "Carry the passport, visa or e-Visa authorisation, hospital letter and any vaccination certificate requested by the live official notes.",
      "Do not rely on an old travel-forum checklist for vaccination or entry rules.",
    ],
    close:
      "Confirm the current requirement on the official Indian e-Visa portal, the Bureau of Immigration and the High Commission of India in Windhoek before travel.",
  },
  travel: {
    heading: "Travelling from Namibia to India for Medical Treatment",
    intro:
      "Most Namibian patients beginning the medical journey will travel from Windhoek. The principal international gateway is Hosea Kutako International Airport. Patients travelling from Swakopmund, Walvis Bay, Oshakati, Rundu, Otjiwarongo or other regions may first need to reach Windhoek.",
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
    heading: "Documents Namibian Patients Should Prepare",
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
    heading: "Accommodation, Food and English-Language Communication",
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
      "English is one of Namibia's official languages and is widely used for medical documentation and specialist consultations in Indian hospitals. Patients should nevertheless make sure they understand the medical information before consenting to treatment. If a family member requires interpretation into another language, that should be arranged before arrival.",
  },
  stay: {
    heading: "How Long Will a Namibian Patient Need to Stay in India?",
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
      "If you are considering treatment in India, begin with your medical records rather than your flight booking. A records-first sequence allows many questions to be addressed before leaving Windhoek.",
    steps: [
      { title: "Share medical records", body: "Send the relevant reports and a concise medical history." },
      { title: "Get an Indian specialist opinion", body: "The appropriate specialist reviews the available records. A remote opinion does not replace an in-person examination." },
      { title: "Understand treatment options", body: "Discuss the proposed treatment, alternatives and expected timeline." },
      { title: "Select the hospital and doctor", body: "Choose according to the medical requirement." },
      { title: "Receive hospital confirmation", body: "The hospital confirms the consultation or treatment pathway." },
      { title: "Obtain a cost estimate", body: "Request a written estimate showing major inclusions and exclusions." },
      { title: "Apply for the Indian Medical Visa", body: "Use the current official e-Medical Visa process, or the regular Medical Visa through the High Commission of India in Windhoek if that route applies." },
      { title: "Arrange travel", body: "Plan flights, accommodation and local transportation around the confirmed hospital schedule." },
      { title: "Arrive in India", body: "Proceed to the hospital for consultation and evaluation." },
      { title: "Complete investigations and begin treatment", body: "The treating team may repeat or update diagnostic tests before confirming the final plan." },
      { title: "Recovery and discharge", body: "The hospital provides medication and follow-up instructions." },
      { title: "Return to Namibia and continue follow-up", body: "Travel home when medically fit and maintain follow-up with the Indian treating team and local healthcare professionals." },
    ],
  },
  help: {
    heading: "How GAF Healthcare Can Support Namibian Patients",
    intro:
      "GAF Healthcare can coordinate the medical journey between Namibia and India. The exact services available should be confirmed before travel. Medical decisions remain with the patient and treating medical professionals.",
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
    heading: "Can Namibian Patients Get a Second Medical Opinion from India?",
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
      "What happens after returning to Namibia?",
    ],
    specialist: [
      "Breast cancer → breast or surgical oncologist, medical oncologist, radiation oncologist",
      "Cervical cancer → gynaecologic oncologist, medical oncologist, radiation oncologist",
      "Prostate cancer → urologist or uro-oncologist, radiation oncologist, medical oncologist where required",
      "Heart disease → cardiologist, interventional cardiologist, cardiac surgeon where required",
    ],
  },
  faqHeading: "Frequently Asked Questions",
  faqs: [
    {
      q: "Can Namibian patients get medical treatment in India?",
      a: "Yes. Namibian citizens can travel to India for medical treatment using the applicable Indian e-Medical Visa or other appropriate visa route.",
    },
    {
      q: "Can Namibian citizens apply for an Indian e-Medical Visa?",
      a: "Yes. Namibia is currently included in India's e-Visa eligible-country list, and medical treatment is an eligible purpose. The High Commission of India in Windhoek states that it does not process e-Visa applications.",
    },
    {
      q: "How early can Namibian patients apply for an e-Medical Visa?",
      a: "The current Government of India guidance says eligible applicants can apply at least four days before arrival, with an application window of up to 120 days before the proposed arrival date.",
    },
    {
      q: "What passport validity is required?",
      a: "The current Indian e-Visa guidance states that the passport should have at least six months' validity when applying and at least two blank pages for immigration stamping.",
    },
    {
      q: "What document is required from the Indian hospital?",
      a: "An e-Medical Visa application requires a letter from the Indian hospital on its letterhead containing the tentative admission or treatment date.",
    },
    {
      q: "Can a family member accompany a Namibian patient?",
      a: "Yes. India's e-Medical Attendant Visa is available for eligible attendants. The current official guidance states that up to two e-Medical Attendant Visas can be granted against one e-Medical Visa.",
    },
    {
      q: "Do some Namibian patients still need a regular Medical Visa?",
      a: "Yes. Some circumstances still require the regular Medical Visa through the High Commission of India in Windhoek. The High Commission currently describes Medical Visa (MED-1) and Medical Attendant Visa (MED-2) categories and asks for an Indian hospital admission letter.",
    },
    {
      q: "What are the current High Commission Medical Visa fees in Windhoek?",
      a: "The High Commission visa-fee page currently lists Medical and Medical Attendant visas at US$80 (N$1,440) for up to six months and US$120 (N$2,160) for more than six months up to one year, plus a published ICWF charge of N$60. Confirm the live schedule before payment.",
    },
    {
      q: "Do Namibian patients need a Yellow Fever Vaccination Card?",
      a: "Namibia is not currently listed among yellow-fever endemic countries on India's IHR points-of-entry guidance. Travellers who transit an endemic country should still check the live official notes. Do not assume that every Namibian traveller needs a yellow-fever card as if Namibia were an endemic country of departure.",
    },
    {
      q: "How much does medical treatment in India cost for Namibian patients?",
      a: "There is no fixed price. Cost depends on diagnosis, treatment, hospital, specialist, medicines, investigations, implants, ICU requirements and duration of stay. GAF presents USD planning estimates, not guaranteed hospital quotations.",
    },
    {
      q: "What cancer treatments are available in India for Namibian patients?",
      a: "Depending on diagnosis and stage, treatment may include surgery, chemotherapy, radiation therapy, immunotherapy, targeted therapy, hormone therapy, precision oncology and supportive care.",
    },
    {
      q: "Which cancers are common in Namibia?",
      a: "GLOBOCAN 2024 estimates 4,205 new cancer cases and 2,520 cancer deaths in Namibia. The leading sites by estimated new cases among both sexes were breast, cervix, prostate, Kaposi sarcoma and non-Hodgkin lymphoma. These are population-level estimates, not an individual diagnosis.",
    },
    {
      q: "Can I get a treatment estimate before travelling from Namibia?",
      a: "Yes. Medical records can be submitted for preliminary specialist review and an indicative hospital estimate can be requested.",
    },
    {
      q: "Can I get a second opinion from an Indian specialist?",
      a: "Yes. Medical records can be shared with an appropriate Indian specialist for preliminary second-opinion review before travel. A remote opinion does not replace an in-person examination when one is clinically necessary.",
    },
    {
      q: "Which Indian cities can Namibian patients consider?",
      a: "Delhi NCR, Mumbai, Chennai, Hyderabad and Bengaluru are live GAF catalogue cities. Pune can also be considered, but this page does not link to a Pune directory because that city is not yet in the live catalogue.",
    },
    {
      q: "How long should I stay in India?",
      a: "The duration depends on treatment. Major surgery, cancer treatment, transplantation and rehabilitation may require several weeks or longer.",
    },
    {
      q: "Can patients from Windhoek travel to India for treatment?",
      a: "Yes. Hosea Kutako International Airport, serving Windhoek, is Namibia's principal international gateway. Exact flight routes and schedules should be checked when travel is arranged.",
    },
    {
      q: "Can patients outside Windhoek seek treatment in India?",
      a: "Yes. Patients from Swakopmund, Walvis Bay, Oshakati, Rundu, Otjiwarongo and other regions can use the same medical-treatment pathway, subject to applicable travel and visa requirements.",
    },
    {
      q: "Does India have an existing healthcare relationship with Namibia?",
      a: "Yes. Official MEA records include health-infrastructure assistance, training of Namibian health officials working in AIDS control, and 30,000 COVISHIELD vaccine doses gifted in March 2021. A health-and-medicine MoU was also recorded during the July 2025 visit.",
    },
    {
      q: "Does India have a High Commission in Namibia?",
      a: "Yes. The High Commission of India in Windhoek publishes visa-types, visa-fee, e-Visa and bilateral-relations pages. The Mission was upgraded to a full-fledged High Commission on 21 March 1990.",
    },
    {
      q: "Is English available in Indian hospitals?",
      a: "Yes. English is widely used for medical documentation and specialist consultations in Indian hospitals. English is also one of Namibia's official languages.",
    },
    {
      q: "Is India right for every Namibian patient?",
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
    heading: "Start Your Medical Treatment Journey from Namibia to India",
    body: "If you or a family member in Namibia is considering treatment in India, the most useful first step is to share the patient's medical information. Send the diagnosis, medical reports, scans and previous treatment records to GAF Healthcare.",
    primary: "Get a Medical Opinion",
    secondary: "Talk to a Medical Travel Expert",
    whatsappLabel: "WhatsApp +91 90443 46292",
    steps: "Share your medical records → Get a specialist opinion → Review hospital and treatment options → Plan your journey to India",
  },
  disclaimer: {
    heading: "Medical Disclaimer",
    body: "This page is intended for general education and medical-travel planning. It does not replace advice from a qualified healthcare professional. Cancer statistics are population-level estimates and cannot determine an individual's diagnosis or prognosis. Treatment costs are indicative and can change. Visa requirements, fees, documentation and immigration regulations can change. Namibian patients should verify the latest requirements on the official Government of India e-Visa portal before travelling.",
  },
  sources: {
    heading: "Sources",
    items: [
      {
        label: "Government of India — Official e-Visa portal",
        href: NAMIBIA_OFFICIAL_LINKS.eVisa,
        detail: "Current e-Visa categories, including e-Medical and e-Medical Attendant.",
      },
      {
        label: "Government of India — Country/territory-wise e-Visa fee list",
        href: NAMIBIA_OFFICIAL_LINKS.eVisaFees,
        detail: "Official fee table used as the eligibility gate. Namibia is listed at US$80.",
      },
      {
        label: "High Commission of India, Windhoek — Liberalisation of e-Visa regime",
        href: NAMIBIA_OFFICIAL_LINKS.embassyEvisa,
        detail: "States that e-Visa applications are not processed by HCI Windhoek.",
      },
      {
        label: "High Commission of India, Windhoek — Types of visas",
        href: NAMIBIA_OFFICIAL_LINKS.embassyVisa,
        detail: "Regular Medical Visa (MED-1) and Medical Attendant Visa (MED-2) notes, including the Indian hospital letter.",
      },
      {
        label: "High Commission of India, Windhoek — Visa fees",
        href: NAMIBIA_OFFICIAL_LINKS.embassyFees,
        detail: "Published Medical and Medical Attendant visa fees, currently including US$80 / N$1,440 and US$120 / N$2,160 bands plus ICWF N$60.",
      },
      {
        label: "High Commission of India, Windhoek — India–Namibia relations",
        href: NAMIBIA_OFFICIAL_LINKS.embassyRelations,
        detail: "Mission history, ITEC/ICCR capacity building, health-infrastructure assistance and COVISHIELD support.",
      },
      {
        label: "Ministry of External Affairs, India — India–Namibia bilateral brief, June 2025",
        href: NAMIBIA_OFFICIAL_LINKS.meaBrief,
        detail: "Health-infrastructure assistance, AIDS-control training, 30,000 COVISHIELD doses in March 2021, and ITEC/ICCR programmes.",
      },
      {
        label: "Prime Minister's Office — Outcomes of the July 2025 visit to Namibia",
        href: NAMIBIA_OFFICIAL_LINKS.pmVisitOutcomes,
        detail: "Official record of the MoU on cooperation in the field of health and medicine.",
      },
      {
        label: "IARC / WHO — GLOBOCAN 2024 Namibia fact sheet",
        href: NAMIBIA_OFFICIAL_LINKS.globocan,
        detail: "Estimated 4,205 new cases, 2,520 deaths and 9,089 five-year prevalent cases, with breast, cervix, prostate, Kaposi sarcoma and non-Hodgkin lymphoma as leading sites.",
      },
      {
        label: "WHO — Namibia health data overview",
        href: NAMIBIA_OFFICIAL_LINKS.whoData,
        detail: "Country-level WHO health information and health-system indicators.",
      },
      {
        label: "Ministry of Health and Family Welfare, India — IHR yellow-fever vaccination",
        href: NAMIBIA_OFFICIAL_LINKS.mohfwYellowFever,
        detail: "India’s yellow-fever endemic-country list. Namibia is not currently listed as an endemic country of departure.",
      },
      {
        label: "Government of India — Bureau of Immigration",
        href: NAMIBIA_OFFICIAL_LINKS.boi,
        detail: "Entry and immigration instructions for travellers arriving in India.",
      },
    ],
  },
};
