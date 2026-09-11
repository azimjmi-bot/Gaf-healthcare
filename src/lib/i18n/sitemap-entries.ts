import type { MetadataRoute } from "next";
import { costArticles } from "@/data/cost-articles";
import { listPublishedPosts } from "@/lib/blogs";
import { costsFilterPath, doctorsPath, hospitalsPath } from "@/lib/catalog-links";
import { catalogSpecialtyName } from "@/lib/catalog-links";
import { doctors, hospitals, treatments } from "@/lib/data";
import { absoluteUrl, SITE_URL } from "@/lib/seo";
import type { AppLocale } from "@/lib/i18n/languages";
import { CITIES, INDIA_CITIES, SPECIALTIES } from "@/lib/taxonomy";

const SEARCH_CONSOLE_ORIGIN = SITE_URL;

function entry(
  path: string,
  locale: AppLocale,
  opts: { lastModified?: Date | string; changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"]; priority?: number } = {},
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path, locale),
    lastModified: opts.lastModified ? new Date(opts.lastModified) : new Date(),
    changeFrequency: opts.changeFrequency ?? "weekly",
    priority: opts.priority ?? 0.6,
  };
}

function cityName(slug: string) {
  return CITIES.find((city) => city.slug === slug)?.name ?? slug;
}

export function buildLocaleSitemap(locale: AppLocale): MetadataRoute.Sitemap {
  if (!SEARCH_CONSOLE_ORIGIN.startsWith("https://gaf.healthcare")) {
    throw new Error("Sitemap origin must match the verified Google Search Console property https://gaf.healthcare");
  }

  const now = new Date();
  const homePriority = locale === "en" ? 1 : 0.8;
  const sectionPriority = locale === "en" ? 0.8 : 0.7;
  const urls: MetadataRoute.Sitemap = [
    entry("/", locale, { lastModified: now, changeFrequency: "weekly", priority: homePriority }),
    entry("/doctors", locale, { lastModified: now, changeFrequency: "weekly", priority: sectionPriority }),
    entry("/hospitals", locale, { lastModified: now, changeFrequency: "weekly", priority: sectionPriority }),
    entry("/costs", locale, { lastModified: now, changeFrequency: "weekly", priority: sectionPriority }),
    entry("/blogs", locale, { lastModified: now, changeFrequency: "weekly", priority: locale === "en" ? 0.7 : 0.6 }),
    entry("/consult", locale, { lastModified: now, changeFrequency: "monthly", priority: 0.5 }),
  ];

  urls.push(entry(costsFilterPath({ destination: "India" }), locale, { priority: 0.7 }));
  urls.push(entry(doctorsPath({ destination: "India" }), locale, { priority: 0.7 }));
  urls.push(entry(hospitalsPath({ destination: "India" }), locale, { priority: 0.7 }));

  for (const city of INDIA_CITIES) {
    urls.push(entry(doctorsPath({ destination: "India", city }), locale, { priority: 0.6 }));
    urls.push(entry(hospitalsPath({ destination: "India", city }), locale, { priority: 0.6 }));
    urls.push(entry(costsFilterPath({ destination: "India", city }), locale, { priority: 0.6 }));
  }

  for (const specialty of SPECIALTIES) {
    urls.push(entry(doctorsPath({ destination: "India", specialty: specialty.name }), locale, { priority: 0.55 }));
    urls.push(entry(hospitalsPath({ destination: "India", specialty: specialty.name }), locale, { priority: 0.55 }));
    urls.push(entry(costsFilterPath({ destination: "India", specialty: specialty.name }), locale, { priority: 0.55 }));
  }

  for (const doctor of doctors) {
    urls.push(entry(`/doctors/${doctor.slug}`, locale, { changeFrequency: "monthly", priority: 0.6 }));
  }

  for (const hospital of hospitals) {
    urls.push(entry(`/hospitals/${hospital.slug}`, locale, { changeFrequency: "monthly", priority: 0.6 }));
    urls.push(entry(`/hospitals/${hospital.slug}/doctors`, locale, { changeFrequency: "monthly", priority: 0.45 }));
    urls.push(entry(`/hospitals/${hospital.slug}/procedures`, locale, { changeFrequency: "monthly", priority: 0.45 }));
  }

  for (const treatment of treatments) {
    const article = costArticles[treatment.slug];
    urls.push(
      entry(`/costs/${treatment.slug}`, locale, {
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
        specialty: catalogSpecialtyName(treatment),
        procedure: treatment.name,
      });
      urls.push(
        entry(path, locale, {
          lastModified: article.lastUpdated,
          changeFrequency: "monthly",
          priority: 0.65,
        }),
      );
    }
  }

  for (const post of listPublishedPosts(locale).filter((p) => p.allowIndex)) {
    urls.push(
      entry(`/blogs/${post.slug}`, locale, {
        lastModified: post.updatedAt || post.publishedAt || post.date,
        changeFrequency: "monthly",
        priority: 0.5,
      }),
    );
  }

  const seen = new Set<string>();
  const out: MetadataRoute.Sitemap = [];
  for (const row of urls) {
    if (seen.has(row.url)) continue;
    seen.add(row.url);
    out.push(row);
  }
  return out;
}

export function sitemapXml(entries: MetadataRoute.Sitemap) {
  const body = entries
    .map((row) => {
      const last = row.lastModified instanceof Date ? row.lastModified.toISOString() : row.lastModified;
      return `<url><loc>${escapeXml(row.url)}</loc>${last ? `<lastmod>${last}</lastmod>` : ""}</url>`;
    })
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
}

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
