import React from "react";
import { FlatList, Pressable, View } from "react-native";
import ItemPictos from "../shared/ItemPictos";
import { pictogramas as pictosfake } from "./picto.mock.data";

interface Props {
  onPressedPictos: (id: number, word: string, isPhoto: boolean) => void;
}

const PictosModalList = ({ onPressedPictos }: Props) => {
  return (
    <View className="justify-center my-5">
      <FlatList
        data={pictosfake}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              onPressedPictos(item._id, item.keywords[0].keyword, false)
            }
          >
            <ItemPictos
              id={item._id}
              word={item.keywords[0].keyword}
              className="justify-center items-center mx-5 border border-gray-200 px-4 py-2 gap-2 rounded-xl"
              classnameText=" bg-white text-left w-full"
              imageDimenssion="w-40 aspect-square"
            />
          </Pressable>
        )}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        className="h-3/4"
      />
    </View>
  );
};

export default PictosModalList;
