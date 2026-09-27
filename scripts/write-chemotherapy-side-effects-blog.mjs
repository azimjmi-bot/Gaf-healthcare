import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const PILLAR = "/treatments/breast-cancer-treatment-in-india";
const CHEMO = "/blogs/chemotherapy-for-breast-cancer-in-india";
const TARGETED_SE = "/blogs/breast-cancer-targeted-therapy-side-effects";
const HT_SE = "/blogs/breast-cancer-hormone-therapy-side-effects";
const HER2 = "/blogs/her2-positive-breast-cancer-treatment-india";
const BIOMARKERS = "/blogs/er-pr-her2-breast-cancer-treatment-india";
const DIAGNOSIS = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const COST = "/blogs/breast-cancer-treatment-cost-in-india";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const BY_STAGE = "/blogs/breast-cancer-treatment-by-stage";
const CHEMO_DOCTORS = "/doctors/India/Medical-Oncology/Chemotherapy";
const CHEMO_COST = "/costs/India/Medical-Oncology/Chemotherapy";
const TARGETED_DOCTORS = "/doctors/India/Medical-Oncology/Targeted-Therapy";
const IMMUNO_DOCTORS = "/doctors/India/Medical-Oncology/Immunotherapy";
const HORMONE_DOCTORS = "/doctors/India/Medical-Oncology/Hormone-Therapy";
const BCS_DOCTORS = "/doctors/India/Surgical-Oncology/Breast-Conserving-Surgery";
const MAST_DOCTORS = "/doctors/India/Surgical-Oncology/Mastectomy";
const RECON_DOCTORS = "/doctors/India/Surgical-Oncology/Breast-Reconstruction";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;

