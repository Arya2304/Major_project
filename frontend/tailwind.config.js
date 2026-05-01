/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Brand Colors — Deep Indigo
        primary: {
          50: '#EEEDFE',
          100: '#D4D2FB',
          200: '#AFA9EC',
          300: '#8A7FDD',
          400: '#6B63CE',
          500: '#4F46E5', // MAIN PRIMARY (replaces old #009bde)
          600: '#3730A3',
          700: '#2D2585',
          800: '#221B67',
          900: '#171249',
        },

        // Accent — Saffron Orange (India, energy, CTA)
        accent: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316', // MAIN ACCENT (all CTA buttons)
          600: '#EA6C10',
          700: '#C2570C',
          800: '#9A3E09',
          900: '#7C2D07',
        },

        // Language-Specific Color Tokens
        // ISL — Indian Sign Language (Saffron/Indigo — Indian tricolor inspired)
        isl: {
          50: '#FFF7ED',
          bg: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          badge: '#F97316',
          border: '#FB923C',
          600: '#EA6C10',
          700: '#C2570C',
          800: '#9A3E09',
          text: '#9A3E09',
          900: '#7C2D07',
          dark: '#7C2D07',
        },

        // ASL — American Sign Language (Blue/Navy — American inspired)
        asl: {
          50: '#EFF6FF',
          bg: '#EFF6FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#2563EB',
          badge: '#2563EB',
          border: '#3B82F6',
          600: '#1D4ED8',
          700: '#1E40AF',
          text: '#1E40AF',
          800: '#1E3A8A',
          900: '#0C2340',
          dark: '#1E3A8A',
        },

        // BSL — British Sign Language (Red/Crimson — British inspired)
        bsl: {
          50: '#FFF1F2',
          bg: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          300: '#FDA29B',
          400: '#F87171',
          500: '#DC2626',
          badge: '#DC2626',
          border: '#F87171',
          600: '#E5212D',
          700: '#C2070C',
          text: '#991B1B',
          800: '#7F1D1D',
          900: '#4C0519',
          dark: '#7F1D1D',
        },

        // Semantic Colors
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBFAE3',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },

        warning: {
          50: '#FEFCE8',
          100: '#FEF9C3',
          200: '#FEF08A',
          300: '#FDE047',
          400: '#FACC15',
          500: '#EAB308',
          600: '#CA8A04',
          700: '#A16207',
          800: '#854D0E',
          900: '#713F12',
        },

        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },

        // Neutrals
        gray: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },

        // Dark Backgrounds (for video pages, lesson player)
        'dark-bg': '#0F172A',
        'dark-card': '#1E293B',
        'dark-panel': '#162032',
        'dark-border': '#2D3F55',

        // Text and Background Semantic (keep for existing JSX compatibility)
        text: {
          primary: '#1E293B',
          secondary: '#475569',
          light: '#94A3B8',
          inverse: '#F8FAFC',
        },

        bg: {
          primary: '#FFFFFF',
          secondary: '#F8FAFC',
          accent: '#F1F5F9',
          dark: '#0F172A',
        },

        // Legacy dark color key (keep for backward compatibility)
        dark: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#1E293B',
          600: '#0F172A',
          700: '#0A1120',
          800: '#060B14',
          900: '#020408',
        },
      },

      fontSize: {
        xs: ['12px', { lineHeight: '1.5' }],
        sm: ['14px', { lineHeight: '1.5' }],
        base: ['16px', { lineHeight: '1.75' }],
        md: ['18px', { lineHeight: '1.75' }],
        lg: ['20px', { lineHeight: '1.75' }],
        xl: ['24px', { lineHeight: '1.5' }],
        '2xl': ['30px', { lineHeight: '1.4' }],
        '3xl': ['36px', { lineHeight: '1.3' }],
        '4xl': ['48px', { lineHeight: '1.2' }],
        '5xl': ['60px', { lineHeight: '1.1' }],
        '6xl': ['72px', { lineHeight: '1.0' }],
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        jssans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },

      borderRadius: {
        sm: '6px',
        DEFAULT: '8px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '32px',
        full: '9999px',
      },

      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
        md: '0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)',
        lg: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
        xl: '0 20px 25px rgba(0,0,0,0.1), 0 8px 10px rgba(0,0,0,0.04)',
        'focus': '0 0 0 3px rgba(79,70,229,0.4)',
        'focus-accent': '0 0 0 3px rgba(249,115,22,0.4)',
      },

      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #4F46E5 0%, #F97316 100%)',
        'isl-gradient': 'linear-gradient(135deg, #4F46E5 0%, #F97316 60%)',
        'asl-gradient': 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
        'bsl-gradient': 'linear-gradient(135deg, #991B1B 0%, #DC2626 100%)',
        'dark-gradient': 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
      },

      spacing: {
        touch: '44px',
        'touch-lg': '56px',
      },
    },
  },
  plugins: [],
}

