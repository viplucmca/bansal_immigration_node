import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnalyticsListener from "@/components/analytics/AnalyticsListener";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import CookieConsent from "@/components/layout/CookieConsent";
import StickyMobileBar from "@/components/home/StickyMobileBar";
import { TurnstileSiteKeyProvider } from "@/components/forms/TurnstileSiteKey";
import { getTurnstileSiteKey } from "@/lib/turnstile";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bansalimmigration.com.au"),
  title: {
    default:
      "Registered Migration Agents Melbourne & Adelaide | Bansal Immigration",
    template: "%s | Bansal Immigration",
  },
  description:
    "OMARA-registered migration agents in Melbourne and Adelaide for skilled, partner, student and employer-sponsored visas.",
  icons: {
    icon: "/img/logo/favicon.webp",
    apple: "/img/logo/favicon.png",
  },
  robots: isProduction
    ? { index: true, follow: true }
    : {
        index: false,
        follow: false,
        nocache: true,
        noarchive: true,
        nosnippet: true,
        noimageindex: true,
      },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-AU"
      className={`${inter.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col font-sans antialiased text-gray-900 bg-white pb-16 lg:pb-0"
        suppressHydrationWarning
      >
        <TurnstileSiteKeyProvider siteKey={getTurnstileSiteKey()}>
          <GoogleAnalytics />
          <AnalyticsListener />
          <CookieConsent />
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <StickyMobileBar />
        </TurnstileSiteKeyProvider>
      </body>
    </html>
  );
}