import type { ReactNode } from "react";
import {
  ArabicDoctorSsrCard,
  ArabicSsrPager,
  SsrJsonLd,
  arHref,
} from "@/components/arabic-ssr";
import { hospitalsPath } from "@/lib/catalog-links";
import type { ArabicRadiationDirectoryData } from "@/lib/i18n/ar-radiation-directory";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { documentId } from "@/lib/jsonld";
import { absoluteUrl, breadcrumbJsonLd, doctorItemListJsonLd, faqJsonLd } from "@/lib/seo";
import { blogEstimateWhatsapp } from "@/lib/site";

function HubHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="max-w-3xl">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">{eyebrow}</p>
      <h2 className="mt-2 font-heading text-3xl md:text-4xl">{title}</h2>
      {intro ? <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{intro}</p> : null}
    </header>
  );
}

function chipClass(active: boolean) {
  return `inline-flex min-h-11 shrink-0 items-center rounded-full px-4 py-2 text-sm transition ${
    active
      ? "bg-ink text-ivory"
      : "border border-border bg-white text-muted-foreground hover:border-primary/40 hover:text-foreground"
  }`;
}

export function ArabicRadiationCityLinks({ data }: { data: ArabicRadiationDirectoryData }) {
  return (
    <nav aria-label="تصفية حسب المدينة" className="catalog-chips">
      <a href={arHref(data.indiaHref)} className={chipClass(!data.cityName)}>
        كل المدن ({data.cityChipStats.total})
      </a>
      {data.cities.map((city) => (
        <a key={city.href} href={arHref(city.href)} className={chipClass(city.href === data.path)}>
          {city.name} ({city.count})
        </a>
      ))}
    </nav>
  );
}

/**
 * Crawler-complete Arabic Radiation Oncology HTML. No client components, no
 * async header reads, and internal links already carry the `/ar` prefix.
 */
