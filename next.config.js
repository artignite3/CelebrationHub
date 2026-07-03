// Next.js Configuration
const nextConfig = {
  // Optimize images
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1600, 2048],
    imageSizes: [16, 32, 48, 64, 96],
  },

  // Enable React Strict Mode for better error handling
  reactStrictMode: true,

  // Compress build output
  compress: true,

  // Generate production source maps for better debugging (optional)
  productionBrowserSourceMaps: true,

  // Turbopack configuration to suppress warnings
  turbopack: {},

  // Security headers
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)'
          }
        ]
      }
    ];
  }
};

export default nextConfig;