import type { Metadata } from "next";
import { prettyCatalogPath, type CatalogBasePath } from "@/lib/pretty-catalog-path";
import type { CatalogQuery } from "@/lib/catalog-options";
import { LOCALES } from "@/lib/i18n/languages";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { getRequestLocale } from "@/lib/i18n/request";
import { getCostArticle } from "@/data/cost-articles";
import { getDoctor, getHospital, getTreatment } from "@/lib/data";
import { getPost } from "@/lib/blogs";
import { catalogMetadata, doctorMetadata, hospitalMetadata, treatmentMetadata, costArticleMetadata } from "@/lib/seo";
import { interpolateCostArticle } from "@/lib/cost-article";

export async function doctorPageMetadata(slug: string): Promise<Metadata> {
  const doctor = getDoctor(slug);
  if (!doctor) return { title: "Doctor" };
  const locale = await getRequestLocale();
  return withLocaleMetadata(doctorMetadata(doctor), `/doctors/${slug}`, locale, LOCALES);
}

export async function hospitalPageMetadata(slug: string): Promise<Metadata> {
  const hospital = getHospital(slug);
  if (!hospital) return { title: "Hospital" };
  const locale = await getRequestLocale();
  return withLocaleMetadata(hospitalMetadata(hospital), `/hospitals/${slug}`, locale, LOCALES);
}

export async function costPageMetadata(slug: string): Promise<Metadata> {
  const treatment = getTreatment(slug);
  if (!treatment) return { title: "Treatment Cost" };
  const locale = await getRequestLocale();
  const article = getCostArticle(treatment.slug);
  const english = article
    ? costArticleMetadata(treatment, interpolateCostArticle(article, treatment), {
        image: article.figures?.[0]?.src,
        imageAlt: article.figures?.[0]?.alt,
      })
    : treatmentMetadata(treatment);
  return withLocaleMetadata(english, `/costs/${slug}`, locale, LOCALES);
}

export async function blogPageMetadata(post: NonNullable<ReturnType<typeof getPost>>): Promise<Metadata> {
  const locale = await getRequestLocale();
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  return withLocaleMetadata(
    {
      title,
      description,
      robots: post.allowIndex ? undefined : { index: false, follow: true },
      openGraph: {
        title,
        description,
        images: post.ogImage || post.image ? [{ url: post.ogImage || post.image }] : undefined,
      },
    },
    `/blogs/${post.slug}`,
    locale,
    LOCALES,
  );
}

export async function catalogPageMetadata(
  entity: "doctors" | "hospitals" | "treatments",
  query: CatalogQuery,
): Promise<Metadata> {
  const locale = await getRequestLocale();
  const base: CatalogBasePath = entity === "doctors" ? "/doctors" : entity === "hospitals" ? "/hospitals" : "/costs";
  const englishPath = prettyCatalogPath(base, query);
  return withLocaleMetadata(catalogMetadata(entity, query), englishPath, locale, LOCALES);
}
