import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono, Noto_Sans, Noto_Sans_Arabic } from "next/font/google";
import { LocaleProvider } from "@/components/locale-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { localeDir } from "@/lib/i18n/languages";
import { localizeMessages } from "@/lib/i18n/localize";
import { getRequestLocale } from "@/lib/i18n/request";
import { SITE_URL } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Oncologists, ENT and GI in India | GAF Healthcare",
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
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
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title: "Oncologists, ENT and GI in India | GAF Healthcare",
    description: site.description,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Oncologists, ENT and GI in India | GAF Healthcare",
    description: site.description,
  },
  alternates: { canonical: SITE_URL },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getRequestLocale();
  const messages = await localizeMessages(locale);
  const dir = localeDir(locale);
  return (
    <html
      lang={locale}
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${notoSans.variable} ${notoArabic.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <LocaleProvider locale={locale} messages={messages}>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </LocaleProvider>
      </body>
    </html>
  );
}
