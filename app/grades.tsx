import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  useColorScheme,
  Modal,
  Pressable,
  SafeAreaView,
  Image,
} from "react-native";
import { useState, useEffect, useRef, useCallback } from "react";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Audio } from "expo-av";

interface StudySession {
  id: string;
  subject: string;
  topic: string;
  date: string;
  time: string;
  duration: number;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
}

export default function StudyPlannerScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const nextDay = new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0];

  const [sessions, setSessions] = useState<StudySession[]>([
    {
      id: "1",
      subject: "Laravel",
      topic: "APIs",
      date: today,
      time: "4:00 PM",
      duration: 60,
      priority: "High",
      completed: false,
    },
    {
      id: "2",
      subject: "Database Systems",
      topic: "ERD",
      date: today,
      time: "7:00 PM",
      duration: 45,
      priority: "Medium",
      completed: false,
    },
    {
      id: "3",
      subject: "Mobile Development",
      topic: "Expo Components",
      date: tomorrow,
      time: "3:00 PM",
      duration: 60,
      priority: "Low",
      completed: false,
    },
    {
      id: "4",
      subject: "Programming",
      topic: "PHP",
      date: nextDay,
      time: "5:00 PM",
      duration: 90,
      priority: "High",
      completed: false,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [timerSessionId, setTimerSessionId] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    date: today,
    time: "",
    duration: "",
    priority: "Medium" as "Low" | "Medium" | "High",
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#1a1a1a" : "#f9f9f9",
    },
    content: {
      padding: 16,
    },
    header: {
      marginBottom: 24,
      alignItems: "center",
    },
    headerImage: {
      width: "100%",
      height: 180,
      borderRadius: 12,
      marginBottom: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
      resizeMode: "cover",
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#000",
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 14,
      color: isDark ? "#aaa" : "#666",
    },
    statsContainer: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 24,
    },
    statCard: {
      flex: 1,
      backgroundColor: isDark ? "#2a2a2a" : "#fff",
      borderRadius: 12,
      padding: 12,
      alignItems: "center",
      borderWidth: 1,
      borderColor: isDark ? "#444" : "#eee",
    },
    statNumber: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#007AFF",
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: isDark ? "#aaa" : "#666",
      textAlign: "center",
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#000",
      marginBottom: 12,
      marginTop: 8,
    },
    sessionCard: {
      backgroundColor: isDark ? "#2a2a2a" : "#fff",
      borderRadius: 12,
      padding: 14,
      marginBottom: 10,
      borderLeftWidth: 4,
    },
    sessionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 8,
    },
    sessionSubject: {
      fontSize: 16,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#000",
      marginBottom: 2,
    },
    sessionTopic: {
      fontSize: 14,
      color: isDark ? "#ccc" : "#333",
      marginBottom: 8,
    },
    sessionDetails: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 8,
      flexWrap: "wrap",
    },
    detailItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    detailText: {
      fontSize: 12,
      color: isDark ? "#aaa" : "#666",
    },
    sessionActions: {
      flexDirection: "row",
      gap: 8,
      marginTop: 10,
      borderTopWidth: 1,
      borderTopColor: isDark ? "#444" : "#eee",
      paddingTop: 10,
    },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 6,
      gap: 4,
    },
    completeButton: {
      backgroundColor: "#007AFF20",
      flex: 1,
    },
    editButton: {
      backgroundColor: "#FFD60020",
    },
    deleteButton: {
      backgroundColor: "#FF6B6B20",
    },
    actionButtonText: {
      fontSize: 11,
      fontWeight: "600",
    },
    completedCard: {
      opacity: 0.6,
    },
    completedBadge: {
      backgroundColor: "#4ECDC4",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      marginTop: 2,
    },
    completedBadgeText: {
      fontSize: 11,
      fontWeight: "600",
      color: "#fff",
    },
    priorityBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      alignSelf: "flex-start",
    },
    priorityText: {
      fontSize: 11,
      fontWeight: "600",
      color: "#fff",
    },
    addButton: {
      backgroundColor: "#007AFF",
      borderRadius: 10,
      paddingVertical: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      marginBottom: 16,
    },
    addButtonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 14,
    },
    emptyState: {
      alignItems: "center",
      paddingVertical: 40,
    },
    emptyStateText: {
      fontSize: 16,
      fontWeight: "600",
      color: isDark ? "#ccc" : "#333",
      marginTop: 12,
      marginBottom: 4,
    },
    emptyStateSubtext: {
      fontSize: 14,
      color: isDark ? "#aaa" : "#666",
      textAlign: "center",
    },
    modalContainer: {
      flex: 1,
      backgroundColor: "#00000050",
      justifyContent: "flex-end",
    },
    modalContent: {
      backgroundColor: isDark ? "#2a2a2a" : "#fff",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingHorizontal: 16,
      paddingBottom: 16,
      paddingTop: 12,
      maxHeight: "55%",
    },
    scrollViewContent: {
      paddingBottom: 16,
    },
    timerModal: {
      flex: 1,
      backgroundColor: "#00000080",
      justifyContent: "center",
      alignItems: "center",
    },
    timerContainer: {
      backgroundColor: isDark ? "#2a2a2a" : "#fff",
      borderRadius: 20,
      padding: 30,
      alignItems: "center",
      width: "85%",
    },
    timerTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#000",
      marginBottom: 8,
    },
    timerSubtitle: {
      fontSize: 14,
      color: isDark ? "#aaa" : "#666",
      marginBottom: 20,
    },
    timerDisplay: {
      fontSize: 64,
      fontWeight: "bold",
      color: "#007AFF",
      marginBottom: 20,
      fontFamily: "monospace",
    },
    timerControlsRow: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 16,
      flexWrap: "wrap",
      justifyContent: "center",
    },
    timerButton: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      minWidth: 100,
    },
    timerPlayButton: {
      backgroundColor: "#007AFF",
    },
    timerPauseButton: {
      backgroundColor: "#FFD700",
    },
    timerStopButton: {
      backgroundColor: "#FF6B6B",
      width: "100%",
      marginTop: 8,
    },
    timerCompleteButton: {
      backgroundColor: "#4ECDC4",
    },
    timerButtonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 14,
    },
    timerProgressBar: {
      width: "100%",
      height: 6,
      backgroundColor: isDark ? "#444" : "#eee",
      borderRadius: 3,
      overflow: "hidden",
      marginBottom: 16,
    },
    timerProgressFill: {
      height: "100%",
      backgroundColor: "#007AFF",
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#444" : "#eee",
    },
    modalTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#000",
    },
    formGroup: {
      marginBottom: 12,
    },
    formLabel: {
      fontSize: 12,
      fontWeight: "600",
      color: isDark ? "#ddd" : "#333",
      marginBottom: 4,
    },
    formInput: {
      backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5",
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
      color: isDark ? "#fff" : "#000",
      borderWidth: 1,
      borderColor: isDark ? "#444" : "#ddd",
    },
    calendarButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    calendarModal: {
      flex: 1,
      backgroundColor: "#00000080",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 16,
    },
    calendarContainer: {
      backgroundColor: isDark ? "#2a2a2a" : "#fff",
      borderRadius: 16,
      padding: 20,
      width: "100%",
      maxWidth: 400,
      maxHeight: "80%",
    },
    calendarHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    calendarTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#000",
    },
    calendarWeekdayRow: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 10,
    },
    calendarWeekday: {
      width: "14.28%",
      alignItems: "center",
      paddingVertical: 8,
      fontSize: 12,
      fontWeight: "600",
      color: isDark ? "#aaa" : "#666",
    },
    calendarDaysRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
    },
    calendarDay: {
      width: "14.28%",
      aspectRatio: 1,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      marginBottom: 8,
    },
    calendarDayText: {
      fontSize: 14,
      fontWeight: "600",
      color: isDark ? "#fff" : "#000",
    },
    calendarDaySelected: {
      backgroundColor: "#007AFF",
    },
    calendarDaySelectedText: {
      color: "#fff",
    },
    priorityContainer: {
      flexDirection: "row",
      gap: 8,
    },
    priorityOption: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: "center",
      borderWidth: 2,
    },
    formActions: {
      flexDirection: "row",
      gap: 8,
      marginTop: 12,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: isDark ? "#444" : "#eee",
    },
    saveButton: {
      flex: 1,
      backgroundColor: "#007AFF",
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: "center",
    },
    saveButtonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 14,
    },
    cancelButton: {
      flex: 1,
      backgroundColor: isDark ? "#444" : "#eee",
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: "center",
    },
    cancelButtonText: {
      color: isDark ? "#fff" : "#000",
      fontWeight: "bold",
      fontSize: 14,
    },
    errorText: {
      color: "#FF6B6B",
      fontSize: 12,
      marginTop: 4,
    },
  });

  const generateCalendarDays = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const handleDateSelect = (day: number) => {
    const [year, month] = formData.date.split("-");
    const newDate = `${year}-${month}-${String(day).padStart(2, "0")}`;
    setFormData({ ...formData, date: newDate });
    setShowCalendar(false);
  };

  const getPriorityColor = (priority: "Low" | "Medium" | "High") => {
    switch (priority) {
      case "High":
        return "#FF6B6B";
      case "Medium":
        return "#FFD700";
      case "Low":
        return "#95E1D3";
    }
  };

  const getSessionBorderColor = (priority: "Low" | "Medium" | "High") => {
    return getPriorityColor(priority);
  };

  const todaysSessions = sessions.filter((s) => s.date === today);
  const upcomingSessions = sessions.filter((s) => s.date > today).sort((a, b) => a.date.localeCompare(b.date));

  const totalSessions = sessions.length;
  const completedCount = sessions.filter((s) => s.completed).length;
  const pendingCount = sessions.filter((s) => !s.completed).length;

  const openModal = (session?: StudySession) => {
    if (session) {
      setFormData({
        subject: session.subject,
        topic: session.topic,
        date: session.date,
        time: session.time,
        duration: session.duration.toString(),
        priority: session.priority,
      });
      setEditingId(session.id);
    } else {
      setFormData({
        subject: "",
        topic: "",
        date: today,
        time: "",
        duration: "",
        priority: "Medium",
      });
      setEditingId(null);
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingId(null);
  };

  const saveSession = () => {
    if (!formData.subject.trim() || !formData.topic.trim() || !formData.time.trim() || !formData.duration.trim()) {
      return;
    }

    const duration = parseInt(formData.duration);
    if (isNaN(duration) || duration <= 0) {
      return;
    }

    if (editingId) {
      setSessions(
        sessions.map((s) =>
          s.id === editingId
            ? {
                ...s,
                subject: formData.subject,
                topic: formData.topic,
                date: formData.date,
                time: formData.time,
                duration,
                priority: formData.priority,
              }
            : s
        )
      );
    } else {
      setSessions([
        {
          id: Date.now().toString(),
          subject: formData.subject,
          topic: formData.topic,
          date: formData.date,
          time: formData.time,
          duration,
          priority: formData.priority,
          completed: false,
        },
        ...sessions,
      ]);
    }

    closeModal();
  };

  const toggleComplete = (id: string) => {
    setSessions(sessions.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s)));
  };

  const deleteSession = (id: string) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

  const startTimer = (sessionId: string, durationMinutes: number) => {
    setTimerSessionId(sessionId);
    setTimeRemaining(durationMinutes * 60);
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  };

  const resumeTimer = () => {
    setIsTimerRunning(true);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    setTimerSessionId(null);
    setTimeRemaining(0);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  };

  const playNotificationSound = useCallback(async () => {
    try {
      console.log("🔔 Starting notification sound...");
      
      // Method 1: Haptic feedback (most reliable on Expo Go)
      try {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        console.log("✓ Haptic notification played");
      } catch (e) {
        console.log("✗ Haptic error:", e);
      }

      // Method 2: Set audio mode for proper sound playback
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: false,
        });
        console.log("✓ Audio mode configured");
      } catch (e) {
        console.log("✗ Audio mode error:", e);
      }

      // Method 3: Use data URI to play beep (works in Expo Go)
      try {
        const sound = new Audio.Sound();
        // 1-second 800Hz beep in WAV format (data URI)
        const beepUri = "data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==";
        
        await sound.loadAsync({ uri: beepUri });
        await sound.playAsync();
        console.log("✓ Data URI beep played");
        
        setTimeout(() => {
          sound.unloadAsync().catch(() => {});
        }, 1500);
      } catch (e) {
        console.log("✗ Data URI beep error:", e);
      }

      // Method 4: Web Audio API beep (web browsers)
      if (typeof window !== "undefined") {
        try {
          const audioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
          if (audioContext) {
            const ctx = new audioContext();
            const now = ctx.currentTime;
            
            // Create three beeps
            for (let i = 0; i < 3; i++) {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              
              osc.connect(gain);
              gain.connect(ctx.destination);
              
              osc.frequency.value = 800;
              gain.gain.setValueAtTime(0.3, now + i * 0.3);
              gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.3 + 0.2);
              
              osc.start(now + i * 0.3);
              osc.stop(now + i * 0.3 + 0.2);
            }
            console.log("✓ Web audio beep played");
          }
        } catch (e) {
          console.log("✗ Web audio error:", e);
        }
      }
    } catch (error) {
      console.log("✗ Notification error:", error);
    }
  }, []);

  const completeTimer = () => {
    if (timerSessionId) {
      toggleComplete(timerSessionId);
      playNotificationSound();
    }
    stopTimer();
  };

  useEffect(() => {
    if (isTimerRunning && timeRemaining > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            // Play sound when timer reaches 0
            playNotificationSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (isTimerRunning && timeRemaining === 0) {
      setIsTimerRunning(false);
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isTimerRunning, timeRemaining, playNotificationSound]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("../assets/images/forstudyplanner.jpg")}
            style={styles.headerImage}
            resizeMode="cover"
          />
          <Text style={styles.headerTitle}>Study Planner</Text>
          <Text style={styles.headerSubtitle}>Plan your study sessions and stay on track.</Text>
        </View>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <MaterialIcons name="calendar-today" size={24} color="#007AFF" />
            <Text style={styles.statNumber}>{totalSessions}</Text>
            <Text style={styles.statLabel}>Total Sessions</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="check-circle" size={24} color="#4ECDC4" />
            <Text style={styles.statNumber}>{completedCount}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="schedule" size={24} color="#FFD700" />
            <Text style={styles.statNumber}>{pendingCount}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>

        {/* Add Session Button */}
        <TouchableOpacity style={styles.addButton} onPress={() => openModal()}>
          <MaterialIcons name="add-circle" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Add Study Session</Text>
        </TouchableOpacity>

        {/* Today's Study Plan */}
        {todaysSessions.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Today&apos;s Study Plan</Text>
            <FlatList
              data={todaysSessions}
              scrollEnabled={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.sessionCard,
                    { borderLeftColor: getSessionBorderColor(item.priority) },
                    item.completed && styles.completedCard,
                  ]}
                >
                  <View style={styles.sessionHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.sessionSubject}>{item.subject}</Text>
                      <Text style={styles.sessionTopic}>{item.topic}</Text>
                    </View>
                    <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
                      <Text style={styles.priorityText}>{item.priority}</Text>
                    </View>
                  </View>

                  <View style={styles.sessionDetails}>
                    <View style={styles.detailItem}>
                      <MaterialIcons name="schedule" size={14} color={isDark ? "#aaa" : "#666"} />
                      <Text style={styles.detailText}>{item.time}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <MaterialIcons name="timer" size={14} color={isDark ? "#aaa" : "#666"} />
                      <Text style={styles.detailText}>{item.duration} min</Text>
                    </View>
                  </View>

                  {item.completed && (
                    <View style={styles.completedBadge}>
                      <Text style={styles.completedBadgeText}>Completed</Text>
                    </View>
                  )}

                  <View style={styles.sessionActions}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.completeButton]}
                      onPress={() => toggleComplete(item.id)}
                    >
                      <MaterialIcons
                        name={item.completed ? "check-circle" : "radio-button-unchecked"}
                        size={14}
                        color="#007AFF"
                      />
                      <Text style={[styles.actionButtonText, { color: "#007AFF" }]}>
                        {item.completed ? "Done" : "Mark Done"}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: "#007AFF20", flex: 1 }]}
                      onPress={() => startTimer(item.id, item.duration)}
                    >
                      <MaterialIcons name="timer" size={14} color="#007AFF" />
                      <Text style={[styles.actionButtonText, { color: "#007AFF" }]}>Timer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.editButton]}
                      onPress={() => openModal(item)}
                    >
                      <MaterialIcons name="edit" size={14} color="#FFD700" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.deleteButton]}
                      onPress={() => deleteSession(item.id)}
                    >
                      <MaterialIcons name="delete" size={14} color="#FF6B6B" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </>
        )}

        {/* Upcoming Sessions */}
        {upcomingSessions.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
            <FlatList
              data={upcomingSessions}
              scrollEnabled={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.sessionCard,
                    { borderLeftColor: getSessionBorderColor(item.priority) },
                    item.completed && styles.completedCard,
                  ]}
                >
                  <View style={styles.sessionHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.sessionSubject}>{item.subject}</Text>
                      <Text style={styles.sessionTopic}>{item.topic}</Text>
                    </View>
                    <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
                      <Text style={styles.priorityText}>{item.priority}</Text>
                    </View>
                  </View>

                  <View style={styles.sessionDetails}>
                    <View style={styles.detailItem}>
                      <MaterialCommunityIcons name="calendar-outline" size={14} color={isDark ? "#aaa" : "#666"} />
                      <Text style={styles.detailText}>{formatDate(item.date)}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <MaterialCommunityIcons name="clock-outline" size={14} color={isDark ? "#aaa" : "#666"} />
                      <Text style={styles.detailText}>{item.time}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <MaterialCommunityIcons name="timer-outline" size={14} color={isDark ? "#aaa" : "#666"} />
                      <Text style={styles.detailText}>{item.duration} min</Text>
                    </View>
                  </View>

                  {item.completed && (
                    <View style={styles.completedBadge}>
                      <Text style={styles.completedBadgeText}>Completed</Text>
                    </View>
                  )}

                  <View style={styles.sessionActions}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.completeButton]}
                      onPress={() => toggleComplete(item.id)}
                    >
                      <MaterialIcons
                        name={item.completed ? "check-circle" : "radio-button-unchecked"}
                        size={14}
                        color="#007AFF"
                      />
                      <Text style={[styles.actionButtonText, { color: "#007AFF" }]}>
                        {item.completed ? "Done" : "Mark Done"}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: "#007AFF20", flex: 1 }]}
                      onPress={() => startTimer(item.id, item.duration)}
                    >
                      <MaterialIcons name="timer" size={14} color="#007AFF" />
                      <Text style={[styles.actionButtonText, { color: "#007AFF" }]}>Timer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.editButton]}
                      onPress={() => openModal(item)}
                    >
                      <MaterialIcons name="edit" size={14} color="#FFD700" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.deleteButton]}
                      onPress={() => deleteSession(item.id)}
                    >
                      <MaterialIcons name="delete" size={14} color="#FF6B6B" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </>
        )}

        {/* Empty State */}
        {sessions.length === 0 && (
          <View style={styles.emptyState}>
            <MaterialIcons name="calendar-today" size={48} color={isDark ? "#666" : "#ccc"} />
            <Text style={styles.emptyStateText}>No study sessions yet</Text>
            <Text style={styles.emptyStateSubtext}>Create a study session to start planning your study time.</Text>
          </View>
        )}
      </ScrollView>

      {/* Add/Edit Session Modal */}
      <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{editingId ? "Edit Session" : "Add Study Session"}</Text>
              <Pressable onPress={closeModal}>
                <MaterialIcons name="close" size={28} color={isDark ? "#ddd" : "#333"} />
              </Pressable>
            </View>

            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContent}
            >
              {/* Subject */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Subject</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="e.g., Web Development"
                  placeholderTextColor={isDark ? "#666" : "#999"}
                  value={formData.subject}
                  onChangeText={(text) => setFormData({ ...formData, subject: text })}
                />
              </View>

              {/* Topic */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Topic</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="e.g., React Navigation"
                  placeholderTextColor={isDark ? "#666" : "#999"}
                  value={formData.topic}
                  onChangeText={(text) => setFormData({ ...formData, topic: text })}
                />
              </View>

              {/* Date */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Date</Text>
                <TouchableOpacity
                  style={[styles.formInput, styles.calendarButton]}
                  onPress={() => setShowCalendar(true)}
                >
                  <MaterialIcons name="calendar-today" size={20} color="#007AFF" />
                  <Text style={{ color: isDark ? "#fff" : "#000", fontSize: 14 }}>
                    {formData.date}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Time */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Start Time</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="e.g., 4:00 PM"
                  placeholderTextColor={isDark ? "#666" : "#999"}
                  value={formData.time}
                  onChangeText={(text) => setFormData({ ...formData, time: text })}
                />
              </View>

              {/* Duration */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Duration (minutes)</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="e.g., 60"
                  placeholderTextColor={isDark ? "#666" : "#999"}
                  value={formData.duration}
                  onChangeText={(text) => setFormData({ ...formData, duration: text })}
                  keyboardType="decimal-pad"
                />
              </View>

              {/* Priority */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Priority</Text>
                <View style={styles.priorityContainer}>
                  {(["Low", "Medium", "High"] as const).map((level) => (
                    <Pressable
                      key={level}
                      style={[
                        styles.priorityOption,
                        {
                          flex: 1,
                          backgroundColor: formData.priority === level ? getPriorityColor(level) + "30" : isDark ? "#1a1a1a" : "#f5f5f5",
                          borderColor: formData.priority === level ? getPriorityColor(level) : isDark ? "#444" : "#ddd",
                        },
                      ]}
                      onPress={() => setFormData({ ...formData, priority: level })}
                    >
                      <Text
                        style={[
                          styles.priorityText,
                          {
                            color: formData.priority === level ? getPriorityColor(level) : isDark ? "#aaa" : "#666",
                            fontWeight: formData.priority === level ? "bold" : "600",
                          },
                        ]}
                      >
                        {level}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.formActions}>
                <TouchableOpacity style={styles.saveButton} onPress={saveSession}>
                  <Text style={styles.saveButtonText}>{editingId ? "Update Session" : "Save Session"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Calendar Picker Modal */}
      <Modal animationType="fade" transparent visible={showCalendar} onRequestClose={() => setShowCalendar(false)}>
        <View style={styles.calendarModal}>
          <View style={styles.calendarContainer}>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              {/* Calendar Header with Month/Year Navigation */}
              <View style={styles.calendarHeader}>
                <TouchableOpacity
                  onPress={() => {
                    const [year, month] = formData.date.split("-");
                    const prevMonth = parseInt(month) === 1 ? 12 : parseInt(month) - 1;
                    const prevYear = parseInt(month) === 1 ? parseInt(year) - 1 : parseInt(year);
                    setFormData({
                      ...formData,
                      date: `${prevYear}-${String(prevMonth).padStart(2, "0")}-01`,
                    });
                  }}
                >
                  <MaterialIcons name="chevron-left" size={28} color="#007AFF" />
                </TouchableOpacity>

                <Text style={styles.calendarTitle}>
                  {new Date(formData.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    const [year, month] = formData.date.split("-");
                    const nextMonth = parseInt(month) === 12 ? 1 : parseInt(month) + 1;
                    const nextYear = parseInt(month) === 12 ? parseInt(year) + 1 : parseInt(year);
                    setFormData({
                      ...formData,
                      date: `${nextYear}-${String(nextMonth).padStart(2, "0")}-01`,
                    });
                  }}
                >
                  <MaterialIcons name="chevron-right" size={28} color="#007AFF" />
                </TouchableOpacity>
              </View>

              {/* Weekday Headers */}
              <View style={styles.calendarWeekdayRow}>
                {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
                  <Text key={idx} style={styles.calendarWeekday}>
                    {day}
                  </Text>
                ))}
              </View>

              {/* Calendar Days Grid */}
              <View style={styles.calendarDaysRow}>
                {generateCalendarDays(formData.date).map((day, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={[
                      styles.calendarDay,
                      day && formData.date.endsWith(`-${String(day).padStart(2, "0")}`) ? styles.calendarDaySelected : null,
                    ]}
                    onPress={() => day && handleDateSelect(day)}
                    disabled={!day}
                  >
                    {day && (
                      <Text
                        style={[
                          styles.calendarDayText,
                          formData.date.endsWith(`-${String(day).padStart(2, "0")}`) ? styles.calendarDaySelectedText : null,
                        ]}
                      >
                        {day}
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              {/* Close Button */}
              <TouchableOpacity
                style={[styles.saveButton, { marginTop: 20, marginBottom: 0 }]}
                onPress={() => setShowCalendar(false)}
              >
                <Text style={styles.saveButtonText}>Done</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Timer Modal */}
      <Modal
        animationType="fade"
        transparent
        visible={timerSessionId !== null}
        onRequestClose={stopTimer}
      >
        <View style={styles.timerModal}>
          <View style={styles.timerContainer}>
            {timerSessionId && (
              <>
                <Text style={styles.timerTitle}>
                  {sessions.find((s) => s.id === timerSessionId)?.subject}
                </Text>
                <Text style={styles.timerSubtitle}>
                  {sessions.find((s) => s.id === timerSessionId)?.topic}
                </Text>

                {/* Progress Bar */}
                <View style={styles.timerProgressBar}>
                  <View
                    style={[
                      styles.timerProgressFill,
                      {
                        width: `${
                          100 *
                          (1 -
                            timeRemaining /
                              (sessions.find((s) => s.id === timerSessionId)?.duration ?? 1) /
                              60)
                        }%`,
                      },
                    ]}
                  />
                </View>

                {/* Timer Display */}
                <Text style={styles.timerDisplay}>{formatTime(timeRemaining)}</Text>

                {/* Control Buttons */}
                <View style={styles.timerControlsRow}>
                  {!isTimerRunning ? (
                    <TouchableOpacity
                      style={[styles.timerButton, styles.timerPlayButton]}
                      onPress={resumeTimer}
                    >
                      <MaterialIcons name="play-arrow" size={20} color="#fff" />
                      <Text style={styles.timerButtonText}>Start</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={[styles.timerButton, styles.timerPauseButton]}
                      onPress={pauseTimer}
                    >
                      <MaterialIcons name="pause" size={20} color="#fff" />
                      <Text style={styles.timerButtonText}>Pause</Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    style={[styles.timerButton, styles.timerCompleteButton]}
                    onPress={completeTimer}
                  >
                    <MaterialIcons name="check" size={20} color="#fff" />
                    <Text style={styles.timerButtonText}>Complete</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={[styles.timerButton, styles.timerStopButton]}
                  onPress={stopTimer}
                >
                  <MaterialIcons name="close" size={20} color="#fff" />
                  <Text style={styles.timerButtonText}>Stop</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
