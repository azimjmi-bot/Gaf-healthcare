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
const EBRT = "/costs/India/Radiation-Oncology/EBRT";
const IMRT = "/costs/India/Radiation-Oncology/IMRT";
const BRACHY = "/costs/India/Radiation-Oncology/Brachytherapy";
const RP = "/costs/India/Surgical-Oncology/Radical-Prostatectomy";
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

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body"><strong>What is active surveillance for prostate cancer?</strong></p><p class="article-quick-answer__body"><strong>Active surveillance is a structured monitoring strategy for selected men with localized prostate cancer who may not need immediate surgery or radiation.</strong></p><p class="article-quick-answer__body">The goal is not to ignore cancer.</p><p class="article-quick-answer__body">Instead, doctors monitor the cancer closely using tests such as:</p><ul class="article-quick-answer__list"><li>PSA testing</li><li>Digital rectal examination when appropriate</li><li>Prostate MRI</li><li>Repeat biopsy</li><li>Other clinical assessments</li></ul><p class="article-quick-answer__body">If the cancer shows signs of becoming more aggressive or progressing, definitive treatment can be started.</p><p class="article-quick-answer__body">Active surveillance is most commonly considered for <strong>very-low-risk and low-risk localized prostate cancer</strong>, and it may also be appropriate for selected men with <strong>favorable intermediate-risk disease</strong>. The decision depends on Grade Group, PSA, stage, tumor volume, MRI findings, PSA density, life expectancy and patient preferences. (<a href="https://www.cancer.gov/types/prostate/patient/prostate-treatment-pdq">cancer.gov</a>)</p><p class="article-quick-answer__body"><strong>Active surveillance is not the same as doing nothing. It is treatment delayed unless monitoring shows that treatment is needed.</strong></p></aside>`;

