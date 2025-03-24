import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../constants";

function Input({ label, placeholder, value, onChange }) {
  const [focus, setFocus] = useState(false);
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        style={[
          styles.input,
          { borderColor: focus ? colors.blue : colors.grey4 },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "column",
    rowGap: 6,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 50,
  },
});

export default Input;
