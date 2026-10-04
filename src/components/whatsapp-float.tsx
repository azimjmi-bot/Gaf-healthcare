import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { localizeMessages } from "@/lib/i18n/localize";
import { getRequestLocale, getRequestPath } from "@/lib/i18n/request";
import { isPublicWhatsAppFloatPath, whatsappHref } from "@/lib/site";

export async function WhatsAppFloat() {
  const pathname = await getRequestPath();
  if (!isPublicWhatsAppFloatPath(pathname)) return null;
  const locale = await getRequestLocale();
  const t = await localizeMessages(locale);

  return (
    <a
      className="wa-float"
      href={whatsappHref(t["wa.floatMessage"])}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={t["wa.floatAria"]}
    >
      <span className="wa-float__icon">
        <WhatsAppIcon />
      </span>
      <span className="wa-float__copy">
        <span className="wa-float__title">{t["wa.floatTitle"]}</span>
        <span className="wa-float__meta">
          <span className="wa-float__dot" aria-hidden="true" />
          <span className="wa-float__status">{t["wa.floatStatus"]}</span>
          <span aria-hidden="true">·</span>
          <span>{t["wa.floatSla"]}</span>
        </span>
      </span>
    </a>
  );
}
