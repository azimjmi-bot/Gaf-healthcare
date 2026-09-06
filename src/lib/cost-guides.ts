import type { ComponentType } from "react";
import { CrtGuide } from "@/components/crt-guide";
import { EbrtGuide } from "@/components/ebrt-guide";
import { crtMeta } from "@/data/crt-guide";
import { ebrtMeta } from "@/data/ebrt-guide";

export type CostGuide = {
  title: string;
  description: string;
  relatedBlog?: { href: string; label: string };
  Guide: ComponentType;
};

export const costGuides: Record<string, CostGuide> = {
  "external-beam-radiotherapy-ebrt": {
    title: ebrtMeta.title,
    description: ebrtMeta.description,
    relatedBlog: {
      href: "/blogs/records-before-you-book-ebrt",
      label: "Records to send before travel",
    },
    Guide: EbrtGuide,
  },
  "3d-conformal-radiotherapy-3d-crt": {
    title: crtMeta.title,
    description: crtMeta.description,
    relatedBlog: {
      href: "/blogs/imrt-vs-3d-crt",
      label: "IMRT versus 3D-CRT",
    },
    Guide: CrtGuide,
  },
};

export function getCostGuide(slug: string) {
  return costGuides[slug];
}
