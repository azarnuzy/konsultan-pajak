/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/public/images/header.png')",
      },
      colors: {
        darkBlue: '#005ACD',
        lighBlue: '#BEF0FF',
        'light-dark': '#222',
        'light-gray': '#EFEFEF',
        'light-blue-2': '#F5FFFF',
        'light-yellow': '#FB7B05',
        'light-green': '#34A853',
        'light-blue-3': '#3C4B64',
        'light-gray-2': '#EDEEF1',
      },
      minHeight: {
        'half-screen': '50vh',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
}
