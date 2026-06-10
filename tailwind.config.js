import plugin from 'tailwindcss/plugin';

const SILVER_GRADIENT =
  'radial-gradient(ellipse at 50% 35%, #d8d8d8 0%, #c8c8c8 35%, #b0b0b0 65%, #909090 100%)';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,css}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'system-ui', 'sans-serif'],
      },
      colors: {
        shine: {
          bg: 'transparent',
          surface: '#ffffff',
          text: '#1a1a1a',
        },
        brand: {
          DEFAULT: '#1a6b3a',
          hover: '#155a31',
        },
      },
      backgroundImage: {
        silver: SILVER_GRADIENT,
        gloss: SILVER_GRADIENT,
      },
      boxShadow: {
        card: '0 4px 24px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.14)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'summary-in': 'summaryIn 0.25s ease-out',
        'step-in-forward': 'stepInForward 0.4s ease-out forwards',
        'step-in-back': 'stepInBack 0.4s ease-out forwards',
        'step-fade-out': 'stepFadeOut 0.2s ease-in forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        summaryIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        stepInForward: {
          '0%': { opacity: '0', transform: 'translateX(48px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        stepInBack: {
          '0%': { opacity: '0', transform: 'translateX(-48px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        stepFadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [
    plugin(({ addBase, addComponents, addUtilities }) => {
      addBase({
        html: { scrollBehavior: 'smooth' },
        body: {
          background: SILVER_GRADIENT,
          backgroundAttachment: 'fixed',
          color: '#1a1a1a',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
      });

      addComponents({
        '.btn-primary': {
          '@apply inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#1a6b3a] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition duration-200 hover:bg-[#155a31] hover:shadow-black/15 active:scale-[0.98]':
            {},
        },
        '.btn-primary-hero': {
          '@apply min-h-[44px] px-10 py-[18px] text-base font-bold sm:px-12 sm:py-5 sm:text-xl':
            {},
        },
        '.section-eyebrow': {
          '@apply text-sm font-semibold uppercase tracking-widest text-brand': {},
        },
        '.section-heading': {
          '@apply font-display text-2xl font-extrabold tracking-tight text-shine-text sm:text-3xl md:text-4xl lg:text-5xl':
            {},
        },
        '.section-body': {
          '@apply text-base font-normal leading-relaxed text-[#5c5c5c] sm:text-lg': {},
        },
        '.btn-secondary': {
          '@apply inline-flex min-h-[44px] items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-shine-text shadow-md transition duration-200 hover:bg-white/90 active:scale-[0.98]':
            {},
        },
        '.input': {
          '@apply w-full rounded-xl bg-white px-4 py-3 text-sm text-shine-text shadow-sm outline-none transition placeholder:text-shine-text/50':
            {},
        },
      });

      addUtilities({
        '.text-gradient': {
          '@apply bg-gradient-to-r from-shine-text via-shine-text/80 to-shine-text/60 bg-clip-text text-transparent':
            {},
        },
        '.reveal': {
          '@apply translate-y-6 opacity-0 transition-all duration-700 ease-out': {},
        },
        '.reveal-visible': {
          '@apply translate-y-0 opacity-100': {},
        },
        '.glass-panel': {
          '@apply rounded-3xl bg-white/80 shadow-card backdrop-blur-2xl': {},
        },
        '.summary-panel': {
          '@apply rounded-xl bg-white p-5 shadow-md': {},
        },
        '.book-cta': {
          '@apply rounded-lg bg-[#1a6b3a] py-3.5 text-sm font-semibold text-white transition duration-200 hover:bg-[#155a31] active:scale-[0.98]':
            {},
        },
        '.book-cta-compact': {
          '@apply flex items-center gap-2 px-5 py-3': {},
        },
        '.summary-item': {
          animation: 'summaryIn 0.25s ease-out',
        },
        '.bg-gloss': {
          background: SILVER_GRADIENT,
        },
        '.bg-silver': {
          background: SILVER_GRADIENT,
        },
      });
    }),
  ],
};
