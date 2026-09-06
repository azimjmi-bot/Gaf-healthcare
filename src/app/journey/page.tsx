import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CtaBand, PageIntro } from "@/components/page-shell";
import { faqs, steps } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "The journey" };

export default function JourneyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Choreography"
        title="From first note to the flight home — held."
        lede="Medical travel fails in the gaps: the untranslated discharge, the hotel with stairs after a knee, the surgeon who never saw the MRI. The journey is designed to close those gaps."
      />
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <ol className="space-y-12">
          {steps.map((s) => (
            <li key={s.n} className="grid gap-4 border-t border-border pt-8 md:grid-cols-12">
              <p className="font-heading text-4xl text-gold md:col-span-2">{s.n}</p>
              <h2 className="font-heading text-3xl md:col-span-4">{s.title}</h2>
              <p className="text-muted-foreground leading-relaxed md:col-span-6">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <h2 className="font-heading text-4xl">Questions we are asked first</h2>
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left font-heading text-xl">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
