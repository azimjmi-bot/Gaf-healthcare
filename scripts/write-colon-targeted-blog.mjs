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
const TARGET_BLOG = "/blogs/colon-cancer-targeted-therapy-in-india";
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

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body">Targeted therapy uses medicines designed to interfere with specific biological pathways involved in cancer growth.</p><p class="article-quick-answer__body">In colon cancer, targeted treatment is primarily important in <strong>advanced or metastatic disease</strong>.</p><p class="article-quick-answer__body">The treatment depends on molecular testing.</p><p class="article-quick-answer__body"><strong>RAS wild-type, BRAF wild-type left-sided metastatic colon cancer</strong></p><p class="article-quick-answer__body">An anti-EGFR medicine such as:</p><ul class="article-quick-answer__list"><li>Cetuximab</li><li>Panitumumab</li></ul><p class="article-quick-answer__body">may be combined with chemotherapy in appropriate patients.</p><p class="article-quick-answer__body"><strong>RAS-mutated metastatic colon cancer</strong></p><p class="article-quick-answer__body">Anti-EGFR therapy is generally not appropriate.</p><p class="article-quick-answer__body">An anti-VEGF strategy such as <strong>bevacizumab combined with chemotherapy</strong> is commonly considered.</p><p class="article-quick-answer__body"><strong>BRAF V600E-mutated disease</strong></p><p class="article-quick-answer__body">BRAF-directed treatment can be used in appropriate treatment settings.</p><p class="article-quick-answer__body">An established approach includes:</p><p class="article-quick-answer__body"><strong>Encorafenib + cetuximab</strong></p><p class="article-quick-answer__body">with newer first-line strategies incorporating chemotherapy in selected patients.</p><p class="article-quick-answer__body"><strong>HER2-positive, RAS wild-type disease</strong></p><p class="article-quick-answer__body">HER2-directed treatments may be considered, particularly after standard chemotherapy.</p><p class="article-quick-answer__body">Options can include:</p><ul class="article-quick-answer__list"><li>Tucatinib + trastuzumab</li><li>Trastuzumab deruxtecan</li><li>Other HER2-directed strategies depending on the treatment setting</li></ul><p class="article-quick-answer__body"><strong>KRAS G12C-mutated disease</strong></p><p class="article-quick-answer__body">Selected previously treated patients may receive:</p><ul class="article-quick-answer__list"><li>Adagrasib + cetuximab</li><li>Sotorasib + panitumumab</li></ul><p class="article-quick-answer__body">depending on the clinical setting and applicable approvals.</p><p class="article-quick-answer__body"><strong>MSI-H/dMMR disease</strong></p><p class="article-quick-answer__body">Immunotherapy may be more relevant than conventional targeted therapy.</p></aside>`;

const vsChemo = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Targeted therapy</th><th>Chemotherapy</th></tr></thead><tbody><tr><td>Main principle</td><td>Targets specific biological pathways</td><td>Damages rapidly dividing cells</td></tr><tr><td>Biomarker testing</td><td>Often essential</td><td>Less dependent on a single biomarker</td></tr><tr><td>Selectivity</td><td>More molecularly specific</td><td>Broader cellular effect</td></tr><tr><td>Use in colon cancer</td><td>Mainly advanced/metastatic disease</td><td>Stage 3 and metastatic disease</td></tr><tr><td>Can be combined?</td><td>Yes</td><td>Yes</td></tr><tr><td>Side effects</td><td>Depend on target and drug</td><td>Depend on chemotherapy regimen</td></tr><tr><td>Works for everyone?</td><td>No</td><td>No</td></tr></tbody></table></div>`;

const byBiomarker = `<div class="md-body"><table><thead><tr><th>Biomarker / clinical feature</th><th>Potential targeted approach</th></tr></thead><tbody><tr><td>RAS wild-type + left-sided</td><td>Cetuximab or panitumumab + chemotherapy</td></tr><tr><td>RAS-mutated</td><td>Anti-VEGF strategy such as bevacizumab + chemotherapy</td></tr><tr><td>BRAF V600E</td><td>Encorafenib + cetuximab; selected first-line combinations may include chemotherapy</td></tr><tr><td>HER2-positive + RAS wild-type</td><td>Tucatinib + trastuzumab; other HER2-directed options</td></tr><tr><td>KRAS G12C</td><td>Adagrasib + cetuximab or sotorasib + panitumumab in appropriate later-line settings</td></tr><tr><td>Previously treated metastatic disease</td><td>Regorafenib, fruquintinib or other approved later-line therapies</td></tr><tr><td>MSI-H/dMMR</td><td>Immunotherapy is often more relevant than conventional targeted therapy</td></tr></tbody></table></div>`;

const tissueVsLiquid = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Tissue biopsy</th><th>Liquid biopsy</th></tr></thead><tbody><tr><td>Sample</td><td>Tumor tissue</td><td>Blood</td></tr><tr><td>Molecular information</td><td>Extensive</td><td>Depends on circulating tumor DNA</td></tr><tr><td>Useful when tissue unavailable</td><td>Sometimes difficult</td><td>Particularly useful</td></tr><tr><td>Can reflect evolving disease</td><td>Limited</td><td>Can capture emerging mutations</td></tr><tr><td>Common use</td><td>Initial molecular profiling</td><td>Selected advanced/refractory settings</td></tr></tbody></table></div>`;

