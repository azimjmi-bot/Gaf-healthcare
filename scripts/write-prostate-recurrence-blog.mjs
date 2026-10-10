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
const EBRT = "/costs/India/Radiation-Oncology/EBRT";
const IMRT = "/costs/India/Radiation-Oncology/IMRT";
const HT = "/costs/India/Medical-Oncology/Hormone-Therapy";
const RP = "/costs/India/Surgical-Oncology/Radical-Prostatectomy";
const RAD_DOCS = "/doctors/India/Radiation-Oncology";
const SURG_DOCS = "/doctors/India/Surgical-Oncology";
const RAD_HOSP = "/hospitals/India/Radiation-Oncology";

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

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body"><strong>Prostate cancer recurrence after surgery is usually first detected through a rising PSA level rather than symptoms.</strong> After radical prostatectomy, PSA is expected to fall to an undetectable or very low level because the prostate has been removed.</p><p class="article-quick-answer__body">A confirmed PSA rise does not automatically mean that cancer has spread. The recurrence may be microscopic and confined to the prostate bed or nearby tissues, or it may involve pelvic lymph nodes or distant parts of the body.</p><p class="article-quick-answer__body">Doctors assess the <strong>PSA trend, PSA doubling time, original Gleason Grade Group, surgical margins, pathological stage, lymph-node status, time since surgery, and imaging findings</strong> before deciding what to do next.</p><p class="article-quick-answer__body">For men with biochemical recurrence after radical prostatectomy, <strong>early salvage radiation therapy can potentially treat recurrent disease while it is still limited</strong>, and current guidelines emphasize that salvage radiation is more effective when delivered at lower PSA levels. PSMA PET/CT may help identify where recurrent disease is located and guide treatment planning.</p></aside>`;

const riskTable = `<div class="md-body"><table><thead><tr><th>Factor</th><th>Why it matters</th></tr></thead><tbody><tr><td>Gleason Grade Group</td><td>Higher-grade cancer generally carries greater recurrence risk</td></tr><tr><td>Pathological stage</td><td>Cancer extending outside the prostate increases concern</td></tr><tr><td>Surgical margins</td><td>Positive margins can indicate cancer cells at the edge of the removed specimen</td></tr><tr><td>Seminal vesicle invasion</td><td>Associated with higher-risk disease</td></tr><tr><td>Lymph-node involvement</td><td>Indicates regional spread</td></tr><tr><td>PSA persistence</td><td>Detectable PSA immediately after surgery may indicate residual disease</td></tr><tr><td>PSA doubling time</td><td>Faster PSA growth is generally more concerning</td></tr><tr><td>Time to recurrence</td><td>Earlier recurrence can indicate higher-risk biology</td></tr><tr><td>Genomic classifier</td><td>May provide additional prognostic information in selected patients</td></tr><tr><td>PSMA PET findings</td><td>Can help identify the location of recurrent disease</td></tr></tbody></table></div>`;

const situationTable = `<div class="md-body"><table><thead><tr><th>Situation</th><th>Meaning</th></tr></thead><tbody><tr><td>Detectable/rising PSA</td><td>PSA suggests possible residual or recurrent disease</td></tr><tr><td>Biochemical recurrence</td><td>PSA meets the accepted biochemical criteria for recurrence</td></tr><tr><td>Local recurrence</td><td>Cancer appears to have returned near the prostate bed</td></tr><tr><td>Regional recurrence</td><td>Cancer involves nearby pelvic lymph nodes</td></tr><tr><td>Distant recurrence</td><td>Cancer has spread to distant sites</td></tr><tr><td>Metastatic recurrence</td><td>Recurrent cancer is found outside the original local/regional area</td></tr></tbody></table></div>`;

