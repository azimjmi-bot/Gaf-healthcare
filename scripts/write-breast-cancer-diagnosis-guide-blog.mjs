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
const DIAG_TESTS = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
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
const YOUNG = "/blogs/breast-cancer-in-young-women-treatment-india";
const PATHOLOGY = "/blogs/breast-cancer-pathology-report-explained";
const BIOMARKERS = "/blogs/er-pr-her2-breast-cancer-treatment-india";
const NEO_BLOG = "/blogs/breast-cancer-neoadjuvant-therapy";
const SYMPTOMS = "/blogs/breast-cancer-symptoms";
const STAGES_NEW = "/blogs/breast-cancer-stages";
const OPTIONS = "/blogs/breast-cancer-treatment-options";

const LUMPECTOMY = "/costs/India/Surgical-Oncology/Lumpectomy";
const MASTECTOMY = "/costs/India/Surgical-Oncology/Mastectomy";
const NSM = "/costs/India/Surgical-Oncology/Nipple-Sparing-Mastectomy";
const ONCOPLASTIC = "/costs/India/Surgical-Oncology/Oncoplastic-Breast-Surgery";
const RECON_COST = "/costs/India/Surgical-Oncology/Breast-Reconstruction";
const SLNB = "/costs/India/Surgical-Oncology/Sentinel-Lymph-Node-Biopsy";
const CHEMO = "/costs/India/Medical-Oncology/Chemotherapy";
const HORMONE_COST = "/costs/India/Medical-Oncology/Hormone-Therapy";
const TARGETED = "/costs/India/Medical-Oncology/Targeted-Therapy";
const IMMUNO = "/costs/India/Medical-Oncology/Immunotherapy";
const EBRT = "/costs/India/Radiation-Oncology/EBRT";

const SURG_DOCS = "/doctors/India/Surgical-Oncology";
const MED_DOCS = "/doctors/India/Medical-Oncology";
const LUMP_DOCS = "/doctors/India/Surgical-Oncology/Lumpectomy";
const MAST_DOCS = "/doctors/India/Surgical-Oncology/Mastectomy";
const DELHI_HOSP = "/hospitals/India/Delhi-NCR/Surgical-Oncology";
const MUMBAI_HOSP = "/hospitals/India/Mumbai/Surgical-Oncology";
const BLR_HOSP = "/hospitals/India/Bengaluru/Surgical-Oncology";
const DELHI_LUMP = "/costs/India/Delhi-NCR/Surgical-Oncology/Lumpectomy";
const MUMBAI_LUMP = "/costs/India/Mumbai/Surgical-Oncology/Lumpectomy";
const BLR_LUMP = "/costs/India/Bengaluru/Surgical-Oncology/Lumpectomy";
const DELHI_MAST = "/costs/India/Delhi-NCR/Surgical-Oncology/Mastectomy";
const MUMBAI_MAST = "/costs/India/Mumbai/Surgical-Oncology/Mastectomy";
const BLR_MAST = "/costs/India/Bengaluru/Surgical-Oncology/Mastectomy";

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

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>How is breast cancer diagnosed?</strong></td><td>Clinical exam + mammography/ultrasound (± MRI) + biopsy with histopathology</td></tr><tr><td><strong>What confirms cancer?</strong></td><td>Tissue biopsy — imaging alone is not a final diagnosis</td></tr><tr><td><strong>Triple assessment</strong></td><td>Clinical examination, breast imaging and pathological assessment together</td></tr><tr><td><strong>Key biomarkers</strong></td><td>ER, PR and HER2 (± Ki-67) guide systemic therapy — see <a href="${BIOMARKERS}">ER/PR/HER2 guide</a></td></tr><tr><td><strong>BI-RADS 4 or 5</strong></td><td>Suspicious imaging; biopsy is generally recommended</td></tr><tr><td><strong>Staging</strong></td><td>TNM plus biology — see <a href="${STAGES_NEW}">breast cancer stages</a> and <a href="${STAGES_LEGACY}">stages 0–4</a></td></tr><tr><td><strong>Treatment pathway</strong></td><td><a href="${PILLAR}">Breast cancer treatment in India</a> · <a href="${OPTIONS}">treatment options</a></td></tr><tr><td><strong>GAF lumpectomy planning</strong></td><td><a href="${LUMPECTOMY}">$3,500–$8,000</a>, typically <strong>1–3 nights</strong></td></tr><tr><td><strong>GAF mastectomy planning</strong></td><td><a href="${MASTECTOMY}">$4,500–$10,000</a>, typically <strong>3–6 nights</strong></td></tr><tr><td><strong>Sentinel node biopsy</strong></td><td><a href="${SLNB}">$2,000–$5,500</a>, typically <strong>1–2 nights</strong></td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>Breast cancer diagnosis</strong> answers whether an abnormality is cancerous, which type it is, receptor status and how far it has spread. Companion guides: <a href="${SYMPTOMS}">symptoms</a>, <a href="${DIAG_TESTS}">biopsy &amp; receptor tests</a>, <a href="${COST_BLOG}">treatment cost in India</a>. GAF planning ranges for surgery and systemic pathways are partner estimates — not hospital quotations. Individual mammography or ultrasound prices are not listed as standalone GAF packages.</p><p class="article-quick-answer__body"><strong>Important:</strong> GAF Healthcare does not diagnose breast cancer or prescribe treatment. A new breast change needs local clinical assessment. Emergency symptoms belong in a local emergency department.</p></aside>`;

const tripleTable = `<div class="md-body"><table><thead><tr><th>Component</th><th>What doctors do</th><th>What it helps determine</th></tr></thead><tbody><tr><td>Clinical examination</td><td>Examine the breast and lymph nodes</td><td>Identify suspicious physical changes</td></tr><tr><td>Breast imaging</td><td>Mammography and/or ultrasound (± MRI)</td><td>Location and nature of abnormalities</td></tr><tr><td>Pathological assessment</td><td>Examine cells or tissue from biopsy</td><td>Confirm or rule out cancer</td></tr></tbody></table></div>`;

const mammoTable = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Screening mammography</th><th>Diagnostic mammography</th></tr></thead><tbody><tr><td>Main purpose</td><td>Detect cancer before symptoms</td><td>Investigate a specific concern</td></tr><tr><td>Who needs it?</td><td>People eligible for routine screening</td><td>People with symptoms or abnormal screening</td></tr><tr><td>Imaging</td><td>Standard screening views</td><td>Additional targeted views when needed</td></tr><tr><td>Follow-up</td><td>Routine screen or further assessment</td><td>May lead to ultrasound or biopsy</td></tr></tbody></table></div>`;

