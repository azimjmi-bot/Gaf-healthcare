import type { CostArticle } from "./types";

export const breastConservingSurgery: CostArticle = {
  procedure: "Breast-Conserving Surgery (Lumpectomy)",
  shortName: "breast-conserving surgery",
  slug: "breast-conserving-surgery-lumpectomy",
  lastUpdated: "2026-09-09",
  seoTitle: "Breast-Conserving Surgery (Lumpectomy) Cost in India: Price by City, Hospitals & Doctors",
  seoDescription:
    "Lumpectomy cost in India is typically [INDIA_COST] for the operation and inpatient stay, against [US_COST] self-pay in the US. City comparison, what the quote includes, radiotherapy costs, hospital stay, named surgeons and the international patient pathway.",
  heading: "Breast-Conserving Surgery (Lumpectomy) Cost in India",

  answer: [
    "Breast-conserving surgery — a lumpectomy or wide local excision — is typically quoted at [INDIA_COST] in India for the operation, theatre, anaesthesia, the specimen histopathology and a one to three night inpatient stay. The same operation self-funded in the United States generally runs [US_COST], which is why breast cancer is one of the more common reasons patients travel here for surgery.",
    "That figure is the surgery, not the treatment. Breast conservation is a package deal with radiotherapy: keeping the breast means irradiating it afterwards, and radiation is a separate line item usually quoted somewhere between roughly $1,000 and $6,000 depending on technique and the number of fractions. If chemotherapy, anti-HER2 drugs or endocrine therapy are indicated, those are separate again. A patient budgeting only for the operation is budgeting for about half the pathway.",
    "Hospital stay is short. Most patients are discharged the day after surgery, occasionally the same evening, and two to three nights is usual only when a drain, an axillary dissection or a comorbidity makes it sensible. What lengthens the trip is not the bed — it is waiting for final histopathology, which typically takes five to seven working days and decides whether margins need re-excision and what comes next.",
    "Plan on roughly two to three weeks in India for a surgery-only trip. If you intend to have radiotherapy here as well, plan four to eight weeks in total, depending on whether your radiation oncologist uses a hypofractionated schedule or a conventional one.",
  ],

  indiaCost: [
    "The [INDIA_COST] band is a planning range, and the spread inside it is not arbitrary. The lower end reflects a straightforward wide local excision with a sentinel node biopsy at a mid-tier NABH campus, a shared or single standard room, and uncomplicated pathology. The upper end reflects a flagship JCI campus, a senior breast surgeon, oncoplastic reshaping at the same sitting, frozen-section margin assessment, a full immunohistochemistry panel, and a private room with a companion bed.",
    "Two things move the number more than anything else, and neither is the city. The first is what happens to the armpit. A sentinel lymph node biopsy — the usual approach when the nodes look clinically clear — adds the radioisotope or dye, the gamma probe time and the frozen section. A full axillary dissection is a longer operation, usually means a drain, and pushes the stay toward three nights. The second is the campus tier. The same surgeon operating in the same city can be quoted differently at a flagship and a satellite unit under the same brand, and the room category alone can shift a bill by several hundred dollars across a short stay.",
    "There is a third factor patients rarely anticipate: pathology. A lumpectomy specimen does not just get looked at. It gets margins assessed, and then oestrogen receptor, progesterone receptor, HER2 and often Ki-67 testing, because those results decide the systemic treatment. Where a genomic recurrence-risk assay is appropriate — the kind used to decide whether a hormone-receptor-positive, node-negative cancer genuinely needs chemotherapy — the sample is usually couriered to an overseas laboratory and billed separately. That single test can cost more than the operating theatre.",
    "Treat any figure you are given before a records review as an order of magnitude, not a price. An itemised hospital estimate for breast-conserving surgery can only be written once a surgeon has seen your imaging, your biopsy report and your receptor status, because those are what determine the length of the operation, the need for localisation, and whether the axilla is being sampled or cleared.",
  ],

  costDrivers: [
    {
      label: "Axillary staging versus clearance",
      detail:
        "A sentinel node biopsy adds tracer, probe time and frozen section. A full axillary dissection is a longer operation with a drain, a longer stay and a higher chance of physiotherapy afterwards.",
    },
    {
      label: "Re-excision for margins",
      detail:
        "If final pathology reports tumour at the inked edge, a second operation may be advised. Ask in advance whether re-excision inside a defined window is covered by the original package or billed fresh.",
    },
    {
      label: "Oncoplastic reshaping",
      detail:
        "Reshaping the breast at the same sitting to avoid a contour defect lengthens theatre time and may involve a second surgeon. It is a genuine clinical decision, not an upsell, when the excision is large relative to breast volume.",
    },
    {
      label: "Localising a non-palpable lesion",
      detail:
        "Screen-detected cancers that cannot be felt need a wire, clip or seed placed under imaging on the morning of surgery, plus a specimen radiograph. That is radiology time on the bill.",
    },
    {
      label: "Intraoperative margin assessment",
      detail:
        "Frozen section or specimen imaging during the operation reduces the chance of a second trip to theatre. It adds pathology cost on the day.",
    },
    {
      label: "Receptor and molecular pathology",
      detail:
        "Immunohistochemistry for ER, PR, HER2 and Ki-67 is standard. HER2 equivocal results may need reflex FISH testing, which is an additional charge.",
    },
    {
      label: "Genomic recurrence assays",
      detail:
        "Where indicated for hormone-receptor-positive, node-negative disease, these tests are typically processed abroad and priced in the thousands. Confirm whether your oncologist intends to use one before you budget.",
    },
    {
      label: "Radiotherapy after surgery",
      detail:
        "Breast conservation normally requires radiation to the remaining breast tissue. Technique and fraction count change the cost materially, and a tumour-bed boost adds sessions.",
    },
    {
      label: "Systemic therapy",
      detail:
        "Chemotherapy, anti-HER2 agents and endocrine therapy are separate pathways with their own costs and their own timelines. Anti-HER2 treatment in particular is a year-long commitment.",
    },
    {
      label: "Room category and companion",
      detail:
        "Suite versus twin-share changes the per-night rate and, in most Indian hospitals, the percentage-based charges layered on top of it.",
    },
    {
      label: "Comorbidity and unplanned escalation",
      detail:
        "Diabetes, cardiac disease or anticoagulation may add pre-operative clearances. Haematoma, seroma or wound infection can add procedures, days and drugs no package anticipates.",
    },
    {
      label: "Bilateral or multifocal disease",
      detail:
        "Cancer in both breasts, or more than one focus in the same breast, changes the operation and sometimes rules conservation out entirely in favour of mastectomy.",
    },
  ],

  inclusions: [
    {
      label: "Surgeon and anaesthetist fees",
      detail: "The named breast or surgical oncologist's operating fee and the anaesthesia team for the listed procedure.",
    },
    {
      label: "Theatre and recovery",
      detail: "Operating room time, standard consumables, sutures and post-anaesthesia recovery for the scheduled operation.",
    },
    {
      label: "Inpatient stay as quoted",
      detail: "Bed charges, nursing and routine ward care for the room category and number of nights written into the estimate.",
    },
    {
      label: "Routine pre-operative workup",
      detail: "Standard bloods, ECG, chest imaging and anaesthetic fitness assessment, where the hospital has bundled them.",
    },
    {
      label: "Specimen histopathology",
      detail: "Processing and reporting of the excised tissue, including margin assessment and lymph nodes where sampled.",
    },
    {
      label: "Standard inpatient medication",
      detail: "Analgesia, antibiotics and routine drugs administered during the admission.",
    },
    {
      label: "Discharge summary and early review",
      detail: "A written summary for your home oncologist and the first post-operative wound review before you fly.",
    },
  ],

  exclusions: [
    {
      label: "Radiotherapy",
      detail: "Almost always required after breast conservation, and almost never inside a surgical package. Quote it separately.",
    },
    {
      label: "Chemotherapy and targeted drugs",
      detail: "Cycle-based treatment, anti-HER2 agents and supportive medication are priced per protocol, not per operation.",
    },
    {
      label: "Endocrine therapy",
      detail: "Tamoxifen or an aromatase inhibitor is usually a five to ten year prescription managed at home.",
    },
    {
      label: "Genomic and send-out testing",
      detail: "Recurrence-risk assays and specialised molecular panels are billed on top, often after the sample travels abroad.",
    },
    {
      label: "Staging scans",
      detail: "PET-CT, bone scan or MRI ordered before or after surgery to define the extent of disease.",
    },
    {
      label: "Re-excision or second procedures",
      detail: "A return to theatre for margins, a haematoma or a seroma is a new event unless the contract says otherwise.",
    },
    {
      label: "ICU and complication management",
      detail: "Rarely needed for a lumpectomy, but never included by default when it is.",
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
      "Breast-conserving surgery removes the cancer together with a rim of surrounding normal tissue and leaves the rest of the breast in place. You will hear it called a lumpectomy, a wide local excision, a partial mastectomy or a quadrantectomy depending on how much tissue comes out and on the surgeon's training. The intent is the same: take the tumour with a clear edge, keep the breast.",
      "The operation is judged on margins. The widely used standard for invasive cancer is no tumour cells touching the inked edge of the specimen; for ductal carcinoma in situ a slightly wider clearance is generally sought. If the pathologist finds disease at the edge, the options are a further excision or, occasionally, a change of plan to mastectomy.",
      "Breast conservation is not a compromise operation. Long-term follow-up of the landmark randomised trials found that conservation combined with radiotherapy gives survival comparable to mastectomy in appropriately selected early breast cancer. What conservation does not do is remove the need for radiation, and that is the trade-off patients are actually choosing between.",
    ],
    who: [
      "It is most often offered for early-stage, single-focus breast cancer where the tumour is small enough relative to breast size that removing it with a margin will leave an acceptable breast. Screen-detected cancers and ductal carcinoma in situ frequently fall into this group.",
      "It becomes less suitable when disease is spread through the breast in more than one area, when the tumour is large relative to breast volume, when prior radiation to the chest rules out further treatment, or when the patient cannot complete a course of radiotherapy. Certain inherited genetic risks may also shift the conversation toward mastectomy.",
      "Some patients who are not candidates on day one become candidates later. Chemotherapy or endocrine treatment given before surgery can shrink a tumour enough to make conservation possible — a decision that belongs to a multidisciplinary team, not to a cost comparison.",
    ],
    how: [
      "The operation is done under general anaesthesia and usually takes one to two hours, longer if the axilla is being cleared or the breast is being reshaped.",
      "If the lesion cannot be felt, a radiologist places a wire, clip or seed to guide the surgeon before you go to theatre. The surgeon then removes the tumour with a cuff of normal tissue, orients the specimen for the pathologist, and often marks the tumour bed with clips so the radiation oncologist can find it later.",
      "Where the nodes are clinically clear, a sentinel lymph node biopsy is performed in the same sitting: a tracer identifies the first draining nodes, and only those are removed and examined. If the nodes are known to be involved, a fuller axillary dissection may be planned instead.",
      "The cavity is closed, sometimes with local tissue rearrangement to preserve shape. A drain is not always needed after a lumpectomy alone but is common after axillary surgery.",
    ],
    variations: [
      {
        label: "Wide local excision with sentinel node biopsy",
        detail: "The standard combination for clinically node-negative early breast cancer.",
      },
      {
        label: "Image-guided excision",
        detail: "Wire, clip or radioactive seed localisation for lesions that cannot be palpated, with a specimen radiograph on the table.",
      },
      {
        label: "Oncoplastic breast conservation",
        detail: "Tissue is rearranged or a reduction technique used at the same operation so the breast keeps a reasonable shape after a larger excision.",
      },
      {
        label: "Excision after neoadjuvant treatment",
        detail: "Surgery performed after chemotherapy or endocrine therapy has shrunk the tumour, guided by the clip placed at diagnosis.",
      },
      {
        label: "Excision with axillary dissection",
        detail: "Used when nodal disease is established, and the main reason a lumpectomy admission runs closer to three nights.",
      },
    ],
    preparation: [
      "Expect a mammogram and ultrasound, a core biopsy confirming the diagnosis with receptor status, and in many cases a breast MRI to define extent. Staging scans are ordered selectively rather than routinely.",
      "Anaesthetic fitness comes next: bloods, ECG, and cardiac or respiratory review where your history calls for it. Blood thinners, some diabetes medication and hormone treatments may need adjusting, which is a conversation to have well before you fly.",
      "Practical preparation matters for travellers. Bring your imaging on a disc or drive rather than as phone photographs, bring the biopsy block or slides if your home pathologist will release them, and arrive with at least one working day in hand before the pre-operative assessment.",
    ],
    recovery: [
      "Most patients walk within hours and are discharged after one night. Pain is usually manageable with oral analgesia. Bruising and swelling in the operated breast are expected and settle over weeks.",
      "If a drain is in place it typically comes out within a few days, once output falls. Seroma — fluid collecting in the cavity — is common enough to be considered part of normal healing and is aspirated in clinic if it becomes uncomfortable.",
      "Light activity resumes in days; heavy lifting and driving wait one to two weeks. After axillary surgery, shoulder mobility exercises start early and matter more than most patients expect.",
      "The appointment that really governs your calendar is the histopathology review, five to seven working days after surgery. That meeting sets margins, node status and receptor results, and therefore decides radiation, chemotherapy and endocrine therapy.",
    ],
  },

  fullPathway: {
    intro: [
      "Costing a lumpectomy in isolation is the single most common budgeting mistake international patients make. Breast conservation is a sequence, and the surgery is the shortest part of it.",
      "Use the stages below to build a realistic total, and ask your coordinator to quote each one separately so you can see what you are committing to before you travel.",
    ],
    stages: [
      {
        label: "Diagnosis and staging",
        detail:
          "Mammography, ultrasound, core biopsy with receptor testing, and selectively MRI or PET-CT. Some of this may already be done at home and can be reviewed rather than repeated.",
      },
      {
        label: "The operation",
        detail:
          "Breast-conserving surgery with axillary staging, theatre, anaesthesia, one to three nights and specimen pathology. This is the [INDIA_COST] line.",
      },
      {
        label: "Radiotherapy to the conserved breast",
        detail:
          "Normally recommended after conservation. Cost tracks technique and fractions, and a hypofractionated schedule shortens both the bill and the stay compared with a conventional course.",
      },
      {
        label: "Systemic therapy where indicated",
        detail:
          "Chemotherapy for higher-risk disease, anti-HER2 therapy for HER2-positive cancers, and endocrine therapy for hormone-receptor-positive disease. Each has a separate protocol and price.",
      },
      {
        label: "Surveillance",
        detail:
          "Clinical review and annual imaging, usually transferred back to your home oncologist with the discharge summary and pathology report.",
      },
    ],
  },

  journey: [
    {
      label: "Send records",
      detail:
        "Mammogram and ultrasound images, the core biopsy report with ER, PR and HER2 status, any MRI, and a summary of your medical history and current medication.",
    },
    {
      label: "Remote review",
      detail: "A breast or surgical oncologist reads the actual imaging and pathology rather than a summary of it.",
    },
    {
      label: "Video consultation",
      detail:
        "You meet the consultant who would operate, on camera, before committing. Ask directly whether conservation is appropriate in your case and what would change that answer.",
    },
    {
      label: "Written treatment plan",
      detail: "Proposed operation, axillary approach, expected stay, likely radiation plan and the pathology that would alter it.",
    },
    {
      label: "Itemised cost estimate",
      detail: "Surgery, stay and pathology, with radiotherapy and systemic therapy quoted separately rather than folded into one number.",
    },
    {
      label: "Medical visa and travel",
      detail:
        "A hospital invitation letter supports a medical visa application; most patients travel with an attendant on a companion visa. Confirm the visa duration covers radiotherapy if you plan to have it here.",
    },
    {
      label: "Arrival and pre-operative assessment",
      detail: "In-person examination, repeat or supplementary imaging where needed, bloods and anaesthetic clearance.",
    },
    {
      label: "Admission",
      detail: "Usually the evening before or the morning of surgery, with localisation done first if the lesion is impalpable.",
    },
    {
      label: "Surgery",
      detail: "One to two hours in theatre for a standard excision with sentinel node biopsy, plus recovery.",
    },
    {
      label: "Inpatient recovery",
      detail: "One to three nights, wound and drain review, mobilisation and analgesia.",
    },
    {
      label: "Discharge and histopathology wait",
      detail:
        "Five to seven working days as an outpatient while final pathology is processed. Many patients use this window for city recovery rather than flying home and back.",
    },
    {
      label: "Pathology review and next-step decision",
      detail:
        "Margins, nodes and receptors are discussed. This is where radiation, chemotherapy and endocrine therapy are confirmed or ruled out.",
    },
    {
      label: "Radiotherapy, if you are having it in India",
      detail: "Planning CT, then daily treatment over the number of fractions your radiation oncologist prescribes.",
    },
    {
      label: "Return home and handover",
      detail:
        "You leave with the operative note, histopathology, receptor status, radiation record where applicable, and a written plan for your home team.",
    },
  ],

  documents: [
    "Mammogram and breast ultrasound images, on a disc or drive rather than as photographs",
    "Core biopsy histopathology report including ER, PR, HER2 and Ki-67 where done",
    "Breast MRI and any staging scans (PET-CT, bone scan, CT)",
    "Paraffin block or slides, if your home laboratory will release them for review",
    "Current medication list, including blood thinners and hormone treatment",
    "Records of diabetes, cardiac, thyroid or respiratory disease and any prior surgery or chest radiation",
    "Passport, and a hospital invitation letter for the medical visa application",
    "Any insurance or reimbursement paperwork that must be completed before admission",
  ],

  cities: [
    {
      citySlug: "delhi-ncr",
      ecosystem:
        "The National Capital Region carries the largest number of listed campuses on Velora, and with it the widest choice of breast units — from dedicated cancer institutes to multi-speciality flagships with a breast surgery team inside a broader oncology floor. It is also the easiest place to assemble a full multidisciplinary sequence in one geography, which matters when surgery, radiation and medical oncology all need to happen within a few weeks.",
      logistics:
        "Indira Gandhi International has the broadest direct connectivity of the five cities, particularly from Africa, Central Asia and the Middle East. The catch is that the NCR is not one city: a campus in Gurgaon, one in south Delhi and one in Noida can mean very different daily commutes from the same hotel. Aerocity, Vasant Kunj and Gurgaon are the usual companion stays. Winter air quality is a genuine consideration if you or your attendant has respiratory disease and you are here for a multi-week radiation course.",
      costNote:
        "Ask which campus the quote is written against. Several NCR brands run both a flagship and satellite units, and the same surgeon may operate at more than one.",
    },
    {
      citySlug: "mumbai",
      ecosystem:
        "Mumbai has the densest concentration of high-volume cancer surgery in the country, and breast cancer is the disease its oncology floors see most. For a patient whose case is not straightforward — multifocal disease, a borderline conservation candidate, surgery after neoadjuvant chemotherapy — the depth of tumour-board experience here is the practical argument.",
      logistics:
        "Traffic, not distance, governs everything. Pairing the hotel to the campus matters more here than in any other Indian city, and Navi Mumbai should be treated as a separate commute rather than a suburb. Chhatrapati Shivaji Maharaj International sits between the northern and southern hospital belts, typically 45 to 90 minutes from either. The June to September monsoon is worth planning around if your schedule includes daily radiotherapy visits.",
      costNote:
        "Accommodation and companion living costs for a long radiotherapy stay are typically the highest of the five cities. Factor the stay, not just the surgery.",
    },
    {
      citySlug: "bengaluru",
      ecosystem:
        "Bengaluru's listed campuses include comprehensive cancer centres where breast surgery, radiation and medical oncology sit in the same building — useful when the whole sequence is being done in one trip rather than split across countries.",
      logistics:
        "Kempegowda International is north of the city while most listed campuses sit south or south-east, which makes this the longest airport transfer of the five cities: budget 45 to 75 minutes and more at peak. Once you are in place, the compensation is real — a mild climate year-round is materially easier to live through during a four to six week radiotherapy course than a Delhi winter or a Chennai summer. MG Road and Koramangala hold the companion hotels most families end up using.",
      costNote:
        "Serviced apartments near the southern campuses are commonly used for extended stays and can undercut hotel rates over several weeks.",
    },
    {
      citySlug: "chennai",
      ecosystem:
        "Chennai has the longest-established international patient corridor of the five, with steady flows from Sri Lanka, Bangladesh, the Maldives and East Africa. In practice that shows up as administrative fluency: interpreters, visa extension paperwork and attendant arrangements are routine rather than exceptional.",
      logistics:
        "Transfers are the shortest of the five cities — most listed campuses sit 20 to 50 minutes from Chennai International in ordinary traffic, which is a real advantage when you are travelling to a hospital daily. T. Nagar and the beach hotels are the usual companion stay. Heat and humidity from April onward are the trade-off, and they are not trivial for a patient recovering from surgery with a wound and a dressing.",
      costNote:
        "Ask whether the international patient desk handles visa extension paperwork in-house, since a radiotherapy course often outlasts the original visa window.",
    },
    {
      citySlug: "hyderabad",
      ecosystem:
        "Hyderabad's oncology capacity is concentrated in a compact corridor through Banjara Hills, Jubilee Hills and Gachibowli, which means second opinions between campuses are logistically easy to arrange without changing hotels.",
      logistics:
        "Rajiv Gandhi International is typically 45 to 70 minutes from the main hospital belt. Banjara Hills and the HITEC City area hold most of the accommodation families actually use, and the supply of serviced apartments there suits the pattern breast cancer travel usually takes: a short surgical admission followed by weeks of outpatient visits with a companion in tow.",
      costNote:
        "Extended-stay accommodation is generally more affordable than in Mumbai or the NCR, which changes the total trip cost more than any difference in surgical fee.",
    },
  ],

  destinations: [
    {
      country: "India",
      stay: "[STAY]",
      context:
        "Lowest of the group for the operation, and the only destination in this table where Velora lists named breast and surgical oncologists you can meet on camera first.",
    },
    {
      country: "Turkey",
      costLevel: [1, 1.8],
      stay: "1–3 nights",
      context: "Established medical travel market with strong package pricing; verify what pathology and radiation are excluded.",
    },
    {
      country: "Thailand",
      costLevel: [1.2, 2.2],
      stay: "1–3 nights",
      context: "Strong private hospital infrastructure and international desks; oncology drug costs can be higher than India.",
    },
    {
      country: "United Arab Emirates",
      costLevel: [2, 3.4],
      stay: "1–3 nights",
      context: "Short flights from much of Africa and South Asia; private oncology pricing is closer to Western levels.",
    },
    {
      country: "Singapore",
      costLevel: [2.6, 4.4],
      stay: "1–3 nights",
      context:
        "High-quality private care at premium pricing. Subsidised local bills and private international bills sit on different schedules, so published figures mislead.",
    },
    {
      country: "Germany",
      costLevel: [2.2, 4.2],
      stay: "2–5 nights",
      context: "Certified breast units and strong multidisciplinary process; longer inpatient norms and self-pay deposits are typical.",
    },
    {
      country: "United Kingdom",
      costLevel: [1.8, 3.4],
      stay: "1–3 nights",
      context:
        "NHS treatment is not available to most overseas visitors; private self-pay pricing is what applies, and radiotherapy is quoted per fraction.",
    },
    {
      country: "United States",
      stay: "0–2 nights",
      context:
        "Frequently done as day surgery, but self-pay totals are the highest here once facility, pathology and radiation oncology bills are combined.",
    },
  ],

  questionsToAsk: [
    "Is breast conservation appropriate in my case, and what specifically would change that recommendation?",
    "Are you planning a sentinel node biopsy or a full axillary dissection, and why?",
    "Will margins be assessed during the operation, or only on final pathology?",
    "If margins come back positive, is re-excision covered by this estimate or billed separately?",
    "Which surgeon will actually operate, and will they be present for the whole procedure?",
    "Is this quote for the flagship campus or a satellite unit, and does the surgeon differ between them?",
    "What room category is the estimate based on, and what changes if I upgrade?",
    "Which investigations from my home hospital will you accept rather than repeat?",
    "Is radiotherapy included, and if not, what is the separate cost and fraction count?",
    "Do you intend to use a genomic recurrence assay, and what does it cost?",
    "How long after surgery will final histopathology be ready, and will the consultant review it with me in person?",
    "What is the realistic total time I should plan to stay if I have radiotherapy here as well?",
  ],

  faqs: [
    {
      q: "How much does a lumpectomy cost in India?",
      a: "Breast-conserving surgery is typically quoted at [INDIA_COST] in India, covering the operation, theatre, anaesthesia, one to three nights as an inpatient and histopathology of the specimen. Radiotherapy, chemotherapy and genomic testing are separate. The final figure is set by an itemised hospital estimate after a surgeon reviews your imaging and biopsy report.",
    },
    {
      q: "Is a lumpectomy cheaper in India than in the United States?",
      a: "For a self-funding patient, substantially. The same operation generally runs [US_COST] in the US against [INDIA_COST] in India. If you have US insurance that covers the surgery, your out-of-pocket cost at home may be lower than travelling, so compare against your actual liability rather than the list price.",
    },
    {
      q: "Does the cost include radiotherapy?",
      a: "Almost never. Breast conservation normally requires radiation to the remaining breast tissue afterwards, and it is quoted as a separate pathway priced by technique and number of fractions. Ask for both estimates before you travel, because radiation is what determines how long you stay.",
    },
    {
      q: "How long is the hospital stay?",
      a: "One night is typical for a wide local excision with sentinel node biopsy. Two to three nights is usual if a drain is placed, if the axilla has been cleared, or if a medical condition makes a longer watch sensible.",
    },
    {
      q: "How long do international patients need to stay in India?",
      a: "Around two to three weeks for a surgery-only trip, which allows pre-operative assessment, the operation, recovery and the five to seven working day wait for final histopathology. If you plan to have radiotherapy in India, four to eight weeks in total is realistic depending on the fractionation schedule.",
    },
    {
      q: "Which Indian city is best for breast-conserving surgery?",
      a: "There is no single answer, and city choice usually matters less than the campus and the surgeon. Delhi NCR offers the largest number of listed campuses and the widest international connectivity; Mumbai has the deepest high-volume oncology experience; Bengaluru's climate suits a long radiotherapy stay; Chennai has the shortest airport transfers and the most established international patient administration; Hyderabad offers a compact hospital corridor with affordable extended-stay accommodation.",
    },
    {
      q: "Is a lumpectomy as safe as a mastectomy?",
      a: "For appropriately selected early breast cancer, long-term follow-up of randomised trials found that breast conservation combined with radiotherapy gives survival comparable to mastectomy. Suitability depends on tumour size and position, whether disease is in more than one area of the breast, prior radiation, and whether you can complete a radiotherapy course. That assessment belongs to your treating team.",
    },
    {
      q: "What happens if the margins are not clear?",
      a: "If the pathologist reports tumour cells at the inked edge of the specimen, your surgeon may advise a further excision to clear the margin, or in some cases a change of plan to mastectomy. Ask before surgery whether a re-excision within a defined period is covered by the original estimate.",
    },
    {
      q: "Can I get a remote consultation before travelling?",
      a: "Yes. The usual sequence is that you send imaging and pathology, a consultant reviews the actual files, and you then meet that consultant on video before committing to travel. Insist on speaking to the surgeon who would operate, not only to a coordinator.",
    },
    {
      q: "Can the final cost be higher than the initial estimate?",
      a: "It can. Common reasons are conversion to a more extensive axillary operation, a longer stay, a room upgrade, additional pathology such as reflex HER2 testing or a genomic assay, treatment of a seroma or haematoma, or a return to theatre for margins. Ask which of these are covered and which are billed fresh.",
    },
    {
      q: "What documents do I need for treatment in India?",
      a: "Mammogram and ultrasound images on a disc or drive, the core biopsy report with receptor status, any MRI or staging scans, your medication list and medical history, and a passport. A hospital invitation letter supports the medical visa application, and most patients travel with an attendant on a companion visa.",
    },
    {
      q: "Will I need chemotherapy as well?",
      a: "Not necessarily. The decision rests on tumour size, grade, node status, receptor and HER2 results, and sometimes a genomic recurrence assay. Those results are only complete after surgery, which is why the systemic treatment plan is confirmed at the pathology review rather than before you fly.",
    },
    {
      q: "Is the quoted price a guaranteed final bill?",
      a: "No. Figures on this page are indicative planning ranges for budgeting. A binding estimate can only be issued by the treating hospital after records review, and it remains subject to what is found clinically.",
    },
  ],

  doctorHeading: "Breast-conserving surgery specialists in India",
  doctorIntro:
    "These are surgical oncologists listed on Velora whose practice covers breast-conserving surgery. Profiles show training, campus and procedures; there are no rankings here, and no fee is paid for placement.",
  hospitalHeading: "Hospitals listed for breast-conserving surgery in India",
  hospitalIntro:
    "Campuses on Velora where this operation is quoted, with accreditation as published by the hospital. Choose on breast unit depth, the surgeon you met on camera and the radiation plan that follows — not on the brand name.",

  figures: [
    {
      after: "overview",
      src: "/costs/lumpectomy-hospital-atrium.webp",
      alt: "A patient and companion walking through a modern Indian hospital atrium with a coordinator, on the way to a breast surgery consultation.",
      caption: "Arrival at a listed campus is usually a walk from the atrium to a named consultant, not a corridor of anonymous desks.",
    },
    {
      after: "how",
      src: "/costs/lumpectomy-consultation.webp",
      alt: "A surgical oncologist reviewing imaging on a tablet with an international patient and family member during a private consultation.",
      caption: "The operation is explained on camera or in clinic with the actual imaging open — not from a brochure photograph.",
    },
  ],

  relatedProcedures: [
    "Mastectomy",
    "Sentinel Lymph Node Biopsy",
    "Oncoplastic Breast Surgery",
    "Breast Reconstruction",
    "Intensity-Modulated Radiotherapy (IMRT)",
    "External Beam Radiotherapy (EBRT)",
  ],
};
