export type CostCitySlug = "delhi-ncr" | "mumbai" | "bengaluru" | "chennai" | "hyderabad";

/**
 * City-level pricing is not in the catalog. `costRange` and `stay` stay optional
 * so a page inherits the India planning band until researched city figures exist.
 */
export type CityEditorial = {
  citySlug: CostCitySlug;
  ecosystem: string;
  logistics: string;
  costNote: string;
  costRange?: string;
  stay?: string;
};

/**
 * `range` is a researched figure. When it is absent the renderer models a band
 * from the India planning range using `multiplier` and labels it as modelled.
 */
export type DestinationRow = {
  country: string;
  range?: string;
  multiplier?: [number, number];
  stay: string;
  context: string;
};

export type LabelledDetail = { label: string; detail: string };

export type CostArticle = {
  procedure: string;
  slug: string;
  lastUpdated: string;
  seoTitle: string;
  seoDescription: string;
  heading: string;
  /** Answer-first block. Keep the first paragraph extractable in isolation. */
  answer: string[];
  indiaCost: string[];
  costDrivers: LabelledDetail[];
  inclusions: LabelledDetail[];
  exclusions: LabelledDetail[];
  overview: {
    what: string[];
    who: string[];
    how: string[];
    variations: LabelledDetail[];
    preparation: string[];
    recovery: string[];
  };
  fullPathway?: { intro: string[]; stages: LabelledDetail[] };
  journey: LabelledDetail[];
  documents: string[];
  cities: CityEditorial[];
  destinations: DestinationRow[];
  questionsToAsk: string[];
  faqs: { q: string; a: string }[];
  doctorHeading: string;
  doctorIntro: string;
  hospitalHeading: string;
  hospitalIntro: string;
  relatedProcedures: string[];
  relatedBlogs?: { href: string; label: string }[];
};
