#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const SLUG = "breast-cancer-in-young-women-treatment-india";
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
const PREG = "/blogs/breast-cancer-during-pregnancy-treatment-india";
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

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>Can young women get breast cancer?</strong></td><td>Yes — including in the 20s and 30s. “Young breast cancer” is often used for diagnosis at or below 40.</td></tr><tr><td><strong>Common symptoms</strong></td><td>New lump, skin dimpling, nipple changes, underarm swelling — see <a href="${SYMPTOMS}">symptoms guide</a></td></tr><tr><td><strong>Is every lump cancer?</strong></td><td>No. Fibroadenomas and cysts are common, but persistent lumps need proper assessment.</td></tr><tr><td><strong>Diagnosis</strong></td><td>Triple assessment: exam, imaging (often ultrasound first) and biopsy — <a href="${DIAG}">diagnosis tests</a></td></tr><tr><td><strong>Genetics</strong></td><td>BRCA1/2 and related genes matter more often at young age; counselling before testing</td></tr><tr><td><strong>Fertility</strong></td><td>Discuss egg/embryo freezing before chemotherapy when future pregnancy matters</td></tr><tr><td><strong>Treatment</strong></td><td>Based on stage and biology (ER/PR/HER2), not age alone — <a href="${TX_BREAST}">treatment in India</a></td></tr><tr><td><strong>Planning ranges</strong></td><td><a href="${CHEMO}">Chemo</a> $1,500–$8,000+ · <a href="${LUMPECTOMY}">lumpectomy</a> $3,500–$8,000 · <a href="${MASTECTOMY}">mastectomy</a> $4,500–$10,000</td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>Breast cancer in young women</strong> needs care that addresses cancer biology plus fertility, pregnancy plans, genetic risk and long-term quality of life. GAF figures are partner planning ranges, not hospital quotations.</p></aside>`;

const symptomTable = `<div class="md-body"><table><thead><tr><th>Symptom</th><th>What to look for</th></tr></thead><tbody><tr><td>Breast lump</td><td>A new lump or thickened area</td></tr><tr><td>Breast swelling</td><td>Unusual change in breast size or shape</td></tr><tr><td>Skin dimpling</td><td>Skin that appears pulled inward</td></tr><tr><td>Nipple inversion</td><td>A nipple that newly turns inward</td></tr><tr><td>Nipple discharge</td><td>Particularly spontaneous or bloody discharge</td></tr><tr><td>Underarm lump</td><td>Swelling from enlarged lymph nodes</td></tr><tr><td>Skin changes</td><td>Redness, thickening or orange-peel appearance</td></tr><tr><td>Persistent discomfort</td><td>Localised pain or tenderness that does not settle</td></tr></tbody></table></div>`;

const geneTable = `<div class="md-body"><table><thead><tr><th>Gene</th><th>Why it matters</th></tr></thead><tbody><tr><td>BRCA1</td><td>Increased breast and ovarian cancer risk</td></tr><tr><td>BRCA2</td><td>Breast and other cancer risks</td></tr><tr><td>PALB2</td><td>Inherited breast cancer susceptibility</td></tr><tr><td>TP53</td><td>Li-Fraumeni syndrome and multiple cancer risks</td></tr><tr><td>CHEK2</td><td>Increased breast cancer susceptibility</td></tr><tr><td>ATM</td><td>Certain harmful variants raise breast cancer risk</td></tr></tbody></table></div>`;

const biomarkerTable = `<div class="md-body"><table><thead><tr><th>Test</th><th>Why it matters</th></tr></thead><tbody><tr><td>ER</td><td>Whether hormone therapy may help</td></tr><tr><td>PR</td><td>Additional hormone-sensitivity information</td></tr><tr><td>HER2</td><td>Eligibility for HER2-targeted treatment</td></tr><tr><td>Ki-67</td><td>Proliferation information in selected contexts</td></tr><tr><td>Genetic testing</td><td>Inherited mutations when indicated</td></tr></tbody></table></div>`;

const subtypeTable = `<div class="md-body"><table><thead><tr><th>Subtype</th><th>Characteristics</th><th>Common treatment considerations</th></tr></thead><tbody><tr><td>Hormone receptor-positive, HER2-negative</td><td>ER and/or PR positive, HER2 negative</td><td>Surgery, chemotherapy when indicated, hormone therapy</td></tr><tr><td>HER2-positive</td><td>HER2 overexpression or amplification</td><td>HER2-targeted medicines, chemotherapy and other treatments</td></tr><tr><td>Triple-negative</td><td>ER-, PR- and HER2-negative</td><td>Chemotherapy, immunotherapy in selected settings</td></tr></tbody></table></div>`;

const treatTable = `<div class="md-body"><table><thead><tr><th>Treatment</th><th>Purpose</th></tr></thead><tbody><tr><td>Surgery</td><td>Removes the tumour and, when needed, nearby nodes</td></tr><tr><td>Chemotherapy</td><td>Treats cancer cells throughout the body</td></tr><tr><td>Radiation therapy</td><td>Reduces local recurrence risk</td></tr><tr><td>Hormone therapy</td><td>Treats hormone receptor-positive disease</td></tr><tr><td>HER2-targeted therapy</td><td>Treats HER2-positive disease</td></tr><tr><td>Immunotherapy</td><td>Helps the immune system in selected settings</td></tr><tr><td>PARP inhibitors</td><td>Target DNA-repair weakness in eligible patients</td></tr></tbody></table></div>`;

const fertilityTable = `<div class="md-body"><table><thead><tr><th>Method</th><th>What it involves</th></tr></thead><tbody><tr><td>Egg freezing</td><td>Mature eggs collected and frozen for possible future use</td></tr><tr><td>Embryo freezing</td><td>Eggs fertilised with sperm; embryos frozen</td></tr><tr><td>Ovarian tissue freezing</td><td>Ovarian tissue removed and stored in selected cases</td></tr><tr><td>Ovarian suppression</td><td>GnRH agonists during chemotherapy as an added protective measure</td></tr></tbody></table></div>`;

const pregTreatTable = `<div class="md-body"><table><thead><tr><th>Treatment</th><th>General considerations</th></tr></thead><tbody><tr><td>Surgery</td><td>May be possible during pregnancy after specialist assessment</td></tr><tr><td>Chemotherapy</td><td>Certain regimens may be considered after the first trimester</td></tr><tr><td>Radiation therapy</td><td>Generally avoided during pregnancy; may follow delivery</td></tr><tr><td>Hormone therapy</td><td>Generally deferred until after delivery</td></tr><tr><td>HER2-targeted therapy</td><td>Trastuzumab generally contraindicated in pregnancy</td></tr><tr><td>Immunotherapy</td><td>Generally avoided because of potential fetal risks</td></tr></tbody></table></div>`;

const stageTable = `<div class="md-body"><table><thead><tr><th>Stage</th><th>General treatment approach</th></tr></thead><tbody><tr><td>Stage 1</td><td>Surgery, with chemotherapy, radiation or other systemic treatment when indicated</td></tr><tr><td>Stage 2</td><td>Surgery or treatment before surgery, depending on biology and size</td></tr><tr><td>Stage 3</td><td>Usually systemic treatment before surgery, then surgery and radiation</td></tr><tr><td>Stage 4</td><td>Systemic treatment by subtype and biomarkers, with symptom-directed care</td></tr></tbody></table></div>`;

const hospitalTable = `<div class="md-body"><table><thead><tr><th>Facility or specialist</th><th>Why it matters</th></tr></thead><tbody><tr><td>Breast surgical oncologist</td><td>Conservation and mastectomy planning</td></tr><tr><td>Medical oncologist</td><td>Chemotherapy and systemic treatment</td></tr><tr><td>Radiation oncologist</td><td>Post-operative or other indicated radiation</td></tr><tr><td>Breast radiologist / pathologist</td><td>Accurate imaging and biomarker classification</td></tr><tr><td>Genetic counsellor</td><td>Inherited risk assessment</td></tr><tr><td>Fertility specialist</td><td>Egg or embryo preservation before treatment</td></tr><tr><td>Plastic / reconstructive surgeon</td><td>Reconstruction options</td></tr><tr><td>Psycho-oncology support</td><td>Emotional and psychological care</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Named pathway</th><th>GAF planning range in India</th><th>Typical notes</th></tr></thead><tbody><tr><td><a href="${CHEMO}">Chemotherapy</a></td><td>$1,500–$8,000+</td><td>Outpatient cycles</td></tr><tr><td><a href="${NEOADJ}">Neoadjuvant chemotherapy</a></td><td>$2,500–$10,000</td><td>Before surgery · 2–4 months</td></tr><tr><td><a href="${ADJ}">Adjuvant chemotherapy</a></td><td>$2,500–$10,000</td><td>After surgery · 3–6 months</td></tr><tr><td><a href="${IMMUNO}">Immunotherapy</a></td><td>$15,000–$45,000</td><td>Selected TNBC / eligible settings</td></tr><tr><td><a href="${TARGETED}">Targeted therapy</a></td><td>$8,000–$30,000</td><td>HER2 / PARP / other eligible drugs</td></tr><tr><td><a href="${HORMONE}">Hormone therapy</a></td><td>$1,000–$4,500</td><td>HR-positive disease</td></tr><tr><td><a href="${PRECISION}">Precision oncology</a></td><td>$2,000–$7,000</td><td>Genomic / testing pathway planning</td></tr><tr><td><a href="${LUMPECTOMY}">Lumpectomy</a></td><td>$3,500–$8,000</td><td>About 1–3 nights</td></tr><tr><td><a href="${MASTECTOMY}">Mastectomy</a></td><td>$4,500–$10,000</td><td>About 3–6 nights</td></tr><tr><td><a href="${RECON}">Breast reconstruction</a></td><td>$6,000–$18,000</td><td>Immediate or delayed</td></tr><tr><td><a href="${EBRT}">EBRT</a></td><td>$1,000–$6,000+</td><td>Often 15–35 sessions</td></tr></tbody></table></div>`;

const faqs = [
  ["Can a 25-year-old woman get breast cancer?", "Yes. Breast cancer can occur in women in their 20s, although it is less common than in older age groups. A persistent or suspicious breast change should be medically assessed."],
  ["Is breast cancer common in women under 40 in India?", "Breast cancer is an important health concern among younger Indian women. The proportion of patients diagnosed before 40 is a recognised focus of Indian clinical guidance, including ISMPO young-breast-cancer recommendations."],
  ["Is a breast lump in a 20-year-old usually cancer?", "Most breast lumps in younger women are benign, including fibroadenomas and cysts. Examination and appropriate imaging are still important to identify suspicious findings."],
  ["What is the most common symptom of breast cancer in young women?", "A new breast lump is a common presentation. Other symptoms include skin dimpling, nipple changes, swelling and enlarged underarm lymph nodes."],
  ["Can breast cancer develop during pregnancy?", "Yes. Breast cancer can develop during pregnancy or after childbirth. Persistent breast changes should not be dismissed as normal pregnancy or breastfeeding changes. See our pregnancy guide."],
  ["Can a woman breastfeed after breast cancer treatment?", "Some women can breastfeed after treatment, depending on the surgery, remaining breast tissue and medicines. Breastfeeding may not be possible from the treated breast after certain procedures."],
  ["Does chemotherapy always cause infertility?", "No. The effect varies with age, medicines and treatment duration. Some women retain fertility; others experience reduced ovarian reserve or permanent ovarian failure."],
  ["Can eggs be frozen before chemotherapy?", "Yes. Egg freezing is an established fertility preservation option and should be discussed with oncology and fertility teams before cancer treatment begins."],
  ["Can a woman become pregnant after breast cancer?", "Yes. Many survivors can consider pregnancy after treatment. Timing depends on subtype, recurrence risk, treatment history and reproductive health."],
  ["Does pregnancy after breast cancer increase recurrence risk?", "Available evidence does not show that pregnancy automatically increases recurrence risk. Each patient's circumstances should be reviewed by the treating oncologist."],
  ["Is breast cancer hereditary?", "Some breast cancers are linked to inherited mutations such as BRCA1 and BRCA2. Most breast cancers, however, are not directly inherited."],
  ["Should every young woman with breast cancer undergo BRCA testing?", "Genetic counselling and testing should be discussed, particularly for younger diagnosis, relevant family history or tumour characteristics. Exact criteria depend on clinical guidelines."],
  ["Is mastectomy necessary for every young patient?", "No. Breast-conserving surgery may be appropriate for selected young women. The decision depends on tumour size, location, disease extent and other treatment needs."],
  ["Can breast cancer be cured in young women?", "Many women with early-stage breast cancer can be treated with the intention of cure. Outcome depends on stage, tumour biology and response to treatment."],
  ["Is treatment in India an option for young women from other countries?", "Yes. India may offer consultations, surgery, chemotherapy, radiation, targeted treatment and fertility-related coordination. Select the hospital according to clinical needs."],
  ["Should every woman under 40 have routine mammography?", "No. Routine screening for average-risk women under 40 differs from diagnostic testing for symptoms. A suspicious lump needs appropriate diagnostic evaluation regardless of age."],
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
  ["Radiation therapy for breast cancer", RAD_BLOG],
  ["Hormone therapy for breast cancer", HT_BLOG],
  ["Targeted therapy for breast cancer", TARGETED_BLOG],
  ["HER2-positive breast cancer", HER2],
  ["Triple-negative breast cancer", TNBC],
  ["ER/PR/HER2 results explained", ERPR],
  ["Breast cancer during pregnancy", PREG],
  ["Breast cancer treatment cost in India", COST_BLOG],
  ["International patients", INTL],
  ["Medical oncology doctors", MED_DOCS],
  ["Medical oncology hospitals", MED_HOSP],
];

const IMG1 = "/uploads/articles/young-women-breast-cancer-overview.webp";
const IMG2 = "/uploads/articles/young-women-breast-diagnosis-ultrasound.webp";
const IMG3 = "/uploads/articles/young-women-fertility-preservation.webp";
const IMG4 = "/uploads/articles/young-women-brca-genetic-counseling.webp";

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("Breast cancer can affect women in their 20s, 30s and early 40s. A diagnosis at a young age can bring additional concerns about fertility, pregnancy, family planning, body image and long-term health. This guide covers warning signs, risk factors, diagnosis, genetic testing, fertility preservation, treatment options and planning for [breast cancer treatment in India](" + TX_BREAST + ")."),
  p("Related reading: [symptoms](" + SYMPTOMS + "), [diagnosis tests](" + DIAG + "), [stages](" + STAGES + "), [surgery](" + SURGERY + "), [chemotherapy](" + CHEMO_BLOG + "), [hormone therapy](" + HT_BLOG + "), [HER2-positive disease](" + HER2 + "), [triple-negative disease](" + TNBC + ") and [treatment cost](" + COST_BLOG + ")."),
  btn("Ask GAF about treatment and fertility before you start", consult("Breast Cancer Treatment in India")),
  p("[WhatsApp +91 90443 46292 with your records](" + wa("Please review my records and advise on breast cancer treatment and fertility preservation in India for a young woman.") + ")"),
  img(IMG1, "Young woman in clinic consultation beside a circular breast anatomy diagram suggesting early breast cancer evaluation", "A persistent breast change in a young woman needs proper assessment — age alone does not rule out cancer."),

  h2("Can young women get breast cancer?"),
  p("Yes. Breast cancer can develop at any age, including in women in their 20s and 30s. Although it is more common in older women, younger women are also affected. In India, breast cancer is frequently diagnosed at younger ages compared with several Western populations."),
  p("Doctors commonly use *young breast cancer* for women diagnosed at or below 40 years of age; some discussions extend this to age 45 or younger. A diagnosis at this stage of life can be particularly challenging because many women are still planning careers, marriages, pregnancies and families."),
  ul([
    "Whether they can have children after treatment",
    "Whether chemotherapy will affect their periods",
    "Whether breast surgery will affect appearance",
    "Whether cancer is hereditary",
    "Whether sisters or daughters may also be at risk",
    "Whether they can breastfeed after treatment",
    "Whether they can return to work and normal family life",
  ]),
  p("**Important:** A breast lump in a young woman should not automatically be dismissed as a harmless hormonal change or cyst. Most lumps are benign, but a persistent or suspicious lump needs proper medical assessment."),

  h2("Why is breast cancer in young women a special concern in India?"),
  p("A meaningful proportion of Indian patients are diagnosed before 40. The Indian Society of Medical and Paediatric Oncology (ISMPO) has published guidance specifically addressing breast cancer in young women."),
  ul([
    "Dense breast tissue can make some imaging findings harder to interpret",
    "Symptoms may first be attributed to hormonal changes or breastfeeding",
    "Some patients delay care because they believe they are too young for cancer",
    "Hereditary risk may be more relevant in selected patients",
    "Treatment decisions may need to account for future fertility and pregnancy",
    "Emotional, social and financial impact may affect the entire family",
  ]),
  p("Young age alone does not mean a patient needs more aggressive treatment. The plan should be based on tumour stage, biology, genetic findings, general health and patient preferences."),

  h2("What are the symptoms of breast cancer in young women?"),
  p("Symptoms are broadly similar to those in older women, but dense tissue can make a new lump easier to mistake for a cyst or hormonal change. Overview: [breast cancer symptoms](" + SYMPTOMS + ")."),
  { id: id("html"), type: "html", html: symptomTable },
  h3("Is a breast lump in a young woman usually cancer?"),
  p("No. Common non-cancerous causes include fibroadenoma, cysts, fibrocystic changes, hormonal changes, inflammation or infection, and pregnancy/breastfeeding-related changes. It is not possible to reliably distinguish every benign lump from cancer by touch alone — imaging and, if needed, biopsy are used."),
  h3("Can breast cancer occur without a lump?"),
  p("Yes. Some cancers present with skin or nipple changes or abnormal imaging without a clearly felt lump. A new persistent breast change should be assessed even without an obvious lump."),

  h2("What causes breast cancer in young women?"),
  p("There is no single cause. Breast cancer develops when genetic changes in breast cells disrupt normal growth controls. Some changes occur during life; others may be inherited."),
  h3("Important risk factors"),
  ol([
    "**Inherited genetic mutations** — BRCA1, BRCA2, PALB2, TP53, CHEK2, ATM and others; a genetic counsellor should interpret results",
    "**Family history** — especially young-onset breast cancer, multiple relatives, ovarian cancer, male breast cancer or a known family mutation",
    "**Previous chest radiation** at a young age for certain cancers",
    "**Personal history of atypical breast disease**",
    "**Hormonal and reproductive factors** — influence risk but do not determine individual outcomes",
    "**Lifestyle and environmental influences** — contribution varies across individuals",
  ]),
  p("Most breast cancers are **not** caused by an inherited mutation. A woman can develop breast cancer with no family history, and family history does not make cancer inevitable."),

  h2("Is breast cancer in young women more aggressive?"),
  p("Some studies find higher-risk features more often in younger patients — higher grade, [triple-negative](" + TNBC + "), [HER2-positive](" + HER2 + ") disease, aggressive molecular subtypes, or inherited predisposition mutations. Not every young woman has an aggressive tumour."),
  p("Tumour biology matters more than age alone. **A young patient should not receive more intensive treatment simply because she is young.** Treatment must be justified by the cancer’s characteristics and expected benefits."),

  h2("How is breast cancer diagnosed in young women?"),
  p("Diagnosis generally uses *triple assessment*: clinical examination, breast imaging and tissue diagnosis through biopsy when indicated. Detail: [diagnosis guide](" + DIAG + ") and [breast cancer diagnosis](" + DIAG_ALT + ")."),
  ol([
    "**Clinical breast examination** — lump size/location, skin and nipple changes, underarm nodes, medical and family history",
    "**Breast ultrasound** — often a first imaging test under 30; helps distinguish solid vs fluid-filled lesions",
    "**Mammography** — diagnostic mammography as clinically indicated; dense tissue can reduce sensitivity, so ultrasound is often combined",
    "**Breast MRI** — selected high-risk, hereditary, extent-of-disease or inconclusive cases; not needed for every patient",
    "**Core needle biopsy** — confirms cancer type, grade and invasive vs non-invasive disease",
    "**Receptor and biomarker testing** — ER, PR, HER2 and selected other markers",
  ]),
  { id: id("html"), type: "html", html: biomarkerTable },
  img(IMG2, "Young woman undergoing breast ultrasound beside a circular diagram of ultrasound assessment of breast tissue", "Ultrasound is often an important first imaging test for younger women with a breast lump."),
  btn("Request a second opinion on imaging and biopsy reports", consult("Breast Cancer Diagnosis Second Opinion")),

  h2("Why is genetic testing important for young women?"),
  p("Genetic testing can be particularly relevant when breast cancer is diagnosed at a young age. Inherited mutations may influence treatment, future risk and family counselling."),
  { id: id("html"), type: "html", html: geneTable },
  ul([
    "Diagnosed at a young age",
    "Triple-negative breast cancer",
    "Strong family history of breast or ovarian cancer",
    "Relatives with unusually young-onset breast cancer",
    "Known inherited mutation in the family",
    "Personal or family history suggesting a hereditary syndrome",
  ]),
  p("A positive BRCA result may influence PARP-inhibitor eligibility, contralateral risk discussion, ovarian risk management and relative testing. It does **not** mean every preventive surgery is mandatory — decisions are individualised."),
  img(IMG4, "Young woman in genetic counselling beside a circular DNA helix representing BRCA hereditary risk assessment", "BRCA and related gene testing can change treatment and family risk discussions for selected young patients."),
  p("GAF [precision oncology](" + PRECISION + ") planning ranges are **$2,000–$7,000**; eligible [targeted therapy](" + TARGETED + ") planning is **$8,000–$30,000**."),
  btn("Ask about BRCA testing and treatment planning", consult("BRCA Testing Breast Cancer")),

  h2("What are the different types of breast cancer in young women?"),
  p("Breast cancer is classified by tissue type, hormone receptors, HER2 status and other pathology features — not by age alone. See [ER/PR/HER2 explained](" + ERPR + ")."),
  { id: id("html"), type: "html", html: subtypeTable },
  p("Two women of the same age can need completely different plans — hormone therapy for years versus chemotherapy plus HER2-targeted medicines."),

  h2("How is breast cancer in young women treated?"),
  p("Treatment depends on stage, tumour size, nodes, ER/PR/HER2, genetics, general health and fertility/pregnancy preferences. The team may include breast surgery, medical oncology, radiation oncology, radiology, pathology and fertility specialists."),
  { id: id("html"), type: "html", html: treatTable },
  p("Not every patient needs every treatment. Pathway overview: [breast cancer treatment options](" + OPTIONS + ") and [treatment in India](" + TX_BREAST + ")."),

  h2("Breast cancer surgery in young women"),
  p("Surgery is important for many early-stage patients. Choice depends on tumour, breast size, disease extent, response to preoperative treatment and preference. Guide: [breast cancer surgery in India](" + SURGERY + "); comparison: [lumpectomy vs mastectomy](" + LUMP + ")."),
  ul([
    "**Breast-conserving surgery (lumpectomy)** — removes tumour with a margin; radiation usually follows",
    "**Mastectomy** — removes the entire breast when conservation is unsuitable or preferred after counselling",
    "**Young age alone is not a reason for mastectomy** — conservation may be appropriate when cancer can be removed safely",
    "**Reconstruction** — implant-based or autologous, immediate or delayed; see [reconstruction guide](" + RECON_BLOG + ")",
    "**Opposite breast** — risk-reducing surgery is considered mainly with inherited mutations; not routine for every patient",
  ]),
  p("GAF planning: [lumpectomy](" + LUMPECTOMY + ") **$3,500–$8,000**; [mastectomy](" + MASTECTOMY + ") **$4,500–$10,000**; [reconstruction](" + RECON + ") **$6,000–$18,000**; [sentinel node biopsy](" + SLNB + ") as indicated."),

  h2("Chemotherapy and its impact on young women"),
  p("Chemotherapy may be given before or after surgery according to subtype, stage and recurrence risk. Some medicines affect the ovaries and may cause temporary period changes, reduced ovarian reserve, premature ovarian insufficiency or difficulty conceiving. Risk depends on drugs, doses, duration and age."),
  p("Chemotherapy can cause permanent infertility in some patients — but not all. Return of periods does not guarantee unchanged ovarian reserve. Detail: [chemotherapy for breast cancer](" + CHEMO_ALT + ") and [chemotherapy in India](" + CHEMO_BLOG + "). GAF [chemotherapy](" + CHEMO + ") planning is **$1,500–$8,000+**; neoadjuvant/adjuvant sheets **$2,500–$10,000** each."),
  p("[WhatsApp GAF if you need help coordinating oncology and fertility timing](" + wa("I need help coordinating breast cancer treatment timing with fertility preservation in India.") + ")"),

  h2("Fertility preservation before breast cancer treatment"),
  p("For a young woman who hopes to have children, fertility preservation should be discussed **before** chemotherapy or other fertility-affecting treatment. The 2025 ASCO fertility preservation guideline recommends discussing reproductive risks and options before cancer-directed treatment."),
  { id: id("html"), type: "html", html: fertilityTable },
  ul([
    "**Egg freezing** — option for women without a partner or who prefer not to freeze embryos",
    "**Embryo freezing** — eggs fertilised then frozen when that pathway is chosen",
    "**Ovarian tissue freezing** — selected patients who cannot delay for stimulation",
    "**Ovarian suppression (GnRHa)** — additional measure during chemotherapy; should not replace egg/embryo freezing when those are appropriate",
  ]),
  img(IMG3, "Young woman in fertility counselling beside a circular diagram of oocyte cryopreservation and ovarian tissue concepts", "Fertility preservation should be discussed early — before chemotherapy when future pregnancy matters."),
  p("Any delay for fertility preservation must be decided jointly by the oncologist and fertility specialist. **Patients should never postpone cancer treatment independently to pursue fertility preservation.**"),
  btn("Ask GAF to coordinate fertility discussion before treatment", consult("Breast Cancer Fertility Preservation")),

  h2("Can a woman become pregnant after breast cancer?"),
  p("Yes. Some women successfully conceive after treatment. Timing depends on subtype, stage, treatments received, recurrence risk, hormone therapy requirements, age/ovarian reserve and overall health."),
  p("For selected hormone receptor-positive patients, temporary interruption of endocrine therapy to attempt pregnancy may be discussed — never without specialist supervision. Available evidence suggests pregnancy after breast cancer does not automatically increase recurrence risk, but evidence is not identical for every subtype."),

  h2("What if breast cancer is diagnosed during pregnancy?"),
  p("Pregnancy-associated breast cancer needs coordinated oncology and obstetric/maternal-fetal care. Full guide: [breast cancer during pregnancy](" + PREG + ")."),
  { id: id("html"), type: "html", html: pregTreatTable },
  p("Certain chemotherapy may be considered in the second and third trimesters; it is generally avoided in the first trimester. Breastfeeding is generally not recommended while receiving chemotherapy, endocrine therapy or many targeted medicines."),

  h2("Breast cancer and breastfeeding"),
  p("Breast changes during pregnancy and breastfeeding can hide a suspicious lump. Seek assessment for a lump that does not resolve, persistent swelling, skin dimpling, new nipple inversion, bloody discharge, recurrent same-area inflammation, or any suspicious change that does not improve with appropriate treatment. Do not delay evaluation because you are pregnant or breastfeeding."),

  h2("Treatment of breast cancer by stage in young women"),
  { id: id("html"), type: "html", html: stageTable },
  p("Broader staging context: [breast cancer stages](" + STAGES + "). Stage and biology together drive the plan — not age alone."),

  h2("How treatment affects periods and menopause"),
  p("Chemotherapy and certain hormone treatments can affect ovarian function. Possible symptoms include irregular or absent periods, hot flashes, night sweats, vaginal dryness, reduced sexual desire, sleep disturbance, mood changes and reduced bone density."),
  p("Periods can return after chemotherapy in some patients, but return of menses does not guarantee normal fertility. Ovarian reserve tests such as AMH and antral follicle count provide information but cannot guarantee pregnancy."),

  h2("Sexual health, body image and emotional wellbeing"),
  p("For younger women, treatment may affect breast appearance, sexual desire, menstrual health, vaginal comfort, fertility, relationships and confidence. Support may include psychological counselling, sexual health consultation, reconstruction discussion, physiotherapy, support groups, fertility counselling and partner/family counselling. These concerns are part of cancer care — not optional afterthoughts."),

  h2("Nutrition and lifestyle during treatment"),
  ul([
    "Eat adequate protein; include vegetables and fruits",
    "Choose whole grains where tolerated; maintain fluid intake",
    "Smaller meals if nausea affects appetite",
    "Discuss supplements with the oncologist — some interact with cancer medicines",
    "Avoid unverified cancer diets and restrictive fasting programmes",
    "Gentle activity/walking when approved by the treating team",
  ]),
  p("No special diet has been proven to cure breast cancer."),

  h2("Follow-up after breast cancer treatment"),
  ul([
    "Clinical examination",
    "Mammography when appropriate",
    "Assessment of treatment side effects",
    "Bone health monitoring for selected patients",
    "Cardiac monitoring after certain medicines",
    "Fertility and reproductive health review",
    "Psychological support",
  ]),
  p("Routine scans or tumour markers are not necessarily required for every asymptomatic patient. The oncologist decides which tests are appropriate."),

  h2("Breast cancer treatment in India for young women"),
  p("Young patients often need more than a single surgical or medical oncology visit — fertility counselling, genetic assessment, reconstruction planning and survivorship support matter. Filter specialists by city: [Delhi NCR](" + DELHI + "), [Mumbai](" + MUMBAI + "), [Bengaluru](" + BLR + "), [Chennai](" + CHN + "), [Hyderabad](" + HYD + "). Also see [medical](" + MED_DOCS + "), [surgical](" + SURG_DOCS + ") and [radiation](" + RAD_DOCS + ") oncology directories and [medical oncology hospitals](" + MED_HOSP + ")."),
  { id: id("html"), type: "html", html: hospitalTable },
  ol([
    "Breast biopsy and histopathology reports",
    "ER/PR and HER2 IHC and ISH/FISH if available",
    "Mammography, ultrasound, MRI/CT/PET-CT reports and imaging copies",
    "Previous surgery/discharge summaries and chemo/radiation records",
    "Genetic test reports if available",
    "Menstrual/reproductive history and current medication list",
  ]),
  p("If travelling for treatment, ask whether fertility consultation can be coordinated before the proposed start date. Practical sequencing: [international patient guide](" + INTL + ")."),
  p("GAF Healthcare helps organise reports, specialist consultations, hospital communication and travel-related arrangements. Treating hospitals remain responsible for diagnosis and clinical care. Request a written plan and itemised estimate before travel."),
  btn("Start an international young-women breast cancer records review", consult("Breast Cancer Treatment in India")),

  h2("What is the cost of breast cancer treatment in India for young women?"),
  p("There is no single fixed cost. Totals depend on stage, subtype, surgery, medicines, radiation, hospitalisation and whether genetic testing or fertility preservation are included. Use named GAF planning ranges:"),
  { id: id("html"), type: "html", html: costTable },
  p("A small hormone receptor-positive tumour may need a different programme from HER2-positive or triple-negative disease. Fertility preservation and genetic testing may add expenses but can be important for selected patients. Wider context: [breast cancer treatment cost in India](" + COST_BLOG + ")."),
  p("Ask for an itemised estimate covering diagnostics, surgery, chemotherapy, targeted/immunotherapy medicines if required, radiation, genetic testing, fertility preservation if planned, and follow-up — and which figures are confirmed versus plan-dependent."),
  btn("Request a written treatment estimate for a young patient", consult("Young Women Breast Cancer Cost Estimate")),
  p("[WhatsApp +91 90443 46292 for a personalised estimate](" + wa("Please provide a personalised breast cancer treatment estimate in India for a young woman, including fertility considerations.") + ")"),

  h2("Can breast cancer in young women be prevented?"),
  ul([
    "Know the normal appearance and feel of your breasts",
    "Seek assessment for a new or persistent lump",
    "Discuss family history; consider genetic counselling when indicated",
    "Follow risk-based screening advice",
    "Maintain a healthy weight; stay physically active",
    "Avoid tobacco; limit or avoid alcohol",
  ]),
  p("There is no guaranteed prevention. Women with inherited mutations or strong family history need a personalised screening and prevention plan. Routine mammography is not automatically indicated for every average-risk woman under 40 — but symptomatic lumps still need diagnostic evaluation."),

  h2("Frequently asked questions about breast cancer in young women"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Key takeaways"),
  ul([
    "Breast cancer can affect women in their 20s and 30s",
    "A persistent lump should not be dismissed because of young age",
    "Ultrasound, mammography and biopsy may all play a role in diagnosis",
    "Tumour biology (ER, PR, HER2) determines treatment more than age",
    "Genetic counselling is important for selected young patients",
    "Fertility preservation should be discussed before fertility-affecting treatment",
    "Pregnancy after breast cancer may be possible with specialist timing advice",
    "Pregnancy-associated breast cancer needs coordinated oncology and obstetric care",
    "Young age alone is not a reason for more aggressive treatment",
    "India offers multidisciplinary breast cancer and supportive-care services",
  ]),
  p("A young woman diagnosed with breast cancer should receive care that addresses both her cancer and her future quality of life — fertility, pregnancy, family planning, emotional wellbeing and reconstruction are part of the discussion, not issues left until after treatment."),
  btn("Discuss the next treatment step with GAF Healthcare", consult("Breast Cancer Treatment in India")),

  h2("Recommended further reading"),
  ul(RELATED.map(([label, href]) => `[${label}](${href})`)),

  h2("Medical sources and references"),
  ol([
    "[ISMPO — Breast Cancer in Young Guidelines](https://www.ijmpo.org/guidelines/topic/indian-society-of-medical-and-paediatric-oncology-ismpobreast-cancer-in-young-guidelines)",
    "[ASCO — Fertility Preservation in People With Cancer: Guideline Update, 2025](https://ascopubs.org/doi/10.1200/JCO-24-02782)",
    "[NCI — Breast Cancer Treatment During Pregnancy](https://www.cancer.gov/types/breast/hp/pregnancy-breast-treatment-pdq)",
    "[Breast Imaging Society, India — Best Practice Guidelines for Breast Imaging](https://nams-annals.in/best-practice-guidelines-for-breast-imaging-breast-imaging-society-india-part-1/)",
    "[CDC — Breast Cancer in Young Women](https://www.cdc.gov/bring-your-brave/breast-cancer-in-young-women/)",
    "[NCI — Reproductive History and Cancer Risk](https://www.cancer.gov/about-cancer/causes-prevention/risk/hormones/reproductive-history-fact-sheet)",
    "[NICPR, India — Breast Cancer](https://cancerindia.org.in/breast-cancer/)",
    "[Obstetrics & Gynecology — Breast Cancer in Young Women (2026)](https://doi.org/10.1097/aog.0000000000006187)",
    "[Therapeutic Advances in Medical Oncology — Pregnancy After Breast Cancer (2025)](https://journals.sagepub.com/doi/full/10.1177/17588359251346648)",
  ]),
  p("*This article is intended for general educational purposes and does not replace medical advice, diagnosis or an individualised treatment plan from a qualified oncology team. GAF cost figures are partner planning ranges, not fixed hospital quotations.*"),
];

const now = "2026-11-12T18:15:00.000Z";
const article = {
  id: "art_breast_cancer_in_young_women_treatment_india",
  slug: SLUG,
  title:
    "Breast Cancer in Young Women: Symptoms, Causes, Diagnosis, Fertility, Treatment and Options in India",
  excerpt:
    "Breast cancer can affect women in their 20s, 30s and early 40s. A diagnosis at a young age can bring additional concerns about fertility, pregnancy, family planning, body image and long-term health. This comprehensive guide explains warning signs, risk factors, diagnosis, genetic testing, fertility preservation, treatment options and what young women should know when considering breast cancer treatment in India.",
  date: "12 Nov 2026",
  publishedAt: "2026-09-28T01:30:00.000Z",
  updatedAt: now,
  author: "GAF Healthcare Editorial",
  category: "Medical Oncology",
  tags: [
    "breast cancer",
    "young women",
    "fertility preservation",
    "BRCA",
    "India",
    "cost",
  ],
  image: IMG1,
  imageAlt:
    "Young woman in clinic consultation beside a circular breast anatomy diagram suggesting early breast cancer evaluation",
  status: "published",
  featured: false,
  seoTitle: "Breast Cancer in Young Women: Symptoms, Fertility and Treatment in India",
  seoDescription:
    "Learn about breast cancer in young women under 40, including symptoms, risk factors, diagnosis, genetic testing, fertility preservation, pregnancy and treatment options in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: IMG1,
  allowIndex: true,
  keywords: [
    "Breast cancer in young women",
    "Breast cancer symptoms in young women",
    "Breast cancer under 40",
    "Breast cancer in young females in India",
    "Early-onset breast cancer",
    "Breast cancer causes in young women",
    "Breast cancer diagnosis in young women",
    "Breast cancer fertility preservation",
    "Pregnancy after breast cancer",
    "BRCA testing for young women",
    "Breast cancer treatment in India",
    "Breast cancer during pregnancy",
    "Breast cancer in women under 35",
  ],
  relatedLinks: RELATED.map(([label, href]) => ({ label, href })),
  blocks,
};

if (!store.categories.includes("Medical Oncology")) store.categories.push("Medical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["young-women-breast-cancer-overview.webp", article.imageAlt],
  [
    "young-women-breast-diagnosis-ultrasound.webp",
    "Young woman undergoing breast ultrasound beside a circular diagram of ultrasound assessment of breast tissue",
  ],
  [
    "young-women-fertility-preservation.webp",
    "Young woman in fertility counselling beside a circular diagram of oocyte cryopreservation and ovarian tissue concepts",
  ],
  [
    "young-women-brca-genetic-counseling.webp",
    "Young woman in genetic counselling beside a circular DNA helix representing BRCA hereditary risk assessment",
  ],
]) {
  const mediaId = `media_${file.replace(/[^a-z0-9]+/g, "_")}`;
  const existing = store.media.find((row) => row.id === mediaId || row.url === `/uploads/articles/${file}`);
  if (existing) {
    existing.url = `/uploads/articles/${file}`;
    existing.name = file;
    existing.alt = alt;
    existing.addedAt = now;
  } else {
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
      `- [Blogs](https://gaf.healthcare/blogs): includes [breast cancer in young women](https://gaf.healthcare/blogs/${SLUG}).`,
    );
  } else {
    llms += `\n- [Breast cancer in young women](https://gaf.healthcare/blogs/${SLUG})\n`;
  }
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
} else {
  console.log("llms.txt already lists slug");
}

