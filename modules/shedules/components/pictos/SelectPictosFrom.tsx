import { globalStyles } from "@/global-style";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Pressable, StyleSheet, Text, useWindowDimensions } from "react-native";

interface Props {
  title: string;
  background?: string;
  icon?: boolean;
  selected?: boolean;
  onPress: () => void;
}

const SelectPictosFrom = ({
  title,
  icon,
  selected = false,
  onPress,
}: Props) => {
  const { width, height } = useWindowDimensions();
  return (
    <Pressable
      style={{
        ...Styles.buttonInModal,
        backgroundColor: selected ? "black" : "white",
        width: width * 0.29,
        height: height * 0.045,
      }}
      onPress={onPress}
    >
      {icon && (
        <Ionicons
          name="sparkles-outline"
          size={15}
          color={selected ? "white" : globalStyles.colors.gray55}
          className="mr-2"
        />
      )}
      <Text style={{ color: selected ? "white" : "black" }}>{title}</Text>
    </Pressable>
  );
};

export default SelectPictosFrom;

const Styles = StyleSheet.create({
  buttonInModal: {
    borderWidth: 1,
    borderColor: globalStyles.colors.gray16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});
