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

export const SOUTH_AFRICA_PAGE_PATH = "/south-africa/treatment-in-india";
export const SOUTH_AFRICA_PAGE_LOCALES = ["en"] as const;
export const SOUTH_AFRICA_LAST_REVIEWED = "2026-10-03";

export type SouthAfricaPageCopy = typeof southAfricaPageCopyEn;

export function southAfricaPageCopy(_locale: AppLocale): SouthAfricaPageCopy {
  return southAfricaPageCopyEn;
}

const INDIA = "India";

export const SOUTH_AFRICA_OFFICIAL_LINKS = {
  eVisa: "https://indianvisaonline.gov.in/evisa/tvoa.html",
  eVisaHome: "https://indianvisaonline.gov.in/evisa/",
  eVisaFees: "https://indianvisaonline.gov.in/evisa/eTV_revised_fee_final.pdf",
  visaOnline: "https://indianvisaonline.gov.in/visa/",
  embassy: "https://www.hcipretoria.gov.in/",
  embassyVisa: "https://www.hcipretoria.gov.in/",
  embassyEvisa: "https://www.hcipretoria.gov.in/page/e-visa/",
  embassyFoc: "https://www.hcipretoria.gov.in/section/news/11th-round-of-foreign-office-consultations-between-india-and-south-africa/",
  meaBrief: "https://www.mea.gov.in/Portal/ForeignRelation/Bilateral-brief_SA-for-XPD-June-2024.pdf",
  globocan: "https://gco.iarc.who.int/media/globocan/factsheets/populations/710-south-africa-fact-sheet.pdf",
  iarcToday: "https://gco.iarc.who.int/today/en/fact-sheets-populations",
  whoData: "https://data.who.int/countries/710",
  mohfwYellowFever: "https://ihpoe.mohfw.gov.in/vaccination.php",
  boi: "https://boi.gov.in",
} as const;

