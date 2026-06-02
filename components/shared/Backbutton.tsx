import { globalStyles } from "@/global-style";
import Feather from "@expo/vector-icons/Feather";
import { Pressable, View } from "react-native";

interface Props {
  onPress: () => void;
}

const Backbutton = ({ onPress }: Props) => {
  return (
    <Pressable onPress={onPress} className="absolute left-4 top-10">
      <View
        className=" w-12  aspect-square rounded-lg bg-white flex justify-center items-center"
        style={globalStyles.shadow_sm}
      >
        <Feather name="arrow-left" size={20} color="black" />
      </View>
    </Pressable>
  );
};

export default Backbutton;
