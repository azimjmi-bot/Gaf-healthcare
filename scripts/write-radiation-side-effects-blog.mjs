import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const PILLAR = "/treatments/breast-cancer-treatment-in-india";
const RAD = "/blogs/radiation-therapy-for-breast-cancer";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const LUMP = "/blogs/lumpectomy-vs-mastectomy";
const RECON = "/blogs/breast-reconstruction-after-mastectomy-india";
const LYMPH = "/blogs/breast-cancer-lymphedema";
const CHEMO_SE = "/blogs/breast-cancer-chemotherapy-side-effects";
const HT_SE = "/blogs/breast-cancer-hormone-therapy-side-effects";
const DIAGNOSIS = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const COST = "/blogs/breast-cancer-treatment-cost-in-india";
const RAD_DOCTORS = "/doctors/India/Radiation-Oncology";
const BCS_DOCTORS = "/doctors/India/Surgical-Oncology/Breast-Conserving-Surgery";
const MAST_DOCTORS = "/doctors/India/Surgical-Oncology/Mastectomy";
const CHEMO_DOCTORS = "/doctors/India/Medical-Oncology/Chemotherapy";
const HT_DOCTORS = "/doctors/India/Medical-Oncology/Hormone-Therapy";
const CHEMO_COST = "/costs/India/Medical-Oncology/Chemotherapy";
const TARGETED_COST = "/costs/India/Medical-Oncology/Targeted-Therapy";
const IMMUNO_COST = "/costs/India/Medical-Oncology/Immunotherapy";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;

