import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import {
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ItemPictos from "@/modules/shedules/components/pictos/ItemPictos";
import ModalPictosList from "@/modules/shedules/components/pictos/ModalPictosList";

import Backbutton from "@/components/shared/Backbutton";
import { useSetSelectedPictos } from "@/modules/shedules/hooks/useSetSelectedPictos";
import { useState } from "react";

import { BlurView } from "expo-blur";

export default function Home() {
  const [playMode, setPlayMode] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const handlePlayMode = () => {
    setPlayMode((term) => !term);
  };

  const handleEditMode = () => {
    setEditMode((term) => !term);
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

  return (
    <>
      <SafeAreaView className="flex-1 bg-primary">
        <StatusBar barStyle="light-content" />
        <View className="relative bg-primary h-screen flex items-center p-5">
          {editMode && (
            <Backbutton
              onPress={() => {
                setEditMode(false);
              }}
            />
          )}
          {!playMode && !editMode && (
            <View className="flex-row gap-2 bg-primary-600 px-4 py-2 rounded-3xl shadow-md shadow-primary-600">
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
            <View className="w-full flex flex-row justify-between mb-1">
              <View className="border border-white border-dashed w-15 aspect-square flex items-center justify-center">
                <Feather name="check" size={24} color="white" />
              </View>
              <Pressable onPress={handlePlayMode}>
                <Feather
                  name="pause"
                  size={20}
                  color="white"
                  className="p-4 bg-primary-600 rounded-full"
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
                        className="p-4 bg-primary-600 rounded-full"
                      />
                    </Pressable>
                  )}

                  <Pressable
                    onLongPress={() => setEditMode(true)}
                    className="items-center"
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
                        className="p-4 bg-primary-600 rounded-full"
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
        <BlurView
          className="absolute inset-0 z-20"
          intensity={60}
          tint="dark"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 20,
          }}
        ></BlurView>
      )}
    </>
  );
}
