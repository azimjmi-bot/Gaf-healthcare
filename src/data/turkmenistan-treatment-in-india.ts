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

export const TURKMENISTAN_PAGE_PATH = "/turkmenistan/treatment-in-india";
export const TURKMENISTAN_PAGE_LOCALES = ["en"] as const;
export const TURKMENISTAN_LAST_REVIEWED = "2026-10-04";

export type TurkmenistanPageCopy = typeof turkmenistanPageCopyEn;

export function turkmenistanPageCopy(_locale: AppLocale): TurkmenistanPageCopy {
  return turkmenistanPageCopyEn;
}

const INDIA = "India";

export const TURKMENISTAN_OFFICIAL_LINKS = {
  eVisa: "https://indianvisaonline.gov.in/evisa/tvoa.html",
  eVisaHome: "https://indianvisaonline.gov.in/evisa/",
  eVisaFees: "https://indianvisaonline.gov.in/evisa/eTV_revised_fee_final.pdf",
  visaOnline: "https://indianvisaonline.gov.in/visa/",
  embassy: "https://eoiashgabat.gov.in/",
  embassyVisa: "https://eoiashgabat.gov.in/visa-services.php",
  embassyEvisa: "https://eoiashgabat.gov.in/info-on-visa.php",
  meaBrief: "https://www.mea.gov.in/Portal/ForeignRelation/India-Turkmenistan-Feb-2025.pdf",
  globocan: "https://gco.iarc.who.int/media/globocan/factsheets/populations/795-turkmenistan-fact-sheet.pdf",
  iarcToday: "https://gco.iarc.who.int/today/en/fact-sheets-populations",
  whoData: "https://data.who.int/countries/795",
  mohfwYellowFever: "https://ihpoe.mohfw.gov.in/vaccination.php",
  boi: "https://boi.gov.in",
} as const;

export const TURKMENISTAN_CURATED_TREATMENT_SLUGS = [
  "breast-cancer-treatment-in-india",
  "cervical-cancer-treatment-in-india",
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
  "lymphoma-treatment-in-india",
] as const;

export const TURKMENISTAN_CANCER_TREATMENT_SLUGS = TANZANIA_CANCER_TREATMENT_SLUGS;

