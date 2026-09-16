import { ArrowRight } from "lucide-react";
import { GOOGLE_MAPS_URL, GOOGLE_PROFILE, HOME_REVIEWS } from "@/data/home";

export function PatientReviews({
  reviews = HOME_REVIEWS,
  eyebrow = "Google reviews",
  title = "What Our Patients Say",
  summary,
  readLabel = "Read on Google",
}: {
  reviews?: readonly { name: string; text: string }[];
  eyebrow?: string;
  title?: string;
  summary?: string;
  readLabel?: string;
}) {
  const lede =
    summary ??
    `${GOOGLE_PROFILE.rating} from ${GOOGLE_PROFILE.reviewCount} reviews on the GAF Healthcare Pvt Ltd Google listing.`;

  return (
    <section className="home-section" aria-label="Patient reviews">
      <div className="home-head">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{lede}</p>
        </div>
        <a href={GOOGLE_MAPS_URL} className="home-more" target="_blank" rel="noreferrer">
          {readLabel} <ArrowRight className="size-4" />
        </a>
      </div>
      <div className="home-reviewgrid">
        {reviews.map((review) => (
          <blockquote key={review.name} className="home-review">
            <p>★★★★★</p>
            <p>{review.text}</p>
            <footer>{review.name}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
