/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          cyan: '#00d4ff',
          blue: '#5865ff',
          indigo: '#4d5dff',
        },
        dark: {
          DEFAULT: '#0a0a0a',
          secondary: '#1a1a1a',
          tertiary: '#0f0f0f',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
