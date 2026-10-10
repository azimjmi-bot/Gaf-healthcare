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

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body"><strong>The main treatment for Stage 2 colon cancer is surgery to completely remove the cancer and nearby lymph nodes.</strong></p><p class="article-quick-answer__body">After surgery, the pathology report determines whether the patient has:</p><ul class="article-quick-answer__list"><li>Low-risk Stage 2 disease</li><li>High-risk Stage 2 disease</li></ul><p class="article-quick-answer__body"><strong>Low-risk Stage 2</strong></p><p class="article-quick-answer__body">For many patients with lower-risk Stage 2 colon cancer, <strong>surgery alone may be sufficient</strong>.</p><p class="article-quick-answer__body"><strong>High-risk Stage 2</strong></p><p class="article-quick-answer__body">If the cancer has high-risk features, the oncologist may discuss <strong>adjuvant chemotherapy</strong> after surgery.</p><p class="article-quick-answer__body"><strong>MSI-H/dMMR Stage 2 cancer</strong></p><p class="article-quick-answer__body">Mismatch-repair and microsatellite-instability testing can influence the chemotherapy discussion. Patients with <strong>dMMR/MSI-H tumours generally do not derive the same benefit from fluoropyrimidine-only chemotherapy as patients with proficient mismatch repair</strong>, so the result needs to be considered before treatment is recommended.</p><p class="article-quick-answer__body"><strong>Can Stage 2 colon cancer be cured?</strong></p><p class="article-quick-answer__body">Stage 2 colon cancer is generally treated with curative intent.</p><p class="article-quick-answer__body"><strong>Is radiation required?</strong></p><p class="article-quick-answer__body">Usually not.</p><p class="article-quick-answer__body">Radiation has a much more established role in rectal cancer than in colon cancer.</p><p class="article-quick-answer__body"><strong>Is immunotherapy routinely required?</strong></p><p class="article-quick-answer__body">No.</p><p class="article-quick-answer__body">Immunotherapy is not routinely given after complete resection of ordinary Stage 2 colon cancer. Its role is evolving in selected locally advanced dMMR/MSI-H tumours and should be determined by a specialist team.</p></aside>`;

const stageTable = `<div class="md-body"><table><thead><tr><th>Stage</th><th>General tumour characteristics</th><th>Nodes</th><th>Distant spread</th></tr></thead><tbody><tr><td>Stage IIA</td><td>T3</td><td>N0</td><td>M0</td></tr><tr><td>Stage IIB</td><td>T4a</td><td>N0</td><td>M0</td></tr><tr><td>Stage IIC</td><td>T4b</td><td>N0</td><td>M0</td></tr></tbody></table></div>`;

const riskTable = `<div class="md-body"><table><thead><tr><th>Situation</th><th>Common approach</th></tr></thead><tbody><tr><td>Lower-risk Stage II</td><td>Surgery followed by surveillance</td></tr><tr><td>T4 disease</td><td>Discuss postoperative chemotherapy</td></tr><tr><td>&lt;12 lymph nodes examined</td><td>Discuss chemotherapy and staging adequacy</td></tr><tr><td>Obstruction</td><td>Discuss chemotherapy</td></tr><tr><td>Perforation</td><td>Discuss chemotherapy</td></tr><tr><td>Poor differentiation</td><td>Consider chemotherapy</td></tr><tr><td>Lymphovascular invasion</td><td>Consider chemotherapy</td></tr><tr><td>Perineural invasion</td><td>Consider chemotherapy</td></tr><tr><td>Positive/close margin</td><td>Multidisciplinary assessment</td></tr><tr><td>dMMR/MSI-H</td><td>Interpret chemotherapy benefit carefully</td></tr><tr><td>pMMR/MSS + high-risk features</td><td>Chemotherapy may be considered</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Component</th><th>GAF planning range in India</th></tr></thead><tbody><tr><td><a href="${COLONOSCOPY}">Colonoscopy</a></td><td>$200–$550</td></tr><tr><td><a href="${COLECTOMY}">Colectomy</a></td><td>$7,000–$18,000</td></tr><tr><td><a href="${CRC_SURG}">Colorectal cancer surgery</a></td><td>$8,000–$20,000</td></tr><tr><td><a href="${PRECISION}">Precision oncology / MSI-MMR testing</a></td><td>$2,000–$7,000</td></tr><tr><td><a href="${CHEMO}">Chemotherapy</a> when indicated</td><td>$1,500–$8,000+</td></tr><tr><td><a href="${IMMUNO}">Immunotherapy</a> in selected dMMR/MSI-H settings</td><td>$15,000–$45,000</td></tr><tr><td><a href="${OSTOMY}">Ostomy / stoma surgery</a> if required</td><td>$2,500–$6,800</td></tr></tbody></table></div>`;

