import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        heroTitle: "#F4C9FF66 0px 0px 58.2px",
        btnText: "#FFFFFFB2 0px 0px 9.5px",
        btnBg: "rgba(166, 51, 255, 0.50) 0px 0px 14px",
        gameCardImageHover: "rgba(223, 186, 255, 0.2) 0px 0px 30px",
      },
      boxShadow: {
        gameCardHover: "0px 0px 60px 0px rgba(206, 143, 255, 0.3)",
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
        montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
        orbitron: ["Orbitron", ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsla(var(--background))",
        foreground: "hsla(var(--foreground))",
        card: {
          DEFAULT: "hsla(var(--card))",
          foreground: "hsla(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsla(var(--popover))",
          foreground: "hsla(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsla(var(--primary))",
          foreground: "hsla(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsla(var(--secondary))",
          foreground: "hsla(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsla(var(--muted))",
          foreground: "hsla(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsla(var(--accent))",
          foreground: "hsla(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsla(var(--destructive))",
          foreground: "hsla(var(--destructive-foreground))",
        },
        border: "hsla(var(--border))",
        input: "hsla(var(--input))",
        ring: "hsla(var(--ring))",
        chart: {
          1: "hsla(var(--chart-1))",
          2: "hsla(var(--chart-2))",
          3: "hsla(var(--chart-3))",
          4: "hsla(var(--chart-4))",
          5: "hsla(var(--chart-5))",
        },
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            transform: "translate3d(0, 40px, 0)",
            opacity: "0",
          },
          "100%": {
            transform: "translate3d(0, 0, 0)",
            opacity: "1",
          },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.7s both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
