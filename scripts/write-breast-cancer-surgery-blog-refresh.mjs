#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const SLUG = "breast-cancer-surgery-in-india";
const LUMPECTOMY = "/costs/India/Surgical-Oncology/Lumpectomy";
const MASTECTOMY = "/costs/India/Surgical-Oncology/Mastectomy";
const NSM = "/costs/India/Surgical-Oncology/Nipple-Sparing-Mastectomy";
const ONCOPLASTIC = "/costs/India/Surgical-Oncology/Oncoplastic-Breast-Surgery";
const RECON = "/costs/India/Surgical-Oncology/Breast-Reconstruction";
const SLNB = "/costs/India/Surgical-Oncology/Sentinel-Lymph-Node-Biopsy";
const FREE_FLAP = "/costs/India/Surgical-Oncology/Microvascular-Free-Flap-Reconstruction";
const CHEMO = "/costs/India/Medical-Oncology/Chemotherapy";
const NEOADJ = "/costs/India/Medical-Oncology/Neoadjuvant-Chemotherapy";
const ADJ = "/costs/India/Medical-Oncology/Adjuvant-Chemotherapy";
const EBRT = "/costs/India/Radiation-Oncology/EBRT";
const HORMONE = "/costs/India/Medical-Oncology/Hormone-Therapy";
const TARGETED = "/costs/India/Medical-Oncology/Targeted-Therapy";
const TX_BREAST = "/treatments/breast-cancer-treatment-in-india";
const TX_RECON = "/treatments/breast-reconstruction-in-india";
const CHEMO_BLOG = "/blogs/breast-cancer-chemotherapy-in-india";
const RAD_BLOG = "/blogs/breast-cancer-radiation-therapy-in-india";
const HT_BLOG = "/blogs/hormone-therapy-for-breast-cancer-in-india";
const TARGETED_BLOG = "/blogs/targeted-therapy-for-breast-cancer-in-india";
const COST_BLOG = "/blogs/breast-cancer-treatment-cost-in-india";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const OPTIONS = "/blogs/breast-cancer-treatment-options";
const STAGES = "/blogs/breast-cancer-stages";
const DIAG = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const LYMPH = "/blogs/breast-cancer-lymphedema";
const EXISTING_CHEMO = "/blogs/chemotherapy-for-breast-cancer-in-india";
const SURG_DOCS = "/doctors/India/Surgical-Oncology";
const SURG_HOSP = "/hospitals/India/Surgical-Oncology";
const DELHI = "/doctors/India/Delhi-NCR/Surgical-Oncology";
const MUMBAI = "/doctors/India/Mumbai/Surgical-Oncology";
const BLR = "/doctors/India/Bengaluru/Surgical-Oncology";
const CHN = "/doctors/India/Chennai/Surgical-Oncology";
const HYD = "/doctors/India/Hyderabad/Surgical-Oncology";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;
const h2 = (text) => ({ id: id("h"), type: "heading", level: 2, text });
const h3 = (text) => ({ id: id("h"), type: "heading", level: 3, text });
const p = (text) => ({ id: id("p"), type: "paragraph", text });
const ul = (items) => ({ id: id("ul"), type: "list", style: "ul", items });
const ol = (items) => ({ id: id("ol"), type: "list", style: "ol", items });
const btn = (label, href) => ({ id: id("btn"), type: "button", label, href });
const img = (src, alt, caption) => ({ id: id("img"), type: "image", src, alt, caption });

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>Main options</strong></td><td><a href="${LUMPECTOMY}">Lumpectomy / BCS</a> or <a href="${MASTECTOMY}">mastectomy</a>, with node assessment as needed</td></tr><tr><td><strong>Lumpectomy planning</strong></td><td><a href="${LUMPECTOMY}">$3,500–$8,000</a> · typically 1–3 nights · radiation usually follows</td></tr><tr><td><strong>Mastectomy planning</strong></td><td><a href="${MASTECTOMY}">$4,500–$10,000</a> · typically 3–6 nights</td></tr><tr><td><strong>Sentinel node biopsy</strong></td><td><a href="${SLNB}">$2,000–$5,500</a> · typically 1–2 nights</td></tr><tr><td><strong>Oncoplastic / NSM</strong></td><td><a href="${ONCOPLASTIC}">Oncoplastic $4,500–$11,000</a> · <a href="${NSM}">nipple-sparing $5,500–$12,000</a></td></tr><tr><td><strong>Reconstruction</strong></td><td><a href="${RECON}">$6,000–$18,000</a> · free-flap pathway <a href="${FREE_FLAP}">$10,000–$24,000</a> when that product is named</td></tr><tr><td><strong>Before surgery medicines</strong></td><td><a href="${NEOADJ}">Neoadjuvant chemotherapy</a> $2,500–$10,000 when indicated</td></tr><tr><td><strong>After surgery radiation</strong></td><td>Common after conservation — see <a href="${RAD_BLOG}">radiation guide</a> · <a href="${EBRT}">EBRT $1,000–$6,000+</a></td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>Breast cancer surgery in India</strong> ranges from breast-conserving operations to mastectomy, lymph-node procedures and optional reconstruction. GAF figures are partner planning ranges from named cost sheets — not hospital quotations.</p><p class="article-quick-answer__body"><strong>Important:</strong> The best operation is the one that offers appropriate cancer control for the patient's tumour and goals — not automatically the largest operation. GAF Healthcare does not perform surgery.</p></aside>`;

