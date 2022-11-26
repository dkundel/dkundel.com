const { shades } = require('anker-colors/dist/index');
const defaultTheme = require('tailwindcss/defaultTheme');

const disabledCss = {
  code: false,
  'pre code': false,
  'code::before': false,
  'code::after': false,
};

// tailwind.config.cjs
module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}',
  ],
  plugins: [require('@tailwindcss/typography')],
  theme: {
    fontFamily: {
      sans: 'Lato, sans-serif',
    },
    extend: {
      typography: {
        DEFAULT: { css: disabledCss },
        sm: { css: disabledCss },
        lg: { css: disabledCss },
        xl: { css: disabledCss },
        '2xl': { css: disabledCss },
      },
      colors: {
        ...shades,
        primaryPurple: 'rgb(151,60,105)',
      },
      screens: {
        xs: '515px',
        tiny: '242px',
      },
    },
  },
  // more options here
};
