import { CostAttribution } from "@/components/cost-page/cost-attribution";
import { PatientReviews } from "@/components/patient-reviews";

/** Shared medical-review and Google-review blocks for programmatic SEO pages. */
export function PseoTrust({ attribution = true }: { attribution?: boolean }) {
  return (
    <>
      {attribution ? (
        <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-5 md:px-8">
          <CostAttribution flush />
        </section>
      ) : null}
      <PatientReviews />
    </>
  );
}
