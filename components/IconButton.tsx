import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
} from "react-native";
import { BorderRadius, Spacing } from "../constants";

interface IconButtonProps {
  onPress: () => void;
  name: keyof typeof MaterialIcons.glyphMap;
  size?: number;
  color?: string;
  style?: ViewStyle;
  disabled?: boolean;
  backgroundColor?: string;
}
/**
 * Reusable Icon Button component
 * Use for icon-based actions like delete, edit, etc.
 */
export const IconButton: React.FC<IconButtonProps> = ({
  onPress,
  name,
  size = 20,
  color = "#FF6B6B",
  style,
  disabled = false,
  backgroundColor,
}) => {

  const styles = StyleSheet.create({
    button: {
      padding: Spacing.sm,
      borderRadius: BorderRadius.md,
      justifyContent: "center",
      alignItems: "center",
      opacity: disabled ? 0.5 : 1,
    },
  });

  return (
    <TouchableOpacity
      style={[
        styles.button,
        backgroundColor && { backgroundColor },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <MaterialIcons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};
