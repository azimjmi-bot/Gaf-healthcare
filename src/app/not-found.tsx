import { LocaleLink as Link } from "@/components/locale-link";
import { localizeMessages } from "@/lib/i18n/localize";
import { getRequestLocale } from "@/lib/i18n/request";
import {
  localeSurfaceIsAvailable,
  type LocaleSurface,
} from "@/lib/i18n/locale-availability";

export default async function NotFound() {
  const locale = await getRequestLocale();
  const messages = await localizeMessages(locale);
  const links = [
    { href: "/doctors", label: messages["nav.doctors"], surface: "doctors" },
    { href: "/hospitals", label: messages["nav.hospitals"], surface: "hospitals" },
    { href: "/treatments", label: messages["nav.treatments"], surface: "treatments" },
    { href: "/costs", label: messages["nav.costs"], surface: "costs" },
    { href: "/blogs", label: messages["nav.blogs"], surface: "blogs" },
  ].filter((link) =>
    localeSurfaceIsAvailable(locale, link.surface as LocaleSurface),
  );
  return (
    <section className="mx-auto max-w-3xl px-5 py-32 text-center md:px-8">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-heading text-5xl">{messages["notFound.title"]}</h1>
      <p className="mt-4 text-muted-foreground">
        {messages["notFound.body"]}
      </p>
      {links.length > 0 ? (
        <nav className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="underline-offset-4 hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </section>
  );
}
