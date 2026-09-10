import { breastConservingSurgery } from "./breast-conserving-surgery-lumpectomy";
import { breastReconstruction } from "./breast-reconstruction";
import { mastectomy } from "./mastectomy";
import { nippleSparingMastectomy } from "./nipple-sparing-mastectomy";
import { oncoplasticBreastSurgery } from "./oncoplastic-breast-surgery";
import { sentinelLymphNodeBiopsy } from "./sentinel-lymph-node-biopsy";
import type { CostArticle } from "./types";

export type { CostArticle } from "./types";

/**
 * Long-form cost articles, keyed by treatment slug. A procedure without an entry
 * keeps the default cost-sheet rendering, so this registry grows one procedure at
 * a time without touching the route.
 */
export const costArticles: Record<string, CostArticle> = {
  [breastConservingSurgery.slug]: breastConservingSurgery,
  [breastReconstruction.slug]: breastReconstruction,
  [mastectomy.slug]: mastectomy,
  [nippleSparingMastectomy.slug]: nippleSparingMastectomy,
  [oncoplasticBreastSurgery.slug]: oncoplasticBreastSurgery,
  [sentinelLymphNodeBiopsy.slug]: sentinelLymphNodeBiopsy,
};

export function getCostArticle(slug: string): CostArticle | undefined {
  return costArticles[slug];
}
