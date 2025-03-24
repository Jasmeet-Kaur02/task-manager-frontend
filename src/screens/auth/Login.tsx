import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { colors } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";
import { useUser } from "../../context/UserContext";
import { login } from "../../api/auth";

function Login() {
  const navigation = useNavigation();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);
  const { setUser } = useUser();

  const onChangeInput = (key, value) => {
    setErrors({});
    setData({
      ...data,
      [key]: value,
    });
  };

  const onSubmit = async () => {
    setLoading(true);
    await login(data)
      .then(async (res) => {
        if (res.status) {
          setUser({
            firstName: res.data.user.firstName,
            lastName: res.data.user.lastName,
            email: res.data.user.email,
            token: res.data.token,
          });
        } else {
          if (res.message == "Invalid data.") {
            setErrors(res.data);
          } else {
            setErrors({ message: res.message });
          }
        }
      })
      .catch((error) => console.log(errors))
      .finally(() => setLoading(false));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View>
        <Text style={styles.text}>Login</Text>
        <Input
          label="Email"
          placeholder="Email"
          value={data.email}
          onChange={(value) => onChangeInput("email", value)}
        />
        {errors?.email && <Text style={styles.error}>{errors.email}</Text>}
        <PasswordInput
          placeholder="Password"
          label="Password"
          value={data.password}
          onChange={(value) => onChangeInput("password", value)}
        />
        {errors?.password && (
          <Text style={styles.error}>{errors.password}</Text>
        )}
        {errors?.message && <Text style={styles.error}>{errors.message}</Text>}
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          isLoading={isLoading}
          onSubmit={onSubmit}
          text="Login"
          color={colors.blue}
        />
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
    flexGrow: 1,
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
  error: {
    fontSize: 16,
    color: colors.red,
    marginTop: 5,
  },
});

export default Login;
