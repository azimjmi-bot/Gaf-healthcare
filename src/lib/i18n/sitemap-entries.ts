import type { MetadataRoute } from "next";
import { costArticles } from "@/data/cost-articles";
import { getSpecialtyPage } from "@/data/specialty-pages";
import { listPublishedPosts } from "@/lib/blogs";
import { costsFilterPath, doctorsPath, hospitalsPath } from "@/lib/catalog-links";
import { catalogSpecialtyName } from "@/lib/catalog-links";
import { doctorSpecialtySitemapPaths } from "@/lib/doctor-discovery";
import { hospitalSpecialtySitemapPaths } from "@/lib/radiation-hospital-page";
import { doctors, hospitals, treatments } from "@/lib/data";
import { absoluteUrl, SITE_URL } from "@/lib/seo";
import type { AppLocale } from "@/lib/i18n/languages";
import { LOCALES } from "@/lib/i18n/languages";
import { CITIES, getCountry, INDIA_CITIES, SPECIALTIES } from "@/lib/taxonomy";
import { costCountryRecords } from "@/lib/cost-geo";
import { buildSpecialtyPageData, specialtyPageMeetsQualityThreshold } from "@/lib/specialty-page";
import {
  doctorsForHospitalLocale,
  doctorsForLocale,
  hospitalsForLocale,
} from "@/lib/locale-catalog";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";

const SEARCH_CONSOLE_ORIGIN = SITE_URL;

