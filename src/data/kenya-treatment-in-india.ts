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

export const KENYA_PAGE_PATH = "/kenya/treatment-in-india";
export const KENYA_PAGE_LOCALES = ["en"] as const;
export const KENYA_LAST_REVIEWED = "2026-10-03";

export type KenyaPageCopy = typeof kenyaPageCopyEn;

export function kenyaPageCopy(_locale: AppLocale): KenyaPageCopy {
  return kenyaPageCopyEn;
}

const INDIA = "India";

export const KENYA_OFFICIAL_LINKS = {
  eVisa: "https://indianvisaonline.gov.in/evisa/tvoa.html",
  eVisaHome: "https://indianvisaonline.gov.in/evisa/",
  eVisaFees: "https://indianvisaonline.gov.in/evisa/eTV_revised_fee_final.pdf",
  visaOnline: "https://indianvisaonline.gov.in/visa/",
  hci: "https://www.hcinairobi.gov.in/",
  hciTypes: "https://hcinairobi.gov.in/Visa_Types",
  hciFees: "https://hcinairobi.gov.in/eoinrb_pages/MTkx",
  hciYellowFever: "https://www.hcinairobi.gov.in/eoinrb_pages/MTg4",
  meaBrief: "https://www.mea.gov.in/Portal/ForeignRelation/India-Kenya-April-2026.pdf",
  meaBriefOlder: "https://www.mea.gov.in/Portal/ForeignRelation/Kenya.pdf",
  globocan: "https://gco.iarc.who.int/media/globocan/factsheets/populations/404-kenya-fact-sheet.pdf",
  iarcToday: "https://gco.iarc.who.int/today/en/fact-sheets-populations",
  whoData: "https://data.who.int/countries/404",
  mohfwYellowFever: "https://ihpoe.mohfw.gov.in/vaccination.php",
  boi: "https://boi.gov.in",
} as const;

