import type { CostArticle } from "./types";
import { cytoreductiveSurgeryCities } from "./cytoreductive-surgery-cities";

export const cytoreductiveSurgery: CostArticle = {
  procedure: "Cytoreductive Surgery",
  shortName: "cytoreductive surgery",
  briefName: "Cytoreductive Surgery",
  duration: "typically 6–12 hours; longer when HIPEC is added",
  recoveryGlance: "Inpatient [STAY] for CRS as quoted. Longer when HIPEC is named. Varies by patient.",
  slug: "cytoreductive-surgery",
  lastUpdated: "2026-09-10",
  seoTitle: "Cytoreductive Surgery Cost in India: CRS, HIPEC, Cities & Hospitals",
  seoDescription:
    "Cytoreductive surgery cost in India is typically [INDIA_COST] for CRS as quoted and a stay of [STAY], against [US_COST] self-pay in the US. Compare CRS versus CRS + HIPEC, cities, listed specialists and hospitals.",
  heading: "Cytoreductive Surgery Cost in India",
  heroSubtitle:
    "Compare cytoreductive surgery planning ranges in India, see how CRS versus CRS + HIPEC changes a hospital quotation, and explore listed peritoneal-surgery specialists across major Indian cities.",
  introduction: [
    "Families usually search cytoreductive surgery cost after imaging has shown tumour on the peritoneum — the lining of the abdomen — and someone has used the words CRS or HIPEC. Cytoreductive surgery, or CRS, is an extensive operation intended to remove visible peritoneal deposits in selected patients. It is not standard for every peritoneal cancer, and it is not the same letter as CRS plus heated intraperitoneal chemotherapy.",
    "Complexity follows tumour burden, which organs come out, whether HIPEC is planned, and how many ICU nights the letter names. Cost in India sits in a GAF planning range — currently [INDIA_COST] for CRS as quoted and a stay of [STAY]. That band is not a hospital quotation and not a CRS + HIPEC price. A neighbouring catalog sheet exists when HIPEC is named. Surgery cost is not total cancer treatment cost.",
  ],
  overviewHeading: "What is cytoreductive surgery?",
  whoHeading: "Who may be a candidate for cytoreductive surgery?",

  answer: [
    "Cytoreductive surgery cost in India typically ranges from [INDIA_COST] for CRS as quoted, anaesthesia, histopathology and a hospital stay of [STAY]. Typical US self-pay is [US_COST]. Theatre time is usually about six to twelve hours, longer when HIPEC is added. HIPEC is not included unless the letter names it.",
    "That figure is a planning range, not a hospital quotation. CRS and CRS + HIPEC are different letters. A dedicated GAF sheet exists for Cytoreductive Surgery with HIPEC. A typical CRS estimate covers the named surgeon, operating room, anaesthesia, quoted nights including ICU if named, routine inpatient medicines and specimen pathology. HIPEC drugs, extra organ resections, CT, molecular tests, systemic chemotherapy and extra fistula or leak days are frequently not.",
    "What moves the number most is CRS alone versus CRS + HIPEC, peritoneal tumour burden, organ resections, named ICU nights, campus tier and the named consultant. International patients should budget the weeks around the knife — not only the theatre block.",
  ],

  indiaCost: [
    "There is no single CRS price in India, because there is no single peritoneal sitting. The [INDIA_COST] band is a planning range for cytoreductive surgery as quoted — theatre, anaesthesia, the named surgeon, quoted room and nights, routine inpatient drugs, ICU as written, and histopathology. Limited cytoreduction at a mid-tier campus sits toward the lower end. A complete clearance with several organ resections at a flagship campus sits toward the upper end — still without assuming HIPEC.",
    "CRS + HIPEC is a neighbouring catalog sitting with a different planning range and a longer typical stay. Do not treat this family band as a HIPEC package. Surgery cost is not total cancer treatment cost. Staging, systemic therapy and later surveillance sit on neighbouring estimates.",
  ],

  costComponents: [
    { label: "Surgeon fee and surgical team", detail: "Usually bundled for the named surgical oncologist. Confirm who is in theatre and whether a gynaecologic oncologist is billed separately on an ovarian case." },
    { label: "Hospital and operating-room charges", detail: "Theatre time for a six-to-twelve-hour sitting. HIPEC hardware and drugs, when used, belong on the HIPEC letter unless this estimate names them." },
    { label: "Anaesthesia", detail: "Anaesthetist fee and drugs for a long case. Cardiopulmonary clearance may be billed outside." },
    { label: "ICU and critical-care monitoring", detail: "Early high-dependency care is common after extensive cytoreduction. Nights inside the quoted stay may be bundled; extra days after a leak or sepsis are typically extra." },
    { label: "HIPEC drugs and circuit", detail: "May be included only if the letter is CRS + HIPEC. On this CRS sheet they are typically additional or sit on the neighbouring HIPEC estimate." },
    { label: "Pathology", detail: "Processing of specimens and margins. Molecular assays, when ordered, are often billed later." },
    { label: "Room charges and nursing", detail: "Written against a room category and nights — typically [STAY] for CRS as quoted." },
  ],

  whyQuotesDiffer:
    "Two honest estimates can differ because the operations are not the same. CRS is not CRS + HIPEC. Limited cytoreduction is not a complete clearance with several organ resections. Named ICU nights are not extra leak days. Campus tier and the named surgeon move the bill more than the city on the boarding pass. Higher cost is not a measure of better care.",

  costDrivers: [
    { label: "CRS alone versus CRS + HIPEC", detail: "HIPEC drugs, circuit time and a longer stay sit on a neighbouring GAF sheet. Ask which sitting the letter names." },
    { label: "Cancer type and peritoneal tumour burden", detail: "Colorectal, appendiceal, ovarian and gastric peritoneal disease are planned differently. Extent and distribution change theatre time." },
    { label: "Surgical complexity and organ resections", detail: "Bowel, spleen, gallbladder or peritoneal stripping lengthen the sitting. Ask what the letter assumes." },
    { label: "HIPEC drug and protocol, when used", detail: "Agent, duration and temperature are a clinical protocol, not a brochure upgrade. Price them only if HIPEC is named." },
    { label: "Surgeon, hospital and campus tier", detail: "The estimate should name the consultant and the operating address." },
    { label: "City and companion logistics", detail: "Surgical fees cluster more tightly across the five metros than hotel bills for two to four weeks." },
    { label: "ICU, length of stay and complications", detail: "Packages are written for [STAY]. Extra nights after leak, ileus or infection are usually billed fresh." },
    { label: "Pathology and additional cancer treatment", detail: "Specimen processing may be bundled. Systemic chemotherapy, radiation and molecular tests are neighbouring quotes unless named." },
  ],

  inclusions: [
    { label: "Consultation that leads into the admission", detail: "The in-person pre-operative review with the named surgeon, where bundled." },
    { label: "Surgery by the named consultant", detail: "Cytoreduction as written on the estimate — not an unnamed HIPEC sitting unless the letter says so." },
    { label: "Anaesthesia and operating room", detail: "Anaesthesia team, theatre time, standard consumables and recovery for the scheduled CRS case." },
    { label: "Hospital stay as quoted", detail: "Bed charges, nursing and routine ward care for the room and nights written — typically [STAY], including ICU if named." },
    { label: "Routine tests and specimen pathology", detail: "Standard bloods, coagulation, ECG and histopathology where bundled." },
    { label: "Medicines during admission", detail: "Analgesia, antibiotics and routine drugs during the quoted stay. HIPEC agents only if named." },
  ],

  exclusions: [
    { label: "HIPEC drugs, circuit and extra HIPEC stay", detail: "Belong on the CRS + HIPEC letter unless this estimate names them." },
    { label: "Staging imaging and biopsy", detail: "CT, MRI, PET-CT, laparoscopy for staging and biopsy are frequently extra when ordered in India." },
    { label: "Systemic therapy and radiation", detail: "Chemotherapy, targeted therapy, immunotherapy and radiotherapy are neighbouring quotes." },
    { label: "Extra ICU, leak care, transfusion and re-operation", detail: "Nights and theatre beyond the quoted stay are typically a new event." },
    { label: "Travel, accommodation and visa-related expenses", detail: "Flights, hotel after discharge, local transport and companion living costs sit outside every hospital estimate." },
  ],

  approachComparison: {
    heading: "CRS versus CRS + HIPEC versus PIPAC",
    intro: [
      "These rows are different sittings, not upgrades of the same product. This sheet is cytoreductive surgery. Dedicated catalog sheets exist when HIPEC or PIPAC is named. None is universally better, and none is appropriate for every peritoneal case.",
      "Selection depends on cancer type, peritoneal distribution, whether a complete cytoreduction looks plausible, and the operating team's assessment. This page does not recommend CRS, HIPEC or PIPAC for an individual.",
    ],
    rows: [
      {
        name: "Cytoreductive surgery (CRS)",
        relative: "Removal of visible peritoneal deposits, with organ resection where required",
        detail: "This sheet's planning range applies when the letter is CRS as quoted, without assuming HIPEC.",
        procedure: "Cytoreductive Surgery",
      },
      {
        name: "CRS + HIPEC",
        relative: "Cytoreduction plus heated intraperitoneal chemotherapy in selected cases",
        detail: "Different stay, different drugs, different letter. Neighbouring GAF sheet — not bundled into this band.",
        procedure: "Cytoreductive Surgery with HIPEC",
      },
      {
        name: "PIPAC",
        relative: "Laparoscopy-based pressurised aerosol chemotherapy in selected peritoneal disease",
        detail: "Often a sequence of shorter stays rather than one mega-operation. Neighbouring catalog sheet.",
        procedure: "PIPAC",
      },
    ],
  },

  topicSections: [
    {
      id: "crs-hipec",
      heading: "What is CRS with HIPEC?",
      paragraphs: [
        "CRS is cytoreductive surgery. HIPEC is hyperthermic intraperitoneal chemotherapy — heated chemotherapy circulated through the abdomen after visible deposits have been removed, in selected patients. The usual sequence is assessment, cytoreduction, then HIPEC if the treating team judges it appropriate, then closure and high-dependency monitoring.",
        "Not every CRS includes HIPEC. Not every peritoneal case is a HIPEC case. Drug, duration and temperature are a protocol, not a menu upgrade. Use the neighbouring Cytoreductive Surgery with HIPEC cost sheet when HIPEC is already named.",
      ],
    },
    {
      id: "cancers",
      heading: "Which cancers may be treated with cytoreductive surgery?",
      paragraphs: [
        "CRS may be discussed for selected colorectal peritoneal metastases, selected appendiceal cancers, pseudomyxoma peritonei, selected ovarian cancers, selected gastric cancers, and other carefully chosen abdominal or pelvic malignancies. It is not standard for every patient with these diagnoses.",
        "Neighbouring GAF sheets exist for colectomy, rectal cancer surgery, gastrectomy and ovarian cancer cytoreductive surgery when those sittings are the billed episode. This page does not decide eligibility.",
      ],
    },
    {
      id: "pci",
      heading: "How does peritoneal disease affect treatment planning?",
      paragraphs: [
        "Distribution and tumour burden matter as much as the primary diagnosis. Specialists look at imaging, and often at a Peritoneal Cancer Index (PCI) — a map of how much disease sits in each abdominal region — plus whether a complete cytoreduction looks plausible, whether small bowel is extensively involved, and whether disease sits outside the abdomen.",
        "PCI is a planning tool, not a price list. This page does not calculate a score for a named patient.",
      ],
    },
    {
      id: "hipec-how",
      heading: "How does HIPEC work during cytoreductive surgery?",
      paragraphs: [
        "When HIPEC is part of the plan, heated chemotherapy is circulated through the peritoneal cavity after cytoreduction, then drained, before closure. It is used in selected patients to treat microscopic residual disease. It is not universally superior, and it does not guarantee cancer control.",
        "If HIPEC is not named on the letter, do not assume the drugs or the extra stay are included.",
      ],
    },
  ],

  overview: {
    what: [
      "Cytoreductive surgery, often called CRS, is an extensive operation intended to remove visible tumour deposits from the peritoneal cavity in appropriately selected patients. Completeness of cytoreduction — how little visible disease is left — matters more than the length of the incision.",
      "It is not appropriate for every patient with peritoneal cancer. Selection depends on cancer type, distribution, whether a meaningful clearance looks possible, overall health and a multidisciplinary review. GAF Healthcare does not decide eligibility on this page.",
    ],
    who: [
      "Eligibility depends on cancer type, extent and distribution of peritoneal disease, ability to achieve meaningful cytoreduction, organ function, previous treatment, disease outside the peritoneal cavity, and fitness for a long sitting and a stay of [STAY]. Extra-abdominal metastases often mean a different conversation.",
      "This page does not diagnose and does not recommend CRS, HIPEC, PIPAC or non-operative care for an individual.",
    ],
    how: [
      "Anaesthesia is general. The abdomen is assessed. Visible peritoneal deposits are removed. Organs may be resected where clinically necessary. Reconstruction follows. HIPEC is added only if it is part of the written plan. You wake in high-dependency or ICU care. Pathology feeds the next oncology conversation. This page does not describe graphic operative detail.",
    ],
    variations: [
      { label: "CRS without HIPEC", detail: "Cytoreduction as the billed sitting. This sheet." },
      { label: "CRS + HIPEC", detail: "Neighbouring catalog sheet. Different drugs, stay and quotation." },
      { label: "PIPAC", detail: "Selected peritoneal disease as a laparoscopy-based sequence. Neighbouring sheet." },
      { label: "Ovarian cytoreduction", detail: "May be primary or interval after chemotherapy. Neighbouring gynaecologic sheet when that is the billed episode." },
    ],
    preparation: [
      "Expect bloods, coagulation, CT and anaesthetic assessment. MRI, PET-CT, staging laparoscopy and biopsy are used where they change the plan.",
      "Bring prior chemotherapy dates, operative notes if you have already had abdominal surgery, and a current medicine list. Do not book same-week theatre after a long-haul landing.",
    ],
    recovery: [
      "Hospital stay for CRS as quoted is typically [STAY]. CRS + HIPEC often sits longer on its own sheet. Early days watch drains, nutrition, mobility and infection. This page does not set a diet or a discharge date.",
      "Infection, bleeding, bowel leak or ileus, fluid collections, nutritional problems, clots and respiratory complications can extend stay. Risk varies with tumour burden, organs resected and fitness. Individual percentages are not published here.",
      "Pathology review decides further oncology. International patients often need further hotel days before a long-haul flight.",
    ],
  },

  fullPathway: {
    intro: [
      "Surgery cost is not total trip cost and is not total cancer treatment cost. Staging, HIPEC if added, systemic therapy, extra ICU, hotel, flights and a companion who can stay are the rest of the budget.",
      "Add your own numbers: CRS as quoted + HIPEC if named + quoted stay + staging tests + oncology if in India + flights + visa + hotel nights × rate + attendant costs + contingency for extra nights. Do not invent a total from this page.",
    ],
    stages: [
      { label: "Staging and peritoneal assessment", detail: "CT, MRI or PET-CT where indicated; sometimes a staging laparoscopy. Often extra if done in India." },
      { label: "The CRS sitting", detail: "Cytoreduction, anaesthesia, ICU as quoted, [STAY] and pathology. This is the [INDIA_COST] line when the letter matches that scope." },
      { label: "HIPEC, if used", detail: "Neighbouring cost sheet. Different stay." },
      { label: "Systemic therapy", detail: "Before or after surgery in selected patients. Neighbouring quotes." },
      { label: "Flights, visa and hotel after discharge", detail: "Patient and attendant. Visa issuance is not guaranteed. Write duration for [STAY] plus hotel recovery." },
    ],
  },

  journey: [
    { label: "Submit medical records", detail: "CT or MRI, pathology, chemotherapy dates, prior operative notes." },
    { label: "Imaging and specialist review", detail: "A surgeon who performs CRS reads the films and says whether CRS, CRS + HIPEC, PIPAC or a non-operative path is honest." },
    { label: "Peritoneal disease and suitability review", detail: "Distribution, PCI where used, extra-abdominal disease and fitness are checked before a date is offered." },
    { label: "Plan, estimate and hospital selection", detail: "An itemised letter that names CRS or CRS + HIPEC. Compare the surgeon you met and leak-aware ICU." },
    { label: "Travel, admission and surgery", detail: "Visa issuance is not guaranteed. Theatre time follows tumour burden and whether HIPEC is added." },
    { label: "Recovery, pathology and return", detail: "Fly when the named surgeon is content. Extra nights are a clinical decision, not a package failure." },
  ],

  documents: [
    "Recent CT or MRI of the abdomen and pelvis, plus PET-CT if already done",
    "Pathology of the primary tumour or peritoneal biopsy if taken",
    "Chemotherapy summary if treatment has started",
    "Prior abdominal operative notes",
    "Blood count, coagulation, kidney and liver function",
    "Cardiac and pulmonary test results, if available",
    "Current medication list and allergies",
    "Passport, and a hospital invitation letter for the medical visa application",
  ],

  cities: cytoreductiveSurgeryCities,

  destinations: [
    {
      country: "India",
      stay: "[STAY]",
      positioning: "Catalog CRS planning range",
      context: "Named CRS and HIPEC listings can be met on camera. Listed consultants currently sit in Delhi NCR, Mumbai, Chennai and Hyderabad; Bengaluru is matched after records review. HIPEC has a dedicated sheet.",
    },
    { country: "Turkey", costLevel: [1, 1.8], stay: "7–14 nights", positioning: "Packaged medical-travel market", context: "Verify whether the sitting is CRS or CRS + HIPEC, and whether ICU nights are inside the bundle." },
    { country: "Thailand", costLevel: [1.2, 2.2], stay: "7–14 nights", positioning: "Private-hospital tourism", context: "Established international desks; complete cytoreduction with HIPEC can sit well above India." },
    { country: "United Arab Emirates", costLevel: [2, 3.4], stay: "7–14 nights", positioning: "Regional premium private care", context: "Short flights from much of Africa and West Asia; private CRS pricing is closer to Western self-pay." },
    { country: "Singapore", costLevel: [2.6, 4.4], stay: "7–16 nights", positioning: "High-cost private hub", context: "Mature multidisciplinary process at premium private tariffs." },
    { country: "Germany", costLevel: [2.2, 4.2], stay: "10–18 nights", positioning: "Certified European peritoneal units", context: "Structured MDT process; self-pay deposits are typical for visitors." },
    { country: "United Kingdom", costLevel: [1.8, 3.4], stay: "7–14 nights", positioning: "Private self-pay (NHS generally not for visitors)", context: "NHS care is not available to most overseas visitors. Private self-pay applies." },
    { country: "United States", stay: "7–14 nights", positioning: "Highest self-pay outlier", context: "Facility, surgeon, ICU, HIPEC drugs and later oncology bills often arrive separately." },
  ],

  destinationIntro: [
    "The table below is a planning comparison for cytoreductive surgery as a surgical episode. India and United States figures come from the GAF Healthcare catalog. Other markets are modelled from the India midpoint using relative private-care cost levels, and are labelled as indicative planning estimates — not hospital quotations. CRS and CRS + HIPEC are not priced as the same sitting in every country.",
  ],

  destinationNote:
    "International treatment costs vary by hospital, surgeon, cancer type, peritoneal tumour burden, whether HIPEC is performed, HIPEC protocol, length of stay, ICU requirements, oncology treatment and what is included in the package. These figures are intended for preliminary comparison only and are not final quotations. Figures other than India and the United States are modelled planning estimates.",

  cityIntro: [
    "City names below are working filter URLs. Open Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad for the city overlay and the filtered doctor and hospital cards.",
    "We do not invent a different CRS tariff for each metro. The approximate cost column uses the India planning band of [INDIA_COST] unless a researched city figure exists. What changes is the named consultant list and how expensive a multi-week companion stay feels.",
  ],

  whyIndia: [
    "International patients consider India for cytoreductive surgery when they are self-funding a peritoneal sitting and need the letter to say CRS or CRS + HIPEC before they compare prices. The catalog range [INDIA_COST] sits well below typical US cash-pay of [US_COST] because theatre and ward time are priced on a different cost base — not because the operation is a lesser product by definition.",
    "None of that is a claim of 'best HIPEC surgeons in the world', guaranteed clearance or 'cheapest in the world'. Someone whose insurance covers the pathway at home, or whose staging shows complete cytoreduction is not honest, may be better treated locally.",
  ],

  whyCostDiffers: [
    "The figure on this page is a CRS planning range. The figure on a hospital letter is an estimate written against a named sitting — CRS or CRS + HIPEC — and a stated tumour burden. Those two documents are not supposed to match to the dollar.",
    "Cytoreductive surgery can describe operations of very different complexity. Cost may change because of cancer type, PCI or tumour burden, organ resections, HIPEC, ICU, extra nights and oncology.",
    "If two hospitals quote different numbers, read whether they are pricing the same sitting. Higher cost is not a measure of better treatment.",
  ],

  planningClose: [
    "Cytoreductive surgery in India is typically planned in the [INDIA_COST] band for CRS as quoted and the inpatient stay, against [US_COST] self-pay in the United States. The first variable that actually starts the letter is whether HIPEC is included.",
    "Delhi NCR, Mumbai, Chennai and Hyderabad currently have named catalog consultants for this pathway. Bengaluru is matched after records review. Doctor and hospital cards link only to profiles that already exist in the catalog.",
    "A personalized quotation, written after records review, is the document you should travel on. Cost ranges on this page are intended for preliminary planning and comparison only. Final treatment costs vary according to the patient's clinical condition, cancer type and extent, treatment plan, hospital, surgeon, whether HIPEC is performed, length of stay and other factors. A personalized quotation should be obtained before making treatment or travel decisions.",
  ],

  questionsToAsk: [
    "Is this letter CRS alone or CRS + HIPEC?",
    "Is the person on this call the person in theatre?",
    "Are HIPEC drugs and circuit included?",
    "Which organ resections does the letter assume?",
    "How many ICU nights are included, and what happens if I need more?",
    "Are CT, PET-CT, staging laparoscopy and biopsy included?",
    "Is pathology included? Molecular tests?",
    "Is systemic chemotherapy included?",
    "What happens if a leak, ileus or extra hospitalization occurs?",
  ],

  faqs: [
    { q: "What is the cost of cytoreductive surgery in India?", a: "Plan against [INDIA_COST] for CRS as quoted, anaesthesia, stay of [STAY] and specimen pathology. Typical US self-pay is [US_COST]. HIPEC is a neighbouring sheet when named. The final figure is an itemised hospital estimate." },
    { q: "What is cytoreductive surgery?", a: "An extensive operation intended to remove visible peritoneal tumour deposits in selected patients. It is not appropriate for every peritoneal cancer. Completeness of clearance matters more than incision length." },
    { q: "What does CRS mean?", a: "Cytoreductive surgery. Same family of operations as this sheet. CRS is not automatically CRS + HIPEC." },
    { q: "What is HIPEC?", a: "Hyperthermic intraperitoneal chemotherapy — heated chemotherapy circulated through the abdomen after cytoreduction in selected patients. It is not universally used and does not guarantee cancer control." },
    { q: "Is CRS the same as CRS + HIPEC?", a: "No. HIPEC adds drugs, circuit time and typically a longer stay. Neighbouring GAF sheet: Cytoreductive Surgery with HIPEC. Do not compare a CRS letter with a HIPEC letter as if they were the same sitting." },
    { q: "Which cancers may be treated with CRS and HIPEC?", a: "Selected colorectal, appendiceal, ovarian and gastric peritoneal disease, and selected pseudomyxoma peritonei, among others. Not every patient with those diagnoses is eligible." },
    { q: "Who may be considered for CRS/HIPEC?", a: "Patients whose treating team judges that a meaningful cytoreduction looks possible, with acceptable fitness and without unresectable extra-abdominal disease. This page does not decide eligibility." },
    { q: "How is cytoreductive surgery performed?", a: "Under general anaesthesia the abdomen is assessed, visible peritoneal deposits are removed, and organs may be resected where necessary. HIPEC is added only if the written plan names it. You wake in high-dependency or ICU care. This page does not describe graphic operative detail." },
    { q: "How long does cytoreductive surgery take?", a: "Typically about six to twelve hours, longer when HIPEC is added. Tumour burden and organ resections change theatre time. This page does not promise duration for a named patient." },
    { q: "How long is the hospital stay?", a: "Typically [STAY] for CRS as quoted on this sheet. CRS + HIPEC often sits longer on its own sheet. Leaks or ileus extend that. This page does not promise a discharge date." },
    { q: "Is HIPEC included in the surgical cost?", a: "Not on this CRS sheet unless the letter names it. Ask whether the quotation is CRS or CRS + HIPEC, and whether the HIPEC drug is inside." },
    { q: "What is included in a CRS/HIPEC quotation?", a: "A typical CRS estimate covers the named surgeon, anaesthesia, theatre, quoted nights, routine inpatient medicines and pathology. HIPEC drugs only if named. Confirm organ resections, extra ICU and imaging." },
    { q: "What costs may be additional?", a: "Often: HIPEC if not named, CT or PET-CT, biopsy, systemic chemotherapy, extra ICU, leak management, transfusion, hotel, flights and visa-related expenses." },
    { q: "How do I choose a CRS/HIPEC surgeon?", a: "Use listed consultants whose catalog procedures include cytoreductive surgery or CRS + HIPEC, and insist on speaking to the person who would operate. Placement is not a league table." },
    { q: "How do I choose a hospital?", a: "Choose on the named surgeon, whether the campus actually runs peritoneal lists that week, leak-aware ICU, and the address on the letter. Listing is not a ranking or a volume claim." },
    { q: "Can international patients send records before travelling?", a: "Yes. Submit recent CT or MRI, pathology, chemotherapy dates and prior operative notes so a listed CRS or HIPEC surgeon can say whether CRS, CRS + HIPEC, PIPAC or a non-operative path is honest before you fly." },
    { q: "How long should international patients plan to stay in India?", a: "Plan the inpatient [STAY] plus further hotel days until the named surgeon is content you can fly. HIPEC and slow gut recovery lengthen that." },
  ],

  doctorHeading: "Doctors to consider for cytoreductive surgery in India",
  cityDoctorHeading: "Cytoreductive Surgery & HIPEC Specialists in [CITY]",
  doctorIntro:
    "These are consultants listed on GAF Healthcare whose catalog procedures include cytoreductive surgery or CRS + HIPEC. Profiles show training, campus and procedures as held in the catalog. There are no rankings here. Named listings currently sit in Delhi NCR, Mumbai, Chennai and Hyderabad; Bengaluru is matched after records review.",
  hospitalHeading: "Hospitals to consider for cytoreductive surgery in India",
  cityHospitalHeading: "CRS & HIPEC Hospitals in [CITY]",
  hospitalIntro:
    "Campuses on GAF Healthcare where this surgical-oncology pathway is listed, with accreditation as published by the hospital. Listing is not a claim of CRS or HIPEC volume or a ranking. Choose on the surgeon you met on camera and whether the house runs peritoneal lists — not on a brand slogan.",

  relatedProcedures: [
    "Cytoreductive Surgery with HIPEC",
    "PIPAC",
    "Ovarian Cancer Cytoreductive Surgery",
    "Colectomy",
    "Rectal Cancer Surgery",
    "Gastrectomy",
    "Chemotherapy",
    "Neoadjuvant Chemotherapy",
    "Intraperitoneal Chemotherapy",
  ],

  relatedBlogs: [
    { href: "/costs/cytoreductive-surgery-with-hipec", label: "CRS + HIPEC cost in India" },
    { href: "/costs/pipac", label: "PIPAC cost in India" },
    { href: "/costs/colectomy", label: "colectomy cost in India" },
    { href: "/costs/rectal-cancer-surgery", label: "rectal cancer surgery cost in India" },
    { href: "/costs/gastrectomy", label: "gastrectomy cost in India" },
    { href: "/costs?specialty=Surgical+Oncology", label: "surgical oncology costs in India" },
    { href: "/doctors?destination=India&procedure=Cytoreductive+Surgery", label: "cytoreductive surgery specialists in India" },
    { href: "/hospitals?destination=India&procedure=Cytoreductive+Surgery", label: "CRS and HIPEC hospitals in India" },
  ],

  figures: [
    {
      after: "overview",
      src: "/costs/cytoreductive-surgery-peritoneal-disease.webp",
      alt: "Medical illustration showing peritoneal tumour deposits and the concept of cytoreductive surgery",
      caption: "Cytoreduction aims to remove visible peritoneal deposits. Not every peritoneal case is a CRS case.",
      fit: "contain",
    },
    {
      after: "how",
      src: "/costs/cytoreductive-surgery-hipec-process.webp",
      alt: "Illustration showing the main stages of cytoreductive surgery and HIPEC treatment",
      caption: "CRS and HIPEC are different steps. HIPEC is added only when the written plan names it.",
      fit: "contain",
    },
    {
      after: "journey",
      src: "/costs/cytoreductive-surgery-treatment-journey-india.webp",
      alt: "Illustration showing the treatment journey for international patients planning cytoreductive surgery in India",
      caption: "Records and a named sitting — CRS or CRS + HIPEC — come before a ticket.",
      fit: "contain",
    },
  ],
};
