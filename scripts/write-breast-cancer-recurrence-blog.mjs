#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const SLUG = "breast-cancer-recurrence";
const EXISTING_RECUR = "/blogs/breast-cancer-recurrence-treatment-india";
const TX_BREAST = "/treatments/breast-cancer-treatment-in-india";
const FOLLOW = "/blogs/breast-cancer-follow-up-tests";
const META = "/blogs/metastatic-breast-cancer-stage-4";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const LUMP = "/blogs/lumpectomy-vs-mastectomy";
const RAD = "/blogs/radiation-therapy-for-breast-cancer";
const RAD_ALT = "/blogs/breast-cancer-radiation-therapy-in-india";
const CHEMO = "/blogs/chemotherapy-for-breast-cancer-in-india";
const CHEMO_ALT = "/blogs/breast-cancer-chemotherapy-in-india";
const HT = "/blogs/hormone-therapy-breast-cancer-india";
const HT_ALT = "/blogs/hormone-therapy-for-breast-cancer-in-india";
const HT_SE = "/blogs/breast-cancer-hormone-therapy-side-effects";
const HER2 = "/blogs/her2-positive-breast-cancer-treatment-india";
const TNBC = "/blogs/triple-negative-breast-cancer-treatment-india";
const IBC = "/blogs/inflammatory-breast-cancer-treatment-india";
const TARGETED = "/blogs/targeted-therapy-for-breast-cancer-in-india";
const LYMPH = "/blogs/breast-cancer-lymphedema";
const COST = "/blogs/breast-cancer-treatment-cost-in-india";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const STAGES = "/blogs/breast-cancer-stages-0-1-2-3-4";
const DIAG = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const DIAG_OVERVIEW = "/blogs/breast-cancer-diagnosis";
const SYMP = "/blogs/breast-cancer-symptoms";
const PATH = "/blogs/breast-cancer-pathology-report-explained";
const SCREEN = "/blogs/breast-cancer-screening-india";
const YOUNG = "/blogs/breast-cancer-in-young-women-treatment-india";
const MAST_COST = "/costs/India/Surgical-Oncology/Mastectomy";
const LUMP_COST = "/costs/India/Surgical-Oncology/Lumpectomy";
const CHEMO_COST = "/costs/India/Medical-Oncology/Chemotherapy";
const HT_COST = "/costs/India/Medical-Oncology/Hormone-Therapy";
const EBRT = "/costs/India/Radiation-Oncology/EBRT";
const PREC = "/costs/India/Medical-Oncology/Precision-Oncology";
const MED_DOCS = "/doctors/India/Medical-Oncology";
const SURG_DOCS = "/doctors/India/Surgical-Oncology";
const RAD_DOCS = "/doctors/India/Radiation-Oncology";
const DELHI = "/doctors/India/Delhi-NCR/Medical-Oncology";
const MUMBAI = "/doctors/India/Mumbai/Medical-Oncology";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;
const h2 = (text) => ({ id: id("h"), type: "heading", level: 2, text });
const h3 = (text) => ({ id: id("h"), type: "heading", level: 3, text });
const p = (text) => ({ id: id("p"), type: "paragraph", text });
const ul = (items) => ({ id: id("ul"), type: "list", style: "ul", items });
const ol = (items) => ({ id: id("ol"), type: "list", style: "ol", items });
const btn = (label, href) => ({ id: id("btn"), type: "button", label, href });
const img = (src, alt, caption) => ({ id: id("img"), type: "image", src, alt, caption });

