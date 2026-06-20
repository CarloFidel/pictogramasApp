import { Pictograma } from "@/infrastructure/interfaces/picto.interface";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { getAllPictosfromArasaac } from "../../services/axios-pictograms";
import ItemPictos from "./ItemPictos";

interface Props {
  onPressedPictos: (
    id: number,
    word: string,
    imageUrl: string,
    isPhoto: boolean,
  ) => void;
}

const PictosInModalList = ({ onPressedPictos }: Props) => {
  const [pictos, setPictos] = useState<Pictograma[]>();

  useEffect(() => {
    const pictosArasaacAll = async () => {
      const pictos = await getAllPictosfromArasaac();
      setPictos(pictos);
    };

    pictosArasaacAll();
  }, []);

  return (
    <View className="justify-center my-5 h-3/4">
      <FlatList
        data={pictos}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInUp.delay(index * 100).springify()}>
            <Pressable
              onPress={() =>
                onPressedPictos(item.id, item.keyword, item.imageUrl, false)
              }
            >
              <ItemPictos
                id={item.id}
                word={item.keyword}
                uri={item.imageUrl}
                className="justify-center items-center mx-5 border border-gray-200 px-4 py-2 gap-2 rounded-xl"
                classnameText=" bg-white text-left w-full"
                imageDimenssion={140}
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
      />
    </View>
  );
};

export default PictosInModalList;