export const KENYA_CURATED_TREATMENT_SLUGS = [
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

export const KENYA_CANCER_TREATMENT_SLUGS = TANZANIA_CANCER_TREATMENT_SLUGS;

export const KENYA_COST_PROCEDURE_NAMES = [
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

export const KENYA_DOCTOR_SPECIALTY_SLUGS = [
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

export function resolveKenyaCostRows(catalog: Treatment[]) {
  return KENYA_COST_PROCEDURE_NAMES.map((name) => {
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

export function kenyaDoctors(doctors: Doctor[]) {
  return KENYA_DOCTOR_SPECIALTY_SLUGS.map((specialtySlug) => {
    const pool = doctors.filter((doctor) => doctor.specialtySlug === specialtySlug);
    const featured = pool.find((doctor) => doctor.featured);
    return featured ?? [...pool].sort((a, b) => a.name.localeCompare(b.name))[0];
  }).filter((row): row is Doctor => Boolean(row));
}

export const kenyaPageCopyEn = {
  seo: {
    title: "Medical Treatment in India for Kenyan Patients",
    description:
      "Explore medical treatment in India for Kenyan patients. Find specialist doctors, hospitals, treatments, indicative costs, e-Medical Visa guidance and support from GAF Healthcare.",
    keywords: [
      "medical treatment in India for Kenyan patients",
      "medical treatment in India from Kenya",
      "treatment in India for Kenyan patients",
      "medical tourism from Kenya to India",
      "Indian hospitals for Kenyan patients",
      "Indian doctors for Kenyan patients",
      "medical treatment cost in India for Kenyan patients",
      "cancer treatment in India for Kenyan patients",
      "cardiac treatment in India for Kenyan patients",
      "e-Medical Visa India for Kenya",
      "medical visa India for Kenyan citizens",
      "treatment in India from Nairobi",
      "treatment in India from Kenya",
    ],
  },
  breadcrumb: {
    home: "Home",
    kenya: "Kenya",
    page: "Treatment in India",
  },
  hero: {
    eyebrow: "Medical treatment in India for Kenyan patients",
    h1: "Medical Treatment in India for Kenyan Patients",
    lede:
      "If you are looking for medical treatment in India from Kenya, GAF Healthcare helps patients and families navigate the journey from medical report review and specialist consultation to hospital selection, treatment estimates, appointments, medical visa guidance and travel coordination.",
    primaryCta: "Get a Medical Opinion",
    secondaryCta: "Explore Treatments",
    whatsappLabel: "WhatsApp +91 90443 46292",
  },
  quickAnswer: {
    heading: "Quick Answer: Medical Treatment in India for Kenyan Patients",
    items: [
      {
        question: "Can Kenyan patients travel to India for medical treatment?",
        answer:
          "Yes. Kenyan citizens can travel to India for medical treatment, subject to the applicable Indian visa and immigration requirements.",
      },
      {
        question: "Can Kenyan citizens get an Indian e-Medical Visa?",
        answer:
          "Yes. Kenya is currently included among the countries eligible for India's e-Visa system, and medical treatment is one of the permitted purposes of the e-Visa program.",
      },
      {
        question: "What treatments can Kenyan patients receive in India?",
        answer:
          "Patients may seek treatment for cancer, heart disease, neurosurgical conditions, orthopedic problems, urological conditions, gastrointestinal disorders, fertility issues, transplantation and many other specialist conditions.",
      },
      {
        question: "How much does treatment in India cost?",
        answer:
          "There is no single price. Treatment costs depend on the diagnosis, procedure, hospital, specialist, medicines, implants, investigations, length of stay and clinical complexity.",
      },
      {
        question: "Can I get a medical opinion before travelling?",
        answer:
          "Yes. Patients can begin by sharing their available medical records and diagnostic reports for review by an appropriate Indian specialist or hospital.",
      },
      {
        question: "How can GAF Healthcare help?",
        answer:
          "GAF Healthcare can coordinate medical records, specialist and hospital options, treatment estimates, appointments and aspects of the medical travel journey.",
      },
    ],
  },
  why: {
    heading: "Why Kenyan Patients Consider Medical Treatment in India",
    intro:
      "India has become an important destination for Kenyan patients seeking specialised and complex medical care. India's Ministry of External Affairs identifies healthcare as an important area of India–Kenya cooperation and states that many Kenyans travel to India for treatment of critical ailments. A current MEA country brief also notes that India is understood to account for a major share of Kenya's international medical travel.",
    points: [
      "Patients may consider travelling to India when they need a particular specialist, complex surgery, advanced cancer treatment, a second opinion or multidisciplinary care",
      "India has developed a large tertiary and super-specialty healthcare ecosystem covering oncology, cardiac sciences, neurosciences, orthopedics, transplantation, urology, gastroenterology, fertility and complex surgery",
      "India also has a dedicated medical-value-travel framework and an e-Visa system that includes e-Medical and e-Medical Attendant categories for eligible international travellers",
      "Medical records can be reviewed before travel so the family understands the proposed pathway and indicative cost",
      "English is widely used in Indian hospitals, including for medical records and specialist consultations",
      "The right decision depends on the individual medical condition. Hospital selection should start from the diagnosis and medical records rather than from a hospital brand alone",
    ],
    close:
      "India should not be considered automatically suitable for every patient. The right destination depends on the diagnosis, treatment requirement, urgency, hospital capability and the patient's individual circumstances.",
  },
  relationship: {
    heading: "India–Kenya Healthcare Relationship",
    paragraphs: [
      "India and Kenya have a long-standing relationship that includes healthcare cooperation. India's Ministry of External Affairs describes health as an important area of bilateral cooperation. Official briefs record that many Kenyan patients travel to India for treatment of critical ailments, and a current MEA country brief states that India is understood to account for about 90% of Kenya's international medical travel.",
      "India's support to Kenya has included medical equipment, medicines and healthcare-related initiatives. During Prime Minister Narendra Modi's visit to Kenya on 10–11 July 2016, India announced 30 field ambulances and a Bhabhatron II cancer therapy machine for Kenyatta National Hospital in Nairobi. The official record notes that President Uhuru Kenyatta later commissioned the Bhabhatron II machine and a digital radiotherapy simulator at the hospital.",
      "The High Commission of India in Nairobi was established after Kenya's independence in December 1963. For an individual patient, however, bilateral relations are only background. Treatment decisions remain dependent on the patient's diagnosis and the hospital's medical assessment.",
    ],
  },
  context: {
    heading: "Medical Treatment in India for Patients from Kenya",
    intro:
      "Kenya has its own hospitals and specialists. International treatment becomes relevant when a patient needs a particular specialist, advanced procedure, complex surgery, specialised diagnostics, multidisciplinary care or another service that is not readily available locally.",
    points: [
      "The India–Kenya healthcare relationship can make Indian hospitals a familiar option, but the hospital still has to match the diagnosis.",
      "English is widely used in Indian hospitals, which can make communication more straightforward for many Kenyan patients.",
      "Most international medical journeys from Kenya begin at Jomo Kenyatta International Airport in Nairobi.",
    ],
    close:
      "The important questions remain: is the relevant specialist available, does the hospital treat this condition, what treatment is being proposed, what is included in the estimate, how long will the patient need to stay, and how will follow-up be managed after returning to Kenya?",
  },
  overview: {
    heading: "What Medical Treatments Can Kenyan Patients Get in India?",
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
    heading: "Popular Treatment Categories for Kenyan Patients",
    intro:
      "Each card links only to a live GAF specialty or treatment page. Where GAF does not yet publish a dedicated page, the category is explained without an invented URL.",
    categories: [
      {
        title: "Cancer Treatment",
        body: "Medical, surgical and radiation oncology, including breast, cervical, prostate and colorectal pathways that already have GAF guides. Oesophageal cancer is coordinated after records review because a dedicated page is not yet published.",
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
        body: "Kenyan couples may explore IVF, ICSI, IUI, frozen embryo transfer and related fertility evaluation in India. GAF does not yet publish a dedicated IVF page. Eligibility, laboratory procedures and applicable Indian regulations should be confirmed with the treating fertility centre before travel.",
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
          { label: "Oesophageal Cancer", href: "" },
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
    heading: "Cancer Treatment in India for Kenyan Patients",
    intro:
      "Cancer treatment is one of the areas where patients may need several specialists working together. According to the IARC GLOBOCAN 2024 Kenya fact sheet, the country had an estimated 35,867 new cancer cases, 22,888 cancer deaths and 76,165 five-year prevalent cases. These are GLOBOCAN 2024 estimates, not current 2026 case counts, and they should not be interpreted as an indication that every Kenyan cancer patient requires treatment abroad.",
    body: "The same official fact sheet ranks breast first among estimated new cases in both sexes (5,822; 16.2%), followed by cervix uteri (4,294; 12.0%), prostate (3,601; 10.0%), oesophagus (2,532; 7.1%) and colorectum (2,525; 7.0%). Among Kenyan women, breast cancer was the leading site (5,822; 26.5%), followed by cervix, colorectum, oesophagus and ovary. Among Kenyan men, prostate cancer was the leading site (3,601; 25.9%), followed by oesophagus, colorectum, stomach and leukaemia. Estimated deaths were led by breast (2,882), cervix (2,606), oesophagus (2,353), prostate (2,199) and colorectum (1,481). GAF does not yet publish a dedicated oesophageal-cancer page; those cases are coordinated through the relevant oncology or gastrointestinal team after records review.",
    modalities: [
      { label: "Breast Cancer", href: "/treatments/breast-cancer-treatment-in-india" },
      { label: "Cervical Cancer", href: "/treatments/cervical-cancer-treatment-in-india" },
      { label: "Prostate Cancer", href: "/treatments/prostate-cancer-treatment-in-india" },
      { label: "Colon Cancer", href: "/treatments/colon-cancer-treatment-in-india" },
      { label: "Ovarian Cancer", href: "/treatments/ovarian-cancer-treatment-in-india" },
      { label: "Pancreatic Cancer", href: "/treatments/pancreatic-cancer-treatment-in-india" },
      { label: "Lymphoma", href: "/treatments/lymphoma-treatment-in-india" },
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
    heading: "How Much Does Medical Treatment in India Cost for Kenyan Patients?",
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
    heading: "Major Indian Cities for Kenyan Patients",
    intro:
      "India's specialist healthcare infrastructure is distributed across several major cities. The right destination depends on the diagnosis, specialist, hospital and treatment requirement. There is no single Indian city that is appropriate for every Kenyan patient.",
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
    heading: "Hospitals in India for Kenyan Patients",
    intro:
      "Hospital selection should begin with the patient's medical requirement. Important factors include the relevant specialty and subspecialty, experience with the required procedure, diagnostic and surgical facilities, ICU support, multidisciplinary services, an international-patient department, expected treatment duration, estimated cost and follow-up arrangements. The campuses below are drawn from GAF’s live India catalogue, one from each published city.",
    directoryLabel: "Browse hospitals in India",
  },
  doctors: {
    heading: "Specialist Doctors in India for Kenyan Patients",
    intro:
      "The appropriate specialist should match the patient's diagnosis and treatment requirement. A cancer patient may need a surgical oncologist, a medical oncologist and a radiation oncologist. A patient with coronary artery disease may need assessment by a cardiologist, an interventional cardiologist or a cardiac surgeon. The specialists below are taken from GAF’s live doctor catalogue.",
    directoryLabel: "Browse doctors in India",
  },
  visa: {
    heading: "Medical Visa for Kenyan Patients Travelling to India",
    intro:
      "Kenyan citizens are currently eligible for India's e-Visa system. The official Government of India e-Visa portal includes Kenya among the eligible nationalities and permits e-Medical Visas for eligible applicants travelling to India for medical treatment. The official country/territory-wise fee list currently shows Kenya among e-Visa nationalities, with the e-Medical and e-Medical Attendant categories listed at US$80. A bank charge is stated on the official portal.",
    points: [
      "The system also provides an e-Medical Attendant Visa for eligible accompanying persons. The current official guidance states that up to two e-Medical Attendant Visas may be granted against one e-Medical Visa.",
      "Eligible applicants can apply online. Applications for e-Medical and e-Medical Attendant visas can be submitted at least four days before arrival, with an application window extending up to 120 days before the intended arrival date.",
      "The passport should have at least six months' validity at the time of application and at least two blank pages. A recent passport photograph and passport bio page are required.",
      "For an e-Medical Visa, the Government of India's published requirements include a hospital letter on Indian hospital letterhead with a tentative admission or treatment date, together with the other information required by the application process.",
      "A regular Medical Visa remains available through the High Commission of India in Nairobi. The Mission currently states that e-Visa applications are not processed by the High Commission. Its published Medical Visa notes include a signed printed online form, the applicant's presence in person, two 51 × 51 mm photographs on a white background, an Indian hospital letter emailed to visa.nairobi@mea.gov.in covering the patient and attendant names, passport numbers, illness, duration and estimated cost, local referral or medical documents emailed to the same address, a three-month bank statement or other proof of funds, attendant relationship documents, and a Medical Visa undertaking. Follow-up travel may require prior Indian discharge papers.",
      "The High Commission currently publishes Medical and Medical Attendant visa fees of US$80 (Ksh 10,320) for a stay of up to six months, and US$120 (Ksh 15,480) for a stay of more than six months up to one year. Visa rules and fees can change.",
    ],
    disclaimer:
      "Visa rules can change. Kenyan patients should always verify the latest requirements, eligibility, fees, permitted stay and documentation through the official Government of India e-Visa portal and the High Commission of India in Nairobi before applying or travelling.",
    documentsHeading: "e-Medical Visa and regular Medical Visa documents",
    documents: [
      "Passport with at least six months’ validity and two blank pages",
      "Recent photograph and passport bio page",
      "Indian hospital letter with tentative admission or treatment date for an e-Medical Visa",
      "For the regular Medical Visa: signed printed online form, two 51 × 51 mm photographs, Indian hospital letter and local medical documents emailed to visa.nairobi@mea.gov.in, three-month bank statement or proof of funds, attendant relationship documents and a Medical Visa undertaking, as currently published",
      "Yellow-fever vaccination certificate for travellers from Kenya",
      "Attendant passports and documents where a family member will travel",
    ],
    documentsNote:
      "Patients should determine which visa route applies to their circumstances rather than submitting documents based on an outdated third-party checklist.",
  },
  yellowFever: {
    heading: "Yellow Fever Requirements for Kenyan Travellers",
    intro:
      "The High Commission of India in Nairobi currently states that all travellers from Kenya need a yellow-fever vaccination certificate. The vaccine should be taken at least ten days before travel at a government-approved clinic.",
    points: [
      "India’s IHR points-of-entry guidance requires travellers arriving from yellow-fever endemic countries to carry a valid yellow-fever vaccination certificate issued by an authorised centre.",
      "The High Commission’s current Kenya-specific travel-health note requires yellow fever and does not require oral polio vaccine for travellers from Kenya. OPV requirements published for some neighbouring countries should not be assumed for Kenya.",
      "Address vaccination documents early. An avoidable documentation issue at the border can complicate a planned medical journey.",
    ],
    close:
      "Confirm the current requirement on the official Indian e-Visa portal, the Bureau of Immigration and the High Commission of India in Nairobi before travel.",
  },
  travel: {
    heading: "Travelling from Kenya to India for Medical Treatment",
    intro:
      "Nairobi is a major international gateway for Kenyan patients travelling abroad for healthcare. India's Ministry of External Affairs notes that international connectivity between Kenya and India includes routes through several major hubs. Travel arrangements should be planned around the hospital appointment date, expected admission date, medical-visa approval, expected treatment duration, recovery period and return-flight flexibility.",
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
    heading: "Documents Kenyan Patients Should Prepare",
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
    heading: "Accommodation, Food and Language for Kenyan Patients",
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
      "English is widely used in Indian hospitals, including for medical records and specialist consultations. Patients and families should nevertheless make sure they understand the diagnosis, proposed treatment, alternatives, benefits, risks, estimated cost, expected hospitalisation, recovery and follow-up. If interpretation is required, discuss this with the hospital or patient-coordination team before travelling.",
  },
  stay: {
    heading: "How Long Will a Kenyan Patient Need to Stay in India?",
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
    heading: "Medical Journey from Kenya to India",
    intro:
      "If you are considering treatment in India, begin with your medical records rather than your flight booking. A records-first sequence allows many questions to be addressed before leaving Nairobi.",
    steps: [
      { title: "Share medical reports", body: "Send existing medical records, scans, pathology and previous treatment information." },
      { title: "Specialist review", body: "The relevant Indian specialist reviews the available information. A remote opinion does not replace an in-person examination." },
      { title: "Understand treatment options", body: "The patient receives information about the proposed treatment pathway." },
      { title: "Hospital and cost estimate", body: "Hospital options and an indicative treatment estimate are discussed." },
      { title: "Confirm appointment", body: "The patient confirms the selected hospital and appointment." },
      { title: "Medical visa", body: "Eligible Kenyan citizens can apply through India's e-Medical Visa system or the regular Medical Visa through the High Commission in Nairobi." },
      { title: "Travel to India", body: "The patient and attendant travel according to the confirmed schedule." },
      { title: "Hospital assessment", body: "The treating team conducts the necessary in-person evaluation." },
      { title: "Treatment", body: "The patient receives the recommended treatment. The plan may change after physical examination or additional investigations." },
      { title: "Recovery and follow-up", body: "The hospital provides discharge instructions and follow-up recommendations." },
      { title: "Return to Kenya", body: "The patient returns when medically fit to travel and continues follow-up as advised." },
      { title: "Keep the records", body: "Carry complete discharge summaries, prescriptions and treatment records for any later review in Kenya or India." },
    ],
  },
  help: {
    heading: "How GAF Healthcare Helps Kenyan Patients",
    intro:
      "International treatment involves medical, logistical and financial decisions. GAF Healthcare can help coordinate the major stages of the journey. The exact services available should be confirmed with GAF Healthcare before travel.",
    before: [
      "Medical report collection and records review",
      "Specialist identification and hospital options",
      "Medical opinion coordination",
      "Treatment estimate coordination",
      "Appointment scheduling and medical-visa-document support",
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
      "Can follow-up information be shared with a doctor in Kenya?",
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
      "What does the hospital estimate include, how long might the patient need to remain in India, and what follow-up will be needed after returning to Kenya?",
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
      q: "Can Kenyan patients travel to India for medical treatment?",
      a: "Yes. Kenyan citizens can travel to India for medical treatment subject to India's current visa and immigration requirements.",
    },
    {
      q: "Can Kenyan citizens apply for an Indian e-Medical Visa?",
      a: "Yes. Kenya is currently listed among the nationalities eligible for India's e-Visa system, and the e-Medical Visa is available for eligible applicants travelling for medical treatment.",
    },
    {
      q: "How do I apply for an Indian medical visa from Kenya?",
      a: "Eligible Kenyan applicants can use the Government of India's official e-Visa system. The application requires the relevant passport information and, for e-Medical Visa applicants, a letter from the Indian hospital containing the proposed or tentative treatment or admission date. A regular Medical Visa remains available through the High Commission of India in Nairobi; the Mission currently states that it does not process e-Visa applications.",
    },
    {
      q: "Can a family member accompany a Kenyan patient?",
      a: "Eligible attendants can apply for an e-Medical Attendant Visa. The Government of India currently states that up to two e-Medical Attendant Visas may be granted against one e-Medical Visa.",
    },
    {
      q: "How much does medical treatment in India cost for Kenyan patients?",
      a: "Costs vary according to the diagnosis, procedure, hospital, specialist, medicines, implants, investigations and length of stay. A patient-specific hospital estimate is more useful than a generic internet price.",
    },
    {
      q: "Can I get a medical opinion before travelling?",
      a: "Yes. Patients can share their available medical reports and diagnostic information for preliminary specialist review.",
    },
    {
      q: "What treatments are available in India for Kenyan patients?",
      a: "Treatment is available across oncology, cardiology, cardiac surgery, neurosurgery, orthopedics, urology, gastroenterology, transplantation, fertility and many other specialties.",
    },
    {
      q: "Which Indian city should a Kenyan patient choose?",
      a: "There is no single city suitable for every patient. Delhi NCR, Mumbai, Chennai, Hyderabad, Bengaluru and Pune all have major hospitals. The appropriate city depends on the diagnosis, specialist and selected hospital. GAF’s live catalogue currently covers Delhi NCR, Mumbai, Chennai, Hyderabad and Bengaluru.",
    },
    {
      q: "Which hospitals can Kenyan patients consider?",
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
      q: "Can I continue follow-up after returning to Kenya?",
      a: "The treating hospital should provide a follow-up plan before discharge. Patients should retain all discharge summaries, prescriptions and treatment records for continued care in Kenya.",
    },
    {
      q: "Can I travel immediately after surgery?",
      a: "Not necessarily. The treating doctor should determine when the patient is medically fit to travel.",
    },
    {
      q: "Do Kenyan patients need a yellow fever vaccination certificate?",
      a: "The High Commission of India in Nairobi currently states that all travellers from Kenya need a yellow-fever vaccination certificate, with the vaccine taken at least ten days before travel at a government-approved clinic. Confirm the live official notes before travel.",
    },
    {
      q: "What passport validity is required for India's e-Visa?",
      a: "The official guidance states that the passport should have at least six months' validity at the time of application and at least two blank pages for immigration stamping.",
    },
    {
      q: "How early can Kenyan patients apply for India's e-Medical Visa?",
      a: "The current Government of India guidance says eligible applicants can apply at least four days before arrival, with an application window of up to 120 days before the intended arrival date.",
    },
    {
      q: "Where does the journey from Kenya usually begin?",
      a: "Jomo Kenyatta International Airport in Nairobi is Kenya's principal international gateway. Patients travelling from other parts of Kenya may first travel to Nairobi.",
    },
  ],
  finalCta: {
    heading: "Planning Medical Treatment in India from Kenya?",
    body: "Choosing treatment abroad can feel overwhelming, particularly when you are dealing with a serious diagnosis. You can begin with your medical records. GAF Healthcare can help Kenyan patients understand their treatment options, identify appropriate specialists and hospitals, coordinate treatment estimates and plan the journey to India.",
    primary: "Get a Medical Opinion",
    secondary: "Talk to a Medical Travel Expert",
    whatsappLabel: "WhatsApp +91 90443 46292",
    steps: "Share Your Medical Reports → Get a Specialist Opinion → Explore Hospital Options → Understand the Estimated Cost → Plan Your Journey to India",
  },
  disclaimer: {
    heading: "Medical Disclaimer",
    body: "The information on this page is provided for general educational and medical-travel planning purposes. It is not a diagnosis, medical prescription or substitute for consultation with a qualified healthcare professional. Treatment recommendations, risks, outcomes, duration and costs vary between patients. Final treatment decisions should be made by the treating medical team after evaluating the patient. Indicative costs are not hospital quotations. The final bill may differ because of investigations, medicines, implants, treatment changes, complications, ICU requirements and length of stay. Visa and immigration requirements can change. Kenyan patients should verify the latest requirements directly through the Government of India's official visa system before applying or travelling.",
  },
  sources: {
    heading: "Sources & Further Reading",
    items: [
      {
        label: "Government of India — Official e-Visa portal",
        href: KENYA_OFFICIAL_LINKS.eVisa,
        detail: "Current e-Visa eligibility, including Kenya, and e-Medical / e-Medical Attendant categories.",
      },
      {
        label: "Government of India — Country/territory-wise e-Visa fee list",
        href: KENYA_OFFICIAL_LINKS.eVisaFees,
        detail: "Official fee table confirming Kenya among e-Visa eligible countries, with e-Medical and e-Medical Attendant listed at US$80.",
      },
      {
        label: "Government of India — Indian Visa Online",
        href: KENYA_OFFICIAL_LINKS.visaOnline,
        detail: "Official visa application and eligibility information for routes other than e-Visa.",
      },
      {
        label: "High Commission of India, Nairobi — Visa types",
        href: KENYA_OFFICIAL_LINKS.hciTypes,
        detail: "Medical Visa purpose, supporting documents and the note that e-Visa is not processed by the Mission.",
      },
      {
        label: "High Commission of India, Nairobi — Visa fees",
        href: KENYA_OFFICIAL_LINKS.hciFees,
        detail: "Published Medical and Medical Attendant fees of US$80 / Ksh 10,320 up to six months and US$120 / Ksh 15,480 for more than six months up to one year.",
      },
      {
        label: "High Commission of India, Nairobi — Yellow fever",
        href: KENYA_OFFICIAL_LINKS.hciYellowFever,
        detail: "Current note that travellers from Kenya need a yellow-fever certificate, with vaccination at least ten days before travel.",
      },
      {
        label: "Ministry of External Affairs, India — India–Kenya bilateral relations, April 2026",
        href: KENYA_OFFICIAL_LINKS.meaBrief,
        detail: "Healthcare cooperation, travel by Kenyan patients for critical ailments, and the statement that India is understood to account for about 90% of Kenya's international medical travel, including Bhabhatron II support to Kenyatta National Hospital.",
      },
      {
        label: "Ministry of External Affairs, India — Kenya country brief",
        href: KENYA_OFFICIAL_LINKS.meaBriefOlder,
        detail: "Earlier official country brief on India–Kenya relations and healthcare cooperation.",
      },
      {
        label: "IARC / WHO — GLOBOCAN 2024 Kenya fact sheet",
        href: KENYA_OFFICIAL_LINKS.globocan,
        detail: "Estimated 35,867 new cases, 22,888 deaths and 76,165 five-year prevalent cases, with breast, cervix, prostate, oesophagus and colorectum as leading sites.",
      },
      {
        label: "IARC Global Cancer Observatory — Cancer Today",
        href: KENYA_OFFICIAL_LINKS.iarcToday,
        detail: "Current GLOBOCAN population fact sheets.",
      },
      {
        label: "WHO — Kenya health data overview",
        href: KENYA_OFFICIAL_LINKS.whoData,
        detail: "Country-level WHO health information, including NCD indicators.",
      },
      {
        label: "Ministry of Health and Family Welfare, India — IHR yellow-fever vaccination",
        href: KENYA_OFFICIAL_LINKS.mohfwYellowFever,
        detail: "India’s yellow-fever endemic-country list and certificate requirements.",
      },
      {
        label: "Government of India — Bureau of Immigration",
        href: KENYA_OFFICIAL_LINKS.boi,
        detail: "Entry and immigration instructions for travellers arriving in India.",
      },
    ],
  },
};
