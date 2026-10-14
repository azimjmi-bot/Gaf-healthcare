import type { Metadata } from "next";
import type { CatalogQuery } from "@/lib/catalog-options";
import { costsFilterPath } from "@/lib/catalog-links";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { withLocaleMetadata } from "@/lib/i18n/metadata";

export function arabicCostCopy(query: CatalogQuery) {
  const procedure = taxonomyLabel(query.procedure ?? "", "ar");
  const specialty = taxonomyLabel(query.specialty ?? "", "ar");
  const country = taxonomyLabel(query.destination ?? "India", "ar");
  const city = query.city ? taxonomyLabel(query.city, "ar") : undefined;
  const place = city ? `${city}، ${country}` : country;
  const path = costsFilterPath(query);
  const title = `تكلفة ${procedure} في ${place}`;
  const description = `قارن النطاق التخطيطي لتكلفة ${procedure} في ${place} ضمن ${specialty}، وراجع مدة الإقامة وما قد يشمله العرض قبل السفر. الأرقام إرشادية وليست عرض سعر؛ وتُثبَّت الخطة بعد مراجعة السجلات.`;
  return { procedure, specialty, country, city, place, path, title, description };
}

export function arabicCostProcedureMetadata(query: CatalogQuery): Metadata {
  const copy = arabicCostCopy(query);
  return withLocaleMetadata(
    {
      title: copy.title,
      description: copy.description,
      keywords: [
        copy.title,
        `تكلفة ${copy.procedure} في الهند`,
        `${copy.specialty} في الهند`,
        `سعر ${copy.procedure}`,
        "تكلفة العلاج في الهند",
        "السياحة العلاجية في الهند",
      ],
      openGraph: {
        title: copy.title,
        description: copy.description,
        type: "article",
      },
      twitter: { card: "summary_large_image", title: copy.title, description: copy.description },
    },
    copy.path,
    "ar",
    ["en", "ar"],
  );
}
