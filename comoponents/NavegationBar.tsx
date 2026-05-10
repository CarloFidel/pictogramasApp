import React from "react";
import { Text, View } from "react-native";

import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const NavegationBar = () => {
  return (
    <View className="flex-row gap-14 justify-between px-10 py-4 rounded-2xl bg-white">
      <View className="items-center">
        <SimpleLineIcons name="home" size={18} color="black" />
        <Text className="text-sm">Horario</Text>
      </View>
      <View className="items-center">
        <SimpleLineIcons name="book-open" size={18} color="black" />
        <Text className="text-sm">Artículos</Text>
      </View>
      <View className="items-center">
        <SimpleLineIcons name="user" size={18} color="black" />
        <Text className="text-sm">Perfil</Text>
      </View>
    </View>
  );
};

export default NavegationBar;
