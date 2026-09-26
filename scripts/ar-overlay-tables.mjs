/**
 * The Arabic lookup tables the radiation-oncology overlay generator works from.
 *
 * These used to sit inside generate-ar-ro-overlays.mjs, which reads the catalog
 * and writes the CMS file the moment it is imported. That made the tables
 * unreadable to anything but the generator itself, so the glossary had no way
 * to see the terms a reviewer had already signed off on. They live here instead:
 * data only, no side effects, safe to import.
 *
 * Nothing in this file is new. Every pair is what shipped in the overlays.
 */

/** Doctor names transliterated, not translated. */
export const NAMES = {
  "Dr. Anil Kumar Anand": "د. أنيل كومار أناند",
  "Dr. Anitha Gopinath": "د. أنيثا غوبيناث",
  "Dr. Anusheel Munshi": "د. أنوشيل منشي",
  "Dr. Ashwin M Shah": "د. أشوين م. شاه",
  "Dr. B. Ramakrishna Prasad": "د. ب. راماكريشنا براساد",
  "Dr. Christopher John": "د. كريستوفر جون",
  "Dr. D. Shiva Prasad": "د. دي. شيفا براساد",
  "Dr. Debnarayan Dutta": "د. دبنارايان دوتا",
  "Dr. Dipali Bhorikar Borade": "د. ديبالي بهوريكار بوراد",
  "Dr. Dodul Mondal": "د. دودول موندال",
  "Dr. G K Jadhav": "د. جي. كيه. جادهاف",
  "Dr. K. R. Prasanna Kumar": "د. ك. ر. براسانا كومار",
  "Dr. Kalyani Premchandra": "د. كالياني بريمشاندرا",
  "Dr. Kushal Narang": "د. كوشال نارانغ",
  "Dr. M Vinay Ural": "د. م. فيناي أورال",
  "Dr. M. Janarthinakani": "د. م. جانارثيناكاني",
  "Dr. M. Suneetha": "د. م. سونيثا",
  "Dr. Mathangi J": "د. ماثانغي جيه",
  "Dr. Natarajan V": "د. ناتاراجان في",
  "Dr. P. Vijay Anand Reddy": "د. ب. فيجاي أناند ريدي",
  "Dr. Prashant Upadhyay": "د. براشانت أوبادهياي",
  "Dr. Rajeev G": "د. راجيف جي",
  "Dr. Rakesh Jalali": "د. راكيش جلالي",
  "Dr. Ranjeet Bajpai": "د. رانغيت باجباي",
  "Dr. S. Usha": "د. س. أوشا",
  "Dr. Sandeep De": "د. سانديب دي",
  "Dr. Sapna Nangia": "د. سابنا نانغيا",
  "Dr. Satyesh Nadella": "د. ساتيش ناديلا",
  "Dr. Shilpareddy Keesara": "د. شيلباريدي كيسارا",
  "Dr. Sravanthi Reddy T": "د. سرافانتي ريدي تي",
  "Dr. Sri Sai Tejaswini Muddana": "د. سري ساي تجاسويني مودانا",
  "Dr. Sridhar P S": "د. سريدار بي. إس",
  "Dr. Srinivas Chilukuri": "د. سرينيفاس تشيلوكوري",
  "Dr. Subodh Chandra Pande": "د. سوبوده تشاندرا باندي",
  "Dr. Susovan Banerjee": "د. سوسوفان بانيرجي",
  "Dr. Tejinder Kataria": "د. تجيندر كاتاريا",
  "Dr. V. Balasundaram": "د. ف. بالاسوندارام",
  "Dr. Vijay Bhasker L": "د. فيجاي بهاسكر إل",
  "Dr. Aditi Aggarwal": "د. أديتي أغاروال",
  "Dr. Amal Roy Chaudhoory": "د. أمل روي تشودوري",
  "Dr. Anbarasi Kumaresan": "د. أنباراسي كوماريسان",
  "Dr. Anita Malik": "د. أنيتا مالك",
  "Dr. Azmi Saundarya K": "د. عزمي سونداريا كيه",
  "Dr. Bharath Chandra Gurram": "د. بهارات تشاندرا غورام",
  "Dr. Charu Garg": "د. تشارو غارغ",
  "Dr. Deepak Gupta": "د. ديباك غوبتا",
  "Dr. Devashish Tripathi": "د. ديفاشيش تريباثي",
  "Dr. Divya Gupta": "د. ديفيا غوبتا",
  "Dr. Garima Singh": "د. غاريما سينغ",
  "Dr. Gowhar Ahmad Shigan": "د. غوهر أحمد شيغان",
  "Dr. Indu Bansal Aggarwal": "د. إندو بانسال أغاروال",
  "Dr. K. Kiran Kumar": "د. ك. كيران كومار",
  "Dr. Kamal Verma": "د. كمال فيرما",
  "Dr. Khushboo Rastogi": "د. خوشبو راستوغي",
  "Dr. M. R. Vishwateja": "د. م. ر. فيشواتيجا",
  "Dr. Mayur Mayank": "د. مايور مايانك",
  "Dr. Naman Utreja": "د. نامان أوتريجا",
  "Dr. Neha Kakkar": "د. نيها كاكار",
  "Dr. Neha Sehgal": "د. نيها سيغال",
  "Dr. Pradeep Kumar Karumanchi": "د. براديب كومار كارومانشي",
  "Dr. Prahlad Yathiraj": "د. براهلاد ياتيراي",
  "Dr. S Jayalakshmi": "د. س. جايالاكشمي",
  "Dr. S. Alex Antony Prasad": "د. س. أليكس أنتوني براساد",
  "Dr. Sandeep Goel": "د. سانديب غويل",
  "Dr. Sapna Manocha Verma": "د. سابنا مانوتشا فيرما",
  "Dr. Shyam Singh Bisht": "د. شيام سينغ بيشت",
  "Dr. Swarupa Mitra": "د. سواروبا ميترا",
  "Dr. Vineet Nakra": "د. فينيت ناكرا",
  "Dr. Vineeta Goel": "د. فينيتا غويل",
  "Dr. Y. Nalini": "د. ي. ناليني",
};

