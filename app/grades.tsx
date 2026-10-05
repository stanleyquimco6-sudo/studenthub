import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, Spacing, BorderRadius, Typography } from "../constants";

interface CalculationResult {
  subject: string;
  prelim: number;
  midterm: number;
  semifinal: number;
  final: number;
  average: number;
  status: "PASSED" | "FAILED";
}

export default function GradesScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // State for grade inputs
  const [subject, setSubject] = useState("");
  const [prelim, setPrelim] = useState("");
  const [midterm, setMidterm] = useState("");
  const [semifinal, setSemifinal] = useState("");
  const [finalGrade, setFinalGrade] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<CalculationResult | null>(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
    },
    content: {
      padding: Spacing.lg,
      paddingBottom: Spacing.xl,
    },
    header: {
      marginBottom: Spacing.xl,
      alignItems: "center",
    },
    headerIconContainer: {
      width: 64,
      height: 64,
      borderRadius: BorderRadius.xl,
      backgroundColor: Colors.primary,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: Spacing.md,
    },
    headerTitle: {
      fontSize: Typography.sizes.h2,
      fontWeight: Typography.weights.bold,
      color: isDark ? Colors.dark.text : Colors.light.text,
      marginBottom: Spacing.sm,
      textAlign: "center",
    },
    headerSubtitle: {
      fontSize: Typography.sizes.body,
      color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary,
      textAlign: "center",
    },
    card: {
      backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      marginBottom: Spacing.lg,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    sectionTitle: {
      fontSize: Typography.sizes.h4,
      fontWeight: Typography.weights.semibold,
      color: isDark ? Colors.dark.text : Colors.light.text,
      marginBottom: Spacing.lg,
    },
    inputGroup: {
      marginBottom: Spacing.md,
    },
    inputLabel: {
      fontSize: Typography.sizes.h6,
      fontWeight: Typography.weights.semibold,
      color: isDark ? Colors.dark.text : Colors.light.text,
      marginBottom: Spacing.sm,
      flexDirection: "row",
      display: "flex",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: isDark ? Colors.dark.border : Colors.light.border,
      paddingHorizontal: Spacing.md,
      height: 48,
    },
    inputIcon: {
      marginRight: Spacing.sm,
    },
    input: {
      flex: 1,
      color: isDark ? Colors.dark.text : Colors.light.text,
      fontSize: Typography.sizes.body,
      paddingVertical: Spacing.md,
    },
    errorMessage: {
      backgroundColor: Colors.error,
      color: "#fff",
      padding: Spacing.md,
      borderRadius: BorderRadius.md,
      marginBottom: Spacing.lg,
      flexDirection: "row",
      alignItems: "center",
    },
    errorText: {
      color: "#fff",
      fontSize: Typography.sizes.body,
      fontWeight: Typography.weights.semibold,
      marginLeft: Spacing.sm,
      flex: 1,
    },
    errorIcon: {
      marginRight: Spacing.sm,
    },
    calculateButton: {
      backgroundColor: Colors.primary,
      borderRadius: BorderRadius.md,
      height: 52,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      marginBottom: Spacing.lg,
    },
    calculateButtonText: {
      color: "#fff",
      fontSize: Typography.sizes.h5,
      fontWeight: Typography.weights.semibold,
      marginLeft: Spacing.sm,
    },
    resultCard: {
      backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      marginBottom: Spacing.lg,
      borderTopWidth: 4,
      borderTopColor: Colors.success,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    resultTitle: {
      fontSize: Typography.sizes.h6,
      fontWeight: Typography.weights.semibold,
      color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary,
      marginBottom: Spacing.md,
      textAlign: "center",
    },
    resultSubject: {
      fontSize: Typography.sizes.h4,
      fontWeight: Typography.weights.bold,
      color: isDark ? Colors.dark.text : Colors.light.text,
      marginBottom: Spacing.lg,
      textAlign: "center",
    },
    gradeItemsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: Spacing.lg,
      paddingBottom: Spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? Colors.dark.border : Colors.light.border,
    },
    gradeItem: {
      alignItems: "center",
      flex: 1,
    },
    gradeItemLabel: {
      fontSize: Typography.sizes.caption,
      fontWeight: Typography.weights.semibold,
      color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary,
      marginBottom: Spacing.sm,
      textTransform: "uppercase",
    },
    gradeItemValue: {
      fontSize: Typography.sizes.h3,
      fontWeight: Typography.weights.bold,
      color: Colors.primary,
    },
    finalGradeContainer: {
      alignItems: "center",
      marginBottom: Spacing.lg,
    },
    finalGradeLabel: {
      fontSize: Typography.sizes.h6,
      fontWeight: Typography.weights.semibold,
      color: isDark ? Colors.dark.textSecondary : Colors.light.textSecondary,
      marginBottom: Spacing.sm,
      textTransform: "uppercase",
    },
    finalGradeValue: {
      fontSize: 52,
      fontWeight: Typography.weights.black,
      color: Colors.primary,
      marginBottom: Spacing.md,
    },
    statusContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      borderRadius: BorderRadius.md,
      backgroundColor: isDark
        ? Colors.dark.background
        : Colors.light.background,
    },
    statusText: {
      fontSize: Typography.sizes.h5,
      fontWeight: Typography.weights.bold,
      marginLeft: Spacing.sm,
    },
    statusPassed: {
      color: Colors.success,
    },
    statusFailed: {
      color: Colors.error,
    },
    calculateAgainButton: {
      backgroundColor: Colors.secondary,
      borderRadius: BorderRadius.md,
      height: 48,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    calculateAgainButtonText: {
      color: "#fff",
      fontSize: Typography.sizes.h5,
      fontWeight: Typography.weights.semibold,
      marginLeft: Spacing.sm,
    },
  });

  // Validation function
  const validateInputs = (): boolean => {
    setError("");

    if (!subject.trim()) {
      setError("Please enter your subject.");
      return false;
    }

    if (!prelim.trim() || !midterm.trim() || !semifinal.trim() || !finalGrade.trim()) {
      setError("Please enter all four grades.");
      return false;
    }

    const prelimNum = parseFloat(prelim);
    const midtermNum = parseFloat(midterm);
    const semifinalNum = parseFloat(semifinal);
    const finalNum = parseFloat(finalGrade);

    if (isNaN(prelimNum) || isNaN(midtermNum) || isNaN(semifinalNum) || isNaN(finalNum)) {
      setError("Grades must be valid numbers.");
      return false;
    }

    if (
      prelimNum < 0 ||
      prelimNum > 100 ||
      midtermNum < 0 ||
      midtermNum > 100 ||
      semifinalNum < 0 ||
      semifinalNum > 100 ||
      finalNum < 0 ||
      finalNum > 100
    ) {
      setError("Please enter a valid grade between 0 and 100.");
      return false;
    }

    return true;
  };

  // Calculate grade
  const handleCalculate = () => {
    if (!validateInputs()) {
      return;
    }

    const prelimNum = parseFloat(prelim);
    const midtermNum = parseFloat(midterm);
    const semifinalNum = parseFloat(semifinal);
    const finalNum = parseFloat(finalGrade);
    const average =
      Math.round(
        ((prelimNum + midtermNum + semifinalNum + finalNum) / 4) * 100
      ) / 100;
    const status = average >= 75 ? "PASSED" : "FAILED";

    setResult({
      subject,
      prelim: prelimNum,
      midterm: midtermNum,
      semifinal: semifinalNum,
      final: finalNum,
      average,
      status,
    });
  };

  // Calculate again
  const handleCalculateAgain = () => {
    setSubject("");
    setPrelim("");
    setMidterm("");
    setSemifinal("");
    setFinalGrade("");
    setError("");
    setResult(null);
  };

  // Show result view
  if (result) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>GRADE RESULT</Text>
            <Text style={styles.resultSubject}>{result.subject}</Text>

            <View style={styles.gradeItemsContainer}>
              <View style={styles.gradeItem}>
                <Text style={styles.gradeItemLabel}>Prelim</Text>
                <Text style={styles.gradeItemValue}>{result.prelim}</Text>
              </View>
              <View style={styles.gradeItem}>
                <Text style={styles.gradeItemLabel}>Midterm</Text>
                <Text style={styles.gradeItemValue}>{result.midterm}</Text>
              </View>
              <View style={styles.gradeItem}>
                <Text style={styles.gradeItemLabel}>SemiFinal</Text>
                <Text style={styles.gradeItemValue}>{result.semifinal}</Text>
              </View>
              <View style={styles.gradeItem}>
                <Text style={styles.gradeItemLabel}>Final</Text>
                <Text style={styles.gradeItemValue}>{result.final}</Text>
              </View>
            </View>

            <View style={styles.finalGradeContainer}>
              <Text style={styles.finalGradeLabel}>Final Grade</Text>
              <Text style={styles.finalGradeValue}>{result.average}</Text>
            </View>

            <View style={styles.statusContainer}>
              {result.status === "PASSED" ? (
                <>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={28}
                    color={Colors.success}
                  />
                  <Text style={[styles.statusText, styles.statusPassed]}>
                    {result.status}
                  </Text>
                </>
              ) : (
                <>
                  <Ionicons
                    name="close-circle-outline"
                    size={28}
                    color={Colors.error}
                  />
                  <Text style={[styles.statusText, styles.statusFailed]}>
                    {result.status}
                  </Text>
                </>
              )}
            </View>
          </View>

          <TouchableOpacity
            style={styles.calculateAgainButton}
            onPress={handleCalculateAgain}
          >
            <Ionicons name="refresh-outline" size={20} color="#fff" />
            <Text style={styles.calculateAgainButtonText}>Calculate Again</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // Show calculator view
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerIconContainer}>
              <MaterialCommunityIcons
                name="calculator"
                size={32}
                color="#fff"
              />
            </View>
            <Text style={styles.headerTitle}>Grade Calculator</Text>
            <Text style={styles.headerSubtitle}>
              Calculate your final subject grade
            </Text>
          </View>

          {/* Error Message */}
          {error ? (
            <View style={styles.errorMessage}>
              <Ionicons
                name="alert-circle-outline"
                size={20}
                color="#fff"
                style={styles.errorIcon}
              />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Calculator Card */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Enter Your Grades</Text>

            {/* Subject Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Subject</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="book-outline"
                  size={20}
                  color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="e.g. ITB101"
                  placeholderTextColor={
                    isDark
                      ? Colors.dark.textSecondary
                      : Colors.light.textSecondary
                  }
                  value={subject}
                  onChangeText={setSubject}
                />
              </View>
            </View>

            {/* Prelim Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Prelim</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="school-outline"
                  size={20}
                  color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="0-100"
                  placeholderTextColor={
                    isDark
                      ? Colors.dark.textSecondary
                      : Colors.light.textSecondary
                  }
                  value={prelim}
                  onChangeText={setPrelim}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            {/* Midterm Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Midterm</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="0-100"
                  placeholderTextColor={
                    isDark
                      ? Colors.dark.textSecondary
                      : Colors.light.textSecondary
                  }
                  value={midterm}
                  onChangeText={setMidterm}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            {/* SemiFinal Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>SemiFinal</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="star-outline"
                  size={20}
                  color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="0-100"
                  placeholderTextColor={
                    isDark
                      ? Colors.dark.textSecondary
                      : Colors.light.textSecondary
                  }
                  value={semifinal}
                  onChangeText={setSemifinal}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            {/* Final Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Final</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="ribbon-outline"
                  size={20}
                  color={isDark ? Colors.dark.textSecondary : Colors.light.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="0-100"
                  placeholderTextColor={
                    isDark
                      ? Colors.dark.textSecondary
                      : Colors.light.textSecondary
                  }
                  value={finalGrade}
                  onChangeText={setFinalGrade}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            {/* Calculate Button */}
            <TouchableOpacity
              style={styles.calculateButton}
              onPress={handleCalculate}
            >
              <MaterialCommunityIcons
                name="calculator"
                size={20}
                color="#fff"
              />
              <Text style={styles.calculateButtonText}>Calculate Grade</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
