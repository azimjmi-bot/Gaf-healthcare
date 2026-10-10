import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const PILLAR = "/treatments/breast-cancer-treatment-in-india";
const YOUNG = "/blogs/breast-cancer-in-young-women-treatment-india";
const PATH = "/blogs/breast-cancer-pathology-report-explained";
const DIAGNOSIS = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const STAGES = "/blogs/breast-cancer-stages-0-1-2-3-4";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const LUMP = "/blogs/lumpectomy-vs-mastectomy";
const RAD = "/blogs/radiation-therapy-for-breast-cancer";
const RAD_SE = "/blogs/breast-cancer-radiation-side-effects";
const CHEMO = "/blogs/chemotherapy-for-breast-cancer-in-india";
const CHEMO_SE = "/blogs/breast-cancer-chemotherapy-side-effects";
const HT = "/blogs/hormone-therapy-breast-cancer-india";
const HT_SE = "/blogs/breast-cancer-hormone-therapy-side-effects";
const HER2 = "/blogs/her2-positive-breast-cancer-treatment-india";
const ERPR = "/blogs/er-pr-her2-breast-cancer-treatment-india";
const FOLLOW = "/blogs/breast-cancer-follow-up-tests";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const COST = "/blogs/breast-cancer-treatment-cost-in-india";
const BCS_DOCTORS = "/doctors/India/Surgical-Oncology/Breast-Conserving-Surgery";
const MAST_DOCTORS = "/doctors/India/Surgical-Oncology/Mastectomy";
const CHEMO_DOCTORS = "/doctors/India/Medical-Oncology/Chemotherapy";
const HT_DOCTORS = "/doctors/India/Medical-Oncology/Hormone-Therapy";
const TARGETED_DOCTORS = "/doctors/India/Medical-Oncology/Targeted-Therapy";
const IMMUNO_DOCTORS = "/doctors/India/Medical-Oncology/Immunotherapy";
const BCS_COST = "/costs/India/Surgical-Oncology/Breast-Conserving-Surgery";
const MAST_COST = "/costs/India/Surgical-Oncology/Mastectomy";
const CHEMO_COST = "/costs/India/Medical-Oncology/Chemotherapy";
const HT_COST = "/costs/India/Medical-Oncology/Hormone-Therapy";
const TARGETED_COST = "/costs/India/Medical-Oncology/Targeted-Therapy";
const IMMUNO_COST = "/costs/India/Medical-Oncology/Immunotherapy";

let n = 0;
const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;

