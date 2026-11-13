#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (t) => `/consult?treatment=${encodeURIComponent(t)}`;
const wa = (m) => `https://wa.me/919044346292?text=${encodeURIComponent(m)}`;

const SLUG = "breast-cancer-prevention";
const TX = "/treatments/breast-cancer-treatment-in-india";
const SYMP = "/blogs/breast-cancer-symptoms";
const DIAG = "/blogs/breast-cancer-diagnosis";
const DIAG2 = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const SCREEN = "/blogs/breast-cancer-screening-india";
const STAGES = "/blogs/breast-cancer-stages-0-1-2-3-4";
const COST = "/blogs/breast-cancer-treatment-cost-in-india";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const YOUNG = "/blogs/breast-cancer-in-young-women-treatment-india";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const FOLLOW = "/blogs/breast-cancer-follow-up-tests";
const BIOPSY = "/blogs/breast-biopsy-breast-cancer-india";
const MED = "/doctors/India/Medical-Oncology";
const SURG = "/doctors/India/Surgical-Oncology";
const RAD = "/doctors/India/Radiation-Oncology";
const DELHI = "/doctors/India/Delhi-NCR/Medical-Oncology";
const MUMBAI = "/doctors/India/Mumbai/Medical-Oncology";
const PREC = "/costs/India/Medical-Oncology/Precision-Oncology";
const MAST = "/costs/India/Surgical-Oncology/Mastectomy";
const LUMP = "/costs/India/Surgical-Oncology/Lumpectomy";
const CHEMO = "/costs/India/Medical-Oncology/Chemotherapy";

let n = 0;
const id = (p) => `${p}_${(++n).toString().padStart(3, "0")}`;
const h2 = (t) => ({ id: id("h"), type: "heading", level: 2, text: t });
const h3 = (t) => ({ id: id("h"), type: "heading", level: 3, text: t });
const p = (t) => ({ id: id("p"), type: "paragraph", text: t });
const ul = (items) => ({ id: id("ul"), type: "list", style: "ul", items });
const ol = (items) => ({ id: id("ol"), type: "list", style: "ol", items });
const btn = (label, href) => ({ id: id("btn"), type: "button", label, href });
const img = (src, alt, caption) => ({ id: id("img"), type: "image", src, alt, caption });

