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

export const SOMALIA_PAGE_PATH = "/somalia/treatment-in-india";
export const SOMALIA_PAGE_LOCALES = ["en"] as const;
export const SOMALIA_LAST_REVIEWED = "2026-10-03";

export type SomaliaPageCopy = typeof somaliaPageCopyEn;

export function somaliaPageCopy(_locale: AppLocale): SomaliaPageCopy {
  return somaliaPageCopyEn;
}

const INDIA = "India";

export const SOMALIA_OFFICIAL_LINKS = {
  eVisa: "https://indianvisaonline.gov.in/evisa/tvoa.html",
  eVisaHome: "https://indianvisaonline.gov.in/evisa/",
  eVisaFees: "https://indianvisaonline.gov.in/evisa/eTV_revised_fee_final.pdf",
  visaOnline: "https://indianvisaonline.gov.in/visa/",
  embassy: "https://www.hcinairobi.gov.in/",
  embassyVisa: "https://hcinairobi.gov.in/Visa_Types",
  embassySomali: "https://hcinairobi.gov.in/eoinrb_pages/MTY1",
  embassyShift: "https://hcinairobi.gov.in/eoinrb_listview/ODI3",
  embassyAppointment: "https://hcinairobi.gov.in/getappointment",
  addis: "https://eoiaddisababa.gov.in/",
  meaBrief: "https://www.mea.gov.in/Portal/ForeignRelation/India-Somalia-April-2026.pdf",
  globocan: "https://gco.iarc.who.int/media/globocan/factsheets/populations/706-somalia-fact-sheet.pdf",
  iarcToday: "https://gco.iarc.who.int/today/en/fact-sheets-populations",
  whoData: "https://data.who.int/countries/706",
  mohfwYellowFever: "https://ihpoe.mohfw.gov.in/vaccination.php",
  boi: "https://boi.gov.in",
} as const;

