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

export const SOUTH_SUDAN_PAGE_PATH = "/south-sudan/treatment-in-india";
export const SOUTH_SUDAN_PAGE_LOCALES = ["en"] as const;
export const SOUTH_SUDAN_LAST_REVIEWED = "2026-10-03";

export type SouthSudanPageCopy = typeof southSudanPageCopyEn;

export function southSudanPageCopy(_locale: AppLocale): SouthSudanPageCopy {
  return southSudanPageCopyEn;
}

const INDIA = "India";

export const SOUTH_SUDAN_OFFICIAL_LINKS = {
  eVisa: "https://indianvisaonline.gov.in/evisa/tvoa.html",
  visaOnline: "https://indianvisaonline.gov.in/visa/",
  embassyVisa: "https://www.indembjuba.gov.in/page/indian-visa/",
  embassyRequirements: "https://www.indembjuba.gov.in/page/visa-requirements/",
  embassyOnline: "https://www.indembjuba.gov.in/page/apply-online-for-indian-visa/",
  embassyContact: "https://www.indembjuba.gov.in/page/contact-detail/",
  meaBrief: "https://www.mea.gov.in/Portal/ForeignRelation/India-South_Sudan26.pdf",
  meaJan2025: "https://www.mea.gov.in/Portal/ForeignRelation/India-South-Sudan-Jan-2025.pdf",
  boiHealth: "https://www.boi.gov.in/content/health-regulation",
  globocan: "https://gco.iarc.who.int/media/globocan/factsheets/populations/728-south-sudan-fact-sheet.pdf",
  iarcToday: "https://gco.iarc.who.int/today/en/fact-sheets-populations",
  whoAhspr:
    "https://www.afro.who.int/sites/default/files/2025-12/South%20Sudan%20Annual%20health%20sector%20performance%20report_%282024_25%29%20%281%29.pdf",
  whoAnnual: "https://www.afro.who.int/countries/south-sudan/publication/who-south-sudan-annual-report-2025-0",
  whoWorkforce:
    "https://www.afro.who.int/sites/default/files/2026-09/Knowledge%20Management%20Series%20for%20Health%20-The%20Health%20Workforce%20Gap%20A%20Barrier%20to%20Universal%20Health%20Coverage%20in%20South%20Sudan.pdf",
  whoData: "https://data.who.int/countries/728",
} as const;