const compareTable = `<div class="md-body"><table><thead><tr><th>Factor</th><th>Lumpectomy</th><th>Mastectomy</th></tr></thead><tbody><tr><td>Breast tissue</td><td>Part of the breast is preserved</td><td>Most or all breast tissue is removed</td></tr><tr><td>Main purpose</td><td>Remove the tumour with surrounding tissue</td><td>Remove the breast tissue containing cancer</td></tr><tr><td>Radiation</td><td>Commonly required afterwards</td><td>Required in selected cases</td></tr><tr><td>Reconstruction</td><td>Oncoplastic techniques may be used</td><td>Reconstruction may be immediate or delayed</td></tr><tr><td>GAF planning range</td><td><a href="${LUMPECTOMY}">$3,500–$8,000</a></td><td><a href="${MASTECTOMY}">$4,500–$10,000</a></td></tr><tr><td>Typical stay</td><td>About 1–3 nights</td><td>About 3–6 nights</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Named pathway</th><th>GAF planning range in India</th><th>Typical stay / schedule</th></tr></thead><tbody><tr><td><a href="${LUMPECTOMY}">Lumpectomy / breast-conserving surgery</a></td><td>$3,500–$8,000</td><td>About 1–3 nights</td></tr><tr><td><a href="${MASTECTOMY}">Mastectomy</a></td><td>$4,500–$10,000</td><td>About 3–6 nights</td></tr><tr><td><a href="${NSM}">Nipple-sparing mastectomy</a></td><td>$5,500–$12,000</td><td>About 3–6 nights</td></tr><tr><td><a href="${ONCOPLASTIC}">Oncoplastic breast surgery</a></td><td>$4,500–$11,000</td><td>About 2–5 nights</td></tr><tr><td><a href="${SLNB}">Sentinel lymph node biopsy</a></td><td>$2,000–$5,500</td><td>About 1–2 nights</td></tr><tr><td><a href="${RECON}">Breast reconstruction</a></td><td>$6,000–$18,000</td><td>About 4–8 nights</td></tr><tr><td><a href="${FREE_FLAP}">Microvascular free-flap reconstruction</a></td><td>$10,000–$24,000</td><td>About 8–14 nights</td></tr><tr><td><a href="${NEOADJ}">Neoadjuvant chemotherapy</a></td><td>$2,500–$10,000</td><td>Cycles before surgery</td></tr><tr><td><a href="${ADJ}">Adjuvant chemotherapy</a></td><td>$2,500–$10,000</td><td>Cycles after surgery</td></tr><tr><td><a href="${EBRT}">EBRT</a></td><td>$1,000–$6,000+</td><td>Often 15–35 sessions</td></tr></tbody></table></div>`;

