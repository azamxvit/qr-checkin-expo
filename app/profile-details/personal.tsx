import { Calendar, Mail, Phone, User } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { ColoredIcon } from "../../components/ui/ColoredIcon";
import { MenuItem } from "../../components/ui/MenuItem";
import { useAppTheme } from "../../hooks/useAppTheme";

export default function PersonalScreen() {
  const { theme } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarSection}>
          <View
            style={[
              styles.avatarPlaceholder,
              { borderColor: theme.inputBorder, backgroundColor: theme.card },
            ]}
          >
            <Text style={{ fontSize: 32 }}>👨‍💻</Text>
          </View>
          <Text style={[styles.name, { color: theme.text }]}>Azamat</Text>
          <Text style={[styles.role, { color: theme.textSecondary }]}>
            Barista • ID: 8934
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          Details
        </Text>

        <View
          style={[
            styles.card,
            { backgroundColor: theme.card, borderColor: theme.inputBorder },
          ]}
        >
          <MenuItem
            theme={theme}
            label="Full Name"
            icon={<ColoredIcon icon={User} color={theme.colors.iconBlue} />}
            rightElement={
              <Text style={{ color: theme.text, fontSize: 16 }}>
                Azamat Omirtay
              </Text>
            }
          />
          <MenuItem
            theme={theme}
            label="Email"
            icon={<ColoredIcon icon={Mail} color={theme.colors.iconPurple} />}
            rightElement={
              <Text style={{ color: theme.text, fontSize: 16 }}>
                azamat@kasip.kz
              </Text>
            }
          />
          <MenuItem
            theme={theme}
            label="Phone"
            icon={<ColoredIcon icon={Phone} color={theme.colors.iconGreen} />}
            rightElement={
              <Text style={{ color: theme.text, fontSize: 16 }}>
                +7 777 123 4567
              </Text>
            }
          />
          <MenuItem
            theme={theme}
            label="Date of Birth"
            icon={
              <ColoredIcon icon={Calendar} color={theme.colors.iconOrange} />
            }
            rightElement={
              <Text style={{ color: theme.text, fontSize: 16 }}>
                30.08.2006
              </Text>
            }
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
  avatarSection: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  role: {
    fontSize: 16,
    marginTop: 4,
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
