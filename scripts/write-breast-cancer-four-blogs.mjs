#!/usr/bin/env node
/**
 * Publish four remaining breast-cancer blogs:
 * family-history, obesity, diabetes, older-women.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmsPath = join(process.cwd(), "content/cms.json");
const store = JSON.parse(readFileSync(cmsPath, "utf8"));
const consult = (t) => `/consult?treatment=${encodeURIComponent(t)}`;
const wa = (m) => `https://wa.me/919044346292?text=${encodeURIComponent(m)}`;

const TX = "/treatments/breast-cancer-treatment-in-india";
const SYMP = "/blogs/breast-cancer-symptoms";
const DIAG = "/blogs/breast-cancer-diagnosis";
const DIAG2 = "/blogs/breast-cancer-diagnosis-tests-biopsy-er-pr-her2";
const BIOPSY = "/blogs/breast-biopsy-breast-cancer-india";
const SCREEN = "/blogs/breast-cancer-screening-india";
const STAGES = "/blogs/breast-cancer-stages";
const COST = "/blogs/breast-cancer-treatment-cost-in-india";
const INTL = "/blogs/breast-cancer-treatment-india-international-patients";
const SURGERY = "/blogs/breast-cancer-surgery-in-india";
const CHEMO = "/blogs/breast-cancer-chemotherapy-in-india";
const RAD = "/blogs/breast-cancer-radiation-therapy-in-india";
const HORM = "/blogs/hormone-therapy-for-breast-cancer-in-india";
const PREV = "/blogs/breast-cancer-prevention";
const YOUNG = "/blogs/breast-cancer-in-young-women-treatment-india";
const MEN = "/blogs/breast-cancer-in-men-india";
const MED = "/doctors/India/Medical-Oncology";
const SURG = "/doctors/India/Surgical-Oncology";
const RADDOC = "/doctors/India/Radiation-Oncology";
const C_LUMP = "/costs/India/Surgical-Oncology/Lumpectomy";
const C_MAST = "/costs/India/Surgical-Oncology/Mastectomy";
const C_CHEMO = "/costs/India/Medical-Oncology/Chemotherapy";
const C_HORM = "/costs/India/Medical-Oncology/Hormone-Therapy";
const C_PREC = "/costs/India/Medical-Oncology/Precision-Oncology";

const now = new Date().toISOString();
let n = 0;
const id = (p) => `${p}_${(++n).toString().padStart(3, "0")}`;
const h2 = (t) => ({ id: id("h"), type: "heading", level: 2, text: t });
const h3 = (t) => ({ id: id("h"), type: "heading", level: 3, text: t });
const p = (t) => ({ id: id("p"), type: "paragraph", text: t });
const ul = (items) => ({ id: id("ul"), type: "list", style: "ul", items });
const ol = (items) => ({ id: id("ol"), type: "list", style: "ol", items });
const btn = (label, href) => ({ id: id("btn"), type: "button", label, href });
const img = (src, alt, caption) => ({ id: id("img"), type: "image", src, alt, caption });
const html = (h) => ({ id: id("html"), type: "html", html: h });

const costPathway = (rowsNote) =>
  `<div class="md-body"><table><thead><tr><th>Named pathway</th><th>GAF planning range in India</th><th>Notes</th></tr></thead><tbody><tr><td><a href="${C_PREC}">Precision oncology</a></td><td>$2,000–$7,000</td><td>Selected genetic / biomarker pathways</td></tr><tr><td><a href="${C_LUMP}">Lumpectomy</a></td><td>$3,000–$7,500</td><td>Breast-conserving surgery when suitable</td></tr><tr><td><a href="${C_MAST}">Mastectomy</a></td><td>$4,500–$10,000</td><td>Selected surgical pathways</td></tr><tr><td><a href="${C_CHEMO}">Chemotherapy</a></td><td>$1,500–$8,000+</td><td>When systemic therapy is indicated</td></tr><tr><td><a href="${C_HORM}">Hormone therapy</a></td><td>$1,000–$4,500</td><td>Hormone receptor-positive settings</td></tr></tbody></table></div><p class="article-quick-answer__body">${rowsNote} See the <a href="${COST}">breast cancer cost guide</a>.</p>`;

function upsertArticle(article, mediaPairs) {
  for (const [file, alt] of mediaPairs) {
    const mediaId = `media_${file.replace(/[^a-z0-9]+/g, "_")}`;
    if (!store.media.some((r) => r.id === mediaId || r.url === `/uploads/articles/${file}`)) {
      store.media.push({ id: mediaId, url: `/uploads/articles/${file}`, name: file, alt, addedAt: now });
    }
  }
  const index = store.articles.findIndex((r) => r.id === article.id || r.slug === article.slug);
  if (index >= 0) store.articles[index] = article;
  else store.articles.unshift(article);
}

function linkRelated(slug, label, relatedSlugs) {
  const href = `/blogs/${slug}`;
  for (const relatedSlug of relatedSlugs) {
    const related = store.articles.find((r) => r.slug === relatedSlug);
    if (!related) continue;
    related.relatedLinks = related.relatedLinks || [];
    if (!related.relatedLinks.some((r) => r.href === href)) related.relatedLinks.push({ label, href });
  }
}

function updateLlms(slug, label) {
  const llmsPath = join(process.cwd(), "public/llms.txt");
  let llms = readFileSync(llmsPath, "utf8");
  if (llms.includes(slug)) return;
  const needle = "- [Blogs](https://gaf.healthcare/blogs):";
  if (llms.includes(needle)) {
    llms = llms.replace(needle, `- [Blogs](https://gaf.healthcare/blogs): includes [${label}](https://gaf.healthcare/blogs/${slug}).`);
  } else {
    llms += `\n- [${label}](https://gaf.healthcare/blogs/${slug})\n`;
  }
  writeFileSync(llmsPath, llms);
}

const relatedBase = [
  "breast-cancer-prevention",
  "breast-cancer-symptoms",
  "breast-cancer-diagnosis",
  "breast-cancer-diagnosis-tests-biopsy-er-pr-her2",
  "breast-biopsy-breast-cancer-india",
  "breast-cancer-screening-india",
  "breast-cancer-surgery-in-india",
  "breast-cancer-chemotherapy-in-india",
  "breast-cancer-radiation-therapy-in-india",
  "hormone-therapy-for-breast-cancer-in-india",
  "breast-cancer-treatment-cost-in-india",
  "breast-cancer-treatment-india-international-patients",
  "breast-cancer-in-young-women-treatment-india",
  "breast-cancer-in-men-india",
];

// ───────────────────────── 1) FAMILY HISTORY ─────────────────────────
{
  n = 0;
  const SLUG = "breast-cancer-and-family-history";
  const IMG1 = "/uploads/articles/breast-cancer-family-history-overview.webp";
  const IMG2 = "/uploads/articles/breast-cancer-family-history-genes.webp";
  const IMG3 = "/uploads/articles/breast-cancer-family-history-counseling.webp";
  const IMG4 = "/uploads/articles/breast-cancer-family-history-prevention.webp";
  const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>Does breast cancer run in families?</strong></td><td>Sometimes — most cases are not a single inherited gene</td></tr><tr><td><strong>Hereditary share</strong></td><td>About 5–10% estimated hereditary; definitions vary</td></tr><tr><td><strong>Key genes</strong></td><td>BRCA1, BRCA2, PALB2 and others</td></tr><tr><td><strong>Who tests</strong></td><td>Selected personal/family histories after counselling</td></tr><tr><td><strong>Positive BRCA</strong></td><td>Higher risk — not certainty; screening/prevention options exist</td></tr><tr><td><strong>Planning</strong></td><td><a href="${PREV}">Prevention</a> · <a href="${SCREEN}">screening</a> · <a href="${TX}">treatment</a></td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>Family history</strong> should lead to informed risk assessment — not fear alone.</p></aside>`;
  const geneTable = `<div class="md-body"><table><thead><tr><th>Gene</th><th>Associated condition or risk</th><th>Why it matters</th></tr></thead><tbody><tr><td>BRCA1</td><td>HBOC</td><td>Increased breast and ovarian cancer risk</td></tr><tr><td>BRCA2</td><td>HBOC</td><td>Breast, ovarian, pancreatic, prostate, male breast risk</td></tr><tr><td>PALB2</td><td>Hereditary susceptibility</td><td>Important breast cancer gene</td></tr><tr><td>TP53</td><td>Li-Fraumeni</td><td>Several cancers including young-onset breast cancer</td></tr><tr><td>PTEN</td><td>PTEN hamartoma syndrome</td><td>Breast, thyroid, endometrial and other risks</td></tr><tr><td>CDH1</td><td>HDGC</td><td>Diffuse gastric and lobular breast cancer</td></tr><tr><td>CHEK2 / ATM / BARD1</td><td>Moderate penetrance</td><td>Selected variants raise breast cancer risk</td></tr></tbody></table></div>`;
  const germVsTumour = `<div class="md-body"><table><thead><tr><th>Feature</th><th>Tumour genetic testing</th><th>Germline genetic testing</th></tr></thead><tbody><tr><td>Sample</td><td>Cancer tissue</td><td>Usually blood or saliva</td></tr><tr><td>Purpose</td><td>Tumour changes</td><td>Inherited variants</td></tr><tr><td>Family implications</td><td>Usually not direct</td><td>May affect blood relatives</td></tr></tbody></table></div>`;
  const familyInfo = `<div class="md-body"><table><thead><tr><th>Information</th><th>Details to collect</th></tr></thead><tbody><tr><td>Relative affected</td><td>Mother, sister, daughter, aunt, grandmother</td></tr><tr><td>Type of cancer</td><td>Breast, ovarian, pancreatic, prostate</td></tr><tr><td>Age at diagnosis</td><td>Approximate age</td></tr><tr><td>Side of family</td><td>Mother's or father's side</td></tr><tr><td>Genetic test history</td><td>Prior reports if available</td></tr></tbody></table></div>`;
  const faqs = [
    ["Does breast cancer always run in families?", "No. Most breast cancers are not caused by a known inherited pathogenic variant. Family history can still increase risk and may indicate genetic assessment."],
    ["If my mother had breast cancer, will I also get it?", "Not necessarily. An affected mother can increase risk, but it does not mean cancer is inevitable."],
    ["At what age should a woman with a family history start screening?", "There is no single age. It depends on relatives’ ages at diagnosis, number affected, genetic results and overall risk."],
    ["What is the difference between BRCA1 and BRCA2?", "Both repair DNA. Pathogenic variants raise breast cancer risk. BRCA1 is more often linked with triple-negative disease; BRCA2 is especially relevant to male breast and prostate cancer risk."],
    ["Can a father pass a breast cancer gene to his daughter?", "Yes. BRCA1/BRCA2 variants can come from either parent."],
    ["Can men carry BRCA mutations?", "Yes. Men can inherit and pass BRCA variants and may have higher risks of male breast, prostate and pancreatic cancers."],
    ["Does a positive BRCA test mean I will develop breast cancer?", "No. It means increased inherited risk, not certainty."],
    ["What does a negative BRCA test mean?", "No pathogenic variant was found in the genes examined. A true negative for a known family variant differs from an uninformative negative."],
    ["What is a VUS in genetic testing?", "A variant of uncertain significance. It should not be treated as a confirmed cancer-causing mutation or used alone for preventive surgery decisions."],
    ["Is BRCA testing available in India?", "Yes, through selected laboratories and cancer centres. Confirm quality, panel coverage and counselling access."],
    ["Can a woman with a BRCA mutation have children?", "Yes. Discuss reproductive planning and the 50% inheritance chance with specialists."],
    ["Can breast cancer be prevented in BRCA carriers?", "Risk cannot be eliminated, but enhanced screening, medicines and selected surgeries can reduce risk or aid earlier detection."],
    ["Should every woman with breast cancer undergo genetic testing?", "Not every woman needs the same test. ASCO–SSO guidance recommends offering BRCA1/2 testing to newly diagnosed patients ≤65, with selected older patients based on criteria."],
    ["If my genetic test is negative, can I stop screening?", "No. Continue screening based on personal risk and guidelines."],
    ["Does genetic testing help choose treatment?", "Yes in selected cases — surgery choices, risk-reducing measures and PARP inhibitor eligibility."],
    ["What is cascade testing?", "Testing blood relatives for a known family pathogenic variant after counselling."],
  ];
  const blocks = [
    html(qa),
    p("A family history of breast cancer can raise a woman's risk, but it does not always mean cancer is inherited. This guide explains hereditary breast cancer, BRCA1, BRCA2 and PALB2, who should consider testing, what results mean and how families can manage risk. Related: [prevention](" + PREV + "), [screening](" + SCREEN + "), [young women](" + YOUNG + "), [men](" + MEN + "), [treatment in India](" + TX + ")."),
    btn("Ask GAF about hereditary risk assessment", consult("Breast Cancer Genetic Testing")),
    p("[WhatsApp +91 90443 46292 with family history details](" + wa("Please advise on breast cancer family history assessment and genetic counselling in India.") + ")"),
    img(IMG1, "Women from multiple generations discussing breast cancer family history with a clinician", "Family history matters — but most breast cancers are not a single inherited gene."),
    h2("Does Breast Cancer Run in Families?"),
    p("Yes, it can — but not every family with several cases has an inherited syndrome."),
    ul([
      "**Familial breast cancer** — several relatives affected without an identified pathogenic variant; shared lifestyle, reproductive, environmental and polygenic factors may contribute.",
      "**Hereditary breast cancer** — an inherited pathogenic variant raises risk and can pass from parent to child.",
    ]),
    p("About 5–10% of breast cancers are commonly estimated to be hereditary (estimates vary). Most breast cancers are not explained by one inherited cancer-causing gene. Having one relative with breast cancer does **not** mean you will develop it. Risk depends on which relative, age at diagnosis, number affected, bilateral disease, ovarian/pancreatic/prostate cancers, known variants and your own history."),
    h2("How Much Does Family History Increase Risk?"),
    p("The increase is not the same for everyone. Concern rises with multiple close relatives, young-onset disease, several generations, breast plus ovarian cancer, male breast cancer or a known pathogenic variant."),
    ul(["**First-degree:** mother, sister, daughter.", "**Second-degree:** grandmother, aunt, half-sister, granddaughter, niece — especially when several are on the same side."]),
    p("Younger age at diagnosis can be a stronger hereditary clue than late-life disease, but age alone does not decide testing."),
    btn("Request a personalised family-risk review", consult("Breast Cancer Genetic Testing")),
    h2("Hereditary Breast and Ovarian Cancer Syndrome"),
    p("HBOC is mainly linked to pathogenic BRCA1/BRCA2 variants. These genes help repair DNA. Harmful inherited variants can raise risks of breast, ovarian, fallopian tube, primary peritoneal, pancreatic and prostate cancers (especially BRCA2 in men), and male breast cancer. Risks differ by gene and variant. Not every carrier develops cancer."),
    h2("Which Genes Matter?"),
    img(IMG2, "Abstract DNA helix representing BRCA1 BRCA2 PALB2 hereditary breast cancer genes", "BRCA1, BRCA2 and PALB2 are among key hereditary breast cancer genes."),
    html(geneTable),
    p("Panel choice should follow personal/family history — a larger panel is not automatically better."),
    h2("BRCA1 vs BRCA2"),
    ul([
      "**BRCA1** — female breast and ovarian risk; BRCA1-related cancers more often triple-negative (not always).",
      "**BRCA2** — female and male breast, ovarian, pancreatic and prostate risk.",
    ]),
    p("A pathogenic BRCA variant increases risk but does not guarantee cancer."),
    h2("How Genes Are Inherited"),
    p("BRCA1/BRCA2 pathogenic variants usually follow autosomal dominant inheritance: one altered copy confers susceptibility. Each child of a carrier has a ~50% chance of inheriting it. Variants can come from either parent — fathers can pass them without having breast cancer themselves. Male breast cancer in a family is an important clue. See also [breast cancer in men](" + MEN + ")."),
    h2("Family Patterns That Suggest Hereditary Risk"),
    ul(["Young-onset breast cancer", "Ovarian cancer in a close relative", "Male breast cancer", "Multiple relatives with breast cancer", "Bilateral or multiple primary breast cancers", "Breast + ovarian/pancreatic/selected prostate cancers", "Known pathogenic variant", "Triple-negative breast cancer, especially younger"]),
    h2("Who Should Consider Genetic Testing?"),
    p("Not every woman needs testing. It is considered when history suggests higher likelihood of an inherited variant — including younger-onset breast cancer (ASCO–SSO recommends offering BRCA1/2 testing to newly diagnosed patients ≤65, with criteria for selected older patients), strong family history, ovarian cancer, bilateral/multiple primaries, selected triple-negative cases, known family variants and men with breast cancer."),
    btn("Ask about genetic counselling in India", consult("Breast Cancer Genetic Testing")),
    h2("What Is Germline Genetic Testing?"),
    p("Testing examines inherited DNA (usually blood or saliva), not the same as mammography, ultrasound or tumour biopsy. Results may be pathogenic, likely pathogenic, benign, likely benign or variants of uncertain significance (VUS). Interpretation needs a qualified professional."),
    html(germVsTumour),
    h2("Genetic Counselling"),
    img(IMG3, "Genetic counsellor reviewing a family pedigree with a woman before BRCA testing", "Counselling before and after testing helps interpret results for the whole family."),
    p("Before testing: personal/family history, pedigree, outcomes, limitations, implications, consent. After: risk, screening, risk-reducing options, treatment implications, relative testing and psychosocial issues."),
    h2("What Results Mean"),
    ul([
      "**Pathogenic / likely pathogenic** — inherited risk increase; not a cancer diagnosis.",
      "**True negative** — known family variant specifically absent.",
      "**Uninformative negative** — no prior family variant; residual familial risk may remain.",
      "**VUS** — not a confirmed mutation; ASCO–SSO: do not use VUS alone for management.",
      "**Benign / likely benign** — generally no management change from that finding.",
    ]),
    h2("If BRCA1/BRCA2 Is Positive"),
    img(IMG4, "Woman discussing intensified breast screening and risk-reducing options after a BRCA result", "Positive results guide screening and prevention choices — not panic."),
    ul(["Intensified screening (clinical exam, MRI, mammography as indicated)", "Risk-reducing mastectomy (personal decision; residual risk remains)", "Risk-reducing salpingo-oophorectomy timing by gene/age/fertility plans", "Selected preventive endocrine medicines for some women"]),
    p("BRCA status can also influence surgery choices and PARP inhibitor eligibility (e.g. olaparib/talazoparib in selected settings). Oncologists decide suitability."),
    h2("Testing and Cost in India"),
    p("BRCA and multigene panels are available through selected Indian labs and cancer centres. Choose by quality, genes covered, variant detection methods, counselling and interpretation — not price or gene count alone. ISMPO 2025 hereditary breast/ovarian consensus discusses counselling and tele-genetic options. Costs vary; request a written estimate covering counselling."),
    html(costPathway("GAF pathway ranges support planning after high-risk assessment or diagnosis — not a fixed genetic-test price list.")),
    btn("Request a genetic counselling estimate", consult("Breast Cancer Genetic Testing")),
    p("[WhatsApp +91 90443 46292 for counselling and testing coordination](" + wa("Please share options for breast cancer genetic counselling and testing pathways in India.") + ")"),
    h2("Cascade Testing and Negative Strong-Family History"),
    p("If a relative has a confirmed pathogenic BRCA variant, adult blood relatives may be offered targeted testing. Predictive BRCA testing is generally not for children under 18. A negative broad test with a strong family history may still justify enhanced screening — an uninformative negative does not erase familial risk."),
    h2("Risk Management and Preparing for Counselling"),
    ul(["Personalised screening", "Risk-reducing medicines when appropriate", "Risk-reducing surgery for selected high-risk variants", "Healthy weight, activity, limited alcohol", "Symptom awareness"]),
    html(familyInfo),
    h2("International Patients"),
    p("Share biopsy/IHC, imaging, treatment records and family/genetic reports before travel. GAF can coordinate hospital arrangements; specialists make clinical decisions. [International patients](" + INTL + "). Specialists: [medical oncology](" + MED + "), [surgical oncology](" + SURG + ")."),
    btn("Coordinate hereditary breast cancer care in India", consult("Breast Cancer Genetic Testing")),
    h2("Frequently Asked Questions"),
    ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),
    h2("Conclusion"),
    p("Family history is important but incomplete. Some families carry BRCA1/BRCA2/PALB2 variants; others have several cases without an identified gene. Genetic counselling helps separate these situations and guide screening, testing and prevention."),
    p("**Family history should lead to informed assessment, not fear.**"),
    h2("Medical Sources and References"),
    ul([
      "[ASCO–SSO Germline Testing in Breast Cancer](https://ascopubs.org/doi/10.1200/JCO.23.02225)",
      "[NCI BRCA Fact Sheet](https://www.cancer.gov/about-cancer/causes-prevention/genetics/brca-fact-sheet)",
      "[NCI Breast/Gynecologic Genetics PDQ](https://www.cancer.gov/types/breast/hp/breast-ovarian-genetics-pdq)",
      "[ACS Genetic Counseling and Testing](https://www.cancer.org/cancer/types/breast-cancer/risk-and-prevention/genetic-testing.html)",
      "[ISMPO HBOC Consensus 2025](https://www.ijmpo.org/assets/ismpo-guidelines-articles/2025/pdf/s-0044-1788727.pdf)",
      "[ICMR Breast Cancer Consensus](https://www.icmr.gov.in/icmrobject/custom_data/pdf/resource-guidelines/Breast_Cancer.pdf)",
      "[GeneReviews BRCA1/2 HBOC](https://www.ncbi.nlm.nih.gov/books/NBK1247/)",
      "[USPSTF BRCA Risk Assessment](https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/brca-related-cancer-risk-assessment-genetic-counseling-and-genetic-testing)",
    ]),
    p("*Medical disclaimer: Educational only. Genetic testing should be selected and interpreted by qualified professionals.*"),
    h2("Related Reading"),
    ul([`[Prevention](${PREV})`, `[Screening](${SCREEN})`, `[Young women](${YOUNG})`, `[Men](${MEN})`, `[Treatment](${TX})`, `[Cost](${COST})`]),
  ];
  upsertArticle(
    {
      id: "art_breast_cancer_and_family_history",
      slug: SLUG,
      title: "Breast Cancer and Family History: How Much Does Genetics Increase Your Risk?",
      excerpt:
        "A family history of breast cancer can increase a woman's risk, but it does not always mean that cancer is inherited. This guide explains hereditary breast cancer, important genes such as BRCA1, BRCA2 and PALB2, who should consider genetic testing, what test results mean and how families can manage their risk.",
      date: "15 November 2026",
      publishedAt: "2026-11-15T20:00:00.000Z",
      updatedAt: now,
      author: "GAF Healthcare clinical desk",
      category: "Medical Oncology",
      tags: ["breast cancer", "family history", "BRCA", "genetic testing", "India"],
      image: IMG1,
      imageAlt: "Women discussing breast cancer family history and genetic risk with a clinician",
      status: "published",
      featured: true,
      seoTitle: "Breast Cancer and Family History: Genetic Risk, BRCA Testing and Prevention",
      seoDescription:
        "Does breast cancer run in families? Understand inherited risk, BRCA1, BRCA2, PALB2 genetic testing, family history and prevention options in India.",
      canonical: `https://gaf.healthcare/blogs/${SLUG}`,
      ogImage: IMG1,
      allowIndex: true,
      keywords: [
        "Breast cancer and family history",
        "Hereditary breast cancer",
        "genetic risk of breast cancer",
        "BRCA1 and BRCA2 testing",
        "breast cancer genetic testing in India",
        "family history of breast cancer",
        "inherited breast cancer risk",
        "PALB2 mutation",
        "genetic counselling for breast cancer",
      ],
      relatedLinks: [
        { label: "Breast cancer prevention", href: PREV },
        { label: "Screening in India", href: SCREEN },
        { label: "Breast cancer in men", href: MEN },
        { label: "Treatment in India", href: TX },
        { label: "Cost guide", href: COST },
      ],
      blocks,
    },
    [
      ["breast-cancer-family-history-overview.webp", "Women discussing breast cancer family history and genetic risk with a clinician"],
      ["breast-cancer-family-history-genes.webp", "Abstract DNA helix representing BRCA1 BRCA2 PALB2 hereditary breast cancer genes"],
      ["breast-cancer-family-history-counseling.webp", "Genetic counsellor reviewing a family pedigree with a woman before BRCA testing"],
      ["breast-cancer-family-history-prevention.webp", "Woman discussing intensified breast screening and risk-reducing options after a BRCA result"],
    ],
  );
  updateLlms(SLUG, "breast cancer and family history");
  linkRelated(SLUG, "Breast cancer and family history", relatedBase);
  console.log("wrote", SLUG, "blocks", blocks.length);
}

// ───────────────────────── 2) OBESITY ─────────────────────────
{
  n = 0;
  const SLUG = "breast-cancer-and-obesity";
  const IMG1 = "/uploads/articles/breast-cancer-obesity-overview.webp";
  const IMG2 = "/uploads/articles/breast-cancer-obesity-metabolism.webp";
  const IMG3 = "/uploads/articles/breast-cancer-obesity-nutrition.webp";
  const IMG4 = "/uploads/articles/breast-cancer-obesity-recovery.webp";
  const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>Does obesity raise risk?</strong></td><td>Yes after menopause — evidence is convincing</td></tr><tr><td><strong>Before menopause</strong></td><td>Relationship more complex; not the same pattern</td></tr><tr><td><strong>Surgery</strong></td><td>Often possible; infection/wound risks may be higher</td></tr><tr><td><strong>Chemotherapy dosing</strong></td><td>ASCO: generally full weight-based doses when curative</td></tr><tr><td><strong>Crash diets</strong></td><td>Avoid delaying needed cancer treatment for rapid weight loss</td></tr><tr><td><strong>Planning</strong></td><td><a href="${TX}">Treatment</a> · <a href="${SURGERY}">surgery</a> · <a href="${COST}">cost</a></td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>Obesity</strong> is a manageable health factor in breast cancer care — not a reason for blame or treatment denial.</p></aside>`;
  const foodTable = `<div class="md-body"><table><thead><tr><th>Food group</th><th>Examples</th><th>Potential benefit</th></tr></thead><tbody><tr><td>Vegetables</td><td>Spinach, carrots, broccoli, beans, gourds</td><td>Fibre, vitamins, minerals</td></tr><tr><td>Fruits</td><td>Guava, apple, orange, papaya, berries</td><td>Fibre and micronutrients</td></tr><tr><td>Whole grains</td><td>Oats, whole-wheat roti, brown rice, millets</td><td>Fibre and sustained energy</td></tr><tr><td>Protein</td><td>Dal, beans, eggs, fish, chicken, paneer, curd</td><td>Muscle and recovery</td></tr><tr><td>Healthy fats</td><td>Nuts, seeds, appropriate oils</td><td>Essential fatty acids</td></tr></tbody></table></div>`;
  const teamTable = `<div class="md-body"><table><thead><tr><th>Specialist</th><th>Role</th></tr></thead><tbody><tr><td>Breast surgical oncologist</td><td>Surgery</td></tr><tr><td>Medical oncologist</td><td>Chemo, hormone, targeted therapy</td></tr><tr><td>Radiation oncologist</td><td>Radiation planning</td></tr><tr><td>Dietitian</td><td>Nutrition and weight management</td></tr><tr><td>Physiotherapist</td><td>Mobility and rehab</td></tr><tr><td>Anaesthetist / endocrinologist</td><td>Surgical risk and metabolic care</td></tr></tbody></table></div>`;
  const faqs = [
    ["Does obesity increase breast cancer risk?", "Yes after menopause. Before menopause the relationship is more complex."],
    ["Why after menopause?", "Fat tissue produces oestrogen via aromatase; insulin resistance and inflammation may also contribute."],
    ["Can women with obesity undergo surgery?", "Yes. Teams assess wound healing, diabetes, blood pressure, heart health and mobility."],
    ["Does obesity make chemotherapy less effective?", "Not automatically. ASCO generally supports full weight-based cytotoxic doses when treatment is curative, adjusted for toxicity."],
    ["Should a woman lose weight before surgery?", "Not necessarily. Do not delay needed cancer treatment for crash dieting."],
    ["Can treatment cause weight gain?", "Yes — reduced activity, steroids, menopause changes and appetite shifts. Others lose weight."],
    ["Does obesity increase recurrence risk?", "Higher post-diagnosis body fatness links with poorer outcomes in observational data; intentional weight-loss benefit on recurrence is still being studied."],
    ["Is exercise safe during treatment?", "Often yes, adapted to fatigue, surgery and side effects."],
    ["Is intermittent fasting recommended?", "Not established as cancer treatment; may be unsuitable with poor appetite, malnutrition or diabetes."],
    ["Are soy foods safe?", "Ordinary dietary soy is generally fine; discuss concentrated supplements with oncology."],
    ["Can weight-loss injections be used?", "Only after oncologist assessment — not proven breast cancer treatments."],
    ["Does losing weight cure breast cancer?", "No. It cannot replace cancer treatment."],
    ["What should patients eat during chemotherapy?", "Balanced energy, protein, fibre and fluids, adjusted for side effects."],
    ["Can international patients with obesity be treated in India?", "Often yes after reviewing cancer and metabolic records."],
    ["What is sarcopenic obesity?", "Excess fat with low muscle mass — preserve protein and strength while managing weight."],
  ];
  const blocks = [
    html(qa),
    p("Excess body weight is linked with higher postmenopausal breast cancer risk and may influence treatment and recovery. This guide covers biology, surgery, chemotherapy dosing, nutrition and care in India. Related: [prevention](" + PREV + "), [surgery](" + SURGERY + "), [chemotherapy](" + CHEMO + "), [treatment](" + TX + ")."),
    btn("Ask GAF about breast cancer care with obesity", consult("Breast Cancer Treatment")),
    p("[WhatsApp +91 90443 46292 with diagnosis and weight/medical history](" + wa("Please advise on breast cancer treatment planning for a patient with obesity in India.") + ")"),
    img(IMG1, "Woman discussing breast cancer risk and weight management with a clinician", "Obesity is a health factor to manage — not a reason for blame."),
    h2("Does Obesity Increase Breast Cancer Risk?"),
    p("Yes — convincing evidence for **postmenopausal** breast cancer. After menopause, fat tissue becomes an important oestrogen source via aromatase. Obesity also links to insulin resistance and chronic inflammation. Obesity does not cause every breast cancer, and not every woman with obesity develops it."),
    p("Before menopause the association is more complex and not the same consistent pattern."),
    h2("How Obesity May Influence Biology"),
    img(IMG2, "Abstract illustration of fat tissue metabolism insulin and inflammation pathways", "Oestrogen production, insulin signalling and inflammation are key researched pathways."),
    ul(["Increased oestrogen after menopause", "Insulin resistance and growth signalling", "Chronic inflammation", "Adipokine imbalance (e.g. leptin/adiponectin)", "Metabolic disease (diabetes, hypertension, lipids, fatty liver, CVD)"]),
    p("Body weight does **not** determine an individual's tumour subtype — biopsy and biomarkers do ([diagnosis](" + DIAG2 + "))."),
    h2("Prognosis and Recurrence"),
    p("Large observational syntheses (Global Cancer Update Programme) link higher BMI after diagnosis with higher all-cause and breast cancer-specific mortality. Association ≠ proof that intentional weight loss improves survival; trials such as BWEL are studying structured programmes. Never assume a poor outcome based on weight alone — stage, biology and treatment matter most."),
    btn("Request a personalised oncology review", consult("Breast Cancer Treatment")),
    h2("Surgery, Reconstruction and Radiation"),
    p("Many women with obesity undergo lumpectomy or mastectomy successfully. Risks that may be higher include infection, delayed healing, seroma, wound separation, clots and anaesthesia challenges — not inevitable. Reconstruction needs careful planning. Radiation is usually possible; planning may need extra attention to body shape, positioning and skin folds. See [surgery](" + SURGERY + ") and [radiation](" + RAD + ")."),
    h2("Chemotherapy and Hormone Therapy"),
    p("ASCO recommends adults with obesity generally receive **full weight-based** cytotoxic chemotherapy doses when treatment is intended to cure, with modifications for actual toxicity — not automatic dose cuts for obesity alone. Chemotherapy and steroids can cause weight gain or loss. Hormone therapy (tamoxifen, AIs) may coincide with weight changes from menopause and activity shifts; do not stop endocrine therapy for weight gain without oncology advice. See [chemotherapy](" + CHEMO + ") and [hormone therapy](" + HORM + ")."),
    h2("Weight Management During and After Treatment"),
    p("Do not delay necessary cancer treatment solely to hit a weight target. Avoid aggressive pre-op crash diets. During chemo, preserve protein, calories, fluids and muscle; strict unsupervised calorie restriction is usually unwise. After treatment, gradual habits beat crash diets."),
    img(IMG3, "Dietitian reviewing a balanced Indian meal plan with a breast cancer patient", "Balanced Indian meals support recovery better than extreme restriction."),
    html(foodTable),
    p("Eliminating all sugar or rice/roti is unnecessary; portions and overall pattern matter. Ordinary soy foods are generally acceptable; discuss isoflavone supplements with oncology."),
    h2("Exercise and Sarcopenic Obesity"),
    img(IMG4, "Breast cancer survivor walking with a physiotherapist during recovery", "Safe activity supports metabolic health even without large weight loss."),
    p("Activity is linked with lower postmenopausal risk and better survivor wellbeing. Aim gradually toward general adult targets when fit enough; adapt after surgery/chemo. Sarcopenic obesity (high fat + low muscle) needs protein and resistance work, not rapid unsupervised loss."),
    h2("Weight-Loss Medicines and Unexpected Loss"),
    p("GLP-1 agents are not established breast cancer treatments; use only after oncology review. Unintentional weight loss needs investigation even if previously overweight."),
    h2("Treatment and Cost in India"),
    html(teamTable),
    html(costPathway("Obesity itself does not set a fixed surcharge; diabetes, heart disease or complications may add monitoring. Request an itemised estimate.")),
    btn("Request a written treatment estimate", consult("Breast Cancer Treatment Cost")),
    p("International patients: share cancer + metabolic records before travel. [International patients](" + INTL + "). Specialists: [medical oncology](" + MED + "), [surgical oncology](" + SURG + ")."),
    btn("Coordinate care in India", consult("Breast Cancer Treatment")),
    p("[WhatsApp +91 90443 46292 for hospital coordination](" + wa("Please help coordinate breast cancer treatment for a patient with obesity in India.") + ")"),
    h2("Practical Checklist"),
    ul(["Share weight history and comorbidities", "Confirm chemo dosing approach", "See a dietitian; avoid crash diets", "Monitor unexplained weight change", "Ask about rehab after surgery"]),
    h2("Frequently Asked Questions"),
    ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),
    h2("Conclusion"),
    p("Treat the cancer effectively while protecting strength, nutrition and quality of life. Weight management supports care — it does not replace it."),
    h2("Medical Sources and References"),
    ul([
      "[WCRF – Be a Healthy Weight](https://www.wcrf.org/research-policy/evidence-for-our-recommendations/be-a-healthy-weight/)",
      "[NCI Obesity and Cancer](https://www.cancer.gov/about-cancer/causes-prevention/risk/obesity/obesity-fact-sheet)",
      "[Global Cancer Update Programme BMI meta-analysis](https://pmc.ncbi.nlm.nih.gov/articles/PMC10092239/)",
      "[ACS Nutrition & Activity for Survivors](https://acsjournals.onlinelibrary.wiley.com/doi/full/10.3322/caac.21719)",
      "[ASCO Chemotherapy Dosing in Obesity](https://ascopubs.org/doi/10.1200/JCO.2011.39.9436)",
      "[WHO Obesity Fact Sheet](https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight)",
    ]),
    p("*Medical disclaimer: Educational only. Individualise diet, exercise and treatment with qualified clinicians.*"),
    h2("Related Reading"),
    ul([`[Prevention](${PREV})`, `[Surgery](${SURGERY})`, `[Chemotherapy](${CHEMO})`, `[Treatment](${TX})`, `[Cost](${COST})`]),
  ];
  upsertArticle(
    {
      id: "art_breast_cancer_and_obesity",
      slug: SLUG,
      title: "Breast Cancer and Obesity: Does Excess Weight Increase Risk, Affect Treatment and Influence Recovery?",
      excerpt:
        "Excess body weight is associated with an increased risk of postmenopausal breast cancer and may influence treatment outcomes. This guide explains the relationship between obesity and breast cancer, the impact on surgery and recovery, and how patients can manage their weight safely during and after treatment.",
      date: "15 November 2026",
      publishedAt: "2026-11-15T20:10:00.000Z",
      updatedAt: now,
      author: "GAF Healthcare clinical desk",
      category: "Medical Oncology",
      tags: ["breast cancer", "obesity", "weight management", "nutrition", "India"],
      image: IMG1,
      imageAlt: "Woman discussing breast cancer risk and weight management with a clinician",
      status: "published",
      featured: true,
      seoTitle: "Breast Cancer and Obesity: Risks, Treatment and Recovery in India",
      seoDescription:
        "Understand how obesity affects breast cancer risk, treatment outcomes, surgery and recovery. Learn about weight management, nutrition, exercise and breast cancer treatment in India.",
      canonical: `https://gaf.healthcare/blogs/${SLUG}`,
      ogImage: IMG1,
      allowIndex: true,
      keywords: [
        "Breast cancer and obesity",
        "Obesity and breast cancer risk",
        "excess weight and breast cancer",
        "breast cancer treatment in obese patients",
        "obesity after breast cancer diagnosis",
        "weight management during breast cancer treatment",
        "breast cancer recovery and weight loss",
        "breast cancer treatment in India",
      ],
      relatedLinks: [
        { label: "Prevention", href: PREV },
        { label: "Surgery", href: SURGERY },
        { label: "Chemotherapy", href: CHEMO },
        { label: "Treatment in India", href: TX },
        { label: "Cost guide", href: COST },
      ],
      blocks,
    },
    [
      ["breast-cancer-obesity-overview.webp", "Woman discussing breast cancer risk and weight management with a clinician"],
      ["breast-cancer-obesity-metabolism.webp", "Abstract illustration of fat tissue metabolism insulin and inflammation pathways"],
      ["breast-cancer-obesity-nutrition.webp", "Dietitian reviewing a balanced Indian meal plan with a breast cancer patient"],
      ["breast-cancer-obesity-recovery.webp", "Breast cancer survivor walking with a physiotherapist during recovery"],
    ],
  );
  updateLlms(SLUG, "breast cancer and obesity");
  linkRelated(SLUG, "Breast cancer and obesity", relatedBase);
  console.log("wrote", SLUG, "blocks", blocks.length);
}

// ───────────────────────── 3) DIABETES ─────────────────────────
{
  n = 0;
  const SLUG = "breast-cancer-and-diabetes";
  const IMG1 = "/uploads/articles/breast-cancer-diabetes-overview.webp";
  const IMG2 = "/uploads/articles/breast-cancer-diabetes-glucose.webp";
  const IMG3 = "/uploads/articles/breast-cancer-diabetes-surgery.webp";
  const IMG4 = "/uploads/articles/breast-cancer-diabetes-recovery.webp";
  const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>Can diabetic women be treated?</strong></td><td>Yes — manage cancer and glucose together</td></tr><tr><td><strong>Risk link</strong></td><td>Modest association with type 2 diabetes, especially after menopause</td></tr><tr><td><strong>Surgery</strong></td><td>Often safe after glucose/comorbidity assessment</td></tr><tr><td><strong>Steroids/chemo</strong></td><td>Dexamethasone can raise blood sugar substantially</td></tr><tr><td><strong>Never</strong></td><td>Stop diabetes medicines on your own around surgery</td></tr><tr><td><strong>Planning</strong></td><td><a href="${TX}">Treatment</a> · <a href="${SURGERY}">surgery</a> · <a href="${COST}">cost</a></td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>Diabetes</strong> is part of breast cancer care planning — not a barrier by itself.</p></aside>`;
  const preopTable = `<div class="md-body"><table><thead><tr><th>Assessment</th><th>Why it matters</th></tr></thead><tbody><tr><td>HbA1c</td><td>Average glucose over recent months</td></tr><tr><td>Glucose checks</td><td>Current control</td></tr><tr><td>Kidney function</td><td>Medicines and anaesthesia</td></tr><tr><td>Blood pressure / heart</td><td>Surgical risk</td></tr><tr><td>Medication review</td><td>Plan fasting and peri-op changes</td></tr></tbody></table></div>`;
  const costComp = `<div class="md-body"><table><thead><tr><th>Cost component</th><th>What may be included</th></tr></thead><tbody><tr><td>Cancer consultation</td><td>Surgeon and oncology visits</td></tr><tr><td>Diabetes consultation</td><td>Endocrinology / diabetology</td></tr><tr><td>Diagnostics</td><td>Imaging, biopsy, pathology</td></tr><tr><td>Pre-op assessment</td><td>Cardiac, kidney, anaesthesia</td></tr><tr><td>Surgery / systemic / radiation</td><td>As per plan</td></tr></tbody></table></div>`;
  const faqs = [
    ["Does diabetes increase breast cancer risk?", "Some studies show a modest link with type 2 diabetes after menopause; shared risk factors matter. Diabetes does not cause every breast cancer."],
    ["Can diabetic women have surgery?", "Yes, after assessing glucose control and complications."],
    ["Does high sugar affect recovery?", "Poor control can delay healing and raise infection risk."],
    ["Can chemotherapy raise blood sugar?", "Yes — especially with corticosteroids such as dexamethasone."],
    ["Can diabetic women receive hormone therapy?", "Yes; monitor metabolic health during long-term therapy."],
    ["Is radiation safe?", "Diabetes does not automatically block radiation; monitor skin and healing."],
    ["Can treatment cause new diabetes?", "Some targeted drugs (e.g. PI3K inhibitors) and rarely immunotherapy can cause hyperglycaemia or new-onset diabetes."],
    ["Should medicines stop before surgery?", "Some need temporary holds (e.g. selected SGLT2 inhibitors). Follow the treating team — do not self-stop."],
    ["What HbA1c is required?", "No single universal cut-off; balance control vs cancer urgency."],
    ["Can insulin be used with chemotherapy?", "Yes; many patients need temporary insulin around steroids."],
    ["Does diabetes make cancer more aggressive?", "Not automatically — subtype, grade and stage drive behaviour."],
    ["Can international patients travel?", "Often yes after fitness-to-travel and medication planning."],
    ["What glucose symptoms need urgent care?", "Thirst, polyuria, vomiting, confusion, rapid breathing — seek urgent help."],
    ["Should supplements be started?", "Not without oncology approval."],
    ["Does diabetes determine prognosis?", "Comorbidities can affect outcomes; individual prognosis depends on many factors."],
  ];
  const blocks = [
    html(qa),
    p("Women with diabetes can receive effective breast cancer treatment when glucose and comorbidities are managed alongside oncology care. Related: [surgery](" + SURGERY + "), [chemotherapy](" + CHEMO + "), [hormone therapy](" + HORM + "), [treatment](" + TX + ")."),
    btn("Ask GAF about breast cancer with diabetes", consult("Breast Cancer Treatment")),
    p("[WhatsApp +91 90443 46292 with cancer and diabetes records](" + wa("Please advise on breast cancer treatment for a patient with diabetes in India.") + ")"),
    img(IMG1, "Woman with diabetes discussing breast cancer treatment planning with a clinician", "Manage cancer treatment and blood glucose together."),
    h2("Is There a Connection?"),
    p("Research links type 2 diabetes and breast cancer, especially after menopause, via shared factors: age, obesity, inactivity, insulin resistance and inflammation. Most women with diabetes will not get breast cancer; many breast cancer patients do not have diabetes."),
    h2("How Treatment Affects Blood Sugar"),
    img(IMG2, "Abstract pancreas and glucose pathway illustration for cancer treatment hyperglycaemia", "Steroids, some targeted drugs and immunotherapy can affect glucose."),
    ul(["**Corticosteroids** (e.g. dexamethasone) raise glucose via insulin resistance and hepatic glucose output", "**Chemotherapy** alters appetite, hydration and activity", "**PI3K inhibitors** (e.g. alpelisib) can cause marked hyperglycaemia", "**Immunotherapy** rarely causes immune-mediated insulin-deficient diabetes"]),
    h2("Surgery With Diabetes"),
    img(IMG3, "Surgeon counselling a woman with diabetes before breast cancer surgery", "Pre-operative glucose and comorbidity review makes surgery safer."),
    p("Diabetes does not automatically prevent lumpectomy, mastectomy, sentinel node procedures or selected reconstruction. Poor control can impair healing and raise infection risk. Do not unnecessarily delay cancer surgery — balance optimisation with urgency."),
    html(preopTable),
    p("Medicines such as metformin or SGLT2 inhibitors may need peri-operative holds per protocol. **Never change diabetes medicines independently.**"),
    btn("Request a pre-op oncology + diabetes review", consult("Breast Cancer Surgery")),
    h2("Chemotherapy, Radiation and Hormone Therapy"),
    p("Diabetes alone does not mandate chemo dose cuts. Steroid days often need more glucose checks and sometimes temporary insulin. Radiation is usually feasible with skin/wound attention. Endocrine therapy continues when indicated with metabolic monitoring. See [chemotherapy](" + CHEMO + "), [radiation](" + RAD + "), [hormone therapy](" + HORM + ")."),
    h2("Recovery, Monitoring and Diet"),
    img(IMG4, "Woman recovering after breast cancer treatment with dietitian support for diabetes", "Wound care, infection vigilance and nutrition support recovery."),
    ul(["Watch wound infection signs and fever during neutropenia risk periods", "Document baseline neuropathy before neurotoxic chemo", "Cardiac review when HER2 therapy or cardiotoxic regimens are used", "Individualise glucose monitoring; HbA1c alone misses day-to-day swings"]),
    p("Diet: adequate protein, controlled carbohydrate quality/portioning, fluids; adjust for nausea. No single “cancer + diabetes diet” cures either disease."),
    h2("Treatment and Cost in India"),
    html(costComp),
    html(costPathway("Diabetes may add consultations and monitoring — ask whether these are in the written estimate.")),
    btn("Request an itemised estimate", consult("Breast Cancer Treatment Cost")),
    p("Carry cancer + diabetes records (HbA1c, medicines/insulin, kidney/heart reports). [International patients](" + INTL + "). Specialists: [medical oncology](" + MED + "), [surgical oncology](" + SURG + "), [radiation oncology](" + RADDOC + ")."),
    btn("Coordinate diabetic breast cancer care in India", consult("Breast Cancer Treatment")),
    p("[WhatsApp +91 90443 46292 for coordination](" + wa("Please coordinate breast cancer treatment for a diabetic patient in India.") + ")"),
    h2("Checklist"),
    ul(["Share full diabetes history and HbA1c", "Ask about steroid/glucose effects", "Get written peri-op medicine instructions", "Know infection and severe hyperglycaemia warning signs", "Plan oncology + diabetes follow-up"]),
    h2("Frequently Asked Questions"),
    ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),
    h2("Conclusion"),
    p("**Managing diabetes is part of helping patients receive appropriate cancer care safely** — not a separate afterthought."),
    h2("Medical Sources and References"),
    ul([
      "[ADA Standards of Care](https://diabetesjournals.org/care)",
      "[NCI Diabetes in Patients with Cancer](https://www.ncbi.nlm.nih.gov/books/NBK575925/)",
      "[NCI Breast Cancer Treatment PDQ](https://www.cancer.gov/types/breast/hp/breast-treatment-pdq)",
      "[ACS Breast Cancer Treatment](https://www.cancer.org/cancer/types/breast-cancer/treatment.html)",
      "[WHO Breast Cancer Fact Sheet](https://www.who.int/news-room/fact-sheets/detail/breast-cancer)",
    ]),
    p("*Medical disclaimer: Educational only. Do not change diabetes or cancer medicines without your treating team.*"),
    h2("Related Reading"),
    ul([`[Surgery](${SURGERY})`, `[Chemotherapy](${CHEMO})`, `[Hormone therapy](${HORM})`, `[Treatment](${TX})`, `[Obesity & breast cancer](/blogs/breast-cancer-and-obesity)`]),
  ];
  upsertArticle(
    {
      id: "art_breast_cancer_and_diabetes",
      slug: SLUG,
      title: "Breast Cancer and Diabetes: How Diabetes Affects Cancer Risk, Treatment, Surgery and Recovery in India",
      excerpt:
        "Women with diabetes can receive effective breast cancer treatment, but managing blood sugar and existing health conditions is an important part of care. This guide explains the relationship between diabetes and breast cancer, treatment considerations, surgical risks, chemotherapy-related blood sugar changes and recovery.",
      date: "15 November 2026",
      publishedAt: "2026-11-15T20:20:00.000Z",
      updatedAt: now,
      author: "GAF Healthcare clinical desk",
      category: "Medical Oncology",
      tags: ["breast cancer", "diabetes", "blood sugar", "surgery", "India"],
      image: IMG1,
      imageAlt: "Woman with diabetes discussing breast cancer treatment planning with a clinician",
      status: "published",
      featured: true,
      seoTitle: "Breast Cancer and Diabetes: Treatment, Risks and Care in India",
      seoDescription:
        "Learn how diabetes affects breast cancer risk, surgery, chemotherapy, radiation and recovery. Understand blood sugar management and breast cancer treatment options in India.",
      canonical: `https://gaf.healthcare/blogs/${SLUG}`,
      ogImage: IMG1,
      allowIndex: true,
      keywords: [
        "Breast cancer and diabetes",
        "Breast cancer treatment in diabetic patients",
        "diabetes and breast cancer risk",
        "breast cancer surgery with diabetes",
        "chemotherapy and diabetes",
        "blood sugar during cancer treatment",
        "breast cancer recovery in diabetic women",
        "breast cancer treatment in India",
      ],
      relatedLinks: [
        { label: "Surgery", href: SURGERY },
        { label: "Chemotherapy", href: CHEMO },
        { label: "Hormone therapy", href: HORM },
        { label: "Treatment in India", href: TX },
        { label: "Obesity and breast cancer", href: "/blogs/breast-cancer-and-obesity" },
      ],
      blocks,
    },
    [
      ["breast-cancer-diabetes-overview.webp", "Woman with diabetes discussing breast cancer treatment planning with a clinician"],
      ["breast-cancer-diabetes-glucose.webp", "Abstract pancreas and glucose pathway illustration for cancer treatment hyperglycaemia"],
      ["breast-cancer-diabetes-surgery.webp", "Surgeon counselling a woman with diabetes before breast cancer surgery"],
      ["breast-cancer-diabetes-recovery.webp", "Woman recovering after breast cancer treatment with dietitian support for diabetes"],
    ],
  );
  updateLlms(SLUG, "breast cancer and diabetes");
  linkRelated(SLUG, "Breast cancer and diabetes", relatedBase);
  console.log("wrote", SLUG, "blocks", blocks.length);
}

// ───────────────────────── 4) OLDER WOMEN ─────────────────────────
{
  n = 0;
  const SLUG = "breast-cancer-in-older-women";
  const IMG1 = "/uploads/articles/breast-cancer-older-women-overview.webp";
  const IMG2 = "/uploads/articles/breast-cancer-older-women-screening.webp";
  const IMG3 = "/uploads/articles/breast-cancer-older-women-treatment.webp";
  const IMG4 = "/uploads/articles/breast-cancer-older-women-geriatric.webp";
  const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><div class="md-body"><table><thead><tr><th>Question</th><th>Quick Answer</th></tr></thead><tbody><tr><td><strong>Can older women be treated?</strong></td><td>Yes — decisions by fitness and cancer biology, not age alone</td></tr><tr><td><strong>Screening after 75</strong></td><td>Individualise; symptoms always need assessment</td></tr><tr><td><strong>Surgery after 70</strong></td><td>Often possible after medical assessment</td></tr><tr><td><strong>Chemotherapy</strong></td><td>Selected patients; use geriatric assessment</td></tr><tr><td><strong>Hormone therapy</strong></td><td>Common for hormone receptor-positive disease</td></tr><tr><td><strong>Planning</strong></td><td><a href="${TX}">Treatment</a> · <a href="${SCREEN}">screening</a> · <a href="${COST}">cost</a></td></tr></tbody></table></div><p class="article-quick-answer__body"><strong>Age alone</strong> should not decide breast cancer treatment.</p></aside>`;
  const markerTable = `<div class="md-body"><table><thead><tr><th>Test</th><th>What it tells the doctor</th></tr></thead><tbody><tr><td>ER</td><td>Hormone therapy relevance</td></tr><tr><td>PR</td><td>Progesterone receptor status</td></tr><tr><td>HER2</td><td>HER2-targeted therapy relevance</td></tr><tr><td>Ki-67 / grade</td><td>Proliferation and behaviour clues</td></tr></tbody></table></div>`;
  const geriTable = `<div class="md-body"><table><thead><tr><th>Assessment area</th><th>Why it matters</th></tr></thead><tbody><tr><td>Physical function</td><td>Mobility and daily activities</td></tr><tr><td>Cognition</td><td>Treatment adherence and safety</td></tr><tr><td>Comorbidities / medicines</td><td>Interactions and risk</td></tr><tr><td>Nutrition / social support</td><td>Recovery and logistics</td></tr></tbody></table></div>`;
  const faqs = [
    ["Can a woman develop breast cancer after 70?", "Yes. Risk rises with age; new breast changes still need evaluation."],
    ["First signs in older women?", "New lump, nipple changes, skin dimpling/swelling, armpit lump — pain is not required."],
    ["Should women over 75 continue mammography?", "Individualise by health, preference and whether treatment would be pursued if cancer is found. Symptoms still need diagnostics."],
    ["Can an 80-year-old have surgery?", "Yes if medically fit and benefits justify risks."],
    ["Is chemotherapy safe over 70?", "For selected patients after assessing benefit, organs, frailty and preferences."],
    ["Treatment without surgery?", "Primary endocrine therapy may be considered for some unfit patients with hormone receptor-positive disease — not automatically equal to surgery."],
    ["Is cancer more aggressive in older women?", "Not necessarily — biology and stage matter more than age."],
    ["Hormone therapy options?", "Tamoxifen or aromatase inhibitors based on risks (clots, bone density, uterus)."],
    ["Does treatment cost less in India?", "Costs vary; compare itemised estimates."],
    ["Ignore a painless lump?", "No."],
    ["Can cancer return?", "Yes; follow-up remains important."],
    ["Is cure possible?", "Early-stage disease can be treated with curative intent in many older women."],
    ["What is geriatric assessment?", "Structured review of function, cognition, comorbidities, medicines, nutrition and support."],
    ["Can radiation be omitted?", "Sometimes in selected favourable early cases on endocrine therapy after informed discussion."],
    ["HER2 therapy in older women?", "Possible with cardiac assessment and monitoring."],
  ];
  const blocks = [
    html(qa),
    p("Breast cancer can affect women after 60, 70 or 80. Treatment should reflect tumour biology and fitness — not age alone. Related: [screening](" + SCREEN + "), [symptoms](" + SYMP + "), [surgery](" + SURGERY + "), [treatment](" + TX + ")."),
    btn("Ask GAF about breast cancer care after 60", consult("Breast Cancer Treatment")),
    p("[WhatsApp +91 90443 46292 with age, reports and comorbidities](" + wa("Please advise on breast cancer treatment options for an older woman in India.") + ")"),
    img(IMG1, "Older woman discussing breast cancer symptoms and treatment options with a clinician", "Getting older raises risk — it does not make breast changes “normal”."),
    h2("Why Risk Rises With Age"),
    p("Age is a major risk factor, but breast cancer is not an inevitable part of ageing. New lumps or nipple/skin changes should never be dismissed as age-related."),
    h2("Symptoms"),
    ul(["New lump or thickening", "Size/shape change", "Nipple inversion, discharge, scaling", "Skin dimpling, redness, peau d'orange", "Armpit swelling", "Persistent unexplained pain with other changes"]),
    p("See [symptoms](" + SYMP + ")."),
    h2("Does Cancer Behave Differently?"),
    p("Many older women have hormone receptor-positive disease, but HER2-positive, triple-negative and other types also occur. Biopsy and biomarkers guide therapy ([diagnosis tests](" + DIAG2 + "))."),
    h2("Screening After 60 and 75"),
    img(IMG2, "Older woman preparing for mammography-based breast cancer screening", "Screening decisions after 75 should be individualised; symptoms always need assessment."),
    p("USPSTF 2024: mammography every 2 years for average-risk women 40–74 (US guidance). After 75, evidence is insufficient for a universal routine recommendation; India’s 2024 screening guidelines also emphasise health, preference and willingness/ability to treat. **Stopping routine screening ≠ ignoring symptoms.**"),
    btn("Discuss screening after 70", consult("Breast Cancer Screening")),
    h2("Diagnosis"),
    ol(["Clinical exam", "Mammography ± ultrasound", "MRI when selected", "Core biopsy", "ER/PR/HER2 and staging as indicated"]),
    html(markerTable),
    h2("Treatment Options"),
    img(IMG3, "Older woman reviewing surgery radiation and hormone therapy choices with an oncologist", "Fit older patients may receive standard multimodal care."),
    ul([
      "**Surgery** — lumpectomy or mastectomy; sentinel node may be omitted in selected favourable cases when it would not change management",
      "**Radiation** — common after conservation; may be omitted in selected favourable early cases on endocrine therapy after discussion",
      "**Chemotherapy** — based on subtype/benefit/fitness, not age alone",
      "**Hormone therapy** — cornerstone for HR+ disease; monitor bones/clots",
      "**HER2 therapy / immunotherapy** — when indicated with organ monitoring",
    ]),
    p("Details: [surgery](" + SURGERY + "), [radiation](" + RAD + "), [chemotherapy](" + CHEMO + "), [hormone therapy](" + HORM + ")."),
    btn("Talk through treatment options", consult("Breast Cancer Treatment")),
    h2("Surgery After 70 and Geriatric Assessment"),
    img(IMG4, "Older woman completing a geriatric mobility assessment with a physiotherapist", "Geriatric assessment makes systemic therapy safer and more personalised."),
    p("Many women over 70 undergo surgery safely after heart/lung, diabetes, medicines, mobility, nutrition and cognition review."),
    html(geriTable),
    p("ASCO global geriatric assessment guidance supports evaluating older adults considering systemic therapy. Primary endocrine therapy alone is for selected unfit HR+ patients — discuss trade-offs."),
    h2("Cost and International Care"),
    html(costPathway("Costs depend on stage, modalities, stay and comorbidity management — request an itemised estimate.")),
    btn("Request a written estimate", consult("Breast Cancer Treatment Cost")),
    p("Bring imaging, biopsy/IHC, staging, medication lists and comorbidity reports. [International patients](" + INTL + "). Specialists: [medical oncology](" + MED + "), [surgical oncology](" + SURG + "), [radiation oncology](" + RADDOC + ")."),
    btn("Coordinate care for older patients in India", consult("Breast Cancer Treatment")),
    p("[WhatsApp +91 90443 46292 for coordination](" + wa("Please coordinate breast cancer treatment for an older patient in India.") + ")"),
    h2("Family Support and Questions to Ask"),
    ul(["Help with appointments and medicine lists without removing autonomy", "Ask about type/stage/biomarkers, expected benefit, comorbidity impact, geriatric assessment, side effects, duration and cost"]),
    h2("Frequently Asked Questions"),
    ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),
    h2("Conclusion"),
    p("**The right treatment is not always the most intensive — it is the one that offers meaningful benefit while respecting health, priorities and quality of life.**"),
    h2("Medical Sources and References"),
    ul([
      "[NCI Breast Cancer Treatment](https://www.cancer.gov/types/breast/treatment)",
      "[NCI Breast Cancer Screening](https://www.cancer.gov/types/breast/screening)",
      "[USPSTF Breast Cancer Screening 2024](https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/breast-cancer-screening)",
      "[ASCO Geriatric Assessment Global Guideline](https://ascopubs.org/doi/10.1200/GO-25-00276)",
      "[WHO Breast Cancer Fact Sheet](https://www.who.int/news-room/fact-sheets/detail/breast-cancer)",
      "[ICMR Breast Cancer Guidelines](https://www.icmr.gov.in/icmrobject/custom_data/pdf/resource-guidelines/Breast_Cancer.pdf)",
    ]),
    p("*Medical disclaimer: Educational only. Treatment must be individualised by qualified specialists.*"),
    h2("Related Reading"),
    ul([`[Screening](${SCREEN})`, `[Symptoms](${SYMP})`, `[Surgery](${SURGERY})`, `[Treatment](${TX})`, `[Family history](/blogs/breast-cancer-and-family-history)`]),
  ];
  upsertArticle(
    {
      id: "art_breast_cancer_in_older_women",
      slug: SLUG,
      title: "Breast Cancer in Older Women: Symptoms, Screening, Diagnosis, Treatment and Care After 60",
      excerpt:
        "Breast cancer can affect women at any age, including after 60, 70 or 80. This guide explains the warning signs, screening decisions, diagnostic tests and treatment options for older women, with a focus on individualised cancer care and treatment in India.",
      date: "15 November 2026",
      publishedAt: "2026-11-15T20:30:00.000Z",
      updatedAt: now,
      author: "GAF Healthcare clinical desk",
      category: "Medical Oncology",
      tags: ["breast cancer", "older women", "elderly", "screening", "India"],
      image: IMG1,
      imageAlt: "Older woman discussing breast cancer symptoms and treatment options with a clinician",
      status: "published",
      featured: true,
      seoTitle: "Breast Cancer in Older Women: Symptoms, Screening and Treatment in India",
      seoDescription:
        "Learn about breast cancer in older women, including symptoms after 60, mammography, diagnosis, treatment options, recovery, costs and care in India.",
      canonical: `https://gaf.healthcare/blogs/${SLUG}`,
      ogImage: IMG1,
      allowIndex: true,
      keywords: [
        "Breast cancer in older women",
        "Breast cancer after 60",
        "breast cancer in elderly women",
        "breast cancer symptoms in older women",
        "breast cancer treatment in elderly patients",
        "breast cancer screening after 70",
        "breast cancer treatment in India",
        "mammography for older women",
        "breast cancer surgery in elderly women",
      ],
      relatedLinks: [
        { label: "Screening", href: SCREEN },
        { label: "Symptoms", href: SYMP },
        { label: "Surgery", href: SURGERY },
        { label: "Treatment in India", href: TX },
        { label: "Family history", href: "/blogs/breast-cancer-and-family-history" },
      ],
      blocks,
    },
    [
      ["breast-cancer-older-women-overview.webp", "Older woman discussing breast cancer symptoms and treatment options with a clinician"],
      ["breast-cancer-older-women-screening.webp", "Older woman preparing for mammography-based breast cancer screening"],
      ["breast-cancer-older-women-treatment.webp", "Older woman reviewing surgery radiation and hormone therapy choices with an oncologist"],
      ["breast-cancer-older-women-geriatric.webp", "Older woman completing a geriatric mobility assessment with a physiotherapist"],
    ],
  );
  updateLlms(SLUG, "breast cancer in older women");
  linkRelated(SLUG, "Breast cancer in older women", relatedBase);
  console.log("wrote", SLUG, "blocks", blocks.length);
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("done articles", store.articles.length);
