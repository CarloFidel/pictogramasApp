import { Pictograma } from "@/infrastructure/interfaces/picto.interface";
import PhotosModalList from "@/modules/photos/components/PhotosModalList";
import { Stagger } from "@animatereactnative/stagger";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeInDown, SlideOutDown } from "react-native-reanimated";
import PictosInModalList from "../components/pictos/PictosInModalList";
import SearchBar from "../components/searchbar/SearchBar";

interface Props {
  visible: boolean;

  onVisibleModal: (term: boolean) => void;
  onSetPictos: ({ id, imageUrl, keyword, isPhoto }: Pictograma) => void;
}

const ModalPictosList = ({ visible, onVisibleModal, onSetPictos }: Props) => {
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

  const handlePictoPressed = (
    id: number,
    keyword: string,
    imageUrl: string,
    isPhoto: boolean,
  ) => {
    onSetPictos({ id, keyword, isPhoto, imageUrl });
  };

  return (
    <Animated.View
      className="bg-white w-screen px-4 relative flex-1"
      style={{
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        marginTop: 200,
        shadowColor: "#000",
        shadowOpacity: 0.82,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 8 },
        elevation: 38,
      }}
      exiting={SlideOutDown.springify(200).delay(200)}
    >
      <Stagger stagger={100} entering={() => FadeInDown.springify(100)}>
        <Text className="text-center mt-5">Añadir pictograma</Text>
        <Pressable
          className="flex-row w-fit justify-end absolute right-2 bottom-2 z-40"
          style={{ marginTop: 16 }}
          onPress={() => onVisibleModal(false)}
        >
          <Feather name="x" size={24} color="black" />
        </Pressable>

        <View className="flex-row gap-4 justify-around items-center w-full mt-10">
          <Pressable
            disabled={pictoLibrary === "arasaac" ? true : false}
            className={
              pictoLibrary === "arasaac"
                ? "flex flex-row bg-black py-4 px-2 justify-center rounded-lg "
                : "flex flex-row justify-center py-4 px-2 border border-gray-300 rounded-lg "
            }
            onPress={handleShowPictoLibrary}
            style={{ width: 180 }}
          >
            <Text
              className={
                pictoLibrary === "arasaac" ? "text-white" : "text-black"
              }
            >
              Arasaac
            </Text>
          </Pressable>

          <Pressable
            disabled={pictoLibrary === "myphotos" ? true : false}
            className={
              pictoLibrary === "myphotos"
                ? "flex flex-row bg-black py-4 px-2 justify-center rounded-lg "
                : "flex flex-row justify-center py-4 px-2 border border-gray-300 rounded-lg "
            }
            onPress={handleShowPictoLibrary}
            style={{ width: 180 }}
          >
            <Text
              className={
                pictoLibrary === "arasaac" ? "text-black" : "text-white"
              }
            >
              Mis Fotos
            </Text>
          </Pressable>
        </View>

        <SearchBar />

        {pictoLibrary === "arasaac" ? (
          <PictosInModalList onPressedPictos={handlePictoPressed} />
        ) : (
          <PhotosModalList onPressedPictos={handlePictoPressed} />
        )}
      </Stagger>
    </Animated.View>
  );
};

export default ModalPictosList;
