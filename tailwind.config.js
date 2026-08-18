/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#14181F", soft: "#232A35", mute: "#5B6472" },
        cream: "#FAF7F1",
        sand: "#EDE7DB",
        brass: { DEFAULT: "#B08D3E", soft: "#C9A960" },
        pine: "#1E3A2F",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
