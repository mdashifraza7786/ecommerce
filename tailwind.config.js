/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2874f0",
          dark: "#1e61d9",
          light: "#4285f4"
        },
        secondary: {
          DEFAULT: "#fb641b",
          dark: "#e85d19",
          light: "#ff7a39"
        },
        accent: {
          DEFAULT: "#ff9f00",
          dark: "#e58e00",
          light: "#ffb52e"
        },
        dark: "#212121",
        light: "#f1f3f6",
        amazon: {
          DEFAULT: "#131921",
          light: "#232f3e",
          yellow: "#febd69",
          orange: "#ff9900"
        }
      },
    },
  },
  plugins: [],
}

