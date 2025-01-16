/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.js", "./src/**/*.css", "index.html"];
export const theme = {
  extend: {
    colors: {
      primary: "#020024",
      secondary: "#0a0744",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    animation: {
      "loading-bar": "loadingBar 2s linear",
    },
    keyframes: {
      loadingBar: {
        from: { width: "0%" }
      }
    },
  },
};
export const plugins = [];
