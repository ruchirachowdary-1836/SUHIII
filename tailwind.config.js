/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blush: { 50: '#fff7f9', 100: '#ffeef3', 200: '#ffdbe6', 300: '#ffc2d4', 400: '#ff9fbc', 500: '#f57aa0', 600: '#e0557f', 700: '#c23a63' },
        cherry: { 500: '#d6214f', 600: '#b5153f', 700: '#8f0f31' },
        cream: '#fffaf5',
        cocoa: '#5a2a3a',
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        hand: ['"Dancing Script"', 'cursive'],
        letter: ['"Parisienne"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Quicksand', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -10px rgba(224, 85, 127, 0.35)',
        polaroid: '0 12px 30px -8px rgba(90, 42, 58, 0.35)',
      },
    },
  },
  plugins: [],
}
