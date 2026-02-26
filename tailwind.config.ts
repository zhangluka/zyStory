import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0891B2",
        secondary: "#22D3EE",
        cta: "#22C55E",
        background: "#ECFEFF",
        text: "#164E63",
        border: "#BAE6FD",
        "card-bg": "#FFFFFF",
        accent: "#06B6D4",
        typewriter: {
          bg: "var(--typewriter-bg)",
          paper: "var(--typewriter-paper)",
          ink: "var(--typewriter-ink)",
          accent: "var(--typewriter-accent)",
          border: "var(--typewriter-border)",
        },
      },
      fontFamily: {
        archivo: ["var(--font-archivo)", "sans-serif"],
        sans: ["var(--font-space-grotesk)", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
