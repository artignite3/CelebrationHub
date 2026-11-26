import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { siteTitle, siteTagline } from "@/lib/siteConfig";
import type { Viewport } from "next";

// Self-hosted at build time: no request to Google from the visitor's browser
// Variable weight, so dark mode can set text at 350 (light text on dark reads heavier)
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    url: "/",
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
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ede7de" },
    { media: "(prefers-color-scheme: dark)", color: "#1b1713" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={hanken.variable} suppressHydrationWarning>
      <head>
        {/* Sets the saved mode before first paint, so the page never flashes the wrong colours */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var m=localStorage.getItem("mode");if(m==="light"||m==="dark")document.documentElement.dataset.mode=m}catch(e){}`,
          }}
        />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link href="https://api.fontshare.com/v2/css?f[]=sentient@300,400&display=swap" rel="stylesheet" />
      </head>
      <body className="paper">{children}</body>
    </html>
  );
}
