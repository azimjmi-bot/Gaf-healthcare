/**
 * Origin-country hubs (where patients travel from), not care destinations.
 * Only published pages are listed. Do not add a card until its route exists.
 */
export type OriginCountryHub = {
  name: string;
  city: string;
  destination: string;
  href: string;
  flag: string;
  flagLabel: string;
  visaNote: string;
};

export const ORIGIN_COUNTRY_HUBS: OriginCountryHub[] = [
  {
    name: "Algeria",
    city: "Algiers",
    destination: "India",
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
    href: "/angola/treatment-in-india",
    flag: "🇦🇴",
    flagLabel: "Flag of Angola",
    visaNote:
      "Angola is currently on India’s e-Visa list. Angolan patients can use the e-Medical Visa or apply through the Embassy of India in Luanda.",
  },
  {
    name: "Benin",
    city: "Cotonou",
    destination: "India",
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
    href: "/guinea/treatment-in-india",
    flag: "🇬🇳",
    flagLabel: "Flag of Guinea",
    visaNote:
      "Guinea is currently on India’s e-Visa list. Guinean patients can use the e-Medical Visa or apply through the Embassy of India in Conakry.",
  },
  {
    name: "Kenya",
    city: "Nairobi",
    destination: "India",
    href: "/kenya/treatment-in-india",
    flag: "🇰🇪",
    flagLabel: "Flag of Kenya",
    visaNote:
      "Kenya is currently on India’s e-Visa list. Kenyan patients can use the e-Medical Visa or apply through the High Commission of India in Nairobi.",
  },
  {
    name: "Liberia",
    city: "Monrovia",
    destination: "India",
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
    href: "/mauritius/treatment-in-india",
    flag: "🇲🇺",
    flagLabel: "Flag of Mauritius",
    visaNote:
      "Mauritius is currently on India’s e-Visa list. Mauritian patients can use the e-Medical Visa or apply through the High Commission of India in Port Louis.",
  },
  {
    name: "Morocco",
    city: "Casablanca",
    destination: "India",
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
    href: "/nigeria/treatment-in-india",
    flag: "🇳🇬",
    flagLabel: "Flag of Nigeria",
    visaNote:
      "Nigeria is not currently on India’s e-Visa list. Nigerian patients apply for a Medical Visa through the High Commission of India in Abuja or the Consulate General of India in Lagos.",
  },
  {
    name: "Rwanda",
    city: "Kigali",
    destination: "India",
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
    href: "/tanzania/treatment-in-india",
    flag: "🇹🇿",
    flagLabel: "Flag of Tanzania",
    visaNote:
      "Tanzanian passport holders can currently use India’s e-Medical Visa or apply through the High Commission of India in Dar es Salaam.",
  },
  {
    name: "Uganda",
    city: "Kampala",
    destination: "India",
    href: "/uganda/treatment-in-india",
    flag: "🇺🇬",
    flagLabel: "Flag of Uganda",
    visaNote:
      "Uganda is currently on India’s e-Visa list. Ugandan patients can use the e-Medical Visa or apply through the High Commission of India in Kampala. The Mission currently notes that online e-Visa and regular visa applications were enabled from 10 September 2026.",
  },
  {
    name: "Zambia",
    city: "Lusaka",
    destination: "India",
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
