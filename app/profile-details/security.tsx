import { KeyRound, Lock, ShieldAlert, Smartphone } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

import { ColoredIcon } from "../../components/ui/ColoredIcon";
import { MenuItem } from "../../components/ui/MenuItem";
import { useAppTheme } from "../../hooks/useAppTheme";

export default function SecurityScreen() {
  const { theme } = useAppTheme();
  const [faceIdEnabled, setFaceIdEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          Login Access
        </Text>
        <View
          style={[
            styles.card,
            { backgroundColor: theme.card, borderColor: theme.inputBorder },
          ]}
        >
          <MenuItem
            theme={theme}
            label="Change Password"
            icon={
              <ColoredIcon icon={KeyRound} color={theme.colors.iconOrange} />
            }
            onPress={() =>
              Alert.alert("Change Password", "Functionality coming soon")
            }
          />
          <MenuItem
            theme={theme}
            label="Biometric Login (FaceID)"
            icon={
              <ColoredIcon icon={Smartphone} color={theme.colors.iconGreen} />
            }
            hasSwitch
            switchValue={faceIdEnabled}
            onSwitchChange={setFaceIdEnabled}
            trackColor={{
              false: theme.inputBorder,
              true: theme.colors.iconGreen,
            }}
          />
        </View>

        <Text
          style={[
            styles.sectionTitle,
            { color: theme.textSecondary, marginTop: 24 },
          ]}
        >
          Advanced
        </Text>
        <View
          style={[
            styles.card,
            { backgroundColor: theme.card, borderColor: theme.inputBorder },
          ]}
        >
          <MenuItem
            theme={theme}
            label="Two-Factor Auth"
            icon={
              <ColoredIcon icon={ShieldAlert} color={theme.colors.iconPurple} />
            }
            hasSwitch
            switchValue={twoFactorEnabled}
            onSwitchChange={setTwoFactorEnabled}
            trackColor={{
              false: theme.inputBorder,
              true: theme.colors.iconPurple,
            }}
          />
          <MenuItem
            theme={theme}
            label="Active Sessions"
            icon={<ColoredIcon icon={Lock} color={theme.colors.iconBlue} />}
            rightElement={
              <Text style={{ color: theme.textSecondary }}>iPhone 15 Pro</Text>
            }
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
    marginLeft: 10,
  },
  card: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
  },
});
