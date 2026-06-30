import Backbutton from "@/common/components/Backbutton";
import BlurComponent from "@/common/components/BlurComponent";
import Loading from "@/common/components/loading";
import { useAuthState } from "@/modules/auth/store/authState";
import { usePhotos } from "@/modules/photos/hooks/usePhotos";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import Animated, { FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import DeletePopUp from "../components/DeletePopUp";
import EditPhotoPopUp from "../components/EditPhotoPopUp";
import { useDeletePhoto } from "../hooks/useDeletePhoto";

const MyPhotosScreen = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isEditVisible, setIsEditPopVisible] = useState<boolean>(false);

  const [photoId, setPhotoId] = useState<string>();

  const { width } = useWindowDimensions();

  const { token } = useAuthState();

  const { getAllPhotosQuery } = usePhotos(token);
  const photoResponse = getAllPhotosQuery.data;

  useEffect(() => {
    if (getAllPhotosQuery.isFetching) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [setIsLoading, getAllPhotosQuery]);

  const {
    openDeletePhotoPopUp,
    setOpenDeletePhotoPopUp,
    handleDeleteOpenPopUp,
    handleDeletePhoto,
    isLoadingDelete,
  } = useDeletePhoto();

  const handleEditPhoto = (photoId: string) => {
    setIsEditPopVisible(true);
    setPhotoId(photoId);
  };

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (!photoResponse || photoResponse.length === 0) {
    return (
      <SafeAreaView
        className="flex-1 w-screen h-screen"
        accessibilityIgnoresInvertColors
      >
        <View className="flex-1 items-center mb-30">
          <Backbutton onPress={() => router.back()} position="top-2 left-5" />
          <Text className="text-3xl w-full text-start p-6 mt-20">
            Mis fotos
          </Text>
          <Text className="mt-10 text-xl">No tienes fotos para mostrar</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <View className="justify-center items-center bg-white">
        <SafeAreaView>
          <Backbutton position="top-20 left-0" onPress={() => router.back()} />
          <View>
            <Text className="text-3xl justify-start mt-20 w-full">
              Mis fotos
            </Text>

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
                <Animated.View
                  entering={FadeInUp.delay(index * 100).springify()}
                  style={{ width: width * 0.9 }}
                >
                  <View className="flex-row" style={[{ gap: 20 }]}>
                    <Image
                      source={{ uri: item.url }}
                      style={[{ width: 160, height: 160, borderRadius: 10 }]}
                      className="border border-gray-400"
                    />
                    <View className="gap-4 items-center justify-center">
                      <Text className=" w-full text-left px-2">
                        {item.word}
                      </Text>
                      <View className="flex-row p-2 gap-4">
                        <Pressable
                          className=" bg-primary-100 rounded-full p-2 border border-gray-400"
                          onPress={() => handleEditPhoto(item.id)}
                        >
                          <Ionicons
                            name="pencil-outline"
                            size={20}
                            color="black"
                          />
                        </Pressable>
                        <Pressable
                          className=" bg-red-200 rounded-full p-2 border border-gray-400"
                          onPress={() => handleDeleteOpenPopUp(item.id)}
                        >
                          <Ionicons
                            name="trash-outline"
                            size={20}
                            color="black"
                          />
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </Animated.View>
              )}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
              style={{ marginTop: 40 }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </SafeAreaView>
        {openDeletePhotoPopUp && (
          <>
            {isLoadingDelete && <Loading />}
            <BlurComponent />
            <DeletePopUp
              text="Seguro que quieres elimiar esta foto?"
              onOkPress={handleDeletePhoto}
              onCanselPress={() => setOpenDeletePhotoPopUp(false)}
            />
          </>
        )}
        {isEditVisible && (
          <>
            <BlurComponent />
            <EditPhotoPopUp
              photoid={photoId!}
              onCanselPress={() => setIsEditPopVisible(false)}
            />
          </>
        )}
      </View>
    </>
  );
};

export default MyPhotosScreen;
