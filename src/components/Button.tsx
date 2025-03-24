import React from "react";
import {
  TouchableWithoutFeedback,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
} from "react-native";

export function Button({ color, text, onSubmit, isLoading }) {
  return (
    <TouchableWithoutFeedback onPress={onSubmit}>
      <View style={[styles.button, { backgroundColor: color }]}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.buttonText}>{text}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 10,
    flex: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
