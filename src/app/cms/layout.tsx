import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Velora CMS",
  robots: { index: false, follow: false },
};

export default function CmsRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
