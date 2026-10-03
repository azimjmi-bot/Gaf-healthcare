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

export const MOZAMBIQUE_PAGE_PATH = "/mozambique/treatment-in-india";
export const MOZAMBIQUE_PAGE_LOCALES = ["en"] as const;
export const MOZAMBIQUE_LAST_REVIEWED = "2026-10-03";

export type MozambiquePageCopy = typeof mozambiquePageCopyEn;

export function mozambiquePageCopy(_locale: AppLocale): MozambiquePageCopy {
  return mozambiquePageCopyEn;
}

const INDIA = "India";

export const MOZAMBIQUE_OFFICIAL_LINKS = {
  eVisa: "https://indianvisaonline.gov.in/evisa/tvoa.html",
  hciEvisa: "https://www.hcimaputo.gov.in/page/e-visa/",
  hciRegular: "https://www.hcimaputo.gov.in/page/regular-visas/",
  hciVisa: "https://www.hcimaputo.gov.in/page/visa/",
  hciGeneral: "https://www.hcimaputo.gov.in/page/general-information-on-visa/",
  hciRelations: "https://www.hcimaputo.gov.in/page/india-mozambique-relations/",
  hciJaipurCamp:
    "https://www.hcimaputo.gov.in/section/news/jaipur-foot-camp-felicitation-programme-on-4-august-2025/",
  meaBrief: "https://www.mea.gov.in/Portal/ForeignRelation/India-Mozambique-26.pdf",
  globocan: "https://gco.iarc.who.int/media/globocan/factsheets/populations/508-mozambique-fact-sheet.pdf",
  iarcToday: "https://gco.iarc.who.int/today/en/fact-sheets-populations",
  whoData: "https://data.who.int/countries/508",
  whoObservatory: "https://aho.afro.who.int/mz",
  whoCluster: "https://healthcluster.who.int/countries-and-regions/mozambique",
} as const;

