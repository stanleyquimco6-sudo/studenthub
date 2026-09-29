import React from "react";
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  useColorScheme,
} from "react-native";
import { Colors, Spacing, BorderRadius } from "../constants";

interface InputFieldProps extends TextInputProps {
  label?: string;
}

/**
 * Reusable Input Field component with theme support
 * Use for form inputs throughout the app
 */
export const InputField: React.FC<InputFieldProps> = ({
  label,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const styles = StyleSheet.create({
    input: {
      backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
      borderRadius: BorderRadius.md,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      color: isDark ? Colors.dark.text : Colors.light.text,
      borderWidth: 1,
      borderColor: isDark ? Colors.dark.border : Colors.light.border,
      marginBottom: Spacing.md,
      fontSize: 16,
    },
  });

  return (
    <TextInput
      {...props}
      style={[styles.input, props.style]}
      placeholderTextColor={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary}
    />
  );
};
