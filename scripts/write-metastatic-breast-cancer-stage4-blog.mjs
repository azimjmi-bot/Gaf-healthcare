#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const SLUG = "metastatic-breast-cancer-stage-4";
const CHEMO = "/costs/India/Medical-Oncology/Chemotherapy";
const NEOADJ = "/costs/India/Medical-Oncology/Neoadjuvant-Chemotherapy";
const ADJ = "/costs/India/Medical-Oncology/Adjuvant-Chemotherapy";
const IMMUNO = "/costs/India/Medical-Oncology/Immunotherapy";
const TARGETED = "/costs/India/Medical-Oncology/Targeted-Therapy";
const PRECISION = "/costs/India/Medical-Oncology/Precision-Oncology";
const HORMONE = "/costs/India/Medical-Oncology/Hormone-Therapy";
const EBRT = "/costs/India/Radiation-Oncology/EBRT";
const SBRT = "/costs/India/Radiation-Oncology/SBRT";
const LUMPECTOMY = "/costs/India/Surgical-Oncology/Lumpectomy";
const MASTECTOMY = "/costs/India/Surgical-Oncology/Mastectomy";
const RECON = "/costs/India/Surgical-Oncology/Breast-Reconstruction";
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
const IBC = "/blogs/inflammatory-breast-cancer-treatment-india";
const ERPR = "/blogs/er-pr-her2-breast-cancer-treatment-india";
const DIAG = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const DIAG_ALT = "/blogs/breast-cancer-diagnosis";
const SYMPTOMS = "/blogs/breast-cancer-symptoms";
const STAGES = "/blogs/breast-cancer-stages";
const OPTIONS = "/blogs/breast-cancer-treatment-options";
const COST_BLOG = "/blogs/breast-cancer-treatment-cost-in-india";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const YOUNG = "/blogs/breast-cancer-in-young-women-treatment-india";
const RECUR = "/blogs/breast-cancer-recurrence-treatment-india";
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

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>What is metastatic / Stage 4 breast cancer?</strong></td><td>Breast cancer that has spread to distant organs such as bones, liver, lungs or brain</td></tr><tr><td><strong>Curable?</strong></td><td>Generally not considered curable — modern systemic treatment can often control disease and relieve symptoms</td></tr><tr><td><strong>Main treatment</strong></td><td>Systemic therapy by subtype: hormone ± CDK4/6, HER2-targeted, chemotherapy, immunotherapy when eligible</td></tr><tr><td><strong>Surgery / radiation</strong></td><td>Surgery selective; radiation often for bone pain, brain mets or local symptoms</td></tr><tr><td><strong>Life expectancy</strong></td><td>Highly variable — US SEER distant disease 5-year relative survival ~33.8% (2016–2022); not an individual prediction</td></tr><tr><td><strong>Planning ranges</strong></td><td><a href="${HORMONE}">Hormone therapy</a> $1,000–$4,500 · <a href="${TARGETED}">targeted</a> $8,000–$30,000 · <a href="${CHEMO}">chemo</a> $1,500–$8,000+ · <a href="${IMMUNO}">immuno</a> $15,000–$45,000</td></tr><tr><td><strong>India planning</strong></td><td><a href="${TX_BREAST}">Breast cancer treatment in India</a> · filter <a href="${MED_DOCS}">medical oncologists</a> by city</td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>Metastatic breast cancer treatment in India</strong> is planned around ER/PR/HER2 status, metastatic sites and prior therapy. GAF figures are partner planning ranges, not hospital quotations.</p></aside>`;

const stageDiffTable = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Stage 3 breast cancer</th><th>Stage 4 breast cancer</th></tr></thead><tbody><tr><td>Cancer spread</td><td>Locally advanced — nearby tissues or nodes</td><td>Distant organs or sites</td></tr><tr><td>Distant metastasis</td><td>No</td><td>Yes</td></tr><tr><td>Treatment objective</td><td>Often curative intent</td><td>Usually long-term control and symptom relief</td></tr><tr><td>Surgery</td><td>Often important</td><td>Used selectively</td></tr><tr><td>Main treatment</td><td>Systemic therapy, surgery and radiation</td><td>Primarily systemic therapy; local treatment when needed</td></tr></tbody></table></div>`;

