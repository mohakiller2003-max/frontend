import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pearl: '#F8F3EC',
        ivory: '#FFFDF8',
        sand: '#E7D6C4',
        taupe: '#B79F8A',
        mocha: '#3C302A',
        rose: '#C89A8C',
        sage: '#9DAF9B',
        gold: '#B8945E',
        error: '#B94A48',
        success: '#4E7D5A',
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
        soft: '0 2px 16px 0 rgba(60,48,42,0.07)',
        card: '0 4px 24px 0 rgba(60,48,42,0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.22s ease-out',
        'slide-in-right': 'slideInRight 0.22s ease-out',
        'slide-in-left': 'slideInLeft 0.22s ease-out',
        blob: 'blob 7s infinite',
        shimmer: 'shimmer 2.5s infinite',
        'bounce-slow': 'bounce-slow 3s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { from: { opacity: '0', transform: 'translateX(32px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        slideInLeft: { from: { opacity: '0', transform: 'translateX(-32px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
