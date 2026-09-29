import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

interface Grade {
  id: string;
  course: string;
  score: number;
}

export default function GradesScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [grades, setGrades] = useState<Grade[]>([
    { id: "1", course: "Mathematics", score: 88 },
    { id: "2", course: "English Literature", score: 92 },
    { id: "3", course: "Physics", score: 78 },
  ]);

  const [courseName, setCourseName] = useState("");
  const [courseScore, setCourseScore] = useState("");

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
    inputGroup: {
      marginBottom: 12,
    },
    label: {
      fontSize: 14,
      fontWeight: "600",
      color: isDark ? "#ddd" : "#333",
      marginBottom: 6,
    },
    input: {
      backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5",
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      color: isDark ? "#fff" : "#000",
      borderWidth: 1,
      borderColor: isDark ? "#444" : "#ddd",
      marginBottom: 8,
    },
    inputRow: {
      flexDirection: "row",
      gap: 8,
      marginTop: 8,
    },
    addButton: {
      backgroundColor: "#007AFF",
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 16,
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    addButtonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 14,
    },
    gradeCard: {
      backgroundColor: isDark ? "#2a2a2a" : "#fff",
      borderRadius: 8,
      padding: 12,
      marginBottom: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderLeftWidth: 4,
    },
    gradeInfo: {
      flex: 1,
    },
    courseName: {
      fontSize: 16,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#000",
      marginBottom: 4,
    },
    scoreText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#007AFF",
    },
    deleteButton: {
      padding: 8,
    },
    statsText: {
      fontSize: 14,
      color: isDark ? "#aaa" : "#666",
      marginBottom: 12,
    },
    emptyText: {
      textAlign: "center",
      color: isDark ? "#888" : "#aaa",
      marginTop: 32,
      fontSize: 16,
    },
  });

  const addGrade = () => {
    if (courseName.trim() && courseScore.trim()) {
      const score = parseFloat(courseScore);
      if (!isNaN(score) && score >= 0 && score <= 100) {
        setGrades([
          ...grades,
          { id: Date.now().toString(), course: courseName, score },
        ]);
        setCourseName("");
        setCourseScore("");
      }
    }
  };

  const deleteGrade = (id: string) => {
    setGrades(grades.filter((g) => g.id !== id));
  };

  const averageGrade =
    grades.length > 0
      ? (grades.reduce((sum, g) => sum + g.score, 0) / grades.length).toFixed(1)
      : 0;

  const getGradeColor = (score: number) => {
    if (score >= 90) return "#4ECDC4";
    if (score >= 80) return "#95E1D3";
    if (score >= 70) return "#FFE66D";
    return "#FF6B6B";
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Average Grade */}
      <View style={styles.card}>
        <Text style={styles.label}>Overall Average</Text>
        <Text style={{ fontSize: 36, fontWeight: "bold", color: "#007AFF" }}>
          {averageGrade}%
        </Text>
        <Text style={styles.statsText}>
          {grades.length} course{grades.length !== 1 ? "s" : ""}
        </Text>
      </View>

      {/* Add Grade Form */}
      <View style={styles.card}>
        <Text style={styles.label}>Add a New Grade</Text>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Course name (e.g., Mathematics)"
            placeholderTextColor={isDark ? "#666" : "#999"}
            value={courseName}
            onChangeText={setCourseName}
          />
          <TextInput
            style={styles.input}
            placeholder="Score (0-100)"
            placeholderTextColor={isDark ? "#666" : "#999"}
            value={courseScore}
            onChangeText={setCourseScore}
            keyboardType="decimal-pad"
          />

          <TouchableOpacity style={styles.addButton} onPress={addGrade}>
            <Text style={styles.addButtonText}>+ Add Grade</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Grade List */}
      <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8, color: isDark ? "#fff" : "#000" }}>
        Your Grades
      </Text>

      {grades.length === 0 ? (
        <Text style={styles.emptyText}>No grades yet. Add one to get started!</Text>
      ) : (
        <FlatList
          data={grades}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.gradeCard,
                { borderLeftColor: getGradeColor(item.score) },
              ]}
            >
              <View style={styles.gradeInfo}>
                <Text style={styles.courseName}>{item.course}</Text>
                <Text style={styles.scoreText}>{item.score}%</Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteGrade(item.id)}
              >
                <MaterialIcons name="delete" size={20} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </ScrollView>
  );
}
