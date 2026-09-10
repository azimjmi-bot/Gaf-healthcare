import type { MetadataRoute } from "next";
import { costArticles } from "@/data/cost-articles";
import { listPublishedPosts } from "@/lib/blogs";
import { costsFilterPath, doctorsPath, hospitalsPath } from "@/lib/catalog-links";
import { doctors, hospitals, treatments } from "@/lib/data";
import { absoluteUrl, SITE_URL } from "@/lib/seo";
import { localePath } from "@/lib/i18n/path";
import { listCompletedTranslations } from "@/lib/i18n/store";
import { CITIES, INDIA_CITIES, SPECIALTIES } from "@/lib/taxonomy";

/**
 * Google Search Console is verified for https://gaf.healthcare
 * (URL-prefix property). Every loc must use that host — not www,
 * not a preview host, and not a prior Hostinger staging URL.
 */
const SEARCH_CONSOLE_ORIGIN = SITE_URL;

function entry(
  path: string,
  opts: { lastModified?: Date | string; changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"]; priority?: number } = {},
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    lastModified: opts.lastModified ? new Date(opts.lastModified) : new Date(),
    changeFrequency: opts.changeFrequency ?? "weekly",
    priority: opts.priority ?? 0.6,
  };
}

function cityName(slug: string) {
  return CITIES.find((city) => city.slug === slug)?.name ?? slug;
}

export default function sitemap(): MetadataRoute.Sitemap {
  if (!SEARCH_CONSOLE_ORIGIN.startsWith("https://gaf.healthcare")) {
    throw new Error("Sitemap origin must match the verified Google Search Console property https://gaf.healthcare");
  }

  const now = new Date();
  const urls: MetadataRoute.Sitemap = [
    entry("/", { lastModified: now, changeFrequency: "weekly", priority: 1 }),
    entry("/doctors", { lastModified: now, changeFrequency: "weekly", priority: 0.8 }),
    entry("/hospitals", { lastModified: now, changeFrequency: "weekly", priority: 0.8 }),
    entry("/costs", { lastModified: now, changeFrequency: "weekly", priority: 0.8 }),
    entry("/blogs", { lastModified: now, changeFrequency: "weekly", priority: 0.7 }),
    entry("/consult", { lastModified: now, changeFrequency: "monthly", priority: 0.5 }),
  ];

  urls.push(entry(costsFilterPath({ destination: "India" }), { priority: 0.7 }));
  urls.push(entry(doctorsPath({ destination: "India" }), { priority: 0.7 }));
  urls.push(entry(hospitalsPath({ destination: "India" }), { priority: 0.7 }));

  for (const city of INDIA_CITIES) {
    urls.push(entry(doctorsPath({ destination: "India", city }), { priority: 0.6 }));
    urls.push(entry(hospitalsPath({ destination: "India", city }), { priority: 0.6 }));
    urls.push(entry(costsFilterPath({ destination: "India", city }), { priority: 0.6 }));
  }

  for (const specialty of SPECIALTIES) {
    urls.push(entry(doctorsPath({ destination: "India", specialty: specialty.name }), { priority: 0.55 }));
    urls.push(entry(hospitalsPath({ destination: "India", specialty: specialty.name }), { priority: 0.55 }));
    urls.push(entry(costsFilterPath({ destination: "India", specialty: specialty.name }), { priority: 0.55 }));
  }

  for (const doctor of doctors) {
    urls.push(entry(`/doctors/${doctor.slug}`, { changeFrequency: "monthly", priority: 0.6 }));
  }

  for (const hospital of hospitals) {
    urls.push(entry(`/hospitals/${hospital.slug}`, { changeFrequency: "monthly", priority: 0.6 }));
    urls.push(entry(`/hospitals/${hospital.slug}/doctors`, { changeFrequency: "monthly", priority: 0.45 }));
    urls.push(entry(`/hospitals/${hospital.slug}/procedures`, { changeFrequency: "monthly", priority: 0.45 }));
  }

  for (const treatment of treatments) {
    const article = costArticles[treatment.slug];
    urls.push(
      entry(`/costs/${treatment.slug}`, {
        lastModified: article?.lastUpdated,
        changeFrequency: "monthly",
        priority: 0.7,
      }),
    );

    if (!article) continue;
    for (const city of article.cities) {
      if (!city.page) continue;
      const path = costsFilterPath({
        destination: "India",
        city: cityName(city.citySlug),
        specialty: treatment.category,
        procedure: treatment.name,
      });
      urls.push(
        entry(path, {
          lastModified: article.lastUpdated,
          changeFrequency: "monthly",
          priority: 0.65,
        }),
      );
    }
  }

  for (const post of listPublishedPosts().filter((p) => p.allowIndex)) {
    urls.push(
      entry(`/blogs/${post.slug}`, {
        lastModified: post.updatedAt || post.publishedAt || post.date,
        changeFrequency: "monthly",
        priority: 0.5,
      }),
    );
  }

  const seen = new Set<string>();
  const english = urls.filter((row) => {
    if (seen.has(row.url)) return false;
    seen.add(row.url);
    return true;
  });

  const extra: MetadataRoute.Sitemap = [];
  for (const record of listCompletedTranslations()) {
    if (record.status !== "completed") continue;
    const path = publicPathForTranslation(record);
    if (!path) continue;
    extra.push(
      entry(localePath(path, record.languageCode), {
        lastModified: record.translatedAt || record.updatedAt,
        changeFrequency: "weekly",
        priority: 0.5,
      }),
    );
  }

  return [...english, ...extra].filter((row) => {
    if (seen.has(row.url)) return false;
    seen.add(row.url);
    return true;
  });
}

function publicPathForTranslation(record: { sourceType: string; sourceId: string }) {
  if (record.sourceType === "ui" && record.sourceId === "chrome") return "/";
  if (record.sourceType === "page" && record.sourceId === "home") return "/";
  if (record.sourceType === "page" && record.sourceId === "blogs-index") return "/blogs";
  if (record.sourceType === "blog") return `/blogs/${record.sourceId}`;
  if (record.sourceType === "doctor") return `/doctors/${record.sourceId}`;
  if (record.sourceType === "hospital") return `/hospitals/${record.sourceId}`;
  if (record.sourceType === "cost") return `/costs/${record.sourceId}`;
  return null;
}
