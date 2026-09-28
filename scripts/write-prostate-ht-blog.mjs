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
const HT_BLOG = "/blogs/hormone-therapy-for-prostate-cancer";
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

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body"><strong>What is hormone therapy for prostate cancer?</strong></p><p class="article-quick-answer__body">Hormone therapy reduces testosterone and other androgens or blocks their action on prostate cancer cells. The most common form is androgen deprivation therapy (ADT).</p><p class="article-quick-answer__body"><strong>What medicines are used for ADT?</strong></p><p class="article-quick-answer__body">Common options include:</p><ul class="article-quick-answer__list"><li>Leuprolide</li><li>Goserelin</li><li>Triptorelin</li><li>Degarelix</li><li>Relugolix</li><li>Abiraterone</li><li>Enzalutamide</li><li>Apalutamide</li><li>Darolutamide</li></ul><p class="article-quick-answer__body">The medicines work in different ways and are selected according to the stage and characteristics of the cancer.</p><p class="article-quick-answer__body"><strong>How long is hormone therapy given?</strong></p><p class="article-quick-answer__body">Duration depends on the treatment setting. ADT may be given for several months with radiation therapy, for 18–36 months in some high-risk radiation-treatment plans, or continuously in many men with metastatic disease.</p><p class="article-quick-answer__body"><strong>What are the common side effects?</strong></p><p class="article-quick-answer__body">Hot flashes, reduced sexual desire, erectile dysfunction, fatigue, weight gain, loss of muscle mass and bone loss are common. Long-term treatment can also affect metabolic and cardiovascular health.</p><p class="article-quick-answer__body"><strong>Does hormone therapy cure prostate cancer?</strong></p><p class="article-quick-answer__body">Hormone therapy alone usually does not cure prostate cancer. In some localized or locally advanced cancers, however, it can improve the effectiveness of radiation therapy. In metastatic disease, it is an important part of treatment that can control the cancer for a period of time.</p></aside>`;

const medTable = `<div class="md-body"><table><thead><tr><th>Treatment</th><th>How it works</th><th>Typical role</th></tr></thead><tbody><tr><td>Leuprolide</td><td>Lowers testicular testosterone production</td><td>ADT</td></tr><tr><td>Goserelin</td><td>Lowers testosterone production</td><td>ADT</td></tr><tr><td>Triptorelin</td><td>Lowers testosterone production</td><td>ADT</td></tr><tr><td>Degarelix</td><td>GnRH antagonist; rapidly suppresses testosterone</td><td>ADT</td></tr><tr><td>Relugolix</td><td>Oral GnRH antagonist</td><td>ADT</td></tr><tr><td>Bicalutamide</td><td>Blocks androgen receptor</td><td>Older anti-androgen / flare protection</td></tr><tr><td>Enzalutamide</td><td>Blocks androgen receptor signalling</td><td>Advanced prostate cancer</td></tr><tr><td>Apalutamide</td><td>Blocks androgen receptor signalling</td><td>Advanced prostate cancer</td></tr><tr><td>Darolutamide</td><td>Blocks androgen receptor signalling</td><td>Advanced prostate cancer</td></tr><tr><td>Abiraterone</td><td>Reduces androgen synthesis</td><td>Advanced prostate cancer</td></tr><tr><td>Orchiectomy</td><td>Surgically removes the main source of testosterone</td><td>Permanent ADT</td></tr></tbody></table></div>`;

const durTable = `<div class="md-body"><table><thead><tr><th>Clinical situation</th><th>Possible duration</th></tr></thead><tbody><tr><td>Radiation for selected intermediate-risk disease</td><td>Often several months</td></tr><tr><td>High-risk prostate cancer treated with radiation</td><td>Often long-term, commonly around 18–36 months depending on the treatment plan</td></tr><tr><td>Locally advanced disease</td><td>Often long-term ADT</td></tr><tr><td>Metastatic hormone-sensitive disease</td><td>Usually ongoing while disease remains hormone-sensitive and treatment is tolerated</td></tr><tr><td>Castration-resistant disease</td><td>ADT generally continues while additional treatment is given</td></tr><tr><td>Biochemical recurrence</td><td>Individualized; intermittent treatment may be considered in selected situations</td></tr></tbody></table></div>`;

