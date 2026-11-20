import type { Metadata, Viewport } from "next";
import { Young_Serif, Geist } from "next/font/google";
import "./globals.css";

const youngSerif = Young_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  adjustFontFallback: true,
});

const geistSans = Geist({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  adjustFontFallback: true,
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "https://thelimitlessblackbook.com";
const noindex = process.env.NEXT_PUBLIC_NOINDEX === "true";

const description =
  "It’s not your personality. It’s three locks in your brain. A 21-day protocol for fear, comfort and status, by neuroscientist Farhan Khawaja, PhD.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Limitless Black Book by Farhan Khawaja, PhD",
    template: "%s | The Limitless Black Book",
  },
  description,
  authors: [{ name: "Farhan Khawaja, PhD" }],
  creator: "Farhan Khawaja, PhD",
  category: "Education",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "The Limitless Black Book",
    title: "The Limitless Black Book by Farhan Khawaja, PhD",
    description,
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Limitless Black Book by Farhan Khawaja, PhD.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Limitless Black Book by Farhan Khawaja, PhD",
    description,
    images: ["/opengraph-image.jpg"],
  },
  robots: noindex
    ? { index: false, follow: false }
    : { index: true, follow: true },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#08182F",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${youngSerif.variable} ${geistSans.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
