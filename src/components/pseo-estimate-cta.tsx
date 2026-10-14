import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { consultToWhatsappHref } from "@/lib/site";
import type { AppLocale } from "@/lib/i18n/languages";

function EstimateCtaLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  const external = /^(https?:|mailto:)/i.test(href);
  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer noopener">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

type EstimateCtaVariant = "records" | "options" | "hospital" | "travel" | "plan";

const COPY: Record<
  EstimateCtaVariant,
  {
    heading: (subject: string, place: string) => string;
    body: (subject: string, place: string) => string;
    primary: string;
    secondary: (subject: string, place: string) => string;
  }
> = {
  records: {
    heading: (subject) => `Need a case-specific ${subject} estimate?`,
    body: (subject) =>
      `Share your medical records for a treatment review. A relevant specialist can then discuss the ${subject} pathway, likely hospital requirements and a written estimate — this is not a quotation or a treatment decision.`,
    primary: "Request a personalized treatment estimate",
    secondary: (subject, place) => `Speak with GAF Healthcare about ${subject} in ${place}`,
  },
  options: {
    heading: () => "Not sure which treatment option fits your case?",
    body: (subject) =>
      `Send the diagnosis, recent reports and previous treatment details for review. GAF Healthcare can help identify specialists and hospitals relevant to ${subject} before you make travel or booking decisions.`,
    primary: "Ask for a case review",
    secondary: (subject, place) => `Discuss ${subject} options in ${place}`,
  },
  hospital: {
    heading: () => "Want to compare hospitals for your treatment?",
    body: (subject, place) =>
      `Hospital choice depends on the planned ${subject} pathway, specialist availability and the facilities required for your case. Share your records to request comparable options in ${place}.`,
    primary: "Compare suitable hospital options",
    secondary: (subject, place) => `Get help choosing ${subject} care in ${place}`,
  },
  travel: {
    heading: () => "Planning treatment and travel together?",
    body: (subject, place) =>
      `A records-first review can clarify the expected ${subject} pathway, likely stay and hospital estimate before travel to ${place}. Final decisions remain with the treating clinician after assessment.`,
    primary: "Plan my treatment journey",
    secondary: (subject, place) => `Ask about travelling for ${subject} to ${place}`,
  },
  plan: {
    heading: () => "Ready to request a personalized treatment plan?",
    body: (subject) =>
      `Share your available reports securely. GAF Healthcare can coordinate a specialist review for ${subject} and return next-step guidance with an indicative hospital estimate.`,
    primary: "Start my treatment request",
    secondary: (subject, place) => `Speak with a coordinator about ${subject} in ${place}`,
  },
};

const COPY_AR: typeof COPY = {
  records: {
    heading: (subject) => `هل تحتاج إلى تقدير مخصص لحالتك بشأن ${subject}؟`,
    body: (subject) =>
      `شارك سجلاتك الطبية لمراجعة الحالة. بعد ذلك يمكن لاختصاصي مناسب مناقشة مسار ${subject} ومتطلبات المستشفى المحتملة والتقدير الكتابي؛ وهذه الخطوة ليست عرض سعر أو قرار علاج.`,
    primary: "اطلب تقديرًا مخصصًا للعلاج",
    secondary: (subject, place) => `تحدث مع GAF Healthcare عن ${subject} في ${place}`,
  },
  options: {
    heading: () => "لست متأكدًا من الخيار العلاجي المناسب لحالتك؟",
    body: (subject) =>
      `أرسل التشخيص والتقارير الحديثة وتفاصيل العلاج السابق للمراجعة. تساعدك GAF Healthcare في تحديد الاختصاصيين والمستشفيات المرتبطة بـ${subject} قبل اتخاذ قرار السفر أو الحجز.`,
    primary: "اطلب مراجعة الحالة",
    secondary: (subject, place) => `ناقش خيارات ${subject} في ${place}`,
  },
  hospital: {
    heading: () => "هل تريد مقارنة المستشفيات المناسبة لعلاجك؟",
    body: (subject, place) =>
      `يعتمد اختيار المستشفى على مسار ${subject} وتوفر الاختصاصي والتجهيزات التي تحتاجها الحالة. شارك السجلات لطلب خيارات قابلة للمقارنة في ${place}.`,
    primary: "قارن خيارات المستشفيات",
    secondary: (subject, place) => `اطلب مساعدة لاختيار رعاية ${subject} في ${place}`,
  },
  travel: {
    heading: () => "هل تخطط للعلاج والسفر معًا؟",
    body: (subject, place) =>
      `توضح مراجعة السجلات أولًا مسار ${subject} والإقامة المتوقعة وتقدير المستشفى قبل السفر إلى ${place}. يبقى القرار النهائي للطبيب المعالج بعد التقييم.`,
    primary: "خطط لرحلة العلاج",
    secondary: (subject, place) => `اسأل عن السفر من أجل ${subject} إلى ${place}`,
  },
  plan: {
    heading: () => "هل أنت مستعد لطلب خطة علاج مخصصة؟",
    body: (subject) =>
      `شارك التقارير المتاحة بأمان. تنسق GAF Healthcare مراجعة اختصاصي لـ${subject} وتعيد إليك الخطوات التالية مع تقدير إرشادي من المستشفى.`,
    primary: "ابدأ طلب العلاج",
    secondary: (subject, place) => `تحدث مع منسق عن ${subject} في ${place}`,
  },
};

export function PseoEstimateCta({
  subject,
  place,
  consultHref,
  secondaryHref,
  variant,
  className,
  locale = "en",
}: {
  subject: string;
  place: string;
  consultHref: string;
  secondaryHref?: string;
  variant: EstimateCtaVariant;
  className?: string;
  locale?: AppLocale;
}) {
  const copy = (locale === "ar" ? COPY_AR : COPY)[variant];
  const primaryHref = consultToWhatsappHref(
    consultHref,
    `Please review my medical records and share a case-specific estimate for ${subject} in ${place}.`,
  );
  const nextHref = consultToWhatsappHref(
    secondaryHref || consultHref,
    `I would like to speak with GAF Healthcare about ${subject} in ${place}.`,
  );

  return (
    <aside
      className={["cost-panel mt-12", className].filter(Boolean).join(" ")}
      aria-label={locale === "ar" ? "تقدير علاجي مخصص" : "Personalized treatment estimate"}
    >
      <h2>{copy.heading(subject, place)}</h2>
      <p className="mt-3 max-w-3xl text-[1.02rem] leading-relaxed text-ivory/75">
        {copy.body(subject, place)}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <EstimateCtaLink href={primaryHref} className="cost-btn cost-btn--primary">
          {copy.primary}
        </EstimateCtaLink>
        <EstimateCtaLink
          href={nextHref}
          className="cost-btn border border-ivory/25 text-ivory hover:bg-white/5"
        >
          {copy.secondary(subject, place)}
        </EstimateCtaLink>
      </div>
    </aside>
  );
}

export function PseoEstimateCtaSection(
  props: ComponentProps<typeof PseoEstimateCta>,
) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 md:pb-14">
      <PseoEstimateCta {...props} />
    </section>
  );
}
