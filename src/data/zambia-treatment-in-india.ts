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

export const ZAMBIA_PAGE_PATH = "/zambia/treatment-in-india";
export const ZAMBIA_PAGE_LOCALES = ["en"] as const;
export const ZAMBIA_LAST_REVIEWED = "2026-10-03";

export type ZambiaPageCopy = typeof zambiaPageCopyEn;

export function zambiaPageCopy(_locale: AppLocale): ZambiaPageCopy {
  return zambiaPageCopyEn;
}

const INDIA = "India";

export const ZAMBIA_OFFICIAL_LINKS = {
  eVisa: "https://indianvisaonline.gov.in/evisa/tvoa.html",
  visaOnline: "https://indianvisaonline.gov.in/visa/",
  hciEvisa: "https://www.hcizambia.gov.in/page/e-visa/",
  hciRegular: "https://www.hcizambia.gov.in/page/medical-visa/",
  hciVisa: "https://www.hcizambia.gov.in/page/application-process/",
  hciHome: "https://www.hcizambia.gov.in/",
  meaBrief: "https://www.mea.gov.in/Portal/ForeignRelation/India-Zambia_Bilateral_Relations.pdf",
  meaBrief26: "https://www.mea.gov.in/Portal/ForeignRelation/India-Zambia-Aug-2025.pdf",
  globocan: "https://gco.iarc.who.int/media/globocan/factsheets/populations/894-zambia-fact-sheet.pdf",
  iarcToday: "https://gco.iarc.who.int/today/en/fact-sheets-populations",
  whoData: "https://data.who.int/countries/894",
  boi: "https://boi.gov.in",
} as const;

