import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        surface: "#0f1116",
        muted: "#1b1b1f",
        accent: {
          purple: "#9333ea",
          cyan: "#22d3ee",
          green: "#2dd4bf",
        },
      },
      boxShadow: {
        glow: "0 0 45px rgba(147, 51, 234, 0.15)",
        panel: "0 35px 120px -45px rgba(0, 0, 0, 0.6)",
      },
      backgroundImage: {
        hero: "radial-gradient(circle at top left, rgba(147, 51, 234, 0.18), transparent 32%), radial-gradient(circle at 100% 10%, rgba(34, 211, 238, 0.12), transparent 24%)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-250px 0" },
          "100%": { backgroundPosition: "250px 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
