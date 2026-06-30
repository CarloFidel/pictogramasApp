import Backbutton from "@/common/components/Backbutton";
import BlurComponent from "@/common/components/BlurComponent";
import Loading from "@/common/components/loading";
import { useAuthState } from "@/modules/auth/store/authState";
import { usePhotos } from "@/modules/photos/hooks/usePhotos";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Image, Text, useWindowDimensions, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import Animated, { FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const MyPhotosScreen = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { width } = useWindowDimensions();

  const { token } = useAuthState();

  const { getAllPhotosQuery } = usePhotos(token);

  useEffect(() => {
    if (getAllPhotosQuery.isFetching) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [setIsLoading, getAllPhotosQuery]);

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
                  <View
                    className="flex-row"
                    style={[{ gap: 20, justifyContent: "space-between" }]}
                  >
                    <Image
                      source={{ uri: item.url }}
                      style={[{ width: 160, height: 160, borderRadius: 10 }]}
                      className="border border-gray-400"
                    />
                    <View className="gap-4 items-center">
                      <Text>{item.word}</Text>
                      <View className="flex-row p-2 gap-4">
                        <View className=" bg-red-200 rounded-full p-2 border border-gray-400">
                          <Feather name="trash-2" size={20} color="black" />
                        </View>
                        <View className=" bg-primary-100 rounded-full p-2 border border-gray-400">
                          <Feather name="edit" size={20} color="black" />
                        </View>
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
        {isLoading && (
          <>
            <BlurComponent />
            <Loading />
          </>
        )}
      </View>
    </>
  );
};

export default MyPhotosScreen;
