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

export const MALAWI_PAGE_PATH = "/malawi/treatment-in-india";
export const MALAWI_PAGE_LOCALES = ["en"] as const;
export const MALAWI_LAST_REVIEWED = "2026-10-03";

export type MalawiPageCopy = typeof malawiPageCopyEn;

export function malawiPageCopy(_locale: AppLocale): MalawiPageCopy {
  return malawiPageCopyEn;
}

const INDIA = "India";

export const MALAWI_OFFICIAL_LINKS = {
  eVisa: "https://indianvisaonline.gov.in/evisa/tvoa.html",
  eVisaHome: "https://indianvisaonline.gov.in/evisa/",
  eVisaFees: "https://indianvisaonline.gov.in/evisa/eTV_revised_fee_final.pdf",
  visaOnline: "https://indianvisaonline.gov.in/visa/",
  embassy: "https://www.hcililongwe.gov.in/",
  embassyVisa: "https://www.hcililongwe.gov.in/page/visa-services/",
  embassyEvisa: "https://www.hcililongwe.gov.in/page/e-visa-for-malawi-nationals/",
  embassyEvisaFaq: "https://www.hcililongwe.gov.in/page/faqs-on-e-visa/",
  embassyFees: "https://www.hcililongwe.gov.in/page/consular-fees/",
  embassyRelations: "https://www.hcililongwe.gov.in/page/bilateral-relations/",
  embassyBhabhatron:
    "https://www.hcililongwe.gov.in/section/press-releases/launching-of-bhabhatron-ii-by-president-of-malawi-h-e-dr-lazarus-mccarthy-chakwera/",
  meaBrief: "https://www.mea.gov.in/Portal/ForeignRelation/India-Malawi-2025.pdf",
  meaBriefOlder: "https://www.mea.gov.in/Portal/ForeignRelation/India-Malawi26new.pdf",
  pibHealthMou: "https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1557614",
  globocan: "https://gco.iarc.who.int/media/globocan/factsheets/populations/454-malawi-fact-sheet.pdf",
  iarcToday: "https://gco.iarc.who.int/today/en/fact-sheets-populations",
  whoData: "https://data.who.int/countries/454",
  mohfwYellowFever: "https://ihpoe.mohfw.gov.in/vaccination.php",
  boi: "https://boi.gov.in",
} as const;