const emergencyTable = `<div class="md-body"><table><thead><tr><th>Symptom</th><th>Why it matters</th></tr></thead><tbody><tr><td>New severe back pain with leg weakness or numbness</td><td>Possible spinal cord compression</td></tr><tr><td>Loss of bladder or bowel control</td><td>Possible spinal cord or nerve compression</td></tr><tr><td>Seizure or sudden confusion</td><td>Possible brain involvement or neurological emergency</td></tr><tr><td>Sudden or severe breathlessness</td><td>Possible lung complication, infection or blood clot</td></tr><tr><td>Severe chest pain</td><td>Requires urgent assessment</td></tr><tr><td>Yellowing of eyes with worsening illness</td><td>Possible significant liver dysfunction</td></tr><tr><td>Sudden severe bone pain or inability to bear weight</td><td>Possible fracture</td></tr></tbody></table></div>`;

const subtypeTable = `<div class="md-body"><table><thead><tr><th>Subtype</th><th>Key characteristics</th><th>General treatment approach</th></tr></thead><tbody><tr><td>HR-positive, HER2-negative</td><td>ER and/or PR positive, HER2 negative</td><td>Hormone therapy, often with CDK4/6 inhibitors</td></tr><tr><td>HER2-positive</td><td>HER2 overexpression or amplification</td><td>HER2-targeted therapy, often with chemotherapy</td></tr><tr><td>Triple-negative</td><td>ER, PR and HER2 negative</td><td>Chemotherapy; immunotherapy in eligible patients; other options</td></tr><tr><td>HER2-low</td><td>Lower HER2 expression without conventional HER2-positive status</td><td>Certain antibody-drug conjugates in eligible patients</td></tr></tbody></table></div>`;

const imagingTable = `<div class="md-body"><table><thead><tr><th>Investigation</th><th>Why it may be recommended</th></tr></thead><tbody><tr><td>CT chest/abdomen/pelvis</td><td>Assess organs and lymph nodes</td></tr><tr><td>PET-CT</td><td>Evaluate suspected active disease throughout the body</td></tr><tr><td>Bone scan</td><td>Assess possible bone involvement</td></tr><tr><td>Brain MRI</td><td>Neurological symptoms or suspected brain metastases</td></tr><tr><td>Spine MRI</td><td>Spinal involvement or cord compression concern</td></tr><tr><td>Abdominal ultrasound</td><td>Examine liver and other abdominal organs</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Named pathway</th><th>GAF planning range in India</th><th>Typical notes</th></tr></thead><tbody><tr><td><a href="${HORMONE}">Hormone therapy</a></td><td>$1,000–$4,500</td><td>Common first-line backbone for HR+/HER2− disease</td></tr><tr><td><a href="${TARGETED}">Targeted therapy</a></td><td>$8,000–$30,000</td><td>HER2-directed, CDK4/6 partners, PI3K/AKT and other eligible drugs</td></tr><tr><td><a href="${CHEMO}">Chemotherapy</a></td><td>$1,500–$8,000+</td><td>TNBC, rapid progression or selected other settings</td></tr><tr><td><a href="${IMMUNO}">Immunotherapy</a></td><td>$15,000–$45,000</td><td>Selected PD-L1+ metastatic TNBC</td></tr><tr><td><a href="${PRECISION}">Precision oncology</a></td><td>$2,000–$7,000</td><td>BRCA / PIK3CA / ESR1 / PD-L1 and related testing pathways</td></tr><tr><td><a href="${EBRT}">EBRT</a></td><td>$1,000–$6,000+</td><td>Bone pain, local control, selected CNS plans</td></tr><tr><td><a href="${SBRT}">SBRT</a></td><td>$8,000–$17,500</td><td>Selected focused metastatic-site radiation</td></tr><tr><td><a href="${MASTECTOMY}">Mastectomy</a></td><td>$4,500–$10,000</td><td>Selected local complications only — not routine Stage 4 care</td></tr></tbody></table></div>`;

const survivalTable = `<div class="md-body"><table><thead><tr><th>Breast cancer subtype (distant disease)</th><th>Five-year relative survival (SEER)</th></tr></thead><tbody><tr><td>All distant breast cancer (women, 2016–2022)</td><td>33.8%</td></tr><tr><td>HR-positive, HER2-negative</td><td>38.1%</td></tr><tr><td>HR-positive, HER2-positive</td><td>48.7%</td></tr></tbody></table></div>`;