export const CITY_AR = {
  "Delhi NCR": "دلهي إن سي آر",
  Mumbai: "مومباي",
  Bengaluru: "بنغالور",
  Chennai: "تشيناي",
  Hyderabad: "حيدر آباد",
};

export const AIRPORT = {
  "Delhi NCR": "مطار إنديرا غاندي",
  Mumbai: "مطار شاتراباتي شيفاجي مهراج",
  Bengaluru: "مطار كيمبيغودا",
  Chennai: "مطار تشيناي الدولي",
  Hyderabad: "مطار راجيف غاندي الدولي",
};

export const LANG_CITY = {
  Mumbai: "الإنجليزية، الهندية، الماراثية",
  Bengaluru: "الإنجليزية، الكانادية، الهندية",
  Chennai: "الإنجليزية، التاميلية، الهندية",
  Hyderabad: "الإنجليزية، التيلوغو، الهندية",
  "Delhi NCR": "الإنجليزية، الهندية",
};

export const PHRASE = {
  Brachytherapy: "المعالجة الكثبية",
  "GI (Gastrointestinal) Radiation Oncology": "علاج أورام الجهاز الهضمي بالإشعاع",
  "Gynaecological Oncology": "أورام النساء",
  "Head and Neck Oncology": "أورام الرأس والعنق",
  "Medical Oncology": "علاج الأورام الطبي",
  "Medical Oncology (multidisciplinary cancer care)": "علاج الأورام الطبي ضمن فريق متعدد التخصصات",
  "Medical Oncology (supportive role in multidisciplinary cancer care)":
    "دور داعم في علاج الأورام الطبي ضمن الفريق المتعدد التخصصات",
  "Medical Oncology (supportive/concurrent treatment protocols)":
    "بروتوكولات داعمة أو متزامنة مع علاج الأورام الطبي",
  "Neuro-Oncology (Radiation)": "أورام الجهاز العصبي — مسار إشعاعي",
  "Paediatric Oncology (Radiation)": "أورام الأطفال — مسار إشعاعي",
  "Radiation Oncology": "علاج الأورام بالإشعاع",
  "Radiation Therapy for Cancer": "العلاج الإشعاعي للأورام",
  "Stereotactic Body Radiation Therapy (SBRT)": "العلاج الإشعاعي التجسيمي للجسم (SBRT)",
  "Stereotactic Radiosurgery (SRS)": "الجراحة الإشعاعية التجسيمية (SRS)",
  "Surgical Oncology (Head & Neck, Breast, GI, Thoracic)":
    "جراحة الأورام بالتنسيق (رأس وعنق، ثدي، جهاز هضمي، صدر)",
  "Surgical Oncology (collaborative cancer programme involvement)":
    "مشاركة في برنامج جراحة الأورام التعاوني",
  "3D Conformal Radiotherapy": "العلاج الإشعاعي المطابق ثلاثي الأبعاد (3D-CRT)",
  "Adjuvant Chemotherapy": "العلاج الكيميائي المساعد",
  "Advanced Radiation Therapy Techniques- 3D Conformal Radiotherapy":
    "تقنيات الإشعاع المتقدمة — العلاج الإشعاعي المطابق ثلاثي الأبعاد",
  "Advanced Radiation Therapy Techniques- Stereotactic Body Radiation Therapy (SBRT)":
    "تقنيات الإشعاع المتقدمة — العلاج الإشعاعي التجسيمي للجسم (SBRT)",
  "Based on Dr. Muddana's specialization in Radiation Oncology, her clinical focus encompasses various aspects of radiation therapy, including advanced techniques that minimize side effects while maximizing treatment efficacy:":
    "مسارها السريري يركّز على تخطيط الجرعة بحيث ينحصر الإشعاع في الهدف ويتراجع العبء على الأنسجة المجاورة:",
  "Brain Tumor Surgery (Radiation Oncology support)": "دعم إشعاعي لجراحة أورام الدماغ",
  "Breast Cancer Surgery": "جراحة سرطان الثدي — التنسيق الإشعاعي",
  "Cancer Immunotherapy": "العلاج المناعي للسرطان",
  "Cervical Cancer Surgery": "جراحة سرطان عنق الرحم — التنسيق الإشعاعي",
  "Cervical Cancer Surgery (radiation management aspect)": "إدارة الإشعاع بعد جراحة سرطان عنق الرحم",
  "Chemotherapy for Cancer": "العلاج الكيميائي للأورام",
  "Chemotherapy for Cancer (concurrent chemoradiation protocols)": "بروتوكولات الكيميائي المتزامن مع الإشعاع",
  "Chemotherapy for Solid Tumors": "العلاج الكيميائي للأورام الصلبة",
  "CyberKnife Radiosurger": "الجراحة الإشعاعية بسايبر نايف",
  "CyberKnife Radiosurgery": "الجراحة الإشعاعية بسايبر نايف",
  "Endometrial Cancer Surgery": "جراحة سرطان بطانة الرحم — التنسيق الإشعاعي",
  "External Beam Radiotherapy": "العلاج الإشعاعي الخارجي (EBRT)",
  "Gamma Knife Radiosurgery": "الجراحة الإشعاعية بغاما نايف",
  "Head & Neck Tumor Surgery": "جراحة أورام الرأس والعنق — التنسيق الإشعاعي",
  "Hormone Therapy for Breast Cancer": "العلاج الهرموني لسرطان الثدي",
  "Hormone Therapy for Gynecologic Cancers": "العلاج الهرموني لأورام النساء",
  "Hormone-Based Therapies- Hormonal Therapy for Gynaecologic Cancers": "علاجات هرمونية لأورام النساء",
  "Hypopharyngeal Cancer Surgery (radiation management aspect)": "إدارة الإشعاع لأورام البلعوم السفلي",
  "Image-Guided Radiation Therapy": "العلاج الإشعاعي الموجّه بالصور (IGRT)",
  "Image-Guided Radiation Therapy (IGRT)": "العلاج الإشعاعي الموجّه بالصور (IGRT)",
  "Immunotherapy for Solid Tumors": "العلاج المناعي للأورام الصلبة",
  "Intensity-Modulated Radiation Therapy": "العلاج الإشعاعي المعدل الشدة (IMRT)",
  "Intensity-Modulated Radiation Therapy (IMRT)": "العلاج الإشعاعي المعدل الشدة (IMRT)",
  "Interstitial Brachytherapy": "المعالجة الكثبية الخلالية",
  "Intracavitary Brachytherapy": "المعالجة الكثبية داخل التجويف",
  "Intraoperative Radiation Therapy (IORT)": "العلاج الإشعاعي أثناء الجراحة (IORT)",
  "Lung Cancer Surgery": "جراحة سرطان الرئة — التنسيق الإشعاعي",
  "Medical Oncology Treatments- Chemotherapy for Cancer": "مسارات علاج الأورام الطبي — الكيميائي",
  "Neoadjuvant Chemotherapy": "العلاج الكيميائي قبل الجراحة",
  "Ovarian Cancer Surgery": "جراحة سرطان المبيض — التنسيق الإشعاعي",
  "Palliative Chemotherapy": "العلاج الكيميائي التلطيفي",
  "Plaque Brachytherapy": "المعالجة الكثبية باللوحة",
  "Proton Beam Therapy": "العلاج بشعاع البروتون",
  "Radiation Therapy Procedures- Radiation Therapy for Cancer": "إجراءات العلاج الإشعاعي للأورام",
  "Retinoblastoma Treatment": "علاج الورم الأرومي الشبكي",
  "Specialized Radiosurgery- CyberKnife Radiosurgery": "جراحة إشعاعية متخصصة — سايبر نايف",
  "Stereotactic Body Radiation Therapy": "العلاج الإشعاعي التجسيمي للجسم (SBRT)",
  "Stereotactic Procedures- Stereotactic Body Radiation Therapy (SBRT)":
    "إجراءات تجسيمية — العلاج الإشعاعي التجسيمي للجسم (SBRT)",
  "Targeted Therapy for Cancer": "العلاج الموجّه للسرطان",
  "Total Body Irradiation (TBI)": "إشعاع الجسم الكامل (TBI)",
};

