import { globalStyles } from "@/global-style";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import React from "react";
import { Pressable } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, { FadeIn, useAnimatedReaction } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { useDragDrop } from "../../animations/drag_drop/useDragDrop";
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
  handleIsInDeleteZone: (term: boolean) => void;
}

const PictoOnBoardItem = ({
  picto,
  editMode,
  setEditMode,
  className,
  pictosOn,
  handleRemovePicto,
  handleIsInDeleteZone,
  dragable = false,
}: Props) => {
  const { panGesture, moveStyle, isInDeleteZone, onDelete } = useDragDrop(
    picto.id,
  );

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
        scheduleOnRN(handleRemovePicto, picto.id);
        onDelete.value = false;
      }
    },
    [handleRemovePicto, picto.id, setEditMode],
  );

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
