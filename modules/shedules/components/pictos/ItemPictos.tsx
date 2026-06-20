import { DAMPING_TOOLBAR_CONFIG } from "@/constants/global-constatnt";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface Props {
  id: number;
  word?: string;
  isPhoto?: boolean;
  className: string;
  classnameText: string;
  imageDimenssion?: number;
  editMode?: boolean;
}

const ItemPictos = ({
  id,
  word,
  isPhoto,
  editMode,
  className,
  classnameText,
  imageDimenssion,
}: Props) => {
  const width = useSharedValue(imageDimenssion);
  const height = useSharedValue(imageDimenssion);

  useEffect(() => {
    width.value = withSpring(
      editMode ? 140 : imageDimenssion!,
      DAMPING_TOOLBAR_CONFIG,
    );
    height.value = withSpring(
      editMode ? 140 : imageDimenssion!,
      DAMPING_TOOLBAR_CONFIG,
    );
  }, [width, height, editMode, imageDimenssion]);

  const reduceScaleInEditMode = useAnimatedStyle(() => {
    return {
      // transform: [{ scale: scale.value }],
      width: width.value,
      height: height.value,
    };
  });

  return (
    <View
      className={className}
      //style={[{ width: 100, height: 100 }, reduceScaleInEditMode]}
    >
      {isPhoto ? (
        <Animated.Image
          source={require("../../../photos/data/fake-photo-user.jpg")}
          alt={word}
          style={[
            { width: imageDimenssion, height: imageDimenssion },
            reduceScaleInEditMode,
          ]}
        />
      ) : (
        <Animated.Image
          source={{
            uri: `https://api.arasaac.org/v1/pictograms/${id}?download=false`,
          }}
          alt={word}
          style={[
            { width: imageDimenssion, height: imageDimenssion },
            reduceScaleInEditMode,
          ]}
        />
      )}
      <Text className={classnameText}>{word}</Text>
    </View>
  );
};

export default ItemPictos;
