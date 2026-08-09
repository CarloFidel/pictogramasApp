import { DAMPING_TOOLBAR_CONFIG } from "@/constants/global-constatnt";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { transformCapitalize } from "../../utility/transformCapitalize";

interface Props {
  id: number | string;
  word?: string;
  uri: string;
  isPhoto?: boolean;
  className: string;
  classnameText: string;
  imageDimenssion?: number;
  editMode?: boolean;
}

const ItemPictos = ({
  word,
  uri,
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
      width: width.value,
      height: height.value,
    };
  });

  return (
    <View className={className}>
      {isPhoto ? (
        <Animated.Image
          source={{ uri }}
          alt={word}
          style={[
            { width: imageDimenssion, height: imageDimenssion },
            reduceScaleInEditMode,
          ]}
        />
      ) : (
        <Animated.Image
          source={{
            uri: uri,
          }}
          alt={word}
          style={[
            { width: imageDimenssion, height: imageDimenssion },
            reduceScaleInEditMode,
          ]}
        />
      )}
      <Text className={`${classnameText} text-center items-center`}>
        {transformCapitalize(word!)}
      </Text>
    </View>
  );
};

export default ItemPictos;
