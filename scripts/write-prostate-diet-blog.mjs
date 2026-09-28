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
const EBRT = "/costs/India/Radiation-Oncology/EBRT";
const HT = "/costs/India/Medical-Oncology/Hormone-Therapy";
const RP = "/costs/India/Surgical-Oncology/Radical-Prostatectomy";
const RAD_DOCS = "/doctors/India/Radiation-Oncology";
const MED_DOCS = "/doctors/India/Medical-Oncology";
const RAD_HOSP = "/hospitals/India/Radiation-Oncology";
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

const qa = `<aside class="article-quick-answer"><p class="article-quick-answer__label">Quick answer</p><p class="article-quick-answer__body">There is <strong>no single prostate cancer diet that can cure cancer or replace medical treatment</strong>. However, eating well during prostate cancer treatment can help maintain muscle, support a healthy body weight, improve overall nutrition, and make it easier to cope with some treatment-related side effects.</p><p class="article-quick-answer__body">A practical eating pattern is built around <strong>vegetables, fruits, whole grains, beans, lentils, nuts, seeds, healthy fats and adequate protein</strong>. Fish, poultry and other lean protein sources can be included, while red and processed meats, highly processed foods, sugary drinks and large amounts of saturated fat should generally be limited.</p><p class="article-quick-answer__body">For men receiving <strong>hormone therapy (ADT)</strong>, nutrition becomes particularly important because treatment can affect body composition, muscle, bone health, weight and metabolic health.</p><p class="article-quick-answer__body">During treatment, however, the priority is not always weight loss. If you are losing weight, have a poor appetite or are struggling to eat, your cancer team may recommend <strong>more calories and protein</strong>, even if some of those foods would not normally be part of a weight-loss diet.</p></aside>`;

const plate = `<div class="md-body"><table><thead><tr><th>Part of meal</th><th>Examples</th></tr></thead><tbody><tr><td><strong>½ plate</strong></td><td>Vegetables and/or salad</td></tr><tr><td><strong>¼ plate</strong></td><td>Protein such as fish, beans, lentils, tofu, chicken</td></tr><tr><td><strong>¼ plate</strong></td><td>Whole grains or other high-fibre carbohydrate</td></tr><tr><td><strong>Healthy fat</strong></td><td>Nuts, seeds, olive oil or avocado</td></tr><tr><td><strong>Drink</strong></td><td>Water or another unsweetened drink</td></tr></tbody></table></div>`;

const faqs = [
  ["What is the best diet for prostate cancer?", "There is no single medically proven “best” prostate cancer diet. A plant-forward eating pattern rich in vegetables, fruits, whole grains, beans, nuts and seeds, with appropriate protein and limited processed foods, red meat, sugary drinks and excess saturated fat, is a practical evidence-based approach."],
  ["What foods should prostate cancer patients avoid?", "There is no universal forbidden-food list. It is generally sensible to limit processed meat, large amounts of red meat, highly processed foods, sugary drinks, excess added sugar, heavily charred meat and excessive saturated fat."],
  ["Are tomatoes good for prostate cancer?", "Tomatoes are nutritious and can be part of a healthy diet. They contain lycopene, but current evidence does not establish tomatoes or lycopene as a treatment for prostate cancer."],
  ["Can prostate cancer patients eat dairy?", "Yes, many can. Evidence concerning dairy and prostate cancer is mixed. Limiting high-fat dairy may be reasonable, but there is no evidence-based requirement for every prostate cancer patient to eliminate all dairy."],
  ["Should I stop drinking milk if I have prostate cancer?", "Not necessarily. Discuss your overall dairy intake, calcium needs and nutritional status with your doctor or dietitian."],
  ["Is soy safe for men with prostate cancer?", "Ordinary soy foods such as tofu, edamame and unsweetened soy milk can be part of a healthy diet. Soy foods should not be confused with high-dose isoflavone supplements."],
  ["Can sugar make prostate cancer grow faster?", "The idea that eating sugar directly “feeds” cancer and therefore eliminating all sugar cures cancer is not supported. Reducing added sugar and sugary drinks is still sensible because it helps support healthy weight and overall metabolic health."],
  ["Is red meat bad for prostate cancer?", "Large amounts of red meat are generally best limited. Processed meat should be limited even more strongly. Plant proteins, fish and lean poultry can provide alternative protein sources."],
  ["Can I eat eggs during prostate cancer treatment?", "There is not strong evidence that men with existing prostate cancer must completely eliminate eggs. If you eat eggs, they can be included as one source of protein within a varied diet."],
  ["Should I take lycopene supplements?", "Not routinely. Eating tomatoes and other vegetables is different from taking concentrated supplements. There is not enough evidence to recommend lycopene supplements as a prostate cancer treatment."],
  ["Is green tea good for prostate cancer?", "Green tea can be part of a healthy diet, but it has not been established as a treatment for prostate cancer. Concentrated green tea extracts should be discussed with your healthcare team."],
  ["Is turmeric good for prostate cancer?", "Turmeric can be used as a food spice, but concentrated curcumin supplements should not be considered a prostate cancer treatment. Discuss supplements with your oncology team."],
  ["What should I eat during hormone therapy?", "Prioritize adequate protein, vegetables, fruits, whole grains, legumes, nuts and healthy fats. Limit highly processed foods, sugary drinks and excess saturated fat. Maintaining muscle, healthy weight and bone health is particularly important during ADT."],
  ["What should I eat if I am losing weight during cancer treatment?", "Do not automatically restrict calories. You may need more protein and calories. Small frequent meals, protein-rich foods, smoothies and nutritional supplements may help when recommended by your healthcare team."],
  ["Should prostate cancer patients follow a keto diet?", "A ketogenic diet is not an established treatment for prostate cancer. Restrictive diets can also make it difficult to meet nutritional needs during treatment."],
  ["Can a vegan diet cure prostate cancer?", "No. A vegan diet can be nutritionally healthy when properly planned, but there is no evidence that becoming vegan cures prostate cancer."],
  ["Can diet prevent prostate cancer recurrence?", "No diet has been proven to guarantee prevention of recurrence. However, healthier dietary patterns are associated with better overall health and have been linked in observational research with better prostate cancer outcomes."],
  ["What should I drink during prostate cancer treatment?", "Water is usually the main choice. Unsweetened tea and coffee may also fit depending on your symptoms and treatment. If caffeine worsens urinary symptoms, reduce it."],
  ["Can I drink alcohol during prostate cancer treatment?", "Alcohol may interact with certain medicines and can worsen some treatment-related problems. Ask your oncology team whether alcohol is appropriate with your specific treatment."],
  ["Should I take vitamins during prostate cancer treatment?", "Only when there is a nutritional need or your healthcare team recommends them. High-dose supplements are not automatically beneficial and some have been associated with harm."],
];

