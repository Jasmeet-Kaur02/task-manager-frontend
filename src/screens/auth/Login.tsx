import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  text: {
    fontSize: 16,
  },
});

export default Login;
