import { globalStyles } from "@/global-style";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import React from "react";
import { Pressable } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { PictoOn } from "../../interfaces/PictoOn.interface";
import ItemPictos from "./ItemPictos";

interface Props {
  picto: PictoOn;
  pictosOn: PictoOn[];

  className?: string;

  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;

  dragable?: boolean;

  handleRemovePicto: (id: number) => void;
}

const PictoOnBoardItem = ({
  picto,
  editMode,
  className,
  pictosOn,
  handleRemovePicto,
  dragable = false,
}: Props) => {
  const inicialPosition = 0;
  const x = useSharedValue(inicialPosition);
  const y = useSharedValue(inicialPosition);

  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const pressed = useSharedValue(false);

  const scrollAble = useSharedValue(true);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
      startX.value = x.value;
      startY.value = y.value;
      scrollAble.value = false;
    })
    .onUpdate((event) => {
      x.value = startX.value + event.translationX;
      y.value = startY.value + event.translationY;
      //console.log(x.value, y.value);
      const fingerX = event.absoluteX;
      const fingerY = event.absoluteY;

      const insideX = fingerX >= 20 && fingerX <= 120; // left 20, right 120
      const insideY = fingerY >= 60 && fingerY <= 160; // top 60, bottom 160

      if (insideX && insideY) {
        console.log("estoy en zona");
      } else {
      }
    })
    .onFinalize((event) => {
      pressed.value = false;

      scrollAble.value = true;

      const fingerX = event.absoluteX;
      const fingerY = event.absoluteY;

      const insideX = fingerX >= 20 && fingerX <= 120; // left 20, right 120
      const insideY = fingerY >= 60 && fingerY <= 160; // top 60, bottom 160

      if (insideX && insideY) {
        console.log("estoy en zona");
      } else {
        x.value = withSpring(inicialPosition, {
          damping: 10,
          stiffness: 180,
          mass: 0.5,
        });
        y.value = withSpring(inicialPosition, {
          damping: 10,
          stiffness: 180,
          mass: 0.5,
        });
      }
    });

  const moveStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value },
        { translateY: y.value },
        { scale: withSpring(pressed.value ? 0.8 : 1, { duration: 100 }) },
      ],
    };
  });

  /* ----------------------/* ----------------------/* ---------------------- */

  /* ----------------------/* ----------------------/* ---------------------- */

  /*----------------------------------------------------------------------  

  ------------------------------------------------------------------------*/

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={dragable && moveStyle}
        className={`flex flex-row justify-start items-center gap-4 ${className}`}
      >
        {editMode && (
          <Animated.View entering={FadeIn.springify().delay(500).duration(800)}>
            <Pressable>
              <SimpleLineIcons
                name="cursor-move"
                size={20}
                color="white"
                className="p-4 bg-primary-600 rounded-full border border-primary-700"
                style={globalStyles.shadow_sm}
              />
            </Pressable>
          </Animated.View>
        )}

        <Pressable className="items-center" style={globalStyles.shadow_md}>
          <ItemPictos
            id={picto.id}
            word={picto.word}
            isPhoto={picto.isPhoto}
            className="relative w-fit bg-gray-100 border-4 border-white items-center rounded-lg"
            classnameText="absolute bg-white text-lg rounded-md border border-gray-400 px-2 py-1 bottom-[-25px] center"
            imageDimenssion={picto.id === pictosOn[0].id ? 170 : 130}
            editMode={editMode}
          />
        </Pressable>
        {editMode && (
          <Animated.View entering={FadeIn.springify().delay(500).duration(800)}>
            <Pressable onPress={() => handleRemovePicto(picto.id)}>
              <SimpleLineIcons
                name="trash"
                size={20}
                color="white"
                className="p-4 bg-primary-600 rounded-full border border-primary-700"
                style={globalStyles.shadow_sm}
              />
            </Pressable>
          </Animated.View>
        )}
      </Animated.View>
    </GestureDetector>
  );
};

export default PictoOnBoardItem;