const blocks = [
  { id: id("html"), type: "html", html: qa },
  p("This guide sits beside [Prostate Cancer Treatment in India](" + PILLAR + "), [treatment options](" + OPTIONS + "), [treatment without surgery](" + NONSURG + "), [Robotic Prostatectomy in India](" + RARP + "), [Radiation Therapy for Prostate Cancer](" + RAD + ") and [brachytherapy](" + BRACHY_BLOG + "). Diet does not replace those treatments. It supports the body while they are given."),
  p("International patients comparing [radiation oncologists](" + RAD_DOCS + ") and [medical oncologists](" + MED_DOCS + ") commonly start with [Delhi NCR](/doctors/India/Delhi-NCR/Radiation-Oncology), [Mumbai](/doctors/India/Mumbai/Medical-Oncology), [Bengaluru](/doctors/India/Bengaluru/Radiation-Oncology), [Chennai](/doctors/India/Chennai/Medical-Oncology) and [Hyderabad](/doctors/India/Hyderabad/Radiation-Oncology)."),
  btn("Ask how diet fits your prostate treatment plan", consult("Prostate Cancer Treatment in India")),
  p("[WhatsApp +91 90443 46292 with your PSA, biopsy and current diet questions](" + wa("Please review my prostate cancer records and advise on diet during treatment in India.") + ")"),
  img(
    "/uploads/articles/pca-diet-anatomy.webp",
    "Transparent male body with the digestive tract in teal and a gold highlight on the prostate in the pelvis",
    "Food does not treat the prostate the way radiation or hormone therapy does. Nutrition still supports muscle, weight and recovery while those treatments run.",
  ),

  h2("Why Diet Matters During Prostate Cancer Treatment"),
  p("Food does not work like chemotherapy, radiation therapy or hormone therapy."),
  p("There is currently no food that has been proven to destroy prostate cancer in the way a cancer treatment does."),
  p("But nutrition still matters."),
  p("Cancer treatment can affect appetite, taste, digestion, weight, muscle mass and energy levels. Poor nutrition can make it harder to maintain strength and may interfere with the body's ability to cope with treatment."),
  p("A good diet during prostate cancer treatment has several practical goals:"),
  ul([
    "Maintain a healthy body weight when possible",
    "Preserve muscle mass",
    "Provide enough protein",
    "Provide adequate calories",
    "Support bone health",
    "Support cardiovascular and metabolic health",
    "Help manage treatment side effects",
    "Prevent nutritional deficiencies",
    "Support recovery after treatment",
  ]),
  p("The right diet therefore depends partly on **what treatment you are receiving**."),
  p("A man recovering from [robotic prostatectomy](" + RARP + ") may have different nutritional priorities from someone receiving [radiation](" + RAD + ") or long-term [androgen deprivation therapy](" + HT + ")."),

  h2("What Should You Eat If You Have Prostate Cancer?"),
  p("Rather than focusing on one “superfood,” build your diet around a variety of minimally processed foods."),
  p("A useful foundation is:"),
  h3("Eat more often"),
  ul([
    "Vegetables",
    "Fruits",
    "Beans",
    "Lentils",
    "Chickpeas",
    "Whole grains",
    "Nuts",
    "Seeds",
    "Fish",
    "Lean poultry",
    "Soy foods",
    "Low-fat or unsweetened dairy, if tolerated",
    "Healthy plant oils such as olive oil",
  ]),
  h3("Eat less often"),
  ul([
    "Processed meat",
    "Large amounts of red meat",
    "Fried foods",
    "Highly processed foods",
    "Sugary drinks",
    "Foods high in added sugar",
    "Foods high in saturated fat",
    "Large portions of refined carbohydrates",
    "Heavy alcohol consumption",
  ]),
  p("The World Cancer Research Fund recommends making whole grains, vegetables, fruits and legumes a major part of the usual diet and limiting fast foods, processed foods, red meat and processed meat."),

  h2("The Prostate Cancer Plate"),
  p("A simple plate method can make dietary changes easier."),
  p("For many people, a meal can look roughly like this:"),
  html(plate),
  p("This is not a rigid medical prescription."),
  p("If you are losing weight or struggling to eat during treatment, your dietitian may recommend a more calorie-dense version."),

  h2("Best Foods to Include in a Prostate Cancer Diet"),
  h3("1. Vegetables"),
  p("Vegetables should form a major part of the diet."),
  p("Good choices include:"),
  ul([
    "Broccoli",
    "Cauliflower",
    "Cabbage",
    "Brussels sprouts",
    "Spinach",
    "Kale",
    "Carrots",
    "Bell peppers",
    "Green beans",
    "Okra",
    "Eggplant",
    "Pumpkin",
    "Tomatoes",
    "Mushrooms",
    "Leafy greens",
  ]),
  p("Cruciferous vegetables such as broccoli and cauliflower are commonly included in prostate-health dietary recommendations."),
  p("The important point is variety."),
  p("You do not need to eat broccoli every day or rely on one particular vegetable."),

  h3("2. Tomatoes and Lycopene"),
  p("Tomatoes are frequently promoted as a prostate cancer food because they contain **lycopene**, a carotenoid with antioxidant properties."),
  p("However, the evidence is more complicated than many online articles suggest."),
  p("Earlier observational research suggested that tomatoes or lycopene might reduce prostate cancer risk. More recent evidence reviewed by AICR/WCRF has not established a significant association between tomato consumption, blood lycopene levels and total or advanced prostate cancer risk."),
  p("That does not mean tomatoes are unhealthy."),
  p("They are nutritious foods that can easily fit into a balanced diet."),
  p("Good options include:"),
  ul([
    "Fresh tomatoes",
    "Tomato-based vegetable curry",
    "Tomato soup",
    "Tomato sauce",
    "Cooked tomatoes with olive oil",
  ]),
  p("You should eat tomatoes because they are nutritious—not because they are a proven prostate cancer treatment."),

  h3("3. Cruciferous Vegetables"),
  p("Broccoli, cauliflower, cabbage, kale and Brussels sprouts are rich in fibre and plant compounds."),
  p("They can be included regularly as part of a plant-forward eating pattern."),
  p("You do not need supplements containing concentrated broccoli compounds to obtain the benefits of eating vegetables."),
  p("Whole foods are generally the better starting point."),

  h3("4. Beans, Lentils and Chickpeas"),
  p("Legumes are particularly useful because they provide:"),
  ul(["Protein", "Fibre", "Complex carbohydrates", "Vitamins and minerals"]),
  p("Examples include:"),
  ul(["Dal", "Rajma", "Chana", "Black beans", "Kidney beans", "Lentils", "Chickpeas", "Peas"]),
  p("For Indian patients, traditional foods such as **dal, rajma, chole and mixed vegetable preparations** can fit very naturally into a prostate-friendly eating pattern."),
  p("There is no requirement to follow a Western or Mediterranean menu."),
  p("The principles can be adapted to local foods."),

  h3("5. Whole Grains"),
  p("Choose whole or minimally processed grains when tolerated."),
  p("Examples include:"),
  ul(["Oats", "Brown rice", "Whole-wheat roti", "Whole-grain bread", "Barley", "Quinoa", "Millets", "Buckwheat"]),
  p("Whole grains can provide fibre and help make meals more filling."),
  p("If treatment causes diarrhea or digestive problems, however, your dietitian may temporarily recommend lower-fibre choices."),

  h3("6. Fruits"),
  p("Fruit can be part of a healthy prostate cancer diet."),
  p("Good options include:"),
  ul(["Apples", "Oranges", "Guava", "Papaya", "Berries", "Pomegranate", "Kiwi", "Pears", "Bananas", "Melons", "Mango in appropriate portions"]),
  p("Whole fruit is generally preferable to fruit juice because it provides fibre and is less concentrated in naturally occurring sugar."),
  p("The WCRF recommends a diet rich in fruits and vegetables and encourages a wide variety of plant foods."),

  h3("7. Nuts and Seeds"),
  p("Nuts and seeds can provide:"),
  ul(["Protein", "Fibre", "Unsaturated fats", "Minerals"]),
  p("Useful choices include:"),
  ul(["Almonds", "Walnuts", "Pistachios", "Peanuts", "Chia seeds", "Flaxseed", "Pumpkin seeds", "Sesame seeds"]),
  p("Because nuts and seeds are calorie-dense, portion size matters if you are trying to control weight."),

  h3("8. Fish"),
  p("Fish can be a useful protein source."),
  p("Examples include:"),
  ul(["Salmon", "Sardines", "Mackerel", "Trout", "Tuna", "Local oily fish"]),
  p("Fish can provide protein and, depending on the type, omega-3 fatty acids."),
  p("It is generally better to eat fish as a food rather than relying on high-dose fish-oil supplements unless your doctor recommends supplementation."),

  h3("9. Soy Foods"),
  p("Soy is sometimes surrounded by misinformation because soy contains compounds called **isoflavones** that have weak estrogen-like activity."),
  p("Current evidence does not support the idea that ordinary soy foods should automatically be avoided by men with prostate cancer."),
  p("Foods such as:"),
  ul(["Tofu", "Tempeh", "Edamame", "Unsweetened soy milk"]),
  p("can fit into a healthy diet."),
  p("The American Cancer Society states that eating soy foods as part of a normal diet is safe and may be beneficial, while evidence for soy-isoflavone supplements is less clear."),
  p("**Food and concentrated supplements are not the same thing.**"),

  h3("10. Healthy Fats"),
  p("Not all dietary fat needs to be eliminated."),
  p("Focus on unsaturated fats from foods such as:"),
  ul(["Olive oil", "Nuts", "Seeds", "Avocado", "Fish"]),
  p("At the same time, reduce excessive saturated fat from foods such as:"),
  ul(["Fatty meats", "Butter", "Ghee in large amounts", "Cream", "Full-fat dairy", "Highly processed foods"]),
  p("The goal is not a fat-free diet."),
  p("It is a better balance of fat sources."),

  h2("What Foods Should You Limit During Prostate Cancer Treatment?"),
  p("There is no universally forbidden food list."),
  p("However, several categories are worth limiting."),
  h3("1. Processed Meat"),
  p("Processed meats include foods such as:"),
  ul(["Sausages", "Salami", "Bacon", "Ham", "Hot dogs", "Certain deli meats"]),
  p("These foods are generally high in sodium and may contain preservatives such as nitrates or nitrites."),
  p("Cancer-prevention organizations recommend limiting processed meat."),
  h3("2. Large Amounts of Red Meat"),
  p("Red meat includes:"),
  ul(["Beef", "Lamb", "Mutton", "Pork"]),
  p("You do not necessarily have to eliminate red meat completely."),
  p("The practical approach is to keep portions moderate and make plant proteins, fish and lean poultry more frequent choices."),
  p("The WCRF recommends eating moderate amounts of red meat and little, if any, processed meat."),
  h3("3. Charred and Heavily Grilled Meat"),
  p("Very high-temperature cooking that heavily chars meat can produce compounds that are undesirable from a cancer-prevention perspective."),
  p("Instead:"),
  ul([
    "Avoid heavily blackened portions",
    "Do not repeatedly burn meat",
    "Use lower-temperature cooking when practical",
    "Include vegetables and plant foods alongside protein",
  ]),
  p("The Prostate Cancer Foundation also recommends avoiding charred meats."),
  h3("4. Sugary Drinks"),
  p("Limit:"),
  ul(["Soft drinks", "Sweetened packaged juices", "Energy drinks", "Sugary tea and coffee", "Sweetened beverages"]),
  p("Whole fruit is generally a better choice than fruit juice."),
  p("Water should usually be the main drink unless your treatment team has given you different fluid instructions."),
  h3("5. Highly Processed Foods"),
  p("Examples include:"),
  ul(["Packaged snacks", "Fast food", "Deep-fried foods", "Processed desserts", "Sugary breakfast cereals", "Highly refined packaged foods"]),
  p("You do not need to remove every packaged food from your kitchen."),
  p("The goal is to make minimally processed foods the foundation of the diet."),
  h3("6. Excess Saturated Fat"),
  p("High intake of saturated fat can make it harder to maintain cardiovascular health and healthy body composition."),
  p("This matters particularly for men receiving long-term ADT, because [hormone therapy](" + HT + ") can increase metabolic and cardiovascular concerns. GAF Healthcare planning ranges for hormone therapy in India are **$1,000–$4,500**."),
  p("A practical approach is to replace some saturated fats with unsaturated fats rather than trying to eliminate all fat."),

  h2("What About Dairy Products?"),
  p("This is one of the more complicated areas of prostate cancer nutrition."),
  p("Some studies have reported associations between high dairy intake and prostate cancer risk or progression, but the evidence is not strong enough to justify telling every man with prostate cancer to eliminate dairy."),
  p("The WCRF states that evidence concerning dairy and prostate cancer is limited and chose not to make a general recommendation against dairy."),
  p("The Prostate Cancer Foundation recommends reducing high-fat dairy and notes that whole milk has been associated with worse prostate cancer outcomes in observational research. It does **not** say that all dairy must be eliminated."),
  p("If you consume dairy, reasonable choices may include:"),
  ul(["Low-fat milk", "Plain yogurt", "Low-fat curd", "Unsweetened dairy products"]),
  p("Your doctor or dietitian may recommend a different approach depending on your nutritional needs."),

  h2("What About Calcium?"),
  p("Calcium is important for:"),
  ul(["Bone health", "Muscle function", "Nerve function"]),
  p("This becomes especially relevant for men receiving long-term hormone therapy because ADT can contribute to bone loss."),
  p("Do not eliminate calcium simply because you have prostate cancer."),
  p("Instead, discuss your individual calcium and vitamin D needs with your oncology team."),
  p("Food sources include:"),
  ul(["Low-fat dairy", "Fortified plant milk", "Tofu made with calcium", "Leafy greens", "Beans", "Certain fish eaten with bones"]),
  p("The Prostate Cancer Foundation specifically notes that calcium and vitamin D are important for bone health, particularly during hormone therapy."),

  h2("Should Men With Prostate Cancer Avoid Milk?"),
  p("Not automatically."),
  p("There is no evidence-based rule that every prostate cancer patient must stop drinking milk."),
  p("If you enjoy milk and your medical team has not advised otherwise, a moderate amount can fit into an overall healthy eating pattern."),
  p("If you are concerned about saturated fat or consume large quantities of dairy, switching from whole milk to lower-fat milk or an appropriate unsweetened fortified plant alternative may be reasonable."),

  h2("Are Eggs Bad for Prostate Cancer?"),
  p("Eggs are another food that is frequently presented too simply online."),
  p("Some observational research has raised questions about egg consumption and aggressive prostate cancer, but a direct causal relationship in men who already have prostate cancer has not been firmly established."),
  p("The Prostate Cancer Foundation states that there is currently no strong evidence requiring complete exclusion of eggs for men with prostate cancer."),
  p("Eggs can therefore be considered as one protein option, especially when maintaining protein intake is important."),

  h2("Is Sugar Feeding Prostate Cancer?"),
  p("This is one of the most common cancer nutrition myths."),
  p("Your body needs glucose for normal biological functions, including the energy needs of healthy cells."),
  p("Simply eliminating sugar from your diet does not “starve” prostate cancer."),
  p("However, eating large amounts of added sugar can make it easier to gain excess weight and can displace more nutritious foods."),
  p("A better goal is to:"),
  ul([
    "Reduce sugary drinks",
    "Limit sweets and desserts",
    "Reduce highly processed foods",
    "Choose whole fruit",
    "Eat balanced meals",
  ]),
  p("The Prostate Cancer Foundation similarly recommends limiting added sugar and sugar-sweetened beverages rather than claiming that all dietary carbohydrates must be eliminated."),

  h2("Should You Follow a Keto Diet for Prostate Cancer?"),
  p("A ketogenic diet is very low in carbohydrates and high in fat."),
  p("It has attracted interest in cancer research, but it should not be presented as a proven treatment for prostate cancer."),
  p("There is not enough evidence to recommend a ketogenic diet as a replacement for established prostate cancer treatment."),
  p("It may also make it harder for some patients to consume adequate calories, fibre or other nutrients."),
  p("If you are considering a restrictive diet during cancer treatment, discuss it with your oncology team and a registered dietitian first."),

  h2("Is a Vegan Diet Better for Prostate Cancer?"),
  p("A completely vegan diet is not required."),
  p("A plant-forward diet can be very healthy, but patients do not need to eliminate every animal product to benefit from eating more plant foods."),
  p("The Prostate Cancer Foundation notes that higher-quality plant-based dietary patterns have been associated with better outcomes in observational research, while also emphasizing that patients do not need to become completely vegan."),
  p("The more practical goal is:"),
  p("**more plants, fewer highly processed foods, and better-quality protein and fat sources.**"),

  h2("What About a Mediterranean Diet?"),
  p("A Mediterranean-style eating pattern is often used as a model for healthy eating."),
  p("It typically emphasizes:"),
  ul([
    "Vegetables",
    "Fruits",
    "Whole grains",
    "Beans",
    "Nuts",
    "Seeds",
    "Olive oil",
    "Fish",
    "Moderate poultry and dairy",
    "Limited red meat",
    "Limited highly processed foods",
  ]),
  p("This pattern can be adapted easily to Indian, Middle Eastern, African or other cuisines."),
  p("You do not need to eat traditional Mediterranean dishes to follow its basic principles."),
  p("The WCRF describes Mediterranean-type patterns as generally rich in fruits, vegetables and minimally refined plant foods, with olive oil, moderate fish and poultry, and smaller amounts of red meat."),

  h2("Prostate Cancer Diet During Hormone Therapy"),
  p("Nutrition becomes especially important during **androgen deprivation therapy (ADT)**."),
  p("ADT can affect:"),
  ul([
    "Body composition",
    "Muscle mass",
    "Fat distribution",
    "Bone health",
    "Blood sugar",
    "Cholesterol",
    "Cardiovascular risk",
  ]),
  img(
    "/uploads/articles/pca-diet-adt.webp",
    "Male anatomical figure highlighting muscle, spine and hip bones with a gold band at the midsection to show body-composition change during hormone therapy",
    "Hormone therapy can change muscle, fat and bone. Protein, vegetables and calcium-rich foods matter more than a crash diet.",
  ),
  p("A diet that supports a healthy weight and adequate protein can therefore be particularly useful."),
  p("Focus on:"),
  h3("Protein"),
  p("Include protein at each meal:"),
  ul(["Fish", "Chicken", "Tofu", "Soy", "Dal", "Beans", "Lentils", "Greek yogurt or curd", "Eggs, if appropriate", "Nuts and seeds"]),
  h3("Fibre"),
  p("Choose:"),
  ul(["Vegetables", "Fruit", "Whole grains", "Beans", "Lentils", "Nuts", "Seeds"]),
  h3("Healthy fats"),
  p("Use:"),
  ul(["Olive oil", "Nuts", "Seeds", "Avocado", "Fish"]),
  h3("Limit"),
  ul(["Sugary drinks", "Refined snacks", "Processed meat", "Excess saturated fat", "Excess alcohol"]),
  p("International patients reviewing [hormone therapy in India](" + HT + ") can compare [Delhi NCR](/costs/India/Delhi-NCR/Medical-Oncology/Hormone-Therapy), [Mumbai](/costs/India/Mumbai/Medical-Oncology/Hormone-Therapy) and [Bengaluru](/costs/India/Bengaluru/Medical-Oncology/Hormone-Therapy). GAF planning ranges remain **$1,000–$4,500** unless a hospital issues a verified quotation."),
  btn("Ask about diet while on hormone therapy", consult("Hormone Therapy")),
  p("[WhatsApp +91 90443 46292 if you are on ADT and gaining or losing weight](" + wa("I am on hormone therapy for prostate cancer. Please advise on diet, muscle and bone health during treatment in India.") + ")"),

  h2("Protein: One of the Most Important Nutrients During Treatment"),
  p("Protein helps maintain muscle and other tissues."),
  p("This becomes particularly important if you:"),
  ul([
    "Are losing weight",
    "Have reduced appetite",
    "Are undergoing surgery",
    "Are receiving multiple treatments",
    "Are older",
    "Are receiving long-term hormone therapy",
    "Are physically inactive",
  ]),
  img(
    "/uploads/articles/pca-diet-protein.webp",
    "Male patient in clinic with a muscle and hip-bone overlay while a clinician reviews nutrition and recovery on a tablet",
    "If you are losing weight, the priority is more calories and protein — not a stricter clean-eating plan.",
  ),
  p("Good protein choices include:"),
  ul(["Fish", "Chicken", "Eggs", "Tofu", "Soy", "Dal", "Beans", "Lentils", "Yogurt", "Milk", "Nuts", "Seeds"]),
  p("If you are losing weight unintentionally, do not focus only on eating “clean.”"),
  p("You may need **more calories and protein**, not fewer."),
  p("NCI recommends protein- and calorie-rich foods for people experiencing appetite loss or weight loss during cancer treatment."),

  h2("What If You Are Losing Weight During Prostate Cancer Treatment?"),
  p("Unintentional weight loss deserves attention."),
  p("Do not automatically start a low-calorie diet because you have been diagnosed with cancer."),
  p("If you are losing weight:"),
  ul([
    "Eat smaller meals more frequently",
    "Add protein to meals",
    "Use calorie-dense nutritious foods",
    "Add nuts or nut butter",
    "Add avocado",
    "Use smoothies if tolerated",
    "Consider nutritional drinks if recommended",
    "Eat when your appetite is best",
    "Speak with an oncology dietitian",
  ]),
  p("NCI recommends small frequent meals and high-protein, high-calorie foods when appetite loss or weight loss is a problem."),
  btn("Share records if you are losing weight on treatment", consult("Prostate Cancer Treatment in India")),

  h2("What If You Gain Weight During Hormone Therapy?"),
  p("Weight gain can occur during ADT."),
  p("Instead of crash dieting:"),
  ul([
    "Prioritize vegetables and whole foods",
    "Keep protein adequate",
    "Reduce sugary drinks",
    "Limit highly processed snacks",
    "Watch portion sizes",
    "Choose whole grains more often",
    "Maintain regular physical activity if medically appropriate",
    "Monitor waist circumference and body weight",
  ]),
  p("If weight is increasing rapidly, discuss it with your oncology team."),
  p("Nutrition and exercise are often most effective when considered together."),

  h2("Diet During Radiation Therapy for Prostate Cancer"),
  p("[Radiation therapy](" + RAD + ") can affect bowel and urinary symptoms."),
  p("Some patients experience:"),
  ul(["Loose stools", "Increased bowel frequency", "Gas", "Bloating", "Urgency", "Urinary frequency"]),
  img(
    "/uploads/articles/pca-diet-radiation.webp",
    "Male patient on a radiation couch with a gold pelvic-bone overlay showing the treatment target in the lower abdomen",
    "Diet during radiation is not identical for everyone. Bowel and urinary symptoms decide whether fibre, fat or caffeine needs a temporary change.",
  ),
  p("The ideal diet during radiation is therefore **not identical for everyone**."),
  p("If bowel symptoms develop, your radiation oncology team or dietitian may temporarily adjust:"),
  ul(["Fibre intake", "Fat intake", "Caffeine", "Spicy foods", "Gas-producing foods", "Dairy, if lactose intolerance develops"]),
  p("Do not automatically eliminate large food groups before symptoms occur."),
  p("Your treatment team can help identify what is actually triggering your symptoms."),
  p("External beam courses in India are planned against GAF ranges of **$1,000–$6,000+** for [EBRT](" + EBRT + "). Compare [radiation hospitals](" + RAD_HOSP + ") in [Delhi NCR](/hospitals/India/Delhi-NCR/Radiation-Oncology), [Mumbai](/hospitals/India/Mumbai/Radiation-Oncology) and [Chennai](/hospitals/India/Chennai/Radiation-Oncology). [Brachytherapy](" + BRACHY_BLOG + ") has its own recovery and diet questions."),
  btn("Ask about diet during prostate radiation", consult("Radiation Therapy for Prostate Cancer")),
  p("[WhatsApp +91 90443 46292 if radiation is changing your bowel habits](" + wa("I am receiving prostate radiation. Please advise on diet if I have bowel or urinary symptoms.") + ")"),

  h2("Diet After Prostate Cancer Surgery"),
  p("After [prostatectomy](" + RARP + "), the main nutritional priorities are usually:"),
  ul([
    "Adequate protein",
    "Adequate calories",
    "Hydration",
    "Healthy weight",
    "Fibre according to bowel tolerance",
    "Recovery from surgery",
  ]),
  p("There is no special food that makes the prostate heal faster."),
  p("A balanced diet can support recovery while your body repairs itself."),
  p("If constipation develops because of reduced activity or pain medication, your doctor may recommend more fluid, fibre and physical activity when appropriate."),
  p("GAF Healthcare planning ranges for [radical prostatectomy](" + RP + ") in India are **$7,000–$18,000**. Compare [surgical hospitals](" + SURG_HOSP + ") in [Mumbai](/hospitals/India/Mumbai/Surgical-Oncology) and [Bengaluru](/hospitals/India/Bengaluru/Surgical-Oncology)."),
  p("[WhatsApp +91 90443 46292 about recovery nutrition after robotic prostatectomy](" + wa("Please advise on diet and protein after robotic prostatectomy in India.") + ")"),

  h2("What to Eat If You Have Constipation"),
  p("Constipation can occur during cancer treatment or recovery."),
  p("Depending on your treatment and medical advice, useful foods may include:"),
  ul(["Oats", "Whole grains", "Fruits", "Vegetables", "Beans", "Lentils", "Prunes", "Kiwi", "Nuts", "Seeds"]),
  p("Drink adequate fluids unless your doctor has restricted your fluid intake."),
  p("Increase fibre gradually rather than suddenly."),
  p("If constipation is severe or persistent, talk to your medical team."),

  h2("What to Eat If You Have Diarrhea"),
  p("During diarrhea, a high-fibre diet may not always be appropriate."),
  p("Your doctor or dietitian may temporarily recommend easier-to-digest foods."),
  p("Examples can include:"),
  ul(["Rice", "Bananas", "Potatoes", "Toast", "Oatmeal", "Yogurt if tolerated", "Eggs", "Lean chicken", "Soups", "Well-cooked vegetables"]),
  p("NCI recommends adapting food choices to treatment-related digestive symptoms and using easy-to-digest foods when appropriate."),
  p("Persistent diarrhea requires medical attention because dehydration and electrolyte disturbances can occur."),

  h2("What to Eat If You Have Nausea"),
  p("If treatment makes you nauseated:"),
  ul([
    "Eat small meals",
    "Avoid very large portions",
    "Choose foods with mild smells",
    "Eat slowly",
    "Keep easy snacks available",
    "Try dry foods such as crackers if tolerated",
    "Drink fluids between meals",
    "Choose foods that you personally tolerate",
  ]),
  p("NCI recommends small, frequent meals and adapting food texture and smell to individual tolerance."),

  h2("What If Food Tastes Different During Treatment?"),
  p("Cancer treatment can change taste and smell."),
  p("Some patients experience:"),
  ul(["Metallic taste", "Reduced taste", "Increased sensitivity to smells", "Foods suddenly tasting unpleasant"]),
  p("Try:"),
  ul(["Different herbs and spices", "Lemon or lime if tolerated", "Cold foods", "Smoothies", "Yogurt", "Fresh fruit", "Different protein sources"]),
  p("If meat tastes metallic, NCI suggests trying alternative protein sources such as poultry, dairy or plant-based proteins."),

  h2("Are Prostate Cancer Supplements Necessary?"),
  p("Usually, supplements should **not be used as a substitute for a healthy diet or cancer treatment**."),
  p("Popular supplements include:"),
  ul(["Lycopene", "Selenium", "Vitamin E", "Vitamin D", "Zinc", "Turmeric/curcumin", "Green tea extract", "Broccoli extracts", "Pomegranate", "Fish oil"]),
  p("The evidence for using these supplements specifically to treat prostate cancer is not strong enough to recommend them routinely."),
  p("The American Cancer Society notes that vitamin E and selenium supplements have not been shown to prevent prostate cancer, and some research has raised concerns about high-dose supplementation."),
  p("The WCRF also recommends meeting nutritional needs through food rather than using supplements for cancer prevention."),

  h2("Can I Take Vitamin D During Prostate Cancer Treatment?"),
  p("Vitamin D may be important for bone health, particularly for patients receiving ADT."),
  p("But that does not mean everyone should take high-dose vitamin D."),
  p("Your doctor may check your vitamin D level and recommend supplementation when necessary."),
  p("The Prostate Cancer Foundation specifically notes that vitamin D and calcium may be important for people receiving hormone therapy and that supplementation should be individualized."),

  h2("What About Selenium?"),
  p("Selenium is an essential nutrient, but **more is not better**."),
  p("High-dose selenium supplements should not be taken simply because you have prostate cancer."),
  p("The large SELECT trial did not show that selenium prevented prostate cancer, and the American Cancer Society advises discussing supplements with your healthcare team."),

  h2("What About Vitamin E?"),
  p("Vitamin E supplements have also been studied extensively."),
  p("The SELECT trial found that vitamin E supplementation increased prostate cancer risk rather than preventing it."),
  p("This is one reason why patients should be cautious about taking high-dose antioxidant supplements without medical advice."),
  p("Eating foods naturally rich in vitamins is different from taking concentrated supplements."),

  h2("Can Green Tea Cure Prostate Cancer?"),
  p("No."),
  p("Green tea contains compounds that have been studied in prostate cancer research."),
  p("However, evidence is not strong enough to consider green tea a treatment for prostate cancer."),
  p("You can drink unsweetened tea if you enjoy it, unless your treatment team has given you a reason to avoid it."),
  p("Do not replace prescribed treatment with concentrated green tea extracts."),

  h2("Is Turmeric Good for Prostate Cancer?"),
  p("Turmeric and its compound curcumin have attracted significant research interest."),
  p("Laboratory studies have suggested potential biological effects, but that is not the same as proving that turmeric treats prostate cancer in patients."),
  p("Using turmeric as a food spice is very different from taking concentrated curcumin supplements."),
  p("Tell your oncology team about supplements because concentrated products can interact with medicines or affect treatment safety."),

  h2("Is Pomegranate Juice Good for Prostate Cancer?"),
  p("Pomegranate has been studied in prostate cancer research, particularly in relation to PSA progression."),
  p("However, the evidence does not establish pomegranate juice as a prostate cancer treatment."),
  p("If you enjoy pomegranate, eating the fruit as part of a balanced diet is reasonable."),
  p("There is no need to consume large quantities or expensive concentrated extracts."),

  h2("Should You Avoid Carbohydrates?"),
  p("No."),
  p("Carbohydrates are an important energy source."),
  p("Good choices include:"),
  ul(["Oats", "Brown rice", "Whole-wheat roti", "Barley", "Quinoa", "Millets", "Beans", "Lentils", "Fruits"]),
  p("The better approach is to reduce highly refined and heavily processed carbohydrate sources while choosing nutrient-rich carbohydrates more often."),

  h2("What About White Rice and Roti?"),
  p("You do not need to completely eliminate them."),
  p("If you regularly eat rice or roti, consider:"),
  ul([
    "Reasonable portions",
    "More vegetables",
    "Dal or beans",
    "Fish or lean protein",
    "Whole-wheat or mixed-grain roti",
    "Brown rice or other whole grains when tolerated",
  ]),
  p("A sustainable diet is more useful than an unnecessarily restrictive one."),

  h2("Can Coffee Be Part of a Prostate Cancer Diet?"),
  p("For many people, moderate coffee consumption can fit into a healthy diet."),
  p("However, caffeine may worsen:"),
  ul(["Urinary frequency", "Urgency", "Sleep problems", "Some gastrointestinal symptoms"]),
  p("This can matter during or after prostate treatment."),
  p("If coffee makes urinary symptoms worse, reduce the amount or switch to decaffeinated coffee."),

  h2("What About Alcohol?"),
  p("Alcohol should generally be limited."),
  p("Alcohol can add calories without providing much nutritional value and can interact with some medicines or worsen certain treatment-related symptoms."),
  p("If you are receiving cancer treatment, ask your oncology team whether alcohol is appropriate with your specific medications."),

  h2("Is Intermittent Fasting Safe During Prostate Cancer Treatment?"),
  p("Intermittent fasting is increasingly popular, but it is not automatically appropriate during cancer treatment."),
  p("If you are:"),
  ul(["Losing weight", "Underweight", "Eating poorly", "Recovering from surgery", "Experiencing significant treatment side effects"]),
  p("fasting could make it harder to meet your nutritional needs."),
  p("Research into fasting and cancer treatment continues, but it should not be undertaken without discussing it with your oncology team."),

  h2("Should You Try a Juice Diet?"),
  p("A juice-only diet is not recommended as a cancer treatment."),
  p("Juicing can remove much of the fibre found in whole fruits and vegetables and may make it difficult to consume enough protein and calories."),
  p("Whole vegetables and fruits are generally more useful as part of a balanced diet."),

  h2("What About Fasting Before Chemotherapy?"),
  p("Do not fast before chemotherapy unless your oncology team specifically instructs you to do so."),
  p("Cancer treatment protocols vary."),
  p("Your nutritional needs also vary depending on the drugs, dose, treatment schedule and your current nutritional status."),

  h2("A Simple 1-Day Prostate Cancer Diet Plan"),
  p("This is an example of how a balanced diet could look."),
  p("It is **not a personalized medical diet**."),
  h3("Breakfast"),
  ul(["Oatmeal", "Berries or banana", "A small portion of walnuts", "Unsweetened milk or fortified soy milk"]),
  h3("Mid-morning"),
  ul(["Guava, apple or another whole fruit", "A handful of nuts"]),
  h3("Lunch"),
  ul(["Two whole-wheat rotis or brown rice", "Dal", "Mixed vegetables", "Salad", "Plain curd or another suitable protein source"]),
  h3("Evening"),
  ul(["Unsweetened tea", "Roasted chickpeas or a small portion of nuts"]),
  h3("Dinner"),
  ul(["Grilled fish, tofu or chicken", "Cooked vegetables", "Whole grain or a moderate portion of rice/roti"]),
  h3("If additional calories or protein are needed"),
  p("A dietitian may add:"),
  ul(["Yogurt", "Milk", "Protein-rich smoothie", "Nut butter", "Nutrition supplement drink"]),
  p("The plan should change if you have diarrhea, constipation, nausea, weight loss or other treatment-related symptoms."),

  h2("Indian Foods That Can Fit Into a Prostate Cancer Diet"),
  p("You do not need expensive “cancer foods.”"),
  p("Common Indian foods can work well."),
  h3("Protein-rich foods"),
  ul(["Dal", "Rajma", "Chole", "Moong", "Masoor", "Tofu", "Soy", "Fish", "Chicken", "Eggs", "Curd"]),
  h3("Vegetables"),
  ul(["Palak", "Bhindi", "Gajar", "Gobi", "Broccoli", "Lauki", "Tori", "Beans", "Baingan", "Capsicum", "Mixed vegetables"]),
  h3("Whole or minimally processed grains"),
  ul(["Whole-wheat atta", "Oats", "Brown rice", "Barley", "Millets", "Quinoa"]),
  h3("Healthy snacks"),
  ul(["Walnuts", "Almonds", "Roasted chana", "Fruit", "Seeds", "Unsweetened yogurt"]),
  p("The goal is not to abandon familiar food."),
  p("It is to improve the overall pattern."),

  h2("African and Middle Eastern Foods Can Also Fit"),
  p("For international patients, the same principles can be adapted to local cuisine."),
  p("Examples include:"),
  ul(["Lentils", "Chickpeas", "Beans", "Whole grains", "Vegetables", "Fish", "Lean poultry", "Nuts", "Seeds", "Fresh fruits", "Olive oil"]),
  p("Patients do not need to follow an imported “Western cancer diet.”"),
  p("A healthy dietary pattern can be built from the foods they already eat."),

  h2("What Should You Eat During Advanced Prostate Cancer?"),
  p("Advanced or metastatic prostate cancer can create additional nutritional challenges."),
  p("Treatment may include:"),
  ul([
    "[Hormone therapy](" + HT + ")",
    "Androgen-receptor pathway inhibitors",
    "Chemotherapy",
    "[Radiation](" + RAD + ")",
    "Radioligand therapy",
    "Other systemic treatments",
  ]),
  p("The nutritional priority may shift depending on symptoms and treatment."),
  p("For example, a patient losing weight may need more calories and protein rather than a strict low-fat or low-carbohydrate diet."),
  p("NCI emphasizes maintaining adequate calories and protein and preventing malnutrition during cancer treatment."),

  h2("Nutrition During Lutetium-177 PSMA Therapy"),
  p("Patients receiving **Lutetium-177 PSMA therapy** may have treatment-specific instructions regarding hydration, food, medicines and radiation safety. See [Prostate Cancer Treatment in India](" + PILLAR + ") for how this sits in the wider pathway."),
  p("These instructions vary by treatment center and radiopharmaceutical protocol."),
  p("Do not follow generic online fasting or supplement advice during radioligand therapy without checking with the nuclear medicine team."),
  p("Your treatment center's instructions take priority."),

  h2("When Should You See an Oncology Dietitian?"),
  p("Ask for a dietitian referral if you:"),
  ul([
    "Are losing weight without trying",
    "Have little appetite",
    "Are struggling to eat enough",
    "Have persistent diarrhea",
    "Have persistent constipation",
    "Have repeated nausea or vomiting",
    "Have difficulty swallowing",
    "Have diabetes and your treatment is affecting blood sugar",
    "Are receiving long-term ADT",
    "Are considering a restrictive diet",
    "Want to use supplements",
    "Are following a vegan or vegetarian diet and are concerned about protein",
    "Are preparing for major cancer treatment",
  ]),
  p("A dietitian can personalize calorie, protein, fluid and micronutrient needs."),

  h2("The Biggest Diet Mistakes to Avoid During Prostate Cancer Treatment"),
  h3("Mistake 1: Believing one food can cure cancer"),
  p("No single food has been proven to cure prostate cancer."),
  h3("Mistake 2: Cutting out all carbohydrates"),
  p("This can unnecessarily reduce energy intake."),
  h3("Mistake 3: Starting a severe fasting diet"),
  p("This can be particularly problematic if you are already losing weight."),
  h3("Mistake 4: Taking multiple supplements"),
  p("High-dose supplements can have risks and may interfere with some treatments."),
  h3("Mistake 5: Eliminating dairy completely without a replacement plan"),
  p("This can make it harder to meet calcium and protein requirements."),
  h3("Mistake 6: Focusing only on cancer and ignoring heart health"),
  p("Men with prostate cancer also need protection against cardiovascular disease, diabetes and other chronic conditions."),
  h3("Mistake 7: Trying to lose weight aggressively during treatment"),
  p("If you are already undernourished or losing muscle, aggressive calorie restriction can be harmful."),

  h2("Can Diet Reduce the Risk of Prostate Cancer Coming Back?"),
  p("Research is ongoing."),
  p("Observational studies have linked healthier dietary patterns—particularly those emphasizing plant foods and minimizing certain animal and highly processed foods—with better outcomes in some men with prostate cancer."),
  p("However, these studies do not prove that a particular food prevents recurrence."),
  p("The Prostate Cancer Foundation describes research linking healthier, more plant-forward eating patterns with lower risk of prostate cancer progression or death, while emphasizing overall dietary quality rather than a single food."),
  p("Therefore, the sensible goal is:"),
  p("**build a healthy dietary pattern rather than search for a “prostate cancer-fighting food.”**"),

  h2("Does Diet Affect PSA?"),
  p("Diet can influence overall health, but **you should not use food to try to manipulate your PSA result**."),
  p("A change in PSA should be interpreted medically."),
  p("If your PSA is rising after treatment, changing your diet is not a substitute for appropriate evaluation."),
  p("This is particularly important after prostatectomy, radiation or during active surveillance. See [treatment without surgery](" + NONSURG + ") if surveillance is still on the table."),

  h2("Can Diet Replace Prostate Cancer Treatment?"),
  p("No."),
  p("Diet cannot replace:"),
  ul([
    "[Surgery](" + RARP + ")",
    "[Radiation therapy](" + RAD + ")",
    "[Hormone therapy](" + HT + ")",
    "Chemotherapy",
    "Targeted therapy",
    "Radioligand therapy",
    "Active surveillance",
    "Other evidence-based cancer treatments",
  ]),
  p("Nutrition is supportive care."),
  p("It can help you maintain strength and overall health while your medical team treats the cancer."),

  h2("Prostate Cancer Diet: The Practical Checklist"),
  p("If you want a simple starting point, focus on these habits:"),
  h3("Eat more"),
  ul([
    "Vegetables every day",
    "Whole fruits",
    "Beans and lentils",
    "Whole grains",
    "Nuts and seeds",
    "Fish",
    "Lean protein",
    "Soy foods if you enjoy them",
    "Healthy unsaturated fats",
  ]),
  h3("Eat less"),
  ul([
    "Processed meat",
    "Large amounts of red meat",
    "Highly processed foods",
    "Sugary drinks",
    "Excess added sugar",
    "Excess saturated fat",
    "Heavily charred meat",
    "Large amounts of alcohol",
  ]),
  h3("During treatment"),
  ul([
    "Monitor weight",
    "Prioritize protein",
    "Drink enough fluid unless restricted",
    "Adjust food choices for side effects",
    "Do not start supplements without medical advice",
    "Ask about dietitian support if eating becomes difficult",
  ]),

  h2("Frequently Asked Questions"),
  ...faqs.flatMap(([q, a]) => [h3(q), p(a)]),

  h2("Final Takeaway"),
  p("The best prostate cancer diet is not a complicated list of exotic foods."),
  p("It is a **sustainable eating pattern** that provides enough calories and protein while emphasizing vegetables, fruits, whole grains, beans, nuts, seeds, fish and other nutritious protein sources."),
  p("At the same time, limit processed meat, large amounts of red meat, sugary drinks, highly processed foods and excessive saturated fat."),
  p("Most importantly, **change the diet according to the treatment situation**."),
  p("Someone losing weight during chemotherapy or advanced prostate cancer may need more calories—not fewer. Someone receiving long-term ADT may need particular attention to muscle, body weight, cardiovascular health and bone health. Someone experiencing diarrhea during radiation may temporarily need a different fibre pattern."),
  p("Nutrition should therefore work alongside cancer treatment, not compete with it."),
  p("If you have prostate cancer and want to make major dietary changes, particularly if you are losing weight, taking hormone therapy, receiving chemotherapy or using supplements, discuss the plan with your oncologist or an oncology dietitian."),

  h2("Related Prostate Cancer Resources"),
  p("For readers building a complete understanding of prostate cancer, this article links to:"),
  ul([
    "[Prostate Cancer Treatment in India](" + PILLAR + ") — the main treatment hub, including staging, PSMA PET and Lutetium-177 PSMA therapy.",
    "[Prostate Cancer Treatment Options](" + OPTIONS + ") — how teams choose between surveillance, surgery, radiation and systemic treatment.",
    "[Prostate Cancer Treatment Without Surgery](" + NONSURG + ") — active surveillance and non-surgical pathways.",
    "[Robotic Prostatectomy in India](" + RARP + ") — surgery and recovery nutrition.",
    "[Radiation Therapy for Prostate Cancer](" + RAD + ") — EBRT, IMRT, IGRT, SBRT and bowel-related diet changes.",
    "[Brachytherapy for Prostate Cancer](" + BRACHY_BLOG + ") — internal radiation and recovery.",
    "[Hormone therapy cost in India](" + HT + ") — ADT planning ranges and why muscle and bone health matter.",
  ]),

  h2("How GAF Healthcare Can Help"),
  p("GAF Healthcare coordinates international patients who want [prostate cancer treatment in India](" + PILLAR + ") and need a diet that matches the actual plan — [hormone therapy](" + HT + "), [radiation](" + RAD + "), [brachytherapy](" + BRACHY_BLOG + ") or [robotic prostatectomy](" + RARP + "). Share PSA reports, biopsy and Grade Group, current medicines, weight change and any bowel or urinary symptoms. A coordinator can arrange review with the treating team and an itemized estimate. The oncologist and dietitian make the final nutrition advice."),
  btn("Share records for a treatment and diet review", consult("Prostate Cancer Treatment in India")),
  p("[WhatsApp +91 90443 46292 with your records](" + wa("I would like to share prostate cancer records and ask about diet during treatment in India.") + ")"),

  h2("Medical Disclaimer"),
  p("This article is for educational purposes and does not replace medical advice. Nutritional needs can change significantly depending on prostate cancer stage, treatment type, weight, kidney function, diabetes, medications, appetite and other health conditions. Patients experiencing significant weight loss, difficulty eating, persistent vomiting or diarrhea, or other nutritional problems should speak with their oncology team or a qualified oncology dietitian."),

  h2("Top 5 Sources"),
  p("1. [National Cancer Institute — Nutrition During Cancer Treatment](https://www.cancer.gov/about-cancer/treatment/side-effects/nutrition) — calories, protein and adapting food to treatment side effects."),
  p("2. [World Cancer Research Fund — Evidence-Based Cancer Prevention Recommendations](https://www.wcrf.org/research-policy/evidence-for-our-recommendations/) — plant foods, red meat, processed meat and dairy evidence."),
  p("3. [Prostate Cancer Foundation — Nutrition and Prostate Cancer](https://www.pcf.org/patient-support/physical-mental-wellness/nutrition/) — plant-forward patterns, dairy, eggs, sugar and ADT-related nutrition."),
  p("4. [American Cancer Society — Prostate Cancer Prevention, Diet and Supplements](https://www.cancer.org/cancer/types/prostate-cancer/causes-risks-prevention/prevention.html) — soy foods versus supplements, selenium and vitamin E."),
  p("5. [American Institute for Cancer Research — Tomatoes, Lycopene and Prostate Cancer](https://www.aicr.org/cancer-prevention/food-facts/tomatoes/) — tomato and lycopene evidence."),
  p("**Last reviewed against the cited sources: September 2026.**"),
];

