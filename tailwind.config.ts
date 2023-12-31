import type { Config } from "tailwindcss";
const konstaConfig = require("konsta/config");

const config: Config = konstaConfig({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  variants: {
    extend: {},
  },
  konsta: {
    colors: {
      // "primary" is the main app color, if not specified will be default to '#007aff'
      primary: "#ff1b63",
    },
  },
  plugins: [],
});

export default config;
