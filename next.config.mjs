import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  async rewrites() {
    const backend =
      process.env.BACKEND_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      'https://api.skinouva.shop';
    return [
      {
        source: '/api/backend/:path*',
        destination: `${backend.replace(/\/$/, '')}/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      { source: '/favicon.ico', destination: '/icon-cropped.png', permanent: false },
      { source: '/ar/admin', destination: '/admin', permanent: false },
      { source: '/ar/admin/:path*', destination: '/admin/:path*', permanent: false },
      { source: '/en/admin', destination: '/admin', permanent: false },
      { source: '/en/admin/:path*', destination: '/admin/:path*', permanent: false },
    ];
  },
};

export default withNextIntl(nextConfig);
