import React, { useRef, useState } from "react";
import { Image, Linking, StyleSheet, View } from "react-native";

import Backbutton from "@/common/components/Backbutton";
import PopUp from "@/common/components/PopUp";
import { router } from "expo-router";

import SavePhotoPopUp from "@/modules/photos/components/SevePhotoPopUp";
import { useCamaraStore } from "@/modules/photos/store/useCamaraStore";

import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import SecundaryButton from "../components/SecundaryButton";
import ShutterButton from "../components/ShutterButton";

export default function CamaraScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [camaraPermission, requestCamaraPermission] = useCameraPermissions();
  const [, requestMediaPermission] = MediaLibrary.usePermissions();

  const camaraRef = useRef<CameraView>(null);

  const { addPicture } = useCamaraStore();

  const [selectedImage, setselectedImage] = useState<string>();

  const [openPopUp, setOpenPopUp] = useState<boolean>(false);
  const [popText, setPopText] = useState<string>("");

  const onRequestPermission = async () => {
    setOpenPopUp(false);

    try {
      const { status: camaraPermissionStatus } =
        await requestCamaraPermission();

      if (camaraPermissionStatus !== "granted") {
        setPopText("Necesitamos permiso para usar la cámara");
        setOpenPopUp(true);
      }
      const { status: mediaPermission } = await requestMediaPermission();

      if (mediaPermission !== "granted") {
        setPopText("Necesitamos permiso para acceder a la galería");
        setOpenPopUp(true);
      }
    } catch (error: any) {
      setPopText("Algo ha salido mal");
      setOpenPopUp(true);
      throw error;
    }
  };

  // Camera permissions are still loading.
  if (!camaraPermission) {
    return <View />;
  }

  if (camaraPermission.status === "denied") {
    return (
      <View style={styles.container}>
        <PopUp
          onPress={() => Linking.openSettings()}
          text="Activa la cámara en Ajustes para continuar"
        />
      </View>
    );
  }

  //Camera permissions are not granted yet.
  if (!camaraPermission.granted) {
    return (
      <View style={styles.container}>
        <PopUp
          onPress={onRequestPermission}
          text="Necesitamos algunos permisos"
        />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleOnShutter = async () => {
    if (!camaraRef.current) return;

    const picture = await camaraRef.current.takePictureAsync({
      quality: 0.7,
    });

    if (!picture.uri) return;

    setselectedImage(picture.uri);
  };

  const onPickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      allowsMultipleSelection: false,
    });

    if (result.canceled) return;

    setselectedImage(result.assets[0].uri);
  };
  const handleOnPressBack = () => {
    router.dismiss();
  };

  const handleClosePress = () => {
    setselectedImage("");
  };

  const handleSavePhoto = async () => {
    if (!selectedImage) return;
    await MediaLibrary.createAssetAsync(selectedImage);
    addPicture(selectedImage);
    setselectedImage("");

    return selectedImage;
  };

  if (selectedImage) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage }} style={styles.camera} />
        <Backbutton
          onPress={handleClosePress}
          position={"top-20 left-4"}
          icon="x"
        />
        <SavePhotoPopUp
          photo={selectedImage}
          onCanselPress={handleClosePress}
          onOkPress={handleSavePhoto}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={camaraRef} style={styles.camera} facing={facing} />

      <SecundaryButton
        icon={"camera-reverse-outline"}
        onPress={toggleCameraFacing}
        position="right-4 top-24"
      ></SecundaryButton>

      <Backbutton onPress={handleOnPressBack} position={"top-24 left-4"} />
      <ShutterButton onPress={handleOnShutter} />
      <SecundaryButton
        icon={"image-outline"}
        onPress={onPickImages}
        position="right-4 bottom-12"
      ></SecundaryButton>
      {openPopUp && (
        <PopUp onPress={() => setOpenPopUp(false)} text={popText} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
});