const now = "2026-09-28T06:00:00.000Z";
const SLUG = "prostate-cancer-diet";

const article = {
  id: "art_prostate_cancer_diet",
  slug: SLUG,
  title: "Prostate Cancer Diet: What to Eat and What to Limit During Treatment",
  excerpt:
    "No diet cures prostate cancer. A plant-forward pattern with enough protein can support muscle, weight and side effects during surgery, radiation and hormone therapy.",
  date: "28 September 2026",
  publishedAt: now,
  updatedAt: now,
  author: "GAF Healthcare clinical desk",
  category: "Medical Oncology",
  tags: ["prostate cancer", "diet", "nutrition", "hormone therapy", "ADT", "India"],
  image: "/uploads/articles/pca-diet-anatomy.webp",
  imageAlt:
    "Transparent male body with the digestive tract in teal and a gold highlight on the prostate in the pelvis",
  status: "published",
  featured: true,
  seoTitle: "Prostate Cancer Diet: What to Eat During Treatment",
  seoDescription:
    "What to eat and limit during prostate cancer treatment, including ADT, radiation and surgery. Protein, plant foods, dairy, supplements and India-specific meals.",
  canonical: `https://gaf.healthcare/blogs/${SLUG}`,
  ogImage: "/uploads/articles/pca-diet-anatomy.webp",
  allowIndex: true,
  keywords: [
    "prostate cancer diet",
    "prostate cancer diet during treatment",
    "what to eat with prostate cancer",
    "foods to avoid with prostate cancer",
    "ADT diet prostate cancer",
    "hormone therapy nutrition prostate",
    "prostate cancer diet India",
    "lycopene prostate cancer",
    "soy and prostate cancer",
    "protein during prostate cancer treatment",
    "diet after prostatectomy",
    "diet during prostate radiation",
  ],
  relatedLinks: [
    { label: "Prostate Cancer Treatment in India", href: PILLAR },
    { label: "Treatment options", href: OPTIONS },
    { label: "Treatment without surgery", href: NONSURG },
    { label: "Robotic Prostatectomy in India", href: RARP },
    { label: "Radiation Therapy for Prostate Cancer", href: RAD },
    { label: "Brachytherapy for Prostate Cancer", href: BRACHY_BLOG },
  ],
  blocks,
};

