import React from "react";
import { StyleSheet, View, ViewStyle, useColorScheme } from "react-native";
import { BorderRadius, Colors, Spacing } from "../constants";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  borderLeftColor?: string;
  padding?: number;
}

/**
 * Reusable Card component for consistent styling
 * Used throughout the app for content containers
 */
export const Card: React.FC<CardProps> = ({
  children,
  style,
  borderLeftColor,
  padding = Spacing.card,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const styles = StyleSheet.create({
    card: {
      backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
      borderRadius: BorderRadius.lg,
      padding,
      marginBottom: Spacing.md,
      borderLeftWidth: borderLeftColor ? 4 : 0,
      borderLeftColor: borderLeftColor || "transparent",
    },
  });

  return <View style={[styles.card, style]}>{children}</View>;
};
