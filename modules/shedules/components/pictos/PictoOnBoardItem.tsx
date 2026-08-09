import { globalStyles } from "@/global-style";
import { Pictograma } from "@/infrastructure/picto/interfaces/picto.interface";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import React from "react";
import { Pressable } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { FadeIn, useAnimatedReaction } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { useDragDrop } from "../../animations/drag_drop/useDragDrop";
import ItemPictos from "./ItemPictos";

interface Props {
  pictoKey?: string;
  picto: Pictograma;
  pictosOn: Pictograma[];

  className?: string;

  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;

  dragable?: boolean;

  handleRemovePicto: (id: number | string) => void;
  handleIsInDeleteZone: (term: boolean) => void;
}

const PictoOnBoardItem = ({
  pictoKey,
  picto,
  editMode,
  setEditMode,
  className,
  pictosOn,
  handleRemovePicto,
  handleIsInDeleteZone,
  dragable = false,
}: Props) => {
  const { panGesture, moveStyle, isInDeleteZone, onDelete, tapGesture } =
    useDragDrop(dragable, picto.id);
  const gesture = Gesture.Simultaneous(tapGesture, panGesture);

  useAnimatedReaction(
    () => isInDeleteZone.value,
    (current, previous) => {
      if (current !== previous) {
        scheduleOnRN(handleIsInDeleteZone, current);
      }
    },
    [handleIsInDeleteZone],
  );

  useAnimatedReaction(
    () => onDelete.value,
    (current, previous) => {
      if (current && !previous) {
        scheduleOnRN(handleRemovePicto, picto.id!);
        onDelete.value = false;
      }
    },
    [handleRemovePicto, picto.id, setEditMode],
  );

  return (
    <GestureDetector gesture={gesture}>
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
            id={picto.id!}
            word={picto.keyword}
            uri={picto.imageUrl}
            isPhoto={picto.isPhoto}
            className="relative w-fit bg-gray-100 border-4 border-white items-center rounded-lg"
            classnameText="absolute bg-white text-lg rounded-md border border-gray-400 px-2 py-1 bottom-[-25px] center"
            imageDimenssion={picto.id === pictosOn[0].id ? 170 : 130}
            editMode={editMode}
          />
        </Pressable>
        {editMode && (
          <Animated.View entering={FadeIn.springify().delay(500).duration(800)}>
            <Pressable onPress={() => handleRemovePicto(pictoKey!)}>
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
