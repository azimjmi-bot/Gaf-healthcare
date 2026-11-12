#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const SLUG = "hormone-therapy-for-breast-cancer-in-india";
const HORMONE = "/costs/India/Medical-Oncology/Hormone-Therapy";
const TARGETED = "/costs/India/Medical-Oncology/Targeted-Therapy";
const CHEMO = "/costs/India/Medical-Oncology/Chemotherapy";
const NEOADJ = "/costs/India/Medical-Oncology/Neoadjuvant-Chemotherapy";
const ADJ = "/costs/India/Medical-Oncology/Adjuvant-Chemotherapy";
const TX_HORMONE = "/treatments/hormone-therapy-in-india";
const TX_BREAST = "/treatments/breast-cancer-treatment-in-india";
const TX_TARGETED = "/treatments/targeted-therapy-in-india";
const EXISTING_HT = "/blogs/hormone-therapy-breast-cancer-india";
const HT_SIDEFX = "/blogs/breast-cancer-hormone-therapy-side-effects";
const TARGETED_BLOG = "/blogs/targeted-therapy-for-breast-cancer-in-india";
const HER2_BLOG = "/blogs/her2-positive-breast-cancer-treatment-india";
const ERPR = "/blogs/er-pr-her2-breast-cancer-treatment-india";
const CHEMO_BLOG = "/blogs/chemotherapy-for-breast-cancer-in-india";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const RAD = "/blogs/radiation-therapy-for-breast-cancer";
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

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>Who needs hormone therapy?</strong></td><td>Most patients with ER-positive and/or PR-positive breast cancer — see <a href="${ERPR}">ER, PR and HER2 results</a></td></tr><tr><td><strong>Common tablets</strong></td><td>Tamoxifen; aromatase inhibitors letrozole, anastrozole and exemestane</td></tr><tr><td><strong>Premenopausal options</strong></td><td>Tamoxifen ± ovarian suppression; AI only with ovarian suppression</td></tr><tr><td><strong>Typical duration</strong></td><td>At least 5 years; selected higher-risk patients may continue up to 10 years</td></tr><tr><td><strong>Key monitoring</strong></td><td>Side effects, adherence, menopausal status and bone health when oestrogen is lowered</td></tr><tr><td><strong>GAF hormone therapy planning range</strong></td><td><a href="${HORMONE}">$1,000–$4,500</a> · outpatient · often years of tablets</td></tr><tr><td><strong>If CDK4/6 inhibitors are added</strong></td><td>See <a href="${TARGETED}">targeted therapy</a> ($8,000–$30,000) and the <a href="${TARGETED_BLOG}">targeted therapy guide</a></td></tr><tr><td><strong>Chemotherapy when sequenced</strong></td><td><a href="${CHEMO}">$1,500–$8,000+</a> · outpatient cycles</td></tr><tr><td><strong>International patients</strong></td><td>Oral endocrine therapy often continues at home after a documented India plan</td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>Hormone therapy for breast cancer in India</strong> is endocrine treatment for hormone receptor-positive disease. It blocks hormone effects or reduces oestrogen production. GAF planning for <a href="${HORMONE}">hormone therapy</a> is <strong>$1,000–$4,500</strong> (outpatient · often years of tablets). These are partner planning ranges, not hospital quotations.</p><p class="article-quick-answer__body"><strong>Important:</strong> Hormone therapy for breast cancer is not hormone replacement therapy. GAF Healthcare does not prescribe endocrine medicines; treatment decisions remain with a qualified medical oncologist.</p></aside>`;

const compareTable = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Tamoxifen</th><th>Aromatase inhibitors</th></tr></thead><tbody><tr><td>Common medicines</td><td>Tamoxifen</td><td>Letrozole, anastrozole, exemestane</td></tr><tr><td>Main action</td><td>Blocks oestrogen receptors in breast tissue</td><td>Reduces oestrogen production</td></tr><tr><td>Common use</td><td>Premenopausal and selected postmenopausal patients</td><td>Mainly postmenopausal patients</td></tr><tr><td>Bone health</td><td>May preserve bone density after menopause, but effects vary</td><td>Can reduce bone density</td></tr><tr><td>Common side effects</td><td>Hot flashes, menstrual changes, vaginal symptoms</td><td>Joint pain, stiffness, hot flashes, bone loss</td></tr><tr><td>Important risks</td><td>Blood clots and uterine lining changes</td><td>Osteoporosis and fractures in susceptible patients</td></tr></tbody></table></div>`;

