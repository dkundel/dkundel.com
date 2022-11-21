const { shades } = require('anker-colors/dist/index');
const defaultTheme = require('tailwindcss/defaultTheme');

// tailwind.config.cjs
module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}',
  ],
  theme: {
    fontFamily: {
      sans: 'Lato, sans-serif',
    },
    extend: {
      colors: {
        ...shades,
      },
      screens: {
        xs: '515px',
        tiny: '242px',
      },
    },
  },
  // more options here
};