const usVsMammo = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Mammography</th><th>Breast ultrasound</th></tr></thead><tbody><tr><td>Technology</td><td>Low-dose X-rays</td><td>Sound waves</td></tr><tr><td>Microcalcifications</td><td>Particularly useful</td><td>Limited</td></tr><tr><td>Cysts vs solid</td><td>Sometimes</td><td>Very useful</td></tr><tr><td>Radiation</td><td>Low dose</td><td>No ionising radiation</td></tr><tr><td>Common use</td><td>Screening and diagnosis</td><td>Diagnostic assessment and biopsy guidance</td></tr></tbody></table></div>`;

const biopsyTable = `<div class="md-body"><table><thead><tr><th>Biopsy type</th><th>How it is performed</th><th>Common use</th></tr></thead><tbody><tr><td>Fine needle aspiration (FNA)</td><td>Thin needle removes cells or fluid</td><td>Selected cysts or lymph node assessments</td></tr><tr><td>Core needle biopsy</td><td>Wider needle collects tissue cores</td><td>Preferred for most suspicious masses</td></tr><tr><td>Vacuum-assisted biopsy</td><td>Device collects multiple samples</td><td>Selected imaging-detected abnormalities</td></tr><tr><td>Surgical biopsy</td><td>Operation removes part or all of an area</td><td>When needle biopsy is unsuitable or inconclusive</td></tr></tbody></table></div>`;

const reportTable = `<div class="md-body"><table><thead><tr><th>Report component</th><th>What it means</th></tr></thead><tbody><tr><td>Histological type</td><td>Specific type of breast cancer</td></tr><tr><td>Invasive or non-invasive</td><td>Whether cancer has entered surrounding tissue</td></tr><tr><td>Tumour grade</td><td>How abnormal the cells appear</td></tr><tr><td>DCIS component</td><td>Whether ductal carcinoma in situ is present</td></tr><tr><td>Lymphovascular invasion</td><td>Cancer cells in vessels, if identified</td></tr><tr><td>ER / PR / HER2</td><td>Hormone and HER2 status for treatment selection</td></tr><tr><td>Ki-67</td><td>Proliferation indicator where tested</td></tr></tbody></table></div>`;

const biomarkerTable = `<div class="md-body"><table><thead><tr><th>Biomarker</th><th>What it identifies</th><th>Why it matters</th></tr></thead><tbody><tr><td>ER</td><td>Oestrogen receptor expression</td><td>Hormone therapy eligibility</td></tr><tr><td>PR</td><td>Progesterone receptor expression</td><td>Adds hormone-sensitivity context</td></tr><tr><td>HER2</td><td>Protein overexpression or gene amplification</td><td>HER2-targeted treatment options</td></tr><tr><td>Ki-67</td><td>Tumour cell proliferation</td><td>Additional activity information where used</td></tr></tbody></table></div>`;

const histoVsIhc = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Histopathology</th><th>Immunohistochemistry (IHC)</th></tr></thead><tbody><tr><td>Main purpose</td><td>Examine tissue structure and cancer cells</td><td>Identify specific proteins</td></tr><tr><td>Method</td><td>Microscopic tissue examination</td><td>Antibody-based staining</td></tr><tr><td>Confirms cancer type</td><td>Yes</td><td>Adds biological detail</td></tr><tr><td>ER/PR/HER2</td><td>Not by morphology alone</td><td>Yes (ISH may follow for HER2)</td></tr></tbody></table></div>`;

const biradsTable = `<div class="md-body"><table><thead><tr><th>Category</th><th>Meaning</th><th>Usual next step</th></tr></thead><tbody><tr><td>BI-RADS 0</td><td>Incomplete</td><td>Additional imaging</td></tr><tr><td>BI-RADS 1</td><td>Negative</td><td>Routine screening</td></tr><tr><td>BI-RADS 2</td><td>Benign</td><td>Routine screening</td></tr><tr><td>BI-RADS 3</td><td>Probably benign</td><td>Short-interval follow-up (often ~6 months)</td></tr><tr><td>BI-RADS 4</td><td>Suspicious</td><td>Biopsy generally recommended</td></tr><tr><td>BI-RADS 5</td><td>Highly suggestive of malignancy</td><td>Tissue diagnosis + specialist assessment</td></tr><tr><td>BI-RADS 6</td><td>Known biopsy-proven cancer</td><td>Treatment planning</td></tr></tbody></table></div>`;

const tnmTable = `<div class="md-body"><table><thead><tr><th>Component</th><th>Meaning</th><th>What doctors assess</th></tr></thead><tbody><tr><td>T – Tumour</td><td>Primary tumour</td><td>Size and local extent</td></tr><tr><td>N – Nodes</td><td>Regional lymph nodes</td><td>Whether nearby nodes contain cancer</td></tr><tr><td>M – Metastasis</td><td>Distant spread</td><td>Whether cancer has reached other organs</td></tr></tbody></table></div>`;