const IMG1 = "/uploads/articles/breast-cancer-recurrence-overview.webp";
const IMG2 = "/uploads/articles/breast-cancer-recurrence-types.webp";
const IMG3 = "/uploads/articles/breast-cancer-recurrence-symptoms.webp";
const IMG4 = "/uploads/articles/breast-cancer-recurrence-treatment.webp";

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>What is recurrence?</strong></td><td>Breast cancer returns after earlier treatment — locally, regionally or at distant sites</td></tr><tr><td><strong>Three types</strong></td><td>Local (same breast/chest wall), regional (nearby lymph nodes), distant (bones, liver, lungs, brain)</td></tr><tr><td><strong>Stage 4?</strong></td><td>Only distant recurrence is Stage 4 / metastatic disease — local and regional are not automatically Stage 4</td></tr><tr><td><strong>Diagnosis</strong></td><td>Examination, imaging, biopsy and often repeat ER/PR/HER2 testing</td></tr><tr><td><strong>Treatment</strong></td><td>Depends on location, prior therapy and updated tumour biology — surgery, radiation and/or systemic medicines</td></tr><tr><td><strong>Related care</strong></td><td><a href="${EXISTING_RECUR}">Recurrence treatment in India</a> · <a href="${META}">Stage 4</a> · <a href="${FOLLOW}">follow-up</a> · <a href="${COST}">cost guide</a></td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>Breast cancer recurrence</strong> means cancer has returned after treatment — early evaluation of new symptoms helps guide the next plan.</p></aside>`;

const typesTable = `<div class="md-body"><table><thead><tr><th>Type of recurrence</th><th>Where cancer returns</th><th>Examples</th></tr></thead><tbody><tr><td>Local recurrence</td><td>Same breast or chest wall</td><td>New tumour in the treated breast or near a mastectomy scar</td></tr><tr><td>Regional recurrence</td><td>Nearby lymph nodes</td><td>Underarm, collarbone or nearby neck-region nodes</td></tr><tr><td>Distant recurrence</td><td>Organs away from breast and regional nodes</td><td>Bones, liver, lungs or brain</td></tr></tbody></table></div>`;

const distantSympTable = `<div class="md-body"><table><thead><tr><th>Site of recurrence</th><th>Possible symptoms</th></tr></thead><tbody><tr><td>Bones</td><td>Persistent bone pain, back pain, fractures or difficulty walking</td></tr><tr><td>Liver</td><td>Abdominal discomfort, nausea, loss of appetite, jaundice or abdominal swelling</td></tr><tr><td>Lungs</td><td>Persistent cough, breathlessness, chest discomfort</td></tr><tr><td>Brain</td><td>Headache, seizures, weakness, balance problems or confusion</td></tr><tr><td>Distant lymph nodes</td><td>New lumps or swelling (for example in the neck)</td></tr></tbody></table></div>`;

const imagingTable = `<div class="md-body"><table><thead><tr><th>Investigation</th><th>Purpose</th></tr></thead><tbody><tr><td>CT chest/abdomen/pelvis</td><td>Checks for possible spread to organs and lymph nodes</td></tr><tr><td>PET-CT</td><td>May help assess disease distribution in selected cases</td></tr><tr><td>Bone scan</td><td>Evaluates possible bone involvement</td></tr><tr><td>MRI of the brain</td><td>Used when brain metastases are suspected</td></tr><tr><td>MRI of the spine</td><td>Evaluates suspected spinal involvement</td></tr><tr><td>Abdominal ultrasound</td><td>Examines the liver and other abdominal structures</td></tr></tbody></table></div>`;

const recurVsPrimaryTable = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Breast cancer recurrence</th><th>Second primary breast cancer</th></tr></thead><tbody><tr><td>Meaning</td><td>Original cancer has returned</td><td>A separate, new breast cancer has developed</td></tr><tr><td>Location</td><td>Same breast, nearby nodes or distant organs</td><td>Often the opposite breast or another breast location</td></tr><tr><td>Tumour biology</td><td>May resemble or differ from the original cancer</td><td>Has its own biological characteristics</td></tr><tr><td>Treatment</td><td>Based on recurrence location, prior treatment and current markers</td><td>Based on the new cancer's stage and biology</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Named pathway</th><th>GAF planning range in India</th><th>Recurrence relevance</th></tr></thead><tbody><tr><td><a href="${LUMP_COST}">Lumpectomy</a></td><td>$3,000–$7,500</td><td>Selected repeat breast-conserving pathways when clinically appropriate</td></tr><tr><td><a href="${MAST_COST}">Mastectomy</a></td><td>$4,500–$10,000</td><td>Common surgical option for invasive local recurrence after prior lumpectomy</td></tr><tr><td><a href="${CHEMO_COST}">Chemotherapy</a></td><td>$1,500–$8,000+</td><td>When systemic cytotoxic therapy is indicated for recurrence biology or extent</td></tr><tr><td><a href="${HT_COST}">Hormone therapy</a></td><td>$1,000–$4,500</td><td>Hormone receptor-positive recurrence; medicine choice depends on prior endocrine exposure</td></tr><tr><td><a href="${EBRT}">EBRT</a></td><td>$1,000–$6,000+</td><td>Selected local/regional control or palliative radiation — prior radiation must be reviewed</td></tr><tr><td><a href="${PREC}">Precision oncology</a></td><td>$2,000–$7,000</td><td>Selected genetic / molecular testing pathways when they change treatment options</td></tr></tbody></table></div><p class="article-quick-answer__body">GAF figures are partner planning ranges for named treatment pathways — not biopsy, mammography or PET-CT package prices. Request an itemised estimate after updated pathology and imaging.</p>`;

