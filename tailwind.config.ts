import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lagos: {
          dark: "#0b0c10",
          night: "#12141a",
          charcoal: "#1a1d24",
          surface: "#21252f",
          border: "#2e3442",
          gold: "#c89d56",
          bronze: "#dfb06c",
          ochre: "#e67e22",
          terracotta: "#c05634",
          cream: "#f7f5f0",
          sand: "#eae6df",
          muted: "#949aa7",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        display: ["var(--font-display)", "var(--font-serif)", "serif"],
      },
      letterSpacing: {
        widest: "0.2em",
        tighter: "-0.04em",
      },
    },
  },
  plugins: [],
};
export default config;