const stageTable = `<div class="md-body"><table><thead><tr><th>Stage</th><th>General explanation</th></tr></thead><tbody><tr><td>Stage 0</td><td>Non-invasive disease such as DCIS</td></tr><tr><td>Stage I</td><td>Early invasive cancer with limited or no node involvement</td></tr><tr><td>Stage II</td><td>Larger tumour and/or limited regional nodes</td></tr><tr><td>Stage III</td><td>More extensive local or regional disease</td></tr><tr><td>Stage IV</td><td>Distant organ involvement (metastatic)</td></tr></tbody></table></div>`;

const stagingTests = `<div class="md-body"><table><thead><tr><th>Test</th><th>Main purpose</th></tr></thead><tbody><tr><td>Abdominal ultrasound</td><td>Examine abdominal organs including the liver</td></tr><tr><td>CT scan</td><td>Evaluate organs for suspicious abnormalities</td></tr><tr><td>PET-CT</td><td>Selected cases when advanced disease is suspected</td></tr><tr><td>Bone scan</td><td>Investigate suspected bone involvement</td></tr><tr><td>Brain MRI</td><td>Evaluate suspected brain metastasis</td></tr><tr><td>Chest imaging</td><td>Investigate suspected lung involvement</td></tr><tr><td>Lymph node biopsy</td><td>Confirm suspected nodal involvement</td></tr></tbody></table></div>`;

const timingTable = `<div class="md-body"><table><thead><tr><th>Diagnostic step</th><th>Approximate time</th></tr></thead><tbody><tr><td>Clinical examination</td><td>15–30 minutes</td></tr><tr><td>Mammography / ultrasound</td><td>15–30 minutes each</td></tr><tr><td>Breast MRI</td><td>30–60 minutes</td></tr><tr><td>Needle biopsy</td><td>15–45 minutes</td></tr><tr><td>Histopathology report</td><td>Often several working days</td></tr><tr><td>IHC / biomarkers</td><td>May need additional working days</td></tr><tr><td>Complete staging</td><td>Depends on investigations required</td></tr></tbody></table></div>`;

const planFactors = `<div class="md-body"><table><thead><tr><th>Factor</th><th>Why it matters</th></tr></thead><tbody><tr><td>Cancer stage</td><td>Extent of disease</td></tr><tr><td>Tumour size / nodes</td><td>Surgical and systemic choices</td></tr><tr><td>ER / PR / HER2</td><td>Hormone and targeted options</td></tr><tr><td>Tumour grade</td><td>Behavioural context</td></tr><tr><td>Menopausal status / health</td><td>Treatment suitability</td></tr><tr><td>Patient preferences</td><td>Shared decision-making</td></tr></tbody></table></div>`;

const facilityTable = `<div class="md-body"><table><thead><tr><th>Facility</th><th>Importance</th></tr></thead><tbody><tr><td>Dedicated breast clinic</td><td>Coordinated assessment</td></tr><tr><td>Experienced breast radiologists</td><td>Accurate imaging interpretation</td></tr><tr><td>Mammography and ultrasound</td><td>Essential diagnostic imaging</td></tr><tr><td>Breast MRI</td><td>Selected additional assessment</td></tr><tr><td>Image-guided biopsy</td><td>Accurate tissue sampling</td></tr><tr><td>Histopathology + IHC</td><td>Reliable diagnosis and biomarkers</td></tr><tr><td>Multidisciplinary tumour board</td><td>Integrated treatment planning</td></tr></tbody></table></div>`;

const costDrivers = `<div class="md-body"><table><thead><tr><th>Investigation area</th><th>What influences cost</th></tr></thead><tbody><tr><td>Specialist consultation</td><td>Doctor and hospital fees</td></tr><tr><td>Mammography / ultrasound / MRI</td><td>Facility, technique, contrast protocol</td></tr><tr><td>Core needle biopsy</td><td>Guidance method and procedure charges</td></tr><tr><td>Histopathology + IHC</td><td>Tissue processing and biomarker panel</td></tr><tr><td>Staging CT / PET-CT</td><td>Scan type and body coverage when needed</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Named pathway</th><th>GAF planning range in India</th><th>Typical stay</th></tr></thead><tbody><tr><td><a href="${LUMPECTOMY}">Breast-conserving surgery / lumpectomy</a></td><td>$3,500–$8,000</td><td>1–3 nights</td></tr><tr><td><a href="${MASTECTOMY}">Mastectomy</a></td><td>$4,500–$10,000</td><td>3–6 nights</td></tr><tr><td><a href="${ONCOPLASTIC}">Oncoplastic breast surgery</a></td><td>$4,500–$11,000</td><td>2–5 nights</td></tr><tr><td><a href="${NSM}">Nipple-sparing mastectomy</a></td><td>$5,500–$12,000</td><td>3–6 nights</td></tr><tr><td><a href="${RECON_COST}">Breast reconstruction</a></td><td>$6,000–$18,000</td><td>4–8 nights</td></tr><tr><td><a href="${SLNB}">Sentinel lymph node biopsy</a></td><td>$2,000–$5,500</td><td>1–2 nights</td></tr><tr><td><a href="${CHEMO}">Systemic chemotherapy</a></td><td>$1,500–$8,000+</td><td>Outpatient cycles</td></tr><tr><td><a href="${EBRT}">External beam radiotherapy</a></td><td>$1,000–$6,000+</td><td>Outpatient course</td></tr><tr><td><a href="${HORMONE_COST}">Hormone therapy</a></td><td>$1,000–$4,500</td><td>Long-term treatment</td></tr><tr><td><a href="${TARGETED}">Targeted therapy</a></td><td>$8,000–$30,000</td><td>Medicine/duration dependent</td></tr><tr><td><a href="${IMMUNO}">Immunotherapy</a></td><td>$15,000–$45,000</td><td>Repeated outpatient</td></tr></tbody></table></div>`;

