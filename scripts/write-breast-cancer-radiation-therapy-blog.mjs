#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const SLUG = "breast-cancer-radiation-therapy-in-india";
const EBRT = "/costs/India/Radiation-Oncology/EBRT";
const IMRT = "/costs/India/Radiation-Oncology/IMRT";
const IGRT = "/costs/India/Radiation-Oncology/IGRT";
const SBRT = "/costs/India/Radiation-Oncology/SBRT";
const BRACHY = "/costs/India/Radiation-Oncology/Brachytherapy";
const LUMPECTOMY = "/costs/India/Surgical-Oncology/Lumpectomy";
const MASTECTOMY = "/costs/India/Surgical-Oncology/Mastectomy";
const CHEMO = "/costs/India/Medical-Oncology/Chemotherapy";
const HORMONE = "/costs/India/Medical-Oncology/Hormone-Therapy";
const TX_EBRT = "/treatments/external-beam-radiotherapy-in-india";
const TX_BRACHY = "/treatments/brachytherapy-in-india";
const TX_BREAST = "/treatments/breast-cancer-treatment-in-india";
const EXISTING_RAD = "/blogs/radiation-therapy-for-breast-cancer";
const RAD_SIDEFX = "/blogs/breast-cancer-radiation-side-effects";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const CHEMO_BLOG = "/blogs/chemotherapy-for-breast-cancer-in-india";
const HT_BLOG = "/blogs/hormone-therapy-for-breast-cancer-in-india";
const TARGETED_BLOG = "/blogs/targeted-therapy-for-breast-cancer-in-india";
const COST_BLOG = "/blogs/breast-cancer-treatment-cost-in-india";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const OPTIONS = "/blogs/breast-cancer-treatment-options";
const STAGES = "/blogs/breast-cancer-stages";
const DIAG = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const LYMPH = "/blogs/breast-cancer-lymphedema";
const RAD_DOCS = "/doctors/India/Radiation-Oncology";
const RAD_HOSP = "/hospitals/India/Radiation-Oncology";
const DELHI = "/doctors/India/Delhi-NCR/Radiation-Oncology";
const MUMBAI = "/doctors/India/Mumbai/Radiation-Oncology";
const BLR = "/doctors/India/Bengaluru/Radiation-Oncology";
const CHN = "/doctors/India/Chennai/Radiation-Oncology";
const HYD = "/doctors/India/Hyderabad/Radiation-Oncology";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;
const h2 = (text) => ({ id: id("h"), type: "heading", level: 2, text });
const h3 = (text) => ({ id: id("h"), type: "heading", level: 3, text });
const p = (text) => ({ id: id("p"), type: "paragraph", text });
const ul = (items) => ({ id: id("ul"), type: "list", style: "ul", items });
const ol = (items) => ({ id: id("ol"), type: "list", style: "ol", items });
const btn = (label, href) => ({ id: id("btn"), type: "button", label, href });
const img = (src, alt, caption) => ({ id: id("img"), type: "image", src, alt, caption });

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>When is radiation used?</strong></td><td>Commonly after <a href="${LUMPECTOMY}">lumpectomy</a>; after <a href="${MASTECTOMY}">mastectomy</a> when recurrence risk is higher; also for selected nodes or symptom control</td></tr><tr><td><strong>Main technique</strong></td><td><a href="${EBRT}">External beam radiotherapy (EBRT)</a>; selected patients may receive partial-breast approaches or <a href="${BRACHY}">brachytherapy</a></td></tr><tr><td><strong>Sessions</strong></td><td>Often ~15–16 fractions (≈3 weeks); some plans ~25 fractions; selected patients may receive 5 fractions in 1 week</td></tr><tr><td><strong>Advanced delivery</strong></td><td><a href="${IMRT}">IMRT</a>, <a href="${IGRT}">IGRT</a>, VMAT and DIBH may be used when anatomy and dose goals require them</td></tr><tr><td><strong>GAF EBRT planning range</strong></td><td><a href="${EBRT}">$1,000–$6,000+</a> · often 15–35 sessions</td></tr><tr><td><strong>IMRT / IGRT planning</strong></td><td><a href="${IMRT}">IMRT $6,500–$14,500</a> · <a href="${IGRT}">IGRT $7,200–$16,000</a></td></tr><tr><td><strong>Related side-effect guide</strong></td><td><a href="${RAD_SIDEFX}">Breast cancer radiation side effects</a></td></tr><tr><td><strong>International stay</strong></td><td>Driven by fraction count — short-course plans need less time than longer courses</td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>Breast cancer radiation therapy in India</strong> is a local treatment that targets remaining breast tissue, the chest wall or selected lymph nodes after surgery, or specific sites of advanced disease. GAF planning for <a href="${EBRT}">EBRT</a> is <strong>$1,000–$6,000+</strong> (often 15–35 sessions). These are partner planning ranges, not hospital quotations.</p><p class="article-quick-answer__body"><strong>Important:</strong> Technique, dose and fraction number must be set by a radiation oncologist from the full pathology and surgical record. GAF Healthcare does not prescribe radiation.</p></aside>`;

const scheduleTable = `<div class="md-body"><table><thead><tr><th>Radiation approach</th><th>Typical treatment schedule</th></tr></thead><tbody><tr><td>Conventional whole-breast radiation</td><td>Often around 25 fractions over approximately 5 weeks</td></tr><tr><td>Moderate hypofractionation</td><td>Commonly around 15–16 fractions over approximately 3 weeks</td></tr><tr><td>Selected shorter whole-breast schedules</td><td>May involve 5 fractions over approximately 1 week</td></tr><tr><td>Partial breast irradiation</td><td>May involve a short course, depending on technique and eligibility</td></tr><tr><td>Regional lymph node radiation</td><td>Often delivered alongside breast or chest wall treatment</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Named pathway</th><th>GAF planning range in India</th><th>Typical schedule / stay</th></tr></thead><tbody><tr><td><a href="${EBRT}">External beam radiotherapy (EBRT)</a></td><td>$1,000–$6,000+</td><td>Often 15–35 sessions</td></tr><tr><td><a href="${IMRT}">IMRT</a></td><td>$6,500–$14,500</td><td>About 4–7 weeks of fractions</td></tr><tr><td><a href="${IGRT}">IGRT</a></td><td>$7,200–$16,000</td><td>About 4–7 weeks of fractions</td></tr><tr><td><a href="${SBRT}">SBRT</a> (selected sites)</td><td>$8,000–$17,500</td><td>About 1–5 sessions</td></tr><tr><td><a href="${BRACHY}">Brachytherapy</a></td><td>$5,500–$13,000</td><td>About 1–7 nights</td></tr><tr><td><a href="${LUMPECTOMY}">Lumpectomy</a></td><td>$3,500–$8,000</td><td>Typically 1–3 nights</td></tr><tr><td><a href="${MASTECTOMY}">Mastectomy</a></td><td>$4,500–$10,000</td><td>Typically 3–6 nights</td></tr><tr><td><a href="${CHEMO}">Chemotherapy</a></td><td>$1,500–$8,000+</td><td>Outpatient cycles</td></tr></tbody></table></div>`;

const faqs = [
  ["Is radiation therapy necessary after every breast cancer surgery?", "No. Radiation is commonly recommended after lumpectomy and may be advised after mastectomy for selected patients. The decision depends on the stage, pathology, lymph node involvement and risk of recurrence."],
  ["How many radiation sessions are required for breast cancer?", "The number varies. Some patients receive approximately 15–16 sessions, while selected patients may be suitable for five sessions. Others need a longer schedule depending on the treatment area and clinical requirements."],
  ["Is radiation therapy painful?", "External beam radiation is generally painless during delivery. Some patients develop skin irritation, breast tenderness or fatigue during treatment."],
  ["Does breast cancer radiation cause hair loss?", "Radiation usually does not cause hair loss across the scalp. Hair loss may occur in a small area directly exposed to radiation, depending on the treatment field."],
  ["Can radiation be given after mastectomy?", "Yes. Post-mastectomy radiation may be recommended for patients with certain high-risk features, including selected cases with lymph node involvement or larger tumours."],
  ["Can radiation therapy be given with chemotherapy?", "Radiation is often scheduled after chemotherapy when both treatments are required. The exact sequence depends on the patient's treatment plan. Selected hormone or targeted treatments may continue during radiation."],
  ["What is DIBH radiation therapy?", "Deep inspiration breath hold is a technique in which the patient holds a deep breath during radiation delivery. It may help move the heart away from the treatment area during left-sided breast radiation."],
  ["What is the difference between IMRT and IGRT?", "IMRT changes the intensity of radiation beams to shape the dose distribution. IGRT uses imaging to verify patient positioning and improve treatment accuracy. They serve different purposes and may be used together."],
  ["Can a patient travel during radiation therapy?", "Repeated travel during a radiation course may be difficult because treatment is usually delivered on scheduled days. Patients should discuss the practical implications with their radiation oncologist before making travel plans."],
  ["What is the cost of breast cancer radiation therapy in India?", "GAF planning for EBRT is $1,000–$6,000+. IMRT planning is $6,500–$14,500 and IGRT is $7,200–$16,000. Exact expense depends on technique, treatment area, fraction number and hospital."],
  ["Can breast cancer return after radiation therapy?", "Yes. Radiation reduces the risk of local recurrence but cannot eliminate it completely. Regular follow-up remains important."],
  ["Does radiation therapy make a patient radioactive?", "No. Patients receiving standard external beam radiation do not become radioactive and can generally be around family members after treatment. Internal radiation procedures have different precautions, which the treating team explains."],
  ["Can radiation therapy be completed in India within one week?", "Some selected patients may be eligible for a five-fraction schedule. Many patients require a longer course. The radiation oncologist determines the appropriate schedule."],
  ["When does radiation start after surgery?", "Radiation usually begins after the surgical wound has healed. If chemotherapy is required, radiation is often scheduled after chemotherapy finishes."],
  ["What is hypofractionated radiation?", "Hypofractionation delivers a larger dose per session with fewer total sessions. For selected breast cancer patients it can provide effective treatment in a shorter overall course."],
  ["How should skin be cared for during radiation?", "Wash gently with lukewarm water, use only team-approved creams, wear loose clothing, protect the area from sun and report painful, blistered or broken skin promptly."],
];

const RELATED = [
  ["Radiation therapy for breast cancer (existing guide)", EXISTING_RAD],
  ["Breast cancer radiation side effects", RAD_SIDEFX],
  ["External beam radiotherapy in India", TX_EBRT],
  ["Brachytherapy in India", TX_BRACHY],
  ["Breast cancer treatment in India", TX_BREAST],
  ["Breast cancer surgery in India", SURGERY],
  ["Chemotherapy for breast cancer", CHEMO_BLOG],
  ["Hormone therapy for breast cancer", HT_BLOG],
  ["Targeted therapy for breast cancer", TARGETED_BLOG],
  ["Breast cancer treatment options", OPTIONS],
  ["Breast cancer stages", STAGES],
  ["Breast cancer diagnosis tests", DIAG],
  ["Lymphedema after breast cancer treatment", LYMPH],
  ["Breast cancer treatment cost in India", COST_BLOG],
  ["International patients", INTL],
  ["EBRT cost sheet", EBRT],
  ["IMRT cost sheet", IMRT],
  ["Radiation oncologists in India", RAD_DOCS],
  ["Radiation oncology hospitals in India", RAD_HOSP],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("After breast cancer surgery, many patients are advised to undergo **radiation therapy**. For some it is an essential part of treatment. Others may not need it, depending on diagnosis and recurrence risk."),
  p("Radiation therapy, also called radiotherapy, uses high-energy radiation to destroy cancer cells or stop them growing. It is a local treatment aimed at a specific area — remaining breast tissue, the chest wall or nearby lymph nodes — rather than circulating through the whole body like [chemotherapy](" + CHEMO_BLOG + ")."),
  p("India has radiation oncology departments with linear accelerators and advanced planning systems. Technique choice depends on clinical need and hospital facilities. Related reading includes the existing [radiation therapy for breast cancer](" + EXISTING_RAD + ") guide, [radiation side effects](" + RAD_SIDEFX + "), [breast cancer surgery](" + SURGERY + ") and [treatment cost](" + COST_BLOG + ")."),
  p("GAF planning for [EBRT](" + EBRT + ") is **$1,000–$6,000+** (often 15–35 sessions). Named [radiation oncologists](" + RAD_DOCS + ") and [radiation oncology hospitals](" + RAD_HOSP + ") can be filtered by city before travel."),
  btn("Ask GAF to review records for radiation planning", consult("Breast Cancer Radiation Therapy")),
  p("[WhatsApp +91 90443 46292 with surgery notes and pathology](" + wa("Please review my breast cancer surgery and pathology reports and advise on radiation therapy options, sessions and cost in India.") + ")"),
  img("/uploads/articles/breast-cancer-radiation-planning-overview.webp", "Woman on a CT simulation couch beside a circular diagram of conformal radiation beams targeting breast tissue while sparing nearby organs", "CT simulation and computer planning define the breast or chest-wall target before the first radiation session."),

  h2("What is radiation therapy for breast cancer?"),
  p("Radiation damages the DNA of cancer cells so they cannot grow and divide. Planning aims to deliver the prescribed dose to the intended area while limiting exposure to nearby healthy organs."),
  ul([
    "Reduce recurrence risk in the breast after lumpectomy",
    "Treat the chest wall after mastectomy in selected patients",
    "Treat nearby lymph node regions when indicated",
    "Treat a specific area where cancer has spread",
    "Relieve pain or other symptoms in selected situations",
  ]),
  p("Radiation is often combined with surgery, chemotherapy, [hormone therapy](" + HT_BLOG + ") or [targeted treatment](" + TARGETED_BLOG + "). It does not replace chemotherapy when systemic treatment is needed."),

  h2("When is radiation therapy required for breast cancer?"),
  h3("Radiation after lumpectomy"),
  p("Radiation is commonly recommended after breast-conserving surgery. [Lumpectomy](" + LUMPECTOMY + ") removes the tumour with a rim of tissue; radiation treats remaining breast tissue to lower the chance of cancer returning in the same breast."),
  h3("Radiation after mastectomy"),
  p("Not every patient needs radiation after [mastectomy](" + MASTECTOMY + "). Post-mastectomy radiation may be advised when recurrence risk in the chest wall or nodes is higher — for example larger tumours, multiple involved nodes, skin or chest-wall involvement, close or positive margins, or selected responses after neoadjuvant treatment."),
  h3("Radiation for lymph node involvement"),
  p("When nodes are involved, radiation may cover axillary, supraclavicular or internal mammary regions as determined by the radiation oncologist."),
  h3("Radiation for metastatic breast cancer"),
  p("For metastatic disease, radiation may control symptoms such as bone pain or treat selected brain or spine sites alongside systemic therapy."),
  btn("Request a second opinion on whether radiation is indicated", consult("Breast Cancer Radiation Second Opinion")),

  h2("What are the different types of breast cancer radiation therapy?"),
  h3("External beam radiation therapy (EBRT)"),
  p("EBRT is the most common approach. A linear accelerator directs shaped beams at the breast, chest wall, tumour bed or nodes. Patients do not become radioactive after standard EBRT. See [external beam radiotherapy in India](" + TX_EBRT + ")."),
  h3("Whole-breast radiation therapy"),
  p("Whole-breast radiation treats remaining breast tissue after conservation. Some patients also receive a boost dose to the tumour bed."),
  h3("Partial breast irradiation"),
  p("Selected patients with favourable features may receive radiation only around the tumour bed. Eligibility depends on size, margins, nodes, age and biology."),
  h3("Chest wall radiation"),
  p("After mastectomy, chest-wall radiation targets the surgical area and may include nodes when risk justifies treatment."),
  h3("Brachytherapy"),
  p("[Brachytherapy](" + TX_BRACHY + ") places a radiation source temporarily close to the tumour bed for selected partial-breast plans. It needs specialist equipment and expertise."),

  h2("What are IMRT, IGRT, VMAT and 3D-CRT?"),
  ul([
    "**3D-CRT:** Shapes beams around the target using imaging and computer planning.",
    "**IMRT:** Varies beam intensity to sculpt dose and reduce nearby-organ exposure when appropriate — GAF planning **$6,500–$14,500** on the [IMRT](" + IMRT + ") sheet.",
    "**IGRT:** Uses imaging during treatment to verify position — GAF planning **$7,200–$16,000** on the [IGRT](" + IGRT + ") sheet.",
    "**VMAT:** Delivers radiation while the machine rotates, changing shape and intensity during the arc.",
  ]),
  p("A more advanced machine name is not automatically better. Ask why a technique is recommended for your anatomy and dose goals."),

  h2("What is DIBH radiation therapy for breast cancer?"),
  p("Deep inspiration breath hold (DIBH) may be used for selected left-sided breast plans. Holding a deep breath can move the heart farther from the chest wall and help reduce cardiac dose."),
  p("It is not required for everyone. Suitability depends on anatomy, the plan and the patient's ability to perform the breathing technique."),
  img("/uploads/articles/breast-cancer-radiation-dibh-heart.webp", "Woman practicing deep inspiration breath hold beside a circular diagram of heart and expanded lungs for left-sided breast radiation protection", "DIBH can help reduce heart exposure during selected left-sided breast radiation plans."),

  h2("How many radiation sessions are required for breast cancer?"),
  p("Radiation is delivered in fractions. Common schedules include:"),
  { id: id("html"), type: "html", html: scheduleTable },
  p("These are examples, not universal prescriptions. Hypofractionation uses a larger dose per visit with fewer sessions. Some carefully selected patients may complete whole-breast treatment in five fractions, but lymph-node or complex fields often need longer courses."),
  p("[WhatsApp GAF if you need help comparing fraction schedules before travel](" + wa("I need guidance on breast cancer radiation session numbers and hypofractionation options in India.") + ")"),

  h2("What happens during radiation therapy planning?"),
  ol([
    "**Consultation:** The radiation oncologist reviews diagnosis, surgery, pathology, prior treatment and imaging.",
    "**CT simulation:** A CT scan in the treatment position maps the target and organs at risk.",
    "**Positioning:** Supports and small skin marks help reproduce the same setup each day.",
    "**Planning:** Dose, fractions, technique and organ constraints are calculated.",
    "**Verification:** The plan is checked before the first treatment session.",
  ]),
  img("/uploads/articles/breast-cancer-radiation-linac-session.webp", "Woman lying on a linear accelerator treatment couch during a breast cancer external beam radiation session", "Daily external beam sessions are usually outpatient and take only a few minutes of beam time."),

  h2("What happens during a daily radiation session?"),
  p("Most EBRT is outpatient. The team positions the patient, verifies alignment, delivers the beam and the patient can usually leave afterwards. Beam-on time is often only a few minutes; positioning takes longer. The delivery itself is generally painless."),

  h2("Does radiation therapy hurt?"),
  p("Patients do not feel the radiation during delivery. Side effects such as skin redness, dryness, itching, breast tenderness, swelling and fatigue may build gradually over the course."),

  h2("What are the side effects of breast cancer radiation therapy?"),
  ul([
    "**Skin:** Redness, dryness, itching, darkening; sometimes peeling or soreness near the end of treatment.",
    "**Breast changes:** Swelling, tenderness, later firmness or fibrosis in some patients.",
    "**Fatigue:** Often increases toward the end of the course.",
    "**Hair:** Usually not whole-scalp loss; may thin in a small field such as near the axilla.",
    "**Lymphoedema:** Risk rises when nodes are irradiated after node surgery — see [lymphedema after breast cancer treatment](" + LYMPH + ").",
    "**Lung / heart:** Occasional pneumonitis; left-sided plans need careful cardiac sparing, including DIBH when appropriate.",
  ]),
  p("More detail sits on [breast cancer radiation side effects](" + RAD_SIDEFX + ")."),
  img("/uploads/articles/breast-cancer-radiation-skin-recovery.webp", "Woman resting during recovery beside a circular diagram representing gentle healing of radiation-treated breast skin", "Skin reactions often peak near the end of treatment and settle over following weeks with guided care."),
  btn("Ask about side-effect support during radiation", consult("Breast Cancer Radiation Side Effects")),

  h2("How should patients care for their skin during radiation therapy?"),
  ul([
    "Wash gently with lukewarm water; avoid scrubbing",
    "Use only creams approved by the radiation team",
    "Wear loose clothing; avoid tight bras that rub",
    "Protect treated skin from direct sun",
    "Avoid perfumes, harsh products, hot packs on the field",
    "Report painful, wet, blistered or broken skin promptly",
  ]),

  h2("Can patients continue normal activities during radiation therapy?"),
  p("Many patients continue usual activities between outpatient sessions. Fatigue and skin irritation may increase later in the course. Rest, hydration, gentle activity and attending every scheduled fraction matter."),

  h2("When does radiation therapy start after breast cancer surgery?"),
  p("Radiation usually starts after adequate wound healing. When chemotherapy is planned, radiation often follows chemotherapy. Hormone therapy and some targeted medicines may continue during radiation under specialist guidance. Do not change the sequence without the oncology team."),

  h2("Can radiation therapy be given after mastectomy and breast reconstruction?"),
  p("Yes, when indicated — but radiation can affect reconstructed tissue (firmness, skin changes, implant complications, shape change, healing issues). Surgeons, plastic surgeons and radiation oncologists should discuss likely radiation need before reconstruction whenever possible."),

  h2("Breast cancer radiation therapy cost in India"),
  p("Cost varies with technique, fraction number, treatment area and hospital. Use GAF partner planning ranges — not invented rupee estimates — when comparing pathways:"),
  { id: id("html"), type: "html", html: costTable },
  p("Ask for a written estimate covering consultation, CT simulation, planning, dosimetry and QA, delivery, image guidance, boost or nodal fields, follow-up and skin-care visits if billed separately. Wider context sits on [breast cancer treatment cost in India](" + COST_BLOG + ")."),
  btn("Request a written radiation-course estimate", consult("Breast Cancer Radiation Cost Estimate")),

  h2("Breast cancer radiation therapy in India for international patients"),
  p("Patients from Tanzania, Kenya, Uganda, Ethiopia, Zambia, Iraq, Oman and other countries often combine India-based radiation with broader breast cancer care. Share biopsy and histopathology, ER/PR/HER2, operation notes, final pathology, prior chemo, imaging and any previous radiation records."),
  p("Stay length follows the fraction schedule — short-course plans need less time than longer courses. City filters for [Delhi NCR](" + DELHI + "), [Mumbai](" + MUMBAI + "), [Bengaluru](" + BLR + "), [Chennai](" + CHN + ") and [Hyderabad](" + HYD + ") radiation oncologists help shortlist campuses. Practical sequencing is covered in [international patient guidance](" + INTL + ")."),
  p("If care continues abroad, obtain complete dose, field and remaining-fraction records before leaving. Transferring mid-course needs formal coordination between radiation oncologists."),
  btn("Start an international radiation records review", consult("Breast Cancer Treatment in India")),

  h2("How to choose a radiation oncology hospital in India"),
  ul([
    "Radiation oncologist experience with breast cancer cases",
    "Suitable linear accelerator and planning systems",
    "CT simulation, image guidance and quality assurance",
    "Heart and lung protection strategies for left-sided disease",
    "DIBH availability when appropriate",
    "Coordination with breast surgery and medical oncology",
    "Transparent full-course cost estimates",
  ]),

  h2("Questions to ask your radiation oncologist"),
  ol([
    "Why is radiation recommended in my case?",
    "Which area will receive radiation?",
    "Will the whole breast or only part of it be treated?",
    "Do I need radiation to the chest wall after mastectomy?",
    "Will nearby lymph nodes be included?",
    "How many sessions are planned?",
    "Am I suitable for a shorter radiation schedule?",
    "Is IMRT, VMAT or another technique appropriate?",
    "Would DIBH help protect my heart?",
    "What side effects should I expect?",
    "How should I care for my skin?",
    "Can I continue working during treatment?",
    "What is the total estimated cost?",
    "How will my treatment records be provided after completion?",
  ]),

  h2("Frequently asked questions about breast cancer radiation therapy in India"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Conclusion"),
  p("Radiation therapy is an important part of breast cancer treatment for many patients, especially after breast-conserving surgery. It may also follow mastectomy or help control symptoms when cancer has spread."),
  p("Modern planning targets the breast, chest wall and selected nodes while limiting exposure to nearby organs. Session numbers vary from short hypofractionated courses to longer schedules. A personalised radiation-oncology assessment is essential."),
  btn("Discuss the next radiation step with GAF Healthcare", consult("Breast Cancer Radiation Therapy")),

  h2("Sources and references"),
  ol([
    "[National Cancer Institute — Radiation for Breast Cancer](https://www.cancer.gov/types/breast/treatment/radiation)",
    "[American Cancer Society — Radiation for Breast Cancer](https://www.cancer.org/cancer/types/breast-cancer/treatment/radiation-for-breast-cancer.html)",
    "[ICMR Standard Treatment Workflow for Breast Cancer](https://www.icmr.gov.in/icmrobject/custom_data/pdf/downloadable-books/STW_Vol_3_2022.pdf)",
    "[NCCN Guidelines for Patients — Invasive Breast Cancer](https://vicc.org/sites/default/files/2026-09/breast-invasive-patient.pdf)",
    "[National Cancer Institute — Breast Cancer Treatment (PDQ)](https://www.cancer.gov/types/breast/hp/breast-treatment-pdq)",
    "[American College of Surgeons — Radiation Therapy After Breast Cancer Surgery](https://www.facs.org/for-patients/the-day-of-your-surgery/breast-cancer-surgery/self-care-and-therapy/radiation-therapy/)",
    "[National Breast Cancer Foundation — Breast Cancer Radiation Therapy](https://www.nationalbreastcancer.org/breast-cancer-radiation-therapy/)",
  ]),
  p("*Medical disclaimer: This article is for educational purposes and does not replace an individual consultation with a radiation oncologist. The need for radiation, treatment area, dose, technique and number of sessions must be determined from the patient's diagnosis, surgery, pathology and overall treatment plan. GAF cost figures are partner planning ranges, not fixed hospital quotations.*"),

  h2("Related Reading on GAF Healthcare"),
  ul(RELATED.map(([label, href]) => `[${label}](${href})`)),
];

const now = "2026-11-12T14:20:00.000Z";
const article = {
  id: "art_breast_cancer_radiation_therapy_in_india",
  slug: SLUG,
  title: "Breast Cancer Radiation Therapy in India: Types, Number of Sessions, Side Effects and Cost",
  excerpt:
    "Radiation therapy uses carefully planned radiation to destroy cancer cells in the breast, chest wall or nearby lymph nodes. This guide explains when it is recommended, different radiation techniques, treatment duration, side effects, cost and what international patients should know before travelling to India.",
  date: "12 Nov 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare Editorial",
  category: "Radiation Oncology",
  tags: [
    "breast cancer",
    "radiation therapy",
    "radiotherapy",
    "IMRT",
    "DIBH",
    "India",
    "cost",
  ],
  image: "/uploads/articles/breast-cancer-radiation-planning-overview.webp",
  imageAlt:
    "Woman on a CT simulation couch beside a circular diagram of conformal radiation beams targeting breast tissue while sparing nearby organs",
  status: "published",
  featured: false,
  seoTitle: "Breast Cancer Radiation Therapy in India: Cost, Sessions and Side Effects",
  seoDescription:
    "Learn about breast cancer radiation therapy in India, including IMRT, IGRT, DIBH, treatment sessions, side effects, recovery and cost.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/breast-cancer-radiation-planning-overview.webp",
  allowIndex: true,
  keywords: [
    "Breast cancer radiation therapy in India",
    "Radiation therapy for breast cancer",
    "Breast cancer radiotherapy cost in India",
    "Breast cancer radiation treatment",
    "How many radiation sessions are needed for breast cancer",
    "Radiation after lumpectomy",
    "Radiation after mastectomy",
    "IMRT for breast cancer",
    "DIBH radiation therapy",
    "Side effects of breast cancer radiation",
    "Radiation oncology hospitals in India",
  ],
  relatedLinks: RELATED.map(([label, href]) => ({ label, href })),
  blocks,
};

if (!store.categories.includes("Radiation Oncology")) store.categories.push("Radiation Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["breast-cancer-radiation-planning-overview.webp", article.imageAlt],
  [
    "breast-cancer-radiation-dibh-heart.webp",
    "Woman practicing deep inspiration breath hold beside a circular diagram of heart and expanded lungs for left-sided breast radiation protection",
  ],
  [
    "breast-cancer-radiation-linac-session.webp",
    "Woman lying on a linear accelerator treatment couch during a breast cancer external beam radiation session",
  ],
  [
    "breast-cancer-radiation-skin-recovery.webp",
    "Woman resting during recovery beside a circular diagram representing gentle healing of radiation-treated breast skin",
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
    "and [hormone therapy for breast cancer in India](https://gaf.healthcare/blogs/hormone-therapy-for-breast-cancer-in-india).";
  if (llms.includes(needle)) {
    llms = llms.replace(
      needle,
      ", [hormone therapy for breast cancer in India](https://gaf.healthcare/blogs/hormone-therapy-for-breast-cancer-in-india) and [breast cancer radiation therapy in India](https://gaf.healthcare/blogs/breast-cancer-radiation-therapy-in-india).",
    );
  } else {
    llms = llms.replace(
      "- [Blogs](https://gaf.healthcare/blogs):",
      `- [Blogs](https://gaf.healthcare/blogs): includes [breast cancer radiation therapy in India](https://gaf.healthcare/blogs/breast-cancer-radiation-therapy-in-india).`,
    );
  }
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

for (const relatedSlug of [
  "radiation-therapy-for-breast-cancer",
  "breast-cancer-radiation-side-effects",
  "hormone-therapy-for-breast-cancer-in-india",
  "breast-cancer-treatment-cost-in-india",
  "breast-cancer-surgery-in-india",
]) {
  const related = store.articles.find((row) => row.slug === relatedSlug);
  if (!related) continue;
  const href = `/blogs/${SLUG}`;
  related.relatedLinks = related.relatedLinks || [];
  if (!related.relatedLinks.some((row) => row.href === href)) {
    related.relatedLinks.push({ label: "Breast cancer radiation therapy in India", href });
  }
  for (let i = 0; i < related.blocks.length; i++) {
    if (related.blocks[i].type === "heading" && /Related Reading/i.test(related.blocks[i].text || "")) {
      for (let j = i + 1; j < Math.min(i + 5, related.blocks.length); j++) {
        if (related.blocks[j].type === "list" && !related.blocks[j].items.some((item) => item.includes(href))) {
          related.blocks[j].items.push(`[Breast Cancer Radiation Therapy in India](${href})`);
        }
      }
      break;
    }
  }
}
writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("linked from related breast articles");
