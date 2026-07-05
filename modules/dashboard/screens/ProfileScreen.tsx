import { globalStyles } from "@/global-style";
import { useAuthState } from "@/modules/auth/store/authState";
import { useCalendarQuery } from "@/modules/calendar/hook/useCalendarQuery";
import { usePhotos } from "@/modules/photos/hooks/usePhotos";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import Animated, { FadeInDown, FadeInLeft } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSchedules } from "../hooks/useSchedules";

const ProfileScreen = () => {
  const { email, name, logOut, token } = useAuthState();
  const { height } = useWindowDimensions();

  const { getAllSchedulesQuery } = useSchedules(token);
  getAllSchedulesQuery.refetch();

  const { getAllPhotosQuery } = usePhotos(token);
  getAllPhotosQuery.refetch();

  const { getAllCalendarEventsQuery } = useCalendarQuery(token);
  getAllCalendarEventsQuery.refetch();

  return (
    <SafeAreaView className="flex-1 bg-primary-600">
      <View className=" bg-primary-600">
        <Animated.View
          className="items-start mb-10 px-5 gap-2"
          entering={FadeInLeft.springify().duration(800).delay(200)}
        >
          <Text
            className="text-white font-hank-light text-3xl"
            style={{ marginTop: height * 0.05 }}
          >
            {name}
          </Text>
          <Text className="text-white font-hank-light text-md">{email}</Text>
        </Animated.View>
        <Animated.View
          className="px-2 bg-white rounded-t-3xl"
          style={[{ height: height }, globalStyles.shadow_md_up]}
          entering={FadeInDown.springify().duration(1000)}
        >
          <View
            className="px-5"
            style={{ gap: height * 0.02, marginTop: height * 0.03 }}
          >
            <Text className="text-gray-500 font-hank-regular text-2xl ">
              Cuenta
            </Text>

            <Pressable
              className="flex-row justify-between gap-5 items-center"
              onPress={() => router.push("/personal")}
            >
              <View className="flex-row items-center justify-center gap-5">
                <Ionicons name="person-outline" size={18} color="black" />
                <Text className="text-black font-hank-regular text-md">
                  Información personal
                </Text>
              </View>
              <Feather name="chevron-right" size={15} />
            </Pressable>

            <Pressable
              className="flex-row justify-between gap-5 items-center"
              onPress={() => router.push("/myphotos")}
            >
              <View className="flex-row items-center justify-center gap-5">
                <Ionicons name="images-outline" size={20} color="black" />
                <Text className="text-black font-hank-regular text-md">
                  Mis fotos
                </Text>
              </View>
              <Feather name="chevron-right" size={15} />
            </Pressable>

            <Pressable
              className="flex-row justify-between gap-5 items-center"
              onPress={() => router.push("/calendar")}
            >
              <View className="flex-row items-center justify-center gap-5">
                <Ionicons name="calendar-outline" size={20} color="black" />
                <Text className="text-black font-hank-regular text-md">
                  Calendar
                </Text>
              </View>
              <Feather name="chevron-right" size={15} />
            </Pressable>

            {/* <Pressable
              className="flex-row justify-between gap-5 items-center"
              onPress={() => router.push("/myphotos")}
            >
              <View className="flex-row items-center justify-center gap-5">
                <Ionicons name="book-outline" size={20} color="black" />
                <Text className="text-black font-hank-regular text-md">
                  Artículos guardados
                </Text>
              </View>
              <Feather name="chevron-right" size={15} />
            </Pressable> */}

            <Pressable
              className="flex-row justify-between gap-5 items-center"
              onPress={() => router.push("/schedules")}
            >
              <View className="flex-row items-center justify-center gap-5">
                <Ionicons
                  name="calendar-clear-outline"
                  size={20}
                  color="black"
                />
                <Text className="text-black font-hank-regular text-md">
                  Mis horarios
                </Text>
              </View>
              <Feather name="chevron-right" size={15} />
            </Pressable>

            <Pressable
              className="flex-row justify-between gap-5 items-center"
              onPress={() => router.push("/schedules")}
            >
              <View className="flex-row items-center justify-center gap-5">
                <Ionicons name="school-outline" size={20} color="black" />
                <Text className="text-black font-hank-regular text-md">
                  Crear artículo
                </Text>
              </View>
              <Feather name="chevron-right" size={15} />
            </Pressable>

            {/*             <Pressable
              className="flex-row justify-between gap-5 items-center"
              onPress={() => router.push("/schedules")}
            >
              <View className="flex-row items-center justify-center gap-5">
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color="black"
                />
                <Text className="text-black font-hank-regular text-md">
                  Crear Artículo
                </Text>
              </View>
              <Feather name="chevron-right" size={15} />
            </Pressable> */}
          </View>

          <View
            className="px-5"
            style={{ gap: height * 0.02, marginTop: height * 0.03 }}
          >
            <Text className="text-gray-500 font-hank-regular text-2xl">
              Ayuda
            </Text>

            <Pressable
              className="flex-row justify-between gap-5 items-center"
              //onPress={() => router.push("/schedules")}
            >
              <View className="flex-row items-center justify-center gap-5">
                <Ionicons name="help-circle-outline" size={20} color="black" />
                <Text className="text-black font-hank-regular text-md">
                  Preguntas frecuentes
                </Text>
              </View>
              <Feather name="chevron-right" size={15} />
            </Pressable>

            <View className="flex flex-row gap-5 items-center justify-between">
              <View className="flex flex-row gap-5 items-center">
                <Ionicons name="information-outline" size={20} color="black" />
                <Text className="text-black font-hank-regular text-md">
                  Sobre esta App
                </Text>
              </View>
              <Feather name="chevron-right" size={15} />
            </View>
          </View>

          <View
            className="px-5"
            style={{ gap: height * 0.02, marginTop: height * 0.03 }}
          >
            <Text className="text-gray-500 font-hank-regular text-2xl">
              Preferencias
            </Text>

            <Pressable
              className="flex-row justify-between gap-5 items-center"
              //onPress={() => router.push("/schedules")}
            >
              <View className="flex-row items-center justify-center gap-5">
                <Ionicons name="language-outline" size={20} color="black" />
                <Text className="text-black font-hank-regular text-md">
                  Idioma
                </Text>
              </View>
              <Feather name="chevron-right" size={15} />
            </Pressable>
          </View>

          <Pressable
            className=" flex-row justify-between gap-5 p-5 items-center"
            onPress={() => logOut()}
            style={{
              marginTop: height * 0.03,
            }}
          >
            <View className="flex-row items-center justify-center gap-5">
              <Ionicons name="exit-outline" size={20} color="#FF3C3C" />
              <Text className=" text-warning font-hank-regular text-md">
                Logout
              </Text>
            </View>
            <Feather name="chevron-right" size={15} color={"#FF3C3C"} />
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
