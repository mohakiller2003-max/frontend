import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
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
};

export default withNextIntl(nextConfig);
