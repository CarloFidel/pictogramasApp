import useButtonPress from "@/animations/useButtonPress";
import Feather from "@expo/vector-icons/Feather";
import { Pressable } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

interface Props {
  icon?: React.ComponentProps<typeof Feather>["name"];
  position: string;
  onPress: () => void;
}

const Backbutton = ({ onPress, position, icon = "arrow-left" }: Props) => {
  const { pressedStyle, tapGesture } = useButtonPress();

  return (
    <GestureDetector gesture={tapGesture}>
      <Pressable onPress={onPress} className={`absolute ${position} my-4`}>
        <Animated.View
          className="p-3 aspect-square rounded-lg bg-white flex justify-center items-center"
          style={[pressedStyle, { zIndex: 10, elevation: 10 }]}
        >
          <Feather name={icon} size={23} color="black" />
        </Animated.View>
      </Pressable>
    </GestureDetector>
  );
};

export default Backbutton;
