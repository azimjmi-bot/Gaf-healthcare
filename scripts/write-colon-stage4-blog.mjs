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
const SBRT = "/costs/India/Radiation-Oncology/SBRT";
const LIVER = "/costs/India/Surgical-Oncology/Liver-Resection-(Hepatectomy)";
const CRS = "/costs/India/Surgical-Oncology/Cytoreductive-Surgery";
const HIPEC = "/costs/India/Surgical-Oncology/Cytoreductive-Surgery-with-HIPEC";
const SURG_DOCS = "/doctors/India/Surgical-Oncology";
const MED_DOCS = "/doctors/India/Medical-Oncology";
const GI_DOCS = "/doctors/India/Surgical-Gastroenterology";
const RAD_DOCS = "/doctors/India/Radiation-Oncology";
const SURG_HOSP = "/hospitals/India/Surgical-Oncology";
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

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body">Treatment depends on whether the metastatic disease is <strong>resectable, potentially resectable or unresectable</strong>, together with the tumor's molecular characteristics and the patient's overall health.</p><p class="article-quick-answer__body">Treatment may include:</p><ul class="article-quick-answer__list"><li>Surgery to remove the primary colon tumor</li><li>Surgery to remove liver or lung metastases</li><li>Ablation of selected metastatic lesions</li><li>Chemotherapy</li><li>Targeted therapy</li><li>Immunotherapy</li><li>Radiation or stereotactic radiation in selected situations</li><li>Cytoreductive surgery for selected peritoneal metastases</li><li>HIPEC in carefully selected patients and specialist centers</li><li>Maintenance therapy</li><li>Later-line systemic treatment</li><li>Clinical trials</li><li>Supportive and palliative care when appropriate</li></ul><p class="article-quick-answer__body">Common first-line chemotherapy backbones include:</p><ul class="article-quick-answer__list"><li><strong>FOLFOX</strong></li><li><strong>CAPOX</strong></li><li><strong>FOLFIRI</strong></li></ul><p class="article-quick-answer__body">Selected fit patients may receive more intensive combinations such as <strong>FOLFOXIRI</strong>.</p><p class="article-quick-answer__body">Treatment is then combined with a biologic or targeted medicine when appropriate.</p><p class="article-quick-answer__body">For tumors that are <strong>MSI-H/dMMR</strong>, immunotherapy can be a first-line treatment option and has become a major part of metastatic colorectal cancer care.</p><p class="article-quick-answer__body">For other tumors, treatment may depend on:</p><ul class="article-quick-answer__list"><li>RAS status</li><li>BRAF V600E status</li><li>HER2 status</li><li>Tumor sidedness</li><li>MSI/MMR status</li><li>Other actionable molecular alterations</li></ul><p class="article-quick-answer__body">The treatment plan should be determined by a multidisciplinary colorectal cancer team.</p></aside>`;

const subTable = `<div class="md-body"><table><thead><tr><th>Stage</th><th>General meaning</th></tr></thead><tbody><tr><td>Stage IVA</td><td>Cancer has spread to one distant organ or site</td></tr><tr><td>Stage IVB</td><td>Cancer has spread to multiple distant organs or sites</td></tr><tr><td>Stage IVC</td><td>Cancer has spread to the peritoneal lining of the abdomen, with or without other distant spread</td></tr></tbody></table></div>`;

