import type { AppLocale } from "@/lib/i18n/languages";
import { taxonomyLabel } from "@/lib/i18n/taxonomy-labels";
import { visibleProcedureFacts } from "@/lib/procedure-benchmarks";

/**
 * Stored cost and schedule rows for any procedure that has a catalog treatment.
 * MedicalProcedure schema repeats these sentences and nothing beyond them.
 */
export function ProcedureBenchmarkTable({
  procedure,
  locale,
}: {
  procedure: string;
  locale: AppLocale;
}) {
  if (locale !== "en" && locale !== "ar") return null;
  const facts = visibleProcedureFacts(procedure, locale);
  if (!facts) return null;
  const ar = locale === "ar";

  return (
    <section id="procedure-benchmarks" className="mx-auto max-w-7xl px-4 py-8 sm:px-5 md:px-8">
      <p className="eyebrow">{ar ? "لمحة" : "At a glance"}</p>
      <h2 className="mt-2 font-heading text-3xl">{ar ? "أرقام التخطيط" : "Planning figures"}</h2>
      <p className="prose-gaf mt-3">
        {ar
          ? "الجدول يعرض ما يخزّنه الدليل. ليس عرض سعر شخصيًا، ولا يحوّل الدولار إلى الريال."
          : "The table shows what the catalog stores. It is not a personal quote, and it does not convert dollars into riyals."}
      </p>
      <p className="prose-gaf mt-3">{facts.howPerformed}</p>
      <div className="mt-6 max-w-4xl overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">
            {ar ? "أرقام التخطيط" : "Planning figures"}: {taxonomyLabel(procedure, locale)}
          </caption>
          <thead>
            <tr>
              <th scope="col" className="border border-border px-3 py-2 text-start">
                {ar ? "البند" : "Item"}
              </th>
              <th scope="col" className="border border-border px-3 py-2 text-start">
                {ar ? "ما ينطبق على هذه الصفحة" : "What this page can show"}
              </th>
            </tr>
          </thead>
          <tbody>
            {facts.rows.map((row) => (
              <tr key={row.label}>
                <th scope="row" className="border border-border px-3 py-2 text-start font-medium">
                  {row.label}
                </th>
                <td className="border border-border px-3 py-2">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
