import type { CostArticle } from "./types";
import { colectomyCities } from "./colectomy-cities";

export const colectomy: CostArticle = {
  procedure: "Colectomy",
  shortName: "colectomy",
  briefName: "Colectomy",
  duration: "approximately 2–4 hours",
  recoveryGlance: "Inpatient [STAY], then hotel step-down. Varies by patient.",
  slug: "colectomy",
  lastUpdated: "2026-09-10",
  seoTitle: "Colectomy Cost in India: Prices, Cities & Hospitals",
  seoDescription:
    "Colectomy cost in India is typically [INDIA_COST] for the operation and a stay of [STAY], against [US_COST] self-pay in the US. Compare hemicolectomy versus total colectomy, laparoscopic and robotic access, cities, listed surgeons and hospitals, and how to request a personalized estimate.",
  heading: "Colectomy Cost in India",
  heroLede:
    "Colectomy is removal of part or all of the colon — the large intestine that carries digested food toward the rectum. Families usually search the cost because a colonoscopy or CT has already shown a tumour, a complicated polyp, or another condition the treating team thinks cannot be managed without resection. What is taken out follows where the disease sits: a right hemicolectomy is not a sigmoid colectomy, and neither is a total colectomy. The remaining bowel is usually joined (anastomosis); in selected cases a temporary or permanent stoma is formed instead. Open, laparoscopic or robotic-assisted access, lymph-node assessment when cancer is the indication, and whether chemotherapy follows are clinical choices, not menu upgrades. Cost in India sits in a GAF planning range — currently [INDIA_COST] for the surgical episode and a stay of [STAY] — because theatre time, staplers, possible stoma, and leak-aware ward care are not priced like a two-night endoscopy. That band is for preliminary comparison, not a hospital quotation. The letter you travel on is written after a surgeon has seen the file. International patients should compare the complete package: colonoscopy and staging, the resection, stoma supplies if used, pathology, possible further oncology, flights and a companion who can stay for the admission — not only the surgery headline.",
  overviewHeading: "What is a colectomy?",
  whoHeading: "When is colectomy performed?",

  answer: [
    "Colectomy cost in India typically ranges from [INDIA_COST] for the resection, anastomosis or stoma as planned, anaesthesia, histopathology and a hospital stay of [STAY]. Typical US self-pay for a comparable surgical episode is [US_COST]. Theatre time is usually about two to four hours depending on which segment is removed, lymph-node fields and reconstruction.",
    "That figure is a planning range, not a hospital quotation. It usually covers the named surgeon, operating room, anaesthesia, the quoted room category and nights, routine inpatient medicines and specimen pathology. ICU nights inside the quoted stay may be inside; extra ICU days, colonoscopy, CT or PET-CT, stoma appliances after discharge, neoadjuvant or adjuvant chemotherapy, radiotherapy and management of an anastomotic leak are frequently not. Laparoscopic or robotic-assisted access, when offered, should be named — there is no separate GAF price sheet for those techniques.",
    "What moves the number most is extent (right or left hemicolectomy, sigmoid, subtotal or total), whether a stoma is formed, open versus minimally invasive access, leak or ileus that extends stay, campus tier, the named consultant, and whether chemotherapy or radiation sits in the same trip. International patients should budget the weeks around the knife — not only the theatre block.",
  ],

  indiaCost: [
    "There is no single colectomy price in India. The [INDIA_COST] band is a planning range for a colonic resection — theatre, anaesthesia, the named surgeon's fee, the quoted room, routine inpatient drugs, ICU as written into the estimate, and histopathology. The lower end typically reflects a straightforward right or sigmoid colectomy at a mid-tier NABH campus with an uncomplicated course toward the shorter end of [STAY]. The upper end typically reflects a flagship JCI campus, a senior colorectal or GI surgical oncologist, a subtotal or total colectomy, laparoscopic or robotic access where used, a private room, a stoma if planned, and a stay toward 10 nights.",
    "Treat that band as an order of magnitude until a surgeon who actually resects colon has seen colonoscopy, staging CT, biopsy, and whether emergency obstruction or perforation has already changed the plan. Same procedure name is not the same surgical plan. Right is not left. Open is not laparoscopic. A primary anastomosis is not a stoma. A letter written for one is not a letter written for another.",
    "City is a weaker driver than families expect. Campus tier, named high-dependency nights, whether stoma teaching and appliances are bundled, and whether the join is ileocolic or colorectal move the bill more than the metro name. An itemised estimate can only be written once a surgeon has read the file. GAF Healthcare matches centres that already run colorectal lists — that is a matching rule, not a ranking of hospitals.",
  ],

  costComponents: [
    {
      label: "Surgeon fee and surgical team",
      detail:
        "Usually bundled for the named surgical oncologist or surgical gastroenterologist. Confirm who is in theatre. A colorectal listing is not automatically a robotic sitting.",
    },
    {
      label: "Hospital and operating-room charges",
      detail:
        "Theatre time, staplers, energy devices and recovery. Laparoscopic or robotic access, when used, lengthens or reprices this block. Campus tier moves this line more than the city name.",
    },
    {
      label: "Anaesthesia",
      detail:
        "Anaesthetist fee and drugs for a case lasting typically two to four hours. Cardiopulmonary comorbidity may add a pre-operative clearance billed outside.",
    },
    {
      label: "ICU and critical-care monitoring",
      detail:
        "Early high-dependency or ICU care may be used after a long sitting, obstruction, or comorbidity. Nights inside the quoted stay may be bundled; extra days after a leak, ileus or pneumonia are typically extra.",
    },
    {
      label: "Diagnostic investigations",
      detail:
        "Standard bloods and ECG are often inside the admission. Colonoscopy, biopsy, CT, MRI and PET-CT are frequently extra if not already done at home.",
    },
    {
      label: "Pathology",
      detail:
        "Processing of the specimen and lymph nodes. Mismatch-repair, RAS and other assays, when ordered, are often billed later.",
    },
    {
      label: "Medicines, nutrition and stoma care",
      detail:
        "Inpatient analgesia, antibiotics, DVT prophylaxis and routine drugs during the quoted stay. Stoma appliances after discharge and dietitian follow-up are frequently extra. This page does not set a diet.",
    },
    {
      label: "Room charges and nursing",
      detail: "Written against a room category and a stated number of nights — typically [STAY]. Companion beds change the nightly rate.",
    },
    {
      label: "Postoperative care and follow-up",
      detail:
        "Inpatient bowel-function monitoring, wound care and the first clinic review before you fly are commonly included. Later colonoscopy, oncology visits and stoma-nurse follow-up are typically separate.",
    },
  ],

  whyQuotesDiffer:
    "Two honest estimates can differ because the operations are not the same. Right hemicolectomy is not left. Sigmoid is not total. Open is not laparoscopic. A primary anastomosis is not a diverting ileostomy. ICU nights inside the quote are not extra leak days. Campus tier and the named surgeon move the bill more than the city on the boarding pass. Higher cost is not a measure of better care.",

  costDrivers: [
    {
      label: "Type of colectomy",
      detail:
        "Right or left hemicolectomy, sigmoid, transverse, subtotal and total resections are different sittings. Extent follows disease location, not a brochure upgrade.",
    },
    {
      label: "Hospital category and campus tier",
      detail: "Flagship versus satellite units sit at different price levels. Ask which address, and which ICU, the letter is written against.",
    },
    {
      label: "Surgeon and multidisciplinary team",
      detail:
        "The estimate should name the consultant. Colorectal surgical oncology and surgical-gastroenterology lists are billed differently. That is not a ranking.",
    },
    {
      label: "City and companion logistics",
      detail:
        "Surgical fees cluster more tightly across the five metros than hotel bills for ten days. City choice matters most after discharge.",
    },
    {
      label: "Open versus minimally invasive surgery",
      detail:
        "Laparoscopic access, when offered, changes theatre time and consumables. No separate GAF sheet — ask whether it is actually available that week.",
    },
    {
      label: "Robotic assistance",
      detail:
        "Robotic-assisted colectomy, where clinically offered, is a different resource envelope. There is no separate GAF robotic-colectomy tariff.",
    },
    {
      label: "Disease location and cancer stage",
      detail:
        "Right-sided, left-sided, sigmoid and rectal disease change reconstruction and whether the case is a colectomy or a rectal resection. Complexity is why two patients with the same diagnosis receive different letters.",
    },
    {
      label: "Reconstruction and anastomosis",
      detail:
        "Ileocolic, colorectal and coloanal joins are different anastomoses. The letter should name the planned reconstruction.",
    },
    {
      label: "Lymph-node surgery",
      detail: "Oncologic colectomy usually includes regional nodes. Extent follows staging and the team's protocol, not a price list.",
    },
    {
      label: "Stoma requirements",
      detail:
        "A temporary or permanent stoma, when used, adds theatre, teaching, appliances and sometimes a later reversal. Ask whether those lines are inside the letter.",
    },
    {
      label: "Preoperative investigations",
      detail: "Colonoscopy, CT and PET-CT where indicated sit outside [INDIA_COST] unless named. Home tests can often be reviewed rather than repeated.",
    },
    {
      label: "ICU requirement and length of stay",
      detail:
        "Packages are written for [STAY], including some high-dependency care if named. Extra nights after a leak, ileus or pneumonia are usually billed fresh.",
    },
    {
      label: "Complications",
      detail: "Anastomotic leak, bleeding, ileus, wound infection and re-operation are new events unless the contract says otherwise.",
    },
    {
      label: "Additional cancer treatment",
      detail: "Neoadjuvant or adjuvant chemotherapy, radiation in selected rectal-adjacent settings, and later colonoscopy sit outside the surgical estimate.",
    },
  ],

  inclusions: [
    {
      label: "Consultation that leads into the admission",
      detail: "The in-person pre-operative review with the named surgeon, where bundled. Remote review before travel is arranged separately.",
    },
    {
      label: "Surgery by the named consultant",
      detail: "The resection and reconstruction as written on the estimate — not an unnamed robotic sitting or a total colectomy unless the letter says so.",
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
      detail: "Standard bloods, ECG and anaesthetic fitness assessment, where bundled.",
    },
    {
      label: "Pathology of the specimen",
      detail: "Processing of the resected colon and sampled nodes, where histopathology is bundled.",
    },
    {
      label: "Medicines during admission",
      detail: "Analgesia, antibiotics and routine drugs administered during the quoted stay.",
    },
  ],

  exclusions: [
    {
      label: "Staging endoscopy and imaging",
      detail: "Colonoscopy, biopsy, CT, MRI and PET-CT are frequently extra when ordered in India.",
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
      label: "Stoma supplies after discharge",
      detail: "Appliances, belts and stoma-nurse visits after you leave the ward are often extra. A later reversal is a separate estimate.",
    },
    {
      label: "Blood products",
      detail: "Transfusion, when required, is commonly billed per unit.",
    },
    {
      label: "Molecular pathology",
      detail: "Mismatch-repair, RAS, BRAF and other assays, when ordered, are frequently extra.",
    },
    {
      label: "Rehabilitation and later endoscopy",
      detail: "Physiotherapy after discharge and surveillance colonoscopy are typically separate visits.",
    },
    {
      label: "Travel, accommodation and visa-related expenses",
      detail: "Flights, medical visa fees, hotel after discharge, local transport and companion living costs sit outside every hospital estimate.",
    },
  ],

  approachComparison: {
    heading: "Types of colectomy and their cost implications",
    intro: [
      "Extent is chosen to clear the disease with a margin and restore a usable bowel passage, not to sell a named operation. GAF Healthcare publishes a planning range only where a cost sheet already exists. The rows below describe relative complexity. They are not a menu of add-on prices, and none is universally better.",
      "Selection depends on disease location, size, stage, whether the case is emergency or planned, previous treatment, anatomy and the reconstructive plan. This page does not recommend hemicolectomy, total colectomy, laparoscopic or robotic surgery for an individual patient.",
    ],
    rows: [
      {
        name: "Right hemicolectomy",
        relative: "Ascending colon and typically the last part of the small bowel; ileocolic join",
        detail:
          "Common when disease sits in the caecum or ascending colon. Reconstruction is usually an ileocolic anastomosis. No separate GAF sheet — relative complexity within [INDIA_COST].",
      },
      {
        name: "Left hemicolectomy",
        relative: "Descending colon; remaining bowel joined further down",
        detail:
          "Used when disease sits in the descending colon. Different vessels, different join. No separate GAF price.",
      },
      {
        name: "Sigmoid colectomy",
        relative: "Sigmoid colon removed; colorectal anastomosis where possible",
        detail:
          "Often discussed for sigmoid tumours or selected complicated diverticular disease. A low join is not the same leak map as a right-sided join.",
      },
      {
        name: "Transverse or segmental colectomy",
        relative: "A limited segment when location and margins allow",
        detail:
          "Sometimes used for selected lesions confined to one segment. Suitability is a clinical decision, not a cheaper product option.",
      },
      {
        name: "Subtotal or total colectomy",
        relative: "Most or all of the colon removed",
        detail:
          "Discussed when disease is extensive, when remaining colon would not be honest, or in selected inflammatory-bowel settings. Longer sitting. No separate GAF sheet.",
      },
      {
        name: "Proctocolectomy where relevant",
        relative: "Colon and rectum removed in selected cases",
        detail:
          "A different operation from a standard colectomy. Reconstruction or a permanent stoma depends on the remaining anus and the disease. Neighbouring rectal surgery may apply.",
      },
      {
        name: "Laparoscopic colectomy",
        relative: "Same oncological jobs through ports when offered",
        detail:
          "Theatre and stapler costs can sit toward the upper part of the band. Availability is a diary question. Not automatically better, and not priced as a separate GAF sheet.",
      },
      {
        name: "Robotic-assisted colectomy",
        relative: "Where offered — different resource envelope",
        detail:
          "Not universally available and not priced as a separate GAF colectomy sheet. Ask whether it is actually offered for your tumour that week.",
      },
      {
        name: "Rectal cancer surgery when the tumour is rectal",
        relative: "Different operation — neighbouring sheet",
        detail:
          "Tumours of the rectum are often treated as rectal resections (TME, LAR, APR) rather than colectomy. That is a different cost sheet, not a colectomy add-on.",
        procedure: "Rectal Cancer Surgery",
      },
    ],
  },

  overview: {
    what: [
      "A colectomy is surgical removal of part or all of the colon, the large intestine that receives contents from the small bowel, absorbs water and stores stool before it reaches the rectum. In cancer care it is done to take out the tumour with a margin of bowel and, where indicated, regional lymph nodes, then restore a path from remaining bowel to remaining bowel — or, when a join is not honest, to form a stoma.",
      "Right hemicolectomy removes the ascending colon. Left hemicolectomy removes the descending colon. Sigmoid colectomy removes the sigmoid. Subtotal colectomy leaves a small remnant; total colectomy removes the entire colon. Proctocolectomy, when used, also takes the rectum. Reconstruction — ileocolic or colorectal anastomosis, and a stoma in selected cases — is why the join, not only the incision, dominates recovery.",
      "Lymph-node assessment is part of staging and local control when the indication is cancer. Multidisciplinary care — surgical oncology, colorectal surgery, gastroenterology, medical oncology, radiation oncology, radiology, pathology, nutrition, stoma nursing, anaesthesia and critical care — frames whether surgery is even the next step.",
      "The exact operation depends on disease location, tumour size, cancer stage, bowel involvement, whether the case is emergency or planned, previous treatment and the surgeon's assessment. GAF Healthcare does not decide on this page whether resection is appropriate. Treatment plans are determined by qualified doctors after evaluation. Quotes may change if the surgical plan changes.",
    ],
    who: [
      "Colectomy may be considered for selected colon cancers and colorectal cancers when staging suggests resection can be completed with acceptable risk; for large or complicated polyps that cannot be removed endoscopically; for selected inflammatory-bowel disease; for complicated diverticular disease; and for obstruction or perforation when the treating team judges removal necessary. It is not the first or only treatment for every colon cancer.",
      "Not every colon cancer patient requires the same colectomy. Early lesions may be discussed for endoscopic resection. Metastatic disease is often a systemic-therapy conversation first. Rectal tumours are often a different operation. Fitness, nutrition and whether the case is an emergency all feed the decision.",
      "This page does not diagnose and does not recommend colectomy, endoscopic therapy or non-operative care for an individual patient. Eligibility depends on the underlying condition, stage, previous treatment and clinical assessment.",
    ],
    how: [
      "Pre-operative assessment confirms staging, cardiopulmonary fitness, nutrition and the planned reconstruction or stoma. Anaesthesia is general.",
      "Surgical access may be an open incision or laparoscopic or robotic ports when the team offers them. The diseased segment is identified and removed. Lymph nodes are taken according to the protocol when cancer is the indication. Remaining bowel is joined, or a stoma is formed when a join is not honest.",
      "You wake on a ward or in high-dependency care. Bowel function, wounds and, if present, the stoma are watched. Pathology of the specimen arrives days later and feeds the next oncology conversation. Exact steps differ by approach and segment; this page does not describe graphic operative detail.",
    ],
    variations: [
      {
        label: "Ileocolic anastomosis",
        detail:
          "Small bowel joined to remaining colon after a right-sided resection, when anatomy allows. A different leak map from a low colorectal join.",
      },
      {
        label: "Colorectal anastomosis",
        detail:
          "Remaining colon joined to rectum after a left-sided or sigmoid resection. Should be named on the letter if planned.",
      },
      {
        label: "Stoma — temporary or permanent",
        detail:
          "An opening of bowel onto the abdominal wall when a join is unsafe, when the remaining anus cannot be used, or as a diversion to protect a low anastomosis. Not required for every colectomy. Appliances after discharge are often extra. A later reversal is a separate estimate.",
      },
      {
        label: "Open versus laparoscopic versus robotic access",
        detail:
          "Ports instead of, or in addition to, an open incision when the team offers it. Oncological goals remain resection and reconstruction. Availability is not implied by a brand name. None is universally better. Emergency obstruction or dense scarring may still mean an open sitting.",
      },
    ],
    preparation: [
      "Expect colonoscopy with biopsy, CT of chest and abdomen, and MRI or PET-CT when indicated. Bloods, nutrition review and anaesthetic assessment come next. Home investigations can often be reviewed rather than repeated.",
      "If neoadjuvant chemotherapy is already under way, bring the protocol, dates and the latest imaging. Bowel-habit change, weight trend and whether you have already needed a stent or stoma belong in the file.",
      "Arrive with enough days before theatre for anaesthetic review and, if a stoma is possible, a marking and teaching visit. Do not book a same-week international flight after a long-haul landing into a two-to-four-hour resection.",
    ],
    recovery: [
      "Hospital stay is typically [STAY]. Early days watch bowel function, the anastomosis or stoma, and nutrition. Oral intake is advanced under clinical guidance. This page does not set a diet or a discharge date.",
      "Anastomotic leak, ileus, bleeding, wound infection and respiratory complications are among the problems that extend stay. Complication risk varies with fitness, disease, whether the case was emergency, and surgical complexity. Individual percentages are not published here.",
      "Pathology review decides adjuvant treatment. International patients often need further hotel days after discharge before a long-haul flight. Ranges on this page are not promises of recovery time. Individual recovery varies.",
    ],
  },

  fullPathway: {
    intro: [
      "The surgical estimate is only one line in a medical-travel budget. Procedure cost is not total medical travel cost. Staging, neoadjuvant therapy, extra ICU, stoma supplies, hotel after discharge, flights and a companion who can stay are the rest of the trip.",
      "Ask the coordinator to quote each stage separately. Do not invent flight or hotel prices from this page. Add your own numbers: surgery + quoted stay including named ICU nights + staging tests + drugs/radiation if in India + stoma appliances if used + flights + visa + hotel nights × rate + local transport + attendant costs + a contingency for extra nights or leak days.",
    ],
    stages: [
      {
        label: "Staging and cardiopulmonary work-up",
        detail: "Colonoscopy, biopsy, CT, PET-CT where indicated, bloods, nutrition. Often extra if done in India.",
      },
      {
        label: "Neoadjuvant treatment, if used",
        detail: "Chemotherapy before surgery in selected settings. Neighbouring cost sheet. Can add weeks in the city.",
      },
      {
        label: "The operation",
        detail:
          "Resection, anastomosis or stoma, anaesthesia, ICU as quoted, [STAY] and pathology. This is the [INDIA_COST] line when the letter matches that scope.",
      },
      {
        label: "Extra ICU, leak care, ileus, nutrition",
        detail: "Beyond the quoted nights. Ask what happens if hospitalization is extended.",
      },
      {
        label: "Stoma supplies and teaching",
        detail: "If a stoma is formed. Appliances after discharge and a later reversal are usually separate.",
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
    ],
  },

  journey: [
    { label: "Submit medical records", detail: "Colonoscopy report, biopsy, CT/PET-CT, a note on bowel habit and weight, and a medicine list." },
    { label: "Imaging and pathology review", detail: "A surgeon who resects colon reads the actual films and histology, not a coordinator's paraphrase." },
    { label: "Specialist assessment", detail: "On camera: whether resection, neoadjuvant treatment first, endoscopic therapy, or a non-operative path is the honest next step." },
    { label: "Multidisciplinary planning", detail: "Where appropriate, surgical, medical and radiation oncology agree sequence before a date is offered." },
    { label: "Preliminary treatment plan and cost estimate", detail: "An itemised surgical letter. Segment, reconstruction or stoma, ICU nights, drugs and radiation quoted separately if in view." },
    { label: "Hospital selection", detail: "Compare the surgeon you met, whether the campus runs colorectal lists, and how long a companion can stay in that city." },
    { label: "Travel planning", detail: "A hospital invitation typically supports a medical visa. Write duration for [STAY] plus hotel recovery. Visa issuance is not guaranteed." },
    { label: "Hospital admission", detail: "Usually a day or two before theatre after in-person examination, bowel preparation if advised, and any missing tests." },
    { label: "Surgery", detail: "Two to four hours depending on extent. Combined liver resection or emergency obstruction, if needed, lengthens the sitting." },
    { label: "Postoperative recovery", detail: "Ward or high-dependency across [STAY]. Extra nights are a clinical decision, not a package failure." },
    { label: "Pathology and further treatment", detail: "Specimen results feed adjuvant planning. Do not fly before that conversation if further treatment in India is likely." },
    { label: "Follow-up and return-home planning", detail: "Operative note, pathology, stoma plan if used, and a written handover. Fly when the named surgeon is content." },
  ],

  documents: [
    "Colonoscopy report and images, plus the biopsy histopathology",
    "CT chest and abdomen, and PET-CT or MRI if already done",
    "Stoma or stent notes if either has already been formed",
    "Neoadjuvant chemotherapy summary if treatment has started",
    "Weight trend, bowel-habit history, and current nutrition",
    "Cardiac and pulmonary test results, if available",
    "Current medication list, allergies, and smoking/alcohol history",
    "Passport, and a hospital invitation letter for the medical visa application",
  ],

  cities: colectomyCities,

  destinations: [
    {
      country: "India",
      stay: "[STAY]",
      positioning: "Catalog planning range",
      context:
        "Named colorectal-surgery listings can be met on camera before travel. Listed consultants currently sit in Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad.",
    },
    {
      country: "Turkey",
      costLevel: [1, 1.8],
      stay: "5–10 nights",
      positioning: "Packaged medical-travel market",
      context: "Verify whether ICU nights, leak management, colonoscopy, PET-CT, neoadjuvant drugs and stoma supplies are inside the bundle.",
    },
    {
      country: "Thailand",
      costLevel: [1.2, 2.2],
      stay: "5–10 nights",
      positioning: "Private-hospital tourism",
      context: "Established international desks; ICU extras and oncology drugs can sit well above India.",
    },
    {
      country: "United Arab Emirates",
      costLevel: [2, 3.4],
      stay: "5–10 nights",
      positioning: "Regional premium private care",
      context: "Short flights from much of Africa and West Asia; private oncology pricing is closer to Western self-pay.",
    },
    {
      country: "Singapore",
      costLevel: [2.6, 4.4],
      stay: "5–10 nights",
      positioning: "High-cost private hub",
      context: "Mature multidisciplinary process at premium private tariffs. Local subsidised and international private bills differ.",
    },
    {
      country: "Germany",
      costLevel: [2.2, 4.2],
      stay: "6–12 nights",
      positioning: "Certified European colorectal units",
      context: "Structured MDT process and longer inpatient norms; self-pay deposits are typical for visitors.",
    },
    {
      country: "United Kingdom",
      costLevel: [1.8, 3.4],
      stay: "5–10 nights",
      positioning: "Private self-pay (NHS generally not for visitors)",
      context: "NHS care is not available to most overseas visitors. Private self-pay applies; neoadjuvant treatment is quoted separately.",
    },
    {
      country: "United States",
      stay: "4–8 nights",
      positioning: "Highest self-pay outlier",
      context: "Facility, surgeon, ICU, pathology and later oncology bills often arrive separately. Compare against actual insurance liability.",
    },
  ],

  destinationIntro: [
    "The table below is a planning comparison for colectomy as a surgical episode, not a claim that every country uses the same extent or bundles stoma care the same way. India and United States figures come from the GAF Healthcare catalog. Other markets are modelled from the India midpoint using relative private-care cost levels, and are labelled as indicative planning estimates — not hospital quotations.",
    "India is often less expensive for a self-funding patient. That is not the same as 'always cheapest' or 'best'. Insurance coverage at home can reverse the arithmetic overnight. Hospital, surgeon, type of colectomy, surgical approach, disease complexity, reconstruction, stoma, ICU, length of stay, oncology treatment and what the package includes still decide the real bill in every country.",
  ],

  destinationNote:
    "International treatment costs vary by hospital, surgeon, type of colectomy, surgical approach, disease complexity, reconstruction, stoma requirements, length of stay, ICU requirements, oncology treatment and what is included in the package. These figures are intended for preliminary comparison only and are not final quotations. Figures other than India and the United States are modelled planning estimates. They are not GAF quotations and not competitor quotes reproduced as ours.",

  cityIntro: [
    "City names below are working filter URLs — the same destination, city, specialty and procedure keys the rest of the site already uses. Open Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad for the city overlay and the filtered doctor and hospital cards.",
    "We do not invent a different surgical tariff for each metro. The approximate cost column uses the India planning band of [INDIA_COST] unless a researched city figure exists. What does change is the named consultant list, hospital geography, airport access and how expensive a ten-day companion stay actually feels.",
  ],

  whyIndia: [
    "International patients consider India for colectomy when they are self-funding a colonic resection, when they want a named colorectal or GI surgical oncologist before they fly, and when they need staging, neoadjuvant treatment if used, and leak-aware postoperative care in the same city.",
    "Cost is the most visible reason. The catalog range [INDIA_COST] sits well below typical US cash-pay of [US_COST], because theatre, ward and consultant time are priced on a different cost base — not because the operation is a lesser product by definition. Several listed metros can hold an MDT conversation in one week. English is the working language of most international desks. Laparoscopic and robotic access are offered in some listed houses; availability is a diary question.",
    "None of that means India is the right country for every patient, and none of it is a claim of 'best colorectal surgeons in the world', guaranteed leak-free recovery or 'cheapest in the world'. Someone whose insurance covers the pathway at home, who cannot stay for two weeks, or whose staging shows resection is not honest, may be better treated locally.",
  ],

  whyCostDiffers: [
    "The figure on this page is a planning range. The figure on a hospital letter is an estimate written against a named segment, a named surgeon, a stated number of nights, and a reconstruction or stoma plan. Those two documents are not supposed to match to the dollar.",
    "The procedure name alone does not define the surgical plan. Cost may change because of right versus left hemicolectomy, partial versus extensive resection, open versus minimally invasive or robotic access, tumour location, stage, reconstruction, stoma, lymph-node fields, neoadjuvant treatment, ICU, pathology, extra nights and complications.",
    "If two hospitals quote different numbers, read the line items before you assume one is overcharging. One letter may include named high-dependency nights and stoma teaching; the other may bill them later. One may be a flagship campus; the other a satellite. Higher cost is not a measure of better treatment.",
  ],

  planningClose: [
    "Colectomy in India is typically planned in the [INDIA_COST] band for the resection, reconstruction or stoma as quoted, and the inpatient stay, against [US_COST] self-pay in the United States. The variables that actually move that band are extent, reconstruction, stoma, approach, campus tier, the named surgeon and whether chemotherapy or radiation is completed in the same trip.",
    "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad each have listed campuses for this surgical-oncology pathway. Named catalog consultants for colorectal cancer surgery currently sit in all five cities. Doctor and hospital cards on this page link only to profiles that already exist in the catalog.",
    "A personalized quotation, written after records review, is the document you should travel on. Cost ranges on this page are intended for preliminary planning and comparison only. Final treatment costs vary according to the patient's clinical condition, treatment plan, hospital, surgeon, surgical approach, length of stay and other factors. A personalized quotation should be obtained before making treatment or travel decisions.",
  ],

  questionsToAsk: [
    "Is the surgeon's fee included, and is the person on this call the person in theatre?",
    "Is this a right or left hemicolectomy, sigmoid, subtotal or total colectomy — and is that named on the letter?",
    "How is the bowel reconstructed — ileocolic anastomosis, colorectal anastomosis, or a stoma?",
    "If a stoma is possible, are marking, teaching and appliances included? Is a later reversal quoted?",
    "Is the approach open, laparoscopic or robotic-assisted, and is that named?",
    "Is lymph-node dissection included?",
    "How many ICU or high-dependency nights are included, and what happens if I need more?",
    "Are operating-room staplers and consumables included?",
    "Is anaesthesia included for a two-to-four-hour case?",
    "Are colonoscopy, CT, PET-CT and cardiopulmonary tests included?",
    "Is pathology of the specimen included? Mismatch-repair and other molecular tests?",
    "How many hospital nights and which room category?",
    "What happens if an anastomotic leak, ileus or extra hospitalization occurs?",
    "Is neoadjuvant or adjuvant chemotherapy included? Radiation?",
    "Is follow-up before I fly included?",
  ],

  faqs: [
    {
      q: "What is the cost of colectomy in India?",
      a: "Plan against [INDIA_COST] for the resection, reconstruction or stoma as quoted, anaesthesia, stay of [STAY] and specimen pathology. Typical US self-pay is [US_COST]. The final figure is an itemised hospital estimate after a surgeon reviews colonoscopy and staging. Oncology drugs and extra leak days are usually separate.",
    },
    {
      q: "What is the cost of colectomy in Delhi NCR?",
      a: "Delhi NCR inherits the India planning range of [INDIA_COST]. There is no separate verified NCR tariff on this site. Campus tier, extent and ICU course move the letter more than the city name.",
    },
    {
      q: "How much does colon cancer surgery cost in India?",
      a: "When the operation is colectomy, plan against [INDIA_COST] for the surgical episode. Colon cancer treatment can also include chemotherapy, radiation in selected settings, colonoscopy and surveillance — neighbouring quotes unless a letter combines them. Rectal tumours are often a different operation.",
    },
    {
      q: "What is included in the cost of colectomy?",
      a: "A typical surgical estimate covers the named surgeon, anaesthesia, theatre, quoted ward or ICU nights, routine inpatient medicines and specimen pathology. Confirm staplers, stoma appliances, extra ICU, colonoscopy and drugs.",
    },
    {
      q: "What is the difference between right and left hemicolectomy?",
      a: "Right hemicolectomy removes the ascending colon and usually joins small bowel to remaining colon. Left hemicolectomy removes the descending colon. Location of disease decides which, not a price list. Neither is universally better.",
    },
    {
      q: "What is the difference between partial and total colectomy?",
      a: "Partial or segmental resections leave most of the colon. Total colectomy removes the entire colon. Extent follows how much bowel is involved. A total resection is a different sitting and a different letter.",
    },
    {
      q: "Does laparoscopic colectomy cost more?",
      a: "It can, because of theatre time and consumables, but GAF Healthcare does not publish a separate laparoscopic-colectomy tariff. Ask whether laparoscopic access is actually offered for your disease and how that changes the itemised letter.",
    },
    {
      q: "Does robotic colectomy cost more?",
      a: "Robotic assistance, where offered, is a different resource envelope. There is no separate GAF robotic-colectomy price. Do not treat a neighbouring robotics sheet as this operation's quote.",
    },
    {
      q: "How long is hospital stay after colectomy?",
      a: "Typically [STAY] on this sheet. Leaks, ileus or stoma problems extend that. This page does not promise a discharge date.",
    },
    {
      q: "How long should an international patient stay in India?",
      a: "Plan the inpatient [STAY] plus further hotel days until the named surgeon is content you can fly — often around two weeks in country for an uncomplicated course, longer if neoadjuvant treatment or a leak occurs.",
    },
    {
      q: "What tests are needed before colectomy?",
      a: "The actual work-up depends on the patient and plan. Commonly: colonoscopy with biopsy, CT, MRI or PET-CT where indicated, bloods, and nutrition and anaesthesia assessment. Home tests can often be reviewed rather than repeated.",
    },
    {
      q: "Is a stoma always required after colectomy?",
      a: "No. Many planned colectomies are completed with a primary anastomosis. A temporary or permanent stoma may be used when a join is unsafe, in emergency obstruction, or when remaining bowel cannot be joined honestly. Suitability is a clinical decision.",
    },
    {
      q: "Does colectomy require chemotherapy?",
      a: "Sometimes, before or after surgery, depending on type, stage and MDT assessment. Those treatments are separate estimates. This page does not prescribe a sequence.",
    },
    {
      q: "Does colectomy require radiation therapy?",
      a: "Radiation is more often discussed for selected rectal cancers than for a standard colon resection. Suitability is a clinical decision after staging. Radiation is a neighbouring quote.",
    },
    {
      q: "How do I choose a colorectal surgeon?",
      a: "Use listed consultants whose catalog procedures include colorectal cancer surgery or colectomy, compare training and campus on the profile, and insist on speaking to the person who would operate. Placement is not a league table.",
    },
    {
      q: "How do I choose a hospital for colon cancer surgery?",
      a: "Start with the surgeon you can meet on camera, then the campus where that surgeon actually operates, whether ICU has managed anastomotic leaks, and whether chemotherapy — if needed — can stay in the same city. There is no ranking here.",
    },
    {
      q: "What costs may be excluded from a colectomy package?",
      a: "Often: colonoscopy, CT, PET-CT, neoadjuvant drugs, radiation, extra ICU, leak management, stoma appliances after discharge, molecular tests, hotel, flights and visa-related expenses. Read the exclusions as carefully as the inclusions.",
    },
    {
      q: "How do I compare colectomy quotations?",
      a: "Line by line: surgeon, segment (right versus left versus total), reconstruction or stoma, approach, ICU nights, staplers, pathology, extra-night and leak policy, colonoscopy, chemotherapy and radiation. Same procedure name is not the same surgical plan.",
    },
  ],

  doctorHeading: "Doctors to consider for colectomy in India",
  doctorIntro:
    "These are consultants listed on GAF Healthcare whose catalog procedures include colorectal cancer surgery, colectomy or hemicolectomy. Profiles show training, campus and procedures as held in the catalog. There are no rankings here, and no fee is paid for placement. Named listings currently sit in Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad.",
  hospitalHeading: "Hospitals to consider for colectomy in India",
  hospitalIntro:
    "Campuses on GAF Healthcare where this surgical-oncology pathway is listed, with accreditation as published by the hospital. Listing with the procedure family is not a claim of colectomy volume or a ranking. Choose on the surgeon you met on camera, whether the house runs colorectal lists, and whether staging and neoadjuvant treatment can stay in the same city — not on a brand slogan.",

  relatedProcedures: [
    "Rectal Cancer Surgery",
    "Gastrectomy",
    "Esophagectomy",
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
    { href: "/costs/rectal-cancer-surgery", label: "rectal cancer surgery cost in India" },
    { href: "/costs/gastrectomy", label: "gastrectomy cost in India" },
    { href: "/costs/esophagectomy", label: "esophagectomy cost in India" },
    { href: "/doctors?destination=India&procedure=Colectomy", label: "colectomy surgeons in India" },
    { href: "/hospitals?destination=India&procedure=Colectomy", label: "colectomy hospitals in India" },
  ],

  figures: [
    {
      after: "overview",
      src: "/costs/colectomy-procedure-overview.webp",
      alt: "Medical illustration showing the main steps of colectomy from removal of diseased colon tissue to bowel reconstruction",
      caption:
        "Resection removes the diseased colon. Anastomosis restores a bowel passage. A stoma is used only when the treating team judges a join is not honest — not as a default product.",
      fit: "contain",
    },
    {
      after: "how",
      src: "/costs/types-of-colectomy.webp",
      alt: "Illustration comparing major types of colectomy including right hemicolectomy, left hemicolectomy and total colectomy",
      caption:
        "Right, left, sigmoid and total colectomy, and minimally invasive access, are clinical choices. None is universally better. Technique follows disease location and the operating team's assessment.",
      fit: "contain",
    },
    {
      after: "journey",
      src: "/costs/colectomy-patient-journey-india.webp",
      alt: "Illustration of the colectomy treatment journey for international patients travelling to India",
      caption:
        "Records, specialist review and a written estimate come before a ticket. ICU extras, stoma supplies, drugs and travel sit outside the surgical range unless named.",
      fit: "contain",
    },
  ],
};
