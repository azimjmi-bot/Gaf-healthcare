import { CatalogFilterForm } from "@/components/catalog-filter-form";
import {
  ArabicDoctorSsrCard,
  ArabicSsrPager,
  SsrJsonLd,
  arHref,
} from "@/components/arabic-ssr";
import { resultLabel } from "@/lib/i18n/directory-copy";
import type { ArabicDoctorDirectoryData } from "@/lib/i18n/arabic-doctor-directory";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { documentId } from "@/lib/jsonld";
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { blogEstimateWhatsapp } from "@/lib/site";

function chipClass(active: boolean) {
  return `inline-flex min-h-11 shrink-0 items-center rounded-full px-4 py-2 text-sm transition ${
    active
      ? "bg-ink text-ivory"
      : "border border-border bg-white text-muted-foreground hover:border-primary/40 hover:text-foreground"
  }`;
}

function interpolate(template: string, vars: Record<string, string | number>) {
  return Object.entries(vars).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

/**
 * Crawler-complete Arabic HTML for country, city, specialty and procedure
 * doctor directories. Synchronous on purpose: no client islands, no header
 * reads, no icons, so it can be hosted into a plain HTML string. Mirrors the
 * generic Arabic branch of `DoctorsDirectory` so the static document and the
 * App Router page carry the same copy, cards, pager and FAQs.
 */
export function ArabicDoctorDirectorySsrDocument({ data }: { data: ArabicDoctorDirectoryData }) {
  const { query, meta, paging, messages } = data;
  const subject = query.procedure ?? query.specialty ?? "doctors";
  const wa = blogEstimateWhatsapp(subject, query.city ?? "India");
  const showing = interpolate(messages["dir.showing"] || "عرض {from}–{to} من {total}", {
    from: paging.from,
    to: paging.to,
    total: paging.total,
  });
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": documentId(meta.path, "ar", "collection"),
    name: data.heading,
    description: data.description,
    inLanguage: "ar",
    url: absoluteUrl(meta.path, "ar"),
    ...(query.specialty
      ? { about: { "@type": "MedicalSpecialty", name: taxonomyLabel(query.specialty, "ar") } }
      : {}),
  };

  return (
    <>
      {meta.state === "published" ? (
        <>
          {/* Document nodes only. The Arabic roster is a translated subset of
              the English one, so a per-page Person ItemList would name
              entities the English facet does not; check-jsonld-policy forbids
              that, and the generic Arabic App Router branch never emitted one. */}
          <SsrJsonLd data={collectionLd} />
          <SsrJsonLd data={breadcrumbJsonLd(data.crumbs, "ar")} />
          <SsrJsonLd data={faqJsonLd(data.faqs, { path: meta.path, locale: "ar" })} />
        </>
      ) : null}

      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-5 md:px-8 md:pt-24 pb-4 md:pb-6">
          <nav aria-label="مسار التنقل" className="mb-6 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {data.crumbs.map((crumb, index) => (
                <li key={crumb.path} className="flex items-center gap-2">
                  {index > 0 ? <span aria-hidden>/</span> : null}
                  {index === data.crumbs.length - 1 ? (
                    <span className="text-foreground">{crumb.name}</span>
                  ) : (
                    <a href={arHref(crumb.path)} className="underline-offset-4 hover:underline">
                      {crumb.name}
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <p className="eyebrow">{data.eyebrow}</p>
          <h1 className="mt-3 max-w-4xl font-heading text-[2rem] leading-[1.15] sm:text-4xl md:mt-4 md:text-6xl">
            {data.heading}
          </h1>
        </div>
      </section>
      <CatalogFilterForm
        sticky
        basePath="/doctors"
        locale="ar"
        query={query}
        resultCount={paging.total}
        resultLabel={resultLabel("doctors", paging.total, "ar")}
      />
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-16">
          <p className="prose-gaf mt-4 md:mt-6">{data.lede}</p>
        </div>
        {data.cityChips.length > 0 ? (
          <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-5 md:px-8 md:pb-10">
            <nav aria-label="تصفية حسب المدينة" className="catalog-chips">
              <a href={arHref(data.countryHref)} className={chipClass(!query.city)}>
                كل المدن ({data.countryTotal})
              </a>
              {data.cityChips.map((chip) => (
                <a key={chip.href} href={arHref(chip.href)} className={chipClass(chip.name === query.city)}>
                  {chip.label} ({chip.count})
                </a>
              ))}
            </nav>
          </div>
        ) : null}
      </section>

      {data.intro.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-5 md:px-8 md:pt-12">
          {data.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="prose-gaf mt-4 max-w-3xl">
              {paragraph}
            </p>
          ))}
        </section>
      ) : null}

      <section id="doctor-listing" className="mx-auto max-w-7xl px-4 py-8 sm:px-5 md:px-8 md:py-12">
        {paging.total === 0 ? (
          <p className="text-muted-foreground">{data.emptyCopy}</p>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">{showing}</p>
            <ul className="hosp-list mt-6">
              {paging.items.map((doctor) => (
                <li key={doctor.slug}>
                  <ArabicDoctorSsrCard doctor={doctor} />
                </li>
              ))}
            </ul>
            <ArabicSsrPager
              page={paging.page}
              totalPages={paging.totalPages}
              query={query}
              basePath="/doctors"
              label={messages["dir.doctors.pagerLabel"] || "صفحات قائمة الأطباء"}
              previousLabel={messages["pager.previous"] || "السابق"}
              nextLabel={messages["pager.next"] || "التالي"}
            />
          </>
        )}
      </section>

      <section id="doctor-faqs" className="border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
          <div className="hub-head">
            <p className="eyebrow">أسئلة شائعة</p>
            <h2 className="font-heading text-3xl">{messages["dir.doctors.faqTitle"] || "أسئلة شائعة عن إيجاد طبيب"}</h2>
            {messages["dir.doctors.faqLede"] ? <p className="prose-gaf mt-3">{messages["dir.doctors.faqLede"]}</p> : null}
          </div>
          <div className="faq-grid mt-8 grid gap-4 md:grid-cols-2">
            {data.faqs.map((row) => (
              <article key={row.q} className="faq-card rounded-2xl border border-border bg-card px-5 py-4">
                <h3 className="font-medium leading-snug">{row.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{row.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="doctor-cta" className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <div className="cta-card rounded-2xl border border-border bg-card p-6 md:p-8">
          <h2 className="font-heading text-3xl">اطلب المساعدة في مراجعة حالتك الطبية</h2>
          <p className="prose-gaf mt-3 max-w-3xl">
            يمكنك مشاركة التقارير الطبية المتاحة لطلب المساعدة في استكشاف الأطباء والمستشفيات المناسبة. يعتمد قبول الحالة والخطة العلاجية على مراجعة الفريق الطبي المختص.
          </p>
          <p className="mt-6">
            <a
              href={wa.primary}
              className="inline-flex min-h-12 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground"
              target="_blank"
              rel="noreferrer noopener"
            >
              اطلب المساعدة في مراجعة حالتك الطبية
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
