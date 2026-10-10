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

export const NIGERIA_PAGE_PATH = "/nigeria/treatment-in-india";
export const NIGERIA_PAGE_LOCALES = ["en"] as const;
export const NIGERIA_LAST_REVIEWED = "2026-10-03";

export type NigeriaPageCopy = typeof nigeriaPageCopyEn;

export function nigeriaPageCopy(_locale: AppLocale): NigeriaPageCopy {
  return nigeriaPageCopyEn;
}

const INDIA = "India";

export const NIGERIA_OFFICIAL_LINKS = {
  eVisa: "https://indianvisaonline.gov.in/evisa/tvoa.html",
  eVisaFees: "https://indianvisaonline.gov.in/evisa/eTV_revised_fee_final.pdf",
  visaOnline: "https://indianvisaonline.gov.in/visa/index.html",
  hci: "https://hciabuja.gov.in/",
  hciVisa: "https://hciabuja.gov.in/pages/MTA4",
  hciMedical: "https://hciabuja.gov.in/pages/MTE1",
  hciBrief: "https://hciabuja.gov.in/pages/MTU,",
  hciBriefPdf: "https://hciabuja.gov.in/public_files/assets/pdf/India_Nigeria_Bilateral_Brief_June_2026.pdf",
  cgiLagos: "https://cgilagos.gov.in/visa-services.php",
  meaBrief: "https://www.mea.gov.in/Portal/ForeignRelation/India-Nigeria-_bilateral-relations.pdf",
  globocan: "https://gco.iarc.who.int/media/globocan/factsheets/populations/566-nigeria-fact-sheet.pdf",
  iarcToday: "https://gco.iarc.who.int/today/en/fact-sheets-populations",
  whoData: "https://data.who.int/countries/566",
  mohfwYellowFever: "https://ihpoe.mohfw.gov.in/vaccination.php",
  boi: "https://boi.gov.in",
} as const;

