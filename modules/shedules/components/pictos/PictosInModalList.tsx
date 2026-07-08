import { Pictograma } from "@/infrastructure/picto/interfaces/picto.interface";
import { useEffect } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated, { FadeInUp } from "react-native-reanimated";
import { usePictos } from "../../hooks/usePictos";
import ItemPictos from "./ItemPictos";

interface Props {
  onError: (error: boolean) => void;
  data: Pictograma[];

  onPressedPictos: (
    id: number | string,
    word: string,
    imageUrl: string,
    isPhoto: boolean,
  ) => void;
}

const PictosInModalList = ({ onPressedPictos, onError, data }: Props) => {
  const { getAllPictosQuery } = usePictos();

  useEffect(() => {
    if (getAllPictosQuery.error) {
      onError(true);
    }
  }, [getAllPictosQuery.error, onError]);

  if (getAllPictosQuery.isLoading) {
    return (
      <View className="flex-1 justify-center items-center mt-40">
        <ActivityIndicator size={40} />
      </View>
    );
  }
  if (getAllPictosQuery.error) {
    return (
      <View className="flex-1 justify-center items-center mt-40">
        <Text>Ocurrió un error al cargar los pictogramas.</Text>
      </View>
    );
  }

  return (
    <View className="justify-center my-5 h-3/4">
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInUp.delay(index * 100).springify()}>
            <Pressable
              onPress={() =>
                onPressedPictos(item.id!, item.keyword, item.imageUrl, false)
              }
            >
              <ItemPictos
                id={item.id!}
                word={item.keyword}
                uri={item.imageUrl}
                className="justify-center items-center mx-5 border border-gray-200 px-4 py-2 gap-2 rounded-xl"
                classnameText=" bg-white text-left w-full"
                imageDimenssion={140}
              />
            </Pressable>
          </Animated.View>
        )}
        keyExtractor={(item) => item.id!.toString()}
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
