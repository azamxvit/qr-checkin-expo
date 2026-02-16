import React from "react";
import { StyleSheet, View } from "react-native";

interface ColoredIconProps {
  icon: React.ElementType;
  color: string;
  size?: number;
  iconSize?: number;
}

export const ColoredIcon = ({
  icon: Icon,
  color,
  size = 28,
  iconSize = 18,
}: ColoredIconProps) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: color,
          width: size,
          height: size,
          borderRadius: size / 4,
        },
      ]}
    >
      <Icon size={iconSize} color="#FFFFFF" strokeWidth={2.5} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
