"use client";

import { useState } from "react";
import { HospitalCampusVisual } from "@/components/hospital-campus-visual";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Hospital } from "@/lib/hospitals";
import { infrastructureLocalized } from "@/lib/i18n/hospital-copy";
import type { AppLocale } from "@/lib/i18n/languages";
import { uiCatalogFor } from "@/lib/i18n/ui-catalogs";

export function HospitalGalleryButton({
  hospital,
  label,
  className,
  locale = "en",
}: {
  hospital: Hospital;
  label?: string;
  className?: string;
  locale?: AppLocale;
}) {
  const [open, setOpen] = useState(false);
  const t = uiCatalogFor(locale);
  const tiles = infrastructureLocalized(hospital, locale);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button type="button" className={className ?? "hp-gallery-btn"}>
          {label ?? t["hp.photos"]}
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-heading text-3xl">{hospital.name}</DialogTitle>
          <DialogDescription>{t["hp.galleryDesc"]}</DialogDescription>
        </DialogHeader>
        <HospitalCampusVisual hospital={hospital} className="mt-2 h-48 overflow-hidden rounded-xl" />
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {tiles.map((tile) => (
            <li key={tile.title} className="rounded-xl border border-border bg-secondary/40 p-4">
              <p className="font-medium">{tile.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{tile.body}</p>
            </li>
          ))}
        </ul>
        <Button type="button" variant="outline" className="mt-2" onClick={() => setOpen(false)}>
          {t["hp.close"]}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