const blocks = [
  {
    id: id("html"),
    type: "html",
    html: `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body"><strong>What are the most common chemotherapy side effects in breast cancer?</strong> Common side effects include fatigue, hair loss, nausea, vomiting, mouth sores, appetite changes, diarrhea or constipation, low blood counts and increased infection risk. Not everyone experiences all of them.</p><p class="article-quick-answer__body"><strong>Does breast cancer chemotherapy always cause hair loss?</strong> No. Hair loss depends on the chemotherapy drugs and doses used. Some regimens cause substantial hair loss, while others may cause less.</p><p class="article-quick-answer__body"><strong>Does chemotherapy always cause nausea?</strong> No. Modern anti-nausea medicines can prevent or reduce nausea for many patients, and the likelihood of nausea varies between chemotherapy regimens.</p><p class="article-quick-answer__body"><strong>Why does chemotherapy cause fatigue?</strong> Fatigue can result from the treatment itself and from problems such as anemia, reduced blood counts, poor sleep, reduced nutrition or the overall physical and emotional demands of cancer treatment.</p><p class="article-quick-answer__body"><strong>Can chemotherapy cause low white blood cells?</strong> Yes. Chemotherapy can temporarily reduce blood-forming cells in the bone marrow, which can lower white blood-cell counts and increase infection risk.</p><p class="article-quick-answer__body"><strong>Can breast cancer chemotherapy cause nerve damage?</strong> Some chemotherapy drugs, particularly taxanes and certain platinum drugs, can cause peripheral neuropathy, resulting in numbness, tingling, burning or weakness in the hands and feet.</p><p class="article-quick-answer__body"><strong>Can chemotherapy affect fertility?</strong> Yes. Some chemotherapy can affect ovarian function and fertility. If having children in the future matters to you, discuss fertility preservation before treatment begins whenever possible.</p><p class="article-quick-answer__body"><strong>Can chemotherapy cause early menopause?</strong> It can. Menstrual periods may become irregular or stop temporarily or permanently, depending on factors such as age and the chemotherapy regimen.</p><p class="article-quick-answer__body"><strong>How long does chemotherapy for breast cancer usually last?</strong> Adjuvant or neoadjuvant chemotherapy is often given over about 3–6 months, but the actual duration depends on the regimen and individual treatment plan.</p><p class="article-quick-answer__body"><strong>Do chemotherapy side effects disappear after treatment?</strong> Many short-term side effects improve after treatment ends, but some can take longer to recover from. A few, such as certain types of nerve damage or heart effects, can persist or appear later.</p><p class="article-quick-answer__body"><strong>Can chemotherapy be given in India?</strong> Yes. Chemotherapy for breast cancer is routinely administered in Indian cancer centers, usually through an oncology day-care or infusion facility, depending on the treatment regimen.</p></aside>`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Chemotherapy is still an important part of breast cancer treatment for many patients, but not everyone with breast cancer needs it. When it is recommended, one of the first questions is not about the medicine itself. It is about what life will feel like during treatment. This guide supports the [Breast Cancer Treatment in India](${PILLAR}) pathway and the [chemotherapy explainer](${CHEMO}).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask GAF about your chemotherapy regimen",
    href: consult("Chemotherapy"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 with your pathology](${wa("Please review my breast cancer records and advise on chemotherapy side effects and recovery in India.")})`,
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/chemo-side-effects-infusion-visual.webp",
    alt: "Breast cancer chemotherapy side effects including hair loss nausea fatigue neuropathy and recovery",
    caption: "Knowing what to expect can make chemotherapy less frightening and help you recognise when a symptom needs medical attention.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Chemotherapy for Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Chemotherapy uses medicines that kill cancer cells or stop them from dividing. Unlike surgery or radiation, chemotherapy is a systemic treatment. The medicines travel through the bloodstream and can reach cancer cells throughout the body. This is useful because breast cancer cells can sometimes exist outside the original tumour even when they cannot be seen on scans. Chemotherapy also affects some healthy cells that divide quickly. That is the main reason side effects occur.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Chemotherapy Doctors in India](${CHEMO_DOCTORS})\n- [Chemotherapy Cost in India](${CHEMO_COST})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does Everyone With Breast Cancer Need Chemotherapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `No. Some early-stage breast cancers have a sufficiently low expected benefit from chemotherapy that it may not be recommended. Doctors consider [stage](${BY_STAGE}), tumour size, grade, lymph-node involvement, [ER, PR and HER2](${BIOMARKERS}), subtype, age, overall health and genomic tests such as Oncotype DX and MammaPrint when appropriate. Oncology teams in [Delhi NCR](/doctors/India/Delhi-NCR), [Mumbai](/doctors/India/Mumbai), [Bengaluru](/doctors/India/Bengaluru), [Chennai](/doctors/India/Chennai) and [Hyderabad](/doctors/India/Hyderabad) can confirm whether chemotherapy is needed.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "When Is Chemotherapy Used?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Before surgery (neoadjuvant chemotherapy) it can shrink the tumour and may make [breast-conserving surgery](${SURGERY}) possible in selected patients. After surgery (adjuvant chemotherapy) the aim is to destroy remaining cancer cells and reduce recurrence risk. For metastatic breast cancer, the strategy depends on subtype, previous treatments and how the disease responds.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Does Chemotherapy Cause Side Effects?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Chemotherapy targets cells that divide quickly. Cancer cells often divide rapidly, but some healthy cells do too — including cells in hair follicles, bone marrow, mouth, digestive tract and reproductive organs. Side effects are not a measure of whether chemotherapy is working. A person can have significant side effects without getting more benefit from treatment. Another person can have very few side effects and still respond well.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "1. Hair Loss",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/chemo-side-effects-fatigue-visual.webp",
    alt: "Fatigue and hair-care support during breast cancer chemotherapy",
    caption: "Hair loss depends on the drugs and doses. In most patients, hair begins to grow back after chemotherapy finishes.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some regimens cause substantial hair loss; others cause much less. Hair loss can affect scalp hair, eyebrows, eyelashes and body hair. It usually does not begin immediately after the first infusion. For regimens that cause significant hair loss, it often becomes noticeable during the early part of treatment. Some people cut their hair short before treatment; others prefer to wait. There is no medically correct choice.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "In most patients, hair begins to grow back after chemotherapy finishes. The new hair can sometimes look different at first — curly, thicker or thinner, a different texture or a slightly different colour. This temporary change is sometimes called \"chemo curls.\" Some centres offer scalp cooling. It does not work equally well for every regimen. Ask whether it is available and appropriate for your treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "2. Nausea and Vomiting",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Chemotherapy does not automatically mean that you will spend treatment days vomiting. Modern oncology uses anti-nausea medicines before and after chemotherapy. The risk depends on the particular regimen. Some patients have little nausea; others may experience nausea for several days. Eat smaller meals, drink fluids regularly, avoid strong food smells and take prescribed anti-nausea medicine on schedule. If vomiting continues, contact your cancer team. Dehydration can become a serious problem.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "3. Fatigue",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Fatigue is one of the most common chemotherapy side effects. It is not always the same as ordinary tiredness. It can be related to chemotherapy, anemia, low blood counts, poor sleep, reduced food intake, pain, emotional stress, infection or other medications. For many patients, gentle physical activity such as walking can be useful. The goal is not to push through severe exhaustion.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "4. Low White Blood Cells, Infection, Anemia and Platelets",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/chemo-side-effects-blood-visual.webp",
    alt: "Blood-count monitoring during breast cancer chemotherapy",
    caption: "Chemotherapy can temporarily suppress bone-marrow activity. A fever during treatment can be an emergency.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Chemotherapy can temporarily suppress bone-marrow activity and lower white blood cells, including neutrophils. Neutropenia can increase infection risk and may influence whether the next cycle can proceed. A fever during chemotherapy can be an emergency. Do not simply take a fever-reducing medicine and wait if your oncology team has instructed you to seek urgent assessment.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Chemotherapy can also reduce red blood-cell production (anemia) and platelet counts. Anemia may cause fatigue, weakness, shortness of breath during activity or dizziness. Low platelets may increase bruising, bleeding, nosebleeds or gum bleeding. Inform your oncology team about unexplained bleeding or extensive bruising.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "5. Mouth Sores, Taste, Appetite and Bowel Changes",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some medicines can cause mouth ulcers, soreness, difficulty eating or swallowing, and taste changes. Food can taste metallic, bitter or reduced. Smaller meals throughout the day can sometimes be easier. Chemotherapy and supportive medicines can also cause diarrhea or constipation. Tell your treatment team if bowel changes are persistent or severe.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "6. Peripheral Neuropathy",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/chemo-side-effects-neuropathy-visual.webp",
    alt: "Hand and fingertip assessment for chemotherapy neuropathy",
    caption: "Taxanes such as paclitaxel and docetaxel can cause numbness, tingling or burning in the hands and feet.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Certain chemotherapy medicines, particularly taxanes, can affect peripheral nerves. You may notice tingling, numbness, burning, pins-and-needles sensations, increased sensitivity, pain or weakness, often beginning in the fingers or toes. Symptoms often improve after treatment ends, but recovery can take time. In certain cases, nerve damage can be permanent. Tell your oncologist early — the dose or schedule may need to change.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "7. Nail, Skin and Hand-Foot Changes",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Chemotherapy can cause brittle nails, discoloration, ridges, dry skin, pigmentation changes or rash. Some medicines can cause hand-foot syndrome: tingling, redness, burning or sensitivity that can progress to painful swelling, blistering or peeling. Tell your oncology team as soon as these symptoms begin.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "8. Fertility, Menopause and Sexual Health",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Chemotherapy can affect ovarian function. Periods may become irregular, less frequent, temporarily absent or permanently absent. Some chemotherapy can damage fertility. Age and the regimen both matter. If you may want children, talk to your oncology team before chemotherapy begins. Options may include egg freezing, embryo freezing or a fertility consultation. Do not wait until chemotherapy has already started.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Many women can become pregnant after treatment, but timing depends on cancer type and whether [hormone therapy](${HT_SE}) will continue. Sexual-health changes — vaginal dryness, reduced desire, menopausal symptoms, fatigue or body-image concerns — are legitimate medical issues.`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask about fertility timing before chemotherapy",
    href: consult("Chemotherapy"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 about fertility and recovery](${wa("Please advise on fertility preservation and chemotherapy side-effect management for breast cancer in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "9. Concentration and Heart-Related Effects",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some patients describe problems with concentration, memory, finding words, multitasking or mental clarity — commonly called \"chemo brain.\" Sleep problems, stress, fatigue and menopause can also affect concentration. Certain medicines, including anthracyclines such as doxorubicin, can affect the heart. Risk depends on cumulative dose, other heart-affecting treatments and existing cardiovascular disease. Doctors may perform an echocardiogram before and sometimes during treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Long Does Recovery Take?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is no single recovery timeline. Hair generally begins growing back after treatment. Blood counts often recover between cycles or after treatment finishes. Fatigue may improve over weeks or longer. Nerve symptoms can take considerably longer and may persist. Ovarian function may recover in some women but not in others. Possible long-term effects include neuropathy, fertility problems, heart problems, persistent fatigue, cognitive difficulties and, rarely, certain second cancers.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Cycles, Dose Changes and When to Call",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Chemotherapy is usually given in cycles: a treatment period followed by a rest period. A regimen might be given every two or three weeks. Before each cycle, doctors may check blood counts, kidney and liver function, symptoms and side effects. If toxicity is severe, they may give supportive medicines, change the dose, delay a cycle, substitute another medicine or stop a particular drug.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Contact your cancer team for fever, severe chills, difficulty breathing, uncontrolled vomiting, severe or persistent diarrhea, significant bleeding, unexplained bruising, severe weakness, confusion, severe allergic symptoms, or pain or redness around an infusion or catheter site. If you have severe breathing difficulty or another medical emergency, seek emergency care immediately.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Work, Exercise and Eating During Chemotherapy",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some people continue working; others need reduced hours. It depends on the regimen, side effects and type of work. For many patients, walking, stretching and appropriately supervised exercise can help, but rest may be more appropriate when blood counts are low. There is no single chemotherapy diet. The usual goal is adequate nutrition, hydration and body weight. If you are losing significant weight, ask for a cancer dietitian.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Should International Patients Know?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Chemotherapy is usually not a single hospital visit. Before travelling, consider how many cycles are planned, how long you will need to remain in India, whether some cycles can be given at home, who will manage complications, and how emergency care will be arranged. See the [international-patient guide](${INTL}) and the [cost guide](${COST}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Bring pathology, biopsy and surgical reports, ER, PR, HER2, Ki-67, genomic tests if performed, mammogram, ultrasound, MRI, CT or PET-CT files, previous surgery, chemotherapy, radiation and targeted-therapy records, and the current medication list. If you have already started chemotherapy, bring exact drug names, doses, dates, number of cycles, side effects and blood-test results.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Day-care units in [Delhi NCR](/hospitals/India/Delhi-NCR), [Mumbai](/hospitals/India/Mumbai), [Bengaluru](/hospitals/India/Bengaluru), [Chennai](/hospitals/India/Chennai) and [Hyderabad](/hospitals/India/Hyderabad) can confirm cycle timing.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 your records before travel](${wa("I would like to send my pathology and current chemotherapy records for review before travelling to India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Much Does Breast Cancer Chemotherapy Cost in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `There is no single chemotherapy price. Cost depends on the medicines, number of cycles and whether [targeted therapy](${TARGETED_SE}) or immunotherapy is combined. Other costs may include consultation, blood tests, imaging, day-care charges, supportive medicines, port placement and hospitalization if complications occur. See [Chemotherapy Cost in India](${CHEMO_COST}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Chemotherapy vs Targeted Therapy and Immunotherapy",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Chemotherapy generally affects rapidly dividing cells. [Targeted therapy](${TARGETED_SE}) acts on particular molecules or pathways. Some patients receive both — for example, [HER2-positive breast cancer](${HER2}) may be treated with chemotherapy plus HER2-targeted therapy. Immunotherapy helps the immune system recognise or attack cancer and is used in selected breast cancers, including certain triple-negative cases.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Frequently Asked Questions",
  },
  ...[
    ["Does chemotherapy always cause hair loss?", "No. Hair loss depends on the drugs and doses used. Some breast cancer chemotherapy regimens cause substantial hair loss, while others have less effect on hair."],
    ["Will I vomit after chemotherapy?", "Not necessarily. Anti-nausea medicines are routinely used, and the likelihood of nausea depends on the specific regimen."],
    ["Can chemotherapy cause infertility?", "Yes. Some chemotherapy can affect ovarian function and fertility. If future pregnancy is important, discuss fertility preservation before treatment."],
    ["Can chemotherapy cause early menopause?", "Yes. Periods may become irregular or stop temporarily or permanently depending on age and treatment."],
    ["Can chemotherapy damage nerves?", "Yes. Certain medicines, particularly taxanes and some platinum drugs, can cause peripheral neuropathy."],
    ["Does chemotherapy weaken the immune system?", "Chemotherapy can lower white blood-cell counts, including neutrophils, which can increase infection risk."],
    ["Can I exercise during chemotherapy?", "Many patients can remain physically active at an appropriate level, but intensity should reflect your blood counts, symptoms and overall health."],
    ["Can I work during chemotherapy?", "Some patients continue working, while others need reduced hours or time away. The answer depends on the treatment and how you respond."],
    ["How long do breast cancer chemotherapy side effects last?", "Many short-term side effects improve after treatment ends, but some — particularly neuropathy, fertility effects or certain organ-related effects — can last longer."],
    ["Can chemotherapy cause heart problems?", "Certain chemotherapy medicines can affect the heart. Patients receiving these drugs may have heart function assessed before and sometimes during treatment."],
    ["How many chemotherapy cycles will I need?", "There is no universal number. The regimen, cancer subtype, stage and treatment response determine the schedule."],
    ["Can breast cancer chemotherapy be given in India?", "Yes. Chemotherapy is widely provided at cancer centres in India through oncology day-care and infusion facilities."],
  ].flatMap(([q, a]) => [
    { id: id("h"), type: "heading", level: 3, text: q },
    { id: id("p"), type: "paragraph", text: a },
  ]),
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Chemotherapy Side Effects: Key Takeaways",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Chemotherapy can be an important part of breast cancer treatment, but it is not required for everyone. When it is recommended, the plan is selected according to stage, biology, lymph-node status, biomarkers and other individual factors. You may not experience every listed side effect.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Ask your oncologist which drugs you will receive, how many cycles are planned, which side effects are most likely, which symptoms require an urgent call, whether treatment could affect fertility, whether you need heart monitoring, and how long you should expect to stay in India if you are travelling. Supportive medicines and careful monitoring can make many side effects manageable. If something does not feel right, tell your cancer team early.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Start the Breast Cancer Treatment in India pathway",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 to plan the next step](${wa("Please help me plan chemotherapy, side-effect support and recovery for breast cancer in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "GAF Healthcare Resources",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Breast Cancer Treatment in India](${PILLAR})\n- [Chemotherapy for Breast Cancer](${CHEMO})\n- [Targeted therapy side effects](${TARGETED_SE})\n- [Hormone therapy side effects](${HT_SE})\n- [HER2-positive treatment](${HER2})\n- [Diagnosis](${DIAGNOSIS})\n- [Chemotherapy doctors](${CHEMO_DOCTORS}) · [cost](${CHEMO_COST})\n- [Targeted therapy doctors](${TARGETED_DOCTORS})\n- [Immunotherapy doctors](${IMMUNO_DOCTORS})\n- [Hormone therapy doctors](${HORMONE_DOCTORS})\n- [Breast-conserving surgery doctors](${BCS_DOCTORS})\n- [Mastectomy doctors](${MAST_DOCTORS})\n- [Reconstruction doctors](${RECON_DOCTORS})\n- [International patients](${INTL})`,
  },
];

const now = "2026-09-27T22:00:00.000Z";
const SLUG = "breast-cancer-chemotherapy-side-effects";
const HREF = `/blogs/${SLUG}`;

const article = {
  id: "art_breast_cancer_chemotherapy_side_effects",
  slug: SLUG,
  title: "Breast Cancer Chemotherapy Side Effects: Hair Loss, Nausea, Neuropathy, Fertility and Recovery in India",
  excerpt:
    "What hair loss, nausea, fatigue, neuropathy, infection risk and fertility changes can look like during breast cancer chemotherapy — and how international patients plan cycles in India.",
  date: "27 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Medical Oncology",
  tags: ["breast cancer", "chemotherapy", "side effects", "fertility", "India", "travel"],
  image: "/uploads/articles/chemo-side-effects-infusion-visual.webp",
  imageAlt: "Breast cancer chemotherapy side effects including hair loss nausea fatigue neuropathy and recovery",
  status: "published",
  featured: true,
  seoTitle: "Breast Cancer Chemotherapy Side Effects: Hair Loss, Nausea & Recovery",
  seoDescription:
    "Learn about breast cancer chemotherapy side effects, including hair loss, nausea, fatigue, neuropathy, fertility problems, infection risk and recovery in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/chemo-side-effects-infusion-visual.webp",
  allowIndex: true,
  keywords: [
    "breast cancer chemotherapy side effects",
    "chemotherapy side effects breast cancer",
    "breast cancer chemotherapy side effects in India",
    "chemotherapy hair loss breast cancer",
    "chemotherapy nausea breast cancer",
    "chemotherapy fatigue breast cancer",
    "chemotherapy neuropathy breast cancer",
    "chemotherapy fertility breast cancer",
    "chemotherapy menopause breast cancer",
    "chemotherapy infection risk",
    "chemotherapy low white blood cells",
    "breast cancer chemotherapy recovery",
    "chemotherapy cycles for breast cancer",
    "chemotherapy treatment in India",
    "breast cancer chemotherapy cost in India",
  ],
  relatedLinks: [
    { label: "Breast Cancer Treatment in India", href: PILLAR },
    { label: "Chemotherapy for Breast Cancer", href: CHEMO },
    { label: "Chemotherapy cost", href: CHEMO_COST },
    { label: "Chemotherapy doctors", href: CHEMO_DOCTORS },
    { label: "Hormone therapy side effects", href: HT_SE },
    { label: "Targeted therapy side effects", href: TARGETED_SE },
    { label: "International patients", href: INTL },
    { label: "Diagnosis", href: DIAGNOSIS },
  ],
  blocks,
};

if (!store.categories.includes("Medical Oncology")) store.categories.push("Medical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}

const media = [
  { id: "media_cse_infusion", url: "/uploads/articles/chemo-side-effects-infusion-visual.webp", name: "chemo-side-effects-infusion-visual.webp", alt: article.imageAlt, addedAt: now },
  { id: "media_cse_fatigue", url: "/uploads/articles/chemo-side-effects-fatigue-visual.webp", name: "chemo-side-effects-fatigue-visual.webp", alt: "Fatigue and hair-care support during chemotherapy", addedAt: now },
  { id: "media_cse_neuropathy", url: "/uploads/articles/chemo-side-effects-neuropathy-visual.webp", name: "chemo-side-effects-neuropathy-visual.webp", alt: "Neuropathy assessment during chemotherapy", addedAt: now },
  { id: "media_cse_blood", url: "/uploads/articles/chemo-side-effects-blood-visual.webp", name: "chemo-side-effects-blood-visual.webp", alt: "Blood-count monitoring during chemotherapy", addedAt: now },
];
for (const item of media) {
  if (!store.media.some((row) => row.id === item.id)) store.media.push(item);
}

const index = store.articles.findIndex((row) => row.id === article.id);
if (index >= 0) store.articles[index] = article;
else store.articles.unshift(article);

for (const siblingId of [
  "art_chemotherapy_for_breast_cancer_in_india",
  "art_breast_cancer_hormone_therapy_side_effects",
  "art_breast_cancer_targeted_therapy_side_effects",
  "art_her2_positive_breast_cancer_treatment_india",
  "art_breast_cancer_treatment_india_international_patients",
  "art_breast_cancer_treatment_cost_in_india",
  "art_breast_cancer_diagnosis_tests_biopsy_er_pr_her2",
]) {
  const sibling = store.articles.find((row) => row.id === siblingId);
  if (!sibling) continue;
  sibling.relatedLinks ??= [];
  if (!sibling.relatedLinks.some((link) => link.href === HREF)) {
    sibling.relatedLinks.splice(1, 0, { label: "Chemotherapy Side Effects", href: HREF });
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length);
