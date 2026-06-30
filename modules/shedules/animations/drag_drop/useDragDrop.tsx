import { Gesture } from "react-native-gesture-handler";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export const useDragDrop = (draggedId?: number | string) => {
  const inicialPosition = 0;

  const x = useSharedValue(inicialPosition);
  const y = useSharedValue(inicialPosition);

  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const pressed = useSharedValue(false);

  const isInDeleteZone = useSharedValue(false);
  const onDelete = useSharedValue(false);

  const tapGesture = Gesture.Tap()
    .maxDuration(20000)
    .onBegin(() => {
      pressed.value = true;
    })
    .onFinalize(() => {
      pressed.value = false;
    });

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      startX.value = x.value;
      startY.value = y.value;
      pressed.value = true;
    })
    .onUpdate((event) => {
      x.value = startX.value + event.translationX;
      y.value = startY.value + event.translationY;
      const fingerX = event.absoluteX;
      const fingerY = event.absoluteY;

      const insideX = fingerX >= 20 && fingerX <= 140; // left 20, right 120
      const insideY = fingerY >= 40 && fingerY <= 210; // top 60, bottom 160

      if (insideX && insideY) {
        isInDeleteZone.value = true;
      } else {
        isInDeleteZone.value = false;
      }
      pressed.value = true;
    })
    .onFinalize((event) => {
      isInDeleteZone.value = false;
      pressed.value = false;

      const fingerX = event.absoluteX;
      const fingerY = event.absoluteY;

      const insideX = fingerX >= 20 && fingerX <= 140; // left 20, right 120
      const insideY = fingerY >= 40 && fingerY <= 200; // top 60, bottom 160

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
            { damping: 10, stiffness: 180, mass: 0.5 },
          ),
        },
      ],
    };
  });

  const deleteZoneStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: 100,
        },
        {
          scale: withSpring(isInDeleteZone.value ? 1.7 : 1, {
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
    tapGesture,
  };
};
