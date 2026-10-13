/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        vardha: {
          black: "#0b0c0c",
          dark: "#101110",
          surface: "#151715",
          surface2: "#1c1f1c",
          gold: "#c7a15c",
          goldLight: "#dfbb78",
          goldMuted: "rgba(199, 161, 92, 0.15)",
          cream: "#f2eee7",
          line: "rgba(255, 255, 255, 0.1)",
          lineGold: "rgba(199, 161, 92, 0.35)",
        },
      },
      fontFamily: {
        sans: ["Manrope", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        serif: ["Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        mono: ["DM Mono", "ui-monospace", "monospace"],
      },
      maxWidth: {
        "screen-2xl": "1600px",
      },
    },
  },
  plugins: [],
};