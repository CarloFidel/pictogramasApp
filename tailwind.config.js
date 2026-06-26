/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./modules/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./camara/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1475DE",
          50: "#E6F2FF",
          100: "#B3D9FF",
          200: "#80BFFF",
          300: "#4DA6FF",
          400: "#1A8CFF",
          500: "#1475DE",
          600: "#0F5CB3",
          700: "#0A4290",
          800: "#052967",
          900: "#021433",
        },
        lightBlue: "#7CCEFF",
        darkBlue: "#0A4290",
        alertColor: "#FF3C3C",
        backGroundLight: "#F5F5F5",
        textColor: "#333333",
        gray04: "#F5F5F5",
        gray16: "#CECECE",
        gray55: "#737373",
      },
      fontFamily: {
        "hank-light": ["Hanken Grotesk Light", "sans-serif"],
        "hank-bold": ["Hanken Grotesk Bold", "sans-serif"],
        "hank-medium": ["Hanken Grotesk Medium", "sans-serif"],
        "hank-regular": ["Hanken Grotesk Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
