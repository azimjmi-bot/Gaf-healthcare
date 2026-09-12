import type { CostArticle } from "@/data/cost-articles/types";
import type { Treatment } from "@/lib/treatments";
import { toSlug } from "@/lib/taxonomy";

export function pediatricHematologyImage(procedure: string) {
  return `/images/cost/pediatric-hematology/${toSlug(procedure)}-illustration.webp`;
}

/**
 * Shared treatment slugs keep one clinical article, but a Pediatric Hematology
 * filter should show the age-appropriate procedure illustration.
 */
export function withContextualTreatmentImages(
  article: CostArticle,
  treatment: Pick<Treatment, "name" | "specialtySlug">,
): CostArticle {
  if (treatment.specialtySlug !== "pediatric-hematology" || !article.figures?.length) {
    return article;
  }

  const [first, ...rest] = article.figures;
  return {
    ...article,
    figures: [
      {
        ...first,
        src: pediatricHematologyImage(treatment.name),
        alt: `${treatment.name} illustrated for a pediatric hematology pathway with age-appropriate marrow, donor or cell-therapy context`,
      },
      ...rest,
    ],
  };
}
