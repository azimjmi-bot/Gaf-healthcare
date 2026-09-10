import type { Metadata } from "next";
import { prettyCatalogPath, type CatalogBasePath } from "@/lib/pretty-catalog-path";
import type { CatalogQuery } from "@/lib/catalog-options";
import { extractBlogFields, extractDoctorFields, extractHospitalFields, extractTreatmentFields, extractUiFields } from "@/lib/i18n/extract";
import { SOURCE_LOCALE, type AppLocale } from "@/lib/i18n/languages";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { getRequestLocale } from "@/lib/i18n/request";
import { availableLocales } from "@/lib/i18n/localize";
import { getLocalizedFields } from "@/lib/i18n/service";
import type { SourceType, TranslationFields } from "@/lib/i18n/types";
import { getCostArticle } from "@/data/cost-articles";
import { getDoctor, getHospital, getTreatment } from "@/lib/data";
import { getPost } from "@/lib/blogs";
import { catalogMetadata, doctorMetadata, hospitalMetadata, treatmentMetadata, costArticleMetadata } from "@/lib/seo";
import { interpolateCostArticle } from "@/lib/cost-article";

export async function localizedMeta(
  englishPath: string,
  meta: Metadata,
  sourceType: SourceType,
  sourceId: string,
  fields: TranslationFields,
  locale?: AppLocale,
): Promise<Metadata> {
  const active = locale ?? (await getRequestLocale());
  const translated = await getLocalizedFields({
    sourceType,
    sourceId,
    language: active,
    fields,
    generateIfMissing: active !== SOURCE_LOCALE,
  });
  const next: Metadata = {
    ...meta,
    title: translated.seoTitle || translated.title || meta.title,
    description: translated.seoDescription || translated.excerpt || meta.description,
    openGraph: {
      ...meta.openGraph,
      title: (translated.seoTitle || translated.title || meta.openGraph?.title || meta.title) ?? undefined,
      description: (translated.seoDescription || translated.excerpt || meta.openGraph?.description || meta.description) ?? undefined,
    },
    twitter: {
      ...meta.twitter,
      title: String(translated.seoTitle || translated.title || meta.twitter?.title || meta.title || ""),
      description: String(translated.seoDescription || translated.excerpt || meta.twitter?.description || meta.description || ""),
    },
  };
  const available = availableLocales(sourceType, sourceId, fields);
  const locales = available.includes(active) ? available : active === "en" ? available : [...available, active];
  return withLocaleMetadata(next, englishPath, active, locales);
}

export async function doctorPageMetadata(slug: string): Promise<Metadata> {
  const doctor = getDoctor(slug);
  if (!doctor) return { title: "Doctor" };
  return localizedMeta(`/doctors/${slug}`, doctorMetadata(doctor), "doctor", slug, extractDoctorFields(doctor));
}

export async function hospitalPageMetadata(slug: string): Promise<Metadata> {
  const hospital = getHospital(slug);
  if (!hospital) return { title: "Hospital" };
  return localizedMeta(`/hospitals/${slug}`, hospitalMetadata(hospital), "hospital", slug, extractHospitalFields(hospital));
}

export async function costPageMetadata(slug: string): Promise<Metadata> {
  const treatment = getTreatment(slug);
  if (!treatment) return { title: "Treatment Cost" };
  const article = getCostArticle(treatment.slug);
  const english = article
    ? costArticleMetadata(treatment, interpolateCostArticle(article, treatment), {
        image: article.figures?.[0]?.src,
        imageAlt: article.figures?.[0]?.alt,
      })
    : treatmentMetadata(treatment);
  return localizedMeta(`/costs/${slug}`, english, "cost", slug, extractTreatmentFields(treatment, article));
}

export async function blogPageMetadata(post: NonNullable<ReturnType<typeof getPost>>): Promise<Metadata> {
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const english: Metadata = {
    title,
    description,
    robots: post.allowIndex ? undefined : { index: false, follow: true },
    openGraph: {
      title,
      description,
      images: post.ogImage || post.image ? [{ url: post.ogImage || post.image }] : undefined,
    },
  };
  return localizedMeta(`/blogs/${post.slug}`, english, "blog", post.slug, extractBlogFields(post));
}

export async function catalogPageMetadata(
  entity: "doctors" | "hospitals" | "treatments",
  query: CatalogQuery,
): Promise<Metadata> {
  const locale = await getRequestLocale();
  const base: CatalogBasePath = entity === "doctors" ? "/doctors" : entity === "hospitals" ? "/hospitals" : "/costs";
  const englishPath = prettyCatalogPath(base, query);
  const english = catalogMetadata(entity, query);
  const fields: TranslationFields = {
    seoTitle: String(english.title || ""),
    seoDescription: String(english.description || ""),
  };
  return localizedMeta(englishPath, english, "copy", `${entity}:${englishPath}`, fields, locale);
}

export async function chromePageMetadata(englishPath: string, meta: Metadata, sourceId: string): Promise<Metadata> {
  const fields = extractUiFields();
  const extra: TranslationFields = {
    ...fields,
    seoTitle: String(meta.title && typeof meta.title === "object" && "absolute" in meta.title ? meta.title.absolute : fields["seo.homeTitle"]),
    seoDescription: String(meta.description || fields["seo.homeDescription"]),
  };
  if (englishPath === "/") {
    extra.seoTitle = extra["seo.homeTitle"] || extra.seoTitle;
    extra.seoDescription = extra["seo.homeDescription"] || extra.seoDescription;
  }
  return localizedMeta(englishPath, meta, "ui", "chrome", extra);
}
