const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      screens: {
        "2xl": "1640px",
      },
      height: {
        controls: "calc(100vh - 5rem)",
        header: "calc(100vh - 4rem)",
      },
    },
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
  },
  variants: {},
  plugins: [require("tailwind-scrollbar-hide")],
};
