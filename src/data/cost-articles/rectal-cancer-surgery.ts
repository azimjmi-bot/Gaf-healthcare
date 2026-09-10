import type { CostArticle } from "./types";
import { rectalCancerSurgeryCities } from "./rectal-cancer-surgery-cities";

export const rectalCancerSurgery: CostArticle = {
  procedure: "Rectal Cancer Surgery",
  shortName: "rectal cancer surgery",
  briefName: "Rectal Cancer Surgery",
  duration: "approximately 3–6 hours",
  recoveryGlance: "Inpatient [STAY], then hotel step-down. Varies by patient.",
  slug: "rectal-cancer-surgery",
  lastUpdated: "2026-09-10",
  seoTitle: "Rectal Cancer Surgery Cost in India: Prices, Cities & Hospitals",
  seoDescription:
    "Rectal cancer surgery cost in India is typically [INDIA_COST] for the operation and a stay of [STAY], against [US_COST] self-pay in the US. Compare LAR, APR and TME as clinical choices, cities, listed colorectal surgeons and hospitals, and how to request a personalized estimate.",
  heading: "Rectal Cancer Surgery Cost in India",
  heroSubtitle:
    "Compare planning ranges for rectal cancer surgery in India, understand what can affect the final hospital quotation, and explore relevant colorectal surgeons and hospitals across major Indian cities.",
  introduction: [
    "Families usually search rectal cancer surgery cost after a colonoscopy or MRI has already shown a tumour in the rectum — the last part of the large bowel, above the anal canal. Surgery may be part of treatment, but it is rarely the whole story. Tumour height from the anal sphincter, stage, and whether chemotherapy or radiation is given first all change the operation that is actually booked.",
    "Rectal surgery is not the same sitting as a colectomy. The pelvis is narrower, the mesorectum matters, and a join low in the pelvis is a different leak map from an ileocolic anastomosis. Low anterior resection (LAR) aims to remove the diseased rectum and reconnect bowel when the sphincter can be kept. Abdominoperineal resection (APR) removes the rectum and anus when that is not honest, and a permanent colostomy follows. Total mesorectal excision (TME) is the oncologic envelope around many of these operations, not a separate product. Cost in India sits in a GAF planning range — currently [INDIA_COST] for the surgical episode and a stay of [STAY] — because theatre time, possible diversion, and leak-aware ward care are not priced like a two-night endoscopy. That band is a planning range, not a hospital quotation. The letter you travel on is written after a surgeon has seen the file. International patients should compare the complete pathway: MRI pelvis, neoadjuvant chemoradiation if used, the resection, stoma supplies if used, pathology, possible further oncology, flights and a companion — not only the surgery headline.",
  ],
  overviewHeading: "What is rectal cancer surgery?",
  whoHeading: "When is surgery used for rectal cancer?",

  answer: [
    "Rectal cancer surgery cost in India typically ranges from [INDIA_COST] for the resection, reconstruction or stoma as planned, anaesthesia, histopathology and a hospital stay of [STAY]. Typical US self-pay for a comparable surgical episode is [US_COST]. Theatre time is usually about three to six hours depending on LAR versus APR, TME, reconstruction and whether a diversion is formed.",
    "That figure is a planning range, not a hospital quotation. It usually covers the named surgeon, operating room, anaesthesia, the quoted room category and nights, routine inpatient medicines and specimen pathology. ICU nights inside the quoted stay may be inside; extra ICU days, colonoscopy, MRI pelvis, PET-CT, neoadjuvant chemoradiation, stoma appliances after discharge and management of an anastomotic leak are frequently not. Laparoscopic or robotic-assisted access, when offered, should be named — there is no separate GAF price sheet for those techniques.",
    "What moves the number most is operation type (LAR, APR, local excision), tumour height, whether a temporary or permanent stoma is formed, open versus minimally invasive access, neoadjuvant treatment in the same trip, leak or ileus that extends stay, campus tier and the named consultant. International patients should budget the weeks around the knife — and the weeks of radiation if they sit in India — not only the theatre block.",
  ],

  indiaCost: [
    "There is no single rectal cancer surgery price in India. The [INDIA_COST] band is a planning range for a rectal resection — theatre, anaesthesia, the named surgeon's fee, the quoted room, routine inpatient drugs, ICU as written into the estimate, and histopathology. The lower end typically reflects a straightforward sphincter-preserving resection at a mid-tier NABH campus with an uncomplicated course toward the shorter end of [STAY]. The upper end typically reflects a flagship JCI campus, a senior colorectal surgical oncologist, an APR or a low LAR with diversion, laparoscopic or robotic access where used, a private room, and a stay toward 12 nights.",
    "Treat that band as an order of magnitude until a surgeon who actually resects rectum has seen colonoscopy, MRI pelvis, staging CT, biopsy, and whether neoadjuvant treatment has already been given. Same procedure name is not the same surgical plan. LAR is not APR. Open is not laparoscopic. A primary anastomosis is not a permanent colostomy. A letter written for one is not a letter written for another.",
    "Surgery cost is not total rectal cancer treatment cost. Neoadjuvant chemoradiation, restaging MRI, adjuvant drugs and later stoma reversal sit on neighbouring estimates. City is a weaker driver than families expect. Campus tier, named high-dependency nights, whether stoma teaching is bundled, and whether radiation happens in the same visa window move the bill more than the metro name. GAF Healthcare matches centres that already run rectal lists — that is a matching rule, not a ranking of hospitals.",
  ],

  costComponents: [
    {
      label: "Surgeon fee and surgical team",
      detail:
        "Usually bundled for the named surgical oncologist or surgical gastroenterologist. Confirm who is in theatre. A colorectal listing is not automatically a robotic TME.",
    },
    {
      label: "Hospital and operating-room charges",
      detail:
        "Theatre time, staplers, energy devices and recovery. Laparoscopic or robotic access, when used, lengthens or reprices this block. Campus tier moves this line more than the city name.",
    },
    {
      label: "Anaesthesia",
      detail:
        "Anaesthetist fee and drugs for a case lasting typically three to six hours. Cardiopulmonary comorbidity may add a pre-operative clearance billed outside.",
    },
    {
      label: "ICU and critical-care monitoring",
      detail:
        "Early high-dependency or ICU care may be used after a long pelvic sitting or comorbidity. Nights inside the quoted stay may be bundled; extra days after a leak, ileus or pneumonia are typically extra.",
    },
    {
      label: "Diagnostic investigations",
      detail:
        "Standard bloods and ECG are often inside the admission. Colonoscopy, biopsy, CT, MRI pelvis and PET-CT are frequently extra if not already done at home.",
    },
    {
      label: "Pathology",
      detail:
        "Processing of the specimen, mesorectum and lymph nodes. Mismatch-repair and other assays, when ordered, are often billed later.",
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
        "Inpatient bowel-function monitoring, wound care, stoma teaching if used, and the first clinic review before you fly are commonly included. Later endoscopy, oncology visits and radiation reviews are typically separate.",
    },
  ],

  whyQuotesDiffer:
    "Two honest estimates can differ because the operations are not the same. LAR is not APR. TME with a low join is not a local excision. Open is not laparoscopic. A covering ileostomy is not a permanent colostomy. Neoadjuvant chemoradiation in the same trip is not a surgical letter. Campus tier and the named surgeon move the bill more than the city on the boarding pass. Higher cost is not a measure of better care.",

  costDrivers: [
    {
      label: "Type of operation",
      detail: "Local excision, LAR, APR and pelvic exenteration are different sittings. Extent follows tumour height and stage, not a brochure upgrade.",
    },
    {
      label: "Tumour location and cancer stage",
      detail:
        "Distance from the anal sphincter, T-stage and nodal status change whether sphincter preservation is even discussed. Complexity is why two patients with the same diagnosis receive different letters.",
    },
    {
      label: "Surgical complexity",
      detail: "Re-operation, prior radiation, bulky tumours and emergency obstruction lengthen theatre and ICU. Ask what the letter assumes.",
    },
    {
      label: "Surgeon and multidisciplinary team",
      detail:
        "The estimate should name the consultant. Colorectal surgical oncology, radiation oncology and medical oncology are billed differently. That is not a ranking.",
    },
    {
      label: "Hospital category and campus tier",
      detail: "Flagship versus satellite units sit at different price levels. Ask which address, which ICU and which radiation bunker the letter is written against.",
    },
    {
      label: "City and companion logistics",
      detail:
        "Surgical fees cluster more tightly across the five metros than hotel bills for two to five weeks if radiation sits in India. City choice matters most after discharge.",
    },
    {
      label: "Open versus laparoscopic surgery",
      detail:
        "Laparoscopic access, when offered, changes theatre time and consumables. No separate GAF sheet — ask whether it is actually available that week.",
    },
    {
      label: "Robotic assistance",
      detail:
        "Robotic-assisted rectal resection, where clinically offered, is a different resource envelope. There is no separate GAF robotic-rectal tariff.",
    },
    {
      label: "Lymph-node surgery and TME",
      detail: "Oncologic rectal resection usually includes the mesorectum. TME is a surgical principle, not a priced add-on on this sheet.",
    },
    {
      label: "Reconstruction and stoma",
      detail:
        "Primary anastomosis, a covering ileostomy, or a permanent colostomy are different letters. Appliances after discharge and a later reversal are often extra.",
    },
    {
      label: "ICU requirement and length of stay",
      detail:
        "Packages are written for [STAY], including some high-dependency care if named. Extra nights after a leak, ileus or pelvic collection are usually billed fresh.",
    },
    {
      label: "Pathology",
      detail: "Specimen processing may be bundled. Molecular tests, when ordered, are frequently extra.",
    },
    {
      label: "Complications",
      detail: "Anastomotic leak, bleeding, ileus, wound infection, urinary issues and re-operation are new events unless the contract says otherwise.",
    },
    {
      label: "Chemotherapy, radiation and neoadjuvant treatment",
      detail:
        "Chemoradiation or total neoadjuvant therapy, when used, is a neighbouring quote and can add weeks in the city. Surgery cost is not total treatment cost.",
    },
    {
      label: "Preoperative and postoperative treatment",
      detail: "Restaging MRI, adjuvant drugs and later stoma reversal sit outside the surgical estimate unless named.",
    },
  ],

  inclusions: [
    {
      label: "Consultation that leads into the admission",
      detail: "The in-person pre-operative review with the named surgeon, where bundled. Remote review before travel is arranged separately.",
    },
    {
      label: "Surgery by the named consultant",
      detail: "The resection and reconstruction as written on the estimate — not an unnamed robotic TME or an APR unless the letter says so.",
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
      detail: "Processing of the resected rectum, mesorectum and sampled nodes, where histopathology is bundled.",
    },
    {
      label: "Medicines during admission",
      detail: "Analgesia, antibiotics and routine drugs administered during the quoted stay.",
    },
  ],

  exclusions: [
    {
      label: "Staging endoscopy and imaging",
      detail: "Colonoscopy, biopsy, CT, MRI pelvis and PET-CT are frequently extra when ordered in India.",
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
      detail: "Pelvic-floor physiotherapy, sexual-function review and surveillance endoscopy are typically separate visits.",
    },
    {
      label: "Travel, accommodation and visa-related expenses",
      detail: "Flights, medical visa fees, hotel after discharge, local transport and companion living costs sit outside every hospital estimate.",
    },
  ],

  approachComparison: {
    heading: "Types of rectal cancer surgery",
    intro: [
      "Extent is chosen to clear the tumour with a margin and, where honest, restore bowel continuity — not to sell a named operation. GAF Healthcare publishes a planning range only where a cost sheet already exists. The rows below describe relative complexity. They are not a menu of add-on prices, and none is universally better.",
      "Selection depends on tumour location, size, stage, distance from the sphincter, response to preoperative treatment, anatomy and the reconstructive plan. This page does not recommend LAR, APR, laparoscopic or robotic surgery for an individual patient.",
    ],
    rows: [
      {
        name: "Local / transanal excision",
        relative: "Selected early tumours; limited local removal",
        detail:
          "Sometimes discussed for carefully staged early lesions. Not a substitute for TME when nodes or deeper invasion are in play. No separate GAF sheet.",
      },
      {
        name: "Low anterior resection (LAR)",
        relative: "Diseased rectum removed; sphincter kept when clinically possible",
        detail:
          "Remaining bowel is joined. A temporary diverting stoma is often used to protect a low anastomosis. Sphincter preservation is not a promise. Neighbouring sheet exists for LAR as a named gastro procedure.",
        procedure: "Low Anterior Resection (LAR)",
      },
      {
        name: "Abdominoperineal resection (APR)",
        relative: "Rectum and anus removed; permanent colostomy",
        detail:
          "Considered when a join to remaining anus would not be oncologically honest. Not chosen because it is cheaper or more expensive. Neighbouring APR sheet exists.",
        procedure: "Abdominoperineal Resection (APR)",
      },
      {
        name: "Total mesorectal excision (TME)",
        relative: "Oncologic envelope around many rectal resections",
        detail:
          "The mesorectum is removed with the rectum when the protocol calls for it. TME is a surgical principle, not a product upgrade. Neighbouring TME sheet exists.",
        procedure: "Total Mesorectal Excision (TME)",
      },
      {
        name: "Pelvic exenteration in selected advanced cases",
        relative: "More extensive pelvic clearance when adjacent organs are involved",
        detail:
          "A different sitting from standard LAR or APR. Suitability is a multidisciplinary decision. No separate GAF rectal-exenteration tariff on this sheet.",
      },
      {
        name: "Laparoscopic rectal surgery",
        relative: "Same oncological jobs through ports when offered",
        detail:
          "Theatre and stapler costs can sit toward the upper part of the band. Not automatically better, and not priced as a separate GAF sheet.",
      },
      {
        name: "Robotic-assisted rectal surgery",
        relative: "Where offered — different resource envelope",
        detail:
          "Not universally available and not priced as a separate GAF rectal sheet. Ask whether it is actually offered for your tumour that week.",
      },
      {
        name: "Colectomy when the tumour is colonic",
        relative: "Different operation — neighbouring sheet",
        detail:
          "Tumours of the colon, not the rectum, are treated as colectomy. That is a different cost sheet, not a rectal add-on.",
        procedure: "Colectomy",
      },
    ],
  },

  accessComparison: {
    heading: "Open vs laparoscopic vs robotic rectal cancer surgery",
    intro: [
      "Surgical access is how the team reaches the pelvis. It is not a separate cancer operation. Open, laparoscopic and robotic-assisted sittings can all be used to perform LAR, APR or TME when the treating team judges them suitable. None is universally better, and laparoscopic or robotic access is not suitable for every patient.",
      "Suitability depends on the patient, the tumour, anatomy after chemoradiation if given, surgeon expertise and clinical circumstances — including emergency obstruction or a very narrow pelvis. There is no separate GAF price sheet for laparoscopic or robotic rectal cancer surgery.",
    ],
    rows: [
      {
        name: "Open",
        access: "One abdominal incision; perineal incision as well if APR is required",
        method: "Direct visualisation of the pelvis. Still used when ports are not honest or not available.",
        resources: "Standard theatre; no robotic console. ICU follows the sitting, not the incision length.",
        recovery: "Wound recovery can be slower. Bowel function, leak watch and stoma teaching still dominate the stay.",
        cost: "Often the lower theatre-consumable line. Not automatically the cheaper total bill if the sitting is more complex.",
      },
      {
        name: "Laparoscopic",
        access: "Several small ports, sometimes with a small extraction incision",
        method: "Same oncological jobs — resection, mesorectum, reconstruction or stoma — through ports when offered.",
        resources: "Laparoscopic stack, staplers and trained team. Conversion to open remains possible.",
        recovery: "Some patients mobilise sooner. Leak risk, ileus and stoma teaching are not removed by ports.",
        cost: "Theatre time and staplers can sit toward the upper part of the band. No separate GAF laparoscopic-rectal tariff.",
      },
      {
        name: "Robotic-assisted",
        access: "Ports plus a robotic console where the hospital actually offers it that week",
        method: "Wristed instruments in a narrow pelvis when the team uses them. Still LAR, APR or TME — not a different cancer.",
        resources: "Console time, trained team and often a higher consumable envelope. Not universally available.",
        recovery: "Recovery still follows anastomosis, stoma and prior radiation — not the brand of robot.",
        cost: "A different resource envelope. There is no separate GAF robotic-rectal tariff. Paying more does not by itself preserve the sphincter.",
      },
    ],
  },

  topicSections: [
    {
      id: "what-is-lar",
      heading: "What is low anterior resection?",
      paragraphs: [
        "Low anterior resection (LAR) removes the affected portion of the rectum and, when clinically possible, keeps the anal sphincter. Remaining bowel is joined (anastomosis) so stool can still pass through the anus. A temporary diverting stoma — often an ileostomy — is frequently used to protect a low join while it heals.",
        "Sphincter preservation depends on tumour location, anatomy, disease characteristics, response to preoperative treatment and surgical considerations. Distance from the anal sphincter is the practical question on MRI. A high rectal tumour and a tumour sitting on the sphincter are not the same sitting.",
        "LAR is not a promise that bowel function will feel normal afterwards. Low joins can change frequency, urgency and continence. This page does not predict function for a named patient. Neighbouring GAF cost sheets exist for LAR as a named surgical-gastroenterology procedure; those figures are still planning ranges, not a menu upgrade on this rectal cancer surgery sheet.",
      ],
    },
    {
      id: "what-is-apr",
      heading: "What is abdominoperineal resection (APR)?",
      paragraphs: [
        "Abdominoperineal resection (APR) removes the rectum and the anus when a join to remaining anus would not be oncologically honest. A permanent colostomy follows, because there is no remaining anal canal to reconnect. APR is considered when tumour height, sphincter involvement, poor function, or anatomy after treatment make sphincter-preserving surgery the wrong operation.",
        "APR is not chosen solely because of cost or surgeon preference. It is a clinical decision after staging and, often, after neoadjuvant treatment. It differs from LAR in the obvious way: LAR aims to keep the anus when that is honest; APR does not.",
        "A permanent colostomy is a life change, not a billing line. Appliance teaching, bags after discharge and later stoma complications sit outside many surgical estimates. Neighbouring GAF sheets exist for APR as a named procedure. This page does not invent a separate APR dollar figure inside the rectal cancer surgery band.",
      ],
    },
    {
      id: "what-is-tme",
      heading: "What is total mesorectal excision (TME)?",
      paragraphs: [
        "The mesorectum is the fatty tissue that wraps the rectum and contains lymph nodes. Total mesorectal excision (TME) means removing the rectum together with that envelope, in the anatomical plane used for many rectal cancers. It is an oncologic surgical principle, not a product upgrade and not a separately priced add-on on this sheet.",
        "TME may be performed as part of LAR or APR. Partial mesorectal excision is sometimes used for higher tumours where the whole envelope is not required. Your treating team decides the plane after MRI and operative assessment. This page does not overstate outcomes or quote a TME success rate.",
        "A letter that names 'rectal surgery' without saying whether the mesorectum is taken is harder to compare than a letter that describes TME. Neighbouring GAF sheets exist for TME as a named gastro procedure; again, those are planning ranges, not a surcharge table for this page.",
      ],
    },
    {
      id: "stoma",
      heading: "Will I need a stoma after rectal cancer surgery?",
      paragraphs: [
        "Not every rectal cancer patient requires a permanent stoma. Three different things get called 'a stoma' in conversation, and they are not priced the same. A temporary ileostomy (small-bowel diversion) is often used to protect a low anastomosis after LAR and may be reversed later — a separate estimate. A temporary colostomy uses large bowel. A permanent colostomy follows APR, because the anus is removed.",
        "Diversion may be used because the join is low, because tissues have been radiated, because healing is uncertain, because the sitting was an emergency for obstruction, or because reconstruction is not honest. Tumour location matters. Anastomotic healing influences the decision. Emergency or complex surgery can change the plan that was discussed on camera.",
        "This page does not predict which applies to a named patient. Ask whether marking, teaching and the first weeks of appliances are inside the letter, and what happens if a temporary stoma is not reversed in India.",
      ],
    },
    {
      id: "neoadjuvant",
      heading: "Can chemotherapy or radiation be needed before surgery?",
      paragraphs: [
        "Yes — for many locally advanced rectal cancers, treatment starts before the knife. Neoadjuvant treatment means chemotherapy, radiation, or both, given to shrink or downstage disease and, in selected protocols, to improve the chance of a complete resection. Chemoradiation (chemotherapy given with pelvic radiation) is a common sequence. Total neoadjuvant therapy, where most systemic treatment is also given before surgery, is used in selected settings.",
        "After neoadjuvant treatment, teams typically restage — often with MRI pelvis — before confirming LAR, APR, a watch-and-wait discussion in highly selected complete responses, or a non-operative path. Response can change the surgical plan. It can also leave the plan unchanged. One sequence is not appropriate for everyone.",
        "The treatment plan depends on cancer stage, tumour characteristics and multidisciplinary assessment involving a colorectal or GI surgical oncologist, medical oncologist, radiation oncologist, radiologist and pathologist. Chemotherapy and radiation are neighbouring GAF cost sheets. They are not automatically inside the [INDIA_COST] surgical band. This page does not prescribe a sequence for an individual patient.",
      ],
    },
    {
      id: "preoperative-tests",
      heading: "What tests are needed before rectal cancer surgery?",
      paragraphs: [
        "The exact work-up depends on the patient's condition and what has already been done. A typical file includes colonoscopy with biopsy, CT of chest and abdomen, and MRI of the pelvis to map tumour height and the mesorectal plane. Chest imaging may already be inside the CT. Blood tests, tumour-related laboratory testing where appropriate, nutritional assessment and anaesthetic assessment come next.",
        "PET-CT is used in selected circumstances, not as a default product. Molecular tests on the biopsy, when ordered, feed oncology rather than theatre time. Home investigations can often be reviewed rather than repeated — if discs open. Repeating MRI because media cannot be read is a common extra on international quotes.",
        "This page does not set a test menu for a named patient. Ask which of colonoscopy, biopsy, CT, MRI pelvis, PET-CT, pathology and cardiopulmonary tests are inside the surgical letter.",
      ],
    },
    {
      id: "recovery-challenges",
      heading: "What can affect recovery after rectal cancer surgery?",
      paragraphs: [
        "Hospital stay is typically [STAY]. Early recovery watches bowel function, the anastomosis or stoma, urine, wounds and nutrition. Activity increases under clinical guidance. Pathology review then decides whether further oncology is needed. This page does not prescribe a diet or guarantee a recovery date.",
        "Problems that can extend stay or change the bill include infection, bleeding, anastomotic leak, ileus, wound problems, urinary complications, sexual-function concerns related to pelvic nerves, other nerve-related pelvic effects, stoma-related challenges and nutritional difficulties. Prior radiation, a very low join, comorbidity and emergency surgery all influence risk. Individual percentages are not published here.",
        "International patients often need further hotel days after discharge before a long-haul flight — longer if radiation is completed in India. Ranges on this page are not promises of recovery time. Individual recovery varies.",
      ],
    },
  ],

  overview: {
    what: [
      "Rectal cancer surgery removes cancerous tissue from the rectum — the last segment of large bowel before the anal canal — with a margin of surrounding tissue and, where indicated, the mesorectum and regional lymph nodes. Reconstruction may restore bowel continuity, or a stoma may be formed when a join is not honest.",
      "Tumour location matters more here than in most abdominal cancer operations. A high rectal tumour and a very low tumour that sits on the sphincter are not the same sitting. LAR aims to keep the anus when clinically possible. APR removes the rectum and anus and ends in a permanent colostomy. TME describes taking the mesorectal envelope with the specimen — an oncologic principle, not a named upgrade.",
      "The exact operation depends on tumour location, size, stage, distance from the anal sphincter, involvement of nearby structures, response to preoperative treatment, overall health and the surgeon's assessment. GAF Healthcare does not decide on this page whether resection is appropriate. Treatment plans are determined by qualified doctors after evaluation. Quotes may change if the surgical plan changes.",
    ],
    who: [
      "Surgery may be considered for selected early rectal cancers, for locally advanced disease after neoadjuvant treatment, and in other settings where the multidisciplinary team judges resection can be completed with acceptable risk. It is not the first or only treatment for every rectal cancer. Some patients start with chemoradiation or total neoadjuvant therapy; some early lesions are discussed for local excision; metastatic disease is often a systemic-therapy conversation first.",
      "Planning typically involves a colorectal or GI surgical oncologist, medical oncologist, radiation oncologist, radiologist, pathologist, gastroenterologist, anaesthetist, and nutrition or stoma-support professionals. Sequence is a clinical decision after staging — not a package itinerary.",
      "This page does not diagnose and does not recommend LAR, APR, local excision or non-operative care for an individual patient. Eligibility depends on cancer type, stage, previous treatment and clinical assessment.",
    ],
    how: [
      "Pre-operative assessment confirms staging (often including MRI pelvis), cardiopulmonary fitness, nutrition and the planned reconstruction or stoma. Anaesthesia is general.",
      "Surgical access may be an open incision or laparoscopic or robotic ports when the team offers them. The tumour is identified. The affected rectum or segment is removed. Mesorectal and nodal tissue is taken according to the protocol. Remaining bowel is joined when appropriate, or a stoma is formed.",
      "You wake on a ward or in high-dependency care. Bowel function, wounds, urinary catheters and, if present, the stoma are watched. Pathology of the specimen arrives days later and feeds the next oncology conversation. Exact steps differ by approach; this page does not describe graphic operative detail.",
    ],
    variations: [
      {
        label: "Low anterior resection (LAR)",
        detail:
          "Diseased rectum removed with the aim of preserving the anal sphincter when clinically possible. Remaining bowel is joined. A temporary diverting stoma is often used to protect a low anastomosis. Sphincter preservation is not guaranteed.",
      },
      {
        label: "Abdominoperineal resection (APR)",
        detail:
          "Rectum and anus removed when a sphincter-preserving join would not be oncologically honest. A permanent colostomy follows. APR is a clinical choice based on tumour location and anatomy, not cost or convenience.",
      },
      {
        label: "Total mesorectal excision (TME)",
        detail:
          "The mesorectum — fatty tissue around the rectum that contains lymph nodes — is removed with the specimen when the protocol calls for it. TME is how many rectal cancers are resected, not a separate billed product on this sheet.",
      },
      {
        label: "Stoma — temporary or permanent",
        detail:
          "A covering ileostomy may protect a low join and be reversed later. A permanent colostomy follows APR. Not every rectal cancer patient requires a permanent stoma. Appliances after discharge are often extra.",
      },
      {
        label: "Open versus laparoscopic versus robotic access",
        detail:
          "Ports instead of, or in addition to, an open incision when the team offers it. Oncological goals remain resection and reconstruction. None is universally better. Prior radiation, a narrow pelvis or emergency obstruction may still mean an open sitting.",
      },
    ],
    preparation: [
      "Expect colonoscopy with biopsy, CT of chest and abdomen, and MRI of the pelvis. PET-CT is used in selected circumstances. Bloods, nutrition review and anaesthetic assessment come next. Home investigations can often be reviewed rather than repeated.",
      "If neoadjuvant chemoradiation or chemotherapy is already under way, bring the protocol, dates, the latest MRI and a note on bowel habit and continence. Prior stoma or stent notes belong in the file.",
      "Arrive with enough days before theatre for anaesthetic review and, if a stoma is possible, a marking and teaching visit. Do not book a same-week international flight after a long-haul landing into a three-to-six-hour pelvic resection.",
    ],
    recovery: [
      "Hospital stay is typically [STAY]. Early days watch bowel function, the anastomosis or stoma, urinary function and nutrition. Oral intake is advanced under clinical guidance. This page does not set a diet or a discharge date.",
      "Anastomotic leak, ileus, bleeding, wound infection, urinary complications, sexual-function concerns related to pelvic nerves, and respiratory problems are among the issues that can extend stay. Complication risk varies with fitness, tumour height, prior radiation and surgical complexity. Individual percentages are not published here.",
      "Pathology review decides adjuvant treatment. International patients often need further hotel days after discharge before a long-haul flight — longer if radiation is completed in India. Ranges on this page are not promises of recovery time. Individual recovery varies.",
    ],
  },

  fullPathway: {
    intro: [
      "The surgical estimate is only one line in a medical-travel budget. Surgery cost is not total rectal cancer treatment cost and is not total medical-tourism cost. Staging MRI, neoadjuvant chemoradiation, extra ICU, stoma supplies, hotel after discharge, flights and a companion who can stay are the rest of the trip.",
      "Ask the coordinator to quote each stage separately. Do not invent flight or hotel prices from this page. Add your own numbers: surgery + quoted stay including named ICU nights + staging tests + chemo/radiation if in India + stoma appliances if used + flights + visa + hotel nights × rate + local transport + attendant costs + a contingency for extra nights or leak days.",
    ],
    stages: [
      {
        label: "Staging and cardiopulmonary work-up",
        detail: "Colonoscopy, biopsy, CT, MRI pelvis, PET-CT where indicated, bloods, nutrition. Often extra if done in India.",
      },
      {
        label: "Neoadjuvant treatment, if used",
        detail: "Chemoradiation or chemotherapy before surgery. Neighbouring cost sheets. Can add weeks in the city.",
      },
      {
        label: "The operation",
        detail:
          "Resection, reconstruction or stoma, anaesthesia, ICU as quoted, [STAY] and pathology. This is the [INDIA_COST] line when the letter matches that scope.",
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
        detail: "Further drugs or radiation if pathology and the MDT advise it.",
      },
      {
        label: "Flights and visa",
        detail: "Patient and attendant. Medical visa duration should cover radiation weeks if those sit in India. Issuance is not guaranteed.",
      },
      {
        label: "Accommodation after discharge",
        detail: "Hotel or apartment near the campus until the surgeon is content you can fly.",
      },
    ],
  },

  journey: [
    { label: "Submit medical records", detail: "Colonoscopy, biopsy, MRI pelvis, CT, a note on bowel habit and continence, and a medicine list." },
    { label: "Imaging and pathology review", detail: "A surgeon who resects rectum reads the actual films and histology, not a coordinator's paraphrase." },
    { label: "Specialist assessment", detail: "On camera: whether resection now, neoadjuvant treatment first, local excision, or a non-operative path is the honest next step." },
    { label: "Staging and multidisciplinary planning", detail: "Surgical, medical and radiation oncology agree sequence before a date is offered." },
    { label: "Preliminary treatment plan and cost estimate", detail: "An itemised surgical letter. LAR versus APR, reconstruction or stoma, ICU nights, drugs and radiation quoted separately if in view." },
    { label: "Hospital selection", detail: "Compare the surgeon you met, whether the campus runs rectal lists and radiation, and how long a companion can stay." },
    { label: "Travel planning", detail: "A hospital invitation typically supports a medical visa. Write duration for [STAY] plus hotel recovery and radiation weeks if planned. Visa issuance is not guaranteed." },
    { label: "Hospital admission", detail: "Usually a day or two before theatre after in-person examination, stoma marking if needed, and any missing tests." },
    { label: "Surgery", detail: "Three to six hours depending on LAR versus APR and reconstruction. Combined adjacent-organ resection, if needed, lengthens the sitting." },
    { label: "Postoperative recovery", detail: "Ward or high-dependency across [STAY]. Extra nights are a clinical decision, not a package failure." },
    { label: "Pathology and further treatment", detail: "Specimen results feed adjuvant planning. Do not fly before that conversation if further treatment in India is likely." },
    { label: "Follow-up and return-home planning", detail: "Operative note, pathology, stoma plan if used, and a written handover. Fly when the named surgeon is content." },
  ],

  documents: [
    "Colonoscopy report and images, plus the biopsy histopathology",
    "MRI pelvis, CT chest and abdomen, and PET-CT if already done",
    "Neoadjuvant chemoradiation or chemotherapy summary if treatment has started",
    "Stoma or stent notes if either has already been formed",
    "Weight trend, bowel-habit and continence history, and current nutrition",
    "Cardiac and pulmonary test results, if available",
    "Current medication list, allergies, and smoking/alcohol history",
    "Passport, and a hospital invitation letter for the medical visa application",
  ],

  cities: rectalCancerSurgeryCities,

  destinations: [
    {
      country: "India",
      stay: "[STAY]",
      positioning: "Catalog planning range",
      context:
        "Named colorectal listings can be met on camera before travel. Listed consultants currently sit in Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad.",
    },
    {
      country: "Turkey",
      costLevel: [1, 1.8],
      stay: "6–12 nights",
      positioning: "Packaged medical-travel market",
      context: "Verify whether ICU nights, leak management, MRI pelvis, neoadjuvant radiation, and stoma supplies are inside the bundle.",
    },
    {
      country: "Thailand",
      costLevel: [1.2, 2.2],
      stay: "6–12 nights",
      positioning: "Private-hospital tourism",
      context: "Established international desks; radiation weeks and ICU extras can sit well above India.",
    },
    {
      country: "United Arab Emirates",
      costLevel: [2, 3.4],
      stay: "6–12 nights",
      positioning: "Regional premium private care",
      context: "Short flights from much of Africa and West Asia; private oncology pricing is closer to Western self-pay.",
    },
    {
      country: "Singapore",
      costLevel: [2.6, 4.4],
      stay: "6–12 nights",
      positioning: "High-cost private hub",
      context: "Mature multidisciplinary process at premium private tariffs. Local subsidised and international private bills differ.",
    },
    {
      country: "Germany",
      costLevel: [2.2, 4.2],
      stay: "7–14 nights",
      positioning: "Certified European colorectal units",
      context: "Structured MDT process and longer inpatient norms; self-pay deposits are typical for visitors.",
    },
    {
      country: "United Kingdom",
      costLevel: [1.8, 3.4],
      stay: "6–12 nights",
      positioning: "Private self-pay (NHS generally not for visitors)",
      context: "NHS care is not available to most overseas visitors. Private self-pay applies; neoadjuvant treatment is quoted separately.",
    },
    {
      country: "United States",
      stay: "5–10 nights",
      positioning: "Highest self-pay outlier",
      context: "Facility, surgeon, ICU, pathology and later oncology bills often arrive separately. Compare against actual insurance liability.",
    },
  ],

  destinationIntro: [
    "The table below is a planning comparison for rectal cancer surgery as a surgical episode, not a claim that every country uses the same LAR/APR mix or bundles neoadjuvant radiation the same way. India and United States figures come from the GAF Healthcare catalog. Other markets are modelled from the India midpoint using relative private-care cost levels, and are labelled as indicative planning estimates — not hospital quotations.",
    "India is often less expensive for a self-funding patient. That is not the same as 'always cheapest' or 'best'. Insurance coverage at home can reverse the arithmetic overnight. Hospital, surgeon, type of resection, surgical approach, disease complexity, reconstruction, stoma, ICU, length of stay, oncology treatment and what the package includes still decide the real bill in every country.",
  ],

  destinationNote:
    "International treatment costs vary by hospital, surgeon, type of rectal resection, surgical approach, disease complexity, reconstruction, stoma requirements, length of stay, ICU requirements, oncology treatment and what is included in the package. These figures are intended for preliminary comparison only and are not final quotations. Figures other than India and the United States are modelled planning estimates. They are not GAF quotations and not competitor quotes reproduced as ours.",

  cityIntro: [
    "City names below are working filter URLs — the same destination, city, specialty and procedure keys the rest of the site already uses. Open Delhi NCR, Mumbai, Bengaluru, Chennai or Hyderabad for the city overlay and the filtered doctor and hospital cards.",
    "We do not invent a different surgical tariff for each metro. The approximate cost column uses the India planning band of [INDIA_COST] unless a researched city figure exists. What does change is the named consultant list, whether radiation can stay on the same plot, airport access and how expensive a multi-week companion stay actually feels.",
  ],

  whyIndia: [
    "International patients consider India for rectal cancer surgery when they are self-funding a pelvic resection, when they want a named colorectal surgeon before they fly, and when they need MRI staging, neoadjuvant radiation if used, and leak-aware postoperative care in the same city.",
    "Cost is the most visible reason. The catalog range [INDIA_COST] sits well below typical US cash-pay of [US_COST], because theatre, ward and consultant time are priced on a different cost base — not because the operation is a lesser product by definition. Several listed metros can hold an MDT conversation in one week. English is the working language of most international desks. Laparoscopic and robotic access are offered in some listed houses; availability is a diary question.",
    "None of that means India is the right country for every patient, and none of it is a claim of 'best colorectal surgeons in the world', guaranteed sphincter preservation or 'cheapest in the world'. Someone whose insurance covers the pathway at home, who cannot stay for radiation weeks, or whose staging shows resection is not honest, may be better treated locally.",
  ],

  whyCostDiffers: [
    "The figure on this page is a planning range. The figure on a hospital letter is an estimate written against a named operation (LAR or APR), a named surgeon, a stated number of nights, and a reconstruction or stoma plan. Those two documents are not supposed to match to the dollar.",
    "The procedure name alone does not define the surgical plan. Cost may change because of tumour location, stage, LAR versus APR, open versus minimally invasive or robotic access, TME, reconstruction, stoma, neoadjuvant chemoradiation, ICU, pathology, extra nights and complications.",
    "If two hospitals quote different numbers, read the line items before you assume one is overcharging. One letter may include named high-dependency nights and a covering ileostomy; the other may bill them later. One may include radiation weeks; the other may not. Higher cost is not a measure of better treatment.",
  ],

  planningClose: [
    "Rectal cancer surgery in India is typically planned in the [INDIA_COST] band for the resection, reconstruction or stoma as quoted, and the inpatient stay, against [US_COST] self-pay in the United States. The variables that actually move that band are LAR versus APR, reconstruction, stoma, approach, campus tier, the named surgeon and whether chemotherapy or radiation is completed in the same trip.",
    "Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad each have listed campuses for this surgical-oncology pathway. Named catalog consultants for colorectal and rectal cancer surgery currently sit in all five cities. Doctor and hospital cards on this page link only to profiles that already exist in the catalog.",
    "A personalized quotation, written after records review, is the document you should travel on. Cost ranges on this page are intended for preliminary planning and comparison only. Final treatment costs vary according to the patient's clinical condition, treatment plan, hospital, surgeon, surgical approach, length of stay and other factors. A personalized quotation should be obtained before making treatment or travel decisions.",
  ],

  questionsToAsk: [
    "Is the surgeon's fee included, and is the person on this call the person in theatre?",
    "Is this LAR, APR, local excision or another resection — and is that named on the letter?",
    "Is TME part of the planned sitting?",
    "How is the bowel reconstructed? Is a temporary or permanent stoma expected?",
    "If a stoma is possible, are marking, teaching and appliances included? Is a later reversal quoted?",
    "Is the approach open, laparoscopic or robotic-assisted, and is that named?",
    "How many ICU or high-dependency nights are included, and what happens if I need more?",
    "Are operating-room staplers and consumables included?",
    "Is anaesthesia included for a three-to-six-hour case?",
    "Are colonoscopy, MRI pelvis, CT, PET-CT and cardiopulmonary tests included?",
    "Is pathology of the specimen included? Molecular tests?",
    "Is neoadjuvant chemoradiation or chemotherapy included? Adjuvant treatment?",
    "How many hospital nights and which room category?",
    "What happens if an anastomotic leak, ileus or extra hospitalization occurs?",
    "Is follow-up before I fly included?",
  ],

  faqs: [
    {
      q: "What is the cost of rectal cancer surgery in India?",
      a: "Plan against [INDIA_COST] for the resection, reconstruction or stoma as quoted, anaesthesia, stay of [STAY] and specimen pathology. Typical US self-pay is [US_COST]. The final figure is an itemised hospital estimate after a surgeon reviews MRI and colonoscopy. Chemoradiation and extra leak days are usually separate.",
    },
    {
      q: "What is the cost of rectal cancer surgery in Delhi NCR?",
      a: "Delhi NCR inherits the India planning range of [INDIA_COST]. There is no separate verified NCR tariff on this site. Campus tier, LAR versus APR and ICU course move the letter more than the city name.",
    },
    {
      q: "How much does rectal cancer treatment cost in India?",
      a: "When the billed episode is surgery, plan against [INDIA_COST]. Complete treatment can also include MRI, neoadjuvant chemoradiation, adjuvant drugs and surveillance — neighbouring quotes unless a letter combines them. Surgery cost is not total treatment cost.",
    },
    {
      q: "What is included in rectal cancer surgery cost?",
      a: "A typical surgical estimate covers the named surgeon, anaesthesia, theatre, quoted ward or ICU nights, routine inpatient medicines and specimen pathology. Confirm staplers, stoma appliances, extra ICU, MRI and drugs.",
    },
    {
      q: "What is the difference between LAR and APR?",
      a: "LAR removes the diseased rectum and aims to keep the anal sphincter when clinically possible, joining remaining bowel. APR removes the rectum and anus and ends in a permanent colostomy. Tumour height and anatomy decide which, not a price list.",
    },
    {
      q: "What is total mesorectal excision?",
      a: "TME is removal of the rectum together with the surrounding mesorectal tissue that contains lymph nodes, when the protocol calls for it. It is an oncologic surgical principle used with many rectal resections, not a separately priced upgrade on this sheet.",
    },
    {
      q: "Will I need a stoma after rectal cancer surgery?",
      a: "Not every patient requires a permanent stoma. A temporary diverting stoma is often used to protect a low anastomosis after LAR. A permanent colostomy follows APR. Suitability is a clinical decision after staging.",
    },
    {
      q: "Is a colostomy permanent?",
      a: "After APR, yes — the anus is removed. A covering ileostomy after LAR is often intended as temporary and may be reversed later, which is a separate estimate. This page does not predict which applies to a named patient.",
    },
    {
      q: "Does laparoscopic rectal cancer surgery cost more?",
      a: "It can, because of theatre time and consumables, but GAF Healthcare does not publish a separate laparoscopic-rectal tariff. Ask whether laparoscopic access is actually offered for your tumour and how that changes the itemised letter.",
    },
    {
      q: "Does robotic rectal cancer surgery cost more?",
      a: "Robotic assistance, where offered, is a different resource envelope. There is no separate GAF robotic-rectal price. Do not treat a neighbouring robotics sheet as this operation's quote.",
    },
    {
      q: "Is chemotherapy needed before rectal cancer surgery?",
      a: "Sometimes, alone or with radiation, depending on stage and MDT assessment. Those treatments are separate estimates. This page does not prescribe a sequence.",
    },
    {
      q: "Is radiation needed before rectal cancer surgery?",
      a: "Often discussed for locally advanced rectal cancer as neoadjuvant chemoradiation. Not every patient needs it. Radiation is a neighbouring quote and can add weeks in the city.",
    },
    {
      q: "How long is hospital stay after rectal cancer surgery?",
      a: "Typically [STAY] on this sheet. Leaks, ileus or stoma problems extend that. This page does not promise a discharge date.",
    },
    {
      q: "How long should international patients stay in India?",
      a: "Plan the inpatient [STAY] plus further hotel days until the named surgeon is content you can fly. If neoadjuvant or adjuvant radiation sits in India, the in-country stay is measured in weeks, not days.",
    },
    {
      q: "How do I choose a colorectal surgeon?",
      a: "Use listed consultants whose catalog procedures include rectal or colorectal cancer surgery, compare training and campus on the profile, and insist on speaking to the person who would operate. Placement is not a league table.",
    },
    {
      q: "How do I choose a hospital for rectal cancer treatment?",
      a: "Start with the surgeon you can meet on camera, then the campus where that surgeon actually operates, whether MRI and radiation can stay on the plot, and whether ICU has managed anastomotic leaks. There is no ranking here.",
    },
    {
      q: "What costs may be excluded from a surgery package?",
      a: "Often: colonoscopy, MRI pelvis, neoadjuvant chemoradiation, extra ICU, leak management, stoma appliances after discharge, molecular tests, hotel, flights and visa-related expenses. Read the exclusions as carefully as the inclusions.",
    },
    {
      q: "How should I compare rectal cancer surgery quotations?",
      a: "Line by line: surgeon, LAR versus APR, TME, reconstruction or stoma, approach, ICU nights, staplers, pathology, extra-night and leak policy, MRI, chemotherapy and radiation. Same procedure name is not the same surgical plan.",
    },
  ],

  doctorHeading: "Doctors to consider for rectal cancer surgery in India",
  cityDoctorHeading: "Rectal Cancer Surgeons in [CITY]",
  doctorIntro:
    "These are consultants listed on GAF Healthcare whose catalog procedures include rectal cancer surgery, colorectal cancer surgery, LAR, APR or TME. Profiles show training, campus and procedures as held in the catalog. There are no rankings here, and no fee is paid for placement. Named listings currently sit in Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad.",
  hospitalHeading: "Hospitals to consider for rectal cancer surgery in India",
  cityHospitalHeading: "Rectal Cancer Surgery Hospitals in [CITY]",
  hospitalIntro:
    "Campuses on GAF Healthcare where this surgical-oncology pathway is listed, with accreditation as published by the hospital. Listing with the procedure family is not a claim of rectal-resection volume or a ranking. Choose on the surgeon you met on camera, whether the house runs rectal lists and radiation, and whether staging can stay in the same city — not on a brand slogan.",

  relatedProcedures: [
    "Colectomy",
    "Low Anterior Resection (LAR)",
    "Abdominoperineal Resection (APR)",
    "Total Mesorectal Excision (TME)",
    "Chemotherapy",
    "Neoadjuvant Chemotherapy",
    "Intensity-Modulated Radiotherapy (IMRT)",
  ],

  relatedBlogs: [
    { href: "/costs?specialty=Surgical+Oncology", label: "surgical oncology costs in India" },
    { href: "/costs?specialty=Medical+Oncology", label: "medical oncology costs in India" },
    { href: "/costs?specialty=Radiation+Oncology", label: "radiation oncology costs in India" },
    { href: "/costs?specialty=Surgical+Gastroenterology", label: "surgical gastroenterology costs in India" },
    { href: "/costs/colectomy", label: "colectomy cost in India" },
    { href: "/costs/gastrectomy", label: "gastrectomy cost in India" },
    { href: "/costs/esophagectomy", label: "esophagectomy cost in India" },
    { href: "/doctors?destination=India&procedure=Rectal+Cancer+Surgery", label: "rectal cancer surgeons in India" },
    { href: "/hospitals?destination=India&procedure=Rectal+Cancer+Surgery", label: "rectal cancer hospitals in India" },
  ],

  figures: [
    {
      after: "overview",
      src: "/costs/rectal-cancer-surgery-overview.webp",
      alt: "Medical illustration showing the main stages of rectal cancer surgery including tumour removal, surrounding tissue surgery and bowel reconstruction",
      caption:
        "Resection removes the tumour with a margin. Reconstruction restores continuity when that is honest. A stoma is used when the treating team judges a join is not — not as a default product.",
      fit: "contain",
    },
    {
      after: "how",
      src: "/costs/types-of-rectal-cancer-surgery.webp",
      alt: "Illustration comparing common rectal cancer surgery approaches including low anterior resection and abdominoperineal resection",
      caption:
        "Local excision, LAR, APR and TME are clinical choices. None is universally better. Technique follows tumour height, stage and the operating team's assessment.",
      fit: "contain",
    },
    {
      after: "journey",
      src: "/costs/rectal-cancer-treatment-journey-india.webp",
      alt: "Illustration showing the rectal cancer treatment journey for international patients travelling to India",
      caption:
        "Records, staging and a written estimate come before a ticket. Chemoradiation, ICU extras, stoma supplies and travel sit outside the surgical range unless named.",
      fit: "contain",
    },
  ],
};
