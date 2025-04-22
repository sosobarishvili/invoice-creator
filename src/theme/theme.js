module.exports = {
  palette: {
    primary: {
      light: "#4791db",
      main: "#1976d2",
      dark: "#115293",
    },
    secondary: {
      light: "#e33371",
      main: "#dc004e",
      dark: "#9a0036",
    },
    error: {
      main: "#f44336",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#555555",
    },
    divider: {
      primary: "#e0e0e0",
    },
    button: {
      primary: "#007BFF",
    },
    loading: {
      primary: "#00BFFF",
    },
  },
  spacing: (factor) => `${factor * 8}px`, // same as MUI spacing
};
