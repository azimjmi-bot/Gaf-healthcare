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
 * `range` is a researched figure and always wins. When it is absent the renderer
 * models a band by scaling the India midpoint by `costLevel`, and labels the row
 * as modelled. Supply `range` to replace a modelled row with a sourced one.
 */
export type DestinationRow = {
  country: string;
  range?: string;
  costLevel?: [number, number];
  stay: string;
  context: string;
};

export type LabelledDetail = { label: string; detail: string };

export type CostFigure = {
  src: string;
  alt: string;
  caption?: string;
  /** Insert after this named block in CostArticleView. */
  after: "overview" | "how" | "journey";
};

export type CostArticle = {
  procedure: string;
  /** Lowercase form for mid-sentence use, e.g. "breast-conserving surgery". */
  shortName: string;
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
  figures?: CostFigure[];
};
