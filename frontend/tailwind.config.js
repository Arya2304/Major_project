/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design System Colors
        primary: {
          50: '#e6f5ff',
          100: '#b3e0ff',
          200: '#80cbff',
          300: '#4db6ff',
          400: '#1aa1ff',
          500: '#009bde', // Main primary
          600: '#0088c7',
          700: '#0075b0',
          800: '#006299',
          900: '#004f82',
        },
        dark: {
          50: '#e6f0ff',
          100: '#b3d1ff',
          200: '#80b2ff',
          300: '#4d93ff',
          400: '#4d6b99',
          500: '#002f87', // Dark/headings
          600: '#002577',
          700: '#001d67',
          800: '#001557',
          900: '#000d47',
        },
        accent: {
          500: '#640487', // Secondary accent
        },
        error: {
          100: '#fde6ec',
          500: '#de0064',
          600: '#c5005a',
          900: '#6b092d',
        },
        warning: {
          100: '#fff5e6',
          500: '#ff9500',
          600: '#e68600',
          900: '#994c00',
        },
        success: {
          100: '#e6f9f5',
          500: '#00cf91',
          600: '#00b87a',
          900: '#006644',
        },
        // WCAG AA compliant contrast ratios
        text: {
          primary: '#002f87', // Changed to dark from design system
          secondary: '#4b5563',
          light: '#6b7280',
        },
        // Accessible background colors
        bg: {
          primary: '#ffffff',
          secondary: '#f9fafb',
          accent: '#f3f4f6',
        },
      },
      fontSize: {
        // Larger base font for readability
        'base': ['18px', { lineHeight: '1.75' }],
        'lg': ['20px', { lineHeight: '1.75' }],
        'xl': ['24px', { lineHeight: '1.5' }],
        '2xl': ['30px', { lineHeight: '1.4' }],
        '3xl': ['36px', { lineHeight: '1.3' }],
        '4xl': ['48px', { lineHeight: '1.2' }],
      },
      spacing: {
        // Larger touch targets (minimum 44x44px)
        'touch': '44px',
        'touch-lg': '56px',
      },
      borderRadius: {
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'focus': '0 0 0 4px rgba(59, 130, 246, 0.3)',
        'focus-ring': '0 0 0 3px rgba(59, 130, 246, 0.5)',
      },
    },
  },
  plugins: [],
}

