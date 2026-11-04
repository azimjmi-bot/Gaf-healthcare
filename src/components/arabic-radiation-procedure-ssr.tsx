import { CatalogFilterForm } from "@/components/catalog-filter-form";
import { ArabicDoctorSsrCard, ArabicSsrPager, SsrJsonLd, arHref } from "@/components/arabic-ssr";
import { resultLabel } from "@/lib/i18n/directory-copy";
import type { ArabicRadiationProcedureData } from "@/lib/i18n/ar-radiation-procedure";
import type { RadiationProcedureCopy } from "@/lib/i18n/radiation-procedure-page";
import { documentId } from "@/lib/jsonld";
import { absoluteUrl, breadcrumbJsonLd, doctorItemListJsonLd, faqJsonLd, hospitalItemListJsonLd } from "@/lib/seo";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import type { Doctor } from "@/lib/doctors";
import type { Hospital } from "@/lib/hospitals";

/** Visible on the glance table and repeated in MedicalProcedure.bodyLocation. */
const BODY_LOCATION_AR = "موضع الورم الذي يحدده التخطيط، لا اسم الإجراء وحده.";

const KIND_AR: Record<RadiationProcedureCopy["kind"], string> = {
  modality: "طريقة علاج",
  technique: "تقنية تخطيط وتسليم",
  platform: "منصة جهاز",
  subtype: "نمط فرعي",
};

/** External-beam family only. Brachytherapy and IORT are not labeled noninvasive. */
function procedureAbout(copy: RadiationProcedureCopy) {
  return {
    "@type": "MedicalProcedure",
    name: taxonomyLabel(copy.procedure, "ar"),
    alternateName: copy.procedure,
    description: copy.quickAnswer,
    procedureType: "Radiation",
    bodyLocation: BODY_LOCATION_AR,
    howPerformed: copy.steps.map((step) => `${step.title}. ${step.body}`).join(" "),
  };
}

function listedDoctors(
  list: ReturnType<typeof doctorItemListJsonLd>,
  doctors: Doctor[],
) {
  return {
    ...list,
    itemListElement: list.itemListElement.map((entry, index) => {
      const doctor = doctors[index];
      const item: Record<string, unknown> = { ...entry.item };
      if (doctor?.title) item.jobTitle = doctor.title;
      if (doctor?.qualifications) {
        item.hasCredential = {
          "@type": "EducationalOccupationalCredential",
          name: doctor.qualifications,
        };
      }
      if (item.worksFor) item.hospitalAffiliation = item.worksFor;
      const schools = (doctor?.education ?? []).map((line) => line.trim()).filter(Boolean).slice(0, 3);
      if (schools.length > 0) {
        item.alumniOf = schools.map((line) => ({
          "@type": "EducationalOrganization",
          name: line.split("—").pop()?.trim() || line,
        }));
      }
      return { ...entry, item };
    }),
  };
}

function listedHospitals(
  list: ReturnType<typeof hospitalItemListJsonLd>,
  hospitals: Hospital[],
) {
  return {
    ...list,
    itemListElement: list.itemListElement.map((entry, index) => {
      const accreditation = hospitals[index]?.accreditation?.trim();
      if (!accreditation) return entry;
      return { ...entry, item: { ...entry.item, award: accreditation } };
    }),
  };
}

function HubHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="hub-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="font-heading text-3xl">{title}</h2>
      {intro ? <p className="prose-gaf mt-3">{intro}</p> : null}
    </div>
  );
}

/**
 * Long-form Arabic landing page for one radiation procedure.
 * Doctors and hospitals come from catalog relationships. Copy is the reviewed
 * procedure record, not a renamed specialty article.
 */
