#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (t) => `/consult?treatment=${encodeURIComponent(t)}`;
const wa = (m) => `https://wa.me/919044346292?text=${encodeURIComponent(m)}`;

const SLUG = "breast-cancer-in-men-india";
const TX = "/treatments/breast-cancer-treatment-in-india";
const SYMP = "/blogs/breast-cancer-symptoms";
const DIAG = "/blogs/breast-cancer-diagnosis";
const DIAG2 = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const BIOPSY = "/blogs/breast-biopsy-breast-cancer-india";
const STAGES = "/blogs/breast-cancer-stages";
const COST = "/blogs/breast-cancer-treatment-cost-in-india";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const CHEMO = "/blogs/breast-cancer-chemotherapy-in-india";
const RAD = "/blogs/breast-cancer-radiation-therapy-in-india";
const HORM = "/blogs/hormone-therapy-for-breast-cancer-in-india";
const PREV = "/blogs/breast-cancer-prevention";
const YOUNG = "/blogs/breast-cancer-in-young-women-treatment-india";
const MED = "/doctors/India/Medical-Oncology";
const SURG = "/doctors/India/Surgical-Oncology";
const RADDOC = "/doctors/India/Radiation-Oncology";
const DELHI = "/doctors/India/Delhi-NCR/Medical-Oncology";
const MUMBAI = "/doctors/India/Mumbai/Medical-Oncology";
const C_LUMP = "/costs/India/Surgical-Oncology/Lumpectomy";
const C_MAST = "/costs/India/Surgical-Oncology/Mastectomy";
const C_CHEMO = "/costs/India/Medical-Oncology/Chemotherapy";
const C_HORM = "/costs/India/Medical-Oncology/Hormone-Therapy";
const C_PREC = "/costs/India/Medical-Oncology/Precision-Oncology";

let n = 0;
const id = (p) => `${p}_${(++n).toString().padStart(3, "0")}`;
const h2 = (t) => ({ id: id("h"), type: "heading", level: 2, text: t });
const h3 = (t) => ({ id: id("h"), type: "heading", level: 3, text: t });
const p = (t) => ({ id: id("p"), type: "paragraph", text: t });
const ul = (items) => ({ id: id("ul"), type: "list", style: "ul", items });
const ol = (items) => ({ id: id("ol"), type: "list", style: "ol", items });
const btn = (label, href) => ({ id: id("btn"), type: "button", label, href });
const img = (src, alt, caption) => ({ id: id("img"), type: "image", src, alt, caption });
const html = (h) => ({ id: id("html"), type: "html", html: h });

const IMG1 = "/uploads/articles/breast-cancer-in-men-overview.webp";
const IMG2 = "/uploads/articles/breast-cancer-in-men-symptoms.webp";
const IMG3 = "/uploads/articles/breast-cancer-in-men-genetics.webp";
const IMG4 = "/uploads/articles/breast-cancer-in-men-treatment.webp";

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>Can men get breast cancer?</strong></td><td>Yes — rare (&lt;1% of cases), but real and treatable</td></tr><tr><td><strong>Common first sign</strong></td><td>Painless lump near the nipple</td></tr><tr><td><strong>Key gene</strong></td><td>BRCA2 raises male breast cancer risk most clearly</td></tr><tr><td><strong>Gynecomastia vs cancer</strong></td><td>Different conditions — imaging/biopsy clarify suspicious lumps</td></tr><tr><td><strong>Usual surgery</strong></td><td>Mastectomy is common; breast conservation possible in selected men</td></tr><tr><td><strong>Hormone therapy</strong></td><td>Tamoxifen is often central for hormone receptor-positive disease</td></tr><tr><td><strong>Planning</strong></td><td><a href="${TX}">Treatment in India</a> · <a href="${SURGERY}">surgery</a> · <a href="${COST}">cost guide</a></td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>Breast cancer in men</strong> is uncommon, but a new nipple-area lump, discharge or skin change needs medical evaluation — not dismissal because the patient is male.</p></aside>`;

const symptomTable = `<div class="md-body"><table><thead><tr><th>Symptom</th><th>What to look for</th></tr></thead><tbody><tr><td>Breast lump</td><td>Firm swelling near or beneath the nipple</td></tr><tr><td>Nipple inversion</td><td>Nipple newly pulled inward</td></tr><tr><td>Nipple discharge</td><td>Clear or blood-stained fluid</td></tr><tr><td>Skin dimpling</td><td>Indented or puckered skin</td></tr><tr><td>Redness or scaling</td><td>Persistent changes around the nipple</td></tr><tr><td>Armpit lump</td><td>Enlarged lymph node</td></tr><tr><td>Breast ulceration</td><td>A wound or breakdown of skin</td></tr></tbody></table></div>`;

const gynecoTable = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Gynecomastia</th><th>Male breast cancer</th></tr></thead><tbody><tr><td>Nature</td><td>Benign breast tissue enlargement</td><td>Malignant growth</td></tr><tr><td>Location</td><td>Often beneath the nipple</td><td>Often near or beneath the nipple</td></tr><tr><td>Feel</td><td>Usually rubbery or firm</td><td>May be hard and irregular</td></tr><tr><td>Pain</td><td>May be tender, especially early</td><td>Often painless, but pain can occur</td></tr><tr><td>Both breasts</td><td>Can affect one or both breasts</td><td>Often affects one breast</td></tr><tr><td>Nipple changes</td><td>Less typical</td><td>May include inversion or discharge</td></tr><tr><td>Skin changes</td><td>Usually absent</td><td>May include dimpling or ulceration</td></tr><tr><td>Diagnosis</td><td>Clinical examination and imaging when needed</td><td>Imaging and biopsy when suspicious</td></tr></tbody></table></div>`;

