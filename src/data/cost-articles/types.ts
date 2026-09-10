export type CostCitySlug = "delhi-ncr" | "mumbai" | "bengaluru" | "chennai" | "hyderabad";

export type LabelledDetail = { label: string; detail: string };

/**
 * City-level pricing is not in the catalog. `costRange` and `stay` stay optional
 * so a page inherits the India planning band until researched city figures exist.
 *
 * Optional long-form city overlay. When present, the existing `/costs` query URL
 * for that city renders unique metadata and 25–35% unique copy. No new route.
 */
export type CityPageCopy = {
  seoTitle: string;
  seoDescription: string;
  heading: string;
  intro: string[];
  answer: string[];
  costExplanation: string[];
  factors: LabelledDetail[];
  medicalTourism: string[];
  hospitalDiscussion: string[];
  faqs: { q: string; a: string }[];
};

export type CityEditorial = {
  citySlug: CostCitySlug;
  ecosystem: string;
  logistics: string;
  costNote: string;
  costRange?: string;
  stay?: string;
  page?: CityPageCopy;
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
  /** Short market position, e.g. "Self-pay surgical oncology hub". */
  positioning?: string;
  context: string;
};

export type CostFigure = {
  src: string;
  alt: string;
  caption?: string;
  /** Insert after this named block in CostArticleView. */
  after: "overview" | "how" | "journey";
  /** Infographics should contain; photographs can cover. */
  fit?: "cover" | "contain";
};

export type CostArticle = {
  procedure: string;
  /** Lowercase form for mid-sentence use, e.g. "breast-conserving surgery". */
  shortName: string;
  /** Short label for headings, e.g. "Lumpectomy". Falls back to procedure. */
  briefName?: string;
  /** Theatre time as already stated in the article, e.g. "approximately 1–2 hours". */
  duration?: string;
  slug: string;
  lastUpdated: string;
  seoTitle: string;
  seoDescription: string;
  heading: string;
  /** Answer-first block. Keep the first paragraph extractable in isolation. */
  answer: string[];
  indiaCost: string[];
  /** Qualitative bill lines (no invented component prices). */
  costComponents?: LabelledDetail[];
  costDrivers: LabelledDetail[];
  /** Shown in the “why quotes differ” accordion. Procedure-specific. */
  whyQuotesDiffer?: string;
  inclusions: LabelledDetail[];
  exclusions: LabelledDetail[];
  whyIndia?: string[];
  whyCostDiffers?: string[];
  planningClose?: string[];
  destinationIntro?: string[];
  cityIntro?: string[];
  destinationNote?: string;
  /** Procedure-specific hero lede. Replaces generic specialty catalog copy. */
  heroLede?: string;
  overviewHeading?: string;
  approachComparison?: {
    heading?: string;
    intro: string[];
    rows: {
      name: string;
      relative: string;
      detail: string;
      /** Catalog procedure name when a cost sheet exists. */
      procedure?: string;
    }[];
  };
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
