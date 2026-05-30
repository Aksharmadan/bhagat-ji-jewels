import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { PageLoader } from "@/components/bhagat/PageLoader";
import { ScrollProgress } from "@/components/bhagat/ScrollProgress";
import { Header } from "@/components/bhagat/Header";
import { Footer } from "@/components/bhagat/Footer";
import { ClientShell } from "@/components/bhagat/ClientShell";
import { BRAND } from "@/lib/constants";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bhagatjijewels.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BRAND.name} | Premium Heritage Jewellers Since 1960`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "BHAGAT JI JEWELS — India's trusted heritage jewellers since 1960. Explore BIS hallmarked gold, diamonds, platinum, bridal sets & silver. Digital gold, virtual try-on & concierge service.",
  keywords: [
    "Bhagat Ji Jewels",
    "luxury jewelry India",
    "gold jewelry Chandausi",
    "bridal jewelry UP",
    "BIS hallmark gold",
    "diamond jewelry online",
    "platinum rings India",
    "digital gold India",
    "virtual jewelry try on",
    "gold rate today",
    "heritage jewellers",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: BRAND.name,
    title: `${BRAND.name} | Premium Heritage Jewellers Since 1960`,
    description: BRAND.tagline,
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: BRAND.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND.name,
    description: BRAND.tagline,
  },
  robots: { index: true, follow: true },
};

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { WishlistProvider } from "@/components/providers/WishlistProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${playfair.variable} ${dmSans.variable}`}
    >
      <body className="grain font-sans antialiased">
        <ThemeProvider>
          <WishlistProvider>
            <SmoothScroll>
              <PageLoader />
              <ScrollProgress />
              <Header />
              <ClientShell>
                <main className="pb-16 md:pb-0">{children}</main>
              </ClientShell>
              <Footer />
            </SmoothScroll>
          </WishlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
