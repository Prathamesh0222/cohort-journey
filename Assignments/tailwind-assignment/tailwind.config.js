/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cyan: {
          500: "#e1e6eb",
          200: "#f5f5f5",
        },
        blue: {
          700: "#032758",
        },
      },
    },
  },
  plugins: [],
};