const faqs = [
  ["Is breast cancer surgery available in India?", "Yes. It is performed at specialist cancer centres and multidisciplinary hospitals. The appropriate hospital and surgeon depend on diagnosis, treatment needs and preferences."],
  ["Is lumpectomy better than mastectomy?", "Neither is automatically better. For eligible patients, lumpectomy followed by radiation can provide survival outcomes comparable to mastectomy. The choice depends on the tumour and clinical circumstances."],
  ["Can breast cancer be cured by surgery alone?", "Some patients may not need chemotherapy or other systemic treatment, but many require additional treatment after surgery based on pathology, stage and tumour biology."],
  ["How long does breast cancer surgery take?", "Duration varies. A straightforward lumpectomy may take less time than mastectomy with node surgery or reconstruction. The surgical team can estimate after reviewing the case."],
  ["How many days does a patient stay in hospital after breast cancer surgery?", "Stay depends on the operation, recovery and whether reconstruction is performed. Lumpectomy stays are often shorter than mastectomy with reconstruction."],
  ["Is breast reconstruction possible after mastectomy?", "Yes. Reconstruction may use implants or the patient's own tissue, immediately or later, depending on the treatment plan and preference."],
  ["Will the patient need chemotherapy after breast cancer surgery?", "Not everyone needs chemotherapy. The decision depends on subtype, stage, nodes and recurrence risk."],
  ["Is radiation necessary after lumpectomy?", "Radiation is commonly recommended after breast-conserving surgery. Selected patients may be considered for omission only after specialist assessment."],
  ["What is sentinel lymph node biopsy?", "It identifies and removes the first lymph nodes likely to receive drainage from the breast so pathology can check for spread."],
  ["Can breast cancer return after mastectomy?", "Yes. Mastectomy removes most breast tissue but does not eliminate every possibility of local or distant recurrence."],
  ["Can international patients travel to India for breast cancer surgery?", "Yes, subject to hospital acceptance, fitness to travel and visa requirements. Send medical reports for review before booking travel."],
  ["How much does breast cancer surgery cost in India?", "GAF planning ranges include lumpectomy $3,500–$8,000 and mastectomy $4,500–$10,000. Reconstruction and free-flap pathways have separate named ranges. Request a written hospital estimate."],
  ["What is oncoplastic breast surgery?", "It combines cancer removal with reshaping techniques to reduce deformity when more tissue must be removed."],
  ["Why are drains used after surgery?", "Drains remove fluid that may collect after mastectomy or reconstruction. They are removed when the team considers drainage low enough."],
  ["When can patients return to work?", "Desk-based work may resume sooner than physically demanding jobs. Clearance depends on the operation and wound healing."],
  ["Does mastectomy always mean the cancer is more advanced?", "No. Some relatively early cases choose or require mastectomy for clinical or personal reasons."],
];

