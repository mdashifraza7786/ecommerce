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
          DEFAULT: "#ff4500",
          dark: "#cc3700",
          light: "#ff6a33"
        },
        secondary: {
          DEFAULT: "#38b2ac",
          dark: "#2c908a",
          light: "#4fd1c5"
        },
        accent: {
          DEFAULT: "#805ad5",
          dark: "#6b46c1",
          light: "#9f7aea"
        },
        dark: "#1a202c",
        light: "#f7fafc"
      },
    },
  },
  plugins: [],
}

