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

export const ANGOLA_PAGE_PATH = "/angola/treatment-in-india";
export const ANGOLA_PAGE_LOCALES = ["en"] as const;
export const ANGOLA_LAST_REVIEWED = "2026-10-03";

export type AngolaPageCopy = typeof angolaPageCopyEn;

export function angolaPageCopy(_locale: AppLocale): AngolaPageCopy {
  return angolaPageCopyEn;
}

const INDIA = "India";

export const ANGOLA_OFFICIAL_LINKS = {
  eVisa: "https://indianvisaonline.gov.in/evisa/tvoa.html",
  eVisaHome: "https://indianvisaonline.gov.in/evisa/",
  eVisaFees: "https://indianvisaonline.gov.in/evisa/eTV_revised_fee_final.pdf",
  visaOnline: "https://indianvisaonline.gov.in/visa/",
  embassy: "https://indembangola.gov.in/",
  embassyWww: "https://www.indembangola.gov.in/",
  embassyVisa: "https://indembangola.gov.in/pages?id=vbmOe&subid=YerEd",
  embassyEvisaPdf: "https://www.indembangola.gov.in/pdf/menu/e-Visa.pdf",
  embassyYf: "https://indembangola.gov.in/pdf/whats/Notice_for_attention_whatsnew.pdf",
  meaBrief: "https://www.mea.gov.in/Portal/ForeignRelation/India-AngolaRelations.pdf",
  meaBrief26: "https://www.mea.gov.in/Portal/ForeignRelation/India-Angola26.pdf",
  pharma: "https://www.mea.gov.in/Portal/CountryNews/16509_Pharma_Sector_Angola25may_22NNK.pdf",
  globocan: "https://gco.iarc.who.int/media/globocan/factsheets/populations/24-angola-fact-sheet.pdf",
  iarcToday: "https://gco.iarc.who.int/today/en/fact-sheets-populations",
  whoData: "https://data.who.int/countries/024",
  mohfwYellowFever: "https://ihpoe.mohfw.gov.in/vaccination.php",
  boi: "https://boi.gov.in",
} as const;