for (const relatedSlug of [
  "her2-positive-breast-cancer-treatment-india",
  "triple-negative-breast-cancer-treatment-india",
  "breast-cancer-chemotherapy-in-india",
  "breast-cancer-surgery-in-india",
  "breast-cancer-during-pregnancy-treatment-india",
  "breast-cancer-treatment-cost-in-india",
]) {
  const related = store.articles.find((row) => row.slug === relatedSlug);
  if (!related) continue;
  const href = `/blogs/${SLUG}`;
  related.relatedLinks = related.relatedLinks || [];
  if (!related.relatedLinks.some((row) => row.href === href)) {
    related.relatedLinks.push({
      label: "Breast cancer in young women — treatment in India",
      href,
    });
  }
  for (let i = 0; i < related.blocks.length; i++) {
    if (related.blocks[i].type === "heading" && /Related Reading/i.test(related.blocks[i].text || "")) {
      for (let j = i + 1; j < Math.min(i + 5, related.blocks.length); j++) {
        if (related.blocks[j].type === "list" && !related.blocks[j].items.some((item) => item.includes(href))) {
          related.blocks[j].items.push(`[Breast Cancer in Young Women — Treatment in India](${href})`);
        }
      }
      break;
    }
  }
}
writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("linked from related breast articles");