export const SOMALIA_CURATED_TREATMENT_SLUGS = [
  "breast-cancer-treatment-in-india",
  "cervical-cancer-treatment-in-india",
  "colon-cancer-treatment-in-india",
  "prostate-cancer-treatment-in-india",
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

export const SOMALIA_CANCER_TREATMENT_SLUGS = TANZANIA_CANCER_TREATMENT_SLUGS;

export const SOMALIA_COST_PROCEDURE_NAMES = [
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

export const SOMALIA_DOCTOR_SPECIALTY_SLUGS = [
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

export function resolveSomaliaCostRows(catalog: Treatment[]) {
  return SOMALIA_COST_PROCEDURE_NAMES.map((name) => {
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

export function somaliaDoctors(doctors: Doctor[]) {
  return SOMALIA_DOCTOR_SPECIALTY_SLUGS.map((specialtySlug) => {
    const pool = doctors.filter((doctor) => doctor.specialtySlug === specialtySlug);
    const featured = pool.find((doctor) => doctor.featured);
    return featured ?? [...pool].sort((a, b) => a.name.localeCompare(b.name))[0];
  }).filter((row): row is Doctor => Boolean(row));
}

export const somaliaPageCopyEn = {
  seo: {
    title: "Medical Treatment in India for Somali Patients",
    description:
      "Explore medical treatment in India for Somali patients. Find specialist doctors, hospitals, treatments, indicative costs, Medical Visa guidance and support from GAF Healthcare.",
    keywords: [
      "medical treatment in India for Somali patients",
      "medical treatment in India from Somalia",
      "treatment in India for Somali patients",
      "medical tourism from Somalia to India",
      "India medical treatment for Somali patients",
      "Indian hospitals for Somali patients",
      "Indian doctors for Somali patients",
      "medical treatment cost in India for Somali patients",
      "cancer treatment in India for Somali patients",
      "cardiac treatment in India for Somali patients",
      "heart surgery in India for Somali patients",
      "neurosurgery in India for Somali patients",
      "orthopaedic treatment in India for Somali patients",
      "IVF in India for Somali patients",
      "Indian Medical Visa for Somali citizens",
      "Medical Visa India from Somalia",
      "India Medical Visa for Somali patients",
      "treatment in India from Mogadishu",
      "medical treatment from Hargeisa to India",
      "medical treatment from Garowe to India",
      "Somalia medical tourism India",
      "healthcare India for Somali patients",
      "cancer treatment India from Somalia",
      "hospital treatment in India from Somalia",
    ],
  },
  breadcrumb: {
    home: "Home",
    somalia: "Somalia",
    page: "Treatment in India",
  },
  hero: {
    eyebrow: "Medical treatment in India for Somali patients",
    h1: "Medical Treatment in India for Somali Patients",
    lede:
      "For a patient travelling from Somalia, choosing treatment abroad involves more than finding a hospital. GAF Healthcare helps Somali patients connect records from Mogadishu, Hargeisa, Garowe, Bosaso, Kismayo and other regions with an appropriate Indian specialist and hospital, then plan the regular Medical Visa, travel and follow-up around that medical requirement.",
    primaryCta: "Get a Medical Opinion",
    secondaryCta: "Explore Treatments",
    whatsappLabel: "WhatsApp +91 90443 46292",
  },
  quickAnswer: {
    heading: "Quick Answer: Medical Treatment in India for Somali Patients",
    items: [
      {
        question: "Can Somali patients travel to India for medical treatment?",
        answer:
          "Yes. Somali patients can seek medical treatment in India through the applicable Indian Medical Visa process.",
      },
      {
        question: "Can Somali citizens use India's e-Medical Visa?",
        answer:
          "Somali patients should not assume that the e-Medical Visa applies to them. Somalia is not currently included on the Government of India's e-Visa eligible-country list. Current Indian mission guidance provides a regular Medical/Medical Attendant Visa route for Somali nationals.",
      },
      {
        question: "Where can Somali patients apply for an Indian Medical Visa?",
        answer:
          "The High Commission of India in Nairobi is concurrently accredited to Somalia and currently publishes visa services for Somali nationals. The same mission notes that visa services are also available at the Embassy of India in Addis Ababa. Confirm the live receiving Mission before submitting documents. A Mogadishu visa centre has been discussed in official and public reports, but this page does not treat it as a confirmed, currently operating Government of India visa office.",
      },
      {
        question: "What treatments can Somali patients receive in India?",
        answer:
          "Depending on the diagnosis, patients can seek cancer treatment, cardiac care, neurosurgery, orthopaedics, urology, gastrointestinal treatment, fertility treatment, paediatric care, kidney treatment and transplantation, among other specialties.",
      },
      {
        question: "How much does medical treatment in India cost for Somali patients?",
        answer:
          "There is no single price. Costs depend on the diagnosis, hospital, specialist, treatment complexity, medicines, investigations, implants, ICU care and duration of hospitalisation.",
      },
      {
        question: "Can I get a medical opinion before travelling?",
        answer:
          "Yes. Medical records can be shared for preliminary specialist review before the patient travels to India.",
      },
    ],
  },
  why: {
    heading: "Why Somali Patients Consider Medical Treatment in India",
    intro:
      "Travelling from Somalia to India for healthcare is a significant decision for the patient and family. The best starting point is not the hospital. It is the medical problem, and which specialist should review it.",
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
    heading: "India–Somalia Healthcare Relationship",
    paragraphs: [
      "India and Somalia have maintained a longstanding partnership that includes development assistance, capacity building and healthcare cooperation. India's Ministry of External Affairs records the supply of essential medicines, later medical aid and Somalia's participation in India's digital education and health network.",
      "The official MEA India–Somalia brief records that India provided US$1 million worth of essential medicines to Somalia's Ministry of Health in July 2018. In September 2025, India donated 10 tonnes of medical aid, including essential medicines, surgical supplies and hospital equipment.",
      "Somalia is also a partner under India's e-VidyaBharti and e-ArogyaBharti (e-VBAB) Network, the successor to the Pan-African e-Network. The programme provides a digital platform for education and healthcare connectivity. India has also provided capacity-building opportunities to Somali professionals through ITEC; the official brief records that ITEC slots were increased to 30 in 2025.",
      "The High Commission of India in Nairobi, which is concurrently accredited to Somalia, notes that India is a preferred destination for education and medical treatment for Somali nationals. The Mission records that it issued 5,252 visas to Somali nationals in 2024.",
      "These government-to-government relationships provide useful context for a Somalia–India medical pathway. They do not determine which treatment is appropriate for an individual patient.",
    ],
  },
  context: {
    heading: "Somalia's Healthcare Context",
    intro:
      "Somalia's healthcare environment has been shaped by prolonged conflict, displacement, drought, flooding, disease outbreaks and limited healthcare infrastructure. WHO country information describes continuing pressure on access to care, workforce and supply systems.",
    points: [
      "Somali is the principal language of Somalia. Arabic and English also have important official and institutional roles. Indian hospitals generally use English for medical records and specialist consultations, so interpretation should be arranged before travel when needed.",
      "Most international medical journeys begin at Aden Adde International Airport in Mogadishu. Patients travelling from Hargeisa, Garowe, Bosaso, Kismayo or other regions may first need to reach a connecting hub.",
      "For some patients, appropriate treatment is available locally or regionally. International treatment may become relevant when a patient requires a particular subspecialist, advanced procedure, complex surgery, multidisciplinary treatment, a second opinion or a service they have chosen to access outside Somalia.",
      "Patients should always provide their current medication list to the treating Indian specialist and should not independently change medicines because an equivalent-looking product is available.",
    ],
    close:
      "Country-level health indicators do not determine an individual's medical needs. The relevant question is: what is the patient's diagnosis, what treatment is appropriate, and can the patient safely travel for that treatment?",
  },
  overview: {
    heading: "What Medical Treatments Can Somali Patients Get in India?",
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
    heading: "Popular Medical Treatments for Somali Patients in India",
    intro:
      "Each card links only to a live GAF specialty or treatment page. Where GAF does not yet publish a dedicated page, the category is explained without an invented URL.",
    categories: [
      {
        title: "Cancer Treatment",
        body: "Medical, surgical and radiation oncology, including breast, cervical, colorectal, prostate and lymphoma pathways that already have GAF guides. Oesophageal-cancer and liver-cancer cases are coordinated after records review because dedicated pages are not yet published.",
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
        body: "Somali couples may explore IVF, ICSI, IUI and related fertility evaluation in India. GAF does not yet publish a dedicated IVF page. Eligibility, laboratory procedures and applicable Indian regulations should be confirmed with the treating fertility centre before travel.",
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
          { label: "Colon Cancer", href: "/treatments/colon-cancer-treatment-in-india" },
          { label: "Prostate Cancer", href: "/treatments/prostate-cancer-treatment-in-india" },
          { label: "Ovarian Cancer", href: "/treatments/ovarian-cancer-treatment-in-india" },
          { label: "Pancreatic Cancer", href: "/treatments/pancreatic-cancer-treatment-in-india" },
          { label: "Brain Tumour", href: "/treatments/brain-tumor-surgery-in-india" },
          { label: "Leukaemia", href: "/treatments/leukemia-treatment-in-india" },
          { label: "Lymphoma", href: "/treatments/lymphoma-treatment-in-india" },
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
    heading: "Cancer Treatment in India for Somali Patients",
    intro:
      "Cancer is one of the most important treatment areas for Somali patients seeking specialised healthcare. According to the IARC GLOBOCAN 2024 Somalia fact sheet, the country had an estimated 9,983 new cancer cases, 6,155 cancer deaths and 14,392 five-year prevalent cases. These are GLOBOCAN 2024 estimates, not current 2026 case counts, and they should not be interpreted as an individual's diagnosis or prognosis.",
    body: "The same official fact sheet ranks breast first among estimated new cases in both sexes (1,979; 19.8%), followed by cervix uteri (1,089; 10.9%), colorectum (781; 7.8%), prostate (734; 7.4%) and oesophagus (450; 4.5%). Among Somali women, breast cancer was the leading site (1,979; 31.3%), followed by cervical cancer (1,089; 17.2%). Among Somali men, prostate cancer was the leading site (734; 20.1%), followed by colorectal cancer. GAF does not yet publish a dedicated oesophageal-cancer page; those cases are coordinated through the relevant oncology team after records review.",
    modalities: [
      { label: "Breast Cancer", href: "/treatments/breast-cancer-treatment-in-india" },
      { label: "Cervical Cancer", href: "/treatments/cervical-cancer-treatment-in-india" },
      { label: "Colon Cancer", href: "/treatments/colon-cancer-treatment-in-india" },
      { label: "Prostate Cancer", href: "/treatments/prostate-cancer-treatment-in-india" },
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
    heading: "How Much Does Medical Treatment in India Cost for Somali Patients?",
    intro:
      "There is no universal treatment price for Somali patients. Two patients undergoing the same named procedure can have very different clinical requirements. GAF Healthcare presents costs as USD planning estimates from the live catalogue, not hospital quotations.",
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
    heading: "Which Indian Cities Can Somali Patients Consider?",
    intro:
      "The appropriate city depends on the medical condition and treatment. There is no single Indian city that is appropriate for every Somali patient.",
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
    heading: "How Should Somali Patients Choose an Indian Hospital?",
    intro:
      "Start with the diagnosis. Ask whether the hospital treats the specific disease, whether the required specialty and surgeon or oncologist are available, whether ICU and advanced diagnostics are in place, whether international-patient services exist, whether the quotation is transparent, and what follow-up arrangements are available. The campuses below are drawn from GAF’s live India catalogue, one from each published city.",
    directoryLabel: "Browse hospitals in India",
  },
  doctors: {
    heading: "How Should Somali Patients Choose the Right Doctor?",
    intro:
      "The doctor should be matched to the patient's diagnosis and procedure. A useful structure is specialty, subspecialty, procedure, city, hospital and then doctor. The specialists below are taken from GAF’s live doctor catalogue.",
    directoryLabel: "Browse doctors in India",
  },
  visa: {
    heading: "Indian Medical Visa for Somali Patients",
    intro:
      "Somali nationals should currently plan around the regular Indian Medical Visa process rather than assuming that an e-Medical Visa is available. Somalia is not currently included on the Government of India's e-Visa eligible-country list. The High Commission of India in Nairobi, which is concurrently accredited to Somalia, publishes Medical and Medical Attendant Visa instructions for Somali applicants. The same Mission notes that visa services are also available at the Embassy of India in Addis Ababa. A page titled as shifting Somali visa granting to Addis Ababa remains on the Nairobi site; confirm the live receiving Mission before applying.",
    points: [
      "Do not apply through a third-party e-Visa website. The official e-Visa fee list is the eligibility gate, and Somalia is not currently listed there.",
      "The High Commission of India in Nairobi currently states that visa applications are submitted in person, using the Government of India regular visa portal. The Mission's appointment page still lists Kenya, Somalia and Others among the selectable nationalities.",
      "HCI Nairobi currently asks for a signed printed online form, two recent 51 × 51 mm photographs, an Indian hospital invitation emailed to visa.nairobi@mea.gov.in identifying the patient and attendant names, passport numbers, illness, expected duration and estimated cost, and a local hospital or doctor referral emailed to the same address.",
      "The Mission also currently asks for a three-month bank statement or other proof of sufficient funds, attendant relationship documents where a family member will travel, and a Medical Visa undertaking. Processing is currently described as normally three working days, with emergency cases in one working day.",
      "The High Commission notes that the Su-Swagatam app can be used for Business and Medical/Medical Attendant categories. The Mission states that it does not process e-Visa applications.",
      "HCI Nairobi also records that visa services for Somali nationals resumed in Nairobi, in addition to services at the Indian Embassy in Addis Ababa. Because one Nairobi page is titled as shifting Somali visa granting to Addis Ababa, patients should confirm which Mission is currently receiving Somali Medical Visa files before travel.",
      "A visa facilitation centre in Mogadishu has been discussed in official and public reports. This page does not present Mogadishu as a confirmed, currently operating Government of India visa office.",
    ],
    disclaimer:
      "Visa rules, fees, documents, appointment procedures and the receiving Mission can change. Verify the current instructions with the High Commission of India in Nairobi and the Embassy of India in Addis Ababa immediately before applying or travelling.",
    documentsHeading: "Documents for an Indian Medical Visa from Somalia",
    documents: [
      "Signed printed online visa application form",
      "Appointment slip and two recent 51 × 51 mm passport photographs",
      "Somali local hospital or doctor referral, emailed to the visa section",
      "Diagnosis and medical documentation establishing the need for treatment in India",
      "Indian hospital invitation emailed to visa.nairobi@mea.gov.in, identifying the patient's name, passport number, illness, expected duration and estimated treatment cost",
      "Passport and copy, with sufficient remaining validity and blank pages",
      "Three-month bank statement or other proof of sufficient funds",
      "Yellow-fever vaccination certificate and oral-polio (OPV) certificate as currently required for travel from Somalia",
      "Attendant relationship documents and Medical Visa undertaking where applicable",
    ],
    documentsNote:
      "The High Commission currently states that, for Somali applicants, the local referral hospital or doctor and the Indian hospital should send their respective letters directly to the visa section. Applicants normally need to be physically present, although in critical medical cases a blood relative who is a medical attendant may approach the Mission with the application. Confirm the live receiving Mission before sending documents.",
  },
  yellowFever: {
    heading: "Yellow Fever and Polio Requirements for Somali Travellers",
    intro:
      "The High Commission of India in Nairobi currently states that travellers from Somalia require both a yellow-fever vaccination certificate and an oral-polio (OPV) vaccination certificate. This is a mission-specific travel note for Somalia and should be checked again before departure.",
    points: [
      "HCI Nairobi currently asks for yellow-fever vaccination at least 10 days before travel and oral-polio vaccination at least four weeks before travel, administered at a government-approved clinic.",
      "Carry the original certificates during travel. Photocopies or digital copies can be treated as insufficient at the border or at the visa counter.",
      "This page reports the High Commission's Somalia-specific requirement. Confirm on India's IHR points-of-entry guidance whether Somalia is listed as a yellow-fever endemic country of departure at the time of travel; the mission note still applies even if that list changes.",
      "Requirements can change according to travel history, connecting countries and current public-health regulations. A connecting journey through another country may add further vaccination rules.",
    ],
    close:
      "Confirm the current yellow-fever, polio and other health-entry requirements with the High Commission of India in Nairobi, the Embassy of India in Addis Ababa, India’s Bureau of Immigration and the Ministry of Health IHR guidance before booking flights.",
  },
  travel: {
    heading: "Travelling from Somalia to India for Medical Treatment",
    intro:
      "Somali patients may begin their medical journey from Mogadishu, Hargeisa, Garowe, Bosaso, Kismayo or other cities. The principal international gateway is Aden Adde International Airport in Mogadishu. International travel often involves a connecting hub before reaching India.",
    points: [
      "The hospital city should be selected according to the patient's treatment requirement. The flight should then be planned around the confirmed hospital appointment and visa decision.",
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
    heading: "Documents Somali Patients Should Prepare",
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
    heading: "Accommodation, Food and Language for Somali Patients",
    intro:
      "International patients may need accommodation close to the treating hospital. For patients receiving repeated chemotherapy or radiation therapy, staying close to the hospital can be particularly practical. For patients recovering from major surgery, accessibility and proximity to medical care may be more important than the accommodation's tourist location.",
    accommodation: [
      "Hotels, serviced apartments, long-stay apartments or hospital guest accommodation",
      "Distance from the hospital, lift access and wheelchair accessibility",
      "Attendant accommodation, kitchen facilities, pharmacy and grocery access",
    ],
    accommodationNote:
      "For patients undergoing repeated chemotherapy or radiation therapy, staying near the hospital may reduce daily travel.",
    food: "Families may wish to consider halal food, vegetarian options, low-salt or diabetic meals, hospital-prescribed diets and nearby grocery access. Patients undergoing cancer treatment or recovering from surgery should follow the dietary plan provided by their treating team.",
    language:
      "Somali is the principal language of Somalia, while Arabic and English also have important official and institutional roles. Indian hospitals generally use English for medical documentation and specialist consultations. Patients should establish before travelling who will explain the treatment, whether interpretation is required, and whether they understand the consent process. Patients should never sign medical consent documentation they do not understand.",
  },
  stay: {
    heading: "How Long Will a Somali Patient Need to Stay in India?",
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
      "If you are considering treatment in India, begin with your medical records rather than your flight booking. A records-first sequence allows many questions to be addressed before leaving Mogadishu or another Somali city.",
    steps: [
      { title: "Share medical records", body: "Send the relevant reports and a concise medical history." },
      { title: "Get an Indian specialist opinion", body: "The appropriate specialist reviews the available records. A remote opinion does not replace an in-person examination." },
      { title: "Understand treatment options", body: "Discuss the proposed treatment, alternatives and expected timeline." },
      { title: "Select the hospital and doctor", body: "Choose according to the medical requirement." },
      { title: "Receive hospital confirmation", body: "The hospital confirms the consultation or treatment pathway." },
      { title: "Obtain a cost estimate", body: "Request a written estimate showing major inclusions and exclusions." },
      { title: "Apply for the Indian Medical Visa", body: "Use the regular Medical Visa process through the live receiving Indian Mission — currently identified as Nairobi and/or Addis Ababa — rather than assuming e-Medical Visa eligibility." },
      { title: "Arrange travel", body: "Plan flights, accommodation and local transportation around the confirmed hospital schedule and visa decision." },
      { title: "Arrive in India", body: "Proceed to the hospital for consultation and evaluation." },
      { title: "Complete investigations and begin treatment", body: "The treating team may repeat or update diagnostic tests before confirming the final plan." },
      { title: "Recovery and discharge", body: "The hospital provides medication and follow-up instructions." },
      { title: "Return to Somalia and continue follow-up", body: "Travel home when medically fit and maintain follow-up with the Indian treating team and local healthcare professionals." },
    ],
  },
  help: {
    heading: "How GAF Healthcare Can Support Somali Patients",
    intro:
      "GAF Healthcare can coordinate the medical journey between Somalia and India. The exact services available should be confirmed before travel. Medical decisions remain with the patient and treating medical professionals.",
    before: [
      "Medical-record collection and specialist matching",
      "Hospital coordination and second-opinion coordination",
      "Treatment-cost requests and appointment coordination",
      "Medical Visa documentation support and travel planning",
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
    heading: "Can Somali Patients Get a Second Medical Opinion from India?",
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
      "What happens after returning to Somalia?",
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
      q: "Can Somali patients get medical treatment in India?",
      a: "Yes. Somali nationals can apply for the applicable Indian Medical Visa route and travel to India for treatment.",
    },
    {
      q: "Can Somali citizens apply for an Indian e-Medical Visa?",
      a: "Somali nationals should not assume they are eligible for India's e-Medical Visa. Somalia is not currently included on the official e-Visa eligible-country list. Current Indian mission guidance provides a regular Medical Visa route for Somali nationals.",
    },
    {
      q: "Where do Somali patients apply for an Indian Medical Visa?",
      a: "Current Indian mission guidance identifies the High Commission of India in Nairobi, which is concurrently accredited to Somalia, and the Embassy of India in Addis Ababa. Confirm the live receiving Mission before submission. A Mogadishu visa centre has been discussed, but this page does not treat it as a confirmed operating Government of India visa office.",
    },
    {
      q: "What documents are required for a Somali Medical Visa?",
      a: "HCI Nairobi currently lists a signed online form, photographs, a local medical referral, an Indian hospital invitation emailed to visa.nairobi@mea.gov.in, medical documents, passport, proof of funds, a yellow-fever certificate and an oral-polio certificate among the requirements. Confirm the live checklist before applying.",
    },
    {
      q: "Does a Somali patient need an Indian hospital invitation?",
      a: "Yes. The current High Commission guidance for Somali nationals lists an invitation letter from an Indian hospital identifying the patient's name, passport number, illness, expected duration and estimated treatment cost.",
    },
    {
      q: "Can a family member accompany a Somali patient?",
      a: "Yes. Medical Attendant Visa arrangements are available under the applicable Indian visa process. HCI Nairobi currently asks for attendant names, passport numbers and relationship documents. Confirm the exact requirements with the live receiving Mission.",
    },
    {
      q: "Do Somali patients need yellow-fever and polio vaccination?",
      a: "HCI Nairobi currently states that travellers from Somalia need a yellow-fever vaccination certificate and an oral-polio (OPV) certificate. The Mission currently asks for yellow-fever vaccination at least 10 days before travel and OPV at least four weeks before travel.",
    },
    {
      q: "How much does treatment in India cost for Somali patients?",
      a: "There is no fixed price. Cost depends on diagnosis, treatment, hospital, doctor, medicines, investigations, implants, ICU care and length of stay. GAF presents USD planning estimates, not guaranteed hospital quotations.",
    },
    {
      q: "Can Somali patients get cancer treatment in India?",
      a: "Yes. Indian cancer centres provide medical oncology, surgical oncology, radiation oncology and advanced systemic treatment according to the diagnosis.",
    },
    {
      q: "Which cancers are common in Somalia?",
      a: "GLOBOCAN 2024 estimates 9,983 new cancer cases and 6,155 cancer deaths in Somalia. The leading sites by estimated new cases among both sexes were breast, cervix, colorectum, prostate and oesophagus. Among Somali women, breast cancer currently leads, followed by cervical cancer. Among Somali men, prostate cancer currently leads. These are population-level estimates, not an individual diagnosis.",
    },
    {
      q: "Can Somali patients get heart surgery in India?",
      a: "Yes. Indian cardiac centres provide angioplasty, CABG, valve procedures, electrophysiology and other cardiac treatments, subject to specialist assessment.",
    },
    {
      q: "Can Somali patients get IVF treatment in India?",
      a: "Yes. Indian fertility centres provide IVF, ICSI, IUI, embryo-transfer procedures and other fertility services subject to medical and applicable legal requirements. GAF does not yet publish a dedicated IVF page.",
    },
    {
      q: "Can I get a treatment estimate before travelling from Somalia?",
      a: "Yes. Medical records can be submitted for preliminary specialist review and an indicative hospital estimate can be requested.",
    },
    {
      q: "Can I get a second opinion from an Indian specialist?",
      a: "Yes. Medical records can be shared with an appropriate Indian specialist for preliminary second-opinion review before travel. A remote opinion does not replace an in-person examination when one is clinically necessary.",
    },
    {
      q: "Can patients from Mogadishu travel to India for treatment?",
      a: "Yes. Patients can begin the medical-travel process from Mogadishu. Aden Adde International Airport is the principal international gateway. Flight routes depend on current airline schedules and connecting hubs.",
    },
    {
      q: "Can patients from Hargeisa, Garowe or Bosaso seek treatment in India?",
      a: "Yes. Patients from different parts of Somalia can use the same broad medical-treatment pathway, subject to travel, visa and documentation requirements applicable to their passport and circumstances.",
    },
    {
      q: "How long will I need to stay in India?",
      a: "The duration depends on the treatment. Major surgery, cancer treatment and transplantation can require several weeks or longer.",
    },
    {
      q: "Is the hospital estimate final?",
      a: "Not necessarily. A preliminary estimate is based on the information available before treatment. The final plan and cost can change after examination and investigation in India.",
    },
    {
      q: "Which Indian cities can Somali patients consider?",
      a: "Delhi NCR, Mumbai, Chennai, Hyderabad and Bengaluru are live GAF catalogue cities. Pune can also be considered, but this page does not link to a Pune directory because that city is not yet in the live catalogue.",
    },
    {
      q: "Does India have an existing healthcare relationship with Somalia?",
      a: "Yes. Official MEA records include US$1 million of essential medicines supplied in July 2018, 10 tonnes of medical aid donated in September 2025, Somalia's participation in the e-VBAB digital network, and ITEC capacity-building slots. HCI Nairobi records 5,252 visas issued to Somali nationals in 2024.",
    },
    {
      q: "Do Somali patients need interpretation in India?",
      a: "Not necessarily, but it may be useful. Somali is the principal language of Somalia, while Arabic and English also have institutional roles. Indian hospitals generally use English for medical documentation and consultations. Interpretation can be arranged where needed.",
    },
    {
      q: "Is India right for every Somali patient?",
      a: "No. International treatment is not automatically appropriate when the patient is medically unstable, cannot safely fly, needs immediate local treatment, or when the expected benefit does not justify the burden of travel.",
    },
    {
      q: "Does insurance cover treatment in India?",
      a: "Coverage depends on the patient's policy. Confirm whether planned treatment abroad, India, surgery, cancer treatment, medicines, emergency care and medical evacuation are covered, and obtain written confirmation where possible.",
    },
    {
      q: "Does the High Commission of India in Nairobi process e-Visa applications?",
      a: "No. HCI Nairobi currently states that the Mission does not process e-Visa applications. Somali patients should use the regular Medical Visa route through the live receiving Mission.",
    },
  ],
  finalCta: {
    heading: "Start Your Medical Treatment Journey from Somalia to India",
    body: "If you or a family member in Somalia is considering treatment in India, the most useful first step is to share the patient's medical information. Send the diagnosis, medical reports, scans and previous treatment records to GAF Healthcare.",
    primary: "Get a Medical Opinion",
    secondary: "Talk to a Medical Travel Expert",
    whatsappLabel: "WhatsApp +91 90443 46292",
    steps: "Share your medical records → Get a specialist opinion → Review hospital and treatment options → Plan your journey to India",
  },
  disclaimer: {
    heading: "Medical Disclaimer",
    body: "This page is intended for general education and medical-travel planning. It does not replace advice from a qualified healthcare professional. Cancer statistics are population-level estimates and cannot determine an individual's diagnosis or prognosis. Treatment costs are indicative and can change. Visa requirements, fees, documentation, the receiving Mission and immigration regulations can change. Somali patients should verify the latest requirements with the responsible Government of India mission before travelling.",
  },
  sources: {
    heading: "Sources",
    items: [
      {
        label: "Government of India — Official e-Visa portal",
        href: SOMALIA_OFFICIAL_LINKS.eVisa,
        detail: "General e-Visa categories. Country-specific eligibility should be verified against the official fee list before application.",
      },
      {
        label: "Government of India — Country/territory-wise e-Visa fee list",
        href: SOMALIA_OFFICIAL_LINKS.eVisaFees,
        detail: "Official fee table used as the eligibility gate. Somalia is not currently listed.",
      },
      {
        label: "Government of India — Regular visa portal",
        href: SOMALIA_OFFICIAL_LINKS.visaOnline,
        detail: "Online application used for the regular Medical/Medical Attendant Visa route.",
      },
      {
        label: "High Commission of India, Nairobi",
        href: SOMALIA_OFFICIAL_LINKS.embassy,
        detail: "Indian Mission concurrently accredited to Somalia. Publishes visa updates for Somali nationals.",
      },
      {
        label: "High Commission of India, Nairobi — Visa types",
        href: SOMALIA_OFFICIAL_LINKS.embassyVisa,
        detail: "Current Medical/Medical Attendant Visa documents, in-person submission, yellow-fever and oral-polio notes for travel from Somalia.",
      },
      {
        label: "High Commission of India, Nairobi — India–Somalia relations",
        href: SOMALIA_OFFICIAL_LINKS.embassySomali,
        detail: "Records India as a preferred destination for education and medical treatment, and 5,252 visas issued to Somali nationals in 2024.",
      },
      {
        label: "High Commission of India, Nairobi — Somali visa receiving-Mission advisory",
        href: SOMALIA_OFFICIAL_LINKS.embassyShift,
        detail: "Page titled as shifting granting of visas for Somali nationals to the Embassy of India in Addis Ababa. Confirm the live receiving Mission.",
      },
      {
        label: "Embassy of India, Addis Ababa",
        href: SOMALIA_OFFICIAL_LINKS.addis,
        detail: "Also identified in Nairobi guidance as a location providing visa services for Somali nationals.",
      },
      {
        label: "Ministry of External Affairs, India — India–Somalia bilateral brief, April 2026",
        href: SOMALIA_OFFICIAL_LINKS.meaBrief,
        detail: "US$1 million essential medicines in July 2018, 10 tonnes of medical aid in September 2025, e-VBAB cooperation and ITEC capacity building.",
      },
      {
        label: "IARC / WHO — GLOBOCAN 2024 Somalia fact sheet",
        href: SOMALIA_OFFICIAL_LINKS.globocan,
        detail: "Estimated 9,983 new cases, 6,155 deaths and 14,392 five-year prevalent cases, with breast, cervix, colorectum, prostate and oesophagus as leading sites.",
      },
      {
        label: "WHO — Somalia health data overview",
        href: SOMALIA_OFFICIAL_LINKS.whoData,
        detail: "Country-level WHO health information and health-system indicators.",
      },
      {
        label: "Ministry of Health and Family Welfare, India — IHR yellow-fever vaccination",
        href: SOMALIA_OFFICIAL_LINKS.mohfwYellowFever,
        detail: "India’s yellow-fever endemic-country list. Confirm Somalia’s current listing at the time of travel alongside the HCI Nairobi mission note.",
      },
      {
        label: "Government of India — Bureau of Immigration",
        href: SOMALIA_OFFICIAL_LINKS.boi,
        detail: "Entry and immigration instructions for travellers arriving in India.",
      },
    ],
  },
};
