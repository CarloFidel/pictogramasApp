import {
  COORDINATES_DELETE_ZONE_IN_PLAYMODE,
  WIDTH_DELETE_ZONE,
} from "@/constants/global-constatnt";
import { globalStyles } from "@/global-style";
import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { use, useEffect } from "react";
import { Pressable } from "react-native";
import Animated, {
  FadeInLeft,
  FadeOut,
  FadeOutLeft,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useToolBarBehaviour } from "../../animations/toolbar/ToolBarBehaviour";
import { PlayModeContext } from "../../context/play-mode-context/PlayModeContext";
import { PictoOn } from "../../interfaces/PictoOn.interface";

interface Props {
  playMode: boolean;
  editMode: boolean;
  startMode?: boolean;
  deleteZone: boolean;

  pictosOn: PictoOn[];
  fullToolBar: boolean;

  handleModalListVisibility: (term: boolean) => void;
  handleEditMode: () => void;
  handlePlayMode: () => void;
  handleSaveMenuVisibility: (term: boolean) => void;
}

const ToolBar = ({
  editMode,
  pictosOn,
  fullToolBar,
  deleteZone,

  handleEditMode,
  handlePlayMode,
  handleSaveMenuVisibility,
  handleModalListVisibility,
}: Props) => {
  const playMode = use(PlayModeContext);
  const { isPlayMode } = playMode!;

  const { toolBarBehaviour } = useToolBarBehaviour(
    isPlayMode,
    editMode,
    fullToolBar,
  );

  const flagToScale = useSharedValue(false);

  useEffect(() => {
    flagToScale.value = deleteZone;
  }, [deleteZone, flagToScale]);

  const deleteZoneStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(flagToScale.value ? 2 : 1, {
            damping: 10,
            stiffness: 180,
            mass: 0.5,
          }),
        },
      ],
    };
  });

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
              <SimpleLineIcons
                name="pencil"
                size={18}
                color="white"
                className="mt-1"
              />
            </Pressable>
            <Pressable
              className="px-4 py-2"
              onPress={() => handleSaveMenuVisibility(true)}
            >
              <Feather name="crop" size={20} color="white" className="mt-1" />
            </Pressable>
            <Pressable className="px-4 py-2" onPress={handlePlayMode}>
              <Feather
                name="maximize-2"
                size={18}
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
          exiting={FadeOutLeft.springify().duration(800).delay(200)}
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
