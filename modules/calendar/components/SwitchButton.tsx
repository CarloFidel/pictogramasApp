import { globalStyles } from "@/global-style";
import { useState } from "react";
import { Switch } from "react-native-paper";

const SwitchButton = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <Switch
      value={isSwitchOn}
      onValueChange={onToggleSwitch}
      color={globalStyles.colors.primary[400]}
      style={{ transform: [{ scaleX: 0.55 }, { scaleY: 0.6 }] }}
    />
  );
};

export default SwitchButton;