const blocks = [
  {
    id: id("html"),
    type: "html",
    html: `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body"><strong>Can breast cancer be treated during pregnancy?</strong> Yes. Breast cancer can usually be treated during pregnancy, although the type and timing of treatment may need to be modified to protect the developing baby. (cancer.gov)</p><p class="article-quick-answer__body"><strong>How is breast cancer diagnosed during pregnancy?</strong> Clinical examination, ultrasound, mammography and biopsy can be used when breast cancer is suspected. Ultrasound does not use radiation, and mammography can be performed when clinically necessary with appropriate precautions. (cancer.gov)</p><p class="article-quick-answer__body"><strong>Can a pregnant woman have breast cancer surgery?</strong> Yes. Surgery is generally considered possible during pregnancy, with the timing and anesthesia plan coordinated between the surgical and obstetric teams. (cancer.org)</p><p class="article-quick-answer__body"><strong>Can chemotherapy be given during pregnancy?</strong> Certain chemotherapy medicines can be given during the second and third trimesters. Chemotherapy is generally avoided during the first trimester and is usually stopped several weeks before delivery. (cancer.org)</p><p class="article-quick-answer__body"><strong>Can radiation therapy be given during pregnancy?</strong> Radiation to the breast is generally postponed until after delivery because radiation can harm the developing fetus. (cancer.gov)</p><p class="article-quick-answer__body"><strong>Can hormone therapy be taken during pregnancy?</strong> Hormone therapy is generally delayed until after delivery because these medicines can affect the fetus. (cancer.org)</p><p class="article-quick-answer__body"><strong>Can HER2-targeted therapy be given during pregnancy?</strong> HER2-targeted medicines such as trastuzumab are generally avoided during pregnancy because of potential fetal harm. (cancer.gov)</p><p class="article-quick-answer__body"><strong>Does breast cancer spread to the baby?</strong> Breast cancer itself does not normally pass from the mother to the fetus. The main concern is choosing cancer treatment that controls the mother's cancer while minimizing risks to the developing baby. (cancer.gov)</p><p class="article-quick-answer__body"><strong>Does pregnancy have to be ended after a breast cancer diagnosis?</strong> Not routinely. The decision is highly individual and depends on the cancer, stage, pregnancy stage and treatment options. Most patients can be treated without automatically ending the pregnancy. (cancer.org)</p><p class="article-quick-answer__body"><strong>Can breast cancer during pregnancy be treated in India?</strong> Yes. Treatment requires coordination between a breast cancer team and a high-risk obstetric team, with treatment timing planned around the pregnancy.</p></aside>`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Being diagnosed with breast cancer is difficult at any time. Being diagnosed while pregnant can make the situation even more complicated. A pregnant woman may naturally notice changes in her breasts during pregnancy. The breasts become larger, more tender and denser, and these normal changes can sometimes make a new lump or other abnormality harder to recognize. (cancer.gov)`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `The good news is that breast cancer can be treated during pregnancy. The treatment plan simply has to account for two patients: the mother and the developing baby. Surgery can generally be performed during pregnancy when needed. Certain [chemotherapy](${CHEMO}) treatments can be given after the first trimester, while treatments such as [radiation therapy](${RAD}), [hormone therapy](${HT}) and most HER2-targeted treatments are generally postponed until after delivery. (cancer.gov)`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `This means that a breast cancer diagnosis during pregnancy does not automatically mean that treatment must wait until the baby is born. Instead, the oncology and obstetric teams work together to decide what needs to happen immediately, what can safely be given during pregnancy and what should wait. This guide supports the [Breast Cancer Treatment in India](${PILLAR}) pathway and the [young women](${YOUNG}) guide.`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask GAF about breast cancer during pregnancy",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 with your records](${wa("Please review my records and advise on breast cancer treatment during pregnancy in India.")})`,
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/pregnancy-consult-visual.webp",
    alt: "Breast cancer diagnosis and treatment during pregnancy with coordinated oncology and obstetric care",
    caption: "Treatment decisions during pregnancy need both oncology and obstetric teams.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Is Pregnancy-Associated Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Breast cancer diagnosed during pregnancy, within one year after giving birth or during lactation is often referred to as pregnancy-associated breast cancer. (cancer.gov) It is uncommon. NCI estimates that breast cancer occurs in approximately 1 in 3,000 pregnancies. (cancer.gov) The exact terminology can vary between studies and clinical settings, so doctors may distinguish between cancer diagnosed during pregnancy and cancer diagnosed after delivery while breastfeeding.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Can Breast Cancer Be Difficult to Detect During Pregnancy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Pregnancy changes the breasts significantly. They become larger, more tender, more glandular, denser and more nodular or lumpy to feel. These changes can make a new abnormality harder to distinguish from normal pregnancy-related changes. (cancer.gov) That does not mean that a new breast lump during pregnancy should simply be attributed to pregnancy. It should be assessed.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Should You Do If You Find a Breast Lump During Pregnancy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Do not wait until after delivery to have it checked. Most breast lumps during pregnancy are not cancer. However, the only way to determine the cause is through appropriate clinical assessment. Your doctor may start with a breast examination and ultrasound. If the finding remains suspicious, further imaging and biopsy may be recommended. Pregnancy should not prevent appropriate investigation of a concerning breast change. See [diagnosis tests](${DIAGNOSIS}).",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Send imaging and pregnancy records for review",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 your imaging](${wa("Please review my breast imaging and pregnancy records and advise whether further tests are needed in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Is Breast Ultrasound Safe During Pregnancy?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/pregnancy-ultrasound-visual.webp",
    alt: "Obstetric ultrasound used alongside breast imaging when cancer is suspected during pregnancy",
    caption: "Ultrasound does not use ionizing radiation and is commonly the first imaging test for a breast change during pregnancy.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. Ultrasound does not use ionizing radiation and is commonly used as the initial imaging test when a breast abnormality is found during pregnancy. (cancer.gov) It can help distinguish solid masses, cysts, normal pregnancy-related changes and areas that need biopsy. The doctor may recommend additional imaging depending on what the ultrasound shows.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can You Have a Mammogram While Pregnant?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Yes, when medically necessary. Mammography uses a relatively small amount of radiation, and appropriate precautions can be taken to minimize fetal exposure. (cancer.gov) Pregnancy is therefore not an absolute reason to avoid mammography when a suspicious breast finding needs to be investigated. The decision should be made by the treating team based on the clinical situation. See [follow-up imaging](${FOLLOW}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Is a Breast Biopsy Safe During Pregnancy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `A breast biopsy can be performed during pregnancy when required. A biopsy is important because imaging alone cannot establish whether a suspicious area is cancer. The tissue can be examined by a pathologist and, if cancer is found, tested for estrogen receptor (ER), progesterone receptor (PR), HER2 and tumor grade. These results help determine the treatment plan. NCI specifically lists biopsy and hormone-receptor testing among the diagnostic procedures used for breast cancer during pregnancy. (cancer.gov) See the [pathology report](${PATH}) explainer.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can MRI Be Used During Pregnancy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "MRI may sometimes be used when additional information is needed. However, the decision about MRI during pregnancy is more complicated than simply ordering it as routine breast imaging. In particular, the use of contrast agents requires careful consideration. NCI notes that MRI without contrast may be used in selected circumstances during pregnancy, while gadolinium crosses the placenta and is generally avoided unless there is a strong clinical reason. (cancer.gov) Your radiologist and oncology team should determine whether MRI is appropriate.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Happens If the Biopsy Confirms Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Once breast cancer is confirmed, the next step is determining the type of breast cancer, the tumor size, lymph-node involvement, whether there is distant spread, ER status, PR status, HER2 status and the stage of pregnancy. The pregnancy itself does not change the biological characteristics of the tumor. But it changes which treatments can safely be given and when. See [ER, PR and HER2](${ERPR}) and [stages](${STAGES}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does Pregnancy Make Breast Cancer More Aggressive?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "This question is more complicated than it first appears. Pregnancy can make breast cancer harder to detect, which may contribute to diagnosis at a later stage. Research comparing outcomes of pregnant and non-pregnant patients has produced mixed results. Some studies find similar outcomes when cancers are compared at the same stage, while other research has reported differences. (cancer.gov) It is therefore more useful to focus on the individual's stage, tumor biology, response to treatment and overall health rather than assuming pregnancy itself determines the outcome.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Breast Cancer Surgery Be Performed During Pregnancy?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/pregnancy-followup-visual.webp",
    alt: "Surgical and obstetric teams planning breast cancer surgery during pregnancy",
    caption: "Surgery is generally possible during pregnancy when the surgical, anaesthetic and obstetric teams plan together.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Yes. Surgery is an important part of treatment for many pregnant patients with early breast cancer. The operation may involve lumpectomy, mastectomy or lymph-node surgery. The choice depends on the cancer and the stage of pregnancy. (cancer.gov) The surgical plan also has to account for anesthesia and obstetric monitoring. See [breast cancer surgery](${SURGERY}) and [lumpectomy versus mastectomy](${LUMP}).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask about surgery timing during pregnancy",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 about surgery](${wa("Please advise on the safest timing for breast cancer surgery during pregnancy in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Is Anesthesia Safe During Pregnancy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Modern anesthesia can be used during pregnancy when surgery is medically necessary. However, pregnancy changes how the body responds to anesthesia and surgery. The surgical team may therefore work with a breast surgeon or surgical oncologist, an anesthesiologist, an obstetrician and a maternal-fetal medicine specialist. The timing of surgery and the medications used are selected with both the mother's and baby's safety in mind. (cancer.org)",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Lumpectomy or Mastectomy During Pregnancy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Both procedures may be considered. However, the timing of pregnancy can influence the decision. [Radiation therapy](${RAD}) is generally postponed until after delivery. Because radiation is commonly part of treatment after lumpectomy, some patients diagnosed earlier in pregnancy may instead be advised to undergo mastectomy to avoid delaying necessary radiation for too long. (cancer.gov) This does not mean that mastectomy is automatically required during pregnancy. The decision depends on the cancer, timing, available treatment options and the patient's circumstances.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Sentinel Lymph Node Biopsy Be Performed During Pregnancy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Lymph-node evaluation may be needed because breast cancer can spread to lymph nodes. The approach during pregnancy requires additional consideration. NCI notes that evidence regarding sentinel lymph-node biopsy during pregnancy is limited, while the American Cancer Society describes circumstances in which sentinel-node biopsy may be considered with specific techniques. (cancer.gov; cancer.org) The blue dye sometimes used in sentinel-node mapping is generally avoided during pregnancy. The exact lymph-node procedure should therefore be decided by the breast surgical team in consultation with the obstetric team.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Chemotherapy Be Given During Pregnancy?",
  },
  {
    id: id("img"),
    type: "image",
    src: "/uploads/articles/pregnancy-infusion-visual.webp",
    alt: "Chemotherapy infusion planned after the first trimester for a pregnant woman with breast cancer",
    caption: "Certain chemotherapy regimens can be used in the second and third trimesters and are usually stopped several weeks before delivery.",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Yes, but timing is critical. Chemotherapy is generally not given during the first trimester because this is a major period of fetal development. (cancer.org) Certain chemotherapy regimens can be used during the second and third trimesters. NCI notes that early-stage breast cancer during pregnancy may be treated with chemotherapy after the first trimester when indicated. (cancer.gov) The specific drugs and schedule must be selected by the oncology team. See [chemotherapy](${CHEMO}) and [side effects](${CHEMO_SE}).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask whether chemotherapy can start this trimester",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 about chemotherapy](${wa("Please advise whether chemotherapy can be given during my pregnancy and which regimen may be considered in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Is Chemotherapy Avoided During the First Trimester?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "During the first trimester, the developing fetus undergoes major organ formation. Exposure to certain chemotherapy medicines during this period can increase the risk of developmental problems and pregnancy loss. For that reason, if chemotherapy is necessary, doctors generally plan it after the first trimester when possible. (cancer.org) This is one of the situations where treatment timing becomes especially important.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Happens If Breast Cancer Is Diagnosed in the First Trimester?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "This can be one of the most difficult situations. The medical team has to consider cancer stage, tumor biology, how quickly treatment needs to begin, the type of treatment required, gestational age, available treatment alternatives and the patient's wishes. Surgery may still be possible. Chemotherapy may need to be delayed until the second trimester. Treatments that are not considered safe during pregnancy may need to wait until after delivery. For aggressive or advanced cancers where immediate treatment is critical, the medical team will discuss all available options with the patient.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Radiation Therapy Be Given During Pregnancy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Breast radiation is generally postponed until after delivery. Radiation involves ionizing radiation, and therapeutic doses can expose the developing fetus to potentially harmful radiation. (cancer.gov) This can create an important treatment-planning issue. For example, a patient who normally would have lumpectomy followed by radiation may need a different surgical approach depending on how far along the pregnancy is. See [radiation therapy](${RAD}) and [radiation side effects](${RAD_SE}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Happens to Radiation After Delivery?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "If radiation was postponed during pregnancy, it can generally be incorporated into treatment after delivery when it remains indicated. The timing depends on surgery, wound healing, chemotherapy, delivery, cancer stage and the overall treatment plan. The oncology team will establish the sequence.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Hormone Therapy Be Given During Pregnancy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `Generally, no. If the breast cancer is ER-positive or PR-positive, hormone therapy may be an important part of treatment. But hormone therapy is generally delayed until after delivery because these medicines can affect the fetus. (cancer.gov) For example, tamoxifen is not considered appropriate during pregnancy. The treatment can be started after delivery when the medical team determines that it is appropriate. See [hormone therapy](${HT}) and [side effects](${HT_SE}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What About HER2-Targeted Therapy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `HER2-targeted medicines are generally not used during pregnancy. Trastuzumab, for example, has been associated with fetal complications, particularly involving the developing kidneys and amniotic fluid. (cancer.org) Other HER2-directed medicines are also generally avoided. This means that a patient with HER2-positive breast cancer may receive some components of treatment during pregnancy while postponing HER2-directed therapy until after delivery. The exact sequence depends on the cancer and gestational age. See [HER2-positive treatment](${HER2}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Immunotherapy Be Given During Pregnancy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Immunotherapy is generally avoided during pregnancy. There is limited evidence about the safety of immune checkpoint inhibitors during pregnancy, and there are concerns about the effect of altering the maternal immune system on pregnancy. (cancer.org) If immunotherapy would ordinarily form part of treatment, the oncology team has to determine whether it can safely be postponed or whether the clinical situation requires a different approach.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Targeted Therapy Be Given During Pregnancy?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Most targeted breast cancer treatments are not routinely given during pregnancy. This includes many HER2-targeted medicines and other targeted therapies. The reason is that these medicines can affect fetal development, and safety data during pregnancy are limited. (cancer.org) Targeted therapy can often be introduced after delivery when medically appropriate.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can a Pregnant Woman Continue Breastfeeding During Cancer Treatment?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Usually not. Many chemotherapy, hormone and targeted medicines can pass into breast milk and potentially harm the baby. Therefore, breastfeeding is generally not recommended while receiving these systemic cancer treatments. (cancer.org) If cancer is diagnosed after delivery while the mother is breastfeeding, the treatment team will explain when breastfeeding needs to stop.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What If Breast Cancer Is Diagnosed While Breastfeeding?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The situation is slightly different from breast cancer diagnosed during pregnancy. The baby is no longer exposed through the placenta, but some cancer medicines can enter breast milk. Diagnostic imaging and biopsy can still be performed when necessary. The treatment plan will determine whether breastfeeding can continue. If chemotherapy, hormone therapy or targeted treatment is required, breastfeeding will generally need to stop. (cancer.gov)",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does the Baby Have Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "No. Breast cancer does not normally pass from a pregnant mother to her fetus. The main medical concern is the effect that cancer treatment may have on fetal development. (cancer.gov) This distinction is important because patients sometimes worry that the cancer itself will spread directly to the baby. That is not how breast cancer normally behaves.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does a Breast Cancer Diagnosis Mean the Pregnancy Must End?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Not routinely. A breast cancer diagnosis does not automatically require termination of pregnancy. Many patients can receive surgery and, when appropriate, chemotherapy during pregnancy while postponing treatments that are unsafe for the fetus. (cancer.org) However, there can be exceptional circumstances. For example, a patient with a very aggressive or advanced cancer diagnosed very early in pregnancy may face a situation where the safest cancer treatment cannot be given while continuing the pregnancy. In such cases, the decision requires detailed discussion between the patient and her medical team. It is not a decision that can be made from the diagnosis alone.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does Ending the Pregnancy Improve Breast Cancer Survival?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Available evidence does not support ending a pregnancy as a routine strategy to improve breast cancer outcomes. NCI and the American Cancer Society both note that pregnancy termination does not generally improve prognosis. (cancer.gov; cancer.org) There can, however, be exceptional cases where treatment needs create a serious conflict between maternal cancer care and continuation of pregnancy. Those situations require individualized medical and ethical discussion.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Does Pregnancy Make Breast Cancer Treatment Less Effective?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The goal of treatment remains the same: control or eliminate the cancer while protecting the pregnancy as much as medically possible. Some treatments may need to be delayed. Others can be given during pregnancy. Therefore, the treatment plan may look different from that of a non-pregnant patient with the same diagnosis. The stage and biological characteristics of the cancer remain central to deciding treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Specialists Are Needed?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Breast cancer during pregnancy requires more coordination than ordinary breast cancer care. The team may include a breast surgeon or surgical oncologist, medical oncologist, radiation oncologist, high-risk obstetrician, maternal-fetal medicine specialist, breast radiologist, pathologist, anesthesiologist and a neonatal team when appropriate. The oncologist and obstetric team need to communicate throughout treatment.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Why Is a High-Risk Obstetric Team Important?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The pregnancy needs its own monitoring while cancer treatment is taking place. The obstetric team can assess fetal growth, pregnancy development, timing of delivery, maternal health, potential effects of treatment and medication-related risks. This does not replace the oncology team. Both teams are necessary.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can a Baby Be Delivered Early Because of Breast Cancer?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Sometimes. The decision depends on gestational age, the cancer treatment schedule, the mother's condition, fetal development, planned chemotherapy and the overall urgency of cancer treatment. Chemotherapy is generally avoided close to delivery because it can affect blood counts and increase complications around childbirth. (cancer.org) The obstetric and oncology teams coordinate the timing.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can Breast Cancer Treatment Affect Fertility?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `It can. Chemotherapy and some hormone-related treatments can affect ovarian function and future fertility. Because pregnancy itself is already ongoing, fertility preservation before treatment is obviously different from the situation faced by someone who has not yet conceived. For patients who want more children after completing treatment, fertility and reproductive planning should still be discussed early. The important point is that this conversation should happen before treatment begins whenever possible. See [breast cancer in young women](${YOUNG}).`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Breast Cancer During Pregnancy Treatment in India",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "India has cancer centres capable of treating breast cancer in pregnant patients, but this is a situation where choosing a hospital based only on the availability of a breast surgeon is not enough. The hospital should be able to coordinate oncology and obstetric care. For an international patient, it is useful to ask whether the hospital has access to medical oncology, surgical oncology, radiation oncology, breast imaging, pathology, high-risk obstetrics, maternal-fetal medicine and neonatal care. This multidisciplinary setup is important because treatment decisions can change as the pregnancy progresses. Teams in [Delhi NCR](/doctors/India/Delhi-NCR), [Mumbai](/doctors/India/Mumbai), [Bengaluru](/doctors/India/Bengaluru), [Chennai](/doctors/India/Chennai) and [Hyderabad](/doctors/India/Hyderabad) can coordinate oncology and high-risk obstetric consultations.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Should International Patients Do Before Traveling to India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `If you have been diagnosed with breast cancer during pregnancy and are considering treatment in India, send your medical records before traveling whenever possible. Useful documents include the biopsy and pathology reports, ER, PR and HER2 results, mammogram, ultrasound, MRI if performed, CT or PET reports if any, current pregnancy records, obstetric ultrasound reports, current medications and previous medical opinions. The Indian oncology team can then review the case before you travel. This can be particularly helpful when the treatment sequence needs to be planned around a specific gestational age. See the [international-patient guide](${INTL}). Hospitals in [Delhi NCR](/hospitals/India/Delhi-NCR) and [Mumbai](/hospitals/India/Mumbai) can arrange oncology and obstetric visits before the first treatment.`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Can International Patients Continue Pregnancy Care in Their Home Country?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "Yes. A patient may receive cancer treatment in India while continuing certain aspects of pregnancy care with an obstetrician in her home country. However, communication between the teams is essential. Before traveling, establish who will manage the pregnancy, who will manage the cancer, where delivery is expected to occur, when the patient needs to return to India, which treatments are planned before delivery and which treatments will be postponed until after delivery.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How Much Does Breast Cancer Treatment During Pregnancy Cost in India?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `There is no fixed cost. The pregnancy adds another layer of medical care, so expenses can include both cancer treatment and obstetric monitoring. Potential costs include breast imaging, biopsy, pathology, cancer consultations, surgery, chemotherapy, obstetric monitoring, hospitalization, radiation after delivery, hormone therapy after delivery, targeted therapy after delivery, and delivery and neonatal care. The final cost depends heavily on the cancer stage, subtype, trimester and treatment sequence. For this reason, an individual treatment quotation should be prepared after the medical records have been reviewed. See the [cost guide](${COST}) and the [Breast Cancer Treatment in India](${PILLAR}) page.`,
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[Breast-conserving surgery doctors](${BCS_DOCTORS}) · [cost](${BCS_COST}) · [mastectomy doctors](${MAST_DOCTORS}) · [cost](${MAST_COST}) · [chemotherapy](${CHEMO_DOCTORS}) · [cost](${CHEMO_COST}) · [hormone therapy](${HT_DOCTORS}) · [cost](${HT_COST}) · [targeted therapy](${TARGETED_DOCTORS}) · [cost](${TARGETED_COST}) · [immunotherapy](${IMMUNO_DOCTORS}) · [cost](${IMMUNO_COST}).`,
  },
  {
    id: id("btn"),
    type: "button",
    label: "Request a pregnancy-coordinated treatment estimate",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 for a cost estimate](${wa("Please share a treatment estimate for breast cancer during pregnancy in India, including oncology and obstetric care.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "What Questions Should You Ask Your Doctors?",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A breast cancer diagnosis during pregnancy creates many decisions at once. Before starting treatment, consider asking about the type and stage of cancer, whether it is ER-positive, PR-positive or HER2-positive, and whether it has spread to lymph nodes or elsewhere. Ask how many weeks pregnant you are, which treatments can be given now, which need to wait, and how the pregnancy will be monitored. Ask whether you need lumpectomy or mastectomy, whether lymph nodes need to be evaluated, and when surgery is safest. Ask whether chemotherapy is needed, whether it can start during pregnancy, which medicines are being considered, and when chemotherapy would stop before delivery. Ask whether treatment will change the expected delivery date, where delivery should take place, and whether a neonatal team needs to be available. After delivery, ask when radiation, hormone therapy or targeted therapy can begin, and whether breastfeeding is possible. Having these answers in writing can make an extremely stressful situation easier to manage.",
  },
  {
    id: id("btn"),
    type: "button",
    label: "Ask GAF to prepare a written treatment sequence",
    href: consult("Breast Cancer Treatment in India"),
  },
  {
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 your questions](${wa("Please help me prepare a written treatment sequence for breast cancer during pregnancy in India.")})`,
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "How GAF Healthcare Can Help",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "GAF Healthcare can help an international patient send pathology, imaging and pregnancy records for review before travel, then coordinate a breast cancer team with a high-risk obstetric or maternal-fetal medicine team in India. The useful output is a written sequence: what can start now, what must wait until after delivery, and where delivery should be planned.",
  },
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Frequently Asked Questions",
  },
  ...[
    [
      "Can a woman have breast cancer while pregnant?",
      "Yes. Breast cancer is uncommon during pregnancy but can occur. NCI estimates approximately one case per 3,000 pregnancies. (cancer.gov)",
    ],
    [
      "Can breast cancer be treated while pregnant?",
      "Yes. Surgery is generally possible, and certain chemotherapy can be given after the first trimester. Some other treatments are postponed until after delivery. (cancer.gov)",
    ],
    [
      "Is breast ultrasound safe during pregnancy?",
      "Yes. Ultrasound does not use ionizing radiation and is commonly used to investigate a breast lump during pregnancy. (cancer.gov)",
    ],
    [
      "Can a pregnant woman have a mammogram?",
      "Yes, when medically necessary. Mammography uses a small amount of radiation, and precautions can be taken to minimize fetal exposure. (cancer.gov)",
    ],
    [
      "Can a breast biopsy be performed during pregnancy?",
      "Yes. Biopsy is an important part of diagnosing suspicious breast changes during pregnancy. (cancer.gov)",
    ],
    [
      "Can chemotherapy be given during pregnancy?",
      "Certain chemotherapy can be given during the second and third trimesters. It is generally avoided during the first trimester. (cancer.org)",
    ],
    [
      "Can radiation therapy be given during pregnancy?",
      "Breast radiation is generally delayed until after delivery because therapeutic radiation can harm the developing fetus. (cancer.gov)",
    ],
    [
      "Can hormone therapy be given during pregnancy?",
      "Usually not. Hormone therapy is generally postponed until after delivery. (cancer.gov)",
    ],
    [
      "Can HER2-positive breast cancer be treated during pregnancy?",
      "Some components of treatment can be given, but HER2-targeted therapies such as trastuzumab are generally avoided during pregnancy and may be started after delivery when appropriate. (cancer.org)",
    ],
    [
      "Does breast cancer spread to the unborn baby?",
      "Breast cancer itself does not normally pass from the mother to the fetus. Treatment safety is the major concern during pregnancy. (cancer.gov)",
    ],
    [
      "Does a woman have to terminate her pregnancy if she develops breast cancer?",
      "No. Pregnancy termination is not routinely required. Treatment can often be adapted to the stage of pregnancy. Exceptional situations involving aggressive or advanced disease require individualized discussion. (cancer.org)",
    ],
    [
      "Can breast cancer treatment affect the baby?",
      "Some treatments can affect fetal development, which is why treatment selection and timing are carefully planned. Surgery and certain chemotherapy can be used during pregnancy, while radiation, hormone therapy and many targeted treatments are generally delayed. (cancer.gov)",
    ],
    [
      "Can I breastfeed while receiving chemotherapy?",
      "Breastfeeding is generally not recommended during chemotherapy because medicines can pass into breast milk and potentially harm the baby. (cancer.org)",
    ],
    [
      "Can breast cancer during pregnancy be treated in India?",
      "Yes. Treatment should be coordinated between a multidisciplinary breast cancer team and a high-risk obstetric or maternal-fetal medicine team.",
    ],
  ].flatMap(([q, a]) => [
    { id: id("h"), type: "heading", level: 3, text: q },
    { id: id("p"), type: "paragraph", text: a },
  ]),
  {
    id: id("h"),
    type: "heading",
    level: 2,
    text: "Final Takeaway",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "A breast cancer diagnosis during pregnancy is complicated, but pregnancy does not mean that cancer treatment has to stop. The first priority is establishing an accurate diagnosis and understanding the cancer's stage and biology. After that, the treatment team has to decide what can be done immediately and what should wait until after delivery. Surgery can generally be performed during pregnancy when necessary. Certain chemotherapy can be given after the first trimester. Radiation therapy, hormone therapy and many targeted treatments are generally postponed until after delivery. (cancer.gov)",
  },
  {
    id: id("p"),
    type: "paragraph",
    text: "The treatment plan therefore depends on more than the cancer diagnosis alone. It depends on the type and stage of breast cancer, the trimester of pregnancy, the baby's development, the mother's health and the treatments required. For an international patient considering treatment in India, the most useful step is to have the pathology, imaging and pregnancy records reviewed before travel. The ideal setup is a coordinated team involving medical oncology, surgical oncology, radiation oncology and high-risk obstetric care. That allows the cancer and pregnancy to be managed together rather than treating them as two completely separate problems.",
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
    text: `[WhatsApp +91 90443 46292 to plan the next step](${wa("Please help me plan breast cancer treatment during pregnancy in India.")})`,
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
    text: `- [Breast Cancer Treatment in India](${PILLAR})\n- [Young women](${YOUNG}) · [pathology report](${PATH})\n- [Surgery](${SURGERY}) · [lumpectomy vs mastectomy](${LUMP})\n- [Chemotherapy](${CHEMO}) · [hormone therapy](${HT}) · [HER2-positive](${HER2})\n- [Breast-conserving surgery doctors](${BCS_DOCTORS})\n- [Mastectomy doctors](${MAST_DOCTORS}) · [chemotherapy doctors](${CHEMO_DOCTORS})\n- [International patients](${INTL}) · [cost guide](${COST})`,
  },
];

const now = "2026-09-28T02:30:00.000Z";
const SLUG = "breast-cancer-during-pregnancy-treatment-india";
const HREF = `/blogs/${SLUG}`;

const article = {
  id: "art_breast_cancer_during_pregnancy_treatment_india",
  slug: SLUG,
  title: "Breast Cancer During Pregnancy: Diagnosis, Treatment, Safety and Options in India",
  excerpt:
    "How breast cancer can be diagnosed and treated during pregnancy in India, including which treatments can wait, which can proceed, and how obstetrics and oncology coordinate.",
  date: "28 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Medical Oncology",
  tags: ["breast cancer", "pregnancy", "fertility", "India", "travel"],
  image: "/uploads/articles/pregnancy-consult-visual.webp",
  imageAlt:
    "Breast cancer diagnosis and treatment during pregnancy with coordinated oncology and obstetric care",
  status: "published",
  featured: true,
  seoTitle: "Breast Cancer During Pregnancy | Treatment & Safety in India",
  seoDescription:
    "Learn about breast cancer during pregnancy, including diagnosis, surgery, chemotherapy, radiation, targeted therapy, delivery and treatment options in India.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/pregnancy-consult-visual.webp",
  allowIndex: true,
  keywords: [
    "breast cancer during pregnancy",
    "breast cancer treatment during pregnancy",
    "pregnancy-associated breast cancer",
    "breast cancer while pregnant",
    "breast cancer diagnosis during pregnancy",
    "chemotherapy during pregnancy breast cancer",
    "breast cancer surgery during pregnancy",
    "breast cancer radiation during pregnancy",
    "breast cancer treatment in India during pregnancy",
    "HER2 positive breast cancer during pregnancy",
    "hormone receptor positive breast cancer during pregnancy",
    "breast cancer and pregnancy",
    "breast cancer during pregnancy treatment cost India",
    "breast cancer in pregnant women",
    "breast cancer treatment for international patients",
  ],
  relatedLinks: [
    { label: "Breast Cancer Treatment in India", href: PILLAR },
    { label: "Young women", href: YOUNG },
    { label: "Chemotherapy side effects", href: CHEMO_SE },
    { label: "International patients", href: INTL },
    { label: "Cost guide", href: COST },
  ],
  blocks,
};

if (!store.categories.includes("Medical Oncology")) store.categories.push("Medical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}

const index = store.articles.findIndex((row) => row.id === article.id || row.slug === SLUG);
if (index >= 0) store.articles[index] = article;
else store.articles.unshift(article);

for (const siblingId of [
  "art_breast_cancer_in_young_women_treatment_india",
  "art_breast_cancer_chemotherapy_side_effects",
]) {
  const sibling = store.articles.find((row) => row.id === siblingId);
  if (!sibling) continue;
  sibling.relatedLinks ??= [];
  if (!sibling.relatedLinks.some((link) => link.href === HREF)) {
    sibling.relatedLinks.splice(1, 0, { label: "Breast cancer during pregnancy", href: HREF });
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length);
