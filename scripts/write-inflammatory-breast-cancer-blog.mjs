#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const SLUG = "inflammatory-breast-cancer-treatment-india";
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
const CHEMO_ALT = "/blogs/chemotherapy-for-breast-cancer-in-india";
const RAD_BLOG = "/blogs/breast-cancer-radiation-therapy-in-india";
const HT_BLOG = "/blogs/hormone-therapy-for-breast-cancer-in-india";
const TARGETED_BLOG = "/blogs/targeted-therapy-for-breast-cancer-in-india";
const HER2 = "/blogs/her2-positive-breast-cancer-treatment-india";
const TNBC = "/blogs/triple-negative-breast-cancer-treatment-india";
const ERPR = "/blogs/er-pr-her2-breast-cancer-treatment-india";
const DIAG = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const DIAG_ALT = "/blogs/breast-cancer-diagnosis";
const SYMPTOMS = "/blogs/breast-cancer-symptoms";
const STAGES = "/blogs/breast-cancer-stages";
const OPTIONS = "/blogs/breast-cancer-treatment-options";
const COST_BLOG = "/blogs/breast-cancer-treatment-cost-in-india";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const YOUNG = "/blogs/breast-cancer-in-young-women-treatment-india";
const PREG = "/blogs/breast-cancer-during-pregnancy-breastfeeding-treatment-india";
const LUMP = "/blogs/lumpectomy-vs-mastectomy";
const RECON_BLOG = "/blogs/breast-reconstruction-after-mastectomy-india";
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

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>What is IBC?</strong></td><td>A rare, aggressive invasive breast cancer where cancer cells block skin lymphatic vessels — redness, swelling, warmth, peau d’orange</td></tr><tr><td><strong>Lump?</strong></td><td>Often no distinct lump — skin changes may be the main clue</td></tr><tr><td><strong>Vs mastitis</strong></td><td>Can look similar; persistent symptoms need biopsy — not repeated antibiotics alone</td></tr><tr><td><strong>Stage at diagnosis</strong></td><td>Stage III or Stage IV — not Stage I/II</td></tr><tr><td><strong>Stage III sequence</strong></td><td>Neoadjuvant systemic therapy → mastectomy → radiation (+ biomarker-directed medicines)</td></tr><tr><td><strong>Surgery</strong></td><td>Modified radical mastectomy is usual; lumpectomy/skin-sparing generally not standard</td></tr><tr><td><strong>Planning ranges</strong></td><td><a href="${NEOADJ}">Neoadjuvant chemo</a> $2,500–$10,000 · <a href="${MASTECTOMY}">mastectomy</a> $4,500–$10,000 · <a href="${EBRT}">EBRT</a> $1,000–$6,000+</td></tr><tr><td><strong>India planning</strong></td><td>Multidisciplinary care — <a href="${TX_BREAST}">breast cancer treatment in India</a></td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>Inflammatory breast cancer treatment in India</strong> centres on prompt diagnosis and trimodality care for Stage III disease. GAF figures are partner planning ranges, not hospital quotations.</p></aside>`;

const symptomTable = `<div class="md-body"><table><thead><tr><th>Symptom</th><th>What it may look or feel like</th></tr></thead><tbody><tr><td>Breast redness</td><td>Pink, red, reddish-purple or bruised-looking skin</td></tr><tr><td>Swelling</td><td>One breast becomes noticeably larger</td></tr><tr><td>Skin thickening</td><td>Breast skin becomes thicker or firmer</td></tr><tr><td>Peau d’orange</td><td>Orange-peel dimpling of the skin</td></tr><tr><td>Breast warmth</td><td>Affected breast feels warmer than usual</td></tr><tr><td>Pain or tenderness</td><td>Persistent discomfort, burning or heaviness</td></tr><tr><td>Nipple changes</td><td>Flattened, inverted or unusually positioned nipple</td></tr><tr><td>Underarm / collarbone swelling</td><td>Enlarged regional lymph nodes</td></tr></tbody></table></div>`;

const mastitisTable = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Mastitis</th><th>Inflammatory breast cancer</th></tr></thead><tbody><tr><td>Main cause</td><td>Infection or inflammation</td><td>Cancer cells blocking skin lymphatic vessels</td></tr><tr><td>Redness / swelling / warmth</td><td>Common</td><td>Common</td></tr><tr><td>Fever</td><td>May occur</td><td>Not a defining feature</td></tr><tr><td>Distinct lump</td><td>May be present</td><td>Often no distinct lump</td></tr><tr><td>Antibiotics</td><td>Often help bacterial infection</td><td>Do not treat the underlying cancer</td></tr><tr><td>Diagnosis</td><td>Clinical ± imaging/culture</td><td>Imaging and tissue biopsy</td></tr></tbody></table></div>`;

