import { useRouter } from "expo-router";
import {
  Bell,
  ChevronRight,
  LogOut,
  Monitor,
  Moon,
  Sun,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { CheckinTheme, DarkTheme } from "../../constants/theme";
import { supabase } from "../../services/supabase";

const ColoredIcon = ({
  icon: Icon,
  color,
}: {
  icon: React.ElementType;
  color: string;
}) => (
  <View style={[styles.iconContainer, { backgroundColor: color }]}>
    <Icon size={18} color="#FFFFFF" strokeWidth={2.5} />
  </View>
);

export default function SettingsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const theme = isDark ? DarkTheme : CheckinTheme;

  // Состояния
  const [notificationsEnabled, setNotificationsEnabled] =
    useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [themeMode, setThemeMode] = useState<"system" | "light" | "dark">(
    "system",
  );

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  const handleThemeChange = () => {
    Alert.alert("Choose Theme", "Select your preferred interface appearance", [
      { text: "System Default", onPress: () => setThemeMode("system") },
      { text: "Light Mode", onPress: () => setThemeMode("light") },
      { text: "Dark Mode", onPress: () => setThemeMode("dark") },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const getThemeIcon = () => {
    if (themeMode === "light") return Sun;
    if (themeMode === "dark") return Moon;
    return Monitor;
  };

  const getThemeLabel = () => {
    if (themeMode === "light") return "Light";
    if (themeMode === "dark") return "Dark";
    return "System Default";
  };

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          setLoading(true);
          try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            router.replace("/");
          } catch (error) {
            Alert.alert("Error", (error as Error).message);
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };
  const SettingsRow = ({ icon, title, rightElement, onPress }: any) => (
    <TouchableOpacity
      style={[styles.row, { borderBottomColor: theme.inputBorder }]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View style={styles.rowLeft}>
        <View style={{ marginRight: 12 }}>{icon}</View>
        <Text style={[styles.rowText, { color: theme.text }]}>{title}</Text>
      </View>
      {rightElement || <ChevronRight size={20} color={theme.textSecondary} />}
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={[styles.contentContainer, { paddingBottom: 120 }]}
    >
      <Text style={[styles.headerTitle, { color: theme.text }]}>Settings</Text>

      {/* App Preferences */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          App
        </Text>
        <View
          style={[
            styles.card,
            { backgroundColor: theme.white, borderColor: theme.inputBorder },
          ]}
        >
          {/* Notifications */}
          <SettingsRow
            theme={theme}
            icon={<ColoredIcon icon={Bell} color="#22C55E" />}
            title="Notifications"
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: theme.inputBorder, true: "#22C55E" }}
                thumbColor="#FFFFFF"
              />
            }
          />
          {/* Theme Selector */}
          <SettingsRow
            icon={<ColoredIcon icon={getThemeIcon()} color="#007AFF" />}
            title="Appearance"
            onPress={handleThemeChange}
            rightElement={
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    color: theme.textSecondary,
                    marginRight: 8,
                    fontSize: 16,
                  }}
                >
                  {getThemeLabel()}
                </Text>
                <ChevronRight size={20} color={theme.textSecondary} />
              </View>
            }
          />
        </View>
      </View>

      {/* Account Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          Account
        </Text>
        <View
          style={[
            styles.card,
            { backgroundColor: theme.white, borderColor: theme.inputBorder },
          ]}
        >
          <SettingsRow
            icon={<ColoredIcon icon={LogOut} color="#8E8E93" />}
            title="Log Out"
            onPress={handleLogout}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginLeft: 10,
  },
  card: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  rowText: {
    fontSize: 17,
    fontWeight: "400",
  },
});
