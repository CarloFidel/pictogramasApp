import { globalStyles } from "@/global-style";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import React from "react";
import { Pressable, View } from "react-native";
import Animated, { FadeInLeft, ZoomInEasyDown } from "react-native-reanimated";
import { PictoOn } from "../../interfaces/PictoOn.interface";
import ItemPictos from "./ItemPictos";

interface Props {
  picto: PictoOn;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  pictosOn: PictoOn[];
  handleRemovePicto: (id: number) => void;
}

const PictoOnBoardItem = ({
  picto,
  editMode,
  setEditMode,
  pictosOn,
  handleRemovePicto,
}: Props) => {
  return (
    <View className="flex flex-row justify-center items-center gap-4">
      {editMode && (
        <Animated.View
          entering={ZoomInEasyDown.springify().delay(100).duration(500)}
        >
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

      <Pressable
        onLongPress={() => setEditMode(true)}
        className="items-center"
        style={globalStyles.shadow_md}
      >
        <ItemPictos
          id={picto.id}
          word={picto.word}
          isPhoto={picto.isPhoto}
          //onPressed={handlePictosOnPressed}
          className="relative w-fit bg-gray-100 border-4 border-white items-center rounded-lg"
          classnameText="absolute bg-white text-lg rounded-md border border-gray-400 px-2 py-1 bottom-[-25px] center"
          imageDimenssion={`${picto.id === pictosOn[0].id && !editMode ? "w-56 h-56" : "w-40 h-40"}`}
        />
      </Pressable>
      {editMode && (
        <Animated.View
          entering={FadeInLeft.springify().delay(200).duration(500)}
        >
          <Pressable>
            <SimpleLineIcons
              name="trash"
              size={20}
              color="white"
              className="p-4 bg-primary-600 rounded-full border border-primary-700"
              style={globalStyles.shadow_sm}
              onPress={() => handleRemovePicto(picto.id)}
            />
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
};

export default PictoOnBoardItem;
