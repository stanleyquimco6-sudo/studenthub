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

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function NotesScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "ITM 110",
      content:
        "Assemble/Disassemble Computer",
      createdAt: "Oct 6, 2026 • 8:30 AM",
    },
    {
      id: "2",
      title: "SocSci 104",
      content:
        "Reporting of the given Topic",
      createdAt: "Oct 5, 2026 • 2:15 PM",
    },
    {
      id: "3",
      title: "ITM 112",
      content:
        "Examination",
      createdAt: "Oct 4, 2026 • 11:45 AM",
    },
    {
      id: "4",
      title: "HUM 102",
      content:
        "Reporting Group 3",
      createdAt: "Oct 3, 2026 • 3:20 PM",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
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
    header: {
      marginBottom: Spacing.lg,
    },
    headerTitle: {
      fontSize: Typography.sizes.h3,
      fontWeight: "700",
      color: isDark ? Colors.dark.text : Colors.light.text,
      marginBottom: Spacing.sm,
    },
    headerSubtitle: {
      fontSize: Typography.sizes.body,
      color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary,
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
    notesListContainer: {
      flex: 1,
    },
    noteCard: {
      backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
      borderRadius: BorderRadius.lg,
      padding: Spacing.md,
      marginBottom: Spacing.md,
      borderLeftWidth: 4,
      borderLeftColor: Colors.primary,
      borderWidth: 1,
      borderColor: isDark ? Colors.dark.border : Colors.light.border,
    },
    noteCardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: Spacing.sm,
    },
    noteTitle: {
      fontSize: Typography.sizes.h5,
      fontWeight: "600",
      color: isDark ? Colors.dark.text : Colors.light.text,
      flex: 1,
      marginRight: Spacing.md,
    },
    noteActions: {
      flexDirection: "row",
      gap: Spacing.sm,
      alignItems: "center",
    },
    actionButton: {
      padding: Spacing.sm,
      borderRadius: BorderRadius.md,
    },
    editButton: {
      backgroundColor: isDark
        ? "rgba(122, 200, 250, 0.1)"
        : "rgba(0, 122, 255, 0.1)",
    },
    deleteButton: {
      backgroundColor: isDark
        ? "rgba(255, 107, 107, 0.1)"
        : "rgba(255, 107, 107, 0.1)",
    },
    noteContent: {
      fontSize: Typography.sizes.body,
      color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary,
      lineHeight: 20,
      marginBottom: Spacing.sm,
    },
    noteDate: {
      fontSize: Typography.sizes.caption,
      color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary,
      fontWeight: "500",
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
      maxHeight: "85%",
    },
    modalTitle: {
      fontSize: Typography.sizes.h4,
      fontWeight: "700",
      color: isDark ? Colors.dark.text : Colors.light.text,
      marginBottom: Spacing.lg,
    },
    modalInputLabel: {
      fontSize: Typography.sizes.body,
      fontWeight: "600",
      color: isDark ? Colors.dark.text : Colors.light.text,
      marginBottom: Spacing.sm,
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
    modalContentInput: {
      height: 150,
      textAlignVertical: "top",
      paddingTop: Padding.input,
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

  const formatDateTime = (): string => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return now.toLocaleDateString("en-US", options);
  };

  const truncateContent = (content: string, maxLength: number = 100): string => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  const openAddModal = () => {
    setEditingNoteId(null);
    setNoteTitle("");
    setNoteContent("");
    setModalError("");
    setShowModal(true);
  };

  const openEditModal = (note: Note) => {
    setEditingNoteId(note.id);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setModalError("");
    setShowModal(true);
  };

  const saveNote = () => {
    setModalError("");

    if (!noteTitle.trim()) {
      setModalError("Note title is required");
      return;
    }

    if (!noteContent.trim()) {
      setModalError("Note content is required");
      return;
    }

    if (editingNoteId) {
      setNotes(
        notes.map((note) =>
          note.id === editingNoteId
            ? {
                ...note,
                title: noteTitle.trim(),
                content: noteContent.trim(),
                createdAt: formatDateTime(),
              }
            : note
        )
      );
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        title: noteTitle.trim(),
        content: noteContent.trim(),
        createdAt: formatDateTime(),
      };
      setNotes([newNote, ...notes]);
    }

    closeModal();
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingNoteId(null);
    setNoteTitle("");
    setNoteContent("");
    setModalError("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Notes</Text>
          <Text style={styles.headerSubtitle}>
            {notes.length} {notes.length === 1 ? "note" : "notes"}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={openAddModal}
        >
          <MaterialCommunityIcons name="plus" size={24} color="#fff" />
          <Text style={styles.addButtonText}>New Note</Text>
        </TouchableOpacity>

        <View style={styles.notesListContainer}>
          {notes.length === 0 ? (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIcon}>
                <MaterialCommunityIcons
                  name="file-document-outline"
                  size={56}
                  color={
                    isDark
                      ? Colors.dark.textSecondary
                      : Colors.light.textSecondary
                  }
                />
              </View>
              <Text style={styles.emptyTitle}>No notes yet</Text>
              <Text style={styles.emptyText}>
                Create a note to keep track of your lessons and important
                information.
              </Text>
            </View>
          ) : (
            <FlatList
              data={notes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.noteCard}>
                  <View style={styles.noteCardHeader}>
                    <Text style={styles.noteTitle} numberOfLines={2}>
                      {item.title}
                    </Text>
                    <View style={styles.noteActions}>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.editButton]}
                        onPress={() => openEditModal(item)}
                      >
                        <MaterialCommunityIcons
                          name="pencil"
                          size={20}
                          color={Colors.primary}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={() => deleteNote(item.id)}
                      >
                        <MaterialCommunityIcons
                          name="delete-outline"
                          size={20}
                          color={Colors.error}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text style={styles.noteContent}>
                    {truncateContent(item.content)}
                  </Text>

                  <Text style={styles.noteDate}>{item.createdAt}</Text>
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
            <Text style={styles.modalTitle}>
              {editingNoteId ? "Edit Note" : "Add New Note"}
            </Text>

            <Text style={styles.modalInputLabel}>Note Title</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter note title"
              placeholderTextColor={
                isDark
                  ? Colors.dark.textSecondary
                  : Colors.light.textSecondary
              }
              value={noteTitle}
              onChangeText={setNoteTitle}
            />

            <Text style={styles.modalInputLabel}>Note Content</Text>
            <TextInput
              style={[styles.modalInput, styles.modalContentInput]}
              placeholder="Enter note content"
              placeholderTextColor={
                isDark
                  ? Colors.dark.textSecondary
                  : Colors.light.textSecondary
              }
              value={noteContent}
              onChangeText={setNoteContent}
              multiline
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
                onPress={saveNote}
              >
                <Text
                  style={[
                    styles.modalButtonText,
                    styles.modalButtonPrimaryText,
                  ]}
                >
                  {editingNoteId ? "Update Note" : "Save Note"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
