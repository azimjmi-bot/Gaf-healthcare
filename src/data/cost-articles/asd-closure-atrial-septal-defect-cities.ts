import type { CityEditorial, CostCitySlug } from "./types";

type CityProfile = {
  citySlug: CostCitySlug;
  city: string;
  airport: string;
  unitContext: string;
  stayContext: string;
  practical: string;
  hospitalDiscussion: string[];
  namedAvailability: string;
};

const CITY_PROFILES: CityProfile[] = [
  {
    citySlug: "delhi-ncr",
    city: "Delhi NCR",
    airport: "Indira Gandhi International Airport",
    unitContext:
      "Delhi NCR has the deepest procedure-tagged ASD roster in the GAF catalog. The listed names span paediatric cardiology, interventional congenital cardiology and congenital cardiac surgery at Fortis Escorts, Indraprastha Apollo, Medanta, Max Saket, Artemis, Fortis Memorial, Sarvodaya and Marengo Faridabad. That breadth is useful when the first question is device closure versus surgery rather than which brand appears on an airport placard.",
    stayContext:
      "NCR is several hospital districts, not one compact city. Gurugram, south Delhi, Noida and Faridabad create different airport transfers and companion-hotel choices. A family staying for the quoted [STAY] should choose accommodation near the operating or catheter-lab campus after the team and approach are confirmed.",
    practical:
      "Long-haul arrivals usually use Indira Gandhi International Airport. Avoid placing an elective catheter study or operation immediately after an overnight flight. Winter air quality, summer heat and cross-city traffic matter to a child's recovery plan even though they do not set the hospital fee.",
    hospitalDiscussion: [
      "Procedure-tagged clinicians in Delhi NCR currently connect ASD closure to Fortis Escorts Heart Institute, Indraprastha Apollo Hospital, Medanta - The Medicity, Max Super Speciality Hospital Saket, Artemis Hospital, Fortis Memorial Research Institute, Sarvodaya Hospital Faridabad and Marengo Asia Hospitals Faridabad. Cards below are generated from those live records, not from a hand-built ranking.",
      "Ask which address contains the paediatric catheter laboratory, congenital operating list and paediatric cardiac ICU for the proposed approach. A multi-speciality accreditation badge alone does not establish that every campus runs every congenital procedure.",
    ],
    namedAvailability:
      "The current catalog has multiple ASD-tagged specialists in NCR, but availability, whether the clinician is a surgeon or interventional cardiologist, and the final operating campus still require confirmation.",
  },
  {
    citySlug: "mumbai",
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
    unitContext:
      "Mumbai currently has one procedure-tagged ASD clinician in the GAF catalog: Dr. Bhushan Chavan at Apollo Hospitals Navi Mumbai. That is a verified catalog relationship, not evidence that no other Mumbai team treats ASD. GAF surfaces only the relationship it can connect to a profile, so a family sees one named route rather than an inflated metropolitan list.",
    stayContext:
      "Mumbai and Navi Mumbai should be treated as different accommodation markets. Harbour crossings and peak traffic can turn a short map distance into a poor daily journey for a parent. After the campus is confirmed, stay on the same side of the harbour for the quoted [STAY] and any outpatient review.",
    practical:
      "Most international arrivals use Chhatrapati Shivaji Maharaj International Airport. Transfer time to Navi Mumbai varies sharply by hour. Monsoon disruption can add travel slack; it does not change the clinical indication or justify booking before echocardiography has been reviewed.",
    hospitalDiscussion: [
      "Apollo Hospitals Navi Mumbai is the current Mumbai-area campus connected to a procedure-tagged ASD clinician in the GAF records. Its accreditation and profile data appear on the linked hospital card.",
      "The listing does not claim ASD case volume, a dedicated device inventory or a universal catheter-first policy. Request a written plan naming the interventional or surgical approach and the actual campus.",
    ],
    namedAvailability:
      "One Mumbai-area specialist is currently tagged to ASD closure. If that profile does not match the child's anatomy, a coordinator must verify another team rather than manufacture a second card.",
  },
  {
    citySlug: "bengaluru",
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
    unitContext:
      "The GAF catalog does not currently connect a Bengaluru paediatric cardiac clinician directly to ASD closure. Several Bengaluru hospitals have general cardiac listings, but this page does not convert those broad records into a procedure claim. A family interested in Bengaluru therefore needs a records-first match before treating the city as an available ASD pathway.",
    stayContext:
      "Kempegowda International Airport lies north of the city while many large private hospitals are south or south-east. Once a suitable congenital team is verified, accommodation should follow that campus rather than the airport. Bengaluru's milder climate may make a parent stay easier, but climate is not a substitute for a named paediatric cardiac unit.",
    practical:
      "Allow recovery time after a long-haul arrival before diagnostic review. Airport-to-hospital transfers can take well over an hour in traffic. Do not book a south-city apartment until the hospital confirms who will review the echocardiogram and whether closure is catheter-based or surgical.",
    hospitalDiscussion: [
      "No Bengaluru hospital card is shown as procedure-confirmed through a named ASD clinician in the current catalog. That empty state is deliberate.",
      "A coordinator may investigate Bengaluru after records review, but the resulting hospital, specialist and estimate need human confirmation before travel.",
    ],
    namedAvailability:
      "There is currently no procedure-tagged Bengaluru ASD doctor in the CMS. This requires human matching and cannot be filled from a generic cardiac specialty tag.",
  },
  {
    citySlug: "chennai",
    city: "Chennai",
    airport: "Chennai International Airport",
    unitContext:
      "Chennai's current ASD entity graph is concentrated at MGM Healthcare. The GAF catalog links Dr. R K R Noveen Davidson, Dr. Rajesh Kumar R and Dr. Ramya Shri C to ASD closure there. A concentrated team can simplify a second opinion because the same campus can answer whether the child's septal anatomy belongs in the catheter laboratory or operating theatre.",
    stayContext:
      "Chennai International Airport is generally closer to the listed hospital belt than airports in Bengaluru or Hyderabad. Shorter transfers can make repeat echo, pre-anaesthetic review and post-discharge checks less tiring. Air-conditioned accommodation near the campus is a practical consideration during hotter months.",
    practical:
      "Families from South Asia, the Gulf and East Africa often find direct or one-stop connections into Chennai. Arrival still needs to precede the hospital assessment by enough time for rest and repeat investigations. A short airport road should not be mistaken for a short clinical pathway.",
    hospitalDiscussion: [
      "MGM Healthcare, Chennai is the current campus attached to the ASD-tagged clinicians shown by GAF. The linked profile supplies accreditation and location data.",
      "Confirm whether the proposed case is a catheter device closure or open repair and whether the named clinician leads that part of the pathway. The card is not a claim that every ASD configuration is treated at MGM.",
    ],
    namedAvailability:
      "Three Chennai clinicians are currently tagged to ASD closure at one campus. The operating role and appointment date must still be confirmed against the child's records.",
  },
  {
    citySlug: "hyderabad",
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
    unitContext:
      "Hyderabad's ASD records are split between KIMS Hospitals in Secunderabad and Kondapur and Apollo Hospital Jubilee Hills. The current catalog links Dr. Anil Kumar D and Dr. Gouthami V to KIMS Secunderabad, Dr. Sudeep Verma to KIMS Kondapur and Dr. Sunil Kumar Swain to Apollo Jubilee Hills. Those are different campuses, not one interchangeable city service.",
    stayContext:
      "The airport is south of the main hospital districts. A family should choose between Secunderabad, Kondapur and Jubilee Hills only after the proposed clinician and campus are named. Serviced apartments can be practical for the quoted [STAY], but an airport hotel is a poor base for repeated ward or catheter-lab visits.",
    practical:
      "Rajiv Gandhi International Airport transfers often take 45–70 minutes in normal traffic and longer at peaks. Leave a rest day before elective investigations. The city's comparatively manageable long-stay accommodation can reduce the trip budget, but not the quoted device, bypass or ICU line.",
    hospitalDiscussion: [
      "KIMS Hospitals Secunderabad, KIMS Hospitals Kondapur and Apollo Hospital Jubilee Hills are the Hyderabad campuses currently connected to ASD-tagged profiles. The hospital cards below follow the live doctor-to-campus relationships.",
      "Ask which KIMS address is on the estimate, whether the procedure is catheter-based or surgical, and where paediatric cardiac intensive care would occur if needed.",
    ],
    namedAvailability:
      "Four Hyderabad clinicians are currently tagged to ASD closure across three campuses. This is a directory relationship, not a ranking or a guarantee that each has the same procedural role.",
  },
];