if (!store.categories.includes("Medical Oncology")) store.categories.push("Medical Oncology");
for (const tag of article.tags) {
  if (!store.tags.includes(tag)) store.tags.push(tag);
}
for (const [file, alt] of [
  ["pca-diet-anatomy.webp", article.imageAlt],
  [
    "pca-diet-adt.webp",
    "Male anatomical figure highlighting muscle, spine and hip bones with a gold band at the midsection to show body-composition change during hormone therapy",
  ],
  [
    "pca-diet-radiation.webp",
    "Male patient on a radiation couch with a gold pelvic-bone overlay showing the treatment target in the lower abdomen",
  ],
  [
    "pca-diet-protein.webp",
    "Male patient in clinic with a muscle and hip-bone overlay while a clinician reviews nutrition and recovery on a tablet",
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

const dietLink = { label: "Prostate cancer diet", href: DIET };
for (const siblingId of [
  "art_brachytherapy_for_prostate_cancer",
  "art_radiation_therapy_for_prostate_cancer",
  "art_robotic_prostatectomy_in_india",
  "art_prostate_cancer_treatment_without_surgery",
  "art_prostate_cancer_treatment_options_india",
]) {
  const sibling = store.articles.find((row) => row.id === siblingId);
  if (!sibling) continue;
  sibling.relatedLinks ??= [];
  if (!sibling.relatedLinks.some((row) => row.href === DIET)) {
    sibling.relatedLinks.unshift(dietLink);
  }
}

writeFileSync(cmsPath, `${JSON.stringify(store, null, 2)}\n`);
console.log("wrote", article.slug, "blocks", blocks.length);

const treatmentsPath = join(process.cwd(), "content/curated-treatments.json");
const treatments = JSON.parse(readFileSync(treatmentsPath, "utf8"));
const treatment = treatments.treatments.find((row) => row.slug === "prostate-cancer-treatment-in-india");
if (treatment?.translations?.en?.editorialBody && !treatment.translations.en.editorialBody.includes(DIET)) {
  treatment.translations.en.editorialBody = treatment.translations.en.editorialBody.replace(
    "[Prostate Cancer Treatment Options](/blogs/prostate-cancer-treatment-options-india).",
    "[Prostate Cancer Treatment Options](/blogs/prostate-cancer-treatment-options-india). Eating during treatment is covered in [Prostate Cancer Diet](/blogs/prostate-cancer-diet).",
  );
  writeFileSync(treatmentsPath, `${JSON.stringify(treatments, null, 2)}\n`);
  console.log("linked diet blog from treatment editorial");
}

const llmsPath = join(process.cwd(), "public/llms.txt");
let llms = readFileSync(llmsPath, "utf8");
if (!llms.includes("prostate-cancer-diet")) {
  llms = llms.replace(
    "and [brachytherapy for prostate cancer](https://gaf.healthcare/blogs/brachytherapy-for-prostate-cancer).",
    "and [brachytherapy for prostate cancer](https://gaf.healthcare/blogs/brachytherapy-for-prostate-cancer) and [prostate cancer diet](https://gaf.healthcare/blogs/prostate-cancer-diet).",
  );
  writeFileSync(llmsPath, llms);
  console.log("updated llms.txt");
}
