import { FileText, MessageCircle, PhoneCall } from "lucide-react-native";
import React from "react";
import { Linking, ScrollView, StyleSheet, Text, View } from "react-native";

import { ColoredIcon } from "../../components/ui/ColoredIcon";
import { MenuItem } from "../../components/ui/MenuItem";
import { useAppTheme } from "../../hooks/useAppTheme";

export default function SupportScreen() {
  const { theme } = useAppTheme();

  const handleContact = (type: string) => {
    if (type === "telegram") Linking.openURL("https://t.me/kasipqr_support");
    if (type === "phone") Linking.openURL("tel:+77771234567");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerInfo}>
          <Text style={[styles.title, { color: theme.text }]}>
            How can we help?
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Choose a contact method below.
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          Contact Us
        </Text>
        <View
          style={[
            styles.card,
            { backgroundColor: theme.card, borderColor: theme.inputBorder },
          ]}
        >
          <MenuItem
            theme={theme}
            label="Telegram Support"
            icon={
              <ColoredIcon icon={MessageCircle} color={theme.colors.iconSky} />
            }
            onPress={() => handleContact("telegram")}
          />
          <MenuItem
            theme={theme}
            label="Call Support Center"
            icon={
              <ColoredIcon icon={PhoneCall} color={theme.colors.iconGreen} />
            }
            onPress={() => handleContact("phone")}
          />
        </View>

        <Text
          style={[
            styles.sectionTitle,
            { color: theme.textSecondary, marginTop: 24 },
          ]}
        >
          Resources
        </Text>
        <View
          style={[
            styles.card,
            { backgroundColor: theme.card, borderColor: theme.inputBorder },
          ]}
        >
          <MenuItem
            theme={theme}
            label="FAQ & Guides"
            icon={
              <ColoredIcon icon={FileText} color={theme.colors.iconOrange} />
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
  headerInfo: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
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
