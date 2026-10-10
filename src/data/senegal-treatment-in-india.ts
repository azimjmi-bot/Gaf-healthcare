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

export const SENEGAL_PAGE_PATH = "/senegal/treatment-in-india";
export const SENEGAL_PAGE_LOCALES = ["en"] as const;
export const SENEGAL_LAST_REVIEWED = "2026-10-03";

export type SenegalPageCopy = typeof senegalPageCopyEn;

export function senegalPageCopy(_locale: AppLocale): SenegalPageCopy {
  return senegalPageCopyEn;
}

const INDIA = "India";

export const SENEGAL_OFFICIAL_LINKS = {
  eVisa: "https://indianvisaonline.gov.in/evisa/tvoa.html",
  eVisaHome: "https://indianvisaonline.gov.in/evisa/",
  eVisaFees: "https://indianvisaonline.gov.in/evisa/eTV_revised_fee_final.pdf",
  visaOnline: "https://indianvisaonline.gov.in/visa/",
  embassy: "https://embassyofindiadakar.gov.in/",
  embassyVisa: "https://embassyofindiadakar.gov.in/pages/MjQ,",
  embassyEvisa: "https://embassyofindiadakar.gov.in/pages/MjM,",
  embassyFees: "https://embassyofindiadakar.gov.in/pages/MjU,",
  embassyYf: "https://embassyofindiadakar.gov.in/listview/NzY,",
  meaBrief: "https://www.mea.gov.in/Portal/ForeignRelation/India-Senegal-2025.pdf",
  globocan: "https://gco.iarc.who.int/media/globocan/factsheets/populations/686-senegal-fact-sheet.pdf",
  iarcToday: "https://gco.iarc.who.int/today/en/fact-sheets-populations",
  whoData: "https://data.who.int/countries/686",
  mohfwYellowFever: "https://ihpoe.mohfw.gov.in/vaccination.php",
  boi: "https://boi.gov.in",
} as const;