export const LANGUAGE_SITEMAP_PATHS = Object.fromEntries(
  LOCALES.map((locale) => [locale, `/sitemap-${locale}.xml`]),
) as Record<AppLocale, `/sitemap-${AppLocale}.xml`>;

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
  if (locale !== "en") {
    const localized: MetadataRoute.Sitemap = [
      entry("/", locale, {
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      }),
      entry("/treatments", locale, {
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      }),
    ];
    for (const treatment of publishedCuratedTreatments(locale)) {
      localized.push(
        entry(`/treatments/${treatment.slug}`, locale, {
          lastModified: treatment.updatedAt,
          changeFrequency: "monthly",
          priority: treatment.featured ? 0.7 : 0.6,
        }),
      );
    }
    const localeDoctors = doctorsForLocale(locale);
    if (localeDoctors.length > 0) {
      localized.push(entry("/doctors", locale, { priority: 0.7 }));
      for (const doctor of localeDoctors) {
        localized.push(
          entry(`/doctors/${doctor.slug}`, locale, {
            changeFrequency: "monthly",
            priority: 0.6,
          }),
        );
      }
    }
    const localeHospitals = hospitalsForLocale(locale);
    if (localeHospitals.length > 0) {
      localized.push(entry("/hospitals", locale, { priority: 0.7 }));
      for (const hospital of localeHospitals) {
        localized.push(
          entry(`/hospitals/${hospital.slug}`, locale, {
            changeFrequency: "monthly",
            priority: 0.6,
          }),
        );
        if (doctorsForHospitalLocale(hospital.slug, locale).length > 0) {
          localized.push(
            entry(`/hospitals/${hospital.slug}/doctors`, locale, {
              changeFrequency: "monthly",
              priority: 0.45,
            }),
          );
        }
      }
    }
    const localePosts = listPublishedPosts(locale).filter((post) => post.allowIndex);
    if (localePosts.length > 0) {
      localized.push(entry("/blogs", locale, { priority: 0.6 }));
      for (const post of localePosts) {
        localized.push(
          entry(`/blogs/${post.slug}`, locale, {
            lastModified: post.updatedAt || post.publishedAt || post.date,
            changeFrequency: "monthly",
            priority: 0.5,
          }),
        );
      }
    }
    return dedupeSitemap(localized);
  }

  const homePriority = locale === "en" ? 1 : 0.8;
  const sectionPriority = locale === "en" ? 0.8 : 0.7;
  const urls: MetadataRoute.Sitemap = [
    entry("/", locale, { lastModified: now, changeFrequency: "weekly", priority: homePriority }),
    entry("/doctors", locale, { lastModified: now, changeFrequency: "weekly", priority: sectionPriority }),
    entry("/hospitals", locale, { lastModified: now, changeFrequency: "weekly", priority: sectionPriority }),
    entry("/costs", locale, { lastModified: now, changeFrequency: "weekly", priority: sectionPriority }),
    entry("/treatments", locale, { lastModified: now, changeFrequency: "weekly", priority: 0.8 }),
    ...(locale === "en"
      ? [entry("/specialties", locale, { lastModified: now, changeFrequency: "weekly", priority: 0.8 })]
      : []),
    entry("/blogs", locale, { lastModified: now, changeFrequency: "weekly", priority: locale === "en" ? 0.7 : 0.6 }),
    entry("/consult", locale, { lastModified: now, changeFrequency: "monthly", priority: 0.5 }),
  ];

  for (const treatment of publishedCuratedTreatments(locale)) {
    urls.push(
      entry(`/treatments/${treatment.slug}`, locale, {
        lastModified: treatment.updatedAt,
        changeFrequency: "monthly",
        priority: treatment.featured ? 0.8 : 0.7,
      }),
    );
  }

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
    const profile =
      locale === "en" ? getSpecialtyPage("india", specialty.slug) : undefined;
    const profileData = profile ? buildSpecialtyPageData(profile) : undefined;
    if (
      !profile ||
      (profileData &&
        profile.allowIndex &&
        specialtyPageMeetsQualityThreshold(profileData))
    ) {
      urls.push(
        entry(
          costsFilterPath({ destination: "India", specialty: specialty.name }),
          locale,
          {
            lastModified: profile?.lastReviewed,
            priority: profile ? 0.8 : 0.55,
          },
        ),
      );
    }
    if (
      profile &&
      profileData &&
      profile.allowIndex &&
      specialtyPageMeetsQualityThreshold(profileData)
    ) {
      for (const city of profileData.cities) {
        const cityData = buildSpecialtyPageData(profile, city.slug);
        if (!cityData || !specialtyPageMeetsQualityThreshold(cityData)) continue;
        urls.push(
          entry(
            costsFilterPath({
              destination: "India",
              city: city.name,
              specialty: specialty.name,
            }),
            locale,
            {
              lastModified: profile.lastReviewed,
              priority: 0.7,
            },
          ),
        );
      }
    }
  }

  for (const path of doctorSpecialtySitemapPaths(doctors)) {
    const depth = path.split("/").filter(Boolean).length;
    urls.push(entry(path, locale, { priority: depth === 3 ? 0.75 : 0.65 }));
  }

  if (locale === "en") {
    for (const path of hospitalSpecialtySitemapPaths(hospitals, doctors)) {
      const depth = path.split("/").filter(Boolean).length;
      urls.push(entry(path, locale, { priority: depth === 3 ? 0.8 : 0.7 }));
    }
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
      entry(costsFilterPath({ specialty: catalogSpecialtyName(treatment), procedure: treatment.name }), locale, {
        lastModified: article?.lastUpdated,
        changeFrequency: "monthly",
        priority: 0.7,
      }),
    );

    if (!article) continue;
    const specialty = catalogSpecialtyName(treatment);

    // Country and city cost pages are listed once their CMS record carries page copy.
    // A destination or city row on its own still resolves, but stays unlisted so the
    // sitemap never advertises a page the CMS has not written yet.
    for (const record of costCountryRecords(article)) {
      if (record.isPrimary || !record.row.page) continue;
      urls.push(
        entry(
          costsFilterPath({
            destination: record.country.name,
            specialty,
            procedure: treatment.name,
          }),
          locale,
          { lastModified: article.lastUpdated, changeFrequency: "monthly", priority: 0.65 },
        ),
      );
    }

    for (const city of article.cities) {
      if (!city.page) continue;
      const country = CITIES.find((row) => row.slug === city.citySlug)?.countrySlug;
      if (!country) continue;
      const path = costsFilterPath({
        destination: getCountry(country)?.name,
        city: cityName(city.citySlug),
        specialty,
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

  return dedupeSitemap(urls);
}

function dedupeSitemap(urls: MetadataRoute.Sitemap) {
  const seen = new Set<string>();
  return urls.filter((row) => {
    if (seen.has(row.url)) return false;
    seen.add(row.url);
    return true;
  });
}

export function sitemapXml(entries: MetadataRoute.Sitemap) {
  const body = entries
    .map((row) => {
      const last = row.lastModified instanceof Date ? row.lastModified.toISOString() : row.lastModified;
      const frequency = row.changeFrequency
        ? `<changefreq>${row.changeFrequency}</changefreq>`
        : "";
      const priority =
        row.priority !== undefined ? `<priority>${row.priority}</priority>` : "";
      return `<url><loc>${escapeXml(row.url)}</loc>${last ? `<lastmod>${last}</lastmod>` : ""}${frequency}${priority}</url>`;
    })
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
}

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
