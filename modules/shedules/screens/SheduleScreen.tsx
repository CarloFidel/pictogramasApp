import { globalStyles } from "@/global-style";
import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { BlurView } from "expo-blur";
import { use, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeOut,
  ZoomInEasyDown,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import ItemPictos from "../components/pictos/ItemPictos";
import ToolBar from "../components/pictos/ToolBar";
import { EditModeContext } from "../context/edit-mode-context/EditModeContext";
import { PlayModeContext } from "../context/play-mode-context/PlayModeContext";
import { useSetSelectedPictos } from "../hooks/useSetSelectedPictos";
import ModalPictosList from "./ModalPictosList";

export default function SheduleScreen() {
  //const [startMode, setstartMode] = useState<boolean>(true);
  const [playMode, setPlayMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

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
    }
  };

  const {
    pictosOn,
    setPictosOn,
    modalVisible,
    saveModalVisible,
    renderButtonsFlag,
    fullToolBar,
    handleSetPictos,
    handleModalListVisibility,
    handleSaveMenuVisibility,
    setfullToolBar,
  } = useSetSelectedPictos();

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
            handleEditMode={handleEditMode}
            handlePlayMode={handlePlayMode}
            handleSaveMenuVisibility={handleSaveMenuVisibility}
            handleModalListVisibility={handleModalListVisibility}
          />
          {!renderButtonsFlag && (
            <Text className="text-white text-md font-hank-regular w-30 py-5 text-center">
              Empieza añadiendo un pictograma
            </Text>
          )}
          <View className="relative w-8 items-center bg-primary-400 rounded-lg mt-5">
            <ScrollView
              className="w-80 h-5/6 py-5 "
              contentContainerStyle={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              contentContainerClassName="gap-10 w-fit bg-transparent"
              maintainVisibleContentPosition={{
                minIndexForVisible: 0,
              }}
              showsVerticalScrollIndicator={false}
            >
              {pictosOn.map((picto) => (
                <View
                  key={picto.id}
                  className="flex flex-row justify-center items-center gap-4"
                >
                  {editMode && (
                    <Animated.View
                      entering={ZoomInEasyDown.springify()
                        .delay(100)
                        .duration(500)}
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
              ))}
            </ScrollView>
          </View>
          {modalVisible && (
            <>
              <Modal
                animationType="slide"
                transparent
                //TODO: Efecto blur al fondo, mirar react-native-blur
              >
                <ModalPictosList
                  visible={modalVisible}
                  onVisibleModal={handleModalListVisibility}
                  onSetPictos={handleSetPictos}
                />
              </Modal>
            </>
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
            <Pressable className="flex flex-row items-center gap-4">
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

      {(modalVisible || saveModalVisible) && (
        <Animated.View
          className="absolute inset-0 z-10"
          /* style={fadeAnimated} */ entering={FadeIn.springify()}
          exiting={FadeOut.springify().duration(300)}
        >
          <BlurView
            intensity={80}
            tint="dark"
            experimentalBlurMethod="dimezisBlurView"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
            }}
          ></BlurView>
        </Animated.View>
      )}
    </>
  );
}