const faqs = [
  ["Can breast cancer return after successful treatment?", "Yes. Breast cancer can return even after surgery, chemotherapy, radiation or hormone therapy. Some cancer cells may remain undetected and become active later."],
  ["How many years after treatment can breast cancer recur?", "Recurrence may happen within months or years after treatment. Some hormone receptor-positive breast cancers can recur more than ten years later."],
  ["What is the most common site of breast cancer recurrence?", "It depends on the cancer subtype and original stage. Local recurrence may occur in the treated breast or chest wall, while distant recurrence commonly affects the bones, liver, lungs or brain."],
  ["Can breast cancer recur after mastectomy?", "Yes. Mastectomy removes most breast tissue but does not eliminate every possible breast cancer cell. Recurrence can develop in the skin, chest wall or surrounding tissues."],
  ["Can breast cancer recur after lumpectomy?", "Yes. Cancer can return in the same breast after breast-conserving surgery. Appropriate radiation and systemic treatment reduce recurrence risk but cannot eliminate it completely."],
  ["Does recurrence always mean Stage 4 breast cancer?", "No. Local and regional recurrence are not automatically Stage 4. Stage 4 disease means cancer has spread to distant organs or sites."],
  ["Can breast cancer return in the opposite breast?", "A tumour in the opposite breast may be a new primary breast cancer rather than a recurrence. Biopsy and clinical assessment help distinguish between the two."],
  ["Does recurrent breast cancer always require chemotherapy?", "No. Treatment depends on the current tumour biology and location. Some patients may be treated with surgery, radiation, hormone therapy or targeted medicines without chemotherapy."],
  ["Can hormone receptor status change when breast cancer returns?", "Yes. ER, PR and HER2 status can differ between the original tumour and a recurrent tumour. When feasible, a new biopsy and repeat biomarker testing can help guide treatment."],
  ["Can local breast cancer recurrence be cured?", "Some patients with isolated local recurrence can receive treatment with curative intent. The possibility depends on the extent of recurrence, previous treatment and tumour characteristics."],
  ["Is distant breast cancer recurrence curable?", "Distant recurrence is generally not considered curable with standard treatment. However, systemic therapies can control the disease for extended periods in some patients."],
  ["Should patients undergo PET-CT every year after breast cancer treatment?", "Not routinely. For patients without symptoms or concerning findings, routine PET-CT or extensive imaging solely to search for recurrence is generally not recommended. Imaging should be guided by clinical findings and the treating team."],
  ["Can lifestyle changes prevent breast cancer recurrence?", "A healthy lifestyle may support general health and may be associated with better outcomes, but it cannot guarantee prevention. Patients should follow their prescribed treatment and avoid unproven cancer cures."],
  ["Is recurrent breast cancer treatment available in India?", "Yes. Oncology centres in India provide different treatment approaches, including surgery, chemotherapy, hormone therapy, targeted therapy and radiation. The appropriate option depends on the diagnosis and the availability of the required treatment."],
  ["When should a breast cancer survivor contact the doctor?", "Contact the treating team if you notice a new lump, persistent breast or chest-wall changes, enlarged lymph nodes, unexplained weight loss, persistent bone pain, ongoing cough or new neurological symptoms. Emergency symptoms such as seizures, sudden weakness or severe breathlessness require immediate assessment."],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("Breast cancer can sometimes return after treatment, even when the original tumour was successfully removed. Recurrence may occur in the same breast, nearby lymph nodes or distant organs such as the bones, liver, lungs and brain. This guide explains warning signs, risk factors, diagnostic tests, treatment options and care for recurrent breast cancer in India."),
  p("Related reading: [recurrence treatment in India](" + EXISTING_RECUR + "), [follow-up tests](" + FOLLOW + "), [metastatic / Stage 4 disease](" + META + "), [surgery](" + SURGERY + "), [chemotherapy](" + CHEMO + "), [hormone therapy](" + HT + "), [HER2-positive care](" + HER2 + "), [cost](" + COST + ") and [breast cancer treatment in India](" + TX_BREAST + ")."),
  btn("Ask GAF about suspected breast cancer recurrence", consult("Breast Cancer Treatment in India")),
  p("[WhatsApp +91 90443 46292 with surgery, pathology and imaging summaries](" + wa("Please review my records and advise on possible breast cancer recurrence evaluation and treatment in India.") + ")"),
  img(IMG1, "Clinician reviewing breast cancer recurrence pathways with a patient beside soft circular diagrams of local regional and distant return", "Recurrence may be local, regional or distant — treatment depends on where cancer returns."),

  h2("What Is Breast Cancer Recurrence?"),
  p("Breast cancer recurrence means that cancer returns after a patient has completed treatment for an earlier breast cancer. Treatment may have included surgery, chemotherapy, radiation therapy, hormone therapy or targeted therapy. Even after these treatments, a small number of cancer cells may sometimes remain undetected. If those cells survive and begin growing again, the cancer can return."),
  ul([
    "In the same breast where the original cancer developed.",
    "In the chest wall or around the surgical scar.",
    "In nearby lymph nodes.",
    "In distant organs such as the bones, liver, lungs or brain.",
  ]),
  p("A recurrence does not necessarily mean that the original treatment failed or that the patient did something wrong. Some local and regional recurrences can still be treated with curative intent. Distant recurrence is generally managed as [Stage 4 / metastatic breast cancer](" + META + ")."),

  h2("Can Breast Cancer Come Back After Treatment?"),
  p("Yes. The possibility of recurrence depends on the original [stage](" + STAGES + "), tumour size and grade, lymph-node involvement, hormone receptor and HER2 status, surgical margins, response to treatment and whether recommended therapy was completed."),
  p("Some cancers have a higher risk of returning in the first few years. Certain hormone receptor-positive cancers can recur many years later — which is why [follow-up](" + FOLLOW + ") remains important after active treatment ends."),

  h2("What Are the Three Types of Breast Cancer Recurrence?"),
  img(IMG2, "Soft circular medical diagram comparing local regional and distant breast cancer recurrence locations", "Local, regional and distant recurrence need different treatment approaches."),
  { id: id("html"), type: "html", html: typesTable },
  p("A local recurrence may sometimes be treated with surgery and radiation. Regional recurrence often needs a combination of systemic treatment, surgery and radiation. Distant recurrence is generally treated with medicines that act throughout the body."),

  h2("Local Breast Cancer Recurrence"),
  p("Local recurrence means cancer returns in the same breast or in the chest wall and surrounding area where the original tumour was treated. It can occur after either breast-conserving surgery or mastectomy — see [lumpectomy vs mastectomy](" + LUMP + ") and [surgery in India](" + SURGERY + ")."),
  h3("Local recurrence after lumpectomy"),
  p("If cancer returns in the same breast, doctors may recommend a new biopsy, imaging to determine extent, mastectomy in many cases, repeat breast-conserving surgery only in carefully selected patients, radiation when appropriate and safe, and hormone therapy, chemotherapy or targeted therapy depending on biology. Prior [radiation](" + RAD + ") strongly influences what can be repeated safely."),
  h3("Local recurrence after mastectomy"),
  p("Cancer can return in the mastectomy scar, skin over the chest, tissue beneath the skin, chest wall or around a reconstructed breast. Treatment may include surgical removal, radiation if appropriate and systemic therapy. Doctors also investigate whether disease is limited to the chest wall or has spread elsewhere."),

  h2("Regional Breast Cancer Recurrence"),
  p("Regional recurrence occurs when breast cancer returns in lymph nodes near the original site — commonly axillary (underarm), supra- or infraclavicular (around the collarbone) or internal mammary nodes near the breastbone."),
  ul([
    "A new lump in the armpit.",
    "Swelling near the collarbone or lower neck.",
    "Persistent discomfort around the shoulder or arm.",
    "Arm swelling (also consider [lymphoedema](" + LYMPH + ")).",
  ]),
  p("Not every enlarged lymph node is cancer. Treatment may combine systemic therapy, surgical removal of affected nodes when feasible, radiation and subtype-directed medicines. Repeating radiation to a previously treated area requires careful specialist assessment. See also [radiation therapy in India](" + RAD_ALT + ")."),
  btn("Request a regional recurrence second opinion", consult("Breast Cancer Treatment in India")),

  h2("Distant Breast Cancer Recurrence"),
  p("Distant recurrence means breast cancer returns in organs away from the breast and regional lymph nodes. It is also called metastatic breast cancer or Stage 4 disease. When breast cancer spreads to another organ, it remains breast cancer — for example, breast cancer in the liver is metastatic breast cancer, not primary liver cancer."),
  { id: id("html"), type: "html", html: distantSympTable },
  h3("When is distant recurrence an emergency?"),
  ul([
    "New severe back pain with leg weakness or numbness.",
    "Loss of bladder or bowel control.",
    "A new seizure, sudden confusion or weakness.",
    "Severe or sudden breathlessness or severe chest pain.",
    "Sudden inability to walk or bear weight.",
  ]),
  p("These symptoms may indicate spinal cord compression, brain involvement, fracture or a blood clot — seek immediate care rather than waiting for a routine oncology appointment. Full Stage 4 pathway: [metastatic breast cancer](" + META + ")."),

  h2("Can Breast Cancer Return After 5 or 10 Years?"),
  p("Yes. Timing depends partly on subtype:"),
  ul([
    "**Hormone receptor-positive** — prolonged risk; dormant cells may activate years later; multi-year [hormone therapy](" + HT_ALT + ") is often used to reduce risk.",
    "**HER2-positive** — can recur, but [HER2-targeted treatment](" + HER2 + ") has substantially improved outcomes.",
    "**Triple-negative** — often higher risk in earlier years after diagnosis; see [TNBC treatment in India](" + TNBC + ").",
    "**Inflammatory breast cancer** — aggressive biology needing specialised care and close follow-up; see [IBC guide](" + IBC + ").",
  ]),

  h2("Risk Factors for Breast Cancer Recurrence"),
  ul([
    "More advanced stage or larger tumour at initial diagnosis.",
    "Lymph-node involvement at diagnosis.",
    "High tumour grade.",
    "Positive surgical margins.",
    "Aggressive biology (including some TNBC and inflammatory cases).",
    "Incomplete or interrupted recommended treatment.",
    "Excess body weight and inactivity — associated with outcomes in some studies, but lifestyle alone cannot guarantee prevention.",
  ]),
  p("Patients should not blame themselves for recurrence. Side effects, other medical conditions, finances and access to care all influence treatment completion."),

  h2("Early Warning Signs of Breast Cancer Recurrence"),
  img(IMG3, "Breast cancer survivor noting chest-wall and armpit changes beside soft circular warning-sign icons for recurrence symptoms", "New lumps, scar changes or persistent unexplained symptoms deserve prompt assessment."),
  h3("Changes in the breast"),
  ul(["New lump in the treated breast.", "Thickening or hardening.", "Change in size or shape.", "Skin dimpling, redness or swelling.", "Nipple inversion or unusual discharge.", "Persistent localised pain."]),
  h3("Changes around a mastectomy scar"),
  ul(["New lump near the scar.", "Thickening beneath the skin.", "Persistent rash or unusual skin change.", "Nodule near a reconstructed breast.", "New swelling or redness around the surgical area."]),
  h3("Armpit, neck and general symptoms"),
  ul(["New armpit or collarbone swelling.", "Unexplained arm swelling.", "Unexplained weight loss or persistent fatigue.", "Ongoing bone pain, cough or breathlessness.", "New neurological symptoms."]),
  p("These symptoms are not specific to recurrence — many have other causes. Persistent or unusual changes should still be discussed. Related: [symptoms overview](" + SYMP + ") and [screening vs diagnostic care](" + SCREEN + ")."),
  p("[WhatsApp +91 90443 46292 if you have a new lump or scar change](" + wa("I have a new breast or chest-wall finding after breast cancer treatment. Please help arrange urgent specialist review in India.") + ")"),

  h2("How Is Breast Cancer Recurrence Diagnosed?"),
  p("When recurrence is suspected, doctors need to know whether the finding is cancer, where it is and how extensive it is, and whether the biological profile has changed. Pathway overview: [diagnosis](" + DIAG_OVERVIEW + ") and [ER/PR/HER2 testing](" + DIAG + ")."),
  ol([
    "**Clinical examination** — treated breast or chest wall, scar or reconstruction, armpits, collarbone and neck.",
    "**Mammography and ultrasound** — for remaining breast tissue, scar-region lumps or enlarged nodes.",
    "**Breast MRI** — when mammography/ultrasound are inconclusive or extent assessment is needed.",
    "**Biopsy** — often essential to confirm recurrence and distinguish scar, infection or a new unrelated tumour.",
    "**Repeat ER, PR and HER2 testing** — receptor status can change at recurrence; treatment may follow updated findings.",
    "**Staging imaging** — selected CT, PET-CT, bone scan or MRI based on symptoms (not every test for every patient).",
    "**Blood tests** — blood counts, liver/kidney function, calcium; tumour markers are not used alone to confirm recurrence.",
    "**Molecular testing** — BRCA, PIK3CA, ESR1, PD-L1 or other assays when they may open treatment options; see [precision oncology planning](" + PREC + ").",
  ]),
  { id: id("html"), type: "html", html: imagingTable },
  p("Understanding reports: [pathology report explained](" + PATH + ")."),
  btn("Get help coordinating recurrence imaging and biopsy", consult("Breast Cancer Diagnosis")),

  h2("How Is Recurrent Breast Cancer Treated?"),
  img(IMG4, "Multidisciplinary oncology team discussing surgery radiation and systemic options for recurrent breast cancer beside soft circular treatment icons", "Treatment is individualised by recurrence site, prior therapy and updated tumour biology."),
  p("There is no single treatment for every recurrence. Doctors consider previous surgery and radiation, prior chemotherapy and targeted medicines, current receptor status, disease-free interval, general health and whether disease is limited or widespread. Companion guide: [recurrence treatment in India](" + EXISTING_RECUR + ")."),

  h3("Treatment of local recurrence"),
  p("Surgery is often central — mastectomy is frequently recommended after prior lumpectomy for invasive local recurrence; selected patients may discuss another breast-conserving operation. After mastectomy, surgeons may remove the recurrent tumour and surrounding tissue when feasible. Radiation may follow surgery or be used when surgery is not appropriate, if safe after prior exposure. Systemic therapy (hormone therapy, chemotherapy, HER2-targeted or other [targeted therapy](" + TARGETED + "), immunotherapy in eligible settings) may still be needed even when disease appears local."),

  h3("Treatment of regional recurrence"),
  p("Plans may include biopsy confirmation, imaging to exclude distant spread, systemic therapy before surgery in selected cases, lymph-node surgery when feasible, radiation where appropriate and further systemic treatment based on updated markers. Lymphoedema risk must be considered."),

  h3("Treatment of distant recurrence"),
  p("Managed as metastatic disease. Options may include hormone therapy, CDK4/6 inhibitors, HER2-directed medicines, chemotherapy, immunotherapy, PARP inhibitors for selected BRCA mutations, antibody-drug conjugates, radiation for painful or threatening sites and supportive/palliative care. See [Stage 4 guide](" + META + ")."),

  h2("Does Recurrent Breast Cancer Need Chemotherapy?"),
  p("Not always. [Chemotherapy](" + CHEMO_ALT + ") may be recommended for triple-negative disease, aggressive or rapidly progressing recurrence, inadequate endocrine control, progression after prior endocrine therapy, distant disease needing a rapid systemic response, or when tumour characteristics suggest meaningful benefit. Some hormone receptor-positive patients receive endocrine therapy with targeted medicines instead."),

  h2("Can Hormone Therapy Be Used Again After Recurrence?"),
  p("Sometimes — when the recurrent tumour remains hormone receptor-positive. Choice depends on prior tamoxifen, aromatase inhibitors or fulvestrant, whether recurrence occurred during or after endocrine therapy, disease-free interval and molecular changes. See [hormone therapy](" + HT + ") and [side effects](" + HT_SE + "). Do not stop prescribed endocrine therapy without oncologist advice."),
  btn("Ask about hormone therapy options after recurrence", consult("Hormone Therapy for Breast Cancer")),

  h2("Can HER2-Positive Breast Cancer Recur?"),
  p("Yes. Depending on prior exposure and current disease, oncologists may consider trastuzumab, pertuzumab, trastuzumab deruxtecan, trastuzumab emtansine, tucatinib-based combinations or other HER2-directed options. Sequencing depends on previous medicines, response, side effects and brain involvement. Detail: [HER2-positive treatment in India](" + HER2 + ")."),

  h2("Opposite Breast Cancer vs Recurrence"),
  p("A new tumour in the opposite breast is not automatically a recurrence of the original cancer. Doctors distinguish a new primary, metastatic involvement or (less commonly) related disease involving the opposite breast. Biopsy and imaging establish the diagnosis — a new primary is treated according to its own stage and biology."),
  { id: id("html"), type: "html", html: recurVsPrimaryTable },

  h2("Prognosis for Recurrent Breast Cancer"),
  p("Outlook depends mainly on whether recurrence is local, regional or distant; whether it can be completely removed; number and location of metastatic sites; ER/PR/HER2 status; grade; prior treatment response; general health; and available medicines."),
  ul([
    "**Local** — some isolated local recurrences can be treated with curative intent.",
    "**Regional** — selected isolated regional recurrences may also receive intensive multimodality treatment with curative intent after distant disease is excluded.",
    "**Distant** — generally not considered curable with standard treatment, but modern systemic therapies can control disease for extended periods in some patients.",
  ]),
  p("There is no single survival figure that accurately predicts an individual patient's course after recurrence."),

  h2("Can Breast Cancer Recurrence Be Prevented?"),
  p("There is no guaranteed prevention. Practical steps include completing recommended treatment (discuss side effects before stopping), attending [follow-up](" + FOLLOW + "), maintaining a healthy lifestyle, avoiding unproven \"cures\" and following a surveillance plan tailored to surgery and remaining breast tissue — not automatic annual PET-CT for every asymptomatic survivor."),

  h2("Emotional Challenges After Recurrence"),
  p("Hearing that breast cancer has returned can bring fear, anger, sadness, sleep disturbance, financial worry and uncertainty. Psychological counselling, support groups, family involvement and palliative care introduced alongside active treatment can help manage symptoms and distress — palliative care does not mean treatment has stopped."),

  h2("Treatment of Recurrent Breast Cancer in India"),
  p("For recurrent disease, the priority is a team that can review the original diagnosis, assess current disease and plan treatment from the latest pathology and imaging."),
  ol([
    "**Review of original records** — biopsy, surgical pathology, ER/PR/HER2, imaging, operation notes, chemo/radiation summaries and prior targeted or hormone therapy.",
    "**Updated diagnosis and biomarkers** — new biopsy and receptor/molecular testing when indicated.",
    "**Multidisciplinary planning** — medical, surgical and radiation oncology with radiology, pathology, reconstructive surgery and palliative care as needed.",
    "**Access to modalities** — surgery, chemotherapy, hormone therapy, HER2-targeted medicines, immunotherapy, radiation and supportive care when indicated.",
  ]),
  p("Specialists: [medical oncology](" + MED_DOCS + "), [surgical oncology](" + SURG_DOCS + "), [radiation oncology](" + RAD_DOCS + "), [Delhi NCR](" + DELHI + "), [Mumbai](" + MUMBAI + "). International pathway: [international patients](" + INTL + "). Younger patients: [breast cancer in young women](" + YOUNG + ")."),
  btn("Talk to GAF about recurrence care in India", consult("Breast Cancer Treatment in India")),

  h2("How Much Does Recurrent Breast Cancer Treatment Cost in India?"),
  p("There is no single cost. Expense depends on where cancer has returned, prior treatment and which options remain suitable. Imaging, biopsy and medicine charges vary by centre — GAF does not invent fixed biopsy or scan package prices. Related named pathway planning ranges:"),
  { id: id("html"), type: "html", html: costTable },
  p("Broader context: [breast cancer treatment cost in India](" + COST + "). Request an itemised estimate after updated diagnosis rather than relying on a general advertised price."),
  p("[WhatsApp +91 90443 46292 for a case-specific recurrence cost review](" + wa("Please review my recurrent breast cancer records and share a case-specific treatment estimate in India.") + ")"),
  btn("Request a recurrence treatment estimate", consult("Breast Cancer Treatment in India")),

  h2("Travelling to India for Recurrent Breast Cancer Treatment"),
  p("Patients from Tanzania, Kenya, Uganda, Ethiopia, Zambia, Cameroon, Iraq, Oman, Saudi Arabia and other countries should organise records before travel:"),
  ul([
    "Original biopsy and surgical pathology reports.",
    "ER, PR and HER2 reports (and HER2 FISH/ISH if available).",
    "Previous and current imaging reports plus digital files.",
    "Chemotherapy, radiation, hormone and targeted therapy summaries.",
    "Operation records, recent blood tests, genetic/molecular results and current medicine list.",
  ]),
  p("If possible, carry pathology slides or tissue blocks. Ask: Is this definite recurrence? Local, regional or distant? Has receptor status changed? Is surgery possible? What systemic therapy is recommended? What are benefits, side effects, duration, estimated cost and home follow-up?"),

  h2("How GAF Healthcare Can Help"),
  p("GAF Healthcare assists international patients exploring treatment in India — connecting with oncology specialists, organising records for review, coordinating consultations and second opinions, explaining proposed investigations and supporting hospital and travel logistics. The treating oncologist remains responsible for diagnosis and medical recommendations. Do not delay urgent local care while arranging travel."),
  btn("Coordinate a recurrence second opinion with GAF", consult("Breast Cancer Treatment in India")),
  p("[WhatsApp +91 90443 46292 to share records before travel](" + wa("I am planning travel for recurrent breast cancer evaluation in India. Please advise which records to send and how to arrange consultations.") + ")"),

  h2("Frequently Asked Questions About Breast Cancer Recurrence"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Final Thoughts"),
  p("Breast cancer recurrence can be distressing, but it does not mean that treatment options have run out. The first step is to identify where cancer has returned and confirm the diagnosis with biopsy, updated ER/PR/HER2 testing and appropriate imaging."),
  p("Local and regional recurrences may sometimes be treated with surgery, radiation and systemic medicines aiming for long-term control or cure. Distant recurrence is generally treated as metastatic breast cancer according to tumour biology and the patient's health."),
  p("Do not ignore persistent new symptoms, do not assume every new lump is cancer, and do not delay assessment because of fear. Early evaluation helps patients and doctors make informed decisions."),

  h2("Medical Sources and References"),
  ol([
    "[NCI – Breast Cancer Recurrence](https://www.cancer.gov/types/breast/breast-cancer-survivorship/recurrence)",
    "[American Cancer Society – Treatment of Recurrent Breast Cancer](https://www.cancer.org/cancer/types/breast-cancer/treatment/treatment-of-breast-cancer-by-stage/treatment-of-recurrent-breast-cancer.html)",
    "[NCCN Guidelines for Patients – Metastatic Breast Cancer, 2026](https://vicc.org/sites/default/files/2026-09/stage_iv_breast-patient.pdf)",
    "[ESMO – Metastatic Breast Cancer Clinical Practice Guideline](https://www.annalsofoncology.org/article/S0923-7534%2826%2900902-6/fulltext)",
    "[NCI – Breast Cancer Treatment (PDQ)](https://www.cancer.gov/types/breast/hp/breast-treatment-pdq)",
    "[ASCO – Breast Cancer Follow-Up and Surveillance After Primary Treatment, 2026](https://ascopubs.org/doi/full/10.1200/JCO-26-01700)",
    "[American Cancer Society – Cancer Recurrence](https://www.cancer.org/cancer/survivorship/recurrence.html)",
    "[AGO – Early Breast Cancer Recommendations, 2025 Update](https://pmc.ncbi.nlm.nih.gov/articles/PMC11996201/)",
  ]),
  p("*Medical disclaimer: This article is intended for general education and does not replace consultation with a qualified medical professional. A patient's diagnosis, recurrence risk and treatment plan must be determined by the treating oncology team after reviewing clinical history, pathology, imaging and relevant biomarker tests.*"),

  h2("Related Reading"),
  ul([
    `[Breast Cancer Recurrence Treatment in India](${EXISTING_RECUR})`,
    `[Breast Cancer Treatment in India](${TX_BREAST})`,
    `[Metastatic Breast Cancer (Stage 4)](${META})`,
    `[Breast Cancer Follow-Up Tests](${FOLLOW})`,
    `[Breast Cancer Surgery in India](${SURGERY})`,
    `[Lumpectomy vs Mastectomy](${LUMP})`,
    `[Radiation Therapy for Breast Cancer](${RAD})`,
    `[Chemotherapy for Breast Cancer in India](${CHEMO})`,
    `[Hormone Therapy for Breast Cancer](${HT})`,
    `[HER2-Positive Breast Cancer](${HER2})`,
    `[Triple-Negative Breast Cancer](${TNBC})`,
    `[Targeted Therapy for Breast Cancer](${TARGETED})`,
    `[Diagnosis tests (ER/PR/HER2)](${DIAG})`,
    `[Breast Cancer Treatment Cost in India](${COST})`,
    `[International Patients](${INTL})`,
  ]),
];

const now = new Date().toISOString();
const article = {
  id: "art_breast_cancer_recurrence",
  slug: SLUG,
  title: "Breast Cancer Recurrence: Local, Regional and Distant Recurrence, Symptoms, Diagnosis and Treatment in India",
  excerpt:
    "Breast cancer can sometimes return after treatment, even when the original tumour has been successfully removed. Recurrence may occur in the same breast, nearby lymph nodes or distant organs such as the bones, liver, lungs and brain. This guide explains the warning signs, risk factors, diagnostic tests, treatment options and what patients should know when seeking treatment for recurrent breast cancer in India.",
  date: "13 November 2026",
  publishedAt: "2026-11-13T11:00:00.000Z",
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Medical Oncology",
  tags: ["breast cancer", "recurrence", "metastatic", "local recurrence", "India"],
  image: IMG1,
  imageAlt: "Clinician reviewing breast cancer recurrence pathways with a patient",
  status: "published",
  featured: true,
  seoTitle: "Breast Cancer Recurrence: Symptoms, Diagnosis, Treatment and Care in India",
  seoDescription:
    "Learn why breast cancer returns, its early warning signs, local and distant recurrence, diagnostic tests, treatment options and care available in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: IMG1,
  allowIndex: true,
  keywords: [
    "Breast cancer recurrence",
    "Breast cancer coming back",
    "Symptoms of recurrent breast cancer",
    "Local breast cancer recurrence",
    "Regional breast cancer recurrence",
    "Distant breast cancer recurrence",
    "Breast cancer recurrence after mastectomy",
    "Breast cancer recurrence after lumpectomy",
    "Breast cancer recurrence after chemotherapy",
    "Breast cancer recurrence after radiation",
    "Breast cancer recurrence after 5 years",
    "Recurrent breast cancer treatment in India",
    "Breast cancer recurrence diagnosis",
    "Breast cancer recurrence survival rate",
  ],
  relatedLinks: [
    { label: "Breast cancer recurrence treatment in India", href: EXISTING_RECUR },
    { label: "Breast Cancer Treatment in India", href: TX_BREAST },
    { label: "Metastatic breast cancer (Stage 4)", href: META },
    { label: "Follow-up tests", href: FOLLOW },
    { label: "HER2-positive breast cancer", href: HER2 },
    { label: "Cost guide", href: COST },
    { label: "International patients", href: INTL },
  ],
  blocks,
};

for (const [file, alt] of [
  ["breast-cancer-recurrence-overview.webp", article.imageAlt],
  [
    "breast-cancer-recurrence-types.webp",
    "Soft circular medical diagram comparing local regional and distant breast cancer recurrence locations",
  ],
  [
    "breast-cancer-recurrence-symptoms.webp",
    "Breast cancer survivor noting chest-wall and armpit changes beside soft circular warning-sign icons for recurrence symptoms",
  ],
  [
    "breast-cancer-recurrence-treatment.webp",
    "Multidisciplinary oncology team discussing surgery radiation and systemic options for recurrent breast cancer",
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
console.log("wrote", SLUG, "blocks", blocks.length, "faqs", faqs.length, "articles", store.articles.length);

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(SLUG)) {
  const needle = "- [Blogs](https://gaf.healthcare/blogs):";
  if (llms.includes(needle)) {
    llms = llms.replace(
      needle,
      `- [Blogs](https://gaf.healthcare/blogs): includes [breast cancer recurrence](https://gaf.healthcare/blogs/${SLUG}).`,
    );
  } else {
    llms += `\n- [Breast cancer recurrence](https://gaf.healthcare/blogs/${SLUG})\n`;
  }
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

for (const relatedSlug of [
  "breast-cancer-recurrence-treatment-india",
  "metastatic-breast-cancer-stage-4",
  "breast-cancer-follow-up-tests",
  "breast-cancer-surgery-in-india",
  "hormone-therapy-for-breast-cancer-in-india",
  "breast-cancer-chemotherapy-in-india",
  "her2-positive-breast-cancer-treatment-india",
  "triple-negative-breast-cancer-treatment-india",
  "breast-cancer-treatment-cost-in-india",
  "breast-cancer-treatment-india-international-patients",
  "breast-cancer-lymphedema",
  "breast-cancer-diagnosis-tests-biopsy-er-pr-her2",
]) {
  const related = store.articles.find((row) => row.slug === relatedSlug);
  if (!related) continue;
  const href = `/blogs/${SLUG}`;
  related.relatedLinks = related.relatedLinks || [];
  if (!related.relatedLinks.some((row) => row.href === href)) {
    related.relatedLinks.push({ label: "Breast cancer recurrence", href });
  }
}
writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("linked from related articles");
