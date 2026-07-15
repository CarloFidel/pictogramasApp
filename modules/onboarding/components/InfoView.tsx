import PrimaryButton, {
  FeatherIconName,
} from "@/common/components/PrimaryButton";
import React from "react";
import { Image, Text, useWindowDimensions, View } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

interface Props {
  title: string;
  body?: string[];
  image?: boolean;
  borderButton?: boolean;
  borderButtonColor?: string;
  backGroundButtonOne: string;
  backGroundButtonTwo: string;
  iconButtonOne?: FeatherIconName;
  iconButtonTwo?: FeatherIconName;
  iconButtonOneDimentions?: number;
  iconButtonTwoDimentions?: number;
  textButtonOne: string;
  textButtonOneColor?: string;
  twoButtons?: boolean;
  textButtonTwo?: string;
  textButtonTwoColor?: string;
  onPressButtonOne: () => void;
  onPressButtonTwo?: () => void;
}

const InfoView = ({
  title,
  body,
  image,
  textButtonOne,
  textButtonTwo,
  twoButtons,
  borderButton,
  borderButtonColor,
  backGroundButtonOne,
  backGroundButtonTwo,
  textButtonOneColor,
  textButtonTwoColor,
  iconButtonOne,
  iconButtonTwo,
  iconButtonOneDimentions,
  iconButtonTwoDimentions,

  onPressButtonOne,
  onPressButtonTwo,
}: Props) => {
  const { width, height } = useWindowDimensions();
  return (
    <Animated.View
      entering={FadeInDown.springify().duration(500)}
      exiting={FadeOutDown.springify().duration(200)}
      className="justify-start items-center w-full px-4 py-10 gap-10 bg-white"
      style={{
        marginTop: height * 0.18,
        width: width * 0.9,
        borderRadius: 10,
        padding: 10,
      }}
    >
      <Text className="text-2xl font-hank-regular w-full text-center">
        {title}
      </Text>
      {body &&
        body.map((text, index) => (
          <Text
            className="text-start"
            key={index}
            style={{ width: width * 0.8 }}
          >
            {text}
          </Text>
        ))}
      {image && (
        <Image
          source={require("@/modules/onboarding/assets/icons.png")}
          style={{
            width: width * 0.6,
            height: width * 0.3,
            resizeMode: "contain",
          }}
        />
      )}

      <View className="justify-center items-center gap-4 mt-4">
        <PrimaryButton
          onPress={onPressButtonOne}
          text={textButtonOne}
          backGroundColor={backGroundButtonOne}
          border={borderButton}
          borderColor={borderButtonColor}
          iconDimentions={iconButtonOneDimentions}
          textColor={textButtonOneColor}
          icon={iconButtonOne ? iconButtonOne : undefined}
          iconColor="white"
        />

        {twoButtons && (
          <PrimaryButton
            onPress={onPressButtonTwo ? () => onPressButtonTwo() : () => {}}
            textColor={textButtonTwoColor}
            text={textButtonTwo}
            backGroundColor={backGroundButtonTwo}
            border={borderButton}
            borderColor={borderButtonColor}
          />
        )}
      </View>
    </Animated.View>
  );
};

export default InfoView;
