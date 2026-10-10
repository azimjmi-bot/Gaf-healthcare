import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const PILLAR = "/treatments/colon-cancer-treatment-in-india";
const SURGERY_BLOG = "/blogs/colon-cancer-surgery-in-india";
const STAGE1 = "/blogs/stage-1-colon-cancer-treatment-in-india";
const STAGE2 = "/blogs/stage-2-colon-cancer-treatment-in-india";
const STAGE3 = "/blogs/stage-3-colon-cancer-treatment-in-india";
const STAGE4 = "/blogs/stage-4-colon-cancer-treatment-in-india";
const CHEMO_BLOG = "/blogs/colon-cancer-chemotherapy-in-india";
const IMMUNO_BLOG = "/blogs/colon-cancer-immunotherapy-in-india";
const COLECTOMY = "/costs/India/Surgical-Oncology/Colectomy";
const RECTAL = "/costs/India/Surgical-Oncology/Rectal-Cancer-Surgery";
const COLONOSCOPY = "/costs/India/Gastroenterology/Colonoscopy";
const CHEMO = "/costs/India/Medical-Oncology/Chemotherapy";
const TARGETED = "/costs/India/Medical-Oncology/Targeted-Therapy";
const IMMUNO = "/costs/India/Medical-Oncology/Immunotherapy";
const PRECISION = "/costs/India/Medical-Oncology/Precision-Oncology";
const LIVER = "/costs/India/Surgical-Oncology/Liver-Resection-(Hepatectomy)";
const HIPEC = "/costs/India/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC";
const SBRT = "/costs/India/Radiation-Oncology/SBRT";
const SURG_DOCS = "/doctors/India/Surgical-Oncology";
const MED_DOCS = "/doctors/India/Medical-Oncology";
const MED_HOSP = "/hospitals/India/Medical-Oncology";
const BREAST = "/treatments/breast-cancer-treatment-in-india";
const PROSTATE = "/treatments/prostate-cancer-treatment-in-india";

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

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body"><strong>Immunotherapy is most clearly established in colon cancer when the tumor is MSI-H or dMMR.</strong></p><p class="article-quick-answer__body">For metastatic MSI-H/dMMR colon cancer, current treatment options can include:</p><ul class="article-quick-answer__list"><li><strong>Pembrolizumab</strong></li><li><strong>Nivolumab</strong></li><li><strong>Nivolumab + ipilimumab</strong></li></ul><p class="article-quick-answer__body">The exact choice depends on the treatment setting.</p><p class="article-quick-answer__body">For patients with <strong>MSS/pMMR colon cancer</strong>, standard immune checkpoint inhibitor treatment is generally <strong>not routinely recommended outside appropriate clinical trials or specific biomarker-defined situations</strong>.</p><p class="article-quick-answer__body">Therefore, the first question before considering immunotherapy is:</p><p class="article-quick-answer__body"><strong>Is the colon cancer MSI-H/dMMR or MSS/pMMR?</strong></p><p class="article-quick-answer__body">This is usually determined through:</p><ul class="article-quick-answer__list"><li>MMR immunohistochemistry</li><li>MSI testing by molecular methods</li><li>Sometimes broader molecular testing</li></ul><p class="article-quick-answer__body">For Stage 1–3 colon cancer, immunotherapy is not automatically added simply because the patient has colon cancer. Its role depends on the specific clinical and molecular setting.</p></aside>`;

const biomarkerTable = `<div class="md-body"><table><thead><tr><th>Result</th><th>Meaning</th><th>Relevance to immunotherapy</th></tr></thead><tbody><tr><td>MSI-H</td><td>High microsatellite instability</td><td>Strongly associated with benefit from checkpoint inhibitors</td></tr><tr><td>MSI-L</td><td>Low microsatellite instability</td><td>Usually not treated as MSI-H</td></tr><tr><td>MSS</td><td>Microsatellite stable</td><td>Immunotherapy generally not routinely used</td></tr><tr><td>dMMR</td><td>Deficient mismatch repair</td><td>Strongly associated with MSI-H biology</td></tr><tr><td>pMMR</td><td>Proficient mismatch repair</td><td>Usually corresponds to MSS biology</td></tr></tbody></table></div>`;

