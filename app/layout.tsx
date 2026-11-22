import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const generalSans = localFont({
  src: [
    {
      path: "./fonts/GeneralSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/GeneralSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "https://thelimitlessblackbook.com";
const noindex = process.env.NEXT_PUBLIC_NOINDEX === "true";

const description =
  "Fear freezes you. Comfort drains you. Status shrinks you. Break all three locks in 21 days with a protocol from neuroscientist Farhan Khawaja, PhD.";

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
  colorScheme: "light",
  themeColor: "#f4f2ec",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={generalSans.variable}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
