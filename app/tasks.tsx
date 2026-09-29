import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export default function TasksScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Read Chapter 3 of Textbook", completed: false },
    { id: "2", title: "Complete Math Assignment", completed: true },
    { id: "3", title: "Submit Project Report", completed: false },
    { id: "4", title: "Prepare for Quiz", completed: false },
    { id: "5", title: "Group Meeting - Monday 3PM", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#1a1a1a" : "#f9f9f9",
    },
    content: {
      padding: 16,
    },
    inputContainer: {
      flexDirection: "row",
      marginBottom: 16,
      gap: 8,
    },
    input: {
      flex: 1,
      backgroundColor: isDark ? "#2a2a2a" : "#fff",
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      color: isDark ? "#fff" : "#000",
      borderWidth: 1,
      borderColor: isDark ? "#444" : "#ddd",
    },
    addButton: {
      backgroundColor: "#007AFF",
      borderRadius: 8,
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
      minWidth: 50,
    },
    taskCard: {
      backgroundColor: isDark ? "#2a2a2a" : "#fff",
      borderRadius: 8,
      padding: 12,
      marginBottom: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    taskContent: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    taskText: {
      flex: 1,
      fontSize: 16,
      color: isDark ? "#fff" : "#000",
    },
    taskTextCompleted: {
      textDecorationLine: "line-through",
      color: isDark ? "#888" : "#aaa",
    },
    deleteButton: {
      padding: 8,
    },
    emptyText: {
      textAlign: "center",
      color: isDark ? "#888" : "#aaa",
      marginTop: 32,
      fontSize: 16,
    },
  });

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), title: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
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

        {/* Task List */}
        {tasks.length === 0 ? (
          <Text style={styles.emptyText}>No tasks yet. Create one to get started!</Text>
        ) : (
          <FlatList
            data={tasks}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.taskCard}>
                <View style={styles.taskContent}>
                  <TouchableOpacity onPress={() => toggleTask(item.id)}>
                    <MaterialIcons
                      name={item.completed ? "check-circle" : "radio-button-unchecked"}
                      size={24}
                      color={item.completed ? "#4ECDC4" : "#999"}
                    />
                  </TouchableOpacity>
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
      </View>
    </View>
  );
}
