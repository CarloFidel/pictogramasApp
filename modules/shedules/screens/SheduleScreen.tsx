import BlurComponent from "@/common/components/BlurComponent";
import Feather from "@expo/vector-icons/Feather";
import { use, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import PictoOnBoardItem from "../components/pictos/PictoOnBoardItem";
import SaveSchedulePopUp from "../components/pictos/SaveSchedulePopUp";
import ToolBar from "../components/pictos/ToolBar";
import { EditModeContext } from "../context/edit-mode-context/EditModeContext";
import { PlayModeContext } from "../context/play-mode-context/PlayModeContext";
import { useSetSelectedPictos } from "../hooks/useSetSelectedPictos";
import { SaveSchedule } from "../interfaces/save-schedules.interfaces";
import ModalPictosList from "./ModalPictosList";

export default function SheduleScreen() {
  const [playMode, setPlayMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const [openSaveSchedule, setOpenSaveSchedule] = useState<boolean>();
  const [schedulesItems, setSchedulesItems] = useState<SaveSchedule[]>([]);

  const [deleteZoneActive, setDeleteZoneActive] = useState<boolean>(false);

  const playContext = use(PlayModeContext);
  const { setIsPlayMode } = playContext!;

  const editContext = use(EditModeContext);
  const { setIsEditMode } = editContext!;

  const handlePlayMode = () => {
    setEditMode(false);
    setPlayMode((term) => !term);
    setIsPlayMode((term) => !term);
    setfullToolBar((prev) => !prev);
  };

  const handleEditMode = () => {
    setPlayMode(false);
    setEditMode((term) => !term);
    setIsEditMode((term) => !term);
    setfullToolBar((prev) => !prev);
  };

  const handleRemovePicto = (id: number) => {
    const pictosFiltered = pictosOn.filter((picto) => picto.id !== id);
    setPictosOn(pictosFiltered);
    if (editMode && pictosOn.length === 1) {
      setEditMode(false);
      setIsEditMode(false);
    } else if (playMode && pictosOn.length === 1) {
      setPlayMode(false);
      setIsPlayMode(false);
    }
  };

  const handleIsInDeleteZone = (term: boolean) => {
    if (term) {
      setDeleteZoneActive(true);
    } else {
      setDeleteZoneActive(false);
    }
  };

  const handleSavePress = async () => {
    const scheduleItems = pictosOn.map((scheduleItem) => {
      setSaveModallVisible(false);
      return {
        position: pictosOn.indexOf(scheduleItem),
        visualitem: {
          url: scheduleItem.imageUrl,
          type: scheduleItem.isPhoto ? "photo" : "picto",
          word: scheduleItem.keyword,
        },
      };
    });

    console.log(scheduleItems);

    setOpenSaveSchedule(true);
  };

  const { width, height } = useWindowDimensions();

  const {
    pictosOn,
    setPictosOn,
    modalVisible,
    saveModalVisible,
    setSaveModallVisible,
    renderButtonsFlag,
    fullToolBar,
    handleSetPictos,
    handleModalListVisibility,
    handleSaveMenuVisibility,
    setfullToolBar,
  } = useSetSelectedPictos();

  console.log(pictosOn);

  return (
    <>
      <SafeAreaView className="flex-1 bg-primary">
        <StatusBar barStyle="light-content" />
        <View className="relative bg-primary h-screen flex items-center p-5">
          <ToolBar
            playMode={playMode}
            editMode={editMode}
            pictosOn={pictosOn}
            fullToolBar={fullToolBar}
            deleteZone={deleteZoneActive}
            handleEditMode={handleEditMode}
            handlePlayMode={handlePlayMode}
            handleSaveMenuVisibility={handleSaveMenuVisibility}
            handleModalListVisibility={handleModalListVisibility}
          />
          {!renderButtonsFlag && (
            <Animated.View
              entering={FadeIn.springify().delay(500).duration(800)}
              exiting={FadeOut.springify().duration(200)}
            >
              <Text className="text-white text-md font-hank-regular w-30 py-5 text-center">
                Empieza añadiendo un pictograma
              </Text>
            </Animated.View>
          )}
          <View className="relative w-8 h-5/6 items-center bg-primary-400 rounded-lg mt-5 py-5 "></View>
          <ScrollView
            //scrollEnabled={false}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              // backgroundColor: "red",
              width: width,
              height: height,
            }}
            contentContainerStyle={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 100,
            }}
            contentContainerClassName="gap-10 w-fit bg-transparent"
            showsVerticalScrollIndicator={false}
          >
            {pictosOn.map((picto) => (
              <PictoOnBoardItem
                key={picto.id}
                picto={picto}
                editMode={editMode}
                setEditMode={setEditMode}
                pictosOn={pictosOn}
                handleRemovePicto={handleRemovePicto}
                dragable={
                  picto.id === pictosOn[0].id && playMode ? true : false
                }
                handleIsInDeleteZone={handleIsInDeleteZone}
              />
            ))}
          </ScrollView>
          {modalVisible && (
            <Modal animationType="slide" transparent>
              <ModalPictosList
                visible={modalVisible}
                onVisibleModal={handleModalListVisibility}
                onSetPictos={handleSetPictos}
              />
            </Modal>
          )}
        </View>
      </SafeAreaView>

      {saveModalVisible && (
        <Modal animationType="slide" transparent>
          <View
            className="bg-white w-screen px-4 relative flex-1 py-10 gap-8"
            style={{
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              marginTop: 700,
              shadowColor: "#000",
              shadowOpacity: 0.82,
              shadowRadius: 18,
              shadowOffset: { width: 0, height: 8 },
              elevation: 20,
            }}
          >
            <Pressable
              className="z-10 absolute top-6 right-6"
              onPress={() => handleSaveMenuVisibility(false)}
            >
              <Feather name="x" size={24} color="black" />
            </Pressable>
            <Pressable
              className="flex flex-row items-center gap-4"
              onPress={handleSavePress}
            >
              <Feather name="save" size={24} color="grey" />
              <Text>Guardar horario</Text>
            </Pressable>
            <Pressable className="flex flex-row items-center gap-4">
              <Feather name="folder" size={24} color="grey" />
              <Text>Abrir horario</Text>
            </Pressable>
          </View>
        </Modal>
      )}
      {openSaveSchedule && (
        <SaveSchedulePopUp
          items={schedulesItems}
          onCanselPress={() => setOpenSaveSchedule(false)}
          onOkPress={() => setOpenSaveSchedule(false)}
        />
      )}

      {(modalVisible || saveModalVisible || openSaveSchedule) && (
        <BlurComponent />
      )}
    </>
  );
}
