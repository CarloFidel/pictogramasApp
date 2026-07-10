import {
  COORDINATES_DELETE_ZONE_IN_PLAYMODE,
  WIDTH_DELETE_ZONE,
} from "@/constants/global-constatnt";
import { globalStyles } from "@/global-style";
import { Pictograma } from "@/infrastructure/picto/interfaces/picto.interface";
import Feather from "@expo/vector-icons/Feather";
import { use } from "react";
import { Pressable } from "react-native";
import Animated, {
  FadeInLeft,
  FadeOut,
  ZoomOutRotate,
} from "react-native-reanimated";
import { useToolBarBehaviour } from "../../animations/toolbar/ToolBarBehaviour";
import { PlayModeContext } from "../../context/play-mode-context/PlayModeContext";

interface Props {
  playMode: boolean;
  editMode: boolean;
  startMode?: boolean;
  deleteZone: boolean;

  pictosOn: Pictograma[];
  fullToolBar: boolean;

  handleModalListVisibility: (term: boolean) => void;
  handleEditMode: () => void;
  handlePlayMode: () => void;
  handleSaveMenuVisibility: (term: boolean) => void;
}

const ToolBar = ({
  editMode,
  fullToolBar,
  deleteZone,

  handleEditMode,
  handlePlayMode,
  handleSaveMenuVisibility,
  handleModalListVisibility,
}: Props) => {
  const playMode = use(PlayModeContext);
  const { isPlayMode } = playMode!;

  const { toolBarBehaviour, deleteZoneStyle } = useToolBarBehaviour(
    isPlayMode,
    editMode,
    fullToolBar,
    deleteZone,
  );

  return (
    <>
      <Animated.View
        className="flex-row gap-2 bg-primary-600 py-3 rounded-3xl border border-primary-500 justify-center items-center"
        style={[globalStyles.shadow_md, toolBarBehaviour, { zIndex: 1 }]}
      >
        {!isPlayMode && !editMode && !fullToolBar && (
          <Pressable
            onPress={() => handleModalListVisibility(true)}
            className="px-4 py-2"
          >
            <Feather name="plus" size={24} color="white" />
          </Pressable>
        )}
        {isPlayMode && (
          <Pressable onPress={handlePlayMode} className="px-4 py-2">
            <Feather name="pause" size={24} color="white" />
          </Pressable>
        )}
        {editMode && (
          <Pressable onPress={handleEditMode} className="px-4 py-2">
            <Feather name="arrow-left" size={24} color="black" />
          </Pressable>
        )}
        {fullToolBar && (
          <Animated.View
            entering={FadeInLeft.springify().duration(500).delay(300)}
            exiting={FadeOut.springify().duration(200)}
            className="flex-row gap-2 items-center"
          >
            <Pressable
              onPress={() => handleModalListVisibility(true)}
              className="px-4 py-2"
            >
              <Feather name="plus" size={24} color="white" />
            </Pressable>

            <Pressable className="px-4 py-2" onPress={handleEditMode}>
              <Feather name="edit-2" size={20} color="white" className="mt-1" />
            </Pressable>
            <Pressable
              className="px-4 py-2"
              onPress={() => handleSaveMenuVisibility(true)}
            >
              <Feather
                name="triangle"
                size={20}
                color="white"
                className="mt-1"
              />
            </Pressable>
            <Pressable className="px-4 py-2" onPress={handlePlayMode}>
              <Feather
                name="maximize-2"
                size={20}
                color="white"
                className="mt-1.5"
              />
            </Pressable>
          </Animated.View>
        )}
      </Animated.View>

      {isPlayMode && (
        <Animated.View
          entering={FadeInLeft.springify().duration(800).delay(200)}
          exiting={ZoomOutRotate.springify().duration(200)}
          className={"absolute"}
          style={COORDINATES_DELETE_ZONE_IN_PLAYMODE}
        >
          <Animated.View
            className="border absolute border-white border-dashed aspect-square rounded-lg flex items-center justify-center p-4"
            style={[
              COORDINATES_DELETE_ZONE_IN_PLAYMODE,
              WIDTH_DELETE_ZONE,
              deleteZoneStyle,
            ]}
          >
            <Feather name="check" size={24} color="white" />
          </Animated.View>
        </Animated.View>
      )}
    </>
  );
};

export default ToolBar;
