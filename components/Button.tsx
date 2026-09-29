import React from "react";
import {
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    useColorScheme,
    ViewStyle,
} from "react-native";
import { BorderRadius, Colors } from "../constants";

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "small" | "medium" | "large";
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

/**
 * Reusable Button component with multiple variants
 * Use for consistent button styling across screens
 */
export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = "primary",
  size = "medium",
  style,
  textStyle,
  disabled = false,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return { backgroundColor: Colors.primary };
      case "secondary":
        return {
          backgroundColor: isDark ? Colors.dark.border : Colors.light.border,
        };
      case "danger":
        return { backgroundColor: Colors.error };
      case "success":
        return { backgroundColor: Colors.success };
      default:
        return { backgroundColor: Colors.primary };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return { paddingVertical: 8, paddingHorizontal: 12 };
      case "medium":
        return { paddingVertical: 12, paddingHorizontal: 16 };
      case "large":
        return { paddingVertical: 16, paddingHorizontal: 20 };
      default:
        return { paddingVertical: 12, paddingHorizontal: 16 };
    }
  };

  const styles = StyleSheet.create({
    button: {
      borderRadius: BorderRadius.md,
      justifyContent: "center",
      alignItems: "center",
      opacity: disabled ? 0.5 : 1,
    },
    text: {
      fontWeight: "600",
      color: "#fff",
    },
  });

  const getTextSize = () => {
    switch (size) {
      case "small":
        return 12;
      case "medium":
        return 14;
      case "large":
        return 16;
      default:
        return 14;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getVariantStyles(), getSizeStyles(), style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, { fontSize: getTextSize() }, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
