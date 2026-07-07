import { globalStyles } from "@/global-style";
import { useState } from "react";
import { Switch } from "react-native-paper";

interface Props {
  initialvalue?: boolean;
  onSwitchChange: (isSwitchOn: boolean) => void;
}

const SwitchButton = ({ initialvalue, onSwitchChange }: Props) => {
  const [isSwitchOn, setIsSwitchOn] = useState(initialvalue ?? false);

  const onToggleSwitch = (value: boolean) => {
    setIsSwitchOn(value);
    onSwitchChange(value);
  };

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
