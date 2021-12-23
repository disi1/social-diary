const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}', 
    './src/components/**/*.{js,ts,jsx,tsx}'
],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      gray: colors.slate,
      'white': colors.white,
      'teal': {
        200: '#99f6e4',
        500: '#14b8a6'
      }
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
