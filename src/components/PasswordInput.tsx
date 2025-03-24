import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../constants";

export function PasswordInput({ label, placeholder, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const [focus, setFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <View
        style={[
          styles.inputWrapper,
          { borderColor: focus ? colors.blue : colors.grey4 },
        ]}
      >
        <TextInput
          placeholder={placeholder}
          value={value}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChangeText={onChange}
          style={styles.input}
          secureTextEntry={!showPassword}
        />
        <TouchableWithoutFeedback
          onPress={() => setShowPassword(!showPassword)}
        >
          <Entypo
            name={showPassword ? "eye" : "eye-with-line"}
            size={20}
            color={focus ? colors.blue : colors.grey4}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    rowGap: 6,
    marginTop: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 50,
    fontSize: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
  },
});