export const NIGERIA_CURATED_TREATMENT_SLUGS = [
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

export const NIGERIA_CANCER_TREATMENT_SLUGS = TANZANIA_CANCER_TREATMENT_SLUGS;

export const NIGERIA_COST_PROCEDURE_NAMES = [
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

export const NIGERIA_DOCTOR_SPECIALTY_SLUGS = [
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

export function resolveNigeriaCostRows(catalog: Treatment[]) {
  return NIGERIA_COST_PROCEDURE_NAMES.map((name) => {
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

export function nigeriaDoctors(doctors: Doctor[]) {
  return NIGERIA_DOCTOR_SPECIALTY_SLUGS.map((specialtySlug) => {
    const pool = doctors.filter((doctor) => doctor.specialtySlug === specialtySlug);
    const featured = pool.find((doctor) => doctor.featured);
    return featured ?? [...pool].sort((a, b) => a.name.localeCompare(b.name))[0];
  }).filter((row): row is Doctor => Boolean(row));
}

export const nigeriaPageCopyEn = {
  seo: {
    title: "Medical Treatment in India for Nigerian Patients",
    description:
      "Explore medical treatment in India for Nigerian patients. Find specialist doctors, hospitals, treatments, indicative costs, High Commission of India Abuja and CGI Lagos Medical Visa guidance and support from GAF Healthcare.",
    keywords: [
      "medical treatment in India for Nigerian patients",
      "medical treatment in India from Nigeria",
      "treatment in India for Nigerian patients",
      "medical tourism from Nigeria to India",
      "Indian hospitals for Nigerian patients",
      "Indian doctors for Nigerian patients",
      "medical treatment cost in India for Nigerian patients",
      "cancer treatment in India for Nigerian patients",
      "cardiac treatment in India for Nigerian patients",
      "medical visa India for Nigerian citizens",
      "High Commission of India Abuja medical visa",
      "treatment in India from Lagos",
      "treatment in India from Abuja",
    ],
  },
  breadcrumb: {
    home: "Home",
    nigeria: "Nigeria",
    page: "Treatment in India",
  },
  hero: {
    eyebrow: "Medical treatment in India for Nigerian patients",
    h1: "Medical Treatment in India for Nigerian Patients",
    lede:
      "For patients travelling from Nigeria, choosing treatment abroad involves more than finding a hospital. The process can include obtaining a medical opinion, identifying the appropriate specialist, comparing treatment plans, understanding the estimated cost, arranging a medical visa, planning flights and accommodation, and coordinating follow-up after returning home. GAF Healthcare helps Nigerian patients navigate this process by connecting them with hospitals and specialist doctors in India and assisting with the practical arrangements involved in an international medical journey.",
    primaryCta: "Get a Medical Opinion",
    secondaryCta: "Explore Treatments",
    whatsappLabel: "WhatsApp +91 90443 46292",
  },
  quickAnswer: {
    intro:
      "Nigerian patients can consider India for a wide range of planned and complex medical treatments, including cancer care, cardiac surgery, neurosurgery, orthopedics, joint replacement, urology, gastroenterology, organ transplantation, IVF and pediatric specialties.",
    process:
      "The first step is usually to collect the patient's medical records and obtain an opinion from an appropriate Indian specialist or hospital. Based on the diagnosis, the hospital can recommend investigations, treatment options, expected duration of stay and an indicative treatment estimate.",
    verify:
      "Because visa rules, hospital pricing and travel arrangements can change, patients should verify current requirements before travelling.",
    visaNote:
      "Nigerian passport holders should not assume that they qualify for India's e-Medical Visa. Nigeria is not currently shown on India's official e-Visa eligible-country list, while Niger Republic is separately listed. Nigerian patients should follow the regular Medical Visa process applicable to their nationality and confirm the latest requirements with the Indian mission/official visa system.",
  },
  why: {
    heading: "Why Nigerian Patients Consider India for Medical Treatment",
    intro:
      "The decision to travel to another country for healthcare is personal and usually depends on the complexity of the condition, available treatment options, waiting times, specialist expertise, expected duration of treatment and overall logistics. India has a large network of tertiary and quaternary hospitals offering multiple medical specialties under one healthcare system.",
    points: [
      "Access to specialist consultation across major medical specialties",
      "Hospitals with multidisciplinary clinical teams",
      "Advanced diagnostic and imaging facilities",
      "Surgical and non-surgical treatment options",
      "Cancer treatment involving surgery, radiation and systemic therapies",
      "Cardiac surgery and interventional cardiology",
      "Neurosurgery and spine care",
      "Orthopedic surgery and joint replacement",
      "Urology and uro-oncology",
      "Gastroenterology and gastrointestinal surgery",
      "Fertility and IVF services",
      "Pediatric specialist care",
      "Organ transplantation where medically appropriate",
      "International-patient coordination at many major hospitals",
      "English-language medical communication",
      "A wide range of hospital and city options",
    ],
    close:
      "India should not be considered automatically suitable for every patient. The right destination depends on the diagnosis, treatment requirement, urgency, clinical evidence, hospital capability and the patient's individual circumstances.",
  },
  relationship: {
    heading: "India–Nigeria Healthcare Relationship",
    paragraphs: [
      "India and Nigeria have maintained longstanding bilateral relations, and healthcare has been one of the areas of engagement between the two countries. India’s Ministry of External Affairs and the High Commission of India in Abuja record visits by Nigerian health officials to India, including participation in the One World TB Summit in Varanasi in March 2023 and the Advantage Healthcare India programme in New Delhi in April 2023.",
      "The same official briefs record that health was among the areas discussed during the Prime Minister of India’s State visit to Nigeria in November 2024. The broader relationship provides an established institutional context for healthcare and pharmaceutical cooperation.",
      "For individual patients, however, bilateral relations should not be interpreted as a guarantee of treatment availability or clinical outcomes. Treatment decisions remain dependent on the patient's diagnosis and the hospital's medical assessment.",
    ],
  },
  context: {
    heading: "Planning Treatment from Nigeria",
    intro:
      "Nigeria has its own hospitals and specialists. International treatment becomes relevant when a patient needs a particular specialist, advanced procedure, complex surgery, specialised diagnostics, multidisciplinary care or another service that is not readily available locally.",
    points: [
      "The India–Nigeria healthcare relationship can make Indian hospitals a familiar option, but the hospital still has to match the diagnosis.",
      "English is widely used in Indian hospitals, which can make communication more straightforward for many Nigerian patients.",
      "Most international medical journeys begin at Murtala Muhammed International Airport in Lagos or Nnamdi Azikiwe International Airport in Abuja.",
    ],
    close:
      "The decision should be based on the patient’s individual medical requirements, discussed with the current doctor and, where appropriate, an Indian specialist after records review.",
  },
  overview: {
    heading: "What Medical Treatments Can Nigerian Patients Receive in India?",
    intro:
      "India offers treatment across a broad range of specialties. GAF Healthcare can help patients identify the appropriate specialty and then connect the case with suitable hospitals and doctors. The appropriate pathway should always be determined by a qualified medical professional after reviewing the clinical information.",
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
      "Kidney and liver treatment",
      "Organ transplantation",
      "Paediatric treatment",
      "Fertility treatment",
      "Second opinions",
    ],
  },
  treatments: {
    heading: "Popular Treatment Categories for Nigerian Patients",
    intro:
      "Each card links only to a live GAF specialty or treatment page. Where GAF does not yet publish a dedicated page, the category is explained without an invented URL.",
    categories: [
      {
        title: "Cancer Treatment",
        body: "Medical, surgical and radiation oncology, including breast, prostate, cervical and colorectal pathways that already have GAF guides. Liver cancer is coordinated after records review because a dedicated page is not yet published.",
        href: "/treatments/breast-cancer-treatment-in-india",
        hrefLabel: "Breast cancer treatment in India",
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
        body: "Nigerian couples may consider India for infertility evaluation and assisted reproductive treatment. GAF does not yet publish a dedicated IVF page. Eligibility, protocols and applicable Indian regulations should be confirmed with the treating fertility centre before travel.",
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
          { label: "Lymphoma", href: "/treatments/lymphoma-treatment-in-india" },
          { label: "Leukemia", href: "/treatments/leukemia-treatment-in-india" },
          { label: "Liver Cancer", href: "" },
          { label: "Lung Cancer", href: "" },
          { label: "Endometrial Cancer", href: "" },
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
    heading: "Cancer Treatment in India for Nigerian Patients",
    intro:
      "Cancer is one of the most important reasons patients seek specialist treatment internationally. According to the IARC GLOBOCAN 2022 Nigeria fact sheet, the country had an estimated 152,261 new cancer cases, 90,795 cancer deaths and 292,934 five-year prevalent cases. These are GLOBOCAN 2022 estimates, not current 2026 case counts, and they should not be used to diagnose an individual patient.",
    body: "The same official fact sheet ranks breast first among estimated new cases in both sexes (44,196; 29.0%), followed by prostate (24,396; 16.0%), cervix uteri (12,312; 8.1%), colorectum (10,212; 6.7%) and liver (3,783; 2.5%). Among Nigerian women, breast cancer was the most frequently diagnosed cancer. Among Nigerian men, prostate cancer was the leading site. GAF does not yet publish dedicated liver-cancer, lung-cancer or endometrial-cancer pages; those cases are coordinated through the relevant oncology team after records review.",
    modalities: [
      { label: "Breast Cancer", href: "/treatments/breast-cancer-treatment-in-india" },
      { label: "Prostate Cancer", href: "/treatments/prostate-cancer-treatment-in-india" },
      { label: "Cervical Cancer", href: "/treatments/cervical-cancer-treatment-in-india" },
      { label: "Colon Cancer", href: "/treatments/colon-cancer-treatment-in-india" },
      { label: "Ovarian Cancer", href: "/treatments/ovarian-cancer-treatment-in-india" },
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
    heading: "Medical Treatment Cost in India for Nigerian Patients",
    intro:
      "There is no single fixed price for medical treatment in India. Online cost figures should be considered indicative planning ranges, not final hospital quotations. GAF Healthcare presents costs as USD planning estimates from the live catalogue, not guaranteed prices.",
    factors: [
      "Diagnosis and disease stage",
      "Hospital, specialist and procedure",
      "Room category, investigations and medicines",
      "Implants, ICU care and length of hospitalisation",
      "Complications, additional procedures, rehabilitation and follow-up",
    ],
    tableIntro:
      "The ranges below are GAF Healthcare planning figures from the live cost catalogue. They are not hospital quotations. Ask the hospital which items are included.",
    disclaimer:
      "A preliminary estimate may change if additional investigations are required, the disease is more advanced than expected, a different procedure or implant is needed, ICU care becomes necessary, hospitalisation is extended, or a complication develops.",
    ctaLabel: "Get a treatment-cost review on WhatsApp",
  },
  extraBudget: {
    heading: "What Is Usually Included in a Hospital Treatment Estimate?",
    intro:
      "Patients should ask the hospital to clarify whether the estimate includes doctor consultation, pre-operative investigations, surgery or procedure, operating-room charges, anaesthesia, hospital room, ICU, nursing, medicines, consumables, implants, pathology, imaging, blood products, physiotherapy and follow-up consultation.",
    items: [
      "Visa fees and international flights",
      "Accommodation outside the hospital, food and local transportation",
      "Attendant expenses",
      "Additional investigations, special medicines and implants",
      "Extended ICU care, complications and extended accommodation",
      "Rehabilitation and follow-up consultations",
    ],
    close:
      "Not every hospital estimate includes every item. Compare the scope of treatment, not simply two headline prices.",
  },
  cities: {
    heading: "Major Indian Cities for Nigerian Patients",
    intro:
      "The appropriate city depends on the specialty, hospital and doctor rather than geography alone. Delhi NCR, Mumbai, Chennai, Hyderabad and Bengaluru have specialist hospitals in GAF’s live catalogue.",
    items: [
      {
        name: "Delhi NCR",
        body: "A large concentration of tertiary and quaternary hospitals covering cancer, cardiology, neurosurgery, orthopaedics, transplantation, gastroenterology, urology and paediatric specialties.",
        city: "Delhi NCR",
        catalog: true,
      },
      {
        name: "Mumbai",
        body: "A major healthcare centre with hospitals providing specialist and multidisciplinary care across cancer, cardiac care, neurosurgery, orthopaedics, gastroenterology, transplantation and urology.",
        city: "Mumbai",
        catalog: true,
      },
      {
        name: "Chennai",
        body: "A long-established ecosystem of tertiary hospitals and international-patient services for cardiology, cardiac surgery, cancer, orthopaedics, neurology, neurosurgery, transplantation and gastroenterology.",
        city: "Chennai",
        catalog: true,
      },
      {
        name: "Hyderabad",
        body: "Major hospitals and specialist centres offering oncology, cardiology, neurosurgery, orthopaedics, transplantation, gastroenterology and urology.",
        city: "Hyderabad",
        catalog: true,
      },
      {
        name: "Bengaluru",
        body: "Specialist care across cardiology, oncology, neurosciences, orthopaedics, transplantation, gastroenterology and robotic or minimally invasive surgery.",
        city: "Bengaluru",
        catalog: true,
      },
      {
        name: "Pune",
        body: "Pune can also be considered for oncology, orthopaedics, cardiology, neurosurgery, gastroenterology and urology. GAF’s live city catalogue does not yet include Pune, so this page does not link to a Pune directory.",
        city: "Pune",
        catalog: false,
      },
    ],
  },
  hospitals: {
    heading: "Hospitals in India for Nigerian Patients",
    intro:
      "The hospital with the most famous name is not necessarily the correct hospital for every patient. Choose the hospital for the specific condition, the specialist, the required technology, international-patient support and a clear written estimate. The campuses below are drawn from GAF’s live India catalogue, one from each published city.",
    directoryLabel: "Browse hospitals in India",
  },
  doctors: {
    heading: "Specialist Doctors in India for Nigerian Patients",
    intro:
      "The specialist should be matched to the patient's diagnosis. A breast-cancer patient may need a surgical oncologist, a medical oncologist and a radiation oncologist. The specialists below are taken from GAF’s live doctor catalogue.",
    directoryLabel: "Browse doctors in India",
  },
  visa: {
    heading: "Medical Visa for Nigerian Patients Travelling to India",
    intro:
      "The High Commission of India in Abuja currently states that there is no e-Visa facility for Nigerian nationals who plan to visit India. Nigeria is not shown on the Government of India's official e-Visa fee list. The official list separately includes Niger Republic. These are two different countries. Nigerian patients should therefore not apply assuming that the e-Medical Visa is available.",
    points: [
      "All visa applications have to be submitted in person at the High Commission of India in Abuja or the Consulate General of India in Lagos, with physical copies of the required documents.",
      "The official website for applying is the Government of India regular visa portal. Applicants must select the correct Indian mission — HCI Abuja or CGI Lagos — before completing the form.",
      "CGI Lagos currently accepts applications from residents of Lagos, Ogun, Ondo, Osun, Oyo, Abia, Anambra, Ebonyi, Enugu, Imo, Akwa Ibom, Bayelsa, Cross River, Delta, Edo and Rivers. Other applicants generally apply through HCI Abuja.",
      "The High Commission’s Medical Visa checklist asks for a typed referral from a well-reputed hospital in Nigeria and a typed Indian hospital invitation specifying the treatment and the start and end dates. The Indian hospital is asked to email the invitation to the published consular addresses in Abuja or Lagos.",
      "The High Commission currently publishes visa fees for Nigerian nationals as USD 585 plus an ICWF charge of USD 3, payable in equivalent Nigerian naira at the Sterling Bank counter in the mission premises. Fees and payment rules can change.",
      "CGI Lagos notes that processing of some visa applications may take up to six weeks and advises that flight tickets may be booked after receipt of the visa.",
    ],
    disclaimer:
      "Visa rules, fees, documents and entry regulations can change. Verify the current official Indian visa portal, the High Commission of India in Abuja and the Consulate General of India in Lagos before applying or travelling.",
    documentsHeading: "Documents for an Indian Medical Visa from Nigeria",
    documents: [
      "Original passport valid for a minimum of six months, with at least two blank pages",
      "Photocopy of the passport data page and two recent 50 mm × 50 mm photographs",
      "Printed, signed online visa application using the applicant’s own contact details and email",
      "Typed referral letter from a well-reputed hospital or medical institute in Nigeria",
      "Typed Indian hospital invitation specifying the treatment and the start and end dates",
      "Printout of the invitation email sent to the Abuja or Lagos consular addresses",
      "Financial documents or sponsor papers where the mission currently requires them",
      "Previous Indian hospital papers and discharge summaries for follow-up treatment",
      "Compatibility report for transplant patients, and attendant documents where a family member will travel",
    ],
    documentsNote:
      "The High Commission of India in Abuja and the Consulate General of India in Lagos publish the current Medical Visa instructions. Patients should use those official notes rather than relying on an old checklist found elsewhere online.",
  },
  yellowFever: {
    heading: "Yellow Fever and Polio Requirements for Nigerian Travellers",
    intro:
      "The High Commission of India in Abuja states that yellow-fever vaccination is compulsory for travel to India, except for infants under six months, and that polio vaccination is compulsory for Nigerian residents.",
    points: [
      "Nigeria is listed by India’s Ministry of Health among yellow-fever endemic countries for entry screening. Travellers arriving from yellow-fever endemic countries must carry a valid yellow-fever vaccination certificate issued by an authorised centre.",
      "The High Commission also states that all Nigerian nationals visiting India require proof of polio vaccination: at least one dose of bivalent oral polio vaccine (bOPV) or inactivated polio vaccine (IPV) within the previous 12 months, administered not less than four weeks before arrival.",
      "Do not wait until the day of departure to resolve vaccination documentation. An avoidable documentation issue at the border can complicate a planned medical journey.",
    ],
    close:
      "Confirm the current yellow-fever, polio and other health-entry requirements with the High Commission of India in Abuja, CGI Lagos, India’s Bureau of Immigration and the Ministry of Health IHR guidance before booking flights.",
  },
  travel: {
    heading: "Travelling from Nigeria to India for Medical Treatment",
    intro:
      "Patients commonly begin their international journey from Murtala Muhammed International Airport in Lagos or Nnamdi Azikiwe International Airport in Abuja. The exact route may involve a direct or connecting international flight depending on the travel date and airline schedule.",
    points: [
      "The most convenient Indian arrival airport depends on the selected hospital.",
      "A patient travelling for surgery should ideally avoid unnecessarily complicated domestic transfers immediately after a long international journey.",
      "The High Commission advises that no bookings or travel arrangements should be confirmed until a visa decision has been made.",
      "For planned treatment, it is generally better to receive the hospital's assessment, treatment schedule and relevant visa documentation before booking non-refundable travel.",
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
    heading: "Documents Nigerian Patients Should Prepare",
    intro:
      "The exact document requirements can vary according to the visa route and the patient's circumstances. A medical-travel file should contain both physical and digital copies.",
    general: [
      "Valid Nigerian passport, recent photographs and visa documents",
      "Diagnosis, medical referral or summary, blood tests and imaging",
      "CT, MRI, PET scans and pathology or biopsy reports",
      "Previous treatment records, operative reports and current medicines",
      "Indian hospital invitation or treatment letter and doctor correspondence",
      "Financial documentation and attendant documents where applicable",
    ],
    cancer: [
      "Histopathology, immunohistochemistry and molecular testing",
      "CT, MRI and PET-CT images as well as reports",
      "Previous chemotherapy, radiation and surgical notes",
    ],
    cardiac: [
      "ECG, echocardiogram and angiography images",
      "Stress-test results and CT coronary angiography",
      "Previous cardiac procedure reports and current medicines",
    ],
    ortho: [
      "X-rays, MRI and CT",
      "Previous surgery reports and physiotherapy records",
    ],
    cancerNote:
      "For neurosurgical cases, actual MRI or CT images should be provided wherever possible, alongside the radiology report.",
  },
  living: {
    heading: "Food, Language and Accommodation for Nigerian Patients",
    intro:
      "Accommodation should be selected according to the patient's medical condition and treatment schedule. Patients receiving radiation therapy, chemotherapy or repeated outpatient treatment may benefit from staying close to the hospital.",
    accommodation: [
      "Hotel, serviced apartment, long-stay or hospital-associated accommodation",
      "Distance from the hospital, lift access and wheelchair accessibility",
      "Attendant accommodation and kitchen facilities",
      "Pharmacy access, food preferences and transport",
    ],
    accommodationNote:
      "Patients may have dietary requirements because of diabetes, kidney disease, heart disease, liver disease, cancer treatment, gastrointestinal conditions or post-operative recovery. Follow the diet recommended by the treating team.",
    food: "Nigerian families may also want accommodation where meals can be prepared according to familiar West African dietary preferences, subject to the treating team's advice.",
    language:
      "English is widely used in India's healthcare system, which can simplify communication for many Nigerian patients. Important medical instructions should nevertheless be provided in writing whenever possible.",
  },
  stay: {
    heading: "How Long Does Treatment in India Take?",
    intro:
      "There is no single duration for medical treatment. These are planning estimates rather than promises. The treating hospital should confirm the expected duration after reviewing the patient's medical condition.",
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
    heading: "The Medical Journey from Nigeria to India",
    intro:
      "A well-planned medical journey usually follows several stages. A records-first sequence allows many questions to be addressed before leaving Lagos or Abuja.",
    steps: [
      { title: "Share medical records", body: "Send the diagnosis, medical summary, blood tests, imaging, pathology, previous treatment and current medicines." },
      { title: "Identify the relevant specialist", body: "The case is mapped to the appropriate specialty — for example breast cancer to surgical, medical and radiation oncology." },
      { title: "Obtain a medical opinion", body: "The hospital or specialist reviews the case and may recommend further investigations before confirming the treatment plan." },
      { title: "Compare treatment options", body: "Compare the hospital, doctor, treatment approach, estimated cost, expected duration, location and international-patient support." },
      { title: "Obtain hospital documentation", body: "The hospital can provide the invitation letter required for the Medical Visa through HCI Abuja or CGI Lagos." },
      { title: "Plan the visa", body: "Complete the regular Medical Visa process at the correct Indian mission. Do not assume e-Medical Visa eligibility." },
      { title: "Arrange travel", body: "Flights, airport transfers and accommodation can then be coordinated around the expected treatment schedule and visa decision." },
      { title: "Hospital admission and treatment", body: "The patient undergoes the investigations and treatment recommended by the medical team." },
      { title: "Recovery", body: "Obtain the discharge summary, investigation reports, operative notes, pathology, medication list and follow-up schedule." },
      { title: "Return to Nigeria", body: "Travel home only after the treating doctor clears the patient to fly." },
      { title: "Follow-up", body: "Ask which reports should be repeated and whether selected reviews can continue remotely." },
      { title: "Keep the records", body: "Carry complete discharge and follow-up documents for any later review in Nigeria or India." },
    ],
  },
  help: {
    heading: "How GAF Healthcare Supports Nigerian Patients",
    intro:
      "GAF Healthcare can help coordinate the medical-travel process from Nigeria to India. The exact services available should be confirmed before travel.",
    before: [
      "Medical case assessment and records review",
      "Hospital and specialist matching",
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
    note: "GAF Healthcare’s role is coordination, not a substitute for the treating doctor. Remote review cannot replace an in-person examination when one is medically necessary. Insurance coverage decisions remain with the insurer.",
  },
  opinion: {
    heading: "Why Get a Medical Opinion Before Travelling?",
    intro:
      "A preliminary review from Lagos or Abuja can help clarify the specialty, whether further information is required, potential treatment and hospital options, indicative cost and expected stay.",
    questions: [
      "What is the diagnosis, and does pathology need review?",
      "What treatment is recommended, and are there alternatives?",
      "Who will perform the procedure, and what investigations are required?",
      "What is included in the estimate — medicines, implants, ICU and investigations?",
      "How long should the patient remain in India, and when is it safe to fly home?",
      "Can follow-up be coordinated after returning to Nigeria?",
    ],
    close:
      "International treatment may not be appropriate when the patient requires emergency treatment, is medically unstable for long-distance travel, the treatment is readily available locally, or the patient is not medically fit to fly.",
  },
  choose: {
    heading: "How to Choose the Right Indian Hospital and Doctor",
    intro:
      "A hospital having a particular department does not necessarily mean it is appropriate for every form of that disease. The relevant doctor's experience with the patient's specific condition is more useful than the hospital's overall profile.",
    hospital: [
      "Does the hospital treat this specific condition?",
      "Does it have the required imaging, radiation, robotic systems or intensive care?",
      "Is the relevant specialist available, and does the hospital support international patients?",
      "Is the treatment estimate clear about inclusions, exclusions and possible additional charges?",
      "What happens if treatment takes longer?",
    ],
    specialist: [
      "Breast cancer → surgical oncologist, medical oncologist, radiation oncologist",
      "Prostate cancer → urologist or uro-oncologist, radiation oncologist, medical oncologist where required",
      "Heart blockage → cardiologist, interventional cardiologist, cardiac surgeon where required",
      "Brain tumour → neurosurgeon, and medical or radiation oncology where appropriate",
    ],
  },
  faqHeading: "Frequently Asked Questions",
  faqs: [
    {
      q: "Can Nigerian patients travel to India for medical treatment?",
      a: "Yes. Nigerian patients can travel to India for planned medical treatment subject to the applicable Indian visa and immigration requirements.",
    },
    {
      q: "Is Nigeria eligible for India's e-Medical Visa?",
      a: "Nigeria is not currently shown on the Government of India's e-Visa eligible-country list. The High Commission of India in Abuja also states that there is no e-Visa facility for Nigerian nationals. Nigerian patients should therefore verify and follow the applicable regular Medical Visa process rather than assuming e-Medical Visa eligibility.",
    },
    {
      q: "Is Niger Republic the same as Nigeria for India's e-Visa?",
      a: "No. Niger Republic and Nigeria are separate countries. The Government of India's e-Visa list separately identifies Niger Republic.",
    },
    {
      q: "Where do Nigerian patients apply for an Indian Medical Visa?",
      a: "Applications are submitted in person at the High Commission of India in Abuja or the Consulate General of India in Lagos, after completing the online regular visa form and selecting the correct mission.",
    },
    {
      q: "What are the most common treatments Nigerian patients seek in India?",
      a: "Patients may seek treatment for cancer, cardiac disease, neurosurgical conditions, orthopedics, joint replacement, urology, gastrointestinal conditions, fertility, pediatric diseases and transplantation, among other specialties.",
    },
    {
      q: "How much does medical treatment in India cost for Nigerian patients?",
      a: "There is no single cost. The price depends on diagnosis, hospital, doctor, procedure, room category, medicines, implants, investigations, ICU requirements and length of stay.",
    },
    {
      q: "Can I get a treatment estimate before travelling to India?",
      a: "Yes. Hospitals can often provide an indicative estimate after reviewing medical records. A final bill may change depending on clinical findings and treatment requirements.",
    },
    {
      q: "Can I get a second opinion from an Indian doctor?",
      a: "Yes. Patients can submit medical records, scans, pathology reports and previous treatment information for specialist review.",
    },
    {
      q: "How long should I stay in India?",
      a: "The duration depends on the treatment. Consultation may take several days, while major surgery, cancer treatment or complex procedures can require weeks or longer.",
    },
    {
      q: "Can my family member accompany me?",
      a: "The applicable visa rules determine whether and how an attendant can accompany a medical patient. The High Commission asks the Indian hospital invitation to identify attendants. Patients should verify the current requirements before travel.",
    },
    {
      q: "Which Indian cities can Nigerian patients consider?",
      a: "There is no single city that is appropriate for every condition. Delhi NCR, Mumbai, Chennai, Hyderabad, Bengaluru and Pune all have hospitals offering different specialist services. This page links city directories only for live GAF catalogue cities.",
    },
    {
      q: "Can cancer patients from Nigeria receive chemotherapy in India?",
      a: "Yes. Indian cancer centres provide chemotherapy for many types and stages of cancer. The regimen depends on the cancer type, stage, pathology and previous treatment.",
    },
    {
      q: "Can Nigerian patients receive radiation therapy in India?",
      a: "Yes. Radiation oncology centres in India provide different radiation techniques depending on the disease and treatment plan.",
    },
    {
      q: "Can Nigerian patients undergo IVF in India?",
      a: "International patients may seek IVF and other fertility services in India, subject to the applicable medical, legal and clinic-specific requirements. GAF does not yet publish a dedicated IVF page.",
    },
    {
      q: "Can children from Nigeria receive treatment in India?",
      a: "Yes. Indian tertiary hospitals have pediatric departments covering cardiac surgery, oncology, neurosurgery, orthopedics, gastroenterology, urology and other specialties.",
    },
    {
      q: "Do Nigerian patients need yellow fever and polio certificates?",
      a: "The High Commission of India in Abuja currently states that yellow-fever vaccination is compulsory except for infants under six months, and that Nigerian nationals require proof of polio vaccination within the previous 12 months, administered not less than four weeks before arrival. Confirm the live official notes before travel.",
    },
    {
      q: "Where do patients from Nigeria normally start their journey?",
      a: "International travel commonly begins from Murtala Muhammed International Airport in Lagos or Nnamdi Azikiwe International Airport in Abuja, depending on the itinerary.",
    },
    {
      q: "What should I send before requesting a medical opinion?",
      a: "Send the patient's diagnosis, medical summary, recent reports, scans, pathology, previous treatment details and current medications. For imaging cases, include the actual CT/MRI/PET images when available.",
    },
    {
      q: "Should I book flights before receiving the hospital opinion?",
      a: "For planned treatment, it is generally better to obtain the hospital's assessment, expected treatment schedule and applicable visa documentation before finalising non-refundable travel arrangements. The High Commission also advises against confirming travel until a visa decision has been made.",
    },
    {
      q: "Can GAF Healthcare help Nigerian patients choose a hospital in India?",
      a: "GAF Healthcare can assist with identifying relevant hospitals and specialists based on the patient's medical condition, treatment requirement, location and other practical considerations.",
    },
  ],
  finalCta: {
    heading: "Start Your Medical Treatment Journey from Nigeria to India",
    body: "If you are a patient from Nigeria considering treatment in India, you can begin by sharing your medical records with GAF Healthcare. The medical team can then help identify the appropriate specialty, hospitals and specialists for your case and guide you through the next steps.",
    primary: "Get a Medical Opinion",
    secondary: "Talk to a Medical Travel Expert",
    whatsappLabel: "WhatsApp +91 90443 46292",
    steps: "Get a Medical Opinion → Get Treatment Cost → Talk to a Medical Travel Expert",
  },
  disclaimer: {
    heading: "Important Medical Information",
    body: "This page is intended for general medical-travel information and should not replace advice from a qualified doctor. Cancer statistics are population-level estimates and cannot determine an individual's diagnosis or prognosis. Treatment suitability, diagnosis, treatment plans, costs, visa eligibility, travel requirements and expected outcomes vary between patients and can change over time. Patients should obtain an individual medical opinion and verify current visa and immigration requirements with official authorities before travelling.",
  },
  sources: {
    heading: "Sources",
    items: [
      {
        label: "Government of India — Official e-Visa portal",
        href: NIGERIA_OFFICIAL_LINKS.eVisa,
        detail: "Current e-Visa eligibility. Nigeria is not listed; Niger Republic is listed separately.",
      },
      {
        label: "Government of India — Country/territory-wise e-Visa fee list",
        href: NIGERIA_OFFICIAL_LINKS.eVisaFees,
        detail: "Official fee table used to confirm that Nigeria is not currently among e-Visa eligible countries.",
      },
      {
        label: "High Commission of India, Abuja — Visa instructions",
        href: NIGERIA_OFFICIAL_LINKS.hciVisa,
        detail: "Official statement that there is no e-Visa facility for Nigerian nationals, plus yellow-fever and polio notes.",
      },
      {
        label: "High Commission of India, Abuja — Medical Visa",
        href: NIGERIA_OFFICIAL_LINKS.hciMedical,
        detail: "Referral letter, Indian hospital invitation and supporting-document requirements.",
      },
      {
        label: "Consulate General of India, Lagos — Visa services",
        href: NIGERIA_OFFICIAL_LINKS.cgiLagos,
        detail: "Lagos consular jurisdiction, appointment process and advice to book flights after visa receipt.",
      },
      {
        label: "Ministry of External Affairs, India — India–Nigeria relations",
        href: NIGERIA_OFFICIAL_LINKS.meaBrief,
        detail: "Official record of Nigerian health-official visits, including the One World TB Summit and Advantage Healthcare India.",
      },
      {
        label: "High Commission of India, Abuja — India–Nigeria bilateral brief",
        href: NIGERIA_OFFICIAL_LINKS.hciBriefPdf,
        detail: "June 2026 mission brief confirming the same healthcare-related visits and the November 2024 State visit.",
      },
      {
        label: "IARC / WHO — GLOBOCAN 2022 Nigeria fact sheet",
        href: NIGERIA_OFFICIAL_LINKS.globocan,
        detail: "Estimated 152,261 new cases, 90,795 deaths and 292,934 five-year prevalent cases, with breast, prostate, cervix, colorectum and liver as leading sites.",
      },
      {
        label: "WHO — Nigeria health data overview",
        href: NIGERIA_OFFICIAL_LINKS.whoData,
        detail: "Country-level WHO health information.",
      },
      {
        label: "Ministry of Health and Family Welfare, India — IHR yellow-fever vaccination",
        href: NIGERIA_OFFICIAL_LINKS.mohfwYellowFever,
        detail: "India’s yellow-fever endemic-country list, which includes Nigeria, and certificate requirements.",
      },
      {
        label: "Government of India — Bureau of Immigration",
        href: NIGERIA_OFFICIAL_LINKS.boi,
        detail: "Entry and immigration instructions for travellers arriving in India.",
      },
    ],
  },
};
