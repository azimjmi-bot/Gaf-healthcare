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

export const CHAD_PAGE_PATH = "/chad/treatment-in-india";
export const CHAD_PAGE_LOCALES = ["en"] as const;
export const CHAD_LAST_REVIEWED = "2026-10-03";

export type ChadPageCopy = typeof chadPageCopyEn;

export function chadPageCopy(_locale: AppLocale): ChadPageCopy {
  return chadPageCopyEn;
}

const INDIA = "India";

export const CHAD_OFFICIAL_LINKS = {
  eVisa: "https://indianvisaonline.gov.in/evisa/tvoa.html",
  eVisaFees: "https://indianvisaonline.gov.in/evisa/eTV_revised_fee_final.pdf",
  visaOnline: "https://indianvisaonline.gov.in/visa/",
  embassy: "https://eoindjamena.gov.in/",
  embassyVisa: "https://eoindjamena.gov.in/pages/Mjk,",
  embassyVaccination: "https://eoindjamena.gov.in/pages/Mjg,",
  embassyFees: "https://eoindjamena.gov.in/pages/NTk,,",
  embassyFoc: "https://eoindjamena.gov.in/listview/ODE,",
  meaBrief: "https://www.mea.gov.in/Portal/ForeignRelation/India-Chad26.pdf",
  globocan: "https://gco.iarc.who.int/media/globocan/factsheets/populations/148-chad-fact-sheet.pdf",
  iarcToday: "https://gco.iarc.who.int/today/en/fact-sheets-populations",
  whoData: "https://data.who.int/countries/148",
  mohfwYellowFever: "https://ihpoe.mohfw.gov.in/vaccination.php",
  boi: "https://boi.gov.in",
} as const;

