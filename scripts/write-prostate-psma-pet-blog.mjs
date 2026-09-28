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
const STAGES = "/blogs/prostate-cancer-stages-1-to-4";
const LU = "/blogs/lutetium-177-psma-therapy-in-india";
const PET = "/blogs/psma-pet-scan-for-prostate-cancer";
const EBRT = "/costs/India/Radiation-Oncology/EBRT";
const IMRT = "/costs/India/Radiation-Oncology/IMRT";
const BRACHY = "/costs/India/Radiation-Oncology/Brachytherapy";
const RP = "/costs/India/Surgical-Oncology/Radical-Prostatectomy";
const HT = "/costs/India/Medical-Oncology/Hormone-Therapy";
const CHEMO = "/costs/India/Medical-Oncology/Chemotherapy";
const RAD_DOCS = "/doctors/India/Radiation-Oncology";
const SURG_DOCS = "/doctors/India/Surgical-Oncology";
const MED_DOCS = "/doctors/India/Medical-Oncology";
const MED_HOSP = "/hospitals/India/Medical-Oncology";
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

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body"><strong>What is a PSMA PET scan?</strong></p><p class="article-quick-answer__body">A PSMA PET scan is an advanced nuclear-medicine imaging test that uses a radioactive tracer designed to bind to <strong>PSMA</strong>, a protein commonly expressed by prostate cancer cells. PET images are combined with CT or, in some centres, MRI to show where the tracer has accumulated.</p><p class="article-quick-answer__body"><strong>Why is PSMA PET done for prostate cancer?</strong></p><p class="article-quick-answer__body">It is mainly used to:</p><ul class="article-quick-answer__list"><li>Stage selected newly diagnosed prostate cancer</li><li>Look for lymph-node or distant metastases</li><li>Investigate biochemical recurrence after surgery or radiation</li><li>Locate persistent or recurrent disease</li><li>Help plan salvage treatment</li><li>Assess disease before selected PSMA-targeted radioligand therapies</li></ul><p class="article-quick-answer__body">Current EAU guidance recommends PSMA PET/CT for metastatic staging in selected higher-risk disease and for appropriate biochemical recurrence when the result could change management.</p><p class="article-quick-answer__body"><strong>Does PSMA PET replace MRI or biopsy?</strong></p><p class="article-quick-answer__body">No.</p><p class="article-quick-answer__body">MRI, biopsy and PSMA PET answer different clinical questions. PSMA PET can complement MRI and biopsy but does not automatically replace them.</p><p class="article-quick-answer__body"><strong>How long does a PSMA PET scan take?</strong></p><p class="article-quick-answer__body">The complete appointment commonly takes around <strong>2–3 hours</strong>, because there is a waiting period after the tracer injection. The actual PET/CT acquisition is usually much shorter, often around 30 minutes.</p><p class="article-quick-answer__body"><strong>What is the cost of a PSMA PET scan in India?</strong></p><p class="article-quick-answer__body">A commonly quoted range in India is approximately <strong>₹15,000–₹30,000</strong>, but the actual price can vary significantly depending on the hospital, city, tracer, availability, scanner, and whether additional imaging or services are included. Apollo Hospitals currently lists ₹15,000–₹30,000 as an indicative range.</p></aside>`;

const vsCt = `<div class="md-body"><table><thead><tr><th>PSMA PET/CT</th><th>Conventional CT</th></tr></thead><tbody><tr><td>Shows PSMA-targeting tracer uptake</td><td>Primarily shows anatomy</td></tr><tr><td>Can identify small areas of prostate cancer activity</td><td>May miss small-volume disease</td></tr><tr><td>Provides molecular and anatomical information</td><td>Mainly anatomical</td></tr><tr><td>Useful for staging and recurrence</td><td>Useful for anatomy and many other conditions</td></tr><tr><td>Uses a radiotracer</td><td>Uses X-rays</td></tr></tbody></table></div>`;

