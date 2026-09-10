import type { CostArticle } from "./types";
import { mastectomyCities } from "./mastectomy-cities";

export const mastectomy: CostArticle = {
  procedure: "Mastectomy",
  shortName: "mastectomy",
  briefName: "Mastectomy",
  duration: "approximately 2–4 hours",
  slug: "mastectomy",
  lastUpdated: "2026-09-10",
  seoTitle: "Mastectomy Cost in India: Price, Cities, Hospitals & Doctors",
  seoDescription:
    "Mastectomy cost in India is typically [INDIA_COST] for the operation and inpatient stay, against [US_COST] self-pay in the US. Compare cities, what a package includes, reconstruction as a separate decision, listed surgeons and hospitals, and how to request a personalized estimate.",
  heading: "Mastectomy Cost in India",

  answer: [
    "The cost of mastectomy in India typically ranges from [INDIA_COST], depending on the hospital, city, surgeon, complexity of surgery, diagnostic evaluation, hospital stay and whether additional procedures such as axillary clearance or immediate reconstruction are required.",
    "For international patients, the total medical budget may also include accommodation, airport transfers, medical visa expenses, medicines, follow-up care and other travel-related expenses. Reconstruction, radiotherapy and systemic therapy are usually quoted separately from the breast-removal operation itself.",
    "Hospital stay is usually [STAY]. Simple mastectomy with sentinel node biopsy sits toward the shorter end; modified radical mastectomy, a drain, or immediate reconstruction pushes the admission longer. The trip is often longer than the bed: final histopathology typically takes five to seven working days and decides radiation, drugs and whether a second procedure is discussed.",
    "Plan on roughly two to three weeks in India for a surgery-only pathway. If post-mastectomy radiotherapy is advised and you intend to complete it here, budget additional weeks as an outpatient rather than as an inpatient.",
  ],

  indiaCost: [
    "There is no single mastectomy price in India, and any page that pretends otherwise is selling a brochure. The [INDIA_COST] band is a planning range for the oncological operation — theatre, anaesthesia, the named surgeon's fee, the quoted room category, routine inpatient drugs and histopathology of the specimen. The lower end typically reflects a straightforward simple or modified radical mastectomy with sentinel node biopsy at a mid-tier NABH campus. The upper end typically reflects a flagship JCI campus, a senior breast or surgical oncologist, frozen-section axillary assessment, a private room with a companion bed, and a more extensive axillary or skin-sparing operation.",
    "The number moves most when the operation itself changes. Removing the breast is one procedure. Sampling the first draining nodes is another. Clearing the axilla is a third. Keeping the skin envelope, or the nipple-areola complex, is a fourth. Starting reconstruction at the same sitting is a fifth — and in the GAF Healthcare catalog, reconstruction is a neighbouring cost sheet, not something folded into mastectomy because a package name sounds complete.",
    "City is a weaker driver than patients expect. The same surgeon can be quoted differently at a flagship and a satellite unit in the same metro. Room category and companion stay shift a short admission by hundreds of dollars. What you cannot see on a public range is the pathology panel: receptor testing, HER2, and any send-out molecular assay that follows the specimen.",
    "Treat a figure given before records review as an order of magnitude. An itemised hospital estimate can only be written once a surgeon has seen your imaging, biopsy report and receptor status, because those decide the incision, the axilla, the likely stay and whether radiation will follow.",
  ],

  costComponents: [
    {
      label: "Surgeon fees",
      detail:
        "Usually bundled into the surgical estimate for the named consultant who will operate. Confirm that the person you met on camera is the person in theatre, and whether an assistant or plastic surgeon is billed separately.",
    },
    {
      label: "Hospital and nursing charges",
      detail:
        "Ward or room rate for the quoted nights, nursing, routine monitoring and the administrative admission. Campus tier and room category move this line more than the city name.",
    },
    {
      label: "Operating room",
      detail:
        "Theatre time, standard consumables, sutures, dressings and recovery. Skin-sparing, nipple-sparing or combined reconstruction lengthens this block.",
    },
    {
      label: "Anaesthesia",
      detail:
        "Anaesthetist fee and drugs for a general anaesthetic lasting typically two to four hours. Cardiac or respiratory comorbidity may add a pre-operative clearance billed outside the package.",
    },
    {
      label: "Diagnostic tests",
      detail:
        "Standard bloods, ECG and chest imaging are often inside the estimate. Breast MRI, PET-CT, bone scan or repeat biopsy are frequently extra.",
    },
    {
      label: "Pathology",
      detail:
        "Processing of the breast and any nodes, margin assessment and immunohistochemistry for ER, PR, HER2 and often Ki-67. Reflex FISH or genomic assays are usually billed later.",
    },
    {
      label: "Medicines",
      detail:
        "Inpatient analgesia, antibiotics and routine drugs during the quoted stay. Discharge prescriptions, drain supplies and later endocrine or chemotherapy drugs sit outside.",
    },
    {
      label: "Hospital room",
      detail:
        "The estimate is written against a room category. Upgrading, or keeping a companion bed, changes the nightly rate and percentage-based charges layered on it.",
    },
    {
      label: "Postoperative care and follow-up",
      detail:
        "Wound and drain review before you fly is commonly included. Later physiotherapy, lymphoedema care and oncology follow-up are typically separate visits.",
    },
    {
      label: "Additional procedures",
      detail:
        "Axillary dissection, a return to theatre, or immediate reconstruction should be named on the estimate if they are part of the plan. If they are not named, assume they are extra.",
    },
  ],

  whyQuotesDiffer:
    "Two honest estimates for mastectomy can differ because the operations are not the same. Axillary work, skin- or nipple-sparing technique, whether reconstruction starts the same day, campus tier, the named surgeon, room category and what pathology is sent out all move the bill more than the city on the boarding pass.",

  costDrivers: [
    {
      label: "Type of mastectomy",
      detail:
        "Simple mastectomy, modified radical mastectomy, skin-sparing and nipple-sparing operations are different lengths of theatre time with different reconstruction options. The catalog lists nipple-sparing mastectomy on its own sheet when that is the honest plan.",
    },
    {
      label: "Surgical complexity and prior treatment",
      detail:
        "Re-operation after lumpectomy, surgery after neoadjuvant chemotherapy, or a large locally advanced tumour changes dissection, drain use and the chance of a longer stay.",
    },
    {
      label: "Disease stage and axillary plan",
      detail:
        "A sentinel lymph node biopsy adds tracer, probe time and frozen section. A full axillary dissection is a longer operation, usually means a drain, and is the main reason some admissions run toward six nights.",
    },
    {
      label: "Surgeon experience and who operates",
      detail:
        "The estimate should name the consultant. A senior breast or surgical oncologist at a flagship campus is quoted differently from a satellite list. That is not a ranking; it is how private hospitals in India actually bill.",
    },
    {
      label: "Hospital category",
      detail:
        "NABH and JCI campuses, and flagship versus satellite units under the same brand, sit at different price levels for the same listed procedure.",
    },
    {
      label: "City and companion logistics",
      detail:
        "Surgical fees cluster more tightly across Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad than hotel and transfer bills do. City choice matters most when radiotherapy or a long drain follow-up keeps you in town.",
    },
    {
      label: "Room category",
      detail:
        "Suite versus twin-share changes the per-night rate and, in most Indian hospitals, the percentage-based charges on top of it.",
    },
    {
      label: "Diagnostic testing",
      detail:
        "Staging MRI or PET-CT, a second pathology review of the home biopsy, and cardiac clearance are common extras before a date is locked.",
    },
    {
      label: "Reconstruction or related procedures",
      detail:
        "Immediate implant or flap reconstruction is a separate clinical decision and, on this site, a separate cost sheet. Ask whether a plastic surgeon is in theatre and how that fee is written.",
    },
    {
      label: "Length of hospital stay",
      detail:
        "Packages are written for a stated number of nights. Extra nights for drain output, seroma, wound issues or comorbidity are typically billed fresh.",
    },
    {
      label: "Postoperative care",
      detail:
        "Physiotherapy after axillary clearance, lymphoedema advice and later oncology visits are usually outpatient lines, not part of the surgical bundle.",
    },
    {
      label: "Complications",
      detail:
        "Haematoma, infection, flap or implant problems if reconstruction was combined, or an unplanned return to theatre are not included by default. Ask what the complications policy actually covers.",
    },
    {
      label: "Follow-up and adjuvant treatment",
      detail:
        "Post-mastectomy radiotherapy, chemotherapy, anti-HER2 drugs and endocrine therapy are neighbouring pathways. They decide how long you stay in India far more often than the operation itself.",
    },
  ],

  inclusions: [
    {
      label: "Consultation that leads into the admission",
      detail:
        "The in-person pre-operative review with the named surgeon, where the hospital has bundled it. Remote review before travel is arranged separately through the coordinator.",
    },
    {
      label: "Surgeon and anaesthetist fees",
      detail:
        "The named breast or surgical oncologist's operating fee and the anaesthesia team for the listed mastectomy — not for an unnamed reconstruction unless the estimate says so.",
    },
    {
      label: "Theatre and recovery",
      detail: "Operating room time, standard consumables and post-anaesthesia recovery for the scheduled operation.",
    },
    {
      label: "Inpatient stay as quoted",
      detail:
        "Bed charges, nursing and routine ward care for the room category and number of nights written into the estimate — typically [STAY].",
    },
    {
      label: "Routine pre-operative tests",
      detail: "Standard bloods, ECG, chest imaging and anaesthetic fitness assessment, where the hospital has bundled them.",
    },
    {
      label: "Specimen histopathology",
      detail: "Processing and reporting of the breast and sampled nodes, including margin assessment where relevant.",
    },
    {
      label: "Standard inpatient medication",
      detail: "Analgesia, antibiotics and routine drugs administered during the admission.",
    },
    {
      label: "Discharge summary and early wound review",
      detail: "A written summary for your home oncologist and the first post-operative drain or wound review before you fly.",
    },
  ],

  exclusions: [
    {
      label: "Breast reconstruction",
      detail:
        "Implant-based or autologous reconstruction is a separate decision and is typically quoted on its own pathway. Do not assume it is inside a mastectomy package.",
    },
    {
      label: "Radiotherapy",
      detail:
        "Post-mastectomy radiation may be advised for node-positive disease, large tumours or selected other indications. It is almost never inside the surgical estimate.",
    },
    {
      label: "Chemotherapy and targeted drugs",
      detail: "Cycle-based treatment, anti-HER2 agents and supportive medication are priced per protocol, not per operation.",
    },
    {
      label: "Endocrine therapy",
      detail: "Tamoxifen or an aromatase inhibitor is usually a multi-year prescription managed at home after you return.",
    },
    {
      label: "Advanced or send-out diagnostics",
      detail: "PET-CT, staging MRI, genomic recurrence assays and specialised molecular panels are billed on top when ordered.",
    },
    {
      label: "Complications and extra nights",
      detail: "Extended stay, ICU, return to theatre, or treatment of haematoma or infection is a new event unless the contract says otherwise.",
    },
    {
      label: "Additional surgery",
      detail: "A later revision, delayed reconstruction, or contralateral procedure is a new estimate.",
    },
    {
      label: "Travel, visa, hotel and companion costs",
      detail: "Flights, medical visa fees, accommodation and living costs sit outside every hospital estimate.",
    },
    {
      label: "Physiotherapy and lymphoedema care",
      detail: "More relevant after axillary dissection, and usually an outpatient course billed by session.",
    },
  ],

  overview: {
    what: [
      "Mastectomy removes the breast as the oncological operation. Depending on the plan, the surgeon may take the breast tissue with an ellipse of skin and the nipple, keep the skin envelope, or, when oncology and anatomy allow, keep the nipple-areola complex as well. The intent is to clear the disease in the breast; it is not a cosmetic procedure, even when reconstruction is discussed in the same week.",
      "The axilla is part of the same sitting more often than patients realise. Where nodes look clinically clear, a sentinel lymph node biopsy is the usual staging step. Where nodal disease is already known, an axillary dissection may be planned. That choice changes drain use, shoulder recovery and the likelihood of later radiotherapy.",
      "Mastectomy is not automatically 'more cancer surgery' than conservation. For appropriately selected early breast cancer, conservation plus radiotherapy and mastectomy have long been compared in randomised follow-up. The honest question is which operation fits the tumour, the breast, prior radiation, genetic risk and whether you can complete the treatment that belongs with that choice.",
    ],
    who: [
      "Mastectomy is often discussed when disease is multifocal or large relative to breast volume, when conservation would leave an unacceptable deformity, when prior chest radiation rules out further radiotherapy, when margins cannot be cleared by a further lumpectomy, or when a patient prefers removal after a full explanation of both options.",
      "Some patients become mastectomy candidates after neoadjuvant chemotherapy if the remaining disease still cannot be conserved safely. Others choose mastectomy in the setting of a high inherited risk, sometimes with a discussion of the opposite breast — that contralateral operation is a separate consent and a separate estimate.",
      "Suitability is a multidisciplinary reading of imaging, biopsy and receptor status, not a cost comparison. GAF Healthcare does not recommend mastectomy or conservation for an individual patient on this page.",
    ],
    how: [
      "The operation is done under general anaesthesia and typically takes two to four hours. Skin-sparing and nipple-sparing techniques, and any immediate reconstruction, run longer.",
      "The surgeon removes the breast tissue according to the agreed plane, orients the specimen for the pathologist, and addresses the axilla as planned. Drains are common after mastectomy, particularly when the axilla has been cleared.",
      "If reconstruction is happening immediately, a plastic or oncoplastic surgeon joins for an implant, expander or flap. That is a combined operation with a combined recovery, and it should be priced as such.",
      "You wake with dressings, usually one or two drains, and a plan for mobilisation the same day or the next morning.",
    ],
    variations: [
      {
        label: "Simple (total) mastectomy",
        detail: "Removes the breast including the nipple-areola complex; the pectoral muscles stay. Often paired with sentinel node biopsy.",
      },
      {
        label: "Modified radical mastectomy",
        detail: "Removes the breast and axillary nodes in continuity. Stay and drain time are usually longer than a simple mastectomy.",
      },
      {
        label: "Skin-sparing mastectomy",
        detail: "Keeps most of the skin envelope to help later or immediate reconstruction. Oncology still governs whether the nipple can stay.",
      },
      {
        label: "Nipple-sparing mastectomy",
        detail:
          "Keeps the nipple-areola complex when tumour location and anatomy allow. Listed separately on this site when that is the honest operation.",
      },
      {
        label: "Mastectomy with immediate reconstruction",
        detail:
          "Oncological removal and reconstruction at the same sitting. Reconstruction cost is quoted on the neighbouring sheet; ask for both numbers before you travel.",
      },
    ],
    preparation: [
      "Expect mammogram and ultrasound, a core biopsy with receptor status, and often MRI to map extent. Staging scans are ordered when the clinical picture calls for them, not as a tourist package.",
      "Anaesthetic fitness comes next: bloods, ECG, and cardiac or respiratory review where your history requires it. Blood thinners and some diabetes medicines may need adjusting before you fly.",
      "Bring imaging on a disc or drive, the biopsy report with ER, PR and HER2, and slides or blocks if your home laboratory will release them. Arrive with at least one working day before the pre-operative assessment.",
    ],
    recovery: [
      "Most patients sit out of bed the same evening or the next morning. Pain is usually managed with oral analgesia after the first day. The chest wall feels tight; that eases over weeks.",
      "Drains typically stay until output falls, often several days. Seroma after the drains come out is common enough to plan for a clinic aspiration if you are still in the city.",
      "Shoulder exercises start early, especially after axillary surgery. Heavy lifting waits; driving waits until you can move comfortably and are off strong pain medicines.",
      "Histopathology in five to seven working days sets nodes, receptors and whether post-mastectomy radiotherapy or systemic therapy is advised. That meeting, not the discharge, is what should govern your return ticket.",
    ],
  },

  fullPathway: {
    intro: [
      "Costing only the mastectomy is the usual budgeting mistake. The operation is one line. Adjuvant treatment, reconstruction timing and the weeks you live in the city are the rest of the trip.",
      "Ask the coordinator to quote each stage separately so you can see the surgical package beside the treatments that may follow it.",
    ],
    stages: [
      {
        label: "Diagnosis and staging",
        detail:
          "Mammography, ultrasound, core biopsy with receptors, and selectively MRI or PET-CT. Home investigations can often be reviewed rather than repeated.",
      },
      {
        label: "The operation",
        detail: "Mastectomy with the agreed axillary approach, theatre, anaesthesia, [STAY] and specimen pathology. This is the [INDIA_COST] line.",
      },
      {
        label: "Reconstruction, if chosen",
        detail:
          "Immediate or delayed, implant or autologous. Quoted on the breast reconstruction sheet, not assumed inside mastectomy.",
      },
      {
        label: "Radiotherapy where indicated",
        detail:
          "Not automatic after every mastectomy. When advised, technique and fractions are a separate radiation-oncology estimate and a longer city stay.",
      },
      {
        label: "Systemic therapy where indicated",
        detail: "Chemotherapy, anti-HER2 therapy and endocrine therapy each have their own protocol and price.",
      },
      {
        label: "Surveillance",
        detail: "Clinical review and imaging, usually handed back to your home oncologist with the operative note and pathology.",
      },
    ],
  },

  journey: [
    {
      label: "Share medical records",
      detail:
        "Mammogram and ultrasound images, the core biopsy with ER, PR and HER2, any MRI, and a summary of medical history and medicines.",
    },
    {
      label: "Initial doctor review",
      detail: "A breast or surgical oncologist reads the actual imaging and pathology rather than a coordinator's paraphrase.",
    },
    {
      label: "Treatment recommendation",
      detail:
        "You meet the consultant who would operate, on camera, and hear whether mastectomy, conservation or further staging is the honest next step.",
    },
    {
      label: "Cost estimate",
      detail:
        "An itemised surgical estimate, with reconstruction, radiation and drugs quoted separately if they are in view.",
    },
    {
      label: "Hospital selection",
      detail:
        "You compare listed campuses on the surgeon you met, the breast unit, accreditation as published, and the logistics of drains and later radiotherapy.",
    },
    {
      label: "Medical visa support where applicable",
      detail:
        "A hospital invitation letter typically supports a medical visa application. Most patients travel with an attendant on a companion visa. Confirm duration if radiation may follow.",
    },
    {
      label: "Arrival in India",
      detail: "Airport transfer to the hotel or campus, then an in-person examination and any supplementary tests.",
    },
    {
      label: "Hospital admission",
      detail: "Usually the evening before or the morning of surgery, with anaesthetic review completed.",
    },
    {
      label: "Procedure",
      detail: "Two to four hours in theatre for a standard mastectomy with axillary staging, plus recovery.",
    },
    {
      label: "Recovery",
      detail: "Inpatient [STAY], drain teaching, mobilisation and wound care.",
    },
    {
      label: "Follow-up",
      detail:
        "Histopathology review five to seven working days later. Radiation, drugs or delayed reconstruction are confirmed here, not guessed at booking.",
    },
    {
      label: "Return home",
      detail:
        "You leave with the operative note, pathology, receptor status, drain or wound plan, and a written handover for your home team.",
    },
  ],

  documents: [
    "Mammogram and breast ultrasound images, on a disc or drive rather than as photographs",
    "Core biopsy histopathology including ER, PR, HER2 and Ki-67 where done",
    "Breast MRI and any staging scans (PET-CT, bone scan, CT)",
    "Paraffin block or slides, if your home laboratory will release them",
    "Current medication list, including blood thinners and hormone treatment",
    "Records of diabetes, cardiac, thyroid or respiratory disease and any prior breast or chest surgery or radiation",
    "Passport, and a hospital invitation letter for the medical visa application",
    "Any insurance or reimbursement paperwork that must be completed before admission",
  ],

  cities: mastectomyCities,

  destinations: [
    {
      country: "India",
      stay: "[STAY]",
      positioning: "Self-pay surgical oncology planning hub",
      context:
        "Catalog range for the operation at listed campuses. Named breast and surgical oncologists can be met on camera before travel. Reconstruction and adjuvant therapy are separate lines.",
    },
    {
      country: "Turkey",
      costLevel: [1, 1.8],
      stay: "3–6 nights",
      positioning: "Packaged medical-travel market",
      context: "Strong package pricing for surgery; verify whether pathology, axilla, reconstruction and radiation are inside the bundle.",
    },
    {
      country: "Thailand",
      costLevel: [1.2, 2.2],
      stay: "3–6 nights",
      positioning: "Private-hospital tourism",
      context: "Established international desks and private infrastructure; oncology drug and radiation costs can sit well above India.",
    },
    {
      country: "United Arab Emirates",
      costLevel: [2, 3.4],
      stay: "3–6 nights",
      positioning: "Regional premium private care",
      context: "Short flights from much of Africa and West Asia; private oncology pricing is closer to Western self-pay than to India.",
    },
    {
      country: "Singapore",
      costLevel: [2.6, 4.4],
      stay: "3–6 nights",
      positioning: "High-cost private hub",
      context: "Mature multidisciplinary process at premium private tariffs. Local subsidised bills and international private bills are different schedules.",
    },
    {
      country: "Germany",
      costLevel: [2.2, 4.2],
      stay: "4–8 nights",
      positioning: "Certified European breast-unit care",
      context: "Structured multidisciplinary process and longer inpatient norms; self-pay deposits are typical for visitors.",
    },
    {
      country: "United Kingdom",
      costLevel: [1.8, 3.4],
      stay: "2–5 nights",
      positioning: "Private self-pay (NHS generally not for visitors)",
      context: "NHS treatment is not available to most overseas visitors. Private self-pay is what applies; adjuvant radiation is quoted separately.",
    },
    {
      country: "United States",
      stay: "1–3 nights",
      positioning: "Highest self-pay outlier",
      context:
        "Facility, surgeon, pathology and later oncology bills often arrive separately. Compare against your actual insurance liability, not only the cash-pay total.",
    },
  ],

  destinationIntro: [
    "The table below is a planning comparison for mastectomy as a surgical episode, not a claim that every country delivers the same operation under the same name. India and United States figures come from the GAF Healthcare catalog. Other markets are modelled from the India midpoint using relative private-care cost levels, and are labelled as modelled estimates.",
    "India is often less expensive for a self-funding patient. That is not the same as 'always cheapest' or 'best'. Labour, facility overhead, drug procurement and how pathology is billed explain much of the spread. Insurance coverage at home can reverse the arithmetic overnight.",
  ],

  cityIntro: [
    "GAF Healthcare lists mastectomy consultants in Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad. Each city name below is a working filter URL — the same destination, city, specialty and procedure keys the rest of the site already uses — not a new path.",
    "We do not invent a different surgical tariff for each metro. The approximate cost column uses the India planning band unless a researched city figure exists. What does change, and what the city pages are for, is the hospital cluster, the international-patient desk, airport geography and how expensive a three-week companion stay actually feels.",
  ],

  whyIndia: [
    "International patients consider India for mastectomy when they are self-funding, when they want a named surgical oncologist before they fly, and when they need the next oncology steps — pathology, a tumour-board discussion, radiation or drugs — available in the same city rather than as a chain of referrals.",
    "Cost is the most visible reason. The catalog range [INDIA_COST] sits well below typical US cash-pay of [US_COST]. The gap exists because theatre, ward, pathology and consultant time are priced on a different cost base, not because the operation is a lesser product by definition.",
    "Specialist availability matters as well. Breast and surgical oncology lists in the five listed metros are deep enough that a second opinion between campuses is often a car ride, not a second visa. English is the working language of most international desks, which is a practical fact rather than a marketing slogan.",
    "None of that means India is the right country for every patient. Someone whose insurance covers the operation at home, who cannot travel with a drain, or who needs a reconstruction technique that a particular listed campus does not run that week, may be better treated locally. The coordinator's job is to say so.",
  ],

  whyCostDiffers: [
    "The figure on this page is a planning range. The figure on a hospital letter is an estimate written against a named operation, a named surgeon, a room category and a stated number of nights. Those two documents are not supposed to match to the dollar.",
    "Estimates change when imaging shows more extensive disease, when the axilla plan switches from sentinel biopsy to clearance, when reconstruction is added or postponed, when pathology asks for extra tests, when you stay longer, or when a complication is treated. Room upgrades and companion beds change it without any clinical surprise at all.",
    "If two hospitals quote different numbers, read the line items before you assume one is overcharging. One letter may include frozen section and IHC; the other may bill them later. One may be a flagship campus; the other a satellite. One may include three nights; the other two.",
  ],

  planningClose: [
    "Mastectomy in India is typically planned in the [INDIA_COST] band for the operation and the quoted inpatient stay, against [US_COST] self-pay in the United States. The variables that actually move that band are the type of mastectomy, the axillary plan, campus tier, the named surgeon, room category and whether reconstruction or adjuvant therapy is in the same trip.",
    "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad each have listed consultants and campuses for this pathway. City choice is a logistics and unit-depth decision more than a price-list decision. Doctor and hospital cards on this page link only to profiles that already exist in the catalog.",
    "A personalized quotation, written after records review, is the document you should travel on. Use this page to understand the questions, the inclusions and the trip around the operation — not as a substitute for that letter.",
  ],

  questionsToAsk: [
    "Which operation are you recommending — simple, modified radical, skin-sparing or nipple-sparing — and why does conservation not fit?",
    "Will you sample sentinel nodes or clear the axilla, and what would change that plan in theatre?",
    "Is reconstruction being discussed now, delayed, or not at all, and is that fee inside this estimate?",
    "Which surgeon will operate, and will they be present for the whole procedure?",
    "Is this quote for the flagship campus or a satellite unit?",
    "What room category and how many nights is the estimate based on?",
    "Which investigations from home will you accept rather than repeat?",
    "Is histopathology, including receptors and HER2, inside the package?",
    "If drains stay longer, or I need extra nights, how is that billed?",
    "Might I need post-mastectomy radiotherapy, and what is the separate cost and time in the city?",
    "What does the complications policy actually cover?",
    "When will final pathology be ready, and will the consultant review it with me in person before I fly?",
  ],

  faqs: [
    {
      q: "How much does mastectomy cost in India?",
      a: "Mastectomy is typically quoted at [INDIA_COST] in India for the operation, theatre, anaesthesia, histopathology and a hospital stay of [STAY]. Reconstruction, radiotherapy and systemic therapy are usually separate. The final figure is an itemised hospital estimate after a surgeon reviews your imaging and biopsy.",
    },
    {
      q: "What is the cheapest city for mastectomy in India?",
      a: "There is no verified city-by-city tariff on this page, and inventing one would be misleading. Surgical fees cluster more tightly across Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad than hotel and transfer costs. The cheaper trip is often the city where you will not need a second flight for radiation or a drain follow-up.",
    },
    {
      q: "Is mastectomy cheaper in India than in the USA?",
      a: "For a self-funding patient, the catalog comparison is [INDIA_COST] in India against [US_COST] typical US cash-pay. If US insurance covers the operation, your out-of-pocket cost at home may be lower than travelling. Compare against your actual liability.",
    },
    {
      q: "What is included in the cost of mastectomy?",
      a: "A typical surgical estimate covers the named surgeon, anaesthesia, theatre, the quoted nights, routine inpatient medicines and specimen pathology. Confirm frozen section, receptor testing and whether any reconstruction is inside the same letter.",
    },
    {
      q: "How many days do I need to stay in India?",
      a: "Hospital stay is usually [STAY]. International patients often plan two to three weeks in the country for pre-operative assessment, surgery, drain management and the pathology review. Radiotherapy, if advised and done in India, adds further outpatient weeks.",
    },
    {
      q: "Does the cost include hospitalisation?",
      a: "Typically yes, for the number of nights written into the estimate. Extra nights are usually billed separately.",
    },
    {
      q: "Does the cost include medicines?",
      a: "Inpatient medicines during the quoted stay are often included. Discharge drugs, later endocrine therapy, chemotherapy and targeted agents are not.",
    },
    {
      q: "Does insurance cover mastectomy?",
      a: "That depends on your policy and country of cover. Many international patients on this pathway are self-funding. Ask your insurer what they reimburse for planned surgery abroad before you treat a hospital letter as a claim.",
    },
    {
      q: "How do I choose a hospital?",
      a: "Start with the surgeon you can meet on camera, then the campus where that surgeon actually operates, accreditation as the hospital publishes it, and whether radiation or reconstruction — if needed — can be done without changing cities. There is no ranking on this page.",
    },
    {
      q: "How do I choose a doctor?",
      a: "Use the listed surgical oncologists whose practice includes mastectomy, compare training and campus on the profile, and insist on speaking to the person who would operate. Placement on this page is not a league table.",
    },
    {
      q: "Can international patients get a fixed package?",
      a: "Hospitals often issue a packaged estimate for a defined operation, room and number of nights. It is still an estimate. Complexity, extra nights and excluded lines can change the final bill.",
    },
    {
      q: "Does the cost include reconstruction?",
      a: "Usually not. Reconstruction is a separate clinical decision and is listed on its own cost sheet on this site. Ask for both estimates if reconstruction is part of your plan.",
    },
    {
      q: "What additional costs should I expect?",
      a: "Flights, medical visa, hotel, transfers, companion living costs, extra diagnostics, extra nights, physiotherapy, and any radiation or drug therapy that follows pathology.",
    },
    {
      q: "Which Indian cities offer mastectomy?",
      a: "GAF Healthcare currently lists this pathway in Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad. Open the city name in the table for the filtered cost, doctor and hospital views.",
    },
    {
      q: "How can I get a personalized estimate?",
      a: "Share your imaging and biopsy through the consult form. A coordinator routes the records to a listed consultant and returns suitable hospital options with an itemised planning estimate. There is no obligation to book.",
    },
  ],

  doctorHeading: "Doctors to consider for mastectomy in India",
  doctorIntro:
    "These are surgical oncologists listed on GAF Healthcare whose practice includes mastectomy. Profiles show training, campus and procedures as held in the catalog. There are no rankings here, and no fee is paid for placement.",
  hospitalHeading: "Hospitals to consider for mastectomy in India",
  hospitalIntro:
    "Campuses on GAF Healthcare where this operation is listed, with accreditation as published by the hospital. Choose on the surgeon you met on camera, breast-unit depth and whether adjuvant treatment can stay in the same city — not on a brand slogan.",

  relatedProcedures: [
    "Breast-Conserving Surgery (Lumpectomy)",
    "Nipple-Sparing Mastectomy",
    "Sentinel Lymph Node Biopsy",
    "Oncoplastic Breast Surgery",
    "Breast Reconstruction",
    "Intensity-Modulated Radiotherapy (IMRT)",
  ],
};
