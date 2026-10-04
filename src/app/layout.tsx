import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import { DeferredAnalytics } from "@/components/deferred-analytics";
import { LocaleFontLinks } from "@/components/locale-font-links";
import { LocaleProvider } from "@/components/locale-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { clientMessagesFor } from "@/lib/i18n/client-messages";
import { LANGUAGE_OG, localeDir } from "@/lib/i18n/languages";
import { localizeMessages } from "@/lib/i18n/localize";
import { getRequestLocale, getRequestPath } from "@/lib/i18n/request";
import { languageOptions } from "@/lib/i18n/language-options";
import { availableSurfaces } from "@/lib/i18n/surfaces";
import { SITE_URL } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-F12D7QK2B2";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "optional",
  preload: false,
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  preload: false,
  display: "optional",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const ENGLISH_KEYWORDS = [
    "medical oncologist India",
    "radiation oncologist India",
    "surgical oncologist India",
    "cancer treatment cost India",
    "hematologist India",
    "bone marrow transplant cost India",
    "pediatric hematologist India",
    "cardiac surgeon India",
    "CABG cost India",
    "TAVR TAVI India",
    "cardiologist India",
    "coronary angioplasty India",
    "bariatric surgeon India",
    "sleeve gastrectomy cost India",
    "cosmetic surgeon India",
    "rhinoplasty cost India",
    "ENT surgeon India",
    "cochlear implant cost India",
    "gastroenterologist India",
    "ERCP cost India",
    "colonoscopy cost India",
    "surgical gastroenterologist India",
    "HPB surgeon India",
    "liver transplant cost India",
    "Whipple procedure cost India",
    "urologist India",
    "kidney transplant cost India",
    "PCNL cost India",
    "TURP cost India",
    "spine surgeon India",
    "spinal fusion cost India",
    "ACDF cost India",
    "pulmonologist India",
    "EBUS cost India",
    "bronchoscopy cost India",
    "lung transplant cost India",
    "pediatric orthopaedic surgeon India",
    "clubfoot surgery cost India",
    "DDH surgery cost India",
    "SCFE hip surgery India",
    "orthopaedic surgeon India",
    "total knee replacement cost India",
    "ACL reconstruction cost India",
    "hip replacement cost India",
    "ophthalmologist India",
    "gynecologist India",
    "laparoscopic hysterectomy cost India",
    "neurosurgeon India",
    "brain tumor surgery cost India",
    "neurologist India",
    "EEG cost India",
    "EMG cost India",
    "nephrologist India",
    "hemodialysis cost India",
    "kidney transplant cost India",
    "cataract surgery cost India",
    "LASIK cost India",
    "pediatric cardiac surgeon India",
    "TOF repair cost India",
    "ASD closure India",
    "Delhi NCR oncologist",
    "Mumbai oncologist",
    "Bengaluru oncologist",
    "Chennai oncologist",
    "Hyderabad oncologist",
];

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const messages = await localizeMessages(locale);
  const title =
    locale === "en"
      ? "Oncologists, ENT and GI in India | GAF Healthcare"
      : messages["seo.homeTitle"];
  const description =
    locale === "en" ? site.description : messages["seo.homeDescription"];
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s — ${site.name}`,
    },
    description,
    keywords: locale === "en" ? ENGLISH_KEYWORDS : undefined,
    openGraph: {
      type: "website",
      locale: LANGUAGE_OG[locale],
      siteName: site.name,
      title,
      description,
      url: locale === "en" ? SITE_URL : `${SITE_URL}/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getRequestLocale();
  const messages = await localizeMessages(locale);
  const pathname = await getRequestPath();
  const dir = localeDir(locale);
  return (
    <html
      lang={locale}
      dir={dir}
      className={`${geistSans.variable} ${cormorant.variable} h-full`}
    >
      <head>
        <LocaleFontLinks locale={locale} />
        {pathname === "/" ? (
          <style
            dangerouslySetInnerHTML={{
              __html:
                ".home-hero{min-height:100svh;background:#16324a;color:#f4f1e8}.home-hero h1{margin-top:.85rem;max-width:16ch;font-family:ui-serif,Georgia,serif;font-size:clamp(2.35rem,12vw,3.4rem);line-height:1.02;font-weight:500}",
            }}
          />
        ) : null}
      </head>
      <body className="flex min-h-full flex-col">
        <LocaleProvider
          locale={locale}
          messages={clientMessagesFor(locale, messages)}
          surfaces={availableSurfaces(locale)}
          languageOptions={languageOptions(pathname)}
        >
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <WhatsAppFloat />
          <DeferredAnalytics id={GA_MEASUREMENT_ID} />
        </LocaleProvider>
      </body>
    </html>
  );
}
