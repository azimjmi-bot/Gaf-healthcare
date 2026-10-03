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

export const SUDAN_PAGE_PATH = "/sudan/treatment-in-india";
export const SUDAN_PAGE_LOCALES = ["en"] as const;
export const SUDAN_LAST_REVIEWED = "2026-10-03";

export type SudanPageCopy = typeof sudanPageCopyEn;

export function sudanPageCopy(_locale: AppLocale): SudanPageCopy {
  return sudanPageCopyEn;
}

const INDIA = "India";

export const SUDAN_OFFICIAL_LINKS = {
  eVisa: "https://indianvisaonline.gov.in/evisa/tvoa.html",
  visaOnline: "https://indianvisaonline.gov.in/visa/",
  embassyVisa: "https://www.eoikhartoum.gov.in/indian-visa.php",
  embassyOnline: "https://www.eoikhartoum.gov.in/online-application-link.php",
  embassyWhatsNew: "https://www.eoikhartoum.gov.in/whats-new.php",
  embassyContact: "https://www.eoikhartoum.gov.in/contact.php",
  boiHealth: "https://www.boi.gov.in/content/health-regulation",
  globocan: "https://gco.iarc.who.int/media/globocan/factsheets/populations/729-sudan-fact-sheet.pdf",
  iarcToday: "https://gco.iarc.who.int/today/en/fact-sheets-populations",
  whoApril2026:
    "https://www.who.int/news/item/14-04-2026-after-three-years-of-conflict--sudan-faces-a-deeper-health-crisis",
  herams:
    "https://www.who.int/publications/m/item/herams-sudan-baseline-report-2025-operational-status-of-the-health-system",
  hea2026: "https://www.who.int/publications/m/item/sudan--who-health-emergency-appeal-2026",
  whoData: "https://data.who.int/countries/729",
} as const;

export const SUDAN_CURATED_TREATMENT_SLUGS = [
  "breast-cancer-treatment-in-india",
  "prostate-cancer-treatment-in-india",
  "lymphoma-treatment-in-india",
  "leukemia-treatment-in-india",
  "cervical-cancer-treatment-in-india",
  "colon-cancer-treatment-in-india",
  "chemotherapy-in-india",
  "cabg-surgery-in-india",
  "heart-valve-replacement-in-india",
  "coronary-angioplasty-in-india",
  "brain-tumor-surgery-in-india",
  "knee-replacement-surgery-in-india",
  "hip-replacement-surgery-in-india",
  "whipple-surgery-in-india",
] as const;

export const SUDAN_CANCER_TREATMENT_SLUGS = TANZANIA_CANCER_TREATMENT_SLUGS;

