/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        midnight: '#113D66',
      },
      screens: {
        '3xl': { min: '1920px' },
        '4xl': { min: '2560px' },
      },
    },
  },
  plugins: [],
};
