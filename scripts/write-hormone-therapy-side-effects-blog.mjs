import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const PILLAR = "/treatments/breast-cancer-treatment-in-india";
const HORMONE = "/blogs/hormone-therapy-breast-cancer-india";
const TARGETED_SE = "/blogs/breast-cancer-targeted-therapy-side-effects";
const HER2 = "/blogs/her2-positive-breast-cancer-treatment-india";
const BIOMARKERS = "/blogs/er-pr-her2-breast-cancer-treatment-india";
const DIAGNOSIS = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const CHEMO = "/blogs/chemotherapy-for-breast-cancer-in-india";
const COST = "/blogs/breast-cancer-treatment-cost-in-india";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const BY_STAGE = "/blogs/breast-cancer-treatment-by-stage";
const HORMONE_DOCTORS = "/doctors/India/Medical-Oncology/Hormone-Therapy";
const HORMONE_COST = "/costs/India/Medical-Oncology/Hormone-Therapy";
const CHEMO_DOCTORS = "/doctors/India/Medical-Oncology/Chemotherapy";
const TARGETED_DOCTORS = "/doctors/India/Medical-Oncology/Targeted-Therapy";
const IMMUNO_DOCTORS = "/doctors/India/Medical-Oncology/Immunotherapy";
const CHEMO_COST = "/costs/India/Medical-Oncology/Chemotherapy";
const TARGETED_COST = "/costs/India/Medical-Oncology/Targeted-Therapy";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;

