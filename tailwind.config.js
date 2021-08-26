module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    screen: {
      lg: "1124px",
      xl: "1124px",
      "2xl": "1124px",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
