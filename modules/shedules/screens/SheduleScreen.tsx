import BlurComponent from "@/common/components/BlurComponent";
import PopUp from "@/common/components/PopUp";
import { LoadPictosContext } from "@/modules/dashboard/context/LoadPictosContext";
import { router } from "expo-router";
import { use, useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInUp, FadeOut } from "react-native-reanimated";
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

import { Pictograma } from "@/infrastructure/picto/interfaces/picto.interface";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";

export default function SheduleScreen() {
  const [error, setError] = useState<boolean>(false);
  const [saveSchedluPopUp, setSaveSchedluPopUp] = useState<boolean>(false);
  const [itemsForSave, setItemsForSave] = useState<SheduleItems[]>([]);

  const [playMode, setPlayMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const [openSaveSchedule, setOpenSaveSchedule] = useState<boolean>(false);
  const [schedulesItems, setSchedulesItems] = useState<SheduleItems[]>([]);

  const [deleteZoneActive, setDeleteZoneActive] = useState<boolean>(false);

  const [putPictosblur, setPutPictosBlur] = useState<boolean>(false);

  const playContext = use(PlayModeContext);
  const { setIsPlayMode } = playContext!;

  const editContext = use(EditModeContext);
  const { setIsEditMode } = editContext!;

  const renderItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<Pictograma>) => {
    return (
      <ScaleDecorator>
        <Animated.View
          entering={
            !editMode ? FadeInUp.delay(80 * pictosOn.indexOf(item)) : undefined
          }
          key={item.instanceId}
        >
          <Pressable onPress={() => handleEnphasize}>
            <PictoOnBoardItem
              picto={item}
              editMode={editMode}
              setEditMode={setEditMode}
              pictosOn={pictosOn}
              handleRemovePicto={handleRemovePicto}
              handleIsInDeleteZone={handleIsInDeleteZone}
              dragable={
                item.instanceId === pictosOn[0].instanceId && playMode
                  ? true
                  : false
              }

              editDrag={drag}
              disabled={isActive}
              putPictosblur={putPictosblur}
            />
          </Pressable>
        </Animated.View>
      </ScaleDecorator>
    );
  };

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

  const handleRemovePicto = (instanceId: number | string) => {
    const pictosFiltered = pictosOn.filter(
      (picto) => picto.instanceId !== instanceId,
    );
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

  const handleEnphasize = (instanceId: string) => {
    console.log(instanceId);
    setPutPictosBlur(true);
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

  //console.log(JSON.stringify(pictosOn, null, 2));

  /* -----------------------------------------------------------
Carga de horario. ////////////////////////////////////////////
------------------------------------------------------------*/
  const loadPictosContext = use(LoadPictosContext);
  const { pictosLoaded, setPictosLoaded } = loadPictosContext!;

  useEffect(() => {
    if (pictosLoaded.length === 0) return;

    setPictosOn([]);
    pictosLoaded.forEach((picto) => handleSetPictos(picto));
    setPictosLoaded([]);
  }, [pictosLoaded, handleSetPictos, setPictosLoaded, setPictosOn]);
  /* -----------------------------------------------------------
//////////////////////////////////////////////////////////////
------------------------------------------------------------*/

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View className="relative bg-primary h-screen flex items-center py-20 mt">
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
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: width,
            height: height * 0.9,
          }}
        >
          <DraggableFlatList
            data={pictosOn}
            onDragEnd={({ data }) => setPictosOn(data)}
            renderItem={renderItem}

            keyExtractor={(item) => item.instanceId!}
            style={{
              width: width,
              height: height,
            }}
            contentContainerStyle={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingTop: 140,
              paddingBottom: 40,
            }}
          />
        </View>

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
      {(modalVisible ||
        saveModalVisible ||
        openSaveSchedule ||
        saveSchedluPopUp) && <BlurComponent />}

      {saveModalVisible && (
        <SaveMenuModal
          handleSaveMenuVisibility={handleSaveMenuVisibility}
          handleSavePress={handleSavePress}
          setSaveModallVisible={setSaveModallVisible}
        />
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
          <SaveSchedulePopUp
            onCanselPress={() => setSaveSchedluPopUp(false)}
            items={itemsForSave}
          />
        </>
      )}
    </>
  );
}