const faqs = [
  ["What is the first sign of prostate cancer recurrence after surgery?", "The most common first sign is a rising PSA level. Biochemical recurrence can occur before symptoms or visible disease on imaging."],
  ["What PSA level indicates recurrence after prostatectomy?", "A commonly used AUA definition is PSA ≥0.2 ng/mL followed by a confirmatory value of ≥0.2 ng/mL. However, doctors may discuss salvage treatment before PSA reaches 0.2 ng/mL in selected high-risk patients."],
  ["Is a PSA of 0.2 after prostatectomy recurrence?", "A confirmed PSA of 0.2 ng/mL or higher is commonly used to define biochemical recurrence after radical prostatectomy. The overall PSA trend and clinical risk factors still need to be considered."],
  ["Can prostate cancer return after the prostate is removed?", "Yes. Microscopic cancer cells may remain after surgery or cancer may recur later in the prostate bed, lymph nodes or distant sites."],
  ["How quickly should salvage radiation be given?", "When salvage radiation is appropriate, current AUA guidance emphasizes giving it at a lower PSA level, with treatment recommended when PSA is ≤0.5 ng/mL and consideration of treatment below 0.2 ng/mL in selected high-risk patients."],
  ["Can salvage radiation cure prostate cancer recurrence?", "It can potentially provide long-term disease control and may be curative when recurrent disease remains localized or limited. It is not successful in every patient."],
  ["Do I need a PSMA PET scan if PSA is rising?", "Not necessarily. PSMA PET is particularly useful when the results can influence treatment planning. Guidelines increasingly recommend molecular PET imaging for selected patients with biochemical recurrence."],
  ["Can PSMA PET miss recurrent prostate cancer?", "Yes. Very small-volume disease may be below the detection capability of imaging, particularly at very low PSA levels."],
  ["What if PSMA PET is negative but PSA keeps rising?", "A negative scan does not automatically exclude microscopic recurrence. Salvage radiation may still be appropriate in selected patients."],
  ["Does biochemical recurrence mean the cancer has spread?", "No. Biochemical recurrence means PSA suggests persistent or recurrent disease. It does not by itself establish that cancer has spread to distant organs."],
  ["Is radiation always combined with hormone therapy?", "No. Some patients receive salvage radiation alone, while patients with higher-risk features may be offered ADT alongside radiation."],
  ["Can prostate cancer recur 10 years after surgery?", "Yes. Recurrence can occur many years after radical prostatectomy, which is why long-term PSA surveillance is important."],
  ["What does a short PSA doubling time mean?", "A short PSA doubling time means PSA is increasing relatively quickly. It is generally considered a higher-risk feature and can influence decisions about imaging and treatment."],
  ["Is another prostatectomy possible after recurrence?", "Because the prostate has already been removed, another prostatectomy is generally not the standard treatment for biochemical recurrence after radical prostatectomy. Salvage radiation and/or systemic therapy are more commonly considered depending on the location of recurrence."],
  ["Can recurrent prostate cancer be treated without symptoms?", "Yes. Biochemical recurrence is often detected through PSA before symptoms develop. Treatment decisions can therefore be made before clinically obvious recurrence occurs."],
  ["Should I get a second opinion after PSA recurrence?", "A second opinion can be particularly useful when deciding between observation, salvage radiation, ADT, advanced imaging or multidisciplinary treatment. Reviewing the original pathology and PSA history is often an important part of that assessment."],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("This is the recurrence and PSA-after-surgery hub for the prostate cluster. It sits beside [Robotic Prostatectomy in India](" + RARP + "), [Radiation Therapy for Prostate Cancer](" + RAD + "), [brachytherapy](" + BRACHY_BLOG + "), [treatment without surgery](" + NONSURG + "), [treatment options](" + OPTIONS + "), [Prostate Cancer Diet](" + DIET + ") and [Prostate Cancer Treatment in India](" + PILLAR + ")."),
  p("International patients comparing [radiation oncologists](" + RAD_DOCS + ") and [surgical oncologists](" + SURG_DOCS + ") commonly start with [Delhi NCR](/doctors/India/Delhi-NCR/Radiation-Oncology), [Mumbai](/doctors/India/Mumbai/Surgical-Oncology), [Bengaluru](/doctors/India/Bengaluru/Radiation-Oncology), [Chennai](/doctors/India/Chennai/Radiation-Oncology) and [Hyderabad](/doctors/India/Hyderabad/Surgical-Oncology)."),
  btn("Ask about a rising PSA after prostatectomy", consult("Prostate Cancer Recurrence After Surgery")),
  p("[WhatsApp +91 90443 46292 with your PSA dates and pathology report](" + wa("My PSA is rising after prostatectomy. Please review my PSA dates, pathology and scans for a second opinion in India.") + ")"),
  img(
    "/uploads/articles/pca-recur-anatomy.webp",
    "Transparent male body with a gold highlight on the empty pelvic bed after prostatectomy and teal pelvic nodes",
    "After the prostate is removed, PSA should fall very low. A later rise is how recurrence is usually found — often before any scan shows a tumour.",
  ),

  h2("What Does Prostate Cancer Recurrence After Surgery Mean?"),
  p("[Radical prostatectomy](" + RARP + ") removes the prostate and usually the seminal vesicles. Nearby lymph nodes may also be removed depending on the patient's risk and surgical plan."),
  p("After surgery, doctors monitor PSA to look for evidence that prostate cancer may still be present or has returned."),
  p("If PSA becomes detectable or begins rising after previously becoming undetectable, doctors may investigate for **biochemical recurrence**, sometimes called biochemical relapse."),
  p("Importantly, biochemical recurrence does not necessarily mean that cancer is visible on a scan."),
  p("Cancer cells can be present at levels too small for conventional imaging to detect. PSA may therefore become abnormal before a recurrence produces symptoms or a visible tumor."),

  h2("Can Prostate Cancer Come Back After Prostatectomy?"),
  p("Yes."),
  p("Radical prostatectomy is intended to remove localized prostate cancer completely, but some men subsequently develop a rising PSA."),
  p("Recurrence can happen because microscopic cancer cells were already outside the area removed during surgery or because a small amount of cancer remained locally."),
  p("The recurrence may occur:"),
  ul([
    "In the prostate bed",
    "In nearby tissues",
    "In pelvic lymph nodes",
    "In distant lymph nodes",
    "In bones",
    "In other organs",
  ]),
  p("The location matters because treatment can be very different for a small local recurrence compared with metastatic recurrence."),
  p("The EAU notes that PSA recurrence can occur years after treatment, including long after the initial operation."),

  h2("PSA After Prostatectomy: What Should Happen?"),
  p("After radical prostatectomy, PSA should fall to a very low or undetectable level."),
  p("The EAU states that PSA is generally expected to be undetectable around two months after radical prostatectomy. The American Cancer Society similarly notes that doctors commonly wait at least 6–8 weeks after surgery before checking PSA because PSA can remain in the bloodstream for several weeks."),
  p("The exact timing of the first PSA test varies between clinicians."),
  p("The important point is that **PSA should become very low after the prostate has been removed.**"),

  h2("What Does a Rising PSA After Prostatectomy Mean?"),
  p("A rising PSA after prostatectomy can have different meanings."),
  p("It may represent:"),
  ol([
    "**PSA persistence** — PSA never became undetectable after surgery.",
    "**Biochemical recurrence** — PSA became undetectable and later became detectable and rises.",
    "**Very-low-level detectable PSA** — an ultrasensitive test detects a tiny amount that may not yet represent clinically significant recurrence.",
    "**Established recurrent disease** — imaging or other testing identifies cancer.",
  ]),
  p("These situations should not be treated as identical."),
  p("The PSA number needs to be interpreted together with its **trend and the patient's pathology and risk factors**."),
  img(
    "/uploads/articles/pca-recur-psa.webp",
    "Male patient in clinic with a gold pelvic-bone overlay while a clinician reviews PSA results on a tablet",
    "One low PSA value is not a plan. Doctors look at the trend, doubling time and the original pathology before deciding on scans or salvage treatment.",
  ),

  h2("What Is Biochemical Recurrence After Prostatectomy?"),
  p("The commonly used AUA definition of biochemical recurrence after radical prostatectomy is a PSA of **≥0.2 ng/mL followed by a confirmatory PSA of ≥0.2 ng/mL**."),
  p("However, modern practice is more nuanced than simply waiting until PSA reaches 0.2 ng/mL."),
  p("The 2024 AUA/ASTRO/SUO Salvage Therapy Guideline emphasizes that salvage radiation is more effective when PSA is lower. It recommends providing salvage radiation when PSA is **≤0.5 ng/mL** when salvage radiation is being considered, and says clinicians may offer it at PSA levels below 0.2 ng/mL in patients with high-risk features."),
  p("This creates an important distinction:"),
  p("**The PSA level used to define biochemical recurrence is not necessarily the PSA level at which doctors should wait before considering treatment.**"),
  p("Treatment decisions are individualized."),

  h2("PSA Persistence vs PSA Recurrence"),
  p("These terms are sometimes confused."),
  h3("PSA persistence"),
  p("PSA remains detectable after surgery and never reaches the expected undetectable level."),
  p("Persistent PSA can suggest that prostate cancer cells remain somewhere in the body, although the precise cause requires clinical assessment."),
  h3("PSA recurrence"),
  p("PSA initially becomes undetectable and later becomes detectable and starts increasing."),
  p("This pattern can indicate that prostate cancer has returned."),
  p("The distinction is important because persistent PSA may carry a different risk profile and can lead to earlier investigation and treatment planning."),

  h2("Does One PSA Rise Mean Prostate Cancer Has Returned?"),
  p("Not necessarily."),
  p("A single low PSA measurement should be interpreted carefully."),
  p("Modern ultrasensitive PSA tests can detect extremely small quantities of PSA. A very low detectable result does not automatically prove clinically significant recurrent cancer."),
  p("Doctors may repeat the PSA test and look for a **consistent upward trend**."),
  p("The NCI specifically notes that one elevated PSA measurement after treatment does not always mean recurrence and that doctors may repeat PSA or perform additional tests."),
  p("This is especially relevant when PSA is detectable at a very low level."),

  h2("Why PSA Trend Matters More Than One Number"),
  p("Doctors often look at how PSA behaves over time."),
  p("For example:"),
  p("**PSA pattern A**"),
  p("0.04 → 0.05 → 0.04"),
  p("This is different from:"),
  p("**PSA pattern B**"),
  p("0.04 → 0.08 → 0.14 → 0.22"),
  p("The second pattern demonstrates a clearer upward trend."),
  p("The speed of increase can also provide important prognostic information."),

  h2("What Is PSA Doubling Time?"),
  p("**PSA doubling time (PSADT)** estimates how quickly the PSA level doubles."),
  p("A shorter doubling time generally indicates more biologically active disease and is associated with a higher risk of progression."),
  p("A longer doubling time generally indicates slower PSA progression."),
  p("For example, a PSA that doubles over several years represents a different clinical situation from a PSA that doubles within a few months."),
  p("The AUA/ASTRO/SUO guideline specifically identifies PSA doubling time as an important prognostic factor when assessing men with detectable PSA after prostatectomy."),

  h2("Why Can PSA Rise Even After the Prostate Has Been Removed?"),
  p("The prostate is the major source of PSA, but extremely small amounts of PSA can be detected after treatment."),
  p("When PSA becomes persistently detectable or rises over time following prostatectomy, doctors become concerned about residual or recurrent prostate cancer."),
  p("The possible locations include:"),
  ul(["Prostate bed", "Seminal-vesicle region", "Pelvic lymph nodes", "Distant lymph nodes", "Bone", "Other metastatic sites"]),
  p("Imaging is used when it can help determine the likely location and influence treatment."),

  h2("Risk Factors for Prostate Cancer Recurrence After Surgery"),
  p("Not every patient has the same recurrence risk."),
  p("Doctors consider the original pathology report and postoperative PSA history."),
  p("Important factors include:"),
  html(riskTable),
  p("The AUA specifically recommends using factors such as PSA doubling time, Grade Group, pathological stage, surgical margins, genomic classifiers and PET findings when counselling patients with detectable PSA."),

  h2("Positive Surgical Margins: Do They Mean the Cancer Will Come Back?"),
  p("No."),
  p("A **positive surgical margin** means cancer cells were found at the edge of the tissue removed during prostatectomy."),
  p("It increases concern about residual local disease, but it does not mean recurrence is inevitable."),
  p("Some men with positive margins never develop biochemical recurrence."),
  p("Doctors therefore consider margin status together with PSA, Grade Group, pathological stage and other risk factors rather than using it alone to decide treatment."),

  h2("How Is Prostate Cancer Recurrence Diagnosed?"),
  p("The evaluation usually begins with PSA monitoring."),
  p("Depending on the patient's situation, doctors may use:"),
  ul([
    "Repeat PSA testing",
    "PSA doubling time calculation",
    "Review of the original pathology",
    "Digital examination when clinically appropriate",
    "Pelvic MRI",
    "PSMA PET/CT",
    "Other PET imaging",
    "CT or bone imaging in selected situations",
    "Biopsy in selected cases",
  ]),
  p("The purpose is not simply to prove that PSA is rising."),
  p("The larger question is:"),
  p("**Where is the recurrent cancer, and can it still be treated with curative intent?**"),
  btn("Send PSA dates and pathology for a recurrence review", consult("Prostate Cancer Recurrence After Surgery")),

  h2("PSMA PET/CT for Prostate Cancer Recurrence"),
  p("PSMA PET/CT has become an important tool in evaluating biochemical recurrence."),
  p("PSMA is a protein found at higher levels on many prostate cancer cells."),
  p("A radioactive tracer targeting PSMA can highlight areas suspicious for prostate cancer on PET imaging."),
  p("The scan may identify:"),
  ul(["Local recurrence", "Pelvic lymph-node disease", "Distant lymph nodes", "Bone metastases", "Other metastatic disease"]),
  img(
    "/uploads/articles/pca-recur-psma.webp",
    "Male patient on a PET imaging couch with a gold pelvic overlay used to explain PSMA scanning after a PSA rise",
    "PSMA PET can show local, nodal or distant recurrence — and a negative scan still does not prove there is no microscopic disease.",
  ),
  p("The AUA/ASTRO/SUO guideline recommends next-generation molecular PET imaging for men with biochemical recurrence after prostatectomy when salvage radiation is being considered."),
  p("The EAU recommends PSMA PET/CT after radical prostatectomy when PSA is above 0.2 ng/mL and the result could influence subsequent treatment decisions."),
  p("[WhatsApp +91 90443 46292 if you already have a PSMA PET](" + wa("I have a rising PSA after prostatectomy and a PSMA PET. Please advise whether salvage radiation in India is appropriate.") + ")"),

  h2("Can PSMA PET Be Negative Even When PSA Is Rising?"),
  p("Yes."),
  p("A negative PSMA PET does not necessarily mean there is no recurrent prostate cancer."),
  p("Small-volume disease may be below the detection capability of the scan."),
  p("This is particularly important when PSA is very low."),
  p("The AUA guideline specifically states that salvage prostate-bed radiation should **not be withheld solely because PET/CT is negative** when the clinical situation supports salvage radiation."),
  p("This is one reason PSA kinetics, pathology and imaging must be interpreted together."),

  h2("Is MRI Useful After Prostatectomy?"),
  p("Yes, particularly when doctors are assessing the prostate bed for possible local recurrence."),
  p("MRI can provide detailed anatomical information and may complement PSMA PET."),
  p("The AUA guideline states that pelvic MRI may be obtained in addition to PET/CT when evaluating suspected local recurrence."),
  p("MRI can be particularly useful when the clinical question is whether recurrence is confined to the surgical bed."),

  h2("Does Everyone With Rising PSA Need a PSMA PET Scan?"),
  p("No."),
  p("The decision depends on:"),
  ul([
    "PSA level",
    "PSA trend",
    "PSA doubling time",
    "Original cancer risk",
    "Pathology",
    "Previous treatments",
    "Whether imaging will change treatment",
    "Availability and cost",
    "Local clinical practice",
  ]),
  p("Imaging is most useful when its findings can change the treatment plan."),

  h2("What Is Salvage Radiation Therapy?"),
  p("**Salvage radiation therapy (SRT)** is radiation given after prostatectomy when there is evidence or significant suspicion that prostate cancer remains or has returned."),
  p("The goal can be to eliminate microscopic cancer cells before they develop into more extensive disease."),
  p("When recurrence is believed to be confined to the prostate bed or nearby pelvic region, salvage radiation may be considered with curative intent."),
  p("The American Cancer Society describes radiation after prostatectomy as an option when cancer was not completely removed or returns after surgery."),
  p("See [Radiation Therapy for Prostate Cancer](" + RAD + ") for how IMRT, IGRT and VMAT are planned. GAF Healthcare planning ranges for [EBRT](" + EBRT + ") are **$1,000–$6,000+** and for [IMRT](" + IMRT + ") **$6,500–$14,500**; salvage fields are quoted after the radiation oncologist sees the PSA trend and imaging."),
  img(
    "/uploads/articles/pca-recur-salvage.webp",
    "Male patient on a radiotherapy couch with a gold pelvic overlay showing a salvage treatment field after prostatectomy",
    "Salvage radiation is generally more effective at a lower PSA. A negative PET is not, by itself, a reason to withhold prostate-bed treatment.",
  ),
  btn("Ask whether salvage radiation is appropriate", consult("Salvage Radiation After Prostatectomy")),

  h2("Why Is Early Salvage Radiation Important?"),
  p("Timing matters."),
  p("The AUA/ASTRO/SUO guideline states that salvage radiation is more effective when administered at lower PSA levels and recommends offering salvage radiation when PSA is **≤0.5 ng/mL** in patients for whom salvage radiation is being considered."),
  p("For patients with high-risk features, treatment may be considered even below 0.2 ng/mL."),
  p("This does **not** mean every man with a PSA of 0.2 needs immediate radiation."),
  p("Instead, it means that doctors generally should not wait for PSA to become substantially higher before discussing salvage treatment when the overall clinical picture supports it."),

  h2("Salvage Radiation vs Waiting for a Higher PSA"),
  p("The modern approach has moved toward **early salvage treatment rather than automatically waiting for obvious clinical recurrence**."),
  p("Studies comparing routine adjuvant radiation with early salvage radiation have found that many men can avoid immediate radiation and its side effects while still receiving radiation if PSA subsequently rises."),
  p("For example, the GETUG-AFU 17 randomized trial found no significant event-free survival advantage for routine adjuvant radiation over early salvage radiation in its study population, while late genitourinary toxicity and erectile dysfunction were higher with adjuvant radiation."),
  p("This supports an individualized strategy rather than automatically irradiating every patient with adverse pathological features."),

  h2("What Areas Are Treated During Salvage Radiation?"),
  p("The radiation plan depends on where recurrence is suspected."),
  p("It may include:"),
  ul(["Prostate bed", "Pelvic lymph nodes", "PSMA-positive lymph nodes", "Selected areas of suspected recurrence"]),
  p("The AUA guideline recommends incorporating PET-positive pelvic nodal disease into the radiation plan when appropriate."),
  p("Modern radiation techniques may include:"),
  ul(["IMRT", "VMAT", "Image-guided radiation therapy", "PET/MRI-informed planning in selected centers"]),
  p("The exact field, dose and treatment schedule depend on the patient's disease characteristics and radiation oncology plan. Compare [radiation hospitals](" + RAD_HOSP + ") in [Delhi NCR](/hospitals/India/Delhi-NCR/Radiation-Oncology), [Mumbai](/hospitals/India/Mumbai/Radiation-Oncology) and [Chennai](/hospitals/India/Chennai/Radiation-Oncology)."),

  h2("Does Salvage Radiation Always Include Hormone Therapy?"),
  p("No."),
  p("Some men receive salvage radiation alone."),
  p("Others receive **androgen deprivation therapy (ADT)** alongside radiation."),
  p("The decision depends on recurrence risk."),
  p("The AUA/ASTRO/SUO guideline recommends adding ADT to salvage radiation for patients with high-risk features such as:"),
  ul([
    "Higher post-prostatectomy PSA",
    "Grade Group 4–5 disease",
    "PSA doubling time ≤6 months",
    "Persistently detectable postoperative PSA",
    "Seminal vesicle involvement",
  ]),
  p("For patients without high-risk features, radiation alone may be appropriate."),
  p("GAF Healthcare planning ranges for [hormone therapy](" + HT + ") in India are **$1,000–$4,500**. City pages use the same national ranges unless a hospital issues a verified quotation: [Delhi NCR](/costs/India/Delhi-NCR/Medical-Oncology/Hormone-Therapy), [Mumbai](/costs/India/Mumbai/Medical-Oncology/Hormone-Therapy)."),
  p("[WhatsApp +91 90443 46292 about radiation with or without ADT](" + wa("Please advise whether salvage radiation after prostatectomy should include hormone therapy in my case.") + ")"),

  h2("What Is Hormone Therapy Doing in This Situation?"),
  p("Prostate cancer cells often depend on androgen signalling."),
  p("ADT reduces androgen stimulation and can slow or suppress prostate cancer growth."),
  p("When combined with salvage radiation in selected higher-risk patients, ADT may improve cancer control."),
  p("However, ADT has its own effects and potential side effects."),
  p("These can include:"),
  ul([
    "Hot flashes",
    "Reduced libido",
    "Erectile difficulties",
    "Fatigue",
    "Changes in body composition",
    "Bone-density loss",
    "Metabolic changes",
    "Mood changes",
  ]),
  p("The duration and choice of hormone therapy should therefore be individualized. [Prostate Cancer Diet](" + DIET + ") covers protein, bone health and weight while ADT is running."),

  h2("Can Salvage Radiation Cure Recurrent Prostate Cancer?"),
  p("In selected men, yes."),
  p("The possibility of long-term disease control is greatest when recurrence remains localized or limited and treatment is started while PSA is still low."),
  p("However, salvage radiation is not guaranteed to eliminate the disease."),
  p("Its potential effectiveness depends on factors such as:"),
  ul([
    "PSA before radiation",
    "PSA doubling time",
    "Grade Group",
    "Pathological stage",
    "Surgical margins",
    "Seminal vesicle involvement",
    "Lymph-node status",
    "PSMA PET findings",
    "Whether disease is local or metastatic",
  ]),
  p("The EAU guideline describes early salvage radiation as potentially curative for men with increasing PSA after prostatectomy."),

  h2("What If PSMA PET Shows Pelvic Lymph Nodes?"),
  p("A PSMA-positive pelvic lymph node can change the radiation plan."),
  p("Rather than treating only the prostate bed, the radiation oncologist may incorporate the affected lymph nodes into the treatment field."),
  p("ADT may also be considered depending on the overall risk profile."),
  p("This is one of the major advantages of molecular imaging: treatment can be planned using more information about where the recurrent disease is located."),
  p("However, PSMA-positive findings still need to be interpreted in clinical context."),

  h2("What If the Recurrence Has Spread to Distant Sites?"),
  p("If PSMA PET or other imaging shows distant metastatic disease, treatment usually shifts from purely local salvage treatment toward systemic management."),
  p("Possible treatments may include:"),
  ul([
    "[ADT](" + HT + ")",
    "Androgen-receptor pathway inhibitors",
    "Chemotherapy",
    "Radiation to selected metastatic sites",
    "PSMA-targeted radioligand therapy in appropriate patients",
    "Other systemic or targeted treatments based on tumor characteristics",
  ]),
  p("The exact treatment depends on whether the disease remains hormone-sensitive or has become castration-resistant, where the metastases are located, previous treatments and other clinical factors. See [Prostate Cancer Treatment in India](" + PILLAR + ") for how Lutetium-177 PSMA therapy sits in the wider pathway."),

  h2("Can Recurrence Be Treated Without Another Surgery?"),
  p("Yes."),
  p("After radical prostatectomy, a second prostate surgery is generally not the standard approach for biochemical recurrence."),
  p("Because the prostate has already been removed, salvage radiation is often the principal local treatment when recurrence is believed to be confined to the prostate bed."),
  p("Systemic treatment may be used when disease is more extensive."),
  p("Original [radical prostatectomy](" + RP + ") planning ranges in India are **$7,000–$18,000**; a rising PSA is a new problem and should not be quoted from the first operation package."),

  h2("Can Prostate Cancer Recurrence Be Treated Without Radiation?"),
  p("Sometimes."),
  p("Observation may be reasonable in selected patients with low-risk biochemical recurrence, particularly when PSA is rising slowly and the expected benefit of immediate treatment is limited."),
  p("Systemic therapy may be used when the recurrence is not suitable for local treatment."),
  p("The American Cancer Society notes that observation can be an option for some men with biochemical recurrence, while treatment decisions depend on PSA kinetics, original cancer characteristics and the likelihood that localized treatment will help."),

  h2("What Happens If PSA Rises Very Slowly?"),
  p("A slow PSA rise does not necessarily require immediate treatment."),
  p("Doctors may assess:"),
  ul([
    "PSA doubling time",
    "Grade Group",
    "Pathological stage",
    "Time since surgery",
    "Surgical margins",
    "Patient age and life expectancy",
    "Other medical conditions",
    "Imaging findings",
    "Patient preferences",
  ]),
  p("Some men can be monitored carefully."),
  p("The EAU specifically includes monitoring as an option for men with lower-risk biochemical recurrence."),

  h2("What Happens If PSA Rises Quickly?"),
  p("A rapidly increasing PSA is more concerning."),
  p("A short PSA doubling time can indicate biologically aggressive recurrence and may prompt earlier imaging and treatment."),
  p("The AUA guideline identifies short PSA doubling time as an important high-risk feature when deciding how aggressively to manage biochemical recurrence."),
  p("This is one reason that **PSA velocity and doubling time can be as important as the absolute PSA number.**"),

  h2("What Are the Side Effects of Salvage Radiation?"),
  p("Because radiation is delivered to tissues around the prostate bed, side effects can involve the urinary, bowel and sexual systems."),
  p("Possible effects include:"),
  h3("Urinary"),
  ul([
    "Increased urinary frequency",
    "Urgency",
    "Burning during urination",
    "Leakage or worsening continence",
    "Rarely, more significant urinary complications",
  ]),
  h3("Bowel"),
  ul(["Loose stools", "Increased bowel frequency", "Rectal irritation", "Rectal bleeding in some patients"]),
  h3("Sexual"),
  ul(["Erectile dysfunction", "Reduced sexual function"]),
  p("The AUA/ASTRO/SUO guideline specifically recommends discussing the potential effects of salvage radiation on urinary control, erectile function and bowel function before treatment."),

  h2("Does Salvage Radiation Make Incontinence Worse?"),
  p("It can."),
  p("This is an important consideration for men who have already experienced urinary leakage after prostatectomy."),
  p("Radiation can affect urinary tissues and may worsen existing urinary symptoms in some patients."),
  p("The decision therefore involves balancing:"),
  p("**risk of cancer progression without treatment** against **potential urinary, bowel and sexual side effects from salvage treatment.**"),

  h2("How Long After Surgery Can Prostate Cancer Return?"),
  p("There is no single time point."),
  p("Recurrence may appear:"),
  ul(["Within months", "Within a few years", "Many years later"]),
  p("The EAU notes that PSA recurrence can occur even long after treatment and that the timing depends partly on the original risk group."),
  p("This is why long-term PSA follow-up remains important after prostatectomy."),

  h2("How Often Should PSA Be Checked After Prostatectomy?"),
  p("Follow-up schedules vary."),
  p("The EAU describes PSA testing generally every six months for the first three years and annually thereafter, while emphasizing that the evidence for one specific testing interval is limited."),
  p("Your urologist may recommend a different schedule based on:"),
  ul(["Pathology", "Risk of recurrence", "Previous PSA results", "Age", "Treatment history", "Other clinical factors"]),

  h2("What Is the Difference Between Biochemical Recurrence and Metastatic Recurrence?"),
  p("These terms describe different situations."),
  html(situationTable),
  p("A man can have biochemical recurrence without any visible metastasis."),
  p("That distinction is critical because localized biochemical recurrence may still be treated with curative intent."),

  h2("What Is the Difference Between PSA Recurrence and Clinical Recurrence?"),
  p("**Biochemical recurrence** is detected through PSA."),
  p("**Clinical recurrence** means recurrent cancer is identified through imaging, examination, biopsy or symptoms."),
  p("PSA recurrence often comes first."),
  p("The NCI notes that biochemical relapse can appear months or years before clinically apparent recurrence."),

  h2("What Tests Should Be Done After a Confirmed PSA Rise?"),
  p("There is no universal testing package for every patient."),
  p("A typical evaluation may include:"),
  h3("1. Repeat PSA"),
  p("Confirms whether the rise is persistent."),
  h3("2. PSA doubling time"),
  p("Provides information about the speed of progression."),
  h3("3. Original pathology review"),
  p("The doctor may reassess:"),
  ul(["Gleason score / Grade Group", "Pathological T stage", "Surgical margins", "Seminal vesicle invasion", "Lymph-node status"]),
  h3("4. PSMA PET/CT"),
  p("Helps locate recurrent disease when imaging is clinically appropriate."),
  h3("5. Pelvic MRI"),
  p("May provide additional information about local recurrence."),
  h3("6. Biopsy"),
  p("May occasionally be considered when confirming a local recurrence would alter treatment."),
  p("The AUA recommends using imaging selectively when it will influence treatment planning."),

  h2("Is a Biopsy Always Needed Before Salvage Radiation?"),
  p("No."),
  p("A biopsy is not necessarily required in every patient before salvage radiation."),
  p("The decision depends on the clinical situation, PSA pattern, pathology and imaging."),
  p("For example, a man with a convincing postoperative PSA rise and high-risk pathology may have enough evidence to proceed with salvage treatment planning without a biopsy."),
  p("The treating team determines whether tissue confirmation would add useful information."),

  h2("Genomic Testing in Prostate Cancer Recurrence"),
  p("Some patients may undergo genomic testing of the original tumor."),
  p("A validated genomic classifier may provide additional prognostic information regarding the likelihood of progression."),
  p("The AUA/ASTRO/SUO guideline lists validated post-prostatectomy genomic classifiers among the factors that may help counsel patients with detectable PSA."),
  p("Genomic testing does not replace PSA, pathology or imaging."),

  h2("What Is the Difference Between Adjuvant Radiation and Salvage Radiation?"),
  p("This distinction is important."),
  h3("Adjuvant radiation"),
  p("Radiation is given after prostatectomy because pathology suggests a high risk of recurrence, even though PSA may still be undetectable."),
  h3("Salvage radiation"),
  p("Radiation is given after evidence of biochemical recurrence or persistent disease."),
  p("Modern evidence supports close PSA monitoring with early salvage radiation for many men rather than automatically treating everyone after surgery."),
  p("The appropriate strategy depends on pathology and recurrence risk."),

  h2("Is Salvage Radiation Better Than Waiting?"),
  p("There is no single answer for every patient."),
  p("For men with a meaningful biochemical recurrence, early salvage radiation can provide an opportunity for local control while PSA remains low."),
  p("For men with very low-risk PSA recurrence, immediate treatment may not always be necessary."),
  p("The decision depends on the probability that recurrence will progress, the likelihood that salvage treatment can control it, life expectancy, existing urinary/sexual function, other medical conditions and personal preferences."),
  p("The EAU and AUA both emphasize risk-based decision-making rather than treating every PSA rise identically."),

  h2("A Simple Example of How Doctors May Approach Recurrence"),
  p("Consider a hypothetical patient:"),
  ul([
    "Radical prostatectomy completed",
    "PSA initially becomes undetectable",
    "PSA later becomes detectable",
    "Repeat tests show a consistent increase",
    "Pathology shows Grade Group 3 disease",
    "Surgical margins were positive",
    "PSA doubling time is relatively short",
  ]),
  p("The doctor may consider this a higher-risk biochemical recurrence."),
  p("The next steps could include:"),
  p("**Repeat PSA → calculate PSA doubling time → review pathology → PSMA PET/CT → radiation oncology consultation → consider salvage radiation ± ADT.**"),
  p("Another patient might have:"),
  ul([
    "Very low PSA",
    "Very slow PSA increase",
    "Lower-grade original cancer",
    "Long interval since surgery",
    "No concerning imaging findings",
  ]),
  p("That patient may be monitored more closely before treatment."),
  p("This illustrates why **the same PSA number can lead to different decisions in different patients.**"),

  h2("Can Prostate Cancer Recurrence Be Prevented?"),
  p("There is no guaranteed method to prevent recurrence after prostatectomy."),
  p("The most important step is appropriate postoperative follow-up."),
  p("Regular PSA testing allows recurrence to be identified early."),
  p("For patients with high-risk pathology, doctors may discuss additional strategies based on the expected recurrence risk."),
  p("Lifestyle measures such as maintaining a healthy weight, exercising regularly, avoiding tobacco and following a balanced diet are generally beneficial for overall health, but they should not be presented as a substitute for cancer surveillance or treatment. See [Prostate Cancer Diet](" + DIET + ")."),

  h2("What Should International Patients Bring for a Second Opinion?"),
  p("If you are travelling to India for evaluation of prostate cancer recurrence, bring as much of the original medical record as possible."),
  h3("Essential documents"),
  ul([
    "Preoperative PSA reports",
    "All postoperative PSA reports",
    "PSA dates and values",
    "Radical prostatectomy operative report",
    "Complete histopathology report",
    "Gleason score / Grade Group",
    "Pathological TNM stage",
    "Surgical margin status",
    "Seminal vesicle findings",
    "Lymph-node pathology",
    "Previous imaging",
    "PSMA PET/CT reports and DICOM images, if performed",
    "MRI reports and images",
    "Previous treatment records",
    "Medication list",
    "Previous radiation or hormone therapy details, if applicable",
  ]),
  h3("Particularly useful"),
  p("Bring the **actual imaging files**, not only the written reports."),
  p("A specialist may want to review the original scans."),
  btn("Share records before travelling for a recurrence review", consult("Prostate Cancer Recurrence After Surgery")),
  p("[WhatsApp +91 90443 46292 to send PSA dates and DICOM files](" + wa("I would like to send postoperative PSA dates, pathology and PSMA PET files for a recurrence second opinion in India.") + ")"),

  h2("Prostate Cancer Recurrence Treatment in India"),
  p("India has multidisciplinary cancer centers where recurrent prostate cancer can be evaluated by teams involving:"),
  ul([
    "Urologists",
    "Uro-oncologists",
    "Radiation oncologists",
    "Medical oncologists",
    "Nuclear medicine specialists",
    "Radiologists",
    "Pathologists",
  ]),
  p("A complex recurrence is often best assessed through a multidisciplinary approach."),
  p("For international patients, the evaluation may involve reviewing the pathology and PSA history first, followed by PSMA PET/CT or MRI when clinically appropriate."),
  p("Treatment may then be planned around whether the recurrence appears:"),
  p("**local → regional → oligometastatic → widely metastatic.**"),
  p("The exact treatment should be determined after reviewing the patient's records and current investigations."),

  h2("Questions to Ask Your Doctor After a Rising PSA"),
  p("If PSA starts rising after prostatectomy, consider asking:"),
  ol([
    "Is this confirmed biochemical recurrence?",
    "Could this be PSA persistence rather than recurrence?",
    "What is my PSA doubling time?",
    "What was my original Grade Group?",
    "What was my pathological stage?",
    "Were my surgical margins positive?",
    "Were lymph nodes involved?",
    "Should I have a PSMA PET/CT?",
    "Would pelvic MRI add useful information?",
    "Is salvage radiation appropriate?",
    "How low is my PSA, and should treatment be discussed now?",
    "Would ADT be added to radiation?",
    "How long would ADT be given?",
    "What are the expected urinary, bowel and sexual side effects?",
    "What happens if the scan is negative?",
    "What happens if the scan shows lymph nodes?",
    "Is the goal cure, long-term control, or symptom management?",
    "Should my pathology be reviewed by another specialist?",
    "Would genomic testing change the treatment decision?",
    "Should I seek a multidisciplinary second opinion?",
  ]),

  h2("Prostate Cancer Recurrence After Surgery: A Practical Decision Framework"),
  p("A useful way to understand the decision-making process is:"),
  h3("Step 1: Confirm the PSA pattern"),
  p("Is PSA genuinely rising?"),
  h3("Step 2: Establish the risk"),
  p("Look at Grade Group, pathological stage, margins, nodes, PSA doubling time and time from surgery to recurrence."),
  h3("Step 3: Look for the location"),
  p("Use PSMA PET/CT and/or MRI when the result can influence treatment."),
  h3("Step 4: Determine whether local treatment is possible"),
  p("If recurrence appears limited to the prostate bed or pelvis, salvage treatment may still have curative intent."),
  h3("Step 5: Consider systemic treatment"),
  p("Higher-risk recurrence or metastatic disease may require ADT and/or other systemic therapy."),
  h3("Step 6: Balance cancer control with quality of life"),
  p("Urinary control, bowel function, sexual function, other medical conditions and life expectancy all matter."),

  h2("Can PSA Rise Without Prostate Cancer Recurrence?"),
  p("A very low detectable PSA after prostatectomy does not automatically prove recurrent cancer."),
  p("Ultrasensitive PSA assays can detect tiny PSA concentrations, and doctors may need to establish whether the value is stable or increasing."),
  p("However, a persistent upward trend after an initial undetectable PSA requires appropriate medical evaluation."),
  p("The NCI and American Cancer Society both emphasize that PSA should be interpreted as part of the overall clinical picture rather than as an isolated number."),

  h2("How Long Can Someone Live With Biochemical Recurrence?"),
  p("Biochemical recurrence is not the same as terminal or metastatic prostate cancer."),
  p("Some men with PSA recurrence remain free of symptoms for many years."),
  p("The NCI notes that a substantial proportion of men with elevated or rising PSA after curative-intent treatment can remain clinically well for extended periods."),
  p("The risk varies substantially according to tumor grade, PSA kinetics, pathological stage, time to recurrence and whether metastatic disease is present."),
  p("For that reason, a PSA recurrence should be taken seriously without assuming that it automatically means widespread cancer."),

  h2("What Happens If Salvage Radiation Does Not Work?"),
  p("If PSA continues to rise after salvage radiation, doctors reassess the situation."),
  p("Possible next steps include:"),
  ul([
    "Repeat PSA testing",
    "PSA doubling time",
    "PSMA PET/CT",
    "MRI",
    "Assessment for local or metastatic disease",
    "Systemic treatment",
    "Clinical trials",
    "Metastasis-directed treatment in selected cases",
  ]),
  p("The next treatment depends heavily on where the recurrent cancer is found and what treatments have already been given."),

  h2("What If the PSA Is Rising but All Scans Are Negative?"),
  p("This situation is relatively common."),
  p("A negative scan does not necessarily exclude microscopic cancer."),
  p("If PSA is rising and the clinical/pathological risk is significant, doctors may still consider salvage radiation."),
  p("The AUA specifically advises against withholding prostate-bed salvage radiation solely because PET/CT is negative when salvage treatment remains clinically appropriate."),
  p("This is an important point for patients who receive a “negative scan” but continue to have rising PSA."),

  h2("Prostate Cancer Recurrence After Surgery: Key Takeaways"),
  ul([
    "**PSA is the main surveillance test after radical prostatectomy.**",
    "PSA should generally become very low or undetectable after surgery.",
    "A single very-low PSA result does not automatically prove recurrence.",
    "A consistent PSA rise requires evaluation.",
    "**Biochemical recurrence is not the same as metastatic disease.**",
    "PSA doubling time helps estimate the aggressiveness of recurrence.",
    "Original Grade Group, pathological stage, margins and lymph-node status remain important.",
    "PSMA PET/CT can help locate recurrent prostate cancer.",
    "MRI can provide additional information about local recurrence.",
    "**Salvage radiation is generally more effective when delivered at a lower PSA.**",
    "Some patients need radiation alone; others may benefit from radiation plus ADT.",
    "A negative PSMA PET does not automatically rule out microscopic recurrence.",
    "Some lower-risk patients can be monitored rather than treated immediately.",
    "Metastatic recurrence may require systemic treatment.",
    "Long-term PSA monitoring remains important because recurrence can occur years after surgery.",
  ]),

  h2("Frequently Asked Questions"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Related Prostate Cancer Resources"),
  p("This article is the recurrence/PSA-after-surgery hub. Other cluster pages keep their own search intent:"),
  ul([
    "[Robotic Prostatectomy in India](" + RARP + ") — the original operation, recovery and risks.",
    "[Radiation Therapy for Prostate Cancer](" + RAD + ") — IMRT, IGRT, SBRT and salvage technique.",
    "[Brachytherapy for Prostate Cancer](" + BRACHY_BLOG + ") — internal radiation, not the usual salvage after prostatectomy.",
    "[Hormone therapy cost in India](" + HT + ") — ADT when it is added to salvage radiation.",
    "[Prostate Cancer Treatment Without Surgery](" + NONSURG + ") — surveillance and non-surgical first treatments.",
    "[Prostate Cancer Treatment Options](" + OPTIONS + ") — how teams choose first treatment.",
    "[Prostate Cancer Diet](" + DIET + ") — eating during ADT and radiation.",
    "[Prostate Cancer Treatment in India](" + PILLAR + ") — staging, PSMA PET and Lutetium-177 PSMA therapy.",
  ]),

  h2("How GAF Healthcare Can Help"),
  p("GAF Healthcare coordinates international patients who have a rising PSA after [prostatectomy](" + RARP + ") and need a second look in India. Share every PSA date and value, the operative note, full histopathology, margin and node status, and PSMA PET or MRI files when you have them. A coordinator can arrange review with a [radiation oncologist](" + RAD_DOCS + ") and, when needed, a uro-oncologist, then prepare an itemized estimate for salvage radiation ± [hormone therapy](" + HT + "). The treating team decides whether observation, prostate-bed radiation or systemic treatment is appropriate."),
  btn("Share records for a recurrence second opinion", consult("Prostate Cancer Recurrence After Surgery")),
  p("[WhatsApp +91 90443 46292 with your records](" + wa("I would like to share postoperative PSA dates and pathology for a prostate cancer recurrence review in India.") + ")"),

  h2("Medical Disclaimer"),
  p("This article is intended for educational purposes only. A rising PSA after prostate cancer surgery requires evaluation by a qualified urologist, uro-oncologist or radiation oncologist. PSA values, pathology findings and imaging results must be interpreted together, and treatment decisions should be individualized based on the patient's cancer characteristics, previous treatment, overall health and preferences."),

  h2("Top 5 Sources"),
  p("1. [AUA / ASTRO / SUO — Salvage Therapy for Prostate Cancer Guideline](https://www.auanet.org/guidelines-and-quality/guidelines/salvage-therapy-for-prostate-cancer) — early salvage radiation, PET imaging, ADT and counselling."),
  p("2. [EAU Prostate Cancer Guidelines — Treatment](https://uroweb.org/guidelines/prostate-cancer/chapter/treatment) — biochemical recurrence and potentially curative salvage radiation."),
  p("3. [EAU Prostate Cancer Guidelines — Follow-up](https://uroweb.org/guidelines/prostate-cancer/chapter/followup) — PSA timing after treatment and long-interval recurrence."),
  p("4. [NCI — Prostate-Specific Antigen (PSA) Test](https://www.cancer.gov/types/prostate/psa-fact-sheet) — one elevated PSA does not always mean recurrence."),
  p("5. [American Cancer Society — Treating Prostate Cancer That Doesn't Go Away or Comes Back](https://www.cancer.org/cancer/types/prostate-cancer/treating/recurrence.html) — observation, salvage radiation and systemic options."),
  p("**Last reviewed against the cited sources: September 2026.**"),
];

const now = "2026-09-28T06:30:00.000Z";
const SLUG = "prostate-cancer-recurrence-after-surgery";

const article = {
  id: "art_prostate_cancer_recurrence_after_surgery",
  slug: SLUG,
  title: "Prostate Cancer Recurrence After Surgery: PSA Rise, Tests and Treatment Options",
  excerpt:
    "A rising PSA after prostatectomy is usually how recurrence is found. How doctors use doubling time, PSMA PET and early salvage radiation — and when observation is still reasonable.",
  date: "28 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Radiation Oncology",
  tags: ["prostate cancer", "recurrence", "PSA", "salvage radiation", "PSMA PET", "India"],
  image: "/uploads/articles/pca-recur-anatomy.webp",
  imageAlt:
    "Transparent male body with a gold highlight on the empty pelvic bed after prostatectomy and teal pelvic nodes",
  status: "published",
  featured: true,
  seoTitle: "Prostate Cancer Recurrence After Surgery: PSA Rise",
  seoDescription:
    "Rising PSA after prostatectomy: biochemical recurrence, doubling time, PSMA PET, early salvage radiation and when observation is reasonable. Second opinions in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/pca-recur-anatomy.webp",
  allowIndex: true,
  keywords: [
    "prostate cancer recurrence after surgery",
    "PSA rise after prostatectomy",
    "biochemical recurrence prostate cancer",
    "salvage radiation after prostatectomy",
    "PSMA PET biochemical recurrence",
    "PSA doubling time after prostatectomy",
    "prostate cancer recurrence treatment India",
    "salvage radiotherapy PSA 0.2",
    "PSA persistence vs recurrence",
    "negative PSMA PET rising PSA",
    "ADT with salvage radiation",
    "prostate bed radiation after surgery",
  ],
  relatedLinks: [
    { label: "Robotic Prostatectomy in India", href: RARP },
    { label: "Radiation Therapy for Prostate Cancer", href: RAD },
    { label: "Prostate Cancer Treatment in India", href: PILLAR },
    { label: "Hormone therapy cost", href: HT },
    { label: "Prostate cancer diet", href: DIET },
    { label: "Treatment options", href: OPTIONS },
  ],
  blocks,
};

if (!store.categories.includes("Radiation Oncology")) store.categories.push("Radiation Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["pca-recur-anatomy.webp", article.imageAlt],
  [
    "pca-recur-psa.webp",
    "Male patient in clinic with a gold pelvic-bone overlay while a clinician reviews PSA results on a tablet",
  ],
  [
    "pca-recur-psma.webp",
    "Male patient on a PET imaging couch with a gold pelvic overlay used to explain PSMA scanning after a PSA rise",
  ],
  [
    "pca-recur-salvage.webp",
    "Male patient on a radiotherapy couch with a gold pelvic overlay showing a salvage treatment field after prostatectomy",
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

const recurLink = { label: "Recurrence after surgery", href: RECUR };
for (const siblingId of [
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
  if (!sibling.relatedLinks.some((row) => row.href === RECUR)) {
    sibling.relatedLinks.unshift(recurLink);
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length);

const treatmentsPath = join(process.cwd(), "content/curated-treatments.json");
const treatments = JSON.parse(readFileSync(treatmentsPath, "utf8"));
const treatment = treatments.treatments.find((row) => row.slug === "prostate-cancer-treatment-in-india");
if (treatment?.translations?.en?.editorialBody && !treatment.translations.en.editorialBody.includes(RECUR)) {
  treatment.translations.en.editorialBody = treatment.translations.en.editorialBody.replace(
    "Eating during treatment is covered in [Prostate Cancer Diet](/blogs/prostate-cancer-diet).",
    "Eating during treatment is covered in [Prostate Cancer Diet](/blogs/prostate-cancer-diet). A rising PSA after prostatectomy is covered in [Prostate Cancer Recurrence After Surgery](/blogs/prostate-cancer-recurrence-after-surgery).",
  );
  writeFileSync(treatmentsPath, `${JSON.stringify(treatments, null, 2)}\n`);
  console.log("linked recurrence blog from treatment editorial");
}

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes("prostate-cancer-recurrence-after-surgery")) {
  llms = llms.replace(
    "and [prostate cancer diet](https://gaf.healthcare/blogs/prostate-cancer-diet).",
    ", [prostate cancer diet](https://gaf.healthcare/blogs/prostate-cancer-diet) and [prostate cancer recurrence after surgery](https://gaf.healthcare/blogs/prostate-cancer-recurrence-after-surgery).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}
