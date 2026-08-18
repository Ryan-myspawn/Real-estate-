/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Manidvipa palette — quiet luxury
        char: { DEFAULT: "#0F0F0F", soft: "#161514", line: "#2A2723" },
        bone: "#F7F4EF",
        mist: "#E8E4DE",
        champ: "#C9B8A0",
        bronze: "#A68B6A",
        taupe: "#B8A99A",
        // legacy tokens still used by the 3D walkthrough overlays
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
      letterSpacing: {
        micro: "0.32em",
      },
      transitionTimingFunction: {
        lux: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
