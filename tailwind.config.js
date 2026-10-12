export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#eef5f1',
          100: '#d7e8de',
          200: '#b0d1bf',
          300: '#8fd0aa',
          500: '#2f7a5a',
          600: '#22664a',
          700: '#1b573f',
          800: '#174a37',
          900: '#123b2c',
          950: '#0c2a1f',
        },
        canvas: '#f6f5f0',
        surface: '#fcfbf8',
        line: '#e4e2d9',
        ink: {
          DEFAULT: '#1c2420',
          muted: '#5b6560',
          faint: '#8a928d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
    },
  },
};
