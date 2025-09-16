import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import typographyPlugin from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Enhanced HeroUI Palette with more contrast
        primary: {
          DEFAULT: 'hsl(var(--color-primary) / <alpha-value>)',
          foreground: 'hsl(var(--color-primary-foreground) / <alpha-value>)',
          neon: 'hsl(var(--color-primary-neon) / <alpha-value>)', // Added neon variant
          50: 'hsl(var(--color-primary-50) / <alpha-value>)',
          100: 'hsl(var(--color-primary-100) / <alpha-value>)',
          200: 'hsl(var(--color-primary-200) / <alpha-value>)',
          300: 'hsl(var(--color-primary-300) / <alpha-value>)',
          400: 'hsl(var(--color-primary-400) / <alpha-value>)',
          500: 'hsl(var(--color-primary-500) / <alpha-value>)',
          600: 'hsl(var(--color-primary-600) / <alpha-value>)',
          700: 'hsl(var(--color-primary-700) / <alpha-value>)',
          800: 'hsl(var(--color-primary-800) / <alpha-value>)',
          900: 'hsl(var(--color-primary-900) / <alpha-value>)',
          950: 'hsl(var(--color-primary-950) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--color-secondary) / <alpha-value>)',
          foreground: 'hsl(var(--color-secondary-foreground) / <alpha-value>)',
          // ... add shades 50-950 if needed
        },
        accent: {
          DEFAULT: 'hsl(var(--color-accent) / <alpha-value>)',
          foreground: 'hsl(var(--color-accent-foreground) / <alpha-value>)',
          neon: 'hsl(var(--color-accent-neon) / <alpha-value>)', // Added neon variant
          // ... add shades 50-950 if needed
        },
        background: 'hsl(var(--color-background) / <alpha-value>)',
        foreground: 'hsl(var(--color-foreground) / <alpha-value>)',
        muted: {
          DEFAULT: 'hsl(var(--color-muted) / <alpha-value>)',
          foreground: 'hsl(var(--color-muted-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--color-card) / <alpha-value>)',
          foreground: 'hsl(var(--color-card-foreground) / <alpha-value>)',
        },
        border: 'hsl(var(--color-border) / <alpha-value>)',
        input: 'hsl(var(--color-input) / <alpha-value>)',
        ring: 'hsl(var(--color-ring) / <alpha-value>)',
        success: {
          DEFAULT: 'hsl(var(--color-success) / <alpha-value>)',
          foreground: 'hsl(var(--color-success-foreground) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'hsl(var(--color-warning) / <alpha-value>)',
          foreground: 'hsl(var(--color-warning-foreground) / <alpha-value>)',
        },
        danger: {
          DEFAULT: 'hsl(var(--color-danger) / <alpha-value>)',
          foreground: 'hsl(var(--color-danger-foreground) / <alpha-value>)',
        },
        // Keep existing custom colors if needed, or remove/migrate them
        // 'aw-color-primary': 'var(--aw-color-primary)', // Example: Keep or remove
        // 'aw-color-secondary': 'var(--aw-color-secondary)',
        // 'aw-color-accent': 'var(--aw-color-accent)',
        // 'aw-color-text-default': 'var(--aw-color-text-default)',
        // 'aw-color-text-muted': 'var(--aw-color-text-muted)',
      },
      backgroundColor: {
        // Keep or update custom background colors
        'tech-card': 'rgba(var(--tech-card-bg-rgb) / 0.03)', // Example update using CSS vars
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
        tech: 'blur(8px)',
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
        'tech-gradient': 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
        'tech-gradient-diagonal': 'linear-gradient(45deg, var(--color-primary), var(--color-secondary))',
        'tech-gradient-purple': 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
        'neon-glow': 'linear-gradient(90deg, var(--color-primary-neon), var(--color-accent-neon))',
      },
      borderRadius: {
        tech: '12px',
      },
      transitionProperty: {
        tech: 'transform, box-shadow, border-color, background-color',
      },
    },
  },
  plugins: [
    typographyPlugin,
    plugin(({ addUtilities, addVariant }) => {
      addVariant('intersect', '&:not([no-intersect])');
      addUtilities({
        '.tech-gradient-text': {
          background: 'linear-gradient(90deg, var(--aw-color-primary), var(--aw-color-secondary))',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
          'text-fill-color': 'transparent',
        },
        '.tech-card': {
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(8px)',
          'border-radius': '12px',
          transition: 'all 0.3s ease',
        },
        '.tech-card-hover': {
          transform: 'translateY(-5px)',
          'box-shadow': '0 10px 20px rgba(0, 0, 0, 0.1)',
        },
      });
    }),
  ],
  darkMode: 'class',
};
