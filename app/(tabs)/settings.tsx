import { useRouter } from "expo-router";
import { Bell, LogOut, Moon, Sun } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActionSheetIOS,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { ColoredIcon } from "../../components/ui/ColoredIcon";
import { MenuItem } from "../../components/ui/MenuItem";
import { ThemeMode } from "../../context/ThemeContext";
import { useAppTheme } from "../../hooks/useAppTheme";
import { supabase } from "../../services/supabase";

const THEME_LABELS: Record<ThemeMode, string> = {
  system: "Automatic",
  light: "Light",
  dark: "Dark",
};

export default function SettingsScreen() {
  const router = useRouter();
  const { theme, isDark, themeMode, setThemeMode } = useAppTheme();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleThemeChange = () => {
    const options: { label: string; mode: ThemeMode }[] = [
      { label: "Light", mode: "light" },
      { label: "Dark", mode: "dark" },
      { label: "Automatic", mode: "system" },
    ];

    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [...options.map((o) => o.label), "Cancel"],
          cancelButtonIndex: options.length,
          title: "Appearance",
        },
        (buttonIndex) => {
          if (buttonIndex < options.length) {
            setThemeMode(options[buttonIndex].mode);
          }
        },
      );
    } else {
      Alert.alert("Appearance", "Choose theme", [
        ...options.map((o) => ({
          text: o.label,
          onPress: () => setThemeMode(o.mode),
        })),
        { text: "Cancel", style: "cancel" as const },
      ]);
    }
  };

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          try {
            await supabase.auth.signOut();

            router.replace("/");
          } catch (error) {
            Alert.alert("Error", "Failed to sign out");
          }
        },
      },
    ]);
  };

  return (
    <Animated.View
      style={[styles.container, { backgroundColor: theme.background }]}
      entering={FadeInDown.duration(300).delay(50).springify()}
    >
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Settings
        </Text>

        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            App
          </Text>
          <View
            style={[
              styles.card,
              { backgroundColor: theme.card, borderColor: theme.inputBorder },
            ]}
          >
            <MenuItem
              theme={theme}
              label="Notifications"
              icon={<ColoredIcon icon={Bell} color={theme.colors.iconGreen} />}
              hasSwitch
              switchValue={notificationsEnabled}
              onSwitchChange={setNotificationsEnabled}
              trackColor={{
                false: theme.inputBorder,
                true: theme.colors.iconGreen,
              }}
            />

            <MenuItem
              theme={theme}
              label="Appearance"
              icon={
                <ColoredIcon
                  icon={isDark ? Moon : Sun}
                  color={theme.colors.iconBlue}
                />
              }
              onPress={handleThemeChange}
              rightElement={
                <Text
                  style={{
                    color: theme.textSecondary,
                    fontSize: 16,
                    marginRight: 4,
                  }}
                >
                  {THEME_LABELS[themeMode]}
                </Text>
              }
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            Account
          </Text>
          <View
            style={[
              styles.card,
              { backgroundColor: theme.card, borderColor: theme.inputBorder },
            ]}
          >
            <MenuItem
              theme={theme}
              label="Log Out"
              icon={<ColoredIcon icon={LogOut} color={theme.colors.iconRed} />}
              onPress={handleLogout}
              isDestructive
            />
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 120,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sectionContainer: {
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
});
