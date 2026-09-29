import React from "react";
import { Text, StyleSheet, TextStyle, useColorScheme } from "react-native";
import { Colors, Typography } from "../constants";

interface ThemedTextProps {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body" | "caption";
  weight?: keyof typeof Typography.weights;
  color?: "primary" | "secondary" | "text" | "textSecondary";
  style?: TextStyle;
}

/**
 * Reusable Text component with theme-aware colors and typography
 * Use for consistent text styling across screens
 */
export const ThemedText: React.FC<ThemedTextProps> = ({
  children,
  variant = "body",
  weight = "normal",
  color = "text",
  style,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const getColor = () => {
    switch (color) {
      case "primary":
        return Colors.primary;
      case "secondary":
        return Colors.secondary;
      case "text":
        return isDark ? Colors.dark.text : Colors.light.text;
      case "textSecondary":
        return isDark ? Colors.dark.textSecondary : Colors.light.textSecondary;
      default:
        return isDark ? Colors.dark.text : Colors.light.text;
    }
  };

  const getSize = () => {
    switch (variant) {
      case "h1":
        return Typography.sizes.h1;
      case "h2":
        return Typography.sizes.h2;
      case "h3":
        return Typography.sizes.h3;
      case "h4":
        return Typography.sizes.h4;
      case "h5":
        return Typography.sizes.h5;
      case "h6":
        return Typography.sizes.h6;
      case "body":
        return Typography.sizes.body;
      case "caption":
        return Typography.sizes.caption;
      default:
        return Typography.sizes.body;
    }
  };

  const styles = StyleSheet.create({
    text: {
      fontSize: getSize(),
      fontWeight: weight as any,
      color: getColor(),
    },
  });

  return <Text style={[styles.text, style]}>{children}</Text>;
};
