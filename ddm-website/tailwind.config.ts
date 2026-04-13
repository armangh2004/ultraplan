import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    borderRadius: {
      none: "0px",
      sm: "0.125rem",
      DEFAULT: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      full: "9999px",
    },
    extend: {
      colors: {
        primary: "#D4AF37",
        "on-primary": "#1c1b1b",
        background: "#000000",
        surface: "#131313",
        "surface-container-low": "#1c1b1b",
        "surface-container": "#201f1f",
        "surface-container-high": "#2a2a2a",
        "surface-container-highest": "#353534",
        "surface-container-lowest": "#0e0e0e",
        "on-surface": "#e5e2e1",
        "on-surface-variant": "#d0c5af",
        outline: "#99907c",
        "outline-variant": "#4d4635",
        error: "#ffb4ab",
        "error-container": "#93000a",
      },
      fontFamily: {
        headline: ["var(--font-headline)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        label: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
