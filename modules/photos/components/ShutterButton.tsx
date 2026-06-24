import React from "react";
import { Pressable, StyleSheet, useWindowDimensions } from "react-native";

interface Props {
  onPress: () => void;
}

const ShutterButton = ({ onPress }: Props) => {
  const { width } = useWindowDimensions();

  return (
    <Pressable
      style={[
        styles.shutterButton,
        {
          position: "absolute",
          bottom: 40,
          left: width / 2 - 32,
        },
      ]}
      onPress={onPress}
      className="bg-white active:bg-gray-400"
    ></Pressable>
  );
};

export default ShutterButton;

const styles = StyleSheet.create({
  shutterButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    //backgroundColor: "white",
    borderColor: "#737373",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
