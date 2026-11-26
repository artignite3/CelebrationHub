import type { Metadata } from "next";
import { Instrument_Sans, Fraunces, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteTitle, siteTagline } from "@/lib/siteConfig";
import type { Viewport } from "next";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: `${siteTitle} - ${siteTagline}`,
    template: `%s | ${siteTitle}`,
  },
  description: "A beautiful birthday celebration website featuring interactive 3D gallery, heartfelt messages, and memorable moments to make someone's special day unforgettable.",
  keywords: [
    "birthday",
    "celebration",
    "party",
    "surprise",
    "gift",
    "memories",
    "photos",
    "3D gallery",
    "interactive",
    "animation",
    "web",
    "website",
    "happy birthday",
    "birthday wishes",
    "special day",
  ],
  authors: [{ name: "Riddhesh Dalal" }],
  creator: "Riddhesh Dalal",
  publisher: "Riddhesh Dalal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: `${siteTitle} - ${siteTagline}`,
    description: "A beautiful birthday celebration website featuring interactive 3D gallery, heartfelt messages, and memorable moments to make someone's special day unforgettable.",
    url: "https://birthday.vercel.app", // Update with actual domain
    siteName: siteTitle,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${siteTitle} - Open Graph Image`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteTitle} - ${siteTagline}`,
    description: "A beautiful birthday celebration website featuring interactive 3D gallery, heartfelt messages, and memorable moments to make someone's special day unforgettable.",
    images: ["/og-image.jpg"],
    creator: "@riddhsh",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  // themeColor: "#ffffff",
  // backgroundColor: "#000000",
};

export const viewport: Viewport = {
  themeColor: "#161513",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSans.variable} ${fraunces.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
