import useButtonPress from "@/animations/useButtonPress";
import Feather from "@expo/vector-icons/Feather";
import { Pressable } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

interface Props {
  onPress: () => void;
}

const Backbutton = ({ onPress }: Props) => {
  const { pressedStyle, tapGesture } = useButtonPress();

  return (
    <GestureDetector gesture={tapGesture}>
      <Pressable onPress={onPress} className="absolute left-0 top-10 my-4">
        <Animated.View
          className=" w-12 aspect-square rounded-lg bg-white border border-gray-200 flex justify-center items-center"
          style={pressedStyle}
        >
          <Feather name="arrow-left" size={20} color="black" />
        </Animated.View>
      </Pressable>
    </GestureDetector>
  );
};

export default Backbutton;
