import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) => `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) => `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const PILLAR = "/treatments/breast-cancer-treatment-in-india";
const CHEMO_TX = "/treatments/chemotherapy-in-india";
const ADJ = "/treatments/adjuvant-chemotherapy-in-india";
const NEO = "/treatments/neoadjuvant-chemotherapy-in-india";
const RECON_TX = "/treatments/breast-reconstruction-in-india";

const DIAG = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const STAGES_LEGACY = "/blogs/breast-cancer-stages-0-1-2-3-4";
const BY_STAGE = "/blogs/breast-cancer-treatment-by-stage";
const COST_BLOG = "/blogs/breast-cancer-treatment-cost-in-india";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const CHEMO_BLOG = "/blogs/chemotherapy-for-breast-cancer-in-india";
const RAD = "/blogs/radiation-therapy-for-breast-cancer";
const HER2 = "/blogs/her2-positive-breast-cancer-treatment-india";
const HORMONE = "/blogs/hormone-therapy-breast-cancer-india";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const RECON = "/blogs/breast-reconstruction-after-mastectomy-india";
const PATHOLOGY = "/blogs/breast-cancer-pathology-report-explained";
const BIOMARKERS = "/blogs/er-pr-her2-breast-cancer-treatment-india";
const NEO_BLOG = "/blogs/breast-cancer-neoadjuvant-therapy";
const YOUNG = "/blogs/breast-cancer-in-young-women-treatment-india";

// New sibling cluster
const SYMPTOMS = "/blogs/breast-cancer-symptoms";
const DIAG_NEW = "/blogs/breast-cancer-diagnosis";
const TX_OPTIONS = "/blogs/breast-cancer-treatment-options";

const LUMPECTOMY = "/costs/India/Surgical-Oncology/Lumpectomy";
const MASTECTOMY = "/costs/India/Surgical-Oncology/Mastectomy";
const CHEMO = "/costs/India/Medical-Oncology/Chemotherapy";
const HORMONE_COST = "/costs/India/Medical-Oncology/Hormone-Therapy";
const TARGETED = "/costs/India/Medical-Oncology/Targeted-Therapy";
const IMMUNO = "/costs/India/Medical-Oncology/Immunotherapy";
const EBRT = "/costs/India/Radiation-Oncology/EBRT";

