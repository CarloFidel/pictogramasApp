import React from "react";
import { Image, View } from "react-native";

interface Props {
  url: string;
  dimention?: string;
}

const PictoInSchedule = ({ url, dimention = "w-28 h-28 " }: Props) => {
  return (
    <View>
      <Image
        source={{ uri: url }}
        className={`rounded-lg h-full bg-cover ${dimention}`}
        resizeMode="cover"
      />
    </View>
  );
};

export default PictoInSchedule;
