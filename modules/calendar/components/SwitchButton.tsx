import { globalStyles } from "@/global-style";
import { use, useEffect, useState } from "react";
import { Platform } from "react-native";
import { Switch } from "react-native-paper";
import { SchedulesInEventContext } from "../context/SchedulesInEvent.context";

interface Props {
  initialvalue?: boolean;
  scheduleId: string;
}

const SwitchButton = ({ initialvalue, scheduleId }: Props) => {
  const [isSwitchOn, setIsSwitchOn] = useState(initialvalue ?? false);

  const schedulesInEvent = use(SchedulesInEventContext);
  const { schedulesIds, setSchedulesIds } = schedulesInEvent!;

  useEffect(() => {
    if (isSwitchOn) {
      setSchedulesIds((prev) => [...prev, scheduleId]);
    } else {
      setSchedulesIds(schedulesIds.filter((sched) => sched !== scheduleId));
    }
  }, [isSwitchOn]);

  const platform = Platform.OS;

  const onToggleSwitch = (value: boolean) => {
    setIsSwitchOn(value);
  };

  return (
    <Switch
      value={isSwitchOn}
      onValueChange={onToggleSwitch}
      color={globalStyles.colors.primary[400]}
      style={
        platform !== "android" && {
          transform: [{ scaleX: 0.55 }, { scaleY: 0.6 }],
        }
      }
    />
  );
};

export default SwitchButton;