const faqs = [
  ["Is Stage 4 breast cancer curable?", "Stage 4 breast cancer is generally not considered curable with standard treatment. However, it can often be treated and controlled. Some patients live for several years with appropriate treatment, although outcomes vary widely."],
  ["Where does breast cancer spread first?", "There is no fixed order. Breast cancer commonly spreads to the bones, liver, lungs and brain. The pattern depends on biology and individual factors."],
  ["Can breast cancer spread to the bones?", "Yes. Bone metastases are common and may cause persistent pain, fractures or high calcium levels. Treatment may include systemic medicines, radiation and bone-modifying agents."],
  ["Can breast cancer spread to the brain?", "Yes. Brain metastases may cause headaches, seizures, weakness, balance problems, vision changes or confusion. MRI is commonly used when brain involvement is suspected."],
  ["Can Stage 4 breast cancer be treated with chemotherapy?", "Yes. Chemotherapy is important particularly for triple-negative disease, rapidly progressing cancer or situations where hormone-based treatment is not suitable."],
  ["Is immunotherapy used for Stage 4 breast cancer?", "Immunotherapy may be used for selected patients, particularly certain PD-L1-positive metastatic triple-negative breast cancers. Eligibility depends on indication and test results."],
  ["Does every patient with metastatic breast cancer need surgery?", "No. Systemic therapy is usually the main treatment. Surgery may be considered for local symptoms or selected clinical situations."],
  ["Can Stage 4 breast cancer return after treatment?", "Metastatic breast cancer may respond and later progress again. Doctors may then recommend another line of treatment based on current disease characteristics and health."],
  ["Can hormone receptor-positive breast cancer spread years later?", "Yes. Hormone receptor-positive breast cancer can recur many years after the original diagnosis. Long-term follow-up and attention to new symptoms remain important."],
  ["What is the life expectancy of someone with Stage 4 breast cancer?", "There is no universal life expectancy. It depends on subtype, affected organs, treatment response, general health and available options. Population statistics cannot predict an individual outcome."],
  ["Is Stage 4 breast cancer treatment available in India?", "Yes. Oncology centres in India provide chemotherapy, hormone therapy, targeted therapy, immunotherapy and radiation. Confirm specific medicine and technology availability with the proposed hospital."],
  ["How much does Stage 4 breast cancer treatment cost in India?", "Costs depend on subtype, medicines, duration, investigations and hospital. A personalised itemised estimate is more useful than a general price because metastatic treatment often continues over time."],
  ["Should a patient get a second opinion after being diagnosed with metastatic breast cancer?", "A second opinion can help review pathology, imaging, biomarkers and alternatives. It should not delay urgent treatment."],
  ["Can patients with metastatic breast cancer continue normal activities?", "Many patients continue some usual activities while receiving treatment, depending on symptoms, side effects and overall health. The treating team can advise on work, travel and exercise."],
  ["When should a patient seek emergency care?", "New seizures, sudden weakness, severe headache, loss of bladder or bowel control, severe back pain with neurological symptoms, sudden breathlessness or severe chest pain require urgent assessment."],
];

const RELATED = [
  ["Breast cancer treatment in India", TX_BREAST],
  ["Breast cancer recurrence treatment", RECUR],
  ["Breast cancer stages", STAGES],
  ["Breast cancer treatment options", OPTIONS],
  ["Breast cancer symptoms", SYMPTOMS],
  ["Breast cancer diagnosis", DIAG_ALT],
  ["Breast cancer diagnosis tests (ER/PR/HER2)", DIAG],
  ["ER/PR/HER2 results explained", ERPR],
  ["Hormone therapy for breast cancer", HT_BLOG],
  ["Targeted therapy for breast cancer", TARGETED_BLOG],
  ["HER2-positive breast cancer", HER2],
  ["Triple-negative breast cancer", TNBC],
  ["Inflammatory breast cancer", IBC],
  ["Chemotherapy for breast cancer", CHEMO_ALT],
  ["Breast cancer chemotherapy in India", CHEMO_BLOG],
  ["Radiation therapy for breast cancer", RAD_BLOG],
  ["Breast cancer surgery in India", SURGERY],
  ["Breast cancer in young women", YOUNG],
  ["Breast cancer treatment cost in India", COST_BLOG],
  ["International patients", INTL],
  ["Chemotherapy in India", TX_CHEMO],
  ["Immunotherapy in India", TX_IMMUNO],
  ["Targeted therapy in India", TX_TARGETED],
  ["Medical oncology doctors", MED_DOCS],
  ["Medical oncology hospitals", MED_HOSP],
];

