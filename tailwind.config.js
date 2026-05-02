/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF7F2",
        blush: "#E8B4B8",
        sage: "#A8B5A2",
        gold: "#C9A84C",
      },
      fontFamily: {
        serif: ["'Playfair Display'", "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