const IMG1 = "/uploads/articles/breast-cancer-prevention-overview.webp";
const IMG2 = "/uploads/articles/breast-cancer-prevention-lifestyle.webp";
const IMG3 = "/uploads/articles/breast-cancer-prevention-genetics.webp";
const IMG4 = "/uploads/articles/breast-cancer-prevention-screening.webp";

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>Can breast cancer be prevented?</strong></td><td>Not always — lifestyle and selected medical steps may reduce risk for some women</td></tr><tr><td><strong>Biggest risk factor</strong></td><td>Increasing age (plus sex); family history and inherited gene changes can raise risk further</td></tr><tr><td><strong>Modifiable factors</strong></td><td>Alcohol, post-menopausal weight, inactivity, selected hormone therapies</td></tr><tr><td><strong>Genetic testing</strong></td><td>Not for everyone — consider with strong personal/family history after counselling</td></tr><tr><td><strong>Screening vs prevention</strong></td><td>Screening detects earlier; it does not stop cancer from developing</td></tr><tr><td><strong>Planning</strong></td><td><a href="${SCREEN}">Screening in India</a> · <a href="${TX}">treatment in India</a> · <a href="${COST}">cost guide</a></td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>Breast cancer prevention</strong> means reducing risk where possible and pairing healthy habits with breast awareness and appropriate screening.</p></aside>`;

const lifestyleTable = `<div class="md-body"><table><thead><tr><th>Lifestyle measure</th><th>Potential benefit</th></tr></thead><tbody><tr><td>Maintain a healthy body weight</td><td>May reduce postmenopausal breast cancer risk</td></tr><tr><td>Exercise regularly</td><td>Associated with lower breast cancer risk</td></tr><tr><td>Avoid or reduce alcohol</td><td>Reduces an established risk factor</td></tr><tr><td>Eat a balanced diet</td><td>Supports weight management and general health</td></tr><tr><td>Avoid smoking</td><td>Reduces several cancer and cardiovascular risks</td></tr><tr><td>Breastfeed when possible</td><td>Associated with a modest reduction in risk</td></tr><tr><td>Discuss hormone therapy carefully</td><td>Helps avoid unnecessary or unsuitable hormone exposure</td></tr></tbody></table></div>`;

const indianDietTable = `<div class="md-body"><table><thead><tr><th>Meal</th><th>Practical options</th></tr></thead><tbody><tr><td>Breakfast</td><td>Vegetable poha, oats, idli or eggs with whole-grain toast</td></tr><tr><td>Lunch</td><td>Dal, vegetables, roti and curd</td></tr><tr><td>Evening snack</td><td>Fruit, roasted chana or a small portion of nuts</td></tr><tr><td>Dinner</td><td>Vegetable khichdi, grilled fish, paneer or beans with vegetables</td></tr></tbody></table></div>`;

const screenAgeTable = `<div class="md-body"><table><thead><tr><th>Group</th><th>General approach</th></tr></thead><tbody><tr><td>Women below 30 at average risk</td><td>Routine mammography screening generally not recommended; investigate symptoms when present</td></tr><tr><td>Women aged 30–39</td><td>Risk assessment and clinical evaluation; imaging depends on symptoms and risk</td></tr><tr><td>Women aged 40 and above</td><td>Discuss mammography-based screening according to individual risk and applicable guidance</td></tr><tr><td>Women with strong family history or inherited risk</td><td>Specialist assessment; screening may begin earlier and include MRI</td></tr><tr><td>Women with previous breast cancer</td><td>Follow a separate surveillance plan rather than an average-risk screening schedule</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Named pathway</th><th>GAF planning range in India</th><th>How it relates to prevention / early care</th></tr></thead><tbody><tr><td><a href="${PREC}">Precision oncology</a></td><td>$2,000–$7,000</td><td>Selected genetic / tumour testing pathways after high-risk assessment or diagnosis</td></tr><tr><td><a href="${LUMP}">Lumpectomy</a></td><td>$3,000–$7,500</td><td>Breast-conserving surgery when early operable disease is confirmed</td></tr><tr><td><a href="${MAST}">Mastectomy</a></td><td>$4,500–$10,000</td><td>Selected surgical pathways after confirmed cancer (or risk-reducing surgery when indicated)</td></tr><tr><td><a href="${CHEMO}">Chemotherapy</a></td><td>$1,500–$8,000+</td><td>Only when systemic therapy is indicated after diagnosis</td></tr></tbody></table></div><p class="article-quick-answer__body">GAF figures are partner planning ranges for named treatment pathways — not mammography or “prevention package” prices. Ask centres for written estimates for imaging, genetic counselling or risk-reducing care.</p>`;

const faqs = [
  ["Can breast cancer be completely prevented?", "No. There is no guaranteed way to prevent breast cancer. Healthy lifestyle choices, appropriate risk assessment and selected medical interventions can reduce risk for some women."],
  ["What is the biggest risk factor for breast cancer?", "Increasing age is one of the most important risk factors, apart from female biological sex. Inherited genetic changes and family history can also substantially increase risk."],
  ["Can exercise reduce breast cancer risk?", "Regular physical activity is associated with a lower risk of breast cancer. It also supports weight management, cardiovascular health and general well-being."],
  ["Does breastfeeding reduce breast cancer risk?", "Yes. Breastfeeding is associated with a modest reduction in breast cancer risk. However, it does not guarantee prevention."],
  ["Does alcohol increase breast cancer risk?", "Yes. Alcohol consumption is associated with increased breast cancer risk, and the risk generally rises with greater consumption."],
  ["Does obesity increase breast cancer risk?", "Excess body weight, particularly after menopause, is associated with an increased risk of breast cancer."],
  ["Can a woman with no family history develop breast cancer?", "Yes. Most women diagnosed with breast cancer do not have a known family history."],
  ["At what age should women in India start breast cancer screening?", "India has public-health clinical breast examination programmes for eligible women, while specialist breast-imaging guidance supports mammography-based screening from age 40 for women who choose opportunistic screening. The appropriate approach depends on individual risk and local guidance. See our [screening guide](" + SCREEN + ")."],
  ["Is mammography necessary every year?", "Not necessarily for everyone. The interval depends on age, risk profile, previous findings and the guideline being followed. Agree on a schedule with your healthcare professional."],
  ["Is ultrasound enough to screen for breast cancer?", "Ultrasound is useful for evaluating lumps and selected breast conditions, but it is not a universal replacement for mammography-based screening."],
  ["Who should undergo BRCA genetic testing?", "Testing may be appropriate for women with certain personal or family cancer histories, including young-onset breast cancer, multiple affected relatives or a known inherited mutation in the family. Genetic counselling helps determine eligibility."],
  ["Can BRCA-positive women prevent breast cancer?", "A positive result does not mean cancer is inevitable. Enhanced screening, risk-reducing medicines and preventive surgery may be discussed depending on the gene, age and individual circumstances."],
  ["Are preventive medicines available for breast cancer?", "Yes. Medicines such as tamoxifen, raloxifene and certain aromatase inhibitors may reduce the risk of hormone receptor-positive breast cancer in selected high-risk women. They have potential side effects and require specialist assessment."],
  ["Does sugar cause breast cancer?", "There is no evidence that eating sugar directly causes breast cancer. Excessive high-calorie food consumption may contribute to weight gain, which can influence risk after menopause."],
  ["Can men develop breast cancer?", "Yes. Breast cancer in men is uncommon, but it can occur. Men with a breast lump, nipple discharge or other suspicious changes should seek medical assessment."],
  ["Can a normal mammogram guarantee that I do not have breast cancer?", "No. Mammography can miss some cancers. A new or persistent lump or other suspicious symptom requires medical evaluation even after a normal mammogram."],
  ["Should women perform monthly breast self-examination?", "Women should be familiar with their normal breast appearance and feel. Formal monthly self-examination is not a substitute for evidence-based screening and has not been shown to reduce breast cancer deaths."],
  ["What is the best way to reduce breast cancer risk?", "There is no single best measure. Maintaining a healthy weight, staying physically active, avoiding alcohol, understanding family history and following an appropriate screening plan are practical steps."],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("Breast cancer cannot always be prevented, but understanding risk factors and adopting healthy habits may help reduce the chances of developing the disease. Regular breast awareness, appropriate screening and early medical assessment matter too. This guide covers risk factors, lifestyle changes, genetic testing, screening and prevention strategies relevant to women in India. Related care: [screening in India](" + SCREEN + "), [symptoms](" + SYMP + "), [treatment in India](" + TX + ") and [cost](" + COST + ")."),
  btn("Ask GAF about breast cancer risk assessment", consult("Breast Cancer Prevention")),
  p("[WhatsApp +91 90443 46292 with age, family history and screening questions](" + wa("Please advise on breast cancer prevention, risk assessment and screening options in India.") + ")"),
  img(IMG1, "Woman discussing breast cancer prevention and risk reduction with a clinician beside soft circular lifestyle and awareness concepts", "Prevention reduces risk where possible; early detection finds cancer sooner when it develops."),

  h2("Can Breast Cancer Be Prevented?"),
  p("Breast cancer cannot always be prevented. Lifestyle changes and selected medical interventions may reduce risk. Some factors — age, inherited gene changes and family history — cannot be changed. Others, including alcohol, physical inactivity and excess body weight after menopause, may be influenced through choices."),
  ul([
    "**Prevention** — steps that may reduce the chance of developing breast cancer.",
    "**Early detection** — identifying breast cancer earlier, before it has spread or caused serious symptoms.",
  ]),
  p("Even women who follow a healthy lifestyle can develop breast cancer. Many diagnosed women have no known family history. The goal is informed decisions — not blame."),

  h2("What Is Breast Cancer?"),
  p("Breast cancer develops when abnormal cells in breast tissue grow and divide uncontrollably. It most often begins in the milk ducts or lobules. Some cancers remain localised for a time; others invade surrounding tissue and may spread to lymph nodes or distant organs."),
  ul([
    "Invasive ductal and invasive lobular carcinoma.",
    "DCIS; LCIS (generally a risk marker rather than invasive cancer).",
    "Hormone receptor-positive, HER2-positive and triple-negative disease.",
    "Inflammatory breast cancer.",
  ]),
  p("Type matters because risk assessment, screening and treatment decisions can differ. See [stages](" + STAGES + ") and [diagnosis](" + DIAG + ")."),

  h2("What Are the Risk Factors for Breast Cancer?"),
  p("A risk factor increases likelihood of disease. Having one or more factors does not mean cancer will develop — and women without obvious factors can still be diagnosed. Risks fall into factors that cannot be changed and factors that may be modified."),

  h3("Risk factors that cannot be changed"),
  ul([
    "**Age** — risk generally rises with age; younger women can still develop breast cancer.",
    "**Family history** — mother, sister, daughter or a pattern of young-onset, bilateral, ovarian, pancreatic or related cancers.",
    "**Inherited gene changes** — BRCA1, BRCA2, PALB2, CHEK2, ATM, TP53, PTEN, CDH1 and others.",
    "**Personal history** of breast cancer or certain high-risk benign findings (ADH, ALH, LCIS).",
    "**Dense breast tissue** — raises risk slightly and can make mammography harder to interpret.",
    "**Prior chest radiation** at a young age (for example after Hodgkin lymphoma treatment).",
    "**Reproductive/menstrual history** — early menstruation, late menopause, later first full-term pregnancy or never carrying a pregnancy to term (statistical associations only).",
  ]),
  p("Most women with breast cancer do **not** have a known family history. Absence of family history does not eliminate risk. More on [young women](" + YOUNG + ")."),

  h3("Risk factors that may be modified"),
  ul([
    "**Alcohol** — risk rises with increasing intake; reducing or avoiding alcohol is practical.",
    "**Excess body weight after menopause** — fat tissue can produce oestrogen after menopause.",
    "**Physical inactivity** — regular activity is associated with lower risk.",
    "**Combined menopausal hormone therapy** (oestrogen + progestogen) — risk rises with longer use; discuss benefits and risks with a doctor.",
    "**Tobacco** — avoid smoking for overall cancer and cardiovascular health.",
    "**Breastfeeding** when possible — modest protective association; never a reason for blame.",
  ]),
  btn("Request a personalised breast cancer risk review", consult("Breast Cancer Prevention")),

  h2("Which Lifestyle Changes May Help Reduce Risk?"),
  img(IMG2, "Woman walking outdoors with balanced Indian meal icons representing lifestyle steps for breast cancer risk reduction", "Sustainable habits beat extreme diets or unproven prevention programmes."),
  { id: id("html"), type: "html", html: lifestyleTable },
  h3("Maintain a healthy weight and exercise"),
  p("Gradual, realistic weight management and regular activity support long-term health. WHO guidance for adults typically includes 150–300 minutes of moderate aerobic activity weekly (or equivalent vigorous activity) plus muscle-strengthening. Brisk walking, cycling, swimming, dancing, strength work and yoga can all count. If inactive, a 20–30 minute walk on most days is a reasonable start."),
  h3("Limit alcohol and follow a balanced diet"),
  p("Alcohol is an established risk factor. No single food prevents breast cancer, but a balanced pattern supports weight and general health — vegetables, fruits, whole grains, lentils, beans, nuts, seeds, fish or other protein, dairy or alternatives, and moderate cooking oils."),
  p("A balanced Indian diet is suitable:"),
  { id: id("html"), type: "html", html: indianDietTable },
  p("There is no need for expensive “cancer-prevention” superfoods. Antioxidant supplements and detox drinks have not been proven to prevent breast cancer. Sugar does not directly cause breast cancer, but excess sugary drinks can drive weight gain. Normal dietary soy foods are generally considered safe for most people; concentrated isoflavone supplements need medical advice."),
  p("[WhatsApp +91 90443 46292 for lifestyle and screening guidance](" + wa("I want practical advice on breast cancer risk reduction and screening in India.") + ")"),

  h2("Does Prevention Require Genetic Testing?"),
  img(IMG3, "Genetic counsellor reviewing BRCA family history with a woman beside soft circular DNA concepts", "Genetic testing is for selected high-risk histories — not every woman."),
  p("Genetic testing is **not** necessary for every woman. Counselling may be appropriate with young-onset breast cancer, multiple close relatives with breast cancer, ovarian cancer in the family, male breast cancer, bilateral disease, breast and ovarian cancer in one person, a known BRCA pathogenic variant in the family, or certain pancreatic/prostate patterns."),
  h3("BRCA1 and BRCA2 testing"),
  p("BRCA1 and BRCA2 help repair DNA. Harmful inherited changes can substantially raise breast and ovarian cancer risk. Testing usually uses blood or saliva. Results may show a pathogenic/likely pathogenic variant, a variant of uncertain significance (VUS — not automatically a reason for preventive surgery), or no clinically significant variant."),
  h3("If a test is positive"),
  p("Cancer is not inevitable. Options may include intensified surveillance (mammography and often annual MRI), risk-reducing medication, risk-reducing surgery in selected cases, ovarian risk management and family counselling. Decisions need specialist guidance. Related: [precision oncology planning](" + PREC + ") and [diagnosis / biomarker testing](" + DIAG2 + ")."),
  btn("Ask about genetic counselling coordination in India", consult("Breast Cancer Genetic Testing")),

  h2("Can Medicines or Surgery Reduce Risk in High-Risk Women?"),
  p("Selected high-risk women may discuss **chemoprevention** (risk-reducing medication) such as tamoxifen, raloxifene or, in some postmenopausal settings, aromatase inhibitors. These can reduce hormone receptor-positive breast cancer risk but have side effects (for example hot flushes, clot risk, bone effects) and are not for everyone."),
  p("**Risk-reducing mastectomy** can substantially lower breast cancer risk in women with very high inherited risk; it is not for the general population and cannot eliminate risk completely. Some BRCA-related patients may also discuss risk-reducing removal of ovaries and fallopian tubes — primarily for ovarian risk, with possible breast-risk effects depending on age. See [surgery in India](" + SURGERY + ")."),
  p("**Important:** Do not start preventive medicines or pursue surgery from worry alone. A specialist should weigh expected benefit against risks."),

  h2("What Is Breast Cancer Screening?"),
  img(IMG4, "Woman preparing for mammography-based breast cancer screening beside soft circular early-detection concepts", "Screening finds possible cancer early — it does not prevent cancer from developing."),
  p("Screening tests women **without** symptoms to find possible cancer earlier. Diagnostic testing investigates a lump, discharge, skin change or other concern. Mammography is the main population screening imaging method; ultrasound and MRI help in selected situations. Full detail: [breast cancer screening in India](" + SCREEN + ")."),
  h3("Screening methods at a glance"),
  ul([
    "**Mammography / tomosynthesis** — low-dose X-rays; can show masses, microcalcifications and distortion.",
    "**Ultrasound** — useful for lumps, younger symptomatic women, dense tissue as a supplement, biopsy guidance — not a universal mammography substitute.",
    "**Breast MRI** — mainly for significantly increased inherited or calculated lifetime risk.",
    "**Clinical breast examination** — used in India’s public programmes; does not replace imaging when imaging is indicated.",
  ]),

  h2("At What Age Should Women Start Screening in India?"),
  p("There is no single schedule for every woman. Public-health programmes, specialist imaging guidance and high-risk pathways differ."),
  { id: id("html"), type: "html", html: screenAgeTable },
  p("India’s population-based framework has used clinical breast examination for eligible women (commonly ages 30–65 in programme settings). The Breast Imaging Society, India supports considering annual mammography-based opportunistic screening from age 40, with intervals and stopping age individualised. High-risk women may need earlier start and MRI. Details and BI-RADS next steps: [screening guide](" + SCREEN + ")."),
  btn("Request a personalised screening plan", consult("Breast Cancer Screening")),

  h2("Early Detection: Warning Signs and Breast Awareness"),
  p("Know what is normal for your breasts and seek care for persistent or unusual changes:"),
  ul([
    "A new lump in the breast or armpit.",
    "Change in breast size or shape; skin dimpling or puckering.",
    "New nipple inversion; blood-stained nipple discharge.",
    "Persistent redness, thickening, rash or unexplained swelling.",
  ]),
  p("Breast cancer can be painless. Formal monthly self-examination has not been shown to reduce deaths as a stand-alone method — **breast awareness** and prompt evaluation matter more. If you find a lump: see a qualified clinician, share history and prior imaging, complete recommended ultrasound/mammography, and have a [biopsy](" + BIOPSY + ") when tissue confirmation is needed. Do not delay because the lump is painless or you are young. More: [symptoms](" + SYMP + ")."),
  p("Early detection can make treatment more effective. Screening only helps when abnormal results lead to timely diagnosis and treatment access."),

  h2("Common Myths About Breast Cancer Prevention"),
  ul([
    "**Only women above 50** — younger women can develop breast cancer.",
    "**No family history means safe** — most diagnoses occur without known family history.",
    "**Cancer always causes pain** — many early cancers are painless.",
    "**Diet guarantees protection** — healthy eating helps but cannot guarantee prevention.",
    "**Self-exam prevents cancer** — awareness helps detection; it does not prevent cancer.",
    "**Mammography prevents cancer** — it detects possible cancer; it does not stop cancer forming.",
    "**Only BRCA carriers get breast cancer** — most cancers are not caused by inherited BRCA mutations.",
    "**Every lump is cancer / every hormone causes cancer / detox drinks prevent cancer** — false; assess lumps medically; hormone risk is individualised; no detox product is proven prevention.",
  ]),

  h2("Breast Cancer Prevention and Screening in India"),
  ol([
    "Ask about clinical breast examination at primary healthcare / Ayushman Arogya Mandir pathways where available.",
    "Seek mammography or specialist imaging at an equipped centre when age, risk or symptoms indicate.",
    "Consider genetic counselling for strong family histories.",
    "Complete follow-up after abnormal findings — diagnostic imaging, [biopsy](" + BIOPSY + "), pathology and specialist review.",
  ]),
  p("International patients from East Africa, the Middle East and elsewhere may travel for specialist risk assessment, genetic interpretation, second opinions or complex diagnostics — but routine screening does not always require overseas travel. Carry prior imaging and family history. See [international patients](" + INTL + "). Specialists: [medical oncology](" + MED + "), [surgical oncology](" + SURG + "), [radiation oncology](" + RAD + "), [Delhi NCR](" + DELHI + "), [Mumbai](" + MUMBAI + ")."),

  h2("Related Care Pathways and Planning Ranges"),
  p("Prevention itself is not a priced “package.” If high-risk assessment, diagnosis or treatment follows, GAF partner planning ranges for **named pathways** (not invented screening package prices) include:"),
  { id: id("html"), type: "html", html: costTable },
  p("Broader context: [breast cancer treatment cost in India](" + COST + "). GAF can help request case-specific consultation and imaging estimates."),
  p("[WhatsApp +91 90443 46292 for a risk-assessment and imaging estimate](" + wa("Please share a case-specific estimate for breast cancer risk assessment, genetic counselling or related care pathways in India.") + ")"),
  btn("Request a prevention and screening consult estimate", consult("Breast Cancer Prevention")),

  h2("How GAF Healthcare Can Help"),
  p("GAF Healthcare assists international patients coordinating breast specialist consultations, imaging, record review and genetic counselling pathways in India. Screening eligibility, genetic testing and preventive treatment decisions remain with treating clinicians."),
  btn("Talk to GAF about breast cancer prevention in India", consult("Breast Cancer Prevention")),

  h2("Frequently Asked Questions"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Final Thoughts"),
  p("Breast cancer prevention begins with understanding risk, not fear. Combine healthy habits with appropriate risk assessment, breast awareness and timely screening. Do not ignore a new breast lump, nipple change or unexplained skin abnormality — prompt assessment can make a significant difference. Continue with [screening in India](" + SCREEN + "), [follow-up after treatment](" + FOLLOW + ") and [treatment options](" + TX + ") as needed."),

  h2("Medical Sources and References"),
  ol([
    "[WHO – Breast Cancer Fact Sheet](https://www.who.int/news-room/fact-sheets/detail/breast-cancer)",
    "[NCI – Breast Cancer Prevention](https://www.cancer.gov/types/breast/causes-risk-factors/prevention)",
    "[NCI – Breast Cancer Causes and Risk Factors](https://www.cancer.gov/types/breast/causes-risk-factors)",
    "[NCI – Breast Cancer Prevention PDQ (Health Professional)](https://www.cancer.gov/types/breast/hp/breast-prevention-pdq)",
    "[Breast Imaging Society, India – Best Practice Guidelines for Breast Imaging](https://nams-annals.in/best-practice-guidelines-for-breast-imaging-breast-imaging-society-india-part-1/)",
    "[National Cancer Screening and Early Diagnosis Guidelines, India – 2024](https://www.iccp-portal.org/sites/default/files/2026-04/National_Cancer_Screening_Guidelines_2024_1%20%281%29.pdf)",
    "[American Cancer Society – Early Detection Recommendations](https://www.cancer.org/cancer/types/breast-cancer/screening-tests-and-early-detection/american-cancer-society-recommendations-for-the-early-detection-of-breast-cancer.html)",
    "[NCCN Guidelines for Patients – Breast Cancer Screening and Diagnosis, 2026](https://vicc.org/sites/default/files/2026-10/breastcancerscreening-patient.pdf)",
    "[NCI – BRCA Gene Changes](https://www.cancer.gov/about-cancer/causes-prevention/genetics/brca-fact-sheet)",
    "[WHO – Physical Activity](https://www.who.int/news-room/fact-sheets/detail/physical-activity)",
  ]),
  p("*Medical disclaimer: This article is for general educational purposes and does not replace individual medical advice. Screening schedules, genetic testing and preventive medicines should follow personal risk, medical history and current clinical guidance. A new breast lump or suspicious change requires diagnostic assessment, not only a routine screening appointment.*"),

  h2("Related Reading"),
  ul([
    `[Breast Cancer Screening in India](${SCREEN})`,
    `[Breast Cancer Treatment in India](${TX})`,
    `[Breast Cancer Symptoms](${SYMP})`,
    `[Breast Cancer Diagnosis](${DIAG})`,
    `[Diagnosis tests (ER/PR/HER2)](${DIAG2})`,
    `[Breast Biopsy in India](${BIOPSY})`,
    `[Breast Cancer Stages](${STAGES})`,
    `[Breast Cancer Surgery](${SURGERY})`,
    `[Young Women](${YOUNG})`,
    `[Treatment Cost](${COST})`,
    `[International Patients](${INTL})`,
    `[Follow-Up Tests](${FOLLOW})`,
  ]),
];

const now = new Date().toISOString();
const article = {
  id: "art_breast_cancer_prevention",
  slug: SLUG,
  title: "Breast Cancer Prevention: Risk Factors, Lifestyle Changes, Screening and Early Detection in India",
  excerpt:
    "Breast cancer cannot always be prevented, but understanding risk factors and adopting healthy habits may help reduce the chances of developing the disease. Regular breast awareness, appropriate screening and early medical assessment are also important. This guide explains breast cancer risk factors, lifestyle changes, genetic testing, screening options and prevention strategies relevant to women in India.",
  date: "13 November 2026",
  publishedAt: "2026-11-13T14:00:00.000Z",
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Medical Oncology",
  tags: ["breast cancer", "prevention", "risk factors", "screening", "India"],
  image: IMG1,
  imageAlt: "Woman discussing breast cancer prevention and risk reduction with a clinician",
  status: "published",
  featured: true,
  seoTitle: "Breast Cancer Prevention: Risk Factors, Screening, Lifestyle and Early Detection",
  seoDescription:
    "Learn how to reduce breast cancer risk, understand hereditary and lifestyle risk factors, recognise early symptoms and explore breast cancer screening options in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: IMG1,
  allowIndex: true,
  keywords: [
    "Breast cancer prevention",
    "How to prevent breast cancer",
    "Breast cancer risk factors",
    "Breast cancer prevention tips",
    "Breast cancer screening in India",
    "Mammography for breast cancer",
    "Early detection of breast cancer",
    "Breast cancer family history",
    "BRCA1 and BRCA2 genetic testing",
    "Breast cancer prevention diet",
    "Exercise and breast cancer risk",
    "Breast cancer screening age",
    "Breast cancer awareness",
    "High-risk breast cancer screening",
    "Breast cancer prevention in women",
  ],
  relatedLinks: [
    { label: "Breast cancer screening in India", href: SCREEN },
    { label: "Breast Cancer Treatment in India", href: TX },
    { label: "Breast cancer symptoms", href: SYMP },
    { label: "Breast cancer diagnosis", href: DIAG },
    { label: "Diagnosis tests", href: DIAG2 },
    { label: "Breast biopsy in India", href: BIOPSY },
    { label: "Cost guide", href: COST },
    { label: "International patients", href: INTL },
  ],
  blocks,
};

for (const [file, alt] of [
  ["breast-cancer-prevention-overview.webp", article.imageAlt],
  ["breast-cancer-prevention-lifestyle.webp", "Woman walking outdoors with balanced Indian meal icons for breast cancer risk reduction"],
  ["breast-cancer-prevention-genetics.webp", "Genetic counsellor reviewing BRCA family history with a woman"],
  ["breast-cancer-prevention-screening.webp", "Woman preparing for mammography-based breast cancer screening"],
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
      `- [Blogs](https://gaf.healthcare/blogs): includes [breast cancer prevention](https://gaf.healthcare/blogs/${SLUG}).`,
    );
  } else {
    llms += `\n- [Breast cancer prevention](https://gaf.healthcare/blogs/${SLUG})\n`;
  }
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
} else {
  console.log("llms.txt already lists prevention blog");
}

for (const relatedSlug of [
  "breast-cancer-screening-india",
  "breast-cancer-symptoms",
  "breast-cancer-diagnosis",
  "breast-cancer-diagnosis-tests-biopsy-er-pr-her2",
  "breast-biopsy-breast-cancer-india",
  "breast-cancer-surgery-in-india",
  "breast-cancer-treatment-cost-in-india",
  "breast-cancer-treatment-india-international-patients",
  "breast-cancer-in-young-women-treatment-india",
  "breast-cancer-follow-up-tests",
]) {
  const related = store.articles.find((r) => r.slug === relatedSlug);
  if (!related) continue;
  const href = `/blogs/${SLUG}`;
  related.relatedLinks = related.relatedLinks || [];
  if (!related.relatedLinks.some((r) => r.href === href)) {
    related.relatedLinks.push({ label: "Breast cancer prevention", href });
  }
}
writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("linked related articles");