export const ZAMBIA_CURATED_TREATMENT_SLUGS = [
  "cervical-cancer-treatment-in-india",
  "breast-cancer-treatment-in-india",
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

export const ZAMBIA_CANCER_TREATMENT_SLUGS = TANZANIA_CANCER_TREATMENT_SLUGS;

export const ZAMBIA_COST_PROCEDURE_NAMES = [
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

export const ZAMBIA_DOCTOR_SPECIALTY_SLUGS = [
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

export function resolveZambiaCostRows(catalog: Treatment[]) {
  return ZAMBIA_COST_PROCEDURE_NAMES.map((name) => {
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

export function zambiaDoctors(doctors: Doctor[]) {
  return ZAMBIA_DOCTOR_SPECIALTY_SLUGS.map((specialtySlug) => {
    const pool = doctors.filter((doctor) => doctor.specialtySlug === specialtySlug);
    const featured = pool.find((doctor) => doctor.featured);
    return featured ?? [...pool].sort((a, b) => a.name.localeCompare(b.name))[0];
  }).filter((row): row is Doctor => Boolean(row));
}

export const zambiaPageCopyEn = {
  seo: {
    title: "Medical Treatment in India for Zambian Patients",
    description:
      "Explore medical treatment in India for Zambian patients. Find specialist doctors, hospitals, treatments, indicative costs, e-Medical Visa guidance and support from GAF Healthcare.",
    keywords: [
      "medical treatment in India for Zambian patients",
      "medical treatment in India from Zambia",
      "treatment in India for Zambian patients",
      "medical tourism from Zambia to India",
      "Indian hospitals for Zambian patients",
      "Indian doctors for Zambian patients",
      "medical treatment cost in India for Zambian patients",
      "cancer treatment in India for Zambian patients",
      "cardiac treatment in India for Zambian patients",
      "e-Medical Visa India for Zambia",
      "medical visa India for Zambian citizens",
      "treatment in India from Lusaka",
      "treatment in India from Zambia",
    ],
  },
  breadcrumb: {
    home: "Home",
    zambia: "Zambia",
    page: "Treatment in India",
  },
  hero: {
    eyebrow: "Medical treatment in India for Zambian patients",
    h1: "Medical Treatment in India for Zambian Patients",
    lede:
      "For patients travelling from Zambia, medical treatment abroad involves more than choosing a hospital. A successful medical journey usually starts with understanding the diagnosis, identifying the appropriate specialist, obtaining a treatment opinion, reviewing the expected cost, arranging the appropriate visa, planning travel from Lusaka or another Zambian city, arranging accommodation and preparing for follow-up after returning home. GAF Healthcare helps connect Zambian patients with appropriate hospitals and specialist doctors in India.",
    primaryCta: "Get a Medical Opinion",
    secondaryCta: "Explore Treatments",
    whatsappLabel: "WhatsApp +91 90443 46292",
  },
  quickAnswer: {
    intro:
      "Zambian patients can seek specialist medical treatment in India for a broad range of conditions, including:",
    treatments: [
      "Cancer",
      "Cardiac disease",
      "Heart surgery",
      "Neurosurgery",
      "Brain and spine disorders",
      "Orthopedic conditions",
      "Knee replacement",
      "Hip replacement",
      "Urology",
      "Gastroenterology",
      "Gastrointestinal surgery",
      "Liver and kidney disease",
      "Organ transplantation",
      "IVF and fertility treatment",
      "Pediatric conditions",
      "Complex and minimally invasive surgery",
    ],
    process:
      "The process usually begins by sharing the patient's medical records. An Indian specialist or hospital can then review the case and provide a medical opinion, recommended treatment approach, expected duration and indicative cost.",
    evisa:
      "Zambian passport holders are currently listed among the nationalities eligible for India's e-Visa system. India's official e-Visa portal includes Zambia in its eligible-country list and provides an e-Medical Visa category. The current official guidance says eligible e-Medical applicants can apply online at least four days before arrival, with an application window extending up to 120 days before the intended arrival date.",
    verify: "Visa requirements can change, so patients should verify the latest official requirements before submitting an application.",
  },
  why: {
    heading: "Why Zambian Patients Consider India for Medical Treatment",
    intro:
      "Travelling from Zambia to India for medical treatment is a significant decision for a patient and family. The decision may involve considering the availability of specialist treatment, the complexity of the condition, access to multidisciplinary teams, diagnostic facilities, surgical options, expected duration, indicative cost, visa requirements, international travel, accommodation, attendant arrangements and follow-up after returning to Zambia.",
    points: [
      "India has major tertiary and quaternary hospitals in Delhi NCR, Mumbai, Chennai, Hyderabad and Bengaluru",
      "A specific condition can be matched to a specialty, subspecialty, treatment and doctor rather than choosing a hospital only by its name",
      "Zambia is currently on India’s e-Visa list, and a regular Medical Visa remains available through the High Commission of India in Lusaka",
      "Medical records can be reviewed before travel so the family understands the proposed pathway and indicative cost",
      "International treatment is not automatically the right option for every patient — the decision should follow the individual medical condition",
    ],
    close:
      "The right choice depends on the patient's diagnosis and treatment requirement rather than simply choosing a city or hospital name.",
  },
  relationship: {
    heading: "India–Zambia Healthcare Relationship",
    paragraphs: [
      "Healthcare has been an important area of practical cooperation between India and Zambia. India’s Ministry of External Affairs records that medicines worth approximately US$2 million were handed over to Zambia’s Ministry of Health in December 2019, and that essential medicines were supplied during the COVID-19 response.",
      "The same official briefs record humanitarian assistance during Zambia’s cholera response in February 2024, and that medical equipment worth US$1 million was handed over in April 2025 and installed at 24 locations across all 10 provinces, with training for Zambian healthcare professionals.",
      "India has also supported Zambia’s healthcare infrastructure through a Line of Credit for rural prefabricated health posts. The MEA reports that 563 of these health posts had been completed and were operational. This history provides useful context. It does not guarantee access to a particular treatment or clinical outcome. Each patient needs an individual medical assessment.",
    ],
  },
  context: {
    heading: "Planning Treatment from Zambia",
    intro:
      "Zambia has its own hospitals and specialists. International treatment becomes relevant when a patient needs a particular specialist, advanced procedure, complex surgery, specialised diagnostics, multidisciplinary care or another service that is not readily available locally.",
    points: [
      "The India–Zambia healthcare and pharmaceutical relationship can make Indian hospitals a familiar option, but the hospital still has to match the diagnosis.",
      "English is widely used in Indian hospitals, which can make communication more straightforward for many Zambian patients.",
      "Many international medical journeys begin at Kenneth Kaunda International Airport in Lusaka. Patients travelling from other parts of Zambia may first travel to Lusaka or another regional airport.",
    ],
    close:
      "The decision should be based on the patient’s individual medical requirements, discussed with the current doctor and, where appropriate, an Indian specialist after records review.",
  },
  overview: {
    heading: "Medical Treatment in India for Patients from Zambia",
    intro:
      "Depending on the diagnosis, Zambian patients may consider India for the specialties below. The appropriate pathway should always be determined by a qualified medical professional after reviewing the clinical information.",
    areas: [
      "Cancer treatment",
      "Cardiology",
      "Cardiac surgery",
      "Neurosurgery",
      "Neurology",
      "Orthopaedic surgery",
      "Joint replacement",
      "Gastroenterology",
      "Urology",
      "Kidney treatment",
      "Organ transplantation",
      "Paediatric treatment",
      "Fertility treatment",
      "Second opinions",
    ],
  },
  treatments: {
    heading: "Popular Treatment Categories for Zambian Patients",
    intro:
      "Each card links only to a live GAF specialty or treatment page. Where GAF does not yet publish a dedicated page, the category is explained without an invented URL.",
    categories: [
      {
        title: "Cancer Treatment",
        body: "Medical, surgical and radiation oncology, including cervical, breast, prostate and colorectal pathways that already have GAF guides.",
        href: "/treatments/cervical-cancer-treatment-in-india",
        hrefLabel: "Cervical cancer treatment in India",
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
        body: "Zambian couples may consider India for infertility evaluation and assisted reproductive treatment. GAF does not yet publish a dedicated IVF page. Eligibility, protocols and applicable Indian regulations should be confirmed with the treating fertility centre before travel.",
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
          { label: "Blood Cancer", href: "/treatments/leukemia-treatment-in-india" },
          { label: "Kaposi Sarcoma", href: "" },
          { label: "Oesophageal Cancer", href: "" },
          { label: "Lung Cancer", href: "" },
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
    heading: "Cancer Treatment in India for Zambian Patients",
    intro:
      "Cancer is an important area of medical care for patients from Zambia. According to the IARC GLOBOCAN 2022 Zambia fact sheet, the country had an estimated 16,582 new cancer cases, 9,792 cancer deaths and 35,408 five-year prevalent cases. These are GLOBOCAN 2022 estimates, not current 2026 case counts, and they should not be used to diagnose an individual patient.",
    body: "The same official fact sheet ranks cervix uteri first among estimated new cases in both sexes (4,730; 28.5%), followed by breast (1,555; 9.4%), Kaposi sarcoma (1,378; 8.3%), prostate (1,341; 8.1%) and colorectum (729; 4.4%). Among Zambian men, prostate, Kaposi sarcoma and colorectal cancers were the leading sites. Among Zambian women, cervical cancer accounted for the largest number of estimated new cases. GAF does not yet publish dedicated Kaposi-sarcoma, oesophageal-cancer or lung-cancer pages; those cases are coordinated through the relevant oncology team after records review.",
    modalities: [
      { label: "Cervical Cancer", href: "/treatments/cervical-cancer-treatment-in-india" },
      { label: "Breast Cancer", href: "/treatments/breast-cancer-treatment-in-india" },
      { label: "Prostate Cancer", href: "/treatments/prostate-cancer-treatment-in-india" },
      { label: "Colon Cancer", href: "/treatments/colon-cancer-treatment-in-india" },
      { label: "Ovarian Cancer", href: "/treatments/ovarian-cancer-treatment-in-india" },
      { label: "Chemotherapy", href: "/treatments/chemotherapy-in-india" },
      { label: "Immunotherapy", href: "/treatments/immunotherapy-in-india" },
      { label: "Targeted Therapy", href: "/treatments/targeted-therapy-in-india" },
      { label: "Molecular Targeted Therapy", href: "/treatments/molecular-targeted-therapy-in-india" },
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
    heading: "Medical Treatment Cost in India for Zambian Patients",
    intro:
      "There is no single fixed price for medical treatment in India. Online cost figures should be considered indicative planning ranges, not final hospital quotations. GAF Healthcare presents costs as USD planning estimates from the live catalogue, not guaranteed prices.",
    factors: [
      "Diagnosis and disease stage",
      "Hospital, specialist and procedure",
      "Room category, investigations and medicines",
      "Implants, ICU care and length of hospitalisation",
      "Complications, additional procedures, rehabilitation and follow-up",
    ],
    tableIntro:
      "The ranges below are GAF Healthcare planning figures from the live cost catalogue. They are not hospital quotations. Ask the hospital which items are included.",
    disclaimer:
      "A preliminary estimate may change if additional investigations are required, the disease is more advanced than expected, a different procedure or implant is needed, ICU care becomes necessary, hospitalisation is extended, or a complication develops.",
    ctaLabel: "Get a treatment-cost review on WhatsApp",
  },
  extraBudget: {
    heading: "What Should Be Included in a Hospital Estimate?",
    intro:
      "Before travelling, ask whether the estimate includes doctor fees, admission, room charges, surgery, anaesthesia, operating-room charges, ICU, nursing, medicines, consumables, implants, pathology, imaging, blood products, physiotherapy and follow-up consultations.",
    items: [
      "Visa fees and international flights",
      "Accommodation outside the hospital, food and local transportation",
      "Attendant expenses",
      "Additional investigations, special medicines and implants",
      "Extended ICU care, complications and extended accommodation",
      "Rehabilitation and follow-up consultations",
    ],
    close:
      "Two hospitals may quote different amounts because their estimates cover different items. Compare the scope of treatment alongside the headline price.",
  },
  cities: {
    heading: "Major Indian Cities for Zambian Patients",
    intro:
      "There is no single city that is appropriate for every medical condition. The city should be selected according to the patient's diagnosis, hospital and specialist. Delhi NCR, Mumbai, Chennai, Hyderabad and Bengaluru have specialist hospitals in GAF’s live catalogue.",
    items: [
      {
        name: "Delhi NCR",
        body: "A large concentration of tertiary and quaternary hospitals covering cancer, cardiology, neurosurgery, orthopaedics, transplantation, urology, gastroenterology and paediatric specialties.",
        city: "Delhi NCR",
        catalog: true,
      },
      {
        name: "Mumbai",
        body: "Major hospitals providing cancer treatment, cardiac care, neurosurgery, orthopaedics, gastroenterology, transplantation and urology. Also an important international arrival point.",
        city: "Mumbai",
        catalog: true,
      },
      {
        name: "Chennai",
        body: "An established medical centre for cardiology, cardiac surgery, cancer, orthopaedics, neurosurgery, neurology, gastroenterology and transplantation.",
        city: "Chennai",
        catalog: true,
      },
      {
        name: "Hyderabad",
        body: "Specialist services across oncology, cardiology, neurosurgery, orthopaedics, transplantation, urology and gastroenterology.",
        city: "Hyderabad",
        catalog: true,
      },
      {
        name: "Bengaluru",
        body: "Specialist hospitals providing cardiology, oncology, neurosciences, orthopaedics, transplantation, gastroenterology and minimally invasive or robotic surgery.",
        city: "Bengaluru",
        catalog: true,
      },
      {
        name: "Pune",
        body: "Pune can also be considered for oncology, orthopaedics, cardiology, neurosurgery, gastroenterology and urology. GAF’s live city catalogue does not yet include Pune, so this page does not link to a Pune directory.",
        city: "Pune",
        catalog: false,
      },
    ],
  },
  hospitals: {
    heading: "Hospitals in India for Zambian Patients",
    intro:
      "Choose the hospital for the specific condition, the specialist, the required technology, international-patient support and a clear written estimate. The campuses below are drawn from GAF’s live India catalogue, one from each published city.",
    directoryLabel: "Browse hospitals in India",
  },
  doctors: {
    heading: "Specialist Doctors in India for Zambian Patients",
    intro:
      "The specialist should be matched to the patient's diagnosis. A cervical-cancer patient may need a gynaecologic or surgical oncologist, a medical oncologist and a radiation oncologist. The specialists below are taken from GAF’s live doctor catalogue.",
    directoryLabel: "Browse doctors in India",
  },
  visa: {
    heading: "Medical Visa for Zambian Patients",
    intro:
      "Zambia is currently included in India's official e-Visa eligible-country list. The Indian e-Visa system includes e-Medical Visa and e-Medical Attendant Visa categories.",
    points: [
      "The current official guidance says eligible e-Medical applicants can apply online at least four days before arrival, with an application window extending up to 120 days before the intended arrival date.",
      "The passport should have at least six months' validity at the time of application and at least two blank pages. The e-Medical Visa application requires the passport bio page and an Indian hospital letter containing the proposed or tentative admission date.",
      "Up to two e-Medical Attendant Visas can be granted against one e-Medical Visa. Confirm the live official portal when applying, because visa wording can change.",
      "The High Commission of India in Lusaka also provides a regular Medical Visa route for specialised treatment. Its published checklist includes a yellow-fever certificate, a letter from a local doctor or hospital establishing the need for treatment in India, and an Indian hospital letter with the patient's name, passport details and date of travel.",
      "The High Commission currently states that regular Medical Visa applications are submitted in person in Lusaka, with a published processing time of three working days. e-Visa applications are completed online and do not require High Commission facilitation.",
    ],
    disclaimer:
      "Visa rules, fees, documents and entry regulations can change. Verify the current official e-Visa portal and the High Commission of India in Lusaka before applying or travelling.",
    documentsHeading: "e-Medical Visa and regular Medical Visa documents",
    documents: [
      "Passport with at least six months’ validity and two blank pages",
      "Recent photograph and passport bio page",
      "Indian hospital letter with tentative admission or treatment date for an e-Medical Visa",
      "For the regular Medical Visa: letter from a local Zambian doctor or hospital and an Indian hospital letter with name, passport details and travel date, as the High Commission currently requires",
      "Yellow-fever certificate where the High Commission or entry rules currently require it",
      "NRC or residency permit where the High Commission currently requires it",
      "Attendant passports and documents where a family member will travel",
    ],
    documentsNote:
      "Patients should determine which visa route applies to their circumstances rather than submitting documents based on an outdated third-party checklist.",
  },
  yellowFever: {
    heading: "Health-Entry Requirements for Travelling from Zambia",
    intro:
      "Zambian patients should check India’s current health-entry requirements before departure. India’s e-Visa guidance states that travellers arriving from yellow-fever affected countries must carry the required vaccination certificate.",
    points: [
      "The High Commission of India in Lusaka currently lists a yellow-fever certificate among regular Medical Visa documents. Confirm whether this applies to the chosen visa route before applying.",
      "Carry the passport, visa or e-Visa authorisation, hospital letter and any vaccination certificate requested by the live official notes.",
      "Do not rely on an old travel-forum checklist for vaccination or entry rules.",
    ],
    close:
      "Confirm the current requirement on the official Indian e-Visa portal, the Bureau of Immigration and the High Commission of India in Lusaka before travel.",
  },
  travel: {
    heading: "Travel from Zambia to India for Medical Treatment",
    intro:
      "Most international medical journeys from Zambia begin at Kenneth Kaunda International Airport in Lusaka. Depending on the travel date and airline schedule, patients may travel through connecting international hubs before reaching India.",
    points: [
      "The most practical Indian arrival airport depends on the selected hospital.",
      "Flight routes and schedules can change, so patients should verify the itinerary before booking.",
      "For planned treatment, it is generally better to receive the hospital's assessment, treatment schedule and relevant visa documentation before booking non-refundable travel.",
      "Patients with serious medical conditions should ask their treating doctor whether they are medically fit to fly.",
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
    heading: "Documents Zambian Patients Should Prepare",
    intro:
      "A medical-travel file should contain both physical and digital copies. For cancer patients, pathology and actual imaging are particularly important. For cardiac patients, angiography images and echocardiography reports help the specialist assess the case.",
    general: [
      "Diagnosis, medical summary, blood tests and imaging",
      "CT, MRI, PET scans and pathology or biopsy reports",
      "Previous operative reports, discharge summaries and current medicines",
      "Previous chemotherapy and radiation records where relevant",
      "Valid Zambian passport, visa documents and Indian hospital correspondence",
      "Treatment estimate, attendant documents and Zambia hospital referral where applicable",
    ],
    cancer: [
      "Histopathology, immunohistochemistry and molecular testing",
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
      "For neurosurgical cases, actual MRI or CT images should be provided wherever possible, alongside the radiology report.",
  },
  living: {
    heading: "Food, Language and Accommodation for Zambian Patients",
    intro:
      "Accommodation should be selected according to the patient's medical condition and treatment schedule. Patients receiving radiation therapy, chemotherapy or repeated outpatient treatment may benefit from staying close to the hospital.",
    accommodation: [
      "Hotel, serviced apartment, long-stay or hospital-associated accommodation",
      "Distance from the hospital, lift access and wheelchair accessibility",
      "Attendant accommodation and kitchen facilities",
      "Pharmacy access, food preferences and transport",
    ],
    accommodationNote:
      "Patients may have dietary requirements because of diabetes, kidney disease, heart disease, liver disease, cancer treatment, gastrointestinal conditions or post-operative recovery. Follow the diet recommended by the treating team.",
    food: "For longer stays, accommodation with kitchen facilities can sometimes make dietary planning easier for patients and attendants.",
    language:
      "English is widely used in India's healthcare system, which can make communication relatively straightforward for many Zambian patients. Important medical instructions should nevertheless be provided in writing whenever possible.",
  },
  stay: {
    heading: "How Long Should a Zambian Patient Stay in India?",
    intro:
      "The required stay depends on the treatment. These are planning estimates rather than guarantees. The treating hospital should provide a more specific expected duration after evaluating the patient.",
    rows: [
      { treatment: "Specialist consultation", stay: "2–5 days" },
      { treatment: "Diagnostic evaluation", stay: "2–7 days" },
      { treatment: "Major surgery", stay: "1–4 weeks or longer" },
      { treatment: "Joint replacement", stay: "Around 1–3 weeks" },
      { treatment: "Cancer surgery", stay: "Often 2–4 weeks" },
      { treatment: "Radiation or chemotherapy", stay: "Depends on protocol" },
      { treatment: "Complex transplant", stay: "Several weeks to months" },
    ],
  },
  journey: {
    heading: "The Medical Journey from Zambia to India",
    intro:
      "A patient should ideally not travel internationally without understanding the basic treatment pathway. A records-first sequence allows many questions to be addressed before leaving Lusaka.",
    steps: [
      { title: "Share medical records", body: "Send the diagnosis, medical summary, blood tests, imaging, pathology, previous treatment and current medicines." },
      { title: "Identify the correct specialty", body: "The case is mapped to the relevant specialty — for example cervical cancer to gynaecologic, surgical, medical and radiation oncology." },
      { title: "Obtain a medical opinion", body: "The selected Indian hospital or specialist reviews the medical records. Additional investigations may be recommended." },
      { title: "Review treatment options", body: "Compare the hospital, doctor, treatment plan, indicative cost, expected stay, city and follow-up requirements." },
      { title: "Obtain hospital documentation", body: "The hospital can provide the treatment and admission documentation required for the applicable visa process." },
      { title: "Complete visa formalities", body: "Eligible Zambian patients can use India's e-Medical Visa route or the regular Medical Visa through the High Commission in Lusaka." },
      { title: "Arrange travel", body: "Flights, accommodation and airport transfers can be planned around the expected hospital admission date." },
      { title: "Hospital admission and treatment", body: "The patient undergoes the recommended investigations and treatment after assessment and consent." },
      { title: "Recovery", body: "Obtain the discharge summary, investigation reports, operative notes, pathology, medication list and follow-up instructions." },
      { title: "Return to Zambia", body: "Travel home only after the treating doctor clears the patient to fly." },
      { title: "Follow-up", body: "Ask which reports should be repeated and whether selected reviews can continue remotely." },
      { title: "Keep the records", body: "Carry complete discharge and follow-up documents for any later review in Zambia or India." },
    ],
  },
  help: {
    heading: "How GAF Healthcare Supports Zambian Patients",
    intro:
      "GAF Healthcare can assist patients from Zambia with the practical process of seeking medical treatment in India. The exact services available should be confirmed before travel.",
    before: [
      "Medical case assessment and records review",
      "Hospital and specialist matching",
      "Medical opinion coordination",
      "Indicative treatment estimate",
      "Visa-document coordination",
      "Travel planning around hospital dates",
    ],
    during: [
      "Hospital coordination",
      "Connection with the treating team",
      "Patient and family communication",
      "Practical support during the stay",
    ],
    after: [
      "Discharge-record collection",
      "Follow-up planning",
      "Return-travel planning when the doctor clears travel",
    ],
    note: "GAF Healthcare’s role is coordination, not a substitute for the treating doctor. Remote review cannot replace an in-person examination when one is medically necessary.",
  },
  opinion: {
    heading: "Why Get a Medical Opinion Before Travelling?",
    intro:
      "A preliminary review from Lusaka can help clarify the specialty, whether further information is required, potential treatment and hospital options, indicative cost and expected stay.",
    questions: [
      "What is the diagnosis, and does pathology need review?",
      "What treatment is recommended, and are there alternatives?",
      "Who will perform the procedure, and what investigations are required?",
      "What is included in the estimate — medicines, implants, ICU and investigations?",
      "How long should the patient remain in India, and when is it safe to fly home?",
      "Can follow-up be coordinated after returning to Zambia?",
    ],
    close:
      "International treatment may not be appropriate when the patient requires emergency treatment, is medically unstable for long-distance travel, the treatment is readily available locally, or the patient is not medically fit to fly.",
  },
  choose: {
    heading: "How to Choose the Right Indian Hospital and Doctor",
    intro:
      "A hospital having a particular department does not necessarily mean it is appropriate for every form of that disease. The relevant doctor's experience with the patient's specific condition is more useful than the hospital's overall profile.",
    hospital: [
      "Does the hospital treat this specific condition?",
      "Does it have the required imaging, radiation, robotic systems or intensive care?",
      "Is the relevant specialist available, and does the hospital support international patients?",
      "Is the treatment estimate clear about inclusions, exclusions and possible additional charges?",
      "What happens if treatment takes longer?",
    ],
    specialist: [
      "Cervical cancer → gynaecologic or surgical oncologist, medical oncologist, radiation oncologist",
      "Prostate cancer → urologist or uro-oncologist, radiation oncologist, medical oncologist where required",
      "Heart blockage → cardiologist, interventional cardiologist, cardiac surgeon where required",
      "Brain tumour → neurosurgeon, and medical or radiation oncology where appropriate",
    ],
  },
  faqHeading: "Frequently Asked Questions",
  faqs: [
    {
      q: "Can Zambian patients travel to India for medical treatment?",
      a: "Yes. Patients from Zambia can travel to India for planned medical treatment subject to India's current visa, immigration and health requirements.",
    },
    {
      q: "Are Zambian citizens eligible for India's e-Medical Visa?",
      a: "Yes. Zambia is currently included in India's official e-Visa eligible-country list, and eligible applicants can use the e-Medical Visa category.",
    },
    {
      q: "How early can a Zambian patient apply for an e-Medical Visa?",
      a: "The current official guidance states that eligible e-Medical applicants can apply at least four days before arrival and select an arrival date within a 120-day application window.",
    },
    {
      q: "What documents are required for India's e-Medical Visa?",
      a: "The official guidance requires the passport bio page and a letter from the Indian hospital containing the proposed or tentative admission or treatment date and relevant patient details. The passport should have at least six months' validity and two blank pages.",
    },
    {
      q: "Can a family member accompany a Zambian medical patient?",
      a: "Yes. India's current e-Visa guidance allows up to two e-Medical Attendant Visas against one e-Medical Visa.",
    },
    {
      q: "Can Zambian patients apply for a regular Medical Visa?",
      a: "Yes. The High Commission of India in Lusaka provides a regular Medical Visa route. Its published checklist includes a local doctor or hospital letter, an Indian hospital letter, and a yellow-fever certificate.",
    },
    {
      q: "How much does medical treatment in India cost for Zambian patients?",
      a: "There is no fixed price. Costs depend on diagnosis, hospital, doctor, procedure, investigations, medicines, implants, room category, ICU requirements and length of stay.",
    },
    {
      q: "Can I receive a hospital estimate before travelling?",
      a: "Yes. An Indian hospital can review the patient's medical records and provide an indicative estimate before travel.",
    },
    {
      q: "What are the main treatments available to Zambian patients?",
      a: "Potential treatment areas include oncology, cardiology, neurosurgery, orthopedics, urology, gastroenterology, fertility, pediatric medicine and transplantation.",
    },
    {
      q: "Can Zambian cancer patients receive treatment in India?",
      a: "Yes. Indian cancer centres provide surgery, chemotherapy, radiation therapy, immunotherapy, targeted therapy, hormone therapy and other treatments depending on the cancer.",
    },
    {
      q: "Which cancers are particularly relevant to Zambia?",
      a: "GLOBOCAN 2022 identifies cervix uteri, breast, Kaposi sarcoma, prostate and colorectal cancer as the leading cancer sites by number of new cases among both sexes in Zambia.",
    },
    {
      q: "Can Zambian women receive cervical cancer treatment in India?",
      a: "Yes. Treatment can include surgery, chemotherapy, radiation therapy, concurrent chemoradiation and brachytherapy depending on the cancer stage.",
    },
    {
      q: "Can Zambian patients receive breast cancer treatment in India?",
      a: "Yes. Treatment can include breast surgery, chemotherapy, radiation therapy, hormone therapy, HER2-directed treatment and other systemic treatments depending on the tumour.",
    },
    {
      q: "Can Zambian patients receive prostate cancer treatment in India?",
      a: "Yes. Indian urology and uro-oncology centres provide diagnosis and treatment for prostate cancer, including surgery, radiation and systemic therapies depending on the patient's condition.",
    },
    {
      q: "Can Zambian patients receive treatment for Kaposi sarcoma in India?",
      a: "Yes. Kaposi sarcoma can be evaluated by a multidisciplinary oncology team. GAF does not yet publish a dedicated Kaposi sarcoma page; cases are coordinated after records review.",
    },
    {
      q: "Can Zambian patients undergo IVF in India?",
      a: "International patients may seek IVF and other fertility services in India, subject to applicable medical, legal and clinic-specific requirements. GAF does not yet publish a dedicated IVF page.",
    },
    {
      q: "Can children from Zambia receive treatment in India?",
      a: "Yes. Indian tertiary hospitals provide pediatric cardiology, cardiac surgery, oncology, neurosurgery, orthopedics, gastroenterology, urology and other pediatric specialties.",
    },
    {
      q: "Which Indian cities can Zambian patients consider?",
      a: "Delhi NCR, Mumbai, Chennai, Hyderabad and Bengaluru are live GAF catalogue cities. Pune can also be considered, but this page does not link to a Pune directory because that city is not yet in the live catalogue.",
    },
    {
      q: "Which airport should I use to travel to India?",
      a: "The appropriate airport depends on the selected hospital. Delhi, Mumbai, Chennai, Hyderabad and Bengaluru are among the major international gateways.",
    },
    {
      q: "Where does the journey from Zambia usually begin?",
      a: "Many international medical journeys begin at Kenneth Kaunda International Airport in Lusaka. Patients travelling from other parts of Zambia may first travel to Lusaka or another regional airport.",
    },
    {
      q: "How long should I stay in India?",
      a: "The duration depends on the treatment. A consultation may take several days, while major surgery or complex cancer treatment may require several weeks.",
    },
    {
      q: "Should I book my flight before getting the hospital opinion?",
      a: "For planned treatment, it is generally better to receive the hospital's assessment, treatment schedule and relevant visa documentation before booking non-refundable travel.",
    },
    {
      q: "Can I get a second medical opinion from India?",
      a: "Yes. Medical records, pathology, scans and previous treatment information can be submitted for specialist review.",
    },
    {
      q: "Can GAF Healthcare help me choose an Indian hospital?",
      a: "GAF Healthcare can assist in identifying hospitals and specialists based on the patient's diagnosis, treatment requirement, location and practical preferences.",
    },
  ],
  finalCta: {
    heading: "Start Your Medical Treatment Journey from Zambia to India",
    body: "If you are from Zambia and are considering medical treatment in India, you can begin by sharing your medical records with GAF Healthcare. The case can then be assessed to identify the appropriate specialty, hospitals and doctors and determine the next steps.",
    primary: "Get a Medical Opinion",
    secondary: "Talk to a Medical Travel Expert",
    whatsappLabel: "WhatsApp +91 90443 46292",
    steps: "Get a Medical Opinion → Get Treatment Cost → Talk to a Medical Travel Expert",
  },
  disclaimer: {
    heading: "Important Medical Information",
    body: "This page provides general information about medical treatment in India for patients from Zambia. It does not replace advice from a qualified physician. Cancer statistics are population-level estimates and cannot determine an individual's diagnosis or prognosis. Treatment suitability, diagnosis, treatment plans, costs, hospital availability, visa rules, travel requirements and expected outcomes vary between patients and can change over time. Patients should obtain an individual medical opinion and verify current visa, immigration and health requirements with the relevant official authorities before travelling.",
  },
  sources: {
    heading: "Sources",
    items: [
      {
        label: "Government of India — Official e-Visa portal",
        href: ZAMBIA_OFFICIAL_LINKS.eVisa,
        detail: "Current e-Visa eligibility, including Zambia, and e-Medical / e-Medical Attendant categories.",
      },
      {
        label: "High Commission of India, Lusaka — e-Visa for India",
        href: ZAMBIA_OFFICIAL_LINKS.hciEvisa,
        detail: "Mission e-Visa page directing applicants to the official Government of India portal.",
      },
      {
        label: "High Commission of India, Lusaka — Regular visa",
        href: ZAMBIA_OFFICIAL_LINKS.hciRegular,
        detail: "Regular Medical Visa documents, including a local hospital letter, an Indian hospital letter and a yellow-fever certificate.",
      },
      {
        label: "Ministry of External Affairs, India — India–Zambia relations",
        href: ZAMBIA_OFFICIAL_LINKS.meaBrief,
        detail: "Official record of medicines, COVID assistance, cholera support, the April 2025 equipment handover and 563 operational health posts.",
      },
      {
        label: "Ministry of External Affairs, India — India–Zambia bilateral brief",
        href: ZAMBIA_OFFICIAL_LINKS.meaBrief26,
        detail: "August 2025 bilateral brief confirming the same healthcare-assistance record.",
      },
      {
        label: "IARC / WHO — GLOBOCAN 2022 Zambia fact sheet",
        href: ZAMBIA_OFFICIAL_LINKS.globocan,
        detail: "Estimated incidence, mortality, prevalence and leading cancer sites.",
      },
      {
        label: "WHO — Zambia health data overview",
        href: ZAMBIA_OFFICIAL_LINKS.whoData,
        detail: "Country-level WHO health information.",
      },
      {
        label: "Government of India — Bureau of Immigration",
        href: ZAMBIA_OFFICIAL_LINKS.boi,
        detail: "Entry and immigration instructions for travellers arriving in India.",
      },
    ],
  },
};
