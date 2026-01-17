/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // High contrast colors for accessibility
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Main primary
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // WCAG AA compliant contrast ratios
        text: {
          primary: '#1f2937', // High contrast dark
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

