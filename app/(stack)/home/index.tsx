import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ModalPictosList from "@/components/pictos/ModalPictosList";
import ItemPictos from "@/components/shared/ItemPictos";
import NavegationBar from "@/components/shared/NavegationBar";

interface PictosOn {
  id: number;
  word: string;
  isPhoto?: boolean;
}

export default function Home() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [pictosOn, setPictosOn] = useState<PictosOn[]>([]);

  const renderButtonsFlag = pictosOn.length >= 1;

  const handleOpenModal = () => {
    setModalVisible(true);
  };
  const handleCloseModal = (term: boolean) => {
    setModalVisible(term);
  };

  const handleSetPictos = (id: number, word: string, isPhoto: boolean) => {
    if (pictosOn.length >= 10)
      return alert("Has alcanzado el numero mxm de pictos");
    //TODO: Un popUp que diga que no se puede agregar más pictos
    setPictosOn((prev) => [...prev, { id, word, isPhoto }]);
    setModalVisible(false);
  };

  const handleNavegationNav = () => {
    console.log("navigate");
  };

  const handlePictosOnPressed = () => {
    console.log("pressed");
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" />

      <View className=" bg-primary h-screen flex items-center">
        <View className="flex-row gap-2  bg-primary-600 px-4 py-2  mt-10 mb-5 rounded-3xl shadow-md shadow-primary-600">
          <Pressable onPress={handleOpenModal} className="px-4 py-2">
            <Feather name="plus" size={24} color="white" />
          </Pressable>
          {renderButtonsFlag && (
            <>
              <Pressable className="px-4 py-2">
                <SimpleLineIcons
                  name="pencil"
                  size={18}
                  color="white"
                  className="mt-1"
                />
              </Pressable>
              <Pressable className="px-4 py-2">
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

        <View className="relative w-8 h-full items-center bg-primary-400 rounded-lg mt-5">
          <ScrollView
            className="absolute h-4/5 w-60 top-2 "
            contentContainerClassName="gap-10 w-fit bg-transparent"
            maintainVisibleContentPosition={{
              minIndexForVisible: 0,
            }}
            showsVerticalScrollIndicator={false}
          >
            {pictosOn.map((picto) => (
              <Pressable
                key={picto.id}
                onPress={handlePictosOnPressed}
                className="items-center"
              >
                <ItemPictos
                  id={picto.id}
                  word={picto.word}
                  isPhoto={picto.isPhoto}
                  //onPressed={handlePictosOnPressed}
                  className="relative w-fit bg-gray-100 border-4 border-white items-center rounded-lg"
                  classnameText="absolute bg-white text-lg rounded-md border border-gray-400 px-2 py-1 bottom-[-25px] center"
                  imageDimenssion={`${picto.id === pictosOn[0].id ? "w-56 h-56" : "w-40 h-40"}`}
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View className="fixed bottom-1/3 z-10 shadow-md shadow-primary-700">
          <NavegationBar onNavigate={handleNavegationNav} />
        </View>
        {modalVisible && (
          <Modal
            animationType="slide"
            transparent
            //TODO: Efecto blur al fondo, mirar react-native-blur
          >
            <ModalPictosList
              visible={modalVisible}
              onCloseModal={handleCloseModal}
              onSetPictos={handleSetPictos}
            />
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
}
