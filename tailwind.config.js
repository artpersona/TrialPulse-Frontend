/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#035EAA",
          light: "#52ABF6",
          dark: "#005194",
        },
        secondary: {
          DEFAULT: "#FDA92A",
          dark: "#faa320",
        },
        green: "#00BD4F",
        gray: {
          DEFAULT: "#93A0AF",
          cancel: "#EEEEEE",
          light: "#EDEDED",
          dark: "#6B6B6B",
          background: "#F3F3F3",
          disabled: "#E5E5E5",
        },
      },
    },
  },
  plugins: [],
};
