import { ConsultForm } from "@/components/consult-form";
import { PageIntro } from "@/components/page-shell";
import { localizeMessages } from "@/lib/i18n/localize";
import { withLocaleMetadata } from "@/lib/i18n/metadata";
import { getRequestLocale } from "@/lib/i18n/request";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const messages = await localizeMessages(locale);
  return withLocaleMetadata({ title: messages["seo.consultTitle"] }, "/consult", locale, ["en", locale]);
}

export default async function ConsultPage({
  searchParams,
}: {
  searchParams: Promise<{ treatment?: string; hospital?: string; doctor?: string }>;
}) {
  const q = await searchParams;
  const locale = await getRequestLocale();
  const t = await localizeMessages(locale);
  return (
    <>
      <PageIntro eyebrow={t["consult.eyebrow"]} title={t["consult.title"]} lede={t["consult.lede"]} />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-5 md:grid-cols-12 md:gap-12 md:px-8 md:py-16">
        <div className="md:col-span-7">
          <ConsultForm
            defaultTreatment={q.treatment}
            defaultHospital={q.hospital}
            defaultDoctor={q.doctor}
          />
        </div>
        <aside className="md:col-span-5">
          <div className="rounded-2xl bg-ink p-6 text-ivory sm:p-8 md:sticky md:top-24">
            <p className="eyebrow text-gold">{t["consult.next"]}</p>
            <ol className="mt-6 space-y-5 text-sm leading-relaxed text-ivory/75">
              <li>{t["consult.step1"]}</li>
              <li>{t["consult.step2"]}</li>
              <li>{t["consult.step3"]}</li>
            </ol>
            <p className="mt-8 text-sm text-ivory/55">
              {t["consult.speak"]} {site.phone}
              <br />
              {site.hours}
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
