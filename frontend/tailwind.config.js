/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#EDF2FB",
        alice: "#EDF2FB",
        lavender: {
          100: "#EDF2FB",
          200: "#E2EAFC",
          300: "#D7E3FC"
        },
        periwinkle: {
          100: "#CCDBFD",
          200: "#C1D3FE",
          300: "#B6CCFE"
        },
        babyblue: "#ABC4FF",
        indigo: "#22223B",
        navy: {
          50: "#EDF2FB",
          100: "#E2EAFC",
          700: "#22223B",
          800: "#B6CCFE",
          900: "#22223B"
        }
      }
    },
  },
  plugins: [],
}
