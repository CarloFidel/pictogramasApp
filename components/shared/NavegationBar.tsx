import React from "react";
import { Pressable, Text, View } from "react-native";

import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

interface Props {
  onNavigate: () => void;
}

const NavegationBar = ({ onNavigate }: Props) => {
  return (
    <View className="flex-row gap-14 justify-between px-10 py-4 rounded-2xl bg-white">
      <Pressable onPress={onNavigate}>
        <View className="items-center">
          <SimpleLineIcons name="home" size={18} color="black" />
          <Text className="text-sm">Horario</Text>
        </View>
      </Pressable>

      <Pressable onPress={onNavigate}>
        <View className="items-center">
          <SimpleLineIcons name="book-open" size={18} color="black" />
          <Text className="text-sm">Artículos</Text>
        </View>
      </Pressable>

      <Pressable>
        <View className="items-center">
          <SimpleLineIcons name="user" size={18} color="black" />
          <Text className="text-sm">Perfil</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default NavegationBar;
