import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));
const consult = (t) => `/consult?treatment=${encodeURIComponent(t)}`;
const wa = (m) => `https://wa.me/919044346292?text=${encodeURIComponent(m)}`;

const PILLAR = "/treatments/breast-cancer-treatment-in-india";
const CHEMO_TX = "/treatments/chemotherapy-in-india";
const ADJ = "/treatments/adjuvant-chemotherapy-in-india";
const NEO = "/treatments/neoadjuvant-chemotherapy-in-india";
const RECON_TX = "/treatments/breast-reconstruction-in-india";
const DIAG = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const STAGES = "/blogs/breast-cancer-stages-0-1-2-3-4";
const BY_STAGE = "/blogs/breast-cancer-treatment-by-stage";
const COST = "/blogs/breast-cancer-treatment-cost-in-india";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const CHEMO_B = "/blogs/chemotherapy-for-breast-cancer-in-india";
const RAD = "/blogs/radiation-therapy-for-breast-cancer";
const HER2 = "/blogs/her2-positive-breast-cancer-treatment-india";
const HORMONE = "/blogs/hormone-therapy-breast-cancer-india";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const RECON = "/blogs/breast-reconstruction-after-mastectomy-india";
const BIO = "/blogs/er-pr-her2-breast-cancer-treatment-india";
const PATH = "/blogs/breast-cancer-pathology-report-explained";
const NEO_B = "/blogs/breast-cancer-neoadjuvant-therapy";
const LUMPECTOMY = "/costs/India/Surgical-Oncology/Lumpectomy";
const MASTECTOMY = "/costs/India/Surgical-Oncology/Mastectomy";
const NSM = "/costs/India/Surgical-Oncology/Nipple-Sparing-Mastectomy";
const ONCO = "/costs/India/Surgical-Oncology/Oncoplastic-Breast-Surgery";
const RECON_C = "/costs/India/Surgical-Oncology/Breast-Reconstruction";
const SLNB = "/costs/India/Surgical-Oncology/Sentinel-Lymph-Node-Biopsy";
const CHEMO = "/costs/India/Medical-Oncology/Chemotherapy";
const HORM_C = "/costs/India/Medical-Oncology/Hormone-Therapy";
const TARG = "/costs/India/Medical-Oncology/Targeted-Therapy";
const IMM = "/costs/India/Medical-Oncology/Immunotherapy";
const EBRT = "/costs/India/Radiation-Oncology/EBRT";
const SURG_DOCS = "/doctors/India/Surgical-Oncology";
const MED_DOCS = "/doctors/India/Medical-Oncology";
const LUMP_D = "/doctors/India/Surgical-Oncology/Lumpectomy";
const MAST_D = "/doctors/India/Surgical-Oncology/Mastectomy";
const SURG_H = "/hospitals/India/Surgical-Oncology";
const DELHI_H = "/hospitals/India/Delhi-NCR/Surgical-Oncology";
const MUM_H = "/hospitals/India/Mumbai/Surgical-Oncology";
const BLR_H = "/hospitals/India/Bengaluru/Surgical-Oncology";
const DELHI_L = "/costs/India/Delhi-NCR/Surgical-Oncology/Lumpectomy";
const MUM_L = "/costs/India/Mumbai/Surgical-Oncology/Lumpectomy";
const BLR_L = "/costs/India/Bengaluru/Surgical-Oncology/Lumpectomy";
const DELHI_M = "/costs/India/Delhi-NCR/Surgical-Oncology/Mastectomy";
const MUM_M = "/costs/India/Mumbai/Surgical-Oncology/Mastectomy";
const BLR_M = "/costs/India/Bengaluru/Surgical-Oncology/Mastectomy";

