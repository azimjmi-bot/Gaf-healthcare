"use client";

import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { useT } from "@/components/locale-provider";
import { usePathname } from "next/navigation";
import { stripLocalePrefix } from "@/lib/i18n/path";
import { isPublicWhatsAppFloatPath, whatsappHref } from "@/lib/site";

export function WhatsAppFloat() {
  const pathname = stripLocalePrefix(usePathname() || "/").pathname;
  const t = useT();
  if (!isPublicWhatsAppFloatPath(pathname)) return null;

  return (
    <a
      className="wa-float"
      href={whatsappHref(t("wa.floatMessage"))}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={t("wa.floatAria")}
    >
      <span className="wa-float__icon">
        <WhatsAppIcon />
      </span>
      <span className="wa-float__copy">
        <span className="wa-float__title">{t("wa.floatTitle")}</span>
        <span className="wa-float__meta">
          <span className="wa-float__dot" aria-hidden="true" />
          <span className="wa-float__status">{t("wa.floatStatus")}</span>
          <span aria-hidden="true">·</span>
          <span>{t("wa.floatSla")}</span>
        </span>
      </span>
    </a>
  );
}
