import Backbutton from "@/common/components/Backbutton";
import BlurComponent from "@/common/components/BlurComponent";
import PrimaryButton from "@/common/components/PrimaryButton";
import { globalStyles } from "@/global-style";
import { useAuthState } from "@/modules/auth/store/authState";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, useWindowDimensions, View } from "react-native";
import DeleteAccountPopUp from "../components/DeleteAccountPopUp";

const PersonalScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { width, height } = useWindowDimensions();

  const { name, email } = useAuthState();

  const handleDeleteAccount = () => {};
  return (
    <View className={"flex-1 bg-white items-center pb-10"}>
      <Backbutton
        position={"top-20 left-6"}
        onPress={() => router.back()}
      ></Backbutton>
      <Text
        className="w-full justify-left text-3xl mb-8 px-6"
        style={{ marginVertical: height * 0.15 }}
      >
        Mi información personal
      </Text>
      <View style={{ gap: 20 }} className="justify-center items-center w-full">
        <View className="gap-2">
          <Text>Nombre</Text>
          <TextInput
            style={[globalStyles.input, { width: width * 0.9 }]}
            placeholder={name}
            editable={false}
          />
        </View>

        <View className="gap-2">
          <Text>Apellidos</Text>
          <TextInput
            style={[globalStyles.input, { width: width * 0.9 }]}
            placeholder="Apellido"
            editable={false}
          />
        </View>

        <View className="gap-2">
          <Text>Email</Text>
          <TextInput
            style={[globalStyles.input, { width: width * 0.9 }]}
            placeholder={email}
            keyboardType="email-address"
            editable={false}
          />
        </View>

        <View className="gap-2">
          <Text>Rol</Text>
          <TextInput
            style={[globalStyles.input, { width: width * 0.9 }]}
            placeholder={email}
            keyboardType="email-address"
            editable={false}
          />
        </View>
        <PrimaryButton
          onPress={() => setIsVisible(true)}
          backGroundColor="#0F5CB3"
          text="Eliminar cuenta"
          textColor="white"
        />
      </View>
      {isVisible && (
        <>
          <BlurComponent />
          <DeleteAccountPopUp
            onOkPress={handleDeleteAccount}
            onCanselPress={() => setIsVisible(false)}
          />
        </>
      )}
    </View>
  );
};

export default PersonalScreen;
