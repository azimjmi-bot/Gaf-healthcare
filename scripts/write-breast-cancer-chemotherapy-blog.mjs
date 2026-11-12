#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const SLUG = "breast-cancer-chemotherapy-in-india";
const CHEMO = "/costs/India/Medical-Oncology/Chemotherapy";
const NEOADJ = "/costs/India/Medical-Oncology/Neoadjuvant-Chemotherapy";
const ADJ = "/costs/India/Medical-Oncology/Adjuvant-Chemotherapy";
const IMMUNO = "/costs/India/Medical-Oncology/Immunotherapy";
const TARGETED = "/costs/India/Medical-Oncology/Targeted-Therapy";
const HORMONE = "/costs/India/Medical-Oncology/Hormone-Therapy";
const EBRT = "/costs/India/Radiation-Oncology/EBRT";
const LUMPECTOMY = "/costs/India/Surgical-Oncology/Lumpectomy";
const MASTECTOMY = "/costs/India/Surgical-Oncology/Mastectomy";
const TX_CHEMO = "/treatments/chemotherapy-in-india";
const TX_NEO = "/treatments/neoadjuvant-chemotherapy-in-india";
const TX_ADJ = "/treatments/adjuvant-chemotherapy-in-india";
const TX_BREAST = "/treatments/breast-cancer-treatment-in-india";
const TX_TARGETED = "/treatments/targeted-therapy-in-india";
const TX_IMMUNO = "/treatments/immunotherapy-in-india";
const EXISTING = "/blogs/chemotherapy-for-breast-cancer-in-india";
const SIDEFX = "/blogs/breast-cancer-chemotherapy-side-effects";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const RAD = "/blogs/breast-cancer-radiation-therapy-in-india";
const HT = "/blogs/hormone-therapy-for-breast-cancer-in-india";
const TARGETED_BLOG = "/blogs/targeted-therapy-for-breast-cancer-in-india";
const HER2 = "/blogs/her2-positive-breast-cancer-treatment-india";
const ERPR = "/blogs/er-pr-her2-breast-cancer-treatment-india";
const COST_BLOG = "/blogs/breast-cancer-treatment-cost-in-india";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const OPTIONS = "/blogs/breast-cancer-treatment-options";
const STAGES = "/blogs/breast-cancer-stages";
const DIAG = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const MED_DOCS = "/doctors/India/Medical-Oncology";
const MED_HOSP = "/hospitals/India/Medical-Oncology";
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

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>Who may need chemotherapy?</strong></td><td>Selected higher-risk, HER2-positive, triple-negative or node-positive cases — not every patient; see <a href="${ERPR}">ER/PR/HER2 results</a></td></tr><tr><td><strong>Before surgery</strong></td><td><a href="${NEOADJ}">Neoadjuvant chemotherapy</a> — $2,500–$10,000 · cycles before surgery · 2–4 months</td></tr><tr><td><strong>After surgery</strong></td><td><a href="${ADJ}">Adjuvant chemotherapy</a> — $2,500–$10,000 · cycles after surgery · 3–6 months</td></tr><tr><td><strong>Overall chemo planning</strong></td><td><a href="${CHEMO}">Chemotherapy</a> — $1,500–$8,000+ · outpatient cycles</td></tr><tr><td><strong>Typical early-stage cycles</strong></td><td>Often about 4–8 cycles over roughly 3–6 months; some regimens are weekly</td></tr><tr><td><strong>If HER2-targeted drugs are added</strong></td><td><a href="${TARGETED}">Targeted therapy</a> $8,000–$30,000 · see <a href="${HER2}">HER2-positive guide</a></td></tr><tr><td><strong>If immunotherapy is added (selected TNBC)</strong></td><td><a href="${IMMUNO}">Immunotherapy</a> $15,000–$45,000</td></tr><tr><td><strong>International patients</strong></td><td>Share full regimen records before travel; next cycle needs fresh clinical clearance</td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>Breast cancer chemotherapy in India</strong> is systemic treatment that travels through the bloodstream. GAF planning for <a href="${CHEMO}">chemotherapy</a> is <strong>$1,500–$8,000+</strong> (outpatient cycles). Named neoadjuvant and adjuvant pathways are each <strong>$2,500–$10,000</strong>. These are partner planning ranges, not hospital quotations.</p><p class="article-quick-answer__body"><strong>Important:</strong> Regimens, doses and cycle counts must be prescribed by a medical oncologist. GAF Healthcare does not prescribe chemotherapy.</p></aside>`;

const neoAdjTable = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Neoadjuvant chemotherapy</th><th>Adjuvant chemotherapy</th></tr></thead><tbody><tr><td>Timing</td><td>Before surgery</td><td>After surgery</td></tr><tr><td>Main purpose</td><td>Shrink tumour and treat disease before operation</td><td>Reduce recurrence risk after operation</td></tr><tr><td>Tumour response</td><td>Can be assessed before surgery</td><td>Assessed through pathology and follow-up</td></tr><tr><td>Surgical impact</td><td>May make breast conservation possible in selected cases</td><td>Does not reduce the original tumour before surgery</td></tr><tr><td>GAF planning range</td><td><a href="${NEOADJ}">$2,500–$10,000</a></td><td><a href="${ADJ}">$2,500–$10,000</a></td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Named pathway</th><th>GAF planning range in India</th><th>Typical schedule</th></tr></thead><tbody><tr><td><a href="${CHEMO}">Chemotherapy</a></td><td>$1,500–$8,000+</td><td>Outpatient cycles · often 3–6 months</td></tr><tr><td><a href="${NEOADJ}">Neoadjuvant chemotherapy</a></td><td>$2,500–$10,000</td><td>Cycles before surgery · 2–4 months</td></tr><tr><td><a href="${ADJ}">Adjuvant chemotherapy</a></td><td>$2,500–$10,000</td><td>Cycles after surgery · 3–6 months</td></tr><tr><td><a href="${TARGETED}">Targeted therapy</a></td><td>$8,000–$30,000</td><td>Medicine and duration dependent</td></tr><tr><td><a href="${IMMUNO}">Immunotherapy</a></td><td>$15,000–$45,000</td><td>Repeated outpatient treatment</td></tr><tr><td><a href="${HORMONE}">Hormone therapy</a></td><td>$1,000–$4,500</td><td>Often years of tablets</td></tr><tr><td><a href="${EBRT}">EBRT</a></td><td>$1,000–$6,000+</td><td>Often 15–35 sessions</td></tr><tr><td><a href="${LUMPECTOMY}">Lumpectomy</a></td><td>$3,500–$8,000</td><td>Typically 1–3 nights</td></tr><tr><td><a href="${MASTECTOMY}">Mastectomy</a></td><td>$4,500–$10,000</td><td>Typically 3–6 nights</td></tr></tbody></table></div>`;

