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

export const MOLDOVA_PAGE_PATH = "/moldova/treatment-in-india";
export const MOLDOVA_PAGE_LOCALES = ["en"] as const;
export const MOLDOVA_LAST_REVIEWED = "2026-10-04";

export type MoldovaPageCopy = typeof moldovaPageCopyEn;

export function moldovaPageCopy(_locale: AppLocale): MoldovaPageCopy {
  return moldovaPageCopyEn;
}

const INDIA = "India";

export const MOLDOVA_OFFICIAL_LINKS = {
  eVisa: "https://indianvisaonline.gov.in/evisa/tvoa.html",
  eVisaHome: "https://indianvisaonline.gov.in/evisa/",
  eVisaFees: "https://indianvisaonline.gov.in/evisa/eTV_revised_fee_final.pdf",
  eVisaFeesMedical: "https://www.indianvisaonline.gov.in/evisa/images/eTV_revised_fee_final.pdf",
  visaOnline: "https://indianvisaonline.gov.in/visa/",
  embassy: "https://www.eoibucharest.gov.in/",
  embassyVisa: "https://www.eoibucharest.gov.in/page/visa/",
  embassyEvisa: "https://www.eoibucharest.gov.in/page/e-visa/",
  meaBrief: "https://www.mea.gov.in/Portal/ForeignRelation/India-Moldova.pdf",
  globocan: "https://gco.iarc.who.int/media/globocan/factsheets/populations/498-republic-of-moldova-fact-sheet.pdf",
  iarcToday: "https://gco.iarc.who.int/today/en/fact-sheets-populations",
  whoData: "https://data.who.int/countries/498",
  mohfwYellowFever: "https://ihpoe.mohfw.gov.in/vaccination.php",
  boi: "https://boi.gov.in",
} as const;

