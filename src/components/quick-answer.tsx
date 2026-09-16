import { LocaleLink as Link } from "@/components/locale-link";
import type { QuickAnswerItem } from "@/lib/doctor-quick-answers";

export function QuickAnswer({
  items,
  variant = "page",
}: {
  items: QuickAnswerItem[];
  variant?: "page" | "embed";
}) {
  if (!items.length) return null;
  const inner = (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-[0_16px_40px_-32px_rgba(20,24,28,0.45)] md:p-8">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">Quick answer</p>
      <h2 className="mt-2 font-heading text-3xl md:text-4xl">Quick Answer</h2>
      <div className={`mt-6 grid gap-8 ${items.length > 1 ? "md:grid-cols-2" : ""}`}>
        {items.map((item) => (
          <article key={item.question}>
            <h3 className="font-heading text-2xl">{item.question}</h3>
            <p className="prose-gaf mt-3">{item.answer}</p>
            {item.sourceHref ? (
              <p className="mt-3 text-sm">
                <Link href={item.sourceHref} className="underline-offset-4 hover:underline">
                  {item.sourceLabel ?? "Read the full GAF guide"}
                </Link>
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
  if (variant === "embed") return inner;
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 md:px-8 md:py-14">{inner}</section>
  );
}
