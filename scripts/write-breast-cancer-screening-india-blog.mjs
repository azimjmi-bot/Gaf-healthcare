#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (t) => `/consult?treatment=${encodeURIComponent(t)}`;
const wa = (m) => `https://wa.me/919044346292?text=${encodeURIComponent(m)}`;

const SLUG = "breast-cancer-screening-india";
const TX = "/treatments/breast-cancer-treatment-in-india";
const SYMP = "/blogs/breast-cancer-symptoms";
const DIAG = "/blogs/breast-cancer-diagnosis";
const DIAG2 = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const STAGES = "/blogs/breast-cancer-stages-0-1-2-3-4";
const COST = "/blogs/breast-cancer-treatment-cost-in-india";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const YOUNG = "/blogs/breast-cancer-in-young-women-treatment-india";
const FOLLOW = "/blogs/breast-cancer-follow-up-tests";
const RECUR = "/blogs/breast-cancer-recurrence-treatment-india";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
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

const IMG1 = "/uploads/articles/breast-cancer-screening-overview.webp";
const IMG2 = "/uploads/articles/breast-cancer-screening-mammography.webp";
const IMG3 = "/uploads/articles/breast-cancer-screening-ultrasound-mri.webp";
const IMG4 = "/uploads/articles/breast-cancer-screening-high-risk.webp";

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>What is screening?</strong></td><td>Checking for possible breast cancer before symptoms appear</td></tr><tr><td><strong>Average-risk start (BISI)</strong></td><td>Consider annual mammography-based screening from age 40</td></tr><tr><td><strong>Public programme</strong></td><td>Clinical breast examination for eligible women (e.g. ages 30–65 in programme settings)</td></tr><tr><td><strong>Main imaging</strong></td><td>Mammography; ultrasound and MRI when clinically indicated or high risk</td></tr><tr><td><strong>Symptoms?</strong></td><td>Do not wait for screening — seek diagnostic assessment promptly</td></tr><tr><td><strong>Planning</strong></td><td><a href="${TX}">Breast cancer treatment in India</a> · <a href="${DIAG2}">diagnosis tests</a> · <a href="${COST}">cost guide</a></td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>Breast cancer screening in India</strong> should match age, risk and symptoms — not every woman needs every test.</p></aside>`;

const screenVsDiag = `<div class="md-body"><table><thead><tr><th>Breast cancer screening</th><th>Diagnostic breast testing</th></tr></thead><tbody><tr><td>For women without breast symptoms</td><td>For women with a lump, discharge, skin changes or other symptoms</td></tr><tr><td>Looks for possible cancer before symptoms appear</td><td>Investigates a specific concern</td></tr><tr><td>May involve screening mammography</td><td>May involve diagnostic mammography, ultrasound, MRI or biopsy</td></tr><tr><td>Usually follows an age- and risk-based plan</td><td>Depends on the symptom, age and clinical findings</td></tr></tbody></table></div>`;

const ageTable = `<div class="md-body"><table><thead><tr><th>Group</th><th>Screening approach</th></tr></thead><tbody><tr><td>Average-risk women below 40</td><td>Routine mammography generally not recommended by BISI; assess symptoms promptly</td></tr><tr><td>Average-risk women aged 40–70</td><td>BISI recommends considering annual mammography-based screening</td></tr><tr><td>Women above 70</td><td>Individualise based on health, life expectancy and preferences</td></tr><tr><td>Women at high risk</td><td>Earlier/more intensive screening — often MRI with mammography</td></tr><tr><td>Breast symptoms at any age</td><td>Diagnostic assessment without waiting for screening age</td></tr></tbody></table></div>`;

const compareTable = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Mammography</th><th>Ultrasound</th><th>MRI</th></tr></thead><tbody><tr><td>Technology</td><td>X-rays</td><td>Sound waves</td><td>Magnetic field and radio waves</td></tr><tr><td>Ionising radiation</td><td>Yes, low dose</td><td>No</td><td>No</td></tr><tr><td>Routine screening</td><td>Main established imaging method</td><td>Not usually used alone</td><td>Mainly selected high-risk women</td></tr><tr><td>Microcalcifications</td><td>Yes</td><td>Limited</td><td>Not its main strength</td></tr><tr><td>Cyst vs solid</td><td>Sometimes</td><td>Yes</td><td>Sometimes</td></tr><tr><td>Pregnancy</td><td>When clinically indicated</td><td>Often initial imaging</td><td>Selected situations</td></tr><tr><td>Cost</td><td>Usually lower than MRI</td><td>Varies</td><td>Usually higher</td></tr></tbody></table></div>`;

