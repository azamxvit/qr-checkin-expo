import { useRouter } from "expo-router";
import { CircleHelp, ShieldCheck, User as UserIcon } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { ProfileHeader } from "../../components/profile/ProfileHeader";
import { ColoredIcon } from "../../components/ui/ColoredIcon";
import { MenuItem } from "../../components/ui/MenuItem";
import { useAppTheme } from "../../hooks/useAppTheme";

export default function ProfileScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Animated.View
        style={{ flex: 1 }}
        entering={FadeInDown.duration(300).springify()}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ProfileHeader name="Azamat" role="Barista" theme={theme} />

          <View
            style={[
              styles.section,
              { backgroundColor: theme.card, borderColor: theme.inputBorder },
            ]}
          >
            <MenuItem
              theme={theme}
              label="Personal Information"
              icon={
                <ColoredIcon icon={UserIcon} color={theme.colors.iconBlue} />
              }
              onPress={() => router.push("/profile-details/personal")}
            />
            <MenuItem
              theme={theme}
              label="Security & Privacy"
              icon={
                <ColoredIcon
                  icon={ShieldCheck}
                  color={theme.colors.iconGreen}
                />
              }
              onPress={() => router.push("/profile-details/security")}
            />
          </View>

          <View
            style={[
              styles.section,
              { backgroundColor: theme.card, borderColor: theme.inputBorder },
            ]}
          >
            <MenuItem
              theme={theme}
              label="Help & Support"
              icon={
                <ColoredIcon
                  icon={CircleHelp}
                  color={theme.colors.iconOrange}
                />
              }
              onPress={() => router.push("/profile-details/support")}
            />
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </Animated.View>
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
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
  },
});
