import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://colorhunt-clone.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ColorHunt — Beautiful Color Palettes for Designers",
    template: "%s | ColorHunt",
  },
  description:
    "Discover, create, and share beautiful color palettes. Browse thousands of hand-picked color schemes for your next design project.",
  keywords: [
    "color palettes",
    "color schemes",
    "color combinations",
    "design inspiration",
    "hex colors",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "ColorHunt",
    title: "ColorHunt — Beautiful Color Palettes for Designers",
    description:
      "Discover, create, and share beautiful color palettes for your next design project.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ColorHunt — Beautiful Color Palettes for Designers",
    description:
      "Discover, create, and share beautiful color palettes for your next design project.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-0000000000000000"}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="flex min-h-full flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
