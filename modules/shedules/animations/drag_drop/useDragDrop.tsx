import { Gesture } from "react-native-gesture-handler";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export const useDragDrop = (draggedId?: number) => {
  const inicialPosition = 0;
  const x = useSharedValue(inicialPosition);
  const y = useSharedValue(inicialPosition);

  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const pressed = useSharedValue(false);

  const isInDeleteZone = useSharedValue(false);
  const onDelete = useSharedValue(false);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
      startX.value = x.value;
      startY.value = y.value;
    })
    .onUpdate((event) => {
      x.value = startX.value + event.translationX;
      y.value = startY.value + event.translationY;
      const fingerX = event.absoluteX;
      const fingerY = event.absoluteY;

      const insideX = fingerX >= 60 && fingerX <= 160; // left 20, right 120
      const insideY = fingerY >= 100 && fingerY <= 200; // top 60, bottom 160

      if (insideX && insideY) {
        isInDeleteZone.value = true;
      } else {
        isInDeleteZone.value = false;
        pressed.value = true;
      }
    })

    .onFinalize((event) => {
      pressed.value = false;
      isInDeleteZone.value = false;

      const fingerX = event.absoluteX;
      const fingerY = event.absoluteY;

      const insideX = fingerX >= 60 && fingerX <= 160; // left 20, right 120
      const insideY = fingerY >= 100 && fingerY <= 200; // top 60, bottom 160

      if (insideX && insideY) {
        onDelete.value = true;
      } else {
        x.value = withSpring(inicialPosition, {
          damping: 10,
          stiffness: 180,
          mass: 0.5,
        });
        y.value = withSpring(inicialPosition, {
          damping: 10,
          stiffness: 180,
          mass: 0.5,
        });
      }
    });

  const moveStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: x.value },
        { translateY: y.value },
        {
          scale: withSpring(
            pressed.value ? (isInDeleteZone.value ? 0.5 : 0.8) : 1,
            { duration: 300 },
          ),
        },
      ],
    };
  });

  const deleteZoneStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(isInDeleteZone.value ? 1.4 : 1, {
            damping: 10,
            stiffness: 180,
            mass: 0.5,
          }),
        },
      ],
    };
  });

  return {
    panGesture,
    moveStyle,
    deleteZoneStyle,
    isInDeleteZone,
    onDelete,
    draggedId,
  };
};