export const ANGOLA_CURATED_TREATMENT_SLUGS = [
  "breast-cancer-treatment-in-india",
  "cervical-cancer-treatment-in-india",
  "prostate-cancer-treatment-in-india",
  "colon-cancer-treatment-in-india",
  "leukemia-treatment-in-india",
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

export const ANGOLA_CANCER_TREATMENT_SLUGS = TANZANIA_CANCER_TREATMENT_SLUGS;

export const ANGOLA_COST_PROCEDURE_NAMES = [
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

export const ANGOLA_DOCTOR_SPECIALTY_SLUGS = [
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

export function resolveAngolaCostRows(catalog: Treatment[]) {
  return ANGOLA_COST_PROCEDURE_NAMES.map((name) => {
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

export function angolaDoctors(doctors: Doctor[]) {
  return ANGOLA_DOCTOR_SPECIALTY_SLUGS.map((specialtySlug) => {
    const pool = doctors.filter((doctor) => doctor.specialtySlug === specialtySlug);
    const featured = pool.find((doctor) => doctor.featured);
    return featured ?? [...pool].sort((a, b) => a.name.localeCompare(b.name))[0];
  }).filter((row): row is Doctor => Boolean(row));
}

export const angolaPageCopyEn = {
  seo: {
    title: "Medical Treatment in India for Angolan Patients",
    description:
      "Explore medical treatment in India for Angolan patients. Find specialist doctors, hospitals, treatments, indicative costs, e-Medical Visa guidance and support from GAF Healthcare.",
    keywords: [
      "medical treatment in India for Angolan patients",
      "medical treatment in India from Angola",
      "treatment in India for Angolan patients",
      "medical tourism from Angola to India",
      "Indian hospitals for Angolan patients",
      "Indian doctors for Angolan patients",
      "medical treatment cost in India for Angolan patients",
      "cancer treatment in India for Angolan patients",
      "cardiac treatment in India for Angolan patients",
      "heart surgery in India for Angolan patients",
      "neurosurgery in India for Angolan patients",
      "orthopaedic treatment in India for Angolan patients",
      "IVF in India for Angolan patients",
      "e-Medical Visa India for Angolan citizens",
      "Indian Medical Visa for Angolan citizens",
      "medical visa India from Angola",
      "treatment in India from Luanda",
      "medical treatment from Luanda to India",
      "medical tourism India Angola",
      "breast cancer treatment India from Angola",
      "cervical cancer treatment India from Angola",
      "prostate cancer treatment India from Angola",
    ],
  },
  breadcrumb: {
    home: "Home",
    angola: "Angola",
    page: "Treatment in India",
  },
  hero: {
    eyebrow: "Medical treatment in India for Angolan patients",
    h1: "Medical Treatment in India for Angolan Patients",
    lede:
      "If you are looking for medical treatment in India from Angola, GAF Healthcare helps patients and families navigate the journey from medical report review and specialist consultation to hospital selection, treatment estimates, appointments, medical visa guidance and travel coordination.",
    primaryCta: "Get a Medical Opinion",
    secondaryCta: "Explore Treatments",
    whatsappLabel: "WhatsApp +91 90443 46292",
  },
  quickAnswer: {
    heading: "Quick Answer: Medical Treatment in India for Angolan Patients",
    items: [
      {
        question: "Can Angolan patients travel to India for medical treatment?",
        answer:
          "Angolan patients can travel to India for a wide range of specialised medical treatments, including cancer treatment, cardiac procedures, neurosurgery, orthopaedic surgery, urology, gastrointestinal treatment, IVF, paediatric care and selected transplantation procedures.",
      },
      {
        question: "Can Angolan citizens get an Indian e-Medical Visa?",
        answer:
          "Angola is currently included on India's official list of countries eligible for the e-Visa system, and medical treatment is an eligible purpose. The current Indian e-Visa portal provides e-Medical and e-Medical Attendant categories.",
      },
      {
        question: "What does a typical medical journey look like?",
        answer:
          "A typical medical journey looks like: Medical Reports → Specialist Opinion → Hospital Selection → Treatment Plan → Cost Estimate → e-Medical Visa → Travel → Hospital Evaluation → Treatment → Recovery → Follow-Up",
      },
      {
        question: "How much does treatment in India cost?",
        answer:
          "There is no single price. Treatment costs depend on the diagnosis, procedure, hospital, specialist, medicines, implants, investigations, length of stay and clinical complexity.",
      },
      {
        question: "Should I book a flight first?",
        answer:
          "For most patients, the process should begin with the medical records rather than immediately booking a flight.",
      },
      {
        question: "How can GAF Healthcare help?",
        answer:
          "GAF Healthcare can coordinate medical records, specialist and hospital options, treatment estimates, appointments and aspects of the medical travel journey.",
      },
    ],
  },
  why: {
    heading: "Why Angolan Patients Consider Medical Treatment in India",
    intro:
      "Patients may consider treatment abroad when they need specialised expertise, a second opinion, complex surgery or access to multidisciplinary care. India and Angola already have a formal healthcare relationship: the two governments signed a Memorandum of Understanding on cooperation in Health and Medicine in 2022.",
    points: [
      "Patients may consider travelling to India when they need a particular specialist, complex surgery, advanced cancer treatment, a second opinion or multidisciplinary care",
      "India has developed a large tertiary and super-specialty healthcare ecosystem covering oncology, cardiac sciences, neurosciences, orthopedics, transplantation, urology, gastroenterology, fertility and complex surgery",
      "Angola is currently on India's official e-Visa list, and the e-Visa system includes e-Medical and e-Medical Attendant categories for eligible travellers",
      "Medical records can be reviewed before travel so the family understands the proposed pathway and indicative cost",
      "Portuguese is Angola's official language. English is widely used in Indian hospitals, so Portuguese-language support should be planned before travel",
      "The right decision depends on the individual medical condition. Hospital selection should start from the diagnosis and medical records rather than from a hospital brand alone",
      "Travelling to India is not automatically the right choice for every patient, particularly when a patient is medically unstable or requires urgent treatment that cannot safely be delayed",
    ],
    close:
      "India should not be considered automatically suitable for every patient. The right destination depends on the diagnosis, treatment requirement, urgency, hospital capability and the patient's individual circumstances.",
  },
  relationship: {
    heading: "India–Angola Healthcare Relationship",
    paragraphs: [
      "India and Angola established diplomatic relations in 1985. India supported Angola's independence in 1975, and the first Indian Ambassador presented credentials in November 1986. Current MEA country briefs identify health and pharmaceuticals among the areas of bilateral cooperation and record India among Angola's top-three trading partners, accounting for about 10% of Angola's trade, mainly oil. Official trade figures show India–Angola trade of US$4.19 billion in 2023–24 and US$5.03 billion in 2024–25.",
      "The two governments have a Health and Medicine cooperation framework. A virtual Joint Commission Meeting on 7 September 2020 discussed health and pharmaceuticals, and the Health and Medicine MoU was formally exchanged on 8 April 2022. The framework covers exchanges and training of doctors and other healthcare professionals, development of healthcare facilities, pharmaceutical and medical-device regulation, medicines and equipment, technology development and capacity building.",
      "Indian pharmaceutical companies already supply medicines to Angola. An official MEA pharmaceutical-sector note describes India as one of the major suppliers of pharmaceutical imports into Angola and identifies opportunities in pharmaceuticals, medical equipment, diagnostics, training, hospital services and telemedicine. That does not mean every medicine or treatment is interchangeable between the two healthcare systems. Patients should follow the treatment plan prescribed by their doctors. For an individual patient, bilateral relations are only background. Treatment decisions remain dependent on the diagnosis and the hospital's medical assessment.",
    ],
  },
  context: {
    heading: "Medical Treatment in India for Patients from Angola",
    intro:
      "Angola has its own hospitals and specialists. International treatment becomes relevant when a patient needs a particular specialist, advanced procedure, complex surgery, specialised diagnostics, multidisciplinary care or another service that is not readily available locally.",
    points: [
      "The India–Angola healthcare relationship can make Indian hospitals a familiar option, but the hospital still has to match the diagnosis.",
      "Portuguese is Angola's official language. English is widely used in Indian hospitals, so interpretation and translated consent documents should be confirmed before major procedures.",
      "Most international medical journeys from Angola begin at Dr. António Agostinho Neto International Airport in Luanda. Patients travelling from Benguela, Lobito, Huambo, Lubango, Cabinda, Malanje, Namibe, Soyo or Uíge may first need to reach Luanda.",
    ],
    close:
      "The important questions remain: is the relevant specialist available, does the hospital treat this condition, what treatment is being proposed, what is included in the estimate, how long will the patient need to stay, and how will follow-up be managed after returning to Angola?",
  },
  overview: {
    heading: "What Medical Treatments Can Angolan Patients Get in India?",
    intro:
      "Indian hospitals provide specialist care across a wide range of medical disciplines. The appropriate treatment depends on the patient's diagnosis, stage of disease, previous treatment and overall clinical condition, and should always be determined by a qualified medical professional after reviewing the patient's clinical information.",
    areas: [
      "Cancer treatment",
      "Cardiology and cardiac surgery",
      "Neurosurgery and neurology",
      "Orthopedic surgery and joint replacement",
      "Gastroenterology, liver and pancreatic surgery",
      "Urology and kidney treatment",
      "Organ transplantation",
      "Pediatric treatment",
      "Fertility treatment",
      "Bariatric surgery",
      "Robotic and minimally invasive surgery",
      "Complex diagnostic evaluation and second opinions",
    ],
  },
  treatments: {
    heading: "Popular Treatment Categories for Angolan Patients",
    intro:
      "Each card links only to a live GAF specialty or treatment page. Where GAF does not yet publish a dedicated page, the category is explained without an invented URL.",
    categories: [
      {
        title: "Cancer Treatment",
        body: "Medical, surgical and radiation oncology, including breast, cervical, prostate, colorectal and leukaemia pathways that already have GAF guides. Liver, oesophageal and Kaposi sarcoma cases are coordinated after records review because dedicated pages are not yet published.",
        href: "/treatments/breast-cancer-treatment-in-india",
        hrefLabel: "Breast cancer treatment in India",
        specialty: "Medical Oncology",
      },
      {
        title: "Cardiology & Cardiac Surgery",
        body: "Angioplasty, bypass surgery, valve replacement, device implants and selected paediatric cardiac operations. A patient who needs an angioplasty may require assessment by an interventional cardiologist, while a patient requiring bypass surgery would generally need evaluation by a cardiac surgeon.",
        href: "/treatments/cabg-surgery-in-india",
        hrefLabel: "CABG surgery in India",
        specialty: "Cardiology",
      },
      {
        title: "Neurosurgery & Neurology",
        body: "Brain-tumour surgery, craniotomy, endoscopic and pituitary procedures, hydrocephalus, epilepsy surgery, cerebrovascular surgery and complex spine surgery. MRI and CT imaging can be particularly important when requesting a preliminary neurosurgical opinion.",
        href: "/treatments/brain-tumor-surgery-in-india",
        hrefLabel: "Brain tumour surgery in India",
        specialty: "Neurosurgery",
      },
      {
        title: "Orthopaedics",
        body: "Knee and hip replacement, revision joint replacement, ACL reconstruction, arthroscopy, tendon repair and complex reconstruction. The choice of implant, surgical technique and rehabilitation program depends on the patient's condition and the surgeon's assessment.",
        href: "/treatments/knee-replacement-surgery-in-india",
        hrefLabel: "Knee replacement in India",
        specialty: "Orthopedics",
      },
      {
        title: "Urology",
        body: "Prostate and kidney cancer surgery, stone and prostate procedures, reconstructive urology, robotic urological surgery and kidney-transplant evaluation.",
        href: "/treatments/radical-prostatectomy-in-india",
        hrefLabel: "Radical prostatectomy in India",
        specialty: "Urology",
      },
      {
        title: "Gastroenterology",
        body: "Complex abdominal and HPB surgery, including endoscopy, ERCP, liver surgery, pancreatic surgery, Whipple and HIPEC where clinically appropriate.",
        href: "/treatments/whipple-surgery-in-india",
        hrefLabel: "Whipple surgery in India",
        specialty: "Gastroenterology",
      },
      {
        title: "Paediatric Treatment",
        body: "Paediatric cardiology and cardiac surgery, oncology, neurosurgery, orthopedics, urology, neonatal care and related children's services arranged with a paediatric team.",
        href: "/treatments/ventricular-septal-defect-surgery-in-india",
        hrefLabel: "VSD surgery in India",
        specialty: "Pediatric Cardiac Surgery",
      },
      {
        title: "Organ Transplantation",
        body: "Kidney, liver, heart and bone-marrow programmes are highly regulated. Eligibility must be confirmed by the transplant centre before travel. A treatment quotation alone does not establish transplant eligibility.",
        href: "/treatments/bone-marrow-transplant-in-india",
        hrefLabel: "Bone marrow transplant in India",
        specialty: "Hematology",
      },
      {
        title: "IVF & Fertility",
        body: "Angolan couples may explore IVF, ICSI, IUI, frozen embryo transfer and related fertility evaluation in India. GAF does not yet publish a dedicated IVF page. Eligibility, laboratory procedures and applicable Indian regulations should be confirmed with the treating fertility centre before travel.",
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
          { label: "Ovarian Cancer", href: "/treatments/ovarian-cancer-treatment-in-india" },
          { label: "Pancreatic Cancer", href: "/treatments/pancreatic-cancer-treatment-in-india" },
          { label: "Brain Tumour", href: "/treatments/brain-tumor-surgery-in-india" },
          { label: "Lymphoma", href: "/treatments/lymphoma-treatment-in-india" },
          { label: "Leukaemia", href: "/treatments/leukemia-treatment-in-india" },
          { label: "Oesophageal Cancer", href: "" },
          { label: "Kaposi sarcoma", href: "" },
          { label: "Liver Cancer", href: "" },
          { label: "Lung Cancer", href: "" },
          { label: "Chemotherapy", href: "/treatments/chemotherapy-in-india" },
          { label: "Immunotherapy", href: "/treatments/immunotherapy-in-india" },
          { label: "Targeted Therapy", href: "/treatments/targeted-therapy-in-india" },
          { label: "Hormone Therapy", href: "/treatments/hormone-therapy-in-india" },
          { label: "Precision Oncology", href: "/treatments/precision-oncology-in-india" },
          { label: "Radiation Oncology", href: "/treatments/external-beam-radiotherapy-in-india" },
          { label: "Surgical Oncology", href: "/treatments/breast-cancer-treatment-in-india" },
          { label: "Neoadjuvant Chemotherapy", href: "/treatments/neoadjuvant-chemotherapy-in-india" },
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
          { label: "Pediatric Cardiac Surgery", href: "/treatments/ventricular-septal-defect-surgery-in-india" },
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
          { label: "Rotator Cuff Surgery", href: "" },
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
    heading: "Cancer Treatment in India for Angolan Patients",
    intro:
      "Cancer treatment is one of the areas where patients may need several specialists working together. According to the IARC GLOBOCAN 2024 Angola fact sheet, the country had an estimated 27,511 new cancer cases, 16,190 cancer deaths and 59,105 five-year prevalent cases. These are GLOBOCAN 2024 estimates, not current 2026 case counts, and they should not be interpreted as an individual's diagnosis or prognosis.",
    body: "The same official fact sheet ranks breast first among estimated new cases in both sexes (4,614; 16.8%), followed by cervix uteri (3,361; 12.2%), prostate (2,217; 8.1%), colorectum (1,172; 4.3%) and leukaemia (1,159; 4.2%). Among Angolan women, breast cancer was the leading site (4,614; 30.8%), followed by cervix (3,361; 22.5%). Among Angolan men, prostate cancer was the leading site (2,217; 17.7%), followed by colorectum, larynx, Kaposi sarcoma and leukaemia. Liver (834), brain and CNS (707) and oesophagus (695) also appear among estimated new cases. GAF does not yet publish dedicated liver-cancer, oesophageal-cancer or Kaposi sarcoma pages; those cases are coordinated through the relevant oncology or gastrointestinal team after records review.",
    modalities: [
      { label: "Breast Cancer", href: "/treatments/breast-cancer-treatment-in-india" },
      { label: "Cervical Cancer", href: "/treatments/cervical-cancer-treatment-in-india" },
      { label: "Prostate Cancer", href: "/treatments/prostate-cancer-treatment-in-india" },
      { label: "Colon Cancer", href: "/treatments/colon-cancer-treatment-in-india" },
      { label: "Ovarian Cancer", href: "/treatments/ovarian-cancer-treatment-in-india" },
      { label: "Pancreatic Cancer", href: "/treatments/pancreatic-cancer-treatment-in-india" },
      { label: "Lymphoma", href: "/treatments/lymphoma-treatment-in-india" },
      { label: "Leukaemia", href: "/treatments/leukemia-treatment-in-india" },
      { label: "Chemotherapy", href: "/treatments/chemotherapy-in-india" },
      { label: "Immunotherapy", href: "/treatments/immunotherapy-in-india" },
      { label: "Targeted Therapy", href: "/treatments/targeted-therapy-in-india" },
      { label: "Hormone Therapy", href: "/treatments/hormone-therapy-in-india" },
      { label: "Precision Oncology", href: "/treatments/precision-oncology-in-india" },
      { label: "Brachytherapy", href: "/treatments/brachytherapy-in-india" },
      { label: "External Beam Radiotherapy", href: "/treatments/external-beam-radiotherapy-in-india" },
      { label: "Neoadjuvant Chemotherapy", href: "/treatments/neoadjuvant-chemotherapy-in-india" },
      { label: "Surgical Oncologists", href: doctorsPath({ destination: INDIA, specialty: "Surgical Oncology" }) },
      { label: "Medical Oncologists", href: doctorsPath({ destination: INDIA, specialty: "Medical Oncology" }) },
      { label: "Radiation Oncologists", href: doctorsPath({ destination: INDIA, specialty: "Radiation Oncology" }) },
    ],
  },
  cost: {
    heading: "How Much Does Medical Treatment in India Cost for Angolan Patients?",
    intro:
      "There is no single answer because treatment costs depend on the individual medical case. Online cost figures should be considered indicative planning ranges, not final hospital quotations. GAF Healthcare presents costs as USD planning estimates from the live catalogue, not guaranteed prices.",
    factors: [
      "Diagnosis, procedure and treatment protocol",
      "Hospital, specialist and room category",
      "Diagnostic investigations, medicines, implants or medical devices",
      "ICU requirements, hospitalisation, rehabilitation and complications",
      "Follow-up and additional procedures",
    ],
    tableIntro:
      "The ranges below are GAF Healthcare planning figures from the live cost catalogue. They are not hospital quotations. Ask the hospital which items are included.",
    disclaimer:
      "The final treatment estimate is determined by the treating hospital after reviewing the patient's medical information. Additional investigations, medicines, implants, changes in treatment, complications or a longer hospital stay may change the final cost.",
    ctaLabel: "Get a treatment-cost review on WhatsApp",
  },
  extraBudget: {
    heading: "Medical Travel Costs Beyond Treatment",
    intro:
      "The hospital treatment estimate is only one component of a medical-travel budget. A lower headline quotation does not necessarily mean a lower total expenditure. Two hospitals may quote different amounts because their estimates include different services.",
    items: [
      "Medical consultations and diagnostic tests",
      "Surgery or treatment, hospitalisation and medicines",
      "Medical visa, flights and local transportation",
      "Accommodation, food and attendant expenses",
      "Additional accommodation and follow-up consultations",
    ],
    close:
      "Ask the hospital or coordinator which items are included in the treatment estimate. Comparing the scope of the quotation is more meaningful than comparing only the headline number.",
  },
  cities: {
    heading: "Major Indian Cities for Angolan Patients",
    intro:
      "India's specialist healthcare infrastructure is distributed across several major cities. The right destination depends on the diagnosis, specialist, hospital and treatment requirement. There is no single Indian city that is appropriate for every Angolan patient.",
    items: [
      {
        name: "Delhi NCR",
        body: "One of India's major medical hubs, covering oncology, cardiology, cardiac surgery, neurosurgery, orthopedics, gastroenterology, urology, transplantation and pediatric specialties. Also a major international gateway for northern India.",
        city: "Delhi NCR",
        catalog: true,
      },
      {
        name: "Mumbai",
        body: "Major hospitals and specialist centres covering oncology, cardiology, cardiac surgery, neurosurgery, orthopedics, gastroenterology, urology and transplantation. Mumbai is also an important international gateway.",
        city: "Mumbai",
        catalog: true,
      },
      {
        name: "Chennai",
        body: "An extensive healthcare ecosystem with specialist services including cardiology, cardiac surgery, oncology, neurosurgery, orthopedics, gastroenterology, urology and transplantation.",
        city: "Chennai",
        catalog: true,
      },
      {
        name: "Hyderabad",
        body: "Specialist treatment across oncology, cardiology, neurosurgery, orthopedics, gastroenterology, urology, transplantation and robotic surgery.",
        city: "Hyderabad",
        catalog: true,
      },
      {
        name: "Bengaluru",
        body: "Major hospitals offering cardiology, oncology, neurosurgery, orthopedics, urology, gastroenterology and fertility treatment.",
        city: "Bengaluru",
        catalog: true,
      },
      {
        name: "Pune",
        body: "Pune has specialist hospitals providing treatment in oncology, cardiology, orthopedics, neurosurgery, gastroenterology and urology. GAF’s live city catalogue does not yet include Pune, so this page does not link to a Pune directory.",
        city: "Pune",
        catalog: false,
      },
    ],
  },
  hospitals: {
    heading: "Hospitals in India for Angolan Patients",
    intro:
      "Hospital selection should begin with the patient's medical requirement. Important factors include the relevant specialty and subspecialty, experience with the required procedure, diagnostic and surgical facilities, ICU support, multidisciplinary services, an international-patient department, expected treatment duration, estimated cost and follow-up arrangements. The campuses below are drawn from GAF’s live India catalogue, one from each published city.",
    directoryLabel: "Browse hospitals in India",
  },
  doctors: {
    heading: "Specialist Doctors in India for Angolan Patients",
    intro:
      "The appropriate specialist should match the patient's diagnosis and treatment requirement. A cancer patient may need a surgical oncologist, a medical oncologist and a radiation oncologist. A patient with coronary artery disease may need assessment by a cardiologist, an interventional cardiologist or a cardiac surgeon. The specialists below are taken from GAF’s live doctor catalogue.",
    directoryLabel: "Browse doctors in India",
  },
  visa: {
    heading: "Medical Visa for Angolan Patients Travelling to India",
    intro:
      "Angolan citizens are currently eligible for India's e-Visa system. The official Government of India e-Visa portal includes Angola among the eligible nationalities and permits e-Medical Visas for eligible applicants travelling to India for medical treatment. The official country/territory-wise fee list currently shows Angola among e-Visa nationalities, with the e-Medical and e-Medical Attendant categories listed at US$80. A bank charge is stated on the official portal.",
    points: [
      "The system also provides an e-Medical Attendant Visa for eligible accompanying persons. The current official guidance states that up to two e-Medical Attendant Visas may be granted against one e-Medical Visa.",
      "Eligible applicants can apply online. Applications for e-Medical and e-Medical Attendant visas can be submitted at least four days before arrival, with an application window extending up to 120 days before the intended arrival date.",
      "The passport should have at least six months' validity at the time of application and at least two blank pages. A recent passport photograph and passport bio page are required.",
      "For an e-Medical Visa, the Government of India's published requirements include a hospital letter on Indian hospital letterhead with a tentative admission or treatment date, together with the other information required by the application process.",
      "A regular Medical Visa remains available through the Embassy of India in Luanda, currently at Four Villas Condominio, Villa No. 4, Via S7A, Av. Principal de Talatona (Avenida Samora Machel), Talatona, Luanda. The Embassy states that Angolan nationals are eligible for e-Visa and that the Embassy does not play any role in the e-Visa process. Applicants are directed to the official portal only.",
      "The Embassy's published regular-visa notes currently require a completed signed form, a passport valid for more than six months, two colour photographs, a yellow-fever certificate with a copy, and a travel itinerary. For a Medical Visa, the Embassy asks for a signed original letter from the local hospital or doctor, copies of the treatment record, and an original letter from the Indian hospital or doctor indicating the proposed treatment. Attendants need proof of relationship with the patient and a letter from the applicant. Visa rules and fees can change.",
    ],
    disclaimer:
      "Visa rules can change. Angolan patients should always verify the latest requirements, eligibility, fees, permitted stay and documentation through the official Government of India e-Visa portal and the Embassy of India in Luanda before applying or travelling.",
    documentsHeading: "e-Medical Visa and regular Medical Visa documents",
    documents: [
      "Passport with at least six months’ validity and two blank pages",
      "Recent photograph and passport bio page",
      "Indian hospital letter with tentative admission or treatment date for an e-Medical Visa",
      "For the regular Medical Visa: signed form, two colour photographs, yellow-fever certificate with a copy, travel itinerary, local hospital or doctor letter, treatment records, Indian hospital letter, and attendant relationship documents as currently published by the Embassy",
      "Yellow-fever vaccination certificate for travellers from Angola",
      "Attendant passports and documents where a family member will travel",
    ],
    documentsNote:
      "Patients should determine which visa route applies to their circumstances rather than submitting documents based on an outdated third-party checklist.",
  },
  yellowFever: {
    heading: "Yellow Fever Requirements for Angolan Travellers",
    intro:
      "The Embassy of India in Luanda has published a yellow-fever notice for all travellers to India. Angola is listed among yellow-fever endemic countries on India's IHR points-of-entry guidance.",
    points: [
      "The Embassy notice states that travellers aged nine months and above arriving from Angola must carry an internationally valid yellow-fever vaccination certificate issued by an authorised centre.",
      "The certificate becomes valid 10 days after vaccination. Travellers without a valid certificate, or with an immature certificate, may be quarantined for up to six days at designated facilities in India.",
      "The Embassy notice also states that an internationally valid yellow-fever card is a mandatory requirement for issuance of a Medical Visa. Carry the original certificate; photocopies or digital copies can be treated as insufficient.",
      "Address vaccination documents early. An avoidable documentation issue at the border can complicate a planned medical journey.",
    ],
    close:
      "Confirm the current requirement on the official Indian e-Visa portal, the Bureau of Immigration and the Embassy of India in Luanda before travel.",
  },
  travel: {
    heading: "Travelling from Angola to India for Medical Treatment",
    intro:
      "Luanda is the principal international starting point for most Angolan medical journeys. The main international gateway is Dr. António Agostinho Neto International Airport. Patients travelling from Benguela, Lobito, Huambo, Lubango, Cabinda, Malanje, Namibe, Soyo or Uíge may first need to reach Luanda. Travel arrangements should be planned around the hospital appointment date, expected admission date, medical-visa approval, expected treatment duration, recovery period and return-flight flexibility. Patients with serious medical conditions should ask their treating doctor whether they are fit for commercial air travel.",
    points: [
      "The appropriate Indian arrival airport depends on the treatment city and should normally correspond to the selected hospital.",
      "For major surgery or cancer treatment, it is generally better to confirm the medical opinion, specialist, hospital, proposed treatment, expected admission date and approximate treatment duration before booking a fixed return ticket.",
      "Flight schedules, routes and fares change. Patients should confirm current flight information before booking.",
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
    heading: "Documents Angolan Patients Should Prepare",
    intro:
      "Before travelling, organise medical and travel documents into one folder. The exact documents depend on the patient's medical condition. Keep both printed and digital copies where possible.",
    general: [
      "Medical reports, blood-test results, CT, MRI, X-rays and pathology or biopsy reports",
      "Previous discharge summaries, operation records, current prescriptions and a medication list",
      "Passport, visa or e-Visa, hospital appointment letter, flight and accommodation details",
      "Emergency contact information and financial or payment documentation where required",
    ],
    cancer: [
      "Histopathology, biopsy, immunohistochemistry and molecular testing where available",
      "CT, MRI and PET-CT images as well as reports",
      "Previous chemotherapy, radiation and surgical notes",
    ],
    cardiac: [
      "ECG, echocardiogram and coronary angiography",
      "CT coronary reports and stress-test results where applicable",
      "Previous cardiac procedure records, discharge summaries and current medicines",
    ],
    ortho: [
      "X-rays, MRI and CT",
      "Previous operation reports, implant details if applicable and physiotherapy records",
    ],
    cancerNote:
      "If pathology slides or tissue blocks are available, ask the receiving hospital whether they should be brought for review.",
  },
  living: {
    heading: "Accommodation, Food and Language for Angolan Patients",
    intro:
      "The accommodation requirement depends on the treatment plan. A patient may need accommodation before admission, between consultations, after discharge, during outpatient treatment or during rehabilitation. For patients recovering from major surgery, proximity to the hospital may be more important than choosing the lowest-cost accommodation.",
    accommodation: [
      "Distance from the hospital, accessibility and elevator availability",
      "Kitchen facilities, laundry, pharmacy access and grocery access",
      "Transportation and length of stay",
      "Hotel, serviced apartment, long-stay or hospital-associated accommodation",
    ],
    accommodationNote:
      "For patients undergoing repeated chemotherapy or radiation therapy, staying near the hospital may reduce daily travel.",
    food: "Patients and attendants may remain in India for several days or weeks. Before choosing accommodation, consider access to restaurants, grocery stores, pharmacies, banks or ATMs, transportation and suitable food options. Patients with diabetes, kidney disease, hypertension or other dietary requirements should discuss their nutritional needs with the treating hospital.",
    language:
      "Portuguese is the official language of Angola. Many Indian hospitals operate primarily in English. Before travelling, confirm whether Portuguese-language assistance or an interpreter can be arranged, whether medical reports require translation, whether consent documents can be clearly explained, and whether discharge instructions can be understood. For major procedures, patients should fully understand the proposed treatment and consent information before proceeding. GAF Healthcare can coordinate Portuguese-language communication support where available.",
  },
  stay: {
    heading: "How Long Will an Angolan Patient Need to Stay in India?",
    intro:
      "The duration depends on the treatment. A consultation may require a short stay, while surgery, cancer treatment, rehabilitation or transplantation may require a longer period. These are planning estimates rather than promises. Ask the treating hospital for an estimated hospitalisation and recovery period before booking a return journey.",
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
    heading: "Medical Journey from Angola to India",
    intro:
      "If you are considering treatment in India, begin with your medical records rather than your flight booking. A records-first sequence allows many questions to be addressed before leaving Luanda.",
    steps: [
      { title: "Share medical reports", body: "Send existing medical records, scans, pathology and previous treatment information." },
      { title: "Specialist review", body: "The relevant Indian specialist reviews the available information. A remote opinion does not replace an in-person examination." },
      { title: "Understand treatment options", body: "The patient receives information about the proposed treatment pathway." },
      { title: "Hospital and cost estimate", body: "Hospital options and an indicative treatment estimate are discussed." },
      { title: "Confirm appointment", body: "The patient confirms the selected hospital and appointment." },
      { title: "Medical visa", body: "Eligible Angolan citizens can apply through India's e-Medical Visa system or the regular Medical Visa through the Embassy in Luanda." },
      { title: "Travel to India", body: "The patient and attendant travel according to the confirmed schedule." },
      { title: "Hospital assessment", body: "The treating team conducts the necessary in-person evaluation." },
      { title: "Treatment", body: "The patient receives the recommended treatment. The plan may change after physical examination or additional investigations." },
      { title: "Recovery and follow-up", body: "The hospital provides discharge instructions and follow-up recommendations." },
      { title: "Return to Angola", body: "The patient returns when medically fit to travel and continues follow-up as advised." },
      { title: "Keep the records", body: "Carry complete discharge summaries, prescriptions and treatment records for any later review in Angola or India." },
    ],
  },
  help: {
    heading: "How GAF Healthcare Helps Angolan Patients",
    intro:
      "International treatment involves medical, logistical and financial decisions. GAF Healthcare can help coordinate the major stages of the journey. The exact services available should be confirmed with GAF Healthcare before travel.",
    before: [
      "Medical report collection and records review",
      "Specialist identification and hospital options",
      "Medical opinion coordination",
      "Treatment estimate coordination",
      "Appointment scheduling and medical-visa-document support",
      "Portuguese-language communication support where available",
      "Travel planning",
    ],
    during: [
      "Hospital coordination and appointment assistance",
      "Patient communication and family coordination",
      "Practical support during the stay",
    ],
    after: [
      "Discharge coordination and medical-document collection",
      "Follow-up planning and communication with the treating hospital",
      "Return-travel planning when the doctor clears travel",
    ],
    note: "GAF Healthcare's role is to help patients understand and coordinate their options rather than make the clinical decision for them. Visa approval remains subject to the Government of India's rules and decision.",
  },
  opinion: {
    heading: "Why Get a Medical Opinion Before Travelling?",
    intro:
      "International medical travel requires planning. A medical opinion before travel can help clarify whether surgery may be required, which specialist should assess the case, what additional investigations may be needed, possible treatment options, expected hospitalisation, approximate treatment duration, indicative costs and whether travel should be arranged urgently.",
    questions: [
      "Is treatment in India appropriate, and is surgery required?",
      "Which specialist should evaluate the patient, and are additional tests necessary?",
      "What treatment might be recommended, and what could it cost?",
      "Will an attendant be needed, and what follow-up will be required?",
      "How long should the patient remain in India after discharge?",
      "Can follow-up information be shared with a doctor in Angola?",
    ],
    close:
      "A remote medical review does not replace an in-person examination. The final diagnosis and treatment decision must be made by the treating medical team. For some patients, treatment closer to home may be more practical, particularly where frequent long-term follow-up is required.",
  },
  choose: {
    heading: "How to Choose a Hospital and Doctor in India",
    intro:
      "A hospital should be evaluated according to the patient's specific medical requirement. The objective should be to identify the appropriate specialist for the medical problem rather than simply selecting the most famous doctor.",
    hospital: [
      "Does the hospital provide the required specialty and subspecialty?",
      "Does the hospital have doctors experienced in the required procedure, and are the diagnostic, surgical and critical-care facilities appropriate?",
      "Will the patient need several specialties, and does the hospital have an international-patient department?",
      "What does the hospital estimate include, how long might the patient need to remain in India, and what follow-up will be needed after returning to Angola?",
    ],
    specialist: [
      "Breast cancer → surgical oncologist, medical oncologist, radiation oncologist",
      "Coronary artery disease → cardiologist, interventional cardiologist, cardiac surgeon where required",
      "Brain tumour → neurosurgeon, neuro-oncology team where appropriate, radiation oncology where required",
      "Knee arthritis → orthopedic joint-replacement surgeon",
    ],
  },
  faqHeading: "Frequently Asked Questions",
  faqs: [
    {
      q: "Can Angolan patients travel to India for medical treatment?",
      a: "Yes. Angolan citizens can travel to India for medical treatment subject to India's current visa and immigration requirements.",
    },
    {
      q: "Can Angolan citizens apply for an Indian e-Medical Visa?",
      a: "Yes. Angola is currently listed among the nationalities eligible for India's e-Visa system, and the e-Medical Visa is available for eligible applicants travelling for medical treatment.",
    },
    {
      q: "How do I apply for an Indian medical visa from Angola?",
      a: "Eligible Angolan applicants can use the Government of India's official e-Visa system. The application requires the relevant passport information and, for e-Medical Visa applicants, a letter from the Indian hospital containing the proposed or tentative treatment or admission date. A regular Medical Visa remains available through the Embassy of India in Luanda; the Mission currently states that it does not process e-Visa applications.",
    },
    {
      q: "Can a family member accompany an Angolan patient?",
      a: "Eligible attendants can apply for an e-Medical Attendant Visa. The Government of India currently states that up to two e-Medical Attendant Visas may be granted against one e-Medical Visa.",
    },
    {
      q: "How much does medical treatment in India cost for Angolan patients?",
      a: "Costs vary according to the diagnosis, procedure, hospital, specialist, medicines, implants, investigations and length of stay. A patient-specific hospital estimate is more useful than a generic internet price.",
    },
    {
      q: "Can I get a medical opinion before travelling?",
      a: "Yes. Patients can share their available medical reports and diagnostic information for preliminary specialist review.",
    },
    {
      q: "What treatments are available in India for Angolan patients?",
      a: "Treatment is available across oncology, cardiology, cardiac surgery, neurosurgery, orthopedics, urology, gastroenterology, transplantation, fertility and many other specialties.",
    },
    {
      q: "Which Indian city should an Angolan patient choose?",
      a: "There is no single city suitable for every patient. Delhi NCR, Mumbai, Chennai, Hyderabad, Bengaluru and Pune all have major hospitals. The appropriate city depends on the diagnosis, specialist and selected hospital. GAF’s live catalogue currently covers Delhi NCR, Mumbai, Chennai, Hyderabad and Bengaluru.",
    },
    {
      q: "Which hospitals can Angolan patients consider?",
      a: "Patients should consider hospitals according to their specialty, specialist expertise, facilities, treatment plan, international-patient services and estimated cost.",
    },
    {
      q: "What medical documents should I bring to India?",
      a: "Bring your diagnostic reports, scans, pathology, previous treatment records, prescriptions and discharge summaries. The exact requirements depend on your medical condition.",
    },
    {
      q: "Should cancer patients bring pathology reports?",
      a: "Yes. Histopathology, biopsy, immunohistochemistry, molecular reports and imaging can be important for an oncology team reviewing a case.",
    },
    {
      q: "How long should I stay in India?",
      a: "The required stay depends on the treatment. Ask the treating hospital for an estimated hospitalisation and recovery period before booking your return journey.",
    },
    {
      q: "Can GAF Healthcare help me find an Indian hospital?",
      a: "GAF Healthcare can help coordinate hospital options according to the patient's diagnosis and treatment requirement.",
    },
    {
      q: "Can GAF Healthcare arrange a specialist opinion?",
      a: "GAF Healthcare can coordinate the sharing of medical information with an appropriate specialist or hospital, subject to the treating team's process.",
    },
    {
      q: "Can I compare different hospitals?",
      a: "Yes. Comparing relevant specialist expertise, proposed treatment, facilities, expected stay and estimated costs can help patients understand their options.",
    },
    {
      q: "Can I continue follow-up after returning to Angola?",
      a: "The treating hospital should provide a follow-up plan before discharge. Patients should retain all discharge summaries, prescriptions and treatment records for continued care in Angola.",
    },
    {
      q: "Can I travel immediately after surgery?",
      a: "Not necessarily. The treating doctor should determine when the patient is medically fit to travel.",
    },
    {
      q: "Do Angolan patients need a yellow fever vaccination certificate?",
      a: "Yes. The Embassy of India in Luanda states that travellers aged nine months and above arriving from Angola must carry an internationally valid yellow-fever vaccination certificate, valid 10 days after vaccination. The Embassy also treats a valid yellow-fever card as mandatory for Medical Visa issuance. Confirm the live official notes before travel.",
    },
    {
      q: "What passport validity is required for India's e-Visa?",
      a: "The official guidance states that the passport should have at least six months' validity at the time of application and at least two blank pages for immigration stamping.",
    },
    {
      q: "How early can Angolan patients apply for India's e-Medical Visa?",
      a: "The current Government of India guidance says eligible applicants can apply at least four days before arrival, with an application window of up to 120 days before the intended arrival date.",
    },
    {
      q: "Can Portuguese-speaking Angolan patients receive communication support?",
      a: "Portuguese is Angola's official language. English is widely used in Indian hospitals. Patients should confirm Portuguese interpretation and communication arrangements with the hospital and patient coordinator before travelling.",
    },
    {
      q: "Which cancers are common in Angola?",
      a: "GLOBOCAN 2024 identified breast, cervical and prostate cancers as the three leading cancers by estimated new cases among both sexes, followed by colorectum and leukaemia. These are population-level estimates, not an individual's diagnosis.",
    },
    {
      q: "Can an Angolan patient get a medical second opinion from India?",
      a: "Yes. Relevant medical records can be shared with an Indian specialist for preliminary review before deciding whether to travel. A second opinion should complement, not unnecessarily delay, urgent medical care.",
    },
    {
      q: "Can I get a cost estimate before travelling?",
      a: "Yes. An initial estimate can often be requested from the hospital based on medical records. The final plan and quotation may change after examination and investigations in India.",
    },
    {
      q: "How long is the Indian e-Medical Visa valid?",
      a: "Visa validity, permitted stay and entry rules can change. Patients should verify the live official e-Visa portal immediately before applying rather than relying on a permanently hard-coded validity statement.",
    },
    {
      q: "Where does the journey from Angola usually begin?",
      a: "Dr. António Agostinho Neto International Airport in Luanda is Angola's principal international gateway. Patients travelling from Benguela, Lobito, Huambo, Lubango, Cabinda or other provinces may first travel to Luanda.",
    },
  ],
  finalCta: {
    heading: "Planning Medical Treatment in India from Angola?",
    body: "Choosing treatment abroad can feel overwhelming, particularly when you are dealing with a serious diagnosis. You can begin with your medical records. GAF Healthcare can help Angolan patients understand their treatment options, identify appropriate specialists and hospitals, coordinate treatment estimates and plan the journey to India.",
    primary: "Get a Medical Opinion",
    secondary: "Talk to a Medical Travel Expert",
    whatsappLabel: "WhatsApp +91 90443 46292",
    steps: "Share Your Medical Reports → Get a Specialist Opinion → Explore Hospital Options → Understand the Estimated Cost → Plan Your Journey to India",
  },
  disclaimer: {
    heading: "Medical Disclaimer",
    body: "The information on this page is provided for general educational and medical-travel planning purposes. It is not a diagnosis, medical prescription or substitute for consultation with a qualified healthcare professional. Treatment recommendations, risks, outcomes, duration and costs vary between patients. Final treatment decisions should be made by the treating medical team after evaluating the patient. Indicative costs are not hospital quotations. The final bill may differ because of investigations, medicines, implants, treatment changes, complications, ICU requirements and length of stay. Visa and immigration requirements can change. Angolan patients should verify the latest requirements directly through the Government of India's official visa system before applying or travelling.",
  },
  sources: {
    heading: "Sources & Further Reading",
    items: [
      {
        label: "Government of India — Official e-Visa portal",
        href: ANGOLA_OFFICIAL_LINKS.eVisa,
        detail: "Current e-Visa eligibility, including Angola, and e-Medical / e-Medical Attendant categories.",
      },
      {
        label: "Government of India — Country/territory-wise e-Visa fee list",
        href: ANGOLA_OFFICIAL_LINKS.eVisaFees,
        detail: "Official fee table confirming Angola among e-Visa eligible countries, with e-Medical and e-Medical Attendant listed at US$80.",
      },
      {
        label: "Government of India — Indian Visa Online",
        href: ANGOLA_OFFICIAL_LINKS.visaOnline,
        detail: "Official visa application and eligibility information for routes other than e-Visa.",
      },
      {
        label: "Embassy of India, Luanda — e-Visa note",
        href: ANGOLA_OFFICIAL_LINKS.embassyEvisaPdf,
        detail: "Embassy PDF confirming e-Tourist, e-Business, e-Medical, e-Medical Attendant and e-Conference categories for Angolan nationals.",
      },
      {
        label: "Embassy of India, Luanda — Visa information",
        href: ANGOLA_OFFICIAL_LINKS.embassyVisa,
        detail: "Regular Medical Visa documents, yellow-fever certificate, and the statement that the Embassy does not process e-Visa applications.",
      },
      {
        label: "Embassy of India, Luanda — Yellow-fever notice",
        href: ANGOLA_OFFICIAL_LINKS.embassyYf,
        detail: "Notice that travellers aged nine months and above from Angola need an internationally valid yellow-fever certificate, valid 10 days after vaccination, and that the card is mandatory for Medical Visa issuance.",
      },
      {
        label: "Ministry of External Affairs, India — India–Angola relations",
        href: ANGOLA_OFFICIAL_LINKS.meaBrief,
        detail: "Diplomatic relations from 1985, health and pharmaceutical cooperation, and recent bilateral trade figures.",
      },
      {
        label: "Ministry of External Affairs, India — India–Angola country brief",
        href: ANGOLA_OFFICIAL_LINKS.meaBrief26,
        detail: "Official country brief covering the Health and Medicine cooperation framework and wider bilateral relationship.",
      },
      {
        label: "Ministry of External Affairs, India — Pharmaceutical sector note, Angola",
        href: ANGOLA_OFFICIAL_LINKS.pharma,
        detail: "Official note describing India as a major supplier of pharmaceutical imports into Angola and listing healthcare-related cooperation areas.",
      },
      {
        label: "IARC / WHO — GLOBOCAN 2024 Angola fact sheet",
        href: ANGOLA_OFFICIAL_LINKS.globocan,
        detail: "Estimated 27,511 new cases, 16,190 deaths and 59,105 five-year prevalent cases, with breast, cervix, prostate, colorectum and leukaemia as leading sites.",
      },
      {
        label: "IARC Global Cancer Observatory — Cancer Today",
        href: ANGOLA_OFFICIAL_LINKS.iarcToday,
        detail: "Current GLOBOCAN population fact sheets.",
      },
      {
        label: "WHO — Angola health data overview",
        href: ANGOLA_OFFICIAL_LINKS.whoData,
        detail: "Country-level WHO health information, including NCD indicators.",
      },
      {
        label: "Ministry of Health and Family Welfare, India — IHR yellow-fever vaccination",
        href: ANGOLA_OFFICIAL_LINKS.mohfwYellowFever,
        detail: "India’s yellow-fever endemic-country list and certificate requirements.",
      },
      {
        label: "Government of India — Bureau of Immigration",
        href: ANGOLA_OFFICIAL_LINKS.boi,
        detail: "Entry and immigration instructions for travellers arriving in India.",
      },
    ],
  },
};
