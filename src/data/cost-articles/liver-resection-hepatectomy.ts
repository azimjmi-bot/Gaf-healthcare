import type { CostArticle } from "./types";
import { liverResectionCities } from "./liver-resection-hepatectomy-cities";

export const liverResection: CostArticle = {
  procedure: "Liver Resection (Hepatectomy)",
  shortName: "liver resection",
  briefName: "Liver Resection",
  duration: "approximately 2–6 hours",
  recoveryGlance: "Inpatient [STAY], then hotel step-down. Varies by patient.",
  slug: "liver-resection-hepatectomy",
  lastUpdated: "2026-09-10",
  seoTitle: "Liver Resection Cost in India: Prices, Cities & Hospitals",
  seoDescription:
    "Liver resection (hepatectomy) cost in India is typically [INDIA_COST] for the operation and a stay of [STAY], against [US_COST] self-pay in the US. Compare resection extent, cities, listed hepatobiliary surgeons and hospitals, and how to request a personalized estimate.",
  heading: "Liver Resection (Hepatectomy) Cost in India",
  heroSubtitle:
    "Compare liver resection planning ranges in India, understand what can affect the final hospital quotation, and explore relevant hepatobiliary surgeons and hospitals across major Indian cities.",
  introduction: [
    "Families usually search liver resection cost after a CT or MRI has already shown a lesion in the liver — a primary tumour, a colorectal metastasis, or another lesion the treating team thinks may be removable. Hepatectomy means taking out part of the liver and leaving enough functioning tissue behind. How much comes out, and by which incision, is not a menu choice. It follows where the lesion sits, how many there are, how close they are to veins and bile ducts, and whether the remaining liver can carry the patient through the first weeks.",
    "A wedge at the edge of a healthy liver is not a right hepatectomy in a patient with cirrhosis. Open, laparoscopic or robotic access, when offered, changes theatre resources — not the oncologic job. Cost in India sits in a GAF planning range — currently [INDIA_COST] for the surgical episode and a stay of [STAY] — because future-liver-remnant planning, possible ICU and bile-leak watch are not priced like a two-night endoscopy. That band is a planning range, not a hospital quotation. Surgery cost is not total liver-cancer treatment cost. Imaging, biopsy, chemotherapy, targeted therapy or ablation, if used, sit on neighbouring estimates. The letter you travel on is written after a surgeon who resects liver has seen the films.",
  ],
  overviewHeading: "What is liver resection (hepatectomy)?",
  whoHeading: "When is liver resection performed?",

  answer: [
    "Liver resection cost in India typically ranges from [INDIA_COST] for the planned hepatectomy, anaesthesia, histopathology and a hospital stay of [STAY]. Typical US self-pay for a comparable surgical episode is [US_COST]. Theatre time is usually about two to six hours depending on whether the sitting is a wedge, a sectionectomy or a major hemihepatectomy, and on vascular or biliary work.",
    "That figure is a planning range, not a hospital quotation. It usually covers the named surgeon, operating room, anaesthesia, the quoted room category and nights, routine inpatient medicines and specimen pathology. ICU nights inside the quoted stay may be inside; extra ICU days, CT or MRI, PET-CT, biopsy, chemotherapy, targeted therapy, ablation, blood products and bile-leak management are frequently not. Laparoscopic or robotic-assisted access, when offered, should be named — there is no separate GAF price sheet for those techniques.",
    "What moves the number most is extent (wedge versus major hepatectomy), tumour number and location, liver function, open versus minimally invasive access, named ICU nights, campus tier and the named consultant. International patients should budget the weeks around the knife — and any oncology that sits in the same visa window — not only the theatre block.",
  ],

  indiaCost: [
    "There is no single hepatectomy price in India. The [INDIA_COST] band is a planning range for a liver resection — theatre, anaesthesia, the named surgeon's fee, the quoted room, routine inpatient drugs, ICU as written into the estimate, and histopathology. The lower end typically reflects a straightforward peripheral wedge or single-segment resection at a mid-tier NABH campus, in a patient with good remnant function, toward the shorter end of [STAY]. The upper end typically reflects a flagship JCI campus, a senior HPB surgeon, a right or extended hepatectomy, laparoscopic or robotic access where used, a private room, named high-dependency nights, and a stay toward 14 nights.",
    "Treat that band as an order of magnitude until a surgeon who actually resects liver has seen triphasic CT or MRI, liver-function tests, and whether chemotherapy has already changed the parenchyma. Same procedure name is not the same surgical plan. Wedge is not right hepatectomy. A healthy remnant is not a cirrhotic remnant. A letter written for one is not a letter written for another.",
    "Surgery cost is not total liver-cancer treatment cost. Staging, systemic therapy, ablation and later surveillance sit on neighbouring estimates. City is a weaker driver than families expect. Campus tier, remnant volume planning, named ICU nights and whether a bile leak extends stay move the bill more than the metro name. GAF Healthcare matches centres that already run HPB lists — that is a matching rule, not a ranking of hospitals.",
  ],

  costComponents: [
    {
      label: "Surgeon fee and surgical team",
      detail:
        "Usually bundled for the named HPB, GI or surgical-oncology consultant. Confirm who is in theatre. An HPB listing is not automatically a robotic major hepatectomy.",
    },
    {
      label: "Hospital and operating-room charges",
      detail:
        "Theatre time, energy devices, staplers where used, and recovery. Laparoscopic or robotic access, when used, lengthens or reprices this block. Campus tier moves this line more than the city name.",
    },
    {
      label: "Anaesthesia",
      detail:
        "Anaesthetist fee and drugs for a case lasting typically two to six hours. Cardiopulmonary comorbidity and major blood-loss planning may add a pre-operative clearance billed outside.",
    },
    {
      label: "ICU and critical-care monitoring",
      detail:
        "Early high-dependency or ICU care is common after major hepatectomy or comorbidity. Nights inside the quoted stay may be bundled; extra days after bleeding, bile leak or liver dysfunction are typically extra.",
    },
    {
      label: "Diagnostic investigations",
      detail:
        "Standard bloods, coagulation and ECG are often inside the admission. CT, MRI, PET-CT, tumour markers and biopsy are frequently extra if not already done at home.",
    },
    {
      label: "Pathology",
      detail:
        "Processing of the specimen and margins. Molecular assays, when ordered, are often billed later.",
    },
    {
      label: "Medicines and nutrition",
      detail:
        "Inpatient analgesia, antibiotics, DVT prophylaxis and routine drugs during the quoted stay. Dietitian follow-up after discharge is frequently extra. This page does not set a diet.",
    },
    {
      label: "Room charges and nursing",
      detail: "Written against a room category and a stated number of nights — typically [STAY]. Companion beds change the nightly rate.",
    },
    {
      label: "Postoperative care and follow-up",
      detail:
        "Liver-function monitoring, wound care and the first clinic review before you fly are commonly included. Later oncology visits and imaging are typically separate.",
    },
  ],

  whyQuotesDiffer:
    "Two honest estimates can differ because the operations are not the same. A wedge is not a right hepatectomy. One metastasis at the edge is not four lesions near the hepatic veins. A healthy remnant is not a chemotherapy-affected or cirrhotic remnant. Open is not laparoscopic. Named ICU nights are not extra leak days. Campus tier and the named surgeon move the bill more than the city on the boarding pass. Higher cost is not a measure of better care.",

  costDrivers: [
    {
      label: "Extent of resection",
      detail: "Wedge, segmentectomy, hemihepatectomy and extended resection are different sittings. Extent follows anatomy and remnant volume, not a brochure upgrade.",
    },
    {
      label: "Tumour location and number of lesions",
      detail: "A peripheral lesion and a lesion sitting on the vena cava are not the same theatre. Multiple sites can mean a longer sitting or a two-stage plan.",
    },
    {
      label: "Cancer type and disease stage",
      detail:
        "HCC, intrahepatic cholangiocarcinoma and colorectal metastases are planned differently. Extrahepatic disease can take resection off the table.",
    },
    {
      label: "Liver function and underlying liver disease",
      detail:
        "Cirrhosis, steatosis and chemotherapy-associated liver injury change how much remnant is safe. That assessment is why two patients with the same diagnosis receive different letters.",
    },
    {
      label: "Surgical complexity",
      detail: "Vascular or biliary reconstruction, repeat hepatectomy and emergency bleeding lengthen theatre and ICU. Ask what the letter assumes.",
    },
    {
      label: "Surgeon and multidisciplinary team",
      detail:
        "The estimate should name the consultant. HPB surgery, medical oncology and interventional radiology are billed differently. That is not a ranking.",
    },
    {
      label: "Hospital category and campus tier",
      detail: "Flagship versus satellite units sit at different price levels. Ask which address and which ICU the letter is written against.",
    },
    {
      label: "City and companion logistics",
      detail:
        "Surgical fees cluster more tightly across the five metros than hotel bills for two to four weeks. City choice matters most after discharge.",
    },
    {
      label: "Open versus laparoscopic surgery",
      detail:
        "Laparoscopic access, when offered, changes theatre time and consumables. No separate GAF sheet — ask whether it is actually available that week.",
    },
    {
      label: "Robotic assistance",
      detail:
        "Robotic-assisted hepatectomy, where clinically offered, is a different resource envelope. There is no separate GAF robotic-hepatectomy tariff.",
    },
    {
      label: "ICU requirement and length of stay",
      detail:
        "Packages are written for [STAY], including some high-dependency care if named. Extra nights after bile leak, bleeding or liver dysfunction are usually billed fresh.",
    },
    {
      label: "Pathology and complications",
      detail: "Specimen processing may be bundled. Molecular tests, bile-leak drains, transfusion and re-operation are new events unless the contract says otherwise.",
    },
    {
      label: "Additional cancer treatment",
      detail:
        "Chemotherapy, targeted therapy, immunotherapy, radiation or ablation, when used, are neighbouring quotes. Surgery cost is not total treatment cost.",
    },
  ],

  inclusions: [
    {
      label: "Consultation that leads into the admission",
      detail: "The in-person pre-operative review with the named surgeon, where bundled. Remote review before travel is arranged separately.",
    },
    {
      label: "Surgery by the named consultant",
      detail: "The resection as written on the estimate — not an unnamed robotic extended hepatectomy unless the letter says so.",
    },
    {
      label: "Anaesthesia and operating room",
      detail: "The anaesthesia team, theatre time, standard consumables and recovery for the scheduled case.",
    },
    {
      label: "Hospital stay as quoted",
      detail:
        "Bed charges, nursing and routine ward care for the room category and nights written into the estimate — typically [STAY], including ICU nights if the letter names them.",
    },
    {
      label: "Routine tests",
      detail: "Standard bloods, coagulation, ECG and anaesthetic fitness assessment, where bundled.",
    },
    {
      label: "Pathology of the specimen",
      detail: "Processing of the resected liver and margins, where histopathology is bundled.",
    },
    {
      label: "Medicines during admission",
      detail: "Analgesia, antibiotics and routine drugs administered during the quoted stay.",
    },
  ],

  exclusions: [
    {
      label: "Staging imaging and biopsy",
      detail: "CT, MRI, PET-CT, ultrasound-guided biopsy and tumour-marker panels are frequently extra when ordered in India.",
    },
    {
      label: "Systemic therapy, radiation and ablation",
      detail: "Chemotherapy, targeted therapy, immunotherapy, radiotherapy and ablation are neighbouring quotes.",
    },
    {
      label: "Extra ICU, bile-leak care and re-operation",
      detail: "Nights and theatre beyond the quoted stay, including treatment of bleeding or bile leak, are typically a new event.",
    },
    {
      label: "Blood products",
      detail: "Transfusion, when required, is commonly billed per unit.",
    },
    {
      label: "Molecular pathology",
      detail: "NGS, mismatch-repair and other assays, when ordered, are frequently extra.",
    },
    {
      label: "Rehabilitation and later imaging",
      detail: "Physiotherapy after discharge and surveillance CT or MRI are typically separate visits.",
    },
    {
      label: "Travel, accommodation and visa-related expenses",
      detail: "Flights, medical visa fees, hotel after discharge, local transport and companion living costs sit outside every hospital estimate.",
    },
  ],

  approachComparison: {
    heading: "Types of liver resection",
    intro: [
      "Extent is chosen to clear the lesion with a margin and leave a safe remnant — not to sell a named operation. GAF Healthcare publishes a planning range only for liver resection as one cost sheet. The rows below describe relative complexity. They are not a menu of add-on prices, and none is universally better.",
      "Selection depends on tumour location, size, number, liver function, vascular and biliary anatomy and the operating team's assessment. This page does not recommend wedge, major or minimally invasive hepatectomy for an individual patient.",
    ],
    rows: [
      {
        name: "Wedge resection",
        relative: "Peripheral lesion; smallest typical sitting",
        detail: "A non-anatomic sliver of liver around a surface lesion. Not a substitute for a formal section when deeper vessels are involved. No separate GAF sheet.",
      },
      {
        name: "Segmentectomy / sectionectomy",
        relative: "One or more Couinaud segments",
        detail: "Anatomic removal of a segment or section. Remnant volume still has to be enough. No separate GAF price.",
      },
      {
        name: "Left hepatectomy",
        relative: "Left hemiliver removed when indicated",
        detail: "Typically segments 2–4. Different remnant from a right-sided sitting. Same national planning band unless the letter names extras.",
      },
      {
        name: "Right hepatectomy",
        relative: "Right hemiliver; larger parenchymal cut",
        detail: "Typically segments 5–8. Often a longer sitting and a closer remnant conversation. Not automatically 'better'.",
      },
      {
        name: "Extended / central hepatectomy",
        relative: "More liver, or a central corridor, when anatomy requires it",
        detail: "Extended right or left, or selected central resections. Higher resource use. No separate GAF extended-hepatectomy tariff.",
      },
      {
        name: "Multiple or two-stage resection",
        relative: "Selected multi-site disease",
        detail: "More than one cut, or a staged plan, when the team judges remnant and disease allow it. Ask whether both stages are on one letter.",
      },
      {
        name: "Laparoscopic liver resection",
        relative: "Same oncological jobs through ports when offered",
        detail: "Theatre and device costs can sit toward the upper part of the band. Not automatically better, and not priced as a separate GAF sheet.",
      },
      {
        name: "Robotic-assisted liver resection",
        relative: "Where offered — different resource envelope",
        detail: "Not universally available and not priced as a separate GAF hepatectomy sheet. Ask whether it is actually offered for your lesion that week.",
      },
    ],
  },

  accessComparison: {
    heading: "Open vs laparoscopic vs robotic liver resection",
    intro: [
      "Surgical access is how the team reaches the liver. It is not a separate cancer operation. Open, laparoscopic and robotic-assisted sittings can all be used to perform a wedge, a sectionectomy or a hemihepatectomy when the treating team judges them suitable. None is universally better, and minimally invasive access is not suitable for every patient.",
      "Suitability depends on the tumour, anatomy, complexity, surgeon expertise, hospital resources and patient factors — including prior surgery, a very posterior lesion or emergency bleeding. There is no separate GAF price sheet for laparoscopic or robotic hepatectomy.",
    ],
    rows: [
      {
        name: "Open",
        access: "One abdominal incision, often a rooftop or midline cut",
        method: "Direct handling of the liver. Still used when ports are not honest or not available.",
        resources: "Standard theatre; no robotic console. ICU follows the sitting, not the incision length.",
        recovery: "Wound recovery can be slower. Liver-function watch, bile-leak watch and fatigue still dominate the stay.",
        cost: "Often the lower theatre-consumable line. Not automatically the cheaper total bill if the sitting is a major hepatectomy.",
      },
      {
        name: "Laparoscopic",
        access: "Several small ports, sometimes with a small extraction incision",
        method: "Same oncological jobs — identification, vascular control, parenchymal transection — through ports when offered.",
        resources: "Laparoscopic stack, energy devices and a trained team. Conversion to open remains possible.",
        recovery: "Some patients mobilise sooner. Bile leak, bleeding and remnant function are not removed by ports.",
        cost: "Theatre time and devices can sit toward the upper part of the band. No separate GAF laparoscopic-hepatectomy tariff.",
      },
      {
        name: "Robotic-assisted",
        access: "Ports plus a robotic console where the hospital actually offers it that week",
        method: "Wristed instruments for selected lesions. Still a hepatectomy — not a different cancer.",
        resources: "Console time, trained team and often a higher consumable envelope. Not universally available.",
        recovery: "Recovery still follows remnant volume, bile leak and prior chemotherapy — not the brand of robot.",
        cost: "A different resource envelope. There is no separate GAF robotic-hepatectomy tariff. Paying more does not by itself make a remnant safer.",
      },
    ],
  },

  topicSections: [
    {
      id: "liver-anatomy",
      heading: "How does liver anatomy affect the surgery?",
      paragraphs: [
        "Surgeons describe the liver in segments — usually eight Couinaud segments — grouped into a right and a left hemiliver, with a central corridor around the middle hepatic vein. A tumour in a peripheral left-lobe segment is a different conversation from one sitting between the hepatic veins or against the bile-duct confluence.",
        "Proximity to the portal vein, hepatic artery, hepatic veins and bile ducts decides whether a wedge is honest or whether a formal sectionectomy or hemihepatectomy is required. Imaging maps that relationship before a date is offered. This page is not an anatomy textbook and does not assign a segment to a named patient.",
      ],
    },
    {
      id: "liver-resection-for-cancer",
      heading: "Liver resection for cancer",
      paragraphs: [
        "Surgery may be discussed for selected hepatocellular carcinoma, selected intrahepatic cholangiocarcinoma, selected colorectal liver metastases, and occasionally other metastatic or neuroendocrine lesions. The same word — hepatectomy — covers those settings. The staging conversation does not.",
        "Decisions depend on cancer type, stage, number and location of lesions, liver function, whether disease sits outside the liver, and a multidisciplinary review that typically includes an HPB or GI surgical oncologist, medical oncologist, radiologist and pathologist. This page does not provide an individualized treatment plan.",
      ],
    },
    {
      id: "crlm",
      heading: "Liver resection for colorectal cancer metastases",
      paragraphs: [
        "Colorectal cancer can spread to the liver through the portal circulation. Some patients with a limited number of liver metastases, adequate remnant and no unresectable extrahepatic disease may be considered for liver-directed surgery — sometimes after chemotherapy, sometimes before, sometimes with the bowel primary in a sequenced plan.",
        "Not every patient with liver metastases is eligible for resection. Imaging and staging have to show that a complete, safe clearance is plausible. Neighbouring GAF sheets exist for colectomy and rectal cancer surgery when the primary is still part of the pathway. Chemotherapy, when used, is a neighbouring quote. This page does not decide eligibility.",
      ],
    },
    {
      id: "hcc",
      heading: "Liver resection for hepatocellular carcinoma",
      paragraphs: [
        "For selected HCC, resection is one local option among others that teams may discuss — including ablation or transplant in different clinical settings. Liver function, tumour size and number, location, and underlying chronic liver disease all feed the conversation. A tumour that looks resectable on a scan may not be resectable in a decompensated cirrhotic remnant.",
        "Multidisciplinary evaluation is the honest next step, not a brochure comparison of techniques. This page does not publish eligibility scores or recommend resection, ablation or transplant for a named patient.",
      ],
    },
    {
      id: "liver-function",
      heading: "Why does liver function matter before hepatectomy?",
      paragraphs: [
        "The team plans to leave enough functioning liver — the future liver remnant — to avoid postoperative liver failure. Underlying cirrhosis, fatty liver, and chemotherapy-related liver injury all shrink how much can safely come out. Blood tests, imaging volumetry and, in selected patients, additional remnant-function tests inform that plan.",
        "Surgeons plan the cut to preserve remnant when possible. A larger operation is not automatically better. This page does not calculate remnant volume for an individual.",
      ],
    },
    {
      id: "liver-regeneration",
      heading: "Does the liver grow back after resection?",
      paragraphs: [
        "The liver has significant regenerative capacity. Remaining tissue can increase in volume and function over weeks to months. That is not the same as the removed piece physically growing back as it was. Underlying liver health influences how well the remnant recovers.",
        "Regeneration does not cancel bile-leak risk, fatigue or the need for pathology-led oncology. It is a reason remnant volume is planned carefully — not a promise of a normal liver by a calendar date.",
      ],
    },
  ],

  overview: {
    what: [
      "Liver resection, or hepatectomy, removes a diseased portion of the liver — tumour or selected benign disease — with a margin, while preserving enough functioning remnant to support recovery. The liver can later increase in volume; that regeneration is not a copy of the piece that was taken out.",
      "The exact operation depends on tumour location, size, number of lesions, liver function, underlying liver disease, relationship to blood vessels and bile ducts, cancer type, previous treatment, overall health and the surgeon's assessment. GAF Healthcare does not decide on this page whether resection is appropriate. Treatment plans are determined by qualified doctors after evaluation.",
    ],
    who: [
      "Resection may be considered for selected primary liver cancers (including HCC and some intrahepatic cholangiocarcinomas), selected benign tumours, colorectal metastases, and other carefully selected metastatic lesions. It is not the first or only treatment for every liver tumour. Extrahepatic disease, inadequate remnant or poor liver function often mean a different conversation — systemic therapy, ablation, transplant assessment or non-operative care.",
      "This page does not diagnose and does not recommend hepatectomy, ablation or non-operative care for an individual patient. Eligibility depends on imaging, liver function and clinical assessment.",
    ],
    how: [
      "Pre-operative assessment confirms imaging, liver function, remnant volume, cardiopulmonary fitness and the planned extent. Anaesthesia is general.",
      "Surgical access may be an open incision or laparoscopic or robotic ports when the team offers them. The lesion is identified, often with intraoperative ultrasound. Relevant vessels and bile ducts are controlled. The planned segment or section is removed. Bleeding is controlled and a bile-leak check is made where appropriate. You wake on a ward or in high-dependency care. Pathology arrives days later and feeds the next oncology conversation. This page does not describe graphic operative detail.",
    ],
    variations: [
      {
        label: "Wedge and segmental resections",
        detail: "Smaller anatomic or non-anatomic removals when a peripheral lesion and remnant allow it.",
      },
      {
        label: "Left or right hepatectomy",
        detail: "Removal of one hemiliver when tumour location requires it. Different remnant, different resource use.",
      },
      {
        label: "Extended or central resection",
        detail: "Used in selected anatomy. Not a default upgrade. Suitability is a surgical decision after volumetry.",
      },
      {
        label: "Open versus laparoscopic versus robotic access",
        detail:
          "Ports instead of, or in addition to, an open incision when the team offers it. Oncological goals remain clearance and a safe remnant. None is universally better.",
      },
    ],
    preparation: [
      "Expect liver-function tests, blood count, coagulation, CT and/or MRI, and cardiopulmonary review. Ultrasound, tumour markers and PET-CT are used where clinically relevant. Home investigations can often be reviewed rather than repeated if discs open.",
      "Bring prior chemotherapy dates, a note on alcohol and viral hepatitis history, and any prior liver surgery or ablation notes. Arrive with enough days before theatre for anaesthetic review. Do not book a same-week international flight after a long-haul landing into a major hepatectomy.",
    ],
    recovery: [
      "Hospital stay is typically [STAY]. Early days watch liver tests, drains, pain, nutrition and mobility. Complex sittings may start in ICU. This page does not set a diet or a discharge date.",
      "Bleeding, infection, bile leak, fluid collections, liver dysfunction, clots, respiratory problems and wound issues can extend stay. Risk varies with remnant, liver disease, extent and fitness. Individual percentages are not published here.",
      "Pathology review decides further oncology. International patients often need further hotel days after discharge before a long-haul flight. Ranges on this page are not promises of recovery time.",
    ],
  },

  fullPathway: {
    intro: [
      "The surgical estimate is only one line in a medical-travel budget. Surgery cost is not total liver-cancer treatment cost and is not total medical-tourism cost. Staging scans, systemic therapy, extra ICU, hotel after discharge, flights and a companion who can stay are the rest of the trip.",
      "Ask the coordinator to quote each stage separately. Do not invent flight or hotel prices from this page. Add your own numbers: surgery + quoted stay including named ICU nights + staging tests + oncology if in India + flights + visa + hotel nights × rate + local transport + attendant costs + a contingency for extra nights or bile-leak days.",
    ],
    stages: [
      {
        label: "Staging and liver-function work-up",
        detail: "CT, MRI, PET-CT where indicated, bloods, coagulation, remnant assessment. Often extra if done in India.",
      },
      {
        label: "Systemic therapy or ablation, if used",
        detail: "Neighbouring cost sheets. Can add weeks in the city.",
      },
      {
        label: "The operation",
        detail:
          "Resection, anaesthesia, ICU as quoted, [STAY] and pathology. This is the [INDIA_COST] line when the letter matches that scope.",
      },
      {
        label: "Extra ICU, bile-leak care, transfusion",
        detail: "Beyond the quoted nights. Ask what happens if hospitalization is extended.",
      },
      {
        label: "Adjuvant oncology",
        detail: "Further drugs, targeted therapy or radiation if pathology and the MDT advise it.",
      },
      {
        label: "Flights and visa",
        detail: "Patient and attendant. Medical visa duration should cover extra nights if remnant recovery is slow. Issuance is not guaranteed.",
      },
      {
        label: "Accommodation after discharge",
        detail: "Hotel or apartment near the campus until the surgeon is content you can fly.",
      },
    ],
  },

  journey: [
    { label: "Submit medical records", detail: "CT or MRI, liver-function tests, biopsy if done, a medicine list and a note on prior chemotherapy." },
    { label: "Imaging and pathology review", detail: "A surgeon who resects liver reads the actual films and histology, not a coordinator's paraphrase." },
    { label: "Specialist assessment", detail: "On camera: whether resection now, systemic therapy first, ablation, transplant assessment, or a non-operative path is the honest next step." },
    { label: "Liver-function and staging review", detail: "Remnant volume and extrahepatic disease are checked before a date is offered." },
    { label: "Multidisciplinary treatment planning", detail: "Surgical, medical and, where relevant, interventional radiology agree sequence." },
    { label: "Preliminary treatment plan and cost estimate", detail: "An itemised surgical letter. Extent, approach, ICU nights and oncology quoted separately if in view." },
    { label: "Hospital selection", detail: "Compare the surgeon you met, whether the campus runs HPB lists and ICU that has managed bile leaks, and how long a companion can stay." },
    { label: "Travel planning", detail: "A hospital invitation typically supports a medical visa. Write duration for [STAY] plus hotel recovery. Visa issuance is not guaranteed." },
    { label: "Hospital admission", detail: "Usually a day or two before theatre after in-person examination and any missing tests." },
    { label: "Surgery", detail: "Two to six hours depending on extent. Combined vascular or biliary work lengthens the sitting." },
    { label: "Postoperative recovery", detail: "Ward or high-dependency across [STAY]. Extra nights are a clinical decision, not a package failure." },
    { label: "Pathology and further treatment", detail: "Specimen results feed adjuvant planning. Do not fly before that conversation if further treatment in India is likely." },
    { label: "Follow-up and return-home planning", detail: "Operative note, pathology and a written handover. Fly when the named surgeon is content." },
  ],

  documents: [
    "Triphasic CT or MRI of the liver, plus PET-CT if already done",
    "Liver-function tests, blood count and coagulation",
    "Biopsy histopathology if a sample has already been taken",
    "Colonoscopy report if colorectal metastases are in view",
    "Chemotherapy or targeted-therapy summary if treatment has started",
    "Prior liver surgery or ablation notes",
    "Cardiac and pulmonary test results, if available",
    "Current medication list, allergies, and alcohol / viral-hepatitis history",
    "Passport, and a hospital invitation letter for the medical visa application",
  ],

  cities: liverResectionCities,

  destinations: [
    {
      country: "India",
      stay: "[STAY]",
      positioning: "Catalog planning range",
      context:
        "Named HPB and liver-resection listings can be met on camera before travel. Listed consultants currently sit in Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad.",
    },
    {
      country: "Turkey",
      costLevel: [1, 1.8],
      stay: "7–14 nights",
      positioning: "Packaged medical-travel market",
      context: "Verify whether ICU nights, bile-leak management, remnant imaging and systemic therapy are inside the bundle.",
    },
    {
      country: "Thailand",
      costLevel: [1.2, 2.2],
      stay: "7–14 nights",
      positioning: "Private-hospital tourism",
      context: "Established international desks; ICU extras and major hepatectomy can sit well above India.",
    },
    {
      country: "United Arab Emirates",
      costLevel: [2, 3.4],
      stay: "7–14 nights",
      positioning: "Regional premium private care",
      context: "Short flights from much of Africa and West Asia; private HPB pricing is closer to Western self-pay.",
    },
    {
      country: "Singapore",
      costLevel: [2.6, 4.4],
      stay: "7–14 nights",
      positioning: "High-cost private hub",
      context: "Mature multidisciplinary process at premium private tariffs. Local subsidised and international private bills differ.",
    },
    {
      country: "Germany",
      costLevel: [2.2, 4.2],
      stay: "8–16 nights",
      positioning: "Certified European HPB units",
      context: "Structured MDT process and longer inpatient norms; self-pay deposits are typical for visitors.",
    },
    {
      country: "United Kingdom",
      costLevel: [1.8, 3.4],
      stay: "7–14 nights",
      positioning: "Private self-pay (NHS generally not for visitors)",
      context: "NHS care is not available to most overseas visitors. Private self-pay applies; oncology is quoted separately.",
    },
    {
      country: "United States",
      stay: "5–12 nights",
      positioning: "Highest self-pay outlier",
      context: "Facility, surgeon, ICU, pathology and later oncology bills often arrive separately. Compare against actual insurance liability.",
    },
  ],

  destinationIntro: [
    "The table below is a planning comparison for liver resection as a surgical episode, not a claim that every country uses the same extent or bundles ICU the same way. India and United States figures come from the GAF Healthcare catalog. Other markets are modelled from the India midpoint using relative private-care cost levels, and are labelled as indicative planning estimates — not hospital quotations.",
    "India is often less expensive for a self-funding patient. That is not the same as 'always cheapest' or 'best'. Insurance coverage at home can reverse the arithmetic overnight. Hospital, surgeon, extent, surgical approach, liver function, ICU, length of stay, oncology treatment and what the package includes still decide the real bill in every country.",
  ],

  destinationNote:
    "International treatment costs vary by hospital, surgeon, extent of hepatectomy, surgical approach, liver function, disease complexity, length of stay, ICU requirements, oncology treatment and what is included in the package. These figures are intended for preliminary comparison only and are not final quotations. Figures other than India and the United States are modelled planning estimates. They are not GAF quotations and not competitor quotes reproduced as ours.",

  cityIntro: [
    "City names below are working filter URLs — the same destination, city, specialty and procedure keys the rest of the site already uses. Open Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad for the city overlay and the filtered doctor and hospital cards.",
    "We do not invent a different surgical tariff for each metro. The approximate cost column uses the India planning band of [INDIA_COST] unless a researched city figure exists. What does change is the named consultant list, whether HPB ICU sits on the same plot, airport access and how expensive a multi-week companion stay actually feels.",
  ],

  whyIndia: [
    "International patients consider India for liver resection when they are self-funding a hepatectomy, when they want a named HPB surgeon before they fly, and when they need remnant-volume planning, ICU that has managed bile leaks, and the next oncology conversation in the same city.",
    "Cost is the most visible reason. The catalog range [INDIA_COST] sits well below typical US cash-pay of [US_COST], because theatre, ward and consultant time are priced on a different cost base — not because the operation is a lesser product by definition. Several listed metros can hold an MDT conversation in one week. English is the working language of most international desks. Laparoscopic and robotic access are offered in some listed houses; availability is a diary question.",
    "None of that means India is the right country for every patient, and none of it is a claim of 'best liver surgeons in the world', guaranteed remnant recovery or 'cheapest in the world'. Someone whose insurance covers the pathway at home, who cannot stay for a slow remnant recovery, or whose staging shows resection is not honest, may be better treated locally.",
  ],

  whyCostDiffers: [
    "The figure on this page is a planning range. The figure on a hospital letter is an estimate written against a named extent, a named surgeon, a stated number of nights, and a remnant plan. Those two documents are not supposed to match to the dollar.",
    "The term liver resection can describe operations of very different complexity. Cost may change because of wedge versus major hepatectomy, tumour location and number, cancer type, liver function, open versus minimally invasive or robotic access, vascular or biliary work, ICU, pathology, extra nights and complications.",
    "If two hospitals quote different numbers, read the line items before you assume one is overcharging. One letter may include named high-dependency nights and intraoperative ultrasound; the other may bill them later. Higher cost is not a measure of better treatment.",
  ],

  planningClose: [
    "Liver resection in India is typically planned in the [INDIA_COST] band for the hepatectomy as quoted and the inpatient stay, against [US_COST] self-pay in the United States. The variables that actually move that band are extent, remnant function, approach, campus tier, the named surgeon and whether chemotherapy or other oncology is completed in the same trip.",
    "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad each have listed campuses for this surgical-oncology pathway. Named catalog consultants for liver resection currently sit in all five cities. Doctor and hospital cards on this page link only to profiles that already exist in the catalog.",
    "A personalized quotation, written after records review, is the document you should travel on. Cost ranges on this page are intended for preliminary planning and comparison only. Final treatment costs vary according to the patient's clinical condition, treatment plan, hospital, surgeon, surgical approach, length of stay and other factors. A personalized quotation should be obtained before making treatment or travel decisions.",
  ],

  questionsToAsk: [
    "Is the surgeon's fee included, and is the person on this call the person in theatre?",
    "Is this a wedge, segmentectomy, left or right hepatectomy, or an extended sitting — and is that named on the letter?",
    "What future-liver-remnant volume is the letter written against?",
    "Is the approach open, laparoscopic or robotic-assisted, and is that named?",
    "How many ICU or high-dependency nights are included, and what happens if I need more?",
    "Are operating-room energy devices and consumables included?",
    "Is anaesthesia included for a two-to-six-hour case?",
    "Are CT, MRI, PET-CT, biopsy and cardiopulmonary tests included?",
    "Is pathology of the specimen included? Molecular tests?",
    "Is chemotherapy, targeted therapy, immunotherapy, radiation or ablation included?",
    "How many hospital nights and which room category?",
    "What happens if a bile leak, bleeding or extra hospitalization occurs?",
    "Is follow-up before I fly included?",
  ],

  faqs: [
    {
      q: "What is the cost of liver resection in India?",
      a: "Plan against [INDIA_COST] for the planned hepatectomy, anaesthesia, stay of [STAY] and specimen pathology. Typical US self-pay is [US_COST]. The final figure is an itemised hospital estimate after a surgeon reviews imaging and liver function. Systemic therapy and extra bile-leak days are usually separate.",
    },
    {
      q: "What is the cost of hepatectomy in India?",
      a: "Hepatectomy is the same family of operations as liver resection on this sheet. Use the GAF planning range of [INDIA_COST]. Extent — wedge versus major — still has to be named on the letter.",
    },
    {
      q: "What is the cost of liver resection in Delhi NCR?",
      a: "Delhi NCR inherits the India planning range of [INDIA_COST]. There is no separate verified NCR tariff on this site. Campus tier, extent and ICU course move the letter more than the city name.",
    },
    {
      q: "How much does liver cancer surgery cost in India?",
      a: "When the billed episode is a resection, plan against [INDIA_COST]. Complete liver-cancer treatment can also include imaging, systemic therapy, ablation and surveillance — neighbouring quotes unless a letter combines them.",
    },
    {
      q: "What is included in liver resection cost?",
      a: "A typical surgical estimate covers the named surgeon, anaesthesia, theatre, quoted ward or ICU nights, routine inpatient medicines and specimen pathology. Confirm devices, extra ICU, imaging and drugs.",
    },
    {
      q: "What is the difference between partial and major hepatectomy?",
      a: "Partial usually means a smaller anatomic or wedge removal. Major usually means a hemihepatectomy or more. The cut follows remnant volume and tumour location. Neither is universally better.",
    },
    {
      q: "What is a wedge resection?",
      a: "A non-anatomic sliver of liver around a peripheral lesion. It is still a hepatectomy. It is not a substitute for a formal section when deeper vessels are involved.",
    },
    {
      q: "What is a right hepatectomy?",
      a: "Removal of the right hemiliver — typically segments 5 to 8 — when tumour location requires it. Remnant planning is a larger part of the conversation than after a small wedge.",
    },
    {
      q: "What is a left hepatectomy?",
      a: "Removal of the left hemiliver — typically segments 2 to 4 — when that is the honest anatomic sitting. It is a different remnant from a right-sided resection, not a cheaper product by definition.",
    },
    {
      q: "Does laparoscopic liver resection cost more?",
      a: "It can, because of theatre time and devices, but GAF Healthcare does not publish a separate laparoscopic-hepatectomy tariff. Ask whether laparoscopic access is actually offered for your lesion.",
    },
    {
      q: "Does robotic liver surgery cost more?",
      a: "Robotic assistance, where offered, is a different resource envelope. There is no separate GAF robotic-hepatectomy price. Do not treat a neighbouring robotics sheet as this operation's quote.",
    },
    {
      q: "Can liver resection be performed for colorectal cancer metastases?",
      a: "In selected patients, yes — after staging shows limited, resectable liver disease and an adequate remnant. Not every patient with metastases is eligible. Chemotherapy, when used, is a separate estimate.",
    },
    {
      q: "How long is hospital stay after liver resection?",
      a: "Typically [STAY] on this sheet. Bile leak, bleeding or remnant dysfunction extend that. This page does not promise a discharge date.",
    },
    {
      q: "How long does recovery take after hepatectomy?",
      a: "Fatigue and activity limits often last weeks after discharge. Regeneration of remnant volume continues over months. Individual recovery varies. This page does not set a return-to-work date.",
    },
    {
      q: "How long should international patients stay in India?",
      a: "Plan the inpatient [STAY] plus further hotel days until the named surgeon is content you can fly. Slow remnant recovery or extra oncology lengthens that.",
    },
    {
      q: "What tests are needed before liver resection?",
      a: "Typically liver-function tests, blood count, coagulation, CT and/or MRI, and anaesthetic assessment. PET-CT, tumour markers and biopsy are used where clinically relevant. The exact work-up varies.",
    },
    {
      q: "What costs may be excluded from a liver surgery package?",
      a: "Often: CT, MRI, PET-CT, biopsy, systemic therapy, extra ICU, bile-leak management, transfusion, molecular tests, hotel, flights and visa-related expenses. Read the exclusions as carefully as the inclusions.",
    },
    {
      q: "How do I choose a liver surgeon?",
      a: "Use listed consultants whose catalog procedures include liver resection, hepatectomy or liver cancer surgery, compare training and campus on the profile, and insist on speaking to the person who would operate. Placement is not a league table.",
    },
    {
      q: "How do I choose a hospital for liver surgery?",
      a: "Start with the surgeon you can meet on camera, then the campus where that surgeon actually operates, whether ICU has managed bile leaks, and whether remnant imaging can stay on the plot. There is no ranking here.",
    },
    {
      q: "How should I compare liver resection quotations?",
      a: "Line by line: surgeon, extent, remnant plan, approach, ICU nights, devices, pathology, extra-night and bile-leak policy, imaging and oncology. Same procedure name is not the same surgical plan.",
    },
  ],

  doctorHeading: "Doctors to consider for liver resection in India",
  cityDoctorHeading: "Liver Resection Surgeons in [CITY]",
  doctorIntro:
    "These are consultants listed on GAF Healthcare whose catalog procedures include liver resection, hepatectomy or liver cancer surgery. Profiles show training, campus and procedures as held in the catalog. There are no rankings here, and no fee is paid for placement. Named listings currently sit in Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad.",
  hospitalHeading: "Hospitals to consider for liver resection in India",
  cityHospitalHeading: "Liver Resection Hospitals in [CITY]",
  hospitalIntro:
    "Campuses on GAF Healthcare where this surgical-oncology pathway is listed, with accreditation as published by the hospital. Listing with the procedure family is not a claim of hepatectomy volume or a ranking. Choose on the surgeon you met on camera, whether the house runs HPB lists and remnant-aware ICU, and whether staging can stay in the same city — not on a brand slogan.",

  relatedProcedures: [
    "Colectomy",
    "Rectal Cancer Surgery",
    "Gastrectomy",
    "Esophagectomy",
    "Liver Transplantation",
    "Whipple Procedure",
    "Chemotherapy",
    "Targeted Therapy",
    "Immunotherapy",
    "Intensity-Modulated Radiotherapy (IMRT)",
  ],

  relatedBlogs: [
    { href: "/costs?specialty=Surgical+Oncology", label: "surgical oncology costs in India" },
    { href: "/costs?specialty=Surgical+Gastroenterology", label: "surgical gastroenterology costs in India" },
    { href: "/costs?specialty=Medical+Oncology", label: "medical oncology costs in India" },
    { href: "/costs/colectomy", label: "colectomy cost in India" },
    { href: "/costs/rectal-cancer-surgery", label: "rectal cancer surgery cost in India" },
    { href: "/costs/gastrectomy", label: "gastrectomy cost in India" },
    { href: "/costs/esophagectomy", label: "esophagectomy cost in India" },
    { href: "/doctors?destination=India&procedure=Liver+Resection+(Hepatectomy)", label: "liver resection surgeons in India" },
    { href: "/hospitals?destination=India&procedure=Liver+Resection+(Hepatectomy)", label: "liver resection hospitals in India" },
  ],

  figures: [
    {
      after: "overview",
      src: "/costs/liver-resection-hepatectomy-overview.webp",
      alt: "Medical illustration showing how liver resection removes a diseased portion of the liver while preserving the remaining liver tissue",
      caption:
        "Extent follows the surgical plan. The remnant has to be enough. None of these steps is a priced upgrade on this sheet.",
      fit: "contain",
    },
    {
      after: "how",
      src: "/costs/types-of-liver-resection.webp",
      alt: "Illustration comparing common types of liver resection including wedge resection, segmentectomy, left hepatectomy and right hepatectomy",
      caption:
        "Wedge, segmentectomy, left and right hepatectomy and extended resection are clinical choices. None is universally better.",
      fit: "contain",
    },
    {
      after: "journey",
      src: "/costs/liver-resection-treatment-journey-india.webp",
      alt: "Illustration showing the liver resection treatment journey for international patients travelling to India",
      caption:
        "Records, remnant assessment and a written estimate come before a ticket. Oncology, ICU extras and travel sit outside the surgical range unless named.",
      fit: "contain",
    },
  ],
};
