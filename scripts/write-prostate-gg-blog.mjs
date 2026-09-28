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
const EBRT = "/costs/India/Radiation-Oncology/EBRT";
const IMRT = "/costs/India/Radiation-Oncology/IMRT";
const BRACHY = "/costs/India/Radiation-Oncology/Brachytherapy";
const RP = "/costs/India/Surgical-Oncology/Radical-Prostatectomy";
const HT = "/costs/India/Medical-Oncology/Hormone-Therapy";
const RAD_DOCS = "/doctors/India/Radiation-Oncology";
const SURG_DOCS = "/doctors/India/Surgical-Oncology";
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

const qaTable = `<div class="md-body"><table><thead><tr><th>Gleason pattern / score</th><th>Grade Group</th><th>General interpretation</th></tr></thead><tbody><tr><td>3+3=6</td><td><strong>1</strong></td><td>Lowest Grade Group used for prostate cancer</td></tr><tr><td>3+4=7</td><td><strong>2</strong></td><td>Intermediate grade</td></tr><tr><td>4+3=7</td><td><strong>3</strong></td><td>Higher-grade pattern than 3+4</td></tr><tr><td>8</td><td><strong>4</strong></td><td>High grade</td></tr><tr><td>9–10</td><td><strong>5</strong></td><td>Highest Grade Group</td></tr></tbody></table></div>`;

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body"><strong>What do Gleason score and Grade Group mean in prostate cancer?</strong></p><p class="article-quick-answer__body">The <strong>Gleason score</strong> describes how prostate cancer cells look under a microscope and how abnormal their growth pattern is. The pathologist identifies the main cancerous patterns, assigns grades to them, and combines the two most important patterns to produce a Gleason score.</p><p class="article-quick-answer__body">The <strong>Grade Group</strong> is a newer, simpler way of expressing the same underlying grading information on a scale from <strong>1 to 5</strong>.</p>${qaTable}<p class="article-quick-answer__body">A <strong>Gleason score is not the same as prostate cancer stage</strong>. Grade describes how the cancer looks and behaves biologically, while stage describes how far the cancer has spread. Doctors also consider PSA, MRI or other imaging, biopsy findings, lymph nodes, metastases, overall health and other factors before recommending treatment.</p></aside>`;

const chart = `<div class="md-body"><table><thead><tr><th>Gleason score</th><th>Common pattern</th><th>Grade Group</th><th>General grade</th></tr></thead><tbody><tr><td>6</td><td>3+3</td><td>1</td><td>Lowest grade</td></tr><tr><td>7</td><td>3+4</td><td>2</td><td>Intermediate</td></tr><tr><td>7</td><td>4+3</td><td>3</td><td>Higher intermediate</td></tr><tr><td>8</td><td>4+4, 3+5, 5+3</td><td>4</td><td>High grade</td></tr><tr><td>9</td><td>4+5, 5+4</td><td>5</td><td>Highest grade</td></tr><tr><td>10</td><td>5+5</td><td>5</td><td>Highest grade</td></tr></tbody></table></div>`;