const IMG1 = "/uploads/articles/metastatic-breast-cancer-overview.webp";
const IMG2 = "/uploads/articles/metastatic-breast-cancer-bone-mets.webp";
const IMG3 = "/uploads/articles/metastatic-breast-cancer-staging-imaging.webp";
const IMG4 = "/uploads/articles/metastatic-breast-cancer-systemic-therapy.webp";

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("**Metastatic breast cancer**, also called **Stage 4 breast cancer**, occurs when cancer cells spread from the breast to distant parts of the body. Although it is generally not considered curable, modern treatments can often control the disease, reduce symptoms and help patients live longer. This guide explains symptoms, diagnosis, treatment options, life expectancy and care available for [breast cancer treatment in India](" + TX_BREAST + ")."),
  p("Related reading: [stages](" + STAGES + "), [recurrence](" + RECUR + "), [ER/PR/HER2](" + ERPR + "), [HER2-positive disease](" + HER2 + "), [triple-negative disease](" + TNBC + "), [hormone therapy](" + HT_BLOG + "), [targeted therapy](" + TARGETED_BLOG + ") and [treatment cost](" + COST_BLOG + ")."),
  btn("Ask GAF to review Stage 4 breast cancer reports", consult("Metastatic Breast Cancer Treatment")),
  p("[WhatsApp +91 90443 46292 with pathology, staging scans and prior treatment](" + wa("Please review my Stage 4 / metastatic breast cancer reports and advise on treatment options and cost in India.") + ")"),
  img(IMG1, "Woman in oncology consultation beside a circular body diagram showing breast cancer with distant spread pathways to organs", "Stage 4 breast cancer means distant spread — systemic medicines are usually the mainstay of treatment."),

  h2("What is metastatic breast cancer?"),
  p("Metastatic breast cancer has spread beyond the breast and nearby lymph nodes to distant sites. It is also called Stage 4 or distant breast cancer. Cells travel through blood or lymph and form deposits in other organs — most commonly bones, liver, lungs, brain and distant lymph nodes."),
  p("If breast cancer spreads to bone, it is still metastatic breast cancer — not a new primary bone cancer. Some patients present with *de novo* Stage 4 disease; others develop distant recurrence months or years after earlier-stage treatment."),
  p("Treatment differs from early-stage care: the focus is usually medicines that work throughout the body rather than only removing the breast tumour."),

  h2("What is the difference between Stage 3 and Stage 4 breast cancer?"),
  { id: id("html"), type: "html", html: stageDiffTable },
  p("Stage 3 may involve extensive local/regional disease without distant metastasis. Stage 4 means distant spread is present. Broader context: [breast cancer stages](" + STAGES + ")."),

  h2("How does breast cancer spread to other parts of the body?"),
  ul([
    "**Bloodstream** — cells travel to organs such as liver, lungs, bones and brain",
    "**Lymphatic system** — cells move through lymphatic vessels and nodes, then potentially further",
  ]),
  p("Not every patient develops metastases in the same organs. Pattern of spread, number of organs involved and subtype all influence decisions."),

  h2("Symptoms of metastatic breast cancer"),
  p("Symptoms depend on where cancer has spread. These symptoms do not automatically mean metastasis — doctors use assessment and investigations to find the cause. Symptom overview: [breast cancer symptoms](" + SYMPTOMS + ")."),
  h3("Breast cancer that has spread to the bones"),
  p("Bones are among the most common metastatic sites."),
  ul([
    "Persistent pain in the back, hips, ribs or other bones",
    "Pain worse at night or with movement",
    "Tenderness over an affected bone; difficulty walking",
    "Fractures after minor injuries",
    "High blood calcium — nausea, constipation, thirst, confusion or weakness",
  ]),
  p("Spinal involvement with new severe back pain, leg weakness, numbness, walking difficulty or loss of bladder/bowel control needs **emergency** assessment."),
  img(IMG2, "Woman discussing bone symptoms with a clinician beside a circular skeleton diagram highlighting metastatic deposits in spine and pelvis", "Bone metastases are common and may cause pain, fracture risk or high calcium levels."),

  h3("Breast cancer that has spread to the liver"),
  ul([
    "Upper-right abdominal pain or discomfort",
    "Loss of appetite, unexplained weight loss, nausea, fatigue",
    "Abdominal swelling; yellowing of skin or eyes; dark urine",
  ]),
  p("Some liver metastases are found on imaging or blood tests without noticeable symptoms."),

  h3("Breast cancer that has spread to the lungs"),
  ul([
    "Persistent cough, breathlessness, chest discomfort",
    "Pain while breathing; coughing up blood in some cases",
    "Repeated respiratory symptoms",
  ]),
  p("New or worsening breathlessness should be assessed promptly — infection, clots or fluid around the lungs can also cause it."),

  h3("Breast cancer that has spread to the brain"),
  ul([
    "Persistent or worsening headaches; seizures",
    "Blurred or double vision; arm or leg weakness",
    "Speech difficulty, balance loss, confusion or behaviour change",
    "Nausea and vomiting with other neurological symptoms",
  ]),
  p("A new seizure, sudden weakness, confusion or severe headache needs urgent evaluation."),

  h3("Breast cancer that has spread to distant lymph nodes"),
  ul([
    "Swelling in the neck or above the collarbone",
    "Enlarged distant node regions; local discomfort or pressure",
  ]),

  h2("When should a patient seek emergency medical attention?"),
  { id: id("html"), type: "html", html: emergencyTable },
  p("If any of these occur, seek emergency care rather than waiting for a routine oncology appointment."),

  h2("Can breast cancer spread years after treatment?"),
  p("Yes. Distant recurrence can occur months, years or sometimes decades later — particularly relevant for some hormone receptor-positive cancers. See also [breast cancer recurrence](" + RECUR + "). When distant sites are involved, doctors generally reassess with imaging and, where feasible, a new biopsy because receptor status can change."),

  h2("Types of metastatic breast cancer"),
  p("Treatment depends heavily on ER, PR and HER2. Detail: [ER/PR/HER2 explained](" + ERPR + ")."),
  { id: id("html"), type: "html", html: subtypeTable },
  p("Two patients with Stage 4 disease may need completely different medicines even if metastases involve the same organ."),

  h2("How is metastatic breast cancer diagnosed?"),
  p("Doctors confirm spread, map extent and identify treatment-guiding markers. Diagnostic pathway context: [diagnosis guide](" + DIAG + ")."),
  ol([
    "**History and examination** — prior diagnosis/treatment, symptoms, receptor reports, medicines, general health",
    "**Biopsy of a metastatic site when feasible** — confirm breast cancer origin and reassess ER/PR/HER2",
    "**Imaging selected by clinical need** — CT, PET-CT, bone scan, brain/spine MRI, ultrasound",
    "**Blood tests** — blood counts, liver/kidney function, calcium, electrolytes; tumour markers only as adjuncts",
    "**Molecular/genetic testing when indicated** — germline BRCA, PIK3CA, ESR1, AKT1/PTEN, PD-L1 and others",
  ]),
  { id: id("html"), type: "html", html: imagingTable },
  img(IMG3, "Woman reviewing staging scan results with an oncologist beside a circular PET-style body diagram with soft activity markers", "Staging imaging and, when feasible, metastatic-site biopsy guide Stage 4 treatment choices."),
  btn("Request a second opinion on metastatic staging and biomarkers", consult("Metastatic Breast Cancer Second Opinion")),

  h2("Treatment of metastatic breast cancer in India"),
  p("Systemic therapy is usually primary. Plans depend on ER/PR/HER2, other biomarkers, organs involved, prior response, pace of progression, organ function and preferences. Overview: [treatment options](" + OPTIONS + ")."),
  img(IMG4, "Woman receiving outpatient systemic therapy counselling beside a circular diagram of hormone, HER2-targeted, chemotherapy and immunotherapy pathways", "Subtype-directed systemic therapy is the core of most Stage 4 breast cancer plans."),

  h2("Hormone therapy for HR-positive, HER2-negative metastatic disease"),
  p("Endocrine therapy ± a CDK4/6 inhibitor (ribociclib, palbociclib or abemaciclib) is a common initial approach. Options include aromatase inhibitors, fulvestrant, tamoxifen in selected cases and ovarian suppression for premenopausal patients. Guide: [hormone therapy for breast cancer](" + HT_BLOG + "). GAF [hormone therapy](" + HORMONE + ") planning is **$1,000–$4,500**."),

  h2("Targeted therapy for HR-positive, HER2-negative disease"),
  p("Depending on molecular results and prior therapy, selected patients may be considered for alpelisib (PIK3CA), capivasertib (PIK3CA/AKT1/PTEN), everolimus combinations, elacestrant or other oral endocrine agents for certain ESR1-mutated disease — subject to eligibility, approval and availability. Guide: [targeted therapy](" + TARGETED_BLOG + "). GAF [targeted therapy](" + TARGETED + ") **$8,000–$30,000**; [precision oncology](" + PRECISION + ") testing pathways **$2,000–$7,000**."),

  h2("HER2-targeted therapy for HER2-positive metastatic breast cancer"),
  p("Options may include trastuzumab, pertuzumab, trastuzumab deruxtecan (T-DXd), T-DM1, tucatinib combinations and other HER2-directed medicines. First-line dual HER2 blockade with a taxane is common in many settings; sequencing changes with evidence and availability. Brain metastases may need CNS-active regimens and/or stereotactic radiation. Guides: [HER2-positive breast cancer](" + HER2 + ") and [targeted therapy in India](" + TX_TARGETED + ")."),
  btn("Ask about HER2-positive Stage 4 treatment sequencing", consult("HER2 Metastatic Breast Cancer")),

  h2("Treatment for triple-negative metastatic breast cancer"),
  ul([
    "**Chemotherapy** — paclitaxel, docetaxel, carboplatin, cisplatin, capecitabine, eribulin and other regimens as selected",
    "**Immunotherapy** — pembrolizumab with chemotherapy for eligible PD-L1-positive metastatic TNBC",
    "**PARP inhibitors** — olaparib or talazoparib for selected germline BRCA1/2 carriers",
    "**Antibody-drug conjugates** — sacituzumab govitecan and other ADCs in eligible previously treated settings",
  ]),
  p("Detail: [TNBC guide](" + TNBC + "), [chemotherapy](" + CHEMO_BLOG + "), [immunotherapy in India](" + TX_IMMUNO + "). GAF [chemotherapy](" + CHEMO + ") **$1,500–$8,000+**; [immunotherapy](" + IMMUNO + ") **$15,000–$45,000**."),
  p("[WhatsApp GAF if you need help clarifying PD-L1, BRCA or ADC eligibility](" + wa("I need guidance on metastatic triple-negative breast cancer treatment options and eligibility in India.") + ")"),

  h2("Treatment for HER2-low metastatic breast cancer"),
  p("HER2-low is not the same as conventional HER2-positive disease. Some patients may be eligible for trastuzumab deruxtecan depending on hormone receptor status, prior treatment and indication. A detailed pathology report matters — not all HER2-negative cancers are biologically identical."),

  h2("Can surgery be performed for Stage 4 breast cancer?"),
  p("Surgery is not usually the main treatment because disease is already systemic. It may be considered for bleeding, ulcerating/infected wounds, significant local discomfort, selected complications or carefully chosen cases after multidisciplinary review. Removing the breast tumour does not remove distant deposits. Guide: [breast cancer surgery in India](" + SURGERY + ")."),

  h2("Role of radiation therapy in Stage 4 breast cancer"),
  p("Radiation can control symptoms and treat selected metastatic sites — painful bone mets, spinal cord threat, brain metastases, bleeding/painful breast tumours and pressure on nearby structures. Guide: [radiation therapy](" + RAD_BLOG + ")."),
  ul([
    "**Bone metastases** — pain relief; sessions may be single or multiple",
    "**Brain metastases** — stereotactic radiosurgery, whole-brain radiation or other approaches by lesion number/size/location",
    "**Spinal cord compression** — emergency pathway with imaging, steroids when indicated, radiation and/or surgery",
  ]),
  p("GAF [EBRT](" + EBRT + ") planning **$1,000–$6,000+**; selected focused plans may use [SBRT](" + SBRT + ") **$8,000–$17,500**."),

  h2("Treatment of bone metastases"),
  p("Alongside anticancer therapy, bone-modifying medicines such as zoledronic acid or denosumab may reduce certain skeletal complications. Dental assessment, kidney function (especially for zoledronic acid), calcium/vitamin D review and oral hygiene advice are often needed."),

  h2("What is palliative care in metastatic breast cancer?"),
  p("Palliative care focuses on symptoms, comfort and quality of life — and can run **alongside** active cancer treatment. It may help with pain, nausea, breathlessness, fatigue, appetite, sleep, anxiety and caregiver concerns. It should not be delayed until all anticancer options are exhausted."),

  h2("What is the life expectancy of someone with Stage 4 breast cancer?"),
  p("There is no single figure for everyone. Outlook depends on subtype, organs involved, vital-organ function, treatment response, prior therapy, general health and medicine access."),
  p("The US NCI SEER database reports a **33.8% five-year relative survival** for distant breast cancer among women diagnosed 2016–2022. This is a population estimate — not an individual India prediction."),
  { id: id("html"), type: "html", html: survivalTable },
  p("Some patients live for many years with metastatic disease when treatments work well. Care often involves successive treatment lines to maintain control while protecting independence and comfort."),

  h2("What is the cost of metastatic breast cancer treatment in India?"),
  p("Costs vary widely because treatment often continues over time. There is no reliable single package price. Use named GAF planning ranges for oncology components:"),
  { id: id("html"), type: "html", html: costTable },
  p("Oral endocrine therapy budgets differ sharply from regular targeted/immunotherapy infusions. Brand vs biosimilar options, cycle count, admissions, complications and radiation/surgery add further variation. Request an itemised estimate based on the actual plan. Wider context: [breast cancer treatment cost in India](" + COST_BLOG + ")."),
  btn("Request a written Stage 4 treatment estimate", consult("Metastatic Breast Cancer Cost Estimate")),
  p("[WhatsApp +91 90443 46292 for a personalised estimate](" + wa("Please provide a personalised Stage 4 metastatic breast cancer treatment estimate in India.") + ")"),

  h2("Why do international patients consider treatment in India?"),
  ul([
    "Multidisciplinary oncology input — medical, surgical and radiation oncology, radiology, pathology and palliative care",
    "Access to chemotherapy, hormone therapy, targeted therapy, immunotherapy and radiation/SBRT when available",
    "Pathology and scan review of overseas records before finalising plans",
    "Need for clear continuity after returning home — medicine access and follow-up",
  ]),
  p("City filters: [Delhi NCR](" + DELHI + "), [Mumbai](" + MUMBAI + "), [Bengaluru](" + BLR + "), [Chennai](" + CHN + "), [Hyderabad](" + HYD + "). Also [medical](" + MED_DOCS + "), [surgical](" + SURG_DOCS + ") and [radiation](" + RAD_DOCS + ") directories and [medical oncology hospitals](" + MED_HOSP + "). Practical sequencing: [international patient guide](" + INTL + ")."),
  p("Do not travel or delay urgent care solely for an overseas consultation. Emergency symptoms need immediate local attention."),

  h2("How can GAF Healthcare help international patients?"),
  p("GAF helps connect patients with oncology specialists and hospitals, organise records for review, coordinate consultations/second opinions, clarify proposed investigations and schedules, and support travel-related coordination. Final diagnosis and treatment decisions remain with the treating clinical team."),
  btn("Start an international Stage 4 records review", consult("Breast Cancer Treatment in India")),

  h2("Documents to carry when travelling to India"),
  ol([
    "Original breast biopsy; ER/PR/HER2 (± ISH/FISH); any metastatic-site biopsy",
    "Surgery, chemotherapy, hormone/targeted therapy and radiation summaries",
    "CT/MRI/PET-CT/bone scan reports plus imaging discs or digital files",
    "Genetic/molecular results and recent blood tests",
    "Current medicine list, allergies, prior side effects and symptom summary",
  ]),
  p("If available, bring pathology slides or paraffin blocks — the receiving hospital will advise whether review is needed."),

  h2("Living with metastatic breast cancer: practical advice"),
  ul([
    "Report new or worsening symptoms promptly; keep a simple symptom diary",
    "Do not stop or change cancer medicines without discussing with the oncologist",
    "Use balanced nutrition — avoid unverified cancer diets and risky supplements",
    "Stay active within safe limits, especially with bone metastases",
    "Seek counselling, support groups and palliative-care help for patients and caregivers",
  ]),

  h2("Frequently asked questions about metastatic breast cancer"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Final thoughts"),
  p("A Stage 4 diagnosis is serious, but treatment options have expanded. Hormone therapy, targeted medicines, chemotherapy, selected immunotherapy, radiation and supportive care can control disease and protect quality of life when matched to subtype, biomarkers, prior therapy and health. For care in India, start with a careful review of pathology, receptors, scans and prior records — then decide with a multidisciplinary team."),
  btn("Discuss the next metastatic breast cancer treatment step with GAF", consult("Metastatic Breast Cancer Treatment")),

  h2("Recommended further reading"),
  ul(RELATED.map(([label, href]) => `[${label}](${href})`)),

  h2("Medical sources and references"),
  ol([
    "[NCI — Metastatic Breast Cancer](https://www.cancer.gov/types/breast/stages/metastatic-breast-cancer)",
    "[NCCN Guidelines for Patients — Metastatic Breast Cancer, 2026](https://vicc.org/sites/default/files/2026-09/stage_iv_breast-patient.pdf)",
    "[NCI — Breast Cancer Survival Rates](https://www.cancer.gov/types/breast/survival)",
    "[ICMR — Standard Treatment Workflows](https://www.icmr.gov.in/standard-treatment-workflows-stws)",
    "[American Cancer Society — Breast Cancer](https://www.cancer.org/cancer/types/breast-cancer.html)",
    "[NCI — Targeted Cancer Therapies](https://www.cancer.gov/about-cancer/treatment/types/targeted-therapies)",
  ]),
  p("*This article is for patient education and does not replace an individual medical consultation. Treatment decisions should be made by a qualified oncology team after reviewing history, pathology, imaging and biomarkers. Drug approvals, availability and guidelines may change. GAF cost figures are partner planning ranges, not fixed hospital quotations.*"),
];

