const defaultTheme = require('tailwindcss/defaultTheme');
const forms = require('@tailwindcss/forms');
const plugin = require('tailwindcss/plugin');

// Let's create a plugin that adds utilities!
const capitalizeFirst = plugin(({ addUtilities }) => {
  const newUtilities = {
    '.capitalize-first:first-letter': {
      textTransform: 'uppercase',
    },
  };
  addUtilities(newUtilities, ['responsive', 'hover']);
});

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'bay-of-many': {
          DEFAULT: '#235183',
          50: '#A5C4E7',
          100: '#91B7E1',
          200: '#689DD7',
          300: '#4083CC',
          400: '#2E6AAB',
          500: '#235183',
          600: '#18385B',
          700: '#0D1F33',
          800: '#03060A',
          900: '#000000',
        },
        corporate: '#235183',
        'blue-shadow': '#1c3c62',
        'fond-grey': '#dde2e6',
        'pale-blue-3': '#a7c2d6',
        'pale-blue-2': '#8ba4bf',
        grey: '#3c3c3c',
      },
      minHeight: (theme) => ({
        ...theme('spacing'),
      }),
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [forms, capitalizeFirst],
};
