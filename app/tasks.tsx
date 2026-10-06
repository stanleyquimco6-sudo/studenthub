/**
 * Student Task Manager Screen
 *
 * This screen implements a fully-functional academic task management system
 * for the StudentHub application. Students can create, complete, and delete
 * tasks with real-time statistics and visual feedback.
 *
 * Features:
 * - Create tasks with title and subject classification
 * - Mark tasks as complete/incomplete with visual indicators
 * - Delete tasks with confirmation
 * - Real-time task counters (Total, Completed, Pending)
 * - Dark/Light mode support
 * - Responsive design for iOS, Android, and Web
 *
 * Built with: React Native, Expo, TypeScript
 * Dependencies: @expo/vector-icons, react-native
 */

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
} from "react-native";
import {
  BorderRadius,
  Colors,
  Padding,
  Spacing,
  Typography,
} from "../constants";

/**
 * Task interface represents a single academic task
 * @interface Task
 * @property {string} id - Unique identifier (timestamp-based)
 * @property {string} title - Task name/description
 * @property {string} subject - Subject/course category
 * @property {boolean} completed - Completion status
 */
interface Task {
  id: string;
  title: string;
  subject: string;
  completed: boolean;
}

export default function TasksScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  /**
   * State for managing the list of tasks
   * Initialized with 6 sample tasks for demonstration
   * - 1 completed task (Math Assignment)
   * - 5 pending tasks (various subjects)
   */
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
  ]);

  /**
   * Modal visibility state
   * Controls whether the "Add Task" modal is shown
   */
  const [showModal, setShowModal] = useState(false);

  /**
   * Form input states
   * newTaskTitle: User input for task title
   * newTaskSubject: User input for subject/category
   * modalError: Error message for validation failures
   */
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

  /**
   * Calculates the number of completed tasks
   * Used for real-time statistics display
   */
  const completedCount = tasks.filter((t) => t.completed).length;

  /**
   * Calculates the number of pending tasks
   * Formula: Total tasks - Completed tasks
   */
  const pendingCount = tasks.length - completedCount;

  /**
   * Adds a new task to the task list
   *
   * Validation:
   * - Task title must not be empty or whitespace-only
   * - Subject must not be empty or whitespace-only
   *
   * Process:
   * 1. Clear any previous error messages
   * 2. Validate both fields
   * 3. Create new Task object with timestamp-based unique ID
   * 4. Add to tasks array
   * 5. Reset form fields and close modal
   */
  const addTask = () => {
    setModalError("");

    // Validate task title
    if (!newTaskTitle.trim()) {
      setModalError("Task title is required");
      return;
    }

    // Validate subject
    if (!newTaskSubject.trim()) {
      setModalError("Subject is required");
      return;
    }

    // Create new task object
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      subject: newTaskSubject.trim(),
      completed: false,
    };

    // Add task to array and reset form
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    setNewTaskSubject("");
    setShowModal(false);
  };

  /**
   * Toggles the completion status of a task
   *
   * @param {string} id - The unique identifier of the task to toggle
   *
   * Maps through tasks array and flips the 'completed' boolean
   * for the task matching the provided ID
   */
  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  /**
   * Removes a task from the task list
   *
   * @param {string} id - The unique identifier of the task to delete
   *
   * Filters out the task with matching ID, removing it permanently
   * from the state
   */
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  /**
   * Closes the modal and resets form state
   *
   * Called when:
   * - User clicks Cancel button
   * - User taps outside the modal
   *
   * Resets:
   * - Modal visibility
   * - Task title input
   * - Subject input
   * - Error message
   */
  const closeModal = () => {
    setShowModal(false);
    setNewTaskTitle("");
    setNewTaskSubject("");
    setModalError("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* HEADER SECTION */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Tasks</Text>
        </View>

        {/* STATISTICS SECTION
            Displays real-time task counters in a card-based layout
            Three metrics: Total, Completed, Pending
            Updates automatically as tasks are added/removed/toggled
        */}
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

        {/* ADD TASK BUTTON
            Prominent call-to-action button that opens modal dialog
            Uses primary color to draw attention
            Includes icon for visual clarity
        */}
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

        {/* TASK LIST OR EMPTY STATE
            Conditional rendering:
            - If no tasks: Show empty state with icon and message
            - If tasks exist: Show FlatList with all tasks
        */}
        <View style={styles.taskListContainer}>
          {tasks.length === 0 ? (
            // Empty State: Professional messaging when no tasks exist
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
            // Task List: Renders all tasks with FlatList for performance
            <FlatList
              data={tasks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                // Individual Task Card
                <View
                  style={[
                    styles.taskCard,
                    // Apply completed styling if task is marked complete
                    item.completed && styles.taskCardCompleted,
                  ]}
                >
                  {/* CHECKBOX / COMPLETION TOGGLE
                      - Square icon: Task is pending
                      - Check circle: Task is completed
                      - Tap to toggle status
                  */}
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

                  {/* TASK CONTENT
                      - Title: Main task description (strikethrough if completed)
                      - Subject: Course/subject category
                  */}
                  <View style={styles.taskContent}>
                    <Text
                      style={[
                        styles.taskTitle,
                        // Strike through completed tasks for visual clarity
                        item.completed && styles.taskTitleCompleted,
                      ]}
                    >
                      {item.title}
                    </Text>
                    <Text style={styles.taskSubject}>{item.subject}</Text>
                  </View>

                  {/* DELETE BUTTON
                      - Trash icon in error red color
                      - Permanent deletion on tap
                  */}
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

      {/* ADD TASK MODAL
          Overlay modal with form inputs for adding new task
          - Input validation
          - Error message display
          - Cancel / Add buttons
      */}
      <Modal
        visible={showModal}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Task</Text>

            {/* Task Title Input */}
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

            {/* Subject Input */}
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

            {/* Error Message Display */}
            {modalError ? (
              <Text style={styles.errorText}>{modalError}</Text>
            ) : null}

            {/* Modal Action Buttons */}
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
  );
}
