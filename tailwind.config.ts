import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pearl: '#FAFAF8',
        ivory: '#FFFFFF',
        sand: '#EDE6DE',
        taupe: '#8A7B72',
        mocha: '#2C2622',
        ink: '#14110F',
        rose: '#D4879A',
        sage: '#9DAF9B',
        gold: '#C9A227',
        error: '#B94A48',
        success: '#4E7D5A',
        blush: {
          light: '#FDF5F8',
          muted: '#FAE8EF',
          accent: '#E07A9A',
        },
        mint: {
          light: '#F2FAF9',
          muted: '#E4F4F2',
          accent: '#3D9A8B',
        },
      },
      fontFamily: {
        arabic: ['var(--font-arabic)', 'Tajawal', 'IBM Plex Sans Arabic', 'sans-serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1180px',
      },
      borderRadius: {
        card: '20px',
        'card-lg': '28px',
        pill: '999px',
      },
      boxShadow: {
        soft: '0 2px 16px 0 rgba(20,17,15,0.06)',
        card: '0 8px 32px 0 rgba(20,17,15,0.08)',
        glow: '0 20px 60px -12px rgba(20,17,15,0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.22s ease-out',
        shimmer: 'shimmer 2.5s infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