export const SOUTH_AFRICA_CURATED_TREATMENT_SLUGS = [
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

export const SOUTH_AFRICA_CANCER_TREATMENT_SLUGS = TANZANIA_CANCER_TREATMENT_SLUGS;

export const SOUTH_AFRICA_COST_PROCEDURE_NAMES = [
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

export const SOUTH_AFRICA_DOCTOR_SPECIALTY_SLUGS = [
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

export function resolveSouthAfricaCostRows(catalog: Treatment[]) {
  return SOUTH_AFRICA_COST_PROCEDURE_NAMES.map((name) => {
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

export function southAfricaDoctors(doctors: Doctor[]) {
  return SOUTH_AFRICA_DOCTOR_SPECIALTY_SLUGS.map((specialtySlug) => {
    const pool = doctors.filter((doctor) => doctor.specialtySlug === specialtySlug);
    const featured = pool.find((doctor) => doctor.featured);
    return featured ?? [...pool].sort((a, b) => a.name.localeCompare(b.name))[0];
  }).filter((row): row is Doctor => Boolean(row));
}

export const southAfricaPageCopyEn = {
  seo: {
    title: "Medical Treatment in India for South African Patients",
    description:
      "Explore medical treatment in India for South African patients. Find specialist doctors, hospitals, treatments, indicative costs, e-Medical Visa guidance and support from GAF Healthcare.",
    keywords: [
      "medical treatment in India for South African patients",
      "medical treatment in India from South Africa",
      "treatment in India for South African patients",
      "medical tourism from South Africa to India",
      "India medical treatment for South African patients",
      "Indian hospitals for South African patients",
      "Indian doctors for South African patients",
      "medical treatment cost in India for South African patients",
      "cancer treatment in India for South African patients",
      "cardiac treatment in India for South African patients",
      "heart surgery in India for South African patients",
      "neurosurgery in India for South African patients",
      "orthopaedic treatment in India for South African patients",
      "IVF in India for South African patients",
      "medical visa India for South African citizens",
      "e-Medical Visa India for South African citizens",
      "Indian Medical Visa from South Africa",
      "treatment in India from Johannesburg",
      "medical treatment from Cape Town to India",
      "medical treatment from Durban to India",
      "medical tourism India South Africa",
      "healthcare India for South African patients",
      "cancer treatment India from South Africa",
      "hospital treatment in India from South Africa",
    ],
  },
  breadcrumb: {
    home: "Home",
    southAfrica: "South Africa",
    page: "Treatment in India",
  },
  hero: {
    eyebrow: "Medical treatment in India for South African patients",
    h1: "Medical Treatment in India for South African Patients",
    lede:
      "For a patient travelling from South Africa, choosing treatment abroad involves more than finding a hospital. GAF Healthcare helps South African patients connect records from Johannesburg, Cape Town, Durban, Pretoria, Gqeberha and other cities with an appropriate Indian specialist and hospital, then plan the e-Medical Visa, travel and follow-up around that medical requirement.",
    primaryCta: "Get a Medical Opinion",
    secondaryCta: "Explore Treatments",
    whatsappLabel: "WhatsApp +91 90443 46292",
  },
  quickAnswer: {
    heading: "Quick Answer: Medical Treatment in India for South African Patients",
    items: [
      {
        question: "Can South African patients travel to India for medical treatment?",
        answer:
          "Yes. South African citizens can travel to India for medical treatment using the applicable Indian Medical Visa or e-Medical Visa route. South Africa is currently included in India's official e-Visa eligible-country list.",
      },
      {
        question: "Can South African citizens apply for an Indian e-Medical Visa?",
        answer:
          "Yes. South Africa is listed among the countries eligible for India's e-Visa services, which include e-Medical and e-Medical Attendant Visas. The official fee list currently shows South Africa at US$00 (gratis). Confirm the live amount before payment.",
      },
      {
        question: "What treatments can South African patients receive in India?",
        answer:
          "Depending on the diagnosis, patients can seek treatment in oncology, cardiology, cardiac surgery, neurosurgery, orthopaedics, urology, gastroenterology, nephrology, transplantation, IVF and fertility, paediatrics and many other specialties.",
      },
      {
        question: "Which Indian cities can South African patients consider?",
        answer:
          "Delhi NCR, Mumbai, Chennai, Bengaluru and Hyderabad are major medical centres. The appropriate destination depends on the patient's condition, required procedure, specialist and hospital.",
      },
      {
        question: "How much does treatment in India cost for South African patients?",
        answer:
          "There is no universal price. Costs vary according to diagnosis, treatment complexity, hospital, doctor, medicines, investigations, implants, ICU requirements, hospital stay and other clinical factors.",
      },
      {
        question: "Can I get a medical opinion before travelling?",
        answer:
          "Yes. Medical records can be shared for preliminary review by an appropriate Indian specialist before travel.",
      },
    ],
  },
  why: {
    heading: "Why South African Patients Consider Medical Treatment in India",
    intro:
      "Travelling from South Africa to India for healthcare is a significant decision for the patient and family. The best starting point is not the hospital. It is the medical problem, and which specialist should review it.",
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
    heading: "India–South Africa Healthcare and Medical Cooperation",
    paragraphs: [
      "India and South Africa have a long-standing strategic relationship. The official MEA brief records that the two countries signed a Strategic Partnership in March 1997 — the Red Fort Declaration — making South Africa India's first strategic partner. 2023 marked 30 years of re-established diplomatic relations.",
      "The same official brief records that bilateral agreements have been concluded in diverse areas including health, science and technology, and human-resource development through ITEC. South Africa's Minister of Health attended the G20 Health Ministers' Meeting in Gandhinagar on 18–19 August 2023 during India's G20 Presidency.",
      "The High Commission of India in Pretoria records that the 11th round of Foreign Office Consultations, held in New Delhi on 3 August 2022, reviewed the spectrum of bilateral relations including cooperation in health.",
      "These government-to-government relationships provide useful context for a South Africa–India medical pathway. They do not determine which treatment is appropriate for an individual patient.",
    ],
  },
  context: {
    heading: "South Africa's Healthcare Context",
    intro:
      "South Africa has a substantial public and private healthcare system. Some patients still travel when they want a particular subspecialist, a second opinion, an advanced procedure or a multidisciplinary pathway they have chosen to access in India.",
    points: [
      "South Africa has 11 official languages, including English, Afrikaans, isiZulu and isiXhosa. English is widely used in South African healthcare and in Indian hospitals, which can simplify consultations, consent and discharge instructions.",
      "Many international medical journeys begin at O.R. Tambo International Airport in Johannesburg. Patients may also depart from Cape Town, Durban, Pretoria or Gqeberha depending on the itinerary.",
      "For some patients, appropriate treatment is already available in South Africa. International treatment may become relevant when a particular specialist, technology, multidisciplinary service or second opinion is required.",
      "Patients should always provide their current medication list to the treating Indian specialist and should not independently change medicines because an equivalent-looking product is available.",
    ],
    close:
      "Country-level health indicators do not determine an individual's medical needs. The relevant question is: what is the patient's diagnosis, what treatment is appropriate, and can the patient safely travel for that treatment?",
  },
  overview: {
    heading: "What Medical Treatments Can South African Patients Get in India?",
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
    heading: "Popular Medical Treatments for South African Patients in India",
    intro:
      "Each card links only to a live GAF specialty or treatment page. Where GAF does not yet publish a dedicated page, the category is explained without an invented URL.",
    categories: [
      {
        title: "Cancer Treatment",
        body: "Medical, surgical and radiation oncology, including prostate, breast, cervical, colorectal and lymphoma pathways that already have GAF guides. Lung-cancer cases are coordinated after records review because a dedicated page is not yet published.",
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
        body: "South African couples may explore IVF, ICSI, IUI and related fertility evaluation in India. GAF does not yet publish a dedicated IVF page. Eligibility, laboratory procedures and applicable Indian regulations should be confirmed with the treating fertility centre before travel.",
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
    heading: "Cancer Treatment in India for South African Patients",
    intro:
      "Cancer is one of the most important treatment areas for South African patients seeking specialised healthcare. According to the IARC GLOBOCAN 2024 South Africa fact sheet, the country had an estimated 101,598 new cancer cases, 55,356 cancer deaths and 240,745 five-year prevalent cases. These are GLOBOCAN 2024 estimates, not current 2026 case counts, and they should not be interpreted as an individual's diagnosis or prognosis.",
    body: "The same official fact sheet ranks prostate first among estimated new cases in both sexes (15,060; 14.8%), followed by breast (13,338; 13.1%), cervix uteri (9,794; 9.6%), lung (7,693; 7.6%) and colorectum (6,816; 6.7%). Among South African women, breast cancer was the leading site (13,338; 25.1%), followed by cervical cancer (9,794; 18.4%). Among South African men, prostate cancer was the leading site (15,060; 31.1%), followed by lung. GAF does not yet publish a dedicated lung-cancer page; those cases are coordinated through the relevant oncology team after records review.",
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
    heading: "How Much Does Medical Treatment in India Cost for South African Patients?",
    intro:
      "There is no universal treatment price for South African patients. Two patients undergoing the same named procedure can have very different clinical requirements. GAF Healthcare presents costs as USD planning estimates from the live catalogue, not hospital quotations.",
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
    heading: "Which Indian Cities Can South African Patients Consider?",
    intro:
      "The appropriate city depends on the medical condition and treatment. There is no single Indian city that is appropriate for every South African patient.",
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
    heading: "How Should South African Patients Choose an Indian Hospital?",
    intro:
      "Start with the diagnosis. Ask whether the hospital treats the specific disease, whether the required specialty and surgeon or oncologist are available, whether ICU and advanced diagnostics are in place, whether international-patient services exist, whether the quotation is transparent, and what follow-up arrangements are available. The campuses below are drawn from GAF’s live India catalogue, one from each published city.",
    directoryLabel: "Browse hospitals in India",
  },
  doctors: {
    heading: "How Should South African Patients Choose the Right Doctor?",
    intro:
      "The doctor should be matched to the patient's diagnosis and procedure. A useful structure is specialty, subspecialty, procedure, city, hospital and then doctor. The specialists below are taken from GAF’s live doctor catalogue.",
    directoryLabel: "Browse doctors in India",
  },
  visa: {
    heading: "Indian e-Medical Visa for South African Patients",
    intro:
      "South Africa is currently listed among the countries eligible for India's e-Visa system. Medical treatment is an eligible purpose. The official portal provides e-Medical and e-Medical Attendant categories. The High Commission of India in Pretoria publishes an e-Visa page directing applicants to the official Government of India process.",
    points: [
      "Eligible applicants can apply online. The current official portal states that e-Medical and e-Medical Attendant applications may be submitted at least four days before arrival, with an arrival-date selection window of up to 120 days.",
      "The official e-Visa fee list currently shows South Africa at US$00 (gratis) for the e-Visa service. The same official PDF notes a bank charge on applicable e-Visa fees. Confirm the live amount before payment. Do not invent a paid e-Visa fee for South African nationals.",
      "The current official guidance states that up to two e-Medical Attendant Visas can be issued against one e-Medical Visa.",
      "The current official portal lists e-Medical and e-Medical Attendant visas with one-year validity from the date of arrival and multiple entries. Confirm the live category notes before applying.",
      "An e-Medical Visa application requires the documents specified by the Government of India, including a passport bio page, a recent photograph, sufficient funds, a return or onward ticket, and an Indian hospital letter on letterhead that identifies the patient's name, nationality, passport number and the tentative admission or treatment date.",
      "Some patients may still need India's regular Medical Visa through the High Commission of India in Pretoria. Confirm the live Mission instructions before submitting documents.",
      "Do not use a third-party e-Visa website. The official e-Visa fee list is the eligibility gate.",
    ],
    disclaimer:
      "Visa rules, fees, documents and entry regulations can change. Verify the current official Indian e-Visa portal and the High Commission of India in Pretoria immediately before applying or travelling.",
    documentsHeading: "Documents for an Indian e-Medical Visa or regular Medical Visa from South Africa",
    documents: [
      "Passport with at least six months’ validity and two blank pages",
      "Recent photograph and passport bio page",
      "Indian hospital letter with tentative admission or treatment date for an e-Medical Visa",
      "Return or onward ticket and proof of sufficient funds",
      "Attendant passports and documents where a family member will travel",
    ],
    documentsNote:
      "Patients should determine which visa route applies to their circumstances rather than submitting documents based on an outdated third-party checklist. e-Visa enquiries should be made on the official Government of India portal.",
  },
  yellowFever: {
    heading: "Yellow Fever and Health-Entry Notes for South African Travellers",
    intro:
      "South Africa is not listed among yellow-fever endemic countries on India's IHR points-of-entry guidance dated 3 January 2023. A yellow-fever certificate can still be required if the traveller has recently been in, or transited landside through, an endemic country.",
    points: [
      "Do not assume that every South African traveller needs a yellow-fever card for a direct journey from South Africa. Confirm the live IHR list and the passenger's recent travel history.",
      "India's IHR guidance states that a yellow-fever certificate becomes valid 10 days after vaccination. Travellers arriving from endemic countries without a valid original certificate may be quarantined for up to six days.",
      "Carry the original certificate when one is required. Photocopies or digital copies can be treated as insufficient at the border.",
      "Requirements can change according to connecting airports and current public-health regulations.",
    ],
    close:
      "Confirm the current requirement on the official Indian e-Visa portal, the Bureau of Immigration, India's IHR yellow-fever list and the High Commission of India in Pretoria before travel.",
  },
  travel: {
    heading: "Travelling from South Africa to India for Medical Treatment",
    intro:
      "South African patients may begin their medical journey from Johannesburg, Cape Town, Durban, Pretoria, Gqeberha or other cities. O.R. Tambo International Airport in Johannesburg is a principal international gateway.",
    points: [
      "The hospital city should be selected according to the patient's treatment requirement. The flight should then be planned around the confirmed hospital appointment.",
      "Patients with significant medical conditions should ask their treating doctor whether they are medically fit for commercial air travel.",
      "It is generally better to confirm the medical opinion, specialist, hospital, proposed treatment and visa before booking a fixed return ticket.",
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
    heading: "Documents South African Patients Should Prepare",
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
    heading: "Accommodation, Food and Language for South African Patients",
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
      "South Africa has 11 official languages, including English, Afrikaans, isiZulu and isiXhosa. Indian hospitals generally use English for medical documentation and specialist consultations. Many South African patients can communicate in English; interpretation can still be arranged where needed. Patients should never sign medical consent documentation they do not understand.",
  },
  stay: {
    heading: "How Long Will a South African Patient Need to Stay in India?",
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
      "If you are considering treatment in India, begin with your medical records rather than your flight booking. A records-first sequence allows many questions to be addressed before leaving Johannesburg or another South African city.",
    steps: [
      { title: "Share medical records", body: "Send the relevant reports and a concise medical history." },
      { title: "Get an Indian specialist opinion", body: "The appropriate specialist reviews the available records. A remote opinion does not replace an in-person examination." },
      { title: "Understand treatment options", body: "Discuss the proposed treatment, alternatives and expected timeline." },
      { title: "Select the hospital and doctor", body: "Choose according to the medical requirement." },
      { title: "Receive hospital confirmation", body: "The hospital confirms the consultation or treatment pathway." },
      { title: "Obtain a cost estimate", body: "Request a written estimate showing major inclusions and exclusions." },
      { title: "Apply for the Indian Medical Visa", body: "Use the current official e-Medical Visa process, or the regular Medical Visa through the High Commission of India in Pretoria if that route applies." },
      { title: "Arrange travel", body: "Plan flights, accommodation and local transportation around the confirmed hospital schedule." },
      { title: "Arrive in India", body: "Proceed to the hospital for consultation and evaluation." },
      { title: "Complete investigations and begin treatment", body: "The treating team may repeat or update diagnostic tests before confirming the final plan." },
      { title: "Recovery and discharge", body: "The hospital provides medication and follow-up instructions." },
      { title: "Return to South Africa and continue follow-up", body: "Travel home when medically fit and maintain follow-up with the Indian treating team and local healthcare professionals." },
    ],
  },
  help: {
    heading: "How GAF Healthcare Can Support South African Patients",
    intro:
      "GAF Healthcare can coordinate the medical journey between South Africa and India. The exact services available should be confirmed before travel. Medical decisions remain with the patient and treating medical professionals.",
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
    heading: "Can South African Patients Get a Second Medical Opinion from India?",
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
      "What happens after returning to South Africa?",
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
      q: "Can South African patients get medical treatment in India?",
      a: "Yes. South African citizens can travel to India for medical treatment using the applicable Indian Medical Visa or e-Medical Visa route. South Africa is currently included in India's e-Visa eligible-country list.",
    },
    {
      q: "Can South African citizens apply for an Indian e-Medical Visa?",
      a: "Yes. South Africa is listed among the nationalities eligible for India's e-Visa services, which include e-Medical and e-Medical Attendant Visas.",
    },
    {
      q: "How much is the Indian e-Visa for South African citizens?",
      a: "The official e-Visa fee list currently shows South Africa at US$00 (gratis). A bank charge is stated on applicable e-Visa fees. Confirm the live amount before payment. Do not use an unofficial site that invents a paid fee.",
    },
    {
      q: "How early can South African patients apply for an e-Medical Visa?",
      a: "The current Government of India portal says eligible e-Medical Visa applicants can apply at least four days before arrival and up to 120 days in advance of the proposed arrival date.",
    },
    {
      q: "How long is the Indian e-Medical Visa valid?",
      a: "The current official e-Visa portal describes the e-Medical Visa as valid for one year from arrival with multiple entries. Confirm the live category notes before applying.",
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
      q: "Can a family member accompany a South African patient?",
      a: "Yes. India's e-Medical Attendant Visa category is available for eligible attendants. The current portal states that up to two e-Medical Attendant Visas are granted against one e-Medical Visa.",
    },
    {
      q: "Do South African patients need a yellow-fever certificate?",
      a: "South Africa is not listed among yellow-fever endemic countries on India's IHR points-of-entry guidance. A certificate can still be required if the traveller has recently been in, or transited landside through, an endemic country. Confirm the live list and travel history before departure.",
    },
    {
      q: "How much does treatment in India cost for South African patients?",
      a: "There is no fixed price. Cost depends on diagnosis, treatment, hospital, specialist, medicines, investigations, implants, ICU care and length of stay. GAF presents USD planning estimates, not guaranteed hospital quotations.",
    },
    {
      q: "Which cancers are common in South Africa?",
      a: "GLOBOCAN 2024 estimates 101,598 new cancer cases and 55,356 cancer deaths in South Africa. The leading sites by estimated new cases among both sexes were prostate, breast, cervix, lung and colorectum. These are population-level estimates, not an individual diagnosis.",
    },
    {
      q: "Can I get a treatment estimate before travelling from South Africa?",
      a: "Yes. Medical records can be submitted for preliminary specialist review and an indicative hospital estimate can be requested.",
    },
    {
      q: "Can I send my medical reports from Johannesburg?",
      a: "Yes. Patients from Johannesburg, Cape Town, Durban, Pretoria, Gqeberha and other South African cities can share records before travel.",
    },
    {
      q: "Can patients from Cape Town or Durban travel to India?",
      a: "Yes. Patients from different parts of South Africa can use the same medical-treatment pathway, subject to applicable travel and visa requirements.",
    },
    {
      q: "Can I get a second opinion from an Indian specialist?",
      a: "Yes. Medical records can be shared with an appropriate Indian specialist for preliminary second-opinion review before travel. A remote opinion does not replace an in-person examination when one is clinically necessary.",
    },
    {
      q: "Which Indian cities can South African patients consider?",
      a: "Delhi NCR, Mumbai, Chennai, Hyderabad and Bengaluru are live GAF catalogue cities. Pune can also be considered, but this page does not link to a Pune directory because that city is not yet in the live catalogue.",
    },
    {
      q: "How long should I stay in India?",
      a: "The duration depends on the treatment. Major surgery, cancer treatment and transplantation can require several weeks or longer.",
    },
    {
      q: "Does India have an existing healthcare relationship with South Africa?",
      a: "Yes. Official MEA records include a 1997 Strategic Partnership, health among the areas of bilateral agreements, ITEC capacity building, and South Africa's Health Minister attending the G20 Health Ministers' Meeting in Gandhinagar in August 2023. HCI Pretoria records that the 2022 Foreign Office Consultations reviewed health among other fields.",
    },
    {
      q: "Can South African patients get heart surgery in India?",
      a: "Yes. Indian cardiac centres provide procedures including angioplasty, CABG, valve surgery, electrophysiology and other cardiac treatments, subject to specialist assessment.",
    },
    {
      q: "Can South African patients get IVF treatment in India?",
      a: "Yes. Indian fertility centres provide IVF, ICSI, IUI, embryo-transfer procedures and other fertility services subject to medical and applicable legal requirements. GAF does not yet publish a dedicated IVF page.",
    },
    {
      q: "Is India right for every South African patient?",
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
      q: "Do South African patients need interpretation in India?",
      a: "Not necessarily. English is one of South Africa's official languages and is widely used in Indian hospitals. Interpretation can still be arranged where another language is needed.",
    },
  ],
  finalCta: {
    heading: "Start Your Medical Treatment Journey from South Africa to India",
    body: "If you or a family member in South Africa is considering treatment in India, the most useful first step is to share the patient's medical information. Send the diagnosis, medical reports, scans and previous treatment records to GAF Healthcare.",
    primary: "Get a Medical Opinion",
    secondary: "Talk to a Medical Travel Expert",
    whatsappLabel: "WhatsApp +91 90443 46292",
    steps: "Share your medical records → Get a specialist opinion → Review hospital and treatment options → Plan your journey to India",
  },
  disclaimer: {
    heading: "Medical Disclaimer",
    body: "This page is intended for general education and medical-travel planning. It does not replace advice from a qualified healthcare professional. Cancer statistics are population-level estimates and cannot determine an individual's diagnosis or prognosis. Treatment costs are indicative and can change. Visa requirements, fees, documentation and immigration regulations can change. South African patients should verify the latest requirements on the official Government of India e-Visa portal before travelling.",
  },
  sources: {
    heading: "Sources",
    items: [
      {
        label: "Government of India — Official e-Visa portal",
        href: SOUTH_AFRICA_OFFICIAL_LINKS.eVisa,
        detail: "Current e-Visa categories, including e-Medical and e-Medical Attendant.",
      },
      {
        label: "Government of India — Country/territory-wise e-Visa fee list",
        href: SOUTH_AFRICA_OFFICIAL_LINKS.eVisaFees,
        detail: "Official fee table used as the eligibility gate. South Africa is listed at US$00 (gratis).",
      },
      {
        label: "High Commission of India, Pretoria",
        href: SOUTH_AFRICA_OFFICIAL_LINKS.embassy,
        detail: "Indian High Commission in Pretoria. Publishes e-Visa notes directing applicants to the official Government of India portal.",
      },
      {
        label: "High Commission of India, Pretoria — e-Visa",
        href: SOUTH_AFRICA_OFFICIAL_LINKS.embassyEvisa,
        detail: "Mission e-Visa page listing e-Medical and related categories.",
      },
      {
        label: "High Commission of India, Pretoria — 11th Foreign Office Consultations",
        href: SOUTH_AFRICA_OFFICIAL_LINKS.embassyFoc,
        detail: "August 2022 consultations reviewing bilateral relations including health.",
      },
      {
        label: "Ministry of External Affairs, India — India–South Africa bilateral brief, June 2024",
        href: SOUTH_AFRICA_OFFICIAL_LINKS.meaBrief,
        detail: "1997 Red Fort Declaration Strategic Partnership, health among bilateral agreement areas, ITEC, and the August 2023 G20 Health Ministers' Meeting.",
      },
      {
        label: "IARC / WHO — GLOBOCAN 2024 South Africa fact sheet",
        href: SOUTH_AFRICA_OFFICIAL_LINKS.globocan,
        detail: "Estimated 101,598 new cases, 55,356 deaths and 240,745 five-year prevalent cases, with prostate, breast, cervix, lung and colorectum as leading sites.",
      },
      {
        label: "WHO — South Africa health data overview",
        href: SOUTH_AFRICA_OFFICIAL_LINKS.whoData,
        detail: "Country-level WHO health information and health-system indicators.",
      },
      {
        label: "Ministry of Health and Family Welfare, India — IHR yellow-fever vaccination",
        href: SOUTH_AFRICA_OFFICIAL_LINKS.mohfwYellowFever,
        detail: "India’s yellow-fever endemic-country list. South Africa is not listed as an endemic country of departure.",
      },
      {
        label: "Government of India — Bureau of Immigration",
        href: SOUTH_AFRICA_OFFICIAL_LINKS.boi,
        detail: "Entry and immigration instructions for travellers arriving in India.",
      },
    ],
  },
};
