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
const COLECTOMY = "/costs/India/Surgical-Oncology/Colectomy";
const CRC_SURG = "/costs/India/Surgical-Gastroenterology/Colorectal-Cancer-Surgery";
const RECTAL = "/costs/India/Surgical-Oncology/Rectal-Cancer-Surgery";
const OSTOMY = "/costs/India/Surgical-Gastroenterology/Ostomy-Stoma-Surgery";
const COLONOSCOPY = "/costs/India/Gastroenterology/Colonoscopy";
const CHEMO = "/costs/India/Medical-Oncology/Chemotherapy";
const TARGETED = "/costs/India/Medical-Oncology/Targeted-Therapy";
const IMMUNO = "/costs/India/Medical-Oncology/Immunotherapy";
const PRECISION = "/costs/India/Medical-Oncology/Precision-Oncology";
const EBRT = "/costs/India/Radiation-Oncology/EBRT";
const SURG_DOCS = "/doctors/India/Surgical-Oncology";
const MED_DOCS = "/doctors/India/Medical-Oncology";
const GI_DOCS = "/doctors/India/Surgical-Gastroenterology";
const SURG_HOSP = "/hospitals/India/Surgical-Oncology";
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

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body">For most patients with resectable Stage 3 colon cancer, treatment follows this broad pathway:</p><p class="article-quick-answer__body"><strong>Diagnosis → Complete staging → Colon surgery → Final pathology → Adjuvant chemotherapy → Surveillance</strong></p><p class="article-quick-answer__body">The standard treatment generally includes:</p><ul class="article-quick-answer__list"><li>Surgical removal of the cancer-containing portion of the colon</li><li>Removal and examination of regional lymph nodes</li><li>Pathology to determine the exact T and N stage</li><li>Molecular testing, particularly <strong>MMR/MSI testing</strong></li><li>Adjuvant chemotherapy, commonly <strong>FOLFOX or CAPOX</strong></li><li>Regular follow-up with CEA testing, imaging and colonoscopy</li><li>Assessment of recurrence risk throughout follow-up</li></ul><p class="article-quick-answer__body">Some locally advanced tumors may require treatment before surgery. For selected patients with <strong>dMMR/MSI-H tumors</strong>, immunotherapy is an increasingly important area of treatment and clinical research.</p><p class="article-quick-answer__body">The exact treatment should be decided by a multidisciplinary team after reviewing the complete pathology and imaging.</p></aside>`;

const subTable = `<div class="md-body"><table><thead><tr><th>Sub-stage</th><th>General TNM pattern</th><th>What it means</th></tr></thead><tbody><tr><td>Stage IIIA</td><td>Earlier T category with limited nodal disease</td><td>Tumor is relatively less deeply invasive and/or has limited regional node involvement</td></tr><tr><td>Stage IIIB</td><td>More advanced local invasion and/or greater nodal involvement</td><td>Cancer has spread to regional nodes with deeper tumor invasion</td></tr><tr><td>Stage IIIC</td><td>Advanced T category and/or extensive nodal involvement</td><td>Greater local or regional disease burden</td></tr></tbody></table></div>`;

const vs2 = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Stage 2</th><th>Stage 3</th></tr></thead><tbody><tr><td>Local tumor invasion</td><td>Can be deep</td><td>Can be deep</td></tr><tr><td>Regional lymph nodes</td><td>No cancer in regional nodes</td><td>Cancer present in regional nodes</td></tr><tr><td>Distant metastasis</td><td>No</td><td>No</td></tr><tr><td>Surgery</td><td>Usually central</td><td>Usually central</td></tr><tr><td>Adjuvant chemotherapy</td><td>Selected patients</td><td>Generally recommended</td></tr><tr><td>Risk assessment</td><td>Pathological risk factors important</td><td>T and N risk groups particularly important</td></tr><tr><td>MMR/MSI</td><td>Important</td><td>Important</td></tr></tbody></table></div>`;

const vs4 = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Stage 3</th><th>Stage 4</th></tr></thead><tbody><tr><td>Regional lymph nodes</td><td>May contain cancer</td><td>May contain cancer</td></tr><tr><td>Distant organs</td><td>No confirmed metastasis</td><td>Distant metastasis present</td></tr><tr><td>Main treatment objective</td><td>Usually curative intent</td><td>Depends on resectability and disease pattern</td></tr><tr><td>Surgery</td><td>Common for primary tumor</td><td>Selected cases</td></tr><tr><td>Chemotherapy</td><td>Usually adjuvant after surgery</td><td>Usually systemic treatment</td></tr><tr><td>Molecular profiling</td><td>Increasingly important</td><td>Essential for treatment selection</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Component</th><th>GAF planning range in India</th></tr></thead><tbody><tr><td><a href="${COLONOSCOPY}">Colonoscopy</a></td><td>$200–$550</td></tr><tr><td><a href="${COLECTOMY}">Colectomy</a></td><td>$7,000–$18,000</td></tr><tr><td><a href="${CRC_SURG}">Colorectal cancer surgery</a></td><td>$8,000–$20,000</td></tr><tr><td><a href="${CHEMO}">Chemotherapy</a> (FOLFOX or CAPOX)</td><td>$1,500–$8,000+</td></tr><tr><td><a href="${PRECISION}">Precision oncology / MSI-MMR testing</a></td><td>$2,000–$7,000</td></tr><tr><td><a href="${IMMUNO}">Immunotherapy</a> in selected dMMR/MSI-H settings</td><td>$15,000–$45,000</td></tr><tr><td><a href="${OSTOMY}">Ostomy / stoma surgery</a> if required</td><td>$2,500–$6,800</td></tr></tbody></table></div>`;