export function ArabicRadiationProcedureSsrDocument({ data }: { data: ArabicRadiationProcedureData }) {
  const { copy } = data;
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": documentId(data.path, "ar", "collection"),
    name: copy.h1,
    description: copy.description,
    inLanguage: "ar",
    url: absoluteUrl(data.path, "ar"),
    dateModified: data.review.updated,
    about: procedureAbout(copy),
  };
  const doctorLd = listedDoctors(
    doctorItemListJsonLd(data.doctors, { name: copy.h1, path: data.path, locale: "ar" }),
    data.doctors,
  );
  const hospitalLd =
    data.hospitals.length > 0
      ? listedHospitals(
          hospitalItemListJsonLd(
            data.hospitals.map((row) => row.hospital),
            { name: `مستشفيات مرتبطة بـ ${taxonomyLabel(copy.procedure, "ar")}`, path: data.path, locale: "ar" },
          ),
          data.hospitals.map((row) => row.hospital),
        )
      : null;

  return (
    <>
      {data.meta.state === "published" ? (
        <>
          <SsrJsonLd data={collectionLd} />
          <SsrJsonLd data={breadcrumbJsonLd(data.crumbs, "ar")} />
          <SsrJsonLd data={doctorLd} />
          {hospitalLd ? <SsrJsonLd data={hospitalLd} /> : null}
          <SsrJsonLd data={faqJsonLd(copy.faqs, { path: data.path, locale: "ar" })} />
        </>
      ) : null}

      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-5 md:px-8 md:pt-24 pb-4 md:pb-6">
          <nav aria-label="مسار التنقل" className="mb-6 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {data.crumbs.map((crumb, index) => (
                <li key={crumb.path} className="flex items-center gap-2">
                  {index > 0 ? <span aria-hidden="true">/</span> : null}
                  {index === data.crumbs.length - 1 ? (
                    <span className="text-foreground">{crumb.name}</span>
                  ) : (
                    <a href={arHref(crumb.path)} className="hover:text-foreground">
                      {crumb.name}
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <p className="eyebrow">دليل الأطباء · علاج الأورام بالإشعاع</p>
          <h1 className="font-heading mt-3 max-w-4xl text-4xl md:text-5xl">{copy.h1}</h1>
        </div>
      </section>
      <CatalogFilterForm
        sticky
        basePath="/doctors"
        locale="ar"
        query={{ destination: "India", specialty: "Radiation Oncology", procedure: copy.procedure }}
        resultCount={data.paging.total}
        resultLabel={resultLabel("doctors", data.paging.total, "ar")}
      />
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-16">
          <p className="prose-gaf mt-4 max-w-3xl text-base leading-relaxed">{copy.intro}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            {data.doctorCountLabel} في {data.hospitalCountLabel}. العدد من الملفات التي تذكر هذا الإجراء، لا ترتيب نتائج ولا جرد أجهزة.
          </p>
          <aside className="trust-strip" aria-label="بيانات التحرير">
            <p>التحرير: {data.review.attribution}</p>
            <p>آخر تحديث: <time dateTime={data.review.updated}>{data.review.updated}</time></p>
            <p>لم تُراجع هذه الصفحة طبيًا بشكل مستقل.</p>
          </aside>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#procedure-doctors" className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm text-ivory">
              اعثر على طبيب
            </a>
            <a href={data.consultHref} className="inline-flex min-h-11 items-center rounded-full border border-border bg-white px-5 text-sm" rel="noreferrer noopener">
              اطلب مراجعة طبية
            </a>
          </div>
        </div>
      </section>

      <section id="procedure-answer" className="mx-auto max-w-7xl px-4 py-8 sm:px-5 md:px-8 md:py-12" aria-labelledby="procedure-quick-answer">
        <div className="max-w-3xl rounded-2xl border border-border bg-white p-6">
          <h2 id="procedure-quick-answer" className="font-heading text-2xl">إجابة سريعة</h2>
          <p className="prose-gaf mt-3">{copy.quickAnswer}</p>
          {data.costHref ? (
            <p className="mt-3 text-sm">
              <a href={arHref(data.costHref)}>دليل تكلفة هذا الإجراء في الهند</a>
              <span className="text-muted-foreground"> — نطاق تخطيطي مخزّن، ليس عرض سعر شخصيًا.</span>
            </p>
          ) : null}
        </div>
      </section>

      <section id="procedure-glance" className="mx-auto max-w-7xl px-4 py-8 sm:px-5 md:px-8">
        <HubHeading
          eyebrow="لمحة"
          title="نظرة عامة"
          intro="الجدول يعرض ما يستطيع الدليل إثباته. مدة الدورة ترجمة لنص الإقامة المخزّن في دليل التكلفة عندما يوجد. الخطة الفردية تُكتب بعد التخطيط، ولا يُحوَّل نطاق التكلفة إلى الريال هنا."
        />
        <div className="compare-wrap mt-6 max-w-4xl overflow-x-auto">
          <table className="compare-table glance-table w-full border-collapse text-sm">
            <caption className="sr-only">نظرة عامة على {taxonomyLabel(copy.procedure, "ar")} في الهند</caption>
            <thead>
              <tr>
                <th scope="col">البند</th>
                <th scope="col">ما ينطبق على هذه الصفحة</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">تصنيف الإجراء</th>
                <td>{KIND_AR[copy.kind]}</td>
              </tr>
              <tr>
                <th scope="row">أطباء مرتبطون في الدليل</th>
                <td>{data.doctorCountLabel}</td>
              </tr>
              <tr>
                <th scope="row">مستشفيات يظهر فيها طبيب مرتبط</th>
                <td>{data.hospitalCountLabel}</td>
              </tr>
              <tr>
                <th scope="row">تكلفة الهند (دولار أمريكي)</th>
                <td>
                  {data.benchmarks ? (
                    <>
                      <span dir="ltr">{data.benchmarks.indiaUsd}</span>
                      <span> نطاق تخطيطي مخزّن، ليس عرض سعر لهذه الحالة.</span>
                    </>
                  ) : (
                    "لا يوجد نطاق مخزّن."
                  )}
                  {data.costHref ? (
                    <>
                      {" "}
                      <a href={arHref(data.costHref)}>دليل التكلفة</a>
                    </>
                  ) : null}
                </td>
              </tr>
              <tr>
                <th scope="row">تكلفة الولايات المتحدة (دولار أمريكي)</th>
                <td>
                  {data.benchmarks ? (
                    <>
                      <span dir="ltr">{data.benchmarks.usUsd}</span>
                      <span> مقارنة دفع ذاتي مخزّنة، وليست فاتورة واحدة.</span>
                    </>
                  ) : (
                    "لا يوجد نطاق مخزّن."
                  )}
                </td>
              </tr>
              <tr>
                <th scope="row">الإمارات</th>
                <td>
                  {data.benchmarks
                    ? `مستوى نسبي مخزّن ${data.benchmarks.uaeLevel} نقطة منتصف نطاق الهند. ليس مبلغًا مصدريًا ولا عرض سعر.`
                    : "لا يوجد نطاق مخزّن."}
                </td>
              </tr>
              <tr>
                <th scope="row">السعودية</th>
                <td>لا يوجد نطاق مخزّن لهذا الإجراء.</td>
              </tr>
              <tr>
                <th scope="row">الريال السعودي</th>
                <td>الأرقام المخزّنة بالدولار الأمريكي. هذه الصفحة لا تحوّلها إلى الريال.</td>
              </tr>
              <tr>
                <th scope="row">زمن الجلسة</th>
                <td>{data.benchmarks?.session ?? "يكتبه الفريق بعد التخطيط. لا يُستنتج من اسم الإجراء."}</td>
              </tr>
              <tr>
                <th scope="row">عدد الجلسات</th>
                <td>{data.benchmarks?.fractions ?? "يكتبه الفريق المعالج بعد التخطيط. لا يُستنتج من اسم الإجراء."}</td>
              </tr>
              <tr>
                <th scope="row">مدة الدورة والإقامة</th>
                <td>
                  {data.benchmarks?.course ??
                    (data.benchmarks?.fractions
                      ? "عدد الليالي غير مخزّن لهذا الإجراء. عدد الجلسات في الصف السابق مأخوذ من دليل التكلفة."
                      : "تُحدد بعد المحاكاة. هذه الصفحة لا تنشر عدد ليالٍ ثابتًا.")}
                </td>
              </tr>
              <tr>
                <th scope="row">موضع العلاج</th>
                <td>{BODY_LOCATION_AR}</td>
              </tr>
              <tr>
                <th scope="row">نتائج العلاج</th>
                <td>غير منشورة في هذا الدليل. لا تُعرض نسبة ولا مقارنة بين الأطباء.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-5 md:px-8">
        <HubHeading eyebrow="تعريف" title={copy.noteHeading} />
        <div className="guide mt-4 max-w-3xl">
          {copy.note.map((paragraph) => (
            <p key={paragraph} className="prose-gaf">{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-5 md:px-8">
        <HubHeading eyebrow="المسار" title="كيف يُخطَّط العلاج ويُسلَّم" intro={data.benchmarks?.fractions ? "الخطوات التي تنطبق على هذا الإجراء. الرقم في جدول النظرة العامة نطاق مخزّن، والخطة الفردية تُكتب بعد المحاكاة." : "الخطوات التي تنطبق على هذا الإجراء. عدد الجلسات لا يُثبَّت هنا."} />
        <ol className="step-list mt-6 max-w-3xl list-decimal space-y-3 ps-5">
          {copy.steps.map((step) => (
            <li key={step.title}>
              <strong className="text-foreground">{step.title}. </strong>
              {step.body}
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-border bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8">
          <HubHeading eyebrow="الاستخدام" title="حالات قد يُطرح فيها هذا الإجراء" intro={copy.indicationsIntro} />
          <ul className="prep-list mt-4 max-w-3xl list-disc space-y-2 ps-5">
            {copy.indications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8">
        <HubHeading eyebrow="توازن" title="ما قد يفيد، وما يحدّ، وما قد يضر" />
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <article>
            <h3 className="font-heading text-xl">فوائد محتملة</h3>
            <ul className="prep-list mt-3 list-disc space-y-2 ps-5 text-sm leading-relaxed">{copy.benefits.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article>
            <h3 className="font-heading text-xl">مخاطر وآثار</h3>
            <ul className="prep-list mt-3 list-disc space-y-2 ps-5 text-sm leading-relaxed">{copy.risks.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <article>
            <h3 className="font-heading text-xl">حدود</h3>
            <ul className="prep-list mt-3 list-disc space-y-2 ps-5 text-sm leading-relaxed">{copy.limitations.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-5 md:px-8">
        <HubHeading eyebrow="الملاءمة" title="ما الذي يراجعه الفريق قبل الاختيار" intro="هذه ليست أداة تقرر بها بنفسك إن كنت مرشحًا." />
        <ul className="prep-list mt-4 max-w-3xl list-disc space-y-2 ps-5">
          {copy.eligibility.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8">
          <HubHeading eyebrow="مقارنة" title={copy.comparisonTitle} intro={copy.comparisonIntro} />
          <div className="compare-wrap mt-6 max-w-4xl overflow-x-auto">
            <table className="compare-table w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th>الجانب</th>
                  <th>{taxonomyLabel(copy.procedure, "ar")}</th>
                  <th>{copy.comparisonPeerLabel}</th>
                </tr>
              </thead>
              <tbody>
                {copy.comparison.map((row) => (
                  <tr key={row.aspect}>
                    <th scope="row">{row.aspect}</th>
                    <td>{row.ours}</td>
                    <td>{row.theirs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.peerHref ? (
            <p className="mt-4 text-sm">
              <a href={arHref(data.peerHref)}>صفحة {copy.comparisonPeerLabel}</a>
            </p>
          ) : null}
          {copy.board ? (
            <div className="mt-10 max-w-4xl">
              <h3 className="font-heading text-2xl">{copy.board.title}</h3>
              <p className="prose-gaf mt-3">{copy.board.intro}</p>
              <div className="compare-wrap mt-6 overflow-x-auto">
                <table className="compare-table w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      <th scope="col">الجانب</th>
                      {copy.board.headers.map((header) => (
                        <th key={header} scope="col">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {copy.board.rows.map((row) => (
                      <tr key={row.aspect}>
                        <th scope="row">{row.aspect}</th>
                        {row.cells.map((cell, index) => (
                          <td key={`${row.aspect}-${index}`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section id="procedure-doctors" className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8">
        <HubHeading
          eyebrow="الأطباء"
          title="أطباء مرتبطون بهذا الإجراء في الدليل"
          intro="العلاقة مأخوذة من ملف الطبيب. التخصص وحده لا يضع الطبيب في هذه القائمة، والترتيب ليس تصنيفًا سريريًا."
        />
        <ul className="mt-6 grid gap-4">
          {data.doctors.map((doctor) => (
            <li key={doctor.slug}>
              <ArabicDoctorSsrCard doctor={doctor} />
            </li>
          ))}
        </ul>
        <ArabicSsrPager
          page={data.paging.page}
          totalPages={data.paging.totalPages}
          basePath="/doctors"
          query={{ destination: "India", specialty: "Radiation Oncology", procedure: copy.procedure }}
          label="صفحات الأطباء"
        />
      </section>

      {data.hospitals.length > 0 ? (
        <section id="procedure-hospitals" className="border-y border-border bg-secondary/20">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8">
            <HubHeading
              eyebrow="المستشفيات"
              title="مستشفيات يظهر فيها طبيب مرتبط بهذا الإجراء"
              intro="الظهور يعني انتساب طبيب ذكر الإجراء في ملفه. ليس جردًا يثبت أن الجهاز يعمل في كل فرع من المجموعة."
            />
            <ul className="card-grid mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {data.hospitals.map((row) => (
                <li key={row.hospital.slug}>
                  <a href={arHref(`/hospitals/${row.hospital.slug}`)} className="link-card block rounded-2xl border border-border bg-white p-5">
                    <p className="link-card__title font-heading text-xl">{row.hospital.name}</p>
                    <p className="link-card__meta mt-1 text-sm text-muted-foreground">
                      {taxonomyLabel(row.hospital.city, "ar")} · {row.count} {row.count === 1 ? "طبيب" : "أطباء"} مرتبطون بالإجراء
                    </p>
                    {row.hospital.accreditation?.trim() ? (
                      <p className="link-card__meta mt-1 text-sm text-muted-foreground">الاعتماد على الملف: {row.hospital.accreditation.trim()}</p>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {data.cities.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8">
          <HubHeading
            eyebrow="المدن"
            title="أطباء هذا الإجراء حسب المدينة"
            intro="الرابط يفتح قائمة الأطباء في تلك المدينة. هو ليس نسخة من هذا الشرح مع استبدال اسم المدينة."
          />
          <ul className="card-grid mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {data.cities.map((city) => (
              <li key={city.href}>
                <a href={arHref(city.href)} className="link-card block rounded-2xl border border-border bg-white p-5">
                  <p className="link-card__title font-heading text-xl">{city.name}</p>
                  <p className="link-card__meta mt-1 text-sm text-muted-foreground">{city.count} ملفًا مرتبطًا بالإجراء</p>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-5 md:px-8">
        <HubHeading eyebrow="التكلفة" title="ما الذي يغيّر التقدير" intro="لا يُعرض هنا سعر شخصي. إن وُجد نطاق تخطيطي فهو في دليل التكلفة المرتبط." />
        <ul className="prep-list mt-4 max-w-3xl list-disc space-y-2 ps-5">
          {copy.costFactors.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {data.costHref ? (
          <p className="mt-4 text-sm">
            <a href={arHref(data.costHref)}>افتح دليل التكلفة</a>
          </p>
        ) : null}
      </section>

      <section className="border-y border-border bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8">
          <HubHeading eyebrow="قبل السفر" title="تقارير قد تُطلب للمراجعة الأولى" intro="القائمة تختلف حسب الحالة. إرسالها لا يعني قبول العلاج." />
          <ul className="prep-list mt-4 max-w-3xl list-disc space-y-2 ps-5">
            {copy.records.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="prose-gaf mt-4 max-w-3xl">{copy.international}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-5 md:px-8">
        <HubHeading eyebrow="صفحات قريبة" title="تقنيات لا تُستبدل بهذه الصفحة" />
        <ul className="mt-4 flex flex-wrap gap-2">
          <li>
            <a href={arHref(data.parentPath)} className="inline-flex rounded-full border border-border bg-white px-4 py-2 text-sm">علاج الأورام بالإشعاع في الهند</a>
          </li>
          {data.related.map((row) => (
            <li key={row.href}>
              <a href={arHref(row.href)} className="inline-flex rounded-full border border-border bg-white px-4 py-2 text-sm">{row.name}</a>
            </li>
          ))}
        </ul>
      </section>

      <section id="procedure-faqs" className="border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8">
          <HubHeading eyebrow="أسئلة شائعة" title={`أسئلة عن ${taxonomyLabel(copy.procedure, "ar")}`} intro="إجابات عامة للمرضى الدوليين. ليست تشخيصًا ولا تغني عن تقييم الفريق المعالج." />
          <div className="faq-grid mt-8 grid gap-4 md:grid-cols-2">
            {copy.faqs.map((row) => (
              <article key={row.q} className="faq-card rounded-2xl border border-border bg-card px-5 py-4">
                <h3 className="font-medium leading-snug">{row.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{row.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8">
        <div className="rounded-3xl border border-border bg-white p-6 md:p-8">
          <h2 className="font-heading text-3xl">اطلب المساعدة في مراجعة الحالة</h2>
          <p className="prose-gaf mt-3">تساعد GAF Healthcare على تنظيم التقارير وطلب مراجعة لدى طبيب أو مستشفى عندما تتاح الخدمة. ليست مستشفى ولا تضع الخطة العلاجية.</p>
          <a href={data.consultHref} className="mt-4 inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm text-ivory" rel="noreferrer noopener">راسل عبر واتساب</a>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{data.selectionNote}</p>
        </div>
      </section>

      <section className="editorial-note mx-auto max-w-7xl px-4 pb-12 sm:px-5 md:px-8">
        <p>{data.review.attribution} · آخر تحرير {data.review.updated}. {data.review.note}</p>
        <ul className="source-list mt-3">
          {data.review.sources.map((source) => (
            <li key={source.href}>
              <a href={source.href}>{source.name}</a>
              <span className="text-muted-foreground"> — {source.note}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