export const asdClosureCities: CityEditorial[] = CITY_PROFILES.map((row) => ({
  citySlug: row.citySlug,
  ecosystem: row.unitContext,
  logistics: `${row.airport}: ${row.stayContext}`,
  costNote:
    "No verified city-only ASD tariff is stored in the CMS. The table therefore carries the India planning band until a named hospital issues an itemised estimate.",
  page: {
    seoTitle: `ASD Closure Cost in ${row.city}, India: Doctors & Hospitals`,
    seoDescription: `ASD closure cost in ${row.city} uses the India planning range of [INDIA_COST]. Compare live GAF doctor and hospital records, likely inclusions and travel planning for international families.`,
    heading: `ASD Closure Cost in ${row.city}, India`,
    subtitle: `ASD closure in ${row.city} may use a catheter device or open repair, depending on the defect's type, size, position and surrounding rims. The [INDIA_COST] figure is a national planning band—not a city quotation—and the final estimate follows the child's echocardiogram, pulmonary pressures and treatment plan.`,
    intro: [
      row.unitContext,
      row.namedAvailability,
      row.stayContext,
      row.practical,
      "An atrial septal defect is not priced from the diameter alone. A secundum defect with suitable rims may be considered for device closure; a primum, sinus venosus or complex defect commonly needs surgical discussion. Associated anomalous veins, valve findings or pulmonary hypertension can change both the team and the estimate.",
      "The city page retains the same India planning band because GAF does not hold a verified metro tariff. The useful city comparison is the named team, operating address, approach, paediatric support, travel geography and what the written quotation includes.",
    ],
    answer: [
      `ASD closure in ${row.city} is planned against [INDIA_COST] with [STAY] in the current GAF catalog. This is an indicative India range, not a ${row.city} hospital quotation. Device closure may require observation rather than surgical ICU, while open repair may involve bypass and paediatric cardiac intensive care.`,
      "The final estimate depends on ASD anatomy, the child's age and weight, pulmonary pressure, associated defects, device suitability, investigations and length of stay. Echocardiography—and sometimes transoesophageal echo or catheter assessment—must be reviewed before travel.",
    ],
    costExplanation: [
      "The lower part of the national band is more consistent with an uncomplicated catheter pathway when the device and short admission are clearly bundled. Open repair, associated findings, bypass, paediatric cardiac ICU and extra nights tend to move an estimate upward. This is a planning principle, not a city tariff.",
      "Ask for the device brand and size if a catheter approach is proposed, or the assumed bypass and ICU days if surgery is proposed. A quotation that says only 'ASD package' does not define enough to compare.",
      `For ${row.city}, add the local cost of accommodation near the named campus, airport transfers, meals for a parent and possible extra review days. Those trip costs are outside the hospital band.`,
    ],
    factors: [
      { label: "Device closure or surgical repair", detail: "The two pathways use different facilities, consumables and recovery plans. Suitability follows anatomy, not price preference." },
      { label: "ASD type and surrounding rims", detail: "Secundum defects may be device-suitable; primum, sinus venosus and complex defects often require surgical assessment." },
      { label: "Associated findings", detail: "Anomalous pulmonary veins, valve disease, pulmonary hypertension or another defect can change the procedure and quote." },
      { label: `Named ${row.city} campus`, detail: "The estimate should identify the exact hospital, proceduralist or surgeon, room category, included nights and escalation terms." },
    ],
    medicalTourism: [
      `Send the echocardiogram report and images before booking travel to ${row.city}. A report without the image loop may not answer device suitability.`,
      `Plan arrival through ${row.airport} with time for repeat echo, paediatric cardiology review and anaesthetic assessment before any scheduled closure.`,
      "After discharge, remain close enough for the first review. The treating team—not an airline schedule—should decide when a child is fit to fly.",
    ],
    hospitalDiscussion: row.hospitalDiscussion,
    faqs: [
      {
        q: `How much does ASD closure cost in ${row.city}?`,
        a: `Use [INDIA_COST] as the current GAF India planning band. There is no verified ${row.city}-only tariff in the CMS. The final estimate depends on device versus surgery, ASD anatomy, investigations, paediatric ICU needs and the named campus.`,
      },
      {
        q: `Which ASD closure doctors are listed in ${row.city}?`,
        a: `${row.namedAvailability} Cards on this page come from live procedure and city tags. Placement is not a ranking, and a profile does not guarantee appointment availability.`,
      },
      {
        q: `Which hospitals in ${row.city} are shown for ASD closure?`,
        a: `${row.hospitalDiscussion[0]} A hospital appears only when the current entity graph connects it to a procedure-tagged clinician; broad adult cardiac capability is not treated as proof.`,
      },
      {
        q: `Should a family stay near the airport or hospital in ${row.city}?`,
        a: `Stay near the confirmed hospital for repeat reviews and early recovery. ${row.stayContext} Do not reserve non-refundable accommodation until the operating address is written.`,
      },
      {
        q: "Can a child fly immediately after ASD closure?",
        a: "Not on a universal timetable. The treating paediatric cardiology team should clear travel after checking the wound or catheter site, rhythm, oxygen level and echocardiogram as appropriate. Open repair generally needs a different recovery discussion from device closure.",
      },
    ],
  },
}));
