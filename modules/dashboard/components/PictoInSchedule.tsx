import { globalStyles } from "@/global-style";
import React from "react";
import { Image, View } from "react-native";

interface Props {
  url: string;
  dimention?: string;
}

const PictoInSchedule = ({ url, dimention = "w-24 h-24" }: Props) => {
  return (
    <View
      style={globalStyles.shadow_sm}
      className="border border-gray-300 bg-white"
    >
      <Image
        source={{ uri: url }}
        className={`rounded-lg bg-cover ${dimention}`}
        resizeMode="cover"
      />
    </View>
  );
};

export default PictoInSchedule;