const faqs = [
  ["What is the main treatment for Stage 2 colon cancer?", "Surgery to remove the cancer-bearing section of the colon and regional lymph nodes is generally the main treatment."],
  ["Does Stage 2 colon cancer require chemotherapy?", "Not always. Many patients can be treated with surgery alone, while chemotherapy may be considered when high-risk features are present."],
  ["What are the high-risk features in Stage 2 colon cancer?", "Common features include T4 disease, fewer than 12 lymph nodes examined, obstruction, perforation, poor differentiation, lymphovascular invasion, perineural invasion and positive or close margins."],
  ["Is chemotherapy mandatory for T4 colon cancer?", "Not automatically, but T4 disease is a major high-risk feature and postoperative chemotherapy should generally be discussed with the oncology team."],
  ["Does MSI status matter in Stage 2 colon cancer?", "Yes. MSI/MMR status can influence the expected benefit of fluoropyrimidine chemotherapy and should be considered in treatment planning."],
  ["Can Stage 2 colon cancer be cured?", "Stage 2 colon cancer is generally treated with curative intent, particularly when the tumour can be completely removed."],
  ["Is Stage 2 colon cancer surgery performed laparoscopically?", "Yes. Laparoscopic surgery is an established option for appropriately selected patients."],
  ["Is robotic surgery better?", "Not automatically. The appropriate surgical technique depends on the patient's tumour, anatomy and surgical team."],
  ["How many lymph nodes should be examined?", "At least 12 lymph nodes is a commonly used benchmark for adequate pathological staging."],
  ["What happens if fewer than 12 lymph nodes are found?", "It can be considered a high-risk feature because accurate staging is more difficult. The oncology team may consider this when discussing postoperative chemotherapy."],
  ["Is radiation therapy required?", "Usually not. Radiation is much more commonly used for rectal cancer."],
  ["Can Stage 2 colon cancer be treated before surgery?", "Most resectable Stage 2 colon cancers are treated with surgery first. Selected locally advanced T4b tumours may receive treatment before surgery."],
  ["Can immunotherapy be used before surgery?", "In selected locally advanced dMMR/MSI-H colon cancers, neoadjuvant immunotherapy is an emerging treatment approach and should be considered only by experienced multidisciplinary teams."],
  ["How long does Stage 2 colon cancer treatment take?", "Surgery itself usually requires several days of hospital recovery, while chemotherapy, if recommended, can extend treatment over several months. GAF planning notes for colectomy are typically 5–10 nights."],
  ["How much does Stage 2 colon cancer treatment cost in India?", "The cost varies according to surgery, hospital, city, surgical technique, pathology, molecular testing, hospitalisation and whether chemotherapy is required. GAF planning ranges include approximately $7,000–$18,000 for colectomy and $1,500–$8,000+ for chemotherapy when it is used."],
  ["Can international patients receive Stage 2 colon cancer treatment in India?", "Yes. International patients can have their records reviewed before travelling and can arrange specialist consultation, surgery, oncology treatment and follow-up in India."],
  ["Should I get a second opinion?", "A second opinion can be particularly useful when chemotherapy is being considered for Stage 2 disease, when the tumour is T4, when MSI/MMR results are unusual, or when complex surgery is recommended."],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("**Stage 2 colon cancer treatment in India is primarily based on complete surgical removal of the cancer, followed by a careful assessment of the final pathology to determine whether additional chemotherapy is appropriate.**"),
  p("Stage 2 colon cancer means that the tumour has grown through the muscular wall of the colon or into nearby tissues, but there is **no identified cancer in regional lymph nodes and no distant metastasis**. Stage 2 is divided into Stage IIA, Stage IIB and Stage IIC according to how deeply the tumour has invaded surrounding tissues."),
  p("For many patients with Stage 2 colon cancer, **surgery alone is sufficient**. However, some patients have a higher risk of recurrence because of specific pathological or clinical features — T4 disease, tumour perforation, bowel obstruction, inadequate lymph-node sampling, poorly differentiated tumour, lymphovascular invasion, perineural invasion, positive or very close surgical margins, or other unfavourable pathological characteristics. The tumour's **MSI/MMR status** is also important when deciding whether chemotherapy is appropriate."),
  p("This article is the Stage 2 hub for the colon cluster. The broader pathway is in [Colon Cancer Treatment in India](" + PILLAR + "). How hemicolectomy, stomas and open versus laparoscopic versus robotic approaches are planned is in [Colon Cancer Surgery in India](" + SURGERY_BLOG + "). T1/T2 disease and whether a malignant polyp can stay with colonoscopy is in [Stage 1 Colon Cancer Treatment in India](" + STAGE1 + "). It is **not** a rectal-cancer page: radiation has a much larger role when the tumour is rectal. See [rectal cancer surgery](" + RECTAL + ")."),
  p("GAF Healthcare planning ranges for [colectomy](" + COLECTOMY + ") are **$7,000–$18,000** (typically 5–10 nights). The broader [colorectal cancer surgery](" + CRC_SURG + ") sheet lists **$8,000–$20,000**. If adjuvant [chemotherapy](" + CHEMO + ") is later recommended, planning ranges are **$1,500–$8,000+**. [Precision oncology / MSI-MMR testing](" + PRECISION + ") is **$2,000–$7,000**."),
  p("International patients comparing [surgical oncologists](" + SURG_DOCS + "), [surgical gastroenterologists](" + GI_DOCS + ") and [medical oncologists](" + MED_DOCS + ") commonly start with [Delhi NCR](/doctors/India/Delhi-NCR/Surgical-Oncology/Colectomy), [Mumbai](/doctors/India/Mumbai/Surgical-Oncology/Colectomy), [Bengaluru](/doctors/India/Bengaluru/Surgical-Oncology/Colectomy), [Chennai](/doctors/India/Chennai/Surgical-Oncology/Colectomy) and [Hyderabad](/doctors/India/Hyderabad/Surgical-Oncology/Colectomy). Partner [surgical-oncology hospitals](" + SURG_HOSP + ") in [Delhi NCR](/hospitals/India/Delhi-NCR/Surgical-Oncology) and [Mumbai](/hospitals/India/Mumbai/Surgical-Oncology) are a typical first filter."),
  btn("Ask about Stage 2 colon cancer treatment in India", consult("Stage 2 Colon Cancer Treatment")),
  p("[WhatsApp +91 90443 46292 with T3/T4 pathology and node count](" + wa("Please review my Stage 2 colon cancer pathology, T stage, lymph-node count and MSI/MMR and advise whether adjuvant chemotherapy is appropriate in India.") + ")"),
  img(
    "/uploads/articles/colon-s2-anatomy.webp",
    "Transparent adult body with a teal colon and a gold tumour invading through the bowel wall used to explain Stage 2 colon cancer",
    "Stage 2 means deeper wall invasion than Stage 1, with no identified cancer in regional lymph nodes or distant organs.",
  ),

  h2("What Is Stage 2 Colon Cancer?"),
  p("Stage 2 colon cancer is an invasive cancer that has grown deeper into or through the wall of the colon but has **not spread to regional lymph nodes or distant organs**. The basic TNM definition is **T3 or T4 + N0 + M0**: **T3** means the tumour has grown through the muscular layer into surrounding tissues; **T4** means it has grown through the visceral peritoneum or directly into nearby structures; **N0** means no regional lymph-node metastasis has been identified; **M0** means no distant metastasis has been identified."),
  p("Stage 2 is therefore different from Stage 1 because the tumour has invaded more deeply (**T1/T2** versus **T3/T4**). It is also different from Stage 3 because there is no identified regional lymph-node involvement (**N0** versus **N1/N2**). This difference has important implications for postoperative treatment."),

  h2("Stage IIA, Stage IIB and Stage IIC"),
  html(stageTable),
  p("**Stage IIA** is T3: the tumour has grown through the muscular wall and into surrounding tissues. **Stage IIB** is T4a: the tumour has grown through the visceral peritoneum. **Stage IIC** is T4b: the tumour has directly invaded or become attached to nearby organs or structures. The exact pathological classification should always be confirmed from the patient's pathology and staging report."),
  h3("What does T3 mean?"),
  p("T3 means that the cancer has grown through the muscular layer of the colon into the tissues surrounding the colon. T3 cancers can have different levels of invasion, and the depth of extension may provide additional prognostic information."),
  h3("What does T4 mean?"),
  p("T4a means the cancer has grown through the surface covering of the colon, called the visceral peritoneum. T4b means it has directly invaded or become attached to another organ or structure. T4 disease is particularly important because it is considered a **high-risk feature in Stage II colon cancer**."),
  img(
    "/uploads/articles/colon-s2-t4.webp",
    "Transparent adult abdomen showing a gold colon tumour invading an adjacent bowel loop used to explain T4b Stage 2 disease",
    "T4b invasion into nearby structures is a high-risk Stage II feature and may change both the operation and the chemotherapy discussion.",
  ),

  h2("How Is Stage 2 Colon Cancer Diagnosed?"),
  p("Diagnosis generally involves [colonoscopy](" + COLONOSCOPY + ") (**$200–$550**), biopsy, histopathology, CT imaging, blood tests, CEA testing where appropriate, and surgical pathology when surgery is performed. The American Cancer Society and National Cancer Institute describe colonoscopy, biopsy, imaging and pathological staging as important parts of colorectal cancer diagnosis and staging."),
  p("Colonoscopy identifies the tumour, determines its location, takes tissue samples, assesses the remainder of the colon and looks for additional polyps or synchronous lesions. After surgery, the entire tumour is examined: type, grade, depth of invasion, surgical margins, lymph-node status, lymphovascular invasion, perineural invasion, tumour budding, visceral peritoneal involvement and other pathological risk factors. The **postoperative pathology report is central to Stage 2 treatment decisions**."),
  p("Two patients can both be Stage 2 and have very different recurrence risks. A T3 tumour with clear margins, adequate lymph-node assessment and no obstruction is not the same as a T4 tumour with obstruction, lymphovascular invasion and fewer than 12 nodes examined. **“Stage 2 colon cancer” is not enough by itself to determine whether chemotherapy is required.**"),
  btn("Ask whether your Stage 2 report is low-risk or high-risk", consult("Stage 2 Colon Cancer Treatment")),

  h2("What Is the Standard Treatment?"),
  p("For most medically fit patients with resectable Stage 2 colon cancer, **surgical resection is the main treatment**. The surgeon removes the tumour-bearing section of colon, appropriate margins and regional lymph nodes. The remaining bowel is generally reconnected. The Indian Council of Medical Research consensus identifies resection as the treatment of choice for localized colon cancer, with consideration of adjuvant chemotherapy for high-risk Stage II disease."),
  p("The typical pathway is: colonoscopy → biopsy → CT staging → multidisciplinary assessment → [colon cancer surgery](" + SURGERY_BLOG + ") → final pathology → risk assessment → MSI/MMR evaluation → surgery alone or postoperative chemotherapy → surveillance. Chemotherapy is not automatically required for every Stage 2 patient. That is one of the most important distinctions from Stage 3."),

  h2("Stage 2 Colon Cancer Surgery in India"),
  p("The type of surgery depends primarily on tumour location: right or extended right hemicolectomy, left or extended left hemicolectomy, sigmoid colectomy, transverse colectomy, or subtotal colectomy in selected cases. The objective is to remove the cancer with appropriate margins and regional lymphatic tissue. See [Colon Cancer Surgery in India](" + SURGERY_BLOG + ") for anastomosis, stomas and approach choice."),
  img(
    "/uploads/articles/colon-s2-nodes.webp",
    "Transparent adult torso showing a teal right colon, gold wall-invasive tumour and teal mesenteric lymph nodes used to explain Stage 2 node sampling",
    "At least 12 examined lymph nodes is a commonly used staging benchmark. Fewer nodes is a high-risk feature — not automatic Stage 3.",
  ),
  p("Surgery may be **open, laparoscopic or robotic-assisted**. Laparoscopic colectomy is an established option for appropriately selected patients. Robotic surgery can be appropriate but is not mandatory. Open surgery remains important for complex or emergency cases. The most technologically advanced approach is not automatically the best approach for every patient."),
  btn("Ask whether laparoscopic or robotic colectomy is appropriate", consult("Colectomy")),
  p("Regional lymph nodes are removed with the cancer-bearing segment. A commonly used benchmark is examination of **at least 12 lymph nodes**. Inadequate lymph-node sampling is one of the factors associated with higher recurrence risk in Stage II disease. Fewer than 12 examined nodes does not automatically mean Stage 3 cancer. It means the quality of pathological staging is less reassuring and should be considered during the postoperative treatment discussion."),
  p("Most patients undergoing planned Stage 2 colon cancer surgery do not require a permanent colostomy. A stoma may be required in emergency surgery, obstruction, perforation, an unsafe bowel connection or other patient-specific factors. [Ostomy / stoma surgery](" + OSTOMY + ") planning ranges are **$2,500–$6,800** if a stoma is required. An **R0 resection** means no microscopic cancer is identified at the surgical margins."),

  h2("Is Chemotherapy Required for Stage 2 Colon Cancer?"),
  p("**Not automatically.** Routine chemotherapy for every Stage 2 colon cancer patient is not recommended. The decision is individualized according to tumour stage, high-risk pathological features, MSI/MMR status, age, overall health, expected benefit, potential toxicity and patient preferences. The NCI notes that the benefit of adjuvant chemotherapy in Stage II colon cancer remains an area of clinical debate, with certain subgroups having higher recurrence risk."),
  img(
    "/uploads/articles/colon-s2-clinic.webp",
    "Adult patient in clinic with a colon overlay while a medical oncologist explains Stage 2 pathology and chemotherapy",
    "Ask for the expected absolute recurrence-risk reduction — not only whether chemotherapy is “needed”.",
  ),
  h3("What is high-risk Stage 2 disease?"),
  p("Commonly considered high-risk features include T4 tumour, fewer than 12 lymph nodes examined, poorly differentiated tumour, lymphovascular invasion, perineural invasion, bowel obstruction, tumour perforation, positive or very close surgical margins, and tumour deposits or other adverse pathological features in selected guidelines. The exact list can vary slightly between guidelines. The presence of one high-risk feature does not automatically mean chemotherapy is mandatory. Instead, it triggers a more detailed discussion."),
  p("The American Cancer Society and American Society of Colon and Rectal Surgeons identify several of these features when discussing postoperative chemotherapy in Stage II disease. ASCRS specifically lists obstruction, perforation, inadequate lymph-node sampling, poor differentiation, lymphovascular invasion, perineural invasion and high tumour budding among high-risk features."),
  p("**Severe abdominal pain with vomiting, inability to pass stool or gas, sudden abdominal distension, fever after a known perforation risk, or collapse requires urgent assessment in a local emergency department — not a delayed WhatsApp message.**"),
  btn("Ask about adjuvant chemotherapy after Stage 2 surgery", consult("Chemotherapy")),

  h2("MSI and MMR Testing in Stage 2 Colon Cancer"),
  p("**MSI/MMR testing is one of the most important biological assessments in Stage 2 colon cancer.** Tumours can be dMMR (deficient mismatch repair), pMMR (proficient mismatch repair), MSI-H (microsatellite instability-high) or MSS/MSI-low. GAF planning ranges for [precision oncology](" + PRECISION + ") include **$2,000–$7,000**."),
  p("Patients with Stage 2 **dMMR/MSI-H colon cancer** generally have a different biological profile from patients with proficient mismatch repair. Evidence has raised concerns about the benefit of fluoropyrimidine-only adjuvant chemotherapy in certain dMMR/MSI-H Stage II cancers. Therefore the MSI/MMR result should be considered before recommending postoperative chemotherapy. For many Stage II dMMR/MSI-H cancers, fluoropyrimidine-only chemotherapy is not routinely recommended. Decisions become more complicated when the tumour has other high-risk features, particularly T4 disease."),
  p("For patients whose tumour is pMMR or MSS, postoperative chemotherapy may be discussed when high-risk features are present. The potential benefit should be weighed against side effects, age, comorbidities, functional status, preferences and estimated recurrence risk."),
  p("[WhatsApp +91 90443 46292 with MSI/MMR and T stage](" + wa("Please review my Stage 2 colon cancer MSI/MMR result and T stage and advise whether fluoropyrimidine chemotherapy is appropriate in India.") + ")"),
  btn("Ask about MSI/MMR testing", consult("Precision Oncology")),

  h2("What Chemotherapy Is Used for High-Risk Stage 2 Disease?"),
  p("If postoperative chemotherapy is selected, common fluoropyrimidine-based options include oral **capecitabine**, intravenous **5-fluorouracil** generally with leucovorin, **CAPOX/CAPEOX** (capecitabine plus oxaliplatin), and **FOLFOX** (5-fluorouracil, leucovorin and oxaliplatin). The exact regimen and duration should be individualized. Not every high-risk Stage 2 patient requires oxaliplatin. Duration depends on the selected regimen, recurrence risk, whether oxaliplatin is used, tolerance, age, neuropathy risk and the oncologist's assessment. Discuss **absolute recurrence-risk reduction**, rather than simply saying that chemotherapy is “needed” or “not needed.”"),
  p("Possible side effects include fatigue, nausea, vomiting, diarrhoea, constipation, reduced appetite, mouth sores, low blood counts, infection risk, hand-foot syndrome and peripheral neuropathy. Oxaliplatin can cause tingling, numbness and sensitivity to cold. GAF planning ranges for [chemotherapy](" + CHEMO + ") are **$1,500–$8,000+**."),

  h2("Treatment Before Surgery in Selected T4b Disease"),
  p("Usually, surgery is the primary treatment for resectable Stage II colon cancer. However, **selected locally advanced Stage II cancers**, particularly some T4b tumours that involve or adhere to nearby organs, may be considered for treatment before surgery. The American Cancer Society notes that neoadjuvant therapy can be considered in selected T4b Stage II colon cancers, with treatment influenced by the tumour's dMMR/MSI-H status."),
  p("**Most Stage II colon cancers → surgery first.** Selected locally advanced T4b disease → preoperative treatment may be considered. Immune checkpoint inhibitors can produce substantial responses in selected dMMR/MSI-H tumours. For certain locally advanced tumours that are difficult to remove surgically, neoadjuvant [immunotherapy](" + IMMUNO + ") (**$15,000–$45,000**) may be considered by specialist teams. This is a rapidly evolving area and should be managed at a centre experienced with molecularly guided treatment."),
  p("Routine [radiation](" + EBRT + ") is generally not part of treatment for Stage 2 colon cancer. Radiation has a much more established role in rectal cancer. Rarely, it may be considered for selected locally advanced colon tumours. [Targeted therapy](" + TARGETED + ") (**$8,000–$30,000**) is not routine after adequate Stage 2 resection."),

  h2("Multidisciplinary Review and Tests Before Surgery"),
  p("Stage 2 colon cancer should ideally be reviewed by a multidisciplinary team when treatment decisions are complex — T4, obstruction, perforation, uncertain margins, significant MSI/MMR findings, neoadjuvant treatment or complex surgery. ICMR guidance recommends that new colorectal cancer cases be discussed through multidisciplinary/tumour-board processes."),
  p("Preoperative assessment may include complete blood count, liver and kidney function, electrolytes, blood glucose, ECG, anaesthesia assessment, colonoscopy, CT chest/abdomen/pelvis, CEA and additional tests according to medical history. **PET-CT is not routinely required** for every Stage 2 patient. **MRI is much more important for rectal cancer staging** than routine colon cancer."),

  h2("After Surgery: Low-Risk vs High-Risk Stage II"),
  p("After surgery, the pathology report determines exact T stage, lymph-node status, number of nodes examined, margin status, tumour grade, lymphovascular invasion, perineural invasion and other risk factors. A typical **lower-risk** profile may include T3 rather than T4, adequate lymph-node evaluation, clear margins, no obstruction or perforation, and no significant lymphovascular or perineural invasion. For such patients, surgery alone may be appropriate."),
  html(riskTable),
  p("This table describes common clinical considerations rather than an automatic treatment prescription."),

  h2("Follow-Up, Recurrence and Prognosis"),
  p("Stage 2 colon cancer is generally treated with **curative intent**. The cancer has not been identified in regional lymph nodes or distant organs. Recurrence is still possible. The risk is influenced by T stage, tumour biology, pathology, margins, lymphovascular and perineural invasion, obstruction, perforation and other risk factors. Follow-up may include clinical examination, CEA, colonoscopy, CT imaging in appropriate patients and oncology review."),
  p("Stage 2 generally has a better prognosis than Stage 3 or Stage 4, but it is not a single-risk group. A T3 tumour with favourable pathology is different from a T4 tumour with obstruction and lymphovascular invasion. Generic survival percentages should not be interpreted as individual predictions. No responsible treatment provider should promise a cure without reviewing the complete clinical information."),
  p("There is no special diet that can replace cancer treatment. After surgery, nutritional priorities include adequate protein, sufficient calories, hydration and gradual return to normal eating. Walking is often encouraged early in recovery when medically appropriate. Avoid heavy lifting until cleared by the surgical team."),

  h2("Stage 2 Colon Cancer Treatment Cost in India"),
  p("There is **no single fixed cost**. The final cost depends on whether the patient requires surgery alone or surgery plus chemotherapy, open versus laparoscopic versus robotic approach, additional pathology, MSI/MMR testing, ICU care, longer hospitalisation and management of complications."),
  html(costTable),
  p("City pages such as [Delhi NCR colectomy](/costs/India/Delhi-NCR/Surgical-Oncology/Colectomy), [Mumbai](/costs/India/Mumbai/Surgical-Oncology/Colectomy), [Bengaluru](/costs/India/Bengaluru/Surgical-Oncology/Colectomy), [Chennai](/costs/India/Chennai/Surgical-Oncology/Colectomy) and [Hyderabad](/costs/India/Hyderabad/Surgical-Oncology/Colectomy) use the same national range unless a hospital issues a verified quotation."),
  p("Ask whether the quotation includes surgeon fees, anaesthesia, theatre charges, consumables, room, nursing, medicines, pathology, routine investigations and follow-up — and what is excluded (ICU, blood products, complications, additional surgery, molecular testing, extended stay, chemotherapy after discharge)."),
  btn("Ask for an itemised Stage 2 quotation", consult("Stage 2 Colon Cancer Treatment Cost in India")),
  p("[WhatsApp +91 90443 46292 for surgery versus chemotherapy pricing](" + wa("Please send an itemised Stage 2 colon cancer quotation in India covering colectomy, stay, pathology, MSI/MMR testing and any planned chemotherapy.") + ")"),

  h2("How to Choose a Hospital and What to Ask"),
  p("Look for experienced colorectal surgeons, GI surgical oncology, [medical oncology](" + MED_DOCS + "), gastroenterology, gastrointestinal pathology, modern imaging, molecular testing, laparoscopic colorectal surgery, robotic surgery where appropriate, intensive-care support and a multidisciplinary tumour board. For high-risk Stage 2 disease, access to **both surgery and medical oncology** is particularly important."),
  ul([
    "[Surgical oncology hospitals in Delhi NCR](/hospitals/India/Delhi-NCR/Surgical-Oncology)",
    "[Surgical oncology hospitals in Mumbai](/hospitals/India/Mumbai/Surgical-Oncology)",
    "[Surgical oncology hospitals in Bengaluru](/hospitals/India/Bengaluru/Surgical-Oncology)",
    "[Surgical oncology hospitals in Chennai](/hospitals/India/Chennai/Surgical-Oncology)",
    "[Surgical oncology hospitals in Hyderabad](/hospitals/India/Hyderabad/Surgical-Oncology)",
  ]),
  ol([
    "Is my cancer definitely Stage 2 — IIA, IIB or IIC — and is the tumour T3 or T4?",
    "Has the cancer been completely removed, are the margins clear, and how many lymph nodes were examined?",
    "Does pathology show lymphovascular invasion, perineural invasion, poor differentiation, obstruction or perforation?",
    "What is my MSI/MMR status, and am I considered low-risk or high-risk Stage II?",
    "Do I need chemotherapy, what is the expected absolute benefit, which regimen and for how long?",
    "What surveillance will I need, and what is the total estimated treatment cost?",
  ]),

  h2("The Bottom Line"),
  p("Stage 2 colon cancer is an invasive cancer that has grown through or beyond the muscular wall of the colon but has **not been identified in regional lymph nodes or distant organs**. The main treatment is generally **surgery → final pathology → risk assessment → surveillance or chemotherapy**. Not every Stage 2 patient needs chemotherapy."),
  p("The decision depends on **T stage + pathology + lymph nodes + surgical margins + MSI/MMR + high-risk features + patient factors**. For selected locally advanced T4b cancers, treatment before surgery may be considered. For most resectable Stage 2 colon cancers, **surgery remains the central treatment**."),

  h2("Frequently Asked Questions"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Related Colon Cancer Resources"),
  ul([
    "[Colon Cancer Treatment in India](" + PILLAR + ") — stage, molecular tests and systemic medicines around Stage II.",
    "[Colon Cancer Surgery in India](" + SURGERY_BLOG + ") — hemicolectomy types, anastomosis, stomas and approach choice.",
    "[Stage 1 Colon Cancer Treatment in India](" + STAGE1 + ") — T1/T2, polyp pathology and when endoscopic removal is enough.",
    "[Colectomy cost in India](" + COLECTOMY + ") — GAF planning range $7,000–$18,000.",
    "[Chemotherapy cost in India](" + CHEMO + ") — $1,500–$8,000+ when adjuvant therapy is used.",
    "[Precision oncology](" + PRECISION + ") — MSI/MMR testing, $2,000–$7,000.",
    "[Rectal cancer surgery](" + RECTAL + ") — a different pathway when radiation may be part of treatment.",
    "[Breast cancer treatment in India](" + BREAST + ") and [prostate cancer treatment in India](" + PROSTATE + ") — other GAF cancer pathways.",
  ]),

  h2("How GAF Healthcare Can Help"),
  p("GAF Healthcare coordinates international patients who need a Stage 2 colon cancer opinion in India — after a T3 or T4 report, a question about adjuvant chemotherapy, or an MSI/MMR result. Share the colonoscopy PDF, the **complete pathology report** (including node count), CT files, CEA and any MSI/MMR result. A coordinator can introduce a [surgical oncologist](" + SURG_DOCS + ") and, when chemotherapy is part of the discussion, a [medical oncologist](" + MED_DOCS + "), then help collect an itemised quotation covering the operation, stay, pathology and planned duration."),
  btn("Share records for a Stage 2 review", consult("Stage 2 Colon Cancer Treatment")),
  p("[WhatsApp +91 90443 46292 with colonoscopy, pathology and MSI/MMR](" + wa("I would like to share my colonoscopy, complete pathology, node count and MSI/MMR for a Stage 2 colon cancer second opinion in India.") + ")"),

  h2("Medical Disclaimer"),
  p("This article is intended for general educational purposes and should not replace consultation with a qualified colorectal surgeon, surgical oncologist or medical oncologist. Stage 2 colon cancer treatment is highly individualized. Whether surgery alone is sufficient, whether adjuvant chemotherapy is appropriate, and whether neoadjuvant treatment is considered depends on the complete pathology, MSI/MMR status, imaging, previous treatment and overall health. Patients should not start, stop or change cancer treatment without discussing it with their treating doctor."),

  h2("Top 10 Sources"),
  p("1. [NCI — Colon Cancer Treatment (PDQ®)](https://www.cancer.gov/types/colorectal/hp/colon-treatment-pdq) — Stage II surgery, adjuvant chemotherapy and high-risk features."),
  p("2. [American Cancer Society — Treatment of Colon Cancer, by Stage](https://www.cancer.org/cancer/types/colon-rectal-cancer/treating/by-stage-colon.html) — Stage II treatment, high-risk features, chemotherapy and selected neoadjuvant treatment."),
  p("3. [American Cancer Society — Colorectal Cancer Stages](https://www.cancer.org/cancer/types/colon-rectal-cancer/detection-diagnosis-staging/staged.html) — T, N and M classifications and Stage II disease."),
  p("4. [ICMR — Consensus Document for Management of Colorectal Cancer](https://main.icmr.nic.in/sites/default/files/guidelines/Colorectal%20Cancer.pdf) — India-specific staging, surgery and adjuvant chemotherapy in high-risk Stage II disease."),
  p("5. [ASCRS — Clinical Practice Guidelines](https://fascrs.org/healthcare-providers/education/clinical-practice-guidelines) — high-risk Stage II features and postoperative treatment considerations."),
  p("6. [ASCO — Gastrointestinal cancer guidelines](https://www.asco.org/practice-patients/guidelines/gastrointestinal-cancer) — postoperative chemotherapy and individualized risk assessment."),
  p("7. [ESMO — Gastrointestinal cancer guidelines](https://www.esmo.org/guidelines/guidelines-by-topic/esmo-clinical-practice-guidelines-gastrointestinal-cancers) — Stage II risk assessment and adjuvant treatment."),
  p("8. [SEOM clinical guidelines](https://seom.org/publicaciones/guias-clinicas) — Spanish society guidance on adjuvant colon-cancer treatment."),
  p("9. [NCCN — Colon Cancer Guidelines](https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1428) — professional guidance for localized colon cancer management."),
  p("10. [ICMR guideline repository](https://www.icmr.gov.in) — Government of India consensus hosting for colorectal cancer care."),
  p("**Last reviewed against the cited sources: September 2026.**"),
];

const now = "2026-09-28T18:30:00.000Z";
const SLUG = "stage-2-colon-cancer-treatment-in-india";

const article = {
  id: "art_stage_2_colon_cancer_treatment_in_india",
  slug: SLUG,
  title: "Stage 2 Colon Cancer Treatment in India: Surgery, High-Risk Features and Chemotherapy",
  excerpt:
    "T3 and T4 colon cancer: when surgery alone is enough, which high-risk features prompt adjuvant chemotherapy, and why MSI/MMR status changes the discussion in India.",
  date: "28 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Surgical Oncology",
  tags: ["colon cancer", "stage 2 colon cancer", "adjuvant chemotherapy", "MSI MMR", "India"],
  image: "/uploads/articles/colon-s2-anatomy.webp",
  imageAlt:
    "Transparent adult body with a teal colon and a gold tumour invading through the bowel wall used to explain Stage 2 colon cancer",
  status: "published",
  featured: true,
  seoTitle: "Stage 2 Colon Cancer Treatment in India: Surgery, Risk and Chemo",
  seoDescription:
    "Stage 2 colon cancer treatment in India: T3 vs T4, high-risk features, MSI/MMR and when adjuvant chemotherapy is discussed after colectomy. GAF planning ranges.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/colon-s2-anatomy.webp",
  allowIndex: true,
  keywords: [
    "stage 2 colon cancer treatment in India",
    "high-risk stage II colon cancer",
    "T4 colon cancer chemotherapy",
    "MSI MMR stage 2 colon cancer",
    "adjuvant chemotherapy stage 2",
    "stage 2 colectomy India",
    "stage 2 colon cancer cost in India",
    "dMMR MSI-H stage II",
    "stage IIA IIB IIC colon cancer",
  ],
  relatedLinks: [
    { label: "Colon Cancer Treatment in India", href: PILLAR },
    { label: "Colon Cancer Surgery in India", href: SURGERY_BLOG },
    { label: "Stage 1 Colon Cancer Treatment in India", href: STAGE1 },
    { label: "Colectomy cost in India", href: COLECTOMY },
    { label: "Chemotherapy cost in India", href: CHEMO },
  ],
  blocks,
};

if (!store.categories.includes("Surgical Oncology")) store.categories.push("Surgical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["colon-s2-anatomy.webp", article.imageAlt],
  [
    "colon-s2-t4.webp",
    "Transparent adult abdomen showing a gold colon tumour invading an adjacent bowel loop used to explain T4b Stage 2 disease",
  ],
  [
    "colon-s2-clinic.webp",
    "Adult patient in clinic with a colon overlay while a medical oncologist explains Stage 2 pathology and chemotherapy",
  ],
  [
    "colon-s2-nodes.webp",
    "Transparent adult torso showing a teal right colon, gold wall-invasive tumour and teal mesenteric lymph nodes used to explain Stage 2 node sampling",
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

linkSibling(
  store.articles.find((row) => row.slug === "colon-cancer-surgery-in-india"),
  STAGE2,
  "Stage 2 Colon Cancer Treatment in India",
  "T3/T4, high-risk features, MSI/MMR and when adjuvant chemotherapy is discussed.",
);
linkSibling(
  store.articles.find((row) => row.slug === "stage-1-colon-cancer-treatment-in-india"),
  STAGE2,
  "Stage 2 Colon Cancer Treatment in India",
  "deeper wall invasion, high-risk features and the chemotherapy discussion.",
);

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
if (treatment?.translations?.en?.editorialBody && !treatment.translations.en.editorialBody.includes(STAGE2)) {
  treatment.translations.en.editorialBody = treatment.translations.en.editorialBody.replace(
    "Surgery is usually the primary treatment for Stage II colon cancer. The tumour and associated regional lymph nodes are removed.",
    "Surgery is usually the primary treatment for Stage II colon cancer. The tumour and associated regional lymph nodes are removed. How low-risk versus high-risk Stage II, MSI/MMR and whether adjuvant chemotherapy is discussed is covered in [Stage 2 Colon Cancer Treatment in India](/blogs/stage-2-colon-cancer-treatment-in-india).",
  );
  writeFileSync(treatmentsPath, `${JSON.stringify(treatments, null, 2)}\n`);
  console.log("linked stage 2 blog from colon treatment editorial");
}

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes("stage-2-colon-cancer-treatment-in-india")) {
  llms = llms.replace(
    "and [stage 1 colon cancer treatment in India](https://gaf.healthcare/blogs/stage-1-colon-cancer-treatment-in-india).",
    ", [stage 1 colon cancer treatment in India](https://gaf.healthcare/blogs/stage-1-colon-cancer-treatment-in-india) and [stage 2 colon cancer treatment in India](https://gaf.healthcare/blogs/stage-2-colon-cancer-treatment-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}
