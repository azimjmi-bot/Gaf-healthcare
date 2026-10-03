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

export const COTE_DIVOIRE_PAGE_PATH = "/cote-divoire/treatment-in-india";
export const COTE_DIVOIRE_PAGE_LOCALES = ["en"] as const;
export const COTE_DIVOIRE_LAST_REVIEWED = "2026-10-03";

export type CoteDivoirePageCopy = typeof coteDivoirePageCopyEn;

export function coteDivoirePageCopy(_locale: AppLocale): CoteDivoirePageCopy {
  return coteDivoirePageCopyEn;
}

const INDIA = "India";

export const COTE_DIVOIRE_OFFICIAL_LINKS = {
  eVisa: "https://indianvisaonline.gov.in/evisa/tvoa.html",
  eVisaHome: "https://indianvisaonline.gov.in/evisa/",
  eVisaFees: "https://indianvisaonline.gov.in/evisa/eTV_revised_fee_final.pdf",
  visaOnline: "https://indianvisaonline.gov.in/visa/",
  embassy: "https://www.eoiabidjan.gov.in/",
  embassyVisa: "https://www.eoiabidjan.gov.in/page/visa-services/",
  embassyEvisa: "https://www.eoiabidjan.gov.in/page/e-visa-services/",
  embassyRelations: "https://www.eoiabidjan.gov.in/page/india-cote-d-ivoire-relations/",
  embassyCamps: "https://www.eoiabidjan.gov.in/news_letter_detail/?id=33",
  embassyGallery: "https://www.eoiabidjan.gov.in/archive/events-photo-gallery/",
  meaBrief: "https://www.mea.gov.in/Portal/ForeignRelation/India-Cote-d-ivoire26apr.pdf",
  meaBrief2025: "https://www.mea.gov.in/Portal/ForeignRelation/Cote-d-Ivoire-bilateral-brief-27-03-2025.pdf",
  indbizMou: "https://indbiz.gov.in/india-and-cote-divoire-to-partner-in-healthcare/",
  globocan: "https://gco.iarc.who.int/media/globocan/factsheets/populations/384-cote-divoire-fact-sheet.pdf",
  iarcToday: "https://gco.iarc.who.int/today/en/fact-sheets-populations",
  whoData: "https://data.who.int/countries/384",
  whoNcd: "https://iris.who.int/handle/10665/381602",
  whoAfrica: "https://afro.who.int/sites/default/files/2023-08/CIV.pdf",
  mohfwYellowFever: "https://ihpoe.mohfw.gov.in/vaccination.php",
  boi: "https://boi.gov.in",
} as const;

