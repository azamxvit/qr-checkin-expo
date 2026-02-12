import { CircleHelp, ShieldCheck, User as UserIcon } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ProfileHeader } from "../../components/profile/ProfileHeader";
import { ProfileMenuItem } from "../../components/profile/ProfileMenuItem";
import { CheckinTheme, DarkTheme } from "../../constants/theme";

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

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const theme = isDark ? DarkTheme : CheckinTheme;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Component */}
        <ProfileHeader name="Azamat" role="Barista" theme={theme} />

        {/* Menu Items Group */}
        <View style={styles.section}>
          <ProfileMenuItem
            icon={<ColoredIcon icon={UserIcon} color="#FF3B30" />}
            label="Personal Information"
            theme={theme}
          />
          <ProfileMenuItem
            icon={<ColoredIcon icon={ShieldCheck} color="#22C55E" />}
            label="Security & Privacy"
            theme={theme}
          />
        </View>

        <View style={styles.section}>
          <ProfileMenuItem
            icon={<ColoredIcon icon={CircleHelp} color="#FF9500" />}
            label="Help & Support"
            theme={theme}
          />
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  section: {
    marginBottom: 24,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
});