export const ORG = {
  "Association of Radiation Oncologists of India": "رابطة أطباء الأورام بالإشعاع في الهند (AROI)",
  AROI: "AROI",
  "Indian Medical Association": "الجمعية الطبية الهندية (IMA)",
  IMA: "IMA",
  "American Society for Radiation Oncology": "الجمعية الأمريكية لعلاج الأورام بالإشعاع (ASTRO)",
  "American Society of Radiation Oncology": "الجمعية الأمريكية لعلاج الأورام بالإشعاع (ASTRO)",
  ASTRO: "ASTRO",
  "Indian Society of Oncology": "الجمعية الهندية للأورام",
  "European Society for Radiotherapy and Oncology": "الجمعية الأوروبية للعلاج الإشعاعي والأورام (ESTRO)",
  ESTRO: "ESTRO",
};

/**
 * Post rank and title, longest match first.
 *
 * `en` names the English the pattern matches; it carries no logic and exists so
 * the glossary can list a rank without a reader having to read a regex. `match`
 * stays the authority for what the generator does.
 */
export const TITLE_RULES = [
  { en: "Principal Director and Head of Department of", match: /Principal Director and Head of Department of/i, male: "المدير الرئيسي ورئيس قسم", female: "المديرة الرئيسية ورئيسة قسم" },
  { en: "Principal Director & HOD", match: /Principal Director & HOD -/i, male: "المدير الرئيسي ورئيس قسم", female: "المديرة الرئيسية ورئيسة قسم" },
  { en: "Principal Director of", match: /Principal Director of/i, male: "المدير الرئيسي لـ", female: "المديرة الرئيسية لـ" },
  { en: "Group Director and Head of Department", match: /Group Director and Head of Department/i, male: "مدير المجموعة ورئيس القسم", female: "مديرة المجموعة ورئيسة القسم" },
  { en: "Senior Director and Head of Department", match: /Senior Director and Head of Department/i, male: "المدير الأول ورئيس القسم", female: "المديرة الأولى ورئيسة القسم" },
  { en: "Senior Director & HOD of", match: /Senior Director & HOD of/i, male: "المدير الأول ورئيس قسم", female: "المديرة الأولى ورئيسة قسم" },
  { en: "Senior Director", match: /Senior Director/i, male: "مدير أول", female: "مديرة أولى" },
  { en: "Associate Director - Radiation Oncology and Cancer Care", match: /Associate Director - Radiation Oncology and Cancer Care/i, male: "مدير مساعد — علاج الأورام بالإشعاع ورعاية السرطان", female: "مديرة مساعدة — علاج الأورام بالإشعاع ورعاية السرطان" },
  { en: "Associate Director", match: /Associate Director/i, male: "مدير مساعد", female: "مديرة مساعدة" },
  { en: "Vice Chairman", match: /Vice Chairman/i, male: "نائب الرئيس", female: "نائبة الرئيس" },
  { en: "Chairperson", match: /Chairperson/i, male: "رئيس القسم", female: "رئيسة القسم" },
  { en: "Chief of Radiation Oncology & Co-Chief of CyberKnife Centre", match: /Chief of Radiation Oncology & Co-Chief of CyberKnife Centre/i, male: "رئيس علاج الأورام بالإشعاع والمشارك في رئاسة مركز سايبر نايف", female: "رئيسة علاج الأورام بالإشعاع والمشاركة في رئاسة مركز سايبر نايف" },
  { en: "Head, Radiation Oncology & CyberKnife Centre (Unit II)", match: /Head, Radiation Oncology & CyberKnife Centre \(Unit II\)/i, male: "رئيس علاج الأورام بالإشعاع ومركز سايبر نايف (الوحدة الثانية)", female: "رئيسة علاج الأورام بالإشعاع ومركز سايبر نايف (الوحدة الثانية)" },
  { en: "Head of Department & Clinical Lead", match: /Head of Department & Clinical Lead/i, male: "رئيس القسم والمسؤول السريري", female: "رئيسة القسم والمسؤولة السريرية" },
  { en: "Director of Radiation Oncology", match: /Director of Radiation Oncology/i, male: "مدير علاج الأورام بالإشعاع", female: "مديرة علاج الأورام بالإشعاع" },
  { en: "Director, Department of", match: /Director, Department of/i, male: "مدير قسم", female: "مديرة قسم" },
  { en: "Director", match: /Director,/i, male: "مدير", female: "مديرة" },
  { en: "Clinical Lead & Consultant in", match: /Clinical Lead & Consultant in/i, male: "المسؤول السريري واستشاري", female: "المسؤولة السريرية واستشارية" },
  { en: "Senior Consultant Radiation Oncologist and Clinical Director", match: /Senior Consultant Radiation Oncologist and Clinical Director/i, male: "استشاري أول ومدير سريري لعلاج الأورام بالإشعاع", female: "استشارية أولى ومديرة سريرية لعلاج الأورام بالإشعاع" },
  { en: "Senior Consultant Radiation Oncologist", match: /Senior Consultant Radiation Oncologist/i, male: "استشاري أول لعلاج الأورام بالإشعاع", female: "استشارية أولى لعلاج الأورام بالإشعاع" },
  { en: "Senior Consultant & Visiting Radiation Oncologist", match: /Senior Consultant & Visiting Radiation Oncologist/i, male: "استشاري أول واستشاري زائر لعلاج الأورام بالإشعاع", female: "استشارية أولى واستشارية زائرة لعلاج الأورام بالإشعاع" },
  { en: "Senior Consultant & Clinical Advisor", match: /Senior Consultant & Clinical Advisor/i, male: "استشاري أول ومستشار سريري", female: "استشارية أولى ومستشارة سريرية" },
  { en: "Senior Consultant and In-Charge", match: /Senior Consultant and In-Charge/i, male: "استشاري أول ومسؤول القسم", female: "استشارية أولى ومسؤولة القسم" },
  { en: "Principal Consultant -", match: /Principal Consultant -/i, male: "استشاري رئيسي —", female: "استشارية رئيسية —" },
  { en: "Principal Consultant", match: /Principal Consultant/i, male: "استشاري رئيسي", female: "استشارية رئيسية" },
  { en: "HOD & Senior Consultant", match: /HOD & Senior Consultant/i, male: "رئيس القسم واستشاري أول", female: "رئيسة القسم واستشارية أولى" },
  { en: "Senior Registrar / Consultant", match: /Senior Registrar \/ Consultant/i, male: "مسجّل أول / استشاري", female: "مسجّلة أولى / استشارية" },
  { en: "Visiting Consultant", match: /Visiting Consultant/i, male: "استشاري زائر", female: "استشارية زائرة" },
  { en: "Consultant Radiation Oncologist", match: /Consultant Radiation Oncologist/i, male: "استشاري علاج الأورام بالإشعاع", female: "استشارية علاج الأورام بالإشعاع" },
  { en: "Consultant Radiation Oncology", match: /Consultant Radiation Oncology/i, male: "استشاري علاج الأورام بالإشعاع", female: "استشارية علاج الأورام بالإشعاع" },
  { en: "Consultant -", match: /Consultant -/i, male: "استشاري —", female: "استشارية —" },
  { en: "Consultant,", match: /Consultant,/i, male: "استشاري", female: "استشارية" },
  { en: "Radiation Specialist Oncologist", match: /Radiation Specialist Oncologist/i, male: "أخصائي علاج الأورام بالإشعاع", female: "أخصائية علاج الأورام بالإشعاع" },
  { en: "Radiation Oncologist", match: /Radiation Oncologist/i, male: "أخصائي علاج الأورام بالإشعاع", female: "أخصائية علاج الأورام بالإشعاع" },
  { en: "Senior Consultant", match: /Senior Consultant/i, male: "استشاري أول", female: "استشارية أولى" },
  // Bare ranks, reached once the specialty suffix has been dropped. This
  // generator only handles radiation oncology, so the specialty goes back in
  // rather than leaving a rank with no field. Last, so a longer rule wins.
  { en: "Head", match: /^Head\b,?/i, male: "رئيس قسم علاج الأورام بالإشعاع", female: "رئيسة قسم علاج الأورام بالإشعاع" },
  { en: "Chief", match: /^Chief\b.*/i, male: "رئيس علاج الأورام بالإشعاع", female: "رئيسة علاج الأورام بالإشعاع" },
  { en: "Consultant", match: /^Consultant\b/i, male: "استشاري علاج الأورام بالإشعاع", female: "استشارية علاج الأورام بالإشعاع" },
  { en: "Director (bare)", match: /^Director\b.*/i, male: "مدير علاج الأورام بالإشعاع", female: "مديرة علاج الأورام بالإشعاع" },
];

