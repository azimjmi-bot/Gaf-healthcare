import type { MetadataRoute } from "next";
import { costArticles } from "@/data/cost-articles";
import { getSpecialtyPage } from "@/data/specialty-pages";
import { costsFilterPath, doctorsPath, hospitalsPath } from "@/lib/catalog-links";
import { catalogSpecialtyName } from "@/lib/catalog-links";
import { doctorSpecialtySitemapPaths } from "@/lib/doctor-discovery";
import { hospitalSpecialtySitemapPaths } from "@/lib/radiation-hospital-page";
import { doctors, hospitals, treatments } from "@/lib/data";
import { SITE_URL } from "@/lib/seo-url";
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
import { publishedFacetPaths } from "@/lib/i18n/facet-candidates";
import {
  blogPostSitemapOpts,
  dedupeSitemap,
  isLocaleLive,
  postTimestamp,
  publishedIndexablePosts,
  sitemapEntry,
} from "@/lib/i18n/blog-sitemap";
import { sitemapIndexXml, sitemapXml } from "@/lib/i18n/sitemap-xml";

export { buildBlogSitemap, buildSitemapIndex } from "@/lib/i18n/blog-sitemap";
export { sitemapIndexXml, sitemapXml };

const SEARCH_CONSOLE_ORIGIN = SITE_URL;
const LOCALE_SITEMAP_TTL_MS = 5 * 60 * 1000;
const localeXmlCache = new Map<string, { xml: string; expires: number }>();

export const LANGUAGE_SITEMAP_PATHS = Object.fromEntries(
  LOCALES.map((locale) => [locale, `/sitemap-${locale}.xml`]),
) as Record<AppLocale, `/sitemap-${AppLocale}.xml`>;

function cityName(slug: string) {
  return CITIES.find((city) => city.slug === slug)?.name ?? slug;
}