let n = 0;
const id = (p) => `${p}_${(++n).toString().padStart(3, "0")}`;
const h2 = (t) => ({ id: id("h"), type: "heading", level: 2, text: t });
const h3 = (t) => ({ id: id("h"), type: "heading", level: 3, text: t });
const p = (t) => ({ id: id("p"), type: "paragraph", text: t });
const ul = (items) => ({ id: id("ul"), type: "list", style: "ul", items });
const ol = (items) => ({ id: id("ol"), type: "list", style: "ol", items });
const btn = (label, href) => ({ id: id("btn"), type: "button", label, href });
const img = (src, alt, caption) => ({ id: id("img"), type: "image", src, alt, caption });
const html = (markup) => ({ id: id("html"), type: "html", html: markup });

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>Main options</strong></td><td>Surgery, chemotherapy, radiation, hormone therapy, targeted therapy, immunotherapy and supportive care</td></tr><tr><td><strong>What decides treatment?</strong></td><td>Stage, ER/PR/HER2, tumour size/nodes, health, menopausal status and preferences — see <a href="${DIAG}">diagnosis tests</a></td></tr><tr><td><strong>Surgery choices</strong></td><td><a href="${LUMPECTOMY}">Lumpectomy</a> or <a href="${MASTECTOMY}">mastectomy</a> (± reconstruction)</td></tr><tr><td><strong>GAF lumpectomy</strong></td><td><a href="${LUMPECTOMY}">$3,500–$8,000</a>, typically <strong>1–3 nights</strong></td></tr><tr><td><strong>GAF mastectomy</strong></td><td><a href="${MASTECTOMY}">$4,500–$10,000</a>, typically <strong>3–6 nights</strong></td></tr><tr><td><strong>Systemic chemo</strong></td><td><a href="${CHEMO}">$1,500–$8,000+</a> (outpatient cycles)</td></tr><tr><td><strong>Radiation</strong></td><td><a href="${EBRT}">$1,000–$6,000+</a> (outpatient course)</td></tr><tr><td><strong>Pathway in India</strong></td><td><a href="${PILLAR}">Breast cancer treatment in India</a></td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>Breast cancer treatment</strong> is personalised. Many patients need a combination of local therapy (surgery ± radiation) and systemic therapy based on stage and biomarkers. GAF planning ranges are partner estimates — not hospital quotations. Full cost context: <a href="${COST}">breast cancer treatment cost in India</a>.</p><p class="article-quick-answer__body"><strong>Important:</strong> GAF Healthcare does not diagnose cancer or prescribe treatment. Decisions remain with the multidisciplinary hospital team. Emergency symptoms belong in a local emergency department.</p></aside>`;

const optionsTable = `<div class="md-body"><table><thead><tr><th>Treatment</th><th>What it does</th><th>When it may be used</th></tr></thead><tbody><tr><td>Breast-conserving surgery</td><td>Removes the tumour while preserving most of the breast</td><td>Selected early-stage cancers</td></tr><tr><td>Mastectomy</td><td>Removes breast tissue</td><td>When conservation is unsuitable or not preferred</td></tr><tr><td>Chemotherapy</td><td>Destroys or stops cancer cells systemically</td><td>Selected early and advanced cancers</td></tr><tr><td>Radiation therapy</td><td>Local high-energy treatment</td><td>Commonly after conservation; selected post-mastectomy cases</td></tr><tr><td>Hormone therapy</td><td>Blocks hormone-driven growth</td><td>ER/PR-positive cancers</td></tr><tr><td>Targeted therapy</td><td>Acts on molecular features (e.g. HER2)</td><td>HER2-positive and selected subtypes</td></tr><tr><td>Immunotherapy</td><td>Helps immune attack on cancer</td><td>Selected triple-negative cases</td></tr><tr><td>Supportive / palliative care</td><td>Symptom control and quality of life</td><td>Any stage when needed</td></tr></tbody></table></div>`;

const mastTypes = `<div class="md-body"><table><thead><tr><th>Type</th><th>What is removed</th></tr></thead><tbody><tr><td>Total / simple mastectomy</td><td>Breast tissue, generally including nipple and areola</td></tr><tr><td>Modified radical mastectomy</td><td>Breast tissue and axillary nodes as indicated</td></tr><tr><td>Skin-sparing mastectomy</td><td>Breast tissue with most skin preserved</td></tr><tr><td>Nipple-sparing mastectomy</td><td>Breast tissue with nipple/areola preserved in selected patients</td></tr></tbody></table></div>`;

const reconTable = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Immediate reconstruction</th><th>Delayed reconstruction</th></tr></thead><tbody><tr><td>Timing</td><td>During mastectomy</td><td>Months or longer after</td></tr><tr><td>Main benefit</td><td>Rebuilds shape during initial surgery</td><td>Allows cancer treatment to take priority</td></tr><tr><td>Radiation</td><td>Needs careful planning</td><td>May follow radiation</td></tr></tbody></table></div>`;

