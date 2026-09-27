import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));
const sources = JSON.parse(readFileSync("/tmp/queued-blogs.json", "utf8"));

const consult = (treatment) =>
  `/consult?treatment=${encodeURIComponent(treatment)}`;
const wa = (message) =>
  `https://wa.me/919044346292?text=${encodeURIComponent(message)}`;

const PILLAR = "/treatments/breast-cancer-treatment-in-india";
const LINKS = {
  hormone: "/blogs/hormone-therapy-breast-cancer-india",
  hormoneSe: "/blogs/breast-cancer-hormone-therapy-side-effects",
  chemo: "/blogs/chemotherapy-for-breast-cancer-in-india",
  chemoSe: "/blogs/breast-cancer-chemotherapy-side-effects",
  targetedSe: "/blogs/breast-cancer-targeted-therapy-side-effects",
  radiation: "/blogs/radiation-therapy-for-breast-cancer",
  surgery: "/blogs/breast-cancer-surgery-in-india",
  lumpectomy: "/blogs/lumpectomy-vs-mastectomy",
  reconstruction: "/blogs/breast-reconstruction-after-mastectomy-india",
  diagnosis: "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2",
  biomarkers: "/blogs/er-pr-her2-breast-cancer-treatment-india",
  her2: "/blogs/her2-positive-breast-cancer-treatment-india",
  intl: "/blogs/breast-cancer-treatment-india-international-patients",
  cost: "/blogs/breast-cancer-treatment-cost-in-india",
  byStage: "/blogs/breast-cancer-treatment-by-stage",
  radiationDoctors: "/doctors/India/Radiation-Oncology",
  chemoDoctors: "/doctors/India/Medical-Oncology/Chemotherapy",
  hormoneDoctors: "/doctors/India/Medical-Oncology/Hormone-Therapy",
  targetedDoctors: "/doctors/India/Medical-Oncology/Targeted-Therapy",
  immunoDoctors: "/doctors/India/Medical-Oncology/Immunotherapy",
  bcsDoctors: "/doctors/India/Surgical-Oncology/Breast-Conserving-Surgery",
  mastDoctors: "/doctors/India/Surgical-Oncology/Mastectomy",
  reconDoctors: "/doctors/India/Surgical-Oncology/Breast-Reconstruction",
  radiationCost: "/costs/India/Radiation-Oncology",
  chemoCost: "/costs/India/Medical-Oncology/Chemotherapy",
  hormoneCost: "/costs/India/Medical-Oncology/Hormone-Therapy",
  targetedCost: "/costs/India/Medical-Oncology/Targeted-Therapy",
  delhiD: "/doctors/India/Delhi-NCR",
  mumbaiD: "/doctors/India/Mumbai",
  delhiH: "/hospitals/India/Delhi-NCR",
  mumbaiH: "/hospitals/India/Mumbai",
};

const grab = (text, label) => {
  const match = text.match(new RegExp(`${label}:\\s*\\n(.+)`));
  return match?.[1]?.trim() ?? "";
};

const splitSeo = (raw) => {
  const idx = raw.search(/\nSEO Details\n/);
  const relatedIdx = raw.search(/\nRelated GAF Healthcare Resources\n/);
  const cut = relatedIdx >= 0 ? relatedIdx : idx;
  return {
    body: cut >= 0 ? raw.slice(0, cut).trim() : raw.trim(),
    seo: idx >= 0 ? raw.slice(idx) : "",
  };
};

const parseQuickAnswers = (body) => {
  const start = body.search(/\nQuick Answer Box\n/);
  if (start < 0) return { intro: body, answers: [], rest: "" };
  const after = body.slice(start + "\nQuick Answer Box\n".length);
  const lines = after.split("\n");
  const answers = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i += 1;
      continue;
    }
    if (!line.endsWith("?")) break;
    const question = line;
    i += 1;
    const parts = [];
    while (i < lines.length) {
      const next = lines[i].trim();
      if (!next) {
        i += 1;
        if (parts.length) break;
        continue;
      }
      if (next.endsWith("?") && next.length < 160 && parts.length) break;
      if (
        parts.length &&
        next.length < 90 &&
        !next.endsWith(".") &&
        !next.endsWith(")") &&
        /^[A-Z]/.test(next)
      ) {
        break;
      }
      parts.push(next);
      i += 1;
    }
    if (parts.length) answers.push({ q: question, a: parts.join(" ") });
  }
  const rest = lines.slice(i).join("\n").trim();
  const intro = body.slice(0, start).trim();
  return { intro, answers, rest };
};

