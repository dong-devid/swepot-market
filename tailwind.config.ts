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
        goguma: {
          50:  "#FAF0FF",
          100: "#F0DAFF",
          200: "#DFB3FF",
          300: "#C480F0",
          400: "#A050D0",
          500: "#7B2D8E",
          600: "#6A2080",
          700: "#561868",
          800: "#3D0F4E",
          900: "#2A0A36",
        },
        gold: {
          50:  "#FFFBEB",
          100: "#FFF3C0",
          200: "#FFE566",
          300: "#F5C418",
          400: "#E0AE00",
          500: "#C49800",
          600: "#A07C00",
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: (u: Record<string, Record<string, string>>) => void }) {
      addUtilities({
        '.no-scrollbar::-webkit-scrollbar': { display: 'none' },
        '.no-scrollbar': { '-ms-overflow-style': 'none', 'scrollbar-width': 'none' },
      })
    },
  ],
};

export default config;