const vsImmuno = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Targeted therapy</th><th>Immunotherapy</th></tr></thead><tbody><tr><td>Primary principle</td><td>Blocks cancer-specific pathways</td><td>Activates immune response</td></tr><tr><td>Main selection method</td><td>Molecular alteration/receptor</td><td>MSI/MMR and selected biomarkers</td></tr><tr><td>Examples</td><td>BRAF, EGFR, VEGF, HER2, KRAS G12C</td><td>Pembrolizumab, nivolumab, ipilimumab</td></tr><tr><td>Major role</td><td>Advanced/metastatic disease</td><td>Particularly MSI-H/dMMR advanced disease</td></tr><tr><td>Can be combined with chemotherapy?</td><td>Frequently</td><td>Depends on setting</td></tr><tr><td>Side effects</td><td>Drug/pathway specific</td><td>Immune-related</td></tr><tr><td>Biomarker-driven?</td><td>Yes</td><td>Yes</td></tr></tbody></table></div>`;

const costTable = `<div class="md-body"><table><thead><tr><th>Component</th><th>GAF planning range in India</th></tr></thead><tbody><tr><td><a href="${TARGETED}">Targeted therapy</a> (bevacizumab, cetuximab, BRAF/HER2/KRAS strategies)</td><td>$8,000–$30,000</td></tr><tr><td><a href="${PRECISION}">Precision oncology / RAS-BRAF-HER2-MSI testing</a></td><td>$2,000–$7,000</td></tr><tr><td><a href="${CHEMO}">Chemotherapy</a> backbone (FOLFOX, FOLFIRI, CAPOX)</td><td>$1,500–$8,000+</td></tr><tr><td><a href="${IMMUNO}">Immunotherapy</a> if the tumor is MSI-H/dMMR</td><td>$15,000–$45,000</td></tr><tr><td><a href="${COLECTOMY}">Colectomy</a></td><td>$7,000–$18,000</td></tr><tr><td><a href="${LIVER}">Liver resection</a> after conversion</td><td>$10,000–$26,000</td></tr><tr><td><a href="${HIPEC}">CRS/HIPEC</a> for selected peritoneal disease</td><td>$18,000–$40,000</td></tr><tr><td><a href="${COLONOSCOPY}">Colonoscopy</a></td><td>$200–$550</td></tr></tbody></table></div>`;

const faqs = [
  ["What is targeted therapy for colon cancer?", "Targeted therapy uses medicines designed to interfere with specific molecular pathways involved in cancer growth. In colon cancer it is primarily important in advanced or metastatic disease."],
  ["Is targeted therapy used for all colon cancer patients?", "No. It is mainly important in advanced and metastatic disease and is selected according to tumor biology and clinical circumstances."],
  ["Which targeted therapy is commonly used for colon cancer?", "Important targeted medicines include bevacizumab, cetuximab, panitumumab, encorafenib, tucatinib, trastuzumab, adagrasib, sotorasib, ramucirumab, regorafenib, fruquintinib and ziv-aflibercept. The appropriate drug depends on the patient's molecular profile and treatment line."],
  ["Is targeted therapy the same as chemotherapy?", "No. Chemotherapy broadly affects rapidly dividing cells, while targeted therapy is designed around specific molecular pathways. They are frequently used together. GAF planning ranges are $1,500–$8,000+ for chemotherapy and $8,000–$30,000 for targeted therapy."],
  ["Does targeted therapy work in Stage 3 colon cancer?", "Targeted therapy is not routinely used as postoperative treatment for all Stage 3 colon cancer patients. Its major role is in advanced or metastatic disease."],
  ["What is the most important test before targeted therapy?", "There is no single test for every targeted medicine. In metastatic colon cancer, important testing includes KRAS, NRAS, BRAF, MSI/MMR and HER2. GAF planning ranges for precision oncology are $2,000–$7,000."],
  ["Can KRAS-mutated colon cancer receive cetuximab?", "Generally, activating KRAS or NRAS mutations predict resistance to anti-EGFR antibodies, so cetuximab and panitumumab are generally not used on that basis."],
  ["Can KRAS G12C be targeted?", "Yes. Selected previously treated patients with KRAS G12C-mutated metastatic colorectal cancer may receive targeted combinations such as adagrasib plus cetuximab or sotorasib plus panitumumab."],
  ["What is BRAF-targeted therapy?", "It is treatment directed against a BRAF mutation, particularly BRAF V600E. Encorafenib combined with cetuximab is an established example."],
  ["What is HER2-targeted therapy?", "It is treatment aimed at HER2-positive cancer. Options may include tucatinib plus trastuzumab or other HER2-directed medicines in selected patients."],
  ["Can targeted therapy cure Stage 4 colon cancer?", "Targeted therapy can contribute to curative-intent treatment in selected patients whose metastatic disease can ultimately be completely removed or locally controlled. However, it cannot be described as a guaranteed cure."],
  ["Can targeted therapy shrink liver metastases?", "Yes. When combined with appropriate chemotherapy, targeted therapy may help shrink metastatic disease and, in selected patients, facilitate subsequent liver surgery. GAF planning ranges for liver resection are $10,000–$26,000."],
  ["How long does targeted therapy continue?", "It depends on the drug and treatment setting. In metastatic disease, treatment may continue until disease progression, unacceptable toxicity, completion of a planned course, or a change to another treatment."],
  ["Does targeted therapy have side effects?", "Yes. The side effects depend on the drug. EGFR inhibitors commonly cause skin toxicity, while VEGF-targeted medicines can affect blood pressure and wound healing. Severe bleeding, perforation, chest pain or sudden collapse belongs in a local emergency department."],
  ["Is targeted therapy expensive in India?", "Some targeted medicines can substantially increase treatment costs. GAF planning ranges for targeted therapy are $8,000–$30,000. The actual cost depends on the drug, dose, frequency, duration and hospital."],
  ["Can targeted therapy be given in India to international patients?", "Yes, where the relevant medicine is available and clinically appropriate. International patients should obtain a specialist treatment plan and medicine-specific quotation before travelling."],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("Colon cancer targeted therapy in India is an important part of modern treatment for **advanced and metastatic colon cancer**. Unlike conventional [chemotherapy](" + CHEMO + "), which affects rapidly dividing cells more broadly, targeted therapy is designed to interfere with specific molecules, receptors or biological pathways that help cancer cells grow, survive or spread. **Targeted therapy is not one medicine and it is not suitable for every colon cancer patient.** Treatment is selected according to the tumor's molecular profile, stage, location of the primary tumor, previous treatment, overall health and the goal of treatment."),
  p("This article is the targeted-therapy hub for the colon cluster. The broader pathway is in [Colon Cancer Treatment in India](" + PILLAR + "). How FOLFOX, CAPOX and FOLFIRI are planned as the chemotherapy backbone is in [Colon Cancer Chemotherapy in India](" + CHEMO_BLOG + "). For **MSI-H/dMMR** tumors, [Colon Cancer Immunotherapy in India](" + IMMUNO_BLOG + ") is often the more important biomarker-driven strategy. [Stage 4](" + STAGE4 + ") covers resectability and conversion. [Stage 3](" + STAGE3 + ") explains why targeted therapy is not routine after surgery. How the operation itself is planned is in [Colon Cancer Surgery in India](" + SURGERY_BLOG + "). This is **not** a rectal-cancer page: radiation has a much larger role when the tumor is rectal. See [rectal cancer surgery](" + RECTAL + ")."),
  p("GAF Healthcare planning ranges for [targeted therapy](" + TARGETED + ") are **$8,000–$30,000**. [Precision oncology / molecular testing](" + PRECISION + ") is **$2,000–$7,000**. [Chemotherapy](" + CHEMO + ") is **$1,500–$8,000+**. [Immunotherapy](" + IMMUNO + ") is **$15,000–$45,000**. These are planning ranges, not hospital quotations."),
  p("International patients comparing [medical oncologists](" + MED_DOCS + ") for biomarker-directed treatment commonly start with [Delhi NCR targeted therapy](/doctors/India/Delhi-NCR/Medical-Oncology/Targeted-Therapy), [Mumbai](/doctors/India/Mumbai/Medical-Oncology/Targeted-Therapy), [Bengaluru](/doctors/India/Bengaluru/Medical-Oncology/Targeted-Therapy), [Chennai](/doctors/India/Chennai/Medical-Oncology/Targeted-Therapy) and [Hyderabad](/doctors/India/Hyderabad/Medical-Oncology/Targeted-Therapy). Partner [medical-oncology hospitals](" + MED_HOSP + ") in [Delhi NCR](/hospitals/India/Delhi-NCR/Medical-Oncology) and [Mumbai](/hospitals/India/Mumbai/Medical-Oncology) are a typical first filter. [Surgical oncologists](" + SURG_DOCS + ") remain on the same tumour board if conversion surgery later becomes possible."),
  btn("Ask which targeted therapy matches this molecular profile", consult("Colon Cancer Targeted Therapy")),
  p("[WhatsApp +91 90443 46292 with KRAS, NRAS, BRAF, HER2 and MSI/MMR](" + wa("Please review my colon cancer KRAS, NRAS, BRAF, HER2 and MSI/MMR results and advise whether cetuximab, bevacizumab, BRAF-directed or HER2-directed therapy is appropriate in India.") + ")"),
  img(
    "/uploads/articles/colon-tt-anatomy.webp",
    "Transparent adult body with a teal colon and a gold tumour used to explain biomarker-directed colon cancer targeted therapy",
    "The same Stage 4 colon cancer can lead to completely different medicines depending on RAS, BRAF, HER2 and MSI/MMR status.",
  ),

  h2("What Is Targeted Therapy?"),
  p("Targeted therapy is a form of cancer treatment designed to interfere with specific molecules involved in cancer development. Cancer cells often acquire genetic or molecular changes that allow them to grow continuously, avoid normal growth controls, form new blood vessels, escape immune responses, invade surrounding tissues and spread to distant organs. Targeted medicines attempt to interrupt these specific processes. This is different from conventional [chemotherapy](" + CHEMO + "). Targeted therapy does not mean that side effects are absent. A targeted drug can still cause significant or even serious toxicity."),
  html(vsChemo),

  h2("Why Molecular Testing Is Essential"),
  p("Modern metastatic colon cancer treatment should not be planned from the stage alone. The same Stage 4 diagnosis can lead to completely different treatment depending on the tumor's molecular profile."),
  ul([
    "**Patient A — KRAS-mutated:** anti-EGFR therapy is generally not appropriate.",
    "**Patient B — RAS wild-type, BRAF wild-type, left-sided:** anti-EGFR therapy may be an important first-line option.",
    "**Patient C — BRAF V600E-mutated:** BRAF-directed treatment may be appropriate.",
    "**Patient D — HER2-positive, RAS wild-type:** HER2-targeted therapy may become relevant.",
    "**Patient E — MSI-H/dMMR:** [immunotherapy](" + IMMUNO_BLOG + ") may be a major treatment option.",
  ]),
  p("Current ESMO guidance recommends testing metastatic colorectal cancer for **RAS, BRAF, MSI/MMR and HER2** status, with broader genomic testing considered when appropriate. The 2025 Indian consensus recommends at least RAS, BRAF, MSI/MMR and HER2 testing for metastatic colorectal cancer when resources permit. GAF planning ranges for [precision oncology](" + PRECISION + ") are **$2,000–$7,000**."),
  btn("Ask which biomarkers to complete before first-line treatment", consult("Precision Oncology")),
  p("[WhatsApp +91 90443 46292 with the pathology and any NGS report](" + wa("Please review my colon cancer pathology and molecular report and advise whether RAS, BRAF, HER2, MSI/MMR or NGS still needs to be completed in India.") + ")"),

  h2("KRAS, NRAS and RAS Wild-Type"),
  p("KRAS and NRAS are part of the **RAS gene family**. Mutations can activate signaling pathways downstream of the EGFR receptor. If a colon cancer contains an activating RAS mutation, blocking EGFR from outside the cell may not effectively stop the downstream signal. Therefore: **RAS mutation → anti-EGFR therapy generally not appropriate**, while **RAS wild-type → anti-EGFR therapy may be considered in the appropriate clinical setting**."),
  p("Testing should include relevant exons of both KRAS and NRAS. Current ESMO guidance recommends testing exons 2, 3 and 4 of KRAS and NRAS when assessing eligibility for anti-EGFR therapy. RAS wild-type status alone does not automatically mean that cetuximab or panitumumab should be used. Doctors also consider primary tumor location, BRAF status, MSI/MMR, previous treatment, treatment objective and patient fitness. A report that simply says **\"KRAS positive\"** is not enough — the exact mutation should be documented."),

  h2("EGFR-Targeted Therapy: Cetuximab and Panitumumab"),
  p("EGFR stands for epidermal growth factor receptor. Two important EGFR-targeted antibodies are **cetuximab** and **panitumumab**. They bind to EGFR and interfere with downstream signaling. Effectiveness is strongly influenced by RAS status, BRAF status, primary tumor location and previous treatment."),
  p("For first-line treatment, the strongest evidence is in **RAS wild-type, BRAF wild-type, left-sided metastatic colon cancer**, where cetuximab or panitumumab can be combined with chemotherapy. If the RAS pathway is already activated by a mutation, blocking EGFR may not shut down the signaling pathway: **KRAS/NRAS mutation → likely resistance to anti-EGFR therapy**."),
  p("Primary tumor location matters. For many **right-sided** metastatic tumors, an anti-VEGF strategy is preferred in the first-line setting. The 2026 ESMO guideline continues to emphasize this distinction."),
  img(
    "/uploads/articles/colon-tt-clinic.webp",
    "Adult patient in clinic with a colon-and-liver overlay while a medical oncologist explains RAS, BRAF and HER2 targeted therapy",
    "Ask for the exact KRAS mutation, sidedness, BRAF and HER2 result — not only whether \"targeted therapy is available.\"",
  ),

  h2("Anti-VEGF Therapy: Bevacizumab, Ramucirumab and Ziv-Aflibercept"),
  p("VEGF stands for vascular endothelial growth factor. Tumors can stimulate angiogenesis — new blood vessels — to obtain oxygen and nutrients. Blocking VEGF signaling can interfere with tumor blood-vessel formation."),
  p("**Bevacizumab** is a monoclonal antibody that targets VEGF-A and is one of the most widely used targeted therapies in metastatic colorectal cancer. It can be combined with FOLFOX, FOLFIRI, CAPOX or FOLFOXIRI depending on the setting. The 2025 Indian consensus identifies bevacizumab as a major option and notes that its benefit is **not restricted to one particular RAS subgroup**. Important potential adverse effects include high blood pressure, protein in urine, bleeding, blood clots, delayed wound healing, gastrointestinal perforation and rare serious complications. This is particularly important around major surgery."),
  p("**Ramucirumab** targets the VEGF receptor rather than VEGF itself. It is commonly used with FOLFIRI in selected patients who have progressed after oxaliplatin-based treatment and bevacizumab-containing therapy — generally a later-line rather than a first-line treatment. **Ziv-aflibercept** acts as a VEGF trap and may be combined with FOLFIRI after progression on an oxaliplatin-containing regimen. Availability varies between institutions."),
  btn("Ask whether bevacizumab or an anti-EGFR antibody should be added to chemotherapy", consult("Targeted Therapy")),

  h2("BRAF V600E-Directed Treatment"),
  p("The **BRAF V600E** mutation is the most clinically important BRAF alteration in metastatic colorectal cancer. It occurs in a minority of metastatic colorectal cancers and is associated with a distinct tumor biology. One established targeted approach is **encorafenib + cetuximab**. Encorafenib blocks BRAF signaling; cetuximab blocks EGFR. The combination attacks the pathway at two points because blocking BRAF alone may lead to activation of alternative signaling pathways."),
  p("The BEACON CRC trial established the importance of BRAF-targeted therapy in previously treated BRAF V600E metastatic colorectal cancer. The 2025 Indian consensus recognizes encorafenib plus cetuximab as an important option for chemotherapy-refractory BRAF-mutated metastatic colorectal cancer, although access to encorafenib can be a practical consideration in India."),
  p("Treatment continues to evolve. The BREAKWATER study supported **encorafenib + cetuximab + modified FOLFOX6** in previously untreated BRAF V600E metastatic colorectal cancer, leading to an FDA approval in December 2024. This represents an important shift from reserving BRAF-targeted therapy only for later lines. The exact availability and regulatory status of this approach in India should be confirmed with the treating cancer center."),

  h2("HER2-Directed Treatment"),
  p("Some colorectal cancers have HER2 amplification or overexpression. HER2-positive metastatic colorectal cancer is a relatively small subgroup, more commonly seen in left-sided, RAS wild-type tumors. Potential approaches include **tucatinib + trastuzumab**, **trastuzumab deruxtecan**, trastuzumab-based combinations and other HER2-directed strategies. The 2025 Indian consensus recognizes several HER2-directed approaches for HER2-positive metastatic colorectal cancer."),
  p("The MOUNTAINEER study formed the basis for FDA accelerated approval of tucatinib plus trastuzumab in previously treated HER2-positive, RAS wild-type metastatic colorectal cancer. Current ESMO guidance also identifies tucatinib–trastuzumab as an option after prior fluoropyrimidine, oxaliplatin and irinotecan. Trastuzumab deruxtecan is an antibody-drug conjugate; a major safety concern is **interstitial lung disease/pneumonitis**, which requires careful monitoring."),

  h2("KRAS G12C-Directed Treatment"),
  p("KRAS G12C is a specific mutation found in a small subset of metastatic colorectal cancers. Not all KRAS mutations can currently be targeted with the same medicines — G12C, G12D, G12V and other KRAS mutations are biologically different. Two important strategies in previously treated metastatic disease are **adagrasib + cetuximab** and **sotorasib + panitumumab**."),
  p("The FDA approved adagrasib plus cetuximab for KRAS G12C-mutated locally advanced or metastatic colorectal cancer after prior fluoropyrimidine-, oxaliplatin- and irinotecan-containing chemotherapy. The CodeBreaK 300 study supported sotorasib plus panitumumab, and the FDA granted approval for this combination in previously treated KRAS G12C-mutated advanced colorectal cancer. Investigational KRAS G12D/G12V approaches, SHP2 inhibitors and other combinations may be available through clinical trials rather than routine standard treatment."),
  html(byBiomarker),
  p("This table is a treatment-orientation framework, not a prescription."),

  h2("Later-Line Medicines, Rechallenge and ctDNA"),
  p("**Regorafenib** is an oral multikinase inhibitor used in previously treated metastatic colorectal cancer. Side effects can include hand-foot skin reaction, fatigue, diarrhea, high blood pressure, reduced appetite and liver toxicity. Dose-escalation strategies may be considered to improve tolerability. **Fruquintinib** is an oral selective VEGFR inhibitor for previously treated metastatic colorectal cancer after specified standard therapies. The choice between fruquintinib, regorafenib, trifluridine/tipiracil-based treatment and biomarker-specific therapy depends on previous treatment history and molecular profile."),
  p("Some patients previously respond to cetuximab or panitumumab and later develop resistance. In certain cases, a **liquid biopsy (ctDNA)** can determine whether resistant RAS, BRAF or EGFR alterations remain detectable. If the molecular profile becomes favorable again, an anti-EGFR **rechallenge** may be considered. This is a specialized strategy, not appropriate for every patient. Current ESMO guidance recognizes ctDNA-guided anti-EGFR rechallenge as a potential option for carefully selected patients, and ctDNA testing when rapid molecular results are clinically important or tissue testing is not possible."),
  html(tissueVsLiquid),
  p("**Next-generation sequencing (NGS)** can evaluate multiple genes simultaneously — KRAS, NRAS, BRAF, HER2-related alterations, NTRK fusions, RET fusions, POLE/POLD1 and other potentially actionable alterations. It should not be ordered simply because it sounds more advanced. The 2025 Indian consensus notes that NGS can identify additional alterations but does not necessarily need to replace established initial biomarker testing in every patient."),

  h2("Conversion Therapy, Liver, Lung and Peritoneal Disease"),
  p("Targeted therapy can be incorporated into **conversion therapy**: unresectable metastatic disease → systemic treatment plus appropriate targeted therapy → tumor shrinkage → reassessment → potential surgery or ablation. This is particularly important when [liver](" + LIVER + ") (**$10,000–$26,000**) or lung metastases may become technically removable. See [Stage 4 colon cancer treatment](" + STAGE4 + ")."),
  img(
    "/uploads/articles/colon-tt-liver.webp",
    "Transparent adult abdomen showing a teal colon, a gold colon tumour and gold liver metastases used to explain conversion targeted therapy",
    "If liver metastases shrink on chemotherapy plus a matched targeted medicine, the tumour board may reassess resectability.",
  ),
  p("Limited lung metastases may combine systemic targeted treatment with surgery, ablation or [SBRT](" + SBRT + "). Peritoneal disease may still need specialist assessment for [cytoreductive surgery with HIPEC](" + HIPEC + ") (**$18,000–$40,000**). Targeted therapy does not replace that surgical assessment. Targeted therapy can contribute to a curative-intent strategy in selected patients when metastatic disease becomes completely treatable with surgery or local therapy. It should not be described as a guaranteed cure."),

  h2("Side Effects and When to Seek Emergency Care"),
  p("**Anti-EGFR therapy** (cetuximab, panitumumab) commonly causes acne-like rash, dry skin, itching, nail changes, skin infections, diarrhea and infusion reactions. Patients should not deliberately try to develop a rash as proof that treatment is working. **Bevacizumab** can cause high blood pressure, proteinuria, bleeding, thromboembolic events, delayed wound healing and gastrointestinal perforation — blood pressure and urine protein are commonly monitored, and the surgical team must know if bevacizumab was recently given."),
  p("**Encorafenib-based treatment** can cause fatigue, nausea, diarrhea, abdominal pain, skin problems, muscle or joint symptoms and liver-function abnormalities, plus EGFR-related skin toxicity when combined with cetuximab. **Trastuzumab** may affect heart function. **Tucatinib** may cause diarrhea and liver-function abnormalities. **Trastuzumab deruxtecan** can cause nausea, low blood counts, fatigue and interstitial lung disease/pneumonitis. KRAS G12C combinations, regorafenib and fruquintinib have their own gastrointestinal, skin, blood-pressure and liver profiles."),
  p("**Severe bleeding, sudden severe abdominal pain suggesting perforation, chest pain, new breathlessness, a serious infusion reaction, fainting or collapse belongs in a local emergency department — not a delayed WhatsApp message.** Patients should never stop a targeted medicine around surgery without speaking to both the oncologist and the surgeon."),
  img(
    "/uploads/articles/colon-tt-infusion.webp",
    "Adult in a day-care infusion chair with a colon-and-tumour overlay used to explain bevacizumab or cetuximab targeted therapy",
    "Most monoclonal-antibody targeted therapies are given in outpatient daycare, often on the same day as the chemotherapy backbone.",
  ),
  html(vsImmuno),
  p("A patient may receive both targeted therapy and [immunotherapy](" + IMMUNO_BLOG + ") at different stages, but they are not interchangeable. For MSI-H/dMMR metastatic disease, immunotherapy is often the first biomarker-driven choice."),

  h2("Colon Cancer Targeted Therapy Cost in India"),
  p("There is **no single price** for targeted therapy because the drug, dose, duration, combination chemotherapy, hospital, manufacturer, molecular testing, cycles, supportive care, imaging and toxicity management all change the total. A targeted medicine can substantially increase the cost of metastatic colon cancer treatment compared with chemotherapy alone. GAF Healthcare publishes USD planning ranges compiled from partner hospital cost sheets. They are not hospital quotations."),
  html(costTable),
  p("The cost difference between **chemotherapy + bevacizumab** and **chemotherapy + a rare molecularly targeted medicine** can be substantial. Brand versus biosimilar, treatment duration until progression, and whether NGS is added all matter. City pages such as [Delhi NCR targeted therapy](/costs/India/Delhi-NCR/Medical-Oncology/Targeted-Therapy), [Mumbai](/costs/India/Mumbai/Medical-Oncology/Targeted-Therapy), [Bengaluru](/costs/India/Bengaluru/Medical-Oncology/Targeted-Therapy), [Chennai](/costs/India/Chennai/Medical-Oncology/Targeted-Therapy) and [Hyderabad](/costs/India/Hyderabad/Medical-Oncology/Targeted-Therapy) use the same national range unless a hospital issues a verified quotation."),
  btn("Ask for an itemised targeted-therapy quotation", consult("Colon Cancer Targeted Therapy Cost")),
  p("[WhatsApp +91 90443 46292 for a drug-specific estimate](" + wa("Please send an itemised colon cancer targeted therapy quotation in India naming bevacizumab, cetuximab or the biomarker-matched medicine, cycles, infusion charges, labs and the chemotherapy backbone.") + ")"),

  h2("How to Choose a Hospital and What International Patients Should Bring"),
  p("A hospital should not be selected simply because it advertises \"targeted therapy.\" Look for molecular pathology able to perform RAS, BRAF, MSI/MMR, HER2 and NGS where appropriate; medical oncology experienced in colorectal cancer, multiple treatment lines and clinical trials; colorectal and hepatobiliary surgery if disease may be resectable; interventional radiology; radiation oncology for selected SBRT; and a multidisciplinary tumour board."),
  ul([
    "[Medical oncology hospitals in Delhi NCR](/hospitals/India/Delhi-NCR/Medical-Oncology)",
    "[Medical oncology hospitals in Mumbai](/hospitals/India/Mumbai/Medical-Oncology)",
    "[Medical oncology hospitals in Bengaluru](/hospitals/India/Bengaluru/Medical-Oncology)",
    "[Medical oncology hospitals in Chennai](/hospitals/India/Chennai/Medical-Oncology)",
    "[Medical oncology hospitals in Hyderabad](/hospitals/India/Hyderabad/Medical-Oncology)",
  ]),
  p("International patients should send colonoscopy, biopsy, histopathology, CT/MRI/PET, CEA, previous chemotherapy and surgery reports, MSI/MMR, KRAS/NRAS, BRAF, HER2 and any NGS reports before travelling. Bring the passport, pathology slides and blocks, medication list and discharge summaries. For long-term treatment, subsequent cycles may sometimes be coordinated with a local oncologist."),
  ol([
    "What is my KRAS, NRAS, BRAF (including V600E), HER2 and MSI/MMR status, and do I have KRAS G12C?",
    "Is the primary tumor right-sided or left-sided, and why is this targeted drug being recommended?",
    "Will it be combined with FOLFOX or FOLFIRI, and is treatment intended to shrink disease for surgery?",
    "When will scans be repeated, and what side effects — including wound healing around bevacizumab — should I expect?",
    "Do I need NGS or ctDNA, and are biomarker-specific clinical trials available?",
    "Is a biosimilar option available, what is the cost per cycle, and can later cycles continue in my home country?",
  ]),

  h2("Targeted Therapy Treatment Pathway"),
  ol([
    "Confirm colon cancer with colonoscopy, biopsy and histopathology.",
    "Stage the cancer with CT/MRI and other appropriate imaging.",
    "If disease is metastatic, complete KRAS, NRAS, BRAF, MSI/MMR, HER2 and other actionable genes when appropriate.",
    "Determine whether the goal is curative-intent metastatic treatment or disease control.",
    "Select systemic treatment — chemotherapy plus anti-EGFR for RAS/BRAF wild-type left-sided disease; chemotherapy plus anti-VEGF for RAS-mutated disease; BRAF-, HER2- or KRAS G12C-directed treatment in the matching subgroups; immunotherapy for MSI-H/dMMR disease.",
    "Reassess with CT/MRI, clinical assessment and CEA where appropriate.",
    "Consider local treatment (surgery, ablation, SBRT) if disease becomes resectable.",
    "Continue or change systemic therapy based on response, progression, toxicity and molecular evolution.",
  ]),

  h2("The Bottom Line"),
  p("Targeted therapy is a major part of modern metastatic colon cancer treatment, but it is not a single drug. **Molecular testing determines which medicines may be useful.** KRAS and NRAS status are critical before anti-EGFR therapy. BRAF V600E, HER2 and KRAS G12C identify further actionable subgroups. Bevacizumab is an important anti-VEGF option across RAS subgroups. MSI-H/dMMR tumors usually need an immunotherapy pathway rather than conventional targeted therapy. Targeted therapy can be combined with chemotherapy and used during conversion treatment. It can have significant side effects and requires specialist monitoring. A patient-specific quotation should always be obtained before planning travel."),

  h2("Frequently Asked Questions"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Related Colon Cancer Resources"),
  ul([
    "[Colon Cancer Treatment in India](" + PILLAR + ") — stage, molecular tests and where targeted therapy sits in the pathway.",
    "[Colon Cancer Chemotherapy in India](" + CHEMO_BLOG + ") — FOLFOX, CAPOX, FOLFIRI and when a biologic is added.",
    "[Colon Cancer Immunotherapy in India](" + IMMUNO_BLOG + ") — MSI-H/dMMR checkpoint inhibitors when immunotherapy comes first.",
    "[Stage 4 Colon Cancer Treatment in India](" + STAGE4 + ") — metastatic resectability, conversion therapy and later lines.",
    "[Stage 3 Colon Cancer Treatment in India](" + STAGE3 + ") — why targeted therapy is not routine adjuvant treatment.",
    "[Stage 2 Colon Cancer Treatment in India](" + STAGE2 + ") and [Stage 1 Colon Cancer Treatment in India](" + STAGE1 + ") — surgery-first pathways.",
    "[Colon Cancer Surgery in India](" + SURGERY_BLOG + ") — hemicolectomy, anastomosis and recovery.",
    "[Targeted therapy cost in India](" + TARGETED + ") — GAF planning range $8,000–$30,000.",
    "[Precision oncology](" + PRECISION + ") — RAS, BRAF, HER2 and MSI/MMR testing ($2,000–$7,000).",
    "[Rectal cancer surgery](" + RECTAL + ") — a different pathway when radiation may be part of treatment.",
    "[Breast cancer treatment in India](" + BREAST + ") and [prostate cancer treatment in India](" + PROSTATE + ") — other GAF cancer pathways.",
  ]),

  h2("How GAF Healthcare Can Help"),
  p("GAF Healthcare coordinates international patients who need a colon cancer targeted-therapy opinion in India — after a RAS or BRAF result, a question about cetuximab versus bevacizumab, or a Stage 4 plan that may later include liver surgery. Share the colonoscopy PDF, the **complete pathology report**, KRAS/NRAS, BRAF, HER2, MSI/MMR, CT/MRI, CEA and previous treatment records. A coordinator can introduce a [medical oncologist](" + MED_DOCS + ") and, when conversion surgery is possible, a [surgical oncologist](" + SURG_DOCS + "), then help collect an itemised quotation naming the targeted drug, chemotherapy backbone, cycles and monitoring."),
  btn("Share records for a targeted-therapy review", consult("Colon Cancer Targeted Therapy")),
  p("[WhatsApp +91 90443 46292 with molecular reports, imaging and previous treatments](" + wa("I would like to share my colon cancer RAS, BRAF, HER2 and MSI/MMR reports, imaging and previous treatment records for a targeted-therapy second opinion in India.") + ")"),

  h2("Medical Disclaimer"),
  p("This article is intended for educational and medical-tourism information only. It does not replace consultation with a qualified medical oncologist, colorectal surgeon, molecular pathologist or multidisciplinary cancer team. Targeted treatment should be selected only after reviewing the patient's pathology, molecular profile, imaging, previous treatment, general health and applicable treatment approvals. Patients should not start, stop or change cancer treatment without discussing it with their treating doctor."),

  h2("Top 10 Sources"),
  p("1. [ESMO — Gastrointestinal cancer guidelines](https://www.esmo.org/guidelines/guidelines-by-topic/esmo-clinical-practice-guidelines-gastrointestinal-cancers) — RAS, BRAF, MSI/MMR and HER2 testing; sidedness and anti-EGFR versus anti-VEGF choices."),
  p("2. [NCI — Colon Cancer Treatment (PDQ®)](https://www.cancer.gov/types/colorectal/hp/colon-treatment-pdq) — systemic options by stage, including targeted therapy in metastatic disease."),
  p("3. [NCI — drugs approved for colon and rectal cancer](https://www.cancer.gov/about-cancer/treatment/drugs/colon) — bevacizumab, cetuximab, panitumumab, ramucirumab, regorafenib, fruquintinib and related medicines."),
  p("4. [2025 Indian consensus statements for advanced/metastatic colorectal cancer](https://www.thieme-connect.de/products/ejournals/html/10.1055/s-0045-1809380) — RAS, BRAF, MSI/MMR and HER2 testing; bevacizumab, encorafenib and HER2-directed options in Indian practice."),
  p("5. [ASCO — Gastrointestinal cancer guidelines](https://www.asco.org/practice-patients/guidelines/gastrointestinal-cancer) — treatment of metastatic colorectal cancer."),
  p("6. [U.S. FDA — encorafenib, cetuximab and mFOLFOX6 for untreated BRAF V600E metastatic colorectal cancer](https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-encorafenib-cetuximab-and-mfolfox6-untreated-metastatic-colorectal-cancer-braf-v600e) — BREAKWATER first-line BRAF-directed combination."),
  p("7. [U.S. FDA — tucatinib with trastuzumab for HER2-positive colorectal cancer](https://www.fda.gov/drugs/resources-information-approved-drugs/fda-grants-accelerated-approval-tucatinib-trastuzumab-colorectal-cancer) — MOUNTAINEER later-line HER2-directed treatment."),
  p("8. [U.S. FDA — adagrasib with cetuximab for KRAS G12C-mutated colorectal cancer](https://www.fda.gov/drugs/resources-information-approved-drugs/fda-grants-accelerated-approval-adagrasib-cetuximab-kras-g12c-mutated-colorectal-cancer) — previously treated KRAS G12C disease."),
  p("9. [U.S. FDA — sotorasib with panitumumab for KRAS G12C-mutated colorectal cancer](https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-sotorasib-panitumumab-kras-g12c-mutated-colorectal-cancer) — CodeBreaK 300 combination approval."),
  p("10. [U.S. FDA — fruquintinib for refractory metastatic colorectal cancer](https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-fruquintinib-refractory-metastatic-colorectal-cancer) — later-line VEGFR inhibition after standard therapies."),
  p("**Last reviewed against the cited sources: September 2026.**"),
];

const now = "2026-09-28T21:00:00.000Z";
const SLUG = "colon-cancer-targeted-therapy-in-india";

const article = {
  id: "art_colon_cancer_targeted_therapy_in_india",
  slug: SLUG,
  title: "Colon Cancer Targeted Therapy in India: RAS, BRAF, HER2 and EGFR",
  excerpt:
    "When colon cancer targeted therapy is appropriate: RAS, BRAF V600E, HER2, KRAS G12C, cetuximab, bevacizumab, later-line options and GAF planning ranges.",
  date: "28 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Medical Oncology",
  tags: ["colon cancer", "targeted therapy", "KRAS", "BRAF", "cetuximab", "India"],
  image: "/uploads/articles/colon-tt-anatomy.webp",
  imageAlt:
    "Transparent adult body with a teal colon and a gold tumour used to explain biomarker-directed colon cancer targeted therapy",
  status: "published",
  featured: true,
  seoTitle: "Colon Cancer Targeted Therapy in India: RAS, BRAF, HER2 and EGFR",
  seoDescription:
    "Colon cancer targeted therapy in India: RAS, BRAF V600E, HER2, KRAS G12C, cetuximab, bevacizumab, later-line options and GAF USD planning ranges.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/colon-tt-anatomy.webp",
  allowIndex: true,
  keywords: [
    "colon cancer targeted therapy in India",
    "KRAS NRAS cetuximab panitumumab",
    "bevacizumab colon cancer",
    "BRAF V600E encorafenib",
    "HER2 tucatinib trastuzumab",
    "KRAS G12C adagrasib sotorasib",
    "colon cancer targeted therapy cost in India",
    "RAS wild-type left-sided colon cancer",
    "regorafenib fruquintinib",
  ],
  relatedLinks: [
    { label: "Colon Cancer Treatment in India", href: PILLAR },
    { label: "Colon Cancer Chemotherapy in India", href: CHEMO_BLOG },
    { label: "Colon Cancer Immunotherapy in India", href: IMMUNO_BLOG },
    { label: "Stage 4 Colon Cancer Treatment in India", href: STAGE4 },
    { label: "Targeted therapy cost in India", href: TARGETED },
  ],
  blocks,
};

if (!store.categories.includes("Medical Oncology")) store.categories.push("Medical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["colon-tt-anatomy.webp", article.imageAlt],
  [
    "colon-tt-liver.webp",
    "Transparent adult abdomen showing a teal colon, a gold colon tumour and gold liver metastases used to explain conversion targeted therapy",
  ],
  [
    "colon-tt-infusion.webp",
    "Adult in a day-care infusion chair with a colon-and-tumour overlay used to explain bevacizumab or cetuximab targeted therapy",
  ],
  [
    "colon-tt-clinic.webp",
    "Adult patient in clinic with a colon-and-liver overlay while a medical oncologist explains RAS, BRAF and HER2 targeted therapy",
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
  "RAS, BRAF V600E, HER2, KRAS G12C, cetuximab, bevacizumab and later-line options.";
for (const slug of [
  "colon-cancer-surgery-in-india",
  "stage-1-colon-cancer-treatment-in-india",
  "stage-2-colon-cancer-treatment-in-india",
  "stage-3-colon-cancer-treatment-in-india",
  "stage-4-colon-cancer-treatment-in-india",
  "colon-cancer-chemotherapy-in-india",
  "colon-cancer-immunotherapy-in-india",
]) {
  linkSibling(store.articles.find((row) => row.slug === slug), TARGET_BLOG, "Colon Cancer Targeted Therapy in India", blurb);
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
if (treatment?.translations?.en?.editorialBody && !treatment.translations.en.editorialBody.includes(TARGET_BLOG)) {
  treatment.translations.en.editorialBody = treatment.translations.en.editorialBody.replace(
    "HER2 amplification or overexpression can be relevant in a subset of metastatic colorectal cancers and may create additional targeted-treatment options.",
    "HER2 amplification or overexpression can be relevant in a subset of metastatic colorectal cancers and may create additional targeted-treatment options. How cetuximab, panitumumab, bevacizumab, encorafenib and HER2- or KRAS G12C-directed medicines are selected is covered in [Colon Cancer Targeted Therapy in India](/blogs/colon-cancer-targeted-therapy-in-india).",
  );
  writeFileSync(treatmentsPath, `${JSON.stringify(treatments, null, 2)}\n`);
  console.log("linked targeted-therapy blog from colon treatment editorial");
}

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes("colon-cancer-targeted-therapy-in-india")) {
  llms = llms.replace(
    "and [colon cancer immunotherapy in India](https://gaf.healthcare/blogs/colon-cancer-immunotherapy-in-india).",
    ", [colon cancer immunotherapy in India](https://gaf.healthcare/blogs/colon-cancer-immunotherapy-in-india) and [colon cancer targeted therapy in India](https://gaf.healthcare/blogs/colon-cancer-targeted-therapy-in-india).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}
