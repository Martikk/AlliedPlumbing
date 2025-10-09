/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glass: "0 30px 70px -20px rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
};