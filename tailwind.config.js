/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#517664",
        secondary: "#9FD8CB",
        tertiary: "#CACFD6",
        highlight: "#FF3A20",
      },
    },
  },
  plugins: [],
};
