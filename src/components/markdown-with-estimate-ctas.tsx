import { MarkdownBody } from "@/components/markdown-body";
import { PseoEstimateCta } from "@/components/pseo-estimate-cta";
import {
  BLOG_CTA_VARIANTS,
  splitMarkdownByCtas,
} from "@/lib/article-ctas";
import { blogEstimateWhatsapp } from "@/lib/site";

export function MarkdownWithEstimateCtas({
  source,
  subject,
  place = "India",
}: {
  source: string;
  subject: string;
  place?: string;
}) {
  const chunks = splitMarkdownByCtas(source);
  const fallback = blogEstimateWhatsapp(subject, place);
  let panel = 0;
  return (
    <>
      {chunks.map((chunk, index) => {
        if (chunk.type === "markdown") {
          return <MarkdownBody key={index} source={chunk.source} />;
        }
        const variant = BLOG_CTA_VARIANTS[panel % BLOG_CTA_VARIANTS.length];
        panel += 1;
        return (
          <PseoEstimateCta
            key={index}
            subject={subject}
            place={place}
            consultHref={chunk.links[0]?.href || fallback.primary}
            secondaryHref={chunk.links[1]?.href || fallback.secondary}
            variant={variant}
            className="article-estimate-cta"
          />
        );
      })}
    </>
  );
}
