import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import ItemPictos from "./ItemPictos";
import { pictogramas as pictosfake } from "./picto.mock.data";

interface Props {
  visible: boolean;

  onCloseModal: (term: boolean) => void;
}

const ModalPictosList = ({ visible, onCloseModal }: Props) => {
  const [pictos, setPictos] = useState<number[]>([]);

  const handleClose = () => {
    if (visible) {
      onCloseModal(false);
    }
  };

  const handlePictoPressed = (id: number) => {
    if (pictos.length >= 10)
      return alert("Has alcanzado el numero mxm de pictos");
    //TODO: Un popUp que diga que no se puede agregar más pictos
    setPictos((prev) => [...prev, id]);
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

      <View className="flex-row gap-2 justify-center mt-10">
        <Pressable className="bg-black py-4 px-20 rounded-lg ">
          <Text className="text-white">Arasaac</Text>
        </Pressable>

        <Pressable
          className=" py-4 px-20 borderounded-lg"
          style={{ borderWidth: 1, borderColor: "#CECECE", borderRadius: 10 }}
        >
          <Text>Mis Fotos</Text>
        </Pressable>
      </View>
      <View className="mt-5">
        <TextInput
          placeholder="Buscar..."
          className="font-hank-light"
          style={{
            paddingLeft: 40,
            paddingTop: 15,
            paddingBottom: 15,
            backgroundColor: "#F5F5F5",
            borderRadius: 20,
          }}
        ></TextInput>
        <Ionicons
          name="search-outline"
          size={20}
          color="gray"
          className="absolute"
          style={{ marginTop: 12, left: 10, opacity: 0.6 }}
        />
      </View>
      <View className="justify-center my-5">
        <FlatList
          data={pictosfake}
          renderItem={({ item }) => (
            <ItemPictos
              id={item._id}
              word={item.keywords[0].keyword}
              onPressed={handlePictoPressed}
            />
          )}
          keyExtractor={(item) => item._id.toString()}
          //horizontal
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
          }}
          numColumns={2}
          className="h-3/4"
        />
      </View>
    </View>
  );
};

export default ModalPictosList;
