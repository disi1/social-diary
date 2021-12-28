const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}', 
    './src/components/**/*.{js,ts,jsx,tsx}'
],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      gray: colors.slate,
      white: colors.white,
      teal: {
        100: '#ccfbf1',
        200: '#99f6e4',
        300: '#5eead4',
        500: '#14b8a6',
        700: '#0f766e'
      },
      red: {
        500: '#f43f5e',
        700: '#be123c'
      },
      orange: {
        500: '#f97316',
        700: '#c2410c'
      },
      blue: {
        500: '#3b82f6',
        700: '#1d4ed8'
      }
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
