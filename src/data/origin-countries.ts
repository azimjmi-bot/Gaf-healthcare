/**
 * Origin-country hubs (where patients travel from), not care destinations.
 * Only published pages are listed. Do not add a card until its route exists.
 */
export type OriginCountryContinent = "Africa" | "Central Asia" | "Europe";

export type OriginCountryHub = {
  name: string;
  city: string;
  destination: string;
  href: string;
  flag: string;
  flagLabel: string;
  visaNote: string;
  continent: OriginCountryContinent;
};

export const ORIGIN_COUNTRY_CONTINENT_ORDER: OriginCountryContinent[] = [
  "Africa",
  "Central Asia",
  "Europe",
];

export function originCountryHubsByContinent() {
  return ORIGIN_COUNTRY_CONTINENT_ORDER.map((continent) => ({
    continent,
    countries: ORIGIN_COUNTRY_HUBS.filter((row) => row.continent === continent),
  })).filter((group) => group.countries.length > 0);
}

export const ORIGIN_COUNTRY_HUBS: OriginCountryHub[] = [
  {
    name: "Algeria",
    city: "Algiers",
    destination: "India",
    continent: "Africa",
    href: "/algeria/treatment-in-india",
    flag: "🇩🇿",
    flagLabel: "Flag of Algeria",
    visaNote:
      "Algeria is not currently on India’s e-Visa list. Algerian patients apply for a Medical Visa through the Embassy of India in Algiers.",
  },
  {
    name: "Angola",
    city: "Luanda",
    destination: "India",
    continent: "Africa",
    href: "/angola/treatment-in-india",
    flag: "🇦🇴",
    flagLabel: "Flag of Angola",
    visaNote:
      "Angola is currently on India’s e-Visa list. Angolan patients can use the e-Medical Visa or apply through the Embassy of India in Luanda.",
  },
  {
    name: "Armenia",
    city: "Yerevan",
    destination: "India",
    continent: "Europe",
    href: "/armenia/treatment-in-india",
    flag: "🇦🇲",
    flagLabel: "Flag of Armenia",
    visaNote:
      "Armenia is currently on India’s e-Visa list. The official fee tables list the e-Medical Visa at US$80. Armenian patients can use the e-Medical Visa or apply through the Embassy of India in Yerevan.",
  },
  {
    name: "Belarus",
    city: "Minsk",
    destination: "India",
    continent: "Europe",
    href: "/belarus/treatment-in-india",
    flag: "🇧🇾",
    flagLabel: "Flag of Belarus",
    visaNote:
      "Belarus is currently on India’s e-Visa list. A category-wise official table lists the e-Medical Visa at US$80. Belarusian patients can use the e-Medical Visa or apply through the Embassy of India in Minsk.",
  },
  {
    name: "Benin",
    city: "Cotonou",
    destination: "India",
    continent: "Africa",
    href: "/benin/treatment-in-india",
    flag: "🇧🇯",
    flagLabel: "Flag of Benin",
    visaNote:
      "Benin is not currently on India’s e-Visa list. Beninese patients apply for a Medical Visa through the High Commission of India in Abuja, which is concurrently accredited to Benin.",
  },
  {
    name: "Botswana",
    city: "Gaborone",
    destination: "India",
    continent: "Africa",
    href: "/botswana/treatment-in-india",
    flag: "🇧🇼",
    flagLabel: "Flag of Botswana",
    visaNote:
      "Botswana is currently on India’s e-Visa list. Batswana patients can use the e-Medical Visa or apply through the High Commission of India in Gaborone.",
  },
  {
    name: "Burkina Faso",
    city: "Ouagadougou",
    destination: "India",
    continent: "Africa",
    href: "/burkina-faso/treatment-in-india",
    flag: "🇧🇫",
    flagLabel: "Flag of Burkina Faso",
    visaNote:
      "Burkina Faso is not currently on India’s e-Visa list. Burkinabè patients apply for a Medical Visa through the Embassy of India in Ouagadougou.",
  },
  {
    name: "Chad",
    city: "N'Djamena",
    destination: "India",
    continent: "Africa",
    href: "/chad/treatment-in-india",
    flag: "🇹🇩",
    flagLabel: "Flag of Chad",
    visaNote:
      "Chad is not currently on India’s e-Visa list. Chadian patients apply for a Medical Visa through the Embassy of India in N'Djamena.",
  },
  {
    name: "Côte d'Ivoire",
    city: "Abidjan",
    destination: "India",
    continent: "Africa",
    href: "/cote-divoire/treatment-in-india",
    flag: "🇨🇮",
    flagLabel: "Flag of Côte d'Ivoire",
    visaNote:
      "Côte d'Ivoire is currently on India’s e-Visa list. Ivorian patients can use the e-Medical Visa or apply through the Embassy of India in Abidjan.",
  },
  {
    name: "Ethiopia",
    city: "Addis Ababa",
    destination: "India",
    continent: "Africa",
    href: "/ethiopia/treatment-in-india",
    flag: "🇪🇹",
    flagLabel: "Flag of Ethiopia",
    visaNote:
      "Ethiopia is not currently on India’s e-Visa list. Ethiopian patients apply for a Medical Visa through the Embassy of India in Addis Ababa.",
  },
  {
    name: "Ghana",
    city: "Accra",
    destination: "India",
    continent: "Africa",
    href: "/ghana/treatment-in-india",
    flag: "🇬🇭",
    flagLabel: "Flag of Ghana",
    visaNote:
      "Ghana is currently on India’s e-Visa list. Ghanaian patients can use the e-Medical Visa or apply through the High Commission of India in Accra.",
  },
  {
    name: "Guinea",
    city: "Conakry",
    destination: "India",
    continent: "Africa",
    href: "/guinea/treatment-in-india",
    flag: "🇬🇳",
    flagLabel: "Flag of Guinea",
    visaNote:
      "Guinea is currently on India’s e-Visa list. Guinean patients can use the e-Medical Visa or apply through the Embassy of India in Conakry.",
  },
  {
    name: "Kazakhstan",
    city: "Almaty",
    destination: "India",
    continent: "Central Asia",
    href: "/kazakhstan/treatment-in-india",
    flag: "🇰🇿",
    flagLabel: "Flag of Kazakhstan",
    visaNote:
      "Kazakhstan is currently on India’s e-Visa list. A category-wise official table lists the e-Medical Visa at US$00. Kazakhstani patients can use the e-Medical Visa or apply through the Embassy of India in Astana or the Representative Office in Almaty.",
  },
  {
    name: "Kenya",
    city: "Nairobi",
    destination: "India",
    continent: "Africa",
    href: "/kenya/treatment-in-india",
    flag: "🇰🇪",
    flagLabel: "Flag of Kenya",
    visaNote:
      "Kenya is currently on India’s e-Visa list. Kenyan patients can use the e-Medical Visa or apply through the High Commission of India in Nairobi.",
  },
  {
    name: "Kyrgyzstan",
    city: "Bishkek",
    destination: "India",
    continent: "Central Asia",
    href: "/kyrgyzstan/treatment-in-india",
    flag: "🇰🇬",
    flagLabel: "Flag of Kyrgyzstan",
    visaNote:
      "Kyrgyzstan is currently on India’s e-Visa list. The official fee tables list the e-Medical Visa at US$80. Kyrgyz patients can use the e-Medical Visa or apply through the Embassy of India in Bishkek.",
  },
  {
    name: "Liberia",
    city: "Monrovia",
    destination: "India",
    continent: "Africa",
    href: "/liberia/treatment-in-india",
    flag: "🇱🇷",
    flagLabel: "Flag of Liberia",
    visaNote:
      "Liberia is currently on India’s e-Visa list. Liberian patients can use the e-Medical Visa or apply through the Embassy of India in Monrovia.",
  },
  {
    name: "Malawi",
    city: "Lilongwe",
    destination: "India",
    continent: "Africa",
    href: "/malawi/treatment-in-india",
    flag: "🇲🇼",
    flagLabel: "Flag of Malawi",
    visaNote:
      "Malawi is currently on India’s e-Visa list. Malawian patients can use the e-Medical Visa or apply through the High Commission of India in Lilongwe.",
  },
  {
    name: "Mauritius",
    city: "Port Louis",
    destination: "India",
    continent: "Africa",
    href: "/mauritius/treatment-in-india",
    flag: "🇲🇺",
    flagLabel: "Flag of Mauritius",
    visaNote:
      "Mauritius is currently on India’s e-Visa list. Mauritian patients can use the e-Medical Visa or apply through the High Commission of India in Port Louis.",
  },
  {
    name: "Moldova",
    city: "Chișinău",
    destination: "India",
    continent: "Europe",
    href: "/moldova/treatment-in-india",
    flag: "🇲🇩",
    flagLabel: "Flag of Moldova",
    visaNote:
      "Moldova is currently on India’s e-Visa list. The official fee tables list the e-Medical Visa at US$80. Moldovan patients can use the e-Medical Visa or apply through the Embassy of India in Bucharest, which is accredited to Moldova.",
  },
  {
    name: "Morocco",
    city: "Casablanca",
    destination: "India",
    continent: "Africa",
    href: "/morocco/treatment-in-india",
    flag: "🇲🇦",
    flagLabel: "Flag of Morocco",
    visaNote:
      "Morocco is currently on India’s e-Visa list. Moroccan patients can use the e-Medical Visa or apply through the Embassy of India in Rabat.",
  },
  {
    name: "Mozambique",
    city: "Maputo",
    destination: "India",
    continent: "Africa",
    href: "/mozambique/treatment-in-india",
    flag: "🇲🇿",
    flagLabel: "Flag of Mozambique",
    visaNote:
      "Mozambique is currently on India’s e-Visa list. Mozambican patients can use the e-Medical Visa or apply through the High Commission of India in Maputo.",
  },
  {
    name: "Namibia",
    city: "Windhoek",
    destination: "India",
    continent: "Africa",
    href: "/namibia/treatment-in-india",
    flag: "🇳🇦",
    flagLabel: "Flag of Namibia",
    visaNote:
      "Namibia is currently on India’s e-Visa list. Namibian patients can use the e-Medical Visa or apply through the High Commission of India in Windhoek.",
  },
  {
    name: "Nigeria",
    city: "Lagos",
    destination: "India",
    continent: "Africa",
    href: "/nigeria/treatment-in-india",
    flag: "🇳🇬",
    flagLabel: "Flag of Nigeria",
    visaNote:
      "Nigeria is not currently on India’s e-Visa list. Nigerian patients apply for a Medical Visa through the High Commission of India in Abuja or the Consulate General of India in Lagos.",
  },
  {
    name: "Russia",
    city: "Moscow",
    destination: "India",
    continent: "Europe",
    href: "/russia/treatment-in-india",
    flag: "🇷🇺",
    flagLabel: "Flag of Russia",
    visaNote:
      "Russia is currently on India’s e-Visa list. A category-wise official table lists the e-Medical Visa at US$120. Russian patients can use the e-Medical Visa or apply through the Embassy of India in Moscow.",
  },
  {
    name: "Rwanda",
    city: "Kigali",
    destination: "India",
    continent: "Africa",
    href: "/rwanda/treatment-in-india",
    flag: "🇷🇼",
    flagLabel: "Flag of Rwanda",
    visaNote:
      "Rwanda is currently on India’s e-Visa list. Rwandan patients can use the e-Medical Visa or apply through the High Commission of India. The High Commission of India in Kigali currently notes that visa services are rendered by the High Commission of India, Kampala until further notice — confirm the live receiving Mission before applying.",
  },
  {
    name: "Senegal",
    city: "Dakar",
    destination: "India",
    continent: "Africa",
    href: "/senegal/treatment-in-india",
    flag: "🇸🇳",
    flagLabel: "Flag of Senegal",
    visaNote:
      "Senegal is currently on India’s e-Visa list. Senegalese patients can use the e-Medical Visa or apply through the Embassy of India in Dakar. The Embassy states that it does not process e-Visa applications.",
  },
  {
    name: "Somalia",
    city: "Mogadishu",
    destination: "India",
    continent: "Africa",
    href: "/somalia/treatment-in-india",
    flag: "🇸🇴",
    flagLabel: "Flag of Somalia",
    visaNote:
      "Somalia is not currently on India’s e-Visa list. Somali patients apply for a Medical Visa through the High Commission of India in Nairobi, which is concurrently accredited to Somalia, or through the live receiving Mission including the Embassy of India in Addis Ababa.",
  },
  {
    name: "South Africa",
    city: "Johannesburg",
    destination: "India",
    continent: "Africa",
    href: "/south-africa/treatment-in-india",
    flag: "🇿🇦",
    flagLabel: "Flag of South Africa",
    visaNote:
      "South Africa is currently on India’s e-Visa list. The official fee list shows South Africa at US$00 (gratis). South African patients can use the e-Medical Visa or apply through the High Commission of India in Pretoria.",
  },
  {
    name: "South Sudan",
    city: "Juba",
    destination: "India",
    continent: "Africa",
    href: "/south-sudan/treatment-in-india",
    flag: "🇸🇸",
    flagLabel: "Flag of South Sudan",
    visaNote:
      "South Sudan is not currently on India’s e-Visa list. South Sudanese patients apply for a Medical Visa through the Embassy of India in Juba.",
  },
  {
    name: "Sudan",
    city: "Khartoum",
    destination: "India",
    continent: "Africa",
    href: "/sudan/treatment-in-india",
    flag: "🇸🇩",
    flagLabel: "Flag of Sudan",
    visaNote:
      "Sudan is not currently on India’s e-Visa list. Sudanese patients apply for a Medical Visa through the Embassy of India in Khartoum, which currently operates from Camp Port Sudan.",
  },
  {
    name: "Tanzania",
    city: "Dar es Salaam",
    destination: "India",
    continent: "Africa",
    href: "/tanzania/treatment-in-india",
    flag: "🇹🇿",
    flagLabel: "Flag of Tanzania",
    visaNote:
      "Tanzanian passport holders can currently use India’s e-Medical Visa or apply through the High Commission of India in Dar es Salaam.",
  },
  {
    name: "Turkmenistan",
    city: "Ashgabat",
    destination: "India",
    continent: "Central Asia",
    href: "/turkmenistan/treatment-in-india",
    flag: "🇹🇲",
    flagLabel: "Flag of Turkmenistan",
    visaNote:
      "Turkmenistan is not currently on India’s e-Visa list. Turkmen patients apply for a Medical Visa through the Embassy of India in Ashgabat.",
  },
  {
    name: "Uganda",
    city: "Kampala",
    destination: "India",
    continent: "Africa",
    href: "/uganda/treatment-in-india",
    flag: "🇺🇬",
    flagLabel: "Flag of Uganda",
    visaNote:
      "Uganda is currently on India’s e-Visa list. Ugandan patients can use the e-Medical Visa or apply through the High Commission of India in Kampala. The Mission currently notes that online e-Visa and regular visa applications were enabled from 10 September 2026.",
  },
  {
    name: "Ukraine",
    city: "Kyiv",
    destination: "India",
    continent: "Europe",
    href: "/ukraine/treatment-in-india",
    flag: "🇺🇦",
    flagLabel: "Flag of Ukraine",
    visaNote:
      "Ukraine is currently on India’s e-Visa list. A category-wise official table lists the e-Medical Visa at US$85. Ukrainian patients can use the e-Medical Visa or apply through the Embassy of India in Kyiv.",
  },
  {
    name: "Uzbekistan",
    city: "Tashkent",
    destination: "India",
    continent: "Central Asia",
    href: "/uzbekistan/treatment-in-india",
    flag: "🇺🇿",
    flagLabel: "Flag of Uzbekistan",
    visaNote:
      "Uzbekistan is currently on India’s e-Visa list. The official fee list shows Uzbekistan at US$80. Uzbek patients can use the e-Medical Visa or apply through the Embassy of India in Tashkent.",
  },
  {
    name: "Zambia",
    city: "Lusaka",
    destination: "India",
    continent: "Africa",
    href: "/zambia/treatment-in-india",
    flag: "🇿🇲",
    flagLabel: "Flag of Zambia",
    visaNote:
      "Zambia is currently on India’s e-Visa list. Zambian patients can use the e-Medical Visa or apply through the High Commission of India in Lusaka.",
  },
  {
    name: "Zimbabwe",
    city: "Harare",
    destination: "India",
    continent: "Africa",
    href: "/zimbabwe/treatment-in-india",
    flag: "🇿🇼",
    flagLabel: "Flag of Zimbabwe",
    visaNote:
      "Zimbabwe is currently on India’s e-Visa list. Zimbabwean patients can use the e-Medical Visa or apply through the Embassy of India in Harare.",
  },
];

export const ORIGIN_COUNTRY_SECTION = {
  eyebrow: "Written for your country",
  title: "Travelling from your country",
  lede: "Medical visa guidance, what to budget and how the journey works — written for patients from each country we publish a guide for.",
  routeLabel: (city: string, destination: string) => `${city} → ${destination}`,
  visaTitle: (name: string) => `Medical visa to India from ${name}`,
  ctaLabel: "Get a medical opinion",
} as const;