const vs3 = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Stage 3</th><th>Stage 4</th></tr></thead><tbody><tr><td>Regional lymph nodes</td><td>Cancer may be present</td><td>May be involved</td></tr><tr><td>Distant metastasis</td><td>No</td><td>Yes</td></tr><tr><td>Primary treatment</td><td>Surgery + adjuvant chemotherapy in most cases</td><td>Systemic/local treatment individualized</td></tr><tr><td>Surgery</td><td>Usually central</td><td>Selected patients</td></tr><tr><td>Molecular profiling</td><td>Important</td><td>Critical for treatment selection</td></tr><tr><td>Immunotherapy</td><td>Selected situations</td><td>Major option for MSI-H/dMMR disease</td></tr><tr><td>Targeted therapy</td><td>Limited routine role</td><td>Major role in biomarker-selected disease</td></tr><tr><td>Liver/lung surgery</td><td>Not usually relevant</td><td>Important for selected metastatic disease</td></tr><tr><td>CRS/HIPEC</td><td>Not routine</td><td>Selected peritoneal disease</td></tr><tr><td>Treatment goal</td><td>Usually curative</td><td>Curative in selected cases; disease control in others</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Component</th><th>GAF planning range in India</th></tr></thead><tbody><tr><td><a href="${COLONOSCOPY}">Colonoscopy</a></td><td>$200–$550</td></tr><tr><td><a href="${COLECTOMY}">Colectomy</a></td><td>$7,000–$18,000</td></tr><tr><td><a href="${CRC_SURG}">Colorectal cancer surgery</a></td><td>$8,000–$20,000</td></tr><tr><td><a href="${CHEMO}">Chemotherapy</a></td><td>$1,500–$8,000+</td></tr><tr><td><a href="${TARGETED}">Targeted therapy</a></td><td>$8,000–$30,000</td></tr><tr><td><a href="${IMMUNO}">Immunotherapy</a></td><td>$15,000–$45,000</td></tr><tr><td><a href="${PRECISION}">Precision oncology / molecular testing</a></td><td>$2,000–$7,000</td></tr><tr><td><a href="${LIVER}">Liver resection (hepatectomy)</a></td><td>$10,000–$26,000</td></tr><tr><td><a href="${CRS}">Cytoreductive surgery</a></td><td>$10,000–$24,000</td></tr><tr><td><a href="${HIPEC}">CRS with HIPEC</a></td><td>$18,000–$40,000</td></tr><tr><td><a href="${SBRT}">SBRT</a></td><td>$8,000–$17,500</td></tr><tr><td><a href="${EBRT}">EBRT</a></td><td>$1,000–$6,000+</td></tr><tr><td><a href="${OSTOMY}">Ostomy / stoma surgery</a> if required</td><td>$2,500–$6,800</td></tr></tbody></table></div>`;

const faqs = [
  ["Is Stage 4 colon cancer treatable?", "Yes. Stage 4 colon cancer has multiple treatment options. Treatment may include systemic therapy, surgery, targeted therapy, immunotherapy and local treatment depending on the metastatic pattern and molecular profile."],
  ["Is Stage 4 colon cancer curable?", "A subset of patients with limited metastatic disease may undergo treatment with curative intent, particularly when all known disease can be completely removed or locally controlled. Widespread unresectable disease is generally managed with disease-control and symptom-management goals."],
  ["Can Stage 4 colon cancer be operated on?", "Yes. Surgery can be appropriate for selected patients, including some patients with liver-only or lung-only metastases and some patients whose disease becomes resectable after chemotherapy."],
  ["Does every Stage 4 patient need chemotherapy?", "Systemic therapy is a major component of treatment for many patients with unresectable metastatic disease. However, treatment differs for biomarker-defined groups, including MSI-H/dMMR disease, where immunotherapy may be used."],
  ["What is the best chemotherapy for Stage 4 colon cancer?", "There is no single chemotherapy regimen that is best for every patient. FOLFOX, CAPOX, FOLFIRI and FOLFOXIRI may all have roles depending on disease characteristics, previous treatment, fitness and treatment objectives."],
  ["Is immunotherapy available for Stage 4 colon cancer?", "Yes. Immunotherapy is particularly important for MSI-H/dMMR metastatic colorectal cancer."],
  ["What if my cancer has spread only to the liver?", "Liver-only metastatic disease can sometimes be treated aggressively. Depending on the number, location and resectability of lesions, options may include liver surgery, ablation, systemic therapy or combinations of these approaches."],
  ["What if the cancer has spread to both the liver and lungs?", "Treatment depends on the number, size and location of lesions and whether all sites can potentially be controlled. Selected patients may still be candidates for aggressive local treatment."],
  ["What is conversion therapy?", "Conversion therapy means using systemic treatment to shrink metastatic disease so that previously unresectable cancer may become suitable for surgery or another local treatment."],
  ["What is CRS and HIPEC?", "CRS is cytoreductive surgery to remove visible peritoneal cancer. HIPEC is heated chemotherapy delivered within the abdominal cavity during selected procedures. It is appropriate only for carefully selected patients."],
  ["Does Stage 4 colon cancer always cause symptoms?", "No. Some patients have substantial symptoms, while others have relatively few symptoms despite metastatic disease."],
  ["How long does Stage 4 colon cancer treatment take?", "There is no single treatment duration. Some patients undergo surgery followed by several months of systemic treatment, while others require ongoing systemic therapy with periodic treatment changes."],
  ["Can treatment be continued in my home country after starting in India?", "In some cases, yes. This should be planned jointly by the Indian oncology team and the patient's local oncologist."],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("Stage 4 colon cancer, also called **metastatic colon cancer**, means that the cancer has spread from the colon to distant parts of the body. Common sites include the liver, lungs, peritoneum (abdominal lining), distant lymph nodes, ovaries and, in more advanced disease, other organs."),
  p("A Stage 4 diagnosis does **not** mean that every patient has the same treatment options or the same outlook. Some patients have a small number of metastases that can potentially be removed or destroyed completely. Others have disease that is initially unresectable but may become removable after systemic treatment. For patients with widespread disease that cannot be completely removed, modern chemotherapy, targeted therapy and immunotherapy can control the cancer, relieve symptoms and prolong life."),
  p("The most important question is therefore not simply **\"Is Stage 4 colon cancer treatable?\"** It is: **where has the cancer spread, can all visible disease potentially be controlled or removed, and what does the tumor's molecular profile tell us about treatment?**"),
  p("This article is the Stage 4 / metastatic hub for the colon cluster. The broader pathway is in [Colon Cancer Treatment in India](" + PILLAR + "). How hemicolectomy, stomas and approach choice are planned is in [Colon Cancer Surgery in India](" + SURGERY_BLOG + "). [Stage 1](" + STAGE1 + "), [Stage 2](" + STAGE2 + ") and [Stage 3](" + STAGE3 + ") cover earlier, non-metastatic disease. It is **not** a rectal-cancer page: radiation has a much larger role when the tumour is rectal. See [rectal cancer surgery](" + RECTAL + ")."),
  p("GAF Healthcare planning ranges include [colectomy](" + COLECTOMY + ") **$7,000–$18,000**, [chemotherapy](" + CHEMO + ") **$1,500–$8,000+**, [targeted therapy](" + TARGETED + ") **$8,000–$30,000**, [immunotherapy](" + IMMUNO + ") **$15,000–$45,000**, [precision oncology / molecular testing](" + PRECISION + ") **$2,000–$7,000**, [liver resection](" + LIVER + ") **$10,000–$26,000** and [CRS with HIPEC](" + HIPEC + ") **$18,000–$40,000**. These are planning ranges, not hospital quotations."),
  p("International patients comparing [surgical oncologists](" + SURG_DOCS + "), [surgical gastroenterologists](" + GI_DOCS + "), [medical oncologists](" + MED_DOCS + ") and [radiation oncologists](" + RAD_DOCS + ") commonly start with [Delhi NCR](/doctors/India/Delhi-NCR/Surgical-Oncology/Colectomy), [Mumbai](/doctors/India/Mumbai/Surgical-Oncology/Colectomy), [Bengaluru](/doctors/India/Bengaluru/Surgical-Oncology/Colectomy), [Chennai](/doctors/India/Chennai/Surgical-Oncology/Colectomy) and [Hyderabad](/doctors/India/Hyderabad/Surgical-Oncology/Colectomy). Partner [surgical-oncology hospitals](" + SURG_HOSP + ") and [medical-oncology hospitals](" + MED_HOSP + ") in [Delhi NCR](/hospitals/India/Delhi-NCR/Surgical-Oncology) and [Mumbai](/hospitals/India/Mumbai/Surgical-Oncology) are a typical first filter."),
  btn("Ask about Stage 4 colon cancer treatment in India", consult("Stage 4 Colon Cancer Treatment")),
  p("[WhatsApp +91 90443 46292 with scans, CEA and molecular results](" + wa("Please review my Stage 4 colon cancer CT/MRI, CEA and MSI/RAS/BRAF/HER2 results and advise whether the metastases look resectable in India.") + ")"),
  img(
    "/uploads/articles/colon-s4-anatomy.webp",
    "Transparent adult body with a teal colon, gold primary tumour and gold liver metastases used to explain Stage 4 colon cancer",
    "Stage 4 means distant spread. Colon cancer in the liver is still colon cancer — not primary liver cancer.",
  ),

  h2("What Is Stage 4 Colon Cancer?"),
  p("Stage 4 colon cancer means that the cancer has spread beyond the regional lymph nodes to distant sites. This is called **metastatic colorectal cancer (mCRC)**. The metastatic tumour remains colon cancer even when it grows in another organ. Colon cancer that spreads to the liver is metastatic colon cancer involving the liver — not the same disease as primary liver cancer. The same is true of lung metastases."),
  html(subTable),
  p("The exact staging system used by the treating centre and the current TNM edition should be confirmed from the pathology and imaging reports. **The stage alone does not determine whether surgery is possible.**"),

  h2("Where Does Colon Cancer Commonly Spread?"),
  p("The **liver** is one of the most frequent sites. Some patients have only a few liver lesions that can be surgically removed or ablated. Selected **lung** metastases may be candidates for metastasectomy, ablation or [SBRT](" + SBRT + ") (**$8,000–$17,500**). **Peritoneal** spread across the abdominal lining is treated differently from liver- or lung-limited disease. Less commonly, metastatic colon cancer can involve ovaries, bone, distant lymph nodes, adrenal glands or other organs. The pattern and number of sites matter when deciding whether local treatment is possible."),

  h2("Is Stage 4 Colon Cancer Curable?"),
  p("This question needs an individualized answer. For some patients with limited metastatic disease — particularly when all visible disease can be completely removed or destroyed — treatment can potentially achieve long-term disease control and, in selected cases, cure. This is most relevant to carefully selected patients with resectable liver metastases, selected resectable lung metastases, limited metastases involving a small number of sites, a favorable response to systemic therapy, and disease that can be completely removed or locally controlled."),
  p("For widespread unresectable metastatic disease, treatment is generally focused on controlling the cancer, prolonging survival and maintaining quality of life. **Stage 4 does not automatically mean that surgery is impossible, and it does not automatically mean that treatment is only palliative.** A specialist multidisciplinary assessment is essential."),

  h2("The Most Important Question: Is the Metastatic Disease Resectable?"),
  p("Modern treatment planning often divides Stage 4 colon cancer into three broad groups."),
  h3("1. Resectable metastatic disease"),
  p("All known disease can potentially be removed or locally treated. The plan may be **surgery → chemotherapy** or **chemotherapy → surgery → additional systemic treatment**, depending on the disease pattern."),
  h3("2. Potentially resectable disease"),
  p("The metastases cannot safely be removed initially, but treatment may shrink them enough to make surgery possible. This is **conversion therapy**. The disease should be reassessed regularly so that a surgical window is not missed."),
  h3("3. Unresectable metastatic disease"),
  p("Complete removal is not currently possible because of extensive disease, multiple organs, lesion number or location, inability to preserve organ function, fitness or other technical limits. Treatment usually focuses on systemic therapy, targeted therapy, immunotherapy where appropriate, local treatment of selected symptomatic lesions, and quality of life. **Unresectable today does not always mean unresectable forever.**"),
  btn("Ask whether liver or lung metastases look resectable", consult("Liver Resection (Hepatectomy)")),

  h2("Why a Multidisciplinary Team Is Essential"),
  p("Stage 4 colon cancer can involve a colorectal surgeon, hepatobiliary/liver surgeon, thoracic surgeon, medical oncologist, interventional radiologist, radiation oncologist, pathologist, molecular pathologist, genetic counselor, palliative-care and nutrition specialists. For potentially curative metastatic disease, decisions about resectability should ideally be made **before** committing to a long course of systemic treatment that is never reassessed for surgery."),
  img(
    "/uploads/articles/colon-s4-clinic.webp",
    "Adult patient in clinic with a colon-and-liver-metastasis overlay while a medical oncologist explains Stage 4 treatment",
    "Ask where the cancer has spread and whether all visible disease could be removed — not only which drug is newest.",
  ),

  h2("Diagnosis, Staging and Molecular Testing"),
  p("Before treatment starts, the team needs to know where the primary tumour is, whether it has caused obstruction or perforation, how many metastatic lesions are present and where, whether all known disease could be removed, the molecular profile, and whether the patient is fit enough for intensive treatment."),
  p("[Colonoscopy](" + COLONOSCOPY + ") (**$200–$550**) identifies the primary tumour and allows biopsy. Contrast-enhanced CT of the chest, abdomen and pelvis is commonly used for initial staging. When liver metastases are present or suspected, high-quality **liver MRI** may show number, size, location, relationship to blood vessels and potential resectability. PET-CT is not required for every Stage 4 patient; it may help in selected potentially resectable or uncertain cases. CEA is a useful baseline and follow-up marker, not a stand-alone test of response."),
  p("**Severe abdominal pain with vomiting, inability to pass stool or gas, heavy rectal bleeding, sudden collapse, chest pain or sudden shortness of breath belongs in a local emergency department — not a delayed WhatsApp message.**"),
  p("Molecular testing is essential in Stage 4 care — one of the biggest differences from older chemotherapy-only approaches. Important tests may include **MMR/MSI, KRAS, NRAS, BRAF V600E, HER2, NTRK fusion** where appropriate, and other next-generation sequencing findings in selected patients. GAF planning ranges for [precision oncology](" + PRECISION + ") are **$2,000–$7,000**."),
  btn("Ask which molecular tests to complete before first-line treatment", consult("Precision Oncology")),

  h2("Immunotherapy for MSI-H/dMMR Stage 4 Colon Cancer"),
  p("Tumors may be MSI-H, MSS, dMMR or pMMR. This distinction is extremely important. Patients with **MSI-H/dMMR metastatic colorectal cancer** can respond particularly well to immune checkpoint inhibitors, so an MSI/MMR result should be obtained before finalizing systemic treatment whenever feasible."),
  p("For appropriately selected patients, pembrolizumab, nivolumab, or **nivolumab plus ipilimumab** can be used. The FDA approved nivolumab plus ipilimumab for initial treatment of MSI-H/dMMR advanced colorectal cancer in 2025 following CheckMate-8HW. Choice depends on the clinical situation, regulatory approvals, patient factors and the treating oncologist. GAF planning ranges for [immunotherapy](" + IMMUNO + ") are **$15,000–$45,000**."),
  btn("Ask whether immunotherapy is first-line for MSI-H/dMMR disease", consult("Immunotherapy")),

  h2("Chemotherapy and Targeted Therapy"),
  p("For tumours not treated with first-line immunotherapy, systemic chemotherapy remains a major component. Common backbones are **FOLFOX** (5-FU, leucovorin, oxaliplatin), **CAPOX** (capecitabine plus oxaliplatin), **FOLFIRI** (5-FU, leucovorin, irinotecan) and, for selected fit patients when a high response rate is particularly important, **FOLFOXIRI**. Not every patient needs the most intensive chemotherapy. Age, fitness, organ function, tumour burden, symptoms, goals and expected toxicity all matter. GAF planning ranges for [chemotherapy](" + CHEMO + ") are **$1,500–$8,000+**."),
  img(
    "/uploads/articles/colon-s4-systemic.webp",
    "Adult in a chemotherapy day-care chair with a colon, liver-metastasis and peritoneal-deposit overlay used to explain systemic treatment for Stage 4 colon cancer",
    "FOLFOX, CAPOX, FOLFIRI or immunotherapy may all be first-line — the molecular profile decides more than stage alone.",
  ),
  p("Targeted medicines are often combined with chemotherapy or used in biomarker-selected later-line settings. [Targeted therapy](" + TARGETED + ") planning ranges are **$8,000–$30,000**."),
  p("**Anti-VEGF** medicines such as bevacizumab are commonly used with chemotherapy in appropriate patients. **Anti-EGFR** medicines (cetuximab, panitumumab) can be useful for selected tumours, but **RAS status is critical** — they are generally not used when the tumour contains an activating RAS mutation. Tumor **sidedness** also matters. For treatment-naive RAS wild-type, BRAF wild-type, MSS/pMMR **left-sided** tumours, an anti-EGFR antibody plus chemotherapy can be an important first-line strategy. **Right-sided** tumours generally have a different biological profile; an anti-VEGF strategy is often favored over anti-EGFR in the first-line setting."),
  p("**BRAF V600E** identifies a distinct subtype. Encorafenib plus cetuximab has been an established approach after prior therapy, while newer evidence has supported encorafenib, cetuximab and mFOLFOX6 in previously untreated BRAF V600E metastatic disease. **HER2** amplification or overexpression may support tucatinib plus trastuzumab in appropriately selected previously treated RAS wild-type patients. **KRAS G12C** may support adagrasib plus cetuximab after prior standard chemotherapy. These examples illustrate why comprehensive molecular profiling becomes increasingly important as treatment progresses."),
  btn("Ask how RAS, BRAF, HER2 and sidedness change first-line therapy", consult("Targeted Therapy")),
  p("[WhatsApp +91 90443 46292 about FOLFOX versus immunotherapy](" + wa("Please advise whether FOLFOX, FOLFIRI, targeted therapy or immunotherapy is more appropriate for my Stage 4 colon cancer molecular profile in India.") + ")"),

  h2("What Happens If First-Line Treatment Stops Working?"),
  p("Stage 4 colon cancer is often managed through multiple treatment lines. First-line may be FOLFOX/CAPOX or FOLFIRI ± targeted therapy, or immunotherapy for appropriate MSI-H/dMMR disease. Second-line often switches the chemotherapy backbone (**FOLFOX → FOLFIRI** or the reverse). Later lines may include trifluridine/tipiracil ± bevacizumab, regorafenib, fruquintinib, biomarker-specific targeted therapy or clinical trials. The exact sequence depends on previous treatments and molecular findings."),

  h2("Can Stage 4 Colon Cancer Surgery Still Be Performed?"),
  p("Yes. Stage 4 disease does **not automatically rule out surgery**. Surgery may be considered when the primary tumour is obstructing, bleeding or perforated; when metastatic disease is limited; when liver or lung metastases are resectable; when the disease has responded enough to chemotherapy; or when complete removal of visible disease appears achievable. If the primary tumour is asymptomatic and metastatic disease is extensive, systemic therapy may be prioritized. In selected obstructing tumours, an expandable metal stent may relieve obstruction, avoid emergency surgery and allow time to start systemic therapy. See [Colon Cancer Surgery in India](" + SURGERY_BLOG + ")."),
  img(
    "/uploads/articles/colon-s4-liver.webp",
    "Transparent adult abdomen showing a teal colon with a gold primary tumour and a brown liver containing gold metastatic nodules",
    "A few resectable liver lesions are not managed the same way as widespread liver, lung and peritoneal disease.",
  ),
  p("Selected patients may undergo **colon surgery + liver metastasectomy** at the same operation, in staged procedures, after systemic therapy, or as part of a planned sequence. The decision depends on number, size, location, relationship to blood vessels, future liver remnant, extrahepatic disease, response to chemotherapy and fitness. Ablation (radiofrequency, microwave or other image-guided techniques) can destroy selected small lesions when surgery would remove too much healthy liver. [SBRT](" + SBRT + ") may be considered for selected liver, lung or other oligometastatic sites. Selected isolated pulmonary metastases may undergo pulmonary metastasectomy."),
  p("**Oligometastatic disease** generally means a limited number of metastatic lesions that may be amenable to local treatment. A patient with three resectable liver metastases is not necessarily managed the same way as a patient with extensive disease throughout the liver, lungs and peritoneum."),

  h2("Conversion Therapy and Imaging Intervals"),
  p("Conversion therapy means giving systemic treatment — sometimes intensive combinations such as FOLFOXIRI plus appropriate targeted therapy — with the objective of shrinking metastatic disease enough to make local treatment possible. This requires frequent imaging and close coordination between medical oncology and surgical teams. Treatment should not simply continue indefinitely without reassessing whether the disease has become technically treatable."),
  p("The 2025 Indian expert consensus on advanced/metastatic colorectal cancer recommends reassessment of potentially resectable metastatic disease at approximately **8–10 week intervals** in relevant circumstances so that a potential surgical window is not missed. Prolonged chemotherapy can also create treatment-related toxicity."),

  h2("Peritoneal Metastases, CRS and HIPEC"),
  p("Peritoneal metastases occur when colon cancer spreads across the abdominal lining. Possible approaches include systemic chemotherapy, [cytoreductive surgery](" + CRS + ") (**$10,000–$24,000**), intraperitoneal treatment in selected settings, [HIPEC](" + HIPEC + ") (**$18,000–$40,000**) in carefully selected patients, clinical trials and symptom-directed treatment."),
  p("CRS aims to remove visible tumour deposits from the peritoneal cavity. **HIPEC** (hyperthermic intraperitoneal chemotherapy) circulates heated chemotherapy in the abdomen after visible peritoneal tumour has been removed. Neither is appropriate for every patient with peritoneal metastases. Selection depends on extent of disease, ability to achieve complete or near-complete cytoreduction, control of disease elsewhere, fitness, histology and previous treatment. Assessment belongs at centres with peritoneal-surface expertise."),
  btn("Ask whether CRS or HIPEC could be considered", consult("Cytoreductive Surgery with HIPEC")),

  h2("Side Effects, Nutrition and Follow-Up"),
  p("Chemotherapy may cause fatigue, nausea, diarrhea, mouth sores, low blood counts, infection, neuropathy, appetite changes and hand-foot syndrome. Bevacizumab may cause hypertension, bleeding, clots, protein in urine, delayed wound healing and, rarely, gastrointestinal perforation. Anti-EGFR therapy commonly causes an acne-like rash, dry skin, nail changes, diarrhea and infusion reactions. Immunotherapy can cause immune-related effects involving skin, thyroid, liver, colon, lungs or other organs — report symptoms early."),
  p("There is no Stage 4 diet that can cure metastatic cancer. The goal is adequate calories, protein, hydration, muscle mass and treatment tolerance. Exercise such as walking, light resistance work and stretching should be individualized, particularly after major surgery or during intensive chemotherapy."),
  p("Follow-up during Stage 4 treatment is different from Stage 1–3 surveillance. Doctors monitor symptoms, examination, CEA where useful, blood counts, kidney and liver function, CT or MRI, treatment response, side effects and new molecular information. Imaging is particularly important because the strategy may change if the cancer shrinks, remains stable, becomes resectable or progresses. **Stable disease** can still be a meaningful outcome if treatment is controlling the cancer and the patient is tolerating it. **Progression** means meaningful growth or new disease on the assessment criteria being used."),

  h2("Stage 4 vs Stage 3"),
  html(vs3),

  h2("Stage 4 Colon Cancer Treatment Pathways"),
  p("**Pathway 1 — resectable liver metastases:** diagnosis → molecular testing and staging → multidisciplinary review → colon and liver surgery, or planned systemic therapy followed by surgery → postoperative systemic treatment when appropriate → surveillance."),
  p("**Pathway 2 — potentially resectable liver metastases:** diagnosis → systemic therapy ± targeted therapy → imaging reassessment → if the tumour becomes resectable, liver/colon surgery or local treatment → further systemic treatment when appropriate."),
  p("**Pathway 3 — unresectable metastatic disease:** diagnosis → molecular profiling → first-line systemic therapy or immunotherapy → response assessment → maintenance or continuation → second-line treatment if progression → biomarker-directed or later-line treatment → clinical trials or supportive care where appropriate."),
  p("**Pathway 4 — MSI-H/dMMR metastatic disease:** diagnosis → confirm MSI-H/dMMR → immunotherapy-based treatment → imaging and clinical response assessment → continue, modify or consider local treatment according to response."),

  h2("Stage 4 Colon Cancer Treatment Cost in India"),
  p("There is **no reliable single package price** because Stage 4 disease can require anything from systemic therapy alone to complex combinations of chemotherapy, targeted treatment, surgery and local treatment. Two patients with the same Stage 4 label may need completely different pathways — limited resectable liver disease, long-term systemic treatment, MSI-H/dMMR immunotherapy, or CRS ± HIPEC. GAF Healthcare publishes USD planning ranges compiled from partner hospital cost sheets. They are not hospital quotations."),
  html(costTable),
  p("City pages such as [Delhi NCR colectomy](/costs/India/Delhi-NCR/Surgical-Oncology/Colectomy), [Mumbai](/costs/India/Mumbai/Surgical-Oncology/Colectomy), [Bengaluru](/costs/India/Bengaluru/Surgical-Oncology/Colectomy), [Chennai](/costs/India/Chennai/Surgical-Oncology/Colectomy) and [Hyderabad](/costs/India/Hyderabad/Surgical-Oncology/Colectomy) use the same national range unless a hospital issues a verified quotation."),
  p("A written hospital estimate based on the patient's medical records is much more useful than a generic online cost figure. Ask whether the quotation separates surgeon fees, hospital and OT charges, anaesthesia, pathology, imaging, chemotherapy or immunotherapy drugs, day-care, medical-oncology consultation, molecular testing, liver or peritoneal surgery and follow-up — and what is excluded (ICU, complications, additional surgery, extra cycles)."),
  btn("Ask for an itemised Stage 4 quotation", consult("Stage 4 Colon Cancer Treatment Cost in India")),
  p("[WhatsApp +91 90443 46292 for a patient-specific Stage 4 estimate](" + wa("Please send an itemised Stage 4 colon cancer quotation in India covering molecular testing, systemic therapy, and liver surgery or CRS/HIPEC if they apply.") + ")"),

  h2("How to Choose a Hospital and What to Ask"),
  p("Stage 4 disease requires a different hospital-selection approach from straightforward early-stage cancer. Look for colorectal surgery, hepatobiliary surgery when liver metastases are present, thoracic surgery for selected lung metastases, medical oncology for chemotherapy/targeted therapy/immunotherapy, molecular pathology, interventional radiology for ablation, radiation oncology when SBRT is being considered, and peritoneal-surface expertise when CRS/HIPEC is on the table."),
  ul([
    "[Surgical oncology hospitals in Delhi NCR](/hospitals/India/Delhi-NCR/Surgical-Oncology)",
    "[Surgical oncology hospitals in Mumbai](/hospitals/India/Mumbai/Surgical-Oncology)",
    "[Surgical oncology hospitals in Bengaluru](/hospitals/India/Bengaluru/Surgical-Oncology)",
    "[Medical oncology hospitals in Delhi NCR](/hospitals/India/Delhi-NCR/Medical-Oncology)",
    "[Medical oncology hospitals in Mumbai](/hospitals/India/Mumbai/Medical-Oncology)",
  ]),
  ol([
    "Where exactly has the cancer spread, and is the metastatic disease resectable now — or could it become resectable?",
    "Do I have liver-only, lung-only or peritoneal disease, and could surgery, ablation, SBRT, CRS or HIPEC be considered?",
    "What is my MMR/MSI, RAS, BRAF V600E and HER2 status, and is broader genomic testing appropriate?",
    "Should I receive chemotherapy, targeted therapy or immunotherapy first, and what is the goal of that first treatment?",
    "How often will imaging be repeated, and when will we reassess for surgery?",
    "What happens if the cancer progresses, can later cycles continue in my home country, and what will treatment cost in India?",
  ]),

  h2("The Bottom Line"),
  p("Stage 4 colon cancer means distant spread, most often to the liver, lungs or peritoneum. It does not automatically mean surgery is impossible. Limited metastatic disease may sometimes be treated with curative intent. Potentially resectable disease may become resectable after conversion therapy. FOLFOX, CAPOX, FOLFIRI and selected intensive regimens such as FOLFOXIRI are common chemotherapy backbones. Targeted therapy may be selected according to RAS, BRAF, HER2, sidedness and other findings. **MSI/MMR testing is essential** because MSI-H/dMMR tumours can respond strongly to immunotherapy. CRS and HIPEC are options only for selected peritoneal disease. Treatment should be reassessed regularly so a surgical window is not missed."),

  h2("Frequently Asked Questions"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Related Colon Cancer Resources"),
  ul([
    "[Colon Cancer Treatment in India](" + PILLAR + ") — stage, molecular tests and systemic medicines around metastatic disease.",
    "[Colon Cancer Surgery in India](" + SURGERY_BLOG + ") — hemicolectomy types, anastomosis, stomas and approach choice.",
    "[Stage 3 Colon Cancer Treatment in India](" + STAGE3 + ") — node-positive M0 disease, FOLFOX/CAPOX and 3 versus 6 months.",
    "[Stage 2 Colon Cancer Treatment in India](" + STAGE2 + ") — node-negative T3/T4 and when chemotherapy is only discussed.",
    "[Stage 1 Colon Cancer Treatment in India](" + STAGE1 + ") — T1/T2 and when endoscopic removal is enough.",
    "[Liver resection](" + LIVER + ") — selected metastases, $10,000–$26,000.",
    "[CRS with HIPEC](" + HIPEC + ") — selected peritoneal disease, $18,000–$40,000.",
    "[Immunotherapy](" + IMMUNO + ") — first-line option for MSI-H/dMMR metastatic disease.",
    "[Rectal cancer surgery](" + RECTAL + ") — a different pathway when radiation may be part of treatment.",
    "[Breast cancer treatment in India](" + BREAST + ") and [prostate cancer treatment in India](" + PROSTATE + ") — other GAF cancer pathways.",
  ]),

  h2("How GAF Healthcare Can Help"),
  p("GAF Healthcare coordinates international patients who need a Stage 4 colon cancer opinion in India — after liver or lung metastases are found, a question about conversion therapy, or an MSI/RAS/BRAF/HER2 result. Share the colonoscopy PDF, the **complete pathology report**, CT/MRI (the actual images, not only the written report), CEA, previous chemotherapy records and any molecular results. A coordinator can introduce a [surgical oncologist](" + SURG_DOCS + ") and a [medical oncologist](" + MED_DOCS + "), then help collect an itemised quotation covering systemic therapy, molecular testing and any planned liver, lung or peritoneal operation."),
  btn("Share records for a Stage 4 review", consult("Stage 4 Colon Cancer Treatment")),
  p("[WhatsApp +91 90443 46292 with colonoscopy, scans and molecular reports](" + wa("I would like to share my colonoscopy, complete pathology, CT/MRI images and molecular reports for a Stage 4 colon cancer second opinion in India.") + ")"),

  h2("Medical Disclaimer"),
  p("This article is intended for general educational purposes and should not replace consultation with a qualified colorectal surgeon, medical oncologist, radiologist or multidisciplinary cancer team. Stage 4 colon cancer treatment is highly individualized. Surgery, conversion therapy, chemotherapy, targeted therapy, immunotherapy, CRS/HIPEC and later-line medicines depend on imaging, pathology, molecular findings, previous treatment, general health and the availability of appropriate therapies. Patients should not start, stop or change cancer treatment without discussing it with their treating doctor."),

  h2("Top 10 Sources"),
  p("1. [NCI — Colon Cancer Treatment (PDQ®)](https://www.cancer.gov/types/colorectal/hp/colon-treatment-pdq) — metastatic (Stage IV) treatment, surgery, systemic therapy and local options."),
  p("2. [NCI — Colon Cancer Treatment (PDQ®) for patients](https://www.cancer.gov/types/colorectal/patient/colon-treatment-pdq) — patient-facing Stage IV overview."),
  p("3. [ASCO — Gastrointestinal cancer guidelines](https://www.asco.org/practice-patients/guidelines/gastrointestinal-cancer) — treatment of metastatic colorectal cancer."),
  p("4. [2025 Indian consensus statements for advanced/metastatic colorectal cancer](https://www.thieme-connect.de/products/ejournals/html/10.1055/s-0045-1809380) — biomarker testing, conversion therapy and 8–10 week reassessment in the Indian context."),
  p("5. [NCI — Colon Cancer Treatment PDQ, immunotherapy discussion](https://www.cancer.gov/types/colorectal/hp/colon-treatment-pdq) — MSI-H/dMMR immune checkpoint inhibitors in advanced disease."),
  p("6. [FDA — nivolumab plus ipilimumab for MSI-H/dMMR advanced colorectal cancer](https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-nivolumab-ipilimumab-unresectable-or-metastatic-msi-h-or-dmmr-colorectal-cancer) — CheckMate-8HW first-line approval, 2025."),
  p("7. [FDA — encorafenib for BRAF V600E metastatic colorectal cancer](https://www.fda.gov/drugs/resources-information-approved-drugs/fda-grants-traditional-approval-encorafenib-metastatic-colorectal-cancer-braf-v600e-mutation) — encorafenib plus cetuximab with fluorouracil-based chemotherapy."),
  p("8. [FDA — tucatinib plus trastuzumab for HER2-positive metastatic colorectal cancer](https://www.fda.gov/drugs/resources-information-approved-drugs/fda-grants-accelerated-approval-tucatinib-trastuzumab-her2-positive-ras-wild-type-unresectable-or) — previously treated RAS wild-type disease."),
  p("9. [FDA — trifluridine/tipiracil plus bevacizumab](https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-trifluridine-and-tipiracil-bevacizumab-previously-treated-metastatic-colorectal-cancer) — later-line SUNLIGHT regimen."),
  p("10. [FDA — fruquintinib for previously treated metastatic colorectal cancer](https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-fruquintinib-metastatic-colorectal-cancer) — oral VEGFR-targeted later-line therapy."),
  p("**Last reviewed against the cited sources: September 2026.**"),
];

const now = "2026-09-28T19:30:00.000Z";
const SLUG = "stage-4-colon-cancer-treatment-in-india";

const article = {
  id: "art_stage_4_colon_cancer_treatment_in_india",
  slug: SLUG,
  title: "Stage 4 Colon Cancer Treatment in India: Metastatic Care, Surgery and Targeted Therapy",
  excerpt:
    "Metastatic colon cancer: resectable vs unresectable disease, conversion therapy, FOLFOX/FOLFIRI, MSI/MMR immunotherapy, liver surgery and CRS/HIPEC.",
  date: "28 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Surgical Oncology",
  tags: ["colon cancer", "stage 4 colon cancer", "metastatic colon cancer", "FOLFOX", "immunotherapy", "India"],
  image: "/uploads/articles/colon-s4-anatomy.webp",
  imageAlt:
    "Transparent adult body with a teal colon, gold primary tumour and gold liver metastases used to explain Stage 4 colon cancer",
  status: "published",
  featured: true,
  seoTitle: "Stage 4 Colon Cancer Treatment in India: Metastatic Care",
  seoDescription:
    "Stage 4 colon cancer treatment in India: resectability, conversion therapy, FOLFOX/FOLFIRI, MSI/MMR immunotherapy, liver surgery and CRS/HIPEC. GAF planning ranges.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/colon-s4-anatomy.webp",
  allowIndex: true,
  keywords: [
    "stage 4 colon cancer treatment in India",
    "metastatic colon cancer India",
    "colon cancer liver metastases",
    "conversion therapy colon cancer",
    "FOLFOX FOLFIRI stage 4",
    "MSI-H immunotherapy colon cancer",
    "CRS HIPEC colon cancer India",
    "stage 4 colon cancer cost in India",
    "BRAF HER2 RAS colon cancer",
  ],
  relatedLinks: [
    { label: "Colon Cancer Treatment in India", href: PILLAR },
    { label: "Stage 3 Colon Cancer Treatment in India", href: STAGE3 },
    { label: "Colon Cancer Surgery in India", href: SURGERY_BLOG },
    { label: "Stage 2 Colon Cancer Treatment in India", href: STAGE2 },
    { label: "Immunotherapy cost in India", href: IMMUNO },
  ],
  blocks,
};

if (!store.categories.includes("Surgical Oncology")) store.categories.push("Surgical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["colon-s4-anatomy.webp", article.imageAlt],
  [
    "colon-s4-liver.webp",
    "Transparent adult abdomen showing a teal colon with a gold primary tumour and a brown liver containing gold metastatic nodules",
  ],
  [
    "colon-s4-clinic.webp",
    "Adult patient in clinic with a colon-and-liver-metastasis overlay while a medical oncologist explains Stage 4 treatment",
  ],
  [
    "colon-s4-systemic.webp",
    "Adult in a chemotherapy day-care chair with a colon, liver-metastasis and peritoneal-deposit overlay used to explain systemic treatment for Stage 4 colon cancer",
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

const blurb = "metastatic disease, resectability, conversion therapy and biomarker-directed treatment.";
linkSibling(store.articles.find((row) => row.slug === "colon-cancer-surgery-in-india"), STAGE4, "Stage 4 Colon Cancer Treatment in India", blurb);
linkSibling(store.articles.find((row) => row.slug === "stage-1-colon-cancer-treatment-in-india"), STAGE4, "Stage 4 Colon Cancer Treatment in India", blurb);
linkSibling(store.articles.find((row) => row.slug === "stage-2-colon-cancer-treatment-in-india"), STAGE4, "Stage 4 Colon Cancer Treatment in India", blurb);
linkSibling(store.articles.find((row) => row.slug === "stage-3-colon-cancer-treatment-in-india"), STAGE4, "Stage 4 Colon Cancer Treatment in India", blurb);

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
if (treatment?.translations?.en?.editorialBody && !treatment.translations.en.editorialBody.includes(STAGE4)) {
  treatment.translations.en.editorialBody = treatment.translations.en.editorialBody.replace(
    "**Stage IV:** Treatment may include chemotherapy, targeted therapy, immunotherapy, surgery or ablation for selected metastatic disease, and other systemic treatments.",
    "**Stage IV:** Treatment may include chemotherapy, targeted therapy, immunotherapy, surgery or ablation for selected metastatic disease, and other systemic treatments. How resectability, conversion therapy, MSI/MMR and biomarker-directed treatment are planned is covered in [Stage 4 Colon Cancer Treatment in India](/blogs/stage-4-colon-cancer-treatment-in-india).",
  );
  writeFileSync(treatmentsPath, `${JSON.stringify(treatments, null, 2)}\n`);
  console.log("linked stage 4 blog from colon treatment editorial");
}

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes("stage-4-colon-cancer-treatment-in-india")) {
  llms = llms.replace(
    "and [stage 3 colon cancer treatment in India](https://gaf.healthcare/blogs/stage-3-colon-cancer-treatment-in-india).",
    ", [stage 3 colon cancer treatment in India](https://gaf.healthcare/blogs/stage-3-colon-cancer-treatment-in-india) and [stage 4 colon cancer treatment in India](https://gaf.healthcare/blogs/stage-4-colon-cancer-treatment-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}
