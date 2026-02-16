import { CheckinTheme } from "@/constants/theme";
import { ChevronRight } from "lucide-react-native";
import React from "react";
import {
  ColorValue,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MenuItemProps {
  label: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  onPress?: () => void;
  isDestructive?: boolean;

  hasSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (val: boolean) => void;
  trackColor?: { false?: ColorValue; true?: ColorValue };

  theme: typeof CheckinTheme;
}

export const MenuItem = ({
  label,
  icon,
  rightElement,
  onPress,
  isDestructive = false,
  hasSwitch = false,
  switchValue,
  onSwitchChange,
  trackColor,
  theme,
}: MenuItemProps) => {
  const accessibilityRole = hasSwitch ? "switch" : onPress ? "button" : "none";

  return (
    <TouchableOpacity
      style={[styles.row, { borderBottomColor: theme.inputBorder }]}
      onPress={hasSwitch ? undefined : onPress}
      disabled={!onPress && !hasSwitch}
      activeOpacity={0.7}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={label}
    >
      <View style={styles.left}>
        {icon && <View style={styles.iconWrapper}>{icon}</View>}
        <Text
          style={[
            styles.label,
            { color: isDestructive ? "#FF3B30" : theme.text },
          ]}
        >
          {label}
        </Text>
      </View>

      <View style={styles.right}>
        {hasSwitch ? (
          <Switch
            value={switchValue}
            onValueChange={onSwitchChange}
            trackColor={
              trackColor || { false: theme.inputBorder, true: "#34C759" }
            }
            thumbColor="#FFFFFF"
          />
        ) : (
          <>
            {rightElement}
            {onPress && !rightElement && (
              <ChevronRight size={20} color={theme.textSecondary} />
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    marginRight: 12,
  },
  label: {
    fontSize: 17,
    fontWeight: "400",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
});