const nodeTable = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Sentinel lymph node biopsy</th><th>Axillary dissection</th></tr></thead><tbody><tr><td>Nodes removed</td><td>Usually a small number</td><td>A larger group</td></tr><tr><td>Purpose</td><td>Assess initial nodal spread</td><td>Remove more involved nodes</td></tr><tr><td>Lymphoedema risk</td><td>Generally lower</td><td>Generally higher</td></tr></tbody></table></div>`;

const chemoSE = `<div class="md-body"><table><thead><tr><th>Side effect</th><th>What patients may experience</th></tr></thead><tbody><tr><td>Hair loss</td><td>Temporary or persistent thinning with some drugs</td></tr><tr><td>Nausea</td><td>Feeling sick or vomiting</td></tr><tr><td>Fatigue</td><td>Tiredness and reduced energy</td></tr><tr><td>Low blood counts</td><td>Infection, anaemia or bleeding risk</td></tr><tr><td>Neuropathy</td><td>Tingling or numbness in hands/feet</td></tr></tbody></table></div>`;

const typeTable = `<div class="md-body"><table><thead><tr><th>Breast cancer type</th><th>Common approaches</th></tr></thead><tbody><tr><td>ER/PR-positive, HER2-negative</td><td>Surgery, radiation, endocrine therapy ± chemo</td></tr><tr><td>HER2-positive</td><td>Surgery or neoadjuvant systemic therapy + HER2 drugs</td></tr><tr><td>Triple-negative</td><td>Chemo, surgery, radiation ± immunotherapy</td></tr><tr><td>DCIS</td><td>Conservation or mastectomy ± radiation/endocrine</td></tr><tr><td>Inflammatory</td><td>Systemic first, then surgery and radiation if non-metastatic</td></tr><tr><td>Metastatic</td><td>Systemic therapy tailored to biology</td></tr></tbody></table></div>`;

const neoAdj = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Neoadjuvant</th><th>Adjuvant</th></tr></thead><tbody><tr><td>Timing</td><td>Before surgery</td><td>After surgery</td></tr><tr><td>Purpose</td><td>Shrink tumour; treat micrometastases early</td><td>Reduce recurrence risk</td></tr><tr><td>Examples</td><td>Chemo, HER2 drugs, selected immunotherapy</td><td>Chemo, radiation, hormone, targeted therapy</td></tr></tbody></table></div>`;

const seTable = `<div class="md-body"><table><thead><tr><th>Treatment</th><th>Possible side effects</th></tr></thead><tbody><tr><td>Lumpectomy</td><td>Pain, swelling, shape change</td></tr><tr><td>Mastectomy</td><td>Pain, numbness, tightness</td></tr><tr><td>Chemotherapy</td><td>Hair loss, nausea, fatigue, low counts</td></tr><tr><td>Radiation</td><td>Skin irritation, fatigue, swelling</td></tr><tr><td>Hormone therapy</td><td>Hot flashes, joint pain, bone density change</td></tr><tr><td>HER2 therapy</td><td>Infusion reactions; heart monitoring may be needed</td></tr><tr><td>Immunotherapy</td><td>Immune-related organ inflammation</td></tr></tbody></table></div>`;

const hospTable = `<div class="md-body"><table><thead><tr><th>Hospital capability</th><th>Why it matters</th></tr></thead><tbody><tr><td>Breast surgical oncology</td><td>Conservation and mastectomy expertise</td></tr><tr><td>Medical oncology</td><td>Chemo and systemic treatment</td></tr><tr><td>Radiation oncology</td><td>Modern planning and delivery</td></tr><tr><td>Pathology / biomarkers</td><td>ER, PR, HER2 accuracy</td></tr><tr><td>Reconstructive surgery</td><td>Reconstruction options</td></tr><tr><td>Multidisciplinary board</td><td>Coordinated decisions</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Named pathway</th><th>GAF planning range in India</th><th>Typical stay</th></tr></thead><tbody><tr><td><a href="${LUMPECTOMY}">Lumpectomy / breast-conserving surgery</a></td><td>$3,500–$8,000</td><td>1–3 nights</td></tr><tr><td><a href="${MASTECTOMY}">Mastectomy</a></td><td>$4,500–$10,000</td><td>3–6 nights</td></tr><tr><td><a href="${ONCO}">Oncoplastic breast surgery</a></td><td>$4,500–$11,000</td><td>2–5 nights</td></tr><tr><td><a href="${NSM}">Nipple-sparing mastectomy</a></td><td>$5,500–$12,000</td><td>3–6 nights</td></tr><tr><td><a href="${RECON_C}">Breast reconstruction</a></td><td>$6,000–$18,000</td><td>4–8 nights</td></tr><tr><td><a href="${SLNB}">Sentinel lymph node biopsy</a></td><td>$2,000–$5,500</td><td>1–2 nights</td></tr><tr><td><a href="${CHEMO}">Systemic chemotherapy</a></td><td>$1,500–$8,000+</td><td>Outpatient cycles</td></tr><tr><td><a href="${EBRT}">External beam radiotherapy</a></td><td>$1,000–$6,000+</td><td>Outpatient course</td></tr><tr><td><a href="${HORM_C}">Hormone therapy</a></td><td>$1,000–$4,500</td><td>Long-term</td></tr><tr><td><a href="${TARG}">Targeted therapy</a></td><td>$8,000–$30,000</td><td>Depends on medicine/duration</td></tr><tr><td><a href="${IMM}">Immunotherapy</a></td><td>$15,000–$45,000</td><td>Repeated outpatient</td></tr></tbody></table></div>`;

