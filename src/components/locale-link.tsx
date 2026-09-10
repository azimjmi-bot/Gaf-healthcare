"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLocale } from "@/components/locale-provider";
import { localePath, isInternalHref } from "@/lib/i18n/path";

type Props = ComponentProps<typeof NextLink>;

function localizedHref(href: Props["href"], locale: ReturnType<typeof useLocale>): Props["href"] {
  if (typeof href !== "string") return href;
  if (!isInternalHref(href)) return href;
  return localePath(href, locale);
}

export function LocaleLink({ href, ...props }: Props) {
  const locale = useLocale();
  return <NextLink href={localizedHref(href, locale)} {...props} />;
}