export const CHAD_CURATED_TREATMENT_SLUGS = [
  "prostate-cancer-treatment-in-india",
  "breast-cancer-treatment-in-india",
  "cervical-cancer-treatment-in-india",
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

export const CHAD_CANCER_TREATMENT_SLUGS = TANZANIA_CANCER_TREATMENT_SLUGS;

export const CHAD_COST_PROCEDURE_NAMES = [
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

export const CHAD_DOCTOR_SPECIALTY_SLUGS = [
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

export function resolveChadCostRows(catalog: Treatment[]) {
  return CHAD_COST_PROCEDURE_NAMES.map((name) => {
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

export function chadDoctors(doctors: Doctor[]) {
  return CHAD_DOCTOR_SPECIALTY_SLUGS.map((specialtySlug) => {
    const pool = doctors.filter((doctor) => doctor.specialtySlug === specialtySlug);
    const featured = pool.find((doctor) => doctor.featured);
    return featured ?? [...pool].sort((a, b) => a.name.localeCompare(b.name))[0];
  }).filter((row): row is Doctor => Boolean(row));
}

export const chadPageCopyEn = {
  seo: {
    title: "Medical Treatment in India for Chadian Patients",
    description:
      "Explore medical treatment in India for Chadian patients. Find specialist doctors, hospitals, treatments, indicative costs, Embassy of India N'Djamena Medical Visa guidance and support from GAF Healthcare.",
    keywords: [
      "medical treatment in India for Chadian patients",
      "medical treatment in India from Chad",
      "treatment in India for Chadian patients",
      "medical tourism from Chad to India",
      "Indian hospitals for Chadian patients",
      "Indian doctors for Chadian patients",
      "medical treatment cost in India for Chadian patients",
      "cancer treatment in India for Chadian patients",
      "cardiac treatment in India for Chadian patients",
      "medical visa India for Chadian citizens",
      "Embassy of India N'Djamena medical visa",
      "treatment in India from N'Djamena",
      "treatment in India from Chad",
    ],
  },
  breadcrumb: {
    home: "Home",
    chad: "Chad",
    page: "Treatment in India",
  },
  hero: {
    eyebrow: "Medical treatment in India for Chadian patients",
    h1: "Medical Treatment in India for Chadian Patients",
    lede:
      "For patients travelling from Chad, medical treatment abroad involves more than choosing a hospital. It requires understanding the diagnosis, finding the appropriate specialist, obtaining a treatment opinion, estimating costs, arranging the medical visa, planning travel from N'Djamena or another city, arranging accommodation and preparing for follow-up after returning home. GAF Healthcare helps Chadian patients navigate this process by connecting them with appropriate hospitals and specialist doctors in India and assisting with the practical aspects of the medical journey.",
    primaryCta: "Get a Medical Opinion",
    secondaryCta: "Explore Treatments",
    whatsappLabel: "WhatsApp +91 90443 46292",
  },
  quickAnswer: {
    intro:
      "Chadian patients can seek specialist treatment in India for a wide range of medical conditions, including:",
    treatments: [
      "Cancer",
      "Cardiac diseases",
      "Heart surgery",
      "Neurosurgery",
      "Brain and spine disorders",
      "Orthopedic conditions",
      "Knee and hip replacement",
      "Urology",
      "Gastroenterology",
      "Gastrointestinal surgery",
      "Kidney and liver disease",
      "Organ transplantation",
      "IVF and fertility treatment",
      "Pediatric conditions",
      "Complex surgical conditions",
    ],
    process:
      "The usual process begins with sharing the patient's medical records. An appropriate Indian specialist or hospital can then review the case and provide a medical opinion, recommended treatment approach and indicative estimate.",
    french:
      "For patients from Chad, French-language communication can also be an important consideration, particularly when medical records, consent documents and treatment explanations need to be understood clearly.",
    evisa:
      "Visa requirements should always be checked against the latest Government of India information before travel. India's official e-Visa system currently provides an e-Medical Visa category for eligible nationalities, but eligibility is nationality-specific and can change.",
    verify:
      "Chadian patients should therefore verify their current eligibility and application requirements on the official Indian visa portal before making travel arrangements.",
  },
  why: {
    heading: "Why Chadian Patients Consider India for Medical Treatment",
    intro:
      "Travelling from Chad to another country for medical treatment is a significant decision. Patients and families usually consider several factors at the same time: availability of specialist treatment, complexity of the medical condition, access to multidisciplinary care, diagnostic facilities, surgical options, cancer treatment capabilities, hospital infrastructure, expected treatment duration, estimated cost, medical visa requirements, travel distance, language and communication, family or attendant requirements, and follow-up after returning to Chad.",
    points: [
      "India has a large network of tertiary and quaternary hospitals across cities such as Delhi NCR, Mumbai, Chennai, Hyderabad and Bengaluru",
      "These hospitals provide care across multiple specialties, allowing international patients to seek treatment according to their individual medical needs",
      "Medical records can be reviewed before travel so the family understands the proposed pathway and indicative cost",
      "French-language assistance can help when records, consent documents and treatment explanations need to be understood clearly",
      "India should not be considered automatically appropriate for every patient — the correct destination depends on the diagnosis, urgency, available treatment options, medical fitness for travel and the specialist's assessment",
    ],
    close:
      "The right choice depends on the patient's diagnosis and treatment requirement rather than simply choosing a city or hospital name.",
  },
  relationship: {
    heading: "India–Chad Healthcare and Pharmaceutical Cooperation",
    paragraphs: [
      "India and Chad have maintained bilateral relations involving political, economic and development cooperation. India’s Ministry of External Affairs records that the first round of India–Chad Foreign Office Consultations was held on 13 February 2025 in N'Djamena. The discussions covered several areas of bilateral cooperation, including health and pharmaceuticals.",
      "The official MEA brief and the Embassy of India in N'Djamena also record earlier healthcare-related cooperation, including medicines supplied during the COVID-19 response, reciprocal recognition of COVID-19 vaccination certificates, and humanitarian medical assistance after the June 2024 ammunition-depot fire in N'Djamena.",
      "This broader healthcare relationship is relevant when considering the growing connections between India and African healthcare systems. For an individual patient, however, bilateral healthcare cooperation does not guarantee a particular treatment, hospital or clinical outcome. A patient's treatment must always be assessed on the basis of their individual medical condition.",
    ],
  },
  context: {
    heading: "Planning Treatment from Chad",
    intro:
      "Chad has its own hospitals and specialists. International treatment becomes relevant when a patient needs a particular specialist, advanced procedure, complex surgery, specialised diagnostics, multidisciplinary care or another service that is not readily available locally.",
    points: [
      "The India–Chad healthcare and pharmaceutical relationship can make Indian hospitals a familiar option, but the hospital still has to match the diagnosis.",
      "Chad is a predominantly Francophone country. French-language assistance can be useful when medical terminology, consent documents and hospital correspondence need to be understood clearly.",
      "Most international medical journeys from Chad begin at N'Djamena International Airport. Patients travelling from other parts of Chad may first travel to N'Djamena or another regional airport.",
    ],
    close:
      "The decision should be based on the patient’s individual medical requirements, discussed with the current doctor and, where appropriate, an Indian specialist after records review.",
  },
  overview: {
    heading: "Medical Treatments Available in India for Chadian Patients",
    intro:
      "India provides treatment across a broad range of specialties. The most appropriate specialty depends on the patient's diagnosis and should be determined by a qualified medical professional after reviewing the clinical information.",
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
      "Kidney and liver treatment",
      "Organ transplantation",
      "Paediatric treatment",
      "Fertility treatment",
      "Second opinions",
    ],
  },
  treatments: {
    heading: "Popular Treatment Categories for Chadian Patients",
    intro:
      "Each card links only to a live GAF specialty or treatment page. Where GAF does not yet publish a dedicated page, the category is explained without an invented URL.",
    categories: [
      {
        title: "Cancer Treatment",
        body: "Medical, surgical and radiation oncology, including prostate, breast, cervical and colorectal pathways that already have GAF guides. Liver and thyroid cancers are coordinated after records review because dedicated pages are not yet published.",
        href: "/treatments/prostate-cancer-treatment-in-india",
        hrefLabel: "Prostate cancer treatment in India",
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
        body: "Complex abdominal and HPB surgery, including Whipple and HIPEC where clinically appropriate. Liver-cancer evaluation is arranged after records review.",
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
        body: "Chadian couples may consider India for infertility evaluation and assisted reproductive treatment. GAF does not yet publish a dedicated IVF page. Eligibility, protocols and applicable Indian regulations should be confirmed with the treating fertility centre before travel. Language support can be particularly useful when discussing complex fertility plans.",
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
          { label: "Blood Cancer", href: "/treatments/leukemia-treatment-in-india" },
          { label: "Liver Cancer", href: "" },
          { label: "Thyroid Cancer", href: "" },
          { label: "Lung Cancer", href: "" },
          { label: "Kidney Cancer", href: "/treatments/radical-nephrectomy-in-india" },
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
    heading: "Cancer Treatment in India for Chadian Patients",
    intro:
      "Cancer is an important area for international specialist care. According to the IARC GLOBOCAN 2022 Chad fact sheet, the country had an estimated 18,655 new cancer cases, 12,047 cancer deaths and 26,129 five-year prevalent cases. These are GLOBOCAN 2022 estimates, not current 2026 case counts, and they should not be used to diagnose an individual patient.",
    body: "The same official fact sheet ranks prostate first among estimated new cases in both sexes (3,340; 17.9%), followed by breast (3,103; 16.6%), cervix uteri (2,348; 12.6%) and liver (2,064; 11.1%). Among Chadian men, prostate cancer was the leading site by number of new cases. Among Chadian women, cervical cancer was the leading cancer, followed by breast cancer. GAF does not yet publish dedicated liver-cancer, thyroid-cancer or lung-cancer pages; those cases are coordinated through the relevant oncology or hepatobiliary team after records review.",
    modalities: [
      { label: "Prostate Cancer", href: "/treatments/prostate-cancer-treatment-in-india" },
      { label: "Breast Cancer", href: "/treatments/breast-cancer-treatment-in-india" },
      { label: "Cervical Cancer", href: "/treatments/cervical-cancer-treatment-in-india" },
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
    heading: "Medical Treatment Cost in India for Chadian Patients",
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
    heading: "Major Indian Cities for Chadian Patients",
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
    heading: "Hospitals in India for Chadian Patients",
    intro:
      "Choose the hospital for the specific condition, the specialist, the required technology, international-patient support and a clear written estimate. The campuses below are drawn from GAF’s live India catalogue, one from each published city.",
    directoryLabel: "Browse hospitals in India",
  },
  doctors: {
    heading: "Specialist Doctors in India for Chadian Patients",
    intro:
      "The specialist should be matched to the patient's diagnosis. A prostate-cancer patient may need a urologist or uro-oncologist, a medical oncologist and a radiation oncologist. The specialists below are taken from GAF’s live doctor catalogue.",
    directoryLabel: "Browse doctors in India",
  },
  visa: {
    heading: "Medical Visa for Chadian Patients Travelling to India",
    intro:
      "The Government of India’s current official e-Visa fee list does not include Chad. Chadian patients should therefore not assume that the online e-Medical Visa route is available. The appropriate route is generally the regular Medical Visa through the Embassy of India in N'Djamena, subject to the current rules and documentation requirements.",
    points: [
      "The Embassy of India in N'Djamena directs applicants to complete the online Indian visa form and then present the printed, signed application with the required documents.",
      "Its published Medical Visa checklist asks for a typed referral letter from a well-reputed hospital or medical institute in Chad, a typed invitation letter from the Indian hospital specifying the nature of treatment and the start and end dates, and a certified bank statement covering the last three months or a sponsor affidavit.",
      "The Indian hospital is asked to email the invitation to the embassy consular addresses published on the visa page. The applicant should attach a printout of the invitation and the email with the application.",
      "Patients should attach copies of treatment already received in Chad, including CT, MRI or X-ray reports where applicable. Transplant patients are asked to produce a compatibility report of the donor and patient.",
      "The embassy publishes Medical Visa and Medical Attendant Visa fees separately. Confirm the live fee, currency and submission instructions before applying.",
    ],
    disclaimer:
      "Visa rules, fees, documents and entry regulations can change. Verify the current official Indian visa portal and the Embassy of India in N'Djamena before applying or travelling.",
    documentsHeading: "Documents for an Indian Medical Visa from Chad",
    documents: [
      "Original passport valid for a minimum of six months, with at least two blank pages",
      "Photocopy of the passport data page and two recent 50 mm × 50 mm photographs",
      "Printed, signed online visa application using the applicant’s own contact details and email",
      "Typed referral letter from a well-reputed hospital or medical institute in Chad",
      "Typed Indian hospital invitation specifying the treatment and the start and end dates",
      "Certified three-month bank statement or sponsor affidavit with identity documents",
      "Copies of treatment already received in Chad, including imaging reports where applicable",
      "Previous Indian hospital papers and discharge summaries for follow-up treatment",
      "Attendant documents where a family member will travel",
    ],
    documentsNote:
      "The Embassy of India in N'Djamena publishes the current Medical Visa checklist. Patients should use those official instructions rather than relying on an old checklist found elsewhere online.",
  },
  yellowFever: {
    heading: "Yellow Fever and Polio Requirements for Chadian Travellers",
    intro:
      "Yellow fever documentation deserves particular attention for patients travelling from Chad. Chad is listed by WHO among countries with a risk of yellow-fever transmission, and India’s Ministry of Health lists Chad among yellow-fever endemic countries for entry screening.",
    points: [
      "The Embassy of India in N'Djamena states that yellow-fever vaccination is compulsory for travel to India, except for infants under six months.",
      "India’s IHR points-of-entry guidance requires travellers arriving from yellow-fever endemic countries to carry a valid yellow-fever vaccination certificate issued by an authorised centre.",
      "The embassy also states that all Chadian nationals visiting India require proof of polio vaccination: at least one dose of bivalent oral polio vaccine (bOPV) or inactivated polio vaccine (IPV) within the previous 12 months, administered not less than four weeks before arrival.",
      "Address vaccination documents early. An avoidable documentation issue at the border can complicate a planned medical journey.",
    ],
    close:
      "Confirm the current yellow-fever, polio and other health-entry requirements with the Embassy of India in N'Djamena, India’s Bureau of Immigration and the Ministry of Health IHR guidance before booking flights.",
  },
  french: {
    heading: "French-Language Medical Support for Chadian Patients",
    intro:
      "Chad is a predominantly Francophone country, making communication an important part of the international medical journey. Medical terminology can be difficult to understand even when a patient speaks some English.",
    points: [
      "Translating medical reports",
      "Understanding hospital correspondence",
      "Appointment communication",
      "Treatment explanations",
      "Consent documentation",
      "Cost estimates",
      "Travel coordination",
      "Accommodation information",
      "Follow-up instructions",
    ],
    close:
      "Medical documents should be translated accurately rather than relying on informal translation for important clinical decisions. Where possible, the patient should receive written treatment information that can be shared with family members and the treating doctor in Chad.",
  },
  travel: {
    heading: "Travelling from Chad to India for Medical Treatment",
    intro:
      "Most international medical journeys from Chad begin from N'Djamena. The main international gateway is N'Djamena International Airport (NDJ). Depending on the date and airline schedule, travel to India may require a connecting flight.",
    points: [
      "Possible connection points can vary according to airline schedules and operational availability.",
      "The most practical Indian arrival airport depends on the hospital selected for treatment.",
      "Flight schedules should be checked close to the planned travel date because routes and connections can change.",
      "For planned treatment, it is generally better to receive the hospital's assessment, treatment schedule and relevant visa documentation before booking non-refundable travel.",
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
    heading: "Documents Chadian Patients Should Prepare",
    intro:
      "A medical-travel file should contain both physical and digital copies. For cancer patients, pathology and actual imaging are particularly important. For cardiac patients, angiography images and echocardiography reports help the specialist assess the case.",
    general: [
      "Diagnosis, medical summary, blood tests and imaging",
      "CT, MRI, PET scans and pathology or biopsy reports",
      "Previous operative reports, discharge summaries and current medicines",
      "Previous chemotherapy and radiation records where relevant",
      "Valid Chadian passport, visa documents and Indian hospital correspondence",
      "Treatment estimate, attendant documents and Chad hospital referral where applicable",
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
    heading: "Food, Language and Accommodation for Chadian Patients",
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
    food: "For Chadian families, it may also be useful to identify accommodation where meals can be prepared according to familiar dietary preferences.",
    language:
      "French-language support can help reduce misunderstandings. Important medical instructions should be provided in writing whenever possible so they can be shared with family members and the treating doctor in Chad.",
  },
  stay: {
    heading: "How Long Should a Chadian Patient Stay in India?",
    intro:
      "The required stay depends on the treatment. These are planning estimates rather than guarantees. The treating hospital should provide a more specific expected duration after evaluating the patient.",
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
    heading: "The Medical Journey from Chad to India",
    intro:
      "A patient should ideally not travel internationally without understanding the basic treatment pathway. A records-first sequence allows many questions to be addressed before leaving N'Djamena.",
    steps: [
      { title: "Share medical records", body: "Send the diagnosis, medical summary, blood tests, imaging, pathology, previous treatment and current medicines." },
      { title: "Identify the correct specialty", body: "The case is mapped to the relevant specialty — for example prostate cancer to urology or uro-oncology, and liver cancer to medical, surgical or hepatobiliary teams." },
      { title: "Obtain a medical opinion", body: "The selected Indian hospital or specialist reviews the medical records. Additional investigations may be recommended." },
      { title: "Review treatment options", body: "Compare the hospital, doctor, treatment plan, indicative cost, expected stay, city and follow-up requirements." },
      { title: "Obtain hospital documentation", body: "The hospital can provide the invitation letter and treatment documentation required for the Embassy of India in N'Djamena." },
      { title: "Complete visa formalities", body: "Follow the current regular Medical Visa process through the Embassy of India in N'Djamena and verify the latest official Indian visa rules." },
      { title: "Arrange travel", body: "Flights, accommodation and airport transfers can be planned around the expected hospital admission date." },
      { title: "Hospital admission and treatment", body: "The patient undergoes the recommended investigations and treatment after assessment and consent." },
      { title: "Recovery", body: "Obtain the discharge summary, investigation reports, operative notes, pathology, medication list and follow-up instructions." },
      { title: "Return to Chad", body: "Travel home only after the treating doctor clears the patient to fly." },
      { title: "Follow-up", body: "Ask which reports should be repeated and whether selected reviews can continue remotely." },
      { title: "Keep the records", body: "Carry complete discharge and follow-up documents for any later review in Chad or India." },
    ],
  },
  help: {
    heading: "How GAF Healthcare Supports Chadian Patients",
    intro:
      "GAF Healthcare can assist patients from Chad with the practical process of seeking medical treatment in India. The exact services available should be confirmed before travel.",
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
      "French-language assistance where available",
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
      "A preliminary review from N'Djamena can help clarify the specialty, whether further information is required, potential treatment and hospital options, indicative cost and expected stay.",
    questions: [
      "What is the diagnosis, and does pathology need review?",
      "What treatment is recommended, and are there alternatives?",
      "Who will perform the procedure, and what investigations are required?",
      "What is included in the estimate — medicines, implants, ICU and investigations?",
      "How long should the patient remain in India, and when is it safe to fly home?",
      "Can follow-up be coordinated after returning to Chad?",
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
      "Prostate cancer → urologist or uro-oncologist, radiation oncologist, medical oncologist where required",
      "Cervical cancer → gynaecologic or surgical oncologist, medical oncologist, radiation oncologist",
      "Liver cancer → hepatobiliary or surgical oncologist, medical oncologist, transplant team where selected",
      "Heart blockage → cardiologist, interventional cardiologist, cardiac surgeon where required",
      "Brain tumour → neurosurgeon, and medical or radiation oncology where appropriate",
    ],
  },
  faqHeading: "Frequently Asked Questions",
  faqs: [
    {
      q: "Can Chadian patients travel to India for medical treatment?",
      a: "Yes. Chadian patients can seek planned medical treatment in India, subject to the applicable Indian visa, immigration and health requirements.",
    },
    {
      q: "Is there an e-Medical Visa for Chadian patients?",
      a: "India's e-Visa system provides an e-Medical Visa category for eligible nationalities. Chad is not currently included in the Government of India's official e-Visa fee list, so Chadian patients should verify their current nationality-specific eligibility on the official portal and generally plan for a regular Medical Visa through the Embassy of India in N'Djamena.",
    },
    {
      q: "How do Chadian patients apply for an Indian Medical Visa?",
      a: "The Embassy of India in N'Djamena publishes a Medical Visa checklist. Applicants complete the online Indian visa form and then submit the printed application with a Chad hospital referral, an Indian hospital invitation, financial documents and supporting medical records.",
    },
    {
      q: "Can a family member accompany a Chadian medical patient?",
      a: "The applicable medical-attendant visa rules determine who can accompany a patient. The Embassy of India in N'Djamena publishes Medical Attendant Visa fees and asks the Indian hospital invitation to identify attendants. Confirm the current rules when applying.",
    },
    {
      q: "How much does medical treatment in India cost for Chadian patients?",
      a: "There is no fixed price. The cost depends on the diagnosis, hospital, doctor, procedure, medicines, investigations, implants, room category, ICU requirements and duration of stay.",
    },
    {
      q: "Can I get a treatment estimate before travelling from Chad?",
      a: "Yes. A hospital can review the patient's medical records and provide an indicative treatment estimate before travel.",
    },
    {
      q: "What documents should I send for a medical opinion?",
      a: "Send the medical summary, diagnosis, blood tests, imaging reports, actual scans where available, pathology, previous treatment records and current medications.",
    },
    {
      q: "Can I get a second opinion in India?",
      a: "Yes. Medical records can be submitted to an Indian specialist for a second opinion before deciding whether to travel.",
    },
    {
      q: "Which Indian cities can Chadian patients consider?",
      a: "Delhi NCR, Mumbai, Chennai, Hyderabad, Bengaluru and Pune are among the major Indian healthcare centres that may be considered depending on the treatment requirement. This page links city directories only for live GAF catalogue cities.",
    },
    {
      q: "Which treatments are commonly relevant for Chadian patients?",
      a: "Potential treatment areas include oncology, cardiology, neurosurgery, orthopedics, urology, gastroenterology, fertility, pediatric medicine and transplantation.",
    },
    {
      q: "Can Chadian patients receive cancer treatment in India?",
      a: "Yes. Indian cancer centres provide surgery, chemotherapy, radiation therapy, immunotherapy, targeted therapy, hormone therapy and other cancer treatments depending on the patient's diagnosis.",
    },
    {
      q: "Can prostate cancer patients from Chad receive treatment in India?",
      a: "Yes. Indian urology and uro-oncology centres provide diagnosis and treatment for prostate cancer, including surgery, radiation and systemic treatment depending on the stage and characteristics of the cancer.",
    },
    {
      q: "Can Chadian women receive cervical cancer treatment in India?",
      a: "Yes. Treatment may include surgery, chemotherapy, radiation therapy, chemoradiation and brachytherapy depending on the stage.",
    },
    {
      q: "Can Chadian patients receive liver cancer treatment in India?",
      a: "Yes. Liver cancer can be evaluated by hepatobiliary, surgical-oncology and medical-oncology teams. GAF does not yet publish a dedicated liver-cancer page; cases are coordinated after records review.",
    },
    {
      q: "Can Chadian patients receive IVF in India?",
      a: "International patients may seek IVF and other fertility services in India, subject to applicable medical, legal and clinic-specific requirements. GAF does not yet publish a dedicated IVF page.",
    },
    {
      q: "Can children from Chad receive treatment in India?",
      a: "Yes. Indian tertiary hospitals provide paediatric care across areas such as cardiology, cardiac surgery, oncology, neurosurgery, orthopedics, gastroenterology and urology.",
    },
    {
      q: "Do Chadian patients need French-language support?",
      a: "Not necessarily, but French-language assistance can be useful because Chad is predominantly Francophone and medical terminology can be difficult to understand in a second language.",
    },
    {
      q: "What airport should I use to travel to India?",
      a: "The appropriate Indian airport depends on the hospital. Delhi, Mumbai, Chennai, Hyderabad and Bengaluru are among the major international gateways used for medical travel.",
    },
    {
      q: "Where do patients from Chad normally start their journey?",
      a: "International travel commonly begins from N'Djamena International Airport, although patients from other parts of Chad may first travel to N'Djamena or another regional airport before beginning their international journey.",
    },
    {
      q: "Do Chadian patients need a yellow fever vaccination certificate?",
      a: "Travellers arriving from yellow-fever-risk countries may be subject to India's yellow fever documentation requirements. The Embassy of India in N'Djamena currently states that yellow-fever vaccination is compulsory for travel to India, except for infants under six months. Patients travelling from Chad should verify the latest Indian health and immigration requirements before departure.",
    },
    {
      q: "Do Chadian patients need a polio vaccination certificate?",
      a: "The Embassy of India in N'Djamena currently states that all Chadian nationals visiting India require proof of polio vaccination with at least one dose of bOPV or IPV within the previous 12 months, administered not less than four weeks before arrival. Confirm the live embassy note before travel.",
    },
    {
      q: "How long should I stay in India?",
      a: "The duration depends on the treatment. A consultation may take several days, while major surgery, cancer treatment or complex procedures may require several weeks.",
    },
    {
      q: "Should I book my flight before receiving the hospital opinion?",
      a: "For planned treatment, it is generally better to receive the hospital's medical assessment, proposed treatment schedule and relevant visa documentation before booking non-refundable travel.",
    },
    {
      q: "Can GAF Healthcare help me choose an Indian hospital?",
      a: "GAF Healthcare can assist in identifying relevant hospitals and specialists based on the patient's condition, treatment requirement, location and practical preferences.",
    },
  ],
  finalCta: {
    heading: "Start Your Medical Treatment Journey from Chad to India",
    body: "If you are from Chad and are considering treatment in India, you can begin by sharing your medical records. GAF Healthcare can help identify the appropriate specialty, hospitals and doctors and coordinate the next steps of the medical-travel process.",
    primary: "Get a Medical Opinion",
    secondary: "Talk to a Medical Travel Expert",
    whatsappLabel: "WhatsApp +91 90443 46292",
    steps: "Get a Medical Opinion → Get Treatment Cost → Talk to a Medical Travel Expert",
  },
  disclaimer: {
    heading: "Important Medical Information",
    body: "This page provides general information about medical treatment in India for patients from Chad. It does not replace advice from a qualified physician. Cancer statistics are population-level estimates and cannot determine an individual's diagnosis or prognosis. Treatment suitability, diagnosis, treatment plans, costs, hospital availability, visa rules, vaccination requirements, travel conditions and expected outcomes vary between patients and can change over time. Patients should obtain an individual medical opinion and verify current visa, immigration and health requirements with the relevant official authorities before travelling.",
  },
  sources: {
    heading: "Sources",
    items: [
      {
        label: "Government of India — Official e-Visa portal",
        href: CHAD_OFFICIAL_LINKS.eVisa,
        detail: "Current e-Visa eligibility and e-Medical / e-Medical Attendant categories. Chad is not listed on the current official e-Visa fee table.",
      },
      {
        label: "Government of India — Country/territory-wise e-Visa fee list",
        href: CHAD_OFFICIAL_LINKS.eVisaFees,
        detail: "Official fee table used to confirm that Chad is not currently among e-Visa eligible countries.",
      },
      {
        label: "Embassy of India, N'Djamena — Visa types and Medical Visa checklist",
        href: CHAD_OFFICIAL_LINKS.embassyVisa,
        detail: "Referral letter, Indian hospital invitation, bank statement and supporting medical-record requirements.",
      },
      {
        label: "Embassy of India, N'Djamena — Vaccination requirements",
        href: CHAD_OFFICIAL_LINKS.embassyVaccination,
        detail: "Yellow-fever vaccination and polio vaccination notes for Chadian travellers to India.",
      },
      {
        label: "Embassy of India, N'Djamena — India–Chad Foreign Office Consultations",
        href: CHAD_OFFICIAL_LINKS.embassyFoc,
        detail: "First FOC held on 13 February 2025 in N'Djamena, covering health and pharmaceuticals.",
      },
      {
        label: "Ministry of External Affairs, India — India–Chad relations",
        href: CHAD_OFFICIAL_LINKS.meaBrief,
        detail: "Official bilateral brief confirming the February 2025 FOC and earlier healthcare-related cooperation.",
      },
      {
        label: "IARC / WHO — GLOBOCAN 2022 Chad fact sheet",
        href: CHAD_OFFICIAL_LINKS.globocan,
        detail: "Estimated 18,655 new cases, 12,047 deaths and 26,129 five-year prevalent cases, with prostate, breast, cervix and liver as leading sites.",
      },
      {
        label: "WHO — Chad health data overview",
        href: CHAD_OFFICIAL_LINKS.whoData,
        detail: "Country-level WHO health information.",
      },
      {
        label: "Ministry of Health and Family Welfare, India — IHR yellow-fever vaccination",
        href: CHAD_OFFICIAL_LINKS.mohfwYellowFever,
        detail: "India’s yellow-fever endemic-country list, which includes Chad, and certificate requirements.",
      },
      {
        label: "Government of India — Bureau of Immigration",
        href: CHAD_OFFICIAL_LINKS.boi,
        detail: "Entry and immigration instructions for travellers arriving in India.",
      },
    ],
  },
};