const densityTable = `<div class="md-body"><table><thead><tr><th>Category</th><th>Description</th></tr></thead><tbody><tr><td>A</td><td>Almost entirely fatty</td></tr><tr><td>B</td><td>Scattered areas of fibroglandular density</td></tr><tr><td>C</td><td>Heterogeneously dense</td></tr><tr><td>D</td><td>Extremely dense</td></tr></tbody></table></div>`;

const biradsTable = `<div class="md-body"><table><thead><tr><th>BI-RADS</th><th>Meaning</th><th>Typical next step</th></tr></thead><tbody><tr><td>0</td><td>Incomplete</td><td>Additional imaging or prior images</td></tr><tr><td>1</td><td>Negative</td><td>Routine screening based on risk</td></tr><tr><td>2</td><td>Benign</td><td>Routine screening based on risk</td></tr><tr><td>3</td><td>Probably benign</td><td>Usually short-interval imaging follow-up</td></tr><tr><td>4</td><td>Suspicious</td><td>Biopsy generally recommended</td></tr><tr><td>5</td><td>Highly suggestive of malignancy</td><td>Biopsy and specialist assessment</td></tr><tr><td>6</td><td>Cancer already confirmed</td><td>Treatment planning</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Named pathway</th><th>GAF planning range in India</th><th>How it relates to screening</th></tr></thead><tbody><tr><td><a href="${PREC}">Precision oncology</a></td><td>$2,000–$7,000</td><td>Selected genetic / tumour testing pathways after high-risk assessment</td></tr><tr><td><a href="${LUMP}">Lumpectomy</a></td><td>$3,000–$7,500</td><td>If screening leads to early operable disease</td></tr><tr><td><a href="${MAST}">Mastectomy</a></td><td>$4,500–$10,000</td><td>Selected surgical pathways after confirmed cancer</td></tr><tr><td><a href="${CHEMO}">Chemotherapy</a></td><td>$1,500–$8,000+</td><td>Only when systemic therapy is indicated after diagnosis</td></tr></tbody></table></div><p class="article-quick-answer__body">GAF figures are partner planning ranges for named treatment pathways — not mammography package prices. Ask centres for a written imaging estimate (2D/3D, both breasts, report included).</p>`;

