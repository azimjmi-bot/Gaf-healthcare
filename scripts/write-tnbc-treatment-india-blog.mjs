#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const SLUG = "triple-negative-breast-cancer-treatment-india";
const CHEMO = "/costs/India/Medical-Oncology/Chemotherapy";
const NEOADJ = "/costs/India/Medical-Oncology/Neoadjuvant-Chemotherapy";
const ADJ = "/costs/India/Medical-Oncology/Adjuvant-Chemotherapy";
const IMMUNO = "/costs/India/Medical-Oncology/Immunotherapy";
const TARGETED = "/costs/India/Medical-Oncology/Targeted-Therapy";
const PRECISION = "/costs/India/Medical-Oncology/Precision-Oncology";
const HORMONE = "/costs/India/Medical-Oncology/Hormone-Therapy";
const EBRT = "/costs/India/Radiation-Oncology/EBRT";
const LUMPECTOMY = "/costs/India/Surgical-Oncology/Lumpectomy";
const MASTECTOMY = "/costs/India/Surgical-Oncology/Mastectomy";
const RECON = "/costs/India/Surgical-Oncology/Breast-Reconstruction";
const SLNB = "/costs/India/Surgical-Oncology/Sentinel-Lymph-Node-Biopsy";
const TX_BREAST = "/treatments/breast-cancer-treatment-in-india";
const TX_CHEMO = "/treatments/chemotherapy-in-india";
const TX_IMMUNO = "/treatments/immunotherapy-in-india";
const TX_TARGETED = "/treatments/targeted-therapy-in-india";
const TX_NEO = "/treatments/neoadjuvant-chemotherapy-in-india";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const CHEMO_BLOG = "/blogs/breast-cancer-chemotherapy-in-india";
const RAD_BLOG = "/blogs/breast-cancer-radiation-therapy-in-india";
const HT_BLOG = "/blogs/hormone-therapy-for-breast-cancer-in-india";
const TARGETED_BLOG = "/blogs/targeted-therapy-for-breast-cancer-in-india";
const HER2 = "/blogs/her2-positive-breast-cancer-treatment-india";
const ERPR = "/blogs/er-pr-her2-breast-cancer-treatment-india";
const DIAG = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const SYMPTOMS = "/blogs/breast-cancer-symptoms";
const STAGES = "/blogs/breast-cancer-stages";
const OPTIONS = "/blogs/breast-cancer-treatment-options";
const COST_BLOG = "/blogs/breast-cancer-treatment-cost-in-india";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const MED_DOCS = "/doctors/India/Medical-Oncology";
const MED_HOSP = "/hospitals/India/Medical-Oncology";
const SURG_DOCS = "/doctors/India/Surgical-Oncology";
const RAD_DOCS = "/doctors/India/Radiation-Oncology";
const DELHI = "/doctors/India/Delhi-NCR/Medical-Oncology";
const MUMBAI = "/doctors/India/Mumbai/Medical-Oncology";
const BLR = "/doctors/India/Bengaluru/Medical-Oncology";
const CHN = "/doctors/India/Chennai/Medical-Oncology";
const HYD = "/doctors/India/Hyderabad/Medical-Oncology";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;
const h2 = (text) => ({ id: id("h"), type: "heading", level: 2, text });
const h3 = (text) => ({ id: id("h"), type: "heading", level: 3, text });
const p = (text) => ({ id: id("p"), type: "paragraph", text });
const ul = (items) => ({ id: id("ul"), type: "list", style: "ul", items });
const ol = (items) => ({ id: id("ol"), type: "list", style: "ol", items });
const btn = (label, href) => ({ id: id("btn"), type: "button", label, href });
const img = (src, alt, caption) => ({ id: id("img"), type: "image", src, alt, caption });

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>What is TNBC?</strong></td><td>Breast cancer that is ER-negative, PR-negative and HER2-negative — see <a href="${ERPR}">ER/PR/HER2 results</a></td></tr><tr><td><strong>Does hormone therapy work?</strong></td><td>Conventional endocrine therapy is generally not useful — contrast with <a href="${HT_BLOG}">hormone therapy</a></td></tr><tr><td><strong>Core systemic treatment</strong></td><td><a href="${CHEMO}">Chemotherapy</a> $1,500–$8,000+ · often neoadjuvant for higher-risk disease</td></tr><tr><td><strong>Neoadjuvant / adjuvant</strong></td><td><a href="${NEOADJ}">Neoadjuvant</a> and <a href="${ADJ}">adjuvant</a> each $2,500–$10,000 on named sheets</td></tr><tr><td><strong>Immunotherapy (selected)</strong></td><td><a href="${IMMUNO}">Immunotherapy</a> $15,000–$45,000 · pembrolizumab in eligible high-risk or PD-L1 settings</td></tr><tr><td><strong>BRCA / PARP / ADCs</strong></td><td>Discuss genetic testing and <a href="${TARGETED}">targeted therapy</a> $8,000–$30,000 when biomarkers allow</td></tr><tr><td><strong>Surgery & radiation</strong></td><td><a href="${SURGERY}">Surgery guide</a> · <a href="${RAD_BLOG}">radiation guide</a> · <a href="${EBRT}">EBRT</a> $1,000–$6,000+</td></tr><tr><td><strong>India planning</strong></td><td>Multidisciplinary care — filter <a href="${MED_DOCS}">medical oncologists</a> by city before travel</td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>Triple-negative breast cancer treatment in India</strong> centres on chemotherapy, with immunotherapy, surgery, radiation, PARP inhibitors or antibody-drug conjugates for selected patients. GAF figures are partner planning ranges, not hospital quotations.</p><p class="article-quick-answer__body"><strong>Important:</strong> TNBC is not untreatable. Early-stage disease can respond well. GAF Healthcare does not prescribe cancer medicines.</p></aside>`;

const markerTable = `<div class="md-body"><table><thead><tr><th>Marker</th><th>What it means</th><th>Result in TNBC</th></tr></thead><tbody><tr><td>Oestrogen receptor (ER)</td><td>Whether cancer cells use oestrogen signals</td><td>Negative</td></tr><tr><td>Progesterone receptor (PR)</td><td>Whether cancer cells use progesterone signals</td><td>Negative</td></tr><tr><td>HER2</td><td>Excess HER2 protein or gene amplification</td><td>Negative</td></tr></tbody></table></div>`;

const symptomTable = `<div class="md-body"><table><thead><tr><th>Symptom</th><th>What to look for</th></tr></thead><tbody><tr><td>Breast lump</td><td>A new lump or thickened area</td></tr><tr><td>Change in breast size</td><td>Unusual swelling or shape change</td></tr><tr><td>Skin dimpling</td><td>Pulled-in skin or orange-peel appearance</td></tr><tr><td>Nipple changes</td><td>New inversion or unusual discharge</td></tr><tr><td>Breast pain</td><td>Persistent discomfort — many cancers are painless</td></tr><tr><td>Underarm lump</td><td>Swelling from enlarged nodes</td></tr><tr><td>Skin changes</td><td>Redness, thickening or unusual skin changes</td></tr></tbody></table></div>`;

const stageTable = `<div class="md-body"><table><thead><tr><th>Stage</th><th>What it generally means</th></tr></thead><tbody><tr><td>Stage 0</td><td>Non-invasive disease such as DCIS — not usually invasive TNBC</td></tr><tr><td>Stage 1</td><td>Small invasive cancer, limited or no node involvement</td></tr><tr><td>Stage 2</td><td>Larger tumour and/or limited nearby node involvement</td></tr><tr><td>Stage 3</td><td>Locally advanced disease involving nearby tissues or nodes</td></tr><tr><td>Stage 4</td><td>Distant spread (lungs, liver, bones, brain or other sites)</td></tr></tbody></table></div>`;

const treatTable = `<div class="md-body"><table><thead><tr><th>Treatment</th><th>Main purpose</th></tr></thead><tbody><tr><td>Chemotherapy</td><td>Destroy cancer cells or slow growth</td></tr><tr><td>Immunotherapy</td><td>Help the immune system recognise cancer cells</td></tr><tr><td>Surgery</td><td>Remove tumour and assess/treat nearby nodes</td></tr><tr><td>Radiation therapy</td><td>Treat remaining cells in the breast or chest wall</td></tr><tr><td>PARP inhibitors</td><td>Exploit DNA-repair weakness with relevant BRCA mutations</td></tr><tr><td>Antibody-drug conjugates</td><td>Deliver chemotherapy via a targeted antibody in selected advanced cases</td></tr></tbody></table></div>`;

const stagePlanTable = `<div class="md-body"><table><thead><tr><th>Stage</th><th>Common treatment approach</th></tr></thead><tbody><tr><td>Stage 1</td><td>Surgery ± chemotherapy; radiation after conservation</td></tr><tr><td>Stage 2</td><td>Often chemotherapy before surgery; immunotherapy for eligible high-risk cases</td></tr><tr><td>Stage 3</td><td>Systemic therapy before surgery, then surgery, radiation and further medicines when indicated</td></tr><tr><td>Stage 4</td><td>Systemic therapy guided by PD-L1, BRCA and prior treatment; supportive care as needed</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Named pathway</th><th>GAF planning range in India</th><th>Typical schedule / stay</th></tr></thead><tbody><tr><td><a href="${CHEMO}">Chemotherapy</a></td><td>$1,500–$8,000+</td><td>Outpatient cycles</td></tr><tr><td><a href="${NEOADJ}">Neoadjuvant chemotherapy</a></td><td>$2,500–$10,000</td><td>Cycles before surgery · 2–4 months</td></tr><tr><td><a href="${ADJ}">Adjuvant chemotherapy</a></td><td>$2,500–$10,000</td><td>Cycles after surgery · 3–6 months</td></tr><tr><td><a href="${IMMUNO}">Immunotherapy</a></td><td>$15,000–$45,000</td><td>Repeated outpatient treatment</td></tr><tr><td><a href="${TARGETED}">Targeted therapy</a></td><td>$8,000–$30,000</td><td>Medicine and duration dependent</td></tr><tr><td><a href="${PRECISION}">Precision oncology</a></td><td>$2,000–$7,000</td><td>Genomic/testing pathway planning</td></tr><tr><td><a href="${LUMPECTOMY}">Lumpectomy</a></td><td>$3,500–$8,000</td><td>About 1–3 nights</td></tr><tr><td><a href="${MASTECTOMY}">Mastectomy</a></td><td>$4,500–$10,000</td><td>About 3–6 nights</td></tr><tr><td><a href="${EBRT}">EBRT</a></td><td>$1,000–$6,000+</td><td>Often 15–35 sessions</td></tr><tr><td><a href="${HORMONE}">Hormone therapy</a></td><td>$1,000–$4,500</td><td>Generally not useful for classic TNBC</td></tr></tbody></table></div>`;

const faqs = [
  ["Is triple-negative breast cancer more dangerous than other breast cancers?", "TNBC can be more aggressive than some subtypes and may have a higher risk of early recurrence. Outlook still depends heavily on stage and treatment response. Many early-stage patients respond well."],
  ["Can triple-negative breast cancer be cured?", "Early-stage TNBC can be treated with curative intent using chemotherapy, surgery and radiation, with immunotherapy for selected patients. Stage 4 disease is generally not considered curable, though treatment can control disease and improve quality of life."],
  ["What is the best treatment for triple-negative breast cancer?", "There is no single best regimen for everyone. Chemotherapy is central. Surgery, radiation, pembrolizumab, PARP inhibitors and antibody-drug conjugates may be added based on stage and biomarkers."],
  ["Does triple-negative breast cancer respond to chemotherapy?", "Yes. TNBC often responds to chemotherapy, which is why chemotherapy is a major part of early and advanced treatment plans."],
  ["Is immunotherapy available for TNBC in India?", "Immunotherapy medicines may be available subject to approval, hospital access and clinical indication. Pembrolizumab is used in selected settings. The oncologist must confirm eligibility."],
  ["Is pembrolizumab given to every TNBC patient?", "No. Use depends on stage, risk, medical history and eligibility. In certain advanced settings, PD-L1 testing matters."],
  ["What is PD-L1 testing?", "PD-L1 testing examines a protein involved in immune recognition. In selected advanced TNBC settings, the result helps decide whether pembrolizumab with chemotherapy may help."],
  ["Should every TNBC patient undergo BRCA testing?", "Genetic testing should be discussed with the treating team. It is particularly important in TNBC because BRCA1/2 results may change treatment and family risk counselling."],
  ["What happens if TNBC does not disappear after chemotherapy?", "Pathology after neoadjuvant therapy checks for residual disease. Depending on findings and genetics, additional chemotherapy, olaparib or continuation of a planned immunotherapy pathway may be considered."],
  ["Can TNBC spread to the lungs, liver or brain?", "Yes. Advanced TNBC can spread to distant organs. New symptoms should be assessed by the treating oncologist."],
  ["Can a patient with TNBC undergo breast reconstruction?", "Yes. Reconstruction may be immediate or delayed after mastectomy, depending on condition, schedule and radiation needs."],
  ["How long does TNBC treatment take?", "Chemotherapy often spans several months. Surgery, radiation and additional immunotherapy or other medicines add further time. Ask for a written calendar."],
  ["Is hormone therapy useful for TNBC?", "Conventional hormone therapy such as tamoxifen or aromatase inhibitors is generally not useful because TNBC lacks the hormone receptors those medicines target."],
  ["Can TNBC occur in younger women?", "Yes. TNBC is relatively more common in younger women than some other subtypes, although it can occur at any age."],
  ["Is treatment in India a good option for international TNBC patients?", "India may offer multidisciplinary oncology care, surgery, chemotherapy, radiation and selected newer medicines. Hospital selection should follow the patient's reports and clinical needs."],
  ["What is pathological complete response?", "Pathological complete response generally means no residual invasive cancer is found in the breast and sampled nodes after preoperative treatment. Exact report wording should be checked with the pathologist and oncologist."],
];

const RELATED = [
  ["Breast cancer treatment in India", TX_BREAST],
  ["ER, PR and HER2 results", ERPR],
  ["Breast cancer diagnosis tests", DIAG],
  ["Breast cancer symptoms", SYMPTOMS],
  ["Breast cancer stages", STAGES],
  ["Breast cancer treatment options", OPTIONS],
  ["Breast cancer surgery in India", SURGERY],
  ["Breast cancer chemotherapy in India", CHEMO_BLOG],
  ["Breast cancer radiation therapy in India", RAD_BLOG],
  ["Hormone therapy for breast cancer", HT_BLOG],
  ["Targeted therapy for breast cancer", TARGETED_BLOG],
  ["HER2-positive breast cancer treatment", HER2],
  ["Breast cancer treatment cost in India", COST_BLOG],
  ["International patients", INTL],
  ["Chemotherapy in India", TX_CHEMO],
  ["Immunotherapy in India", TX_IMMUNO],
  ["Targeted therapy in India", TX_TARGETED],
  ["Medical oncology doctors", MED_DOCS],
  ["Medical oncology hospitals", MED_HOSP],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("**Triple-negative breast cancer (TNBC)** is breast cancer that does not have oestrogen receptors, progesterone receptors or excess HER2 protein. Although it can be aggressive, several effective treatments are available — including chemotherapy, immunotherapy and selected targeted medicines."),
  p("This guide explains symptoms, diagnosis, stages, treatment options and planning for patients seeking care in India. Related reading includes [ER/PR/HER2 results](" + ERPR + "), [breast cancer diagnosis](" + DIAG + "), [chemotherapy](" + CHEMO_BLOG + "), [immunotherapy in India](" + TX_IMMUNO + ") and [breast cancer treatment cost](" + COST_BLOG + ")."),
  p("GAF planning ranges commonly used in TNBC pathways include [chemotherapy](" + CHEMO + ") **$1,500–$8,000+**, [neoadjuvant](" + NEOADJ + ")/[adjuvant](" + ADJ + ") chemotherapy **$2,500–$10,000** each, and [immunotherapy](" + IMMUNO + ") **$15,000–$45,000** when indicated. Filter [medical oncologists](" + MED_DOCS + ") by city before travel."),
  btn("Ask GAF to review TNBC pathology and staging reports", consult("Triple-Negative Breast Cancer Treatment")),
  p("[WhatsApp +91 90443 46292 with ER/PR/HER2, biopsy and imaging](" + wa("Please review my triple-negative breast cancer reports and advise on treatment options and cost in India.") + ")"),
  img("/uploads/articles/tnbc-receptor-negative-overview.webp", "Woman in clinic consultation beside a circular diagram of a breast cancer cell lacking estrogen, progesterone and HER2 receptors", "TNBC is defined by negative ER, PR and HER2 results on pathology testing."),

  h2("What is triple-negative breast cancer?"),
  p("TNBC lacks three commonly tested markers used to choose medicines: ER, PR and HER2. Hormone therapy and conventional HER2-directed drugs are generally not useful for classic TNBC."),
  p("Modern plans may still include chemotherapy, immunotherapy, surgery, radiation, PARP inhibitors for selected BRCA1/2 mutations, and antibody-drug conjugates for certain advanced cancers. Early diagnosis and a multidisciplinary plan matter."),

  h2("Why is it called triple-negative?"),
  { id: id("html"), type: "html", html: markerTable },
  p("Hormone receptor-positive cancers may use tamoxifen or aromatase inhibitors ([hormone therapy guide](" + HT_BLOG + ")). HER2-positive cancers may use trastuzumab and related medicines ([HER2 guide](" + HER2 + ")). TNBC needs a different pathway — it is not untreatable."),

  h2("How common is triple-negative breast cancer?"),
  p("TNBC accounts for roughly 10–15% of breast cancers, with variation between populations. It can occur at any age and is relatively more common in younger women. Associated factors include younger age, BRCA1 mutations, family history of breast/ovarian cancer and certain ancestry patterns — but many patients have no known risk factor."),

  h2("Symptoms of triple-negative breast cancer"),
  p("Symptoms are generally similar to other breast cancers. See also [breast cancer symptoms](" + SYMPTOMS + ")."),
  { id: id("html"), type: "html", html: symptomTable },
  p("TNBC can be found on screening before a lump is felt. A lump is not always cancer, but new or persistent changes need medical assessment. TNBC may have a higher risk of early recurrence than some hormone-positive subtypes, yet individual outcomes vary widely."),

  h2("What causes triple-negative breast cancer?"),
  p("There is no single cause. Risk factors include inherited BRCA1/2 mutations, family history, younger age, prior breast cancer and other biological or environmental factors under study. Not every patient has a preventable risk factor."),

  h2("How is triple-negative breast cancer diagnosed?"),
  ol([
    "**Clinical breast examination** of both breasts, nipples, skin and underarm nodes",
    "**Imaging:** mammography, ultrasound, MRI when indicated, axillary ultrasound",
    "**Core biopsy** for cancer type, grade and pathology features",
    "**ER/PR/HER2 testing** — TNBC typically shows ER and PR less than 1% staining and HER2 IHC 0/1+ or IHC 2+ with negative ISH",
    "**Staging scans** as clinically indicated (CT, PET-CT, bone scan, MRI)",
    "**Genetic counselling/testing** for BRCA1/2 and other genes when indicated",
  ]),
  p("HER2-low is not the same as HER2-positive and may matter for certain antibody-drug conjugates in advanced disease. Full diagnostic flow: [diagnosis guide](" + DIAG + ")."),
  img("/uploads/articles/tnbc-biopsy-diagnosis.webp", "Woman in breast imaging consultation beside a circular diagram representing core biopsy and receptor pathology testing", "Biopsy with ER, PR and HER2 testing is required to confirm triple-negative disease."),
  btn("Request a second opinion on receptor and staging results", consult("TNBC Second Opinion")),

  h2("What are the stages of triple-negative breast cancer?"),
  { id: id("html"), type: "html", html: stageTable },
  p("Broader staging context sits on [breast cancer stages](" + STAGES + "). Some Stage 3 patients are treated with curative intent. Stage 4 is generally not considered curable with current standards, but treatment can control disease and maintain quality of life."),

  h2("Treatment options for triple-negative breast cancer"),
  p("A multidisciplinary team may include surgical, medical and radiation oncology plus radiology, pathology, genetics and supportive care. Overview:"),
  { id: id("html"), type: "html", html: treatTable },
  p("See also [breast cancer treatment options](" + OPTIONS + ") and [breast cancer treatment in India](" + TX_BREAST + ")."),

  h2("Chemotherapy for triple-negative breast cancer"),
  p("Chemotherapy is central because conventional hormone therapy does not work. It may be given before surgery ([neoadjuvant](" + TX_NEO + ")), after surgery, for locally advanced disease or for metastatic/recurrent disease."),
  ul([
    "Common medicines include doxorubicin, epirubicin, cyclophosphamide, paclitaxel, docetaxel, carboplatin, cisplatin, capecitabine and gemcitabine in selected settings",
    "Neoadjuvant therapy can shrink tumours, enable conservation in selected patients and show treatment response",
    "Cycle count is individual — often spanning months",
  ]),
  p("Side effects may include hair loss, nausea, fatigue, low blood counts, neuropathy and fertility effects. Detail: [chemotherapy for breast cancer](" + CHEMO_BLOG + "). GAF planning: [chemotherapy](" + CHEMO + ") **$1,500–$8,000+**; neoadjuvant/adjuvant sheets **$2,500–$10,000** each."),
  img("/uploads/articles/tnbc-chemo-immunotherapy.webp", "Woman receiving outpatient infusion therapy beside a circular diagram of chemotherapy and immunotherapy acting on cancer cells", "Selected TNBC plans combine chemotherapy with immunotherapy such as pembrolizumab."),

  h2("Immunotherapy for triple-negative breast cancer"),
  p("Pembrolizumab is a PD-1 checkpoint inhibitor used in selected TNBC settings. For eligible high-risk Stage II–III disease it may be given with chemotherapy before surgery and continued afterwards. For certain advanced cases it may be combined with chemotherapy when PD-L1 criteria (often CPS ≥10 in key settings) are met."),
  p("Immune-related side effects can affect skin, bowel, thyroid, liver or lungs — report new symptoms promptly. GAF planning for [immunotherapy](" + IMMUNO + ") is **$15,000–$45,000**. Pathway page: [immunotherapy in India](" + TX_IMMUNO + ")."),
  p("[WhatsApp GAF if you need help clarifying pembrolizumab eligibility before travel](" + wa("I need guidance on pembrolizumab eligibility and TNBC treatment planning in India.") + ")"),

  h2("Targeted treatment: PARP inhibitors and BRCA mutations"),
  p("Inherited BRCA1/2 mutations impair DNA repair. PARP inhibitors such as olaparib and talazoparib may help in selected early high-risk or advanced HER2-negative settings. BRCA testing can change medicine choice, platinum consideration and family counselling."),
  img("/uploads/articles/tnbc-brca-genetic-counseling.webp", "Woman in genetic counselling consultation beside a circular DNA diagram representing BRCA testing and DNA-repair pathways", "BRCA testing can identify patients who may benefit from PARP inhibitors and family risk counselling."),
  p("Named [targeted therapy](" + TARGETED + ") planning is **$8,000–$30,000**; [precision oncology](" + PRECISION + ") testing pathways are **$2,000–$7,000**. Related: [targeted therapy for breast cancer](" + TARGETED_BLOG + ")."),
  btn("Ask about BRCA testing and PARP-inhibitor planning", consult("TNBC BRCA Testing")),

  h2("Antibody-drug conjugates for advanced TNBC"),
  p("ADCs deliver chemotherapy via an antibody. Sacituzumab govitecan may be used in selected previously treated advanced TNBC. Trastuzumab deruxtecan may apply to selected HER2-low advanced cancers — HER2-low is not conventional HER2-positive. ADCs are not interchangeable and can cause serious toxicities including, with some agents, lung inflammation."),

  h2("Surgery for triple-negative breast cancer"),
  p("Options include [lumpectomy](" + LUMPECTOMY + ") (**$3,500–$8,000**), [mastectomy](" + MASTECTOMY + ") (**$4,500–$10,000**), [sentinel node biopsy](" + SLNB + ") and selected axillary clearance. Reconstruction ([breast reconstruction](" + RECON + ") **$6,000–$18,000**) may be immediate or delayed. Full guide: [breast cancer surgery in India](" + SURGERY + ")."),

  h2("Radiation therapy for TNBC"),
  p("Radiation is commonly used after conservation and for selected post-mastectomy or node-positive cases. Techniques may include 3D-CRT, IMRT, IGRT, VMAT and DIBH for selected left-sided plans. Guide: [radiation therapy](" + RAD_BLOG + "). GAF [EBRT](" + EBRT + ") planning is **$1,000–$6,000+**."),

  h2("Treatment of triple-negative breast cancer by stage"),
  { id: id("html"), type: "html", html: stagePlanTable },
  p("Stage 4 care focuses on control, symptoms and quality of life using chemotherapy, immunotherapy, PARP inhibitors, ADCs, focal radiation and supportive care as appropriate."),

  h2("What happens if cancer remains after chemotherapy?"),
  p("Pathological complete response (pCR) generally means no residual invasive cancer in breast and sampled nodes after neoadjuvant therapy — favourable but not a guarantee against recurrence. Residual disease may lead to additional chemotherapy, olaparib for eligible germline BRCA carriers, continuation of planned pembrolizumab, or other strategies after pathology review."),

  h2("Can triple-negative breast cancer come back?"),
  p("Recurrence risk is highest in the first few years and depends on stage, nodes, grade, treatment response and residual disease. Recurrence may be local, regional or distant. Report new lumps, persistent bone pain, unexplained weight loss, cough/breathlessness, severe headaches or abdominal swelling."),

  h2("What is the prognosis of triple-negative breast cancer?"),
  p("Prognosis varies widely. Early-stage disease with good response can have favourable outcomes; advanced disease is harder to control but newer medicines have expanded options. Avoid applying a single survival percentage to an individual case — discuss outlook with the treating oncologist."),

  h2("Side effects and supportive care during TNBC treatment"),
  ul([
    "Nutrition support for adequate protein, calories and fluids",
    "Gentle activity as blood counts and surgery allow",
    "Fertility preservation discussion before treatment for younger patients",
    "Psychological support for patients and caregivers",
  ]),
  p("There is no proven diet that cures TNBC."),

  h2("Triple-negative breast cancer treatment in India"),
  p("India offers multidisciplinary oncology care across [medical](" + MED_DOCS + "), [surgical](" + SURG_DOCS + ") and [radiation](" + RAD_DOCS + ") oncology. International patients from Tanzania, Kenya, Uganda, Ethiopia, Zambia, Iraq, Oman and other countries should prioritise breast pathology accuracy, biomarker/genetic testing, tumour-board coordination and follow-up arrangements — not brand name alone."),
  ul([
    "Bring biopsy/histopathology, ER/PR/HER2 (and ISH if done), imaging, prior treatment records, genetic reports and medicine lists",
    "Ask for a written plan and estimate before travel",
    "City filters: [Delhi NCR](" + DELHI + "), [Mumbai](" + MUMBAI + "), [Bengaluru](" + BLR + "), [Chennai](" + CHN + "), [Hyderabad](" + HYD + ")",
  ]),
  p("Practical sequencing: [international patient guide](" + INTL + ")."),
  btn("Start an international TNBC records review", consult("Breast Cancer Treatment in India")),

  h2("What is the cost of triple-negative breast cancer treatment in India?"),
  p("There is no single fixed price. Totals depend on stage, surgery, chemo cycles, immunotherapy, genetics, radiation, hospital and complications. Use named GAF planning ranges:"),
  { id: id("html"), type: "html", html: costTable },
  p("Immunotherapy can substantially increase totals when indicated — it is not required for every TNBC patient. Request an itemised estimate covering consultations, diagnostics, surgery, chemo administration, immunotherapy, radiation, genetic testing and follow-up. Wider context: [breast cancer treatment cost in India](" + COST_BLOG + ")."),
  btn("Request a written TNBC treatment estimate", consult("TNBC Treatment Cost Estimate")),

  h2("Can triple-negative breast cancer be prevented?"),
  p("There is no guaranteed prevention. Awareness of breast changes, risk-appropriate screening, family-history discussion, genetic counselling when indicated, healthy weight, activity and avoiding tobacco can help. BRCA carriers need specialist advice on surveillance and risk-reducing options."),

  h2("Frequently asked questions about triple-negative breast cancer"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Key takeaways"),
  ul([
    "TNBC lacks ER, PR and conventional HER2 overexpression",
    "Standard hormone therapy and conventional HER2 drugs are generally not useful",
    "Chemotherapy remains central; immunotherapy expands options for selected patients",
    "BRCA testing may open PARP-inhibitor pathways",
    "Surgery and radiation remain important in many early and locally advanced cases",
    "India offers multidisciplinary services — choose hospitals by required expertise",
  ]),
  p("A TNBC diagnosis should not be treated as a reason to lose hope. Treatment options have expanded, and a carefully planned approach based on stage, pathology and biomarkers can make a meaningful difference."),
  btn("Discuss the next TNBC treatment step with GAF Healthcare", consult("Triple-Negative Breast Cancer Treatment")),

  h2("Sources and references"),
  ol([
    "[National Cancer Institute — Triple-Negative Breast Cancer](https://www.cancer.gov/types/breast/treatment/triple-negative-breast-cancer)",
    "[American Cancer Society — Treatment of Triple-Negative Breast Cancer](https://www.cancer.org/cancer/types/breast-cancer/treatment/treatment-of-triple-negative.html)",
    "[ESMO Pan-Asian adapted Early Breast Cancer guidelines](https://doi.org/10.1016/j.esmoop.2024.102974)",
    "[NCCN Guidelines for Patients — Metastatic Breast Cancer](https://vicc.org/sites/default/files/2026-09/stage_iv_breast-patient.pdf)",
    "[ICMR Standard Treatment Workflows](https://www.icmr.gov.in/standard-treatment-workflows-stws)",
    "[NCI — BRCA Gene Changes](https://www.cancer.gov/about-cancer/causes-prevention/genetics/brca-fact-sheet)",
    "[ASCO Clinical Practice Guidelines](https://www.asco.org/guidelines)",
  ]),
  p("*This article is for general educational purposes and does not replace medical advice, diagnosis or treatment from a qualified oncologist. GAF cost figures are partner planning ranges, not fixed hospital quotations.*"),

  h2("Related Reading on GAF Healthcare"),
  ul(RELATED.map(([label, href]) => `[${label}](${href})`)),
];

const now = "2026-11-12T18:00:00.000Z";
const article = {
  id: "art_triple_negative_breast_cancer_treatment_india",
  slug: SLUG,
  title: "Triple-Negative Breast Cancer: Symptoms, Diagnosis, Treatment and Options Available in India",
  excerpt:
    "Triple-negative breast cancer (TNBC) is a type of breast cancer that does not have oestrogen receptors, progesterone receptors or excess HER2 protein. Although it can be aggressive, several effective treatments are available, including chemotherapy, immunotherapy and selected targeted medicines. This guide explains its symptoms, diagnosis, stages, treatment options and the possibilities for patients seeking breast cancer treatment in India.",
  date: "12 Nov 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare Editorial",
  category: "Medical Oncology",
  tags: [
    "breast cancer",
    "triple-negative breast cancer",
    "TNBC",
    "immunotherapy",
    "chemotherapy",
    "India",
    "cost",
  ],
  image: "/uploads/articles/tnbc-receptor-negative-overview.webp",
  imageAlt:
    "Woman in clinic consultation beside a circular diagram of a breast cancer cell lacking estrogen, progesterone and HER2 receptors",
  status: "published",
  featured: false,
  seoTitle: "Triple-Negative Breast Cancer: Symptoms, Treatment and Cost in India",
  seoDescription:
    "Understand triple-negative breast cancer (TNBC), its symptoms, diagnosis, stages, chemotherapy, immunotherapy, targeted treatments and treatment options in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/tnbc-receptor-negative-overview.webp",
  allowIndex: true,
  keywords: [
    "Triple-negative breast cancer treatment in India",
    "Triple-negative breast cancer symptoms",
    "TNBC diagnosis and treatment",
    "Triple-negative breast cancer chemotherapy",
    "Triple-negative breast cancer immunotherapy",
    "TNBC treatment cost in India",
    "Stage 2 triple-negative breast cancer treatment",
    "Stage 3 triple-negative breast cancer treatment",
    "Stage 4 triple-negative breast cancer treatment",
    "Pembrolizumab for triple-negative breast cancer",
    "BRCA testing for breast cancer",
    "Best treatment for triple-negative breast cancer",
  ],
  relatedLinks: RELATED.map(([label, href]) => ({ label, href })),
  blocks,
};

if (!store.categories.includes("Medical Oncology")) store.categories.push("Medical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["tnbc-receptor-negative-overview.webp", article.imageAlt],
  [
    "tnbc-biopsy-diagnosis.webp",
    "Woman in breast imaging consultation beside a circular diagram representing core biopsy and receptor pathology testing",
  ],
  [
    "tnbc-chemo-immunotherapy.webp",
    "Woman receiving outpatient infusion therapy beside a circular diagram of chemotherapy and immunotherapy acting on cancer cells",
  ],
  [
    "tnbc-brca-genetic-counseling.webp",
    "Woman in genetic counselling consultation beside a circular DNA diagram representing BRCA testing and DNA-repair pathways",
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
if (!llms.includes(SLUG)) {
  const needle =
    "and [breast cancer surgery in India](https://gaf.healthcare/blogs/breast-cancer-surgery-in-india).";
  if (llms.includes(needle)) {
    llms = llms.replace(
      needle,
      ", [breast cancer surgery in India](https://gaf.healthcare/blogs/breast-cancer-surgery-in-india) and [triple-negative breast cancer treatment in India](https://gaf.healthcare/blogs/triple-negative-breast-cancer-treatment-india).",
    );
  } else {
    llms = llms.replace(
      "- [Blogs](https://gaf.healthcare/blogs):",
      `- [Blogs](https://gaf.healthcare/blogs): includes [triple-negative breast cancer treatment in India](https://gaf.healthcare/blogs/triple-negative-breast-cancer-treatment-india).`,
    );
  }
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

for (const relatedSlug of [
  "er-pr-her2-breast-cancer-treatment-india",
  "breast-cancer-chemotherapy-in-india",
  "breast-cancer-surgery-in-india",
  "targeted-therapy-for-breast-cancer-in-india",
  "breast-cancer-treatment-cost-in-india",
]) {
  const related = store.articles.find((row) => row.slug === relatedSlug);
  if (!related) continue;
  const href = `/blogs/${SLUG}`;
  related.relatedLinks = related.relatedLinks || [];
  if (!related.relatedLinks.some((row) => row.href === href)) {
    related.relatedLinks.push({ label: "Triple-negative breast cancer treatment in India", href });
  }
  for (let i = 0; i < related.blocks.length; i++) {
    if (related.blocks[i].type === "heading" && /Related Reading/i.test(related.blocks[i].text || "")) {
      for (let j = i + 1; j < Math.min(i + 5, related.blocks.length); j++) {
        if (related.blocks[j].type === "list" && !related.blocks[j].items.some((item) => item.includes(href))) {
          related.blocks[j].items.push(`[Triple-Negative Breast Cancer Treatment in India](${href})`);
        }
      }
      break;
    }
  }
}
writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("linked from related breast articles");
