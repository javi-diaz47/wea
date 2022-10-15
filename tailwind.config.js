/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3A7AE0',
        'color-title': '#111827',
        'color-text': '#1F2937',
        'color-text-2': '#3F3F46',
        love: '#EB6F92',
        gold: '#F6C177',
        background: '#F3F4F6',
        'tag-bg': '#F4F4F5',
        primary: '#3A7AE0',
        separator: '#D9D9D9',
      },
    },
  },
  plugins: [],
};
