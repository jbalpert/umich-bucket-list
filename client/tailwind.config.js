/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navbarBG: "#061829",
        accentnavbarBG: "#0A2B4B",
        appBG: "#00274C", // University of Michigan Blue
        umMaize: "#FFCB05",
        secondary: "#2d3748",
        accent: "#ed8936",
        muted: "#e2e8f0",
        modalBG: "rgba(0, 0, 0, 0.65)",
        success: "#9ae6b4",
        error: "#f56565",
      },
      // text size
      fontSize: {
        "2xs": ".625rem",
        "3xs": ".5rem",
      },
    },
  },
  plugins: [],
};
