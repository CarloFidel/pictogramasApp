import React from "react";
import { Image, Text, View } from "react-native";

interface Props {
  id: number;
  word?: string;
  isPhoto?: boolean;
  className: string;
  classnameText: string;
  imageDimenssion: string;
}

const ItemPictos = ({
  id,
  word,
  isPhoto,
  className,
  classnameText,
  imageDimenssion,
}: Props) => {
  return (
    <View className={className}>
      {isPhoto ? (
        <Image
          source={require("../../../photos/data/fake-photo-user.jpg")}
          alt={word}
          className={imageDimenssion}
        />
      ) : (
        <Image
          source={{
            uri: `https://api.arasaac.org/v1/pictograms/${id}?download=false`,
          }}
          alt={word}
          className={imageDimenssion}
        />
      )}
      <Text className={classnameText}>{word}</Text>
    </View>
  );
};

export default ItemPictos;
