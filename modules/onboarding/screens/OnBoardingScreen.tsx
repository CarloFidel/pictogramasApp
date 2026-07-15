import Backbutton from "@/common/components/Backbutton";
import PrimaryButton from "@/common/components/PrimaryButton";
import { globalStyles } from "@/global-style";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Image,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import BlurComponent from "@/common/components/BlurComponent";
import * as Progress from "react-native-progress";
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
} from "react-native-reanimated";
import InfoView from "../components/InfoView";
import RegistreScreen from "../components/RegistreScreen";
import { useOnboarding } from "../hooks/useOnboarding";

const OnBoardingScreen = () => {
  const { width, height } = useWindowDimensions();

  const {
    backGroundButtonOne,
    backGroundButtonTwo,
    body,
    borderButton,
    borderButtonColor,
    handleBackPress,
    handleButtonOnePress,
    handleButtonTwoPress,
    handleEmpecemosPress,
    iconButtonOne,
    iconButtonOneDimentions,
    iconButtonTwo,
    iconButtonTwoDimentions,
    img,
    landingPage,
    registre,
    showBackbutton,
    showProgressBar,
    textButtonOne,
    textButtonOneColor,
    textButtonTwo,
    textButtonTwoColor,
    title,
    twoButtons,
    progressValue,
    handleLoginMail,
    handleRegisterGoogle,
    handleRegisterMail,
  } = useOnboarding();

  return (
    <>
      <View className="flex-1 justify-start items-center bg-primary-500">
        {showBackbutton && (
          <Animated.View
            entering={FadeInLeft.springify().duration(800)}
            exiting={FadeOutLeft.springify().duration(200)}
            className="w-full"
          >
            <Backbutton onPress={handleBackPress} position="left-5 top-20" />
          </Animated.View>
        )}
        <>
          {showProgressBar && (
            <Animated.View
              entering={FadeInRight.springify().duration(800)}
              exiting={FadeOutRight.springify().duration(200)}
              className="w-full"
            >
              <Progress.Bar
                progress={progressValue}
                width={width * 0.745}
                color="white"
                unfilledColor={globalStyles.colors.primary[300]}
                borderWidth={0}
                height={5}
                borderRadius={5}
                style={{
                  position: "absolute",
                  left: width * 0.2,
                  top: height * 0.105,
                }}
              />
            </Animated.View>
          )}
          {!landingPage && (
            <InfoView
              title={title}
              body={body}
              image={img}
              textButtonOne={textButtonOne}
              textButtonOneColor={textButtonOneColor}
              textButtonTwo={textButtonTwo}
              textButtonTwoColor={textButtonTwoColor}
              borderButton={borderButton}
              borderButtonColor={borderButtonColor}
              backGroundButtonOne={backGroundButtonOne!}
              backGroundButtonTwo={backGroundButtonTwo!}
              iconButtonOne={iconButtonOne}
              iconButtonTwo={iconButtonTwo}
              iconButtonOneDimentions={iconButtonOneDimentions}
              iconButtonTwoDimentions={iconButtonTwoDimentions}
              onPressButtonOne={handleButtonOnePress}
              onPressButtonTwo={handleButtonTwoPress}
              twoButtons={twoButtons}
            />
          )}
        </>

        {landingPage && (
          <View
            className="justify-between items-center gap-4"
            style={{ height: height * 0.68, marginTop: height * 0.3 }}
          >
            <View className="justify-center items-center gap-4">
              <Image
                source={require("@/modules/onboarding/assets/icons.png")}
                style={{
                  width: width * 0.6,
                  height: width * 0.3,
                  resizeMode: "contain",
                }}
              />
              <Text
                className="text-white text-3xl text-center mb-4 font-hank-bold"
                style={{ width: width * 0.8 }}
              >
                El mundo es más fácil con pictogramas
              </Text>
            </View>
            <PrimaryButton
              onPress={handleEmpecemosPress}
              text="Empezar"
              icon="arrow-right-circle"
              iconDimentions={15}
              backGroundColor="white"
              iconColor="black"
            />
            <View className="justify-center items-center flex-row gap-2">
              <Text className="text-white text-xl justify-center items-center">
                ¿Ya tienes una cuenta?
              </Text>
              <Pressable onPress={handleLoginMail}>
                <View className="flex-row gap-1 justify-center items-center">
                  <Text className="text-white text-xl ">Login</Text>
                  <Ionicons name="log-in-outline" size={24} color="white" />
                </View>
              </Pressable>
            </View>
          </View>
        )}
      </View>
      {registre && (
        <>
          <BlurComponent />
          <RegistreScreen
            onClose={handleEmpecemosPress}
            onGoogle={handleRegisterGoogle}
            onMail={handleRegisterMail}
          />
        </>
      )}
    </>
  );
};

export default OnBoardingScreen;