const riskTable = `<div class="md-body"><table><thead><tr><th>Risk factor</th><th>Why it matters</th></tr></thead><tbody><tr><td>BRCA2 pathogenic variant</td><td>Increases male breast cancer risk</td></tr><tr><td>BRCA1 pathogenic variant</td><td>Also increases risk, though generally less than BRCA2</td></tr><tr><td>Strong family history</td><td>May indicate inherited susceptibility</td></tr><tr><td>Klinefelter syndrome</td><td>Associated with altered sex hormone levels</td></tr><tr><td>Cirrhosis</td><td>Can change hormone metabolism</td></tr><tr><td>Previous chest radiation</td><td>May increase later breast cancer risk</td></tr><tr><td>Testicular conditions</td><td>Some can affect hormone balance</td></tr><tr><td>Obesity</td><td>Can influence oestrogen levels</td></tr><tr><td>Increasing age</td><td>Risk rises with age</td></tr></tbody></table></div>`;

const stageTable = `<div class="md-body"><table><thead><tr><th>Stage</th><th>General description</th></tr></thead><tbody><tr><td>Stage 0</td><td>Non-invasive disease such as DCIS</td></tr><tr><td>Stage I</td><td>Small invasive cancer with limited or no lymph node involvement</td></tr><tr><td>Stage II</td><td>Larger tumour and/or limited regional lymph node involvement</td></tr><tr><td>Stage III</td><td>More extensive local or regional disease</td></tr><tr><td>Stage IV</td><td>Cancer has spread to distant organs</td></tr></tbody></table></div>`;

const survivalTable = `<div class="md-body"><table><thead><tr><th>Extent of disease</th><th>Five-year relative survival in US data</th></tr></thead><tbody><tr><td>Localised</td><td>95%</td></tr><tr><td>Regional</td><td>84%</td></tr><tr><td>Distant/metastatic</td><td>20%</td></tr></tbody></table></div><p class="article-quick-answer__body">These figures are US National Cancer Institute population statistics, not India-specific survival estimates and not an individual prognosis.</p>`;

const metaTable = `<div class="md-body"><table><thead><tr><th>Site</th><th>Possible symptoms</th></tr></thead><tbody><tr><td>Bones</td><td>Persistent pain or fractures</td></tr><tr><td>Liver</td><td>Abdominal discomfort, jaundice or swelling</td></tr><tr><td>Lungs</td><td>Breathlessness or persistent cough</td></tr><tr><td>Brain</td><td>Persistent headaches, weakness, seizures or neurological changes</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Named pathway</th><th>GAF planning range in India</th><th>How it relates to male breast cancer care</th></tr></thead><tbody><tr><td><a href="${C_MAST}">Mastectomy</a></td><td>$4,500–$10,000</td><td>Common surgical approach because men have less breast tissue</td></tr><tr><td><a href="${C_LUMP}">Lumpectomy</a></td><td>$3,000–$7,500</td><td>Breast-conserving surgery in selected men, usually with radiation</td></tr><tr><td><a href="${C_CHEMO}">Chemotherapy</a></td><td>$1,500–$8,000+</td><td>When systemic cytotoxic therapy is indicated</td></tr><tr><td><a href="${C_HORM}">Hormone therapy</a></td><td>$1,000–$4,500</td><td>Often tamoxifen for hormone receptor-positive disease</td></tr><tr><td><a href="${C_PREC}">Precision oncology</a></td><td>$2,000–$7,000</td><td>Selected genetic / biomarker pathways including BRCA-related testing</td></tr></tbody></table></div><p class="article-quick-answer__body">GAF figures are partner planning ranges for named pathways — not a fixed male breast cancer package. Ask for a written estimate after diagnosis review. See the broader <a href="${COST}">breast cancer cost guide</a>.</p>`;

