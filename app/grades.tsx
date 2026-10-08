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
} from "react-native";
import { useState } from "react";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

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
      subject: "Web Development",
      topic: "React Native Navigation",
      date: today,
      time: "4:00 PM",
      duration: 60,
      priority: "High",
      completed: false,
    },
    {
      id: "2",
      subject: "Database Systems",
      topic: "SQL Relationships",
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
      topic: "TypeScript Basics",
      date: nextDay,
      time: "5:00 PM",
      duration: 90,
      priority: "High",
      completed: false,
    },
    {
      id: "5",
      subject: "System Analysis",
      topic: "Design Patterns",
      date: today,
      time: "2:00 PM",
      duration: 45,
      priority: "Medium",
      completed: true,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
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
      paddingBottom: 24,
      paddingTop: 16,
      maxHeight: "90%",
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#444" : "#eee",
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#000",
    },
    formGroup: {
      marginBottom: 16,
    },
    formLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: isDark ? "#ddd" : "#333",
      marginBottom: 6,
    },
    formInput: {
      backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5",
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      color: isDark ? "#fff" : "#000",
      borderWidth: 1,
      borderColor: isDark ? "#444" : "#ddd",
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
      marginTop: 20,
    },
    saveButton: {
      flex: 1,
      backgroundColor: "#007AFF",
      paddingVertical: 12,
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
      paddingVertical: 12,
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
        ...sessions,
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

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
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
            <Text style={styles.sectionTitle}>Today's Study Plan</Text>
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

            <ScrollView showsVerticalScrollIndicator={false}>
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
                <TextInput
                  style={styles.formInput}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor={isDark ? "#666" : "#999"}
                  value={formData.date}
                  onChangeText={(text) => setFormData({ ...formData, date: text })}
                />
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
    </SafeAreaView>
  );
}