const faqs = [
  ["Is chemotherapy necessary for every breast cancer patient?", "No. Some patients can be treated without chemotherapy. The decision depends on cancer stage, tumour biology, lymph node involvement and the estimated benefit of chemotherapy."],
  ["How many chemotherapy cycles are required for breast cancer?", "Many early-stage treatment plans involve approximately four to eight cycles, but the number varies according to the regimen and clinical situation. Some patients receive weekly treatment schedules."],
  ["How long does breast cancer chemotherapy take?", "Many neoadjuvant or adjuvant chemotherapy courses take approximately three to six months. Treatment for advanced breast cancer may continue for a different duration depending on response and side effects."],
  ["Does chemotherapy cause hair loss?", "Some chemotherapy medicines cause substantial hair loss, while others cause thinning. Hair usually begins to grow back after treatment, although recovery varies."],
  ["Can a patient work during chemotherapy?", "Some patients continue working, particularly if their work is flexible or desk-based. Others need time away because of fatigue, schedules or side effects."],
  ["Is chemotherapy painful?", "Administration is not usually painful, although inserting an IV line can cause brief discomfort. Report pain, burning or swelling around an infusion site immediately."],
  ["Can breast cancer chemotherapy be given at home?", "Some oral cancer medicines may be taken at home under medical supervision. Most intravenous chemotherapy requires administration in an appropriate healthcare facility."],
  ["Can chemotherapy be given after mastectomy?", "Yes. Adjuvant chemotherapy may be recommended after mastectomy if tumour characteristics indicate a meaningful benefit."],
  ["Can chemotherapy shrink a breast tumour?", "Yes. Neoadjuvant chemotherapy can reduce tumour size in some patients and may make breast-conserving surgery possible. Response varies between individuals."],
  ["What is the cost of breast cancer chemotherapy in India?", "GAF planning for chemotherapy is $1,500–$8,000+. Named neoadjuvant and adjuvant pathways are each $2,500–$10,000. Exact expense depends on regimen, cycles, hospital and any targeted or immunotherapy medicines."],
  ["Can international patients receive chemotherapy in India?", "Yes, subject to medical assessment and hospital acceptance. Share biopsy, biomarker and previous treatment records before travelling."],
  ["What happens if chemotherapy is delayed?", "A delay may be needed for low blood counts, infection or other concerns. Never skip or reschedule a cycle without discussing it with the treatment team."],
  ["What is the difference between neoadjuvant and adjuvant chemotherapy?", "Neoadjuvant is given before surgery to shrink disease; adjuvant is given after surgery to reduce recurrence risk."],
  ["Does chemotherapy include HER2-targeted medicines?", "Not always. HER2-targeted drugs such as trastuzumab or pertuzumab may be added for HER2-positive disease and are often billed separately from conventional chemotherapy."],
  ["When should I call the doctor during chemotherapy?", "Call promptly for fever at or above the hospital threshold, chills, breathing difficulty, persistent vomiting, severe diarrhoea, unusual bleeding, or inability to eat or drink because of mouth sores."],
  ["Will I need blood tests before each cycle?", "Blood counts and organ-function tests are commonly reviewed before each cycle so the oncologist can decide whether treatment can proceed safely."],
];

