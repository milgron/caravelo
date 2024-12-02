/** @type {import('tailwindcss').Config} */
export default {
  plugins: [require('tailwindcss-primeui')],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'caravelo-blue': '#029DFF',
      },
    },
  }
}