const cityTable = `<div class="md-body"><table><thead><tr><th>City</th><th>Lumpectomy cost sheet</th><th>Mastectomy planning</th></tr></thead><tbody><tr><td>Delhi NCR</td><td><a href="${DELHI_LUMP}">$3,500–$8,000</a></td><td><a href="${DELHI_MAST}">$4,500–$10,000</a></td></tr><tr><td>Mumbai</td><td><a href="${MUMBAI_LUMP}">$3,500–$8,000</a></td><td><a href="${MUMBAI_MAST}">$4,500–$10,000</a></td></tr><tr><td>Bengaluru</td><td><a href="${BLR_LUMP}">$3,500–$8,000</a></td><td><a href="${BLR_MAST}">$4,500–$10,000</a></td></tr></tbody></table></div>`;

const faqs = [
  ["How is breast cancer diagnosed?", "Usually through clinical examination, imaging such as mammography and ultrasound, and a biopsy. Tissue examined under a microscope confirms whether cancer is present."],
  ["Which test confirms breast cancer?", "A breast biopsy with histopathology is generally definitive. Imaging identifies suspicious areas but cannot always confirm cancer."],
  ["Is mammography enough to diagnose breast cancer?", "No. Mammography detects suspicious changes; ultrasound, MRI and biopsy may still be required."],
  ["What is the difference between mammography and breast ultrasound?", "Mammography uses low-dose X-rays and is strong for microcalcifications. Ultrasound uses sound waves and helps distinguish cysts from solid masses."],
  ["Is breast MRI necessary for every patient?", "No. MRI is used selectively — for example high-risk screening, extent assessment or inconclusive conventional imaging."],
  ["Does a breast biopsy mean I have cancer?", "No. Biopsy investigates an abnormality. Results may be benign, pre-cancerous or cancerous."],
  ["Is core needle biopsy better than fine needle aspiration?", "Core needle biopsy usually provides tissue architecture and is commonly preferred for suspected breast cancer. FNA has selected uses for cells or fluid."],
  ["How long does a breast biopsy report take?", "Histopathology often takes several working days. IHC and other tests may add more time depending on the laboratory."],
  ["What is BI-RADS 4?", "BI-RADS 4 means a suspicious imaging abnormality. Biopsy is generally recommended — it does not by itself confirm cancer."],
  ["What does BI-RADS 5 mean?", "BI-RADS 5 means imaging is highly suggestive of malignancy. Tissue confirmation is still required."],
  ["What does ER-positive or HER2-positive mean?", "ER-positive cancers express oestrogen receptors; HER2-positive cancers have increased HER2 expression or amplification. These results guide treatment — see the biomarker guide."],
  ["Is PET-CT compulsory for breast cancer staging?", "No. PET-CT is selective, especially when advanced disease is suspected. It is not routine for every early-stage case."],
  ["Can a blood test diagnose breast cancer?", "No routine blood test independently confirms breast cancer. Tissue examination is generally required."],
  ["Can breast cancer be missed on a mammogram?", "Yes. Persistent symptoms or a suspicious exam may need further imaging or biopsy even after a normal mammogram."],
  ["What happens if the biopsy is inconclusive?", "Doctors may recommend repeat image-guided biopsy, additional imaging or surgical biopsy after reviewing clinical, imaging and pathology findings together."],
  ["Can breast cancer be diagnosed early?", "Yes. Screening can find some cancers before symptoms. Early diagnosis helps teams consider treatment while disease is more limited."],
  ["Is breast cancer diagnosis available in India?", "Yes. Many hospitals offer mammography, ultrasound, MRI, biopsy, histopathology and biomarker testing. Facilities vary — see breast cancer treatment in India."],
  ["Should I get a second opinion after diagnosis?", "A second opinion can help review biopsy findings, biomarkers, stage and treatment options, especially for complex decisions."],
];

