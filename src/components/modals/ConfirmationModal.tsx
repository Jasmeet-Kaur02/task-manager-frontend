import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Modal } from "./Modal";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../Button";
import { colors } from "../../constants";

export function ConfirmationModal({ route }) {
  const { params } = route;
  const navigation = useNavigation();

  return (
    <Modal onClose={() => navigation.goBack()}>
      <View style={styles.container}>
        <Text style={styles.heading}>{params.heading}</Text>
        <Text style={styles.message}>{params.message}</Text>
        <View style={styles.buttonWrapper}>
          <Button
            text="Confirm"
            onSubmit={params.onConfirm}
            color={colors.blue}
          />
          <Button
            text="Cancel"
            onSubmit={() => navigation.goBack()}
            color={colors.red}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 30,
    backgroundColor: "white",
  },
  heading: {
    fontSize: 18,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    color: colors.grey5,
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginTop: 20,
    columnGap: 16,
  },
});
