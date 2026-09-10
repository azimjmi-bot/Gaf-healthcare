import { breastConservingSurgery } from "./breast-conserving-surgery-lumpectomy";
import { breastReconstruction } from "./breast-reconstruction";
import { colectomy } from "./colectomy";
import { esophagectomy } from "./esophagectomy";
import { gastrectomy } from "./gastrectomy";
import { mastectomy } from "./mastectomy";
import { nippleSparingMastectomy } from "./nipple-sparing-mastectomy";
import { oncoplasticBreastSurgery } from "./oncoplastic-breast-surgery";
import { rectalCancerSurgery } from "./rectal-cancer-surgery";
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
  [colectomy.slug]: colectomy,
  [esophagectomy.slug]: esophagectomy,
  [gastrectomy.slug]: gastrectomy,
  [mastectomy.slug]: mastectomy,
  [nippleSparingMastectomy.slug]: nippleSparingMastectomy,
  [oncoplasticBreastSurgery.slug]: oncoplasticBreastSurgery,
  [rectalCancerSurgery.slug]: rectalCancerSurgery,
  [sentinelLymphNodeBiopsy.slug]: sentinelLymphNodeBiopsy,
};

export function getCostArticle(slug: string): CostArticle | undefined {
  return costArticles[slug];
}
