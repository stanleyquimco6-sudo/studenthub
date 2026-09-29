import { ScrollView, StyleSheet, Text, useColorScheme, View } from "react-native";

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#1a1a1a" : "#f9f9f9",
    },
    scrollView: {
      padding: 16,
    },
    card: {
      backgroundColor: isDark ? "#2a2a2a" : "#fff",
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderLeftWidth: 4,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#000",
      marginBottom: 8,
    },
    cardValue: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#007AFF",
      marginBottom: 4,
    },
    cardSubtitle: {
      fontSize: 14,
      color: isDark ? "#aaa" : "#666",
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: isDark ? "#fff" : "#000",
            marginBottom: 16,
          }}
        >
          Welcome to StudentHub 👋
        </Text>

        {/* Tasks Overview Card */}
        <View style={[styles.card, { borderLeftColor: "#FF6B6B" }]}>
          <Text style={styles.cardTitle}>Pending Tasks</Text>
          <Text style={styles.cardValue}>5</Text>
          <Text style={styles.cardSubtitle}>You have 5 tasks to complete</Text>
        </View>

        {/* Grades Overview Card */}
        <View style={[styles.card, { borderLeftColor: "#4ECDC4" }]}>
          <Text style={styles.cardTitle}>Average Grade</Text>
          <Text style={styles.cardValue}>85%</Text>
          <Text style={styles.cardSubtitle}>Across 3 courses</Text>
        </View>

        {/* Notes Overview Card */}
        <View style={[styles.card, { borderLeftColor: "#FFE66D" }]}>
          <Text style={styles.cardTitle}>Total Notes</Text>
          <Text style={styles.cardValue}>12</Text>
          <Text style={styles.cardSubtitle}>Organized by subject</Text>
        </View>

        {/* Group Info Card */}
        <View style={[styles.card, { borderLeftColor: "#95E1D3" }]}>
          <Text style={styles.cardTitle}>Group Project</Text>
          <Text style={styles.cardSubtitle}>
            StudentHub - A college group project by 5 students
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: isDark ? "#999" : "#888",
              marginTop: 8,
            }}
          >
            Navigate using the tabs below to explore all features!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
