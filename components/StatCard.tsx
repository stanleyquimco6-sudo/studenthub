import React from "react";
import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../constants";
import { Card } from "./Card";
import { ThemedText } from "./ThemedText";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  borderColor?: string;
}

/**
 * Reusable Stat Card component for dashboard stats
 * Used to display key metrics with consistent styling
 */
export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  borderColor = Colors.primary,
}) => {
  const styles = StyleSheet.create({
    container: {
      borderLeftColor: borderColor,
    },
  });

  return (
    <Card style={styles.container} borderLeftColor={borderColor}>
      <ThemedText variant="h6" color="textSecondary">
        {title}
      </ThemedText>
      <ThemedText
        variant="h1"
        style={{ color: Colors.primary, marginVertical: Spacing.sm }}
      >
        {value}
      </ThemedText>
      {subtitle && (
        <ThemedText variant="caption" color="textSecondary">
          {subtitle}
        </ThemedText>
      )}
    </Card>
  );
};