const now = "2026-11-12T19:00:00.000Z";
const article = {
  id: "art_metastatic_breast_cancer_stage_4",
  slug: SLUG,
  title:
    "Metastatic Breast Cancer (Stage 4): Symptoms, Treatment, Life Expectancy and Care in India",
  excerpt:
    "Metastatic breast cancer, also called Stage 4 breast cancer, occurs when cancer cells spread from the breast to distant parts of the body. Although it is generally not considered curable, modern treatments can often control the disease, reduce symptoms and help patients live longer. This guide explains its symptoms, diagnosis, treatment options, life expectancy and care available in India.",
  date: "12 Nov 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare Editorial",
  category: "Medical Oncology",
  tags: [
    "breast cancer",
    "metastatic breast cancer",
    "Stage 4",
    "targeted therapy",
    "India",
    "cost",
  ],
  image: IMG1,
  imageAlt:
    "Woman in oncology consultation beside a circular body diagram showing breast cancer with distant spread pathways to organs",
  status: "published",
  featured: false,
  seoTitle:
    "Metastatic Breast Cancer (Stage 4): Symptoms, Treatment and Life Expectancy in India",
  seoDescription:
    "Understand Stage 4 breast cancer, its symptoms, diagnosis, treatment options, survival outlook and the cost of metastatic breast cancer treatment in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: IMG1,
  allowIndex: true,
  keywords: [
    "Metastatic breast cancer treatment in India",
    "Stage 4 breast cancer treatment",
    "Metastatic breast cancer symptoms",
    "Stage 4 breast cancer life expectancy",
    "Breast cancer spread to bones",
    "Breast cancer spread to liver",
    "Breast cancer spread to lungs",
    "Breast cancer spread to brain",
    "HER2-positive metastatic breast cancer",
    "Triple-negative metastatic breast cancer",
    "Hormone receptor-positive metastatic breast cancer",
    "Stage 4 breast cancer cost in India",
    "Advanced breast cancer treatment in India",
  ],
  relatedLinks: RELATED.map(([label, href]) => ({ label, href })),
  blocks,
};

