import type { MetadataRoute } from "next";
import { doctors } from "@/lib/doctors";
import { hospitals } from "@/lib/hospitals";
import { treatments } from "@/lib/treatments";
import { listPublishedPosts } from "@/lib/blogs";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["/", "/doctors", "/hospitals", "/costs", "/blogs", "/consult"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));
  return [
    ...staticRoutes,
    ...doctors.map((d) => ({
      url: `${SITE_URL}/doctors/${d.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...hospitals.map((h) => ({
      url: `${SITE_URL}/hospitals/${h.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...treatments.map((t) => ({
      url: `${SITE_URL}/costs/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...listPublishedPosts()
      .filter((p) => p.allowIndex)
      .map((p) => ({
      url: `${SITE_URL}/blogs/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
