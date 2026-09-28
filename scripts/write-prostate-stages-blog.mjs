import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const PILLAR = "/treatments/prostate-cancer-treatment-in-india";
const OPTIONS = "/blogs/prostate-cancer-treatment-options-india";
const NONSURG = "/blogs/prostate-cancer-treatment-without-surgery";
const RARP = "/blogs/robotic-prostatectomy-in-india";
const RAD = "/blogs/radiation-therapy-for-prostate-cancer";
const BRACHY_BLOG = "/blogs/brachytherapy-for-prostate-cancer";
const DIET = "/blogs/prostate-cancer-diet";
const RECUR = "/blogs/prostate-cancer-recurrence-after-surgery";
const AS = "/blogs/active-surveillance-prostate-cancer";
const DX = "/blogs/prostate-cancer-diagnosis-psa-mri-biopsy-psma-pet";
const SX = "/blogs/prostate-cancer-symptoms";
const GG = "/blogs/gleason-score-grade-group-prostate-cancer";
const STAGES = "/blogs/prostate-cancer-stages-1-to-4";
const EBRT = "/costs/India/Radiation-Oncology/EBRT";
const IMRT = "/costs/India/Radiation-Oncology/IMRT";
const BRACHY = "/costs/India/Radiation-Oncology/Brachytherapy";
const RP = "/costs/India/Surgical-Oncology/Radical-Prostatectomy";
const HT = "/costs/India/Medical-Oncology/Hormone-Therapy";
const CHEMO = "/costs/India/Medical-Oncology/Chemotherapy";
const RAD_DOCS = "/doctors/India/Radiation-Oncology";
const SURG_DOCS = "/doctors/India/Surgical-Oncology";
const MED_DOCS = "/doctors/India/Medical-Oncology";
const SURG_HOSP = "/hospitals/India/Surgical-Oncology";

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

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body"><strong>What are the stages of prostate cancer?</strong></p><ul class="article-quick-answer__list"><li><strong>Stage 1:</strong> Cancer is generally confined to the prostate and has low-risk features.</li><li><strong>Stage 2:</strong> Cancer remains within the prostate but has higher-risk features or a larger/local tumour extent.</li><li><strong>Stage 3:</strong> Cancer has higher-risk features and/or has extended outside the prostate into nearby tissues or seminal vesicles, depending on the subgroup.</li><li><strong>Stage 4:</strong> Cancer has reached nearby lymph nodes or distant parts of the body.</li></ul><p class="article-quick-answer__body"><strong>Which stage is curable?</strong></p><p class="article-quick-answer__body">Many <strong>Stage 1, Stage 2 and selected Stage 3 prostate cancers can be treated with curative intent</strong>.</p><p class="article-quick-answer__body">Stage 4 disease is more complex. Stage 4A involving regional lymph nodes may still be managed aggressively in selected patients. Stage 4B, where cancer has spread to distant sites, is generally treated as advanced metastatic disease, with the goal often being long-term disease control rather than cure.</p><p class="article-quick-answer__body"><strong>What is the most important factor in prostate cancer prognosis?</strong></p><p class="article-quick-answer__body">Stage is important, but prognosis also depends on:</p><ul class="article-quick-answer__list"><li>PSA</li><li>Gleason score</li><li>Grade Group</li><li>Tumour extent</li><li>Lymph-node involvement</li><li>Metastases</li><li>PSA doubling time in recurrent disease</li><li>Response to treatment</li><li>Age and overall health</li><li>Other medical conditions</li></ul><p class="article-quick-answer__body"><strong>What is the 5-year survival rate for prostate cancer?</strong></p><p class="article-quick-answer__body">According to the American Cancer Society's current SEER-based data for men diagnosed from 2015–2021, the 5-year relative survival is <strong>greater than 99% for localized disease, greater than 99% for regional disease and 38% for distant disease</strong>. These are population statistics and cannot predict an individual patient's outcome.</p></aside>`;

const ggTable = `<div class="md-body"><table><thead><tr><th>Grade Group</th><th>Typical Gleason score</th><th>General description</th></tr></thead><tbody><tr><td>Grade Group 1</td><td>6 or less</td><td>Lower-grade disease</td></tr><tr><td>Grade Group 2</td><td>3+4=7</td><td>Intermediate-grade disease</td></tr><tr><td>Grade Group 3</td><td>4+3=7</td><td>Higher-risk pattern within Gleason 7</td></tr><tr><td>Grade Group 4</td><td>8</td><td>High-grade disease</td></tr><tr><td>Grade Group 5</td><td>9–10</td><td>Very high-grade disease</td></tr></tbody></table></div>`;

const txTable = `<div class="md-body"><table><thead><tr><th>Stage</th><th>Typical disease extent</th><th>Common treatment approaches</th></tr></thead><tbody><tr><td>Stage 1</td><td>Localized, usually low-risk</td><td>Active surveillance, surgery, radiation, selected brachytherapy</td></tr><tr><td>Stage 2</td><td>Localized but higher-risk features</td><td>Surveillance in selected cases, surgery, radiation, brachytherapy, selected ADT</td></tr><tr><td>Stage 3</td><td>High-risk and/or locally advanced</td><td>Radiation + ADT, selected surgery, brachytherapy boost, systemic therapy</td></tr><tr><td>Stage 4A</td><td>Regional lymph nodes</td><td>Systemic therapy, radiation, selected multimodal treatment</td></tr><tr><td>Stage 4B</td><td>Distant metastases</td><td>ADT + systemic therapy, chemotherapy, targeted therapy, radiation for selected sites, radioligand therapy</td></tr></tbody></table></div>`;

const seerTable = `<div class="md-body"><table><thead><tr><th>SEER extent of disease</th><th>5-year relative survival</th></tr></thead><tbody><tr><td>Localized</td><td>&gt;99%</td></tr><tr><td>Regional</td><td>&gt;99%</td></tr><tr><td>Distant</td><td>38%</td></tr><tr><td>All stages combined</td><td>98%</td></tr></tbody></table></div>`;

const sxTable = `<div class="md-body"><table><thead><tr><th>Stage</th><th>Possible symptoms</th></tr></thead><tbody><tr><td>Stage 1</td><td>Often no symptoms</td></tr><tr><td>Stage 2</td><td>Often no symptoms; urinary symptoms may occur</td></tr><tr><td>Stage 3</td><td>Urinary or pelvic symptoms may occur</td></tr><tr><td>Stage 4</td><td>Urinary symptoms, bone pain, fatigue or other metastatic symptoms may occur</td></tr></tbody></table></div>`;

const testsTable = `<div class="md-body"><table><thead><tr><th>Test</th><th>What it helps assess</th></tr></thead><tbody><tr><td>PSA</td><td>Prostate cancer marker and risk assessment</td></tr><tr><td>Digital rectal examination</td><td>Local prostate abnormality</td></tr><tr><td>MRI</td><td>Local tumour extent</td></tr><tr><td>Biopsy</td><td>Confirms cancer and determines grade</td></tr><tr><td>Gleason score</td><td>Tumour grade</td></tr><tr><td>Grade Group</td><td>Simplified tumour-grade classification</td></tr><tr><td>CT</td><td>Anatomy and selected metastatic assessment</td></tr><tr><td>Bone scan</td><td>Bone disease</td></tr><tr><td>PSMA PET/CT</td><td>Molecular whole-body staging and recurrence assessment</td></tr><tr><td>Testosterone</td><td>Important during ADT and advanced disease monitoring</td></tr></tbody></table></div>`;

