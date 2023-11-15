/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');
module.exports = withMT({
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        '3xl': '1538px',
      },
      fontSize: {
        '2xs': '0.5rem',
      },
      colors: {
        cs_grayText: '#696969',
        cs_light: '#fff',
        // cs_dark: '#32313D',
        cs_semiDark: '#2B2B2B',
        cs_formDark: '#424242',
        cs_dark: '#1E1F23',
        cs_lightDark: '#292A2C',
        cs_semi_purple: '#BC9FEF',
        cs_semi_green: '#13C6B3',
        cs_purple: '#793FDF',
        cs_red: '#cf2a27',
        cs_blueGray: '#597eaa',
        cs_gray: '#B6B6B6',
        cs_light_gray: '#F6F2F2',
        cs_input_gray: '#EEEEEE',
        cs_label_gray: '#5B5B5B',
        cs_blur_black: '#67676A',
        cs_icon_black: '#292D32',
        cs_leaf: {
          100: '#93D7D3',
          400: '#4FA5A3',
          500: '#419994',
        },
        cs_yellow: {
          300: '#F4CF7E',
          500: '#DCA837',
        },
        cs_green: '#5FD236',
      },
      boxShadow: {
        'border-full': '0px 0px 20px 2px rgba(0,0,0,0.1)',
        'border-blur': '0px 0px 20px 2px rgba(0,0,0,0.14)',
        'border-light': '0px 0px 8px 0px rgba(0,0,0,0.11)',
        'border-btn': '-2px 4px 6px 0px rgba(0,0,0,0.1)',
        'border-inset': 'inset 0px 0px 8px 0px rgba(0,0,0,0.11)',
        'border-morphism': '.3rem .3rem .6rem #c8d0e7, -.2rem -.2rem .5rem #fff',
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
