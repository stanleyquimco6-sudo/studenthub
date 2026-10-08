import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
    Image,
    ScrollView,
} from "react-native";
import {
  BorderRadius,
  Colors,
  Padding,
  Spacing,
  Typography,
} from "../constants";

interface Task {
  id: string;
  title: string;
  subject: string;
  completed: boolean;
}

export default function TasksScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Read Chapter 3 of Textbook",
      subject: "Literature",
      completed: false,
    },
    {
      id: "2",
      title: "Complete Math Assignment",
      subject: "Mathematics",
      completed: true,
    },
    {
      id: "3",
      title: "Submit Project Report",
      subject: "Science",
      completed: false,
    },
    {
      id: "4",
      title: "Prepare for Quiz",
      subject: "History",
      completed: false,
    },
    {
      id: "5",
      title: "Group Meeting Discussion",
      subject: "Computer Science",
      completed: false,
    },
    {
      id: "6",
      title: "Write Essay Outline",
      subject: "English",
      completed: false,
    },
    { id: "3", title: "Submit Project Report", completed: false },
    { id: "4", title: "Prepare for Quiz", completed: false },
    { id: "5", title: "Laravel Projet", completed: false },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskSubject, setNewTaskSubject] = useState("");
  const [modalError, setModalError] = useState("");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
    },
    safeArea: {
      flex: 1,
    },
    content: {
      padding: Spacing.lg,
      flex: 1,
    },
    header: {
      marginBottom: Spacing.lg,
    },
    headerTitle: {
      fontSize: Typography.sizes.h3,
      fontWeight: "700",
      color: isDark ? Colors.dark.text : Colors.light.text,
      marginBottom: Spacing.sm,
    },
    statsContainer: {
    headerImage: {
      width: "100%",
      height: 180,
      borderRadius: 12,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
      resizeMode: "cover",
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#000",
      marginBottom: 12,
    },
    headerSubtitle: {
      fontSize: 14,
      color: isDark ? "#aaa" : "#666",
      marginBottom: 16,
    },
    inputContainer: {
      flexDirection: "row",
      gap: Spacing.md,
      marginBottom: Spacing.lg,
    },
    statCard: {
      flex: 1,
      backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
      borderRadius: BorderRadius.lg,
      padding: Spacing.md,
      alignItems: "center",
      borderWidth: 1,
      borderColor: isDark ? Colors.dark.border : Colors.light.border,
    },
    statNumber: {
      fontSize: Typography.sizes.h2,
      fontWeight: "700",
      color: Colors.primary,
      marginVertical: Spacing.xs,
    },
    statLabel: {
      fontSize: Typography.sizes.caption,
      color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary,
      textAlign: "center",
    },
    addButton: {
      backgroundColor: Colors.primary,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: BorderRadius.lg,
      paddingVertical: Spacing.md,
      marginBottom: Spacing.lg,
      gap: Spacing.sm,
    },
    addButtonText: {
      color: "#fff",
      fontSize: Typography.sizes.body,
      fontWeight: "600",
    },
    taskListContainer: {
      flex: 1,
    },
    taskCard: {
      backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
      borderRadius: BorderRadius.lg,
      padding: Spacing.md,
      marginBottom: Spacing.md,
      borderLeftWidth: 4,
      borderLeftColor: Colors.primary,
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.md,
      borderWidth: 1,
      borderColor: isDark ? Colors.dark.border : Colors.light.border,
    },
    taskCardCompleted: {
      borderLeftColor: Colors.success,
      opacity: 0.7,
    },
    checkboxContainer: {
      width: 28,
      height: 28,
      justifyContent: "center",
      alignItems: "center",
    },
    taskContent: {
      flex: 1,
      justifyContent: "center",
    },
    taskTitle: {
      fontSize: Typography.sizes.h5,
      fontWeight: "600",
      color: isDark ? Colors.dark.text : Colors.light.text,
      marginBottom: Spacing.xs,
    },
    taskTitleCompleted: {
      textDecorationLine: "line-through",
      color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary,
    },
    taskSubject: {
      fontSize: Typography.sizes.caption,
      color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary,
      fontWeight: "500",
    },
    taskActions: {
      flexDirection: "row",
      gap: Spacing.md,
      alignItems: "center",
    },
    deleteButton: {
      padding: Spacing.sm,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: Spacing.lg,
    },
    emptyIcon: {
      marginBottom: Spacing.lg,
    },
    emptyTitle: {
      fontSize: Typography.sizes.h4,
      fontWeight: "600",
      color: isDark ? Colors.dark.text : Colors.light.text,
      marginBottom: Spacing.md,
      textAlign: "center",
    },
    emptyText: {
      fontSize: Typography.sizes.body,
      color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary,
      textAlign: "center",
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: Spacing.lg,
    },
    modalContent: {
      backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
      borderRadius: BorderRadius.xl,
      padding: Spacing.lg,
      width: "100%",
      maxWidth: 400,
      borderWidth: 1,
      borderColor: isDark ? Colors.dark.border : Colors.light.border,
    },
    modalTitle: {
      fontSize: Typography.sizes.h4,
      fontWeight: "700",
      color: isDark ? Colors.dark.text : Colors.light.text,
      marginBottom: Spacing.lg,
    },
    modalInput: {
      backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: isDark ? Colors.dark.border : Colors.light.border,
      paddingHorizontal: Padding.input,
      paddingVertical: Padding.input,
      color: isDark ? Colors.dark.text : Colors.light.text,
      fontSize: Typography.sizes.body,
      marginBottom: Spacing.md,
    },
    modalInputLabel: {
      fontSize: Typography.sizes.body,
      fontWeight: "600",
      color: isDark ? Colors.dark.text : Colors.light.text,
      marginBottom: Spacing.sm,
    },
    errorText: {
      fontSize: Typography.sizes.caption,
      color: Colors.error,
      marginBottom: Spacing.md,
    },
    modalButtonContainer: {
      flexDirection: "row",
      gap: Spacing.md,
      marginTop: Spacing.lg,
    },
    modalButton: {
      flex: 1,
      paddingVertical: Padding.button,
      borderRadius: BorderRadius.md,
      justifyContent: "center",
      alignItems: "center",
    },
    modalButtonPrimary: {
      backgroundColor: Colors.primary,
    },
    modalButtonSecondary: {
      backgroundColor: isDark ? Colors.dark.border : Colors.light.border,
    },
    modalButtonText: {
      fontWeight: "600",
      fontSize: Typography.sizes.body,
    },
    modalButtonPrimaryText: {
      color: "#fff",
    },
    modalButtonSecondaryText: {
      color: isDark ? Colors.dark.text : Colors.light.text,
    },
    flatListContent: {
      paddingBottom: Spacing.lg,
    },
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  const addTask = () => {
    setModalError("");

    if (!newTaskTitle.trim()) {
      setModalError("Task title is required");
      return;
    }

    if (!newTaskSubject.trim()) {
      setModalError("Subject is required");
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      subject: newTaskSubject.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    setNewTaskSubject("");
    setShowModal(false);
    if (newTask.trim()) {
      setTasks([{ id: Date.now().toString(), title: newTask, completed: false }, ...tasks]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const closeModal = () => {
    setShowModal(false);
    setNewTaskTitle("");
    setNewTaskSubject("");
    setModalError("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Tasks</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <MaterialCommunityIcons
              name="text-box-multiple-outline"
              size={24}
              color={Colors.primary}
            />
            <Text style={styles.statNumber}>{tasks.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons
              name="check-circle-outline"
              size={24}
              color={Colors.success}
            />
            <Text style={styles.statNumber}>{completedCount}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={24}
              color={Colors.warning}
            />
            <Text style={styles.statNumber}>{pendingCount}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowModal(true)}
        >
          <MaterialCommunityIcons
            name="plus"
            size={24}
            color="#fff"
          />
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <Image
          source={require("../assets/images/fortask.jpg")}
          style={styles.headerImage}
          resizeMode="cover"
        />

        <Text style={styles.headerTitle}>My Tasks</Text>
        <Text style={styles.headerSubtitle}>Stay organized and track your progress</Text>

        {/* Task Stats */}
        <Text
          style={{
            fontSize: 14,
            color: isDark ? "#aaa" : "#666",
            marginBottom: 12,
          }}
        >
          {completedCount} of {tasks.length} completed
        </Text>

        {/* Input for new task */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a new task..."
            placeholderTextColor={isDark ? "#666" : "#999"}
            value={newTask}
            onChangeText={setNewTask}
            onSubmitEditing={addTask}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <MaterialIcons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.taskListContainer}>
          {tasks.length === 0 ? (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIcon}>
                <MaterialCommunityIcons
                  name="text-box-multiple-outline"
                  size={48}
                  color={
                    isDark
                      ? Colors.dark.textSecondary
                      : Colors.light.textSecondary
                  }
                />
              </View>
              <Text style={styles.emptyTitle}>No tasks yet</Text>
              <Text style={styles.emptyText}>
                Add a task to start organizing your school work.
              </Text>
            </View>
          ) : (
            <FlatList
              data={tasks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.taskCard,
                    item.completed && styles.taskCardCompleted,
                  ]}
                >
                  <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => toggleTaskCompletion(item.id)}
                  >
                    <MaterialCommunityIcons
                      name={
                        item.completed
                          ? "check-circle"
                          : "checkbox-blank-outline"
                      }
                      size={24}
                      color={
                        item.completed ? Colors.success : Colors.primary
                      }
                    />
                  </TouchableOpacity>

                  <View style={styles.taskContent}>
                    <Text
                      style={[
                        styles.taskTitle,
                        item.completed && styles.taskTitleCompleted,
                      ]}
                    >
                      {item.title}
                    </Text>
                    <Text style={styles.taskSubject}>{item.subject}</Text>
                  </View>

                  <View style={styles.taskActions}>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => deleteTask(item.id)}
                    >
                      <MaterialCommunityIcons
                        name="delete-outline"
                        size={20}
                        color={Colors.error}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              contentContainerStyle={styles.flatListContent}
              scrollEnabled={true}
            />
          )}
        </View>
      </View>

      <Modal
        visible={showModal}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Task</Text>

            <Text style={styles.modalInputLabel}>Task Title</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter task title"
              placeholderTextColor={
                isDark
                  ? Colors.dark.textSecondary
                  : Colors.light.textSecondary
              }
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
            />

            <Text style={styles.modalInputLabel}>Subject</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter subject"
              placeholderTextColor={
                isDark
                  ? Colors.dark.textSecondary
                  : Colors.light.textSecondary
              }
              value={newTaskSubject}
              onChangeText={setNewTaskSubject}
            />

            {modalError ? (
              <Text style={styles.errorText}>{modalError}</Text>
            ) : null}

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonSecondary]}
                onPress={closeModal}
              >
                <Text style={styles.modalButtonSecondaryText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonPrimary]}
                onPress={addTask}
              >
                <Text
                  style={[
                    styles.modalButtonText,
                    styles.modalButtonPrimaryText,
                  ]}
                >
                  Add Task
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
                  <Text
                    style={[
                      styles.taskText,
                      item.completed && styles.taskTextCompleted,
                    ]}
                  >
                    {item.title}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteTask(item.id)}
                >
                  <MaterialIcons name="delete" size={20} color="#FF6B6B" />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </ScrollView>
    </View>
  );
}
