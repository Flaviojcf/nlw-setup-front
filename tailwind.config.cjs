/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    extend: {
      colors: {
        background: "#09090A",
      },

      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr))",
      },
    },
    screens: {
      desktop: { max: "1440px" },

      tablet: { max: "1024px" },

      md: { max: "768px" },

      mobile: { max: "425px" },
    },
  },
  plugins: [],
};
