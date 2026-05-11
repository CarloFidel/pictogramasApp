import React from "react";
import { Image, Pressable, Text, View } from "react-native";

interface Props {
  id: number;
  word: string;

  onPressed: (pictoId: number) => void;
}

const ItemPictos = ({ id, word, onPressed }: Props) => {
  return (
    <Pressable onPress={() => onPressed(id)}>
      <View className="justify-center items-center mx-5 border-4 border-gray-200 px-4 py-2 gap-2 rounded-xl">
        <Image
          source={{
            uri: `https://api.arasaac.org/v1/pictograms/${id}?download=false`,
          }}
          alt={word}
          className="w-40 h-40"
        ></Image>
        <Text className="border border-gray-300 px-4 py-1 bg-white">
          {word}
        </Text>
      </View>
    </Pressable>
  );
};

export default ItemPictos;
