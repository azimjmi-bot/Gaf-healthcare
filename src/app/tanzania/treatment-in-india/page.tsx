import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronDown, FileText, MapPin, Plane, Stethoscope } from "lucide-react";
import { DoctorCard } from "@/components/doctor-card";
import { HospitalCard } from "@/components/hospital-card";
import { JsonLd } from "@/components/json-ld";
import { LocaleLink as Link } from "@/components/locale-link";
import { OriginCountryVisaCta } from "@/components/origin-country-visa-cta";
import { PageIntro, CtaBand } from "@/components/page-shell";
import { PseoEstimateCtaSection } from "@/components/pseo-estimate-cta";
import { QuickAnswer } from "@/components/quick-answer";
import { TreatmentCard } from "@/components/treatment-card";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { publishedCuratedTreatments } from "@/lib/cms/curated-treatment-store";
import { doctorsPath, hospitalsPath } from "@/lib/catalog-links";
import { doctorsForLocale, hospitalsForLocale } from "@/lib/locale-catalog";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { localePageIsRenderable } from "@/lib/i18n/locale-publication";
import { getRequestLocale } from "@/lib/i18n/request";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  medicalWebPageJsonLd,
} from "@/lib/seo";
import { blogEstimateWhatsapp } from "@/lib/site";
import { catalogTreatments } from "@/lib/treatments";
import {
  TANZANIA_CANCER_TREATMENT_SLUGS,
  TANZANIA_CURATED_TREATMENT_SLUGS,
  TANZANIA_LAST_REVIEWED,
  TANZANIA_OFFICIAL_LINKS,
  TANZANIA_PAGE_LOCALES,
  TANZANIA_PAGE_PATH,
  resolveCostRows,
  resolveCuratedBySlug,
  tanzaniaCityHrefs,
  tanzaniaDoctors,
  tanzaniaHospitals,
  tanzaniaPageCopy,
  tanzaniaSpecialtyHref,
} from "@/data/tanzania-treatment-in-india";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  if (!localePageIsRenderable(locale, TANZANIA_PAGE_PATH)) {
    return { robots: { index: false, follow: false } };
  }
  const copy = tanzaniaPageCopy(locale);
  return withLocaleMetadata(
    {
      title: copy.seo.title,
      description: copy.seo.description,
      keywords: copy.seo.keywords,
      openGraph: {
        title: copy.seo.title,
        description: copy.seo.description,
        type: "website",
      },
      twitter: {
        card: "summary",
        title: copy.seo.title,
        description: copy.seo.description,
      },
    },
    TANZANIA_PAGE_PATH,
    locale,
    TANZANIA_PAGE_LOCALES,
  );
}