const faqs = [
  ["What are the four stages of prostate cancer?", "Stage 1 is generally localized low-risk disease. Stage 2 is localized disease with higher-risk features. Stage 3 includes higher PSA, high-grade disease or extension into nearby structures. Stage 4 involves regional lymph nodes or distant spread."],
  ["Is Stage 1 prostate cancer serious?", "It is cancer and requires appropriate medical evaluation, but many Stage 1 cancers are low risk and may be managed with active surveillance rather than immediate treatment."],
  ["Can Stage 1 prostate cancer be cured?", "Many appropriately selected Stage 1 cancers can be treated with curative intent, although some low-risk cancers may be safely monitored."],
  ["Is Stage 2 prostate cancer curable?", "Many Stage 2 prostate cancers are potentially curable with surgery or radiation, depending on their risk characteristics."],
  ["Is Stage 3 prostate cancer curable?", "Some Stage 3 prostate cancers can be treated with curative intent, particularly when there is no distant metastasis."],
  ["Is Stage 4 prostate cancer curable?", "Stage IVB metastatic prostate cancer is generally managed as an advanced disease rather than with a curative approach. Treatment can nevertheless control the disease and may provide substantial survival and symptom benefits."],
  ["What is the difference between Stage 3 and Stage 4 prostate cancer?", "Stage 3 does not have distant metastatic disease. Stage 4 includes regional lymph-node disease in Stage IVA and distant metastases in Stage IVB."],
  ["Does Stage 4 always mean the cancer has spread to the bones?", "No. Stage 4 can involve regional lymph nodes without distant metastasis, and distant disease can occur in lymph nodes, bones or organs such as the liver and lungs."],
  ["Is a PSA of 20 automatically Stage 4?", "No. PSA alone does not determine stage. A PSA of 20 or higher can contribute to Stage IIIA classification when the other criteria are met."],
  ["Is Gleason 7 Stage 3?", "Not necessarily. Gleason score and stage are different measurements. A Gleason 7 cancer can be localized and therefore Stage 2, depending on PSA and TNM findings."],
  ["Is Gleason 9 always Stage 4?", "No. A Gleason 9 cancer can still be confined to the prostate or nearby tissues and therefore may be Stage 3 rather than Stage 4."],
  ["What stage is prostate cancer that has spread to lymph nodes?", "It depends on which lymph nodes are involved. Regional lymph-node involvement is generally Stage IVA, while distant lymph-node metastases can be classified as Stage IVB."],
  ["What stage is prostate cancer that has spread to the bones?", "Distant bone metastases are classified as metastatic disease and therefore Stage IVB."],
  ["Can prostate cancer spread without causing symptoms?", "Yes. Prostate cancer can spread without producing obvious symptoms, which is why staging tests and PSA monitoring are important."],
  ["What is the survival rate for Stage 4 prostate cancer?", "There is no single survival number that applies to every Stage 4 patient. Population-level U.S. SEER data show a 5-year relative survival of 38% for distant prostate cancer diagnosed during 2015–2021. This category is not identical to every Stage IV patient, and it cannot predict an individual's outcome."],
  ["Can Stage 4 prostate cancer be controlled for years?", "Yes. Some men with metastatic prostate cancer respond to systemic treatment for prolonged periods. The duration of control varies substantially between individuals."],
  ["What is the best treatment for Stage 4 prostate cancer?", "There is no single treatment that is best for every Stage 4 patient. Treatment depends on whether the disease is hormone-sensitive or castration-resistant, the extent of metastases, previous treatment, symptoms, overall health and molecular findings."],
  ["Is surgery possible in Stage 4 prostate cancer?", "Surgery is not the routine treatment for widespread metastatic disease, but selected patients with limited regional disease may undergo aggressive multimodal treatment. The decision is highly individualized."],
  ["Is radiation used for Stage 4 prostate cancer?", "Yes. Radiation may be used to treat the prostate, lymph nodes or specific metastatic sites, particularly when there is pain or a risk of complications."],
  ["Is hormone therapy lifelong in Stage 4 prostate cancer?", "ADT is often continued long-term in metastatic disease, although the overall treatment strategy depends on the type of disease and other therapies being used."],
  ["Can PSMA PET change the stage?", "Yes. More sensitive molecular imaging can reveal lymph-node or distant disease that was not detected on conventional imaging, potentially changing the clinical assessment and treatment plan."],
  ["What is the most important information on a prostate cancer report?", "Review the entire report, including PSA, Gleason score, Grade Group, clinical T stage, N stage, M stage, MRI findings, PSMA PET findings, and the number and location of metastases. No single number tells the complete story."],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("A prostate cancer diagnosis is usually followed by one of the most important questions a patient can ask: **“What stage is my prostate cancer?”**"),
  p("The stage describes how far the cancer has spread. It helps doctors decide whether treatment should focus on surveillance, cure, long-term disease control, or a combination of approaches."),
  p("Prostate cancer is generally divided into **Stage 1, Stage 2, Stage 3 and Stage 4**. These broad numbers do not tell the entire story. Two men can both have Stage 2 disease and receive very different treatment because PSA, [Gleason score and Grade Group](" + GG + "), MRI, tumour extent and other risk factors differ."),
  p("Stage 4 is not one situation either. Cancer limited to nearby lymph nodes is different from cancer that has spread to bones, the liver or other distant organs."),
  p("Modern staging therefore combines several pieces of information. The American Joint Committee on Cancer (AJCC) system uses **TNM classification, PSA level and Grade Group** to establish the stage group. How the tissue grade is assigned is covered in [Gleason Score and Grade Group](" + GG + "). How the diagnosis is made is covered in [Prostate Cancer Diagnosis](" + DX + ")."),
  p("This is the staging hub for the prostate cluster. It sits beside [symptoms](" + SX + "), [diagnosis](" + DX + "), [active surveillance](" + AS + "), [treatment options](" + OPTIONS + "), [robotic prostatectomy](" + RARP + "), [radiation](" + RAD + ") and [Prostate Cancer Treatment in India](" + PILLAR + ")."),
  p("International patients comparing [surgical oncologists](" + SURG_DOCS + "), [radiation oncologists](" + RAD_DOCS + ") and [medical oncologists](" + MED_DOCS + ") commonly start with [Delhi NCR](/doctors/India/Delhi-NCR/Surgical-Oncology), [Mumbai](/doctors/India/Mumbai/Radiation-Oncology), [Bengaluru](/doctors/India/Bengaluru/Surgical-Oncology), [Chennai](/doctors/India/Chennai/Radiation-Oncology) and [Hyderabad](/doctors/India/Hyderabad/Surgical-Oncology)."),
  btn("Ask about your prostate cancer stage", consult("Prostate Cancer Staging")),
  p("[WhatsApp +91 90443 46292 with your TNM, PSA and Grade Group](" + wa("Please review my prostate cancer stage, PSA and Grade Group and advise the next step in India.") + ")"),
  img(
    "/uploads/articles/pca-st-anatomy.webp",
    "Transparent male body with teal lungs and bladder and a gold prostate confined in the pelvis",
    "Stage answers where the cancer is. Grade answers how abnormal it looks. The two maps are read together.",
  ),

  h2("What Does “Stage” Mean in Prostate Cancer?"),
  p("Cancer staging describes **how much cancer is present and where it has spread**."),
  p("Doctors use staging to answer whether the cancer is still inside the prostate, whether it has grown through the capsule, whether it has reached the seminal vesicles, whether nearby or distant lymph nodes are involved, and whether it has spread to bones, liver or lungs."),
  p("The higher the stage, the more extensively the cancer has generally spread. Stage should not be interpreted on its own — [symptoms](" + SX + ") do not set the stage, and [Grade Group](" + GG + ") is a different question."),

  h2("How Is Prostate Cancer Staged?"),
  p("The most important pieces are:"),
  ul([
    "**T — Primary tumour.** Size and local extent of the prostate tumour.",
    "**N — Lymph nodes.** Whether nearby lymph nodes contain cancer.",
    "**M — Metastasis.** Whether cancer has spread to distant parts of the body.",
    "**PSA.** The prostate-specific antigen level helps distinguish different stage groups.",
    "**Grade Group.** Based on the Gleason score; describes how abnormal the cancer looks and how aggressively it may behave.",
  ]),
  p("The combination of these factors determines the final stage group. Imaging and biopsy details are covered in [diagnosis](" + DX + ")."),

  h2("What Is TNM Staging?"),
  p("TNM stands for **T = Tumour, N = Nodes, M = Metastasis**."),
  p("**T2 N0 M0** generally means the cancer is confined to the prostate, there is no regional lymph-node involvement identified, and there is no evidence of distant metastasis."),
  p("**T3 N0 M0** means the cancer has extended beyond the prostate but there is no identified lymph-node or distant metastatic disease."),
  p("**Any T, Any N, M1** means distant metastatic disease is present."),

  h2("What Is Grade Group?"),
  p("Grade Group is a critical part of prostate cancer assessment. It is based on the Gleason grading system and helps doctors estimate how likely the cancer is to grow and spread."),
  html(ggTable),
  p("The full pattern guide, including why **3+4=7 is Grade Group 2** and **4+3=7 is Grade Group 3**, is in [Gleason Score and Grade Group](" + GG + ")."),

  h2("Gleason Score vs Grade Group: What Is the Difference?"),
  p("Patients often see both terms on a pathology report. The **Gleason score** combines the two most common cancer growth patterns in the biopsy. **3+4=7** and **4+3=7** have the same total but are not identical because the dominant pattern is different."),
  p("The Grade Group system simplifies this into five categories. A report saying only **“Gleason 7”** does not provide the complete picture. Doctors also want to know whether it is 3+4 or 4+3, and the corresponding Grade Group."),

  h2("Why PSA Matters in Staging"),
  p("PSA is a protein produced by prostate cells. A higher PSA can occur with prostate cancer, but PSA can also rise because of benign prostate enlargement, prostatitis and other conditions."),
  p("In confirmed prostate cancer, PSA contributes to staging and risk assessment. Stage 3A can be assigned based on a PSA of **20 ng/mL or higher** in the appropriate TNM and Grade Group setting, even when the cancer has not extended outside the prostate."),
  p("**A cancer does not have to leave the prostate to be considered Stage 3.** PSA level alone cannot determine stage."),

  h2("Stage 1 Prostate Cancer"),
  p("Stage 1 is generally the earliest stage. The cancer is confined to the prostate and has low-risk characteristics."),
  p("Under the AJCC system, Stage 1 includes specific combinations involving PSA below 10 ng/mL, Grade Group 1, T1 or selected T2 findings, no regional lymph-node involvement and no distant metastasis. The cancer may be so small that it cannot be felt on examination or seen clearly on imaging."),
  h3("Symptoms of Stage 1 Prostate Cancer"),
  p("Most Stage 1 prostate cancers cause **no specific symptoms**. Many are discovered because of an elevated PSA, an abnormal prostate examination, MRI findings, a biopsy after PSA evaluation, or incidental discovery during another prostate procedure."),
  p("Urinary symptoms such as difficulty urinating do not necessarily mean that a cancer is advanced. They are often caused by benign prostate enlargement rather than prostate cancer itself. See [Prostate Cancer Symptoms](" + SX + ")."),
  h3("Stage 1 Prostate Cancer Treatment"),
  p("Treatment depends on age, life expectancy, Grade Group, PSA and preferences."),
  p("**[Active surveillance](" + AS + ")** is commonly used for appropriately selected low-risk prostate cancer. It is not ignoring the cancer. It is structured monitoring through PSA testing, clinical review, repeat MRI when appropriate and repeat biopsy when indicated. Treatment can be started if the cancer shows evidence of progression."),
  p("**[Radical prostatectomy](" + RARP + ")** removes the prostate and is an option for selected patients suitable for curative treatment. GAF Healthcare planning ranges in India are **$7,000–$18,000** on the [radical prostatectomy cost page](" + RP + ")."),
  p("**Radiation** can also be used with curative intent: [external-beam radiation](" + RAD + "), stereotactic body radiation in selected cases, and [brachytherapy](" + BRACHY_BLOG + "). Planning ranges include [EBRT](" + EBRT + ") **$1,000–$6,000+**, [IMRT](" + IMRT + ") **$6,500–$14,500** and [brachytherapy](" + BRACHY + ") **$5,500–$13,000**."),
  p("NCI lists active surveillance, surgery, external radiation and internal radiation among treatment options for Stage 1 disease."),
  btn("Ask whether Stage 1 suits active surveillance", consult("Stage 1 Prostate Cancer")),
  p("[WhatsApp +91 90443 46292 about Grade Group 1 Stage 1](" + wa("I have Stage 1 prostate cancer / Grade Group 1. Please advise whether active surveillance in India is appropriate.") + ")"),
  h3("Stage 1 Prognosis"),
  p("The outlook for appropriately selected Stage 1 prostate cancer is generally excellent. “Stage 1” does not mean every tumour behaves identically. Grade Group, PSA, tumour volume and other factors still matter. Some low-risk cancers may never cause serious problems, which is one reason active surveillance is an important strategy."),

  h2("Stage 2 Prostate Cancer"),
  p("Stage 2 prostate cancer is still generally **confined to the prostate**, but it has features that make it more significant than typical Stage 1 disease. It is divided into Stage IIA, IIB and IIC based on combinations of PSA, Grade Group and T category. The cancer has not spread to regional lymph nodes or distant organs."),
  h3("Stage 2A Prostate Cancer"),
  p("Stage IIA can include several combinations involving Grade Group 1, PSA between 10 and 20 ng/mL, or certain T2 tumours with PSA below 20. The exact classification depends on the T category and pathological information."),
  h3("Stage 2B Prostate Cancer"),
  p("Stage IIB generally includes prostate cancers with a **Gleason score of 7 / Grade Group 2 or 3** in the appropriate staging setting. These cancers remain within the prostate but have a greater risk profile than Grade Group 1 disease."),
  h3("Stage 2C Prostate Cancer"),
  p("Stage IIC includes higher-grade disease, including Grade Group 3 or 4 in specified combinations. The cancer remains localized, but its biological characteristics indicate a greater risk of progression."),
  h3("Symptoms of Stage 2 Prostate Cancer"),
  p("Stage 2 can also be asymptomatic. Possible urinary symptoms include weak urine flow, increased frequency, difficulty starting urination, night-time urination, urgency and incomplete emptying. These symptoms are **not specific to prostate cancer**. Benign prostate enlargement can cause many of the same problems."),
  h3("Stage 2 Prostate Cancer Treatment"),
  p("Treatment depends on the risk subgroup. Options can include [active surveillance](" + AS + ") for selected favourable cases, [radical prostatectomy](" + RARP + "), [external-beam radiation](" + RAD + "), [brachytherapy](" + BRACHY_BLOG + "), radiation combined with [hormone therapy](" + HT + ") in selected higher-risk cases, and other treatments in carefully selected situations."),
  p("The distinction between **favourable intermediate-risk and unfavourable intermediate-risk** disease is particularly important. Two men with Stage 2 disease may therefore receive very different treatment. See [treatment options](" + OPTIONS + ") and [treatment without surgery](" + NONSURG + ")."),
  h3("Surgery for Stage 2 Prostate Cancer"),
  p("Radical prostatectomy is a potentially curative option for appropriately selected patients. The operation removes the prostate and may include pelvic lymph-node assessment depending on the risk profile. Approaches include open, laparoscopic and [robotic-assisted](" + RARP + ") prostatectomy. Nerve-sparing techniques may be considered when oncologically appropriate."),
  p("City pages such as [Delhi NCR prostatectomy](/costs/India/Delhi-NCR/Surgical-Oncology/Radical-Prostatectomy) use the same national range of **$7,000–$18,000** unless a hospital issues a verified quotation. Compare [surgical hospitals](" + SURG_HOSP + ") in [Delhi NCR](/hospitals/India/Delhi-NCR/Surgical-Oncology) and [Mumbai](/hospitals/India/Mumbai/Surgical-Oncology)."),
  h3("Radiation for Stage 2 Prostate Cancer"),
  p("Radiation is another potentially curative option. Depending on risk and prostate characteristics, treatment may involve IMRT, IGRT, VMAT, SBRT or [brachytherapy](" + BRACHY_BLOG + "). Some higher-risk intermediate-risk cancers may receive a period of hormone therapy alongside radiation. See [Radiation Therapy for Prostate Cancer](" + RAD + ")."),
  h3("Active Surveillance in Stage 2"),
  p("Not every Stage 2 cancer automatically requires immediate surgery or radiation. Some favourable intermediate-risk cancers can be considered for [active surveillance](" + AS + "). Eligibility is narrower than for typical Grade Group 1 disease. Doctors consider Grade Group, Gleason pattern, PSA density, number of positive cores, percentage of cancer in cores, MRI findings, tumour volume, age and health."),
  h3("Stage 2 Prognosis"),
  p("Many Stage 2 prostate cancers are treated with curative intent. The outlook depends strongly on Grade Group, PSA, tumour extent, MRI findings, biopsy characteristics and treatment response. A man with favourable Stage 2 disease may have a very different outlook from someone with high-grade Stage 2C disease."),

  h2("Stage 3 Prostate Cancer"),
  p("Stage 3 represents a more advanced form of prostate cancer, but it is not one single condition. It includes Stage IIIA, IIIB and IIIC. Stage 3 may be defined by a high PSA, extension outside the prostate, involvement of nearby structures, or high-grade disease."),
  p("**Stage 3 does not necessarily mean distant metastasis.** A patient can have Stage 3 prostate cancer without cancer in the bones or distant organs."),
  img(
    "/uploads/articles/pca-st-local.webp",
    "Male patient in clinic with a gold prostate and teal bladder overlay while a clinician explains local stage",
    "Stage 3 can still be pelvic disease. High PSA or Grade Group 5 can also place a man in Stage 3 without distant spread.",
  ),
  h3("Stage 3A Prostate Cancer"),
  p("Stage IIIA can include prostate cancer that remains within the prostate but has a **PSA of 20 ng/mL or higher**, depending on the Grade Group and TNM category. This is an important example of why PSA can influence stage."),
  h3("Stage 3B Prostate Cancer"),
  p("Stage IIIB indicates that the cancer has extended beyond the prostate. It may have reached seminal vesicles, bladder, rectum, pelvic wall or other nearby structures. The exact T category determines the classification. There is still no distant metastasis in Stage IIIB."),
  h3("Stage 3C Prostate Cancer"),
  p("Stage IIIC represents high-grade disease. The cancer has a **Grade Group 5**, corresponding to Gleason 9–10, while the disease remains without distant metastasis. **A tumour can be Stage 3 because of its biological grade even when distant metastases have not been identified.**"),
  h3("Symptoms of Stage 3 Prostate Cancer"),
  p("Symptoms can still be absent. When they occur they may include difficulty urinating, weak stream, frequency, blood in urine or semen, erectile dysfunction and pelvic discomfort. If the tumour has extended locally, urinary or pelvic symptoms may become more noticeable. Symptoms alone cannot determine the stage."),
  h3("Stage 3 Prostate Cancer Treatment"),
  p("Treatment usually requires a more aggressive approach than low-risk localized disease."),
  p("**Radiation plus hormone therapy.** External-beam radiation combined with androgen deprivation therapy is an important approach for high-risk and locally advanced prostate cancer. Depending on the risk profile, treatment may involve long-term ADT. Hormone-therapy planning ranges are **$1,000–$4,500** on the [hormone therapy cost page](" + HT + ")."),
  p("**Surgery.** [Radical prostatectomy](" + RARP + ") can be considered in carefully selected patients and may form part of a **multimodal treatment plan**, meaning additional radiation or systemic treatment may be needed depending on pathology and subsequent PSA."),
  p("**Brachytherapy boost.** In selected high-risk patients, a [brachytherapy](" + BRACHY_BLOG + ") boost may be combined with external-beam radiation and hormone therapy."),
  p("NCI lists external radiation, hormone therapy, surgery and internal radiation among options used in Stage 3 disease."),
  btn("Ask about Stage 3 treatment in India", consult("Stage 3 Prostate Cancer")),
  h3("Can Stage 3 Prostate Cancer Be Cured?"),
  p("**Some Stage 3 prostate cancers can be treated with curative intent.** This depends on whether the cancer is still confined to the pelvic region and the characteristics of the tumour. Curative treatment may involve surgery, radiation, hormone therapy or combination approaches. The plan is often more intensive than for low-risk disease because the risk of recurrence is higher."),

  h2("Stage 4 Prostate Cancer"),
  p("Stage 4 means the cancer has become more advanced. There are two important subdivisions."),
  h3("Stage 4A Prostate Cancer"),
  p("**Stage IVA** means regional lymph nodes are involved. The cancer may still be localized to the pelvis apart from lymph-node involvement. This is different from widespread metastatic disease."),
  p("Depending on the number and location of involved nodes and other risk factors, treatment may include a combination of radiation, hormone therapy, surgery in selected cases and additional systemic treatment. The plan is individualized."),
  img(
    "/uploads/articles/pca-st-nodes.webp",
    "Transparent male figure with a gold prostate and teal pelvic lymph nodes",
    "Stage 4A is regional nodal disease. It is not the same as cancer that has already reached bone or distant organs.",
  ),
  h3("Stage 4B Prostate Cancer"),
  p("**Stage IVB** means prostate cancer has spread to distant sites. This is **metastatic prostate cancer**. The most common distant site is bone. Other possible sites include distant lymph nodes, liver and lungs. Treatment generally focuses on systemic control of the cancer."),
  img(
    "/uploads/articles/pca-st-mets.webp",
    "Transparent male figure with a gold prostate, gold spine and teal pelvic nodes used to explain distant stage",
    "Stage 4B is distant disease. Bone is the most common site. Stage and Grade Group still answer different questions.",
  ),
  p("[WhatsApp +91 90443 46292 about Stage 4A versus 4B](" + wa("Please review whether my prostate cancer is Stage 4A (regional nodes) or Stage 4B (distant metastases) and advise options in India.") + ")"),
  h3("Symptoms of Stage 4 Prostate Cancer"),
  p("Some men with metastatic disease still have few or no symptoms. Others may experience urinary symptoms (difficulty urinating, weak stream, retention, blood in urine), bone symptoms (back, hip, pelvic or rib pain, bone tenderness), or general symptoms (fatigue, weight loss, reduced appetite, weakness)."),
  p("Bone metastases can sometimes cause fractures, spinal cord compression, severe pain or high calcium levels. **New weakness, numbness or loss of bladder or bowel control in a man with known prostate cancer and possible spinal metastases requires urgent evaluation in a local emergency department — not a delayed WhatsApp message.**"),
  h3("Stage 4 Prostate Cancer Treatment"),
  p("Treatment is generally systemic because cancer cells are present outside the original prostate region. Depending on the disease setting, treatment can include androgen deprivation therapy, androgen receptor pathway inhibitors (abiraterone, enzalutamide, apalutamide, darolutamide), [chemotherapy](" + CHEMO + ") such as docetaxel or cabazitaxel in selected settings, PARP inhibitors for selected genomic alterations, Lutetium-177 PSMA therapy for appropriate PSMA-positive disease (see the [treatment pillar](" + PILLAR + ")), radiation for selected metastatic sites, bone-directed treatment and clinical trials."),
  p("The modern treatment of metastatic prostate cancer is increasingly based on combinations rather than ADT alone. NCI lists hormonal treatment, hormonal treatment combined with chemotherapy, radiation, bone-directed treatment and other approaches among Stage 4 options. Chemotherapy planning ranges in India are **$1,500–$8,000+**."),
  btn("Ask about Stage 4 options in India", consult("Stage 4 Prostate Cancer")),
  h3("Hormone Therapy in Stage 4 Prostate Cancer"),
  p("Androgen deprivation therapy remains a foundation of treatment for metastatic hormone-sensitive prostate cancer. Many appropriate patients now receive **ADT plus another systemic therapy**, such as an androgen receptor pathway inhibitor: ADT + abiraterone, enzalutamide, apalutamide or darolutamide, and selected triplet regimens involving ADT, an ARPI and docetaxel."),
  p("Selection depends on disease volume, symptoms, health, previous treatment and other factors. Coordinators can introduce [medical oncologists](" + MED_DOCS + ") alongside [radiation oncologists](" + RAD_DOCS + ") when both local and systemic treatment are being discussed."),
  h3("What Happens When Stage 4 Prostate Cancer Becomes Resistant to Hormone Therapy?"),
  p("Some prostate cancers eventually grow despite testosterone being suppressed. This is **castration-resistant prostate cancer (CRPC)**. Treatment may then involve enzalutamide, abiraterone, chemotherapy, PARP inhibitors for selected genetic alterations, Lutetium-177 PSMA therapy, other targeted treatments or clinical trials. The exact treatment depends heavily on what the patient has already received."),
  h3("Can Stage 4 Prostate Cancer Be Cured?"),
  p("For **Stage IVB metastatic prostate cancer**, treatment is generally aimed at long-term disease control rather than cure. That does not mean treatment is futile. Many men can live for years with metastatic prostate cancer, and treatment options continue to evolve. The disease can sometimes respond strongly to systemic treatment. Prognosis varies considerably from one patient to another."),

  h2("Prostate Cancer Stages 1–4: Treatment Comparison"),
  html(txTable),
  p("This table is a broad overview. Actual treatment depends on the precise TNM classification, Grade Group, PSA, metastatic burden, symptoms and previous therapy. GAF Healthcare planning ranges in India include [radical prostatectomy](" + RP + ") **$7,000–$18,000**, [EBRT](" + EBRT + ") **$1,000–$6,000+**, [IMRT](" + IMRT + ") **$6,500–$14,500**, [brachytherapy](" + BRACHY + ") **$5,500–$13,000**, [hormone therapy](" + HT + ") **$1,000–$4,500** and [chemotherapy](" + CHEMO + ") **$1,500–$8,000+**. These are planning ranges, not hospital quotations."),

  h2("Prostate Cancer Staging Tests"),
  p("Doctors may use several tests to establish the stage."),
  ul([
    "**PSA blood test** — baseline marker; contributes to risk assessment and staging.",
    "**Digital rectal examination** — whether the prostate feels abnormal.",
    "**Prostate MRI** — tumour location and size, extraprostatic extension, seminal-vesicle involvement, suspicious lymph nodes.",
    "**Prostate biopsy** — confirms cancer and provides Gleason score and Grade Group.",
    "**PSMA PET/CT** — whole-body molecular imaging; increasingly important for staging selected higher-risk cancers. See [diagnosis](" + DX + ").",
    "**CT** — lymph nodes and other structures.",
    "**Bone imaging** — when bone metastases are suspected or according to the clinical staging pathway.",
  ]),
  html(testsTable),

  h2("Why PSMA PET Is Changing Prostate Cancer Staging"),
  p("Traditional staging relied heavily on CT, bone scan and MRI. PSMA PET adds molecular information. It can identify PSMA-expressing prostate cancer in lymph nodes, bones and distant sites."),
  p("The ProPSMA trial demonstrated greater staging accuracy with PSMA PET/CT than conventional CT plus bone scanning in high-risk prostate cancer. This can sometimes change the treatment plan. A patient thought to have disease confined to the prostate may be found to have metastatic lymph-node or bone disease on PSMA PET. How PSMA PET sits with PSA, MRI and biopsy is covered in [Prostate Cancer Diagnosis](" + DX + ")."),

  h2("Can the Stage Change After Treatment?"),
  p("Yes, but it is important to distinguish **initial stage** from disease status after treatment. A patient may initially have Stage 2 prostate cancer and later develop biochemical recurrence or metastatic disease."),
  p("Doctors may describe recurrence as biochemical, local, regional or metastatic recurrence, or castration-resistant disease. The original stage remains historically important, but the current disease status determines the next treatment. See [Prostate Cancer Recurrence After Surgery](" + RECUR + ")."),

  h2("What Is Biochemical Recurrence?"),
  p("Biochemical recurrence means that PSA rises after definitive treatment. The definition depends on the initial treatment. After prostatectomy, PSA is expected to fall to very low levels. After radiation, PSA behaves differently because the prostate remains in place."),
  p("A rising PSA does not automatically mean that cancer has spread throughout the body. Additional assessment may include PSA trend, PSA doubling time, MRI, PSMA PET/CT and other imaging."),

  h2("Does a High PSA Always Mean Stage 4 Cancer?"),
  p("**No.** A high PSA can occur with prostate cancer that remains localized. Stage 3A can be assigned based on PSA ≥20 ng/mL in the appropriate staging combination, even when there is no distant metastasis. **PSA level alone cannot determine prostate cancer stage.**"),

  h2("Does Gleason Score Determine the Stage?"),
  p("Not by itself. Gleason score contributes to the Grade Group, and Grade Group is used together with PSA and TNM information."),
  p("A Gleason 9 cancer that is still confined to the prostate can have a different stage group from a lower-grade cancer that has already spread to distant organs."),
  p("**Stage = Where is the cancer?** **Grade = How abnormal/aggressive does it appear biologically?** The microscope side is explained in [Gleason Score and Grade Group](" + GG + ")."),

  h2("Stage vs Grade: Simple Explanation"),
  p("Think of prostate cancer assessment as two separate maps."),
  p("**Stage** tells you where the cancer has gone: prostate, nearby tissues, lymph nodes, distant organs."),
  p("**Grade** tells you how the cancer looks under the microscope: lower, intermediate or high Grade Group."),
  p("Doctors combine both pieces of information to determine treatment and prognosis."),

  h2("What Is the Prognosis for Stage 1 Prostate Cancer?"),
  p("The prognosis is generally very favourable for low-risk Stage 1 disease. Many men can be managed safely with [active surveillance](" + AS + ") rather than immediate treatment."),
  p("The American Cancer Society's current SEER data show greater than 99% 5-year relative survival for localized prostate cancer overall. This statistic includes localized disease across multiple AJCC stage groups and should not be interpreted as a Stage 1-specific survival prediction."),

  h2("What Is the Prognosis for Stage 2 Prostate Cancer?"),
  p("Many Stage 2 cancers are also potentially curable. Prognosis varies significantly within Stage 2. Important factors include Grade Group, PSA, tumour volume, MRI findings, biopsy features and treatment response. A Stage 2 Grade Group 1 cancer and a Stage 2 Grade Group 4 cancer should not be treated as equivalent diseases."),

  h2("What Is the Prognosis for Stage 3 Prostate Cancer?"),
  p("Stage 3 has a greater risk of recurrence than most localized low-risk prostate cancers. Many Stage 3 cancers remain potentially treatable with curative intent. Prognosis depends heavily on whether the cancer has extended outside the prostate, seminal-vesicle involvement, PSA, Grade Group, lymph-node status and response to treatment. Some men require multimodal treatment involving radiation, hormone therapy and sometimes surgery."),

  h2("What Is the Prognosis for Stage 4 Prostate Cancer?"),
  p("Stage 4 has a broad range of outcomes. **Stage IVA** means cancer is present in regional lymph nodes but not distant sites. **Stage IVB** means cancer has spread to distant organs or distant lymph nodes."),
  p("For metastatic disease, prognosis depends on number and location of metastases, bone versus visceral disease, PSA, Grade Group, symptoms, response to ADT and additional systemic treatment, and overall health."),

  h2("Prostate Cancer Survival Rates by Spread"),
  p("The most useful population-level survival figures are often reported according to whether the cancer is localized, regional or distant rather than strictly as Stage 1, 2, 3 or 4."),
  p("According to the American Cancer Society's current SEER-based statistics for men diagnosed between **2015 and 2021**:"),
  html(seerTable),
  p("These figures are based on men diagnosed in the United States and are **not equivalent to Stage 1, Stage 2, Stage 3 and Stage 4 survival rates**. They also cannot predict what will happen to an individual patient."),

  h2("Why Survival Statistics Can Be Misleading"),
  p("A survival statistic is an average from a large population. It cannot account for every difference between patients. Outlook can be affected by age, general health, PSA, Grade Group, cancer burden, metastatic sites, treatment response, genetics, other medical conditions, access to treatment and newer therapies introduced after the data period."),
  p("The American Cancer Society specifically warns that survival statistics cannot tell an individual how long they will live."),

  h2("Can Prostate Cancer Stage 4 Patients Live for Many Years?"),
  p("Yes. Metastatic prostate cancer is serious, but treatment can control the disease for substantial periods in some patients. Hormone therapy, androgen receptor pathway inhibitors, chemotherapy, PARP inhibitors, radioligand therapy and other treatments have expanded options. Outcomes vary considerably. A doctor can provide a more meaningful prognosis only after reviewing the complete clinical picture."),

  h2("Which Prostate Cancer Stage Has the Best Prognosis?"),
  p("In general, prostate cancer that remains localized has a more favourable population-level outlook than cancer that has spread to distant organs. Within each stage, prognosis can vary substantially. Simply asking whether a cancer is “Stage 2” or “Stage 3” is not enough. **PSA + Grade Group + TNM + imaging findings + treatment response** provide a much more complete picture."),

  h2("Can Stage 4 Prostate Cancer Go Into Remission?"),
  p("Advanced prostate cancer can respond very well to treatment, with PSA falling substantially and visible disease shrinking or becoming less active on imaging. Doctors may describe this as a **response**, **disease control** or **remission**, depending on the clinical context. Metastatic prostate cancer can remain capable of returning or progressing even after a strong response. Continued monitoring is therefore important."),

  h2("What Happens After Prostate Cancer Treatment?"),
  p("Follow-up usually involves monitoring PSA and assessing symptoms. Depending on the treatment and disease risk, doctors may also use testosterone testing, MRI, CT, PSMA PET/CT, bone imaging, physical examination and additional laboratory tests. The schedule depends on the original stage and treatment. Eating during later treatment is covered in [Prostate Cancer Diet](" + DIET + ")."),

  h2("What Factors Can Worsen Prostate Cancer Prognosis?"),
  ul([
    "High Grade Group",
    "Gleason 8–10",
    "Very high PSA",
    "Extraprostatic extension",
    "Seminal-vesicle involvement",
    "Lymph-node involvement",
    "Bone metastases",
    "Visceral metastases",
    "Rapid PSA doubling time",
    "Poor response to treatment",
  ]),
  p("These factors should be interpreted together rather than individually."),

  h2("What Factors Can Improve the Outlook?"),
  ul([
    "Localized disease",
    "Lower Grade Group",
    "Lower tumour burden",
    "No lymph-node involvement",
    "No distant metastases",
    "Good response to treatment",
    "Good overall health",
  ]),
  p("These are population-level factors rather than a prediction for an individual patient."),

  h2("Can Lifestyle Change Prostate Cancer Prognosis?"),
  p("Lifestyle is not a substitute for cancer treatment. Maintaining good general health can help patients tolerate treatment and manage some treatment-related risks. Useful habits include regular physical activity, a healthy weight, a balanced diet, avoiding smoking, limiting alcohol, maintaining muscle strength, looking after cardiovascular health, and following prescribed treatment and monitoring."),
  p("Men receiving long-term hormone therapy should pay particular attention to exercise, metabolic health and bone health. Practical eating notes are in [Prostate Cancer Diet](" + DIET + ")."),

  h2("Prostate Cancer Stage 1–4: Symptoms at a Glance"),
  html(sxTable),
  p("**Important:** Symptoms do not determine the stage. A man with Stage 4 disease may have few symptoms, while someone with a non-cancerous enlarged prostate may have severe urinary symptoms. See [Prostate Cancer Symptoms](" + SX + ")."),

  h2("When Should a Patient Get a Second Opinion?"),
  p("A second opinion can be particularly useful when the cancer is high-risk, the pathology is difficult to interpret, MRI and biopsy findings do not agree, surgery and radiation are both being considered, the disease is locally advanced, lymph nodes are involved, metastatic disease is suspected, treatment has stopped working, Lutetium-177 PSMA therapy is being considered, or there are multiple possible treatment pathways."),
  p("For international patients considering treatment in India, a remote review of pathology, imaging and PSA history can often be performed before travel."),

  h2("What Should International Patients Bring to India?"),
  p("For a prostate cancer consultation, patients should ideally carry:"),
  ul([
    "PSA history",
    "Biopsy report, histopathology slides or blocks where available, Gleason score and Grade Group",
    "MRI images and report",
    "PSMA PET/CT, CT and bone scan if performed",
    "Previous surgery records, radiation treatment plan, hormone-therapy and chemotherapy history",
    "Current medication list",
  ]),
  p("The **actual imaging files**, rather than only printed reports, can be particularly useful for specialist review."),
  p("[WhatsApp +91 90443 46292 with staging scans and the biopsy PDF](" + wa("I would like to share my prostate cancer TNM stage, PSA, Grade Group, MRI and PSMA PET files for a second opinion in India.") + ")"),

  h2("Prostate Cancer Stages 1–4: How Treatment Changes"),
  ul([
    "**Stage 1 — Monitor or treat locally.** Active surveillance is important for appropriately selected low-risk disease.",
    "**Stage 2 — Treat localized cancer according to risk.** Surgery and radiation are common curative options; surveillance remains appropriate for selected favourable cases.",
    "**Stage 3 — Treat higher-risk or locally advanced disease aggressively.** Radiation plus hormone therapy is an important approach, with surgery used selectively.",
    "**Stage 4A — Control disease in the prostate/pelvis and lymph nodes.** Systemic treatment often becomes more important, sometimes combined with radiation.",
    "**Stage 4B — Control cancer throughout the body.** Systemic treatment forms the foundation, with radiation or other local treatments used for selected situations.",
  ]),

  h2("A Simple Example of Why Stage Alone Is Not Enough"),
  p("Consider two hypothetical patients. **Patient A:** Stage 2, PSA 8, Grade Group 1, small-volume tumour, no suspicious nodes, no metastases — may be considered for [active surveillance](" + AS + "). **Patient B:** Stage 2, PSA 17, Grade Group 4, larger tumour, no metastases — may require definitive treatment. Both are Stage 2. Their treatment considerations are very different."),
  p("Now two patients with Stage 4 disease. **Patient C:** cancer limited to regional lymph nodes. **Patient D:** extensive bone and liver metastases. Both are Stage 4, but the extent and location of disease are very different. A patient's **complete staging report** matters more than the stage number alone."),

  h2("Frequently Asked Questions"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Final Takeaway"),
  p("**Prostate cancer stages 1 to 4 describe how far the cancer has spread, but the stage number alone does not determine treatment or prognosis.**"),
  p("Stage 1 and many Stage 2 cancers are localized and can often be managed with surveillance or curative treatment. Stage 3 includes higher-risk and locally advanced disease; many patients can still receive treatment with curative intent. Stage 4 includes regional lymph-node disease and distant metastatic disease."),
  p("The most important distinction is between **Stage IVA** (regional lymph nodes) and **Stage IVB** (distant metastatic disease). For prognosis, doctors look beyond the stage number: **PSA, Gleason score, Grade Group, tumour extent, lymph-node status, metastatic burden, treatment response and overall health** all matter."),
  p("Current U.S. population data show a 5-year relative survival above 99% for localized and regional prostate cancer and 38% for distant disease. These statistics describe large populations rather than individual patients."),
  p("The most useful next question is not only “What stage am I?” It is: **“What are my TNM stage, PSA, Grade Group, metastatic status and overall risk category, and how do these findings affect my treatment options?”**"),

  h2("Related Prostate Cancer Resources"),
  p("This article is the staging hub. Other cluster pages keep their own search intent:"),
  ul([
    "[Gleason Score and Grade Group](" + GG + ") — the microscope map that feeds AJCC stage grouping.",
    "[Prostate Cancer Diagnosis](" + DX + ") — PSA, MRI, biopsy and PSMA PET.",
    "[Prostate Cancer Symptoms](" + SX + ") — why symptoms do not set the stage.",
    "[Active Surveillance for Prostate Cancer](" + AS + ") — Stage 1 and selected favourable Stage 2.",
    "[Prostate Cancer Treatment Options](" + OPTIONS + ") — how teams choose first treatment after stage and grade.",
    "[Prostate Cancer Treatment Without Surgery](" + NONSURG + ") — radiation, hormone therapy and other options.",
    "[Robotic Prostatectomy in India](" + RARP + ") — surgery for selected localized and locally advanced disease.",
    "[Radiation Therapy for Prostate Cancer](" + RAD + ") — IMRT, IGRT and SBRT by risk.",
    "[Brachytherapy for Prostate Cancer](" + BRACHY_BLOG + ") — internal radiation and boosts.",
    "[Prostate Cancer Recurrence After Surgery](" + RECUR + ") — when PSA later rises.",
    "[Prostate Cancer Diet](" + DIET + ") — eating during later treatment.",
    "[Prostate Cancer Treatment in India](" + PILLAR + ") — staging, PSMA PET and Lutetium-177 PSMA therapy.",
  ]),

  h2("How GAF Healthcare Can Help"),
  p("GAF Healthcare coordinates international patients who have a new stage group and need a second look in India. Share the full staging report (TNM, PSA and Grade Group), MRI and PSMA PET files rather than printed summaries only, the complete biopsy PDF, and slides or blocks if a pathology review is needed. A coordinator can arrange a [uro-oncologist](" + SURG_DOCS + "), a [radiation oncologist](" + RAD_DOCS + ") and, for Stage 4 systemic options, a [medical oncologist](" + MED_DOCS + "), then help set [surveillance](" + AS + "), [surgery](" + RARP + "), [radiation](" + RAD + ") or a combination if the complete picture supports it."),
  btn("Share a staging report for a second opinion", consult("Prostate Cancer Staging")),
  p("[WhatsApp +91 90443 46292 with your staging pack](" + wa("I would like to share my prostate cancer stage, PSA, Grade Group and imaging for a second opinion in India.") + ")"),

  h2("Medical Disclaimer"),
  p("This article is intended for general educational purposes and should not replace consultation with a qualified urologist, urologic oncologist, radiation oncologist or medical oncologist."),
  p("Prostate cancer staging and treatment are individualized. The same stage can contain patients with substantially different PSA levels, Grade Groups, tumour characteristics and metastatic patterns. Treatment decisions should therefore be based on the complete clinical record rather than the stage number alone."),
  p("Survival statistics describe populations and cannot predict how long an individual patient will live or how that patient will respond to treatment."),

  h2("Top 5 Sources"),
  p("1. [NCI — Prostate Cancer Treatment (PDQ)](https://www.cancer.gov/types/prostate/patient/prostate-treatment-pdq) — staging, Grade Groups and treatment options for Stage I through Stage IV."),
  p("2. [American Cancer Society — Prostate Cancer Stages](https://www.cancer.org/cancer/types/prostate-cancer/detection-diagnosis-staging/staging.html) — AJCC TNM staging, PSA, Grade Group and Stage I–IV."),
  p("3. [American Cancer Society — Prostate Cancer Survival Rates](https://www.cancer.org/cancer/types/prostate-cancer/detection-diagnosis-staging/survival-rates.html) — SEER-based localized, regional and distant outcomes."),
  p("4. [NCI — Cancer Staging](https://www.cancer.gov/about-cancer/diagnosis-staging/staging) — TNM staging and the meaning of localized, regional and distant disease."),
  p("5. [NCI — Prostate Cancer Treatment, Health Professional Version](https://www.cancer.gov/types/prostate/hp/prostate-treatment-pdq) — stage-specific treatment and the distinctions between localized, locally advanced and metastatic disease."),
  p("**Last reviewed against the cited sources: September 2026.**"),
];

const now = "2026-09-28T09:00:00.000Z";
const SLUG = "prostate-cancer-stages-1-to-4";

const article = {
  id: "art_prostate_cancer_stages_1_to_4",
  slug: SLUG,
  title: "Prostate Cancer Stages 1 to 4: Symptoms, Treatment and Prognosis",
  excerpt:
    "Stage 4A is not Stage 4B. How TNM, PSA and Grade Group set Stage 1–4, what each stage can mean for treatment, and why survival statistics are not a personal prediction.",
  date: "28 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Surgical Oncology",
  tags: ["prostate cancer", "staging", "TNM", "Stage 4", "PSA", "Grade Group", "India"],
  image: "/uploads/articles/pca-st-anatomy.webp",
  imageAlt: "Transparent male body with teal lungs and bladder and a gold prostate confined in the pelvis",
  status: "published",
  featured: true,
  seoTitle: "Prostate Cancer Stages 1 to 4: Symptoms, Treatment and Prognosis",
  seoDescription:
    "Stage 1–4 explained with TNM, PSA and Grade Group. Why Stage 4A differs from 4B, which stages can be treated with curative intent, and what SEER survival figures actually mean.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/pca-st-anatomy.webp",
  allowIndex: true,
  keywords: [
    "prostate cancer stages 1 to 4",
    "stage 1 prostate cancer",
    "stage 2 prostate cancer",
    "stage 3 prostate cancer",
    "stage 4 prostate cancer",
    "prostate cancer TNM staging",
    "stage 4A vs 4B",
    "prostate cancer survival rates",
    "PSA and staging",
    "Grade Group staging",
    "prostate cancer prognosis",
  ],
  relatedLinks: [
    { label: "Gleason score and Grade Group", href: GG },
    { label: "Prostate cancer diagnosis", href: DX },
    { label: "Treatment options", href: OPTIONS },
    { label: "Active surveillance", href: AS },
    { label: "Robotic Prostatectomy in India", href: RARP },
    { label: "Prostate Cancer Treatment in India", href: PILLAR },
  ],
  blocks,
};

if (!store.categories.includes("Surgical Oncology")) store.categories.push("Surgical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["pca-st-anatomy.webp", article.imageAlt],
  [
    "pca-st-local.webp",
    "Male patient in clinic with a gold prostate and teal bladder overlay while a clinician explains local stage",
  ],
  ["pca-st-nodes.webp", "Transparent male figure with a gold prostate and teal pelvic lymph nodes"],
  [
    "pca-st-mets.webp",
    "Transparent male figure with a gold prostate, gold spine and teal pelvic nodes used to explain distant stage",
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

const stLink = { label: "Prostate cancer stages 1 to 4", href: STAGES };
for (const siblingId of [
  "art_gleason_score_grade_group_prostate_cancer",
  "art_prostate_cancer_symptoms",
  "art_prostate_cancer_diagnosis_psa_mri_biopsy_psma_pet",
  "art_active_surveillance_prostate_cancer",
  "art_prostate_cancer_recurrence_after_surgery",
  "art_prostate_cancer_diet",
  "art_brachytherapy_for_prostate_cancer",
  "art_radiation_therapy_for_prostate_cancer",
  "art_robotic_prostatectomy_in_india",
  "art_prostate_cancer_treatment_without_surgery",
  "art_prostate_cancer_treatment_options_india",
]) {
  const sibling = store.articles.find((row) => row.id === siblingId);
  if (!sibling) continue;
  sibling.relatedLinks ??= [];
  if (!sibling.relatedLinks.some((row) => row.href === STAGES)) {
    sibling.relatedLinks.unshift(stLink);
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length, "ctas",
  blocks.filter((b) => b.type === "button" || (b.type === "paragraph" && /wa\.me|\/consult\?/.test(b.text || ""))).length);

const treatmentsPath = join(process.cwd(), "content/curated-treatments.json");
const treatments = JSON.parse(readFileSync(treatmentsPath, "utf8"));
const treatment = treatments.treatments.find((row) => row.slug === "prostate-cancer-treatment-in-india");
if (treatment?.translations?.en?.editorialBody && !treatment.translations.en.editorialBody.includes(STAGES)) {
  treatment.translations.en.editorialBody = treatment.translations.en.editorialBody.replace(
    "How Gleason score and Grade Group are read is covered in [Gleason Score and Grade Group](/blogs/gleason-score-grade-group-prostate-cancer).",
    "How Gleason score and Grade Group are read is covered in [Gleason Score and Grade Group](/blogs/gleason-score-grade-group-prostate-cancer). How Stage 1 to 4, TNM, PSA and Grade Group combine is covered in [Prostate Cancer Stages 1 to 4](/blogs/prostate-cancer-stages-1-to-4).",
  );
  writeFileSync(treatmentsPath, `${JSON.stringify(treatments, null, 2)}\n`);
  console.log("linked stages blog from treatment editorial");
}

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes("prostate-cancer-stages-1-to-4")) {
  llms = llms.replace(
    "and [Gleason score and Grade Group](https://gaf.healthcare/blogs/gleason-score-grade-group-prostate-cancer).",
    ", [Gleason score and Grade Group](https://gaf.healthcare/blogs/gleason-score-grade-group-prostate-cancer) and [prostate cancer stages 1 to 4](https://gaf.healthcare/blogs/prostate-cancer-stages-1-to-4).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}