export const SOUTH_SUDAN_CURATED_TREATMENT_SLUGS = [
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

export const SOUTH_SUDAN_CANCER_TREATMENT_SLUGS = TANZANIA_CANCER_TREATMENT_SLUGS;

export const SOUTH_SUDAN_COST_PROCEDURE_NAMES = [
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

export const SOUTH_SUDAN_DOCTOR_SPECIALTY_SLUGS = [
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

export function resolveSouthSudanCostRows(catalog: Treatment[]) {
  return SOUTH_SUDAN_COST_PROCEDURE_NAMES.map((name) => {
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

export function southSudanDoctors(doctors: Doctor[]) {
  return SOUTH_SUDAN_DOCTOR_SPECIALTY_SLUGS.map((specialtySlug) => {
    const pool = doctors.filter((doctor) => doctor.specialtySlug === specialtySlug);
    const featured = pool.find((doctor) => doctor.featured);
    return featured ?? [...pool].sort((a, b) => a.name.localeCompare(b.name))[0];
  }).filter((row): row is Doctor => Boolean(row));
}

export const southSudanPageCopyEn = {
  seo: {
    title: "Medical Treatment in India for South Sudanese Patients",
    description:
      "Explore medical treatment in India for South Sudanese patients. Find specialist doctors, hospitals, treatments, indicative costs, Medical Visa guidance and support from GAF Healthcare.",
    keywords: [
      "medical treatment in India for South Sudanese patients",
      "medical treatment in India from South Sudan",
      "treatment in India for South Sudanese patients",
      "medical tourism from South Sudan to India",
      "India medical treatment for South Sudanese",
      "Indian hospitals for South Sudanese patients",
      "Indian doctors for South Sudanese patients",
      "medical treatment cost in India for South Sudanese patients",
      "cancer treatment in India for South Sudanese patients",
      "cardiac treatment in India for South Sudanese patients",
      "neurosurgery in India for South Sudanese patients",
      "IVF in India for South Sudanese patients",
      "medical visa India for South Sudanese citizens",
      "Indian Medical Visa for South Sudan",
      "treatment in India from Juba",
      "Juba to India medical treatment",
    ],
  },
  breadcrumb: {
    home: "Home",
    southSudan: "South Sudan",
    page: "Treatment in India",
  },
  hero: {
    eyebrow: "Medical treatment in India for South Sudanese patients",
    h1: "Medical Treatment in India for South Sudanese Patients",
    lede:
      "South Sudanese patients travel to India for diagnosis, advanced treatment, surgery and specialist medical care. The most important decision is identifying the appropriate specialist, confirming the diagnosis, understanding the treatment options, obtaining a realistic cost estimate and planning the medical journey before travelling. GAF Healthcare helps coordinate this process with hospitals and doctors in India.",
    primaryCta: "Get a Medical Opinion",
    secondaryCta: "Explore Treatments",
    whatsappLabel: "WhatsApp +91 90443 46292",
  },
  quickAnswer: [
    {
      question: "Can South Sudanese patients travel to India for medical treatment?",
      answer:
        "Yes. South Sudanese patients regularly travel to India for diagnosis and treatment. India's Ministry of External Affairs specifically identifies medical tourism from South Sudan to India as an established area of travel.",
    },
    {
      question: "What treatments can South Sudanese patients receive in India?",
      answer:
        "Depending on the diagnosis, patients can seek cancer treatment, cardiac care, neurosurgery, orthopaedic surgery, urology, gastrointestinal surgery, kidney treatment, IVF and fertility care, paediatric treatment, transplant evaluation and many other specialties.",
    },
    {
      question: "Do South Sudanese citizens need a medical visa?",
      answer:
        "A South Sudanese patient travelling to India for treatment should obtain the appropriate Indian Medical Visa. South Sudan does not appear on the current Government of India's e-Visa eligible-country list, so patients should not assume that an e-Medical Visa is available to them. Visa requirements should be confirmed with the relevant Indian diplomatic mission before travel.",
    },
    {
      question: "Where do South Sudanese patients commonly seek treatment in India?",
      answer:
        "Major medical destinations include Delhi NCR, Mumbai, Chennai, Bengaluru and Hyderabad. India's MEA specifically identifies Delhi, Gurugram, Mumbai, Bengaluru, Chennai and Hyderabad among destinations used by South Sudanese medical travellers.",
    },
    {
      question: "How much does treatment in India cost?",
      answer:
        "There is no single price for a treatment. The final cost depends on the diagnosis, hospital, doctor, procedure, medicines, implants, investigations, ICU requirements, length of stay and complications. GAF Healthcare can help obtain a hospital-specific estimate after reviewing the patient's medical records.",
    },
  ] satisfies QuickAnswerItem[],
  why: {
    heading: "Why South Sudanese Patients Consider India for Medical Treatment",
    intro:
      "Choosing another country for healthcare is a significant decision. Patients and families usually want clarity about the diagnosis, treatment plan, expected hospital stay, total cost and logistics before travelling. India’s Ministry of External Affairs notes that South Sudanese patients travel to India for diagnosis and treatment and identifies several Indian healthcare cities used by these patients.",
    points: [
      "India has a large tertiary and quaternary healthcare ecosystem, so a specific medical problem can be matched to a specialty, subspecialty, treatment and doctor",
      "The Government of India’s bilateral brief records that the number of medical visas issued to South Sudanese nationals has been increasing",
      "Patients can obtain a specialist opinion and an indicative hospital estimate before booking international travel",
      "Delhi NCR, Mumbai, Chennai, Bengaluru and Hyderabad all have specialist hospitals in GAF’s live catalogue",
      "International treatment is not automatically the right option for every patient — the decision should follow the individual medical condition",
    ],
    close:
      "GAF Healthcare helps patients understand their options and connect medical requirements with suitable hospitals and specialists in India. A hospital should be chosen for the diagnosis, not for the country name alone.",
  },
  relationship: {
    heading: "India–South Sudan Healthcare Relationship",
    paragraphs: [
      "The India–South Sudan medical relationship is already established. India’s Ministry of External Affairs states that South Sudanese patients travel to India for diagnosis and treatment and that the number of medical visas issued to South Sudanese nationals has been increasing.",
      "The same official bilateral brief records that the Indian Embassy issued 2,556 medical visas to South Sudanese nationals during calendar year 2025. It identifies Delhi, Gurugram, Mumbai, Bengaluru, Chennai and Hyderabad among the Indian healthcare destinations used by these patients.",
      "The brief also records a six-week artificial-limb (Jaipur Foot) fitment camp organised by MEA at Juba Military Hospital in June–July 2022. That documented relationship does not mean every South Sudanese patient should travel, or that India is automatically the right destination for every diagnosis.",
    ],
  },
  context: {
    heading: "South Sudan’s Healthcare Context",
    intro:
      "South Sudan’s healthcare system operates in a challenging environment, with access to care affected by humanitarian emergencies, infrastructure limitations, workforce shortages and economic constraints. These facts describe the health-system setting. They do not diagnose an individual patient.",
    points: [
      "The South Sudan Annual Health Sector Performance Report 2024/25, published with WHO support, reports that approximately 56% of the population lives within 5 km of a health facility.",
      "The same report records health workforce density at 7.9 health workers per 10,000 population, below the national target and far below the WHO SDG benchmark of 44.5.",
      "WHO’s 2025 South Sudan reporting also highlights continuing constraints in providing access to essential health services and medicines amid humanitarian pressures.",
    ],
    close:
      "This does not mean every South Sudanese patient needs treatment abroad. International treatment may be considered when a patient needs a particular specialist, advanced procedure, complex surgery, specialised diagnostics, multidisciplinary care or another service that is not readily available or accessible locally. The decision should be based on the patient’s individual medical requirements.",
  },
  overview: {
    heading: "Medical Treatment in India for Patients from South Sudan",
    intro:
      "For a South Sudanese patient, travelling to India is about more than selecting a hospital. The process usually involves obtaining a medical opinion, identifying the appropriate specialist, understanding treatment options, receiving a hospital estimate, arranging the Medical Visa, planning travel from Juba and coordinating the stay in India. Depending on the diagnosis, patients may consider India for the specialties below.",
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
    heading: "Popular Treatment Categories for South Sudanese Patients",
    intro:
      "Each card links only to a live GAF specialty or treatment page. Where GAF does not yet publish a dedicated page, the category is explained without an invented URL.",
    categories: [
      {
        title: "Cancer Treatment",
        body: "Medical, surgical and radiation oncology, including breast, cervical, prostate and colorectal pathways that already have GAF guides.",
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
        body: "Paediatric cardiology and cardiac surgery, oncology, neurosurgery and related children’s services arranged with a paediatric team. Children should travel with complete vaccination, imaging and previous treatment records.",
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
        body: "South Sudanese couples may consider India for infertility evaluation and assisted reproductive treatment, including IUI, IVF, ICSI and selected PGT cases. GAF does not yet publish a dedicated IVF page. Eligibility, protocols and applicable Indian regulations should be confirmed with the treating fertility centre before travel.",
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
          { label: "Pancreatic Cancer", href: "/treatments/pancreatic-cancer-treatment-in-india" },
          { label: "Ovarian Cancer", href: "/treatments/ovarian-cancer-treatment-in-india" },
          { label: "Brain Tumour", href: "/treatments/brain-tumor-surgery-in-india" },
          { label: "Blood Cancer", href: "/treatments/leukemia-treatment-in-india" },
          { label: "Liver Cancer", href: "" },
          { label: "Rectal Cancer", href: "" },
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
          { label: "PCOS-related infertility", href: "" },
        ],
      },
    ],
  },
  cancer: {
    heading: "Cancer Treatment in India for South Sudanese Patients",
    intro:
      "Cancer is an important consideration for South Sudanese patients seeking specialist treatment abroad. According to the IARC GLOBOCAN 2022 South Sudan fact sheet, the country had an estimated 8,124 new cancer cases, 5,218 cancer deaths and 11,645 five-year prevalent cases. These are population-level estimates and should not be used to diagnose an individual patient.",
    body: "The same official fact sheet ranks breast first among estimated new cases in both sexes (1,760; 21.7%), followed by cervix uteri (890; 11.0%), prostate (629; 7.7%), colorectum (564; 6.9%) and liver (393; 4.8%). Among women, breast and cervical cancers accounted for the largest numbers of estimated new cases. Among men, prostate cancer was the leading site, followed by colorectal and liver cancers. GAF does not yet publish dedicated liver-cancer, rectal-cancer or lung-cancer pages; those cases are coordinated through the relevant oncology team after records review.",
    modalities: [
      { label: "Breast Cancer", href: "/treatments/breast-cancer-treatment-in-india" },
      { label: "Cervical Cancer", href: "/treatments/cervical-cancer-treatment-in-india" },
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
    heading: "Medical Treatment Cost in India for South Sudanese Patients",
    intro:
      "There is no universal cost of treatment in India. Two patients undergoing the same named procedure can have substantially different final bills because the clinical circumstances may be different. GAF Healthcare presents costs as indicative planning estimates, not guaranteed final prices.",
    factors: [
      "Diagnosis and disease stage",
      "Treatment protocol and procedure complexity",
      "Doctor and hospital",
      "Robotic or minimally invasive technology",
      "Implants, medicines and diagnostic tests",
      "ICU requirements and hospital stay",
      "Complications, rehabilitation and follow-up",
    ],
    tableIntro:
      "The ranges below are GAF Healthcare planning figures from the live cost catalogue. They are not hospital quotations. Ask the hospital which items are included.",
    disclaimer:
      "A preliminary quotation is based on the information available before treatment. The final treatment plan and cost may change after clinical examination, investigations, medicines, implants, ICU need, length of stay and complications.",
    ctaLabel: "Get a treatment-cost review on WhatsApp",
  },
  extraBudget: {
    heading: "Expenses That May Be Additional",
    intro:
      "The hospital bill is only one component of the overall medical-travel budget. International patients should also budget for items that are often outside the hospital estimate.",
    items: [
      "Visa fees and international flights",
      "Accommodation outside the hospital, food and local transportation",
      "Attendant expenses",
      "Additional investigations, special medicines and implants",
      "Extended ICU care, complications and extended accommodation",
      "Rehabilitation and follow-up consultations",
    ],
    close:
      "Request a written estimate and ask the hospital to clarify inclusions and exclusions before travel. A hospital estimate should not be confused with the patient’s total international medical-travel budget.",
  },
  cities: {
    heading: "Major Indian Cities for South Sudanese Patients",
    intro:
      "India does not have one single medical capital. The right city depends on the treatment, specialist and hospital. India’s MEA identifies Delhi, Gurugram, Mumbai, Bengaluru, Chennai and Hyderabad among destinations used by South Sudanese medical travellers. GAF’s live catalogue covers these five published cities.",
    items: [
      {
        name: "Delhi NCR",
        body: "Delhi and Gurugram form one of India’s largest tertiary-care clusters, covering cancer, cardiology, cardiac surgery, neurosurgery, orthopaedics, transplantation, gastroenterology, urology, IVF and paediatric specialties. Useful when a family wants to compare more than one hospital in the same region.",
        city: "Delhi NCR",
        catalog: true,
      },
      {
        name: "Mumbai",
        body: "A major centre for oncology, cardiology, neurosurgery, transplantation, orthopaedics, GI surgery, urology and advanced diagnostics. Also an important international arrival point.",
        city: "Mumbai",
        catalog: true,
      },
      {
        name: "Chennai",
        body: "An established destination for cancer, cardiology, cardiac surgery, neurosurgery, orthopaedics, transplantation, paediatric care and gastrointestinal surgery.",
        city: "Chennai",
        catalog: true,
      },
      {
        name: "Bengaluru",
        body: "Tertiary and quaternary care across oncology, cardiology, neurosurgery, orthopaedics, urology, gastroenterology, fertility treatment and paediatric care.",
        city: "Bengaluru",
        catalog: true,
      },
      {
        name: "Hyderabad",
        body: "Specialist hospitals for oncology, cardiology, neurosurgery, orthopaedics, urology, GI surgery, transplantation and fertility treatment.",
        city: "Hyderabad",
        catalog: true,
      },
    ],
  },
  hospitals: {
    heading: "Hospitals in India for South Sudanese Patients",
    intro:
      "Choose the hospital for the specific condition, the specialist, the required technology, multidisciplinary support and a clear written estimate — not for the brand name alone. The campuses below are drawn from GAF’s live India catalogue, one from each published city.",
    directoryLabel: "Browse hospitals in India",
  },
  doctors: {
    heading: "Specialist Doctors in India for South Sudanese Patients",
    intro:
      "The useful sequence is specialty → subspecialty → procedure → city → hospital → doctor. A breast-cancer patient may need a breast or surgical oncologist, a medical oncologist and a radiation oncologist. The specialists below are taken from GAF’s live doctor catalogue.",
    directoryLabel: "Browse doctors in India",
  },
  visa: {
    heading: "Indian Medical Visa for South Sudanese Patients",
    intro:
      "The Government of India’s current e-Visa eligibility list does not include South Sudan. South Sudanese patients should therefore not assume that the online e-Medical Visa route is available. The appropriate route is generally the regular Medical Visa through the Embassy of India in Juba, subject to the current rules and documentation requirements.",
    points: [
      "The Embassy of India in Juba directs applicants to complete the online Indian visa form and then present the printed, signed application in person with the required documents and fee.",
      "The embassy currently lists Medical Visa applications among the Study/Medical/Entry/Research/Conference category at USD 83, including the ICWF charge. Fees are accepted in cash in US dollars. Confirm the live fee before applying.",
      "Physical visa applications are currently received on working days between 09:00 and 11:30. The embassy states that visas for South Sudanese nationals are generally granted within three working days when the application is complete.",
      "For a Medical Visa, the embassy currently asks for preliminary medical advice from a South Sudanese doctor or hospital, a reference or invitation letter from a specialised Indian hospital identifying the patient and attendant, and a bank statement or sponsor affidavit.",
      "A Medical Attendant Visa is currently described as available to the spouse, children or blood relatives of the patient. Confirm the applicable category before applying.",
    ],
    disclaimer:
      "Visa rules, application procedures, fees and submission locations can change. South Sudanese patients should verify current requirements with the Embassy of India in Juba and official Government of India visa resources before making travel arrangements.",
    documentsHeading: "Documents for an Indian Medical Visa",
    documents: [
      "Valid South Sudanese passport, with at least six months’ validity from the intended departure from India and two unused pages",
      "Printed, signed online visa application and two colour photographs on a white background",
      "Preliminary medical advice from a South Sudanese doctor or hospital",
      "Indian hospital invitation or reference letter identifying the patient and attendant",
      "Applicant or sponsor bank statement or affidavit",
      "Certificate of good conduct or police clearance as the embassy currently requires",
      "Attendant documents where a family member will travel",
    ],
    documentsNote:
      "The Embassy of India in Juba publishes the current Medical Visa checklist. Patients should use those official instructions rather than relying on an old checklist found elsewhere online.",
  },
  yellowFever: {
    heading: "Yellow Fever Requirements for South Sudanese Travellers",
    intro:
      "The Embassy of India in Juba states that visitors to India should hold a valid yellow-fever vaccination certificate. Its visa-requirements page adds that travellers should be vaccinated against yellow fever and must carry the original certificate.",
    points: [
      "The embassy’s visa page currently states that vaccination should have been taken at least 14 days before travel. The visa-requirements page refers to completing vaccination before travel and carrying the original certificate.",
      "If the certificate is found invalid or forged, the embassy warns that the traveller may be refused entry and repatriated.",
      "Do not wait until the last moment. Carry the certificate with the passport and hospital letter.",
    ],
    close:
      "Confirm the current vaccination timing and certificate rules with the Embassy of India in Juba and India’s Bureau of Immigration health-regulation guidance before booking flights.",
  },
  travel: {
    heading: "Travel from South Sudan to India for Medical Treatment",
    intro:
      "Most international medical journeys from South Sudan begin in Juba. The practical journey is often Juba → a transit point → India → airport transfer → hospital.",
    points: [
      "Plan the journey around visa approval, the hospital appointment, the patient’s medical condition and whether an attendant is needed.",
      "Flight routing can change depending on the season, airline schedules and transit arrangements. Confirm the current route before purchasing tickets.",
      "For medically fragile patients, the treating doctor should confirm whether the patient is medically fit to fly.",
      "Book travel after the hospital has proposed an appointment or admission window. Tight return tickets are a poor fit for major surgery or cancer treatment.",
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
    heading: "Documents South Sudanese Patients Should Carry to India",
    intro:
      "Patients should keep both physical and digital copies of important records. Sending complete records before travel can make the preliminary assessment more useful.",
    general: [
      "Diagnosis, doctor's referral, blood tests and imaging",
      "CT, MRI, X-rays and ultrasound reports",
      "Biopsy, histopathology, immunohistochemistry and molecular reports",
      "Previous operation notes, discharge summaries and prescriptions",
      "Passport, Indian Medical Visa and hospital invitation letter",
      "Hospital appointment, flight booking, accommodation information and emergency contacts",
    ],
    cancer: [
      "Biopsy, histopathology, immunohistochemistry and molecular testing",
      "CT, MRI and PET-CT where relevant",
      "Previous chemotherapy, radiation and surgical notes",
    ],
    cardiac: [
      "ECG, echocardiogram and angiography",
      "Stress-test results and CT coronary angiography",
      "Previous cardiac procedure reports and current medicines",
    ],
    ortho: [
      "X-rays, MRI and CT",
      "Previous surgery reports and physiotherapy records",
    ],
    cancerNote:
      "For neurological cases, also bring MRI, CT, EEG where relevant, neurology reports and previous surgery notes.",
  },
  living: {
    heading: "Food, Language and Accommodation for South Sudanese Patients",
    intro:
      "The most suitable accommodation depends on the treatment. A patient recovering from major surgery may need to stay close to the hospital. English is widely used in Indian hospitals for medical documentation and communication with doctors.",
    accommodation: [
      "Distance from the hospital, lift access and wheelchair accessibility",
      "Attendant accommodation and kitchen facilities",
      "Pharmacy access, food and transport",
      "Length of stay after major surgery — proximity may matter more than hotel facilities",
    ],
    accommodationNote:
      "Patients may need halal, vegetarian, low-salt, diabetic or other medically prescribed diets. Discuss nutritional requirements with the treating hospital before travelling.",
    food: "For a patient recovering from major surgery, choose accommodation for hospital access rather than price alone.",
    language:
      "Where additional language assistance is needed, discuss this before travelling. GAF Healthcare can coordinate communication requirements as part of the medical-travel process where available. Ask for clarification when a diagnosis, procedure, risk or financial estimate is not clear.",
  },
  journey: {
    heading: "South Sudan → India Medical Treatment Journey",
    intro:
      "A records-first sequence allows many questions to be addressed before the patient leaves Juba. You do not need to start by choosing a hospital at random.",
    steps: [
      { title: "Share medical records", body: "Provide diagnosis reports, scans, pathology, prescriptions and previous treatment records from Juba or another city." },
      { title: "Specialist review", body: "The appropriate Indian specialist or hospital reviews the available records." },
      { title: "Understand the treatment options", body: "Ask what treatment is being considered and whether additional tests are required." },
      { title: "Receive an estimate", body: "The hospital provides an indicative quotation based on the available information." },
      { title: "Organise visa documents", body: "Coordinate the Indian hospital invitation and supporting Medical Visa paperwork." },
      { title: "Apply for the visa", body: "Follow the current instructions of the Embassy of India in Juba. South Sudan is not on the e-Visa list." },
      { title: "Plan travel", body: "Arrange flights, accommodation, airport assistance and hospital admission around the visa and appointment dates." },
      { title: "Reach India", body: "Travel from Juba to the selected Indian medical city." },
      { title: "Hospital evaluation", body: "The treating team may repeat investigations before confirming the final treatment plan." },
      { title: "Begin treatment", body: "Treatment proceeds after appropriate medical assessment and consent." },
      { title: "Recovery", body: "The hospital provides discharge instructions, medicines and expected stay guidance." },
      { title: "Follow-up", body: "Post-treatment coordination can continue according to the hospital’s instructions, including remote follow-up where appropriate." },
    ],
  },
  help: {
    heading: "Why GAF Healthcare for South Sudanese Patients?",
    intro:
      "GAF Healthcare helps international patients coordinate treatment in India, from the initial medical enquiry through specialist matching, hospital selection, visa documentation and follow-up. The exact services available should be confirmed before travel.",
    before: [
      "Medical enquiry and records review",
      "Specialty and hospital matching",
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
      "A preliminary review from Juba can help clarify the specialty, whether further information is required, potential treatment and hospital options, indicative cost and expected stay.",
    questions: [
      "Has the diagnosis been confirmed, and does pathology need review?",
      "Is surgery necessary, and how urgent is treatment?",
      "What alternatives exist?",
      "What does the estimate include — medicines, implants, ICU and investigations?",
      "How many days should the patient plan to stay, and when is it safe to return home?",
      "Should an attendant travel?",
      "Can follow-up continue after return to South Sudan?",
    ],
    close:
      "International treatment is not automatically appropriate when the required treatment is already available, the condition is stable, travel creates unnecessary risk, follow-up would be difficult abroad, or the patient is not medically fit to fly.",
  },
  choose: {
    heading: "How to Choose the Right Indian Hospital and Doctor",
    intro:
      "The doctor should be matched to the patient's diagnosis and procedure. GAF Healthcare’s existing doctor and hospital directories are connected to this country page rather than listing generic “top doctors”.",
    hospital: [
      "Does the hospital treat the specific condition?",
      "Is the appropriate specialist available?",
      "Does it have the required imaging, radiation, molecular diagnostics, theatre or intensive care?",
      "Is multidisciplinary treatment available for complex cancer, cardiac or neurological cases?",
      "What is included in the estimate, and what happens if treatment takes longer?",
    ],
    specialist: [
      "Breast cancer → breast or surgical oncologist, medical oncologist, radiation oncologist",
      "Cervical cancer → gynaecologic or surgical oncologist, medical oncologist, radiation oncologist",
      "Coronary artery disease → cardiologist, interventional cardiologist, cardiac surgeon where required",
      "Brain tumour → neurosurgeon, and medical or radiation oncology where appropriate",
    ],
  },
  faqHeading: "Frequently Asked Questions",
  faqs: [
    {
      q: "Can South Sudanese patients get treatment in India?",
      a: "Yes. India has an established medical-travel relationship with South Sudan. India's Ministry of External Affairs reports that South Sudanese patients travel to India for diagnosis and treatment and that medical visas issued to South Sudanese nationals have been increasing.",
    },
    {
      q: "How many South Sudanese patients travel to India?",
      a: "There is no single public figure covering every South Sudanese medical traveller. However, the Government of India's latest bilateral information states that the Indian Embassy issued 2,556 medical visas to South Sudanese nationals in calendar year 2025.",
    },
    {
      q: "Can South Sudanese citizens apply for an Indian e-Medical Visa?",
      a: "South Sudan does not appear on the current Government of India's published e-Visa eligible-country list. Patients should therefore follow the regular Medical Visa process unless the Indian authorities confirm otherwise for their specific passport and circumstances.",
    },
    {
      q: "Where should South Sudanese patients go in India?",
      a: "The right city depends on the treatment. Delhi NCR, Mumbai, Chennai, Bengaluru and Hyderabad are among the major destinations identified by India's MEA for South Sudanese medical travellers.",
    },
    {
      q: "How much does cancer treatment cost in India?",
      a: "Cancer treatment costs vary considerably according to cancer type, stage, treatment protocol, hospital, medicines, surgery, radiation, chemotherapy, targeted treatment and other factors. A hospital-specific estimate should be obtained after reviewing the patient's medical records.",
    },
    {
      q: "Can I get a medical opinion before travelling to India?",
      a: "Yes. Patients can submit medical records for review by an appropriate Indian specialist before making travel arrangements.",
    },
    {
      q: "Can my family member travel with me?",
      a: "Patients travelling for major treatment commonly need an attendant. The Embassy of India in Juba currently describes the Medical Attendant Visa as available to the spouse, children or blood relatives of the patient, subject to the applicable rules.",
    },
    {
      q: "How long will I need to stay in India?",
      a: "The duration depends on the diagnosis and treatment. Major surgery and cancer treatment may require a substantially longer stay than a consultation or diagnostic visit.",
    },
    {
      q: "Can GAF Healthcare arrange the hospital appointment?",
      a: "GAF Healthcare can coordinate with relevant hospitals and specialists according to the patient's medical requirement and selected treatment pathway.",
    },
    {
      q: "Do I need to pay before receiving a hospital estimate?",
      a: "The process depends on the hospital and type of treatment. Patients should receive clear information about any consultation, diagnostic or advance-payment requirements before proceeding.",
    },
    {
      q: "Is the hospital quotation final?",
      a: "Not necessarily. An initial estimate is based on the information available at that time. The final treatment plan and cost can change after the patient's in-person evaluation and additional investigations.",
    },
    {
      q: "Can I send my medical reports from Juba?",
      a: "Yes. Digital copies of medical records, scans and pathology reports can be shared for preliminary review.",
    },
    {
      q: "Can I receive treatment without travelling for an initial consultation?",
      a: "In some cases, a specialist can review records remotely and provide an initial opinion. However, many diagnoses and treatment decisions require an in-person examination or additional tests.",
    },
    {
      q: "Do South Sudanese patients need a yellow-fever vaccination certificate?",
      a: "Yes. The Embassy of India in Juba states that visitors to India should hold a valid yellow-fever vaccination certificate and carry the original document. Confirm the current vaccination timing before booking travel.",
    },
    {
      q: "Where do South Sudanese patients submit a Medical Visa application?",
      a: "Applicants complete the official online Indian visa form and then submit the printed application in person at the Embassy of India in Juba, together with the required documents and fee. Confirm the current submission hours before travelling to the embassy.",
    },
    {
      q: "Do I need to speak English?",
      a: "English is widely used in Indian hospitals. If the patient or family needs additional language support, this should be discussed before travel.",
    },
    {
      q: "Can I receive a second medical opinion in India?",
      a: "Yes. A second opinion can be useful when surgery or cancer treatment has been proposed, the diagnosis is uncertain, or the family wants another specialist assessment.",
    },
    {
      q: "Can follow-up continue after I return to South Sudan?",
      a: "Ask the treating hospital how frequently follow-up is needed, which reports will need to be repeated, and whether selected reviews can be done remotely after discharge.",
    },
  ],
  finalCta: {
    heading: "Start Your Medical Treatment Journey from South Sudan to India",
    body: "If you or a family member in South Sudan is considering treatment in India, the first step is usually to understand the medical requirement. Share the patient’s diagnosis, medical reports and previous treatment details with GAF Healthcare. The case can then be mapped to the appropriate specialty, Indian hospital and specialist.",
    primary: "Get a Medical Opinion",
    secondary: "Talk to a Medical Travel Expert",
    whatsappLabel: "WhatsApp +91 90443 46292",
    steps: "Get a Medical Opinion → Get Treatment Cost → Talk to a Medical Travel Expert",
  },
  disclaimer: {
    heading: "Important Medical Information",
    body: "This page is intended for general education and medical-travel planning. It does not replace medical advice from a qualified doctor. Cancer statistics are population-level estimates and cannot determine an individual's diagnosis or prognosis. Treatment decisions should be made by the treating specialist after reviewing the patient's medical history, examination and appropriate investigations. Treatment costs are indicative and can change depending on diagnosis, hospital, doctor, treatment complexity, medicines, implants, investigations, length of stay and complications. Visa requirements, fees, documentation and entry rules can change. South Sudanese patients should verify current requirements with the relevant Indian diplomatic mission and official Government of India visa resources before making travel arrangements.",
  },
  sources: {
    heading: "Sources",
    items: [
      {
        label: "Ministry of External Affairs, India — India–South Sudan bilateral brief",
        href: SOUTH_SUDAN_OFFICIAL_LINKS.meaBrief,
        detail:
          "Official note that South Sudanese patients travel to India for diagnosis and treatment, and that 2,556 medical visas were issued in calendar year 2025.",
      },
      {
        label: "Ministry of External Affairs, India — India–South Sudan relations, January 2025",
        href: SOUTH_SUDAN_OFFICIAL_LINKS.meaJan2025,
        detail: "Earlier official brief identifying medical travel from South Sudan to major Indian healthcare cities.",
      },
      {
        label: "Embassy of India, Juba — Indian visa",
        href: SOUTH_SUDAN_OFFICIAL_LINKS.embassyVisa,
        detail: "Current Medical Visa fee, submission hours, processing time and yellow-fever note for applicants in Juba.",
      },
      {
        label: "Embassy of India, Juba — Visa requirements",
        href: SOUTH_SUDAN_OFFICIAL_LINKS.embassyRequirements,
        detail: "Medical Visa documents, attendant category and yellow-fever certificate instructions.",
      },
      {
        label: "Government of India — Indian visa application system",
        href: SOUTH_SUDAN_OFFICIAL_LINKS.visaOnline,
        detail: "Online form used for the regular Medical Visa route.",
      },
      {
        label: "Government of India — Official e-Visa portal",
        href: SOUTH_SUDAN_OFFICIAL_LINKS.eVisa,
        detail: "Current e-Visa categories and eligible-nationality list. South Sudan is not listed.",
      },
      {
        label: "Bureau of Immigration, India — Health regulation",
        href: SOUTH_SUDAN_OFFICIAL_LINKS.boiHealth,
        detail: "Official Indian health-entry guidance, including yellow-fever documentation.",
      },
      {
        label: "IARC / WHO — GLOBOCAN 2022 South Sudan fact sheet",
        href: SOUTH_SUDAN_OFFICIAL_LINKS.globocan,
        detail: "Estimated incidence, mortality, prevalence and leading cancer sites.",
      },
      {
        label: "WHO / Ministry of Health — South Sudan Annual Health Sector Performance Report 2024/25",
        href: SOUTH_SUDAN_OFFICIAL_LINKS.whoAhspr,
        detail: "56% of the population within 5 km of a health facility and health workforce density of 7.9 per 10,000.",
      },
      {
        label: "WHO Regional Office for Africa — South Sudan health workforce note",
        href: SOUTH_SUDAN_OFFICIAL_LINKS.whoWorkforce,
        detail: "Workforce-density context drawn from the 2024/25 health-sector performance report.",
      },
    ],
  },
};
