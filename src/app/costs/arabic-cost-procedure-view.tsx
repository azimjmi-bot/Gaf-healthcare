import { Suspense } from "react";
import { CatalogFilter } from "@/components/catalog-filter";
import { JsonLd } from "@/components/json-ld";
import { LocaleLink as Link } from "@/components/locale-link";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { PseoTrust } from "@/components/pseo-trust";
import { filterDoctors, filterHospitals, filterTreatments, cityResultCounts, type CatalogQuery } from "@/lib/catalog";
import { costsFilterPath } from "@/lib/catalog-links";
import { doctorsForLocale, hospitalsForLocale, treatmentsForLocale } from "@/lib/locale-catalog";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { localizeMessages } from "@/lib/i18n/localize";
import { arabicCostCopy } from "@/lib/i18n/ar-cost-content";
import { breadcrumbJsonLd, faqJsonLd, medicalWebPageJsonLd } from "@/lib/seo";

export async function ArabicCostProcedureView({ query }: { query: CatalogQuery }) {
  const copy = arabicCostCopy(query);
  const treatments = treatmentsForLocale("ar");
  const matches = filterTreatments(query, treatments);
  const treatment = matches[0];
  if (!treatment) return null;

  const messages = await localizeMessages("ar");
  const hospitals = filterHospitals(query, hospitalsForLocale("ar")).slice(0, 6);
  const doctors = filterDoctors(query, doctorsForLocale("ar")).slice(0, 6);
  const chipStats =
    query.destination === "India" ? cityResultCounts("treatments", query) : null;
  const faqs = [
    {
      q: `هل نطاق تكلفة ${copy.procedure} عرض سعر نهائي؟`,
      a: `لا. النطاق المنشور لتكلفة ${copy.procedure} في ${copy.place} مخصص للتخطيط والمقارنة. يصدر العرض الكتابي بعد مراجعة التشخيص والتقارير والتصوير وتحديد الخطة والفريق والمستشفى.`,
    },
    {
      q: `ما الذي قد يشمله تقدير ${copy.procedure}؟`,
      a: `يعتمد ذلك على الحالة والمستشفى. تُراجع أتعاب الاختصاصي والفحوصات والإجراء أو الدواء والإقامة والأجهزة أو الزرعات والمتابعة عند الحاجة، ثم تُفصل العناصر في العرض الكتابي.`,
    },
    {
      q: `كم تستغرق الإقامة من أجل ${copy.procedure}؟`,
      a: `المدة التخطيطية المعروضة هي ${treatment.stay}. قد تتغير بحسب شدة الحالة والفحوصات والاستجابة والمضاعفات وموعد المتابعة؛ لذلك لا يُحجز السفر من بطاقة التكلفة وحدها.`,
    },
    {
      q: `كيف أختار المدينة والمستشفى لإجراء ${copy.procedure}؟`,
      a: `استخدم التسلسل: الهند، ثم المدينة، ثم ${copy.specialty}، ثم ${copy.procedure}. بعد ذلك تُراجع السجلات مع اختصاصي مسمّى قبل مقارنة عروض المستشفيات المتاحة.`,
    },
  ];

  return (
    <>
      <JsonLd
        data={medicalWebPageJsonLd({
          name: copy.title,
          description: copy.description,
          path: copy.path,
          lastReviewed: "2026-10-14",
          procedureName: copy.procedure,
          specialty: copy.specialty,
          about: treatment.summary,
          locale: "ar",
          keywords: [
            copy.title,
            `تكلفة ${copy.procedure} في الهند`,
            `${copy.specialty} في الهند`,
          ],
          spatialCoverage: [
            { "@type": "Country", name: copy.country },
            ...(copy.city ? [{ "@type": "City" as const, name: copy.city }] : []),
          ],
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: "تكاليف العلاج", path: "/costs" },
            { name: copy.country, path: costsFilterPath({ destination: query.destination }) },
            {
              name: copy.specialty,
              path: costsFilterPath({
                destination: query.destination,
                city: query.city,
                specialty: query.specialty,
              }),
            },
            { name: copy.procedure, path: copy.path },
          ],
          "ar",
        )}
      />
      <JsonLd data={faqJsonLd(faqs, { path: copy.path, locale: "ar" })} />

      <PageIntro
        eyebrow={`${copy.country} · ${copy.specialty} · نطاق تخطيطي`}
        title={copy.title}
        lede={copy.description}
      >
        <Suspense fallback={<div className="h-24 rounded-2xl bg-white shadow-sm" />}>
          <CatalogFilter
            basePath="/costs"
            entity="treatments"
            query={query}
            chipStats={chipStats}
            resultCount={matches.length}
            resultLabel={messages["dir.costs.resultOne"]}
          />
        </Suspense>
      </PageIntro>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-16">
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">{messages["dir.costs.usCash"]}</p>
            <p className="mt-2 font-heading text-3xl">{treatment.usRange}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">{messages["dir.costs.partnerRange"]}</p>
            <p className="mt-2 font-heading text-3xl">{treatment.partnerRange}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">{messages["dir.costs.stay"]}</p>
            <p className="mt-2 text-lg leading-relaxed">{treatment.stay}</p>
          </div>
        </section>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]">
          <div>
            <section>
              <h2 className="font-heading text-3xl">ماذا تعني أرقام التكلفة؟</h2>
              <p className="prose-gaf mt-4">{treatment.summary}</p>
              <p className="prose-gaf mt-4">{treatment.notes}</p>
            </section>

            <section className="mt-12">
              <h2 className="font-heading text-3xl">ما الذي يُراجع داخل العرض؟</h2>
              <ul className="mt-5 grid gap-3">
                {treatment.includes.map((item) => (
                  <li key={item} className="rounded-xl border border-border bg-card px-5 py-4">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-12">
              <h2 className="font-heading text-3xl">أسئلة شائعة عن {copy.procedure}</h2>
              <div className="mt-5 grid gap-4">
                {faqs.map((row) => (
                  <details key={row.q} className="rounded-2xl border border-border bg-card px-5 py-4">
                    <summary className="cursor-pointer font-medium">{row.q}</summary>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{row.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            {doctors.length > 0 ? (
              <section className="rounded-2xl border border-border bg-card p-6">
                <h2 className="font-heading text-2xl">أطباء مرتبطون بالإجراء</h2>
                <ul className="mt-4 space-y-3">
                  {doctors.map((doctor) => (
                    <li key={doctor.slug}>
                      <Link href={`/doctors/${doctor.slug}`} className="underline-offset-4 hover:underline">
                        {doctor.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{doctor.hospitalName}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            {hospitals.length > 0 ? (
              <section className="rounded-2xl border border-border bg-card p-6">
                <h2 className="font-heading text-2xl">مستشفيات مرتبطة بالإجراء</h2>
                <ul className="mt-4 space-y-3">
                  {hospitals.map((hospital) => (
                    <li key={hospital.slug}>
                      <Link href={`/hospitals/${hospital.slug}`} className="underline-offset-4 hover:underline">
                        {hospital.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {taxonomyLabel(hospital.city, "ar")}، {copy.country}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </aside>
        </div>
      </main>

      <PseoTrust />
      <CtaBand subject={copy.procedure} place={copy.place} />
    </>
  );
}
