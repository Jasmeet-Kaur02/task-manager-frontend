import React, { useEffect, useRef, useMemo } from "react";
import {
  Animated,
  BackHandler,
  PanResponder,
  Pressable,
  View,
  StyleSheet,
} from "react-native";

export function Modal(props) {
  const { children, onClose } = props;
  const [height, setHeight] = React.useState<number>(0);
  const pan: Animated.ValueXY = useRef(new Animated.ValueXY()).current;

  const backButtonHandler = () => {
    modalClose();
    return true;
  };
  const modalOpen = () => {
    BackHandler.addEventListener("hardwareBackPress", backButtonHandler);
  };

  const modalClose = () => {
    onClose();
    BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
  };

  useEffect(() => {
    modalOpen();
  }, []);

  const Background: React.FC = () => {
    return <Pressable onPress={onClose} style={styles.backgroundPressable} />;
  };

  return (
    <View style={styles.background}>
      <Background />
      <View style={styles.childContainer}>
        <Animated.View
          onLayout={(event) => setHeight(event.nativeEvent.layout.height)}
          style={[
            {
              transform: pan.getTranslateTransform(),
            },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  backgroundPressable: {
    width: "100%",
    height: "100%",
  },
  childContainer: {
    width: "90%",
    position: "absolute",
    backgroundColor: "transparent",
    borderRadius: 20,
  },
});
