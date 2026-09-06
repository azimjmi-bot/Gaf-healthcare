import { CtaBand, PageIntro } from "@/components/page-shell";
import { stories } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Stories" };

export default function StoriesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Letters"
        title="Patients, not testimonials written in a marketing room."
        lede="Names are shortened. Clinical detail is theirs to share. These are representative journeys through Velora — including the times we advised someone not to travel."
      />
      <section className="mx-auto max-w-3xl space-y-16 px-5 py-16 md:px-8">
        {stories.map((s) => (
          <article key={s.slug} className="border-t border-border pt-10">
            <p className="eyebrow">
              {s.treatment} · {s.destination}
            </p>
            <blockquote className="mt-4 font-heading text-3xl leading-snug md:text-4xl">
              &ldquo;{s.quote}&rdquo;
            </blockquote>
            <p className="mt-6 leading-relaxed text-muted-foreground">{s.detail}</p>
            <p className="mt-4 text-sm">
              {s.name} · {s.from}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{s.savings}</p>
          </article>
        ))}
      </section>
      <CtaBand />
    </>
  );
}
