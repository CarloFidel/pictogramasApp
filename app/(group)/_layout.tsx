import Feather from "@expo/vector-icons/Feather";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Layout = () => {
  return (
    <Tabs>
      <TabSlot />
      <TabList
        className="z-20 absolute py-2 left-10 right-10 px-8 bottom-10 bg-gray-100/90 rounded-3xl flex flex-row items-center gap-2 justify-center"
        style={styles.floatingBar}
      >
        <TabTrigger name="profile" href="/profile">
          <View className="gap-2 p-2 px-4 items-center rounded-full bg-gray-300">
            <Feather name="user" size={18} color="black" />
            <Text className="text-sm">Profile</Text>
          </View>
        </TabTrigger>
        <TabTrigger name="horario" href="/horario">
          <View className="gap-2 p-2 px-4 items-center rounded-full bg-gray-300">
            <Feather name="home" size={18} color="black" />
            <Text className="text-sm">Horario</Text>
          </View>
        </TabTrigger>
        <TabTrigger name="articles" href="/articles">
          <View className="gap-2 p-2 px-4 items-center rounded-full bg-gray-300">
            <Feather name="book-open" size={18} color="black" />
            <Text className="text-sm">Artículos</Text>
          </View>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
};

const styles = StyleSheet.create({
  floatingBar: {
    shadowColor: "#000",
    shadowOpacity: 0.42,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
});

export default Layout;
