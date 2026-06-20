import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import ItemPictos from "../../shedules/components/pictos/ItemPictos";
import { photos as photosfake } from "../data/foto.mock.data";

interface Props {
  onPressedPictos: (
    id: number,
    word: string,
    imageUrl: string,
    isPhoto: boolean,
  ) => void;
}

const PhotosModalList = ({ onPressedPictos }: Props) => {
  return (
    <View className="justify-center my-5">
      <Pressable className="flex-row rounded-3xl bg-gray-200 py-3 items-center justify-center gap-2 mb-5 active:bg-gray-300">
        <Ionicons name="camera-outline" size={22} color="gray" />
        <Text className="text-gray-700">Tomar foto</Text>
      </Pressable>

      <FlatList
        data={photosfake}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInUp.delay(index * 100).springify()}>
            <Pressable
              onPress={() =>
                onPressedPictos(item.id, item.word, item.uri, true)
              }
            >
              <ItemPictos
                id={item.id}
                word={item.word}
                uri={item.uri}
                isPhoto={true}
                className="justify-center items-center mx-5 border border-gray-200 px-4 py-2 gap-2 rounded-xl"
                classnameText=" bg-white text-left w-full"
                imageDimenssion={130}
              />
            </Pressable>
          </Animated.View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        className="h-3/4"

        //horizontal
      />
    </View>
  );
};

export default PhotosModalList;
