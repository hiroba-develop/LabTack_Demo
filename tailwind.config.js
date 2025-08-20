/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans JP"', "sans-serif"],
      },
      colors: {
        primary: "#2C3E50",
        accent: "#E67E22",
        sub1: "#ECF0F1",
        sub2: "#27AE60",
        background: "#FFFFFF",
        text: "#333333",
        border: "#E0E0E0",
        success: "#27AE60",
        warning: "#E67E22",
        info: "#2196F3",
        error: "#D32F2F",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