const ovarianTable = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Medical ovarian suppression</th><th>Surgical ovarian removal</th></tr></thead><tbody><tr><td>Method</td><td>Hormone-suppressing injections</td><td>Operation to remove both ovaries</td></tr><tr><td>Effect</td><td>Usually temporary and reversible after stopping, although recovery varies</td><td>Permanent</td></tr><tr><td>Treatment frequency</td><td>Repeated injections</td><td>One surgical procedure</td></tr><tr><td>Fertility</td><td>Ovarian function may recover after treatment, but this is not guaranteed</td><td>Natural ovarian fertility is permanently lost</td></tr><tr><td>Menopause</td><td>Can cause temporary menopause-like symptoms</td><td>Causes permanent surgical menopause</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Named pathway</th><th>GAF planning range in India</th><th>Typical stay / schedule</th></tr></thead><tbody><tr><td><a href="${HORMONE}">Hormone therapy</a></td><td>$1,000–$4,500</td><td>Outpatient · often years of tablets</td></tr><tr><td><a href="${TARGETED}">Targeted therapy</a> (e.g. CDK4/6 combinations in selected metastatic settings)</td><td>$8,000–$30,000</td><td>Oral or infusion · months of therapy</td></tr><tr><td><a href="${CHEMO}">Chemotherapy</a></td><td>$1,500–$8,000+</td><td>Outpatient cycles · 3–6 months typical</td></tr><tr><td><a href="${NEOADJ}">Neoadjuvant chemotherapy</a></td><td>$2,500–$10,000</td><td>Cycles before surgery · 2–4 months</td></tr><tr><td><a href="${ADJ}">Adjuvant chemotherapy</a></td><td>$2,500–$10,000</td><td>Cycles after surgery · 3–6 months</td></tr></tbody></table></div>`;

const costDrivers = `<div class="md-body"><table><thead><tr><th>Medicine or treatment</th><th>Main cost considerations</th></tr></thead><tbody><tr><td>Tamoxifen</td><td>Tablet strength, brand and monthly supply</td></tr><tr><td>Letrozole</td><td>Brand or generic formulation and treatment duration</td></tr><tr><td>Anastrozole</td><td>Brand or generic formulation and monthly supply</td></tr><tr><td>Exemestane</td><td>Medicine brand, strength and duration</td></tr><tr><td>Goserelin / leuprolide / triptorelin</td><td>Injection strength, schedule and administration charges</td></tr><tr><td>Fulvestrant</td><td>Injection formulation, dose and administration</td></tr><tr><td>CDK4/6 inhibitors</td><td>Medicine, duration, blood tests and monitoring — see <a href="${TARGETED}">targeted therapy</a></td></tr></tbody></table></div>`;

const faqs = [
  ["What is hormone therapy for breast cancer?", "Hormone therapy is a treatment that blocks the effects of hormones or reduces their production. It is used for breast cancers that are sensitive to oestrogen or progesterone."],
  ["Does every breast cancer patient need hormone therapy?", "No. It is generally used for hormone receptor-positive breast cancer. Patients with hormone receptor-negative disease usually do not benefit from conventional endocrine treatment."],
  ["What is the most commonly used hormone therapy for breast cancer?", "Tamoxifen, letrozole, anastrozole and exemestane are commonly used medicines. The choice depends on menopausal status, cancer stage and recurrence risk."],
  ["Is tamoxifen used before or after menopause?", "Tamoxifen can be used in both premenopausal and selected postmenopausal patients."],
  ["Can a premenopausal woman take letrozole?", "An aromatase inhibitor such as letrozole should not be used alone in a woman with functioning ovaries. It may be used with ovarian suppression in selected patients."],
  ["How long does hormone therapy continue?", "Many patients receive at least five years of treatment. Selected patients at higher risk of recurrence may benefit from treatment lasting up to ten years."],
  ["Does hormone therapy cause hair loss?", "Significant hair loss is not typical in the same way as with many chemotherapy regimens. Some patients may experience hair thinning, depending on the medicine."],
  ["Does hormone therapy cause weight gain?", "Some patients report weight changes during treatment. Age, menopause, activity levels, sleep, diet and other treatments may also contribute. Discuss unexplained or significant weight changes with the medical team."],
  ["Can hormone therapy be taken with chemotherapy?", "The treatment sequence depends on the clinical plan. Adjuvant endocrine therapy is commonly started after chemotherapy when chemotherapy is required. It may be given alongside certain other treatments under specialist guidance."],
  ["Can hormone therapy be stopped after five years?", "Some patients complete treatment after five years, while others may benefit from longer treatment. The decision depends on recurrence risk, side effects and the patient's overall health."],
  ["Is hormone therapy the same as hormone replacement therapy?", "No. Hormone therapy for breast cancer blocks hormone activity or reduces hormone production. Hormone replacement therapy is used to treat hormonal symptoms and requires special caution in patients with hormone-sensitive breast cancer."],
  ["What is the cost of hormone therapy in India?", "GAF planning for hormone therapy is $1,000–$4,500. Exact expense depends on the prescribed medicine, brand, treatment duration and whether injections or additional monitoring are required."],
  ["Can international patients continue hormone therapy after returning home?", "In many cases, oral hormone therapy can be continued under the supervision of a local oncologist. Patients should carry a detailed treatment summary and follow-up plan."],
  ["What is ovarian suppression?", "Ovarian suppression reduces ovarian oestrogen production using injections, surgery or rarely radiation. It may be added for selected higher-risk premenopausal patients."],
  ["Why is bone health important on aromatase inhibitors?", "Lowering oestrogen can reduce bone density. DEXA scanning, lifestyle measures and bone-protective medicines may be recommended for selected patients."],
  ["What should I do if I miss doses?", "Follow the medicine instructions and ask the doctor or pharmacist. Do not double doses unless specifically instructed. Persistent side effects need a medical review rather than silent discontinuation."],
];

const RELATED = [
  ["Hormone therapy in India", TX_HORMONE],
  ["Hormone therapy overview (existing guide)", EXISTING_HT],
  ["Hormone therapy side effects", HT_SIDEFX],
  ["Targeted therapy for breast cancer", TARGETED_BLOG],
  ["ER, PR and HER2 results", ERPR],
  ["HER2-positive treatment", HER2_BLOG],
  ["Chemotherapy for breast cancer", CHEMO_BLOG],
  ["Breast cancer surgery in India", SURGERY],
  ["Radiation therapy for breast cancer", RAD],
  ["Breast cancer diagnosis tests", DIAG],
  ["Breast cancer stages", STAGES],
  ["Breast cancer treatment options", OPTIONS],
  ["Breast cancer treatment cost in India", COST_BLOG],
  ["International patients", INTL],
  ["Breast cancer treatment in India", TX_BREAST],
  ["Targeted therapy in India", TX_TARGETED],
  ["Hormone therapy cost sheet", HORMONE],
  ["Medical oncology doctors", MED_DOCS],
  ["Medical oncology hospitals", MED_HOSP],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("After a breast cancer diagnosis, patients often hear doctors discuss hormone receptor testing. If the cancer is hormone receptor-positive, the oncologist may recommend **hormone therapy** as part of the treatment plan."),
  p("Unlike chemotherapy, which uses medicines to destroy rapidly dividing cells, hormone therapy works by blocking the effects of hormones or reducing the body's hormone production. For many patients it is an important part of long-term treatment after [surgery](" + SURGERY + "), and it can also help control selected advanced hormone receptor-positive cancers."),
  p("Common medicines include tamoxifen, letrozole, anastrozole and exemestane. Some premenopausal patients may also need ovarian suppression. Treatment can continue for five years or longer, depending on recurrence risk and tolerance."),
  p("GAF planning for [hormone therapy](" + HORMONE + ") is **$1,000–$4,500** (outpatient · often years of tablets). Related reading includes the existing [hormone therapy overview](" + EXISTING_HT + "), [hormone therapy side effects](" + HT_SIDEFX + "), [ER, PR and HER2 results](" + ERPR + ") and [targeted therapy for breast cancer](" + TARGETED_BLOG + ") when CDK4/6 inhibitors are considered."),
  p("Named [medical oncologists](" + MED_DOCS + ") and [medical oncology hospitals](" + MED_HOSP + ") can be filtered by city before travel."),
  btn("Ask GAF to review ER/PR reports for endocrine planning", consult("Hormone Therapy for Breast Cancer")),
  p("[WhatsApp +91 90443 46292 with receptor reports and current medicines](" + wa("Please review my breast cancer ER/PR/HER2 reports and advise on hormone therapy options and duration in India.") + ")"),
  img("/uploads/articles/hormone-therapy-breast-receptor-overview.webp", "Woman beside a circular diagram of estrogen receptors on a breast cancer cell membrane with hormone molecules approaching", "Hormone receptor-positive cancers use oestrogen or progesterone signalling to grow."),

  h2("What is hormone therapy for breast cancer?"),
  p("Hormone therapy, also called endocrine therapy, treats breast cancers that depend on hormones such as oestrogen or progesterone to grow. It works by blocking the effect of hormones on cancer cells or reducing the amount of oestrogen available to stimulate hormone-sensitive cells."),
  p("It can help reduce recurrence risk after surgery and may slow or control hormone receptor-positive disease that has spread. It is **not** hormone replacement therapy used for menopausal symptoms. Patients with hormone-sensitive breast cancer should discuss any hormonal treatment with their oncologist."),

  h2("Which breast cancer patients need hormone therapy?"),
  p("Hormone therapy is generally considered when pathology shows ER-positive and/or PR-positive disease. The report usually also includes HER2 status, tumour grade and other findings — explained further in the [diagnosis guide](" + DIAG + ") and [ER, PR and HER2 guide](" + ERPR + ")."),
  h3("What does ER-positive and PR-positive mean?"),
  p("ER-positive cancers have oestrogen receptors that can respond to oestrogen. PR-positive cancers have progesterone receptors. Together these results guide endocrine treatment selection."),
  h3("What if the cancer is also HER2-positive?"),
  p("Some tumours are both hormone receptor-positive and HER2-positive. Treatment may combine surgery, chemotherapy, HER2-targeted medicines, radiation and hormone therapy. See [HER2-positive breast cancer treatment](" + HER2_BLOG + ") for the HER2 pathway."),
  h3("Does triple-negative breast cancer respond to hormone therapy?"),
  p("Triple-negative breast cancer is negative for ER, PR and HER2. Conventional endocrine therapy is generally not effective. Other treatments such as chemotherapy and selected immunotherapy may be considered instead."),
  btn("Request a second opinion on endocrine eligibility", consult("Breast Cancer Hormone Therapy Second Opinion")),

  h2("How does hormone therapy work?"),
  p("Endocrine medicines reduce the ability of hormone-sensitive cancer cells to use oestrogen, or reduce the body's oestrogen production. Main groups include selective oestrogen receptor modulators (SERMs), aromatase inhibitors (AIs), ovarian function suppression and, in certain advanced settings, selective oestrogen receptor degraders (SERDs)."),
  p("Choice depends on menopausal status, stage, previous treatment, recurrence risk and other medical factors. Broader sequencing sits on [breast cancer treatment options](" + OPTIONS + ") and [breast cancer stages](" + STAGES + ")."),

  h2("Tamoxifen for breast cancer"),
  p("Tamoxifen blocks the effect of oestrogen in breast tissue. It may be prescribed for premenopausal women, selected postmenopausal women, patients who cannot take an aromatase inhibitor, and certain advanced hormone receptor-positive settings."),
  p("A common initial duration is five years; some patients continue up to ten years. Selected patients may later switch to an aromatase inhibitor after menopause."),
  ul(["Hot flashes and night sweats", "Vaginal discharge or dryness", "Menstrual changes, mood changes, fatigue", "Important risks: blood clots and uterine lining changes — report unusual bleeding, leg swelling, sudden chest pain or unexplained breathlessness promptly"]),
  img("/uploads/articles/hormone-therapy-breast-tamoxifen-ai.webp", "Woman with oral endocrine tablets beside a circular diagram comparing receptor blockade and aromatase inhibition", "Tamoxifen and aromatase inhibitors reduce hormone-driven growth through different mechanisms."),

  h2("Aromatase inhibitors for breast cancer"),
  p("Aromatase inhibitors reduce oestrogen production and are commonly used in postmenopausal patients. The three commonly used medicines are **letrozole**, **anastrozole** and **exemestane**."),
  ul([
    "**Letrozole:** Blocks aromatase; joint pain, hot flashes, fatigue and bone thinning are recognised issues.",
    "**Anastrozole:** Used for several years as adjuvant treatment in many postmenopausal plans; joint stiffness and reduced bone density need attention.",
    "**Exemestane:** A steroidal aromatase inhibitor sometimes used after tamoxifen or within another endocrine sequence.",
  ]),
  h3("Tamoxifen vs aromatase inhibitors"),
  { id: id("html"), type: "html", html: compareTable },

  h2("Why does menopausal status matter?"),
  p("Before menopause the ovaries are a major oestrogen source. After menopause, aromatase activity in other tissues continues to produce smaller amounts of oestrogen. That difference drives medicine choice."),
  h3("Premenopausal options"),
  ul(["Tamoxifen alone", "Tamoxifen with ovarian suppression", "An aromatase inhibitor with ovarian suppression"]),
  p("Aromatase inhibitors should **not** be used alone while ovaries are still functioning."),
  h3("Postmenopausal options"),
  ul(["Letrozole, anastrozole or exemestane", "Tamoxifen in selected circumstances", "Sequential tamoxifen and aromatase-inhibitor plans"]),

  h2("What is ovarian suppression in breast cancer treatment?"),
  p("Ovarian suppression reduces or stops ovarian oestrogen production for selected higher-risk premenopausal patients. It may be combined with tamoxifen or an aromatase inhibitor."),
  ul([
    "**Medical suppression:** GnRH agonists such as goserelin, leuprolide or triptorelin by injection.",
    "**Surgical removal:** Bilateral oophorectomy — permanent and irreversible for natural ovarian fertility.",
    "**Radiation suppression:** Less commonly selected in modern practice.",
  ]),
  p("It is not necessary for every premenopausal patient. Factors include age, nodes, grade and other high-risk features."),
  img("/uploads/articles/hormone-therapy-breast-ovarian-suppression.webp", "Young woman in clinic consultation beside a circular non-graphic diagram representing ovarian hormone suppression", "Ovarian suppression lowers oestrogen production in selected premenopausal treatment plans."),
  h3("Medical suppression vs ovarian removal"),
  { id: id("html"), type: "html", html: ovarianTable },
  p("Patients who may want children should discuss fertility preservation before starting treatment."),
  p("[WhatsApp GAF if you need help coordinating fertility and endocrine questions before travel](" + wa("I need guidance on ovarian suppression versus tamoxifen for hormone receptor-positive breast cancer treatment planning in India.") + ")"),

  h2("How long does hormone therapy continue?"),
  p("For many early-stage hormone receptor-positive cancers, treatment lasts at least five years. Selected higher-risk patients may benefit from continuing up to ten years because late recurrence remains possible."),
  p("Extended therapy is not automatically better for everyone. Tumour size, nodes, grade, receptor expression, menopausal status, bone health, side effects, age and comorbidities all matter."),

  h2("Can patients switch from tamoxifen to an aromatase inhibitor?"),
  p("Yes, in selected plans — for example tamoxifen for two to three years then an aromatase inhibitor, the reverse sequence, or tamoxifen for five years followed by an aromatase inhibitor. Patients should not switch independently."),

  h2("Hormone therapy for advanced or metastatic breast cancer"),
  p("In selected hormone receptor-positive advanced disease, endocrine therapy aims to control cancer, relieve symptoms and maintain quality of life. For many HR-positive, HER2-negative metastatic cases, endocrine therapy may be combined with a CDK4/6 inhibitor (palbociclib, ribociclib or abemaciclib)."),
  p("Those targeted medicines are covered in the [targeted therapy for breast cancer guide](" + TARGETED_BLOG + ") and the [targeted therapy cost sheet](" + TARGETED + "). Other options may include fulvestrant, everolimus in selected settings, other targeted medicines or chemotherapy when indicated."),

  h2("What is fulvestrant?"),
  p("Fulvestrant is a selective oestrogen receptor degrader given by injection in certain advanced hormone receptor-positive settings, alone or with selected targeted medicines. It is not the same as tamoxifen or an aromatase inhibitor."),

  h2("What are the side effects of hormone therapy?"),
  p("Endocrine therapy usually does not cause the same hair loss, nausea or blood-count drops associated with many [chemotherapy](" + CHEMO_BLOG + ") regimens, but long-term symptoms can affect daily life."),
  ul([
    "**Common:** Hot flashes, night sweats, joint pain, muscle stiffness, fatigue, sleep disturbance, mood changes, vaginal dryness, reduced sexual interest, menstrual changes.",
    "**Tamoxifen risks:** Blood clots, uncommon stroke risk, uterine lining changes and a small increased endometrial-cancer risk in older women — unusual bleeding needs investigation.",
    "**Aromatase inhibitors:** Joint pain, bone thinning, osteoporosis, fracture risk, hot flashes and vaginal dryness.",
    "**Ovarian suppression:** Menopause-like symptoms and bone-density loss.",
  ]),
  p("More detail sits on [hormone therapy side effects](" + HT_SIDEFX + ")."),

  h2("How can patients manage hormone therapy side effects?"),
  p("Do not stop endocrine therapy without speaking to the oncologist. Supportive care, switching medicines or adjusting the plan may help."),
  ul([
    "**Hot flashes:** Comfortable clothing, trigger awareness and medical review of persistent symptoms.",
    "**Joint pain:** Gentle exercise, stretching and appropriate pain management.",
    "**Bone health:** Weight-bearing activity, nutrition and density assessment.",
    "**Vaginal dryness:** Non-hormonal moisturisers or lubricants after medical advice.",
    "**Mood or sleep problems:** Tell the team if symptoms affect daily life.",
  ]),
  p("Do not start supplements, herbal products or hormonal preparations without checking with the oncologist."),

  h2("Bone health during hormone therapy"),
  p("Bone health is especially important on aromatase inhibitors or ovarian suppression. Monitoring may include DEXA scanning, fracture-risk assessment, calcium and vitamin D review when appropriate, activity advice and bone-protective medicines such as bisphosphonates or denosumab in selected cases."),
  img("/uploads/articles/hormone-therapy-breast-bone-monitoring.webp", "Woman walking outdoors beside a circular diagram representing bone density structure and monitoring", "Bone density monitoring helps manage long-term aromatase-inhibitor and ovarian-suppression plans."),
  btn("Ask about bone-health planning with endocrine therapy", consult("Hormone Therapy Bone Health")),

  h2("What happens if a patient misses hormone therapy doses?"),
  p("Occasional missed doses happen, but repeated gaps reduce adherence. Follow the medicine instructions and ask what to do after a missed dose. Do not take extra tablets to compensate unless specifically instructed. If side effects are the barrier, discuss alternatives rather than stopping silently."),

  h2("Hormone therapy cost in India"),
  p("Cost depends on medicine, brand, dosage, duration and whether injections or extra monitoring are required. Many endocrine medicines have generic formulations that can make long-term treatment more affordable than some injectable or targeted regimens — but there is no single price for every plan."),
  { id: id("html"), type: "html", html: costTable },
  p("These GAF figures are partner planning ranges from the live cost sheets — not hospital quotations. Wider pathway context sits on [breast cancer treatment cost in India](" + COST_BLOG + ")."),
  { id: id("html"), type: "html", html: costDrivers },
  ul([
    "Ask whether an appropriate generic is available",
    "Confirm exact strength and expected duration",
    "Include consultations, DEXA, injections and side-effect care in estimates",
    "Do not substitute medicines based only on price",
  ]),
  btn("Request a written endocrine-therapy estimate", consult("Hormone Therapy Cost Estimate")),

  h2("Hormone therapy in India for international patients"),
  p("Unlike surgery or radiation, endocrine therapy is often continued after returning home. Share biopsy and histopathology, ER/PR/HER2 results, stage, surgical pathology, prior chemo/radiation summaries, current medicines, medical history and bone-density reports when available."),
  p("Practical travel sequencing is covered in [breast cancer treatment in India for international patients](" + INTL + "). City filters for [Delhi NCR](" + DELHI_DOCS + "), [Mumbai](" + MUMBAI_DOCS + "), [Bengaluru](" + BLR_DOCS + "), [Chennai](" + CHN_DOCS + ") and [Hyderabad](" + HYD_DOCS + ") medical oncologists help shortlist campuses."),
  p("Before leaving India, obtain medicine names and doses, duration, injection schedules, monitoring needs, side-effect guidance and follow-up timing for the local oncologist."),
  btn("Start an international records review", consult("Breast Cancer Treatment in India")),

  h2("How to choose a hospital for breast cancer hormone therapy in India"),
  ul([
    "Medical oncology expertise in hormone receptor-positive disease",
    "Reliable ER/PR/HER2 pathology review",
    "Clear medicine choice and duration planning",
    "Side-effect monitoring pathways",
    "Bone-health services when aromatase inhibitors or ovarian suppression are used",
    "Long-term follow-up access after returning home",
    "Cost transparency across medicines, injections, tests and consultations",
  ]),

  h2("Questions to ask your oncologist before starting hormone therapy"),
  ol([
    "Is my breast cancer ER-positive or PR-positive?",
    "What does my receptor report mean?",
    "Why is hormone therapy recommended in my case?",
    "Should I take tamoxifen or an aromatase inhibitor?",
    "Does my menopausal status affect the choice?",
    "Do I need ovarian suppression?",
    "How long will I need to take the medicine?",
    "Could I benefit from treatment beyond five years?",
    "What side effects should I watch for?",
    "Do I need a bone density scan?",
    "Will I need regular blood tests or other monitoring?",
    "Can I continue treatment in my home country?",
    "What is the estimated monthly and long-term medicine cost?",
    "What should I do if I cannot tolerate the medicine?",
  ]),

  h2("Frequently asked questions about hormone therapy for breast cancer in India"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Conclusion"),
  p("Hormone therapy is an important part of treatment for many patients with hormone receptor-positive breast cancer. Tamoxifen, letrozole, anastrozole and exemestane help reduce the effect or production of oestrogen. Some premenopausal patients also need ovarian suppression."),
  p("Treatment commonly continues for at least five years, and selected patients may benefit from longer therapy. Side effects, bone health, menopausal status and adherence all need attention. The best plan provides appropriate cancer control while remaining manageable over time."),
  btn("Discuss the next endocrine step with GAF Healthcare", consult("Hormone Therapy for Breast Cancer")),

  h2("Sources and references"),
  ol([
    "[National Cancer Institute — Hormone Therapy for Breast Cancer](https://www.cancer.gov/types/breast/treatment/hormone-therapy)",
    "[American Cancer Society — Hormone Therapy for Breast Cancer](https://www.cancer.org/cancer/types/breast-cancer/treatment/hormone-therapy-for-breast-cancer.html)",
    "[ASCO living guideline — Hormone Receptor-Positive, HER2-Negative Stage I–III Breast Cancer](https://ascopubs.org/doi/10.1200/JCO-26-02034)",
    "[NCCN Guidelines for Patients — Invasive Breast Cancer](https://vicc.org/sites/default/files/2026-09/breast-invasive-patient.pdf)",
    "[ICMR Standard Treatment Workflow for Breast Cancer](https://www.icmr.gov.in/icmrobject/custom_data/pdf/downloadable-books/STW_Vol_3_2022.pdf)",
    "[National Cancer Institute — Breast Cancer Treatment](https://www.cancer.gov/types/breast/treatment)",
    "[American Cancer Society — Targeted Drug Therapy for Breast Cancer](https://www.cancer.org/cancer/types/breast-cancer/treatment/targeted-therapy-for-breast-cancer.html)",
  ]),
  p("*Medical disclaimer: This article is for educational purposes and does not replace consultation with a qualified medical oncologist. The choice of endocrine medicine, ovarian suppression, treatment duration and monitoring must be based on the patient's pathology, menopausal status, recurrence risk and overall health. Patients should not stop or change prescribed medicines without medical advice.*"),

  h2("Related Reading on GAF Healthcare"),
  ul(RELATED.map(([label, href]) => `[${label}](${href})`)),
];

const now = "2026-11-12T14:30:00.000Z";
const article = {
  id: "art_hormone_therapy_for_breast_cancer_in_india",
  slug: SLUG,
  title: "Hormone Therapy for Breast Cancer in India: Medicines, Duration, Side Effects and Cost",
  excerpt:
    "Hormone therapy is an important treatment for hormone receptor-positive breast cancer. This guide explains how it works, the difference between tamoxifen and aromatase inhibitors, ovarian suppression, treatment duration, side effects, monitoring and the cost of hormone therapy in India.",
  date: "12 Nov 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare Editorial",
  category: "Medical Oncology",
  tags: [
    "breast cancer",
    "hormone therapy",
    "endocrine therapy",
    "tamoxifen",
    "aromatase inhibitors",
    "India",
    "cost",
  ],
  image: "/uploads/articles/hormone-therapy-breast-receptor-overview.webp",
  imageAlt:
    "Woman beside a circular diagram of estrogen receptors on a breast cancer cell membrane with hormone molecules approaching",
  status: "published",
  featured: false,
  seoTitle: "Hormone Therapy for Breast Cancer in India: Drugs, Duration & Cost",
  seoDescription:
    "Understand hormone therapy for breast cancer in India, including tamoxifen, letrozole, anastrozole, ovarian suppression, treatment duration, side effects and cost.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/hormone-therapy-breast-receptor-overview.webp",
  allowIndex: true,
  keywords: [
    "Hormone therapy for breast cancer in India",
    "Breast cancer hormone treatment",
    "Hormone receptor-positive breast cancer",
    "Tamoxifen for breast cancer",
    "Letrozole for breast cancer",
    "Anastrozole for breast cancer",
    "Exemestane for breast cancer",
    "Aromatase inhibitors",
    "Ovarian suppression for breast cancer",
    "Hormone therapy duration for breast cancer",
    "Breast cancer hormone therapy cost in India",
    "Side effects of endocrine therapy",
  ],
  relatedLinks: RELATED.map(([label, href]) => ({ label, href })),
  blocks,
};

if (!store.categories.includes("Medical Oncology")) store.categories.push("Medical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["hormone-therapy-breast-receptor-overview.webp", article.imageAlt],
  [
    "hormone-therapy-breast-tamoxifen-ai.webp",
    "Woman with oral endocrine tablets beside a circular diagram comparing receptor blockade and aromatase inhibition",
  ],
  [
    "hormone-therapy-breast-ovarian-suppression.webp",
    "Young woman in clinic consultation beside a circular non-graphic diagram representing ovarian hormone suppression",
  ],
  [
    "hormone-therapy-breast-bone-monitoring.webp",
    "Woman walking outdoors beside a circular diagram representing bone density structure and monitoring",
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
    "and [targeted therapy for breast cancer in India](https://gaf.healthcare/blogs/targeted-therapy-for-breast-cancer-in-india).";
  if (llms.includes(needle)) {
    llms = llms.replace(
      needle,
      ", [targeted therapy for breast cancer in India](https://gaf.healthcare/blogs/targeted-therapy-for-breast-cancer-in-india) and [hormone therapy for breast cancer in India](https://gaf.healthcare/blogs/hormone-therapy-for-breast-cancer-in-india).",
    );
  } else {
    llms = llms.replace(
      "- [Blogs](https://gaf.healthcare/blogs):",
      `- [Blogs](https://gaf.healthcare/blogs): includes [hormone therapy for breast cancer in India](https://gaf.healthcare/blogs/hormone-therapy-for-breast-cancer-in-india).`,
    );
  }
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}

for (const relatedSlug of [
  "hormone-therapy-breast-cancer-india",
  "breast-cancer-hormone-therapy-side-effects",
  "targeted-therapy-for-breast-cancer-in-india",
  "er-pr-her2-breast-cancer-treatment-india",
]) {
  const related = store.articles.find((row) => row.slug === relatedSlug);
  if (!related) continue;
  const href = `/blogs/${SLUG}`;
  related.relatedLinks = related.relatedLinks || [];
  if (!related.relatedLinks.some((row) => row.href === href)) {
    related.relatedLinks.push({ label: "Hormone therapy for breast cancer in India", href });
  }
  for (let i = 0; i < related.blocks.length; i++) {
    if (related.blocks[i].type === "heading" && /Related Reading/i.test(related.blocks[i].text || "")) {
      for (let j = i + 1; j < Math.min(i + 5, related.blocks.length); j++) {
        if (related.blocks[j].type === "list" && !related.blocks[j].items.some((item) => item.includes(href))) {
          related.blocks[j].items.push(`[Hormone Therapy for Breast Cancer in India](${href})`);
        }
      }
      break;
    }
  }
}
writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("linked from related breast articles");
