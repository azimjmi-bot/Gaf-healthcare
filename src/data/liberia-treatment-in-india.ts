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

export const LIBERIA_PAGE_PATH = "/liberia/treatment-in-india";
export const LIBERIA_PAGE_LOCALES = ["en"] as const;
export const LIBERIA_LAST_REVIEWED = "2026-10-03";

export type LiberiaPageCopy = typeof liberiaPageCopyEn;

export function liberiaPageCopy(_locale: AppLocale): LiberiaPageCopy {
  return liberiaPageCopyEn;
}

const INDIA = "India";

export const LIBERIA_OFFICIAL_LINKS = {
  eVisa: "https://indianvisaonline.gov.in/evisa/tvoa.html",
  eVisaHome: "https://indianvisaonline.gov.in/evisa/",
  eVisaFees: "https://indianvisaonline.gov.in/evisa/eTV_revised_fee_final.pdf",
  visaOnline: "https://indianvisaonline.gov.in/visa/",
  embassy: "https://www.indianembassymonrovia.gov.in/",
  embassyVisa: "https://www.indianembassymonrovia.gov.in/visa-services.php",
  embassyEvisa: "https://www.indianembassymonrovia.gov.in/e-visa.php",
  embassyFees: "https://www.indianembassymonrovia.gov.in/visa-fee.php",
  embassyRelations: "https://www.indianembassymonrovia.gov.in/bilateral-relation.php",
  meaBrief: "https://www.mea.gov.in/Portal/ForeignRelation/India-Liberia26.pdf",
  meaBriefOlder: "https://www.mea.gov.in/Portal/ForeignRelation/Liberia-Bilateral-Brief-27-03-2025.pdf",
  globocan: "https://gco.iarc.who.int/media/globocan/factsheets/populations/430-liberia-fact-sheet.pdf",
  iarcToday: "https://gco.iarc.who.int/today/en/fact-sheets-populations",
  whoData: "https://data.who.int/countries/430",
  whoPenPlus:
    "https://www.afro.who.int/countries/liberia/news/distance-access-liberia-launches-four-advanced-ncd-clinics-drive-who-pen-plus-scale",
  mohfwYellowFever: "https://ihpoe.mohfw.gov.in/vaccination.php",
  boi: "https://boi.gov.in",
} as const;