const faqs = [
  ["Can men really get breast cancer?", "Yes. Men have breast tissue and can develop breast cancer, although it is uncommon. Fewer than 1% of breast cancer cases occur in men."],
  ["What is the first sign of breast cancer in men?", "A painless lump or thickening near the nipple is one of the most common first signs. Nipple discharge, inversion and skin changes can also occur."],
  ["At what age does male breast cancer usually develop?", "It is more commonly diagnosed in older men, often between 60 and 70 years. However, younger men can also develop it."],
  ["Is a male breast lump always cancer?", "No. Gynecomastia and other benign conditions are much more common causes of male breast swelling. A new or persistent lump should still be examined."],
  ["Is gynecomastia a risk factor for male breast cancer?", "Gynecomastia itself is not considered a direct cause of breast cancer. However, some conditions associated with hormonal changes may also influence cancer risk."],
  ["Which gene is most strongly associated with male breast cancer?", "BRCA2 is particularly important. BRCA1 and other inherited cancer susceptibility genes can also increase risk."],
  ["Can a man inherit a BRCA2 mutation from his mother?", "Yes. A man can inherit a BRCA2 variant from either parent. It can also be passed from a father to his children."],
  ["Is there a screening mammogram for men?", "Routine screening mammography is not generally recommended for average-risk men. Men with symptoms need diagnostic evaluation, and selected high-risk men may need an individualised surveillance plan."],
  ["What tests diagnose male breast cancer?", "Diagnosis may involve clinical examination, mammography, ultrasound and core needle biopsy. If cancer is confirmed, ER, PR and HER2 testing help guide treatment. See [diagnosis tests](" + DIAG2 + ") and [biopsy](" + BIOPSY + ")."],
  ["Is male breast cancer treatable?", "Yes. Treatment may include surgery, radiation therapy, chemotherapy, hormone therapy and targeted medicines. The appropriate treatment depends on the cancer's stage and biological characteristics."],
  ["Is mastectomy always necessary in men?", "No. Mastectomy is common because men have less breast tissue, but breast-conserving surgery may be possible in selected patients. See [surgery in India](" + SURGERY + ")."],
  ["Does male breast cancer respond to tamoxifen?", "Many male breast cancers are hormone receptor-positive and may respond to tamoxifen. It is a standard endocrine treatment option for suitable men. See [hormone therapy](" + HORM + ")."],
  ["How long do men take tamoxifen after breast cancer surgery?", "An initial five-year course is generally recommended for eligible men. Some patients at higher risk of recurrence may be considered for a longer duration."],
  ["Can men develop triple-negative breast cancer?", "Yes, although it is uncommon. Male breast cancers are much more frequently hormone receptor-positive than triple-negative."],
  ["Can breast cancer in men spread to other organs?", "Yes. Like breast cancer in women, it can spread to lymph nodes, bones, liver, lungs and other organs."],
  ["Is male breast cancer treatment available in India?", "Yes. Diagnostic evaluation, surgery, chemotherapy, radiation therapy, hormone therapy and targeted treatment are available through specialist cancer services in India. Start with [breast cancer treatment in India](" + TX + ")."],
  ["Should a man with a family history of breast cancer undergo genetic testing?", "He may benefit from genetic counselling, particularly if there is a known BRCA variant or a strong family history of breast, ovarian, pancreatic or prostate cancer."],
  ["Can male breast cancer return after treatment?", "Yes. Recurrence can occur locally, regionally or at distant sites. Regular follow-up and prompt evaluation of new symptoms are important."],
];

const now = new Date().toISOString();