export const COTE_DIVOIRE_CURATED_TREATMENT_SLUGS = [
  "breast-cancer-treatment-in-india",
  "prostate-cancer-treatment-in-india",
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

export const COTE_DIVOIRE_CANCER_TREATMENT_SLUGS = TANZANIA_CANCER_TREATMENT_SLUGS;

export const COTE_DIVOIRE_COST_PROCEDURE_NAMES = [
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

export const COTE_DIVOIRE_DOCTOR_SPECIALTY_SLUGS = [
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

export function resolveCoteDivoireCostRows(catalog: Treatment[]) {
  return COTE_DIVOIRE_COST_PROCEDURE_NAMES.map((name) => {
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

export function coteDivoireDoctors(doctors: Doctor[]) {
  return COTE_DIVOIRE_DOCTOR_SPECIALTY_SLUGS.map((specialtySlug) => {
    const pool = doctors.filter((doctor) => doctor.specialtySlug === specialtySlug);
    const featured = pool.find((doctor) => doctor.featured);
    return featured ?? [...pool].sort((a, b) => a.name.localeCompare(b.name))[0];
  }).filter((row): row is Doctor => Boolean(row));
}

export const coteDivoirePageCopyEn = {
  seo: {
    title: "Medical Treatment in India for Ivorian Patients",
    description:
      "Explore medical treatment in India for Ivorian patients. Find specialist doctors, hospitals, treatments, indicative costs, e-Medical Visa guidance and support from GAF Healthcare.",
    keywords: [
      "medical treatment in India for Ivorian patients",
      "medical treatment in India from Côte d’Ivoire",
      "treatment in India for Ivorian patients",
      "medical tourism from Côte d’Ivoire to India",
      "Indian hospitals for Ivorian patients",
      "Indian doctors for Ivorian patients",
      "medical treatment cost in India for Ivorian patients",
      "cancer treatment in India for Ivorian patients",
      "cardiac treatment in India for Ivorian patients",
      "heart surgery in India for Ivorian patients",
      "neurosurgery in India for Ivorian patients",
      "orthopaedic treatment in India for Ivorian patients",
      "IVF in India for Ivorian patients",
      "e-Medical Visa India for Ivorian citizens",
      "Indian Medical Visa from Côte d’Ivoire",
      "treatment in India from Abidjan",
      "medical treatment from Abidjan to India",
      "breast cancer treatment India from Côte d’Ivoire",
      "cervical cancer treatment India from Côte d’Ivoire",
      "prostate cancer treatment India from Côte d’Ivoire",
    ],
  },
  breadcrumb: {
    home: "Home",
    coteDivoire: "Côte d’Ivoire",
    page: "Treatment in India",
  },
  hero: {
    eyebrow: "Medical treatment in India for Ivorian patients",
    h1: "Medical Treatment in India for Ivorian Patients",
    lede:
      "For patients from Côte d’Ivoire, travelling to India for medical treatment involves more than choosing a hospital. GAF Healthcare helps Ivorian patients connect medical records from Abidjan and other cities with appropriate hospitals and specialists in India, then plan the visa, travel and follow-up around that medical requirement.",
    primaryCta: "Get a Medical Opinion",
    secondaryCta: "Explore Treatments",
    whatsappLabel: "WhatsApp +91 90443 46292",
  },
  quickAnswer: {
    heading: "Quick Answer: Medical Treatment in India for Ivorian Patients",
    yes: "Ivorian patients can travel to India for a wide range of specialised treatments, including cancer treatment, cardiac surgery, neurosurgery, orthopaedic surgery, urology, gastrointestinal surgery, IVF, paediatric treatment and selected transplant procedures.",
    visaNote:
      "Côte d’Ivoire is currently included in India's official e-Visa eligible-country list, and medical treatment is an eligible purpose under India's e-Visa system. The current official portal provides e-Medical and e-Medical Attendant categories.",
    journeyIntro: "A typical medical journey involves:",
    steps: [
      "Sharing medical reports with an Indian specialist.",
      "Obtaining a medical opinion or treatment recommendation.",
      "Shortlisting an appropriate hospital and doctor.",
      "Receiving a hospital estimate.",
      "Arranging the Indian e-Medical Visa or appropriate regular visa.",
      "Booking flights and accommodation.",
      "Travelling from Abidjan to India.",
      "Completing consultation, investigations and treatment.",
      "Arranging discharge and follow-up.",
      "Continuing appropriate follow-up after returning to Côte d’Ivoire.",
    ],
    close:
      "The exact treatment plan, hospital, length of stay and cost depend on the patient's diagnosis, medical history, investigations and specialist recommendation.",
  },
  why: {
    heading: "Why Do Ivorian Patients Consider Medical Treatment in India?",
    intro:
      "The decision to seek treatment overseas is personal and depends on the patient's medical needs, available local options, urgency, cost, travel requirements and specialist availability. India can be considered when a patient needs specialised multidisciplinary care or an additional specialist opinion.",
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
    heading: "India–Côte d’Ivoire Healthcare Cooperation",
    paragraphs: [
      "India established its Embassy in Abidjan in 1979, and Côte d’Ivoire opened its resident mission in New Delhi in 2004. Current MEA briefs record that, since 2014, Côte d’Ivoire has designated India as a focal partner in ICT, agriculture, health, mining and infrastructure. India exports medicines among other goods, and the same official brief states that India has become a preferred destination for medical tourism among Ivorians for healthcare services including surgery, diagnostics and wellness therapies.",
      "During the COVID-19 pandemic in March 2021, India gifted 50,000 doses of Covishield to Côte d’Ivoire, with additional Indian-manufactured vaccines supplied under the COVAX initiative. In March 2020 the Union Cabinet approved a health-sector MoU covering exchange and training of healthcare professionals, pharmaceutical regulation and procurement, human-resource capacity building, research and knowledge sharing.",
      "The Embassy of India in Abidjan has also recorded healthcare cooperation on the ground, including a first India–Côte d’Ivoire healthcare seminar in March 2020, a free medical camp and medicine donation in Grand Bassam in October 2020, and a later press note on medical camps and donations of life-saving drugs to public hospitals. Embassy material also records a tele-medical consultation facility with Indian hospitals at Yopougon Hospital in Abidjan.",
      "These programmes do not mean every medicine or treatment is interchangeable between the two healthcare systems. For an individual patient, bilateral relations are only background. Treatment decisions remain dependent on the diagnosis and the hospital's medical assessment.",
    ],
  },
  context: {
    heading: "Healthcare Needs and Planning from Côte d’Ivoire",
    intro:
      "Côte d’Ivoire has a growing need for both communicable-disease services and specialised noncommunicable-disease care. WHO's 2025 Noncommunicable Diseases Progress Monitor, using 2021 Global Health Estimates, reports that NCDs accounted for an estimated 36% of deaths in Côte d’Ivoire, representing approximately 74,800 deaths. International treatment becomes relevant when a patient needs a particular specialist, advanced procedure, complex surgery, specialised diagnostics, multidisciplinary care or another service that is not readily available locally.",
    points: [
      "French is the principal language used in Côte d’Ivoire, while English is commonly used in India's international-patient environment. Confirm interpretation and translation needs before travel.",
      "Most international medical journeys begin at Félix-Houphouët-Boigny International Airport in Abidjan. Patients travelling from Bouaké, Yamoussoukro, Korhogo, San-Pédro, Daloa, Man or Abengourou may first need to reach Abidjan.",
      "An international medical opinion can help clarify whether surgery is required, whether systemic therapy is appropriate, what additional tests are needed, and how long the patient may need to remain in India.",
      "Patients should always provide their current medication list to the treating Indian specialist and should not independently change medicines because an equivalent-looking product is available.",
    ],
    close:
      "Country-level health indicators do not determine an individual's medical needs. The relevant question is: what is the patient's diagnosis, what treatment is appropriate, and can the patient safely travel for that treatment?",
  },
  overview: {
    heading: "What Medical Treatments Can Ivorian Patients Get in India?",
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
    heading: "Popular Medical Treatments for Ivorian Patients in India",
    intro:
      "Each card links only to a live GAF specialty or treatment page. Where GAF does not yet publish a dedicated page, the category is explained without an invented URL.",
    categories: [
      {
        title: "Cancer Treatment",
        body: "Medical, surgical and radiation oncology, including breast, prostate, cervical, colorectal and pancreatic pathways that already have GAF guides. Liver and bladder cancers are coordinated after records review because dedicated pages are not yet published.",
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
        body: "Ivorian couples may explore IVF, ICSI, IUI and related fertility evaluation in India. GAF does not yet publish a dedicated IVF page. Eligibility, laboratory procedures and applicable Indian regulations should be confirmed with the treating fertility centre before travel.",
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
          { label: "Prostate Cancer", href: "/treatments/prostate-cancer-treatment-in-india" },
          { label: "Cervical Cancer", href: "/treatments/cervical-cancer-treatment-in-india" },
          { label: "Colon Cancer", href: "/treatments/colon-cancer-treatment-in-india" },
          { label: "Ovarian Cancer", href: "/treatments/ovarian-cancer-treatment-in-india" },
          { label: "Pancreatic Cancer", href: "/treatments/pancreatic-cancer-treatment-in-india" },
          { label: "Brain Tumour", href: "/treatments/brain-tumor-surgery-in-india" },
          { label: "Leukaemia", href: "/treatments/leukemia-treatment-in-india" },
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
    heading: "Cancer Treatment in India for Ivorian Patients",
    intro:
      "Cancer is an important area of specialist medical care. According to the IARC GLOBOCAN 2024 Côte d’Ivoire fact sheet, the country had an estimated 20,402 new cancer cases, 12,710 cancer deaths and 37,794 five-year prevalent cases. These are GLOBOCAN 2024 estimates, not current 2026 case counts, and they should not be interpreted as an individual's diagnosis or prognosis.",
    body: "The same official fact sheet ranks breast first among estimated new cases in both sexes (4,845; 23.7%), followed by prostate (2,632; 12.9%), cervix uteri (2,540; 12.4%), liver (1,696; 8.3%) and colorectum (1,132; 5.5%). Among Ivorian women, breast cancer was the leading site (4,845; 40.7%), followed by cervix and colorectum. Among Ivorian men, prostate cancer was the leading site (2,632; 31.0%), followed by liver and colorectum. GAF does not yet publish a dedicated liver-cancer page; those cases are coordinated through the relevant oncology or hepatobiliary team after records review.",
    modalities: [
      { label: "Breast Cancer", href: "/treatments/breast-cancer-treatment-in-india" },
      { label: "Prostate Cancer", href: "/treatments/prostate-cancer-treatment-in-india" },
      { label: "Cervical Cancer", href: "/treatments/cervical-cancer-treatment-in-india" },
      { label: "Colon Cancer", href: "/treatments/colon-cancer-treatment-in-india" },
      { label: "Ovarian Cancer", href: "/treatments/ovarian-cancer-treatment-in-india" },
      { label: "Leukaemia", href: "/treatments/leukemia-treatment-in-india" },
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
    heading: "How Much Does Medical Treatment in India Cost for Ivorian Patients?",
    intro:
      "There is no universal treatment price. The final cost depends on the diagnosis, disease stage, treatment plan, hospital, specialist, medicines, implants, investigations, ICU requirement, length of stay and complications. GAF Healthcare presents costs as USD planning estimates from the live catalogue, not hospital quotations.",
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
    heading: "Which Indian Cities Can Ivorian Patients Consider?",
    intro:
      "India has several major healthcare centres. The appropriate city should be selected according to the patient's medical requirement. There is no single Indian city that is appropriate for every Ivorian patient.",
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
    heading: "How Should Ivorian Patients Choose an Indian Hospital?",
    intro:
      "Start with the diagnosis. Ask whether the hospital treats the specific disease, whether the required specialty and surgeon or oncologist are available, whether ICU and advanced diagnostics are in place, whether international-patient services exist, whether the quotation is transparent, and what follow-up arrangements are available. The campuses below are drawn from GAF’s live India catalogue, one from each published city.",
    directoryLabel: "Browse hospitals in India",
  },
  doctors: {
    heading: "How Should Ivorian Patients Choose the Right Doctor?",
    intro:
      "The appropriate specialist depends on the patient's condition. A breast-cancer patient may need a breast or surgical oncologist, a medical oncologist and a radiation oncologist. The doctor should review the patient's actual medical records before recommending treatment. The specialists below are taken from GAF’s live doctor catalogue.",
    directoryLabel: "Browse doctors in India",
  },
  visa: {
    heading: "Indian e-Medical Visa for Ivorian Patients",
    intro:
      "Côte d’Ivoire is currently listed among the countries eligible for India's e-Visa system. Medical treatment is an eligible purpose. The official portal provides e-Medical and e-Medical Attendant categories, and the Embassy of India in Abidjan also publishes an e-Visa page confirming that the facility is available for Ivorian nationals.",
    points: [
      "Eligible applicants can apply online. The current official portal states that e-Medical and e-Medical Attendant applications may be submitted at least four days before arrival, with an arrival-date selection window of up to 120 days.",
      "The official e-Visa fee list currently shows Côte d’Ivoire at US$80 for the e-Visa service. A bank charge is stated on the official portal. Confirm the live amount before payment.",
      "The current official guidance states that up to two e-Medical Attendant Visas can be issued against one e-Medical Visa.",
      "An e-Medical Visa application requires the documents specified by the Government of India, including a passport bio page, a recent photograph, sufficient funds, a return or onward ticket, and an Indian hospital letter that identifies the patient and the tentative admission or treatment date.",
      "Some patients may still need India's regular Medical Visa through the Embassy of India in Abidjan, depending on passport type, individual circumstances or current immigration rules. The Embassy visa-services page lists a local hospital or doctor recommendation, an Indian hospital letter, a six-month bank statement, a residence certificate, a work attestation and an air-ticket booking among Medical Visa documents.",
      "The Embassy visa-services page also lists Medical and Medical Attendant visas at 49,100 CFA for up to six months and 73,600 CFA for more than six months up to one year. Confirm the live schedule before payment. Do not use a third-party e-Visa website.",
    ],
    disclaimer:
      "Visa rules, fees, documents and entry regulations can change. Verify the current official Indian e-Visa portal and the Embassy of India in Abidjan immediately before applying or travelling.",
    documentsHeading: "Documents for an Indian e-Medical Visa or regular Medical Visa from Côte d’Ivoire",
    documents: [
      "Passport with at least six months’ validity and two blank pages",
      "Recent photograph and passport bio page",
      "Indian hospital letter with tentative admission or treatment date for an e-Medical Visa",
      "Return or onward ticket and proof of sufficient funds",
      "For the regular Medical Visa: local doctor or hospital recommendation, Indian hospital letter, six-month bank statement, residence certificate, work attestation and air-ticket booking, as currently published by the Embassy",
      "Yellow-fever vaccination certificate where required for entry",
      "Attendant passports and documents where a family member will travel",
    ],
    documentsNote:
      "Patients should determine which visa route applies to their circumstances rather than submitting documents based on an outdated third-party checklist.",
  },
  yellowFever: {
    heading: "Yellow Fever Requirements for Ivorian Travellers",
    intro:
      "Côte d’Ivoire is listed among yellow-fever endemic countries on India's IHR points-of-entry guidance. Travellers arriving from endemic countries are generally required to carry a valid yellow-fever vaccination certificate issued by an authorised centre.",
    points: [
      "Carry the original certificate during travel. Photocopies or digital copies can be treated as insufficient at the border.",
      "Address vaccination documents early. An avoidable documentation issue can complicate a planned medical journey.",
      "Requirements can change according to travel history and current public-health regulations.",
    ],
    close:
      "Confirm the current requirement on the official Indian e-Visa portal, the Bureau of Immigration and the Embassy of India in Abidjan before travel.",
  },
  travel: {
    heading: "Travelling from Côte d’Ivoire to India for Medical Treatment",
    intro:
      "For most international medical journeys from Côte d’Ivoire, Abidjan is the principal starting point. The main international gateway is Félix-Houphouët-Boigny International Airport. Patients travelling from Bouaké, Yamoussoukro, Korhogo, San-Pédro, Daloa, Man or Abengourou may first need to reach Abidjan.",
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
    heading: "Documents Ivorian Patients Should Prepare",
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
    heading: "Accommodation, Food and French-Language Support",
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
      "French is the official language of Côte d’Ivoire. Many Indian hospitals operate primarily in English. Before travelling, confirm whether French-language assistance or an interpreter can be arranged, whether medical reports require translation, and whether consent information and discharge instructions can be clearly understood.",
  },
  stay: {
    heading: "How Long Will an Ivorian Patient Need to Stay in India?",
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
      "If you are considering treatment in India, begin with your medical records rather than your flight booking. A records-first sequence allows many questions to be addressed before leaving Abidjan.",
    steps: [
      { title: "Share medical records", body: "Send the relevant reports and a concise medical history." },
      { title: "Get an Indian specialist opinion", body: "The appropriate specialist reviews the available records. A remote opinion does not replace an in-person examination." },
      { title: "Understand treatment options", body: "Discuss the proposed treatment, alternatives and expected timeline." },
      { title: "Select the hospital and doctor", body: "Choose according to the medical requirement." },
      { title: "Receive hospital confirmation", body: "The hospital confirms the consultation or treatment pathway." },
      { title: "Obtain a cost estimate", body: "Request a written estimate showing major inclusions and exclusions." },
      { title: "Apply for the Indian Medical Visa", body: "Use the current official regular-visa process through the Embassy of India in Abidjan." },
      { title: "Arrange travel", body: "Plan flights, accommodation and local transportation around the confirmed hospital schedule." },
      { title: "Arrive in India", body: "Proceed to the hospital for consultation and evaluation." },
      { title: "Complete investigations and begin treatment", body: "The treating team may repeat or update diagnostic tests before confirming the final plan." },
      { title: "Recovery and discharge", body: "The hospital provides medication and follow-up instructions." },
      { title: "Return to Côte d’Ivoire and continue follow-up", body: "Travel home when medically fit and maintain follow-up with the Indian treating team and local healthcare professionals." },
    ],
  },
  help: {
    heading: "How GAF Healthcare Can Support Ivorian Patients",
    intro:
      "GAF Healthcare can coordinate the medical journey between Côte d’Ivoire and India. The exact services available should be confirmed before travel. Medical decisions remain with the patient and treating medical professionals.",
    before: [
      "Medical-record collection and specialist matching",
      "Hospital coordination and second-opinion coordination",
      "Treatment-cost requests and appointment coordination",
      "Medical Visa guidance and travel planning",
    ],
    during: [
      "Airport and hospital coordination",
      "French-language communication support where available",
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
    heading: "Can Ivorian Patients Get a Second Medical Opinion from India?",
    intro:
      "Yes. Patients can often share their medical records with an Indian specialist before deciding to travel. A second opinion can be useful before major cancer, cardiac, brain or spine surgery, joint replacement, organ transplantation, long-term chemotherapy, radiation therapy or complex fertility treatment.",
    questions: [
      "What is the diagnosis, and what treatment is recommended?",
      "Why is this treatment recommended, and are there alternatives?",
      "Who will perform the procedure, and how long should the patient remain in India?",
      "What does the quotation include and exclude, including medicines, implants and ICU charges?",
      "What happens if complications occur, and what follow-up is required?",
      "Can French-language assistance be arranged, and what documents are required for the Indian Medical Visa?",
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
      "What happens after returning to Côte d’Ivoire?",
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
      q: "Can Ivorian patients receive medical treatment in India?",
      a: "Yes. India has an established medical-tourism relationship with Côte d’Ivoire, and the official MEA brief states that India has become a preferred destination for Ivorians for healthcare services including surgery, diagnostics and wellness therapies.",
    },
    {
      q: "Can Ivorian citizens apply for an Indian e-Medical Visa?",
      a: "Côte d’Ivoire is currently listed among the countries eligible for India's e-Visa system, and medical treatment is an eligible purpose. The Embassy of India in Abidjan also publishes an e-Visa page confirming that the facility is available for Ivorian nationals.",
    },
    {
      q: "What documents are required for an Indian e-Medical Visa?",
      a: "The current official guidance requires a passport bio page and, for an e-Medical Visa, a letter from the Indian hospital containing the tentative admission or treatment information. Passport validity, photograph, onward or return ticket and other requirements should be checked on the live official portal.",
    },
    {
      q: "How many attendants can accompany an Ivorian medical patient?",
      a: "The current Indian e-Visa guidance states that up to two e-Medical Attendant Visas can be granted against one e-Medical Visa.",
    },
    {
      q: "Do some Ivorian patients still need a regular Medical Visa?",
      a: "Yes. Some circumstances still require the regular Medical Visa through the Embassy of India in Abidjan. The Embassy visa-services page lists a local hospital or doctor recommendation, an Indian hospital letter, a six-month bank statement and related documents.",
    },
    {
      q: "How much does medical treatment in India cost for Ivorian patients?",
      a: "There is no universal price. The cost depends on the diagnosis, treatment, hospital, doctor, medicines, implants, investigations, ICU requirements and length of stay.",
    },
    {
      q: "Which cancer treatments are available in India?",
      a: "Depending on the cancer, treatment may include surgery, chemotherapy, radiation therapy, immunotherapy, targeted therapy, hormone therapy and other multidisciplinary approaches.",
    },
    {
      q: "Which cancers are common in Côte d’Ivoire?",
      a: "GLOBOCAN 2024 identifies breast, prostate, cervical, liver and colorectal cancers as the five leading cancers by estimated new cases among both sexes. These are population-level estimates, not an individual diagnosis.",
    },
    {
      q: "Can I get a medical second opinion from India before travelling?",
      a: "Yes. Medical records can be reviewed by an appropriate Indian specialist before travel, subject to the information available and the specialist's clinical assessment.",
    },
    {
      q: "Do I need to travel to India before receiving a cost estimate?",
      a: "Usually, an initial estimate can be requested using medical records. The final treatment plan and quotation may change after an in-person consultation and investigations.",
    },
    {
      q: "Can French-speaking patients receive support in India?",
      a: "French is the official language of Côte d’Ivoire. French-language assistance should be confirmed with the specific hospital and patient coordinator. GAF Healthcare can also help coordinate communication where available.",
    },
    {
      q: "How long will I need to stay in India?",
      a: "It depends on the treatment. Surgery, cancer therapy, transplantation and rehabilitation can require substantially different lengths of stay.",
    },
    {
      q: "Can GAF Healthcare help with hospitals and doctors?",
      a: "GAF Healthcare can coordinate specialist opinions, hospital options, treatment estimates, appointments and medical-travel logistics for eligible international patients.",
    },
    {
      q: "Where does the journey from Côte d’Ivoire usually begin?",
      a: "Félix-Houphouët-Boigny International Airport in Abidjan is Côte d’Ivoire's principal international gateway. Patients travelling from Bouaké, Yamoussoukro, Korhogo, San-Pédro or other cities may first travel to Abidjan.",
    },
    {
      q: "Do Ivorian patients need a yellow fever vaccination certificate?",
      a: "Côte d’Ivoire is listed among yellow-fever endemic countries on India's IHR points-of-entry guidance. Travellers should carry a valid yellow-fever vaccination certificate and confirm the live official notes before travel.",
    },
    {
      q: "Which Indian cities can Ivorian patients consider?",
      a: "Delhi NCR, Mumbai, Chennai, Hyderabad and Bengaluru are live GAF catalogue cities. Pune can also be considered, but this page does not link to a Pune directory because that city is not yet in the live catalogue.",
    },
    {
      q: "Is India right for every Ivorian patient?",
      a: "No. International treatment is not automatically appropriate when the patient is medically unstable, cannot safely fly, needs immediate local treatment, or when the expected benefit does not justify the burden of travel. The treating doctor should determine medical fitness to travel.",
    },
    {
      q: "Does insurance cover treatment in India?",
      a: "Coverage depends on the patient's policy. Confirm whether planned treatment abroad, India, surgery, cancer treatment, medicines, emergency care and medical evacuation are covered, and obtain written confirmation where possible.",
    },
    {
      q: "What medical records should I send?",
      a: "Send your diagnosis, medical history, pathology, imaging, previous treatment records, medication list and other relevant investigations. Cancer patients should provide pathology and imaging whenever available.",
    },
    {
      q: "What are the current Embassy Medical Visa fees in Abidjan?",
      a: "The Embassy visa-services page lists Medical and Medical Attendant visas at 49,100 CFA for up to six months and 73,600 CFA for more than six months up to one year. Confirm the live schedule before payment.",
    },
    {
      q: "Can I get a cardiac opinion from India without immediately travelling?",
      a: "A preliminary specialist opinion can often be requested using relevant cardiac reports and investigations. The final assessment may require an in-person examination.",
    },
    {
      q: "Should I book my flight before receiving the hospital's opinion?",
      a: "For major treatment, it is generally better to obtain the medical opinion, hospital schedule and visa first. This allows the travel plan to be built around the medical schedule.",
    },
  ],
  finalCta: {
    heading: "Start Your Medical Treatment Journey from Côte d’Ivoire to India",
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
        href: COTE_DIVOIRE_OFFICIAL_LINKS.eVisa,
        detail: "Current e-Visa categories, including e-Medical and e-Medical Attendant.",
      },
      {
        label: "Government of India — Country/territory-wise e-Visa fee list",
        href: COTE_DIVOIRE_OFFICIAL_LINKS.eVisaFees,
        detail: "Official fee table used as the eligibility gate. Côte d’Ivoire is listed at US$80.",
      },
      {
        label: "Embassy of India, Abidjan — e-Visa services",
        href: COTE_DIVOIRE_OFFICIAL_LINKS.embassyEvisa,
        detail: "Embassy confirmation that the e-Visa facility is available for nationals of Côte d’Ivoire.",
      },
      {
        label: "Embassy of India, Abidjan — Visa services",
        href: COTE_DIVOIRE_OFFICIAL_LINKS.embassyVisa,
        detail: "Regular Medical Visa documents and published Medical / Medical Attendant fee amounts.",
      },
      {
        label: "Embassy of India, Abidjan — India–Côte d’Ivoire relations",
        href: COTE_DIVOIRE_OFFICIAL_LINKS.embassyRelations,
        detail: "Bilateral relations, including the official medical-tourism statement for Ivorian patients.",
      },
      {
        label: "Embassy of India, Abidjan — Medical camps and donations, 11 August 2021",
        href: COTE_DIVOIRE_OFFICIAL_LINKS.embassyCamps,
        detail: "Press note on medical camps and donations of life-saving drugs to public hospitals.",
      },
      {
        label: "Ministry of External Affairs, India — India–Côte d’Ivoire relations, April 2026",
        href: COTE_DIVOIRE_OFFICIAL_LINKS.meaBrief,
        detail: "Embassy established 1979, health as a focal-partner sector since 2014, Covishield gift of March 2021, and medical-tourism wording.",
      },
      {
        label: "MEA Economic Diplomacy Division — Health-sector MoU, March 2020",
        href: COTE_DIVOIRE_OFFICIAL_LINKS.indbizMou,
        detail: "Cabinet-approved MoU covering healthcare professionals, pharmaceutical regulation and procurement, capacity building and research.",
      },
      {
        label: "IARC / WHO — GLOBOCAN 2024 Côte d’Ivoire fact sheet",
        href: COTE_DIVOIRE_OFFICIAL_LINKS.globocan,
        detail: "Estimated 20,402 new cases, 12,710 deaths and 37,794 five-year prevalent cases, with breast, prostate, cervix, liver and colorectum as leading sites.",
      },
      {
        label: "WHO — Noncommunicable diseases progress monitor 2025",
        href: COTE_DIVOIRE_OFFICIAL_LINKS.whoNcd,
        detail: "Country-level NCD policy tracking, including 2021 Global Health Estimates used in the Côte d’Ivoire profile.",
      },
      {
        label: "WHO — Côte d’Ivoire health data overview",
        href: COTE_DIVOIRE_OFFICIAL_LINKS.whoData,
        detail: "Country-level WHO health information, including NCD indicators.",
      },
      {
        label: "Ministry of Health and Family Welfare, India — IHR yellow-fever vaccination",
        href: COTE_DIVOIRE_OFFICIAL_LINKS.mohfwYellowFever,
        detail: "India’s yellow-fever endemic-country list and certificate requirements.",
      },
      {
        label: "Government of India — Bureau of Immigration",
        href: COTE_DIVOIRE_OFFICIAL_LINKS.boi,
        detail: "Entry and immigration instructions for travellers arriving in India.",
      },
    ],
  },
};
