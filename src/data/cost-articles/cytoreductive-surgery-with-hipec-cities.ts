import type { CityEditorial } from "./types";

/**
 * City overlays for Cytoreductive Surgery with HIPEC.
 * Named faculty are catalog records with explicit CRS + HIPEC / HIPEC tags.
 * Bengaluru currently has none. Gynaecologic cytoreduction without a HIPEC tag
 * is not listed as a HIPEC specialist here.
 */

export const cytoreductiveSurgeryWithHipecCities: CityEditorial[] = [
  {
    citySlug: "delhi-ncr",
    ecosystem:
      "Delhi NCR currently carries the densest CRS + HIPEC tagging on GAF Healthcare: Indraprastha Apollo (Dr. Asit Arora, Dr. Harit Kumar Chaturvedi, Dr. Nikhil Agrawal), BLK-Max (Dr. Abhishek Aggarwal, Dr. Manish Jain), Max Smart (Dr. SVS Deo, Dr. Saroj Rajan), Fortis Memorial (Dr. Rama Joshi; GI: Dr. Amit Javed), Fortis Noida (Dr. Jalaj Baxi), Fortis Escorts (Dr. Kushal Bairoliya), Artemis (Dr. Tapan Singh Chauhan) and Apollo Athenaa (Dr. Rupinder Sekhon). That density matters because HIPEC pharmacy, circuit hardware and leak-aware ICU have to sit on the same plot as the cytoreduction — not in a second city.",
    logistics:
      "Indira Gandhi International has the widest long-haul map. A Gurugram Fortis or Artemis letter and an Apollo or Max south Delhi letter are different hotel belts for a stay of [STAY] plus hotel step-down. Pin lodging to the operating campus, not to Aerocity. Winter air quality is a recovery fact if you remain three to four weeks; it does not change the HIPEC fee.",
    costNote:
      "Ask which NCR campus the letter is written against, which HIPEC agent is named, which organ resections are assumed, and how many high-dependency nights are inside. Campus tier inside NCR moves the letter more than the city label.",
    page: {
      seoTitle: "CRS + HIPEC Cost in Delhi NCR, India: Specialists & Hospitals",
      seoDescription:
        "Cytoreductive surgery with HIPEC cost in Delhi NCR follows the India planning range of [INDIA_COST] and a stay of [STAY]. Compare listed Gurugram and Delhi HIPEC campuses and how to request a personalized estimate.",
      heading: "Cytoreductive Surgery with HIPEC Cost in Delhi NCR, India",
      subtitle:
        "Compare CRS + HIPEC planning ranges in Delhi NCR, including how HIPEC pharmacy, tumour burden and Gurugram versus south Delhi campus choice can change a hospital quotation.",
      intro: [
        "Delhi NCR is where most international HIPEC dossiers on this site are first compared, because the named CRS + HIPEC listing is the widest, and because staging CT, complete cytoreduction, HIPEC circuit and leak-aware ICU can usually be discussed in the same metro without a second visa.",
        "The live question on camera is not 'do you do HIPEC' as a brochure. It is whether a complete cytoreduction looks plausible, which agent would be used, and whether the letter is actually CRS + HIPEC. Named tags include Dr. Asit Arora, Dr. Harit Kumar Chaturvedi and Dr. Nikhil Agrawal at Apollo Delhi; Dr. Abhishek Aggarwal and Dr. Manish Jain at BLK-Max; Dr. SVS Deo and Dr. Saroj Rajan at Max Smart; Dr. Rama Joshi and GI Dr. Amit Javed at Fortis Memorial; Dr. Jalaj Baxi at Fortis Noida; Dr. Kushal Bairoliya at Fortis Escorts; Dr. Tapan Singh Chauhan at Artemis; and Dr. Rupinder Sekhon at Apollo Athenaa. Placement is not a ranking.",
        "Gurugram and south Delhi are different hotel belts for [STAY] plus hotel recovery. Daily ward visits from Aerocity to Fortis Gurugram is a poor pairing after an eight-to-fourteen-hour sitting.",
        "NCR quotations split because staging PET-CT, HIPEC pharmacy and theatre can sit in different buildings. Ask whether the named drug is inside, how long perfusion runs, and how many ICU nights the letter actually names.",
        "If the written plan is cytoreduction without HIPEC, use the neighbouring CRS sheet. Gynaecologic cytoreduction without a HIPEC tag is a different letter.",
        "International-patient desks in NCR are used to African, Gulf and Central Asian files. Invitation letters that mention a possible extra week after CRS + HIPEC are routine — use that, then still open the CT on camera with the operating surgeon.",
        "Treat Gurugram, south Delhi, Noida and Faridabad as different quotations even when the brand name matches. A Max Smart letter and a Fortis Gurugram letter are not a blended NCR HIPEC average.",
        "Second opinions inside NCR are a day trip if you already live next to one campus — useful when two houses name different HIPEC agents.",
      ],
      answer: [
        "CRS + HIPEC in Delhi NCR is planned against the India catalog range of [INDIA_COST] and a stay of [STAY]. We do not publish a separate NCR tariff. Completeness of cytoreduction, HIPEC protocol and campus tier move the letter more than the city label.",
        "Budget on top for NCR geography and a companion who can stay three to five weeks.",
      ],
      costExplanation: [
        "Flagship letters from Gurugram or south Delhi sit toward the upper half of the national band when a complete cytoreduction, several organ resections, a named HIPEC agent, a private room and named high-dependency nights are in the plan.",
        "Companion living costs in Aerocity or Gurugram for four weeks are typically among the higher of the five cities.",
        "Ask whether HIPEC pharmacy is billed from the same campus that operates, or from a sister plot.",
      ],
      factors: [
        { label: "Densest named HIPEC listing", detail: "Multiple NCR surgical oncologists and one GI listing carry CRS + HIPEC tags. Confirm who would operate and which agent is planned." },
        { label: "HIPEC drug on the letter", detail: "This sheet assumes CRS + HIPEC. A CRS-only estimate belongs on the neighbouring page." },
        { label: "Which NCR campus", detail: "Gurugram, south Delhi and Noida are not interchangeable ICU floors, pharmacies or hotel belts." },
        { label: "Four-week geography", detail: "Pin lodging to the operating campus. Aerocity is convenient to the airport, not to daily step-down visits after HIPEC." },
      ],
      medicalTourism: [
        "Arrival is almost always IGI, then a 40 to 90 minute transfer. Do not schedule theatre for the morning after a 2 a.m. landing.",
        "Write the medical visa for [STAY] plus hotel recovery and a possible extra week.",
        "Second opinions inside NCR are a morning if you already live next to one campus.",
      ],
      hospitalDiscussion: [
        "Listed NCR campuses with named HIPEC tags include Indraprastha Apollo, BLK-Max, Max Smart, Fortis Memorial, Fortis Noida, Fortis Escorts, Artemis and Apollo Athenaa. Accreditation is on each profile as published.",
        "Ask whether the ICU has managed leaks after CRS + HIPEC, whether the circuit is run on that plot, and which address is on the letter. Listing is not a claim of volume.",
        "Doctor cards below are NCR-filtered. They are not a ranking of Delhi HIPEC surgeons.",
      ],
      faqs: [
        { q: "What is the cost of CRS + HIPEC in Delhi NCR?", a: "Plan against [INDIA_COST] and stay of [STAY]. Delhi NCR does not have a separate verified city tariff. Completeness of cytoreduction, HIPEC protocol and campus tier move the estimate more than the city name." },
        { q: "Which doctors in Delhi NCR are listed for HIPEC?", a: "Named surgical-oncology and GI listings currently sit at Apollo Delhi, BLK-Max, Max Smart, Fortis Memorial, Fortis Noida, Fortis Escorts, Artemis and Apollo Athenaa. Meet the person who would operate. Placement is not a league table." },
        { q: "Should we use the CRS-only page?", a: "If the written plan does not include HIPEC, yes. This page is CRS + HIPEC as quoted." },
        { q: "Should we stay in Gurugram or south Delhi?", a: "Stay next to the operating campus. A stay of [STAY] plus hotel step-down does not forgive an Aerocity-to-Gurugram commute." },
        { q: "How long should we stay in Delhi NCR?", a: "Hospital stay is typically [STAY] for CRS + HIPEC as quoted. Plan further hotel days until the named surgeon is content you can fly." },
      ],
    },
  },
  {
    citySlug: "mumbai",
    ecosystem:
      "Mumbai currently has three named CRS + HIPEC tags: Dr. Rajesh Shinde at Apollo Hospitals Navi Mumbai, Dr. Amit Chakraborty at Wockhardt, and GI Dr. Swapnil Sharma at Wockhardt. That is a harbour shortlist, not a metro-wide HIPEC directory. Gynaecologic cytoreduction without a HIPEC tag is a neighbouring sitting.",
    logistics:
      "Traffic, not kilometres, governs a stay of [STAY] plus hotel. Pair the hotel to the operating campus. Treat Navi Mumbai as a separate city. Monsoon weeks are a poor time to add a leak-related readmission commute after heated intraperitoneal chemotherapy.",
    costNote:
      "Surgical estimates sit on the national band. The Mumbai-specific extra is usually four weeks of hotel and the harbour commute — among the highest companion costs of the five cities.",
    page: {
      seoTitle: "CRS + HIPEC Cost in Mumbai, India: Specialists & Hospitals",
      seoDescription:
        "Cytoreductive surgery with HIPEC cost in Mumbai follows the India planning range of [INDIA_COST]. Compare listed Apollo Navi Mumbai and Wockhardt HIPEC tags, harbour logistics, and how to request a personalized estimate.",
      heading: "Cytoreductive Surgery with HIPEC Cost in Mumbai, India",
      subtitle:
        "Compare CRS + HIPEC planning ranges in Mumbai against a three-name HIPEC list and harbour geography: Wockhardt on one side, Apollo Navi Mumbai on the other.",
      intro: [
        "Mumbai is the city families choose when they want a named CRS + HIPEC listing on this site and are willing to pay for that in traffic and in four weeks of hotel bills.",
        "Named catalog consultants currently are Dr. Rajesh Shinde at Apollo Hospitals Navi Mumbai, Dr. Amit Chakraborty at Wockhardt, and GI Dr. Swapnil Sharma at Wockhardt. Three names is a finite private shortlist across the harbour, not an infinite Mumbai HIPEC directory.",
        "The harbour split is the planning fact a stay of [STAY] punishes hardest. A Wockhardt letter and a Navi Mumbai apartment are not interchangeable. Ask which address — and which HIPEC agent — is on the estimate before you rent.",
        "If the written plan is cytoreduction without HIPEC, use the neighbouring CRS sheet. This family band is CRS + HIPEC as quoted.",
        "Companion living costs over four weeks are typically the highest of the five listed cities. That does not change the surgical fee. It changes whether completing systemic therapy here is cheaper than flying home between stages.",
        "Monsoon scheduling is a cost issue for leak-related readmission after HIPEC. If you can choose a date, avoid peak July unless the family will sit tight next to the hospital.",
        "After discharge, local trains are a poor plan for a companion after CRS + HIPEC. If the letter is Navi Mumbai, do not keep the family in Bandra because the restaurants look familiar.",
        "Mumbai rewards the family that rents next to the operating campus and asks whether HIPEC pharmacy is on that plot. It punishes the family that treats Mumbai hospitals as interchangeable pins across the harbour.",
      ],
      answer: [
        "CRS + HIPEC in Mumbai is planned against [INDIA_COST] and [STAY] in hospital — the India catalog band, not a Mumbai-only tariff. Named HIPEC listings currently sit at Apollo Navi Mumbai and Wockhardt.",
        "Budget extra for accommodation. A multi-week companion stay in Mumbai is typically the most expensive of the five listed cities.",
      ],
      costExplanation: [
        "Letters still split on completeness of cytoreduction, HIPEC agent and named ICU nights. What inflates the trip is living cost across the harbour over [STAY] plus hotel.",
        "Navi Mumbai quotes should be read as Navi Mumbai logistics, including where the HIPEC circuit actually runs.",
        "Monsoon slack is a real line for a leak week after heated chemotherapy.",
      ],
      factors: [
        { label: "Three named HIPEC tags", detail: "Apollo Navi Mumbai and Wockhardt currently carry tagged names. Confirm who would operate and which agent is planned." },
        { label: "Mumbai versus Navi Mumbai", detail: "Different campuses, different hotel markets, possibly different pharmacies. The estimate should name the operating address." },
        { label: "HIPEC versus CRS-only", detail: "Neighbouring GAF sheet when HIPEC is not named." },
        { label: "Four-week hotel inflation", detail: "Companion living costs here are typically the highest of the five cities." },
      ],
      medicalTourism: [
        "Most families land at CSMIA and transfer 45 to 90 minutes. Do not book same-week theatre after a long-haul flight into peak traffic.",
        "Write the visa for [STAY] plus hotel recovery. Mention a possible extra week after HIPEC.",
        "Harbour geography is the planning fact. A Wockhardt letter and a Navi Mumbai hotel are two cities for a 2 a.m. leak call.",
      ],
      hospitalDiscussion: [
        "Listed Mumbai campuses with named CRS + HIPEC tags are Apollo Hospitals Navi Mumbai and Wockhardt Hospital. Accreditation is on each profile as published.",
        "Ask whether the ICU has managed leaks after CRS + HIPEC and whether the circuit is actually run that week. Listing is not a claim of volume.",
        "Doctor cards below are Mumbai-filtered. They are not a ranking.",
      ],
      faqs: [
        { q: "How much does CRS + HIPEC cost in Mumbai?", a: "Plan against [INDIA_COST] and stay of [STAY]. Mumbai does not have a separate verified city tariff." },
        { q: "Which doctors in Mumbai are listed for HIPEC?", a: "Named catalog listings currently sit at Apollo Navi Mumbai and Wockhardt. Meet the person who would operate." },
        { q: "Is Navi Mumbai the same as Mumbai for this stay?", a: "No. Different campuses and hotel markets. The letter should name the operating address and where HIPEC is run." },
        { q: "Should we use the CRS-only page?", a: "If the written plan does not include HIPEC, yes. This page is CRS + HIPEC as quoted." },
        { q: "How long should we stay in Mumbai?", a: "Hospital stay is typically [STAY] for CRS + HIPEC as quoted. Plan further hotel days until the named surgeon is content you can fly." },
      ],
    },
  },
  {
    citySlug: "bengaluru",
    ecosystem:
      "The catalog does not currently tag a Bengaluru doctor to CRS + HIPEC, cytoreductive surgery or PIPAC. That is the site being precise, not a missing widget. Listed surgical-oncology campuses still include Apollo Bannerghatta Road, Gleneagles Hospitals Bengaluru and Medicover. Coordinators match a listed surgeon after imaging is read, then ask whether HIPEC is actually offered that week.",
    logistics:
      "Kempegowda International is north of the city; listed campuses sit south or south-east. Budget 45 to 75 minutes for the airport road. Rent near the operating campus, not near Devanahalli. Milder weather makes a stay of [STAY] plus hotel step-down easier than a Delhi winter or a Chennai summer — if a HIPEC sitting is actually on the plot.",
    costNote:
      "Serviced apartments near the southern campuses often undercut Mumbai or Gurugram hotel rates over a four-week recovery. That only helps if the matched campus actually runs CRS + HIPEC that week.",
    page: {
      seoTitle: "CRS + HIPEC Cost in Bengaluru, India: Hospitals & Planning",
      seoDescription:
        "Cytoreductive surgery with HIPEC cost in Bengaluru follows the India planning range of [INDIA_COST]. Named HIPEC consultants are matched after records review. Compare listed campuses, climate for a long recovery, and how to request an estimate.",
      heading: "Cytoreductive Surgery with HIPEC Cost in Bengaluru, India",
      subtitle:
        "Compare CRS + HIPEC planning ranges in Bengaluru, where named HIPEC tags are not yet on the catalog and a milder climate can change how a four-week recovery feels — after a peritoneal sitting is actually matched.",
      intro: [
        "Bengaluru is the city you pick when the plan is to remain for a long abdominal recovery after HIPEC without melting or freezing — but only after a coordinator has matched a listed surgeon who actually performs CRS + HIPEC that week.",
        "The catalog does not currently tag a Bengaluru doctor to CRS + HIPEC, cytoreductive surgery or PIPAC. That is precision, not a gap in the filter. Delhi NCR, Mumbai, Chennai and Hyderabad currently have named HIPEC listings. Matching here is records-first.",
        "Listed campuses on the surgical-oncology pathway still include Apollo Hospitals Bannerghatta Road, Gleneagles Hospitals Bengaluru and Medicover. A comprehensive campus is only useful if HIPEC cover is free in the week you need it. Ask that question on camera before you rent an apartment.",
        "Same-campus radiation is the Bengaluru argument when adjuvant treatment is in the plan. Confirm both estimates separately. HIPEC and radiation are different letters.",
        "The airport is the tax you pay. Families who treat Bengaluru like a compact city and book theatre after a midnight landing discover the NH44 crawl the hard way — a poor start before an eight-to-fourteen-hour sitting.",
        "Climate is the practical differentiator if a sitting is matched. A stay of [STAY] plus hotel step-down is easier here in most months than a Delhi winter or a Chennai summer. That does not make the anastomosis safer or the HIPEC protocol different.",
        "If the matched plan is cytoreduction without HIPEC, use the neighbouring CRS sheet once a Bengaluru surgeon is named. This family band is CRS + HIPEC as quoted.",
        "Bengaluru rewards the family that rents near Bannerghatta or the south-east belt after the operating campus is named. Sleeping in Devanahalli recreates a long commute every time the ward wants the attendant at 6 a.m. after HIPEC.",
      ],
      answer: [
        "CRS + HIPEC in Bengaluru is planned against [INDIA_COST] and a typical stay of [STAY] — the national catalog band. There is no separate Bengaluru surgical tariff, and no named HIPEC consultant currently on this catalog.",
        "The Bengaluru-specific saving, when there is one, is usually the living cost of a longer recovery in a milder climate — after a HIPEC sitting is actually matched.",
      ],
      costExplanation: [
        "Letters still split on completeness of cytoreduction, HIPEC agent and named ICU nights. Two or three campuses means you compare those questions properly rather than collecting a fourth brochure.",
        "Extended-stay apartments in the south are commonly cheaper per week than Mumbai or Gurugram hotels. Over four weeks that line often moves the total trip — if you are actually admitted here.",
        "Do not treat an empty named-consultant grid as a reason to invent a cheaper Bengaluru HIPEC package.",
      ],
      factors: [
        { label: "No named catalog HIPEC consultant yet", detail: "Matching is records-first. Delhi NCR, Mumbai, Chennai and Hyderabad currently have named listings." },
        { label: "Same-campus ICU and radiation", detail: "Ask whether adjuvant treatment can stay on the plot, quoted separately from HIPEC." },
        { label: "Climate for a four-week recovery", detail: "The honest Bengaluru advantage when a companion will live next to a campus that actually runs HIPEC that week." },
        { label: "Airport versus campus geography", detail: "North airport, south hospitals. Do not sleep at the airport end for ward visits after HIPEC." },
      ],
      medicalTourism: [
        "Land, sleep, then consult. Do not book same-week theatre after a midnight landing.",
        "Mention a possible extra week and adjuvant treatment on the visa letter.",
        "Kempegowda to Bannerghatta is 45 to 75 minutes. Do not treat Bengaluru as a compact city because the weather is mild.",
      ],
      hospitalDiscussion: [
        "Listed Bengaluru campuses for this surgical-oncology pathway include Apollo Hospitals Bannerghatta Road, Gleneagles Hospitals Bengaluru and Medicover Hospital Bangalore. Read each profile for accreditation as published.",
        "Ask whether CRS + HIPEC is actually offered that week, and which agent would be used. A comprehensive campus is only useful if peritoneal cover is free.",
        "Doctor cards below are Bengaluru-filtered. An empty grid for CRS + HIPEC is the catalog being precise.",
      ],
      faqs: [
        { q: "How much does CRS + HIPEC cost in Bengaluru?", a: "Plan against [INDIA_COST] and stay of [STAY]. Bengaluru does not have a separate verified city tariff." },
        { q: "Are there named HIPEC surgeons in Bengaluru on this site?", a: "Not currently as a procedure-tagged listing. Coordinators match a listed surgeon after records review." },
        { q: "Is Bengaluru a good city for a four-week recovery after HIPEC?", a: "Climate and apartments can make the stay more livable. Confirm that the matched campus actually performs CRS + HIPEC that week." },
        { q: "Where should a companion stay?", a: "Near the operating campus once it is named — typically the Bannerghatta or south-east belt — not near the airport." },
        { q: "Should we use the CRS-only page?", a: "If the matched plan does not include HIPEC, yes. This page is CRS + HIPEC as quoted." },
      ],
    },
  },
  {
    citySlug: "chennai",
    ecosystem:
      "Chennai has a compact named CRS + HIPEC list across Rela (Dr. Aiswarya Sekar), Gleneagles HealthCity (Dr. Balaji Ramani, Dr. Vimalathithan S), MGM (Dr. Sivaram Ganesamoni, Dr. S. Srivishnu) and Apollo Proton (Dr. Phanendra Kumar Gubbala). Dr. Keshavarajan G at Rela is tagged PIPAC, not HIPEC — a neighbouring sitting. Short airport transfers and an older international-patient corridor are the city's logistics advantage. Heat from April onward is the trade-off for a stay of [STAY] plus hotel after heated chemotherapy.",
    logistics:
      "Airport transfers are typically 20 to 50 minutes — the shortest of the five cities. Air-conditioned lodging next to the campus is part of the medical plan in summer, not a luxury line, especially after HIPEC when gut recovery is slow.",
    costNote:
      "Ask whether the international desk handles visa extensions in-house. Systemic chemotherapy plus CRS + HIPEC plus an extra week often outlasts a short visa window. Proton radiation, if discussed, is a neighbouring quote.",
    page: {
      seoTitle: "CRS + HIPEC Cost in Chennai, India: Specialists & Hospitals",
      seoDescription:
        "Cytoreductive surgery with HIPEC cost in Chennai follows the India planning range of [INDIA_COST]. Compare listed MGM, Rela, Gleneagles and Apollo Proton HIPEC tags, short airport transfers, and how to request an itemised estimate.",
      heading: "Cytoreductive Surgery with HIPEC Cost in Chennai, India",
      subtitle:
        "Compare CRS + HIPEC planning ranges in Chennai, where a compact named HIPEC list meets short airport transfers — and where summer heat is a recovery fact after a long peritoneal sitting.",
      intro: [
        "Chennai is the city you pick when the file is coming from the Indian Ocean rim or East Africa, you want an international desk that already speaks that paperwork, and you want named CRS + HIPEC listings rather than a coordinator's promise that someone can be found.",
        "Named catalog consultants currently include Dr. Aiswarya Sekar at Rela; Dr. Balaji Ramani and Dr. Vimalathithan S at Gleneagles HealthCity; Dr. Sivaram Ganesamoni and Dr. S. Srivishnu at MGM; and Dr. Phanendra Kumar Gubbala at Apollo Proton. Dr. Keshavarajan G at Rela is tagged PIPAC — a neighbouring sitting, not a HIPEC quotation. Placement is not a ranking.",
        "The live question is still which HIPEC agent, not a Chennai HIPEC package. If the written plan is cytoreduction without HIPEC, use the neighbouring CRS cost sheet.",
        "Families arriving from Colombo or Malé often already know this corridor. Families from colder countries sometimes underestimate April-to-July humidity until the first walk from the ward to the car after an eight-to-fourteen-hour sitting.",
        "Chennai's advantage after CRS + HIPEC is repetitive errands: drain review, feeding check, visa extension. Short transfers make those days survivable. Heat makes a four-week hotel stretch harder.",
        "Proton radiation, if discussed at Apollo Proton, is a neighbouring quote. Do not treat a HIPEC letter as a radiation package.",
        "FRRO and visa-extension desks are ordinary work here. Use them on day one if systemic therapy plus CRS + HIPEC might outlast a short visa.",
        "If a companion is coming from Sri Lanka or Bangladesh, Chennai often wins on flight frequency. That is a trip-cost fact, not a clinical ranking of Tamil Nadu HIPEC surgeons.",
      ],
      answer: [
        "CRS + HIPEC in Chennai is planned against [INDIA_COST] and [STAY] in hospital — the India catalog band. There is no separate Chennai surgical tariff.",
        "The Chennai-specific variables are transfer time (usually the shortest of the five cities) and heat if recovery sits in summer. Proton radiation and extra hospital days remain separate quotes unless named.",
      ],
      costExplanation: [
        "Surgical letters follow campus tier, completeness of cytoreduction, HIPEC agent, and named nights. Living costs are typically gentler than Mumbai. The hidden Chennai line is visa extension if systemic therapy or a leak week is added after HIPEC.",
        "Short transfers cut taxi bills and fatigue across [STAY] plus hotel.",
        "MGM, Rela, Gleneagles and Apollo Proton should be compared as named operating sites, not as Chennai hospitals in the abstract.",
      ],
      factors: [
        { label: "Compact named HIPEC list", detail: "Rela, Gleneagles, MGM and Apollo Proton currently carry CRS + HIPEC tags. Confirm who operates and which agent is used." },
        { label: "PIPAC is a neighbouring sitting", detail: "A PIPAC tag is not a CRS + HIPEC quotation." },
        { label: "Heat and a four-week recovery", detail: "Air-conditioned lodging next to the campus is not optional from April onward after HIPEC." },
        { label: "Short airport road", detail: "Typically 20 to 50 minutes. Useful for twice-daily ward visits." },
      ],
      medicalTourism: [
        "Chennai International to the listed campuses is the least punishing transfer of the five cities in ordinary traffic.",
        "Interpreters for Sri Lankan, Bangladeshi and some African languages are easier to source on this corridor. Still ask.",
        "Visa-extension paperwork is ordinary desk work. Ask whether the international desk handles that in-house.",
      ],
      hospitalDiscussion: [
        "Listed Chennai campuses with named CRS + HIPEC tags include Rela Hospital, Gleneagles HealthCity, MGM Healthcare and Apollo Proton Cancer Centre. Accreditation is on each profile as published.",
        "Ask each house whether the letter names the HIPEC drug, and how leak days are billed. Listing is not a claim of volume.",
        "Doctor cards are Chennai-filtered, not a ranking.",
      ],
      faqs: [
        { q: "How much does CRS + HIPEC cost in Chennai?", a: "Plan against [INDIA_COST] and stay of [STAY]. Chennai does not have a separate verified city tariff." },
        { q: "Which doctors in Chennai are listed for HIPEC?", a: "Named listings currently sit at Rela, Gleneagles HealthCity, MGM and Apollo Proton. Meet the person who would operate." },
        { q: "Is PIPAC the same as HIPEC in Chennai?", a: "No. PIPAC is a neighbouring sitting with a different stay. Do not treat a PIPAC tag as a CRS + HIPEC quotation." },
        { q: "Is proton therapy included?", a: "No. Proton or photon radiation, if discussed, is a neighbouring estimate." },
        { q: "When should we avoid Chennai for recovery?", a: "Peak heat is harder on a four-week hotel stretch after HIPEC. Surgery itself is performed year-round." },
      ],
    },
  },
  {
    citySlug: "hyderabad",
    ecosystem:
      "Hyderabad currently has two named CRS + HIPEC tags on GAF Healthcare: Dr. Sreekanth CN at Yashoda Hospitals Secunderabad and Dr. Umanath Nayak Karopadi at Apollo Hospital Jubilee Hills. That is a short list, not a metro-wide HIPEC directory. Apartment economics around Banjara Hills and Gachibowli often undercut Mumbai and NCR for a stay of [STAY] plus hotel — if the letter is actually written against one of those two campuses.",
    logistics:
      "Rajiv Gandhi International is typically 45 to 70 minutes from the hospital belt. Stay in Banjara Hills, Jubilee Hills or Gachibowli depending on which campus is on the letter. An outer-ring hotel near the airport recreates Bengaluru's mistake once twice-daily ward visits start after HIPEC.",
    costNote:
      "Extended-stay accommodation is generally more affordable than in Mumbai or NCR. That often changes the total trip more than any difference in surgical fee — after you know which of the two named campuses is operating and which HIPEC agent is named.",
    page: {
      seoTitle: "CRS + HIPEC Cost in Hyderabad, India: Specialists & Hospitals",
      seoDescription:
        "Cytoreductive surgery with HIPEC cost in Hyderabad follows the India planning range of [INDIA_COST]. Compare listed Yashoda Secunderabad and Apollo Jubilee Hills HIPEC tags and how to request a personalized estimate.",
      heading: "Cytoreductive Surgery with HIPEC Cost in Hyderabad, India",
      subtitle:
        "Compare CRS + HIPEC planning ranges in Hyderabad, where two named HIPEC tags currently sit at Yashoda Secunderabad and Apollo Jubilee Hills — and where apartment costs over a four-week recovery often matter more than the metro name.",
      intro: [
        "Hyderabad is the city families choose when they want a named CRS + HIPEC listing without Mumbai harbour traffic, and a four-week attendant stay that is cheaper than Gurugram — without pretending the surgical fee is a different national tariff.",
        "Named catalog consultants currently are Dr. Sreekanth CN at Yashoda Hospitals Secunderabad and Dr. Umanath Nayak Karopadi at Apollo Hospital Jubilee Hills. Two names is a shortlist, not a league table. Meet the person who would operate, and ask which HIPEC agent the letter names.",
        "Yashoda also operates Somajiguda and Hi-Tech City campuses. A Secunderabad letter and a Hi-Tech City letter are different ICU floors even when the brand matches. Ask which Yashoda address — and which pharmacy — is on the estimate.",
        "If the written plan is cytoreduction without HIPEC, use the neighbouring CRS cost sheet. This family band is CRS + HIPEC as quoted.",
        "Apartment economics around Banjara Hills, Jubilee Hills and Gachibowli often undercut Mumbai and NCR over [STAY] plus hotel step-down. That does not make a Hyderabad HIPEC sitting cheaper as surgery. It makes the companion's weeks more affordable.",
        "Rajiv Gandhi International is south of the hospital belt. Families who sleep in Shamshabad recreate the Bengaluru Devanahalli mistake. Rent for the ward door after heated chemotherapy.",
        "International desks are used to Gulf and East African files. Invitation letters that mention a possible extra week after CRS + HIPEC are ordinary — use that, then still open the CT on camera.",
        "Hyderabad rewards the family that treats Yashoda Secunderabad and Apollo Jubilee Hills as two different quotations, including two possibly different HIPEC protocols. It punishes the family that treats Hyderabad HIPEC as one pin on a map.",
      ],
      answer: [
        "CRS + HIPEC in Hyderabad is planned against [INDIA_COST] and [STAY] in hospital — the India catalog band. There is no separate Hyderabad surgical tariff.",
        "The Hyderabad-specific variables are which of the two named campuses is on the letter, which HIPEC agent is named, and apartment cost over four weeks.",
      ],
      costExplanation: [
        "Letters still split on completeness of cytoreduction, HIPEC protocol and named ICU nights. A Yashoda Secunderabad letter and an Apollo Jubilee Hills letter are not a blended Hyderabad average.",
        "Extended-stay flats are commonly cheaper per week than Mumbai or Gurugram hotels. Over four weeks that line often moves the total trip more than any small difference in surgical fee.",
        "Do not invent a third unlisted HIPEC house and call it a shortlist.",
      ],
      factors: [
        { label: "Two named CRS + HIPEC tags", detail: "Yashoda Secunderabad and Apollo Jubilee Hills. Confirm who would operate and which agent is used." },
        { label: "Which Yashoda address", detail: "Secunderabad is not Somajiguda or Hi-Tech City. The letter should name the campus and pharmacy." },
        { label: "HIPEC versus CRS-only", detail: "Neighbouring GAF sheet when HIPEC is not named." },
        { label: "Apartment economics over four weeks", detail: "Often the honest Hyderabad advantage versus Mumbai or NCR after HIPEC." },
      ],
      medicalTourism: [
        "Land, sleep, then consult. Do not book same-week theatre after a long-haul landing into the outer ring.",
        "Write the visa for [STAY] plus hotel recovery and a possible extra week.",
        "Second opinions between Secunderabad and Jubilee Hills are a morning if you already live in the hospital belt.",
      ],
      hospitalDiscussion: [
        "Listed Hyderabad campuses with named CRS + HIPEC tags are Yashoda Hospitals Secunderabad and Apollo Hospital Jubilee Hills. Accreditation is on each profile as published.",
        "Ask whether the ICU has managed leaks after CRS + HIPEC and whether the circuit is actually run that week. Listing is not a claim of volume.",
        "Doctor cards below are Hyderabad-filtered. They are not a ranking.",
      ],
      faqs: [
        { q: "How much does CRS + HIPEC cost in Hyderabad?", a: "Plan against [INDIA_COST] and stay of [STAY]. Hyderabad does not have a separate verified city tariff." },
        { q: "Which doctors in Hyderabad are listed for HIPEC?", a: "Named catalog listings currently sit at Yashoda Secunderabad and Apollo Jubilee Hills. Meet the person who would operate." },
        { q: "Are Yashoda hospitals interchangeable for HIPEC?", a: "No. The named HIPEC tag on this site is Secunderabad. Ask which campus address is on the letter." },
        { q: "Is Hyderabad cheaper than Mumbai for CRS + HIPEC?", a: "The surgical planning band is still the India catalog range. Apartment costs over four weeks are often lower here." },
        { q: "Where should a companion stay?", a: "Near the operating campus — typically Secunderabad or Jubilee Hills, depending on the letter — not at an airport hotel." },
      ],
    },
  },
];
