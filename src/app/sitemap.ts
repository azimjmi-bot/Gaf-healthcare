import type { MetadataRoute } from "next";
import { buildLocaleSitemap } from "@/lib/i18n/sitemap-entries";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildLocaleSitemap("en");
}