const ioVsChemo = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Immunotherapy</th><th>Chemotherapy</th></tr></thead><tbody><tr><td>Main mechanism</td><td>Activates immune response</td><td>Directly damages/divides cancer cells</td></tr><tr><td>Main biomarker</td><td>MSI-H/dMMR particularly important</td><td>Stage and clinical setting</td></tr><tr><td>Routine for all colon cancers?</td><td>No</td><td>No</td></tr><tr><td>Major role</td><td>Selected biomarker-defined disease</td><td>Stage 3 and metastatic disease</td></tr><tr><td>Common side effects</td><td>Immune-related inflammation</td><td>Fatigue, nausea, cytopenias, neuropathy etc.</td></tr><tr><td>Delayed side effects</td><td>Possible</td><td>Less characteristic</td></tr><tr><td>Treatment response</td><td>Can be durable in responders</td><td>Depends on disease and regimen</td></tr><tr><td>Works in MSS/pMMR disease?</td><td>Generally limited as monotherapy</td><td>Yes, depending on setting</td></tr></tbody></table></div>`;

const ioVsChemoStage = `<div class="md-body"><table><thead><tr><th>Question</th><th>Immunotherapy</th><th>Chemotherapy</th></tr></thead><tbody><tr><td>Who benefits most?</td><td>Biomarker-selected patients</td><td>Broad range of patients depending on stage</td></tr><tr><td>Key biomarker</td><td>MSI-H/dMMR</td><td>No single equivalent biomarker</td></tr><tr><td>Stage 1</td><td>Not routine</td><td>Usually not routine</td></tr><tr><td>Stage 2</td><td>Selected investigational/clinical settings</td><td>Selected high-risk disease</td></tr><tr><td>Stage 3</td><td>Evolving role in selected dMMR/MSI-H settings</td><td>Standard postoperative treatment in most patients</td></tr><tr><td>Stage 4</td><td>Major option for MSI-H/dMMR disease</td><td>Major systemic treatment</td></tr><tr><td>Main mechanism</td><td>Immune activation</td><td>Direct cytotoxic effect</td></tr><tr><td>Major toxicity</td><td>Immune-related inflammation</td><td>Cytopenias, neuropathy, nausea, diarrhea etc.</td></tr><tr><td>Treatment response</td><td>Can be highly durable in responders</td><td>Variable</td></tr><tr><td>MSS/pMMR metastatic disease</td><td>Generally limited role as monotherapy</td><td>Established role</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Component</th><th>GAF planning range in India</th></tr></thead><tbody><tr><td><a href="${IMMUNO}">Immunotherapy</a> (pembrolizumab, nivolumab, nivo + ipi)</td><td>$15,000–$45,000</td></tr><tr><td><a href="${PRECISION}">Precision oncology / MSI-MMR molecular testing</a></td><td>$2,000–$7,000</td></tr><tr><td><a href="${CHEMO}">Chemotherapy</a> if immunotherapy is not indicated</td><td>$1,500–$8,000+</td></tr><tr><td><a href="${TARGETED}">Targeted therapy</a></td><td>$8,000–$30,000</td></tr><tr><td><a href="${COLECTOMY}">Colectomy</a></td><td>$7,000–$18,000</td></tr><tr><td><a href="${LIVER}">Liver resection</a> after a major response</td><td>$10,000–$26,000</td></tr><tr><td><a href="${HIPEC}">CRS/HIPEC</a> for selected peritoneal disease</td><td>$18,000–$40,000</td></tr><tr><td><a href="${COLONOSCOPY}">Colonoscopy</a></td><td>$200–$550</td></tr></tbody></table></div>`;

const faqs = [
  [
    "Is immunotherapy available for colon cancer in India?",
    "Yes. Immunotherapy is used in appropriately selected colon cancer patients, particularly those with MSI-H/dMMR advanced or metastatic disease. GAF planning ranges for immunotherapy are $15,000–$45,000.",
  ],
  [
    "Which immunotherapy is used for colon cancer?",
    "Important immune checkpoint inhibitors include pembrolizumab and nivolumab. Nivolumab can also be combined with ipilimumab in selected MSI-H/dMMR metastatic colorectal cancer patients.",
  ],
  [
    "Is immunotherapy suitable for every colon cancer patient?",
    "No. The strongest established role is in MSI-H/dMMR disease, particularly advanced or metastatic cancer.",
  ],
  [
    "What test determines whether immunotherapy may work?",
    "MMR immunohistochemistry and/or MSI testing are the key tests. Broader molecular testing (RAS, BRAF, HER2) still matters for the rest of the treatment pathway. GAF planning ranges for precision oncology are $2,000–$7,000.",
  ],
  [
    "What does MSI-H mean?",
    "MSI-H means microsatellite instability-high. It indicates that the tumor has significant abnormalities in microsatellite DNA sequences and is often associated with defective mismatch repair.",
  ],
  [
    "What does dMMR mean?",
    "dMMR means deficient mismatch repair. The tumor's DNA mismatch-repair system is not functioning normally.",
  ],
  [
    "Is MSI-H the same as dMMR?",
    "They are closely related but measured using different testing approaches. Many dMMR tumors are MSI-H, but the terms should not be treated as completely interchangeable.",
  ],
  [
    "Can MSS colon cancer receive immunotherapy?",
    "Routine checkpoint-inhibitor monotherapy is generally not recommended for unselected MSS/pMMR metastatic colon cancer. Clinical trials are investigating ways to make these tumors more responsive.",
  ],
  [
    "Is immunotherapy better than chemotherapy?",
    "Not universally. For MSI-H/dMMR metastatic colon cancer, immunotherapy has demonstrated important benefits. For MSS/pMMR disease, chemotherapy and targeted therapies remain central.",
  ],
  [
    "Can immunotherapy cure Stage 4 colon cancer?",
    "Some patients can experience very durable responses, and selected metastatic patients may potentially undergo curative-intent treatment after major response. However, cure cannot be guaranteed.",
  ],
  [
    "How long does colon cancer immunotherapy last?",
    "The duration depends on the drug, treatment setting, response, toxicity and current guidelines. In metastatic disease, treatment may continue for up to approximately two years in some protocols.",
  ],
  [
    "Does immunotherapy cause hair loss?",
    "Hair loss is generally less characteristic of checkpoint inhibitors than of many chemotherapy regimens, although individual patients can experience skin or hair-related effects.",
  ],
  [
    "Does immunotherapy cause diarrhea?",
    "Yes. Immune-related colitis can cause diarrhea and abdominal symptoms. Significant diarrhea during immunotherapy should be reported promptly. Severe diarrhea with dehydration, blood in stool or collapse belongs in a local emergency department.",
  ],
  [
    "Can immunotherapy damage the liver?",
    "Yes. Immune-related hepatitis can occur and is monitored through symptoms and liver-function blood tests.",
  ],
  [
    "Can immunotherapy affect the thyroid?",
    "Yes. Thyroid inflammation and changes in thyroid hormone levels are recognized immune-related effects.",
  ],
  [
    "Can immunotherapy cause permanent side effects?",
    "Some immune-related adverse events can persist and require long-term treatment, although many resolve with appropriate management.",
  ],
  [
    "How much does colon cancer immunotherapy cost in India?",
    "The cost depends heavily on the drug, schedule, number of doses, hospital, monitoring and duration. GAF planning ranges for immunotherapy are $15,000–$45,000. A patient-specific quotation is necessary.",
  ],
  [
    "Can international patients receive immunotherapy in India?",
    "Yes. International patients can undergo specialist review, molecular testing, immunotherapy and follow-up at appropriate Indian cancer centers.",
  ],
  [
    "Can immunotherapy continue after returning home?",
    "In selected patients, treatment may be continued by a local oncology team after coordination with the Indian treating center.",
  ],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("Colon cancer immunotherapy in India is an important treatment option for a **specific group of patients**, particularly those whose tumors are **microsatellite instability-high (MSI-H)** or **mismatch repair deficient (dMMR)**. Unlike [chemotherapy](" + CHEMO + "), which directly attacks rapidly dividing cells, immunotherapy works by helping the immune system recognize and attack cancer cells. It is **not appropriate for every colon cancer patient**. The most important factor is the biology of the tumor."),
  p("This article is the immunotherapy hub for the colon cluster. The broader pathway is in [Colon Cancer Treatment in India](" + PILLAR + "). How FOLFOX, CAPOX and FOLFIRI are planned when immunotherapy is not indicated is in [Colon Cancer Chemotherapy in India](" + CHEMO_BLOG + "). [Stage 4](" + STAGE4 + ") covers metastatic resectability and conversion therapy. [Stage 3](" + STAGE3 + ") covers adjuvant chemotherapy and the evolving adjuvant immunotherapy discussion. [Stage 1](" + STAGE1 + ") and [Stage 2](" + STAGE2 + ") explain why immunotherapy is not automatically added after surgery. How the operation itself is planned is in [Colon Cancer Surgery in India](" + SURGERY_BLOG + "). This is **not** a rectal-cancer page: radiation has a much larger role when the tumor is rectal. See [rectal cancer surgery](" + RECTAL + ")."),
  p("GAF Healthcare planning ranges for [immunotherapy](" + IMMUNO + ") are **$15,000–$45,000**. [Precision oncology / molecular testing](" + PRECISION + ") is **$2,000–$7,000**. [Chemotherapy](" + CHEMO + ") is **$1,500–$8,000+**. [Targeted therapy](" + TARGETED + ") is **$8,000–$30,000**. These are planning ranges, not hospital quotations."),
  p("International patients comparing [medical oncologists](" + MED_DOCS + ") for checkpoint inhibitors commonly start with [Delhi NCR immunotherapy](/doctors/India/Delhi-NCR/Medical-Oncology/Immunotherapy), [Mumbai](/doctors/India/Mumbai/Medical-Oncology/Immunotherapy), [Bengaluru](/doctors/India/Bengaluru/Medical-Oncology/Immunotherapy), [Chennai](/doctors/India/Chennai/Medical-Oncology/Immunotherapy) and [Hyderabad](/doctors/India/Hyderabad/Medical-Oncology/Immunotherapy). Partner [medical-oncology hospitals](" + MED_HOSP + ") in [Delhi NCR](/hospitals/India/Delhi-NCR/Medical-Oncology) and [Mumbai](/hospitals/India/Mumbai/Medical-Oncology) are a typical first filter. [Surgical oncologists](" + SURG_DOCS + ") remain part of the same tumour board if a major response later makes local treatment possible."),
  btn("Ask whether immunotherapy is appropriate for this colon cancer", consult("Colon Cancer Immunotherapy")),
  p("[WhatsApp +91 90443 46292 with MSI/MMR, stage and imaging](" + wa("Please review my colon cancer MSI/MMR report, stage and imaging and advise whether pembrolizumab or nivolumab plus ipilimumab is appropriate in India.") + ")"),
  img(
    "/uploads/articles/colon-io-anatomy.webp",
    "Transparent adult body with a teal colon and a gold tumour used to explain MSI-H/dMMR colon cancer immunotherapy",
    "Immunotherapy is biomarker-driven. The first question is whether this colon tumor is MSI-H/dMMR or MSS/pMMR — not whether the patient simply has colon cancer.",
  ),

  h2("What Is Immunotherapy for Colon Cancer?"),
  p("Immunotherapy is a type of cancer treatment that helps the immune system recognize and attack cancer cells. Cancer cells can develop mechanisms that allow them to avoid immune-system attack. Immune checkpoint inhibitors interfere with some of these mechanisms. Two important immune checkpoints are **PD-1** and **CTLA-4**. Medicines that block these pathways can release some of the immune system's brakes so T cells can recognize and attack cancer cells more effectively."),

  h2("How Does Immunotherapy Work?"),
  p("A simplified explanation is: the cancer cell uses immune checkpoints to avoid immune attack → a checkpoint inhibitor blocks the immune \"brake\" → T cells become more active against the cancer → cancer cells may be destroyed or controlled. This is different from conventional [chemotherapy](" + CHEMO + "), which works through direct cytotoxic effects on cancer cells and other rapidly dividing cells."),
  img(
    "/uploads/articles/colon-io-immune.webp",
    "Transparent abdomen showing a teal colon and a gold tumour surrounded by immune cells used to explain checkpoint inhibitors",
    "MSI-H/dMMR tumors often carry a high mutation load, which can make them more visible to T cells once PD-1 or CTLA-4 brakes are released.",
  ),

  h2("What Are Immune Checkpoint Inhibitors?"),
  p("Immune checkpoint inhibitors are medicines that block specific proteins involved in immune regulation. The most important ones in colorectal cancer include **PD-1 inhibitors** (pembrolizumab, nivolumab) and the **CTLA-4 inhibitor** ipilimumab. Nivolumab and ipilimumab can be combined in selected MSI-H/dMMR metastatic colorectal cancer patients. The FDA approved nivolumab plus ipilimumab in April 2025 for patients aged 12 years and older with unresectable or metastatic MSI-H/dMMR colorectal cancer."),

  h2("Why MSI-H and dMMR Matter So Much"),
  p("**MSI** stands for microsatellite instability. Microsatellites are short repeated DNA sequences. When the DNA mismatch-repair system does not work properly, errors can accumulate in these regions. A tumor with a high level of these abnormalities may be classified as **MSI-H — microsatellite instability-high**."),
  p("**MMR** stands for mismatch repair. The mismatch-repair system identifies and corrects certain errors that occur when DNA is copied. When this system is defective, the tumor may be **dMMR — deficient mismatch repair**. These tumors often have a high number of mutations and can be more visible to the immune system. That is one reason MSI-H/dMMR tumors can respond particularly well to immune checkpoint inhibitors."),
  html(biomarkerTable),
  p("The laboratory method and clinical context should always be considered when interpreting the result. MSI-H and dMMR are closely related but are not exactly the same test."),

  h2("How Is MSI/MMR Testing Done?"),
  h3("MMR immunohistochemistry"),
  p("This test looks for the presence or absence of key mismatch-repair proteins: **MLH1, PMS2, MSH2 and MSH6**. Loss of one or more proteins can indicate dMMR."),
  h3("MSI testing"),
  p("MSI testing evaluates specific DNA markers to determine whether the tumor demonstrates microsatellite instability. Depending on the laboratory, techniques may include PCR-based testing or validated molecular assays. The treating team may use one or both approaches. GAF planning ranges for [precision oncology](" + PRECISION + ") are **$2,000–$7,000**."),
  p("For metastatic colon cancer, current ESMO guidance recommends testing for dMMR/MSI-H specifically to identify patients who may benefit from immune checkpoint inhibition. Knowing the result can change the entire treatment pathway. **MSI-H/dMMR** — immunotherapy may be a major treatment option. **MSS/pMMR** — treatment generally follows [chemotherapy](" + CHEMO + ") and [targeted-therapy](" + TARGETED + ") pathways according to RAS, BRAF, tumor location and other factors. Molecular testing should happen before finalizing treatment whenever feasible."),
  btn("Ask which MSI/MMR tests to complete before treatment", consult("Precision Oncology")),
  p("[WhatsApp +91 90443 46292 with the pathology and MMR IHC report](" + wa("Please review my colon cancer pathology and MMR immunohistochemistry and advise whether MSI PCR or broader molecular testing is still needed in India.") + ")"),

  h2("Which Colon Cancer Patients May Receive Immunotherapy?"),
  p("The strongest established role is in **unresectable or metastatic MSI-H/dMMR colon cancer**. Immunotherapy may also have roles in previously treated MSI-H/dMMR metastatic disease, selected clinical trials, certain locally advanced tumors, selected neoadjuvant settings and emerging biomarker-defined strategies. A patient with Stage 2 colon cancer should not automatically receive the same immunotherapy used for Stage 4 MSI-H disease."),
  h3("Immunotherapy for Stage 1 colon cancer"),
  p("Immunotherapy is **not a routine treatment for [Stage 1 colon cancer](" + STAGE1 + ")**. Most Stage 1 cancers are managed with adequate surgical removal. If the cancer is completely removed and there are no high-risk circumstances requiring additional therapy, immunotherapy is generally unnecessary."),
  h3("Immunotherapy for Stage 2 colon cancer"),
  p("Immunotherapy is not routinely given to every [Stage 2](" + STAGE2 + ") patient. The situation becomes more complex in dMMR/MSI-H tumors, locally advanced disease, clinical-trial settings and selected tumors where neoadjuvant treatment is being investigated. A dMMR/MSI-H result does **not** automatically mean that every Stage 2 patient should receive immunotherapy."),
  h3("Immunotherapy for Stage 3 colon cancer"),
  p("[Stage 3 colon cancer](" + STAGE3 + ") is traditionally treated with **surgery plus adjuvant [chemotherapy](" + CHEMO + ")**. Immunotherapy is not automatically added to standard postoperative chemotherapy for every Stage 3 patient. The role of immunotherapy in dMMR/MSI-H Stage 3 disease is an active area of clinical development. The ATOMIC study reported in 2025 showed improved disease-free survival when atezolizumab was added to mFOLFOX6 in resected Stage 3 dMMR colon cancer. Because treatment approvals and guidelines continue to evolve, patients with Stage 3 dMMR/MSI-H disease should have their case reviewed against the **current guideline and regulatory environment** rather than assuming immunotherapy is automatically indicated."),
  h3("Immunotherapy for Stage 4 colon cancer"),
  p("This is where immunotherapy has its most established role. For **MSI-H/dMMR metastatic colon cancer**, immune checkpoint inhibitors can be used as systemic treatment. Current ESMO guidance recommends **nivolumab plus ipilimumab**, or **pembrolizumab when the combination is not possible**, for appropriate first-line patients with dMMR/MSI-H metastatic colorectal cancer. The FDA approved pembrolizumab in 2020 for first-line treatment of unresectable or metastatic MSI-H/dMMR colorectal cancer, and subsequently approved nivolumab plus ipilimumab in 2025. See [Stage 4 colon cancer treatment](" + STAGE4 + ")."),
  btn("Ask about first-line pembrolizumab versus nivolumab plus ipilimumab", consult("Immunotherapy")),

  h2("Pembrolizumab, Nivolumab and Nivolumab Plus Ipilimumab"),
  p("**Pembrolizumab** is a PD-1 immune checkpoint inhibitor and an established option for appropriately selected patients with MSI-H/dMMR unresectable or metastatic colorectal cancer. The KEYNOTE-177 trial compared pembrolizumab with standard chemotherapy-based treatment in previously untreated MSI-H/dMMR metastatic colorectal cancer. The FDA reported a median progression-free survival of **16.5 months with pembrolizumab** and **8.2 months with chemotherapy** in the initial analysis used for approval. These figures come from a specific clinical-trial population and should not be presented as a guaranteed outcome for an individual patient."),
  p("**Nivolumab** is another PD-1 inhibitor. It can be used for selected MSI-H/dMMR metastatic colorectal cancer patients — alone in selected settings, or in combination with ipilimumab. The FDA converted the accelerated approval for single-agent nivolumab in previously treated MSI-H/dMMR metastatic colorectal cancer to regular approval in 2025."),
  p("**Nivolumab plus ipilimumab** combines PD-1 inhibition with CTLA-4 inhibition. The combination can produce stronger immune activation than a single checkpoint inhibitor in selected patients. The CheckMate-8HW trial demonstrated important benefits from nivolumab plus ipilimumab in MSI-H/dMMR metastatic colorectal cancer. The 2026 ESMO guideline now recommends nivolumab plus ipilimumab as a first-line option for appropriate dMMR/MSI-H metastatic colorectal cancer patients. A typical regimen begins with combination treatment for a defined number of doses, followed by nivolumab maintenance. The FDA-approved CheckMate-8HW regimen includes nivolumab with low-dose ipilimumab followed by nivolumab maintenance. Patients should not attempt to compare treatment only by the number of infusions."),
  img(
    "/uploads/articles/colon-io-infusion.webp",
    "Adult in an immunotherapy day-care chair with a colon-and-tumour overlay used to explain pembrolizumab or nivolumab",
    "Most checkpoint-inhibitor infusions are given in outpatient daycare. Duration, response, toxicity and treatment goals all matter more than the raw number of visits.",
  ),
  p("[WhatsApp +91 90443 46292 about KEYNOTE-177 versus CheckMate-8HW](" + wa("Please advise whether pembrolizumab or nivolumab plus ipilimumab is more appropriate for my MSI-H/dMMR metastatic colon cancer in India.") + ")"),

  h2("Is Immunotherapy Better Than Chemotherapy?"),
  p("It is not accurate to say that immunotherapy is universally better than chemotherapy. For MSI-H/dMMR metastatic colon cancer, clinical trials have demonstrated important benefits with checkpoint inhibitors. For MSS/pMMR metastatic colon cancer, standard checkpoint-inhibitor monotherapy generally does not provide the same established benefit. **The tumor biomarker determines whether immunotherapy is likely to be useful.**"),
  p("For MSI-H/dMMR metastatic colorectal cancer, current ESMO guidance does not support routinely combining conventional chemotherapy with immune checkpoint inhibitors because available evidence has not established a benefit for such a combination in this setting. That does not mean chemotherapy and immunotherapy can never appear in the same overall treatment journey. A patient may receive immunotherapy → surgery/local treatment → another systemic treatment depending on the clinical course."),
  html(ioVsChemo),

  h2("Immunotherapy for MSS Colon Cancer, TMB and BRAF"),
  p("Most colon cancers are not MSI-H. Many are **MSS/pMMR**. These tumors generally do not respond as well to single-agent immune checkpoint inhibition. Routine immunotherapy is not standard for unselected MSS/pMMR metastatic colon cancer. SITC guidance specifically recommends against routine immune checkpoint inhibitor treatment for untreated MSS/pMMR metastatic colorectal cancer outside clinical trials. Combinations that may make immune-resistant tumors more responsive remain an evolving research area."),
  p("**Tumor mutational burden (TMB)** measures the number of mutations in a tumor. Some cancers with very high TMB can respond to immune checkpoint inhibitors. However, TMB should not be treated as a substitute for MSI/MMR testing in colon cancer. Special situations such as POLE/POLD1 alterations may also be relevant in selected tumors. A molecular tumor board can help interpret unusual results."),
  p("A **BRAF V600E** mutation does not automatically rule out immunotherapy. Some BRAF V600E metastatic tumors are also MSI-H/dMMR. Current ESMO guidance states that MSI-H/dMMR tumors with BRAF V600E mutations should still receive first-line immunotherapy because the benefit from immune checkpoint inhibition remains relevant. If the tumor is **BRAF V600E + MSS/pMMR**, the treatment pathway is different and may involve BRAF-targeted therapy combined with EGFR inhibition and chemotherapy."),
  btn("Ask how BRAF, RAS and HER2 change the immunotherapy decision", consult("Targeted Therapy")),

  h2("Can Immunotherapy Cure Stage 4 Colon Cancer or Make It Operable?"),
  p("Immunotherapy can produce deep and sometimes durable responses in selected MSI-H/dMMR metastatic colon cancer patients. It is not appropriate to promise a cure to every patient. Some patients experience complete response, partial response, stable disease or progressive disease. A small subset can experience very durable disease control."),
  p("If a patient has MSI-H/dMMR metastatic colon cancer and limited liver metastases, and immunotherapy produces major tumor shrinkage, the multidisciplinary team may reassess whether [liver resection](" + LIVER + ") (**$10,000–$26,000**), ablation or another local treatment is possible. Imaging should be repeated during treatment. A patient who initially appears unresectable may occasionally become a candidate for local treatment after systemic therapy."),
  p("The same principle applies to limited lung metastases (surgery, ablation or [SBRT](" + SBRT + ")) and to peritoneal disease, where selected patients may be assessed for [cytoreductive surgery with HIPEC](" + HIPEC + ") (**$18,000–$40,000**). The decision should be made by a specialist peritoneal-surface oncology team. See [Stage 4 colon cancer treatment](" + STAGE4 + ")."),

  h2("How Long Does Treatment Continue, and What If It Stops Working?"),
  p("Immunotherapy is not always given indefinitely. Duration depends on the drug used, clinical response, side effects, treatment guidelines, regulatory labeling, patient preference and disease progression. Current ESMO guidance notes that anti-PD-1 therapy may be continued for up to approximately **two years** in the metastatic setting, although the optimal duration remains an area of ongoing research. Longer treatment does not automatically mean better treatment."),
  p("If the cancer progresses, doctors review whether the tumor truly progressed, whether progression occurred early or after a durable response, previous treatments, molecular profile, whether chemotherapy has previously been used, whether targeted therapy is available, whether local treatment is possible and clinical-trial options. Subsequent treatments may include [chemotherapy](" + CHEMO + "), [targeted therapy](" + TARGETED + "), BRAF-directed therapy, HER2-directed therapy, later-line medicines or clinical trials."),
  p("**Pseudoprogression** is an apparent increase in tumor size caused partly by immune-cell infiltration rather than actual cancer growth. It is much less common than true progression but can occur with immunotherapy. Doctors may interpret imaging together with symptoms, laboratory results, timing, overall clinical condition and follow-up imaging. A single scan should not always be interpreted without context."),
  p("Monitoring may include CT scans, MRI in selected situations, CEA, blood tests, physical examination and symptom assessment. CEA can be useful when it was elevated at baseline, but **CEA alone cannot prove that immunotherapy is working**. Some patients with metastatic colon cancer have normal CEA despite significant disease."),

  h2("Side Effects of Colon Cancer Immunotherapy"),
  p("Immunotherapy side effects are different from conventional chemotherapy because checkpoint inhibitors activate the immune system. Sometimes the immune system can attack healthy tissues. These are called **immune-related adverse events**. They can occur during treatment or, in some cases, after treatment has stopped. Common effects include fatigue, rash, itching, diarrhea, reduced appetite, nausea, fever and muscle or joint pain. Many are manageable when identified early."),
  p("**Immune-related colitis** is particularly important in a patient with colon cancer. Symptoms may include frequent diarrhea, abdominal cramps, blood or mucus in stool, urgency and abdominal pain. Severe diarrhea during immunotherapy should not simply be assumed to be \"normal chemotherapy diarrhea.\" NCI identifies colitis and diarrhea as important immune-related complications of checkpoint inhibitors."),
  p("**Immune-related hepatitis** can cause abnormal liver-function tests, jaundice, dark urine, abdominal discomfort and fatigue. **Pneumonitis** can cause a new cough, breathlessness, chest discomfort or reduced oxygen levels. Checkpoint inhibitors can also affect the thyroid (hypothyroidism, hyperthyroidism, thyroiditis), pituitary and adrenal glands, kidneys, heart and nervous system. Some endocrine side effects may require long-term hormone replacement."),
  p("**Severe diarrhea with dehydration or blood in stool, new breathlessness or chest pain, jaundice, fainting, confusion, sudden weakness or collapse belongs in a local emergency department — not a delayed WhatsApp message.** Patients should never self-medicate with steroids or stop immunotherapy without speaking to the treating team. Treatment of immune-related toxicity may include pausing immunotherapy, close monitoring, corticosteroids, other immunosuppressive treatment in selected severe cases and organ-specific specialists."),
  img(
    "/uploads/articles/colon-io-clinic.webp",
    "Adult patient in clinic with a colon-and-immune overlay while a medical oncologist explains MSI-H immunotherapy",
    "Ask which checkpoint inhibitor is recommended, how colitis and thyroid tests will be monitored, and which symptoms require emergency care — not only whether immunotherapy is \"available.\"",
  ),

  h2("Who May Not Be Suitable for Immunotherapy?"),
  p("Even when a tumor is MSI-H/dMMR, immunotherapy may not be appropriate in every situation. Doctors consider previous organ transplantation, severe autoimmune disease, active uncontrolled infection, previous severe immune-related toxicity, certain medications, organ function, overall health and previous immunotherapy. Having an autoimmune disease does not automatically mean immunotherapy is impossible — the risk depends on the type of disease, activity, current medications, severity and available alternatives."),
  p("Patients sometimes worry that steroids automatically cancel out immunotherapy. The situation is more nuanced. Steroids may be medically necessary to treat immune-related adverse events. When appropriately prescribed, they are an important part of managing immunotherapy toxicity. Patients should not avoid necessary steroid treatment because of fear that it will \"stop\" immunotherapy."),

  h2("Immunotherapy vs Targeted Therapy"),
  p("These treatments are different. Immunotherapy works primarily by changing immune-system activity (pembrolizumab, nivolumab, ipilimumab). [Targeted therapy](" + TARGETED + ") (**$8,000–$30,000**) targets a specific molecular pathway or protein — BRAF-targeted therapy, HER2-targeted therapy, EGFR-targeted therapy or VEGF-directed therapy. A patient can potentially receive different types of treatment during the course of metastatic disease."),
  p("Usually, **PD-L1 is not the primary biomarker used to select immunotherapy for colon cancer**. This is an important distinction from some other cancers. For colorectal cancer, **MSI/MMR status is the key established biomarker**. A patient should not be told that immunotherapy is appropriate simply because a colon tumor is \"PD-L1 positive.\""),

  h2("Lynch Syndrome, Rectal Cancer and Perioperative Immunotherapy"),
  p("Some MSI-H/dMMR colorectal cancers are associated with **Lynch syndrome**, an inherited cancer-predisposition condition. MMR/MSI testing can therefore help guide cancer treatment and identify patients who may need genetic evaluation. If the tumor pattern suggests Lynch syndrome, genetic counseling and germline testing may be recommended. This can also have implications for family members."),
  p("Checkpoint inhibitors can also be used for selected dMMR/MSI-H **rectal** cancers, with remarkable responses reported in locally advanced disease. This page focuses on **colon cancer**. Rectal cancer has different anatomy and treatment pathways and should not simply be treated using the colon cancer algorithm. See [rectal cancer surgery](" + RECTAL + ")."),
  p("**Neoadjuvant immunotherapy** (before surgery) for selected dMMR/MSI-H locally advanced colon cancers is an active area of research. Potential objectives include shrinking the tumor, eliminating microscopic disease, increasing complete response rates and potentially changing the extent of surgery. **Adjuvant immunotherapy** (after surgery) is more recent. The 2025 ATOMIC results are an important development for resected Stage 3 dMMR colon cancer, but the exact application should follow current guidelines and regulatory approvals. Patients should ask whether the recommended treatment is standard of care, guideline-supported but selected, clinical-trial based or off-label."),

  h2("Colon Cancer Immunotherapy Cost in India"),
  p("There is **no single price** for colon cancer immunotherapy because treatment depends on the drug, dose, frequency, duration, hospital, manufacturer, patient weight where relevant, insurance or self-pay arrangements, supportive care, laboratory monitoring and imaging. Immunotherapy can be significantly more expensive than conventional chemotherapy, particularly when treatment continues over many months. GAF Healthcare publishes USD planning ranges compiled from partner hospital cost sheets. They are not hospital quotations."),
  html(costTable),
  p("Consider two patients. Patient A has MSI-H metastatic colon cancer treated with pembrolizumab alone. Patient B has MSI-H metastatic colon cancer treated with nivolumab plus ipilimumab followed by nivolumab. The treatment schedules and total medicine costs can be very different. If a patient develops a serious immune-related side effect requiring hospitalization, the total cost can increase substantially."),
  p("City pages such as [Delhi NCR immunotherapy](/costs/India/Delhi-NCR/Medical-Oncology/Immunotherapy), [Mumbai](/costs/India/Mumbai/Medical-Oncology/Immunotherapy), [Bengaluru](/costs/India/Bengaluru/Medical-Oncology/Immunotherapy), [Chennai](/costs/India/Chennai/Medical-Oncology/Immunotherapy) and [Hyderabad](/costs/India/Hyderabad/Medical-Oncology/Immunotherapy) use the same national range unless a hospital issues a verified quotation. Ask whether the quotation names the exact immunotherapy drug, dose, number of cycles, treatment interval, drug cost, infusion cost, doctor fees, laboratory costs, imaging and expected follow-up."),
  html(ioVsChemoStage),
  btn("Ask for an itemised immunotherapy quotation", consult("Colon Cancer Immunotherapy Cost in India")),
  p("[WhatsApp +91 90443 46292 for a drug-specific estimate](" + wa("Please send an itemised colon cancer immunotherapy quotation in India naming pembrolizumab or nivolumab plus ipilimumab, cycles, infusion charges, labs and imaging.") + ")"),

  h2("How to Choose a Hospital and What International Patients Should Bring"),
  p("Look for a center with medical oncology experienced in colorectal cancer, immunotherapy, targeted therapy, chemotherapy and clinical trials; molecular pathology able to perform MSI testing, MMR immunohistochemistry, RAS, BRAF, HER2 and broader genomic testing; a multidisciplinary team including a medical oncologist, colorectal surgeon, radiologist, pathologist, radiation oncologist and molecular pathologist; and emergency support, because immune-related adverse events can affect the colon, liver, lungs, kidneys, heart and endocrine organs."),
  ul([
    "[Medical oncology hospitals in Delhi NCR](/hospitals/India/Delhi-NCR/Medical-Oncology)",
    "[Medical oncology hospitals in Mumbai](/hospitals/India/Mumbai/Medical-Oncology)",
    "[Medical oncology hospitals in Bengaluru](/hospitals/India/Bengaluru/Medical-Oncology)",
    "[Medical oncology hospitals in Chennai](/hospitals/India/Chennai/Medical-Oncology)",
    "[Medical oncology hospitals in Hyderabad](/hospitals/India/Hyderabad/Medical-Oncology)",
  ]),
  p("International patients should ideally complete molecular testing before travelling if the tests are available locally. Send the colonoscopy report, biopsy, histopathology, CT/MRI/PET scans, CEA, blood tests, previous treatments, MSI/MMR report and molecular reports. Bring the passport, pathology slides and blocks, medication list and discharge summaries. If treatment continues for many months, the patient may discuss transferring subsequent cycles to an oncologist in the home country once the Indian team provides the diagnosis, molecular profile, protocol, dose, infusion schedule, response assessments and side-effect history."),
  ol([
    "Is my colon cancer MSI-H or MSS, and is the tumor dMMR or pMMR? Which MMR proteins are absent?",
    "Has MSI testing been performed, and do I need repeat testing before treatment?",
    "Why do you recommend immunotherapy rather than chemotherapy, and which drug — pembrolizumab, nivolumab, or nivolumab plus ipilimumab?",
    "What is the expected duration, infusion interval, blood-test schedule and imaging plan?",
    "What symptoms require immediate medical attention, including colitis, pneumonitis and endocrine toxicity?",
    "Do I need KRAS/NRAS, BRAF, HER2 or Lynch-syndrome genetic testing, and is a clinical trial available?",
    "Can later cycles continue in my home country, and what is the estimated total cost with the drug named?",
  ]),

  h2("Colon Cancer Immunotherapy Treatment Pathway"),
  ol([
    "Confirm the diagnosis with colonoscopy and biopsy.",
    "Determine the stage with CT/MRI and other appropriate investigations.",
    "Perform MMR/MSI testing to distinguish dMMR/MSI-H from pMMR/MSS.",
    "Complete molecular profiling in metastatic disease: RAS, BRAF, HER2 and other actionable alterations.",
    "Multidisciplinary review: medical oncology, colorectal surgery, radiology and pathology.",
    "Select treatment — pembrolizumab or nivolumab plus ipilimumab (or another guideline-supported checkpoint strategy) for MSI-H/dMMR metastatic disease; chemotherapy ± targeted therapy for MSS/pMMR disease according to RAS, BRAF, HER2, sidedness and treatment goal.",
    "Monitor blood tests, imaging, symptoms, CEA when appropriate and immune-related toxicity.",
    "Reassess — continue treatment or consider local therapy if the tumor responds; change systemic treatment, targeted therapy or a clinical trial if it progresses.",
  ]),

  h2("The Bottom Line"),
  p("Colon cancer immunotherapy is **biomarker-driven**, not a treatment automatically given to every patient. **MSI-H/dMMR status is the most important established biomarker** for checkpoint immunotherapy in colorectal cancer. Pembrolizumab is an established first-line treatment for appropriately selected unresectable or metastatic MSI-H/dMMR colorectal cancer. Nivolumab plus ipilimumab is another important first-line option. MSS/pMMR colon cancer generally does not respond sufficiently to routine checkpoint-inhibitor monotherapy to make it standard treatment. Stage 1 and most Stage 2 colon cancers do not routinely require immunotherapy. The role in Stage 3 dMMR/MSI-H colon cancer is evolving rapidly. Diarrhea during immunotherapy may indicate immune-related colitis and should be reported promptly. A patient-specific quotation should always be obtained before planning travel."),

  h2("Frequently Asked Questions"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Related Colon Cancer Resources"),
  ul([
    "[Colon Cancer Treatment in India](" + PILLAR + ") — stage, molecular tests and when immunotherapy sits in the pathway.",
    "[Colon Cancer Chemotherapy in India](" + CHEMO_BLOG + ") — FOLFOX, CAPOX, FOLFIRI and when immunotherapy comes first.",
    "[Stage 4 Colon Cancer Treatment in India](" + STAGE4 + ") — metastatic resectability, conversion therapy and later lines.",
    "[Stage 3 Colon Cancer Treatment in India](" + STAGE3 + ") — adjuvant chemotherapy and the evolving adjuvant immunotherapy discussion.",
    "[Stage 2 Colon Cancer Treatment in India](" + STAGE2 + ") — why immunotherapy is not automatic after surgery.",
    "[Stage 1 Colon Cancer Treatment in India](" + STAGE1 + ") — surgery-first care without routine immunotherapy.",
    "[Colon Cancer Surgery in India](" + SURGERY_BLOG + ") — hemicolectomy, anastomosis and recovery before systemic treatment.",
    "[Immunotherapy cost in India](" + IMMUNO + ") — GAF planning range $15,000–$45,000.",
    "[Precision oncology](" + PRECISION + ") — MSI/MMR, RAS, BRAF and HER2 testing ($2,000–$7,000).",
    "[Rectal cancer surgery](" + RECTAL + ") — a different pathway when radiation and rectal immunotherapy algorithms may apply.",
    "[Breast cancer treatment in India](" + BREAST + ") and [prostate cancer treatment in India](" + PROSTATE + ") — other GAF cancer pathways.",
  ]),

  h2("How GAF Healthcare Can Help"),
  p("GAF Healthcare coordinates international patients who need a colon cancer immunotherapy opinion in India — after an MSI-H/dMMR result, a question about pembrolizumab versus nivolumab plus ipilimumab, or a Stage 4 plan that may later include local treatment. Share the colonoscopy PDF, the **complete pathology report**, MSI/MMR result, CT/MRI, CEA, previous treatment records and any RAS/BRAF/HER2 results. A coordinator can introduce a [medical oncologist](" + MED_DOCS + ") and, when conversion surgery is possible, a [surgical oncologist](" + SURG_DOCS + "), then help collect an itemised quotation naming the drug, dose, infusion interval and monitoring."),
  btn("Share records for an immunotherapy review", consult("Colon Cancer Immunotherapy")),
  p("[WhatsApp +91 90443 46292 with MSI/MMR, imaging and previous treatments](" + wa("I would like to share my colon cancer MSI/MMR report, imaging and previous treatment records for an immunotherapy second opinion in India.") + ")"),

  h2("Medical Disclaimer"),
  p("This article is for educational and medical-tourism information only. It does not replace evaluation by a qualified medical oncologist, colorectal surgeon or multidisciplinary cancer team. Immunotherapy should only be prescribed after assessment of the patient's stage, pathology, molecular profile, medical history, contraindications and treatment goals. Patients should not start, stop or change cancer treatment without discussing it with their treating doctor."),

  h2("Top 10 Sources"),
  p("1. [ESMO — Gastrointestinal cancer guidelines](https://www.esmo.org/guidelines/guidelines-by-topic/esmo-clinical-practice-guidelines-gastrointestinal-cancers) — dMMR/MSI-H as a first decision point; nivolumab plus ipilimumab or pembrolizumab in metastatic colorectal cancer."),
  p("2. [NCI — Colon Cancer Treatment (PDQ®)](https://www.cancer.gov/types/colorectal/hp/colon-treatment-pdq) — systemic options by stage, including immunotherapy in selected MSI-H/dMMR disease."),
  p("3. [ASCO — Gastrointestinal cancer guidelines](https://www.asco.org/practice-patients/guidelines/gastrointestinal-cancer) — treatment of metastatic colorectal cancer, including pembrolizumab for MSI-H/dMMR disease."),
  p("4. [U.S. FDA — pembrolizumab for first-line MSI-H/dMMR colorectal cancer](https://www.fda.gov/drugs/drug-approvals-and-databases/fda-approves-pembrolizumab-first-line-treatment-msi-hdmmr-colorectal-cancer) — KEYNOTE-177 median PFS 16.5 vs 8.2 months."),
  p("5. [U.S. FDA — nivolumab plus ipilimumab for unresectable or metastatic MSI-H/dMMR colorectal cancer](https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-nivolumab-ipilimumab-unresectable-or-metastatic-msi-hdmmr-colorectal-cancer) — CheckMate-8HW first-line combination approval."),
  p("6. [2025 Indian consensus statements for advanced/metastatic colorectal cancer](https://www.thieme-connect.de/products/ejournals/html/10.1055/s-0045-1809380) — biomarker-directed first-line choices in Indian practice."),
  p("7. [NCI — immune checkpoint inhibitors](https://www.cancer.gov/about-cancer/treatment/types/immunotherapy/checkpoint-inhibitors) — PD-1 and CTLA-4 blockade."),
  p("8. [NCI — immunotherapy side effects](https://www.cancer.gov/about-cancer/treatment/types/immunotherapy/side-effects) — colitis, hepatitis, pneumonitis, endocrine and other immune-related adverse events."),
  p("9. [KEYNOTE-177 — pembrolizumab in MSI-H/dMMR metastatic colorectal cancer](https://www.nejm.org/doi/full/10.1056/NEJMoa2017699) — pembrolizumab versus chemotherapy in previously untreated MSI-H/dMMR disease."),
  p("10. [CheckMate-8HW — nivolumab plus ipilimumab in MSI-H/dMMR metastatic colorectal cancer](https://www.nejm.org/doi/full/10.1056/NEJMoa2402141) — combination checkpoint inhibition versus chemotherapy or nivolumab."),
  p("**Last reviewed against the cited sources: September 2026.**"),
];

const now = "2026-09-28T20:30:00.000Z";
const SLUG = "colon-cancer-immunotherapy-in-india";

const article = {
  id: "art_colon_cancer_immunotherapy_in_india",
  slug: SLUG,
  title: "Colon Cancer Immunotherapy in India: MSI-H, Pembrolizumab and Nivolumab",
  excerpt:
    "When colon cancer immunotherapy is appropriate: MSI-H/dMMR testing, pembrolizumab, nivolumab plus ipilimumab, immune-related side effects and GAF planning ranges.",
  date: "28 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Medical Oncology",
  tags: ["colon cancer", "immunotherapy", "MSI-H", "pembrolizumab", "nivolumab", "India"],
  image: "/uploads/articles/colon-io-anatomy.webp",
  imageAlt:
    "Transparent adult body with a teal colon and a gold tumour used to explain MSI-H/dMMR colon cancer immunotherapy",
  status: "published",
  featured: true,
  seoTitle: "Colon Cancer Immunotherapy in India: MSI-H, Pembrolizumab and Nivolumab",
  seoDescription:
    "Colon cancer immunotherapy in India: MSI-H/dMMR testing, pembrolizumab, nivolumab plus ipilimumab, immune-related side effects and GAF USD planning ranges.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/colon-io-anatomy.webp",
  allowIndex: true,
  keywords: [
    "colon cancer immunotherapy in India",
    "MSI-H dMMR colon cancer",
    "pembrolizumab colon cancer",
    "nivolumab ipilimumab CheckMate-8HW",
    "KEYNOTE-177",
    "immune-related colitis",
    "colon cancer immunotherapy cost in India",
    "MSS pMMR immunotherapy",
    "Lynch syndrome colon cancer",
  ],
  relatedLinks: [
    { label: "Colon Cancer Treatment in India", href: PILLAR },
    { label: "Colon Cancer Chemotherapy in India", href: CHEMO_BLOG },
    { label: "Stage 4 Colon Cancer Treatment in India", href: STAGE4 },
    { label: "Colon Cancer Surgery in India", href: SURGERY_BLOG },
    { label: "Immunotherapy cost in India", href: IMMUNO },
  ],
  blocks,
};

if (!store.categories.includes("Medical Oncology")) store.categories.push("Medical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["colon-io-anatomy.webp", article.imageAlt],
  [
    "colon-io-immune.webp",
    "Transparent abdomen showing a teal colon and a gold tumour surrounded by immune cells used to explain checkpoint inhibitors",
  ],
  [
    "colon-io-infusion.webp",
    "Adult in an immunotherapy day-care chair with a colon-and-tumour overlay used to explain pembrolizumab or nivolumab",
  ],
  [
    "colon-io-clinic.webp",
    "Adult patient in clinic with a colon-and-immune overlay while a medical oncologist explains MSI-H immunotherapy",
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

function linkSibling(row, href, label, blurb) {
  if (!row) return;
  if (!row.relatedLinks.some((link) => link.href === href)) {
    row.relatedLinks.unshift({ label, href });
  }
  for (const block of row.blocks) {
    if (block.type === "list" && Array.isArray(block.items)) {
      const already = block.items.some((item) => String(item).includes(href));
      const related = block.items.some(
        (item) =>
          String(item).includes("Colon Cancer Treatment in India") ||
          String(item).includes("colon-cancer-treatment-in-india"),
      );
      if (related && !already) {
        block.items.unshift(`[${label}](${href}) — ${blurb}`);
      }
    }
  }
}

const blurb =
  "MSI-H/dMMR testing, pembrolizumab, nivolumab plus ipilimumab and immune-related side effects.";
for (const slug of [
  "colon-cancer-surgery-in-india",
  "stage-1-colon-cancer-treatment-in-india",
  "stage-2-colon-cancer-treatment-in-india",
  "stage-3-colon-cancer-treatment-in-india",
  "stage-4-colon-cancer-treatment-in-india",
  "colon-cancer-chemotherapy-in-india",
]) {
  linkSibling(store.articles.find((row) => row.slug === slug), IMMUNO_BLOG, "Colon Cancer Immunotherapy in India", blurb);
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log(
  "wrote",
  article.slug,
  "blocks",
  blocks.length,
  "ctas",
  blocks.filter((b) => b.type === "button" || (b.type === "paragraph" && /wa\.me|\/consult\?/.test(b.text || ""))).length,
);

const treatmentsPath = join(process.cwd(), "content/curated-treatments.json");
const treatments = JSON.parse(readFileSync(treatmentsPath, "utf8"));
const treatment = treatments.treatments.find((row) => row.slug === "colon-cancer-treatment-in-india");
if (treatment?.translations?.en?.editorialBody && !treatment.translations.en.editorialBody.includes(IMMUNO_BLOG)) {
  treatment.translations.en.editorialBody = treatment.translations.en.editorialBody.replace(
    "Tumours with **dMMR** (deficient mismatch repair) or **MSI-H** (microsatellite instability-high) may behave differently and can be particularly relevant when considering [immunotherapy](/costs/India/Medical-Oncology/Immunotherapy). For this reason, MSI/MMR assessment is an important part of modern colorectal cancer evaluation.",
    "Tumours with **dMMR** (deficient mismatch repair) or **MSI-H** (microsatellite instability-high) may behave differently and can be particularly relevant when considering [immunotherapy](/costs/India/Medical-Oncology/Immunotherapy). How pembrolizumab, nivolumab plus ipilimumab and MSI/MMR testing are planned is covered in [Colon Cancer Immunotherapy in India](/blogs/colon-cancer-immunotherapy-in-india). For this reason, MSI/MMR assessment is an important part of modern colorectal cancer evaluation.",
  );
  writeFileSync(treatmentsPath, `${JSON.stringify(treatments, null, 2)}\n`);
  console.log("linked immunotherapy blog from colon treatment editorial");
}

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes("colon-cancer-immunotherapy-in-india")) {
  llms = llms.replace(
    "and [colon cancer chemotherapy in India](https://gaf.healthcare/blogs/colon-cancer-chemotherapy-in-india).",
    ", [colon cancer chemotherapy in India](https://gaf.healthcare/blogs/colon-cancer-chemotherapy-in-india) and [colon cancer immunotherapy in India](https://gaf.healthcare/blogs/colon-cancer-immunotherapy-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}
