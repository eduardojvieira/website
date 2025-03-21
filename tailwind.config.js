import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import typographyPlugin from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--aw-color-primary)',
        secondary: 'var(--aw-color-secondary)',
        accent: 'var(--aw-color-accent)',
        default: 'var(--aw-color-text-default)',
        muted: 'var(--aw-color-text-muted)',
      },
      backgroundColor: {
        'tech-card': 'rgba(255, 255, 255, 0.03)',
        'tech-card-dark': 'rgba(0, 0, 0, 0.2)',
      },
      borderColor: {
        'tech-card': 'rgba(255, 255, 255, 0.1)',
        'tech-card-dark': 'rgba(255, 255, 255, 0.05)',
      },
      boxShadow: {
        'tech-glow': '0 0 15px rgba(0, 130, 255, 0.3)',
        'tech-glow-hover': '0 0 25px rgba(0, 130, 255, 0.5)',
        'tech-card-hover': '0 10px 20px rgba(0, 0, 0, 0.1)',
        'tech-card-hover-dark': '0 10px 25px rgba(0, 0, 0, 0.3)',
      },
      fontFamily: {
        sans: ['var(--aw-font-sans, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--aw-font-serif, ui-serif)', ...defaultTheme.fontFamily.serif],
        heading: ['var(--aw-font-heading, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
      },
      backdropFilter: {
        'tech': 'blur(8px)',
      },
      animation: {
        fade: 'fadeInUp 1s both',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(2rem)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 130, 255, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 130, 255, 0.4), 0 0 30px rgba(0, 200, 255, 0.2)' },
        },
      },
      backgroundImage: {
        'tech-gradient': 'linear-gradient(90deg, var(--aw-color-primary), var(--aw-color-secondary))',
        'tech-gradient-diagonal': 'linear-gradient(45deg, var(--aw-color-primary), var(--aw-color-secondary))',
        'tech-gradient-purple': 'linear-gradient(90deg, var(--aw-color-primary), var(--aw-color-accent))',
      },
      borderRadius: {
        'tech': '12px',
      },
      transitionProperty: {
        'tech': 'transform, box-shadow, border-color, background-color',
      },
    },
  },
  plugins: [
    typographyPlugin,
    plugin(({ addUtilities, addVariant }) => {
      addVariant('intersect', '&:not([no-intersect])');
      addUtilities({
        '.tech-gradient-text': {
          'background': 'linear-gradient(90deg, var(--aw-color-primary), var(--aw-color-secondary))',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
          'text-fill-color': 'transparent',
        },
        '.tech-card': {
          'background': 'rgba(255, 255, 255, 0.03)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(8px)',
          'border-radius': '12px',
          'transition': 'all 0.3s ease',
        },
        '.tech-card-hover': {
          'transform': 'translateY(-5px)',
          'box-shadow': '0 10px 20px rgba(0, 0, 0, 0.1)',
        },
      });
    }),
  ],
  darkMode: 'class',
};
