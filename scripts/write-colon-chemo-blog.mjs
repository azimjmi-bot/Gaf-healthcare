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
const COLECTOMY = "/costs/India/Surgical-Oncology/Colectomy";
const CRC_SURG = "/costs/India/Surgical-Gastroenterology/Colorectal-Cancer-Surgery";
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

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body">Colon cancer chemotherapy is selected according to the stage and biology of the cancer.</p><p class="article-quick-answer__body"><strong>Stage 1</strong></p><p class="article-quick-answer__body">Chemotherapy is <strong>usually not required</strong> after adequate surgical treatment.</p><p class="article-quick-answer__body"><strong>Stage 2</strong></p><p class="article-quick-answer__body">Chemotherapy is <strong>not routinely required for every patient</strong>. It may be considered when pathological or molecular features indicate a higher recurrence risk.</p><p class="article-quick-answer__body"><strong>Stage 3</strong></p><p class="article-quick-answer__body">Chemotherapy after surgery is generally recommended.</p><p class="article-quick-answer__body">The most commonly used regimens are:</p><ul class="article-quick-answer__list"><li><strong>FOLFOX</strong></li><li><strong>CAPOX</strong></li></ul><p class="article-quick-answer__body">The duration may be approximately three to six months depending on the patient's risk category, regimen and clinical circumstances.</p><p class="article-quick-answer__body"><strong>Stage 4</strong></p><p class="article-quick-answer__body">Treatment is usually systemic and may include:</p><ul class="article-quick-answer__list"><li>FOLFOX</li><li>CAPOX</li><li>FOLFIRI</li><li>FOLFOXIRI</li></ul><p class="article-quick-answer__body">These may be combined with targeted medicines or, in biomarker-selected patients, immunotherapy.</p><p class="article-quick-answer__body">The treatment plan can change over time if the cancer responds, remains stable or progresses.</p></aside>`;

const stageTable = `<div class="md-body"><table><thead><tr><th>Colon cancer stage</th><th>Typical role of chemotherapy</th></tr></thead><tbody><tr><td>Stage 0</td><td>Usually not required</td></tr><tr><td>Stage 1</td><td>Usually not required</td></tr><tr><td>Stage 2</td><td>Selected high-risk patients</td></tr><tr><td>Stage 3</td><td>Generally recommended after surgery</td></tr><tr><td>Stage 4</td><td>Major systemic treatment option</td></tr><tr><td>Recurrent disease</td><td>Depends on previous treatment and tumor biology</td></tr></tbody></table></div>`;

const foxVsCapox = `<div class="md-body"><table><thead><tr><th>Feature</th><th>FOLFOX</th><th>CAPOX</th></tr></thead><tbody><tr><td>Main fluoropyrimidine</td><td>5-FU</td><td>Capecitabine</td></tr><tr><td>Fluoropyrimidine route</td><td>IV</td><td>Oral</td></tr><tr><td>Oxaliplatin</td><td>Yes</td><td>Yes</td></tr><tr><td>Typical cycle pattern</td><td>Often 2 weeks</td><td>Often 3 weeks</td></tr><tr><td>Infusion requirement</td><td>More extensive</td><td>Less continuous infusion</td></tr><tr><td>Home medication</td><td>Usually limited</td><td>Capecitabine tablets</td></tr><tr><td>Important toxicity</td><td>Neuropathy, cytopenias, diarrhea</td><td>Neuropathy, diarrhea, hand-foot syndrome</td></tr><tr><td>Common use</td><td>Stage 3 and metastatic disease</td><td>Stage 3 and metastatic disease</td></tr></tbody></table></div>`;

const foxVsFiri = `<div class="md-body"><table><thead><tr><th>Feature</th><th>FOLFOX</th><th>FOLFIRI</th></tr></thead><tbody><tr><td>Key drug</td><td>Oxaliplatin</td><td>Irinotecan</td></tr><tr><td>Fluoropyrimidine</td><td>5-FU</td><td>5-FU</td></tr><tr><td>Main cumulative concern</td><td>Peripheral neuropathy</td><td>Diarrhea and other irinotecan-related toxicity</td></tr><tr><td>Common use</td><td>Adjuvant and metastatic</td><td>Mainly metastatic / later-line</td></tr><tr><td>Can be sequenced?</td><td>Yes</td><td>Yes</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Component</th><th>GAF planning range in India</th></tr></thead><tbody><tr><td><a href="${CHEMO}">Chemotherapy</a> (FOLFOX, CAPOX, FOLFIRI)</td><td>$1,500–$8,000+</td></tr><tr><td><a href="${TARGETED}">Targeted therapy</a></td><td>$8,000–$30,000</td></tr><tr><td><a href="${IMMUNO}">Immunotherapy</a></td><td>$15,000–$45,000</td></tr><tr><td><a href="${PRECISION}">Precision oncology / molecular testing</a></td><td>$2,000–$7,000</td></tr><tr><td><a href="${COLECTOMY}">Colectomy</a></td><td>$7,000–$18,000</td></tr><tr><td><a href="${COLONOSCOPY}">Colonoscopy</a></td><td>$200–$550</td></tr><tr><td><a href="${LIVER}">Liver resection</a> if conversion succeeds</td><td>$10,000–$26,000</td></tr></tbody></table></div>`;

