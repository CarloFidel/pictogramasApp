import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import PhotosModalList from "../fotos/PhotosModalList";
import SearchBar from "../shared/SearchBar";
import PictosModalList from "./PictosModalList";

interface Props {
  visible: boolean;

  onCloseModal: (term: boolean) => void;
  onSetPictos: (pictoId: number, word: string, isPhoto: boolean) => void;
}

const ModalPictosList = ({ visible, onCloseModal, onSetPictos }: Props) => {
  const [pictoLibrary, setPictolibrary] = useState<"arasaac" | "myphotos">(
    "arasaac",
  );

  const handleShowPictoLibrary = () => {
    if (pictoLibrary === "arasaac") {
      setPictolibrary("myphotos");
    } else {
      setPictolibrary("arasaac");
    }
  };

  const handleClose = () => {
    if (visible) onCloseModal(false);
  };

  const handlePictoPressed = (id: number, word: string, isPhoto?: boolean) => {
    onSetPictos(id, word, isPhoto!);
  };

  return (
    <View
      className="bg-white w-screen px-4 relative flex-1"
      style={{
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        marginTop: 200,
      }}
    >
      <Text className="text-center mt-5">Añadir pictograma</Text>
      <Pressable
        className="flex-row w-fit justify-end absolute right-5"
        style={{ marginTop: 16 }}
        onPress={handleClose}
      >
        <MaterialCommunityIcons name="close" size={24} color="black" />
      </Pressable>

      <View className="flex-row gap-2 justify-center mt-10 px-2">
        <Pressable
          className={
            pictoLibrary === "arasaac"
              ? "bg-black py-4 px-20 rounded-lg "
              : "py-4 px-20 border border-gray-300 rounded-lg "
          }
          onPress={handleShowPictoLibrary}
        >
          <Text
            className={pictoLibrary === "arasaac" ? "text-white" : "text-black"}
          >
            Arasaac
          </Text>
        </Pressable>

        <Pressable
          className={
            pictoLibrary === "arasaac"
              ? "py-4 px-20 border border-gray-300 rounded-lg text-black"
              : "bg-black py-4 px-20 rounded-lg text-white"
          }
          onPress={handleShowPictoLibrary}
        >
          <Text
            className={pictoLibrary === "arasaac" ? "text-black" : "text-white"}
          >
            Mis Fotos
          </Text>
        </Pressable>
      </View>

      <SearchBar />

      {pictoLibrary === "arasaac" ? (
        <PictosModalList onPressedPictos={handlePictoPressed} />
      ) : (
        <PhotosModalList onPressedPictos={handlePictoPressed} />
      )}
    </View>
  );
};

export default ModalPictosList;
