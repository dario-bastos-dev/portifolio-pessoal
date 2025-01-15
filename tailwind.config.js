/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,js}"];
export const theme = {
  extend: {
    colors: {
      primary: "#1a73e8",
      secondary: "#404040",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    animation: {
      "fade-in": "fadeIn 1s ease-out",
      "slide-in": "slideIn 0.5s ease-out",
      "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      },
      slideIn: {
        "0%": { transform: "translateY(100%)", opacity: "0" },
        "100%": { transform: "translateY(0)", opacity: "1" },
      },
      pulse: {
        "0%, 100%": { opacity: "1" },
        "50%": { opacity: ".5" },
      },
    },
  },
};
export const plugins = [];
