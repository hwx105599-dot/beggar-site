import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        coinFall: {
          "0%": { transform: "translateY(-60px)", opacity: "1" },
          "85%": { opacity: "0.7" },
          "100%": { transform: "translateY(110vh)", opacity: "0" },
        },
        popIn: {
          "0%": { transform: "scale(0.4) rotate(-6deg)", opacity: "0" },
          "65%": { transform: "scale(1.05) rotate(1deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-10deg)" },
          "50%": { transform: "rotate(10deg)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0) scale(1)" },
          "15%": { transform: "translateX(-6px) scale(1.06)" },
          "30%": { transform: "translateX(6px) scale(1.06)" },
          "45%": { transform: "translateX(-3px) scale(1.03)" },
          "60%": { transform: "translateX(3px) scale(1.01)" },
          "75%": { transform: "translateX(-1px)" },
        },
        countUp: {
          "0%": { transform: "translateY(14px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        rain: {
          "0%": { transform: "translateY(-20px)", opacity: "0.8" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
        leafFall: {
          "0%": { transform: "translateY(-40px) rotate(0deg) translateX(0px)", opacity: "1" },
          "25%": { transform: "translateY(25vh) rotate(40deg) translateX(18px)", opacity: "0.9" },
          "50%": { transform: "translateY(50vh) rotate(80deg) translateX(-12px)", opacity: "0.8" },
          "75%": { transform: "translateY(75vh) rotate(130deg) translateX(14px)", opacity: "0.5" },
          "100%": { transform: "translateY(110vh) rotate(180deg) translateX(-5px)", opacity: "0" },
        },
        tremble: {
          "0%, 100%": { transform: "rotate(-1.5deg) skew(-0.5deg)" },
          "25%": { transform: "rotate(-2deg) skew(0.5deg)" },
          "50%": { transform: "rotate(-1deg) skew(-1deg)" },
          "75%": { transform: "rotate(-2.5deg) skew(0.3deg)" },
        },
        marqueeScroll: {
          from: { transform: "translateX(100vw)" },
          to:   { transform: "translateX(-100%)" },
        },
      },
      animation: {
        float: "float 3.5s ease-in-out infinite",
        coinFall: "coinFall 1.6s ease-in forwards",
        popIn: "popIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        fadeIn: "fadeIn 0.25s ease forwards",
        wiggle: "wiggle 0.55s ease-in-out infinite",
        shake: "shake 0.55s ease-in-out",
        countUp: "countUp 0.35s ease-out forwards",
        rain: "rain 1.2s linear infinite",
        leafFall: "leafFall 7s ease-in-out forwards",
        tremble: "tremble 4s ease-in-out infinite",
        marqueeScroll: "marqueeScroll 10s linear",
      },
    },
  },
  plugins: [],
};
export default config;
