import BlurComponent from "@/common/components/BlurComponent";
import PopUp from "@/common/components/PopUp";
import { LoadPictosContext } from "@/modules/dashboard/context/LoadPictosContext";
import { router } from "expo-router";
import { use, useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInUp, FadeOut } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import PictoOnBoardItem from "../components/pictos/PictoOnBoardItem";
import SaveMenuModal from "../components/pictos/SaveMenuModal";
import SaveSchedulePopUp from "../components/pictos/SaveSchedulePopUp";
import ToolBar from "../components/pictos/ToolBar";
import { EditModeContext } from "../context/edit-mode-context/EditModeContext";
import { PlayModeContext } from "../context/play-mode-context/PlayModeContext";
import { useSetSelectedPictos } from "../hooks/useSetSelectedPictos";
import { SheduleItems } from "../interfaces/save-schedules.interfaces";
import { prepareDataSaveSchedules } from "../utility/prepareDatatoSaveSchedules";
import ModalPictosList from "./ModalPictosList";

export default function SheduleScreen() {
  const [error, setError] = useState<boolean>(false);
  const [saveSchedluPopUp, setSaveSchedluPopUp] = useState<boolean>(false);
  const [itemsForSave, setItemsForSave] = useState<SheduleItems[]>([]);

  const [playMode, setPlayMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const [openSaveSchedule, setOpenSaveSchedule] = useState<boolean>(false);
  const [schedulesItems, setSchedulesItems] = useState<SheduleItems[]>([]);

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

  const handleRemovePicto = (id: number | string) => {
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
    const scheduleItems = prepareDataSaveSchedules(pictosOn);
    setSchedulesItems(scheduleItems);
    setSaveModallVisible(false);
    setOpenSaveSchedule(true);
  };

  const handleOnSaveIA = (term: boolean, items: SheduleItems[]) => {
    setSaveSchedluPopUp(term);
    setItemsForSave(items);
    setModalVisible(false);
  };

  const { width, height } = useWindowDimensions();

  const {
    pictosOn,
    setPictosOn,
    modalVisible,
    setModalVisible,
    saveModalVisible,
    setSaveModallVisible,
    renderButtonsFlag,
    fullToolBar,
    handleSetPictos,
    handleModalListVisibility,
    handleSaveMenuVisibility,
    setfullToolBar,
  } = useSetSelectedPictos(error);

  /* ----------------------------------------------------------
Carga de horario. ///////////////////////////////////////////
 ------------------------------------------------------------*/
  const loadPictosContext = use(LoadPictosContext);
  const { pictosLoaded, setPictosLoaded } = loadPictosContext!;

  useEffect(() => {
    if (pictosLoaded.length === 0) return;

    setPictosOn([]);
    pictosLoaded.forEach((picto) => handleSetPictos(picto));
    setPictosLoaded([]);
  }, [pictosLoaded, handleSetPictos, setPictosLoaded, setPictosOn]);
  /* ----------------------------------------------------------
////////////////////////////////////////////////////////////////
 ------------------------------------------------------------*/

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
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              // backgroundColor: "red",
              width: width,
              height: height * 0.9,
            }}
            contentContainerStyle={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 100,
              paddingBottom: 40,
            }}
            ItemSeparatorComponent={() => <View style={{ height: 35 }} />}
            data={pictosOn}
            renderItem={({ item, index }) => (
              <Animated.View
                entering={FadeInUp.delay(80 * index)}
                key={`${item.id}-${pictosOn.indexOf(item)}`}
              >
                <PictoOnBoardItem
                  picto={item}
                  editMode={editMode}
                  setEditMode={setEditMode}
                  pictosOn={pictosOn}
                  handleRemovePicto={handleRemovePicto}
                  dragable={
                    item.id === pictosOn[0].id && playMode ? true : false
                  }
                  handleIsInDeleteZone={handleIsInDeleteZone}
                />
              </Animated.View>
            )}
          />
          {modalVisible && (
            <Modal animationType="slide" transparent>
              <ModalPictosList
                visible={modalVisible}
                onVisibleModal={handleModalListVisibility}
                onSetPictos={handleSetPictos}
                handleOnError={(term) => setError(term)}
                handleOnSaveIA={handleOnSaveIA}
              />
            </Modal>
          )}
        </View>
      </SafeAreaView>

      {saveModalVisible && (
        <SaveMenuModal
          handleSaveMenuVisibility={handleSaveMenuVisibility}
          handleSavePress={handleSavePress}
          setSaveModallVisible={setSaveModallVisible}
        />
      )}

      {(modalVisible || saveModalVisible || openSaveSchedule) && (
        <BlurComponent />
      )}
      {openSaveSchedule && (
        <SaveSchedulePopUp
          items={schedulesItems}
          onCanselPress={() => setOpenSaveSchedule(false)}
        />
      )}
      {error && (
        <>
          <BlurComponent />
          <PopUp
            onPress={() => router.dismissTo("/")}
            text={"Algo ha salido mal, intente más tarde"}
            warning
          />
        </>
      )}
      {saveSchedluPopUp && (
        <>
          <BlurComponent />
          <SaveSchedulePopUp
            onCanselPress={() => setSaveSchedluPopUp(false)}
            items={itemsForSave}
          />
        </>
      )}
    </>
  );
}
