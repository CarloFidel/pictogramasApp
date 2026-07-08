import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { TextInput, View } from "react-native";

interface Props {
  placeholder?: string;

  onQuery: (query: string) => void;
}

const SearchBar = ({ onQuery, placeholder }: Props) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onQuery(query);
    }, 700);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query, onQuery]);

  return (
    <View className="mt-5">
      <TextInput
        testID="search-input"
        placeholder={placeholder}
        className="flex-row rounded-3xl bg-gray-100 pl-10 py-4"
        onChangeText={setQuery}
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
