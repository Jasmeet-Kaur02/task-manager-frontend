import React, { useEffect } from "react";
import UnauthenticatedStack from "./UnauthenticatedStack";
import AuthenticatedStack from "./AuthenticatedStack";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../context/UserContext";

function Root() {
  const { user } = useUser();

  console.log(user);

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        {user ? <AuthenticatedStack /> : <UnauthenticatedStack />}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default Root;