const faqs = [
  ["At what age should a woman start breast cancer screening in India?", "The Breast Imaging Society, India recommends considering annual mammography-based screening from age 40 for women who choose opportunistic screening. Public programmes have also used clinical breast examination for eligible women aged 30–65 at longer intervals. Higher-risk women may need a different plan."],
  ["Is mammography painful?", "Mammography involves brief compression of the breasts. Some women experience discomfort or pressure, but it generally lasts only a few seconds for each image."],
  ["Can breast cancer be detected through ultrasound alone?", "Ultrasound can identify many breast abnormalities and is useful for evaluating lumps. It is not generally recommended as the only screening test for average-risk women."],
  ["Is mammography safe?", "Mammography uses a low dose of X-ray radiation. For appropriately selected women, potential benefits are generally considered to outweigh the small radiation risk."],
  ["Can a woman below 40 develop breast cancer?", "Yes. A woman with a breast lump, nipple discharge or other suspicious change should seek evaluation regardless of age."],
  ["Should women with a family history start screening earlier?", "Possibly. Timing depends on relatives’ ages at diagnosis, number of affected relatives, genetic findings and overall risk. A breast specialist or genetic counsellor can help."],
  ["Is breast MRI better than mammography?", "MRI is more sensitive in some high-risk situations, but it is not a universal replacement for mammography. The tests can be complementary."],
  ["Can mammography detect cancer before a lump develops?", "Yes. Mammography can identify certain abnormalities, including small clusters of calcifications, before a lump can be felt."],
  ["Should breastfeeding women undergo breast screening?", "Breast symptoms should not be ignored during breastfeeding. Ultrasound is often first for symptoms; other imaging may be used when clinically necessary."],
  ["If my mammogram is normal, can I still develop breast cancer?", "Yes. No screening test detects every cancer. A new lump or suspicious symptom should be evaluated even after a recent normal mammogram."],
  ["Does every abnormal mammogram mean cancer?", "No. Many abnormal findings are benign. Additional imaging or biopsy may be recommended to establish the diagnosis."],
  ["How often should a woman have a mammogram?", "The interval depends on age, risk and guidance. BISI recommends annual screening from 40 to 70 for women choosing mammography-based screening. Confirm with a clinician."],
  ["Is breast cancer screening available free in India?", "Some government facilities provide clinical breast examination through population-based programmes. Access to mammography and other imaging varies by location."],
  ["Do men need routine breast cancer screening?", "Routine population screening is not generally recommended for men. A man with a breast lump, nipple discharge or swelling should seek assessment."],
  ["What should I do if my mammogram report says BI-RADS 4?", "BI-RADS 4 indicates a suspicious abnormality. Biopsy is generally recommended, but it does not confirm cancer. Discuss the report with a breast specialist."],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("Breast cancer screening can help detect cancer before symptoms appear. This guide explains when women in India should consider screening, how mammography, ultrasound and MRI differ, who may need additional tests, what happens after an abnormal result and how to understand screening costs. Related care: [breast cancer treatment in India](" + TX + "), [symptoms](" + SYMP + "), [diagnosis](" + DIAG + ") and [cost](" + COST + ")."),
  btn("Ask GAF to arrange a breast screening consultation", consult("Breast Cancer Screening")),
  p("[WhatsApp +91 90443 46292 with age, family history and prior imaging](" + wa("Please advise on breast cancer screening options and cost for my age and risk profile in India.") + ")"),
  img(IMG1, "Woman discussing a breast cancer screening plan with a clinician beside a soft circular age-based screening concept", "Screening looks for possible cancer before symptoms — the right test depends on age and risk."),

  h2("Why Is Breast Cancer Screening Important?"),
  p("Early breast cancer may not cause pain or a lump. Screening examines women without symptoms to find suspicious changes when treatment may be more manageable. In India, many women are diagnosed only after noticing symptoms — awareness and timely imaging can reduce delay."),
  p("Screening does not mean every woman needs every test. Method depends on age, family history, personal risk, breast density and medical history. See [stages](" + STAGES + ") and [young women](" + YOUNG + ")."),

  h2("What Is Breast Cancer Screening?"),
  p("Screening checks for possible signs of breast cancer before symptoms develop. It differs from diagnostic testing:"),
  { id: id("html"), type: "html", html: screenVsDiag },
  p("**Important:** If you notice a breast lump, nipple discharge, skin dimpling or a change in breast shape, do not wait for the next screening appointment — seek assessment promptly, even after a recent normal mammogram. More on [symptoms](" + SYMP + ")."),

  h2("At What Age Should Women Start Breast Cancer Screening in India?"),
  p("There is no single nationwide mammography schedule for every woman. Government programmes, specialist imaging guidance and high-risk pathways differ."),
  { id: id("html"), type: "html", html: ageTable },
  p("The Breast Imaging Society, India (BISI) recommends considering annual mammography-based screening from age 40 until about 70 for women choosing opportunistic screening, then individualising. This is not the same as a universal government-funded annual mammography programme."),
  h3("What does the Indian government screening programme recommend?"),
  p("India’s population-based framework has used clinical breast examination (CBE) for women aged roughly 30–65, often at longer intervals (e.g. five years when findings are normal). Suspicious findings are referred for further assessment, which may include ultrasound and biopsy."),
  btn("Request a personalised screening age review", consult("Breast Cancer Screening")),

  h2("What Are the Different Breast Cancer Screening Tests?"),
  img(IMG2, "Woman undergoing digital mammography with a technologist in a calm clinic beside a soft circular breast imaging concept", "Mammography remains the main imaging method for routine breast screening."),

  h3("A. Mammography"),
  p("Mammography is an X-ray of the breasts and the main imaging method for routine screening. Images can show small masses, microcalcifications, architectural distortion and other changes that may not be felt."),
  ul([
    "**Digital mammography** — stores images digitally for review and comparison.",
    "**3D mammography (tomosynthesis)** — images from multiple angles; may help in selected dense-breast settings; availability and cost vary.",
  ]),
  p("Advantages include detecting some abnormalities before they are palpable and establishing a baseline. Limitations include temporary compression discomfort, dense tissue obscuring findings, and false positives or false negatives."),

  h3("B. Breast Ultrasound"),
  p("Ultrasound uses sound waves without ionising radiation. It helps distinguish cysts from solid lumps and is often used for younger women with lumps, pregnancy/breastfeeding symptoms, dense tissue as a supplement, or to guide biopsy. It is **not** generally a standalone substitute for mammography-based screening in average-risk women."),

  h3("C. Breast MRI"),
  img(IMG3, "Clinician explaining breast ultrasound and MRI options beside soft circular diagrams of ultrasound and MRI concepts", "Ultrasound and MRI complement mammography when symptoms or high risk justify them."),
  p("MRI provides detailed images without X-ray radiation and usually uses intravenous contrast for screening. It is mainly for significantly increased risk (e.g. BRCA-related risk, strong family history, prior chest radiation at a young age). It can detect additional cancers but also false positives, extra biopsies and higher cost."),

  h3("D. Clinical Breast Examination and Breast Awareness"),
  p("A trained clinician examines the breasts and armpits. CBE is used in India’s public screening framework but cannot detect every mammographic abnormality. Women should know what is normal for their breasts and report persistent changes — formal monthly self-exam is not a substitute for evidence-based screening."),

  h2("Mammography vs Ultrasound vs MRI"),
  { id: id("html"), type: "html", html: compareTable },
  p("Choose the test recommended for your age, risk and findings — not simply the most expensive option."),

  h2("Who Is at High Risk of Breast Cancer?"),
  img(IMG4, "Genetic counsellor reviewing family history with a woman beside soft circular DNA and family silhouette concepts", "High-risk women may need earlier screening and MRI alongside mammography."),
  ul([
    "Close relatives with breast cancer (especially young-onset), ovarian cancer, bilateral breast cancer, male breast cancer or related hereditary patterns.",
    "Inherited variants such as BRCA1, BRCA2, PALB2, TP53, PTEN and other syndromes.",
    "Chest radiation at a young age.",
    "Certain prior biopsy findings (e.g. atypical hyperplasia, LCIS).",
  ]),
  p("High-risk plans may include earlier start, annual MRI with mammography, genetic counselling and testing. See [diagnosis / biomarker testing](" + DIAG2 + ") and [precision oncology planning](" + PREC + ")."),
  p("[WhatsApp +91 90443 46292 for high-risk screening coordination](" + wa("I have a family history of breast cancer. Please help arrange risk assessment and screening options in India.") + ")"),

  h2("Breast Cancer Screening for Women With Dense Breasts"),
  p("Dense breasts are common and not a disease, but density raises risk slightly and can hide cancers on mammography (both appear white)."),
  { id: id("html"), type: "html", html: densityTable },
  p("Categories C and D are generally “dense.” Extra ultrasound or MRI is not automatic for every average-risk woman with dense breasts — benefits and harms of supplemental screening vary. Discuss overall risk with your clinician."),

  h2("Screening During Pregnancy and Breastfeeding"),
  p("Do not ignore a new lump in pregnancy or breastfeeding. Ultrasound is often first; diagnostic mammography may be used when clinically necessary. The plan should be set by the treating clinician and radiologist."),

  h2("What Happens If Your Mammogram Is Abnormal?"),
  p("Abnormal does not automatically mean cancer. Next steps may include additional mammographic views, ultrasound, selected MRI, core needle biopsy and pathology review. See [diagnosis pathway](" + DIAG + ")."),
  { id: id("html"), type: "html", html: biradsTable },
  btn("Get help interpreting a BI-RADS report", consult("Breast Cancer Screening")),

  h2("How Should You Prepare for a Mammography Test?"),
  ul([
    "Tell the centre if you are pregnant or breastfeeding.",
    "Mention implants, prior surgery or biopsies.",
    "Bring previous mammograms and reports.",
    "Describe any lump, discharge, pain or skin change.",
    "Avoid deodorant, talc or lotion on breasts/underarms on the day of imaging.",
  ]),
  p("Compression is brief. The imaging itself takes only a few minutes."),

  h2("Possible Risks and Limitations of Screening"),
  ul([
    "**False positives** — extra imaging, biopsy, anxiety and cost.",
    "**False negatives** — especially with dense tissue; new symptoms still need assessment.",
    "**Overdiagnosis** — some detected cancers may never have caused harm.",
    "**Low-dose radiation** — small per examination; weigh in an appropriate plan.",
  ]),

  h2("Breast Cancer Screening Cost in India"),
  p("There is no single nationwide price. Charges depend on city, facility, equipment (2D vs 3D), whether both breasts are included, radiologist report and whether ultrasound or MRI is separate. Ask for a written estimate."),
  p("If screening leads to confirmed cancer, related treatment pathway planning ranges (not imaging package prices) include:"),
  { id: id("html"), type: "html", html: costTable },
  p("Broader context: [breast cancer treatment cost in India](" + COST + "). GAF can help request case-specific imaging and consultation estimates — we do not invent fixed mammography package prices."),
  p("[WhatsApp +91 90443 46292 for a screening cost estimate](" + wa("Please share a case-specific estimate for mammography and related breast imaging consultation in India.") + ")"),
  btn("Request a screening and imaging estimate", consult("Breast Cancer Screening")),

  h2("Screening for International Patients"),
  p("For patients from Tanzania, Kenya, Uganda, Ethiopia, Zambia, Iraq, Oman and other countries, share age, symptoms, family history and prior imaging before travel. A sensible pathway: history review → specialist consult → recommended imaging/biopsy → discussion of findings. See [international patients](" + INTL + ")."),
  p("Specialists: [medical oncology](" + MED + "), [surgical oncology](" + SURG + "), [radiation oncology](" + RAD + "), [Delhi NCR](" + DELHI + "), [Mumbai](" + MUMBAI + ")."),

  h2("When Should You See a Breast Specialist?"),
  ul([
    "A new lump in the breast or armpit.",
    "A lump that is growing or changing.",
    "Blood-stained nipple discharge.",
    "New nipple inversion.",
    "Skin dimpling, thickening, persistent redness or swelling.",
    "A change in breast shape or size.",
    "A persistent localised symptom that concerns you.",
  ]),
  p("Most lumps are not cancer, but evaluation matters. Related: [surgery](" + SURGERY + "), [follow-up after treatment](" + FOLLOW + "), [recurrence](" + RECUR + ")."),

  h2("How GAF Healthcare Can Help"),
  p("GAF Healthcare assists international patients coordinating breast specialist consultations, imaging and record review in India. Screening eligibility, diagnosis and treatment decisions remain with the treating clinicians."),
  btn("Talk to GAF about breast screening in India", consult("Breast Cancer Screening")),

  h2("Frequently Asked Questions"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Final Thoughts"),
  p("Breast cancer screening is important, but the right approach is not identical for everyone. In India, BISI supports considering annual mammography from age 40 for opportunistic screening, while public programmes use clinical breast examination for eligible women. High-risk women may need earlier, more intensive pathways."),
  p("Most importantly: **do not wait for a screening appointment if you notice a breast lump, nipple discharge, skin changes or another unusual symptom.**"),

  h2("Medical Sources and References"),
  ol([
    "[Breast Imaging Society, India – Best Practice Guidelines for Breast Imaging, Part 1](https://nams-annals.in/best-practice-guidelines-for-breast-imaging-breast-imaging-society-india-part-1/)",
    "[Breast Imaging Society, India – Best Practice Guidelines, Part 2](https://nams-annals.in/best-practice-guidelines-for-breast-imaging-breast-imaging-society-india-part-2/)",
    "[MoHFW – Operational Framework for Management of Common Cancers](https://aam.mohfw.gov.in/download/document/b09f1edf31a9165aebf486a55bbe54f5.pdf)",
    "[NCI – Screening for Breast Cancer](https://www.cancer.gov/types/breast/screening)",
    "[NCI – Breast Cancer Screening PDQ](https://www.cancer.gov/types/breast/hp/breast-screening-pdq)",
    "[American Cancer Society – Breast Cancer Screening Recommendations](https://www.cancer.org/cancer/types/breast-cancer/screening-tests-and-early-detection/american-cancer-society-recommendations-for-the-early-detection-of-breast-cancer.html)",
    "[NCCN Guidelines for Patients – Breast Cancer Screening and Diagnosis, 2026](https://vicc.org/sites/default/files/2026-10/breastcancerscreening-patient.pdf)",
    "[NCI – Dense Breasts: Commonly Asked Questions](https://www.cancer.gov/types/breast/screening/dense-breasts)",
    "[ACR Appropriateness Criteria – Female Breast Cancer Screening, 2025 Update](https://pubmed.ncbi.nlm.nih.gov/41193041/)",
    "[USPSTF Breast Cancer Screening Recommendation, 2024](https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/breast-cancer-screening)",
  ]),
  p("*Medical disclaimer: Screening recommendations differ between programmes and organisations. US sources are additional reading, not Indian national policy. Individual plans should follow personal risk and clinical assessment. A new breast symptom needs diagnostic evaluation, not only a routine screening slot.*"),

  h2("Related Reading"),
  ul([
    `[Breast Cancer Treatment in India](${TX})`,
    `[Breast Cancer Symptoms](${SYMP})`,
    `[Breast Cancer Diagnosis](${DIAG})`,
    `[Diagnosis tests (ER/PR/HER2)](${DIAG2})`,
    `[Breast Cancer Stages](${STAGES})`,
    `[Breast Cancer Follow-Up Tests](${FOLLOW})`,
    `[Breast Cancer Recurrence](${RECUR})`,
    `[Breast Cancer Surgery](${SURGERY})`,
    `[Young Women](${YOUNG})`,
    `[Treatment Cost](${COST})`,
    `[International Patients](${INTL})`,
  ]),
];

const now = new Date().toISOString();
const article = {
  id: "art_breast_cancer_screening_india",
  slug: SLUG,
  title: "Breast Cancer Screening in India: Mammography, Ultrasound, MRI, Screening Age and Cost Explained",
  excerpt:
    "Breast cancer screening can help detect cancer before symptoms appear. This guide explains when women in India should consider screening, how mammography, ultrasound and MRI differ, who may need additional tests, what happens after an abnormal result and how to understand screening costs.",
  date: "13 November 2026",
  publishedAt: "2026-11-13T10:00:00.000Z",
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Medical Oncology",
  tags: ["breast cancer", "screening", "mammography", "India", "early detection"],
  image: IMG1,
  imageAlt: "Woman discussing a breast cancer screening plan with a clinician",
  status: "published",
  featured: true,
  seoTitle: "Breast Cancer Screening in India: Age, Mammography, Tests and Cost",
  seoDescription:
    "Understand breast cancer screening in India, including the recommended age, mammography, ultrasound, MRI, high-risk screening, costs and what to expect.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: IMG1,
  allowIndex: true,
  keywords: [
    "Breast cancer screening in India",
    "Breast cancer screening age in India",
    "Mammography test in India",
    "Breast cancer screening cost in India",
    "Mammogram vs ultrasound",
    "Breast MRI for cancer screening",
    "Breast cancer screening guidelines",
    "Breast screening for women above 40",
    "Breast cancer early detection",
    "Breast cancer screening for high-risk women",
    "Digital mammography in India",
  ],
  relatedLinks: [
    { label: "Breast Cancer Treatment in India", href: TX },
    { label: "Breast cancer symptoms", href: SYMP },
    { label: "Breast cancer diagnosis", href: DIAG },
    { label: "Diagnosis tests", href: DIAG2 },
    { label: "Follow-up tests", href: FOLLOW },
    { label: "Cost guide", href: COST },
    { label: "International patients", href: INTL },
  ],
  blocks,
};

for (const [file, alt] of [
  ["breast-cancer-screening-overview.webp", article.imageAlt],
  ["breast-cancer-screening-mammography.webp", "Woman undergoing digital mammography with a technologist in a calm clinic"],
  ["breast-cancer-screening-ultrasound-mri.webp", "Clinician explaining breast ultrasound and MRI options"],
  ["breast-cancer-screening-high-risk.webp", "Genetic counsellor reviewing family history for high-risk breast screening"],
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
    llms = llms.replace(needle, `- [Blogs](https://gaf.healthcare/blogs): includes [breast cancer screening in India](https://gaf.healthcare/blogs/${SLUG}).`);
  } else {
    llms += `\n- [Breast cancer screening in India](https://gaf.healthcare/blogs/${SLUG})\n`;
  }
  writeFileSync(llmsPath, llms);
}

for (const relatedSlug of [
  "breast-cancer-symptoms",
  "breast-cancer-diagnosis",
  "breast-cancer-diagnosis-tests-biopsy-er-pr-her2",
  "breast-cancer-follow-up-tests",
  "breast-cancer-recurrence-treatment-india",
  "breast-cancer-treatment-cost-in-india",
  "breast-cancer-treatment-india-international-patients",
  "breast-cancer-in-young-women-treatment-india",
]) {
  const related = store.articles.find((r) => r.slug === relatedSlug);
  if (!related) continue;
  const href = `/blogs/${SLUG}`;
  related.relatedLinks = related.relatedLinks || [];
  if (!related.relatedLinks.some((r) => r.href === href)) {
    related.relatedLinks.push({ label: "Breast cancer screening in India", href });
  }
}
writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("linked related articles");
