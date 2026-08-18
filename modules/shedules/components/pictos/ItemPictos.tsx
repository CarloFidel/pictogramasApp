import { Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { usePictoResizeAnimation } from "../../animations/picto_resize/usePictoResize";
import { transformCapitalize } from "../../utility/transformCapitalize";

interface Props {
  id: number | string;
  instanceId?: string;
  word?: string;
  uri: string;
  isPhoto?: boolean;
  className: string;
  classnameText: string;
  imageDimenssion?: number;
}

const ItemPictos = ({
  word,
  uri,
  isPhoto,
  className,
  classnameText,
  imageDimenssion,
  instanceId,
}: Props) => {
  const { reduceScaleInEditMode } = usePictoResizeAnimation(imageDimenssion!);

  return (
    <>
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
    </>
  );
};
export default ItemPictos;
