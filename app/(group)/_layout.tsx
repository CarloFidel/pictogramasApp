import { globalStyles } from "@/global-style";
import { EditModeContext } from "@/modules/shedules/context/edit-mode-context/EditModeContext";
import { PlayModeContext } from "@/modules/shedules/context/play-mode-context/PlayModeContext";
import Feather from "@expo/vector-icons/Feather";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import React, { use } from "react";
import { Text, View } from "react-native";

const Layout = () => {
  const playContext = use(PlayModeContext);
  const { isPlayMode } = playContext!;

  const editContext = use(EditModeContext);
  const { isEditMode } = editContext!;

  return (
    <Tabs>
      <TabSlot />
      <TabList
        className="z-20 absolute py-2 left-20 right-20 px-8 bottom-10 bg-gray-100/80 rounded-3xl border border-gray-200 flex flex-row items-center gap-2 justify-center"
        style={[
          globalStyles.shadow_md,
          { opacity: isPlayMode || isEditMode ? 0 : 1 },
        ]}
      >
        <TabTrigger
          name="profile"
          href="/profile"
          style={{ opacity: isPlayMode ? 0 : 1 }}
        >
          <View className="gap-2 p-2 px-4 items-center ">
            <Feather name="user" size={20} color="black" />
            <Text className="text-sm">Profile</Text>
          </View>
        </TabTrigger>
        <TabTrigger name="horario" href="/horario">
          <View className="gap-2 p-2 px-4 items-center ">
            <Feather name="home" size={20} color="black" />
            <Text className="text-sm">Horario</Text>
          </View>
        </TabTrigger>
        <TabTrigger name="articles" href="/articles">
          <View className="gap-2 p-2 px-4 items-center ">
            <Feather name="book-open" size={20} color="black" />
            <Text className="text-sm">Artículos</Text>
          </View>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
};

export default Layout;
