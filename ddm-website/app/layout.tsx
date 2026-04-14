import type { Metadata } from "next";
import { Newsreader, Manrope } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/interactive/SmoothScroll";
import CustomCursor from "@/components/interactive/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-headline",
  style: ["normal", "italic"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Dream Drive Motors",
    default: "Dream Drive Motors | Curated Automotive Excellence",
  },
  description:
    "Premium pre-owned luxury vehicles. Bespoke leasing, financing, and concierge services in Baldwin Park, CA.",
  openGraph: {
    type: "website",
    siteName: "Dream Drive Motors",
    title: "Dream Drive Motors | Curated Automotive Excellence",
    description:
      "Premium pre-owned luxury vehicles. Bespoke leasing, financing, and concierge services in Baldwin Park, CA.",
    url: "https://dreamdrivemotors.com",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "Dream Drive Motors",
  address: {
    "@type": "PostalAddress",
    streetAddress: "15132 Arrow Hwy",
    addressLocality: "Baldwin Park",
    addressRegion: "CA",
  },
  telephone: "626-257-4368",
  email: "dreamdrivemotors1@gmail.com",
  url: "https://dreamdrivemotors.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${manrope.variable}`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body className="bg-background text-on-surface font-body antialiased overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-on-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold"
        >
          Skip to main content
        </a>
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScroll>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
