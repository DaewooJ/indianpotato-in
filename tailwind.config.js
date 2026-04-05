/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#05420d',
        'brand-green-light': '#0a6b18',
        'brand-green-dark': '#032808',
        'brand-orange': '#ed6442',
        'brand-orange-light': '#f4845f',
        'brand-orange-dark': '#d94e2a',
      },
      fontFamily: {
        display: ['var(--font-mukta)', 'Mukta', 'sans-serif'],
        body: ['var(--font-mukta)', 'Mukta', 'sans-serif'],
        sans: ['var(--font-mukta)', 'Mukta', 'sans-serif'],
      },
      animation: {
        ticker: 'ticker 55s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
