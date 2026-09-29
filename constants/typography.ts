// Shared typography styles
// Use for consistent text sizing across the app

export const Typography = {
  sizes: {
    h1: 28,
    h2: 24,
    h3: 20,
    h4: 18,
    h5: 16,
    h6: 14,
    body: 14,
    caption: 12,
    small: 10,
  },

  weights: {
    thin: "100" as const,
    extralight: "200" as const,
    light: "300" as const,
    normal: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
    extrabold: "800" as const,
    black: "900" as const,
  },

  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
    loose: 2,
  },
};
