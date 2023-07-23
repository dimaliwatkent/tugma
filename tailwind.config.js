const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  darkMode: "class", // class, 'media' or boolean
  theme: {
    extend: {
      colors: {
        color1: "#1a242d",
        color2: "#f4ac48",
        color3: "#d09044",
        color4: "#7e5522",
      },
      spacing: {
        88: "22rem",
      },
    },
  },
  plugins: [],
};
