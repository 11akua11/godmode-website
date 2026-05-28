import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#0B0B0B",
        titanium: "#1A1A1A",
        bone: "#D6D4CF",
        champagne: "#C7B07A",
        bronze: "#6C5330"
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial", "sans-serif"],
        body: ["var(--font-body)", "Inter", "Arial", "sans-serif"]
      },
      letterSpacing: {
        ritual: "0.32em",
        widebody: "0.16em"
      }
    }
  },
  plugins: []
};

export default config;
