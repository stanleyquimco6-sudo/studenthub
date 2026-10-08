import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  useColorScheme,
  Image,
} from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

interface Note {
  id: string;
  subject: string;
  title: string;
  content: string;
}

export default function NotesScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      subject: "Soc Sci 104",
      title: "Reporting KeyPoints",
      content: "Legal Grounds, Statement of Facts",
    },
    {
      id: "2",
      subject: "ITM 112",
      title: "Laravel Migrations",
      content: "php artisan make:migration create_students_table",
    },
  ]);

  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#1a1a1a" : "#f9f9f9",
    },
    content: {
      padding: 16,
    },
    headerImage: {
      width: "100%",
      height: 160,
      borderRadius: 10,
      marginBottom: 10,
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
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 14,
      color: isDark ? "#aaa" : "#666",
      marginBottom: 16,
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
    textArea: {
      minHeight: 80,
      textAlignVertical: "top",
    },
    addButton: {
      backgroundColor: "#007AFF",
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 8,
    },
    addButtonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
    noteCard: {
      backgroundColor: isDark ? "#2a2a2a" : "#fff",
      borderRadius: 8,
      padding: 12,
      marginBottom: 8,
      borderLeftWidth: 4,
      borderLeftColor: "#95E1D3",
    },
    noteHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 8,
    },
    noteSubject: {
      fontSize: 12,
      fontWeight: "600",
      backgroundColor: isDark ? "#444" : "#f0f0f0",
      color: isDark ? "#95E1D3" : "#007AFF",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      alignSelf: "flex-start",
    },
    noteTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#000",
      marginBottom: 6,
      flex: 1,
    },
    noteContent: {
      fontSize: 14,
      color: isDark ? "#aaa" : "#666",
      lineHeight: 20,
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
    noteCount: {
      fontSize: 14,
      color: isDark ? "#aaa" : "#666",
      marginBottom: 12,
    },
  });

  const addNote = () => {
    if (subject.trim() && title.trim() && content.trim()) {
      setNotes([
        { id: Date.now().toString(), subject, title, content },
        ...notes,
      ]);
      setSubject("");
      setTitle("");
      setContent("");
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header Image */}
      <Image
        source={require("../assets/images/fornotes.png")}
        style={styles.headerImage}
        resizeMode="cover"
      />

      <Text style={styles.headerTitle}>My Notes</Text>
      <Text style={styles.headerSubtitle}>Capture your learning moments</Text>

      {/* Add Note Form */}
      <View style={styles.card}>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 12, color: isDark ? "#fff" : "#000" }}>
          Create a New Note
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Subject</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Mathematics, English"
            placeholderTextColor={isDark ? "#666" : "#999"}
            value={subject}
            onChangeText={setSubject}
          />

          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Note title"
            placeholderTextColor={isDark ? "#666" : "#999"}
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Content</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Write your notes here..."
            placeholderTextColor={isDark ? "#666" : "#999"}
            value={content}
            onChangeText={setContent}
            multiline
          />

          <TouchableOpacity style={styles.addButton} onPress={addNote}>
            <Text style={styles.addButtonText}>+ Save Note</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Notes List */}
      <Text style={styles.noteCount}>
        {notes.length} note{notes.length !== 1 ? "s" : ""}
      </Text>

      {notes.length === 0 ? (
        <Text style={styles.emptyText}>No notes yet. Create one to get started!</Text>
      ) : (
        <FlatList
          data={notes}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.noteCard}>
              <View style={styles.noteHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.noteSubject}>{item.subject}</Text>
                  <Text style={styles.noteTitle}>{item.title}</Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteNote(item.id)}
                >
                  <MaterialIcons name="delete" size={20} color="#FF6B6B" />
                </TouchableOpacity>
              </View>
              <Text style={styles.noteContent}>{item.content}</Text>
            </View>
          )}
        />
      )}
    </ScrollView>
  );
}
