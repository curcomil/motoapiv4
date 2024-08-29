/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["YourCustomFont", "Source Sans Pro"],
      },
      colors: {
        "custom-black": "#000",
        customColors: {
          light: "#FFECB3",
          DEFAULT: "#FFC107",
          darkGray: "#0d0d0d",
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [], // Aquí puedes agregar temas adicionales de DaisyUI si lo deseas
  },
};
