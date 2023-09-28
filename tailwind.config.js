/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');
module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        '2xs': '0.5rem',
      },
      colors: {
        cs_light: '#fff',
        cs_dark: '#000',
        cs_semi_purple: '#BC9FEF',
        cs_purple: '#793FDF',
        cs_gray: '#B6B6B6',
        cs_blur_black: '#67676A',
        cs_icon_black: '#292D32',
      },
      boxShadow: {
        'border-full': '0px 0px 20px 2px rgba(0,0,0,0.1)',
        'border-blur': '0px 0px 20px 2px rgba(0,0,0,0.14)',
        'border-light': '0px 0px 6px 0px rgba(0,0,0,0.1)',
        'border-btn': '-2px 4px 6px 0px rgba(0,0,0,0.1)',
      },
      dropShadow: {
        'box-course': '0px 0px 4px rgba(0, 0, 0, 0.25)',
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
});
