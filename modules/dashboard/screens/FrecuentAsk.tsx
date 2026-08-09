import Backbutton from "@/common/components/Backbutton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { faqItems } from "./data/faqs";

const AccordionItem = ({
  question,
  answer,
  width,
  isActive,
  onToggle,
}: {
  question: string;
  answer: string;
  width: number;
  isActive: boolean;
  onToggle: () => void;
}) => {
  const animation = useSharedValue(isActive ? 1 : 0);

  useEffect(() => {
    animation.value = withTiming(isActive ? 1 : 0, { duration: 250 });
  }, [animation, isActive]);

  const contentStyle = useAnimatedStyle(() => ({
    maxHeight: animation.value * 180,
    opacity: animation.value,
    transform: [{ scaleY: animation.value === 0 ? 0.98 : 1 }],
  }));

  return (
    <Animated.View
      className="w-full"
      style={{
        overflow: "hidden",
      }}
    >
      <Pressable
        onPress={onToggle}
        className="mt-10 flex-row justify-between gap-5 items-center w-full"
      >
        <Text className="text-xl" style={{ width: width * 0.8 }}>
          {question}
        </Text>
        <Ionicons
          name={isActive ? "chevron-up-outline" : "chevron-down-outline"}
          size={20}
          color="black"
        />
      </Pressable>
      <Animated.View style={[contentStyle, { overflow: "hidden" }]}>
        <View className="mt-5 flex-row justify-between gap-5 items-start w-full">
          <Text style={{ width: width * 0.8 }}>{answer}</Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const FrecuentAsk = () => {
  const { height, width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <SafeAreaView
        className="flex-1 w-full px-5 justify-start "
        accessibilityIgnoresInvertColors
      >
        <Backbutton
          position="left-5 top-20"
          onPress={() => {
            router.back();
          }}
        />
        <View className="items-center" style={{ marginTop: height * 0.08 }}>
          <Text className="text-3xl w-full text-start">Pregunta frecuente</Text>
        </View>

        <ScrollView className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              question={item.question}
              answer={item.answer}
              width={width}
              isActive={activeIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default FrecuentAsk;
