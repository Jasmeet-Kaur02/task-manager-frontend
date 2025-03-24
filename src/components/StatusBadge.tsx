import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../constants";

const data = {
  "to-do": {
    bgColor: colors.lightBlue,
    key: "To Do",
    textColor: colors.blue,
  },
  pending: {
    bgColor: colors.lightYellow,
    key: "Pending",
    textColor: colors.yellow,
  },
  completed: {
    bgColor: colors.lightGreen,
    textColor: colors.green,
    key: "Completed",
  },
  "over-due": {
    bgColor: colors.lightRed,
    textColor: colors.red,
    key: "Over Due",
  },
};

export function StatusBadge({ status }) {
  return (
    <View style={[styles.badge, { backgroundColor: data[status].bgColor }]}>
      <Text style={[styles.text, { color: data[status].textColor }]}>
        {data[status].key}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.lightYellow,
    borderRadius: 100,
    paddingVertical: 5,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 16,
    color: colors.yellow,
  },
});
