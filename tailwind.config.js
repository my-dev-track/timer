/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ice-blue': '#E1F5FE',
      },
      boxShadow: {
        'neon-white': '0 0 15px 0 rgba(255, 255, 255, 1), 0 0 20px -1px rgba(255, 255, 255, 0.4)',
      }
    },
  },
  plugins: [],
}