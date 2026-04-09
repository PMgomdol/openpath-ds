import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary — Openpath (Mint)
        mint: {
          20:  "#F3FCFC",
          50:  "#D6F5F5",
          100: "#A8EBEA",
          200: "#6DDEDD",
          300: "#28D7D2",
          400: "#1BB8B3",
          500: "#0F9490",
          600: "#156565",
        },
        // Primary — Duotone (Coral)
        coral: {
          20:  "#FFF1F1",
          50:  "#FFD6D6",
          300: "#FE6565",
          400: "#E54D4D",
          500: "#C93838",
          600: "#A02828",
        },
        // Neutral
        neutral: {
          20:  "#F4F5F5",
          100: "#D8DCDE",
          200: "#B0B8BC",
          300: "#889298",
          400: "#60707A",
          500: "#3D5060",
          600: "#29363D",
        },
        // System
        system: {
          error:   "#FF3257",
          success: "#28D7D2",
          warning: "#EE706B",
          black:   "#151B1E",
          white:   "#FFFFFF",
        },
        // Semantic aliases
        brand:   "#28D7D2",
        "brand-hover":    "#1BB8B3",
        "brand-pressed":  "#0F9490",
        "brand-subtle":   "#F3FCFC",
        "text-primary":   "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-disabled":  "#889298",
        "bg-base":        "var(--color-bg-base)",
        "bg-subtle":      "var(--color-bg-subtle)",
        "border-default": "#D8DCDE",
        "border-focus":   "#28D7D2",
        "border-error":   "#FF3257",
      },
      fontFamily: {
        sans: ["'Noto Sans KR'", "'Mark Pro'", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Headline
        "headline-xl": ["56px", { lineHeight: "1.2", fontWeight: "900" }],
        "headline-lg": ["48px", { lineHeight: "1.2", fontWeight: "900" }],
        // Title
        "title-lg":    ["24px", { lineHeight: "1.5", fontWeight: "700" }],
        "title-md":    ["20px", { lineHeight: "1.5", fontWeight: "700" }],
        // Body
        "body-lg":     ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md":     ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-sm":     ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        // Label
        "label-lg":    ["16px", { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0.04em" }],
        "label-md":    ["14px", { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0.04em" }],
        "label-sm":    ["12px", { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0.04em" }],
      },
      spacing: {
        // 8px base grid
        "sp-02": "8px",
        "sp-03": "12px",
        "sp-04": "16px",
        "sp-06": "24px",
        "sp-08": "40px",
        "sp-10": "48px",
        "sp-12": "64px",
        "sp-16": "80px",
      },
      borderRadius: {
        sm: "4px",   // badge, tag
        md: "8px",   // button, input
        lg: "12px",  // card
        xl: "16px",  // modal
        "2xl": "24px",
      },
      boxShadow: {
        "elevation-1": "0 1px 4px 0 rgba(0,0,0,0.08)",
        "elevation-2": "0 4px 12px 0 rgba(0,0,0,0.10)",
        "elevation-3": "0 8px 24px 0 rgba(0,0,0,0.12)",
        "elevation-4": "0 16px 40px 0 rgba(0,0,0,0.16)",
      },
      maxWidth: {
        content: "1200px",
        sidebar: "240px",
      },
    },
  },
  plugins: [],
};

export default config;
