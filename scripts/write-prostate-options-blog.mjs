import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const PILLAR = "/treatments/prostate-cancer-treatment-in-india";
const RP_COST = "/costs/India/Surgical-Oncology/Radical-Prostatectomy";
const RP_DOCTORS = "/doctors/India/Surgical-Oncology/Radical-Prostatectomy";
const RP_HOSP = "/hospitals/India/Surgical-Oncology/Radical-Prostatectomy";
const EBRT = "/costs/India/Radiation-Oncology/EBRT";
const IMRT = "/costs/India/Radiation-Oncology/IMRT";
const IGRT = "/costs/India/Radiation-Oncology/IGRT";
const SBRT = "/costs/India/Radiation-Oncology/SBRT";
const BRACHY = "/costs/India/Radiation-Oncology/Brachytherapy";
const HT = "/costs/India/Medical-Oncology/Hormone-Therapy";
const CHEMO = "/costs/India/Medical-Oncology/Chemotherapy";
const TARGET = "/costs/India/Medical-Oncology/Targeted-Therapy";
const IMMUNO = "/costs/India/Medical-Oncology/Immunotherapy";
const RAD_DOCS = "/doctors/India/Radiation-Oncology";
const MED_DOCS = "/doctors/India/Medical-Oncology";
const URO_DOCS = "/doctors/India/Urology";

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

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body"><strong>What are the main treatment options for prostate cancer?</strong></p><p class="article-quick-answer__body">The main options include:</p><ul class="article-quick-answer__list"><li>Active surveillance</li><li>Watchful waiting</li><li>Radical prostatectomy</li><li>Robotic-assisted prostatectomy</li><li>External-beam radiation therapy</li><li>Brachytherapy</li><li>Hormone therapy or androgen deprivation therapy (ADT)</li><li>Chemotherapy</li><li>Targeted therapy</li><li>Immunotherapy in selected cases</li><li>PSMA-targeted radiopharmaceutical treatment</li><li>Focal treatments such as HIFU or cryotherapy in selected circumstances</li></ul><p class="article-quick-answer__body">For <strong>low-risk localised prostate cancer</strong>, active surveillance is often an important option. For selected localised cancers, surgery or radiation can be used with curative intent. Higher-risk or locally advanced disease may require combinations of local treatment and hormone therapy. Metastatic prostate cancer is generally managed with systemic treatment, sometimes combined with radiation or other therapies.</p></aside>`;

const stageTable = `<div class="md-body"><table><thead><tr><th>Stage</th><th>General disease pattern</th><th>Possible treatment approaches</th></tr></thead><tbody><tr><td>Stage I</td><td>Low-volume, localised disease</td><td>Active surveillance, surgery or radiation in selected patients</td></tr><tr><td>Stage II</td><td>Localised but with varying risk</td><td>Surveillance in selected cases, surgery, radiation or brachytherapy</td></tr><tr><td>Stage III</td><td>Higher-risk or locally advanced disease</td><td>Surgery in selected cases, radiation + hormone therapy, systemic treatment</td></tr><tr><td>Stage IV</td><td>Regional-node or distant metastatic disease</td><td>Systemic treatment, radiation and selected surgery/supportive treatments</td></tr></tbody></table></div>`;

const vsTable = `<div class="md-body"><table><thead><tr><th>Factor</th><th>Surgery</th><th>Radiation</th></tr></thead><tbody><tr><td>Main treatment</td><td>Removes prostate</td><td>Destroys cancer cells with radiation</td></tr><tr><td>Common use</td><td>Selected localised/locally advanced disease</td><td>Localised and selected higher-risk disease</td></tr><tr><td>Hospitalisation</td><td>Usually required</td><td>Often outpatient</td></tr><tr><td>Urinary effects</td><td>Incontinence can occur</td><td>Frequency/irritation can occur</td></tr><tr><td>Sexual effects</td><td>Erectile dysfunction can occur</td><td>Erectile dysfunction may develop over time</td></tr><tr><td>Bowel effects</td><td>Usually less prominent</td><td>Bowel/rectal effects can occur</td></tr><tr><td>PSA behaviour</td><td>Usually falls to very low levels</td><td>Declines gradually</td></tr><tr><td>Additional treatment</td><td>May be needed depending on pathology/recurrence</td><td>Hormone therapy may be added depending on risk</td></tr></tbody></table></div>`;

