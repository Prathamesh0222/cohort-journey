/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          500: "#00285a",
          700: "#153c69",
        },
        gray: {
          500: "#7d91aa",
          200: "#5b7492",
        },
      },
    },
  },
  plugins: [],
};