const RELATED = [
  ["Breast cancer treatment in India", TX_BREAST],
  ["Breast reconstruction in India", TX_RECON],
  ["Breast cancer chemotherapy in India", CHEMO_BLOG],
  ["Chemotherapy for breast cancer (existing guide)", EXISTING_CHEMO],
  ["Breast cancer radiation therapy in India", RAD_BLOG],
  ["Hormone therapy for breast cancer", HT_BLOG],
  ["Targeted therapy for breast cancer", TARGETED_BLOG],
  ["Breast cancer treatment options", OPTIONS],
  ["Breast cancer stages", STAGES],
  ["Breast cancer diagnosis tests", DIAG],
  ["Breast cancer lymphedema", LYMPH],
  ["Breast cancer treatment cost in India", COST_BLOG],
  ["International patients", INTL],
  ["Lumpectomy cost sheet", LUMPECTOMY],
  ["Mastectomy cost sheet", MASTECTOMY],
  ["Surgical oncologists in India", SURG_DOCS],
  ["Surgical oncology hospitals in India", SURG_HOSP],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("Hearing that **breast cancer surgery** may be necessary can be frightening. Many patients wonder whether the entire breast must be removed, how painful the operation will be and how quickly they can return to daily life."),
  p("Breast cancer surgery has evolved considerably. Depending on tumour size, location and biology, some patients can have breast-conserving surgery. Others need mastectomy, with or without reconstruction."),
  p("In India, care is usually coordinated across surgical oncology, medical oncology, radiation oncology, radiology, pathology and, when needed, plastic surgery. Related reading includes [breast cancer treatment options](" + OPTIONS + "), [chemotherapy](" + CHEMO_BLOG + "), [radiation](" + RAD_BLOG + ") and [treatment cost](" + COST_BLOG + ")."),
  p("GAF planning for [lumpectomy](" + LUMPECTOMY + ") is **$3,500–$8,000** (about 1–3 nights) and for [mastectomy](" + MASTECTOMY + ") **$4,500–$10,000** (about 3–6 nights). Filter [surgical oncologists](" + SURG_DOCS + ") and [hospitals](" + SURG_HOSP + ") by city before travel."),
  btn("Ask GAF to review imaging and biopsy for surgery planning", consult("Breast Cancer Surgery")),
  p("[WhatsApp +91 90443 46292 with biopsy, imaging and receptor reports](" + wa("Please review my breast cancer reports and advise on lumpectomy versus mastectomy options and cost in India.") + ")"),
  img("/uploads/articles/breast-cancer-surgery-lumpectomy-overview.webp", "Woman consulting a surgeon beside a circular diagram of breast-conserving removal of a tumour with a surrounding tissue margin", "Lumpectomy removes the tumour with a margin while preserving most of the breast when clinically suitable."),

  h2("When is surgery required for breast cancer?"),
  p("Surgery removes cancer from the breast and, when necessary, assesses or treats nearby lymph nodes. It is common for early-stage and operable locally advanced disease, but it is not always the first step."),
  ul([
    "Surgery followed by chemotherapy, radiation or other treatments",
    "Neoadjuvant medicines before surgery, then an operation",
    "Breast surgery with simultaneous node assessment",
    "Mastectomy with or without reconstruction",
    "Selected palliative surgery for local symptoms in advanced disease",
  ]),
  h3("Surgery before or after chemotherapy?"),
  p("[Neoadjuvant chemotherapy](" + NEOADJ + ") may be used when the tumour is large relative to the breast, nodes are involved, response assessment is useful, conservation may become possible, or the subtype benefits from preoperative systemic therapy. After treatment, the surgeon reassesses before operating."),

  h2("What are the main types of breast cancer surgery?"),
  h3("Lumpectomy or breast-conserving surgery"),
  p("A [lumpectomy](" + LUMPECTOMY + ") removes the cancer with a surrounding margin. It may also be called breast-conserving surgery, wide local excision, partial mastectomy or segmental mastectomy."),
  p("Suitability depends on tumour size relative to the breast, unifocal vs multifocal disease, location, ability to achieve clear margins, access to postoperative radiation and overall clinical circumstances. For appropriately selected patients, conservation plus radiation is an established approach with survival outcomes comparable to mastectomy."),
  h3("Mastectomy"),
  p("[Mastectomy](" + MASTECTOMY + ") removes breast tissue containing cancer. Reasons may include a large tumour relative to breast size, multicentric disease, inflammatory breast cancer, inability to clear margins, prior chest radiation in some settings, genetic or risk factors, or inability to receive radiation when conservation requires it."),
  h3("Modified radical mastectomy"),
  p("This removes breast tissue and includes axillary lymph node surgery when clinically indicated. Modern care aims to avoid unnecessary extensive node removal because of lymphoedema and arm morbidity risk."),
  h3("Skin-sparing and nipple-sparing mastectomy"),
  p("Skin-sparing approaches preserve much of the breast skin when immediate reconstruction is planned. [Nipple-sparing mastectomy](" + NSM + ") may be considered when tumour location and other factors allow — it is not suitable for every patient. GAF planning for NSM is **$5,500–$12,000** (about 3–6 nights)."),
  btn("Request a second opinion on lumpectomy vs mastectomy", consult("Breast Cancer Surgery Second Opinion")),

  h2("Lumpectomy vs mastectomy: which is better?"),
  p("Removing the entire breast is not automatically safer. For eligible patients, conservation plus radiation can match mastectomy survival outcomes. Cancer can still recur after either operation."),
  { id: id("html"), type: "html", html: compareTable },

  h2("What is sentinel lymph node biopsy?"),
  p("[Sentinel lymph node biopsy](" + SLNB + ") identifies the first nodes most likely to receive drainage from the breast. Mapping may use a tracer, dye or another approved method. If sentinel nodes are negative, further axillary clearance is often unnecessary."),
  p("Avoiding unnecessary node clearance reduces risk of [lymphoedema](" + LYMPH + "), arm swelling, shoulder stiffness and numbness. GAF planning for SLNB is **$2,000–$5,500** (about 1–2 nights)."),
  img("/uploads/articles/breast-cancer-surgery-sentinel-node.webp", "Woman in surgical consultation beside a circular diagram of sentinel lymph node mapping from the breast to axillary nodes", "Sentinel node biopsy helps determine whether cancer has reached the first draining lymph nodes."),

  h2("What is axillary lymph node dissection?"),
  p("Axillary clearance removes a group of armpit nodes when surgical treatment of involved nodes is required and less extensive approaches are not appropriate. Not every patient with a positive node needs complete clearance — radiation or systemic therapy may be alternatives in selected settings."),

  h2("What is oncoplastic breast surgery?"),
  p("[Oncoplastic surgery](" + ONCOPLASTIC + ") combines cancer removal with reshaping to reduce deformity when more tissue must be removed. Techniques include tissue rearrangement, volume displacement or replacement, reduction and reshaping. GAF planning is **$4,500–$11,000** (about 2–5 nights)."),

  h2("Breast reconstruction after mastectomy"),
  p("Reconstruction restores breast shape and may be immediate or delayed. It is optional — some patients prefer flat closure or an external prosthesis. See [breast reconstruction in India](" + TX_RECON + ")."),
  ul([
    "**Implant-based:** direct-to-implant or expander-to-implant pathways",
    "**Autologous:** DIEP, TRAM, latissimus or other flaps using the patient's tissue",
    "**Timing:** immediate vs delayed — post-mastectomy radiation plans strongly influence the sequence",
  ]),
  p("GAF planning for [breast reconstruction](" + RECON + ") is **$6,000–$18,000** (about 4–8 nights). Named [microvascular free-flap](" + FREE_FLAP + ") products are **$10,000–$24,000** (about 8–14 nights) and must not be used as a DIEP quotation unless that sheet is the one named."),
  img("/uploads/articles/breast-cancer-surgery-reconstruction.webp", "Woman discussing breast reconstruction options beside a circular diagram of implant and autologous tissue reconstruction concepts", "Reconstruction may use implants or the patient's own tissue and can be immediate or delayed."),
  p("[WhatsApp GAF if you need help coordinating reconstruction timing with radiation plans](" + wa("I need guidance on mastectomy with immediate versus delayed breast reconstruction and cost in India.") + ")"),

  h2("How should a patient prepare for breast cancer surgery?"),
  ul([
    "Clinical exam, mammography/ultrasound, MRI when indicated",
    "Core biopsy with ER/PR/HER2 review",
    "Blood tests and anaesthesia assessment",
    "Staging imaging when clinically needed",
  ]),
  p("Share medical conditions, prior surgery, allergies, medicines (including blood thinners), prior radiation or chemo, smoking history and anaesthesia issues. International patients should bring original reports, imaging files and pathology slides/blocks when available so India-based teams avoid unnecessary duplication."),

  h2("What happens on the day of breast cancer surgery?"),
  ol([
    "Preoperative assessment and consent",
    "General anaesthesia for most operations",
    "Planned breast and/or node procedure",
    "Pathology examination of removed tissue",
    "Recovery-room monitoring",
    "Hospital stay based on procedure, drains and recovery",
  ]),

  h2("How long does breast cancer surgery take?"),
  p("Operating time rises with tumour complexity, prior surgery, node procedures, oncoplastic techniques and reconstruction. Ask for estimated duration and length of stay as planning figures, not guarantees."),

  h2("Recovery after breast cancer surgery"),
  ul([
    "**First days:** soreness, tiredness, bruising, mild swelling, tightness, reduced shoulder movement",
    "**One to two weeks:** gradual return to light activities; wound and drain review",
    "**Three to six weeks:** progressive activity for many patients; reconstruction may take longer",
  ]),
  p("Return-to-work timing depends on job demands. Follow the surgeon's advice rather than a fixed calendar for heavy lifting."),
  img("/uploads/articles/breast-cancer-surgery-recovery.webp", "Woman performing gentle guided arm and shoulder exercises during recovery after breast cancer surgery", "Guided mobility exercises help reduce shoulder stiffness after breast and axillary surgery."),
  btn("Ask about recovery and physiotherapy planning", consult("Breast Cancer Surgery Recovery")),

  h2("Drains after breast cancer surgery"),
  p("Drains may be placed after mastectomy or reconstruction to remove fluid. Patients may be taught to empty, measure, record output and watch for infection or blockage. Removal timing varies."),

  h2("Possible risks and complications"),
  ul([
    "Infection, bleeding or haematoma",
    "Seroma (fluid collection)",
    "Pain, numbness or altered sensation",
    "Shoulder stiffness",
    "Lymphoedema — see [breast cancer lymphedema](" + LYMPH + ")",
    "Wound-healing problems (higher with smoking, diabetes, poor nutrition)",
    "Reconstruction-related complications including further surgery",
  ]),

  h2("Warning signs after breast cancer surgery"),
  ul([
    "Fever or chills; increasing redness, warmth, pus or unusual discharge",
    "Worsening pain, sudden swelling or bleeding",
    "Drain that stops working or becomes displaced",
    "New or worsening arm swelling",
    "Sudden breathlessness or chest pain — seek urgent care",
  ]),

  h2("Exercises after breast cancer surgery"),
  p("Gentle hand, elbow and shoulder movements, posture work and breathing exercises may be prescribed. Do not start strenuous exercise or heavy lifting without clearance."),

  h2("Will chemotherapy or radiation be needed after surgery?"),
  p("Final pathology guides next steps. [Radiation](" + RAD_BLOG + ") is commonly recommended after conservation ([EBRT](" + EBRT + ") **$1,000–$6,000+**). Selected post-mastectomy patients also need radiation based on size, nodes, margins and other risk factors."),
  p("[Chemotherapy](" + CHEMO_BLOG + "), [hormone therapy](" + HT_BLOG + ") and [targeted therapy](" + TARGETED_BLOG + ") may follow depending on subtype and risk. Named adjuvant chemo planning is **$2,500–$10,000** on the [adjuvant chemotherapy](" + ADJ + ") sheet."),

  h2("Breast cancer surgery cost in India"),
  p("Costs vary by operation, hospital, stay length, pathology and add-on procedures. Use named GAF planning ranges — do not treat lumpectomy, mastectomy and reconstruction as identical packages:"),
  { id: id("html"), type: "html", html: costTable },
  p("Request a written estimate covering consultation, investigations, surgeon and anaesthesia fees, theatre, room, medicines, pathology, node procedures, reconstruction and postoperative care. Wider context: [breast cancer treatment cost in India](" + COST_BLOG + ")."),
  btn("Request a written breast-surgery estimate", consult("Breast Cancer Surgery Cost Estimate")),

  h2("Breast cancer surgery in India for international patients"),
  p("Patients from Tanzania, Kenya, Uganda, Ethiopia, Zambia, Iraq, Oman and other countries may travel for second opinion, diagnostic review, surgery or a full plan. Bring biopsy/histopathology, ER/PR/HER2, imaging, prior operation or systemic-therapy records, medicines and medical history."),
  p("Stay length depends on the procedure — do not book return flights too close to planned discharge. City filters for [Delhi NCR](" + DELHI + "), [Mumbai](" + MUMBAI + "), [Bengaluru](" + BLR + "), [Chennai](" + CHN + ") and [Hyderabad](" + HYD + ") surgical oncologists help shortlist campuses. Practical sequencing: [international patient guide](" + INTL + ")."),
  p("Before leaving India, obtain discharge summary, final pathology, operation notes, medicines, wound/drain instructions, rehab guidance, follow-up schedule and any next-step chemo/radiation/targeted plan."),
  btn("Start an international surgery records review", consult("Breast Cancer Treatment in India")),

  h2("How to choose a breast cancer surgeon and hospital in India"),
  ul([
    "Surgeon experience with the proposed breast cancer operation",
    "Multidisciplinary medical and radiation oncology access",
    "Reconstruction expertise when that option is being considered",
    "Reliable pathology and receptor testing",
    "Radiation access if conservation is planned",
    "Physiotherapy, wound care and lymphoedema support",
    "Transparent written cost estimates",
  ]),

  h2("Questions to ask your breast cancer surgeon"),
  ol([
    "What is the exact stage and subtype of my breast cancer?",
    "Am I suitable for breast-conserving surgery?",
    "Why are you recommending lumpectomy or mastectomy?",
    "Will I need sentinel lymph node biopsy?",
    "Is axillary lymph node dissection necessary?",
    "Will chemotherapy be required before surgery?",
    "Is immediate breast reconstruction possible?",
    "Will I need radiation after surgery?",
    "What are the likely risks and complications?",
    "How long will I remain in hospital?",
    "How long should I plan for recovery?",
    "When will the final pathology report be available?",
    "What additional treatment may be required?",
    "What is included in the hospital estimate?",
  ]),

  h2("Frequently asked questions about breast cancer surgery in India"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Conclusion"),
  p("Breast cancer surgery includes conservation, mastectomy, node procedures and optional reconstruction. The right choice depends on tumour characteristics, stage, health and multidisciplinary goals — not simply choosing the largest operation."),
  p("Patients considering surgery in India should seek a specialist opinion, understand why a procedure is recommended and obtain a clear estimate of the complete treatment journey."),
  btn("Discuss the next surgical step with GAF Healthcare", consult("Breast Cancer Surgery")),

  h2("Sources and references"),
  ol([
    "[National Cancer Institute — Breast Cancer Surgery](https://www.cancer.gov/types/breast/treatment/surgery)",
    "[American Cancer Society — Surgery for Breast Cancer](https://www.cancer.org/cancer/types/breast-cancer/treatment/surgery-for-breast-cancer.html)",
    "[NCI — Lumpectomy](https://www.cancer.gov/types/breast/treatment/surgery/lumpectomy)",
    "[NCI — Mastectomy](https://www.cancer.gov/types/breast/treatment/surgery/mastectomy)",
    "[NCI — Lumpectomy vs Mastectomy](https://www.cancer.gov/types/breast/treatment/surgery/choosing-lumpectomy-mastectomy)",
    "[ICMR Standard Treatment Workflows](https://www.icmr.gov.in/standard-treatment-workflows-stws)",
    "[NHS — Mastectomy](https://www.nhs.uk/tests-and-treatments/mastectomy/)",
    "[NCCN Guidelines for Patients — Invasive Breast Cancer](https://vicc.org/sites/default/files/2026-09/breast-invasive-patient.pdf)",
  ]),
  p("*Medical disclaimer: This article is for educational purposes and does not replace an individual consultation with a qualified breast cancer specialist. Surgical decisions must be based on clinical examination, imaging, biopsy, pathology and multidisciplinary assessment. GAF cost figures are partner planning ranges, not fixed hospital quotations.*"),

  h2("Related Reading on GAF Healthcare"),
  ul(RELATED.map(([label, href]) => `[${label}](${href})`)),
];

const now = "2026-11-12T17:50:00.000Z";
const article = {
  id: "art_breast_cancer_surgery_in_india",
  slug: SLUG,
  title: "Breast Cancer Surgery in India: Types of Surgery, Recovery, Risks and What Patients Should Know",
  excerpt:
    "Breast cancer surgery is an important part of treatment for many patients. This guide explains the different surgical options available in India, including lumpectomy, mastectomy, lymph node procedures and breast reconstruction. It also covers recovery, possible complications, treatment costs and what international patients should know before travelling.",
  date: "12 Nov 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare Editorial",
  category: "Surgical Oncology",
  tags: [
    "breast cancer",
    "breast cancer surgery",
    "lumpectomy",
    "mastectomy",
    "reconstruction",
    "India",
    "cost",
  ],
  image: "/uploads/articles/breast-cancer-surgery-lumpectomy-overview.webp",
  imageAlt:
    "Woman consulting a surgeon beside a circular diagram of breast-conserving removal of a tumour with a surrounding tissue margin",
  status: "published",
  featured: false,
  seoTitle: "Breast Cancer Surgery in India: Types, Cost, Recovery and Best Options",
  seoDescription:
    "Learn about breast cancer surgery in India, including lumpectomy, mastectomy, lymph node surgery and reconstruction. Understand recovery, risks and treatment planning.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/breast-cancer-surgery-lumpectomy-overview.webp",
  allowIndex: true,
  keywords: [
    "Breast cancer surgery in India",
    "Breast cancer operation in India",
    "Breast cancer surgery cost in India",
    "Lumpectomy in India",
    "Mastectomy in India",
    "Breast-conserving surgery",
    "Modified radical mastectomy",
    "Sentinel lymph node biopsy",
    "Breast reconstruction surgery",
    "Recovery after breast cancer surgery",
    "Breast cancer surgeon in India",
  ],
  relatedLinks: RELATED.map(([label, href]) => ({ label, href })),
  blocks,
};

if (!store.categories.includes("Surgical Oncology")) store.categories.push("Surgical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["breast-cancer-surgery-lumpectomy-overview.webp", article.imageAlt],
  [
    "breast-cancer-surgery-sentinel-node.webp",
    "Woman in surgical consultation beside a circular diagram of sentinel lymph node mapping from the breast to axillary nodes",
  ],
  [
    "breast-cancer-surgery-reconstruction.webp",
    "Woman discussing breast reconstruction options beside a circular diagram of implant and autologous tissue reconstruction concepts",
  ],
  [
    "breast-cancer-surgery-recovery.webp",
    "Woman performing gentle guided arm and shoulder exercises during recovery after breast cancer surgery",
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
    "and [breast cancer chemotherapy in India](https://gaf.healthcare/blogs/breast-cancer-chemotherapy-in-india).";
  if (llms.includes(needle)) {
    llms = llms.replace(
      needle,
      ", [breast cancer chemotherapy in India](https://gaf.healthcare/blogs/breast-cancer-chemotherapy-in-india) and [breast cancer surgery in India](https://gaf.healthcare/blogs/breast-cancer-surgery-in-india).",
    );
  }
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
} else {
  console.log("llms.txt already references surgery slug");
}

for (const relatedSlug of [
  "breast-cancer-chemotherapy-in-india",
  "breast-cancer-radiation-therapy-in-india",
  "hormone-therapy-for-breast-cancer-in-india",
  "breast-cancer-treatment-cost-in-india",
  "breast-cancer-lymphedema",
]) {
  const related = store.articles.find((row) => row.slug === relatedSlug);
  if (!related) continue;
  const href = `/blogs/${SLUG}`;
  related.relatedLinks = related.relatedLinks || [];
  if (!related.relatedLinks.some((row) => row.href === href)) {
    related.relatedLinks.push({ label: "Breast cancer surgery in India", href });
  }
  for (let i = 0; i < related.blocks.length; i++) {
    if (related.blocks[i].type === "heading" && /Related Reading/i.test(related.blocks[i].text || "")) {
      for (let j = i + 1; j < Math.min(i + 5, related.blocks.length); j++) {
        if (related.blocks[j].type === "list" && !related.blocks[j].items.some((item) => item.includes(href))) {
          related.blocks[j].items.push(`[Breast Cancer Surgery in India](${href})`);
        }
      }
      break;
    }
  }
}
writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("linked from related breast articles");
