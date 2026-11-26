// Next.js configuration. Vercel detects Next.js on its own, so there is no vercel.json:
// headers, redirects and caching all live here, in one place.

const isDev = process.env.NODE_ENV !== "production"

// Content Security Policy: only what the site loads.
// 'unsafe-inline' scripts are needed by Next's inline bootstrap on statically rendered pages;
// 'unsafe-eval' only in dev for React refresh.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline' https://api.fontshare.com",
  "font-src 'self' https://cdn.fontshare.com",
  "img-src 'self' data: blob: https://*.public.blob.vercel-storage.com",
  "media-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ")

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {},

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1600, 2048],
    imageSizes: [16, 32, 48, 64, 96, 256, 384],
    // Guest photos live in Vercel Blob
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },

  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      // The admin screen and the API are never indexed or cached by shared caches
      { source: "/admin", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/api/(.*)", headers: [{ key: "Cache-Control", value: "no-store" }] },
      {
        source: "/data/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ]
  },

  async redirects() {
    return [{ source: "/old-birthday-page", destination: "/", permanent: true }]
  },
}

export default nextConfig
