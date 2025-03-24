import React from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function Header({ title, showBack, children }) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={26} color="black" />
          </TouchableWithoutFeedback>
        )}
        <Text style={styles.headerText}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    alignItems: "center",
    backgroundColor: "white",
  },
  leftContainer: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    color: "black",
    paddingVertical: 16,
  },
});
