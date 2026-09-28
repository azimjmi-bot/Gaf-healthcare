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
const EBRT = "/costs/India/Radiation-Oncology/EBRT";
const IMRT = "/costs/India/Radiation-Oncology/IMRT";
const BRACHY = "/costs/India/Radiation-Oncology/Brachytherapy";
const RP = "/costs/India/Surgical-Oncology/Radical-Prostatectomy";
const HT = "/costs/India/Medical-Oncology/Hormone-Therapy";
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

const qaTable = `<div class="md-body"><table><thead><tr><th>Test</th><th>Main question it helps answer</th></tr></thead><tbody><tr><td><strong>PSA blood test</strong></td><td>Is there an abnormal prostate-related marker that needs evaluation?</td></tr><tr><td><strong>Digital rectal examination (DRE)</strong></td><td>Does the prostate feel abnormal on examination?</td></tr><tr><td><strong>Free PSA / biomarkers</strong></td><td>Can the risk of clinically significant cancer be refined?</td></tr><tr><td><strong>Multiparametric MRI</strong></td><td>Is there a suspicious lesion, and where is it located?</td></tr><tr><td><strong>Prostate biopsy</strong></td><td>Is cancer actually present in the tissue?</td></tr><tr><td><strong>Gleason score / Grade Group</strong></td><td>How aggressive does the cancer look microscopically?</td></tr><tr><td><strong>PSMA PET/CT</strong></td><td>Has prostate cancer spread to lymph nodes or distant sites, or where is recurrent disease?</td></tr></tbody></table></div>`;

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body"><strong>How is prostate cancer diagnosed?</strong></p><p class="article-quick-answer__body">Prostate cancer diagnosis usually involves <strong>more than one test</strong>. A common pathway is:</p><p class="article-quick-answer__body"><strong>Risk assessment → PSA blood test → repeat PSA or additional tests when appropriate → prostate MRI → biopsy when indicated → pathology/Gleason Grade Group → staging imaging such as PSMA PET in selected patients.</strong></p><p class="article-quick-answer__body">The tests answer different questions:</p>${qaTable}<p class="article-quick-answer__body"><strong>PSA does not diagnose prostate cancer by itself. MRI does not replace biopsy in every situation. PSMA PET does not replace tissue diagnosis.</strong> Each test provides a different piece of the diagnostic picture.</p></aside>`;

const pirads = `<div class="md-body"><table><thead><tr><th>PI-RADS</th><th>General meaning</th></tr></thead><tbody><tr><td><strong>1</strong></td><td>Very low suspicion</td></tr><tr><td><strong>2</strong></td><td>Low suspicion</td></tr><tr><td><strong>3</strong></td><td>Intermediate / indeterminate</td></tr><tr><td><strong>4</strong></td><td>High suspicion</td></tr><tr><td><strong>5</strong></td><td>Very high suspicion</td></tr></tbody></table></div>`;

const targeted = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Targeted biopsy</th><th>Systematic biopsy</th></tr></thead><tbody><tr><td>Main purpose</td><td>Sample suspicious MRI lesions</td><td>Sample predefined prostate regions</td></tr><tr><td>MRI required</td><td>Usually yes</td><td>No</td></tr><tr><td>Can detect MRI-visible lesions</td><td>Yes</td><td>Not specifically</td></tr><tr><td>Can detect cancer outside MRI target</td><td>Limited</td><td>Yes</td></tr><tr><td>Often combined?</td><td>Yes</td><td>Yes</td></tr></tbody></table></div>`;

const gradeTable = `<div class="md-body"><table><thead><tr><th>Gleason result</th><th>Grade Group</th></tr></thead><tbody><tr><td>3+3=6</td><td><strong>1</strong></td></tr><tr><td>3+4=7</td><td><strong>2</strong></td></tr><tr><td>4+3=7</td><td><strong>3</strong></td></tr><tr><td>8</td><td><strong>4</strong></td></tr><tr><td>9–10</td><td><strong>5</strong></td></tr></tbody></table></div>`;

const mriVsPet = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Prostate MRI</th><th>PSMA PET/CT</th></tr></thead><tbody><tr><td>Main strength</td><td>Detailed prostate anatomy</td><td>Molecular detection of PSMA-expressing disease</td></tr><tr><td>Local prostate assessment</td><td>Excellent</td><td>Useful but not primary strength</td></tr><tr><td>Biopsy targeting</td><td>Yes</td><td>Potentially useful in selected settings</td></tr><tr><td>Lymph-node assessment</td><td>Some information</td><td>Strong role in staging</td></tr><tr><td>Bone metastases</td><td>Limited compared with whole-body molecular imaging</td><td>Useful</td></tr><tr><td>Distant metastases</td><td>Limited</td><td>Major role</td></tr><tr><td>Recurrence detection</td><td>Useful in selected settings</td><td>Important role</td></tr><tr><td>Surgical planning</td><td>Very useful</td><td>Complementary</td></tr><tr><td>Radiation exposure</td><td>No ionizing radiation from MRI</td><td>PET/CT involves radiation</td></tr></tbody></table></div>`;

const fourTests = `<div class="md-body"><table><thead><tr><th>Test</th><th>What it tells you</th><th>Does it diagnose cancer?</th><th>Main role</th></tr></thead><tbody><tr><td><strong>PSA</strong></td><td>Prostate-related blood marker</td><td>No</td><td>Detection/risk assessment/monitoring</td></tr><tr><td><strong>DRE</strong></td><td>Physical prostate abnormalities</td><td>No</td><td>Clinical assessment</td></tr><tr><td><strong>Free PSA / biomarkers</strong></td><td>Additional risk information</td><td>No</td><td>Refine biopsy decisions</td></tr><tr><td><strong>MRI</strong></td><td>Suspicious prostate lesions and local anatomy</td><td>Not by itself</td><td>Detection/local assessment/biopsy targeting</td></tr><tr><td><strong>Biopsy</strong></td><td>Actual prostate tissue</td><td><strong>Yes</strong></td><td>Histological diagnosis</td></tr><tr><td><strong>Gleason/Grade Group</strong></td><td>Microscopic cancer grade</td><td>Part of pathology</td><td>Risk assessment</td></tr><tr><td><strong>PSMA PET</strong></td><td>PSMA-avid disease throughout the body</td><td>Not by itself</td><td>Staging/restaging</td></tr><tr><td><strong>CT / bone imaging</strong></td><td>Anatomical or skeletal disease</td><td>Not by itself</td><td>Selected staging situations</td></tr></tbody></table></div>`;