export const TURKMENISTAN_COST_PROCEDURE_NAMES = [
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

export const TURKMENISTAN_DOCTOR_SPECIALTY_SLUGS = [
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

export function resolveTurkmenistanCostRows(catalog: Treatment[]) {
  return TURKMENISTAN_COST_PROCEDURE_NAMES.map((name) => {
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

export function turkmenistanDoctors(doctors: Doctor[]) {
  return TURKMENISTAN_DOCTOR_SPECIALTY_SLUGS.map((specialtySlug) => {
    const pool = doctors.filter((doctor) => doctor.specialtySlug === specialtySlug);
    const featured = pool.find((doctor) => doctor.featured);
    return featured ?? [...pool].sort((a, b) => a.name.localeCompare(b.name))[0];
  }).filter((row): row is Doctor => Boolean(row));
}

export const turkmenistanPageCopyEn = {
  seo: {
    title: "Medical Treatment in India for Turkmen Patients",
    description:
      "Explore medical treatment in India for Turkmen patients. Find specialist doctors, hospitals, treatments, indicative costs, Medical Visa guidance and support from GAF Healthcare.",
    keywords: [
      "medical treatment in India for Turkmen patients",
      "treatment in India from Turkmenistan",
      "medical tourism from Turkmenistan to India",
      "India medical treatment for Turkmen patients",
      "Indian hospitals for Turkmen patients",
      "Indian doctors for Turkmen patients",
      "medical treatment cost in India for Turkmen patients",
      "cancer treatment in India for Turkmen patients",
      "cardiac treatment in India for Turkmen patients",
      "heart surgery in India for Turkmen patients",
      "neurosurgery in India for Turkmen patients",
      "orthopaedic treatment in India for Turkmen patients",
      "IVF in India for Turkmen patients",
      "Medical Visa India for Turkmen citizens",
      "Indian Medical Visa from Turkmenistan",
      "Medical Visa from Ashgabat to India",
      "treatment in India from Ashgabat",
      "treatment in India from Turkmenabat",
      "treatment in India from Mary",
      "treatment in India from Daşoguz",
      "medical tourism India Turkmenistan",
      "healthcare in India for Turkmen patients",
      "India Turkmenistan healthcare cooperation",
      "India Central Asia medical tourism",
    ],
  },
  breadcrumb: {
    home: "Home",
    turkmenistan: "Turkmenistan",
    page: "Treatment in India",
  },
  hero: {
    eyebrow: "Medical treatment in India for Turkmen patients",
    h1: "Medical Treatment in India for Turkmen Patients",
    lede:
      "For a patient travelling from Turkmenistan, the process can begin before a flight is booked. GAF Healthcare helps Turkmen patients share records from Ashgabat, Türkmenabat, Mary, Daşoguz, Balkanabat, Türkmenbaşy and other cities with an appropriate Indian specialist, then plan the hospital invitation, Embassy Medical Visa, travel and follow-up around that medical requirement.",
    primaryCta: "Get a Medical Opinion",
    secondaryCta: "Explore Treatments",
    whatsappLabel: "WhatsApp +91 90443 46292",
  },
  quickAnswer: {
    heading: "Quick Answer: Medical Treatment in India for Turkmen Patients",
    items: [
      {
        question: "Can Turkmen patients travel to India for medical treatment?",
        answer:
          "Yes. Turkmen citizens can apply for an Indian Medical Visa for treatment at recognised hospitals and clinics. The Embassy of India in Ashgabat specifically lists Medical Visa and Medical & Attendant categories. Its current instructions state that medical applicants must provide medical documents and a hospital invitation letter.",
      },
      {
        question: "Can Turkmen citizens use India's e-Medical Visa?",
        answer:
          "The visa position for Turkmenistan should be checked carefully before applying. The current Embassy of India in Ashgabat publishes a regular Medical Visa route for Turkmen citizens and instructs applicants to complete the visa application online, print and sign it, and submit it at the Embassy with supporting documents. Because third-party websites currently publish conflicting information about Turkmenistan's e-Visa eligibility, GAF Healthcare should not promise an e-Medical Visa to a Turkmen passport holder without checking the live Government of India eligibility list for the individual applicant. For this page, the safest planning assumption is: Turkmenistan → Indian hospital acceptance → Medical Visa documentation → Embassy of India, Ashgabat → India.",
      },
      {
        question: "What treatments can Turkmen patients seek in India?",
        answer:
          "Depending on the diagnosis, patients may explore cancer treatment, cardiology and cardiac surgery, neurosurgery, orthopaedic surgery, knee and hip replacement, spine surgery, urology, gastroenterology, liver and pancreatic surgery, kidney treatment, organ transplantation, IVF and fertility treatment, paediatric treatment, robotic and minimally invasive surgery, radiation oncology, chemotherapy, immunotherapy, targeted therapy, precision oncology and complex second opinions.",
      },
      {
        question: "How much does treatment in India cost for Turkmen patients?",
        answer:
          "There is no single price for any major treatment. The final estimate depends on the diagnosis, disease stage, hospital, specialist, procedure, medicines, implants, investigations, ICU requirements, length of stay and possible complications. A hospital-specific quotation should be obtained after the patient's medical records have been reviewed.",
      },
    ],
  },
  why: {
    heading: "Why Turkmen Patients Consider Medical Treatment in India",
    intro:
      "Travelling from Turkmenistan to India for healthcare is a significant decision for the patient and family. The best starting point is not the hospital. It is the medical problem, and which specialist should review it.",
    points: [
      "A practical pathway is diagnosis, specialty, treatment, doctor, hospital, cost, hospital invitation, Medical Visa and then travel",
      "India has tertiary and quaternary hospitals covering cancer, cardiac care, neurosurgery, orthopaedics, urology, gastroenterology, fertility, paediatrics and selected transplantation",
      "Official MEA records describe diplomatic relations since 1992, pharmaceutical exports and a 2015 Yoga and Traditional Medicine Centre in Ashgabat",
      "Multidisciplinary assessment can be useful when surgery, oncology, diagnostics and rehabilitation need to be coordinated",
      "A second medical opinion can be requested from existing records before a flight is booked",
    ],
    close:
      "The appropriate hospital still depends on the individual patient's medical requirements. India should not automatically be considered appropriate for every patient.",
  },
  relationship: {
    heading: "India–Turkmenistan Healthcare Relationship",
    paragraphs: [
      "India and Turkmenistan have maintained diplomatic relations since April 1992. The official MEA bilateral brief records that India recognised Turkmenistan’s independence in December 1991, established formal diplomatic relations in April 1992 and opened a resident Mission in Ashgabat in January 1994.",
      "During Prime Minister Narendra Modi’s visit to Ashgabat on 10–11 July 2015, he inaugurated the Yoga and Traditional Medicine Centre, described in the official brief as the first of its kind in Central Asia. Seven MoUs were signed during that visit, including in yoga and Ayurveda, science and technology, tourism, defence and sports.",
      "The same official brief identifies pharmaceuticals among India’s major exports to Turkmenistan. An agreement on cooperation in science and technology was signed in May 2010, and healthcare is listed among the key areas identified for bilateral S&T cooperation.",
      "MEA records also note that an AYUSH Ayurveda expert has offered free consultations and lectures at Turkmen institutes, including the State Medical University in Ashgabat, and that International Day of Yoga has been celebrated in Turkmenistan every year since 2015.",
      "Turkmenistan has participated in the India–Central Asia Dialogue since the first ministerial meeting in Samarkand in January 2019. These regional frameworks provide useful context. They do not determine which treatment is appropriate for an individual patient.",
    ],
  },
  context: {
    heading: "Healthcare Needs in Turkmenistan",
    intro:
      "Turkmenistan has public healthcare services, while some patients still travel when they want a particular subspecialist, a second opinion, an advanced procedure or a multidisciplinary pathway they have chosen to access in India.",
    points: [
      "WHO country data for Turkmenistan identify noncommunicable diseases as an important part of the national health profile. These country-level indicators do not determine an individual patient's treatment pathway.",
      "Turkmen is the official language of Turkmenistan, and Russian is widely used. Indian hospitals generally use English for medical records and specialist consultations. Turkmen- or Russian-language support can be arranged when needed, and important records may need English translation for specialist review.",
      "Most international medical journeys begin at Ashgabat International Airport. Patients travelling from Türkmenabat, Daşoguz, Mary, Balkanabat, Türkmenbaşy or other regions may first need to reach Ashgabat.",
      "For some patients, appropriate treatment is already available in Turkmenistan. International treatment may become relevant when a particular specialist, technology, multidisciplinary service or second opinion is required.",
      "Patients should always provide their current medication list to the treating Indian specialist and should not independently change medicines because an equivalent-looking product is available.",
    ],
    close:
      "Country-level health indicators do not determine an individual's medical needs. The relevant question is: what is the patient's diagnosis, what treatment is appropriate, and can the patient safely travel for that treatment?",
  },
  overview: {
    heading: "What Medical Treatments Can Turkmen Patients Get in India?",
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
    heading: "Popular Medical Treatments for Turkmen Patients in India",
    intro:
      "Each card links only to a live GAF specialty or treatment page. Where GAF does not yet publish a dedicated page, the category is explained without an invented URL.",
    categories: [
      {
        title: "Cancer Treatment",
        body: "Medical, surgical and radiation oncology, including breast, cervical, colorectal, prostate and lymphoma pathways that already have GAF guides. Stomach-cancer, lung-cancer and oesophageal-cancer cases are coordinated after records review because dedicated pages are not yet published.",
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
        body: "Turkmen patients may explore IVF, ICSI, IUI and related fertility evaluation in India. GAF does not yet publish a dedicated IVF page. Eligibility, laboratory procedures and applicable Indian regulations should be confirmed with the treating fertility centre before travel.",
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
          { label: "Stomach Cancer", href: "" },
          { label: "Lung Cancer", href: "" },
          { label: "Oesophageal Cancer", href: "" },
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
    heading: "Cancer Treatment in India for Turkmen Patients",
    intro:
      "Cancer is one of the most important treatment areas for Turkmen patients seeking specialised healthcare. According to the IARC GLOBOCAN 2024 Turkmenistan fact sheet, the country had an estimated 7,659 new cancer cases, 4,496 cancer deaths and 18,497 five-year prevalent cases. These are GLOBOCAN 2024 estimates, not current 2026 case counts, and they should not be interpreted as an individual's diagnosis or prognosis.",
    body: "The same official fact sheet ranks breast first among estimated new cases in both sexes (1,398; 18.3%), followed by stomach (563; 7.4%), lung (525; 6.9%), oesophagus (472; 6.2%) and cervix uteri (392; 5.1%). Among Turkmen women, breast cancer was the leading site (1,398; 32.1%), followed by cervix. Among Turkmen men, lung cancer was the leading site (390; 11.8%), followed by stomach and prostate. GAF does not yet publish dedicated stomach-cancer, lung-cancer or oesophageal-cancer pages; those cases are coordinated through the relevant oncology team after records review.",
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
    heading: "How Much Does Medical Treatment in India Cost for Turkmen Patients?",
    intro:
      "There is no universal treatment price for Turkmen patients. Two patients undergoing the same named procedure can have very different clinical requirements. GAF Healthcare presents costs as USD planning estimates from the live catalogue, not hospital quotations.",
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
    heading: "Which Indian Cities Can Turkmen Patients Consider?",
    intro:
      "The appropriate city depends on the medical condition and treatment. There is no single Indian city that is appropriate for every Turkmen patient.",
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
    heading: "How Should Turkmen Patients Choose an Indian Hospital?",
    intro:
      "Start with the diagnosis. Ask whether the hospital treats the specific disease, whether the required specialty and surgeon or oncologist are available, whether ICU and advanced diagnostics are in place, whether international-patient services exist, whether the quotation is transparent, and what follow-up arrangements are available. The campuses below are drawn from GAF’s live India catalogue, one from each published city.",
    directoryLabel: "Browse hospitals in India",
  },
  doctors: {
    heading: "How Should Turkmen Patients Choose the Right Doctor?",
    intro:
      "The doctor should be matched to the patient's diagnosis and procedure. A useful structure is specialty, subspecialty, procedure, city, hospital and then doctor. The specialists below are taken from GAF’s live doctor catalogue.",
    directoryLabel: "Browse doctors in India",
  },
  visa: {
    heading: "Indian Medical Visa for Turkmen Patients",
    intro:
      "Turkmenistan is not currently listed on the Government of India’s official e-Visa fee list. The planning route is therefore a regular Medical Visa through the Embassy of India in Ashgabat. The Embassy lists Medical Visa and Medical & Attendant categories and states that medical applicants must provide medical documents and a hospital invitation letter.",
    points: [
      "Complete the visa application online on the official Government of India visa portal, then print and sign it. Submit the application, photographs and supporting documents at the Embassy.",
      "The Embassy’s published fee table, effective from 1 April 2017, lists Medical & Attendant visas at US$83 for up to six months and US$123 for six months to one year. Fees are paid in US dollars. Recheck the live amount before applying.",
      "The Embassy currently states that the passport should have at least six months’ validity.",
      "The Embassy’s visa-services page currently describes processing as normally three to five working days, which may vary by category and nationality. This is a published note, not a guaranteed timeline.",
      "Do not assume that India’s e-Medical Visa or e-Medical Attendant Visa rules apply to a regular Medical Visa from Ashgabat. Confirm attendant requirements with the Embassy for the specific application.",
      "Do not use a third-party website that claims to guarantee an Indian e-Medical Visa for a Turkmen passport. The official e-Visa fee list is the eligibility gate, and Turkmenistan is not currently listed there.",
    ],
    feesHeading: "Embassy of India, Ashgabat — published Medical & Attendant fees",
    fees: [
      { category: "Medical & Attendant — up to 6 months", fee: "US$83" },
      { category: "Medical & Attendant — 6 months to 1 year", fee: "US$123" },
    ],
    disclaimer:
      "Visa rules, fees, documents and entry regulations can change. Verify the current Embassy of India in Ashgabat instructions and the official Indian visa portal immediately before applying or travelling.",
    documentsHeading: "Documents for an Indian Medical Visa from Turkmenistan",
    documents: [
      "Passport with at least six months’ validity",
      "Completed and signed online visa application and recent photographs",
      "Medical documents and an Indian hospital invitation letter",
      "Residence visa or permit for non-Turkmen nationals applying in Ashgabat",
      "Attendant passports and documents where a family member will travel",
      "Yellow-fever vaccination certificate if the traveller has recently been in, or transited landside through, a listed endemic country",
    ],
    documentsNote:
      "Patients should determine which visa route applies to their circumstances rather than submitting documents based on an outdated third-party checklist. The Embassy of India in Ashgabat should be treated as the Mission authority for current Medical Visa requirements.",
  },
  yellowFever: {
    heading: "Yellow Fever and Health-Entry Requirements for Turkmen Travellers",
    intro:
      "Turkmenistan is not listed among yellow-fever endemic countries on India's IHR points-of-entry guidance. A yellow-fever certificate can still be required if the traveller has recently been in, or transited landside through, a listed endemic country.",
    points: [
      "India's IHR guidance states that a yellow-fever certificate becomes valid 10 days after vaccination where one is required.",
      "Carry the original certificate when a certificate is required. Photocopies or digital copies can be treated as insufficient at the border.",
      "The Embassy of India in Ashgabat currently publishes Medical Visa notes and regular visa-service information. Confirm any additional Mission-specific health-entry documents before departure.",
      "Requirements can change according to connecting airports and current public-health regulations.",
    ],
    close:
      "Confirm the current requirement on the official Indian visa portal, the Bureau of Immigration, India's IHR yellow-fever list and the Embassy of India in Ashgabat before travel.",
  },
  travel: {
    heading: "Travelling from Turkmenistan to India for Medical Treatment",
    intro:
      "For many Turkmen patients, the international medical journey begins in Ashgabat and continues through Ashgabat International Airport. Patients may also travel from Türkmenabat, Daşoguz, Mary, Balkanabat, Türkmenbaşy or other cities.",
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
    heading: "Documents Turkmen Patients Should Prepare",
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
    heading: "Accommodation, Food and Language for Turkmen Patients",
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
      "Turkmen is the official language of Turkmenistan, and Russian is widely used. Indian hospitals generally use English for medical documentation and specialist consultations. Turkmen- or Russian-language support can be arranged where needed. Patients should never sign medical consent documentation they do not understand.",
  },
  stay: {
    heading: "How Long Will a Turkmen Patient Need to Stay in India?",
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
      "If you are considering treatment in India, begin with your medical records rather than your flight booking. A records-first sequence allows many questions to be addressed before leaving Ashgabat.",
    steps: [
      { title: "Share medical records", body: "Send the relevant reports and a concise medical history." },
      { title: "Get an Indian specialist opinion", body: "The appropriate specialist reviews the available records. A remote opinion does not replace an in-person examination." },
      { title: "Understand treatment options", body: "Discuss the proposed treatment, alternatives and expected timeline." },
      { title: "Select the hospital and doctor", body: "Choose according to the medical requirement." },
      { title: "Receive hospital confirmation", body: "The hospital confirms the consultation or treatment pathway." },
      { title: "Obtain a hospital invitation", body: "Request the medical invitation or treatment letter required for the Embassy Medical Visa." },
      { title: "Apply for the Indian Medical Visa", body: "Complete the official online application, then submit the printed form and documents at the Embassy of India in Ashgabat." },
      { title: "Arrange travel", body: "Plan flights, accommodation and local transportation around the confirmed hospital schedule after the visa is issued." },
      { title: "Arrive in India", body: "Proceed to the hospital for consultation and evaluation." },
      { title: "Complete investigations and begin treatment", body: "The treating team may repeat or update diagnostic tests before confirming the final plan." },
      { title: "Recovery and discharge", body: "The hospital provides medication and follow-up instructions." },
      { title: "Return to Turkmenistan and continue follow-up", body: "Travel home when medically fit and maintain follow-up with the Indian treating team and local healthcare professionals." },
    ],
  },
  help: {
    heading: "How GAF Healthcare Can Support Turkmen Patients",
    intro:
      "GAF Healthcare can coordinate the medical journey between Turkmenistan and India. The exact services available should be confirmed before travel. Medical decisions remain with the patient and treating medical professionals.",
    before: [
      "Medical-record collection and specialist matching",
      "Hospital coordination and second-opinion coordination",
      "Treatment-cost requests and hospital-invitation coordination",
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
    heading: "Can Turkmen Patients Get a Second Medical Opinion from India?",
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
      "What happens after returning to Turkmenistan?",
    ],
    specialist: [
      "Breast cancer → breast or surgical oncologist, medical oncologist, radiation oncologist",
      "Cervical cancer → gynaecologic oncologist, medical oncologist, radiation oncologist",
      "Stomach or oesophageal disease → surgical oncologist or GI surgeon, medical oncologist where required",
      "Heart disease → cardiologist, interventional cardiologist, cardiac surgeon where required",
    ],
  },
  faqHeading: "Frequently Asked Questions",
  faqs: [
    {
      q: "Can Turkmen citizens get medical treatment in India?",
      a: "Yes. Turkmen citizens can apply for an Indian Medical Visa for treatment at recognised hospitals and clinics.",
    },
    {
      q: "Can Turkmen citizens get an Indian Medical Visa from Ashgabat?",
      a: "Yes. The Embassy of India in Ashgabat provides Medical Visa services for Turkmen citizens. Its current instructions require medical documentation and a hospital invitation letter.",
    },
    {
      q: "Can Turkmen citizens apply for India's e-Medical Visa?",
      a: "Visa eligibility should be verified on the current official Government of India e-Visa list before applying. Turkmenistan is not currently listed on the official e-Visa fee list. The Embassy of India in Ashgabat provides a regular Medical Visa route. GAF Healthcare should therefore confirm the live official status for each patient rather than promising an e-Medical Visa.",
    },
    {
      q: "What documents are needed for an Indian Medical Visa from Turkmenistan?",
      a: "The Embassy states that medical applicants need medical documents and a hospital invitation letter. Applicants should also prepare the completed visa application, passport and photographs and verify the latest mission-specific checklist before submission.",
    },
    {
      q: "How much does an Indian Medical Visa cost for Turkmen patients?",
      a: "The Embassy of India in Ashgabat currently publishes Medical & Attendant fees of US$83 for up to six months and US$123 for six months to one year. Fees should be reconfirmed before application.",
    },
    {
      q: "Can a family member accompany a Turkmen patient?",
      a: "Yes. The Embassy publishes Medical & Attendant visa categories. The attendant should apply using the applicable category and documents for the patient's medical journey. Do not assume that e-Medical Attendant Visa rules automatically apply.",
    },
    {
      q: "Do Turkmen patients need a yellow-fever certificate?",
      a: "Turkmenistan is not listed among yellow-fever endemic countries on India's IHR points-of-entry guidance. A certificate can still be required if the traveller has recently been in, or transited landside through, a listed endemic country.",
    },
    {
      q: "How much does medical treatment in India cost for Turkmen patients?",
      a: "There is no fixed price. Cost depends on diagnosis, treatment, hospital, specialist, medicines, investigations, implants, ICU care and length of stay. GAF presents USD planning estimates, not guaranteed hospital quotations.",
    },
    {
      q: "What cancers are common in Turkmenistan?",
      a: "GLOBOCAN 2024 estimates 7,659 new cancer cases and 4,496 cancer deaths in Turkmenistan. The leading sites by estimated new cases among both sexes were breast, stomach, lung, oesophagus and cervix. These are population-level estimates, not an individual diagnosis.",
    },
    {
      q: "Can Turkmen patients get cancer treatment in India?",
      a: "Yes. Indian oncology centres provide surgery, chemotherapy, radiation therapy, immunotherapy, targeted therapy, precision oncology and other treatments depending on the diagnosis and clinical indication.",
    },
    {
      q: "Can I get a treatment estimate before travelling from Turkmenistan?",
      a: "Yes. Medical records can be submitted for preliminary specialist review and an indicative hospital estimate can be requested.",
    },
    {
      q: "Can I send my medical reports from Ashgabat?",
      a: "Yes. Patients from Ashgabat, Türkmenabat, Mary, Daşoguz, Balkanabat, Türkmenbaşy and other parts of Turkmenistan can share records before travel. Indian hospitals may request English translations of important Turkmen- or Russian-language records.",
    },
    {
      q: "Can patients from other parts of Turkmenistan travel to India?",
      a: "Yes. Patients from Türkmenabat, Mary, Daşoguz, Balkanabat, Türkmenbaşy and other regions can use the same medical-treatment pathway, subject to applicable travel and visa requirements.",
    },
    {
      q: "Can I get a second opinion from an Indian specialist?",
      a: "Yes. Medical records can be shared with an appropriate Indian specialist for preliminary second-opinion review before travel. A remote opinion does not replace an in-person examination when one is clinically necessary.",
    },
    {
      q: "Which Indian cities can Turkmen patients consider?",
      a: "There is no universal best city. Delhi NCR, Mumbai, Chennai, Hyderabad and Bengaluru are live GAF catalogue cities. Pune can also be considered, but this page does not link to a Pune directory because that city is not yet in the live catalogue. The appropriate city depends on the diagnosis and required specialty.",
    },
    {
      q: "How long should I stay in India?",
      a: "The duration depends on the treatment. A consultation may require a short visit, while surgery, radiation therapy, chemotherapy or transplantation may require a substantially longer stay.",
    },
    {
      q: "Does India have healthcare cooperation with Turkmenistan?",
      a: "Yes. Official MEA records describe diplomatic relations since 1992, pharmaceutical exports, a 2015 Yoga and Traditional Medicine Centre in Ashgabat, and healthcare as a listed area of science-and-technology cooperation. Turkmenistan also participates in the India–Central Asia Dialogue.",
    },
    {
      q: "Can Turkmen medical records be submitted in Turkmen or Russian?",
      a: "They can be submitted for preliminary coordination, but Indian hospitals may request English translations of important records. Pathology, imaging and treatment summaries are particularly important.",
    },
    {
      q: "Can Turkmen patients receive communication support in Russian?",
      a: "Communication support can be coordinated where required. Indian hospitals generally use English for clinical communication, so Turkmen- or Russian-language assistance can be useful for complex treatment.",
    },
    {
      q: "Can Turkmen patients get heart surgery in India?",
      a: "Yes. Indian cardiac centres provide procedures including angioplasty, CABG, valve surgery, electrophysiology and other cardiac treatments, subject to specialist assessment.",
    },
    {
      q: "Can Turkmen patients get IVF treatment in India?",
      a: "Yes. Indian fertility centres provide IVF, ICSI, IUI, embryo-transfer procedures and other fertility services subject to medical and applicable legal requirements. GAF does not yet publish a dedicated IVF page.",
    },
    {
      q: "Is India right for every Turkmen patient?",
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
      a: "It is generally better to wait until the hospital invitation has been issued and the Embassy has granted the Medical Visa before making non-refundable travel arrangements.",
    },
  ],
  finalCta: {
    heading: "Start Your Medical Treatment Journey from Turkmenistan to India",
    body: "If you or a family member in Turkmenistan is considering treatment in India, the most useful first step is to share the patient's medical information. Send the diagnosis, medical reports, scans and previous treatment records to GAF Healthcare.",
    primary: "Get a Medical Opinion",
    secondary: "Talk to a Medical Travel Expert",
    whatsappLabel: "WhatsApp +91 90443 46292",
    steps: "Share your medical records → Get a specialist opinion → Review hospital and treatment options → Plan your journey to India",
  },
  disclaimer: {
    heading: "Medical Disclaimer",
    body: "This page is intended for general education and medical-travel planning. It does not replace advice from a qualified healthcare professional. Cancer statistics are population-level estimates and cannot determine an individual's diagnosis or prognosis. Treatment costs are indicative and can change. Visa requirements, fees, documentation and immigration regulations can change. Turkmen patients should verify the latest requirements with the Embassy of India in Ashgabat before travelling.",
  },
  sources: {
    heading: "Sources",
    items: [
      {
        label: "Embassy of India, Ashgabat — visa services",
        href: TURKMENISTAN_OFFICIAL_LINKS.embassyVisa,
        detail: "Lists Medical Visa as a category and states that medical documents are required.",
      },
      {
        label: "Embassy of India, Ashgabat — information on visas",
        href: TURKMENISTAN_OFFICIAL_LINKS.embassyEvisa,
        detail: "Published Medical & Attendant fees of US$83 and US$123, and the requirement for medical documents and a hospital invitation letter.",
      },
      {
        label: "Embassy of India, Ashgabat",
        href: TURKMENISTAN_OFFICIAL_LINKS.embassy,
        detail: "Official Mission website for visa, consular and bilateral information.",
      },
      {
        label: "Government of India — Official Indian visa portal",
        href: TURKMENISTAN_OFFICIAL_LINKS.visaOnline,
        detail: "Online application form used before Embassy submission.",
      },
      {
        label: "Government of India — Country/territory-wise e-Visa fee list",
        href: TURKMENISTAN_OFFICIAL_LINKS.eVisaFees,
        detail: "Official eligibility gate. Turkmenistan is not currently listed.",
      },
      {
        label: "Ministry of External Affairs, India — India–Turkmenistan bilateral brief, February 2025",
        href: TURKMENISTAN_OFFICIAL_LINKS.meaBrief,
        detail: "Diplomatic relations from April 1992, 2015 Yoga and Traditional Medicine Centre, pharmaceutical exports and India–Central Asia Dialogue participation.",
      },
      {
        label: "IARC / WHO — GLOBOCAN 2024 Turkmenistan fact sheet",
        href: TURKMENISTAN_OFFICIAL_LINKS.globocan,
        detail: "Estimated 7,659 new cases, 4,496 deaths and 18,497 five-year prevalent cases, with breast, stomach, lung, oesophagus and cervix as leading sites.",
      },
      {
        label: "WHO — Turkmenistan health data overview",
        href: TURKMENISTAN_OFFICIAL_LINKS.whoData,
        detail: "Country-level WHO health information and health-system indicators.",
      },
      {
        label: "Ministry of Health and Family Welfare, India — IHR yellow-fever vaccination",
        href: TURKMENISTAN_OFFICIAL_LINKS.mohfwYellowFever,
        detail: "India’s yellow-fever endemic-country list. Turkmenistan is not listed as an endemic country of departure.",
      },
      {
        label: "Government of India — Bureau of Immigration",
        href: TURKMENISTAN_OFFICIAL_LINKS.boi,
        detail: "Entry and immigration instructions for travellers arriving in India.",
      },
    ],
  },
};
