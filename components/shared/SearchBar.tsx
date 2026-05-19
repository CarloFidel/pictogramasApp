import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { TextInput, View } from "react-native";

const SearchBar = () => {
  return (
    <View className="mt-5">
      <TextInput
        placeholder="Buscar..."
        className="flex-row rounded-3xl bg-gray-100 pl-10 py-4"
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
