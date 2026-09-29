import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function AboutScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#1a1a1a" : "#f9f9f9",
    },
    content: {
      padding: 16,
    },
    card: {
      backgroundColor: isDark ? "#2a2a2a" : "#fff",
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#000",
      marginBottom: 8,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 14,
      color: isDark ? "#aaa" : "#666",
      textAlign: "center",
      marginBottom: 12,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#000",
      marginBottom: 8,
      marginTop: 12,
    },
    sectionText: {
      fontSize: 14,
      color: isDark ? "#ccc" : "#333",
      lineHeight: 22,
      marginBottom: 8,
    },
    featureRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 12,
      gap: 12,
    },
    featureIcon: {
      width: 32,
      height: 32,
      borderRadius: 6,
      backgroundColor: "#007AFF",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 2,
    },
    featureContent: {
      flex: 1,
    },
    featureTitle: {
      fontSize: 14,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#000",
      marginBottom: 2,
    },
    featureDescription: {
      fontSize: 13,
      color: isDark ? "#aaa" : "#666",
    },
    lessonBadge: {
      backgroundColor: isDark ? "#444" : "#f0f0f0",
      borderRadius: 6,
      paddingHorizontal: 10,
      paddingVertical: 6,
      marginRight: 8,
      marginBottom: 8,
    },
    lessonBadgeText: {
      fontSize: 12,
      fontWeight: "600",
      color: "#007AFF",
    },
    footer: {
      textAlign: "center",
      fontSize: 12,
      color: isDark ? "#888" : "#999",
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: isDark ? "#444" : "#ddd",
    },
  });

  const lessons = [
    "Basic React Native Components",
    "User Inputs & Forms",
    "useState Hook",
    "Expo Router Navigation",
    "Moving Data Between Screens",
    "useEffect & Lifecycle",
  ];

  const features = [
    {
      icon: "dashboard",
      title: "Dashboard Overview",
      description: "Quick stats on tasks, grades, and notes",
    },
    {
      icon: "checklist",
      title: "Task Management",
      description: "Create, complete, and track assignments",
    },
    {
      icon: "grade",
      title: "Grade Tracker",
      description: "Log course grades and calculate averages",
    },
    {
      icon: "note",
      title: "Note Taking",
      description: "Organize notes by subject and topic",
    },
    {
      icon: "person",
      title: "Profile Management",
      description: "Manage your profile and group members",
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.card}>
        <Text style={styles.title}>StudentHub</Text>
        <Text style={styles.subtitle}>
          A college group project by 5 students
        </Text>
        <Text style={styles.sectionText}>
          StudentHub is a beginner-friendly mobile app built with React Native
          and Expo. It demonstrates core concepts for managing academic tasks,
          grades, and notes.
        </Text>
      </View>

      {/* What's Included */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📱 Features</Text>

        {features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <MaterialIcons name={feature.icon as any} size={18} color="#fff" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Lessons Demonstrated */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📚 Lessons Demonstrated</Text>
        <Text style={styles.sectionText}>
          This app teaches the following core concepts:
        </Text>

        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {lessons.map((lesson, index) => (
            <View key={index} style={styles.lessonBadge}>
              <Text style={styles.lessonBadgeText}>✓ {lesson}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Tech Stack */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>⚙️ Tech Stack</Text>

        <View style={styles.featureRow}>
          <View style={styles.featureIcon}>
            <MaterialIcons name="code" size={18} color="#fff" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>React Native</Text>
            <Text style={styles.featureDescription}>
              Cross-platform mobile framework
            </Text>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.featureIcon}>
            <MaterialIcons name="language" size={18} color="#fff" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Expo</Text>
            <Text style={styles.featureDescription}>
              Platform for building universal React apps
            </Text>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.featureIcon}>
            <MaterialIcons name="navigation" size={18} color="#fff" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Expo Router</Text>
            <Text style={styles.featureDescription}>
              File-based routing for navigation
            </Text>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.featureIcon}>
            <MaterialIcons name="terminal" size={18} color="#fff" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>TypeScript</Text>
            <Text style={styles.featureDescription}>
              Type-safe JavaScript
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        StudentHub v1.0.0 • Built for learning • No backend required
      </Text>
    </ScrollView>
  );
}
