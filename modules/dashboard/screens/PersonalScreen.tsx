import Backbutton from "@/common/components/Backbutton";
import BlurComponent from "@/common/components/BlurComponent";
import Loading from "@/common/components/loading";
import PrimaryButton from "@/common/components/PrimaryButton";
import { globalStyles } from "@/global-style";
import { useAuthState } from "@/modules/auth/store/authState";
import { transformCapitalize } from "@/modules/shedules/utility/transformCapitalize";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, useWindowDimensions, View } from "react-native";
import DeletePopUp from "../components/DeletePopUp";
import { useDeleteAccount } from "../hooks/useDeleteAccount";

const PersonalScreen = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { width, height } = useWindowDimensions();

  const { name, email, lastName, roles, logOut } = useAuthState();

  const { isLoadingDelete, handleDeleteAccount } = useDeleteAccount();

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
            placeholder={lastName}
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
            placeholder={transformCapitalize(roles.toLocaleString())}
            editable={false}
          />
        </View>
        <PrimaryButton
          onPress={() => setIsVisible(true)}
          backGroundColor={globalStyles.colors.warning}
          text="Eliminar cuenta"
          textColor="white"
        />
        <PrimaryButton
          onPress={logOut}
          backGroundColor="#CECECE"
          text="Cerrar sesión "
          textColor="black"
        />
      </View>
      {isVisible && (
        <>
          <BlurComponent />
          <DeletePopUp
            text="Seguro que quieres elimiar la cuenta?"
            onOkPress={handleDeleteAccount}
            onCanselPress={() => setIsVisible(false)}
          />
        </>
      )}
      {isLoadingDelete && (
        <>
          <BlurComponent />
          <Loading />
        </>
      )}
    </View>
  );
};

export default PersonalScreen;