const cityTable = `<div class="md-body"><table><thead><tr><th>City</th><th>Lumpectomy sheet</th><th>Mastectomy planning</th></tr></thead><tbody><tr><td>Delhi NCR</td><td><a href="${DELHI_L}">$3,500–$8,000</a></td><td><a href="${DELHI_M}">$4,500–$10,000</a></td></tr><tr><td>Mumbai</td><td><a href="${MUM_L}">$3,500–$8,000</a></td><td><a href="${MUM_M}">$4,500–$10,000</a></td></tr><tr><td>Bengaluru</td><td><a href="${BLR_L}">$3,500–$8,000</a></td><td><a href="${BLR_M}">$4,500–$10,000</a></td></tr></tbody></table></div>`;

const faqs = [
  ["What is the best treatment for breast cancer?", "There is no single best treatment. Stage, tumour biology (ER/PR/HER2), health and preferences guide the plan — see breast cancer treatment in India."],
  ["Can breast cancer be treated without surgery?", "Metastatic disease may be managed with systemic therapy without breast surgery. Early and locally advanced disease often include surgery."],
  ["Is mastectomy better than lumpectomy?", "Not always. For selected early cancers, conservation plus radiation can match mastectomy survival. Choice depends on oncologic suitability and preference."],
  ["Is chemotherapy necessary for every patient?", "No. Use depends on subtype, stage, grade, nodes and recurrence risk. See chemotherapy for breast cancer."],
  ["How many chemotherapy cycles are needed?", "It varies by regimen — often several cycles over months. There is no universal schedule."],
  ["Is radiation necessary after mastectomy?", "Not for everyone. It may be advised for certain tumour sizes, nodal involvement or other high-risk features."],
  ["What is the difference between chemotherapy and targeted therapy?", "Chemotherapy affects many rapidly dividing cells. Targeted drugs act on specific molecular features such as HER2."],
  ["Can HER2-positive breast cancer be treated?", "Yes. HER2-directed medicines expand options for eligible patients — see HER2-positive treatment."],
  ["Can triple-negative breast cancer use immunotherapy?", "Selected patients may receive immunotherapy with chemotherapy. Eligibility depends on stage and clinical factors."],
  ["How long does breast cancer treatment take?", "Weeks to many months for active therapy. Endocrine therapy may continue for at least five years; metastatic care may be ongoing."],
  ["Can breast cancer return after treatment?", "Yes. Risk varies with biology, stage and response. Regular follow-up matters."],
  ["Can treatment affect fertility?", "Some chemo and hormone therapies can affect ovarian function. Discuss fertility preservation before starting treatment."],
  ["Is breast reconstruction possible after mastectomy?", "Yes — implants, own tissue or combination; immediate or delayed. See reconstruction guides."],
  ["Is Stage 4 breast cancer treatable?", "Yes. It is generally not considered curable, but systemic therapy can control disease and support quality of life."],
  ["Is breast cancer treatment available in India?", "Yes. Specialist centres offer surgery, systemic therapy, radiation and reconstruction. See the international-patient guide."],
  ["Can international patients get a second opinion in India?", "Yes. Share pathology, IHC and DICOM imaging before travel for review."],
  ["What is neoadjuvant treatment?", "Therapy given before surgery to shrink disease and assess response — see neoadjuvant therapy guide."],
  ["What documents should I prepare?", "Biopsy/IHC, mammography/ultrasound/MRI or PET reports (DICOM), prior surgery and systemic records, medications and recent blood tests."],
];

