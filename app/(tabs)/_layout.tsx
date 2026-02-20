import * as Haptics from "expo-haptics";
import { Tabs, useRouter } from "expo-router";
import { ScanLine, Settings, User } from "lucide-react-native";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";

import { useAppTheme } from "../../hooks/useAppTheme";

export default function TabLayout() {
  const router = useRouter();
  const { theme, isDark } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          marginBottom: Platform.OS === "ios" ? 5 : 5,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 5,
        },
        tabBarStyle: {
          position: "absolute",
          bottom: Platform.OS === "ios" ? 30 : 20,
          left: 50,
          right: 50,
          height: 70,
          borderRadius: 35,
          backgroundColor: isDark ? "rgba(30,30,30,0.95)" : "#FFFFFF",
          borderTopWidth: 0,
          paddingTop: 0,
          paddingBottom: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: isDark ? 0.5 : 0.15,
          shadowRadius: 10,
          elevation: 5,
        },
        tabBarBackground: () => (
          <View style={{ flex: 1, backgroundColor: "transparent" }} />
        ),
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <User size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
            </View>
          ),
        }}
        listeners={{
          tabPress: () =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
        }}
      />

      <Tabs.Screen
        name="qr"
        options={{
          title: "Scan",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <ScanLine
                size={24}
                color={color}
                strokeWidth={focused ? 2.5 : 2}
              />
            </View>
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            router.push("/qr-form/scanner");
          },
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <Settings
                size={24}
                color={color}
                strokeWidth={focused ? 2.5 : 2}
              />
            </View>
          ),
        }}
        listeners={{
          tabPress: () =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 3,
  },
});
