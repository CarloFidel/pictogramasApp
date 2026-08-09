import { useAuthState } from "@/modules/auth/store/authState";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import ItemPictos from "../../shedules/components/pictos/ItemPictos";
import { usePhotos } from "../hooks/usePhotos";

interface Props {
  onError: (error: boolean) => void;
  onPressedPictos: (
    id: number | string,
    word: string,
    imageUrl: string,
    isPhoto: boolean,
  ) => void;
}

const PhotosModalList = ({ onPressedPictos, onError }: Props) => {
  const { token } = useAuthState();

  const { getAllPhotosQuery } = usePhotos(token);

  const handleCamaraPress = () => {
    router.push("/camara");
  };

  useEffect(() => {
    if (getAllPhotosQuery.error) {
      onError(true);
    }
  }, [getAllPhotosQuery.error, onError]);

  if (getAllPhotosQuery.isLoading) {
    return (
      <View className="flex-1 justify-center items-center mt-40">
        <ActivityIndicator size={40} />
      </View>
    );
  }

  return (
    <View className="justify-center my-5">
      <Pressable
        onPress={handleCamaraPress}
        className="flex-row rounded-3xl bg-gray-200 py-3 items-center justify-center gap-2 mb-5 active:bg-gray-300"
      >
        <Ionicons
          name="camera-outline"
          size={22}
          color="gray"
          style={{ zIndex: 10 }}
        />
        <Text className="text-gray-700">Tomar foto</Text>
      </Pressable>

      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={getAllPhotosQuery.isFetching}
            onRefresh={async () => {
              await getAllPhotosQuery.refetch();
            }}
          />
        }
        data={getAllPhotosQuery.data}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInUp.delay(index * 100).springify()}>
            <Pressable
              onPress={() =>
                onPressedPictos(item.id, item.word, item.url, true)
              }
            >
              <ItemPictos
                id={item.id}
                word={item.word}
                uri={item.url}
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
