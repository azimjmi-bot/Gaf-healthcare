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

export const BENIN_PAGE_PATH = "/benin/treatment-in-india";
export const BENIN_PAGE_LOCALES = ["en"] as const;
export const BENIN_LAST_REVIEWED = "2026-10-03";

export type BeninPageCopy = typeof beninPageCopyEn;

export function beninPageCopy(_locale: AppLocale): BeninPageCopy {
  return beninPageCopyEn;
}

const INDIA = "India";

export const BENIN_OFFICIAL_LINKS = {
  eVisa: "https://indianvisaonline.gov.in/evisa/tvoa.html",
  eVisaFees: "https://indianvisaonline.gov.in/evisa/eTV_revised_fee_final.pdf",
  visaOnline: "https://indianvisaonline.gov.in/visa/",
  hci: "https://hciabuja.gov.in/",
  hciVisa: "https://hciabuja.gov.in/pages/MTA4",
  hciMedical: "https://hciabuja.gov.in/pages/MTE1",
  hciBenin: "https://www.hciabuja.gov.in/pages/Nw0K",
  hciBrief: "https://hciabuja.gov.in/pages/MTQ3",
  meaBrief: "https://www.mea.gov.in/Portal/ForeignRelation/India-Benin26new.pdf",
  globocan: "https://gco.iarc.who.int/media/globocan/factsheets/populations/204-benin-fact-sheet.pdf",
  iarcToday: "https://gco.iarc.who.int/today/en/fact-sheets-populations",
  whoData: "https://data.who.int/countries/204",
  mohfwYellowFever: "https://ihpoe.mohfw.gov.in/vaccination.php",
  boi: "https://boi.gov.in",
} as const;

