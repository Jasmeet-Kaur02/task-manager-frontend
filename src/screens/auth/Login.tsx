import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { colors } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Button";
import Input from "../../components/Input";

function Login() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View>
        <Text style={styles.text}>Login</Text>
        <Input
          label="Email"
          placeholder="Email"
          value=""
          onChange={() => null}
        />
        <Input
          placeholder="Password"
          label="Password"
          value=""
          onChange={() => null}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button onSubmit={() => null} text="Login" color={colors.blue} />
        <View style={styles.flex}>
          <Text style={styles.bottomText}>Don't have an account?</Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Signup" as never)}
          >
            <Text style={styles.link}>Sign Up</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 56,
    paddingHorizontal: 12,
    paddingBottom: 40,
    backgroundColor: "white",
  },
  text: {
    fontSize: 26,
    textAlign: "center",
  },
  flex: {
    flexDirection: "row",
    columnGap: 4,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomText: {
    fontSize: 16,
  },
  link: { color: colors.blue, fontSize: 16 },
  buttonWrapper: {
    marginTop: 26,
  },
});

export default Login;