const faqs = [
  ["What is the Gleason score in prostate cancer?", "The Gleason score is a grading system based on how prostate cancer cells and their glandular architecture look under a microscope. It helps estimate how aggressively the cancer may behave and contributes to treatment and risk assessment."],
  ["What is the normal Gleason score?", "There is no “normal” Gleason score because Gleason scoring is used to grade prostate cancer tissue. When cancer is present, the lowest commonly reported Gleason score is 6, corresponding to Grade Group 1."],
  ["Is Gleason 6 considered cancer?", "Yes. Gleason 3+3=6 is prostate cancer and corresponds to Grade Group 1. Many such cancers are slow-growing and may be suitable for active surveillance when other clinical factors are favorable."],
  ["Is Gleason 7 prostate cancer serious?", "Gleason 7 represents two different Grade Groups. 3+4=7 is Grade Group 2, while 4+3=7 is Grade Group 3. The distinction is clinically important."],
  ["Which is worse: Gleason 3+4 or 4+3?", "They have the same total score but different predominant patterns. 4+3=7 is Grade Group 3, while 3+4=7 is Grade Group 2, reflecting the greater predominance of pattern 4 in 4+3 disease."],
  ["What does Grade Group 1 mean?", "Grade Group 1 corresponds to Gleason 6 or less, usually 3+3=6. It is the lowest Grade Group used for prostate cancer."],
  ["What does Grade Group 2 mean?", "Grade Group 2 corresponds to Gleason 3+4=7. Pattern 3 is predominant and pattern 4 is present as a lesser component."],
  ["What does Grade Group 3 mean?", "Grade Group 3 corresponds to Gleason 4+3=7. Pattern 4 is predominant."],
  ["What does Grade Group 4 mean?", "Grade Group 4 generally corresponds to Gleason score 8, including combinations such as 4+4, 3+5 and 5+3."],
  ["What does Grade Group 5 mean?", "Grade Group 5 corresponds to Gleason scores 9 or 10 and represents the highest Grade Group."],
  ["Is Grade Group the same as Gleason score?", "No. Grade Group is a newer five-level system derived from Gleason grading. Both may appear together on a pathology report."],
  ["Can Gleason score change after prostate surgery?", "Yes. The prostate removed during surgery provides a larger tissue specimen than a biopsy, and the final pathology can reveal a different Grade Group or additional features."],
  ["Can a low Gleason score still spread?", "Yes, although lower-grade cancers generally have a lower likelihood of aggressive behavior. Stage and other clinical factors must also be assessed."],
  ["Does Gleason score determine life expectancy?", "No. Gleason score is an important prognostic factor, but life expectancy and individual prognosis depend on stage, PSA, overall health, age, treatment response and many other factors."],
  ["Can active surveillance be used with Gleason 6?", "Yes. Active surveillance is commonly considered for appropriately selected men with Grade Group 1 disease, depending on the complete risk profile."],
  ["Does Gleason score determine whether surgery is needed?", "No. Gleason score is one factor in treatment planning. Doctors also consider stage, PSA, MRI, tumor volume, overall health, life expectancy and patient preferences."],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("This is the grading hub for the prostate cluster. It sits between [diagnosis](" + DX + ") and [treatment options](" + OPTIONS + "), and next to [active surveillance](" + AS + "), [symptoms](" + SX + "), [robotic prostatectomy](" + RARP + "), [radiation](" + RAD + "), [brachytherapy](" + BRACHY_BLOG + ") and [Prostate Cancer Treatment in India](" + PILLAR + ")."),
  p("International patients comparing [surgical oncologists](" + SURG_DOCS + ") and [radiation oncologists](" + RAD_DOCS + ") commonly start with [Delhi NCR](/doctors/India/Delhi-NCR/Surgical-Oncology), [Mumbai](/doctors/India/Mumbai/Radiation-Oncology), [Bengaluru](/doctors/India/Bengaluru/Surgical-Oncology), [Chennai](/doctors/India/Chennai/Radiation-Oncology) and [Hyderabad](/doctors/India/Hyderabad/Surgical-Oncology)."),
  btn("Ask about a Gleason score or Grade Group", consult("Gleason Score Grade Group")),
  p("[WhatsApp +91 90443 46292 with your biopsy report](" + wa("Please review my prostate biopsy Gleason score and Grade Group and advise the next step in India.") + ")"),
  img(
    "/uploads/articles/pca-gg-anatomy.webp",
    "Transparent male body with a teal bladder above a gold-highlighted prostate in the pelvis",
    "Grade describes how the cancer looks under the microscope. It does not, by itself, say how large the tumour is or whether it has spread.",
  ),

  h2("What Is a Gleason Score?"),
  p("A Gleason score is a grading system used for **prostate cancer**."),
  p("It is determined by a pathologist who examines prostate tissue under a microscope, usually from a biopsy."),
  p("The pathologist looks at the arrangement of the cancer cells and asks: **how closely does the cancerous tissue resemble normal prostate tissue?**"),
  p("Prostate cancers can contain different microscopic patterns. Some areas may still form recognizable glands, while other areas may have poorly formed glands or lose normal glandular architecture."),
  p("In modern practice, prostate cancer is generally graded using patterns **3, 4 and 5**. Patterns 1 and 2 are essentially not used for diagnosing and reporting typical prostate adenocarcinoma."),
  p("The two most important patterns are then combined to produce the Gleason score. How that tissue is obtained is covered in [Prostate Cancer Diagnosis](" + DX + ")."),

  h2("What Does the Gleason Score Actually Measure?"),
  p("The Gleason score measures **tumor grade**, not tumor size."),
  p("A prostate tumor can be relatively small but contain high-grade cancer cells. Conversely, a larger localized tumor can sometimes have a lower Grade Group."),
  p("So the Gleason score does **not** directly tell you how large the prostate tumor is, whether cancer has spread to the lymph nodes or bones, whether the cancer is Stage 1, 2, 3 or 4, your PSA level, or whether surgery is definitely required."),
  p("It provides information about the **microscopic aggressiveness of the cancer**. Doctors combine that information with other findings to determine the overall risk and treatment strategy."),

  h2("How Is a Gleason Score Calculated?"),
  p("Suppose the pathology report says **Gleason 3+4=7**."),
  p("The first number, **3**, represents the most common cancer pattern seen in the sample. The second number, **4**, represents the next most significant pattern. The two numbers are added: **3 + 4 = 7**."),
  p("But the order matters. A **3+4=7** cancer is not considered biologically identical to a **4+3=7** cancer, because the first number represents the **predominant pattern**."),
  p("**3+4=7** means pattern 3 is predominant and pattern 4 is present but less extensive. **4+3=7** means pattern 4 is predominant and pattern 3 is the lesser component."),
  p("Although both have a total Gleason score of 7, **4+3=7 represents a higher Grade Group and generally carries a less favorable prognosis than 3+4=7**. This is one of the main reasons the Grade Group system was introduced."),
  img(
    "/uploads/articles/pca-gg-pathology.webp",
    "Male patient in clinic with a gold pelvic overlay while a clinician reviews biopsy pathology on a tablet",
    "If the report says Gleason 7, ask whether it is 3+4 (Grade Group 2) or 4+3 (Grade Group 3). The order is the clinical difference.",
  ),
  btn("Ask whether your Gleason 7 is 3+4 or 4+3", consult("Gleason 3+4 vs 4+3")),

  h2("Gleason Score vs Grade Group"),
  p("The two terms describe closely related information, but they are not the same thing."),
  p("The **Gleason score** uses the microscopic patterns identified by the pathologist: 3+3=6, 3+4=7, 4+3=7, 4+4=8, 4+5=9."),
  p("The **Grade Group** converts these findings into five groups from 1 to 5."),
  p("The Grade Group system makes it easier to understand that **Gleason 6 is at the lower end of clinically significant prostate cancer grading**, rather than being a middle value on a 2-to-10 scale. It also separates Gleason 7 into two clinically meaningful categories: **3+4 and 4+3**."),

  h2("Grade Group 1 to 5: Complete Guide"),
  h3("Grade Group 1"),
  p("**Gleason score: 6 or less.** The usual report is **Gleason 3+3=6**."),
  p("The cancer is made up predominantly of well-formed glands corresponding to Gleason pattern 3. Grade Group 1 represents the lowest Grade Group used for prostate cancer."),
  p("Many Grade Group 1 cancers grow slowly and, when they meet other low-risk criteria, may be managed with **[active surveillance](" + AS + ")** rather than immediate treatment."),
  p("However, Grade Group alone does not determine whether surveillance is appropriate. PSA, tumor volume, MRI findings, clinical stage and biopsy characteristics also matter."),
  p("[WhatsApp +91 90443 46292 about Grade Group 1](" + wa("I have Gleason 3+3=6 / Grade Group 1. Please advise whether active surveillance in India is appropriate.") + ")"),

  h3("Grade Group 2"),
  p("**Gleason score: 3+4=7.** Pattern 3 remains predominant, but there is a component of pattern 4."),
  p("A patient with Gleason 3+4=7 should not simply be described as having the same cancer as someone with Gleason 4+3=7."),
  p("The percentage of Gleason pattern 4 may be reported in pathology reports and can help further characterize Grade Group 2 disease."),

  h3("Grade Group 3"),
  p("**Gleason score: 4+3=7.** Pattern 4 is predominant."),
  p("This is why **Gleason 4+3=7 is Grade Group 3**, while **3+4=7 is Grade Group 2**. The total score is still 7, but the biological implications are different."),
  p("This is one of the most important details to look for when reading a prostate biopsy report."),
  p("[WhatsApp +91 90443 46292 about Grade Group 2 or 3](" + wa("I have Gleason 7 prostate cancer. Please check whether it is 3+4 or 4+3 and advise treatment options in India.") + ")"),

  h3("Grade Group 4"),
  p("**Gleason score: 8**, including 4+4=8, 3+5=8 and 5+3=8."),
  p("These cancers contain a greater proportion of high-grade patterns. Grade Group 4 is generally considered **high-grade prostate cancer** and often places a patient into a higher-risk category, depending on PSA, clinical stage and other findings."),

  h3("Grade Group 5"),
  p("**Gleason score: 9 or 10**, including 4+5=9, 5+4=9 and 5+5=10."),
  p("Grade Group 5 represents the highest grade category. These cancers contain substantial high-grade patterns and have a greater likelihood of aggressive behavior and spread compared with lower Grade Groups."),
  p("However, even Grade Group 5 does not by itself tell you whether the cancer is localized or metastatic. **Stage still matters.**"),

  h2("Gleason Score and Grade Group Chart"),
  html(chart),
  p("This five-group classification is based on the modern Grade Group system developed through international pathology consensus and incorporated into contemporary prostate cancer classification."),

  h2("Why Is Gleason 3+4 Different From 4+3?"),
  p("This is probably the single most important question patients ask after seeing a Gleason score of 7. Both are technically Gleason 7. But the first number tells you which pattern dominates."),
  p("**Gleason 3+4=7:** pattern 3 is predominant; pattern 4 is present but represents a smaller component. **Grade Group 2.**"),
  p("**Gleason 4+3=7:** pattern 4 is predominant; pattern 3 represents the smaller component. **Grade Group 3.**"),
  p("Because pattern 4 is a higher-grade architectural pattern, having it as the predominant pattern is clinically more significant."),

  h2("What Are Gleason Patterns 3, 4 and 5?"),
  p("**Pattern 3** generally consists of recognizable, relatively well-formed individual glands. A cancer consisting of Gleason pattern 3 alone is generally reported as **3+3=6** and classified as **Grade Group 1**."),
  p("**Pattern 4** represents more abnormal glandular architecture. It can include poorly formed glands, fused glands, cribriform architecture and other recognized pattern 4 structures. Modern pathology classifications have specifically refined the definition of pattern 4. Cribriform and glomeruloid structures are recognized as Gleason pattern 4."),
  p("**Pattern 5** represents the most abnormal growth pattern. There is little or no recognizable glandular formation. Necrosis may also be present in certain pattern 5 configurations. Pattern 5 contributes to Gleason scores of 8, 9 and 10."),

  h2("What Does Gleason 6 Mean?"),
  p("A diagnosis of **Gleason 6** can sound more serious than it actually is because patients naturally see “6 out of 10” and assume it is in the middle of the scale."),
  p("That interpretation is misleading. In modern clinical prostate cancer grading, **Gleason 6 is the lowest score generally assigned to prostate cancer**. It corresponds to **Grade Group 1.**"),
  p("It does not mean the cancer is “medium grade” simply because the number is 6. This was one of the reasons Grade Groups were introduced."),

  h2("Is Gleason 6 Really Cancer?"),
  p("Yes. Gleason 3+3=6 prostate adenocarcinoma is still classified as prostate cancer."),
  p("However, many Grade Group 1 cancers behave very differently from high-grade prostate cancers. Some grow extremely slowly and may never cause symptoms or become clinically significant during a patient's lifetime."),
  p("That is why selected men with Grade Group 1 disease may be monitored through **[active surveillance](" + AS + ")** rather than treated immediately. The decision depends on the complete clinical picture rather than the Gleason score alone."),

  h2("What Does Gleason 7, 8, 9 or 10 Mean?"),
  p("Gleason 7 is not one single category. **3+4=7 is Grade Group 2**; **4+3=7 is Grade Group 3**. When a pathology report says simply “Gleason 7,” check the actual pattern."),
  p("Gleason 8 is **Grade Group 4** (4+4, 3+5 or 5+3). It is generally considered high-grade and often requires a more intensive evaluation of stage and overall risk."),
  p("Gleason 9 and 10 are **Grade Group 5**. They contain substantial amounts of Gleason pattern 5 and are considered high-grade cancers with a greater risk of progression and spread."),
  p("**Grade Group 5 does not automatically mean Stage 4.** A Grade Group 5 tumor can still be confined to the prostate. Conversely, prostate cancer with a lower Grade Group can sometimes have spread to lymph nodes or distant organs."),
  img(
    "/uploads/articles/pca-gg-localized.webp",
    "Male patient in clinic with a gold overlay of bladder and prostate while a clinician explains localized disease",
    "High Grade Group can still be confined to the gland. Low Grade Group can still have spread. Grade and stage answer different questions.",
  ),

  h2("Gleason Score vs Prostate Cancer Stage"),
  p("These terms are often confused. They should not be used interchangeably."),
  p("**Gleason score / Grade Group** answers: how abnormal and potentially aggressive does the cancer look under the microscope?"),
  p("**Stage** answers: how far has the cancer spread? Staging incorporates T (primary tumor), N (regional lymph nodes), M (distant metastases), PSA and Grade Group."),
  p("A patient could have **Grade Group 5 + localized disease**, or **Grade Group 2 + metastatic disease**. These are very different clinical situations."),
  img(
    "/uploads/articles/pca-gg-stage.webp",
    "Transparent male figure with a gold prostate, teal pelvic nodes and a gold spine highlight used to explain staging versus grade",
    "Stage asks whether disease is in the prostate, nodes or bones. Gleason asks how the sampled tissue looks. Both are needed before treatment is chosen.",
  ),

  h2("Gleason Score vs PSA"),
  p("PSA is a blood test measuring prostate-specific antigen. Gleason score is based on microscopic examination of cancer tissue."),
  p("A patient may have high PSA with a lower Grade Group, lower PSA with a higher Grade Group, or both high, or both low. Doctors interpret these findings together."),
  p("PSA can also be affected by conditions other than cancer, including benign prostate enlargement and prostatitis. Therefore, PSA alone does not determine cancer grade. See [symptoms](" + SX + ") and [diagnosis](" + DX + ")."),

  h2("Gleason Score vs Risk Group"),
  p("For localized prostate cancer, doctors commonly combine PSA, Grade Group, clinical T stage, number of positive biopsy cores, percentage of cancer in cores, MRI findings and other pathology features."),
  p("This can place a patient into very low, low, favorable intermediate, unfavorable intermediate, high or very high risk."),
  p("**Grade Group is one component of risk classification, not the entire risk classification.**"),

  h2("Why Does the Percentage of Gleason Pattern 4 Matter?"),
  p("Two patients can both have **Gleason 3+4=7 / Grade Group 2** but have different amounts of pattern 4."),
  p("The pathology report may therefore include the **percentage of Gleason pattern 4**. This can provide additional information when doctors are assessing the biological characteristics of a Grade Group 2 cancer."),
  p("Pathology reporting standards have emphasized documenting pattern 4, particularly in Gleason score 7 cancers. Do not stop reading after “Gleason 7.”"),

  h2("What Is Cribriform Pattern?"),
  p("Cribriform architecture describes a particular microscopic arrangement in which tumor cells form sieve-like or perforated glandular structures."),
  p("Modern prostate cancer pathology recognizes **invasive cribriform carcinoma as an important adverse pathological feature**. The 2019 International Society of Urological Pathology consensus specifically addressed cribriform carcinoma and intraductal carcinoma."),
  p("If your pathology report mentions **“cribriform pattern present,”** discuss the finding with your urologist or pathologist. It may provide additional information beyond the headline Gleason score."),

  h2("What Is Intraductal Carcinoma of the Prostate?"),
  p("**Intraductal carcinoma of the prostate (IDC-P)** is a distinct pathological finding involving malignant cells growing within pre-existing prostate ducts or acini."),
  p("It is important because it can be associated with more aggressive prostate cancer. Modern pathology recommendations specifically address how intraductal carcinoma should be reported."),
  p("If IDC-P is mentioned on your pathology report, ask your treating team how it affects your risk assessment."),
  p("[WhatsApp +91 90443 46292 if cribriform or IDC-P is mentioned](" + wa("My prostate biopsy mentions cribriform pattern or intraductal carcinoma. Please review the report and advise next steps in India.") + ")"),

  h2("Can Different Biopsy Cores Have Different Gleason Scores?"),
  p("Yes. A biopsy samples multiple areas of the prostate. Cancer may not have exactly the same microscopic appearance everywhere."),
  p("One core could show 3+3=6, another 3+4=7, and another 4+3=7. Doctors consider the complete biopsy rather than looking at only one core. The highest-grade finding may be particularly important when discussing treatment options."),

  h2("What Does “Number of Positive Cores” Mean?"),
  p("A prostate biopsy commonly involves multiple tissue cores. **Cancer present in 4 of 12 cores** means cancer was identified in four of the twelve sampled cores."),
  p("The report may also provide length of cancer in each core, percentage of each core involved, location of positive cores, Gleason pattern, Gleason score and Grade Group."),
  p("These details help doctors understand the **volume and distribution** of cancer within the sampled prostate tissue. A Gleason score should therefore never be interpreted completely in isolation."),

  h2("Can a Prostate Biopsy Underestimate the Gleason Score?"),
  p("Yes. A biopsy samples only selected areas of the prostate. It is possible for a biopsy to miss a higher-grade area elsewhere in the gland."),
  p("This is one reason doctors sometimes recommend multiparametric MRI, MRI-targeted biopsy, repeat biopsy, pathology review or additional imaging. See [diagnosis](" + DX + ")."),
  p("If the prostate is subsequently removed during [radical prostatectomy](" + RARP + "), the entire specimen can be examined. The final surgical pathology can sometimes show a different Grade Group from the original biopsy."),

  h2("Can the Gleason Score Change After Surgery?"),
  p("Yes. After [radical prostatectomy](" + RARP + "), the entire prostate can be examined."),
  p("The surgical pathology may show the same Grade Group, a higher Grade Group, a different tumor extent, extraprostatic extension, seminal vesicle involvement, positive or negative surgical margins, and lymph node involvement if nodes were removed."),
  p("This is sometimes referred to as **pathological upgrading**. It does not necessarily mean that the cancer suddenly became more aggressive. It can mean that the biopsy did not capture the complete tumor architecture."),

  h2("Does a Higher Gleason Score Always Mean a Higher Stage?"),
  p("No. **Grade and stage are separate.**"),
  p("A high-grade tumor can remain localized. For example, a patient can have **Grade Group 5 + N0 + M0** — a high-grade cancer without documented lymph-node or distant metastatic spread."),
  p("On the other hand, a lower-grade cancer can sometimes spread beyond the prostate."),

  h2("Does Gleason Score Determine Treatment?"),
  p("It strongly influences treatment planning, but it does not determine treatment by itself."),
  p("Treatment decisions may consider Grade Group, Gleason pattern, PSA, MRI findings, clinical stage, number and extent of positive biopsy cores, lymph node status, metastatic disease, age, overall health, life expectancy, previous treatment and patient preferences."),
  p("Depending on the disease, options can include [active surveillance](" + AS + "), [radical prostatectomy](" + RARP + "), [external beam radiation](" + RAD + "), [brachytherapy](" + BRACHY_BLOG + "), androgen deprivation therapy, other systemic treatments, targeted or radiopharmaceutical treatment for selected advanced disease, and clinical trials."),
  p("If treatment follows, GAF Healthcare planning ranges in India include [radical prostatectomy](" + RP + ") **$7,000–$18,000**, [EBRT](" + EBRT + ") **$1,000–$6,000+**, [IMRT](" + IMRT + ") **$6,500–$14,500**, [brachytherapy](" + BRACHY + ") **$5,500–$13,000** and [hormone therapy](" + HT + ") **$1,000–$4,500**. City pages such as [Delhi NCR prostatectomy](/costs/India/Delhi-NCR/Surgical-Oncology/Radical-Prostatectomy) use the same national ranges unless a hospital issues a verified quotation."),
  btn("Ask how Grade Group should change the treatment plan", consult("Gleason Score Treatment Options")),

  h2("Can Grade Group 1 Be Treated Without Surgery?"),
  p("Yes. For appropriately selected patients with Grade Group 1 prostate cancer, **[active surveillance](" + AS + ")** may be an option."),
  p("Active surveillance is not the same as ignoring the cancer. It involves monitoring through PSA testing, digital rectal examination when appropriate, MRI, repeat biopsy and other clinical assessments."),
  p("If evidence suggests that the cancer is becoming more significant, treatment can then be considered. Not every patient with Grade Group 1 disease is automatically suitable for surveillance."),

  h2("Does Grade Group 2 Always Require Treatment?"),
  p("No single Grade Group automatically determines treatment."),
  p("Some patients with favorable Grade Group 2 disease may be considered for active surveillance in carefully selected circumstances. Other patients may have larger tumor volume, higher PSA, more extensive pattern 4, unfavorable MRI findings, higher clinical stage or adverse pathological features that make definitive treatment more appropriate."),

  h2("What Does a Gleason Score Mean for Prognosis?"),
  p("In general, a lower Grade Group means a lower likelihood of aggressive behavior, and a higher Grade Group means a greater likelihood of aggressive behavior."),
  p("But prognosis cannot be calculated accurately from Gleason score alone. Doctors also consider stage, PSA, tumor volume, lymph node status, metastatic disease, imaging, pathology details, response to treatment, and whether the cancer is newly diagnosed or recurrent."),
  p("NCI and the American Cancer Society both emphasize that Grade Group is an important component of prognosis but should be interpreted alongside other disease characteristics."),

  h2("What Do Common Report Lines Mean in Plain Language?"),
  p("**Gleason 3+4=7, Grade Group 2:** the biopsy found prostate cancer in which the predominant microscopic pattern is Gleason pattern 3, with a smaller component of pattern 4. This does not by itself tell you the cancer stage, whether it has spread, or whether surgery is necessary."),
  p("**Gleason 4+3=7, Grade Group 3:** the predominant microscopic pattern is Gleason pattern 4, with a smaller component of pattern 3. This is a higher Grade Group than 3+4=7. The difference is which pattern dominates, not the total number."),
  p("**Gleason 4+5=9, Grade Group 5:** the biopsy contains a predominant Gleason pattern 4 and a substantial secondary pattern 5. This is the highest Grade Group. The next step is to determine the full extent of the cancer using examination, imaging, PSA and appropriate staging investigations."),

  h2("How Doctors Read a Prostate Cancer Pathology Report"),
  ol([
    "Is cancer present?",
    "What is the Gleason score (3+3, 3+4, 4+3, 4+4, 4+5)?",
    "What is the Grade Group (1–5)?",
    "How many biopsy cores are positive?",
    "How much cancer is present in each core (percentage or millimetres)?",
    "Is Gleason pattern 4 present, and is its percentage reported?",
    "Are cribriform or intraductal features mentioned?",
    "What does MRI show?",
    "What is the PSA?",
    "What is the clinical stage?",
  ]),
  p("Only after putting these pieces together can the treatment options be properly discussed. Compare [surgical hospitals](" + SURG_HOSP + ") in [Delhi NCR](/hospitals/India/Delhi-NCR/Surgical-Oncology) and [Mumbai](/hospitals/India/Mumbai/Surgical-Oncology) when a second look is needed."),

  h2("Why Two Men With the Same Gleason Score May Receive Different Treatments"),
  p("Imagine two patients who both have **Gleason 3+4=7**."),
  p("One may have low PSA, small-volume disease, favorable MRI, limited positive biopsy cores and no evidence of spread. Another may have higher PSA, extensive disease in multiple cores, more pattern 4, unfavorable imaging and higher clinical stage."),
  p("The same Gleason score does not mean the same overall risk. Prostate cancer treatment is based on a **combination of pathological, laboratory and imaging findings**, not a single number. See [treatment options](" + OPTIONS + ")."),

  h2("Can a Pathologist Recheck the Gleason Score?"),
  p("Yes. A pathology review can be useful when the diagnosis has major treatment implications or when there is uncertainty about the grade."),
  p("This may be particularly relevant when the Gleason score is 7 or higher, major surgery or radiation is being considered, [active surveillance](" + AS + ") is being considered, pathology and imaging do not seem to match, or there is a disagreement between pathology reports."),
  p("A second pathology opinion from a specialist genitourinary pathologist can sometimes clarify the Grade Group or other important features."),
  btn("Ask for a pathology second opinion", consult("Prostate Pathology Review")),
  p("[WhatsApp +91 90443 46292 to send slides or the biopsy PDF](" + wa("I would like a genitourinary pathology review of my prostate biopsy Gleason score and Grade Group in India.") + ")"),

  h2("Does MRI or PSMA PET Replace the Gleason Score?"),
  p("No. MRI can provide information about suspicious lesions, tumor location, local extension, possible extracapsular disease and seminal vesicle involvement. Biopsy provides tissue for Gleason patterns, Gleason score, Grade Group and other pathological characteristics."),
  p("PSMA PET can help identify prostate cancer deposits elsewhere in the body in appropriate clinical settings. The biopsy provides microscopic information about the cancer. The two tests complement each other rather than replacing each other. See [diagnosis](" + DX + ") and [recurrence after surgery](" + RECUR + ")."),

  h2("Gleason Score and Active Surveillance, Surgery, Radiation and Hormone Therapy"),
  p("Patients with **Grade Group 1** disease are commonly considered for [active surveillance](" + AS + ") when other criteria are favorable. Selected patients with **Grade Group 2** disease may also be considered in carefully chosen circumstances."),
  p("The biopsy Grade Group helps the team assess whether [radical prostatectomy](" + RARP + ") may be appropriate. After surgery, the entire prostate specimen is examined and can provide a more complete picture than the original biopsy."),
  p("For higher-risk localized or locally advanced prostate cancer, [radiation](" + RAD + ") may be combined with hormonal treatment depending on the overall risk profile. Forms include EBRT, IMRT, IGRT, SBRT in selected patients, [brachytherapy](" + BRACHY_BLOG + ") and combination approaches."),
  p("Hormone therapy (ADT) may be used with radiation for selected higher-risk localized or locally advanced disease, and is a major component of treatment for many patients with advanced or metastatic prostate cancer. Stage, metastatic status and previous treatment matter as much as Grade Group. See [hormone therapy cost](" + HT + ")."),

  h2("Is Gleason Score the Same as ISUP Grade?"),
  p("You may see the term **ISUP Grade Group** on some reports."),
  p("For practical purposes: ISUP Grade Group 1 → Gleason 6; 2 → 3+4=7; 3 → 4+3=7; 4 → Gleason 8; 5 → Gleason 9–10."),
  p("The terminology may vary slightly between pathology reports, institutions and countries, but the underlying five-group classification is widely used."),

  h2("Common Mistakes Patients Make When Reading a Gleason Report"),
  ul([
    "**Thinking Gleason 6 means “60% cancer.”** It does not. Gleason 6 is a grade, not a percentage.",
    "**Thinking Gleason 7 is always the same.** 3+4=7 and 4+3=7 belong to different Grade Groups.",
    "**Assuming Gleason score equals stage.** Grade and stage describe different aspects of cancer.",
    "**Looking only at the highest number.** The pattern combination matters.",
    "**Ignoring biopsy volume.** Positive cores and amount of cancer in each core add information.",
    "**Assuming the biopsy is the final word.** MRI, repeat biopsy or surgical pathology may provide additional information.",
  ]),

  h2("Questions to Ask Your Urologist After Receiving a Gleason Score"),
  ol([
    "What is my exact Gleason score?",
    "Is it 3+4 or 4+3?",
    "What is my Grade Group?",
    "How many biopsy cores contain cancer?",
    "What percentage of each core is involved?",
    "What percentage of the tumor is Gleason pattern 4?",
    "Is cribriform architecture present?",
    "Is intraductal carcinoma present?",
    "What is my PSA level?",
    "What does my MRI show?",
    "What is my clinical stage?",
    "Is the disease considered low, intermediate, high or very high risk?",
    "Do I need additional staging scans?",
    "Would a specialist pathology review be useful?",
    "What treatment options are appropriate for my specific risk group?",
    "Is active surveillance appropriate in my case?",
    "If treatment is recommended, why is that treatment being proposed?",
    "Would surgery, radiation or another approach be reasonable alternatives?",
  ]),

  h2("Gleason Score and Grade Group: Simple Summary"),
  p("**Gleason score** = microscopic pattern information. **Grade Group** = simplified 1-to-5 grading system. **PSA** = blood marker. **Stage** = how far the cancer has spread. **Risk group** = combination of several clinical factors."),
  p("Grade Group 1 → Gleason 6. Grade Group 2 → Gleason 3+4=7. Grade Group 3 → Gleason 4+3=7. Grade Group 4 → Gleason 8. Grade Group 5 → Gleason 9–10."),
  p("The most important practical lesson is that **no single number tells the entire story**. A prostate cancer diagnosis needs to be interpreted using the pathology report, PSA, imaging, clinical stage and other relevant patient factors."),

  h2("Frequently Asked Questions"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Related Prostate Cancer Resources"),
  p("This article is the grading hub. Other cluster pages keep their own search intent:"),
  ul([
    "[Prostate Cancer Diagnosis](" + DX + ") — how biopsy tissue is obtained and how PSA, MRI and PSMA PET fit around it.",
    "[Prostate Cancer Symptoms](" + SX + ") — why grade is not the same as how you feel.",
    "[Active Surveillance for Prostate Cancer](" + AS + ") — Grade Group 1 and selected Grade Group 2.",
    "[Prostate Cancer Treatment Options](" + OPTIONS + ") — how teams choose first treatment after Grade Group and stage.",
    "[Prostate Cancer Treatment Without Surgery](" + NONSURG + ") — radiation, hormone therapy and other options.",
    "[Robotic Prostatectomy in India](" + RARP + ") — surgery and the final prostatectomy pathology.",
    "[Radiation Therapy for Prostate Cancer](" + RAD + ") — IMRT, IGRT and SBRT when grade supports radiation.",
    "[Brachytherapy for Prostate Cancer](" + BRACHY_BLOG + ") — internal radiation for selected grades.",
    "[Prostate Cancer Recurrence After Surgery](" + RECUR + ") — Grade Group remains relevant if PSA later rises.",
    "[Prostate Cancer Diet](" + DIET + ") — eating during later treatment.",
    "[Prostate Cancer Treatment in India](" + PILLAR + ") — staging, PSMA PET and Lutetium-177 PSMA therapy.",
  ]),

  h2("How GAF Healthcare Can Help"),
  p("GAF Healthcare coordinates international patients who have a new Gleason score and need a second look in India. Share the full biopsy PDF (not only “Gleason 7”), every PSA date, MRI files, and slides or blocks if a pathology review is needed. A coordinator can arrange a [uro-oncologist](" + SURG_DOCS + ") and, when radiation is on the table, a [radiation oncologist](" + RAD_DOCS + "), then help set [active surveillance](" + AS + "), [surgery](" + RARP + ") or [radiation](" + RAD + ") if the complete picture supports it."),
  btn("Share a biopsy report for a Grade Group review", consult("Gleason Score Grade Group")),
  p("[WhatsApp +91 90443 46292 with your pathology PDF](" + wa("I would like to share my prostate biopsy Gleason score, Grade Group and PSA for a second opinion in India.") + ")"),

  h2("Medical Disclaimer"),
  p("This article is intended for general educational purposes and should not be used as a substitute for medical advice, diagnosis or treatment."),
  p("A Gleason score or Grade Group should always be interpreted together with the complete pathology report, PSA, imaging, clinical stage and other medical information."),
  p("If you have recently received a prostate biopsy report, discuss the findings with a qualified urologist, uro-oncologist, radiation oncologist or specialist pathologist before making treatment decisions."),

  h2("Top 5 Sources"),
  p("1. [American Cancer Society — Understanding Your Pathology Report: Prostate Cancer](https://www.cancer.org/cancer/diagnosis-staging/tests/pathology-reports/prostate-pathology/prostate-cancer-pathology.html) — how to read Gleason score, Grade Group and cores."),
  p("2. [NCI — Prostate Cancer Treatment (PDQ)](https://www.cancer.gov/types/prostate/patient/prostate-treatment-pdq) — grade, stage and how they feed treatment."),
  p("3. [American Cancer Society — Prostate Cancer Staging](https://www.cancer.org/cancer/types/prostate-cancer/detection-diagnosis-staging/staging.html) — why Grade Group is not the same as stage."),
  p("4. [ISUP 2019 Consensus on Grading of Prostatic Carcinoma](https://pubmed.ncbi.nlm.nih.gov/32459716/) — cribriform, intraductal carcinoma and modern Grade Groups."),
  p("5. [College of American Pathologists — Prostate Cancer Pathology Protocol](https://www.cap.org/protocols-and-guidelines/cancer-reporting-tools/cancer-protocol-templates) — how pattern 4 percentage and cores are reported."),
  p("**Last reviewed against the cited sources: September 2026.**"),
];

const now = "2026-09-28T08:30:00.000Z";
const SLUG = "gleason-score-grade-group-prostate-cancer";

const article = {
  id: "art_gleason_score_grade_group_prostate_cancer",
  slug: SLUG,
  title: "Gleason Score and Grade Group in Prostate Cancer: What Do They Mean?",
  excerpt:
    "Gleason 3+4 is not the same as 4+3. Grade Group 1–5 explains the microscope; stage explains spread. How to read a prostate biopsy report.",
  date: "28 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Surgical Oncology",
  tags: ["prostate cancer", "Gleason score", "Grade Group", "biopsy", "pathology", "India"],
  image: "/uploads/articles/pca-gg-anatomy.webp",
  imageAlt: "Transparent male body with a teal bladder above a gold-highlighted prostate in the pelvis",
  status: "published",
  featured: true,
  seoTitle: "Gleason Score and Grade Group in Prostate Cancer",
  seoDescription:
    "Gleason 6 is Grade Group 1, not “medium.” Why 3+4 differs from 4+3, what Grade Groups 1–5 mean, and how grade is not the same as stage.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/pca-gg-anatomy.webp",
  allowIndex: true,
  keywords: [
    "Gleason score and Grade Group",
    "Gleason score prostate cancer",
    "Grade Group prostate cancer",
    "Gleason 6",
    "Gleason 7 prostate cancer",
    "Gleason 3+4 vs 4+3",
    "Gleason score 8",
    "Gleason score 9",
    "Grade Group 1 to 5",
    "prostate biopsy report",
    "prostate cancer grading",
  ],
  relatedLinks: [
    { label: "Prostate cancer diagnosis", href: DX },
    { label: "Active surveillance", href: AS },
    { label: "Treatment options", href: OPTIONS },
    { label: "Robotic Prostatectomy in India", href: RARP },
    { label: "Radiation Therapy for Prostate Cancer", href: RAD },
    { label: "Prostate Cancer Treatment in India", href: PILLAR },
  ],
  blocks,
};

if (!store.categories.includes("Surgical Oncology")) store.categories.push("Surgical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["pca-gg-anatomy.webp", article.imageAlt],
  [
    "pca-gg-pathology.webp",
    "Male patient in clinic with a gold pelvic overlay while a clinician reviews biopsy pathology on a tablet",
  ],
  [
    "pca-gg-localized.webp",
    "Male patient in clinic with a gold overlay of bladder and prostate while a clinician explains localized disease",
  ],
  [
    "pca-gg-stage.webp",
    "Transparent male figure with a gold prostate, teal pelvic nodes and a gold spine highlight used to explain staging versus grade",
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

const ggLink = { label: "Gleason score and Grade Group", href: GG };
for (const siblingId of [
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
  if (!sibling.relatedLinks.some((row) => row.href === GG)) {
    sibling.relatedLinks.unshift(ggLink);
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length);

const treatmentsPath = join(process.cwd(), "content/curated-treatments.json");
const treatments = JSON.parse(readFileSync(treatmentsPath, "utf8"));
const treatment = treatments.treatments.find((row) => row.slug === "prostate-cancer-treatment-in-india");
if (treatment?.translations?.en?.editorialBody && !treatment.translations.en.editorialBody.includes(GG)) {
  treatment.translations.en.editorialBody = treatment.translations.en.editorialBody.replace(
    "How PSA, MRI, biopsy and PSMA PET fit together is covered in [Prostate Cancer Diagnosis](/blogs/prostate-cancer-diagnosis-psa-mri-biopsy-psma-pet).",
    "How PSA, MRI, biopsy and PSMA PET fit together is covered in [Prostate Cancer Diagnosis](/blogs/prostate-cancer-diagnosis-psa-mri-biopsy-psma-pet). How Gleason score and Grade Group are read is covered in [Gleason Score and Grade Group](/blogs/gleason-score-grade-group-prostate-cancer).",
  );
  writeFileSync(treatmentsPath, `${JSON.stringify(treatments, null, 2)}\n`);
  console.log("linked Gleason blog from treatment editorial");
}

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes("gleason-score-grade-group-prostate-cancer")) {
  llms = llms.replace(
    "and [prostate cancer symptoms](https://gaf.healthcare/blogs/prostate-cancer-symptoms).",
    ", [prostate cancer symptoms](https://gaf.healthcare/blogs/prostate-cancer-symptoms) and [Gleason score and Grade Group](https://gaf.healthcare/blogs/gleason-score-grade-group-prostate-cancer).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}