export const MOZAMBIQUE_CURATED_TREATMENT_SLUGS = [
  "cervical-cancer-treatment-in-india",
  "breast-cancer-treatment-in-india",
  "colon-cancer-treatment-in-india",
  "prostate-cancer-treatment-in-india",
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

export const MOZAMBIQUE_CANCER_TREATMENT_SLUGS = TANZANIA_CANCER_TREATMENT_SLUGS;

export const MOZAMBIQUE_COST_PROCEDURE_NAMES = [
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

export const MOZAMBIQUE_DOCTOR_SPECIALTY_SLUGS = [
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

export function resolveMozambiqueCostRows(catalog: Treatment[]) {
  return MOZAMBIQUE_COST_PROCEDURE_NAMES.map((name) => {
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

export function mozambiqueDoctors(doctors: Doctor[]) {
  return MOZAMBIQUE_DOCTOR_SPECIALTY_SLUGS.map((specialtySlug) => {
    const pool = doctors.filter((doctor) => doctor.specialtySlug === specialtySlug);
    const featured = pool.find((doctor) => doctor.featured);
    return featured ?? [...pool].sort((a, b) => a.name.localeCompare(b.name))[0];
  }).filter((row): row is Doctor => Boolean(row));
}

export const mozambiquePageCopyEn = {
  seo: {
    title: "Medical Treatment in India for Mozambican Patients",
    description:
      "Explore medical treatment in India for Mozambican patients. Find specialist doctors, hospitals, treatments, indicative costs, e-Medical Visa guidance and support from GAF Healthcare.",
    keywords: [
      "medical treatment in India for Mozambican patients",
      "medical treatment in India from Mozambique",
      "treatment in India for Mozambican patients",
      "medical tourism from Mozambique to India",
      "Indian hospitals for Mozambican patients",
      "Indian doctors for Mozambican patients",
      "medical treatment cost in India for Mozambican patients",
      "cancer treatment in India for Mozambican patients",
      "cardiac treatment in India for Mozambican patients",
      "medical visa India for Mozambican citizens",
      "e-Medical Visa India for Mozambique",
      "treatment in India from Maputo",
      "treatment in India from Nampula",
    ],
  },
  breadcrumb: {
    home: "Home",
    mozambique: "Mozambique",
    page: "Treatment in India",
  },
  hero: {
    eyebrow: "Medical treatment in India for Mozambican patients",
    h1: "Medical Treatment in India for Mozambican Patients",
    lede:
      "Mozambican patients can travel to India for specialist medical care, diagnosis, surgery, cancer treatment, cardiac treatment, neurosurgery, orthopaedics, urology, fertility treatment and other complex conditions. GAF Healthcare helps coordinate medical records, specialist opinions, hospital options, treatment estimates, visa documentation and the journey from Mozambique to India.",
    primaryCta: "Get a Medical Opinion",
    secondaryCta: "Explore Treatments",
    whatsappLabel: "WhatsApp +91 90443 46292",
  },
  quickAnswer: [
    {
      question: "Can Mozambican patients travel to India for medical treatment?",
      answer:
        "Yes. Mozambican citizens can travel to India for medical treatment using the applicable Indian Medical Visa or e-Medical Visa route, depending on eligibility and the patient's circumstances. Mozambique is currently included in India's official e-Visa eligible-country list.",
    },
    {
      question: "Is an e-Medical Visa available for Mozambican citizens?",
      answer:
        "Yes. Mozambique appears on the current Government of India's e-Visa eligibility list, and the Indian High Commission in Maputo specifically provides information about e-Medical and e-Medical Attendant Visas.",
    },
    {
      question: "What treatments can Mozambican patients receive in India?",
      answer:
        "Depending on the diagnosis, patients can seek treatment in oncology, cardiology, cardiac surgery, neurosurgery, orthopaedics, urology, gastroenterology, nephrology, transplantation, IVF and fertility, paediatrics and many other specialties.",
    },
    {
      question: "Which Indian cities can Mozambican patients consider?",
      answer:
        "Major healthcare destinations include Delhi NCR, Mumbai, Chennai, Bengaluru and Hyderabad. The appropriate city depends on the patient's diagnosis, required treatment, specialist and hospital.",
    },
    {
      question: "How much does treatment in India cost for Mozambican patients?",
      answer:
        "There is no single price. Treatment cost depends on the diagnosis, hospital, doctor, procedure, medicines, investigations, implants, ICU requirements, hospital stay and other clinical factors.",
    },
    {
      question: "Can a patient get a medical opinion before travelling?",
      answer:
        "Yes. Medical reports can be shared for preliminary review by an appropriate Indian specialist before travel.",
    },
  ] satisfies QuickAnswerItem[],
  why: {
    heading: "Why Mozambican Patients Consider Medical Treatment in India",
    intro:
      "Travelling to another country for healthcare is a major decision. Patients and families generally want to understand the diagnosis, the specialist, whether surgery is necessary, alternatives, cost, duration, visa requirements and whether records can be reviewed before they leave Mozambique.",
    points: [
      "India has a large tertiary and quaternary healthcare ecosystem, so a specific medical problem can be matched to a specialty, subspecialty, treatment and doctor",
      "The journey usually starts with medical records and a specialist opinion, then hospital selection, cost estimation, visa arrangements, travel and follow-up",
      "The India–Mozambique relationship has a documented healthcare dimension, including recent Indian assistance involving medicines, equipment, rehabilitation and medical camps",
      "Portuguese is Mozambique’s official language; English is widely used in Indian hospitals, so language support should be planned where needed",
      "International treatment is not automatically the right option for every patient — the decision should follow the individual medical condition",
    ],
    close:
      "GAF Healthcare helps coordinate this process with hospitals and specialists in India. A hospital should be chosen for the diagnosis, not for the country name alone.",
  },
  relationship: {
    heading: "India–Mozambique Healthcare Relationship",
    paragraphs: [
      "India has an established healthcare relationship with Mozambique. The High Commission of India in Maputo and India’s Ministry of External Affairs record recent cooperation involving medical assistance, medicines, equipment, rehabilitation projects and specialist medical camps.",
      "In 2025, the Government of India, working with Bhagwan Mahaveer Viklang Sahayata Samiti and Mozambique’s Ministry of Health, organised a free artificial-limb camp at Central Hospital in Maputo. The mission’s published note states that the camp provided artificial limbs to 1,230 beneficiaries. Another Jaipur Foot camp in Nampula reached 500 beneficiaries.",
      "The same official bilateral record describes medicines and medical equipment provided to Mozambique during 2025–2026. That cooperation is a documented relationship. It does not mean every Mozambican patient should travel, or that India is automatically the right destination for every diagnosis.",
    ],
  },
  context: {
    heading: "Mozambique’s Healthcare Context",
    intro:
      "Mozambique has made progress in strengthening primary healthcare and community-based services. WHO also records remaining gaps in service coverage and, in some provinces, humanitarian constraints. These facts describe the health-system setting. They do not diagnose an individual patient.",
    points: [
      "WHO’s Mozambique data overview lists Mozambique as a low-income country and cautions that cause-of-death estimates should be interpreted carefully because complete, usable death-registration data are not available.",
      "The WHO African Health Observatory currently reports a service availability index of 46% for Mozambique.",
      "WHO’s 2026 Health Cluster note describes continuing constraints in parts of Cabo Delgado, Nampula and Niassa associated with insecurity, displacement and limited access to essential services.",
    ],
    close:
      "These conditions do not mean that every Mozambican patient needs treatment abroad. International treatment may be considered when a patient needs a particular specialist, complex surgery, advanced diagnostics, multidisciplinary treatment or a service that is difficult to access locally.",
  },
  overview: {
    heading: "Medical Treatment in India for Patients from Mozambique",
    intro:
      "For a Mozambican patient, international medical treatment involves more than choosing a hospital. The appropriate pathway should always be determined by a qualified medical professional after reviewing the clinical information. Depending on the diagnosis, patients may consider India for the specialties below.",
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
      "Bariatric surgery",
      "Second opinions",
    ],
  },
  treatments: {
    heading: "Popular Treatment Categories for Mozambican Patients",
    intro:
      "Each card links only to a live GAF specialty or treatment page. Where GAF does not yet publish a dedicated page, the category is explained without an invented URL.",
    categories: [
      {
        title: "Cancer Treatment",
        body: "Medical, surgical and radiation oncology, including cervical, breast, prostate and colorectal pathways that already have GAF guides.",
        href: "/treatments/cervical-cancer-treatment-in-india",
        hrefLabel: "Cervical cancer treatment in India",
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
        body: "Paediatric cardiology and cardiac surgery, oncology, neurosurgery and related children’s services arranged with a paediatric team.",
        href: "/treatments/ventricular-septal-defect-surgery-in-india",
        hrefLabel: "VSD surgery in India",
        specialty: "Pediatric Cardiac Surgery",
      },
      {
        title: "Organ Transplantation",
        body: "Kidney, liver, heart and bone-marrow programmes are highly regulated. Eligibility must be confirmed by the transplant centre before travel.",
        href: "/treatments/bone-marrow-transplant-in-india",
        hrefLabel: "Bone marrow transplant in India",
        specialty: "Hematology",
      },
      {
        title: "IVF & Fertility",
        body: "Mozambican couples may consider India for infertility evaluation and assisted reproductive treatment. GAF does not yet publish a dedicated IVF page. Eligibility, protocols and applicable Indian regulations should be confirmed with the treating fertility centre before travel.",
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
          { label: "Pancreatic Cancer", href: "/treatments/pancreatic-cancer-treatment-in-india" },
          { label: "Ovarian Cancer", href: "/treatments/ovarian-cancer-treatment-in-india" },
          { label: "Brain Tumour", href: "/treatments/brain-tumor-surgery-in-india" },
          { label: "Blood Cancer", href: "/treatments/leukemia-treatment-in-india" },
          { label: "Kaposi Sarcoma", href: "" },
          { label: "Liver Cancer", href: "" },
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
        ],
      },
    ],
  },
  cancer: {
    heading: "Cancer Treatment in India for Mozambican Patients",
    intro:
      "Cancer is an important reason Mozambican families ask for an Indian specialist review. According to the IARC GLOBOCAN 2022 Mozambique fact sheet, the country had an estimated 25,058 new cancer cases, 14,645 cancer deaths and 43,688 five-year prevalent cases. These are population-level estimates and should not be used to diagnose an individual patient.",
    body: "The same official fact sheet ranks cervix uteri first among estimated new cases (5,381; 21.5%), followed by Kaposi sarcoma (4,308; 17.2%), oesophagus (1,781), breast (1,744) and liver (1,616). Among men, Kaposi sarcoma was the leading site (2,861 estimated cases), followed by prostate (1,051) and liver. Among women, cervical cancer was the leading site. GAF does not yet publish dedicated Kaposi sarcoma, liver-cancer or oesophageal-cancer pages; those cases are coordinated through the relevant oncology team after records review.",
    modalities: [
      { label: "Cervical Cancer", href: "/treatments/cervical-cancer-treatment-in-india" },
      { label: "Breast Cancer", href: "/treatments/breast-cancer-treatment-in-india" },
      { label: "Prostate Cancer", href: "/treatments/prostate-cancer-treatment-in-india" },
      { label: "Colon Cancer", href: "/treatments/colon-cancer-treatment-in-india" },
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
    heading: "Medical Treatment Cost in India for Mozambican Patients",
    intro:
      "There is no universal price for treatment in India. The same procedure can have different costs because the diagnosis, disease severity, treatment plan and hospital requirements may differ. GAF Healthcare presents costs as indicative planning estimates, not guaranteed final prices.",
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
      "Request a written estimate and ask the hospital to clarify inclusions and exclusions before travel.",
  },
  cities: {
    heading: "Major Indian Cities for Mozambican Patients",
    intro:
      "The right city depends on the patient's medical requirement. Delhi NCR, Mumbai, Chennai, Bengaluru and Hyderabad all have specialist hospitals in GAF’s live catalogue. There is no single city that is appropriate for every patient.",
    items: [
      {
        name: "Delhi NCR",
        body: "Delhi and Gurugram form one of India’s largest tertiary-care clusters, covering cancer, cardiology, cardiac surgery, neurosurgery, orthopaedics, transplantation, gastroenterology, urology and paediatric specialties.",
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
    heading: "Hospitals in India for Mozambican Patients",
    intro:
      "Choose the hospital for the specific condition, the specialist, the required technology, multidisciplinary support and a clear written estimate — not for the brand name alone. The campuses below are drawn from GAF’s live India catalogue, one from each published city.",
    directoryLabel: "Browse hospitals in India",
  },
  doctors: {
    heading: "Specialist Doctors in India for Mozambican Patients",
    intro:
      "The useful sequence is specialty → subspecialty → procedure → city → hospital → doctor. A cervical-cancer patient may need a gynaecologic or surgical oncologist, a medical oncologist and a radiation oncologist. The specialists below are taken from GAF’s live doctor catalogue.",
    directoryLabel: "Browse doctors in India",
  },
  visa: {
    heading: "Indian Medical Visa for Mozambican Patients",
    intro:
      "Mozambique is currently included in India’s official list of countries eligible for e-Visa. The Government of India’s e-Visa portal includes an e-Medical Visa for medical treatment and an e-Medical Attendant Visa for accompanying attendants. The High Commission of India in Maputo publishes specific information about these categories.",
    points: [
      "The High Commission in Maputo directs applicants to the official Indian e-Visa website and lists e-Medical Visa for medical treatment, including treatment under Indian systems of medicine.",
      "Current Indian e-Visa guidance states that eligible applicants for e-Medical and e-Medical Attendant Visas may apply online at least four days before arrival, within a 120-day application window. The passport should meet the published validity rules, commonly at least six months.",
      "The official portal currently describes the e-Medical and e-Medical Attendant Visas as having one-year validity from arrival with multiple entries. Two medical-attendant visas may be granted against one e-Medical Visa. Confirm the live portal when applying.",
      "The regular Medical Visa remains available through the High Commission of India in Maputo for patients who do not use the e-Visa route. The mission states that Medical Visas are available for treatment in recognised Indian hospitals, including neurosurgery, heart problems, renal disorders, organ transplantation, congenital disorders, gene therapy, radiotherapy and joint replacement.",
      "The High Commission’s Medical Visa guidance asks for an acceptance letter from an established Indian hospital covering the patient’s identity, ailment, proposed treatment, estimated treatment time and estimated cost, plus the patient’s medical history and supporting reports from a local clinic or hospital.",
      "The same guidance states that up to two medical attendants or family members may accompany a patient, with Medical Attendant Visa validity aligned to the patient’s Medical Visa.",
    ],
    disclaimer:
      "Visa rules, fees, documents and entry regulations can change. Verify the current official e-Visa portal and the High Commission of India in Maputo before applying or travelling.",
    documentsHeading: "e-Medical Visa and regular Medical Visa documents",
    documents: [
      "Passport details, photograph and passport bio page",
      "Medical documentation and Indian hospital documentation as required",
      "For the regular Medical Visa: acceptance letter from an established Indian hospital, sent as the mission requires",
      "Patient medical history and supporting reports recommending specialised treatment",
      "Copy of the granted Electronic Travel Authorization when travelling on e-Visa",
      "Attendant passports and documents where a family member will travel",
    ],
    documentsNote:
      "The current e-Visa portal states that applicants need a clear passport photograph and passport page, along with an additional document according to the type of e-Visa. The High Commission’s regular-visa list also includes financial documents, accommodation arrangements and the visa fee where that route is used.",
  },
  yellowFever: {
    heading: "Yellow Fever Requirements for Travelling from Mozambique",
    intro:
      "Mozambican travellers should check India’s current health-entry requirements before departure. India’s e-Visa guidance states that travellers arriving from yellow-fever affected countries must carry the required yellow-fever vaccination certificate.",
    points: [
      "Patients should verify the latest health-entry requirements before booking travel because public-health entry rules can change.",
      "Do not wait until the day of departure to resolve vaccination documentation.",
      "Carry the certificate with the passport and hospital letter.",
    ],
    close:
      "Confirm the current requirement on the official Indian e-Visa portal and with the High Commission of India in Maputo before travel.",
  },
  travel: {
    heading: "Travel from Mozambique to India for Medical Treatment",
    intro:
      "For many Mozambican patients, the journey begins in Maputo. Other patients may travel from Nampula, Beira, Matola, Tete, Pemba or other cities. The practical journey is often Mozambique → an international transit point → India → airport transfer → hospital.",
    points: [
      "Flight schedules and routing can change. Confirm current airline schedules before booking tickets.",
      "Patients with serious medical conditions should ask their treating doctor whether they are medically fit to fly.",
      "India and Mozambique have also had direct healthcare cooperation in Nampula, including the 2025 artificial-limb camp. Patients from Nampula use the same medical-travel pathway; the practical journey may begin with domestic travel to an international departure point.",
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
    heading: "Documents Mozambican Patients Should Carry to India",
    intro:
      "Maintain both physical and digital copies. Sending complete records before travel can make the preliminary assessment more useful.",
    general: [
      "Diagnosis, doctor's referral, blood tests and imaging",
      "CT, MRI, X-rays and ultrasound reports",
      "Biopsy, histopathology, immunohistochemistry and molecular reports",
      "Previous operation notes, discharge summaries and prescriptions",
      "Passport, Indian visa or e-Visa, and Electronic Travel Authorization where applicable",
      "Hospital appointment or acceptance letter, flight booking and emergency contacts",
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
    heading: "Language, Food and Accommodation for Mozambican Patients",
    intro:
      "Portuguese is the official language of Mozambique. English is widely used in Indian hospitals for medical records, specialist consultations and hospital documentation.",
    accommodation: [
      "Distance from the hospital, lift access and wheelchair accessibility",
      "Attendant accommodation and kitchen facilities",
      "Pharmacy access, food and transport",
      "Length of stay after major surgery — proximity may matter more than hotel facilities",
    ],
    accommodationNote:
      "Patients may need halal, vegetarian, low-salt, diabetic or other medical diets. Discuss nutritional requirements with the treating hospital.",
    food: "For a patient recovering from major surgery, choose accommodation for hospital access rather than price alone.",
    language:
      "For Mozambican patients who are more comfortable communicating in Portuguese, arrange language assistance or translation support when necessary. GAF Healthcare can coordinate communication requirements as part of the medical-travel process where available. Ask for clarification when a diagnosis, procedure, risk or financial estimate is not clear.",
  },
  journey: {
    heading: "Mozambique → India Medical Treatment Journey",
    intro:
      "A records-first sequence allows many questions to be addressed before the patient leaves Mozambique. You do not need to start by choosing a hospital at random.",
    steps: [
      { title: "Collect medical records", body: "Gather diagnosis reports, scans, pathology, prescriptions and previous treatment information." },
      { title: "Share the records", body: "Submit available records to GAF Healthcare for preliminary coordination." },
      { title: "Identify the specialist", body: "The case is mapped to the appropriate specialty and subspecialty." },
      { title: "Obtain a medical opinion", body: "The relevant Indian specialist or hospital can review the case where available." },
      { title: "Select the hospital", body: "Consider suitable hospital options based on the required treatment." },
      { title: "Receive the estimate", body: "The hospital provides an indicative treatment estimate based on the available medical information." },
      { title: "Organise the visa", body: "Hospital documentation can support the applicable Medical Visa or e-Medical Visa process." },
      { title: "Book travel", body: "Arrange flights and accommodation around the hospital dates." },
      { title: "Arrive in India", body: "The patient reaches the selected medical city and completes airport-to-hospital transfer." },
      { title: "Hospital evaluation", body: "The treating team assesses the patient and may repeat selected investigations." },
      { title: "Treatment", body: "The final treatment plan is confirmed before treatment begins." },
      { title: "Recovery and follow-up", body: "The hospital provides discharge and follow-up instructions." },
    ],
  },
  help: {
    heading: "Why GAF Healthcare for Mozambican Patients?",
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
      "A preliminary review from Maputo, Nampula or another city can help clarify the specialty, whether further information is required, potential treatment and hospital options, indicative cost and expected stay.",
    questions: [
      "Has the diagnosis been confirmed, and does pathology need review?",
      "Is surgery necessary, and how urgent is treatment?",
      "What alternatives exist?",
      "What does the estimate include — medicines, implants, ICU and investigations?",
      "How many days should the patient plan to stay, and when is it safe to return home?",
      "Should an attendant travel?",
      "Can follow-up continue after return to Mozambique?",
    ],
    close:
      "International treatment is not automatically appropriate when the required treatment is already available, the condition is stable, travel creates unnecessary risk, or the patient is not medically fit to fly.",
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
      "Cervical cancer → gynaecologic or surgical oncologist, medical oncologist, radiation oncologist",
      "Breast cancer → breast or surgical oncologist, medical oncologist, radiation oncologist",
      "Coronary artery disease → cardiologist, interventional cardiologist, cardiac surgeon where required",
      "Brain tumour → neurosurgeon, and medical or radiation oncology where appropriate",
    ],
  },
  faqHeading: "Frequently Asked Questions",
  faqs: [
    {
      q: "Can Mozambican patients get medical treatment in India?",
      a: "Yes. Mozambican citizens can travel to India for medical treatment using the applicable Indian Medical Visa or e-Medical Visa route. Mozambique is currently included in India's e-Visa eligible-country list.",
    },
    {
      q: "Can Mozambican citizens apply for an Indian e-Medical Visa?",
      a: "Yes. Mozambique is currently listed as an eligible nationality on India's official e-Visa portal, and the e-Visa system includes the e-Medical category. The High Commission of India in Maputo publishes information about e-Medical and e-Medical Attendant Visas.",
    },
    {
      q: "How early can I apply for an Indian e-Medical Visa?",
      a: "The current Government of India e-Visa guidance says applicants for e-Medical and e-Medical Attendant Visas may apply online at least four days before arrival, with an arrival-date window extending up to 120 days.",
    },
    {
      q: "How long is the Indian e-Medical Visa valid?",
      a: "The current official e-Visa portal describes the e-Medical Visa as valid for one year from arrival with multiple entries. Visa rules can change, so applicants should verify the live official portal when applying.",
    },
    {
      q: "Can a family member accompany a Mozambican patient?",
      a: "Yes. India provides an e-Medical Attendant Visa for eligible e-Medical Visa holders. The regular Medical Visa guidance of the Indian High Commission in Maputo also provides for up to two medical attendants or family members, subject to the applicable rules.",
    },
    {
      q: "How much does treatment in India cost for Mozambican patients?",
      a: "There is no fixed cost. The price depends on diagnosis, treatment, hospital, doctor, medicines, investigations, implants, ICU requirements and length of stay.",
    },
    {
      q: "Can I get a treatment estimate before travelling?",
      a: "Yes. Medical records can be reviewed by an appropriate hospital or specialist, after which an indicative treatment estimate may be provided.",
    },
    {
      q: "Can I send my reports from Maputo?",
      a: "Yes. Medical reports can be submitted digitally before travelling.",
    },
    {
      q: "Can patients from Nampula travel to India for treatment?",
      a: "Yes. Patients from Nampula and other provinces can use the same medical-travel pathway, although the practical journey may begin with domestic travel to an international departure point. India and Mozambique have also had direct healthcare cooperation in Nampula, including an artificial-limb camp in 2025.",
    },
    {
      q: "Can I get cancer treatment in India?",
      a: "Yes. Indian cancer centres provide medical oncology, surgical oncology, radiation oncology and systemic treatments according to the patient's diagnosis. Cervical cancer, Kaposi sarcoma, breast cancer, liver cancer and prostate cancer are among the leading sites in Mozambique’s GLOBOCAN 2022 estimates.",
    },
    {
      q: "Can I get cardiac surgery in India?",
      a: "Yes. Indian cardiac centres provide procedures including CABG, valve surgery, angioplasty, structural heart treatment and other cardiac services.",
    },
    {
      q: "Can I get IVF treatment in India?",
      a: "Yes. Indian fertility centres provide IVF, ICSI, IUI, embryo-transfer procedures and other fertility treatments according to clinical and legal requirements. GAF does not yet publish a dedicated IVF page, so eligibility should be confirmed with the treating clinic.",
    },
    {
      q: "How long do I need to stay in India?",
      a: "It depends on the treatment. A consultation may require a short stay, while major surgery or cancer treatment may require several weeks or longer. Ask the hospital for an estimated duration before booking a return flight.",
    },
    {
      q: "Is the first hospital quotation final?",
      a: "No. A preliminary quotation is based on the information available before treatment. The final treatment plan and cost may change after clinical examination and investigations.",
    },
    {
      q: "Can I get a second medical opinion?",
      a: "Yes. Patients can submit their medical records for review by an appropriate Indian specialist. A second opinion can be useful when surgery or cancer treatment has been proposed, the diagnosis is uncertain, or the family wants another assessment.",
    },
    {
      q: "Do I need to speak English?",
      a: "English is widely used in Indian hospitals. Mozambican patients who prefer Portuguese should arrange language assistance where necessary.",
    },
    {
      q: "Do I need to carry my previous medical reports?",
      a: "Yes. Patients should carry complete physical and digital copies of important medical records, plus the passport, visa or e-Visa and hospital letter.",
    },
    {
      q: "Does GAF Healthcare arrange hospital appointments?",
      a: "GAF Healthcare can coordinate with relevant hospitals and specialists according to the patient's medical requirement.",
    },
  ],
  finalCta: {
    heading: "Start Your Medical Treatment Journey from Mozambique to India",
    body: "If you or a family member in Mozambique is considering treatment in India, start with the medical requirement. Share the diagnosis, reports, previous treatment details and available scans. The case can then be mapped to the appropriate specialty, Indian hospital and specialist.",
    primary: "Get a Medical Opinion",
    secondary: "Talk to a Medical Travel Expert",
    whatsappLabel: "WhatsApp +91 90443 46292",
    steps: "Get a Medical Opinion → Get Treatment Cost → Plan the visa and journey to India",
  },
  disclaimer: {
    heading: "Important Medical Information",
    body: "This page is intended for general education and medical-travel planning. It does not replace medical advice from a qualified healthcare professional. Cancer statistics are population-level estimates and cannot determine an individual's diagnosis or prognosis. Treatment decisions should be made by the treating specialist after reviewing the patient's history, examination and investigations. Treatment costs are indicative and can change. Visa requirements, fees, documentation and entry regulations can change. Mozambican patients should verify the latest information through the official Government of India visa portal and the High Commission of India in Maputo before making travel arrangements.",
  },
  sources: {
    heading: "Sources",
    items: [
      {
        label: "Ministry of External Affairs, India — India–Mozambique bilateral brief",
        href: MOZAMBIQUE_OFFICIAL_LINKS.meaBrief,
        detail: "Official note including medicines, medical equipment and the 2025 artificial-limb camps.",
      },
      {
        label: "High Commission of India, Maputo — India–Mozambique relations",
        href: MOZAMBIQUE_OFFICIAL_LINKS.hciRelations,
        detail: "Mission record of the Maputo camp (1,230 beneficiaries) and the Nampula camp (500 beneficiaries).",
      },
      {
        label: "High Commission of India, Maputo — Jaipur Foot camp note",
        href: MOZAMBIQUE_OFFICIAL_LINKS.hciJaipurCamp,
        detail: "24 June–6 August 2025 artificial-limb camp at Central Hospital, Maputo.",
      },
      {
        label: "Government of India — Official e-Visa portal",
        href: MOZAMBIQUE_OFFICIAL_LINKS.eVisa,
        detail: "Current e-Visa eligibility, including Mozambique, and e-Medical / e-Medical Attendant categories.",
      },
      {
        label: "High Commission of India, Maputo — e-Visa",
        href: MOZAMBIQUE_OFFICIAL_LINKS.hciEvisa,
        detail: "Mission guidance pointing Mozambican applicants to the official e-Visa website, including e-Medical Visa.",
      },
      {
        label: "High Commission of India, Maputo — Regular visas",
        href: MOZAMBIQUE_OFFICIAL_LINKS.hciRegular,
        detail: "Medical and Medical Attendant Visa categories, hospital acceptance letter and attendant limit.",
      },
      {
        label: "IARC / WHO — GLOBOCAN 2022 Mozambique fact sheet",
        href: MOZAMBIQUE_OFFICIAL_LINKS.globocan,
        detail: "Estimated incidence, mortality, prevalence and leading cancer sites.",
      },
      {
        label: "WHO — Mozambique health data overview",
        href: MOZAMBIQUE_OFFICIAL_LINKS.whoData,
        detail: "Country income classification and caution on mortality estimates.",
      },
      {
        label: "WHO African Health Observatory — Mozambique",
        href: MOZAMBIQUE_OFFICIAL_LINKS.whoObservatory,
        detail: "Service availability index and selected national health indicators.",
      },
      {
        label: "WHO Health Cluster — Mozambique",
        href: MOZAMBIQUE_OFFICIAL_LINKS.whoCluster,
        detail: "2026 humanitarian health-access context in Cabo Delgado, Nampula and Niassa.",
      },
    ],
  },
};
