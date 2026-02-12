import { Tabs, useRouter } from "expo-router";
import { ScanLine, Settings, User } from "lucide-react-native";
import React from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CheckinTheme, DarkTheme } from "../../constants/theme";

export default function TabLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const theme = isDark ? DarkTheme : CheckinTheme;
  const insets = useSafeAreaInsets();

  // Отступ от низа
  const bottomOffset = Math.max(insets.bottom, 10) + 10;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: -2,
          marginBottom: Platform.OS === "ios" ? 0 : 4,
        },

        tabBarStyle: {
          position: "absolute",
          bottom: bottomOffset,
          left: 20,
          right: 20,
          height: 68,
          borderRadius: 35,
          backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
          borderTopWidth: 0,
          elevation: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: isDark ? 0.5 : 0.15,
          shadowRadius: 16,
          paddingTop: 8,
          paddingBottom: 6,
          paddingHorizontal: 10,
          borderWidth: isDark ? 0 : StyleSheet.hairlineWidth,
          borderColor: isDark ? "transparent" : "rgba(0,0,0,0.06)",
        },
        tabBarBackground: () => <View style={styles.tabBarBg} />,
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />

      {/* Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <User
              size={24}
              color={color}
              fill={focused ? color : "none"}
              strokeWidth={focused ? 2.5 : 2}
            />
          ),
        }}
      />

      {/* QR / SCAN */}
      <Tabs.Screen
        name="qr"
        options={{
          title: "Scan",
          tabBarIcon: ({ color }) => (
            <View style={styles.scanButton}>
              <ScanLine size={24} color="#FFFFFF" strokeWidth={2.5} />
            </View>
          ),
          tabBarLabel: () => null,
          tabBarButton: (props) => {
            const { ref, style, ...rest } = props;

            return (
              <Pressable
                {...rest}
                style={styles.scanButtonWrapper}
                android_ripple={{ color: "transparent" }}
              />
            );
          },
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.push("/scanner");
          },
        }}
      />

      {/* Settings */}
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <Settings size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarBg: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scanButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#dc2626", // Colors.primary
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
    ...Platform.select({
      ios: {
        shadowColor: "#dc2626",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  scanButtonWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
});
