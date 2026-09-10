import type { CityEditorial } from "./types";

/**
 * City overlays for PIPAC (Pressurized Intraperitoneal Aerosol Chemotherapy).
 * Live procedure-tagged faculty currently: Dr. Keshavarajan G, Rela Hospital, Chennai.
 * Education-only PIPAC lines (not procedure tags, so they do not appear on cards):
 * Dr. Manish Jain, BLK-Max, Delhi NCR — "Certified PIPAC Surgeon";
 * Dr. Tapan Singh Chauhan, Artemis — ESSO fellowship naming HIPEC & PIPAC.
 * Do not list CRS+HIPEC surgeons as PIPAC specialists.
 */

export const pipacCities: CityEditorial[] = [
  {
    citySlug: "delhi-ncr",
    ecosystem:
      "Delhi NCR holds the densest CRS + HIPEC listing on GAF Healthcare. That density is neighbouring peritoneal surgery, not a PIPAC directory. The live PIPAC procedure tag currently sits in Chennai. In NCR, Dr. Manish Jain at BLK-Max Super Speciality Hospital has a catalog education line that reads Certified PIPAC Surgeon; that credential is not a PIPAC procedure tag, so the doctor cards on this page stay empty until mapping includes it. Dr. Tapan Singh Chauhan at Artemis holds an ESSO fellowship that names cytoreductive surgery, HIPEC and PIPAC — again education, not a PIPAC card. Named CRS + HIPEC surgeons across Gurugram, south Delhi and Noida belong on the cytoreductive surgery with HIPEC sheet.",
    logistics:
      "A PIPAC sitting is typically [STAY], not a three-week HIPEC recovery. IGI remains the usual long-haul gate, but Gurugram, Vasant Kunj, Saket, Okhla and Noida are still different hotel belts if imaging and the ward are split. Pin lodging to the campus that actually writes the sitting letter. A sequence of short admissions can mean several IGI trips rather than one mega-operation.",
    costNote:
      "There is no Delhi NCR PIPAC tariff. Use [INDIA_COST] per sitting as quoted. Ask whether the letter is laparoscopic aerosol, which drug, how many sittings are priced, and whether further cycles are separate. Do not treat a Gurugram HIPEC package as a PIPAC quote with a different heading.",
    page: {
      seoTitle: "PIPAC Cost in Delhi NCR, India | Peritoneal Aerosol Chemotherapy",
      seoDescription:
        "PIPAC cost in Delhi NCR follows the India planning range of [INDIA_COST] per sitting as quoted and a stay of [STAY]. Compare short-stay aerosol chemotherapy with HIPEC, listed NCR campuses, and how to request a personalized estimate.",
      heading: "PIPAC Cost in Delhi NCR, India",
      subtitle:
        "PIPAC in Delhi NCR is a short-stay laparoscopic aerosol sitting — not the two-to-three-week HIPEC admission many families already budget for at the same campuses. The GAF India range applies until a named hospital writes drug and cycle count. IGI, Gurugram and south Delhi still decide how you move between a two-to-five-night ward and a review hotel.",
      intro: [
        "Delhi NCR is where peritoneal dossiers on this site are most often compared, because CRS and CRS + HIPEC names are thickest here. That is neighbouring context for PIPAC, not interchangeable theatre. This sheet is Pressurized Intraperitoneal Aerosol Chemotherapy: chemotherapy delivered into the peritoneal cavity as a pressurized aerosol during a laparoscopic sitting, often as a sequence of short stays. It is not heated intraperitoneal chemotherapy after cytoreduction, and it is not cytoreductive surgery billed without HIPEC.",
        "The live doctor grid on this page is empty. GAF’s PIPAC procedure tag currently sits on Dr. Keshavarajan G at Rela Hospital in Chennai. In NCR, the catalog still records two education facts that families ask about. Dr. Manish Jain, Director and Unit Head of Gastrointestinal Oncosurgery at BLK-Max Super Speciality Hospital, has an education line that reads Certified PIPAC Surgeon. Dr. Tapan Singh Chauhan at Artemis Hospital holds an ESSO fellowship in cytoreductive surgery, HIPEC and PIPAC from Lyon. Those lines are verified catalog credentials. They are not PIPAC procedure tags, so this page does not print them as specialist cards. Send records if you want a named NCR sitting letter.",
        "A Delhi letter that opens with a PCI score, a two-week ICU plan and HIPEC perfusion is a CRS + HIPEC quote. Ask whether this sitting is laparoscopic aerosol, which drug is in the aerosol, how many sittings the figure covers, and whether further cycles are separate letters. Do not treat a Gurugram HIPEC CV as proof the same team runs PIPAC that week.",
        "Gurugram and south Delhi are different hotel belts even for [STAY]. Daily ward visits from Aerocity to Fortis Gurugram is a poor pairing after a midnight landing, whether the stay is two nights or twenty. Pin lodging to the campus that actually writes the aerosol letter.",
        "International-patient desks in NCR are used to African, Gulf and Central Asian files. Invitation letters that mention a possible return sitting six to eight weeks later are more useful for PIPAC than a three-week HIPEC visa window copied from a neighbouring brochure.",
        "Summer heat and monsoon delays still matter if you are flying in for a two-night stay with little slack. A delayed PET-CT can consume the whole admission buffer. Build a day of imaging slack that a HIPEC family would have spent in ICU.",
        "Second opinions inside NCR are a day trip if you already live next to one campus — useful when one house names PIPAC and another names CRS + HIPEC for the same films.",
        "Treat Gurugram, south Delhi, Noida and Faridabad as different quotations even when the brand name matches. A BLK-Max letter and a Fortis Gurugram letter are not a blended NCR PIPAC average, and neither is a HIPEC package retitled.",
      ],
      answer: [
        "PIPAC in Delhi NCR is planned against the India catalog range of [INDIA_COST] per sitting as quoted and a stay of [STAY]. We do not publish a separate NCR tariff. Cycle count, drug and campus tier move the letter more than the city label.",
        "The live PIPAC specialist grid is empty here. Budget on top for NCR geography and for a possible sequence of short trips rather than one three-week hotel.",
      ],
      costExplanation: [
        "Flagship NCR letters sit toward the upper half of the national band when a private room, a named aerosol agent and a stay toward five nights are in the plan — still usually one sitting, not a series.",
        "Companion living costs for [STAY] are typically lower than a four-week HIPEC hotel in Aerocity or Gurugram. A planned sequence of sittings can still add several flights and several short hotel blocks.",
        "Ask whether PIPAC pharmacy and the laparoscopic theatre sit on the same plot, or whether the letter is actually CRS + HIPEC with a different heading.",
      ],
      factors: [
        { label: "Empty PIPAC procedure grid", detail: "The live specialist tag currently sits in Chennai. NCR education lines that name PIPAC are not treated as procedure cards on this sheet." },
        { label: "PIPAC versus HIPEC on the letter", detail: "A CRS + HIPEC estimate belongs on the neighbouring page. Confirm laparoscopic aerosol, drug and cycle count." },
        { label: "Which NCR campus", detail: "Gurugram, south Delhi and Noida are not interchangeable theatres, pharmacies or hotel belts." },
        { label: "Short stay, possibly several trips", detail: "Pin lodging to the operating campus. A sequence of sittings is several IGI arrivals, not one mega-operation." },
      ],
      medicalTourism: [
        "Arrival is almost always IGI, then a 40 to 90 minute transfer. Do not schedule theatre for the morning after a 2 a.m. landing even when the sitting is only one to two hours.",
        "Write the medical visa for [STAY] plus hotel — and for a possible return sitting if the treating team already sketches a cadence.",
        "Second opinions inside NCR are a morning if you already live next to one campus. Use that when two houses name different techniques for the same scans.",
      ],
      hospitalDiscussion: [
        "Hospital cards on this page are NCR surgical-oncology campuses already on GAF Healthcare, not a claim that each house runs PIPAC that week. Ask the international desk whether the proposed sitting is PIPAC, HIPEC or CRS without HIPEC before you rent.",
        "BLK-Max is the campus attached to the Certified PIPAC Surgeon education line. Artemis is the campus attached to the ESSO fellowship that names PIPAC. Neither fact is a volume claim or a ranking. Rela in Chennai remains the procedure-tagged faculty campus on this catalog.",
        "Doctor cards below are NCR-filtered for the PIPAC procedure tag. An empty grid is catalog precision, not a ranking of Delhi peritoneal programmes.",
      ],
      faqs: [
        {
          q: "Does GAF list a PIPAC-tagged surgeon in Delhi NCR?",
          a: "Not as a live procedure tag. The PIPAC specialist card currently sits in Chennai. Dr. Manish Jain’s education at BLK-Max lists Certified PIPAC Surgeon, and Dr. Tapan Singh Chauhan’s ESSO fellowship names PIPAC; those are catalog credentials, not procedure cards on this page. Send records for a named NCR sitting letter.",
        },
        {
          q: "Is a Delhi HIPEC quote the same as a PIPAC quote?",
          a: "No. HIPEC is heated chemotherapy usually given after cytoreductive surgery, with a much longer stay. PIPAC is pressurized aerosol chemotherapy through laparoscopy, typically [STAY] per sitting. A Delhi letter that prices CRS + HIPEC is not a PIPAC estimate. Ask for the technique, drug and cycle count in writing.",
        },
        {
          q: "How much does PIPAC cost in Delhi NCR?",
          a: "Plan against [INDIA_COST] per sitting as quoted and a stay of [STAY]. Delhi NCR does not have a separate verified city tariff. Cycle count, chemotherapy protocol and campus tier move the estimate more than the city name. A HIPEC letter from Gurugram is not this sitting.",
        },
        {
          q: "Should we stay in Gurugram or south Delhi?",
          a: "Stay next to the campus that writes the sitting letter. A stay of [STAY] plus a hotel night does not forgive an Aerocity-to-Gurugram commute after a laparoscopic aerosol sitting. Pin lodging to the operating address, not to the airport hotel belt.",
        },
        {
          q: "How long should we stay in Delhi NCR for PIPAC?",
          a: "Hospital stay is typically [STAY] per sitting as quoted. Plan further hotel days until the named surgeon is content you can fly. A sequence of sittings may mean several short trips rather than one long visa copied from a HIPEC brochure.",
        },
      ],
    },
  },
  {
    citySlug: "mumbai",
    ecosystem:
      "Mumbai’s listed peritoneal faculty is CRS + HIPEC-weighted: Dr. Rajesh Shinde at Apollo Hospitals Navi Mumbai, Dr. Amit Chakraborty at Wockhardt, and GI Dr. Swapnil Sharma at Wockhardt. None of those names currently carries a PIPAC procedure tag. This page does not relabel those CVs as PIPAC specialists. Harbour geography still matters: western-suburb campuses and south-Mumbai or Navi Mumbai hospitals are not interchangeable afternoon hops in peak traffic, even when the admission is only [STAY].",
    logistics:
      "Traffic, not kilometres, governs a sequence of short stays. Pair the hotel to the campus that actually writes the aerosol letter. Treat Navi Mumbai as a separate city. Monsoon weeks (roughly June to September) can delay imaging and discharge more painfully when the stay is only a few nights and the next sitting is already calendared.",
    costNote:
      "Surgical estimates sit on the national band of [INDIA_COST] per sitting as quoted. The Mumbai-specific extra is usually harbour commute plus repeat short hotels if several sittings are planned — not a four-week HIPEC apartment unless the letter is actually HIPEC.",
    page: {
      seoTitle: "PIPAC Cost in Mumbai, India | Short-Stay Peritoneal Chemotherapy",
      seoDescription:
        "PIPAC cost in Mumbai follows the India planning range of [INDIA_COST] per sitting as quoted. Compare harbour-city travel for a sequence of short admissions, listed CRS + HIPEC names that are not PIPAC tags, and how to request an estimate.",
      heading: "PIPAC Cost in Mumbai, India",
      subtitle:
        "Mumbai PIPAC planning is a harbour-city problem of short repeat stays — not a four-week HIPEC hotel on the same peninsula. The GAF India range applies until a named campus writes sitting, drug and cycle count. Monsoon weeks and western-suburb versus south-Mumbai traffic still decide how you move between airport, scans and a two-to-five-night ward.",
      intro: [
        "Mumbai is the city families choose when they already know the harbour hospital belt and are willing to pay for that in traffic. For PIPAC, that knowledge is only useful after a house has said the sitting is laparoscopic aerosol chemotherapy — not cytoreduction plus heated chemotherapy.",
        "Named CRS + HIPEC consultants currently are Dr. Rajesh Shinde at Apollo Hospitals Navi Mumbai, Dr. Amit Chakraborty at Wockhardt, and GI Dr. Swapnil Sharma at Wockhardt. Three names is a finite private HIPEC shortlist across the harbour. None is a PIPAC procedure tag on this catalog. Placement on the neighbouring HIPEC sheet is not a ranking, and it is not a PIPAC quotation.",
        "A Mumbai letter that prices eight-to-fourteen theatre hours and a ten-to-twenty-one-night stay is a HIPEC plan. Ask whether this sitting is PIPAC, which drug is in the aerosol, and whether the figure is one sitting or a sequence. Theatre time for PIPAC is typically one to two hours per sitting.",
        "The harbour split is the planning fact a stay of [STAY] still punishes if imaging is in Parel and the ward is in Navi Mumbai. Ask which address is on the estimate before you rent. A Wockhardt letter and a Navi Mumbai apartment are not interchangeable.",
        "Companion living costs for a few nights are typically lower than a four-week HIPEC hotel. A planned sequence of sittings can still mean several Mumbai trips, each with CSIA, monsoon buffers and attendant rooms. Compare the cadence, not only the first theatre line.",
        "Monsoon scheduling is a cost issue when the stay is short and the next sitting is already on a calendar. If you can choose a date, avoid peak July unless the family will sit tight next to the hospital through a delayed discharge.",
        "After discharge, local trains are a poor plan for a companion even after laparoscopy. If the letter is Navi Mumbai, do not keep the family in Bandra because the restaurants look familiar.",
        "Mumbai rewards the family that rents next to the operating campus and asks whether the letter names PIPAC. It punishes the family that treats Mumbai hospitals as interchangeable pins across the harbour, or that treats a HIPEC brochure as an aerosol sitting.",
        "Pathology review of peritoneal biopsies in Mumbai can sit in a different building from the theatre even when the sitting is only a few hours. Ask whether the letter includes that review or whether a Parel lab bill arrives later. That split is a local billing habit, not a PIPAC protocol, and it is a reason two harbour quotes diverge without either being dishonest.",
      ],
      answer: [
        "PIPAC in Mumbai is planned against [INDIA_COST] per sitting as quoted and [STAY] in hospital — the India catalog band, not a Mumbai-only tariff. Named PIPAC procedure tags currently sit in Chennai, not on this city’s cards.",
        "Budget extra for harbour geography and for a possible sequence of short admissions. A multi-week companion stay is a HIPEC problem; a sequence of two-night hotels is a PIPAC problem.",
      ],
      costExplanation: [
        "Letters still split on drug, cycle count and named nights. What inflates the trip is living cost across the harbour if sittings repeat — among the higher companion costs of the five cities per week, even when each admission is short.",
        "Navi Mumbai quotes should be read as Navi Mumbai logistics, including where the aerosol set actually runs.",
        "Monsoon slack is a real line when the stay is only a few nights and imaging is not yet done.",
      ],
      factors: [
        { label: "No PIPAC procedure tag in Mumbai yet", detail: "Listed peritoneal names are CRS + HIPEC. Confirm who would operate and whether the sitting is aerosol chemotherapy." },
        { label: "Mumbai versus Navi Mumbai", detail: "Different campuses, different hotel markets. The estimate should name the operating address." },
        { label: "PIPAC versus HIPEC", detail: "Neighbouring GAF sheet when the letter names cytoreduction and heated chemotherapy." },
        { label: "Repeat short hotels", detail: "A sequence of sittings can exceed one HIPEC trip once flights and harbour traffic are counted." },
      ],
      medicalTourism: [
        "Most families land at CSMIA and transfer 45 to 90 minutes. Do not book same-week theatre after a long-haul flight into peak traffic, even for a one-to-two-hour sitting.",
        "Write the visa for [STAY] plus hotel. Mention a possible return sitting if the treating team already sketches a cadence.",
        "Harbour geography is the planning fact. A western-suburb letter and a south-Mumbai hotel are two cities for a delayed evening discharge.",
      ],
      hospitalDiscussion: [
        "Hospital cards are Mumbai surgical-oncology campuses already on GAF Healthcare, not a claim that each house runs PIPAC that week. Apollo Navi Mumbai and Wockhardt currently carry named CRS + HIPEC tags — neighbouring peritoneal surgery, not this sitting.",
        "Ask whether the laparoscopic theatre actually delivers pressurized aerosol chemotherapy that week, and which drug would be used. Listing is not a claim of PIPAC volume.",
        "Doctor cards below are Mumbai-filtered for the PIPAC procedure tag. An empty grid is the catalog being precise.",
      ],
      faqs: [
        {
          q: "Does GAF list a PIPAC specialist in Mumbai?",
          a: "Not as a live procedure tag. Mumbai’s listed peritoneal names are CRS + HIPEC-tagged. The live doctor grid on this page stays empty until a listed surgeon carries a PIPAC tag. Send records for a named hospital to confirm whether PIPAC is offered.",
        },
        {
          q: "Why would a Mumbai PIPAC trip still cost more than the sitting line?",
          a: "Because the sitting is not the whole trip. Flights, monsoon buffers, attendant rooms and a sequence of short admissions add up. Further cycles, systemic therapy and diagnostics outside the letter are usually extra. Compare sitting, drug and cycle count before treating two Mumbai figures as the same plan.",
        },
        {
          q: "How much does PIPAC cost in Mumbai?",
          a: "Plan against [INDIA_COST] per sitting as quoted and a stay of [STAY]. Mumbai does not have a separate verified city tariff. Harbour living costs and repeat sittings move the trip more than the metro name. Compare drug and cycle count before treating two Mumbai figures as the same plan.",
        },
        {
          q: "Is a Mumbai HIPEC quote usable for PIPAC planning?",
          a: "No. The techniques, theatre time, stay and drug delivery differ. A HIPEC letter is neighbouring context, not a PIPAC price. Ask for a sitting letter that names laparoscopic aerosol chemotherapy, the drug, and how further cycles are billed separately.",
        },
        {
          q: "Where should a companion stay in Mumbai?",
          a: "Next to the campus that writes the aerosol letter. Treat Navi Mumbai as a separate city. Do not keep the family across the harbour for a two-to-five-night stay, and do not use local trains for ward visits after laparoscopy.",
        },
      ],
    },
  },
  {
    citySlug: "bengaluru",
    ecosystem:
      "The catalog does not currently tag a Bengaluru doctor to PIPAC. Listed surgical-oncology campuses still include Apollo Hospitals Bannerghatta Road, Gleneagles Hospitals Bengaluru and Medicover. Coordinators match a listed surgeon after imaging is read, then ask whether pressurized aerosol chemotherapy is actually offered that week. Named CRS + HIPEC listings currently sit in other metros; do not invent an aerosol programme at a Bannerghatta campus because HIPEC exists elsewhere on this site.",
    logistics:
      "Kempegowda International is north of the city; listed campuses sit south or south-east. Budget 45 to 75 minutes for the airport road. Rent near the operating campus, not near Devanahalli. Milder weather makes a stay of [STAY] plus a hotel night easier than a Chennai summer — if a PIPAC sitting is actually on the plot. A sequence of short stays makes that climate argument stronger than it is for a single two-night trip.",
    costNote:
      "Serviced apartments near the southern campuses often undercut Mumbai or Gurugram hotel rates if several sittings are planned months apart. That only helps if the matched campus actually runs PIPAC that week.",
    page: {
      seoTitle: "PIPAC Cost in Bengaluru, India | Peritoneal Aerosol Planning",
      seoDescription:
        "PIPAC cost in Bengaluru follows the India planning range of [INDIA_COST] per sitting as quoted. Named PIPAC consultants are matched after records review. Compare campus-spread, climate for repeat short stays, and how to request an estimate.",
      heading: "PIPAC Cost in Bengaluru, India",
      subtitle:
        "Bengaluru PIPAC planning is a climate-and-campus problem for a sequence of short sittings — cooler than Chennai, more spread out than a single-tower stay. The GAF India range applies until a named hospital writes drug and cycle count. North-side airport traffic versus south-city campuses still decides how you move between a two-to-five-night ward and a review hotel.",
      intro: [
        "Bengaluru is the city you pick when the plan is to return for several short peritoneal sittings without melting or freezing — but only after a coordinator has matched a listed surgeon who actually performs PIPAC that week.",
        "The catalog does not currently tag a Bengaluru doctor to PIPAC. That is precision, not a gap in the filter. Chennai currently has the named PIPAC-certified listing. Delhi NCR has education lines that name PIPAC without a procedure tag. Matching here is records-first.",
        "Listed campuses on the surgical-oncology pathway still include Apollo Hospitals Bannerghatta Road, Gleneagles Hospitals Bengaluru and Medicover. A comprehensive campus is only useful if aerosol chemotherapy cover is free in the week you need it. Ask that question on camera before you rent an apartment.",
        "Same-campus radiation is a Bengaluru argument when adjuvant treatment is in the plan. Confirm both estimates separately. PIPAC and radiation are different letters. Proton and radiation campuses in the city are not PIPAC theatres.",
        "The airport is the tax you pay. Families who treat Bengaluru like a compact city and book theatre after a midnight landing discover the NH44 crawl the hard way — a poor start even before a one-to-two-hour laparoscopic sitting.",
        "Climate is the practical differentiator if a sitting is matched and especially if several sittings are already sketched. A stay of [STAY] plus hotel is easier here in most months than a Chennai summer. That does not make the aerosol protocol different, and it does not create a PIPAC programme where none is tagged.",
        "If the matched plan is CRS + HIPEC, use the neighbouring HIPEC sheet once a Bengaluru surgeon is named. This family band is PIPAC as quoted — per sitting, not a three-week cytoreduction.",
        "Bengaluru rewards the family that rents near Bannerghatta or the south-east belt after the operating campus is named. Sleeping in Devanahalli recreates a long commute every time the ward wants the attendant at 6 a.m., even after laparoscopy.",
        "Winter morning fog on the airport road is a Bengaluru-specific delay that a two-night stay cannot absorb. If PET is booked the day after landing, keep a buffer that a HIPEC family would have spent in ICU. IT-corridor serviced apartments are priced for week-long project stays — useful for a sequence of sittings, wasted if you booked Devanahalli because the flight was cheap.",
      ],
      answer: [
        "PIPAC in Bengaluru is planned against [INDIA_COST] per sitting as quoted and a typical stay of [STAY] — the national catalog band. There is no separate Bengaluru surgical tariff, and no named PIPAC consultant currently on this catalog.",
        "The Bengaluru-specific saving, when there is one, is usually the living cost of repeat short stays in a milder climate — after a PIPAC sitting is actually matched.",
      ],
      costExplanation: [
        "Letters still split on drug, cycle count and named nights. Two or three campuses means you compare those questions properly rather than collecting a fourth brochure.",
        "Extended-stay apartments in the south are commonly cheaper per week than Mumbai or Gurugram hotels. Over several sittings that line often moves the total trip — if you are actually admitted here.",
        "Do not treat an empty named-consultant grid as a reason to invent a cheaper Bengaluru PIPAC package.",
      ],
      factors: [
        { label: "No named catalog PIPAC consultant yet", detail: "Matching is records-first. Chennai currently has the procedure-tagged listing." },
        { label: "Same-campus imaging and theatre", detail: "Ask whether PET, laparoscopy and ward can stay on the plot, quoted separately from systemic therapy." },
        { label: "Climate for repeat short stays", detail: "The honest Bengaluru advantage when a companion will return for several sittings — after PIPAC is actually offered." },
        { label: "Airport versus campus geography", detail: "North airport, south hospitals. Do not sleep at the airport end for ward visits." },
      ],
      medicalTourism: [
        "Land, sleep, then consult. Do not book same-week theatre after a midnight landing.",
        "Mention a possible return sitting on the visa letter if the treating team already sketches a cadence.",
        "Kempegowda to Bannerghatta is 45 to 75 minutes. Do not treat Bengaluru as a compact city because the weather is mild.",
      ],
      hospitalDiscussion: [
        "Listed Bengaluru campuses for this surgical-oncology pathway include Apollo Hospitals Bannerghatta Road, Gleneagles Hospitals Bengaluru and Medicover Hospital Bangalore. Read each profile for accreditation as published. Listing is not a claim that PIPAC runs that week.",
        "Ask whether pressurized intraperitoneal aerosol chemotherapy is actually offered, and which drug would be used. A comprehensive campus is only useful if peritoneal aerosol cover is free.",
        "Doctor cards below are Bengaluru-filtered. An empty grid for PIPAC is the catalog being precise.",
      ],
      faqs: [
        {
          q: "How much does PIPAC cost in Bengaluru?",
          a: "Plan against [INDIA_COST] per sitting as quoted and a stay of [STAY]. Bengaluru does not have a separate verified city tariff. Cycle count and campus geography move the trip more than the city name. An empty specialist grid is not a reason to invent a cheaper package.",
        },
        {
          q: "Are there named PIPAC surgeons in Bengaluru on this site?",
          a: "Not currently as a procedure-tagged listing. Coordinators match a listed surgeon after records review, then ask whether PIPAC is actually offered that week. Chennai currently holds the named PIPAC-certified card on this catalog. An empty Bengaluru grid is precision, not a missing widget.",
        },
        {
          q: "Are PIPAC and HIPEC the same in Bengaluru hospitals?",
          a: "No. They remain different techniques wherever they are offered. Bengaluru letters that price CRS + HIPEC are not PIPAC estimates. Ask for the technique, drug, and whether the figure is one sitting or a sequence. An empty PIPAC grid is catalog precision.",
        },
        {
          q: "Does a short Bengaluru stay mean a cheaper total trip than HIPEC?",
          a: "Per sitting, hotel and attendant costs are usually lower than a three-week HIPEC admission. A planned sequence of sittings can still exceed one HIPEC trip once flights and repeat hotels are counted. Compare the whole cadence, not only the first theatre line.",
        },
        {
          q: "Where should a companion stay?",
          a: "Near the operating campus once it is named — typically the Bannerghatta or south-east belt — not near Kempegowda or Devanahalli. A two-to-five-night stay still punishes an airport-end hotel after a midnight landing.",
        },
      ],
    },
  },
  {
    citySlug: "chennai",
    ecosystem:
      "Chennai is the only GAF city with a live PIPAC procedure tag: Dr. Keshavarajan G, Consultant in Surgical Oncology at Rela Hospital, listed as PIPAC certified (Pressurized Intraperitoneal Aerosol Chemotherapy), 17+ years experience. That tag is not a CRS + HIPEC certification. Neighbouring HIPEC names — Dr. Aiswarya Sekar at Rela, Dr. Balaji Ramani and Dr. Vimalathithan S at Gleneagles HealthCity, Dr. Sivaram Ganesamoni and Dr. S. Srivishnu at MGM, Dr. Phanendra Kumar Gubbala at Apollo Proton — belong on the cytoreductive surgery with HIPEC sheet. Short airport transfers and an older international-patient corridor are the city's logistics advantage. Heat from April onward is a same-week discharge fact, not a four-week hotel problem.",
    logistics:
      "Airport transfers are typically 20 to 50 minutes — the shortest of the five cities. Chennai International to Rela along the GST / Chromepet corridor is a shorter hop than Bengaluru’s north-south split, which matters when the stay is only [STAY]. Air-conditioned lodging next to the campus is still part of the plan in summer, even after laparoscopy.",
    costNote:
      "There is no Chennai-only PIPAC band. Use [INDIA_COST] until Rela — or another named campus if records are sent elsewhere — writes a sitting letter. Further cycles are often separate letters. Proton radiation, if discussed at Apollo Proton, is a neighbouring quote.",
    page: {
      seoTitle: "PIPAC Cost in Chennai, India | Listed PIPAC-Certified Specialist",
      seoDescription:
        "PIPAC cost in Chennai follows the India planning range of [INDIA_COST] per sitting as quoted. Compare the catalog’s PIPAC-certified surgical oncologist at Rela Hospital, short airport transfers, and how to request an itemised estimate.",
      heading: "PIPAC Cost in Chennai, India",
      subtitle:
        "Chennai is the only GAF city with a listed PIPAC-certified surgical oncologist. Planning still starts from the India range until that campus writes sitting, drug and cycle count. Heat, short transfers along the GST corridor, and a two-to-five-night stay — not a four-week HIPEC hotel — shape the trip around the listed theatre.",
      intro: [
        "Chennai is the city you pick on this product when you want a named PIPAC-certified listing rather than a coordinator’s promise that someone can be found. Dr. Keshavarajan G is listed at Rela Hospital as PIPAC certified. That is a catalog tag, not a ranking and not a guarantee of appointment. Meet him on camera before you buy a ticket.",
        "The tag is specific. It is not a CRS + HIPEC certification, and this page does not merge him into the HIPEC faculty on neighbouring sheets. Other Chennai surgical oncologists listed for cytoreduction and HIPEC — Dr. Aiswarya Sekar at the same Rela campus, Dr. Balaji Ramani and Dr. Vimalathithan S at Gleneagles HealthCity, Dr. Sivaram Ganesamoni and Dr. S. Srivishnu at MGM, Dr. Phanendra Kumar Gubbala at Apollo Proton — are not PIPAC specialists on this catalog.",
        "A Chennai letter must still say whether the sitting is laparoscopic aerosol, which drug is used, and how many sittings the figure covers. Theatre time is typically one to two hours per sitting. Stay is typically [STAY] as quoted. Further cycles are often separate letters.",
        "Heat remains a planning fact for a short stay. It is less of a four-week hotel problem than HIPEC, and more of a same-week transfer-and-discharge problem. Families arriving from Colombo or Malé often already know this corridor. Families from colder countries sometimes underestimate April-to-July humidity until the first walk from the ward to the car.",
        "Chennai’s advantage after PIPAC is repetitive errands: drain or port review, a next-sitting conversation, visa paperwork if a return is already sketched. Short transfers make those days survivable. Heat makes a poorly chosen hotel harder even for five nights.",
        "Proton radiation, if discussed at Apollo Proton, is a neighbouring quote. Do not treat a PIPAC letter as a radiation package, and do not treat a proton campus as an aerosol theatre.",
        "FRRO and visa-extension desks are ordinary work here. Use them on day one if a sequence of sittings might outlast a short visa — a different paperwork problem from a three-week HIPEC stay.",
        "If a companion is coming from Sri Lanka or Bangladesh, Chennai often wins on flight frequency. That is a trip-cost fact, not a clinical ranking of Tamil Nadu PIPAC surgeons.",
      ],
      answer: [
        "PIPAC in Chennai is planned against [INDIA_COST] per sitting as quoted and [STAY] in hospital — the India catalog band. There is no separate Chennai surgical tariff. The live specialist card is Dr. Keshavarajan G at Rela Hospital.",
        "The Chennai-specific variables are transfer time (usually the shortest of the five cities) and heat if recovery sits in summer. Further sittings, proton radiation and extra hospital days remain separate quotes unless named.",
      ],
      costExplanation: [
        "Surgical letters follow campus tier, named aerosol agent, cycle count and named nights. Living costs are typically gentler than Mumbai. The hidden Chennai line is a return ticket if a second sitting is already sketched, not a four-week hotel.",
        "Short transfers cut taxi bills and fatigue across [STAY] plus a hotel night.",
        "Rela should be compared as the named PIPAC operating site. MGM, Gleneagles and Apollo Proton should be compared as neighbouring HIPEC or radiation campuses, not as interchangeable PIPAC theatres.",
      ],
      factors: [
        { label: "Named PIPAC-certified listing", detail: "Dr. Keshavarajan G at Rela Hospital. Confirm who operates, which drug is used, and how many sittings the letter covers." },
        { label: "HIPEC names are a neighbouring sitting", detail: "A CRS + HIPEC tag is not a PIPAC quotation, including other surgeons on the same Rela campus." },
        { label: "Heat and a short recovery", detail: "Air-conditioned lodging next to the campus is not optional from April onward, even after laparoscopy." },
        { label: "Short airport road", detail: "Typically 20 to 50 minutes. Useful when the stay is only a few nights." },
      ],
      medicalTourism: [
        "Chennai International to Rela is the least punishing transfer of the five cities in ordinary traffic — a genuine advantage when admission is [STAY].",
        "Interpreters for Sri Lankan, Bangladeshi and some African languages are easier to source on this corridor. Still ask.",
        "Visa-extension paperwork is ordinary desk work if a return sitting is already planned. Ask whether the international desk handles that in-house.",
      ],
      hospitalDiscussion: [
        "Rela Hospital is the listed campus for the PIPAC-tagged surgeon. That is a catalog relationship, not an exclusive claim that no other Chennai hospital ever offers PIPAC — only that GAF will not invent programmes. Accreditation is on each profile as published.",
        "Ask whether the letter names the aerosol drug, and how further cycles are billed. Listing is not a claim of volume.",
        "Doctor cards are Chennai-filtered for the PIPAC procedure tag, not a ranking, and not a HIPEC faculty list.",
      ],
      faqs: [
        {
          q: "Who is listed for PIPAC in Chennai?",
          a: "Dr. Keshavarajan G is listed at Rela Hospital as PIPAC certified. That is a catalog tag, not a ranking and not a guarantee of appointment. Other Chennai surgeons listed for CRS + HIPEC are on a different sheet. Send records for a named sitting letter before travelling.",
        },
        {
          q: "Is the Chennai PIPAC listing the same as Chennai HIPEC doctors?",
          a: "No. PIPAC and HIPEC are different techniques. Chennai’s CRS + HIPEC faculty is listed on the cytoreductive surgery with HIPEC city page. Do not treat those names as PIPAC specialists, and do not treat the PIPAC-certified listing as a HIPEC surgeon on this catalog.",
        },
        {
          q: "How much does PIPAC cost in Chennai?",
          a: "Plan against [INDIA_COST] per sitting as quoted and a stay of [STAY]. Chennai does not have a separate verified city tariff. Cycle count, drug and named nights move the letter more than the city name. Further sittings are often separate letters.",
        },
        {
          q: "Is proton therapy included in a Chennai PIPAC quote?",
          a: "No. Proton or photon radiation, if discussed, is a neighbouring estimate. Apollo Proton is a radiation campus, not this aerosol sitting. Do not treat a PIPAC letter as a radiation package or a HIPEC quotation.",
        },
        {
          q: "When should we avoid Chennai for a short PIPAC stay?",
          a: "Peak heat is harder on a same-week discharge walk. Surgery itself is performed year-round. Air-conditioned lodging next to Rela is part of the plan from April onward, even when the stay is only a few nights after laparoscopy.",
        },
      ],
    },
  },
  {
    citySlug: "hyderabad",
    ecosystem:
      "Hyderabad currently has two named CRS + HIPEC tags on GAF Healthcare: Dr. Sreekanth CN at Yashoda Hospitals Secunderabad and Dr. Umanath Nayak Karopadi at Apollo Hospital Jubilee Hills. Those names are HIPEC, not PIPAC. This page does not relabel them as PIPAC specialists. The live PIPAC procedure tag currently sits in Chennai. Apartment economics around Banjara Hills and Gachibowli often undercut Mumbai and NCR for a sequence of short stays — if a house actually writes an aerosol letter.",
    logistics:
      "Rajiv Gandhi International is typically 45 to 70 minutes from the hospital belt. Stay in Banjara Hills, Jubilee Hills, Secunderabad or Gachibowli depending on which campus is on the letter. An outer-ring hotel near the airport recreates Bengaluru's mistake once twice-daily ward visits start, even after a laparoscopic sitting of [STAY].",
    costNote:
      "Extended-stay accommodation is generally more affordable than in Mumbai or NCR. That can change a sequence of short PIPAC trips more than any difference in surgical fee — after you know which campus is operating and which aerosol agent is named.",
    page: {
      seoTitle: "PIPAC Cost in Hyderabad, India | Peritoneal Aerosol vs HIPEC",
      seoDescription:
        "PIPAC cost in Hyderabad follows the India planning range of [INDIA_COST] per sitting as quoted. Compare apartment economics for a sequence of short stays, listed HIPEC names that are not PIPAC tags, and how to request a personalized estimate.",
      heading: "PIPAC Cost in Hyderabad, India",
      subtitle:
        "Hyderabad PIPAC planning is an apartment-and-campus-address problem for short repeat stays — not a three-week HIPEC recovery in the same towers. The GAF India range applies until a named hospital writes sitting and drug. Yashoda and other campus addresses still matter for neighbouring HIPEC letters; they are not a PIPAC faculty list on this catalog.",
      intro: [
        "Hyderabad is the city families choose when they want a named peritoneal review without Mumbai harbour traffic, and an attendant stay that is cheaper than Gurugram — without pretending the surgical fee is a different national tariff, and without pretending HIPEC tags are PIPAC tags.",
        "Named catalog consultants for heated intraperitoneal chemotherapy currently are Dr. Sreekanth CN at Yashoda Hospitals Secunderabad and Dr. Umanath Nayak Karopadi at Apollo Hospital Jubilee Hills. Two names is a HIPEC shortlist, not a PIPAC league table. Meet the person who would operate, and ask whether the sitting is laparoscopic aerosol or cytoreduction plus HIPEC.",
        "Yashoda also operates Somajiguda and Hi-Tech City campuses. A Secunderabad letter and a Hi-Tech City letter are different ICU floors even when the brand matches. Ask which Yashoda address is on the estimate. That address question still applies if the house later writes a PIPAC sitting rather than HIPEC.",
        "If the written plan is CRS + HIPEC, use the neighbouring HIPEC cost sheet. This family band is PIPAC as quoted — typically [STAY] per sitting, not ten to twenty-one nights.",
        "Apartment economics around Banjara Hills, Jubilee Hills and Gachibowli often undercut Mumbai and NCR over a sequence of short stays. That does not make a Hyderabad PIPAC sitting cheaper as surgery. It makes repeat attendant weeks more affordable if several sittings are already sketched.",
        "Rajiv Gandhi International is south of the hospital belt. Families who sleep in Shamshabad recreate the Bengaluru Devanahalli mistake. Rent for the ward door after laparoscopy.",
        "International desks are used to Gulf and East African files. Invitation letters that mention a possible return sitting are ordinary — use that, then still open the CT on camera and ask for the technique by name.",
        "Hyderabad rewards the family that treats Yashoda Secunderabad and Apollo Jubilee Hills as two different quotations, including two possibly different protocols, and that refuses to invent a PIPAC programme because the city already has HIPEC. It punishes the family that treats Hyderabad peritoneal care as one pin on a map.",
        "HITEC City and Secunderabad are not a metro hop with a suitcase after laparoscopy. If imaging is at one Yashoda address and the ward is at another, the letter should say so. Gulf families often already have a Hyderabad apartment habit; that helps a sequence of short PIPAC stays only after the technique is named.",
      ],
      answer: [
        "PIPAC in Hyderabad is planned against [INDIA_COST] per sitting as quoted and [STAY] in hospital — the India catalog band. There is no separate Hyderabad surgical tariff, and no PIPAC procedure tag currently on this city’s cards.",
        "The Hyderabad-specific variables are which campus address is on the letter, which technique is named, and apartment cost over a sequence of short stays.",
      ],
      costExplanation: [
        "Letters still split on drug, cycle count and named nights. A Yashoda Secunderabad letter and an Apollo Jubilee Hills letter are not a blended Hyderabad average, and a HIPEC letter is not a PIPAC price.",
        "Extended-stay flats are commonly cheaper per week than Mumbai or Gurugram hotels. Over several sittings that line often moves the total trip more than any small difference in surgical fee.",
        "Do not invent an unlisted PIPAC house and call it a shortlist.",
      ],
      factors: [
        { label: "HIPEC tags, not PIPAC tags", detail: "Yashoda Secunderabad and Apollo Jubilee Hills currently carry CRS + HIPEC names. Confirm whether the sitting is aerosol chemotherapy." },
        { label: "Which Yashoda address", detail: "Secunderabad is not Somajiguda or Hi-Tech City. The letter should name the campus." },
        { label: "PIPAC versus CRS + HIPEC", detail: "Neighbouring GAF sheet when heated chemotherapy after cytoreduction is the billed episode." },
        { label: "Apartment economics for repeat stays", detail: "Often the honest Hyderabad advantage versus Mumbai or NCR if several short sittings are planned." },
      ],
      medicalTourism: [
        "Land, sleep, then consult. Do not book same-week theatre after a long-haul landing into the outer ring.",
        "Write the visa for [STAY] plus hotel — and for a possible return sitting if already sketched.",
        "Second opinions between Secunderabad and Jubilee Hills are a morning if you already live in the hospital belt. Use that when one house names PIPAC and another names HIPEC.",
      ],
      hospitalDiscussion: [
        "Listed Hyderabad campuses with named CRS + HIPEC tags are Yashoda Hospitals Secunderabad and Apollo Hospital Jubilee Hills. They are neighbouring peritoneal-surgery records, not a PIPAC faculty list. Accreditation is on each profile as published.",
        "Ask whether pressurized intraperitoneal aerosol chemotherapy is actually offered that week, and which drug would be used. Listing is not a claim of PIPAC volume.",
        "Doctor cards below are Hyderabad-filtered for the PIPAC procedure tag. An empty grid is catalog precision, not a ranking of Hyderabad peritoneal programmes.",
      ],
      faqs: [
        {
          q: "Does GAF list a PIPAC doctor in Hyderabad?",
          a: "Not as a live procedure tag. Hyderabad’s listed peritoneal faculty is HIPEC-tagged. The live doctor grid on this page stays empty until a listed surgeon carries a PIPAC tag. Send records for a named hospital to confirm whether PIPAC is offered.",
        },
        {
          q: "Can I use a Hyderabad HIPEC quote for PIPAC planning?",
          a: "No. The techniques, theatre time, stay and drug delivery differ. A HIPEC letter is useful neighbouring context, not a PIPAC price. Ask for a sitting letter that names laparoscopic aerosol chemotherapy, the drug, and the number of cycles covered. Do not retitle a HIPEC package.",
        },
        {
          q: "How much does PIPAC cost in Hyderabad?",
          a: "Plan against [INDIA_COST] per sitting as quoted and a stay of [STAY]. Hyderabad does not have a separate verified city tariff. Apartment costs over a sequence of short stays are often lower here than in Mumbai or NCR, after a house actually writes an aerosol letter.",
        },
        {
          q: "Are Yashoda hospitals interchangeable for PIPAC?",
          a: "No. Campus address still matters. The named HIPEC tag on this site is Secunderabad, not Somajiguda or Hi-Tech City. Ask which campus address is on any peritoneal letter, including a PIPAC sitting if one is later written. Do not blend Yashoda towers.",
        },
        {
          q: "Where should a companion stay?",
          a: "Near the operating campus — typically Secunderabad, Jubilee Hills or Gachibowli, depending on the letter — not at a Shamshabad airport hotel. A two-to-five-night stay still punishes an outer-ring commute after laparoscopy.",
        },
      ],
    },
  },
];
