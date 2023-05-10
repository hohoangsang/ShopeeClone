/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: '#ee4d2d'
      },
      height: {
        auth__hero: '600px'
      },
      minHeight: {
        auth_hero: '600px'
      }
    }
  },
  plugins: []
};
