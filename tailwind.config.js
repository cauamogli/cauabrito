/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta espacial / cyberpunk
        space: {
          950: "#03040a",
          900: "#060814",
          800: "#0a0e22",
          700: "#0f1733",
        },
        neon: {
          cyan: "#22d3ee",
          blue: "#3b82f6",
          purple: "#a855f7",
          pink: "#ec4899",
          green: "#22ff99",
        },
      },
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        body: ["Rajdhani", "Inter", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 12px rgba(34,211,238,0.6), 0 0 32px rgba(59,130,246,0.35)",
        "neon-purple": "0 0 14px rgba(168,85,247,0.6), 0 0 40px rgba(168,85,247,0.3)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        flicker: {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": { opacity: "1" },
          "20%, 22%, 24%, 55%": { opacity: "0.35" },
        },
        pulseBorder: {
          "0%, 100%": { borderColor: "rgba(34,211,238,0.35)" },
          "50%": { borderColor: "rgba(168,85,247,0.75)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        scan: "scan 3.5s linear infinite",
        flicker: "flicker 4s linear infinite",
        pulseBorder: "pulseBorder 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