export const SENEGAL_CURATED_TREATMENT_SLUGS = [
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

export const SENEGAL_CANCER_TREATMENT_SLUGS = TANZANIA_CANCER_TREATMENT_SLUGS;

export const SENEGAL_COST_PROCEDURE_NAMES = [
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

export const SENEGAL_DOCTOR_SPECIALTY_SLUGS = [
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

export function resolveSenegalCostRows(catalog: Treatment[]) {
  return SENEGAL_COST_PROCEDURE_NAMES.map((name) => {
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

export function senegalDoctors(doctors: Doctor[]) {
  return SENEGAL_DOCTOR_SPECIALTY_SLUGS.map((specialtySlug) => {
    const pool = doctors.filter((doctor) => doctor.specialtySlug === specialtySlug);
    const featured = pool.find((doctor) => doctor.featured);
    return featured ?? [...pool].sort((a, b) => a.name.localeCompare(b.name))[0];
  }).filter((row): row is Doctor => Boolean(row));
}

export const senegalPageCopyEn = {
  seo: {
    title: "Medical Treatment in India for Senegalese Patients",
    description:
      "Explore medical treatment in India for Senegalese patients. Find specialist doctors, hospitals, treatments, indicative costs, e-Medical Visa guidance and support from GAF Healthcare.",
    keywords: [
      "medical treatment in India for Senegalese patients",
      "medical treatment in India from Senegal",
      "treatment in India for Senegalese patients",
      "medical tourism from Senegal to India",
      "India medical treatment for Senegalese patients",
      "Indian hospitals for Senegalese patients",
      "Indian doctors for Senegalese patients",
      "medical treatment cost in India for Senegalese patients",
      "cancer treatment in India for Senegalese patients",
      "cardiac treatment in India for Senegalese patients",
      "heart surgery in India for Senegalese patients",
      "neurosurgery in India for Senegalese patients",
      "orthopaedic treatment in India for Senegalese patients",
      "IVF in India for Senegalese patients",
      "medical visa India for Senegalese citizens",
      "e-Medical Visa India for Senegalese citizens",
      "Indian Medical Visa from Senegal",
      "treatment in India from Dakar",
      "medical treatment from Dakar to India",
      "medical tourism India Senegal",
      "healthcare India for Senegalese patients",
      "French-speaking patients treatment in India",
      "cancer treatment India from Senegal",
      "hospital treatment in India from Senegal",
    ],
  },
  breadcrumb: {
    home: "Home",
    senegal: "Senegal",
    page: "Treatment in India",
  },
  hero: {
    eyebrow: "Medical treatment in India for Senegalese patients",
    h1: "Medical Treatment in India for Senegalese Patients",
    lede:
      "For a patient travelling from Senegal, choosing treatment abroad involves more than finding a hospital. GAF Healthcare helps Senegalese patients connect records from Dakar, Thiès, Touba, Saint-Louis, Kaolack, Ziguinchor and other regions with an appropriate Indian specialist and hospital, then plan the visa, travel and follow-up around that medical requirement.",
    primaryCta: "Get a Medical Opinion",
    secondaryCta: "Explore Treatments",
    whatsappLabel: "WhatsApp +91 90443 46292",
  },
  quickAnswer: {
    heading: "Quick Answer: Medical Treatment in India for Senegalese Patients",
    items: [
      {
        question: "Can Senegalese patients travel to India for medical treatment?",
        answer:
          "Yes. Senegalese citizens can travel to India for medical treatment using the applicable Indian visa route.",
      },
      {
        question: "Can Senegalese citizens apply for an Indian e-Medical Visa?",
        answer:
          "Yes. Senegal is currently included on the Government of India's e-Visa eligible-country list, and medical treatment is an eligible purpose under India's e-Visa system.",
      },
      {
        question: "What treatments can Senegalese patients receive in India?",
        answer:
          "Depending on the diagnosis, patients can seek cancer treatment, heart treatment, neurosurgery, orthopaedic surgery, urology, gastrointestinal treatment, fertility treatment, paediatric care, kidney care and transplantation, among other specialties.",
      },
      {
        question: "How much does treatment in India cost for Senegalese patients?",
        answer:
          "There is no single price. Treatment cost depends on the diagnosis, hospital, specialist, procedure, medicines, investigations, implants, ICU requirements and length of stay.",
      },
      {
        question: "Can a Senegalese patient get a medical opinion before travelling?",
        answer:
          "Yes. Medical records, scans and previous treatment reports can be submitted for preliminary specialist review.",
      },
      {
        question: "Is French-language support important?",
        answer:
          "Yes. French is Senegal's official language, while English is widely used in Indian hospitals. Patients should establish in advance whether interpretation or French-language assistance will be needed.",
      },
    ],
  },
  why: {
    heading: "Why Senegalese Patients Consider Medical Treatment in India",
    intro:
      "Travelling from Senegal to India for healthcare is a significant decision for the patient and family. The best starting point is not the hospital. It is the medical problem, and which specialist should review it.",
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
    heading: "India–Senegal Healthcare Relationship",
    paragraphs: [
      "India and Senegal have maintained diplomatic relations since 1961, when a resident Indian Mission opened in Dakar. Senegal opened a resident Embassy in New Delhi in 1974. The official MEA brief records cooperation across urban transport, agriculture, fisheries, rural electrification, human-resource development, information technology and health.",
      "The two countries also cooperate under the Techno-Economic Approach for Africa India Movement (TEAM-9), which includes India and several West African countries. Senegal is described in the official brief as a leading Francophone partner in that grouping.",
      "An important healthcare milestone came in November 2021, when India and Senegal signed an MoU on cooperation in the field of Health and Medicine during the third Joint Commission meeting in Dakar. The same visit also produced an MoU on training of diplomats.",
      "India's Ministry of External Affairs records pharmaceuticals among India's exports to Senegal. During the COVID-19 pandemic, India donated essential medicines, including hydroxychloroquine, in August 2020, 25,000 doses of Made-in-India COVID-19 vaccine in March 2021, and a further 324,000 doses that reached Senegal under the COVAX facility.",
      "These government-to-government relationships provide useful context for the broader India–Senegal healthcare connection. They do not determine which treatment is appropriate for an individual patient.",
    ],
  },
  context: {
    heading: "Senegal's Healthcare and Disease Burden",
    intro:
      "Senegal's healthcare system manages both infectious diseases and an increasing burden of noncommunicable diseases. WHO country information identifies cardiovascular diseases, cancer, diabetes and chronic respiratory diseases among the major NCD categories, and stroke and ischaemic heart disease among major causes of death.",
    points: [
      "French is Senegal's official language. Indian hospitals generally use English for medical records and specialist consultations, so French interpretation should be arranged before travel when needed.",
      "Most international medical journeys begin at Blaise Diagne International Airport, serving Dakar. Patients travelling from Thiès, Touba, Saint-Louis, Kaolack, Ziguinchor or other regions may first need to reach Dakar.",
      "For some patients, appropriate treatment is available within Senegal. For others, international treatment may be considered when a particular subspecialist, advanced procedure, multidisciplinary service or second opinion is required.",
      "Patients should always provide their current medication list to the treating Indian specialist and should not independently change medicines because an equivalent-looking product is available.",
    ],
    close:
      "Country-level health indicators do not determine an individual's medical needs. The relevant question is: what is the patient's diagnosis, what treatment is appropriate, and can the patient safely travel for that treatment?",
  },
  overview: {
    heading: "What Medical Treatments Can Senegalese Patients Get in India?",
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
    heading: "Popular Medical Treatments for Senegalese Patients in India",
    intro:
      "Each card links only to a live GAF specialty or treatment page. Where GAF does not yet publish a dedicated page, the category is explained without an invented URL.",
    categories: [
      {
        title: "Cancer Treatment",
        body: "Medical, surgical and radiation oncology, including cervical, breast, prostate, colorectal and lymphoma pathways that already have GAF guides. Liver-cancer and stomach-cancer cases are coordinated after records review because dedicated pages are not yet published.",
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
        body: "Senegalese couples may explore IVF, ICSI, IUI and related fertility evaluation in India. GAF does not yet publish a dedicated IVF page. Eligibility, laboratory procedures and applicable Indian regulations should be confirmed with the treating fertility centre before travel.",
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
    heading: "Cancer Treatment in India for Senegalese Patients",
    intro:
      "Cancer is one of the most important treatment areas for Senegalese patients seeking specialised healthcare. According to the IARC GLOBOCAN 2024 Senegal fact sheet, the country had an estimated 14,358 new cancer cases, 9,659 cancer deaths and 25,818 five-year prevalent cases. These are GLOBOCAN 2024 estimates, not current 2026 case counts, and they should not be interpreted as an individual's diagnosis or prognosis.",
    body: "The same official fact sheet ranks cervix uteri first among estimated new cases in both sexes (2,280; 15.9%), followed by breast (2,220; 15.5%), liver (1,926; 13.4%), prostate (1,073; 7.5%) and colorectum (641; 4.5%). Among Senegalese women, cervical cancer was the leading site (2,280; 26.3%), followed by breast. Among Senegalese men, liver cancer was the leading site (1,234; 21.7%), followed by prostate (1,073; 18.9%). GAF does not yet publish dedicated liver-cancer or stomach-cancer pages; those cases are coordinated through the relevant oncology team after records review.",
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
    heading: "How Much Does Medical Treatment in India Cost for Senegalese Patients?",
    intro:
      "There is no universal treatment price for Senegalese patients. Two patients undergoing the same named procedure can have very different clinical requirements. GAF Healthcare presents costs as USD planning estimates from the live catalogue, not hospital quotations.",
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
    heading: "Which Indian Cities Can Senegalese Patients Consider?",
    intro:
      "The appropriate city depends on the medical condition and treatment. There is no single Indian city that is appropriate for every Senegalese patient.",
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
    heading: "How Should Senegalese Patients Choose an Indian Hospital?",
    intro:
      "Start with the diagnosis. Ask whether the hospital treats the specific disease, whether the required specialty and surgeon or oncologist are available, whether ICU and advanced diagnostics are in place, whether international-patient services exist, whether the quotation is transparent, and what follow-up arrangements are available. The campuses below are drawn from GAF’s live India catalogue, one from each published city.",
    directoryLabel: "Browse hospitals in India",
  },
  doctors: {
    heading: "How Should Senegalese Patients Choose the Right Doctor?",
    intro:
      "The doctor should be matched to the patient's diagnosis and procedure. A useful structure is specialty, subspecialty, procedure, city, hospital and then doctor. The specialists below are taken from GAF’s live doctor catalogue.",
    directoryLabel: "Browse doctors in India",
  },
  visa: {
    heading: "Indian e-Medical Visa for Senegalese Patients",
    intro:
      "Senegal is currently listed among the countries eligible for India's e-Visa system. Medical treatment is an eligible purpose. The official portal provides e-Medical and e-Medical Attendant categories. The Embassy of India in Dakar currently publishes an e-Visa page confirming that the facility is available to Senegalese nationals and stating that the Embassy does not process e-Visa applications.",
    points: [
      "Eligible applicants can apply online. The current official portal states that e-Medical and e-Medical Attendant applications may be submitted at least four days before arrival, with an arrival-date selection window of up to 120 days.",
      "The official e-Visa fee list currently shows Senegal at US$80 for the e-Visa service. A bank charge is stated on the official portal. Confirm the live amount before payment.",
      "The current official guidance states that up to two e-Medical Attendant Visas can be issued against one e-Medical Visa.",
      "The current official portal lists e-Medical and e-Medical Attendant visas with one-year validity from the date of arrival and multiple entries. Confirm the live category notes before applying.",
      "An e-Medical Visa application requires the documents specified by the Government of India, including a passport bio page, a recent photograph, sufficient funds, a return or onward ticket, and an Indian hospital letter on letterhead that identifies the patient's name, nationality, passport number and the tentative admission or treatment date.",
      "Some patients may still need India's regular Medical Visa through the Embassy of India in Dakar. The Embassy paper-visa page currently asks for a latest recommendation letter from the treating doctor or hospital and an invitation or appointment letter from the Indian doctor or hospital, together with a yellow-fever vaccination card, bank statements, air-ticket booking and residence or national-identity documents.",
      "The Embassy visa-fee page is currently titled with effect from 01.04.2026. Confirm the live Medical Visa fee before payment. Do not apply the LDC Business gratis line, which the same page currently lists for Business visas for Senegal, The Gambia and Guinea-Bissau, to Medical visas. Do not use a third-party e-Visa website.",
    ],
    disclaimer:
      "Visa rules, fees, documents and entry regulations can change. Verify the current official Indian e-Visa portal and the Embassy of India in Dakar immediately before applying or travelling.",
    documentsHeading: "Documents for an Indian e-Medical Visa or regular Medical Visa from Senegal",
    documents: [
      "Passport with at least six months’ validity and two blank pages",
      "Recent photograph and passport bio page",
      "Indian hospital letter with tentative admission or treatment date for an e-Medical Visa",
      "Return or onward ticket and proof of sufficient funds",
      "For the regular Medical Visa currently listed by the Embassy in Dakar: online form, treating-doctor recommendation, Indian hospital invitation or appointment letter, yellow-fever vaccination card, bank statements, air-ticket booking and residence or national-identity documents",
      "Attendant passports and documents where a family member will travel",
    ],
    documentsNote:
      "Patients should determine which visa route applies to their circumstances rather than submitting documents based on an outdated third-party checklist. The Embassy currently states that e-Visa enquiries must be made on the official Government of India portal.",
  },
  yellowFever: {
    heading: "Yellow Fever Requirements for Senegalese Travellers",
    intro:
      "Senegal is listed among yellow-fever endemic countries on India's IHR points-of-entry guidance. Travellers arriving from endemic countries are generally required to carry a valid yellow-fever vaccination certificate issued by an authorised centre.",
    points: [
      "The Embassy of India in Dakar currently requires a copy of a valid yellow-fever vaccination card with visa applications and publishes a yellow-fever advisory for travellers to India.",
      "The Embassy currently states that the certificate becomes valid 10 days after vaccination, so travellers should be vaccinated at least 10 days before departure. Travellers without a valid original certificate, or with a certificate that is not yet valid, may be quarantined for up to six days on arrival.",
      "Carry the original certificate during travel. Photocopies or digital copies can be treated as insufficient at the border.",
      "Requirements can change according to travel history and current public-health regulations.",
    ],
    close:
      "Confirm the current requirement on the official Indian e-Visa portal, the Bureau of Immigration and the Embassy of India in Dakar before travel.",
  },
  travel: {
    heading: "Travelling from Senegal to India for Medical Treatment",
    intro:
      "Most Senegalese patients beginning the medical journey will travel from Dakar. The principal international gateway is Blaise Diagne International Airport. Patients travelling from Thiès, Touba, Saint-Louis, Kaolack, Ziguinchor or other regions may first need to reach Dakar.",
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
    heading: "Documents Senegalese Patients Should Prepare",
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
    heading: "Accommodation, Food and French-Language Communication",
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
      "French is the official language of Senegal. Indian hospitals generally use English for medical documentation and specialist consultations. Patients should establish before travelling whether they are comfortable communicating in English and whether a French-speaking interpreter is required. Patients should never sign medical consent documentation they do not understand.",
  },
  stay: {
    heading: "How Long Will a Senegalese Patient Need to Stay in India?",
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
      "If you are considering treatment in India, begin with your medical records rather than your flight booking. A records-first sequence allows many questions to be addressed before leaving Dakar.",
    steps: [
      { title: "Share medical records", body: "Send the relevant reports and a concise medical history." },
      { title: "Get an Indian specialist opinion", body: "The appropriate specialist reviews the available records. A remote opinion does not replace an in-person examination." },
      { title: "Understand treatment options", body: "Discuss the proposed treatment, alternatives and expected timeline." },
      { title: "Select the hospital and doctor", body: "Choose according to the medical requirement." },
      { title: "Receive hospital confirmation", body: "The hospital confirms the consultation or treatment pathway." },
      { title: "Obtain a cost estimate", body: "Request a written estimate showing major inclusions and exclusions." },
      { title: "Apply for the Indian Medical Visa", body: "Use the current official e-Medical Visa process, or the regular Medical Visa through the Embassy of India in Dakar if that route applies." },
      { title: "Arrange travel", body: "Plan flights, accommodation and local transportation around the confirmed hospital schedule." },
      { title: "Arrive in India", body: "Proceed to the hospital for consultation and evaluation." },
      { title: "Complete investigations and begin treatment", body: "The treating team may repeat or update diagnostic tests before confirming the final plan." },
      { title: "Recovery and discharge", body: "The hospital provides medication and follow-up instructions." },
      { title: "Return to Senegal and continue follow-up", body: "Travel home when medically fit and maintain follow-up with the Indian treating team and local healthcare professionals." },
    ],
  },
  help: {
    heading: "How GAF Healthcare Can Support Senegalese Patients",
    intro:
      "GAF Healthcare can coordinate the medical journey between Senegal and India. The exact services available should be confirmed before travel. Medical decisions remain with the patient and treating medical professionals.",
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
    heading: "Can Senegalese Patients Get a Second Medical Opinion from India?",
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
      "What happens after returning to Senegal?",
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
      q: "Can Senegalese patients get medical treatment in India?",
      a: "Yes. Senegalese citizens can travel to India for medical treatment using the applicable Indian visa process.",
    },
    {
      q: "Can Senegalese citizens apply for an Indian e-Medical Visa?",
      a: "Yes. Senegal is currently included on India's e-Visa eligible-country list, and medical treatment is an eligible e-Visa purpose. The Embassy of India in Dakar states that it does not process e-Visa applications.",
    },
    {
      q: "How early can Senegalese patients apply for an e-Medical Visa?",
      a: "The current Government of India portal says eligible e-Medical Visa applicants can apply at least four days before arrival and up to 120 days in advance of the proposed arrival date.",
    },
    {
      q: "What passport validity is required for an Indian e-Medical Visa?",
      a: "The current portal states that the passport should have at least six months' validity at the time of application and at least two blank pages for immigration stamping.",
    },
    {
      q: "What document is required from the Indian hospital?",
      a: "The e-Medical Visa application requires a copy of a letter from the Indian hospital on its letterhead showing the tentative admission or treatment date. The Government of India's FAQ also specifies patient name, nationality and passport number.",
    },
    {
      q: "Can a family member accompany a Senegalese patient?",
      a: "Yes. India's e-Medical Attendant Visa category is available for eligible attendants. The current portal states that up to two e-Medical Attendant Visas are granted against one e-Medical Visa.",
    },
    {
      q: "Do some Senegalese patients still need a regular Medical Visa?",
      a: "Yes. Some circumstances still require the regular Medical Visa through the Embassy of India in Dakar. The Embassy currently asks for a treating-doctor recommendation and an Indian hospital invitation or appointment letter.",
    },
    {
      q: "What are the current Embassy Medical Visa fees in Dakar?",
      a: "The Embassy visa-fee page is currently titled with effect from 01.04.2026 and lists duration-based Medical and related bands plus an ICWF charge. Confirm the live schedule before payment. Do not apply the LDC Business gratis line to Medical visas.",
    },
    {
      q: "Do Senegalese patients need a Yellow Fever Vaccination Card?",
      a: "Yes. Senegal is listed among yellow-fever endemic countries on India's IHR points-of-entry guidance. The Embassy of India in Dakar currently requires a yellow-fever card with visa applications and states that travellers without a valid original certificate may be quarantined for up to six days on arrival.",
    },
    {
      q: "How much does medical treatment in India cost for Senegalese patients?",
      a: "There is no fixed price. Cost depends on diagnosis, treatment, hospital, specialist, medicines, investigations, implants, ICU care and length of stay. GAF presents USD planning estimates, not guaranteed hospital quotations.",
    },
    {
      q: "What cancer treatments are available in India for Senegalese patients?",
      a: "Depending on diagnosis and stage, treatment may include surgery, chemotherapy, radiation therapy, immunotherapy, targeted therapy, hormone therapy, precision oncology and supportive care.",
    },
    {
      q: "Which cancers are common in Senegal?",
      a: "GLOBOCAN 2024 estimates 14,358 new cancer cases and 9,659 cancer deaths in Senegal. The leading sites by estimated new cases among both sexes were cervix, breast, liver, prostate and colorectum. Among Senegalese men, liver cancer currently leads, followed by prostate. These are population-level estimates, not an individual diagnosis.",
    },
    {
      q: "Can I get a treatment estimate before travelling from Senegal?",
      a: "Yes. Medical records can be submitted for preliminary specialist review and an indicative hospital estimate can be requested.",
    },
    {
      q: "Can I get a second opinion from an Indian specialist?",
      a: "Yes. Medical records can be shared with an appropriate Indian specialist for preliminary second-opinion review before travel. A remote opinion does not replace an in-person examination when one is clinically necessary.",
    },
    {
      q: "Which Indian cities can Senegalese patients consider?",
      a: "Delhi NCR, Mumbai, Chennai, Hyderabad and Bengaluru are live GAF catalogue cities. Pune can also be considered, but this page does not link to a Pune directory because that city is not yet in the live catalogue.",
    },
    {
      q: "How long should I stay in India?",
      a: "The duration depends on the treatment. Major surgery, cancer treatment and transplantation can require several weeks or longer.",
    },
    {
      q: "Can patients from Dakar travel to India for treatment?",
      a: "Yes. Blaise Diagne International Airport, serving Dakar, is Senegal's principal international gateway. Exact flight routes and schedules should be checked when travel is arranged.",
    },
    {
      q: "Can patients outside Dakar seek treatment in India?",
      a: "Yes. Patients from Thiès, Touba, Saint-Louis, Kaolack, Ziguinchor and other regions can use the same medical-treatment pathway, subject to applicable travel and visa requirements.",
    },
    {
      q: "Does India have an existing healthcare relationship with Senegal?",
      a: "Yes. Official MEA records include a November 2021 MoU on cooperation in Health and Medicine, TEAM-9 cooperation, pharmaceutical exports from India to Senegal, COVID-19 medicine and vaccine support, and other development assistance.",
    },
    {
      q: "Does India have an Embassy in Senegal?",
      a: "Yes. The Embassy of India in Dakar publishes e-Visa, paper-visa, fee and yellow-fever pages. The Mission is concurrently accredited to The Gambia and Guinea-Bissau.",
    },
    {
      q: "Do Senegalese patients need French-language assistance?",
      a: "Not necessarily, but it may be useful. French is the official language of Senegal, while Indian hospitals generally use English for medical documentation and consultations. Interpretation can be arranged where needed.",
    },
    {
      q: "Can Senegalese patients get heart surgery in India?",
      a: "Yes. Indian cardiac centres provide procedures including angioplasty, CABG, valve surgery, electrophysiology and other cardiac treatments, subject to specialist assessment.",
    },
    {
      q: "Can Senegalese patients get IVF treatment in India?",
      a: "Yes. Indian fertility centres provide IVF, ICSI, IUI, embryo-transfer procedures and other fertility services subject to medical and applicable legal requirements. GAF does not yet publish a dedicated IVF page.",
    },
    {
      q: "Is India right for every Senegalese patient?",
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
  ],
  finalCta: {
    heading: "Start Your Medical Treatment Journey from Senegal to India",
    body: "If you or a family member in Senegal is considering treatment in India, the most useful first step is to share the patient's medical information. Send the diagnosis, medical reports, scans and previous treatment records to GAF Healthcare.",
    primary: "Get a Medical Opinion",
    secondary: "Talk to a Medical Travel Expert",
    whatsappLabel: "WhatsApp +91 90443 46292",
    steps: "Share your medical records → Get a specialist opinion → Review hospital and treatment options → Plan your journey to India",
  },
  disclaimer: {
    heading: "Medical Disclaimer",
    body: "This page is intended for general education and medical-travel planning. It does not replace advice from a qualified healthcare professional. Cancer statistics are population-level estimates and cannot determine an individual's diagnosis or prognosis. Treatment costs are indicative and can change. Visa requirements, fees, documentation and immigration regulations can change. Senegalese patients should verify the latest requirements on the official Government of India e-Visa portal before travelling.",
  },
  sources: {
    heading: "Sources",
    items: [
      {
        label: "Government of India — Official e-Visa portal",
        href: SENEGAL_OFFICIAL_LINKS.eVisa,
        detail: "Current e-Visa categories, including e-Medical and e-Medical Attendant.",
      },
      {
        label: "Government of India — Country/territory-wise e-Visa fee list",
        href: SENEGAL_OFFICIAL_LINKS.eVisaFees,
        detail: "Official fee table used as the eligibility gate. Senegal is listed at US$80.",
      },
      {
        label: "Embassy of India, Dakar — e-Visa",
        href: SENEGAL_OFFICIAL_LINKS.embassyEvisa,
        detail: "Confirms e-Visa availability for Senegalese nationals and states that the Embassy does not process e-Visa applications.",
      },
      {
        label: "Embassy of India, Dakar — Paper visa",
        href: SENEGAL_OFFICIAL_LINKS.embassyVisa,
        detail: "Regular Medical Visa documents currently listed by the Embassy, including the treating-doctor recommendation, Indian hospital letter and yellow-fever card.",
      },
      {
        label: "Embassy of India, Dakar — Visa fees",
        href: SENEGAL_OFFICIAL_LINKS.embassyFees,
        detail: "Published consular fee schedule currently titled with effect from 01.04.2026. Confirm the live Medical Visa band before payment.",
      },
      {
        label: "Embassy of India, Dakar — Yellow-fever advisory",
        href: SENEGAL_OFFICIAL_LINKS.embassyYf,
        detail: "IHR yellow-fever certificate requirement, 10-day validity delay and possible six-day quarantine.",
      },
      {
        label: "Ministry of External Affairs, India — India–Senegal bilateral brief, February 2025",
        href: SENEGAL_OFFICIAL_LINKS.meaBrief,
        detail: "Diplomatic relations since 1961, TEAM-9, November 2021 Health and Medicine MoU, pharmaceutical exports and COVID-19 assistance.",
      },
      {
        label: "IARC / WHO — GLOBOCAN 2024 Senegal fact sheet",
        href: SENEGAL_OFFICIAL_LINKS.globocan,
        detail: "Estimated 14,358 new cases, 9,659 deaths and 25,818 five-year prevalent cases, with cervix, breast, liver, prostate and colorectum as leading sites.",
      },
      {
        label: "WHO — Senegal health data overview",
        href: SENEGAL_OFFICIAL_LINKS.whoData,
        detail: "Country-level WHO health information and health-system indicators.",
      },
      {
        label: "Ministry of Health and Family Welfare, India — IHR yellow-fever vaccination",
        href: SENEGAL_OFFICIAL_LINKS.mohfwYellowFever,
        detail: "India’s yellow-fever endemic-country list. Senegal is listed as an endemic country of departure.",
      },
      {
        label: "Government of India — Bureau of Immigration",
        href: SENEGAL_OFFICIAL_LINKS.boi,
        detail: "Entry and immigration instructions for travellers arriving in India.",
      },
    ],
  },
};