const blocks = [
  html(qa),
  p("Breast cancer is uncommon in men, but it can develop and should not be ignored. A painless lump near the nipple, nipple discharge, skin changes or an inverted nipple may need medical evaluation. This guide covers symptoms, BRCA2 risk, diagnosis, treatment options and planning care in India. Related reading: [symptoms](" + SYMP + "), [diagnosis](" + DIAG + "), [surgery](" + SURGERY + ") and [treatment in India](" + TX + ")."),
  btn("Ask GAF about male breast cancer assessment", consult("Male Breast Cancer")),
  p("[WhatsApp +91 90443 46292 with symptoms, age and any family cancer history](" + wa("Please advise on male breast cancer assessment, BRCA testing and treatment options in India.") + ")"),
  img(IMG1, "Middle-aged man discussing male breast cancer symptoms with a clinician beside soft circular awareness concepts", "Men can develop breast cancer — a new nipple-area lump deserves evaluation."),

  h2("Can Men Get Breast Cancer?"),
  p("Most people associate breast cancer with women. Men can develop it too. Men have a small amount of breast tissue beneath and around the nipples. Although this tissue does not develop like female breast tissue, it contains cells that can become cancerous."),
  p("Male breast cancer is rare — fewer than 1% of all breast cancer cases — but delayed recognition is common because many men do not realise the disease can affect them."),
  ul([
    "A painless lump near the nipple is a common warning sign.",
    "Nipple discharge, inversion, dimpling, redness or an armpit lump may also appear.",
    "Diagnosis is often later in life (commonly 60–70), though younger men can be affected.",
    "Inherited changes, especially BRCA2, can raise risk.",
  ]),
  p("Treatment options are established: surgery, chemotherapy, radiation, hormone therapy and targeted medicines depending on the case."),

  h2("What Is Male Breast Cancer?"),
  p("Male breast cancer develops in a man's breast tissue. The male breast still has milk ducts, fatty tissue, connective tissue and lymphatic structures. Cancer usually begins when cells in this tissue grow abnormally."),
  p("Most male breast cancers start in the milk ducts — invasive ductal carcinoma is the most common type. Cancer may stay in ducts or invade surrounding tissue and later reach lymph nodes or distant organs."),
  h3("Is breast cancer in men common?"),
  p("No. The US National Cancer Institute reports that fewer than 1% of breast cancer cases occur in men. Average age at diagnosis is generally 60–70, though younger men can be affected. India-specific rates should be read from male-specific registry data, not overall breast cancer figures."),
  p("Rarity does not make a suspicious lump less important. A new or persistent breast change should be assessed."),

  h2("What Are the Symptoms of Breast Cancer in Men?"),
  img(IMG2, "Abstract male chest illustration highlighting the nipple region where male breast cancer lumps commonly appear", "Suspicious changes often centre near the nipple."),
  p("The most common symptom is a lump or thickening in or near the nipple. A suspicious lump may feel firm, relatively fixed and painless — but pain does not rule cancer in or out."),
  h3("Common warning signs"),
  ul([
    "**Lump near the nipple** — firm swelling beneath or close to the nipple; may be mistaken for minor swelling.",
    "**Nipple changes** — new inward pulling, change in direction, thickening, crusting, scaling or persistent redness.",
    "**Nipple discharge** — fluid from the nipple, especially if bloody or spontaneous.",
    "**Skin changes** — dimpling, thickening, redness, scaling, ulceration or orange-peel appearance.",
    "**Armpit swelling** — may reflect enlarged lymph nodes.",
  ]),
  html(symptomTable),
  p("**Important:** These symptoms do not automatically mean cancer. Gynecomastia, cysts, infections and other benign problems can look similar. Medical assessment is needed. Compare with general [breast cancer symptoms](" + SYMP + ")."),
  btn("Request a male breast lump review", consult("Male Breast Cancer Diagnosis")),

  h2("What Causes Breast Cancer in Men?"),
  p("There is no single cause. Cancer develops when breast-tissue cells acquire changes that allow abnormal growth. Factors that can raise likelihood include:"),
  ul([
    "**Increasing age** — more often diagnosed after 50, though age alone does not predict individual risk.",
    "**Family history** — especially multiple relatives, young-onset disease, male breast cancer, ovarian/pancreatic patterns, or a known hereditary variant (both sides of the family matter).",
    "**Inherited genes** — BRCA1/BRCA2 (BRCA2 especially), and sometimes PALB2, PTEN and others.",
    "**High oestrogen exposure** — liver disease, some testicular conditions, Klinefelter syndrome, certain hormonal treatments.",
    "**Previous chest radiation**.",
    "**Obesity** — can influence hormone levels, particularly in older men.",
    "**Chronic liver disease / cirrhosis** — may alter hormone metabolism.",
  ]),

  h2("Gynecomastia vs Breast Cancer"),
  p("Gynecomastia is non-cancerous enlargement of male breast glandular tissue. It can occur in adolescence, with ageing, hormonal change, medicines or medical conditions. Breast cancer is malignant cell growth."),
  html(gynecoTable),
  p("These are general patterns, not diagnostic rules. Cancer can be tender; gynecomastia can be one-sided. Absence of pain does not establish cancer. Gynecomastia itself is not considered a direct cause of breast cancer, but related hormonal conditions may influence risk. Do not assume a new lump is \"just gynecomastia.\""),

  h2("BRCA2 and Male Breast Cancer"),
  img(IMG3, "Man in genetic counselling beside a DNA helix representing BRCA2 hereditary breast cancer risk", "BRCA2 is particularly important in male breast cancer risk."),
  p("BRCA1 and BRCA2 help repair damaged DNA. Inherited harmful variants raise risk of certain cancers. **BRCA2 is especially important in male breast cancer.**"),
  p("NCI-cited estimates of cumulative male breast cancer risk by age 70 are approximately **1.2%** for BRCA1 pathogenic variants and **6.8%** for BRCA2 pathogenic variants — research-population estimates, not predictions for every carrier."),
  p("Inherited BRCA2 variants can also increase risk of female breast, ovarian, prostate and pancreatic cancers. Genetic counselling helps explain personal risks, follow-up, testing of relatives and targeted familial-variant testing. A positive result does not make cancer inevitable."),
  btn("Ask about BRCA counselling coordination in India", consult("Breast Cancer Genetic Testing")),
  p("[WhatsApp +91 90443 46292 about genetic counselling and BRCA panel options](" + wa("Please advise on BRCA1 BRCA2 genetic counselling for male breast cancer risk in India.") + ")"),

  h2("Who Is at Higher Risk?"),
  html(riskTable),
  p("Having risk factors does not mean cancer will develop. It does mean unusual breast changes deserve attention. Related context: [prevention and hereditary risk](" + PREV + ")."),

  h2("Is There Screening for Men?"),
  p("There is no routine population mammography programme for average-risk men. Screening mammograms are not generally recommended for men without symptoms."),
  p("For men with a known pathogenic variant such as BRCA2, specialists may recommend clinical breast examinations, breast-change education, individualised surveillance, genetic counselling and assessment of other inherited cancer risks."),
  p("Once a man notices a lump or nipple change, evaluation is **diagnostic**, not routine screening. Some high-risk men may be considered for mammography-based surveillance after specialist assessment — this is not a universal rule for every BRCA2 carrier."),

  h2("How Is Breast Cancer Diagnosed in Men?"),
  ol([
    "**History and examination** — timing of lump, growth, pain, discharge, skin changes, family history, prior chest radiation, medicines; examination of breast, nipple, chest wall and nodes.",
    "**Imaging** — mammography and/or ultrasound. For many men ≥25 with an unexplained lump, diagnostic mammography is a common first imaging test; ultrasound often follows. In younger men, ultrasound is often first.",
    "**Biopsy** — core needle biopsy when imaging is suspicious ([biopsy guide](" + BIOPSY + ")).",
    "**Pathology and biomarkers** — type, grade, ER, PR, HER2; male breast cancer is frequently hormone receptor-positive.",
    "**Staging** — CT, PET-CT or bone scan when clinically indicated; not every patient needs every scan.",
  ]),
  p("More on [diagnosis](" + DIAG + ") and [biomarker testing](" + DIAG2 + ")."),

  h2("Types of Male Breast Cancer"),
  ul([
    "**Invasive ductal carcinoma** — most common; begins in ducts, often near the nipple.",
    "**DCIS** — abnormal cells inside ducts without invasion; non-invasive.",
    "**Invasive lobular carcinoma** — uncommon in men (few developed lobules).",
    "**Paget disease of the nipple** — rare; scaling, redness, itching, crusting, discharge or nipple change that can mimic a skin condition.",
  ]),

  h2("Stages of Male Breast Cancer"),
  p("Male breast cancer uses the same general TNM staging approach as in women (tumour extent, nodes, distant spread)."),
  html(stageTable),
  p("Exact stage depends on full clinical and pathological assessment. Biomarkers and grade also inform prognosis. Stage IV does not mean treatment is unavailable. See [stages](" + STAGES + ")."),

  h2("Treatment Options for Breast Cancer in Men"),
  img(IMG4, "Man discussing male breast cancer surgery and hormone therapy options with an oncologist", "Treatment follows breast cancer principles adapted to male anatomy and tumour biology."),
  p("Treatment follows the same broad principles as in women, adapted to male anatomy and limited breast tissue. Options include surgery, chemotherapy, radiation, hormone therapy, HER2-targeted therapy and, in selected advanced settings, other targeted medicines or immunotherapy."),
  btn("Talk to GAF about male breast cancer treatment in India", consult("Male Breast Cancer Treatment")),

  h3("Surgery"),
  p("Surgery is often central for early-stage disease. Because men have less breast tissue, **mastectomy** is performed more often than breast conservation."),
  ul([
    "**Mastectomy** — removes breast tissue containing the cancer; may include nipple/areola; nodes assessed separately.",
    "**Breast-conserving surgery** — selected patients; radiation generally required afterwards.",
    "**Sentinel lymph node biopsy** — assesses first draining nodes; can avoid more extensive surgery when appropriate.",
    "**Axillary dissection** — selected cases with greater nodal involvement.",
  ]),
  p("Details: [breast cancer surgery in India](" + SURGERY + ")."),

  h3("Chemotherapy and radiation"),
  p("Chemotherapy may be used before or after surgery, for locally advanced disease or metastatic disease, based on size, grade, nodes, receptors and other risk factors. See [chemotherapy](" + CHEMO + ")."),
  p("Radiation may follow breast-conserving surgery or, in selected cases, mastectomy; it can also relieve symptoms from metastatic disease. See [radiation therapy](" + RAD + ")."),

  h3("Hormone therapy and tamoxifen"),
  p("Most male breast cancers are hormone receptor-positive, so endocrine therapy is often important. **Tamoxifen** is commonly recommended for eligible men with hormone receptor-positive disease. An initial duration of about five years is generally recommended; some higher-risk men who tolerate therapy may be considered for longer."),
  p("Possible side effects include hot flashes, reduced sexual interest, erectile difficulties, mood changes, fatigue and blood-clot risk. If tamoxifen cannot be used, an aromatase inhibitor **with** gonadal hormone suppression may be considered; an aromatase inhibitor alone is generally not recommended as a substitute in men."),
  p("ASCO guidance advises against testosterone supplementation in men with breast cancer without specialist advice. See [hormone therapy](" + HORM + ")."),

  h3("HER2-targeted and other systemic options"),
  p("HER2-positive disease may be treated with trastuzumab, pertuzumab or other HER2-directed medicines as indicated. For advanced disease, selected patients may be considered for CDK4/6 inhibitors, PARP inhibitors (when BRCA-related criteria are met), PI3K/mTOR-directed options or immunotherapy — only when tumour biology and evidence support it."),

  h2("If Male Breast Cancer Spreads"),
  p("Metastatic (Stage IV) disease may involve bones, liver, lungs or brain. Symptoms depend on site:"),
  html(metaTable),
  p("Treatment aims to control growth, relieve symptoms and support quality of life using endocrine therapy, targeted medicines, chemotherapy, radiation and supportive care as appropriate."),

  h2("Survival Statistics — Read Carefully"),
  html(survivalTable),
  p("Early evaluation of a suspicious lump matters more than memorising population averages."),

  h2("Cost of Male Breast Cancer Treatment in India"),
  p("Cost varies with stage, surgery type, medicines, hospital, city and duration. There is no single package price."),
  html(costTable),
  p("Ask for a written estimate separating diagnostics, surgery/stay, pathology, chemotherapy, radiation, targeted medicines, follow-up and possible extras. Early hormone receptor-positive disease and metastatic HER2-positive disease can differ dramatically in cost."),
  btn("Request a written male breast cancer estimate", consult("Male Breast Cancer Treatment Cost")),
  p("[WhatsApp +91 90443 46292 for a case-specific estimate](" + wa("Please share a case-specific estimate for male breast cancer diagnosis and treatment pathways in India.") + ")"),

  h2("Treatment in India for International Patients"),
  p("India offers breast surgery, medical oncology, radiation oncology, imaging and pathology in major centres. Patients from East Africa, the Middle East and elsewhere may travel for confirmation, surgery, systemic therapy or a second opinion. Ideally arrange record review before travel."),
  ul([
    "Clinical examination notes; mammography/ultrasound reports and imaging files.",
    "Core biopsy report; slides/blocks if available; ER/PR/HER2 results.",
    "Genetic reports if done; prior treatment records; medicine list; relevant history.",
  ]),
  ol([
    "Consultation with breast/surgical oncology.",
    "Review of symptoms, examination and family history.",
    "Imaging and biopsy review; pathology confirmation.",
    "Genetic counselling/testing when appropriate; staging if indicated.",
    "Multidisciplinary plan; treatment; follow-up.",
  ]),
  p("Specialists: [medical oncology](" + MED + "), [surgical oncology](" + SURG + "), [radiation oncology](" + RADDOC + "), [Delhi NCR](" + DELHI + "), [Mumbai](" + MUMBAI + "). International planning: [international patients](" + INTL + ")."),
  p("GAF Healthcare can help coordinate specialist consultations and treatment-related arrangements in India. Clinical decisions remain with the treating team."),
  btn("Coordinate male breast cancer care in India", consult("Male Breast Cancer International Patients")),

  h2("Follow-Up After Treatment"),
  p("Follow-up monitors recovery, recurrence risk and treatment side effects: clinical exams of the treated side and opposite breast, medicine review, imaging when indicated and investigation of new symptoms."),
  p("ASCO recommends offering annual mammogram of the affected side after breast-conserving surgery when technically feasible, and considering annual mammogram of the opposite breast in men with a predisposing genetic mutation. Routine breast MRI is not generally recommended for all men after treatment."),
  p("Report new lumps near the surgical area or opposite breast, armpit swelling, persistent bone pain, unexplained breathlessness, headaches or abdominal pain."),

  h2("Emotional and Social Impact"),
  p("Some men feel embarrassed discussing breast symptoms or delay care because they believe breast cancer is only a women's disease. Concerns may include body image after mastectomy, sexual health, fertility, hormone-therapy side effects, work and how to tell family. Support from family, clinicians and counselling can help. A diagnosis is a medical condition — not a reason for shame."),

  h2("Frequently Asked Questions"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Conclusion"),
  p("Breast cancer in men is uncommon, but real. A new nipple-area lump, discharge, dimpling or persistent nipple change should never be dismissed because the patient is male. BRCA2 and other inherited changes can raise risk in some families."),
  p("Diagnosis usually needs examination, imaging and biopsy. Treatment is planned by stage, pathology and biomarkers — often including surgery and, for hormone receptor-positive disease, tamoxifen."),
  p("**The most important message: men should not ignore unusual breast changes or delay assessment because they think breast cancer only affects women.** Early evaluation allows timely treatment."),

  h2("Medical Sources and References"),
  ul([
    "[NCI – Male Breast Cancer](https://www.cancer.gov/types/breast/male-breast-cancer)",
    "[NCI – Male Breast Cancer Treatment (PDQ)](https://www.cancer.gov/types/breast/hp/male-breast-treatment-pdq)",
    "[ASCO – Management of Male Breast Cancer Guideline](https://ascopubs.org/doi/full/10.1200/JCO.19.03120)",
    "[ASCO – Male Breast Cancer Guideline Summary](https://ascopubs.org/doi/full/10.1200/JOP.19.00792)",
    "[CDC – Breast Cancer in Men](https://www.cdc.gov/breast-cancer/about/men.html)",
    "[NCI – BRCA Gene Changes](https://www.cancer.gov/about-cancer/causes-prevention/genetics/brca-fact-sheet)",
    "[ACS – Breast Cancer in Men](https://www.cancer.org/cancer/types/breast-cancer-in-men.html)",
    "[ACR Appropriateness Criteria – Symptomatic Male Breast](https://acsearch.acr.org/docs/3091547/Narrative/)",
    "[NCI – Breast Cancer Treatment](https://www.cancer.gov/types/breast/treatment)",
    "[NCI – Breast Cancer Stages](https://www.cancer.gov/types/breast/stages)",
  ]),
  p("*Medical disclaimer: This article is for general educational purposes. It does not replace clinical examination, imaging, pathology review or personalised advice from a qualified breast surgeon or oncologist. Treatment decisions should be made by the treating medical team.*"),

  h2("Related Reading"),
  ul([
    "[Breast Cancer Treatment in India](" + TX + ")",
    "[Breast cancer surgery in India](" + SURGERY + ")",
    "[Breast cancer symptoms](" + SYMP + ")",
    "[Breast cancer diagnosis](" + DIAG + ")",
    "[Breast biopsy in India](" + BIOPSY + ")",
    "[Hormone therapy for breast cancer](" + HORM + ")",
    "[Breast cancer treatment cost in India](" + COST + ")",
    "[International patients](" + INTL + ")",
    "[Breast cancer prevention / hereditary risk](" + PREV + ")",
  ]),
];

const article = {
  id: "art_breast_cancer_in_men_india",
  slug: SLUG,
  title: "Breast Cancer in Men: Symptoms, Causes, BRCA2 Risk, Diagnosis and Treatment in India",
  excerpt:
    "Breast cancer is uncommon in men, but it can develop and should not be ignored. A painless lump near the nipple, nipple discharge, skin changes or an inverted nipple may require medical evaluation. This guide explains the symptoms, risk factors, BRCA2 genetic connection, diagnostic tests, treatment options and what men and their families should know about accessing breast cancer care in India.",
  date: "15 November 2026",
  publishedAt: "2026-11-15T19:00:00.000Z",
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Medical Oncology",
  tags: ["breast cancer", "male breast cancer", "BRCA2", "men", "India"],
  image: IMG1,
  imageAlt: "Man discussing male breast cancer symptoms and treatment options with a clinician",
  status: "published",
  featured: true,
  seoTitle: "Breast Cancer in Men: Symptoms, BRCA2 Risk, Diagnosis and Treatment in India",
  seoDescription:
    "Breast cancer can affect men too. Learn about warning signs, causes, BRCA1 and BRCA2 risk, diagnosis, biopsy, treatment options, survival and treatment costs in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: IMG1,
  allowIndex: true,
  keywords: [
    "Breast cancer in men",
    "Male breast cancer symptoms",
    "Breast cancer in men treatment",
    "Male breast cancer causes",
    "BRCA2 mutation in men",
    "Male breast cancer diagnosis",
    "Breast cancer in men age",
    "Male breast lump",
    "Breast cancer surgery for men",
    "Male breast cancer treatment cost in India",
    "Gynecomastia vs breast cancer",
    "Male breast cancer survival rate",
    "Breast cancer genetic testing for men",
  ],
  relatedLinks: [
    { label: "Breast Cancer Treatment in India", href: TX },
    { label: "Breast cancer surgery in India", href: SURGERY },
    { label: "Breast cancer symptoms", href: SYMP },
    { label: "Breast cancer diagnosis", href: DIAG },
    { label: "Breast biopsy in India", href: BIOPSY },
    { label: "Hormone therapy", href: HORM },
    { label: "Cost guide", href: COST },
    { label: "International patients", href: INTL },
  ],
  blocks,
};

for (const [file, alt] of [
  ["breast-cancer-in-men-overview.webp", article.imageAlt],
  ["breast-cancer-in-men-symptoms.webp", "Abstract male chest illustration highlighting the nipple region where male breast cancer lumps commonly appear"],
  ["breast-cancer-in-men-genetics.webp", "Man in genetic counselling beside a DNA helix representing BRCA2 hereditary breast cancer risk"],
  ["breast-cancer-in-men-treatment.webp", "Man discussing male breast cancer surgery and hormone therapy options with an oncologist"],
]) {
  const mediaId = `media_${file.replace(/[^a-z0-9]+/g, "_")}`;
  if (!store.media.some((r) => r.id === mediaId || r.url === `/uploads/articles/${file}`)) {
    store.media.push({ id: mediaId, url: `/uploads/articles/${file}`, name: file, alt, addedAt: now });
  }
}

const index = store.articles.findIndex((r) => r.id === article.id || r.slug === SLUG);
if (index >= 0) store.articles[index] = article;
else store.articles.unshift(article);

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG, "blocks", blocks.length, "faqs", faqs.length, "articles", store.articles.length);

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(SLUG)) {
  const needle = "- [Blogs](https://gaf.healthcare/blogs):";
  if (llms.includes(needle)) {
    llms = llms.replace(
      needle,
      `- [Blogs](https://gaf.healthcare/blogs): includes [breast cancer in men](https://gaf.healthcare/blogs/${SLUG}).`,
    );
  } else {
    llms += `\n- [Breast cancer in men](https://gaf.healthcare/blogs/${SLUG})\n`;
  }
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

for (const relatedSlug of [
  "breast-cancer-prevention",
  "breast-cancer-symptoms",
  "breast-cancer-diagnosis",
  "breast-cancer-diagnosis-tests-biopsy-er-pr-her2",
  "breast-biopsy-breast-cancer-india",
  "breast-cancer-surgery-in-india",
  "breast-cancer-chemotherapy-in-india",
  "breast-cancer-radiation-therapy-in-india",
  "hormone-therapy-for-breast-cancer-in-india",
  "breast-cancer-treatment-cost-in-india",
  "breast-cancer-treatment-india-international-patients",
]) {
  const related = store.articles.find((r) => r.slug === relatedSlug);
  if (!related) continue;
  const href = `/blogs/${SLUG}`;
  related.relatedLinks = related.relatedLinks || [];
  if (!related.relatedLinks.some((r) => r.href === href)) {
    related.relatedLinks.push({ label: "Breast cancer in men", href });
  }
}
writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("linked related articles");
