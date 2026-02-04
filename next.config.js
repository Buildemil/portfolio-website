/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Removed 'output: export' to enable Next.js Image Optimization API
  // ✅ Vercel hosting supports full Next.js features (ISR, Server Components, etc.)

  images: {
    formats: ['image/avif', 'image/webp'], // Modern image formats with automatic fallback
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compiler Optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  trailingSlash: true,
}

module.exports = nextConfig