export function ArabicRadiationSsrDocument({
  data,
  filterSlot,
}: {
  data: ArabicRadiationDirectoryData;
  filterSlot?: ReactNode;
}) {
  const wa = blogEstimateWhatsapp("radiation oncology", data.citySlug || "India");
  const crumbs = [
    { name: "الأطباء", path: "/doctors" },
    { name: "الهند", path: "/doctors/India" },
    {
      name: taxonomyLabel("Radiation Oncology", "ar"),
      path: data.indiaHref,
    },
  ];
  if (data.cityName && data.citySlug) {
    crumbs.push({
      name: data.cityName,
      path: data.path,
    });
  }

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": documentId(data.path, "ar", "collection"),
    name: data.heading,
    description: data.description,
    inLanguage: "ar",
    url: absoluteUrl(data.path, "ar"),
    about: { "@type": "MedicalSpecialty", name: taxonomyLabel("Radiation Oncology", "ar") },
  };

  return (
    <>
      <SsrJsonLd data={collectionLd} />
      <SsrJsonLd data={breadcrumbJsonLd(crumbs, "ar")} />
      <SsrJsonLd
        data={doctorItemListJsonLd(data.paging.items, {
          name: data.heading,
          path: data.path,
          locale: "ar",
        })}
      />
      <SsrJsonLd data={faqJsonLd(data.faqs, { path: data.path, locale: "ar" })} />

      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-5 md:px-8 md:pt-24 pb-10 md:pb-16">
          <nav aria-label="مسار التنقل" className="mb-6 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {crumbs.map((crumb, index) => (
                <li key={crumb.path} className="flex items-center gap-2">
                  {index > 0 ? <span aria-hidden>/</span> : null}
                  {index === crumbs.length - 1 ? (
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
          <p className="prose-gaf mt-4 md:mt-6">{data.lede}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-5 md:px-8 md:py-12" aria-labelledby="radiation-quick-answer">
        <article className="rounded-2xl border border-border bg-card p-5 shadow-[0_16px_40px_-32px_rgba(20,24,28,0.45)] md:p-8">
          <p className="text-xs font-medium tracking-[0.18em] text-gold">{data.quickAnswer.title}</p>
          <h2 id="radiation-quick-answer" className="mt-2 font-heading text-3xl md:text-4xl">
            {data.quickAnswer.title}
          </h2>
          <p className="prose-gaf mt-4 max-w-none">{data.quickAnswer.answer}</p>
          {data.facts.length > 0 ? (
            <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {data.facts.map((fact) => (
                <div key={fact.label} className="rounded-2xl border border-border bg-white p-5">
                  <dt className="text-xs tracking-[0.16em] text-muted-foreground">{fact.label}</dt>
                  <dd className="mt-2 font-heading text-3xl">{fact.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          {data.quickAnswer.techniques.length > 0 ? (
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              التقنيات المرتبطة بالملفات الحالية: {data.quickAnswer.techniques.join("، ")}.
            </p>
          ) : null}
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{data.quickAnswer.howToChoose}</p>
          <p className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <a href={data.quickAnswer.exploreHref} className="underline-offset-4 hover:underline">
              {data.quickAnswer.exploreLabel}
            </a>
            <a href={data.quickAnswer.nextStepHref} className="underline-offset-4 hover:underline">
              {data.quickAnswer.nextStepLabel}
            </a>
          </p>
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-5 md:px-8">
        {filterSlot ?? <ArabicRadiationCityLinks data={data} />}
      </section>

      {data.cityName ? (
        <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8">
          <HubHeading
            eyebrow={data.cityName}
            title={`استكشاف الأطباء في ${data.place}`}
            intro="المحتوى أدناه مبني على الملفات المنشورة في هذه المدينة، لا على تعميم لدليل الهند."
          />
          {data.logistics ? <p className="prose-gaf mt-4 max-w-3xl">{data.logistics}</p> : null}
          {data.hospitalOverview ? <p className="prose-gaf mt-4 max-w-3xl">{data.hospitalOverview}</p> : null}
          {data.cityPrep ? <p className="prose-gaf mt-4 max-w-3xl">{data.cityPrep}</p> : null}
          <p className="mt-4 text-sm">
            <a href={arHref(data.indiaHref)} className="underline-offset-4 hover:underline">
              دليل أطباء علاج الأورام بالإشعاع في الهند
            </a>
          </p>
        </section>
      ) : null}

      <section id="radiation-doctors" className="mx-auto max-w-7xl px-4 py-8 sm:px-5 md:px-8 md:py-12">
        <HubHeading
          eyebrow="الأخصائيون"
          title="الأطباء المدرجون"
          intro="الملفات المعروضة تطابق عوامل التصفية الحالية. الترتيب أبجدي حسب المدينة والاسم، وليس تصنيفًا سريريًا."
        />
        {data.paging.total === 0 ? (
          <p className="mt-6 text-muted-foreground">
            لا يوجد أطباء يطابقون عوامل التصفية هذه. امسح حقلًا أو اطلب ملفًا وسننصحك.
          </p>
        ) : (
          <>
            <p className="mt-4 text-sm text-muted-foreground">
              عرض {data.paging.from}–{data.paging.to} من {data.paging.total}
            </p>
            <ul className="hosp-list mt-6">
              {data.paging.items.map((doctor) => (
                <li key={doctor.slug}>
                  <ArabicDoctorSsrCard doctor={doctor} />
                </li>
              ))}
            </ul>
            <ArabicSsrPager
              page={data.paging.page}
              totalPages={data.paging.totalPages}
              query={{
                destination: "India",
                city: data.citySlug,
                specialty: "Radiation Oncology",
              }}
              basePath="/doctors"
              label="صفحات قائمة الأطباء"
            />
          </>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <HubHeading
          eyebrow="قرار سريري"
          title={`كيف تختار طبيب علاج أورام بالإشعاع في ${data.place}`}
          intro="هذه أسئلة تخطيط، وليست نظام تقييم. التقنية والحرم والمتابعة تُؤكد كتابة."
        />
        <ol className="mt-6 max-w-3xl list-decimal space-y-3 ps-5 text-sm leading-relaxed text-muted-foreground">
          {data.howToChoose.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        <h3 className="mt-8 font-heading text-2xl">ما الذي تجهّزه للمراجعة؟</h3>
        <ul className="mt-4 max-w-3xl list-disc space-y-2 ps-5 text-sm leading-relaxed text-muted-foreground">
          {data.consultPrep.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {!data.cityName && data.cities.length > 0 ? (
        <section className="border-y border-border bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
            <HubHeading
              eyebrow="المدن"
              title="أطباء علاج الأورام بالإشعاع حسب المدينة"
              intro="صفحات المدينة تستخدم أعداد الكتالوج الحيّة. التوليفات الفارغة لا تُنشر كعناوين ضعيفة."
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {data.cities.map((city) => (
                <li key={city.href}>
                  <a
                    href={arHref(city.href)}
                    className="block rounded-2xl border border-border bg-white p-5 hover:border-primary/30"
                  >
                    <p className="font-heading text-2xl">{city.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{city.count} ملفًا مدرجًا</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {data.cityName && data.cities.length > 1 ? (
        <section className="border-y border-border bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
            <HubHeading
              eyebrow="مدن أخرى"
              title="أدلة علاج الأورام بالإشعاع في مدن هندية أخرى"
              intro="انتقل إلى مدينة أخرى فقط إذا كانت الملفات المنشورة هناك ذات صلة بحالتك."
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {data.cities
                .filter((city) => city.href !== data.path)
                .map((city) => (
                  <li key={city.href}>
                    <a
                      href={arHref(city.href)}
                      className="block rounded-2xl border border-border bg-white p-5 hover:border-primary/30"
                    >
                      <p className="font-heading text-2xl">{city.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{city.count} ملفًا مدرجًا</p>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <HubHeading
          eyebrow="المستشفيات"
          title="أحرام مرتبطة بأطباء علاج الأورام بالإشعاع"
          intro="الأعداد هي علاقات الأطباء الحالية في كل حرم. يبقى ملف المستشفى الصفحة القانونية للحرم."
        />
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {data.hospitals.map(({ hospital, count }) => (
            <li key={hospital.slug} className="rounded-2xl border border-border bg-white p-5">
              <a
                href={arHref(`/hospitals/${hospital.slug}`)}
                className="font-heading text-2xl text-gold underline underline-offset-4"
              >
                {hospital.name}
              </a>
              <p className="mt-1 text-sm text-muted-foreground">
                {taxonomyLabel(hospital.city, "ar")} · {count} ملفًا مدرجًا
              </p>
              <a
                href={arHref(
                  hospitalsPath({
                    destination: "India",
                    city: hospital.city,
                    specialty: "Radiation Oncology",
                  }),
                )}
                className="mt-3 inline-block text-sm underline-offset-4 hover:underline"
              >
                مستشفيات علاج الأورام بالإشعاع في {taxonomyLabel(hospital.city, "ar")}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm">
          <a href={arHref(data.hospitalDirectoryHref)} className="underline-offset-4 hover:underline">
            دليل مستشفيات علاج الأورام بالإشعاع
          </a>
        </p>
      </section>

      {data.procedures.length > 0 ? (
        <section className="border-y border-border bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
            <HubHeading
              eyebrow="التقنيات"
              title="إجراءات العلاج الإشعاعي المرتبطة بالملفات"
              intro="كل إجراء يحتفظ بدليل تكلفته القانوني. قوائم الأطباء لا تتضمن إلا علاقات الإجراءات الدقيقة."
            />
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {data.procedures.map((row) => (
                <li key={row.href} className="rounded-2xl border border-border bg-white p-5">
                  <p className="font-heading text-2xl">{row.name}</p>
                  {row.note ? <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{row.note}</p> : null}
                  <p className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                    <a href={arHref(row.href)} className="underline-offset-4 hover:underline">
                      أطباء مرتبطون بـ{row.name}
                    </a>
                  </p>
                  {row.count != null ? (
                    <p className="mt-2 text-xs tracking-[0.14em] text-muted-foreground">
                      {row.count} اختصاصيًا مرتبطًا
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {data.educational.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
          <HubHeading
            eyebrow="سياق تعليمي"
            title="مفاهيم يحتاجها المريض الدولي"
            intro="هذه شروح عامة تساعد على قراءة الدليل، وليست خطة علاج."
          />
          <div className="mt-6 max-w-4xl space-y-8">
            {data.educational.map((item) => (
              <article key={item.title}>
                <h3 className="font-heading text-2xl">{item.title}</h3>
                <p className="prose-gaf mt-3 max-w-none">{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {data.conditions.length > 0 ? (
        <section className="border-y border-border bg-secondary/20">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
            <HubHeading
              eyebrow="مسارات سريرية"
              title="أنواع أورام لها سياق في دليل التخصص"
              intro="هذه الروابط تأتي من دليل التخصص. ليست استنتاجًا من قائمة إجراءات الطبيب ولا ادعاءً بخبرة فردية."
            />
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {data.conditions.map((row) => (
                <li key={row.name}>
                  <a href={arHref(row.href)} className="block rounded-2xl border border-border bg-white p-5 hover:border-primary/30">
                    <p className="font-heading text-2xl">{row.name}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{row.note}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <HubHeading
          eyebrow="التكلفة"
          title={`تكاليف علاج الأورام بالإشعاع في ${data.place}`}
          intro="هذه أدلة التكلفة الحالية في GAF. ليست أسعارًا خاصة بكل طبيب."
        />
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.costs.map((row) => (
            <li key={row.href}>
              <a href={arHref(row.href)} className="block rounded-2xl border border-border bg-white p-5 hover:border-primary/30">
                <p className="font-heading text-xl">{row.name}</p>
                <p className="mt-2 text-sm text-muted-foreground">عرض دليل التكلفة</p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="radiation-faqs" className="border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
          <h2 className="font-heading text-3xl">أسئلة شائعة عن علاج الأورام بالإشعاع في {data.place}</h2>
          <p className="prose-gaf mt-3">
            إجابات للمرضى الدوليين الناطقين بالعربية. ليست تشخيصًا فرديًا ولا تغني عن تقييم الفريق المعالج.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {data.faqs.map((row) => (
              <article key={row.q} className="rounded-2xl border border-border bg-card px-5 py-4">
                <h3 className="font-medium leading-snug">{row.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{row.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="radiation-ro-cta" className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <h2 className="font-heading text-3xl">اطلب المساعدة في مراجعة حالتك الطبية</h2>
          <p className="prose-gaf mt-3 max-w-3xl">
            يمكنك مشاركة التقارير الطبية المتاحة لطلب المساعدة في استكشاف الأطباء والمستشفيات المناسبة. يعتمد قبول الحالة والخطة العلاجية على مراجعة الفريق الطبي المختص.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{data.selectionNote}</p>
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

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-5 md:px-8">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {data.editorial.attribution} · آخر تحرير {data.editorial.updated}. {data.editorial.note}
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          {data.sources.map((source) => (
            <li key={source.href}>
              <a href={source.href} className="underline-offset-4 hover:underline" rel="noreferrer noopener" target="_blank">
                {source.name}
              </a>
              <span className="text-muted-foreground"> — {source.note}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
