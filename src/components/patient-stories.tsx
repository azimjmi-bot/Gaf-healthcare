import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HOME_VIDEOS, YOUTUBE_CHANNEL } from "@/data/home";

type PatientStory = {
  id: string;
  title: string;
};

export function PatientStories({
  videos = HOME_VIDEOS,
  eyebrow = "Patient stories",
  title = "People. Real Journeys.",
  moreLabel = "More on YouTube",
}: {
  videos?: readonly PatientStory[];
  eyebrow?: string;
  title?: string;
  moreLabel?: string;
}) {
  return (
    <section className="home-section" aria-label={title}>
      <div className="home-head">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <a href={YOUTUBE_CHANNEL} className="home-more" target="_blank" rel="noreferrer">
          {moreLabel} <ArrowRight className="size-4 icon-forward" />
        </a>
      </div>
      <div className="home-videogrid">
        {videos.map((video) => (
          <a
            key={video.id}
            href={`https://www.youtube.com/watch?v=${video.id}`}
            className="home-video"
            target="_blank"
            rel="noreferrer"
          >
            <span className="home-video__thumb">
              <Image
                src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 24vw, (min-width: 640px) 50vw, 100vw"
              />
              <span className="home-video__play" aria-hidden>
                ▶
              </span>
            </span>
            <strong>{video.title}</strong>
          </a>
        ))}
      </div>
    </section>
  );
}