const blocks = [
  {
    id: id("html"),
    type: "html",
    html: `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body"><strong>What are the most common side effects of breast cancer radiation?</strong> The most common early effects include skin changes, breast tenderness or swelling and fatigue.</p><p class="article-quick-answer__body"><strong>Does breast radiation hurt?</strong> The radiation treatment itself is generally painless. Side effects such as skin irritation, soreness and fatigue usually develop gradually during or after treatment rather than during the actual radiation session.</p><p class="article-quick-answer__body"><strong>Does radiation cause skin darkening?</strong> It can. The treated skin may become red, darker, dry, itchy or irritated. Some patients develop peeling or more significant skin reactions.</p><p class="article-quick-answer__body"><strong>When do radiation side effects start?</strong> Side effects often develop gradually during treatment and may become more noticeable toward the end or shortly afterward. Some symptoms can temporarily worsen after treatment finishes before improving.</p><p class="article-quick-answer__body"><strong>How long does radiation fatigue last?</strong> Fatigue commonly increases during treatment and usually improves after treatment ends, although recovery can take time and varies between patients.</p><p class="article-quick-answer__body"><strong>Can breast radiation cause lymphedema?</strong> Yes. Radiation involving regional lymph nodes can contribute to lymphedema, particularly when combined with lymph-node surgery.</p><p class="article-quick-answer__body"><strong>Can breast radiation affect the heart?</strong> Radiation to the chest can expose the heart to some radiation. Modern planning techniques are designed to minimize this exposure, and serious heart complications are uncommon.</p><p class="article-quick-answer__body"><strong>Can radiation damage the lungs?</strong> In some patients, radiation can cause inflammation of lung tissue, known as radiation pneumonitis. It is uncommon with modern breast radiation but should be reported if symptoms such as persistent cough or breathlessness develop.</p><p class="article-quick-answer__body"><strong>Will radiation permanently change the breast?</strong> It can. The breast may become firmer, smaller, more swollen or change in skin color or texture. Many treatment-related changes improve, but some can persist.</p><p class="article-quick-answer__body"><strong>Can radiation cause another cancer?</strong> A second cancer in the treated area is a recognized but very rare late complication of radiation therapy.</p><p class="article-quick-answer__body"><strong>Can radiation side effects be treated?</strong> Yes. Skin care, pain management, exercise, rehabilitation and other supportive measures can help manage many side effects. Tell your radiation team about new or worsening symptoms rather than trying to manage significant reactions yourself.</p></aside>`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Radiation therapy is an important part of treatment for many people with breast cancer. It is often given after [breast-conserving surgery](${LUMP}) and may also be recommended after [mastectomy](${SURGERY}) in selected patients. Radiation can reduce the risk of cancer returning in the treated breast, chest wall or nearby lymph-node areas. This guide supports the [Breast Cancer Treatment in India](${PILLAR}) pathway and the [radiation therapy explainer](${RAD}).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask GAF about your radiation plan",
    href: consult("Radiation Therapy"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 with your pathology](${wa("Please review my records and advise on breast cancer radiation side effects and recovery in India.")})`,
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/radiation-side-effects-planning-visual.webp",
    alt: "Breast cancer radiation therapy side effects including skin changes fatigue swelling and recovery",
    caption: "The radiation session itself is generally painless. Side effects such as skin irritation and fatigue develop gradually during or after treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Is Radiation Used for Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Radiation therapy uses high-energy radiation to damage or destroy cancer cells in the treatment area. It is usually a local treatment, meaning it is directed at a particular part of the body rather than circulating throughout the body like chemotherapy. After breast-conserving surgery, radiation is commonly used to reduce the chance of cancer returning in the treated breast. After mastectomy, radiation may be recommended for some patients, particularly when there are factors such as lymph-node involvement or a larger tumour. The decision depends on the original cancer and the results of surgery and pathology.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `- [Radiation Oncology Doctors in India](${RAD_DOCTORS})\n- [Breast-conserving surgery doctors](${BCS_DOCTORS})\n- [Mastectomy doctors](${MAST_DOCTORS})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Does Breast Radiation Treatment Feel Like?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The actual radiation delivery is generally painless. You lie in a specific position while the radiation machine delivers the planned dose. The treatment itself usually takes only a short time. What patients tend to notice is not pain during the radiation beam but the gradual development of side effects over the course of treatment. The skin may become more sensitive. The breast may feel heavier or tender. And fatigue can gradually become more noticeable.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Are the Early Side Effects of Breast Radiation?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The most common early effects include skin redness or darkening, dryness, itching, breast tenderness, breast swelling, fatigue, tightness and temporary changes in breast texture. Not everyone experiences all of these symptoms. Some patients have relatively little skin reaction, while others develop more significant irritation. Your radiation dose, treatment area, individual sensitivity and other treatments can influence the experience.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Radiation Skin Changes: What Should You Expect?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/radiation-side-effects-skin-visual.webp",
    alt: "Gentle skin care during breast cancer radiation therapy",
    caption: "Treated skin may become red, darker, dry or irritated. Use only products your radiation team recommends.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Skin reactions are among the most noticeable side effects. The treated area may gradually become red, darker, dry, itchy, sensitive, warm or tender. In more pronounced reactions, the skin may peel or develop moist areas. The appearance can resemble a sunburn, although radiation-related skin changes are not exactly the same as ordinary sunburn.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "When Do Radiation Skin Changes Start?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "They generally develop gradually rather than appearing immediately after the first treatment. Some people notice changes during the treatment course. The reaction can become more noticeable toward the end of treatment and may continue for a short period after radiation has finished. Acute radiation effects can peak after treatment and then gradually improve. Finishing the final session does not mean every side effect will disappear the next day.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Does Radiation Make the Skin Dark?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "It can. The skin in the treatment area may become darker during or after radiation. The degree varies between patients. In some people, the colour gradually returns toward normal. In others, some degree of pigmentation change can remain for longer.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can Radiation Cause Skin Peeling?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Some patients develop dry peeling. Others can develop more significant skin breakdown. If the skin becomes very sore, starts peeling extensively, develops open areas or appears infected, tell your radiation oncology team. Do not assume that severe skin damage is something you simply have to tolerate.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "How Should I Look After My Skin During Radiation?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Your radiation team should tell you which products are appropriate for your treatment plan. General principles include being gentle with the treated skin: avoiding harsh soaps, avoiding vigorous rubbing or scrubbing, wearing soft loose clothing, protecting the treated area from unnecessary sun exposure, avoiding adhesive products directly over irritated skin, and using only recommended creams or moisturisers. Follow the instructions provided by your own treatment team.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Should I Use Cream Before Radiation?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Do not automatically apply any cream immediately before a radiation session without asking your radiation team. Some centres recommend specific moisturisers and application schedules. Others may have particular instructions about what can be applied before treatment. The safest approach is to ask which product they recommend and when to use it.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Can I Take a Shower During Radiation Therapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Usually, patients can continue normal hygiene during breast radiation. However, the treated skin should be handled gently. Avoid aggressive scrubbing, very hot water and products that irritate your skin. If your skin becomes broken or severely inflamed, ask your treatment team for specific instructions.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Radiation Fatigue?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/radiation-side-effects-fatigue-visual.webp",
    alt: "Fatigue and daily walking during breast cancer radiation",
    caption: "Fatigue commonly increases during treatment and usually improves afterward, although recovery varies.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Fatigue is one of the most common side effects of radiation therapy. It is different from simply feeling sleepy. Patients may describe a lack of energy, physical heaviness, difficulty concentrating, feeling exhausted after ordinary activities or needing more rest than usual. Radiation fatigue can develop gradually and varies substantially between people.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Why Does Radiation Cause Fatigue?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is no single explanation. The body is responding to treatment and repairing normal tissues at the same time. Other contributors can include daily travel to the radiation centre, anxiety, poor sleep, reduced physical activity, pain, anemia, other cancer treatments and emotional stress. So radiation fatigue is not necessarily caused by radiation alone.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "How Long Does Radiation Fatigue Last?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Fatigue often becomes more noticeable as treatment progresses. It usually improves after treatment ends, but recovery is not identical for everyone. Some patients feel better relatively quickly. Others need several weeks or longer to return to their previous energy levels. If severe fatigue continues or worsens, tell your doctor. There may be another treatable cause.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "Should I Rest All Day During Radiation?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Not necessarily. Too much inactivity can sometimes make fatigue worse. If your medical team agrees, gentle physical activity such as walking can help you maintain strength and routine. The goal is to balance activity with rest. On particularly tiring days, reducing your workload may be sensible. There is no need to force yourself through severe exhaustion.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Swelling, Firmness and Changes in Shape",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The treated breast can become swollen or feel heavier during radiation. This is usually related to inflammation and changes in fluid drainage. Swelling generally improves after treatment, although the timeline varies. Persistent or worsening swelling should be discussed with your treatment team.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Radiation can also make breast tissue feel firmer or tighter. Some of these changes are temporary; others may persist. The treated breast may temporarily become larger because of swelling. Later, some patients notice that it becomes smaller or firmer because of tissue changes and scarring. The degree varies considerably.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Radiation Affect Breast Reconstruction?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Yes. Radiation can affect reconstructed breast tissue. The effect depends partly on the type of reconstruction and when radiation is given. Possible changes include firmness, tightness, changes in shape, skin changes, healing problems and changes in the appearance of the reconstruction. If reconstruction is planned, the breast surgeon and radiation oncologist should discuss the sequence of treatment before surgery whenever possible. See [reconstruction after mastectomy](${RECON}).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask about radiation after reconstruction",
    href: consult("Radiation Therapy"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 about skin, swelling or reconstruction](${wa("Please advise how to manage radiation skin changes, fatigue or swelling during breast cancer treatment in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Radiation Cause Lymphedema?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Yes. Lymphedema occurs when lymphatic fluid does not drain properly. Radiation involving lymph-node regions can damage or scar lymphatic pathways. The risk can be particularly relevant when radiation is combined with lymph-node surgery. Possible symptoms include arm swelling, hand swelling, breast swelling, heaviness, tightness, reduced flexibility and skin changes. Early recognition is useful because lymphedema can become more difficult to manage when it progresses. See the [lymphedema guide](${LYMPH}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Radiation Cause Shoulder Stiffness?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Some patients experience shoulder or arm tightness after breast cancer treatment. This can be related to surgery, radiation, lymph-node treatment or reduced activity during recovery. Gentle movement and rehabilitation can help maintain shoulder mobility. If movement is becoming increasingly restricted, ask your cancer team whether physiotherapy or breast cancer rehabilitation would be appropriate.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Radiation Affect the Heart?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "This is a concern particularly when radiation is delivered near the heart. Radiation can contribute to long-term heart problems, although modern techniques have substantially improved the ability to limit cardiac exposure. The actual risk depends on which side of the chest is treated, radiation dose, treatment area, heart exposure during planning, other cardiovascular risk factors and previous cancer treatments. This is why modern radiation planning pays close attention to the heart.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 3,
    text: "What Is Deep Inspiration Breath Hold?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "For some patients receiving radiation to the left breast, the radiation team may use a technique called deep inspiration breath hold (DIBH). The patient takes a deep breath and holds it for a short period while radiation is delivered. The expanded lungs can move the heart farther away from the chest wall, potentially reducing the amount of radiation reaching the heart. Whether DIBH is appropriate depends on the treatment plan and the patient's anatomy.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Breast Radiation Affect the Lungs?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "It can, although significant lung complications are uncommon with modern breast radiation. One possible effect is radiation pneumonitis, an inflammatory reaction in the lung tissue receiving radiation. Symptoms may include persistent cough, shortness of breath, chest discomfort and fever in some cases. Persistent respiratory symptoms after radiation should be reported rather than assumed to be normal treatment fatigue.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Ribs, Nerves and Second Cancers",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Rarely, radiation can weaken bone in the treatment area and, in uncommon cases, contribute to rib fracture. A new persistent pain over the ribs or chest wall should be discussed with your doctor. Rarely, radiation involving the lymph-node region can affect nerves around the shoulder and arm, leading to numbness, tingling, pain or weakness. A second cancer caused by radiation is possible but very rare. Modern planning is designed to reduce unnecessary exposure to surrounding tissues.",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/radiation-side-effects-followup-visual.webp",
    alt: "Shoulder mobility check after breast cancer radiation",
    caption: "Tell the radiation team about severe skin reactions, swelling, persistent cough or new arm heaviness.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Are Late Effects, and How Long Do Side Effects Last?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Late effects are problems that appear months or years after treatment. Possible effects include persistent skin changes, breast firmness, size or shape changes, lymphedema, and uncommon lung, heart, rib or nerve effects. A second cancer in the treated area is a very rare late complication. Most patients do not experience every possible complication.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "There is no single recovery timeline. During treatment, skin irritation and fatigue may gradually increase. Immediately afterward, some symptoms may continue or even become temporarily more noticeable. Over the following weeks, skin reactions and swelling often begin to settle. Over several months the breast and skin can continue to change as tissues heal. Long term, some changes such as firmness or pigmentation can persist.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "When Should You Call Your Radiation Oncologist?",
  },
  {
    id: id("ul"),
    type: "list",
    style: "ul",
    items: [
      "Severe skin peeling, open or bleeding skin, or signs of infection",
      "Increasing pain or significant swelling",
      "Fever",
      "Persistent cough or new shortness of breath",
      "New or worsening arm swelling",
      "Significant weakness or new neurological symptoms",
    ],
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Do not wait until your next scheduled appointment if a symptom is severe or rapidly worsening. Skin care, pain management, exercise, rehabilitation and other supportive measures can help manage many side effects. Tell your radiation team about new or worsening symptoms rather than trying to manage significant reactions yourself.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Work, Exercise and Travel During Radiation",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Radiation is often delivered on an outpatient basis. Many patients continue some or most of their usual activities, particularly if their job is not physically demanding. Fatigue can still make the routine more difficult. Light or moderate activity such as walking is often appropriate if the team agrees. Daily radiation schedules can make extensive travel impractical. For international patients, staying relatively close to the radiation centre is often more practical than commuting from another city.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Is Side-Effect Risk Reduced in Modern Treatment?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Modern treatment planning uses imaging and computerised planning to define the treatment area and shape the dose. Techniques can include three-dimensional planning, intensity-modulated radiation therapy, image-guided radiation therapy, deep inspiration breath hold and other motion-management techniques. A more advanced machine does not automatically mean fewer side effects. Good outcomes also depend on accurate diagnosis, target definition, dose selection, image guidance, quality assurance and experienced radiation oncology professionals. See the [radiation therapy guide](${RAD}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Radiation teams in [Delhi NCR](/doctors/India/Delhi-NCR), [Mumbai](/doctors/India/Mumbai), [Bengaluru](/doctors/India/Bengaluru), [Chennai](/doctors/India/Chennai) and [Hyderabad](/doctors/India/Hyderabad) can confirm whether heart-sparing techniques such as DIBH are appropriate.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Should International Patients Ask and Bring?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Before starting radiation, ask why you need it, which areas will be treated, how many sessions are planned, whether lymph nodes will be included, what skin changes and fatigue to expect, which symptoms to report immediately, whether the heart is near the field, whether breath-hold will be used, how long you need to stay in India, and what follow-up you will need after returning home. See the [international-patient guide](${INTL}) and the [cost guide](${COST}).`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Bring the biopsy and final pathology, [ER/PR/HER2](${DIAGNOSIS}) results, Ki-67, surgical and lymph-node reports, previous chemotherapy or radiation records, mammography, MRI, CT or PET-CT files and the current medication list. If you have already received radiation elsewhere, the treatment summary and dose information are particularly important. Centres in [Delhi NCR](/hospitals/India/Delhi-NCR) and [Mumbai](/hospitals/India/Mumbai) can confirm the schedule before you book accommodation.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 your records before travel](${wa("I would like to send my pathology and radiation records for review before travelling to India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Much Does Breast Cancer Radiation Cost in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `There is no single price. Cost can depend on technique, treatment area, number of sessions, planning and imaging, the hospital, and whether [chemotherapy](${CHEMO_COST}) or other treatments are given at the same time. For international patients, the most useful quotation is based on the actual radiation plan rather than a generic online number.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Frequently Asked Questions",
  },
  ...[
    ["What are the most common side effects of breast cancer radiation?", "The most common early effects include skin changes, breast tenderness or swelling and fatigue."],
    ["Does breast radiation hurt?", "The radiation treatment itself is generally painless. Skin irritation, soreness and fatigue usually develop gradually during or after treatment."],
    ["Does radiation cause skin darkening?", "It can. The treated skin may become red, darker, dry, itchy or irritated. Some patients develop peeling."],
    ["When do radiation side effects start?", "They often develop gradually during treatment and may become more noticeable toward the end or shortly afterward."],
    ["How long does radiation fatigue last?", "Fatigue commonly increases during treatment and usually improves afterward, although recovery varies."],
    ["Can breast radiation cause lymphedema?", "Yes. Radiation involving regional lymph nodes can contribute to lymphedema, particularly when combined with lymph-node surgery."],
    ["Can breast radiation affect the heart?", "Radiation to the chest can expose the heart to some radiation. Modern planning is designed to minimise this, and serious heart complications are uncommon."],
    ["Can radiation damage the lungs?", "Radiation pneumonitis is uncommon with modern breast radiation but should be reported if persistent cough or breathlessness develops."],
    ["Will radiation permanently change the breast?", "It can. The breast may become firmer, smaller, more swollen or change in skin colour or texture. Some changes persist."],
    ["Can radiation cause another cancer?", "A second cancer in the treated area is a recognised but very rare late complication."],
    ["Can radiation side effects be treated?", "Yes. Skin care, pain management, exercise and rehabilitation can help. Tell your radiation team about new or worsening symptoms."],
  ].flatMap(([q, a]) => [
    { id: id("h"), type: "heading", level: 3, text: q },
    { id: id("p"), type: "paragraph", text: a },
  ]),
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Radiation Side Effects: Key Takeaways",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The most common effects of breast radiation are skin changes, fatigue, swelling and tenderness. These are usually temporary or manageable, although some breast changes can persist. Longer-term effects can include lymphedema and, much less commonly, lung, heart, rib or nerve problems. Modern planning has made it possible to target the treatment area more precisely. If your skin becomes severely irritated, swelling increases, you develop persistent breathing problems or something simply feels different, tell your radiation oncology team. You do not need to silently tolerate significant side effects.",
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
    text: `[WhatsApp +91 90443 46292 to plan the next step](${wa("Please help me plan radiation therapy and side-effect support for breast cancer in India.")})`,
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
    text: `- [Breast Cancer Treatment in India](${PILLAR})\n- [Radiation therapy for breast cancer](${RAD})\n- [Lymphedema](${LYMPH})\n- [Chemotherapy side effects](${CHEMO_SE})\n- [Hormone therapy side effects](${HT_SE})\n- [Radiation oncology doctors](${RAD_DOCTORS})\n- [Breast-conserving surgery doctors](${BCS_DOCTORS})\n- [Mastectomy doctors](${MAST_DOCTORS})\n- [Chemotherapy doctors](${CHEMO_DOCTORS})\n- [Hormone therapy doctors](${HT_DOCTORS})\n- [Chemotherapy cost](${CHEMO_COST}) · [targeted therapy cost](${TARGETED_COST}) · [immunotherapy cost](${IMMUNO_COST})\n- [International patients](${INTL})`,
  },
];

const now = "2026-09-27T22:30:00.000Z";
const SLUG = "breast-cancer-radiation-side-effects";
const HREF = `/blogs/${SLUG}`;

const article = {
  id: "art_breast_cancer_radiation_side_effects",
  slug: SLUG,
  title: "Breast Cancer Radiation Side Effects: Skin Changes, Fatigue, Lymphedema, Heart and Recovery",
  excerpt:
    "What skin changes, fatigue, swelling, lymphedema and uncommon heart or lung effects can look like during breast radiation — and how international patients plan recovery in India.",
  date: "27 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Radiation Oncology",
  tags: ["breast cancer", "radiation", "side effects", "lymphedema", "India", "travel"],
  image: "/uploads/articles/radiation-side-effects-planning-visual.webp",
  imageAlt: "Breast cancer radiation therapy side effects including skin changes fatigue swelling and recovery",
  status: "published",
  featured: true,
  seoTitle: "Breast Cancer Radiation Side Effects: Skin, Fatigue & Recovery",
  seoDescription:
    "Learn about breast cancer radiation side effects, including skin changes, fatigue, swelling, lymphedema, heart and lung effects and recovery.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/radiation-side-effects-planning-visual.webp",
  allowIndex: true,
  keywords: [
    "breast cancer radiation side effects",
    "radiation side effects for breast cancer",
    "breast cancer radiation side effects in India",
    "radiation therapy side effects breast cancer",
    "breast radiation skin changes",
    "breast radiation fatigue",
    "breast radiation swelling",
    "radiation after breast cancer surgery",
    "breast cancer radiation recovery",
    "radiation and lymphedema breast cancer",
    "radiation heart side effects breast cancer",
    "radiation lung side effects breast cancer",
    "radiation skin peeling breast cancer",
    "breast cancer radiotherapy side effects",
    "breast cancer radiation treatment in India",
  ],
  relatedLinks: [
    { label: "Breast Cancer Treatment in India", href: PILLAR },
    { label: "Radiation therapy for breast cancer", href: RAD },
    { label: "Radiation oncology doctors", href: RAD_DOCTORS },
    { label: "Lymphedema", href: LYMPH },
    { label: "Surgery in India", href: SURGERY },
    { label: "International patients", href: INTL },
  ],
  blocks,
};

if (!store.categories.includes("Radiation Oncology")) store.categories.push("Radiation Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}

const index = store.articles.findIndex((row) => row.id === article.id || row.slug === SLUG);
if (index >= 0) store.articles[index] = article;
else store.articles.unshift(article);

for (const siblingId of [
  "art_radiation_therapy_for_breast_cancer",
  "art_breast_cancer_surgery_in_india",
  "art_lumpectomy_vs_mastectomy",
  "art_breast_cancer_lymphedema",
]) {
  const sibling = store.articles.find((row) => row.id === siblingId);
  if (!sibling) continue;
  sibling.relatedLinks ??= [];
  if (!sibling.relatedLinks.some((link) => link.href === HREF)) {
    sibling.relatedLinks.splice(1, 0, { label: "Radiation Side Effects", href: HREF });
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length);
