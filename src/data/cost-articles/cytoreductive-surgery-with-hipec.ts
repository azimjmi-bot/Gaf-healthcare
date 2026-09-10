import type { CostArticle } from "./types";
import { cytoreductiveSurgeryWithHipecCities } from "./cytoreductive-surgery-with-hipec-cities";

export const cytoreductiveSurgeryWithHipec: CostArticle = {
  procedure: "Cytoreductive Surgery with HIPEC",
  shortName: "CRS with HIPEC",
  briefName: "CRS + HIPEC",
  duration: "typically 8–14 hours including HIPEC",
  recoveryGlance: "Inpatient [STAY] for CRS + HIPEC as quoted. Varies by patient.",
  slug: "cytoreductive-surgery-with-hipec",
  lastUpdated: "2026-09-10",
  seoTitle: "Cytoreductive Surgery With HIPEC Cost in India: CRS, Cities & Hospitals",
  seoDescription:
    "CRS + HIPEC cost in India is typically [INDIA_COST] for the combined sitting and a stay of [STAY], against [US_COST] self-pay in the US. Compare HIPEC drugs, cities, listed specialists and hospitals.",
  heading: "Cytoreductive Surgery with HIPEC Cost in India",
  heroSubtitle:
    "Compare CRS + HIPEC planning ranges in India, see how cytoreduction plus heated intraperitoneal chemotherapy changes a hospital quotation, and explore listed HIPEC specialists across major Indian cities.",
  introduction: [
    "CRS is cytoreductive surgery: an extensive operation that removes visible tumour deposits from the peritoneal cavity in selected patients. HIPEC is hyperthermic intraperitoneal chemotherapy — heated chemotherapy circulated through the abdomen after that clearance, when the treating team judges it appropriate. They are related steps, not synonyms, and they are not offered as a single product to every person with peritoneal cancer.",
    "The combined sitting is long, often involves organ resections, and usually needs high-dependency care. Cost in India sits in a GAF planning range — currently [INDIA_COST] for CRS + HIPEC as quoted and a stay of [STAY] — because drugs, circuit time and extra nights are priced with the cytoreduction, not as a two-hour add-on. That band is a planning range, not a hospital quotation. A neighbouring sheet exists for CRS without HIPEC. Surgery cost is not total cancer treatment cost.",
  ],
  overviewHeading: "What is cytoreductive surgery with HIPEC?",
  whoHeading: "Who may be considered for CRS with HIPEC?",

  answer: [
    "Cytoreductive surgery with HIPEC cost in India typically ranges from [INDIA_COST] for the combined sitting, HIPEC drugs as quoted, anaesthesia, histopathology and a hospital stay of [STAY]. Typical US self-pay is [US_COST]. Theatre time is usually about eight to fourteen hours including the HIPEC circuit. HIPEC is part of this sheet when the letter names CRS + HIPEC.",
    "That figure is a planning range, not a hospital quotation. CRS without HIPEC is a neighbouring GAF sheet with a shorter typical stay. A typical CRS + HIPEC estimate covers the named surgeon, operating room, anaesthesia, quoted nights including ICU if named, routine inpatient medicines, HIPEC agents where written, and specimen pathology. Staging CT, molecular tests, systemic chemotherapy and extra leak days are frequently not.",
    "What moves the number most is completeness of cytoreduction, organ resections, HIPEC drug and protocol, named ICU nights, campus tier and the named consultant. International patients should budget the weeks around the knife — not only the theatre block.",
  ],

  indiaCost: [
    "There is no single CRS + HIPEC price in India, because there is no single peritoneal sitting. The [INDIA_COST] band is a planning range for cytoreduction plus HIPEC as quoted — theatre, anaesthesia, the named surgeon, HIPEC drugs and circuit where written, quoted room and nights, routine inpatient drugs, ICU as written, and histopathology. A more limited clearance at a mid-tier campus sits toward the lower end. A complete cytoreduction with several organ resections, a private room and a stay toward 21 nights sits toward the upper end.",
    "Do not treat this band as a CRS-only package. The neighbouring cytoreductive-surgery sheet is the letter without HIPEC. Surgery cost is not total cancer treatment cost. Staging, later systemic therapy and surveillance sit on neighbouring estimates.",
  ],

  costComponents: [
    { label: "Surgeon fee and surgical team", detail: "Usually bundled for the named surgical oncologist. Confirm who is in theatre and whether a gynaecologic oncologist is billed separately on an ovarian case." },
    { label: "Hospital and operating-room charges", detail: "Theatre time for an eight-to-fourteen-hour sitting, including HIPEC circuit time where written." },
    { label: "Anaesthesia", detail: "Anaesthetist fee and drugs for a long case. Cardiopulmonary clearance may be billed outside." },
    { label: "HIPEC drugs and circuit", detail: "Agent, duration and hardware belong on this letter when the estimate is CRS + HIPEC. Ask which drug and how many cycles of perfusion are assumed." },
    { label: "ICU and critical-care monitoring", detail: "High-dependency care is common after CRS + HIPEC. Nights inside the quoted stay may be bundled; extra days after a leak or sepsis are typically extra." },
    { label: "Pathology", detail: "Processing of specimens. Molecular assays, when ordered, are often billed later." },
    { label: "Room charges and nursing", detail: "Written against a room category and nights — typically [STAY] for CRS + HIPEC as quoted." },
  ],

  whyQuotesDiffer:
    "Two honest CRS + HIPEC estimates can differ because the operations are not the same. Completeness of cytoreduction, which organs come out, which HIPEC agent is used, and how many ICU nights are named move the bill more than the city on the boarding pass. A CRS-only letter is not a CRS + HIPEC letter. Higher cost is not a measure of better care.",

  costDrivers: [
    { label: "Complexity of cytoreduction", detail: "Limited stripping is not a complete clearance. Completeness-of-cytoreduction scores matter more than incision length." },
    { label: "HIPEC drug and protocol", detail: "Agent, temperature and perfusion time are a clinical protocol, not a brochure upgrade. Confirm they are inside the letter." },
    { label: "Cancer type and peritoneal tumour burden", detail: "Colorectal, appendiceal, ovarian and gastric peritoneal disease are planned differently. Extent and distribution change theatre time." },
    { label: "Organ resections", detail: "Bowel, spleen, gallbladder or peritoneal stripping lengthen the sitting. Ask what the letter assumes." },
    { label: "Surgeon, hospital and campus tier", detail: "The estimate should name the consultant and the operating address." },
    { label: "City and companion logistics", detail: "Surgical fees cluster more tightly across the five metros than hotel bills for three to five weeks." },
    { label: "ICU, length of stay and complications", detail: "Packages are written for [STAY]. Extra nights after leak, ileus or infection are usually billed fresh." },
    { label: "Pathology and additional cancer treatment", detail: "Specimen processing may be bundled. Systemic chemotherapy, radiation and molecular tests are neighbouring quotes unless named." },
  ],

  inclusions: [
    { label: "Consultation that leads into the admission", detail: "The in-person pre-operative review with the named surgeon, where bundled." },
    { label: "CRS + HIPEC by the named consultant", detail: "Cytoreduction plus HIPEC as written on the estimate — not an unnamed CRS-only sitting." },
    { label: "Anaesthesia and operating room", detail: "Anaesthesia team, theatre time, HIPEC circuit hardware where written, standard consumables and recovery." },
    { label: "HIPEC chemotherapy as quoted", detail: "The named agent and perfusion, when the letter is CRS + HIPEC. Confirm the drug name." },
    { label: "Hospital stay as quoted", detail: "Bed charges, nursing and routine ward care for the room and nights written — typically [STAY], including ICU if named." },
    { label: "Routine tests and specimen pathology", detail: "Standard bloods, coagulation, ECG and histopathology where bundled." },
  ],

  exclusions: [
    { label: "Staging imaging and biopsy", detail: "CT, MRI, PET-CT, staging laparoscopy and biopsy are frequently extra when ordered in India." },
    { label: "Systemic therapy and radiation", detail: "Chemotherapy outside the HIPEC circuit, targeted therapy, immunotherapy and radiotherapy are neighbouring quotes." },
    { label: "Advanced pathology and molecular testing", detail: "Special stains and genomic assays are often billed later." },
    { label: "Extra ICU, leak care, transfusion and re-operation", detail: "Nights and theatre beyond the quoted stay are typically a new event." },
    { label: "Travel, accommodation and visa-related expenses", detail: "Flights, hotel after discharge, local transport and companion living costs sit outside every hospital estimate." },
  ],

  approachComparison: {
    heading: "CRS versus CRS + HIPEC versus PIPAC",
    intro: [
      "These rows are different sittings, not upgrades of the same product. This sheet is cytoreductive surgery with HIPEC. Dedicated catalog sheets exist for CRS without HIPEC and for PIPAC. None is universally better, and none is appropriate for every peritoneal case.",
      "Selection depends on cancer type, peritoneal distribution, whether a complete cytoreduction looks plausible, and the operating team's assessment. This page does not recommend CRS, HIPEC or PIPAC for an individual.",
    ],
    rows: [
      {
        name: "Cytoreductive surgery (CRS)",
        relative: "Removal of visible peritoneal deposits, without assuming HIPEC",
        detail: "Neighbouring GAF sheet. Shorter typical stay. Do not compare a CRS letter with this band.",
        procedure: "Cytoreductive Surgery",
      },
      {
        name: "CRS + HIPEC",
        relative: "Cytoreduction plus heated intraperitoneal chemotherapy in selected cases",
        detail: "This sheet. Drugs, circuit and a stay of [STAY] belong here when the letter names them.",
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
      id: "how-together",
      heading: "How do CRS and HIPEC work together?",
      paragraphs: [
        "The usual sequence is assessment, cytoreduction to remove visible deposits, then HIPEC if the treating team judges residual microscopic disease is the right target, then closure and high-dependency monitoring. HIPEC is not a second holiday. It is a step in the same theatre when it is part of the written plan.",
        "Not every CRS includes HIPEC. Not every peritoneal case is a HIPEC case. Drug, duration and temperature are a protocol, not a menu upgrade. Use the neighbouring cytoreductive-surgery sheet when HIPEC is not named.",
      ],
    },
    {
      id: "cancers",
      heading: "Which cancers may be treated with CRS and HIPEC?",
      paragraphs: [
        "CRS with HIPEC may be discussed for selected appendiceal cancers, selected pseudomyxoma peritonei, selected colorectal peritoneal metastases, selected ovarian cancers, selected gastric cancers, and other carefully chosen abdominal or pelvic malignancies. It is not standard for every patient with these diagnoses.",
        "Neighbouring GAF sheets exist for colectomy, rectal cancer surgery, gastrectomy and ovarian cancer cytoreductive surgery when those sittings are the billed episode. This page does not decide eligibility.",
      ],
    },
    {
      id: "pci",
      heading: "How does peritoneal disease affect treatment planning?",
      paragraphs: [
        "Distribution and tumour burden matter as much as the primary diagnosis. Specialists look at imaging, and often at a Peritoneal Cancer Index (PCI) — a map of how much disease sits in each abdominal region — plus whether a complete cytoreduction looks plausible, whether small bowel is extensively involved, and whether disease sits outside the abdomen.",
        "PCI is a planning tool, not a price list. HIPEC does not rescue an unresectable burden. This page does not calculate a score for a named patient.",
      ],
    },
  ],

  overview: {
    what: [
      "Cytoreductive surgery with HIPEC combines two steps in selected patients: removal of visible peritoneal tumour deposits, then heated chemotherapy circulated through the abdomen. Completeness of cytoreduction matters more than the length of the incision. HIPEC treats what cannot be seen, when the team judges that is honest.",
      "It is not appropriate for every patient with peritoneal cancer. Selection depends on cancer type, distribution, whether a meaningful clearance looks possible, overall health and a multidisciplinary review. GAF Healthcare does not decide eligibility on this page.",
    ],
    who: [
      "Eligibility depends on cancer type, extent and distribution of peritoneal disease, ability to achieve meaningful cytoreduction, organ function, previous treatment, disease outside the peritoneal cavity, and fitness for a long sitting and a stay of [STAY]. Extra-abdominal metastases often mean a different conversation.",
      "This page does not diagnose and does not recommend CRS, HIPEC, PIPAC or non-operative care for an individual.",
    ],
    how: [
      "After preoperative assessment, anaesthesia is general. The abdomen is assessed. Visible peritoneal deposits are removed. Organs may be resected where clinically necessary. HIPEC is then circulated if it is part of the written plan, drained, and the abdomen closed. You wake in high-dependency or ICU care. Pathology feeds the next oncology conversation. This page does not describe graphic operative detail.",
    ],
    variations: [
      { label: "CRS + HIPEC", detail: "This sheet. Combined sitting as quoted." },
      { label: "CRS without HIPEC", detail: "Neighbouring catalog sheet. Different drugs, stay and quotation." },
      { label: "PIPAC", detail: "Selected peritoneal disease as a laparoscopy-based sequence. Neighbouring sheet." },
      { label: "Ovarian cytoreduction", detail: "May be primary or interval. Neighbouring gynaecologic sheet when that is the billed episode — HIPEC only if named." },
    ],
    preparation: [
      "Expect bloods, coagulation, CT and anaesthetic assessment. MRI, PET-CT, staging laparoscopy and biopsy are used where they change the plan.",
      "Bring prior chemotherapy dates, operative notes if you have already had abdominal surgery, and a current medicine list. Do not book same-week theatre after a long-haul landing.",
    ],
    recovery: [
      "Hospital stay for CRS + HIPEC as quoted is typically [STAY]. Early days watch drains, nutrition, mobility, infection and the gut's return after heated chemotherapy. This page does not set a diet or a discharge date.",
      "Infection, bleeding, bowel leak or ileus, fluid collections, nutritional problems, clots and respiratory complications can extend stay. Risk varies with tumour burden, organs resected and fitness. Individual percentages are not published here.",
      "Pathology review decides further oncology. International patients often need further hotel days before a long-haul flight.",
    ],
  },

  fullPathway: {
    intro: [
      "Procedure cost is not total trip cost and is not total cancer treatment cost. Staging, extra ICU, systemic therapy, hotel, flights and a companion who can stay are the rest of the budget.",
      "Add your own numbers: CRS + HIPEC as quoted + quoted stay + staging tests + oncology if in India + flights + visa + hotel nights × rate + attendant costs + contingency for extra nights. Do not invent a total from this page.",
    ],
    stages: [
      { label: "Staging and peritoneal assessment", detail: "CT, MRI or PET-CT where indicated; sometimes a staging laparoscopy. Often extra if done in India." },
      { label: "The CRS + HIPEC sitting", detail: "Cytoreduction, HIPEC as quoted, anaesthesia, ICU as quoted, [STAY] and pathology. This is the [INDIA_COST] line when the letter matches that scope." },
      { label: "Systemic therapy", detail: "Before or after surgery in selected patients. Neighbouring quotes — not the HIPEC circuit." },
      { label: "Flights, visa and hotel after discharge", detail: "Patient and attendant. Visa issuance is not guaranteed. Write duration for [STAY] plus hotel recovery." },
    ],
  },

  journey: [
    { label: "Submit medical records", detail: "CT or MRI, pathology, chemotherapy dates, prior operative notes." },
    { label: "Imaging and specialist review", detail: "A surgeon who performs CRS + HIPEC reads the films and says whether CRS, CRS + HIPEC, PIPAC or a non-operative path is honest." },
    { label: "Peritoneal disease and suitability review", detail: "Distribution, PCI where used, extra-abdominal disease and fitness are checked before a date is offered." },
    { label: "Plan, estimate and hospital selection", detail: "An itemised letter that names CRS + HIPEC, the HIPEC drug, and leak-aware ICU." },
    { label: "Travel, admission and surgery", detail: "Visa issuance is not guaranteed. Theatre time follows tumour burden and the HIPEC protocol." },
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

  cities: cytoreductiveSurgeryWithHipecCities,

  destinations: [
    {
      country: "India",
      stay: "[STAY]",
      positioning: "Catalog CRS + HIPEC planning range",
      context: "Named HIPEC listings can be met on camera. Listed consultants currently sit in Delhi NCR, Mumbai, Chennai and Hyderabad; Bengaluru is matched after records review. CRS without HIPEC has a dedicated sheet.",
    },
    { country: "Turkey", costLevel: [1, 1.8], stay: "10–21 nights", positioning: "Packaged medical-travel market", context: "Verify whether HIPEC drugs and ICU nights are inside the bundle, or whether CRS is priced alone." },
    { country: "Thailand", costLevel: [1.2, 2.2], stay: "10–21 nights", positioning: "Private-hospital tourism", context: "Established international desks; complete cytoreduction with HIPEC can sit well above India." },
    { country: "United Arab Emirates", costLevel: [2, 3.4], stay: "10–21 nights", positioning: "Regional premium private care", context: "Short flights from much of Africa and West Asia; private CRS + HIPEC pricing is closer to Western self-pay." },
    { country: "Singapore", costLevel: [2.6, 4.4], stay: "10–21 nights", positioning: "High-cost private hub", context: "Mature multidisciplinary process at premium private tariffs." },
    { country: "Germany", costLevel: [2.2, 4.2], stay: "12–21 nights", positioning: "Certified European peritoneal units", context: "Structured MDT process; self-pay deposits are typical for visitors." },
    { country: "United Kingdom", costLevel: [1.8, 3.4], stay: "10–21 nights", positioning: "Private self-pay (NHS generally not for visitors)", context: "NHS care is not available to most overseas visitors. Private self-pay applies." },
    { country: "United States", stay: "10–21 nights", positioning: "Highest self-pay outlier", context: "Facility, surgeon, ICU, HIPEC drugs and later oncology bills often arrive separately." },
  ],

  destinationIntro: [
    "The table below is a planning comparison for cytoreductive surgery with HIPEC as a combined episode. India and United States figures come from the GAF Healthcare catalog. Other markets are modelled from the India midpoint using relative private-care cost levels, and are labelled as indicative planning estimates — not hospital quotations. CRS and CRS + HIPEC are not priced as the same sitting in every country. HIPEC drugs, stay and inclusions may differ.",
  ],

  destinationNote:
    "International treatment costs vary by hospital, surgeon, cancer type, peritoneal tumour burden, HIPEC protocol, length of stay, ICU requirements, oncology treatment and what is included in the package. These figures are intended for preliminary comparison only and are not final quotations. Figures other than India and the United States are modelled planning estimates.",

  cityIntro: [
    "City names below are working filter URLs. Open Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad for the city overlay and the filtered doctor and hospital cards.",
    "We do not invent a different CRS + HIPEC tariff for each metro. The approximate cost column uses the India planning band of [INDIA_COST] unless a researched city figure exists. What changes is the named consultant list and how expensive a multi-week companion stay feels.",
  ],

  whyIndia: [
    "International patients consider India for CRS + HIPEC when they are self-funding a peritoneal sitting and need the letter to name both cytoreduction and HIPEC before they compare prices. The catalog range [INDIA_COST] sits well below typical US cash-pay of [US_COST] because theatre, drugs and ward time are priced on a different cost base — not because the operation is a lesser product by definition.",
    "None of that is a claim of world's-best HIPEC surgeons, guaranteed clearance or always-cheapest care. Someone whose insurance covers the pathway at home, or whose staging shows complete cytoreduction is not honest, may be better treated locally.",
  ],

  whyCostDiffers: [
    "The figure on this page is a CRS + HIPEC planning range. The figure on a hospital letter is an estimate written against a named sitting, a stated tumour burden and a named HIPEC agent. Those two documents are not supposed to match to the dollar.",
    "Cytoreductive surgery with HIPEC can describe operations of very different complexity. Cost may change because of cancer type, PCI or tumour burden, organ resections, HIPEC protocol, ICU, extra nights and oncology.",
    "If two hospitals quote different numbers, read whether they are pricing the same sitting — including the same drug. Higher cost is not a measure of better treatment.",
  ],

  planningClose: [
    "Cytoreductive surgery with HIPEC in India is typically planned in the [INDIA_COST] band for the combined sitting and the inpatient stay, against [US_COST] self-pay in the United States. The first variable that actually starts the letter is whether HIPEC is truly included — drug, circuit and extra nights.",
    "Delhi NCR, Mumbai, Chennai and Hyderabad currently have named catalog consultants for this pathway. Bengaluru is matched after records review. Doctor and hospital cards link only to profiles that already exist in the catalog.",
    "A personalized quotation, written after records review, is the document you should travel on. Cost ranges on this page are intended for preliminary planning and comparison only. Final treatment costs vary according to the patient's clinical condition, cancer type and extent, treatment plan, hospital, surgeon, HIPEC protocol, length of stay and other factors. A personalized quotation should be obtained before making treatment or travel decisions.",
  ],

  questionsToAsk: [
    "Is this letter CRS + HIPEC, or CRS alone?",
    "Is the person on this call the person in theatre?",
    "Which HIPEC drug, duration and temperature are included?",
    "Which organ resections does the letter assume?",
    "How many ICU nights are included, and what happens if I need more?",
    "Are CT, PET-CT, staging laparoscopy and biopsy included?",
    "Is pathology included? Molecular tests?",
    "Is systemic chemotherapy included?",
    "What happens if a leak, ileus or extra hospitalization occurs?",
  ],

  faqs: [
    { q: "What is the cost of cytoreductive surgery with HIPEC in India?", a: "Plan against [INDIA_COST] for CRS + HIPEC as quoted, HIPEC drugs where written, anaesthesia, stay of [STAY] and specimen pathology. Typical US self-pay is [US_COST]. The final figure is an itemised hospital estimate after records review, not this planning band." },
    { q: "What is cytoreductive surgery?", a: "An extensive operation intended to remove visible peritoneal tumour deposits in selected patients. It is not appropriate for every peritoneal cancer. Completeness of clearance matters more than incision length. CRS is not automatically CRS + HIPEC; those are different letters and different cost sheets." },
    { q: "What does HIPEC mean?", a: "HIPEC means hyperthermic intraperitoneal chemotherapy: heated chemotherapy circulated through the abdomen after cytoreduction in selected patients. It is not universally used, is not a menu upgrade, and does not guarantee cancer control. Drug, duration and temperature are a clinical protocol." },
    { q: "Is CRS the same as HIPEC?", a: "No. CRS is the surgical clearance of visible deposits. HIPEC is the heated-chemotherapy step that may follow. They can be planned together or not. Do not treat a CRS letter and a CRS + HIPEC letter as the same sitting or the same price." },
    { q: "What is CRS + HIPEC?", a: "A combined plan in selected patients: cytoreduction, then HIPEC in the same theatre when the treating team judges it appropriate. This sheet prices that combined sitting. Neighbouring sheets exist for CRS without HIPEC and for PIPAC. None is universally better." },
    { q: "Which cancers may be treated with CRS and HIPEC?", a: "Selected appendiceal cancers, selected pseudomyxoma peritonei, selected colorectal peritoneal metastases, selected ovarian and gastric cancers, among others. Not every patient with those diagnoses is eligible. Distribution, tumour burden and fitness matter as much as the primary name on the pathology report." },
    { q: "Who may be considered for CRS + HIPEC?", a: "Patients whose treating team judges that a meaningful cytoreduction looks possible, with acceptable fitness and without unresectable extra-abdominal disease. Selection is multidisciplinary. Extra-abdominal metastases often mean a different conversation. This page does not decide eligibility for a named patient on a video call." },
    { q: "How is CRS with HIPEC performed?", a: "Under general anaesthesia the abdomen is assessed, visible peritoneal deposits are removed, and organs may be resected where necessary. Heated chemotherapy is then circulated if it is part of the written plan. You wake in high-dependency or ICU care. This page does not describe graphic operative detail." },
    { q: "How long does CRS + HIPEC take?", a: "Typically about eight to fourteen hours including the HIPEC circuit. Tumour burden, organ resections and perfusion time change theatre time. A limited clearance can be shorter; a complete clearance with several organs is longer. This page does not promise duration for a named patient." },
    { q: "How long is the hospital stay?", a: "Typically [STAY] for CRS + HIPEC as quoted on this sheet. Leaks, ileus or infection extend that. International patients should add hotel days after discharge. This page does not promise a discharge date, and HIPEC does not shorten the watch." },
    { q: "Is HIPEC included in the treatment cost?", a: "On this sheet, yes — when the letter names CRS + HIPEC. Still ask which drug, how long the perfusion runs, and whether extra stay after HIPEC is inside. Do not assume a neighbouring CRS-only estimate includes the circuit or the drugs." },
    { q: "What is included in a CRS + HIPEC quotation?", a: "A typical estimate covers the named surgeon, anaesthesia, theatre, HIPEC drugs where written, quoted nights, routine inpatient medicines and pathology. Confirm organ resections, extra ICU, imaging and what happens if hospitalization runs longer than written. Anything not on the letter is extra until confirmed." },
    { q: "What costs may be additional?", a: "Often: staging CT or PET-CT, biopsy, molecular tests, systemic chemotherapy outside HIPEC, radiation, extra ICU, leak management, transfusion, rehabilitation, hotel, flights, visa-related expenses and attendant living costs. Procedure cost is not total trip cost and is not total cancer treatment cost." },
    { q: "How do I choose a HIPEC surgeon?", a: "Use listed consultants whose catalog procedures include CRS + HIPEC, and insist on speaking to the person who would operate. Ask about peritoneal burden, the HIPEC agent, and whether a complete cytoreduction looks plausible. Placement on this page is not a league table." },
    { q: "How do I choose a CRS/HIPEC hospital?", a: "Choose on the named surgeon, whether the campus actually runs HIPEC lists that week, leak-aware ICU, and the address on the letter. Accreditation on a profile is as published by the hospital. Listing is not a ranking or a volume claim." },
    { q: "Can international patients send medical records before travelling?", a: "Yes. Submit recent CT or MRI, pathology, chemotherapy dates and prior operative notes so a listed HIPEC surgeon can say whether CRS, CRS + HIPEC, PIPAC or a non-operative path is honest before you fly. Visa issuance is not guaranteed by that review." },
    { q: "How long should international patients plan to stay in India?", a: "Plan the inpatient [STAY] plus further hotel days until the named surgeon is content you can fly. Slow gut recovery after HIPEC lengthens that. Write the visa letter for a possible extra week rather than the shortest quoted stay. Visa issuance itself is not guaranteed." },
  ],

  doctorHeading: "Doctors to consider for CRS with HIPEC in India",
  cityDoctorHeading: "CRS & HIPEC Specialists in [CITY]",
  doctorIntro:
    "These are consultants listed on GAF Healthcare whose catalog procedures include CRS + HIPEC. Profiles show training, campus and procedures as held in the catalog. There are no rankings here. Named listings currently sit in Delhi NCR, Mumbai, Chennai and Hyderabad; Bengaluru is matched after records review.",
  hospitalHeading: "Hospitals to consider for CRS and HIPEC in India",
  cityHospitalHeading: "CRS & HIPEC Hospitals in [CITY]",
  hospitalIntro:
    "Campuses on GAF Healthcare where this surgical-oncology pathway is listed, with accreditation as published by the hospital. Listing is not a claim of HIPEC volume or a ranking. Choose on the surgeon you met on camera and whether the house runs peritoneal lists that week — not on a brand slogan.",

  relatedProcedures: [
    "Cytoreductive Surgery",
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
    { href: "/costs/cytoreductive-surgery", label: "cytoreductive surgery cost in India" },
    { href: "/costs/pipac", label: "PIPAC cost in India" },
    { href: "/costs/colectomy", label: "colectomy cost in India" },
    { href: "/costs/rectal-cancer-surgery", label: "rectal cancer surgery cost in India" },
    { href: "/costs/gastrectomy", label: "gastrectomy cost in India" },
    { href: "/costs/pancreatic-surgery", label: "pancreatic surgery cost in India" },
    { href: "/costs?specialty=Surgical+Oncology", label: "surgical oncology costs in India" },
    { href: "/doctors?destination=India&procedure=Cytoreductive+Surgery+with+HIPEC", label: "CRS and HIPEC specialists in India" },
    { href: "/hospitals?destination=India&procedure=Cytoreductive+Surgery+with+HIPEC", label: "CRS and HIPEC hospitals in India" },
  ],

  figures: [
    {
      after: "overview",
      src: "/costs/cytoreductive-surgery-peritoneal-disease.webp",
      alt: "Medical illustration showing peritoneal tumour deposits and the concept of cytoreductive surgery",
      caption: "Cytoreduction aims to remove visible peritoneal deposits before HIPEC, when HIPEC is part of the plan.",
      fit: "contain",
    },
    {
      after: "how",
      src: "/costs/cytoreductive-surgery-hipec-treatment-process.webp",
      alt: "Illustration showing the main stages of cytoreductive surgery and HIPEC treatment",
      caption: "CRS and HIPEC are sequential steps. HIPEC is added only when the written plan names it.",
      fit: "contain",
    },
    {
      after: "journey",
      src: "/costs/crs-hipec-treatment-journey-india.webp",
      alt: "Illustration showing the treatment journey for international patients planning CRS and HIPEC in India",
      caption: "Records and a named CRS + HIPEC sitting come before a ticket.",
      fit: "contain",
    },
  ],
};