const faqs = [
  ["Is chemotherapy necessary after colon cancer surgery?", "It depends on the stage and pathology. Stage 3 patients generally receive adjuvant chemotherapy unless there is a specific reason not to. Stage 2 patients may be considered for chemotherapy when higher-risk features are present."],
  ["Which chemotherapy is best for colon cancer?", "There is no single best regimen for every patient. FOLFOX and CAPOX are commonly used after surgery for Stage 3 disease, while FOLFOX, CAPOX, FOLFIRI and FOLFOXIRI have roles in metastatic disease."],
  ["Is CAPOX better than FOLFOX?", "Neither is universally better. CAPOX offers an oral fluoropyrimidine and a three-week cycle, while FOLFOX uses intravenous 5-FU and commonly has a two-week cycle. The choice should consider efficacy, side effects, kidney function, lifestyle and patient preference."],
  ["Is FOLFOX chemotherapy painful?", "The infusion itself is not necessarily painful, although patients can experience discomfort from the IV or port. Side effects such as neuropathy, nausea, fatigue or cold sensitivity may occur."],
  ["How many cycles of FOLFOX are needed?", "The number depends on the treatment setting. Adjuvant treatment for Stage 3 disease is commonly planned around a three- to six-month duration, while metastatic treatment may continue longer and change according to response and toxicity."],
  ["How many cycles of CAPOX are needed?", "The number depends on whether CAPOX is being used for adjuvant or metastatic treatment and on the intended duration. The oncologist should specify the exact number."],
  ["Does colon cancer chemotherapy cause hair loss?", "Hair loss is not necessarily complete with common colon cancer regimens. The extent varies according to the drugs used."],
  ["Does chemotherapy cause weight loss?", "It can, particularly if nausea, diarrhea, poor appetite or other complications occur. Some patients maintain or gain weight during treatment."],
  ["Can chemotherapy cure colon cancer?", "In the adjuvant setting, chemotherapy is intended to reduce the risk of recurrence after surgery. In selected metastatic patients, systemic therapy may contribute to a curative treatment strategy when all metastatic disease can ultimately be removed or controlled locally. For widespread metastatic disease, chemotherapy is generally used to control the cancer."],
  ["Can chemotherapy shrink colon cancer?", "Yes. Chemotherapy can shrink tumors in some patients. This is particularly important when treatment is being used as conversion therapy to make metastatic disease potentially removable."],
  ["What happens if chemotherapy does not work?", "The oncology team may change the regimen, add or change targeted treatment, use immunotherapy when appropriate, consider biomarker-directed treatment, or evaluate clinical-trial options."],
  ["Can colon cancer chemotherapy be given at home?", "Some medicines, such as capecitabine, are taken orally at home. Other medicines require hospital or chemotherapy-daycare administration."],
  ["How much does colon cancer chemotherapy cost in India?", "Costs vary according to the regimen, number of cycles, hospital, drug brands, targeted therapy and other medical requirements. GAF planning ranges for chemotherapy are $1,500–$8,000+. A patient-specific quotation is more reliable than a generic online estimate."],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("Colon cancer chemotherapy in India is used to destroy cancer cells, reduce the risk of recurrence after surgery, shrink advanced tumors, control metastatic disease and, in selected patients, make previously difficult-to-remove tumors suitable for surgery. Chemotherapy is not one single treatment. The appropriate drugs, combination, number of cycles and duration depend on the **stage of colon cancer, molecular characteristics of the tumor, treatment objective, previous treatment, overall health and ability to tolerate side effects**."),
  p("This article is the chemotherapy hub for the colon cluster. The broader pathway is in [Colon Cancer Treatment in India](" + PILLAR + "). [Stage 1](" + STAGE1 + ") usually needs surgery only. [Stage 2](" + STAGE2 + ") discusses when adjuvant chemotherapy is considered. [Stage 3](" + STAGE3 + ") covers FOLFOX versus CAPOX and 3 versus 6 months. [Stage 4](" + STAGE4 + ") covers metastatic resectability, conversion therapy and biomarker-directed treatment. How the operation itself is planned is in [Colon Cancer Surgery in India](" + SURGERY_BLOG + "). It is **not** a rectal-cancer page: radiation has a much larger role when the tumour is rectal. See [rectal cancer surgery](" + RECTAL + ")."),
  p("GAF Healthcare planning ranges for [chemotherapy](" + CHEMO + ") are **$1,500–$8,000+**. [Targeted therapy](" + TARGETED + ") is **$8,000–$30,000**. [Immunotherapy](" + IMMUNO + ") is **$15,000–$45,000**. [Precision oncology / molecular testing](" + PRECISION + ") is **$2,000–$7,000**. These are planning ranges, not hospital quotations."),
  p("International patients comparing [medical oncologists](" + MED_DOCS + ") commonly start with [Delhi NCR chemotherapy](/doctors/India/Delhi-NCR/Medical-Oncology/Chemotherapy), [Mumbai](/doctors/India/Mumbai/Medical-Oncology/Chemotherapy), [Bengaluru](/doctors/India/Bengaluru/Medical-Oncology/Chemotherapy), [Chennai](/doctors/India/Chennai/Medical-Oncology/Chemotherapy) and [Hyderabad](/doctors/India/Hyderabad/Medical-Oncology/Chemotherapy). Partner [medical-oncology hospitals](" + MED_HOSP + ") in [Delhi NCR](/hospitals/India/Delhi-NCR/Medical-Oncology) and [Mumbai](/hospitals/India/Mumbai/Medical-Oncology) are a typical first filter. [Surgical oncologists](" + SURG_DOCS + ") remain part of the same tumour board when conversion surgery is possible."),
  btn("Ask about colon cancer chemotherapy in India", consult("Colon Cancer Chemotherapy")),
  p("[WhatsApp +91 90443 46292 with stage, node count and MSI/MMR](" + wa("Please review my colon cancer pathology, stage, node count and MSI/MMR and advise whether FOLFOX, CAPOX or immunotherapy is appropriate in India.") + ")"),
  img(
    "/uploads/articles/colon-chemo-anatomy.webp",
    "Transparent adult body with a teal colon and a gold tumour used to explain systemic colon cancer chemotherapy",
    "Unlike surgery, systemic chemotherapy travels through the bloodstream and can reach microscopic cancer cells throughout the body.",
  ),

  h2("What Is Chemotherapy for Colon Cancer?"),
  p("Chemotherapy uses medicines that interfere with the growth and survival of cancer cells. Unlike surgery, which treats a specific physical tumour, **systemic chemotherapy travels through the bloodstream**. This makes it useful when microscopic cancer cells may remain after surgery or when cancer has spread beyond the colon. It may be given before surgery, after surgery, instead of immediate surgery in selected advanced situations, together with targeted therapy, as conversion therapy, or as later-line treatment after progression."),

  h2("Why Is Chemotherapy Used?"),
  p("**Adjuvant chemotherapy** reduces recurrence after surgery — particularly important in [Stage 3 colon cancer](" + STAGE3 + "). The purpose is to eliminate microscopic cells that may remain after the visible tumour has been removed."),
  p("**Neoadjuvant therapy** may shrink a selected locally advanced tumour before surgery, make complete removal more likely and treat microscopic disease earlier."),
  p("**Conversion therapy** may shrink initially unresectable metastases so that surgery or another local treatment becomes possible. See [Stage 4 colon cancer treatment](" + STAGE4 + "). When metastatic disease cannot be completely removed, systemic treatment can slow growth, control symptoms, delay progression and maintain quality of life."),

  h2("Is Chemotherapy Necessary for Every Colon Cancer Patient?"),
  p("No. Chemotherapy depends heavily on the stage and risk profile."),
  html(stageTable),
  p("The final decision should be based on pathology, imaging, molecular testing and overall health — not on the word \"colon cancer\" alone."),

  h2("Colon Cancer Chemotherapy by Stage"),
  h3("Stage 1"),
  p("Most [Stage 1 colon cancers](" + STAGE1 + ") are treated with surgery alone. Chemotherapy is generally not needed because the risk of systemic recurrence is relatively low after adequate removal."),
  h3("Stage 2"),
  p("[Stage 2](" + STAGE2 + ") is more complicated. Some patients require only surgery and surveillance. Others may be considered for adjuvant chemotherapy because of T4 disease, inadequate lymph-node evaluation, poor differentiation in appropriate contexts, lymphovascular or perineural invasion, obstruction, perforation, concerning margins or other unfavorable features. **MMR/MSI status** can also influence the discussion. A Stage 2 patient should not be told that chemotherapy is automatically necessary or automatically unnecessary."),
  h3("Stage 3"),
  p("[Stage 3](" + STAGE3 + ") means regional lymph nodes contain cancer. For most patients after complete surgical removal, **adjuvant chemotherapy is a standard component**. Common regimens are **FOLFOX** and **CAPOX**. Choice depends on T and N stage, age, kidney function, neuropathy risk, performance status, previous chemotherapy, preference and duration considerations."),
  img(
    "/uploads/articles/colon-chemo-nodes.webp",
    "Transparent adult abdomen showing a teal colon, gold tumour and mixed gold and teal mesenteric lymph nodes used to explain adjuvant chemotherapy",
    "Node-positive Stage 3 disease is why adjuvant FOLFOX or CAPOX is generally recommended after surgery.",
  ),
  h3("How long is Stage 3 chemotherapy?"),
  p("Treatment can be approximately **3 months** or **6 months**. The major evidence for shorter treatment comes from the **IDEA** collaboration comparing three versus six months of oxaliplatin-based chemotherapy. Three months of CAPOX is an established option for many lower-risk Stage 3 patients (often T1–3 N1), while the decision is different for higher-risk disease (T4 and/or N2) and for FOLFOX."),
  p("A 2026 final analysis of the **SCOT** trial reported five-year overall survival of **82.4%** with both three and six months of treatment in its study population, with noninferiority for CAPOX but not for FOLFOX. This does **not** mean that every Stage 3 patient should receive three months. The decision should be individualized."),
  btn("Ask about FOLFOX versus CAPOX and 3 vs 6 months", consult("Chemotherapy")),
  p("[WhatsApp +91 90443 46292 about chemotherapy duration](" + wa("Please advise whether 3 months of CAPOX or 6 months of FOLFOX is more appropriate for my colon cancer risk group in India.") + ")"),

  h2("What Is FOLFOX?"),
  p("**FOLFOX** combines folinic acid/leucovorin (**FOL**), fluorouracil/5-FU (**F**) and oxaliplatin (**OX**). It is used in Stage 3 disease, selected high-risk Stage 2 disease, Stage 4 disease and selected conversion settings. It is usually given intravenously. A common schedule repeats every two weeks: blood tests, pre-medications, oxaliplatin, leucovorin, 5-FU (sometimes with a portable infusion pump), then a recovery period. Doses can be modified for blood counts, kidney and liver function, neuropathy, diarrhea and overall tolerance."),

  h2("What Is CAPOX?"),
  p("**CAPOX**, also called **XELOX**, combines **capecitabine** and **oxaliplatin**. The major difference from FOLFOX is that capecitabine is taken orally instead of continuous intravenous 5-FU. A typical cycle may involve oxaliplatin on day 1, capecitabine tablets for a defined number of days, a treatment-free period, then a three-week cycle. Kidney function is particularly important when determining suitability and dosing of capecitabine. NCI recognizes CAPOX as an established colorectal cancer chemotherapy combination."),
  html(foxVsCapox),
  p("Neither regimen is universally \"better.\" The choice depends on the patient and treatment objective."),
  img(
    "/uploads/articles/colon-chemo-clinic.webp",
    "Adult patient in clinic with a colon-and-lymph-node overlay while a medical oncologist explains FOLFOX versus CAPOX",
    "Ask why this regimen, how long it will last, and how neuropathy will be monitored — not only which protocol is newest.",
  ),

  h2("What Is FOLFIRI? What Is FOLFOXIRI?"),
  p("**FOLFIRI** combines leucovorin, 5-FU and **irinotecan**. It is particularly important in metastatic colon cancer — as first-line therapy, after progression on oxaliplatin-based treatment, as part of conversion therapy, or with targeted therapy in selected patients. The choice between FOLFOX and FOLFIRI often depends on what the patient has already received. After progression, **FOLFOX → FOLFIRI** or **FOLFIRI → FOLFOX** may be used."),
  html(foxVsFiri),
  p("**FOLFOXIRI** (5-FU, leucovorin, oxaliplatin and irinotecan) is a more intensive regimen for selected fit patients with metastatic disease — high tumour burden, rapidly progressive disease, need for substantial shrinkage, or conversion to potentially resectable disease. The trade-off is increased toxicity. The 2025 Indian metastatic colorectal cancer consensus supports FOLFOXIRI/mFOLFIRINOX in selected fit patients when a substantial response or conversion to resection is an important objective."),
  p("Not every patient is fit enough for combination chemotherapy. For selected older or frail patients, doctors may use capecitabine, 5-FU or other less-intensive regimens. The 2025 Indian consensus emphasizes age, frailty, comorbidities, organ function and preferences when selecting intensity."),

  h2("Metastatic Disease, Targeted Therapy and Immunotherapy"),
  p("In [Stage 4 colon cancer](" + STAGE4 + "), chemotherapy is generally used as systemic treatment. Choice depends on MSI/MMR, RAS, BRAF, HER2, sidedness, tumour burden, symptoms, resectability, need for rapid shrinkage, previous chemotherapy and fitness. GAF planning ranges for [chemotherapy](" + CHEMO + ") are **$1,500–$8,000+**."),
  p("Chemotherapy can be combined with [targeted therapy](" + TARGETED + ") (**$8,000–$30,000**) such as bevacizumab, cetuximab or panitumumab. **RAS status is critical** for anti-EGFR therapy. For appropriate **RAS wild-type, BRAF wild-type, left-sided** metastatic tumours, anti-EGFR plus chemotherapy can be an important first-line option. For many right-sided tumours, an anti-VEGF approach may be preferred first-line. The 2025 Indian consensus emphasizes primary tumour location, RAS/BRAF status and the goal of treatment when selecting chemotherapy plus a biologic."),
  p("Not every metastatic patient should automatically begin with chemotherapy. For **MSI-H/dMMR** tumours, [immunotherapy](" + IMMUNO + ") (**$15,000–$45,000**) can be an important first-line treatment. Current ESMO guidance identifies dMMR/MSI-H status as a major first decision point in metastatic colorectal cancer. ASCO guidance recommends pembrolizumab as first-line treatment for appropriately selected MSI-H/dMMR metastatic colorectal cancer. **MMR/MSI testing should be part of treatment planning** for advanced disease. GAF planning ranges for [precision oncology](" + PRECISION + ") are **$2,000–$7,000**."),
  btn("Ask whether immunotherapy should come before chemotherapy", consult("Immunotherapy")),
  btn("Ask how RAS, BRAF, HER2 and sidedness change the chemo backbone", consult("Targeted Therapy")),
  btn("Ask which molecular tests to complete before the first cycle", consult("Precision Oncology")),

  h2("Chemotherapy Before or After Surgery"),
  p("Chemotherapy before surgery is not required for every patient. It may be considered for locally advanced or T4b tumours, borderline resectable disease, selected metastatic disease, conversion therapy or clinical-trial settings. After surgery, **adjuvant chemotherapy** typically follows: colon surgery → final pathology → stage and recurrence-risk assessment → oncology consultation → adjuvant chemotherapy → surveillance. Treatment generally begins after sufficient postoperative recovery — adequate wound healing, nutrition, blood counts, kidney and liver function, and recovery from major complications."),
  img(
    "/uploads/articles/colon-chemo-infusion.webp",
    "Adult in a chemotherapy day-care chair with a colon-and-tumour overlay used to explain outpatient FOLFOX or FOLFIRI",
    "Most standard colon cancer chemotherapy is given in outpatient daycare, not as an overnight admission.",
  ),

  h2("Cycles, Daycare, Ports and Oral vs IV"),
  p("A **cycle** is one planned period of treatment followed by recovery. CAPOX commonly uses a three-week cycle; FOLFOX commonly uses a two-week cycle — so \"six cycles\" does not mean the same amount of time. Adjuvant Stage 3 treatment is approximately **3–6 months**. Metastatic treatment may continue much longer, with intensive treatment, maintenance, breaks, second-line and later-line therapy."),
  p("A typical visit includes blood tests, oncology assessment, dose review, pre-medications, infusion and observation. Most standard regimens are given through **outpatient chemotherapy daycare**. A central venous **port** may be recommended for repeated intravenous treatment; it is not always required. Oral medicines such as capecitabine do not mean milder treatment — they can still cause significant diarrhea and hand-foot syndrome."),

  h2("Side Effects and When to Seek Emergency Care"),
  p("Common effects include fatigue, nausea, vomiting, diarrhea, constipation, reduced appetite, taste changes, mouth sores, low blood counts, infection, neuropathy, hand-foot syndrome and skin changes. **Oxaliplatin** can cause cumulative peripheral neuropathy and unusual **cold sensitivity**. **Capecitabine** can cause hand-foot syndrome. **Irinotecan** can cause early or delayed diarrhea that may lead to dehydration. Low white cells raise infection risk; low platelets raise bleeding risk. Blood tests are therefore performed regularly. A cycle may be delayed or the dose reduced to keep treatment safe — that does not automatically mean treatment has failed."),
  p("**Fever, chills, severe diarrhea, persistent vomiting, shortness of breath, significant bleeding, new confusion, severe abdominal pain with vomiting or inability to pass stool, chest pain, sudden weakness or collapse belongs in a local emergency department — not a delayed WhatsApp message.** Follow the fever threshold given by the treating oncology team."),

  h2("If First-Line Treatment Stops Working"),
  p("Stage 4 disease is often treated through multiple lines: FOLFOX/CAPOX or FOLFIRI-based treatment, then a backbone switch after progression, then later-line trifluridine/tipiracil, regorafenib, fruquintinib, biomarker-specific therapy or clinical trials. The 2025 Indian consensus supports changing the chemotherapy backbone after progression on an oxaliplatin- or irinotecan-based regimen in appropriate patients. After good control, intensive chemotherapy may be stepped down to **maintenance** — for example discontinuing oxaliplatin because of neuropathy while continuing the fluoropyrimidine."),
  p("Liver metastases that may become resectable need regular reassessment — [liver resection](" + LIVER + ") planning ranges are **$10,000–$26,000**. Limited lung disease may also involve surgery, ablation or [SBRT](" + SBRT + "). Peritoneal disease may be evaluated for [CRS/HIPEC](" + HIPEC + "). A falling CEA can be encouraging but does not by itself mean the cancer is gone; imaging remains essential."),

  h2("Colon Cancer Chemotherapy Cost in India"),
  p("There is **no single price** for colon cancer chemotherapy because different patients receive different drugs and durations. A Stage 3 patient on CAPOX after surgery has a more predictable chemotherapy cost than a Stage 4 patient on FOLFOXIRI plus targeted therapy, then maintenance, then second-line treatment. GAF Healthcare publishes USD planning ranges compiled from partner hospital cost sheets. They are not hospital quotations. The largest variation usually occurs when targeted therapy or immunotherapy is added."),
  html(costTable),
  p("City pages such as [Delhi NCR chemotherapy](/costs/India/Delhi-NCR/Medical-Oncology/Chemotherapy), [Mumbai](/costs/India/Mumbai/Medical-Oncology/Chemotherapy), [Bengaluru](/costs/India/Bengaluru/Medical-Oncology/Chemotherapy), [Chennai](/costs/India/Chennai/Medical-Oncology/Chemotherapy) and [Hyderabad](/costs/India/Hyderabad/Medical-Oncology/Chemotherapy) use the same national range unless a hospital issues a verified quotation."),
  p("Ask whether the quotation names the drugs, manufacturer, generic versus branded product, number of cycles, daycare charges, labs, imaging, supportive medicines and what is excluded (admission for infection, extra cycles, targeted therapy, immunotherapy). Treatment decisions should never be based solely on the cheapest medicine."),
  btn("Ask for an itemised chemotherapy quotation", consult("Colon Cancer Chemotherapy Cost in India")),
  p("[WhatsApp +91 90443 46292 for a regimen-specific estimate](" + wa("Please send an itemised colon cancer chemotherapy quotation in India naming FOLFOX or CAPOX, cycles, daycare, labs and whether targeted therapy or immunotherapy is included.") + ")"),

  h2("How to Choose a Hospital and What to Ask"),
  p("Chemotherapy safety depends more on the quality of the cancer program and monitoring than simply the country. Look for experienced medical oncologists, qualified oncology nurses, proper chemotherapy preparation, blood-count monitoring, emergency support, infection-control, pharmacy controls, molecular pathology, colorectal surgery on the same tumour board and international-patient services."),
  ul([
    "[Medical oncology hospitals in Delhi NCR](/hospitals/India/Delhi-NCR/Medical-Oncology)",
    "[Medical oncology hospitals in Mumbai](/hospitals/India/Mumbai/Medical-Oncology)",
    "[Medical oncology hospitals in Bengaluru](/hospitals/India/Bengaluru/Medical-Oncology)",
    "[Medical oncology hospitals in Chennai](/hospitals/India/Chennai/Medical-Oncology)",
    "[Medical oncology hospitals in Hyderabad](/hospitals/India/Hyderabad/Medical-Oncology)",
  ]),
  ol([
    "What stage is my colon cancer, and why is chemotherapy being recommended — curative-intent adjuvant treatment or disease control?",
    "Which regimen — FOLFOX, CAPOX, FOLFIRI or FOLFOXIRI — and can duration be 3 rather than 6 months in my risk group?",
    "Has MMR/MSI, RAS, BRAF and HER2 been tested, and would immunotherapy or a targeted medicine come first?",
    "Do I need a port, will treatment be daycare, and what side effects require emergency care?",
    "How will neuropathy, diarrhea and blood counts be monitored, and when is the next CT?",
    "Can later cycles continue in my home country, and what is the estimated total cost with drugs named?",
  ]),

  h2("The Bottom Line"),
  p("Chemotherapy is not automatically required for every colon cancer patient. Stage 1 usually does not need it. Selected Stage 2 patients may benefit. Stage 3 generally needs postoperative FOLFOX or CAPOX for about 3–6 months, individualized by risk and neuropathy. FOLFIRI and FOLFOXIRI matter in metastatic disease. MSI-H/dMMR metastatic colon cancer may start with immunotherapy rather than chemotherapy. Molecular testing is essential before first-line Stage 4 treatment. Oxaliplatin neuropathy, capecitabine hand-foot syndrome and irinotecan diarrhea should be reported early. A patient-specific quotation should always be obtained before planning travel."),

  h2("Frequently Asked Questions"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Related Colon Cancer Resources"),
  ul([
    "[Colon Cancer Treatment in India](" + PILLAR + ") — stage, molecular tests and systemic medicines around chemotherapy.",
    "[Stage 3 Colon Cancer Treatment in India](" + STAGE3 + ") — adjuvant FOLFOX/CAPOX and 3 versus 6 months.",
    "[Stage 4 Colon Cancer Treatment in India](" + STAGE4 + ") — metastatic resectability, conversion therapy and later lines.",
    "[Stage 2 Colon Cancer Treatment in India](" + STAGE2 + ") — when adjuvant chemotherapy is only discussed.",
    "[Stage 1 Colon Cancer Treatment in India](" + STAGE1 + ") — why chemotherapy is usually not required.",
    "[Colon Cancer Surgery in India](" + SURGERY_BLOG + ") — hemicolectomy, anastomosis and recovery before adjuvant treatment.",
    "[Chemotherapy cost in India](" + CHEMO + ") — GAF planning range $1,500–$8,000+.",
    "[Immunotherapy](" + IMMUNO + ") — first-line option for MSI-H/dMMR metastatic disease.",
    "[Rectal cancer surgery](" + RECTAL + ") — a different pathway when radiation may be part of treatment.",
    "[Breast cancer treatment in India](" + BREAST + ") and [prostate cancer treatment in India](" + PROSTATE + ") — other GAF cancer pathways.",
  ]),

  h2("How GAF Healthcare Can Help"),
  p("GAF Healthcare coordinates international patients who need a colon cancer chemotherapy opinion in India — after Stage 3 pathology, a question about FOLFOX versus CAPOX, or an MSI/RAS result before first-line metastatic treatment. Share the colonoscopy PDF, the **complete pathology report**, CT/MRI, CEA, previous chemotherapy records and any molecular results. A coordinator can introduce a [medical oncologist](" + MED_DOCS + ") and, when conversion surgery is possible, a [surgical oncologist](" + SURG_DOCS + "), then help collect an itemised quotation naming the regimen, cycles, daycare and supportive medicines."),
  btn("Share records for a chemotherapy review", consult("Colon Cancer Chemotherapy")),
  p("[WhatsApp +91 90443 46292 with pathology, stage and previous cycles](" + wa("I would like to share my colon cancer pathology, stage, CEA and previous chemotherapy records for a chemotherapy second opinion in India.") + ")"),

  h2("Medical Disclaimer"),
  p("This article is intended for general educational purposes and should not replace consultation with a qualified medical oncologist or colorectal cancer team. Chemotherapy should be prescribed according to the patient's pathology, stage, molecular profile, previous treatment, kidney and liver function, general health and individual treatment goals. Patients should not start, stop or change cancer treatment without discussing it with their treating doctor."),

  h2("Top 10 Sources"),
  p("1. [NCI — Colon Cancer Treatment (PDQ®)](https://www.cancer.gov/types/colorectal/hp/colon-treatment-pdq) — adjuvant and metastatic chemotherapy, Stage III and Stage IV."),
  p("2. [ASCO — Gastrointestinal cancer guidelines](https://www.asco.org/practice-patients/guidelines/gastrointestinal-cancer) — treatment of metastatic colorectal cancer, including pembrolizumab for MSI-H/dMMR disease."),
  p("3. [ESMO — Gastrointestinal cancer guidelines](https://www.esmo.org/guidelines/guidelines-by-topic/esmo-clinical-practice-guidelines-gastrointestinal-cancers) — dMMR/MSI-H as a first decision point in metastatic colorectal cancer."),
  p("4. [2025 Indian consensus statements for advanced/metastatic colorectal cancer](https://www.thieme-connect.de/products/ejournals/html/10.1055/s-0045-1809380) — FOLFOXIRI in selected fit patients, backbone switch after progression, frailty and chemo plus targeted therapy."),
  p("5. [IDEA collaboration — duration of adjuvant chemotherapy](https://www.nejm.org/doi/full/10.1056/NEJMoa1713709) — 3 versus 6 months in Stage III colon cancer."),
  p("6. [SCOT trial — final overall-survival results](https://ascopubs.org/doi/10.1200/JCO-25-00621) — 5-year OS 82.4% with both 3 and 6 months; noninferiority for CAPOX but not FOLFOX."),
  p("7. [NCI — drugs approved for colon cancer](https://www.cancer.gov/about-cancer/treatment/drugs/colon) — CAPOX/XELOX and other established combinations."),
  p("8. [NCI — chemotherapy to treat cancer](https://www.cancer.gov/about-cancer/treatment/types/chemotherapy) — how systemic chemotherapy is given and monitored."),
  p("9. [NCI — nerve problems (peripheral neuropathy)](https://www.cancer.gov/about-cancer/treatment/side-effects/nerve-problems) — oxaliplatin-associated chemotherapy-induced peripheral neuropathy."),
  p("10. [NCI — Colon Cancer Treatment PDQ, Stage III and Stage IV sections](https://www.cancer.gov/types/colorectal/hp/colon-treatment-pdq) — adjuvant FOLFOX/CAPOX and metastatic systemic options."),
  p("**Last reviewed against the cited sources: September 2026.**"),
];

const now = "2026-09-28T20:00:00.000Z";
const SLUG = "colon-cancer-chemotherapy-in-india";

const article = {
  id: "art_colon_cancer_chemotherapy_in_india",
  slug: SLUG,
  title: "Colon Cancer Chemotherapy in India: FOLFOX, CAPOX and FOLFIRI",
  excerpt:
    "When colon cancer needs chemotherapy: FOLFOX vs CAPOX, 3 vs 6 months, FOLFIRI, FOLFOXIRI, MSI/MMR immunotherapy and GAF planning ranges.",
  date: "28 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Medical Oncology",
  tags: ["colon cancer", "chemotherapy", "FOLFOX", "CAPOX", "FOLFIRI", "India"],
  image: "/uploads/articles/colon-chemo-anatomy.webp",
  imageAlt:
    "Transparent adult body with a teal colon and a gold tumour used to explain systemic colon cancer chemotherapy",
  status: "published",
  featured: true,
  seoTitle: "Colon Cancer Chemotherapy in India: FOLFOX, CAPOX and FOLFIRI",
  seoDescription:
    "Colon cancer chemotherapy in India: FOLFOX vs CAPOX, 3 vs 6 months, FOLFIRI, FOLFOXIRI, MSI/MMR immunotherapy and GAF USD planning ranges.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/colon-chemo-anatomy.webp",
  allowIndex: true,
  keywords: [
    "colon cancer chemotherapy in India",
    "FOLFOX CAPOX colon cancer",
    "FOLFIRI FOLFOXIRI",
    "adjuvant chemotherapy Stage 3",
    "3 vs 6 months CAPOX",
    "oxaliplatin neuropathy",
    "colon cancer chemo cost in India",
    "MSI-H immunotherapy vs chemotherapy",
    "conversion therapy colon cancer",
  ],
  relatedLinks: [
    { label: "Colon Cancer Treatment in India", href: PILLAR },
    { label: "Stage 3 Colon Cancer Treatment in India", href: STAGE3 },
    { label: "Stage 4 Colon Cancer Treatment in India", href: STAGE4 },
    { label: "Colon Cancer Surgery in India", href: SURGERY_BLOG },
    { label: "Chemotherapy cost in India", href: CHEMO },
  ],
  blocks,
};

if (!store.categories.includes("Medical Oncology")) store.categories.push("Medical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["colon-chemo-anatomy.webp", article.imageAlt],
  [
    "colon-chemo-nodes.webp",
    "Transparent adult abdomen showing a teal colon, gold tumour and mixed gold and teal mesenteric lymph nodes used to explain adjuvant chemotherapy",
  ],
  [
    "colon-chemo-clinic.webp",
    "Adult patient in clinic with a colon-and-lymph-node overlay while a medical oncologist explains FOLFOX versus CAPOX",
  ],
  [
    "colon-chemo-infusion.webp",
    "Adult in a chemotherapy day-care chair with a colon-and-tumour overlay used to explain outpatient FOLFOX or FOLFIRI",
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

const blurb = "FOLFOX vs CAPOX, 3 versus 6 months, FOLFIRI and when immunotherapy comes first.";
linkSibling(store.articles.find((row) => row.slug === "colon-cancer-surgery-in-india"), CHEMO_BLOG, "Colon Cancer Chemotherapy in India", blurb);
linkSibling(store.articles.find((row) => row.slug === "stage-1-colon-cancer-treatment-in-india"), CHEMO_BLOG, "Colon Cancer Chemotherapy in India", blurb);
linkSibling(store.articles.find((row) => row.slug === "stage-2-colon-cancer-treatment-in-india"), CHEMO_BLOG, "Colon Cancer Chemotherapy in India", blurb);
linkSibling(store.articles.find((row) => row.slug === "stage-3-colon-cancer-treatment-in-india"), CHEMO_BLOG, "Colon Cancer Chemotherapy in India", blurb);
linkSibling(store.articles.find((row) => row.slug === "stage-4-colon-cancer-treatment-in-india"), CHEMO_BLOG, "Colon Cancer Chemotherapy in India", blurb);

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
if (treatment?.translations?.en?.editorialBody && !treatment.translations.en.editorialBody.includes(CHEMO_BLOG)) {
  treatment.translations.en.editorialBody = treatment.translations.en.editorialBody.replace(
    "Depending on the stage and risk of recurrence, [chemotherapy](/costs/India/Medical-Oncology/Chemotherapy) may be given after surgery.",
    "Depending on the stage and risk of recurrence, [chemotherapy](/costs/India/Medical-Oncology/Chemotherapy) may be given after surgery. How FOLFOX versus CAPOX, 3 versus 6 months, FOLFIRI and biomarker-directed combinations are planned is covered in [Colon Cancer Chemotherapy in India](/blogs/colon-cancer-chemotherapy-in-india).",
  );
  writeFileSync(treatmentsPath, `${JSON.stringify(treatments, null, 2)}\n`);
  console.log("linked chemotherapy blog from colon treatment editorial");
}

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes("colon-cancer-chemotherapy-in-india")) {
  llms = llms.replace(
    "and [stage 4 colon cancer treatment in India](https://gaf.healthcare/blogs/stage-4-colon-cancer-treatment-in-india).",
    ", [stage 4 colon cancer treatment in India](https://gaf.healthcare/blogs/stage-4-colon-cancer-treatment-in-india) and [colon cancer chemotherapy in India](https://gaf.healthcare/blogs/colon-cancer-chemotherapy-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}
