#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const SLUG = "her2-positive-breast-cancer-treatment-india";
const TARGETED = "/costs/India/Medical-Oncology/Targeted-Therapy";
const CHEMO = "/costs/India/Medical-Oncology/Chemotherapy";
const NEOADJ = "/costs/India/Medical-Oncology/Neoadjuvant-Chemotherapy";
const ADJ = "/costs/India/Medical-Oncology/Adjuvant-Chemotherapy";
const HORMONE = "/costs/India/Medical-Oncology/Hormone-Therapy";
const IMMUNO = "/costs/India/Medical-Oncology/Immunotherapy";
const PRECISION = "/costs/India/Medical-Oncology/Precision-Oncology";
const EBRT = "/costs/India/Radiation-Oncology/EBRT";
const LUMPECTOMY = "/costs/India/Surgical-Oncology/Lumpectomy";
const MASTECTOMY = "/costs/India/Surgical-Oncology/Mastectomy";
const RECON = "/costs/India/Surgical-Oncology/Breast-Reconstruction";
const SLNB = "/costs/India/Surgical-Oncology/Sentinel-Lymph-Node-Biopsy";
const TX_BREAST = "/treatments/breast-cancer-treatment-in-india";
const TX_TARGETED = "/treatments/targeted-therapy-in-india";
const TX_CHEMO = "/treatments/chemotherapy-in-india";
const TX_NEO = "/treatments/neoadjuvant-chemotherapy-in-india";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const CHEMO_BLOG = "/blogs/breast-cancer-chemotherapy-in-india";
const RAD_BLOG = "/blogs/breast-cancer-radiation-therapy-in-india";
const HT_BLOG = "/blogs/hormone-therapy-for-breast-cancer-in-india";
const TARGETED_BLOG = "/blogs/targeted-therapy-for-breast-cancer-in-india";
const TNBC = "/blogs/triple-negative-breast-cancer-treatment-india";
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

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>What is HER2-positive?</strong></td><td>Cancer with HER2 protein overexpression or gene amplification — see <a href="${ERPR}">ER/PR/HER2 results</a></td></tr><tr><td><strong>Key medicines</strong></td><td>Trastuzumab, pertuzumab, T-DM1, T-DXd, and selected oral HER2 TKIs</td></tr><tr><td><strong>Targeted therapy planning</strong></td><td><a href="${TARGETED}">$8,000–$30,000</a> · medicine and duration dependent</td></tr><tr><td><strong>Chemotherapy when combined</strong></td><td><a href="${CHEMO}">$1,500–$8,000+</a> · neoadjuvant/adjuvant sheets each <a href="${NEOADJ}">$2,500–$10,000</a></td></tr><tr><td><strong>If also hormone receptor-positive</strong></td><td>Add <a href="${HT_BLOG}">hormone therapy</a> · planning <a href="${HORMONE}">$1,000–$4,500</a></td></tr><tr><td><strong>Surgery & radiation</strong></td><td><a href="${SURGERY}">Surgery guide</a> · <a href="${RAD_BLOG}">radiation guide</a> · <a href="${EBRT}">EBRT $1,000–$6,000+</a></td></tr><tr><td><strong>Cardiac monitoring</strong></td><td>Echo/LVEF checks are important with trastuzumab ± pertuzumab</td></tr><tr><td><strong>Different from TNBC</strong></td><td>HER2-targeted drugs are central here — contrast <a href="${TNBC}">triple-negative guide</a></td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>HER2-positive breast cancer treatment in India</strong> centres on HER2-targeted medicines, often with chemotherapy, plus surgery and radiation when indicated. GAF figures are partner planning ranges, not hospital quotations.</p><p class="article-quick-answer__body"><strong>Important:</strong> Accurate HER2 testing (IHC ± ISH) is essential before choosing targeted therapy. GAF Healthcare does not prescribe cancer medicines.</p></aside>`;

const vsTnbc = `<div class="md-body"><table><thead><tr><th>Feature</th><th>HER2-positive</th><th>Triple-negative</th></tr></thead><tbody><tr><td>Oestrogen receptor</td><td>May be positive or negative</td><td>Negative</td></tr><tr><td>Progesterone receptor</td><td>May be positive or negative</td><td>Negative</td></tr><tr><td>HER2</td><td>Positive</td><td>Negative</td></tr><tr><td>Hormone therapy</td><td>Used if hormone receptor-positive</td><td>Generally not effective</td></tr><tr><td>HER2-targeted treatment</td><td>Important treatment option</td><td>Conventional HER2-targeted treatment not indicated</td></tr><tr><td>Chemotherapy</td><td>Frequently used</td><td>Frequently used</td></tr></tbody></table></div>`;

const symptomTable = `<div class="md-body"><table><thead><tr><th>Symptom</th><th>What a patient may notice</th></tr></thead><tbody><tr><td>Breast lump</td><td>A new lump or thickened area</td></tr><tr><td>Breast swelling</td><td>A change in breast size or shape</td></tr><tr><td>Skin dimpling</td><td>Skin that appears pulled inward</td></tr><tr><td>Nipple changes</td><td>New inversion or unusual discharge</td></tr><tr><td>Breast discomfort</td><td>Persistent pain or tenderness</td></tr><tr><td>Underarm lump</td><td>Enlarged lymph nodes</td></tr><tr><td>Skin changes</td><td>Redness, thickening or orange-peel appearance</td></tr></tbody></table></div>`;

const her2Results = `<div class="md-body"><table><thead><tr><th>HER2 test result</th><th>General interpretation</th></tr></thead><tbody><tr><td>IHC 0</td><td>HER2-negative</td></tr><tr><td>IHC 1+</td><td>HER2-negative; may be described as HER2-low in relevant contexts</td></tr><tr><td>IHC 2+</td><td>Equivocal — further ISH testing is generally required</td></tr><tr><td>IHC 3+</td><td>HER2-positive</td></tr><tr><td>IHC 2+ with positive ISH</td><td>HER2-positive</td></tr><tr><td>IHC 2+ with negative ISH</td><td>Generally HER2-negative</td></tr></tbody></table></div>`;

const stageTable = `<div class="md-body"><table><thead><tr><th>Stage</th><th>General meaning</th></tr></thead><tbody><tr><td>Stage 0</td><td>Non-invasive disease such as DCIS — not usually invasive HER2-positive disease</td></tr><tr><td>Stage 1</td><td>Small invasive cancer, limited or no node involvement</td></tr><tr><td>Stage 2</td><td>Larger tumour and/or limited nearby node involvement</td></tr><tr><td>Stage 3</td><td>Locally advanced disease involving more extensive nearby tissues or nodes</td></tr><tr><td>Stage 4</td><td>Distant organ spread</td></tr></tbody></table></div>`;

const treatTable = `<div class="md-body"><table><thead><tr><th>Treatment</th><th>Main purpose</th></tr></thead><tbody><tr><td>Chemotherapy</td><td>Destroy cancer cells or slow growth</td></tr><tr><td>Trastuzumab</td><td>Block HER2 signalling</td></tr><tr><td>Pertuzumab</td><td>Dual HER2 blockade via a different binding site</td></tr><tr><td>T-DM1</td><td>Antibody-drug conjugate for selected residual or advanced disease</td></tr><tr><td>T-DXd</td><td>Antibody-drug conjugate for selected advanced or evolving early settings</td></tr><tr><td>Surgery / radiation</td><td>Local control of breast and regional disease</td></tr><tr><td>Hormone therapy</td><td>Used when also ER-positive or PR-positive</td></tr></tbody></table></div>`;

const tchpTable = `<div class="md-body"><table><thead><tr><th>Letter</th><th>Medicine</th></tr></thead><tbody><tr><td>T</td><td>Docetaxel</td></tr><tr><td>C</td><td>Carboplatin</td></tr><tr><td>H</td><td>Trastuzumab</td></tr><tr><td>P</td><td>Pertuzumab</td></tr></tbody></table></div>`;

const stagePlan = `<div class="md-body"><table><thead><tr><th>Stage</th><th>Common treatment approach</th></tr></thead><tbody><tr><td>Stage 1</td><td>Surgery followed by selected chemotherapy and trastuzumab-based treatment</td></tr><tr><td>Stage 2</td><td>Often chemotherapy with trastuzumab ± pertuzumab before surgery</td></tr><tr><td>Stage 3</td><td>Usually neoadjuvant chemo and dual HER2 blockade, then surgery, radiation and further treatment</td></tr><tr><td>Stage 4</td><td>HER2-targeted systemic treatment ± chemotherapy and other medicines based on prior therapy</td></tr></tbody></table></div>`;

const sideFx = `<div class="md-body"><table><thead><tr><th>Treatment</th><th>Possible side effects</th></tr></thead><tbody><tr><td>Trastuzumab</td><td>Infusion reactions, fatigue, possible cardiac effects</td></tr><tr><td>Pertuzumab</td><td>Diarrhoea, rash, infusion reactions</td></tr><tr><td>T-DM1</td><td>Low platelets, liver enzyme changes, fatigue, neuropathy</td></tr><tr><td>T-DXd</td><td>Nausea, low blood counts, fatigue, possible lung inflammation</td></tr><tr><td>Tucatinib / neratinib / lapatinib</td><td>Diarrhoea and regimen-specific toxicities</td></tr><tr><td>Chemotherapy</td><td>Hair loss, nausea, infection risk, fatigue, neuropathy</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Named pathway</th><th>GAF planning range in India</th><th>Typical schedule / stay</th></tr></thead><tbody><tr><td><a href="${TARGETED}">Targeted therapy</a></td><td>$8,000–$30,000</td><td>Medicine and duration dependent</td></tr><tr><td><a href="${CHEMO}">Chemotherapy</a></td><td>$1,500–$8,000+</td><td>Outpatient cycles</td></tr><tr><td><a href="${NEOADJ}">Neoadjuvant chemotherapy</a></td><td>$2,500–$10,000</td><td>Cycles before surgery</td></tr><tr><td><a href="${ADJ}">Adjuvant chemotherapy</a></td><td>$2,500–$10,000</td><td>Cycles after surgery</td></tr><tr><td><a href="${HORMONE}">Hormone therapy</a></td><td>$1,000–$4,500</td><td>If also HR-positive · often years of tablets</td></tr><tr><td><a href="${PRECISION}">Precision oncology</a></td><td>$2,000–$7,000</td><td>Testing pathway planning</td></tr><tr><td><a href="${LUMPECTOMY}">Lumpectomy</a></td><td>$3,500–$8,000</td><td>About 1–3 nights</td></tr><tr><td><a href="${MASTECTOMY}">Mastectomy</a></td><td>$4,500–$10,000</td><td>About 3–6 nights</td></tr><tr><td><a href="${EBRT}">EBRT</a></td><td>$1,000–$6,000+</td><td>Often 15–35 sessions</td></tr><tr><td><a href="${IMMUNO}">Immunotherapy</a></td><td>$15,000–$45,000</td><td>Selected settings only — not the core HER2 pathway</td></tr></tbody></table></div>`;

const faqs = [
  ["Is HER2-positive breast cancer aggressive?", "It can grow more rapidly than some subtypes, but HER2-targeted medicines have substantially improved outcomes. Outlook depends on stage, response and other tumour features."],
  ["Can HER2-positive breast cancer be cured?", "Many early-stage patients can be treated with curative intent using chemotherapy, HER2-targeted medicines, surgery and radiation as indicated."],
  ["What is the best medicine for HER2-positive breast cancer?", "There is no single best medicine for everyone. Trastuzumab is a key treatment; pertuzumab, T-DM1, T-DXd and oral HER2 TKIs are used in specific settings."],
  ["Is trastuzumab necessary for every HER2-positive patient?", "It is important for many patients, but exact regimens depend on tumour size, stage, cardiac health and other clinical factors."],
  ["What is the difference between trastuzumab and pertuzumab?", "Both target HER2 but bind different receptor sites. Together they provide dual HER2 blockade, often with chemotherapy."],
  ["What is TCHP chemotherapy?", "TCHP combines docetaxel, carboplatin, trastuzumab and pertuzumab. It is commonly considered for selected higher-risk early-stage disease, often before surgery."],
  ["How long is trastuzumab treatment?", "In many early-stage pathways, HER2-targeted treatment is planned for about one year in total. Exact schedules vary."],
  ["Does trastuzumab affect the heart?", "It can affect heart function in some patients. Doctors usually check cardiac function before and during therapy."],
  ["What happens if cancer remains after TCHP?", "If residual invasive disease remains after neoadjuvant therapy and surgery, T-DM1 is an established option for many eligible patients; newer options may apply in selected cases."],
  ["What is the difference between T-DM1 and T-DXd?", "Both are antibody-drug conjugates targeting HER2, but they have different payloads, indications, dosing and side-effect profiles."],
  ["Can HER2-positive breast cancer spread to the brain?", "Yes. Brain metastases can occur in advanced disease. Local brain-directed therapy and selected systemic HER2 medicines may be used."],
  ["Can HER2-positive breast cancer also be hormone receptor-positive?", "Yes. These patients may benefit from both HER2-targeted treatment and hormone therapy."],
  ["Is HER2-low the same as HER2-positive?", "No. HER2-low generally means IHC 1+ or IHC 2+ with negative ISH. It is not conventionally HER2-positive, though some medicines have separate HER2-low indications."],
  ["Is HER2 testing available in India?", "Yes. Use validated IHC and appropriate ISH for equivocal results. Pathology review is essential."],
  ["Is treatment in India an option for international patients?", "Yes. India offers consultations, pathology review, chemotherapy, surgery, radiation and HER2-targeted treatment. Choose hospitals by required expertise and services."],
  ["Why is cardiac monitoring important?", "Trastuzumab and pertuzumab can reduce heart function in some patients. Echo/LVEF monitoring helps detect changes early."],
];

const RELATED = [
  ["Targeted therapy for breast cancer", TARGETED_BLOG],
  ["Targeted therapy in India", TX_TARGETED],
  ["ER, PR and HER2 results", ERPR],
  ["Triple-negative breast cancer treatment", TNBC],
  ["Breast cancer diagnosis tests", DIAG],
  ["Breast cancer symptoms", SYMPTOMS],
  ["Breast cancer stages", STAGES],
  ["Breast cancer treatment options", OPTIONS],
  ["Breast cancer surgery in India", SURGERY],
  ["Breast cancer chemotherapy in India", CHEMO_BLOG],
  ["Breast cancer radiation therapy in India", RAD_BLOG],
  ["Hormone therapy for breast cancer", HT_BLOG],
  ["Breast cancer treatment in India", TX_BREAST],
  ["Breast cancer treatment cost in India", COST_BLOG],
  ["International patients", INTL],
  ["Medical oncology doctors", MED_DOCS],
  ["Medical oncology hospitals", MED_HOSP],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("**HER2-positive breast cancer** is a subtype in which cancer cells have higher-than-normal HER2 protein or an increased number of HER2 gene copies. Although it can grow quickly, targeted medicines such as trastuzumab and pertuzumab have significantly improved treatment options."),
  p("This guide covers symptoms, diagnosis, stages, chemotherapy, targeted therapy, side effects and planning care in India. Related reading includes [ER/PR/HER2 results](" + ERPR + "), [targeted therapy for breast cancer](" + TARGETED_BLOG + "), [chemotherapy](" + CHEMO_BLOG + ") and [treatment cost](" + COST_BLOG + ")."),
  p("GAF planning for [targeted therapy](" + TARGETED + ") is **$8,000–$30,000**. Combined [chemotherapy](" + CHEMO + ") is **$1,500–$8,000+**. Filter [medical oncologists](" + MED_DOCS + ") and [hospitals](" + MED_HOSP + ") by city before travel."),
  btn("Ask GAF to review HER2 pathology and treatment records", consult("HER2-Positive Breast Cancer Treatment")),
  p("[WhatsApp +91 90443 46292 with HER2 IHC/ISH, ER/PR and imaging](" + wa("Please review my HER2-positive breast cancer reports and advise on targeted therapy options and cost in India.") + ")"),
  img("/uploads/articles/her2-positive-receptor-overview.webp", "Woman reviewing a breast cancer diagnosis beside a circular diagram of a cancer cell with excess HER2 receptors on the membrane", "HER2-positive cancers overexpress HER2 protein or amplify the HER2 gene."),

  h2("What is HER2-positive breast cancer?"),
  p("HER2 helps regulate cell growth. When the HER2 gene is amplified, cells produce excess HER2 protein and may grow more rapidly. HER2-positive disease accounts for roughly 15–20% of breast cancers."),
  p("Targeted medicines include trastuzumab, pertuzumab, T-DM1, T-DXd, tucatinib, neratinib and lapatinib. They may be combined with chemotherapy or other treatments depending on stage and diagnosis."),

  h2("What does HER2 actually do?"),
  p("Excess HER2 signalling can drive faster tumour growth, increased cell division and higher recurrence risk in some patients. HER2-targeted medicines interfere with this pathway or deliver cancer-killing treatment to HER2-expressing cells. Identifying HER2 status is therefore essential."),

  h2("Is HER2-positive the same as triple-negative breast cancer?"),
  { id: id("html"), type: "html", html: vsTnbc },
  p("Patients can be both HER2-positive and hormone receptor-positive (sometimes called triple-positive). They may need HER2-targeted treatment plus [hormone therapy](" + HT_BLOG + "). Contrast with [TNBC](" + TNBC + ")."),

  h2("Symptoms of HER2-positive breast cancer"),
  p("Symptoms are generally similar to other breast cancers — see [breast cancer symptoms](" + SYMPTOMS + "). Many cancers are painless early on."),
  { id: id("html"), type: "html", html: symptomTable },

  h2("What causes HER2-positive breast cancer?"),
  p("There is no single cause. HER2 positivity is a tumour biology finding, not something caused by a particular food or lifestyle choice. General risk factors include age, family history, prior breast cancer, selected inherited mutations and hormonal or environmental influences."),

  h2("How is HER2-positive breast cancer diagnosed?"),
  ol([
    "Clinical examination of breasts, nipples, skin and underarm nodes",
    "Imaging: mammography, ultrasound, MRI when indicated, axillary ultrasound",
    "Core needle biopsy for cancer type and grade",
    "HER2 testing by IHC and ISH when IHC is equivocal",
    "ER and PR testing for hormone therapy decisions",
    "Staging scans as clinically indicated",
  ]),
  { id: id("html"), type: "html", html: her2Results },
  p("IHC 2+ alone does not confirm HER2-positive disease — ISH matters. Full diagnostic flow: [diagnosis guide](" + DIAG + ")."),
  btn("Request a second opinion on equivocal HER2 results", consult("HER2 Testing Second Opinion")),

  h2("What are the stages of HER2-positive breast cancer?"),
  { id: id("html"), type: "html", html: stageTable },
  p("Broader staging context: [breast cancer stages](" + STAGES + "). Many Stage 2–3 patients are treated with curative intent. Stage 4 aims to control disease and maintain quality of life with HER2-directed systemic therapy."),

  h2("Treatment options for HER2-positive breast cancer"),
  { id: id("html"), type: "html", html: treatTable },
  p("See [breast cancer treatment options](" + OPTIONS + ") and [targeted therapy in India](" + TX_TARGETED + ")."),

  h2("Trastuzumab: a foundational HER2-targeted medicine"),
  p("Trastuzumab is a monoclonal antibody that blocks HER2 signalling and helps the immune system recognise cancer cells. It may be used before or after surgery, with chemotherapy, and in selected metastatic settings. Early-stage HER2-targeted courses are often planned around one year."),
  ul([
    "Given by IV infusion or subcutaneous injection where available",
    "Possible side effects: infusion reactions, fever/chills, fatigue, nausea, diarrhoea, reduced heart function",
    "Cardiac assessment (echo/LVEF) before and during therapy is important",
  ]),
  img("/uploads/articles/her2-positive-trastuzumab-targeting.webp", "Woman receiving targeted therapy infusion beside a circular diagram of antibodies binding HER2 receptors on a cancer cell", "Trastuzumab attaches to HER2 and interferes with cancer growth signals."),

  h2("Pertuzumab and dual HER2 blockade"),
  p("Pertuzumab binds a different HER2 site. Combined with trastuzumab and chemotherapy it provides dual blockade. A common neoadjuvant/higher-risk regimen is **TCHP**:"),
  { id: id("html"), type: "html", html: tchpTable },
  p("TCHP is often considered for selected Stage II–III cases but is not required for every patient. Side effects may include hair loss, nausea, diarrhoea, low counts, neuropathy and cardiac changes."),
  p("[WhatsApp GAF if you need help comparing TCHP versus other HER2 regimens before travel](" + wa("I need guidance on TCHP versus other HER2-positive breast cancer regimens and cost in India.") + ")"),

  h2("Trastuzumab emtansine (T-DM1)"),
  p("T-DM1 is an antibody-drug conjugate delivering emtansine to HER2-expressing cells. A key use is early-stage residual invasive disease after neoadjuvant chemo and HER2 therapy — commonly up to 14 cycles for eligible patients. It is also used in selected advanced settings. Monitor platelets, liver enzymes and neuropathy."),

  h2("Trastuzumab deruxtecan (T-DXd)"),
  p("T-DXd is a newer ADC with substantial benefit in selected advanced HER2-positive disease and evolving earlier-stage roles; separate indications exist for some HER2-low advanced cancers. Watch for interstitial lung disease — new cough, breathlessness or fever need urgent reporting."),
  img("/uploads/articles/her2-positive-adc-treatment.webp", "Woman discussing antibody-drug conjugate options beside a circular diagram of an ADC delivering chemotherapy into a HER2-expressing cancer cell", "Antibody-drug conjugates such as T-DM1 and T-DXd deliver chemotherapy through HER2 targeting."),
  btn("Ask about T-DM1 or T-DXd eligibility after residual disease", consult("HER2 ADC Treatment")),

  h2("Other HER2-targeted medicines"),
  ul([
    "**Tucatinib:** oral TKI used with trastuzumab and capecitabine in selected pretreated advanced disease, including some brain metastases",
    "**Neratinib:** oral TKI for selected extended adjuvant settings; diarrhoea needs proactive management",
    "**Lapatinib:** oral TKI in selected advanced combinations",
    "**Margetuximab:** HER2 antibody in selected advanced settings",
  ]),

  h2("Chemotherapy for HER2-positive breast cancer"),
  p("Chemotherapy is frequently combined with HER2 therapy. Examples include TCHP; AC then taxane with trastuzumab ± pertuzumab; or taxane plus trastuzumab for selected smaller node-negative tumours. Guides: [chemotherapy](" + CHEMO_BLOG + ") and [neoadjuvant chemotherapy](" + TX_NEO + "). GAF planning: chemo **$1,500–$8,000+**; neoadjuvant/adjuvant **$2,500–$10,000** each."),

  h2("Surgery for HER2-positive breast cancer"),
  p("Options include [lumpectomy](" + LUMPECTOMY + ") (**$3,500–$8,000**), [mastectomy](" + MASTECTOMY + ") (**$4,500–$10,000**), [sentinel node biopsy](" + SLNB + ") and selected axillary clearance. Reconstruction may be immediate or delayed. Full guide: [breast cancer surgery](" + SURGERY + ")."),

  h2("Radiation therapy for HER2-positive breast cancer"),
  p("Radiation is commonly used after conservation and for selected post-mastectomy or node-positive cases. Techniques may include 3D-CRT, IMRT, IGRT, VMAT and DIBH. Guide: [radiation therapy](" + RAD_BLOG + "). GAF [EBRT](" + EBRT + ") planning is **$1,000–$6,000+**."),

  h2("Hormone therapy when also ER/PR-positive"),
  p("Hormone therapy does not replace HER2-targeted treatment when HER2 therapy is indicated. Options may include tamoxifen, aromatase inhibitors, fulvestrant in selected advanced settings, and ovarian suppression for some premenopausal patients. GAF [hormone therapy](" + HORMONE + ") planning is **$1,000–$4,500**."),

  h2("Treatment by stage"),
  { id: id("html"), type: "html", html: stagePlan },

  h2("What if cancer remains after treatment before surgery?"),
  p("Pathological complete response (pCR) generally means no residual invasive cancer in breast and sampled nodes after neoadjuvant therapy. Residual disease often leads to T-DM1 for eligible patients; newer guidance may expand T-DXd in selected high-risk early settings."),

  h2("What if HER2-positive breast cancer spreads to the brain?"),
  p("Brain MRI is used when metastases are suspected. Local options include surgery, stereotactic radiosurgery or whole-brain radiation in selected cases, plus systemic HER2 medicines such as tucatinib combinations or T-DXd when appropriate."),

  h2("Can HER2-positive breast cancer come back?"),
  p("Recurrence risk depends on stage, nodes, grade, treatment response, residual disease and treatment completion. Report new lumps, persistent bone pain, unexplained weight loss, cough/breathlessness, severe headaches or neurological symptoms."),

  h2("Side effects and monitoring during HER2 treatment"),
  img("/uploads/articles/her2-positive-cardiac-monitoring.webp", "Woman undergoing echocardiography cardiac monitoring beside a circular diagram representing heart function assessment during HER2 therapy", "Cardiac monitoring is important during trastuzumab and pertuzumab treatment."),
  { id: id("html"), type: "html", html: sideFx },
  p("Do not stop treatment without speaking to the oncology team. New breathlessness, chest pain, severe diarrhoea or fever need prompt reporting."),

  h2("What is the prognosis of HER2-positive breast cancer?"),
  p("Outcomes have improved with HER2-targeted therapy. Early-stage disease is often treated with curative intent. Avoid applying a single survival percentage to an individual case — discuss outlook with the treating oncologist after full review."),

  h2("HER2-positive breast cancer treatment in India"),
  p("India offers surgical, medical and radiation oncology, HER2 pathology, cardiac monitoring and multidisciplinary tumour boards. International patients should prioritise validated HER2 testing, cardiac assessment capacity and follow-up arrangements."),
  ul([
    "Bring biopsy/histopathology, HER2 IHC and ISH, ER/PR, imaging, prior chemo/targeted records, surgery summaries, echo reports and medicine lists",
    "City filters: [Delhi NCR](" + DELHI + "), [Mumbai](" + MUMBAI + "), [Bengaluru](" + BLR + "), [Chennai](" + CHN + "), [Hyderabad](" + HYD + ")",
    "Practical sequencing: [international patient guide](" + INTL + ")",
  ]),
  btn("Start an international HER2 records review", consult("Breast Cancer Treatment in India")),

  h2("What is the cost of HER2-positive breast cancer treatment in India?"),
  p("Totals vary with stage, regimen and medicine duration. HER2-targeted drugs can dominate expense over many months. Use named GAF planning ranges — biosimilar trastuzumab availability may affect hospital quotations but must be confirmed with the treating team:"),
  { id: id("html"), type: "html", html: costTable },
  p("Request an itemised estimate covering consultations, pathology/HER2 testing, imaging, chemotherapy, HER2 medicines, surgery, radiation, cardiac monitoring and follow-up. Wider context: [breast cancer treatment cost](" + COST_BLOG + ")."),
  btn("Request a written HER2 treatment estimate", consult("HER2 Breast Cancer Cost Estimate")),

  h2("Can HER2-positive breast cancer be prevented?"),
  p("There is no guaranteed prevention. Breast awareness, risk-appropriate screening, family-history discussion, healthy weight, activity and avoiding tobacco help. Strong family history may warrant genetic counselling."),

  h2("Frequently asked questions about HER2-positive breast cancer"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Key takeaways"),
  ul([
    "HER2-positive disease is defined by HER2 overexpression or gene amplification",
    "It may occur with or without hormone receptor positivity",
    "Accurate HER2 testing is essential before choosing targeted therapy",
    "Trastuzumab is foundational; pertuzumab, T-DM1, T-DXd and oral TKIs expand options",
    "Cardiac monitoring matters during selected HER2 treatments",
    "India offers multidisciplinary diagnosis and treatment services for domestic and international patients",
  ]),
  p("HER2-positive breast cancer is not what it was two decades ago. Accurate testing, staging and a well-planned targeted strategy are essential."),
  btn("Discuss the next HER2 treatment step with GAF Healthcare", consult("HER2-Positive Breast Cancer Treatment")),

  h2("Sources and references"),
  ol([
    "[NCCN Guidelines for Patients — Invasive Breast Cancer](https://vicc.org/sites/default/files/2026-09/breast-invasive-patient.pdf)",
    "[NCCN Guidelines for Patients — Metastatic Breast Cancer](https://vicc.org/sites/default/files/2026-09/stage_iv_breast-patient.pdf)",
    "[ASCO — Systemic Therapy for Advanced HER2-Positive Breast Cancer](https://ascopubs.org/doi/10.1200/JCO.22.00519)",
    "[National Cancer Institute — Breast Cancer Treatment](https://www.cancer.gov/types/breast/treatment)",
    "[American Cancer Society — Types of Breast Cancer](https://www.cancer.org/cancer/types/breast-cancer/about/types-of-breast-cancer.html)",
    "[ICMR Standard Treatment Workflows](https://www.icmr.gov.in/standard-treatment-workflows-stws)",
    "[NCI — Targeted Cancer Therapies](https://www.cancer.gov/about-cancer/treatment/types/targeted-therapies)",
  ]),
  p("*This article is intended for general educational purposes. It does not replace a medical consultation, diagnosis or individualised treatment recommendation from a qualified oncologist. GAF cost figures are partner planning ranges, not fixed hospital quotations.*"),

  h2("Related Reading on GAF Healthcare"),
  ul(RELATED.map(([label, href]) => `[${label}](${href})`)),
];

const now = "2026-11-12T18:15:00.000Z";
const article = {
  id: "art_her2_positive_breast_cancer_treatment_india",
  slug: SLUG,
  title: "HER2-Positive Breast Cancer: Symptoms, Diagnosis, Treatment, Targeted Therapy and Cost in India",
  excerpt:
    "HER2-positive breast cancer is a subtype in which cancer cells have higher-than-normal levels of the HER2 protein or an increased number of HER2 gene copies. Although it can grow quickly, targeted medicines such as trastuzumab and pertuzumab have significantly improved treatment options. This guide explains symptoms, diagnosis, stages, chemotherapy, targeted therapy, side effects and treatment options available in India.",
  date: "12 Nov 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare Editorial",
  category: "Medical Oncology",
  tags: [
    "breast cancer",
    "HER2-positive",
    "trastuzumab",
    "targeted therapy",
    "pertuzumab",
    "India",
    "cost",
  ],
  image: "/uploads/articles/her2-positive-receptor-overview.webp",
  imageAlt:
    "Woman reviewing a breast cancer diagnosis beside a circular diagram of a cancer cell with excess HER2 receptors on the membrane",
  status: "published",
  featured: false,
  seoTitle: "HER2-Positive Breast Cancer Treatment in India: Targeted Therapy, Medicines and Cost",
  seoDescription:
    "Learn about HER2-positive breast cancer, its symptoms, diagnosis, stages, trastuzumab, pertuzumab, chemotherapy, targeted therapy, side effects and treatment cost in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/her2-positive-receptor-overview.webp",
  allowIndex: true,
  keywords: [
    "HER2-positive breast cancer treatment in India",
    "HER2-positive breast cancer symptoms",
    "HER2-positive breast cancer treatment",
    "HER2 breast cancer targeted therapy",
    "Trastuzumab treatment in India",
    "Pertuzumab treatment in India",
    "HER2-positive breast cancer chemotherapy",
    "HER2-positive breast cancer stages",
    "HER2-positive breast cancer survival",
    "Trastuzumab deruxtecan treatment",
    "T-DM1 treatment for breast cancer",
    "HER2-positive breast cancer cost in India",
    "Best hospital for HER2-positive breast cancer treatment in India",
  ],
  relatedLinks: RELATED.map(([label, href]) => ({ label, href })),
  blocks,
};

if (!store.categories.includes("Medical Oncology")) store.categories.push("Medical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["her2-positive-receptor-overview.webp", article.imageAlt],
  [
    "her2-positive-trastuzumab-targeting.webp",
    "Woman receiving targeted therapy infusion beside a circular diagram of antibodies binding HER2 receptors on a cancer cell",
  ],
  [
    "her2-positive-cardiac-monitoring.webp",
    "Woman undergoing echocardiography cardiac monitoring beside a circular diagram representing heart function assessment during HER2 therapy",
  ],
  [
    "her2-positive-adc-treatment.webp",
    "Woman discussing antibody-drug conjugate options beside a circular diagram of an ADC delivering chemotherapy into a HER2-expressing cancer cell",
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
if (!llms.includes(`blogs/${SLUG}`)) {
  const needle =
    "and [triple-negative breast cancer treatment in India](https://gaf.healthcare/blogs/triple-negative-breast-cancer-treatment-india).";
  if (llms.includes(needle)) {
    llms = llms.replace(
      needle,
      ", [triple-negative breast cancer treatment in India](https://gaf.healthcare/blogs/triple-negative-breast-cancer-treatment-india) and [HER2-positive breast cancer treatment in India](https://gaf.healthcare/blogs/her2-positive-breast-cancer-treatment-india).",
    );
  }
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
} else {
  console.log("llms.txt already references HER2 slug");
}

for (const relatedSlug of [
  "triple-negative-breast-cancer-treatment-india",
  "targeted-therapy-for-breast-cancer-in-india",
  "er-pr-her2-breast-cancer-treatment-india",
  "breast-cancer-chemotherapy-in-india",
  "breast-cancer-treatment-cost-in-india",
]) {
  const related = store.articles.find((row) => row.slug === relatedSlug);
  if (!related) continue;
  const href = `/blogs/${SLUG}`;
  related.relatedLinks = related.relatedLinks || [];
  if (!related.relatedLinks.some((row) => row.href === href)) {
    related.relatedLinks.push({ label: "HER2-positive breast cancer treatment in India", href });
  }
  for (let i = 0; i < related.blocks.length; i++) {
    if (related.blocks[i].type === "heading" && /Related Reading/i.test(related.blocks[i].text || "")) {
      for (let j = i + 1; j < Math.min(i + 5, related.blocks.length); j++) {
        if (related.blocks[j].type === "list" && !related.blocks[j].items.some((item) => item.includes(href))) {
          related.blocks[j].items.push(`[HER2-Positive Breast Cancer Treatment in India](${href})`);
        }
      }
      break;
    }
  }
}
writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("linked from related breast articles");