const faqs = [
  ["Is PSMA PET scan necessary for every prostate cancer patient?", "No. It is most useful when the scan is likely to answer an important staging, recurrence or treatment-planning question."],
  ["What PSA level requires a PSMA PET scan?", "There is no universal PSA threshold. The decision depends on the treatment history, PSA trend, cancer risk and whether the scan will change management. After prostatectomy, the 2026 EAU guideline recommends PSMA PET/CT when PSA is above 0.2 ng/mL if the result could influence treatment."],
  ["Can PSMA PET detect prostate cancer at low PSA?", "Yes. Detection is possible even at relatively low PSA levels, although the probability of finding disease generally increases as PSA increases."],
  ["Do I need to fast before PSMA PET?", "Not necessarily. Preparation varies by centre and tracer. Many patients can eat normally, but follow the instructions from the imaging centre."],
  ["Can I drink water before PSMA PET?", "Usually yes. Hydration is commonly encouraged, but patients with fluid restrictions should follow their doctor's advice."],
  ["Can I take my medicines before PSMA PET?", "Usually, routine medicines can be continued unless the imaging team tells you otherwise."],
  ["How long does PSMA PET take?", "The complete appointment often takes about 2–3 hours. The actual scan may take around 30 minutes after the tracer uptake period."],
  ["Is PSMA PET painful?", "The scan itself is painless. Most patients only feel the brief discomfort associated with IV placement."],
  ["Is PSMA PET safe?", "It is generally well tolerated, but it involves exposure to ionizing radiation. The decision to perform it should be based on a clinical indication."],
  ["What does PSMA-avid mean?", "It means an area has increased uptake of the PSMA-targeting tracer. It does not automatically prove that the area is prostate cancer."],
  ["Can PSMA PET detect bone metastases?", "Yes. Bone is a common site of prostate cancer spread, and PSMA PET can identify many bone metastases."],
  ["Can PSMA PET detect lymph-node metastases?", "Yes, including some lymph-node metastases that are difficult to identify on conventional CT. Very small deposits can still be missed."],
  ["Can PSMA PET detect cancer after prostatectomy?", "Yes. It is particularly useful when PSA rises after radical prostatectomy and recurrent disease needs to be localized."],
  ["Can PSMA PET detect recurrence after radiation?", "Yes. It can identify local and distant recurrent disease and may help determine whether salvage treatment is appropriate."],
  ["Can PSMA PET replace MRI?", "No. MRI and PSMA PET provide complementary information."],
  ["Can PSMA PET replace biopsy?", "Generally, no. Imaging and histopathology provide different types of information."],
  ["Can a PSMA PET scan be negative even if cancer is present?", "Yes. Very small lesions or tumours with low PSMA expression may not be detected."],
  ["Can PSMA PET be positive when there is no prostate cancer?", "Yes. Some benign and non-prostate malignant conditions can show PSMA uptake."],
  ["How much does PSMA PET cost in India?", "An indicative price range published by Apollo Hospitals is ₹15,000–₹30,000. Actual prices vary by hospital, city, tracer and services included."],
  ["How much time should an international patient spend in India for a PSMA PET?", "The scan itself is usually completed within one appointment, but international patients should allow additional time for specialist consultation, review of previous reports and treatment planning if the scan is being performed as part of a larger cancer evaluation."],
  ["Can PSMA PET be used before Lutetium-177 PSMA therapy?", "Yes. PSMA imaging can be used to determine whether a patient's cancer demonstrates sufficient PSMA expression for consideration of PSMA-targeted radioligand therapy."],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("A **PSMA PET scan** is one of the most important imaging tests used in modern prostate cancer care. It can help doctors locate prostate cancer cells that may be too small or difficult to identify with conventional imaging such as CT scans or bone scans."),
  p("PSMA stands for **prostate-specific membrane antigen**. It is a protein found on normal prostate cells and is often present at much higher levels on prostate cancer cells. A small amount of radioactive PSMA-targeting tracer is injected into a vein. The tracer attaches to PSMA-expressing cells and allows a PET scanner to identify areas of abnormal uptake."),
  p("PSMA PET is particularly useful when doctors need to determine whether prostate cancer has spread, find cancer that has returned after treatment, or assess disease that is not clearly visible on conventional imaging. How that sits with PSA, MRI and biopsy is covered in [Prostate Cancer Diagnosis](" + DX + "). How stage grouping uses the result is in [Prostate Cancer Stages 1 to 4](" + STAGES + ")."),
  p("It can influence treatment planning, but it is **not a standalone test that diagnoses or rules out prostate cancer in every situation**. The scan must be interpreted together with PSA, biopsy results, [Gleason score or Grade Group](" + GG + "), MRI, previous treatment and other clinical information."),
  p("This is the dedicated PSMA PET hub for the prostate cluster. It sits beside [diagnosis](" + DX + "), [Lu-177 PSMA therapy](" + LU + "), [recurrence after surgery](" + RECUR + "), [radiation](" + RAD + ") and [Prostate Cancer Treatment in India](" + PILLAR + ")."),
  p("International patients comparing [medical oncologists](" + MED_DOCS + "), [radiation oncologists](" + RAD_DOCS + ") and [surgical oncologists](" + SURG_DOCS + ") commonly start with [Delhi NCR](/doctors/India/Delhi-NCR/Medical-Oncology), [Mumbai](/doctors/India/Mumbai/Radiation-Oncology), [Bengaluru](/doctors/India/Bengaluru/Surgical-Oncology), [Chennai](/doctors/India/Chennai/Radiation-Oncology) and [Hyderabad](/doctors/India/Hyderabad/Medical-Oncology). Partner [medical-oncology hospitals](" + MED_HOSP + ") in [Delhi NCR](/hospitals/India/Delhi-NCR/Medical-Oncology) and [surgical hospitals](" + SURG_HOSP + ") in [Mumbai](/hospitals/India/Mumbai/Surgical-Oncology) are a typical first filter."),
  btn("Ask whether you need a PSMA PET scan", consult("PSMA PET Scan")),
  p("[WhatsApp +91 90443 46292 with your PSA trend and biopsy](" + wa("Please review my PSA, Grade Group and previous imaging and advise whether a PSMA PET scan in India is appropriate.") + ")"),
  img(
    "/uploads/articles/pca-pet-anatomy.webp",
    "Transparent male body with a gold prostate, teal pelvic nodes and gold spinal traces used to explain PSMA PET staging",
    "PSMA PET is molecular imaging. It asks where PSMA-expressing disease is, not only what organs look like on CT.",
  ),

  h2("What Is a PSMA PET Scan?"),
  p("PSMA PET is a form of **molecular imaging**. Unlike a conventional CT scan, which primarily shows anatomy, PSMA PET provides information about the biological behaviour of tissues by showing where a PSMA-targeting radiotracer accumulates."),
  p("The examination usually combines **PSMA radiotracer + PET imaging + CT imaging**. The PET component identifies areas of tracer uptake. The CT component provides anatomical detail and helps doctors determine exactly where that uptake is located."),
  p("This combination makes it possible to detect and localize prostate cancer in lymph nodes, bones and other sites throughout the body."),

  h2("What Does PSMA Stand For?"),
  p("**PSMA = Prostate-Specific Membrane Antigen.** Despite its name, PSMA is not found exclusively in prostate cancer. It is also present at lower levels in some normal tissues and can be expressed in certain other diseases and cancers."),
  p("This matters because **PSMA uptake does not automatically mean prostate cancer**. Normal structures such as the kidneys, salivary glands, bladder, small bowel and spleen can show physiological tracer uptake. Some non-prostate conditions can also produce abnormal uptake."),
  p("That is why the scan needs to be interpreted by an experienced nuclear medicine physician or radiologist rather than by looking at isolated bright spots on the images."),
  img(
    "/uploads/articles/pca-pet-organs.webp",
    "Transparent male figure with gold salivary glands, teal kidneys and bladder and a gold prostate used to explain normal PSMA uptake",
    "Kidneys, salivary glands and bladder can light up on a normal scan. Bright does not automatically mean cancer.",
  ),

  h2("How Does PSMA PET Work?"),
  ol([
    "**Arrive at the imaging centre.** The team reviews history and confirms the indication. They may ask for PSA, biopsy reports, previous scans, previous treatment, current medicines and relevant medical conditions.",
    "**The PSMA tracer is injected** through an intravenous line and travels through the bloodstream.",
    "**The tracer circulates.** A waiting period of approximately one hour is common, although protocols vary by tracer and centre.",
    "**PET/CT imaging is performed.** The PET scan shows radiotracer activity; CT provides anatomy.",
    "**The images are interpreted** by a nuclear medicine physician or radiologist, then considered together with PSA, pathology and clinical history.",
  ]),

  h2("When Is PSMA PET Recommended for Prostate Cancer?"),
  p("The major uses are initial staging, biochemical recurrence, persistent PSA after treatment, suspected metastatic disease, treatment planning, assessment before selected PSMA-targeted therapy, and selected cases where conventional imaging is inconclusive. The exact indication depends on the patient's risk category and clinical situation."),

  h2("PSMA PET for Initial Staging"),
  p("After prostate cancer is diagnosed, doctors need to determine whether the cancer is confined to the prostate, involving nearby lymph nodes, spread to bones, spread to distant lymph nodes, or present in other organs. This process is called **staging**. See [Stages 1 to 4](" + STAGES + ")."),
  p("PSMA PET/CT can be particularly useful for men with **unfavourable intermediate-risk, high-risk or locally advanced prostate cancer**. The 2026 EAU guidelines recommend PSMA PET/CT, where available, for metastatic screening in high-risk localized or locally advanced prostate cancer. For unfavourable intermediate-risk disease, the guideline recommends PSMA PET/CT where available to increase staging accuracy."),
  h3("Does every newly diagnosed patient need PSMA PET?"),
  p("No. A PSMA PET scan is not automatically required for every man with prostate cancer. Men with low-risk localized prostate cancer generally do not need extensive metastatic imaging simply because they have received a cancer diagnosis. The value increases when the probability of lymph-node or distant disease is higher or when the result is likely to change treatment."),
  p("Doctors consider PSA, [Grade Group](" + GG + "), Gleason score, clinical stage, MRI findings, biopsy results, symptoms and other risk factors before ordering the scan. Selected low-risk men may instead be on [active surveillance](" + AS + ")."),

  h2("PSMA PET for Rising PSA After Prostatectomy"),
  p("One of the most important uses of PSMA PET is investigating **biochemical recurrence**. After [radical prostatectomy](" + RARP + "), PSA is expected to become very low or undetectable. If PSA subsequently rises, doctors may suspect recurrent prostate cancer. The key question becomes: **where is the cancer?**"),
  p("It may be in the prostate bed, pelvic lymph nodes, distant lymph nodes, bones or another metastatic site. PSMA PET can help locate recurrent disease and distinguish patients who may have disease confined to the pelvis from those who already have distant spread. The full recurrence pathway is in [Prostate Cancer Recurrence After Surgery](" + RECUR + ")."),
  img(
    "/uploads/articles/pca-pet-recur.webp",
    "Male patient in clinic with a gold prostate-bed overlay, teal pelvic nodes and gold spine while a clinician explains a rising PSA",
    "After prostatectomy, a rising PSA asks where the disease is. PSMA PET is one of the tools used to look.",
  ),
  h3("What PSA level is needed after surgery?"),
  p("There is no single PSA value at which the scan suddenly becomes useful or useless. Detection generally becomes more likely as PSA rises, but PSMA PET can detect disease even at relatively low PSA levels."),
  p("The 2026 EAU guideline recommends PSMA PET/CT after radical prostatectomy when PSA is **above 0.2 ng/mL and the result could influence subsequent treatment decisions**. The decision may also consider PSA doubling time, Gleason score, Grade Group, surgical margins, pathological stage, previous imaging and whether salvage treatment is being considered."),
  btn("Ask about PSMA PET after a rising PSA", consult("PSMA PET after rising PSA")),
  p("[WhatsApp +91 90443 46292 with your post-prostatectomy PSA dates](" + wa("My PSA is rising after prostatectomy. Please advise whether a PSMA PET scan in India is appropriate.") + ")"),

  h2("PSMA PET After Radiation Therapy"),
  p("PSMA PET can also be useful when PSA rises after [radiation therapy](" + RAD + "). After radiation, the prostate remains in place, so PSA does not necessarily become undetectable. Doctors use specific criteria to determine biochemical recurrence after radiotherapy."),
  p("When recurrence is suspected, PSMA PET can help identify local recurrence in the prostate, pelvic lymph nodes, distant lymph nodes, bone metastases or other distant disease. The EAU recommends PSMA PET/CT in patients who are fit for potentially curative salvage treatment after biochemical recurrence following radiotherapy. [Brachytherapy](" + BRACHY_BLOG + ") is a different radiation method; the same recurrence question can still apply."),

  h2("PSMA PET for Suspected Metastatic Prostate Cancer"),
  p("Prostate cancer commonly spreads to pelvic lymph nodes, retroperitoneal lymph nodes, bones, more distant lymph nodes and, less commonly, organs such as the liver or lungs. PSMA PET can identify many of these sites. This can be particularly valuable when conventional CT or bone imaging is negative or uncertain despite a clinical suspicion of metastatic disease. Urinary or bone [symptoms](" + SX + ") do not by themselves set the scan indication."),

  h2("PSMA PET vs CT Scan"),
  html(vsCt),
  p("PSMA PET is not simply a “better CT.” It is a different type of imaging that combines molecular information with CT anatomy."),

  h2("PSMA PET vs Bone Scan"),
  p("A conventional bone scan looks for changes in bone metabolism. PSMA PET looks for PSMA expression associated with prostate cancer. A bone scan can identify bone abnormalities caused by several processes, while PSMA PET can provide more direct molecular information related to prostate cancer."),
  p("In the prospective ProPSMA trial summarized by the EAU, PSMA PET/CT had higher accuracy than conventional CT plus bone scanning for staging men with high-risk prostate cancer. However, PSMA PET is not perfect. Very small lesions can still be missed."),

  h2("PSMA PET vs MRI"),
  p("MRI and PSMA PET are complementary. **MRI** is particularly useful for local prostate anatomy, tumour location within the prostate, extraprostatic extension, seminal-vesicle involvement, local recurrence assessment and biopsy targeting. **PSMA PET** is particularly useful for whole-body staging, lymph-node assessment, bone metastases, distant disease and biochemical recurrence. In selected situations, doctors may use both. See [diagnosis](" + DX + ")."),

  h2("Can PSMA PET Replace a Prostate Biopsy?"),
  p("Usually, no. A biopsy provides **histological confirmation** by examining prostate tissue under a microscope. PSMA PET provides imaging information. A PSMA-avid lesion can be highly suspicious for cancer, but imaging alone does not automatically establish the same pathological information that a biopsy provides."),
  p("The EAU currently recognizes an evolving role for PSMA PET in prostate cancer diagnosis and notes that it may help guide targeted biopsy in selected circumstances."),

  h2("Can PSMA PET Detect Prostate Cancer Inside the Prostate?"),
  p("Yes. PSMA PET can show areas within the prostate with increased PSMA expression. However, prostate MRI remains a major tool for local assessment. Research into combining PSMA PET with MRI is ongoing, and the EAU notes evidence that combined approaches can improve diagnostic performance in selected settings."),

  h2("What Is a PSMA Radiotracer?"),
  p("The radiotracer is a small radioactive molecule designed to bind to PSMA. Different centres may use different tracers depending on regulatory approvals, availability, hospital facilities, local nuclear medicine infrastructure, and production and transport logistics."),
  p("Examples include **Gallium-68 PSMA** and **Fluorine-18 PSMA tracers**. The exact tracer should be recorded in the scan report because imaging protocols and interpretation can vary. For a patient travelling internationally, confirm **which tracer the centre uses** before booking."),
  h3("Gallium-68 PSMA PET/CT"),
  p("Gallium-68 PSMA is widely used in prostate cancer imaging. It has been extensively studied for initial staging, biochemical recurrence, metastatic disease and treatment planning. Several Indian cancer centres offer Ga-68 PSMA PET/CT as part of prostate cancer imaging services."),
  h3("Fluorine-18 PSMA PET/CT"),
  p("Fluorine-18-labelled PSMA tracers are another important option. Some F-18 tracers have longer physical half-lives than Ga-68 tracers, which can influence production and distribution logistics."),

  h2("How to Prepare for a PSMA PET Scan"),
  p("Preparation is generally simpler than preparation for some other PET examinations. Instructions vary depending on the tracer and hospital protocol. Your imaging centre's instructions should always take priority."),
  ul([
    "**Drink water.** Patients are often encouraged to drink water before and after the examination. Hydration helps support renal elimination of the tracer.",
    "**Follow fasting instructions if given.** Unlike FDG PET, PSMA PET does not universally require prolonged fasting. Some centres allow normal eating and drinking. Mayo Clinic notes that patients are generally able to eat and take their usual medicines unless the imaging team provides different instructions.",
    "**Continue regular medicines unless instructed otherwise.** Tell the imaging centre about every medicine and supplement you take.",
    "**Carry previous reports:** PSA, biopsy, MRI, previous CT and bone scans, previous PSMA PET, surgery and radiation records, and a current medication list.",
  ]),
  p("**Should you fast?** Not necessarily. Do not assume that the fasting instructions for an FDG PET scan automatically apply to PSMA PET. **Can you drink water?** Usually yes, unless fluid is restricted for another medical reason. **Can you take regular medicines?** In many cases yes, unless the care team instructs otherwise. Do not independently stop medication before a scan."),

  h2("What Happens on the Day of the Scan?"),
  ol([
    "Registration and confirmation of the clinical indication.",
    "Clinical review of PSA, diagnosis, previous treatment, previous imaging and current medicines.",
    "A small IV line is placed, usually in the arm.",
    "The PSMA radiotracer is administered.",
    "Waiting period — often around an hour, depending on tracer and protocol.",
    "You lie on the PET/CT table. The scan itself may take approximately 30 minutes.",
    "Most patients can leave after the scan unless there is another medical reason for observation.",
  ]),
  img(
    "/uploads/articles/pca-pet-scan.webp",
    "Male patient lying on a PET CT scanner table while a clinician stands beside a gold-spine overlay of the pelvis",
    "Plan for 2–3 hours at the centre. The table time is much shorter than the appointment.",
  ),

  h2("How Long Does a PSMA PET Scan Take?"),
  p("Plan for approximately **2–3 hours at the imaging centre**. The time includes registration, IV placement, tracer injection, uptake period, PET/CT imaging and immediate post-scan instructions. The actual imaging component is generally much shorter than the total appointment. International patients should therefore avoid scheduling another appointment immediately after the scan."),

  h2("Is PSMA PET Scan Painful?"),
  p("The scan itself is painless. The only significant discomfort for most patients is the insertion of the IV cannula. You need to remain still during imaging. Patients who have difficulty lying flat or have severe claustrophobia should tell the imaging team in advance."),

  h2("Is PSMA PET Scan Safe?"),
  p("PSMA PET involves exposure to a small amount of ionizing radiation from the radiotracer and CT component. The test is generally considered safe when clinically indicated. The tracer is present in the body temporarily and is eliminated over time. As with any radiopharmaceutical examination, the decision to perform the scan should consider whether the expected diagnostic benefit justifies radiation exposure."),
  p("Most patients tolerate PSMA tracers well. Serious reactions are uncommon. Tell the imaging team about drug allergies, previous radiotracer reactions, relevant kidney problems and other significant health conditions."),
  p("The radiation exposure from a medically indicated diagnostic PSMA PET/CT is relatively small compared with the potential benefit of obtaining important staging or recurrence information. Radiation exposure is cumulative, so unnecessary scans should be avoided."),

  h2("What Does a PSMA PET Report Show?"),
  p("A PSMA PET report usually contains a detailed description followed by an **impression** or conclusion. It may describe prostate or prostate-bed findings, lymph nodes, bone lesions, visceral organs, other incidental findings and areas of physiological tracer uptake. It may also report an SUV."),
  h3("What is SUV?"),
  p("**SUV stands for Standardized Uptake Value.** It is a quantitative measurement that describes how much radiotracer is concentrated in a particular area. A higher SUV means greater tracer accumulation. **A higher SUV does not automatically mean a more aggressive cancer.** SUV must be interpreted according to the tracer used, location, size of lesion, background activity, CT and MRI findings and clinical history. SNMMI specifically cautions that tracer uptake does not always mean cancer."),
  h3("What does “PSMA-avid” mean?"),
  p("If a report describes a lesion as **PSMA-avid**, it means that the lesion shows increased uptake of the PSMA-targeting radiotracer. This can make the lesion suspicious for prostate cancer. The meaning depends on its location and appearance. PSMA uptake in the kidneys and salivary glands can be normal."),
  h3("What does a positive scan mean?"),
  p("A positive scan means that the imaging findings are suspicious for PSMA-expressing disease. It may show prostate tumour, pelvic lymph-node disease, distant lymph-node disease, bone metastases or other metastatic lesions. The clinical significance depends on the exact location and pattern."),
  h3("What does a negative scan mean?"),
  p("A negative PSMA PET means that no suspicious PSMA-avid disease was identified within the limits of the examination. It does **not** guarantee that there are no cancer cells anywhere in the body. Very small lesions may be below the spatial resolution of PET. Some prostate cancers also express relatively little PSMA and may therefore be less visible."),

  h2("Can PSMA PET Give a False Positive or False Negative?"),
  p("Yes, both can occur. False-positive findings can occur because PSMA expression is not completely exclusive to prostate cancer. Inflammatory processes and some other benign or malignant conditions can produce PSMA uptake."),
  p("No imaging test detects every cancer deposit. SNMMI notes that tumours smaller than approximately 0.5 cm may not always be visible. The EAU notes that small lymph-node metastases below PET's spatial resolution may remain undetected. Therefore: **a negative PSMA PET does not automatically mean there is no prostate cancer.**"),

  h2("Can PSMA PET Detect Small Lymph-Node and Bone Metastases?"),
  p("It can detect many lymph-node metastases, including some that are difficult to identify on conventional imaging. Very small metastatic deposits can still be missed. This is important when deciding whether a patient requires additional treatment such as pelvic lymph-node dissection."),
  p("Bone is one of the most important sites of metastatic prostate cancer. PSMA PET can identify many bone metastases and can also help distinguish prostate-cancer-related lesions from other findings. Interpretation requires attention to lesion location, CT appearance and tracer uptake."),

  h2("PSMA PET for Biochemical Recurrence"),
  p("Biochemical recurrence means that PSA has risen after definitive treatment. PSMA PET has become particularly important in this setting because the scan can sometimes locate recurrence when conventional imaging is still negative. This can change the treatment pathway."),
  ul([
    "**Disease limited to the prostate bed** → salvage local treatment may remain relevant.",
    "**Pelvic lymph-node recurrence** → nodal-directed treatment may be considered.",
    "**Distant metastatic disease** → systemic treatment may become more important.",
  ]),
  p("The EAU reports that PSMA PET/CT can substantially change management intent in selected patients with biochemical recurrence. The likelihood of finding recurrent disease generally increases as PSA rises, but PSMA PET can identify disease at relatively low PSA levels, including below 0.5 ng/mL after prostatectomy. The decision to scan should nevertheless be based on whether the result is likely to affect management."),

  h2("PSMA PET for High-Risk Prostate Cancer"),
  p("Men with high-risk prostate cancer have a greater possibility of lymph-node or distant disease. PSMA PET can therefore provide important staging information before deciding between [surgery](" + RARP + "), [radiation](" + RAD + "), [hormone therapy](" + HT + "), combination treatment or systemic treatment. The 2026 EAU guideline recommends PSMA PET/CT where available for metastatic screening in high-risk localized and locally advanced prostate cancer."),

  h2("Can PSMA PET Change the Treatment Plan?"),
  p("Yes. This is one of the most clinically important benefits. A conventional CT and bone scan might suggest that cancer is confined to the prostate. PSMA PET may reveal previously undetected pelvic lymph nodes, distant lymph nodes, bone metastases or other metastatic sites."),
  p("The ProPSMA trial found greater accuracy with PSMA PET/CT compared with conventional imaging and reported more frequent management changes in the PSMA PET group. Detecting more lesions does not automatically mean that every management change improves survival. The scan should therefore be used within an evidence-based treatment pathway. See [treatment options](" + OPTIONS + ")."),

  h2("PSMA PET Before Surgery, Radiation or Salvage Radiation"),
  p("PSMA PET may be considered in selected men before [radical prostatectomy](" + RARP + "), particularly when there is a meaningful risk of lymph-node or distant disease. A negative scan does not eliminate the possibility of microscopic disease. Surgical decisions should not be based solely on a negative PSMA PET result. GAF Healthcare planning ranges for [radical prostatectomy](" + RP + ") in India are **$7,000–$18,000**, including city pages such as [Delhi NCR prostatectomy](/costs/India/Delhi-NCR/Surgical-Oncology/Radical-Prostatectomy)."),
  p("Before [radiation](" + RAD + "), PSMA PET can help determine whether disease extends beyond the prostate and may influence radiation-field design and whether additional systemic therapy is needed. Planning ranges include [EBRT](" + EBRT + ") **$1,000–$6,000+**, [IMRT](" + IMRT + ") **$6,500–$14,500** and [brachytherapy](" + BRACHY + ") **$5,500–$13,000**."),
  p("When PSA rises after prostatectomy, PSMA PET can help determine whether recurrent disease is confined to the prostate bed, present in pelvic nodes, present outside the pelvis, or widely metastatic. The EAU specifically recommends PSMA PET when its results could influence treatment decisions in biochemical recurrence."),

  h2("PSMA PET Before Lutetium-177 PSMA Therapy"),
  p("PSMA PET is also important in **PSMA-targeted radioligand therapy**. [Lutetium-177 PSMA therapy](" + LU + ") uses a radioactive treatment molecule designed to bind to PSMA-expressing cancer cells. Before treatment, imaging may be used to determine whether the cancer demonstrates sufficient PSMA expression to make PSMA-directed therapy appropriate."),
  p("Therefore, PSMA PET has evolved from being purely diagnostic imaging to also playing a role in selecting patients for certain targeted radioligand treatments. The EANM/SNMMI procedure guideline specifically identifies staging before PSMA radioligand therapy as an important clinical indication."),
  btn("Ask about PSMA PET before Lu-177", consult("PSMA PET before Lu-177")),

  h2("PSMA PET for Monitoring Treatment"),
  p("PSMA PET can sometimes be used to assess treatment response or progression. However, it is not automatically repeated after every treatment cycle. Usefulness depends on treatment type, disease stage, PSA response, symptoms, clinical trial protocol and whether the result will change treatment. The EAU notes that the role of PSMA PET in monitoring systemic treatment is evolving and should be interpreted carefully in advanced disease."),

  h2("Can Hormone Therapy Affect PSMA PET Results?"),
  p("Yes. Hormonal treatment can influence PSMA expression and therefore tracer uptake. PSMA expression may increase temporarily after some forms of androgen deprivation, while treatment response and disease biology can also affect imaging appearance."),
  p("The radiology/nuclear medicine team needs to know whether you are taking ADT, which hormone medicine you are taking, when the treatment started, whether you are receiving chemotherapy, whether you have recently received radiation, and whether you have had previous PSMA imaging. PSMA PET should never be interpreted without knowing the treatment context. [Hormone therapy](" + HT + ") planning ranges on this site are **$1,000–$4,500**."),

  h2("How Much Does PSMA PET Cost in India?"),
  p("The cost of a **PSMA PET/CT scan in India is commonly around ₹15,000–₹30,000**, according to the indicative price published by Apollo Hospitals. For international planning that is roughly **$180–$360** at current conversion — an illustration, not a GAF catalog quotation. GAF Healthcare does not publish a dedicated PSMA PET cost page."),
  p("This should not be treated as a universal national price. The actual quotation can vary depending on city, hospital, nuclear medicine department, type of PSMA tracer, availability, PET/CT equipment, whether contrast CT is included, reporting fees, additional imaging, urgent versus routine scheduling and radiopharmaceutical availability."),
  p("For international patients, it is better to ask for a **written quotation specifying exactly what is included**. Adjacent treatment planning ranges on this site remain [chemotherapy](" + CHEMO + ") **$1,500–$8,000+** if systemic therapy follows the scan."),
  btn("Ask for a written PSMA PET quotation", consult("PSMA PET Cost in India")),
  p("[WhatsApp +91 90443 46292 for tracer, report time and DICOM files](" + wa("Please send a written PSMA PET quotation in India specifying the tracer, whether contrast CT is included, report time and DICOM images.") + ")"),

  h2("PSMA PET Scan Cost in Major Indian Cities"),
  p("Prices can vary even within the same city. International patients commonly consider major medical centres in Delhi NCR, Mumbai, Bengaluru, Chennai and Hyderabad (GAF partner cities), as well as other Indian centres such as Kolkata, Pune and Ahmedabad when a local quotation is already in hand."),
  p("Rather than relying on a generic online price, confirm which tracer is being used, whether the tracer and contrast CT are included, whether the nuclear medicine reporting fee is included, how quickly the report will be available, whether the centre will provide DICOM images, and whether a specialist consultation is included."),

  h2("What Is Included in a PSMA PET Package?"),
  p("A package may include nuclear medicine consultation, radiotracer, IV administration, PET/CT scan, image interpretation and a written report. It may not include oncologist consultation, MRI, biopsy, contrast charges, additional laboratory tests, accommodation, travel or follow-up consultation. International patients should clarify these details before payment."),

  h2("PSMA PET Scan for International Patients in India"),
  ol([
    "**Send the medical records:** PSA trend, biopsy, Gleason score, Grade Group, MRI, previous CT/bone scan, previous PSMA PET, treatment history.",
    "**Confirm the indication** with the receiving nuclear medicine team.",
    "**Confirm tracer availability** — Ga-68 PSMA, F-18 PSMA or another approved tracer.",
    "**Confirm the appointment.** Radiopharmaceutical availability can affect scheduling.",
    "**Complete the scan.** Most patients can return to their accommodation afterwards.",
    "**Obtain the images** as well as the report.",
    "**Review the findings** with the treating urologist, medical oncologist or radiation oncologist.",
  ]),
  p("Patients travelling to India specifically for PSMA PET should plan the visit around the scan rather than arriving without an appointment."),

  h2("What Should You Carry to India for a PSMA PET Scan?"),
  ul([
    "Passport identification and doctor's referral",
    "PSA reports, biopsy report, Gleason score and Grade Group",
    "Histopathology slides or blocks if available",
    "MRI, CT, bone scan and previous PET images",
    "Surgery report, radiation treatment summary, hormone-therapy and chemotherapy records",
    "Current medicines",
  ]),
  p("For recurrence cases, the **PSA timeline** is particularly useful."),
  p("[WhatsApp +91 90443 46292 with your scan files and PSA timeline](" + wa("I would like to share my PSA timeline, biopsy and previous imaging to book a PSMA PET scan in India.") + ")"),

  h2("What Happens After the PSMA PET Scan?"),
  p("The scan itself is only one part of the decision-making process. The treating doctor may combine the findings with PSA, PSA doubling time, Gleason score, Grade Group, pathology, MRI, previous treatment, symptoms and overall health."),
  p("The result may lead to no immediate treatment change, additional MRI, biopsy, salvage radiation, surgery, hormone therapy, systemic treatment, metastasis-directed treatment, or [PSMA-targeted radioligand therapy](" + LU + ") assessment. See [treatment without surgery](" + NONSURG + ") when prostatectomy is not the next step."),

  h2("Important Limitations of PSMA PET"),
  ul([
    "**Small lesions can be missed.** PET has finite spatial resolution.",
    "**Not every prostate cancer expresses high levels of PSMA.** Some aggressive or unusual tumour variants may have relatively low PSMA expression.",
    "**False positives can occur.** PSMA is not completely specific to prostate cancer.",
    "**Physiological uptake can be confusing.** Normal organs can naturally show strong tracer activity.",
    "**A negative scan does not guarantee cure.** Microscopic disease can remain below the detection threshold.",
    "**A positive scan does not automatically determine treatment.** The location and clinical context matter.",
  ]),

  h2("Is PSMA PET Better Than a Bone Scan or CT?"),
  p("For many prostate cancer staging situations, PSMA PET/CT provides more comprehensive molecular information and can be more accurate than conventional CT plus bone scanning. The ProPSMA trial found substantially higher accuracy for PSMA PET/CT compared with conventional imaging in high-risk staging. “Better” does not mean that bone scans have no role. Availability, clinical context, cost and treatment setting still matter."),
  p("CT remains valuable for anatomical assessment. In many prostate cancer staging situations, the two are combined as **PSMA PET/CT** rather than treated as competing tests."),
  p("**PSMA PET** refers to the molecular PET component. **PSMA PET/CT** combines PET with CT. This is why PSMA PET/CT is currently the common term patients encounter when booking the examination. **PSMA PET/MRI** is available at a smaller number of centres and can add MRI soft-tissue detail."),

  h2("10 Things to Confirm Before Booking a PSMA PET Scan in India"),
  ol([
    "Which PSMA tracer will be used?",
    "Is the tracer included in the quoted price?",
    "Is this PET/CT or PET/MRI?",
    "Is contrast CT included?",
    "How long is the expected waiting period after injection?",
    "How long will the complete appointment take?",
    "When will the report be ready?",
    "Will I receive the DICOM images?",
    "Will a nuclear medicine specialist interpret the scan?",
    "Can the centre share the images electronically with my treating oncologist?",
  ]),

  h2("What Makes PSMA PET Important in Modern Prostate Cancer Care?"),
  p("The biggest value of PSMA PET is not simply that it produces a more detailed image. Its value is that it can answer a clinically important question: **where is the prostate cancer?**"),
  p("For a newly diagnosed high-risk patient, that may mean determining whether the cancer has already spread. For a patient after prostatectomy, it may mean finding the source of a rising PSA. For someone after radiation, it may distinguish local recurrence from metastatic disease. For a patient being considered for PSMA-targeted treatment, it may help establish whether the cancer expresses the target needed for that therapy."),
  p("At the same time, PSMA PET has limitations. It should not be interpreted as a perfect cancer detector, and a scan result should never be separated from the patient's PSA, pathology, previous treatment and clinical history."),

  h2("Bottom Line"),
  p("**PSMA PET/CT is an advanced molecular imaging test that can locate prostate cancer with greater sensitivity than conventional imaging in many important clinical settings.**"),
  p("It is particularly useful for staging higher-risk prostate cancer, detecting lymph-node and bone metastases, investigating rising PSA after prostatectomy, evaluating recurrence after radiation, planning salvage treatment, and assessing selected patients for PSMA-targeted radioligand therapy."),
  p("Preparation is usually straightforward. Most patients can continue their normal medicines unless specifically instructed otherwise, and fasting requirements vary by centre and tracer."),
  p("In India, an indicative PSMA PET/CT cost is around **₹15,000–₹30,000**, although the actual price can vary substantially depending on the hospital, city, tracer and services included."),
  p("For international patients, the most important step is not simply finding the cheapest scan. It is confirming that the centre has the appropriate **PSMA tracer, experienced nuclear medicine team, reliable reporting and access to the full digital images** needed by the treating oncologist."),

  h2("Frequently Asked Questions"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Related Prostate Cancer Resources"),
  p("This article is the PSMA PET hub. Other cluster pages keep their own search intent:"),
  ul([
    "[Prostate Cancer Diagnosis](" + DX + ") — how PSA, MRI, biopsy and PSMA PET fit together.",
    "[Lutetium-177 PSMA Therapy in India](" + LU + ") — when the scan is used as a companion diagnostic for radioligand treatment.",
    "[Prostate Cancer Stages 1 to 4](" + STAGES + ") — how imaging feeds TNM and stage group.",
    "[Gleason Score and Grade Group](" + GG + ") — the microscope map still on the pathology report.",
    "[Prostate Cancer Recurrence After Surgery](" + RECUR + ") — rising PSA after prostatectomy.",
    "[Radiation Therapy for Prostate Cancer](" + RAD + ") — when the scan changes radiation fields.",
    "[Robotic Prostatectomy in India](" + RARP + ") — surgery after staging.",
    "[Prostate Cancer Treatment Options](" + OPTIONS + ") — what happens after the report.",
    "[Prostate Cancer Treatment Without Surgery](" + NONSURG + ") — systemic and radiation options.",
    "[Prostate Cancer Diet](" + DIET + ") — eating around later treatment.",
    "[Prostate Cancer Treatment in India](" + PILLAR + ") — coordinated staging and theranostics.",
  ]),

  h2("How GAF Healthcare Can Help"),
  p("GAF Healthcare coordinates international patients who need a PSMA PET/CT in India as part of staging, a rising PSA, or a Lu-177 work-up. Share the PSA timeline, the full biopsy PDF, MRI and previous PET files rather than printed summaries only, and the treatment history including ADT. A coordinator can introduce a [medical oncologist](" + MED_DOCS + "), [radiation oncologist](" + RAD_DOCS + ") or [uro-oncologist](" + SURG_DOCS + "), then help collect a written quotation that states the tracer, whether contrast CT is included, report time and DICOM access."),
  btn("Share records for a PSMA PET booking", consult("PSMA PET Scan")),
  p("[WhatsApp +91 90443 46292 with your PSA, Grade Group and previous scans](" + wa("I would like to share my PSA, Grade Group and imaging to arrange a PSMA PET scan in India.") + ")"),

  h2("Medical Disclaimer"),
  p("This article is for educational purposes and does not replace medical consultation. The decision to perform a PSMA PET scan depends on the patient's diagnosis, PSA level and trend, cancer risk group, previous treatment, imaging findings and intended treatment plan."),
  p("A PSMA PET result should be interpreted by an appropriately qualified nuclear medicine physician or radiologist together with the treating urologist or oncologist. Patients should not make treatment decisions based solely on an imaging report."),

  h2("Top 5 Sources"),
  p("1. [EAU Guidelines — Diagnostic Evaluation of Prostate Cancer](https://uroweb.org/guidelines/prostate-cancer/chapter/diagnostic-evaluation) — PSMA PET/CT for initial staging, biochemical recurrence and metastatic assessment."),
  p("2. [EAU Guidelines — Prostate Cancer Treatment](https://uroweb.org/guidelines/prostate-cancer/chapter/treatment) — PSMA PET/CT in biochemical recurrence and treatment planning."),
  p("3. [SNMMI — PSMA PET/CT for Prostate Cancer Patients](https://snmmi.org/Patients/Patients/PSMA-PET-CT-for-Prostate-Cancer-Patients.aspx) — patient-focused explanation of tracers, the scanning process, uptake and limitations."),
  p("4. [SNMMI/EANM — PSMA PET/CT Procedure Guideline](https://sites.snmmi.org/common/Uploaded%20files/Web/Clinical%20Practice/Procedure%20Standards/2023-01-09/PSMA%20PET%20Guideline%202.0%201.17.23%20PDF%20for%20website.pdf) — indications, staging, recurrence and assessment before PSMA-targeted radioligand therapy."),
  p("5. [Apollo Hospitals — PSMA PET/CT Scan](https://www.apollohospitals.com/procedures/psma-petct-scan) — practical information on preparation, procedure and an indicative India cost range."),
  p("**Last reviewed against the cited sources: September 2026.**"),
];

const now = "2026-09-28T10:00:00.000Z";
const SLUG = "psma-pet-scan-for-prostate-cancer";

const article = {
  id: "art_psma_pet_scan_for_prostate_cancer",
  slug: SLUG,
  title: "PSMA PET Scan for Prostate Cancer: Uses, Preparation and Cost in India",
  excerpt:
    "PSMA PET is molecular imaging, not a better CT. When EAU recommends it, why it does not replace MRI or biopsy, how to prepare, and why Indian prices need a written quotation.",
  date: "28 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Medical Oncology",
  tags: ["prostate cancer", "PSMA PET", "staging", "biochemical recurrence", "Ga-68 PSMA", "India"],
  image: "/uploads/articles/pca-pet-anatomy.webp",
  imageAlt:
    "Transparent male body with a gold prostate, teal pelvic nodes and gold spinal traces used to explain PSMA PET staging",
  status: "published",
  featured: true,
  seoTitle: "PSMA PET Scan for Prostate Cancer: Uses, Preparation, Cost in India",
  seoDescription:
    "PSMA PET/CT for staging and rising PSA: it does not replace MRI or biopsy. Preparation, 2–3 hour appointments, Ga-68 vs F-18 tracers, and ₹15,000–₹30,000 as an indicative India range.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/pca-pet-anatomy.webp",
  allowIndex: true,
  keywords: [
    "PSMA PET scan for prostate cancer",
    "PSMA PET CT India",
    "PSMA PET cost India",
    "Ga-68 PSMA",
    "PSMA PET biochemical recurrence",
    "PSMA PET staging",
    "PSMA-avid",
    "PSMA PET vs MRI",
    "PSMA PET after prostatectomy",
    "PSMA PET preparation",
    "ProPSMA trial",
  ],
  relatedLinks: [
    { label: "Prostate cancer diagnosis", href: DX },
    { label: "Lutetium-177 PSMA therapy in India", href: LU },
    { label: "Prostate cancer stages 1 to 4", href: STAGES },
    { label: "Prostate cancer recurrence after surgery", href: RECUR },
    { label: "Prostate Cancer Treatment in India", href: PILLAR },
  ],
  blocks,
};

if (!store.categories.includes("Medical Oncology")) store.categories.push("Medical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["pca-pet-anatomy.webp", article.imageAlt],
  [
    "pca-pet-scan.webp",
    "Male patient lying on a PET CT scanner table while a clinician stands beside a gold-spine overlay of the pelvis",
  ],
  [
    "pca-pet-organs.webp",
    "Transparent male figure with gold salivary glands, teal kidneys and bladder and a gold prostate used to explain normal PSMA uptake",
  ],
  [
    "pca-pet-recur.webp",
    "Male patient in clinic with a gold prostate-bed overlay, teal pelvic nodes and gold spine while a clinician explains a rising PSA",
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

const petLink = { label: "PSMA PET scan for prostate cancer", href: PET };
for (const siblingId of [
  "art_lutetium_177_psma_therapy_in_india",
  "art_prostate_cancer_stages_1_to_4",
  "art_gleason_score_grade_group_prostate_cancer",
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
  if (!sibling.relatedLinks.some((row) => row.href === PET)) {
    sibling.relatedLinks.unshift(petLink);
  }
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
const treatment = treatments.treatments.find((row) => row.slug === "prostate-cancer-treatment-in-india");
if (treatment?.translations?.en?.editorialBody && !treatment.translations.en.editorialBody.includes(PET)) {
  treatment.translations.en.editorialBody = treatment.translations.en.editorialBody.replace(
    "Eligibility, cycles and cost for radioligand treatment are covered in [Lutetium-177 PSMA Therapy in India](/blogs/lutetium-177-psma-therapy-in-india).",
    "Eligibility, cycles and cost for radioligand treatment are covered in [Lutetium-177 PSMA Therapy in India](/blogs/lutetium-177-psma-therapy-in-india). How PSMA PET is booked, prepared and priced in India is covered in [PSMA PET Scan for Prostate Cancer](/blogs/psma-pet-scan-for-prostate-cancer).",
  );
  writeFileSync(treatmentsPath, `${JSON.stringify(treatments, null, 2)}\n`);
  console.log("linked PSMA PET blog from treatment editorial");
}

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes("psma-pet-scan-for-prostate-cancer")) {
  llms = llms.replace(
    "and [Lutetium-177 PSMA therapy in India](https://gaf.healthcare/blogs/lutetium-177-psma-therapy-in-india).",
    ", [Lutetium-177 PSMA therapy in India](https://gaf.healthcare/blogs/lutetium-177-psma-therapy-in-india) and [PSMA PET scan for prostate cancer](https://gaf.healthcare/blogs/psma-pet-scan-for-prostate-cancer).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}