const faqs = [
  ["Is Stage 3 colon cancer serious?", "Stage 3 colon cancer is a significant diagnosis because the cancer has spread to regional lymph nodes. However, it is different from metastatic Stage 4 disease because Stage 3 disease does not involve confirmed distant metastasis. Many patients are treated with curative intent using surgery followed by chemotherapy."],
  ["What is the main treatment for Stage 3 colon cancer?", "For resectable disease, the usual treatment consists of surgical removal of the tumor and regional lymph nodes followed by adjuvant chemotherapy."],
  ["Is chemotherapy always needed for Stage 3 colon cancer?", "Adjuvant chemotherapy is generally recommended for Stage 3 colon cancer unless there is a specific medical reason it cannot be given."],
  ["Which chemotherapy is used for Stage 3 colon cancer?", "FOLFOX and CAPOX are two commonly used oxaliplatin-based regimens."],
  ["Is three months of chemotherapy enough?", "For selected lower-risk Stage 3 patients, particularly those receiving CAPOX, three months can be an appropriate option. Higher-risk disease may lead the oncologist to recommend a longer course. The decision should be individualized."],
  ["What is high-risk Stage 3 colon cancer?", "In clinical discussions, T4 and/or N2 disease is generally categorized as higher-risk Stage 3 disease."],
  ["Is Stage 3 colon cancer curable?", "Treatment is usually given with curative intent when the tumor can be completely removed and there is no distant metastatic disease. However, recurrence remains possible."],
  ["Does Stage 3 colon cancer need radiation?", "Routine radiation is generally not used for colon cancer. It is much more commonly used in the management of locally advanced rectal cancer."],
  ["Is robotic surgery better than open surgery?", "Robotic surgery can be useful for selected patients, but it is not automatically better for every tumor. The appropriate approach depends on tumor location, complexity, anatomy and surgeon expertise."],
  ["Can Stage 3 colon cancer return after treatment?", "Yes. Recurrence can occur even after apparently complete treatment. This is why structured surveillance is important."],
  ["How long is chemotherapy for Stage 3 colon cancer?", "Depending on the risk category, regimen and patient factors, adjuvant chemotherapy may last approximately three to six months."],
  ["Can Stage 3 colon cancer be treated in India?", "Yes. India has multidisciplinary cancer centers offering colorectal surgery, medical oncology, chemotherapy, pathology, molecular testing and structured follow-up."],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("Stage 3 colon cancer means that cancer has spread from the colon to nearby lymph nodes, but there is no evidence of distant spread to organs such as the liver or lungs. Unlike Stage 1 or many Stage 2 cancers, Stage 3 colon cancer usually requires **both surgery and chemotherapy** as part of curative-intent treatment."),
  p("Treatment has become increasingly individualized. The number of affected lymph nodes, depth of tumor invasion, surgical margins, tumor biology, mismatch repair status, overall health, and the patient's ability to tolerate chemotherapy can all influence the treatment plan."),
  p("The most important point is that **Stage 3 colon cancer is not the same as Stage 4 colon cancer**. Stage 3 disease is regional disease without confirmed distant metastasis, and treatment is generally planned with the goal of eliminating the cancer and reducing the risk of recurrence."),
  p("This article is the Stage 3 hub for the colon cluster. The broader pathway is in [Colon Cancer Treatment in India](" + PILLAR + "). How hemicolectomy, stomas and open versus laparoscopic versus robotic approaches are planned is in [Colon Cancer Surgery in India](" + SURGERY_BLOG + "). [Stage 1](" + STAGE1 + ") covers T1/T2 and endoscopic removal. [Stage 2](" + STAGE2 + ") covers T3/T4 node-negative disease and when adjuvant chemotherapy is only discussed, not assumed. It is **not** a rectal-cancer page: radiation has a much larger role when the tumour is rectal. See [rectal cancer surgery](" + RECTAL + ")."),
  p("GAF Healthcare planning ranges for [colectomy](" + COLECTOMY + ") are **$7,000–$18,000** (typically 5–10 nights). The broader [colorectal cancer surgery](" + CRC_SURG + ") sheet lists **$8,000–$20,000**. Adjuvant [chemotherapy](" + CHEMO + ") is **$1,500–$8,000+**. [Precision oncology / MSI-MMR testing](" + PRECISION + ") is **$2,000–$7,000**."),
  p("International patients comparing [surgical oncologists](" + SURG_DOCS + "), [surgical gastroenterologists](" + GI_DOCS + ") and [medical oncologists](" + MED_DOCS + ") commonly start with [Delhi NCR](/doctors/India/Delhi-NCR/Surgical-Oncology/Colectomy), [Mumbai](/doctors/India/Mumbai/Surgical-Oncology/Colectomy), [Bengaluru](/doctors/India/Bengaluru/Surgical-Oncology/Colectomy), [Chennai](/doctors/India/Chennai/Surgical-Oncology/Colectomy) and [Hyderabad](/doctors/India/Hyderabad/Surgical-Oncology/Colectomy). Partner [surgical-oncology hospitals](" + SURG_HOSP + ") in [Delhi NCR](/hospitals/India/Delhi-NCR/Surgical-Oncology) and [Mumbai](/hospitals/India/Mumbai/Surgical-Oncology) are a typical first filter."),
  btn("Ask about Stage 3 colon cancer treatment in India", consult("Stage 3 Colon Cancer Treatment")),
  p("[WhatsApp +91 90443 46292 with node count, T stage and MSI/MMR](" + wa("Please review my Stage 3 colon cancer pathology, positive lymph-node count, T stage and MSI/MMR and advise on FOLFOX versus CAPOX and duration in India.") + ")"),
  img(
    "/uploads/articles/colon-s3-anatomy.webp",
    "Transparent adult body with a teal colon, gold tumour and gold regional lymph nodes used to explain Stage 3 colon cancer",
    "Stage 3 means regional lymph-node involvement without confirmed distant metastasis in organs such as the liver or lungs.",
  ),

  h2("What Is Stage 3 Colon Cancer?"),
  p("Colon cancer is staged using the **TNM system**: **T** — how deeply the tumor has grown through the colon wall or into nearby structures; **N** — whether regional lymph nodes contain cancer; **M** — whether the cancer has spread to distant organs. Stage 3 colon cancer is characterized by **regional lymph-node involvement without distant metastasis**, meaning **M0**."),
  p("Stage 3 is further divided into **Stage IIIA, IIIB and IIIC** according to the combination of the tumor's T category and lymph-node involvement. The exact sub-stage should be taken from the pathology report rather than assumed from the scan alone."),
  html(subTable),
  p("Two people can both have Stage 3 colon cancer but have different recurrence risks. **T1–3 N1** is generally considered lower-risk Stage III disease. **T4 and/or N2** is generally considered higher-risk Stage III disease. This distinction becomes particularly important when discussing the duration of adjuvant chemotherapy."),

  h2("Is Stage 3 Colon Cancer Curable?"),
  p("Stage 3 colon cancer can be treated with **curative intent** when the cancer can be completely removed and there is no distant metastatic disease. However, no doctor can guarantee that an individual patient will never experience recurrence."),
  p("The purpose of combining surgery with postoperative chemotherapy is to remove all visible cancer, remove regional lymph nodes that may contain microscopic disease, destroy microscopic cancer cells that may remain elsewhere, and reduce the risk of recurrence. Outlook depends on T stage, number of positive nodes, number of nodes examined, grade, lymphovascular and perineural invasion, margins, tumour deposits, MMR/MSI status, response to treatment, fitness, and whether treatment can be completed as planned."),

  h2("Symptoms and Diagnosis"),
  p("Symptoms can vary. Some patients have blood in the stool, a change in bowel habits, persistent constipation or diarrhea, narrower stools, abdominal pain, bloating, unexplained weight loss, fatigue, iron-deficiency anemia or a feeling that the bowel has not completely emptied. A person does not need to have all of these symptoms to have colon cancer."),
  p("Treatment planning starts with [colonoscopy](" + COLONOSCOPY + ") (**$200–$550**) and biopsy, then histopathology, contrast-enhanced CT of the chest, abdomen and pelvis, blood tests and CEA as a baseline. After surgery, the pathology report becomes even more important because the final pathological stage is generally more accurate than the initial clinical estimate."),
  p("**Severe abdominal pain with vomiting, inability to pass stool or gas, heavy rectal bleeding, chest pain, sudden shortness of breath or collapse belongs in a local emergency department — not a delayed WhatsApp message.**"),

  h2("Molecular Testing in Stage 3 Colon Cancer"),
  p("Modern colon cancer treatment is no longer based only on anatomical staging. **MMR and MSI testing** is particularly important. The tumor may be MMR-proficient (pMMR), MMR-deficient (dMMR), microsatellite stable (MSS) or MSI-high (MSI-H). Results can influence prognostic assessment, identification of possible Lynch syndrome, treatment planning, and eligibility for certain immunotherapy approaches or clinical trials. GAF planning ranges for [precision oncology](" + PRECISION + ") include **$2,000–$7,000**."),
  p("Broader testing such as KRAS, NRAS, BRAF, HER2 and NTRK becomes especially important if the cancer later becomes metastatic. For a typical resectable Stage 3 colon cancer, **MMR/MSI testing is particularly relevant to treatment planning**. [Targeted therapy](" + TARGETED + ") (**$8,000–$30,000**) is generally a later-line or metastatic discussion rather than routine adjuvant Stage 3 care."),
  btn("Ask about MSI/MMR testing after Stage 3 surgery", consult("Precision Oncology")),

  h2("Does Stage 3 Colon Cancer Require Surgery?"),
  p("For a resectable Stage 3 colon cancer, **surgery is usually a central component of treatment**. The objective is to remove the primary tumor, an appropriate length of surrounding colon, and the regional lymphatic drainage. The surgeon then reconnects the bowel whenever it is safe to do so — an **anastomosis**. See [Colon Cancer Surgery in India](" + SURGERY_BLOG + ") for hemicolectomy types, stomas and approach choice."),
  img(
    "/uploads/articles/colon-s3-nodes.webp",
    "Transparent adult abdomen showing a teal colon, gold tumour and mixed gold and teal mesenteric lymph nodes used to explain Stage 3 nodal sampling",
    "A commonly used quality benchmark is examination of at least 12 regional lymph nodes. How many contain cancer decides N1 versus N2.",
  ),
  p("The operation depends largely on tumour location: right hemicolectomy, left hemicolectomy, sigmoid colectomy or an extended colectomy in selected cases. Surgery may be **open, laparoscopic or robotic-assisted**. Laparoscopic colectomy is an established option for appropriately selected patients. Robotic surgery is not automatically appropriate for every colon cancer patient. Open surgery remains important for very large or locally advanced tumours, emergency presentations and extensive adhesions."),
  btn("Ask whether laparoscopic or robotic colectomy is appropriate", consult("Colectomy")),
  p("Adequate lymph-node evaluation is essential. A commonly used quality benchmark is evaluation of **at least 12 regional lymph nodes**. Most patients undergoing planned Stage 3 colon cancer surgery do not require a permanent colostomy. A temporary or permanent stoma may be considered depending on tumour location, emergency presentation, anastomotic safety and other surgical factors. [Ostomy / stoma surgery](" + OSTOMY + ") planning ranges are **$2,500–$6,800** if a stoma is required."),

  h2("Why Is Chemotherapy Needed After Surgery?"),
  p("Stage 3 colon cancer has a higher risk of microscopic residual disease than Stage 1 or many Stage 2 cancers because cancer cells have already reached regional lymph nodes. Even when the surgeon removes all visible cancer, microscopic cells may remain. Adjuvant chemotherapy is therefore used to reduce the risk of recurrence. The standard approach is generally an **oxaliplatin-based chemotherapy regimen combined with a fluoropyrimidine**: **FOLFOX** (5-fluorouracil, leucovorin and oxaliplatin) or **CAPOX / CAPEOX** (capecitabine plus oxaliplatin). GAF planning ranges for [chemotherapy](" + CHEMO + ") are **$1,500–$8,000+**."),
  img(
    "/uploads/articles/colon-s3-chemo.webp",
    "Adult in a chemotherapy day-care chair with a colon-and-lymph-node overlay used to explain adjuvant FOLFOX or CAPOX after Stage 3 surgery",
    "Adjuvant chemotherapy is generally recommended after Stage 3 resection unless there is a specific medical reason it cannot be given.",
  ),
  h3("How long does chemotherapy last?"),
  p("Historically, six months of chemotherapy was commonly used. Research from the International Duration Evaluation of Adjuvant Chemotherapy (**IDEA**) collaboration showed that treatment duration can sometimes be shortened, particularly in selected lower-risk patients receiving CAPOX. **Lower-risk Stage 3** often refers to **T1–3 N1**. **Higher-risk Stage 3** generally refers to **T4 and/or N2**."),
  p("Evidence from IDEA and subsequent studies, including the **SCOT** trial, supports individualized duration decisions, with three months of CAPOX being an established option for many lower-risk patients, while six months may be favored in higher-risk situations or when FOLFOX is used. This decision should be made by the treating oncologist rather than based on stage alone."),
  p("Oxaliplatin can cause peripheral neuropathy — tingling, numbness, burning, sensitivity to cold, difficulty with fine motor tasks, and changes in walking or balance in more severe cases. Longer exposure generally increases cumulative neuropathy risk. Chemotherapy duration therefore balances **cancer-control benefit vs. treatment toxicity**."),
  p("When adjuvant chemotherapy is indicated, many guidelines recommend starting as soon as reasonably possible, ideally within approximately **8 weeks after surgery**, when medically appropriate. A short delay does not automatically mean that chemotherapy is no longer useful, but unnecessary delays should generally be avoided."),
  btn("Ask about FOLFOX versus CAPOX and 3 vs 6 months", consult("Chemotherapy")),
  p("[WhatsApp +91 90443 46292 about chemotherapy duration](" + wa("Please advise whether 3 months of CAPOX or 6 months of FOLFOX is more appropriate for my Stage 3 colon cancer risk group in India.") + ")"),
  img(
    "/uploads/articles/colon-s3-clinic.webp",
    "Adult patient in clinic with a colon-and-lymph-node overlay while a medical oncologist explains Stage 3 chemotherapy",
    "Ask for the T and N risk group and the expected neuropathy trade-off — not only which regimen is newest.",
  ),

  h2("Is Immunotherapy Used for Stage 3 Colon Cancer?"),
  p("Immunotherapy is becoming increasingly important, particularly for tumors with **dMMR/MSI-H biology**. Stage 3 colon cancer should not automatically be treated with immunotherapy simply because a tumor has an MSI-H result. The treatment setting matters."),
  p("Recent clinical-trial results, including the **ATOMIC** study reported in 2025, showed a substantial disease-free-survival improvement when atezolizumab was added to mFOLFOX6 in patients with resected Stage 3 dMMR colon cancer. These results represent an important development in adjuvant treatment, but treatment availability, regulatory approvals, guideline updates and individual patient factors must be considered when applying newer evidence in clinical practice. GAF planning ranges for [immunotherapy](" + IMMUNO + ") are **$15,000–$45,000** in settings where it is used."),
  btn("Ask whether immunotherapy is relevant for dMMR Stage 3 disease", consult("Immunotherapy")),

  h2("Is Radiation Used? Can Treatment Start Before Surgery?"),
  p("For **colon cancer**, [radiation](" + EBRT + ") is not routinely part of standard Stage 3 treatment. This is an important distinction from [rectal cancer](" + RECTAL + "). Radiation may occasionally be considered for selected unresectable or very locally invasive colon tumours, but this is not the routine pathway."),
  p("Most resectable Stage 3 colon cancers traditionally proceed to surgery followed by adjuvant chemotherapy. Treatment before surgery may be considered for very locally advanced tumours, T4b disease, bulky regional disease, situations where shrinkage could improve resectability, selected dMMR/MSI-H tumours, or clinical-trial settings. The decision should be made by a multidisciplinary tumour board."),

  h2("Recovery, Stoma and Follow-Up"),
  p("Many patients gradually return to normal activities over several weeks. Recovery may involve pain management, early walking, gradual diet progression, bowel-function monitoring, wound care and nutrition support. Completing surgery and chemotherapy does not mean follow-up stops. Surveillance is designed to detect recurrence, a new colorectal cancer, treatable complications and long-term treatment effects — commonly with clinical examinations, CEA, CT of the chest/abdomen/pelvis and colonoscopy. Current ASCRS surveillance guidance recommends cross-sectional imaging as part of surveillance after curative treatment for Stage II and III colorectal cancer."),
  p("Stage 3 colon cancer has a meaningful risk of recurrence, which is why postoperative chemotherapy and structured surveillance are important. Higher-risk features include T4, N2, multiple positive nodes, inadequate node assessment, lymphovascular or perineural invasion, tumour deposits, positive or close margins and certain aggressive pathological features."),

  h2("Stage 3 vs Stage 2 vs Stage 4"),
  html(vs2),
  html(vs4),

  h2("Stage 3 Colon Cancer Treatment Cost in India"),
  p("There is **no single fixed price** because treatment usually includes surgery plus several months of chemotherapy, along with diagnostic testing, pathology and follow-up. GAF Healthcare publishes USD planning ranges compiled from partner hospital cost sheets. They are not hospital quotations."),
  html(costTable),
  p("City pages such as [Delhi NCR colectomy](/costs/India/Delhi-NCR/Surgical-Oncology/Colectomy), [Mumbai](/costs/India/Mumbai/Surgical-Oncology/Colectomy), [Bengaluru](/costs/India/Bengaluru/Surgical-Oncology/Colectomy), [Chennai](/costs/India/Chennai/Surgical-Oncology/Colectomy) and [Hyderabad](/costs/India/Hyderabad/Surgical-Oncology/Colectomy) use the same national range unless a hospital issues a verified quotation."),
  p("A written hospital estimate based on the patient's medical records is much more useful than a generic online cost figure. Ask whether the quotation separates surgeon fees, hospital and OT charges, anaesthesia, pathology, imaging, chemotherapy drugs, day-care, medical-oncology consultation, molecular testing and follow-up — and what is excluded (ICU, complications, additional surgery, extra cycles)."),
  btn("Ask for an itemised Stage 3 quotation", consult("Stage 3 Colon Cancer Treatment Cost in India")),
  p("[WhatsApp +91 90443 46292 for surgery plus chemotherapy pricing](" + wa("Please send an itemised Stage 3 colon cancer quotation in India covering colectomy, stay, pathology, MSI/MMR testing and FOLFOX or CAPOX.") + ")"),

  h2("How to Choose a Hospital and What to Ask"),
  p("For Stage 3 colon cancer, evaluate whether the centre has experienced colorectal/GI cancer surgeons, dedicated medical oncology, advanced pathology and molecular testing, minimally invasive colorectal surgery, ICU and emergency support, a multidisciplinary tumour board, chemotherapy day-care and international-patient services. Access to **both surgery and medical oncology** is essential."),
  ul([
    "[Surgical oncology hospitals in Delhi NCR](/hospitals/India/Delhi-NCR/Surgical-Oncology)",
    "[Surgical oncology hospitals in Mumbai](/hospitals/India/Mumbai/Surgical-Oncology)",
    "[Surgical oncology hospitals in Bengaluru](/hospitals/India/Bengaluru/Surgical-Oncology)",
    "[Surgical oncology hospitals in Chennai](/hospitals/India/Chennai/Surgical-Oncology)",
    "[Surgical oncology hospitals in Hyderabad](/hospitals/India/Hyderabad/Surgical-Oncology)",
  ]),
  ol([
    "What is my exact TNM stage — IIIA, IIIB or IIIC — and how many lymph nodes contain cancer?",
    "Are the surgical margins clear, and were at least 12 nodes examined?",
    "Do I have T4 or N2 disease, lymphovascular invasion or perineural invasion?",
    "What is my MMR/MSI status, and do I need FOLFOX or CAPOX?",
    "Can three months of chemotherapy be considered, or would six months provide additional benefit for my risk group?",
    "What are my risks of oxaliplatin neuropathy, when can chemotherapy begin after surgery, and what will surveillance look like?",
  ]),

  h2("The Bottom Line"),
  p("Stage 3 colon cancer has spread to nearby lymph nodes but has no confirmed distant metastasis. Treatment is generally planned with **curative intent** when the disease is resectable: **surgery → final pathology → MMR/MSI → adjuvant FOLFOX or CAPOX → surveillance**. Three versus six months of chemotherapy should be individualized according to T/N risk, regimen and neuropathy risk. Immunotherapy is an evolving area for dMMR/MSI-H Stage 3 disease. Radiation is not routinely used for colon cancer."),

  h2("Frequently Asked Questions"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Related Colon Cancer Resources"),
  ul([
    "[Colon Cancer Treatment in India](" + PILLAR + ") — stage, molecular tests and systemic medicines around Stage III.",
    "[Colon Cancer Surgery in India](" + SURGERY_BLOG + ") — hemicolectomy types, anastomosis, stomas and approach choice.",
    "[Stage 1 Colon Cancer Treatment in India](" + STAGE1 + ") — T1/T2 and when endoscopic removal is enough.",
    "[Stage 2 Colon Cancer Treatment in India](" + STAGE2 + ") — node-negative T3/T4 and when chemotherapy is only discussed.",
    "[Colectomy cost in India](" + COLECTOMY + ") — GAF planning range $7,000–$18,000.",
    "[Chemotherapy cost in India](" + CHEMO + ") — $1,500–$8,000+ for adjuvant FOLFOX or CAPOX.",
    "[Precision oncology](" + PRECISION + ") — MSI/MMR testing, $2,000–$7,000.",
    "[Rectal cancer surgery](" + RECTAL + ") — a different pathway when radiation may be part of treatment.",
    "[Breast cancer treatment in India](" + BREAST + ") and [prostate cancer treatment in India](" + PROSTATE + ") — other GAF cancer pathways.",
  ]),

  h2("How GAF Healthcare Can Help"),
  p("GAF Healthcare coordinates international patients who need a Stage 3 colon cancer opinion in India — after a node-positive pathology report, a question about FOLFOX versus CAPOX, or an MSI/MMR result. Share the colonoscopy PDF, the **complete pathology report** (including positive-node count), CT files, CEA and any MSI/MMR result. A coordinator can introduce a [surgical oncologist](" + SURG_DOCS + ") and a [medical oncologist](" + MED_DOCS + "), then help collect an itemised quotation covering the operation, stay, pathology and planned chemotherapy duration."),
  btn("Share records for a Stage 3 review", consult("Stage 3 Colon Cancer Treatment")),
  p("[WhatsApp +91 90443 46292 with colonoscopy, node count and MSI/MMR](" + wa("I would like to share my colonoscopy, complete pathology, positive lymph-node count and MSI/MMR for a Stage 3 colon cancer second opinion in India.") + ")"),

  h2("Medical Disclaimer"),
  p("This article is intended for general educational purposes and should not replace consultation with a qualified colorectal surgeon or medical oncologist. Stage 3 colon cancer treatment is highly individualized. Surgery, chemotherapy regimen, duration, immunotherapy and surveillance depend on the complete pathology, imaging, molecular profile, medical history and multidisciplinary specialist assessment. Patients should not start, stop or change cancer treatment without discussing it with their treating doctor."),

  h2("Top 10 Sources"),
  p("1. [NCI — Colon Cancer Treatment (PDQ®)](https://www.cancer.gov/types/colorectal/hp/colon-treatment-pdq) — Stage III surgery, adjuvant chemotherapy and high-risk features."),
  p("2. [American Cancer Society — Treatment of Colon Cancer, by Stage](https://www.cancer.org/cancer/types/colon-rectal-cancer/treating/by-stage-colon.html) — Stage III treatment, FOLFOX/CAPOX and selected neoadjuvant options."),
  p("3. [ESMO — Gastrointestinal cancer guidelines](https://www.esmo.org/guidelines/guidelines-by-topic/esmo-clinical-practice-guidelines-gastrointestinal-cancers) — localised colon cancer, risk groups and adjuvant treatment."),
  p("4. [ASCRS — Clinical Practice Guidelines](https://fascrs.org/healthcare-providers/education/clinical-practice-guidelines) — colon cancer surgery and postoperative treatment."),
  p("5. [ASCRS surveillance and survivorship guidance](https://fascrs.org/healthcare-providers/education/clinical-practice-guidelines) — imaging after curative Stage II and III treatment."),
  p("6. [IDEA collaboration — duration of adjuvant chemotherapy](https://www.nejm.org/doi/full/10.1056/NEJMoa1713709) — 3 versus 6 months in Stage III colon cancer."),
  p("7. [SCOT trial — 3 vs 6 months of adjuvant chemotherapy](https://www.thelancet.com/journals/lanonc/article/PIIS1470-2045(17)30706-6/fulltext) — oxaliplatin-based duration and neuropathy."),
  p("8. [ICMR — Consensus Document for Management of Colorectal Cancer](https://main.icmr.nic.in/sites/default/files/guidelines/Colorectal%20Cancer.pdf) — India-specific staging, surgery and adjuvant chemotherapy."),
  p("9. [SEOM clinical guidelines](https://seom.org/publicaciones/guias-clinicas) — adjuvant colon-cancer treatment."),
  p("10. [ASCO — Gastrointestinal cancer guidelines](https://www.asco.org/practice-patients/guidelines/gastrointestinal-cancer) — adjuvant evidence, including evolving dMMR/MSI-H immunotherapy (ATOMIC)."),
  p("**Last reviewed against the cited sources: September 2026.**"),
];

const now = "2026-09-28T19:00:00.000Z";
const SLUG = "stage-3-colon-cancer-treatment-in-india";

const article = {
  id: "art_stage_3_colon_cancer_treatment_in_india",
  slug: SLUG,
  title: "Stage 3 Colon Cancer Treatment in India: Surgery, FOLFOX and CAPOX",
  excerpt:
    "Node-positive colon cancer: surgery plus adjuvant FOLFOX or CAPOX, 3 versus 6 months, MSI/MMR testing, and why Stage 3 is not Stage 4.",
  date: "28 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Surgical Oncology",
  tags: ["colon cancer", "stage 3 colon cancer", "FOLFOX", "CAPOX", "India"],
  image: "/uploads/articles/colon-s3-anatomy.webp",
  imageAlt:
    "Transparent adult body with a teal colon, gold tumour and gold regional lymph nodes used to explain Stage 3 colon cancer",
  status: "published",
  featured: true,
  seoTitle: "Stage 3 Colon Cancer Treatment in India: Surgery and Chemotherapy",
  seoDescription:
    "Stage 3 colon cancer treatment in India: surgery, FOLFOX vs CAPOX, 3 vs 6 months, MSI/MMR and why node-positive disease is not Stage 4. GAF planning ranges.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/colon-s3-anatomy.webp",
  allowIndex: true,
  keywords: [
    "stage 3 colon cancer treatment in India",
    "FOLFOX CAPOX stage 3",
    "adjuvant chemotherapy colon cancer",
    "T4 N2 colon cancer",
    "IDEA 3 vs 6 months",
    "MSI MMR stage 3 colon cancer",
    "stage 3 colectomy India",
    "stage 3 colon cancer cost in India",
    "dMMR immunotherapy stage III",
  ],
  relatedLinks: [
    { label: "Colon Cancer Treatment in India", href: PILLAR },
    { label: "Colon Cancer Surgery in India", href: SURGERY_BLOG },
    { label: "Stage 2 Colon Cancer Treatment in India", href: STAGE2 },
    { label: "Stage 1 Colon Cancer Treatment in India", href: STAGE1 },
    { label: "Chemotherapy cost in India", href: CHEMO },
  ],
  blocks,
};

if (!store.categories.includes("Surgical Oncology")) store.categories.push("Surgical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["colon-s3-anatomy.webp", article.imageAlt],
  [
    "colon-s3-nodes.webp",
    "Transparent adult abdomen showing a teal colon, gold tumour and mixed gold and teal mesenteric lymph nodes used to explain Stage 3 nodal sampling",
  ],
  [
    "colon-s3-clinic.webp",
    "Adult patient in clinic with a colon-and-lymph-node overlay while a medical oncologist explains Stage 3 chemotherapy",
  ],
  [
    "colon-s3-chemo.webp",
    "Adult in a chemotherapy day-care chair with a colon-and-lymph-node overlay used to explain adjuvant FOLFOX or CAPOX after Stage 3 surgery",
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

const blurb = "node-positive disease, FOLFOX/CAPOX and 3 versus 6 months of adjuvant chemotherapy.";
linkSibling(store.articles.find((row) => row.slug === "colon-cancer-surgery-in-india"), STAGE3, "Stage 3 Colon Cancer Treatment in India", blurb);
linkSibling(store.articles.find((row) => row.slug === "stage-1-colon-cancer-treatment-in-india"), STAGE3, "Stage 3 Colon Cancer Treatment in India", blurb);
linkSibling(store.articles.find((row) => row.slug === "stage-2-colon-cancer-treatment-in-india"), STAGE3, "Stage 3 Colon Cancer Treatment in India", blurb);

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
if (treatment?.translations?.en?.editorialBody && !treatment.translations.en.editorialBody.includes(STAGE3)) {
  treatment.translations.en.editorialBody = treatment.translations.en.editorialBody.replace(
    "Stage III colon cancer generally involves regional lymph-node involvement. The usual treatment pathway includes **surgery → pathology → adjuvant chemotherapy**.",
    "Stage III colon cancer generally involves regional lymph-node involvement. The usual treatment pathway includes **surgery → pathology → adjuvant chemotherapy**. How FOLFOX versus CAPOX, 3 versus 6 months and MSI/MMR testing are planned is covered in [Stage 3 Colon Cancer Treatment in India](/blogs/stage-3-colon-cancer-treatment-in-india).",
  );
  writeFileSync(treatmentsPath, `${JSON.stringify(treatments, null, 2)}\n`);
  console.log("linked stage 3 blog from colon treatment editorial");
}

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes("stage-3-colon-cancer-treatment-in-india")) {
  llms = llms.replace(
    "and [stage 2 colon cancer treatment in India](https://gaf.healthcare/blogs/stage-2-colon-cancer-treatment-in-india).",
    ", [stage 2 colon cancer treatment in India](https://gaf.healthcare/blogs/stage-2-colon-cancer-treatment-in-india) and [stage 3 colon cancer treatment in India](https://gaf.healthcare/blogs/stage-3-colon-cancer-treatment-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}
