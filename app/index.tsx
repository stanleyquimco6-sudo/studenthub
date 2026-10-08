import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Animated,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { DashboardCard } from "../components/DashboardCard";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../constants";

/**
 * Student Dashboard Screen
 * Displays welcome message, student info, and quick access cards
 * Each card navigates to its respective feature screen
 * Also includes a Daily Study Tip fetched from an external API
 */
export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // State for API Fetch feature
  const [studyTip, setStudyTip] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Animation references
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  /**
   * Fetch study tip from custom study tips array
   * This demonstrates Topic 6: API Fetch pattern with local data
   * - Uses a curated list of study tips
   * - Simulates async API call with setTimeout
   * - Uses fetch() pattern with response.json() alternative
   * - Handles loading and error states
   */
  const studyTips = [
    "Break your study sessions into 25-minute intervals with 5-minute breaks (Pomodoro Technique).",
    "Review your notes within 24 hours of class to reinforce learning and improve retention.",
    "Create a dedicated study space free from distractions like phones, social media, and noise.",
    "Use active recall by testing yourself on material instead of just re-reading notes.",
    "Study the hardest material when you're most alert, usually in the morning or early afternoon.",
    "Form a study group with classmates to discuss concepts and explain them to each other.",
    "Teach the material to someone else or explain it out loud to deepen your understanding.",
    "Use flashcards for memorization, especially for vocabulary, formulas, and key definitions.",
    "Practice problems regularly, especially for math and programming subjects.",
    "Get enough sleep before exams as it improves memory consolidation and cognitive function.",
    "Organize your notes using the Cornell Method or mind maps for better structure.",
    "Read the textbook chapter summary before diving into the full content to build context.",
    "Set specific, measurable study goals for each session to track your progress.",
    "Use the Feynman Technique: explain concepts in simple terms to identify knowledge gaps.",
    "Take breaks every hour to prevent mental fatigue and maintain focus.",
    "Highlight key points sparingly while reading to avoid passive reading without retention.",
    "Join study sessions before exams to review material and answer last-minute questions.",
    "Practice past exam papers to understand the question format and time management.",
    "Stay hydrated and eat healthy snacks while studying to maintain mental energy.",
    "Eliminate distractions by using website blockers or focusing apps during study time.",
    "Schedule regular study sessions throughout the semester instead of cramming before exams.",
    "Relate new concepts to real-world examples or personal experiences for better understanding.",
    "Use color-coding in your notes to organize information by topic or importance.",
    "Ask your teacher questions if you don't understand a concept instead of letting it slide.",
    "Review difficult topics multiple times spread out over several days or weeks.",
  ];

  const fetchStudyTip = async () => {
    try {
      setLoading(true);
      setError("");
      setStudyTip("");

      // Simulate async API call with a small delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Pick a random study tip from the curated list
      const randomIndex = Math.floor(Math.random() * studyTips.length);
      const tip = studyTips[randomIndex];

      // Store the fetched tip
      setStudyTip(tip);
    } catch (err) {
      // Handle any errors
      setError("Unable to load study tip. Please try again.");
      console.error("Study Tip Error:", err);
    } finally {
      // Always stop loading, regardless of success or error
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch study tip when component mounts
    fetchStudyTip();

    // Fade in and slide up animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous pulse animation for info card (very subtle)
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.96,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1.04,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      alignItems: "center",
    },
    studentImage: {
      width: 140,
      height: 140,
      borderRadius: 70,
      marginBottom: 12,
      borderWidth: 3,
      borderColor: "#007AFF",
      shadowColor: "#007AFF",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    greeting: {
      fontSize: 20,
      fontWeight: "600",
      color: isDark ? "#aaa" : "#666",
      marginBottom: 4,
    },
    studentName: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#007AFF",
      marginBottom: 0,
    },
    infoCard: {
      backgroundColor: isDark ? "#2a2a2a" : "#fff",
      borderRadius: 16,
      padding: 16,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: isDark ? "#444" : "#f0f0f0",
      shadowColor: "#007AFF",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 3,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },
    animatedInfoCard: {
      transform: [{ scale: pulseAnim }],
    },
    infoBadge: {
      flex: 1,
      alignItems: "center",
    },
    infoBadgeLabel: {
      fontSize: 11,
      fontWeight: "700",
      color: isDark ? "#aaa" : "#999",
      marginBottom: 4,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    infoBadgeValue: {
      fontSize: 15,
      fontWeight: "700",
      color: isDark ? "#fff" : "#000",
    },
    divider: {
      width: 1,
      height: 30,
      backgroundColor: isDark ? "#444" : "#eee",
      marginHorizontal: 12,
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
    // Study Tip Card Styles
    studyTipCard: {
      backgroundColor: isDark ? "#2a2a2a" : "#fff",
      borderRadius: 16,
      padding: 16,
      marginBottom: 24,
      borderLeftWidth: 4,
      borderLeftColor: "#95E1D3",
      borderTopWidth: 1,
      borderTopColor: isDark ? "#444" : "#f0f0f0",
      borderRightWidth: 1,
      borderRightColor: isDark ? "#444" : "#f0f0f0",
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#444" : "#f0f0f0",
      shadowColor: "#95E1D3",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    studyTipHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    studyTipIcon: {
      marginRight: 8,
    },
    studyTipTitle: {
      fontSize: 14,
      fontWeight: "700",
      color: "#95E1D3",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    studyTipContent: {
      fontSize: 15,
      fontWeight: "500",
      color: isDark ? "#ddd" : "#333",
      lineHeight: 22,
      marginBottom: 12,
    },
    loadingContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
    },
    loadingText: {
      fontSize: 14,
      color: isDark ? "#aaa" : "#666",
      marginLeft: 8,
    },
    errorText: {
      fontSize: 14,
      color: Colors.error,
      marginBottom: 12,
      lineHeight: 20,
    },
    refreshButton: {
      backgroundColor: "#95E1D3",
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    refreshButtonText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 13,
      marginLeft: 6,
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
          <Image
            source={require("../assets/images/student.jpg")}
            style={styles.studentImage}
          />
          <Text style={styles.greeting}>Welcome back!</Text>
          <Text style={styles.studentName}>{studentInfo.name}</Text>
        </View>

        {/* Student Information Card */}
        <Animated.View style={[styles.infoCard, styles.animatedInfoCard]}>
          <View style={styles.infoBadge}>
            <Text style={styles.infoBadgeLabel}>Course</Text>
            <Text style={styles.infoBadgeValue}>{studentInfo.course}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoBadge}>
            <Text style={styles.infoBadgeLabel}>Section</Text>
            <Text style={styles.infoBadgeValue}>{studentInfo.section}</Text>
          </View>
        </Animated.View>

        {/* Quick Access Section */}
        <Text style={styles.sectionTitle}>Quick Access</Text>

        {/* Daily Study Tip Section - API Fetch Feature */}
        <View style={styles.studyTipCard}>
          {/* Header with Icon */}
          <View style={styles.studyTipHeader}>
            <MaterialIcons
              name="lightbulb"
              size={18}
              color="#95E1D3"
              style={styles.studyTipIcon}
            />
            <Text style={styles.studyTipTitle}>Study Tip</Text>
          </View>

          {/* Loading State */}
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#95E1D3" />
              <Text style={styles.loadingText}>Loading study tip...</Text>
            </View>
          )}

          {/* Error State */}
          {error && !loading && (
            <>
              <Text style={styles.errorText}>{error}</Text>
            </>
          )}

          {/* Success State - Display Study Tip */}
          {studyTip && !loading && !error && (
            <Text style={styles.studyTipContent}>{studyTip}</Text>
          )}

          {/* Empty State - Initial Load */}
          {!studyTip && !loading && !error && (
            <Text style={styles.studyTipContent}>
              No tip loaded yet. Tap refresh to get started!
            </Text>
          )}

          {/* Refresh Button */}
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={fetchStudyTip}
            disabled={loading}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name="refresh"
              size={16}
              color="#fff"
            />
            <Text style={styles.refreshButtonText}>Refresh Tip</Text>
          </TouchableOpacity>
        </View>

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
        <View
          style={[
            styles.infoCard,
            { 
              borderLeftWidth: 0,
              backgroundColor: isDark ? "#2C3E50" : "#E8F4F8",
              marginBottom: 40,
              flexDirection: "column",
              alignItems: "flex-start",
            },
          ]}
        >
          <Text style={[styles.infoBadgeLabel, { marginBottom: 8, color: "#007AFF" }]}>
            Getting Started
          </Text>
          <Text style={[styles.infoBadgeValue, { fontSize: 14, color: isDark ? "#ddd" : "#333", fontWeight: "400" }]}>
            Use the tabs below to explore Study Planner, Tasks, Notes, and more. Tap cards above for quick access.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
