import type { CostArticle } from "./types";
import { sentinelLymphNodeBiopsyCities } from "./sentinel-lymph-node-biopsy-cities";

export const sentinelLymphNodeBiopsy: CostArticle = {
  procedure: "Sentinel Lymph Node Biopsy",
  shortName: "sentinel lymph node biopsy",
  briefName: "Sentinel Lymph Node Biopsy",
  duration: "approximately 30–90 minutes alone",
  slug: "sentinel-lymph-node-biopsy",
  lastUpdated: "2026-09-10",
  seoTitle: "Sentinel Lymph Node Biopsy Cost in India: Prices, Cities & Hospitals",
  seoDescription:
    "Sentinel lymph node biopsy cost in India is typically [INDIA_COST] for the procedure and stay, against [US_COST] self-pay in the US. Compare Delhi NCR and other cities, mapping and pathology inclusions, listed surgeons and hospitals, and how to request a personalized estimate.",
  heading: "Sentinel Lymph Node Biopsy Cost in India",
  heroLede:
    "A sentinel lymph node biopsy identifies and removes the first lymph nodes most likely to receive drainage from a primary tumour, so pathologists can see whether cancer cells have reached the nodal basin. It is a staging procedure, not a treatment of the tumour itself. Breast cancer is the context most international patients meet it in — often in the same anaesthetic as lumpectomy or mastectomy — but mapping is also established in melanoma and in selected other cancers when the treating team judges it appropriate. It is not a smaller version of a full lymph-node dissection, and it is not appropriate for every patient: clinically involved nodes, some prior surgery or radiation, and certain cancer types change the plan. Cost in India sits in a planning band because a standalone biopsy, a same-sitting breast operation, dual-tracer mapping and frozen-section pathology are different letters. The quoted knife is still not the trip: flights, a companion hotel, extra pathology and whatever cancer operation shares the anaesthetic sit outside unless named.",
  overviewHeading: "What is a sentinel lymph node biopsy?",

  answer: [
    "Sentinel lymph node biopsy cost in India typically ranges from [INDIA_COST] for lymphatic mapping, removal of the sentinel node or nodes, anaesthesia, pathology of those nodes and a hospital stay of [STAY]. Typical US self-pay for a comparable surgical episode is [US_COST]. When the biopsy is performed alone, theatre time is usually about 30–90 minutes; when it shares an anaesthetic with lumpectomy or mastectomy, duration follows the primary cancer operation.",
    "That figure is a planning range, not a hospital quotation. It usually covers the named surgeon, operating room, anaesthesia, the mapping method written into the letter, the quoted room and nights, and histopathology of the sentinel nodes. Radioisotope or dye may or may not be inside — ask. Frozen section on the day, immunohistochemistry panels, and a full axillary or regional dissection if the nodes are involved are frequently extra. A same-sitting lumpectomy or mastectomy should be priced as combined surgery, not assumed inside this band.",
    "What moves the number most is whether the biopsy stands alone or travels with another cancer operation, the mapping technique, frozen-section pathology, campus tier, the named consultant, and whether conversion to a full dissection is discussed. International patients should compare complete treatment packages — the primary cancer surgery, radiotherapy, systemic therapy, flights and a companion stay — rather than a biopsy headline.",
  ],

  indiaCost: [
    "There is no single sentinel lymph node biopsy price in India. The [INDIA_COST] band is a planning range for mapping, removal of the sentinel nodes, theatre, anaesthesia, the named surgeon's fee, the quoted room and histopathology of those nodes. The lower end typically reflects a straightforward standalone biopsy, or sampling added to a simple conservation case, at a mid-tier NABH campus with routine paraffin pathology. The upper end typically reflects a flagship campus, dual-tracer mapping, frozen section on the day, a private room, and a biopsy that shares a complex breast or other oncological sitting.",
    "Treat the band as an order of magnitude until a surgical oncologist has seen the imaging, biopsy, and whether the nodes look clinically involved. Same procedure name is not the same surgical plan. A standalone melanoma sentinel-node case, an axillary sentinel biopsy at lumpectomy, and a gynae sentinel-node protocol with frozen section are billed under this heading in some letters. They are different theatres.",
    "City is a weaker driver than families expect. Campus tier, whether the primary cancer operation is in the same letter, and what pathology is sent out move the bill more than the metro name. An itemised estimate can only be written once a surgeon has read the file.",
  ],

  costComponents: [
    {
      label: "Surgeon fee",
      detail:
        "Usually bundled for the named surgical oncologist. Confirm that the person you met on camera is the person in theatre, and whether a second surgeon is billed if a full dissection follows on the same day.",
    },
    {
      label: "Hospital and operating-room charges",
      detail:
        "Admission, theatre time, standard consumables and recovery. Combined cancer surgery lengthens this block. Campus tier moves this line more than the city name.",
    },
    {
      label: "Anaesthesia",
      detail:
        "Usually general anaesthesia. A standalone biopsy may be shorter than a combined breast sitting. Cardiac or respiratory comorbidity may add a clearance billed outside the package.",
    },
    {
      label: "Lymphatic mapping",
      detail:
        "Radioisotope, blue dye, dual-tracer technique, or another localisation method the campus uses. Ask which method is planned and whether nuclear-medicine time is inside the letter. Do not assume every house uses the same protocol.",
    },
    {
      label: "Imaging or localisation",
      detail:
        "Lymphoscintigraphy, probe use in theatre, or other localisation when ordered. Often inside when mapping is named; sometimes a radiology line of its own.",
    },
    {
      label: "Pathology",
      detail:
        "Processing of the sentinel node or nodes. Frozen section on the day, if used, should be named. Immunohistochemistry and later molecular tests are frequently extra.",
    },
    {
      label: "Medicines",
      detail: "Inpatient analgesia, antibiotics and routine drugs during the quoted stay. Discharge prescriptions sit outside.",
    },
    {
      label: "Room charges and nursing",
      detail:
        "Written against a room category and a stated number of nights — typically [STAY]. Standalone cases often sit toward the shorter end; combined cancer surgery follows the primary operation's stay.",
    },
    {
      label: "Postoperative care and follow-up",
      detail:
        "Wound review before you fly is commonly included. Physiotherapy, later oncology visits and a return to theatre if nodes are involved are typically separate.",
    },
  ],

  whyQuotesDiffer:
    "Two honest estimates can differ because the operations are not the same. Standalone sentinel biopsy is not sentinel biopsy plus mastectomy. Dual-tracer mapping is not dye alone. Frozen section on the day is not paraffin only. Conversion to a full dissection is a different operation. Campus tier and the named surgeon move the bill more than the city on the boarding pass.",

  costDrivers: [
    {
      label: "Cancer type and clinical context",
      detail:
        "Breast, melanoma and selected other sites use mapping differently. The letter should name the primary tumour and the nodal basin.",
    },
    {
      label: "Standalone versus combined cancer surgery",
      detail:
        "A biopsy added to lumpectomy or mastectomy is two operations even in one anaesthetic. If the primary surgery is not named, assume it is extra.",
    },
    {
      label: "Mapping technique",
      detail:
        "Radioisotope, blue dye, dual technique or another method the campus uses. Nuclear-medicine time is a real line when isotope is used.",
    },
    {
      label: "Number of nodes and conversion to dissection",
      detail:
        "Sentinel sampling removes the mapped nodes, not the whole basin. If frozen section leads to an immediate full dissection, that is a different fee unless the letter already prices it.",
    },
    {
      label: "Pathology requirements",
      detail:
        "Paraffin histology is usual. Frozen section, immunohistochemistry and send-out assays change the bill. Ask what is inside.",
    },
    {
      label: "Anaesthesia and hospital category",
      detail: "Flagship versus satellite campuses sit at different price levels. The estimate should name the operating address.",
    },
    {
      label: "Named surgeon",
      detail: "The person on the video call should be the person in theatre. Flagship and satellite lists are billed differently. That is not a ranking.",
    },
    {
      label: "Length of stay and complications",
      detail:
        "Packages are written for [STAY]. Combined cancer surgery, a drain after dissection, or a wound problem may add nights. Extra nights are usually billed fresh.",
    },
    {
      label: "Additional imaging or procedures",
      detail:
        "Staging PET-CT, a second localisation, or a later axillary clearance should be named if they are in view. If they are not named, assume they are extra.",
    },
  ],

  inclusions: [
    {
      label: "Consultation that leads into the admission",
      detail: "The in-person pre-operative review with the named surgeon, where the hospital has bundled it. Remote review before travel is arranged separately.",
    },
    {
      label: "Surgery by the named consultant",
      detail: "Mapping and removal of the sentinel node or nodes as written on the estimate — not a full dissection unless the letter says so.",
    },
    {
      label: "Anaesthesia and operating room",
      detail: "The anaesthesia team, theatre time, standard consumables and recovery for the scheduled case.",
    },
    {
      label: "Hospital stay as quoted",
      detail: "Bed charges, nursing and routine ward care for the room category and nights written into the estimate — typically [STAY].",
    },
    {
      label: "Routine tests",
      detail: "Standard bloods, ECG and anaesthetic fitness assessment, where bundled.",
    },
    {
      label: "Pathology of the sentinel nodes",
      detail: "Processing and reporting of the removed sentinel nodes, where the hospital has bundled histopathology.",
    },
    {
      label: "Medicines during admission",
      detail: "Analgesia, antibiotics and routine drugs administered during the quoted stay.",
    },
  ],

  exclusions: [
    {
      label: "Mapping tracer or dye if not named",
      detail: "Radioisotope, blue dye or another localisation agent should be specified. If the letter is silent, assume it is extra until confirmed.",
    },
    {
      label: "Frozen section and extra pathology",
      detail: "Same-day frozen section, immunohistochemistry and molecular assays are frequently billed on top.",
    },
    {
      label: "The primary cancer operation",
      detail:
        "Lumpectomy, mastectomy, wide local excision of melanoma or another resection sit on neighbouring cost sheets unless the letter is explicitly combined.",
    },
    {
      label: "Full lymph-node dissection",
      detail: "If sentinel nodes are involved, a completion dissection may be discussed. It is a different operation unless already priced.",
    },
    {
      label: "Advanced staging scans",
      detail: "PET-CT, MRI and other staging studies are frequently extra when ordered.",
    },
    {
      label: "Complications and extra nights",
      detail: "Extended stay, return to theatre or infection is a new event unless the contract says otherwise.",
    },
    {
      label: "Radiotherapy and systemic therapy",
      detail: "Radiation and drugs after breast conservation or other pathways are neighbouring quotes.",
    },
    {
      label: "Travel, accommodation and visa-related expenses",
      detail: "Flights, medical visa fees, hotel, local transport and companion living costs sit outside every hospital estimate.",
    },
  ],

  approachComparison: {
    heading: "Sentinel lymph node biopsy vs lymph node dissection",
    intro: [
      "Sentinel biopsy and a full regional dissection are different operations with different purposes. Neither is universally better. Eligibility depends on cancer type, stage, previous treatment and the treating team's assessment. GAF Healthcare publishes a planning range only where a cost sheet already exists. Other rows describe relative complexity, not add-on prices.",
      "Many international letters fold sentinel sampling into lumpectomy or mastectomy. Read whether this band is standalone or combined. A combined sitting should name both operations.",
    ],
    rows: [
      {
        name: "Sentinel lymph node biopsy",
        relative: "This page — targeted nodal staging",
        detail:
          "Mapped first-draining nodes are removed and examined. Catalog planning range [INDIA_COST] when the letter matches that scope. Stay typically [STAY] when not combined with a larger resection.",
        procedure: "Sentinel Lymph Node Biopsy",
      },
      {
        name: "With breast-conserving surgery",
        relative: "Combined sitting — neighbouring lumpectomy sheet",
        detail:
          "Often the same anaesthetic as wide local excision when nodes look clinically clear. Price as combined surgery. Radiation after conservation is still a separate line.",
        procedure: "Breast-Conserving Surgery (Lumpectomy)",
      },
      {
        name: "With mastectomy or nipple-sparing mastectomy",
        relative: "Combined sitting — neighbouring mastectomy sheets",
        detail:
          "Sentinel sampling may be planned with breast removal when staging allows. The mastectomy letter is not this band. Ask whether both fees are inside one estimate.",
        procedure: "Mastectomy",
      },
      {
        name: "With oncoplastic breast surgery",
        relative: "Combined sitting — neighbouring oncoplastic sheet",
        detail:
          "Conservation-plus-reshape plus sentinel sampling is three jobs if all are done together. Name each on the letter.",
        procedure: "Oncoplastic Breast Surgery",
      },
      {
        name: "Axillary or regional lymph node dissection",
        relative: "More extensive clearance — no separate GAF sheet",
        detail:
          "Removes more nodes from the basin when clinically indicated. Typically more invasive, often a drain, different recovery and a different lymphoedema discussion. Not a doubled sentinel-biopsy price. Ask for an itemised letter.",
      },
    ],
  },

  overview: {
    what: [
      "Sentinel lymph node biopsy is a procedure used to identify and remove the first lymph nodes to which cancer cells are most likely to spread from a primary tumour. Lymph fluid from a tumour bed drains along predictable paths. The first node or nodes on that path are the sentinel nodes. Mapping finds them; surgery removes them; pathology examines them.",
      "The result is staging information. If the sentinel nodes are clear, a full dissection of the remaining basin may not be required. If they contain cancer, the treating team discusses what that means for further surgery, radiation and systemic therapy. The biopsy does not remove the primary tumour and does not, by itself, treat the cancer.",
      "Mapping methods vary. Many campuses use a radioisotope, a blue dye, or both. Some protocols use other localisation methods. The exact technique depends on the cancer, the nodal basin and what the hospital's nuclear-medicine and theatre teams actually run that week. This page does not prescribe a method.",
      "Results influence later planning. They do not replace imaging, the pathology of the primary tumour, or a multidisciplinary discussion. Treatment decisions are made by qualified clinicians after evaluation. Quotes may change if the surgical plan changes.",
    ],
    who: [
      "Sentinel lymph node biopsy may be considered when the nodal basin looks clinically clear and mapping is an established staging tool for that cancer — most often early breast cancer, melanoma, and selected other sites the treating team names. Breast cancer is the context most international patients on this site encounter, frequently alongside lumpectomy or mastectomy.",
      "It is not appropriate for every patient. Clinically involved nodes, some prior surgery or radiation to the basin, inflammatory breast cancer, and cancers for which mapping is not established are common reasons a surgeon recommends a different nodal plan — including a full dissection, or no nodal surgery. Previous extensive surgery can change drainage paths and make mapping less reliable.",
      "Eligibility depends on cancer type, stage, previous treatment and clinical assessment. This page does not diagnose and does not recommend sentinel biopsy or dissection for an individual patient.",
    ],
    how: [
      "Pre-operative evaluation confirms the primary diagnosis, whether the nodes look clinically involved, and whether mapping is the honest next step. Anaesthetic fitness follows.",
      "Lymphatic mapping comes next. A tracer, dye, or both is used so the first draining node or nodes can be found with a probe, visually, or both. Identification happens in theatre. The mapped nodes are removed. The rest of the basin is left unless the plan already includes a dissection.",
      "Pathology examines the nodes. Some teams use frozen section on the day so a completion dissection can be discussed immediately; others wait for paraffin sections over subsequent days. Immunohistochemistry may follow. Results feed the next clinical conversation — not a brochure outcome.",
    ],
    variations: [
      {
        label: "Breast cancer — axillary sentinel biopsy",
        detail:
          "The most common medical-travel context here. Often combined with conservation or mastectomy when nodes look clinically clear. Radiation after conservation remains a separate estimate.",
      },
      {
        label: "Melanoma — regional sentinel biopsy",
        detail:
          "Mapping from the primary skin site to the draining basin. The primary wide local excision may share the sitting or be staged. No separate GAF melanoma sheet — ask for an itemised letter.",
      },
      {
        label: "Selected other cancers",
        detail:
          "Gynaecological and some head-and-neck or gastrointestinal protocols use sentinel mapping when the treating team judges it established. Do not assume a breast protocol applies.",
      },
      {
        label: "Dual-tracer versus single-agent mapping",
        detail:
          "Radioisotope plus dye is a common combination. Single-agent mapping is also used. The letter should name the method the campus will actually run.",
      },
      {
        label: "Frozen-section versus paraffin only",
        detail:
          "Same-day frozen section can change the operation before you leave theatre. Paraffin reporting takes days. Neither is universally 'better'; they are different logistics and different bills.",
      },
    ],
    preparation: [
      "Expect imaging of the primary site, a biopsy with receptors where relevant, and a clinical assessment of the nodal basin. Bring discs, not photographs of films.",
      "Tell the team about allergies, pregnancy, previous surgery or radiation to the basin, and any blue-dye or isotope concerns they raise. Smoking and blood thinners should be on the list you send.",
      "If the biopsy will share a sitting with lumpectomy or mastectomy, both operations should be on the plan you fly on. A coordinator's paraphrase of 'they will check the nodes' is not that plan.",
    ],
    recovery: [
      "Hospital stay is typically [STAY]. Standalone sentinel biopsy often sits toward the shorter end — sometimes a night, occasionally day-care where the team is content. When the biopsy shares an anaesthetic with a larger cancer operation, stay follows that operation, not this band.",
      "The wound is usually small. Arm or limb exercises, if advised, start as the named team instructs — this page does not set a prescription. Seroma can occur. Lymphoedema risk is discussed relative to the basin and to whether a full dissection was also done; it is not identical for every patient.",
      "Pathology reporting typically takes several working days unless frozen section was used. Do not book an international flight that leaves before the named surgeon has a chance to review unexpected findings. Ranges here are not promises of recovery time. Individual recovery varies.",
    ],
  },

  fullPathway: {
    intro: [
      "The surgical estimate is only one line in a medical-travel budget. Procedure cost is not total medical travel cost. The primary cancer operation, radiotherapy, systemic therapy, flights and the days you live in the city are the rest of the trip.",
      "Ask the coordinator to quote each stage separately. Do not invent flight or hotel prices from this page. Add your own numbers: procedure + quoted stay + named extras + flights + visa + hotel nights × rate + local transport + attendant costs + a contingency for extra nights.",
    ],
    stages: [
      {
        label: "The sentinel-node procedure",
        detail: "Mapping, removal, anaesthesia, [STAY] and node pathology. This is the [INDIA_COST] line when the letter matches that scope.",
      },
      {
        label: "Primary cancer surgery, if combined",
        detail: "Lumpectomy, mastectomy or another resection is a neighbouring sheet unless named in the same estimate.",
      },
      {
        label: "Diagnostics",
        detail: "Pre-operative bloods may be inside. Staging PET-CT and specialised localisation are often not.",
      },
      {
        label: "Medicines",
        detail: "Inpatient drugs during the quoted stay are commonly bundled. Discharge prescriptions are not.",
      },
      {
        label: "Flights",
        detail: "Patient and attendant. Prices depend on origin and season — budget them yourself.",
      },
      {
        label: "Accommodation outside hospital",
        detail: "Hotel or apartment for the attendant during admission, and for both of you until the surgeon is content you can fly — often after pathology is back.",
      },
      {
        label: "Local transportation",
        detail: "Airport transfers and a return for wound or pathology review. Pair the hotel to the campus.",
      },
      {
        label: "Attendant expenses and visa",
        detail: "Food, lost work, companion visa and medical-visa fees. Visa issuance is not guaranteed on this page.",
      },
      {
        label: "Follow-up and additional stay",
        detail: "If nodes are involved, further surgery or radiation may keep you in the city. Quote those lines separately.",
      },
    ],
  },

  journey: [
    { label: "Share medical records", detail: "Imaging of the primary site, biopsy with receptors where done, a note on whether nodes feel or look involved, and a medicine list." },
    { label: "Medical review", detail: "A surgical oncologist reads the actual file rather than a coordinator's paraphrase." },
    { label: "Treatment recommendation", detail: "On camera, the operating consultant says whether sentinel biopsy, a full dissection, or no nodal surgery is the honest next step — and whether it shares a sitting with the primary operation." },
    { label: "Cost estimate", detail: "An itemised letter. Mapping method, pathology, the primary cancer operation and a possible dissection quoted separately if they are in view." },
    { label: "Travel planning", detail: "A hospital invitation typically supports a medical visa. Confirm duration if pathology wait or further surgery may follow. Visa issuance is not guaranteed." },
    { label: "Hospital admission", detail: "Usually the evening before or the morning of surgery, after an in-person examination and mapping as planned." },
    { label: "Procedure", detail: "Mapping, identification and removal of the sentinel node or nodes. Combined cancer surgery lengthens the sitting." },
    { label: "Pathology", detail: "Frozen section on the day if planned; otherwise paraffin reporting over subsequent working days." },
    { label: "Recovery", detail: "Inpatient [STAY] unless the primary operation dictates longer. Extra nights are a clinical decision, not a package failure." },
    { label: "Follow-up", detail: "Wound review and a conversation about what the nodes mean for radiation, drugs or further surgery." },
    { label: "Return-home planning", detail: "Operative note, pathology and a written handover. Fly when the named surgeon is content." },
  ],

  documents: [
    "Imaging of the primary tumour (mammogram, ultrasound, MRI, or other site-specific scans) on a disc rather than as photographs",
    "Core or excision biopsy histopathology, including receptors where relevant",
    "Any ultrasound or clinical note describing the nodal basin",
    "Prior operative notes if the basin or primary site has been operated or irradiated before",
    "Current medication list, allergies, and pregnancy status where relevant",
    "Passport, and a hospital invitation letter for the medical visa application",
    "Any insurance or reimbursement paperwork that must be completed before admission",
  ],

  cities: sentinelLymphNodeBiopsyCities,

  destinations: [
    {
      country: "India",
      stay: "[STAY]",
      positioning: "Catalog planning range",
      context:
        "Named surgical-oncology listings can be met on camera before travel. Listed consultants currently sit in all five metros, with the densest SLNB tagging in Delhi NCR.",
    },
    {
      country: "Turkey",
      costLevel: [1, 1.8],
      stay: "1–2 nights",
      positioning: "Packaged medical-travel market",
      context: "Verify whether mapping tracer, pathology, frozen section and a combined breast operation are inside the bundle.",
    },
    {
      country: "Thailand",
      costLevel: [1.2, 2.2],
      stay: "1–2 nights",
      positioning: "Private-hospital tourism",
      context: "Established international desks; isotope mapping and immunohistochemistry can sit well above India.",
    },
    {
      country: "United Arab Emirates",
      costLevel: [2, 3.4],
      stay: "1–2 nights",
      positioning: "Regional premium private care",
      context: "Short flights from much of Africa and West Asia; private oncology pricing is closer to Western self-pay.",
    },
    {
      country: "Singapore",
      costLevel: [2.6, 4.4],
      stay: "1–2 nights",
      positioning: "High-cost private hub",
      context: "Mature multidisciplinary process at premium private tariffs. Local subsidised and international private bills differ.",
    },
    {
      country: "Germany",
      costLevel: [2.2, 4.2],
      stay: "1–3 nights",
      positioning: "Certified European breast-unit care",
      context: "Structured multidisciplinary process; self-pay deposits are typical for visitors.",
    },
    {
      country: "United Kingdom",
      costLevel: [1.8, 3.4],
      stay: "0–2 nights",
      positioning: "Private self-pay (NHS generally not for visitors)",
      context: "NHS care is not available to most overseas visitors. Private self-pay applies; the primary cancer operation is quoted separately.",
    },
    {
      country: "United States",
      stay: "0–1 night",
      positioning: "Highest self-pay outlier",
      context: "Facility, surgeon, nuclear medicine and pathology bills often arrive separately. Compare against actual insurance liability.",
    },
  ],

  destinationIntro: [
    "The table below is a planning comparison for sentinel lymph node biopsy as a surgical episode, not a claim that every country maps nodes the same way or bundles the same pathology. India and United States figures come from the GAF Healthcare catalog. Other markets are modelled from the India midpoint using relative private-care cost levels, and are labelled as modelled estimates — indicative market ranges, not hospital quotations.",
    "India is often less expensive for a self-funding patient. That is not the same as 'always cheapest' or 'best'. Insurance coverage at home can reverse the arithmetic overnight. Hospital, surgeon, mapping method, pathology, whether another cancer operation shares the sitting, length of stay and what the package includes still decide the real bill in every country.",
  ],

  destinationNote:
    "International treatment costs vary by hospital, surgeon, cancer type, mapping technique, pathology, whether another cancer operation is performed simultaneously, length of stay and what is included in the package. Figures other than India and the United States are modelled planning estimates for orientation. They are not GAF quotations and not competitor quotes reproduced as ours.",

  cityIntro: [
    "City names below are working filter URLs — the same destination, city, specialty and procedure keys the rest of the site already uses. Open Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad for the city overlay and the filtered doctor and hospital cards.",
    "We do not invent a different surgical tariff for each metro. The approximate cost column uses the India planning band of [INDIA_COST] unless a researched city figure exists. What does change is the named consultant list, nuclear-medicine and frozen-section logistics, airport geography and how expensive a pathology-wait companion stay actually feels.",
  ],

  whyIndia: [
    "International patients consider India for sentinel lymph node biopsy when they are self-funding a cancer operation that includes nodal staging, when they want a named surgical oncologist before they fly, and when they need mapping, frozen section and the primary resection available in the same city rather than as a chain of referrals.",
    "Cost is the most visible reason. The catalog range [INDIA_COST] sits well below typical US cash-pay of [US_COST], because theatre, ward, pathology and consultant time are priced on a different cost base — not because staging is a lesser product by definition. Specialist lists in the five listed metros are deep enough that a second opinion on sentinel sampling versus dissection is often a car ride. English is the working language of most international desks.",
    "None of that means India is the right country for every patient, and none of it is a claim of 'best doctors in the world', guaranteed staging accuracy or 'cheapest in the world'. Someone whose insurance covers the pathway at home, who cannot wait for pathology abroad, or whose nodes are already clinically involved, may be better treated locally.",
  ],

  whyCostDiffers: [
    "The figure on this page is a planning range. The figure on a hospital letter is an estimate written against a named mapping method, a named surgeon, a room category and a stated number of nights. Those two documents are not supposed to match to the dollar.",
    "Same procedure name is not the same surgical plan. Cost may change because of cancer type, whether another operation shares the anaesthetic, mapping technique, number of nodes, frozen section, immunohistochemistry, campus tier, the named surgeon, extra nights and conversion to a full dissection.",
    "If two hospitals quote different numbers, read the line items before you assume one is overcharging. One letter may include isotope mapping and frozen section; the other may bill them later. One may be a flagship campus; the other a satellite. Higher cost is not a measure of better care.",
  ],

  planningClose: [
    "Sentinel lymph node biopsy in India is typically planned in the [INDIA_COST] band for mapping, node removal and the quoted stay, against [US_COST] self-pay in the United States. The variables that actually move that band are whether the biopsy stands alone, mapping method, pathology, campus tier, the named surgeon and whether a primary cancer operation or a full dissection is in the same letter.",
    "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad each have listed campuses for this surgical-oncology pathway. Named catalog consultants currently sit in all five cities, with the densest SLNB tagging in Delhi NCR. Doctor and hospital cards on this page link only to profiles that already exist in the catalog.",
    "A personalized quotation, written after records review, is the document you should travel on. Use this page to understand the questions, the inclusions and the trip around the procedure — not as a substitute for that letter. Final costs depend on clinical evaluation. Treatment plans are determined by qualified doctors.",
  ],

  questionsToAsk: [
    "Is the surgeon's fee included, and is the person on this call the person in theatre?",
    "Is anaesthesia included?",
    "Is lymphatic mapping included, and which method — isotope, dye, dual, or another — will you use?",
    "Is the tracer or dye included in this estimate?",
    "Is pathology of the sentinel nodes included? Frozen section? Immunohistochemistry?",
    "Are inpatient medicines included?",
    "How many hospital nights, and in which room category?",
    "Is a follow-up consultation before I fly included?",
    "Is a lumpectomy, mastectomy or other cancer operation part of this sitting, and is it priced?",
    "What happens if frozen section leads to a full dissection the same day?",
    "What happens if additional hospitalization is needed?",
    "What happens if additional pathology is required after I leave?",
    "Will you accept my home imaging, or will localisation be repeated?",
  ],

  faqs: [
    {
      q: "What is the cost of sentinel lymph node biopsy in India?",
      a: "Plan against [INDIA_COST] for mapping, removal of the sentinel nodes, anaesthesia and a stay of [STAY]. Typical US self-pay is [US_COST]. The final figure is an itemised hospital estimate after a surgical oncologist reviews your records. A combined breast operation is usually extra unless named.",
    },
    {
      q: "What is the cost of sentinel lymph node biopsy in Delhi NCR?",
      a: "Delhi NCR inherits the India planning range of [INDIA_COST]. There is no separate verified NCR tariff on this site. Campus tier inside the metro, mapping method and whether another cancer operation shares the sitting move the letter more than the city name.",
    },
    {
      q: "Is sentinel lymph node biopsy included in mastectomy cost?",
      a: "Usually not automatically. On GAF Healthcare, mastectomy and sentinel lymph node biopsy are neighbouring cost sheets. Immediate sentinel sampling may share an anaesthetic with mastectomy, but both operations should be named on the letter.",
    },
    {
      q: "How is sentinel lymph node biopsy different from lymph node dissection?",
      a: "Sentinel biopsy removes the mapped first-draining nodes for staging. A full axillary or regional dissection removes more nodes from the basin when clinically indicated. They differ in purpose, typical invasiveness and recovery. Neither is universally better. The treating team decides.",
    },
    {
      q: "How long does sentinel lymph node biopsy take?",
      a: "When performed alone, theatre time is usually about 30–90 minutes. Combined with lumpectomy or mastectomy, duration follows the primary cancer operation. Mapping in nuclear medicine may add time before you enter theatre.",
    },
    {
      q: "How long do I need to stay in India?",
      a: "Hospital stay is usually [STAY] when the biopsy is the main reason for admission. International patients often plan one to two weeks to include pathology reporting. Combined breast surgery and later radiotherapy lengthen the trip.",
    },
    {
      q: "Is pathology included in the cost?",
      a: "Histopathology of the sentinel nodes is commonly inside a surgical estimate. Frozen section, immunohistochemistry and send-out assays are frequently extra. Ask what the letter actually names.",
    },
    {
      q: "Does sentinel lymph node biopsy require general anaesthesia?",
      a: "Usually yes in the private campuses this site lists, especially when combined with another cancer operation. Confirm the anaesthetic plan on the estimate. This page does not set an anaesthetic for an individual.",
    },
    {
      q: "Is sentinel lymph node biopsy used for breast cancer?",
      a: "Often, when the axillary nodes look clinically clear and the treating team judges mapping appropriate. It is a common part of conservation or mastectomy planning. It is not used for every breast cancer.",
    },
    {
      q: "Is sentinel lymph node biopsy used for melanoma?",
      a: "It is an established staging tool in selected melanoma cases. The primary excision and the nodal basin should be named on the letter. GAF Healthcare does not publish a separate melanoma tariff; ask for an itemised estimate.",
    },
    {
      q: "What affects the cost of sentinel lymph node biopsy?",
      a: "Whether it stands alone or shares a sitting with another cancer operation, mapping technique, frozen-section pathology, campus tier, the named surgeon, room category and conversion to a full dissection. Higher price is not a measure of better care.",
    },
    {
      q: "Can international patients arrange sentinel lymph node biopsy in India?",
      a: "Yes. Share imaging and biopsy through the consult form. A coordinator routes the records to a listed surgical oncologist and returns suitable hospital options with an itemised planning estimate. There is no obligation to book.",
    },
    {
      q: "How do I choose a sentinel lymph node biopsy doctor?",
      a: "Use listed consultants whose catalog procedures include this operation, compare training and campus on the profile, and insist on speaking to the person who would operate. Placement on this page is not a league table.",
    },
    {
      q: "How do I compare hospital quotes?",
      a: "Line by line: surgeon, anaesthesia, mapping method and tracer, nights, room, pathology including frozen section, medicines, the primary cancer operation, dissection-if-positive policy, and extra-night policy. Same procedure name is not the same surgical plan.",
    },
  ],

  doctorHeading: "Doctors to consider for sentinel lymph node biopsy in India",
  doctorIntro:
    "These are consultants listed on GAF Healthcare whose catalog procedures include sentinel lymph node biopsy. Profiles show training, campus and procedures as held in the catalog. There are no rankings here, and no fee is paid for placement. Named listings currently sit in Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad, with the densest tagging in Delhi NCR.",
  hospitalHeading: "Hospitals to consider for sentinel lymph node biopsy in India",
  hospitalIntro:
    "Campuses on GAF Healthcare where this surgical-oncology pathway is listed, with accreditation as published by the hospital. Listing with the procedure family is not a claim of sentinel-node case volume or a ranking. Choose on the surgeon you met on camera, whether mapping and frozen section actually run that week, and whether the primary cancer operation can stay in the same city — not on a brand slogan.",

  relatedProcedures: [
    "Breast-Conserving Surgery (Lumpectomy)",
    "Mastectomy",
    "Nipple-Sparing Mastectomy",
    "Oncoplastic Breast Surgery",
    "Breast Reconstruction",
    "Intensity-Modulated Radiotherapy (IMRT)",
  ],

  figures: [
    {
      after: "overview",
      src: "/costs/sentinel-lymph-node-biopsy-process.webp",
      alt: "Illustration showing how sentinel lymph node biopsy identifies and removes sentinel lymph nodes for pathology",
      caption:
        "Mapping finds the first draining nodes. Surgery removes them. Pathology examines them. The biopsy stages; it does not treat the primary tumour.",
      fit: "contain",
    },
    {
      after: "how",
      src: "/costs/sentinel-lymph-node-biopsy-cost-factors.webp",
      alt: "Factors that affect the cost of sentinel lymph node biopsy in India",
      caption:
        "Surgeon, hospital, anaesthesia, mapping, pathology, medicines, stay and follow-up all sit in a surgical estimate. A combined cancer operation and extra pathology sit outside unless named.",
      fit: "contain",
    },
  ],
};