export const MOLDOVA_CURATED_TREATMENT_SLUGS = [
  "colon-cancer-treatment-in-india",
  "breast-cancer-treatment-in-india",
  "prostate-cancer-treatment-in-india",
  "cervical-cancer-treatment-in-india",
  "ovarian-cancer-treatment-in-india",
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

export const MOLDOVA_CANCER_TREATMENT_SLUGS = TANZANIA_CANCER_TREATMENT_SLUGS;

export const MOLDOVA_COST_PROCEDURE_NAMES = [
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

export const MOLDOVA_DOCTOR_SPECIALTY_SLUGS = [
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

export function resolveMoldovaCostRows(catalog: Treatment[]) {
  return MOLDOVA_COST_PROCEDURE_NAMES.map((name) => {
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

export function moldovaDoctors(doctors: Doctor[]) {
  return MOLDOVA_DOCTOR_SPECIALTY_SLUGS.map((specialtySlug) => {
    const pool = doctors.filter((doctor) => doctor.specialtySlug === specialtySlug);
    const featured = pool.find((doctor) => doctor.featured);
    return featured ?? [...pool].sort((a, b) => a.name.localeCompare(b.name))[0];
  }).filter((row): row is Doctor => Boolean(row));
}

export const moldovaPageCopyEn = {
  seo: {
    title: "Medical Treatment in India for Moldovan Patients",
    description:
      "Explore medical treatment in India for Moldovan patients. Find specialist doctors, hospitals, treatments, indicative costs, e-Medical Visa guidance and support from GAF Healthcare.",
    keywords: [
      "medical treatment in India for Moldovan patients",
      "medical treatment in India from Moldova",
      "treatment in India for Moldovan patients",
      "medical tourism from Moldova to India",
      "India medical treatment for Moldovan patients",
      "Indian hospitals for Moldovan patients",
      "Indian doctors for Moldovan patients",
      "medical treatment cost in India for Moldovan patients",
      "cancer treatment in India for Moldovan patients",
      "cardiac treatment in India for Moldovan patients",
      "neurosurgery in India for Moldovan patients",
      "orthopaedic treatment in India for Moldovan patients",
      "IVF in India for Moldovan patients",
      "Medical Visa India for Moldovan citizens",
      "e-Medical Visa India for Moldovan citizens",
      "medical second opinion from India",
      "treatment in India from Chișinău",
      "medical tourism India Moldova",
      "healthcare in India for Moldovan patients",
      "India Moldova healthcare cooperation",
    ],
  },
  breadcrumb: {
    home: "Home",
    moldova: "Moldova",
    page: "Treatment in India",
  },
  hero: {
    eyebrow: "Medical treatment in India for Moldovan patients",
    h1: "Medical Treatment in India for Moldovan Patients",
    lede:
      "For a patient travelling from Moldova, the process can begin before a flight is booked. GAF Healthcare helps Moldovan patients share records from Chișinău and other cities with an appropriate Indian specialist, then plan the e-Medical Visa, travel and follow-up around that medical requirement.",
    primaryCta: "Get a Medical Opinion",
    secondaryCta: "Explore Treatments",
    whatsappLabel: "WhatsApp +91 90443 46292",
  },
  quickAnswer: {
    heading: "Quick Answer: Medical Treatment in India for Moldovan Patients",
    items: [
      {
        question: "Can Moldovan patients travel to India for medical treatment?",
        answer:
          "Yes. Moldova is currently included in India's official e-Visa eligible-country list, and India provides e-Medical Visa and e-Medical Attendant Visa categories for eligible applicants. Moldovan patients can also check the regular Medical Visa route where applicable.",
      },
      {
        question: "What treatments can Moldovan patients seek in India?",
        answer:
          "Depending on the diagnosis, patients may explore cancer treatment, cardiology and cardiac surgery, neurosurgery, orthopaedic surgery, knee replacement, hip replacement, spine surgery, urology, gastroenterology and GI surgery, liver and pancreatic surgery, kidney treatment, organ transplantation, IVF and fertility treatment, paediatric treatment, robotic surgery, minimally invasive surgery, radiation oncology, chemotherapy, immunotherapy, targeted therapy, precision oncology and complex second opinions.",
      },
      {
        question: "How much does treatment in India cost for Moldovan patients?",
        answer:
          "There is no universal treatment price. The final estimate depends on the diagnosis, disease stage, hospital, specialist, procedure, medicines, implants, investigations, ICU requirements, hospital stay and possible complications. A hospital-specific estimate should be requested after the patient's medical records have been reviewed.",
      },
      {
        question: "Can Moldovan patients obtain an Indian medical opinion before travelling?",
        answer:
          "Yes. Medical reports, scans, pathology, laboratory results and previous treatment records can be shared with an Indian specialist for an initial review. This can help determine whether treatment in India is appropriate and which specialist or hospital may be relevant.",
      },
    ],
  },
  why: {
    heading: "Why Do Moldovan Patients Consider Medical Treatment in India?",
    intro:
      "Travelling from Moldova to India for healthcare is a significant decision for the patient and family. The best starting point is not the hospital. It is the medical problem, and which specialist should review it.",
    points: [
      "A practical pathway is diagnosis, specialty, treatment, doctor, hospital, cost, visa and then travel",
      "India has tertiary and quaternary hospitals covering cancer, cardiac care, neurosurgery, orthopaedics, urology, gastroenterology, fertility, paediatrics and selected transplantation",
      "Official MEA records identify pharmaceutical exports to Moldova and repeated Indian medical-supply assistance, including about 6,000 kg of COVID-related supplies in July 2020",
      "Multidisciplinary assessment can be useful when surgery, oncology, diagnostics and rehabilitation need to be coordinated",
      "A second medical opinion can be requested from existing records before a flight is booked",
    ],
    close:
      "The appropriate hospital still depends on the individual patient's medical requirements. India should not automatically be considered appropriate for every patient.",
  },
  relationship: {
    heading: "India–Moldova Healthcare and Pharmaceutical Cooperation",
    paragraphs: [
      "India recognised Moldova on 28 December 1991 and established diplomatic relations on 20 March 1992. The official MEA bilateral brief, updated in March 2025, records that India accredits its Ambassador in Bucharest to Moldova, and that Moldova opened a resident Mission in New Delhi in June 2023.",
      "The same official brief identifies drugs and pharmaceutical products among India’s main exports to Moldova. PHARMEXCIL-led pharmaceutical delegations visited Moldova in 2010, 2012 and 2016.",
      "India has also provided direct medical assistance. After a severe drought in 2000, a consignment of 10 tonnes of pharmaceuticals was gifted in May 2001. In July 2020, India donated about 6,000 kg of medicines, medical consumables and other medical supplies in the context of COVID-19, including 700 disposable surgical gowns, 1,750 items of protective equipment and 3,500 surgical gloves.",
      "In March 2022, India extended humanitarian assistance connected with refugees from Ukraine, including pharmaceuticals and protective medical supplies. These published facts provide an India–Moldova healthcare context. They do not determine which treatment is appropriate for an individual patient.",
    ],
  },
  context: {
    heading: "Healthcare Needs in Moldova",
    intro:
      "Moldova has public and private healthcare services. Some patients still travel when they want a particular subspecialist, a second opinion, an advanced procedure or a multidisciplinary pathway they have chosen to access in India.",
    points: [
      "WHO country data for the Republic of Moldova identify noncommunicable diseases, including cardiovascular disease and cancer, as an important part of the national health profile. These country-level indicators do not determine an individual patient's treatment pathway.",
      "Romanian is the official language of Moldova, and Russian is also widely used. Indian hospitals generally use English for medical records and specialist consultations. Romanian- or Russian-language support can be arranged when needed, and important records may need English translation for specialist review.",
      "Most international medical journeys begin at Chișinău International Airport.",
      "For some patients, appropriate treatment is already available in Moldova. International treatment may become relevant when a particular specialist, technology, multidisciplinary service or second opinion is required.",
      "Patients should always provide their current medication list to the treating Indian specialist and should not independently change medicines because an equivalent-looking product is available.",
    ],
    close:
      "Country-level health indicators do not determine an individual's medical needs. The relevant question is: what is the patient's diagnosis, what treatment is appropriate, and can the patient safely travel for that treatment?",
  },
  overview: {
    heading: "What Medical Treatments Can Moldovan Patients Get in India?",
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
    heading: "Popular Medical Treatments for Moldovan Patients in India",
    intro:
      "Each card links only to a live GAF specialty or treatment page. Where GAF does not yet publish a dedicated page, the category is explained without an invented URL.",
    categories: [
      {
        title: "Cancer Treatment",
        body: "Medical, surgical and radiation oncology, including colorectal, breast, prostate, cervical and ovarian pathways that already have GAF guides. Lung-cancer, stomach-cancer, liver-cancer and corpus-uteri cases are coordinated after records review because dedicated pages are not yet published.",
        href: "/treatments/colon-cancer-treatment-in-india",
        hrefLabel: "Colon cancer treatment in India",
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
        body: "Moldovan patients may explore IVF, ICSI, IUI and related fertility evaluation in India. GAF does not yet publish a dedicated IVF page. Eligibility, laboratory procedures and applicable Indian regulations should be confirmed with the treating fertility centre before travel.",
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
          { label: "Colon Cancer", href: "/treatments/colon-cancer-treatment-in-india" },
          { label: "Breast Cancer", href: "/treatments/breast-cancer-treatment-in-india" },
          { label: "Prostate Cancer", href: "/treatments/prostate-cancer-treatment-in-india" },
          { label: "Cervical Cancer", href: "/treatments/cervical-cancer-treatment-in-india" },
          { label: "Ovarian Cancer", href: "/treatments/ovarian-cancer-treatment-in-india" },
          { label: "Pancreatic Cancer", href: "/treatments/pancreatic-cancer-treatment-in-india" },
          { label: "Brain Tumour", href: "/treatments/brain-tumor-surgery-in-india" },
          { label: "Leukaemia", href: "/treatments/leukemia-treatment-in-india" },
          { label: "Lymphoma", href: "/treatments/lymphoma-treatment-in-india" },
          { label: "Lung Cancer", href: "" },
          { label: "Stomach Cancer", href: "" },
          { label: "Liver Cancer", href: "" },
          { label: "Corpus Uteri Cancer", href: "" },
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
    heading: "Cancer Treatment in India for Moldovan Patients",
    intro:
      "Cancer is one of the most important treatment areas for Moldovan patients seeking specialised healthcare. According to the IARC GLOBOCAN 2024 Republic of Moldova fact sheet, the country had an estimated 11,349 new cancer cases, 6,141 cancer deaths and 28,151 five-year prevalent cases. These are GLOBOCAN 2024 estimates, not current 2026 case counts, and they should not be interpreted as an individual's diagnosis or prognosis.",
    body: "The same official fact sheet ranks colorectum first among estimated new cases in both sexes (1,785; 15.7%), followed by breast (1,459; 12.9%), lung (1,025; 9.0%), prostate (909; 8.0%) and stomach (499; 4.4%). Among Moldovan women, breast cancer was the leading site (1,459; 27.0%), followed by colorectum and corpus uteri. Among Moldovan men, colorectal cancer was the leading site (1,014; 17.1%), followed by prostate and lung. GAF does not yet publish dedicated lung-cancer, stomach-cancer, liver-cancer or corpus-uteri pages; those cases are coordinated through the relevant oncology team after records review.",
    modalities: [
      { label: "Colon Cancer", href: "/treatments/colon-cancer-treatment-in-india" },
      { label: "Breast Cancer", href: "/treatments/breast-cancer-treatment-in-india" },
      { label: "Prostate Cancer", href: "/treatments/prostate-cancer-treatment-in-india" },
      { label: "Cervical Cancer", href: "/treatments/cervical-cancer-treatment-in-india" },
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
    heading: "How Much Does Medical Treatment in India Cost for Moldovan Patients?",
    intro:
      "There is no universal treatment price for Moldovan patients. Two patients undergoing the same named procedure can have very different clinical requirements. GAF Healthcare presents costs as USD planning estimates from the live catalogue, not hospital quotations.",
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
    heading: "Which Indian Cities Can Moldovan Patients Consider?",
    intro:
      "The appropriate city depends on the medical condition and treatment. There is no single Indian city that is appropriate for every Moldovan patient.",
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
    heading: "How Should Moldovan Patients Choose an Indian Hospital?",
    intro:
      "Start with the diagnosis. Ask whether the hospital treats the specific disease, whether the required specialty and surgeon or oncologist are available, whether ICU and advanced diagnostics are in place, whether international-patient services exist, whether the quotation is transparent, and what follow-up arrangements are available. The campuses below are drawn from GAF’s live India catalogue, one from each published city.",
    directoryLabel: "Browse hospitals in India",
  },
  doctors: {
    heading: "How Should Moldovan Patients Choose the Right Doctor?",
    intro:
      "The doctor should be matched to the patient's diagnosis and procedure. A useful structure is specialty, subspecialty, procedure, city, hospital and then doctor. The specialists below are taken from GAF’s live doctor catalogue.",
    directoryLabel: "Browse doctors in India",
  },
  visa: {
    heading: "Indian e-Medical Visa for Moldovan Patients",
    intro:
      "Moldova is currently listed among the countries eligible for India's e-Visa system. Medical treatment is an eligible purpose. The official portal provides e-Medical and e-Medical Attendant categories. The Embassy of India in Bucharest, which is accredited to Moldova, currently states that nationals of Moldova can apply for e-Visa categories including Medical and Medical Attendant.",
    points: [
      "Eligible applicants can apply online. The current official portal states that e-Medical and e-Medical Attendant applications may be submitted at least four days before arrival, with an arrival-date selection window of up to 120 days.",
      "A category-wise official e-Visa fee table currently lists Moldova at US$80 for e-Medical and e-Medical Attendant visas. The single-column official fee list also shows Moldova at US$80. Confirm the live amount for the chosen category before payment. A bank charge is stated on the official portal.",
      "The current official guidance states that up to two e-Medical Attendant Visas can be issued against one e-Medical Visa.",
      "The current official portal lists e-Medical and e-Medical Attendant visas with one-year validity from the date of arrival and multiple entries. Confirm the live category notes before applying.",
      "An e-Medical Visa application requires the documents specified by the Government of India, including a passport bio page, a recent photograph, sufficient funds, a return or onward ticket, and an Indian hospital letter on letterhead that identifies the patient's name, nationality, passport number and the tentative admission or treatment date.",
      "Some patients may still need India's regular Medical Visa through the Embassy of India in Bucharest, especially if they hold a travel document other than an ordinary Moldovan passport or if the e-Visa route does not apply. Confirm the live Mission instructions before submitting documents.",
      "Do not use a third-party e-Visa website. The Embassy of India in Bucharest cautions applicants to use only the official Government of India e-Visa portal. The official e-Visa fee list is the eligibility gate.",
    ],
    disclaimer:
      "Visa rules, fees, documents and entry regulations can change. Verify the current official Indian e-Visa portal and the Embassy of India in Bucharest immediately before applying or travelling.",
    documentsHeading: "Documents for an Indian e-Medical Visa or regular Medical Visa from Moldova",
    documents: [
      "Passport with at least six months’ validity and two blank pages",
      "Recent photograph and passport bio page",
      "Indian hospital letter with tentative admission or treatment date for an e-Medical Visa",
      "Return or onward ticket and proof of sufficient funds",
      "Yellow-fever vaccination certificate if the traveller has recently been in, or transited landside through, a listed endemic country",
      "Attendant passports and documents where a family member will travel",
    ],
    documentsNote:
      "Patients should determine which visa route applies to their circumstances rather than submitting documents based on an outdated third-party checklist. e-Visa enquiries should be made on the official Government of India portal.",
  },
  yellowFever: {
    heading: "Yellow Fever and Health-Entry Requirements for Moldovan Travellers",
    intro:
      "The Republic of Moldova is not listed among yellow-fever endemic countries on India's IHR points-of-entry guidance. A yellow-fever certificate can still be required if the traveller has recently been in, or transited landside through, a listed endemic country.",
    points: [
      "India's IHR guidance states that a yellow-fever certificate becomes valid 10 days after vaccination where one is required.",
      "Carry the original certificate when a certificate is required. Photocopies or digital copies can be treated as insufficient at the border.",
      "The Embassy of India in Bucharest currently publishes e-Visa and regular visa-service information for Moldova. Confirm any additional Mission-specific health-entry documents before departure.",
      "Requirements can change according to connecting airports and current public-health regulations.",
    ],
    close:
      "Confirm the current requirement on the official Indian visa portal, the Bureau of Immigration, India's IHR yellow-fever list and the Embassy of India in Bucharest before travel.",
  },
  travel: {
    heading: "Travelling from Moldova to India for Medical Treatment",
    intro:
      "Most Moldovan patients begin their international journey from Chișinău. The main international gateway is Chișinău International Airport.",
    points: [
      "The hospital city should be selected according to the patient's treatment requirement. The flight should then be planned around the confirmed hospital appointment.",
      "Patients with significant medical conditions should ask their treating doctor whether they are medically fit for commercial air travel.",
      "It is generally better to confirm the medical opinion, specialist, hospital, proposed treatment, hospital invitation and visa before booking a fixed return ticket.",
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
    heading: "Documents Moldovan Patients Should Prepare",
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
    heading: "Accommodation, Food and Language for Moldovan Patients",
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
      "Romanian is the official language of Moldova, and Russian is also widely used. Indian hospitals generally use English for medical documentation and specialist consultations. Romanian- or Russian-language support can be arranged where needed. Patients should never sign medical consent documentation they do not understand.",
  },
  stay: {
    heading: "How Long Will a Moldovan Patient Need to Stay in India?",
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
      "If you are considering treatment in India, begin with your medical records rather than your flight booking. A records-first sequence allows many questions to be addressed before leaving Chișinău.",
    steps: [
      { title: "Share medical records", body: "Send the relevant reports and a concise medical history." },
      { title: "Get an Indian specialist opinion", body: "The appropriate specialist reviews the available records. A remote opinion does not replace an in-person examination." },
      { title: "Understand treatment options", body: "Discuss the proposed treatment, alternatives and expected timeline." },
      { title: "Select the hospital and doctor", body: "Choose according to the medical requirement." },
      { title: "Receive hospital confirmation", body: "The hospital confirms the consultation or treatment pathway." },
      { title: "Obtain a cost estimate", body: "Request a written estimate showing major inclusions and exclusions." },
      { title: "Apply for the Indian Medical Visa", body: "Use the current official e-Medical Visa process, or the regular Medical Visa through the Embassy of India in Bucharest if that route applies." },
      { title: "Arrange travel", body: "Plan flights, accommodation and local transportation around the confirmed hospital schedule after the visa is issued." },
      { title: "Arrive in India", body: "Proceed to the hospital for consultation and evaluation." },
      { title: "Complete investigations and begin treatment", body: "The treating team may repeat or update diagnostic tests before confirming the final plan." },
      { title: "Recovery and discharge", body: "The hospital provides medication and follow-up instructions." },
      { title: "Return to Moldova and continue follow-up", body: "Travel home when medically fit and maintain follow-up with the Indian treating team and local healthcare professionals." },
    ],
  },
  help: {
    heading: "How GAF Healthcare Can Support Moldovan Patients",
    intro:
      "GAF Healthcare can coordinate the medical journey between Moldova and India. The exact services available should be confirmed before travel. Medical decisions remain with the patient and treating medical professionals.",
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
    heading: "Can Moldovan Patients Get a Second Medical Opinion from India?",
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
      "What happens after returning to Moldova?",
    ],
    specialist: [
      "Colorectal cancer → colorectal surgeon, medical oncologist, radiation oncologist",
      "Breast cancer → breast or surgical oncologist, medical oncologist, radiation oncologist",
      "Prostate cancer → urologist or uro-oncologist, radiation oncologist, medical oncologist where required",
      "Heart disease → cardiologist, interventional cardiologist, cardiac surgeon where required",
    ],
  },
  faqHeading: "Frequently Asked Questions",
  faqs: [
    {
      q: "Can Moldovan citizens get medical treatment in India?",
      a: "Yes. Moldovan citizens can travel to India for medical treatment using the applicable e-Medical Visa or regular Medical Visa route, subject to current Indian immigration requirements.",
    },
    {
      q: "Is Moldova eligible for India's e-Medical Visa?",
      a: "Yes. Moldova is included in India's official e-Visa eligible-country list, and the e-Visa system includes e-Medical and e-Medical Attendant categories. A category-wise official fee table currently lists those medical categories at US$80. Confirm the live amount before payment.",
    },
    {
      q: "Can a family member accompany a Moldovan patient?",
      a: "Yes. Eligible attendants can use the Medical Attendant or e-Medical Attendant route. The current e-Visa rules allow up to two e-Medical Attendant Visas against one e-Medical Visa.",
    },
    {
      q: "What cancers are common in Moldova?",
      a: "GLOBOCAN 2024 estimates 11,349 new cancer cases and 6,141 cancer deaths in the Republic of Moldova. The leading sites by estimated new cases among both sexes were colorectum, breast, lung, prostate and stomach. These are population-level estimates, not an individual diagnosis.",
    },
    {
      q: "Can Moldovan patients get cancer treatment in India?",
      a: "Yes. Indian oncology centres treat a wide range of cancers using surgery, chemotherapy, radiation therapy, immunotherapy, targeted therapy and other approaches where clinically appropriate.",
    },
    {
      q: "How much does cancer treatment cost in India?",
      a: "There is no single price. Cost depends on cancer type, stage, treatment plan, medicines, hospital, specialist, investigations and treatment duration.",
    },
    {
      q: "Can I obtain a treatment estimate before travelling?",
      a: "Yes. A hospital can usually provide a preliminary estimate after reviewing relevant medical records.",
    },
    {
      q: "Can I obtain a second opinion from an Indian specialist?",
      a: "Yes. Medical records can be shared with an Indian specialist for an independent medical opinion before travelling.",
    },
    {
      q: "Which Indian city is best for Moldovan patients?",
      a: "There is no universal best city. Delhi NCR, Mumbai, Chennai, Hyderabad and Bengaluru are live GAF catalogue cities. Pune can also be considered, but this page does not link to a Pune directory because that city is not yet in the live catalogue. The appropriate destination depends on the patient's diagnosis and required specialty.",
    },
    {
      q: "How long do Moldovan patients need to stay in India?",
      a: "It depends on the treatment. A consultation may require a short visit, while surgery, radiation therapy, chemotherapy or transplantation can require a substantially longer stay.",
    },
    {
      q: "Can GAF Healthcare help Moldovan patients?",
      a: "GAF Healthcare can coordinate specialist opinions, hospital selection, treatment estimates, medical visa documentation, travel arrangements and other medical-tourism logistics.",
    },
    {
      q: "How early can a Moldovan patient apply for an e-Medical Visa?",
      a: "The current Government of India guidance says eligible applicants for e-Medical and e-Medical Attendant visas can apply online at least four days before arrival, with a 120-day window.",
    },
    {
      q: "How long is India's e-Medical Visa valid?",
      a: "The current official e-Visa portal lists the e-Medical Visa as one year from arrival with multiple entries. Patients should verify the live portal at the time of application.",
    },
    {
      q: "Do Moldovan patients need a yellow-fever certificate?",
      a: "The Republic of Moldova is not listed among yellow-fever endemic countries on India's IHR points-of-entry guidance. A certificate can still be required if the traveller has recently been in, or transited landside through, a listed endemic country.",
    },
    {
      q: "Can patients apply through the Embassy of India in Bucharest?",
      a: "Yes. India accredits its Ambassador in Bucharest to Moldova. The Embassy publishes e-Visa notes for Moldovan nationals and receives regular visa applications. Patients who are unsure about e-Visa eligibility should confirm the live Mission instructions.",
    },
    {
      q: "Can I send my medical reports from Chișinău?",
      a: "Yes. Patients from Chișinău and other parts of Moldova can share records before travel. Indian hospitals may request English translations of important Romanian- or Russian-language records.",
    },
    {
      q: "Does India have healthcare and pharmaceutical ties with Moldova?",
      a: "Yes. Official MEA records identify drugs and pharmaceutical products among India’s main exports to Moldova, record PHARMEXCIL visits, and describe Indian medical-supply assistance including about 6,000 kg of COVID-related supplies in July 2020.",
    },
    {
      q: "Can Moldovan medical records be submitted in Romanian or Russian?",
      a: "They can be submitted for preliminary coordination, but Indian hospitals may request English translations of important records. Pathology, imaging and treatment summaries are particularly important.",
    },
    {
      q: "Can Moldovan patients receive communication support in Romanian or Russian?",
      a: "Communication support can be coordinated where required. Indian hospitals generally use English for clinical communication, so Romanian- or Russian-language assistance can be useful for complex treatment.",
    },
    {
      q: "Can Moldovan patients get heart surgery in India?",
      a: "Yes. Indian cardiac centres provide procedures including angioplasty, CABG, valve surgery, electrophysiology and other cardiac treatments, subject to specialist assessment.",
    },
    {
      q: "Can Moldovan patients get IVF treatment in India?",
      a: "Yes. Indian fertility centres provide IVF, ICSI, IUI, embryo-transfer procedures and other fertility services subject to medical and applicable legal requirements. GAF does not yet publish a dedicated IVF page.",
    },
    {
      q: "Is India right for every Moldovan patient?",
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
      q: "Should I book flights before the Medical Visa is issued?",
      a: "It is generally better to wait until the hospital invitation has been issued and the applicable visa has been granted before making non-refundable travel arrangements.",
    },
  ],
  finalCta: {
    heading: "Start Your Medical Treatment Journey from Moldova to India",
    body: "If you or a family member in Moldova is considering treatment in India, the most useful first step is to share the patient's medical information. Send the diagnosis, medical reports, scans and previous treatment records to GAF Healthcare.",
    primary: "Get a Medical Opinion",
    secondary: "Talk to a Medical Travel Expert",
    whatsappLabel: "WhatsApp +91 90443 46292",
    steps: "Share your medical records → Get a specialist opinion → Review hospital and treatment options → Plan your journey to India",
  },
  disclaimer: {
    heading: "Medical Disclaimer",
    body: "This page is intended for general education and medical-travel planning. It does not replace advice from a qualified healthcare professional. Cancer statistics are population-level estimates and cannot determine an individual's diagnosis or prognosis. Treatment costs are indicative and can change. Visa requirements, fees, documentation and immigration regulations can change. Moldovan patients should verify the latest medical, immigration and travel requirements before travelling.",
  },
  sources: {
    heading: "Sources",
    items: [
      {
        label: "Government of India — Official e-Visa portal",
        href: MOLDOVA_OFFICIAL_LINKS.eVisa,
        detail: "Current e-Visa categories, including e-Medical and e-Medical Attendant.",
      },
      {
        label: "Government of India — Country/territory-wise e-Visa fee list",
        href: MOLDOVA_OFFICIAL_LINKS.eVisaFees,
        detail: "Official fee table used as the eligibility gate. Moldova is listed at US$80.",
      },
      {
        label: "Government of India — Category-wise e-Visa fee table",
        href: MOLDOVA_OFFICIAL_LINKS.eVisaFeesMedical,
        detail: "Official table currently listing Moldova at US$80 for e-Medical and e-Medical Attendant visas.",
      },
      {
        label: "Embassy of India, Bucharest — accredited to Moldova",
        href: MOLDOVA_OFFICIAL_LINKS.embassy,
        detail: "Official Mission website for visa, consular and bilateral information covering Romania and Moldova.",
      },
      {
        label: "Embassy of India, Bucharest — regular visa services",
        href: MOLDOVA_OFFICIAL_LINKS.embassyVisa,
        detail: "Embassy notes on regular visa applications for residents of Romania and Moldova.",
      },
      {
        label: "Embassy of India, Bucharest — e-Visa notes",
        href: MOLDOVA_OFFICIAL_LINKS.embassyEvisa,
        detail: "Embassy statement that nationals of Moldova can apply for e-Visa categories including Medical and Medical Attendant.",
      },
      {
        label: "Ministry of External Affairs, India — India–Moldova bilateral brief, March 2025",
        href: MOLDOVA_OFFICIAL_LINKS.meaBrief,
        detail: "Diplomatic relations from March 1992, pharmaceutical exports, 6,000 kg COVID medical supplies and other humanitarian assistance.",
      },
      {
        label: "IARC / WHO — GLOBOCAN 2024 Republic of Moldova fact sheet",
        href: MOLDOVA_OFFICIAL_LINKS.globocan,
        detail: "Estimated 11,349 new cases, 6,141 deaths and 28,151 five-year prevalent cases, with colorectum, breast, lung, prostate and stomach as leading sites.",
      },
      {
        label: "WHO — Republic of Moldova health data overview",
        href: MOLDOVA_OFFICIAL_LINKS.whoData,
        detail: "Country-level WHO health information and health-system indicators.",
      },
      {
        label: "Ministry of Health and Family Welfare, India — IHR yellow-fever vaccination",
        href: MOLDOVA_OFFICIAL_LINKS.mohfwYellowFever,
        detail: "India’s yellow-fever endemic-country list. Moldova is not listed as an endemic country of departure.",
      },
      {
        label: "Government of India — Bureau of Immigration",
        href: MOLDOVA_OFFICIAL_LINKS.boi,
        detail: "Entry and immigration instructions for travellers arriving in India.",
      },
    ],
  },
};