const faqs = [
  [
    "What is the most common treatment for prostate cancer?",
    "There is no single treatment used for every patient. Treatment depends on the cancer's risk group and stage. Active surveillance, surgery and radiation are important options for selected localised cancers, while systemic treatments become increasingly important in advanced disease.",
  ],
  [
    "Is surgery always necessary for prostate cancer?",
    "No. Some low-risk cancers can be managed with active surveillance, while radiation and other treatments may be appropriate for selected patients.",
  ],
  [
    "Is robotic surgery better than radiation?",
    "They are different treatment approaches and are suitable for different clinical situations. For selected localised cancers, both surgery and radiation can be used with curative intent. The decision should consider cancer risk, health, life expectancy and potential side effects.",
  ],
  [
    "Can prostate cancer be treated without removing the prostate?",
    "Yes. Treatment options can include active surveillance, radiation therapy, brachytherapy and, in selected advanced cases, systemic treatment.",
  ],
  [
    "What treatment is used for metastatic prostate cancer?",
    "Treatment generally involves systemic therapy. Depending on the disease, this may include ADT, androgen-receptor pathway inhibitors, chemotherapy, targeted therapy and selected radiopharmaceutical treatments.",
  ],
  [
    "What is the role of hormone therapy?",
    "Hormone therapy reduces androgen stimulation of prostate cancer cells. It may be used alone in selected circumstances or combined with radiation and other systemic treatments.",
  ],
  [
    "What is PSMA therapy?",
    "PSMA-targeted radiopharmaceutical therapy uses a molecule that targets PSMA-expressing prostate cancer cells and carries a radioactive substance to them.",
  ],
  [
    "Is HIFU a standard treatment for prostate cancer?",
    "HIFU and other focal treatments may be considered in selected circumstances, but they are not established as a universal replacement for surgery or radiation. Current EAU guidance recommends caution and restricts some focal treatment approaches to clinical trials or registries.",
  ],
  [
    "Can prostate cancer return after treatment?",
    "Yes. Some patients experience biochemical or clinical recurrence after treatment. PSA monitoring and appropriate imaging help identify recurrence and guide further treatment.",
  ],
  [
    "How long does prostate cancer treatment take?",
    "It depends on the treatment. Surgery is generally completed during a hospital admission, while radiation can involve multiple treatment sessions. Hormone therapy and systemic treatment may continue for months or longer.",
  ],
  [
    "Can a second opinion help?",
    "A second opinion can be particularly useful when major treatment choices are involved, such as deciding between surgery and radiation or planning treatment for high-risk, recurrent or metastatic disease. A second opinion is more useful when the specialist can review the actual pathology and imaging rather than only a written diagnosis.",
  ],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("A diagnosis of prostate cancer does not automatically mean that surgery is required."),
  p("Treatment can range from **active surveillance for selected low-risk cancers** to [surgery](" + RP_COST + "), [radiation therapy](" + EBRT + "), [hormone therapy](" + HT + "), [chemotherapy](" + CHEMO + "), [targeted treatment](" + TARGET + ") or radiopharmaceutical therapy for more advanced disease. Some patients need only one treatment, while others require a combination of treatments."),
  p("The right approach depends on several factors, including the **stage of prostate cancer, PSA level, Gleason score, Grade Group, MRI findings, whether the cancer has spread, age, overall health, life expectancy and the patient's priorities**."),
  p("For this reason, there is no single \"best prostate cancer treatment\" that applies to every patient. This guide sits beside the [Prostate Cancer Treatment in India](" + PILLAR + ") pathway, the [treatment-without-surgery guide](/blogs/prostate-cancer-treatment-without-surgery) and the city directories for [Delhi NCR](/doctors/India/Delhi-NCR), [Mumbai](/doctors/India/Mumbai), [Bengaluru](/doctors/India/Bengaluru), [Chennai](/doctors/India/Chennai) and [Hyderabad](/doctors/India/Hyderabad)."),
  btn("Ask GAF about a prostate cancer treatment plan", consult("Prostate Cancer Treatment in India")),
  p("[WhatsApp +91 90443 46292 with your PSA, biopsy and MRI](" + wa("Please review my PSA, biopsy and MRI and advise on prostate cancer treatment options in India.") + ")"),
  img(
    "/uploads/articles/pca-options-categories.webp",
    "Transparent male body highlighting the prostate in the pelvis as the starting point for treatment planning",
    "Treatment is chosen after doctors know where the cancer is and how aggressive it looks — not from the word prostate cancer alone.",
  ),

  h2("How Is Prostate Cancer Treatment Decided?"),
  p("The treatment decision usually starts with one question:"),
  p("**Where is the cancer, and how aggressive is it?**"),
  p("Doctors then combine information from the patient's:"),
  ul([
    "PSA blood test",
    "Prostate biopsy",
    "Gleason score",
    "Grade Group",
    "MRI",
    "Clinical stage",
    "Lymph-node assessment",
    "Metastatic imaging when appropriate",
    "General health",
    "Life expectancy",
    "Urinary function",
    "Sexual function",
    "Previous treatments",
  ]),
  p("Stage is important, but it is not the only factor."),
  p("Two men with the same stage can receive different treatments because their Grade Group, PSA, age, health and personal circumstances may differ. The American Cancer Society also notes that treatment decisions for prostate cancer are influenced by risk group, age, overall health, life expectancy and personal preferences."),

  h2("Understanding the Main Prostate Cancer Treatment Categories"),
  p("A useful way to understand prostate cancer treatment is to divide it into four broad groups."),
  h3("1. Monitoring"),
  p("Used for selected cancers that may not need immediate treatment."),
  p("**Examples:** active surveillance and watchful waiting."),
  h3("2. Local treatment"),
  p("Designed to treat cancer in and around the prostate."),
  p("**Examples:** [radical prostatectomy](" + RP_DOCTORS + "), [radiation therapy](" + RAD_DOCS + "), [brachytherapy](" + BRACHY + ") and selected focal treatments."),
  h3("3. Systemic treatment"),
  p("Medicines travel through the body and are used when cancer may be outside the prostate or when systemic treatment is otherwise appropriate."),
  p("**Examples:** [hormone therapy](" + HT + "), [chemotherapy](" + CHEMO + "), [targeted therapy](" + TARGET + ") and selected [immunotherapy](" + IMMUNO + ")."),
  h3("4. Radiopharmaceutical treatment"),
  p("These treatments use radioactive substances linked to molecules that target cancer cells or their environment."),
  p("**Example:** lutetium-177 PSMA therapy in selected advanced prostate cancers, discussed on the [India treatment page](" + PILLAR + ")."),

  h2("1. Active Surveillance"),
  p("Active surveillance is one of the most important treatment approaches for selected men with low-risk prostate cancer."),
  p("It does **not** mean ignoring the cancer."),
  p("Instead, the cancer is monitored closely, with treatment started if there are signs that the disease is becoming more aggressive or clinically significant."),
  p("Monitoring may include:"),
  ul([
    "PSA testing",
    "Digital rectal examination",
    "Prostate MRI",
    "Repeat biopsy when indicated",
    "Review of clinical findings",
  ]),
  p("The 2026 EAU guideline recommends active surveillance as standard care for suitable patients with low-risk disease and selected patients with favourable intermediate-risk disease."),
  h3("Why choose active surveillance?"),
  p("The main reason is to avoid unnecessary treatment and its potential side effects when immediate treatment may not provide enough additional benefit."),
  p("Surgery and radiation can affect urinary, bowel and sexual function. If a low-risk cancer is unlikely to cause problems for many years, immediate treatment may not always be necessary."),
  p("However, active surveillance is a **structured medical programme**, not simply \"doing nothing.\" There is no single package price; follow-up is billed per visit, PSA test, MRI or biopsy."),

  h2("2. Watchful Waiting"),
  p("Watchful waiting is different from active surveillance."),
  p("With active surveillance, the intention is generally to identify disease progression early enough to offer curative treatment if needed."),
  p("With watchful waiting, the approach is usually more conservative. It may be appropriate for men whose overall health or life expectancy makes curative treatment less suitable."),
  p("Treatment is generally introduced if the cancer causes symptoms or becomes clinically significant."),
  p("The EAU distinguishes active surveillance from watchful waiting and considers health status and life expectancy important parts of treatment planning."),

  h2("3. Radical Prostatectomy"),
  img(
    "/uploads/articles/pca-options-surgery.webp",
    "Sagittal male pelvis showing the bladder and the gland beneath it that is removed during radical prostatectomy",
    "Radical prostatectomy removes the prostate and usually the seminal vesicles. Lymph nodes may be taken when the estimated risk of spread warrants it.",
  ),
  p("[Radical prostatectomy](" + RP_COST + ") is an operation in which the prostate gland is removed."),
  p("The seminal vesicles are usually removed as part of the procedure, and nearby lymph nodes may also be removed when indicated."),
  p("The objective is to remove the cancer completely when the disease is suitable for curative surgery. The GAF planning range in India is **$7,000–$18,000**, typically with a **3–7 night** stay, covering open, laparoscopic and robotic-assisted approaches."),
  p("Radical prostatectomy can be performed through:"),
  ul(["Open surgery", "Laparoscopic surgery", "Robotic-assisted surgery"]),
  p("The American Cancer Society describes radical prostatectomy as a major surgical treatment for prostate cancer that has not spread beyond the prostate, with the exact surgical approach depending on the clinical situation."),
  p("**Explore radical prostatectomy** — [doctors](" + RP_DOCTORS + "), [hospitals](" + RP_HOSP + ") and [cost in India](" + RP_COST + "), including [Delhi NCR](/costs/India/Delhi-NCR/Surgical-Oncology/Radical-Prostatectomy) and [Mumbai](/costs/India/Mumbai/Surgical-Oncology/Radical-Prostatectomy)."),

  h2("4. Robotic-Assisted Radical Prostatectomy"),
  p("Robotic prostatectomy is a minimally invasive form of radical prostatectomy."),
  p("The surgeon controls specialised instruments from a console while operating through small incisions."),
  p("The system can provide magnified visualisation, three-dimensional views, articulated instruments and fine control in confined anatomical spaces."),
  p("However, the robot does not independently perform the surgery. The surgeon remains responsible for the procedure and makes the operative decisions."),
  h3("Who may be considered for robotic prostatectomy?"),
  p("It may be considered for selected men with localised prostate cancer, some locally advanced cancers, and adequate overall health for surgery. The suitability of surgery depends on the tumour's characteristics and the surgeon's assessment."),
  h3("Potential benefits of minimally invasive surgery"),
  p("Patients may experience smaller incisions, less postoperative discomfort, lower blood loss in many cases, shorter hospitalisation and faster initial recovery."),
  p("But robotic surgery is not automatically the right treatment for every prostate cancer patient. The cancer stage and risk profile come first."),
  p("**Related:** [Robotic Prostatectomy in India](/blogs/robotic-prostatectomy-in-india) and the [India treatment pathway](" + PILLAR + ")."),
  btn("Ask whether robotic prostatectomy is appropriate", consult("Radical Prostatectomy")),
  p("[WhatsApp +91 90443 46292 about robotic surgery](" + wa("I would like to know if robotic radical prostatectomy is appropriate for my case in India.") + ")"),

  h2("5. Nerve-Sparing Prostatectomy"),
  p("The nerves involved in erectile function lie close to the prostate."),
  p("When the cancer's location allows it, surgeons may try to preserve these nerves during prostatectomy. This is called **nerve-sparing surgery**."),
  p("It may be bilateral, unilateral, partial, or not performed. The decision depends on the likelihood that cancer has extended outside the prostate in the area where the nerves are located."),
  p("The priority remains cancer control. Therefore, nerve preservation is considered only when it is oncologically safe."),

  h2("6. Pelvic Lymph Node Dissection"),
  p("Some men undergoing radical prostatectomy may also require pelvic lymph node dissection."),
  p("During this procedure, selected lymph nodes around the pelvis are removed and examined by a pathologist. The results can help determine whether prostate cancer has spread to the lymph nodes."),
  p("This information may influence final staging, risk assessment, postoperative treatment and follow-up. Lymph-node surgery is not required for every prostate cancer patient."),

  h2("7. Radiation Therapy"),
  img(
    "/uploads/articles/pca-options-radiation.webp",
    "Male patient on an imaging couch with a pelvic-bone overlay used in prostate radiation planning",
    "External-beam radiation treats the prostate from outside the body. Session count depends on IMRT, IGRT, SBRT or another planned technique.",
  ),
  p("Radiation therapy uses high-energy radiation to damage cancer cells."),
  p("It can be used as a curative treatment for selected localised prostate cancers and as part of treatment for higher-risk or locally advanced disease. Radiation can also be used to relieve symptoms caused by metastatic prostate cancer."),
  p("Modern radiation treatment can include [IMRT](" + IMRT + "), VMAT, [IGRT](" + IGRT + "), moderate hypofractionation, [SBRT](" + SBRT + ") and [brachytherapy](" + BRACHY + ")."),
  p("The EAU guideline includes modern image-guided radiation techniques and different fractionation schedules among established treatment approaches for appropriately selected patients. See [radiation oncologists in India](" + RAD_DOCS + ") and [radiation hospitals in Delhi NCR](/hospitals/India/Delhi-NCR/Radiation-Oncology)."),

  h2("8. External-Beam Radiation Therapy"),
  p("[External-beam radiation therapy](" + EBRT + ") delivers radiation from a machine outside the body."),
  p("The radiation is carefully planned so that the prostate and areas at risk receive the prescribed dose while surrounding organs are protected as much as possible."),
  h3("IMRT"),
  p("**Intensity-modulated radiation therapy** uses multiple radiation beams with different intensities. The GAF planning range is **$6,500–$14,500**."),
  h3("VMAT"),
  p("**Volumetric modulated arc therapy** delivers radiation while the treatment machine rotates around the patient."),
  h3("IGRT"),
  p("**Image-guided radiation therapy** uses imaging to improve treatment positioning. The GAF planning range is **$7,200–$16,000**."),
  h3("SBRT"),
  p("**Stereotactic body radiation therapy** delivers a highly focused radiation dose over a small number of treatment sessions in selected patients. The GAF planning range is **$8,000–$17,500**."),
  p("The number of treatment sessions depends on the technique and the patient's disease characteristics. Conventional [EBRT](" + EBRT + ") planning ranges start at **$1,000–$6,000+** for about 15–35 sessions."),
  btn("Get a radiation estimate", consult("External Beam Radiotherapy (EBRT)")),
  p("[WhatsApp +91 90443 46292 for a radiation quote](" + wa("Please share a radiation therapy estimate for prostate cancer in India.") + ")"),

  h2("9. Brachytherapy"),
  p("[Brachytherapy](" + BRACHY + ") is an internal form of radiation therapy."),
  p("Instead of delivering radiation from outside the body, a radioactive source is placed in or close to the prostate."),
  h3("Low-dose-rate brachytherapy"),
  p("Small radioactive seeds are placed within the prostate."),
  h3("High-dose-rate brachytherapy"),
  p("A radioactive source is temporarily introduced into the prostate and then removed."),
  p("Brachytherapy can be used alone in selected patients or combined with external-beam radiation for some higher-risk cancers. The GAF planning range is **$5,500–$13,000**."),
  p("**Related:** [Brachytherapy for Prostate Cancer](" + BRACHY + ")."),

  h2("10. Hormone Therapy"),
  p("Hormone therapy is also called **androgen deprivation therapy (ADT)**."),
  p("Prostate cancer cells can use male hormones called androgens to support their growth. Hormone therapy reduces androgen stimulation."),
  p("Depending on the disease setting, [hormone treatment](" + HT + ") may involve LHRH/GnRH agonists, LHRH/GnRH antagonists, androgen-receptor pathway inhibitors or other hormonal approaches."),
  p("Medicines such as abiraterone, enzalutamide, apalutamide and darolutamide may be used in appropriate clinical situations."),
  p("Hormone therapy can be used with radiation therapy, in locally advanced disease, in metastatic hormone-sensitive prostate cancer, in castration-resistant disease, and as part of combination systemic treatment."),
  p("The exact combination and duration depend on the disease stage and previous treatment. The GAF planning range is **$1,000–$4,500**. See [hormone therapy doctors](/doctors/India/Medical-Oncology/Hormone-Therapy) and [hospitals](/hospitals/India/Medical-Oncology/Hormone-Therapy)."),
  btn("Get a hormone-therapy estimate", consult("Hormone Therapy")),

  h2("Side Effects of Hormone Therapy"),
  p("Because ADT changes hormone levels, it can cause side effects such as:"),
  ul([
    "Hot flashes",
    "Reduced sexual desire",
    "Erectile dysfunction",
    "Fatigue",
    "Loss of muscle mass",
    "Changes in body composition",
    "Metabolic changes",
    "Bone loss",
    "Mood or quality-of-life changes",
  ]),
  p("Long-term hormone treatment therefore requires appropriate monitoring. Bone health is particularly important in men receiving prolonged androgen deprivation."),

  h2("11. Chemotherapy"),
  p("[Chemotherapy](" + CHEMO + ") uses medicines that circulate throughout the body to attack cancer cells."),
  p("**Docetaxel** is an important chemotherapy drug used in selected advanced prostate cancer settings."),
  p("Chemotherapy is particularly relevant when prostate cancer has spread or when systemic treatment is needed."),
  p("Modern treatment is increasingly based on combinations rather than viewing chemotherapy in isolation. For example, selected patients with metastatic hormone-sensitive prostate cancer may receive ADT together with an androgen-receptor pathway inhibitor and, in appropriate cases, chemotherapy. The 2026 EAU guideline includes updated recommendations for systemic treatment combinations in metastatic disease."),
  p("The GAF planning range is **$1,500–$8,000+**, usually as outpatient cycles. See [chemotherapy doctors](/doctors/India/Medical-Oncology/Chemotherapy)."),

  h2("12. Targeted Therapy"),
  p("[Targeted therapy](" + TARGET + ") works against specific molecular characteristics of cancer."),
  p("This is particularly important in advanced prostate cancer because genetic testing can identify alterations that may open additional treatment options."),
  p("Some prostate cancers have abnormalities involving DNA-repair genes such as BRCA1, BRCA2, ATM and other homologous recombination repair genes."),
  p("PARP inhibitors are an example of targeted treatment used in selected patients with relevant molecular alterations."),
  p("The important point is that **targeted therapy is not automatically appropriate simply because prostate cancer is advanced**. The tumour's molecular profile matters. The GAF planning range is **$8,000–$30,000**."),

  h2("13. Immunotherapy"),
  p("Immunotherapy uses the body's immune system to recognise and attack cancer cells."),
  p("Its role in prostate cancer is more selective than in some other cancers."),
  p("It may be considered for specific patients based on tumour characteristics, previous treatment and eligibility criteria."),
  p("Patients should therefore not assume that an immunotherapy used successfully for another cancer will necessarily work for prostate cancer. Where used, the GAF planning range for [immunotherapy](" + IMMUNO + ") is **$15,000–$45,000**."),

  h2("14. PSMA-Targeted Treatment"),
  p("PSMA stands for **prostate-specific membrane antigen**. Many prostate cancer cells express PSMA on their surface. This characteristic can be used for both imaging and treatment."),
  h3("PSMA PET/CT"),
  p("A PSMA-targeting tracer is injected into the body and detected using PET imaging. It can help identify prostate cancer deposits in selected staging and recurrence situations."),
  h3("PSMA-targeted radiopharmaceutical therapy"),
  p("A radioactive isotope can be attached to a PSMA-targeting molecule. One example is **lutetium-177 PSMA therapy**."),
  p("The targeting molecule carries the radioactive substance toward PSMA-expressing cancer cells, allowing radiation to be delivered more directly to those cells."),
  p("This treatment is primarily relevant to selected patients with advanced disease and requires specialist assessment. The 2026 EAU guidelines specifically include updated recommendations around imaging and systemic treatment for advanced prostate cancer."),
  p("**Related:** [Lutetium-177 PSMA Therapy in India](" + PILLAR + ")."),
  btn("Request a metastatic-treatment review", consult("Prostate Cancer Treatment in India")),
  p("[WhatsApp +91 90443 46292 about PSMA therapy](" + wa("Please advise whether PSMA PET or lutetium-177 PSMA therapy is relevant for my prostate cancer in India.") + ")"),

  h2("15. Focal Therapy"),
  p("Focal treatments aim to destroy the cancerous area while leaving much of the prostate untreated."),
  p("Examples include high-intensity focused ultrasound (HIFU), cryotherapy and other ablative approaches."),
  p("These treatments can sound attractive because they appear to offer a middle ground between surveillance and complete prostate removal. However, they are not appropriate for every patient."),
  p("Current EAU guidance is cautious about focal and whole-gland ablative approaches and recommends their use only in specific circumstances, including clinical trials or registries for some applications."),
  p("Patients should therefore ask about the quality of long-term evidence before choosing focal treatment."),

  h2("Prostate Cancer Treatment by Risk Group"),
  h3("Very Low- and Low-Risk Prostate Cancer"),
  p("For suitable patients, **active surveillance is often the preferred approach**."),
  p("Other possible treatments may include radical prostatectomy, radiation therapy and brachytherapy in selected cases. The choice depends on factors such as life expectancy, tumour characteristics and patient preferences."),
  h3("Intermediate-Risk Prostate Cancer"),
  p("Intermediate-risk disease is not one uniform category. Doctors often distinguish between favourable intermediate risk and unfavourable intermediate risk."),
  p("Depending on the patient's exact disease, treatment may include active surveillance in selected favourable cases, radical prostatectomy, external-beam radiation, brachytherapy, or radiation combined with short-term hormone therapy."),
  p("The EAU and other major cancer organisations emphasise risk stratification rather than treating every intermediate-risk cancer in exactly the same way."),
  h3("High-Risk Prostate Cancer"),
  p("High-risk prostate cancer has a greater likelihood of recurrence and progression. Treatment often involves more than one modality."),
  p("Potential approaches include radical prostatectomy in selected patients, external-beam radiation plus long-term hormone therapy, radiation plus brachytherapy in selected patients, and additional systemic treatment in specific high-risk settings."),
  p("The EAU 2026 guideline includes long-term ADT with radiation and additional systemic approaches for selected high-risk patients."),
  h3("Locally Advanced Prostate Cancer"),
  p("Locally advanced prostate cancer has extended outside the prostate or involves nearby structures and/or regional lymph nodes, depending on the specific stage."),
  p("Treatment may involve radiation therapy, long-term hormone therapy, additional systemic treatment, and surgery in carefully selected patients. The exact approach depends on the pattern and extent of local spread."),
  h3("Metastatic Prostate Cancer"),
  p("Metastatic prostate cancer has spread to distant parts of the body. The bones and distant lymph nodes are common sites of spread, although other organs can also be involved."),
  p("At this stage, treatment usually focuses on controlling cancer throughout the body."),
  p("Options can include androgen deprivation therapy, androgen-receptor pathway inhibitors, chemotherapy, targeted therapy, radiopharmaceutical therapy, radiation to selected sites, bone-directed treatment and clinical trials."),
  p("For many men, metastatic prostate cancer is treatable but not considered curable with currently available standard treatments. The goal may be to control the disease, delay progression, relieve symptoms and maintain quality of life."),

  h2("Prostate Cancer Treatment by Stage"),
  html(stageTable),
  p("This table is a simplified overview. Actual treatment decisions depend on the **TNM stage, PSA, Grade Group, imaging, health status and life expectancy**."),

  h2("Surgery vs Radiation for Prostate Cancer"),
  p("One of the most common questions after diagnosis is:"),
  p("**\"Should I have surgery or radiation?\"**"),
  p("There is no universal answer. For some men with localised disease, both can be appropriate curative treatments."),
  h3("Surgery may involve:"),
  ul([
    "Removal of the prostate",
    "Removal of seminal vesicles",
    "Lymph-node dissection when indicated",
    "Possible nerve-sparing",
  ]),
  h3("Radiation may involve:"),
  ul([
    "External-beam radiation",
    "IMRT",
    "VMAT",
    "IGRT",
    "SBRT in selected patients",
    "Brachytherapy",
  ]),
  p("The decision can depend on cancer risk, tumour location, age, life expectancy, urinary symptoms, baseline sexual function, other health conditions, patient priorities and local expertise."),
  p("The American Cancer Society notes that men with early prostate cancer can have several reasonable treatment options, and the choice involves balancing cancer control against potential treatment effects and personal priorities."),

  h2("Surgery vs Radiation: Key Differences"),
  html(vsTable),
  p("Neither column represents a recommendation. The appropriate treatment depends on the patient's clinical situation."),
  btn("Discuss surgery versus radiation", consult("Prostate Cancer Treatment in India")),

  h2("Can Prostate Cancer Be Treated Without Surgery?"),
  p("Yes. Surgery is not required for every prostate cancer patient."),
  p("Depending on the disease, alternatives may include:"),
  ul([
    "Active surveillance for selected low-risk disease",
    "Radiation therapy for many localised and selected locally advanced cancers",
    "Brachytherapy for selected patients",
    "Hormone therapy, particularly in advanced or higher-risk disease",
    "Systemic treatment for metastatic or otherwise appropriate advanced disease",
  ]),
  p("The important question is not simply \"Can I avoid surgery?\" It is: **which treatment gives appropriate cancer control while fitting my disease, health and priorities?**"),

  h2("Can Prostate Cancer Be Cured?"),
  p("It depends on the stage and biology of the cancer."),
  p("For many men with localised prostate cancer, treatment is given with **curative intent**."),
  p("For metastatic prostate cancer, treatment generally aims to control the disease rather than eradicate every cancer cell."),
  p("A patient's prognosis cannot be determined from the word \"prostate cancer\" alone. Doctors need to consider stage, PSA, Grade Group, Gleason score, tumour volume, lymph-node involvement, metastases and response to treatment."),

  h2("What Happens After Prostate Cancer Treatment?"),
  img(
    "/uploads/articles/pca-options-followup.webp",
    "Clinic visit after prostate cancer treatment with PSA blood testing and a pelvic overlay",
    "PSA is the main follow-up marker after surgery or radiation. A confirmed rise can lead to imaging and a new plan.",
  ),
  p("Treatment does not necessarily mark the end of the cancer journey. Follow-up is important after surgery, radiation and systemic treatment."),
  p("PSA is one of the most important follow-up tests. After radical prostatectomy, PSA is expected to fall to a very low level. After radiation, PSA behaves differently and can take time to reach its lowest level."),
  p("Doctors may also monitor urinary function, sexual function, bowel symptoms, hormone-treatment effects, bone health and imaging findings when indicated."),
  p("The EAU describes follow-up as an important part of assessing cancer control, treatment compliance, side effects, functional outcomes and the need for additional treatment."),

  h2("What If Prostate Cancer Comes Back?"),
  p("Recurrence does not mean that there are no further treatment options."),
  p("The next step depends on where the recurrence is located and what treatment the patient received initially."),
  p("Doctors may assess PSA, PSA doubling time, MRI, PSMA PET/CT, other imaging, previous pathology, and previous radiation or surgery."),
  p("Possible treatments can include salvage radiation, hormone therapy, systemic therapy, selected surgery, targeted therapy and PSMA-targeted radiopharmaceutical treatment."),
  p("The treatment pathway for recurrence is different from the initial treatment pathway and should be planned by a specialist team."),

  h2("What Are the Side Effects of Prostate Cancer Treatment?"),
  p("The side effects depend on the treatment."),
  h3("Surgery"),
  ul([
    "Urinary incontinence",
    "Erectile dysfunction",
    "Bleeding",
    "Infection",
    "Anaesthesia-related complications",
    "Changes in ejaculation",
  ]),
  h3("Radiation"),
  ul([
    "Urinary frequency",
    "Urinary irritation",
    "Bowel changes",
    "Rectal irritation",
    "Erectile dysfunction",
    "Fatigue",
  ]),
  h3("Hormone Therapy"),
  ul([
    "Hot flashes",
    "Reduced libido",
    "Erectile dysfunction",
    "Fatigue",
    "Muscle loss",
    "Weight changes",
    "Metabolic effects",
    "Bone loss",
  ]),
  h3("Chemotherapy"),
  p("Possible effects vary according to the drug but can include fatigue, nausea, lower blood-cell counts, infection risk, hair loss and peripheral neuropathy with some drugs."),
  p("Patients should discuss the expected side effects of their specific treatment rather than assuming that every side effect will occur."),

  h2("How Do Doctors Balance Cancer Control and Quality of Life?"),
  p("This is an important part of prostate cancer treatment."),
  p("A treatment decision is not based only on removing or destroying cancer. Doctors also consider what treatment may mean for urinary control, sexual function, bowel function, physical independence, daily activities, long-term health and emotional wellbeing."),
  p("This is particularly important in localised prostate cancer, where several treatment options may be available."),
  p("A younger, otherwise healthy man with a long life expectancy may approach the decision differently from an older man with significant medical conditions."),
  p("The EAU specifically recommends incorporating health status, comorbidities and life expectancy into prostate cancer management."),

  h2("Why a Multidisciplinary Team Can Matter"),
  p("Prostate cancer can involve several specialties. Depending on the disease, the treatment team may include a uro-oncologist, [urologist](" + URO_DOCS + "), [radiation oncologist](" + RAD_DOCS + "), [medical oncologist](" + MED_DOCS + "), radiologist, pathologist, nuclear medicine specialist, oncology nurse and rehabilitation specialists."),
  p("A multidisciplinary review can be particularly useful when the cancer is high-risk, surgery and radiation are both possible, the cancer has spread or returned, multiple treatment options are being considered, or advanced systemic treatment is required."),

  h2("Prostate Cancer Treatment in India"),
  p("India has tertiary cancer centres offering a broad range of prostate cancer services, including uro-oncology, robotic-assisted prostate surgery, radiation oncology, brachytherapy, medical oncology, advanced imaging, PSMA PET/CT and selected radiopharmaceutical treatments."),
  p("For an international patient, the most useful approach is to choose the **treatment centre based on the clinical requirement**, rather than simply selecting a hospital because it is well known."),
  p("For example, a patient being evaluated for robotic prostatectomy may need a centre with experienced uro-oncology surgeons in [Delhi NCR](/hospitals/India/Delhi-NCR/Surgical-Oncology) or [Mumbai](/hospitals/India/Mumbai/Surgical-Oncology), while a patient with metastatic disease may need a centre with medical oncology, molecular testing, nuclear medicine and radiopharmaceutical capabilities in [Bengaluru](/hospitals/India/Bengaluru), [Chennai](/hospitals/India/Chennai) or [Hyderabad](/hospitals/India/Hyderabad)."),
  p("**Related:** [Prostate Cancer Treatment in India](" + PILLAR + ")."),
  btn("Plan a treatment stay in India", consult("Prostate Cancer Treatment in India")),
  p("[WhatsApp +91 90443 46292 to plan travel](" + wa("Please help me plan a prostate cancer treatment stay in India.") + ")"),

  h2("Prostate Cancer Treatment Cost in India"),
  p("There is no single cost for prostate cancer treatment."),
  p("The total expense depends on the type of treatment, cancer stage, hospital, city, surgical approach, robotic technology, radiation technique, number of treatment sessions, medicines, hospital stay, diagnostic investigations, follow-up and treatment complications."),
  p("Current GAF planning ranges include [radical prostatectomy $7,000–$18,000](" + RP_COST + "), [EBRT $1,000–$6,000+](" + EBRT + "), [IMRT $6,500–$14,500](" + IMRT + "), [brachytherapy $5,500–$13,000](" + BRACHY + "), [hormone therapy $1,000–$4,500](" + HT + ") and [chemotherapy $1,500–$8,000+](" + CHEMO + "). These are planning ranges, not hospital quotations."),
  p("For international patients, the total budget may also include accommodation, flights, local transportation, medical visa expenses, attendant expenses and additional stay."),
  p("A personalised hospital quotation is therefore more useful than relying on a generic online price."),
  p("**Related:** [Prostate Cancer Treatment Cost in India](" + PILLAR + ")."),
  btn("Request an itemized hospital estimate", consult("Prostate Cancer Treatment in India")),

  h2("How to Prepare Before Travelling to India for Treatment"),
  p("International patients can often make the process easier by collecting their medical records before travelling."),
  p("Important documents include:"),
  ul([
    "PSA reports",
    "Biopsy report",
    "Gleason score",
    "Grade Group",
    "MRI report",
    "MRI images",
    "PSMA PET/CT report, if performed",
    "CT/PET reports",
    "Previous treatment records",
    "Medication list",
    "Discharge summaries",
    "Pathology slides or tissue blocks, where available",
  ]),
  p("A specialist can then review the records and determine whether additional testing is needed. This can reduce unnecessary duplication of investigations after arrival."),

  h2("Questions to Ask Your Prostate Cancer Specialist"),
  p("Before making a treatment decision, consider asking:"),
  ol([
    "What is my exact prostate cancer stage?",
    "What is my Gleason score?",
    "What is my Grade Group?",
    "What is my PSA?",
    "Is the cancer confined to the prostate?",
    "Do I need an MRI or PSMA PET/CT?",
    "Am I suitable for active surveillance?",
    "Is surgery appropriate for me?",
    "Would robotic surgery be appropriate?",
    "Is nerve-sparing surgery possible?",
    "Could radiation be an alternative?",
    "Would I need hormone therapy?",
    "What are the likely urinary side effects?",
    "How might treatment affect sexual function?",
    "What is the expected recovery period?",
    "Will I need additional treatment afterward?",
    "How often will my PSA be monitored?",
    "What happens if the cancer comes back?",
    "What is the estimated treatment cost?",
    "How long would I need to stay in India?",
  ]),

  h2("Frequently Asked Questions"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Key Takeaway"),
  p("**Prostate cancer treatment is highly individualised.**"),
  p("A low-risk cancer may require careful monitoring rather than immediate treatment. A localised cancer may be treated with surgery or radiation. Higher-risk disease may require combined treatment, while metastatic prostate cancer often requires long-term systemic therapy."),
  p("The most important information for deciding treatment is:"),
  p("**PSA + Gleason score/Grade Group + stage + imaging + overall health + life expectancy + treatment priorities.**"),
  p("If you have recently received a prostate cancer diagnosis, the next useful step is usually not to choose a treatment based on a single online article. It is to have your **PSA, biopsy, pathology and imaging reviewed by an appropriate prostate cancer specialist** and discuss the benefits and risks of the available options."),

  h2("How GAF Healthcare Can Help"),
  p("GAF Healthcare coordinates international patients who want [prostate cancer treatment in India](" + PILLAR + "). Share PSA reports, biopsy and Grade Group, MRI or PSMA PET, and previous treatment records. A coordinator can arrange specialist review, an itemized estimate and travel planning. The treating uro-oncology, radiation or medical oncology team makes the final recommendation."),
  btn("Share records for a second opinion", consult("Prostate Cancer Treatment in India")),
  p("[WhatsApp +91 90443 46292 with your records](" + wa("I would like to share prostate cancer records for a treatment-options review in India.") + ")"),

  h2("Medical Disclaimer"),
  p("This article is intended for educational purposes and does not replace medical advice from a qualified urologist, uro-oncologist, radiation oncologist or medical oncologist."),
  p("Treatment recommendations can differ according to the patient's pathology, stage, imaging, health status, previous treatment and individual circumstances."),

  h2("Sources"),
  p("1. [European Association of Urology — Prostate Cancer Guidelines 2026](https://uroweb.org/guidelines/prostate-cancer) — active surveillance, surgery, radiation, systemic treatment, metastatic disease and follow-up."),
  p("2. [National Cancer Institute — Prostate Cancer Treatment (PDQ)](https://www.cancer.gov/types/prostate/patient/prostate-treatment-pdq) — surgery, radiation, hormone therapy, chemotherapy, targeted therapy and other treatments."),
  p("3. [American Cancer Society — Prostate Cancer Treatment by Stage](https://www.cancer.org/cancer/types/prostate-cancer/treating/by-stage.html) — how options vary by stage, risk group, PSA, Grade Group, health and circumstances."),
  p("4. [American Cancer Society — Treating Prostate Cancer](https://www.cancer.org/cancer/types/prostate-cancer/treating.html) — surveillance, surgery, radiation, hormone therapy, chemotherapy, immunotherapy, targeted therapy and metastatic disease."),
  p("5. [American Cancer Society — Prostate Cancer Staging](https://www.cancer.org/cancer/types/prostate-cancer/detection-diagnosis-staging/staging.html) — how PSA, Grade Group, tumour extent, lymph nodes and metastases contribute to staging."),
  p("**Last reviewed against the cited sources: September 2026.**"),
];

const now = "2026-09-28T03:30:00.000Z";
const SLUG = "prostate-cancer-treatment-options-india";
const HREF = `/blogs/${SLUG}`;

const article = {
  id: "art_prostate_cancer_treatment_options_india",
  slug: SLUG,
  title: "Prostate Cancer Treatment Options: Surgery, Radiation, Hormone Therapy and More",
  excerpt:
    "How doctors choose between active surveillance, radical prostatectomy, radiation, hormone therapy, chemotherapy and PSMA treatment — and what that means for care in India.",
  date: "28 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Surgical Oncology",
  tags: ["prostate cancer", "surgery", "radiation", "hormone therapy", "India", "travel"],
  image: "/uploads/articles/pca-options-categories.webp",
  imageAlt:
    "Transparent male body highlighting the prostate in the pelvis as the starting point for treatment planning",
  status: "published",
  featured: true,
  seoTitle: "Prostate Cancer Treatment Options: Surgery, Radiation & ADT",
  seoDescription:
    "Compare active surveillance, radical prostatectomy, radiation, hormone therapy, chemotherapy and PSMA treatment. How doctors choose, side effects, and India care pathways.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/pca-options-categories.webp",
  allowIndex: true,
  keywords: [
    "prostate cancer treatment options",
    "prostate cancer surgery vs radiation",
    "active surveillance prostate cancer",
    "robotic prostatectomy India",
    "prostate radiation therapy",
    "hormone therapy ADT prostate cancer",
    "PSMA therapy India",
    "prostate cancer treatment in India",
    "brachytherapy for prostate cancer",
    "metastatic prostate cancer treatment",
    "prostate cancer side effects",
    "international prostate cancer treatment India",
  ],
  relatedLinks: [
    { label: "Prostate Cancer Treatment in India", href: PILLAR },
    { label: "Robotic Prostatectomy in India", href: "/blogs/robotic-prostatectomy-in-india" },
    { label: "Brachytherapy for Prostate Cancer", href: BRACHY },
    { label: "Lutetium-177 PSMA Therapy in India", href: PILLAR },
    { label: "Prostate Cancer Treatment Cost in India", href: RP_COST },
    { label: "Hormone therapy cost", href: HT },
    { label: "Prostate Cancer Treatment Without Surgery", href: "/blogs/prostate-cancer-treatment-without-surgery" },
  ],
  blocks,
};

if (!store.categories.includes("Surgical Oncology")) store.categories.push("Surgical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["pca-options-categories.webp", article.imageAlt],
  ["pca-options-surgery.webp", "Sagittal male pelvis for radical prostatectomy planning"],
  ["pca-options-radiation.webp", "Male patient on a couch for prostate radiation planning"],
  ["pca-options-followup.webp", "PSA follow-up after prostate cancer treatment"],
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

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length);
