import type { CostArticle } from "./types";
import { pipacCities } from "./pipac-cities";

export const pipac: CostArticle = {
  procedure: "PIPAC",
  shortName: "PIPAC",
  briefName: "PIPAC",
  duration: "typically 1–2 hours per sitting",
  recoveryGlance: "Inpatient [STAY] per sitting as quoted. Further cycles, when planned, are often separate admissions.",
  slug: "pipac",
  lastUpdated: "2026-09-10",
  seoTitle: "PIPAC Cost in India: Treatment, Cities, Doctors & Hospitals",
  seoDescription:
    "PIPAC cost in India is typically [INDIA_COST] per sitting as quoted and a stay of [STAY], against [US_COST] self-pay in the US. Compare cycles, cities, listed specialists and hospitals.",
  heading: "PIPAC Cost in India",
  heroSubtitle:
    "PIPAC cost in India varies with the treatment plan, hospital, chemotherapy protocol, number of sittings and the patient's clinical picture. The GAF planning range is a per-sitting band — not a three-cycle package, and not a HIPEC or CRS quotation.",
  introduction: [
    "PIPAC is pressurized intraperitoneal aerosol chemotherapy: chemotherapy delivered into the peritoneal cavity as a pressurized aerosol during a laparoscopic sitting, in selected patients. It is not an intravenous drip, not HIPEC, and not cytoreductive surgery. Suitability depends on cancer type, how disease sits on the peritoneum, prior treatment and a treating team's assessment.",
    "Families search PIPAC cost in India because a sequence of short stays is priced differently from a two-week CRS + HIPEC admission. The GAF planning range is currently [INDIA_COST] per sitting as quoted, with a stay of [STAY], against typical US self-pay of [US_COST]. That band is a planning range, not a hospital quotation, and it is not a price for every cycle in a series. Surgery cost is not total cancer treatment cost.",
  ],
  overviewHeading: "What is PIPAC?",
  whoHeading: "Who may be considered for PIPAC?",

  answer: [
    "PIPAC cost in India typically ranges from [INDIA_COST] per sitting as quoted, including the laparoscopic sitting, aerosol chemotherapy as written, anaesthesia, histopathology where bundled, and a hospital stay of [STAY]. Typical US self-pay is [US_COST]. Theatre time is usually about one to two hours per sitting. Further cycles, when planned, are often separate letters.",
    "That figure is a planning range, not a hospital quotation. PIPAC is not HIPEC and not CRS. Neighbouring GAF sheets exist for cytoreductive surgery and CRS + HIPEC. A typical PIPAC estimate covers the named surgeon, operating room, anaesthesia, quoted nights, routine inpatient medicines and the named aerosol agent where written. Staging CT, molecular tests, systemic chemotherapy between sittings and extra leak days are frequently not.",
    "What moves the number most is how many sittings the letter covers, which drug is used, campus tier and the named consultant. International patients should budget a sequence of short admissions — not one mega-operation — unless the treating team says otherwise.",
  ],

  indiaCost: [
    "There is no single PIPAC price in India, because there is no single peritoneal plan. The [INDIA_COST] band is a planning range for one PIPAC sitting as quoted — theatre, anaesthesia, the named surgeon, aerosol chemotherapy where written, quoted room and nights, routine inpatient drugs, and histopathology where bundled. A mid-tier campus toward the shorter end of [STAY] sits toward the lower end. A flagship campus, a private room and a stay toward five nights sits toward the upper end — still usually one sitting, not a whole series.",
    "Ask how many sittings the estimate covers. A three-sitting plan is not three times a brochure number until each letter is written. Neighbouring sheets exist for CRS and CRS + HIPEC. Those are different theatres and different stays.",
  ],

  costComponents: [
    { label: "Specialist and surgical team", detail: "Usually bundled for the named surgical oncologist. Confirm who is in theatre." },
    { label: "Operating room and PIPAC consumables", detail: "Laparoscopic theatre time and the aerosol delivery set where written. Hardware is not a brochure upgrade." },
    { label: "Anaesthesia", detail: "Anaesthetist fee and drugs for a laparoscopic sitting. Cardiopulmonary clearance may be billed outside." },
    { label: "Chemotherapy medication", detail: "The named intraperitoneal aerosol agent. Confirm the drug. Systemic chemotherapy between sittings is a neighbouring quote." },
    { label: "Hospital room and nursing", detail: "Written against a room category and nights — typically [STAY] per sitting as quoted." },
    { label: "Laboratory tests, imaging and pathology", detail: "Standard bloods and histopathology where bundled. Staging CT and molecular assays are often extra." },
    { label: "Postoperative monitoring and follow-up", detail: "Recovery after a laparoscopic sitting. Further cycles are often a new admission." },
  ],

  whyQuotesDiffer:
    "Two honest PIPAC estimates can differ because the letters are not covering the same plan. One sitting is not three. One drug is not another. Named nights are not extra ileus days. Campus tier and the named surgeon move the bill more than the city on the boarding pass. Higher cost is not a measure of better care.",

  costDrivers: [
    { label: "Number of treatment cycles", detail: "Ask whether the letter is one sitting or a series. Further cycles are often priced separately." },
    { label: "Chemotherapy drug and protocol", detail: "Agent and aerosol plan are a clinical protocol, not a menu upgrade. Confirm they are inside the letter." },
    { label: "Cancer type and peritoneal disease", detail: "Colorectal, gastric, ovarian and appendiceal peritoneal disease are planned differently. Distribution changes assessment time." },
    { label: "Hospital, specialist and campus tier", detail: "The estimate should name the consultant and the operating address." },
    { label: "Anaesthesia and operating room", detail: "A laparoscopic PIPAC sitting is not priced like an eight-hour cytoreduction. Still confirm theatre time." },
    { label: "Diagnostic testing and hospital stay", detail: "Packages are written for [STAY] per sitting. Extra nights and staging CT are usually billed fresh." },
    { label: "Additional treatment and complications", detail: "Systemic therapy, radiation and leak care sit on neighbouring quotes unless named." },
    { label: "Follow-up and subsequent sittings", detail: "Interval imaging and the next PIPAC date are often a new letter." },
  ],

  inclusions: [
    { label: "Consultation that leads into the admission", detail: "The in-person pre-operative review with the named surgeon, where bundled." },
    { label: "PIPAC sitting by the named consultant", detail: "Laparoscopic assessment and aerosol chemotherapy as written — not an unnamed HIPEC sitting." },
    { label: "Anaesthesia and operating room", detail: "Anaesthesia team, theatre time, PIPAC consumables where written, and recovery." },
    { label: "Chemotherapy as quoted", detail: "The named aerosol agent when the letter is PIPAC. Confirm the drug name." },
    { label: "Hospital stay as quoted", detail: "Bed charges, nursing and routine ward care for the room and nights written — typically [STAY]." },
    { label: "Routine tests and specimen pathology", detail: "Standard bloods and histopathology where bundled." },
  ],

  exclusions: [
    { label: "Staging imaging, biopsy and molecular testing", detail: "CT, MRI, PET-CT, laparoscopy for staging outside this sitting, and genomic assays are frequently extra." },
    { label: "Systemic therapy and radiation", detail: "Intravenous chemotherapy, targeted therapy, immunotherapy and radiotherapy are neighbouring quotes." },
    { label: "Further PIPAC sittings", detail: "A second or third cycle is often a new estimate unless the letter names a series." },
    { label: "Extra nights, ICU, transfusion and re-operation", detail: "Nights and theatre beyond the quoted stay are typically a new event." },
    { label: "Travel, accommodation and visa-related expenses", detail: "Flights, hotel after discharge, local transport and companion living costs sit outside every hospital estimate." },
  ],

  approachComparison: {
    heading: "PIPAC vs HIPEC: what is the difference?",
    intro: [
      "These rows are different sittings, not upgrades of the same product. This sheet is PIPAC. Dedicated catalog sheets exist for cytoreductive surgery and for CRS + HIPEC. None is universally better, and none is appropriate for every peritoneal case.",
      "PIPAC is pressurized aerosol chemotherapy delivered laparoscopically, often as repeated sittings where clinically planned. HIPEC is heated chemotherapy, generally associated with an open or extensive abdominal sitting, and is often discussed alongside cytoreductive surgery. CRS + HIPEC removes visible deposits, then delivers heated chemotherapy. They are not interchangeable.",
    ],
    rows: [
      {
        name: "PIPAC",
        relative: "Pressurized aerosol chemotherapy, laparoscopic, often repeated sittings",
        detail: "This sheet. Typical stay [STAY] per sitting as quoted.",
        procedure: "PIPAC",
      },
      {
        name: "CRS + HIPEC",
        relative: "Cytoreduction plus heated intraperitoneal chemotherapy in selected cases",
        detail: "Neighbouring GAF sheet. Different drugs, stay and quotation.",
        procedure: "Cytoreductive Surgery with HIPEC",
      },
      {
        name: "Cytoreductive surgery (CRS)",
        relative: "Removal of visible peritoneal deposits, without assuming HIPEC",
        detail: "Neighbouring GAF sheet. Do not compare a CRS letter with this band.",
        procedure: "Cytoreductive Surgery",
      },
    ],
  },

  topicSections: [
    {
      id: "how-works",
      heading: "How does PIPAC work?",
      paragraphs: [
        "After assessment, anaesthesia is general. Laparoscopic ports give a view of the peritoneal cavity. Chemotherapy is delivered as a pressurized aerosol, then the sitting is closed and you recover. Follow-up decides whether a further sitting is planned. This page does not describe graphic operative detail or technical machine settings.",
        "PIPAC is not a standard intravenous infusion. It is not HIPEC. It is not CRS. The treating team decides whether aerosol chemotherapy is an honest next step.",
      ],
    },
    {
      id: "cancers",
      heading: "Which cancers may be treated with PIPAC?",
      paragraphs: [
        "PIPAC has been used in selected settings involving peritoneal disease, depending on clinical practice and treatment goals. Examples discussed in selected patients include colorectal, gastric, ovarian and appendiceal peritoneal disease, and peritoneal metastases from other abdominal or pelvic malignancies.",
        "It is not universally indicated for these diagnoses. Neighbouring GAF sheets exist for colectomy, rectal cancer surgery, gastrectomy, CRS and CRS + HIPEC when those sittings are the billed episode. This page does not decide eligibility.",
      ],
    },
    {
      id: "during",
      heading: "What happens during a PIPAC procedure?",
      paragraphs: [
        "Preoperative evaluation, anaesthesia, laparoscopic access, abdominal assessment, aerosol chemotherapy, closure, recovery and monitoring. Pathology or visual assessment may feed the next oncology conversation. Further sittings, when planned, are scheduled after recovery — not as a same-week factory line.",
      ],
    },
  ],

  overview: {
    what: [
      "PIPAC — pressurized intraperitoneal aerosol chemotherapy — delivers chemotherapy into the peritoneal cavity as a pressurized aerosol during a laparoscopic procedure in selected patients. The aim is to treat peritoneal disease that is not being treated as a complete cytoreduction that week.",
      "Suitability depends on cancer type, disease distribution, prior treatment and clinical assessment. GAF Healthcare does not decide eligibility on this page.",
    ],
    who: [
      "Eligibility depends on cancer type, peritoneal involvement, extent and distribution of disease, previous systemic therapy, overall health, organ function, previous abdominal surgery, treatment objectives, and a multidisciplinary assessment. Extra-abdominal disease often means a different conversation.",
      "This page does not diagnose and does not recommend PIPAC, HIPEC, CRS or non-operative care for an individual.",
    ],
    how: [
      "Anaesthesia is general. Laparoscopic access is used. The abdomen is assessed. Chemotherapy is delivered as a pressurized aerosol. Instruments are removed. You recover under monitoring. Follow-up plans further sittings where clinically appropriate. This page does not describe graphic operative detail.",
    ],
    variations: [
      { label: "PIPAC sitting", detail: "This sheet. One laparoscopic aerosol sitting as quoted." },
      { label: "Sequence of PIPAC sittings", detail: "Often separate admissions and separate letters. Ask how many sittings are priced." },
      { label: "CRS + HIPEC", detail: "Neighbouring catalog sheet. Different stay, drugs and quotation." },
      { label: "CRS without HIPEC", detail: "Neighbouring catalog sheet." },
    ],
    preparation: [
      "Expect bloods, coagulation, CT and anaesthetic assessment. MRI, PET-CT and biopsy are used where they change the plan.",
      "Bring prior chemotherapy dates, operative notes and a current medicine list. Do not book same-week theatre after a long-haul landing.",
    ],
    recovery: [
      "Hospital stay per sitting is typically [STAY]. Early days watch pain, diet, mobility, nausea and infection. This page does not set a diet or a discharge date.",
      "Abdominal discomfort, nausea, fatigue, infection, bleeding, anaesthesia-related problems, bowel-related complications and prolonged stay can occur. Risk varies with disease burden, prior surgery and fitness. Individual percentages are not published here.",
      "Follow-up decides further sittings or a change of plan. International patients often need a hotel night or two before a long-haul flight — less than a HIPEC recovery, still not a same-day airport dash unless the named surgeon is content.",
    ],
  },

  fullPathway: {
    intro: [
      "PIPAC procedure cost is not total trip cost and is not total cancer treatment cost. Staging, further sittings, systemic therapy, hotel, flights and a companion are the rest of the budget.",
      "Add your own numbers: PIPAC sitting as quoted × planned sittings + staging tests + oncology if in India + flights + visa + hotel nights × rate + attendant costs + contingency. Do not invent a total from this page.",
    ],
    stages: [
      { label: "Staging and peritoneal assessment", detail: "CT, MRI or PET-CT where indicated. Often extra if done in India." },
      { label: "Each PIPAC sitting", detail: "Laparoscopic aerosol chemotherapy, anaesthesia, [STAY] and pathology where bundled. This is the [INDIA_COST] line when the letter matches that scope." },
      { label: "Further sittings, if planned", detail: "Often a new estimate. Cadence is a clinical plan, not a package of three." },
      { label: "Flights, visa and hotel", detail: "Patient and attendant. Visa issuance is not guaranteed. Write duration for [STAY] plus hotel — and for return sittings if already planned." },
    ],
  },

  journey: [
    { label: "Submit medical records", detail: "CT or MRI, pathology, chemotherapy dates, prior operative notes." },
    { label: "Specialist evaluation", detail: "A surgeon who performs PIPAC reads the films and says whether PIPAC, CRS, CRS + HIPEC or a non-operative path is honest." },
    { label: "Treatment plan and cycle discussion", detail: "How many sittings, which drug, and what would stop the sequence." },
    { label: "Hospital selection and cost estimate", detail: "An itemised letter that names PIPAC, the drug, and how further sittings are billed." },
    { label: "Travel, admission and procedure", detail: "Visa issuance is not guaranteed. Theatre time is typically one to two hours per sitting." },
    { label: "Recovery, follow-up and return", detail: "Fly when the named surgeon is content. Further sittings may mean a second trip or a longer visa." },
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

  cities: pipacCities,

  destinations: [
    {
      country: "India",
      stay: "[STAY]",
      positioning: "Catalog PIPAC planning range",
      context: "A named PIPAC-certified listing currently sits in Chennai. Other metros are matched after records review. CRS and CRS + HIPEC have dedicated sheets. The partner band is per sitting as quoted — further cycles are often separate letters.",
    },
    { country: "Turkey", costLevel: [1, 1.8], stay: "2–5 nights", positioning: "Packaged medical-travel market", context: "Verify whether the letter is PIPAC or HIPEC, how many sittings are priced, and whether the drug is inside." },
    { country: "Thailand", costLevel: [1.2, 2.2], stay: "2–5 nights", positioning: "Private-hospital tourism", context: "Established international desks; a series of PIPAC sittings can still sit above a single India letter." },
    { country: "United Arab Emirates", costLevel: [2, 3.4], stay: "2–5 nights", positioning: "Regional premium private care", context: "Short flights from much of Africa and West Asia; private PIPAC pricing is closer to Western self-pay." },
    { country: "Singapore", costLevel: [2.6, 4.4], stay: "2–5 nights", positioning: "High-cost private hub", context: "Mature multidisciplinary process at premium private tariffs." },
    { country: "Germany", costLevel: [2.2, 4.2], stay: "2–6 nights", positioning: "European peritoneal programmes", context: "Structured MDT process; self-pay deposits are typical for visitors. Confirm PIPAC versus HIPEC." },
    { country: "United Kingdom", costLevel: [1.8, 3.4], stay: "2–5 nights", positioning: "Private self-pay (NHS generally not for visitors)", context: "NHS care is not available to most overseas visitors. Private self-pay applies." },
    { country: "United States", stay: "2–5 nights", positioning: "Highest self-pay outlier", context: "Facility, surgeon, drugs and later oncology bills often arrive separately. Public comparable PIPAC cash-pay is limited." },
  ],

  destinationIntro: [
    "The table below is a planning comparison for PIPAC as a laparoscopic sitting. India and United States figures come from the GAF Healthcare catalog. Other markets are modelled from the India midpoint using relative private-care cost levels, and are labelled as indicative planning estimates — not hospital quotations. PIPAC protocols, number of cycles, drugs, stay and inclusions differ by country. CRS and HIPEC are not priced as the same sitting.",
  ],

  destinationNote:
    "International treatment costs vary by hospital, surgeon, cancer type, peritoneal tumour burden, chemotherapy protocol, number of cycles, length of stay, ICU requirements, oncology treatment and what is included in the package. These figures are intended for preliminary comparison only and are not final quotations. Figures other than India and the United States are modelled planning estimates.",

  cityIntro: [
    "City names below are working filter URLs. Open Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad for the city overlay and the filtered doctor and hospital cards.",
    "We do not invent a different PIPAC tariff for each metro. The approximate cost column uses the India planning band of [INDIA_COST] unless a researched city figure exists. Named PIPAC tagging on this catalog currently sits in Chennai; other cities are matched after records review.",
  ],

  whyIndia: [
    "International patients consider India for PIPAC when they are self-funding a peritoneal sitting, when they want a named laparoscopic aerosol plan rather than a two-week cytoreduction, and when they need the letter to say PIPAC — not HIPEC — before they compare prices. The catalog range [INDIA_COST] sits well below typical US cash-pay of [US_COST] because theatre and ward time are priced on a different cost base — not because the sitting is a lesser product by definition.",
    "None of that is a claim of world's-best PIPAC surgeons, guaranteed control or always-cheapest care. Someone whose insurance covers the pathway at home, or whose staging shows a different sitting is honest, may be better treated locally.",
  ],

  whyCostDiffers: [
    "The figure on this page is a PIPAC planning range per sitting as quoted. The figure on a hospital letter is an estimate written against a named drug and a stated number of sittings. Those two documents are not supposed to match to the dollar.",
    "PIPAC can describe one laparoscopic sitting or a sequence. Cost may change because of cycle count, drug, cancer type, disease burden, hospital, specialist, investigations, stay and oncology.",
    "If two hospitals quote different numbers, read whether they are pricing the same number of sittings and the same drug. Higher cost is not a measure of better treatment.",
  ],

  planningClose: [
    "PIPAC in India is typically planned in the [INDIA_COST] band per sitting as quoted and the inpatient stay, against [US_COST] self-pay in the United States. The first variable that actually starts the letter is how many sittings are priced and which aerosol agent is named.",
    "A named PIPAC-certified consultant currently sits in Chennai on this catalog. Delhi NCR, Mumbai, Bengaluru and Hyderabad are matched after records review. Doctor and hospital cards link only to profiles that already exist.",
    "A personalized quotation, written after records review, is the document you should travel on. Cost ranges on this page are intended for preliminary planning and comparison only. Final PIPAC costs vary according to the patient's clinical condition, cancer type, treatment plan, chemotherapy protocol, number of treatment cycles, hospital, specialist, length of stay and other factors. A personalized quotation should be obtained before making treatment or travel decisions.",
  ],

  questionsToAsk: [
    "Is this letter PIPAC, HIPEC, or CRS + HIPEC?",
    "Is the person on this call the person in theatre?",
    "What chemotherapy drug is included?",
    "How many PIPAC sittings does this estimate cover?",
    "Are subsequent cycles priced separately?",
    "Is anaesthesia and hospital stay included?",
    "Are diagnostics and pathology included?",
    "What happens if hospitalization is extended?",
    "Are systemic cancer treatments excluded?",
  ],

  faqs: [
    { q: "What is PIPAC?", a: "Pressurized intraperitoneal aerosol chemotherapy: chemotherapy delivered into the peritoneal cavity as a pressurized aerosol during a laparoscopic sitting in selected patients. It is not intravenous chemotherapy, not HIPEC, and not cytoreductive surgery. Suitability depends on disease distribution and a treating team's assessment." },
    { q: "What does PIPAC stand for?", a: "PIPAC stands for pressurized intraperitoneal aerosol chemotherapy. Some centres spell it pressurised. The letters describe aerosol delivery into the abdomen during a laparoscopic sitting, not a heated bath after cytoreduction, and not an intravenous drip. Confirm the sitting name on the hospital letter before you compare prices." },
    { q: "How much does PIPAC cost in India?", a: "Plan against [INDIA_COST] per sitting as quoted, anaesthesia, stay of [STAY] and the named aerosol agent where written. Typical US self-pay is [US_COST]. Further cycles are often separate letters. The final figure is an itemised hospital estimate after records review." },
    { q: "How does PIPAC work?", a: "Under general anaesthesia, laparoscopic ports allow assessment of the peritoneal cavity. Chemotherapy is delivered as a pressurized aerosol, then you recover. Follow-up decides whether a further sitting is planned. This page does not describe graphic operative detail or machine settings." },
    { q: "Is PIPAC the same as HIPEC?", a: "No. PIPAC is pressurized aerosol chemotherapy, usually laparoscopic, often repeated as short sittings. HIPEC is heated chemotherapy, generally associated with an extensive abdominal sitting and often with cytoreductive surgery. Neighbouring GAF sheet: Cytoreductive Surgery with HIPEC. They are not interchangeable." },
    { q: "Is PIPAC the same as cytoreductive surgery?", a: "No. CRS removes visible peritoneal deposits in selected patients and is a long abdominal sitting. PIPAC does not replace a complete cytoreduction. Neighbouring GAF sheet: Cytoreductive Surgery. Do not compare a CRS letter with a PIPAC letter as the same operation." },
    { q: "Which cancers may be treated with PIPAC?", a: "Selected peritoneal disease, including selected colorectal, gastric, ovarian and appendiceal settings, among others. Not every patient with those diagnoses is eligible. Distribution, prior therapy and fitness matter. Neighbouring sheets exist when colectomy, gastrectomy or CRS + HIPEC is the billed episode. This page does not assign a diagnosis or a protocol." },
    { q: "Who may be considered for PIPAC?", a: "Patients whose treating team judges that aerosol chemotherapy is an honest next step given peritoneal distribution, prior treatment, organ function and treatment goals. Extra-abdominal disease often means a different conversation. This page does not decide eligibility for a named patient." },
    { q: "How long does a PIPAC procedure take?", a: "Typically about one to two hours per sitting. Assessment time and prior adhesions can lengthen that. A PIPAC sitting is not an eight-to-fourteen-hour CRS + HIPEC theatre, and theatre time is not the same as hospital stay. This page does not promise duration for a named patient." },
    { q: "How long is the hospital stay after PIPAC?", a: "Typically [STAY] per sitting as quoted on this sheet. Complications extend that. International patients should add hotel time until the named surgeon is content you can fly. Further sittings, when planned, are often a new admission rather than one long stay. This page does not promise a discharge date." },
    { q: "How many PIPAC treatments may a patient receive?", a: "Some plans involve a sequence of sittings; others stop after one. Cadence is a clinical decision after recovery and imaging, not a fixed package of three. Ask how many sittings the current letter covers and how further cycles are billed." },
    { q: "What is included in the cost of PIPAC?", a: "A typical estimate covers the named surgeon, anaesthesia, theatre, PIPAC consumables and drug where written, quoted nights, routine inpatient medicines and pathology where bundled. Confirm cycle count, extra nights and imaging. Anything not on the letter is extra until confirmed." },
    { q: "What costs may be additional?", a: "Often: staging CT or PET-CT, biopsy, molecular tests, systemic chemotherapy, further PIPAC sittings, extra nights, complication management, hotel, flights, visa-related expenses and attendant living costs. Procedure cost is not total trip cost, and a sequence of sittings is not automatically one letter." },
    { q: "How do I choose a PIPAC specialist?", a: "Use listed consultants whose catalog procedures include PIPAC, and insist on speaking to the person who would operate. A HIPEC tag is not a PIPAC quotation, and an education line that mentions PIPAC is not the same as a procedure card. Placement on this page is not a league table." },
    { q: "How do I choose a PIPAC hospital in India?", a: "Choose on the named surgeon, whether the campus actually runs PIPAC that week, and the address on the letter. Accreditation on a profile is as published. Listing is not a ranking, a volume claim, or a guarantee that aerosol chemotherapy is on the list that week." },
    { q: "Can international patients send records before travelling?", a: "Yes. Submit recent CT or MRI, pathology, chemotherapy dates and prior operative notes so a listed PIPAC surgeon can say whether PIPAC, CRS, CRS + HIPEC or a non-operative path is honest before you fly. Visa issuance is not guaranteed by that review." },
    { q: "Is PIPAC suitable for every patient with peritoneal cancer?", a: "No. Selection depends on disease distribution, prior treatment, fitness and treatment goals. PIPAC is not universally appropriate, and it does not replace cytoreductive surgery or HIPEC when those sittings are the honest plan. A treating team decides after records review. This page does not recommend PIPAC for an individual." },
  ],

  doctorHeading: "Doctors to consider for PIPAC in India",
  cityDoctorHeading: "PIPAC Specialists in [CITY]",
  doctorIntro:
    "These are consultants listed on GAF Healthcare whose catalog procedures include PIPAC. Profiles show training, campus and procedures as held in the catalog. There are no rankings here. A named PIPAC-certified listing currently sits in Chennai (Dr. Keshavarajan G, Rela Hospital). Other metros are matched after records review. A CRS + HIPEC tag is not treated as a PIPAC listing. Education lines that mention PIPAC without a procedure tag are discussed on the relevant city overlay, not printed as specialist cards.",
  hospitalHeading: "Hospitals to consider for PIPAC in India",
  cityHospitalHeading: "PIPAC Hospitals in [CITY]",
  hospitalIntro:
    "Campuses on GAF Healthcare where this pathway is listed from catalog matching, with accreditation as published by the hospital. Listing is not a claim of PIPAC volume. Choose on the surgeon you met on camera and whether the house actually runs PIPAC that week — not on a brand slogan.",

  relatedProcedures: [
    "Cytoreductive Surgery",
    "Cytoreductive Surgery with HIPEC",
    "Ovarian Cancer Cytoreductive Surgery",
    "Colectomy",
    "Rectal Cancer Surgery",
    "Gastrectomy",
    "Chemotherapy",
    "Intraperitoneal Chemotherapy",
  ],

  relatedBlogs: [
    { href: "/costs/cytoreductive-surgery-with-hipec", label: "cytoreductive surgery with HIPEC cost in India" },
    { href: "/costs/cytoreductive-surgery", label: "cytoreductive surgery cost in India" },
    { href: "/costs/colectomy", label: "colorectal cancer surgery cost in India" },
    { href: "/costs/gastrectomy", label: "gastrectomy cost in India" },
    { href: "/costs/ovarian-cancer-cytoreductive-surgery", label: "ovarian cancer cytoreductive surgery cost in India" },
    { href: "/costs?specialty=Surgical+Oncology", label: "surgical oncology costs in India" },
    { href: "/doctors?destination=India&procedure=PIPAC", label: "PIPAC specialists in India" },
    { href: "/hospitals?destination=India&procedure=PIPAC", label: "PIPAC hospitals in India" },
  ],

  figures: [
    {
      after: "overview",
      src: "/costs/pipac-pressurized-intraperitoneal-aerosol-chemotherapy.webp",
      alt: "Medical illustration explaining how PIPAC delivers pressurized aerosol chemotherapy into the abdominal cavity",
      caption: "PIPAC delivers chemotherapy as a pressurized aerosol during a laparoscopic sitting. It is not HIPEC and not CRS.",
      fit: "contain",
    },
    {
      after: "how",
      src: "/costs/pipac-vs-hipec-treatment-comparison.webp",
      alt: "Illustration comparing PIPAC and HIPEC approaches for intraperitoneal chemotherapy",
      caption: "PIPAC and HIPEC are different approaches. The treating team decides which sitting is honest.",
      fit: "contain",
    },
    {
      after: "journey",
      src: "/costs/pipac-treatment-journey-india.webp",
      alt: "Illustration showing the international patient journey for PIPAC treatment in India",
      caption: "Records first. Cycles are often priced as separate sittings.",
      fit: "contain",
    },
  ],
};
