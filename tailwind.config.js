/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        silver: '#C0C0C0',
        tomato: '#FF6347',
        'overlay-bg': 'rgba(0, 0, 0, .3)', 
      },
      gridTemplateColumns: {
        'auto-fit-minmax' : 'repeat(auto-fit, minmax(300px, 1fr))',
      },
      boxShadow: {
        'light-shadow' : '2px 2px 10px 2px rgba(0, 0, 0, 0.3)',
        'dark-shadow' : '2px 2px 10px 2px rgba(0, 0, 0, 0.6)',
      },
      screens: {
        'max-xl' : { 'max': '1050px' },
        'max-lg' : { 'max': '900px' },
        'max-md' : { 'max': '640px' },
        'max-sm' : { 'max': '550px' },
      }
    },
  },
  plugins: [],
}