export function buildLocaleSitemap(locale: AppLocale): MetadataRoute.Sitemap {
  if (!SEARCH_CONSOLE_ORIGIN.startsWith("https://gaf.healthcare")) {
    throw new Error("Sitemap origin must match the verified Google Search Console property https://gaf.healthcare");
  }

  const now = new Date();
  if (locale !== "en") {
    // A locale that is not live has nothing to advertise. Its pages still
    // render, but noindex means listing them would only invite a crawl of
    // pages we are asking not to be indexed.
    if (!isLocaleLive(locale)) return [];

    const localized: MetadataRoute.Sitemap = [
      sitemapEntry("/", locale, {
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      }),
    ];
    const localeTreatments = publishedCuratedTreatments(locale);
    if (localeTreatments.length > 0) {
      localized.push(
        sitemapEntry("/treatments", locale, {
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.7,
        }),
      );
    }
    for (const treatment of localeTreatments) {
      localized.push(
        sitemapEntry(`/treatments/${treatment.slug}`, locale, {
          lastModified: treatment.updatedAt,
          changeFrequency: "monthly",
          priority: treatment.featured ? 0.7 : 0.6,
        }),
      );
    }
    const localeDoctors = doctorsForLocale(locale);
    if (localeDoctors.length > 0) {
      localized.push(sitemapEntry("/doctors", locale, { priority: 0.7 }));
      for (const doctor of localeDoctors) {
        localized.push(
          sitemapEntry(`/doctors/${doctor.slug}`, locale, {
            changeFrequency: "monthly",
            priority: 0.6,
          }),
        );
      }
    }
    const localeHospitals = hospitalsForLocale(locale);
    if (localeHospitals.length > 0) {
      localized.push(sitemapEntry("/hospitals", locale, { priority: 0.7 }));
      for (const hospital of localeHospitals) {
        localized.push(
          sitemapEntry(`/hospitals/${hospital.slug}`, locale, {
            changeFrequency: "monthly",
            priority: 0.6,
          }),
        );
        if (doctorsForHospitalLocale(hospital.slug, locale).length > 0) {
          localized.push(
            sitemapEntry(`/hospitals/${hospital.slug}/doctors`, locale, {
              changeFrequency: "monthly",
              priority: 0.45,
            }),
          );
        }
      }
    }
    // Facets are listed only once their page type is approved, and only when
    // they are the canonical address for their own result set.
    for (const path of publishedFacetPaths(locale)) {
      const depth = path.split("/").filter(Boolean).length;
      localized.push(sitemapEntry(path, locale, { changeFrequency: "weekly", priority: depth <= 3 ? 0.6 : 0.5 }));
    }
    const localePosts = publishedIndexablePosts(locale);
    if (localePosts.length > 0) {
      localized.push(
        sitemapEntry("/blogs", locale, {
          lastModified: postTimestamp(localePosts[0]),
          changeFrequency: "weekly",
          priority: 0.6,
        }),
      );
      for (const post of localePosts) {
        localized.push(sitemapEntry(`/blogs/${post.slug}`, locale, blogPostSitemapOpts(post)));
      }
    }
    return dedupeSitemap(localized);
  }

  const homePriority = locale === "en" ? 1 : 0.8;
  const sectionPriority = locale === "en" ? 0.8 : 0.7;
  const urls: MetadataRoute.Sitemap = [
    sitemapEntry("/", locale, { lastModified: now, changeFrequency: "weekly", priority: homePriority }),
    sitemapEntry("/doctors", locale, { lastModified: now, changeFrequency: "weekly", priority: sectionPriority }),
    sitemapEntry("/hospitals", locale, { lastModified: now, changeFrequency: "weekly", priority: sectionPriority }),
    sitemapEntry("/costs", locale, { lastModified: now, changeFrequency: "weekly", priority: sectionPriority }),
    sitemapEntry("/treatments", locale, { lastModified: now, changeFrequency: "weekly", priority: 0.8 }),
    ...(locale === "en"
      ? [sitemapEntry("/specialties", locale, { lastModified: now, changeFrequency: "weekly", priority: 0.8 })]
      : []),
    sitemapEntry("/blogs", locale, { lastModified: now, changeFrequency: "weekly", priority: locale === "en" ? 0.7 : 0.6 }),
    sitemapEntry("/consult", locale, { lastModified: now, changeFrequency: "monthly", priority: 0.5 }),
    ...(locale === "en"
      ? [
          sitemapEntry("/algeria/treatment-in-india", locale, {
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.75,
          }),
          sitemapEntry("/angola/treatment-in-india", locale, {
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.75,
          }),
          sitemapEntry("/benin/treatment-in-india", locale, {
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.75,
          }),
          sitemapEntry("/botswana/treatment-in-india", locale, {
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.75,
          }),
          sitemapEntry("/burkina-faso/treatment-in-india", locale, {
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.75,
          }),
          sitemapEntry("/chad/treatment-in-india", locale, {
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.75,
          }),
          sitemapEntry("/cote-divoire/treatment-in-india", locale, {
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.75,
          }),
          sitemapEntry("/ethiopia/treatment-in-india", locale, {
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.75,
          }),
          sitemapEntry("/ghana/treatment-in-india", locale, {
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.75,
          }),
          sitemapEntry("/kenya/treatment-in-india", locale, {
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.75,
          }),
          sitemapEntry("/mauritius/treatment-in-india", locale, {
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.75,
          }),
          sitemapEntry("/morocco/treatment-in-india", locale, {
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.75,
          }),
          sitemapEntry("/mozambique/treatment-in-india", locale, {
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.75,
          }),
          sitemapEntry("/nigeria/treatment-in-india", locale, {
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.75,
          }),
          sitemapEntry("/south-sudan/treatment-in-india", locale, {
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.75,
          }),
          sitemapEntry("/sudan/treatment-in-india", locale, {
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.75,
          }),
          sitemapEntry("/tanzania/treatment-in-india", locale, {
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.75,
          }),
          sitemapEntry("/zambia/treatment-in-india", locale, {
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.75,
          }),
          sitemapEntry("/zimbabwe/treatment-in-india", locale, {
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.75,
          }),
        ]
      : []),
  ];

  for (const treatment of publishedCuratedTreatments(locale)) {
    urls.push(
      sitemapEntry(`/treatments/${treatment.slug}`, locale, {
        lastModified: treatment.updatedAt,
        changeFrequency: "monthly",
        priority: treatment.featured ? 0.8 : 0.7,
      }),
    );
  }

  urls.push(sitemapEntry(costsFilterPath({ destination: "India" }), locale, { priority: 0.7 }));
  urls.push(sitemapEntry(doctorsPath({ destination: "India" }), locale, { priority: 0.7 }));
  urls.push(sitemapEntry(hospitalsPath({ destination: "India" }), locale, { priority: 0.7 }));

  for (const city of INDIA_CITIES) {
    urls.push(sitemapEntry(doctorsPath({ destination: "India", city }), locale, { priority: 0.6 }));
    urls.push(sitemapEntry(hospitalsPath({ destination: "India", city }), locale, { priority: 0.6 }));
    urls.push(sitemapEntry(costsFilterPath({ destination: "India", city }), locale, { priority: 0.6 }));
  }

  for (const specialty of SPECIALTIES) {
    urls.push(sitemapEntry(doctorsPath({ destination: "India", specialty: specialty.name }), locale, { priority: 0.55 }));
    urls.push(sitemapEntry(hospitalsPath({ destination: "India", specialty: specialty.name }), locale, { priority: 0.55 }));
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
        sitemapEntry(
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
          sitemapEntry(
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
    urls.push(sitemapEntry(path, locale, { priority: depth === 3 ? 0.75 : 0.65 }));
  }

  if (locale === "en") {
    for (const path of hospitalSpecialtySitemapPaths(hospitals, doctors)) {
      const depth = path.split("/").filter(Boolean).length;
      urls.push(sitemapEntry(path, locale, { priority: depth === 3 ? 0.8 : 0.7 }));
    }
  }

  for (const doctor of doctors) {
    urls.push(sitemapEntry(`/doctors/${doctor.slug}`, locale, { changeFrequency: "monthly", priority: 0.6 }));
  }

  for (const hospital of hospitals) {
    urls.push(sitemapEntry(`/hospitals/${hospital.slug}`, locale, { changeFrequency: "monthly", priority: 0.6 }));
    urls.push(sitemapEntry(`/hospitals/${hospital.slug}/doctors`, locale, { changeFrequency: "monthly", priority: 0.45 }));
    urls.push(sitemapEntry(`/hospitals/${hospital.slug}/procedures`, locale, { changeFrequency: "monthly", priority: 0.45 }));
  }

  for (const treatment of treatments) {
    const article = costArticles[treatment.slug];
    urls.push(
      sitemapEntry(costsFilterPath({ specialty: catalogSpecialtyName(treatment), procedure: treatment.name }), locale, {
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
        sitemapEntry(
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
        sitemapEntry(path, locale, {
          lastModified: article.lastUpdated,
          changeFrequency: "monthly",
          priority: 0.65,
        }),
      );
    }
  }

  for (const post of publishedIndexablePosts(locale)) {
    urls.push(sitemapEntry(`/blogs/${post.slug}`, locale, blogPostSitemapOpts(post)));
  }

  return dedupeSitemap(urls);
}

/** Cached XML for the heavy locale catalogs so Googlebot is not waiting on a 10s rebuild. */
export function localeSitemapXml(locale: AppLocale) {
  const hit = localeXmlCache.get(locale);
  if (hit && hit.expires > Date.now()) return hit.xml;
  const xml = sitemapXml(buildLocaleSitemap(locale));
  localeXmlCache.set(locale, { xml, expires: Date.now() + LOCALE_SITEMAP_TTL_MS });
  return xml;
}