export const LIBERIA_CURATED_TREATMENT_SLUGS = [
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

export const LIBERIA_CANCER_TREATMENT_SLUGS = TANZANIA_CANCER_TREATMENT_SLUGS;

export const LIBERIA_COST_PROCEDURE_NAMES = [
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

export const LIBERIA_DOCTOR_SPECIALTY_SLUGS = [
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
  "ophthalmology",
] as const;

export { resolveCuratedBySlug, tanzaniaCityHrefs, tanzaniaHospitals, tanzaniaSpecialtyHref };

export function resolveLiberiaCostRows(catalog: Treatment[]) {
  return LIBERIA_COST_PROCEDURE_NAMES.map((name) => {
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

export function liberiaDoctors(doctors: Doctor[]) {
  return LIBERIA_DOCTOR_SPECIALTY_SLUGS.map((specialtySlug) => {
    const pool = doctors.filter((doctor) => doctor.specialtySlug === specialtySlug);
    const featured = pool.find((doctor) => doctor.featured);
    return featured ?? [...pool].sort((a, b) => a.name.localeCompare(b.name))[0];
  }).filter((row): row is Doctor => Boolean(row));
}

export const liberiaPageCopyEn = {
  seo: {
    title: "Medical Treatment in India for Liberian Patients",
    description:
      "Explore medical treatment in India for Liberian patients. Find specialist doctors, hospitals, treatments, indicative costs, e-Medical Visa guidance and support from GAF Healthcare.",
    keywords: [
      "medical treatment in India for Liberian patients",
      "medical treatment in India from Liberia",
      "treatment in India for Liberian patients",
      "medical tourism from Liberia to India",
      "Indian hospitals for Liberian patients",
      "Indian doctors for Liberian patients",
      "medical treatment cost in India for Liberian patients",
      "cancer treatment in India for Liberian patients",
      "cardiac treatment in India for Liberian patients",
      "heart surgery in India for Liberian patients",
      "neurosurgery in India for Liberian patients",
      "orthopaedic treatment in India for Liberian patients",
      "IVF in India for Liberian patients",
      "e-Medical Visa India for Liberian citizens",
      "Indian Medical Visa from Liberia",
      "treatment in India from Monrovia",
      "medical treatment from Monrovia to India",
      "breast cancer treatment India from Liberia",
      "cervical cancer treatment India from Liberia",
      "prostate cancer treatment India from Liberia",
      "eye treatment in India for Liberian patients",
    ],
  },
  breadcrumb: {
    home: "Home",
    liberia: "Liberia",
    page: "Treatment in India",
  },
  hero: {
    eyebrow: "Medical treatment in India for Liberian patients",
    h1: "Medical Treatment in India for Liberian Patients",
    lede:
      "For patients from Liberia, travelling to India for medical treatment involves more than choosing a hospital. GAF Healthcare helps Liberian patients connect medical records from Monrovia and other counties with appropriate hospitals and specialists in India, then plan the visa, travel and follow-up around that medical requirement.",
    primaryCta: "Get a Medical Opinion",
    secondaryCta: "Explore Treatments",
    whatsappLabel: "WhatsApp +91 90443 46292",
  },
  quickAnswer: {
    heading: "Quick Answer: Medical Treatment in India for Liberian Patients",
    intro:
      "Liberian patients may consider Indian hospitals for a broad range of specialist treatments, including:",
    treatments: [
      "Cancer treatment",
      "Chemotherapy",
      "Radiation oncology",
      "Immunotherapy",
      "Targeted therapy",
      "Precision oncology",
      "Hormone therapy",
      "Cardiology",
      "Heart surgery",
      "Angioplasty",
      "Valve replacement",
      "Neurosurgery",
      "Brain tumour surgery",
      "Spine surgery",
      "Orthopaedic surgery",
      "Knee replacement",
      "Hip replacement",
      "Urology",
      "Kidney treatment",
      "Gastrointestinal surgery",
      "Liver and pancreatic surgery",
      "Bariatric surgery",
      "IVF and fertility treatment",
      "Paediatric treatment",
      "Paediatric cardiac surgery",
      "Kidney transplantation",
      "Bone marrow transplantation",
      "Eye treatment",
      "Second opinions for complex diagnoses",
    ],
    hospital:
      "The right hospital depends on the patient's diagnosis, treatment requirement, specialist expertise, previous treatment, investigations and expected length of stay.",
    close:
      "A hospital should therefore be selected after medical review, rather than simply because it appears prominently in search results or offers the lowest quotation.",
  },
  why: {
    heading: "Why Do Liberian Patients Consider Medical Treatment in India?",
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
    heading: "India–Liberia Healthcare Cooperation",
    paragraphs: [
      "India and Liberia share long-standing friendly relations. The Government of India opened a resident Mission in Monrovia in May 2021. Official MEA briefs state that India is a preferred destination for higher education and medical treatment among Liberians.",
      "The first India–Liberia Foreign Office Consultations took place in Monrovia on 17 December 2024. Officials reviewed bilateral cooperation including trade, investment, mining, agriculture, health and pharmaceuticals, education, capacity building and people-to-people exchanges.",
      "An especially relevant healthcare connection is the Hyderabad-based L. V. Prasad Eye Institute Collaborative Center, described in the official brief as a modern eye clinic inaugurated on 24 July 2017 at JFK Memorial Hospital in Monrovia. Indians also have a substantial commercial presence in pharmaceuticals in Liberia.",
      "These relationships do not mean every medicine or treatment is interchangeable between the two healthcare systems. For an individual patient, bilateral relations are only background. Treatment decisions remain dependent on the diagnosis and the hospital's medical assessment.",
    ],
  },
  context: {
    heading: "Healthcare Needs and Planning from Liberia",
    intro:
      "Liberia's health system continues to address communicable and noncommunicable diseases, health-service access, the health workforce and essential medical products. WHO country data records a 2023 population of about 5.5 million and identifies Liberia as a low-income country. WHO also reports work to expand integrated care for severe chronic diseases through PEN-Plus clinics. International treatment becomes relevant when a patient needs a particular specialist, advanced procedure, complex surgery, specialised diagnostics, multidisciplinary care or another service that is not readily available locally.",
    points: [
      "English is the official language of Liberia, which can simplify communication with many Indian international-patient teams. Medical terminology can still be complex, so confirm consent and discharge understanding in writing.",
      "Most international medical journeys begin at Roberts International Airport, serving Monrovia. Patients travelling from Gbarnga, Buchanan, Ganta, Kakata, Zwedru, Harper, Robertsport, Greenville or Voinjama may first need to reach Monrovia.",
      "The LV Prasad Eye Institute Collaborative Center at JFK Memorial Hospital is a country-specific ophthalmology connection. It does not replace an individual specialist review for treatment in India.",
      "Patients should always provide their current medication list to the treating Indian specialist and should not independently change medicines because an equivalent-looking product is available.",
    ],
    close:
      "Country-level health indicators do not determine an individual's medical needs. The relevant question is: what is the patient's diagnosis, what treatment is appropriate, and can the patient safely travel for that treatment?",
  },
  overview: {
    heading: "What Medical Treatments Can Liberian Patients Get in India?",
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
    heading: "Popular Medical Treatments for Liberian Patients in India",
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
        title: "Eye Treatment",
        body: "Cataract, glaucoma, retina, cornea and other ophthalmic pathways may be relevant, including because of the LV Prasad Eye Institute Collaborative Center at JFK Memorial Hospital in Monrovia. GAF does not yet publish dedicated cataract or retina treatment pages. Cases are coordinated with live ophthalmology specialists after records review.",
        href: "",
        hrefLabel: "",
        specialty: "Ophthalmology",
      },
      {
        title: "IVF & Fertility",
        body: "Liberian couples may explore IVF, ICSI, IUI and related fertility evaluation in India. GAF does not yet publish a dedicated IVF page. Eligibility, laboratory procedures and applicable Indian regulations should be confirmed with the treating fertility centre before travel.",
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
          { label: "Lymphoma", href: "/treatments/lymphoma-treatment-in-india" },
          { label: "Liver Cancer", href: "" },
          { label: "Kaposi Sarcoma", href: "" },
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
      {
        title: "Ophthalmology",
        items: [
          { label: "Cataract Surgery", href: "" },
          { label: "Glaucoma Treatment", href: "" },
          { label: "Retina Treatment", href: "" },
          { label: "Corneal Treatment", href: "" },
          { label: "Paediatric Eye Treatment", href: "" },
          { label: "Eye Cancer Treatment", href: "" },
        ],
      },
    ],
  },
  cancer: {
    heading: "Cancer Treatment in India for Liberian Patients",
    intro:
      "Cancer is an important area of specialist medical care. According to the IARC GLOBOCAN 2024 Liberia fact sheet, the country had an estimated 4,217 new cancer cases, 2,745 cancer deaths and 7,311 five-year prevalent cases. These are GLOBOCAN 2024 estimates, not current 2026 case counts, and they should not be interpreted as an individual's diagnosis or prognosis.",
    body: "The same official fact sheet ranks breast first among estimated new cases in both sexes (885; 21.0%), followed by cervix uteri (561; 13.3%), prostate (393; 9.3%), liver (315; 7.5%) and colorectum (207; 4.9%). Among Liberian women, breast cancer was the leading site (885; 33.7%), followed by cervix and liver. Among Liberian men, prostate cancer was the leading site (393; 24.7%), followed by liver and stomach. Non-Hodgkin lymphoma (116 estimated new cases) ranked seventh among both sexes. GAF does not yet publish dedicated liver-cancer, Kaposi-sarcoma or stomach-cancer pages; those cases are coordinated through the relevant oncology or hepatobiliary team after records review.",
    modalities: [
      { label: "Breast Cancer", href: "/treatments/breast-cancer-treatment-in-india" },
      { label: "Prostate Cancer", href: "/treatments/prostate-cancer-treatment-in-india" },
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
    heading: "How Much Does Medical Treatment in India Cost for Liberian Patients?",
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
    heading: "Which Indian Cities Can Liberian Patients Consider?",
    intro:
      "India has several major healthcare centres. The appropriate city should be selected according to the patient's medical requirement. There is no single Indian city that is appropriate for every Liberian patient.",
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
    heading: "How Should Liberian Patients Choose an Indian Hospital?",
    intro:
      "Start with the diagnosis. Ask whether the hospital treats the specific disease, whether the required specialty and surgeon or oncologist are available, whether ICU and advanced diagnostics are in place, whether international-patient services exist, whether the quotation is transparent, and what follow-up arrangements are available. The campuses below are drawn from GAF’s live India catalogue, one from each published city.",
    directoryLabel: "Browse hospitals in India",
  },
  doctors: {
    heading: "How Should Liberian Patients Choose the Right Doctor?",
    intro:
      "The appropriate specialist depends on the patient's condition. A breast-cancer patient may need a breast or surgical oncologist, a medical oncologist and a radiation oncologist. The doctor should review the patient's actual medical records before recommending treatment. The specialists below are taken from GAF’s live doctor catalogue.",
    directoryLabel: "Browse doctors in India",
  },
  visa: {
    heading: "Indian e-Medical Visa for Liberian Patients",
    intro:
      "Liberia is currently listed among the countries eligible for India's e-Visa system. Medical treatment is an eligible purpose. The official portal provides e-Medical and e-Medical Attendant categories. The Embassy of India in Monrovia also publishes e-Visa and regular visa-services pages for applicants who still need the Embassy route.",
    points: [
      "Eligible applicants can apply online. The current official portal states that e-Medical and e-Medical Attendant applications may be submitted at least four days before arrival, with an arrival-date selection window of up to 120 days.",
      "The official e-Visa fee list currently shows Liberia at US$80 for the e-Visa service. A bank charge is stated on the official portal. Confirm the live amount before payment.",
      "The current official guidance states that up to two e-Medical Attendant Visas can be issued against one e-Medical Visa.",
      "An e-Medical Visa application requires the documents specified by the Government of India, including a passport bio page, a recent photograph, sufficient funds, a return or onward ticket, and an Indian hospital letter that identifies the patient and the tentative admission or treatment date.",
      "Some patients may still need India's regular Medical Visa through the Embassy of India in Monrovia. The Embassy visa-services page currently requires an online visa application first, then an in-person submission with the passport, photographs, fee receipts and the documents required for that visa type.",
      "The Embassy visa-fee page currently lists Medical, Medical Attendant and Ayush visas at US$80 for up to six months and US$120 for more than six months up to one year, plus a published service charge. Confirm the live schedule before payment. Do not use a third-party e-Visa website.",
    ],
    disclaimer:
      "Visa rules, fees, documents and entry regulations can change. Verify the current official Indian e-Visa portal and the Embassy of India in Monrovia immediately before applying or travelling.",
    documentsHeading: "Documents for an Indian e-Medical Visa or regular Medical Visa from Liberia",
    documents: [
      "Passport with at least six months’ validity and two blank pages",
      "Recent photograph and passport bio page",
      "Indian hospital letter with tentative admission or treatment date for an e-Medical Visa",
      "Return or onward ticket and proof of sufficient funds",
      "For the regular Medical Visa: completed online visa application, in-person Embassy submission, passport, photographs, fee receipts and the supporting documents required for the visa type",
      "Yellow-fever vaccination certificate where required for entry",
      "Attendant passports and documents where a family member will travel",
    ],
    documentsNote:
      "Patients should determine which visa route applies to their circumstances rather than submitting documents based on an outdated third-party checklist.",
  },
  yellowFever: {
    heading: "Yellow Fever Requirements for Liberian Travellers",
    intro:
      "Liberia is listed among yellow-fever endemic countries on India's IHR points-of-entry guidance. Travellers arriving from endemic countries are generally required to carry a valid yellow-fever vaccination certificate issued by an authorised centre.",
    points: [
      "Carry the original certificate during travel. Photocopies or digital copies can be treated as insufficient at the border.",
      "Address vaccination documents early. An avoidable documentation issue can complicate a planned medical journey.",
      "Requirements can change according to travel history and current public-health regulations.",
    ],
    close:
      "Confirm the current requirement on the official Indian e-Visa portal, the Bureau of Immigration and the Embassy of India in Monrovia before travel.",
  },
  travel: {
    heading: "Travelling from Liberia to India for Medical Treatment",
    intro:
      "For most international medical journeys from Liberia, Monrovia is the principal starting point. The main international gateway is Roberts International Airport. Patients travelling from Gbarnga, Buchanan, Ganta, Kakata, Zwedru, Harper, Robertsport, Greenville or Voinjama may first need to reach Monrovia.",
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
    heading: "Documents Liberian Patients Should Prepare",
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
    heading: "Accommodation, Food and English-Language Communication",
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
      "English is the official language of Liberia, which can simplify communication with many Indian hospitals. Patients should still confirm how consultations, consent discussions, medication instructions and discharge notes will be explained, because medical terminology can remain difficult even when both sides speak English.",
  },
  stay: {
    heading: "How Long Will a Liberian Patient Need to Stay in India?",
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
      "If you are considering treatment in India, begin with your medical records rather than your flight booking. A records-first sequence allows many questions to be addressed before leaving Monrovia.",
    steps: [
      { title: "Share medical records", body: "Send the relevant reports and a concise medical history." },
      { title: "Get an Indian specialist opinion", body: "The appropriate specialist reviews the available records. A remote opinion does not replace an in-person examination." },
      { title: "Understand treatment options", body: "Discuss the proposed treatment, alternatives and expected timeline." },
      { title: "Select the hospital and doctor", body: "Choose according to the medical requirement." },
      { title: "Receive hospital confirmation", body: "The hospital confirms the consultation or treatment pathway." },
      { title: "Obtain a cost estimate", body: "Request a written estimate showing major inclusions and exclusions." },
      { title: "Apply for the Indian Medical Visa", body: "Use the current official e-Medical Visa process, or the regular Medical Visa through the Embassy of India in Monrovia if that route applies." },
      { title: "Arrange travel", body: "Plan flights, accommodation and local transportation around the confirmed hospital schedule." },
      { title: "Arrive in India", body: "Proceed to the hospital for consultation and evaluation." },
      { title: "Complete investigations and begin treatment", body: "The treating team may repeat or update diagnostic tests before confirming the final plan." },
      { title: "Recovery and discharge", body: "The hospital provides medication and follow-up instructions." },
      { title: "Return to Liberia and continue follow-up", body: "Travel home when medically fit and maintain follow-up with the Indian treating team and local healthcare professionals." },
    ],
  },
  help: {
    heading: "How GAF Healthcare Can Support Liberian Patients",
    intro:
      "GAF Healthcare can coordinate the medical journey between Liberia and India. The exact services available should be confirmed before travel. Medical decisions remain with the patient and treating medical professionals.",
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
    heading: "Can Liberian Patients Get a Second Medical Opinion from India?",
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
      "What happens after returning to Liberia?",
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
      q: "Can Liberian patients travel to India for medical treatment?",
      a: "Yes. Liberia is currently listed among the countries eligible for India's e-Visa services, and medical treatment is an eligible purpose. India's Ministry of External Affairs also identifies India as a preferred destination for medical treatment among Liberians.",
    },
    {
      q: "Is an e-Medical Visa available for Liberian citizens?",
      a: "Liberia is currently listed among India's e-Visa eligible nationalities on the official fee list, and the e-Visa system includes an e-Medical Visa category. Patients should verify the live official portal before applying.",
    },
    {
      q: "How early can I apply for an Indian e-Medical Visa?",
      a: "The current official guidance states that e-Medical and e-Medical Attendant applicants can apply online at least four days before arrival, with a 120-day arrival-date window.",
    },
    {
      q: "How long should my passport be valid?",
      a: "The current Indian e-Visa guidance states that the passport should generally have at least six months' validity at the time of application and two blank pages.",
    },
    {
      q: "Do I need an Indian hospital letter?",
      a: "Yes. The official e-Visa portal specifies a letter from the concerned Indian hospital on its letterhead for the e-Medical Visa application, including the suggested or tentative admission date.",
    },
    {
      q: "Can I bring an attendant?",
      a: "Yes, subject to the applicable visa rules. India's current e-Visa system states that two e-Medical Attendant Visas can be granted against one e-Medical Visa.",
    },
    {
      q: "Do some Liberian patients still need a regular Medical Visa?",
      a: "Yes. Some circumstances still require the regular Medical Visa through the Embassy of India in Monrovia. The Embassy currently requires an online visa application first, then an in-person submission with the passport, photographs, fee receipts and supporting documents.",
    },
    {
      q: "What are the current Embassy Medical Visa fees in Monrovia?",
      a: "The Embassy visa-fee page currently lists Medical, Medical Attendant and Ayush visas at US$80 for up to six months and US$120 for more than six months up to one year, plus a published service charge. Confirm the live schedule before payment.",
    },
    {
      q: "Do Liberian patients need Yellow Fever documentation?",
      a: "Liberia is listed among yellow-fever endemic countries on India's IHR points-of-entry guidance. The official e-Visa notes state that travellers from affected countries should carry a Yellow Fever Vaccination Card. Confirm the live official notes before travel.",
    },
    {
      q: "How much does medical treatment in India cost for Liberian patients?",
      a: "There is no fixed price. Costs depend on the diagnosis, procedure, hospital, specialist, medicines, investigations, implants, room category, hospitalisation and patient-specific factors. GAF presents USD planning estimates, not guaranteed hospital quotations.",
    },
    {
      q: "Which treatments can Liberian patients receive in India?",
      a: "Potential areas include cancer, cardiology, neurosurgery, orthopaedics, urology, GI surgery, fertility, paediatrics, ophthalmology and transplantation. The appropriate pathway depends on the diagnosis and a specialist review of the medical records.",
    },
    {
      q: "Which cancers are common in Liberia?",
      a: "GLOBOCAN 2024 estimates 4,217 new cancer cases and 2,745 cancer deaths in Liberia. The leading sites by estimated new cases among both sexes were breast, cervix, prostate, liver and colorectum. These are population-level estimates, not an individual diagnosis.",
    },
    {
      q: "Can I send my medical reports before travelling?",
      a: "Yes. Sending reports before travel can allow an Indian specialist or hospital to review the case and determine whether additional information is needed.",
    },
    {
      q: "Can I obtain a second opinion remotely?",
      a: "An initial remote medical opinion may be possible using medical records. Some conditions require physical examination or additional investigations. A remote opinion does not replace an in-person examination when one is clinically necessary.",
    },
    {
      q: "Which Indian cities can Liberian patients consider?",
      a: "Delhi NCR, Mumbai, Chennai, Hyderabad and Bengaluru are live GAF catalogue cities. Pune can also be considered, but this page does not link to a Pune directory because that city is not yet in the live catalogue.",
    },
    {
      q: "How long will treatment in India take?",
      a: "The duration depends on the treatment. Consultation, chemotherapy, radiation, surgery, transplantation and rehabilitation can all have different timelines. Ask the hospital for an estimated pre-treatment, hospitalisation, recovery and follow-up period.",
    },
    {
      q: "Where does the journey from Liberia usually begin?",
      a: "Roberts International Airport, serving Monrovia, is Liberia's principal international gateway. Patients travelling from Gbarnga, Buchanan, Ganta, Kakata, Zwedru, Harper, Voinjama or other counties may first travel to Monrovia.",
    },
    {
      q: "Is there an existing Indian healthcare connection in Liberia?",
      a: "Yes. The official MEA brief describes the Hyderabad-based L. V. Prasad Eye Institute Collaborative Center as a modern eye clinic inaugurated on 24 July 2017 at JFK Memorial Hospital in Monrovia.",
    },
    {
      q: "Does India have a broader healthcare relationship with Liberia?",
      a: "Yes. Health and pharmaceuticals were among the areas reviewed during the first India–Liberia Foreign Office Consultations in Monrovia on 17 December 2024. Official briefs also record a substantial Indian commercial presence in pharmaceuticals.",
    },
    {
      q: "Does India have an Embassy in Liberia?",
      a: "Yes. The Government of India opened a resident Mission in Monrovia in May 2021. The Embassy publishes visa-services, e-Visa and visa-fee pages for applicants.",
    },
    {
      q: "Is English-language communication important for Liberian patients?",
      a: "Yes. English is the official language of Liberia and is commonly used in Indian international-patient services. Patients should still confirm that consent, medication and discharge instructions are clearly understood.",
    },
    {
      q: "Is India right for every Liberian patient?",
      a: "No. International treatment is not automatically appropriate when the patient is medically unstable, cannot safely fly, needs immediate local treatment, or when the expected benefit does not justify the burden of travel. The treating doctor should determine medical fitness to travel.",
    },
    {
      q: "Does insurance cover treatment in India?",
      a: "Coverage depends on the patient's policy. Confirm whether planned treatment abroad, India, surgery, cancer treatment, medicines, emergency care and medical evacuation are covered, and obtain written confirmation where possible.",
    },
    {
      q: "Should I book my flight before receiving the hospital's opinion?",
      a: "For major treatment, it is generally better to obtain the medical opinion, hospital schedule and visa first. This allows the travel plan to be built around the medical schedule.",
    },
  ],
  finalCta: {
    heading: "Start Your Medical Treatment Journey from Liberia to India",
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
        href: LIBERIA_OFFICIAL_LINKS.eVisa,
        detail: "Current e-Visa categories, including e-Medical and e-Medical Attendant.",
      },
      {
        label: "Government of India — Country/territory-wise e-Visa fee list",
        href: LIBERIA_OFFICIAL_LINKS.eVisaFees,
        detail: "Official fee table used as the eligibility gate. Liberia is listed at US$80.",
      },
      {
        label: "Embassy of India, Monrovia — e-Visa services",
        href: LIBERIA_OFFICIAL_LINKS.embassyEvisa,
        detail: "Embassy page directing Liberian applicants to the official Indian e-Visa facility.",
      },
      {
        label: "Embassy of India, Monrovia — Visa services",
        href: LIBERIA_OFFICIAL_LINKS.embassyVisa,
        detail: "Regular visa process: online registration, in-person submission, biometrics and supporting documents.",
      },
      {
        label: "Embassy of India, Monrovia — Visa fee schedule",
        href: LIBERIA_OFFICIAL_LINKS.embassyFees,
        detail: "Published Medical, Medical Attendant and Ayush visa fee amounts, currently including US$80 and US$120 bands.",
      },
      {
        label: "Embassy of India, Monrovia — India–Liberia relations",
        href: LIBERIA_OFFICIAL_LINKS.embassyRelations,
        detail: "Resident Mission opened May 2021, preferred-destination wording for medical treatment, LV Prasad / JFK eye clinic and 2024 Foreign Office Consultations.",
      },
      {
        label: "Ministry of External Affairs, India — India–Liberia bilateral brief",
        href: LIBERIA_OFFICIAL_LINKS.meaBrief,
        detail: "Preferred destination for medical treatment among Liberians, LV Prasad Collaborative Center inaugurated 24 July 2017, and FOC health-and-pharmaceuticals review.",
      },
      {
        label: "IARC / WHO — GLOBOCAN 2024 Liberia fact sheet",
        href: LIBERIA_OFFICIAL_LINKS.globocan,
        detail: "Estimated 4,217 new cases, 2,745 deaths and 7,311 five-year prevalent cases, with breast, cervix, prostate, liver and colorectum as leading sites.",
      },
      {
        label: "WHO African Region — Liberia PEN-Plus NCD clinics",
        href: LIBERIA_OFFICIAL_LINKS.whoPenPlus,
        detail: "Official note on expanding integrated care for severe chronic diseases in Liberia.",
      },
      {
        label: "WHO — Liberia health data overview",
        href: LIBERIA_OFFICIAL_LINKS.whoData,
        detail: "Country-level WHO health information, including population and health-system indicators.",
      },
      {
        label: "Ministry of Health and Family Welfare, India — IHR yellow-fever vaccination",
        href: LIBERIA_OFFICIAL_LINKS.mohfwYellowFever,
        detail: "India’s yellow-fever endemic-country list and certificate requirements.",
      },
      {
        label: "Government of India — Bureau of Immigration",
        href: LIBERIA_OFFICIAL_LINKS.boi,
        detail: "Entry and immigration instructions for travellers arriving in India.",
      },
    ],
  },
};
