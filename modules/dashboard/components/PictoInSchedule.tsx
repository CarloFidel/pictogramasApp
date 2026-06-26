import React from "react";
import { Image, View } from "react-native";

interface Props {
  url: string;
}

const PictoInSchedule = ({ url }: Props) => {
  return (
    <View>
      <Image
        source={{ uri: url }}
        className="rounded-lg h-full w-full"
        style={{ width: 130, height: 130 }}
        resizeMode="cover"
      />
    </View>
  );
};

export default PictoInSchedule;