const SURG_DOCS = "/doctors/India/Surgical-Oncology";
const MED_DOCS = "/doctors/India/Medical-Oncology";
const DELHI_HOSP = "/hospitals/India/Delhi-NCR/Surgical-Oncology";
const MUMBAI_HOSP = "/hospitals/India/Mumbai/Surgical-Oncology";
const BLR_HOSP = "/hospitals/India/Bengaluru/Surgical-Oncology";

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

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>How many stages?</strong></td><td>Five main stages: <strong>0, 1, 2, 3 and 4</strong></td></tr><tr><td><strong>Stage 0</strong></td><td>Non-invasive disease such as DCIS</td></tr><tr><td><strong>Stages 1–2</strong></td><td>Early invasive cancer — limited breast ± nearby nodes</td></tr><tr><td><strong>Stage 3</strong></td><td>Locally advanced — more extensive local/regional disease, no distant spread</td></tr><tr><td><strong>Stage 4</strong></td><td>Distant metastasis (bones, liver, lungs, brain)</td></tr><tr><td><strong>TNM</strong></td><td>Tumour size/extent (T), regional nodes (N), distant metastasis (M)</td></tr><tr><td><strong>Treatment by stage</strong></td><td>See <a href="${BY_STAGE}">treatment by stage</a> and <a href="${TX_OPTIONS}">treatment options</a></td></tr><tr><td><strong>GAF lumpectomy</strong></td><td><a href="${LUMPECTOMY}">$3,500–$8,000</a>, typically <strong>1–3 nights</strong></td></tr><tr><td><strong>GAF mastectomy</strong></td><td><a href="${MASTECTOMY}">$4,500–$10,000</a>, typically <strong>3–6 nights</strong></td></tr><tr><td><strong>Chemo / EBRT / hormone</strong></td><td><a href="${CHEMO}">$1,500–$8,000+</a> · <a href="${EBRT}">$1,000–$6,000+</a> · <a href="${HORMONE_COST}">$1,000–$4,500</a></td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>Breast cancer stages</strong> describe how far disease has developed — not tumour size alone. Stage 4 means distant metastasis; Stages 0–3 do not. Biology (ER/PR/HER2, grade) also shapes treatment. Companion guides: <a href="${STAGES_LEGACY}">stages 0–4 explainer</a>, <a href="${BY_STAGE}">treatment by stage</a>, <a href="${SYMPTOMS}">symptoms</a>, <a href="${DIAG_NEW}">diagnosis</a>, <a href="${COST_BLOG}">cost in India</a>. GAF planning for <a href="${LUMPECTOMY}">lumpectomy</a> is <strong>$3,500–$8,000</strong> and <a href="${MASTECTOMY}">mastectomy</a> <strong>$4,500–$10,000</strong> — partner ranges, not quotations.</p><p class="article-quick-answer__body"><strong>Important:</strong> GAF Healthcare does not diagnose or prescribe. Staging and treatment decisions belong with treating specialists after reviewing imaging and pathology. Emergency symptoms belong in a local emergency department.</p></aside>`;

const stageOverviewTable = `<div class="md-body"><table><thead><tr><th>Stage</th><th>What it generally means</th></tr></thead><tbody><tr><td>Stage 0</td><td>Non-invasive cancer, such as ductal carcinoma in situ (DCIS)</td></tr><tr><td>Stage 1</td><td>Early invasive cancer, generally limited to the breast or involving only very small amounts of nearby lymph node tissue</td></tr><tr><td>Stage 2</td><td>Cancer may be larger or may have spread to a limited number of nearby lymph nodes</td></tr><tr><td>Stage 3</td><td>Locally advanced cancer involving more extensive nearby tissues or lymph nodes</td></tr><tr><td>Stage 4</td><td>Cancer has spread to distant organs, such as bones, liver, lungs or brain</td></tr></tbody></table></div>`;

const tTable = `<div class="md-body"><table><thead><tr><th>Category</th><th>General meaning</th></tr></thead><tbody><tr><td>TX</td><td>Primary tumour cannot be assessed</td></tr><tr><td>T0</td><td>No evidence of a primary tumour</td></tr><tr><td>Tis</td><td>Carcinoma in situ</td></tr><tr><td>T1</td><td>Tumour measuring 2 cm or less</td></tr><tr><td>T2</td><td>Tumour measuring more than 2 cm but not more than 5 cm</td></tr><tr><td>T3</td><td>Tumour measuring more than 5 cm</td></tr><tr><td>T4</td><td>Tumour of any size with extension to the chest wall or skin (subject to specific definitions)</td></tr></tbody></table></div>`;

const nTable = `<div class="md-body"><table><thead><tr><th>Category</th><th>General meaning</th></tr></thead><tbody><tr><td>NX</td><td>Regional lymph nodes cannot be assessed</td></tr><tr><td>N0</td><td>No regional lymph node metastasis identified</td></tr><tr><td>N1</td><td>Limited regional lymph node involvement</td></tr><tr><td>N2</td><td>More extensive regional lymph node involvement</td></tr><tr><td>N3</td><td>Advanced regional lymph node involvement</td></tr></tbody></table></div>`;

const mTable = `<div class="md-body"><table><thead><tr><th>Category</th><th>Meaning</th></tr></thead><tbody><tr><td>M0</td><td>No clinical or radiological evidence of distant metastasis</td></tr><tr><td>M1</td><td>Distant metastasis is present</td></tr></tbody></table></div>`;

const stage1TxTable = `<div class="md-body"><table><thead><tr><th>Treatment</th><th>Purpose</th></tr></thead><tbody><tr><td>Breast-conserving surgery</td><td>Remove the tumour while preserving the breast</td></tr><tr><td>Mastectomy</td><td>Remove breast tissue when appropriate</td></tr><tr><td>Sentinel lymph node biopsy</td><td>Assess nearby lymph node involvement</td></tr><tr><td>Radiation therapy</td><td>Reduce the risk of local recurrence</td></tr><tr><td>Hormone therapy</td><td>Treat hormone receptor-positive disease</td></tr><tr><td>Chemotherapy</td><td>Reduce recurrence risk in selected patients</td></tr><tr><td>HER2-targeted therapy</td><td>Treat eligible HER2-positive cancers</td></tr></tbody></table></div>`;

const stage4SxTable = `<div class="md-body"><table><thead><tr><th>Site of spread</th><th>Possible symptoms</th></tr></thead><tbody><tr><td>Bones</td><td>Persistent bone pain or fractures</td></tr><tr><td>Liver</td><td>Abdominal discomfort, jaundice or swelling</td></tr><tr><td>Lungs</td><td>Persistent cough or breathlessness</td></tr><tr><td>Brain</td><td>Headaches, seizures, weakness or neurological changes</td></tr><tr><td>Breast</td><td>Lump, skin changes or nipple changes may remain present</td></tr></tbody></table></div>`;

const compareTable = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Stage 0</th><th>Stage 1</th><th>Stage 2</th><th>Stage 3</th><th>Stage 4</th></tr></thead><tbody><tr><td>Disease type</td><td>Non-invasive</td><td>Early invasive</td><td>Early invasive</td><td>Locally advanced</td><td>Metastatic</td></tr><tr><td>Distant spread</td><td>No</td><td>No</td><td>No</td><td>No</td><td>Yes</td></tr><tr><td>Surgery</td><td>Often</td><td>Commonly</td><td>Commonly</td><td>Often after initial treatment</td><td>Selected cases</td></tr><tr><td>Chemotherapy</td><td>Usually not</td><td>Selected cases</td><td>Frequently considered</td><td>Commonly considered</td><td>Depending on tumour biology</td></tr><tr><td>Treatment objective</td><td>Prevent invasive disease</td><td>Cure</td><td>Cure</td><td>Cure when feasible</td><td>Disease control and quality of life</td></tr></tbody></table></div>`;

