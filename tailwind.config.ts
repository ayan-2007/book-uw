import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--bg-rgb) / <alpha-value>)",
        surface: "rgb(var(--surface-rgb) / <alpha-value>)",
        raised: "rgb(var(--surface-raised-rgb) / <alpha-value>)",
        line: "rgb(var(--border-rgb) / <alpha-value>)",
        paper: "rgb(var(--text-rgb) / <alpha-value>)",
        slate: "rgb(var(--text-muted-rgb) / <alpha-value>)",
        gold: "rgb(var(--accent-rgb) / <alpha-value>)",
        "gold-hover": "rgb(var(--accent-hover-rgb) / <alpha-value>)",
        danger: "rgb(var(--danger-rgb) / <alpha-value>)",
      },
      fontFamily: {
        serif: ["var(--font-young-serif)", "Georgia", "serif"],
        sans: [
          "var(--font-hanken)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
      },
      spacing: {
        0: "0px",
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        6: "24px",
        8: "32px",
        12: "48px",
        16: "64px",
        24: "96px",
        32: "128px",
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.5" }],
        base: ["1rem", { lineHeight: "1.6" }],
        lg: ["1.125rem", { lineHeight: "1.6" }],
        xl: [
          "clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)",
          { lineHeight: "1.3" },
        ],
        "2xl": [
          "clamp(1.5rem, 1.2rem + 1.2vw, 2rem)",
          { lineHeight: "1.2", letterSpacing: "-0.015em" },
        ],
        "3xl": [
          "clamp(1.875rem, 1.4rem + 2vw, 2.75rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
        "4xl": [
          "clamp(2.25rem, 1.5rem + 3.2vw, 4rem)",
          { lineHeight: "1.05", letterSpacing: "-0.025em" },
        ],
      },
      maxWidth: {
        page: "var(--page-max)",
        letter: "var(--letter-measure)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        1: "var(--shadow-1)",
        2: "var(--shadow-2)",
        3: "var(--shadow-3)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
      },
      transitionDuration: {
        fast: "var(--dur-fast)",
        base: "var(--dur-base)",
        slow: "var(--dur-slow)",
      },
    },
  },
  plugins: [],
};

export default config;