const isHeading = (block) => {
  const text = block.trim();
  if (!text || text.includes("\n")) return false;
  if (text.length > 110) return false;
  if (/^[-*] /.test(text)) return false;
  if (/^Feature\t/.test(text)) return false;
  if (text.endsWith(".") || text.endsWith(")")) return false;
  return true;
};

const toParagraphs = (raw) => {
  const chunks = raw
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);
  const blocks = [];
  for (const chunk of chunks) {
    const lines = chunk.split("\n").map((line) => line.trim()).filter(Boolean);
    if (lines.length === 1 && isHeading(lines[0])) {
      const text = lines[0].replace(/^\d+\.\s+/, "");
      blocks.push({ type: "heading", level: text.endsWith("?") ? 3 : 2, text });
      continue;
    }
    if (lines.length > 2 && lines.every((line) => line.length < 70 && !line.endsWith("."))) {
      blocks.push({ type: "list", style: "ul", items: lines });
      continue;
    }
    blocks.push({ type: "paragraph", text: lines.join(" ") });
  }
  return blocks;
};

const enrich = (text, extras) => {
  let out = text;
  for (const [needle, href] of extras) {
    if (out.includes(href)) continue;
    const re = new RegExp(`\\b${needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`);
    if (re.test(out)) out = out.replace(re, `[${needle}](${href})`);
  }
  return out;
};