const clinPathTable = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Clinical stage</th><th>Pathological stage</th></tr></thead><tbody><tr><td>Timing</td><td>Before surgery</td><td>After surgery</td></tr><tr><td>Main information</td><td>Examination, imaging and biopsy</td><td>Surgical tissue examination</td></tr><tr><td>Tumour measurement</td><td>Imaging and clinical assessment</td><td>Direct pathological measurement</td></tr><tr><td>Lymph node assessment</td><td>Imaging and needle biopsy where indicated</td><td>Examined surgical lymph nodes</td></tr><tr><td>Main purpose</td><td>Plan initial treatment</td><td>Assess the disease after surgery</td></tr></tbody></table></div>`;

const txByStageTable = `<div class="md-body"><table><thead><tr><th>Breast cancer stage</th><th>Common treatment approach</th></tr></thead><tbody><tr><td>Stage 0</td><td>Breast-conserving surgery or mastectomy, with radiation and/or hormone therapy in selected cases</td></tr><tr><td>Stage 1</td><td>Surgery, with radiation and systemic treatment according to risk and biomarkers</td></tr><tr><td>Stage 2</td><td>Surgery or neoadjuvant treatment, followed by additional therapy as indicated</td></tr><tr><td>Stage 3</td><td>Usually systemic treatment before surgery, followed by surgery, radiation and further systemic treatment</td></tr><tr><td>Stage 4</td><td>Systemic treatment tailored to tumour biology, with local treatment for selected needs</td></tr></tbody></table></div>`;

const survivalTable = `<div class="md-body"><table><thead><tr><th>Extent of breast cancer</th><th>Approximate 5-year relative survival</th></tr></thead><tbody><tr><td>Localised</td><td>100%</td></tr><tr><td>Regional</td><td>87%</td></tr><tr><td>Distant</td><td>33%</td></tr></tbody></table></div>`;

const costByStageTable = `<div class="md-body"><table><thead><tr><th>Stage</th><th>Possible treatment components</th></tr></thead><tbody><tr><td>Stage 0</td><td>Surgery, selected radiation and hormone therapy</td></tr><tr><td>Stage 1</td><td>Surgery, radiation and selected systemic therapy</td></tr><tr><td>Stage 2</td><td>Surgery, chemotherapy where indicated, radiation and targeted or hormone therapy</td></tr><tr><td>Stage 3</td><td>Neoadjuvant treatment, surgery, radiation and further systemic treatment</td></tr><tr><td>Stage 4</td><td>Systemic therapy, supportive care and selected local treatments</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Named pathway</th><th>GAF planning range in India</th><th>Typical pattern</th></tr></thead><tbody><tr><td><a href="${LUMPECTOMY}">Lumpectomy / breast-conserving surgery</a></td><td>$3,500–$8,000</td><td>1–3 nights</td></tr><tr><td><a href="${MASTECTOMY}">Mastectomy</a></td><td>$4,500–$10,000</td><td>3–6 nights</td></tr><tr><td><a href="${CHEMO}">Systemic chemotherapy</a></td><td>$1,500–$8,000+</td><td>Outpatient cycles</td></tr><tr><td><a href="${EBRT}">External beam radiotherapy (EBRT)</a></td><td>$1,000–$6,000+</td><td>Outpatient course</td></tr><tr><td><a href="${HORMONE_COST}">Hormone therapy</a></td><td>$1,000–$4,500</td><td>Long-term</td></tr><tr><td><a href="${TARGETED}">Targeted therapy</a></td><td>$8,000–$30,000</td><td>Medicine/duration dependent</td></tr><tr><td><a href="${IMMUNO}">Immunotherapy</a></td><td>$15,000–$45,000</td><td>Repeated outpatient</td></tr></tbody></table></div>`;

const hospitalTable = `<div class="md-body"><table><thead><tr><th>Hospital capability</th><th>Why it matters</th></tr></thead><tbody><tr><td>Breast surgical oncology</td><td>Appropriate breast cancer operations</td></tr><tr><td>Medical oncology</td><td>Chemotherapy and systemic treatment</td></tr><tr><td>Radiation oncology</td><td>Postoperative and other radiation treatment</td></tr><tr><td>Advanced pathology</td><td>Accurate tumour classification</td></tr><tr><td>HER2 testing</td><td>Selection of appropriate targeted treatment</td></tr><tr><td>Breast reconstruction</td><td>Reconstructive options after surgery</td></tr><tr><td>Multidisciplinary tumour board</td><td>Coordinated treatment decisions</td></tr><tr><td>International patient services</td><td>Travel and treatment coordination</td></tr></tbody></table></div>`;

const faqs = [
  ["How many stages of breast cancer are there?", "Breast cancer is generally classified into five main stages: Stage 0, Stage 1, Stage 2, Stage 3 and Stage 4. Stage 0 is non-invasive disease, while Stage 4 indicates distant metastasis."],
  ["Which is the earliest stage of breast cancer?", "Stage 0 is the earliest category and commonly refers to ductal carcinoma in situ, in which abnormal cells remain within the milk ducts. Stage 1 is the earliest category of invasive breast cancer."],
  ["Is Stage 1 breast cancer serious?", "Stage 1 is early invasive breast cancer. It requires appropriate treatment, but it generally has a favourable prognosis compared with more advanced disease."],
  ["Is Stage 2 breast cancer curable?", "Many patients with Stage 2 breast cancer are treated with curative intent. Treatment may involve surgery, chemotherapy, radiation therapy, hormone therapy or targeted treatment depending on the tumour."],
  ["Is Stage 3 breast cancer considered advanced?", "Stage 3 is generally described as locally advanced breast cancer. It involves more extensive local or regional disease but does not have established distant metastasis. Many patients can receive comprehensive treatment with curative intent."],
  ["Is Stage 4 breast cancer curable?", "Stage 4 breast cancer is generally not considered curable with current standard treatment. However, it can often be controlled with systemic medicines, and some patients live for several years with treatment."],
  ["Does breast cancer stage depend only on tumour size?", "No. Staging considers tumour size and local extent, lymph node involvement and distant metastasis. Modern prognostic staging also incorporates tumour grade and biomarkers."],
  ["What does T2N1M0 mean in breast cancer?", "T2 generally indicates a tumour larger than 2 cm but not larger than 5 cm. N1 indicates a specific category of limited regional lymph node involvement. M0 indicates no evidence of distant metastasis. The overall stage depends on the complete staging system and tumour biology."],
  ["Can a small breast tumour be Stage 3?", "Yes, in certain circumstances. Extensive regional lymph node involvement or qualifying skin and chest wall involvement can lead to Stage 3 classification even when the primary tumour is small."],
  ["What is the difference between Stage 3 and Stage 4 breast cancer?", "Stage 3 describes locally advanced or regionally extensive breast cancer without distant metastasis. Stage 4 means cancer has spread to distant organs."],
  ["Can Stage 4 breast cancer spread to the brain?", "Yes. Breast cancer can spread to the brain, particularly in certain tumour subtypes. Symptoms may include headaches, seizures, weakness or visual changes."],
  ["Can breast cancer return after treatment?", "Yes. Breast cancer can recur locally, regionally or in distant organs. The risk depends on tumour characteristics, stage and response to treatment."],
  ["What is the difference between clinical and pathological staging?", "Clinical staging is determined before surgery using examination, imaging and biopsy. Pathological staging is determined after surgery through examination of removed tissue and lymph nodes."],
  ["Does HER2-positive breast cancer have a different stage?", "HER2 status does not change the anatomical TNM categories directly, but it can influence prognostic stage and treatment decisions. HER2-targeted medicines are available for eligible patients — see HER2-positive treatment."],
  ["Can breast cancer stage change after chemotherapy?", "The original clinical stage is retained as a record of the disease before treatment. After neoadjuvant therapy and surgery, doctors may assign a post-treatment pathological stage, identified by the prefix yp."],
  ["Which scan is best for breast cancer staging?", "There is no single best scan for every patient. Mammography, ultrasound, MRI, CT, PET-CT and bone scans have different roles. The appropriate tests depend on symptoms, disease extent and clinical findings — see diagnosis tests."],
  ["Is breast cancer treatment available in India for Stage 4 patients?", "Yes. Indian oncology centres offer systemic treatment and supportive care for metastatic breast cancer. Treatment depends on receptor status, previous medicines, disease distribution and the patient's overall health."],
  ["Can international patients receive breast cancer treatment in India?", "Yes. International patients can seek consultations, second opinions, diagnostic services and treatment at Indian hospitals. Existing pathology and imaging reports should be shared before travel whenever possible."],
];

const RELATED = [
  ["Breast Cancer Treatment in India", PILLAR],
  ["Breast Cancer Symptoms", SYMPTOMS],
  ["Breast Cancer Diagnosis", DIAG_NEW],
  ["Breast Cancer Treatment Options", TX_OPTIONS],
  ["Breast Cancer Treatment Cost in India", COST_BLOG],
  ["Breast Cancer Stages 0–4 Explained", STAGES_LEGACY],
  ["Breast Cancer Treatment by Stage", BY_STAGE],
  ["Breast Cancer Diagnosis Tests (Biopsy, ER/PR/HER2)", DIAG],
  ["Breast Cancer Surgery in India", SURGERY],
  ["Chemotherapy for Breast Cancer", CHEMO_BLOG],
  ["Radiation Therapy for Breast Cancer", RAD],
  ["Hormone Therapy for Breast Cancer", HORMONE],
  ["HER2-Positive Breast Cancer", HER2],
  ["ER/PR/HER2 Biomarkers", BIOMARKERS],
  ["Neoadjuvant Therapy", NEO_BLOG],
  ["Pathology Report Explained", PATHOLOGY],
  ["Breast Reconstruction After Mastectomy", RECON],
  ["International Patients Guide", INTL],
  ["Breast Cancer in Young Women", YOUNG],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("When someone is diagnosed with breast cancer, one of the first questions is usually: **What stage is my cancer?**"),
  p("The stage helps doctors understand how much cancer is present, whether nearby lymph nodes are involved, and whether distant organs are affected. Stages are not simply measurements of tumour size."),
  p("A relatively small tumour can involve nearby nodes, while a larger tumour may still be confined to the breast. Biology — ER/PR/HER2, grade and subtype — also shapes the plan."),
  p("This guide covers Stages **0–4**, the **TNM** system, clinical versus pathological staging, anatomical versus prognostic staging, treatment by stage, survival caveats, and care in India. Companions: [symptoms](" + SYMPTOMS + "), [diagnosis](" + DIAG_NEW + "), [treatment options](" + TX_OPTIONS + "), [stages 0–4 explainer](" + STAGES_LEGACY + "), [treatment by stage](" + BY_STAGE + "), [cost in India](" + COST_BLOG + ")."),
  p("GAF planning for [lumpectomy](" + LUMPECTOMY + ") is **$3,500–$8,000** (1–3 nights) and [mastectomy](" + MASTECTOMY + ") **$4,500–$10,000** (3–6 nights). These are partner ranges, not hospital quotations."),
  p("International patients comparing [surgical oncologists](" + SURG_DOCS + ") and [medical oncologists](" + MED_DOCS + ") often start with hospitals in [Delhi NCR](" + DELHI_HOSP + "), [Mumbai](" + MUMBAI_HOSP + ") and [Bengaluru](" + BLR_HOSP + ") — see [international patients](" + INTL + ")."),
  btn("Ask about breast cancer staging and treatment in India", consult("Breast Cancer Stages / Treatment")),
  p("[WhatsApp +91 90443 46292 with pathology, IHC and imaging](" + wa("I need help understanding my breast cancer stage and treatment options in India. I can share pathology, ER/PR/HER2 and imaging.") + ")"),
  img("/uploads/articles/breast-cancer-stages-overview.webp", "Canva-style unlabeled illustration of a patient beside a breast diagram with five progressive stage icons", "Stages 0–4 describe extent of disease — from non-invasive findings to distant metastasis."),

  h2("What Are the Five Stages of Breast Cancer?"),
  html(stageOverviewTable),
  p("**The key distinction:** Stage 4 means distant metastasis. Stages 0–3 generally describe disease that has not spread to distant organs. Exact stage still depends on tumour size, nodes, metastasis, grade and biomarkers."),

  h2("What Does Breast Cancer Staging Mean?"),
  p("Staging determines how far cancer has developed and spread. Doctors use it to understand tumour size, regional nodes, surrounding structures, distant organs and tumour biology."),
  p("It helps decide whether to start with surgery, [neoadjuvant chemotherapy](" + NEO + "), targeted therapy or another approach, and gives teams a shared language for the disease."),
  h3("Why is breast cancer staging important?"),
  ol([
    "Select the appropriate treatment strategy",
    "Determine whether breast surgery is possible",
    "Assess the need for chemotherapy before surgery",
    "Evaluate whether lymph node surgery is required",
    "Decide whether radiation therapy is recommended",
    "Discuss prognosis and treatment goals with patients",
  ]),
  p("Two patients at the same anatomical stage may still receive different treatments because biology differs — for example [HER2-positive](" + HER2 + ") versus hormone receptor-positive disease. See [ER/PR/HER2 biomarkers](" + BIOMARKERS + ") and [pathology report explained](" + PATHOLOGY + ")."),

  h2("Understanding the TNM Staging System"),
  p("Breast cancer staging commonly uses the TNM system (AJCC): **T** — primary tumour; **N** — regional lymph nodes; **M** — distant metastasis."),
  img("/uploads/articles/breast-cancer-stages-tnm.webp", "Canva-style unlabeled illustration of a patient with breast diagram and TNM icon triad for tumour, nodes and metastasis", "TNM separates tumour extent, regional nodes and distant spread."),
  h3("T: Primary tumour"),
  html(tTable),
  h3("N: Regional lymph nodes"),
  p("Main groups include axillary (armpit), internal mammary, infraclavicular and supraclavicular nodes. Precise N category depends on number, location, extent and how involvement is identified."),
  html(nTable),
  h3("M: Distant metastasis"),
  html(mTable),
  p("Common distant sites: bones, liver, lungs and brain. **M1 disease is Stage IV.**"),

  h2("What Is Stage 0 Breast Cancer?"),
  p("Stage 0 is generally non-invasive. The most common example is **ductal carcinoma in situ (DCIS)** — abnormal cells inside milk ducts that have not invaded surrounding breast tissue. It is sometimes called pre-invasive breast cancer."),
  ul([
    "Abnormal cells inside ducts; no invasion of surrounding tissue",
    "No established distant spread",
    "Often found on screening mammography (microcalcifications)",
    "Many patients have no noticeable symptoms — see [symptoms](" + SYMPTOMS + ")",
  ]),
  p("Diagnosis may include mammography, ultrasound, MRI when indicated, core needle biopsy, histopathology and hormone receptor testing — see [diagnosis](" + DIAG_NEW + ") and [diagnosis tests](" + DIAG + ")."),
  p("Treatment may include breast-conserving surgery, mastectomy for extensive disease, radiation after conservation, and hormone therapy for receptor-positive DCIS. DCIS has an excellent prognosis; the goal is preventing progression and reducing future risk."),

  h2("What Is Stage 1 Breast Cancer?"),
  p("Stage 1 is early invasive breast cancer — cells have grown beyond ducts or lobules into surrounding breast tissue, but disease is still limited. It is divided into **1A** and **1B**."),
  ul([
    "**Stage 1A** — tumour ≤2 cm, no regional node involvement",
    "**Stage 1B** — no identifiable primary or a small tumour, plus micrometastases in nearby nodes",
  ]),
  p("Some patients have no symptoms; others notice a small lump, texture change, mild thickening or nipple/skin changes."),
  html(stage1TxTable),
  p("Not every patient needs chemotherapy. Some small hormone receptor-positive cancers may be treated with surgery, hormone therapy and radiation. Guides: [surgery](" + SURGERY + "), [hormone therapy](" + HORMONE + "), [radiation](" + RAD + ")."),
  p("Prognosis is generally favourable versus more advanced stages, but still depends on grade, ER/PR/HER2, age, health and treatment response."),
  btn("Discuss early-stage breast cancer treatment options", consult("Early Stage Breast Cancer Treatment")),

  h2("What Is Stage 2 Breast Cancer?"),
  p("Stage 2 is still often considered early breast cancer, though the tumour or node involvement is more extensive than Stage 1. It includes **2A** and **2B**."),
  ul([
    "**2A** — no detectable primary with cancer in 1–3 axillary nodes; or tumour ≤2 cm with limited nodes; or tumour >2–5 cm without nodes",
    "**2B** — tumour >2–5 cm with limited nodes; or tumour >5 cm without regional nodes",
  ]),
  p("Symptoms may include a noticeable lump, thickening, shape change, nipple changes, dimpling or an armpit lump — or none at all."),
  p("Treatment may combine surgery (conservation or mastectomy), [chemotherapy](" + CHEMO_BLOG + ") before or after surgery, radiation, hormone therapy, HER2-targeted therapy, and immunotherapy for selected triple-negative cases. See [treatment options](" + TX_OPTIONS + ") and [treatment by stage](" + BY_STAGE + ")."),
  p("Many patients with Stage 2 disease are treated with curative intent. Limited node involvement does not mean distant metastasis."),

  h2("What Is Stage 3 Breast Cancer?"),
  p("Stage 3 is **locally advanced** breast cancer — more extensive nearby nodes, breast skin or chest wall involvement, **without** established distant metastasis. Substages: **3A, 3B, 3C**."),
  img("/uploads/articles/breast-cancer-stages-local-advanced.webp", "Canva-style unlabeled illustration of locally advanced breast cancer with skin and node cues plus treatment-sequence icons", "Locally advanced disease often starts with systemic therapy before surgery."),
  ul([
    "**3A** — four to nine axillary nodes; certain internal mammary combinations; or tumour >5 cm with limited nodes",
    "**3B** — tumour of any size involving chest wall or qualifying skin changes; inflammatory breast cancer is often 3B or higher",
    "**3C** — ten or more axillary nodes, infraclavicular/supraclavicular nodes, or certain axillary–internal mammary combinations",
  ]),
  p("Symptoms may include a large lump, swelling, redness, peau d'orange, nipple retraction, ulceration or enlarged nodes near the armpit or collarbone."),
  p("Treatment usually combines systemic therapy, surgery and radiation. Many patients start with **neoadjuvant** medicines ([neoadjuvant chemotherapy](" + NEO + "), [neoadjuvant therapy guide](" + NEO_BLOG + ")) to shrink disease, treat microscopic cells and assess response. Surgery may be mastectomy or, in selected cases, conservation. Radiation is commonly recommended afterward."),
  p("Some patients with Stage 3 disease achieve long-term remission. Outcomes depend on biology, nodes, response and other clinical factors."),
  p("[WhatsApp +91 90443 46292 about locally advanced pathways](" + wa("I have locally advanced / Stage 3 breast cancer and need guidance on neoadjuvant treatment and surgery options in India.") + ")"),

  h2("What Is Stage 4 Breast Cancer?"),
  p("Stage 4 is **metastatic** breast cancer — spread beyond the breast and regional nodes to distant sites such as bones, liver, lungs or brain. It may appear after earlier treatment or be metastatic at first diagnosis."),
  img("/uploads/articles/breast-cancer-stages-metastatic.webp", "Canva-style unlabeled illustration of metastatic breast cancer with bone, liver, lung and brain organ icons", "Stage 4 means distant organ involvement; treatment focuses on control and quality of life."),
  html(stage4SxTable),
  p("Treatment generally focuses on controlling cancer, slowing progression, reducing symptoms and maintaining quality of life. Options may include hormone therapy, CDK4/6 inhibitors, HER2-targeted therapy, chemotherapy, immunotherapy, antibody-drug conjugates, bone-strengthening medicines, and selected radiation or surgery."),
  p("Stage 4 is generally not considered curable with current standard approaches, but many patients live for years with carefully selected therapies. Duration and quality of life vary widely."),
  btn("Ask about metastatic breast cancer care in India", consult("Metastatic Breast Cancer Treatment")),

  h2("Breast Cancer Stages Compared"),
  html(compareTable),
  p("This overview cannot determine individual treatment. Stage alone is never enough — see [treatment by stage](" + BY_STAGE + ")."),

  h2("Does Tumour Size Determine Breast Cancer Stage?"),
  p("Size matters, but it does not set the entire stage. Nodes and distant metastasis also count. A small tumour can involve nodes; a tumour >5 cm may still be Stage 2B when other criteria fit; any-size tumour with distant metastasis is Stage 4; skin or chest-wall involvement may classify as locally advanced."),

  h2("Clinical Stage Versus Pathological Stage"),
  p("**Clinical stage (cTNM)** is set before surgery from exam, mammography, ultrasound, MRI, biopsy and staging scans. **Pathological stage (pTNM)** is set after surgery when tissue and nodes are examined under the microscope."),
  html(clinPathTable),
  p("After neoadjuvant therapy, post-treatment pathological stage often uses the **yp** prefix — showing how much cancer remains after treatment."),

  h2("Anatomical Versus Prognostic Staging"),
  p("**Anatomical staging** uses tumour extent, regional nodes and distant metastasis (classic TNM). **Prognostic staging** also incorporates grade, ER/PR/HER2, other pathology features and, in selected cases, genomic results."),
  p("Two patients with identical size and nodes may have different plans and outlooks because biology differs. Always read the stage alongside the [pathology report](" + PATHOLOGY + ") and [biomarkers](" + BIOMARKERS + ")."),

  h2("How Does Breast Cancer Stage Affect Treatment?"),
  html(txByStageTable),
  h3("Neoadjuvant treatment"),
  p("Therapy given **before** surgery — chemotherapy, targeted therapy or immunotherapy depending on type. Especially important for larger tumours, HER2-positive disease, triple-negative breast cancer and locally advanced disease. Goals: shrink the tumour, improve surgical options and evaluate response. See [neoadjuvant therapy](" + NEO_BLOG + ") and [neoadjuvant chemotherapy](" + NEO + ")."),
  h3("Adjuvant treatment"),
  p("Therapy given **after** surgery to reduce recurrence risk — chemotherapy, radiation, hormone therapy, HER2-targeted therapy or other systemic treatments. Not every patient needs all modalities. See [adjuvant chemotherapy](" + ADJ + ") and [treatment options](" + TX_OPTIONS + ")."),
  btn("Request a stage-based treatment opinion in India", consult("Breast Cancer Treatment by Stage")),

  h2("Does Breast Cancer Stage Determine Survival?"),
  p("Stage is one of the most important prognostic factors. Earlier diagnosis generally has a more favourable outlook than distant spread. **Survival cannot be predicted by stage alone.**"),
  ul([
    "Age and general health",
    "Tumour grade; ER/PR/HER2; triple-negative status",
    "Response to treatment and access to appropriate care",
    "Whether cancer returns after treatment",
  ]),
  p("Five-year relative survival compares people with cancer with similar people in the general population. Figures below are from the American Cancer Society's SEER-based statistics for women in the United States — **population estimates, not individual predictions, and not survival rates for Indian patients.**"),
  html(survivalTable),
  p("**Important:** ACS SEER categories (localised / regional / distant) are **not** identical to AJCC Stages 1–4. Modern treatment has changed outlooks for many subtypes. Discuss individual prognosis with the treating oncologist."),

  h2("What Is Recurrent Breast Cancer?"),
  p("Recurrence means cancer returns after treatment — in the breast or chest wall (**local**), nearby nodes (**regional**), or distant organs (**distant** / metastatic). Microscopic cells may remain after apparently successful treatment."),
  p("Treatment depends on where cancer returned and its biology. A fresh biopsy is often useful because receptor status can change over time."),

  h2("Can Stage 4 Breast Cancer Spread to the Brain, Liver and Bones?"),
  p("Yes. Breast cancer can spread via blood or lymphatics. Common sites: bones, liver, lungs and brain."),
  ul([
    "**Bone** — pain, weakness, fractures; systemic medicines, radiation and bone-strengthening drugs may help",
    "**Liver** — discomfort, fatigue, appetite loss, jaundice or swelling in advanced disease",
    "**Lung** — cough, breathlessness, chest discomfort, pleural fluid",
    "**Brain** — headaches, seizures, weakness, vision or balance changes — new neurological symptoms need urgent evaluation",
  ]),

  h2("Can Breast Cancer Be Diagnosed Early Without Symptoms?"),
  p("Yes. Screening mammography can find small abnormalities, microcalcifications and some early non-invasive cancers before anything is felt. Screening schedules vary by country and risk. A new lump still needs evaluation even after a recent normal mammogram — see [symptoms](" + SYMPTOMS + ") and [diagnosis](" + DIAG_NEW + ")."),

  h2("What Is the Cost of Breast Cancer Treatment in India at Different Stages?"),
  p("Cost varies with stage, biology, plan, hospital, medicines and duration. Early disease may need surgery plus selected therapy; Stage 3 often needs neoadjuvant systemic therapy, surgery and radiation; Stage 4 may need longer-term systemic care. Full context: [breast cancer treatment cost in India](" + COST_BLOG + ")."),
  html(costByStageTable),
  p("There is no reliable universal price per stage — two patients at the same stage can need very different pathways. **Do not add every line into one total.**"),
  html(costTable),
  p("GAF figures are partner planning ranges in USD, not hospital quotations. Targeted and immunotherapy apply only when clinically indicated ([targeted therapy](" + TARGETED + "), [immunotherapy](" + IMMUNO + "))."),
  btn("Request an itemised estimate by stage and pathway", consult("Breast Cancer Treatment Cost")),
  p("[WhatsApp +91 90443 46292 with stage and IHC summary](" + wa("Please help estimate breast cancer treatment cost in India by stage. I can share pathology, ER/PR/HER2 and preferred city.") + ")"),

  h2("Breast Cancer Treatment in India for International Patients"),
  p("India has oncology centres offering diagnosis, surgery, chemotherapy, radiation and advanced systemic treatments. Patients from Tanzania, Kenya, Ethiopia, Uganda, Zambia, Iraq, Oman and other countries often seek second opinions and treatment here."),
  html(hospitalTable),
  p("GAF Healthcare can help identify hospitals, coordinate specialist consultations, arrange pathology and imaging review, obtain estimates, organise appointments and support medical travel — see [breast cancer treatment in India](" + PILLAR + "), [reconstruction](" + RECON + ") / [reconstruction treatment](" + RECON_TX + "), and [international patients](" + INTL + ")."),
  ul([
    "Biopsy, histopathology and IHC reports",
    "Mammography, ultrasound, MRI or PET-CT with DICOM where available",
    "Previous surgery and systemic therapy records",
    "Current medications and recent blood tests",
  ]),
  p("Share records before travelling when possible so teams can decide whether existing investigations suffice."),
  btn("Plan breast cancer treatment in India", consult("Breast Cancer Treatment in India")),
  p("[WhatsApp +91 90443 46292 before booking flights](" + wa("I am an international patient planning breast cancer treatment in India. Please advise on staging review, estimate and stay length.") + ")"),

  h2("Frequently Asked Questions About Breast Cancer Stages"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Key Takeaways"),
  ul([
    "Breast cancer has five main stages (0–4); Stage 4 means distant metastasis.",
    "TNM describes tumour extent, regional nodes and distant spread.",
    "Clinical stage is pre-surgery; pathological stage is post-surgery; yp marks post-neoadjuvant pathology.",
    "Prognostic staging adds grade and biomarkers — stage alone does not set the whole plan.",
    "Treatment sequencing differs by stage; biology still drives systemic choices.",
    "SEER survival figures are population estimates, not personal predictions.",
    "GAF lumpectomy planning is $3,500–$8,000; mastectomy $4,500–$10,000 — request a written hospital estimate for your pathway.",
  ]),

  h2("Top Medical Sources and References"),
  ol([
    "[NCI — Breast Cancer Stages](https://www.cancer.gov/types/breast/stages)",
    "[American Cancer Society — Breast Cancer Stages](https://www.cancer.org/cancer/types/breast-cancer/understanding-a-breast-cancer-diagnosis/stages-of-breast-cancer.html)",
    "[AJCC — Cancer Staging System](https://www.facs.org/quality-programs/cancer-programs/american-joint-committee-on-cancer/)",
    "[NCCN — Breast Cancer Guidelines](https://www.nccn.org/guidelines/category_1)",
    "[NCI — Metastatic Breast Cancer](https://www.cancer.gov/types/breast/metastatic-breast-cancer)",
    "[WHO — Breast Cancer Fact Sheet](https://www.who.int/news-room/fact-sheets/detail/breast-cancer)",
    "[ICMR — Standard Treatment Workflows: Breast Cancer](https://www.icmr.gov.in/icmrobject/custom_data/pdf/downloadable-books/STW_Vol_3_2022.pdf)",
    "[ACS — Survival Rates for Breast Cancer](https://www.cancer.org/cancer/types/breast-cancer/understanding-a-breast-cancer-diagnosis/breast-cancer-survival-rates.html)",
  ]),

  h2("Related Reading on GAF Healthcare"),
  ul(RELATED.map(([label, href]) => `[${label}](${href})`)),

  h2("Explore Breast Cancer Care in India"),
  p("Understanding your stage is an important step — but biology, overall health and treatment response matter just as much. Modern care is increasingly personalised."),
  p("GAF Healthcare assists international patients exploring breast cancer care in India by coordinating records, consultations and estimates. Website: [https://gaf.healthcare/](https://gaf.healthcare/)."),
  btn("Contact GAF Healthcare about breast cancer staging and treatment", consult("Breast Cancer Treatment in India")),

  h2("Medical Disclaimer"),
  p("This article is for educational purposes and does not replace medical advice. Breast cancer staging and treatment decisions must be made by qualified specialists after reviewing individual clinical, imaging and pathology findings. Cost figures are indicative GAF partner planning ranges in USD, not hospital quotations. Emergency symptoms belong in a local emergency department."),
];

const now = "2026-11-11T14:10:00.000Z";
const SLUG = "breast-cancer-stages";

const article = {
  id: "art_breast_cancer_stages",
  slug: SLUG,
  title: "Breast Cancer Stages 0 to 4: Understanding TNM Staging, Symptoms, Treatment and Prognosis",
  excerpt:
    "Breast cancer is classified into five main stages, from Stage 0 to Stage 4. The stage describes whether cancer is confined to the breast, has spread to nearby lymph nodes or has reached distant organs. Learn how TNM staging works, what each stage means, how treatment differs and what patients should know about breast cancer care in India.",
  date: "11 November 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Surgical Oncology",
  tags: [
    "breast cancer",
    "breast cancer stages",
    "TNM staging",
    "metastatic breast cancer",
    "locally advanced breast cancer",
    "India",
  ],
  image: "/uploads/articles/breast-cancer-stages-overview.webp",
  imageAlt:
    "Canva-style unlabeled illustration of a patient beside a breast diagram with five progressive stage icons",
  status: "published",
  featured: true,
  seoTitle: "Breast Cancer Stages 0 to 4: Symptoms, Treatment and Survival",
  seoDescription:
    "Understand breast cancer stages 0, 1, 2, 3 and 4, including TNM staging, tumour size, lymph node involvement, metastasis, treatment options and prognosis.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/breast-cancer-stages-overview.webp",
  allowIndex: true,
  keywords: [
    "Breast cancer stages",
    "Stages of breast cancer",
    "Breast cancer stage 0",
    "Stage 1 breast cancer",
    "Stage 2 breast cancer",
    "Stage 3 breast cancer",
    "Stage 4 breast cancer",
    "Early stage breast cancer",
    "Locally advanced breast cancer",
    "Metastatic breast cancer",
    "Breast cancer TNM staging",
    "Breast cancer treatment by stage",
    "Breast cancer survival rates",
    "Breast cancer treatment in India",
  ],
  relatedLinks: RELATED.map(([label, href]) => ({ label, href })),
  blocks,
};

if (!store.categories.includes("Surgical Oncology")) store.categories.push("Surgical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}

for (const [file, alt] of [
  ["breast-cancer-stages-overview.webp", article.imageAlt],
  [
    "breast-cancer-stages-tnm.webp",
    "Canva-style unlabeled illustration of a patient with breast diagram and TNM icon triad for tumour, nodes and metastasis",
  ],
  [
    "breast-cancer-stages-local-advanced.webp",
    "Canva-style unlabeled illustration of locally advanced breast cancer with skin and node cues plus treatment-sequence icons",
  ],
  [
    "breast-cancer-stages-metastatic.webp",
    "Canva-style unlabeled illustration of metastatic breast cancer with bone, liver, lung and brain organ icons",
  ],
]) {
  const mediaId = `media_${file.replace(/[^a-z0-9]+/g, "_")}`;
  const existing = store.media.find((row) => row.id === mediaId || row.url === `/uploads/articles/${file}`);
  if (!existing) {
    store.media.push({ id: mediaId, url: `/uploads/articles/${file}`, name: file, alt, addedAt: now });
  } else {
    Object.assign(existing, { url: `/uploads/articles/${file}`, alt, name: file });
  }
}

// Upsert NEW slug only — never overwrite breast-cancer-stages-0-1-2-3-4
const index = store.articles.findIndex((row) => row.id === article.id || row.slug === SLUG);
if (index >= 0) store.articles[index] = article;
else store.articles.unshift(article);

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG, "blocks", blocks.length, "faqs", faqs.length);

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(`/blogs/${SLUG}`)) {
  if (llms.includes("breast-cancer-treatment-in-india")) {
    llms = llms.replace(
      "[breast cancer treatment in India](https://gaf.healthcare/treatments/breast-cancer-treatment-in-india)",
      "[breast cancer treatment in India](https://gaf.healthcare/treatments/breast-cancer-treatment-in-india), [breast cancer stages](https://gaf.healthcare/blogs/breast-cancer-stages)",
    );
  } else {
    llms = llms.replace(
      /(- \[Blogs\]\(https:\/\/gaf\.healthcare\/blogs\):[^\n]+)/,
      `$1, [breast cancer stages](https://gaf.healthcare/blogs/breast-cancer-stages)`,
    );
  }
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
} else {
  console.log("llms.txt already lists stages blog");
}

