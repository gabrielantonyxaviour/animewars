import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        stalinist: ["var(--font-stalinist)"],
      },
      animation: {
        "infinite-scroll": "infinite-scroll 25s linear infinite",
        "fill-drain": "fillDrain 5s ease-in-out infinite",
      },
      keyframes: {
        fillDrain: {
          "0%, 100%": {
            opacity: "0",
            transform: "scaleY(0)",
          },
          "50%": {
            opacity: "1",
            transform: "scaleY(1)",
          },
        },
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".text-gradient": {
          background: "linear-gradient(to right, #FFFFFF, #999999)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};

export default config;
