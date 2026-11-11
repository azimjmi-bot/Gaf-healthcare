import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const HIPEC = "/treatments/hipec-surgery-in-india";
const IP = "/treatments/intraperitoneal-chemotherapy-in-india";
const COLON = "/treatments/colon-cancer-treatment-in-india";
const OVARIAN = "/treatments/ovarian-cancer-treatment-in-india";
const CHEMO_TX = "/treatments/chemotherapy-in-india";
const STAGE4 = "/blogs/stage-4-colon-cancer-treatment-in-india";
const COLON_CHEMO = "/blogs/colon-cancer-chemotherapy-in-india";
const CRS_HIPEC = "/costs/India/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC";
const CRS = "/costs/India/Surgical-Oncology/Cytoreductive-Surgery";
const PIPAC = "/costs/India/Surgical-Oncology/PIPAC";
const OVARIAN_CRS = "/costs/India/Surgical-Oncology/Ovarian-Cancer-Cytoreductive-Surgery";
const CHEMO = "/costs/India/Medical-Oncology/Chemotherapy";
const IP_COST = "/costs/India/Medical-Oncology/Intraperitoneal-Chemotherapy";
const SURG_DOCS = "/doctors/India/Surgical-Oncology";
const SURG_HOSP = "/hospitals/India/Surgical-Oncology";
const DELHI_DOCS = "/doctors/India/Delhi-NCR/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC";
const MUMBAI_DOCS = "/doctors/India/Mumbai/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC";
const BLR_DOCS = "/doctors/India/Bengaluru/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC";
const CHN_DOCS = "/doctors/India/Chennai/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC";
const HYD_DOCS = "/doctors/India/Hyderabad/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC";
const DELHI_HOSP = "/hospitals/India/Delhi-NCR/Surgical-Oncology";
const MUMBAI_HOSP = "/hospitals/India/Mumbai/Surgical-Oncology";
const BLR_HOSP = "/hospitals/India/Bengaluru/Surgical-Oncology";
const CHN_HOSP = "/hospitals/India/Chennai/Surgical-Oncology";
const HYD_HOSP = "/hospitals/India/Hyderabad/Surgical-Oncology";
const DELHI_COST = "/costs/India/Delhi-NCR/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC";
const MUMBAI_COST = "/costs/India/Mumbai/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC";
const BLR_COST = "/costs/India/Bengaluru/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC";
const CHN_COST = "/costs/India/Chennai/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC";
const HYD_COST = "/costs/India/Hyderabad/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;
const h2 = (text) => ({ id: id("h"), type: "heading", level: 2, text });
const h3 = (text) => ({ id: id("h"), type: "heading", level: 3, text });
const p = (text) => ({ id: id("p"), type: "paragraph", text });
const ul = (items) => ({ id: id("ul"), type: "list", style: "ul", items });
const ol = (items) => ({ id: id("ol"), type: "list", style: "ol", items });
const btn = (label, href) => ({ id: id("btn"), type: "button", label, href });
const img = (src, alt, caption) => ({ id: id("img"), type: "image", src, alt, caption });
const html = (markup) => ({ id: id("html"), type: "html", html: markup });

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>What is pseudomyxoma peritonei?</strong></td><td>A rare peritoneal condition in which mucin and mucin-producing tumour cells accumulate in the abdomen, usually after an appendiceal mucinous tumour.</td></tr><tr><td><strong>Main specialist treatment</strong></td><td>CRS-HIPEC for operable, resectable disease — see <a href="${HIPEC}">HIPEC surgery in India</a></td></tr><tr><td><strong>Common origin</strong></td><td>Appendiceal mucinous neoplasm (LAMN, HAMN, mucinous adenocarcinoma)</td></tr><tr><td><strong>Key investigations</strong></td><td>Contrast CT, pathology review, tumour markers (CEA, CA 19-9, sometimes CA-125), selected MRI or laparoscopy</td></tr><tr><td><strong>PCI score</strong></td><td>0–39 estimate of peritoneal disease burden; distribution matters more than a single cut-off</td></tr><tr><td><strong>GAF CRS + HIPEC planning range</strong></td><td><a href="${CRS_HIPEC}">$18,000–$40,000</a>, typically <strong>10–21 nights</strong></td></tr><tr><td><strong>GAF cytoreductive surgery alone</strong></td><td><a href="${CRS}">$10,000–$24,000</a>, typically <strong>7–14 nights</strong></td></tr><tr><td><strong>Neighbouring PIPAC</strong></td><td><a href="${PIPAC}">$7,000–$16,000</a>, typically <strong>2–5 nights</strong></td></tr><tr><td><strong>International patients</strong></td><td>Share pathology, DICOM imaging and operative notes before travelling; do not assume HIPEC will be performed</td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>Pseudomyxoma peritonei treatment</strong> centres on specialist assessment of tumour grade, disease distribution and resectability. For suitable patients, <strong>cytoreductive surgery (CRS) with HIPEC</strong> is the established approach supported by the 2025 multisocietal consensus over debulking alone. GAF Healthcare planning for <a href="${CRS_HIPEC}">CRS with HIPEC</a> is <strong>$18,000–$40,000</strong> (typically <strong>10–21 nights</strong>). These are partner planning ranges, not hospital quotations.</p><p class="article-quick-answer__body"><strong>Important:</strong> GAF Healthcare does not diagnose PMP or decide CRS-HIPEC eligibility. Treatment decisions remain with the multidisciplinary hospital team after full record review.</p></aside>`;

const markerTable = `<div class="md-body"><table><thead><tr><th>Tumour marker</th><th>Why it may be assessed</th></tr></thead><tbody><tr><td>CEA</td><td>Baseline assessment and follow-up in appropriate patients</td></tr><tr><td>CA 19-9</td><td>May help assess disease burden and monitor selected patients</td></tr><tr><td>CA-125</td><td>May be considered as part of the baseline evaluation</td></tr></tbody></table></div>`;

const pciTable = `<div class="md-body"><table><thead><tr><th>Lesion score</th><th>Meaning</th></tr></thead><tbody><tr><td>LS-0</td><td>No visible tumour</td></tr><tr><td>LS-1</td><td>Tumour deposits up to 0.5 cm</td></tr><tr><td>LS-2</td><td>Deposits greater than 0.5 cm and up to 5 cm</td></tr><tr><td>LS-3</td><td>Deposits greater than 5 cm or confluent disease</td></tr></tbody></table></div>`;

const compareTable = `<div class="md-body"><table><thead><tr><th>Feature</th><th>CRS-HIPEC</th><th>Debulking surgery</th></tr></thead><tbody><tr><td>Main objective</td><td>Remove visible disease as completely as possible and deliver HIPEC</td><td>Reduce tumour or mucin burden</td></tr><tr><td>Extent of surgery</td><td>Often extensive and carefully planned</td><td>Depends on symptoms and disease</td></tr><tr><td>HIPEC</td><td>Usually included in the specialist CRS-HIPEC approach</td><td>Not necessarily included</td></tr><tr><td>Treatment intent</td><td>Long-term disease control in suitable patients</td><td>Often symptom relief or selected disease reduction</td></tr><tr><td>Patient selection</td><td>Requires detailed assessment of resectability and fitness</td><td>May be considered when complete cytoreduction is not feasible</td></tr><tr><td>Follow-up</td><td>Structured long-term surveillance</td><td>Follow-up depends on disease and treatment goals</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Named pathway</th><th>GAF planning range in India</th><th>Typical stay</th></tr></thead><tbody><tr><td><a href="${CRS_HIPEC}">Cytoreductive surgery with HIPEC</a></td><td>$18,000–$40,000</td><td>10–21 nights</td></tr><tr><td><a href="${CRS}">Cytoreductive surgery</a></td><td>$10,000–$24,000</td><td>7–14 nights</td></tr><tr><td><a href="${PIPAC}">PIPAC</a></td><td>$7,000–$16,000</td><td>2–5 nights</td></tr><tr><td><a href="${OVARIAN_CRS}">Ovarian cancer cytoreductive surgery</a></td><td>$8,000–$20,000</td><td>6–12 nights</td></tr><tr><td><a href="${IP_COST}">Intraperitoneal chemotherapy</a> (catheter/port pathway)</td><td>$5,000–$14,000</td><td>Tied to cytoreduction or IP ports</td></tr><tr><td><a href="${CHEMO}">Systemic chemotherapy</a></td><td>$1,500–$8,000+</td><td>Outpatient cycles · 3–6 months typical</td></tr></tbody></table></div>`;

const estimateTable = `<div class="md-body"><table><thead><tr><th>Cost component</th><th>What to clarify</th></tr></thead><tbody><tr><td>Specialist consultation</td><td>Surgical oncology and medical oncology opinions</td></tr><tr><td>Diagnostic investigations</td><td>CT, MRI, blood tests and other staging</td></tr><tr><td>Pathology review</td><td>Confirmation of tumour type and grade</td></tr><tr><td>Surgery</td><td>Cytoreduction and any planned organ resections</td></tr><tr><td>HIPEC</td><td>Chemotherapy drugs and perfusion charges</td></tr><tr><td>Anaesthesia</td><td>Operating theatre and anaesthesia services</td></tr><tr><td>Intensive care</td><td>Expected monitoring and ICU charges</td></tr><tr><td>Hospital stay</td><td>Room category and estimated duration</td></tr><tr><td>Complication management</td><td>Whether additional treatment is excluded</td></tr><tr><td>Follow-up</td><td>Post-discharge review and investigations</td></tr></tbody></table></div>`;

const cityTable = `<div class="md-body"><table><thead><tr><th>City</th><th>CRS-HIPEC doctor list</th><th>GAF planning range</th></tr></thead><tbody><tr><td>Delhi NCR</td><td><a href="${DELHI_DOCS}">Surgical oncology · CRS with HIPEC</a></td><td>$18,000–$40,000</td></tr><tr><td>Mumbai</td><td><a href="${MUMBAI_DOCS}">Surgical oncology · CRS with HIPEC</a></td><td>$18,000–$40,000</td></tr><tr><td>Bengaluru</td><td><a href="${BLR_DOCS}">Surgical oncology · CRS with HIPEC</a></td><td>$18,000–$40,000</td></tr><tr><td>Chennai</td><td><a href="${CHN_DOCS}">Surgical oncology · CRS with HIPEC</a></td><td>$18,000–$40,000</td></tr><tr><td>Hyderabad</td><td><a href="${HYD_DOCS}">Surgical oncology · CRS with HIPEC</a></td><td>$18,000–$40,000</td></tr></tbody></table></div>`;

const faqs = [
  [
    "What is pseudomyxoma peritonei?",
    "Pseudomyxoma peritonei is a rare condition in which mucin and mucin-producing tumour cells accumulate inside the abdominal cavity. It most commonly originates from an appendiceal mucinous neoplasm and can spread across peritoneal surfaces, causing progressive abdominal swelling and digestive difficulties.",
  ],
  [
    "Is pseudomyxoma peritonei a type of cancer?",
    "PMP is associated with mucin-producing tumours, most often arising from the appendix. Behaviour varies from low-grade disease to more aggressive high-grade forms. The pathology report is essential for classification and treatment planning.",
  ],
  [
    "What causes pseudomyxoma peritonei?",
    "The most common cause is a mucin-producing tumour of the appendix. If the appendix ruptures or perforates, mucin and tumour cells may escape into the abdominal cavity, implant on peritoneal surfaces and continue producing mucin.",
  ],
  [
    "What are the early symptoms of PMP?",
    "Early symptoms may include abdominal bloating, increasing abdominal size, discomfort, changes in bowel habits, constipation, loss of appetite and early fullness after meals. Some patients have few symptoms and the condition may be discovered incidentally.",
  ],
  [
    "Why is PMP called jelly belly?",
    "The term refers to the thick, jelly-like mucin that accumulates inside the abdominal cavity. This mucin can occupy space around abdominal organs and cause progressive abdominal enlargement.",
  ],
  [
    "Is pseudomyxoma peritonei the same as peritoneal carcinomatosis?",
    "They are related but not identical. Peritoneal carcinomatosis describes cancer spread across peritoneal surfaces. PMP is a specific mucin-producing peritoneal condition, most commonly originating from an appendiceal mucinous neoplasm.",
  ],
  [
    "What is LAMN?",
    "LAMN stands for low-grade appendiceal mucinous neoplasm. It is a mucin-producing tumour of the appendix with low-grade cellular features. If it ruptures or spreads outside the appendix, it can cause peritoneal mucin accumulation and PMP.",
  ],
  [
    "Is LAMN always treated with HIPEC?",
    "No. Management depends on whether the tumour is confined to the appendix, whether the appendix ruptured, whether mucin is present outside the appendix, whether the mucin contains tumour cells and how widely the disease has spread. Some patients need surveillance or further local surgery rather than CRS-HIPEC.",
  ],
  [
    "What is the difference between LAMN and HAMN?",
    "LAMN is a low-grade appendiceal mucinous neoplasm, while HAMN is a high-grade appendiceal mucinous neoplasm. Their microscopic features and potential behaviour differ. Pathology classification helps determine treatment and follow-up.",
  ],
  [
    "How is pseudomyxoma peritonei diagnosed?",
    "Diagnosis may involve clinical assessment, contrast-enhanced CT, selected MRI, tumour marker tests, colonoscopy, biopsy and pathology review. Diagnostic laparoscopy may be used in selected patients to assess disease extent and resectability.",
  ],
  [
    "Which tumour markers are used in PMP?",
    "CEA and CA 19-9 are commonly assessed as baseline markers. CA-125 may also be considered. These tests help with assessment and follow-up but cannot independently confirm or exclude PMP.",
  ],
  [
    "What is the PCI score in pseudomyxoma peritonei?",
    "The Peritoneal Cancer Index measures disease distribution across 13 abdominal regions. Each region receives a lesion-size score, producing a total between 0 and 39. It helps surgeons assess disease burden and the feasibility of complete cytoreduction.",
  ],
  [
    "Is a high PCI score a reason not to undergo HIPEC?",
    "A high PCI can make complete cytoreduction more difficult, but there is no universal cut-off for every PMP patient. Disease distribution — especially small bowel and mesenteric involvement — matters. The decision must be made by an experienced peritoneal malignancy team.",
  ],
  [
    "What is CRS-HIPEC for pseudomyxoma peritonei?",
    "CRS-HIPEC combines cytoreductive surgery with heated intraperitoneal chemotherapy. CRS removes visible tumour deposits and affected peritoneal tissue. HIPEC circulates heated chemotherapy inside the abdomen to target microscopic residual tumour cells. See HIPEC surgery in India for the coordinated pathway.",
  ],
  [
    "Is CRS-HIPEC the standard treatment for PMP?",
    "For operable and resectable PMP, CRS-HIPEC is the established specialist approach. The 2025 multisocietal consensus strongly recommends it over debulking surgery in suitable patients. It is not appropriate for everyone, and careful assessment is essential.",
  ],
  [
    "Can PMP be treated without surgery?",
    "Some patients may be managed with surveillance, systemic treatment, symptom-directed procedures or supportive care depending on disease and fitness. For suitable patients with resectable PMP, CRS-HIPEC remains the principal specialist approach.",
  ],
  [
    "Which chemotherapy drugs are used in HIPEC for PMP?",
    "Protocols may use mitomycin C, oxaliplatin or selected cisplatin-based combinations. Drug, dose, temperature and duration depend on institutional protocol and patient factors. The treating surgeon should explain the proposed regimen.",
  ],
  [
    "How long does CRS-HIPEC surgery take?",
    "The operation may take several hours depending on disease extent and structures requiring removal. Extensive peritonectomy, bowel surgery and reconstruction increase duration. The surgeon can estimate after reviewing scans and clinical information.",
  ],
  [
    "Will every PMP patient need a stoma after surgery?",
    "No. A stoma is not required in every CRS-HIPEC operation. It may be considered when bowel resection or reconstruction creates a specific clinical need. The possibility should be discussed before surgery.",
  ],
  [
    "Can pseudomyxoma peritonei come back after HIPEC?",
    "Yes. Recurrence is possible even after complete cytoreduction and HIPEC. Risk depends on tumour grade, histology, disease burden, completeness of cytoreduction and tumour biology. Long-term follow-up is important.",
  ],
  [
    "Can CRS-HIPEC be repeated if PMP returns?",
    "Repeat CRS-HIPEC may be considered in carefully selected patients. The decision depends on location and extent of recurrence, previous surgery, remaining organ function, overall health and the likelihood of meaningful cytoreduction again.",
  ],
  [
    "Is chemotherapy effective for pseudomyxoma peritonei?",
    "Response to conventional systemic chemotherapy can be limited, particularly in low-grade PMP. Systemic treatment may be considered in selected high-grade, unresectable or recurrent cases. The plan depends on pathology and clinical situation. Named systemic lists sit on chemotherapy in India.",
  ],
  [
    "What is the cost of CRS-HIPEC for PMP in India?",
    "GAF Healthcare planning for cytoreductive surgery with HIPEC is $18,000–$40,000, typically 10–21 nights. Cytoreductive surgery alone is $10,000–$24,000 (7–14 nights). Final hospital quotations depend on disease extent, organ resections, ICU stay and complications.",
  ],
  [
    "Can international patients travel to India for PMP treatment?",
    "Yes. International patients may seek specialist assessment in India. Share pathology reports, scans (preferably DICOM), previous surgical records and tumour marker results before travelling so the receiving team can advise on next steps.",
  ],
  [
    "Should patients travel to India specifically for HIPEC?",
    "Patients should first obtain a specialist opinion rather than assuming HIPEC will be performed. The treating team must confirm diagnosis, disease extent, operability and expected benefits. Further investigations or a different approach may be recommended.",
  ],
  [
    "How can GAF Healthcare help patients seeking PMP treatment in India?",
    "GAF Healthcare can assist with organising medical reports, coordinating specialist consultations, communicating treatment estimates and planning travel and hospital arrangements. Diagnosis, treatment selection and CRS-HIPEC eligibility are determined by the treating medical team.",
  ],
  [
    "Does age alone rule out CRS-HIPEC?",
    "Age alone does not automatically rule out CRS-HIPEC. Functional status, frailty, heart and lung health, kidney function and nutritional condition matter more than chronological age.",
  ],
  [
    "Can CRS-HIPEC affect kidney function?",
    "Yes. Some HIPEC drugs may affect the kidneys. Risk depends on the drug, dose, baseline kidney health, hydration and other medical factors. Kidney function is assessed before surgery and monitored afterwards.",
  ],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p(
    "**Pseudomyxoma peritonei (PMP)** is a rare condition in which mucin, a thick jelly-like substance, accumulates inside the abdominal cavity. It usually develops when a mucin-producing tumour — most commonly originating in the appendix — releases tumour cells and mucin into the peritoneal cavity.",
  ),
  p(
    "Over time, mucin and tumour deposits may spread across the surfaces of abdominal organs. This can cause progressive abdominal swelling, digestive difficulties, discomfort and, in advanced cases, bowel obstruction. PMP is sometimes described as *jelly belly* because of the thick mucin inside the abdomen.",
  ),
  p(
    "Although uncommon, PMP requires specialised assessment. Behaviour varies with tumour grade, cellular characteristics, distribution and extent of peritoneal involvement. For suitable patients with operable and resectable disease, the principal specialist approach is **cytoreductive surgery (CRS) combined with hyperthermic intraperitoneal chemotherapy (HIPEC)**. The coordinated pathway is published as [HIPEC surgery in India](" +
      HIPEC +
      ").",
  ),
  p(
    "CRS aims to remove visible tumour deposits and affected peritoneal tissue. HIPEC circulates heated chemotherapy inside the abdomen after cytoreduction to treat microscopic residual disease. The 2025 multisocietal consensus supports CRS-HIPEC over debulking surgery for resectable and operable PMP. The operation is extensive and not suitable for everyone — careful selection at an experienced peritoneal surface malignancy centre is essential.",
  ),
  p(
    "GAF Healthcare planning for [cytoreductive surgery with HIPEC](" +
      CRS_HIPEC +
      ") is **$18,000–$40,000**, typically **10–21 nights**. Neighbouring [cytoreductive surgery](" +
      CRS +
      ") alone is **$10,000–$24,000** (7–14 nights). Neighbouring [PIPAC](" +
      PIPAC +
      ") is **$7,000–$16,000** (2–5 nights). Named catheter-based IP lists sit on [intraperitoneal chemotherapy in India](" +
      IP +
      "). These are partner planning ranges, not hospital quotations.",
  ),
  p(
    "International patients comparing [surgical oncologists listing CRS with HIPEC](" +
      SURG_DOCS +
      ") commonly start with [Delhi NCR](" +
      DELHI_DOCS +
      "), [Mumbai](" +
      MUMBAI_DOCS +
      "), [Bengaluru](" +
      BLR_DOCS +
      "), [Chennai](" +
      CHN_DOCS +
      ") and [Hyderabad](" +
      HYD_DOCS +
      "). Partner [surgical-oncology hospitals](" +
      SURG_HOSP +
      ") in [Delhi NCR](" +
      DELHI_HOSP +
      "), [Mumbai](" +
      MUMBAI_HOSP +
      ") and [Bengaluru](" +
      BLR_HOSP +
      ") are a typical first filter.",
  ),
  btn("Ask about pseudomyxoma peritonei treatment in India", consult("Pseudomyxoma Peritonei / CRS-HIPEC")),
  p(
    "[WhatsApp +91 90443 46292 with pathology, CT reports and operative notes](" +
      wa(
        "Please review my pathology, CT/MRI and previous surgery notes for pseudomyxoma peritonei and advise whether CRS-HIPEC in India may be appropriate.",
      ) +
      ")",
  ),
  img(
    "/uploads/articles/pmp-mucin-abdomen.webp",
    "Unlabeled medical diagram of mucin accumulating inside the abdominal cavity around organ silhouettes",
    "PMP is sometimes called jelly belly because thick mucin can occupy abdominal space and interfere with organ function.",
  ),

  h2("What Is Pseudomyxoma Peritonei?"),
  p(
    "Pseudomyxoma peritonei is a rare peritoneal disease characterised by the accumulation of mucin and mucin-producing tumour cells within the abdominal cavity. It most commonly originates from a mucin-producing tumour of the appendix.",
  ),
  p("The condition may involve:"),
  ul([
    "The peritoneal lining of the abdominal wall",
    "The omentum",
    "The pelvis",
    "The surface of the liver",
    "The diaphragm",
    "The bowel surfaces",
    "Other abdominal structures",
  ]),
  p(
    "Unlike many other metastatic cancers, PMP may produce large amounts of mucin that gradually occupy abdominal space and interfere with normal organ function.",
  ),
  h3("Is pseudomyxoma peritonei a type of cancer?"),
  p(
    "PMP is a clinical condition associated with mucin-producing neoplasms, most often arising from the appendix. Some cases are low-grade and progress relatively slowly; others contain high-grade or more aggressive tumour cells. The pathology report is particularly important — the term PMP alone does not determine treatment.",
  ),
  h3("Why is PMP sometimes called jelly belly?"),
  p(
    "The term refers to thick, gelatinous mucin inside the abdominal cavity. This mucin may collect around abdominal organs and contribute to progressive abdominal enlargement. The appearance differs from ordinary fluid accumulation, although both can cause swelling.",
  ),

  h2("What Causes Pseudomyxoma Peritonei?"),
  p(
    "PMP most commonly develops from a mucin-producing tumour of the appendix. If the tumour grows and the appendix ruptures or perforates, mucin and tumour cells may escape into the abdominal cavity, implant on peritoneal surfaces and continue producing mucin.",
  ),
  img(
    "/uploads/articles/pmp-appendix-spread.webp",
    "Unlabeled diagram of an appendiceal mucinous tumour releasing mucin droplets into the peritoneal cavity",
    "Appendiceal rupture or perforation can allow mucin and tumour cells to implant across peritoneal surfaces.",
  ),
  h3("What is an appendiceal mucinous neoplasm?"),
  p("Important categories include:"),
  ul([
    "**Low-grade appendiceal mucinous neoplasm (LAMN):** Low-grade cellular features; can still cause PMP when the appendix ruptures and mucin or tumour cells escape.",
    "**High-grade appendiceal mucinous neoplasm (HAMN):** High-grade cellular features with different behaviour and treatment considerations.",
    "**Mucinous adenocarcinoma:** An invasive malignant tumour that produces mucin; course depends on grade and other pathological characteristics.",
    "**Goblet cell adenocarcinoma:** A distinct appendiceal tumour type that should not automatically follow the same pathway as conventional LAMN-associated PMP.",
  ]),
  p(
    "Pathology classification should be reviewed by a pathologist experienced in gastrointestinal and peritoneal malignancies.",
  ),
  h3("Can PMP develop from an appendix tumour that was previously removed?"),
  p(
    "Yes. Some patients are diagnosed with an appendiceal mucinous tumour after appendectomy, and later investigations identify mucin or tumour deposits within the abdomen. Risk depends on tumour type and grade, rupture, mucin outside the appendix, whether mucin contained tumour cells, surgical margins and extent of peritoneal involvement. Not every patient with an appendiceal mucinous tumour develops PMP, and not every patient after appendectomy requires CRS-HIPEC.",
  ),
  btn("Share appendectomy pathology for a PMP review", consult("Appendiceal Mucinous Neoplasm / PMP")),
  p(
    "[WhatsApp +91 90443 46292 with appendectomy histopathology](" +
      wa(
        "I had an appendiceal mucinous tumour removed. Please review my pathology and advise whether further assessment for pseudomyxoma peritonei or CRS-HIPEC in India is needed.",
      ) +
      ")",
  ),

  h2("Symptoms of Pseudomyxoma Peritonei"),
  p(
    "PMP can develop gradually. Some patients have no obvious early symptoms, and the condition may be discovered during investigations or surgery for another reason. As mucin and tumour deposits accumulate, symptoms may become more noticeable.",
  ),
  p("Common symptoms include:"),
  ul([
    "Gradually increasing abdominal size",
    "Persistent abdominal bloating",
    "Abdominal discomfort or pain",
    "Feeling full after eating small quantities",
    "Loss of appetite",
    "Unexplained weight changes",
    "Constipation or changes in bowel habits",
    "Nausea and vomiting",
    "Abdominal pressure",
    "Reduced mobility in advanced disease",
  ]),
  h3("Abdominal swelling"),
  p(
    "Progressive abdominal enlargement is a common feature. Some patients notice that their abdomen becomes larger even when overall body weight has not increased significantly.",
  ),
  h3("Digestive difficulties and early fullness"),
  p(
    "Mucin and peritoneal deposits can affect intestinal movement and compress the stomach and surrounding organs, contributing to bloating, constipation, early fullness and nutritional difficulties.",
  ),
  h3("Bowel obstruction"),
  p(
    "Advanced PMP can cause intestinal obstruction when tumour deposits, adhesions or pressure interfere with the passage of intestinal contents. Severe abdominal pain, persistent vomiting, abdominal distension or inability to pass stool or gas require **urgent medical assessment**. These are local emergency-department problems, not WhatsApp questions.",
  ),
  h3("When should a patient seek medical attention?"),
  p(
    "Persistent abdominal swelling, unexplained digestive problems, increasing abdominal discomfort or a previous diagnosis of an appendiceal mucinous tumour should be evaluated by a doctor. Severe pain, repeated vomiting, inability to pass stool or gas, dehydration or sudden deterioration require urgent care.",
  ),

  h2("How Is Pseudomyxoma Peritonei Diagnosed?"),
  p(
    "Diagnosis requires clinical assessment, imaging, pathology and, in selected cases, surgical evaluation. The purpose is not only to confirm the condition but also to determine origin, histological type and grade, whether mucin contains tumour cells, peritoneal extent, whether complete cytoreduction may be possible and whether other organs are affected.",
  ),
  h3("Medical history and physical examination"),
  p(
    "The doctor reviews symptoms, previous abdominal operations, appendectomy history, biopsy reports and any previous diagnosis of appendiceal tumours. Examination may identify abdominal enlargement, tenderness or a palpable mass.",
  ),
  h3("Contrast-enhanced CT scan"),
  p(
    "A contrast-enhanced CT of the abdomen and pelvis may help identify mucin accumulation, peritoneal deposits, omental involvement, appendix-related abnormalities, bowel displacement, organ involvement and disease on the liver surface or diaphragm. It also helps estimate disease distribution for surgical planning.",
  ),
  h3("MRI"),
  p(
    "MRI may be useful in selected patients when additional assessment of mucin distribution or specific abdominal structures is required.",
  ),
  h3("Tumour marker tests"),
  html(markerTable),
  p(
    "Tumour markers do not independently diagnose PMP. Normal results do not exclude the condition, and elevated levels do not establish the diagnosis without other evidence.",
  ),
  h3("Colonoscopy, biopsy and diagnostic laparoscopy"),
  p(
    "Colonoscopy may be recommended to examine the large intestine and exclude synchronous colorectal lesions — relevant when colorectal peritoneal disease is also under consideration; see [colon cancer treatment in India](" +
      COLON +
      ") and [stage 4 colon cancer treatment](" +
      STAGE4 +
      "). Biopsy and expert histopathology identify mucinous tumour cells, grade, invasive adenocarcinoma and other features that influence treatment. In selected patients, diagnostic laparoscopy helps inspect disease distribution, small bowel involvement, mucin deposits, tissue sampling and estimated resectability.",
  ),

  h2("Types and Grades of Pseudomyxoma Peritonei"),
  p(
    "Histological grade and cellular characteristics influence likely behaviour and treatment planning.",
  ),
  ul([
    "**Low-grade mucinous carcinoma peritonei:** Less aggressive microscopic features; may progress slowly but can still cause substantial abdominal complications and may require major surgery when widespread and resectable.",
    "**High-grade mucinous carcinoma peritonei:** More aggressive features; may progress more rapidly and carry greater recurrence risk; treatment may balance surgery and systemic therapy differently.",
    "**High-grade disease with signet-ring cells:** An important pathological feature that can indicate more aggressive behaviour and may affect prognosis and surgical selection.",
  ]),
  p(
    "Tumour grade influences expected behaviour, recurrence risk, suitability for extensive surgery, need for systemic treatment, follow-up and prognosis discussion. Pathology should be interpreted with PCI, disease distribution and patient fitness.",
  ),

  h2("What Is CRS-HIPEC for Pseudomyxoma Peritonei?"),
  p(
    "CRS-HIPEC combines cytoreductive surgery with heated intraperitoneal chemotherapy. For suitable patients with operable and resectable PMP, this combination is the established specialist treatment approach described on [HIPEC surgery in India](" +
      HIPEC +
      ").",
  ),
  ul([
    "**Cytoreductive surgery (CRS):** Removal of visible tumour deposits, mucin and affected peritoneal tissue; selected abdominal organs or parts of organs may also need removal.",
    "**Hyperthermic intraperitoneal chemotherapy (HIPEC):** Circulation of heated chemotherapy within the abdominal cavity after cytoreduction to treat microscopic tumour cells on peritoneal surfaces.",
  ]),
  p(
    "Surgery removes visible disease; HIPEC exposes remaining microscopic cells to chemotherapy delivered directly inside the abdomen. Mucinous appendiceal tumours and PMP may respond poorly to conventional systemic chemotherapy, especially in low-grade disease — see neighbouring [chemotherapy](" +
      CHEMO +
      ") planning (**$1,500–$8,000+**) and [chemotherapy in India](" +
      CHEMO_TX +
      "). HIPEC cannot replace effective cytoreduction.",
  ),
  p(
    "For operable and resectable PMP, CRS-HIPEC is supported as the standard specialist approach by the 2025 multisocietal consensus, which favours it over debulking. This does not mean every patient should undergo the procedure.",
  ),
  img(
    "/uploads/articles/pmp-crs-hipec.webp",
    "Two-panel unlabeled diagram showing cytoreductive tumour removal on the left and heated intraperitoneal chemotherapy perfusion on the right",
    "CRS removes visible disease; HIPEC then circulates heated chemotherapy inside the abdomen.",
  ),
  btn("Ask whether CRS-HIPEC is appropriate for my PMP", consult("CRS-HIPEC for Pseudomyxoma Peritonei")),
  p(
    "[WhatsApp +91 90443 46292 with CT files and pathology grade](" +
      wa(
        "I have pseudomyxoma peritonei. Please review my CT/MRI and pathology grade and advise whether CRS-HIPEC may be appropriate in India.",
      ) +
      ")",
  ),

  h2("How Does CRS-HIPEC Surgery Work?"),
  h3("Step 1: Preoperative assessment"),
  p(
    "The team reviews pathology, CT or MRI, tumour markers, previous surgical records, PCI assessment, kidney and liver function, nutritional status, heart and lung fitness, previous treatment and performance status, and discusses possible organ resections.",
  ),
  h3("Step 2: Surgical exploration"),
  p(
    "The surgeon examines the abdominal cavity to assess disease extent and whether planned cytoreduction can be completed safely. If disease is more extensive than expected, the surgeon may modify or stop the operation.",
  ),
  h3("Step 3: Removal of visible tumour deposits"),
  p("Depending on disease distribution, cytoreduction may include:"),
  ul([
    "Greater or lesser omentum removal",
    "Removal of affected peritoneal surfaces",
    "Pelvic or diaphragmatic peritonectomy",
    "Selected bowel resections",
    "Gallbladder removal or splenectomy when required",
    "Other organ or tissue resections when necessary",
  ]),
  p(
    "Not every patient needs all these procedures. The objective is complete cytoreduction while preserving as much normal organ function as possible.",
  ),
  h3("Step 4: Completeness of cytoreduction (CC score)"),
  ul([
    "**CC-0:** No visible residual disease",
    "**CC-1:** Only very small residual deposits remain, generally up to 2.5 mm",
    "**CC-2:** Residual deposits larger than 2.5 mm and up to 2.5 cm",
    "**CC-3:** Residual deposits exceed 2.5 cm or there is a sheet-like layer of tumour",
  ]),
  h3("Step 5: HIPEC delivery"),
  p(
    "Heated chemotherapy is circulated inside the abdomen using a specialised perfusion system. Drug, dose, temperature and duration vary by institutional protocol. After HIPEC, the team completes the operation and the patient is transferred to postoperative monitoring or intensive care.",
  ),

  h2("Which Chemotherapy Drugs Are Used During HIPEC for PMP?"),
  p(
    "HIPEC protocols differ between institutions. Drugs discussed in international consensus recommendations for PMP include mitomycin C, oxaliplatin and cisplatin in selected combinations. The 2022 PSOGI international consensus discussed mitomycin-based and cisplatin-based approaches among other protocols. There is no single regimen that applies to every patient or centre.",
  ),
  p(
    "The treating team should explain which drug is proposed, why it is selected, intended duration, temperature and delivery method, potential side effects and kidney and blood-count monitoring requirements.",
  ),

  h2("Who Is Eligible for CRS-HIPEC for Pseudomyxoma Peritonei?"),
  p("A patient may be considered when:"),
  ul([
    "PMP has been confirmed through appropriate investigations",
    "Disease is considered operable and resectable",
    "Complete or near-complete cytoreduction is technically achievable",
    "The patient is medically fit for major abdominal surgery",
    "There is no prohibitive involvement of critical structures",
    "Expected benefit justifies the risks",
    "The patient understands treatment and recovery requirements",
  ]),
  p(
    "Factors that may make surgery difficult include extensive small bowel surface involvement, significant mesenteric involvement or retraction, extensive disease around critical structures, disease that cannot be removed safely and significant medical conditions that make major surgery unsafe. Age alone does not automatically rule out CRS-HIPEC; functional status and frailty matter more.",
  ),
  p(
    "A high PCI indicates greater disease burden but there is no single PCI threshold for every PMP patient. Distribution — especially small bowel involvement — can be more concerning than the total number alone.",
  ),

  h2("Understanding the Peritoneal Cancer Index (PCI) in PMP"),
  p(
    "The Peritoneal Cancer Index estimates tumour involvement inside the abdomen across 13 regions (nine abdominopelvic regions and four small-bowel regions). Each region receives a lesion-size score from 0 to 3. Scores add to a total PCI from 0 to 39.",
  ),
  html(pciTable),
  img(
    "/uploads/articles/pmp-pci-regions.webp",
    "Unlabeled diagram of abdominal regions used to estimate peritoneal disease burden for the PCI score",
    "PCI helps describe disease burden; small-bowel and mesenteric involvement often weigh heavily in resectability decisions.",
  ),
  p(
    "Small bowel involvement is particularly important because extensive deposits on the bowel surface or mesentery may prevent complete cytoreduction, and removing too much small bowel can create serious functional consequences. PCI should always be interpreted by an experienced peritoneal malignancy team — also discussed on [intraperitoneal chemotherapy in India](" +
      IP +
      ").",
  ),

  h2("CRS-HIPEC vs Debulking Surgery for PMP"),
  html(compareTable),
  p(
    "The 2025 multisocietal consensus recommends CRS-HIPEC over debulking for operable and resectable PMP. Debulking may still have a role when the main objective is symptom relief or addressing a specific complication.",
  ),

  h2("Risks and Complications of CRS-HIPEC"),
  p("Possible complications include:"),
  ul([
    "Bleeding, wound infection, intra-abdominal infection",
    "Bowel leakage, anastomotic leakage, intestinal obstruction",
    "Delayed return of bowel function; need for further surgery; blood clots",
    "Kidney injury, reduced blood counts, electrolyte disturbances",
    "Nausea, liver-related complications, bone marrow suppression",
    "Pneumonia, cardiac complications, malnutrition, prolonged intensive care",
    "Rarely, life-threatening complications",
  ]),
  p(
    "Some HIPEC drugs may affect the kidneys. Bowel resection may be required if tumour deposits affect the intestine. A stoma is not required in every case but may be necessary depending on resections and reconstruction. Sudden severe pain, fever, collapse, inability to pass urine, or rapidly worsening vomiting after discharge require a **local emergency department**.",
  ),

  h2("Recovery After CRS-HIPEC for PMP"),
  p(
    "Recovery depends on the extent of cytoreduction, organs removed, HIPEC protocol and general health. Immediate monitoring covers vital signs, kidney function, urine output, blood counts, fluid and electrolyte balance, pain, bowel function, respiratory status and infection. Some patients need intensive care.",
  ),
  p(
    "GAF planning for [CRS with HIPEC](" +
      CRS_HIPEC +
      ") typically quotes **10–21 nights**. Discharge depends on stable vitals, pain control, bowel recovery, nutrition, safe mobility and absence of uncontrolled complications.",
  ),
  p(
    "Nutrition often progresses from fluids or nutritional support to oral food as bowel function returns. Early mobilisation is usually encouraged when medically safe. Long-term follow-up may include examination, tumour markers, CT or MRI, nutritional assessment, pathology review, recurrence monitoring and further treatment planning. PMP can recur even after extensive surgery.",
  ),

  h2("Can Pseudomyxoma Peritonei Come Back After HIPEC?"),
  p(
    "Yes. Recurrence risk depends on tumour grade, histological subtype, completeness of cytoreduction, initial disease burden, distribution of deposits, aggressive cellular features and individual tumour biology.",
  ),
  p(
    "If PMP recurs, options may include repeat specialist surgical assessment, repeat CRS-HIPEC in carefully selected patients, systemic treatment in selected high-grade or unresectable cases, symptom-directed surgery, supportive and nutritional care, or surveillance. Repeat CRS-HIPEC is not suitable for everyone.",
  ),

  h2("What Is the Role of Chemotherapy in PMP?"),
  p(
    "Many low-grade mucinous appendiceal tumours and PMP cases respond poorly to conventional systemic chemotherapy. For suitable resectable disease, CRS-HIPEC is generally the principal approach. Systemic chemotherapy may be considered for high-grade, unresectable or recurrent disease — see [chemotherapy in India](" +
      CHEMO_TX +
      ") (**$1,500–$8,000+** planning). How colon-cancer systemic pathways are planned is covered in [colon cancer chemotherapy in India](" +
      COLON_CHEMO +
      ").",
  ),
  p(
    "Preoperative systemic treatment may be considered in selected high-grade cases; it is not routinely required for every PMP patient. HIPEC is not the same as systemic chemotherapy — one is delivered into the abdomen during surgery; the other circulates through the bloodstream.",
  ),

  h2("Pseudomyxoma Peritonei Treatment in India"),
  p(
    "India is considered by international patients seeking specialist cancer diagnosis, complex abdominal surgery and peritoneal surface malignancy treatment — including patients from Tanzania, Kenya, Ethiopia, Uganda, Zambia, Iraq and other countries. The most important consideration is access to a team experienced in appendiceal mucinous tumours and peritoneal surface malignancies. A hospital offering general cancer surgery may not have the experience or infrastructure required for complex CRS-HIPEC.",
  ),
  p(
    "Ideal assessment involves a multidisciplinary team: surgical oncologist experienced in peritoneal surface malignancies, medical oncologist, radiologist, gastrointestinal pathologist, anaesthesiologist, critical care specialist, clinical nutritionist and other specialists when required. Selected ovarian peritoneal pathways are covered on [ovarian cancer treatment in India](" +
      OVARIAN +
      "); colorectal peritoneal pathways on [colon cancer treatment in India](" +
      COLON +
      ").",
  ),
  h3("Questions to ask an Indian hospital before choosing CRS-HIPEC"),
  ol([
    "Does the hospital have a dedicated peritoneal surface malignancy programme?",
    "How frequently does the team perform CRS-HIPEC for PMP?",
    "Who will lead the cytoreductive surgery?",
    "Is the pathology reviewed by a specialist?",
    "How will the team assess PCI and resectability?",
    "What is the plan if complete cytoreduction is not possible?",
    "What intensive care support is available?",
    "What is the expected hospital stay?",
    "What complications may require additional treatment?",
    "What follow-up will be required after returning home?",
  ]),
  p(
    "Before travelling, share original pathology, appendectomy or surgical histopathology, operation notes, CT or MRI reports, DICOM imaging files, tumour markers (CEA, CA 19-9, CA-125 if tested), previous chemotherapy records, recent blood tests, kidney and liver function, current medications and discharge summaries. Patients should not travel assuming CRS-HIPEC will definitely be performed.",
  ),
  btn("Request a specialist PMP review before travel", consult("Pseudomyxoma Peritonei Treatment in India")),
  p(
    "[WhatsApp +91 90443 46292 with DICOM links and pathology PDF](" +
      wa(
        "I am an international patient exploring PMP / CRS-HIPEC treatment in India. I can share DICOM imaging, pathology and previous operative notes for a preliminary specialist review.",
      ) +
      ")",
  ),

  h2("Pseudomyxoma Peritonei Surgery Cost in India"),
  p(
    "There is no single price for every patient because the operation can range from a complex but relatively limited cytoreduction to extensive multi-organ surgery. GAF Healthcare publishes partner planning ranges from the named cost sheets — not hospital quotations.",
  ),
  html(costTable),
  p(
    "City sheets for the same CRS-HIPEC pathway include [Delhi NCR](" +
      DELHI_COST +
      "), [Mumbai](" +
      MUMBAI_COST +
      "), [Bengaluru](" +
      BLR_COST +
      "), [Chennai](" +
      CHN_COST +
      ") and [Hyderabad](" +
      HYD_COST +
      "). The national planning band remains **$18,000–$40,000**; city pages help compare teams rather than invent different tariffs.",
  ),
  html(cityTable),
  p("Final estimates may depend on:"),
  ul([
    "Hospital and room category; surgeon and specialist team fees",
    "Preoperative investigations, pathology review and imaging",
    "Extent of peritoneal disease, PCI and disease distribution",
    "Number of organs or tissues requiring removal; bowel resection and reconstruction",
    "HIPEC drugs and perfusion equipment; anaesthesia; intensive care",
    "Length of hospital stay; blood products; complication management; nutritional support; follow-up investigations",
  ]),
  html(estimateTable),
  p(
    "A preliminary estimate may be possible after medical-record review, but the final cost may change after imaging review, pathology confirmation and assessment of disease distribution. **Important:** The decision to undergo CRS-HIPEC should not be based on cost alone. Experience of the treating team, likelihood of complete cytoreduction, quality of postoperative care and individual clinical suitability matter more.",
  ),
  btn("Request an itemised CRS-HIPEC cost estimate", consult("CRS-HIPEC Cost Estimate")),
  p(
    "[WhatsApp +91 90443 46292 for a written planning estimate](" +
      wa(
        "Please help me request an itemised CRS-HIPEC cost estimate in India after reviewing my PMP pathology and scans. I understand GAF ranges are planning figures, not quotations.",
      ) +
      ")",
  ),

  h2("How GAF Healthcare Can Help International Patients Explore PMP Treatment in India"),
  p(
    "GAF Healthcare assists international patients exploring medical treatment in India. For suspected or confirmed pseudomyxoma peritonei, the first step is to organise medical information for review by an appropriate specialist or hospital team.",
  ),
  p("Depending on requirements, coordination may include:"),
  ul([
    "Collection and organisation of medical reports",
    "Sharing available records with the selected hospital",
    "Coordination of specialist consultation requests",
    "Assistance with treatment-plan and cost-estimate communication",
    "Coordination of appointments, travel and accommodation planning",
    "Assistance with hospital admission coordination",
    "Communication support during the treatment journey",
    "Coordination of follow-up arrangements",
  ]),
  p(
    "GAF Healthcare does not independently diagnose PMP, determine CRS-HIPEC eligibility, prescribe treatment or guarantee clinical outcomes. These decisions remain with the treating doctors and hospital team.",
  ),

  h2("Questions to Ask Before CRS-HIPEC for PMP"),
  ol([
    "What is the exact appendiceal tumour diagnosis?",
    "Is the PMP low-grade or high-grade? Are there signet-ring cells?",
    "Has the pathology been reviewed by a specialist?",
    "What is the estimated PCI score and which structures are involved?",
    "Is complete cytoreduction likely to be achievable?",
    "Will bowel resection be required? Could a stoma be necessary?",
    "Which HIPEC drug regimen is proposed and why?",
    "What are the major risks in this patient's case?",
    "How long might the operation take, and how long may ICU be required?",
    "What is the expected hospital stay and nutritional support?",
    "What is the possibility of recurrence and what follow-up is needed?",
    "What are the alternatives if surgery is not possible? Is a second opinion advisable?",
  ]),

  h2("Frequently Asked Questions About Pseudomyxoma Peritonei"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Key Takeaways"),
  ul([
    "Pseudomyxoma peritonei is a rare mucin-producing peritoneal condition that most commonly originates from an appendiceal tumour.",
    "It can cause progressive abdominal swelling, digestive difficulties and bowel obstruction.",
    "Tumour grade and histological classification are essential for treatment planning.",
    "CT imaging, pathology review and selected laparoscopic assessment help establish disease extent.",
    "PCI helps surgeons assess peritoneal disease distribution, but no single score determines eligibility for every patient.",
    "CRS-HIPEC is the established specialist treatment for suitable patients with operable and resectable PMP.",
    "The 2025 multisocietal consensus recommends CRS-HIPEC over debulking surgery for suitable patients.",
    "GAF planning for CRS with HIPEC is $18,000–$40,000 (typically 10–21 nights).",
    "PMP can recur, making long-term surveillance essential.",
    "International patients exploring treatment in India should obtain a specialist review before travelling or committing to surgery.",
  ]),

  h2("Top Medical Sources and References"),
  p(
    "1. [Multisocietal Consensus on CRS and HIPEC for Pseudomyxoma Peritonei (2025)](https://pubmed.ncbi.nlm.nih.gov/40817850/) — CRS-HIPEC over debulking for resectable PMP.",
  ),
  p(
    "2. [INDEPSO-ISPSM Consensus on Mucinous Appendiceal Neoplasms and Pseudomyxoma Peritonei (2025)](https://pubmed.ncbi.nlm.nih.gov/41415773/) — Indian guidance on appendiceal mucinous disease and PMP.",
  ),
  p(
    "3. [PSOGI/EURACAN Clinical Practice Guidelines — Appendiceal Tumours and Pseudomyxoma Peritonei (2021)](https://doi.org/10.1016/j.ejso.2020.02.012) — European practice guidance.",
  ),
  p(
    "4. [Consensus Guideline for the Management of Appendiceal Tumors, Part 2: Appendiceal Tumors with Peritoneal Involvement](https://acsjournals.onlinelibrary.wiley.com/doi/full/10.1002/cncr.35874) — peritoneal involvement guidance.",
  ),
  p(
    "5. [The 2022 PSOGI International Consensus on HIPEC Regimens for Pseudomyxoma Peritonei](https://pubmed.ncbi.nlm.nih.gov/39008204/) — HIPEC regimen consensus.",
  ),
  p(
    "6. [German S2k Guideline on Low-Grade Appendiceal Mucinous Neoplasms (2025)](https://pubmed.ncbi.nlm.nih.gov/40267588/) — LAMN diagnostics, treatment and surveillance.",
  ),
  p(
    "7. [GAF Healthcare CRS with HIPEC cost sheet](" +
      CRS_HIPEC +
      ") — indicative USD planning range $18,000–$40,000; typically 10–21 nights.",
  ),
  p("**Last reviewed against the cited sources: November 2026.**"),

  h2("Related Reading on GAF Healthcare"),
  p(
    "Explore related published pages for peritoneal disease, HIPEC and neighbouring pathways:",
  ),
  ul([
    "[HIPEC Surgery in India](" + HIPEC + ")",
    "[Intraperitoneal Chemotherapy in India](" + IP + ")",
    "[Colon Cancer Treatment in India](" + COLON + ")",
    "[Stage 4 Colon Cancer Treatment in India](" + STAGE4 + ")",
    "[Colon Cancer Chemotherapy in India](" + COLON_CHEMO + ")",
    "[Ovarian Cancer Treatment in India](" + OVARIAN + ")",
    "[Chemotherapy in India](" + CHEMO_TX + ")",
    "[Cytoreductive surgery with HIPEC — cost sheet](" + CRS_HIPEC + ")",
    "[Cytoreductive surgery — cost sheet](" + CRS + ")",
    "[PIPAC — cost sheet](" + PIPAC + ")",
  ]),

  h2("Explore Specialist PMP Treatment in India"),
  p(
    "Pseudomyxoma peritonei requires careful diagnosis and specialist treatment planning. For suitable patients, CRS-HIPEC can offer an important option, but the decision depends on tumour grade, disease distribution, resectability and overall health.",
  ),
  p(
    "GAF Healthcare assists international patients exploring specialist cancer treatment in India by coordinating medical records, hospital consultations and treatment-related arrangements.",
  ),
  btn("Contact GAF Healthcare for a specialist consultation", consult("Pseudomyxoma Peritonei Treatment in India")),
  p(
    "[WhatsApp +91 90443 46292 to start a PMP record review](" +
      wa(
        "I would like GAF Healthcare to coordinate a specialist consultation for pseudomyxoma peritonei / CRS-HIPEC in India. I can share my medical records.",
      ) +
      ")",
  ),

  h2("How GAF Healthcare Can Help"),
  p(
    "Share pathology, DICOM imaging, previous operative notes, tumour markers and a preferred travel window. A coordinator can introduce a [surgical oncology](" +
      SURG_DOCS +
      ") team experienced with CRS-HIPEC in [Delhi NCR](" +
      DELHI_DOCS +
      ") or [Mumbai](" +
      MUMBAI_DOCS +
      "), then help collect an itemised quotation covering surgery, HIPEC drugs, ICU and planned stay.",
  ),
  btn("Share records for a peritoneal oncology review", consult("CRS-HIPEC for Pseudomyxoma Peritonei")),

  h2("Medical Disclaimer"),
  p(
    "This article is for educational purposes only and does not replace a medical consultation, diagnosis or individualised treatment advice. CRS-HIPEC is a complex operation with significant risks. Its suitability must be determined by a qualified multidisciplinary team after reviewing the patient's complete medical information. Cost figures are indicative planning ranges and can change without notice. Emergency symptoms belong in a local emergency department.",
  ),
];

const now = "2026-11-11T09:50:00.000Z";
const SLUG = "pseudomyxoma-peritonei-treatment";

const article = {
  id: "art_pseudomyxoma_peritonei_treatment",
  slug: SLUG,
  title: "Pseudomyxoma Peritonei: Symptoms, Diagnosis, CRS-HIPEC Surgery and Treatment in India",
  excerpt:
    "Pseudomyxoma peritonei (PMP) is a rare condition in which mucin-producing tumour cells accumulate inside the abdominal cavity, most commonly following an appendiceal tumour. Treatment may involve cytoreductive surgery (CRS) and heated intraperitoneal chemotherapy (HIPEC) for suitable patients. Explore its symptoms, diagnosis, tumour grades, treatment options, recovery, costs and specialist care in India.",
  date: "11 November 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Surgical Oncology",
  tags: [
    "pseudomyxoma peritonei",
    "PMP",
    "CRS-HIPEC",
    "HIPEC",
    "appendiceal mucinous neoplasm",
    "LAMN",
    "peritoneal cancer",
    "India",
  ],
  image: "/uploads/articles/pmp-mucin-abdomen.webp",
  imageAlt:
    "Unlabeled medical diagram of mucin accumulating inside the abdominal cavity around organ silhouettes",
  status: "published",
  featured: true,
  seoTitle: "Pseudomyxoma Peritonei Treatment in India: CRS-HIPEC, Symptoms and Cost",
  seoDescription:
    "Learn about pseudomyxoma peritonei (PMP), its appendix-related causes, symptoms, diagnosis, PCI score, CRS-HIPEC surgery, recovery and treatment options in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/pmp-mucin-abdomen.webp",
  allowIndex: true,
  keywords: [
    "Pseudomyxoma peritonei treatment",
    "Pseudomyxoma peritonei treatment in India",
    "PMP surgery",
    "CRS-HIPEC for pseudomyxoma peritonei",
    "Pseudomyxoma peritonei symptoms",
    "Pseudomyxoma peritonei causes",
    "Appendix cancer treatment",
    "Appendiceal mucinous neoplasm",
    "Low-grade appendiceal mucinous neoplasm",
    "LAMN treatment",
    "Mucinous ascites",
    "Peritoneal cancer treatment in India",
    "HIPEC surgery cost in India",
    "Cytoreductive surgery for PMP",
    "Peritoneal Cancer Index",
  ],
  relatedLinks: [
    { label: "HIPEC surgery in India", href: HIPEC },
    { label: "Intraperitoneal chemotherapy in India", href: IP },
    { label: "Colon cancer treatment in India", href: COLON },
    { label: "Ovarian cancer treatment in India", href: OVARIAN },
    { label: "Stage 4 colon cancer treatment in India", href: STAGE4 },
    { label: "CRS with HIPEC cost in India", href: CRS_HIPEC },
    { label: "Cytoreductive surgery cost in India", href: CRS },
    { label: "PIPAC cost in India", href: PIPAC },
    { label: "Surgical oncologists in India", href: SURG_DOCS },
    { label: "Surgical oncology hospitals in India", href: SURG_HOSP },
  ],
  blocks,
};

if (!store.categories.includes("Surgical Oncology")) store.categories.push("Surgical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  [
    "pmp-mucin-abdomen.webp",
    "Unlabeled medical diagram of mucin accumulating inside the abdominal cavity around organ silhouettes",
  ],
  [
    "pmp-appendix-spread.webp",
    "Unlabeled diagram of an appendiceal mucinous tumour releasing mucin droplets into the peritoneal cavity",
  ],
  [
    "pmp-crs-hipec.webp",
    "Two-panel unlabeled diagram showing cytoreductive tumour removal on the left and heated intraperitoneal chemotherapy perfusion on the right",
  ],
  [
    "pmp-pci-regions.webp",
    "Unlabeled diagram of abdominal regions used to estimate peritoneal disease burden for the PCI score",
  ],
]) {
  const mediaId = `media_${file.replace(/[^a-z0-9]+/g, "_")}`;
  if (!store.media.some((row) => row.id === mediaId)) {
    store.media.push({
      id: mediaId,
      url: `/uploads/articles/${file}`,
      name: file,
      alt,
      addedAt: now,
    });
  }
}

const index = store.articles.findIndex((row) => row.id === article.id || row.slug === SLUG);
if (index >= 0) store.articles[index] = article;
else store.articles.unshift(article);

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log(
  "wrote",
  article.slug,
  "blocks",
  blocks.length,
  "ctas",
  blocks.filter(
    (b) =>
      b.type === "button" ||
      (b.type === "paragraph" && /wa\.me|\/consult\?/.test(b.text || "")),
  ).length,
  "faqs",
  faqs.length,
);

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(SLUG)) {
  llms = llms.replace(
    "and [how to choose a pediatric heart surgery hospital in India](https://gaf.healthcare/blogs/best-hospitals-pediatric-heart-surgery-india).",
    ", [how to choose a pediatric heart surgery hospital in India](https://gaf.healthcare/blogs/best-hospitals-pediatric-heart-surgery-india) and [pseudomyxoma peritonei treatment in India](https://gaf.healthcare/blogs/pseudomyxoma-peritonei-treatment).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}