export default async function TanzaniaTreatmentInIndiaPage() {
  const locale = await getRequestLocale();
  if (!localePageIsRenderable(locale, TANZANIA_PAGE_PATH)) notFound();

  const copy = tanzaniaPageCopy(locale);
  const wa = blogEstimateWhatsapp("medical treatment for Tanzanian patients", "India");
  const treatments = publishedCuratedTreatments(locale);
  const featuredTreatments = resolveCuratedBySlug(treatments, TANZANIA_CURATED_TREATMENT_SLUGS);
  const cancerTreatments = resolveCuratedBySlug(treatments, TANZANIA_CANCER_TREATMENT_SLUGS);
  const costRows = locale === "en" ? resolveCostRows(catalogTreatments) : [];
  const hospitals = tanzaniaHospitals(hospitalsForLocale(locale));
  const doctors = tanzaniaDoctors(doctorsForLocale(locale));

  const webpage = medicalWebPageJsonLd({
    name: copy.seo.title,
    description: copy.seo.description,
    path: TANZANIA_PAGE_PATH,
    lastReviewed: TANZANIA_LAST_REVIEWED,
    procedureName: "Medical treatment in India",
    specialty: "International medical travel",
    about:
      "Guidance for Tanzanian patients considering specialist medical treatment in India, including hospitals, doctors, costs, medical visa and travel planning.",
    locale,
    keywords: copy.seo.keywords,
    spatialCoverage: [
      { "@type": "Country", name: "Tanzania" },
      { "@type": "Country", name: "India" },
      { "@type": "City", name: "Delhi NCR" },
      { "@type": "City", name: "Mumbai" },
      { "@type": "City", name: "Chennai" },
      { "@type": "City", name: "Hyderabad" },
      { "@type": "City", name: "Bengaluru" },
    ],
  });
  const breadcrumbs = breadcrumbJsonLd(
    [
      { name: copy.breadcrumb.home, path: "/" },
      { name: copy.breadcrumb.tanzania, path: TANZANIA_PAGE_PATH },
      { name: copy.breadcrumb.page, path: TANZANIA_PAGE_PATH },
    ],
    locale,
  );
  const faq = faqJsonLd(copy.faqs, { path: TANZANIA_PAGE_PATH, locale });

  return (
    <div className="tanzania-hub">
      <JsonLd data={webpage} />
      <JsonLd data={breadcrumbs} />
      <JsonLd data={faq} />

      <nav className="tanzania-hub__crumbs" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link href="/">{copy.breadcrumb.home}</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <span>{copy.breadcrumb.tanzania}</span>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{copy.breadcrumb.page}</li>
        </ol>
      </nav>

      <PageIntro eyebrow={copy.hero.eyebrow} title={copy.hero.h1} lede={copy.hero.lede}>
        <div className="tanzania-hub__hero-actions">
          <a
            href={wa.primary}
            className="tanzania-hub__btn tanzania-hub__btn--primary"
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppIcon />
            {copy.hero.primaryCta}
            <ArrowRight className="size-4 icon-forward" aria-hidden />
          </a>
          <a href="#popular-treatments" className="tanzania-hub__btn tanzania-hub__btn--secondary">
            {copy.hero.secondaryCta}
          </a>
        </div>
      </PageIntro>

      <QuickAnswer items={copy.quickAnswer} layout="stacked" />

      <PseoEstimateCtaSection
        subject="medical treatment for Tanzanian patients"
        place="India"
        consultHref={wa.primary}
        secondaryHref={wa.secondary}
        variant="records"
      />

      <section className="tanzania-hub__section" id="why-india">
        <div className="page-wrap tanzania-hub__prose">
          <h2>{copy.why.heading}</h2>
          <p>{copy.why.intro}</p>
          <ul>
            {copy.why.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p>{copy.why.close}</p>
        </div>
      </section>

      <section className="tanzania-hub__section tanzania-hub__section--soft" id="india-tanzania">
        <div className="page-wrap tanzania-hub__prose">
          <h2>{copy.relationship.heading}</h2>
          {copy.relationship.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
          <p>
            <a href={TANZANIA_OFFICIAL_LINKS.mohCooperation2023} rel="noreferrer" target="_blank">
              Tanzania Ministry of Health, 26 July 2023
            </a>
          </p>
        </div>
      </section>

      <section className="tanzania-hub__section" id="popular-treatments">
        <div className="page-wrap">
          <h2>{copy.treatments.heading}</h2>
          <p className="tanzania-hub__lede">{copy.treatments.intro}</p>
          <div className="tanzania-hub__cards">
            {copy.treatments.categories.map((category) => {
              const specialtyHref = category.specialty
                ? tanzaniaSpecialtyHref("doctors", category.specialty)
                : "";
              const primaryHref = category.href || specialtyHref;
              return (
                <article key={category.title} className="tanzania-hub__card">
                  <h3>{category.title}</h3>
                  <p>{category.body}</p>
                  {primaryHref ? (
                    <Link href={primaryHref} className="tanzania-hub__text-link">
                      {category.hrefLabel || `View ${category.specialty} specialists`}
                      <ArrowRight className="size-4 icon-forward" aria-hidden />
                    </Link>
                  ) : null}
                </article>
              );
            })}
          </div>
          {featuredTreatments.length > 0 ? (
            <div className="tanzania-hub__treatment-grid">
              {featuredTreatments.map((treatment) => (
                <TreatmentCard key={treatment.slug} treatment={treatment} locale={locale} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="tanzania-hub__section tanzania-hub__section--soft" id="cancer-treatment">
        <div className="page-wrap">
          <h2>{copy.cancer.heading}</h2>
          <p className="tanzania-hub__lede">{copy.cancer.intro}</p>
          <p className="tanzania-hub__lede">{copy.cancer.body}</p>
          <ul className="tanzania-hub__pill-list">
            {copy.cancer.modalities.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          {cancerTreatments.length > 0 ? (
            <div className="treatment-related-treatment-grid">
              {cancerTreatments.map((treatment) => (
                <Link key={treatment.slug} href={`/treatments/${treatment.slug}`}>
                  {treatment.translations[locale]?.name ?? treatment.baseName}
                  <ArrowRight className="size-4 icon-forward" aria-hidden />
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="tanzania-hub__section" id="treatment-cost">
        <div className="page-wrap">
          <h2>{copy.cost.heading}</h2>
          <p className="tanzania-hub__lede">{copy.cost.intro}</p>
          <ul className="tanzania-hub__factor-list">
            {copy.cost.factors.map((factor) => (
              <li key={factor}>{factor}</li>
            ))}
          </ul>
          {costRows.length > 0 ? (
            <>
              <p className="tanzania-hub__lede">{copy.cost.tableIntro}</p>
              <div className="tanzania-hub__table-wrap">
                <table>
                  <caption className="sr-only">{copy.cost.heading}</caption>
                  <thead>
                    <tr>
                      <th scope="col">Treatment</th>
                      <th scope="col">Estimated cost</th>
                      <th scope="col">View cost guide</th>
                    </tr>
                  </thead>
                  <tbody>
                    {costRows.map((row) => (
                      <tr key={row.name}>
                        <th scope="row">{row.name}</th>
                        <td>
                          {row.range}
                          <span className="tanzania-hub__stay">{row.stay}</span>
                        </td>
                        <td>
                          <Link href={row.href}>Cost guide</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : null}
          <p className="tanzania-hub__callout">{copy.cost.disclaimer}</p>
          <a href={wa.primary} className="tanzania-hub__text-link" target="_blank" rel="noreferrer">
            {copy.cost.ctaLabel}
            <ArrowRight className="size-4 icon-forward" aria-hidden />
          </a>
        </div>
      </section>

      <section className="tanzania-hub__section tanzania-hub__section--soft" id="cities">
        <div className="page-wrap">
          <h2>{copy.cities.heading}</h2>
          <p className="tanzania-hub__lede">{copy.cities.intro}</p>
          <div className="tanzania-hub__cards tanzania-hub__cards--cities">
            {copy.cities.items.map((city) => {
              const hrefs = city.catalog ? tanzaniaCityHrefs(city.city) : undefined;
              return (
                <article key={city.name} className="tanzania-hub__card">
                  <p className="eyebrow">
                    <MapPin className="size-3.5" aria-hidden />
                    India
                  </p>
                  <h3>{city.name}</h3>
                  <p>{city.body}</p>
                  {hrefs ? (
                    <p className="tanzania-hub__inline-links">
                      <Link href={hrefs.hospitals}>Hospitals</Link>
                      <Link href={hrefs.doctors}>Doctors</Link>
                      <Link href={hrefs.costs}>Costs</Link>
                    </p>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="tanzania-hub__section" id="hospitals">
        <div className="page-wrap">
          <h2>{copy.hospitals.heading}</h2>
          <p className="tanzania-hub__lede">{copy.hospitals.intro}</p>
          <p className="tanzania-hub__lede">
            <Link href={hospitalsPath({ destination: "India" })} className="tanzania-hub__text-link">
              {copy.hospitals.directoryLabel}
              <ArrowRight className="size-4 icon-forward" aria-hidden />
            </Link>
          </p>
          <div className="treatment-related-list">
            {hospitals.map((hospital) => (
              <HospitalCard key={hospital.slug} hospital={hospital} />
            ))}
          </div>
        </div>
      </section>

      <section className="tanzania-hub__section tanzania-hub__section--soft" id="doctors">
        <div className="page-wrap">
          <h2>{copy.doctors.heading}</h2>
          <p className="tanzania-hub__lede">{copy.doctors.intro}</p>
          <p className="tanzania-hub__lede">
            <Link href={doctorsPath({ destination: "India" })} className="tanzania-hub__text-link">
              {copy.doctors.directoryLabel}
              <ArrowRight className="size-4 icon-forward" aria-hidden />
            </Link>
          </p>
          <div className="treatment-related-list">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.slug} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      <section className="tanzania-hub__section" id="medical-visa">
        <div className="page-wrap tanzania-hub__prose">
          <OriginCountryVisaCta href={TANZANIA_PAGE_PATH} whatsappHref={wa.primary} />
          <h2>{copy.visa.heading}</h2>
          <p>{copy.visa.intro}</p>
          <ul>
            {copy.visa.points.map((point) => (
              <li key={point.slice(0, 48)}>{point}</li>
            ))}
          </ul>
          <p className="tanzania-hub__callout">{copy.visa.disclaimer}</p>
          <p className="tanzania-hub__inline-links">
            <a href={TANZANIA_OFFICIAL_LINKS.eVisa} rel="noreferrer" target="_blank">
              Official Indian e-Visa portal
            </a>
            <a href={TANZANIA_OFFICIAL_LINKS.hciMedicalVisa} rel="noreferrer" target="_blank">
              High Commission medical-visa page
            </a>
          </p>
          <h3>{copy.visa.documentsHeading}</h3>
          <ul>
            {copy.visa.documents.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="tanzania-hub__section tanzania-hub__section--soft" id="travel">
        <div className="page-wrap tanzania-hub__prose">
          <h2>{copy.travel.heading}</h2>
          <p>{copy.travel.intro}</p>
          <ul>
            {copy.travel.points.map((point) => (
              <li key={point.slice(0, 48)}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="tanzania-hub__section" id="documents">
        <div className="page-wrap">
          <h2>{copy.documents.heading}</h2>
          <p className="tanzania-hub__lede">{copy.documents.intro}</p>
          <div className="tanzania-hub__check-grid">
            <article>
              <h3>
                <FileText className="size-4" aria-hidden />
                General records
              </h3>
              <ul>
                {copy.documents.general.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>
                <Stethoscope className="size-4" aria-hidden />
                Cancer
              </h3>
              <ul>
                {copy.documents.cancer.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>
                <Stethoscope className="size-4" aria-hidden />
                Cardiac
              </h3>
              <ul>
                {copy.documents.cardiac.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>
                <Plane className="size-4" aria-hidden />
                Orthopaedics
              </h3>
              <ul>
                {copy.documents.ortho.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="tanzania-hub__section tanzania-hub__section--soft" id="journey">
        <div className="page-wrap">
          <h2>{copy.journey.heading}</h2>
          <p className="tanzania-hub__lede">{copy.journey.intro}</p>
          <ol className="treatment-process">
            {copy.journey.steps.map((step, index) => (
              <li key={step.title}>
                <span>{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="tanzania-hub__section" id="how-gaf-helps">
        <div className="page-wrap">
          <h2>{copy.help.heading}</h2>
          <p className="tanzania-hub__lede">{copy.help.intro}</p>
          <div className="tanzania-hub__cards tanzania-hub__cards--help">
            <article className="tanzania-hub__card">
              <h3>Before travel</h3>
              <ul>
                {copy.help.before.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="tanzania-hub__card">
              <h3>During treatment</h3>
              <ul>
                {copy.help.during.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="tanzania-hub__card">
              <h3>After treatment</h3>
              <ul>
                {copy.help.after.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
          <p className="tanzania-hub__lede">{copy.help.note}</p>
        </div>
      </section>

      <section className="tanzania-hub__section tanzania-hub__section--soft" id="medical-opinion">
        <div className="page-wrap tanzania-hub__prose">
          <h2>{copy.opinion.heading}</h2>
          <p>{copy.opinion.intro}</p>
          <ul>
            {copy.opinion.questions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{copy.opinion.close}</p>
        </div>
      </section>

      <section className="tanzania-hub__section" id="faq">
        <div className="page-wrap treatment-faqs">
          <h2>{copy.faqHeading}</h2>
          {copy.faqs.map((faqItem) => (
            <details key={faqItem.q}>
              <summary>
                {faqItem.q}
                <ChevronDown className="size-4" aria-hidden />
              </summary>
              <p>{faqItem.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="tanzania-hub__final" id="get-started">
        <div className="page-wrap">
          <h2>{copy.finalCta.heading}</h2>
          <p>{copy.finalCta.body}</p>
          <div className="tanzania-hub__hero-actions">
            <a
              href={wa.primary}
              className="tanzania-hub__btn tanzania-hub__btn--primary"
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon />
              {copy.finalCta.primary}
            </a>
            <Link href="/consult" className="tanzania-hub__btn tanzania-hub__btn--secondary">
              {copy.finalCta.secondary}
            </Link>
          </div>
        </div>
      </section>

      <section className="tanzania-hub__section" id="disclaimer">
        <div className="page-wrap tanzania-hub__prose">
          <h2>{copy.disclaimer.heading}</h2>
          <p>{copy.disclaimer.body}</p>
        </div>
      </section>

      <section className="tanzania-hub__section tanzania-hub__section--soft" id="sources">
        <div className="page-wrap">
          <h2>{copy.sources.heading}</h2>
          <ol className="tanzania-hub__sources">
            {copy.sources.items.map((source) => (
              <li key={source.href}>
                <a href={source.href} rel="noreferrer" target="_blank">
                  {source.label}
                </a>
                <span>{source.detail}</span>
              </li>
            ))}
          </ol>
          <p className="tanzania-hub__reviewed">Last reviewed: October 2026</p>
        </div>
      </section>

      <CtaBand subject="medical treatment for Tanzanian patients" place="India" />
    </div>
  );
}
