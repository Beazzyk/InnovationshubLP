module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: "var(--light)",
        separator: "var(--separator)",
        "ui-black": "var(--ui-black)",
        "ui-dark-blue": "var(--ui-dark-blue)",
        uiblue: "var(--uiblue)",
        "uiblue-tint": "var(--uiblue-tint)",
        "uidark-blue": "var(--uidark-blue)",
        "uigrey-blue": "var(--uigrey-blue)",
        "uilight-blue": "var(--uilight-blue)",
        white: "var(--white)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        "body-body-2": "var(--body-body-2-font-family)",
        "body-body-3": "var(--body-body-3-font-family)",
        "body-information": "var(--body-information-font-family)",
        "header-h1": "var(--header-h1-font-family)",
        "header-h2": "var(--header-h2-font-family)",
        "header-h3": "var(--header-h3-font-family)",
        "header-h4": "var(--header-h4-font-family)",
        "monsterrat-14-semibold": "var(--monsterrat-14-semibold-font-family)",
        "monsterrat-18-semibold": "var(--monsterrat-18-semibold-font-family)",
        "raleway-14-semibold": "var(--raleway-14-semibold-font-family)",
        "section-name": "var(--section-name-font-family)",
        "XXX-12-medium": "var(--XXX-12-medium-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      boxShadow: { "card-shadow": "var(--card-shadow)", shad: "var(--shad)" },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};
