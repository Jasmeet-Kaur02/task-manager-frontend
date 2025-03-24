import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../constants";
import { Header } from "../../components/Header";

function AddTask() {
  return (
    <>
      <Header title="Add Task" showBack={true} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View>
          <Input
            label="Title"
            placeholder="Title"
            value=""
            onChange={() => null}
          />
          <Input
            label="Description"
            placeholder="Description"
            value=""
            onChange={() => null}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button onSubmit={() => null} text="Add Task" color={colors.blue} />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    justifyContent: "space-between",
    paddingBottom: 20,
    backgroundColor: "white",
    paddingHorizontal: 12,
  },
  buttonWrapper: {
    marginTop: 26,
  },
});

export default AddTask;
