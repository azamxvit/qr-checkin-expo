import { Ionicons } from "@expo/vector-icons";
import { LucideIcon } from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { CheckinTheme as Colors, DarkTheme } from "../../constants/theme";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
  icon?: LucideIcon;
}

export const MySelect = ({
  label,
  placeholder,
  value,
  options,
  onSelect,
  icon: Icon,
}: Props) => {
  const [visible, setVisible] = useState(false);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const theme = isDark ? DarkTheme : Colors;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>

      <TouchableOpacity
        style={[
          styles.selectButton,
          {
            backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
            borderColor: visible ? theme.primary : theme.inputBorder,
          },
        ]}
        activeOpacity={0.7}
        onPress={() => setVisible(true)}
      >
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          {Icon && (
            <View style={{ marginRight: 12 }}>
              <Icon
                size={20}
                color={visible ? theme.primary : theme.iconDefault || "#A0A0A0"}
              />
            </View>
          )}
          <Text
            style={[
              styles.text,
              { color: value ? theme.text : theme.textSecondary },
            ]}
          >
            {value || placeholder}
          </Text>
        </View>

        <Ionicons name="chevron-down" size={20} color={theme.textSecondary} />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={[styles.modalOverlay, { backgroundColor: theme.overlay }]}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View
            style={[styles.modalContent, { backgroundColor: theme.background }]}
          >
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Select {label}
            </Text>

            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    { borderBottomColor: theme.inputBorder },
                    item === value && {
                      backgroundColor: isDark ? "#2C2C2C" : "#F5F9FF",
                    },
                  ]}
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: item === value ? theme.primary : theme.text },
                      item === value && styles.optionTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                  {item === value && (
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color={theme.primary}
                    />
                  )}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setVisible(false)}
            >
              <Text
                style={[styles.closeButtonText, { color: theme.textSecondary }]}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 4,
  },
  selectButton: {
    height: 56,
    borderWidth: 1.5,
    borderRadius: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  modalContent: {
    borderRadius: 24,
    padding: 20,
    maxHeight: "60%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  optionItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  optionText: {
    fontSize: 16,
  },
  optionTextSelected: {
    fontWeight: "600",
  },
  closeButton: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
  },
});
