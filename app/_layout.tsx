import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const tintColor = colorScheme === "dark" ? "#fff" : "#007AFF";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tintColor,
        tabBarInactiveTintColor: colorScheme === "dark" ? "#888" : "#ccc",
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#f9f9f9",
        },
        headerTitleStyle: {
          color: tintColor,
          fontWeight: "bold",
          fontSize: 18,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="dashboard" size={24} color={color} />
          ),
          headerTitle: "StudentHub Dashboard",
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          tabBarLabel: "Tasks",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="checklist" size={24} color={color} />
          ),
          headerTitle: "My Tasks",
        }}
      />
      <Tabs.Screen
        name="grades"
        options={{
          title: "Study Planner",
          tabBarLabel: "Study Planner",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="calendar-today" size={24} color={color} />
          ),
          headerTitle: "Study Planner",
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: "Notes",
          tabBarLabel: "Notes",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="note" size={24} color={color} />
          ),
          headerTitle: "My Notes",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={24} color={color} />
          ),
          headerTitle: "My Profile",
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarLabel: "About",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="info" size={24} color={color} />
          ),
          headerTitle: "About StudentHub",
        }}
      />
    </Tabs>
  );
}
