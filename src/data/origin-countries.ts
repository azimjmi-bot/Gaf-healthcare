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
};

export const ORIGIN_COUNTRY_HUBS: OriginCountryHub[] = [
  {
    name: "Tanzania",
    city: "Dar es Salaam",
    destination: "India",
    href: "/tanzania/treatment-in-india",
    flag: "🇹🇿",
    flagLabel: "Flag of Tanzania",
  },
];

export const ORIGIN_COUNTRY_SECTION = {
  eyebrow: "Written for your country",
  title: "Travelling from your country",
  lede: "Medical visa guidance, what to budget and how the journey works — written for patients from each country we publish a guide for.",
  routeLabel: (city: string, destination: string) => `${city} → ${destination}`,
  visaTitle: "Medical visa to India — the step-by-step notes",
  visaBody:
    "e-Visa or High Commission route, documents, attendant visas and the hospital invitation letter. Confirm current rules before you apply.",
  visaCta: "Read the Tanzania visa notes",
  visaHref: "/tanzania/treatment-in-india#medical-visa",
} as const;