const RELATED = [
  ["Chemotherapy for breast cancer (existing guide)", EXISTING],
  ["Breast cancer chemotherapy side effects", SIDEFX],
  ["Chemotherapy in India", TX_CHEMO],
  ["Neoadjuvant chemotherapy in India", TX_NEO],
  ["Adjuvant chemotherapy in India", TX_ADJ],
  ["Breast cancer treatment in India", TX_BREAST],
  ["Breast cancer surgery in India", SURGERY],
  ["Breast cancer radiation therapy in India", RAD],
  ["Hormone therapy for breast cancer", HT],
  ["Targeted therapy for breast cancer", TARGETED_BLOG],
  ["HER2-positive breast cancer treatment", HER2],
  ["ER, PR and HER2 results", ERPR],
  ["Breast cancer treatment options", OPTIONS],
  ["Breast cancer stages", STAGES],
  ["Breast cancer diagnosis tests", DIAG],
  ["Breast cancer treatment cost in India", COST_BLOG],
  ["International patients", INTL],
  ["Chemotherapy cost sheet", CHEMO],
  ["Medical oncology doctors", MED_DOCS],
  ["Medical oncology hospitals", MED_HOSP],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("A breast cancer diagnosis often raises an important question: will **chemotherapy** be necessary? For some patients it is essential. For others it may offer little additional benefit and can sometimes be avoided."),
  p("The decision depends on stage, tumour size, lymph node involvement, hormone receptor status, HER2 status and overall health. Chemotherapy may be given before surgery to shrink a tumour, after surgery to reduce recurrence risk, or to control cancer that has spread."),
  p("India offers chemotherapy through specialist cancer centres and multidisciplinary hospitals. Related reading includes the existing [chemotherapy for breast cancer](" + EXISTING + ") guide, [chemotherapy side effects](" + SIDEFX + "), [ER/PR/HER2 results](" + ERPR + ") and [breast cancer treatment cost](" + COST_BLOG + ")."),
  p("GAF planning for [chemotherapy](" + CHEMO + ") is **$1,500–$8,000+** (outpatient cycles). Named [neoadjuvant](" + NEOADJ + ") and [adjuvant](" + ADJ + ") pathways are each **$2,500–$10,000**. Filter [medical oncologists](" + MED_DOCS + ") and [hospitals](" + MED_HOSP + ") by city before travel."),
  btn("Ask GAF to review pathology for chemotherapy planning", consult("Breast Cancer Chemotherapy")),
  p("[WhatsApp +91 90443 46292 with biopsy, receptor and prior cycle records](" + wa("Please review my breast cancer reports and advise on chemotherapy regimen, cycles and cost in India.") + ")"),
  img("/uploads/articles/breast-cancer-chemo-infusion-overview.webp", "Woman receiving outpatient breast cancer chemotherapy infusion beside a circular diagram of systemic medicine reaching cancer cells", "Most breast cancer chemotherapy is systemic treatment delivered as outpatient infusion cycles."),

  h2("What is chemotherapy for breast cancer?"),
  p("Chemotherapy uses medicines to destroy cancer cells or stop them growing. Unlike surgery or [radiation](" + RAD + "), it travels through the bloodstream and can reach cancer cells in different parts of the body."),
  ul([
    "Destroy cells that may remain after surgery",
    "Shrink a tumour before an operation",
    "Improve chances of breast-conserving surgery in selected patients",
    "Treat cancer involving nodes or distant sites",
    "Control advanced or recurrent disease and reduce symptoms",
  ]),
  p("It is not the same as [targeted therapy](" + TARGETED_BLOG + ") or [hormone therapy](" + HT + "), which may be used alongside chemotherapy in selected patients. See also [chemotherapy in India](" + TX_CHEMO + ")."),

  h2("Does every breast cancer patient need chemotherapy?"),
  p("No. Some early-stage, hormone receptor-positive, HER2-negative patients may be treated with surgery, radiation and hormone therapy without chemotherapy. Others benefit significantly when recurrence risk is higher."),
  ul([
    "**Stage and nodes:** Larger tumours or node involvement raise the chance chemotherapy is considered, but stage alone does not decide it.",
    "**Grade:** Higher-grade cancers may have greater recurrence risk.",
    "**Hormone receptors:** ER/PR-positive disease may respond to endocrine therapy; some patients still need chemotherapy.",
    "**HER2:** HER2-positive disease often combines chemotherapy with HER2-targeted medicines — see [HER2-positive treatment](" + HER2 + ").",
    "**Triple-negative:** Chemotherapy is central for many TNBC plans; selected cases also use immunotherapy.",
    "**Genomic testing:** Selected HR-positive, HER2-negative patients may use genomic assays to estimate chemotherapy benefit.",
  ]),
  btn("Request a second opinion on chemotherapy eligibility", consult("Breast Cancer Chemotherapy Second Opinion")),

  h2("When is chemotherapy given: before or after breast cancer surgery?"),
  h3("Neoadjuvant chemotherapy (before surgery)"),
  p("[Neoadjuvant chemotherapy](" + TX_NEO + ") may shrink the tumour, treat disease beyond the breast and improve surgical options. It is often considered for larger tumours, node-positive disease, selected HER2-positive or triple-negative cancers, or when conservation may become possible after response."),
  h3("Adjuvant chemotherapy (after surgery)"),
  p("[Adjuvant chemotherapy](" + TX_ADJ + ") aims to destroy microscopic residual disease after [lumpectomy](" + LUMPECTOMY + ") or [mastectomy](" + MASTECTOMY + ") when pathology shows higher-risk features."),
  { id: id("html"), type: "html", html: neoAdjTable },
  img("/uploads/articles/breast-cancer-chemo-neoadjuvant-surgery.webp", "Woman in clinic consultation beside a circular diagram illustrating breast tumour shrinkage before surgery after neoadjuvant chemotherapy", "Neoadjuvant chemotherapy can shrink selected tumours before breast cancer surgery."),

  h2("What chemotherapy drugs are used for breast cancer?"),
  ul([
    "**Anthracyclines:** doxorubicin, epirubicin",
    "**Taxanes:** paclitaxel, docetaxel, albumin-bound paclitaxel",
    "**Alkylating agents:** cyclophosphamide",
    "**Platinum agents:** carboplatin, cisplatin in selected plans including some TNBC settings",
    "**Antimetabolites:** capecitabine, fluorouracil (5-FU), gemcitabine",
  ]),
  p("These are examples, not a self-selection list. The oncologist sets medicine and dose."),

  h2("Common chemotherapy combinations for breast cancer"),
  ul([
    "**AC:** doxorubicin + cyclophosphamide, sometimes followed by a taxane",
    "**AC-T:** doxorubicin, cyclophosphamide and a taxane (paclitaxel or docetaxel)",
    "**TC:** docetaxel + cyclophosphamide in selected patients",
    "**TCHP:** docetaxel, carboplatin, trastuzumab and pertuzumab in selected HER2-positive plans — trastuzumab/pertuzumab are targeted medicines, not conventional chemo",
    "**Selected early TNBC:** chemotherapy plus pembrolizumab immunotherapy when eligible",
  ]),
  p("Patients should not choose a regimen from a list. Ask for a written calendar of medicines, doses and cycle dates."),

  h2("How many chemotherapy cycles are needed for breast cancer?"),
  p("There is no fixed number for every patient. Many early-stage plans use about four to eight cycles over roughly three to six months. Some schedules are weekly or every two to three weeks."),
  p("A cycle includes treatment plus a rest period for healthy-cell recovery. Cycle count depends on the combination, subtype, neoadjuvant vs adjuvant setting, response, blood counts, organ function and side effects."),
  p("[WhatsApp GAF if you need help comparing cycle schedules before travel](" + wa("I need guidance on breast cancer chemotherapy cycle numbers and neoadjuvant versus adjuvant timing in India.") + ")"),

  h2("What happens during a chemotherapy session?"),
  ol([
    "Medical assessment of symptoms and prior side effects",
    "Blood tests for haemoglobin, white cells, neutrophils, platelets, kidney and liver function",
    "Pre-medication for nausea or infusion reactions when indicated",
    "IV, port or oral administration of prescribed medicines",
    "Observation and same-day discharge when clinically appropriate",
  ]),
  img("/uploads/articles/breast-cancer-chemo-blood-monitoring.webp", "Woman having blood tests reviewed before a breast cancer chemotherapy cycle beside a circular blood-cell monitoring diagram", "Blood counts are commonly checked before each cycle so treatment can proceed safely."),

  h2("Does chemotherapy require hospital admission?"),
  p("Often no — many regimens are daycare infusions. Admission may be needed for prolonged monitoring, significant toxicity, infection or regimen-specific requirements. International patients should ask whether their plan is daycare and how long to stay near the hospital."),

  h2("What are the side effects of breast cancer chemotherapy?"),
  ul([
    "Hair loss or thinning",
    "Nausea and vomiting — anti-emetics are commonly prescribed",
    "Fatigue",
    "Low white-cell counts and infection risk; G-CSF may be used in selected cases",
    "Mouth ulcers",
    "Diarrhoea or constipation",
    "Peripheral neuropathy (especially taxanes)",
    "Nail and skin changes",
    "Cardiac effects with selected anthracyclines; HER2 medicines also need heart monitoring",
    "Fertility impact and early menopause risk — discuss preservation before starting",
  ]),
  p("More detail sits on [breast cancer chemotherapy side effects](" + SIDEFX + ")."),
  img("/uploads/articles/breast-cancer-chemo-side-effects-support.webp", "Woman resting after chemotherapy with supportive care items beside a circular diagram representing recovery from treatment side effects", "Supportive medicines and early reporting of symptoms help keep chemotherapy on track."),
  btn("Ask about supportive care during chemotherapy", consult("Breast Cancer Chemotherapy Side Effects")),

  h2("When should a patient contact the doctor during chemotherapy?"),
  ul([
    "Fever at or above the hospital threshold (often 38°C)",
    "Chills, new cough or breathing difficulty",
    "Persistent vomiting or severe diarrhoea",
    "Unusual bleeding or bruising",
    "Painful mouth ulcers preventing eating or drinking",
    "Burning on urination, sudden weakness or confusion",
  ]),
  p("Fever during neutropenia can be an emergency — do not wait for the next appointment. Severe breathlessness, chest pain, fainting or confusion need urgent care."),

  h2("How can patients manage chemotherapy side effects?"),
  ul([
    "Take anti-nausea and supportive medicines as prescribed",
    "Maintain hydration and small regular meals when appetite falls",
    "Follow the team's mouth-care routine",
    "Monitor temperature as instructed",
    "Balance rest with gentle activity when advised",
    "Report new symptoms early — do not wait until the next cycle",
    "Avoid herbal products or supplements without oncologist clearance",
  ]),

  h2("What happens after chemotherapy is completed?"),
  p("After neoadjuvant therapy, surgery timing and type depend on response and imaging. After adjuvant therapy, next steps may include [radiation](" + RAD + "), [hormone therapy](" + HT + "), HER2-targeted treatment or other medicines. Follow-up covers exams, indicated blood tests, imaging and late-effect monitoring."),

  h2("Breast cancer chemotherapy cost in India"),
  p("Cost depends on medicines, cycles, hospital charges and supportive care. Use GAF partner planning ranges — not unsupported per-cycle rupee estimates:"),
  { id: id("html"), type: "html", html: costTable },
  p("Targeted therapy and immunotherapy are often billed separately and can change totals substantially. Request a written estimate covering regimen, doses, cycle count, supportive medicines, labs, daycare fees and what happens financially if the plan changes. Wider context: [breast cancer treatment cost in India](" + COST_BLOG + ")."),
  btn("Request a written chemotherapy-course estimate", consult("Breast Cancer Chemotherapy Cost Estimate")),

  h2("Breast cancer chemotherapy in India for international patients"),
  p("Patients from Tanzania, Kenya, Uganda, Ethiopia, Zambia, Iraq, Oman and other countries may travel for oncology care. Share biopsy/histopathology, ER/PR/HER2, imaging, surgery records, prior medicines and doses, cycle dates, recent labs, current medicines and complication history before travel."),
  p("Continuation of an existing plan still needs fresh clinical review in India. City filters for [Delhi NCR](" + DELHI + "), [Mumbai](" + MUMBAI + "), [Bengaluru](" + BLR + "), [Chennai](" + CHN + ") and [Hyderabad](" + HYD + ") medical oncologists help shortlist campuses. Practical sequencing: [international patient guide](" + INTL + ")."),
  p("Ask for consultation dates, chemo dates, blood-test schedule, observation needs and advice on travel between cycles. Shared care with a home-country oncologist needs a clear protocol and monitoring plan."),
  btn("Start an international chemotherapy records review", consult("Breast Cancer Treatment in India")),

  h2("How to choose a hospital for breast cancer chemotherapy in India"),
  ul([
    "Medical oncology expertise in breast cancer",
    "Dedicated daycare infusion facilities",
    "Emergency support for infection and infusion reactions",
    "Reliable pathology and biomarker testing",
    "Multidisciplinary coordination with surgery and radiation",
    "Supportive care for nutrition, pain and rehabilitation",
    "Transparent written estimates for the full planned course",
  ]),

  h2("Questions to ask your medical oncologist before chemotherapy"),
  ol([
    "Why is chemotherapy recommended in my case?",
    "What is my breast cancer subtype?",
    "Is chemotherapy being given before or after surgery?",
    "Which medicines will be used?",
    "How many cycles are planned?",
    "How frequently will I receive treatment?",
    "What tests are needed before each cycle?",
    "Which side effects are most likely with my medicines?",
    "What should I do if I develop a fever?",
    "Will I need injections to support my white blood cell count?",
    "Could chemotherapy affect my fertility?",
    "Will I need targeted therapy or immunotherapy?",
    "What is the estimated cost of the complete treatment course?",
    "What treatment is expected after chemotherapy?",
  ]),

  h2("Frequently asked questions about breast cancer chemotherapy in India"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Conclusion"),
  p("Chemotherapy remains important for many breast cancer patients, but it is not required in every case. Timing may be neoadjuvant or adjuvant, and advanced disease may use chemotherapy for control."),
  p("Patients planning treatment in India should understand the proposed medicines, cycle count, duration, side effects and complete cost — and receive an individualised plan from a qualified medical oncologist."),
  btn("Discuss the next chemotherapy step with GAF Healthcare", consult("Breast Cancer Chemotherapy")),

  h2("Sources and references"),
  ol([
    "[National Cancer Institute — Chemotherapy for Breast Cancer](https://www.cancer.gov/types/breast/treatment/chemotherapy)",
    "[American Cancer Society — Chemotherapy for Breast Cancer](https://www.cancer.org/cancer/types/breast-cancer/treatment/chemotherapy-for-breast-cancer.html)",
    "[ICMR Standard Treatment Workflows](https://www.icmr.gov.in/standard-treatment-workflows-stws)",
    "[National Cancer Institute — Chemotherapy to Treat Cancer](https://www.cancer.gov/about-cancer/treatment/types/chemotherapy)",
    "[NCCN Guidelines for Patients — Invasive Breast Cancer](https://vicc.org/sites/default/files/2026-09/breast-invasive-patient.pdf)",
    "[American Cancer Society — Targeted Drug Therapy for Breast Cancer](https://www.cancer.org/cancer/types/breast-cancer/treatment/targeted-therapy-for-breast-cancer.html)",
    "[National Cancer Institute — Breast Cancer Treatment](https://www.cancer.gov/types/breast/treatment)",
    "[ASCO living guideline — Hormone Receptor-Positive, HER2-Negative Breast Cancer](https://ascopubs.org/doi/10.1200/JCO-26-02034)",
  ]),
  p("*Medical disclaimer: This article is for educational purposes. Chemotherapy medicines, doses and schedules must be prescribed by a qualified medical oncologist after reviewing the patient's diagnosis, pathology, health and treatment history. GAF cost figures are partner planning ranges, not fixed hospital quotations.*"),

  h2("Related Reading on GAF Healthcare"),
  ul(RELATED.map(([label, href]) => `[${label}](${href})`)),
];

const now = "2026-11-12T14:40:00.000Z";
const article = {
  id: "art_breast_cancer_chemotherapy_in_india",
  slug: SLUG,
  title: "Breast Cancer Chemotherapy in India: Types of Drugs, Number of Cycles, Side Effects and Cost",
  excerpt:
    "Chemotherapy is an important treatment for certain types and stages of breast cancer. This guide explains when it is recommended, commonly used medicines, treatment cycles, side effects, recovery and the cost of breast cancer chemotherapy in India.",
  date: "12 Nov 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare Editorial",
  category: "Medical Oncology",
  tags: ["breast cancer", "chemotherapy", "neoadjuvant", "adjuvant", "India", "cost"],
  image: "/uploads/articles/breast-cancer-chemo-infusion-overview.webp",
  imageAlt:
    "Woman receiving outpatient breast cancer chemotherapy infusion beside a circular diagram of systemic medicine reaching cancer cells",
  status: "published",
  featured: false,
  seoTitle: "Breast Cancer Chemotherapy in India: Cycles, Drugs, Side Effects & Cost",
  seoDescription:
    "Understand breast cancer chemotherapy in India, including common drug combinations, number of cycles, treatment duration, side effects, cost and recovery.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/breast-cancer-chemo-infusion-overview.webp",
  allowIndex: true,
  keywords: [
    "Breast cancer chemotherapy in India",
    "Chemotherapy for breast cancer",
    "Breast cancer chemotherapy cost in India",
    "Breast cancer chemotherapy drugs",
    "How many chemotherapy cycles are needed for breast cancer",
    "Chemotherapy before breast cancer surgery",
    "Chemotherapy after breast cancer surgery",
    "Side effects of breast cancer chemotherapy",
    "Chemotherapy hospitals in India",
    "Breast cancer treatment for international patients",
  ],
  relatedLinks: RELATED.map(([label, href]) => ({ label, href })),
  blocks,
};

if (!store.categories.includes("Medical Oncology")) store.categories.push("Medical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["breast-cancer-chemo-infusion-overview.webp", article.imageAlt],
  [
    "breast-cancer-chemo-neoadjuvant-surgery.webp",
    "Woman in clinic consultation beside a circular diagram illustrating breast tumour shrinkage before surgery after neoadjuvant chemotherapy",
  ],
  [
    "breast-cancer-chemo-blood-monitoring.webp",
    "Woman having blood tests reviewed before a breast cancer chemotherapy cycle beside a circular blood-cell monitoring diagram",
  ],
  [
    "breast-cancer-chemo-side-effects-support.webp",
    "Woman resting after chemotherapy with supportive care items beside a circular diagram representing recovery from treatment side effects",
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
  const needle =
    "and [breast cancer radiation therapy in India](https://gaf.healthcare/blogs/breast-cancer-radiation-therapy-in-india).";
  if (llms.includes(needle)) {
    llms = llms.replace(
      needle,
      ", [breast cancer radiation therapy in India](https://gaf.healthcare/blogs/breast-cancer-radiation-therapy-in-india) and [breast cancer chemotherapy in India](https://gaf.healthcare/blogs/breast-cancer-chemotherapy-in-india).",
    );
  } else {
    llms = llms.replace(
      "- [Blogs](https://gaf.healthcare/blogs):",
      `- [Blogs](https://gaf.healthcare/blogs): includes [breast cancer chemotherapy in India](https://gaf.healthcare/blogs/breast-cancer-chemotherapy-in-india).`,
    );
  }
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

for (const relatedSlug of [
  "chemotherapy-for-breast-cancer-in-india",
  "breast-cancer-chemotherapy-side-effects",
  "breast-cancer-radiation-therapy-in-india",
  "hormone-therapy-for-breast-cancer-in-india",
  "breast-cancer-treatment-cost-in-india",
]) {
  const related = store.articles.find((row) => row.slug === relatedSlug);
  if (!related) continue;
  const href = `/blogs/${SLUG}`;
  related.relatedLinks = related.relatedLinks || [];
  if (!related.relatedLinks.some((row) => row.href === href)) {
    related.relatedLinks.push({ label: "Breast cancer chemotherapy in India", href });
  }
  for (let i = 0; i < related.blocks.length; i++) {
    if (related.blocks[i].type === "heading" && /Related Reading/i.test(related.blocks[i].text || "")) {
      for (let j = i + 1; j < Math.min(i + 5, related.blocks.length); j++) {
        if (related.blocks[j].type === "list" && !related.blocks[j].items.some((item) => item.includes(href))) {
          related.blocks[j].items.push(`[Breast Cancer Chemotherapy in India](${href})`);
        }
      }
      break;
    }
  }
}
writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("linked from related breast articles");
