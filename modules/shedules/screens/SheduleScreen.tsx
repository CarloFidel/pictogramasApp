import Backbutton from "@/components/shared/Backbutton";
import { globalStyles } from "@/global-style";
import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { BlurView } from "expo-blur";
import { use, useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import ItemPictos from "../components/pictos/ItemPictos";
import { EditModeContext } from "../context/edit-mode-context/EditModeContext";
import { PlayModeContext } from "../context/play-mode-context/PlayModeContext";
import { useSetSelectedPictos } from "../hooks/useSetSelectedPictos";
import ModalPictosList from "./ModalPictosList";

export default function SheduleScreen() {
  const [playMode, setPlayMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const playContext = use(PlayModeContext);
  const { setIsPlayMode } = playContext!;

  const editContext = use(EditModeContext);
  const { setIsEditMode } = editContext!;

  const handlePlayMode = () => {
    setPlayMode((term) => !term);
    setIsPlayMode((term) => !term);
  };

  const handleEditMode = () => {
    setEditMode((term) => !term);
    setIsEditMode((term) => !term);
  };

  const handleRemovePicto = (id: number) => {
    const pictosFiltered = pictosOn.filter((picto) => picto.id !== id);
    setPictosOn(pictosFiltered);
    if (editMode && pictosOn.length === 1) {
      setEditMode(false);
    }
  };

  const {
    pictosOn,
    setPictosOn,
    modalVisible,
    saveModalVisible,
    renderButtonsFlag,
    handleSetPictos,
    handleModalListVisibility,
    handleSaveMenuVisibility,
  } = useSetSelectedPictos();

  const opacity = useSharedValue(0);

  useEffect(() => {
    const isOpen = modalVisible || saveModalVisible;

    opacity.value = withTiming(isOpen ? 1 : 0, { duration: 300 });
  }, [modalVisible, saveModalVisible, opacity]);

  const fadeAnimated = useAnimatedStyle(() => {
    return { opacity: opacity.value };
  });

  return (
    <>
      <SafeAreaView className="flex-1 bg-primary">
        <StatusBar barStyle="light-content" />
        <View className="relative bg-primary h-screen flex items-center p-5">
          {editMode && (
            <Backbutton
              onPress={() => {
                setEditMode(false);
                setIsEditMode(false);
              }}
            />
          )}
          {!playMode && !editMode && (
            <View
              className="flex-row gap-2 bg-primary-600 px-4 py-2 rounded-3xl border border-primary-500"
              style={globalStyles.shadow_md}
            >
              <Pressable
                onPress={() => handleModalListVisibility(true)}
                className="px-4 py-2"
              >
                <Feather name="plus" size={24} color="white" />
              </Pressable>
              {renderButtonsFlag && (
                <>
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
                    <Feather
                      name="crop"
                      size={20}
                      color="white"
                      className="mt-1"
                    />
                  </Pressable>
                  <Pressable className="px-4 py-2" onPress={handlePlayMode}>
                    <Feather
                      name="maximize-2"
                      size={18}
                      color="white"
                      className="mt-1.5"
                    />
                  </Pressable>
                </>
              )}
            </View>
          )}

          {!renderButtonsFlag && (
            <Text className="text-white text-md font-hank-regular w-30 py-5 text-center">
              Empieza añadiendo un pictograma
            </Text>
          )}

          {playMode && (
            <View className="w-full flex flex-row justify-between mb-1.5">
              <View className="border border-white border-dashed w-15 aspect-square flex items-center justify-center">
                <Feather name="check" size={24} color="white" />
              </View>
              <Pressable
                onPress={handlePlayMode}
                style={globalStyles.shadow_sm}
              >
                <Feather
                  name="pause"
                  size={20}
                  color="white"
                  className="p-4 bg-primary-600 rounded-full border border-primary-700"
                />
              </Pressable>
            </View>
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
                    <Pressable>
                      <SimpleLineIcons
                        name="cursor-move"
                        size={20}
                        color="white"
                        className="p-4 bg-primary-600 rounded-full border border-primary-700"
                        style={globalStyles.shadow_sm}
                      />
                    </Pressable>
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

          {saveModalVisible && (
            <Modal
              animationType="slide"
              transparent
              //TODO: Efecto blur al fondo, mirar react-native-blur
            >
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
        </View>
      </SafeAreaView>
      {(modalVisible || saveModalVisible) && (
        <Animated.View className="absolute inset-0 z-10" style={fadeAnimated}>
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
