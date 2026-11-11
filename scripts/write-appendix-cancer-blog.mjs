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
const CHEMO_TX = "/treatments/chemotherapy-in-india";
const PMP = "/blogs/pseudomyxoma-peritonei-treatment";
const WHAT_HIPEC = "/blogs/what-is-hipec-surgery";
const PC = "/blogs/peritoneal-carcinomatosis";
const PM = "/blogs/peritoneal-metastases-treatment";
const PCI_BLOG = "/blogs/peritoneal-cancer-index-pci";
const STOMACH_HIPEC = "/blogs/hipec-surgery-for-stomach-cancer";
const STAGE4 = "/blogs/stage-4-colon-cancer-treatment-in-india";
const CRS_HIPEC = "/costs/India/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC";
const CRS = "/costs/India/Surgical-Oncology/Cytoreductive-Surgery";
const PIPAC = "/costs/India/Surgical-Oncology/PIPAC";
const CHEMO = "/costs/India/Medical-Oncology/Chemotherapy";
const IP_COST = "/costs/India/Medical-Oncology/Intraperitoneal-Chemotherapy";
const COLECTOMY = "/costs/India/Surgical-Oncology/Colectomy";
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

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>What is appendix cancer?</strong></td><td>A rare group of tumours arising in the appendix; behaviour depends on type and grade.</td></tr><tr><td><strong>Can it spread inside the abdomen?</strong></td><td>Yes. Some tumours release cells or mucin onto the peritoneum (peritoneal metastases / PMP).</td></tr><tr><td><strong>Main specialist option for peritoneal spread</strong></td><td>CRS-HIPEC for selected operable patients — see <a href="${HIPEC}">HIPEC surgery in India</a></td></tr><tr><td><strong>Related condition</strong></td><td><a href="${PMP}">Pseudomyxoma peritonei (PMP)</a> from mucin-producing appendiceal tumours</td></tr><tr><td><strong>Key documents</strong></td><td>Full pathology report, CT/MRI (DICOM), prior operative notes</td></tr><tr><td><strong>GAF CRS + HIPEC planning range</strong></td><td><a href="${CRS_HIPEC}">$18,000–$40,000</a>, typically <strong>10–21 nights</strong></td></tr><tr><td><strong>Cytoreductive surgery alone</strong></td><td><a href="${CRS}">$10,000–$24,000</a>, typically <strong>7–14 nights</strong></td></tr><tr><td><strong>Systemic chemotherapy</strong></td><td><a href="${CHEMO}">$1,500–$8,000+</a> (outpatient cycles · 3–6 months typical)</td></tr><tr><td><strong>International patients</strong></td><td>Obtain specialist review before travelling; do not assume HIPEC will be performed</td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>Appendix cancer treatment in India</strong> depends on tumour type, grade and whether disease has spread across the peritoneum. For suitable patients with resectable peritoneal disease, <strong>CRS-HIPEC</strong> is a specialist option. GAF planning for <a href="${CRS_HIPEC}">CRS with HIPEC</a> is <strong>$18,000–$40,000</strong> (typically <strong>10–21 nights</strong>). These are partner planning ranges, not hospital quotations.</p><p class="article-quick-answer__body"><strong>Important:</strong> GAF Healthcare does not diagnose appendix cancer or decide CRS-HIPEC eligibility. Treatment decisions remain with the multidisciplinary hospital team.</p></aside>`;

const pciTable = `<div class="md-body"><table><thead><tr><th>PCI score</th><th>What it indicates</th></tr></thead><tbody><tr><td>0</td><td>No visible peritoneal tumour</td></tr><tr><td>Higher score</td><td>Greater amount of disease</td></tr><tr><td>Maximum 39</td><td>Extensive tumour involvement across the assessed regions</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Named pathway</th><th>GAF planning range in India</th><th>Typical stay</th></tr></thead><tbody><tr><td><a href="${CRS_HIPEC}">Cytoreductive surgery with HIPEC</a></td><td>$18,000–$40,000</td><td>10–21 nights</td></tr><tr><td><a href="${CRS}">Cytoreductive surgery</a></td><td>$10,000–$24,000</td><td>7–14 nights</td></tr><tr><td><a href="${COLECTOMY}">Colectomy</a> (when right colectomy is planned separately)</td><td>$7,000–$18,000</td><td>—</td></tr><tr><td><a href="${PIPAC}">PIPAC</a></td><td>$7,000–$16,000</td><td>2–5 nights</td></tr><tr><td><a href="${IP_COST}">Intraperitoneal chemotherapy</a> (catheter/port pathway)</td><td>$5,000–$14,000</td><td>Tied to cytoreduction or IP ports</td></tr><tr><td><a href="${CHEMO}">Systemic chemotherapy</a></td><td>$1,500–$8,000+</td><td>Outpatient cycles · 3–6 months typical</td></tr></tbody></table></div>`;

const estimateTable = `<div class="md-body"><table><thead><tr><th>Cost component</th><th>What to check</th></tr></thead><tbody><tr><td>Initial consultation</td><td>Surgical and medical oncology opinions</td></tr><tr><td>Investigations</td><td>Scans, blood tests and pathology</td></tr><tr><td>Surgery</td><td>Planned removal of tumour and affected tissue</td></tr><tr><td>HIPEC</td><td>Chemotherapy and perfusion charges</td></tr><tr><td>Anaesthesia</td><td>Operating theatre and anaesthesia</td></tr><tr><td>Intensive care</td><td>Expected ICU monitoring</td></tr><tr><td>Hospital stay</td><td>Room category and estimated duration</td></tr><tr><td>Additional treatment</td><td>Chemotherapy or complication management</td></tr><tr><td>Follow-up</td><td>Reviews and investigations</td></tr></tbody></table></div>`;

const cityTable = `<div class="md-body"><table><thead><tr><th>City</th><th>CRS-HIPEC doctor list</th><th>GAF planning range</th></tr></thead><tbody><tr><td>Delhi NCR</td><td><a href="${DELHI_DOCS}">Surgical oncology · CRS with HIPEC</a></td><td>$18,000–$40,000</td></tr><tr><td>Mumbai</td><td><a href="${MUMBAI_DOCS}">Surgical oncology · CRS with HIPEC</a></td><td>$18,000–$40,000</td></tr><tr><td>Bengaluru</td><td><a href="${BLR_DOCS}">Surgical oncology · CRS with HIPEC</a></td><td>$18,000–$40,000</td></tr><tr><td>Chennai</td><td><a href="${CHN_DOCS}">Surgical oncology · CRS with HIPEC</a></td><td>$18,000–$40,000</td></tr><tr><td>Hyderabad</td><td><a href="${HYD_DOCS}">Surgical oncology · CRS with HIPEC</a></td><td>$18,000–$40,000</td></tr></tbody></table></div>`;

const faqs = [
  ["What is appendix cancer?", "Appendix cancer develops when abnormal cells grow in the appendix, a small pouch attached to the large intestine. It is rare and includes several tumour types. Some remain limited to the appendix, while others can spread inside the abdomen."],
  ["Is appendix cancer the same as colon cancer?", "No. The appendix is attached to the large intestine, but appendix cancer is a separate diagnosis. Some types behave similarly to colorectal cancers, while mucin-producing tumours often need a different pathway. See colon cancer treatment in India for colorectal peritoneal disease."],
  ["What are the symptoms of appendix cancer?", "Symptoms may include lower-right abdominal pain, bloating, swelling, loss of appetite, unexplained weight loss, nausea, vomiting and bowel changes. Some patients have no symptoms until an appendectomy or incidental imaging."],
  ["Can appendix cancer be found during appendicitis surgery?", "Yes. Some tumours are discovered when the appendix is removed for suspected appendicitis. The removed tissue should be examined by a pathologist."],
  ["Does appendix cancer always spread?", "No. Some tumours stay confined to the appendix. Others spread to the peritoneum or distant organs. Tumour type, grade, rupture and pathology findings guide risk."],
  ["What is mucinous appendix cancer?", "A tumour that produces mucin, a thick jelly-like substance. If mucin and tumour cells escape into the abdomen, they may cause pseudomyxoma peritonei."],
  ["What is pseudomyxoma peritonei?", "PMP is accumulation of mucin and tumour cells inside the abdomen, most often from a mucin-producing appendiceal tumour. See the PMP treatment guide for a dedicated pathway."],
  ["Is pseudomyxoma peritonei the same as appendix cancer?", "No. PMP is a peritoneal condition that can develop from certain mucin-producing appendix tumours. The terms are related but not interchangeable."],
  ["How is appendix cancer diagnosed?", "Diagnosis may involve CT, MRI, colonoscopy, biopsy, pathology review and tumour markers. Diagnostic laparoscopy may help assess peritoneal extent and resectability."],
  ["Why is the pathology report so important?", "It identifies tumour type and grade — LAMN, HAMN, adenocarcinoma, goblet cell adenocarcinoma or neuroendocrine tumour — which drives whether surgery, chemotherapy or CRS-HIPEC is appropriate."],
  ["What is CRS-HIPEC?", "CRS removes visible peritoneal deposits; HIPEC circulates heated chemotherapy inside the abdomen afterwards. See HIPEC surgery in India for the coordinated pathway."],
  ["Is HIPEC a cure for appendix cancer?", "No treatment is a guaranteed cure. Selected patients may achieve long-term control after CRS-HIPEC, but recurrence is possible and depends on histology, extent and completeness of cytoreduction."],
  ["Who may need HIPEC for appendix cancer?", "Selected patients with peritoneal spread when complete or meaningful cytoreduction is achievable and the patient is fit for major surgery."],
  ["Can a patient with low-grade appendix cancer need HIPEC?", "Yes, if low-grade disease has spread widely inside the abdomen. Tumours confined to the appendix may need only local surgery or surveillance."],
  ["Does high-grade appendix cancer need chemotherapy?", "Often systemic chemotherapy is considered. Neoadjuvant chemotherapy may be used before surgery in selected cases. Named systemic lists sit on chemotherapy in India."],
  ["What is the PCI score?", "The Peritoneal Cancer Index estimates disease burden across 13 abdominal regions (0–39). See the PCI guide for how surgeons use it."],
  ["Does a high PCI score mean HIPEC is impossible?", "Not automatically. Distribution — especially small-bowel involvement — can matter more than the total number."],
  ["How long does HIPEC surgery take?", "Several hours, depending on disease extent, bowel resections and reconstruction. GAF CRS-HIPEC planning typically quotes 10–21 nights in hospital."],
  ["Will the patient need their colon removed?", "Not always. Selected appendiceal adenocarcinomas may need right colectomy; others need more limited surgery. Pathology and operative findings decide."],
  ["Will the patient need a stoma after HIPEC?", "Not everyone. A stoma may be needed after certain bowel resections or to protect an anastomosis. Discuss this before surgery."],
  ["What are the risks of HIPEC surgery?", "Bleeding, infection, bowel leakage, obstruction, kidney injury, blood-count changes, clots and prolonged stay. Sudden severe pain, fever, collapse or inability to pass stool/gas need a local emergency department."],
  ["Can appendix cancer come back after HIPEC?", "Yes. Recurrence risk depends on type, grade, disease burden and completeness of cytoreduction. Long-term surveillance is essential."],
  ["What is the cost of appendix cancer treatment in India?", "GAF planning for CRS with HIPEC is $18,000–$40,000 (10–21 nights). Cytoreductive surgery alone is $10,000–$24,000. Limited colectomy and systemic chemotherapy have separate sheets. Final quotations follow case review."],
  ["Can international patients travel to India for appendix cancer treatment?", "Yes. Share pathology, DICOM imaging, operative notes and tumour markers before travelling so a peritoneal oncology team can advise."],
  ["Should patients travel to India only for HIPEC?", "No. Obtain a specialist opinion first. Some patients need chemotherapy, limited surgery, surveillance or supportive care instead."],
  ["How can GAF Healthcare help?", "GAF can organise reports, coordinate consultations, communicate estimates and help with travel and admission logistics. Diagnosis and eligibility remain with treating doctors."],
];

const RELATED = [
  ["HIPEC Surgery in India", HIPEC],
  ["What Is HIPEC Surgery?", WHAT_HIPEC],
  ["Pseudomyxoma Peritonei Treatment in India", PMP],
  ["Peritoneal Carcinomatosis", PC],
  ["Peritoneal Metastases Treatment", PM],
  ["Peritoneal Cancer Index (PCI)", PCI_BLOG],
  ["HIPEC Surgery for Stomach Cancer", STOMACH_HIPEC],
  ["Intraperitoneal Chemotherapy in India", IP],
  ["Colon Cancer Treatment in India", COLON],
  ["Stage 4 Colon Cancer Treatment in India", STAGE4],
  ["CRS with HIPEC — cost sheet", CRS_HIPEC],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("The appendix is a small, finger-shaped pouch attached to the large intestine, usually in the lower-right abdomen. Most people know it because of appendicitis, but the appendix can also develop tumours, including cancer."),
  p("Appendix cancer is rare. Some types grow slowly; others behave more aggressively. Certain tumours produce mucin. If tumour cells or mucin escape from the appendix, they may spread across the peritoneal lining — **peritoneal spread**."),
  p("When this happens, patients may develop abdominal swelling, discomfort, loss of appetite, digestive problems or fluid accumulation. For selected patients, **CRS-HIPEC** may be considered: cytoreductive surgery to remove visible deposits, then heated intraperitoneal chemotherapy. The coordinated pathway is [HIPEC surgery in India](" + HIPEC + ")."),
  p("GAF Healthcare planning for [cytoreductive surgery with HIPEC](" + CRS_HIPEC + ") is **$18,000–$40,000**, typically **10–21 nights**. Neighbouring [cytoreductive surgery](" + CRS + ") is **$10,000–$24,000** (7–14 nights). Neighbouring [PIPAC](" + PIPAC + ") is **$7,000–$16,000**. Mucin-producing peritoneal disease is covered in depth on [pseudomyxoma peritonei treatment](" + PMP + ")."),
  p("International patients comparing [surgical oncologists listing CRS with HIPEC](" + SURG_DOCS + ") commonly start with [Delhi NCR](" + DELHI_DOCS + "), [Mumbai](" + MUMBAI_DOCS + "), [Bengaluru](" + BLR_DOCS + "), [Chennai](" + CHN_DOCS + ") and [Hyderabad](" + HYD_DOCS + "). Partner [surgical-oncology hospitals](" + SURG_HOSP + ") in [Delhi NCR](" + DELHI_HOSP + "), [Mumbai](" + MUMBAI_HOSP + ") and [Bengaluru](" + BLR_HOSP + ") are a typical first filter."),
  btn("Ask about appendix cancer treatment in India", consult("Appendix Cancer / CRS-HIPEC")),
  p("[WhatsApp +91 90443 46292 with pathology, CT and operative notes](" + wa("Please review my appendix cancer pathology, CT/MRI and previous surgery notes and advise whether CRS-HIPEC in India may be appropriate.") + ")"),
  img("/uploads/articles/appendix-cancer-anatomy.webp", "Unlabeled diagram of the appendix attached to the caecum within the abdominal cavity", "Appendix tumours are uncommon; behaviour and treatment depend on the exact pathological type."),

  h2("What Is Appendix Cancer?"),
  p("Appendix cancer develops when abnormal cells grow inside the appendix. Tumours are uncommon and include several types with very different behaviour."),
  h3("What are the main types of appendix cancer?"),
  ul([
    "**Mucinous tumours:** Produce jelly-like mucin; some cause [pseudomyxoma peritonei](" + PMP + ") when mucin and cells spread inside the abdomen.",
    "**Appendiceal adenocarcinoma:** Cancer from lining cells; some produce mucin and some do not.",
    "**Goblet cell adenocarcinoma:** A distinct type with different biology that should not automatically follow the LAMN/PMP pathway.",
    "**Appendiceal neuroendocrine tumours:** Often found after appendectomy; treatment depends on size, grade and spread.",
  ]),
  p("These types should not be treated as if they are all the same. A correct pathology report is essential before deciding on surgery or chemotherapy."),

  h2("How Does Appendix Cancer Spread Inside the Abdomen?"),
  p("Some tumours grow through the appendix wall. If the appendix is damaged or ruptures, cells and mucin may escape, attach to peritoneal surfaces and grow on the abdominal wall lining, omentum, bowel surfaces, pelvis, liver surface, diaphragm and other peritoneal areas. This is **peritoneal metastasis** — also explained on [peritoneal metastases treatment](" + PM + ") and [peritoneal carcinomatosis](" + PC + ")."),
  img("/uploads/articles/appendix-peritoneal-spread.webp", "Unlabeled diagram of mucin and tumour deposits spreading from the appendix across the peritoneal cavity", "Peritoneal spread can cause progressive abdominal enlargement and digestive symptoms."),
  h3("What is pseudomyxoma peritonei?"),
  p("PMP is accumulation of mucin-producing tumour cells and jelly-like material inside the abdomen, most commonly from an appendiceal mucinous tumour. Not every appendix cancer causes PMP. Read the dedicated guide: [Pseudomyxoma Peritonei Treatment in India](" + PMP + ")."),
  h3("Does appendix cancer always spread?"),
  p("No. Risk depends on tumour type, grade, size, rupture and other pathology features."),

  h2("Symptoms of Appendix Cancer"),
  p("Symptoms may resemble common digestive problems, and some patients have none. Tumours may be found during appendectomy or incidental imaging."),
  ul(["Lower-right abdominal pain", "Persistent discomfort, swelling or bloating", "Loss of appetite or early fullness", "Unexplained weight loss", "Nausea, vomiting, constipation or bowel-habit changes", "Fluid accumulation (ascites) inside the abdomen"]),
  p("Severe abdominal pain, repeated vomiting, inability to pass stool or gas, or sudden swelling require **urgent local emergency care** — not WhatsApp."),
  btn("Share symptom history and imaging for review", consult("Appendix Cancer Symptoms Review")),

  h2("How Is Appendix Cancer Diagnosed?"),
  p("Doctors combine CT, selected MRI, colonoscopy, biopsy/pathology, tumour markers (CEA, CA 19-9, sometimes CA-125) and, in selected cases, diagnostic laparoscopy to assess resectability."),
  p("Colonoscopy may exclude synchronous colorectal lesions — relevant when colorectal pathways are also considered on [colon cancer treatment in India](" + COLON + ") or [stage 4 colon cancer treatment](" + STAGE4 + ")."),
  p("Diagnostic laparoscopy can clarify small-bowel involvement, mucin distribution and whether complete cytoreduction is realistic before committing to CRS-HIPEC."),

  h2("Why Is the Pathology Report So Important?"),
  p("Low-grade mucinous disease, high-grade adenocarcinoma, goblet cell adenocarcinoma and neuroendocrine tumours need different plans. Signet-ring cells may indicate more aggressive behaviour. International patients should share the full report and, when requested, slides or tissue blocks before travelling."),
  p("[WhatsApp +91 90443 46292 with the full pathology PDF](" + wa("I can share my full appendix tumour pathology report for a specialist review in India regarding surgery, chemotherapy or CRS-HIPEC.") + ")"),

  h2("What Is CRS-HIPEC for Appendix Cancer?"),
  p("CRS removes visible peritoneal deposits; HIPEC then circulates heated chemotherapy inside the abdomen to target microscopic residual cells. See [What Is HIPEC Surgery?](" + WHAT_HIPEC + ") and [HIPEC surgery in India](" + HIPEC + "). HIPEC cannot replace effective cytoreduction."),
  img("/uploads/articles/appendix-crs-hipec.webp", "Two-panel unlabeled diagram of cytoreductive tumour removal and heated intraperitoneal chemotherapy perfusion", "CRS removes visible disease; HIPEC targets microscopic residual cells on peritoneal surfaces."),
  btn("Ask whether CRS-HIPEC fits my appendix cancer", consult("CRS-HIPEC for Appendix Cancer")),

  h2("How Does HIPEC Surgery Work?"),
  ol([
    "Review pathology, CT/MRI, prior operative notes, markers and fitness.",
    "Inspect the abdomen (laparoscopy or at the start of surgery).",
    "Remove visible deposits — omentum, peritoneum, selected bowel, and right colectomy when appropriate for adenocarcinoma.",
    "Assess completeness of cytoreduction.",
    "Circulate heated chemotherapy per institutional protocol.",
    "Complete surgery and transfer to recovery or intensive care.",
  ]),
  p("Not every patient needs every resection. Neighbouring [colectomy](" + COLECTOMY + ") planning is **$7,000–$18,000** when that sheet is the named pathway."),

  h2("Who May Be Suitable for CRS-HIPEC?"),
  p("Doctors may consider CRS-HIPEC when peritoneal spread is present, the tumour type fits this approach, complete or meaningful cytoreduction is realistic, the patient is fit, critical structures allow safe surgery, and expected benefit justifies risk."),
  p("It may be unsuitable with extensive distant metastases, unresectable deposits, prohibitive small-bowel involvement, medical unfitness or rapidly progressive disease. Low-grade disease confined to the appendix may need only local surgery or surveillance. High-grade disease may need [systemic chemotherapy](" + CHEMO_TX + ") (**$1,500–$8,000+** planning) before or instead of surgery."),

  h2("What Is the PCI Score and Why Does It Matter?"),
  p("PCI estimates peritoneal burden across 13 regions (score 0–39). Location matters as much as the total — especially small-bowel surface and mesentery. Read [Peritoneal Cancer Index (PCI)](" + PCI_BLOG + ")."),
  html(pciTable),
  img("/uploads/articles/appendix-pci-assessment.webp", "Unlabeled diagram of abdominal regions used to estimate peritoneal disease burden", "PCI helps structure the discussion of resectability; it is not a single yes/no cut-off."),

  h2("What Are the Other Treatment Options?"),
  ul([
    "**Surgery without HIPEC** for tumours confined to the appendix or limited local disease.",
    "**Systemic chemotherapy** for selected high-grade or unresectable disease — [chemotherapy in India](" + CHEMO_TX + ").",
    "**Targeted treatment or immunotherapy** only when tumour testing and clinical circumstances support them.",
    "**Supportive care** for symptoms, nutrition and quality of life alongside active treatment.",
    "**Catheter-based IP chemotherapy** in selected settings — [intraperitoneal chemotherapy in India](" + IP + ").",
  ]),

  h2("What Are the Risks of CRS-HIPEC?"),
  ul(["Bleeding, infection, wound problems", "Bowel leakage, obstruction, delayed bowel recovery", "Blood clots, kidney injury, blood-count changes", "Nausea, breathing complications, further surgery, prolonged stay"]),
  p("A stoma is not required for every patient. Risks vary with extent of surgery, health and team experience."),

  h2("Recovery After HIPEC Surgery"),
  p("Recovery differs from routine appendectomy. Patients may need intensive monitoring. GAF planning for [CRS with HIPEC](" + CRS_HIPEC + ") typically quotes **10–21 nights**. Nutrition progresses gradually; early walking is encouraged when safe. Long-term follow-up with examination, imaging and markers is essential."),

  h2("Can Appendix Cancer Come Back After HIPEC?"),
  p("Yes. Recurrence risk depends on type, grade, burden, completeness of cytoreduction and nodal status. Options if disease returns may include further surgery, selected repeat CRS-HIPEC, systemic therapy or supportive care."),

  h2("Appendix Cancer Treatment in India"),
  p("Patients from East Africa, the Middle East and other regions may explore India for appendiceal and peritoneal surface oncology. Experience with general cancer surgery is not the same as experience with CRS-HIPEC for appendiceal disease."),
  ol([
    "Does the team regularly treat appendiceal peritoneal disease?",
    "Who leads CRS-HIPEC, and how is pathology reviewed?",
    "How are PCI and resectability assessed?",
    "What if complete cytoreduction is not possible?",
    "What ICU, nutrition and follow-up support is available?",
  ]),
  btn("Request a specialist appendix-cancer review before travel", consult("Appendix Cancer Treatment in India")),
  p("[WhatsApp +91 90443 46292 with DICOM links and pathology](" + wa("I am an international patient with appendix cancer / peritoneal spread. I can share DICOM imaging and pathology for a preliminary CRS-HIPEC opinion in India.") + ")"),

  h2("Appendix Cancer Treatment Cost in India"),
  p("Cost depends on tumour type and whether treatment is limited surgery, systemic therapy or extensive CRS-HIPEC. GAF publishes partner planning ranges — not quotations."),
  html(costTable),
  p("City CRS-HIPEC sheets: [Delhi NCR](" + DELHI_COST + "), [Mumbai](" + MUMBAI_COST + "), [Bengaluru](" + BLR_COST + "), [Chennai](" + CHN_COST + "), [Hyderabad](" + HYD_COST + "). The national band remains **$18,000–$40,000**."),
  html(cityTable),
  html(estimateTable),
  p("**Important:** Do not choose a hospital on price alone. Experience, complication management and postoperative care matter more."),
  btn("Request an itemised CRS-HIPEC cost estimate", consult("Appendix Cancer CRS-HIPEC Cost Estimate")),

  h2("How GAF Healthcare Can Help Patients Explore Appendix Cancer Treatment in India"),
  p("GAF Healthcare can help organise reports, share records with hospitals, coordinate consultations and estimates, and support travel, admission and follow-up logistics. GAF does not diagnose cancer, decide HIPEC eligibility or guarantee outcomes."),

  h2("Frequently Asked Questions About Appendix Cancer and HIPEC"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Key Takeaways"),
  ul([
    "Appendix cancer is rare and includes several tumour types.",
    "Some tumours spread across the peritoneum; mucinous disease may cause PMP.",
    "Pathology grade and type drive treatment choice.",
    "CRS-HIPEC is for selected patients with resectable peritoneal disease.",
    "GAF CRS-HIPEC planning is $18,000–$40,000 (typically 10–21 nights).",
    "Obtain a specialist review before travelling for HIPEC.",
  ]),

  h2("Top Medical Sources and References"),
  p("1. [National Cancer Institute — Appendix Cancer](https://www.cancer.gov/pediatric-adult-rare-tumor/rare-tumors/rare-digestive-system-tumors/appendiceal-cancer)."),
  p("2. [Consensus Guideline for Appendiceal Tumors with Peritoneal Involvement (2025)](https://pubmed.ncbi.nlm.nih.gov/40558065/)."),
  p("3. [ASCRS — Management of Appendiceal Neoplasms (2025)](https://www.ascrsu.com/ascrs/view/ASCRS-Evidence-Based-Guidelines-and-Expert-Consensus/3982016/all/Management_of_Appendiceal_Neoplasms__2025_)."),
  p("4. [INDEPSO-ISPSM Consensus on Mucinous Appendiceal Neoplasms and PMP (2025)](https://pubmed.ncbi.nlm.nih.gov/41415773/)."),
  p("5. [Consensus Guideline for Appendiceal Tumors Without Peritoneal Involvement (2025)](https://pubmed.ncbi.nlm.nih.gov/40558064/)."),
  p("6. [GAF Healthcare CRS with HIPEC cost sheet](" + CRS_HIPEC + ") — $18,000–$40,000; typically 10–21 nights."),
  p("**Last reviewed against the cited sources: November 2026.**"),

  h2("Related Reading on GAF Healthcare"),
  ul(RELATED.map(([label, href]) => `[${label}](${href})`)),

  h2("Explore Appendix Cancer Treatment in India"),
  p("Understanding the exact tumour type and whether peritoneal spread is resectable is the first step. GAF Healthcare coordinates specialist consultations and treatment planning for international patients."),
  btn("Contact GAF Healthcare for a specialist consultation", consult("Appendix Cancer Treatment in India")),
  p("[WhatsApp +91 90443 46292 to start a record review](" + wa("I would like GAF Healthcare to coordinate a specialist consultation for appendix cancer / CRS-HIPEC in India.") + ")"),

  h2("How GAF Healthcare Can Help"),
  p("Share pathology, DICOM imaging, operative notes and a preferred travel window. A coordinator can introduce a [surgical oncology](" + SURG_DOCS + ") team in [Delhi NCR](" + DELHI_DOCS + ") or [Mumbai](" + MUMBAI_DOCS + ") and help collect an itemised quotation."),
  btn("Share records for a peritoneal oncology review", consult("CRS-HIPEC for Appendix Cancer")),

  h2("Medical Disclaimer"),
  p("This article is for educational purposes only and does not replace medical consultation, diagnosis or individualised advice. CRS-HIPEC is a complex operation with significant risks. Suitability must be determined by a qualified multidisciplinary team. Cost figures are indicative planning ranges. Emergency symptoms belong in a local emergency department."),
];

const now = "2026-11-11T10:30:00.000Z";
const SLUG = "appendix-cancer-treatment-hipec-india";

const article = {
  id: "art_appendix_cancer_treatment_hipec_india",
  slug: SLUG,
  title: "Appendix Cancer That Has Spread Inside the Abdomen: Symptoms, Treatment, HIPEC Surgery and Cost in India",
  excerpt:
    "Appendix cancer is rare, but some types can spread inside the abdomen and affect the lining around abdominal organs. Treatment may include surgery, chemotherapy or a specialised procedure called CRS-HIPEC. Learn about symptoms, diagnosis, treatment choices, recovery and how patients can explore specialist care in India.",
  date: "11 November 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Surgical Oncology",
  tags: [
    "appendix cancer",
    "appendiceal cancer",
    "CRS-HIPEC",
    "HIPEC",
    "pseudomyxoma peritonei",
    "peritoneal metastases",
    "India",
  ],
  image: "/uploads/articles/appendix-cancer-anatomy.webp",
  imageAlt: "Unlabeled diagram of the appendix attached to the caecum within the abdominal cavity",
  status: "published",
  featured: true,
  seoTitle: "Appendix Cancer Treatment in India: Symptoms, HIPEC Surgery and Cost",
  seoDescription:
    "Learn about appendix cancer that has spread inside the abdomen, its symptoms, diagnosis, treatment options, HIPEC surgery, recovery and treatment cost in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/appendix-cancer-anatomy.webp",
  allowIndex: true,
  keywords: [
    "Appendix cancer treatment in India",
    "Appendix cancer symptoms",
    "Appendix cancer treatment",
    "Appendix cancer that has spread",
    "Appendix cancer with peritoneal metastases",
    "HIPEC surgery for appendix cancer",
    "CRS-HIPEC treatment in India",
    "Appendiceal cancer treatment",
    "Appendix tumour treatment",
    "Pseudomyxoma peritonei",
    "Appendix cancer surgery cost in India",
    "Peritoneal cancer treatment",
    "Cytoreductive surgery",
    "Appendix cancer chemotherapy",
  ],
  relatedLinks: RELATED.map(([label, href]) => ({ label, href })),
  blocks,
};

if (!store.categories.includes("Surgical Oncology")) store.categories.push("Surgical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["appendix-cancer-anatomy.webp", article.imageAlt],
  ["appendix-peritoneal-spread.webp", "Unlabeled diagram of mucin and tumour deposits spreading from the appendix across the peritoneal cavity"],
  ["appendix-crs-hipec.webp", "Two-panel unlabeled diagram of cytoreductive tumour removal and heated intraperitoneal chemotherapy perfusion"],
  ["appendix-pci-assessment.webp", "Unlabeled diagram of abdominal regions used to estimate peritoneal disease burden"],
]) {
  const mediaId = `media_${file.replace(/[^a-z0-9]+/g, "_")}`;
  if (!store.media.some((row) => row.id === mediaId)) {
    store.media.push({ id: mediaId, url: `/uploads/articles/${file}`, name: file, alt, addedAt: now });
  }
}

const index = store.articles.findIndex((row) => row.id === article.id || row.slug === SLUG);
if (index >= 0) store.articles[index] = article;
else store.articles.unshift(article);

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG, "blocks", blocks.length, "faqs", faqs.length);

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(SLUG)) {
  llms = llms.replace(
    "and [pseudomyxoma peritonei treatment in India](https://gaf.healthcare/blogs/pseudomyxoma-peritonei-treatment).",
    ", [pseudomyxoma peritonei treatment in India](https://gaf.healthcare/blogs/pseudomyxoma-peritonei-treatment) and [appendix cancer treatment and HIPEC in India](https://gaf.healthcare/blogs/appendix-cancer-treatment-hipec-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

// Reciprocal link from PMP blog related reading if present
const pmp = store.articles.find((row) => row.slug === "pseudomyxoma-peritonei-treatment");
if (pmp) {
  const href = `/blogs/${SLUG}`;
  if (!pmp.relatedLinks?.some((row) => row.href === href)) {
    pmp.relatedLinks = pmp.relatedLinks || [];
    pmp.relatedLinks.push({ label: "Appendix cancer treatment and HIPEC in India", href });
  }
  for (const block of pmp.blocks) {
    if (block.type === "list" && Array.isArray(block.items) && block.items.some((item) => item.includes("/blogs/pseudomyxoma-peritonei-treatment") === false) && block.items.some((item) => /HIPEC Surgery in India|Pseudomyxoma|Peritoneal Cancer Index/.test(item))) {
      if (!block.items.some((item) => item.includes(href))) {
        block.items.push(`[Appendix Cancer Treatment and HIPEC in India](${href})`);
      }
      break;
    }
  }
  // safer: find Related Reading heading
  for (let i = 0; i < pmp.blocks.length; i++) {
    if (pmp.blocks[i].type === "heading" && pmp.blocks[i].text === "Related Reading on GAF Healthcare") {
      for (let j = i + 1; j < Math.min(i + 5, pmp.blocks.length); j++) {
        if (pmp.blocks[j].type === "list" && !pmp.blocks[j].items.some((item) => item.includes(href))) {
          pmp.blocks[j].items.push(`[Appendix Cancer Treatment and HIPEC in India](${href})`);
        }
      }
      break;
    }
  }
  writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
  console.log("linked from PMP related reading");
}
