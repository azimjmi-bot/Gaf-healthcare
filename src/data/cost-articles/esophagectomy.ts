import type { CostArticle } from "./types";
import { esophagectomyCities } from "./esophagectomy-cities";

export const esophagectomy: CostArticle = {
  procedure: "Esophagectomy",
  shortName: "esophagectomy",
  briefName: "Esophagectomy",
  duration: "approximately 4–8 hours",
  recoveryGlance: "Inpatient [STAY], then hotel step-down. Varies by patient.",
  slug: "esophagectomy",
  lastUpdated: "2026-09-10",
  seoTitle: "Esophagectomy Cost in India: Prices, Cities & Hospitals",
  seoDescription:
    "Esophagectomy cost in India is typically [INDIA_COST] for the operation and a stay of [STAY], against [US_COST] self-pay in the US. Compare cities, Ivor Lewis versus McKeown versus transhiatal as clinical choices, ICU and leak monitoring, listed surgeons and hospitals, and how to request a personalized estimate.",
  heading: "Esophagectomy Cost in India",
  heroLede:
    "Esophagectomy is removal of part or most of the oesophagus — most often for selected oesophageal or gastro-oesophageal junction cancers — followed by reconstruction so food can still pass from mouth to stomach or conduit. It is a high-acuity cancer operation, not a short endoscopic procedure. The exact resection, the anastomosis site, whether the chest is opened, and whether the approach is open or minimally invasive follow tumour location, stage, prior chemoradiation and the operating team's assessment. None of those choices is a menu upgrade. Cost in India sits in a wide planning band because theatre time, ICU, leak monitoring and a 10-to-18-night stay are not the same letter as a two-night biopsy. International patients should compare the complete treatment package: staging, neoadjuvant drugs or radiation if used, the resection, ICU, nutrition, pathology, possible further oncology, flights and a companion who can stay for weeks — not only the surgery headline.",
  overviewHeading: "What is an esophagectomy?",

  answer: [
    "Esophagectomy cost in India typically ranges from [INDIA_COST] for the resection, reconstruction, anaesthesia, ICU where clinically required, histopathology and a hospital stay of [STAY]. Typical US self-pay for a comparable surgical episode is [US_COST]. Theatre time is usually about four to eight hours depending on approach and reconstruction.",
    "That figure is a planning range, not a hospital quotation. It usually covers the named surgeon, operating room, anaesthesia, the quoted room category and nights, routine inpatient medicines and specimen pathology. ICU nights inside the quoted stay are often inside; extra ICU days, PET-CT, neoadjuvant chemotherapy, radiotherapy, feeding-tube supplies after discharge and management of an anastomotic leak are frequently not. Minimally invasive or robotic-assisted access, when offered, should be named — there is no separate GAF price sheet for those techniques.",
    "What moves the number most is approach (Ivor Lewis, McKeown, transhiatal, minimally invasive), reconstruction, whether a leak or pneumonia extends ICU, campus tier, the named consultant, and whether chemotherapy or radiation sits in the same trip. International patients should budget the weeks around the knife — not only the theatre block.",
  ],

  indiaCost: [
    "There is no single esophagectomy price in India. The [INDIA_COST] band is a planning range for a high-acuity oesophageal resection — theatre, anaesthesia, the named surgeon's fee, the quoted room, routine inpatient drugs, ICU as written into the estimate, and histopathology. The lower end typically reflects a straightforward transhiatal or Ivor Lewis case at a mid-tier NABH campus with an uncomplicated ICU course toward the shorter end of [STAY]. The upper end typically reflects a flagship JCI campus, a senior upper-GI or thoracic surgical oncologist, a three-field McKeown or a long minimally invasive sitting, a private room, and a stay toward 18 nights.",
    "Treat that band as an order of magnitude until a surgeon who actually resects oesophagus has seen endoscopy, staging CT or PET-CT, biopsy, and whether neoadjuvant treatment has already been given. Same procedure name is not the same surgical plan. Ivor Lewis, McKeown, transhiatal, minimally invasive and robotic-assisted access are different theatres. A letter written for one is not a letter written for another.",
    "City is a weaker driver than families expect. ICU policy, leak-management experience, campus tier and whether nutrition support is bundled move the bill more than the metro name. An itemised estimate can only be written once a surgeon has read the file. GAF Healthcare matches centres that already run this list, with ICU that has seen anastomotic leaks — that is a matching rule, not a ranking of hospitals.",
  ],

  costComponents: [
    {
      label: "Surgeon fee and surgical team",
      detail:
        "Usually bundled for the named surgical oncologist or surgical gastroenterologist. Confirm who is in theatre, and whether a thoracic colleague is billed separately on a two-field or three-field case.",
    },
    {
      label: "Hospital and operating-room charges",
      detail:
        "A long theatre block, staplers, conduits, drains and recovery. Minimally invasive or robotic access, when used, lengthens or reprices this block. Campus tier moves this line more than the city name.",
    },
    {
      label: "Anaesthesia",
      detail:
        "Anaesthetist fee and drugs for a case lasting typically four to eight hours, often with one-lung ventilation if the chest is opened. Cardiopulmonary comorbidity may add a pre-operative clearance billed outside.",
    },
    {
      label: "ICU and critical-care monitoring",
      detail:
        "Early ICU or high-dependency care is usual after oesophageal resection. Nights inside the quoted stay may be bundled; extra ICU days after a leak or pneumonia are typically extra. Ask how many ICU nights the letter actually prices.",
    },
    {
      label: "Diagnostic investigations",
      detail:
        "Standard bloods and ECG are often inside the admission. Staging endoscopy, CT, PET-CT, pulmonary function tests and cardiac clearance are frequently extra if not already done at home.",
    },
    {
      label: "Pathology",
      detail:
        "Processing of the specimen and lymph nodes. Immunohistochemistry and molecular tests, when ordered, are often billed later.",
    },
    {
      label: "Medicines, nutrition and feeding",
      detail:
        "Inpatient analgesia, antibiotics, DVT prophylaxis and routine drugs during the quoted stay. Jejunostomy feeds, parenteral nutrition and discharge formula are frequently extra. This page does not set a diet.",
    },
    {
      label: "Room charges and nursing",
      detail:
        "Written against a room category and a stated number of nights — typically [STAY]. Step-down from ICU to ward should be named. Companion beds change the nightly rate.",
    },
    {
      label: "Postoperative care and follow-up",
      detail:
        "Inpatient leak checks, drain management and the first clinic review before you fly are commonly included. Later endoscopy, oncology visits and rehabilitation are typically separate.",
    },
  ],

  whyQuotesDiffer:
    "Two honest estimates can differ because the operations are not the same. Ivor Lewis is not McKeown. Open is not minimally invasive. A gastric conduit is not a colon interposition. ICU nights inside the quote are not extra leak days. Campus tier and the named surgeon move the bill more than the city on the boarding pass. Higher cost is not a measure of better care.",

  costDrivers: [
    {
      label: "Hospital category and campus tier",
      detail: "Flagship versus satellite units sit at different price levels. Ask which address, and which ICU, the letter is written against.",
    },
    {
      label: "Surgeon and team",
      detail:
        "The estimate should name the consultant. Upper-GI surgical oncology and thoracic lists are billed differently. That is not a ranking.",
    },
    {
      label: "City and companion logistics",
      detail:
        "Surgical fees cluster more tightly across the five metros than hotel bills for a two-to-three-week stay. City choice matters most after discharge.",
    },
    {
      label: "Open versus minimally invasive surgery",
      detail:
        "Laparoscopic or thoracoscopic access, when offered, changes theatre time and consumables. No separate GAF sheet — ask whether MIE is actually available that week.",
    },
    {
      label: "Robotic assistance",
      detail:
        "Robotic-assisted esophagectomy, where clinically offered, is a different resource envelope. There is no separate GAF robotic-esophagectomy tariff. Do not assume a thoracic-robotics brochure applies.",
    },
    {
      label: "Tumour location and disease complexity",
      detail:
        "Mid-oesophageal tumours, junction tumours and prior chemoradiation change fields, anastomosis site and leak risk. Complexity is why two patients with the same diagnosis receive different letters.",
    },
    {
      label: "Reconstruction technique",
      detail:
        "A gastric pull-up is the usual conduit when anatomy allows. Colon or jejunal reconstruction, when required, is a longer operation and a different letter.",
    },
    {
      label: "Lymph-node dissection",
      detail:
        "Two-field and three-field lymphadenectomy are not the same sitting. Extent follows staging and the team's protocol, not a price list.",
    },
    {
      label: "Preoperative treatment",
      detail:
        "Neoadjuvant chemotherapy or chemoradiation is a neighbouring cost sheet and can change fitness and timing. It is not inside [INDIA_COST] unless named.",
    },
    {
      label: "ICU requirement and length of stay",
      detail:
        "Packages are written for [STAY], including some ICU. Extra nights after a leak, arrhythmia or pneumonia are usually billed fresh.",
    },
    {
      label: "Complications",
      detail:
        "Anastomotic leak, chyle leak, recurrent-nerve injury and re-intubation are new events unless the contract says otherwise.",
    },
    {
      label: "Additional cancer treatment",
      detail: "Adjuvant drugs, radiation and later endoscopy sit outside the surgical estimate.",
    },
  ],

  inclusions: [
    {
      label: "Consultation that leads into the admission",
      detail: "The in-person pre-operative review with the named surgeon, where bundled. Remote review before travel is arranged separately.",
    },
    {
      label: "Surgery by the named consultant",
      detail: "The resection and reconstruction as written on the estimate — not an unnamed robotic sitting or a colon interposition unless the letter says so.",
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
      detail: "Processing of the resected oesophagus and sampled nodes, where histopathology is bundled.",
    },
    {
      label: "Medicines during admission",
      detail: "Analgesia, antibiotics and routine drugs administered during the quoted stay.",
    },
  ],

  exclusions: [
    {
      label: "Advanced staging",
      detail: "PET-CT, staging endoscopy, endoscopic ultrasound and pulmonary function tests are frequently extra when ordered in India.",
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
      detail: "Swallow therapy, physiotherapy after discharge and anastomotic dilatation if needed are typically separate visits.",
    },
    {
      label: "Travel, accommodation and visa-related expenses",
      detail: "Flights, medical visa fees, hotel after discharge, local transport and companion living costs sit outside every hospital estimate.",
    },
  ],

  approachComparison: {
    heading: "Types of esophagectomy and how they can affect cost",
    intro: [
      "Approach is chosen to clear the tumour and reconstruct a usable food passage, not to sell a named operation. GAF Healthcare publishes a planning range only where a cost sheet already exists. The rows below describe relative complexity. They are not a menu of add-on prices, and none is universally better.",
      "Selection depends on tumour location, stage, prior treatment, anatomy and the reconstructive plan. This page does not recommend Ivor Lewis, McKeown, transhiatal, minimally invasive or robotic-assisted surgery for an individual patient.",
    ],
    rows: [
      {
        name: "Ivor Lewis esophagectomy",
        relative: "Two-field: abdomen and right chest",
        detail:
          "Abdominal mobilisation of the conduit, thoracic resection, anastomosis usually in the chest. Common for mid and lower-third tumours when the team uses this sequence. No separate GAF sheet — relative complexity within [INDIA_COST].",
      },
      {
        name: "McKeown esophagectomy",
        relative: "Three-field: abdomen, chest and neck",
        detail:
          "Anastomosis typically in the neck. Often discussed for more proximal tumours. Longer sitting and a neck wound as well as chest and abdomen. No separate GAF price.",
      },
      {
        name: "Transhiatal esophagectomy",
        relative: "Abdomen and neck — no routine thoracotomy",
        detail:
          "Resection through the hiatus with a neck anastomosis. Avoids a planned thoracotomy when the team judges it appropriate. Different mediastinal exposure, not a cheaper 'minor' version. No separate GAF sheet.",
      },
      {
        name: "Minimally invasive esophagectomy (MIE)",
        relative: "Laparoscopic and/or thoracoscopic access",
        detail:
          "Same oncological jobs through ports when anatomy and the team allow. Theatre and stapler costs can sit toward the upper part of the band. Availability is a diary question, not a brochure guarantee.",
      },
      {
        name: "Robotic-assisted esophagectomy",
        relative: "Where offered — different resource envelope",
        detail:
          "Robotic access is not universally available and is not priced as a separate GAF esophagectomy sheet. Ask whether it is actually offered for your tumour that week. Do not use a neighbouring thoracic-robotics tariff as a substitute.",
      },
      {
        name: "Gastrectomy when the junction tumour is gastric-sided",
        relative: "Different operation — neighbouring sheet",
        detail:
          "Some gastro-oesophageal junction cancers are treated as gastric resections rather than oesophageal ones. That is a different cost sheet, not an esophagectomy add-on.",
        procedure: "Gastrectomy",
      },
    ],
  },

  overview: {
    what: [
      "Esophagectomy is surgical removal of part or most of the oesophagus, the muscular tube that carries food from the throat to the stomach. In cancer care it is done to take out the tumour with a margin of oesophagus and, where indicated, regional lymph nodes, then restore a path for swallowing.",
      "Reconstruction usually uses the stomach as a conduit pulled up to replace the resected segment. When the stomach cannot be used, colon or jejunum may be considered. The join — the anastomosis — sits in the chest or the neck depending on the approach. That join is why leak monitoring dominates the first postoperative week.",
      "Lymph-node assessment is part of staging and local control when the protocol calls for it. Two-field and three-field dissections are different sittings. Multidisciplinary care — surgical oncology, medical oncology, radiation oncology, gastroenterology, radiology, pathology, nutrition and critical care — frames whether surgery is even the next step.",
      "The exact operation depends on tumour location, stage, anatomy, treatment history including neoadjuvant chemotherapy or radiotherapy, and the surgeon's assessment. GAF Healthcare does not decide on this page whether resection is appropriate. Treatment plans are determined by qualified doctors after evaluation. Quotes may change if the surgical plan changes.",
    ],
    who: [
      "Esophagectomy may be considered for selected oesophageal cancers and selected gastro-oesophageal junction cancers when staging suggests resection can be completed with acceptable risk, and for other conditions where the treating team judges oesophageal resection necessary. It is not the first or only treatment for every oesophageal cancer. Some patients are treated with chemoradiation, endoscopic therapy, or systemic therapy without resection.",
      "Fitness matters as much as the scan. Heart and lung function, nutrition, prior radiation to the chest, and whether the patient can recover from a leak all feed the decision. Neoadjuvant treatment, when used, is sequenced before surgery and is a separate estimate.",
      "This page does not diagnose and does not recommend esophagectomy, endoscopic therapy or non-operative care for an individual patient. Eligibility depends on cancer type, stage, previous treatment and clinical assessment.",
    ],
    how: [
      "Pre-operative assessment confirms staging, cardiopulmonary fitness, nutrition and the planned fields. Anaesthesia is general, often with one-lung ventilation if the chest is entered.",
      "Surgical access follows the named approach: abdomen and right chest (Ivor Lewis), abdomen, chest and neck (McKeown), or abdomen and neck (transhiatal). The diseased oesophagus is removed. Lymph nodes are taken according to the protocol. A conduit is formed, usually from stomach, and joined to the remaining oesophagus.",
      "You wake in ICU or high-dependency care. Drains, a feeding jejunostomy in many protocols, and swallow studies before oral intake are common. Pathology of the specimen arrives days later and feeds the next oncology conversation. Exact steps differ by approach; this page does not describe graphic operative detail.",
    ],
    variations: [
      {
        label: "Gastric conduit reconstruction",
        detail:
          "The usual method when the stomach can be mobilised as a tube. Adds conduit ischaemia and leak risk to the conversation, which is why ICU monitoring is not optional branding.",
      },
      {
        label: "Colon or jejunal reconstruction",
        detail:
          "Used in selected situations when stomach is not available. Longer theatre, additional anastomoses, different leak map. Should be named on the letter if planned.",
      },
      {
        label: "Chest versus neck anastomosis",
        detail:
          "Ivor Lewis typically joins in the chest; McKeown and transhiatal typically join in the neck. Leak presentation and management differ. Neither is universally safer.",
      },
      {
        label: "Two-field versus three-field lymphadenectomy",
        detail:
          "Extent of nodal surgery follows tumour location and protocol. Three-field work is a larger sitting, not a doubled brochure price.",
      },
      {
        label: "Minimally invasive or robotic access",
        detail:
          "Ports instead of, or in addition to, open incisions when the team offers it. Oncological goals remain resection and reconstruction. Availability is not implied by a brand name.",
      },
    ],
    preparation: [
      "Expect endoscopy with biopsy, CT of chest and abdomen, and PET-CT when indicated. Cardiopulmonary tests, bloods and a nutrition review come next. Home investigations can often be reviewed rather than repeated.",
      "If neoadjuvant chemotherapy or chemoradiation is already under way, bring the protocol, dates and the latest imaging. Smoking and alcohol history belong in the file — they change leak and pneumonia risk.",
      "Arrive with enough days before theatre for anaesthetic review and, if needed, feeding optimisation. Do not book a same-week international flight after a long-haul landing into a four-to-eight-hour resection.",
    ],
    recovery: [
      "Hospital stay is typically [STAY]. The first days are ICU or high-dependency: breathing, rhythm, drains and the anastomosis. Oral intake is delayed until the team is content; feeding often starts via jejunostomy. This page does not set a diet or a discharge date.",
      "Respiratory physiotherapy starts early. Anastomotic leak, pneumonia, atrial fibrillation and swallowing difficulty are among the problems that extend stay. Complication risk varies with fitness, tumour, prior radiation and surgical complexity. Individual percentages are not published here.",
      "Pathology review decides adjuvant treatment. International patients often need a further week in a nearby hotel after discharge before a long-haul flight. Ranges on this page are not promises of recovery time. Individual recovery varies.",
    ],
  },

  fullPathway: {
    intro: [
      "The surgical estimate is only one line in a medical-travel budget. Procedure cost is not total medical travel cost. Staging, neoadjuvant therapy, ICU extras, weeks of hotel after discharge, flights and a companion who can stay are the rest of the trip.",
      "Ask the coordinator to quote each stage separately. Do not invent flight or hotel prices from this page. Add your own numbers: surgery + quoted stay including named ICU nights + staging tests + drugs/radiation if in India + flights + visa + hotel nights × rate + local transport + attendant costs + a contingency for extra ICU or leak days.",
    ],
    stages: [
      {
        label: "Staging and cardiopulmonary work-up",
        detail: "Endoscopy, CT, PET-CT where indicated, lung and heart tests, nutrition. Often extra if done in India.",
      },
      {
        label: "Neoadjuvant treatment, if used",
        detail: "Chemotherapy or chemoradiation before surgery. Neighbouring cost sheets. Can add weeks in the city.",
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
        detail: "Further drugs or radiation if pathology and the MDT advise it.",
      },
      {
        label: "Flights and visa",
        detail: "Patient and attendant. Medical visa duration should cover a possible leak week. Issuance is not guaranteed.",
      },
      {
        label: "Accommodation after discharge",
        detail: "Hotel or apartment near the campus until the surgeon is content you can fly. Budget more nights than a lumpectomy trip.",
      },
      {
        label: "Local transport and attendant expenses",
        detail: "Airport transfers, clinic runs, food, lost work. Pair the hotel to the hospital, not the airport.",
      },
    ],
  },

  journey: [
    { label: "Submit medical records", detail: "Endoscopy report, biopsy, CT/PET-CT, a note on swallowing and weight loss, and a medicine list." },
    { label: "Imaging and pathology review", detail: "A surgeon who resects oesophagus reads the actual films and histology, not a coordinator's paraphrase." },
    { label: "Specialist assessment", detail: "On camera: whether resection, neoadjuvant treatment first, or a non-operative path is the honest next step." },
    { label: "Multidisciplinary planning", detail: "Where appropriate, surgical, medical and radiation oncology agree sequence before a date is offered." },
    { label: "Preliminary treatment plan and cost estimate", detail: "An itemised surgical letter. ICU nights, approach, reconstruction, drugs and radiation quoted separately if in view." },
    { label: "Hospital selection", detail: "Compare the surgeon you met, whether ICU has managed leaks, and how long a companion can stay in that city." },
    { label: "Travel planning", detail: "A hospital invitation typically supports a medical visa. Write duration for [STAY] plus hotel recovery. Visa issuance is not guaranteed." },
    { label: "Hospital admission", detail: "Usually a day or two before theatre after in-person examination and any missing tests." },
    { label: "Surgery", detail: "Four to eight hours depending on approach. Combined gastric resection, if needed, lengthens the sitting." },
    { label: "Postoperative recovery", detail: "ICU then ward across [STAY]. Extra nights are a clinical decision, not a package failure." },
    { label: "Pathology and further treatment", detail: "Specimen results feed adjuvant planning. Do not fly before that conversation if further treatment in India is likely." },
    { label: "Follow-up and return-home planning", detail: "Operative note, pathology, feeding plan and a written handover. Fly when the named surgeon is content." },
  ],

  documents: [
    "Upper endoscopy report and images, plus the biopsy histopathology",
    "CT chest and abdomen, and PET-CT if already done",
    "Endoscopic ultrasound or staging laparoscopy notes if performed",
    "Neoadjuvant chemotherapy or radiation summary if treatment has started",
    "Weight trend, swallowing history, and current nutrition (including any feeding tube)",
    "Cardiac and pulmonary test results, if available",
    "Current medication list, allergies, and smoking/alcohol history",
    "Passport, and a hospital invitation letter for the medical visa application",
  ],

  cities: esophagectomyCities,

  destinations: [
    {
      country: "India",
      stay: "[STAY]",
      positioning: "Catalog planning range",
      context:
        "Named esophageal-cancer surgery listings can be met on camera before travel. Listed consultants currently sit in Delhi NCR, Chennai and Hyderabad; Mumbai and Bengaluru are matched after records review.",
    },
    {
      country: "Turkey",
      costLevel: [1, 1.8],
      stay: "10–18 nights",
      positioning: "Packaged medical-travel market",
      context: "Verify whether ICU nights, leak management, PET-CT, neoadjuvant drugs and feeding support are inside the bundle.",
    },
    {
      country: "Thailand",
      costLevel: [1.2, 2.2],
      stay: "10–18 nights",
      positioning: "Private-hospital tourism",
      context: "Established international desks; ICU extras and oncology drugs can sit well above India.",
    },
    {
      country: "United Arab Emirates",
      costLevel: [2, 3.4],
      stay: "10–18 nights",
      positioning: "Regional premium private care",
      context: "Short flights from much of Africa and West Asia; private oncology pricing is closer to Western self-pay.",
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
      positioning: "Certified European upper-GI units",
      context: "Structured MDT process and longer inpatient norms; self-pay deposits are typical for visitors.",
    },
    {
      country: "United Kingdom",
      costLevel: [1.8, 3.4],
      stay: "10–18 nights",
      positioning: "Private self-pay (NHS generally not for visitors)",
      context: "NHS care is not available to most overseas visitors. Private self-pay applies; neoadjuvant treatment is quoted separately.",
    },
    {
      country: "United States",
      stay: "8–14 nights",
      positioning: "Highest self-pay outlier",
      context: "Facility, surgeon, ICU, pathology and later oncology bills often arrive separately. Compare against actual insurance liability.",
    },
  ],

  destinationIntro: [
    "The table below is a planning comparison for esophagectomy as a surgical episode, not a claim that every country uses the same approach or bundles ICU the same way. India and United States figures come from the GAF Healthcare catalog. Other markets are modelled from the India midpoint using relative private-care cost levels, and are labelled as modelled estimates — indicative market ranges, not hospital quotations.",
    "India is often less expensive for a self-funding patient. That is not the same as 'always cheapest' or 'best'. Insurance coverage at home can reverse the arithmetic overnight. Hospital, surgeon, approach, reconstruction, tumour complexity, ICU, length of stay, oncology treatment and what the package includes still decide the real bill in every country.",
  ],

  destinationNote:
    "International treatment costs vary by hospital, surgeon, surgical approach, tumour complexity, reconstruction, length of stay, ICU requirements, oncology treatment and what is included in the package. These figures are intended for preliminary comparison only and are not final quotations. Figures other than India and the United States are modelled planning estimates. They are not GAF quotations and not competitor quotes reproduced as ours.",

  cityIntro: [
    "City names below are working filter URLs — the same destination, city, specialty and procedure keys the rest of the site already uses. Open Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad for the city overlay and the filtered doctor and hospital cards.",
    "We do not invent a different surgical tariff for each metro. The approximate cost column uses the India planning band of [INDIA_COST] unless a researched city figure exists. What does change is the named consultant list, ICU geography, airport access and how expensive a two-to-three-week companion stay actually feels.",
  ],

  whyIndia: [
    "International patients consider India for esophagectomy when they are self-funding a high-acuity upper-GI resection, when they want a named surgical oncologist before they fly, and when they need ICU that already manages anastomotic leaks in the same city as staging and, if used, neoadjuvant treatment.",
    "Cost is the most visible reason. The catalog range [INDIA_COST] sits well below typical US cash-pay of [US_COST], because theatre, ICU, ward and consultant time are priced on a different cost base — not because the operation is a lesser product by definition. Several listed metros can hold an MDT conversation in one week. English is the working language of most international desks.",
    "None of that means India is the right country for every patient, and none of it is a claim of 'best surgeons in the world', guaranteed leak-free recovery or 'cheapest in the world'. Someone whose insurance covers the pathway at home, who cannot stay for two to three weeks, or whose staging shows resection is not honest, may be better treated locally.",
  ],

  whyCostDiffers: [
    "The figure on this page is a planning range. The figure on a hospital letter is an estimate written against a named approach, a named surgeon, a stated number of ICU and ward nights, and a reconstruction plan. Those two documents are not supposed to match to the dollar.",
    "The procedure name alone does not define the surgical plan. Cost may change because of open versus minimally invasive or robotic access, tumour location, stage, reconstruction, lymph-node fields, neoadjuvant treatment, ICU, pathology, extra nights and complications.",
    "If two hospitals quote different numbers, read the line items before you assume one is overcharging. One letter may include ten ICU-capable nights and a jejunostomy; the other may bill them later. One may be a flagship campus; the other a satellite. Higher cost is not a measure of better treatment.",
  ],

  planningClose: [
    "Esophagectomy in India is typically planned in the [INDIA_COST] band for the resection, reconstruction and quoted inpatient stay, against [US_COST] self-pay in the United States. The variables that actually move that band are approach, reconstruction, ICU course, campus tier, the named surgeon and whether chemotherapy or radiation is completed in the same trip.",
    "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad each have listed campuses for this surgical-oncology pathway. Named catalog consultants for esophageal cancer surgery currently sit in Delhi NCR, Chennai and Hyderabad; Mumbai and Bengaluru are matched after records review. Doctor and hospital cards on this page link only to profiles that already exist in the catalog.",
    "A personalized quotation, written after records review, is the document you should travel on. Cost ranges on this page are intended for preliminary planning and comparison only. Final treatment costs vary according to the patient's clinical condition, treatment plan, hospital, surgeon, surgical approach, length of stay and other factors. A personalized quotation should be obtained before making treatment or travel decisions.",
  ],

  questionsToAsk: [
    "Is the surgeon's fee included, and is the person on this call the person in theatre?",
    "Which approach — Ivor Lewis, McKeown, transhiatal, MIE or robotic-assisted — and is that named on the letter?",
    "How is the conduit reconstructed, and is a colon or jejunal graft priced if stomach cannot be used?",
    "How many ICU nights are included, and what happens if I need more?",
    "Is lymph-node dissection included, and two-field or three-field?",
    "Are operating-room staplers and consumables included?",
    "Is anaesthesia included for a four-to-eight-hour case?",
    "Are staging PET-CT, endoscopy and cardiopulmonary tests included?",
    "Is pathology of the specimen included? Molecular tests?",
    "Are inpatient medicines and jejunostomy feeds included? What about discharge formula?",
    "How many hospital nights and which room category?",
    "What happens if an anastomotic leak or extra hospitalization occurs?",
    "Is neoadjuvant or adjuvant chemotherapy included? Radiation?",
    "Is follow-up before I fly included, including a swallow study?",
  ],

  faqs: [
    {
      q: "What is the cost of esophagectomy in India?",
      a: "Plan against [INDIA_COST] for the resection, reconstruction, anaesthesia, quoted ICU/ward stay of [STAY] and specimen pathology. Typical US self-pay is [US_COST]. The final figure is an itemised hospital estimate after a surgeon reviews endoscopy and staging. Neoadjuvant drugs and extra leak days are usually separate.",
    },
    {
      q: "What is the cost of esophagectomy in Delhi NCR?",
      a: "Delhi NCR inherits the India planning range of [INDIA_COST]. There is no separate verified NCR tariff on this site. Campus tier, approach and ICU course move the letter more than the city name.",
    },
    {
      q: "Is esophagectomy covered in the cost of esophageal cancer treatment?",
      a: "Usually not as a single all-in cancer price. Staging, neoadjuvant chemotherapy or chemoradiation, the resection, adjuvant treatment and surveillance are neighbouring quotes unless a letter explicitly combines them.",
    },
    {
      q: "What affects the cost of esophagectomy?",
      a: "Approach, open versus minimally invasive or robotic access, reconstruction, lymph-node fields, campus tier, the named surgeon, ICU nights, complications and whether oncology treatment shares the trip. Higher price is not a measure of better care.",
    },
    {
      q: "What is included in an esophagectomy package?",
      a: "A typical surgical estimate covers the named surgeon, anaesthesia, theatre, quoted ICU and ward nights, routine inpatient medicines and specimen pathology. Confirm staplers, jejunostomy feeds, extra ICU, PET-CT and drugs.",
    },
    {
      q: "Is ICU included in the quoted cost?",
      a: "Only the nights the letter names. Early ICU is usual after esophagectomy. Extra days after a leak or pneumonia are typically extra. Ask for the number in writing.",
    },
    {
      q: "Does minimally invasive esophagectomy cost more?",
      a: "It can, because of theatre time and consumables, but GAF Healthcare does not publish a separate MIE tariff. Ask whether MIE is actually offered for your tumour and how that changes the itemised letter.",
    },
    {
      q: "Does robotic esophagectomy cost more?",
      a: "Robotic assistance, where offered, is a different resource envelope. There is no separate GAF robotic-esophagectomy price. Do not treat a neighbouring thoracic-robotics sheet as this operation's quote.",
    },
    {
      q: "What is an Ivor Lewis esophagectomy?",
      a: "A two-phase resection through the abdomen and right chest, with the anastomosis typically in the chest. It is one established approach for selected mid and lower-third tumours. It is not universally better than McKeown or transhiatal.",
    },
    {
      q: "What is a McKeown esophagectomy?",
      a: "A three-phase resection through abdomen, chest and neck, with the anastomosis typically in the neck. Often discussed for more proximal tumours. It is a longer sitting, not a product upgrade.",
    },
    {
      q: "How long is hospital stay after esophagectomy?",
      a: "Typically [STAY] on this sheet, including early ICU. Leaks, pneumonia or feeding problems extend that. This page does not promise a discharge date.",
    },
    {
      q: "How long should an international patient stay in India?",
      a: "Plan the inpatient [STAY] plus further hotel days until the named surgeon is content you can fly — often around three weeks in country for an uncomplicated course, longer if neoadjuvant treatment or a leak occurs.",
    },
    {
      q: "What tests are required before esophagectomy?",
      a: "The actual work-up depends on the patient and plan. Commonly: endoscopy with biopsy, CT, PET-CT where indicated, bloods, and cardiopulmonary and nutrition assessment. Home tests can often be reviewed rather than repeated.",
    },
    {
      q: "Does esophagectomy require chemotherapy or radiation?",
      a: "Sometimes, before or after surgery, depending on type, stage and MDT assessment. Those treatments are separate estimates. This page does not prescribe a sequence.",
    },
    {
      q: "How do I choose an esophagectomy surgeon?",
      a: "Use listed consultants whose catalog procedures include esophageal cancer surgery or esophagectomy, compare training and campus on the profile, and insist on speaking to the person who would operate. Placement is not a league table.",
    },
    {
      q: "How do I compare esophagectomy hospital quotations?",
      a: "Line by line: surgeon, approach, reconstruction, ICU nights, staplers, pathology, feeds, extra-night and leak policy, PET-CT, chemotherapy and radiation. Same procedure name is not the same surgical plan.",
    },
  ],

  doctorHeading: "Doctors to consider for esophagectomy in India",
  doctorIntro:
    "These are consultants listed on GAF Healthcare whose catalog procedures include esophagectomy or esophageal cancer surgery. Profiles show training, campus and procedures as held in the catalog. There are no rankings here, and no fee is paid for placement. Named listings currently sit in Delhi NCR, Chennai and Hyderabad; Mumbai and Bengaluru are matched after records review.",
  hospitalHeading: "Hospitals to consider for esophagectomy in India",
  hospitalIntro:
    "Campuses on GAF Healthcare where this surgical-oncology pathway is listed, with accreditation as published by the hospital. Listing with the procedure family is not a claim of esophagectomy volume or a ranking. Choose on the surgeon you met on camera, whether ICU has managed anastomotic leaks, and whether staging and neoadjuvant treatment can stay in the same city — not on a brand slogan.",

  relatedProcedures: [
    "Gastrectomy",
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
    { href: "/doctors?destination=India&procedure=Esophagectomy", label: "esophagectomy surgeons in India" },
    { href: "/hospitals?destination=India&procedure=Esophagectomy", label: "esophagectomy hospitals in India" },
  ],

  figures: [
    {
      after: "overview",
      src: "/costs/esophagectomy-procedure-overview.webp",
      alt: "Illustration showing the main steps of esophagectomy from tumour removal to digestive tract reconstruction",
      caption:
        "Resection removes the diseased oesophagus. Reconstruction restores a food passage. Lymph-node assessment, when indicated, is part of staging — not a separate product.",
      fit: "contain",
    },
    {
      after: "how",
      src: "/costs/types-of-esophagectomy.webp",
      alt: "Illustration comparing major esophagectomy approaches including Ivor Lewis, McKeown and transhiatal surgery",
      caption:
        "Ivor Lewis, McKeown, transhiatal and minimally invasive access are clinical choices. None is universally better. Technique follows tumour location and the operating team's assessment.",
      fit: "contain",
    },
    {
      after: "journey",
      src: "/costs/esophagectomy-patient-journey-india.webp",
      alt: "Esophagectomy treatment journey for international patients travelling to India",
      caption:
        "Records, specialist review and a written estimate come before a ticket. ICU extras, nutrition, drugs and travel sit outside the surgical range unless named.",
      fit: "contain",
    },
  ],
};