const biomarkerTable = `<div class="md-body"><table><thead><tr><th>Test</th><th>Why it matters</th></tr></thead><tbody><tr><td>ER</td><td>Whether hormone therapy may help</td></tr><tr><td>PR</td><td>Additional hormone-sensitivity information</td></tr><tr><td>HER2</td><td>Eligibility for HER2-targeted treatment</td></tr><tr><td>Tumour grade</td><td>Cancer cell appearance and behaviour</td></tr><tr><td>Other biomarkers</td><td>May guide selected decisions (e.g. PD-L1, genetics)</td></tr></tbody></table></div>`;

const stageTable = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Stage III IBC</th><th>Stage IV IBC</th></tr></thead><tbody><tr><td>Breast involvement</td><td>Present</td><td>Present</td></tr><tr><td>Nearby lymph nodes</td><td>May be involved</td><td>May be involved</td></tr><tr><td>Distant organ spread</td><td>Not present</td><td>Present</td></tr><tr><td>Main approach</td><td>Systemic treatment, surgery and radiation</td><td>Systemic treatment; local therapy when appropriate</td></tr><tr><td>Objective</td><td>Often curative intent</td><td>Usually disease control and symptom management</td></tr></tbody></table></div>`;

const chemoTable = `<div class="md-body"><table><thead><tr><th>Medicine</th><th>Role</th></tr></thead><tbody><tr><td>Doxorubicin / Epirubicin</td><td>Anthracycline chemotherapy</td></tr><tr><td>Cyclophosphamide</td><td>Often combined with other medicines</td></tr><tr><td>Paclitaxel / Docetaxel</td><td>Taxane chemotherapy</td></tr><tr><td>Carboplatin</td><td>Platinum chemotherapy in selected cases</td></tr></tbody></table></div>`;

const hospitalTable = `<div class="md-body"><table><thead><tr><th>Specialist or facility</th><th>Why it matters</th></tr></thead><tbody><tr><td>Breast surgical oncologist</td><td>Mastectomy and lymph node surgery</td></tr><tr><td>Medical oncologist</td><td>Chemotherapy and systemic treatment</td></tr><tr><td>Radiation oncologist</td><td>Post-mastectomy radiation</td></tr><tr><td>Breast radiologist / pathologist</td><td>Imaging, tissue diagnosis and biomarkers</td></tr><tr><td>Multidisciplinary tumour board</td><td>Coordinated treatment planning</td></tr><tr><td>Reconstructive surgeon</td><td>Delayed reconstruction discussions</td></tr><tr><td>Physiotherapist</td><td>Shoulder mobility and lymphoedema care</td></tr><tr><td>International patient support</td><td>Coordination and travel assistance</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Named pathway</th><th>GAF planning range in India</th><th>Typical notes</th></tr></thead><tbody><tr><td><a href="${CHEMO}">Chemotherapy</a></td><td>$1,500–$8,000+</td><td>Outpatient cycles</td></tr><tr><td><a href="${NEOADJ}">Neoadjuvant chemotherapy</a></td><td>$2,500–$10,000</td><td>Usual first step in Stage III · 2–4 months</td></tr><tr><td><a href="${ADJ}">Adjuvant chemotherapy</a></td><td>$2,500–$10,000</td><td>Selected postoperative settings</td></tr><tr><td><a href="${TARGETED}">Targeted therapy</a></td><td>$8,000–$30,000</td><td>HER2-directed / other eligible drugs</td></tr><tr><td><a href="${IMMUNO}">Immunotherapy</a></td><td>$15,000–$45,000</td><td>Selected TNBC / eligible settings</td></tr><tr><td><a href="${HORMONE}">Hormone therapy</a></td><td>$1,000–$4,500</td><td>HR-positive disease after local therapy</td></tr><tr><td><a href="${PRECISION}">Precision oncology</a></td><td>$2,000–$7,000</td><td>Genomic / testing pathway planning</td></tr><tr><td><a href="${MASTECTOMY}">Mastectomy</a></td><td>$4,500–$10,000</td><td>Usual surgical approach for Stage III IBC</td></tr><tr><td><a href="${RECON}">Breast reconstruction</a></td><td>$6,000–$18,000</td><td>Usually delayed after radiation</td></tr><tr><td><a href="${EBRT}">EBRT</a></td><td>$1,000–$6,000+</td><td>Post-mastectomy chest wall ± nodes</td></tr></tbody></table></div>`;

const faqs = [
  ["Is inflammatory breast cancer a rare disease?", "Yes. It is a rare form of breast cancer, accounting for approximately 1–5% of breast cancer cases in the United States. Proportions may differ in other populations."],
  ["Is inflammatory breast cancer aggressive?", "Yes. IBC is considered an aggressive, fast-growing invasive breast cancer. Prompt diagnosis and treatment are important."],
  ["Does inflammatory breast cancer always cause a lump?", "No. Many patients do not have a clearly noticeable breast lump. Redness, swelling and skin changes may be the main symptoms."],
  ["Can inflammatory breast cancer look like mastitis?", "Yes. Both can cause redness, warmth and swelling. Persistent symptoms or failure to improve with appropriate infection treatment should prompt further assessment."],
  ["Is inflammatory breast cancer always Stage 3?", "No. It is diagnosed as Stage III or Stage IV. If cancer has spread to distant organs, it is Stage IV."],
  ["Can inflammatory breast cancer be cured?", "Some patients with Stage III IBC can be treated with curative intent. Stage IV disease is generally not considered curable, although treatment can help control it."],
  ["What is the first treatment for inflammatory breast cancer?", "For most patients with Stage III disease, treatment begins with systemic therapy — usually chemotherapy, with HER2-targeted medicines or immunotherapy when indicated — before surgery."],
  ["Is mastectomy necessary for inflammatory breast cancer?", "Mastectomy is generally the standard surgical approach for Stage III IBC. Breast-conserving surgery and skin-sparing mastectomy are generally not recommended."],
  ["Is radiation necessary after mastectomy?", "Radiation therapy is generally an important part of Stage III IBC care. It helps reduce recurrence risk in the chest wall and regional lymph nodes."],
  ["Can HER2-positive inflammatory breast cancer be treated?", "Yes. HER2-targeted medicines such as trastuzumab and pertuzumab may be used with chemotherapy in eligible patients."],
  ["Can triple-negative inflammatory breast cancer receive immunotherapy?", "Selected patients may be eligible for immunotherapy, depending on stage, treatment setting, biomarkers and clinical indications."],
  ["Can inflammatory breast cancer spread to the lungs or liver?", "Yes. Stage IV IBC may spread to the lungs, liver, bones, brain or other distant organs."],
  ["Can inflammatory breast cancer occur in younger women?", "Yes. It is often diagnosed at a younger age than many other breast cancer types, although it can occur at any age."],
  ["Is inflammatory breast cancer hereditary?", "Most cases are not directly inherited. Genetic counselling may still be appropriate with a strong family history or other testing criteria."],
  ["Is treatment available in India for international patients?", "Yes. India may offer diagnosis, chemotherapy, surgery, radiation and biomarker-directed treatment. Select hospitals by required expertise and facilities."],
];

const RELATED = [
  ["Breast cancer treatment in India", TX_BREAST],
  ["Breast cancer symptoms", SYMPTOMS],
  ["Breast cancer diagnosis", DIAG_ALT],
  ["Breast cancer diagnosis tests (ER/PR/HER2)", DIAG],
  ["Breast cancer stages", STAGES],
  ["Breast cancer treatment options", OPTIONS],
  ["Breast cancer surgery in India", SURGERY],
  ["Lumpectomy vs mastectomy", LUMP],
  ["Breast reconstruction after mastectomy", RECON_BLOG],
  ["Chemotherapy for breast cancer", CHEMO_ALT],
  ["Breast cancer chemotherapy in India", CHEMO_BLOG],
  ["Neoadjuvant chemotherapy in India", TX_NEO],
  ["Radiation therapy for breast cancer", RAD_BLOG],
  ["Hormone therapy for breast cancer", HT_BLOG],
  ["Targeted therapy for breast cancer", TARGETED_BLOG],
  ["HER2-positive breast cancer", HER2],
  ["Triple-negative breast cancer", TNBC],
  ["ER/PR/HER2 results explained", ERPR],
  ["Breast cancer in young women", YOUNG],
  ["Breast cancer during pregnancy and breastfeeding", PREG],
  ["Breast cancer treatment cost in India", COST_BLOG],
  ["International patients", INTL],
  ["Medical oncology doctors", MED_DOCS],
  ["Medical oncology hospitals", MED_HOSP],
];

const IMG1 = "/uploads/articles/ibc-overview-consultation.webp";
const IMG2 = "/uploads/articles/ibc-lymphatic-blockage-anatomy.webp";
const IMG3 = "/uploads/articles/ibc-biopsy-diagnosis.webp";
const IMG4 = "/uploads/articles/ibc-trimodality-treatment.webp";

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("**Inflammatory breast cancer (IBC)** is a rare and fast-growing form of breast cancer that can cause rapid breast swelling, redness, warmth and skin changes. It may resemble mastitis or a breast infection and often develops without a noticeable lump. This guide explains symptoms, diagnosis, stages, chemotherapy, surgery, radiation, targeted treatment and options for patients seeking [breast cancer treatment in India](" + TX_BREAST + ")."),
  p("Related reading: [symptoms](" + SYMPTOMS + "), [diagnosis](" + DIAG_ALT + "), [stages](" + STAGES + "), [HER2-positive disease](" + HER2 + "), [triple-negative disease](" + TNBC + "), [chemotherapy](" + CHEMO_BLOG + "), [surgery](" + SURGERY + ") and [treatment cost](" + COST_BLOG + ")."),
  btn("Ask GAF to review inflammatory breast cancer reports", consult("Inflammatory Breast Cancer Treatment")),
  p("[WhatsApp +91 90443 46292 with biopsy, imaging and staging](" + wa("Please review my inflammatory breast cancer reports and advise on treatment options and cost in India.") + ")"),
  img(IMG1, "Woman in oncology clinic consultation beside a circular breast anatomy diagram representing inflammatory breast cancer evaluation", "Rapid breast redness, swelling or skin thickening needs prompt assessment — do not assume it is only infection."),

  h2("What is inflammatory breast cancer?"),
  p("IBC is a rare and aggressive form of invasive breast cancer. Cancer cells block lymphatic vessels in the breast skin. When drainage is blocked, fluid accumulates and the breast may become red or pink, swollen, warm, tender, heavy and dimpled (peau d’orange)."),
  p("Unlike many breast cancers, IBC often does **not** produce a clearly noticeable lump — one reason recognition can be delayed. It accounts for roughly 1–5% of breast cancers in US data; proportions may differ elsewhere."),
  p("**Most important point:** Rapid breast redness, swelling and skin thickening should not automatically be treated as ordinary infection. If symptoms persist or do not respond as expected, urgent specialist assessment is needed."),

  h2("Why is it called inflammatory breast cancer?"),
  p("The name reflects appearance — redness, warmth and swelling that look like inflammation. The changes are caused by cancer cells blocking skin lymphatic channels, producing *peau d’orange* (orange-peel) thickening and pitting. The nipple may flatten or invert. Antibiotics alone cannot treat the underlying cancer."),
  img(IMG2, "Woman discussing diagnosis beside a circular diagram of breast skin lymphatic vessels blocked by cancer cells", "IBC develops when cancer cells obstruct lymphatic drainage in the breast skin."),

  h2("How common is inflammatory breast cancer?"),
  p("IBC is rare compared with other breast cancer types. It is often diagnosed younger than many other breast cancers, can occur in older women, and is possible (though much less common) in men. Because it can progress rapidly, it is frequently found at an advanced local stage."),

  h2("Symptoms of inflammatory breast cancer"),
  p("Symptoms often appear over weeks or a few months. See also [breast cancer symptoms](" + SYMPTOMS + ")."),
  { id: id("html"), type: "html", html: symptomTable },
  h3("Does inflammatory breast cancer cause a lump?"),
  p("Often, it does not. A normal lump examination does not rule out IBC."),
  h3("Does it affect the whole breast?"),
  p("It can involve a substantial area. One clinical feature used in diagnosis is redness and swelling involving at least one-third of the breast skin, alongside clinical history and biopsy confirmation."),
  h3("Can IBC occur without obvious redness?"),
  p("Yes. In darker skin tones, redness may be less obvious; swelling, warmth, thickening, a bruised look or size change may be clearer. Do not rely on redness alone."),

  h2("Is inflammatory breast cancer the same as mastitis?"),
  p("No. Mastitis is infection/inflammation — common in breastfeeding. IBC is invasive cancer. They can look similar."),
  { id: id("html"), type: "html", html: mastitisTable },
  p("If redness and swelling persist, worsen or fail to improve as expected, the diagnosis should be reconsidered. Repeated antibiotics without reassessment are not a substitute for investigating suspicious changes."),
  ul([
    "One breast becomes red and swollen rapidly",
    "Orange-peel skin appearance",
    "Noticeable short-term breast size change",
    "New nipple inversion",
    "Symptoms persist despite appropriate infection treatment",
    "New lump or underarm swelling",
  ]),

  h2("What causes inflammatory breast cancer?"),
  p("The exact cause is not fully understood. Like other breast cancers, abnormal cell changes disrupt growth controls; cells then spread into dermal lymphatics. Associated factors can include obesity, younger age relative to some other breast cancer groups, certain population patterns and general breast cancer risks — but many patients have no recognised risk factor. Most cases are not directly inherited; strong family history may still justify genetic counselling."),

  h2("How is inflammatory breast cancer diagnosed?"),
  p("Diagnosis needs prompt clinical assessment and tissue confirmation. Detail: [diagnosis guide](" + DIAG + ")."),
  ol([
    "**Clinical breast examination** — both breasts, skin, nipple/areola, underarm and collarbone nodes; symptom onset and speed",
    "**Mammography** — skin thickening, density, masses, calcifications; a normal/inconclusive mammogram does not rule out IBC",
    "**Breast ultrasound** — tissue changes, nodes, possible biopsy targets; helps distinguish abscess from other findings",
    "**Breast MRI** — selected cases for extent of disease",
    "**Core needle biopsy** — confirms invasive breast cancer",
    "**Skin punch biopsy** — may show dermal lymphatic invasion; absence of this finding does not automatically exclude IBC",
    "**Biomarker testing** — ER, PR, HER2 and other markers",
  ]),
  { id: id("html"), type: "html", html: biomarkerTable },
  img(IMG3, "Woman in breast imaging consultation beside a circular diagram representing core needle and skin punch biopsy for inflammatory breast cancer", "Tissue confirmation with biomarker testing is essential — IBC is not diagnosed by appearance alone."),
  btn("Request a second opinion on IBC imaging and biopsy", consult("Inflammatory Breast Cancer Second Opinion")),

  h2("Why is HER2 and hormone receptor testing important?"),
  p("IBC is not one biological subtype. Plans differ by biomarkers — see [ER/PR/HER2 explained](" + ERPR + ")."),
  ul([
    "**Hormone receptor-positive** — hormone therapy may follow the chemo–surgery–radiation sequence ([hormone therapy](" + HT_BLOG + "))",
    "**HER2-positive** — trastuzumab ± pertuzumab with chemotherapy in eligible settings ([HER2 guide](" + HER2 + "))",
    "**Triple-negative** — chemotherapy ± immunotherapy for selected patients ([TNBC guide](" + TNBC + "))",
  ]),

  h2("What are the stages of inflammatory breast cancer?"),
  p("IBC is classified as Stage III or Stage IV at diagnosis — not Stage I or II. Broader staging context: [breast cancer stages](" + STAGES + ")."),
  { id: id("html"), type: "html", html: stageTable },
  p("Stage III is locally advanced disease treated with systemic therapy before surgery, then surgery and radiation. Stage IV means distant spread (bones, lungs, liver, brain or other sites) and focuses on control and quality of life."),

  h2("Treatment options for inflammatory breast cancer"),
  p("Stage III care generally follows trimodality sequencing: systemic treatment before surgery → mastectomy with axillary surgery → radiation → additional medicines by biology and response. A multidisciplinary team should plan from the start. Overview: [treatment options](" + OPTIONS + ")."),
  img(IMG4, "Woman receiving outpatient systemic therapy beside a circular trimodality diagram of chemotherapy, mastectomy and radiation for inflammatory breast cancer", "Stage III IBC is usually treated with neoadjuvant systemic therapy, then mastectomy, then radiation."),

  h2("Chemotherapy before surgery (neoadjuvant chemotherapy)"),
  p("For Stage III IBC, chemotherapy is usually first. Neoadjuvant therapy can reduce swelling/redness, shrink disease, treat micrometastases, improve operability and show treatment response. Pathway: [neoadjuvant chemotherapy in India](" + TX_NEO + ")."),
  { id: id("html"), type: "html", html: chemoTable },
  p("A common approach is anthracycline-based therapy followed by a taxane; cycle count spans months and depends on subtype, stage, response, side effects and whether targeted therapy or immunotherapy is included. Guides: [chemotherapy for breast cancer](" + CHEMO_ALT + ") and [chemotherapy in India](" + CHEMO_BLOG + ")."),
  p("GAF planning: [chemotherapy](" + CHEMO + ") **$1,500–$8,000+**; [neoadjuvant](" + NEOADJ + ")/[adjuvant](" + ADJ + ") **$2,500–$10,000** each."),
  p("[WhatsApp GAF if you need help clarifying a neoadjuvant plan before travel](" + wa("I need guidance on neoadjuvant chemotherapy planning for inflammatory breast cancer in India.") + ")"),

  h2("Targeted therapy for HER2-positive inflammatory breast cancer"),
  p("HER2-positive IBC may use trastuzumab, pertuzumab, T-DM1 in selected postoperative settings, and other HER2-directed medicines when appropriate. Dual HER2 blockade (trastuzumab + pertuzumab) with chemotherapy — for example selected TCHP regimens — may be considered. Cardiac monitoring (echocardiography / LVEF) is important. Detail: [targeted therapy for breast cancer](" + TARGETED_BLOG + ") and [targeted therapy in India](" + TX_TARGETED + ")."),
  p("GAF [targeted therapy](" + TARGETED + ") planning is **$8,000–$30,000**."),
  btn("Ask about HER2-targeted planning for IBC", consult("HER2 Inflammatory Breast Cancer")),

  h2("Immunotherapy for inflammatory breast cancer"),
  p("Pembrolizumab and related checkpoint inhibitors may be considered for selected patients, especially triple-negative disease. Use depends on subtype, stage, indication and eligibility — not every IBC patient qualifies. Immune-related side effects can affect skin, bowel, thyroid, liver or lungs. Guide: [immunotherapy in India](" + TX_IMMUNO + "). GAF [immunotherapy](" + IMMUNO + ") planning is **$15,000–$45,000**."),

  h2("Surgery for inflammatory breast cancer"),
  p("After preoperative treatment, Stage III IBC usually proceeds to **modified radical mastectomy** (entire breast plus axillary nodes). Lumpectomy is generally not standard because disease often involves extensive skin and lymphatics. Skin-sparing and nipple-sparing mastectomy are generally inappropriate. Guide: [breast cancer surgery in India](" + SURGERY + "); comparison context: [lumpectomy vs mastectomy](" + LUMP + ")."),
  p("Immediate reconstruction is generally not preferred because extensive post-mastectomy radiation is usual. Delayed reconstruction may be discussed later with surgery, radiation and reconstructive teams ([reconstruction guide](" + RECON_BLOG + "))."),
  p("GAF planning: [mastectomy](" + MASTECTOMY + ") **$4,500–$10,000**; [reconstruction](" + RECON + ") **$6,000–$18,000** (usually delayed). Lumpectomy sheets exist for other pathways ([lumpectomy](" + LUMPECTOMY + ")) but are not the usual IBC operation."),

  h2("Radiation therapy after surgery"),
  p("Radiation is essential for many Stage III patients after mastectomy to reduce chest-wall and regional-node recurrence. Fields may include chest wall, regional nodes and at-risk lymphatic areas. Techniques may include 3D-CRT, IMRT, IGRT and VMAT. Guide: [radiation therapy](" + RAD_BLOG + "). GAF [EBRT](" + EBRT + ") planning is **$1,000–$6,000+**."),

  h2("What happens if cancer remains after chemotherapy?"),
  p("Pathology after neoadjuvant therapy checks for residual disease. Pathological complete response (pCR) means no residual invasive cancer in breast and sampled nodes — favourable in several subtypes, but not a guarantee against recurrence. Residual disease may lead to T-DM1 for selected HER2-positive patients, hormone therapy for HR-positive disease, further chemotherapy, or other strategies based on genetics and risk."),

  h2("Treatment of Stage IV inflammatory breast cancer"),
  p("Systemic therapy is the main focus: chemotherapy, hormone therapy, HER2-targeted treatment, immunotherapy, antibody-drug conjugates and other biomarker-directed medicines as eligible. Surgery is not routine primary therapy for all metastatic IBC but may help selected local complications. Radiation can help chest-wall symptoms, painful bone metastases, selected brain metastases, bleeding/ulcerating tumours and other local problems."),

  h2("Can inflammatory breast cancer come back?"),
  p("Yes — locally (chest wall/skin), regionally (nodes) or distantly (bones, lungs, liver, brain). Report new chest-wall redness/swelling, a new lump near the surgical area, persistent bone pain, unexplained weight loss, cough/breathlessness, severe headaches, unusual abdominal symptoms or new neurological changes."),

  h2("What is the prognosis of inflammatory breast cancer?"),
  p("IBC generally has a less favourable group prognosis than many breast cancers because it spreads rapidly and is diagnosed advanced. Individual outlook still varies widely with stage, metastases, HER2/HR status, grade, neoadjuvant response, ability to complete surgery/radiation/systemic therapy."),
  ul([
    "**Stage III** — some patients can be treated with curative intent using trimodality care",
    "**Stage IV** — generally not considered curable; treatment can control disease and improve quality of life",
    "Avoid applying a single survival percentage to an individual case",
  ]),

  h2("Supportive care during treatment"),
  ul([
    "Balanced nutrition with adequate protein, calories and fluids — no diet cures IBC",
    "Gentle activity and physiotherapy for shoulder mobility after surgery",
    "Lymphoedema awareness after axillary surgery and radiation — early specialist assessment helps",
    "Psycho-oncology, support groups and family involvement for emotional stress",
  ]),

  h2("Inflammatory breast cancer treatment in India"),
  p("Hospital selection should prioritise coordinated trimodality capability — not brand name alone. City filters: [Delhi NCR](" + DELHI + "), [Mumbai](" + MUMBAI + "), [Bengaluru](" + BLR + "), [Chennai](" + CHN + "), [Hyderabad](" + HYD + "). Also [medical](" + MED_DOCS + "), [surgical](" + SURG_DOCS + ") and [radiation](" + RAD_DOCS + ") oncology directories and [medical oncology hospitals](" + MED_HOSP + ")."),
  { id: id("html"), type: "html", html: hospitalTable },
  ol([
    "Core biopsy/histopathology and skin punch biopsy if performed",
    "ER/PR and HER2 IHC ± ISH/FISH",
    "Mammography, ultrasound, MRI and staging CT/PET-CT reports with imaging copies",
    "Previous chemotherapy, surgery and discharge summaries",
    "Current medicines and relevant medical history",
  ]),
  p("A second opinion may help when infection treatment failed, clinical–pathology mismatch exists, biomarkers are unclear, surgery was advised without preoperative systemic therapy, operability is uncertain, distant spread is present or disease has recurred — without unnecessarily delaying urgent care."),
  p("Practical sequencing: [international patient guide](" + INTL + "). GAF helps organise reports, consultations and hospital coordination; treating hospitals remain responsible for clinical care. Request a written plan and itemised estimate before travel."),
  btn("Start an international IBC records review", consult("Breast Cancer Treatment in India")),

  h2("What is the cost of inflammatory breast cancer treatment in India?"),
  p("There is no single fixed cost. Stage III care often spans months of systemic therapy, mastectomy, radiation and additional medicines; Stage IV pathways differ. Use named GAF planning ranges:"),
  { id: id("html"), type: "html", html: costTable },
  p("Request an itemised estimate separating diagnosis/staging, chemotherapy, surgery, radiation, targeted/immunotherapy medicines, hospitalisation, follow-up and possible extras — based on the proposed plan, not a generic package. Wider context: [breast cancer treatment cost in India](" + COST_BLOG + ")."),
  btn("Request a written IBC treatment estimate", consult("Inflammatory Breast Cancer Cost Estimate")),
  p("[WhatsApp +91 90443 46292 for a personalised estimate](" + wa("Please provide a personalised inflammatory breast cancer treatment estimate in India.") + ")"),

  h2("Can inflammatory breast cancer be prevented?"),
  p("There is no proven specific prevention method. Healthy weight, activity, avoiding tobacco, limiting alcohol, discussing family history, following risk-appropriate screening and seeking assessment for unusual breast changes remain important. Because IBC can arise between screening visits, awareness of sudden breast changes matters."),

  h2("Frequently asked questions about inflammatory breast cancer"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Key takeaways"),
  ul([
    "IBC is a rare, aggressive invasive breast cancer",
    "Rapid redness, swelling, warmth and skin thickening are key clues",
    "A distinct lump may be absent",
    "It can resemble mastitis — persistent symptoms need proper evaluation",
    "Diagnosis needs clinical assessment, imaging and tissue biopsy",
    "IBC is Stage III or Stage IV at diagnosis",
    "Stage III care usually uses neoadjuvant therapy, mastectomy and radiation",
    "Hormone therapy, HER2-targeted treatment or immunotherapy may be added by biomarkers",
    "India care should be planned by a multidisciplinary breast cancer team",
  ]),
  p("Do not ignore rapid breast redness, swelling or skin changes. Although infection can cause similar symptoms, persistent or unusual changes need prompt evaluation. Early recognition and coordinated treatment are essential."),
  btn("Discuss the next IBC treatment step with GAF Healthcare", consult("Inflammatory Breast Cancer Treatment")),

  h2("Recommended further reading"),
  ul(RELATED.map(([label, href]) => `[${label}](${href})`)),

  h2("Medical sources and references"),
  ol([
    "[NCCN Guidelines for Patients — Inflammatory Breast Cancer, 2026](https://vicc.org/sites/default/files/2026-09/inflammatory-breast-patient.pdf)",
    "[NCI — Inflammatory Breast Cancer](https://www.cancer.gov/types/breast/breast-cancer-types/inflammatory)",
    "[NCI — Treatment for Inflammatory Breast Cancer](https://www.cancer.gov/types/breast/treatment/inflammatory-breast-cancer)",
    "[ACS — Treating Inflammatory Breast Cancer](https://www.cancer.org/cancer/types/breast-cancer/treatment/treatment-of-inflammatory-breast-cancer.html)",
    "[ASCO — Neoadjuvant Therapy for Breast Cancer Guideline](https://ascopubs.org/doi/10.1200/JCO.20.03399)",
    "[Susan G. Komen — Inflammatory Breast Cancer](https://www.komen.org/breast-cancer/treatment/by-diagnosis/inflammatory-breast-cancer/)",
    "[ICMR — Standard Treatment Workflows](https://www.icmr.gov.in/standard-treatment-workflows-stws)",
    "[ACS — Breast Cancer Stages](https://www.cancer.org/cancer/types/breast-cancer/understanding-a-breast-cancer-diagnosis/stages-of-breast-cancer.html)",
    "[NCI — Breast Cancer Treatment](https://www.cancer.gov/types/breast/treatment)",
  ]),
  p("*This article is intended for general educational purposes and does not replace medical advice, diagnosis or an individualised treatment plan from a qualified oncology team. GAF cost figures are partner planning ranges, not fixed hospital quotations.*"),
];

const now = "2026-11-12T18:50:00.000Z";
const article = {
  id: "art_inflammatory_breast_cancer_treatment_india",
  slug: SLUG,
  title:
    "Inflammatory Breast Cancer: Symptoms, Diagnosis, Stages, Treatment and Options in India",
  excerpt:
    "Inflammatory breast cancer (IBC) is a rare and fast-growing form of breast cancer that can cause rapid breast swelling, redness, warmth and skin changes. It may resemble mastitis or a breast infection and often develops without a noticeable lump. This guide explains its symptoms, diagnosis, stages, chemotherapy, surgery, radiation, targeted treatment and options for patients seeking treatment in India.",
  date: "12 Nov 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare Editorial",
  category: "Medical Oncology",
  tags: [
    "breast cancer",
    "inflammatory breast cancer",
    "IBC",
    "mastectomy",
    "India",
    "cost",
  ],
  image: IMG1,
  imageAlt:
    "Woman in oncology clinic consultation beside a circular breast anatomy diagram representing inflammatory breast cancer evaluation",
  status: "published",
  featured: false,
  seoTitle: "Inflammatory Breast Cancer Treatment in India: Symptoms, Stages and Cost",
  seoDescription:
    "Learn about inflammatory breast cancer (IBC), its symptoms, diagnosis, staging, chemotherapy, mastectomy, radiation, targeted therapy and treatment options in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: IMG1,
  allowIndex: true,
  keywords: [
    "Inflammatory breast cancer treatment in India",
    "Inflammatory breast cancer symptoms",
    "Inflammatory breast cancer diagnosis",
    "Inflammatory breast cancer stages",
    "Inflammatory breast cancer treatment",
    "Redness and swelling of breast cancer",
    "Breast cancer that looks like mastitis",
    "Inflammatory breast cancer chemotherapy",
    "Inflammatory breast cancer surgery",
    "Inflammatory breast cancer survival",
    "Stage 3 inflammatory breast cancer treatment",
    "Stage 4 inflammatory breast cancer treatment",
    "Inflammatory breast cancer treatment cost in India",
    "Breast cancer treatment in India",
  ],
  relatedLinks: RELATED.map(([label, href]) => ({ label, href })),
  blocks,
};

if (!store.categories.includes("Medical Oncology")) store.categories.push("Medical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["ibc-overview-consultation.webp", article.imageAlt],
  [
    "ibc-lymphatic-blockage-anatomy.webp",
    "Woman discussing diagnosis beside a circular diagram of breast skin lymphatic vessels blocked by cancer cells",
  ],
  [
    "ibc-biopsy-diagnosis.webp",
    "Woman in breast imaging consultation beside a circular diagram representing core needle and skin punch biopsy for inflammatory breast cancer",
  ],
  [
    "ibc-trimodality-treatment.webp",
    "Woman receiving outpatient systemic therapy beside a circular trimodality diagram of chemotherapy, mastectomy and radiation for inflammatory breast cancer",
  ],
]) {
  const mediaId = `media_${file.replace(/[^a-z0-9]+/g, "_")}`;
  if (!store.media.some((row) => row.id === mediaId || row.url === `/uploads/articles/${file}`)) {
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
console.log("wrote", SLUG, "blocks", blocks.length, "faqs", faqs.length);

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(SLUG)) {
  const needle = "- [Blogs](https://gaf.healthcare/blogs):";
  if (llms.includes(needle)) {
    llms = llms.replace(
      needle,
      `- [Blogs](https://gaf.healthcare/blogs): includes [inflammatory breast cancer treatment in India](https://gaf.healthcare/blogs/${SLUG}).`,
    );
  } else {
    llms += `\n- [Inflammatory breast cancer treatment in India](https://gaf.healthcare/blogs/${SLUG})\n`;
  }
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
} else {
  console.log("llms.txt already lists slug");
}

