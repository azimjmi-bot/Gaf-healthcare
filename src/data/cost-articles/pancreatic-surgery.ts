import type { CostArticle } from "./types";
import { pancreaticSurgeryCities } from "./pancreatic-surgery-cities";

export const pancreaticSurgery: CostArticle = {
  procedure: "Pancreatic Surgery",
  shortName: "pancreatic surgery",
  briefName: "Pancreatic Surgery",
  duration: "typically 3–8 hours depending on the sitting",
  recoveryGlance: "Inpatient [STAY], then hotel step-down. Varies by sitting.",
  slug: "pancreatic-surgery",
  lastUpdated: "2026-09-10",
  seoTitle: "Pancreatic Surgery Cost in India: Prices, Cities & Hospitals",
  seoDescription:
    "Pancreatic surgery cost in India is typically [INDIA_COST] for the operation and a stay of [STAY], against [US_COST] self-pay in the US. Compare Whipple, distal and total pancreatectomy, cities, listed surgeons and hospitals.",
  heading: "Pancreatic Surgery Cost in India",
  heroSubtitle:
    "Compare pancreatic surgery planning ranges in India, see how Whipple, distal and total pancreatectomy change a hospital quotation, and explore listed pancreatic surgeons across major Indian cities.",
  introduction: [
    "Families usually search pancreatic surgery cost after a scan has shown a lesion in the gland — head, body or tail — and someone has already used the word resectable. Pancreatic surgery is not one operation. A Whipple sitting, a distal pancreatectomy and a total pancreatectomy remove different parts of the pancreas, reconstruct differently, and spend different nights in ICU. Comparing a single headline price as if those sittings were interchangeable is how two honest letters look dishonest.",
    "Location of disease, resectability, vessel contact and whether the spleen comes out with the tail all change theatre time and stay. Cost in India sits in a GAF planning range — currently [INDIA_COST] for a pancreatic resection as quoted and a stay of [STAY] — because reconstruction, possible high-dependency care and a fistula watch are not priced like a short endoscopy. That band is a planning range, not a hospital quotation. Surgery cost is not total pancreatic-cancer treatment cost. Neighbouring sheets exist for Whipple Procedure and distal pancreatectomy when the sitting is already named.",
  ],
  overviewHeading: "What is pancreatic surgery?",
  whoHeading: "When is pancreatic surgery recommended?",

  answer: [
    "Pancreatic surgery cost in India typically ranges from [INDIA_COST] for the planned resection, anaesthesia, histopathology and a hospital stay of [STAY]. Typical US self-pay for a comparable surgical episode is [US_COST]. Theatre time is usually about three to eight hours depending on whether the sitting is a distal pancreatectomy, a Whipple procedure or a total pancreatectomy.",
    "That figure is a planning range, not a hospital quotation, and it is not a price for every named sitting. Dedicated GAF sheets exist for Whipple Procedure and distal pancreatectomy. This page is the family range. A typical surgical estimate covers the named surgeon, operating room, anaesthesia, quoted nights including ICU if named, routine inpatient medicines and specimen pathology. CT, MRI/MRCP, EUS, biopsy, chemotherapy, extra fistula days and travel are frequently not.",
    "What moves the number most is which operation is actually planned, vascular work, open versus minimally invasive access, named ICU nights, campus tier and the named consultant. International patients should budget the weeks around the knife — and any oncology in the same visa window — not only the theatre block.",
  ],

  indiaCost: [
    "There is no single pancreatic-surgery price in India, because there is no single pancreatic operation. The [INDIA_COST] band is a planning range for a pancreatic resection as quoted — theatre, anaesthesia, the named surgeon, quoted room and nights, routine inpatient drugs, ICU as written, and histopathology. The lower end typically reflects a straightforward distal pancreatectomy at a mid-tier campus toward the shorter end of [STAY]. The upper end typically reflects a flagship campus, a Whipple or total pancreatectomy, vascular work, a private room and a stay toward 16 nights. Same family name is not the same surgical plan. A letter written for Whipple is not a letter written for distal pancreatectomy.",
    "Surgery cost is not total pancreatic-cancer treatment cost. Staging, systemic therapy and later surveillance sit on neighbouring estimates. Which sitting, campus tier and named ICU nights move the bill more than the metro name.",
  ],

  costComponents: [
    {
      label: "Surgeon fee and surgical team",
      detail: "Usually bundled for the named HPB, GI or surgical-oncology consultant. Confirm who is in theatre and which sitting they would actually perform.",
    },
    {
      label: "Hospital and operating-room charges",
      detail: "Theatre time, energy devices and recovery. Whipple sittings are typically longer than distal ones. Laparoscopic or robotic access, when used, reprices this block.",
    },
    {
      label: "Anaesthesia",
      detail: "Anaesthetist fee and drugs for a three-to-eight-hour case. Cardiopulmonary clearance may be billed outside.",
    },
    {
      label: "ICU and critical-care monitoring",
      detail: "Early high-dependency care is common after Whipple or total pancreatectomy. Nights inside the quoted stay may be bundled; extra fistula or delayed-emptying days are typically extra.",
    },
    {
      label: "Diagnostic investigations",
      detail: "Standard bloods and ECG are often inside the admission. Pancreas-protocol CT, MRI/MRCP, EUS, biopsy and CA 19-9 are frequently extra if not already done at home.",
    },
    {
      label: "Pathology",
      detail: "Processing of the specimen and margins. Molecular assays, when ordered, are often billed later.",
    },
    {
      label: "Medicines and nutrition",
      detail: "Inpatient analgesia, antibiotics, enzyme replacement where started in hospital, and insulin where a total pancreatectomy is planned. This page does not set a diet.",
    },
    {
      label: "Room charges and nursing",
      detail: "Written against a room category and nights — typically [STAY]. Companion beds change the nightly rate.",
    },
  ],

  whyQuotesDiffer:
    "Two honest estimates can differ because the operations are not the same. Whipple is not distal pancreatectomy. A head tumour clear of vessels is not a borderline-resectable sitting with vein reconstruction. Open is not laparoscopic. Named ICU nights are not extra fistula days. Campus tier and the named surgeon move the bill more than the city on the boarding pass. Higher cost is not a measure of better care.",

  costDrivers: [
    { label: "Type of pancreatic surgery", detail: "Whipple, distal and total pancreatectomy are different sittings with different reconstruction and stay. Name the operation on the letter." },
    { label: "Diagnosis and tumour location", detail: "Head disease and body-tail disease are planned differently. Location decides whether Whipple is even the honest operation." },
    { label: "Cancer stage and resectability", detail: "Resectable, borderline-resectable, locally advanced and metastatic disease are different conversations." },
    { label: "Vascular involvement", detail: "Vein reconstruction, when planned, lengthens theatre and ICU. Ask whether the letter assumes it." },
    { label: "Open versus laparoscopic versus robotic access", detail: "When offered, ports change theatre time and consumables. None is universally better. No separate GAF access tariff on this family sheet." },
    { label: "Surgeon, hospital and campus tier", detail: "The estimate should name the consultant and the operating address. Flagship versus satellite units sit at different price levels." },
    { label: "City and companion logistics", detail: "Surgical fees cluster more tightly across the five metros than hotel bills for two to four weeks." },
    { label: "ICU, length of stay and complications", detail: "Packages are written for [STAY]. Extra nights after fistula, delayed gastric emptying or bleeding are usually billed fresh." },
    { label: "Pathology and additional cancer treatment", detail: "Specimen processing may be bundled. Chemotherapy, radiation and molecular tests are neighbouring quotes unless named." },
  ],

  inclusions: [
    { label: "Consultation that leads into the admission", detail: "The in-person pre-operative review with the named surgeon, where bundled." },
    { label: "Surgery by the named consultant", detail: "The resection as written on the estimate — Whipple, distal or total, not an unnamed robotic sitting unless the letter says so." },
    { label: "Anaesthesia and operating room", detail: "Anaesthesia team, theatre time, standard consumables and recovery for the scheduled case." },
    { label: "Hospital stay as quoted", detail: "Bed charges, nursing and routine ward care for the room and nights written — typically [STAY], including ICU if named." },
    { label: "Routine tests and specimen pathology", detail: "Standard bloods, coagulation, ECG and histopathology where bundled." },
    { label: "Medicines during admission", detail: "Analgesia, antibiotics and routine drugs during the quoted stay." },
  ],

  exclusions: [
    { label: "Staging imaging, EUS and biopsy", detail: "CT, MRI/MRCP, endoscopic ultrasound, biopsy and tumour-marker panels are frequently extra when ordered in India." },
    { label: "Systemic therapy and radiation", detail: "Chemotherapy, targeted therapy, immunotherapy and radiotherapy are neighbouring quotes." },
    { label: "Extra ICU, fistula care and re-operation", detail: "Nights and theatre beyond the quoted stay are typically a new event." },
    { label: "Blood products and molecular pathology", detail: "Transfusion and NGS, when required, are commonly billed later." },
    { label: "Travel, accommodation and visa-related expenses", detail: "Flights, hotel after discharge, local transport and companion living costs sit outside every hospital estimate." },
  ],

  approachComparison: {
    heading: "What are the main types of pancreatic surgery?",
    intro: [
      "The rows below are different operations, not upgrades of the same product. GAF Healthcare publishes a family planning range on this sheet. Dedicated catalog sheets exist where the sitting is already named. None is universally better.",
      "Selection depends on tumour location, extent, resectability and the operating team's assessment. This page does not recommend Whipple, distal or total pancreatectomy for an individual.",
    ],
    rows: [
      {
        name: "Whipple Procedure",
        relative: "Pancreatic head and neighbouring structures, then reconstruction",
        detail: "Typical sitting for selected tumours of the pancreatic head, ampulla, distal bile duct or duodenum. Dedicated GAF Whipple cost sheet.",
        procedure: "Whipple Procedure",
      },
      {
        name: "Distal pancreatectomy",
        relative: "Body and tail; spleen sometimes included",
        detail: "Used when disease sits in the body or tail. Different reconstruction, usually a shorter stay. Neighbouring catalog sheet.",
        procedure: "Distal Pancreatectomy",
      },
      {
        name: "Total pancreatectomy",
        relative: "Entire pancreas in selected cases",
        detail: "Selected diffuse or multifocal disease. Lifelong insulin and enzyme replacement follow. Neighbouring catalog sheet.",
        procedure: "Pancreatectomy",
      },
    ],
  },

  accessComparison: {
    heading: "Is minimally invasive or robotic pancreatic surgery available in India?",
    intro: [
      "Open, laparoscopic and robotic-assisted access can all be used for selected pancreatic resections when the treating team judges them suitable. None is universally better. Minimally invasive access is not suitable for every tumour, every anatomy or every hospital week.",
      "Suitability depends on the sitting (Whipple versus distal), vessel anatomy, prior surgery, surgeon expertise and campus resources. There is no separate GAF laparoscopic or robotic tariff on this family sheet. Ask whether it is actually offered for your lesion.",
    ],
    rows: [
      {
        name: "Open",
        access: "One abdominal incision",
        method: "Direct handling of the gland, vessels and reconstruction. Still used when ports are not honest or not available.",
        resources: "Standard theatre. ICU follows the sitting, not the incision length.",
        recovery: "Wound recovery can be slower. Fistula watch and nutrition still dominate stay.",
        cost: "Often the lower theatre-consumable line. Not automatically the cheaper total bill if the sitting is a Whipple with vascular work.",
      },
      {
        name: "Laparoscopic",
        access: "Ports, sometimes with a small extraction incision",
        method: "Same oncological jobs through ports when offered. Distal pancreatectomy is more often offered this way than a complex Whipple.",
        resources: "Laparoscopic stack and a trained team. Conversion to open remains possible.",
        recovery: "Some patients mobilise sooner. Fistula and delayed emptying are not removed by ports.",
        cost: "Theatre time and devices can sit toward the upper part of the band. No separate GAF laparoscopic tariff.",
      },
      {
        name: "Robotic-assisted",
        access: "Ports plus a console where the hospital actually offers it that week",
        method: "Wristed instruments for selected anatomy. Still the same named sitting — Whipple, distal or total.",
        resources: "Console time and often a higher consumable envelope. Not universally available.",
        recovery: "Recovery still follows the joins and remnant function — not the brand of robot.",
        cost: "A different resource envelope. There is no separate GAF robotic-pancreatic tariff.",
      },
    ],
  },

  topicSections: [
    {
      id: "whipple",
      heading: "What is a Whipple Procedure?",
      paragraphs: [
        "Whipple surgery, or pancreaticoduodenectomy, removes the pancreatic head and neighbouring structures — typically the duodenum, gallbladder, part of the bile duct, and often the distal stomach — then reconstructs pancreas, bile duct and gut. Exact structures removed vary. It is a longer sitting than a distal pancreatectomy, with a dedicated GAF cost sheet: Whipple Procedure cost in India.",
        "Classic and pylorus-preserving versions are both Whipple operations. This family page does not replace that sheet. If imaging already points to the head, ampulla or distal bile duct, use the Whipple letter — not this family range — as the comparison document.",
      ],
    },
    {
      id: "distal",
      heading: "What is a distal pancreatectomy?",
      paragraphs: [
        "Distal pancreatectomy removes the body and tail of the pancreas. The spleen may come out with the tail when vessels or disease require it; spleen-preserving sittings are used when the team judges them honest. Open, laparoscopic and robotic access are all used in selected cases.",
        "Stay is typically shorter than after Whipple surgery. Neighbouring GAF sheet: distal pancreatectomy. Do not accept a blended 'pancreas package' that mixes a distal sitting with a Whipple price.",
      ],
    },
    {
      id: "total",
      heading: "What is a total pancreatectomy?",
      paragraphs: [
        "Total pancreatectomy removes the entire pancreas in selected diffuse or multifocal disease. Afterward, the patient has no pancreatic insulin or enzyme production — lifelong insulin and enzyme replacement are expected. That is a different recovery and a different letter from a distal sitting.",
        "Neighbouring catalog sheet: pancreatectomy. This page does not recommend total pancreatectomy for an individual.",
      ],
    },
  ],

  overview: {
    what: [
      "Pancreatic surgery is a family of operations that remove part or all of the pancreas when the treating team judges resection necessary. The pancreas sits behind the stomach, with its head in the duodenal C-loop and its tail toward the spleen. Disease in the head is a different conversation from disease in the tail.",
      "Which sitting is planned depends on location, type of disease, size, resectability, nearby vessels and overall health. GAF Healthcare does not decide on this page which operation is appropriate. Treatment plans are determined by qualified doctors after evaluation.",
    ],
    who: [
      "Resection may be considered for selected pancreatic cancers, selected neuroendocrine tumours, some cystic or premalignant lesions, and selected chronic pancreatitis. Not every pancreatic condition requires surgery. Metastatic disease, unresectable vascular encasement or poor fitness often mean a different path.",
      "This page does not diagnose and does not recommend Whipple, distal pancreatectomy, total pancreatectomy or non-operative care for an individual.",
    ],
    how: [
      "Anaesthesia is general. Access may be open or, when offered, laparoscopic or robotic. The planned portion of pancreas is removed. Neighbouring structures and reconstruction follow the sitting. You wake on a ward or in high-dependency care. Pathology feeds the next oncology conversation. This page does not describe graphic operative detail.",
    ],
    variations: [
      { label: "Whipple Procedure", detail: "Head and neighbouring structures. Dedicated cost sheet." },
      { label: "Distal pancreatectomy", detail: "Body and tail; spleen sometimes included. Neighbouring sheet." },
      { label: "Total pancreatectomy", detail: "Entire gland in selected cases. Lifelong insulin and enzymes." },
      { label: "Other selected procedures", detail: "Enucleation or drainage procedures in carefully selected benign disease — named on the letter, not assumed from this family range." },
    ],
    preparation: [
      "Expect bloods including liver, kidney and coagulation, pancreas-protocol CT, and anaesthetic assessment. MRI/MRCP, EUS, biopsy and CA 19-9 are used where clinically relevant.",
      "Bring prior chemotherapy dates, biliary-stent notes if jaundiced, and a diabetes history. Do not book same-week theatre after a long-haul landing.",
    ],
    recovery: [
      "Hospital stay is typically [STAY]. Early days watch drains, blood sugar where relevant, pain, nutrition and mobility. This page does not set a diet or a discharge date.",
      "Pancreatic fistula, delayed gastric emptying, bile leak, infection, bleeding, nutritional and blood-sugar changes, clots and respiratory issues can extend stay. Risk varies with sitting and fitness. Individual percentages are not published here.",
      "Pathology review decides further oncology. International patients often need further hotel days before a long-haul flight.",
    ],
  },

  fullPathway: {
    intro: [
      "Surgery cost is not total trip cost and is not total pancreatic-cancer treatment cost. Staging, systemic therapy, extra ICU, hotel, flights and a companion who can stay are the rest of the budget.",
      "Add your own numbers: surgery + quoted stay + staging tests + oncology if in India + flights + visa + hotel nights × rate + transport + attendant costs + contingency for extra nights. Do not invent a total from this page.",
    ],
    stages: [
      { label: "Staging and resectability work-up", detail: "Pancreas-protocol CT, MRI/MRCP or EUS where indicated. Often extra if done in India." },
      { label: "Systemic therapy or radiation, if used", detail: "Neighbouring cost sheets. Can add weeks in the city." },
      { label: "The operation", detail: "Named sitting, anaesthesia, ICU as quoted, [STAY] and pathology. This is the [INDIA_COST] line when the letter matches that scope." },
      { label: "Extra ICU, fistula care, transfusion", detail: "Beyond the quoted nights." },
      { label: "Flights, visa and hotel after discharge", detail: "Patient and attendant. Visa issuance is not guaranteed. Write duration for [STAY] plus hotel recovery." },
    ],
  },

  journey: [
    { label: "Submit medical records", detail: "Pancreas-protocol CT, bloods, biopsy if done, CA 19-9 if available." },
    { label: "Imaging and specialist review", detail: "A surgeon who resects pancreas names the sitting on camera." },
    { label: "Staging and resectability", detail: "Vessel contact and metastatic disease are checked before a date is offered." },
    { label: "Plan, estimate and hospital selection", detail: "An itemised letter for the named sitting. Compare the surgeon you met and fistula-aware ICU." },
    { label: "Travel, admission and surgery", detail: "Visa issuance is not guaranteed. Theatre time follows the sitting." },
    { label: "Recovery, pathology and return", detail: "Fly when the named surgeon is content. Extra nights are a clinical decision, not a package failure." },
  ],

  documents: [
    "Pancreas-protocol CT, plus MRI/MRCP or EUS if already done",
    "Liver-function tests, blood count, coagulation and kidney function",
    "CA 19-9 if already measured",
    "Biopsy histopathology if a sample has already been taken",
    "Chemotherapy summary if treatment has started",
    "Biliary-stent notes if jaundiced",
    "Diabetes history and current medication list",
    "Passport, and a hospital invitation letter for the medical visa application",
  ],

  cities: pancreaticSurgeryCities,

  destinations: [
    {
      country: "India",
      stay: "[STAY]",
      positioning: "Catalog family planning range",
      context: "Named pancreatic-resection listings can be met on camera. Listed consultants currently sit in Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad. Whipple and distal sittings have dedicated sheets.",
    },
    {
      country: "Turkey",
      costLevel: [1, 1.8],
      stay: "8–16 nights",
      positioning: "Packaged medical-travel market",
      context: "Verify whether the sitting is named, and whether ICU and fistula management are inside the bundle.",
    },
    {
      country: "Thailand",
      costLevel: [1.2, 2.2],
      stay: "8–16 nights",
      positioning: "Private-hospital tourism",
      context: "Established international desks; Whipple with ICU extras can sit well above India.",
    },
    {
      country: "United Arab Emirates",
      costLevel: [2, 3.4],
      stay: "8–16 nights",
      positioning: "Regional premium private care",
      context: "Short flights from much of Africa and West Asia; private HPB pricing is closer to Western self-pay.",
    },
    {
      country: "Singapore",
      costLevel: [2.6, 4.4],
      stay: "8–16 nights",
      positioning: "High-cost private hub",
      context: "Mature multidisciplinary process at premium private tariffs.",
    },
    {
      country: "Germany",
      costLevel: [2.2, 4.2],
      stay: "10–18 nights",
      positioning: "Certified European HPB units",
      context: "Structured MDT process; self-pay deposits are typical for visitors.",
    },
    {
      country: "United Kingdom",
      costLevel: [1.8, 3.4],
      stay: "8–16 nights",
      positioning: "Private self-pay (NHS generally not for visitors)",
      context: "NHS care is not available to most overseas visitors. Private self-pay applies.",
    },
    {
      country: "United States",
      stay: "7–14 nights",
      positioning: "Highest self-pay outlier",
      context: "Facility, surgeon, ICU, pathology and later oncology bills often arrive separately.",
    },
  ],

  destinationIntro: [
    "The table below is a planning comparison for pancreatic surgery as a family of operations. India and United States figures come from the GAF Healthcare catalog. Other markets are modelled from the India midpoint using relative private-care cost levels, and are labelled as indicative planning estimates — not hospital quotations. India is often less expensive for a self-funding patient. That is not the same as 'always cheapest' or 'best'.",
  ],

  destinationNote:
    "International treatment costs vary by hospital, surgeon, type of pancreatic surgery, resectability, surgical approach, length of stay, ICU requirements, oncology treatment and what is included in the package. These figures are intended for preliminary comparison only and are not final quotations. Figures other than India and the United States are modelled planning estimates.",

  cityIntro: [
    "City names below are working filter URLs. Open Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad for the city overlay and the filtered doctor and hospital cards.",
    "We do not invent a different family tariff for each metro. The approximate cost column uses the India planning band of [INDIA_COST] unless a researched city figure exists. What changes is the named consultant list and how expensive a multi-week companion stay feels.",
  ],

  whyIndia: [
    "International patients consider India for pancreatic surgery when they are self-funding a resection, when they want a named HPB surgeon before they fly, and when they need the sitting named — Whipple, distal or total — before they compare letters. The catalog range [INDIA_COST] sits well below typical US cash-pay of [US_COST], because theatre and ward time are priced on a different cost base — not because the operation is a lesser product by definition.",
    "None of that is a claim of 'best pancreatic surgeons in the world', guaranteed joins or 'cheapest in the world'. Someone whose insurance covers the pathway at home, or whose staging shows resection is not honest, may be better treated locally.",
  ],

  whyCostDiffers: [
    "The figure on this page is a family planning range. The figure on a hospital letter is an estimate written against a named sitting. Those two documents are not supposed to match to the dollar.",
    "Pancreatic surgery can mean very different operations. Cost may change because of Whipple versus distal versus total, tumour location, stage, vascular work, open versus minimally invasive access, ICU, extra nights and oncology.",
    "If two hospitals quote different numbers, read whether they are pricing the same sitting. Higher cost is not a measure of better treatment.",
  ],

  planningClose: [
    "Pancreatic surgery in India is typically planned in the [INDIA_COST] band for a named resection as quoted and the inpatient stay, against [US_COST] self-pay in the United States. The variable that actually starts the letter is which sitting — Whipple, distal or total.",
    "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad each have listed campuses. Doctor and hospital cards link only to profiles that already exist in the catalog.",
    "A personalized quotation, written after records review, is the document you should travel on. Cost ranges on this page are intended for preliminary planning and comparison only. Final treatment costs vary according to the patient's clinical condition, treatment plan, hospital, surgeon, surgical approach, length of stay and other factors. A personalized quotation should be obtained before making treatment or travel decisions.",
  ],

  questionsToAsk: [
    "Which sitting is this letter written for — Whipple, distal pancreatectomy or total pancreatectomy?",
    "Is the person on this call the person in theatre?",
    "Does the letter assume vascular reconstruction or spleen removal?",
    "Is the approach open, laparoscopic or robotic-assisted, and is that named?",
    "How many ICU nights are included, and what happens if I need more?",
    "Are CT, MRI/MRCP, EUS and biopsy included?",
    "Is pathology included? Molecular tests?",
    "Is chemotherapy or radiation included?",
    "What happens if a pancreatic fistula or extra hospitalization occurs?",
  ],

  faqs: [
    {
      q: "What is the cost of pancreatic surgery in India?",
      a: "Plan against [INDIA_COST] for a named pancreatic resection, anaesthesia, stay of [STAY] and specimen pathology. Typical US self-pay is [US_COST]. Whipple and distal pancreatectomy have dedicated GAF sheets when the sitting is already named. The final figure is an itemised hospital estimate.",
    },
    {
      q: "Is pancreatic surgery one operation?",
      a: "No. It is a family of operations. Whipple, distal pancreatectomy and total pancreatectomy remove different parts of the gland. Same family name is not the same surgical plan.",
    },
    {
      q: "What is the cost of a Whipple Procedure in India?",
      a: "Use the dedicated Whipple Procedure cost sheet. The family range on this page is not a substitute when imaging already points to a pancreaticoduodenectomy.",
    },
    {
      q: "What is the cost of distal pancreatectomy in India?",
      a: "Use the neighbouring distal pancreatectomy catalog sheet. Distal sittings are typically a different stay and reconstruction from Whipple surgery.",
    },
    {
      q: "How long is hospital stay after pancreatic surgery?",
      a: "Typically [STAY] on this family sheet. Whipple sittings often sit toward the longer end; distal sittings can be shorter. Fistula or delayed emptying extend that. This page does not promise a discharge date.",
    },
    {
      q: "How long does pancreatic surgery take?",
      a: "Typically about three to eight hours depending on the sitting. Whipple is usually longer than distal pancreatectomy. This page does not promise theatre time for a named patient.",
    },
    {
      q: "Is robotic pancreatic surgery available in India?",
      a: "Some listed campuses offer robotic-assisted resection. Availability is a diary and anatomy question. There is no separate GAF robotic-pancreatic tariff on this family sheet.",
    },
    {
      q: "What is included in the cost?",
      a: "A typical surgical estimate covers the named surgeon, anaesthesia, theatre, quoted ward or ICU nights, routine inpatient medicines and specimen pathology. Confirm the sitting, devices, extra ICU, imaging and drugs.",
    },
    {
      q: "What costs may be additional?",
      a: "Often: CT, MRI/MRCP, EUS, biopsy, systemic therapy, extra ICU, fistula management, transfusion, hotel, flights and visa-related expenses.",
    },
    {
      q: "How do I choose a pancreatic surgeon?",
      a: "Use listed consultants whose catalog procedures include pancreatic surgery, Whipple or pancreatic cancer surgery, and insist on speaking to the person who would operate. Placement is not a league table.",
    },
    {
      q: "How should I compare pancreatic surgery quotations?",
      a: "First confirm both letters name the same sitting. Then compare surgeon, vascular plan, approach, ICU nights, extra-night and fistula policy, imaging and oncology.",
    },
    {
      q: "How long should international patients stay in India?",
      a: "Plan the inpatient [STAY] plus further hotel days until the named surgeon is content you can fly. Whipple recovery is typically a longer hotel stretch than a straightforward distal sitting.",
    },
  ],

  doctorHeading: "Doctors to consider for pancreatic surgery in India",
  cityDoctorHeading: "Pancreatic Surgeons in [CITY]",
  doctorIntro:
    "These are consultants listed on GAF Healthcare whose catalog procedures include pancreatic surgery, Whipple Procedure or pancreatic cancer surgery. Profiles show training, campus and procedures as held in the catalog. There are no rankings here. Named listings currently sit in Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad.",
  hospitalHeading: "Hospitals to consider for pancreatic surgery in India",
  cityHospitalHeading: "Pancreatic Surgery Hospitals in [CITY]",
  hospitalIntro:
    "Campuses on GAF Healthcare where this surgical-oncology pathway is listed, with accreditation as published by the hospital. Listing is not a claim of pancreatic-resection volume or a ranking. Choose on the surgeon you met on camera and whether the house runs HPB lists — not on a brand slogan.",

  relatedProcedures: [
    "Whipple Procedure",
    "Distal Pancreatectomy",
    "Pancreatectomy",
    "Liver Resection (Hepatectomy)",
    "Gastrectomy",
    "Esophagectomy",
    "Colectomy",
    "Chemotherapy",
    "Neoadjuvant Chemotherapy",
    "Intensity-Modulated Radiotherapy (IMRT)",
  ],

  relatedBlogs: [
    { href: "/costs/whipple-procedure", label: "Whipple Procedure cost in India" },
    { href: "/costs/distal-pancreatectomy", label: "distal pancreatectomy cost in India" },
    { href: "/costs/liver-resection-hepatectomy", label: "liver resection cost in India" },
    { href: "/costs?specialty=Surgical+Oncology", label: "surgical oncology costs in India" },
    { href: "/costs?specialty=Surgical+Gastroenterology", label: "surgical gastroenterology costs in India" },
    { href: "/doctors?destination=India&procedure=Pancreatic+Surgery", label: "pancreatic surgery specialists in India" },
    { href: "/hospitals?destination=India&procedure=Pancreatic+Surgery", label: "pancreatic surgery hospitals in India" },
  ],

  figures: [
    {
      after: "overview",
      src: "/costs/pancreatic-surgery-anatomy-overview.webp",
      alt: "Medical illustration showing the pancreas and nearby digestive structures relevant to pancreatic surgery",
      caption: "Head, body and tail are different conversations. Location of disease decides the sitting.",
      fit: "contain",
    },
    {
      after: "how",
      src: "/costs/types-of-pancreatic-surgery.webp",
      alt: "Illustration comparing the main types of pancreatic surgery including Whipple Procedure, distal pancreatectomy and total pancreatectomy",
      caption: "Whipple, distal and total pancreatectomy are different operations. None is universally better.",
      fit: "contain",
    },
    {
      after: "journey",
      src: "/costs/pancreatic-surgery-treatment-journey-india.webp",
      alt: "Illustration showing the treatment journey for international patients planning pancreatic surgery in India",
      caption: "Records and a named sitting come before a ticket. Oncology and travel sit outside the surgical range unless named.",
      fit: "contain",
    },
  ],
};
