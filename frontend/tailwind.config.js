module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layout/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          primary: "#54a0ef",
          secondary: "#2c8df5",
          pale: "#eff6ff"
        },
        gray: {
          primary: "#8a8e91",
          light: "#b9bbbd",
          pale: "#e8ebed"
        },
        red: {
          primary: "#cf4a5a"
        }
      }
    }
  },
  plugins: []
};