const blocks = [
  {
    id: id("html"),
    type: "html",
    html: `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body"><strong>What are the common side effects of breast cancer hormone therapy?</strong> Common effects include hot flashes, night sweats, vaginal dryness, changes in sexual desire, menstrual changes, fatigue, joint or muscle pain and mood changes. The exact side effects depend on the medicine.</p><p class="article-quick-answer__body"><strong>What are the main hormone therapy options for breast cancer?</strong> Common options include tamoxifen, aromatase inhibitors such as letrozole, anastrozole and exemestane, and ovarian suppression for some premenopausal patients. Other endocrine medicines may be used in advanced disease.</p><p class="article-quick-answer__body"><strong>Tamoxifen vs aromatase inhibitors: what is the main difference?</strong> Tamoxifen blocks estrogen receptors in breast cancer cells. Aromatase inhibitors lower estrogen production in the body and are mainly used after menopause, or with ovarian suppression in premenopausal patients.</p><p class="article-quick-answer__body"><strong>Which causes more joint pain: tamoxifen or aromatase inhibitors?</strong> Joint and muscle pain or stiffness is particularly common with aromatase inhibitors. Some patients find it significant enough to interfere with daily activities.</p><p class="article-quick-answer__body"><strong>Can hormone therapy cause menopause symptoms?</strong> Yes. Hot flashes, night sweats, vaginal dryness, changes in sexual function and menstrual changes can occur. Ovarian suppression intentionally produces a temporary or permanent menopausal state depending on the method used.</p><p class="article-quick-answer__body"><strong>Can aromatase inhibitors weaken bones?</strong> Yes. Aromatase inhibitors reduce estrogen substantially and can contribute to bone loss, osteoporosis and fractures. Bone-density monitoring may therefore be recommended.</p><p class="article-quick-answer__body"><strong>Does tamoxifen cause blood clots?</strong> It can increase the risk of blood clots, although serious clots are uncommon. Sudden leg swelling or pain, chest pain or unexplained shortness of breath requires prompt medical attention.</p><p class="article-quick-answer__body"><strong>Can tamoxifen increase the risk of uterine cancer?</strong> Tamoxifen is associated with an increased risk of endometrial cancer and uterine sarcoma, particularly in postmenopausal women. Unusual vaginal bleeding should be reported and evaluated.</p><p class="article-quick-answer__body"><strong>How long is breast cancer hormone therapy taken?</strong> Treatment is commonly given for around 5 years, but some patients receive endocrine therapy for longer depending on recurrence risk and the treatment plan.</p><p class="article-quick-answer__body"><strong>Should I stop hormone therapy if the side effects are difficult?</strong> Do not stop prescribed treatment on your own. Tell your oncologist. Switching medicines, changing the sequence or using symptom-management strategies may make treatment easier to continue.</p><p class="article-quick-answer__body"><strong>Can hormone therapy be used for breast cancer in India?</strong> Yes. Endocrine treatment is routinely used for appropriate hormone receptor-positive breast cancer patients in India.</p></aside>`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `For many people with hormone receptor-positive breast cancer, treatment does not end when surgery, [chemotherapy](${CHEMO}) or radiation is finished. A tablet or injection may become part of everyday life for several years. This treatment is called hormone therapy, or more accurately, endocrine therapy. This guide supports the [Breast Cancer Treatment in India](${PILLAR}) pathway and the [hormone therapy explainer](${HORMONE}).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask GAF about tamoxifen vs aromatase inhibitors",
    href: consult("Hormone Therapy"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 with your ER/PR report](${wa("Please review my ER/PR-positive breast cancer records and advise on hormone-therapy side effects in India.")})`,
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/hormone-therapy-side-effects-consult-visual.webp",
    alt: "Breast cancer hormone therapy side effects comparing tamoxifen and aromatase inhibitors",
    caption: "Endocrine therapy interferes with estrogen or progesterone signals. Experiencing side effects does not necessarily mean you have to stop treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Hormone Therapy for Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Hormone therapy is used when breast cancer cells have receptors for hormones such as estrogen or progesterone. These are called hormone receptor-positive breast cancers. The treatment either blocks the hormone receptor or reduces the amount of estrogen available to stimulate cancer cells. See [what ER, PR and HER2 results mean](${BIOMARKERS}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "It is different from hormone replacement therapy used for menopausal symptoms. That distinction is important. Breast cancer hormone therapy is cancer treatment. Its purpose is to reduce the ability of hormone-sensitive cancer cells to grow.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Hormone Therapy Doctors in India](${HORMONE_DOCTORS})\n- [Hormone Therapy Cost in India](${HORMONE_COST})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Who Needs Hormone Therapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Hormone therapy is generally used for ER-positive and/or PR-positive breast cancer. If the tumour does not have hormone receptors, endocrine therapy generally does not provide the same benefit because there is no hormone receptor pathway for the treatment to target.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `The treatment can be used after surgery, after [chemotherapy](${CHEMO}), alongside certain [targeted treatments](${TARGETED_SE}), before surgery in selected situations, for recurrent breast cancer and for metastatic hormone receptor-positive disease. The exact plan depends on the cancer, [stage](${BY_STAGE}) and menopausal status.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Can Hormone Therapy Cause Side Effects?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Hormones influence many normal functions. When endocrine therapy reduces estrogen activity, the effects are not limited to cancer cells. Lower estrogen activity can affect temperature regulation, bones, joints, vaginal tissues, sexual function, menstrual cycles, mood and sleep. That is why some hormone therapy side effects resemble symptoms of menopause. The exact experience depends on the treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Tamoxifen vs Aromatase Inhibitors",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "| Feature | Tamoxifen | Aromatase inhibitors |\n| --- | --- | --- |\n| Main examples | Tamoxifen | Letrozole, anastrozole, exemestane |\n| Main action | Blocks estrogen receptors | Lowers estrogen production |\n| Commonly used | Before or after menopause | Mainly after menopause |\n| Premenopausal use | Yes | Usually with ovarian suppression |\n| Common concern | Hot flashes, menstrual changes | Joint and muscle pain |\n| Bone effect | Different before vs after menopause | Can reduce bone density |\n| Blood-clot risk | Increased | Much lower |\n| Uterine cancer risk | Increased | Not associated in the same way |",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `The choice is not simply about which drug has fewer side effects. Oncology teams in [Delhi NCR](/doctors/India/Delhi-NCR), [Mumbai](/doctors/India/Mumbai), [Bengaluru](/doctors/India/Bengaluru), [Chennai](/doctors/India/Chennai) and [Hyderabad](/doctors/India/Hyderabad) consider age, menopausal status, cancer characteristics, recurrence risk, other medical conditions and previous treatment.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Ask which endocrine medicine fits your case](${consult("Hormone Therapy")}) · [WhatsApp +91 90443 46292](${wa("Should I take tamoxifen or an aromatase inhibitor, and how can we manage the side effects?")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "1. Hot Flashes and Night Sweats",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Hot flashes are among the most common complaints during endocrine therapy. You may suddenly feel warm, sweaty, flushed, uncomfortable or restless at night. Night sweats can interrupt sleep. These symptoms can be particularly noticeable when endocrine treatment causes an abrupt reduction in estrogen.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Depending on your health and medication, your doctor may discuss keeping the bedroom cool, wearing lightweight clothing, regular physical activity, reducing triggers such as very hot drinks, non-hormonal medicines and other symptom-management approaches. Do not automatically use estrogen-containing treatment for menopausal symptoms after hormone receptor-positive breast cancer. Discuss any menopause treatment with your oncology team first.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "2. Joint Pain and Stiffness",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/hormone-therapy-side-effects-joints-visual.webp",
    alt: "Joint stiffness assessment during aromatase-inhibitor treatment",
    caption: "Joint and muscle pain is particularly common with aromatase inhibitors. Some patients find it significant enough to interfere with daily activities.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Joint pain is one of the side effects most commonly associated with aromatase inhibitors. Patients may describe morning stiffness, aching fingers, wrist, knee, hip or shoulder pain, or general muscle aches. The symptoms can sometimes feel similar to arthritis. For some people they are mild; for others they interfere with walking, exercise, work or sleep.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Your doctor may consider regular physical activity, strength training, stretching, weight management when appropriate, pain-relieving medicines, changing from one aromatase inhibitor to another, or switching to tamoxifen in selected patients. Do not make the switch yourself.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "3. Bone Loss and Osteoporosis",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/hormone-therapy-side-effects-bone-visual.webp",
    alt: "Bone-density scan during aromatase-inhibitor hormone therapy",
    caption: "Aromatase inhibitors can contribute to bone loss. A DEXA scan may be recommended before or during treatment.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Estrogen helps maintain bone strength. When aromatase inhibitors substantially lower estrogen levels, bone density can decrease. Over time, this can increase the risk of osteoporosis and fractures. That does not mean everyone taking an aromatase inhibitor will develop osteoporosis. It means bone health needs to be considered.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Your doctor may recommend a DEXA scan depending on age, baseline bone density, menopausal status, fracture history, other osteoporosis risk factors and duration of treatment. Depending on your situation, they may discuss weight-bearing exercise, resistance exercise, adequate calcium intake, vitamin D, avoiding smoking, limiting excessive alcohol, bone-density monitoring and medicines to protect bone health when indicated. Do not start high-dose calcium or vitamin D supplements without discussing them with your doctor.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "4. Vaginal Dryness, Sexual Desire and Menstrual Changes",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Reduced estrogen activity can cause vaginal tissues to become drier and more sensitive. This may lead to dryness, burning, irritation or discomfort during sex. There is no reason to be embarrassed about bringing this up with your oncology team. Patients with hormone receptor-positive breast cancer should discuss hormonal products with their doctors before using them.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Hormone therapy can affect sexual desire. Changes in estrogen, vaginal discomfort, fatigue, body-image concerns, menopause symptoms and anxiety can all contribute. Premenopausal patients taking tamoxifen may notice irregular, lighter, heavier, less frequent or temporarily absent periods. A change in menstruation does not necessarily mean that ovarian function has permanently stopped.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "5. Ovarian Suppression, Mood Changes, Fatigue and Weight",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some premenopausal patients receive ovarian suppression with medicines such as goserelin or leuprolide. The resulting reduction in estrogen can cause hot flashes, night sweats, vaginal dryness, mood changes, reduced sexual desire, menstrual changes and bone loss. Medication-based suppression may be temporary. Surgical removal of the ovaries is permanent.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some patients report irritability, mood swings, anxiety, low mood or difficulty concentrating. Fatigue can be subtle at first. If fatigue is severe, your doctor may check for anemia, thyroid abnormalities or sleep difficulties rather than automatically blaming the hormone medicine. Weight changes after breast cancer treatment can have several causes. There is no evidence that simply stopping hormone therapy is an appropriate way to manage weight.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "6. Tamoxifen: Blood Clots, Uterine Cancer and Vision",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Tamoxifen can increase the risk of blood clots. Most people taking tamoxifen do not develop a serious clot, but the complication can be dangerous when it occurs. Seek urgent medical attention for sudden swelling in one leg, calf pain, leg redness or warmth, sudden shortness of breath or chest pain.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "In postmenopausal women, tamoxifen is associated with an increased risk of endometrial cancer and uterine sarcoma, although these cancers remain uncommon. The important symptom is unexpected vaginal bleeding. Most bleeding is not cancer, but it should not be ignored. Tamoxifen can also affect the eyes, including an increased risk of cataracts. Tell your doctor about new blurred vision or difficulty seeing clearly.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "7. Aromatase Inhibitors and Cholesterol",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Aromatase inhibitors can affect cholesterol levels in some patients. If you already have cardiovascular risk factors, your doctor may pay closer attention to cholesterol, blood pressure, weight, blood sugar and overall cardiovascular health.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Request a hormone-therapy side-effect review",
    href: consult("Hormone Therapy"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 for a case-specific plan](${wa("Please advise how to manage tamoxifen or aromatase-inhibitor side effects and send a case-specific quotation in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Should I Stop Hormone Therapy If Side Effects Are Difficult?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Usually, the first step is to talk to your oncologist rather than stopping it yourself. If side effects interfere with daily life, doctors may consider switching therapies or adjusting treatment. For some patients, another endocrine medicine may be easier to tolerate. For others, symptom management may make the existing treatment acceptable.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "If aromatase inhibitors cause severe joint pain, your doctor may consider changing from letrozole to anastrozole, changing to exemestane, exercise and physiotherapy, pain-management medicines, other supportive approaches, or switching to tamoxifen when medically appropriate. A side effect from one aromatase inhibitor does not necessarily mean that all endocrine therapy will be intolerable.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Long Do Side Effects Last, and How Long Is Treatment Taken?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some symptoms may improve after the body adjusts. Others can continue for as long as the medicine is being taken. Some effects, such as bone loss, may require ongoing monitoring. Many patients receive endocrine therapy for around 5 years. Some receive treatment for longer depending on recurrence risk. Tamoxifen and aromatase inhibitors may also be used sequentially.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Before Surgery, Recurrence and Male Breast Cancer",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "In selected situations, endocrine therapy can be used as neoadjuvant treatment before surgery, more commonly in certain postmenopausal patients. Endocrine therapy is also important for many patients whose recurrent or metastatic breast cancer remains hormone receptor-positive. Male breast cancer can also be hormone receptor-positive; tamoxifen is commonly used, and hot flashes, sexual problems and fatigue can occur.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Menopause Hormone Replacement and Supplements",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Menopausal hormone replacement therapy introduces hormones into the body and may not be appropriate after hormone receptor-positive breast cancer. Do not start estrogen or combined hormone replacement therapy without discussing it with your oncologist. \"Natural\" does not automatically mean safe. Some supplements can interact with prescription medicines or have estrogen-like effects.",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/hormone-therapy-side-effects-followup-visual.webp",
    alt: "Daily activity and follow-up during long-term breast cancer hormone therapy",
    caption: "Identify the specific side effect — joint pain, hot flashes, vaginal dryness, bone loss or mood changes — so the oncology team can address it.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Should International Patients Know About Hormone Therapy in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Hormone therapy is often a long-term treatment rather than a short series of hospital visits. Many endocrine medicines are taken at home. An international patient may have an initial oncology consultation in India, receive the treatment plan and then continue medication in their home country with appropriate follow-up. See the [international-patient guide](${INTL}) and the [cost guide](${COST}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Bring the original biopsy report, surgical pathology, ER, PR and [HER2](" + DIAGNOSIS + ") results, Ki-67, lymph-node status, genomic tests if performed, previous chemotherapy and radiation records, and the current medication list. If you are already taking tamoxifen or an aromatase inhibitor, include the medicine name, dose, start date, previous endocrine medicines, side effects and any bone-density reports.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Hospitals in [Delhi NCR](/hospitals/India/Delhi-NCR), [Mumbai](/hospitals/India/Mumbai), [Bengaluru](/hospitals/India/Bengaluru), [Chennai](/hospitals/India/Chennai) and [Hyderabad](/hospitals/India/Hyderabad) can confirm follow-up and laboratory schedules.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 your records before travel](${wa("I would like to send my ER/PR reports and current hormone-therapy details for review before travelling to India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Much Does Hormone Therapy Cost in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `The cost depends on the specific medicine, duration and whether other treatments such as [chemotherapy](${CHEMO_COST}) or [targeted therapy](${TARGETED_COST}) are being given. Unlike chemotherapy, endocrine therapy is often taken over a long period. Total expenditure can therefore depend more on the duration of treatment than on a single hospital visit. See [Hormone Therapy Cost in India](${HORMONE_COST}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Questions to Ask Your Oncologist",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Is my cancer ER-positive, PR-positive or both?",
      "Why are you recommending this particular hormone therapy, and how long will I need to take it?",
      "Could I need ovarian suppression?",
      "What side effects are most likely, and how can we manage them?",
      "When should I call the hospital, and what symptoms should be treated urgently?",
      "Do I need a bone-density test, cholesterol monitoring, vitamin D or calcium?",
      "Should I see a gynecologist while taking tamoxifen?",
      "What should I do if I cannot tolerate this medicine? Can I switch?",
      "What happens if I miss doses?",
    ],
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Frequently Asked Questions",
  },
  ...[
    ["Which is better, tamoxifen or an aromatase inhibitor?", "There is no single answer for every patient. The appropriate medicine depends on menopausal status, cancer characteristics, recurrence risk, previous treatment and other health factors."],
    ["Are aromatase inhibitors stronger than tamoxifen?", "They work differently, and their effectiveness varies according to the clinical setting. The choice should not be made based solely on the idea that one medicine is \"stronger.\""],
    ["Why do aromatase inhibitors cause joint pain?", "They substantially reduce estrogen levels, and low estrogen can contribute to joint and muscle symptoms."],
    ["Does tamoxifen cause menopause?", "Tamoxifen does not intentionally shut down the ovaries in the same way as ovarian suppression. However, it can cause menopausal symptoms and menstrual changes."],
    ["Can I stop tamoxifen if I feel fine?", "Feeling well does not mean the medicine is no longer needed. If your oncologist has prescribed it, continue as directed unless they advise otherwise."],
    ["Can I stop an aromatase inhibitor because of joint pain?", "Do not stop it without discussing the problem with your oncologist. There may be ways to manage the pain or change the endocrine treatment."],
    ["Does hormone therapy cause hair loss?", "Some endocrine therapies can contribute to hair thinning or other hair changes, although this is generally different from the rapid and extensive hair loss associated with some chemotherapy regimens."],
    ["Can hormone therapy cause weight gain?", "Weight changes can occur during breast cancer treatment, but they have multiple possible causes. Hormone therapy should not automatically be assumed to be the only reason."],
    ["Does hormone therapy affect fertility?", "It can affect reproductive function, particularly when ovarian suppression is used. Patients who may want children should discuss fertility planning with their oncology and fertility teams."],
    ["Can I become pregnant while taking tamoxifen?", "Tamoxifen is not considered safe during pregnancy. If pregnancy is possible or planned, discuss contraception and pregnancy planning with your oncologist."],
    ["Can hormone therapy be taken for 10 years?", "Some patients may be prescribed endocrine therapy for longer than five years depending on their recurrence risk and treatment history."],
    ["Can hormone therapy prevent breast cancer recurrence?", "For appropriate hormone receptor-positive breast cancer, endocrine therapy is used to reduce the risk of recurrence and can improve outcomes."],
  ].flatMap(([q, a]) => [
    { id: id("h"), type: "heading", level: 3, text: q },
    { id: id("p"), type: "paragraph", text: a },
  ]),
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Hormone Therapy Side Effects: Key Takeaways",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Hormone therapy is often a long-term part of treatment for hormone receptor-positive breast cancer. Unlike chemotherapy, you may not have to visit a hospital every few weeks for an infusion. Instead, treatment can become part of everyday life for several years. That makes tolerability and adherence particularly important.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Tamoxifen and aromatase inhibitors work differently and have different side-effect profiles. Tamoxifen is more commonly associated with hot flashes, menstrual changes and an uncommon risk of blood clots and uterine cancer. Aromatase inhibitors are particularly associated with joint and muscle symptoms and loss of bone density.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Difficult side effects do not automatically mean that endocrine treatment has to stop. There may be another medicine that you can tolerate better, ways to manage the symptoms, or a change in treatment sequence. Talk to your oncology team before stopping treatment on your own.",
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
    text: `[WhatsApp +91 90443 46292 to plan the next step](${wa("Please help me plan hormone therapy and side-effect management for breast cancer in India.")})`,
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
    text: `- [Breast Cancer Treatment in India](${PILLAR})\n- [Hormone Therapy for Breast Cancer](${HORMONE})\n- [Targeted therapy side effects](${TARGETED_SE})\n- [HER2-positive treatment](${HER2})\n- [Chemotherapy](${CHEMO})\n- [Diagnosis and ER/PR testing](${DIAGNOSIS})\n- [Hormone therapy doctors](${HORMONE_DOCTORS}) · [cost](${HORMONE_COST})\n- [Chemotherapy doctors](${CHEMO_DOCTORS})\n- [Targeted therapy doctors](${TARGETED_DOCTORS})\n- [Immunotherapy doctors](${IMMUNO_DOCTORS})\n- [International patients](${INTL})`,
  },
];

const now = "2026-09-27T21:30:00.000Z";
const SLUG = "breast-cancer-hormone-therapy-side-effects";
const HREF = `/blogs/${SLUG}`;

const article = {
  id: "art_breast_cancer_hormone_therapy_side_effects",
  slug: SLUG,
  title: "Breast Cancer Hormone Therapy Side Effects: Tamoxifen vs Aromatase Inhibitors and How to Manage Them",
  excerpt:
    "How tamoxifen and aromatase inhibitors differ, how to manage hot flashes, joint pain and bone loss, and why international patients should not stop endocrine therapy without their oncologist.",
  date: "27 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Medical Oncology",
  tags: ["breast cancer", "hormone therapy", "tamoxifen", "aromatase inhibitors", "India", "travel"],
  image: "/uploads/articles/hormone-therapy-side-effects-consult-visual.webp",
  imageAlt: "Breast cancer hormone therapy side effects comparing tamoxifen and aromatase inhibitors",
  status: "published",
  featured: true,
  seoTitle: "Breast Cancer Hormone Therapy Side Effects: Tamoxifen vs AI",
  seoDescription:
    "Learn about breast cancer hormone therapy side effects, including tamoxifen vs aromatase inhibitors, joint pain, hot flashes, bone loss and menopause.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/hormone-therapy-side-effects-consult-visual.webp",
  allowIndex: true,
  keywords: [
    "breast cancer hormone therapy side effects",
    "hormone therapy side effects breast cancer",
    "tamoxifen side effects breast cancer",
    "aromatase inhibitor side effects breast cancer",
    "tamoxifen vs aromatase inhibitors",
    "letrozole side effects breast cancer",
    "anastrozole side effects breast cancer",
    "exemestane side effects breast cancer",
    "breast cancer hormone therapy joint pain",
    "breast cancer hormone therapy hot flashes",
    "breast cancer hormone therapy bone loss",
    "breast cancer hormone therapy menopause",
    "breast cancer endocrine therapy side effects",
    "hormone therapy for breast cancer in India",
    "breast cancer hormone therapy cost in India",
  ],
  relatedLinks: [
    { label: "Breast Cancer Treatment in India", href: PILLAR },
    { label: "Hormone Therapy for Breast Cancer", href: HORMONE },
    { label: "Hormone therapy cost", href: HORMONE_COST },
    { label: "Hormone therapy doctors", href: HORMONE_DOCTORS },
    { label: "Targeted therapy side effects", href: TARGETED_SE },
    { label: "Chemotherapy", href: CHEMO },
    { label: "Diagnosis and ER/PR testing", href: DIAGNOSIS },
    { label: "International patients", href: INTL },
  ],
  blocks,
};

if (!store.categories.includes("Medical Oncology")) store.categories.push("Medical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}

const media = [
  { id: "media_htse_consult", url: "/uploads/articles/hormone-therapy-side-effects-consult-visual.webp", name: "hormone-therapy-side-effects-consult-visual.webp", alt: article.imageAlt, addedAt: now },
  { id: "media_htse_joints", url: "/uploads/articles/hormone-therapy-side-effects-joints-visual.webp", name: "hormone-therapy-side-effects-joints-visual.webp", alt: "Joint stiffness during aromatase-inhibitor treatment", addedAt: now },
  { id: "media_htse_bone", url: "/uploads/articles/hormone-therapy-side-effects-bone-visual.webp", name: "hormone-therapy-side-effects-bone-visual.webp", alt: "Bone-density scan during hormone therapy", addedAt: now },
  { id: "media_htse_followup", url: "/uploads/articles/hormone-therapy-side-effects-followup-visual.webp", name: "hormone-therapy-side-effects-followup-visual.webp", alt: "Follow-up activity during endocrine therapy", addedAt: now },
];
for (const item of media) {
  if (!store.media.some((row) => row.id === item.id)) store.media.push(item);
}

const index = store.articles.findIndex((row) => row.id === article.id);
if (index >= 0) store.articles[index] = article;
else store.articles.unshift(article);

for (const siblingId of [
  "art_hormone_therapy_breast_cancer_india",
  "art_breast_cancer_targeted_therapy_side_effects",
  "art_chemotherapy_for_breast_cancer_in_india",
  "art_er_pr_her2_breast_cancer_treatment_india",
  "art_breast_cancer_diagnosis_tests_biopsy_er_pr_her2",
  "art_breast_cancer_treatment_cost_in_india",
  "art_breast_cancer_treatment_india_international_patients",
]) {
  const sibling = store.articles.find((row) => row.id === siblingId);
  if (!sibling) continue;
  sibling.relatedLinks ??= [];
  if (!sibling.relatedLinks.some((link) => link.href === HREF)) {
    sibling.relatedLinks.splice(1, 0, { label: "Hormone Therapy Side Effects", href: HREF });
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length);
