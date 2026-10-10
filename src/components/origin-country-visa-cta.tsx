import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { ORIGIN_COUNTRY_HUBS, ORIGIN_COUNTRY_SECTION } from "@/data/origin-countries";

export function OriginCountryVisaCta({
  href,
  whatsappHref,
}: {
  href: string;
  whatsappHref: string;
}) {
  const country = ORIGIN_COUNTRY_HUBS.find((row) => row.href === href);
  if (!country) return null;

  return (
    <aside className="origin-visa-cta">
      <div>
        <strong>{ORIGIN_COUNTRY_SECTION.visaTitle(country.name)}</strong>
        <em>{country.visaNote}</em>
      </div>
      <a href={whatsappHref} className="origin-visa-cta__btn" target="_blank" rel="noreferrer">
        <WhatsAppIcon />
        {ORIGIN_COUNTRY_SECTION.ctaLabel}
      </a>
    </aside>
  );
}
