import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { colors } from "../constants";
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import { StatusBadge } from "./StatusBadge";
import { useNavigation } from "@react-navigation/native";
import { useTask } from "../context/TaskContext";

export function Card({ task }) {
  const { title, date, startTime, endTime, status } = task;
  const navigation = useNavigation();
  const { setSelectedTask } = useTask();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setSelectedTask(task);
        navigation.navigate("TaskDetails" as never);
      }}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.flex}>
          <View style={styles.dateTimeContainer}>
            <EvilIcons name="calendar" size={24} color={colors.grey5} />
            <Text>{new Date(date).toLocaleDateString()}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.dateTimeContainer}>
            <MaterialIcons name="watch-later" size={20} color={colors.grey5} />
            <Text>{`${new Date(startTime).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })} - ${new Date(endTime).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}`}</Text>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <StatusBadge status={status} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    borderColor: colors.grey2,
    paddingHorizontal: 10,
  },
  title: {
    color: "black",
    fontSize: 18,
  },
  divider: {
    height: 16,
    backgroundColor: colors.grey4,
    width: 1,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    columnGap: 10,
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
  },
});