const configs = [
  {
    id: "art_breast_cancer_radiation_side_effects",
    slug: "breast-cancer-radiation-side-effects",
    publishedAt: "2026-09-27T22:30:00.000Z",
    treatment: "Radiation Therapy",
    category: "Radiation Oncology",
    tags: ["breast cancer", "radiation", "side effects", "lymphedema", "India", "travel"],
    excerpt:
      "What skin changes, fatigue, swelling, lymphedema and uncommon heart or lung effects can look like during breast radiation — and how international patients plan recovery in India.",
    images: [
      ["radiation-side-effects-planning-visual.webp", "Breast cancer radiation therapy side effects including skin changes fatigue swelling and recovery", "Radiation is a local treatment. The session itself is generally painless; side effects develop gradually."],
      ["radiation-side-effects-skin-visual.webp", "Gentle skin care during breast cancer radiation therapy", "Treated skin may become red, darker, dry or irritated. Use only products your radiation team recommends."],
      ["radiation-side-effects-fatigue-visual.webp", "Fatigue and daily walking during breast cancer radiation", "Fatigue commonly increases during treatment and usually improves afterward, although recovery varies."],
      ["radiation-side-effects-followup-visual.webp", "Shoulder mobility check after breast cancer radiation", "Tell the radiation team about severe skin reactions, swelling, persistent cough or new arm heaviness."],
    ],
    waOpen: "Please review my records and advise on breast cancer radiation side effects and recovery in India.",
    waMid: "Please advise how to manage radiation skin changes, fatigue or swelling during treatment in India.",
    waRecords: "I would like to send my pathology and radiation records for review before travelling to India.",
    waClose: "Please help me plan radiation therapy and side-effect support for breast cancer in India.",
    related: [
      { label: "Breast Cancer Treatment in India", href: PILLAR },
      { label: "Radiation therapy for breast cancer", href: LINKS.radiation },
      { label: "Radiation oncology doctors", href: LINKS.radiationDoctors },
      { label: "Surgery in India", href: LINKS.surgery },
      { label: "International patients", href: LINKS.intl },
    ],
    siblings: ["art_radiation_therapy_for_breast_cancer", "art_breast_cancer_surgery_in_india", "art_lumpectomy_vs_mastectomy"],
  },
  {
    id: "art_breast_cancer_follow_up_tests",
    slug: "breast-cancer-follow-up-tests",
    publishedAt: "2026-09-27T23:00:00.000Z",
    treatment: "Breast Cancer Treatment in India",
    category: "Medical Oncology",
    tags: ["breast cancer", "follow-up", "mammogram", "surveillance", "India", "travel"],
    excerpt:
      "Which mammograms, MRI, PET-CT, CT and blood tests are used after breast cancer treatment — and why more scanning is not automatically better follow-up.",
    images: [
      ["followup-tests-mammogram-visual.webp", "Breast cancer follow-up tests including mammogram MRI PET CT and blood tests after treatment", "If breast tissue remains, mammography is usually part of surveillance after treatment."],
      ["followup-tests-consult-visual.webp", "Oncology follow-up visit after breast cancer treatment", "A follow-up visit is a broader assessment of health after treatment, not simply a cancer scan."],
      ["followup-tests-mri-visual.webp", "Breast MRI used selectively after breast cancer treatment", "MRI is not automatically required for every survivor. It is used when it answers a specific question."],
      ["followup-tests-blood-visual.webp", "Blood tests during breast cancer follow-up when clinically indicated", "Routine blood tests are not generally the main surveillance method for asymptomatic early-stage patients."],
    ],
    waOpen: "Please review my records and advise on breast cancer follow-up tests after treatment in India.",
    waMid: "Do I need mammogram, MRI or PET-CT for follow-up after breast cancer treatment?",
    waRecords: "I would like to send my pathology and imaging for a follow-up plan in India.",
    waClose: "Please help me plan breast cancer follow-up and survivorship care in India.",
    related: [
      { label: "Breast Cancer Treatment in India", href: PILLAR },
      { label: "Diagnosis and biopsy", href: LINKS.diagnosis },
      { label: "Hormone therapy side effects", href: LINKS.hormoneSe },
      { label: "International patients", href: LINKS.intl },
    ],
    siblings: ["art_breast_cancer_diagnosis_tests_biopsy_er_pr_her2", "art_breast_cancer_hormone_therapy_side_effects"],
  },
  {
    id: "art_breast_cancer_neoadjuvant_therapy",
    slug: "breast-cancer-neoadjuvant-therapy",
    publishedAt: "2026-09-27T23:30:00.000Z",
    treatment: "Chemotherapy",
    category: "Medical Oncology",
    tags: ["breast cancer", "neoadjuvant", "chemotherapy", "surgery", "India", "travel"],
    excerpt:
      "How chemotherapy, targeted therapy or immunotherapy before surgery can shrink a tumour, guide later treatment and change the surgical plan in India.",
    images: [
      ["neoadjuvant-infusion-visual.webp", "Neoadjuvant breast cancer treatment before surgery showing chemotherapy and tumor response", "Neoadjuvant therapy is given before surgery so doctors can see how the cancer responds."],
      ["neoadjuvant-consult-visual.webp", "Multidisciplinary planning for neoadjuvant breast cancer treatment", "The plan depends on subtype, stage, biomarkers and whether breast-conserving surgery is a goal."],
      ["neoadjuvant-imaging-visual.webp", "Response imaging during neoadjuvant breast cancer therapy", "Imaging during treatment helps the team decide whether surgery can be less extensive."],
      ["neoadjuvant-recovery-visual.webp", "Follow-up after neoadjuvant therapy and before breast cancer surgery", "International patients should plan enough time in India for cycles, imaging and the operation."],
    ],
    waOpen: "Please review my records and advise whether neoadjuvant therapy before surgery is appropriate in India.",
    waMid: "Please advise on chemotherapy or targeted therapy before breast cancer surgery in India.",
    waRecords: "I would like to send my pathology and imaging for a neoadjuvant treatment plan in India.",
    waClose: "Please help me plan treatment before breast cancer surgery in India.",
    related: [
      { label: "Breast Cancer Treatment in India", href: PILLAR },
      { label: "Chemotherapy", href: LINKS.chemo },
      { label: "Surgery in India", href: LINKS.surgery },
      { label: "HER2-positive treatment", href: LINKS.her2 },
    ],
    siblings: ["art_chemotherapy_for_breast_cancer_in_india", "art_breast_cancer_surgery_in_india"],
  },
  {
    id: "art_breast_cancer_lymphedema",
    slug: "breast-cancer-lymphedema",
    publishedAt: "2026-09-28T00:00:00.000Z",
    treatment: "Breast Cancer Treatment in India",
    category: "Surgical Oncology",
    tags: ["breast cancer", "lymphedema", "rehabilitation", "India", "travel"],
    excerpt:
      "Why arm or chest swelling can occur after lymph-node surgery or radiation, how to recognise it early, and which prevention and treatment options are used in India.",
    images: [
      ["lymphedema-measure-visual.webp", "Lymphedema after breast cancer treatment showing arm swelling and lymphatic drainage", "Early measurement and recognition make lymphedema easier to manage."],
      ["lymphedema-physio-visual.webp", "Guided arm exercises after breast cancer lymph-node treatment", "Gentle movement and rehabilitation help maintain shoulder mobility and lymphatic flow."],
      ["lymphedema-compression-visual.webp", "Compression sleeve fitting for breast cancer–related lymphedema", "Compression and specialist physiotherapy are common treatments when swelling develops."],
      ["lymphedema-consult-visual.webp", "Lymphedema consult after breast cancer surgery or radiation", "Report new heaviness, tightness or arm swelling rather than waiting for the next appointment."],
    ],
    waOpen: "Please review my records and advise on lymphedema risk and treatment after breast cancer in India.",
    waMid: "Please advise on prevention and treatment of arm swelling after breast cancer surgery.",
    waRecords: "I would like to send my surgery and radiation records for a lymphedema plan in India.",
    waClose: "Please help me plan lymphedema care after breast cancer treatment in India.",
    related: [
      { label: "Breast Cancer Treatment in India", href: PILLAR },
      { label: "Surgery in India", href: LINKS.surgery },
      { label: "Radiation therapy", href: LINKS.radiation },
      { label: "International patients", href: LINKS.intl },
    ],
    siblings: ["art_breast_cancer_surgery_in_india", "art_radiation_therapy_for_breast_cancer"],
  },
  {
    id: "art_breast_cancer_pathology_report_explained",
    slug: "breast-cancer-pathology-report-explained",
    publishedAt: "2026-09-28T00:30:00.000Z",
    treatment: "Breast Cancer Treatment in India",
    category: "Medical Oncology",
    tags: ["breast cancer", "pathology", "biomarkers", "diagnosis", "India", "travel"],
    excerpt:
      "How to read grade, margins, lymph nodes, lymphovascular invasion, ER, PR, HER2 and Ki-67 on a breast cancer pathology report before you travel for treatment.",
    images: [
      ["pathology-lab-visual.webp", "Breast cancer pathology report showing tumor grade margins lymph nodes ER PR HER2 and Ki-67", "The pathology report is one of the most important documents in the treatment plan."],
      ["pathology-consult-visual.webp", "Oncologist explaining a breast cancer pathology report", "Ask what the grade, margins and receptor results mean for your specific treatment."],
      ["pathology-team-visual.webp", "Multidisciplinary review of breast cancer pathology findings", "Surgeons, medical oncologists and radiation oncologists use the same report to plan care."],
      ["pathology-followup-visual.webp", "Patient leaving clinic after pathology-report review", "Bring the original report and slides or blocks if a second opinion is needed in India."],
    ],
    waOpen: "Please review my breast cancer pathology report and explain the next treatment steps in India.",
    waMid: "Please explain my grade, margins, ER, PR, HER2 and Ki-67 results.",
    waRecords: "I would like to send my pathology report for review before travelling to India.",
    waClose: "Please help me plan treatment based on my breast cancer pathology report in India.",
    related: [
      { label: "Diagnosis and biopsy", href: LINKS.diagnosis },
      { label: "ER, PR and HER2", href: LINKS.biomarkers },
      { label: "Breast Cancer Treatment in India", href: PILLAR },
    ],
    siblings: ["art_breast_cancer_diagnosis_tests_biopsy_er_pr_her2", "art_er_pr_her2_breast_cancer_treatment_india"],
  },
  {
    id: "art_breast_cancer_recurrence_treatment_india",
    slug: "breast-cancer-recurrence-treatment-india",
    publishedAt: "2026-09-28T01:00:00.000Z",
    treatment: "Breast Cancer Treatment in India",
    category: "Medical Oncology",
    tags: ["breast cancer", "recurrence", "metastatic", "India", "travel"],
    excerpt:
      "How local, regional and distant breast cancer recurrence is recognised, investigated and treated in India, and which records international patients should bring.",
    images: [
      ["recurrence-consult-visual.webp", "Breast cancer recurrence showing local regional and distant recurrence pathways and follow-up care", "A new symptom does not automatically mean recurrence, but it should be assessed."],
      ["recurrence-imaging-visual.webp", "Imaging used when breast cancer recurrence is suspected", "PET-CT, CT or MRI is used when there is a specific clinical question, not as routine surveillance."],
      ["recurrence-exam-visual.webp", "Physical examination for possible breast cancer recurrence", "Examination of the treated area, remaining breast and lymph-node regions is part of the work-up."],
      ["recurrence-plan-visual.webp", "Treatment planning after a breast cancer recurrence diagnosis", "The next plan depends on previous treatment, current tumour biology and whether disease is local or distant."],
    ],
    waOpen: "Please review my records and advise on possible breast cancer recurrence treatment in India.",
    waMid: "Please advise which tests I need for a suspected breast cancer recurrence.",
    waRecords: "I would like to send my original pathology and new imaging for a recurrence review in India.",
    waClose: "Please help me plan breast cancer recurrence treatment in India.",
    related: [
      { label: "Breast Cancer Treatment in India", href: PILLAR },
      { label: "Follow-up tests", href: "/blogs/breast-cancer-follow-up-tests" },
      { label: "By stage", href: LINKS.byStage },
      { label: "International patients", href: LINKS.intl },
    ],
    siblings: ["art_breast_cancer_follow_up_tests", "art_breast_cancer_treatment_by_stage"],
  },
  {
    id: "art_breast_cancer_in_young_women_treatment_india",
    slug: "breast-cancer-in-young-women-treatment-india",
    publishedAt: "2026-09-28T01:30:00.000Z",
    treatment: "Breast Cancer Treatment in India",
    category: "Medical Oncology",
    tags: ["breast cancer", "young women", "fertility", "India", "travel"],
    excerpt:
      "How breast cancer is diagnosed and treated in younger women in India, including fertility preservation, genetic risk and long-term hormone therapy.",
    images: [
      ["young-women-consult-visual.webp", "Breast cancer awareness and treatment in a young woman with multidisciplinary cancer care", "Younger patients may need a different conversation about fertility, genetics and long-term treatment."],
      ["young-women-fertility-visual.webp", "Fertility-preservation consult before breast cancer treatment", "If having children matters, raise fertility preservation before chemotherapy starts."],
      ["young-women-imaging-visual.webp", "Diagnostic imaging for breast cancer in a younger woman", "Imaging and biopsy still need to confirm the diagnosis before treatment begins."],
      ["young-women-followup-visual.webp", "Follow-up after breast cancer treatment in a younger patient", "Follow-up includes surveillance, fertility timing and treatment-related health such as bone density."],
    ],
    waOpen: "Please review my records and advise on breast cancer treatment for a younger woman in India.",
    waMid: "Please advise on fertility preservation before breast cancer treatment in India.",
    waRecords: "I would like to send my pathology and fertility questions for review before travelling to India.",
    waClose: "Please help me plan breast cancer treatment and fertility care in India.",
    related: [
      { label: "Breast Cancer Treatment in India", href: PILLAR },
      { label: "Hormone therapy side effects", href: LINKS.hormoneSe },
      { label: "Chemotherapy side effects", href: LINKS.chemoSe },
      { label: "Diagnosis", href: LINKS.diagnosis },
    ],
    siblings: ["art_breast_cancer_chemotherapy_side_effects", "art_breast_cancer_hormone_therapy_side_effects"],
  },
  {
    id: "art_invasive_lobular_carcinoma_treatment_india",
    slug: "invasive-lobular-carcinoma-treatment-india",
    publishedAt: "2026-09-28T02:00:00.000Z",
    treatment: "Breast Cancer Treatment in India",
    category: "Surgical Oncology",
    tags: ["breast cancer", "invasive lobular carcinoma", "ILC", "India", "travel"],
    excerpt:
      "How invasive lobular carcinoma is diagnosed, staged and treated in India, including surgery, hormone therapy and why MRI is sometimes more useful than mammography.",
    images: [
      ["ilc-consult-visual.webp", "Invasive lobular carcinoma showing cancer cells spreading through the breast lobules and surrounding tissue", "Lobular carcinoma can be harder to feel and harder to see on mammography than ductal cancers."],
      ["ilc-imaging-visual.webp", "MRI evaluation of invasive lobular carcinoma", "MRI may be used when the extent of disease is unclear on mammography and ultrasound."],
      ["ilc-surgery-visual.webp", "Surgical planning for invasive lobular carcinoma", "The operation depends on the extent of disease, not on the word lobular alone."],
      ["ilc-followup-visual.webp", "Follow-up after invasive lobular carcinoma treatment", "Most invasive lobular carcinomas are hormone receptor-positive and may need long-term endocrine therapy."],
    ],
    waOpen: "Please review my records and advise on invasive lobular carcinoma treatment in India.",
    waMid: "Please advise whether I need MRI or a different surgery for lobular breast cancer.",
    waRecords: "I would like to send my pathology and imaging for an ILC treatment plan in India.",
    waClose: "Please help me plan invasive lobular carcinoma treatment in India.",
    related: [
      { label: "Breast Cancer Treatment in India", href: PILLAR },
      { label: "Diagnosis", href: LINKS.diagnosis },
      { label: "Hormone therapy", href: LINKS.hormone },
      { label: "Surgery", href: LINKS.surgery },
    ],
    siblings: ["art_hormone_therapy_breast_cancer_india", "art_breast_cancer_surgery_in_india"],
  },
  {
    id: "art_breast_cancer_during_pregnancy_treatment_india",
    slug: "breast-cancer-during-pregnancy-treatment-india",
    publishedAt: "2026-09-28T02:30:00.000Z",
    treatment: "Breast Cancer Treatment in India",
    category: "Medical Oncology",
    tags: ["breast cancer", "pregnancy", "fertility", "India", "travel"],
    excerpt:
      "How breast cancer can be diagnosed and treated during pregnancy in India, including which treatments can wait, which can proceed, and how obstetrics and oncology coordinate.",
    images: [
      ["pregnancy-consult-visual.webp", "Breast cancer diagnosis and treatment during pregnancy with coordinated oncology and obstetric care", "Treatment decisions during pregnancy need both oncology and obstetric teams."],
      ["pregnancy-ultrasound-visual.webp", "Obstetric ultrasound during breast cancer treatment in pregnancy", "The baby is monitored while cancer treatment is planned around the trimester."],
      ["pregnancy-infusion-visual.webp", "Carefully timed chemotherapy during pregnancy for breast cancer", "Some chemotherapy can be given in later trimesters; radiation and some medicines are deferred."],
      ["pregnancy-followup-visual.webp", "Coordinated follow-up for breast cancer during pregnancy", "Delivery timing, surgery and later radiation are sequenced with the obstetric plan."],
    ],
    waOpen: "Please review my records and advise on breast cancer treatment during pregnancy in India.",
    waMid: "Please advise which treatments are safe during pregnancy and what should wait.",
    waRecords: "I would like to send my pathology and obstetric records for a pregnancy-and-cancer plan in India.",
    waClose: "Please help me plan breast cancer treatment during pregnancy in India.",
    related: [
      { label: "Breast Cancer Treatment in India", href: PILLAR },
      { label: "Young women", href: "/blogs/breast-cancer-in-young-women-treatment-india" },
      { label: "Chemotherapy side effects", href: LINKS.chemoSe },
      { label: "International patients", href: LINKS.intl },
    ],
    siblings: ["art_breast_cancer_in_young_women_treatment_india", "art_breast_cancer_chemotherapy_side_effects"],
  },
];