const faqs = [
  ["How is prostate cancer diagnosed?", "Prostate cancer is usually diagnosed through a combination of PSA testing, clinical assessment, prostate MRI and biopsy when indicated. Biopsy provides the tissue diagnosis, while imaging helps determine the location and extent of disease."],
  ["What is the first test for prostate cancer?", "PSA blood testing is commonly used as an initial test when prostate cancer is being considered, although the exact starting point depends on the patient's symptoms, age and risk factors."],
  ["Can PSA alone diagnose prostate cancer?", "No. PSA can be elevated because of prostate cancer as well as BPH, prostatitis and other conditions."],
  ["What PSA level indicates prostate cancer?", "There is no single PSA value that diagnoses prostate cancer. Higher PSA levels increase the likelihood of cancer, but even a low PSA does not completely exclude it."],
  ["Is PSA 4 considered prostate cancer?", "No. PSA 4 ng/mL is not a cancer diagnosis. It may lead to further evaluation depending on age, PSA history, prostate size and other risk factors."],
  ["Is PSA 10 always cancer?", "No. PSA above 10 substantially increases the likelihood of prostate cancer, but noncancerous prostate conditions can also cause significant PSA elevation."],
  ["What is a prostate MRI?", "A prostate MRI is an imaging test that provides detailed pictures of the prostate and surrounding tissues. Multiparametric MRI can identify areas suspicious for clinically significant prostate cancer and help guide biopsy."],
  ["What is PI-RADS?", "PI-RADS is a standardized MRI scoring system used to describe the likelihood that a prostate lesion represents clinically significant cancer. Scores range from 1 to 5."],
  ["Is PI-RADS 5 definitely cancer?", "No. PI-RADS 5 means the MRI finding is highly suspicious, but biopsy may be required to establish a tissue diagnosis."],
  ["Can a PI-RADS 3 lesion be cancer?", "Yes. PI-RADS 3 is considered indeterminate, meaning that the probability of clinically significant cancer is neither clearly low nor clearly high. PSA density and other risk factors help determine the next step."],
  ["Does a negative MRI rule out prostate cancer?", "No. A negative MRI reduces suspicion but cannot completely exclude clinically significant cancer."],
  ["What is a prostate biopsy?", "A prostate biopsy removes small samples of prostate tissue using a needle. A pathologist examines the samples to determine whether cancer is present."],
  ["Is prostate biopsy painful?", "The experience varies. Local anesthesia is commonly used, and discomfort depends on the technique and individual patient. Your urologist can explain the expected experience and pain-control options."],
  ["What is the difference between transperineal and transrectal biopsy?", "Transperineal biopsy passes through the skin of the perineum, while transrectal biopsy passes through the rectal wall. Both can be used for prostate biopsy, and the choice depends on the clinical situation and center."],
  ["What happens if my prostate biopsy is positive?", "The pathology report will usually provide the cancer type, Gleason score and Grade Group, along with other findings. These results are then combined with PSA and imaging to determine stage and risk."],
  ["What is Gleason score?", "Gleason score is a microscopic grading system for prostate cancer. It is based on the architectural patterns seen in the cancer tissue."],
  ["What is Grade Group?", "Grade Group is a five-level system used to classify prostate cancer grade, from Grade Group 1 through Grade Group 5."],
  ["What is PSMA PET?", "PSMA PET is a molecular imaging test that uses a radiotracer targeting prostate-specific membrane antigen to identify areas of prostate cancer activity."],
  ["Does everyone with prostate cancer need PSMA PET?", "No. PSMA PET is generally used selectively, particularly for staging higher-risk disease, evaluating suspected recurrence or other appropriate clinical situations."],
  ["Can PSMA PET replace a biopsy?", "Generally, no. PSMA PET provides imaging information, while biopsy provides tissue confirmation and cancer grading."],
  ["Can PSMA PET detect cancer spread?", "Yes. It can identify PSMA-avid disease in lymph nodes, bones and other distant locations and is an important staging and restaging tool in appropriate patients."],
  ["Can PSMA PET be negative even when cancer is present?", "Yes. Some prostate cancers have low PSMA expression, and small or otherwise difficult-to-detect lesions can be missed."],
  ["Is PSMA PET better than MRI?", "They are complementary. MRI provides detailed local anatomy, while PSMA PET is particularly useful for molecular assessment of lymph nodes and distant disease."],
  ["What test confirms prostate cancer?", "When tissue confirmation is required, a prostate biopsy examined by a pathologist provides the diagnosis."],
  ["Can prostate cancer be diagnosed without symptoms?", "Yes. Early prostate cancer often causes no symptoms and may be detected through PSA testing and subsequent investigation."],
  ["What happens after prostate cancer is diagnosed?", "The medical team determines the Grade Group, stage and overall risk. Treatment or active surveillance is then discussed based on the complete clinical picture."],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("This is the diagnosis hub for the prostate cluster. It sits beside [active surveillance](" + AS + "), [treatment options](" + OPTIONS + "), [treatment without surgery](" + NONSURG + "), [Robotic Prostatectomy in India](" + RARP + "), [Radiation Therapy for Prostate Cancer](" + RAD + "), [brachytherapy](" + BRACHY_BLOG + "), [recurrence after surgery](" + RECUR + "), [Prostate Cancer Diet](" + DIET + ") and [Prostate Cancer Treatment in India](" + PILLAR + ")."),
  p("International patients comparing [surgical oncologists](" + SURG_DOCS + ") and [radiation oncologists](" + RAD_DOCS + ") commonly start with [Delhi NCR](/doctors/India/Delhi-NCR/Surgical-Oncology), [Mumbai](/doctors/India/Mumbai/Radiation-Oncology), [Bengaluru](/doctors/India/Bengaluru/Surgical-Oncology), [Chennai](/doctors/India/Chennai/Radiation-Oncology) and [Hyderabad](/doctors/India/Hyderabad/Surgical-Oncology)."),
  btn("Ask about a PSA, MRI or biopsy result", consult("Prostate Cancer Diagnosis")),
  p("[WhatsApp +91 90443 46292 with your PSA dates and MRI](" + wa("Please review my PSA history, MRI and biopsy (if done) and advise the next diagnostic step for prostate cancer in India.") + ")"),
  img(
    "/uploads/articles/pca-dx-anatomy.webp",
    "Transparent male body with a gold highlight on an intact prostate in the pelvis and teal pelvic lymph nodes",
    "Diagnosis is a sequence: PSA raises suspicion, MRI locates a lesion, biopsy confirms grade, and PSMA PET asks whether disease has spread.",
  ),

  h2("What Is Prostate Cancer Diagnosis?"),
  p("Diagnosing prostate cancer is a process rather than a single test."),
  p("A doctor may start investigating prostate cancer because of:"),
  ul([
    "An elevated PSA",
    "A rising PSA over time",
    "An abnormal prostate examination",
    "Urinary or other symptoms",
    "A strong family history",
    "Genetic risk",
    "An abnormal MRI",
    "A previous biopsy showing cancer",
    "PSA rising after previous prostate cancer treatment",
  ]),
  p("The goal is not simply to find out whether cancer is present."),
  p("Doctors also need to determine:"),
  ol([
    "**Is cancer actually present?**",
    "**Where is it located?**",
    "**How aggressive does it appear?**",
    "**How much cancer is present?**",
    "**Has it spread beyond the prostate?**",
    "**What is the Grade Group?**",
    "**What is the clinical stage?**",
  ]),
  p("These answers guide treatment decisions."),

  h2("What Is Usually the First Test for Prostate Cancer?"),
  p("For many men being evaluated for possible prostate cancer, the initial assessment includes a **PSA blood test**, sometimes alongside a digital rectal examination."),
  p("PSA stands for **prostate-specific antigen**."),
  p("PSA is produced mainly by prostate cells and can be measured through a blood test."),
  p("But PSA is **not specific to cancer**."),
  p("It can rise because of prostate cancer, benign prostate enlargement, prostatitis, urinary infection or inflammation, recent prostate procedures, and other prostate-related factors."),
  p("This is why an elevated PSA usually leads to **risk assessment**, not an automatic diagnosis of cancer."),
  img(
    "/uploads/articles/pca-dx-psa.webp",
    "Male patient in clinic with a gold pelvic overlay while a clinician reviews PSA results on a tablet",
    "A high PSA is a reason to look further. It is not a cancer diagnosis on its own.",
  ),

  h2("Step 1: Medical History and Prostate Cancer Risk Assessment"),
  p("Before ordering more tests, a doctor will usually consider the person's overall risk."),
  h3("Age"),
  p("Prostate cancer becomes more common with increasing age."),
  h3("Family history"),
  p("A father, brother or son with prostate cancer can increase risk."),
  h3("Genetic factors"),
  p("Certain inherited variants, including **BRCA1 and BRCA2**, can increase prostate cancer risk."),
  h3("Ancestry"),
  p("Some populations have a higher incidence and mortality from prostate cancer."),
  h3("Previous PSA results"),
  p("A single PSA value provides less information than the broader pattern in many cases."),
  h3("Previous biopsy"),
  p("A prior negative or positive biopsy changes the diagnostic pathway."),
  h3("Medications"),
  p("Drugs such as **finasteride and dutasteride** can lower PSA and need to be considered when interpreting results."),
  h3("Urinary and prostate symptoms"),
  p("Symptoms can help identify other prostate or urinary conditions, although early prostate cancer often causes no symptoms."),

  h2("Step 2: PSA Blood Test"),
  p("PSA is one of the most widely used tests in prostate cancer evaluation."),
  p("The result is usually reported in **ng/mL**."),
  p("There is no single PSA number that perfectly separates cancer from noncancerous prostate conditions."),
  p("For example: a man with PSA below 4 can still have prostate cancer; a man with PSA between 4 and 10 may have cancer or a benign condition; a man with PSA above 10 has a substantially higher likelihood of cancer, but still does not have a diagnosis based on PSA alone."),
  p("The American Cancer Society estimates that about 1 in 4 men with PSA between 4 and 10 ng/mL are found to have prostate cancer on biopsy, while the likelihood is greater than 50% when PSA is above 10 ng/mL. These are population estimates, not individual predictions."),

  h2("Does a High PSA Mean Prostate Cancer?"),
  p("**No.**"),
  p("This is one of the most important points in prostate cancer diagnosis."),
  p("PSA can increase because of BPH, prostatitis, urinary infection, urinary retention, recent ejaculation, vigorous cycling, recent prostate biopsy and other prostate irritation."),
  p("A doctor may therefore repeat an unexpectedly elevated PSA under appropriate conditions before deciding on further testing."),
  p("However, the decision depends on the actual PSA level, symptoms, risk factors and clinical findings."),

  h2("What If PSA Is High?"),
  p("The next step depends on the situation."),
  p("A doctor may:"),
  ul([
    "Review previous PSA results",
    "Check for infection or inflammation",
    "Review medications",
    "Repeat PSA",
    "Perform a DRE",
    "Calculate PSA density",
    "Order percent-free PSA",
    "Consider a biomarker test",
    "Recommend prostate MRI",
    "Recommend biopsy",
  ]),
  p("The aim is to avoid unnecessary biopsies while identifying men who may have clinically significant prostate cancer."),

  h2("Should PSA Always Be Repeated?"),
  p("Not necessarily."),
  p("If PSA is unexpectedly elevated, repeating it can sometimes help determine whether the elevation persists."),
  p("This can be particularly useful when there may have been a temporary cause such as infection, prostatitis, urinary retention, recent instrumentation or recent biopsy."),
  p("But a very high PSA or other concerning findings may warrant more immediate investigation."),
  p("The decision should be made by the treating clinician rather than by applying one fixed rule to every patient."),

  h2("Step 3: Digital Rectal Examination"),
  p("A **digital rectal examination (DRE)** allows the doctor to feel the prostate through the rectal wall."),
  p("The doctor may assess size, shape, symmetry, firmness, nodules and other abnormalities."),
  p("DRE does not diagnose prostate cancer by itself."),
  p("Some prostate cancers cannot be felt during a DRE."),
  p("But an abnormal examination can increase suspicion and may influence decisions about additional testing."),

  h2("What Is a PSA Density?"),
  p("PSA density, or **PSAD**, relates PSA to prostate volume."),
  p("The basic calculation is **PSA density = PSA ÷ prostate volume**."),
  p("For example: PSA = 8 ng/mL, prostate volume = 80 cc, PSA density = 8 ÷ 80 = **0.10 ng/mL/cc**."),
  p("A larger prostate can produce more PSA because there is more prostate tissue."),
  p("PSA density attempts to put the PSA result into the context of prostate size. It is particularly useful when interpreting PSA alongside MRI findings."),

  h2("What Is Free PSA?"),
  p("PSA circulates in different forms in the blood."),
  p("Some PSA is free, while some is attached to proteins."),
  p("A **percent-free PSA** test measures the proportion of PSA that is circulating freely."),
  p("In general: **lower percent-free PSA → greater likelihood of prostate cancer**; **higher percent-free PSA → lower likelihood**."),
  p("Percent-free PSA is particularly useful in selected men with PSA in the borderline range. It is one of several tools that can help decide whether further investigation, including biopsy, is appropriate."),

  h2("Are There Other Prostate Cancer Biomarker Tests?"),
  p("Yes."),
  p("In selected patients, doctors may use additional blood, urine or tissue-based tests to refine the probability of clinically significant prostate cancer."),
  p("Examples include the **Prostate Health Index (PHI)**, **4Kscore**, and other validated blood or urine biomarkers."),
  p("These tests do not directly replace biopsy. Their purpose is to provide additional risk information when the decision about biopsy is uncertain."),
  p("The American Urological Association/Society of Urologic Oncology guideline supports the use of adjunctive biomarkers when the result is likely to influence the decision about prostate biopsy."),

  h2("Step 4: Prostate MRI"),
  p("One of the biggest changes in modern prostate cancer diagnosis has been the increasing use of **multiparametric MRI (mpMRI)**."),
  p("A prostate MRI provides detailed images of the prostate and surrounding tissues."),
  p("It can help identify suspicious lesions, lesion location, tumor size, possible extension beyond the prostate, seminal-vesicle involvement and other anatomical abnormalities."),
  p("MRI can also help doctors decide **where a biopsy should be targeted**."),
  img(
    "/uploads/articles/pca-dx-mri.webp",
    "Male patient on an MRI couch with a gold pelvic overlay highlighting the prostate during diagnostic imaging",
    "MRI locates suspicious tissue. A PI-RADS score is a risk classification, not a cancer diagnosis.",
  ),
  btn("Ask whether MRI-targeted biopsy is the next step", consult("Prostate MRI and Biopsy")),

  h2("What Is Multiparametric MRI?"),
  p("Multiparametric MRI combines several MRI sequences to evaluate prostate tissue."),
  p("These can include T2-weighted imaging, diffusion-weighted imaging, apparent diffusion coefficient mapping, and dynamic contrast-enhanced imaging in appropriate protocols."),
  p("Together, these sequences provide information about the structure and behavior of prostate tissue."),
  p("The scan is interpreted using a standardized reporting system, commonly **PI-RADS**."),

  h2("What Is PI-RADS?"),
  p("**PI-RADS** stands for **Prostate Imaging Reporting and Data System**."),
  p("It provides a standardized way of reporting the likelihood that an MRI finding represents clinically significant prostate cancer."),
  p("The scale generally runs from **PI-RADS 1 → very low suspicion** to **PI-RADS 5 → very high suspicion**."),
  html(pirads),
  p("PI-RADS is a **risk classification**, not a cancer diagnosis."),
  p("A PI-RADS 5 lesion does not automatically mean cancer. A PI-RADS 1 or 2 MRI does not guarantee that cancer is absent."),
  p("The result must be interpreted alongside PSA density, age, family history, previous biopsy and other factors."),

  h2("Can MRI Diagnose Prostate Cancer Without a Biopsy?"),
  p("MRI can identify areas suspicious for prostate cancer, but it does not provide the same tissue diagnosis as a biopsy."),
  p("In some clinical situations, a low-suspicion MRI combined with a low overall risk may allow a doctor to avoid immediate biopsy."),
  p("In other situations, a suspicious MRI may strengthen the case for targeted biopsy."),
  p("**MRI identifies suspicious tissue. Biopsy confirms what the tissue actually contains.**"),

  h2("What Happens During a Prostate MRI?"),
  p("A prostate MRI usually involves lying still inside an MRI scanner while images are obtained."),
  p("Depending on the MRI protocol and medical circumstances, a pelvic or prostate-specific coil may be used, contrast may or may not be required, the scan usually takes several dozen minutes, the patient must remain relatively still, and metal implants and other medical devices need to be discussed beforehand."),
  p("Your imaging center will provide specific preparation instructions."),

  h2("Is Prostate MRI Safe?"),
  p("MRI does not use ionizing radiation."),
  p("However, certain implants, devices or metal fragments can create safety concerns."),
  p("Patients should tell the MRI team about pacemakers, implanted medical devices, metal fragments, cochlear implants, previous surgeries and other implanted hardware."),
  p("If contrast is planned, kidney function and previous contrast reactions may also be relevant."),

  h2("Step 5: Prostate Biopsy"),
  p("A **prostate biopsy** is the test used to obtain tissue from the prostate for microscopic examination."),
  p("This is crucial because imaging and PSA can suggest that cancer may be present, but a pathologist needs tissue to determine whether cancer cells are actually present."),
  p("A biopsy can establish whether cancer is present, the type of cancer, Gleason score, Grade Group, cancer involvement in sampled cores, percentage or length of cancer in cores, and certain additional pathological features."),

  h2("Why Is a Biopsy Needed?"),
  p("A PSA test does not show cancer cells. MRI does not show cancer cells directly either."),
  p("A biopsy provides actual tissue. The pathologist examines the tissue under a microscope and determines whether malignant cells are present."),
  p("If prostate adenocarcinoma is identified, the pathologist assigns the appropriate **Gleason score and Grade Group**. This information is central to risk classification."),
  p("[WhatsApp +91 90443 46292 with biopsy and MRI files](" + wa("I have a prostate MRI and/or biopsy. Please review the PI-RADS score, Grade Group and cores and advise the next step in India.") + ")"),

  h2("Types of Prostate Biopsy"),
  p("The two major routes are:"),
  h3("Transrectal biopsy"),
  p("The needle passes through the rectal wall into the prostate."),
  h3("Transperineal biopsy"),
  p("The needle passes through the skin between the scrotum and anus into the prostate."),
  p("The transperineal approach has gained increasing attention because it can reduce the risk of certain infections associated with transrectal procedures, although the choice depends on the center, operator and patient."),

  h2("What Is a Transperineal Prostate Biopsy?"),
  p("In a transperineal biopsy, the needle enters through the skin of the perineum."),
  p("The prostate is visualized using ultrasound, often with MRI information used to target suspicious lesions."),
  p("Potential advantages include access to different prostate regions, reduced exposure to rectal bacteria, and lower infection risk in many modern series."),
  p("The exact technique varies between centers. Compare [surgical hospitals](" + SURG_HOSP + ") in [Delhi NCR](/hospitals/India/Delhi-NCR/Surgical-Oncology) and [Mumbai](/hospitals/India/Mumbai/Surgical-Oncology)."),

  h2("What Is an MRI-Targeted Prostate Biopsy?"),
  p("If MRI identifies a suspicious lesion, the doctor can specifically target that area. This is called an **MRI-targeted biopsy**."),
  p("**Cognitive fusion:** the clinician uses the MRI images to mentally target the suspicious area during ultrasound-guided biopsy."),
  p("**Software fusion:** MRI images are electronically fused with real-time ultrasound."),
  p("**In-bore MRI biopsy:** the biopsy is performed while the patient is inside the MRI scanner."),
  p("Software fusion is widely used because it combines MRI information with real-time ultrasound guidance."),

  h2("What Is a Systematic Prostate Biopsy?"),
  p("A systematic biopsy samples predefined regions of the prostate according to a planned pattern."),
  p("It is designed to sample the prostate systematically rather than only targeting MRI-visible lesions."),
  p("Many modern biopsy approaches combine **MRI-targeted cores + systematic cores** because the two approaches can provide complementary information."),

  h2("Targeted vs Systematic Biopsy"),
  html(targeted),
  p("The appropriate biopsy strategy depends on the patient's clinical situation and the treating team's protocol."),

  h2("How Many Samples Are Taken During a Prostate Biopsy?"),
  p("There is no single number that applies to every biopsy."),
  p("The number depends on biopsy technique, MRI findings, number of suspicious lesions, whether systematic sampling is included, previous biopsy history and prostate size."),
  p("The pathology report may therefore contain multiple separate biopsy cores."),

  h2("What Happens After the Biopsy?"),
  p("The tissue samples are sent to a pathology laboratory. A specialist pathologist examines them under a microscope."),
  p("The report may state benign prostate tissue or prostate adenocarcinoma, plus Gleason score, Grade Group, percentage of each core involved, tumor length, Gleason pattern 4 percentage, perineural invasion, cribriform architecture, intraductal carcinoma and other findings."),
  p("The exact contents vary according to the biopsy and pathology laboratory."),

  h2("What Is the Gleason Score?"),
  p("The Gleason score describes the microscopic growth pattern of prostate cancer."),
  p("The pathologist identifies the predominant and secondary cancer patterns and combines them."),
  p("Examples include 3+3=6, 3+4=7, 4+3=7, 4+4=8 and 4+5=9."),
  p("The order matters. **3+4=7 is not the same Grade Group as 4+3=7.**"),

  h2("What Is the Grade Group?"),
  p("Grade Group simplifies prostate cancer grading into five groups:"),
  html(gradeTable),
  p("Grade Group helps doctors communicate the biological grade of the cancer more clearly than the raw Gleason score alone."),
  p("Grade Group 1 is the usual starting point for [active surveillance](" + AS + "). Grade Group 2 may still qualify in selected men. Higher groups more often lead to a discussion of [surgery](" + RARP + ") or [radiation](" + RAD + ")."),

  h2("Can a Prostate Biopsy Be Negative?"),
  p("Yes."),
  p("A negative biopsy means that cancer was not identified in the tissue samples obtained. But it does not always guarantee that prostate cancer is absent, because a biopsy samples selected areas of the prostate."),
  p("If PSA remains elevated, MRI is suspicious or clinical concern persists, doctors may consider repeat PSA, MRI, repeat or MRI-targeted biopsy, additional biomarkers or pathology review."),

  h2("What If the MRI Is Suspicious but the Biopsy Is Negative?"),
  p("This situation requires careful interpretation."),
  p("A suspicious MRI lesion with a negative biopsy can occur because the lesion was benign, the biopsy missed the lesion, the cancer was too small to detect, the targeted sample did not adequately represent the lesion, or the MRI finding has another explanation."),
  p("Depending on the level of suspicion, doctors may recommend pathology review, repeat MRI, repeat targeted biopsy or additional monitoring."),
  p("The next step depends on PSA density, PI-RADS score, biopsy quality and other risk factors."),

  h2("What If the MRI Is Negative?"),
  p("A negative or low-suspicion MRI reduces the likelihood of clinically significant prostate cancer, but it does not eliminate the possibility."),
  p("The doctor may consider PSA density, family history, previous biopsy, PSA trend, genetic risk, DRE and other biomarkers."),
  p("A low-risk patient with a reassuring MRI may be monitored. A high-risk patient with a negative MRI may still need biopsy."),
  p("This is why **MRI results should never be interpreted without the rest of the clinical picture**."),

  h2("Step 6: Staging After Prostate Cancer Is Confirmed"),
  p("Once biopsy confirms prostate cancer, the next question is: **How far has the cancer spread?**"),
  p("This is called **staging**. Doctors evaluate the primary tumor, regional lymph nodes and distant metastases."),
  p("The TNM system is commonly used: **T** = primary tumor, **N** = regional lymph nodes, **M** = distant metastases."),
  p("Other factors, including PSA and Grade Group, are also incorporated into clinical stage grouping."),

  h2("Where Does PSMA PET Fit Into Prostate Cancer Diagnosis?"),
  p("PSMA PET is an advanced molecular imaging test."),
  p("PSMA stands for **Prostate-Specific Membrane Antigen**. It is a protein found at high levels on many prostate cancer cells."),
  p("A radioactive tracer designed to bind to PSMA is injected into the bloodstream. The PET scanner then detects where the tracer accumulates."),
  p("This creates images showing areas that may contain PSMA-expressing prostate cancer."),
  img(
    "/uploads/articles/pca-dx-psma.webp",
    "Male patient on a PET imaging couch with a gold pelvic overlay used to explain PSMA PET/CT staging",
    "PSMA PET maps where disease may have spread. A negative scan does not undo a positive biopsy.",
  ),
  btn("Ask whether PSMA PET staging is appropriate", consult("PSMA PET Prostate Cancer")),
  p("[WhatsApp +91 90443 46292 with a PSMA PET report](" + wa("Please review my PSA, Grade Group and PSMA PET and advise staging and treatment options in India.") + ")"),

  h2("Is PSMA PET a Diagnostic Test or a Staging Test?"),
  p("It can serve several roles, but in prostate cancer it is particularly valuable for **staging and restaging**."),
  p("It can help identify prostate lesions, pelvic lymph-node disease, distant lymph-node disease, bone metastases, other metastatic sites and recurrent disease after previous treatment."),
  p("The joint EANM/SNMMI guideline lists initial staging, localization of recurrent or persistent disease and staging before PSMA-targeted radioligand therapy among important clinical uses."),

  h2("Does Everyone With Prostate Cancer Need a PSMA PET Scan?"),
  p("**No.**"),
  p("PSMA PET is not automatically required for every newly diagnosed patient."),
  p("Its usefulness depends on the probability that the cancer has spread and on how the scan result would affect management."),
  p("It is particularly relevant in selected patients with higher-risk newly diagnosed disease, suspected metastatic disease, biochemical recurrence, persistent disease after treatment, known metastatic prostate cancer, or evaluation before PSMA-targeted radioligand therapy."),
  p("See [recurrence after surgery](" + RECUR + ") when the question is a rising PSA after prostatectomy, and [Prostate Cancer Treatment in India](" + PILLAR + ") for Lutetium-177 PSMA therapy."),

  h2("Can PSMA PET Detect Prostate Cancer Inside the Prostate?"),
  p("Yes. PSMA PET can show prostate lesions in some patients."),
  p("However, **multiparametric MRI is generally more useful for detailed local anatomy of the prostate**."),
  p("MRI is particularly valuable for tumor location, local extension, surgical planning and biopsy targeting."),
  p("PSMA PET is particularly useful for lymph nodes, bone, distant metastases and recurrent disease."),
  p("These modalities therefore often complement rather than replace one another."),

  h2("PSMA PET vs MRI: What Is the Difference?"),
  html(mriVsPet),
  p("Neither test is universally “better.” They answer different questions."),

  h2("PSMA PET vs CT and Bone Scan"),
  p("Traditional staging may involve CT, bone scan and MRI."),
  p("PSMA PET provides a molecular approach that can identify PSMA-expressing prostate cancer."),
  p("In appropriate patients, it can improve detection of metastatic disease compared with conventional imaging alone."),
  p("SNMMI notes that PSMA molecular imaging can identify lymph-node and skeletal disease and may detect disease that conventional imaging does not show as clearly."),
  p("The choice of imaging depends on the patient's risk and the clinical question."),

  h2("How Does a PSMA PET/CT Scan Work?"),
  ol([
    "**Patient preparation** — instructions depend on the tracer and imaging center.",
    "**Radiotracer injection** — a small amount of a PSMA-targeting radioactive tracer is injected into a vein. Examples include Gallium-68 PSMA-11 and fluorine-18-based PSMA tracers.",
    "**Uptake period** — the tracer circulates and accumulates in tissues.",
    "**PET/CT imaging** — the patient lies on the scanner while images are obtained.",
    "**Interpretation** — a nuclear medicine physician or radiologist interprets the scan.",
  ]),
  p("The final report describes areas of increased tracer uptake and their clinical significance."),

  h2("Does PSMA PET Require a Biopsy First?"),
  p("Not always. The answer depends on the clinical situation."),
  p("In a man with suspected recurrence after previous treatment, PSMA PET may be used to locate recurrent disease based on rising PSA."),
  p("In newly diagnosed high-risk prostate cancer, PSMA PET may be used for staging after the diagnosis has been established."),
  p("But PSMA PET does **not replace tissue diagnosis when a biopsy is needed to establish that a suspicious prostate lesion is cancer**."),

  h2("Can PSMA PET Find Metastatic Prostate Cancer?"),
  p("Yes. This is one of its most important roles."),
  p("PSMA PET can identify disease in pelvic lymph nodes, retroperitoneal lymph nodes, bones and other distant locations."),
  p("However, PSMA uptake is not synonymous with cancer. Some benign conditions and other tumors can demonstrate PSMA uptake."),
  p("Therefore, scan findings must be interpreted by specialists in the context of the patient's clinical history."),

  h2("Can PSMA PET Be Negative Even When Prostate Cancer Is Present?"),
  p("Yes."),
  p("Not every prostate cancer expresses PSMA strongly enough to be detected. Some lesions may have low or absent PSMA expression. Small lesions can also be difficult to detect."),
  p("SNMMI guidance emphasizes the complementary role of anatomical imaging because PSMA-negative disease can occur."),
  p("A negative PSMA PET therefore does not automatically mean that no prostate cancer exists."),

  h2("Can PSMA PET Be Positive Without Cancer?"),
  p("Yes."),
  p("PSMA is not exclusively expressed by prostate cancer. Some benign processes and other cancers can show PSMA uptake."),
  p("Radiologists and nuclear medicine physicians interpret the pattern, intensity and location of uptake together with CT or other anatomical findings."),
  p("This is why a PSMA PET report should not be read as a simple **“positive = cancer”** or **“negative = no cancer”** test."),

  h2("What Is PSMA-RADS?"),
  p("Some centers use structured reporting systems such as **PSMA-RADS** to categorize PSMA PET findings."),
  p("These systems help standardize interpretation and communication. The exact reporting terminology can vary between institutions and tracers."),
  p("Patients should ask their nuclear medicine physician what the reported category means in their particular scan."),

  h2("How Accurate Is PSMA PET?"),
  p("Accuracy depends on PSA level, disease stage, tumor biology, lesion size, PSMA expression, tracer used, scanner technology and reader expertise."),
  p("PSMA PET has demonstrated important advantages for detecting prostate cancer spread in appropriate clinical settings, but it is not infallible."),
  p("It should be used where the result can meaningfully affect diagnosis, staging or treatment planning."),

  h2("When Is PSMA PET Used After Prostate Cancer Treatment?"),
  p("One major indication is **biochemical recurrence**."),
  p("For example, PSA may begin rising after radical prostatectomy, radiation therapy or other definitive treatment."),
  p("If recurrent cancer is suspected, PSMA PET can help identify local recurrence, pelvic lymph nodes, distant lymph nodes, bone metastases or other metastatic sites."),
  p("This information can influence salvage treatment planning. See [Prostate Cancer Recurrence After Surgery](" + RECUR + ")."),

  h2("Does PSMA PET Replace Bone Scans?"),
  p("Not in every clinical situation."),
  p("PSMA PET can be very useful for detecting bone metastases, and in appropriate patients it may be preferred over conventional bone imaging."),
  p("However, the appropriate imaging strategy depends on cancer risk, clinical setting, available technology, previous imaging, local guidelines and treatment planning."),

  h2("Does PSMA PET Replace MRI?"),
  p("No."),
  p("MRI and PSMA PET have complementary strengths. **MRI → local anatomy. PSMA PET → molecular whole-body assessment.** In some patients, both are useful."),

  h2("Does PSMA PET Replace Biopsy?"),
  p("Usually, no."),
  p("A PET scan can identify a highly suspicious area, but imaging alone generally does not provide the same histological diagnosis as tissue examination."),
  p("Biopsy determines whether cancer is present, cancer type, Gleason score and Grade Group."),
  p("PSMA PET helps determine where disease may be located, whether it may have spread, and whether recurrent disease is present."),

  h2("How the Tests Fit Together"),
  p("A useful way to understand prostate cancer diagnosis is:"),
  ol([
    "**PSA** — is there a prostate-related marker that needs investigation?",
    "**MRI** — is there a suspicious lesion, and where is it?",
    "**Biopsy** — is this actually cancer, and what grade is it?",
    "**PSMA PET / staging imaging** — has the cancer spread, and where?",
  ]),
  p("This sequence is not identical for every patient. Some men may have MRI before biopsy. Some may need repeat PSA first. Some high-risk patients may undergo PSMA PET after cancer is confirmed. Some patients with suspected recurrence may undergo PSMA PET without a new prostate biopsy."),

  h2("A Typical Prostate Cancer Diagnostic Journey"),
  p("Consider a hypothetical patient with **PSA 7.2 ng/mL**."),
  ol([
    "The PSA is repeated if clinically appropriate.",
    "Other causes of elevation are considered.",
    "Prostate MRI is performed. The MRI identifies a suspicious lesion.",
    "An MRI-targeted biopsy is performed.",
    "Pathology confirms **Gleason 3+4=7 / Grade Group 2**.",
    "The doctor assesses the clinical stage and overall risk.",
    "If the disease is considered sufficiently high risk, additional staging imaging may be recommended. PSMA PET may be used when appropriate.",
  ]),
  p("This example shows why **no single test provides the complete diagnosis**."),

  h2("What Happens If the Biopsy Confirms Prostate Cancer?"),
  p("Once cancer is confirmed, the doctor needs to determine Grade Group, tumor extent, PSA level, clinical stage, risk category and presence or absence of metastatic disease."),
  p("Additional tests may include MRI, PSMA PET/CT, CT, bone imaging and molecular/genetic testing in selected patients."),
  p("The exact work-up depends on the grade and risk profile. If treatment follows, GAF Healthcare planning ranges in India include [radical prostatectomy](" + RP + ") **$7,000–$18,000**, [EBRT](" + EBRT + ") **$1,000–$6,000+**, [IMRT](" + IMRT + ") **$6,500–$14,500**, [brachytherapy](" + BRACHY + ") **$5,500–$13,000** and [hormone therapy](" + HT + ") **$1,000–$4,500**. City pages such as [Delhi NCR prostatectomy](/costs/India/Delhi-NCR/Surgical-Oncology/Radical-Prostatectomy) use the same national ranges unless a hospital issues a verified quotation."),

  h2("How Is Prostate Cancer Staged?"),
  p("Staging determines how far the cancer has spread."),
  ul([
    "**Localized disease** — cancer remains within the prostate.",
    "**Locally advanced disease** — cancer has extended beyond the prostate or into nearby structures.",
    "**Regional disease** — cancer has spread to regional lymph nodes.",
    "**Metastatic disease** — cancer has spread to distant locations, commonly including bone or distant lymph nodes.",
  ]),
  p("PSA, Grade Group and TNM findings are integrated into the final stage grouping."),

  h2("What Is the Difference Between Diagnosis and Staging?"),
  p("**Diagnosis** asks whether cancer is present. Biopsy is central."),
  p("**Grading** asks how aggressive the cancer looks microscopically. Gleason score and Grade Group answer this."),
  p("**Staging** asks how far the cancer has spread. MRI, PSMA PET and other imaging can help."),
  p("**Risk classification** combines multiple findings to estimate the likelihood of clinically significant progression."),
  p("These are related but different steps."),

  h2("What Is a Prostate Cancer Pathology Report?"),
  p("After biopsy, the pathology report may contain cancer type, Gleason score, Grade Group, number of positive cores, percentage of cancer in each core, tumor length, Gleason pattern 4 percentage, cribriform pattern, intraductal carcinoma, perineural invasion and other pathological findings."),
  p("The report is then combined with PSA and imaging. Those findings feed [active surveillance](" + AS + ") decisions and [treatment options](" + OPTIONS + ")."),

  h2("Why Can Two Men With the Same PSA Need Different Tests?"),
  p("Because PSA is only one part of risk assessment."),
  p("**Patient A:** PSA 6, large prostate, low PSA density, reassuring MRI, no significant family history."),
  p("**Patient B:** PSA 6, small prostate, higher PSA density, suspicious MRI, strong family history."),
  p("The same PSA does not necessarily mean the same probability of clinically significant prostate cancer."),

  h2("Why Can Two Men With the Same MRI Result Need Different Management?"),
  p("A PI-RADS 3 lesion in one patient may be managed differently from a PI-RADS 3 lesion in another."),
  p("Doctors may consider PSA density, age, family history, previous biopsy, previous MRI, genetic risk, symptoms and clinical examination."),
  p("MRI is a tool for risk assessment, not an isolated decision-maker."),

  h2("What If PSA Is High but MRI Is Normal?"),
  p("A normal or low-suspicion MRI is reassuring but does not completely exclude clinically significant prostate cancer."),
  p("Depending on overall risk, options may include monitoring, repeat PSA, repeat MRI, biomarker testing or biopsy."),

  h2("What If PSA Is Normal but MRI Is Suspicious?"),
  p("A suspicious MRI with a normal PSA can still warrant investigation."),
  p("PSA is not a perfect screening test. Some prostate cancers produce relatively little PSA."),
  p("If MRI identifies a suspicious lesion, the doctor may recommend targeted biopsy depending on the complete clinical picture."),

  h2("What If PSA Is High and MRI Is Suspicious?"),
  p("This combination generally increases concern for clinically significant prostate cancer."),
  p("The next step may be biopsy, often using an MRI-targeted approach."),
  p("The exact decision depends on PSA level, PSA density, PI-RADS score, patient risk factors, previous biopsy and clinical examination."),

  h2("What If the Biopsy Is Positive but PSMA PET Is Negative?"),
  p("This can happen."),
  p("A positive biopsy proves that cancer is present in the sampled prostate tissue."),
  p("A negative PSMA PET may indicate that there is **no detectable PSMA-avid spread on that scan**. It does not invalidate the biopsy."),
  p("The patient may still have localized prostate cancer."),

  h2("What If PSMA PET Shows a Lesion Outside the Prostate?"),
  p("The finding needs expert interpretation."),
  p("Doctors may consider location, intensity of uptake, CT/MRI appearance, PSA, Grade Group, clinical history and whether the location is typical for prostate cancer spread."),
  p("Sometimes additional imaging or biopsy may be considered if the result would materially change treatment."),

  h2("Can Prostate Cancer Be Diagnosed Without PSA, MRI or Biopsy?"),
  p("PSA is an important tool, but prostate cancer can sometimes be suspected because of abnormal DRE, MRI findings, symptoms, imaging abnormalities or family/genetic risk. A biopsy may establish the diagnosis even when PSA is not markedly elevated."),
  p("MRI is extremely useful but is not required in every diagnostic pathway. Some patients may proceed to biopsy based on PSA, examination, risk factors or other findings."),
  p("In most situations where a definitive tissue diagnosis is needed, biopsy remains central. Imaging does not generally substitute for histological confirmation when a new prostate cancer diagnosis needs to be established."),

  h2("What Are the Risks of Prostate Biopsy?"),
  p("Prostate biopsy is generally a commonly performed procedure, but it has potential risks."),
  ul([
    "Blood in urine",
    "Blood in semen",
    "Rectal bleeding, depending on the approach",
    "Temporary urinary symptoms",
    "Infection",
    "Fever",
    "Urinary retention",
    "Discomfort",
  ]),
  p("The risk profile depends partly on whether the biopsy is transperineal or transrectal."),
  p("Patients should discuss the expected risks and warning signs with their treating team before the procedure."),

  h2("What Happens If a Biopsy Finds No Cancer?"),
  p("A negative biopsy can be reassuring. But the next step depends on the reason the biopsy was performed and the remaining level of suspicion."),
  p("A negative biopsy should therefore be interpreted as **“No cancer was found in the sampled tissue.”** It should not automatically be interpreted as **“Cancer is impossible.”**"),

  h2("Can Prostate Cancer Be Missed on MRI or Biopsy?"),
  p("Yes. MRI is powerful but not perfect. Small tumors, low-grade tumors, lesions in difficult locations and certain tumor types can be less conspicuous."),
  p("A biopsy samples part of the prostate. Cancer can occasionally be missed, especially if the lesion was not adequately targeted."),
  p("If clinical suspicion remains high, repeat evaluation may be appropriate."),

  h2("How Long Does Prostate Cancer Diagnosis Take?"),
  p("There is no single timeline."),
  p("It may take **PSA → repeat PSA → MRI → biopsy → pathology → staging**, and each step can take different amounts of time depending on appointment availability, MRI and biopsy scheduling, pathology processing, the need for additional imaging and the complexity of the case."),
  p("If the cancer appears high risk, doctors may prioritize staging and treatment planning."),

  h2("What Records Should You Keep?"),
  p("If you are undergoing prostate cancer evaluation, keep copies of:"),
  ul([
    "PSA reports and previous PSA results",
    "MRI images and MRI report",
    "Biopsy report and pathology slides when available",
    "Gleason score and Grade Group",
    "PSMA PET report and images",
    "CT/MRI reports",
    "Medication list",
    "Previous treatment records",
  ]),
  p("This becomes especially useful when seeking a second opinion or consulting a specialist in another city or country."),

  h2("What Should International Patients Bring for Prostate Cancer Diagnosis?"),
  p("For patients traveling to India for a prostate cancer evaluation, it is useful to bring:"),
  ul([
    "Passport identification documents as required",
    "Previous PSA reports and PSA trend over time",
    "MRI report and original images",
    "Biopsy report and pathology slides or blocks, if available",
    "Previous CT/PET/PSMA PET reports",
    "Treatment history and previous surgical or radiation records",
    "Medication list and discharge summaries",
  ]),
  p("**Original imaging files are often more useful than the written report alone.**"),
  p("The treating team may want to review the actual images rather than relying exclusively on an outside interpretation."),
  btn("Share records for a diagnosis second opinion", consult("Prostate Cancer Diagnosis")),
  p("[WhatsApp +91 90443 46292 to send PSA, MRI and biopsy files](" + wa("I would like to send PSA dates, MRI files and biopsy Grade Group for a prostate cancer diagnosis review in India.") + ")"),

  h2("When Should You Get a Second Opinion?"),
  p("A second opinion can be particularly useful when the biopsy shows Grade Group 2 or higher disease, pathology and imaging appear inconsistent, major surgery or radiation is being considered, [active surveillance](" + AS + ") is being considered, PSMA PET changes the apparent stage, the diagnosis is unusual, the pathology report is difficult to interpret, or the recommended treatment is complex."),
  p("A second opinion may involve a urologist, uro-oncologist, radiation oncologist, medical oncologist, genitourinary pathologist and nuclear medicine specialist."),

  h2("Prostate Cancer Diagnosis: The Complete Pathway at a Glance"),
  p("A simplified pathway is: risk assessment → PSA test → repeat PSA or additional risk assessment → DRE / biomarkers / PSA density → multiparametric MRI → biopsy when indicated → pathology → Gleason score + Grade Group → clinical staging → PSMA PET / CT / other imaging when appropriate → overall risk + stage → treatment or [active surveillance](" + AS + ") discussion."),
  p("Not every patient goes through every step. Some tests may be skipped, repeated or performed in a different order depending on the clinical situation."),

  h2("PSA vs MRI vs Biopsy vs PSMA PET: The Simple Comparison"),
  html(fourTests),

  h2("The Most Important Difference Between These Four Tests"),
  p("If you remember only four things, remember these:"),
  ul([
    "**PSA** — a blood marker. It tells you that something may need investigation.",
    "**MRI** — a detailed picture of the prostate. It helps locate suspicious areas.",
    "**Biopsy** — a tissue diagnosis. It determines whether cancer is actually present and provides the Grade Group.",
    "**PSMA PET** — a molecular map of prostate cancer activity. It helps determine whether cancer may have spread or returned.",
  ]),

  h2("Prostate Cancer Diagnosis: What Patients Often Get Wrong"),
  h3("“My PSA is high, so I definitely have cancer.”"),
  p("Not necessarily. BPH, prostatitis and other conditions can raise PSA."),
  h3("“My PSA is normal, so I definitely don't have cancer.”"),
  p("Not necessarily. Cancer can occur at relatively low PSA levels."),
  h3("“My MRI says PI-RADS 5, so I definitely have cancer.”"),
  p("No. PI-RADS 5 means a high level of suspicion, not a tissue diagnosis."),
  h3("“My MRI is normal, so I don't need any further assessment.”"),
  p("Not necessarily. The decision depends on PSA density, risk factors, previous biopsy and other findings."),
  h3("“My PSMA PET is negative, so I don't have prostate cancer.”"),
  p("No. PSMA PET is primarily a staging/restaging tool and cannot exclude every prostate cancer."),
  h3("“My biopsy shows Gleason 7, so I have Stage 4 cancer.”"),
  p("No. Gleason score describes grade. Stage describes the extent of spread. They are different concepts."),

  h2("What Happens After Diagnosis?"),
  p("Once the diagnostic information is complete, the treatment team generally determines grade, stage, risk group and patient factors (age, general health, life expectancy, existing medical conditions and treatment preferences)."),
  p("Depending on the situation, options may include [active surveillance](" + AS + "), [radical prostatectomy](" + RARP + "), [external beam radiation](" + RAD + "), [brachytherapy](" + BRACHY_BLOG + "), [hormone therapy](" + HT + "), systemic treatment, targeted treatment, radiopharmaceutical therapy or clinical trials."),
  p("Diagnosis is therefore not the end of the process. It is the point at which the medical team has enough information to discuss what comes next. See [treatment options](" + OPTIONS + ") and [treatment without surgery](" + NONSURG + ")."),

  h2("Prostate Cancer Diagnosis: Final Takeaway"),
  p("There is no single test that tells the entire story."),
  p("**PSA raises or lowers suspicion.** **MRI shows where suspicious tissue may be.** **Biopsy confirms whether cancer is present and determines its grade.** **Gleason score and Grade Group describe the cancer's microscopic characteristics.** **PSMA PET can help show whether prostate cancer has spread or returned in appropriate clinical settings.**"),
  p("The most useful diagnostic approach is therefore not **“Which test is best?”** It is **“What question are we trying to answer?”**"),

  h2("Frequently Asked Questions"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Related Prostate Cancer Resources"),
  p("This article is the diagnosis hub. Other cluster pages keep their own search intent:"),
  ul([
    "[Active Surveillance for Prostate Cancer](" + AS + ") — who can defer treatment after Grade Group 1 or selected Grade Group 2.",
    "[Prostate Cancer Treatment Options](" + OPTIONS + ") — how teams choose first treatment after staging.",
    "[Prostate Cancer Treatment Without Surgery](" + NONSURG + ") — radiation, hormone therapy and other options.",
    "[Robotic Prostatectomy in India](" + RARP + ") — if surgery is chosen after diagnosis.",
    "[Radiation Therapy for Prostate Cancer](" + RAD + ") — IMRT, IGRT and SBRT.",
    "[Brachytherapy for Prostate Cancer](" + BRACHY_BLOG + ") — internal radiation.",
    "[Prostate Cancer Recurrence After Surgery](" + RECUR + ") — PSMA PET when PSA rises after prostatectomy.",
    "[Prostate Cancer Diet](" + DIET + ") — eating during later treatment.",
    "[Prostate Cancer Treatment in India](" + PILLAR + ") — staging, PSMA PET and Lutetium-177 PSMA therapy.",
  ]),

  h2("How GAF Healthcare Can Help"),
  p("GAF Healthcare coordinates international patients who have an abnormal PSA, a PI-RADS MRI or a new biopsy and need a second look in India. Share every PSA date and value, MRI files, the full biopsy report with Grade Group and core involvement, and PSMA PET files when you have them. A coordinator can arrange review with a [uro-oncologist](" + SURG_DOCS + ") and, when staging is the question, a [radiation oncologist](" + RAD_DOCS + ") or nuclear-medicine specialist, then help set the next test or an itemized estimate if treatment is recommended."),
  btn("Share records for a diagnosis review", consult("Prostate Cancer Diagnosis")),
  p("[WhatsApp +91 90443 46292 with your records](" + wa("I would like to share PSA, MRI and biopsy Grade Group for a prostate cancer diagnosis review in India.") + ")"),

  h2("Medical Disclaimer"),
  p("This article is intended for general educational purposes and does not replace medical advice, diagnosis or treatment."),
  p("The appropriate diagnostic pathway varies between patients. PSA, MRI, biopsy and PSMA PET should be interpreted together with medical history, examination, pathology and other relevant findings."),
  p("If you have an abnormal PSA, suspicious MRI, urinary symptoms or a previous prostate cancer diagnosis, discuss the appropriate next step with a qualified urologist, uro-oncologist or other specialist."),

  h2("Top 5 Sources"),
  p("1. [NCI — Prostate Cancer Treatment (PDQ)](https://www.cancer.gov/types/prostate/patient/prostate-treatment-pdq) — how diagnosis, grading and staging fit together."),
  p("2. [NCI — Prostate-Specific Antigen (PSA) Test](https://www.cancer.gov/types/prostate/psa-fact-sheet) — what PSA can and cannot show."),
  p("3. [EANM/SNMMI — PSMA PET/CT Prostate Cancer Imaging Guideline 2.0](https://snmmi.org/Web/Web/Clinical-Practice/Procedure-Standards/Standards/EANM-SNMMI-guideline-for-Prostate-Cancer-Imaging-2.aspx) — staging, restaging and radioligand-therapy work-up."),
  p("4. [SNMMI — Appropriate Use Criteria for PSMA PET Imaging](https://snmmi.org/AM/Web/Clinical-Practice/Appropriate-Use-Criteria/Articles/Appropriate-Use-Criteria-for-Prostate-Specific-Membrane-Antigen--PSMA--PET-Imaging.aspx) — when a PSMA scan is likely to change management."),
  p("5. [SNMMI — Molecular Imaging and Prostate Cancer](https://snmmi.org/AM/Patients/Fact-Sheets/Molecular-Imaging-and-Prostate-Cancer.aspx) — patient-facing overview of PSMA imaging."),
  p("**Last reviewed against the cited sources: September 2026.**"),
];

const now = "2026-09-28T07:30:00.000Z";
const SLUG = "prostate-cancer-diagnosis-psa-mri-biopsy-psma-pet";

const article = {
  id: "art_prostate_cancer_diagnosis_psa_mri_biopsy_psma_pet",
  slug: SLUG,
  title: "Prostate Cancer Diagnosis: PSA, MRI, Biopsy and PSMA PET Explained",
  excerpt:
    "PSA raises suspicion. MRI locates a lesion. Biopsy confirms Grade Group. PSMA PET asks whether disease has spread. How the tests fit together — and what they cannot do alone.",
  date: "28 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Surgical Oncology",
  tags: ["prostate cancer", "diagnosis", "PSA", "MRI", "biopsy", "PSMA PET", "India"],
  image: "/uploads/articles/pca-dx-anatomy.webp",
  imageAlt:
    "Transparent male body with a gold highlight on an intact prostate in the pelvis and teal pelvic lymph nodes",
  status: "published",
  featured: true,
  seoTitle: "Prostate Cancer Diagnosis: PSA, MRI, Biopsy, PSMA PET",
  seoDescription:
    "How prostate cancer is diagnosed: PSA, MRI, PI-RADS, biopsy Grade Group and PSMA PET staging — what each test answers, and second opinions in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/pca-dx-anatomy.webp",
  allowIndex: true,
  keywords: [
    "prostate cancer diagnosis",
    "prostate cancer diagnosis tests",
    "PSA test for prostate cancer",
    "prostate MRI",
    "prostate biopsy",
    "PSMA PET scan",
    "prostate cancer diagnosis process",
    "how prostate cancer is diagnosed",
    "prostate cancer screening",
    "prostate biopsy results",
    "Gleason score",
    "Grade Group",
    "prostate cancer staging",
    "PSMA PET CT prostate cancer",
  ],
  relatedLinks: [
    { label: "Active surveillance", href: AS },
    { label: "Treatment options", href: OPTIONS },
    { label: "Robotic Prostatectomy in India", href: RARP },
    { label: "Radiation Therapy for Prostate Cancer", href: RAD },
    { label: "Recurrence after surgery", href: RECUR },
    { label: "Prostate Cancer Treatment in India", href: PILLAR },
  ],
  blocks,
};

if (!store.categories.includes("Surgical Oncology")) store.categories.push("Surgical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["pca-dx-anatomy.webp", article.imageAlt],
  [
    "pca-dx-psa.webp",
    "Male patient in clinic with a gold pelvic overlay while a clinician reviews PSA results on a tablet",
  ],
  [
    "pca-dx-mri.webp",
    "Male patient on an MRI couch with a gold pelvic overlay highlighting the prostate during diagnostic imaging",
  ],
  [
    "pca-dx-psma.webp",
    "Male patient on a PET imaging couch with a gold pelvic overlay used to explain PSMA PET/CT staging",
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

const dxLink = { label: "Prostate cancer diagnosis", href: DX };
for (const siblingId of [
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
  if (!sibling.relatedLinks.some((row) => row.href === DX)) {
    sibling.relatedLinks.unshift(dxLink);
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length);

const treatmentsPath = join(process.cwd(), "content/curated-treatments.json");
const treatments = JSON.parse(readFileSync(treatmentsPath, "utf8"));
const treatment = treatments.treatments.find((row) => row.slug === "prostate-cancer-treatment-in-india");
if (treatment?.translations?.en?.editorialBody && !treatment.translations.en.editorialBody.includes(DX)) {
  treatment.translations.en.editorialBody = treatment.translations.en.editorialBody.replace(
    "Who may safely delay surgery or radiation is covered in [Active Surveillance for Prostate Cancer](/blogs/active-surveillance-prostate-cancer).",
    "Who may safely delay surgery or radiation is covered in [Active Surveillance for Prostate Cancer](/blogs/active-surveillance-prostate-cancer). How PSA, MRI, biopsy and PSMA PET fit together is covered in [Prostate Cancer Diagnosis](/blogs/prostate-cancer-diagnosis-psa-mri-biopsy-psma-pet).",
  );
  writeFileSync(treatmentsPath, `${JSON.stringify(treatments, null, 2)}\n`);
  console.log("linked diagnosis blog from treatment editorial");
}

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes("prostate-cancer-diagnosis-psa-mri-biopsy-psma-pet")) {
  llms = llms.replace(
    "and [active surveillance for prostate cancer](https://gaf.healthcare/blogs/active-surveillance-prostate-cancer).",
    ", [active surveillance for prostate cancer](https://gaf.healthcare/blogs/active-surveillance-prostate-cancer) and [prostate cancer diagnosis](https://gaf.healthcare/blogs/prostate-cancer-diagnosis-psa-mri-biopsy-psma-pet).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}
