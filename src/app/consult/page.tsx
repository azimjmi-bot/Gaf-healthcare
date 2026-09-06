import { ConsultForm } from "@/components/consult-form";
import { PageIntro } from "@/components/page-shell";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Request a dossier" };

export default async function ConsultPage({
  searchParams,
}: {
  searchParams: Promise<{ treatment?: string; hospital?: string; doctor?: string }>;
}) {
  const q = await searchParams;
  return (
    <>
      <PageIntro
        eyebrow="Intake"
        title="Twelve minutes. Then we do the heavy reading."
        lede="Share what you can. Imaging and records can follow. A coordinator replies within one business day with next steps — or with an honest no."
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-7">
          <ConsultForm
            defaultTreatment={q.treatment}
            defaultHospital={q.hospital}
            defaultDoctor={q.doctor}
          />
        </div>
        <aside className="md:col-span-5">
          <div className="rounded-2xl bg-ink p-8 text-ivory md:sticky md:top-24">
            <p className="eyebrow text-gold">What happens next</p>
            <ol className="mt-6 space-y-5 text-sm leading-relaxed text-ivory/75">
              <li>01 — We confirm we can help, or we say we cannot.</li>
              <li>02 — You receive two or three matched options with all-in cost.</li>
              <li>03 — Video consult with the surgeon. No deposit before that call.</li>
            </ol>
            <p className="mt-8 text-sm text-ivory/55">
              Prefer to speak first? {site.phone}
              <br />
              {site.hours}
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
