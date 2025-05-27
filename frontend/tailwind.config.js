/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fittrack-blue': {
          DEFAULT: '#1976D2', // MUI primary.main
          light: '#4791DB',   // MUI primary.light
          dark: '#115293',    // MUI primary.dark
        },
        'fittrack-gray': {
          50: '#fafafa',
          100: '#f7fafc', // default bg
          200: '#edf2f7', // border
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096', // secondary text
          700: '#4a5568',
          800: '#2d3748', // appbar text
          900: '#1a202c', // primary text
        },
        'fittrack-success': '#4caf50', // Green for success elements
        'fittrack-warning': '#ff9800', // Orange for warning elements
        'fittrack-error': '#f44336',   // Red for error elements
      },
      fontFamily: {
        sans: ['Public Sans', 'sans-serif'],
      },
      borderRadius: {
        'xl': '0.75rem', // 12px
      },
      spacing: {
        '65': '16.25rem', // 260px (drawerWidth)
      }
    },
  },
  plugins: [],
}