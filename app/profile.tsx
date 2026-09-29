import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [groupMembers] = useState([
    { id: 1, name: "Stanley Jose Quimco", role: "Frontend Lead" },
    { id: 2, name: "Jusenil Rosal", role: "Backend Developer" },
    { id: 3, name: "Dawn Jessa Toling", role: "UI/UX Designer" },
    { id: 4, name: "Vanessa Roble", role: "Documentation" },
    { id: 5, name: "Mark Anthony Salvador", role: "Testing" },
  ]);

  const [yourName, setYourName] = useState("");
  const [yourRole, setYourRole] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // useEffect demonstrates component lifecycle - loads saved name on mount
  useEffect(() => {
    // In a real app, this would load from localStorage
    // For now, we just set a default
    setYourName("Your Name");
    setYourRole("Your Role");
  }, []);

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
    profileHeader: {
      alignItems: "center",
      marginBottom: 12,
    },
    profileIcon: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: "#007AFF",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
    },
    profileName: {
      fontSize: 20,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#000",
      marginBottom: 4,
    },
    profileRole: {
      fontSize: 16,
      color: isDark ? "#aaa" : "#666",
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
      marginBottom: 12,
    },
    buttonRow: {
      flexDirection: "row",
      gap: 8,
    },
    button: {
      flex: 1,
      borderRadius: 8,
      paddingVertical: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    saveButton: {
      backgroundColor: "#4ECDC4",
    },
    cancelButton: {
      backgroundColor: isDark ? "#444" : "#ddd",
    },
    editButton: {
      backgroundColor: "#007AFF",
    },
    buttonText: {
      fontWeight: "bold",
      fontSize: 14,
      color: "#fff",
    },
    cancelButtonText: {
      color: isDark ? "#fff" : "#000",
    },
    memberCard: {
      backgroundColor: isDark ? "#2a2a2a" : "#fff",
      borderRadius: 8,
      padding: 12,
      marginBottom: 8,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    memberIcon: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: "#95E1D3",
      justifyContent: "center",
      alignItems: "center",
    },
    memberInfo: {
      flex: 1,
    },
    memberName: {
      fontSize: 14,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#000",
    },
    memberRole: {
      fontSize: 12,
      color: isDark ? "#aaa" : "#666",
      marginTop: 2,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 12,
      color: isDark ? "#fff" : "#000",
    },
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, would save to localStorage here
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Your Profile Card */}
      <View style={styles.card}>
        <View style={styles.profileHeader}>
          <View style={styles.profileIcon}>
            <MaterialIcons name="person" size={40} color="#fff" />
          </View>
          <Text style={styles.profileName}>{yourName}</Text>
          <Text style={styles.profileRole}>{yourRole}</Text>
        </View>

        {isEditing ? (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={yourName}
                onChangeText={setYourName}
                placeholder="Your name"
                placeholderTextColor={isDark ? "#666" : "#999"}
              />

              <Text style={styles.label}>Role</Text>
              <TextInput
                style={styles.input}
                value={yourRole}
                onChangeText={setYourRole}
                placeholder="Your role"
                placeholderTextColor={isDark ? "#666" : "#999"}
              />
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setIsEditing(false)}
              >
                <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Group Members */}
      <Text style={styles.sectionTitle}>Group Members</Text>

      {groupMembers.map((member) => (
        <View key={member.id} style={styles.memberCard}>
          <View style={styles.memberIcon}>
            <MaterialIcons name="person" size={24} color="#fff" />
          </View>
          <View style={styles.memberInfo}>
            <Text style={styles.memberName}>{member.name}</Text>
            <Text style={styles.memberRole}>{member.role}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
