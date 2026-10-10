"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLocale } from "@/components/locale-provider";
import { localePath, isInternalHref } from "@/lib/i18n/path";
import { consultToWhatsappHref } from "@/lib/site";

type Props = ComponentProps<typeof NextLink> & {
  locale?: string;
  shallow?: boolean;
};

function localizedHref(href: Props["href"], locale: ReturnType<typeof useLocale>): Props["href"] {
  if (typeof href !== "string") return href;
  if (!isInternalHref(href)) return href;
  return localePath(href, locale);
}

export function LocaleLink({
  href,
  prefetch,
  replace,
  scroll,
  shallow: _shallow,
  locale: _localeProp,
  ...props
}: Props) {
  const locale = useLocale();
  const resolved = typeof href === "string" ? consultToWhatsappHref(href) : href;
  if (typeof resolved === "string" && /^https:\/\/wa\.me\//i.test(resolved)) {
    return <a href={resolved} target="_blank" rel="noreferrer noopener" {...props} />;
  }
  return (
    <NextLink
      href={localizedHref(href, locale)}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      {...props}
    />
  );
}
