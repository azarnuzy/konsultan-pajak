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
        hero: "url('/images/header2.png')",
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
      keyframes: {
        hide: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        slideIn: {
          from: {
            transform: 'translateX(calc(100% + var(--viewport-padding)))',
          },
          to: { transform: 'translateX(0)' },
        },
        swipeOut: {
          from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
        },
      },
      animation: {
        hide: 'hide 100ms ease-in',
        slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        swipeOut: 'swipeOut 100ms ease-out',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
}
