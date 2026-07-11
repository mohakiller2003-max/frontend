import type { Config } from 'tailwindcss';

/**
 * Live store palette remap (same token names → new brand colors)
 *
 * Primary Background   #FFFFFF  (White 85%)
 * Secondary Background #FAF8F4  (Warm Ivory 10%)
 * Cards                #FFFFFF
 * Headings             #222222
 * Body Text            #555555
 * Borders              #E8E3DC
 * Primary Button       #1F4D45  (Emerald 4%)
 * Button Hover         #163B35
 * Button Text          #FFFFFF
 * Accent               #C8A96A  (Gold 1%)
 * Success / Trust      #6B8E7A
 */
const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pearl: '#FAF8F4', // Secondary / Warm Ivory
        ivory: '#FFFFFF', // Primary background + card / button text
        sand: '#E8E3DC', // Borders
        taupe: '#555555', // Body text
        mocha: '#1F4D45', // Primary button / brand emerald
        ink: '#222222', // Headings
        rose: '#1F4D45', // Brand accents
        sage: '#6B8E7A',
        gold: '#C8A96A', // Accent gold
        error: '#B94A48',
        success: '#6B8E7A', // Success / Trust
        emerald: {
          DEFAULT: '#1F4D45',
          deep: '#163B35', // Button hover
        },
        blush: {
          light: '#F5F3EE',
          muted: '#EAE6DF',
          accent: '#1F4D45',
        },
        mint: {
          light: '#F0F5F3',
          muted: '#E2EBE8',
          accent: '#1F4D45',
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
        soft: '0 2px 16px 0 rgba(34,34,34,0.05)',
        card: '0 8px 28px 0 rgba(34,34,34,0.07)',
        glow: '0 20px 60px -12px rgba(31,77,69,0.12)',
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