const RELATED = [
  ["Breast Cancer Treatment in India", PILLAR],
  ["Breast Cancer Symptoms", SYMPTOMS],
  ["Breast Cancer Diagnosis Tests (Biopsy, ER/PR/HER2)", DIAG_TESTS],
  ["Breast Cancer Stages", STAGES_NEW],
  ["Breast Cancer Stages 0–4 Explained", STAGES_LEGACY],
  ["Breast Cancer Treatment Options", OPTIONS],
  ["Breast Cancer Treatment by Stage", BY_STAGE],
  ["Breast Cancer Treatment Cost in India", COST_BLOG],
  ["Breast Cancer Surgery in India", SURGERY],
  ["Chemotherapy for Breast Cancer in India", CHEMO_BLOG],
  ["Radiation Therapy for Breast Cancer", RAD],
  ["Hormone Therapy for Breast Cancer", HORMONE],
  ["HER2-Positive Breast Cancer Treatment", HER2],
  ["ER/PR/HER2 Biomarker Guide", BIOMARKERS],
  ["Pathology Report Explained", PATHOLOGY],
  ["Breast Reconstruction After Mastectomy", RECON],
  ["Breast Cancer for International Patients", INTL],
  ["Breast Cancer in Young Women", YOUNG],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("Hearing that a breast examination or mammogram is abnormal can be frightening. An abnormal finding does **not** automatically mean cancer. Lumps, pain, discharge and appearance changes can come from cysts, fibroadenomas, hormonal shifts or other benign conditions — or they may need further investigation."),
  p("Doctors typically use **triple assessment**: clinical breast examination, breast imaging and pathological examination when indicated. A breast cancer diagnosis is generally confirmed through **biopsy**, where tissue is examined under a microscope."),
  p("This guide covers mammography, ultrasound, MRI, biopsy, BI-RADS, ER/PR/HER2 testing, staging and what international patients should know about diagnosis pathways in India. Companion reading: [breast cancer symptoms](" + SYMPTOMS + "), [diagnosis tests (biopsy & receptors)](" + DIAG_TESTS + "), [stages](" + STAGES_NEW + "), [treatment options](" + OPTIONS + ") and [treatment cost in India](" + COST_BLOG + ")."),
  p("After diagnosis, treatment planning may involve surgery, [chemotherapy](" + CHEMO_TX + "), radiation, hormone therapy or targeted drugs. GAF planning for [lumpectomy](" + LUMPECTOMY + ") is **$3,500–$8,000** (typically **1–3 nights**) and for [mastectomy](" + MASTECTOMY + ") is **$4,500–$10,000** (typically **3–6 nights**). Neighbouring [sentinel lymph node biopsy](" + SLNB + ") is **$2,000–$5,500**. These are partner planning ranges, not quotations."),
  p("Patients comparing [surgical oncologists](" + SURG_DOCS + ") often start with [lumpectomy](" + LUMP_DOCS + ") and [mastectomy](" + MAST_DOCS + ") lists alongside [medical oncology](" + MED_DOCS + "). Partner hospitals in [Delhi NCR](" + DELHI_HOSP + "), [Mumbai](" + MUMBAI_HOSP + ") and [Bengaluru](" + BLR_HOSP + ") are a typical first filter — see the [international patients guide](" + INTL + ")."),
  btn("Ask about a breast cancer diagnosis work-up in India", consult("Breast Cancer Diagnosis")),
  p("[WhatsApp +91 90443 46292 with mammogram, ultrasound and biopsy reports](" + wa("I need help reviewing breast imaging and biopsy reports for a specialist diagnosis pathway in India.") + ")"),
  img("/uploads/articles/breast-cancer-diagnosis-triple.webp", "Canva-style unlabeled illustration of a patient beside a breast diagram with clinical exam, imaging and pathology icons", "Triple assessment combines examination, imaging and tissue testing when needed."),

  h2("What Is Breast Cancer Diagnosis?"),
  p("Diagnosis determines whether a breast abnormality is cancerous and characterises the tumour so the team can plan care. Key questions include:"),
  ul([
    "Is the lump or imaging finding cancerous?",
    "Is disease invasive or non-invasive (for example DCIS)?",
    "What histological type and grade are present?",
    "Are ER, PR and HER2 expressed?",
    "Are nearby lymph nodes involved?",
    "Has cancer spread to distant organs?",
    "Which [treatment options](" + OPTIONS + ") fit this biology and stage?",
  ]),

  h2("What Is the Triple Assessment for Breast Cancer?"),
  p("Triple assessment is the standard way to investigate suspicious breast symptoms. The three components complement each other; disagreement between exam, imaging and biopsy prompts further review. National standard treatment guidance in India also emphasises this approach."),
  html(tripleTable),
  p("Example: a palpable lump that looks suspicious on ultrasound may lead to image-guided core needle biopsy. Relying on a single test increases the chance of missing or misinterpreting disease."),

  h2("Clinical Breast Examination: The First Diagnostic Step"),
  p("A breast specialist or trained clinician examines both breasts and regional nodes. They assess size and shape, lump location and feel, skin changes, nipple position or discharge, armpit swelling and nodes near the collarbone. History covers onset, growth, pain, menstrual and reproductive factors, prior breast disease, family history and previous imaging or biopsy."),
  p("Examination can flag suspicion but **cannot confirm cancer alone**. Imaging and tissue testing may still be required — especially when symptoms match patterns described in the [symptoms guide](" + SYMPTOMS + ")."),

  h2("Mammography: How Does It Detect Breast Cancer?"),
  p("Mammography uses low-dose X-rays to image breast tissue. It can show small masses, microcalcifications, architectural distortion and other changes that are not obvious on exam."),
  h3("How is a mammogram performed?"),
  ol([
    "The patient stands at the mammography unit",
    "One breast is positioned on the imaging plate",
    "Gentle compression spreads tissue for a clearer image",
    "Views are taken from different angles, then repeated for the other breast",
  ]),
  p("Compression may feel briefly uncomfortable and usually lasts only a few minutes. It improves image quality and can reduce the radiation needed."),
  h3("Screening versus diagnostic mammography"),
  html(mammoTable),
  p("A new breast lump generally needs **diagnostic** assessment rather than waiting for the next routine screen. Three-dimensional mammography (tomosynthesis) captures multiple angles and may help when overlapping tissue is hard to interpret; availability varies."),

  h2("Breast Ultrasound: What Does It Show?"),
  p("Ultrasound uses sound waves to examine palpable lumps or mammographic abnormalities. It helps distinguish fluid-filled cysts from solid masses, map lump location, assess nodes and guide biopsy. The exam is usually painless and uses no ionising radiation."),
  html(usVsMammo),
  p("Ultrasound and mammography are complementary — one does not universally replace the other. Age, breast density, symptoms and findings decide the mix."),
  img("/uploads/articles/breast-cancer-diagnosis-imaging.webp", "Canva-style unlabeled illustration of a patient beside a breast imaging diagram with mammogram, ultrasound and MRI icons", "Imaging finds and characterises abnormalities; biopsy confirms cancer when needed."),
  btn("Share imaging for a breast specialist opinion", consult("Breast Cancer Diagnosis / Imaging Review")),
  p("[WhatsApp +91 90443 46292 if you have BI-RADS 4 or 5 findings](" + wa("My breast imaging report shows BI-RADS 4 or 5. Can you help coordinate biopsy and specialist review in India?") + ")"),

  h2("Breast MRI: When Is It Needed?"),
  p("Breast MRI uses magnetic fields and radio waves, often with gadolinium contrast, for detailed images. It is **not** required for every lump. Doctors may use it to assess extent of known cancer, evaluate possible multifocal disease or invasive lobular carcinoma, screen selected high-risk women, clarify inconclusive conventional imaging, check response to neoadjuvant therapy or assess some implant cases."),
  p("Patients lie face down in a dedicated breast coil; exams often take about 30–60 minutes. MRI is highly sensitive but can also flag non-cancerous findings that need extra work-up — so teams choose it for specific clinical reasons."),

  h2("What Is a Breast Biopsy?"),
  p("A biopsy removes a small sample of tissue or cells for laboratory examination. **It is generally the definitive way to confirm whether a suspicious area is cancerous.** Imaging can look suspicious without proving cancer."),
  html(biopsyTable),
  p("Core needle biopsy is commonly preferred because it preserves tissue architecture for type, grade and biomarkers. Image-guided approaches include ultrasound-, stereotactic/mammography- and MRI-guided biopsy when the target cannot be felt."),
  h3("Is biopsy painful? How long does it take?"),
  p("Most needle biopsies use local anaesthesia. Patients may feel the anaesthetic injection, pressure, temporary bruising or mild tenderness. A marker clip may be placed for later surgery or imaging. Procedures often take about 15–45 minutes as outpatient care."),
  img("/uploads/articles/breast-cancer-diagnosis-biopsy.webp", "Canva-style unlabeled illustration of a patient beside a breast diagram with needle biopsy and pathology lab icons", "Core needle biopsy provides tissue for histopathology and biomarker testing."),

  h2("What Happens After a Breast Biopsy?"),
  p("A pathologist prepares a histopathology report — one of the most important documents in the pathway. It may show a benign finding, a pre-cancerous change or cancer. If cancer is confirmed, the report typically covers type, invasion, grade and receptors. Full walkthrough: [pathology report explained](" + PATHOLOGY + ")."),
  html(reportTable),

  h2("Understanding ER, PR and HER2 Tests"),
  p("Diagnosis is incomplete without tumour biology. Oestrogen receptor (ER), progesterone receptor (PR) and HER2 status help select [hormone therapy](" + HORMONE + "), [HER2-targeted treatment](" + HER2 + ") or other systemic pathways."),
  html(biomarkerTable),
  p("**Triple-negative** breast cancer is ER-, PR- and HER2-negative by testing criteria. Chemotherapy (± immunotherapy in eligible cases) often plays a larger role. Deeper detail: [ER/PR/HER2 guide](" + BIOMARKERS + ") and [diagnosis tests blog](" + DIAG_TESTS + ")."),
  btn("Ask how to organise biopsy and IHC review in India", consult("Breast Cancer Diagnosis / IHC Review")),

  h2("Histopathology versus Immunohistochemistry"),
  html(histoVsIhc),
  p("When HER2 IHC is equivocal, in-situ hybridisation (ISH) may be added. Both histopathology and IHC feed the multidisciplinary plan."),

  h2("What Is the BI-RADS Classification?"),
  p("BI-RADS (Breast Imaging Reporting and Data System) standardises how radiologists describe mammography, ultrasound and MRI findings."),
  html(biradsTable),
  p("**BI-RADS 4 does not mean cancer** — it means the finding is suspicious enough for biopsy. **BI-RADS 5** is highly suggestive of malignancy, but tissue diagnosis is still required. **BI-RADS 3** is probably benign; attend the recommended short-interval follow-up."),

  h2("How Is Breast Cancer Staged?"),
  p("After confirmation, staging describes how far disease has spread using the TNM system, often combined with grade and biomarkers for prognostic staging. Overview: [breast cancer stages](" + STAGES_NEW + ") and [stages 0–4](" + STAGES_LEGACY + ")."),
  html(tnmTable),
  html(stageTable),
  p("**Metastatic (Stage IV)** disease has spread beyond the breast and regional nodes — commonly to bone, liver, lung or brain. Treatment then focuses on disease control and quality of life alongside biology-specific therapy. See [treatment by stage](" + BY_STAGE + ")."),
  img("/uploads/articles/breast-cancer-diagnosis-staging.webp", "Canva-style unlabeled illustration of a patient beside a breast diagram with tumour, node and metastasis icons", "Staging combines tumour size, nodes, distant spread and tumour biology."),

  h2("What Tests Check Whether Breast Cancer Has Spread?"),
  p("Not every patient needs whole-body scanning. Extra tests depend on clinical stage, symptoms and risk."),
  html(stagingTests),
  p("**PET-CT is not compulsory** for every early-stage case. Unnecessary scans can find unrelated findings that drive anxiety and extra procedures — teams order staging studies based on need."),

  h2("What Is Sentinel Lymph Node Biopsy?"),
  p("The sentinel node is the first drainage node (or group) from the tumour area. Surgeons inject a tracer (radioisotope, blue dye or both), remove the identified node(s) and send them for pathology."),
  ul([
    "**Negative sentinel node** — no cancer in sampled node(s)",
    "**Positive sentinel node** — cancer cells in one or more sampled nodes",
  ]),
  p("A positive node does not automatically mean full axillary clearance; modern decisions are individualised. GAF planning for [sentinel lymph node biopsy](" + SLNB + ") is **$2,000–$5,500** (typically **1–2 nights**). Surgery context: [breast cancer surgery in India](" + SURGERY + ")."),

  h2("How Long Does Breast Cancer Diagnosis Take?"),
  html(timingTable),
  p("The full journey may take several days to a few weeks. Ask when each report is due and whether a multidisciplinary board will review results."),

  h2("What Happens After Breast Cancer Is Confirmed?"),
  p("Confirmation starts treatment planning. A multidisciplinary team may include surgical, medical and radiation oncologists, radiologists, pathologists, reconstructive surgeons and oncology nurses."),
  html(planFactors),
  p("Care may begin with surgery or with medicines first ([neoadjuvant therapy](" + NEO_BLOG + ") / [neoadjuvant chemotherapy](" + NEO + ")). Pathways: [treatment options](" + OPTIONS + "), [chemotherapy](" + CHEMO_BLOG + "), [adjuvant chemotherapy](" + ADJ + "), [radiation](" + RAD + ") and [reconstruction](" + RECON + ") / [reconstruction treatment](" + RECON_TX + ")."),
  btn("Request a multidisciplinary treatment plan review", consult("Breast Cancer Treatment in India")),
  p("[WhatsApp +91 90443 46292 with pathology and IHC summary](" + wa("Breast cancer is confirmed. I can share pathology, ER/PR/HER2 and imaging for a treatment plan review in India.") + ")"),

  h2("Breast Cancer Diagnosis in India for International Patients"),
  p("Indian centres offer specialist consultation, mammography, ultrasound, MRI, image-guided biopsy, histopathology and biomarker testing. Patients from East Africa, the Middle East and elsewhere often combine diagnosis review with second opinions and treatment planning."),
  html(facilityTable),
  p("GAF Healthcare can help identify hospitals, coordinate appointments, arrange record review and estimates, and support travel logistics — see [international patients](" + INTL + ")."),
  ul([
    "Mammography, ultrasound and MRI reports (DICOM images where possible)",
    "Histopathology, biopsy and ER/PR/HER2 reports",
    "Prior treatment and surgical records",
    "Current medications and recent blood tests",
  ]),
  p("**Do not delay necessary treatment** only to repeat every test abroad. Let the receiving specialist decide what must be redone."),

  h2("Cost Context After Diagnosis: GAF Planning Ranges"),
  p("Diagnostic packages vary by hospital, city, imaging mix, biopsy method and pathology panel. GAF does **not** publish standalone mammography or ultrasound package prices — request a written hospital estimate for the investigations your specialist recommends."),
  html(costDrivers),
  p("Once a treatment pathway is clear, use named GAF cost sheets for surgery and systemic care. Full context: [breast cancer treatment cost in India](" + COST_BLOG + ")."),
  html(costTable),
  html(cityTable),
  p("Do not sum every line into one total. Targeted therapy and immunotherapy depend on medicine and duration."),
  btn("Request an itemised breast cancer estimate", consult("Breast Cancer Treatment Cost")),
  p("[WhatsApp +91 90443 46292 with stage and IHC for costing](" + wa("Please help estimate breast cancer treatment in India after diagnosis. I can share stage, ER/PR/HER2 and preferred city.") + ")"),

  h2("Common Mistakes to Avoid During Diagnosis"),
  ol([
    "**Assuming every lump is cancer** — many are benign; assess properly",
    "**Assuming a painless lump is harmless** — cancer is often painless",
    "**Treating a mammogram as a final diagnosis** — biopsy confirms cancer",
    "**Ignoring BI-RADS 4 or 5** — follow-up and usually biopsy are needed",
    "**Starting treatment without adequate pathology** — confirm tissue diagnosis and biomarkers when feasible",
    "**Ignoring ER/PR/HER2** — these reshape systemic therapy choices",
    "**Repeating every test unnecessarily** — have specialists review existing reports first",
    "**Delaying recommended biopsy** — follow advised timelines",
  ]),

  h2("Frequently Asked Questions About Breast Cancer Diagnosis"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Key Takeaways"),
  ul([
    "Triple assessment combines exam, imaging and pathology when indicated.",
    "Biopsy — not imaging alone — generally confirms breast cancer.",
    "ER, PR and HER2 results are essential for treatment selection.",
    "BI-RADS 4/5 findings usually need tissue diagnosis.",
    "Staging uses TNM plus biology; not every patient needs PET-CT.",
    "GAF surgery planning examples: lumpectomy $3,500–$8,000; mastectomy $4,500–$10,000; SLNB $2,000–$5,500.",
    "International patients should organise pathology and DICOM imaging before travel.",
  ]),

  h2("Top Medical Sources and References"),
  ol([
    "[NCI — How is breast cancer diagnosed?](https://www.cancer.gov/types/breast/diagnosis)",
    "[CDC — Diagnosing breast cancer](https://www.cdc.gov/breast-cancer/screening/diagnosis.html)",
    "[American Cancer Society — Mammograms and other breast imaging tests](https://www.cancer.org/cancer/types/breast-cancer/screening-tests-and-early-detection.html)",
    "[NICE NG101 — Early and locally advanced breast cancer](https://www.nice.org.uk/guidance/ng101)",
    "[ICMR — Standard Treatment Workflows, Breast Cancer](https://www.icmr.gov.in/icmrobject/custom_data/pdf/downloadable-books/STW_Vol_3_2022.pdf)",
    "[NHS — Tests and next steps for breast cancer](https://www.nhs.uk/conditions/breast-cancer-in-women/tests-and-next-steps-for-breast-cancer-in-women/)",
    "[NCI — Breast cancer stages](https://www.cancer.gov/types/breast/stages)",
    "[GAF Healthcare — Breast cancer treatment cost in India](" + COST_BLOG + ")",
  ]),

  h2("Related Reading on GAF Healthcare"),
  ul(RELATED.map(([label, href]) => `[${label}](${href})`)),

  h2("Explore Breast Cancer Care in India"),
  p("Accurate diagnosis is the foundation of treatment. GAF Healthcare helps international patients coordinate records, specialist consultations and estimates for breast cancer care in India. Website: [https://gaf.healthcare/](https://gaf.healthcare/)."),
  btn("Contact GAF Healthcare about breast cancer diagnosis and treatment", consult("Breast Cancer Treatment in India")),

  h2("Medical Disclaimer"),
  p("This article is for general educational purposes and does not replace consultation, diagnosis or treatment advice from a qualified professional. Diagnostic tests must be selected by a clinician based on individual findings. Cost figures are indicative planning ranges for named pathways. Emergency symptoms belong in a local emergency department."),
];

const now = new Date().toISOString();
const SLUG = "breast-cancer-diagnosis";

const article = {
  id: "art_breast_cancer_diagnosis",
  slug: SLUG,
  title: "Breast Cancer Diagnosis: Tests, Mammography, Ultrasound, Biopsy and Staging Explained",
  excerpt:
    "Breast cancer diagnosis involves more than finding a lump or undergoing a mammogram. Doctors use clinical examination, breast imaging, biopsy and laboratory tests to confirm cancer, identify its type and determine the appropriate treatment. This guide explains every major diagnostic test, the BI-RADS reporting system, breast cancer staging and what international patients should know about getting diagnosed in India.",
  date: "11 November 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Surgical Oncology",
  tags: [
    "breast cancer",
    "breast cancer diagnosis",
    "mammography",
    "breast biopsy",
    "BI-RADS",
    "ER PR HER2",
    "India",
  ],
  image: "/uploads/articles/breast-cancer-diagnosis-triple.webp",
  imageAlt:
    "Canva-style unlabeled illustration of a patient beside a breast diagram with clinical exam, imaging and pathology icons",
  status: "published",
  featured: true,
  seoTitle: "Breast Cancer Diagnosis: Tests, Mammography, Biopsy & Staging",
  seoDescription:
    "Understand how breast cancer is diagnosed using mammography, ultrasound, MRI, biopsy and biomarker tests. Learn about BI-RADS, breast cancer staging and diagnosis in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/breast-cancer-diagnosis-triple.webp",
  allowIndex: true,
  keywords: [
    "Breast cancer diagnosis",
    "Tests for breast cancer",
    "How is breast cancer diagnosed?",
    "Breast cancer diagnostic tests",
    "Mammography for breast cancer",
    "Breast ultrasound",
    "Breast biopsy procedure",
    "Core needle biopsy",
    "Breast MRI",
    "BI-RADS classification",
    "Breast cancer staging tests",
    "ER PR HER2 testing",
    "Breast cancer diagnosis in India",
  ],
  relatedLinks: RELATED.map(([label, href]) => ({ label, href })),
  blocks,
};

if (!store.categories.includes("Surgical Oncology")) store.categories.push("Surgical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["breast-cancer-diagnosis-triple.webp", article.imageAlt],
  [
    "breast-cancer-diagnosis-imaging.webp",
    "Canva-style unlabeled illustration of a patient beside a breast imaging diagram with mammogram, ultrasound and MRI icons",
  ],
  [
    "breast-cancer-diagnosis-biopsy.webp",
    "Canva-style unlabeled illustration of a patient beside a breast diagram with needle biopsy and pathology lab icons",
  ],
  [
    "breast-cancer-diagnosis-staging.webp",
    "Canva-style unlabeled illustration of a patient beside a breast diagram with tumour, node and metastasis icons",
  ],
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
if (!llms.includes(`/blogs/${SLUG}`)) {
  if (llms.includes("breast-cancer-symptoms")) {
    llms = llms.replace(
      "[breast cancer symptoms](https://gaf.healthcare/blogs/breast-cancer-symptoms)",
      "[breast cancer symptoms](https://gaf.healthcare/blogs/breast-cancer-symptoms), [breast cancer diagnosis](https://gaf.healthcare/blogs/breast-cancer-diagnosis)",
    );
  } else if (llms.includes("breast-cancer-treatment-in-india")) {
    llms = llms.replace(
      "[breast cancer treatment in India](https://gaf.healthcare/treatments/breast-cancer-treatment-in-india)",
      "[breast cancer treatment in India](https://gaf.healthcare/treatments/breast-cancer-treatment-in-india), [breast cancer diagnosis](https://gaf.healthcare/blogs/breast-cancer-diagnosis)",
    );
  } else {
    llms = llms.replace(
      /(- \[Blogs\]\(https:\/\/gaf\.healthcare\/blogs\):[^\n]+)/,
      `$1, [breast cancer diagnosis](https://gaf.healthcare/blogs/breast-cancer-diagnosis)`,
    );
  }
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
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
  "breast-cancer-symptoms",
  "breast-cancer-treatment-cost-in-india",
  "breast-cancer-diagnosis-tests-biopsy-er-pr-her2",
  "breast-cancer-stages-0-1-2-3-4",
  "breast-cancer-surgery-in-india",
  "breast-cancer-treatment-india-international-patients",
  "breast-cancer-treatment-options",
]) {
  if (linkFromRelated(slug, "Breast Cancer Diagnosis")) console.log("linked from", slug);
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
