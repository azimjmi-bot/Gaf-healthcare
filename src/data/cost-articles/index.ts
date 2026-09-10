import { breastConservingSurgery } from "./breast-conserving-surgery-lumpectomy";
import { mastectomy } from "./mastectomy";
import { nippleSparingMastectomy } from "./nipple-sparing-mastectomy";
import { oncoplasticBreastSurgery } from "./oncoplastic-breast-surgery";
import type { CostArticle } from "./types";

export type { CostArticle } from "./types";

/**
 * Long-form cost articles, keyed by treatment slug. A procedure without an entry
 * keeps the default cost-sheet rendering, so this registry grows one procedure at
 * a time without touching the route.
 */
export const costArticles: Record<string, CostArticle> = {
  [breastConservingSurgery.slug]: breastConservingSurgery,
  [mastectomy.slug]: mastectomy,
  [nippleSparingMastectomy.slug]: nippleSparingMastectomy,
  [oncoplasticBreastSurgery.slug]: oncoplasticBreastSurgery,
};

export function getCostArticle(slug: string): CostArticle | undefined {
  return costArticles[slug];
}
