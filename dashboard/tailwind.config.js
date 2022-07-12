/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "raisin-black": "#202125",
        "neon-blue": "#5168F4",
        jet: "#2C2D31",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
