import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { signup } from "../../api/auth";
import { colors } from "../../constants";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../context/UserContext";

function Signup() {
  const navigation = useNavigation();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
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
    await signup(data)
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
          }
        }
      })
      .catch((error) => console.log(errors))
      .finally(() => setLoading(false));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View>
        <Text style={styles.text}>Sign Up</Text>
        <Input
          label="First Name"
          placeholder="First Name"
          value={data.firstName}
          onChange={(value) => onChangeInput("firstName", value)}
        />
        {errors?.firstName && (
          <Text style={styles.error}>{errors.firstName}</Text>
        )}
        <Input
          label="Last Name"
          placeholder="Last Name"
          value={data.lastName}
          onChange={(value) => onChangeInput("lastName", value)}
        />
        {errors?.lastName && (
          <Text style={styles.error}>{errors.lastName}</Text>
        )}
        <Input
          label="Email"
          placeholder="Email"
          value={data.email}
          onChange={(value) => onChangeInput("email", value)}
        />
        {errors?.email && <Text style={styles.error}>{errors?.email}</Text>}
        <Input
          label="Password"
          placeholder="Password"
          value={data.password}
          onChange={(value) => onChangeInput("password", value)}
        />
        {errors?.password && (
          <Text style={styles.error}>{errors.password}</Text>
        )}
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          isLoading={isLoading}
          onSubmit={onSubmit}
          text="Register"
          color={colors.blue}
        />

        <View style={styles.flex}>
          <Text style={styles.bottomText}>Already have an account?</Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Login" as never)}
          >
            <Text style={styles.link}>Login</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    justifyContent: "space-between",
    paddingTop: 56,
    paddingHorizontal: 12,
    paddingBottom: 20,
    flexGrow: 1,
    backgroundColor: "white",
  },
  text: {
    fontSize: 26,
    textAlign: "center",
  },
  error: {
    fontSize: 16,
    color: colors.red,
    marginTop: 5,
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

export default Signup;
