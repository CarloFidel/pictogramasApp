import NavegationBar from "@/components/shared/NavegationBar";
import React, { useState } from "react";
import { Modal, Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ModalPictosList from "@/components/pictos/ModalPictosList";
import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

let renderButtonsFlag = false;

export default function Home() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };
  const handleCloseModal = (term: boolean) => {
    setModalVisible(term);
  };

  const handleNavegationNav = () => {
    console.log("navigate");
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" />

      <View className=" bg-primary h-screen flex items-center">
        <View className="flex-row gap-8 bg-primary-600 px-4 py-1  mt-10 mb-5 rounded-3xl shadow-md shadow-primary-600">
          <Pressable onPress={handleOpenModal} className="px-4 py-2">
            <Feather name="plus" size={24} color="white" />
          </Pressable>
          {renderButtonsFlag && (
            <>
              <Pressable>
                <SimpleLineIcons
                  name="pencil"
                  size={18}
                  color="white"
                  className="mt-1"
                />
              </Pressable>
              <Pressable>
                <Feather name="play" size={20} color="white" className="mt-1" />
              </Pressable>
            </>
          )}
        </View>
        {!renderButtonsFlag && (
          <Text className="text-white text-md font-hank-regular w-40 text-center">
            Empieza añadiendo un pictograma
          </Text>
        )}

        <View className="w-8 h-full bg-primary-400 rounded-lg mt-5"></View>
        <View className="fixed bottom-1/3 z-10 shadow-md shadow-primary-700">
          <NavegationBar onNavigate={handleNavegationNav} />
          {modalVisible && (
            <Modal
              animationType="slide"
              transparent
              //TODO: Efecto blur al fondo, mirar react-native-blur
            >
              <ModalPictosList
                visible={modalVisible}
                onCloseModal={handleCloseModal}
              />
            </Modal>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