/** Applied in order to an education line; "Overseas Fellowship" must precede "Fellowship". */
export const EDUCATION_RULES = [
  { en: "Specialised Training in", match: /Specialised Training in/gi, ar: "تدريب متخصص في" },
  { en: "Specialized Training in", match: /Specialized Training in/gi, ar: "تدريب متخصص في" },
  { en: "Post-Doctorate Training in", match: /Post-Doctorate Training in/gi, ar: "تدريب ما بعد الدكتوراه في" },
  { en: "Radiation Oncology", match: /Radiation Oncology/gi, ar: "علاج الأورام بالإشعاع" },
  { en: "Radiotherapy & Oncology", match: /Radiotherapy & Oncology/gi, ar: "العلاج الإشعاعي والأورام" },
  { en: "Radiotherapy of", match: /Radiotherapy of/gi, ar: "العلاج الإشعاعي لـ" },
  { en: "Radiotherapy", match: /Radiotherapy/gi, ar: "العلاج الإشعاعي" },
  { en: "Overseas Fellowship", match: /Overseas Fellowship/gi, ar: "زمالة خارجية" },
  { en: "Fellowship", match: /Fellowship/gi, ar: "زمالة" },
  { en: "subsequently worked at", match: /subsequently worked at/gi, ar: "ثم عمل في" },
];

export const AFFILIATION_RULES = [{ en: "former", match: /\bformer\b/gi, ar: "سابقًا" }];

export const AWARD_RULES = [
  { en: "Top Radiation Oncologist of South India", match: /Top Radiation Oncologist of South India/gi, ar: "أبرز أخصائي علاج الأورام بالإشعاع في جنوب الهند" },
  { en: "Best Radiation Oncologist of South India", match: /Best Radiation Oncologist of South India/gi, ar: "أفضل أخصائي علاج الأورام بالإشعاع في جنوب الهند" },
  { en: "Gold Medallist", match: /Gold Medallist/gi, ar: "حائز على الميدالية الذهبية" },
  { en: "Gold Medalist", match: /Gold Medalist/gi, ar: "حائز على الميدالية الذهبية" },
];

/** The role a doctor is introduced by, chosen on whether they run the department. */
export const ROLE_WORDS = {
  head: { en: "Head of the radiation oncology service", male: "رئيس مسار علاج الأورام بالإشعاع", female: "رئيسة مسار علاج الأورام بالإشعاع" },
  consultant: { en: "Consultant radiation oncologist", male: "استشاري علاج الأورام بالإشعاع", female: "استشارية علاج الأورام بالإشعاع" },
};
