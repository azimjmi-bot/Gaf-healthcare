import type { CostArticle } from "./types";
import { whippleProcedureCities } from "./whipple-procedure-cities";

export const whippleProcedure: CostArticle = {
  procedure: "Whipple Procedure",
  shortName: "Whipple procedure",
  briefName: "Whipple Procedure",
  duration: "approximately 5–8 hours",
  recoveryGlance: "Inpatient [STAY], then hotel step-down. Varies by patient.",
  slug: "whipple-procedure",
  lastUpdated: "2026-09-10",
  seoTitle: "Whipple Procedure Cost in India: Prices, Cities & Hospitals",
  seoDescription:
    "Whipple Procedure (pancreaticoduodenectomy) cost in India is typically [INDIA_COST] for the operation and a stay of [STAY], against [US_COST] self-pay in the US. Compare cities, listed pancreatic surgeons and hospitals, and how to request a personalized estimate.",
  heading: "Whipple Procedure Cost in India",
  heroSubtitle:
    "Compare Whipple Procedure planning ranges in India, see what can change a hospital quotation, and explore listed pancreatic and HPB surgeons across major Indian cities.",
  introduction: [
    "Families usually search Whipple Procedure cost after a scan has already shown a mass in the pancreatic head, ampulla, distal bile duct or duodenum — and after someone has used the word resectable. Pancreaticoduodenectomy is a long abdominal operation: the pancreatic head and neighbouring structures are removed, then the remaining pancreas, bile duct and gut are joined so food, bile and pancreatic juice can still pass. It is one sitting, not a menu of optional extras.",
    "Complexity is why two honest letters can differ by tens of thousands of dollars under the same procedure name. Vascular involvement, whether the pylorus is kept, open versus minimally invasive access, and how many ICU nights the letter actually names all change theatre time and stay. Cost in India sits in a GAF planning range — currently [INDIA_COST] for the surgical episode and a stay of [STAY] — because reconstruction, possible high-dependency care and a fistula watch are not priced like a two-night endoscopy. That band is a planning range, not a hospital quotation. Surgery cost is not total pancreatic-cancer treatment cost. Staging, chemotherapy and later surveillance sit on neighbouring estimates. The letter you travel on is written after a surgeon who performs pancreaticoduodenectomy has seen the films.",
  ],
  overviewHeading: "What is a Whipple Procedure?",
  whoHeading: "When is a Whipple Procedure performed?",

  answer: [
    "Whipple Procedure cost in India typically ranges from [INDIA_COST] for the planned pancreaticoduodenectomy, reconstruction, anaesthesia, histopathology and a hospital stay of [STAY]. Typical US self-pay for a comparable surgical episode is [US_COST]. Theatre time is usually about five to eight hours depending on vascular work, reconstruction and open versus minimally invasive access.",
    "That figure is a planning range, not a hospital quotation. It usually covers the named surgeon, operating room, anaesthesia, the quoted room category and nights, routine inpatient medicines and specimen pathology. ICU nights inside the quoted stay may be inside; extra ICU days, CT, MRI/MRCP, EUS, biopsy, chemotherapy, radiation, blood products and pancreatic-fistula management are frequently not. Laparoscopic or robotic-assisted access, when offered, should be named — there is no separate GAF price sheet for those techniques.",
    "What moves the number most is resectability and vascular work, classic versus pylorus-preserving reconstruction, open versus minimally invasive access, named ICU nights, campus tier and the named consultant. International patients should budget the weeks around the knife — and any oncology that sits in the same visa window — not only the theatre block.",
  ],

  indiaCost: [
    "There is no single Whipple price in India. The [INDIA_COST] band is a planning range for pancreaticoduodenectomy — theatre, anaesthesia, the named surgeon's fee, the quoted room, routine inpatient drugs, ICU as written into the estimate, reconstruction and histopathology. The lower end typically reflects a straightforward sitting at a mid-tier NABH campus, without vascular reconstruction, toward the shorter end of [STAY]. The upper end typically reflects a flagship JCI campus, a senior HPB surgeon, vascular involvement, laparoscopic or robotic access where used, a private room, named high-dependency nights, and a stay toward 18 nights.",
    "Treat that band as an order of magnitude until a surgeon who actually performs Whipple surgery has seen triphasic pancreas-protocol CT, CA 19-9 where relevant, and whether chemotherapy has already been given. Same procedure name is not the same surgical plan. A pylorus-preserving letter is not a classic Whipple with partial gastrectomy. A letter written without vascular reconstruction is not a letter written with it.",
    "Surgery cost is not total pancreatic-cancer treatment cost. Staging, systemic therapy, radiation in selected cases and later surveillance sit on neighbouring estimates. City is a weaker driver than families expect. Campus tier, named ICU nights and whether a leak or delayed gastric emptying extends stay move the bill more than the metro name. GAF Healthcare matches centres that already run HPB and pancreatic lists — that is a matching rule, not a ranking of hospitals.",
  ],

  costComponents: [
    {
      label: "Surgeon fee and surgical team",
      detail:
        "Usually bundled for the named HPB, GI or surgical-oncology consultant. Confirm who is in theatre. An HPB listing is not automatically a robotic Whipple with vascular reconstruction.",
    },
    {
      label: "Hospital and operating-room charges",
      detail:
        "Theatre time for a five-to-eight-hour sitting, energy devices, staplers where used, and recovery. Laparoscopic or robotic access, when used, lengthens or reprices this block. Campus tier moves this line more than the city name.",
    },
    {
      label: "Anaesthesia",
      detail:
        "Anaesthetist fee and drugs for a long case. Cardiopulmonary comorbidity and major blood-loss planning may add a pre-operative clearance billed outside.",
    },
    {
      label: "ICU and critical-care monitoring",
      detail:
        "Early high-dependency or ICU care is common after pancreaticoduodenectomy. Nights inside the quoted stay may be bundled; extra days after fistula, delayed emptying or bleeding are typically extra.",
    },
    {
      label: "Diagnostic investigations",
      detail:
        "Standard bloods, coagulation and ECG are often inside the admission. Pancreas-protocol CT, MRI/MRCP, EUS, biopsy and tumour markers are frequently extra if not already done at home.",
    },
    {
      label: "Pathology",
      detail: "Processing of the specimen and margins. Molecular assays, when ordered, are often billed later.",
    },
    {
      label: "Medicines and nutrition",
      detail:
        "Inpatient analgesia, antibiotics, DVT prophylaxis, pancreatic enzyme replacement where started in hospital, and routine drugs during the quoted stay. Dietitian follow-up after discharge is frequently extra. This page does not set a diet.",
    },
    {
      label: "Room charges and nursing",
      detail: "Written against a room category and a stated number of nights — typically [STAY]. Companion beds change the nightly rate.",
    },
    {
      label: "Postoperative care and follow-up",
      detail:
        "Drain output, blood sugar where relevant, wound care and the first clinic review before you fly are commonly included. Later oncology visits and imaging are typically separate.",
    },
  ],

  whyQuotesDiffer:
    "Two honest estimates can differ because the operations are not the same. Classic Whipple is not pylorus-preserving. A head tumour clear of vessels is not a borderline-resectable sitting with venous reconstruction. Open is not laparoscopic. Named ICU nights are not extra fistula days. Campus tier and the named surgeon move the bill more than the city on the boarding pass. Higher cost is not a measure of better care.",

  costDrivers: [
    {
      label: "Diagnosis and tumour location",
      detail:
        "Pancreatic head, ampullary, distal bile-duct and duodenal tumours are planned differently. Location decides whether Whipple is even the honest operation.",
    },
    {
      label: "Cancer stage and resectability",
      detail:
        "Resectable, borderline-resectable, locally advanced and metastatic disease are different conversations. Extrahepatic or distant disease can take Whipple off the table.",
    },
    {
      label: "Vascular involvement",
      detail:
        "Vein reconstruction, when planned, lengthens theatre and ICU. Ask whether the letter assumes a standard sitting or vascular work.",
    },
    {
      label: "Surgical complexity and reconstruction",
      detail:
        "Classic versus pylorus-preserving, and how the pancreatic, biliary and gastric joins are made, change resource use. Neither reconstruction is universally better.",
    },
    {
      label: "Open versus laparoscopic surgery",
      detail:
        "Laparoscopic access, when offered, changes theatre time and consumables. No separate GAF sheet — ask whether it is actually available for your anatomy that week.",
    },
    {
      label: "Robotic assistance",
      detail:
        "Robotic-assisted Whipple, where clinically offered, is a different resource envelope. There is no separate GAF robotic-Whipple tariff.",
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
        "Surgical fees cluster more tightly across the five metros than hotel bills for three to four weeks. City choice matters most after discharge.",
    },
    {
      label: "ICU requirement and length of stay",
      detail:
        "Packages are written for [STAY], including some high-dependency care if named. Extra nights after fistula, delayed gastric emptying or bleeding are usually billed fresh.",
    },
    {
      label: "Pathology and complications",
      detail: "Specimen processing may be bundled. Molecular tests, fistula drains, transfusion and re-operation are new events unless the contract says otherwise.",
    },
    {
      label: "Additional cancer treatment",
      detail:
        "Chemotherapy, radiation in selected cases, targeted therapy or immunotherapy, when used, are neighbouring quotes. Surgery cost is not total treatment cost.",
    },
    {
      label: "Overall condition and nutrition",
      detail:
        "Jaundice, poor nutrition and cardiac or pulmonary comorbidity add clearance tests, possible biliary drainage before theatre, and a longer ward course.",
    },
  ],

  inclusions: [
    {
      label: "Consultation that leads into the admission",
      detail: "The in-person pre-operative review with the named surgeon, where bundled. Remote review before travel is arranged separately.",
    },
    {
      label: "Surgery by the named consultant",
      detail: "The pancreaticoduodenectomy as written on the estimate — not an unnamed robotic sitting or vascular reconstruction unless the letter says so.",
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
      detail: "Processing of the resected specimen and margins, where histopathology is bundled.",
    },
    {
      label: "Medicines during admission",
      detail: "Analgesia, antibiotics and routine drugs administered during the quoted stay.",
    },
  ],

  exclusions: [
    {
      label: "Staging imaging, EUS and biopsy",
      detail: "CT, MRI/MRCP, endoscopic ultrasound, biopsy and tumour-marker panels are frequently extra when ordered in India.",
    },
    {
      label: "Systemic therapy and radiation",
      detail: "Chemotherapy, targeted therapy, immunotherapy and radiotherapy are neighbouring quotes.",
    },
    {
      label: "Extra ICU, fistula care and re-operation",
      detail: "Nights and theatre beyond the quoted stay, including treatment of pancreatic fistula, bile leak or delayed gastric emptying, are typically a new event.",
    },
    {
      label: "Blood products",
      detail: "Transfusion, when required, is commonly billed per unit.",
    },
    {
      label: "Molecular pathology",
      detail: "NGS and other assays, when ordered, are frequently extra.",
    },
    {
      label: "Rehabilitation, enzymes after discharge and later imaging",
      detail: "Physiotherapy, long-term enzyme replacement after you leave, and surveillance CT are typically separate.",
    },
    {
      label: "Travel, accommodation and visa-related expenses",
      detail: "Flights, medical visa fees, hotel after discharge, local transport and companion living costs sit outside every hospital estimate.",
    },
  ],

  approachComparison: {
    heading: "Whipple Procedure vs other pancreatic surgeries",
    intro: [
      "Whipple surgery is one pancreatic operation, not all of them. Distal pancreatectomy and total pancreatectomy remove different parts of the gland. GAF Healthcare publishes a planning range for Whipple Procedure as this cost sheet. Neighbouring sheets exist where the catalog names those other operations. None is universally better.",
      "Selection depends on tumour location, extent, resectability and the operating team's assessment. This page does not recommend Whipple, distal or total pancreatectomy for an individual patient.",
    ],
    rows: [
      {
        name: "Whipple Procedure",
        relative: "Pancreatic head and neighbouring structures, then reconstruction",
        detail:
          "Typical sitting for selected tumours of the pancreatic head, ampulla, distal bile duct or duodenum. Exact structures removed vary. This sheet's planning range applies when the letter is pancreaticoduodenectomy.",
        procedure: "Whipple Procedure",
      },
      {
        name: "Distal pancreatectomy",
        relative: "Body and tail of the pancreas; spleen sometimes included",
        detail:
          "Used when disease sits in the body or tail, not the head. Different reconstruction, usually a shorter stay. Neighbouring catalog sheet — not a Whipple add-on.",
        procedure: "Distal Pancreatectomy",
      },
      {
        name: "Total pancreatectomy",
        relative: "Entire pancreas, when that is the honest sitting",
        detail:
          "Selected diffuse or multifocal disease. Lifelong insulin and enzyme replacement follow. Neighbouring catalog sheet. Not a default upgrade from Whipple.",
        procedure: "Pancreatectomy",
      },
    ],
  },

  accessComparison: {
    heading: "Open vs minimally invasive Whipple surgery",
    intro: [
      "Surgical access is how the team reaches the pancreas. It is not a separate cancer operation. Open, laparoscopic and robotic-assisted sittings can all be used to perform a Whipple when the treating team judges them suitable. None is universally better, and minimally invasive access is not suitable for every patient.",
      "Suitability depends on the tumour, vascular anatomy, prior surgery, surgeon expertise, hospital resources and patient factors. There is no separate GAF price sheet for laparoscopic or robotic Whipple.",
    ],
    rows: [
      {
        name: "Open",
        access: "One abdominal incision, often a rooftop or midline cut",
        method: "Direct handling of the pancreatic head, vessels and reconstruction. Still used when ports are not honest or not available.",
        resources: "Standard theatre; no robotic console. ICU follows the sitting, not the incision length.",
        recovery: "Wound recovery can be slower. Fistula watch, delayed emptying and nutrition still dominate the stay.",
        cost: "Often the lower theatre-consumable line. Not automatically the cheaper total bill if vascular reconstruction or a long ICU course is required.",
      },
      {
        name: "Laparoscopic",
        access: "Several small ports, sometimes with a small extraction incision",
        method: "Same oncological jobs — assessment, resection and reconstruction — through ports when offered.",
        resources: "Laparoscopic stack, energy devices and a trained team. Conversion to open remains possible.",
        recovery: "Some patients mobilise sooner. Pancreatic fistula and delayed gastric emptying are not removed by ports.",
        cost: "Theatre time and devices can sit toward the upper part of the band. No separate GAF laparoscopic-Whipple tariff.",
      },
      {
        name: "Robotic-assisted",
        access: "Ports plus a robotic console where the hospital actually offers it that week",
        method: "Wristed instruments for selected anatomy. Still a pancreaticoduodenectomy — not a different cancer.",
        resources: "Console time, trained team and often a higher consumable envelope. Not universally available.",
        recovery: "Recovery still follows the joins, fistula risk and prior chemotherapy — not the brand of robot.",
        cost: "A different resource envelope. There is no separate GAF robotic-Whipple tariff. Paying more does not by itself make a join safer.",
      },
    ],
  },

  topicSections: [
    {
      id: "types-of-whipple",
      heading: "Types of Whipple Procedure",
      paragraphs: [
        "A classic Whipple typically removes the pancreatic head, duodenum, gallbladder, part of the bile duct and the distal stomach, then reconstructs the remaining pancreas, bile duct and gut. A pylorus-preserving pancreaticoduodenectomy keeps the stomach's outlet (the pylorus) when the team judges that oncologically honest. The exact structures removed still vary with anatomy and tumour.",
        "Neither approach is universally better. Choice depends on tumour location, stomach involvement and surgeon assessment. GAF Healthcare does not publish a separate tariff for pylorus-preserving versus classic Whipple. Ask which reconstruction the letter assumes.",
      ],
    },
    {
      id: "whipple-for-cancer",
      heading: "Whipple Procedure for pancreatic cancer",
      paragraphs: [
        "For selected pancreatic-head cancers, surgery is discussed only after staging. Teams speak of resectable disease, borderline-resectable disease (often with vessel contact that may need chemotherapy first or vascular reconstruction), locally advanced disease that is not currently removable, and metastatic disease where Whipple is usually not the first conversation.",
        "Some patients receive chemotherapy — and occasionally radiation — before surgery. That sequence is an MDT decision, not a brochure upgrade. Neighbouring GAF sheets exist for chemotherapy and radiation. This page does not provide an individualized treatment plan.",
      ],
    },
    {
      id: "resectability",
      heading: "How do doctors determine whether a pancreatic tumour can be removed?",
      paragraphs: [
        "Resectability is a staging question, not a price question. Pancreas-protocol CT is the usual first map. MRI or MRCP, endoscopic ultrasound and biopsy are added where they change the plan. CA 19-9, when clinically relevant, is a blood marker — not a yes-or-no test for surgery. Vascular involvement and any metastatic disease are read on the same films.",
        "Fitness for a five-to-eight-hour sitting and a [STAY] admission is assessed separately. Pancreatic surgery decisions typically involve an HPB or GI surgical oncologist, medical oncologist, radiologist and, where relevant, a gastroenterologist who does EUS. This page does not publish rigid eligibility rules for a named patient.",
      ],
    },
    {
      id: "reconstruction",
      heading: "How is the digestive system reconstructed after a Whipple Procedure?",
      paragraphs: [
        "After the head of the pancreas and neighbouring structures come out, three joins are usually made so the remaining organs can still work. Pancreaticojejunostomy joins remaining pancreas to jejunum so pancreatic juice can drain. Hepaticojejunostomy joins the bile duct to jejunum. Gastrojejunostomy (or duodenojejunostomy after a pylorus-preserving sitting) restores a food passage.",
        "Those three joins are why Whipple recovery is a nutrition and drain conversation, not only a wound conversation. Delayed gastric emptying and pancreatic fistula, when they occur, usually involve one of those joins. This page does not prescribe a reconstruction for an individual.",
      ],
    },
  ],

  overview: {
    what: [
      "A Whipple Procedure, or pancreaticoduodenectomy, is a major operation that removes the pancreatic head and nearby structures — typically the duodenum, gallbladder, part of the bile duct, and often the distal stomach — then reconstructs the digestive tract so food, bile and pancreatic juice can still pass. The exact structures removed vary with the surgical approach and the patient's anatomy.",
      "The pancreas sits behind the stomach. Its head nestles in the C-loop of the duodenum, with the bile duct running through or beside that head. That geography is why a tumour in this corner is not treated like a tumour in the pancreatic tail. GAF Healthcare does not decide on this page whether Whipple is appropriate. Treatment plans are determined by qualified doctors after evaluation.",
    ],
    who: [
      "Whipple surgery may be considered for selected cancers of the pancreatic head, ampulla, distal bile duct or duodenum, selected pancreatic neuroendocrine tumours, and some benign or premalignant lesions in that same corner. It is not required for every pancreatic tumour. Disease in the body or tail is often a distal pancreatectomy conversation. Metastatic disease, unresectable vascular encasement or poor fitness often mean a different path — systemic therapy or non-operative care.",
      "This page does not diagnose and does not recommend Whipple, distal pancreatectomy or non-operative care for an individual. Eligibility depends on imaging, resectability and clinical assessment.",
    ],
    how: [
      "Anaesthesia is general. Surgical access may be an open incision or laparoscopic or robotic ports when the team offers them. The tumour and vessels are assessed. Planned structures are removed. The remaining pancreas, bile duct and gut are reconstructed. The abdomen is closed. You wake on a ward or in high-dependency care. Pathology arrives days later and feeds the next oncology conversation. This page does not describe graphic operative detail.",
    ],
    variations: [
      {
        label: "Classic Whipple",
        detail: "Includes distal stomach with the head, duodenum, gallbladder and bile-duct segment, then three joins. Not automatically more complete than a pylorus-preserving sitting.",
      },
      {
        label: "Pylorus-preserving pancreaticoduodenectomy",
        detail: "Keeps the stomach's outlet when that is oncologically honest. Different gastric join. Same national planning band unless the letter names extras.",
      },
      {
        label: "Vascular reconstruction",
        detail: "Selected borderline-resectable anatomy. Longer theatre and ICU. Ask whether the letter includes it.",
      },
      {
        label: "Open versus laparoscopic versus robotic access",
        detail:
          "Ports instead of, or in addition to, an open incision when the team offers it. Oncological goals remain clearance and safe reconstruction. None is universally better.",
      },
    ],
    preparation: [
      "Expect blood tests including liver and kidney function, coagulation, nutritional review, pancreas-protocol CT, and anaesthetic and cardiopulmonary assessment. MRI/MRCP, EUS, biopsy and CA 19-9 are used where clinically relevant. Home investigations can often be reviewed rather than repeated if discs open.",
      "Bring prior chemotherapy dates, biliary-stent notes if jaundiced, and a current medicine list. Arrive with enough days before theatre for anaesthetic review. Do not book a same-week international flight after a long-haul landing into a Whipple.",
    ],
    recovery: [
      "Hospital stay is typically [STAY]. Early days watch drains, liver tests, blood sugar where relevant, pain, nutrition and mobility. Complex sittings may start in ICU. This page does not set a diet or a discharge date.",
      "Pancreatic fistula, bile leak, delayed gastric emptying, infection, bleeding, fluid collections, digestive and nutritional problems, blood-sugar changes, clots, respiratory issues and wound problems can extend stay. Risk varies with anatomy, reconstruction, fitness and prior treatment. Individual percentages are not published here.",
      "Pathology review decides further oncology. International patients often need further hotel days after discharge before a long-haul flight. Ranges on this page are not promises of recovery time.",
    ],
  },

  fullPathway: {
    intro: [
      "The surgical estimate is only one line in a medical-travel budget. Surgery cost is not total pancreatic-cancer treatment cost and is not total medical-tourism cost. Staging scans, systemic therapy, extra ICU, hotel after discharge, flights and a companion who can stay are the rest of the trip.",
      "Ask the coordinator to quote each stage separately. Do not invent flight or hotel prices from this page. Add your own numbers: surgery + quoted stay including named ICU nights + staging tests + oncology if in India + flights + visa + hotel nights × rate + local transport + attendant costs + a contingency for extra nights or fistula days.",
    ],
    stages: [
      {
        label: "Staging and resectability work-up",
        detail: "Pancreas-protocol CT, MRI/MRCP or EUS where indicated, bloods, CA 19-9 where relevant. Often extra if done in India.",
      },
      {
        label: "Systemic therapy or radiation, if used",
        detail: "Neighbouring cost sheets. Can add weeks in the city before or after theatre.",
      },
      {
        label: "The operation",
        detail:
          "Whipple, anaesthesia, ICU as quoted, [STAY] and pathology. This is the [INDIA_COST] line when the letter matches that scope.",
      },
      {
        label: "Extra ICU, fistula care, transfusion",
        detail: "Beyond the quoted nights. Ask what happens if hospitalization is extended.",
      },
      {
        label: "Adjuvant oncology",
        detail: "Further drugs or radiation if pathology and the MDT advise it.",
      },
      {
        label: "Flights and visa",
        detail: "Patient and attendant. Medical visa duration should cover extra nights if recovery is slow. Issuance is not guaranteed.",
      },
      {
        label: "Accommodation after discharge",
        detail: "Hotel or apartment near the campus until the surgeon is content you can fly.",
      },
    ],
  },

  journey: [
    { label: "Submit medical records", detail: "Pancreas-protocol CT or MRI, liver-function tests, biopsy if done, CA 19-9 if available, a medicine list and prior chemotherapy dates." },
    { label: "Imaging and pathology review", detail: "A surgeon who performs Whipple surgery reads the actual films and histology, not a coordinator's paraphrase." },
    { label: "Specialist assessment", detail: "On camera: whether resection now, chemotherapy first, or a non-operative path is the honest next step." },
    { label: "Staging and resectability review", detail: "Vessel contact, metastatic disease and fitness are checked before a date is offered." },
    { label: "Multidisciplinary treatment planning", detail: "Surgical, medical and, where relevant, radiation oncology agree sequence." },
    { label: "Preliminary treatment plan and cost estimate", detail: "An itemised surgical letter. Reconstruction, approach, ICU nights and oncology quoted separately if in view." },
    { label: "Hospital selection", detail: "Compare the surgeon you met, whether the campus runs HPB lists and ICU that has managed pancreatic fistula, and how long a companion can stay." },
    { label: "Travel planning", detail: "A hospital invitation typically supports a medical visa. Write duration for [STAY] plus hotel recovery. Visa issuance is not guaranteed." },
    { label: "Hospital admission", detail: "Usually a day or two before theatre after in-person examination and any missing tests." },
    { label: "Surgery", detail: "Five to eight hours depending on vascular work and reconstruction." },
    { label: "Postoperative recovery", detail: "Ward or high-dependency across [STAY]. Extra nights are a clinical decision, not a package failure." },
    { label: "Pathology and further treatment", detail: "Specimen results feed adjuvant planning. Do not fly before that conversation if further treatment in India is likely." },
    { label: "Follow-up and return-home planning", detail: "Operative note, pathology and a written handover. Fly when the named surgeon is content." },
  ],

  documents: [
    "Pancreas-protocol CT, plus MRI/MRCP or EUS if already done",
    "Liver-function tests, blood count, coagulation and kidney function",
    "CA 19-9 result if already measured",
    "Biopsy histopathology if a sample has already been taken",
    "Chemotherapy or radiation summary if treatment has started",
    "Biliary-stent or ERCP notes if jaundiced",
    "Cardiac and pulmonary test results, if available",
    "Current medication list, allergies, and diabetes history",
    "Passport, and a hospital invitation letter for the medical visa application",
  ],

  cities: whippleProcedureCities,

  destinations: [
    {
      country: "India",
      stay: "[STAY]",
      positioning: "Catalog planning range",
      context:
        "Named pancreaticoduodenectomy listings can be met on camera before travel. Listed consultants currently sit in Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad.",
    },
    {
      country: "Turkey",
      costLevel: [1, 1.8],
      stay: "10–18 nights",
      positioning: "Packaged medical-travel market",
      context: "Verify whether ICU nights, fistula management, vascular reconstruction and systemic therapy are inside the bundle.",
    },
    {
      country: "Thailand",
      costLevel: [1.2, 2.2],
      stay: "10–18 nights",
      positioning: "Private-hospital tourism",
      context: "Established international desks; major pancreaticoduodenectomy with ICU extras can sit well above India.",
    },
    {
      country: "United Arab Emirates",
      costLevel: [2, 3.4],
      stay: "10–18 nights",
      positioning: "Regional premium private care",
      context: "Short flights from much of Africa and West Asia; private HPB pricing is closer to Western self-pay.",
    },
    {
      country: "Singapore",
      costLevel: [2.6, 4.4],
      stay: "10–18 nights",
      positioning: "High-cost private hub",
      context: "Mature multidisciplinary process at premium private tariffs. Local subsidised and international private bills differ.",
    },
    {
      country: "Germany",
      costLevel: [2.2, 4.2],
      stay: "12–21 nights",
      positioning: "Certified European HPB units",
      context: "Structured MDT process and longer inpatient norms; self-pay deposits are typical for visitors.",
    },
    {
      country: "United Kingdom",
      costLevel: [1.8, 3.4],
      stay: "10–18 nights",
      positioning: "Private self-pay (NHS generally not for visitors)",
      context: "NHS care is not available to most overseas visitors. Private self-pay applies; oncology is quoted separately.",
    },
    {
      country: "United States",
      stay: "8–16 nights",
      positioning: "Highest self-pay outlier",
      context: "Facility, surgeon, ICU, pathology and later oncology bills often arrive separately. Compare against actual insurance liability.",
    },
  ],

  destinationIntro: [
    "The table below is a planning comparison for Whipple Procedure as a surgical episode, not a claim that every country uses the same reconstruction or bundles ICU the same way. India and United States figures come from the GAF Healthcare catalog. Other markets are modelled from the India midpoint using relative private-care cost levels, and are labelled as indicative planning estimates — not hospital quotations.",
    "India is often less expensive for a self-funding patient. That is not the same as 'always cheapest' or 'best'. Insurance coverage at home can reverse the arithmetic overnight. Hospital, surgeon, resectability, surgical approach, ICU, length of stay, oncology treatment and what the package includes still decide the real bill in every country.",
  ],

  destinationNote:
    "International treatment costs vary by hospital, surgeon, diagnosis, resectability, vascular involvement, surgical approach, reconstruction, length of stay, ICU requirements, oncology treatment and what is included in the package. These figures are intended for preliminary comparison only and are not final quotations. Figures other than India and the United States are modelled planning estimates. They are not GAF quotations and not competitor quotes reproduced as ours.",

  cityIntro: [
    "City names below are working filter URLs — the same destination, city, specialty and procedure keys the rest of the site already uses. Open Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad for the city overlay and the filtered doctor and hospital cards.",
    "We do not invent a different surgical tariff for each metro. The approximate cost column uses the India planning band of [INDIA_COST] unless a researched city figure exists. What does change is the named consultant list, whether HPB ICU sits on the same plot, airport access and how expensive a three-to-four-week companion stay actually feels.",
  ],

  whyIndia: [
    "International patients consider India for Whipple surgery when they are self-funding a pancreaticoduodenectomy, when they want a named HPB surgeon before they fly, and when they need resectability review, ICU that has managed pancreatic fistula, and the next oncology conversation in the same city.",
    "Cost is the most visible reason. The catalog range [INDIA_COST] sits well below typical US cash-pay of [US_COST], because theatre, ward and consultant time are priced on a different cost base — not because the operation is a lesser product by definition. Several listed metros can hold an MDT conversation in one week. English is the working language of most international desks. Laparoscopic and robotic access are offered in some listed houses; availability is a diary question.",
    "None of that means India is the right country for every patient, and none of it is a claim of 'best pancreatic surgeons in the world', guaranteed joins or 'cheapest in the world'. Someone whose insurance covers the pathway at home, who cannot stay for a slow fistula watch, or whose staging shows resection is not honest, may be better treated locally.",
  ],

  whyCostDiffers: [
    "The figure on this page is a planning range. The figure on a hospital letter is an estimate written against a named reconstruction, a named surgeon, a stated number of nights, and a resectability plan. Those two documents are not supposed to match to the dollar.",
    "The term Whipple Procedure can describe operations of very different complexity. Cost may change because of diagnosis, tumour location, stage, vascular involvement, classic versus pylorus-preserving reconstruction, open versus minimally invasive or robotic access, ICU, pathology, extra nights and complications.",
    "If two hospitals quote different numbers, read the line items before you assume one is overcharging. One letter may include named high-dependency nights and intraoperative frozen section; the other may bill them later. Higher cost is not a measure of better treatment.",
  ],

  planningClose: [
    "Whipple Procedure in India is typically planned in the [INDIA_COST] band for pancreaticoduodenectomy as quoted and the inpatient stay, against [US_COST] self-pay in the United States. The variables that actually move that band are resectability, vascular work, reconstruction, campus tier, the named surgeon and whether chemotherapy is completed in the same trip.",
    "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad each have listed campuses for this surgical-oncology pathway. Named catalog consultants for Whipple Procedure currently sit in all five cities. Doctor and hospital cards on this page link only to profiles that already exist in the catalog.",
    "A personalized quotation, written after records review, is the document you should travel on. Cost ranges on this page are intended for preliminary planning and comparison only. Final treatment costs vary according to the patient's clinical condition, treatment plan, hospital, surgeon, surgical approach, length of stay and other factors. A personalized quotation should be obtained before making treatment or travel decisions.",
  ],

  questionsToAsk: [
    "Is the surgeon's fee included, and is the person on this call the person in theatre?",
    "Is this a classic Whipple or pylorus-preserving pancreaticoduodenectomy — and is that named on the letter?",
    "Does the letter assume vascular reconstruction?",
    "Is the approach open, laparoscopic or robotic-assisted, and is that named?",
    "How many ICU or high-dependency nights are included, and what happens if I need more?",
    "Are operating-room energy devices and consumables included?",
    "Is anaesthesia included for a five-to-eight-hour case?",
    "Are CT, MRI/MRCP, EUS, biopsy and cardiopulmonary tests included?",
    "Is pathology of the specimen included? Molecular tests?",
    "Is chemotherapy or radiation included?",
    "How many hospital nights and which room category?",
    "What happens if a pancreatic fistula, delayed gastric emptying or extra hospitalization occurs?",
    "Is follow-up before I fly included?",
  ],

  faqs: [
    {
      q: "What is the cost of a Whipple Procedure in India?",
      a: "Plan against [INDIA_COST] for the planned pancreaticoduodenectomy, anaesthesia, stay of [STAY] and specimen pathology. Typical US self-pay is [US_COST]. The final figure is an itemised hospital estimate after a surgeon reviews imaging and resectability. Systemic therapy and extra fistula days are usually separate.",
    },
    {
      q: "What is the Whipple Procedure?",
      a: "It is a major operation that removes the pancreatic head and neighbouring structures, then reconstructs the digestive tract. Exact structures removed vary with the surgical plan. It is also called pancreaticoduodenectomy.",
    },
    {
      q: "What is another name for Whipple surgery?",
      a: "Pancreaticoduodenectomy. Classic and pylorus-preserving versions are both Whipple operations. Distal pancreatectomy is a different sitting.",
    },
    {
      q: "Why is a Whipple Procedure performed?",
      a: "It may be used for selected tumours of the pancreatic head, ampulla, distal bile duct or duodenum, and for some neuroendocrine or premalignant lesions in that corner. Not every pancreatic tumour requires Whipple surgery.",
    },
    {
      q: "Is Whipple surgery used for pancreatic cancer?",
      a: "For selected resectable or borderline-resectable cancers of the pancreatic head, yes — after staging. Locally advanced or metastatic disease is often a different conversation. This page does not decide eligibility.",
    },
    {
      q: "Is Whipple surgery used for bile duct cancer?",
      a: "Selected distal bile-duct cancers may be treated with pancreaticoduodenectomy when imaging shows a removable lesion and adequate reconstruction. Intrahepatic or hilar disease is planned differently.",
    },
    {
      q: "What is the difference between a Whipple and distal pancreatectomy?",
      a: "Whipple removes the pancreatic head and neighbouring structures. Distal pancreatectomy removes the body and tail. Location of disease decides which sitting is honest. Neighbouring GAF sheets exist for distal pancreatectomy.",
    },
    {
      q: "What is a pylorus-preserving Whipple?",
      a: "A version that keeps the stomach's outlet when the team judges that oncologically honest. It is still a pancreaticoduodenectomy. There is no separate GAF pylorus-preserving tariff.",
    },
    {
      q: "Is robotic Whipple surgery available in India?",
      a: "Some listed campuses offer robotic-assisted pancreaticoduodenectomy. Availability is a diary and anatomy question, not a metro-wide guarantee. There is no separate GAF robotic-Whipple price.",
    },
    {
      q: "How long does Whipple surgery take?",
      a: "Typically about five to eight hours, longer if vascular reconstruction is required. This page does not promise theatre time for a named patient.",
    },
    {
      q: "How long is the hospital stay after Whipple surgery?",
      a: "Typically [STAY] on this sheet. Fistula, delayed gastric emptying or bleeding extend that. This page does not promise a discharge date.",
    },
    {
      q: "How long does recovery take?",
      a: "Fatigue, digestive adjustment and activity limits often last weeks after discharge. Individual recovery varies. This page does not set a return-to-work date.",
    },
    {
      q: "What tests are needed before Whipple surgery?",
      a: "Typically bloods, liver and kidney function, coagulation, pancreas-protocol CT, and anaesthetic assessment. MRI/MRCP, EUS, biopsy and CA 19-9 are used where clinically relevant. The exact work-up varies.",
    },
    {
      q: "What is included in the cost?",
      a: "A typical surgical estimate covers the named surgeon, anaesthesia, theatre, quoted ward or ICU nights, routine inpatient medicines and specimen pathology. Confirm devices, extra ICU, imaging and drugs.",
    },
    {
      q: "What costs may be additional?",
      a: "Often: CT, MRI/MRCP, EUS, biopsy, systemic therapy, extra ICU, fistula management, transfusion, molecular tests, hotel, flights and visa-related expenses. Read the exclusions as carefully as the inclusions.",
    },
    {
      q: "How should I compare Whipple surgery quotations?",
      a: "Line by line: surgeon, reconstruction, vascular plan, approach, ICU nights, devices, pathology, extra-night and fistula policy, imaging and oncology. Same procedure name is not the same surgical plan.",
    },
  ],

  doctorHeading: "Doctors to consider for Whipple Procedure in India",
  cityDoctorHeading: "Whipple Procedure Surgeons in [CITY]",
  doctorIntro:
    "These are consultants listed on GAF Healthcare whose catalog procedures include Whipple Procedure or pancreaticoduodenectomy. Profiles show training, campus and procedures as held in the catalog. There are no rankings here, and no fee is paid for placement. Named listings currently sit in Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad.",
  hospitalHeading: "Hospitals to consider for Whipple Procedure in India",
  cityHospitalHeading: "Whipple Procedure Hospitals in [CITY]",
  hospitalIntro:
    "Campuses on GAF Healthcare where this surgical-oncology pathway is listed, with accreditation as published by the hospital. Listing with the procedure family is not a claim of Whipple volume or a ranking. Choose on the surgeon you met on camera, whether the house runs HPB lists and fistula-aware ICU, and whether staging can stay in the same city — not on a brand slogan.",

  relatedProcedures: [
    "Liver Resection (Hepatectomy)",
    "Gastrectomy",
    "Esophagectomy",
    "Colectomy",
    "Rectal Cancer Surgery",
    "Distal Pancreatectomy",
    "Pancreatectomy",
    "Pancreatic Surgery",
    "Chemotherapy",
    "Neoadjuvant Chemotherapy",
    "Intensity-Modulated Radiotherapy (IMRT)",
  ],

  relatedBlogs: [
    { href: "/costs/India/Surgical-Oncology", label: "surgical oncology costs in India" },
    { href: "/costs/India/Surgical-Gastroenterology", label: "surgical gastroenterology costs in India" },
    { href: "/costs/India/Medical-Oncology", label: "medical oncology costs in India" },
    { href: "/costs/whipple-procedure", label: "Whipple Procedure cost in India" },
    { href: "/costs/pancreatic-surgery", label: "pancreatic surgery cost in India" },
    { href: "/costs/gastrectomy", label: "gastrectomy cost in India" },
    { href: "/costs/esophagectomy", label: "esophagectomy cost in India" },
    { href: "/costs/colectomy", label: "colectomy cost in India" },
    { href: "/doctors/India/Whipple-Procedure", label: "Whipple Procedure surgeons in India" },
    { href: "/hospitals/India/Whipple-Procedure", label: "pancreatic surgery hospitals in India" },
  ],

  figures: [
    {
      after: "overview",
      src: "/costs/whipple-procedure-anatomy-overview.webp",
      alt: "Medical illustration showing the pancreas, duodenum, bile duct and nearby structures involved in a Whipple Procedure",
      caption:
        "The typical Whipple field is the pancreatic head and neighbouring structures. Exact structures removed vary by surgical plan.",
      fit: "contain",
    },
    {
      after: "how",
      src: "/costs/whipple-procedure-surgical-process.webp",
      alt: "Illustration showing the main stages of a Whipple Procedure including resection and reconstruction of the digestive system",
      caption:
        "Resection is only half the sitting. Pancreatic, biliary and digestive reconstruction restore a pathway. None of these steps is a priced upgrade on this sheet.",
      fit: "contain",
    },
    {
      after: "journey",
      src: "/costs/whipple-procedure-treatment-journey-india.webp",
      alt: "Illustration showing the Whipple Procedure treatment journey for international patients travelling to India",
      caption:
        "Records, resectability review and a written estimate come before a ticket. Oncology, ICU extras and travel sit outside the surgical range unless named.",
      fit: "contain",
    },
  ],
};
