import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from "react-native";

interface DashboardCardProps {
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  value?: string;
  description?: string;
  onPress: () => void;
  backgroundColor?: string;
  iconColor?: string;
}

/**
 * Reusable dashboard card component
 * Displays a feature card with icon, title, and navigation
 * Used in the dashboard to show quick access to all features
 */
export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  icon,
  value,
  description,
  onPress,
  backgroundColor = "#007AFF",
  iconColor = "#fff",
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#2a2a2a" : "#fff",
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 6,
      marginVertical: 8,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: isDark ? "#444" : "#ddd",
    },
    pressedContainer: {
      opacity: 0.7,
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: backgroundColor,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
    },
    title: {
      fontSize: 14,
      fontWeight: "600",
      color: isDark ? "#fff" : "#000",
      textAlign: "center",
      marginBottom: 4,
    },
    value: {
      fontSize: 18,
      fontWeight: "bold",
      color: backgroundColor,
      textAlign: "center",
      marginBottom: 4,
    },
    description: {
      fontSize: 12,
      color: isDark ? "#aaa" : "#666",
      textAlign: "center",
    },
  });

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressedContainer,
      ]}
    >
      <View style={styles.iconContainer}>
        <MaterialIcons name={icon} size={28} color={iconColor} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {value && <Text style={styles.value}>{value}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}
    </Pressable>
  );
};
