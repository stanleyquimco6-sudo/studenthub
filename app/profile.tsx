import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
} from "react-native";

interface StudentProfile {
  fullName: string;
  studentId: string;
  course: string;
  yearSection: string;
  email: string;
}

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Student profile state with initial values
  const [profile, setProfile] = useState<StudentProfile>({
    fullName: "Mark Anthony Salvador",
    studentId: "2024-001234",
    course: "Bachelor of Science in Information Technology",
    yearSection: "4-I",
    email: "markanthonysalvador@gmail.com",
  });

  // Temporary state for editing - stores changes before saving
  const [editedProfile, setEditedProfile] = useState<StudentProfile>(profile);
  const [isEditing, setIsEditing] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#1a1a1a" : "#f9f9f9",
    },
    content: {
      padding: 16,
    },
    profileHeader: {
      alignItems: "center",
      marginBottom: 32,
      backgroundColor: isDark ? "#2a2a2a" : "#fff",
      borderRadius: 20,
      padding: 24,
      borderWidth: 1,
      borderColor: isDark ? "#444" : "#f0f0f0",
      shadowColor: "#007AFF",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    profileIcon: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: "#007AFF",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16,
      shadowColor: "#007AFF",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    profileName: {
      fontSize: 24,
      fontWeight: "bold",
      color: isDark ? "#fff" : "#000",
      marginBottom: 8,
      textAlign: "center",
    },
    profileStudentId: {
      fontSize: 13,
      color: isDark ? "#aaa" : "#666",
      textAlign: "center",
      fontWeight: "600",
      backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
    },
    inputGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 13,
      fontWeight: "700",
      color: isDark ? "#ddd" : "#333",
      marginBottom: 8,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    input: {
      backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5",
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
      color: isDark ? "#fff" : "#000",
      borderWidth: 1,
      borderColor: isDark ? "#444" : "#ddd",
      marginBottom: 8,
      fontSize: 14,
      fontWeight: "500",
    },
    viewField: {
      marginBottom: 16,
      backgroundColor: isDark ? "#2a2a2a" : "#fff",
      borderRadius: 12,
      padding: 14,
      borderWidth: 1,
      borderColor: isDark ? "#444" : "#f0f0f0",
    },
    viewFieldLabel: {
      fontSize: 12,
      fontWeight: "700",
      color: isDark ? "#aaa" : "#666",
      marginBottom: 6,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    viewFieldValue: {
      fontSize: 15,
      fontWeight: "600",
      color: isDark ? "#fff" : "#000",
    },
    buttonRow: {
      flexDirection: "row",
      gap: 10,
      marginTop: 20,
    },
    button: {
      flex: 1,
      borderRadius: 12,
      paddingVertical: 14,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    saveButton: {
      backgroundColor: "#4ECDC4",
    },
    cancelButton: {
      backgroundColor: isDark ? "#444" : "#ddd",
    },
    editButton: {
      backgroundColor: "#007AFF",
      marginTop: 20,
      shadowColor: "#007AFF",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
    },
    buttonText: {
      fontWeight: "bold",
      fontSize: 15,
      color: "#fff",
    },
    cancelButtonText: {
      color: isDark ? "#fff" : "#000",
    },
    infoGrid: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 24,
    },
    infoBadge: {
      flex: 1,
      backgroundColor: isDark ? "#2a2a2a" : "#fff",
      borderRadius: 12,
      padding: 14,
      alignItems: "center",
      borderWidth: 1,
      borderColor: isDark ? "#444" : "#f0f0f0",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 3,
      elevation: 2,
    },
    infoBadgeLabel: {
      fontSize: 11,
      fontWeight: "700",
      color: isDark ? "#aaa" : "#999",
      marginBottom: 6,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    infoBadgeValue: {
      fontSize: 16,
      fontWeight: "700",
      color: "#007AFF",
      textAlign: "center",
    },
  });

  // Handle editing mode activation - prepare edited profile with current values
  const handleEditPress = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  // Handle save - update displayed profile and exit editing mode
  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  // Handle cancel - discard changes and exit editing mode
  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Header Card */}
      <View style={styles.profileHeader}>
        <View style={styles.profileIcon}>
          <MaterialIcons name="person" size={50} color="#fff" />
        </View>
        <Text style={styles.profileName}>{profile.fullName}</Text>
        <Text style={styles.profileStudentId}>{profile.studentId}</Text>
      </View>

      {/* Quick Info Grid */}
      <View style={styles.infoGrid}>
        <View style={styles.infoBadge}>
          <Text style={styles.infoBadgeLabel}>Year</Text>
          <Text style={styles.infoBadgeValue}>{profile.yearSection.split("-")[0]}</Text>
        </View>
        <View style={styles.infoBadge}>
          <Text style={styles.infoBadgeLabel}>Section</Text>
          <Text style={styles.infoBadgeValue}>{profile.yearSection.split("-")[1]}</Text>
        </View>
      </View>

      {isEditing ? (
        // Edit mode - show text inputs
        <>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={editedProfile.fullName}
              onChangeText={(text) =>
                setEditedProfile({ ...editedProfile, fullName: text })
              }
              placeholder="Enter your full name"
              placeholderTextColor={isDark ? "#666" : "#999"}
            />

            <Text style={styles.label}>Student ID</Text>
            <TextInput
              style={styles.input}
              value={editedProfile.studentId}
              onChangeText={(text) =>
                setEditedProfile({ ...editedProfile, studentId: text })
              }
              placeholder="Enter your student ID"
              placeholderTextColor={isDark ? "#666" : "#999"}
            />

            <Text style={styles.label}>Course</Text>
            <TextInput
              style={styles.input}
              value={editedProfile.course}
              onChangeText={(text) =>
                setEditedProfile({ ...editedProfile, course: text })
              }
              placeholder="Enter your course"
              placeholderTextColor={isDark ? "#666" : "#999"}
            />

            <Text style={styles.label}>Year/Section</Text>
            <TextInput
              style={styles.input}
              value={editedProfile.yearSection}
              onChangeText={(text) =>
                setEditedProfile({ ...editedProfile, yearSection: text })
              }
              placeholder="e.g., 3-A"
              placeholderTextColor={isDark ? "#666" : "#999"}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={editedProfile.email}
              onChangeText={(text) =>
                setEditedProfile({ ...editedProfile, email: text })
              }
              placeholder="Enter your email"
              placeholderTextColor={isDark ? "#666" : "#999"}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={[styles.buttonText, styles.cancelButtonText]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        // View mode - show profile information as cards
        <>
          <View style={styles.viewField}>
            <Text style={styles.viewFieldLabel}>Course</Text>
            <Text style={styles.viewFieldValue}>{profile.course}</Text>
          </View>

          <View style={styles.viewField}>
            <Text style={styles.viewFieldLabel}>Student ID</Text>
            <Text style={styles.viewFieldValue}>{profile.studentId}</Text>
          </View>

          <View style={styles.viewField}>
            <Text style={styles.viewFieldLabel}>Email Address</Text>
            <Text style={styles.viewFieldValue}>{profile.email}</Text>
          </View>

          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={handleEditPress}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}
