/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        vardha: {
          black: "#0b0b0a",
          gold: "#c7a66a",
          cream: "#f3efe7",
          line: "rgba(199,166,106,.25)"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Cormorant Garamond", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};