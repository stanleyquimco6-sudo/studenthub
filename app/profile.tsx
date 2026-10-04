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

  const [groupMembers] = useState([
    { id: 1, name: "Stanley Jose Quimco", role: "Frontend Lead" },
    { id: 2, name: "Jusenil Rosal", role: "Backend Developer" },
    { id: 3, name: "Dawn Jessa Toling", role: "UI/UX Designer" },
    { id: 4, name: "Vanessa Roble", role: "Documentation" },
    { id: 5, name: "Mark Anthony Salvador", role: "Testing" },
  ]);

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
      marginBottom: 20,
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
    profileStudentId: {
      fontSize: 14,
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
      fontSize: 14,
    },
    viewField: {
      marginBottom: 12,
    },
    viewFieldLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: isDark ? "#ddd" : "#333",
      marginBottom: 6,
    },
    viewFieldValue: {
      fontSize: 14,
      color: isDark ? "#fff" : "#000",
      backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5",
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: isDark ? "#444" : "#ddd",
    },
    buttonRow: {
      flexDirection: "row",
      gap: 8,
      marginTop: 16,
    },
    button: {
      flex: 1,
      borderRadius: 8,
      paddingVertical: 12,
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
      marginTop: 16,
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
      {/* Student Profile Card */}
      <View style={styles.card}>
        <View style={styles.profileHeader}>
          <View style={styles.profileIcon}>
            <MaterialIcons name="person" size={40} color="#fff" />
          </View>
          <Text style={styles.profileName}>{profile.fullName}</Text>
          <Text style={styles.profileStudentId}>{profile.studentId}</Text>
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
                <Text style={styles.buttonText}>Save</Text>
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
          // View mode - show profile information as read-only fields
          <>
            <View style={styles.viewField}>
              <Text style={styles.viewFieldLabel}>Full Name</Text>
              <Text style={styles.viewFieldValue}>{profile.fullName}</Text>
            </View>

            <View style={styles.viewField}>
              <Text style={styles.viewFieldLabel}>Student ID</Text>
              <Text style={styles.viewFieldValue}>{profile.studentId}</Text>
            </View>

            <View style={styles.viewField}>
              <Text style={styles.viewFieldLabel}>Course</Text>
              <Text style={styles.viewFieldValue}>{profile.course}</Text>
            </View>

            <View style={styles.viewField}>
              <Text style={styles.viewFieldLabel}>Year/Section</Text>
              <Text style={styles.viewFieldValue}>{profile.yearSection}</Text>
            </View>

            <View style={styles.viewField}>
              <Text style={styles.viewFieldLabel}>Email</Text>
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
      </View>

      {/* Group Members Section */}
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