for (const relatedSlug of [
  "triple-negative-breast-cancer-treatment-india",
  "her2-positive-breast-cancer-treatment-india",
  "breast-cancer-chemotherapy-in-india",
  "breast-cancer-surgery-in-india",
  "breast-cancer-in-young-women-treatment-india",
  "breast-cancer-during-pregnancy-breastfeeding-treatment-india",
  "breast-cancer-treatment-cost-in-india",
]) {
  const related = store.articles.find((row) => row.slug === relatedSlug);
  if (!related) continue;
  const href = `/blogs/${SLUG}`;
  related.relatedLinks = related.relatedLinks || [];
  if (!related.relatedLinks.some((row) => row.href === href)) {
    related.relatedLinks.push({ label: "Inflammatory breast cancer treatment in India", href });
  }
  for (let i = 0; i < related.blocks.length; i++) {
    if (related.blocks[i].type === "heading" && /Related Reading|Recommended further reading/i.test(related.blocks[i].text || "")) {
      for (let j = i + 1; j < Math.min(i + 5, related.blocks.length); j++) {
        if (related.blocks[j].type === "list" && !related.blocks[j].items.some((item) => item.includes(href))) {
          related.blocks[j].items.push(`[Inflammatory Breast Cancer Treatment in India](${href})`);
        }
      }
      break;
    }
  }
}
writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("linked from related breast articles");