function linkFromRelated(slug, label) {
  const post = store.articles.find((row) => row.slug === slug);
  if (!post) return false;
  const href = `/blogs/${SLUG}`;
  post.relatedLinks = post.relatedLinks || [];
  if (!post.relatedLinks.some((row) => row.href === href)) {
    post.relatedLinks.push({ label, href });
  }
  for (let i = 0; i < post.blocks.length; i++) {
    if (post.blocks[i].type === "heading" && /Related Reading/i.test(post.blocks[i].text || "")) {
      for (let j = i + 1; j < Math.min(i + 5, post.blocks.length); j++) {
        if (post.blocks[j].type === "list" && !post.blocks[j].items.some((item) => item.includes(href))) {
          post.blocks[j].items.push(`[${label}](${href})`);
        }
      }
      break;
    }
  }
  return true;
}

for (const slug of [
  "breast-cancer-stages-0-1-2-3-4",
  "breast-cancer-treatment-by-stage",
  "breast-cancer-treatment-cost-in-india",
  "breast-cancer-diagnosis-tests-biopsy-er-pr-her2",
  "breast-cancer-symptoms",
  "breast-cancer-treatment-options",
  "breast-cancer-treatment-india-international-patients",
]) {
  if (linkFromRelated(slug, "Breast Cancer Stages")) console.log("linked from", slug);
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