const RELATED = [
  ["Breast Cancer Treatment in India", PILLAR],
  ["Breast Cancer Treatment by Stage", BY_STAGE],
  ["Breast Cancer Stages 0–4", STAGES],
  ["Breast Cancer Diagnosis Tests", DIAG],
  ["Breast Cancer Surgery in India", SURGERY],
  ["Chemotherapy for Breast Cancer", CHEMO_B],
  ["Radiation Therapy for Breast Cancer", RAD],
  ["Hormone Therapy for Breast Cancer", HORMONE],
  ["HER2-Positive Breast Cancer", HER2],
  ["ER/PR/HER2 Biomarkers", BIO],
  ["Neoadjuvant Therapy", NEO_B],
  ["Breast Reconstruction After Mastectomy", RECON],
  ["Treatment Cost in India", COST],
  ["International Patients Guide", INTL],
  ["Pathology Report Explained", PATH],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("A breast cancer diagnosis raises practical questions: Will surgery be needed? Can the breast be preserved? Is chemotherapy always required? What if disease has spread?"),
  p("Treatment has advanced. Plans may include surgery, radiation, chemotherapy, hormone therapy, targeted medicines or immunotherapy — alone or in combination. **There is no single right plan for every patient.** Decisions follow biopsy results, ER/PR/HER2 status, stage, health and preferences."),
  p("The coordinated pathway sits on [breast cancer treatment in India](" + PILLAR + "). Companions cover [stages](" + STAGES + "), [treatment by stage](" + BY_STAGE + "), [diagnosis tests](" + DIAG + ") and [cost in India](" + COST + ")."),
  p("GAF planning for [lumpectomy](" + LUMPECTOMY + ") is **$3,500–$8,000** (typically **1–3 nights**) and for [mastectomy](" + MASTECTOMY + ") is **$4,500–$10,000** (typically **3–6 nights**). Neighbouring [chemotherapy](" + CHEMO + ") is **$1,500–$8,000+**; [EBRT](" + EBRT + ") **$1,000–$6,000+**. These are partner planning ranges, not quotations."),
  p("International patients comparing [surgical oncologists](" + SURG_DOCS + ") often start with [lumpectomy](" + LUMP_D + ") and [mastectomy](" + MAST_D + ") lists, plus [medical oncology](" + MED_DOCS + "). Partner hospitals in [Delhi NCR](" + DELHI_H + "), [Mumbai](" + MUM_H + ") and [Bengaluru](" + BLR_H + ") are a typical first filter — see [international patients](" + INTL + ")."),
  btn("Ask about a breast cancer treatment plan in India", consult("Breast Cancer Treatment Options")),
  p("[WhatsApp +91 90443 46292 with pathology, IHC and staging scans](" + wa("Please review my breast cancer pathology, ER/PR/HER2 and staging scans and advise on treatment options in India.") + ")"),
  img("/uploads/articles/breast-cancer-treatment-options-modalities.webp", "Canva-style unlabeled illustration of a patient beside a breast diagram with surgery, chemo, radiation, hormone and targeted therapy icons", "Treatment usually combines local and systemic options based on stage and tumour biology."),
  html(optionsTable),

  h2("How Do Doctors Decide Which Treatment Is Best?"),
  ul([
    "**Stage** — from DCIS (0) to metastatic (4); see [stages](" + STAGES + ")",
    "**Hormone receptors (ER/PR)** — guide endocrine therapy",
    "**HER2 status** — guides targeted medicines — [HER2 guide](" + HER2 + ")",
    "**Triple-negative status** — chemo ± immunotherapy in eligible cases",
    "**Tumour size and nodes** — surgery-first vs neoadjuvant sequencing",
    "**General health and menopausal status**",
    "**Patient preferences** — conservation vs mastectomy when both are suitable",
  ]),
  p("Biomarker detail: [ER/PR/HER2 treatment](" + BIO + ") and [pathology report explained](" + PATH + ")."),

  h2("Breast Cancer Surgery Options"),
  h3("Breast-conserving surgery (lumpectomy)"),
  p("Removes the tumour with a margin while preserving most of the breast. Often followed by radiation. Suitable when the tumour is relatively small, margins can be clear and radiation is feasible. Survival can match mastectomy in appropriately selected early disease."),
  p("GAF [lumpectomy](" + LUMPECTOMY + ") planning: **$3,500–$8,000**, typically **1–3 nights**. Neighbouring [oncoplastic surgery](" + ONCO + "): **$4,500–$11,000**."),
  h3("Mastectomy"),
  p("Removes breast tissue when conservation is unsuitable, disease is extensive, radiation cannot be given when required for conservation, or after informed preference. Inflammatory breast cancer often needs a different sequence."),
  html(mastTypes),
  p("GAF [mastectomy](" + MASTECTOMY + "): **$4,500–$10,000** (3–6 nights). [Nipple-sparing mastectomy](" + NSM + "): **$5,500–$12,000** when indicated. Details: [breast cancer surgery in India](" + SURGERY + ")."),
  img("/uploads/articles/breast-cancer-treatment-options-surgery.webp", "Two-panel unlabeled Canva-style diagram comparing breast-conserving tumour removal with mastectomy", "Lumpectomy preserves most breast tissue; mastectomy removes breast tissue when conservation is not appropriate."),
  btn("Ask whether lumpectomy or mastectomy fits my case", consult("Breast Cancer Surgery")),

  h2("Breast Reconstruction After Mastectomy"),
  p("Reconstruction may use implants, autologous tissue (e.g. DIEP/TRAM/latissimus) or a combination — immediate or delayed."),
  html(reconTable),
  p("GAF [breast reconstruction](" + RECON_C + "): **$6,000–$18,000** (typically **4–8 nights**), often billed separately from mastectomy. See [reconstruction after mastectomy](" + RECON + ") and [reconstruction treatment](" + RECON_TX + ")."),

  h2("Lymph Node Surgery"),
  html(nodeTable),
  p("GAF [sentinel lymph node biopsy](" + SLNB + "): **$2,000–$5,500** (1–2 nights). Modern care individualises axillary surgery to reduce lymphoedema risk."),

  h2("Chemotherapy"),
  p("Systemic medicines destroy or stop cancer cells. Not every patient needs chemotherapy. It may be used for larger tumours, node-positive disease, triple-negative or HER2-positive disease, selected higher-risk hormone-positive cancers, locally advanced disease or metastatic settings."),
  p("**Neoadjuvant** chemo is given before surgery; **adjuvant** after. Pathways: [chemotherapy in India](" + CHEMO_TX + "), [neoadjuvant](" + NEO + "), [adjuvant](" + ADJ + "), [breast chemo blog](" + CHEMO_B + "), [neoadjuvant therapy](" + NEO_B + ")."),
  p("GAF [chemotherapy](" + CHEMO + ") planning: **$1,500–$8,000+** for typical outpatient cycles."),
  html(chemoSE),
  p("Fever or infection signs during chemo need urgent local care."),
  img("/uploads/articles/breast-cancer-treatment-options-systemic.webp", "Canva-style unlabeled illustration of systemic breast cancer medicines circulating with IV, oral, HER2 and immunotherapy icons", "Systemic therapy travels through the bloodstream and is chosen by receptor and mutation profile."),
  p("[WhatsApp +91 90443 46292 with chemo history](" + wa("I need advice on chemotherapy or targeted therapy options for breast cancer in India. I can share my regimen history and IHC.") + ")"),

  h2("Radiation Therapy"),
  p("Local high-energy treatment reduces local recurrence after conservation and is used after mastectomy in selected higher-risk cases. Techniques include whole-breast, partial-breast, chest-wall and nodal irradiation; hypofractionation is common when suitable."),
  p("GAF [EBRT](" + EBRT + "): **$1,000–$6,000+**. Guide: [radiation therapy for breast cancer](" + RAD + "). Side effects may include skin irritation, swelling and fatigue."),

  h2("Hormone Therapy"),
  p("For ER/PR-positive disease: tamoxifen, aromatase inhibitors (anastrozole, letrozole, exemestane), fulvestrant in selected advanced settings, and ovarian suppression for some premenopausal patients. Often continued for at least five years."),
  p("GAF [hormone therapy](" + HORM_C + "): **$1,000–$4,500**. Detail: [hormone therapy for breast cancer](" + HORMONE + ")."),

  h2("Targeted Therapy and Immunotherapy"),
  p("HER2-directed options may include trastuzumab, pertuzumab, T-DM1, trastuzumab deruxtecan and selected oral agents. Hormone-positive HER2-negative disease may use CDK4/6 inhibitors. Selected BRCA-associated cancers may use PARP inhibitors."),
  p("GAF [targeted therapy](" + TARG + "): **$8,000–$30,000** (medicine and duration dependent). [Immunotherapy](" + IMM + "): **$15,000–$45,000** for eligible regimens — often with chemo in selected triple-negative disease."),
  btn("Ask about HER2 or immunotherapy eligibility", consult("Breast Cancer Targeted Therapy")),

  h2("Treatment by Biological Type and Stage"),
  html(typeTable),
  html(neoAdj),
  img("/uploads/articles/breast-cancer-treatment-options-by-stage.webp", "Canva-style unlabeled illustration of staged treatment pathway icons around a breast diagram", "Sequencing differs by stage — from surgery-first early disease to neoadjuvant locally advanced plans."),
  p("Stage-by-stage detail: [treatment by stage](" + BY_STAGE + "). Metastatic care focuses on control and quality of life with biology-matched systemic therapy; surgery is selective for local problems."),

  h2("Side Effects, Recovery and Supportive Care"),
  html(seTable),
  p("Supportive care — anti-emetics, physiotherapy, nutrition, skin care, cardiac monitoring, lymphoedema rehab and counselling — runs alongside active treatment. Palliative care can start at any stage."),
  p("Do not stop prescribed therapy without your oncology team. Sudden severe symptoms belong in a **local emergency department**."),

  h2("Breast Cancer Treatment Cost in India"),
  p("Totals vary with stage, biology, surgery, medicines, radiation, reconstruction, hospital and city. Full explainer: [cost guide](" + COST + ")."),
  html(costTable),
  html(cityTable),
  p("Do not add every line into one quote — request an itemised estimate after record review."),
  btn("Request an itemised treatment estimate", consult("Breast Cancer Treatment Cost")),
  p("[WhatsApp +91 90443 46292 with stage and preferred city](" + wa("Please help estimate breast cancer treatment in India. Stage, ER/PR/HER2 and preferred city are available.") + ")"),

  h2("Treatment in India for International Patients"),
  html(hospTable),
  p("GAF can identify hospitals, share records, arrange opinions and estimates, and support travel — see [international patients](" + INTL + "). Bring biopsy/IHC, imaging (DICOM), prior treatment records and medication lists. Do not delay urgent local care solely to arrange travel."),
  btn("Start a breast cancer consultation request", consult("Breast Cancer Treatment in India")),

  h2("Questions to Ask Before Starting Treatment"),
  ol([
    "What is the exact type and clinical stage?",
    "What are my ER, PR and HER2 results?",
    "Surgery first or neoadjuvant systemic therapy?",
    "Am I suitable for breast-conserving surgery?",
    "Will I need radiation, chemo, hormone or targeted drugs?",
    "What side effects and fertility implications should I expect?",
    "What is the estimated cost and follow-up plan?",
  ]),

  h2("Frequently Asked Questions About Breast Cancer Treatment"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Key Takeaways"),
  ul([
    "Treatment is personalised by stage and biology — not one protocol for all.",
    "Local therapy (surgery ± radiation) and systemic therapy are often combined.",
    "GAF lumpectomy planning is $3,500–$8,000; mastectomy $4,500–$10,000.",
    "HER2, endocrine and immunotherapy options depend on biomarkers and eligibility.",
    "Share pathology and DICOM imaging before travelling for care in India.",
  ]),

  h2("Top Medical Sources and References"),
  ol([
    "[NCI — Breast cancer treatment](https://www.cancer.gov/types/breast/treatment)",
    "[American Cancer Society — Treatment options](https://www.cancer.org/cancer/types/breast-cancer/treatment.html)",
    "[NCCN — Breast cancer guidelines](https://www.nccn.org/guidelines/category_1)",
    "[ICMR — Standard treatment workflows](https://www.icmr.gov.in/standard-treatment-workflows-stws)",
    "[NCI — Treatment by stage](https://www.cancer.gov/types/breast/treatment/by-stage)",
    "[NHS — Treatment for breast cancer](https://www.nhs.uk/conditions/breast-cancer-in-women/treatment-for-breast-cancer-in-women/)",
    "[GAF — Breast cancer treatment cost in India](" + COST + ")",
  ]),

  h2("Related Reading on GAF Healthcare"),
  ul(RELATED.map(([label, href]) => `[${label}](${href})`)),

  h2("Explore Breast Cancer Treatment in India"),
  p("Understanding stage and biomarkers is the foundation for choosing surgery, medicines and radiation. GAF Healthcare coordinates specialist consultations and estimates for international patients. Website: [https://gaf.healthcare/](https://gaf.healthcare/)."),
  btn("Contact GAF Healthcare about breast cancer treatment", consult("Breast Cancer Treatment in India")),
  p("[WhatsApp +91 90443 46292 to start coordination](" + wa("I would like GAF Healthcare to coordinate breast cancer treatment options in India.") + ")"),

  h2("Medical Disclaimer"),
  p("This article is for general education only and does not replace professional advice, diagnosis or treatment. Decisions must be made with a qualified oncology team after reviewing individual findings. Cost figures are indicative planning ranges. Emergency symptoms belong in a local emergency department."),
];

const now = "2026-11-11T13:50:00.000Z";
const SLUG = "breast-cancer-treatment-options";
const article = {
  id: "art_breast_cancer_treatment_options",
  slug: SLUG,
  title: "Breast Cancer Treatment: Surgery, Chemotherapy, Radiation, Hormone Therapy, Targeted Therapy and Immunotherapy",
  excerpt:
    "Breast cancer treatment depends on the cancer stage, tumour type, hormone receptor status, HER2 status and the patient's overall health. Treatment may include breast-conserving surgery, mastectomy, chemotherapy, radiation therapy, hormone therapy, targeted medicines or immunotherapy. Learn how these treatments work, when they are recommended and how patients can explore breast cancer treatment in India.",
  date: "11 November 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Surgical Oncology",
  tags: ["breast cancer", "breast cancer treatment", "surgery", "chemotherapy", "radiation", "India"],
  image: "/uploads/articles/breast-cancer-treatment-options-modalities.webp",
  imageAlt: "Canva-style unlabeled illustration of a patient beside a breast diagram with surgery, chemo, radiation, hormone and targeted therapy icons",
  status: "published",
  featured: true,
  seoTitle: "Breast Cancer Treatment Options: Surgery, Chemo & Advanced Therapies",
  seoDescription:
    "Explore breast cancer treatment options, including surgery, chemotherapy, radiation, hormone therapy, targeted therapy and immunotherapy. Understand treatment by stage and breast cancer care in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/breast-cancer-treatment-options-modalities.webp",
  allowIndex: true,
  keywords: [
    "Breast cancer treatment",
    "Breast cancer treatment options",
    "Breast cancer surgery",
    "Chemotherapy for breast cancer",
    "Radiation therapy for breast cancer",
    "Hormone therapy for breast cancer",
    "Targeted therapy for breast cancer",
    "Immunotherapy for breast cancer",
    "Breast cancer treatment by stage",
    "Breast cancer treatment in India",
    "Advanced breast cancer treatment",
    "Breast cancer treatment cost in India",
  ],
  relatedLinks: RELATED.map(([label, href]) => ({ label, href })),
  blocks,
};

if (!store.categories.includes("Surgical Oncology")) store.categories.push("Surgical Oncology");
for (const tag of article.tags) if (!store.tags.includes(tag)) store.tags.push(tag);
for (const [file, alt] of [
  ["breast-cancer-treatment-options-modalities.webp", article.imageAlt],
  ["breast-cancer-treatment-options-surgery.webp", "Two-panel unlabeled Canva-style diagram comparing breast-conserving tumour removal with mastectomy"],
  ["breast-cancer-treatment-options-systemic.webp", "Canva-style unlabeled illustration of systemic breast cancer medicines circulating with IV, oral, HER2 and immunotherapy icons"],
  ["breast-cancer-treatment-options-by-stage.webp", "Canva-style unlabeled illustration of staged treatment pathway icons around a breast diagram"],
]) {
  const mediaId = `media_${file.replace(/[^a-z0-9]+/g, "_")}`;
  if (!store.media.some((r) => r.id === mediaId)) {
    store.media.push({ id: mediaId, url: `/uploads/articles/${file}`, name: file, alt, addedAt: now });
  }
}
const idx = store.articles.findIndex((r) => r.id === article.id || r.slug === SLUG);
if (idx >= 0) store.articles[idx] = article;
else store.articles.unshift(article);
writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", SLUG, "blocks", blocks.length, "faqs", faqs.length);

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes(SLUG)) {
  llms = llms.replace(
    "[breast cancer treatment in India](https://gaf.healthcare/treatments/breast-cancer-treatment-in-india)",
    "[breast cancer treatment in India](https://gaf.healthcare/treatments/breast-cancer-treatment-in-india), [breast cancer treatment options](https://gaf.healthcare/blogs/breast-cancer-treatment-options)",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

function linkFrom(slug) {
  const post = store.articles.find((r) => r.slug === slug);
  if (!post) return;
  const href = `/blogs/${SLUG}`;
  post.relatedLinks = post.relatedLinks || [];
  if (!post.relatedLinks.some((r) => r.href === href)) post.relatedLinks.push({ label: "Breast Cancer Treatment Options", href });
  for (let i = 0; i < post.blocks.length; i++) {
    if (post.blocks[i].type === "heading" && /Related Reading/i.test(post.blocks[i].text || "")) {
      for (let j = i + 1; j < Math.min(i + 5, post.blocks.length); j++) {
        if (post.blocks[j].type === "list" && !post.blocks[j].items.some((it) => it.includes(href))) {
          post.blocks[j].items.push(`[Breast Cancer Treatment Options](${href})`);
        }
      }
      break;
    }
  }
}
for (const s of ["breast-cancer-treatment-cost-in-india", "breast-cancer-surgery-in-india", "breast-cancer-treatment-by-stage", "breast-cancer-stages-0-1-2-3-4", "breast-cancer-treatment-india-international-patients"]) linkFrom(s);
writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);

// Reciprocal on treatment pillar markdown
const txPath = join(process.cwd(), "content/treatments/breast-cancer-treatment-in-india.md");
let tx = readFileSync(txPath, "utf8");
if (!tx.includes(SLUG)) {
  tx = tx.replace(
    /Depending on the diagnosis, treatment may involve/,
    `A patient-facing overview of surgery, systemic therapy and radiation sequencing is published as [Breast Cancer Treatment Options](/blogs/${SLUG}). Depending on the diagnosis, treatment may involve`,
  );
  writeFileSync(txPath, tx);
  console.log("updated treatment body md");
}
