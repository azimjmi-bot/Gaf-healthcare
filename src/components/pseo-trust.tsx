import { CostAttribution } from "@/components/cost-page/cost-attribution";
import { PatientReviews } from "@/components/patient-reviews";
import { PatientStories } from "@/components/patient-stories";
import { GOOGLE_PROFILE } from "@/data/home";
import { getRequestLocale } from "@/lib/i18n/request";
import {
  localizeHomeExtras,
  localizeMessages,
} from "@/lib/i18n/localize";

/** Shared medical-review, patient-story and Google-review blocks for programmatic SEO pages. */
export async function PseoTrust({ attribution = true }: { attribution?: boolean }) {
  const locale = await getRequestLocale();
  const messages = await localizeMessages(locale);
  const extras = await localizeHomeExtras(locale);
  return (
    <>
      {attribution && locale === "en" ? (
        <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-5 md:px-8">
          <CostAttribution flush />
        </section>
      ) : null}
      <PatientStories
        videos={extras.videos}
        eyebrow={messages["home.storiesEyebrow"]}
        title={messages["home.storiesTitle"]}
        moreLabel={messages["home.moreYoutube"]}
      />
      <PatientReviews
        reviews={extras.reviews}
        eyebrow={messages["home.reviewsEyebrow"]}
        title={messages["home.reviewsTitle"]}
        summary={messages["home.reviewsSummary"]
          ?.replace("{rating}", GOOGLE_PROFILE.rating)
          .replace("{count}", String(GOOGLE_PROFILE.reviewCount))}
        readLabel={messages["home.readGoogle"]}
      />
    </>
  );
}