const crpcTable = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Hormone-sensitive</th><th>Castration-resistant</th></tr></thead><tbody><tr><td>Testosterone</td><td>Low or can be lowered effectively</td><td>Already at castrate level</td></tr><tr><td>Cancer response</td><td>Responds to androgen suppression</td><td>Progresses despite suppression</td></tr><tr><td>PSA</td><td>Often falls with treatment</td><td>May begin rising</td></tr><tr><td>Additional treatment</td><td>May not initially be needed beyond planned regimen</td><td>Usually requires treatment modification/addition</td></tr><tr><td>ADT</td><td>Used</td><td>Usually continued</td></tr><tr><td>Other treatments</td><td>Depends on stage</td><td>Often additional systemic therapy</td></tr></tbody></table></div>`;

const faqs = [
  ["How long does hormone therapy for prostate cancer last?", "It can last several months, 18–36 months in some radiation-treatment plans, or indefinitely in many patients with metastatic disease. The duration depends on the stage and treatment strategy."],
  ["Is ADT the same as hormone therapy?", "ADT is one of the main forms of hormone therapy. The broader term “hormone therapy” can also include medicines that block androgen receptors or androgen production."],
  ["What is the most common ADT injection?", "Leuprolide, goserelin and triptorelin are commonly used GnRH agonists. Degarelix is a GnRH antagonist. Availability varies by country and hospital."],
  ["Is there a tablet instead of an ADT injection?", "Yes. Relugolix is an oral GnRH antagonist. Other oral hormonal medicines, including enzalutamide, apalutamide, darolutamide and abiraterone, work through different mechanisms."],
  ["Does hormone therapy cause erectile dysfunction?", "It can. Reduced testosterone can lower sexual desire and make erections difficult. These effects can be significant during treatment."],
  ["Does ADT cause weight gain?", "Weight gain, particularly increased body fat, can occur. Loss of muscle mass can occur at the same time."],
  ["Can exercise help during hormone therapy?", "Yes. Regular aerobic and resistance exercise can help with muscle loss, weight management, fatigue, physical function and some metabolic effects."],
  ["Does hormone therapy weaken bones?", "Long-term ADT can reduce bone mineral density and increase fracture risk. Bone health should therefore be assessed and monitored."],
  ["Does PSA always fall after hormone therapy?", "In hormone-sensitive prostate cancer, PSA often falls when treatment is effective. However, PSA response varies and must be interpreted alongside testosterone, imaging and symptoms."],
  ["What happens if PSA rises while on ADT?", "Doctors may check testosterone to confirm adequate androgen suppression and may order imaging to determine whether the cancer has progressed. The next treatment depends on whether the cancer is hormone-sensitive or castration-resistant."],
  ["Can hormone therapy be stopped?", "Sometimes. A defined treatment course may be stopped after the planned duration. Intermittent ADT can also involve treatment breaks in selected patients. However, patients should never stop ADT on their own."],
  ["Does testosterone return after ADT?", "It can recover after treatment stops, but recovery varies. After prolonged treatment, testosterone may not return fully to its previous level."],
  ["Can prostate cancer become resistant to hormone therapy?", "Yes. Some prostate cancers eventually progress despite very low testosterone. This is known as castration-resistant prostate cancer."],
  ["Is ADT used with radiation?", "Yes. ADT is commonly combined with radiation for selected unfavorable intermediate-risk, high-risk and locally advanced prostate cancers."],
  ["Is ADT used after prostatectomy?", "It may be used in selected patients, particularly when there are high-risk pathological or nodal features or when recurrence develops. The decision is individualized."],
  ["Is hormone therapy used for metastatic prostate cancer?", "Yes. ADT is a foundation of treatment for metastatic prostate cancer. Current treatment often adds another systemic medicine such as an ARPI for suitable patients."],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("Hormone therapy is one of the most widely used systemic treatments for prostate cancer. It is also called **androgen deprivation therapy (ADT)** or **androgen suppression therapy**."),
  p("The basic principle is simple: prostate cancer cells often depend on male hormones, particularly testosterone and other androgens, to grow. Hormone therapy either lowers the amount of these hormones in the body or prevents them from stimulating cancer cells."),
  p("ADT may be used by itself in selected situations, but it is also frequently combined with **[radiation therapy](" + RAD + "), newer androgen receptor pathway medicines, [chemotherapy](" + CHEMO + "), or other treatments** depending on the [stage](" + STAGES + ") and biology of the cancer."),
  p("For men with metastatic prostate cancer, modern treatment often involves more than traditional testosterone suppression alone. Current guidelines increasingly support combination approaches using ADT plus medicines such as **abiraterone, enzalutamide, apalutamide or darolutamide** in appropriate patients."),
  p("The duration can range from a few months to several years, or indefinitely in some men with advanced disease. There is no single duration that applies to every patient."),
  p("This is the ADT hub for the prostate cluster. It sits beside [treatment without surgery](" + NONSURG + "), [radiation](" + RAD + "), [Lu-177 PSMA](" + LU + "), [PSMA PET](" + PET + ") and [Prostate Cancer Treatment in India](" + PILLAR + "). GAF Healthcare planning ranges for [hormone therapy](" + HT + ") in India are **$1,000–$4,500**; city pages such as [Delhi NCR hormone therapy](/costs/India/Delhi-NCR/Medical-Oncology/Hormone-Therapy) use the same national range unless a hospital issues a verified quotation."),
  p("International patients comparing [medical oncologists](" + MED_DOCS + ") and [radiation oncologists](" + RAD_DOCS + ") commonly start with [Delhi NCR](/doctors/India/Delhi-NCR/Medical-Oncology), [Mumbai](/doctors/India/Mumbai/Medical-Oncology), [Bengaluru](/doctors/India/Bengaluru/Medical-Oncology), [Chennai](/doctors/India/Chennai/Radiation-Oncology) and [Hyderabad](/doctors/India/Hyderabad/Medical-Oncology). Partner [medical-oncology hospitals](" + MED_HOSP + ") in [Delhi NCR](/hospitals/India/Delhi-NCR/Medical-Oncology) and [Mumbai](/hospitals/India/Mumbai/Medical-Oncology) are a typical first filter."),
  btn("Ask about ADT or an ARPI in India", consult("Hormone Therapy ADT")),
  p("[WhatsApp +91 90443 46292 with your stage, PSA and current medicines](" + wa("Please review my prostate cancer stage, PSA and current hormone medicines and advise the next ADT or ARPI step in India.") + ")"),
  img(
    "/uploads/articles/pca-ht-anatomy.webp",
    "Transparent male body with teal adrenal glands, teal bladder, gold prostate and modest gold testicular overlay used to explain androgen deprivation",
    "ADT lowers testicular testosterone or blocks androgen signalling. It is not the same as chemotherapy, and it is not automatically a cure.",
  ),

  h2("What Is Hormone Therapy for Prostate Cancer?"),
  p("Hormone therapy works by interfering with **androgens**, the group of hormones that includes testosterone. Most testosterone is produced by the testicles. Smaller amounts of androgen-related hormones are produced elsewhere, including the adrenal glands and, within prostate cancer cells, through other biochemical pathways."),
  p("Prostate cancer cells can use these hormones by activating the **androgen receptor**. Once activated, this pathway can stimulate cancer-cell growth. Hormone therapy therefore attacks the disease indirectly. Instead of destroying cancer cells like radiation or surgery, it changes the hormonal environment that the cancer needs to grow."),
  p("The two broad strategies are: **reduce testosterone and androgen production**, and **block androgen signalling at the cancer cell**. Modern prostate cancer treatment can use one or both approaches. How the cancer was staged is covered in [Stages 1 to 4](" + STAGES + "); how Grade Group is assigned is in [Gleason Score and Grade Group](" + GG + ")."),

  h2("What Does ADT Mean?"),
  p("**ADT stands for androgen deprivation therapy.** It is sometimes called androgen suppression therapy, hormonal therapy, hormone treatment, testosterone suppression or medical castration. The term “medical castration” is used because certain medicines can reduce testosterone to very low levels without surgically removing the testicles."),
  p("ADT should not be confused with every form of hormone-related treatment. **Abiraterone, enzalutamide, apalutamide and darolutamide** are often added to ADT in advanced disease because they interfere with the androgen pathway in different ways."),

  h2("How Does Hormone Therapy Work?"),
  p("There are several points in the androgen pathway where treatment can intervene."),
  ul([
    "**Stop the testicles from producing testosterone.** GnRH/LHRH agonists and antagonists reduce testicular testosterone. Examples: leuprolide, goserelin, triptorelin, degarelix, relugolix.",
    "**Block the androgen receptor.** Enzalutamide, apalutamide, darolutamide and bicalutamide prevent androgens from activating the receptor.",
    "**Reduce androgen production elsewhere.** Abiraterone blocks CYP17, an enzyme involved in androgen production. It is generally used together with ongoing ADT or surgical testosterone suppression.",
  ]),
  p("These different mechanisms explain why modern treatment may involve combinations rather than a single hormone medicine."),
  img(
    "/uploads/articles/pca-ht-clinic.webp",
    "Male patient in clinic with a gold prostate and testicular overlay while a clinician explains androgen deprivation therapy",
    "Ask which medicine is ADT, which is an ARPI, and whether they are being combined. The names are easy to mix up.",
  ),

  h2("When Is Hormone Therapy Used for Prostate Cancer?"),
  p("Hormone therapy is not automatically given to every man diagnosed with prostate cancer. Its role depends on cancer stage, PSA, Gleason score, Grade Group, lymph-node involvement, metastases, risk of recurrence, previous treatment, overall health, planned radiation or systemic treatment, and patient preferences."),
  h3("1. Hormone therapy with radiation therapy"),
  p("ADT is commonly combined with [radiation](" + RAD + ") in selected men with **unfavorable intermediate-risk, high-risk or locally advanced prostate cancer**. Lowering androgen activity can make prostate cancer cells more vulnerable to radiation and can help control cancer outside the immediate radiation field."),
  p("The duration is not the same for everyone. Depending on the risk category and treatment strategy, ADT may be given for several months or for a longer period. For high-risk and locally advanced disease treated with radiation, long-term ADT has traditionally been used for approximately **2–3 years** in appropriate patients. GAF Healthcare planning ranges include [EBRT](" + EBRT + ") **$1,000–$6,000+**, [IMRT](" + IMRT + ") **$6,500–$14,500** and [brachytherapy](" + BRACHY + ") **$5,500–$13,000** — billed separately from ADT."),
  btn("Ask about ADT with radiation", consult("ADT with radiation")),
  h3("2. Hormone therapy after recurrence"),
  p("A rising PSA may be the first indication of recurrence after surgery or radiation. Depending on the location and speed of recurrence, treatment may include salvage radiation, ADT, radiation plus ADT, newer androgen receptor pathway inhibitors or other systemic treatments. See [Prostate Cancer Recurrence After Surgery](" + RECUR + ")."),
  h3("3. Hormone therapy for metastatic prostate cancer"),
  p("When prostate cancer has spread to distant lymph nodes, bones or other organs, ADT becomes a central component of systemic treatment. **ADT alone is no longer the only modern approach for many fit patients with metastatic hormone-sensitive prostate cancer**."),
  p("Current EAU guidance recommends discussing combination treatment, including ADT plus an androgen receptor pathway inhibitor such as abiraterone plus prednisone, apalutamide, enzalutamide or darolutamide. Some patients may also be candidates for combinations involving [chemotherapy](" + CHEMO + ") (**$1,500–$8,000+**)."),
  p("[WhatsApp +91 90443 46292 about ADT plus an ARPI](" + wa("I have metastatic prostate cancer. Please advise whether ADT plus an ARPI in India is appropriate.") + ")"),
  h3("4. Hormone therapy for castration-resistant prostate cancer"),
  p("Some prostate cancers eventually continue growing despite testosterone being suppressed to castrate levels. This is **castration-resistant prostate cancer (CRPC)**. ADT usually does **not** simply stop. Men with CRPC generally continue testosterone suppression while additional treatment is selected."),
  p("Treatment may include enzalutamide, abiraterone, chemotherapy, PARP inhibitors for selected genetic alterations, [lutetium-177 PSMA therapy](" + LU + ") in appropriate patients, or other systemic treatments. The EAU recommends basing selection on symptoms, performance status, comorbidities, disease location and extent, genomic profile and previous treatments."),

  h2("Types of Hormone Therapy for Prostate Cancer"),
  html(medTable),
  p("The appropriate medicine depends on the clinical setting rather than simply choosing the newest drug."),

  h2("GnRH Agonists: Leuprolide, Goserelin and Triptorelin"),
  p("GnRH agonists are among the most established forms of medical ADT. They are generally given as injections or implants at intervals determined by the specific product — approximately monthly, or at longer intervals including every several months."),
  p("There can initially be a temporary rise in testosterone before testosterone subsequently falls to very low levels. This is called an **androgen flare**. In most patients it is manageable, but it can be clinically important in men with certain advanced cancers, particularly when there is concern about spinal cord compression or urinary obstruction. An older anti-androgen may sometimes be used temporarily when starting a GnRH agonist to reduce flare."),

  h2("GnRH Antagonists: Degarelix and Relugolix"),
  p("GnRH antagonists suppress testosterone without producing the same initial testosterone surge associated with GnRH agonists. **Degarelix** is administered by injection and can rapidly suppress testosterone. **Relugolix** is an oral GnRH antagonist taken daily."),
  p("The choice between an agonist and antagonist depends on the patient's disease, cardiovascular risk, convenience, medication adherence and other clinical factors. The EAU notes that GnRH antagonists may be particularly relevant in patients with cardiovascular disease or cardiovascular risk factors."),

  h2("What Is an Androgen Receptor Inhibitor?"),
  p("Androgen receptor inhibitors work further downstream. Instead of simply lowering testosterone, they interfere with the ability of androgens to activate the androgen receptor. Important newer drugs include **enzalutamide, apalutamide and darolutamide**, often called **androgen receptor pathway inhibitors (ARPIs)**."),
  h3("Enzalutamide"),
  p("Enzalutamide can be used in several advanced settings, including selected men with metastatic hormone-sensitive disease, non-metastatic CRPC, metastatic CRPC and certain high-risk biochemical recurrence settings. Potential side effects include fatigue, hot flashes, diarrhea, high blood pressure, dizziness, falls and, rarely, seizures."),
  h3("Apalutamide"),
  p("Apalutamide is used in selected patients with metastatic hormone-sensitive disease and non-metastatic castration-resistant disease. Possible adverse effects include fatigue, rash, hot flashes, falls, fractures and hypothyroidism in some patients. Its use is generally combined with testosterone suppression rather than used as a replacement for ADT in metastatic disease."),
  h3("Darolutamide"),
  p("Darolutamide has a distinct molecular structure. The FDA expanded its indication to metastatic castration-sensitive prostate cancer in 2025, including use with ADT and in appropriate treatment combinations. Its central nervous system penetration is relatively limited compared with some other ARPIs. That does not mean it is free of side effects, but the adverse-effect profile can differ between ARPIs."),

  h2("What Is Abiraterone?"),
  p("Abiraterone works differently. It blocks the **CYP17 enzyme**, which is involved in androgen production, reducing androgen production not only in the testicles but also through other steroid-producing pathways. It is usually given with a low dose of **prednisone or another corticosteroid**."),
  p("Potential adverse effects include high blood pressure, fluid retention, low potassium, liver abnormalities, fatigue and joint or muscle symptoms. Patients receiving abiraterone require appropriate monitoring."),

  h2("ADT vs Newer Hormone Medicines: What Is the Difference?"),
  ul([
    "**Traditional ADT** primarily lowers testosterone production from the testicles.",
    "**Androgen receptor inhibitors** prevent androgen signalling at the cancer cell.",
    "**Abiraterone** reduces androgen production through steroid hormone synthesis pathways.",
  ]),
  p("In advanced disease, doctors may combine these approaches because prostate cancer can adapt to low testosterone and continue using the androgen receptor pathway."),
  btn("Ask whether you need ADT plus an ARPI", consult("ADT plus ARPI")),

  h2("Hormone Therapy Duration: How Long Is ADT Given?"),
  p("There is **no universal duration**. The answer depends heavily on why ADT is being prescribed."),
  html(durTable),
  p("These are **general treatment patterns, not prescriptions for an individual patient**. The EAU recommends individualized follow-up based on stage, symptoms, prognostic factors and treatment."),
  p("[WhatsApp +91 90443 46292 about planned ADT duration](" + wa("Please advise how long ADT is planned in my case and whether it is continuous or a defined course with radiation.") + ")"),

  h2("Why Does ADT Sometimes Continue for Years?"),
  p("In localized prostate cancer treated with curative-intent radiation, ADT may have a defined start and stop date. Metastatic disease is different. When prostate cancer has spread, ADT is often continued because maintaining low testosterone remains part of disease control. If the cancer later becomes castration-resistant, testosterone suppression is generally maintained while another systemic treatment is added."),

  h2("Can Hormone Therapy Be Intermittent?"),
  p("**Intermittent ADT** means treatment is given for a period, stopped when certain criteria are reached, and restarted later when the disease shows signs of returning or progressing. The potential advantage is a treatment-free period during which some hormone-related side effects may improve. It is not appropriate for every patient or every stage."),
  p("Evidence summarized by the NCI has found no clear overall-survival difference between intermittent and continuous ADT across advanced/recurrent settings in a large systematic review, while some studies found improvements in physical and sexual functioning during treatment breaks. The decision has to be individualized."),

  h2("What Happens When Hormone Therapy Stops?"),
  p("Testosterone does not necessarily return immediately after stopping ADT. Recovery depends on age, duration of treatment, type of ADT, baseline testosterone, other treatments and individual biology. Some men recover testosterone substantially. Others, particularly after prolonged treatment, may have incomplete recovery. Sexual symptoms and some other effects may therefore persist even after treatment is stopped."),

  h2("Side Effects of Hormone Therapy for Prostate Cancer"),
  p("Most side effects are related to the reduction in testosterone. Common effects include hot flashes, night sweats, reduced sexual desire, erectile dysfunction, fatigue, weight gain, loss of muscle mass, reduced physical strength, bone loss, increased fracture risk, mood changes, breast enlargement or tenderness, changes in cholesterol, insulin resistance and anemia. The risk and severity vary between patients and generally increase with longer exposure to ADT."),
  h3("Hot flashes"),
  p("Hot flashes can happen during the day or at night. Management can include regular physical activity, maintaining a healthy weight, avoiding known triggers, cooling strategies and selected medications when necessary."),
  h3("Sexual side effects"),
  p("ADT can have a major effect on sexual health: reduced sexual desire, difficulty achieving an erection, reduced spontaneous erections, changes in ejaculation and reduced sexual satisfaction. Medicines such as sildenafil may help some forms of erectile dysfunction, but they do not necessarily restore sexual desire caused by very low testosterone. Sexual health should be discussed openly before starting long-term ADT."),
  h3("Weight gain and loss of muscle"),
  p("Long-term ADT can change body composition. Some men gain abdominal fat while losing muscle mass. Regular resistance exercise and aerobic activity can help. Practical eating notes are in [Prostate Cancer Diet](" + DIET + ")."),

  h2("Bone Loss and Osteoporosis"),
  p("Testosterone plays an important role in maintaining bone health. Long-term ADT can reduce bone mineral density and increase fracture risk. Doctors may consider baseline bone mineral density testing, DEXA scanning, calcium and vitamin D assessment, weight-bearing exercise, resistance training, fall prevention and bone-protective medicines when indicated. Depending on fracture risk, medicines such as **denosumab or bisphosphonates** may be considered."),
  img(
    "/uploads/articles/pca-ht-bones.webp",
    "Transparent male skeleton with a teal prostate in the pelvis used to explain bone health during long-term ADT",
    "Ask whether a DEXA scan is due. Bone loss is a monitoring issue, not an afterthought.",
  ),

  h2("Heart and Metabolic Health During ADT"),
  p("Long-term androgen deprivation can affect metabolic health: increased body fat, insulin resistance, changes in cholesterol, increased blood sugar and higher cardiovascular risk in some patients. The EAU recommends monitoring metabolic complications during ADT, including lipid profiles and HbA1c. Men with existing cardiovascular disease should make sure their oncology team knows their complete cardiac history."),
  img(
    "/uploads/articles/pca-ht-heart.webp",
    "Male patient in clinic with a teal heart overlay and gold prostate while a clinician discusses cardiovascular monitoring on ADT",
    "Heart history, blood pressure, diabetes and lipids belong in the same conversation as PSA.",
  ),
  p("ADT can contribute to insulin resistance. That does not mean every man receiving ADT will develop diabetes. Men with diabetes or prediabetes may need closer monitoring of blood glucose, HbA1c, weight, blood pressure and lipids. ADT may also alter lipid metabolism."),

  h2("Mood, Memory and Emotional Changes"),
  p("Some men experience irritability, low mood, reduced motivation, sleep problems, difficulty concentrating or memory complaints. Depression should not simply be accepted as an unavoidable part of cancer treatment. If significant mood or cognitive changes occur, they should be discussed with the treating team."),

  h2("Monitoring During Hormone Therapy"),
  p("PSA remains an important marker, but it is not the only measurement. Doctors may monitor PSA, testosterone, blood count, liver and kidney function, blood glucose, HbA1c, lipid profile, bone mineral density, blood pressure, weight, symptoms and treatment-specific adverse effects."),
  p("The EAU recommends checking PSA and testosterone during ADT and monitoring for metabolic complications. In metastatic disease, follow-up may also include regular imaging because disease progression does not always produce an immediate PSA rise. [PSMA PET](" + PET + ") is used in selected settings, not after every injection."),

  h2("Why Is Testosterone Tested During ADT?"),
  p("If prostate cancer appears to be progressing, doctors may measure testosterone to determine whether the cancer is truly progressing despite adequate androgen suppression. Castration-resistant prostate cancer is defined by progression despite castrate-level testosterone. The EAU currently uses a testosterone threshold of **below 50 ng/dL (1.7 nmol/L)** in this context."),
  p("A rising PSA may indicate that the cancer is becoming less responsive to the current hormonal treatment. PSA should be interpreted together with testosterone, imaging, symptoms, PSA trend, previous treatments and the location and extent of disease. A single PSA result should not automatically trigger a change in treatment."),

  h2("What Is Castration-Resistant Prostate Cancer?"),
  p("**CRPC** develops when prostate cancer progresses despite testosterone being reduced to castrate levels. The cancer may produce or use small amounts of androgen more efficiently, increase androgen receptor activity, change androgen receptor signalling or use alternative growth pathways. This is why additional treatments may be needed even though testosterone remains very low."),
  html(crpcTable),
  p("The transition is not determined by PSA alone. Doctors use testosterone, PSA kinetics, imaging and the overall clinical picture."),

  h2("What Is ADT Plus ARPI Treatment?"),
  p("Modern systemic therapy increasingly uses **ADT plus an androgen receptor pathway inhibitor** (abiraterone, enzalutamide, apalutamide or darolutamide). For metastatic hormone-sensitive disease, current EAU guidance recommends combination treatment for fit patients rather than relying on ADT alone when there is no contraindication."),

  h2("Can ADT Be Combined With Chemotherapy?"),
  p("Yes. Some patients with metastatic hormone-sensitive prostate cancer may receive **ADT + ARPI + docetaxel**, often called **triplet therapy**. Chemotherapy is not appropriate for every patient. Doctors consider age, fitness, organ function, disease burden, symptoms, metastatic pattern, previous treatment and potential toxicity. The 2026 FDA review of the treatment landscape identifies ADT plus an ARPI as a standard combination approach for metastatic hormone-sensitive disease, with triplet therapy appropriate for selected patients."),

  h2("Hormone Therapy and Radiation Therapy"),
  p("ADT can be particularly important when radiation is being used for higher-risk prostate cancer: unfavorable intermediate-risk, high-risk, locally advanced and selected recurrent disease. For high-risk disease, long-term ADT may be combined with external-beam radiation, and selected treatment plans may also incorporate a [brachytherapy](" + BRACHY_BLOG + ") boost."),
  p("ADT may be started before radiation (**neoadjuvant ADT**). This can lower testosterone, reduce cancer activity, sometimes reduce prostate volume and begin systemic treatment before radiation. ADT can also continue after radiation. The systemic component may help control microscopic disease that cannot be seen on imaging. See [Radiation Therapy for Prostate Cancer](" + RAD + ")."),

  h2("Is Hormone Therapy Used Before Surgery?"),
  p("ADT is not routinely required for every man undergoing [radical prostatectomy](" + RARP + "). In selected high-risk situations, systemic therapy may be incorporated into a broader multimodal treatment strategy, but the decision depends heavily on pathology, imaging and risk characteristics. Hormone therapy should therefore not be considered a standard “pre-surgery medicine” for every prostate cancer patient. [Radical prostatectomy](" + RP + ") planning ranges are **$7,000–$18,000**."),

  h2("Is Hormone Therapy a Permanent Treatment?"),
  p("It can be, but not always. For a patient receiving ADT with radiation for localized high-risk disease, there may be a planned treatment duration. For metastatic disease, ADT is often continued long-term. For intermittent ADT, treatment is intentionally paused and restarted according to a predefined strategy. “How long will I need hormone therapy?” cannot be answered accurately without knowing the disease stage and treatment objective."),

  h2("Can Hormone Therapy Shrink the Prostate?"),
  p("Yes. Lowering androgen activity can reduce prostate volume in some men. This can sometimes be useful when the prostate is large before radiation. Prostate shrinkage is not the primary objective of ADT in most prostate cancer treatment plans."),

  h2("Hormone Therapy for Enlarged Prostate vs Prostate Cancer"),
  p("This distinction is important. Medicines used for benign prostate enlargement, such as **finasteride or dutasteride**, are not the same as ADT. They affect the conversion of testosterone to DHT and are commonly used for benign prostatic hyperplasia. They should not be confused with cancer-directed androgen deprivation therapy. Urinary [symptoms](" + SX + ") from BPH are also not the same as an ADT indication."),

  h2("Is Hormone Therapy the Same as Chemotherapy or Immunotherapy?"),
  p("**No.** Hormone therapy changes the hormonal environment that prostate cancer depends on. Chemotherapy uses cytotoxic medicines designed to kill or damage rapidly dividing cancer cells. Some patients receive both. Immunotherapy works by modifying immune-system activity against cancer and has a more limited and highly selected role in prostate cancer compared with ADT."),

  h2("What Tests Are Usually Done Before Starting Long-Term ADT?"),
  p("Cancer-related information may include PSA, Gleason score, Grade Group, biopsy findings, MRI, [PSMA PET/CT](" + PET + ") or other staging imaging, CT and bone imaging. General health may include blood pressure, blood glucose, HbA1c, lipid profile, kidney and liver function and blood count. Long-term ADT assessment may include bone mineral density, fracture risk, cardiovascular history, existing diabetes, weight and current medications."),

  h2("How Can ADT Side Effects Be Reduced?"),
  ul([
    "**Exercise** — resistance training, walking, aerobic exercise and mobility work to maintain muscle, physical function and metabolic health.",
    "**Nutrition** — adequate protein, vegetables, whole grains and appropriate calorie intake. See [diet](" + DIET + ").",
    "**Bone health** — calcium, vitamin D, exercise, DEXA scanning, fracture risk and bone-protective medication when indicated.",
    "**Cardiovascular health** — blood pressure, diabetes, cholesterol, weight and smoking.",
  ]),
  p("The EAU recommends healthy weight and diet, smoking cessation, appropriate calcium and vitamin D intake, and monitoring for metabolic complications during ADT."),
  p("Depending on fracture risk, doctors may prescribe denosumab, zoledronic acid or other bisphosphonates. These medicines are not automatically required for every patient. Some have uncommon but important complications, including osteonecrosis of the jaw. Dental assessment may therefore be appropriate before certain long-term treatments."),

  h2("What Should Men Know About Heart Health Before ADT?"),
  p("A history of heart attack, stroke, heart failure, arrhythmia, high blood pressure, diabetes or high cholesterol should be discussed with the oncology team. The choice of ADT and additional ARPI therapy may take cardiovascular risk into consideration. The EAU notes differences in cardiovascular adverse-effect profiles among ARPIs and emphasizes consideration of comorbidities when selecting treatment."),

  h2("How Much Does Hormone Therapy for Prostate Cancer Cost in India?"),
  p("There is **no single fixed cost**. The total expense depends on the medicine used, brand or formulation, injection frequency, oral versus injectable treatment, duration, whether an ARPI is added, whether prednisone is required with abiraterone, monitoring and laboratory tests, hospital, and whether treatment is part of a larger plan."),
  p("GAF Healthcare’s published planning range for [hormone therapy](" + HT + ") is **$1,000–$4,500**. Traditional ADT injections can have a very different cost from newer oral androgen receptor pathway inhibitors. For international patients, the quotation should be based on the **specific drug, dose, frequency and planned duration**, rather than a generic “hormone therapy cost.” City pages such as [Delhi NCR hormone therapy](/costs/India/Delhi-NCR/Medical-Oncology/Hormone-Therapy) use the same national range unless a hospital issues a verified quotation."),
  btn("Ask for an itemised ADT quotation", consult("Hormone Therapy Cost in India")),
  p("[WhatsApp +91 90443 46292 for drug, dose and duration pricing](" + wa("Please send an itemised hormone therapy quotation in India covering the ADT drug, any ARPI, labs and planned duration.") + ")"),

  h2("Hormone Therapy in India: What International Patients Should Prepare"),
  ul([
    "Histopathology report, biopsy slides or blocks, Gleason score and Grade Group",
    "PSA history",
    "MRI, [PSMA PET/CT](" + PET + "), CT or bone-scan reports and images",
    "Previous treatment records, radiation records if applicable, current medication list, blood-test reports and discharge summaries",
  ]),
  p("Digital copies are useful, but original pathology material can be particularly valuable when a second pathology review is requested."),

  h2("How Doctors Decide Which Hormone Therapy to Use"),
  p("There is no single “best hormone medicine.” Doctors usually consider stage, hormone sensitivity, cardiovascular health, bone health, kidney and liver function, other medicines, disease burden, previous treatment and genomic findings. The 2026 EAU guidelines specifically recommend considering performance status, symptoms, comorbidities, disease extent, genomic profile, patient preferences and previous treatment when selecting systemic therapy for advanced disease. See [treatment options](" + OPTIONS + ")."),

  h2("Important Questions to Ask Your Prostate Cancer Specialist"),
  ol([
    "Why do I need hormone therapy, and is my cancer hormone-sensitive or castration-resistant?",
    "Is ADT being used with radiation, and how long will I need it?",
    "Will treatment be continuous or intermittent, injection or oral?",
    "Do I need an ARPI (abiraterone, enzalutamide, apalutamide or darolutamide) or chemotherapy as well?",
    "What are my cardiovascular and bone-health risks, and should I have a DEXA scan?",
    "How often will PSA, testosterone and other blood tests be checked?",
    "What symptoms should I report immediately, and what is the plan if PSA rises or the cancer becomes castration-resistant?",
  ]),

  h2("When Should a Patient Contact the Doctor Urgently?"),
  p("Patients receiving treatment for advanced prostate cancer should seek urgent medical attention for new severe back pain, new weakness or numbness in the legs, difficulty walking, loss of bladder or bowel control, sudden inability to pass urine, severe bone pain, chest pain or severe shortness of breath."),
  p("**New neurological symptoms in a patient with prostate cancer that has spread to the bones can indicate possible spinal cord compression and require urgent assessment in a local emergency department — not a delayed WhatsApp message.**"),

  h2("Common Myths About Hormone Therapy"),
  ul([
    "**Myth: hormone therapy is only for terminal prostate cancer.** Fact: ADT is used in selected localized high-risk cancers receiving radiation, recurrent disease and metastatic disease.",
    "**Myth: ADT always cures prostate cancer.** Fact: ADT can control prostate cancer but does not usually cure metastatic disease by itself.",
    "**Myth: if PSA falls, the cancer is gone.** Fact: PSA response is encouraging but does not by itself prove that all cancer cells have disappeared.",
    "**Myth: hormone therapy is the same as chemotherapy.** Fact: they work through completely different mechanisms.",
    "**Myth: side effects cannot be managed.** Fact: many ADT-related complications can be monitored, prevented or treated.",
    "**Myth: ADT should always be continued forever.** Fact: duration depends on the treatment setting.",
    "**Myth: the newest hormone medicine is automatically the right medicine.** Fact: drug selection depends on disease characteristics, previous treatment, health conditions and treatment goals.",
  ]),

  h2("The Bottom Line"),
  p("Hormone therapy has changed substantially over the last several years. Traditional ADT remains an important part of prostate cancer treatment, but modern management increasingly combines testosterone suppression with medicines that target the androgen receptor pathway."),
  p("The right approach depends on whether the cancer is localized, high-risk, locally advanced, recurrent, metastatic hormone-sensitive or castration-resistant. The **duration of ADT is equally individualized**. A patient receiving radiation for high-risk localized disease may have a planned course lasting years, while a patient with metastatic disease may remain on ADT long-term."),
  p("Side-effect management should be considered part of treatment rather than an afterthought. Bone health, cardiovascular risk, metabolic health, sexual function, physical activity and emotional wellbeing all deserve attention during long-term therapy."),
  p("For patients considering treatment in India, the most useful starting point is a review of the complete cancer record—including pathology, PSA history and staging scans—followed by a consultation with a qualified urologic oncologist or medical/radiation oncologist. The treatment plan should be based on the disease characteristics rather than on a particular drug alone."),

  h2("Frequently Asked Questions"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Related Prostate Cancer Resources"),
  p("This article is the ADT hub. Other cluster pages keep their own search intent:"),
  ul([
    "[Prostate Cancer Treatment Without Surgery](" + NONSURG + ") — where ADT sits among non-surgical options.",
    "[Radiation Therapy for Prostate Cancer](" + RAD + ") — ADT combined with radiation for higher-risk disease.",
    "[Brachytherapy for Prostate Cancer](" + BRACHY_BLOG + ") — boosts that may sit beside long-term ADT.",
    "[Lutetium-177 PSMA Therapy in India](" + LU + ") — radioligand treatment after or with ongoing ADT in selected CRPC.",
    "[PSMA PET Scan for Prostate Cancer](" + PET + ") — imaging that can change systemic plans.",
    "[Prostate Cancer Stages 1 to 4](" + STAGES + ") — why metastatic disease is not one duration of ADT.",
    "[Prostate Cancer Recurrence After Surgery](" + RECUR + ") — rising PSA after prostatectomy.",
    "[Robotic Prostatectomy in India](" + RARP + ") — surgery is not the same as medical castration.",
    "[Prostate Cancer Treatment Options](" + OPTIONS + ") — how teams choose first treatment.",
    "[Prostate Cancer Diet](" + DIET + ") — eating during metabolic change on ADT.",
    "[Hormone therapy cost in India](" + HT + ") — GAF planning range $1,000–$4,500.",
    "[Prostate Cancer Treatment in India](" + PILLAR + ") — coordinated staging and systemic treatment.",
  ]),

  h2("How GAF Healthcare Can Help"),
  p("GAF Healthcare coordinates international patients who need an ADT or ARPI plan in India — with radiation, after a rising PSA, or for metastatic disease. Share the PSA timeline, the full biopsy PDF, [Grade Group](" + GG + "), staging scans including [PSMA PET](" + PET + ") if performed, cardiovascular and bone-health history, and the current medicine list. A coordinator can introduce a [medical oncologist](" + MED_DOCS + ") and, when radiation is part of the plan, a [radiation oncologist](" + RAD_DOCS + "), then help collect an itemised quotation covering the drug, dose, frequency, labs and planned duration."),
  btn("Share records for an ADT review", consult("Hormone Therapy ADT")),
  p("[WhatsApp +91 90443 46292 with your PSA, stage and medicine list](" + wa("I would like to share my PSA, stage, Grade Group and current medicines for a hormone therapy second opinion in India.") + ")"),

  h2("Medical Disclaimer"),
  p("This article is intended for general educational purposes and should not replace consultation with a qualified medical professional. Prostate cancer treatment is highly individualized. The choice of hormone therapy, medicine, combination treatment and duration depends on the cancer stage, pathology, imaging, previous treatment, overall health and other clinical factors."),
  p("Drug availability and regulatory approvals can also vary by country. Patients should not start, stop or change cancer treatment without discussing it with their treating doctor."),

  h2("Top 5 Sources"),
  p("1. [NCI — Hormone Therapy for Prostate Cancer](https://www.cancer.gov/types/prostate/prostate-hormone-therapy-fact-sheet) — how ADT works, medicines and common side effects."),
  p("2. [EAU Guidelines — Prostate Cancer Treatment](https://uroweb.org/guidelines/prostate-cancer/chapter/treatment) — combination ADT plus ARPI, duration and follow-up."),
  p("3. [American Cancer Society — Hormone Therapy for Prostate Cancer](https://www.cancer.org/cancer/types/prostate-cancer/treating/hormone-therapy.html) — types of hormone therapy and what to expect."),
  p("4. [FDA — Prostate Cancer: Symptoms, Tests and Treatments](https://www.fda.gov/consumers/consumer-updates/prostate-cancer-symptoms-tests-and-treatments) — consumer-facing treatment landscape including hormonal medicines."),
  p("5. [NCI — Prostate Cancer Treatment (PDQ)](https://www.cancer.gov/types/prostate/patient/prostate-treatment-pdq) — stage-specific use of hormone therapy."),
  p("**Last reviewed against the cited sources: September 2026.**"),
];

const now = "2026-09-28T10:30:00.000Z";
const SLUG = "hormone-therapy-for-prostate-cancer";

const article = {
  id: "art_hormone_therapy_for_prostate_cancer",
  slug: SLUG,
  title: "Hormone Therapy for Prostate Cancer: ADT, Medicines, Side Effects and Duration",
  excerpt:
    "ADT lowers testosterone; ARPIs block the receptor. How long treatment lasts, what side effects to plan for, and why duration depends on stage rather than one drug name.",
  date: "28 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Medical Oncology",
  tags: ["prostate cancer", "ADT", "hormone therapy", "abiraterone", "enzalutamide", "India"],
  image: "/uploads/articles/pca-ht-anatomy.webp",
  imageAlt:
    "Transparent male body with teal adrenal glands, teal bladder, gold prostate and modest gold testicular overlay used to explain androgen deprivation",
  status: "published",
  featured: true,
  seoTitle: "Hormone Therapy for Prostate Cancer: ADT, Medicines, Side Effects",
  seoDescription:
    "ADT, GnRH agonists and antagonists, ARPIs and abiraterone: duration from months to years, bone and heart monitoring, and why hormone therapy is not chemotherapy.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/pca-ht-anatomy.webp",
  allowIndex: true,
  keywords: [
    "hormone therapy for prostate cancer",
    "ADT prostate cancer",
    "androgen deprivation therapy",
    "leuprolide prostate cancer",
    "abiraterone",
    "enzalutamide",
    "apalutamide",
    "darolutamide",
    "ADT side effects",
    "how long is hormone therapy",
    "castration-resistant prostate cancer",
  ],
  relatedLinks: [
    { label: "Hormone therapy cost in India", href: HT },
    { label: "Radiation Therapy for Prostate Cancer", href: RAD },
    { label: "Lutetium-177 PSMA therapy in India", href: LU },
    { label: "Prostate cancer stages 1 to 4", href: STAGES },
    { label: "Prostate Cancer Treatment in India", href: PILLAR },
  ],
  blocks,
};

if (!store.categories.includes("Medical Oncology")) store.categories.push("Medical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["pca-ht-anatomy.webp", article.imageAlt],
  [
    "pca-ht-clinic.webp",
    "Male patient in clinic with a gold prostate and testicular overlay while a clinician explains androgen deprivation therapy",
  ],
  [
    "pca-ht-bones.webp",
    "Transparent male skeleton with a teal prostate in the pelvis used to explain bone health during long-term ADT",
  ],
  [
    "pca-ht-heart.webp",
    "Male patient in clinic with a teal heart overlay and gold prostate while a clinician discusses cardiovascular monitoring on ADT",
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

const htLink = { label: "Hormone therapy for prostate cancer", href: HT_BLOG };
for (const siblingId of [
  "art_psma_pet_scan_for_prostate_cancer",
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
  if (!sibling.relatedLinks.some((row) => row.href === HT_BLOG)) {
    sibling.relatedLinks.unshift(htLink);
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
if (treatment?.translations?.en?.editorialBody && !treatment.translations.en.editorialBody.includes(HT_BLOG)) {
  treatment.translations.en.editorialBody = treatment.translations.en.editorialBody.replace(
    "How PSMA PET is booked, prepared and priced in India is covered in [PSMA PET Scan for Prostate Cancer](/blogs/psma-pet-scan-for-prostate-cancer).",
    "How PSMA PET is booked, prepared and priced in India is covered in [PSMA PET Scan for Prostate Cancer](/blogs/psma-pet-scan-for-prostate-cancer). How ADT, ARPIs, duration and side effects are planned is covered in [Hormone Therapy for Prostate Cancer](/blogs/hormone-therapy-for-prostate-cancer).",
  );
  writeFileSync(treatmentsPath, `${JSON.stringify(treatments, null, 2)}\n`);
  console.log("linked hormone therapy blog from treatment editorial");
}

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes("hormone-therapy-for-prostate-cancer")) {
  llms = llms.replace(
    "and [PSMA PET scan for prostate cancer](https://gaf.healthcare/blogs/psma-pet-scan-for-prostate-cancer).",
    ", [PSMA PET scan for prostate cancer](https://gaf.healthcare/blogs/psma-pet-scan-for-prostate-cancer) and [hormone therapy for prostate cancer](https://gaf.healthcare/blogs/hormone-therapy-for-prostate-cancer).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}
