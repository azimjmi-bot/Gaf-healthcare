#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const SLUG = "targeted-therapy-for-breast-cancer-in-india";
const TARGETED = "/costs/India/Medical-Oncology/Targeted-Therapy";
const MOLECULAR = "/costs/India/Medical-Oncology/Molecular-Targeted-Therapy";
const CHEMO = "/costs/India/Medical-Oncology/Chemotherapy";
const NEOADJ = "/costs/India/Medical-Oncology/Neoadjuvant-Chemotherapy";
const ADJ = "/costs/India/Medical-Oncology/Adjuvant-Chemotherapy";
const IMMUNO = "/costs/India/Medical-Oncology/Immunotherapy";
const HORMONE = "/costs/India/Medical-Oncology/Hormone-Therapy";
const TX_TARGETED = "/treatments/targeted-therapy-in-india";
const TX_MOLECULAR = "/treatments/molecular-targeted-therapy-in-india";
const TX_BREAST = "/treatments/breast-cancer-treatment-in-india";
const TX_CHEMO = "/treatments/chemotherapy-in-india";
const HER2_BLOG = "/blogs/her2-positive-breast-cancer-treatment-india";
const ERPR = "/blogs/er-pr-her2-breast-cancer-treatment-india";
const SIDEFX = "/blogs/breast-cancer-targeted-therapy-side-effects";
const CHEMO_BLOG = "/blogs/chemotherapy-for-breast-cancer-in-india";
const HORMONE_BLOG = "/blogs/hormone-therapy-breast-cancer-india";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const RAD = "/blogs/radiation-therapy-for-breast-cancer";
const NEOADJ_BLOG = "/blogs/breast-cancer-neoadjuvant-therapy";
const COST_BLOG = "/blogs/breast-cancer-treatment-cost-in-india";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const DIAG = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const STAGES = "/blogs/breast-cancer-stages";
const OPTIONS = "/blogs/breast-cancer-treatment-options";
const MED_DOCS = "/doctors/India/Medical-Oncology";
const MED_HOSP = "/hospitals/India/Medical-Oncology";
const DELHI_DOCS = "/doctors/India/Delhi-NCR/Medical-Oncology";
const MUMBAI_DOCS = "/doctors/India/Mumbai/Medical-Oncology";
const BLR_DOCS = "/doctors/India/Bengaluru/Medical-Oncology";
const CHN_DOCS = "/doctors/India/Chennai/Medical-Oncology";
const HYD_DOCS = "/doctors/India/Hyderabad/Medical-Oncology";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;
const h2 = (text) => ({ id: id("h"), type: "heading", level: 2, text });
const h3 = (text) => ({ id: id("h"), type: "heading", level: 3, text });
const p = (text) => ({ id: id("p"), type: "paragraph", text });
const ul = (items) => ({ id: id("ul"), type: "list", style: "ul", items });
const ol = (items) => ({ id: id("ol"), type: "list", style: "ol", items });
const btn = (label, href) => ({ id: id("btn"), type: "button", label, href });
const img = (src, alt, caption) => ({ id: id("img"), type: "image", src, alt, caption });

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>What is targeted therapy?</strong></td><td>Medicines that act on specific proteins, receptors or pathways that drive breast cancer growth.</td></tr><tr><td><strong>Main HER2 medicines</strong></td><td>Trastuzumab, pertuzumab, T-DM1 and trastuzumab deruxtecan in selected settings — see <a href="${HER2_BLOG}">HER2-positive treatment</a></td></tr><tr><td><strong>HR+/HER2− options</strong></td><td>Selected patients may receive CDK4/6 inhibitors with endocrine therapy</td></tr><tr><td><strong>BRCA-linked options</strong></td><td>PARP inhibitors such as olaparib or talazoparib when genetic findings qualify</td></tr><tr><td><strong>Key tests</strong></td><td>ER/PR, HER2 IHC ± ISH, and germline BRCA testing when indicated — see <a href="${DIAG}">diagnosis guide</a></td></tr><tr><td><strong>GAF targeted therapy planning range</strong></td><td><a href="${TARGETED}">$8,000–$30,000</a> · oral or infusion · months of therapy</td></tr><tr><td><strong>Molecular targeted pathway</strong></td><td><a href="${MOLECULAR}">$10,000–$32,000</a> · oral or infusion by mutation</td></tr><tr><td><strong>Chemotherapy (when combined)</strong></td><td><a href="${CHEMO}">$1,500–$8,000+</a> · outpatient cycles</td></tr><tr><td><strong>International patients</strong></td><td>Share pathology and biomarker reports before travel; medicine choice follows validated results</td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>Targeted therapy for breast cancer in India</strong> is selected by biomarker results — not by tumour size alone. HER2-directed antibodies and antibody-drug conjugates, CDK4/6 inhibitors and PARP inhibitors each apply to different subtypes. GAF planning for <a href="${TARGETED}">targeted therapy</a> is <strong>$8,000–$30,000</strong> (oral or infusion · months of therapy). Neighbouring <a href="${MOLECULAR}">molecular targeted therapy</a> is <strong>$10,000–$32,000</strong>. These are partner planning ranges, not hospital quotations.</p><p class="article-quick-answer__body"><strong>Important:</strong> GAF Healthcare does not prescribe targeted medicines or interpret pathology. Treatment decisions remain with a qualified medical oncologist after review of validated biomarker reports.</p></aside>`;

const her2Table = `<div class="md-body"><table><thead><tr><th>HER2 test result</th><th>General interpretation</th></tr></thead><tbody><tr><td>IHC 0</td><td>HER2-negative</td></tr><tr><td>IHC 1+</td><td>HER2-negative</td></tr><tr><td>IHC 2+</td><td>Equivocal; additional ISH testing is generally required</td></tr><tr><td>IHC 3+</td><td>HER2-positive</td></tr><tr><td>IHC 2+ with HER2 gene amplification on ISH</td><td>HER2-positive</td></tr><tr><td>IHC 2+ without gene amplification on ISH</td><td>Generally HER2-negative</td></tr></tbody></table></div>`;

const tchpTable = `<div class="md-body"><table><thead><tr><th>Letter</th><th>Medicine</th><th>Role</th></tr></thead><tbody><tr><td>T</td><td>Docetaxel</td><td>Chemotherapy</td></tr><tr><td>C</td><td>Carboplatin</td><td>Chemotherapy</td></tr><tr><td>H</td><td>Trastuzumab</td><td>HER2-targeted therapy</td></tr><tr><td>P</td><td>Pertuzumab</td><td>HER2-targeted therapy</td></tr></tbody></table></div>`;

const cdkTable = `<div class="md-body"><table><thead><tr><th>Medicine</th><th>General treatment role</th></tr></thead><tbody><tr><td>Palbociclib</td><td>Used with endocrine therapy in selected advanced or metastatic disease</td></tr><tr><td>Ribociclib</td><td>Used in selected early-stage high-risk and advanced hormone receptor-positive, HER2-negative disease</td></tr><tr><td>Abemaciclib</td><td>Used in selected high-risk early-stage disease and advanced or metastatic disease</td></tr></tbody></table></div>`;

const subtypeTable = `<div class="md-body"><table><thead><tr><th>Breast cancer subtype</th><th>Targeted treatment options that may be considered</th></tr></thead><tbody><tr><td>HER2-positive</td><td>Trastuzumab, pertuzumab, T-DM1, trastuzumab deruxtecan and other HER2-directed medicines</td></tr><tr><td>Hormone receptor-positive, HER2-negative</td><td>CDK4/6 inhibitors with endocrine therapy in selected patients</td></tr><tr><td>BRCA1/BRCA2-mutated, HER2-negative</td><td>PARP inhibitors in eligible treatment settings</td></tr><tr><td>HER2-low advanced breast cancer</td><td>Selected antibody-drug conjugates, depending on previous treatment and eligibility</td></tr><tr><td>Triple-negative breast cancer</td><td>Selected antibody-drug conjugates and other biomarker-directed treatments in appropriate settings</td></tr></tbody></table></div>`;

const testsTable = `<div class="md-body"><table><thead><tr><th>Test</th><th>Why it may be required</th></tr></thead><tbody><tr><td>HER2 IHC</td><td>Identifies HER2 protein expression</td></tr><tr><td>HER2 ISH/FISH</td><td>Confirms HER2 gene amplification in selected cases</td></tr><tr><td>ER and PR testing</td><td>Identifies hormone receptor status</td></tr><tr><td>Histopathology review</td><td>Confirms tumour characteristics</td></tr><tr><td>Germline BRCA1/BRCA2 testing</td><td>Identifies inherited mutations relevant to PARP inhibitors and risk assessment</td></tr><tr><td>Blood counts</td><td>Monitors bone marrow function</td></tr><tr><td>Liver function tests</td><td>Checks liver health and treatment tolerance</td></tr><tr><td>Echocardiogram</td><td>May be required for HER2-directed treatment</td></tr><tr><td>ECG</td><td>May be needed with certain CDK4/6 inhibitors</td></tr><tr><td>CT or other imaging</td><td>Assesses disease extent and treatment response</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Named pathway</th><th>GAF planning range in India</th><th>Typical stay / schedule</th></tr></thead><tbody><tr><td><a href="${TARGETED}">Targeted therapy</a></td><td>$8,000–$30,000</td><td>Oral or infusion · months of therapy</td></tr><tr><td><a href="${MOLECULAR}">Molecular targeted therapy</a></td><td>$10,000–$32,000</td><td>Oral or infusion by mutation</td></tr><tr><td><a href="${CHEMO}">Chemotherapy</a></td><td>$1,500–$8,000+</td><td>Outpatient cycles · 3–6 months typical</td></tr><tr><td><a href="${NEOADJ}">Neoadjuvant chemotherapy</a></td><td>$2,500–$10,000</td><td>Cycles before surgery · 2–4 months</td></tr><tr><td><a href="${ADJ}">Adjuvant chemotherapy</a></td><td>$2,500–$10,000</td><td>Cycles after surgery · 3–6 months</td></tr><tr><td><a href="${HORMONE}">Hormone therapy</a></td><td>$1,000–$4,500</td><td>Outpatient · often years of tablets</td></tr><tr><td><a href="${IMMUNO}">Immunotherapy</a></td><td>$15,000–$45,000</td><td>Outpatient q2–6 weeks</td></tr></tbody></table></div>`;

const costDrivers = `<div class="md-body"><table><thead><tr><th>Treatment</th><th>Main cost considerations</th></tr></thead><tbody><tr><td>Trastuzumab</td><td>Dose, formulation, brand or biosimilar and treatment duration</td></tr><tr><td>Pertuzumab</td><td>Dose, number of administrations and whether combined with trastuzumab</td></tr><tr><td>T-DM1</td><td>Weight-based dosing, number of cycles and monitoring</td></tr><tr><td>Trastuzumab deruxtecan</td><td>Dose, treatment duration and monitoring for lung toxicity</td></tr><tr><td>Palbociclib / Ribociclib / Abemaciclib</td><td>Monthly oral medicine cost, blood tests and medicine-specific monitoring</td></tr><tr><td>Olaparib / Talazoparib</td><td>Daily tablet supply, duration and blood monitoring</td></tr><tr><td>Sacituzumab govitecan</td><td>Infusion schedule, medicine dose and supportive care</td></tr></tbody></table></div>`;

const faqs = [
  ["What is targeted therapy for breast cancer?", "Targeted therapy uses medicines that act on specific proteins, receptors or molecular pathways involved in cancer growth. The medicine is selected according to the tumour's biological characteristics."],
  ["Does every breast cancer patient need targeted therapy?", "No. Targeted treatment is appropriate only for selected patients whose cancer has the relevant biomarker or molecular feature."],
  ["What is the most common targeted therapy for HER2-positive breast cancer?", "Trastuzumab is one of the main HER2-targeted medicines. Pertuzumab, T-DM1 and trastuzumab deruxtecan may also be used in specific treatment settings."],
  ["Is trastuzumab chemotherapy?", "No. Trastuzumab is a monoclonal antibody and a HER2-targeted medicine. It may be administered alongside chemotherapy, but it is not a conventional chemotherapy drug."],
  ["What is the difference between trastuzumab and pertuzumab?", "Both medicines target HER2, but they attach to different regions of the protein and interfere with its activity in different ways. They may be combined in selected treatment plans."],
  ["What is T-DM1?", "T-DM1 is an antibody-drug conjugate combining trastuzumab with a chemotherapy-related drug. It may be used for selected HER2-positive patients, including those with residual invasive disease after preoperative treatment."],
  ["What is trastuzumab deruxtecan?", "Trastuzumab deruxtecan is an antibody-drug conjugate used in selected advanced HER2-positive and HER2-low breast cancer settings. Lung inflammation is an important risk that needs prompt medical review."],
  ["What are CDK4/6 inhibitors?", "They are targeted medicines that interfere with proteins involved in cell division. Palbociclib, ribociclib and abemaciclib are examples used in selected hormone receptor-positive, HER2-negative breast cancer settings."],
  ["Are CDK4/6 inhibitors used for HER2-positive breast cancer?", "They are primarily used in hormone receptor-positive, HER2-negative breast cancer treatment. They are not standard substitutes for HER2-targeted medicines."],
  ["What are PARP inhibitors?", "PARP inhibitors interfere with DNA repair pathways. Olaparib and talazoparib may be used in selected patients with qualifying BRCA1 or BRCA2 mutations."],
  ["Is targeted therapy better than chemotherapy?", "They are different treatments and are often used together. Targeted therapy is not automatically better than chemotherapy. The choice depends on the cancer subtype and treatment goal."],
  ["How long does targeted therapy continue?", "Duration varies. Some HER2-targeted adjuvant treatment plans aim for approximately one year. CDK4/6 inhibitors and other targeted medicines have different schedules, depending on the clinical setting."],
  ["How much does targeted therapy cost in India?", "GAF planning for targeted therapy is $8,000–$30,000 and for molecular targeted therapy $10,000–$32,000. Final cost depends on the exact medicine, dose, duration, monitoring and whether chemotherapy is combined."],
  ["Are biosimilar medicines available in India?", "Approved biosimilars are available for certain biological cancer medicines. The treating oncologist should confirm whether a particular biosimilar is appropriate."],
  ["Can international patients receive targeted therapy in India?", "Yes, subject to hospital acceptance, medical assessment and applicable travel requirements. Patients should share pathology, biomarker and previous treatment reports before travelling."],
  ["What is HER2-low breast cancer?", "HER2-low usually describes IHC 1+ or IHC 2+ without gene amplification. It is not the same as conventional HER2-positive disease, but selected antibody-drug conjugates may apply in specific advanced settings."],
  ["Which tests are needed before starting targeted therapy?", "Common tests include ER/PR, HER2 IHC with ISH when needed, blood counts, liver tests and, for some medicines, echocardiogram, ECG or germline BRCA testing."],
];

const RELATED = [
  ["Targeted therapy in India", TX_TARGETED],
  ["Molecular targeted therapy in India", TX_MOLECULAR],
  ["Breast cancer treatment in India", TX_BREAST],
  ["HER2-positive breast cancer treatment", HER2_BLOG],
  ["ER, PR and HER2 results", ERPR],
  ["Targeted therapy side effects", SIDEFX],
  ["Chemotherapy for breast cancer", CHEMO_BLOG],
  ["Hormone therapy for breast cancer", HORMONE_BLOG],
  ["Neoadjuvant therapy", NEOADJ_BLOG],
  ["Breast cancer surgery in India", SURGERY],
  ["Radiation therapy for breast cancer", RAD],
  ["Breast cancer diagnosis tests", DIAG],
  ["Breast cancer stages", STAGES],
  ["Breast cancer treatment options", OPTIONS],
  ["Breast cancer treatment cost in India", COST_BLOG],
  ["International patients", INTL],
  ["Targeted therapy cost sheet", TARGETED],
  ["Medical oncology doctors", MED_DOCS],
  ["Medical oncology hospitals", MED_HOSP],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("Breast cancer is not one single disease. Two patients may have tumours in the same breast but require very different medicines because their cancer cells have different biological characteristics."),
  p("This is why doctors examine more than the size of a tumour or its stage. They also study specific proteins and biomarkers that influence how cancer cells grow. **Targeted therapy** uses medicines designed to act on these specific features."),
  p("For example, some breast cancers produce excessive amounts of a protein called HER2 and may respond to HER2-targeted medicines such as trastuzumab and pertuzumab. Other cancers are hormone receptor-positive and HER2-negative; selected patients may benefit from CDK4/6 inhibitors with hormone therapy. Patients with certain inherited genetic mutations may also be eligible for PARP inhibitors."),
  p("India offers access to several targeted cancer medicines through specialist oncology hospitals. These treatments can involve substantial expenses, and not every medicine is suitable for every patient. GAF planning for [targeted therapy](" + TARGETED + ") is **$8,000–$30,000** (oral or infusion · months of therapy). Neighbouring [molecular targeted therapy](" + MOLECULAR + ") is **$10,000–$32,000**."),
  p("Related GAF guides include [HER2-positive breast cancer treatment](" + HER2_BLOG + "), [ER, PR and HER2 results](" + ERPR + "), [targeted therapy side effects](" + SIDEFX + ") and the curated pathway [targeted therapy in India](" + TX_TARGETED + "). Named [medical oncologists](" + MED_DOCS + ") and [medical oncology hospitals](" + MED_HOSP + ") can be filtered by city before travel."),
  btn("Ask GAF to review biomarker reports for targeted therapy", consult("Targeted Therapy for Breast Cancer")),
  p("[WhatsApp +91 90443 46292 with HER2, ER/PR and previous treatment records](" + wa("Please review my breast cancer pathology, HER2/ER/PR reports and previous treatment and advise on targeted therapy options in India.") + ")"),
  img("/uploads/articles/targeted-therapy-breast-her2-binding.webp", "Woman beside a circular molecular diagram of HER2 receptors on a cell membrane with a monoclonal antibody binding", "HER2-targeted medicines attach to specific growth receptors on cancer cells."),

  h2("What is targeted therapy for breast cancer?"),
  p("Targeted therapy is a type of cancer treatment that acts on specific molecules involved in the growth, division or survival of cancer cells. These molecules may include proteins on cancer cell surfaces, receptors that receive growth signals, enzymes involved in cell division, proteins responsible for DNA repair, and molecular pathways that help cancer cells survive."),
  p("Unlike conventional [chemotherapy](" + CHEMO_BLOG + "), which affects many rapidly dividing cells, targeted medicines are designed to interfere with particular biological processes. Targeted therapy is not completely free of side effects — some medicines can affect healthy cells or normal body functions."),
  h3("How does targeted therapy work?"),
  ol([
    "Block a growth signal that cancer cells use.",
    "Attach to a protein on the cancer cell surface.",
    "Deliver a cancer-killing medicine towards cells carrying a particular target.",
    "Block proteins involved in cell division.",
    "Interfere with the ability of cancer cells to repair damaged DNA.",
  ]),
  p("The choice of medicine depends on the cancer's subtype, stage, biomarker results and previous treatment."),

  h2("Who is eligible for targeted therapy?"),
  p("Targeted therapy is recommended only when the patient's cancer has the biological characteristics that make the treatment appropriate. The oncologist may review HER2 status, ER and PR status, tumour grade, cancer stage, lymph node involvement, previous treatment, genetic testing results and other molecular biomarkers when relevant."),
  p("Some targeted treatments are used in early-stage disease to reduce recurrence risk. Others are mainly used when cancer has spread or returned. A targeted medicine should not be prescribed simply because it is newer or more expensive. See [breast cancer stages](" + STAGES + ") and [treatment options](" + OPTIONS + ") for how sequencing fits the wider plan."),
  btn("Request a second-opinion review of eligibility", consult("Breast Cancer Targeted Therapy Second Opinion")),

  h2("Understanding HER2-positive breast cancer"),
  p("HER2 stands for human epidermal growth factor receptor 2. It is a protein involved in cell growth and division. Some breast cancer cells produce excessive amounts of HER2 or have an increased number of copies of the HER2 gene. These cancers are called HER2-positive breast cancers and may respond to medicines that specifically target this protein."),
  h3("How is HER2 status tested?"),
  p("HER2 testing is usually performed on a breast cancer tissue sample obtained through biopsy or surgery. Common tests include immunohistochemistry (IHC), which measures HER2 protein, and in situ hybridisation (ISH), which examines HER2 gene copies. Full testing pathways are covered in the [breast cancer diagnosis guide](" + DIAG + ") and [ER, PR and HER2 guide](" + ERPR + ")."),
  { id: id("html"), type: "html", html: her2Table },
  h3("What is HER2-low breast cancer?"),
  p("Some cancers that are not classified as HER2-positive may show low levels of HER2 protein — often IHC 1+ or IHC 2+ without gene amplification. HER2-low is not the same as conventional HER2-positive disease. Certain antibody-drug conjugates may be considered in specific HER2-low advanced settings, even though standard trastuzumab alone is not appropriate simply because a tumour is HER2-low."),
  img("/uploads/articles/targeted-therapy-breast-biomarker-testing.webp", "Pathology review of a breast cancer slide beside a circular diagram of receptor biomarker testing on tumour cells", "Accurate HER2, ER and PR reporting is the foundation of targeted treatment selection."),

  h2("Trastuzumab for HER2-positive breast cancer"),
  p("Trastuzumab is one of the most widely used HER2-targeted medicines. It is a monoclonal antibody that attaches to the HER2 protein on cancer cells, interferes with HER2-related signalling and helps the immune system recognise cancer cells."),
  p("It may be recommended in early-stage, locally advanced or selected metastatic HER2-positive treatment plans, often with chemotherapy. A typical adjuvant plan aims for about one year of HER2-targeted treatment, although schedules vary. Administration is usually intravenous or, where an approved formulation is appropriate, subcutaneous."),
  ul(["Fever or chills during infusion", "Fatigue, nausea, diarrhoea or headache", "Infusion-related reactions", "Reduced heart function in some patients — cardiac monitoring is important"]),
  p("Dedicated pathway detail sits on [HER2-positive breast cancer treatment in India](" + HER2_BLOG + ")."),

  h2("Pertuzumab for HER2-positive breast cancer"),
  p("Pertuzumab is another monoclonal antibody that targets HER2 at a different binding site from trastuzumab. Used together, the two medicines block HER2 signalling more comprehensively than either alone."),
  p("Pertuzumab may be included for selected patients with locally advanced, higher-risk early-stage or metastatic HER2-positive disease, often with chemotherapy and trastuzumab. Side effects can include diarrhoea, nausea, fatigue, infusion reactions and potential cardiac effects; accompanying chemotherapy may cause hair loss and low blood counts."),

  h2("What is TCHP chemotherapy and targeted therapy?"),
  p("TCHP is a commonly recognised combination for selected patients with HER2-positive breast cancer:"),
  { id: id("html"), type: "html", html: tchpTable },
  p("The combination may be used before surgery. Not every HER2-positive patient needs TCHP — stage, tumour characteristics, lymph node status and fitness decide. Neighbouring planning ranges for [neoadjuvant chemotherapy](" + NEOADJ + ") and [chemotherapy](" + CHEMO + ") sit on the cost sheets when systemic treatment is part of the plan."),

  h2("What happens after surgery if cancer remains following preoperative HER2 treatment?"),
  p("After surgery, the pathologist examines whether residual invasive cancer remains. If residual invasive disease is found after appropriate neoadjuvant HER2-targeted treatment and chemotherapy, the oncologist may recommend a different medicine rather than simply continuing the same plan."),
  h3("What is T-DM1?"),
  p("T-DM1 (ado-trastuzumab emtansine) is an antibody-drug conjugate that combines trastuzumab with a chemotherapy-related drug called DM1. It may be recommended after surgery for selected patients with residual invasive HER2-positive disease. Side effects can include fatigue, nausea, low platelets, liver enzyme changes, neuropathy and cardiac effects in selected patients."),
  p("Preoperative sequencing is also discussed in the [neoadjuvant therapy guide](" + NEOADJ_BLOG + ")."),

  h2("What is trastuzumab deruxtecan (T-DXd)?"),
  p("Trastuzumab deruxtecan is another antibody-drug conjugate that combines a HER2-targeting antibody with a potent chemotherapy-related drug. It has an important role in selected advanced breast cancer settings, including certain HER2-positive and HER2-low cancers."),
  p("Unlike trastuzumab alone, T-DXd also carries a cytotoxic payload into target cells. Possible side effects include nausea, fatigue, hair loss, reduced blood counts, liver enzyme abnormalities and **interstitial lung disease or pneumonitis**. New cough, breathlessness or fever during treatment needs immediate medical assessment."),
  img("/uploads/articles/targeted-therapy-breast-infusion-suite.webp", "Woman receiving an oncology infusion beside a circular diagram of an antibody-drug conjugate approaching target receptors", "Antibody-drug conjugates deliver a cytotoxic payload towards cells expressing the selected target."),
  btn("Ask about HER2-directed infusion planning in India", consult("HER2-Targeted Therapy")),

  h2("What are CDK4/6 inhibitors for breast cancer?"),
  p("Not all targeted therapy is designed for HER2-positive disease. Selected patients with hormone receptor-positive, HER2-negative breast cancer may receive CDK4/6 inhibitors with endocrine therapy. CDK4 and CDK6 help regulate the cell cycle; inhibitors slow cancer cell multiplication."),
  { id: id("html"), type: "html", html: cdkTable },
  p("They should not be treated as interchangeable — approved indications and evidence differ. Endocrine foundations are covered on [hormone therapy for breast cancer](" + HORMONE_BLOG + ") and the [hormone therapy cost sheet](" + HORMONE + ")."),
  h3("Palbociclib, ribociclib and abemaciclib"),
  ul([
    "**Palbociclib:** Oral CDK4/6 inhibitor commonly used with endocrine treatment in selected advanced or metastatic disease; blood-count monitoring is important.",
    "**Ribociclib:** Used with endocrine therapy in selected advanced disease and certain higher-risk early-stage cases; monitoring may include blood counts, liver tests, electrolytes and ECG.",
    "**Abemaciclib:** Used in selected high-risk early-stage and advanced settings; diarrhoea management instructions are essential, and blood clots are a recognised risk in some patients.",
  ]),
  img("/uploads/articles/targeted-therapy-breast-cdk46-monitoring.webp", "Woman with oral breast cancer tablets beside a circular diagram of CDK4/6 cell-cycle inhibition and monitoring motif", "CDK4/6 inhibitors are oral targeted medicines usually combined with endocrine therapy."),

  h2("Can CDK4/6 inhibitors be used after breast cancer surgery?"),
  p("Yes. Selected patients with higher-risk hormone receptor-positive, HER2-negative early breast cancer may be considered for adjuvant CDK4/6 inhibitor treatment alongside endocrine therapy. Eligibility depends on tumour size, nodes, grade, other high-risk features, estimated recurrence risk, prior treatment and tolerance."),
  p("Abemaciclib and ribociclib have evidence and indications in selected early-stage settings with different criteria. Palbociclib should not automatically be substituted in the adjuvant setting."),

  h2("What are PARP inhibitors for breast cancer?"),
  p("PARP inhibitors interfere with proteins involved in DNA repair. Cancer cells with certain inherited BRCA1 or BRCA2 mutations may already have DNA-repair defects; PARP inhibitors can push those cells further towards cell death."),
  ul(["**Common medicines:** Olaparib and talazoparib.", "**Who may benefit:** Selected patients with qualifying BRCA mutations in certain early high-risk or advanced HER2-negative settings.", "**Why genetic counselling matters:** Results can affect treatment choice and family risk assessment."]),
  p("Side effects may include nausea, fatigue, anaemia, low white cells or platelets and reduced appetite. Rare bone marrow disorders require monitoring."),

  h2("What are antibody-drug conjugates?"),
  p("Antibody-drug conjugates (ADCs) combine an antibody with a cancer-killing drug so treatment can be directed more selectively — though healthy tissue can still be affected. Breast cancer examples include T-DM1, trastuzumab deruxtecan and sacituzumab govitecan."),
  h3("What is sacituzumab govitecan?"),
  p("Sacituzumab govitecan targets Trop-2 and carries SN-38. It may be used in selected advanced breast cancers, including certain triple-negative and hormone receptor-positive, HER2-negative settings after prior treatment. Side effects can include diarrhoea, nausea, low white cells, fatigue, hair loss and reduced appetite."),

  h2("Which targeted therapy is used for each type of breast cancer?"),
  { id: id("html"), type: "html", html: subtypeTable },
  p("This is a simplified overview, not a prescription. Compare options against [breast cancer treatment options](" + OPTIONS + ") and the [breast cancer treatment in India](" + TX_BREAST + ") pathway."),

  h2("Targeted therapy for early-stage vs metastatic breast cancer"),
  h3("Early-stage disease"),
  p("The aim is generally to reduce recurrence risk after surgery and other indicated treatment. Examples include trastuzumab-based treatment, pertuzumab for selected higher-risk HER2-positive cases, T-DM1 after residual invasive disease, selected adjuvant CDK4/6 inhibitors with endocrine therapy, and olaparib for selected high-risk germline BRCA carriers."),
  h3("Metastatic disease"),
  p("When cancer has spread, treatment aims to control disease, relieve symptoms and maintain quality of life. Options may include HER2 antibodies, HER2-directed ADCs, CDK4/6 inhibitors, PARP inhibitors and other medicines selected by molecular testing and prior therapy."),

  h2("What tests are needed before targeted therapy?"),
  { id: id("html"), type: "html", html: testsTable },
  p("Not every patient requires every test. The oncologist selects investigations based on the proposed medicine. See also the [diagnosis tests guide](" + DIAG + ")."),

  h2("How is response to targeted therapy monitored?"),
  p("Monitoring may include symptoms, examination, blood tests, imaging, selected tumour markers, heart function where relevant and treatment-related side effects. In metastatic disease, imaging helps assess response, stability or progression. A medicine may be continued, changed or stopped depending on effectiveness and tolerability."),

  h2("Side effects of targeted therapy for breast cancer"),
  ul([
    "**HER2-targeted medicines:** Infusion reactions, fatigue, diarrhoea, nausea and cardiac function changes.",
    "**CDK4/6 inhibitors:** Low blood counts, diarrhoea, fatigue, liver enzyme changes, infection risk, heart-rhythm changes with certain medicines and blood clots with selected medicines.",
    "**PARP inhibitors:** Anaemia, nausea, fatigue, low blood counts and reduced appetite.",
    "**Antibody-drug conjugates:** Nausea, hair loss, diarrhoea, low blood counts, liver abnormalities and lung inflammation with certain medicines.",
  ]),
  p("More detail is collected on [targeted therapy side effects](" + SIDEFX + "). Patients should report new or worsening symptoms promptly."),
  p("[WhatsApp the oncology desk if you need help coordinating side-effect monitoring abroad](" + wa("I am on breast cancer targeted therapy and need guidance on monitoring and follow-up coordination with an Indian oncology team.") + ")"),

  h2("How much does targeted therapy cost in India?"),
  p("There is no single cost for targeted breast cancer treatment. Expense depends on the exact medicine, brand or approved biosimilar, dose, number of cycles or months, whether chemotherapy is combined, hospital administration charges, laboratory monitoring, imaging, cardiac assessments and side-effect management."),
  { id: id("html"), type: "html", html: costTable },
  p("These GAF figures are partner planning ranges from the live cost sheets — not hospital quotations and not a promise that every medicine falls inside the band. Read the full [breast cancer treatment cost guide](" + COST_BLOG + ") for wider pathway context."),
  { id: id("html"), type: "html", html: costDrivers },
  h3("Are biosimilars available in India?"),
  p("For certain biological medicines, approved biosimilar formulations may be available. A biosimilar is highly similar to an approved reference medicine with no clinically meaningful differences in safety, purity and potency. Patients should not switch brands without consulting their oncologist."),
  h3("What should the hospital estimate include?"),
  ol([
    "Exact medicine name and formulation",
    "Dose and frequency",
    "Number of planned cycles or months",
    "Cost per administration or monthly supply",
    "Administration charges and supportive medicines",
    "Blood tests, cardiac assessment and imaging",
    "Possible additional expenses if the plan changes",
  ]),
  btn("Request a written targeted-therapy estimate", consult("Targeted Therapy Cost Estimate")),

  h2("Targeted therapy in India for international patients"),
  p("Patients from Tanzania, Kenya, Uganda, Ethiopia, Zambia, Iraq, Oman and other regions may seek consultations for biomarker-defined breast cancers. Reviewing records before travel is especially important because targeted therapy depends on accurate pathology."),
  ul([
    "Breast biopsy and complete histopathology reports",
    "ER, PR, HER2 IHC and HER2 ISH/FISH when performed",
    "Surgery, chemotherapy and previous targeted treatment records",
    "Recent blood tests, imaging and genetic testing reports if available",
    "Current medicines and relevant medical history",
  ]),
  p("Practical travel sequencing is covered in [breast cancer treatment in India for international patients](" + INTL + "). City filters for [Delhi NCR](" + DELHI_DOCS + "), [Mumbai](" + MUMBAI_DOCS + "), [Bengaluru](" + BLR_DOCS + "), [Chennai](" + CHN_DOCS + ") and [Hyderabad](" + HYD_DOCS + ") medical oncologists help shortlist campuses."),
  btn("Start an international records review", consult("Breast Cancer Treatment in India")),

  h2("How to choose a hospital for targeted breast cancer treatment in India"),
  ul([
    "**Medical oncology expertise** for the patient's subtype",
    "**Reliable pathology** for HER2 and other biomarker reporting",
    "**Availability of the required medicine** and approved alternatives",
    "**Infusion facilities** with emergency support for injectable medicines",
    "**Monitoring facilities** for blood tests, ECG, echocardiography and imaging",
    "**Multidisciplinary care** across oncology, breast surgery, radiation, pathology and radiology — see also [breast cancer surgery](" + SURGERY + ") and [radiation therapy](" + RAD + ")",
    "**Cost transparency** covering medicine, administration and monitoring",
  ]),

  h2("Questions to ask your oncologist before starting targeted therapy"),
  ol([
    "What is the exact biological subtype of my breast cancer?",
    "Is my cancer HER2-positive, HER2-low or HER2-negative?",
    "Which test confirms my HER2 status?",
    "Why is this particular targeted medicine recommended?",
    "Is the treatment intended to reduce recurrence risk or control advanced disease?",
    "Will I need chemotherapy or hormone therapy alongside it?",
    "How long will treatment continue?",
    "What tests are required before and during treatment?",
    "What side effects should I watch for?",
    "Do I need heart monitoring?",
    "Is an approved biosimilar available?",
    "What is the estimated cost of the complete treatment course?",
    "Can treatment be continued in my home country?",
    "What happens if the cancer does not respond?",
  ]),

  h2("Frequently asked questions about targeted therapy for breast cancer in India"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Conclusion"),
  p("Targeted therapy has expanded treatment options for different types of breast cancer. HER2-targeted medicines such as trastuzumab and pertuzumab are important for HER2-positive disease. CDK4/6 inhibitors may benefit selected hormone receptor-positive, HER2-negative patients. PARP inhibitors may be appropriate when inherited mutations qualify. Antibody-drug conjugates add further options in selected advanced settings."),
  p("Usefulness depends on accurate biomarker testing, stage, previous treatment and overall health. Patients considering treatment in India should ask why a medicine is recommended, how long it may be needed, what monitoring is required and what the complete cost is likely to be. The right treatment is not necessarily the newest or most expensive medicine — it is the one supported by the diagnosis and clinical evidence."),
  btn("Discuss the next step with GAF Healthcare", consult("Targeted Therapy for Breast Cancer")),

  h2("Sources and references"),
  ol([
    "[National Cancer Institute — Targeted Therapy to Treat Cancer](https://www.cancer.gov/about-cancer/treatment/types/targeted-therapies)",
    "[NCCN Guidelines for Patients — Invasive Breast Cancer](https://vicc.org/sites/default/files/2026-09/breast-invasive-patient.pdf)",
    "[NCCN Guidelines for Patients — Metastatic Breast Cancer](https://vicc.org/sites/default/files/2026-09/stage_iv_breast-patient.pdf)",
    "[ICMR Standard Treatment Workflows — Breast Cancer](https://www.icmr.gov.in/standard-treatment-workflows-stws)",
    "[American Cancer Society — Targeted Drug Therapy for Breast Cancer](https://www.cancer.org/cancer/types/breast-cancer/treatment/targeted-therapy-for-breast-cancer.html)",
    "[ASCO living guideline — Hormone Receptor-Positive, HER2-Negative Stage I–III Breast Cancer](https://ascopubs.org/doi/10.1200/JCO-26-02034)",
    "[ESMO Metastatic Breast Cancer Clinical Practice Guideline](https://www.annalsofoncology.org/article/S0923-7534%2826%2900902-6/fulltext)",
    "[National Cancer Institute — Breast Cancer Treatment](https://www.cancer.gov/types/breast/treatment)",
  ]),
  p("*Medical disclaimer: This article is for educational purposes and does not replace an individual consultation with a qualified medical oncologist. Targeted medicines, treatment combinations and duration must be selected according to validated biomarker results, cancer stage, previous treatment and applicable clinical guidelines. Availability and regulatory approval may differ between countries. Cost estimates must be obtained directly from the treating hospital or pharmacy.*"),

  h2("Related Reading on GAF Healthcare"),
  ul(RELATED.map(([label, href]) => `[${label}](${href})`)),
];

const now = "2026-11-12T14:00:00.000Z";
const article = {
  id: "art_targeted_therapy_for_breast_cancer_in_india",
  slug: SLUG,
  title: "Targeted Therapy for Breast Cancer in India: HER2 Treatment, CDK4/6 Inhibitors, Medicines and Cost",
  excerpt:
    "Targeted therapy uses medicines designed to act on specific proteins, receptors or molecular pathways involved in breast cancer growth. This guide explains HER2-targeted treatment, CDK4/6 inhibitors, PARP inhibitors and antibody-drug conjugates, including who may benefit, common medicines, side effects and the cost of treatment in India.",
  date: "12 Nov 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare Editorial",
  category: "Medical Oncology",
  tags: [
    "breast cancer",
    "targeted therapy",
    "HER2",
    "trastuzumab",
    "CDK4/6",
    "PARP",
    "India",
    "cost",
  ],
  image: "/uploads/articles/targeted-therapy-breast-her2-binding.webp",
  imageAlt:
    "Woman beside a circular molecular diagram of HER2 receptors on a cell membrane with a monoclonal antibody binding",
  status: "published",
  featured: false,
  seoTitle: "Targeted Therapy for Breast Cancer in India: Drugs, Cost & Treatment",
  seoDescription:
    "Explore targeted therapy for breast cancer in India, including trastuzumab, pertuzumab, T-DM1, CDK4/6 inhibitors and PARP inhibitors. Understand eligibility, side effects and costs.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/targeted-therapy-breast-her2-binding.webp",
  allowIndex: true,
  keywords: [
    "Targeted therapy for breast cancer in India",
    "Targeted treatment for breast cancer",
    "HER2-positive breast cancer treatment",
    "Trastuzumab treatment in India",
    "Pertuzumab for breast cancer",
    "T-DM1 breast cancer treatment",
    "CDK4/6 inhibitors for breast cancer",
    "Palbociclib for breast cancer",
    "Ribociclib for breast cancer",
    "Abemaciclib for breast cancer",
    "PARP inhibitors for breast cancer",
    "Targeted therapy cost in India",
    "HER2-targeted therapy cost",
    "Breast cancer targeted medicines",
  ],
  relatedLinks: RELATED.map(([label, href]) => ({ label, href })),
  blocks,
};

if (!store.categories.includes("Medical Oncology")) store.categories.push("Medical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["targeted-therapy-breast-her2-binding.webp", article.imageAlt],
  [
    "targeted-therapy-breast-biomarker-testing.webp",
    "Pathology review of a breast cancer slide beside a circular diagram of receptor biomarker testing on tumour cells",
  ],
  [
    "targeted-therapy-breast-infusion-suite.webp",
    "Woman receiving an oncology infusion beside a circular diagram of an antibody-drug conjugate approaching target receptors",
  ],
  [
    "targeted-therapy-breast-cdk46-monitoring.webp",
    "Woman with oral breast cancer tablets beside a circular diagram of CDK4/6 cell-cycle inhibition and monitoring motif",
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
  const needle = "and [HIPEC vs conventional chemotherapy](https://gaf.healthcare/blogs/hipec-vs-conventional-chemotherapy).";
  if (llms.includes(needle)) {
    llms = llms.replace(
      needle,
      ", [HIPEC vs conventional chemotherapy](https://gaf.healthcare/blogs/hipec-vs-conventional-chemotherapy) and [targeted therapy for breast cancer in India](https://gaf.healthcare/blogs/targeted-therapy-for-breast-cancer-in-india).",
    );
  } else {
    llms = llms.replace(
      "- [Blogs](https://gaf.healthcare/blogs):",
      `- [Blogs](https://gaf.healthcare/blogs): includes [targeted therapy for breast cancer in India](https://gaf.healthcare/blogs/targeted-therapy-for-breast-cancer-in-india).`,
    );
  }
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

for (const relatedSlug of ["her2-positive-breast-cancer-treatment-india", "er-pr-her2-breast-cancer-treatment-india", "breast-cancer-targeted-therapy-side-effects"]) {
  const related = store.articles.find((row) => row.slug === relatedSlug);
  if (!related) continue;
  const href = `/blogs/${SLUG}`;
  related.relatedLinks = related.relatedLinks || [];
  if (!related.relatedLinks.some((row) => row.href === href)) {
    related.relatedLinks.push({ label: "Targeted therapy for breast cancer in India", href });
  }
  for (let i = 0; i < related.blocks.length; i++) {
    if (related.blocks[i].type === "heading" && /Related Reading/i.test(related.blocks[i].text || "")) {
      for (let j = i + 1; j < Math.min(i + 5, related.blocks.length); j++) {
        if (related.blocks[j].type === "list" && !related.blocks[j].items.some((item) => item.includes(href))) {
          related.blocks[j].items.push(`[Targeted Therapy for Breast Cancer in India](${href})`);
        }
      }
      break;
    }
  }
}
writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("linked from related breast articles");