export const MALAWI_CURATED_TREATMENT_SLUGS = [
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

export const MALAWI_CANCER_TREATMENT_SLUGS = TANZANIA_CANCER_TREATMENT_SLUGS;

export const MALAWI_COST_PROCEDURE_NAMES = [
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

export const MALAWI_DOCTOR_SPECIALTY_SLUGS = [
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

export function resolveMalawiCostRows(catalog: Treatment[]) {
  return MALAWI_COST_PROCEDURE_NAMES.map((name) => {
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

export function malawiDoctors(doctors: Doctor[]) {
  return MALAWI_DOCTOR_SPECIALTY_SLUGS.map((specialtySlug) => {
    const pool = doctors.filter((doctor) => doctor.specialtySlug === specialtySlug);
    const featured = pool.find((doctor) => doctor.featured);
    return featured ?? [...pool].sort((a, b) => a.name.localeCompare(b.name))[0];
  }).filter((row): row is Doctor => Boolean(row));
}

export const malawiPageCopyEn = {
  seo: {
    title: "Medical Treatment in India for Malawian Patients",
    description:
      "Explore medical treatment in India for Malawian patients. Find specialist doctors, hospitals, treatments, indicative costs, e-Medical Visa guidance and support from GAF Healthcare.",
    keywords: [
      "medical treatment in India for Malawian patients",
      "medical treatment in India from Malawi",
      "treatment in India for Malawian patients",
      "medical tourism from Malawi to India",
      "Indian hospitals for Malawian patients",
      "Indian doctors for Malawian patients",
      "medical treatment cost in India for Malawian patients",
      "cancer treatment in India for Malawian patients",
      "cardiac treatment in India for Malawian patients",
      "heart surgery in India for Malawian patients",
      "neurosurgery in India for Malawian patients",
      "orthopaedic treatment in India for Malawian patients",
      "IVF in India for Malawian patients",
      "e-Medical Visa India for Malawian citizens",
      "Indian Medical Visa from Malawi",
      "treatment in India from Lilongwe",
      "treatment in India from Blantyre",
      "medical treatment from Malawi to India",
      "cervical cancer treatment India from Malawi",
      "breast cancer treatment India from Malawi",
      "Kaposi sarcoma treatment India",
      "oesophageal cancer treatment India",
      "prostate cancer treatment India from Malawi",
    ],
  },
  breadcrumb: {
    home: "Home",
    malawi: "Malawi",
    page: "Treatment in India",
  },
  hero: {
    eyebrow: "Medical treatment in India for Malawian patients",
    h1: "Medical Treatment in India for Malawian Patients",
    lede:
      "For a patient travelling from Malawi, the process should begin with the medical records rather than the flight booking. GAF Healthcare helps Malawian patients connect records from Lilongwe, Blantyre, Mzuzu and other districts with an appropriate Indian specialist and hospital, then plan the visa, travel and follow-up around that medical requirement.",
    primaryCta: "Get a Medical Opinion",
    secondaryCta: "Explore Treatments",
    whatsappLabel: "WhatsApp +91 90443 46292",
  },
  quickAnswer: {
    heading: "Quick Answer: Medical Treatment in India for Malawian Patients",
    intro:
      "Malawian patients may consider Indian hospitals for a broad range of specialist treatments, including:",
    treatments: [
      "Cancer treatment",
      "Chemotherapy",
      "Radiation oncology",
      "Immunotherapy",
      "Targeted therapy",
      "Precision oncology",
      "Hormone therapy",
      "Cardiology",
      "Heart surgery",
      "Angioplasty",
      "Valve replacement",
      "Neurosurgery",
      "Brain tumour surgery",
      "Spine surgery",
      "Orthopaedic surgery",
      "Knee replacement",
      "Hip replacement",
      "Urology",
      "Kidney treatment",
      "Gastrointestinal surgery",
      "Liver and pancreatic surgery",
      "Bariatric surgery",
      "IVF and fertility treatment",
      "Paediatric treatment",
      "Paediatric cardiac surgery",
      "Kidney transplantation",
      "Bone marrow transplantation",
      "Second opinions for complex diagnoses",
    ],
    hospital:
      "The appropriate Indian hospital should be selected according to the diagnosis, treatment required, specialist expertise, hospital facilities, medical records and expected length of stay.",
    close:
      "A hospital should not be selected simply because it appears high in an online ranking or because it offers the lowest quotation.",
  },
  why: {
    heading: "Why Do Malawian Patients Consider Medical Treatment in India?",
    intro:
      "International treatment is usually considered when a patient needs a particular specialist, procedure, technology, multidisciplinary assessment or treatment pathway. India has large tertiary and quaternary hospitals covering many medical specialties under one healthcare system.",
    points: [
      "Access to specialised doctors, multidisciplinary teams and advanced diagnostic facilities",
      "Cancer treatment, cardiology, cardiac surgery, neurosurgery and spine surgery",
      "Orthopaedic and joint-replacement procedures, urology, gastrointestinal surgery, fertility and IVF",
      "Paediatric specialist care and selected organ-transplant programmes",
      "Hospitals experienced with international patients, and the option of a second medical opinion before travelling",
    ],
    close:
      "India should not automatically be considered appropriate for every patient. A qualified doctor should determine whether travelling for treatment is medically suitable, particularly for patients who are critically ill or medically unstable.",
  },
  relationship: {
    heading: "India–Malawi Healthcare Cooperation",
    paragraphs: [
      "India and Malawi have a documented healthcare relationship. India's resident Mission in Lilongwe closed in 1993, was concurrently accredited from Zambia until February 2012, and reopened in March 2012. Malawi opened its Mission in New Delhi in February 2007. The official MEA brief records President Droupadi Murmu's state visit to Malawi from 17 to 19 October 2024.",
      "A Government of India health-and-medicine MoU with Malawi was signed on 3 November 2010. The official PIB note records that the MoU covers cooperation in health and medicine, including communicable and noncommunicable diseases, training and research, and that such MoUs do not contain financial-aid provisions.",
      "India has also provided direct medical assistance. Official MEA briefs record medicines worth US$2 million in July 2020, 10 ambulances in February 2020, anti-cancer medicines worth US$1.4 million announced in June 2022 and handed over in July 2023, 50,000 COVID-19 vaccine doses in March 2021, and COVID-related medicines and PPE worth US$1.4 million in September 2021. These are separate programmes and should not be combined into a single figure.",
      "Cancer-care assistance is particularly visible. A Bhabhatron cancer-treatment machine, announced in November 2018, was installed at Kamuzu Central Hospital in Lilongwe, symbolically handed over during the October 2024 state visit, and officially launched on 2 July 2025 at the National Cancer Centre. India also conducted artificial-limb fitment programmes that fitted 551 people in 2018 and 599 people in 2024, and later announced support for a permanent artificial-limb centre, with machinery recorded in January 2025.",
      "These programmes do not mean every medicine or treatment is interchangeable between the two healthcare systems. For an individual patient, bilateral relations are only background. Treatment decisions remain dependent on the diagnosis and the hospital's medical assessment.",
    ],
  },
  context: {
    heading: "Healthcare Needs and Planning from Malawi",
    intro:
      "Malawi faces both communicable diseases and an increasing burden of noncommunicable diseases. WHO country information and the WHO African Region identify cancers, cardiovascular disease, chronic respiratory disease and diabetes as important parts of that NCD profile. International treatment becomes relevant when a patient needs a particular specialist, advanced procedure, complex surgery, specialised diagnostics, multidisciplinary care or another service that a patient and their doctors determine is appropriate.",
    points: [
      "English is an official language of Malawi, while Chichewa is widely spoken. English-language medical records are generally easier for Indian hospitals to review. Patients who prefer Chichewa or another local language should discuss interpreter needs before arrival.",
      "Most international medical journeys begin at Kamuzu International Airport in Lilongwe or Chileka International Airport in Blantyre. Patients travelling from Mzuzu, Zomba, Kasungu, Mangochi, Salima, Karonga, Dedza, Ntcheu or other districts may first need to reach one of those departure points.",
      "The presence of a National Cancer Centre and radiotherapy capacity in Malawi does not mean that every complex case must be treated locally, or that every patient needs to travel. International treatment may be considered for selected complex cases, specialist opinions, procedures or pathways.",
      "Patients should always provide their current medication list to the treating Indian specialist and should not independently change medicines because an equivalent-looking product is available.",
    ],
    close:
      "Country-level health indicators do not determine an individual's medical needs. The relevant question is: what is the patient's diagnosis, what treatment is appropriate, and can the patient safely travel for that treatment?",
  },
  overview: {
    heading: "What Medical Treatments Can Malawian Patients Get in India?",
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
    heading: "Popular Medical Treatments for Malawian Patients in India",
    intro:
      "Each card links only to a live GAF specialty or treatment page. Where GAF does not yet publish a dedicated page, the category is explained without an invented URL.",
    categories: [
      {
        title: "Cancer Treatment",
        body: "Medical, surgical and radiation oncology, including cervical, breast, prostate, colorectal, pancreatic and lymphoma pathways that already have GAF guides. Oesophageal cancer and Kaposi sarcoma are coordinated after records review because dedicated pages are not yet published.",
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
        body: "Malawian couples may explore IVF, ICSI, IUI and related fertility evaluation in India. GAF does not yet publish a dedicated IVF page. Eligibility, laboratory procedures and applicable Indian regulations should be confirmed with the treating fertility centre before travel.",
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
          { label: "Oesophageal Cancer", href: "" },
          { label: "Kaposi Sarcoma", href: "" },
          { label: "Liver Cancer", href: "" },
          { label: "Bladder Cancer", href: "" },
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
    heading: "Cancer Treatment in India for Malawian Patients",
    intro:
      "Cancer is a major reason some patients from Malawi may seek specialist treatment abroad. According to the IARC GLOBOCAN 2024 Malawi fact sheet, the country had an estimated 23,246 new cancer cases, 13,676 cancer deaths and 44,968 five-year prevalent cases. These are GLOBOCAN 2024 estimates, not current 2026 case counts, and they should not be interpreted as an individual's diagnosis or prognosis.",
    body: "The same official fact sheet ranks cervix uteri first among estimated new cases in both sexes (6,773; 29.1%), followed by oesophagus (2,642; 11.4%), Kaposi sarcoma (2,384; 10.3%), breast (1,447; 6.2%) and non-Hodgkin lymphoma (1,252; 5.4%). Among Malawian women, cervical cancer was the leading site (6,773; 44.1%), followed by breast and oesophagus. Among Malawian men, Kaposi sarcoma was the leading site (1,841; 23.4%), followed by oesophagus and non-Hodgkin lymphoma. Prostate cancer (582 estimated new cases) ranked seventh among both sexes. GAF does not yet publish dedicated oesophageal-cancer or Kaposi-sarcoma pages; those cases are coordinated through the relevant oncology team after records review.",
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
    heading: "How Much Does Medical Treatment in India Cost for Malawian Patients?",
    intro:
      "There is no single medical-treatment price for Malawian patients. The final cost depends on the diagnosis, disease stage, treatment plan, hospital, specialist, medicines, implants, investigations, ICU requirement, length of stay and complications. GAF Healthcare presents costs as USD planning estimates from the live catalogue, not hospital quotations.",
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
    heading: "Which Indian Cities Can Malawian Patients Consider?",
    intro:
      "India has several major healthcare centres. The appropriate city should be selected according to the patient's medical requirement. There is no single Indian city that is appropriate for every Malawian patient.",
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
    heading: "How Should Malawian Patients Choose an Indian Hospital?",
    intro:
      "Start with the diagnosis. Ask whether the hospital treats the specific disease, whether the required specialty and surgeon or oncologist are available, whether ICU and advanced diagnostics are in place, whether international-patient services exist, whether the quotation is transparent, and what follow-up arrangements are available. The campuses below are drawn from GAF’s live India catalogue, one from each published city.",
    directoryLabel: "Browse hospitals in India",
  },
  doctors: {
    heading: "How Should Malawian Patients Choose the Right Doctor?",
    intro:
      "The appropriate specialist depends on the patient's condition. A cervical-cancer patient may need a gynaecologic or radiation oncologist as well as a medical oncologist. The doctor should review the patient's actual medical records before recommending treatment. The specialists below are taken from GAF’s live doctor catalogue.",
    directoryLabel: "Browse doctors in India",
  },
  visa: {
    heading: "Indian e-Medical Visa for Malawian Patients",
    intro:
      "Malawi is currently listed among the countries eligible for India's e-Visa system. Medical treatment is an eligible purpose. The official portal provides e-Medical and e-Medical Attendant categories. The High Commission of India in Lilongwe confirms that Malawi nationals have been eligible for e-Visa since 26 February 2016, and states that the High Commission does not issue or deal in e-Visa.",
    points: [
      "Eligible applicants can apply online. The current official portal states that e-Medical and e-Medical Attendant applications may be submitted at least four days before arrival, with an arrival-date selection window of up to 120 days.",
      "The official e-Visa fee list currently shows Malawi at US$80 for the e-Visa service. A bank charge is stated on the official portal. Confirm the live amount before payment.",
      "The current official guidance states that up to two e-Medical Attendant Visas can be issued against one e-Medical Visa.",
      "An e-Medical Visa application requires the documents specified by the Government of India, including a passport bio page, a recent photograph, sufficient funds, a return or onward ticket, and an Indian hospital letter on letterhead that identifies the patient and the tentative admission or treatment date.",
      "Some patients may still need India's regular Medical Visa through the High Commission of India in Lilongwe. The High Commission visa-services page currently asks for a filled form and passport copy, two photographs, an Indian hospital invitation with treatment details, duration and estimated cost, original Malawi hospital reports and an original referral letter, proof of funds and an air-ticket booking.",
      "The High Commission consular-fees page currently lists Medical and Medical Attendant visas in Malawi kwacha, cash only: MK 144,500 for up to six months and MK 213,500 for more than six months up to one year. Confirm the live schedule before payment. Do not invent a US-dollar conversion, and do not use a third-party e-Visa website.",
    ],
    disclaimer:
      "Visa rules, fees, documents and entry regulations can change. Verify the current official Indian e-Visa portal and the High Commission of India in Lilongwe immediately before applying or travelling.",
    documentsHeading: "Documents for an Indian e-Medical Visa or regular Medical Visa from Malawi",
    documents: [
      "Passport with at least six months’ validity and two blank pages",
      "Recent photograph and passport bio page",
      "Indian hospital letter with tentative admission or treatment date for an e-Medical Visa",
      "Return or onward ticket and proof of sufficient funds",
      "For the regular Medical Visa: filled form, passport copy, two photographs, Indian hospital invitation with treatment details, duration and estimated cost, original Malawi hospital reports, original referral letter, proof of funds and air-ticket booking, as currently published by the High Commission",
      "Attendant passports and documents where a family member will travel",
    ],
    documentsNote:
      "Patients should determine which visa route applies to their circumstances rather than submitting documents based on an outdated third-party checklist.",
  },
  yellowFever: {
    heading: "Health-Entry Requirements for Travelling from Malawi",
    intro:
      "Malawi is not currently listed among yellow-fever endemic countries on India's IHR points-of-entry guidance. Do not assume that every Malawian traveller needs a yellow-fever vaccination certificate as if Malawi were an endemic country of departure.",
    points: [
      "Travellers who transit a yellow-fever endemic country on the way to India should check the live official notes, because transit history can change the requirement.",
      "Carry the passport, visa or e-Visa authorisation, hospital letter and any vaccination certificate requested by the live official notes.",
      "Do not rely on an old travel-forum checklist for vaccination or entry rules.",
    ],
    close:
      "Confirm the current requirement on the official Indian e-Visa portal, the Bureau of Immigration and the High Commission of India in Lilongwe before travel.",
  },
  travel: {
    heading: "Travelling from Malawi to India for Medical Treatment",
    intro:
      "Most international medical journeys from Malawi begin at Kamuzu International Airport in Lilongwe or Chileka International Airport in Blantyre. Patients travelling from Mzuzu, Zomba, Kasungu, Mangochi, Salima, Karonga, Dedza, Ntcheu or other districts may first need to reach one of those departure points.",
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
    heading: "Documents Malawian Patients Should Prepare",
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
      "English is an official language of Malawi, while Chichewa is widely spoken. English-language medical documents are generally easier for Indian hospitals to review. Patients who prefer Chichewa or another local language should discuss interpreter or communication requirements with the hospital and medical-travel coordinator before arrival.",
  },
  stay: {
    heading: "How Long Will a Malawian Patient Need to Stay in India?",
    intro:
      "There is no standard treatment duration. A relatively straightforward procedure may require a short stay, while cancer treatment, major surgery, transplantation or rehabilitation can require weeks or longer. Ask the hospital for an estimated treatment timeline before travelling, while understanding that the actual stay can change.",
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
      "If you are considering treatment in India, begin with your medical records rather than your flight booking. A records-first sequence allows many questions to be addressed before leaving Lilongwe or Blantyre.",
    steps: [
      { title: "Share medical records", body: "Send the relevant reports and a concise medical history." },
      { title: "Get an Indian specialist opinion", body: "The appropriate specialist reviews the available records. A remote opinion does not replace an in-person examination." },
      { title: "Understand treatment options", body: "Discuss the proposed treatment, alternatives and expected timeline." },
      { title: "Select the hospital and doctor", body: "Choose according to the medical requirement." },
      { title: "Receive hospital confirmation", body: "The hospital confirms the consultation or treatment pathway." },
      { title: "Obtain a cost estimate", body: "Request a written estimate showing major inclusions and exclusions." },
      { title: "Apply for the Indian Medical Visa", body: "Use the current official e-Medical Visa process, or the regular Medical Visa through the High Commission of India in Lilongwe if that route applies." },
      { title: "Arrange travel", body: "Plan flights, accommodation and local transportation around the confirmed hospital schedule." },
      { title: "Arrive in India", body: "Proceed to the hospital for consultation and evaluation." },
      { title: "Complete investigations and begin treatment", body: "The treating team may repeat or update diagnostic tests before confirming the final plan." },
      { title: "Recovery and discharge", body: "The hospital provides medication and follow-up instructions." },
      { title: "Return to Malawi and continue follow-up", body: "Travel home when medically fit and maintain follow-up with the Indian treating team and local healthcare professionals." },
    ],
  },
  help: {
    heading: "How GAF Healthcare Can Support Malawian Patients",
    intro:
      "GAF Healthcare can coordinate the medical journey between Malawi and India. The exact services available should be confirmed before travel. Medical decisions remain with the patient and treating medical professionals.",
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
    heading: "Can Malawian Patients Get a Second Medical Opinion from India?",
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
      "What happens after returning to Malawi?",
    ],
    specialist: [
      "Cervical cancer → gynaecologic oncologist, medical oncologist, radiation oncologist",
      "Breast cancer → breast or surgical oncologist, medical oncologist, radiation oncologist",
      "Kaposi sarcoma or lymphoma → medical oncologist, with infectious-disease input where relevant",
      "Heart disease → cardiologist, interventional cardiologist, cardiac surgeon where required",
    ],
  },
  faqHeading: "Frequently Asked Questions",
  faqs: [
    {
      q: "Can Malawian patients travel to India for medical treatment?",
      a: "Yes. Malawi is currently listed among the countries eligible for India's e-Visa services, and medical treatment is an eligible purpose. The High Commission of India in Lilongwe confirms e-Visa eligibility for Malawi nationals from 26 February 2016.",
    },
    {
      q: "Is an e-Medical Visa available for Malawian citizens?",
      a: "Malawi is currently listed among India's e-Visa eligible nationalities on the official fee list, and the e-Visa system includes an e-Medical Visa category. The High Commission states that it does not issue or deal in e-Visa. Patients should verify the live official portal before applying.",
    },
    {
      q: "How early can I apply for an Indian e-Medical Visa?",
      a: "The current official guidance states that e-Medical and e-Medical Attendant applicants can apply online at least four days before arrival, with a 120-day arrival-date window.",
    },
    {
      q: "How long should my passport be valid?",
      a: "The current Indian e-Visa guidance states that the passport should generally have at least six months' validity at the time of application and two blank pages.",
    },
    {
      q: "Do I need an Indian hospital letter?",
      a: "Yes. The official e-Visa portal specifies a letter from the concerned Indian hospital on its letterhead for the e-Medical Visa application, including the suggested or tentative admission date.",
    },
    {
      q: "Can I bring an attendant?",
      a: "Yes, subject to the applicable visa rules. India's current e-Visa system states that two e-Medical Attendant Visas can be granted against one e-Medical Visa.",
    },
    {
      q: "Do some Malawian patients still need a regular Medical Visa?",
      a: "Yes. Some circumstances still require the regular Medical Visa through the High Commission of India in Lilongwe. The High Commission currently asks for a filled form, passport copy, photographs, an Indian hospital invitation with treatment details, duration and estimated cost, original Malawi hospital reports and referral letter, proof of funds and an air-ticket booking.",
    },
    {
      q: "What are the current High Commission Medical Visa fees in Lilongwe?",
      a: "The High Commission consular-fees page currently lists Medical and Medical Attendant visas in Malawi kwacha, cash only: MK 144,500 for up to six months and MK 213,500 for more than six months up to one year. Confirm the live schedule before payment.",
    },
    {
      q: "Do Malawian patients need Yellow Fever documentation?",
      a: "Malawi is not currently listed among yellow-fever endemic countries on India's IHR points-of-entry guidance. Travellers who transit an endemic country should still check the live official notes. Do not assume that every Malawian traveller needs a yellow-fever card as if Malawi were an endemic country of departure.",
    },
    {
      q: "How much does medical treatment in India cost for Malawian patients?",
      a: "There is no fixed price. Costs depend on the diagnosis, procedure, hospital, specialist, medicines, investigations, implants, room category, hospitalisation and patient-specific factors. GAF presents USD planning estimates, not guaranteed hospital quotations.",
    },
    {
      q: "Which treatments can Malawian patients receive in India?",
      a: "Potential areas include cancer, cardiology, neurosurgery, orthopaedics, urology, GI surgery, fertility, paediatrics and transplantation. The appropriate pathway depends on the diagnosis and a specialist review of the medical records.",
    },
    {
      q: "Which cancers are common in Malawi?",
      a: "GLOBOCAN 2024 estimates 23,246 new cancer cases and 13,676 cancer deaths in Malawi. The leading sites by estimated new cases among both sexes were cervix, oesophagus, Kaposi sarcoma, breast and non-Hodgkin lymphoma. These are population-level estimates, not an individual diagnosis.",
    },
    {
      q: "Can I send my medical reports before travelling?",
      a: "Yes. Sending reports before travel can allow an Indian specialist or hospital to review the case and determine whether additional information is needed.",
    },
    {
      q: "Can I obtain a second opinion remotely?",
      a: "An initial remote medical opinion may be possible using medical records. Some conditions require physical examination or additional investigations. A remote opinion does not replace an in-person examination when one is clinically necessary.",
    },
    {
      q: "Which Indian cities can Malawian patients consider?",
      a: "Delhi NCR, Mumbai, Chennai, Hyderabad and Bengaluru are live GAF catalogue cities. Pune can also be considered, but this page does not link to a Pune directory because that city is not yet in the live catalogue.",
    },
    {
      q: "How long will treatment in India take?",
      a: "The duration depends on the treatment. Consultation, chemotherapy, radiation, surgery, transplantation and rehabilitation can all have different timelines. Ask the hospital for an estimated pre-treatment, hospitalisation, recovery and follow-up period.",
    },
    {
      q: "Where does the journey from Malawi usually begin?",
      a: "Kamuzu International Airport in Lilongwe and Chileka International Airport in Blantyre are Malawi's principal international gateways. Patients travelling from Mzuzu, Zomba, Kasungu, Mangochi, Salima, Karonga, Dedza, Ntcheu or other districts may first travel to one of those departure cities.",
    },
    {
      q: "Has India supported cancer care in Malawi?",
      a: "Yes. Official MEA and High Commission records describe a Bhabhatron cancer-treatment machine installed at Kamuzu Central Hospital in Lilongwe, later launched at the National Cancer Centre, together with anti-cancer medicines worth US$1.4 million.",
    },
    {
      q: "Does India have a broader healthcare relationship with Malawi?",
      a: "Yes. Official sources record a 2010 health-and-medicine MoU, medicines and ambulance assistance, COVID-19 vaccine and PPE support, and artificial-limb fitment programmes. These programmes are background. They do not determine an individual treatment plan.",
    },
    {
      q: "Does India have a High Commission in Malawi?",
      a: "Yes. The High Commission of India in Lilongwe publishes visa-services, e-Visa, consular-fee and bilateral-relations pages. The Mission reopened in March 2012 after a period of concurrent accreditation from Zambia.",
    },
    {
      q: "Is English-language communication important for Malawian patients?",
      a: "Yes. English is an official language of Malawi, while Chichewa is widely spoken. English-language records are generally easier for Indian hospitals to review. Patients who prefer Chichewa should discuss interpreter needs before travel.",
    },
    {
      q: "Is India right for every Malawian patient?",
      a: "No. International treatment is not automatically appropriate when the patient is medically unstable, cannot safely fly, needs immediate local treatment, or when the expected benefit does not justify the burden of travel. The treating doctor should determine medical fitness to travel.",
    },
    {
      q: "Does insurance cover treatment in India?",
      a: "Coverage depends on the patient's policy. Confirm whether planned treatment abroad, India, surgery, cancer treatment, medicines, emergency care and medical evacuation are covered, and obtain written confirmation where possible.",
    },
    {
      q: "Should I book my flight before receiving the hospital's opinion?",
      a: "For major treatment, it is generally better to obtain the medical opinion, hospital schedule and visa first. This allows the travel plan to be built around the medical schedule.",
    },
  ],
  finalCta: {
    heading: "Start Your Medical Treatment Journey from Malawi to India",
    body: "You do not need to begin by booking a flight. Begin with your medical records. Share the diagnosis, scans, pathology reports, prescriptions and previous treatment history so that an appropriate Indian specialist and hospital can be identified.",
    primary: "Get a Medical Opinion",
    secondary: "Talk to a Medical Travel Expert",
    whatsappLabel: "WhatsApp +91 90443 46292",
    steps: "Share your medical records → Get a specialist opinion → Review hospital and treatment options → Plan your journey to India",
  },
  disclaimer: {
    heading: "Medical Disclaimer",
    body: "This page provides general information about international medical treatment and should not be considered a diagnosis or personalised medical recommendation. Treatment decisions must be made by qualified medical professionals after reviewing the patient's medical history, examination findings and appropriate investigations. Treatment costs, hospital availability, visa requirements, treatment timelines and travel requirements can change. Patients should verify the latest visa, immigration and travel-health requirements with official Indian authorities before travelling.",
  },
  sources: {
    heading: "Sources",
    items: [
      {
        label: "Government of India — Official e-Visa portal",
        href: MALAWI_OFFICIAL_LINKS.eVisa,
        detail: "Current e-Visa categories, including e-Medical and e-Medical Attendant.",
      },
      {
        label: "Government of India — Country/territory-wise e-Visa fee list",
        href: MALAWI_OFFICIAL_LINKS.eVisaFees,
        detail: "Official fee table used as the eligibility gate. Malawi is listed at US$80.",
      },
      {
        label: "High Commission of India, Lilongwe — e-Visa for Malawi nationals",
        href: MALAWI_OFFICIAL_LINKS.embassyEvisa,
        detail: "Confirms e-Visa eligibility for Malawi nationals from 26 February 2016.",
      },
      {
        label: "High Commission of India, Lilongwe — FAQs on e-Visa",
        href: MALAWI_OFFICIAL_LINKS.embassyEvisaFaq,
        detail: "States that the High Commission does not issue or deal in e-Visa.",
      },
      {
        label: "High Commission of India, Lilongwe — Visa services",
        href: MALAWI_OFFICIAL_LINKS.embassyVisa,
        detail: "Regular Medical Visa documents, including hospital invitation, Malawi hospital reports and referral letter.",
      },
      {
        label: "High Commission of India, Lilongwe — Consular fees",
        href: MALAWI_OFFICIAL_LINKS.embassyFees,
        detail: "Published Medical and Medical Attendant visa fees in Malawi kwacha, currently including MK 144,500 and MK 213,500 bands, cash only.",
      },
      {
        label: "High Commission of India, Lilongwe — India–Malawi relations",
        href: MALAWI_OFFICIAL_LINKS.embassyRelations,
        detail: "Mission history, bilateral cooperation and healthcare assistance recorded by the High Commission.",
      },
      {
        label: "High Commission of India, Lilongwe — Bhabhatron II launch",
        href: MALAWI_OFFICIAL_LINKS.embassyBhabhatron,
        detail: "Press note on the Bhabhatron cancer-treatment machine at Kamuzu Central Hospital / National Cancer Centre.",
      },
      {
        label: "Ministry of External Affairs, India — India–Malawi bilateral brief 2025",
        href: MALAWI_OFFICIAL_LINKS.meaBrief,
        detail: "Mission history, President Murmu's October 2024 visit, Bhabhatron, medicines, anti-cancer drugs, ambulances, COVID assistance and artificial-limb programmes.",
      },
      {
        label: "Press Information Bureau — India–Malawi health and medicine MoU",
        href: MALAWI_OFFICIAL_LINKS.pibHealthMou,
        detail: "MoU signed 3 November 2010 covering health and medicine, including communicable and noncommunicable diseases, training and research.",
      },
      {
        label: "IARC / WHO — GLOBOCAN 2024 Malawi fact sheet",
        href: MALAWI_OFFICIAL_LINKS.globocan,
        detail: "Estimated 23,246 new cases, 13,676 deaths and 44,968 five-year prevalent cases, with cervix, oesophagus, Kaposi sarcoma, breast and non-Hodgkin lymphoma as leading sites.",
      },
      {
        label: "WHO — Malawi health data overview",
        href: MALAWI_OFFICIAL_LINKS.whoData,
        detail: "Country-level WHO health information and health-system indicators.",
      },
      {
        label: "Ministry of Health and Family Welfare, India — IHR yellow-fever vaccination",
        href: MALAWI_OFFICIAL_LINKS.mohfwYellowFever,
        detail: "India’s yellow-fever endemic-country list. Malawi is not currently listed as an endemic country of departure.",
      },
      {
        label: "Government of India — Bureau of Immigration",
        href: MALAWI_OFFICIAL_LINKS.boi,
        detail: "Entry and immigration instructions for travellers arriving in India.",
      },
    ],
  },
};
