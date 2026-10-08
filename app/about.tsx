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
      borderRadius: 14,
      padding: 18,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: isDark ? "#444" : "#f0f0f0",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 3,
      elevation: 2,
    },
    title: {
      fontSize: 28,
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
      fontWeight: "500",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#000",
      marginBottom: 12,
      marginTop: 8,
    },
    sectionText: {
      fontSize: 14,
      color: isDark ? "#ccc" : "#333",
      lineHeight: 22,
      marginBottom: 12,
    },
    featureRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 14,
      gap: 12,
    },
    featureIcon: {
      width: 38,
      height: 38,
      borderRadius: 8,
      backgroundColor: "#007AFF",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 2,
      shadowColor: "#007AFF",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    featureContent: {
      flex: 1,
    },
    featureTitle: {
      fontSize: 15,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#000",
      marginBottom: 3,
    },
    featureDescription: {
      fontSize: 13,
      color: isDark ? "#aaa" : "#666",
      lineHeight: 18,
    },
    memberCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: isDark ? "#1a1a1a" : "#f9f9f9",
      borderRadius: 10,
      padding: 12,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: isDark ? "#444" : "#eee",
      gap: 12,
    },
    memberIcon: {
      width: 45,
      height: 45,
      borderRadius: 22.5,
      backgroundColor: "#4ECDC4",
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#4ECDC4",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
    },
    memberInfo: {
      flex: 1,
    },
    memberName: {
      fontSize: 14,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#000",
    },
    badgeContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    footer: {
      textAlign: "center",
      fontSize: 12,
      color: isDark ? "#888" : "#999",
      marginTop: 20,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: isDark ? "#444" : "#ddd",
      marginBottom: 20,
    },
  });

  const groupMembers = [
    { id: 1, name: "Stanley Jose Quimco", role: "Frontend Lead" },
    { id: 2, name: "Jusenil Rosal", role: "Backend Developer" },
    { id: 3, name: "Dawn Jessa Toling", role: "UI/UX Designer" },
    { id: 4, name: "Vanessa Roble", role: "Documentation" },
    { id: 5, name: "Mark Anthony Salvador", role: "Testing & QA" },
  ];

  const lessons = [
    "React Native Components",
    "useState Hook",
    "useEffect Hook",
    "Expo Router Navigation",
    "Dark/Light Mode",
    "Local State Management",
    "Form Handling",
    "List Rendering",
  ];

  const features = [
    {
      icon: "dashboard",
      title: "Dashboard",
      description: "Quick overview with statistics and quick access cards",
    },
    {
      icon: "calendar-today",
      title: "Study Planner",
      description: "Schedule and manage study sessions by subject and priority",
    },
    {
      icon: "checklist",
      title: "Task Management",
      description: "Create, track, and complete academic tasks",
    },
    {
      icon: "note",
      title: "Note Taking",
      description: "Organize notes by subject with easy categorization",
    },
    {
      icon: "person",
      title: "Profile Management",
      description: "Manage your profile information and edit settings",
    },
    {
      icon: "info",
      title: "About & Team",
      description: "Learn about the app and meet the development team",
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.card}>
        <Text style={styles.title}>StudentHub</Text>
        <Text style={styles.subtitle}>College Group Project • 5 Students</Text>
        <Text style={styles.sectionText}>
          A modern mobile learning companion built with React Native and Expo. StudentHub helps students organize their academic life with study planning, task management, and note-taking features.
        </Text>
      </View>

      {/* Features */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Features</Text>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <MaterialIcons name={feature.icon as any} size={20} color="#fff" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Development Team */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Group 4</Text>
        <Text style={styles.sectionText}>
          StudentHub was created by the dedicated members of Group 4.
        </Text>

        {groupMembers.map((member) => (
          <View key={member.id} style={styles.memberCard}>
            <View style={styles.memberIcon}>
              <MaterialIcons name="person" size={24} color="#fff" />
            </View>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>{member.name}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Tech Stack */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Built With</Text>

        <View style={styles.featureRow}>
          <View style={styles.featureIcon}>
            <MaterialIcons name="code" size={20} color="#fff" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>React Native</Text>
            <Text style={styles.featureDescription}>
              Cross-platform mobile framework for iOS and Android
            </Text>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.featureIcon}>
            <MaterialIcons name="rocket" size={20} color="#fff" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Expo</Text>
            <Text style={styles.featureDescription}>
              Development platform for building React apps
            </Text>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.featureIcon}>
            <MaterialIcons name="navigation" size={20} color="#fff" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Expo Router</Text>
            <Text style={styles.featureDescription}>
              File-based routing and navigation system
            </Text>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.featureIcon}>
            <MaterialIcons name="terminal" size={20} color="#fff" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>TypeScript</Text>
            <Text style={styles.featureDescription}>
              Type-safe JavaScript for better code quality
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        StudentHub v1.0.0 • Built for Learning • Lessons 1-6
      </Text>
    </ScrollView>
  );
}