const wwTable = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Active surveillance</th><th>Watchful waiting</th></tr></thead><tbody><tr><td>Main goal</td><td>Delay treatment while preserving curative treatment if progression occurs</td><td>Avoid burdensome treatment unless symptoms develop</td></tr><tr><td>Typical patients</td><td>Low-risk and selected favorable intermediate-risk disease</td><td>Often older or less healthy men</td></tr><tr><td>PSA monitoring</td><td>Regular</td><td>Usually less intensive</td></tr><tr><td>MRI</td><td>May be used</td><td>Less central</td></tr><tr><td>Repeat biopsy</td><td>May be part of protocol</td><td>Usually not routine</td></tr><tr><td>Treatment trigger</td><td>Evidence of disease progression</td><td>Symptoms or clinically important progression</td></tr><tr><td>Curative treatment remains an objective?</td><td>Yes</td><td>Usually not the primary objective</td></tr></tbody></table></div>`;

const vsSurgery = `<div class="md-body"><table><thead><tr><th>Active surveillance</th><th>Radical prostatectomy</th></tr></thead><tbody><tr><td>No immediate surgery</td><td>Prostate is surgically removed</td></tr><tr><td>Requires regular monitoring</td><td>Provides complete surgical pathology</td></tr><tr><td>Avoids immediate surgical side effects</td><td>Potential urinary and sexual side effects</td></tr><tr><td>Treatment can be started later</td><td>Definitive treatment occurs immediately</td></tr><tr><td>Appropriate for selected lower-risk disease</td><td>Used for appropriately selected localized/locally advanced disease</td></tr></tbody></table></div>`;

const vsRad = `<div class="md-body"><table><thead><tr><th>Active surveillance</th><th>Radiation therapy</th></tr></thead><tbody><tr><td>Monitoring without immediate definitive treatment</td><td>Active cancer treatment</td></tr><tr><td>PSA/MRI/biopsy follow-up</td><td>Radiation delivered over a planned course</td></tr><tr><td>No immediate radiation side effects</td><td>Potential urinary, bowel and sexual effects</td></tr><tr><td>Treatment remains available if progression occurs</td><td>Definitive treatment begins immediately</td></tr><tr><td>Selected lower-risk disease</td><td>Selected localized and locally advanced disease</td></tr></tbody></table></div>`;

const faqs = [
  ["What is active surveillance for prostate cancer?", "Active surveillance is a structured monitoring strategy for selected patients with localized prostate cancer. Treatment is deferred unless tests indicate that the cancer is becoming more aggressive or progressing."],
  ["Is active surveillance the same as no treatment?", "No. Active surveillance involves regular monitoring with the intention of starting definitive treatment if the cancer progresses."],
  ["Who is the best candidate for active surveillance?", "Men with very-low-risk or low-risk localized prostate cancer are the most common candidates. Selected men with favorable intermediate-risk disease may also qualify."],
  ["Can Gleason 6 prostate cancer be monitored?", "Yes. Gleason 3+3=6 corresponds to Grade Group 1, and active surveillance is commonly considered for appropriately selected patients."],
  ["Can Gleason 7 prostate cancer be monitored?", "Some Gleason 3+4=7 cancers, which are Grade Group 2, can be considered for active surveillance when other features are favorable. Gleason 4+3=7 is Grade Group 3 and is generally less suitable."],
  ["Can Grade Group 2 prostate cancer be managed with active surveillance?", "Selected men with favorable Grade Group 2 disease may be eligible, depending on PSA, tumor volume, MRI, pattern 4 and other factors."],
  ["Can Grade Group 3 be managed with active surveillance?", "Grade Group 3 generally represents a higher-risk situation and is much less commonly suitable for active surveillance. The complete clinical picture should be reviewed."],
  ["How often is PSA checked during active surveillance?", "The schedule varies, but PSA is commonly checked every few months, particularly during the early stages of surveillance."],
  ["Do I need an MRI during active surveillance?", "MRI is commonly used to improve risk assessment and evaluate suspicious areas. However, MRI does not replace all other surveillance tests."],
  ["Do I need repeat biopsies?", "Repeat biopsy may be part of an active-surveillance program because it can detect higher-grade or higher-volume disease that imaging alone may not identify."],
  ["What happens if PSA rises?", "An unexpected PSA rise usually needs confirmation. Doctors may repeat PSA and consider MRI, biopsy or other evaluation depending on the pattern and overall risk."],
  ["Does rising PSA automatically mean I need surgery?", "No. PSA can fluctuate. A persistent or significant change may trigger further evaluation, but treatment decisions are based on the complete clinical picture."],
  ["Can prostate cancer progress during active surveillance?", "Yes. That is why regular monitoring is essential."],
  ["Can active surveillance cure prostate cancer?", "Active surveillance itself does not destroy the cancer. It delays definitive treatment while the cancer remains suitable for monitoring. If progression occurs, treatment can be used with curative intent when appropriate."],
  ["How long can I stay on active surveillance?", "There is no universal time limit. Some men remain on surveillance for many years, while others transition to treatment if the disease changes."],
  ["Does active surveillance reduce survival?", "For appropriately selected low-risk patients, active surveillance is an established management strategy. In the ProtecT trial, prostate cancer mortality at 15 years was low and not significantly different among monitoring, surgery and radiotherapy groups, although metastases and progression were more common with monitoring."],
  ["What is the difference between active surveillance and watchful waiting?", "Active surveillance aims to detect cancer progression early enough for definitive treatment. Watchful waiting generally focuses on symptom control and avoiding burdensome treatment, particularly in patients whose age or other health conditions make curative treatment less beneficial."],
  ["Is active surveillance suitable for older men?", "It can be. The decision depends on cancer risk, life expectancy, other medical conditions and patient preferences."],
  ["Is active surveillance suitable for younger men?", "It can be, particularly for genuinely low-risk disease. Younger men need to understand that long-term monitoring may eventually lead to treatment if the cancer changes."],
  ["Can I change from active surveillance to surgery later?", "Yes. If surveillance shows meaningful progression, definitive treatment such as surgery or radiation can be considered when appropriate."],
  ["Can I change from active surveillance to radiation later?", "Yes. Radiation therapy may be an option if treatment becomes necessary, depending on the disease characteristics."],
  ["Does active surveillance affect erectile function?", "Because surgery or radiation is deferred, treatment-related erectile dysfunction may also be delayed. However, erectile function can change because of age, existing health conditions or the cancer itself."],
  ["Does active surveillance affect urinary function?", "It avoids immediate treatment-related urinary side effects, although urinary symptoms caused by BPH or other conditions can still occur."],
  ["Can active surveillance be used for metastatic prostate cancer?", "The active-surveillance strategy described in this article is primarily for selected localized prostate cancer. Metastatic disease generally requires a different management approach."],
  ["Should I get a second opinion before choosing active surveillance?", "A second opinion can be useful, particularly when the diagnosis is Grade Group 2 or higher, MRI and biopsy findings differ, or there is uncertainty about whether surveillance is appropriate."],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("This is the active-surveillance hub for the prostate cluster. It sits beside [treatment without surgery](" + NONSURG + "), [treatment options](" + OPTIONS + "), [Robotic Prostatectomy in India](" + RARP + "), [Radiation Therapy for Prostate Cancer](" + RAD + "), [brachytherapy](" + BRACHY_BLOG + "), [Prostate Cancer Diet](" + DIET + "), [recurrence after surgery](" + RECUR + ") and [Prostate Cancer Treatment in India](" + PILLAR + ")."),
  p("International patients comparing [surgical oncologists](" + SURG_DOCS + ") and [radiation oncologists](" + RAD_DOCS + ") commonly start with [Delhi NCR](/doctors/India/Delhi-NCR/Surgical-Oncology), [Mumbai](/doctors/India/Mumbai/Radiation-Oncology), [Bengaluru](/doctors/India/Bengaluru/Surgical-Oncology), [Chennai](/doctors/India/Chennai/Radiation-Oncology) and [Hyderabad](/doctors/India/Hyderabad/Surgical-Oncology)."),
  btn("Ask if active surveillance is appropriate", consult("Active Surveillance for Prostate Cancer")),
  p("[WhatsApp +91 90443 46292 with your PSA, biopsy and MRI](" + wa("Please review my PSA, biopsy Grade Group and MRI and advise whether active surveillance for prostate cancer is appropriate.") + ")"),
  img(
    "/uploads/articles/pca-as-anatomy.webp",
    "Transparent male body with a gold highlight on an intact prostate in the pelvis and teal pelvic lymph nodes",
    "Active surveillance leaves the prostate in place. Doctors watch Grade Group 1 — and selected Grade Group 2 — cancers instead of operating or irradiating immediately.",
  ),

  h2("What Is Active Surveillance for Prostate Cancer?"),
  p("Active surveillance is a way of managing certain prostate cancers without immediately removing or irradiating the prostate."),
  p("Instead of treating the cancer as soon as it is diagnosed, doctors monitor it carefully."),
  p("The purpose is to identify signs that the cancer is becoming more significant while avoiding or delaying treatment-related side effects when immediate treatment is unlikely to provide enough additional benefit."),
  p("The National Cancer Institute describes active surveillance as closely following a patient's condition and starting treatment if tests show that the cancer is worsening."),
  p("This approach is particularly relevant because some prostate cancers grow so slowly that immediate treatment may not be necessary."),

  h2("Is Active Surveillance the Same as Doing Nothing?"),
  p("**No.**"),
  p("This is the most common misunderstanding."),
  p("Active surveillance involves a planned follow-up schedule."),
  p("Depending on the protocol, monitoring may include:"),
  ul([
    "Regular PSA tests",
    "Clinical assessment",
    "Digital rectal examination",
    "Prostate MRI",
    "Repeat biopsy",
    "Review of symptoms",
    "Additional tests when indicated",
  ]),
  p("The purpose is to catch evidence of progression while the cancer is still potentially curable."),
  p("The treatment decision is therefore not **“Treat or forget.”** It is **“Monitor carefully and treat if the disease shows meaningful progression.”**"),

  h2("Why Is Active Surveillance Used?"),
  p("Prostate cancer treatment can be highly effective, but definitive treatments can also produce side effects."),
  p("Depending on the treatment, these may include:"),
  ul([
    "Urinary leakage",
    "Erectile dysfunction",
    "Changes in ejaculation",
    "Bowel symptoms",
    "Urinary irritation",
    "Treatment-related fatigue",
    "Hormonal side effects when androgen deprivation therapy is used",
  ]),
  p("For men whose cancer has a low likelihood of causing significant problems in the near term, immediate treatment can expose them to these risks without necessarily providing a meaningful survival advantage."),
  p("Active surveillance attempts to balance two competing concerns: **avoid unnecessary treatment** while **remaining ready to treat if the cancer becomes more aggressive.**"),
  p("NCI notes that active surveillance can avoid or delay treatments such as surgery or radiation and their associated side effects in appropriately selected patients."),
  p("If surveillance later ends, GAF Healthcare planning ranges for [radical prostatectomy](" + RP + ") in India are **$7,000–$18,000**, for [EBRT](" + EBRT + ") **$1,000–$6,000+**, and for [IMRT](" + IMRT + ") **$6,500–$14,500**. Those figures apply only if treatment is started — not to the monitoring visits themselves."),

  h2("Who Is Usually Considered for Active Surveillance?"),
  p("The strongest candidates generally have:"),
  ul([
    "Localized prostate cancer",
    "Low-grade disease",
    "Low PSA",
    "Limited cancer volume",
    "Favorable imaging",
    "No evidence of metastatic disease",
    "A clinical profile suggesting that immediate treatment can safely be deferred",
  ]),
  p("The exact criteria vary between guidelines and institutions."),
  p("A commonly recognized low-risk profile includes:"),
  ul(["**Grade Group 1**", "**PSA below 10 ng/mL**", "**Clinical stage T1c or T2a**"]),
  p("Additional factors such as PSA density and biopsy tumor volume can further refine eligibility."),
  img(
    "/uploads/articles/pca-as-psa.webp",
    "Male patient in clinic with a gold pelvic overlay while a clinician reviews PSA and biopsy results on a tablet",
    "Eligibility is never Gleason 6 alone. Doctors also look at PSA density, MRI, tumour volume and whether you can keep the follow-up schedule.",
  ),

  h2("Very-Low-Risk Prostate Cancer and Active Surveillance"),
  p("Some guidelines further divide low-risk disease into **very-low-risk** and low-risk categories."),
  p("Very-low-risk disease generally has particularly favorable characteristics, such as:"),
  ul([
    "Grade Group 1",
    "Low PSA",
    "Limited tumor involvement",
    "Low PSA density",
    "Limited number of positive biopsy cores",
    "Favorable clinical stage",
  ]),
  p("Men in this category are commonly considered strong candidates for active surveillance when they have a sufficiently long life expectancy to benefit from monitoring."),

  h2("Grade Group 1 and Active Surveillance"),
  p("Grade Group 1 corresponds to **Gleason 3+3=6**."),
  p("This is the lowest Grade Group used for prostate cancer."),
  p("Many Grade Group 1 cancers are slow-growing."),
  p("For appropriately selected patients, active surveillance is therefore frequently preferred over immediate definitive treatment."),
  p("But **Grade Group 1 alone does not automatically mean active surveillance is appropriate**."),
  p("Doctors may also consider:"),
  ul([
    "PSA",
    "PSA density",
    "MRI",
    "Number of positive cores",
    "Percentage of each core involved",
    "Cancer location",
    "Family history",
    "Genetic risk",
    "Life expectancy",
    "Patient preferences",
  ]),

  h2("Can Grade Group 2 Be Managed With Active Surveillance?"),
  p("In selected patients, **yes**."),
  p("Grade Group 2 corresponds to **Gleason 3+4=7**."),
  p("Not every Grade Group 2 cancer is the same."),
  p("A patient with low PSA, small-volume disease, limited pattern 4, favorable MRI and favorable clinical stage may be considered differently from a patient with more extensive cancer, higher PSA, higher PSA density, more pattern 4, unfavorable MRI or higher tumor volume."),
  p("Guidelines allow active surveillance for selected men with favorable intermediate-risk disease, but these patients require careful selection and counseling."),
  btn("Ask about Grade Group 2 surveillance", consult("Active Surveillance Grade Group 2")),
  p("[WhatsApp +91 90443 46292 with Grade Group 2 records](" + wa("I have Grade Group 2 prostate cancer. Please advise whether active surveillance is appropriate or whether I should plan surgery or radiation in India.") + ")"),

  h2("Can Gleason 4+3=7 Be Managed With Active Surveillance?"),
  p("Generally, **4+3=7 represents Grade Group 3**, which is a higher grade than 3+4=7."),
  p("Active surveillance is much less commonly appropriate for Grade Group 3 disease."),
  p("Some individual situations may require nuanced multidisciplinary assessment, but a Grade Group 3 diagnosis should not be assumed to be suitable for surveillance simply because the total Gleason score is 7."),
  p("The distinction between **3+4=7** and **4+3=7** is therefore very important."),

  h2("Who Is Usually Not a Good Candidate for Active Surveillance?"),
  p("Active surveillance is generally not intended for men with clearly aggressive or metastatic disease."),
  p("Features that may make surveillance inappropriate or less suitable include:"),
  ul([
    "Grade Group 4 or 5",
    "High-risk or very-high-risk disease",
    "Extensive Grade Group 3 disease",
    "Evidence of lymph-node metastases",
    "Distant metastases",
    "Significant local extension",
    "High-volume aggressive disease",
    "Findings suggesting that delaying treatment could compromise outcomes",
  ]),
  p("However, treatment decisions are individualized."),
  p("The complete pathology and staging information should be reviewed rather than using a single feature as an automatic rule. See [Prostate Cancer Treatment Options](" + OPTIONS + ") when surveillance is not the right frame."),

  h2("Does Age Affect Active Surveillance?"),
  p("Yes."),
  p("Age matters, but it should not be considered in isolation."),
  p("A younger man with a long life expectancy has more years during which a low-risk cancer could potentially progress."),
  p("At the same time, younger patients may have more to gain from avoiding or delaying treatment-related side effects if the cancer is genuinely low risk."),
  p("An older man with significant other medical conditions may have a different balance between cancer risk, treatment risks, life expectancy and quality of life."),
  p("This is why active surveillance is a **shared decision**, not simply an age-based treatment."),

  h2("Does Life Expectancy Matter?"),
  p("Very much."),
  p("Active surveillance and watchful waiting are often confused because both involve monitoring."),
  p("But the purpose is different."),
  p("For a healthy man with a long life expectancy, active surveillance aims to maintain the possibility of **curative treatment** if the cancer progresses."),
  p("For an older or medically frail man whose other health problems are more likely to affect life expectancy, watchful waiting may be more appropriate."),
  p("The EAU's patient guidance notes that active surveillance and watchful waiting are monitoring approaches used in different clinical circumstances."),

  h2("Active Surveillance vs Watchful Waiting"),
  p("These terms are sometimes used interchangeably in everyday conversation, but they describe different strategies."),
  html(wwTable),
  p("The NCI notes that watchful waiting and active surveillance are related but distinct approaches, and terminology has not always been used consistently in the literature."),

  h2("Why Active Surveillance Is Not “No Treatment”"),
  p("Active surveillance is better thought of as **monitoring with a treatment plan in reserve.**"),
  p("The patient is not abandoned after diagnosis."),
  p("Instead, the medical team establishes:"),
  ul([
    "What will be monitored",
    "How often it will be monitored",
    "What changes matter",
    "When additional tests are required",
    "What findings would trigger treatment",
  ]),
  p("This structure is what makes active surveillance different from simply postponing medical care."),

  h2("What Tests Are Used During Active Surveillance?"),
  p("Monitoring varies by guideline and patient, but may include:"),
  h3("PSA testing"),
  p("Used to track changes over time."),
  h3("Digital rectal examination"),
  p("May be performed periodically when clinically appropriate."),
  h3("MRI"),
  p("Can help evaluate changes in suspicious lesions."),
  h3("Repeat biopsy"),
  p("Provides tissue information and can detect a higher Grade Group that may not have been captured initially."),
  h3("Clinical assessment"),
  p("Doctors review symptoms, general health and other relevant findings."),
  p("The exact schedule should be individualized."),
  img(
    "/uploads/articles/pca-as-mri.webp",
    "Male patient on an MRI couch with a gold pelvic overlay highlighting the prostate during surveillance imaging",
    "MRI helps reassess lesions and guide biopsy. It does not replace periodic surveillance biopsy as the only monitoring test.",
  ),

  h2("How Often Is PSA Checked During Active Surveillance?"),
  p("There is no single schedule used everywhere."),
  p("Many active-surveillance programs perform PSA testing **every few months**, particularly during the early period after diagnosis."),
  p("The frequency may then be adjusted based on PSA stability, cancer risk, age, previous MRI, biopsy findings and the local surveillance protocol."),
  p("The important point is consistency."),
  p("A patient should know when the next PSA is due and what changes would prompt further investigation."),

  h2("What Happens If PSA Rises During Active Surveillance?"),
  p("A rising PSA does not automatically mean that the cancer has progressed."),
  p("PSA can fluctuate for reasons unrelated to cancer progression."),
  p("For this reason, guidelines recommend confirming an unexpected PSA increase rather than immediately assuming treatment failure."),
  p("The AUA/ASTRO guideline states that an increase in PSA during active surveillance should initially prompt **retesting**, because transient PSA elevations are common. Serial PSA increases or other concerns may lead to MRI and possible biopsy."),
  p("This is a different situation from [PSA rise after prostatectomy](" + RECUR + "), where the gland has already been removed."),

  h2("Does PSA Velocity Automatically Mean You Need Treatment?"),
  p("No."),
  p("PSA velocity describes how quickly PSA changes."),
  p("A rising PSA can be important, but it is not automatically proof that the cancer is becoming more aggressive."),
  p("Doctors may look for persistent PSA increase, PSA density, MRI changes, biopsy findings, clinical stage and other risk factors."),
  p("An isolated PSA rise is usually not enough by itself to determine that active surveillance should end."),

  h2("What Is PSA Density During Active Surveillance?"),
  p("PSA density is particularly useful because it considers prostate size."),
  p("The calculation is **PSA density = PSA ÷ prostate volume**."),
  p("A man with PSA of 6 and a very large prostate may have a different risk profile from a man with PSA of 6 and a small prostate."),
  p("PSA density is therefore often included in the initial assessment and may be followed as part of the overall risk picture."),

  h2("Why Is MRI Important During Active Surveillance?"),
  p("MRI can help identify changes that might suggest more significant disease."),
  p("It can be used to:"),
  ul([
    "Reassess suspicious lesions",
    "Identify new lesions",
    "Monitor known lesions",
    "Guide repeat biopsy",
    "Help investigate concerning PSA changes",
  ]),
  p("However, MRI does **not replace biopsy** as the sole method of monitoring."),
  p("The AUA/ASTRO guideline specifically recommends using multiparametric MRI to augment risk stratification while not replacing periodic surveillance biopsy."),

  h2("Does Everyone on Active Surveillance Need Repeat Biopsies?"),
  p("Not necessarily at exactly the same intervals."),
  p("But biopsy remains an important part of many active-surveillance protocols."),
  p("MRI can show anatomical changes, but a biopsy can reveal whether the cancer's microscopic grade has changed."),
  p("A repeat biopsy may identify a higher Grade Group, greater tumor volume, more extensive pattern 4, or cancer that was missed during the original biopsy."),
  p("The timing depends on the patient's risk and the surveillance protocol."),

  h2("Why Can a Repeat Biopsy Change the Grade Group?"),
  p("The initial biopsy samples only part of the prostate."),
  p("It is possible that a higher-grade area was missed, the initial sample underestimated tumor volume, or a suspicious MRI lesion was not adequately sampled."),
  p("A subsequent targeted or systematic biopsy can therefore reveal more significant disease."),
  p("This is not necessarily because the cancer suddenly became aggressive."),
  p("Sometimes the higher-grade area was present from the beginning but was not captured by the first biopsy."),

  h2("What Is an “Upgrade” During Active Surveillance?"),
  p("An **upgrade** generally means that subsequent pathology identifies a higher Grade Group than was found initially."),
  p("For example: initial biopsy Grade Group 1, then repeat biopsy Grade Group 2."),
  p("This may indicate that the cancer has a higher-risk component than originally identified."),
  p("A significant upgrade can trigger a discussion about definitive treatment."),

  h2("What Is “Upstaging”?"),
  p("Upstaging means that subsequent assessment suggests the cancer extends farther than previously thought."),
  p("For example, cancer previously thought to be confined to the prostate later shows extracapsular extension, or previously no evidence of lymph-node disease later shows suspicious lymph nodes."),
  p("Upgrading concerns **grade**. Upstaging concerns **extent**. Both can influence whether active surveillance remains appropriate."),

  h2("What Changes Can Trigger Treatment?"),
  p("Active surveillance may be discontinued when there is convincing evidence that the cancer has become more clinically significant."),
  p("Potential triggers include:"),
  ul([
    "Higher Grade Group on biopsy",
    "Significant increase in cancer volume",
    "More extensive Gleason pattern 4",
    "New adverse pathology",
    "MRI progression",
    "Clinical progression",
    "Evidence of disease extending beyond the prostate",
    "Other findings that materially change the risk assessment",
  ]),
  p("The exact trigger varies by surveillance protocol."),
  p("Importantly, **PSA rise alone does not always mean immediate treatment**."),

  h2("Does Every Patient Who Leaves Active Surveillance Need Surgery?"),
  p("No."),
  p("Leaving active surveillance means that the patient and medical team have decided that continued surveillance is no longer the preferred strategy."),
  p("Treatment options may include [radical prostatectomy](" + RARP + "), [external beam radiation](" + RAD + "), [brachytherapy](" + BRACHY_BLOG + "), or other appropriate local or systemic treatment."),
  p("The choice depends on the reason surveillance was stopped and the patient's disease characteristics. Compare [surgical hospitals](" + SURG_HOSP + ") in [Delhi NCR](/hospitals/India/Delhi-NCR/Surgical-Oncology) and [Mumbai](/hospitals/India/Mumbai/Surgical-Oncology), and [radiation hospitals](/hospitals/India/Radiation-Oncology) in [Chennai](/hospitals/India/Chennai/Radiation-Oncology)."),
  btn("Compare surveillance with surgery or radiation", consult("Active Surveillance vs Treatment")),

  h2("How Long Can Someone Stay on Active Surveillance?"),
  p("There is no universal time limit."),
  p("Some men remain on active surveillance for several years, a decade, or more than a decade."),
  p("Some never require definitive treatment."),
  p("Others eventually transition to treatment because their cancer changes or because their risk profile becomes less favorable."),
  p("The important question is not **“How many years can I stay on surveillance?”** It is **“Does my cancer continue to meet the criteria for safe surveillance?”**"),

  h2("Does Active Surveillance Increase the Risk of Dying From Prostate Cancer?"),
  p("For appropriately selected low-risk patients, active surveillance is an established management strategy."),
  p("Long-term randomized evidence also helps put the risks into perspective."),
  p("In the **ProtecT trial**, 1,643 men with localized prostate cancer were randomized to active monitoring, prostatectomy or radiotherapy. At a median follow-up of 15 years, prostate cancer-specific mortality was low and did not differ significantly among the groups."),
  p("However, metastases and disease progression were more common in the active-monitoring group than in the surgery or radiotherapy groups."),
  p("This is an important distinction: **low prostate cancer mortality does not mean that progression never occurs.** Some men on surveillance will eventually require treatment."),

  h2("What Did the 15-Year ProtecT Trial Show?"),
  p("The ProtecT trial provides some of the most useful long-term randomized evidence for localized prostate cancer."),
  p("At 15 years:"),
  ul([
    "Prostate cancer deaths occurred in **3.1%** of men assigned to active monitoring.",
    "**2.2%** died of prostate cancer after prostatectomy.",
    "**2.9%** died after radiotherapy.",
    "The difference was not statistically significant.",
  ]),
  p("However:"),
  ul([
    "Metastases occurred in **9.4%** of the active-monitoring group.",
    "Compared with **4.7%** after prostatectomy.",
    "And **5.0%** after radiotherapy.",
  ]),
  p("Clinical progression also occurred more often with active monitoring."),
  p("About **24.4%** of men assigned to active monitoring were alive without having received prostate cancer treatment at 15 years."),
  p("These results are important but should not be applied blindly to every patient."),
  p("The trial began recruiting decades ago, before today's widespread use of multiparametric MRI, MRI-targeted biopsy and PSMA PET."),
  p("The study population also included some intermediate- and higher-risk disease, so it does not represent only modern low-risk active-surveillance patients."),

  h2("Does Active Surveillance Mean the Cancer Will Eventually Need Treatment?"),
  p("Not necessarily."),
  p("Some men remain on surveillance indefinitely. Others eventually receive treatment."),
  p("In the ProtecT trial, about one-quarter of men assigned to active monitoring remained untreated at 15 years."),
  p("Modern active-surveillance programs may have different treatment rates because MRI is more widely used, biopsies are more targeted, risk classification is more refined, patient selection is different and surveillance protocols have evolved."),

  h2("Why Do Some Men Eventually Need Treatment?"),
  h3("Cancer becomes higher grade"),
  p("For example, Grade Group 1 → Grade Group 2 or higher."),
  h3("Tumor volume increases"),
  p("More biopsy cores may become involved."),
  h3("MRI becomes more concerning"),
  p("A lesion may grow or develop more suspicious features."),
  h3("Disease extends beyond the prostate"),
  p("Imaging may show local progression."),
  h3("Patient preference changes"),
  p("A patient may decide that continued monitoring creates too much anxiety or uncertainty."),
  p("Active surveillance remains a shared decision."),

  h2("Does Active Surveillance Affect Quality of Life?"),
  p("One of the main reasons active surveillance is considered is to avoid or delay treatment-related side effects."),
  p("Surgery can affect urinary continence, erectile function and ejaculation. Radiation can affect urinary, bowel and sexual function. See [robotic prostatectomy](" + RARP + ") and [radiation therapy](" + RAD + ") for those trade-offs."),
  p("Active surveillance avoids these treatment-related effects for as long as definitive treatment is deferred."),
  p("But surveillance has its own burden. Patients may experience anxiety before PSA tests, worry about MRI findings, stress around repeat biopsies, fear that cancer may progress, and uncertainty about when treatment might eventually become necessary."),
  p("So the quality-of-life trade-off is different rather than simply better or worse."),

  h2("Can Active Surveillance Affect Sexual Function?"),
  p("Because surgery and radiation are deferred, men on active surveillance can avoid treatment-related sexual side effects for as long as they remain untreated."),
  p("However, prostate cancer itself and aging can affect sexual function."),
  p("Some men may already have erectile dysfunction before diagnosis. The individual situation matters."),

  h2("Can Active Surveillance Affect Urinary Function?"),
  p("Similarly, men who avoid immediate surgery or radiation avoid many treatment-related urinary side effects."),
  p("However, benign prostate enlargement can still cause urinary symptoms during surveillance."),
  p("Therefore, urinary problems during surveillance do not necessarily mean that the cancer has progressed."),

  h2("What Happens During an Active Surveillance Appointment?"),
  p("A typical follow-up may involve:"),
  ul([
    "**PSA review** — the doctor compares the latest PSA with previous results.",
    "**Clinical review** — symptoms and general health are discussed.",
    "**DRE** — performed when clinically appropriate.",
    "**MRI** — used when scheduled or when there is a reason to reassess the prostate.",
    "**Biopsy** — performed according to the surveillance protocol or when findings raise concern.",
    "**Treatment discussion** — if risk changes, the team discusses whether continuing surveillance remains appropriate.",
  ]),
  img(
    "/uploads/articles/pca-as-decision.webp",
    "Male patient on a clinic couch with a gold pelvic overlay while a clinician explains monitoring instead of immediate treatment",
    "A useful visit ends with a written plan: next PSA date, next MRI, next biopsy, and which findings would start surgery or radiation.",
  ),

  h2("What Should Patients Track During Active Surveillance?"),
  p("Keeping an organized record can make surveillance much easier."),
  p("Track:"),
  ul([
    "PSA results and dates",
    "PSA density when available",
    "MRI reports and PI-RADS scores",
    "Biopsy dates, Gleason scores and Grade Groups",
    "Number of positive cores and percentage of cancer in cores",
    "Treatment discussions",
    "Medication changes",
  ]),
  p("A PSA trend is much easier to understand when all results are available together."),

  h2("Can Diet or Lifestyle Replace Active Surveillance?"),
  p("No."),
  p("A healthy lifestyle may benefit overall health, but it should not be presented as a replacement for prostate cancer surveillance."),
  p("Patients should continue the medical monitoring recommended by their treating team."),
  p("Lifestyle measures may include maintaining a healthy weight, regular physical activity, avoiding tobacco, limiting excessive alcohol, eating a balanced diet and managing cardiovascular risk factors."),
  p("These are general health measures rather than substitutes for cancer monitoring. See [Prostate Cancer Diet](" + DIET + ")."),

  h2("Can Supplements Keep Prostate Cancer From Progressing?"),
  p("There is no supplement that has been established as a replacement for active surveillance or definitive prostate cancer treatment."),
  p("Patients should tell their doctors about supplements because some can interact with medicines or affect laboratory testing."),
  p("Do not use supplements as a reason to reduce or skip PSA, MRI or biopsy follow-up."),

  h2("What If I Don't Want Surgery?"),
  p("Active surveillance may be relevant if the cancer meets appropriate criteria."),
  p("Other non-surgical treatments may also exist, including [radiation therapy](" + RAD + "). See [treatment without surgery](" + NONSURG + ")."),
  p("But active surveillance and radiation are fundamentally different: **active surveillance = no immediate definitive treatment**; **radiation = active treatment intended to control or eradicate the cancer.**"),
  p("The appropriate choice depends on the cancer's risk and the patient's priorities."),

  h2("Active Surveillance vs Surgery"),
  html(vsSurgery),
  p("Neither approach is universally appropriate. The decision depends on cancer risk and patient factors. GAF Healthcare planning ranges for [radical prostatectomy](" + RP + ") are **$7,000–$18,000**; city pages such as [Delhi NCR](/costs/India/Delhi-NCR/Surgical-Oncology/Radical-Prostatectomy) use the same national range unless a hospital issues a verified quotation."),

  h2("Active Surveillance vs Radiation Therapy"),
  html(vsRad),
  p("[Brachytherapy](" + BRACHY + ") planning ranges in India are **$5,500–$13,000**. External-beam options are covered in [Radiation Therapy for Prostate Cancer](" + RAD + ")."),

  h2("Active Surveillance vs Focal Therapy"),
  p("Focal therapies such as HIFU or cryotherapy attempt to treat selected cancer areas while preserving more of the prostate."),
  p("They are different from active surveillance."),
  p("**Active surveillance does not destroy the tumor.** Focal therapy actively treats the tumor."),
  p("The role of focal therapy depends on disease characteristics, treatment center expertise and the evidence available."),

  h2("Active Surveillance vs Watchful Waiting: Which One Is Right?"),
  p("These approaches should not be chosen simply because a patient wants to avoid surgery."),
  p("The underlying goal matters."),
  p("**Active surveillance:** the patient is monitored with the intention of detecting progression early enough for curative treatment."),
  p("**Watchful waiting:** the emphasis is usually on avoiding unnecessary treatment and treating symptoms if they develop."),
  p("For a healthy younger man with low-risk localized cancer, active surveillance may be considered. For an older man with substantial medical problems and limited life expectancy, watchful waiting may be more appropriate."),

  h2("Can Active Surveillance Be Used for Metastatic Prostate Cancer?"),
  p("Active surveillance as a strategy for untreated localized cancer is generally **not the standard approach for metastatic prostate cancer**."),
  p("Metastatic prostate cancer is a different disease setting and generally requires systemic treatment when treatment is appropriate."),
  p("The term “monitoring” can sometimes be used in advanced cancer care, but that should not be confused with the active-surveillance strategy used for selected localized prostate cancers. See [Prostate Cancer Treatment in India](" + PILLAR + ")."),

  h2("What Are the Main Risks of Active Surveillance?"),
  p("The potential benefits are significant, but there are risks."),
  ul([
    "**Cancer progression** — a cancer can become more aggressive while being monitored.",
    "**Missed higher-grade disease** — the initial biopsy may underestimate the cancer.",
    "**Anxiety** — repeated testing can create psychological stress.",
    "**Repeat biopsy complications** — biopsies carry risks such as bleeding, infection and urinary symptoms.",
    "**Treatment may eventually be required** — active surveillance does not guarantee that treatment will never be necessary.",
  ]),
  p("These risks should be discussed before choosing surveillance."),

  h2("What Are the Main Benefits?"),
  p("Potential benefits include:"),
  ul([
    "Avoiding immediate surgery",
    "Avoiding immediate radiation",
    "Preserving urinary function",
    "Preserving sexual function for longer",
    "Avoiding treatment-related side effects",
    "Maintaining the option of definitive treatment later",
    "Reducing overtreatment of slow-growing disease",
    "Allowing time to make a carefully considered decision",
  ]),
  p("For appropriately selected patients, this can be an important quality-of-life strategy."),

  h2("Is Active Surveillance Safe?"),
  p("For appropriately selected patients with low-risk localized prostate cancer, active surveillance is an established management strategy."),
  p("The safety depends heavily on correct initial risk classification, high-quality biopsy, appropriate MRI assessment, reliable follow-up, patient adherence and clear criteria for intervention."),
  p("Active surveillance is safest when it is **active**."),
  p("Skipping scheduled follow-up changes the risk-benefit balance."),

  h2("What Happens If You Miss a PSA or Biopsy?"),
  p("One missed appointment does not necessarily mean that the cancer has progressed."),
  p("But repeated missed surveillance appointments can make the strategy less safe."),
  p("If you miss a scheduled PSA, MRI, biopsy or urology appointment, contact your treating team and reschedule."),
  p("The surveillance program depends on regular monitoring."),

  h2("Can Active Surveillance Fail?"),
  p("Active surveillance can fail in different ways."),
  p("Sometimes the cancer progresses despite appropriate monitoring. Sometimes the original biopsy underestimated the cancer. Sometimes a patient does not continue regular follow-up. And sometimes the cancer remains stable, but the patient becomes uncomfortable with ongoing uncertainty."),
  p("The important point is that **failure of surveillance does not necessarily mean that surveillance was a mistake**."),
  p("The strategy is designed to detect meaningful change and transition to treatment when appropriate."),

  h2("How Do Doctors Decide When to Stop Active Surveillance?"),
  p("There is no single universal trigger."),
  p("The decision may be based on Grade Group progression, increasing tumor volume, increasing pattern 4, MRI progression, clinical stage changes, a persistent concerning PSA pattern, new evidence of disease extension, or patient preference."),
  p("The AUA/ASTRO guideline specifically states that significant increases in PSA, new DRE abnormalities or other concerns should prompt reevaluation, while higher-volume or higher-grade disease on surveillance biopsy should lead to discussion of definitive therapy."),

  h2("What If the PSA Doubles Quickly?"),
  p("A rapidly changing PSA deserves attention, but it should not automatically end surveillance."),
  p("Doctors may:"),
  ol([
    "Repeat PSA",
    "Check for infection or other causes",
    "Review PSA density",
    "Review MRI",
    "Consider biopsy",
  ]),
  p("The AUA specifically recommends confirming PSA increases because transient PSA elevations are common during surveillance."),

  h2("Can MRI Replace Repeat Biopsy During Active Surveillance?"),
  p("Generally, **no**."),
  p("MRI is extremely useful but cannot reliably identify every microscopic change in cancer grade."),
  p("A biopsy provides tissue and can identify a change in Grade Group that MRI may not show."),
  p("This is why modern surveillance often combines **PSA + MRI + biopsy + clinical assessment** rather than relying on a single test."),

  h2("Is Active Surveillance Suitable for Younger Men?"),
  p("It can be."),
  p("Age alone should not automatically exclude a patient from surveillance."),
  p("A younger man with genuinely low-risk disease may be an appropriate candidate."),
  p("However, because he may have a longer life expectancy, the surveillance strategy needs to be particularly robust."),
  p("The patient should understand the need for long-term monitoring, the possibility of future treatment, the psychological burden and the importance of detecting progression."),

  h2("Is Active Surveillance Suitable for Older Men?"),
  p("It can be, but another strategy may sometimes be more appropriate."),
  p("For an older man with substantial medical conditions, **watchful waiting** may be considered instead."),
  p("The distinction depends on life expectancy, other medical conditions, cancer risk, symptoms and patient preferences."),
  p("Age alone does not determine the appropriate strategy."),

  h2("What If I Have a Family History of Aggressive Prostate Cancer?"),
  p("Family history may influence the decision."),
  p("A strong family history can suggest a higher inherited risk."),
  p("The doctor may consider genetic counseling, germline genetic testing, more intensive monitoring, MRI and additional biopsy considerations."),
  p("Active surveillance may still be appropriate in some patients, but the threshold for investigation can differ."),

  h2("What If I Have a BRCA Mutation?"),
  p("Inherited **BRCA1 or BRCA2** mutations can be associated with more aggressive prostate cancer biology."),
  p("A patient with a known pathogenic mutation should discuss surveillance and treatment decisions with a specialist."),
  p("Genetic information may affect screening, biopsy decisions, surveillance intensity, treatment selection and family counseling."),
  p("The presence of a mutation does not automatically determine one treatment for every patient."),

  h2("Does MRI Change Active Surveillance?"),
  p("Yes."),
  p("MRI has significantly influenced modern surveillance strategies."),
  p("It can improve initial risk assessment, identify lesions that need targeted biopsy, help assess changes during surveillance and reduce unnecessary repeat procedures in selected patients."),
  p("But MRI should be considered a component of surveillance rather than a replacement for all other monitoring."),

  h2("What Should You Ask Before Choosing Active Surveillance?"),
  p("A patient should leave the consultation understanding the answers to these questions:"),
  ol([
    "What is my Gleason score?",
    "What is my Grade Group?",
    "What is my PSA?",
    "What is my PSA density?",
    "How many biopsy cores contain cancer?",
    "How much cancer is present in each core?",
    "Is Gleason pattern 4 present?",
    "What does my MRI show?",
    "What is my clinical stage?",
    "Am I low risk or favorable intermediate risk?",
    "Why is active surveillance appropriate for me?",
    "How often will I have PSA testing?",
    "When will I have another MRI?",
    "When will I need another biopsy?",
    "What changes would cause you to recommend treatment?",
    "If I eventually need treatment, what options would I have?",
    "Would surgery or radiation be reasonable alternatives now?",
    "Would a second pathology or urology opinion be useful?",
  ]),

  h2("Active Surveillance for International Patients"),
  p("Patients traveling internationally for prostate cancer evaluation can also be considered for active surveillance when the clinical criteria are appropriate."),
  p("However, reliable follow-up becomes particularly important."),
  p("Before choosing surveillance across countries, clarify:"),
  ul([
    "Who will perform PSA testing?",
    "Where will MRI be performed?",
    "Who will interpret the MRI?",
    "Where will repeat biopsy be performed?",
    "Who will review pathology?",
    "How will medical records be shared?",
    "How quickly can the patient return if the PSA changes?",
    "Who will make the final treatment decision?",
  ]),
  p("For international patients, a clear **long-term follow-up plan** is just as important as the initial treatment decision."),
  p("[WhatsApp +91 90443 46292 to set a follow-up plan](" + wa("I am an international patient considering active surveillance. Please advise how PSA, MRI and biopsy follow-up can be coordinated with a team in India.") + ")"),

  h2("What Should International Patients Bring?"),
  p("If seeking an active-surveillance opinion in India, bring:"),
  ul([
    "Previous PSA reports and complete PSA history",
    "MRI report and original MRI images",
    "Biopsy report, pathology slides/blocks when available",
    "Gleason score, Grade Group and number of positive cores",
    "Previous treatment records",
    "Genetic testing reports, if available",
    "Current medication list",
  ]),
  p("A specialist may recommend pathology review or repeat imaging before confirming whether surveillance remains appropriate."),
  btn("Share records for an active-surveillance second opinion", consult("Active Surveillance for Prostate Cancer")),
  p("[WhatsApp +91 90443 46292 to send PSA, MRI and biopsy files](" + wa("I would like to send PSA dates, MRI files and biopsy Grade Group for an active surveillance second opinion in India.") + ")"),

  h2("Can You Get a Second Opinion About Active Surveillance?"),
  p("Yes."),
  p("A second opinion can be particularly useful when you have Grade Group 2 disease, MRI and biopsy results disagree, there is uncertainty about tumor volume, the pathology report is borderline, you are unsure about surgery versus radiation, you are worried about delaying treatment, you have a strong family history or a genetic mutation, or you are a younger patient with a long life expectancy."),
  p("A second opinion can include review by a urologist, uro-oncologist, radiation oncologist, genitourinary pathologist and a radiologist specializing in prostate MRI."),

  h2("Active Surveillance: A Simple Decision Framework"),
  ol([
    "**Is the cancer localized?** If not, active surveillance for localized disease is generally not the appropriate framework.",
    "**What is the Grade Group?** Grade Group 1 is the most common surveillance group. Selected Grade Group 2 cancers may also qualify.",
    "**What is the PSA and PSA density?** Lower values generally support a more favorable risk profile.",
    "**How much cancer is present?** Tumor volume matters.",
    "**What does MRI show?** A suspicious or extensive lesion may change the assessment.",
    "**What is the patient's life expectancy?** This affects the balance between treatment benefit and treatment burden.",
    "**Can the patient commit to monitoring?** Active surveillance requires reliable follow-up.",
    "**What does the patient prefer?** Some patients strongly value avoiding treatment. Others prefer definitive treatment even when surveillance is medically reasonable.",
  ]),
  p("Shared decision-making matters."),

  h2("Active Surveillance: Who May Be Able to Avoid Immediate Treatment?"),
  p("In broad terms, active surveillance is most commonly considered for men with **very-low-risk localized prostate cancer** and **low-risk localized prostate cancer.**"),
  p("It may also be considered for carefully selected men with **favorable intermediate-risk disease**, particularly when the cancer characteristics are otherwise favorable."),
  p("The decision should consider PSA, Grade Group, clinical stage, PSA density, MRI, tumor volume, pattern 4, family/genetic risk, life expectancy and patient preferences."),
  p("It is not appropriate to decide based on the phrase **“Gleason 6”** or **“PSA under 10”** alone."),

  h2("Active Surveillance: What Does “Avoid Immediate Treatment” Actually Mean?"),
  p("It does not necessarily mean **“You will never need treatment.”**"),
  p("It means **“There is currently a reasonable basis to monitor the cancer instead of treating it immediately.”**"),
  p("Some men will eventually undergo surgery or radiation. Others may remain on surveillance for many years."),
  p("The strategy is designed to preserve the option of curative treatment if the cancer becomes more significant."),

  h2("Final Takeaway"),
  p("Active surveillance has changed how doctors manage low-risk prostate cancer."),
  p("Instead of automatically treating every newly diagnosed tumor, doctors can identify men whose cancer is unlikely to cause significant harm in the near term and monitor them carefully."),
  p("The goal is straightforward: **avoid unnecessary treatment without losing the opportunity to treat cancer when treatment becomes necessary.**"),
  p("For many men with Grade Group 1 localized prostate cancer, active surveillance is an established management approach."),
  p("Selected men with favorable Grade Group 2 disease may also qualify."),
  p("But the decision depends on more than Gleason score."),
  p("The complete picture includes **PSA + PSA density + Grade Group + biopsy volume + MRI + clinical stage + life expectancy + patient preference.**"),
  p("Long-term evidence shows that monitoring can preserve very high prostate-cancer-specific survival in appropriately selected localized disease, while also showing that progression and metastases can occur more often with monitoring than with immediate radical treatment."),
  p("That is why active surveillance should be understood as **active medical management—not passive waiting**."),

  h2("Frequently Asked Questions"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Related Prostate Cancer Resources"),
  p("This article is the active-surveillance hub. Other cluster pages keep their own search intent:"),
  ul([
    "[Prostate Cancer Treatment Without Surgery](" + NONSURG + ") — radiation, hormone therapy and other options if surveillance is not chosen.",
    "[Prostate Cancer Treatment Options](" + OPTIONS + ") — how teams choose first treatment.",
    "[Robotic Prostatectomy in India](" + RARP + ") — if surveillance later ends with surgery.",
    "[Radiation Therapy for Prostate Cancer](" + RAD + ") — IMRT, IGRT and SBRT if radiation is chosen instead.",
    "[Brachytherapy for Prostate Cancer](" + BRACHY_BLOG + ") — internal radiation as an alternative to surveillance.",
    "[Prostate Cancer Diet](" + DIET + ") — eating during monitoring or later treatment.",
    "[Prostate Cancer Recurrence After Surgery](" + RECUR + ") — rising PSA after prostatectomy, not during surveillance of an intact gland.",
    "[Prostate Cancer Treatment in India](" + PILLAR + ") — staging, PSMA PET and the wider pathway.",
  ]),

  h2("How GAF Healthcare Can Help"),
  p("GAF Healthcare coordinates international patients who have newly diagnosed localized prostate cancer and want a second look at whether [active surveillance](" + AS + ") is appropriate — or whether [surgery](" + RARP + ") or [radiation](" + RAD + ") should start now. Share every PSA date and value, the full biopsy report with Grade Group and core involvement, MRI files, and any genetic results. A coordinator can arrange review with a [uro-oncologist](" + SURG_DOCS + ") and a [radiation oncologist](" + RAD_DOCS + "), then help set a written follow-up plan or an itemized estimate if treatment is recommended. The treating team decides whether surveillance, prostatectomy or radiation is appropriate."),
  btn("Share records for an active-surveillance review", consult("Active Surveillance for Prostate Cancer")),
  p("[WhatsApp +91 90443 46292 with your records](" + wa("I would like to share PSA, MRI and biopsy Grade Group for an active surveillance review in India.") + ")"),

  h2("Medical Disclaimer"),
  p("This article is intended for general educational purposes only and does not replace medical advice, diagnosis or treatment."),
  p("Active surveillance is appropriate only for selected patients and requires regular follow-up. The decision should be based on the complete pathology report, PSA, PSA density, MRI, clinical stage, tumor volume, overall health, life expectancy and patient preferences."),
  p("Do not delay or stop recommended prostate cancer treatment without discussing the decision with your treating urologist, uro-oncologist or radiation oncologist."),

  h2("Top 5 Sources"),
  p("1. [NCI — Active Surveillance](https://www.cancer.gov/publications/dictionaries/cancer-terms/def/active-surveillance) — definition and the distinction from doing nothing."),
  p("2. [NCI — Prostate Cancer Treatment (PDQ)](https://www.cancer.gov/types/prostate/patient/prostate-treatment-pdq) — who may be offered surveillance and how monitoring works."),
  p("3. [AUA/ASTRO — Clinically Localized Prostate Cancer Guideline](https://www.auanet.org/guidelines-and-quality/guidelines/clinically-localized-prostate-cancer-aua/astro-guideline-2022) — PSA retesting, MRI plus biopsy, and when to discuss definitive therapy."),
  p("4. [EAU Patient Information — Monitoring Prostate Cancer](https://patients.uroweb.org/condition/prostate-cancer/localised-prostate-cancer/monitoring-prostate-cancer) — active surveillance versus watchful waiting."),
  p("5. [NEJM — Fifteen-Year Outcomes After Monitoring, Surgery, or Radiotherapy (ProtecT)](https://www.nejm.org/doi/full/10.1056/NEJMoa2214122) — 15-year mortality, metastases and untreated survivors."),
  p("**Last reviewed against the cited sources: September 2026.**"),
];

const now = "2026-09-28T07:00:00.000Z";
const SLUG = "active-surveillance-prostate-cancer";

const article = {
  id: "art_active_surveillance_prostate_cancer",
  slug: SLUG,
  title: "Active Surveillance for Prostate Cancer: Who Can Avoid Immediate Treatment?",
  excerpt:
    "Active surveillance is structured monitoring — not doing nothing — for selected Grade Group 1 and favorable Grade Group 2 cancers. Who qualifies, what tests are used, and when treatment starts.",
  date: "28 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Surgical Oncology",
  tags: ["prostate cancer", "active surveillance", "Gleason 6", "Grade Group 1", "watchful waiting", "India"],
  image: "/uploads/articles/pca-as-anatomy.webp",
  imageAlt:
    "Transparent male body with a gold highlight on an intact prostate in the pelvis and teal pelvic lymph nodes",
  status: "published",
  featured: true,
  seoTitle: "Active Surveillance for Prostate Cancer: Who Can Wait",
  seoDescription:
    "Who can avoid immediate surgery or radiation? Grade Group 1 and selected Grade Group 2, PSA, MRI, biopsy and ProtecT evidence — second opinions in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/pca-as-anatomy.webp",
  allowIndex: true,
  keywords: [
    "active surveillance for prostate cancer",
    "prostate cancer active surveillance",
    "who is eligible for active surveillance",
    "active surveillance vs treatment",
    "active surveillance vs watchful waiting",
    "Gleason 6 active surveillance",
    "Grade Group 1 active surveillance",
    "Grade Group 2 active surveillance",
    "prostate cancer monitoring",
    "prostate cancer without treatment",
    "active surveillance PSA",
    "prostate cancer surveillance MRI",
    "prostate cancer surveillance biopsy",
  ],
  relatedLinks: [
    { label: "Treatment without surgery", href: NONSURG },
    { label: "Treatment options", href: OPTIONS },
    { label: "Robotic Prostatectomy in India", href: RARP },
    { label: "Radiation Therapy for Prostate Cancer", href: RAD },
    { label: "Prostate Cancer Treatment in India", href: PILLAR },
    { label: "Recurrence after surgery", href: RECUR },
  ],
  blocks,
};

if (!store.categories.includes("Surgical Oncology")) store.categories.push("Surgical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["pca-as-anatomy.webp", article.imageAlt],
  [
    "pca-as-psa.webp",
    "Male patient in clinic with a gold pelvic overlay while a clinician reviews PSA and biopsy results on a tablet",
  ],
  [
    "pca-as-mri.webp",
    "Male patient on an MRI couch with a gold pelvic overlay highlighting the prostate during surveillance imaging",
  ],
  [
    "pca-as-decision.webp",
    "Male patient on a clinic couch with a gold pelvic overlay while a clinician explains monitoring instead of immediate treatment",
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

const asLink = { label: "Active surveillance", href: AS };
for (const siblingId of [
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
  if (!sibling.relatedLinks.some((row) => row.href === AS)) {
    sibling.relatedLinks.unshift(asLink);
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length);

const treatmentsPath = join(process.cwd(), "content/curated-treatments.json");
const treatments = JSON.parse(readFileSync(treatmentsPath, "utf8"));
const treatment = treatments.treatments.find((row) => row.slug === "prostate-cancer-treatment-in-india");
if (treatment?.translations?.en?.editorialBody && !treatment.translations.en.editorialBody.includes(AS)) {
  treatment.translations.en.editorialBody = treatment.translations.en.editorialBody
    .replace(
      "treatment may involve active surveillance,",
      "treatment may involve [active surveillance](/blogs/active-surveillance-prostate-cancer),",
    )
    .replace(
      "A rising PSA after prostatectomy is covered in [Prostate Cancer Recurrence After Surgery](/blogs/prostate-cancer-recurrence-after-surgery).",
      "A rising PSA after prostatectomy is covered in [Prostate Cancer Recurrence After Surgery](/blogs/prostate-cancer-recurrence-after-surgery). Who may safely delay surgery or radiation is covered in [Active Surveillance for Prostate Cancer](/blogs/active-surveillance-prostate-cancer).",
    );
  writeFileSync(treatmentsPath, `${JSON.stringify(treatments, null, 2)}\n`);
  console.log("linked active-surveillance blog from treatment editorial");
}

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes("active-surveillance-prostate-cancer")) {
  llms = llms.replace(
    "and [prostate cancer recurrence after surgery](https://gaf.healthcare/blogs/prostate-cancer-recurrence-after-surgery).",
    ", [prostate cancer recurrence after surgery](https://gaf.healthcare/blogs/prostate-cancer-recurrence-after-surgery) and [active surveillance for prostate cancer](https://gaf.healthcare/blogs/active-surveillance-prostate-cancer).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}
