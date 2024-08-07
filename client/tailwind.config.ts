import type { Config } from 'tailwindcss';
const plugin = require('tailwindcss/plugin');

const Myclass = plugin(function ({
  addUtilities,
}: {
  addUtilities: (utilities: any) => void;
}) {
  addUtilities({
    '.my-rotate-y-180': {
      transform: 'rotateY(180deg)',
    },
    '.preserve-3d': {
      transformStyle: 'preserve-3d',
    },
    '.perspective': {
      perspective: '1000px',
    },
    '.backface-hidden': {
      backfaceVisibility: 'hidden',
    },
  });
});

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '0.75rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontSize: {
        hero: '6.5rem',
        '1.5xl': ['1.375rem', '1.75rem'],
        '2.5xl': ['1.75rem', '2rem'],
        '3.5xl': ['2rem', '2.5rem'],
        '4.25xl': ['2.375rem', '2.5rem'],
        '4.5xl': ['3rem', '3.25rem'],
        '5.5xl': ['3.25rem', '3.5rem'],
        '6.25xl': ['3.875rem', '4rem'],
        '6.5xl': ['4rem', '4.25rem'],
        '7xl': ['4.5rem', '5rem'],
        '7.25xl': ['4.75rem', '5.25rem'],
        '7.5xl': ['5rem', '5.5rem'],
        '8xl': ['7rem', '7.5rem'],
        '9xl': ['8rem', '8.5rem'],
        '10xl': ['10rem', '10.5rem'],
      },
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
        '5xl': '3840px',
        '6xl': '5120px',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), Myclass],
} satisfies Config;

export default config;