export const BENIN_CURATED_TREATMENT_SLUGS = [
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

export const BENIN_CANCER_TREATMENT_SLUGS = TANZANIA_CANCER_TREATMENT_SLUGS;

export const BENIN_COST_PROCEDURE_NAMES = [
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

export const BENIN_DOCTOR_SPECIALTY_SLUGS = [
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

export function resolveBeninCostRows(catalog: Treatment[]) {
  return BENIN_COST_PROCEDURE_NAMES.map((name) => {
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

export function beninDoctors(doctors: Doctor[]) {
  return BENIN_DOCTOR_SPECIALTY_SLUGS.map((specialtySlug) => {
    const pool = doctors.filter((doctor) => doctor.specialtySlug === specialtySlug);
    const featured = pool.find((doctor) => doctor.featured);
    return featured ?? [...pool].sort((a, b) => a.name.localeCompare(b.name))[0];
  }).filter((row): row is Doctor => Boolean(row));
}

export const beninPageCopyEn = {
  seo: {
    title: "Medical Treatment in India for Beninese Patients",
    description:
      "Explore medical treatment in India for Beninese patients. Find specialist doctors, hospitals, treatments, indicative costs, Medical Visa guidance and support from GAF Healthcare.",
    keywords: [
      "medical treatment in India for Beninese patients",
      "medical treatment in India from Benin",
      "treatment in India for Beninese patients",
      "medical tourism from Benin to India",
      "Indian hospitals for Beninese patients",
      "Indian doctors for Beninese patients",
      "medical treatment cost in India for Beninese patients",
      "cancer treatment in India for Beninese patients",
      "cardiac treatment in India for Beninese patients",
      "medical visa India for Beninese citizens",
      "treatment in India from Cotonou",
      "medical treatment from Cotonou to India",
    ],
  },
  breadcrumb: {
    home: "Home",
    benin: "Benin",
    page: "Treatment in India",
  },
  hero: {
    eyebrow: "Medical treatment in India for Beninese patients",
    h1: "Medical Treatment in India for Beninese Patients",
    lede:
      "For patients from Benin, travelling to India for medical treatment is a major decision. It involves much more than selecting a hospital or looking at an online treatment price. GAF Healthcare helps Beninese patients navigate this process by connecting medical records from Benin with appropriate hospitals and specialists in India.",
    primaryCta: "Get a Medical Opinion",
    secondaryCta: "Explore Treatments",
    whatsappLabel: "WhatsApp +91 90443 46292",
  },
  quickAnswer: {
    heading: "Quick Answer: Medical Treatment in India for Beninese Patients",
    yes: "Beninese patients can travel to India for specialised medical treatment, including cancer treatment, cardiac care, neurosurgery, orthopaedic surgery, urology, gastrointestinal treatment, IVF, paediatric care and selected transplant procedures.",
    visaNote:
      "Benin is not currently shown on India's official e-Visa fee list. Beninese patients should apply for a regular Medical Visa through the High Commission of India in Abuja, which is concurrently accredited to Benin, rather than assuming that an e-Medical Visa is available.",
    begin:
      "A typical medical journey is: Medical Reports → Indian Specialist Opinion → Hospital Selection → Treatment Plan → Cost Estimate → Medical Visa → Travel → Hospital Evaluation → Treatment → Recovery → Follow-Up.",
    records:
      "For most patients, the process should begin with the medical records rather than immediately booking a flight.",
    opinion:
      "Patients and their families need to understand the diagnosis, identify the appropriate specialist, compare treatment options, obtain a realistic hospital estimate, arrange the Indian Medical Visa, plan travel from Benin and understand how treatment and follow-up will be coordinated.",
    confirm:
      "The final diagnosis and treatment plan must be confirmed by the treating medical team after appropriate clinical evaluation.",
    language:
      "French is the official language of Benin. Ask the receiving hospital whether French-language assistance can be arranged and which reports need accurate English translation.",
  },
  why: {
    heading: "Why Do Beninese Patients Consider Medical Treatment in India?",
    intro:
      "Patients may consider treatment abroad when they need specialist expertise, a second medical opinion, complex surgery or access to multidisciplinary care. The decision should be based on the patient's medical needs rather than simply choosing a country because it appears prominently online.",
    points: [
      "Cancer treatment, cardiology, cardiac surgery, neurosurgery and spine surgery",
      "Orthopaedic surgery, joint replacement, urology and gastrointestinal or hepatobiliary surgery",
      "Kidney treatment, fertility and IVF, paediatric specialist care and selected transplant procedures",
      "Complex diagnostic evaluation and second medical opinions",
      "Medical records can be reviewed before travel so the family understands the proposed pathway and indicative cost",
    ],
    close:
      "India should not be considered automatically suitable for every patient. The right destination depends on the diagnosis, treatment requirement, urgency, hospital capability and the patient's individual circumstances.",
  },
  relationship: {
    heading: "India–Benin Healthcare Cooperation",
    paragraphs: [
      "India and Benin have friendly ties and a documented development and healthcare relationship. India’s Ministry of External Affairs records that pharmaceutical products are among India’s major exports to Benin, and that India has emerged as Benin’s largest trading partner, with two-way trade of US$ 1.3 billion in 2024–25.",
      "President Ram Nath Kovind paid a State visit to Benin on 28–30 July 2019. During that visit, India and Benin signed an MoU on tele-medicine and tele-education. The official brief records that Benin is part of the Pan-African e-Network project and that an e-VBAB (tele-education and tele-medicine) MoU was signed with TCIL. The same visit included a US$ 100 million soft line of credit and an announcement that Benin would be included in India’s e-visa regime. Benin is not currently shown on the official e-Visa fee list, so patients should follow the live visa rules rather than that 2019 announcement.",
      "During COVID-19, India donated a six-tonne consignment of essential medicines, including HCQS and antibiotics, to Benin in July 2020, and sent 144,000 doses of Covishield vaccine from the Serum Institute of India on 10 March 2021 under the COVAX scheme of GAVI. These initiatives are examples of bilateral health cooperation and should not be interpreted as a guarantee of any particular treatment outcome.",
      "India does not have a resident diplomatic mission in Benin. The High Commissioner of India to Nigeria is concurrently accredited as Ambassador to Benin. The Government of India has appointed an Honorary Consul in Cotonou. For an individual patient, bilateral relations are only background. Treatment decisions remain dependent on the diagnosis and the hospital's medical assessment.",
    ],
  },
  context: {
    heading: "Healthcare Needs and Planning from Benin",
    intro:
      "Benin has its own hospitals and specialists. WHO country information identifies strengthening health services, addressing communicable and noncommunicable diseases, developing the health workforce and improving access to health products as important areas. International treatment becomes relevant when a patient needs a particular specialist, advanced procedure, complex surgery, specialised diagnostics, multidisciplinary care or another service that is not readily available locally.",
    points: [
      "Telemedicine cooperation under e-VBAB provides a documented connection between Benin and Indian healthcare expertise. A pre-travel specialist review can still begin from existing medical records.",
      "French is the official language of Benin, while English is commonly used in India's international-patient environment. Confirm interpretation and translation needs before travel.",
      "Most international medical journeys begin at Cotonou Cadjehoun Airport. Patients travelling from Porto-Novo, Abomey-Calavi, Parakou, Abomey, Djougou, Bohicon, Natitingou or Ouidah may first need to reach Cotonou.",
      "Patients should always provide their current medication list to the treating Indian specialist and should not independently change medicines because an equivalent-looking product is available.",
    ],
    close:
      "Country-level health indicators do not determine an individual's medical needs. The relevant question is: what is the patient's diagnosis, what treatment is appropriate, and can the patient safely travel for that treatment?",
  },
  overview: {
    heading: "What Medical Treatments Can Beninese Patients Get in India?",
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
    heading: "Popular Medical Treatments for Beninese Patients in India",
    intro:
      "Each card links only to a live GAF specialty or treatment page. Where GAF does not yet publish a dedicated page, the category is explained without an invented URL.",
    categories: [
      {
        title: "Cancer Treatment",
        body: "Medical, surgical and radiation oncology, including breast, prostate, cervical and colorectal pathways that already have GAF guides. Liver and stomach cancers are coordinated after records review because dedicated pages are not yet published.",
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
        body: "Beninese couples may explore IVF, ICSI, IUI and related fertility evaluation in India. GAF does not yet publish a dedicated IVF page. Eligibility, laboratory procedures and applicable Indian regulations should be confirmed with the treating fertility centre before travel.",
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
    heading: "Cancer Treatment in India for Beninese Patients",
    intro:
      "Cancer is an important area of specialist medical care. According to the IARC GLOBOCAN 2024 Benin fact sheet, the country had an estimated 9,193 new cancer cases, 5,818 cancer deaths and 16,121 five-year prevalent cases. These are GLOBOCAN 2024 estimates, not current 2026 case counts, and they should not be interpreted as an indication that every Beninese cancer patient requires treatment abroad.",
    body: "The same official fact sheet ranks breast first among estimated new cases in both sexes (2,040; 22.2%), followed by prostate (1,850; 20.1%), cervix uteri (714; 7.8%), colorectum (622; 6.8%) and liver (561; 6.1%). Among Beninese women, breast cancer was the leading site (2,040; 41.8%), followed by cervix. Among Beninese men, prostate cancer was the leading site (1,850; 43.0%), followed by liver and colorectum. GAF does not yet publish dedicated liver-cancer or stomach-cancer pages; those cases are coordinated through the relevant oncology or hepatobiliary team after records review.",
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
    heading: "How Much Does Medical Treatment in India Cost for Beninese Patients?",
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
    heading: "Which Indian Cities Can Beninese Patients Consider?",
    intro:
      "India has several major healthcare centres. The appropriate city should be selected according to the patient's medical requirement. There is no single Indian city that is appropriate for every Beninese patient.",
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
    heading: "How Should Beninese Patients Choose an Indian Hospital?",
    intro:
      "Start with the diagnosis. Ask whether the hospital treats the specific disease, whether the required specialty and surgeon or oncologist are available, whether ICU and advanced diagnostics are in place, whether international-patient services exist, whether the quotation is transparent, and what follow-up arrangements are available. The campuses below are drawn from GAF’s live India catalogue, one from each published city.",
    directoryLabel: "Browse hospitals in India",
  },
  doctors: {
    heading: "How Should Beninese Patients Choose the Right Doctor?",
    intro:
      "The appropriate specialist depends on the patient's condition. A breast-cancer patient may need a breast or surgical oncologist, a medical oncologist and a radiation oncologist. The doctor should review the patient's actual medical records before recommending treatment. The specialists below are taken from GAF’s live doctor catalogue.",
    directoryLabel: "Browse doctors in India",
  },
  visa: {
    heading: "Medical Visa for Beninese Patients Travelling to India",
    intro:
      "Benin is not currently shown on the Government of India's official e-Visa fee list. Although President Kovind announced Benin’s inclusion in India’s e-visa regime during the July 2019 State visit, patients should follow the current official list. Beninese patients should apply for a regular Medical Visa through the High Commission of India in Abuja, which is concurrently accredited to Benin.",
    points: [
      "India does not have a resident diplomatic mission in Benin. Visa applications are handled by the High Commission of India in Abuja. An Honorary Consul is appointed in Cotonou, but e-Visa and mission visa processing are not the same service.",
      "Applications are submitted through the Government of India's regular visa portal. Applicants should select the High Commission of India in Abuja as the Indian mission before completing the form.",
      "The High Commission’s Medical Visa notes ask for a local hospital referral and a typed Indian hospital invitation specifying the treatment and the intended dates. The Indian hospital is generally asked to email the invitation to the published consular address.",
      "A family member or other eligible attendant may need a separate Medical Attendant Visa. Confirm the current attendant rules with the High Commission before applying.",
      "Do not rely on an old medical-tourism article or an unofficial visa website. Verify the current official visa portal and the High Commission of India in Abuja before applying or travelling.",
    ],
    disclaimer:
      "Visa rules, fees, documents and entry regulations can change. Verify the current official Indian visa portal and the High Commission of India in Abuja immediately before applying or travelling.",
    documentsHeading: "Documents for an Indian Medical Visa from Benin",
    documents: [
      "Passport with at least six months’ validity and two blank pages",
      "Printed, signed online visa application and recent photographs as currently specified by the mission",
      "Local hospital or doctor referral from Benin",
      "Indian hospital letter or invitation specifying the proposed treatment and intended dates",
      "Yellow-fever vaccination certificate",
      "Financial or sponsor documents where the mission currently requires them",
      "Attendant passports and relationship documents where a family member will travel",
    ],
    documentsNote:
      "Patients should determine the current HCI Abuja checklist rather than submitting documents based on an outdated third-party list or on Nigeria-specific fee notes.",
  },
  yellowFever: {
    heading: "Yellow Fever Requirements for Beninese Travellers",
    intro:
      "Benin is listed by India’s Ministry of Health among yellow-fever endemic countries for entry screening. Travellers arriving from yellow-fever endemic countries must carry a valid yellow-fever vaccination certificate issued by an authorised centre.",
    points: [
      "India’s IHR points-of-entry guidance requires a valid yellow-fever vaccination certificate for travellers arriving from endemic countries.",
      "Address vaccination documents early. An avoidable documentation issue at the border can complicate a planned medical journey.",
      "Confirm any additional health-entry requirements with the High Commission of India in Abuja and the Bureau of Immigration before travel. Do not assume that rules published for neighbouring countries automatically apply to Benin.",
    ],
    close:
      "Confirm the current requirement on the official Indian visa portal, the Bureau of Immigration and the High Commission of India in Abuja before travel.",
  },
  travel: {
    heading: "Travelling from Benin to India for Medical Treatment",
    intro:
      "For most international medical journeys from Benin, Cotonou is the principal starting point. The main international airport is Cotonou Cadjehoun Airport. Patients travelling from other parts of Benin may first need to reach Cotonou.",
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
    heading: "Documents Beninese Patients Should Prepare",
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
      "French is the official language of Benin. Many Indian hospitals operate primarily in English. Before travelling, confirm whether French-language assistance or an interpreter can be arranged, whether medical reports require translation, and whether consent information and discharge instructions can be clearly understood.",
  },
  stay: {
    heading: "How Long Will a Beninese Patient Need to Stay in India?",
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
      "If you are considering treatment in India, begin with your medical records rather than your flight booking. A records-first sequence allows many questions to be addressed before leaving Cotonou.",
    steps: [
      { title: "Share medical records", body: "Send the relevant reports and a concise medical history." },
      { title: "Get an Indian specialist opinion", body: "The appropriate specialist reviews the available records. A remote opinion does not replace an in-person examination." },
      { title: "Understand treatment options", body: "Discuss the proposed treatment, alternatives and expected timeline." },
      { title: "Select the hospital and doctor", body: "Choose according to the medical requirement." },
      { title: "Receive hospital confirmation", body: "The hospital confirms the consultation or treatment pathway." },
      { title: "Obtain a cost estimate", body: "Request a written estimate showing major inclusions and exclusions." },
      { title: "Apply for the Indian Medical Visa", body: "Use the current official regular-visa process through the High Commission of India in Abuja." },
      { title: "Arrange travel", body: "Plan flights, accommodation and local transportation around the confirmed hospital schedule." },
      { title: "Arrive in India", body: "Proceed to the hospital for consultation and evaluation." },
      { title: "Complete investigations and begin treatment", body: "The treating team may repeat or update diagnostic tests before confirming the final plan." },
      { title: "Recovery and discharge", body: "The hospital provides medication and follow-up instructions." },
      { title: "Return to Benin and continue follow-up", body: "Travel home when medically fit and maintain follow-up with the Indian treating team and local healthcare professionals." },
    ],
  },
  help: {
    heading: "How GAF Healthcare Can Support Beninese Patients",
    intro:
      "GAF Healthcare can coordinate the medical journey between Benin and India. The exact services available should be confirmed before travel. Medical decisions remain with the patient and treating medical professionals.",
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
    heading: "Can Beninese Patients Get a Second Medical Opinion from India?",
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
      "What happens after returning to Benin?",
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
      q: "Can Beninese patients travel to India for medical treatment?",
      a: "Yes. Beninese citizens can travel to India for medical treatment subject to India's current visa and immigration requirements.",
    },
    {
      q: "Can Beninese citizens apply for an Indian e-Medical Visa?",
      a: "Not on the current official list. Benin is not shown on the Government of India's official e-Visa fee list. Beninese patients should apply for a regular Medical Visa through the High Commission of India in Abuja, which is concurrently accredited to Benin.",
    },
    {
      q: "Did India announce e-Visa for Benin?",
      a: "President Kovind announced Benin’s inclusion in India’s e-visa regime during the July 2019 State visit. The current official e-Visa fee list still does not include Benin. Patients should follow the live official list rather than the 2019 announcement.",
    },
    {
      q: "Where do Beninese patients apply for an Indian Medical Visa?",
      a: "India does not have a resident diplomatic mission in Benin. Applications are handled by the High Commission of India in Abuja. Apply through the official regular visa portal and select HCI Abuja as the mission.",
    },
    {
      q: "Can a family member accompany a Beninese patient?",
      a: "A family member or other eligible attendant may apply for a Medical Attendant Visa through the same mission. Confirm the current attendant rules and documents with the High Commission of India in Abuja before applying.",
    },
    {
      q: "Which cancers are common in Benin?",
      a: "GLOBOCAN 2024 identifies breast, prostate and cervical cancer as the three leading cancers by estimated new cases among both sexes in Benin, followed by colorectal and liver cancer. These are population-level estimates, not an individual diagnosis.",
    },
    {
      q: "What cancer treatments are available in India?",
      a: "Depending on the diagnosis, treatment may include surgery, chemotherapy, radiation therapy, immunotherapy, targeted therapy, hormone therapy and multidisciplinary oncology care.",
    },
    {
      q: "How much does medical treatment in India cost for Beninese patients?",
      a: "There is no single price. Cost depends on the diagnosis, stage, treatment, hospital, doctor, medicines, implants, investigations, ICU requirements and length of stay.",
    },
    {
      q: "Can a Beninese patient get a medical second opinion from India?",
      a: "Yes. Relevant medical records can be shared with an Indian specialist for preliminary review before deciding whether to travel.",
    },
    {
      q: "Can I get a cost estimate before travelling?",
      a: "Yes. An initial estimate can often be requested using medical records. The final treatment plan and quotation may change after examination and investigations in India.",
    },
    {
      q: "Can French-speaking Beninese patients receive communication support?",
      a: "French is the official language of Benin. Patients should confirm French interpretation and communication arrangements with the hospital and patient coordinator before travelling.",
    },
    {
      q: "How long does treatment in India take?",
      a: "The duration depends on the treatment. Surgery, chemotherapy, radiation therapy, transplantation and rehabilitation can require very different lengths of stay.",
    },
    {
      q: "Can GAF Healthcare help Beninese patients?",
      a: "GAF Healthcare can coordinate specialist opinions, hospital options, treatment estimates, appointments and medical-travel logistics for eligible international patients.",
    },
    {
      q: "Where does the journey from Benin usually begin?",
      a: "Cotonou Cadjehoun Airport is Benin's principal international gateway. Patients travelling from Porto-Novo, Parakou, Abomey-Calavi or other cities may first travel to Cotonou.",
    },
    {
      q: "Do Beninese patients need a yellow fever vaccination certificate?",
      a: "Benin is listed by India’s Ministry of Health among yellow-fever endemic countries. Travellers arriving from endemic countries must carry a valid yellow-fever vaccination certificate issued by an authorised centre. Confirm the live official notes before travel.",
    },
    {
      q: "Which Indian cities can Beninese patients consider?",
      a: "Delhi NCR, Mumbai, Chennai, Hyderabad and Bengaluru are live GAF catalogue cities. Pune can also be considered, but this page does not link to a Pune directory because that city is not yet in the live catalogue.",
    },
    {
      q: "Is India right for every Beninese patient?",
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
      q: "Should I book my flight before receiving the hospital's opinion?",
      a: "For major treatment, it is generally better to obtain the medical opinion, hospital schedule and Medical Visa first. This allows the travel plan to be built around the medical schedule.",
    },
  ],
  finalCta: {
    heading: "Start Your Medical Treatment Journey from Benin to India",
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
        href: BENIN_OFFICIAL_LINKS.eVisa,
        detail: "Current e-Visa categories. Use this portal only to confirm live eligibility; Benin is not on the current fee list.",
      },
      {
        label: "Government of India — Country/territory-wise e-Visa fee list",
        href: BENIN_OFFICIAL_LINKS.eVisaFees,
        detail: "Official fee table used as the eligibility gate. Benin is not currently listed.",
      },
      {
        label: "Government of India — Indian Visa Online",
        href: BENIN_OFFICIAL_LINKS.visaOnline,
        detail: "Regular Medical Visa application portal. Beninese applicants should select the High Commission of India in Abuja.",
      },
      {
        label: "High Commission of India, Abuja — Visa services",
        href: BENIN_OFFICIAL_LINKS.hciVisa,
        detail: "Mission visa services for the High Commission concurrently accredited to Benin.",
      },
      {
        label: "High Commission of India, Abuja — Medical Visa notes",
        href: BENIN_OFFICIAL_LINKS.hciMedical,
        detail: "Published Medical Visa documentation notes used by the accredited mission.",
      },
      {
        label: "High Commission of India, Abuja — Republic of Benin",
        href: BENIN_OFFICIAL_LINKS.hciBenin,
        detail: "Honorary Consul details in Cotonou and concurrent accreditation from Abuja.",
      },
      {
        label: "Ministry of External Affairs, India — India–Benin bilateral brief, April 2026",
        href: BENIN_OFFICIAL_LINKS.meaBrief,
        detail: "e-VBAB tele-medicine MoU, July 2019 State visit, six-tonne medicine donation in July 2020, 144,000 Covishield doses on 10 March 2021, and the absence of a resident Indian mission in Benin.",
      },
      {
        label: "IARC / WHO — GLOBOCAN 2024 Benin fact sheet",
        href: BENIN_OFFICIAL_LINKS.globocan,
        detail: "Estimated 9,193 new cases, 5,818 deaths and 16,121 five-year prevalent cases, with breast, prostate, cervix, colorectum and liver as leading sites.",
      },
      {
        label: "WHO — Benin health data overview",
        href: BENIN_OFFICIAL_LINKS.whoData,
        detail: "Country-level WHO health information, including NCD indicators.",
      },
      {
        label: "Ministry of Health and Family Welfare, India — IHR yellow-fever vaccination",
        href: BENIN_OFFICIAL_LINKS.mohfwYellowFever,
        detail: "India’s yellow-fever endemic-country list and certificate requirements.",
      },
      {
        label: "Government of India — Bureau of Immigration",
        href: BENIN_OFFICIAL_LINKS.boi,
        detail: "Entry and immigration instructions for travellers arriving in India.",
      },
    ],
  },
};
