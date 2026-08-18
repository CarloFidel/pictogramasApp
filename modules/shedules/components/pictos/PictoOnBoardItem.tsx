import { globalStyles } from "@/global-style";
import { Pictograma } from "@/infrastructure/picto/interfaces/picto.interface";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import React, { use, useEffect, useRef } from "react";
import { Pressable } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { FadeIn, useAnimatedReaction } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { useDragDrop } from "../../animations/drag_drop/useDragDrop";
import { PlayModeContext } from "../../context/play-mode-context/PlayModeContext";
import ItemPictos from "./ItemPictos";

interface Props {
  pictoKey?: string;
  picto: Pictograma;
  pictosOn: Pictograma[];
  putPictosblur: boolean;

  className?: string;

  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;

  dragable?: boolean;
  editDrag?: () => void;
  disabled?: boolean;

  handleRemovePicto: (id: number | string) => void;
  handleIsInDeleteZone: (term: boolean) => void;
}

const PictoOnBoardItem = ({
  picto,
  editMode,
  setEditMode,
  className,
  pictosOn,
  putPictosblur,
  handleRemovePicto,
  handleIsInDeleteZone,

  dragable = false,
  editDrag,

  disabled,
}: Props) => {
  const { panGesture, moveStyle, isInDeleteZone, onDelete, tapGesture } =
    useDragDrop(dragable, picto.instanceId);
  const gesture = Gesture.Simultaneous(tapGesture, panGesture);

  const playContext = use(PlayModeContext);
  const { isPlayMode } = playContext!;

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
        scheduleOnRN(handleRemovePicto, picto.instanceId!);
        onDelete.value = false;
      }
    },
    [handleRemovePicto, picto.instanceId, setEditMode],
  );

  const handleEditing = () => {
    if (editDrag) editDrag();
  };

  const hasEnteredEditMode = useRef(false);
  const shouldEnter = editMode && !hasEnteredEditMode.current;

  useEffect(() => {
    if (!editMode) {
      hasEnteredEditMode.current = false;
    }
    if (editMode && !hasEnteredEditMode.current) {
      hasEnteredEditMode.current = true;
    }
  }, [editMode]);
  return (
    <>
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={dragable && !editMode ? moveStyle : undefined}
          className={`flex flex-row justify-start items-center gap-4 my-6 ${className} ${putPictosblur && "opacity-20"}`}
        >
          {editMode && (
            <Animated.View
              entering={
                shouldEnter
                  ? FadeIn.springify().delay(500).duration(800)
                  : undefined
              }
            >
              <Pressable onLongPress={handleEditing} disabled={disabled}>
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

          <Pressable
            className="items-center"
            style={globalStyles.shadow_md}
            onLongPress={handleEditing}
          >
            <ItemPictos
              id={picto.id!}
              instanceId={picto.instanceId!}
              word={picto.keyword}
              uri={picto.imageUrl}
              isPhoto={picto.isPhoto}
              className="relative w-fit bg-gray-100 border-4 border-white items-center rounded-lg"
              classnameText="absolute bg-white text-lg rounded-md border border-gray-400 px-2 py-1 bottom-[-25px] center"
              imageDimenssion={
                picto.instanceId === pictosOn[0].instanceId ? 170 : 130
              }
            />
          </Pressable>

          {editMode && (
            <Animated.View
              entering={
                shouldEnter
                  ? FadeIn.springify().delay(500).duration(800)
                  : undefined
              }
            >
              <Pressable onPress={() => handleRemovePicto(picto.instanceId!)}>
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
    </>
  );
};

export default PictoOnBoardItem;
