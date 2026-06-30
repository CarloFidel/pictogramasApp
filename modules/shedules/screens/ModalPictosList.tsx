import { Pictograma } from "@/infrastructure/interfaces/picto.interface";
import PhotosModalList from "@/modules/photos/components/PhotosModalList";
import { Stagger } from "@animatereactnative/stagger";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import Animated, { FadeInDown, SlideOutDown } from "react-native-reanimated";
import PictosInModalList from "../components/pictos/PictosInModalList";
import SelectPictosFrom from "../components/pictos/SelectPictosFrom";
import SearchBar from "../components/searchbar/SearchBar";
import IAScreen from "./IAScreen";

interface Props {
  visible: boolean;

  onVisibleModal: (term: boolean) => void;
  onSetPictos: ({ id, imageUrl, keyword, isPhoto }: Pictograma) => void;
}

const ModalPictosList = ({ visible, onVisibleModal, onSetPictos }: Props) => {
  const [pictoLibrary, setPictolibrary] = useState<"Arasaac" | "Fotos" | "ia">(
    "Arasaac",
  );

  const [, setIsSelected] = useState<boolean>(false);

  const { width, height } = useWindowDimensions();

  const handleShowPictoLibrary = (term: number) => {
    if (term === 1) {
      setPictolibrary("Arasaac");
      setIsSelected(true);
    }
    if (term === 2) {
      setPictolibrary("Fotos");
    }
    if (term === 3) {
      setPictolibrary("ia");
    }
  };

  const handlePictoPressed = (
    id: number | string,
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
      <Stagger stagger={50} entering={() => FadeInDown.springify(100)}>
        <Text className="text-center mt-5">Añadir pictograma</Text>
        <Pressable
          className="flex-row w-fit justify-end absolute right-2 bottom-2 z-40"
          style={{ marginTop: 16 }}
          onPress={() => onVisibleModal(false)}
        >
          <Feather name="x" size={24} color="black" />
        </Pressable>

        <View
          style={{
            width: width * 0.93,
            height: height * 0.06,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <SelectPictosFrom
            onPress={() => {
              handleShowPictoLibrary(1);
            }}
            title="Arasaac"
            selected={pictoLibrary === "Arasaac"}
          />
          <SelectPictosFrom
            onPress={() => {
              handleShowPictoLibrary(2);
            }}
            title="Fotos"
            selected={pictoLibrary === "Fotos"}
          />
          <SelectPictosFrom
            onPress={() => {
              handleShowPictoLibrary(3);
            }}
            title="IA"
            selected={pictoLibrary === "ia"}
            icon
          />
        </View>
        <SearchBar />

        {/*         {pictoLibrary === "arasaac" ? (
          <PictosInModalList onPressedPictos={handlePictoPressed} />
        ) : (
          <PhotosModalList onPressedPictos={handlePictoPressed} />
        )} */}

        {pictoLibrary === "Arasaac" && (
          <PictosInModalList onPressedPictos={handlePictoPressed} />
        )}
        {pictoLibrary === "Fotos" && (
          <PhotosModalList onPressedPictos={handlePictoPressed} />
        )}
        {pictoLibrary === "ia" && <IAScreen />}
      </Stagger>
    </Animated.View>
  );
};

export default ModalPictosList;
