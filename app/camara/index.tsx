import React, { useRef, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

import Backbutton from "@/common/components/Backbutton";
import SavePhotoPopUp from "@/modules/photos/components/SevePhotoPopUp";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import SecundaryButton from "./components/SecundaryButton";
import ShutterButton from "./components/ShutterButton";

import * as MediaLibrary from "expo-media-library";

export default function CamaraScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [camaraPermission, requestCamaraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();

  const [selectedImage, setselectedImage] = useState<string>();

  const camaraRef = useRef<CameraView>(null);

  if (!camaraPermission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!camaraPermission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Necesitamos su permiso para acceder a la camara y la galería
        </Text>
        <Button onPress={requestCamaraPermission} title="grant permission" />
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
    console.log(picture);

    if (!picture.uri) return;

    setselectedImage(picture.uri);

    //TODO: Guardar img
  };

  const handleOnPressBack = () => {
    router.dismiss();
  };

  const handleClosePress = () => {
    setselectedImage("");
  };

  const handleSavePhoto = () => {};

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

      <Backbutton onPress={handleOnPressBack} position={"top-20 left-4"} />
      <ShutterButton onPress={handleOnShutter} />
      <SecundaryButton
        icon={"image-outline"}
        onPress={toggleCameraFacing}
        position="right-4 bottom-12"
      ></SecundaryButton>
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
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },

  shutterButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "white",
    borderColor: "red",
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  flipCameraButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    bottom: 40,
    right: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    bottom: 40,
    left: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  returnCancelButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    top: 40,
    left: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