const cityLine =
  `Oncology teams in [Delhi NCR](${LINKS.delhiD}), [Mumbai](${LINKS.mumbaiD}), [Bengaluru](/doctors/India/Bengaluru), [Chennai](/doctors/India/Chennai) and [Hyderabad](/doctors/India/Hyderabad) can confirm the next step. Hospitals in [Delhi NCR](${LINKS.delhiH}) and [Mumbai](${LINKS.mumbaiH}) handle international follow-up.`;

const resourceLine = (cfg) =>
  `- [Breast Cancer Treatment in India](${PILLAR})\n- [Hormone therapy side effects](${LINKS.hormoneSe})\n- [Chemotherapy side effects](${LINKS.chemoSe})\n- [Targeted therapy side effects](${LINKS.targetedSe})\n- [Radiation therapy](${LINKS.radiation})\n- [Diagnosis](${LINKS.diagnosis})\n- [International patients](${LINKS.intl})\n- [Chemotherapy doctors](${LINKS.chemoDoctors}) · [Hormone therapy doctors](${LINKS.hormoneDoctors})\n- [Radiation oncology doctors](${LINKS.radiationDoctors})\n- [Breast-conserving surgery doctors](${LINKS.bcsDoctors})`;

const linkPairs = [
  ["Breast Cancer Treatment in India", PILLAR],
  ["hormone therapy", LINKS.hormoneSe],
  ["chemotherapy", LINKS.chemoSe],
  ["targeted therapy", LINKS.targetedSe],
  ["radiation therapy", LINKS.radiation],
  ["mammography", "/blogs/breast-cancer-follow-up-tests"],
];

