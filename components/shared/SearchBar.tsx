import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { TextInput, View } from "react-native";

const SearchBar = () => {
  return (
    <View className="mt-5">
      <TextInput
        placeholder="Buscar..."
        className="font-hank-light"
        style={{
          paddingLeft: 40,
          paddingTop: 15,
          paddingBottom: 15,
          backgroundColor: "#F5F5F5",
          borderRadius: 20,
        }}
      ></TextInput>
      <Ionicons
        name="search-outline"
        size={20}
        color="gray"
        className="absolute"
        style={{ marginTop: 12, left: 10, opacity: 0.6 }}
      />
    </View>
  );
};

export default SearchBar;
