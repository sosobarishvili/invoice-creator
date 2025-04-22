/** @type {import('tailwindcss').Config} */
const theme = require("./src/theme/theme");

module.exports = {
  // prefix: "tw-",
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  safelist: [
    'dark',
    'dark:tw-bg-gray-900',
    'dark:tw-bg-primary-light',
    'dark:tw-text-gray-100',
    'dark:tw-bg-gray-700',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: theme.palette.primary.light,
          DEFAULT: theme.palette.primary.main,
          dark: theme.palette.primary.dark,
        },
        secondary: {
          light: theme.palette.secondary.light,
          DEFAULT: theme.palette.secondary.main,
          dark: theme.palette.secondary.dark,
        },
        error: theme.palette.error.main,
        background: {
          default: theme.palette.background.default,
          paper: theme.palette.background.paper,
        },
        text: {
          primary: theme.palette.text.primary,
          secondary: theme.palette.text.secondary,
        },
        divider: {
          primary: theme.palette.divider.primary,
        },
        button: {
          primary: theme.palette.button.primary,
        },
        loading: {
          primary: theme.palette.loading.primary,
        },
      },

      fontFamily: {
        firaGO: ["FiraGO", "sans-serif"],
        firagoUPP: ["FiragoUPP", "sans-serif"],
        firagoUPPMedium: ["FiragoUPP-medium", "sans-serif"],
      },

      spacing: {
        1: theme.spacing(1),
        2: theme.spacing(2),
        4: theme.spacing(4),
        5: theme.spacing(5),
      },

      fontSize: {
        xs: "0.75em",
        sm: "0.875em",
        base: "1em",
        lg: "1.125em",
        xl: "1.25em",
        "2xl": "1.5em",
        "3xl": "1.875em",
        "4xl": "2.25em",
        "5xl": "3em",
      },

      lineHeight: {
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
      },

      fontWeight: {
        normal: 400,
        medium: 500,
        bold: 700,
      },

      boxShadow: {
        "custom-light": "0 4px 6px rgba(0, 0, 0, 0.1)",
        "custom-dark": "0 4px 6px rgba(0, 0, 0, 0.3)",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      borderRadius: {
        none: "0",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },

      maxWidth: {
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
      },

      screens: {
        sm: "200px",
        md: "1000px",
        lg: "1300px",
        xl: "1620px",
      },
    },
  },
  plugins: [
  ],
};
