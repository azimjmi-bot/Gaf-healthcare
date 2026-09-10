import type { CostArticle } from "./types";
import { gastrectomyCities } from "./gastrectomy-cities";

export const gastrectomy: CostArticle = {
  procedure: "Gastrectomy",
  shortName: "gastrectomy",
  briefName: "Gastrectomy",
  duration: "approximately 2–5 hours",
  recoveryGlance: "Inpatient [STAY], then hotel step-down. Varies by patient.",
  slug: "gastrectomy",
  lastUpdated: "2026-09-10",
  seoTitle: "Gastrectomy Cost in India: Prices, Cities & Hospitals",
  seoDescription:
    "Gastrectomy cost in India is typically [INDIA_COST] for the operation and a stay of [STAY], against [US_COST] self-pay in the US. Compare partial versus total gastrectomy, laparoscopic and robotic access, cities, listed surgeons and hospitals, and how to request a personalized estimate.",
  heading: "Gastrectomy Cost in India",
  heroLede:
    "Gastrectomy is removal of part or all of the stomach — most often for selected gastric cancers, and sometimes for selected gastro-oesophageal junction tumours or other conditions where the treating team judges resection necessary. What is taken out, how the remaining gut is joined, and whether the approach is open, laparoscopic or robotic-assisted follow tumour location, size, stage, prior chemotherapy and the operating team's assessment. None of those choices is a menu upgrade. A distal partial gastrectomy and a total gastrectomy with Roux-en-Y reconstruction are not the same sitting, not the same anastomosis, and not the same letter. Cost in India sits in a GAF planning range — currently [INDIA_COST] for the surgical episode and a stay of [STAY] — because theatre time, lymph-node dissection, reconstruction and possible ICU are not priced like a two-night endoscopy. That band is for preliminary comparison, not a hospital quotation. The letter you travel on is written after a surgeon has seen the file. International patients should compare the complete treatment package: staging endoscopy and CT, neoadjuvant drugs if used, the resection, nutrition after the join, pathology, possible further oncology, flights and a companion who can stay for the admission — not only the surgery headline.",
  overviewHeading: "What is gastrectomy?",
  whoHeading: "When is gastrectomy performed?",

  answer: [
    "Gastrectomy cost in India typically ranges from [INDIA_COST] for the resection, reconstruction, anaesthesia, histopathology and a hospital stay of [STAY]. Typical US self-pay for a comparable surgical episode is [US_COST]. Theatre time is usually about two to five hours depending on partial versus total resection, lymph-node fields and reconstruction.",
    "That figure is a planning range, not a hospital quotation. It usually covers the named surgeon, operating room, anaesthesia, the quoted room category and nights, routine inpatient medicines and specimen pathology. ICU nights inside the quoted stay may be inside; extra ICU days, PET-CT, neoadjuvant chemotherapy, radiotherapy, nutritional formula after discharge and management of an anastomotic leak are frequently not. Laparoscopic or robotic-assisted access, when offered, should be named — there is no separate GAF price sheet for those techniques.",
    "What moves the number most is extent (partial, subtotal, total, proximal or distal), open versus minimally invasive access, reconstruction, whether a leak or delayed emptying extends stay, campus tier, the named consultant, and whether chemotherapy or radiation sits in the same trip. International patients should budget the weeks around the knife — not only the theatre block.",
  ],

  indiaCost: [
    "There is no single gastrectomy price in India. The [INDIA_COST] band is a planning range for a gastric resection — theatre, anaesthesia, the named surgeon's fee, the quoted room, routine inpatient drugs, ICU as written into the estimate, and histopathology. The lower end typically reflects a straightforward distal or partial gastrectomy at a mid-tier NABH campus with an uncomplicated course toward the shorter end of [STAY]. The upper end typically reflects a flagship JCI campus, a senior upper-GI surgical oncologist, a total gastrectomy with Roux-en-Y reconstruction, laparoscopic or robotic access where used, a private room, and a stay toward 14 nights.",
    "Treat that band as an order of magnitude until a surgeon who actually resects stomach has seen endoscopy, staging CT or PET-CT, biopsy, and whether neoadjuvant treatment has already been given. Same procedure name is not the same surgical plan. Partial is not total. Open is not laparoscopic. A letter written for one is not a letter written for another.",
    "City is a weaker driver than families expect. Campus tier, named ICU nights, whether nutrition support is bundled and whether the join is a Billroth reconstruction or a Roux-en-Y move the bill more than the metro name. An itemised estimate can only be written once a surgeon has read the file. GAF Healthcare matches centres that already run gastric-cancer lists — that is a matching rule, not a ranking of hospitals.",
  ],

  costComponents: [
    {
      label: "Surgeon fee and surgical team",
      detail:
        "Usually bundled for the named surgical oncologist or surgical gastroenterologist. Confirm who is in theatre, and whether a reconstructive or thoracic colleague is billed separately on a junction case.",
    },
    {
      label: "Hospital and operating-room charges",
      detail:
        "Theatre time, staplers, drains and recovery. Laparoscopic or robotic access, when used, lengthens or reprices this block. Campus tier moves this line more than the city name.",
    },
    {
      label: "Anaesthesia",
      detail:
        "Anaesthetist fee and drugs for a case lasting typically two to five hours. Cardiopulmonary comorbidity may add a pre-operative clearance billed outside.",
    },
    {
      label: "ICU and critical-care monitoring",
      detail:
        "Early high-dependency or ICU care may be used after total gastrectomy or a long sitting. Nights inside the quoted stay may be bundled; extra days after a leak or pneumonia are typically extra. Ask how many ICU nights the letter actually prices.",
    },
    {
      label: "Diagnostic investigations",
      detail:
        "Standard bloods and ECG are often inside the admission. Staging endoscopy, CT, PET-CT and cardiac clearance are frequently extra if not already done at home.",
    },
    {
      label: "Pathology",
      detail:
        "Processing of the specimen and lymph nodes. Immunohistochemistry, HER2 and other assays, when ordered, are often billed later.",
    },
    {
      label: "Medicines, nutrition and feeding",
      detail:
        "Inpatient analgesia, antibiotics, DVT prophylaxis and routine drugs during the quoted stay. Jejunostomy feeds, parenteral nutrition and discharge formula are frequently extra. This page does not set a diet.",
    },
    {
      label: "Room charges and nursing",
      detail:
        "Written against a room category and a stated number of nights — typically [STAY]. Companion beds change the nightly rate.",
    },
    {
      label: "Postoperative care and follow-up",
      detail:
        "Inpatient drain management, early feeding protocol and the first clinic review before you fly are commonly included. Later endoscopy, oncology visits and dietitian follow-up are typically separate.",
    },
  ],

  whyQuotesDiffer:
    "Two honest estimates can differ because the operations are not the same. Partial is not total. Distal is not proximal. Open is not laparoscopic. A Billroth join is not a Roux-en-Y after total gastrectomy. ICU nights inside the quote are not extra leak days. Campus tier and the named surgeon move the bill more than the city on the boarding pass. Higher cost is not a measure of better care.",

  costDrivers: [
    {
      label: "Type of gastrectomy",
      detail:
        "Partial, subtotal, total, proximal and distal resections are different sittings. Extent follows tumour location and staging, not a brochure upgrade.",
    },
    {
      label: "Hospital category and campus tier",
      detail: "Flagship versus satellite units sit at different price levels. Ask which address, and which ICU, the letter is written against.",
    },
    {
      label: "Surgeon and multidisciplinary team",
      detail:
        "The estimate should name the consultant. Upper-GI surgical oncology and surgical-gastroenterology lists are billed differently. That is not a ranking.",
    },
    {
      label: "City and companion logistics",
      detail:
        "Surgical fees cluster more tightly across the five metros than hotel bills for two weeks. City choice matters most after discharge.",
    },
    {
      label: "Open versus minimally invasive surgery",
      detail:
        "Laparoscopic access, when offered, changes theatre time and consumables. No separate GAF sheet — ask whether it is actually available that week.",
    },
    {
      label: "Robotic assistance",
      detail:
        "Robotic-assisted gastrectomy, where clinically offered, is a different resource envelope. There is no separate GAF robotic-gastrectomy tariff. Do not use a neighbouring robotics brochure as this operation's quote.",
    },
    {
      label: "Tumour location and cancer stage",
      detail:
        "Distal tumours, proximal tumours and junction tumours change reconstruction and whether the case is a gastrectomy or an esophagectomy. Complexity is why two patients with the same diagnosis receive different letters.",
    },
    {
      label: "Reconstruction technique",
      detail:
        "Gastroduodenostomy, gastrojejunostomy and esophagojejunostomy (often Roux-en-Y after total gastrectomy) are different joins. The letter should name the planned reconstruction.",
    },
    {
      label: "Lymph-node surgery",
      detail:
        "D1 and D2 lymphadenectomy are not the same sitting. Extent follows staging and the team's protocol, not a price list.",
    },
    {
      label: "Preoperative investigations",
      detail:
        "Endoscopy, CT and PET-CT where indicated sit outside [INDIA_COST] unless named. Home tests can often be reviewed rather than repeated.",
    },
    {
      label: "ICU requirement and length of stay",
      detail:
        "Packages are written for [STAY], including some high-dependency care if named. Extra nights after a leak, delayed emptying or pneumonia are usually billed fresh.",
    },
    {
      label: "Complications",
      detail:
        "Anastomotic leak, bleeding, pancreatic fistula after a distal resection that takes spleen or pancreas tail, and re-operation are new events unless the contract says otherwise.",
    },
    {
      label: "Additional cancer treatment",
      detail: "Neoadjuvant or adjuvant chemotherapy, radiation in selected settings, and later endoscopy sit outside the surgical estimate.",
    },
  ],

  inclusions: [
    {
      label: "Consultation that leads into the admission",
      detail: "The in-person pre-operative review with the named surgeon, where bundled. Remote review before travel is arranged separately.",
    },
    {
      label: "Surgery by the named consultant",
      detail: "The resection and reconstruction as written on the estimate — not an unnamed robotic sitting or a total gastrectomy unless the letter says so.",
    },
    {
      label: "Anaesthesia and operating room",
      detail: "The anaesthesia team, theatre time, standard consumables and recovery for the scheduled case.",
    },
    {
      label: "Hospital stay as quoted",
      detail: "Bed charges, nursing and routine ward care for the room category and nights written into the estimate — typically [STAY], including ICU nights if the letter names them.",
    },
    {
      label: "Routine tests",
      detail: "Standard bloods, ECG and anaesthetic fitness assessment, where bundled.",
    },
    {
      label: "Pathology of the specimen",
      detail: "Processing of the resected stomach and sampled nodes, where histopathology is bundled.",
    },
    {
      label: "Medicines during admission",
      detail: "Analgesia, antibiotics and routine drugs administered during the quoted stay.",
    },
  ],

  exclusions: [
    {
      label: "Advanced staging",
      detail: "Endoscopy, biopsy, CT, PET-CT and endoscopic ultrasound are frequently extra when ordered in India.",
    },
    {
      label: "Neoadjuvant and adjuvant oncology",
      detail: "Chemotherapy, chemoradiation, radiotherapy and later systemic therapy are neighbouring quotes.",
    },
    {
      label: "Extra ICU, leak management and re-operation",
      detail: "Nights and theatre beyond the quoted stay, including treatment of anastomotic leak, are typically a new event.",
    },
    {
      label: "Nutrition after discharge",
      detail: "Jejunostomy formula, parenteral nutrition and dietitian follow-up after you leave the ward are often extra.",
    },
    {
      label: "Blood products",
      detail: "Transfusion, when required, is commonly billed per unit.",
    },
    {
      label: "Molecular pathology",
      detail: "HER2, PD-L1 and other assays, when ordered, are frequently extra.",
    },
    {
      label: "Rehabilitation and later endoscopy",
      detail: "Swallow or dumping-symptom review, physiotherapy after discharge and anastomotic dilatation if needed are typically separate visits.",
    },
    {
      label: "Travel, accommodation and visa-related expenses",
      detail: "Flights, medical visa fees, hotel after discharge, local transport and companion living costs sit outside every hospital estimate.",
    },
  ],

  approachComparison: {
    heading: "Types of gastrectomy and their cost implications",
    intro: [
      "Extent is chosen to clear the tumour with a margin and reconstruct a usable food passage, not to sell a named operation. GAF Healthcare publishes a planning range only where a cost sheet already exists. The rows below describe relative complexity. They are not a menu of add-on prices, and none is universally better.",
      "Selection depends on tumour location, size, stage, prior treatment, anatomy and the reconstructive plan. This page does not recommend partial, total, laparoscopic or robotic gastrectomy for an individual patient.",
    ],
    rows: [
      {
        name: "Partial / distal gastrectomy",
        relative: "Distal stomach removed; remnant joined to duodenum or jejunum",
        detail:
          "Common when disease sits in the distal stomach and a remnant can be left. Reconstruction may be gastroduodenostomy or gastrojejunostomy. No separate GAF sheet — relative complexity within [INDIA_COST].",
      },
      {
        name: "Subtotal gastrectomy",
        relative: "Most of the stomach removed; a small remnant remains",
        detail:
          "Used when a total gastrectomy is not required but a simple distal resection would leave too little margin. Different remnant and join. No separate GAF price.",
      },
      {
        name: "Total gastrectomy",
        relative: "Entire stomach removed; oesophagus joined to jejunum",
        detail:
          "Typically discussed for proximal or linitis-type disease when a remnant would not be honest. Reconstruction is usually Roux-en-Y esophagojejunostomy. Longer sitting, different leak map. No separate GAF sheet.",
      },
      {
        name: "Proximal gastrectomy",
        relative: "Upper stomach removed in selected cases",
        detail:
          "Sometimes considered for selected proximal tumours when the team judges a remnant can be kept. Reconstruction is more specialised than a distal join. Suitability is a clinical decision, not a product option.",
      },
      {
        name: "Laparoscopic gastrectomy",
        relative: "Same oncological jobs through ports when offered",
        detail:
          "Theatre and stapler costs can sit toward the upper part of the band. Availability is a diary question. Not automatically better, and not priced as a separate GAF sheet.",
      },
      {
        name: "Robotic-assisted gastrectomy",
        relative: "Where offered — different resource envelope",
        detail:
          "Not universally available and not priced as a separate GAF gastrectomy sheet. Ask whether it is actually offered for your tumour that week.",
      },
      {
        name: "Esophagectomy when the junction tumour is oesophageal-sided",
        relative: "Different operation — neighbouring sheet",
        detail:
          "Some gastro-oesophageal junction cancers are treated as oesophageal resections rather than gastric ones. That is a different cost sheet, not a gastrectomy add-on.",
        procedure: "Esophagectomy",
      },
    ],
  },

  overview: {
    what: [
      "Gastrectomy is surgical removal of part or all of the stomach, the muscular pouch that receives food from the oesophagus and starts digestion. In cancer care it is done to take out the tumour with a margin of stomach and, where indicated, regional lymph nodes, then restore a path from oesophagus to small bowel.",
      "Partial or distal gastrectomy leaves a remnant of stomach. Subtotal gastrectomy leaves a smaller remnant. Total gastrectomy removes the entire stomach; the oesophagus is then joined to jejunum. Proximal gastrectomy, when used, removes the upper stomach in selected cases. Reconstruction — gastroduodenostomy, gastrojejunostomy or esophagojejunostomy, often Roux-en-Y after total resection — is why the join, not only the incision, dominates recovery.",
      "Lymph-node assessment is part of staging and local control when the protocol calls for it. D1 and D2 dissections are different sittings. Multidisciplinary care — surgical oncology, gastroenterology, medical oncology, radiation oncology, radiology, pathology, nutrition, anaesthesia and critical care — frames whether surgery is even the next step.",
      "The exact operation depends on tumour location, size, stage, anatomy, previous treatment and the surgeon's assessment. GAF Healthcare does not decide on this page whether resection is appropriate. Treatment plans are determined by qualified doctors after evaluation. Quotes may change if the surgical plan changes.",
    ],
    who: [
      "Gastrectomy may be considered for selected gastric cancers and selected gastro-oesophageal junction cancers when staging suggests resection can be completed with acceptable risk, and for other stomach conditions where the treating team judges removal necessary. It is not the first or only treatment for every stomach cancer. Some patients are treated with chemotherapy, chemoradiation, endoscopic therapy, or systemic therapy without resection.",
      "Not every gastric cancer patient requires gastrectomy. Early lesions may be discussed for endoscopic resection. Metastatic disease is often a systemic-therapy conversation first. Fitness, nutrition and whether neoadjuvant chemotherapy has already been given all feed the decision.",
      "This page does not diagnose and does not recommend gastrectomy, endoscopic therapy or non-operative care for an individual patient. Eligibility depends on cancer type, stage, previous treatment and clinical assessment.",
    ],
    how: [
      "Pre-operative assessment confirms staging, cardiopulmonary fitness, nutrition and the planned reconstruction. Anaesthesia is general.",
      "Surgical access may be an open incision or laparoscopic or robotic ports when the team offers them. Part or all of the stomach is removed. Lymph nodes are taken according to the protocol. The remaining stomach, or the oesophagus after total gastrectomy, is joined to duodenum or jejunum.",
      "You wake on a ward or in high-dependency care. Drains, a feeding jejunostomy in some protocols, and a staged return to oral intake are common. Pathology of the specimen arrives days later and feeds the next oncology conversation. Exact steps differ by approach; this page does not describe graphic operative detail.",
    ],
    variations: [
      {
        label: "Gastroduodenostomy (Billroth I)",
        detail:
          "Remaining stomach joined to duodenum after a distal resection, when anatomy allows. A different leak map from a Roux loop.",
      },
      {
        label: "Gastrojejunostomy (Billroth II or Roux)",
        detail:
          "Remaining stomach joined to jejunum. Used when a duodenal join is not honest. Should be named on the letter if planned.",
      },
      {
        label: "Esophagojejunostomy after total gastrectomy",
        detail:
          "Usually Roux-en-Y. Adds a join above the diaphragm's neighbour — the oesophagus — which is why leak monitoring is not optional branding.",
      },
      {
        label: "Open versus laparoscopic versus robotic access",
        detail:
          "Ports instead of, or in addition to, an open incision when the team offers it. Oncological goals remain resection and reconstruction. Availability is not implied by a brand name. None is universally better.",
      },
    ],
    preparation: [
      "Expect endoscopy with biopsy, CT of chest and abdomen, and PET-CT when indicated. Bloods, nutrition review and anaesthetic assessment come next. Home investigations can often be reviewed rather than repeated.",
      "If neoadjuvant chemotherapy is already under way, bring the protocol, dates and the latest imaging. Weight trend and swallowing history belong in the file.",
      "Arrive with enough days before theatre for anaesthetic review and, if needed, feeding optimisation. Do not book a same-week international flight after a long-haul landing into a two-to-five-hour resection.",
    ],
    recovery: [
      "Hospital stay is typically [STAY]. Early days watch drains, the anastomosis and nutrition. Oral intake is delayed until the team is content; feeding often starts with clear fluids under clinical guidance. This page does not set a diet or a discharge date.",
      "Anastomotic leak, bleeding, delayed gastric emptying after a distal resection, dumping-type symptoms after a total gastrectomy, and respiratory complications are among the problems that extend stay. Complication risk varies with fitness, tumour, prior treatment and surgical complexity. Individual percentages are not published here.",
      "Pathology review decides adjuvant treatment. International patients often need further hotel days after discharge before a long-haul flight. Ranges on this page are not promises of recovery time. Individual recovery varies.",
    ],
  },

  fullPathway: {
    intro: [
      "The surgical estimate is only one line in a medical-travel budget. Procedure cost is not total medical travel cost. Staging, neoadjuvant therapy, extra ICU, hotel after discharge, flights and a companion who can stay are the rest of the trip.",
      "Ask the coordinator to quote each stage separately. Do not invent flight or hotel prices from this page. Add your own numbers: surgery + quoted stay including named ICU nights + staging tests + drugs/radiation if in India + flights + visa + hotel nights × rate + local transport + attendant costs + a contingency for extra nights or leak days.",
    ],
    stages: [
      {
        label: "Staging and cardiopulmonary work-up",
        detail: "Endoscopy, biopsy, CT, PET-CT where indicated, bloods, nutrition. Often extra if done in India.",
      },
      {
        label: "Neoadjuvant treatment, if used",
        detail: "Chemotherapy before surgery. Neighbouring cost sheet. Can add weeks in the city.",
      },
      {
        label: "The operation",
        detail: "Resection, reconstruction, anaesthesia, ICU as quoted, [STAY] and pathology. This is the [INDIA_COST] line when the letter matches that scope.",
      },
      {
        label: "Extra ICU, leak care, nutrition",
        detail: "Beyond the quoted nights. Ask what happens if hospitalization is extended.",
      },
      {
        label: "Adjuvant oncology",
        detail: "Further drugs or, in selected settings, radiation if pathology and the MDT advise it.",
      },
      {
        label: "Flights and visa",
        detail: "Patient and attendant. Medical visa duration should cover a possible extra week. Issuance is not guaranteed.",
      },
      {
        label: "Accommodation after discharge",
        detail: "Hotel or apartment near the campus until the surgeon is content you can fly.",
      },
      {
        label: "Local transport and attendant expenses",
        detail: "Airport transfers, clinic runs, food, lost work. Pair the hotel to the hospital, not the airport.",
      },
    ],
  },

  journey: [
    { label: "Submit medical records", detail: "Endoscopy report, biopsy, CT/PET-CT, a note on weight and swallowing, and a medicine list." },
    { label: "Imaging and pathology review", detail: "A surgeon who resects stomach reads the actual films and histology, not a coordinator's paraphrase." },
    { label: "Specialist assessment", detail: "On camera: whether resection, neoadjuvant treatment first, or a non-operative path is the honest next step." },
    { label: "Multidisciplinary planning", detail: "Where appropriate, surgical, medical and radiation oncology agree sequence before a date is offered." },
    { label: "Preliminary treatment plan and cost estimate", detail: "An itemised surgical letter. Extent, reconstruction, ICU nights, drugs and radiation quoted separately if in view." },
    { label: "Hospital selection", detail: "Compare the surgeon you met, whether the campus runs gastric-cancer lists, and how long a companion can stay in that city." },
    { label: "Travel planning", detail: "A hospital invitation typically supports a medical visa. Write duration for [STAY] plus hotel recovery. Visa issuance is not guaranteed." },
    { label: "Hospital admission", detail: "Usually a day or two before theatre after in-person examination and any missing tests." },
    { label: "Surgery", detail: "Two to five hours depending on extent. Combined pancreatic or splenic resection, if needed, lengthens the sitting." },
    { label: "Postoperative recovery", detail: "Ward or high-dependency across [STAY]. Extra nights are a clinical decision, not a package failure." },
    { label: "Pathology and further treatment", detail: "Specimen results feed adjuvant planning. Do not fly before that conversation if further treatment in India is likely." },
    { label: "Follow-up and return-home planning", detail: "Operative note, pathology, feeding plan and a written handover. Fly when the named surgeon is content." },
  ],

  documents: [
    "Upper endoscopy report and images, plus the biopsy histopathology",
    "CT chest and abdomen, and PET-CT if already done",
    "Endoscopic ultrasound or staging laparoscopy notes if performed",
    "Neoadjuvant chemotherapy summary if treatment has started",
    "Weight trend, swallowing history, and current nutrition",
    "Cardiac and pulmonary test results, if available",
    "Current medication list, allergies, and smoking/alcohol history",
    "Passport, and a hospital invitation letter for the medical visa application",
  ],

  cities: gastrectomyCities,

  destinations: [
    {
      country: "India",
      stay: "[STAY]",
      positioning: "Catalog planning range",
      context:
        "Named gastric-cancer surgery listings can be met on camera before travel. Listed consultants currently sit in Delhi NCR, Mumbai, Chennai and Hyderabad; Bengaluru is matched after records review.",
    },
    {
      country: "Turkey",
      costLevel: [1, 1.8],
      stay: "7–14 nights",
      positioning: "Packaged medical-travel market",
      context: "Verify whether ICU nights, leak management, PET-CT, neoadjuvant drugs and feeding support are inside the bundle.",
    },
    {
      country: "Thailand",
      costLevel: [1.2, 2.2],
      stay: "7–14 nights",
      positioning: "Private-hospital tourism",
      context: "Established international desks; ICU extras and oncology drugs can sit well above India.",
    },
    {
      country: "United Arab Emirates",
      costLevel: [2, 3.4],
      stay: "7–14 nights",
      positioning: "Regional premium private care",
      context: "Short flights from much of Africa and West Asia; private oncology pricing is closer to Western self-pay.",
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
      positioning: "Certified European upper-GI units",
      context: "Structured MDT process and longer inpatient norms; self-pay deposits are typical for visitors.",
    },
    {
      country: "United Kingdom",
      costLevel: [1.8, 3.4],
      stay: "7–14 nights",
      positioning: "Private self-pay (NHS generally not for visitors)",
      context: "NHS care is not available to most overseas visitors. Private self-pay applies; neoadjuvant treatment is quoted separately.",
    },
    {
      country: "United States",
      stay: "6–12 nights",
      positioning: "Highest self-pay outlier",
      context: "Facility, surgeon, ICU, pathology and later oncology bills often arrive separately. Compare against actual insurance liability.",
    },
  ],

  destinationIntro: [
    "The table below is a planning comparison for gastrectomy as a surgical episode, not a claim that every country uses the same extent or bundles ICU the same way. India and United States figures come from the GAF Healthcare catalog. Other markets are modelled from the India midpoint using relative private-care cost levels, and are labelled as indicative planning estimates — not hospital quotations.",
    "India is often less expensive for a self-funding patient. That is not the same as 'always cheapest' or 'best'. Insurance coverage at home can reverse the arithmetic overnight. Hospital, surgeon, type of gastrectomy, surgical approach, cancer complexity, reconstruction, ICU, length of stay, oncology treatment and what the package includes still decide the real bill in every country.",
  ],

  destinationNote:
    "International treatment costs vary by hospital, surgeon, type of gastrectomy, surgical approach, cancer complexity, reconstruction, length of stay, ICU requirements, oncology treatment and what is included in the package. These figures are intended for preliminary comparison only and are not final quotations. Figures other than India and the United States are modelled planning estimates. They are not GAF quotations and not competitor quotes reproduced as ours.",

  cityIntro: [
    "City names below are working filter URLs — the same destination, city, specialty and procedure keys the rest of the site already uses. Open Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad for the city overlay and the filtered doctor and hospital cards.",
    "We do not invent a different surgical tariff for each metro. The approximate cost column uses the India planning band of [INDIA_COST] unless a researched city figure exists. What does change is the named consultant list, hospital geography, airport access and how expensive a two-week companion stay actually feels.",
  ],

  whyIndia: [
    "International patients consider India for gastrectomy when they are self-funding a gastric resection, when they want a named surgical oncologist before they fly, and when they need staging, neoadjuvant treatment if used, and leak-aware postoperative care in the same city.",
    "Cost is the most visible reason. The catalog range [INDIA_COST] sits well below typical US cash-pay of [US_COST], because theatre, ward and consultant time are priced on a different cost base — not because the operation is a lesser product by definition. Several listed metros can hold an MDT conversation in one week. English is the working language of most international desks. Laparoscopic and robotic access are offered in some listed houses; availability is a diary question.",
    "None of that means India is the right country for every patient, and none of it is a claim of 'best surgeons in the world', guaranteed leak-free recovery or 'cheapest in the world'. Someone whose insurance covers the pathway at home, who cannot stay for two weeks, or whose staging shows resection is not honest, may be better treated locally.",
  ],

  whyCostDiffers: [
    "The figure on this page is a planning range. The figure on a hospital letter is an estimate written against a named extent, a named surgeon, a stated number of nights, and a reconstruction plan. Those two documents are not supposed to match to the dollar.",
    "The procedure name alone does not define the surgical plan. Cost may change because of partial versus total gastrectomy, open versus minimally invasive or robotic access, tumour location, stage, reconstruction, lymph-node fields, neoadjuvant treatment, ICU, pathology, extra nights and complications.",
    "If two hospitals quote different numbers, read the line items before you assume one is overcharging. One letter may include named high-dependency nights and a jejunostomy; the other may bill them later. One may be a flagship campus; the other a satellite. Higher cost is not a measure of better treatment.",
  ],

  planningClose: [
    "Gastrectomy in India is typically planned in the [INDIA_COST] band for the resection, reconstruction and quoted inpatient stay, against [US_COST] self-pay in the United States. The variables that actually move that band are extent, reconstruction, approach, campus tier, the named surgeon and whether chemotherapy or radiation is completed in the same trip.",
    "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad each have listed campuses for this surgical-oncology pathway. Named catalog consultants for gastric cancer surgery currently sit in Delhi NCR, Mumbai, Chennai and Hyderabad; Bengaluru is matched after records review. Doctor and hospital cards on this page link only to profiles that already exist in the catalog.",
    "A personalized quotation, written after records review, is the document you should travel on. Cost ranges on this page are intended for preliminary planning and comparison only. Final treatment costs vary according to the patient's clinical condition, treatment plan, hospital, surgeon, surgical approach, length of stay and other factors. A personalized quotation should be obtained before making treatment or travel decisions.",
  ],

  questionsToAsk: [
    "Is the surgeon's fee included, and is the person on this call the person in theatre?",
    "Is this a partial, subtotal, total, proximal or distal gastrectomy — and is that named on the letter?",
    "How is the gut reconstructed — gastroduodenostomy, gastrojejunostomy or Roux-en-Y esophagojejunostomy?",
    "Is the approach open, laparoscopic or robotic-assisted, and is that named?",
    "Is lymph-node dissection included, and to what extent?",
    "How many ICU or high-dependency nights are included, and what happens if I need more?",
    "Are operating-room staplers and consumables included?",
    "Is anaesthesia included for a two-to-five-hour case?",
    "Are staging endoscopy, CT, PET-CT and cardiopulmonary tests included?",
    "Is pathology of the specimen included? HER2 and other molecular tests?",
    "Are inpatient medicines and feeding support included? What about discharge formula?",
    "How many hospital nights and which room category?",
    "What happens if an anastomotic leak or extra hospitalization occurs?",
    "Is neoadjuvant or adjuvant chemotherapy included? Radiation?",
    "Is follow-up before I fly included?",
  ],

  faqs: [
    {
      q: "What is the cost of gastrectomy in India?",
      a: "Plan against [INDIA_COST] for the resection, reconstruction, anaesthesia, quoted stay of [STAY] and specimen pathology. Typical US self-pay is [US_COST]. The final figure is an itemised hospital estimate after a surgeon reviews endoscopy and staging. Neoadjuvant drugs and extra leak days are usually separate.",
    },
    {
      q: "What is the cost of gastrectomy in Delhi NCR?",
      a: "Delhi NCR inherits the India planning range of [INDIA_COST]. There is no separate verified NCR tariff on this site. Campus tier, extent and ICU course move the letter more than the city name.",
    },
    {
      q: "How much does stomach cancer surgery cost in India?",
      a: "When the operation is gastrectomy, plan against [INDIA_COST] for the surgical episode. Stomach cancer treatment can also include chemotherapy, radiation in selected settings, endoscopy and surveillance — neighbouring quotes unless a letter combines them.",
    },
    {
      q: "What is included in the cost of gastrectomy?",
      a: "A typical surgical estimate covers the named surgeon, anaesthesia, theatre, quoted ward or ICU nights, routine inpatient medicines and specimen pathology. Confirm staplers, feeds, extra ICU, PET-CT and drugs.",
    },
    {
      q: "What is the difference between partial and total gastrectomy?",
      a: "Partial or distal gastrectomy removes part of the stomach and leaves a remnant. Total gastrectomy removes the entire stomach and joins oesophagus to jejunum. Extent follows tumour location and staging. Neither is universally better.",
    },
    {
      q: "Does minimally invasive gastrectomy cost more?",
      a: "It can, because of theatre time and consumables, but GAF Healthcare does not publish a separate laparoscopic-gastrectomy tariff. Ask whether laparoscopic access is actually offered for your tumour and how that changes the itemised letter.",
    },
    {
      q: "Does robotic gastrectomy cost more?",
      a: "Robotic assistance, where offered, is a different resource envelope. There is no separate GAF robotic-gastrectomy price. Do not treat a neighbouring robotics sheet as this operation's quote.",
    },
    {
      q: "What is the hospital stay after gastrectomy?",
      a: "Typically [STAY] on this sheet. Leaks, delayed emptying or feeding problems extend that. This page does not promise a discharge date.",
    },
    {
      q: "How long should an international patient stay in India?",
      a: "Plan the inpatient [STAY] plus further hotel days until the named surgeon is content you can fly — often around two to three weeks in country for an uncomplicated course, longer if neoadjuvant treatment or a leak occurs.",
    },
    {
      q: "What tests are required before gastrectomy?",
      a: "The actual work-up depends on the patient and plan. Commonly: endoscopy with biopsy, CT, PET-CT where indicated, bloods, and nutrition and anaesthesia assessment. Home tests can often be reviewed rather than repeated.",
    },
    {
      q: "Does gastrectomy require chemotherapy?",
      a: "Sometimes, before or after surgery, depending on type, stage and MDT assessment. Those treatments are separate estimates. This page does not prescribe a sequence.",
    },
    {
      q: "Does gastrectomy require radiation therapy?",
      a: "In selected settings, and not for every gastric cancer. Radiation is a neighbouring quote. Suitability is a clinical decision after staging and pathology.",
    },
    {
      q: "How do I choose a gastrectomy surgeon?",
      a: "Use listed consultants whose catalog procedures include gastric cancer surgery, compare training and campus on the profile, and insist on speaking to the person who would operate. Placement is not a league table.",
    },
    {
      q: "How do I choose a hospital for stomach cancer surgery?",
      a: "Start with the surgeon you can meet on camera, then the campus where that surgeon actually operates, whether ICU has managed anastomotic leaks, and whether chemotherapy — if needed — can stay in the same city. There is no ranking here.",
    },
    {
      q: "What costs may be excluded from a gastrectomy package?",
      a: "Often: PET-CT, endoscopy, neoadjuvant drugs, radiation, extra ICU, leak management, discharge feeds, molecular tests, hotel, flights and visa-related expenses. Read the exclusions as carefully as the inclusions.",
    },
    {
      q: "How do I compare gastrectomy quotations?",
      a: "Line by line: surgeon, extent (partial versus total), reconstruction, approach, ICU nights, staplers, pathology, feeds, extra-night and leak policy, PET-CT, chemotherapy and radiation. Same procedure name is not the same surgical plan.",
    },
  ],

  doctorHeading: "Doctors to consider for gastrectomy in India",
  doctorIntro:
    "These are consultants listed on GAF Healthcare whose catalog procedures include gastric cancer surgery. Profiles show training, campus and procedures as held in the catalog. There are no rankings here, and no fee is paid for placement. Named listings currently sit in Delhi NCR, Mumbai, Chennai and Hyderabad; Bengaluru is matched after records review.",
  hospitalHeading: "Hospitals to consider for gastrectomy in India",
  hospitalIntro:
    "Campuses on GAF Healthcare where this surgical-oncology pathway is listed, with accreditation as published by the hospital. Listing with the procedure family is not a claim of gastrectomy volume or a ranking. Choose on the surgeon you met on camera, whether the house runs gastric-cancer lists, and whether staging and neoadjuvant treatment can stay in the same city — not on a brand slogan.",

  relatedProcedures: [
    "Esophagectomy",
    "Whipple Procedure",
    "Chemotherapy",
    "Neoadjuvant Chemotherapy",
    "Intensity-Modulated Radiotherapy (IMRT)",
  ],

  relatedBlogs: [
    { href: "/costs?specialty=Surgical+Oncology", label: "surgical oncology costs in India" },
    { href: "/costs?specialty=Medical+Oncology", label: "medical oncology costs in India" },
    { href: "/costs?specialty=Radiation+Oncology", label: "radiation oncology costs in India" },
    { href: "/costs?specialty=Gastroenterology", label: "gastroenterology costs in India" },
    { href: "/costs?specialty=Surgical+Gastroenterology", label: "surgical gastroenterology costs in India" },
    { href: "/costs/esophagectomy", label: "esophagectomy cost in India" },
    { href: "/doctors?destination=India&procedure=Gastrectomy", label: "gastrectomy surgeons in India" },
    { href: "/hospitals?destination=India&procedure=Gastrectomy", label: "gastrectomy hospitals in India" },
  ],

  figures: [
    {
      after: "overview",
      src: "/costs/gastrectomy-procedure-overview.webp",
      alt: "Medical illustration showing the main steps of gastrectomy from removal of diseased stomach tissue to digestive tract reconstruction",
      caption:
        "Resection removes the diseased stomach. Reconstruction restores a food passage. Lymph-node assessment, when indicated, is part of staging — not a separate product.",
      fit: "contain",
    },
    {
      after: "how",
      src: "/costs/types-of-gastrectomy.webp",
      alt: "Illustration comparing partial, subtotal and total gastrectomy procedures",
      caption:
        "Partial, subtotal and total gastrectomy, and minimally invasive access, are clinical choices. None is universally better. Technique follows tumour location and the operating team's assessment.",
      fit: "contain",
    },
    {
      after: "journey",
      src: "/costs/gastrectomy-patient-journey-india.webp",
      alt: "Illustration of the gastrectomy treatment journey for international patients travelling to India",
      caption:
        "Records, specialist review and a written estimate come before a ticket. ICU extras, nutrition, drugs and travel sit outside the surgical range unless named.",
      fit: "contain",
    },
  ],
};
