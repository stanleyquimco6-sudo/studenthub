// Shared color palette for StudentHub
// Used by all screens and components
// Update with Member 5 coordination

export const Colors = {
  // Primary colors
  primary: "#007AFF",
  secondary: "#5AC8FA",
  accent: "#4ECDC4",

  // Status colors
  success: "#4ECDC4",
  warning: "#FFE66D",
  error: "#FF6B6B",
  info: "#95E1D3",

  // Grade colors
  gradeA: "#4ECDC4",
  gradeB: "#95E1D3",
  gradeC: "#FFE66D",
  gradeF: "#FF6B6B",

  // Light mode
  light: {
    background: "#f9f9f9",
    card: "#ffffff",
    text: "#000000",
    textSecondary: "#666666",
    border: "#dddddd",
    overlay: "#888888",
  },

  // Dark mode
  dark: {
    background: "#1a1a1a",
    card: "#2a2a2a",
    text: "#ffffff",
    textSecondary: "#aaaaaa",
    border: "#444444",
    overlay: "#666666",
  },

  // Transparent
  transparent: "transparent",
};

export type ColorScheme = "light" | "dark";