export const SUDAN_COST_PROCEDURE_NAMES = [
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

export const SUDAN_DOCTOR_SPECIALTY_SLUGS = [
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

export function resolveSudanCostRows(catalog: Treatment[]) {
  return SUDAN_COST_PROCEDURE_NAMES.map((name) => {
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

export function sudanDoctors(doctors: Doctor[]) {
  return SUDAN_DOCTOR_SPECIALTY_SLUGS.map((specialtySlug) => {
    const pool = doctors.filter((doctor) => doctor.specialtySlug === specialtySlug);
    const featured = pool.find((doctor) => doctor.featured);
    return featured ?? [...pool].sort((a, b) => a.name.localeCompare(b.name))[0];
  }).filter((row): row is Doctor => Boolean(row));
}

export const sudanPageCopyEn = {
  seo: {
    title: "Medical Treatment in India for Sudanese Patients",
    description:
      "Explore medical treatment in India for Sudanese patients. Find specialist doctors, hospitals, treatments, indicative costs, Medical Visa guidance and support from GAF Healthcare.",
    keywords: [
      "medical treatment in India for Sudanese patients",
      "medical treatment in India from Sudan",
      "treatment in India for Sudanese patients",
      "medical tourism from Sudan to India",
      "India medical treatment for Sudanese",
      "Indian hospitals for Sudanese patients",
      "Indian doctors for Sudanese patients",
      "medical treatment cost in India for Sudanese patients",
      "cancer treatment in India for Sudanese patients",
      "cardiac treatment in India for Sudanese patients",
      "heart surgery in India for Sudanese patients",
      "neurosurgery in India for Sudanese patients",
      "orthopaedic treatment in India for Sudanese patients",
      "IVF in India for Sudanese patients",
      "Medical Visa India for Sudanese citizens",
      "India Medical Visa from Sudan",
      "treatment in India from Khartoum",
      "treatment in India from Port Sudan",
    ],
  },
  breadcrumb: {
    home: "Home",
    sudan: "Sudan",
    page: "Treatment in India",
  },
  hero: {
    eyebrow: "Medical treatment in India for Sudanese patients",
    h1: "Medical Treatment in India for Sudanese Patients",
    lede:
      "Sudanese patients seeking specialised medical care can consider India for diagnosis, second opinions, surgery, cancer treatment, cardiac care, neurosurgery, orthopaedics, urology, fertility treatment and other complex medical conditions. GAF Healthcare helps patients and families obtain a medical opinion, identify an appropriate specialist, understand treatment options, receive a hospital estimate, arrange the Medical Visa and coordinate the stay in India.",
    primaryCta: "Get a Medical Opinion",
    secondaryCta: "Explore Treatments",
    whatsappLabel: "WhatsApp +91 90443 46292",
  },
  quickAnswer: [
    {
      question: "Can Sudanese patients travel to India for medical treatment?",
      answer:
        "Yes. Sudanese patients can apply for an Indian Medical Visa to seek treatment in India, subject to the applicable visa requirements and approval by Indian authorities. The Embassy of India in Khartoum provides visa information and has previously facilitated medical-visa services for Sudanese applicants.",
    },
    {
      question: "What treatments can Sudanese patients receive in India?",
      answer:
        "Depending on the patient's diagnosis, India provides specialist treatment in oncology, cardiology, cardiac surgery, neurosurgery, orthopaedics, urology, gastroenterology, nephrology, IVF and fertility, paediatrics, transplantation and many other specialties.",
    },
    {
      question: "Can Sudanese citizens apply for an Indian e-Medical Visa?",
      answer:
        "Sudan is not included in the current Government of India's published e-Visa eligible-country list. Sudanese patients should therefore use the applicable regular Medical Visa process unless the Indian authorities confirm another route for their individual circumstances.",
    },
    {
      question: "Where can Sudanese patients receive treatment in India?",
      answer:
        "Major medical centres include Delhi NCR, Mumbai, Chennai, Bengaluru and Hyderabad. The Embassy of India in Khartoum has also promoted Indian healthcare facilities covering specialties such as cardiology, oncology, orthopaedics, neurology, liver and kidney transplantation.",
    },
    {
      question: "How much does treatment in India cost for Sudanese patients?",
      answer:
        "There is no single treatment price. Costs vary according to diagnosis, treatment complexity, hospital, doctor, medicines, investigations, implants, ICU requirements, length of stay and other clinical factors.",
    },
    {
      question: "Can I get a medical opinion before travelling?",
      answer:
        "Yes. Patients can share their medical reports for preliminary specialist review before making international travel arrangements.",
    },
  ] satisfies QuickAnswerItem[],
  why: {
    heading: "Why Sudanese Patients Consider India for Medical Treatment",
    intro:
      "The decision to travel abroad for healthcare is significant. Patients usually want answers before leaving Sudan: the diagnosis, which specialist should treat the condition, whether surgery is necessary, whether alternatives exist, how much treatment will cost, how long the patient needs to stay, which documents are required, which Indian hospital is appropriate, and whether a medical opinion can be obtained before travel.",
    points: [
      "India has a large network of tertiary and quaternary hospitals, so a particular condition can be matched with an appropriate specialty, subspecialty and hospital",
      "The Embassy of India in Khartoum has specifically promoted India as a destination for advanced medical care and has hosted Indian hospitals covering heart care, liver care, paediatrics, infertility and other specialties",
      "The journey usually starts with medical records and a specialist opinion, then hospital selection, cost estimation, Medical Visa arrangements, travel and follow-up",
      "Sudan’s current healthcare and travel environment makes pre-travel coordination particularly important for patients who need specialist or complex care",
      "International treatment is not automatically the right option for every patient — the decision should follow the individual medical condition",
    ],
    close:
      "GAF Healthcare helps patients understand their options and connect medical requirements with suitable hospitals and specialists in India. A hospital should be chosen for the diagnosis, not for the country name alone.",
  },
  relationship: {
    heading: "India–Sudan Healthcare Relationship",
    paragraphs: [
      "India has an established healthcare relationship with Sudan. The Embassy of India in Khartoum has previously organised programmes introducing Indian hospitals and their specialised services to Sudanese patients, local healthcare organisations and medical stakeholders.",
      "The embassy’s published record includes a July 2022 programme titled “India – A Preferred Destination for Advanced Medical Care”, involving Indian hospitals specialising in heart care, liver care, paediatric treatment, infertility and other advanced medical services.",
      "In January 2025 the embassy also recorded a Kauvery Hospital medical camp in Port Sudan covering cardiology, oncology, orthopaedics, neurology, and liver and kidney transplantation. That longstanding engagement is a documented relationship. It does not mean every Sudanese patient should travel, or that India is automatically the right destination for every diagnosis.",
    ],
  },
  context: {
    heading: "Sudan’s Current Healthcare Context",
    intro:
      "Sudan’s healthcare environment has been profoundly affected by the ongoing conflict. These facts describe the health-system setting. They do not diagnose an individual patient.",
    points: [
      "In April 2026, WHO reported that 34 million people in Sudan needed humanitarian assistance and 21 million lacked health services.",
      "WHO’s 2026 Health Emergency Appeal reported that 37% of health facilities across Sudan remained non-functional at that time.",
      "WHO’s 2025 HeRAMS assessment examined 4,363 health service delivery units in Sudan and documented the availability and operational status of healthcare services. The assessment noted that its findings were based on information available through 1 July 2025 and remained subject to ongoing verification.",
    ],
    close:
      "These circumstances can make access to specialised investigations, surgery, medicines and non-emergency care difficult in some parts of Sudan. That does not mean every Sudanese patient needs to travel abroad. International treatment may be considered when a patient needs specialised expertise, advanced diagnostics, complex surgery, multidisciplinary care or another service that is unavailable, inaccessible or difficult to obtain locally. The decision should always be based on the patient’s individual medical circumstances.",
  },
  overview: {
    heading: "Medical Treatment in India for Patients from Sudan",
    intro:
      "For a Sudanese patient, travelling to India is about much more than selecting a hospital. The process usually involves obtaining a medical opinion, identifying the appropriate specialist, understanding treatment options, receiving a hospital estimate, arranging the Medical Visa, planning travel and coordinating the patient’s stay in India. Depending on the diagnosis, patients may consider India for the specialties below.",
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
    heading: "Popular Treatment Categories for Sudanese Patients",
    intro:
      "Each card links only to a live GAF specialty or treatment page. Where GAF does not yet publish a dedicated page, the category is explained without an invented URL.",
    categories: [
      {
        title: "Cancer Treatment",
        body: "Medical, surgical and radiation oncology, including breast, prostate, lymphoma, leukaemia, cervical and colorectal pathways that already have GAF guides.",
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
        body: "Paediatric cardiology and cardiac surgery, oncology, neurosurgery and related children’s services arranged with a paediatric team. Parents should carry complete medical and vaccination records.",
        href: "/treatments/ventricular-septal-defect-surgery-in-india",
        hrefLabel: "VSD surgery in India",
        specialty: "Pediatric Cardiac Surgery",
      },
      {
        title: "Organ Transplantation",
        body: "Kidney, liver, heart and bone-marrow programmes are highly regulated. The Embassy of India in Khartoum has previously highlighted Indian hospitals specialising in liver and kidney transplantation. Eligibility must be confirmed by the transplant centre before travel.",
        href: "/treatments/bone-marrow-transplant-in-india",
        hrefLabel: "Bone marrow transplant in India",
        specialty: "Hematology",
      },
      {
        title: "IVF & Fertility",
        body: "Sudanese couples may consider India for infertility evaluation and assisted reproductive treatment, including IUI, IVF, ICSI and selected PGT cases. GAF does not yet publish a dedicated IVF page. Eligibility, protocols and applicable Indian regulations should be confirmed with the treating fertility centre before travel.",
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
          { label: "Non-Hodgkin Lymphoma", href: "/treatments/lymphoma-treatment-in-india" },
          { label: "Leukaemia", href: "/treatments/leukemia-treatment-in-india" },
          { label: "Pancreatic Cancer", href: "/treatments/pancreatic-cancer-treatment-in-india" },
          { label: "Ovarian Cancer", href: "/treatments/ovarian-cancer-treatment-in-india" },
          { label: "Brain Tumour", href: "/treatments/brain-tumor-surgery-in-india" },
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
    heading: "Cancer Treatment in India for Sudanese Patients",
    intro:
      "Cancer is one of the major areas in which Sudanese patients may seek specialised treatment. According to the IARC GLOBOCAN 2022 Sudan fact sheet, the country had an estimated 41,022 new cancer cases, 25,766 cancer deaths and 73,087 five-year prevalent cases. These are population-level estimates and should not be used to diagnose an individual patient.",
    body: "The same official fact sheet ranks breast first among estimated new cases in both sexes (8,611), followed by prostate (3,357), non-Hodgkin lymphoma (2,728), leukaemia (2,501) and liver (2,424). Among men, prostate cancer was the leading site, followed by liver cancer and non-Hodgkin lymphoma. Among women, breast cancer accounted for the largest number of estimated new cases. GAF does not yet publish dedicated liver-cancer, rectal-cancer or lung-cancer pages; those cases are coordinated through the relevant oncology team after records review.",
    modalities: [
      { label: "Breast Cancer", href: "/treatments/breast-cancer-treatment-in-india" },
      { label: "Cervical Cancer", href: "/treatments/cervical-cancer-treatment-in-india" },
      { label: "Prostate Cancer", href: "/treatments/prostate-cancer-treatment-in-india" },
      { label: "Colon Cancer", href: "/treatments/colon-cancer-treatment-in-india" },
      { label: "Lymphoma", href: "/treatments/lymphoma-treatment-in-india" },
      { label: "Leukaemia", href: "/treatments/leukemia-treatment-in-india" },
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
    heading: "Medical Treatment Cost in India for Sudanese Patients",
    intro:
      "There is no standard medical-treatment cost in India for Sudanese patients. The same procedure can have very different costs depending on the diagnosis, disease severity and treatment plan. GAF Healthcare presents costs as indicative treatment-planning estimates, not guaranteed final prices.",
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
    heading: "Major Indian Cities for Sudanese Patients",
    intro:
      "The right city depends on the patient's medical requirement. Delhi NCR, Mumbai, Chennai, Bengaluru and Hyderabad all have specialist hospitals in GAF’s live catalogue. There is no single city that is appropriate for every patient.",
    items: [
      {
        name: "Delhi NCR",
        body: "Delhi and Gurugram form one of India’s largest tertiary-care clusters, covering cancer, cardiology, cardiac surgery, neurosurgery, orthopaedics, transplantation, gastroenterology, urology, IVF and paediatric specialties.",
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
    heading: "Hospitals in India for Sudanese Patients",
    intro:
      "Choose the hospital for the specific condition, the specialist, the required technology, multidisciplinary support and a clear written estimate — not for the brand name alone. The campuses below are drawn from GAF’s live India catalogue, one from each published city.",
    directoryLabel: "Browse hospitals in India",
  },
  doctors: {
    heading: "Specialist Doctors in India for Sudanese Patients",
    intro:
      "The useful sequence is specialty → subspecialty → procedure → city → hospital → doctor. A breast-cancer patient may need a breast or surgical oncologist, a medical oncologist and a radiation oncologist. The specialists below are taken from GAF’s live doctor catalogue.",
    directoryLabel: "Browse doctors in India",
  },
  visa: {
    heading: "Indian Medical Visa for Sudanese Patients",
    intro:
      "Sudan is not included in the current Government of India’s published list of countries eligible for e-Visa. The official e-Visa portal currently lists the eligible nationalities, and Sudan does not appear on that list. Sudanese patients should therefore plan around the regular Indian Medical Visa process, subject to the current instructions of the Indian diplomatic mission handling their application.",
    points: [
      "The Embassy of India in Khartoum states that individual visa applicants should apply through the online Indian visa system and submit the printed application and required supporting documents according to the embassy’s instructions.",
      "The embassy currently operates from a camp office in Port Sudan. Visa and consular hours, appointment procedures and the submission location can change, so patients should verify the currently applicable location before travelling to the visa centre.",
      "The embassy’s published visa page currently lists submission hours of 09:30 to 11:30 and asks applicants to pay applicable fees in US dollars in cash. Confirm the live instructions when applying.",
      "A hospital invitation or reference letter, medical records and treatment details are typically required for a Medical Visa. GAF Healthcare can coordinate hospital documentation once a case has been reviewed.",
      "A patient travelling for major surgery or prolonged treatment may require an accompanying family member. The appropriate Medical Attendant Visa category should be confirmed with the Indian diplomatic mission.",
    ],
    disclaimer:
      "Visa rules, application procedures, fees and submission locations can change. Sudanese patients should verify current requirements with the relevant Indian diplomatic mission and official Government of India visa resources before making travel arrangements.",
    documentsHeading: "Documents for an Indian Medical Visa",
    documents: [
      "Valid passport and passport photographs",
      "Completed online visa application, printed as the embassy requires",
      "Medical records and a medical referral or preliminary medical advice",
      "Indian hospital invitation or reference letter and treatment details",
      "Financial documentation where required",
      "Attendant information where a family member will travel",
      "Other documents requested by the Indian mission",
    ],
    documentsNote:
      "The Embassy of India in Khartoum specifically publishes visa information for Sudanese applicants. Patients should use the current official instructions rather than relying on an old checklist found elsewhere online.",
  },
  yellowFever: {
    heading: "Yellow Fever Requirements for Sudanese Travellers",
    intro:
      "Sudan is a country where yellow-fever vaccination requirements may be relevant to international travel. India’s official e-Visa guidance states that travellers arriving from yellow-fever affected countries must carry the required yellow-fever vaccination certificate and that health regulations should be checked before travel.",
    points: [
      "The Embassy of India in Khartoum also points applicants to India’s Bureau of Immigration health-regulation guidance.",
      "Patients should verify the latest Indian health-entry requirements before departure because public-health entry rules can change.",
      "Where vaccination is required, patients should not wait until the last moment. Carry the certificate with the passport and hospital letter.",
    ],
    close:
      "Confirm the current requirement with the Embassy of India in Khartoum and the official Government of India health-entry resources before travel.",
  },
  travel: {
    heading: "Travel from Sudan to India for Medical Treatment",
    intro:
      "International medical travel from Sudan requires careful coordination. For many patients the practical journey is Sudan → a transit point → India → airport transfer → hospital. Some patients begin in Khartoum; others travel from Port Sudan or another city.",
    points: [
      "Flight routes and airline schedules can change. Confirm the current route before purchasing tickets.",
      "Patients with serious illness should ask their treating doctor whether they are medically fit to fly.",
      "Because Sudan’s diplomatic and travel environment can change, patients should also confirm the currently applicable visa-submission location before combining visa travel with the journey to India.",
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
    heading: "Documents Sudanese Patients Should Carry to India",
    intro:
      "Patients should carry both digital and physical copies of important records. Sending complete records before travel can make the preliminary assessment more useful.",
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
    heading: "Food, Language and Accommodation for Sudanese Patients",
    intro:
      "The most suitable accommodation depends on the treatment. A patient recovering from major surgery may need to stay close to the hospital. Indian hospitals commonly communicate medical information in English.",
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
      "If the patient or family needs additional language support, this should be discussed before travel. GAF Healthcare can coordinate communication requirements as part of the medical-travel process where available. Ask for clarification when a diagnosis, procedure, risk or financial estimate is not clear.",
  },
  journey: {
    heading: "Sudan → India Medical Treatment Journey",
    intro:
      "A records-first sequence allows many questions to be addressed before the patient leaves Sudan. You do not need to start by choosing a hospital at random.",
    steps: [
      { title: "Collect medical records", body: "Gather diagnosis reports, scans, pathology, prescriptions and previous treatment records." },
      { title: "Request a specialist review", body: "Share the available records with GAF Healthcare so the relevant Indian specialist or hospital can review the case." },
      { title: "Understand the treatment plan", body: "Ask what treatment is being considered and whether additional tests are required." },
      { title: "Obtain a hospital estimate", body: "Request a written estimate and clarification of inclusions and exclusions." },
      { title: "Obtain Medical Visa documents", body: "Coordinate the Indian hospital documentation required for the visa application." },
      { title: "Apply for the visa", body: "Follow the current instructions of the responsible Indian mission. Sudan is not on the e-Visa list." },
      { title: "Plan the journey", body: "Arrange flights, accommodation, airport assistance and hospital admission." },
      { title: "Reach India", body: "Travel to the selected Indian medical city." },
      { title: "Complete hospital evaluation", body: "The treating team may repeat investigations before confirming the final treatment plan." },
      { title: "Begin treatment", body: "Treatment proceeds after appropriate medical assessment and consent." },
      { title: "Recovery", body: "The hospital provides discharge instructions, medicines and expected stay guidance." },
      { title: "Follow-up", body: "Post-treatment coordination can continue according to the hospital’s instructions, including remote follow-up where appropriate." },
    ],
  },
  help: {
    heading: "Why GAF Healthcare for Sudanese Patients?",
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
      "A preliminary review from Khartoum, Port Sudan or another city can help clarify the specialty, whether further information is required, potential treatment and hospital options, indicative cost and expected stay.",
    questions: [
      "Has the diagnosis been confirmed, and does pathology need review?",
      "Is surgery necessary, and how urgent is treatment?",
      "What alternatives exist?",
      "What does the estimate include — medicines, implants, ICU and investigations?",
      "How many days should the patient plan to stay, and when is it safe to return home?",
      "Should an attendant travel?",
      "Can follow-up continue after return to Sudan?",
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
      "Prostate cancer → urologic oncologist or urologist, radiation oncologist, medical oncologist where required",
      "Coronary artery disease → cardiologist, interventional cardiologist, cardiac surgeon where required",
      "Brain tumour → neurosurgeon, and medical or radiation oncology where appropriate",
    ],
  },
  faqHeading: "Frequently Asked Questions",
  faqs: [
    {
      q: "Can Sudanese patients get medical treatment in India?",
      a: "Yes. Sudanese nationals can seek treatment in India using the applicable Indian Medical Visa route. The Indian Embassy in Khartoum provides visa information for Sudanese applicants.",
    },
    {
      q: "Is medical tourism from Sudan to India established?",
      a: "Yes. The Embassy of India in Khartoum has previously organised medical-care programmes involving Indian hospitals, Sudanese patients, local hospitals and healthcare stakeholders. The programmes covered specialties including cardiac care, oncology, orthopaedics, neurology, liver and kidney transplantation and infertility.",
    },
    {
      q: "Can Sudanese citizens get an Indian e-Medical Visa?",
      a: "Sudan does not appear on the current official e-Visa eligibility list. Patients should therefore follow the regular Indian Medical Visa process unless the relevant Indian authorities confirm otherwise.",
    },
    {
      q: "Which Indian cities can Sudanese patients consider?",
      a: "Delhi NCR, Mumbai, Chennai, Bengaluru and Hyderabad are major Indian healthcare destinations. The Indian Embassy in Khartoum has previously promoted hospitals in several of these cities.",
    },
    {
      q: "How much does treatment in India cost?",
      a: "There is no fixed price. Costs depend on the diagnosis, treatment, hospital, doctor, medicines, investigations, implants, ICU and length of stay.",
    },
    {
      q: "Can I get a medical opinion before travelling?",
      a: "Yes. Medical reports can be submitted for preliminary review by an appropriate specialist.",
    },
    {
      q: "Can I send my reports from Khartoum, Port Sudan or another city?",
      a: "Yes. Digital medical records can be shared before travel for preliminary assessment.",
    },
    {
      q: "Can my family member accompany me?",
      a: "Patients undergoing major treatment may travel with an attendant. The applicable visa category and requirements should be confirmed with the Indian mission.",
    },
    {
      q: "Do Sudanese patients need a Medical Visa?",
      a: "Patients travelling to India specifically for medical treatment need the appropriate Indian visa. The exact process should be confirmed with the responsible Indian diplomatic mission.",
    },
    {
      q: "How long does treatment in India take?",
      a: "It depends on the diagnosis and treatment. Major surgery and cancer treatment may require weeks or longer, while a consultation may require a much shorter stay.",
    },
    {
      q: "Is the initial hospital cost estimate final?",
      a: "No. A preliminary estimate is based on the medical information available before travel. The final diagnosis and treatment plan may change after the patient's examination and investigations in India.",
    },
    {
      q: "Can I receive a second medical opinion in India?",
      a: "Yes. Patients can seek an additional specialist opinion before making a major treatment decision. For cancer patients, a second opinion may involve reviewing pathology, imaging and previous treatment.",
    },
    {
      q: "Do I need to complete all tests before travelling?",
      a: "Not necessarily. However, carrying previous reports can help doctors understand the case and avoid unnecessary duplication of investigations.",
    },
    {
      q: "Can GAF Healthcare help with hospital selection?",
      a: "Yes. GAF Healthcare can help map the patient's condition to relevant specialties, doctors and hospitals in India.",
    },
    {
      q: "Do Sudanese patients need a yellow-fever vaccination certificate?",
      a: "Sudan is a country where yellow-fever vaccination requirements may apply. India’s official guidance states that travellers arriving from yellow-fever affected countries must carry the required certificate. Verify the latest Indian health-entry requirements before departure.",
    },
    {
      q: "Where do Sudanese patients currently submit a Medical Visa application?",
      a: "The Embassy of India in Khartoum currently publishes visa instructions and has been operating from a camp office in Port Sudan. Because the submission location, appointment procedure and hours can change, confirm the live embassy instructions before travelling to the visa centre.",
    },
    {
      q: "Do I need to speak English?",
      a: "English is widely used in Indian hospitals. If the patient or family needs additional language support, this should be discussed before travel.",
    },
    {
      q: "Can follow-up continue after I return to Sudan?",
      a: "Ask the treating hospital how frequently follow-up is needed, which reports will need to be repeated, and whether selected reviews can be done remotely after discharge.",
    },
  ],
  finalCta: {
    heading: "Start Your Medical Treatment Journey from Sudan to India",
    body: "If you or a family member in Sudan is considering treatment in India, the best starting point is usually the patient’s medical information. Share the diagnosis, previous treatment details and available medical reports with GAF Healthcare. The case can then be mapped to the appropriate specialty, treatment, Indian hospital and specialist.",
    primary: "Get a Medical Opinion",
    secondary: "Talk to a Medical Travel Expert",
    whatsappLabel: "WhatsApp +91 90443 46292",
    steps: "Get a Medical Opinion → Get Treatment Cost → Talk to a Medical Travel Expert",
  },
  disclaimer: {
    heading: "Important Medical Information",
    body: "This page is intended for general education and medical-travel planning. It does not replace medical advice from a qualified doctor. Cancer statistics are population-level estimates and should not be used to diagnose or predict the outcome for an individual patient. Treatment decisions should be made by the treating specialist after reviewing the patient's medical history, examination and appropriate investigations. Treatment costs are indicative and may change depending on diagnosis, treatment complexity, hospital, doctor, medicines, implants, investigations, ICU requirements, length of stay and complications. Visa rules, application procedures, fees and submission locations can change. Sudanese patients should verify current requirements with the relevant Indian diplomatic mission and official Government of India visa resources before making travel arrangements.",
  },
  sources: {
    heading: "Sources",
    items: [
      {
        label: "Embassy of India, Khartoum — What’s New",
        href: SUDAN_OFFICIAL_LINKS.embassyWhatsNew,
        detail:
          "Published record of the July 2022 advanced-medical-care programme and the January 2025 Kauvery Hospital camp in Port Sudan.",
      },
      {
        label: "Embassy of India, Khartoum — Visa information",
        href: SUDAN_OFFICIAL_LINKS.embassyVisa,
        detail: "Current visa instructions for Sudan-based applicants, including camp-office location and submission hours.",
      },
      {
        label: "Embassy of India, Khartoum — Online visa application",
        href: SUDAN_OFFICIAL_LINKS.embassyOnline,
        detail: "Mission guidance directing applicants to the official Indian visa application system.",
      },
      {
        label: "Government of India — Indian visa application system",
        href: SUDAN_OFFICIAL_LINKS.visaOnline,
        detail: "Online form used for the regular Medical Visa route.",
      },
      {
        label: "Government of India — Official e-Visa portal",
        href: SUDAN_OFFICIAL_LINKS.eVisa,
        detail: "Current e-Visa categories and eligible-nationality list. Sudan is not listed.",
      },
      {
        label: "Bureau of Immigration, India — Health regulation",
        href: SUDAN_OFFICIAL_LINKS.boiHealth,
        detail: "Official Indian health-entry guidance, including yellow-fever documentation.",
      },
      {
        label: "IARC / WHO — GLOBOCAN 2022 Sudan fact sheet",
        href: SUDAN_OFFICIAL_LINKS.globocan,
        detail: "Estimated incidence, mortality, prevalence and leading cancer sites.",
      },
      {
        label: "WHO — After three years of conflict, Sudan faces a deeper health crisis, April 2026",
        href: SUDAN_OFFICIAL_LINKS.whoApril2026,
        detail: "34 million people needing humanitarian assistance and 21 million lacking health services.",
      },
      {
        label: "WHO — Sudan Health Emergency Appeal 2026",
        href: SUDAN_OFFICIAL_LINKS.hea2026,
        detail: "Health-service disruption context, including the share of non-functional health facilities.",
      },
      {
        label: "WHO — HeRAMS Sudan Baseline Report 2025: operational status of the health system",
        href: SUDAN_OFFICIAL_LINKS.herams,
        detail: "Assessment of 4,363 health service delivery units, with data through 1 July 2025.",
      },
    ],
  },
};
