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
];

export const ORIGIN_COUNTRY_SECTION = {
  eyebrow: "Written for your country",
  title: "Travelling from your country",
  lede: "Medical visa guidance, what to budget and how the journey works — written for patients from each country we publish a guide for.",
  routeLabel: (city: string, destination: string) => `${city} → ${destination}`,
  visaTitle: (name: string) => `Medical visa to India from ${name}`,
  visaCta: (name: string) => `Read the ${name} visa notes`,
} as const;
