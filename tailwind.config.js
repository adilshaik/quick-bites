const aspect = require('@tailwindcss/aspect-ratio');
const form = require('@tailwindcss/forms');

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [form, aspect],
};
