/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFFDF5',
        'pastel-rose': '#F4D6D6',
        'pastel-lavender': '#E8D5E8',
        'pastel-mint': '#D4E8E0',
        'pastel-peach': '#F5D9C3',
        'pastel-sage': '#D9E8D5',
      },
      fontFamily: {
        serif: ['EB Garamond', 'Georgia', 'serif'],
        garamond: ['EB Garamond', 'Georgia', 'serif'],
        italiana: ['Italiana', 'EB Garamond', 'serif'],
        crimson: ['Crimson Text', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
