import React from "react";
import UnauthenticatedStack from "./UnauthenticatedStack";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Root() {
  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <UnauthenticatedStack />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});

export default Root;