if (sources.length !== configs.length) {
  throw new Error(`expected ${configs.length} queued articles, got ${sources.length}`);
}

for (const [index, raw] of sources.entries()) {
  const cfg = configs[index];
  const { body, seo } = splitSeo(raw);
  const { intro, answers, rest } = parseQuickAnswers(body);
  const title = grab(seo, "Suggested H1") || raw.split("\n", 1)[0];
  const seoTitle = grab(seo, "SEO Title");
  const seoDescription = grab(seo, "Meta Description");
  const imageAlt = grab(seo, "Featured Image Alt Text") || cfg.images[0][1];
  const keywords = [grab(seo, "Primary Keyword")].filter(Boolean);
  const kwBlock = seo.split("Secondary Keywords:")[1]?.split("Suggested H1:")[0] ?? "";
  for (const line of kwBlock.split("\n")) {
    const word = line.trim();
    if (word) keywords.push(word);
  }

  let n = 0;
  const id = (prefix) => `${prefix}_${(++n).toString().padStart(3, "0")}`;
  const blocks = [];

  if (answers.length) {
    const html = [
      `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p>`,
      ...answers.map(
        (item) =>
          `<p class="article-quick-answer__body"><strong>${item.q}</strong> ${item.a}</p>`,
      ),
      `</aside>`,
    ].join("");
    blocks.push({ id: id("html"), type: "html", html });
  }

  const introText = intro.split("\n").slice(1).join(" ").replace(/\s+/g, " ").trim();
  if (introText) {
    blocks.push({
      id: id("p"),
      type: "paragraph",
      text: `${enrich(introText, linkPairs)} This guide supports the [Breast Cancer Treatment in India](${PILLAR}) pathway.`,
    });
  }
  blocks.push({
    id: id("btn"),
    type: "button",
    label: `Ask GAF about ${title.split(":")[0].toLowerCase()}`,
    href: consult(cfg.treatment),
  });
  blocks.push({
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 with your records](${wa(cfg.waOpen)})`,
  });
  blocks.push({
    id: id("img"),
    type: "image",
    src: `/uploads/articles/${cfg.images[0][0]}`,
    alt: imageAlt,
    caption: cfg.images[0][2],
  });

  const bodyBlocks = toParagraphs(rest).map((block) => {
    if (block.type === "paragraph") return { ...block, text: enrich(block.text, linkPairs) };
    return block;
  });

  const insertAt = [
    Math.max(2, Math.floor(bodyBlocks.length * 0.22)),
    Math.max(4, Math.floor(bodyBlocks.length * 0.48)),
    Math.max(6, Math.floor(bodyBlocks.length * 0.72)),
  ];
  let offset = 0;
  for (let i = 0; i < 3; i += 1) {
    const at = insertAt[i] + offset;
    const [file, alt, caption] = cfg.images[i + 1];
    bodyBlocks.splice(at, 0, {
      type: "image",
      src: `/uploads/articles/${file}`,
      alt,
      caption,
    });
    offset += 1;
  }

  const mid = Math.floor(bodyBlocks.length / 2);
  bodyBlocks.splice(mid, 0, {
    type: "button",
    label: "Request a case-specific treatment review",
    href: consult(cfg.treatment),
  });
  bodyBlocks.splice(mid + 1, 0, {
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 for a case-specific plan](${wa(cfg.waMid)})`,
  });
  bodyBlocks.splice(Math.floor(bodyBlocks.length * 0.72), 0, {
    type: "paragraph",
    text: cityLine,
  });
  bodyBlocks.splice(Math.floor(bodyBlocks.length * 0.78), 0, {
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 your records before travel](${wa(cfg.waRecords)})`,
  });

  for (const block of bodyBlocks) {
    blocks.push({ id: id(block.type === "heading" ? "h" : block.type === "list" ? "ul" : block.type === "image" ? "img" : "p"), ...block });
  }

  const faqSource = answers.slice(0, 12);
  if (!blocks.some((block) => block.type === "heading" && /frequently asked questions/i.test(block.text))) {
    blocks.push({ id: id("h"), type: "heading", level: 2, text: "Frequently Asked Questions" });
    for (const item of faqSource) {
      blocks.push({ id: id("h"), type: "heading", level: 3, text: item.q });
      blocks.push({ id: id("p"), type: "paragraph", text: item.a });
    }
  }

  blocks.push({
    id: id("btn"),
    type: "button",
    label: "Start the Breast Cancer Treatment in India pathway",
    href: consult("Breast Cancer Treatment in India"),
  });
  blocks.push({
    id: id("p"),
    type: "paragraph",
    text: `[WhatsApp +91 90443 46292 to plan the next step](${wa(cfg.waClose)})`,
  });
  blocks.push({ id: id("h"), type: "heading", level: 2, text: "GAF Healthcare Resources" });
  blocks.push({ id: id("p"), type: "paragraph", text: resourceLine(cfg) });

  const now = cfg.publishedAt;
  const article = {
    id: cfg.id,
    slug: cfg.slug,
    title,
    excerpt: cfg.excerpt,
    date: now.startsWith("2026-09-28") ? "28 September 2026" : "27 September 2026",
    publishedAt: now,
    updatedAt: now,
    author: "GAF Healthcare clinical desk",
    category: cfg.category,
    tags: cfg.tags,
    image: `/uploads/articles/${cfg.images[0][0]}`,
    imageAlt,
    status: "published",
    featured: true,
    seoTitle,
    seoDescription,
    canonical: `https://gaf.healthcare/blogs/${cfg.slug}`,
    ogImage: `/uploads/articles/${cfg.images[0][0]}`,
    allowIndex: true,
    keywords,
    relatedLinks: cfg.related,
    blocks,
  };

  if (!store.categories.includes(cfg.category)) store.categories.push(cfg.category);
  for (const tag of cfg.tags) {
    if (!store.tags.includes(tag)) store.tags.push(tag);
  }
  for (const [file, alt] of cfg.images) {
    const mediaId = `media_${cfg.slug}_${file.replace(/[^a-z0-9]+/g, "_")}`;
    if (!store.media.some((row) => row.id === mediaId)) {
      store.media.push({ id: mediaId, url: `/uploads/articles/${file}`, name: file, alt, addedAt: now });
    }
  }
  const existing = store.articles.findIndex((row) => row.id === article.id);
  if (existing >= 0) store.articles[existing] = article;
  else store.articles.unshift(article);

  const href = `/blogs/${cfg.slug}`;
  for (const siblingId of cfg.siblings) {
    const sibling = store.articles.find((row) => row.id === siblingId);
    if (!sibling) continue;
    sibling.relatedLinks ??= [];
    if (!sibling.relatedLinks.some((link) => link.href === href)) {
      sibling.relatedLinks.splice(1, 0, { label: title.split(":")[0], href });
    }
  }
  console.log("wrote", cfg.slug, "blocks", blocks.length, "qa", answers.length);
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("done");
