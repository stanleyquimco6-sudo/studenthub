import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { DashboardCard } from "../components/DashboardCard";

/**
 * Student Dashboard Screen
 * Displays welcome message, student info, and quick access cards
 * Each card navigates to its respective feature screen
 */
export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Student information (hardcoded for now, no backend)
  const studentInfo = {
    name: "Mark Anthony Salvador",
    course: "BSIT",
    section: "4-I",
  };

  // Dashboard cards configuration
  const dashboardCards = [
    {
      title: "Study Planner",
      icon: "calendar-today" as const,
      description: "Plan your study sessions",
      onPress: () => router.push("/grades"),
      backgroundColor: "#4ECDC4",
    },
    {
      title: "Tasks",
      icon: "checklist" as const,
      description: "Manage tasks",
      onPress: () => router.push("/tasks"),
      backgroundColor: "#FF6B6B",
    },
    {
      title: "Notes",
      icon: "note" as const,
      description: "Study notes",
      onPress: () => router.push("/notes"),
      backgroundColor: "#FFE66D",
    },
    {
      title: "Profile",
      icon: "person" as const,
      description: "Your profile",
      onPress: () => router.push("/profile"),
      backgroundColor: "#95E1D3",
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#1a1a1a" : "#f9f9f9",
    },
    scrollView: {
      paddingHorizontal: 16,
      paddingVertical: 20,
    },
    headerContainer: {
      marginBottom: 24,
    },
    greeting: {
      fontSize: 24,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#000",
      marginBottom: 8,
    },
    studentName: {
      fontSize: 20,
      fontWeight: "600",
      color: "#007AFF",
      marginBottom: 16,
    },
    infoCard: {
      backgroundColor: isDark ? "#2a2a2a" : "#fff",
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
      borderLeftWidth: 4,
      borderLeftColor: "#007AFF",
    },
    infoLabel: {
      fontSize: 12,
      fontWeight: "600",
      color: isDark ? "#aaa" : "#666",
      marginBottom: 4,
      textTransform: "uppercase",
    },
    infoValue: {
      fontSize: 16,
      fontWeight: "600",
      color: isDark ? "#fff" : "#000",
      marginBottom: 12,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#000",
      marginBottom: 12,
      marginTop: 16,
    },
    cardsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginHorizontal: -6,
      marginBottom: 20,
    },
    cardWrapper: {
      width: "50%",
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.greeting}>Welcome back! 👋</Text>
          <Text style={styles.studentName}>{studentInfo.name}</Text>
        </View>

        {/* Student Information Card */}
        <View style={styles.infoCard}>
          <View>
            <Text style={styles.infoLabel}>Course</Text>
            <Text style={styles.infoValue}>{studentInfo.course}</Text>
          </View>
          <View>
            <Text style={styles.infoLabel}>Section</Text>
            <Text style={styles.infoValue}>{studentInfo.section}</Text>
          </View>
        </View>

        {/* Quick Access Section */}
        <Text style={styles.sectionTitle}>Quick Access</Text>

        {/* Dashboard Cards Grid */}
        <View style={styles.cardsContainer}>
          {dashboardCards.map((card, index) => (
            <View key={index} style={styles.cardWrapper}>
              <DashboardCard
                title={card.title}
                icon={card.icon}
                description={card.description}
                onPress={card.onPress}
                backgroundColor={card.backgroundColor}
              />
            </View>
          ))}
        </View>

        {/* Footer Message */}
        <View
          style={[
            styles.infoCard,
            { borderLeftColor: "#95E1D3", marginBottom: 40 },
          ]}
        >
          <Text style={styles.infoLabel}>💡 Tip</Text>
          <Text style={styles.infoValue}>
            Use the tabs at the bottom to navigate between screens, or tap the
            cards above for quick access.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