if (!store.categories.includes("Medical Oncology")) store.categories.push("Medical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["metastatic-breast-cancer-overview.webp", article.imageAlt],
  [
    "metastatic-breast-cancer-bone-mets.webp",
    "Woman discussing bone symptoms with a clinician beside a circular skeleton diagram highlighting metastatic deposits in spine and pelvis",
  ],
  [
    "metastatic-breast-cancer-staging-imaging.webp",
    "Woman reviewing staging scan results with an oncologist beside a circular PET-style body diagram with soft activity markers",
  ],
  [
    "metastatic-breast-cancer-systemic-therapy.webp",
    "Woman receiving outpatient systemic therapy counselling beside a circular diagram of hormone, HER2-targeted, chemotherapy and immunotherapy pathways",
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
      `- [Blogs](https://gaf.healthcare/blogs): includes [metastatic breast cancer Stage 4](https://gaf.healthcare/blogs/${SLUG}).`,
    );
  } else {
    llms += `\n- [Metastatic breast cancer Stage 4](https://gaf.healthcare/blogs/${SLUG})\n`;
  }
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
} else {
  console.log("llms.txt already lists slug");
}

for (const relatedSlug of [
  "inflammatory-breast-cancer-treatment-india",
  "her2-positive-breast-cancer-treatment-india",
  "triple-negative-breast-cancer-treatment-india",
  "breast-cancer-recurrence-treatment-india",
  "breast-cancer-chemotherapy-in-india",
  "hormone-therapy-for-breast-cancer-in-india",
  "targeted-therapy-for-breast-cancer-in-india",
  "breast-cancer-treatment-cost-in-india",
]) {
  const related = store.articles.find((row) => row.slug === relatedSlug);
  if (!related) continue;
  const href = `/blogs/${SLUG}`;
  related.relatedLinks = related.relatedLinks || [];
  if (!related.relatedLinks.some((row) => row.href === href)) {
    related.relatedLinks.push({ label: "Metastatic breast cancer (Stage 4)", href });
  }
  for (let i = 0; i < related.blocks.length; i++) {
    if (related.blocks[i].type === "heading" && /Related Reading|Recommended further reading/i.test(related.blocks[i].text || "")) {
      for (let j = i + 1; j < Math.min(i + 5, related.blocks.length); j++) {
        if (related.blocks[j].type === "list" && !related.blocks[j].items.some((item) => item.includes(href))) {
          related.blocks[j].items.push(`[Metastatic Breast Cancer (Stage 4) Treatment in India](${href})`);
        }
      }
      break;
    }
  }
}
writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("linked from related breast articles");
