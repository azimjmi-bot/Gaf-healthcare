import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
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

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Oncologists, cosmetic and ENT surgeons in India | Velora",
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
    title: "Oncologists, cosmetic and ENT surgeons in India | Velora",
    description: site.description,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Oncologists and ENT surgeons in India | Velora",
    description: site.description,
  },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
